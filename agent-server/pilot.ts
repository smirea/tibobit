import type { Subprocess } from "bun";
import { ENTRY, ROOT } from "../paths";
import { type ChatMessage, type PageLine, parseChatLine, parseStatePreview, type PilotChange, type PilotState, type StatePreview, trimChat } from "../protocol/pilot";
import type { Drive } from "../protocol/drive";
import { type BotArgs, botArgv } from "../bot/args";

/**
 * Full Self Driving: the bot this server starts for its tab, the function and loadout it plays by, and
 * what it says in the panel. The page sends its drive whenever it connects or it changes.
 */
export class Pilot {
  state: PilotState = { state: "off" };
  drive: Drive | undefined;
  /** The game as the bot last read it and the action its function returned, which the panel shows. */
  shown: StatePreview | undefined;
  readonly chat: ChatMessage[] = [];
  private nextChatId = 1;
  private bot: Subprocess<"ignore", "inherit", "pipe"> | undefined;

  constructor(
    private server: string,
    private botArgs: BotArgs,
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

  preview(input: unknown) {
    this.shown = parseStatePreview(input);
    this.toPage({ preview: this.shown });
  }

  private set(next: PilotState) {
    this.state = next;
    this.toPage({ pilot: this.state });
  }

  change({ on, drive }: PilotChange) {
    if (drive !== undefined) this.drive = drive;
    if (on === true && this.drive === undefined) throw new Error("Full Self Driving needs a function first: send a drive");
    if (on === true) this.start();
    if (on === false) this.stop();
  }

  private start() {
    if (this.bot !== undefined) return;
    // One run, in the tab as it is: the person's tab is never reloaded.
    const args = botArgv({ server: this.server, takeover: true, runs: 1, reload: "", ...this.botArgs });
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
