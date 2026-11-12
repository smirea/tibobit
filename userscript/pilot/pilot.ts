import { type ChatMessage, type PilotChange, type PilotState, type StatePreview, trimChat } from "../../protocol/pilot";
import { checkDraft, type Draft, type DraftCheck, loadDraft, saveDraft } from "../fsd/draft";
import type { Action } from "../../protocol/driver";

/**
 * The agent server as the pilot needs it: whether it is connected, where, a way to ask it for a
 * change, which resolves to whether it took it, and its builder, which resolves to a function
 * that type-checks or rejects with why there is none.
 */
type PilotServer = { connected(): boolean; origin(): string; ask(change: PilotChange): Promise<boolean>; build(prompt: string): Promise<string> };

// Typing streams the loadout to a bot that is driving; this keeps it to a request per pause.
const SEND_AFTER_MS = 400;

/**
 * Full Self Driving as this page knows it: the function and loadout kept in this browser, whether the
 * server's bot drives this tab with them, what the bot says, and the game as it last read it.
 */
export class Pilot {
  private current: PilotState = { state: "off" };
  private written = loadDraft();
  private checked = checkDraft(this.written);
  private shown: StatePreview | undefined;
  /** Whether `shown` came from the bot driving now, so its action is the one in effect. */
  private live = false;
  private build: { since: number } | undefined;
  private buildProblem: string | undefined;
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

  /** The game as the bot last read it, if it has; it may be from an earlier run. */
  preview(): StatePreview | undefined {
    return this.shown;
  }

  /** What the driving bot's function last returned, or why it threw. */
  active(): { action?: Action; error?: string } | undefined {
    return this.current.state !== "off" && this.live && this.shown !== undefined ? { ...(this.shown.action === undefined ? {} : { action: this.shown.action }), ...(this.shown.error === undefined ? {} : { error: this.shown.error }) } : undefined;
  }

  /** When the function being written was asked for, if one is. */
  building(): number | undefined {
    return this.build?.since;
  }

  /** Why the last build gave no function, until the next one starts. */
  buildError(): string | undefined {
    return this.buildProblem;
  }

  /** Has the server's builder write the function from the prompt as written. It replaces the one kept here, and the one a driving bot runs. */
  buildCode() {
    const prompt = this.written.prompt;
    if (this.build !== undefined || prompt.trim() === "" || !this.server.connected()) return;
    this.build = { since: Date.now() };
    this.buildProblem = undefined;
    this.notify();
    void this.server
      .build(prompt)
      .then(
        (code) => this.edit({ ...this.written, code, builtFrom: prompt }),
        (e: unknown) => {
          this.buildProblem = e instanceof Error ? e.message : String(e);
        },
      )
      .finally(() => {
        this.build = undefined;
        this.notify();
      });
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

  /** Keeps the draft in this browser, and hands its drive to the server once it checks, so a driving bot follows it. */
  edit(next: Draft) {
    this.written = next;
    this.checked = checkDraft(next);
    saveDraft(next);
    clearTimeout(this.sending);
    const drive = this.checked.drive;
    if (drive !== undefined) this.sending = setTimeout(() => this.ask({ drive }), SEND_AFTER_MS);
    this.notify();
  }

  /** Starts driving with the function and loadout as they are; false when the loadout does not check yet. */
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

  /** A server has connected: it replays its chat from the start, and this browser's drive goes up, so it survives the server's restarts. */
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
    if (this.current.state === "off" && next.state === "on") {
      this.messages.length = 0;
      this.live = false;
    }
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
    this.live = this.current.state !== "off";
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
