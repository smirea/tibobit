import type { Discovery } from "../discovery";
import type { GameLink } from "../game";
import type { Controller } from "./control";
import { encyclopedia } from "./encyclopedia";
import { BRIDGE_PORT, bridgeOrigin, parseCommand, validPort } from "./protocol";
import { inRun, snapshot } from "./snapshot";

const PORT_KEY = "tibobit.bridgePort";

function savedPort(): number | undefined {
  try {
    const port = Number(localStorage.getItem(PORT_KEY));
    return validPort(port) ? port : undefined;
  } catch {
    return undefined;
  }
}

// The headless runner can point a page at another server, so several games can run side by side.
function initialOrigin(): string {
  return (globalThis as { __tiboBridgeOrigin?: string }).__tiboBridgeOrigin ?? bridgeOrigin(savedPort() ?? BRIDGE_PORT);
}

export type BridgeStatus = { port: number; state: "connected" | "connecting"; error: string | undefined };

export type Bridge = {
  status(): BridgeStatus;
  /** Drops the current server and connects to the one on this port, remembering it for next time. */
  connect(port: number): void;
  onChange(listener: () => void): void;
};

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

function post(origin: string, path: string, body: unknown): Promise<boolean> {
  return new Promise((resolve) =>
    GM_xmlhttpRequest({
      method: "POST",
      url: `${origin}${path}`,
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
export function startBridge(link: GameLink, discovery: Discovery, controller: Controller): Bridge {
  let origin = initialOrigin();
  let session = 0;
  let request: { abort(): void } | undefined;
  let error: string | undefined;
  let connected = false;
  const listeners = new Set<() => void>();
  const notify = () => {
    for (const listener of listeners) listener();
  };
  let inFlight = 0;
  let lastPush = 0;
  let sentEncyclopedia = false;

  const reconnect = (from: number) => {
    if (from !== session) return;
    connected = false;
    notify();
    setTimeout(listen, RECONNECT_MS);
  };

  const listen = () => {
    const mine = ++session;
    request = GM_xmlhttpRequest({
      method: "GET",
      url: `${origin}/bridge/commands`,
      responseType: "stream",
      // Tampermonkey reports no status yet at loadstart, so the server's first line, a hello,
      // is what marks the connection live. A refused connection (409) never sends one.
      onloadstart: (r) => {
        const body = r.response as ReadableStream<Uint8Array> | null;
        if (body === null) return reconnect(mine);
        read(body, mine)
          .catch(() => {})
          .finally(() => reconnect(mine));
      },
      onerror: () => {
        if (mine === session) error = `no agent server on ${origin}`;
        notify();
        reconnect(mine);
      },
    });
  };

  const read = async (body: ReadableStream<Uint8Array>, mine: number) => {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    for (;;) {
      const { value, done } = await reader.read();
      // A refused connection (409) is one JSON error with no trailing newline.
      if (done) buffer += "\n";
      else buffer += decoder.decode(value, { stream: true });
      for (let nl = buffer.indexOf("\n"); nl >= 0; nl = buffer.indexOf("\n")) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (line === "") continue;
        try {
          const envelope = JSON.parse(line) as { hello?: true; error?: string; id: number; command: unknown };
          if (mine !== session) return;
          if (envelope.hello) {
            connected = true;
            error = undefined;
            sentEncyclopedia = false;
            notify();
            continue;
          }
          if (typeof envelope.error === "string") {
            error = envelope.error;
            notify();
          }
          if (typeof envelope.id !== "number") continue;
          controller.handle({ id: envelope.id, command: parseCommand(envelope.command) });
        } catch (e) {
          console.error("[tibobit] bad command from the agent server", line, e);
        }
      }
      if (done) return;
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
        void post(origin, "/bridge/encyclopedia", book).then((ok) => {
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
    void post(origin, "/bridge/state", body).finally(() => inFlight--);
  }, RUN_INTERVAL_MS / 2);

  listen();

  return {
    status: () => ({ port: Number(new URL(origin).port), state: connected ? "connected" : "connecting", error: connected ? undefined : error }),
    connect: (port) => {
      if (!validPort(port)) throw new Error(`not a port: ${port}`);
      try {
        localStorage.setItem(PORT_KEY, String(port));
      } catch {}
      origin = bridgeOrigin(port);
      connected = false;
      error = undefined;
      request?.abort();
      listen();
      notify();
    },
    onChange: (listener) => listeners.add(listener),
  };
}
