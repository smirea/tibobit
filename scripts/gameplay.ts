// The learning loop's files in gameplay/: the coach's two prompts, the experiments and
// infrastructure tables, and one notes file per run. The coach may rewrite any of them; this module
// owns their formats and turns away an edit that would break one, so the loop can never wedge itself.
import path from "node:path";
import { createHash } from "node:crypto";
import { mkdirSync, rmSync, statSync } from "node:fs";

export const GAMEPLAY = path.join(import.meta.dir, "..", "gameplay");
export const NOTES_DIR = path.join(GAMEPLAY, "notes");
export const COACH_PLAN = path.join(GAMEPLAY, "coach-plan.md");
export const COACH_RETROSPECTIVE = path.join(GAMEPLAY, "coach-retrospective.md");
export const EXPERIMENTS_CSV = path.join(GAMEPLAY, "experiments.csv");
export const BELIEFS_CSV = path.join(GAMEPLAY, "beliefs.csv");
export const INFRA_CSV = path.join(GAMEPLAY, "infrastructure_feedback.csv");

export type Checked<T> = { value: T } | { errors: string[] };

const clock = (seconds: number, sep = ":") => `${String(Math.floor(seconds / 60)).padStart(2, "0")}${sep}${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
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

const EXPERIMENT_COLUMNS = ["id", "created", "status", "hypothesis", "test", "runs", "outcome", "result", "learnings"] as const;
export type ExperimentRow = Record<(typeof EXPERIMENT_COLUMNS)[number], string>;
export const EXPERIMENTS: Table<typeof EXPERIMENT_COLUMNS> = {
  name: "experiments",
  file: EXPERIMENTS_CSV,
  columns: EXPERIMENT_COLUMNS,
  required: ["id", "hypothesis"],
  enums: { status: ["proposed", "running", "done", "recheck", "retired"], result: ["", "confirmed", "refuted", "inconclusive"] },
  retire: "status retired",
  stamps: [],
};

// What the loop holds true right now, about the game or about how the models behave. Experiments
// are questions; beliefs are the answers that survived them, kept so a rewritten prompt cannot
// quietly drop one.
const BELIEF_COLUMNS = ["id", "about", "claim", "confidence", "status", "evidence", "experiments", "created", "updated"] as const;
export type BeliefRow = Record<(typeof BELIEF_COLUMNS)[number], string>;
export const BELIEFS: Table<typeof BELIEF_COLUMNS> = {
  name: "beliefs",
  file: BELIEFS_CSV,
  columns: BELIEF_COLUMNS,
  required: ["id", "claim", "evidence"],
  enums: { about: ["game", "planner", "action", "coach"], confidence: ["lead", "likely", "confirmed"], status: ["held", "recheck", "disproved"] },
  retire: "status disproved",
  stamps: ["created", "updated"],
};

export const readExperiments = () => readTable(EXPERIMENTS_CSV, EXPERIMENT_COLUMNS);
export const readBeliefs = () => readTable(BELIEFS_CSV, BELIEF_COLUMNS);
export const readInfra = () => readTable(INFRA_CSV, INFRA_COLUMNS);
export type Tables = { experiments: ExperimentRow[]; beliefs: BeliefRow[] };
export const readTables = async (): Promise<Tables> => ({ experiments: await readExperiments(), beliefs: await readBeliefs() });

/** Fails at startup, not after a run, when a loop file is missing or the coach left one unreadable. */
export async function checkLoopFiles() {
  mkdirSync(NOTES_DIR, { recursive: true });
  for (const f of [COACH_PLAN, COACH_RETROSPECTIVE]) if (!(await Bun.file(f).exists())) throw new Error(`${f} is missing`);
  await readTables();
  await readInfra();
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
  state: "every block above except difficulty and mode, one per line: the whole state",
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
  "action.dash": { about: "asked as a yes/no question when Tibo has a dash charge and an enemy or bullet is close; above 0.5 Tibo dashes the chosen way. Empty: never dash", vars: { goal: "as in action.state" }, required: [] },
} as const;
export type Slot = keyof typeof SLOTS;

export type Knobs = { exploreDistance: number; evadeSeconds: number; gemsSeconds: number; stuckSeconds: number; extraDamage: number; safeMargin: number; distrustSeconds: number; distrustBossRange: number };
export const KNOBS: Record<keyof Knobs, { min: number; max: number; about: string }> = {
  exploreDistance: { min: 100, max: 1500, about: "units an explore goal walks before it ends; it also ends at the first chest never listed before" },
  evadeSeconds: { min: 2, max: 30, about: "seconds an evade goal lasts" },
  gemsSeconds: { min: 3, max: 40, about: "seconds a gems goal collects for at most" },
  stuckSeconds: { min: 2, max: 20, about: "seconds without getting closer (or charging) before a goal is given up" },
  extraDamage: { min: 0, max: 0.25, about: "share of max health a move may cost over the cheapest move in the next second and still be taken: the page walks Tibo to the goal on its own while the way there costs no more than this over the cheapest, and the action model is never offered a move that costs more" },
  safeMargin: { min: 0, max: 0.5, about: "how far above the safest move's hurt rating (as a share of the scale) a move may be and still compete on usefulness" },
  distrustSeconds: { min: 0, max: 30, about: "after Tibo loses health on a step the forecast called free (a walk row), the action model is asked about every step for this many seconds instead of the page walking on its own; 0 trusts the forecast" },
  distrustBossRange: { min: 0, max: 600, about: "while a boss is within this many units, the action model is asked about every step, since boss attacks from afar are not in the one-second forecast; 0 turns it off" },
};

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
  knobs: { exploreDistance: 300, evadeSeconds: 8, gemsSeconds: 12, stuckSeconds: 6, extraDamage: 0.02, safeMargin: 0.1, distrustSeconds: 0, distrustBossRange: 0 },
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
        const range = KNOBS[k as keyof Knobs];
        if (range === undefined) errors.push(`knobs.${k} is not a knob; the knobs are ${Object.keys(KNOBS).join(", ")}`);
        else if (typeof v !== "number" || !(v >= range.min && v <= range.max)) errors.push(`knobs.${k} must be a number from ${range.min} to ${range.max}`);
        else templates.knobs[k as keyof Knobs] = v;
      }
  }
  return errors.length > 0 ? { errors } : { value: templates };
}

// ---- Coach edits ---------------------------------------------------------------------------
// Both coach calls may rewrite the experiments and beliefs tables, file infrastructure requests,
// and rewrite either coach prompt.

export type LoopEdits = { experiments?: ExperimentRow[]; beliefs?: BeliefRow[]; infra?: { request: string; why: string }[]; coachPlan?: string; coachRetrospective?: string };
const PROMPT_LIMIT = 30_000;

function checkTable<C extends readonly string[]>(raw: unknown, table: Table<C>, before: Record<C[number], string>[], errors: string[]): Record<C[number], string>[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) {
    errors.push(`${table.name} must be the whole table as an array of rows`);
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
    const row = Object.fromEntries(columns.map((c) => [c, o[c] === undefined || o[c] === null ? "" : String(o[c])])) as Record<C[number], string>;
    const id = row[columns[0] as C[number]] || `[${i}]`;
    for (const c of table.required) if (!isText(row[c])) errors.push(`${table.name} ${id} has no ${c}`);
    for (const [c, allowed] of Object.entries(table.enums) as [C[number], readonly string[]][])
      if (!allowed.includes(row[c])) errors.push(`${table.name} ${id} ${c} must be ${allowed.includes("") ? "empty or " : ""}one of ${allowed.filter(Boolean).join(", ")}`);
    rows.push(row);
  }
  const ids = rows.map((r) => r[columns[0] as C[number]]);
  for (const id of new Set(ids.filter((id, i) => ids.indexOf(id) !== i))) errors.push(`${table.name} id ${id} is used twice`);
  for (const old of before) {
    const id = old[columns[0] as C[number]];
    if (!ids.includes(id)) errors.push(`${table.name} ${id} is missing: rows are never deleted, set ${table.retire} instead`);
  }
  return rows;
}

export function checkEdits(raw: Record<string, unknown>, before: Tables): Checked<LoopEdits> {
  const errors: string[] = [];
  const edits: LoopEdits = {};
  const experiments = checkTable(raw.experiments, EXPERIMENTS, before.experiments, errors);
  if (experiments !== undefined) edits.experiments = experiments;
  const beliefs = checkTable(raw.beliefs, BELIEFS, before.beliefs, errors);
  if (beliefs !== undefined) edits.beliefs = beliefs;
  if (raw.infra !== undefined) {
    if (!Array.isArray(raw.infra) || !raw.infra.every((x) => typeof x === "object" && x !== null && isText((x as { request?: unknown }).request)))
      errors.push('infra must be an array of {"request": "...", "why": "..."}');
    else edits.infra = (raw.infra as { request: string; why?: unknown }[]).map((x) => ({ request: x.request, why: typeof x.why === "string" ? x.why : "" }));
  }
  for (const [key, file] of [
    ["coachPlan", "coach-plan.md"],
    ["coachRetrospective", "coach-retrospective.md"],
  ] as const) {
    const v = raw[key];
    if (v === undefined) continue;
    if (!isText(v) || v.length > PROMPT_LIMIT) errors.push(`${key} must be the whole new ${file}, under ${PROMPT_LIMIT} characters`);
    else edits[key] = v;
  }
  return errors.length > 0 ? { errors } : { value: edits };
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

// Two loops can share gameplay/, each with its own coach, so every read-modify-write of its files
// holds this lock, and a coach's whole-table edit is merged into the table as it is now rather than
// written over rows the other coach added meanwhile.
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

/**
 * The coach's rows over the table as it is now. A row the coach added under an id the other coach
 * took meanwhile gets the next free id; `renamed` maps the coach's id to the one it got.
 */
export function merge<R extends { id: string }>(theirs: R[], now: R[], before: R[], renamed: Map<string, string>): R[] {
  const taken = new Set(now.map((r) => r.id));
  const out = theirs.map((r) => {
    if (before.some((b) => b.id === r.id) || !taken.has(r.id)) return r;
    const prefix = r.id.match(/^\D*/)?.[0] ?? "";
    let n = Math.max(0, ...[...taken].filter((id) => id.startsWith(prefix)).map((id) => Number(id.slice(prefix.length)) || 0)) + 1;
    while (taken.has(`${prefix}${n}`)) n++;
    renamed.set(r.id, `${prefix}${n}`);
    taken.add(`${prefix}${n}`);
    return { ...r, id: `${prefix}${n}` };
  });
  const ids = new Set(out.map((r) => r.id));
  return [...out, ...now.filter((r) => !ids.has(r.id))];
}

const renameIds = (text: string, renamed: Map<string, string>) => text.replace(/\b[A-Z]+\d+\b/g, (id) => renamed.get(id) ?? id);

/**
 * Writes the coach's edits over what it was shown (`before`). `run` is the run's id, the start of
 * its notes file name. `renamed` maps any experiment or belief id that had to change.
 */
export async function applyEdits(edits: LoopEdits, run: string, before: Tables): Promise<{ done: string[]; renamed: Map<string, string> }> {
  return locked(async () => {
    const done: string[] = [];
    const renamed = new Map<string, string>();
    const experiments = edits.experiments === undefined ? undefined : merge(edits.experiments, await readExperiments(), before.experiments, renamed);
    const beliefs = edits.beliefs === undefined ? undefined : merge(edits.beliefs, await readBeliefs(), before.beliefs, renamed);
    if (experiments !== undefined) {
      await writeTable(EXPERIMENTS_CSV, EXPERIMENT_COLUMNS, experiments);
      done.push(`experiments.csv (${experiments.length} rows)`);
    }
    if (beliefs !== undefined) {
      const linked = beliefs.map((b) => ({ ...b, experiments: renameIds(b.experiments, renamed) }));
      await writeTable(BELIEFS_CSV, BELIEF_COLUMNS, stampBeliefs(linked, await readBeliefs(), run));
      done.push(`beliefs.csv (${beliefs.length} rows)`);
    }
    if (edits.infra !== undefined && edits.infra.length > 0) {
      await writeTable(INFRA_CSV, INFRA_COLUMNS, [...(await readInfra()), ...edits.infra.map((x) => ({ date: today(), run, status: "open", request: x.request, why: x.why }))]);
      done.push(`${edits.infra.length} infrastructure requests`);
    }
    if (edits.coachPlan !== undefined) {
      await Bun.write(COACH_PLAN, `${edits.coachPlan.trim()}\n`);
      done.push("coach-plan.md");
    }
    if (edits.coachRetrospective !== undefined) {
      await Bun.write(COACH_RETROSPECTIVE, `${edits.coachRetrospective.trim()}\n`);
      done.push("coach-retrospective.md");
    }
    if (renamed.size > 0) done.push(`renumbered ${[...renamed].map(([a, b]) => `${a} to ${b}`).join(", ")}, taken meanwhile`);
    return { done, renamed };
  });
}

/** Marks the experiments a run tests as running, and later adds the finished run to their `runs`. */
export async function touchExperiments(ids: string[], change: (row: ExperimentRow) => void) {
  if (ids.length === 0) return;
  await locked(async () => {
    const rows = await readExperiments();
    for (const row of rows) if (ids.includes(row.id)) change(row);
    await writeTable(EXPERIMENTS_CSV, EXPERIMENT_COLUMNS, rows);
  });
}

// ---- Notes ---------------------------------------------------------------------------------
// One file per run, written when the run ends, named for when it started and how long Tibo lived.
// The bot writes the facts, the plan and the prompts; the coach writes the review between the
// review markers. `--review` and the next plan read a notes file back from these same headings.

export type Surface = "headless" | "browser";
/** `bot` is the commit of the bot code that played, so a review can tell whether a fix had landed. */
export type RunSetup = { started: Date; difficulty: string; mode: "daily" | "world"; surface: Surface; seed: string; planner: string; action: string; coach: string; bot: string };
export type RunPlan = { source: string; intent: string; testing: string[]; templates: Templates };
export type RunEnd = { lived: number; level?: number; kills?: number; ending: string; outcome: string[] };
export type NotesContent = { setup: RunSetup; plan: RunPlan; end: RunEnd; link: string; log: string; prompts: string; picks: string[]; review: string };

const pad = (n: number) => String(n).padStart(2, "0");
/** The run's id: local start time, the start of its notes and log file names. */
export function runId(started: Date): string {
  const d = started;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
}

export function notesName(setup: RunSetup, lived: number): string {
  return `${runId(setup.started)}_lived-${clock(lived, "-")}_${setup.difficulty}_${setup.mode}_${setup.surface}.md`;
}

const REVIEW_START = "<!-- review: written by the coach from coach-retrospective.md -->";
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
    `| Testing | ${plan.testing.join(", ") || "nothing named"} |`,
    `| Seed | ${setup.seed} |`,
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

export function notesTesting(text: string): string[] {
  const v = notesField(text, "Testing");
  return v === undefined || v === "nothing named" ? [] : v.split(/,\s*/).filter(Boolean);
}

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

/** The templates of the latest run that recorded them, for the coach to build on. */
export async function latestTemplates(): Promise<{ templates: Templates; from: string } | undefined> {
  for (const name of await notesFiles()) {
    const t = notesTemplates(await Bun.file(path.join(NOTES_DIR, name)).text());
    if ("value" in t) return { templates: t.value, from: name };
  }
  return undefined;
}

/** One line per finished run, newest first. */
export async function runHistory(limit = 60): Promise<string> {
  const lines: string[] = [];
  for (const name of (await notesFiles()).slice(0, limit)) {
    const text = await Bun.file(path.join(NOTES_DIR, name)).text();
    lines.push(`- ${name}: ${notesField(text, "Ending") ?? "?"}; testing ${notesField(text, "Testing") ?? "?"}; coach ${notesField(text, "Coach") ?? "?"}`);
  }
  return lines.join("\n") || "(no runs yet)";
}

/** The newest notes in full, without their prompts, which the coach gets separately. */
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

function tableContract<C extends readonly string[]>(t: Table<C>, about: string): string {
  const enums = Object.entries(t.enums as Record<string, readonly string[]>).map(([c, v]) => `${c} is ${v.includes("") ? "empty or " : ""}one of ${v.filter(Boolean).join(", ")}`);
  const stamps = t.stamps.length === 0 ? "" : ` The bot fills ${t.stamps.join(" and ")}.`;
  return `"${t.name}": ${about} The whole table as an array of row objects with the keys ${t.columns.join(", ")}; ${enums.join("; ")}.${stamps} Rows are never deleted: set ${t.retire} instead. Leave the key out to keep the table as it is.`;
}

export const EDITS_CONTRACT = [
  tableContract(EXPERIMENTS, "the questions the loop asks of the game and of the models."),
  tableContract(
    BELIEFS,
    "what the loop holds true now, each claim short enough to act on, with the runs and numbers behind it in evidence and the experiment ids in experiments. Write a belief once a finding is worth acting on (lead), raise its confidence when another run agrees, set it to recheck when a run contradicts it, and to disproved when a recheck refutes it.",
  ),
  '"infra": new requests for the coding harness, an array of {"request": "what to build or change in the bot", "why": "what it would let the loop learn or do"}. Only for what no template, knob or prompt edit can do. Leave it out when there are none.',
  '"coachPlan" and "coachRetrospective": the whole new coach-plan.md or coach-retrospective.md, only when the way the loop plans or reviews should change. Leave them out otherwise.',
].join("\n");

/**
 * What the coach can change, at the top of both coach prompts. Written here rather than in the
 * prompts, which the coach rewrites, so the list cannot be edited away or fall behind the code.
 */
export function editableFiles(phase: "plan" | "review"): string {
  const own = phase === "plan" ? "coach-plan.md" : "coach-retrospective.md";
  return [
    "# What you can change",
    "",
    "Everything below lives in gameplay/, and you change it through keys in your JSON reply (see Reply at the end). Anything you leave out stays as it is.",
    "",
    ...(phase === "plan"
      ? ["- **The in-game prompts** (`planner`, `action`, `knobs`): what the planner and the action model are told, which state blocks they see, what each question asks, and the knobs, for the run about to start. They are recorded in the run's notes, and the next plan starts from them."]
      : ["- **This run's notes** (`notes`): the review between the plan and the picks, in the sections this prompt asks for."]),
    `- **beliefs.csv** (\`beliefs\`): what the loop holds true about the game and the in-game models. You rewrite the whole table; rows are never deleted, only disproved.`,
    `- **experiments.csv** (\`experiments\`): the questions the loop asks. You rewrite the whole table; rows are never deleted, only retired.`,
    "- **infrastructure_feedback.csv** (`infra`): requests for changes to the bot's code. You can only add rows; whoever works on the code closes them.",
    `- **coach-plan.md** (\`coachPlan\`) and **coach-retrospective.md** (\`coachRetrospective\`): your own prompts, before and after each run. This one is ${own}. Rewrite one only when the way the loop plans or reviews should change.`,
    "",
    "You cannot change which models play (the coach, the planner and the action model), the bot's code, or the parts of a notes file the bot writes: its header, outcome, plan, picks and prompts. When the code stands in the way, file an infrastructure request. After the review, the bot commits gameplay/, so every change you make is in the history.",
  ].join("\n");
}
