// The training ground's files: gameplay/training/<id>.json, one per scenario a coach asked for. A
// scenario starts every trial from the same checkpoint (a whole saved game, see the checkpoint
// command), so the game's own dice roll the same each time and only the models' choices differ
// between arms. scripts/training.ts plays them; the coaches read the results.
import path from "node:path";
import { mkdirSync, readdirSync } from "node:fs";
import { type CheckpointMeta, type LoadoutSpec, parseLoadout } from "../src/agent/protocol";
import { type Checked, GAMEPLAY, type Knobs, type Templates, checkTemplates, isText } from "./gameplay";

export const TRAINING_DIR = path.join(GAMEPLAY, "training");

export type Arm = { name: string; planner?: Partial<Templates["planner"]>; action?: Partial<Templates["action"]>; knobs?: Partial<Knobs> };

/** What the bot writes after one trial (see --trial in tibo-bot.ts). */
export type TrialResult = {
  arm: string;
  trial: number;
  survived: number;
  died: boolean;
  start: number;
  end: number;
  hp: { start: number; end: number; max: number };
  level: { start: number; end: number };
  kills: number;
  damageTaken: Record<string, number>;
  steps: number;
  avgDecisionMs: number;
  live: boolean;
  log?: string;
};

export type Scenario = {
  id: string;
  question: string;
  /** The experiments.csv row the scenario feeds, if any. */
  experiment?: string;
  coach: string;
  /** The run whose review asked for it. */
  requestedBy: string;
  /** The checkpoint every trial starts from. */
  from: string;
  loadout?: LoadoutSpec;
  seconds: number;
  trials: number;
  /** The templates every arm starts from: those of the run that asked. */
  base: Templates;
  arms: Arm[];
  status: "pending" | "running" | "done" | "failed";
  results: TrialResult[];
  error?: string;
  finished?: string;
};

export const LIMITS = { seconds: { min: 5, max: 300 }, trials: { min: 1, max: 5 }, arms: { min: 1, max: 4 }, gameSeconds: 1200, perReview: 2 };

export const TRAINING_CONTRACT = `"training": scenarios for the training ground, at most ${LIMITS.perReview}, each {"question": what it settles, "experiment": the experiments.csv id it feeds (optional), "from": a checkpoint name from the list, "loadout": optional {"weapons": [{"id", "level"}], "passives": [{"id", "level"}], "items": [{"id", "count"}], "gold", "hp": number or "full"} that replaces the whole build at the checkpoint, "seconds": ${LIMITS.seconds.min} to ${LIMITS.seconds.max} of game time per trial, "trials": ${LIMITS.trials.min} to ${LIMITS.trials.max} per arm, "arms": ${LIMITS.arms.min} to ${LIMITS.arms.max} of {"name", "planner", "action", "knobs"}, each changing only what it tests from this run's templates (an arm with only a name plays them unchanged)}. seconds x trials x arms is at most ${LIMITS.gameSeconds}. Leave the key out when nothing needs a controlled test.`;

const armTemplates = (base: Templates, arm: Arm): Checked<Templates> => checkTemplates({ planner: arm.planner, action: arm.action, knobs: arm.knobs }, base);

/** The templates an arm plays with: the scenario's base with the arm's changes. */
export function templatesFor(s: Scenario, arm: Arm): Templates {
  const t = armTemplates(s.base, arm);
  if ("errors" in t) throw new Error(`scenario ${s.id} arm ${arm.name}: ${t.errors.join("; ")}`);
  return t.value;
}

function wholeIn(v: unknown, range: { min: number; max: number }): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= range.min && v <= range.max;
}

/** Turns a coach's "training" key into scenarios; `checkpoints` are the names a page on this game build can load. */
export function checkTraining(raw: unknown, base: Templates, checkpoints: string[], context: { coach: string; run: string }): Checked<Scenario[]> {
  if (raw === undefined) return { value: [] };
  if (!Array.isArray(raw)) return { errors: ["training must be an array of scenarios"] };
  const errors: string[] = [];
  if (raw.length > LIMITS.perReview) errors.push(`at most ${LIMITS.perReview} training scenarios per review`);
  const out: Scenario[] = [];
  raw.forEach((r: Record<string, unknown>, i) => {
    const at = `training[${i}]`;
    if (typeof r !== "object" || r === null) return errors.push(`${at} must be an object`);
    if (!isText(r.question)) errors.push(`${at}.question must say what the scenario settles`);
    if (r.experiment !== undefined && !isText(r.experiment)) errors.push(`${at}.experiment must be an experiment id`);
    if (typeof r.from !== "string" || !checkpoints.includes(r.from)) errors.push(`${at}.from must be one of the checkpoints listed, not ${JSON.stringify(r.from)}`);
    let loadout: LoadoutSpec | undefined;
    if (r.loadout !== undefined) {
      try {
        loadout = parseLoadout(r.loadout as Record<string, unknown>);
        if (loadout.weapons.length === 0) errors.push(`${at}.loadout needs at least one weapon`);
      } catch (e) {
        errors.push(`${at}.loadout: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
    if (!wholeIn(r.seconds, LIMITS.seconds)) errors.push(`${at}.seconds must be a whole number from ${LIMITS.seconds.min} to ${LIMITS.seconds.max}`);
    if (!wholeIn(r.trials, LIMITS.trials)) errors.push(`${at}.trials must be a whole number from ${LIMITS.trials.min} to ${LIMITS.trials.max}`);
    const arms = Array.isArray(r.arms) ? (r.arms as Arm[]) : [];
    if (arms.length < LIMITS.arms.min || arms.length > LIMITS.arms.max) errors.push(`${at}.arms must hold ${LIMITS.arms.min} to ${LIMITS.arms.max} arms`);
    const names = new Set<string>();
    for (const [j, arm] of arms.entries()) {
      if (typeof arm !== "object" || arm === null || !isText(arm.name) || !/^[\w-]{1,40}$/.test(arm.name)) {
        errors.push(`${at}.arms[${j}].name must be a short name (letters, digits, - or _)`);
        continue;
      }
      if (names.has(arm.name)) errors.push(`${at}.arms has two arms named ${arm.name}`);
      names.add(arm.name);
      const t = armTemplates(base, arm);
      if ("errors" in t) errors.push(...t.errors.map((e) => `${at}.arms[${j}] (${arm.name}): ${e}`));
    }
    if (typeof r.seconds === "number" && typeof r.trials === "number" && r.seconds * r.trials * arms.length > LIMITS.gameSeconds)
      errors.push(`${at} plays ${r.seconds * r.trials * arms.length} seconds in all; the limit is ${LIMITS.gameSeconds}`);
    out.push({
      id: `${context.run}_${i + 1}`,
      question: String(r.question),
      ...(r.experiment === undefined ? {} : { experiment: String(r.experiment) }),
      coach: context.coach,
      requestedBy: context.run,
      from: String(r.from),
      ...(loadout === undefined ? {} : { loadout }),
      seconds: Number(r.seconds),
      trials: Number(r.trials),
      base,
      arms: arms.map((a) => ({ name: a.name, ...(a.planner === undefined ? {} : { planner: a.planner }), ...(a.action === undefined ? {} : { action: a.action }), ...(a.knobs === undefined ? {} : { knobs: a.knobs }) })),
      status: "pending",
      results: [],
    });
  });
  return errors.length > 0 ? { errors } : { value: out };
}

export const scenarioFile = (id: string) => path.join(TRAINING_DIR, `${id}.json`);

export async function writeScenario(s: Scenario) {
  mkdirSync(TRAINING_DIR, { recursive: true });
  await Bun.write(scenarioFile(s.id), `${JSON.stringify(s, null, 2)}\n`);
}

/** Every scenario, oldest first. */
export async function readScenarios(): Promise<Scenario[]> {
  let names: string[];
  try {
    names = readdirSync(TRAINING_DIR).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  const all = await Promise.all(names.sort().map(async (f) => (await Bun.file(path.join(TRAINING_DIR, f)).json()) as Scenario));
  return all;
}

const mean = (xs: number[]) => (xs.length === 0 ? 0 : xs.reduce((a, b) => a + b, 0) / xs.length);
const one = (n: number) => Math.round(n * 10) / 10;

const taken = (r: TrialResult) => Object.values(r.damageTaken).reduce((a, b) => a + b, 0);

/** Per arm: how many trials lived, and the means of time lived, damage taken (level-ups heal, so health alone hides it), kills and damage by source. */
export function armSummary(s: Scenario, arm: string): string {
  const rs = s.results.filter((r) => r.arm === arm);
  if (rs.length === 0) return `${arm}: no trials yet`;
  const sources = new Map<string, number>();
  for (const r of rs) for (const [k, v] of Object.entries(r.damageTaken)) sources.set(k, (sources.get(k) ?? 0) + v / rs.length);
  const top = [...sources].sort((a, b) => b[1] - a[1]).slice(0, 4);
  return `${arm}: alive ${rs.filter((r) => !r.died).length}/${rs.length}, lived ${one(mean(rs.map((r) => r.survived)))}s on average (${rs.map((r) => r.survived).join(", ")}), damage taken ${one(mean(rs.map(taken)))} (${rs.map((r) => one(taken(r))).join(", ")}), health at the end ${one(mean(rs.map((r) => r.hp.end)))}, kills ${one(mean(rs.map((r) => r.kills)))}, levels gained ${one(mean(rs.map((r) => r.level.end - r.level.start)))}${top.length === 0 ? "" : `; by source per trial: ${top.map(([k, v]) => `${k} ${one(v)}`).join(", ")}`}`;
}

export function scenarioSummary(s: Scenario): string {
  const changes = (a: Arm) => {
    const parts = [...Object.entries(a.knobs ?? {}).map(([k, v]) => `${k} ${v}`), ...Object.keys(a.planner ?? {}).map((k) => `planner.${k} rewritten`), ...Object.keys(a.action ?? {}).map((k) => `action.${k} rewritten`)];
    return parts.length === 0 ? "the base templates" : parts.join(", ");
  };
  return [
    `### ${s.id} (${s.status}${s.error === undefined ? "" : `: ${s.error}`}), asked by ${s.coach} after ${s.requestedBy}${s.experiment === undefined ? "" : ` for ${s.experiment}`}`,
    `Question: ${s.question}`,
    `From checkpoint ${s.from}${s.loadout === undefined ? "" : ` with the build replaced by ${[...s.loadout.weapons.map((w) => `${w.id} ${w.level}`), ...s.loadout.passives.map((p) => `${p.id} ${p.level}`), ...s.loadout.items.map((x) => `${x.id} x${x.count}`)].join(", ")}`}, ${s.seconds}s per trial, ${s.trials} trials per arm.`,
    ...s.arms.map((a) => `- ${armSummary(s, a.name)}. Plays ${changes(a)}.`),
  ].join("\n");
}

/** The checkpoint list a coach picks from: those of this game build, by run, newest run first. */
export function checkpointList(all: CheckpointMeta[], build: string | undefined, limitRuns = 8): string {
  const usable = all.filter((c) => build === undefined || c.build === build);
  if (usable.length === 0) return "(none on this game build yet; every run saves one at 0:00 and every 2:00 after)";
  const byRun = new Map<string, CheckpointMeta[]>();
  for (const c of usable) {
    const run = c.name.split("@")[0] ?? c.name;
    byRun.set(run, [...(byRun.get(run) ?? []), c]);
  }
  return [...byRun]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, limitRuns)
    .map(([run, cs]) => [`- run ${run}, ${cs[0]?.difficulty ?? "?"}, seed ${cs[0]?.seed ?? "?"}:`, ...cs.sort((a, b) => a.time - b.time).map((c) => `  - ${c.name}: lv ${c.level}, hp ${c.hp}, ${c.weapons.join(", ")}${c.passives.length === 0 ? "" : `; ${c.passives.join(", ")}`}${c.items.length === 0 ? "" : `; ${c.items.join(", ")}`}`)].join("\n"))
    .join("\n");
}
