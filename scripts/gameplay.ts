// The learning loop's files in gameplay/: coach.md (the coach's three prompts), coach-log.md (one
// entry per iteration, which also says where the loop stands), playbook.json (the templates and
// starting weapon the coach currently thinks best), beliefs.csv (what the loop holds true, good and
// bad), experiments/ (one Markdown file per question, with its games), gyms.jsonl (saved game states
// the training ground starts from), infrastructure_feedback.csv and notes/ (full runs only). This
// module owns their formats and turns away an edit that would break one, so the loop can never
// wedge itself.
import path from "node:path";
import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import type { CheckpointMeta, LoadoutSpec, RunTotals } from "../src/agent/protocol";

export const GAMEPLAY = path.join(import.meta.dir, "..", "gameplay");
export const NOTES_DIR = path.join(GAMEPLAY, "notes");
export const EXPERIMENTS_DIR = path.join(GAMEPLAY, "experiments");
export const COACH_MD = path.join(GAMEPLAY, "coach.md");
export const COACH_LOG = path.join(GAMEPLAY, "coach-log.md");
export const PLAYBOOK_JSON = path.join(GAMEPLAY, "playbook.json");
export const BELIEFS_CSV = path.join(GAMEPLAY, "beliefs.csv");
export const INFRA_CSV = path.join(GAMEPLAY, "infrastructure_feedback.csv");
export const GYMS_JSONL = path.join(GAMEPLAY, "gyms.jsonl");

/** The bot's goal options reach this far, and a target given up on is noted for this long. */
export const PLAN_RANGE = 600;
export const GIVE_UP_SECONDS = 45;

export type Checked<T> = { value: T } | { errors: string[] };

export const clock = (seconds: number, sep = ":") => `${String(Math.floor(seconds / 60)).padStart(2, "0")}${sep}${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
export const hash = (text: string) => createHash("sha1").update(text).digest("hex").slice(0, 8);
export const isText = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";


// ---- Tables --------------------------------------------------------------------------------

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c !== '"') field += c;
      else if (text[i + 1] === '"') {
        field += '"';
        i++;
      } else quoted = false;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") field += c;
  }
  if (field !== "" || row.length > 0) rows.push([...row, field]);
  return rows.filter((r) => r.some((f) => f !== ""));
}

const csvField = (v: string) => {
  const flat = v.replace(/\s+/g, " ").trim();
  return /[",]/.test(flat) ? `"${flat.replace(/"/g, '""')}"` : flat;
};

export const INFRA_COLUMNS = ["date", "run", "status", "request", "why"] as const;
export type InfraRow = Record<(typeof INFRA_COLUMNS)[number], string>;

async function readTable<C extends readonly string[]>(file: string, columns: C): Promise<Record<C[number], string>[]> {
  const [header, ...rows] = parseCsv(await Bun.file(file).text());
  if (header?.join(",") !== columns.join(",")) throw new Error(`${file} must start with the header ${columns.join(",")}`);
  return rows.map((r, i) => {
    if (r.length !== columns.length) throw new Error(`${file} row ${i + 2} has ${r.length} fields, not ${columns.length}`);
    return Object.fromEntries(columns.map((c, j) => [c, r[j] ?? ""])) as Record<C[number], string>;
  });
}

async function writeTable<C extends readonly string[]>(file: string, columns: C, rows: Record<C[number], string>[]) {
  await Bun.write(file, [columns.join(","), ...rows.map((r) => columns.map((c) => csvField(r[c as C[number]])).join(","))].join("\n") + "\n");
}

/**
 * A table the coach rewrites whole. Its rows are never deleted, only moved to `retire`, so nothing
 * the loop learned is lost; `stamps` are columns the bot fills, never the coach.
 */
type Table<C extends readonly string[]> = {
  name: string;
  file: string;
  columns: C;
  required: C[number][];
  enums: Partial<Record<C[number], readonly string[]>>;
  retire: string;
  stamps: C[number][];
};
/**
 * The part of the game an experiment is about. The coverage table counts them, so a coach can see
 * which parts of the game no experiment has looked at yet.
 */
export const AREAS = {
  build: "weapons, passives, level-up picks, recipes and evolutions, reroll, skip and banish",
  items: "items and what they do",
  spots: "chests, shrines and every spot that charges",
  enemies: "pests: which hurt, how, and how to handle them",
  bosses: "bosses: when they come, how they hit, how to beat or avoid them",
  hazards: "ground hazards and the biomes that make them",
  movement: "walking, dodging, dashing and evading",
  economy: "gold, shops, carts and what to spend on",
  map: "exploring and where things are",
  meta: "the ladder, curses, gear and anything across runs",
  models: "how the planner and the action model read their prompts",
} as const;

// What the loop holds true right now, about the game or about how the models behave, and whether
// it is good (worth doing), bad (worth avoiding) or a plain fact. Experiments are questions;
// beliefs are the answers that survived them, kept so a rewritten prompt cannot quietly drop one.
const BELIEF_COLUMNS = ["id", "about", "verdict", "claim", "confidence", "status", "evidence", "experiments", "created", "updated"] as const;
export type BeliefRow = Record<(typeof BELIEF_COLUMNS)[number], string>;
export const BELIEFS: Table<typeof BELIEF_COLUMNS> = {
  name: "beliefs",
  file: BELIEFS_CSV,
  columns: BELIEF_COLUMNS,
  required: ["id", "claim", "evidence"],
  enums: { about: ["game", "planner", "action", "coach"], verdict: ["good", "bad", "fact"], confidence: ["lead", "likely", "confirmed"], status: ["held", "recheck", "disproved"] },
  retire: "status disproved",
  stamps: ["created", "updated"],
};

export const readBeliefs = () => readTable(BELIEFS_CSV, BELIEF_COLUMNS);
export const readInfra = () => readTable(INFRA_CSV, INFRA_COLUMNS);

/**
 * Why a new coach prompt would lose what the current one holds, if it would. Composer once replaced
 * the whole plan prompt with a note about one experiment; a section can be rewritten but not dropped.
 */
export function promptLoss(now: string, next: string, file: string): string | undefined {
  const headings = (t: string) => [...t.matchAll(/^## .+$/gm)].map((m) => m[0].trim());
  const dropped = headings(now).filter((h) => !headings(next).includes(h));
  if (dropped.length > 0) return `${file} must keep every ## section of the current one; it drops ${dropped.join(", ")}. Rewrite a section's text instead, or leave the file out`;
  if (next.length < now.length / 2) return `${file} would shrink from ${now.length} to ${next.length} characters; it must keep at least half of what is there`;
  return undefined;
}


// ---- Templates -----------------------------------------------------------------------------
// The planner's and the action model's prompts are templates the coach writes before every run.
// `{{name}}` takes a piece of the game state, which the bot renders only when a template uses it.

/** State blocks every template may use. The bot renders each from the live game. */
export const BLOCKS = {
  time: "game time as m:ss",
  difficulty: "the run's difficulty, such as nightmare",
  mode: "daily or world",
  health: "health, its share of max and its trend over the last 30 seconds, e.g. 'Health 80/120 (67%, down from 90% 25 seconds ago).' It adds ', which is low' under 40%",
  level: "level and the share of the way to the next",
  gold: "gold held",
  dash: "dash charges",
  weapons: "weapons held (of 6 slots), each with its level and the game's description",
  passives: "passives held (of 6 slots), each with its level and the game's description",
  items: "items held with counts and the game's descriptions",
  banished: "what was banished this run, which the game never offers again",
  recipes: "every recipe that uses something held, with each part's state",
  evolutions: "what the next chest evolves, or that no recipe is complete",
  standing_on: "the chest or spot Tibo stands on and how far it is charged, and any hazard underfoot",
  hurt_by: "damage taken in the last 3 seconds by source",
  bosses: "bosses with distance, direction and health",
  enemies: "enemies around, how many within 60 units, and the most and least crowded directions within 150",
  current_goal: "the goal under way and since when",
  recent_goals: "the last 6 goals and how each ended",
  weapon_damage: "damage dealt so far by each weapon held, most first, with its rate a minute, e.g. 'Damage dealt so far by weapon: Steam Vent 4012 (1783 a minute), Hash Hawk 2210 (982 a minute).' (not part of {{state}})",
  state: "every block above except difficulty, mode and weapon_damage, one per line: the whole state",
} as const;
export type BlockName = keyof typeof BLOCKS;

/** Where each template is used, the extra values it may use on top of BLOCKS, and the ones it must. */
export const SLOTS = {
  "planner.state": { about: "the planner's state: everything it reads before each decision, sent once per planner call", vars: { why: "why the planner is asked now: the run started, a goal ended, a choice opened, a card was just taken, a boss appeared, or N seconds passed" }, required: [] },
  "planner.goal": { about: "asked once per goal option as a yes/no question (noul); the option rated highest becomes the goal", vars: { goal: "one goal option in words, e.g. 'walk to the chest 120 away to the up-left and stand on it for 1 seconds to open it, which gives a free pick'" }, required: ["goal"] },
  "planner.pick": { about: "asked once at a level-up, chest or shrine as a choice among the cards; each card key carries its kind, slot, pairings, whether the game recommends it, and the game's description", vars: { choice: "level-up, chest or shrine" }, required: [] },
  "action.state": { about: "the action model's state, sent once per step it is asked about", vars: { goal: "the goal in words with its progress, e.g. 'open the chest, 80 away to the left'" }, required: [] },
  "action.hurt": { about: "asked once per move offered, answered on the scale: takes no damage, gets scratched, gets badly hurt, gets very badly hurt, dies", vars: { move: "one move in words: the game's own forecast for the next second first, then a boss or hazard that way, enemies close, and how it bears on the goal", goal: "as in action.state" }, required: ["move"] },
  "action.useful": { about: "asked once per move offered as a yes/no question (noul); among the moves rated about as safe as the safest, the most useful wins", vars: { move: "as in action.hurt", goal: "as in action.state" }, required: ["move"] },
  "action.dash": { about: "asked as a yes/no question when Tibo has a dash charge and an enemy or bullet is close; above dashThreshold (bossDashThreshold near a boss) Tibo dashes the chosen way. Empty: never dash", vars: { goal: "as in action.state" }, required: [] },
} as const;
export type Slot = keyof typeof SLOTS;

export type Knobs = { exploreDistance: number; evadeSeconds: number; gemsSeconds: number; stuckSeconds: number; extraDamage: number; safeMargin: number; distrustSeconds: number; distrustBossRange: number; planEvery: number; eliteSeconds: number; bossOfferRange: number; dashThreshold: number; bossDashThreshold: number; bossDashRange: number; eliteFrom: number; eliteMinHp: number };
export const KNOBS: Record<keyof Knobs, { min: number; max: number; about: string }> = {
  exploreDistance: { min: 100, max: 1500, about: "units an explore goal walks before it ends; it also ends at the first chest never listed before" },
  evadeSeconds: { min: 2, max: 30, about: "seconds an evade goal lasts" },
  gemsSeconds: { min: 3, max: 40, about: "seconds a gems goal collects for at most" },
  stuckSeconds: { min: 2, max: 20, about: "seconds without getting closer (or charging) before a goal is given up" },
  extraDamage: { min: 0, max: 0.25, about: "share of max health a move may cost over the cheapest move in the next second and still be taken: the page walks Tibo to the goal on its own while the way there costs no more than this over the cheapest, and the action model is never offered a move that costs more" },
  safeMargin: { min: 0, max: 0.5, about: "how far above the safest move's hurt rating (as a share of the scale) a move may be and still compete on usefulness" },
  distrustSeconds: { min: 0, max: 30, about: "after Tibo loses health on a step the forecast called free (a walk row), the action model is asked about every step for this many seconds instead of the page walking on its own; 0 trusts the forecast" },
  bossOfferRange: { min: 0, max: 600, about: "while a boss is within this many units, the action model is offered every move, even those the one-second forecast prices above extraDamage, since boss attacks are not in that forecast; 0 keeps the usual rule" },
  eliteSeconds: { min: 5, max: 60, about: "seconds a fight-the-elite goal lasts at most: Tibo heads for the elite and keeps it within reach of its weapons until it dies" },
  planEvery: { min: 1, max: 60, about: "seconds between planner calls while a goal is under way (it is also asked whenever a goal ends, a choice opens, a card is taken or a boss appears); short re-plans switch goals often, long ones let a goal finish. A person watching in the panel sets this instead" },
  distrustBossRange: { min: 0, max: 600, about: "while a boss is within this many units, the action model is asked about every step, since boss attacks from afar are not in the one-second forecast; 0 turns it off" },
  dashThreshold: { min: 0.05, max: 0.95, about: "how sure the action model's answer to action.dash must be (a probability) for Tibo to dash; lower dashes more often" },
  bossDashThreshold: { min: 0.05, max: 0.95, about: "the dash threshold instead of dashThreshold while a boss is within bossDashRange" },
  bossDashRange: { min: 0, max: 600, about: "while a boss is within this many units, bossDashThreshold applies; 0 never" },
  eliteFrom: { min: 0, max: 1200, about: "game seconds before which no fight-the-elite goal is offered, so the planner cannot pick one; 0 offers them from the start" },
  eliteMinHp: { min: 0, max: 1, about: "share of max health below which no fight-the-elite goal is offered; 0 offers them at any health" },
};

export const LOCKSTEP_CRUTCH = "knobs.lockstep is a crutch and is not to be enabled: it paused the game while the models thought, which no player can do. Every game plays live, as a person plays it.";

export type Templates = { planner: { state: string; goal: string; pick: string }; action: { state: string; hurt: string; useful: string; dash: string }; knobs: Knobs };

/** The prompts the bot played with before the coach wrote any; used when no run has templates yet. */
export const DEFAULT_TEMPLATES: Templates = {
  planner: {
    state: [
      "You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.",
      "The aim: survive 20 minutes on {{difficulty}}.",
      "Asked now because {{why}}. State now:",
      "{{state}}",
    ].join("\n\n"),
    goal: "If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger?",
    pick: "Tibo is at a {{choice}}. Which option makes Tibo strongest?",
  },
  action: {
    state: "Tibo is a potato hero in a survivors game. Weapons fire on their own; Tibo only walks.\nGoal: {{goal}}.\n{{health}}",
    hurt: "If Tibo does this: {{move}}. How badly does it hurt Tibo in the next second?",
    useful: "If Tibo does this: {{move}}. Does it bring Tibo closer to its goal ({{goal}})?",
    dash: "Is Tibo about to be hit or surrounded, so a quick dash away would save it?",
  },
  knobs: { exploreDistance: 300, evadeSeconds: 8, gemsSeconds: 12, stuckSeconds: 6, extraDamage: 0.02, safeMargin: 0.1, distrustSeconds: 0, distrustBossRange: 0, planEvery: 5, eliteSeconds: 20, bossOfferRange: 0, dashThreshold: 0.5, bossDashThreshold: 0.5, bossDashRange: 0, eliteFrom: 0, eliteMinHp: 0 },
};

const STATE_LIMIT = 8000;
const QUESTION_LIMIT = 800;

export function slotText(t: Templates, slot: Slot): string {
  const [model, key] = slot.split(".") as ["planner" | "action", string];
  return (t[model] as Record<string, string>)[key] ?? "";
}

/** Fills a template's `{{name}}`s; every name was checked against the slot when the template was accepted. */
export function render(template: string, values: Record<string, () => string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) => {
    const v = values[name];
    if (v === undefined) throw new Error(`no value for {{${name}}}`);
    return v();
  });
}

/** Reads templates from a coach reply or a notes file; anything left out keeps `base`. */
export function checkTemplates(raw: { planner?: unknown; action?: unknown; knobs?: unknown }, base: Templates): Checked<Templates> {
  const errors: string[] = [];
  const pick = (model: "planner" | "action"): Record<string, string> => {
    const given = raw[model];
    if (given === undefined) return { ...base[model] };
    if (typeof given !== "object" || given === null) {
      errors.push(`${model} must be an object`);
      return { ...base[model] };
    }
    const out: Record<string, string> = { ...base[model] };
    for (const [k, v] of Object.entries(given)) {
      if (!(`${model}.${k}` in SLOTS)) errors.push(`${model}.${k} is not a template; the templates are ${Object.keys(SLOTS).join(", ")}`);
      else if (typeof v !== "string") errors.push(`${model}.${k} must be a string`);
      else out[k] = v;
    }
    return out;
  };
  const templates = { planner: pick("planner"), action: pick("action"), knobs: { ...base.knobs } } as Templates;
  for (const slot of Object.keys(SLOTS) as Slot[]) {
    const text = slotText(templates, slot);
    const { vars, required } = SLOTS[slot];
    const limit = slot.endsWith(".state") ? STATE_LIMIT : QUESTION_LIMIT;
    if (text.length > limit) errors.push(`${slot} is ${text.length} characters; keep it under ${limit}`);
    if (text.includes("~~~")) errors.push(`${slot} must not contain ~~~`);
    if (text.trim() === "" && slot !== "action.dash") errors.push(`${slot} is empty`);
    const used = [...text.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1] ?? "");
    for (const name of used) if (!(name in BLOCKS) && !(name in vars)) errors.push(`${slot} uses {{${name}}}, which it cannot: it may use ${[...Object.keys(BLOCKS), ...Object.keys(vars)].join(", ")}`);
    for (const name of required as readonly string[]) if (!used.includes(name)) errors.push(`${slot} must use {{${name}}}`);
  }
  if (raw.knobs !== undefined) {
    if (typeof raw.knobs !== "object" || raw.knobs === null) errors.push("knobs must be an object");
    else
      for (const [k, v] of Object.entries(raw.knobs)) {
        if (k === "lockstep") {
          if (v !== 0) errors.push(LOCKSTEP_CRUTCH);
          continue;
        }
        const range = KNOBS[k as keyof Knobs];
        if (range === undefined) errors.push(`knobs.${k} is not a knob; the knobs are ${Object.keys(KNOBS).join(", ")}`);
        else if (typeof v !== "number" || !(v >= range.min && v <= range.max)) errors.push(`knobs.${k} must be a number from ${range.min} to ${range.max}`);
        else templates.knobs[k as keyof Knobs] = v;
      }
  }
  return errors.length > 0 ? { errors } : { value: templates };
}

function checkTable<C extends readonly string[]>(raw: unknown, table: Table<C>, before: Record<C[number], string>[], errors: string[]): Record<C[number], string>[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) {
    errors.push(`${table.name} must be an array of the rows to add or change`);
    return undefined;
  }
  const columns = table.columns as readonly C[number][];
  const rows: Record<C[number], string>[] = [];
  for (const [i, r] of raw.entries()) {
    if (typeof r !== "object" || r === null) {
      errors.push(`${table.name}[${i}] must be an object`);
      continue;
    }
    const o = r as Record<string, unknown>;
    for (const k of Object.keys(o)) if (!(columns as readonly string[]).includes(k)) errors.push(`${table.name}[${i}].${k} is not a column; the columns are ${columns.join(", ")}`);
    // A row with an id the table has updates it, and the keys it leaves out keep their values.
    const old = before.find((b) => b[columns[0] as C[number]] === String(o[columns[0] as string] ?? ""));
    const row = Object.fromEntries(columns.map((c) => [c, o[c] === undefined || o[c] === null ? (old?.[c] ?? "") : String(o[c])])) as Record<C[number], string>;
    const id = row[columns[0] as C[number]] || `[${i}]`;
    for (const c of table.required) if (!isText(row[c])) errors.push(`${table.name} ${id} has no ${c}`);
    for (const [c, allowed] of Object.entries(table.enums) as [C[number], readonly string[]][])
      if (!allowed.includes(row[c])) errors.push(`${table.name} ${id} ${c} must be ${allowed.includes("") ? "empty or " : ""}one of ${allowed.filter(Boolean).join(", ")}`);
    rows.push(row);
  }
  const ids = rows.map((r) => r[columns[0] as C[number]]);
  for (const id of new Set(ids.filter((id, i) => ids.indexOf(id) !== i))) errors.push(`${table.name} id ${id} is used twice`);
  return rows;
}

/** A belief keeps the run it was first written in, and gets the current run whenever the coach changes it. */
export function stampBeliefs(rows: BeliefRow[], before: BeliefRow[], run: string): BeliefRow[] {
  const same = (a: BeliefRow, b: BeliefRow) => BELIEF_COLUMNS.every((c) => BELIEFS.stamps.includes(c) || a[c] === b[c]);
  return rows.map((row) => {
    const old = before.find((b) => b.id === row.id);
    return { ...row, created: old?.created ?? run, updated: old !== undefined && same(old, row) ? old.updated : run };
  });
}


const today = () => new Date().toISOString().slice(0, 10);

// The loop and a person answering infrastructure requests can write gameplay/ at once, so every
// read-modify-write of its files holds this lock.
const LOCK = path.join(GAMEPLAY, ".lock");
const STALE_LOCK_MS = 30_000;

export async function locked<T>(work: () => Promise<T>): Promise<T> {
  for (;;) {
    try {
      mkdirSync(LOCK);
      break;
    } catch {
      // A holder that died mid-write leaves the lock behind; nothing holds it this long.
      const age = Date.now() - (statSync(LOCK, { throwIfNoEntry: false })?.mtimeMs ?? Date.now());
      if (age > STALE_LOCK_MS) rmSync(LOCK, { recursive: true, force: true });
      await Bun.sleep(50);
    }
  }
  try {
    return await work();
  } finally {
    rmSync(LOCK, { recursive: true, force: true });
  }
}

/** The coach's added and changed rows over the table: a changed row is replaced where it stands, and a new one goes at the end. */
export function upsert<R extends { id: string }>(changed: R[], now: R[]): R[] {
  const out = now.map((r) => changed.find((c) => c.id === r.id) ?? r);
  return [...out, ...changed.filter((c) => !now.some((r) => r.id === c.id))];
}

// ---- Notes ---------------------------------------------------------------------------------
// One file per run, written when the run ends, named for when it started and how long Tibo lived.
// The bot writes the facts, the plan and the prompts; the coach writes the review between the
// review markers. `--review` and the next plan read a notes file back from these same headings.

export type Surface = "headless" | "browser";
/** `bot` is the commit of the bot code that played, so a review can tell whether a fix had landed. */
export type RunSetup = { started: Date; difficulty: string; mode: "daily" | "world"; surface: Surface; seed: string; planner: string; action: string; coach: string; bot: string };
/** `weapon` is the starting weapon the coach chose by id, or "" for the game's Random. */
export type RunPlan = { source: string; intent: string; templates: Templates; weapon: string };
export type RunEnd = { lived: number; level?: number; kills?: number; ending: string; outcome: string[] };
/** `started` is what Tibo actually started with, which says whether the coach's choice was offered. */
export type NotesContent = { setup: RunSetup; plan: RunPlan; end: RunEnd; link: string; log: string; prompts: string; picks: string[]; review: string; started: string; stats: string; key: string };

const pad = (n: number) => String(n).padStart(2, "0");
/** The run's id: local start time, the start of its notes and log file names. */
export function runId(started: Date): string {
  const d = started;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

export function notesName(setup: RunSetup, lived: number): string {
  return `${runId(setup.started)}_lived-${clock(lived, "-")}_${setup.difficulty}_${setup.mode}_${setup.surface}.md`;
}

const REVIEW_START = "<!-- review: written by the coach after the run -->";
const REVIEW_END = "<!-- /review -->";

export function renderNotes(n: NotesContent): string {
  const { setup, plan, end } = n;
  const slots = Object.keys(SLOTS) as Slot[];
  return [
    `# ${runId(setup.started).replace("_", " ")}: lived ${clock(end.lived)} on ${setup.difficulty} ${setup.mode} (${setup.surface})`,
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
  for (const slot of Object.keys(SLOTS) as Slot[]) {
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

/** A finished run as the ladder sees it, read from its notes file name and header. */
export type RunRecord = { name: string; coach: string; difficulty: string; level: number; mode: string; lived: number; won: boolean; text: string };

export async function runRecords(): Promise<RunRecord[]> {
  const out: RunRecord[] = [];
  for (const name of await notesFiles()) {
    const m = name.match(/_lived-(\d+)-(\d+)_(.+)_(daily|world)_(headless|browser)\.md$/);
    if (m === null) continue;
    const text = await Bun.file(path.join(NOTES_DIR, name)).text();
    const difficulty = m[3] ?? "";
    out.push({ name, coach: (notesField(text, "Coach") ?? "?").split(" ")[0] ?? "?", difficulty, level: Number(difficulty.match(/^nightmare-(\d+)$/)?.[1] ?? 0), mode: m[4] ?? "", lived: Number(m[1]) * 60 + Number(m[2]), won: (notesField(text, "Ending") ?? "").startsWith("won"), text });
  }
  return out;
}


const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** Every full run, newest first, with the coach that planned it; runs before the coach was one (sonnet-medium, sonnet-high) count too. */
export async function campaign(): Promise<string> {
  const records = (await runRecords()).filter((r) => r.mode === "world" && r.level > 0);
  if (records.length === 0) return "No Open World Nightmare run yet.";
  const lines = ["| Run | Level | Lived | Won | Coach | Lockstep |", "| --- | --- | --- | --- | --- | --- |"];
  for (const r of records) lines.push(`| ${r.name.slice(0, 16).replace("_", " ")} | Nightmare ${r.level} | ${mmss(r.lived)} | ${r.won ? "yes" : "no"} | ${r.coach} | ${r.name < LIVE_SINCE ? "yes (banned since)" : "no"} |`);
  return lines.join("\n");
}

/** Runs from before this one played in lockstep, which is banned now. */
const LIVE_SINCE = "2026-11-08_07-5";


export async function latestNotes(count: number): Promise<string> {
  const out: string[] = [];
  for (const name of (await notesFiles()).slice(0, count)) {
    const text = await Bun.file(path.join(NOTES_DIR, name)).text();
    out.push(`### ${name}\n\n${text.replace(/\n## Prompts\n[\s\S]*$/, "\n").trim()}`);
  }
  return out.join("\n\n") || "(no runs yet)";
}

// ---- What the coach is told ----------------------------------------------------------------

export function catalog(): string {
  const slots = (Object.entries(SLOTS) as [Slot, (typeof SLOTS)[Slot]][]).map(
    ([slot, s]) => `- ${slot}: ${s.about}. Extra values: ${Object.entries(s.vars).map(([k, v]) => `{{${k}}} (${v})`).join(", ")}.${s.required.length > 0 ? ` Must use ${s.required.map((x) => `{{${x}}}`).join(", ")}.` : ""}`,
  );
  return [
    `Templates (each under ${QUESTION_LIMIT} characters, except the two .state templates, under ${STATE_LIMIT}):`,
    ...slots,
    "",
    "State blocks any template may use:",
    ...Object.entries(BLOCKS).map(([k, v]) => `- {{${k}}}: ${v}`),
    "",
    "Knobs:",
    ...Object.entries(KNOBS).map(([k, v]) => `- ${k} (${v.min} to ${v.max}): ${v.about}`),
  ].join("\n");
}

// ---- Run stats -----------------------------------------------------------------------------
// The numbers every review used to work out from the raw log by hand: health by minute and what
// took it, when bosses and the first chest came, how goals ended, what Tibo gained, and dashes.

const goalKind = (id: string) => (id.startsWith("C") ? "chest" : id.startsWith("P") ? "spot" : id.startsWith("F") ? "food" : /^E\d/.test(id) ? "elite" : id.split(" ")[0] || "?");

/** A Markdown summary of a run from its CSV log. */
export function runStats(csv: string): string {
  const [header = [], ...cells] = parseCsv(csv);
  if (header[0] !== "time") return `(no stats: the log is damaged, its first line is not the header but ${JSON.stringify((header.join(",")).slice(0, 80))})`;
  const rows = cells.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])) as Record<string, string>);
  const live = rows.filter((r) => r.seconds !== "");
  if (live.length === 0) return "(no log rows)";
  const num = (v: string | undefined) => Number(v) || 0;
  const minutes = new Map<number, Record<string, string>[]>();
  for (const r of live) {
    const m = Math.floor(num(r.seconds) / 60);
    minutes.set(m, [...(minutes.get(m) ?? []), r]);
  }
  const sources = (rs: Record<string, string>[]) => {
    const tally = new Map<string, number>();
    for (const r of rs)
      for (const part of (r.hurt_by ?? "").split("; ").filter(Boolean)) {
        const name = part.replace(/\s+[\d.]+$/, "");
        tally.set(name, (tally.get(name) ?? 0) + num(part.match(/([\d.]+)$/)?.[1]));
      }
    return [...tally].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k]) => k).join(", ") || "-";
  };
  // `dealt` is the run's damage dealt so far; logs before 2026-11-09 lack it.
  const hasDealt = live.some((r) => (r.dealt ?? "") !== "");
  let dealtBefore = num(live[0]?.dealt);
  const table = [
    `| Minute | Health at the end | Lost | Gained |${hasDealt ? " Damage dealt |" : ""} Level | Enemies | Hurt most by |`,
    `| --- | --- | --- | --- |${hasDealt ? " --- |" : ""} --- | --- | --- |`,
    ...[...minutes].map(([m, rs]) => {
      const last = rs.at(-1) ?? {};
      const lost = rs.reduce((a, r) => a + num(r.hp_lost), 0);
      const gained = rs.reduce((a, r) => a + num(r.hp_gained), 0);
      const dealt = num(last.dealt) - dealtBefore;
      dealtBefore = num(last.dealt);
      return `| ${m}:00 | ${last.hp}/${last.max_hp} | ${lost} | ${gained} |${hasDealt ? ` ${dealt} |` : ""} ${last.level} | ${last.enemies} | ${sources(rs.filter((r) => num(r.hp_lost) > 0))} |`;
    }),
  ];
  const seenBoss = new Map<string, string>();
  for (const r of live) for (const b of (r.bosses ?? "").split("; ").filter(Boolean)) {
    const name = b.replace(/\s+\d+\s+\S+\s+\d+%( of \d+)?$/, "");
    if (!seenBoss.has(name)) seenBoss.set(name, r.time ?? "?");
  }
  // Every entry is its own boss with its own health, even when several share an id and a spot.
  const lastRow = live.at(-1) ?? {};
  const bossesAtEnd = (lastRow.bosses ?? "").split("; ").filter(Boolean).map((b) => {
    const m = b.match(/^(.*?) \(.*\) \d+ \S+ (\d+)%(?: of (\d+))?$/);
    return m === null ? b : `${m[1]} at ${m[2]}%${m[3] === undefined ? "" : ` of ${m[3]}`}`;
  });
  const firstChest = live.find((r) => (r.chests ?? "") !== "")?.time;
  // Only Tibo opens chests, so a chest goal that finishes is a chest opened.
  const opened = rows.filter((r) => r.event === "goal" && r.action === "done" && goalKind(r.goal ?? "") === "chest");
  const atTwo = live.filter((r) => num(r.seconds) <= 120).at(-1) ?? lastRow;
  const byTwo = num(lastRow.seconds) >= 120 ? "By 2:00" : `By the end at ${lastRow.time ?? "?"}`;
  const openedByTwo = opened.filter((r) => num(r.seconds) <= 120).length;
  const goals = new Map<string, { done: number; failed: number; dropped: number }>();
  for (const r of rows.filter((x) => x.event === "goal" && x.action !== "start")) {
    const k = goalKind(r.goal ?? "");
    const g = goals.get(k) ?? { done: 0, failed: 0, dropped: 0 };
    if (r.action === "done" || r.action === "failed" || r.action === "dropped") g[r.action]++;
    goals.set(k, g);
  }
  // New cards and evolutions (a weapon gone the moment its evolution appears); level-ups are in the log.
  const gained = rows
    .filter((r) => r.event === "loadout")
    .map((r) => ({ time: r.time, parts: (r.action ?? "").split(", ").filter((p) => / new$| gone$/.test(p) || /\d\/\d to \d/.test(p) && Number(p.match(/to (\d+)/)?.[1]) - Number(p.match(/ (\d+)\/\d+ to/)?.[1]) >= 3) }))
    .filter((g) => g.parts.length > 0)
    .map((g) => `${g.time} ${g.parts.join(", ")}`);
  // A dash the action model chose on its own step says "dashed" in the detail; one taken while the
  // page walked to the goal is its own "dash <dir>" row.
  const dashes = rows
    .filter((r) => r.event === "move" && ((r.action ?? "").startsWith("dash") || /, dashed$/.test(r.detail ?? "")))
    .map((r) => {
      const score = (r.detail ?? "").match(/(\d+)%, dashed/)?.[1];
      const boss = Math.min(...[...(r.bosses ?? "").matchAll(/\) (\d+) /g)].map((m) => Number(m[1])));
      return `${r.time} (dash score ${score ?? "?"}%, health ${Math.round((100 * num(r.hp)) / Math.max(1, num(r.max_hp)))}%, ${num(r.enemies_near)} enemies within 60, ${Number.isFinite(boss) ? `a boss ${boss} away` : "no boss"})`;
    });
  const calls = (e: string) => rows.filter((r) => r.event === e);
  const meanMs = (rs: Record<string, string>[]) => Math.round(rs.reduce((a, r) => a + num(r.ms), 0) / Math.max(1, rs.length));
  const low = live.find((r) => num(r.hp) > 0 && num(r.hp) / Math.max(1, num(r.max_hp)) < 0.25)?.time;
  return [
    ...table,
    "",
    `- Bosses first seen: ${[...seenBoss].map(([k, t]) => `${k} at ${t}`).join("; ") || "none"}.`,
    `- Bosses alive at ${lastRow.time ?? "the end"}, each a separate boss with its own health: ${bossesAtEnd.join("; ") || "none"}.`,
    `- ${byTwo}: damage dealt ${hasDealt ? num(atTwo.dealt) : "not logged"}, elites killed ${(atTwo.elites ?? "") === "" ? "not logged" : num(atTwo.elites)}, chests opened ${openedByTwo}. Chests opened in the whole game: ${opened.length}, the first at ${opened[0]?.time ?? "never"}.`,
    `- First chest listed: ${firstChest ?? "never"}. First time under 25% health: ${low ?? "never"}.`,
    `- Goals by kind (done / gave up / dropped): ${[...goals].map(([k, g]) => `${k} ${g.done}/${g.failed}/${g.dropped}`).join("; ") || "none"}.`,
    `- Dashes: ${dashes.length}${dashes.length === 0 ? "" : `: ${dashes.slice(0, 12).join("; ")}${dashes.length > 12 ? "; …" : ""}`}.`,
    `- Model calls: ${calls("plan").length} plans, ${calls("pick").length} picks, ${calls("move").length} moves (mean ${meanMs(calls("move"))}ms); the page walked through ${calls("walk").length} hits on its own.`,
    `- New cards, evolutions and jumps of 3 or more levels (chests give those): ${gained.length === 0 ? "nothing logged" : gained.join("; ")}.`,
  ].join("\n");
}


/**
 * A run's opening in one line, for comparing runs: when the first chest was listed, how many
 * chests were open by 2:30, how many elites (which drop chests) were fought and killed by 3:00, when
 * the first evolution came, and the level at 3:00. Across the first
 * nine Open World runs, the three that passed 15:00 had opened three or four chests by 2:15.
 */
export function keyNumbers(csv: string): string {
  const [header = [], ...cells] = parseCsv(csv);
  if (header[0] !== "time") return "(no numbers: the log is damaged)";
  const rows = cells.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])) as Record<string, string>);
  const at = (r: Record<string, string>) => Number(r.seconds) || 0;
  const listed = rows.find((r) => (r.chests ?? "") !== "")?.time ?? "never";
  const opened = rows.filter((r) => r.event === "goal" && (r.goal ?? "").startsWith("C") && r.action === "done" && at(r) <= 150).length;
  const evolution = rows.find((r) => r.event === "loadout" && / 1\/1 new/.test(r.action ?? ""))?.time ?? "none";
  const level = [...rows].reverse().find((r) => r.seconds !== "" && at(r) <= 180)?.level ?? "?";
  const elite = (r: Record<string, string>) => r.event === "goal" && /^E\d/.test(r.goal ?? "") && at(r) <= 180;
  const fought = rows.filter((r) => elite(r) && r.action === "start").length;
  const killed = rows.filter((r) => elite(r) && r.action === "done").length;
  return `first chest listed ${listed}; ${opened} chests opened by 2:30; ${fought} elite fights and ${killed} elites killed by 3:00; first evolution ${evolution}; level ${level} at 3:00`;
}

// ---- Experiments -----------------------------------------------------------------------------
// One Markdown file per question, gameplay/experiments/experiment_<name>.md. The coach writes the
// header fields and the Hypothesis, Method and Findings sections; the loop appends one entry under
// Games for every training-ground game played for it.

export const EXPERIMENT_STATUSES = ["proposed", "running", "done", "recheck", "retired"] as const;
export const EXPERIMENT_RESULTS = ["", "confirmed", "refuted", "inconclusive"] as const;
export type Area = keyof typeof AREAS;
export type Experiment = {
  name: string;
  title: string;
  status: (typeof EXPERIMENT_STATUSES)[number];
  area: Area;
  result: (typeof EXPERIMENT_RESULTS)[number];
  created: string;
  updated: string;
  hypothesis: string;
  method: string;
  findings: string;
  /** Written by the loop: one entry per game played for this experiment. */
  games: string;
};
const EXPERIMENT_TEXT = ["hypothesis", "method", "findings"] as const;
const EXPERIMENT_FIELDS = ["status", "area", "result", "created", "updated"] as const;
export const EXPERIMENT_NAME = /^[a-z0-9]+(-[a-z0-9]+){0,7}$/;
export const experimentFile = (name: string) => path.join(EXPERIMENTS_DIR, `experiment_${name}.md`);
const title = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function renderExperiment(e: Experiment): string {
  return [
    `# ${e.title}`,
    "",
    "| Field | Value |",
    "| --- | --- |",
    ...EXPERIMENT_FIELDS.map((f) => `| ${title(f)} | ${e[f] || "-"} |`),
    "",
    ...EXPERIMENT_TEXT.flatMap((f) => [`## ${title(f)}`, "", e[f].trim() || "(none yet)", ""]),
    "## Games",
    "",
    e.games.trim() || "(none played yet)",
    "",
  ].join("\n");
}

export function parseExperiment(text: string, name: string): Experiment {
  const field = (f: string) => {
    const v = text.match(new RegExp(`^\\| ${title(f)} \\| (.*) \\|$`, "m"))?.[1]?.trim() ?? "";
    return v === "-" ? "" : v;
  };
  const section = (f: string) => {
    const v = text.match(new RegExp(`^## ${title(f)}\\n\\n([\\s\\S]*?)(?=\\n## |(?![\\s\\S]))`, "m"))?.[1]?.trim() ?? "";
    return v === "(none yet)" || v === "(none played yet)" ? "" : v;
  };
  return {
    name,
    title: text.match(/^# (.+)$/m)?.[1]?.trim() ?? name,
    status: field("status") as Experiment["status"],
    area: field("area") as Area,
    result: field("result") as Experiment["result"],
    created: field("created"),
    updated: field("updated"),
    hypothesis: section("hypothesis"),
    method: section("method"),
    findings: section("findings"),
    games: section("games"),
  };
}

export async function readExperiments(): Promise<Experiment[]> {
  let files: string[];
  try {
    files = readdirSync(EXPERIMENTS_DIR).filter((f) => /^experiment_.+\.md$/.test(f));
  } catch {
    return [];
  }
  return Promise.all(files.sort().map(async (f) => parseExperiment(await Bun.file(path.join(EXPERIMENTS_DIR, f)).text(), f.slice("experiment_".length, -3))));
}

async function writeExperiment(e: Experiment) {
  mkdirSync(EXPERIMENTS_DIR, { recursive: true });
  await Bun.write(experimentFile(e.name), renderExperiment(e));
}

/** Adds game entries to an experiment's Games section. */
export async function addGames(name: string, entries: string[]) {
  await locked(async () => {
    const file = Bun.file(experimentFile(name));
    if (!(await file.exists())) return;
    const e = parseExperiment(await file.text(), name);
    e.games = [e.games, ...entries].filter((x) => x.trim() !== "").join("\n\n");
    await writeExperiment(e);
  });
}

/** Per area: experiments done, open and retired. */
export function coverage(rows: Experiment[]): string {
  const lines = ["| Area | Done | Open | Retired | Last loop with games | What it covers |", "| --- | --- | --- | --- | --- | --- |"];
  for (const [area, about] of Object.entries(AREAS)) {
    const rs = rows.filter((r) => r.area === area);
    const last = lastLoopTested(rows, area as Area);
    lines.push(`| ${area} | ${rs.filter((r) => r.status === "done").length} | ${rs.filter((r) => r.status === "proposed" || r.status === "running" || r.status === "recheck").length} | ${rs.filter((r) => r.status === "retired").length} | ${last === 0 ? "never" : `loop ${last}`} | ${about} |`);
  }
  return lines.join("\n");
}

/** The loops an experiment had games in, from its game ids (L4.I3.G2). */
export const gameLoops = (e: Experiment) => [...e.games.matchAll(/^### L(\d+)\.I\d+\.G\d+/gm)].map((m) => Number(m[1]));

/** The ids of an experiment's games, such as L4.I3.G2. */
export const gameIds = (e: Experiment) => [...e.games.matchAll(/^### (L\d+\.I\d+\.G\d+)/gm)].map((m) => m[1] ?? "");

export const lastLoopTested = (rows: Experiment[], area: Area) => Math.max(0, ...rows.filter((r) => r.area === area).flatMap(gameLoops));

/**
 * The areas every loop has to look at. One that had no games this loop or the last is overdue,
 * and while any is, each iteration plays at least one game for an overdue area.
 */
export const REQUIRED_AREAS = ["build", "items", "economy", "bosses", "movement", "spots", "models"] as const satisfies readonly Area[];
export const overdueAreas = (rows: Experiment[], loop: number) => REQUIRED_AREAS.filter((a) => lastLoopTested(rows, a) < loop - 1);

/** Whether an experiment's games include one from a fresh start (0:00 on a new seed). */
export const hasFreshGames = (e: Experiment) => /^- Start: a fresh game/m.test(e.games);

// ---- Gyms ------------------------------------------------------------------------------------
// Saved game states the training ground starts games from, kept so ideas can be tried again and
// again under known conditions. A gym is built by playing a fresh game on a seed other than the
// evaluation seed to its time, or saved from the end of a game. Its recipe stays, so a gym the game
// can no longer load (a new game build) is built again.

export type Gym = {
  name: string;
  status: "pending" | "building" | "ready" | "failed" | "retired";
  purpose: string;
  /** "loop" for the gyms the loop keeps from the start, else "coach". Gyms from before the one coach name the coach that asked. */
  coach: string;
  created: string;
  /** The Nightmare level, 1 to 10. */
  difficulty: number;
  /** Game seconds the gym is saved at. */
  at: number;
  weapon: string;
  loadout?: LoadoutSpec;
  seed: string;
  /** How it came to be: built from a recipe, or saved at the end of a game. */
  source: string;
  /** Every iteration a game started from it, with when. */
  used?: { iteration: string; at: string }[];
  /** The templates that played up to it, for a rebuild. */
  templates?: Templates;
  checkpoint?: CheckpointMeta;
  error?: string;
};

export const GYM_NAME = /^[a-z0-9]+(-[a-z0-9]+){0,6}$/;

export async function readGyms(): Promise<Gym[]> {
  const f = Bun.file(GYMS_JSONL);
  if (!(await f.exists())) return [];
  return (await f.text())
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line) as Gym);
}

/** Changes gyms under the lock. */
export async function updateGyms<T>(change: (gyms: Gym[]) => T | Promise<T>): Promise<T> {
  return locked(async () => {
    const gyms = await readGyms();
    const out = await change(gyms);
    await Bun.write(GYMS_JSONL, gyms.map((g) => `${JSON.stringify(g)}\n`).join(""));
    return out;
  });
}

export function gymLine(g: Gym): string {
  const build = g.checkpoint === undefined ? "" : `; lv ${g.checkpoint.level}, hp ${g.checkpoint.hp}, ${[...g.checkpoint.weapons, ...g.checkpoint.passives, ...g.checkpoint.items].join(", ")}`;
  const used = g.used === undefined || g.used.length === 0 ? "never used" : `used in ${g.used.length} iterations, last ${g.used.at(-1)?.iteration}`;
  return `- ${g.name} (${g.status}${g.error === undefined ? "" : `: ${g.error}`}): Nightmare ${g.difficulty} at ${clock(g.at)}${g.weapon === "" ? "" : `, started with ${g.weapon}`}${g.loadout === undefined ? "" : ", build swapped in at the start"}${build}. ${g.purpose} (by ${g.coach}, ${g.source}; ${used})`;
}

// ---- The coach ---------------------------------------------------------------------------------
// coach.md holds the coach's three prompts, each a part under its own # heading; the coach rewrites
// one part at a time.

export const PROMPT_TITLES = { experiments: "Experiments", fullRun: "Full run", reflect: "Reflect" } as const;
export type PromptKey = keyof typeof PROMPT_TITLES;
const PROMPT_KEYS = Object.keys(PROMPT_TITLES) as PromptKey[];

export function splitPrompts(text: string): Record<PromptKey, string> {
  const parts = text.split(/^(?=# )/m).map((p) => p.trim()).filter(Boolean);
  const out = {} as Record<PromptKey, string>;
  for (const key of PROMPT_KEYS) {
    const part = parts.find((p) => p.split("\n")[0] === `# ${PROMPT_TITLES[key]}`);
    if (part === undefined) throw new Error(`coach.md has no "# ${PROMPT_TITLES[key]}" part`);
    out[key] = part;
  }
  return out;
}

export const readPrompts = async () => splitPrompts(await Bun.file(COACH_MD).text());

export async function writePrompts(prompts: Record<PromptKey, string>) {
  await Bun.write(COACH_MD, `${PROMPT_KEYS.map((k) => prompts[k].trim()).join("\n\n")}\n`);
}

/** A rewritten part: it keeps its # heading and adds no other, so coach.md still splits into its three parts. */
export function checkPromptPart(key: PromptKey, text: string): Checked<string> {
  const heading = `# ${PROMPT_TITLES[key]}`;
  const body = text.trim().startsWith(heading) ? text.trim() : `${heading}\n\n${text.trim()}`;
  const other = body.split("\n").slice(1).find((l) => /^# /.test(l));
  return other === undefined ? { value: body } : { errors: [`prompts.${key} may hold only its own # heading; use ## for sections, not "${other}"`] };
}

/** The templates and starting weapon ("" for the game's Random) the coach currently plays best with. */
export type Playbook = { templates: Templates; weapon: string; updated: string; why: string };

export async function readPlaybook(): Promise<Playbook> {
  const f = Bun.file(PLAYBOOK_JSON);
  if (!(await f.exists())) return { templates: DEFAULT_TEMPLATES, weapon: "", updated: "never", why: "the built-in defaults" };
  const raw = (await f.json()) as Playbook;
  const t = checkTemplates(raw.templates, DEFAULT_TEMPLATES);
  if ("errors" in t) throw new Error(`${PLAYBOOK_JSON}: ${t.errors.join("; ")}`);
  return { ...raw, templates: t.value };
}

export async function writePlaybook(p: Playbook) {
  await Bun.write(PLAYBOOK_JSON, `${JSON.stringify(p, null, 2)}\n`);
}

/** Where the coach's loop stands. */
export type CoachState = { loop: number; iteration: number };

/**
 * Where the loop goes on from, read off the last entry of the coach's log: an experiment
 * iteration is logged when it is done, and a loop when its reflection is. A full run that never
 * got its reflection is played again.
 */
export function stateFromLog(log: string): CoachState {
  const last = [...log.matchAll(/^## L(\d+)\.I(\d+): ([^(\n]+)/gm)].at(-1);
  if (last === undefined) return { loop: 1, iteration: 1 };
  const [loop, iteration, title] = [Number(last[1]), Number(last[2]), (last[3] ?? "").trim()];
  if (title === "reflection") return { loop: loop + 1, iteration: 1 };
  if (iteration >= 10) return { loop, iteration: 10 };
  return { loop, iteration: iteration + 1 };
}

export const readCoachState = async () => stateFromLog(await Bun.file(COACH_LOG).text().catch(() => ""));

/** Fails at startup when the coach's prompts are missing or a loop file is unreadable. */
export async function checkLoopFiles() {
  mkdirSync(NOTES_DIR, { recursive: true });
  mkdirSync(EXPERIMENTS_DIR, { recursive: true });
  await readPrompts();
  await readBeliefs();
  await readInfra();
  await readPlaybook();
  await readGyms();
  await readExperiments();
}

// ---- Coach edits ---------------------------------------------------------------------------------
// Every coach call may change beliefs and experiments and file infrastructure requests. The rest
// (games, gyms, the playbook, prompt rewrites) depends on the call and is checked by the loop.

export type ExperimentEdit = Partial<Omit<Experiment, "games" | "created" | "updated">> & { name: string };
export type LoopEdits = { experiments?: ExperimentEdit[]; beliefs?: BeliefRow[]; infra?: { request: string; why: string }[] };
/** What the coach was shown, which its edits are checked against. */
export type Tables = { beliefs: BeliefRow[]; experiments: Experiment[] };
export const readTables = async (): Promise<Tables> => ({ beliefs: await readBeliefs(), experiments: await readExperiments() });

function checkExperimentEdits(raw: unknown, before: Experiment[], errors: string[]): ExperimentEdit[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) {
    errors.push("experiments must be an array of the experiments to add or change");
    return undefined;
  }
  const out: ExperimentEdit[] = [];
  const keys = ["name", "title", "status", "area", "result", ...EXPERIMENT_TEXT];
  for (const [i, r] of raw.entries()) {
    if (typeof r !== "object" || r === null) {
      errors.push(`experiments[${i}] must be an object`);
      continue;
    }
    const o = r as Record<string, unknown>;
    const at = `experiments[${i}]${typeof o.name === "string" ? ` (${o.name})` : ""}`;
    for (const k of Object.keys(o)) if (!keys.includes(k)) errors.push(`${at}.${k} is not a field; the fields are ${keys.join(", ")}`);
    for (const k of keys) if (o[k] !== undefined && typeof o[k] !== "string") errors.push(`${at}.${k} must be a string`);
    const name = String(o.name ?? "");
    if (!EXPERIMENT_NAME.test(name)) {
      errors.push(`${at}.name must be kebab-case, such as boss-dodge-distance (it names experiment_<name>.md)`);
      continue;
    }
    const exists = before.some((e) => e.name === name);
    if (!exists) for (const k of ["title", "area", "hypothesis"]) if (!isText(o[k])) errors.push(`${at} is new, so it needs ${k}`);
    if (o.status !== undefined && !(EXPERIMENT_STATUSES as readonly string[]).includes(String(o.status))) errors.push(`${at}.status must be one of ${EXPERIMENT_STATUSES.join(", ")}`);
    if (o.result !== undefined && !(EXPERIMENT_RESULTS as readonly string[]).includes(String(o.result))) errors.push(`${at}.result must be empty or one of ${EXPERIMENT_RESULTS.filter(Boolean).join(", ")}`);
    if (o.area !== undefined && !(String(o.area) in AREAS)) errors.push(`${at}.area must be one of ${Object.keys(AREAS).join(", ")}`);
    out.push(o as ExperimentEdit);
  }
  return out;
}

export function checkEdits(raw: Record<string, unknown>, before: Tables): Checked<LoopEdits> {
  const errors: string[] = [];
  const edits: LoopEdits = {};
  const experiments = checkExperimentEdits(raw.experiments, before.experiments, errors);
  if (experiments !== undefined) edits.experiments = experiments;
  const beliefs = checkTable(raw.beliefs, BELIEFS, before.beliefs, errors);
  if (beliefs !== undefined) edits.beliefs = beliefs;
  if (raw.infra !== undefined) {
    if (!Array.isArray(raw.infra) || !raw.infra.every((x) => typeof x === "object" && x !== null && isText((x as { request?: unknown }).request)))
      errors.push('infra must be an array of {"request": "...", "why": "..."}');
    else edits.infra = (raw.infra as { request: string; why?: unknown }[]).map((x) => ({ request: x.request, why: typeof x.why === "string" ? x.why : "" }));
  }
  return errors.length > 0 ? { errors } : { value: edits };
}

/**
 * Writes the coach's checked edits. `stamp` says when, such as "L4.I3", and goes into the beliefs'
 * created and updated columns and the experiments'.
 */
export async function applyEdits(edits: LoopEdits, stamp: string): Promise<string[]> {
  return locked(async () => {
    const done: string[] = [];
    if (edits.beliefs !== undefined) {
      const now = await readBeliefs();
      await writeTable(BELIEFS_CSV, BELIEF_COLUMNS, stampBeliefs(upsert(edits.beliefs, now), now, stamp));
      done.push(`beliefs.csv (${edits.beliefs.length} rows added or changed)`);
    }
    for (const edit of edits.experiments ?? []) {
      const file = Bun.file(experimentFile(edit.name));
      const old = (await file.exists()) ? parseExperiment(await file.text(), edit.name) : undefined;
      const base: Experiment = old ?? { name: edit.name, title: "", status: "proposed", area: "models", result: "", created: stamp, updated: stamp, hypothesis: "", method: "", findings: "", games: "" };
      const defined = Object.fromEntries(Object.entries(edit).filter(([, v]) => v !== undefined));
      await writeExperiment({ ...base, ...defined, updated: stamp });
      done.push(`experiment_${edit.name}.md${old === undefined ? " (new)" : ""}`);
    }
    if (edits.infra !== undefined && edits.infra.length > 0) {
      await writeTable(INFRA_CSV, INFRA_COLUMNS, [...(await readInfra()), ...edits.infra.map((x) => ({ date: today(), run: stamp, status: "open", request: x.request, why: x.why }))]);
      done.push(`${edits.infra.length} infrastructure requests`);
    }
    return done;
  });
}

export const EDITS_CONTRACT = [
  `"beliefs": the rows you add or change in beliefs.csv, each an object with the keys ${BELIEF_COLUMNS.filter((c) => !BELIEFS.stamps.includes(c)).join(", ")}. verdict is good (worth doing), bad (worth avoiding) or fact; about is game, planner, action or coach; confidence is lead, likely or confirmed; status is held, recheck or disproved. A row with an id the table has updates it and the keys you leave out keep their values, so {"id": "B7", "confidence": "likely"} is a whole edit. Evidence names the games or runs and their numbers. Rows are never deleted: set status disproved. The loop stamps created and updated.`,
  `"experiments": the experiments you add or change, each {"name": kebab-case, "title", "status", "area", "result", "hypothesis", "method", "findings"}. A new one needs title, area and hypothesis; status is ${EXPERIMENT_STATUSES.join(", ")}; result is empty or ${EXPERIMENT_RESULTS.filter(Boolean).join(", ")}; area is one of ${Object.keys(AREAS).join(", ")}. A field left out keeps its value. The loop writes each game played for an experiment under its Games section.`,
  '"infra": requests for the people who work on the bot\'s code, an array of {"request": what to build or change, "why": what it would let the loop learn or do}. Only for what no template, knob, gym or game can do. Leave it out when there are none.',
].join("\n");

// ---- What the coach is told about the game and the bot ------------------------------------------

/** How the game and the bot work. Only code changes this; the coach asks through infrastructure requests. */
export function botFacts(models: { planner: string; action: string }): string {
  return [
    "tibo.dog is a survivors-like game. Weapons fire on their own; the player only walks, dashes, and picks level-up upgrades, chest rewards and shrine options. Tibo has 6 weapon and 6 passive slots. A base weapon at max level plus its catalyst (a passive or an item) evolves at the next chest; evolved weapons are much stronger, and two evolved weapons can sometimes fuse into a union.",
    `Two in-game models play, and which models they are is fixed: the planner (${models.planner}) and the action model (${models.action}). They are small, fast decision models that never write text. Each call sends one state text and a set of questions, all answered against that state: a yes/no question answered as a probability from 0 to 1 (noul), a score on a named scale, or a choice among keys. The templates are that state text and those questions.`,
    "The planner is asked when the game starts, when a goal ends, at every level-up, chest and shrine choice, right after a card is taken, when a boss first appears, and every planEvery seconds while a goal is under way. Each time it rates every goal option with planner.goal, and the highest-rated becomes Tibo's goal. At a choice it also picks a card with planner.pick; a choice with one card it can take is taken without asking.",
    `The goal options the bot offers: up to 4 chests within ${PLAN_RANGE} units (stand on one for its charge time to open it: a free pick, and it evolves whatever recipe is ready); up to 6 spots that charge, such as shrines, each with the game's description; up to 2 food pickups, which heal; up to 2 elites within range to fight until they die (eliteSeconds at most; elites drop chests); the xp gems nearby, collected for up to gemsSeconds; exploring each of the 8 directions for exploreDistance units, stopping at the first chest never listed before; and evading enemies for evadeSeconds. Chests are not laid out on the map: bosses and elites drop them when they die (extra elites and bosses, such as a curse adds, drop none), and a dropped chest stays until it is opened. A target Tibo gave up on carries that note for ${GIVE_UP_SECONDS} seconds. A goal ends when its target is used up, after stuckSeconds without getting closer or charging, or well past the time the walk should take.`,
    "Every game plays live, as a person plays it: the game never pauses while the models think (only a level-up, chest or shrine choice stops it). Lockstep, which paused it, is banned as a crutch. Every step (about 0.2 to 0.3 seconds) the game's own simulation forecasts each of the 8 directions and standing still one second ahead; live, it first plays the held move for the time the decision takes. While the way to the goal costs no more than the cheapest move plus extraDamage, the page walks Tibo there without asking a model. Otherwise the action model is asked action.hurt and action.useful about every move that does not cost more than that; the moves rated about as safe as the safest (within safeMargin, and below the middle of the scale) compete on usefulness, and the most useful wins. With a dash charge and an enemy or bullet close, action.dash decides whether Tibo dashes that way.",
    "Winning means surviving to 20:00; the game goes on after that until Tibo dies. In Open World on Nightmare, winning at Nightmare level N unlocks level N+1, and a full run starts the highest level unlocked, so the ladder climbs one level per win and never drops. Every Nightmare level makes pests and bosses tougher; on every level they start at 40% of their health and grow to full by 8:00, so the opening minutes are the cheapest. A run that passes 20:00 also drops gear, which the bot cannot equip yet.",
  ].join("\n\n");
}

/**
 * A run's CSV log cut to fit a prompt. Moves that cost nothing go first, then the odds of every
 * goal option on plan rows, and last the middle of the run: a run's end is where it was lost, so a
 * cut never drops it.
 */
export async function logForPrompt(file: string, limit: number): Promise<string> {
  const f = Bun.file(file);
  if (!(await f.exists())) return "(no log: it was not found)";
  const text = await f.text();
  if (text.length <= limit) return text;
  const [header = [], ...rows] = parseCsv(text);
  const event = header.indexOf("event");
  const lost = header.indexOf("hp_lost");
  const options = header.indexOf("options");
  const line = (r: string[]) => r.map(csvField).join(",");
  const costly = rows.filter((r) => r[event] !== "move" || Number(r[lost]) > 0);
  const notes = ["moves that cost no health are left out"];
  let lines = [header, ...costly].map(line);
  if (lines.join("\n").length > limit) {
    notes.push("plan rows leave out the odds of each goal option");
    lines = [header, ...costly.map((r) => (r[event] === "plan" ? r.map((x, i) => (i === options ? "" : x)) : r))].map(line);
  }
  const body = lines.join("\n");
  if (body.length <= limit) return `(${notes.join("; ")})\n${body}`;
  const half = limit / 2;
  const head = body.slice(0, half).replace(/\n[^\n]*$/, "");
  const tail = body.slice(-half).replace(/^[^\n]*\n/, "");
  return `(${notes.join("; ")}; the middle is cut out where marked)\n${head}\n(... rows cut here ...)\n${tail}`;
}

// ---- End-of-game stats ---------------------------------------------------------------------------
// What the game counts over a game: the damage taken by source, the damage dealt and kills by
// weapon, and the gold, bosses, elites, chests, shrines and items. A training game reports what
// changed between its start and its end; a full run reports the whole run.

const COUNTERS = ["goldEarned", "goldSpent", "bossesKilled", "elitesKilled", "bossChests", "cratesBought", "shrinesUsed", "itemsBought", "revivesUsed"] as const;
export type Totals = Pick<RunTotals, "kills" | "damageTaken" | "damageDealt" | "killsBy" | "made" | (typeof COUNTERS)[number]> & { killer?: string };

const byKey = (end: Record<string, number>, start: Record<string, number>) =>
  Object.fromEntries(
    Object.entries(end)
      .map(([k, v]) => [k, Math.round((v - (start[k] ?? 0)) * 10) / 10] as const)
      .filter(([, v]) => v > 0)
      .sort((a, b) => b[1] - a[1]),
  );

/** What happened between two snapshots' totals; `start` undefined counts the whole run. */
export function totalsBetween(end: RunTotals, start?: RunTotals): Totals {
  const zero = { damageTaken: {}, damageDealt: {}, killsBy: {}, made: [] };
  const s = start ?? ({ ...zero, kills: 0, ...Object.fromEntries(COUNTERS.map((c) => [c, 0])) } as unknown as RunTotals);
  return {
    kills: end.kills - s.kills,
    damageTaken: byKey(end.damageTaken, s.damageTaken),
    damageDealt: byKey(end.damageDealt, s.damageDealt),
    killsBy: byKey(end.killsBy, s.killsBy),
    made: end.made.filter((m) => !s.made.some((x) => x.id === m.id)),
    ...(Object.fromEntries(COUNTERS.map((c) => [c, Math.round(end[c] - s[c])])) as Record<(typeof COUNTERS)[number], number>),
    ...(end.killer === undefined ? {} : { killer: end.killer }),
  };
}

/** The stats as lines a coach reads. */
export function totalsLines(t: Totals): string[] {
  const list = (r: Record<string, number>, limit = 8) => Object.entries(r).slice(0, limit).map(([k, v]) => `${k} ${v}`).join(", ") || "none";
  const sum = (r: Record<string, number>) => Math.round(Object.values(r).reduce((a, b) => a + b, 0));
  return [
    `Damage taken ${sum(t.damageTaken)}, by source: ${list(t.damageTaken)}${t.killer === undefined ? "" : `; the killing blow: ${t.killer}`}.`,
    `Damage dealt ${sum(t.damageDealt)}, by weapon: ${list(t.damageDealt)}.`,
    `Kills ${t.kills}, by weapon: ${list(t.killsBy)}.`,
    `Bosses killed ${t.bossesKilled}, elites killed ${t.elitesKilled}, boss chests ${t.bossChests}, crates bought ${t.cratesBought}, shrines used ${t.shrinesUsed}, items bought ${t.itemsBought}, revives used ${t.revivesUsed}; gold earned ${t.goldEarned}, spent ${t.goldSpent}.`,
    `Made: ${t.made.map((m) => `${m.id} at ${clock(m.at)}`).join(", ") || "no evolution, union or evolved item"}.`,
  ];
}

// ---- Telling games apart --------------------------------------------------------------------------

function wordDistance(a: string[], b: string[]): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) row[j] = Math.min((prev[j] ?? 0) + 1, (row[j - 1] ?? 0) + 1, (prev[j - 1] ?? 0) + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = row;
  }
  return prev[b.length] ?? 0;
}

/** Words added, removed or replaced between two sets of templates, over every slot; undefined when their knobs differ. */
export function wordsChanged(a: Templates, b: Templates): number | undefined {
  if (JSON.stringify(a.knobs) !== JSON.stringify(b.knobs)) return undefined;
  const words = (t: string) => t.toLowerCase().match(/[\w{}%.'-]+/g) ?? [];
  return (Object.keys(SLOTS) as Slot[]).reduce((n, slot) => n + wordDistance(words(slotText(a, slot)), words(slotText(b, slot))), 0);
}

/** At most this many words apart, with the same knobs, two games test wording, not play. */
export const WORDING_ONLY = 6;
