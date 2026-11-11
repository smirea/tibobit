import { type ChatMessage, DEFAULT_SETTINGS, parsePilotChange, type PilotChange, type PilotSettings, type PilotState, trimChat } from "../../protocol/pilot";

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

/** The agent server as the pilot needs it: whether it is connected, where, and a way to ask it for a change, which resolves to whether it took it. */
export type PilotServer = { connected(): boolean; origin(): string; ask(change: PilotChange): Promise<boolean> };

/**
 * "Grok take the wheel" as this page knows it: whether the server's bot plays for this tab, what
 * the bot says, and the settings chosen in this browser.
 */
export class Pilot {
  private settings = savedSettings();
  private current: PilotState = { state: "off", ...this.settings };
  private messages: ChatMessage[] = [];
  private listeners = new Set<() => void>();

  /** `release` hands the game back to the keyboard when the bot lets go. */
  constructor(
    private server: PilotServer,
    private release: () => void,
  ) {}

  state(): PilotState {
    return this.current;
  }

  /** The bot's chat, oldest first; a message that is sent again keeps its id and position. */
  chat(): readonly ChatMessage[] {
    return this.messages;
  }

  onChange(listener: () => void) {
    this.listeners.add(listener);
  }

  private notify() {
    for (const listener of this.listeners) listener();
  }

  /** A server has connected: it replays its chat from the start, and this browser's settings go up, so they survive its restarts. */
  hello() {
    this.messages.length = 0;
    void this.server.ask(asChange(this.settings));
    this.notify();
  }

  /** The server says whether its bot plays for this tab. */
  receive(next: PilotState) {
    // The bot leaves the game paused at its own speed between steps.
    if (this.current.state !== "off" && next.state === "off") this.release();
    // Each time the bot takes the wheel its chat starts empty, as the server's does.
    if (this.current.state === "off" && next.state === "on") this.messages.length = 0;
    this.current = next;
    this.notify();
  }

  /** Without the server there is no bot, so nothing is driving the game any more. */
  disconnected() {
    this.receive({ state: "off", ...this.settings });
  }

  hear(message: ChatMessage) {
    const at = this.messages.findIndex((m) => m.id === message.id);
    if (at >= 0) this.messages[at] = message;
    else this.messages.push(message);
    trimChat(this.messages);
    this.notify();
  }

  /** Asks the server to start or stop the bot, or to change its pace; the new state arrives over the stream. Settings are kept in this browser whether or not a server is connected. */
  set(change: PilotChange) {
    const { on, ...rest } = change;
    if (Object.keys(rest).length > 0) {
      const now = this.settings;
      this.settings = { pace: { planEvery: rest.planEvery ?? now.pace.planEvery, actEvery: rest.actEvery ?? now.pace.actEvery }, incognito: rest.incognito ?? now.incognito };
      this.current = { ...this.current, ...this.settings };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(asChange(this.settings)));
      } catch {}
      this.notify();
    }
    if (!this.server.connected()) return;
    void this.server.ask(change).then((ok) => {
      if (ok) return;
      this.current = { ...this.current, detail: `the agent server on ${this.server.origin()} refused ${JSON.stringify(change)}; restart it with this version of agent-server/main.ts` };
      this.notify();
    });
  }
}
