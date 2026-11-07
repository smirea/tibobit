import type { Discovery } from "../discovery";
import type { GameLink } from "../game";
import type { Controller } from "./control";
import { encyclopedia } from "./encyclopedia";
import { BRIDGE_ORIGIN, parseCommand } from "./protocol";
import { inRun, snapshot } from "./snapshot";

type GmResponse = { status: number; response: unknown; responseText?: string };
declare function GM_xmlhttpRequest(details: {
  method: "GET" | "POST";
  url: string;
  data?: string;
  headers?: Record<string, string>;
  responseType?: "stream";
  timeout?: number;
  onloadstart?: (r: GmResponse) => void;
  onload?: (r: GmResponse) => void;
  onerror?: (e: unknown) => void;
  ontimeout?: () => void;
}): { abort(): void };

const RUN_INTERVAL_MS = 33;
const IDLE_INTERVAL_MS = 500;
const RECONNECT_MS = 3000;
const MAX_IN_FLIGHT = 4;

function post(path: string, body: unknown): Promise<boolean> {
  return new Promise((resolve) =>
    GM_xmlhttpRequest({
      method: "POST",
      url: `${BRIDGE_ORIGIN}${path}`,
      data: JSON.stringify(body),
      headers: { "content-type": "application/json" },
      timeout: 5000,
      onload: (r) => resolve(r.status < 300),
      onerror: () => resolve(false),
      ontimeout: () => resolve(false),
    }),
  );
}

/**
 * Connects to the local agent server. Commands arrive over one long streamed response, which
 * delivers in a couple of milliseconds; snapshots go up as POSTs, which Tampermonkey takes
 * about 80ms to deliver, so several stay in flight to keep the server's copy fresh.
 */
export function startBridge(link: GameLink, discovery: Discovery, controller: Controller) {
  let session = 0;
  let connected = false;
  let inFlight = 0;
  let lastPush = 0;
  let sentEncyclopedia = false;

  const reconnect = (from: number) => {
    if (from !== session) return;
    connected = false;
    setTimeout(listen, RECONNECT_MS);
  };

  const listen = () => {
    const mine = ++session;
    GM_xmlhttpRequest({
      method: "GET",
      url: `${BRIDGE_ORIGIN}/bridge/commands`,
      responseType: "stream",
      // Tampermonkey reports no status yet at loadstart, so the server's first line, a hello,
      // is what marks the connection live. A refused connection (409) never sends one.
      onloadstart: (r) => {
        const body = r.response as ReadableStream<Uint8Array> | null;
        if (body === null) return reconnect(mine);
        void read(body, mine).finally(() => reconnect(mine));
      },
      onerror: () => reconnect(mine),
    });
  };

  const read = async (body: ReadableStream<Uint8Array>, mine: number) => {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) return;
      buffer += decoder.decode(value, { stream: true });
      for (let nl = buffer.indexOf("\n"); nl >= 0; nl = buffer.indexOf("\n")) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (line === "") continue;
        try {
          const envelope = JSON.parse(line) as { hello?: true; id: number; command: unknown };
          if (envelope.hello) {
            if (mine === session) {
              connected = true;
              sentEncyclopedia = false;
            }
            continue;
          }
          if (typeof envelope.id !== "number") continue;
          controller.handle({ id: envelope.id, command: parseCommand(envelope.command) });
        } catch (e) {
          console.error("[tibobit] bad command from the agent server", line, e);
        }
      }
    }
  };

  setInterval(() => {
    if (!connected || inFlight >= MAX_IN_FLIGHT) return;
    const now = performance.now();
    if (now - lastPush < (inRun(link) ? RUN_INTERVAL_MS : IDLE_INTERVAL_MS)) return;
    lastPush = now;
    if (!sentEncyclopedia) {
      const book = encyclopedia(link);
      if (book !== undefined) {
        sentEncyclopedia = true;
        void post("/bridge/encyclopedia", book).then((ok) => {
          if (!ok) sentEncyclopedia = false;
        });
      }
    }
    let body;
    try {
      body = snapshot(link, discovery, controller.statuses);
    } catch (e) {
      body = { capturedAt: Date.now(), screen: "title", commands: controller.statuses, error: `snapshot failed: ${e instanceof Error ? e.message : String(e)}` };
    }
    inFlight++;
    void post("/bridge/state", body).finally(() => inFlight--);
  }, RUN_INTERVAL_MS / 2);

  listen();
}
