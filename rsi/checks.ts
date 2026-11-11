import { type Gym, GYM_NAME } from "./store/gyms";
import { checkTemplates, type Templates } from "../bot/templates";
import { IDS } from "./session";
import { WORDING_ONLY, wordsChanged } from "./wording";
import { GOAL_LEVEL, MAX_GAME_SECONDS, MAX_GAMES, MAX_GYM_SECONDS, MAX_NEW_GYMS } from "./rules";
import type { Playbook } from "../bot/playbook";
import { EVAL_SEED } from "./flags";
import { type Held, untried } from "./store/held";
import { isText } from "../protocol/parse";
import type { Experiment } from "./store/experiments";
import { gameId, hasFreshGames } from "./store/games";
import { type LoadoutSpec, parseLoadout } from "../protocol/commands";
import type { GameSpec, Start } from "./training/slots";
import { clockPadded } from "../format";

export const unexplored = (held: Held) => new Set([...untried(IDS.base, held), ...untried(IDS.passives, held)]);

/** The untried weapons and passives a game is sure to hold: its starting weapon and its swapped-in build. */
export const explores = (spec: GameSpec, open: Set<string>) =>
  [...("fresh" in spec.from ? [spec.from.fresh.weapon] : []), ...(spec.loadout?.weapons ?? []).map((w) => w.id), ...(spec.loadout?.passives ?? []).map((p) => p.id)].filter((id) => open.has(id));


function checkLoadout(raw: unknown, at: string, errors: string[]): LoadoutSpec | undefined {
  if (raw === undefined) return undefined;
  try {
    const l = parseLoadout(raw as Record<string, unknown>);
    for (const w of l.weapons) if (!IDS.weapons.has(w.id)) errors.push(`${at}.loadout: no weapon ${w.id}; weapon ids are the encyclopedia's weapons[].id`);
    for (const p of l.passives) if (!IDS.passives.has(p.id)) errors.push(`${at}.loadout: no passive ${p.id}`);
    for (const x of l.items) if (!IDS.items.has(x.id)) errors.push(`${at}.loadout: no item ${x.id}`);
    if (l.weapons.length === 0) errors.push(`${at}.loadout needs a weapon`);
    return l;
  } catch (e) {
    errors.push(`${at}.loadout: ${e instanceof Error ? e.message : String(e)}`);
    return undefined;
  }
}

const startWeapon = (v: unknown, at: string, errors: string[]): string => {
  if (v === undefined || v === "random" || v === "") return "";
  if (typeof v !== "string" || !IDS.base.has(v)) errors.push(`${at} must be "random" or a base weapon id: ${[...IDS.base].join(", ")}`);
  return String(v);
};

function describeChanges(raw: { planner?: unknown; action?: unknown; knobs?: unknown } | undefined): string {
  if (raw === undefined) return "";
  return [
    ...Object.entries((raw.knobs as Record<string, unknown>) ?? {}).map(([k, v]) => `${k} ${v}`),
    ...Object.keys((raw.planner as object) ?? {}).map((k) => `its own planner.${k}`),
    ...Object.keys((raw.action as object) ?? {}).map((k) => `its own action.${k}`),
  ].join(", ");
}

export function checkPlaybook(raw: unknown, now: Playbook, stamp: string, experiments: Experiment[], errors: string[]): Playbook | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "object" || raw === null) {
    errors.push("playbook must be an object");
    return undefined;
  }
  const p = raw as Record<string, unknown>;
  const evidence = Array.isArray(p.evidence) ? p.evidence.filter((x): x is string => typeof x === "string") : [];
  if (evidence.length === 0) errors.push("playbook.evidence must name the confirmed experiments that show the change beats the playbook");
  for (const name of evidence) {
    const e = experiments.find((x) => x.name === name);
    if (e === undefined) errors.push(`playbook.evidence: no experiment ${name}`);
    else if (e.result !== "confirmed") errors.push(`playbook.evidence: ${name} is ${e.result || "not concluded"}, not confirmed`);
    else if (!hasFreshGames(e)) errors.push(`playbook.evidence: ${name} has no games from 0:00 on a fresh seed, where every run starts`);
  }
  const t = checkTemplates(p as { planner?: unknown; action?: unknown; knobs?: unknown }, now.templates);
  if ("errors" in t) errors.push(...t.errors.map((e) => `playbook: ${e}`));
  const weapon = p.weapon === undefined ? now.weapon : startWeapon(p.weapon, "playbook.weapon", errors);
  if (!isText(p.why)) errors.push("playbook.why must say what makes it better than the playbook it replaces");
  return "value" in t ? { templates: t.value, weapon, updated: stamp, why: String(p.why ?? "") } : undefined;
}

export type GymRequest = { build: Gym[]; retire: string[] };

export function checkGyms(raw: unknown, gyms: Gym[], stamp: string, errors: string[]): GymRequest {
  const out: GymRequest = { build: [], retire: [] };
  if (raw === undefined) return out;
  if (!Array.isArray(raw)) {
    errors.push("gyms must be an array");
    return out;
  }
  for (const [i, g] of (raw as Record<string, unknown>[]).entries()) {
    const at = `gyms[${i}]`;
    const name = String(g?.name ?? "");
    if (!GYM_NAME.test(name)) {
      errors.push(`${at}.name must be kebab-case`);
      continue;
    }
    if (g.retire === true) {
      if (!gyms.some((x) => x.name === name)) errors.push(`${at}: there is no gym ${name} to retire`);
      out.retire.push(name);
      continue;
    }
    if (gyms.some((x) => x.name === name && x.status !== "failed" && x.status !== "retired")) errors.push(`${at}: gym ${name} exists; pick another name`);
    if (!isText(g.purpose)) errors.push(`${at}.purpose must say what the gym lets you test`);
    const difficulty = Number(g.difficulty);
    if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > GOAL_LEVEL) errors.push(`${at}.difficulty must be 1 to ${GOAL_LEVEL}`);
    const seconds = Number(g.at);
    if (!Number.isInteger(seconds) || seconds < 0 || seconds > MAX_GYM_SECONDS) errors.push(`${at}.at must be whole seconds from 0 to ${MAX_GYM_SECONDS}`);
    const weapon = startWeapon(g.weapon, `${at}.weapon`, errors);
    const loadout = checkLoadout(g.loadout, at, errors);
    out.build.push({ name, status: "pending", purpose: String(g.purpose ?? ""), coach: "coach", created: stamp, difficulty, at: seconds, weapon, ...(loadout === undefined ? {} : { loadout }), seed: "", source: `built from a fresh game to ${clockPadded(seconds)}` });
  }
  if (out.build.length > MAX_NEW_GYMS) errors.push(`at most ${MAX_NEW_GYMS} new gyms per reply`);
  return out;
}

export function checkGames(raw: unknown, ctx: { playbook: Playbook; gyms: Gym[]; experiments: Set<string>; tag: string }, errors: string[]): GameSpec[] {
  if (!Array.isArray(raw) || raw.length < 1 || raw.length > MAX_GAMES) {
    errors.push(`games must be an array of 1 to ${MAX_GAMES} games`);
    return [];
  }
  const out: GameSpec[] = [];
  const saved = new Set<string>();
  for (const [i, g] of (raw as Record<string, unknown>[]).entries()) {
    const at = `games[${i}]`;
    if (typeof g !== "object" || g === null) {
      errors.push(`${at} must be an object`);
      continue;
    }
    if (typeof g.experiment !== "string" || !ctx.experiments.has(g.experiment)) errors.push(`${at}.experiment must name an experiment that exists or that this reply adds`);
    if (!isText(g.label)) errors.push(`${at}.label must be a few words`);
    const seconds = Number(g.seconds);
    if (!Number.isInteger(seconds) || seconds < 10 || seconds > MAX_GAME_SECONDS) errors.push(`${at}.seconds must be whole seconds from 10 to ${MAX_GAME_SECONDS}`);
    const from = g.from as Record<string, unknown> | undefined;
    let start: Start | undefined;
    if (typeof from?.gym === "string") {
      const name = from.gym;
      const gym = ctx.gyms.find((x) => x.name === name);
      if (gym === undefined || (gym.status !== "ready" && gym.status !== "pending" && gym.status !== "building"))
        errors.push(`${at}.from.gym: no usable gym ${name}; the gyms are ${ctx.gyms.filter((x) => x.status === "ready").map((x) => x.name).join(", ") || "none yet"} plus those this reply builds`);
      start = { gym: name };
    } else if (typeof from?.fresh === "object" && from.fresh !== null) {
      const f = from.fresh as Record<string, unknown>;
      const difficulty = Number(f.difficulty);
      if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > GOAL_LEVEL) errors.push(`${at}.from.fresh.difficulty must be 1 to ${GOAL_LEVEL}`);
      const weapon = startWeapon(f.weapon, `${at}.from.fresh.weapon`, errors);
      const seed = f.seed === undefined ? undefined : String(f.seed).toUpperCase();
      if (seed !== undefined && (!/^[0-9A-Z]{1,7}$/.test(seed) || parseInt(seed, 36) > 0xffffffff)) errors.push(`${at}.from.fresh.seed must be 1 to 7 letters and digits`);
      if (seed === EVAL_SEED) errors.push(`${at}: the evaluation seed is kept for full runs; train on other seeds so what you learn carries over`);
      start = { fresh: { difficulty, weapon, ...(seed === undefined ? {} : { seed }) } };
    } else errors.push(`${at}.from must be {"gym": name} or {"fresh": {"difficulty", "weapon"}}`);
    const loadout = checkLoadout(g.loadout, at, errors);
    const changes = g.changes as { planner?: unknown; action?: unknown; knobs?: unknown } | undefined;
    const t = checkTemplates(changes ?? {}, ctx.playbook.templates);
    if ("errors" in t) errors.push(...t.errors.map((e) => `${at}.changes: ${e}`));
    let saveGym: GameSpec["saveGym"];
    if (g.saveGym !== undefined) {
      const s = g.saveGym as Record<string, unknown>;
      const name = String(s?.name ?? "");
      if (!GYM_NAME.test(name) || !isText(s.purpose)) errors.push(`${at}.saveGym must be {"name": kebab-case, "purpose"}`);
      else if (ctx.gyms.some((x) => x.name === name && x.status !== "failed" && x.status !== "retired") || saved.has(name)) errors.push(`${at}.saveGym: gym ${name} exists; pick another name`);
      saved.add(name);
      saveGym = { name, purpose: String(s.purpose) };
    }
    if (start === undefined || !("value" in t)) continue;
    out.push({
      id: gameId(ctx.tag, i + 1),
      label: String(g.label ?? ""),
      experiment: String(g.experiment),
      from: start,
      ...(loadout === undefined ? {} : { loadout }),
      seconds,
      templates: t.value,
      changes: describeChanges(changes),
      ...(saveGym === undefined ? {} : { saveGym }),
    });
  }
  // Two games that are the same game but for a few words test phrasing, not play.
  const sameStart = (a: GameSpec, b: GameSpec) => JSON.stringify([a.from, a.loadout, a.seconds]) === JSON.stringify([b.from, b.loadout, b.seconds]);
  const close = (a: Templates, b: Templates) => {
    const n = wordsChanged(a, b);
    return n !== undefined && n > 0 && n <= WORDING_ONLY ? n : undefined;
  };
  for (const [i, a] of out.entries()) {
    const fromPlaybook = a.changes === "" ? undefined : close(a.templates, ctx.playbook.templates);
    if (fromPlaybook !== undefined) errors.push(`${a.id} differs from your playbook in ${fromPlaybook} words only; test changes to what the bot does, not to how a prompt is phrased`);
    for (const b of out.slice(i + 1)) {
      const n = sameStart(a, b) ? close(a.templates, b.templates) : undefined;
      if (n !== undefined) errors.push(`${a.id} and ${b.id} differ in ${n} words only; test changes to what the bot does, not to how a prompt is phrased`);
    }
  }
  return out;
}
