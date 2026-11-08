#!/usr/bin/env bun
import { mkdir, readdir, rename } from "node:fs/promises";
import path from "node:path";
import type { ServerWebSocket, Subprocess } from "bun";
import { BRIDGE_PORT, CHECKPOINT_NAME, type CheckpointMeta, type ChatMessage, type CommandStatus, type Encyclopedia, type PageLine, type PilotState, type Snapshot, DEFAULT_SETTINGS, type PilotChange, type PilotSettings, parseChatLine, parseCommand, parsePilotChange, trimChat } from "../src/agent/protocol";

const KEEPALIVE_MS = 5_000;
const option = (name: string, fallback: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? (process.argv[i + 1] ?? fallback) : fallback;
};
const PORT = Number(option("port", String(BRIDGE_PORT)));
const WAIT_LIMIT_MS = 120_000;
const CHECKPOINTS = path.resolve(option("checkpoints", path.join(import.meta.dir, "..", ".runs", "checkpoints")));
const checkpointFile = (name: string) => {
  if (!CHECKPOINT_NAME.test(name)) throw new Error("a checkpoint name is letters, digits, _ . @ or -");
  return { state: path.join(CHECKPOINTS, `${name}.json.gz`), meta: path.join(CHECKPOINTS, `${name}.meta.json`) };
};

async function checkpoints(): Promise<CheckpointMeta[]> {
  const names = (await readdir(CHECKPOINTS).catch(() => [])).filter((f) => f.endsWith(".meta.json"));
  const metas = await Promise.all(names.map(async (f) => (await Bun.file(path.join(CHECKPOINTS, f)).json()) as CheckpointMeta));
  return metas.sort((a, b) => a.savedAt.localeCompare(b.savedAt));
}
// The bot "Grok take the wheel" runs: Jev moves and picks, grok plans. Override with
// --pilot "<tibo-bot.ts flags>", such as --pilot "--model laya@q8_0" for LM Studio.
const PILOT_ARGS = option("pilot", "--decider openrouter --model typesafe/jev-1.14-20261014 --mode current --difficulty nightmare").split(/\s+/).filter(Boolean);

let latest: { snapshot: Snapshot } | undefined;
let book: Encyclopedia | undefined;
let page: ReadableStreamDefaultController<Uint8Array> | undefined;
let nextId = 1;
const sockets = new Set<ServerWebSocket<unknown>>();
const waiters = new Set<() => void>();
const encoder = new TextEncoder();

const toPage = (line: PageLine) => page?.enqueue(encoder.encode(`${JSON.stringify(line)}\n`));

const chat: ChatMessage[] = [];
let nextChatId = 1;
function say(input: unknown) {
  const line = parseChatLine(input);
  const at = line.key === undefined ? -1 : chat.findIndex((m) => m.key === line.key);
  const earlier = chat[at];
  if (earlier !== undefined) {
    const message: ChatMessage = { ...line, id: earlier.id, at: Date.now() };
    chat[at] = message;
    toPage({ chat: message });
    return;
  }
  const message: ChatMessage = { ...line, id: nextChatId++, at: Date.now() };
  chat.push(message);
  trimChat(chat);
  toPage({ chat: message });
}

let pilot: PilotState = { state: "off", ...DEFAULT_SETTINGS };
let bot: Subprocess<"ignore", "inherit", "pipe"> | undefined;
/** The settings outlast the bot, so the next time it takes the wheel it plays the same way. */
function setPilot(next: Omit<PilotState, keyof PilotSettings> & Partial<PilotSettings>) {
  pilot = { pace: pilot.pace, incognito: pilot.incognito, ...next };
  toPage({ pilot });
}

function startPilot() {
  if (bot !== undefined) return;
  // One run: when it ends, the bot reviews it (unless incognito) and hands the wheel back.
  const args = ["--server", `http://127.0.0.1:${PORT}`, "--takeover", "--runs", "1", "--reload", "", ...PILOT_ARGS];
  console.log(`pilot: tibo-bot.ts ${args.join(" ")}`);
  // From the repo root, where Bun loads .env.local with the OpenRouter key.
  const child = Bun.spawn([process.execPath, path.join(import.meta.dir, "tibo-bot.ts"), ...args], { cwd: path.join(import.meta.dir, ".."), stdin: "ignore", stdout: "inherit", stderr: "pipe" });
  bot = child;
  chat.length = 0;
  setPilot({ state: "on" });
  let errors = "";
  void (async () => {
    const decoder = new TextDecoder();
    for await (const chunk of child.stderr) {
      process.stderr.write(chunk);
      errors = (errors + decoder.decode(chunk, { stream: true })).slice(-2000);
    }
  })();
  void child.exited.then((code) => {
    if (bot !== child) return;
    bot = undefined;
    if (pilot.state === "stopping") return setPilot({ state: "off" });
    if (code === 0) {
      say({ role: "system", tag: "Over", text: "The run is over: the wheel is yours." });
      return setPilot({ state: "off" });
    }
    const reason = errors.trim().split("\n").filter((l) => /error/i.test(l)).at(-1) ?? errors.trim().split("\n").at(-1);
    const detail = `The bot stopped (exit ${code})${reason ? `: ${reason.trim().slice(0, 300)}` : ""}`;
    say({ role: "system", tag: "Stopped", text: detail });
    setPilot({ state: "off", detail });
  });
}

function stopPilot() {
  if (bot === undefined) return setPilot({ state: "off" });
  setPilot({ state: "stopping" });
  // The bot marks an unfinished run aborted in its notes on SIGTERM, then exits.
  bot.kill("SIGTERM");
}

// A JSON content type forces a CORS preflight, which this server never answers, so another
// website open in the browser cannot start the bot with a plain form post.
async function jsonBody(req: Request): Promise<unknown> {
  if (!req.headers.get("content-type")?.startsWith("application/json")) throw new Error("send JSON with content-type application/json");
  return req.json();
}

function state() {
  if (latest === undefined) return undefined;
  // The settings tell a running bot, every step, how often to plan and act and whether to keep
  // notes. Only a bot the panel started follows them; one started by hand keeps its own flags.
  const settings: Partial<PilotSettings> = pilot.state === "off" ? {} : { pace: pilot.pace, incognito: pilot.incognito };
  return { connected: page !== undefined, ageMs: Date.now() - latest.snapshot.capturedAt, ...settings, ...latest.snapshot };
}

function statusOf(id: number): CommandStatus | undefined {
  return latest?.snapshot.commands.find((c) => c.id === id);
}

function send(command: unknown): { id: number } {
  if (page === undefined) throw new Error("the tibo.dog tab is not connected; open it with the userscript installed");
  const id = nextId++;
  toPage({ id, command: parseCommand(command) });
  return { id };
}

/**
 * Waits for a command to finish. A level-up or chest choice freezes game time, so a running
 * move or goto also returns as soon as one opens (or the run ends) and the agent has to act.
 */
async function settled(id: number, limitMs: number): Promise<(CommandStatus & { interruptedBy?: string }) | undefined> {
  const end = Date.now() + limitMs;
  for (;;) {
    const status = statusOf(id);
    if (status !== undefined && status.state !== "running") return status;
    const screen = latest?.snapshot.screen;
    const moving = status?.command.type === "move" || status?.command.type === "goto";
    if (status !== undefined && moving && (screen === "choice" || screen === "over")) return { ...status, interruptedBy: screen };
    const left = end - Date.now();
    if (left <= 0) return status;
    await new Promise<void>((resolve) => {
      const done = () => {
        waiters.delete(done);
        clearTimeout(timer);
        resolve();
      };
      const timer = setTimeout(done, left);
      waiters.add(done);
    });
  }
}

function errorResponse(e: unknown, status = 400) {
  return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status });
}

const HELP = `tibo.dog agent server

GET  /state          latest game snapshot (positions are world units, +x right, +y down)
GET  /encyclopedia   every weapon, passive, item, recipe, enemy, boss, point of interest and biome
POST /command        JSON command, see src/agent/protocol.ts; add ?wait=1 to block until it finishes
WS   /ws             pushes every snapshot; send a JSON command to run it
POST /pilot          {"on": true} starts the bot for the tab ("Grok take the wheel"), {"on": false} stops it;
                     {"planEvery": 5, "actEvery": 0.3} sets how often, in seconds, it plans and takes a step;
                     {"incognito": true} has it just play: no notes, no review
GET  /checkpoints    the saved checkpoints' summaries, oldest first (see the checkpoint command)
POST /pilot/say      the bot's chat line for the panel: {"role": "planner" | "action" | "system", "text", "detail"?, "model"?, "time"?}
`;

const server = Bun.serve({
  hostname: "127.0.0.1",
  port: PORT,
  idleTimeout: 0,
  async fetch(req, srv) {
    const url = new URL(req.url);
    const route = `${req.method} ${url.pathname}`;
    try {
      switch (route) {
        case "GET /":
          return new Response(HELP);
        case "GET /ws":
          return srv.upgrade(req) ? undefined : errorResponse("websocket upgrade failed");
        case "GET /bridge/commands": {
          // One game tab at a time; a second tab keeps retrying until the first goes away.
          if (page !== undefined) return errorResponse("another tibo.dog tab is already connected", 409);
          return new Response(
            new ReadableStream<Uint8Array>({
              start(controller) {
                page = controller;
                toPage({ hello: true });
                toPage({ pilot });
                for (const message of chat) toPage({ chat: message });
                console.log("game tab connected");
                const keepalive = setInterval(() => {
                  try {
                    controller.enqueue(encoder.encode("\n"));
                  } catch {
                    clearInterval(keepalive);
                    if (page === controller) page = undefined;
                  }
                }, KEEPALIVE_MS);
              },
              cancel() {
                page = undefined;
                console.log("game tab disconnected");
              },
            }),
            { headers: { "content-type": "application/x-ndjson", "cache-control": "no-store" } },
          );
        }
        case "POST /bridge/state": {
          latest = { snapshot: (await req.json()) as Snapshot };
          for (const done of [...waiters]) done();
          if (sockets.size > 0) {
            const text = JSON.stringify(state());
            for (const ws of sockets) ws.send(text);
          }
          return new Response(null, { status: 204 });
        }
        case "POST /bridge/encyclopedia":
          book = (await req.json()) as Encyclopedia;
          console.log(`encyclopedia: ${book.weapons.length} weapons, ${book.passives.length} passives, ${book.items.length} items, ${book.recipes.length} recipes`);
          return new Response(null, { status: 204 });
        case "GET /state": {
          const s = state();
          return s === undefined ? errorResponse("no snapshot yet; is the tibo.dog tab open?", 503) : Response.json(s);
        }
        case "POST /pilot": {
          let change: PilotChange;
          try {
            change = parsePilotChange(await jsonBody(req));
          } catch (e) {
            return errorResponse(e);
          }
          const { on, planEvery, actEvery, incognito } = change;
          if (planEvery !== undefined || actEvery !== undefined || incognito !== undefined)
            setPilot({ ...pilot, incognito: incognito ?? pilot.incognito, pace: { planEvery: planEvery ?? pilot.pace.planEvery, actEvery: actEvery ?? pilot.pace.actEvery } });
          if (on === true) startPilot();
          if (on === false) stopPilot();
          return Response.json(pilot);
        }
        case "POST /pilot/say":
          try {
            say(await jsonBody(req));
          } catch (e) {
            return errorResponse(e);
          }
          return new Response(null, { status: 204 });
        case "POST /bridge/checkpoint": {
          const text = await req.text();
          const { meta } = JSON.parse(text) as { meta: CheckpointMeta };
          const file = checkpointFile(meta.name);
          await mkdir(CHECKPOINTS, { recursive: true });
          // Written aside and renamed, so a load never reads half a file.
          await Bun.write(`${file.state}.tmp`, Bun.gzipSync(new TextEncoder().encode(text)));
          await rename(`${file.state}.tmp`, file.state);
          await Bun.write(file.meta, JSON.stringify(meta, null, 2));
          console.log(`checkpoint ${meta.name}: ${meta.time}s, ${(text.length / 1e6).toFixed(1)} MB`);
          return new Response(null, { status: 204 });
        }
        case "GET /bridge/checkpoint": {
          const name = url.searchParams.get("name") ?? "";
          const file = Bun.file(checkpointFile(name).state);
          if (!(await file.exists())) return errorResponse(`no checkpoint ${name}; saved: ${(await checkpoints()).map((c) => c.name).join(", ") || "none"}`, 404);
          return new Response(Bun.gunzipSync(new Uint8Array(await file.arrayBuffer())), { headers: { "content-type": "application/json" } });
        }
        case "GET /checkpoints":
          return Response.json(await checkpoints());
        case "GET /encyclopedia":
          return book === undefined ? errorResponse("no encyclopedia yet; is the tibo.dog tab open?", 503) : Response.json(book);
        case "POST /command": {
          let sent: { id: number };
          try {
            sent = send(await req.json());
          } catch (e) {
            return errorResponse(e, page === undefined ? 503 : 400);
          }
          if (url.searchParams.get("wait") === null) return Response.json(sent);
          const limit = Math.min(Number(url.searchParams.get("timeout") ?? 60) * 1000, WAIT_LIMIT_MS);
          return Response.json((await settled(sent.id, limit)) ?? { id: sent.id, state: "unknown", detail: "the game has not reported this command yet" });
        }
      }
      return errorResponse(`no route ${route}`, 404);
    } catch (e) {
      return errorResponse(e, 500);
    }
  },
  websocket: {
    open(ws) {
      sockets.add(ws);
      const s = state();
      if (s !== undefined) ws.send(JSON.stringify(s));
    },
    close(ws) {
      sockets.delete(ws);
    },
    message(ws, message) {
      try {
        ws.send(JSON.stringify({ sent: send(JSON.parse(String(message))) }));
      } catch (e) {
        ws.send(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }));
      }
    },
  },
});

console.log(`agent server on ${server.url}`);
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, () => {
    if (bot === undefined) process.exit(0);
    stopPilot();
    void bot?.exited.then(() => process.exit(0));
  });
}
