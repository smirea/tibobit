import { type ChatMessage, type PilotChange, type PilotState, type StatePreview, trimChat } from "../../protocol/pilot";
import { checkDraft, type Draft, type DraftCheck, loadDraft, saveDraft } from "../fsd/draft";

/** The agent server as the pilot needs it: whether it is connected, where, and a way to ask it for a change, which resolves to whether it took it. */
type PilotServer = { connected(): boolean; origin(): string; ask(change: PilotChange): Promise<boolean> };

// Typing streams the instructions to a bot that is driving; this keeps it to a request per pause.
const SEND_AFTER_MS = 400;

/**
 * Full Self Driving as this page knows it: the instructions written in this browser, whether the
 * server's bot drives this tab with them, what the bot says, and the state it last rendered.
 */
export class Pilot {
  private current: PilotState = { state: "off" };
  private written = loadDraft();
  private checked = checkDraft(this.written);
  private shown: StatePreview | undefined;
  private messages: ChatMessage[] = [];
  private listeners = new Set<() => void>();
  private sending: ReturnType<typeof setTimeout> | undefined;

  /** `release` hands the game back to the keyboard when the bot lets go. */
  constructor(
    private server: PilotServer,
    private release: () => void,
  ) {}

  state(): PilotState {
    return this.current;
  }

  draft(): Draft {
    return this.written;
  }

  check(): DraftCheck {
    return this.checked;
  }

  connected(): boolean {
    return this.server.connected();
  }

  /** The game state as the bot last rendered it, if it has. */
  preview(): StatePreview | undefined {
    return this.shown;
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

  /** Keeps the instructions in this browser, and hands them to the server once they check, so a driving bot follows them. */
  edit(next: Draft) {
    this.written = next;
    this.checked = checkDraft(next);
    saveDraft(next);
    clearTimeout(this.sending);
    const drive = this.checked.drive;
    if (drive !== undefined) this.sending = setTimeout(() => this.ask({ drive }), SEND_AFTER_MS);
    this.notify();
  }

  /** Starts driving with the instructions as written; false when they do not check yet. */
  engage(): boolean {
    const drive = this.checked.drive;
    if (drive === undefined) return false;
    clearTimeout(this.sending);
    this.ask({ drive, on: true });
    return true;
  }

  stop() {
    this.ask({ on: false });
  }

  /** A server has connected: it replays its chat from the start, and this browser's instructions go up, so they survive its restarts. */
  hello() {
    this.messages.length = 0;
    const drive = this.checked.drive;
    if (drive !== undefined) void this.server.ask({ drive });
    this.notify();
  }

  /** The server says whether its bot drives this tab. */
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
    this.receive({ state: "off" });
  }

  hear(message: ChatMessage) {
    const at = this.messages.findIndex((m) => m.id === message.id);
    if (at >= 0) this.messages[at] = message;
    else this.messages.push(message);
    trimChat(this.messages);
    this.notify();
  }

  see(preview: StatePreview) {
    this.shown = preview;
    this.notify();
  }

  private ask(change: PilotChange) {
    if (!this.server.connected()) return;
    void this.server.ask(change).then((ok) => {
      if (ok) return;
      this.current = { ...this.current, detail: `the agent server on ${this.server.origin()} refused the change; restart it with this version of agent-server/main.ts` };
      this.notify();
    });
  }
}
