#!/usr/bin/env bun
import type { ServerWebSocket } from "bun";
import { type Book, bookFrom } from "../game/book";
import { liveView } from "./live-view";
import { BRIDGE_PORT, localOrigin } from "../protocol/address";
import { type CommandStatus, parseCommand } from "../protocol/commands";
import { type LiveView, RAW_TOP, type Settled, type State } from "../protocol/view";
import { parseRaw, rawParts } from "./raw";
import { type PageLine, parsePilotChange, type PilotChange } from "../protocol/pilot";
import { driveErrors } from "../bot/drive";
import type { Encyclopedia, Snapshot } from "../protocol/snapshot";
import { listCheckpoints, readCheckpoint, saveCheckpoint } from "./checkpoints";
import { Pilot } from "./pilot";
import { type BotArgs, JEV, parseBotArgs } from "../bot/args";

const KEEPALIVE_MS = 5_000;
const option = (name: string, fallback: string) => {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? (process.argv[i + 1] ?? fallback) : fallback;
};
const PORT = Number(option("port", String(BRIDGE_PORT)));
const WAIT_LIMIT_MS = 120_000;
// What the bot Full Self Driving starts is told: Jev plans. Override with
// --pilot "<the bot's flags>", such as --pilot "--model laya@q8_0" for LM Studio.
const PILOT_ARGS: BotArgs = process.argv.includes("--pilot") ? parseBotArgs(option("pilot", "").split(/\s+/).filter(Boolean)) : { ...JEV, mode: "current", difficulty: "nightmare" };

let latest: { snapshot: Snapshot; view?: LiveView } | undefined;
/** The game's book for building the live view; rebuilt whenever the page sends its encyclopedia. */
let book: Book | undefined;
let encyclopedia: Encyclopedia | undefined;
let page: ReadableStreamDefaultController<Uint8Array> | undefined;
// Which tab holds the stream, so that tab can take it back when its old stream outlives a reconnect.
let pageTab: string | undefined;
let nextId = 1;
const sockets = new Set<ServerWebSocket<{ raw: string[] }>>();
const waiters = new Set<() => void>();
const encoder = new TextEncoder();

const toPage = (line: PageLine) => page?.enqueue(encoder.encode(`${JSON.stringify(line)}\n`));
const pilot = new Pilot(localOrigin(PORT), PILOT_ARGS, toPage);

// A JSON content type forces a CORS preflight, which this server never answers, so another
// website open in the browser cannot start the bot with a plain form post.
async function jsonBody(req: Request): Promise<unknown> {
  if (!req.headers.get("content-type")?.startsWith("application/json")) throw new Error("send JSON with content-type application/json");
  return req.json();
}

/** The latest state for a client: the live view, and the raw parts it asked for. */
function state(raw: string[] = []): State | undefined {
  if (latest === undefined) return undefined;
  const meta = Object.fromEntries(Object.entries(latest.snapshot).filter(([key]) => key !== "game" && !(RAW_TOP as readonly string[]).includes(key))) as Omit<Snapshot, "game" | (typeof RAW_TOP)[number]>;
  // The panel's instructions reach a running bot every step, so edits take effect mid-run. Only a
  // bot the panel started follows them; one started by hand keeps its own flags.
  const drive = pilot.state.state === "off" || pilot.drive === undefined ? {} : { drive: pilot.drive };
  return { connected: page !== undefined, ageMs: Date.now() - latest.snapshot.capturedAt, ...drive, ...meta, ...latest.view, ...rawParts(latest.snapshot, raw) };
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
async function settled(id: number, limitMs: number): Promise<Settled | undefined> {
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

GET  /state          the game as a live game needs it (LiveView in protocol/view.ts), the screen and the
                     commands; ?raw=enemies,cfg,run,world.activeHazards,storage,surroundings,forecast or all adds
                     the game's own state under \`game\`. It is large and mostly noise for play: read the view first
WS   /ws?raw=...     pushes every snapshot, raw groups as for /state; send a JSON command to run it
GET  /encyclopedia   every weapon, passive, item, recipe, enemy, boss, point of interest and biome
POST /command        JSON command, see protocol/commands.ts; add ?wait=1 to block until it finishes
POST /pilot          {"drive": {...}} sets the Full Self Driving instructions (protocol/drive.ts), {"on": true}
                     starts the bot for the tab with them, {"on": false} stops it
GET  /checkpoints    the saved checkpoints' summaries, oldest first (see the checkpoint command)
POST /pilot/say      the bot's chat line for the panel: {"role": "planner" | "action" | "system", "text", "detail"?, "model"?, "time"?}
POST /pilot/state    the game state the bot last rendered, for the panel: {"time", "blocks": {"health": "...", ...}};
                     GET returns it
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
                if (pilot.shown !== undefined) toPage({ preview: pilot.shown });
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
          const view = book === undefined ? undefined : liveView(snapshot, book);
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
          encyclopedia = (await req.json()) as Encyclopedia;
          book = bookFrom(encyclopedia);
          console.log(`encyclopedia: ${encyclopedia.weapons.length} weapons, ${encyclopedia.passives.length} passives, ${encyclopedia.items.length} items, ${encyclopedia.dogs.length} dogs, ${encyclopedia.pois.length} pois`);
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
            const errors = change.drive === undefined ? [] : driveErrors(change.drive);
            if (errors.length > 0) throw new Error(`the drive cannot be played: ${errors.map((e) => `${typeof e.field === "number" ? `step ${e.field + 1}` : e.field}: ${e.message}`).join("; ")}`);
            pilot.change(change);
          } catch (e) {
            return errorResponse(e);
          }
          return Response.json(pilot.state);
        }
        case "POST /pilot/say":
          try {
            pilot.say(await jsonBody(req));
          } catch (e) {
            return errorResponse(e);
          }
          return new Response(null, { status: 204 });
        case "GET /pilot/state":
          return pilot.shown === undefined ? errorResponse("the bot has rendered no state yet; let Full Self Driving plan once", 404) : Response.json(pilot.shown);
        case "POST /pilot/state":
          try {
            pilot.preview(await jsonBody(req));
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
          return encyclopedia === undefined ? errorResponse("no encyclopedia yet; is the tibo.dog tab open?", 503) : Response.json(encyclopedia);
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
