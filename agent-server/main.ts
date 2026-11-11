#!/usr/bin/env bun
import type { ServerWebSocket } from "bun";
import { type Book, readBook } from "./book";
import { liveView } from "./live-view";
import { BRIDGE_PORT } from "../protocol/address";
import { type CommandStatus, parseCommand } from "../protocol/commands";
import type { LiveView, State } from "../protocol/view";
import { parseRaw, rawParts } from "./raw";
import { type PageLine, parsePilotChange, type PilotChange, type PilotSettings } from "../protocol/pilot";
import type { Encyclopedia, Snapshot } from "../protocol/snapshot";
import { listCheckpoints, readCheckpoint, saveCheckpoint } from "./checkpoints";
import { Pilot } from "./pilot";
import path from "node:path";

const KEEPALIVE_MS = 5_000;
const option = (name: string, fallback: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? (process.argv[i + 1] ?? fallback) : fallback;
};
const PORT = Number(option("port", String(BRIDGE_PORT)));
const WAIT_LIMIT_MS = 120_000;
// The bot "Grok take the wheel" runs: Jev moves and picks, grok plans. Override with
// --pilot "<tibo-bot.ts flags>", such as --pilot "--model laya@q8_0" for LM Studio.
const PILOT_ARGS = option("pilot", "--decider openrouter --model typesafe/jev-1.14-20261014 --mode current --difficulty nightmare").split(/\s+/).filter(Boolean);

let latest: { snapshot: Snapshot; view?: LiveView } | undefined;
/** The game's content for building the live view; rebuilt whenever the page sends its encyclopedia. */
let content: Book | undefined;
let book: Encyclopedia | undefined;
let page: ReadableStreamDefaultController<Uint8Array> | undefined;
// Which tab holds the stream, so that tab can take it back when its old stream outlives a reconnect.
let pageTab: string | undefined;
let nextId = 1;
const sockets = new Set<ServerWebSocket<{ raw: string[] }>>();
const waiters = new Set<() => void>();
const encoder = new TextEncoder();

const toPage = (line: PageLine) => page?.enqueue(encoder.encode(`${JSON.stringify(line)}\n`));
const pilot = new Pilot(`http://127.0.0.1:${PORT}`, PILOT_ARGS, toPage);


// A JSON content type forces a CORS preflight, which this server never answers, so another
// website open in the browser cannot start the bot with a plain form post.
async function jsonBody(req: Request): Promise<unknown> {
  if (!req.headers.get("content-type")?.startsWith("application/json")) throw new Error("send JSON with content-type application/json");
  return req.json();
}

/** The latest state for a client: the live view, and the raw parts it asked for. */
function state(raw: string[] = []): State | undefined {
  if (latest === undefined) return undefined;
  const { game: _, surroundings: _s, forecast: _f, storage: _st, gameEvents: _e, ...meta } = latest.snapshot;
  // The settings tell a running bot, every step, how often to plan and act and whether to keep
  // notes. Only a bot the panel started follows them; one started by hand keeps its own flags.
  const settings: Partial<PilotSettings> = pilot.state.state === "off" ? {} : { pace: pilot.state.pace, incognito: pilot.state.incognito };
  return { connected: page !== undefined, ageMs: Date.now() - latest.snapshot.capturedAt, ...settings, ...meta, ...latest.view, ...rawParts(latest.snapshot, raw) };
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

GET  /state          the game as a live game needs it (LiveView in src/agent/protocol.ts), the screen and the
                     commands; ?raw=enemies,cfg,run,world.activeHazards,storage,surroundings,forecast or all adds
                     the game's own state under \`game\`. It is large and mostly noise for play: read the view first
WS   /ws?raw=...     pushes every snapshot, raw groups as for /state; send a JSON command to run it
GET  /encyclopedia   every weapon, passive, item, recipe, enemy, boss, point of interest and biome
POST /command        JSON command, see src/agent/protocol.ts; add ?wait=1 to block until it finishes
POST /pilot          {"on": true} starts the bot for the tab ("Grok take the wheel"), {"on": false} stops it;
                     {"planEvery": 5, "actEvery": 0.3} sets how often, in seconds, it plans and takes a step;
                     {"incognito": true} has it just play: no notes, no review
GET  /checkpoints    the saved checkpoints' summaries, oldest first (see the checkpoint command)
POST /pilot/say      the bot's chat line for the panel: {"role": "planner" | "action" | "system", "text", "detail"?, "model"?, "time"?}
`;

const server = Bun.serve<{ raw: string[] }>({
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
        case "GET /ws": {
          let raw: string[];
          try {
            raw = parseRaw(url.searchParams.get("raw"));
            state(raw);
          } catch (e) {
            return errorResponse(e, 400);
          }
          return srv.upgrade(req, { data: { raw } }) ? undefined : errorResponse("websocket upgrade failed");
        }
        case "GET /bridge/commands": {
          // One game tab at a time; a second tab keeps retrying until the first goes away.
          const tab = url.searchParams.get("tab") ?? undefined;
          if (page !== undefined && (tab === undefined || tab !== pageTab))
            return errorResponse(`another tibo.dog tab is using the agent server on :${PORT}; close it or pick another port`, 409);
          if (page !== undefined) {
            try {
              page.close();
            } catch {}
          }
          let stream: ReadableStreamDefaultController<Uint8Array> | undefined;
          return new Response(
            new ReadableStream<Uint8Array>({
              start(controller) {
                stream = controller;
                page = controller;
                pageTab = tab;
                toPage({ hello: true });
                toPage({ pilot: pilot.state });
                for (const message of pilot.chat) toPage({ chat: message });
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
                if (page !== stream) return;
                page = undefined;
                console.log("game tab disconnected");
              },
            }),
            { headers: { "content-type": "application/x-ndjson", "cache-control": "no-store" } },
          );
        }
        case "POST /bridge/state": {
          const snapshot = (await req.json()) as Snapshot;
          const view = content === undefined ? undefined : liveView(snapshot, content);
          latest = { snapshot, ...(view === undefined ? {} : { view }) };
          for (const done of [...waiters]) done();
          for (const ws of sockets) {
            try {
              ws.send(JSON.stringify(state(ws.data.raw)));
            } catch (e) {
              ws.send(JSON.stringify({ error: e instanceof Error ? e.message : String(e) }));
            }
          }
          return new Response(null, { status: 204 });
        }
        case "POST /bridge/encyclopedia":
          book = (await req.json()) as Encyclopedia;
          content = readBook(book);
          console.log(`encyclopedia: ${book.weapons.length} weapons, ${book.passives.length} passives, ${book.items.length} items, ${book.dogs.length} dogs, ${book.pois.length} pois`);
          return new Response(null, { status: 204 });
        case "GET /state": {
          let raw: string[];
          try {
            raw = parseRaw(url.searchParams.get("raw"));
          } catch (e) {
            return errorResponse(e, 400);
          }
          let s;
          try {
            s = state(raw);
          } catch (e) {
            return errorResponse(e, 400);
          }
          return s === undefined ? errorResponse("no snapshot yet; is the tibo.dog tab open?", 503) : Response.json(s);
        }
        case "POST /pilot": {
          let change: PilotChange;
          try {
            change = parsePilotChange(await jsonBody(req));
          } catch (e) {
            return errorResponse(e);
          }
          pilot.change(change);
          return Response.json(pilot.state);
        }
        case "POST /pilot/say":
          try {
            pilot.say(await jsonBody(req));
          } catch (e) {
            return errorResponse(e);
          }
          return new Response(null, { status: 204 });
        case "POST /bridge/checkpoint": {
          const text = await req.text();
          const meta = await saveCheckpoint(text);
          console.log(`checkpoint ${meta.name}: ${meta.time}s, ${(text.length / 1e6).toFixed(1)} MB`);
          return new Response(null, { status: 204 });
        }
        case "GET /bridge/checkpoint": {
          const name = url.searchParams.get("name") ?? "";
          const json = await readCheckpoint(name);
          if (json === undefined) return errorResponse(`no checkpoint ${name}; saved: ${(await listCheckpoints()).map((c) => c.name).join(", ") || "none"}`, 404);
          return new Response(json, { headers: { "content-type": "application/json" } });
        }
        case "GET /checkpoints":
          return Response.json(await listCheckpoints());
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
      const s = state(ws.data.raw);
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
for (const signal of ["SIGINT", "SIGTERM"] as const) process.on(signal, () => void pilot.shutdown().then(() => process.exit(0)));
