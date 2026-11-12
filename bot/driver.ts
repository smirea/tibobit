// Full Self Driving's function at the wheel: four times a second it is called with the game as
// protocol/driver.ts describes it, and the action it returns becomes Tibo's goal, which the
// autopilot then walks.
import type { Action, Direction, Pickup, State } from "../protocol/driver";
import type { Inspect } from "../protocol/pilot";
import { renderBlocks } from "./blocks";
import { giveUps, type Goal, goalId, setGoal } from "./goals";
import type { RunLog } from "./run-log/writer";
import { drive, say, showState } from "./server";
import { recentLoss, type World } from "./world";

/** How often the panel is shown the state while the action stays the same, and the least time between two lines in its chat, in game seconds. */
const SHOW_EVERY = 1;

type DriveFunction = (state: State) => Action;

/** The function from its source, which the agent server type-checked before it took the drive. */
function compile(code: string): DriveFunction {
  const js = new Bun.Transpiler({ loader: "ts" }).transformSync(code);
  return new Function(`${js}\nreturn drive;`)() as DriveFunction;
}

/** A point of interest's kind as the function reads it: the game's own kind, and for a variety place its own id (the live view spells it with dashes). */
const poiKind = (type: string) => type.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

export function driveState(r: World, previous: State["previous"]): State {
  const t = r.view.tibo;
  const w = r.view.world;
  const placed = (goal: Goal & { uid: number }, x: { dist: number; dir: Direction | "still" }) => ({ id: goal.uid, dist: Math.round(x.dist), dir: x.dir, gaveUp: (giveUps.get(goalId(goal)) ?? 0) > r.time });
  const fighter = (x: World["elites"][number]) => ({ ...placed({ kind: "elite", uid: x.id }, x), kind: x.type, name: x.name, hp: Math.round(x.hp), maxHp: Math.round(x.maxHp) });
  const crowd = [...r.sectors].sort((a, z) => a.enemies - z.enemies);
  const [fewest, most] = [crowd[0], crowd.at(-1)];
  if (fewest === undefined || most === undefined) throw new Error("the game listed no directions");
  const byDirection = (count: (s: World["sectors"][number]) => number) => Object.fromEntries(r.sectors.map((s) => [s.dir, count(s)])) as Record<Direction, number>;
  const pickups: Pickup[] = [
    ...r.chests.map((x) => ({ ...placed({ kind: "chest", uid: x.id }, x), kind: x.type as "chest" | "goldChest", charged: x.charged, chargeSeconds: x.chargeSeconds })),
    ...r.food.map((x) => ({ ...placed({ kind: "food", uid: x.id }, x), kind: "heal" as const })),
    ...r.pickups.map((x) => ({ ...placed({ kind: "pickup", uid: x.id }, x), kind: x.type as Pickup["kind"] })),
  ];
  return {
    time: Math.round(r.time * 10) / 10,
    winAt: w.winAt,
    tibo: {
      hp: Math.round(r.hp),
      maxHp: Math.round(r.maxHp),
      hurt: Math.round(recentLoss(r)),
      dps: Math.round(r.dps),
      level: t.level.level,
      gold: t.gold,
      x: Math.round(r.x),
      y: Math.round(r.y),
      dash: { charges: t.dash.charges, max: t.dash.max },
      weapons: r.weapons.map(({ id, name, level, max }) => ({ id, name, level, max })),
      passives: r.passives.map(({ id, name, level, max }) => ({ id, name, level, max })),
      items: r.items.map(({ id, name, count }) => ({ id, name, count })),
      evolves: t.evolves,
      stats: t.stats,
    },
    enemies: { onScreen: w.enemiesOnScreen, byDirection: byDirection((s) => s.enemies), fewest: fewest.dir, most: most.dir, bullets: byDirection((s) => s.bullets) },
    elites: r.elites.map(fighter),
    bosses: r.bosses.map(fighter),
    pickups: pickups.sort((a, z) => a.dist - z.dist),
    // Only the ones that charge by standing in them: the autopilot has no other way to use one.
    pois: r.spots.filter((x) => x.chargeSeconds > 0).map((x) => ({ ...placed({ kind: "poi", uid: x.id }, x), kind: poiKind(x.type), name: x.name, inside: x.inside, charged: x.charged, chargeSeconds: x.chargeSeconds })),
    ground: { xp: Math.round(w.ground.xp), gold: Math.round(w.ground.gold) },
    prices: { crate: w.prices.crate, slots: w.prices.slots },
    boosts: w.boosts,
    upcoming: w.upcoming,
    previous,
  };
}

/** The goal an action asks for, or undefined when what it names is not there. */
function goalFor(action: Action, r: World): Goal | undefined {
  const has = (things: { id: number }[], id: number) => things.some((x) => x.id === id);
  switch (action.type) {
    case "pickup":
      if (has(r.chests, action.id)) return { kind: "chest", uid: action.id };
      if (has(r.food, action.id)) return { kind: "food", uid: action.id };
      return has(r.pickups, action.id) ? { kind: "pickup", uid: action.id } : undefined;
    case "poi":
      return has(r.spots, action.id) ? { kind: "poi", uid: action.id } : undefined;
    case "elite":
      return has(r.elites, action.id) ? { kind: "elite", uid: action.id } : undefined;
    case "move":
      return { kind: "explore", dir: action.dir };
    case "dash":
      return r.view.tibo.dash.charges > 0 ? { kind: "dash", dir: action.dir } : { kind: "explore", dir: action.dir };
    case "still":
      return { kind: "still" };
    default:
      throw new Error(`drive returned ${JSON.stringify(action)}, which is not an action`);
  }
}

export class Driver {
  private fn: DriveFunction | undefined;
  /** The source `fn` was made from, to tell when the panel sends another. */
  private source = "";
  private previous: { action: Action; key: string; since: number } | undefined;
  /** Why the last call gave no action, if it threw. */
  private problem: string | undefined;
  private shownAt = Number.NEGATIVE_INFINITY;
  private said: { text: string; at: number } | undefined;
  private how: Inspect = { kind: "state", state: "", about: "" };

  private compiled(): DriveFunction {
    if (drive === undefined) throw new Error("Full Self Driving has no function to run");
    if (this.fn !== undefined && drive.code === this.source) return this.fn;
    this.fn = compile(drive.code);
    this.source = drive.code;
    this.previous = undefined;
    return this.fn;
  }

  /** One step of the game: the function reads it, and what it returns sets Tibo's goal. */
  step(r: World, log: RunLog) {
    const fn = this.compiled();
    const state = driveState(r, this.previous === undefined ? null : { action: this.previous.action, seconds: Math.round((r.time - this.previous.since) * 10) / 10 });
    let action: Action;
    try {
      action = fn(state);
      goalFor(action, r);
      this.problem = undefined;
    } catch (e) {
      // A function that throws must not stop the run: Tibo stands still, and the panel says why.
      this.problem = e instanceof Error ? e.message : String(e);
      action = { type: "still", why: `drive threw: ${this.problem}` };
    }
    const key = JSON.stringify(action);
    const changed = key !== this.previous?.key;
    if (changed) this.previous = { action, key, since: r.time };
    const text = action.why ?? key;
    if (text !== this.said?.text && r.time - (this.said?.at ?? Number.NEGATIVE_INFINITY) >= SHOW_EVERY) {
      this.said = { text, at: r.time };
      this.how = { kind: "state", state: text, about: JSON.stringify(action, null, 2) };
      say({ role: "planner", model: "code", time: r.time, text, detail: key, inspect: this.how });
      log.write(r, { event: "plan", model: "code", reason: text, action: key });
    }
    if (changed || r.time - this.shownAt >= SHOW_EVERY) this.show(r, state);
    this.direct(r, log);
  }

  /** Gives Tibo the goal the last action asks for; standing still when what it names is gone. */
  direct(r: World, log: RunLog) {
    const action = this.previous?.action ?? { type: "still" };
    setGoal(goalFor(action, r) ?? { kind: "still" }, r, log, this.how, "drive returned another action");
  }

  /** Tells the panel what the function reads now and what it returned. */
  show(r: World, state = driveState(r, null)) {
    this.shownAt = r.time;
    showState({ time: r.time, state, ...(this.previous === undefined ? {} : { action: this.previous.action }), ...(this.problem === undefined ? {} : { error: this.problem }), blocks: renderBlocks(r) });
  }
}
