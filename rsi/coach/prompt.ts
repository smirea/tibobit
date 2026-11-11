import path from "node:path";
import { totalsLines } from "../../bot/tallies";
import { campaign, latestNotes } from "../store/campaign";
import { coachSpec } from "../flags";
import { BOOK, IDS, ladder, LOGS, main, OFFERED } from "../session";
import { coverage, readExperiments, renderExperiment } from "../store/experiments";
import { heldCoverage, readHeld } from "../store/held";
import { BELIEFS_CSV, COACH_LOG, INFRA_CSV } from "../store/paths";
import type { GameResult, Start } from "../training/slots";
import { EXPERIMENT_ITERATIONS, GOAL_LEVEL, MAX_GAME_SECONDS, MAX_GAMES, MAX_GYM_SECONDS, MAX_NEW_GYMS } from "../rules";
import type { Playbook } from "../../bot/playbook";
import { BLOCKS, KNOBS, QUESTION_LIMIT, SLOTS, STATE_LIMIT, type TemplateSlot } from "../../bot/templates";
import { type Gym, gymLine, readGyms } from "../store/gyms";
import { GIVE_UP_SECONDS, PLAN_RANGE } from "../../bot/limits";
import type { CoachState } from "../store/coach-log";
import { clockPadded } from "../../format";
import { JEV } from "../../bot/args";
export function editableFiles(phase: "experiments" | "fullRun" | "reflect"): string {
  return [
    "# What you can change",
    "",
    `Everything lives in gameplay/, and you change it through keys in your JSON reply (see Reply at the end). Anything you leave out stays as it is. Your prompts are coach.md, your log is coach-log.md and your playbook is playbook.json.`,
    "",
    "- **beliefs.csv** (`beliefs`): what the loop holds true, each marked good (worth doing), bad (worth avoiding) or fact. Rows are never deleted, only disproved.",
    "- **experiments/** (`experiments`): one file per question, experiment_<name>.md. The loop writes every game played for an experiment into its file.",
    phase === "fullRun"
      ? "- **your playbook**: settled by the rehearsal above; the full run plays it, and it changes only in an experiment iteration or the reflection, on evidence."
      : "- **your playbook** (`playbook`): the templates the planner and the action model play with, their knobs, and the starting weapon. Training games play it with each game's changes; the full run plays it as it stands. It changes only on evidence: confirmed experiments with games from 0:00 on fresh seeds.",
    ...(phase === "experiments"
      ? ["- **games** (`games`): up to 5 training games this iteration, played side by side.", "- **gyms.jsonl** (`gyms`): saved game states to build or retire."]
      : phase === "reflect"
        ? ["- **the full run's notes** (`review`): your review, written into the notes file.", "- **your prompts** (`prompts`): the three parts of coach.md (# Experiments, # Full run, # Reflect), which you rewrite from what this loop taught you about how you work.", "- **gyms.jsonl** (`gyms`)."]
        : []),
    "- **infrastructure_feedback.csv** (`infra`): requests for changes to the bot's code, which you cannot make. People read them and answer in the status column.",
    "",
    "You cannot change which models play (you, the planner and the action model) or the bot's code.",
  ].join("\n");
}

export const GAMES_CONTRACT = `"games": 1 to ${MAX_GAMES} training games, played side by side, each {"experiment": the name of the experiment it serves (one that exists or that this reply adds), "label": a few words, "from": {"gym": a gym's name} or {"fresh": {"difficulty": Nightmare level 1 to ${GOAL_LEVEL}, "weapon": a base weapon id or "random", "seed": optional, to give several fresh games the same map}}, "loadout": optional, replaces the whole build when the game starts: {"weapons": [{"id", "level"}], "passives": [{"id", "level"}], "items": [{"id", "count"}], "gold", "hp": a number or "full"} with ids from the encyclopedia, "seconds": 10 to ${MAX_GAME_SECONDS} of game time, "changes": optional {"planner", "action", "knobs"} over your playbook (only the keys that change), "saveGym": optional {"name", "purpose"} to keep the state the game ends in as a gym, if Tibo lives}. A game from a gym replays the same game state each time, so two games from one gym differ only in what the models chose; fresh games with the same seed share a map. Fresh games never get the evaluation seed.`;

export const GYMS_CONTRACT = `"gyms": gyms to build or retire: {"name": kebab-case, "purpose": what it lets you test, "difficulty": 1 to ${GOAL_LEVEL}, "at": game seconds 0 to ${MAX_GYM_SECONDS} to save it at, "weapon": a base weapon id or "random", "loadout": optional, swapped in at 0:00} is built before this iteration's games by playing a fresh game with your playbook to that time, in 5-minute stages: a death replays that stage from its start, up to 3 times (a loadout helps for late gyms), at most ${MAX_NEW_GYMS} per reply; {"name", "retire": true} retires one.`;

export const PLAYBOOK_CONTRACT = `"playbook": optional changes to your playbook: {"planner", "action", "knobs"} (only the keys that change), "weapon": a base weapon id or "random", "why": what makes this better than the playbook it replaces, "evidence": the names of the experiments that show it}. A change goes in only on evidence: every experiment named must have the result confirmed (in this reply or before) and games from 0:00 on fresh seeds, so the change beat the playbook where every run starts. Before the full run the loop plays the last full run's playbook against yours on the same fresh seeds, and keeps the old one if yours does worse.`;


export type LastGames = { tag: string; results: GameResult[]; gyms: string[] };

async function lastGames(): Promise<LastGames | undefined> {
  const f = Bun.file(path.join(LOGS, "last-games.json"));
  return (await f.exists()) ? ((await f.json()) as LastGames) : undefined;
}

const describeStart = (from: Start, gyms: Gym[]) => {
  if ("gym" in from) {
    const name = from.gym;
    const g = gyms.find((x) => x.name === name);
    return `gym ${from.gym}${g === undefined ? "" : ` (Nightmare ${g.difficulty} at ${clockPadded(g.at)})`}`;
  }
  return `a fresh game on Nightmare ${from.fresh.difficulty}${from.fresh.weapon === "" ? "" : ` with ${from.fresh.weapon}`}`;
};

export function outcome(r: GameResult): string {
  if (r.error !== undefined) return `not played: ${r.error}`;
  const t = r.result;
  if (t === undefined) return "no result";
  const taken = Object.values(t.damageTaken).reduce((a, b) => a + b, 0);
  const top = Object.entries(t.damageTaken).slice(0, 4).map(([k, v]) => `${k} ${v}`).join(", ");
  return `${t.died ? `died after ${t.survived}s (game clock ${clockPadded(t.end)})` : `alive after ${t.survived}s (game clock ${clockPadded(t.end)}), health ${t.hp.end}/${t.hp.max}`}; damage taken ${Math.round(taken)}${top === "" ? "" : ` (${top})`}; ${t.kills} kills; level ${t.level.start} to ${t.level.end}${t.plannerCalls === undefined ? "" : `; planner asked ${t.plannerCalls} times, action model ${t.actionCalls ?? 0}`}${t.snapshotAgeMs === undefined ? "" : `; the models saw the game ${t.snapshotAgeMs.p50} ms late (p90 ${t.snapshotAgeMs.p90})`}; ended with ${[...t.weapons, ...t.passives].join(", ") || "nothing"}${r.savedGym === undefined ? "" : `; saved as gym ${r.spec.saveGym?.name}`}`;
}

export function gameEntry(r: GameResult, gyms: Gym[], full: boolean): string {
  const s = r.spec;
  return [
    `### ${s.id}: ${s.label}`,
    "",
    `- Start: ${describeStart(s.from, gyms)}, seed ${r.seed || "?"}${s.loadout === undefined ? "" : `, build swapped for ${[...s.loadout.weapons.map((w) => `${w.id} ${w.level}`), ...s.loadout.passives.map((p) => `${p.id} ${p.level}`), ...s.loadout.items.map((x) => `${x.id} x${x.count}`)].join(", ")}`}; ${s.seconds}s; plays the playbook${s.changes === "" ? "" : ` with ${s.changes}`}.`,
    `- Outcome: ${outcome(r)}.`,
    ...(r.result?.totals === undefined ? [] : totalsLines(r.result.totals).map((l) => `- ${l}`)),
    ...(full && r.stats !== undefined ? ["", r.stats] : []),
  ].join("\n");
}

export async function facts(state: CoachState, playbook: Playbook): Promise<string> {
  const experiments = await readExperiments();
  const gyms = await readGyms();
  const last = await lastGames();
  const log = await Bun.file(COACH_LOG).text().catch(() => "");
  const cleared = await ladder();
  const open = experiments.filter((e) => e.status !== "done" && e.status !== "retired");
  const closed = experiments.filter((e) => e.status === "done" || e.status === "retired");
  return [
    "# Where the loop stands",
    `You are the coach (${coachSpec}). This is loop ${state.loop}, iteration ${state.iteration} of 10: iterations 1 to ${EXPERIMENT_ITERATIONS} are experiments in the training ground, and iteration 10 is a full run on the evaluation seed. Your Open World Nightmare ladder: ${cleared === 0 ? "no level won yet" : `won up to Nightmare ${cleared}`}, so the next full run plays Nightmare ${cleared + 1}. The goal of the whole campaign: survive 20:00 on Nightmare 10.`,
    "## Full runs so far",
    await campaign(),
    "# Facts",
    "## The game and the bot",
    botFacts({ planner: JEV.model, action: JEV.model }),
    "## Templates, state blocks and knobs",
    catalog(),
    "## Your playbook",
    `Updated ${playbook.updated}: ${playbook.why}. Starting weapon: ${playbook.weapon || "random"}. The full run can start with ${OFFERED.join(", ")} (more unlock as the profile plays); a training game can start with any base weapon.`,
    JSON.stringify(playbook.templates, null, 2),
    "## Beliefs (gameplay/beliefs.csv)",
    await Bun.file(BELIEFS_CSV).text(),
    "## Weapons and passives: what games have held (gameplay/held.json)",
    heldCoverage(await readHeld(), IDS),
    "## Experiments: coverage by area",
    coverage(experiments),
    "## Open experiments",
    open.map((e) => renderExperiment(e)).join("\n\n---\n\n") || "(none)",
    "## Finished experiments",
    closed.map((e) => `- ${e.name} (${e.status}${e.result === "" ? "" : `, ${e.result}`}, ${e.area}): ${e.title}. ${e.findings.split("\n")[0] ?? ""}`).join("\n") || "(none)",
    "## Gyms (gameplay/gyms.jsonl)",
    gyms.map(gymLine).join("\n") || "(none)",
    "## Your log, newest last",
    log.length > 40_000 ? `(older entries cut)\n${log.slice(-40_000)}` : log || "(empty)",
    "## The last iteration's games",
    last === undefined ? "(none yet)" : [`From ${last.tag}.`, ...last.gyms, ...last.results.map((r) => gameEntry(r, gyms, true))].join("\n\n"),
    "## The latest full run",
    await latestNotes(1),
    "## Infrastructure requests (gameplay/infrastructure_feedback.csv)",
    await Bun.file(INFRA_CSV).text(),
    "## The game's encyclopedia: every id you can use",
    JSON.stringify(BOOK),
    "## The game's cfg: the rules of the last game the full-run tab played (game.cfg in the state)",
    JSON.stringify((await main.state("cfg")).game?.cfg ?? "no game has been played in the full-run tab yet"),
  ].join("\n\n");
}

function catalog(): string {
  const slots = (Object.entries(SLOTS) as [TemplateSlot, (typeof SLOTS)[TemplateSlot]][]).map(
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

/** How the game and the bot work. Only code changes this; the coach asks through infrastructure requests. */
function botFacts(models: { planner: string; action: string }): string {
  return [
    "tibo.dog is a survivors-like game. Weapons fire on their own; the player only walks, dashes, and picks level-up upgrades, chest rewards and shrine options. Tibo has 6 weapon and 6 passive slots. A base weapon at max level plus its catalyst (a passive or an item) evolves at the next chest; evolved weapons are much stronger, and two evolved weapons can sometimes fuse into a union.",
    `Two in-game models play, and which models they are is fixed: the planner (${models.planner}) and the action model (${models.action}). They are small, fast decision models that never write text. Each call sends one state text and a set of questions, all answered against that state: a yes/no question answered as a probability from 0 to 1 (noul), a score on a named scale, or a choice among keys. The templates are that state text and those questions.`,
    "The planner is asked when the game starts, when a goal ends, at every level-up, chest and shrine choice, right after a card is taken, when a boss first appears, and every planEvery seconds while a goal is under way. Each time it rates every goal option with planner.goal, and the highest-rated becomes Tibo's goal. At a choice it also picks a card with planner.pick; a choice with one card it can take is taken without asking.",
    `The goal options the bot offers: up to 4 chests within ${PLAN_RANGE} units (stand on one for its charge time to open it: a free pick, and it evolves whatever recipe is ready); up to 6 spots that charge, such as shrines, each with the game's description; up to 2 food pickups, which heal; up to 2 elites within range to fight until they die (eliteSeconds at most; elites drop chests); exploring each of the 8 directions for exploreDistance units, stopping at the first chest never listed before; and evading enemies for evadeSeconds. Chests are not laid out on the map: bosses and elites drop them when they die (extra elites and bosses, such as a curse adds, drop none), and a dropped chest stays until it is opened. A target Tibo gave up on carries that note for ${GIVE_UP_SECONDS} seconds. A goal ends when its target is used up, after stuckSeconds without getting closer or charging, or well past the time the walk should take.`,
    "Every game plays live, as a person plays it: the game never pauses while the models think (only a level-up, chest or shrine choice stops it). Lockstep, which paused it, is banned as a crutch. Every step (about 0.2 to 0.3 seconds) the game's own simulation forecasts each of the 8 directions and standing still forecastSeconds ahead; live, it first plays the held move for the time the decision takes. While the way to the goal costs no more than the cheapest move plus extraDamage, the page walks Tibo there without asking a model. Otherwise the action model is asked action.hurt and action.useful about every move that does not cost more than that; the moves rated about as safe as the safest (within safeMargin, and below the middle of the scale) compete on usefulness, and the most useful wins. With a dash charge and an enemy or bullet close, action.dash decides whether Tibo dashes that way.",
    "Winning means surviving to 20:00; the game goes on after that until Tibo dies. In Open World on Nightmare, winning at Nightmare level N unlocks level N+1, and a full run starts the highest level unlocked, so the ladder climbs one level per win and never drops. Every Nightmare level makes pests and bosses tougher; on every level they start at 40% of their health and grow to full by 8:00, so the opening minutes are the cheapest. A run that passes 20:00 also drops gear, which the bot cannot equip yet.",
  ].join("\n\n");
}
