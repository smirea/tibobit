#!/usr/bin/env bun
// The learning loop, left to run on its own for one coach. A loop is ten iterations: nine
// experiment iterations, where the coach picks what to focus on and plays up to five short games in
// the training ground (fresh games or gyms, side by side in game slots), then one full run on the
// evaluation seed in a reloaded tab, with the coach's best playbook. After the full run the coach
// reviews it, reflects on its own prompts and rewrites them, and the loop commits gameplay/.
// Everything the coach knows between calls is in gameplay/ (see scripts/gameplay.ts).
import path from "node:path";
import { mkdirSync } from "node:fs";
import { type LoadoutSpec, parseLoadout } from "../src/agent/protocol";
import { type HarnessName, checkHarness, jsonObject, runCoach } from "./coach";
import * as loop from "./gameplay";
import { type Checked, type Gym, type Playbook, type PromptKey, type Templates, clock } from "./gameplay";
import { DECISION_MODEL, type GameResult, type GameSpec, type Start, Slot, onSlots } from "./slots";

const USAGE = `usage: scripts/recursive-self-improvement.ts [--coach claude:<model>@<effort>] [--loops <n>] [--slots <n>] [--eval-seed <seed>]

  --coach      the coach: a harness (see scripts/coach.ts), its model, and for claude a reasoning
               effort of high or more (default claude:claude-sonnet-5-5@high)
  --loops      how many loops of ten iterations to play (default: until stopped)
  --slots      training games played side by side (default 5)
  --eval-seed  the seed every full run plays (default TIBO10); training games never use it

The loop goes on from where the coach's state.json says it stopped. Ctrl-C stops it, the games and the servers.`;

const ROOT = path.join(import.meta.dir, "..");
const EXPERIMENT_ITERATIONS = 9;
const MAX_GAMES = 5;
const MAX_GAME_SECONDS = 300;
const MAX_NEW_GYMS = 3;
const MAX_GYM_SECONDS = 1200;
const COACH_TIMEOUT_MS = 20 * 60_000;
const PROMPT_LIMIT = 30_000;

// ---- Arguments ---------------------------------------------------------------------------------

const argv = process.argv.slice(2);
if (argv.includes("--help") || argv.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
const flags: Record<string, string> = {};
for (let i = 0; i < argv.length; i += 2) {
  const [name, value] = [argv[i] ?? "", argv[i + 1]];
  if (!["--coach", "--loops", "--slots", "--eval-seed"].includes(name)) throw new Error(`unexpected argument ${name}\n\n${USAGE}`);
  if (value === undefined || value.startsWith("--")) throw new Error(`${name} needs a value\n\n${USAGE}`);
  flags[name.slice(2)] = value;
}
const coachSpec = flags.coach ?? "claude:claude-sonnet-5-5@high";
const specMatch = coachSpec.match(/^(\w+)(?::([^@]+))?(?:@(\w+))?$/);
if (specMatch === null) throw new Error(`--coach must look like claude:claude-sonnet-5-5@high, got ${coachSpec}`);
const harness: HarnessName = checkHarness(specMatch[1] ?? "");
const model = specMatch[2];
const effort = specMatch[3];
// Coaches reason at high effort or more: a lower one was ruled out for every run.
if (harness === "claude" && !["high", "xhigh", "max"].includes(effort ?? "")) throw new Error(`the coach reasons at high effort or more (@high, @xhigh or @max), not ${effort ?? "the harness default"}`);
const LOOPS = flags.loops === undefined ? Number.POSITIVE_INFINITY : Number(flags.loops);
const SLOTS = Number(flags.slots ?? 5);
if (!(LOOPS >= 1) || !Number.isInteger(SLOTS) || SLOTS < 1 || SLOTS > MAX_GAMES) throw new Error(`--loops must be at least 1 and --slots 1 to ${MAX_GAMES}`);
const EVAL_SEED = (flags["eval-seed"] ?? "TIBO10").toUpperCase();
const COMMITTER = `${model ?? harness}${effort === undefined ? "" : `@${effort}`}`;
if (Bun.which("gai") === null) throw new Error("committing gameplay/ needs gai on PATH");

// The notes of a full run name the coach and the model that coached it, which can change over time.
const COACH_LABEL = `coach ${COMMITTER}`;
const files = loop.COACH_FILES;
await loop.checkLoopFiles();
const RUNS = path.join(ROOT, ".runs", "rsi");
mkdirSync(RUNS, { recursive: true });

// ---- Slots -------------------------------------------------------------------------------------

const opened: Slot[] = [];
let stopping = false;
async function shutdown(code: number): Promise<never> {
  stopping = true;
  await Promise.all(opened.map((s) => s.close()));
  process.exit(code);
}
process.on("SIGINT", () => void shutdown(130));
process.on("SIGTERM", () => void shutdown(143));

const open = async (name: string, profile: string) => {
  const slot = await Slot.open(name, profile, path.join(RUNS, "logs"));
  opened.push(slot);
  return slot;
};
console.log(`the coach is ${coachSpec}, ${SLOTS} training slots, evaluation seed ${EVAL_SEED}; logs in ${path.relative(ROOT, RUNS)}`);
const [main, ...slots] = await Promise.all([
  open("main", path.join(ROOT, ".runs", "coach-profile")),
  ...Array.from({ length: SLOTS }, (_, i) => open(`slot${i + 1}`, path.join(ROOT, ".runs", `coach-profile-slot${i + 1}`))),
]);
if (main === undefined) throw new Error("no main slot");

// A rebuilt userscript reaches the games when they restart, which happens between iterations.
const DIST = path.join(ROOT, "dist", "tibo-helper.user.js");
let gamesBuilt = Bun.file(DIST).lastModified;
async function refreshGames() {
  if (Bun.file(DIST).lastModified === gamesBuilt) return;
  gamesBuilt = Bun.file(DIST).lastModified;
  console.log("the userscript was rebuilt; restarting the games");
  await Promise.all(opened.map((s) => s.restartGame()));
}

// The game sends its encyclopedia once a run has loaded its content.
async function encyclopedia(): Promise<Record<string, unknown[]>> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const book = await main.api<Record<string, unknown[]>>("/encyclopedia").catch(() => undefined);
    if (book !== undefined) return book;
    await main.anyRun();
    await Bun.sleep(3000);
  }
  throw new Error("the game never sent its encyclopedia");
}
const BOOK = await encyclopedia();
const idsOf = (section: string, keep: (x: Record<string, unknown>) => boolean = () => true) =>
  new Set((BOOK[section] as Record<string, unknown>[]).filter((x) => typeof x.id === "string" && keep(x)).map((x) => x.id as string));
const IDS = { weapons: idsOf("weapons"), base: idsOf("weapons", (w) => w.tier === "base"), passives: idsOf("passives"), items: idsOf("items") };
const ladder = async () => (await main.state()).ladderCleared ?? 0;
// The start command names the weapons the profile offers when asked for one it does not.
const OFFERED = await (async () => {
  const probe = await main.api<{ state: string; detail?: string }>("/command?wait=1&timeout=120", { type: "start", mode: "openWorld", difficulty: "nightmare", weapon: "no-such-weapon" });
  const list = probe.detail?.match(/offered: (.*)$/)?.[1];
  if (list === undefined) throw new Error(`could not read the starting weapons the game offers: ${probe.state} ${probe.detail ?? ""}`);
  return list.split(", ").filter(Boolean);
})();

// ---- The coach ---------------------------------------------------------------------------------

/** Asks the coach until a reply passes `check`: a harness failure is tried again, a rejected reply is asked again with the reasons. */
async function ask<T>(tag: string, prompt: string, check: (raw: Record<string, unknown>) => Checked<T>): Promise<T | undefined> {
  await Bun.write(path.join(RUNS, `${tag}.prompt.md`), prompt);
  let request = prompt;
  for (let attempt = 1; attempt <= 3 && !stopping; attempt++) {
    const started = Date.now();
    const said = await runCoach(harness, model, request, COACH_TIMEOUT_MS, () => {}, effort);
    const seconds = Math.round((Date.now() - started) / 1000);
    await Bun.write(path.join(RUNS, `${tag}.reply-${attempt}.md`), `${said.reasoning}\n\n---\n\n${said.text}\n\n---\n\n${said.error}\n${said.stderr}`);
    const raw = jsonObject(said.text);
    if (raw === undefined) {
      console.error(`${tag}: no JSON from the coach after ${seconds}s${said.timedOut ? " (timed out)" : ""}: ${(said.error || said.text || said.stderr).slice(0, 400)}`);
      if (said.text.trim() !== "" && !said.timedOut) request = `${prompt}\n\n# Your previous reply held no JSON object\n\nReply again in full, with only the JSON object.`;
      await Bun.sleep(15_000);
      continue;
    }
    const checked = check(raw);
    if ("value" in checked) {
      console.log(`${tag}: the coach answered in ${seconds}s`);
      return checked.value;
    }
    console.error(`${tag}: reply rejected:\n- ${checked.errors.join("\n- ")}`);
    request = `${prompt}\n\n# Your previous reply was rejected\n\n- ${checked.errors.join("\n- ")}\n\nReply again in full, with only the JSON object.`;
  }
  return undefined;
}

const NO_TOOLS = "Answer from these facts alone; you cannot read files, browse or run tools. Reply with only one JSON object with these keys:";

function editableFiles(phase: "experiments" | "fullRun" | "reflect"): string {
  return [
    "# What you can change",
    "",
    `Everything lives in gameplay/, and you change it through keys in your JSON reply (see Reply at the end). Anything you leave out stays as it is. Your prompts, playbook, log and where your loop stands are in gameplay/coach/.`,
    "",
    "- **beliefs.csv** (`beliefs`): what the loop holds true, each marked good (worth doing), bad (worth avoiding) or fact. Rows are never deleted, only disproved.",
    "- **experiments/** (`experiments`): one file per question, experiment_<name>.md. The loop writes every game played for an experiment into its file.",
    "- **your playbook** (`playbook`): the templates the planner and the action model play with, their knobs, and the starting weapon. Training games play it with each game's changes; the full run plays it as it stands.",
    ...(phase === "experiments"
      ? ["- **games** (`games`): up to 5 training games this iteration, played side by side.", "- **gyms.json** (`gyms`): saved game states to build or retire."]
      : phase === "reflect"
        ? ["- **the full run's notes** (`review`): your review, written into the notes file.", "- **your prompts** (`prompts`): experiments.md, full-run.md and reflect.md, which you rewrite from what this loop taught you about how you work.", "- **gyms.json** (`gyms`)."]
        : []),
    "- **infrastructure_feedback.csv** (`infra`): requests for changes to the bot's code, which you cannot make. People read them and answer in the status column.",
    "",
    "You cannot change which models play (you, the planner and the action model) or the bot's code.",
  ].join("\n");
}

const GAMES_CONTRACT = `"games": 1 to ${MAX_GAMES} training games, played side by side, each {"experiment": the name of the experiment it serves (one that exists or that this reply adds), "label": a few words, "from": {"gym": a gym's name} or {"fresh": {"difficulty": Nightmare level 1 to 10, "weapon": a base weapon id or "random", "seed": optional, to give several fresh games the same map}}, "loadout": optional, replaces the whole build when the game starts: {"weapons": [{"id", "level"}], "passives": [{"id", "level"}], "items": [{"id", "count"}], "gold", "hp": a number or "full"} with ids from the encyclopedia, "seconds": 10 to ${MAX_GAME_SECONDS} of game time, "changes": optional {"planner", "action", "knobs"} over your playbook (only the keys that change), "saveGym": optional {"name", "purpose"} to keep the state the game ends in as a gym, if Tibo lives}. A game from a gym replays the same game state each time, so two games from one gym differ only in what the models chose; fresh games with the same seed share a map. Fresh games never get the evaluation seed.`;
const GYMS_CONTRACT = `"gyms": gyms to build or retire: {"name": kebab-case, "purpose": what it lets you test, "difficulty": 1 to 10, "at": game seconds 0 to ${MAX_GYM_SECONDS} to save it at, "weapon": a base weapon id or "random", "loadout": optional, swapped in at 0:00} is built before this iteration's games by playing a fresh game with your playbook to that time, in 5-minute stages: a death replays that stage from its start, up to 3 times (a loadout helps for late gyms), at most ${MAX_NEW_GYMS} per reply; {"name", "retire": true} retires one.`;
const PLAYBOOK_CONTRACT = `"playbook": optional changes to your playbook: {"planner", "action", "knobs"} (only the keys that change), "weapon": a base weapon id or "random", "why": what makes this the best you know}.`;

// ---- Facts -------------------------------------------------------------------------------------

type LastGames = { tag: string; results: GameResult[]; gyms: string[] };
async function lastGames(): Promise<LastGames | undefined> {
  const f = Bun.file(path.join(RUNS, "last-games.json"));
  return (await f.exists()) ? ((await f.json()) as LastGames) : undefined;
}

const describeStart = (from: Start, gyms: Gym[]) => {
  if ("gym" in from) {
    const name = from.gym;
    const g = gyms.find((x) => x.name === name);
    return `gym ${from.gym}${g === undefined ? "" : ` (Nightmare ${g.difficulty} at ${clock(g.at)})`}`;
  }
  return `a fresh game on Nightmare ${from.fresh.difficulty}${from.fresh.weapon === "" ? "" : ` with ${from.fresh.weapon}`}`;
};

function outcome(r: GameResult): string {
  if (r.error !== undefined) return `not played: ${r.error}`;
  const t = r.result;
  if (t === undefined) return "no result";
  const taken = Object.values(t.damageTaken).reduce((a, b) => a + b, 0);
  const top = Object.entries(t.damageTaken).slice(0, 4).map(([k, v]) => `${k} ${v}`).join(", ");
  return `${t.died ? `died after ${t.survived}s (game clock ${clock(t.end)})` : `alive after ${t.survived}s (game clock ${clock(t.end)}), health ${t.hp.end}/${t.hp.max}`}; damage taken ${Math.round(taken)}${top === "" ? "" : ` (${top})`}; ${t.kills} kills; level ${t.level.start} to ${t.level.end}${t.plannerCalls === undefined ? "" : `; planner asked ${t.plannerCalls} times, action model ${t.actionCalls ?? 0}`}; ended with ${[...t.weapons, ...t.passives].join(", ") || "nothing"}${r.savedGym === undefined ? "" : `; saved as gym ${r.spec.saveGym?.name}`}`;
}

function gameEntry(r: GameResult, gyms: Gym[], full: boolean): string {
  const s = r.spec;
  return [
    `### ${s.id}: ${s.label}`,
    "",
    `- Start: ${describeStart(s.from, gyms)}, seed ${r.seed || "?"}${s.loadout === undefined ? "" : `, build swapped for ${[...s.loadout.weapons.map((w) => `${w.id} ${w.level}`), ...s.loadout.passives.map((p) => `${p.id} ${p.level}`), ...s.loadout.items.map((x) => `${x.id} x${x.count}`)].join(", ")}`}; ${s.seconds}s; plays the playbook${s.changes === "" ? "" : ` with ${s.changes}`}.`,
    `- Outcome: ${outcome(r)}.`,
    ...(r.result?.totals === undefined ? [] : loop.totalsLines(r.result.totals).map((l) => `- ${l}`)),
    ...(full && r.stats !== undefined ? ["", r.stats] : []),
  ].join("\n");
}

async function facts(state: loop.CoachState, playbook: Playbook): Promise<string> {
  const experiments = await loop.readExperiments();
  const gyms = await loop.readGyms();
  const last = await lastGames();
  const log = await Bun.file(files.log).text().catch(() => "");
  const cleared = await ladder();
  const open = experiments.filter((e) => e.status !== "done" && e.status !== "retired");
  const closed = experiments.filter((e) => e.status === "done" || e.status === "retired");
  return [
    "# Where the loop stands",
    `You are the coach (${coachSpec}). This is loop ${state.loop}, iteration ${state.iteration} of 10: iterations 1 to ${EXPERIMENT_ITERATIONS} are experiments in the training ground, and iteration 10 is a full run on the evaluation seed. Your Open World Nightmare ladder: ${cleared === 0 ? "no level won yet" : `won up to Nightmare ${cleared}`}, so the next full run plays Nightmare ${cleared + 1}. The goal of the whole campaign: survive 20:00 on Nightmare 10.`,
    "## Full runs so far",
    await loop.campaign(),
    "# Facts",
    "## The game and the bot",
    loop.botFacts({ planner: DECISION_MODEL, action: DECISION_MODEL }),
    "## Templates, state blocks and knobs",
    loop.catalog(),
    "## Your playbook",
    `Updated ${playbook.updated}: ${playbook.why}. Starting weapon: ${playbook.weapon || "random"}. The full run can start with ${OFFERED.join(", ")} (more unlock as the profile plays); a training game can start with any base weapon.`,
    JSON.stringify(playbook.templates, null, 2),
    "## Beliefs (gameplay/beliefs.csv)",
    await Bun.file(loop.BELIEFS_CSV).text(),
    "## Experiments: coverage by area",
    loop.coverage(experiments),
    "## Open experiments",
    open.map((e) => loop.renderExperiment(e)).join("\n\n---\n\n") || "(none)",
    "## Finished experiments",
    closed.map((e) => `- ${e.name} (${e.status}${e.result === "" ? "" : `, ${e.result}`}, ${e.area}): ${e.title}. ${e.findings.split("\n")[0] ?? ""}`).join("\n") || "(none)",
    "## Gyms (gameplay/gyms.json)",
    gyms.map(loop.gymLine).join("\n") || "(none)",
    "## Your log, newest last",
    log.length > 40_000 ? `(older entries cut)\n${log.slice(-40_000)}` : log || "(empty)",
    "## The last iteration's games",
    last === undefined ? "(none yet)" : [`From ${last.tag}.`, ...last.gyms, ...last.results.map((r) => gameEntry(r, gyms, true))].join("\n\n"),
    "## The latest full run",
    await loop.latestNotes(1),
    "## Infrastructure requests (gameplay/infrastructure_feedback.csv)",
    await Bun.file(loop.INFRA_CSV).text(),
    "## The game's encyclopedia: every id you can use",
    JSON.stringify(BOOK),
  ].join("\n\n");
}

// ---- Checking a reply --------------------------------------------------------------------------

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

function checkPlaybook(raw: unknown, now: Playbook, stamp: string, errors: string[]): Playbook | undefined {
  if (raw === undefined) return undefined;
  if (typeof raw !== "object" || raw === null) {
    errors.push("playbook must be an object");
    return undefined;
  }
  const p = raw as Record<string, unknown>;
  const t = loop.checkTemplates(p as { planner?: unknown; action?: unknown; knobs?: unknown }, now.templates);
  if ("errors" in t) errors.push(...t.errors.map((e) => `playbook: ${e}`));
  const weapon = p.weapon === undefined ? now.weapon : startWeapon(p.weapon, "playbook.weapon", errors);
  if (!loop.isText(p.why)) errors.push("playbook.why must say what makes it the best you know");
  return "value" in t ? { templates: t.value, weapon, updated: stamp, why: String(p.why ?? "") } : undefined;
}

type GymRequest = { build: Gym[]; retire: string[] };
function checkGyms(raw: unknown, gyms: Gym[], stamp: string, errors: string[]): GymRequest {
  const out: GymRequest = { build: [], retire: [] };
  if (raw === undefined) return out;
  if (!Array.isArray(raw)) {
    errors.push("gyms must be an array");
    return out;
  }
  for (const [i, g] of (raw as Record<string, unknown>[]).entries()) {
    const at = `gyms[${i}]`;
    const name = String(g?.name ?? "");
    if (!loop.GYM_NAME.test(name)) {
      errors.push(`${at}.name must be kebab-case`);
      continue;
    }
    if (g.retire === true) {
      if (!gyms.some((x) => x.name === name)) errors.push(`${at}: there is no gym ${name} to retire`);
      out.retire.push(name);
      continue;
    }
    if (gyms.some((x) => x.name === name && x.status !== "failed" && x.status !== "retired")) errors.push(`${at}: gym ${name} exists; pick another name`);
    if (!loop.isText(g.purpose)) errors.push(`${at}.purpose must say what the gym lets you test`);
    const difficulty = Number(g.difficulty);
    if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 10) errors.push(`${at}.difficulty must be 1 to 10`);
    const seconds = Number(g.at);
    if (!Number.isInteger(seconds) || seconds < 0 || seconds > MAX_GYM_SECONDS) errors.push(`${at}.at must be whole seconds from 0 to ${MAX_GYM_SECONDS}`);
    const weapon = startWeapon(g.weapon, `${at}.weapon`, errors);
    const loadout = checkLoadout(g.loadout, at, errors);
    out.build.push({ name, status: "pending", purpose: String(g.purpose ?? ""), coach: "coach", created: stamp, difficulty, at: seconds, weapon, ...(loadout === undefined ? {} : { loadout }), seed: "", source: `built from a fresh game to ${clock(seconds)}` });
  }
  if (out.build.length > MAX_NEW_GYMS) errors.push(`at most ${MAX_NEW_GYMS} new gyms per reply`);
  return out;
}

function checkGames(raw: unknown, ctx: { playbook: Playbook; gyms: Gym[]; experiments: Set<string>; tag: string }, errors: string[]): GameSpec[] {
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
    if (!loop.isText(g.label)) errors.push(`${at}.label must be a few words`);
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
      if (!Number.isInteger(difficulty) || difficulty < 1 || difficulty > 10) errors.push(`${at}.from.fresh.difficulty must be 1 to 10`);
      const weapon = startWeapon(f.weapon, `${at}.from.fresh.weapon`, errors);
      const seed = f.seed === undefined ? undefined : String(f.seed).toUpperCase();
      if (seed !== undefined && (!/^[0-9A-Z]{1,7}$/.test(seed) || parseInt(seed, 36) > 0xffffffff)) errors.push(`${at}.from.fresh.seed must be 1 to 7 letters and digits`);
      if (seed === EVAL_SEED) errors.push(`${at}: the evaluation seed is kept for full runs; train on other seeds so what you learn carries over`);
      start = { fresh: { difficulty, weapon, ...(seed === undefined ? {} : { seed }) } };
    } else errors.push(`${at}.from must be {"gym": name} or {"fresh": {"difficulty", "weapon"}}`);
    const loadout = checkLoadout(g.loadout, at, errors);
    const changes = g.changes as { planner?: unknown; action?: unknown; knobs?: unknown } | undefined;
    const t = loop.checkTemplates(changes ?? {}, ctx.playbook.templates);
    if ("errors" in t) errors.push(...t.errors.map((e) => `${at}.changes: ${e}`));
    let saveGym: GameSpec["saveGym"];
    if (g.saveGym !== undefined) {
      const s = g.saveGym as Record<string, unknown>;
      const name = String(s?.name ?? "");
      if (!loop.GYM_NAME.test(name) || !loop.isText(s.purpose)) errors.push(`${at}.saveGym must be {"name": kebab-case, "purpose"}`);
      else if (ctx.gyms.some((x) => x.name === name && x.status !== "failed" && x.status !== "retired") || saved.has(name)) errors.push(`${at}.saveGym: gym ${name} exists; pick another name`);
      saved.add(name);
      saveGym = { name, purpose: String(s.purpose) };
    }
    if (start === undefined || !("value" in t)) continue;
    out.push({
      id: `${ctx.tag}.G${i + 1}`,
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
  return out;
}

// ---- Gyms --------------------------------------------------------------------------------------

/** The gyms the loop keeps from the start: the opening and the first boss on the next ladder level and on Nightmare 10, and minutes 5 and 10 on the next level. */
function standardGyms(next: number): Gym[] {
  const gym = (name: string, difficulty: number, at: number, purpose: string): Gym => ({ name, status: "pending", purpose, coach: "loop", created: "start", difficulty, at, weapon: "", seed: "", source: `built from a fresh game to ${clock(at)}` });
  return [
    gym(`opening-nm${next}`, next, 0, "The first seconds of a game on the next ladder level: openings, first picks and early routes."),
    gym(`first-boss-nm${next}`, next, 105, "Just before the 2:00 boss on the next ladder level."),
    gym(`minute-5-nm${next}`, next, 300, "Minute 5 on the next ladder level, with a build of its own."),
    gym(`minute-10-nm${next}`, next, 600, "Minute 10 on the next ladder level, where the pests have reached full health."),
    gym("opening-nm10", 10, 0, "The opening on Nightmare 10, the campaign's goal."),
    gym("first-boss-nm10", 10, 105, "Just before the 2:00 boss on Nightmare 10."),
  ];
}

const building = new Map<string, Promise<Gym>>();

/** Builds a gym on a slot and records the outcome; one build per gym at a time in this process. */
function buildGym(slot: Slot, gym: Gym, templates: Templates): Promise<Gym> {
  const running = building.get(gym.name);
  if (running !== undefined) return running;
  const work = (async () => {
    console.log(`building gym ${gym.name} on ${slot.name}`);
    const built = await slot.buildGym({ ...gym, status: "building" }, gym.templates ?? templates, EVAL_SEED);
    // A build cut off by a stop stays building, and goes back to pending on restart.
    if (stopping) return built;
    await loop.updateGyms((gyms) => {
      const at = gyms.findIndex((g) => g.name === gym.name);
      if (at >= 0) gyms[at] = built;
      else gyms.push(built);
    });
    console.log(`gym ${gym.name}: ${built.status}${built.error === undefined ? "" : ` (${built.error})`}`);
    return built;
  })().finally(() => building.delete(gym.name));
  building.set(gym.name, work);
  return work;
}

/** Marks the pending gyms as building and returns them to build. */
const claimPending = () =>
  loop.updateGyms((gyms) => {
    const claimed = gyms.filter((g) => g.status === "pending");
    for (const g of claimed) g.status = "building";
    return claimed.map((g) => ({ ...g }));
  });

async function buildClaimed(claimed: Gym[], templates: Templates): Promise<string[]> {
  const built = await onSlots(slots, claimed, (slot, g) => buildGym(slot, g, templates));
  return built.map((g) => `Gym ${g.name}: ${g.status}${g.error === undefined ? "" : ` (${g.error})`}${g.checkpoint === undefined ? "" : `, lv ${g.checkpoint.level}, hp ${g.checkpoint.hp}, ${g.checkpoint.weapons.join(", ")}`}.`);
}

// ---- Iterations --------------------------------------------------------------------------------

const stampOf = (s: loop.CoachState) => `L${s.loop}.I${s.iteration}`;
const tagOf = (s: loop.CoachState) => `L${s.loop}.I${s.iteration}`;

async function appendLog(state: loop.CoachState, title: string, body: string) {
  await Bun.write(files.log, `${await Bun.file(files.log).text().catch(() => "")}\n## ${tagOf(state)}: ${title} (${new Date().toISOString().slice(0, 16).replace("T", " ")})\n\n${body.trim()}\n`);
}

type ExperimentReply = { summary: string; edits: loop.LoopEdits; games: GameSpec[]; gyms: GymRequest; playbook?: Playbook };

async function experimentIteration(state: loop.CoachState) {
  const tag = tagOf(state);
  const stamp = stampOf(state);
  const playbook = await loop.readPlaybook();
  const instructions = await Bun.file(files.experiments).text();
  const prompt = [
    editableFiles("experiments"),
    instructions,
    await facts(state, playbook),
    "# Reply",
    NO_TOOLS,
    '"summary": what the last games showed and what this iteration tests and why, in a short paragraph; it goes into your log.',
    GAMES_CONTRACT,
    GYMS_CONTRACT,
    PLAYBOOK_CONTRACT,
    loop.EDITS_CONTRACT,
  ].join("\n\n");
  const before = await loop.readTables();
  const gymsBefore = await loop.readGyms();
  const reply = await ask<ExperimentReply>(tag, prompt, (raw) => {
    const errors: string[] = [];
    const edits = loop.checkEdits(raw, before);
    if ("errors" in edits) errors.push(...edits.errors);
    if (!loop.isText(raw.summary)) errors.push("summary must be a short paragraph");
    const gyms = checkGyms(raw.gyms, gymsBefore, stamp, errors);
    const pb = checkPlaybook(raw.playbook, playbook, stamp, errors);
    const experiments = new Set([...before.experiments.map((e) => e.name), ...("value" in edits ? (edits.value.experiments ?? []).map((e) => e.name) : [])]);
    const games = checkGames(raw.games, { playbook: pb ?? playbook, gyms: [...gymsBefore, ...gyms.build], experiments, tag }, errors);
    if (errors.length > 0 || !("value" in edits)) return { errors };
    return { value: { summary: String(raw.summary), edits: edits.value, games, gyms, ...(pb === undefined ? {} : { playbook: pb }) } };
  });
  if (reply === undefined) {
    await appendLog(state, "no usable plan", "The coach gave no usable reply, so this iteration played nothing.");
    return;
  }
  const done = await loop.applyEdits(reply.edits, stamp);
  if (reply.playbook !== undefined) {
    await loop.writePlaybook(reply.playbook);
    done.push("the playbook");
  }
  await loop.updateGyms((gyms) => {
    for (const name of reply.gyms.retire) for (const g of gyms) if (g.name === name) g.status = "retired";
    for (const g of reply.gyms.build) {
      const at = gyms.findIndex((x) => x.name === g.name);
      if (at >= 0) gyms[at] = g;
      else gyms.push(g);
    }
  });
  console.log(`${tag}: ${reply.summary}\n  changed ${done.join(", ") || "nothing"}; ${reply.games.length} games`);
  const templates = (await loop.readPlaybook()).templates;
  await refreshGames();
  const gymLines = await buildClaimed(await claimPending(), templates);
  // A gym another coach's loop is building for a game here is waited for.
  const wanted = new Set(reply.games.flatMap((g) => ("gym" in g.from ? [g.from.gym] : [])));
  for (let waited = 0; waited < 60; waited++) {
    const busy = (await loop.readGyms()).filter((g) => wanted.has(g.name) && (g.status === "building" || g.status === "pending"));
    if (busy.length === 0) break;
    await Bun.sleep(30_000);
  }
  const gyms = await loop.readGyms();
  const results = await onSlots(slots, reply.games, async (slot, spec) => {
    console.log(`${spec.id} on ${slot.name}: ${spec.label}`);
    // A gym is built again on the slot that needs it, which runs the newest game build.
    const r = await slot.play(spec, gyms, EVAL_SEED, (g) => buildGym(slot, g, templates));
    console.log(`${spec.id}: ${outcome(r)}`);
    return r;
  });
  // Games cut off by a stop are not results; the iteration plays again after a restart.
  if (stopping) return;
  for (const r of results) {
    const save = r.spec.saveGym;
    const end = r.result?.end;
    if (r.savedGym === undefined || save === undefined || end === undefined) continue;
    const start = r.spec.from;
    const gym: Gym = {
      name: save.name,
      status: "ready",
      purpose: save.purpose,
      coach: "coach",
      created: stamp,
      difficulty: Number(r.difficulty.split("-")[1] ?? 0),
      at: Math.round(end),
      weapon: "fresh" in start ? start.fresh.weapon : "",
      ...(r.spec.loadout === undefined ? {} : { loadout: r.spec.loadout }),
      seed: r.seed,
      source: `saved at the end of game ${r.spec.id}`,
      templates: r.spec.templates,
      checkpoint: r.savedGym,
    };
    await loop.updateGyms((all) => {
      const at = all.findIndex((x) => x.name === gym.name);
      if (at >= 0) all[at] = gym;
      else all.push(gym);
    });
  }
  for (const r of results) if (r.spec.experiment !== undefined) await loop.addGames(r.spec.experiment, [gameEntry(r, gyms, false)]);
  await Bun.write(path.join(RUNS, "last-games.json"), JSON.stringify({ tag, results, gyms: gymLines } satisfies LastGames, null, 2));
  await appendLog(state, "experiments", [reply.summary, "", ...results.map((r) => `- ${r.spec.id} ${r.spec.label} (${r.spec.experiment}): ${outcome(r)}`), ...gymLines.map((l) => `- ${l}`)].join("\n"));
}

type FullRunReply = { summary: string; intent: string; edits: loop.LoopEdits; playbook?: Playbook };

/**
 * The playbook as it stands, played unchanged from fresh games on new seeds at the full run's level.
 * Nine iterations of tuning one moment can break another (sonnet-medium's loop 2 tuned minutes 16
 * to 20 and its full run died at 6:42), so the full-run plan sees this before it settles.
 */
async function rehearse(state: loop.CoachState, playbook: Playbook): Promise<string> {
  const tag = tagOf(state);
  const level = (await ladder()) + 1;
  await refreshGames();
  const specs: GameSpec[] = slots.map((_, i) => ({ id: `${tag}.R${i + 1}`, label: "the playbook, unchanged", from: { fresh: { difficulty: level, weapon: playbook.weapon } }, seconds: MAX_GAME_SECONDS, templates: playbook.templates, changes: "" }));
  const gyms = await loop.readGyms();
  const results = await onSlots(slots, specs, async (slot, spec) => {
    const r = await slot.play(spec, gyms, EVAL_SEED, (g) => buildGym(slot, g, playbook.templates));
    console.log(`${spec.id}: ${outcome(r)}`);
    return r;
  });
  const lived = results.filter((r) => r.result !== undefined && !r.result.died).length;
  await appendLog(state, "rehearsal", `The playbook, unchanged, on ${results.length} fresh Nightmare ${level} games of ${MAX_GAME_SECONDS}s: ${lived} lived.\n\n${results.map((r) => `- ${r.spec.id}: ${outcome(r)}`).join("\n")}`);
  return [`## Your playbook as it stands, rehearsed: ${lived} of ${results.length} fresh Nightmare ${level} games on new seeds lived ${MAX_GAME_SECONDS}s`, "The loop played your playbook unchanged on fresh seeds, to catch a change that helped one moment but hurt the opening. Weigh it before you settle the playbook.", ...results.map((r) => gameEntry(r, gyms, false))].join("\n\n");
}

async function fullRun(state: loop.CoachState): Promise<string | undefined> {
  const tag = tagOf(state);
  const stamp = stampOf(state);
  const playbook = await loop.readPlaybook();
  const instructions = await Bun.file(files.fullRun).text();
  const rehearsal = await rehearse(state, playbook);
  if (stopping) return undefined;
  const prompt = [
    editableFiles("fullRun"),
    instructions,
    rehearsal,
    await facts(state, playbook),
    "# Reply",
    NO_TOOLS,
    '"summary": what the last games showed and what the full run puts into practice, in a short paragraph for your log.',
    '"intent": what the full run plays and why, in a short paragraph for the notes and for a person watching.',
    PLAYBOOK_CONTRACT,
    loop.EDITS_CONTRACT,
  ].join("\n\n");
  const before = await loop.readTables();
  const reply = await ask<FullRunReply>(tag, prompt, (raw) => {
    const errors: string[] = [];
    const edits = loop.checkEdits(raw, before);
    if ("errors" in edits) errors.push(...edits.errors);
    if (!loop.isText(raw.summary)) errors.push("summary must be a short paragraph");
    if (!loop.isText(raw.intent)) errors.push("intent must be a short paragraph");
    const pb = checkPlaybook(raw.playbook, playbook, stamp, errors);
    if (errors.length > 0 || !("value" in edits)) return { errors };
    return { value: { summary: String(raw.summary), intent: String(raw.intent), edits: edits.value, ...(pb === undefined ? {} : { playbook: pb }) } };
  });
  if (reply !== undefined) {
    await loop.applyEdits(reply.edits, stamp);
    if (reply.playbook !== undefined) await loop.writePlaybook(reply.playbook);
  }
  const final = await loop.readPlaybook();
  const intent = reply?.intent ?? "The coach gave no plan; the run plays the playbook as it stands.";
  await appendLog(state, "full run", reply?.summary ?? intent);
  const templatesFile = path.join(RUNS, `${tag}.full-run.templates.json`);
  await Bun.write(templatesFile, JSON.stringify(final.templates));
  await refreshGames();
  const startedAt = Date.now();
  // The bot plays the evaluation seed in a freshly loaded tab, as its first run there, and checks it.
  console.log(`${tag}: full run on Nightmare ${(await ladder()) + 1}, seed ${EVAL_SEED}`);
  const out = Bun.file(path.join(RUNS, `${tag}.full-run.log`));
  const bot = Bun.spawn(
    [
      process.execPath,
      path.join(import.meta.dir, "tibo-bot.ts"),
      ...["--server", main.server, "--reload", "", "--decider", "openrouter", "--model", DECISION_MODEL, "--mode", "openWorld", "--difficulty", "highest", "--runs", "1", "--seed", EVAL_SEED],
      ...["--notes", "--coach-label", COACH_LABEL, "--intent", intent, "--templates", templatesFile, ...(final.weapon === "" ? [] : ["--weapon", final.weapon]), "--log-dir", path.join(RUNS, "full-runs")],
    ],
    { cwd: ROOT, stdin: "ignore", stdout: out, stderr: out },
  );
  const code = await bot.exited;
  if (code !== 0) console.error(`${tag}: the full run's bot exited with code ${code}; see ${out.name}`);
  for (const name of await loop.notesFiles()) {
    const file = path.join(loop.NOTES_DIR, name);
    if (Bun.file(file).lastModified >= startedAt && loop.notesField(await Bun.file(file).text(), "Coach") === COACH_LABEL) return file;
  }
  return undefined;
}

type ReflectReply = { review: string; summary: string; edits: loop.LoopEdits; prompts: Partial<Record<PromptKey, string>>; gyms: GymRequest; playbook?: Playbook };

async function reflect(state: loop.CoachState, notesFile: string | undefined) {
  const tag = `${tagOf(state)}.reflect`;
  const stamp = stampOf(state);
  const playbook = await loop.readPlaybook();
  const keys = Object.keys(loop.PROMPT_KEYS) as PromptKey[];
  const prompts = Object.fromEntries(await Promise.all(keys.map(async (k) => [k, await Bun.file(files[k]).text()] as const))) as Record<PromptKey, string>;
  const notes = notesFile === undefined ? "(the full run left no notes: it was cut short)" : await Bun.file(notesFile).text();
  const runLog = notesFile === undefined ? "" : await loop.logForPrompt(loop.notesField(notes, "Log") ?? "", 200_000);
  const prompt = [
    editableFiles("reflect"),
    prompts.reflect,
    "# The full run",
    notes,
    "## Its log",
    "One row per model call (plan: the planner chose the next goal; pick: it took a card; move: the action model chose a step) and per goal that started or ended, with the player's state. hp_lost is health lost since the row before.",
    runLog || "(no log)",
    "# Your prompts as they stand",
    ...keys.flatMap((k) => [`## ${loop.PROMPT_KEYS[k]} (\`${k}\`)`, prompts[k]]),
    await facts(state, playbook),
    "# Reply",
    NO_TOOLS,
    '"review": your review of the full run in Markdown, with the sections reflect.md asks for, under ## headings; it goes into the notes file.',
    '"summary": what this loop taught you and what the next loop should do differently, in a short paragraph for your log.',
    `"prompts": {"experiments", "fullRun", "reflect"}: the whole new text of each prompt you rewrite (under ${PROMPT_LIMIT} characters, keeping every ## section). Rewrite what this loop showed works badly for you; leave a prompt out to keep it.`,
    GYMS_CONTRACT,
    PLAYBOOK_CONTRACT,
    loop.EDITS_CONTRACT,
  ].join("\n\n");
  const before = await loop.readTables();
  const gymsBefore = await loop.readGyms();
  const reply = await ask<ReflectReply>(tag, prompt, (raw) => {
    const errors: string[] = [];
    const edits = loop.checkEdits(raw, before);
    if ("errors" in edits) errors.push(...edits.errors);
    if (!loop.isText(raw.review) || /<!--/.test(raw.review)) errors.push("review must be Markdown without HTML comments");
    if (!loop.isText(raw.summary)) errors.push("summary must be a short paragraph");
    const rewrites: Partial<Record<PromptKey, string>> = {};
    for (const [k, v] of Object.entries((raw.prompts ?? {}) as Record<string, unknown>)) {
      if (!(k in loop.PROMPT_KEYS)) errors.push(`prompts.${k} is not a prompt; they are ${keys.join(", ")}`);
      else if (!loop.isText(v) || v.length > PROMPT_LIMIT) errors.push(`prompts.${k} must be the whole new text, under ${PROMPT_LIMIT} characters`);
      else {
        const loss = loop.promptLoss(prompts[k as PromptKey], v, loop.PROMPT_KEYS[k as PromptKey]);
        if (loss !== undefined) errors.push(loss);
        else rewrites[k as PromptKey] = v;
      }
    }
    const gyms = checkGyms(raw.gyms, gymsBefore, stamp, errors);
    const pb = checkPlaybook(raw.playbook, playbook, stamp, errors);
    if (errors.length > 0 || !("value" in edits)) return { errors };
    return { value: { review: String(raw.review), summary: String(raw.summary), edits: edits.value, prompts: rewrites, gyms, ...(pb === undefined ? {} : { playbook: pb }) } };
  });
  if (reply === undefined) {
    await appendLog(state, "reflection", "The coach gave no usable reflection.");
    return;
  }
  await loop.applyEdits(reply.edits, stamp);
  if (reply.playbook !== undefined) await loop.writePlaybook(reply.playbook);
  for (const [k, v] of Object.entries(reply.prompts) as [PromptKey, string][]) await Bun.write(files[k], `${v.trim()}\n`);
  await loop.updateGyms((gyms) => {
    for (const name of reply.gyms.retire) for (const g of gyms) if (g.name === name) g.status = "retired";
    gyms.push(...reply.gyms.build.filter((g) => !gyms.some((x) => x.name === g.name)));
  });
  if (notesFile !== undefined) await Bun.write(notesFile, loop.withReview(await Bun.file(notesFile).text(), reply.review));
  const rewrote = Object.keys(reply.prompts).map((k) => loop.PROMPT_KEYS[k as PromptKey]);
  await appendLog(state, "reflection", `${reply.summary}${rewrote.length === 0 ? "" : `\n\nRewrote ${rewrote.join(", ")}.`}`);
}

/** Commits gameplay/ alone, under the lock so another coach's write is never half in it, and pushes. */
async function commit(state: loop.CoachState, notesFile: string | undefined) {
  const run = (cmd: string[], env?: Record<string, string>) => {
    const p = Bun.spawnSync(cmd, { cwd: loop.GAMEPLAY, stdout: "pipe", stderr: "pipe", env: { ...process.env, ...env } });
    return { ok: p.exitCode === 0, out: `${p.stdout.toString()}${p.stderr.toString()}`.trim() };
  };
  const lived = notesFile?.match(/lived-(\d+)-(\d+)/);
  const title = `docs(gameplay): the coach finishes loop ${state.loop}${lived === null || lived === undefined ? "" : `, its full run lived ${Number(lived[1])}:${lived[2]}`}`;
  const result = await loop.locked(async () => {
    run(["git", "add", "-A", "--", "."]);
    if (run(["git", "diff", "--cached", "--quiet", "--", "."]).ok) return undefined;
    let tried = run(["gai", "-m", title, "--only", "--", "."], { AI_COMITTER_NAME: COMMITTER });
    for (let attempt = 1; !tried.ok && tried.out.includes("index.lock") && attempt < 5; attempt++) {
      await Bun.sleep(2000);
      tried = run(["gai", "-m", title, "--only", "--", "."], { AI_COMITTER_NAME: COMMITTER });
    }
    return tried;
  });
  if (result === undefined) return;
  if (!result.ok) return console.error(`could not commit gameplay/: ${result.out}`);
  const pushed = run(["git", "push"]);
  if (!pushed.ok) console.error(`could not push: ${pushed.out}`);
  console.log(`committed: ${title}`);
}

// ---- Main --------------------------------------------------------------------------------------

const next = (await ladder()) + 1;
await loop.updateGyms((gyms) => {
  for (const g of standardGyms(next)) if (!gyms.some((x) => x.name === g.name)) gyms.push(g);
  // A build the loop was running when it stopped never finished.
  for (const g of gyms) if (g.status === "building") g.status = "pending";
});
let state = await loop.readCoachState();
for (let played = 0; played < LOOPS && !stopping; played++) {
  while (state.iteration <= EXPERIMENT_ITERATIONS && !stopping) {
    console.log(`== ${tagOf(state)}: experiments`);
    await experimentIteration(state);
    if (stopping) break;
    state = { ...state, iteration: state.iteration + 1 };
    await loop.writeCoachState(state);
  }
  if (stopping) break;
  console.log(`== ${tagOf(state)}: full run`);
  const notesFile = await fullRun(state);
  if (stopping) break;
  await reflect(state, notesFile);
  await commit(state, notesFile);
  state = { loop: state.loop + 1, iteration: 1 };
  await loop.writeCoachState(state);
}
await shutdown(0);
