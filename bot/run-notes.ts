import path from "node:path";
/** The run's notes, written to gameplay/notes when the run ends; bot/notes.ts has the format. */
import { keyNumbers, runStats } from "./run-log/stats";
import { NOTES_DIR, notesName, renderNotes, type RunEnd, runId, type RunPlan, type RunSetup } from "./notes";
import { existsSync } from "node:fs";
import { LOG_DIR } from "./run-log/writer";

export class RunNotes {
  readonly id: string;
  /** The run's CSV log, one row per model call; outside the repo, see LOG_DIR. */
  readonly log: string;
  link = "none yet: written once the game shows the run summary";
  /** The weapon Tibo started with, and whether the coach chose it. */
  started = "unknown";
  picks: string[] = [];
  review = "(not reviewed yet)";
  file?: string;
  private end?: RunEnd;

  /** A run the bot took over from a person is not saved, and neither is an incognito one. */
  constructor(
    readonly setup: RunSetup,
    readonly plan: RunPlan,
    /** Which coach prompts, by hash, planned and reviewed the run. */
    public prompts: string,
    public saved: boolean,
  ) {
    // Ids have one-second steps, and two bots can start a run in the same second; a later one moves on.
    const logFor = () => path.join(LOG_DIR, `${runId(setup.started)}_${setup.difficulty}_${setup.mode}_${setup.surface}.csv`);
    while (existsSync(logFor())) setup.started = new Date(setup.started.getTime() + 1000);
    this.id = runId(setup.started);
    this.log = logFor();
  }

  /** The run is over, so its notes get their name, which says how long Tibo lived. */
  async finish(end: RunEnd) {
    this.end = end;
    this.file = path.join(NOTES_DIR, notesName(this.setup, end.lived));
    await this.write();
  }

  async write() {
    if (!this.saved || this.file === undefined || this.end === undefined) return;
    const log = Bun.file(this.log);
    const csv = (await log.exists()) ? await log.text() : "";
    const stats = csv === "" ? "(no log)" : runStats(csv);
    const key = csv === "" ? "(no log)" : keyNumbers(csv);
    await Bun.write(this.file, renderNotes({ setup: this.setup, plan: this.plan, end: this.end, link: this.link, log: this.log, prompts: this.prompts, picks: this.picks, review: this.review, started: this.started, stats, key }));
  }
}
