import path from "node:path";
import type { Checked } from "../protocol/parse";
import { checkTemplates, DEFAULT_TEMPLATES, SLOTS, slotText, type Templates, type TemplateSlot } from "./templates";
import { GAMEPLAY } from "../paths";
import { clockPadded } from "../clock";
export const NOTES_DIR = path.join(GAMEPLAY, "notes");

// One file per run, written when the run ends, named for when it started and how long Tibo lived.
// The bot writes the facts, the plan and the prompts; the coach writes the review between the
// review markers. `--review` and the next plan read a notes file back from these same headings.

type Surface = "headless" | "browser";

/** `bot` is the commit of the bot code that played, so a review can tell whether a fix had landed. */
export type RunSetup = { started: Date; difficulty: string; mode: "daily" | "world"; surface: Surface; seed: string; planner: string; action: string; coach: string; bot: string };

/** `weapon` is the starting weapon the coach chose by id, or "" for the game's Random. */
export type RunPlan = { source: string; intent: string; templates: Templates; weapon: string };

export type RunEnd = { lived: number; level?: number; kills?: number; ending: string; outcome: string[] };

/** `started` is what Tibo actually started with, which says whether the coach's choice was offered. */
type NotesContent = { setup: RunSetup; plan: RunPlan; end: RunEnd; link: string; log: string; prompts: string; picks: string[]; review: string; started: string; stats: string; key: string };

const pad = (n: number) => String(n).padStart(2, "0");

/** The run's id: local start time, the start of its notes and log file names. */
export function runId(started: Date): string {
  const d = started;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

export function notesName(setup: RunSetup, lived: number): string {
  return `${runId(setup.started)}_lived-${clockPadded(lived, "-")}_${setup.difficulty}_${setup.mode}_${setup.surface}.md`;
}

const REVIEW_START = "<!-- review: written by the coach after the run -->";

const REVIEW_END = "<!-- /review -->";

export function renderNotes(n: NotesContent): string {
  const { setup, plan, end } = n;
  const slots = Object.keys(SLOTS) as TemplateSlot[];
  return [
    `# ${runId(setup.started).replace("_", " ")}: lived ${clockPadded(end.lived)} on ${setup.difficulty} ${setup.mode} (${setup.surface})`,
    "",
    "| | |",
    "| --- | --- |",
    `| Replay | ${n.link} |`,
    `| Ending | ${end.ending} |`,
    `| Opening | ${n.key} |`,
    `| Seed | ${setup.seed} |`,
    `| Starting weapon | ${n.started} |`,
    `| Planner | ${setup.planner} |`,
    `| Action model | ${setup.action} |`,
    `| Coach | ${setup.coach} |`,
    `| Bot code | ${setup.bot} |`,
    `| Coach prompts | ${n.prompts} |`,
    `| Templates from | ${plan.source} |`,
    `| Log | ${n.log} |`,
    "",
    "## Outcome",
    "",
    ...end.outcome.map((l) => `- ${l}`),
    "",
    "## Stats",
    "",
    "Worked out by the bot from the run's log.",
    "",
    n.stats,
    "",
    "## Plan",
    "",
    plan.intent || "(no plan: the coach did not plan this run)",
    "",
    REVIEW_START,
    "",
    n.review.trim(),
    "",
    REVIEW_END,
    "",
    "## Picks",
    "",
    n.picks.length === 0 ? "(none)" : n.picks.join("\n"),
    "",
    "## Prompts",
    "",
    "The templates the planner and the action model played with; `{{name}}` is filled from the game state.",
    "",
    ...slots.flatMap((s) => [`### ${s}`, "", "~~~text", slotText(plan.templates, s), "~~~", ""]),
    "### knobs",
    "",
    "~~~json",
    JSON.stringify(plan.templates.knobs, null, 2),
    "~~~",
    "",
  ].join("\n");
}

export const notesField = (text: string, name: string) => text.match(new RegExp(`^\\| ${name} \\| (.*) \\|$`, "m"))?.[1]?.trim();

export function notesTemplates(text: string): Checked<Templates> {
  const blocks = new Map([...text.matchAll(/^### (\S+)\n\n~~~\w*\n([\s\S]*?)\n?~~~$/gm)].map((m) => [m[1] ?? "", m[2] ?? ""]));
  const planner: Record<string, string> = {};
  const action: Record<string, string> = {};
  for (const slot of Object.keys(SLOTS) as TemplateSlot[]) {
    const v = blocks.get(slot);
    if (v === undefined) return { errors: [`no ${slot} prompt`] };
    (slot.startsWith("planner.") ? planner : action)[slot.split(".")[1] ?? ""] = v;
  }
  let knobs: unknown;
  try {
    knobs = JSON.parse(blocks.get("knobs") ?? "{}");
  } catch {
    return { errors: ["the knobs are not JSON"] };
  }
  return checkTemplates({ planner, action, knobs }, DEFAULT_TEMPLATES);
}

export function withReview(text: string, review: string): string {
  const start = text.indexOf(REVIEW_START);
  const end = text.indexOf(REVIEW_END);
  if (start < 0 || end < start) throw new Error("the notes have no review markers");
  return `${text.slice(0, start + REVIEW_START.length)}\n\n${review.trim()}\n\n${text.slice(end)}`;
}

/** Notes file names, newest first. */
export async function notesFiles(): Promise<string[]> {
  const names: string[] = [];
  for await (const name of new Bun.Glob("2*.md").scan(NOTES_DIR)) names.push(name);
  return names.sort().reverse();
}
