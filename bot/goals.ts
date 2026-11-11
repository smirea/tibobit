// The planner sets goals, things to collect or places to explore for, by the ids it is shown.
// The page walks Tibo to the goal on its own while the way there costs no more than the safest
// move, by the game's own forecast. When it costs more, the action model picks the step, told
// only the goal and what each move costs. A goal ends when it is used up, reached, stuck or late.

import { knobs } from "./run-templates";
import { GIVE_UP_SECONDS, HURT_SECONDS, PLAN_RANGE } from "./limits";
import { onChest, plural, priceWords } from "./phrasing";
import { type ActionTag, type GoalResult, type Inspect, SPOT_TAGS } from "../protocol/pilot";
import type { Direction } from "../protocol/geometry";
import type { CommandStatus } from "../protocol/commands";
import { recentLoss, type World } from "./world";
import { say } from "./server";
import { RunLog } from "./run-log/writer";
import { goalCell, goalTitleCell, hurtLeaveCell, targetCell } from "./run-log/cells";

export type Goal = { kind: "chest" | "poi" | "food" | "elite"; uid: number } | { kind: "explore"; dir: Direction } | { kind: "evade" };

type TargetGoal = Extract<Goal, { uid: number }>;

export type Pursuit = {
  goal: Goal;
  id: string;
  title: string;
  /** What it is, for the icon on the panel's action tiles. */
  tag: ActionTag;
  /** The planner's decision that chose it, shown when its tiles are hovered. */
  decision: Inspect;
  since: number;
  deadline: number;
  /** The least work left so far (distance, plus seconds of charging as distance) and when. */
  best: { left: number; time: number };
  origin: { x: number; y: number };
  /** Health when the goal began, to say what it cost. */
  hp: number;
  /** Steps the action model took off the spot a goal needs Tibo to stand on. */
  steppedOff: number;
  /** Chests listed before the goal began; exploring ends on any other. */
  known: Set<string>;
  /** A target is only "used up" once it was seen: one missing from the start was never there. */
  seen: boolean;
  commandId?: number;
  /** The command now steering it, to send it again only when it changes or ends. */
  sent?: string;
};

/** Where a goal points now. `heading` is absent while evading, which always asks the action model. */
export type Course = { heading?: Direction | "stay"; left?: number; progress: string; to?: { pickup: number } | { poi: number } };

type Ended = { done: string; success: boolean };

type Outcome = { time: number; id: string; title: string; outcome: string; success: boolean };

const GOAL_SPEED = 45;

const GOAL_SLACK = 10;

export let pursuit: Pursuit | undefined;

export const outcomes: Outcome[] = [];

export const giveUps = new Map<string, number>();

// Every chest listed so far this run; exploring ends on one never listed before. Spots are not
// counted: the map is dense with them, and exploring stopped every second or two on a new one.
export const everListed = new Set<string>();

export function resetGoals() {
  pursuit = undefined;
  distrusted = undefined;
  outcomes.length = 0;
  giveUps.clear();
  everListed.clear();
}

export const goalId = (g: Goal): string => goalCell.encode(g);

type Located = { dist: number; dir: Direction | "still"; arrived: boolean; charging: number; progress: string; name: string };

export function locate(r: World, g: TargetGoal): Located | undefined {
  if (g.kind === "poi") {
    const p = r.spots.find((x) => x.id === g.uid);
    return p === undefined ? undefined : { dist: p.dist, dir: p.dir, arrived: p.inside, charging: p.chargeSeconds - p.charged, progress: `${p.charged} of ${p.chargeSeconds}s charged`, name: `the ${p.name}` };
  }
  if (g.kind === "chest") {
    const c = r.chests.find((x) => x.id === g.uid);
    return c === undefined
      ? undefined
      : { dist: c.dist, dir: c.dir, arrived: onChest(c), charging: c.chargeSeconds - c.charged, progress: `${c.charged} of ${c.chargeSeconds}s opened`, name: "the chest" };
  }
  if (g.kind === "elite") {
    const e = r.elites.find((x) => x.id === g.uid);
    return e === undefined ? undefined : { dist: e.dist, dir: e.dir, arrived: e.dist <= ELITE_REACH, charging: 0, progress: `${e.hp} health left, ${Math.round(e.dist)} away to the ${e.dir}`, name: `the ${e.name}` };
  }
  const f = r.food.find((x) => x.id === g.uid);
  return f === undefined ? undefined : { dist: f.dist, dir: f.dir, arrived: false, charging: 0, progress: "", name: "the food" };
}

// Close enough for most weapons to reach an elite; nearer, each step is the action model's.
export const ELITE_REACH = 70;

const TARGET_DONE = { chest: "opened", poi: "charged and used", food: "eaten", elite: "killed" } as const;

export function goalTitle(g: Goal, r: World): string {
  switch (g.kind) {
    case "chest":
      return "Open the chest";
    case "poi":
      return goalTitleCell.spot(r.spots.find((p) => p.id === g.uid)?.name ?? "spot");
    case "food":
      return "Eat the food";
    case "elite":
      return `Fight the ${r.elites.find((e) => e.id === g.uid)?.name ?? "elite"}`;
    case "explore":
      return `Explore ${g.dir}`;
    case "evade":
      return "Keep away from enemies";
  }
}

function goalTag(g: Goal, r: World): ActionTag {
  switch (g.kind) {
    case "chest":
      return "Loot";
    case "poi": {
      const kind = r.spots.find((p) => p.id === g.uid)?.type;
      return (kind === undefined ? undefined : SPOT_TAGS[kind]) ?? "Spot";
    }
    case "food":
      return "Eat";
    case "elite":
      return "Hunt";
    case "explore":
      return "Wander";
    case "evade":
      return "Run";
  }
}

export function aimAt(p: Pursuit, r: World): Course | Ended {
  const g = p.goal;
  const age = r.time - p.since;
  switch (g.kind) {
    case "chest":
    case "poi":
    case "food": {
      const t = locate(r, g);
      if (t === undefined) return p.seen ? { done: TARGET_DONE[g.kind], success: true } : { done: "it is not there", success: false };
      p.seen = true;
      return { heading: t.arrived || t.dir === "still" ? "stay" : t.dir, left: t.dist + t.charging * GOAL_SPEED, progress: t.arrived ? t.progress : `${Math.round(t.dist)} away to the ${t.dir}`, to: g.kind === "poi" ? { poi: g.uid } : { pickup: g.uid } };
    }
    case "elite": {
      const t = locate(r, g);
      // Elites are listed wherever they are, so one that is gone has died.
      if (t === undefined) return p.seen ? { done: TARGET_DONE.elite, success: true } : { done: "it is not there", success: false };
      p.seen = true;
      // Within reach the action model picks every step, as when evading: hold the elite there without touching it.
      return t.arrived || t.dir === "still" ? { progress: t.progress } : { heading: t.dir, left: t.dist, progress: t.progress };
    }
    case "explore": {
      const found = r.chests.find((c) => !p.known.has(goalId({ kind: "chest", uid: c.id })) && c.dist < PLAN_RANGE);
      if (found !== undefined) return { done: `found a chest ${Math.round(found.dist)} away to the ${found.dir}`, success: true };
      const walked = Math.hypot(r.x - p.origin.x, r.y - p.origin.y);
      if (walked >= knobs().exploreDistance) return { done: `walked ${knobs().exploreDistance} units and found nothing new`, success: true };
      return { heading: g.dir, left: knobs().exploreDistance - walked, progress: `${Math.round(walked)} of ${knobs().exploreDistance} walked` };
    }
    case "evade":
      if (age >= knobs().evadeSeconds) {
        const lost = Math.round(p.hp - r.hp);
        return { done: lost > 0 ? `the ${knobs().evadeSeconds} seconds ran out, and Tibo lost ${lost} health during them` : `kept clear for ${knobs().evadeSeconds} seconds without losing health`, success: true };
      }
      return { progress: `${Math.ceil(knobs().evadeSeconds - age)}s left` };
  }
}

/** What a goal is after, by the game's kind for a spot or an elite, and where it is now. */
function targetOf(goal: Goal, r: World): { kind: string; dist: number; dir: string } | undefined {
  if (!("uid" in goal)) return undefined;
  const at = locate(r, goal);
  const kind = goal.kind === "poi" ? r.spots.find((x) => x.id === goal.uid)?.type : goal.kind === "elite" ? r.elites.find((x) => x.id === goal.uid)?.type : goal.kind;
  return at === undefined || kind === undefined ? undefined : { kind, dist: at.dist, dir: at.dir };
}

function begin(goal: Goal, r: World, log: RunLog, decision: Inspect) {
  const title = goalTitle(goal, r);
  const target = targetOf(goal, r);
  const p: Pursuit = {
    goal,
    id: goalId(goal),
    title,
    tag: goalTag(goal, r),
    decision,
    since: r.time,
    deadline: r.time,
    best: { left: Number.POSITIVE_INFINITY, time: r.time },
    origin: { x: r.x, y: r.y },
    hp: r.hp,
    steppedOff: 0,
    known: new Set(everListed),
    seen: false,
  };
  const aim = aimAt(p, r);
  const seconds = goal.kind === "evade" ? knobs().evadeSeconds : goal.kind === "elite" ? knobs().eliteSeconds : "left" in aim && aim.left !== undefined ? aim.left / GOAL_SPEED : 0;
  p.deadline = r.time + seconds + GOAL_SLACK;
  pursuit = p;
  log.write(r, { event: "goal", goal: p.id, action: "start", detail: title, ...(target === undefined ? {} : { target: targetCell.encode(target) }) });
  say({ role: "action", model: "goal", time: r.time, text: title, tag: p.tag, detail: "done" in aim ? aim.done : aim.progress, inspect: decision });
}

const RESULT_WORDS: Record<GoalResult, string> = { done: "done", failed: "gave up", dropped: "dropped" };

export function finish(r: World, log: RunLog, outcome: string, result: GoalResult) {
  const p = pursuit;
  if (p === undefined) return;
  pursuit = undefined;
  outcomes.push({ time: r.time, id: p.id, title: p.title, outcome, success: result !== "failed" });
  if (outcomes.length > 30) outcomes.shift();
  if (result === "failed" && "uid" in p.goal) giveUps.set(p.id, r.time + GIVE_UP_SECONDS);
  log.write(r, { event: "goal", goal: p.id, action: result, detail: outcome });
  say({ role: "action", model: "goal", time: r.time, text: `${p.title}: ${RESULT_WORDS[result]}`, tag: p.tag, result, detail: `${outcome} · ${Math.round(r.time - p.since)}s`, inspect: p.decision });
}

/** The planner's goal takes over, unless it is the one already under way. */
export function setGoal(goal: Goal, r: World, log: RunLog, decision: Inspect) {
  if (pursuit?.id === goalId(goal)) return;
  if (pursuit !== undefined) finish(r, log, "the planner chose another goal", "dropped");
  begin(goal, r, log, decision);
}

/** Why the current goal ends now, if it does. */
export function ending(p: Pursuit, r: World, aim: Course | Ended, status: CommandStatus | undefined): Ended | undefined {
  if ("done" in aim) return aim;
  if (status?.command.type === "goto" && status.state === "done") return { done: TARGET_DONE[(p.goal as TargetGoal).kind], success: true };
  // A goto that runs out its time, and food collected on touch (gone before the goto counts it as
  // reached), end without saying how the goal went; the next step's look at the target tells.
  if (status?.state === "failed" && status.failure !== "timeout" && status.failure !== "targetGone") return { done: `the game said: ${status.detail ?? "failed"}`, success: false };
  if (r.time > p.deadline) return { done: `still not done after ${Math.round(r.time - p.since)} seconds`, success: false };
  const held = aim.heading === "stay" || (p.goal.kind === "elite" && aim.heading === undefined);
  const lost = recentLoss(r);
  if (held && knobs().holdAbortHurt > 0 && lost >= knobs().holdAbortHurt * r.maxHp) return { done: hurtLeaveCell.encode(lost, HURT_SECONDS), success: false };
  if (aim.left === undefined) return undefined;
  if (aim.left < p.best.left - 1) p.best = { left: aim.left, time: r.time };
  else if (r.time - p.best.time > knobs().stuckSeconds)
    return { done: stuckWords(p, r, aim), success: false };
  return undefined;
}

/** The forecast missed a hit on a free step; until `until`, every step asks the action model (knob distrustSeconds). */
export let distrusted: { until: number; lost: number; at: number } | undefined;

export function setDistrust(since: NonNullable<typeof distrusted>) {
  distrusted = since;
}

/** Why a goal stopped making progress, in the words the planner reads in its recent goals. */
function stuckWords(p: Pursuit, r: World, aim: Course): string {
  const seconds = knobs().stuckSeconds;
  const off = p.steppedOff === 0 ? "" : `; the action model stepped off it ${plural(p.steppedOff, "time")} to dodge`;
  if (aim.heading !== "stay") return `no closer for ${seconds} seconds${off}`;
  const spot = p.goal.kind === "poi" ? r.spots.find((x) => x.id === (p.goal as TargetGoal).uid) : undefined;
  return `standing on it charged nothing for ${seconds} seconds${spot === undefined ? "" : priceWords(spot, r)}${off}`;
}
