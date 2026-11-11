import type { GameLink } from "../link/game-link";
import type { CheckpointStore, Controller } from "./control";
import type { CheckpointFile } from "./checkpoint";
import { encyclopedia } from "./encyclopedia";
import { Forecaster } from "./forecast";
import { BRIDGE_PORT, bridgeOrigin, validPort } from "../../protocol/address";
import { type ChatMessage, DEFAULT_SETTINGS, type PageLine, parsePilotChange, type PilotChange, type PilotSettings, type PilotState, trimChat } from "../../protocol/pilot";
import { parseCommand } from "../../protocol/commands";
import { inRun } from "../link/screen";
import { snapshot } from "./snapshot";

const PORT_KEY = "tibobit.bridgePort";
const SETTINGS_KEY = "tibobit.pilotSettings";

/** The bot settings chosen in this browser; the page sends them to every server it connects to. */
function savedSettings(): PilotSettings {
  try {
    const c = parsePilotChange(JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "null"));
    return {
      pace: { planEvery: c.planEvery ?? DEFAULT_SETTINGS.pace.planEvery, actEvery: c.actEvery ?? DEFAULT_SETTINGS.pace.actEvery },
      incognito: c.incognito ?? DEFAULT_SETTINGS.incognito,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

const asChange = (s: PilotSettings): PilotChange => ({ ...s.pace, incognito: s.incognito });

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

type BridgeStatus = { port: number; state: "connected" | "connecting"; error: string | undefined };

export type Bridge = {
  status(): BridgeStatus;
  /** Drops the current server and connects to the one on this port, remembering it for next time. */
  connect(port: number): void;
  /** Whether the server's bot is playing for this tab ("Grok take the wheel"). */
  pilot(): PilotState;
  /** Asks the server to start or stop the bot, or to change its pace; the new state arrives over the stream. */
  setPilot(change: PilotChange): void;
  /** The bot's chat, oldest first; a message whose `count` grows keeps its id and position. */
  chat(): readonly ChatMessage[];
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
// A snapshot holds the whole game state, which grows with the crowd; pushes are spaced so building
// and sending them takes at most this share of the page's time, which the game's own ticks share.
const SNAPSHOT_SHARE = 0.1;
const CHECKPOINT_TIMEOUT_MS = 120_000;
const IDLE_INTERVAL_MS = 500;
const RECONNECT_MS = 3000;
const MAX_IN_FLIGHT = 4;
const HELLO_TIMEOUT_MS = 5000;
// The server lets this tab take back a stream of its own that outlived an abort, and refuses other tabs.
const TAB_ID = crypto.randomUUID();

/** The server's `{"error": ...}` body, or a fallback naming the status. */
function refusal(r: GmResponse, origin: string): string {
  const text = r.responseText ?? (typeof r.response === "string" ? r.response : "");
  try {
    const { error } = JSON.parse(text) as { error?: unknown };
    if (typeof error === "string") return error;
  } catch {}
  return `the agent server on ${origin} refused the connection (${r.status})`;
}

function post(origin: string, path: string, body: unknown): Promise<boolean> {
  return new Promise((resolve) =>
    GM_xmlhttpRequest({
      method: "POST",
      url: `${origin}${path}`,
      data: typeof body === "string" ? body : JSON.stringify(body),
      headers: { "content-type": "application/json" },
      timeout: 5000,
      onload: (r) => resolve(r.status < 300),
      onerror: () => resolve(false),
      ontimeout: () => resolve(false),
    }),
  );
}

function gmCall(method: "GET" | "POST", url: string, body?: string): Promise<string> {
  return new Promise((resolve, reject) =>
    GM_xmlhttpRequest({
      method,
      url,
      ...(body === undefined ? {} : { data: body, headers: { "content-type": "application/json" } }),
      timeout: CHECKPOINT_TIMEOUT_MS,
      onload: (r) => {
        const text = r.responseText ?? String(r.response ?? "");
        if (r.status < 300) resolve(text);
        else reject(new Error(`${method} ${url}: ${r.status} ${text.slice(0, 300)}`));
      },
      onerror: () => reject(new Error(`${method} ${url} failed`)),
      ontimeout: () => reject(new Error(`${method} ${url} timed out`)),
    }),
  );
}

/**
 * Connects to the local agent server. Commands arrive over one long streamed response, which
 * delivers in a couple of milliseconds; snapshots go up as POSTs, which Tampermonkey takes
 * about 80ms to deliver, so several stay in flight to keep the server's copy fresh.
 */
// Tampermonkey grants this only from the installed script's own header, never from a @require'd
// file, so a local-dev wrapper with "@grant none" leaves it undefined.
const NOT_GRANTED =
  typeof GM_xmlhttpRequest === "function"
    ? undefined
    : "Tampermonkey did not grant GM_xmlhttpRequest. Add @grant GM_xmlhttpRequest and @connect 127.0.0.1 to the installed script's header.";

export function startBridge(link: GameLink, controller: Controller, forecaster: Forecaster): Bridge {
  let origin = initialOrigin();
  let session = 0;
  let request: { abort(): void } | undefined;
  let error: string | undefined = NOT_GRANTED;
  let connected = false;
  const listeners = new Set<() => void>();
  const notify = () => {
    for (const listener of listeners) listener();
  };
  let settings = savedSettings();
  let pilot: PilotState = { state: "off", ...settings };
  const chat: ChatMessage[] = [];
  let inFlight = 0;
  let lastPush = 0;
  let snapshotMs = 0;
  // The English text loads only when a run starts, after the content tables, so the encyclopedia
  // goes up again each time more of it has arrived: -1 means not sent to this server yet.
  let sentWithMessages = -1;
  const store: CheckpointStore = {
    put: async (file) => {
      await gmCall("POST", `${origin}/bridge/checkpoint`, JSON.stringify(file));
    },
    get: async (name) => JSON.parse(await gmCall("GET", `${origin}/bridge/checkpoint?name=${encodeURIComponent(name)}`)) as CheckpointFile,
  };

  const reconnect = (from: number) => {
    if (from !== session) return;
    connected = false;
    // Without the server there is no bot, so nothing is driving the game any more.
    receivePilot({ state: "off", ...settings });
    notify();
    setTimeout(listen, RECONNECT_MS);
  };

  const listen = () => {
    const mine = ++session;
    if (NOT_GRANTED !== undefined) return;
    // Tampermonkey may end one request through several of these callbacks; only the first retries.
    let over = false;
    const retry = (why?: string) => {
      if (over) return;
      over = true;
      clearTimeout(silence);
      if (why !== undefined && mine === session) error = why;
      reconnect(mine);
    };
    const silence = setTimeout(() => {
      if (connected || mine !== session) return;
      request?.abort();
      retry(`the agent server on ${origin} did not answer`);
    }, HELLO_TIMEOUT_MS);
    request = GM_xmlhttpRequest({
      method: "GET",
      url: `${origin}/bridge/commands?tab=${TAB_ID}`,
      responseType: "stream",
      // Tampermonkey reports no status yet at loadstart, so the server's first line, a hello,
      // is what marks the connection live. A refused connection (409) never sends one, and
      // Tampermonkey hands over its body here or only in onload.
      onloadstart: (r) => {
        const body = r.response as ReadableStream<Uint8Array> | null;
        if (body === null) return;
        read(body, mine)
          .catch(() => {})
          .finally(() => retry());
      },
      onload: (r) => retry(r.status >= 300 ? refusal(r, origin) : undefined),
      onerror: () => retry(`no agent server on ${origin}`),
      ontimeout: () => retry(`no agent server on ${origin}`),
    });
  };

  const receivePilot = (next: PilotState) => {
    // Hand the game back to the keyboard: the bot leaves it paused at its own speed between steps.
    if (pilot.state !== "off" && next.state === "off") controller.release();
    // Each time the bot takes the wheel its chat starts empty, as the server's does.
    if (pilot.state === "off" && next.state === "on") chat.length = 0;
    pilot = next;
  };

  const receiveChat = (message: ChatMessage) => {
    const at = chat.findIndex((m) => m.id === message.id);
    if (at >= 0) chat[at] = message;
    else chat.push(message);
    trimChat(chat);
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
          const envelope = JSON.parse(line) as PageLine;
          if (mine !== session) return;
          if ("hello" in envelope) {
            connected = true;
            error = undefined;
            sentWithMessages = -1;
            // The server replays its chat backlog after the hello.
            chat.length = 0;
            // This browser's settings win over whatever the server kept, so they survive its restarts.
            void post(origin, "/pilot", asChange(settings));
            notify();
          } else if ("error" in envelope) {
            error = envelope.error;
            notify();
          } else if ("pilot" in envelope) {
            receivePilot(envelope.pilot);
            notify();
          } else if ("chat" in envelope) {
            receiveChat(envelope.chat);
            notify();
          } else controller.handle({ id: envelope.id, command: parseCommand(envelope.command) }, store);
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
    if (now - lastPush < (inRun(link) ? Math.max(RUN_INTERVAL_MS, snapshotMs / SNAPSHOT_SHARE) : IDLE_INTERVAL_MS)) return;
    lastPush = now;
    const messages = Object.keys(link.messages).length;
    if (sentWithMessages !== messages) {
      const book = encyclopedia(link);
      if (book !== undefined) {
        sentWithMessages = messages;
        void post(origin, "/bridge/encyclopedia", book).then((ok) => {
          if (!ok) sentWithMessages = -1;
        });
      }
    }
    let body;
    let built = now;
    try {
      // A paused game's forecast is made on the spot; counted as the snapshot's cost it would space the next ones seconds apart.
      const forecast = forecaster.read();
      built = performance.now();
      body = JSON.stringify(snapshot(link, controller.statuses, forecast, forecaster.seconds));
    } catch (e) {
      body = JSON.stringify({ capturedAt: Date.now(), screen: "title", commands: controller.statuses, error: `snapshot failed: ${e instanceof Error ? e.message : String(e)}` });
    }
    snapshotMs = performance.now() - built;
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
      error = NOT_GRANTED;
      request?.abort();
      listen();
      notify();
    },
    pilot: () => pilot,
    setPilot: (change) => {
      const { on, ...rest } = change;
      if (Object.keys(rest).length > 0) {
        settings = { pace: { planEvery: rest.planEvery ?? settings.pace.planEvery, actEvery: rest.actEvery ?? settings.pace.actEvery }, incognito: rest.incognito ?? settings.incognito };
        pilot = { ...pilot, ...settings };
        try {
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(asChange(settings)));
        } catch {}
        notify();
      }
      if (!connected) return;
      void post(origin, "/pilot", change).then((ok) => {
        if (ok) return;
        pilot = { ...pilot, detail: `the agent server on ${origin} refused ${JSON.stringify(change)}; restart it with this version of agent-server/main.ts` };
        notify();
      });
    },
    chat: () => chat,
    onChange: (listener) => listeners.add(listener),
  };
}
