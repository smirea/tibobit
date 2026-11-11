// Every coach call may change beliefs and experiments and file infrastructure requests. The rest
// (games, gyms, the playbook, prompt rewrites) depends on the call and is checked by the loop.

import { today, upsert, withLock } from "./lock";
import { BELIEF_COLUMNS, type BeliefRow, BELIEFS, readBeliefs, stampBeliefs } from "./beliefs";
import { AREAS, type Experiment, EXPERIMENT_NAME, EXPERIMENT_RESULTS, EXPERIMENT_STATUSES, EXPERIMENT_TEXT, experimentFile, parseExperiment, readExperiments, writeExperiment } from "./experiments";
import { checkTable, writeTable } from "./tables";
import { INFRA_COLUMNS, readInfra } from "./infra";
import { BELIEFS_CSV, INFRA_CSV } from "./paths";
import { type Checked, isText } from "../../protocol/parse";

type ExperimentEdit = Partial<Omit<Experiment, "games" | "created" | "updated">> & { name: string };

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
/** An experiment with a coach's edit over it: only the fields the edit sends change, and a new one starts proposed. */
export function edited(old: Experiment | undefined, edit: ExperimentEdit): Experiment {
  const sent = Object.fromEntries(Object.entries(edit).filter(([, v]) => v !== undefined));
  return { title: "", status: "proposed", area: "models", result: "", created: "", updated: "", hypothesis: "", method: "", findings: "", games: "", ...old, ...sent, name: edit.name };
}

/** The experiments and beliefs as they stand once the edits are in. */
export function afterEdits(before: Tables, edits: LoopEdits | undefined): Tables {
  const changed = edits?.experiments ?? [];
  const experiments = before.experiments.map((e) => {
    const edit = changed.find((x) => x.name === e.name);
    return edit === undefined ? e : edited(e, edit);
  });
  for (const edit of changed) if (!before.experiments.some((e) => e.name === edit.name)) experiments.push(edited(undefined, edit));
  return { experiments, beliefs: upsert(edits?.beliefs ?? [], before.beliefs) };
}

export async function applyEdits(edits: LoopEdits, stamp: string): Promise<string[]> {
  return withLock(async () => {
    const done: string[] = [];
    if (edits.beliefs !== undefined) {
      const now = await readBeliefs();
      await writeTable(BELIEFS_CSV, BELIEF_COLUMNS, stampBeliefs(upsert(edits.beliefs, now), now, stamp));
      done.push(`beliefs.csv (${edits.beliefs.length} rows added or changed)`);
    }
    for (const edit of edits.experiments ?? []) {
      const file = Bun.file(experimentFile(edit.name));
      const old = (await file.exists()) ? parseExperiment(await file.text(), edit.name) : undefined;
      await writeExperiment({ ...edited(old, edit), created: old?.created ?? stamp, updated: stamp });
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
