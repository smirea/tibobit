#!/usr/bin/env bun
import path from "node:path";
import type { ServerWebSocket, Subprocess } from "bun";
import { BRIDGE_PORT, type ChatMessage, type CommandStatus, type Encyclopedia, type PageLine, type PilotState, type Snapshot, parseChatLine, parseCommand } from "../src/agent/protocol";

const KEEPALIVE_MS = 5_000;
const option = (name: string, fallback: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? (process.argv[i + 1] ?? fallback) : fallback;
};
const PORT = Number(option("port", String(BRIDGE_PORT)));
const WAIT_LIMIT_MS = 120_000;
// The bot "Grok take the wheel" runs: Jev moves and picks, grok plans. Override with
// --pilot "<tibo-bot.ts flags>", such as --pilot "--model laya@q8_0" for LM Studio.
const PILOT_ARGS = option("pilot", "--decider openrouter --model typesafe/jev-1.14-20261014 --mode daily --difficulty nightmare").split(/\s+/).filter(Boolean);
const CHAT_BACKLOG = 200;

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
  const last = chat.at(-1);
  // The action model answers a few times a second, which would bury the planner and the actor, so
  // its moves between two of their messages are one message showing the latest.
  if (last !== undefined && line.role === "action" && last.role === "action") {
    Object.assign(last, line, { count: last.count + 1, at: Date.now() });
    toPage({ chat: last });
    return;
  }
  const message: ChatMessage = { ...line, id: nextChatId++, count: 1, at: Date.now() };
  chat.push(message);
  if (chat.length > CHAT_BACKLOG) chat.splice(0, chat.length - CHAT_BACKLOG);
  toPage({ chat: message });
}

let pilot: PilotState = { state: "off" };
let bot: Subprocess<"ignore", "inherit", "pipe"> | undefined;
function setPilot(next: PilotState) {
  pilot = next;
  toPage({ pilot });
}

function startPilot() {
  if (bot !== undefined) return;
  const args = ["--server", `http://127.0.0.1:${PORT}`, "--takeover", "--runs", "Infinity", "--reload", "", ...PILOT_ARGS];
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
    const reason = errors.trim().split("\n").filter((l) => /error/i.test(l)).at(-1) ?? errors.trim().split("\n").at(-1);
    const detail = `The bot stopped (exit ${code})${reason ? `: ${reason.trim().slice(0, 300)}` : ""}`;
    say({ role: "system", text: detail });
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
  return { connected: page !== undefined, ageMs: Date.now() - latest.snapshot.capturedAt, ...latest.snapshot };
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
POST /pilot          {"on": true} starts the bot for the tab ("Grok take the wheel"), {"on": false} stops it
POST /pilot/say      the bot's chat line for the panel: {"role": "planner" | "actor" | "action" | "system", "text", "detail"?, "model"?, "time"?}
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
          let on: unknown;
          try {
            on = ((await jsonBody(req)) as { on?: unknown } | null)?.on;
          } catch (e) {
            return errorResponse(e);
          }
          if (typeof on !== "boolean") return errorResponse("on must be true or false");
          if (on) startPilot();
          else stopPilot();
          return Response.json(pilot);
        }
        case "POST /pilot/say":
          try {
            say(await jsonBody(req));
          } catch (e) {
            return errorResponse(e);
          }
          return new Response(null, { status: 204 });
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
