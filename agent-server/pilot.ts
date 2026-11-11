import type { Subprocess } from "bun";
import { ENTRY, ROOT } from "../paths";
import { type ChatMessage, DEFAULT_SETTINGS, type PageLine, parseChatLine, type PilotChange, type PilotSettings, type PilotState, trimChat } from "../protocol/pilot";

/**
 * "Grok take the wheel": the bot this server starts for its tab, and what the bot says in the
 * panel. The settings outlast the bot, so the next time it takes the wheel it plays the same way.
 */
export class Pilot {
  state: PilotState = { state: "off", ...DEFAULT_SETTINGS };
  readonly chat: ChatMessage[] = [];
  private nextChatId = 1;
  private bot: Subprocess<"ignore", "inherit", "pipe"> | undefined;

  constructor(
    private server: string,
    private botArgs: string[],
    private toPage: (line: PageLine) => void,
  ) {}

  /** A chat line from the bot; one with the `key` of an earlier line takes its place. */
  say(input: unknown) {
    const line = parseChatLine(input);
    const at = line.key === undefined ? -1 : this.chat.findIndex((m) => m.key === line.key);
    const earlier = this.chat[at];
    if (earlier !== undefined) {
      const message: ChatMessage = { ...line, id: earlier.id, at: Date.now() };
      this.chat[at] = message;
      this.toPage({ chat: message });
      return;
    }
    const message: ChatMessage = { ...line, id: this.nextChatId++, at: Date.now() };
    this.chat.push(message);
    trimChat(this.chat);
    this.toPage({ chat: message });
  }

  private set(next: Omit<PilotState, keyof PilotSettings> & Partial<PilotSettings>) {
    this.state = { pace: this.state.pace, incognito: this.state.incognito, ...next };
    this.toPage({ pilot: this.state });
  }

  change({ on, planEvery, actEvery, incognito }: PilotChange) {
    const now = this.state;
    if (planEvery !== undefined || actEvery !== undefined || incognito !== undefined)
      this.set({ ...now, incognito: incognito ?? now.incognito, pace: { planEvery: planEvery ?? now.pace.planEvery, actEvery: actEvery ?? now.pace.actEvery } });
    if (on === true) this.start();
    if (on === false) this.stop();
  }

  private start() {
    if (this.bot !== undefined) return;
    // One run, in the tab as it is: the person's tab is never reloaded.
    const args = ["--server", this.server, "--takeover", "--runs", "1", "--reload", "", ...this.botArgs];
    console.log(`pilot: bot ${args.join(" ")}`);
    const child = Bun.spawn([process.execPath, ENTRY.bot, ...args], { cwd: ROOT, stdin: "ignore", stdout: "inherit", stderr: "pipe" });
    this.bot = child;
    this.chat.length = 0;
    this.set({ state: "on" });
    let errors = "";
    void (async () => {
      const decoder = new TextDecoder();
      for await (const chunk of child.stderr) {
        process.stderr.write(chunk);
        errors = (errors + decoder.decode(chunk, { stream: true })).slice(-2000);
      }
    })();
    void child.exited.then((code) => {
      if (this.bot !== child) return;
      this.bot = undefined;
      if (this.state.state === "stopping") return this.set({ state: "off" });
      if (code === 0) {
        this.say({ role: "system", tag: "Over", text: "The run is over: the wheel is yours." });
        return this.set({ state: "off" });
      }
      const reason = errors.trim().split("\n").filter((l) => /error/i.test(l)).at(-1) ?? errors.trim().split("\n").at(-1);
      const detail = `The bot stopped (exit ${code})${reason ? `: ${reason.trim().slice(0, 300)}` : ""}`;
      this.say({ role: "system", tag: "Stopped", text: detail });
      this.set({ state: "off", detail });
    });
  }

  private stop() {
    if (this.bot === undefined) return this.set({ state: "off" });
    this.set({ state: "stopping" });
    // The bot marks an unfinished run aborted in its notes on SIGTERM, then exits.
    this.bot.kill("SIGTERM");
  }

  /** Stops the bot and waits until it has gone. */
  async shutdown() {
    const bot = this.bot;
    if (bot === undefined) return;
    this.stop();
    await bot.exited;
  }
}
