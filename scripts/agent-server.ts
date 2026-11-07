#!/usr/bin/env bun
import type { ServerWebSocket } from "bun";
import { BRIDGE_PORT, type CommandStatus, type Encyclopedia, type Snapshot, parseCommand } from "../src/agent/protocol";

const KEEPALIVE_MS = 5_000;
const WAIT_LIMIT_MS = 120_000;

let latest: { snapshot: Snapshot } | undefined;
let book: Encyclopedia | undefined;
let page: ReadableStreamDefaultController<Uint8Array> | undefined;
let nextId = 1;
const sockets = new Set<ServerWebSocket<unknown>>();
const waiters = new Set<() => void>();
const encoder = new TextEncoder();

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
  page.enqueue(encoder.encode(`${JSON.stringify({ id, command: parseCommand(command) })}\n`));
  return { id };
}

/**
 * Waits for a command to finish. A level-up or chest choice freezes game time, so a running
 * command also returns as soon as one opens (or the run ends) and the agent has to act.
 */
async function settled(id: number, limitMs: number): Promise<(CommandStatus & { interruptedBy?: string }) | undefined> {
  const end = Date.now() + limitMs;
  for (;;) {
    const status = statusOf(id);
    if (status !== undefined && status.state !== "running") return status;
    const screen = latest?.snapshot.screen;
    if (status !== undefined && (screen === "choice" || screen === "over")) return { ...status, interruptedBy: screen };
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
`;

const server = Bun.serve({
  hostname: "127.0.0.1",
  port: BRIDGE_PORT,
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
                controller.enqueue(encoder.encode(`${JSON.stringify({ hello: true })}\n`));
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
