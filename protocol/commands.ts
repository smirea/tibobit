// What an agent can tell the page to do, and how the page reports on it.
import { type Direction, DIRECTIONS, type Heading } from "./geometry";
import { fail, num } from "./parse";

export type Target = { x: number; y: number } | { dx: number; dy: number } | { poi: number } | { pickup: number };

export type Command =
  /**
   * Hold a direction. Without `seconds` it holds until another movement command or `stop`.
   * `pause` (on move and goto) runs the game for this command only: it resumes a paused game
   * and pauses it again on the tick the command finishes, so a slow agent can play in lockstep.
   */
  | { type: "move"; dir: Heading; seconds?: number; pause?: boolean }
  /**
   * Walk to a point and optionally stand there. `within` is the arrival distance (default: half
   * the target's activation radius, or 6). `stay` holds still for that many seconds after
   * arriving, or until the point of interest or pickup is used up when it is "done". Chests,
   * items and most points of interest only open after standing on them for `chargeNeeded`.
   */
  | { type: "goto"; to: Target; within?: number; stay?: number | "done"; timeout?: number; pause?: boolean }
  | { type: "stop" }
  /** The game's own action on the open choice (a level-up, chest, shrine or shop), as the game's `choose` takes it. */
  | { type: "choose"; action: ChoiceAction }
  | { type: "dash"; dir?: Heading }
  | { type: "pause" }
  | { type: "resume" }
  /** Run the simulation `factor` ticks per frame (1 to 8). Movement input still applies to every tick. */
  | { type: "speed"; factor: number }
  /**
   * `live` keeps the snapshot's `forecast` coming while the game runs, a few times a second, for an
   * agent that does not pause between steps. Off, it only appears while the game is paused. `lag`
   * is the seconds between a snapshot and the agent's move landing: a running game's forecast first
   * plays the input held now for that long, then each direction. `seconds` is the horizon of both
   * the forecast and `surroundings` (0.1 to 2; 0.5 until set). `route` prices whole trips to a place
   * instead of single moves (see Routes): `stay` is how long Tibo must stand there for the trip to
   * be done (0 to 5 seconds; 0 until set), `seconds` the most of a trip that is played (0.5 to 6; 4
   * until set) and `leg` how long its first move is held (0.1 to 2; 0.5 until set). A forecast
   * command without `route` goes back to single moves.
   */
  | { type: "forecast"; live: boolean; lag?: number; seconds?: number; route?: { to: Target; stay?: number; seconds?: number; leg?: number } }
  /**
   * From the title screen, the end screen or mid-run, start a new run. `mode` "daily" plays
   * today's Daily, which has the same seed and build for everyone, so runs are comparable. The
   * new run waits paused at tick 0; use `resume` or a `move`/`goto` with `pause` to play it.
   * `difficulty` "highest" picks the hardest the game allows, up through the unlocked Nightmare
   * levels. The finished command's `detail` names what was picked, such as "nightmare-3".
   * `weapon` picks the starting weapon by id (Random when left out); a weapon the game does not
   * offer fails the command with the ids it does offer.
   */
  | { type: "start"; mode?: GameMode; difficulty?: "easy" | "normal" | "hard" | "nightmare" | "highest"; weapon?: string }
  /** After a run ends, step forward through the end screens to the run summary, which puts the run's share link in `lastRunLink`. */
  | { type: "summary" }
  /**
   * Reloads the game page so that its Open World runs play this seed, as shown in a run's `seed`.
   * The command finishes before the reload; the page reconnects a few seconds later on the title
   * screen. The first run after it plays the seed as it was first played in a fresh page; each later
   * run in the same page is a new attempt on it, a different world.
   */
  | { type: "seed"; seed: string }
  /**
   * Saves the whole run as it is now under `name` (the agent server keeps it in
   * .runs/checkpoints), or loads one into the run in progress, which then waits paused as a new run
   * does. Only a page on the same game build can load it. A loaded run is tainted: the game posts it
   * nowhere and never counts it as a win. `drop` forgets the page's copy, so the next load reads the
   * server's file.
   */
  | { type: "checkpoint"; op: "save" | "load" | "drop"; name: string }
  /**
   * Replaces every weapon, passive and item of the run in progress, applied level by level as
   * level-ups would. Shrine and curse bonuses stay. `hp` "full" heals to the new maximum. Taints
   * the run, as a checkpoint load does.
   */
  | ({ type: "loadout" } & LoadoutSpec);

/** The actions the game's `choose` accepts, as its run recorder logs them. */
export const CHOICE_ACTIONS = ["pick", "banish", "buy", "reroll", "skip", "close", "accept", "continue", "endRun"] as const;
export type ChoiceAction = { type: "pick" | "banish" | "buy"; index: number } | { type: "reroll" | "skip" | "close" | "accept" | "continue" | "endRun" };

export type LoadoutSpec = {
  weapons: { id: string; level: number }[];
  passives: { id: string; level: number }[];
  items: { id: string; count: number }[];
  gold?: number;
  hp?: number | "full";
};

/** What a checkpoint holds, readable without loading it. `build` is the game's sim chunk, which must match to load it. */
export type CheckpointMeta = {
  name: string;
  build: string;
  seed: string;
  mode: string;
  difficulty: string;
  time: number;
  level: number;
  hp: number;
  weapons: string[];
  passives: string[];
  items: string[];
  savedAt: string;
};

export const CHECKPOINT_NAME = /^[\w.@-]{1,100}$/;
const SEED = /^[0-9A-Z]{1,7}$/;

export type CommandState = "running" | "done" | "failed" | "replaced";
export type CommandStatus = { id: number; command: Command; state: CommandState; detail?: string; at: number };

export type Envelope = { id: number; command: Command };

export type GameMode = "openWorld" | "daily";

function heading(v: unknown, what: string): Heading {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && (DIRECTIONS as readonly string[]).includes(v)) return v as Direction;
  return fail(`${what} must be one of ${DIRECTIONS.join(", ")} or degrees`);
}

function route(v: unknown): { to: Target; stay?: number; seconds?: number; leg?: number } {
  const r = (v ?? {}) as Record<string, unknown>;
  if (r.stay !== undefined && (num(r.stay, "route.stay") < 0 || num(r.stay, "route.stay") > 5)) fail("route.stay must be from 0 to 5 seconds");
  if (r.seconds !== undefined && (num(r.seconds, "route.seconds") < 0.5 || num(r.seconds, "route.seconds") > 6)) fail("route.seconds must be from 0.5 to 6");
  if (r.leg !== undefined && (num(r.leg, "route.leg") < 0.1 || num(r.leg, "route.leg") > 2)) fail("route.leg must be from 0.1 to 2");
  return { to: target(r.to), ...(r.stay === undefined ? {} : { stay: num(r.stay, "route.stay") }), ...(r.seconds === undefined ? {} : { seconds: num(r.seconds, "route.seconds") }), ...(r.leg === undefined ? {} : { leg: num(r.leg, "route.leg") }) };
}

function target(v: unknown): Target {
  const t = (v ?? {}) as Record<string, unknown>;
  if ("poi" in t) return { poi: num(t.poi, "to.poi") };
  if ("pickup" in t) return { pickup: num(t.pickup, "to.pickup") };
  if ("dx" in t || "dy" in t) return { dx: num(t.dx, "to.dx"), dy: num(t.dy, "to.dy") };
  if ("x" in t || "y" in t) return { x: num(t.x, "to.x"), y: num(t.y, "to.y") };
  return fail("to must be {x,y}, {dx,dy}, {poi} or {pickup}");
}

function leveled(v: unknown, what: string, field: "level" | "count"): { id: string; level: number }[] {
  if (v === undefined) return [];
  if (!Array.isArray(v)) return fail(`${what} must be a list of {id, ${field}}`);
  return v.map((x: Record<string, unknown>, i) => {
    if (typeof x?.id !== "string") fail(`${what}[${i}].id must be an id`);
    const n = x[field] === undefined ? 1 : num(x[field], `${what}[${i}].${field}`);
    if (!Number.isInteger(n) || n < 1) fail(`${what}[${i}].${field} must be a whole number from 1`);
    return { id: x.id as string, level: n };
  });
}

/** Validates a loadout; ids and levels are checked against the game's content when it is applied. */
export function parseLoadout(c: Record<string, unknown>): LoadoutSpec {
  const hp = c.hp === undefined || c.hp === "full" ? c.hp : num(c.hp, "hp");
  return {
    weapons: leveled(c.weapons, "weapons", "level"),
    passives: leveled(c.passives, "passives", "level"),
    items: leveled(c.items, "items", "count").map(({ id, level }) => ({ id, count: level })),
    ...(c.gold === undefined ? {} : { gold: num(c.gold, "gold") }),
    ...(hp === undefined ? {} : { hp }),
  };
}

/** Validates untrusted JSON into a Command; throws with a message an agent can act on. */
export function parseCommand(input: unknown): Command {
  const c = (input ?? {}) as Record<string, unknown>;
  switch (c.type) {
    case "move":
      return {
        type: "move",
        dir: heading(c.dir, "dir"),
        ...(c.seconds === undefined ? {} : { seconds: num(c.seconds, "seconds") }),
        ...(c.pause === true ? { pause: true } : {}),
      };
    case "goto": {
      const stay = c.stay === undefined || c.stay === "done" ? c.stay : num(c.stay, "stay");
      const to = target(c.to);
      if (stay === "done" && !("poi" in to) && !("pickup" in to)) fail('stay "done" needs a {poi} or {pickup} target');
      return {
        type: "goto",
        to,
        ...(c.within === undefined ? {} : { within: num(c.within, "within") }),
        ...(stay === undefined ? {} : { stay }),
        ...(c.timeout === undefined ? {} : { timeout: num(c.timeout, "timeout") }),
        ...(c.pause === true ? { pause: true } : {}),
      };
    }
    case "choose": {
      const a = (c.action ?? {}) as Record<string, unknown>;
      if (!(CHOICE_ACTIONS as readonly unknown[]).includes(a.type)) fail(`action.type must be one of ${CHOICE_ACTIONS.join(", ")}`);
      const type = a.type as ChoiceAction["type"];
      return type === "pick" || type === "banish" || type === "buy" ? { type: "choose", action: { type, index: num(a.index, "action.index") } } : { type: "choose", action: { type } };
    }
    case "speed": {
      const factor = num(c.factor, "factor");
      if (!Number.isInteger(factor) || factor < 1 || factor > 8) fail("factor must be a whole number from 1 to 8");
      return { type: "speed", factor };
    }
    case "forecast":
      if (typeof c.live !== "boolean") fail("live must be true or false");
      if (c.lag !== undefined && (num(c.lag, "lag") < 0 || num(c.lag, "lag") > 1)) fail("lag must be from 0 to 1 seconds");
      if (c.seconds !== undefined && (num(c.seconds, "seconds") < 0.1 || num(c.seconds, "seconds") > 2)) fail("seconds must be from 0.1 to 2");
      return {
        type: "forecast",
        live: c.live as boolean,
        ...(c.lag === undefined ? {} : { lag: num(c.lag, "lag") }),
        ...(c.seconds === undefined ? {} : { seconds: num(c.seconds, "seconds") }),
        ...(c.route === undefined ? {} : { route: route(c.route) }),
      };
    case "dash":
      return c.dir === undefined ? { type: "dash" } : { type: "dash", dir: heading(c.dir, "dir") };
    case "start": {
      const d = c.difficulty;
      if (d !== undefined && d !== "easy" && d !== "normal" && d !== "hard" && d !== "nightmare" && d !== "highest") fail("difficulty must be easy, normal, hard, nightmare or highest");
      const m = c.mode;
      if (m !== undefined && m !== "openWorld" && m !== "daily") fail("mode must be openWorld or daily");
      const w = c.weapon;
      if (w !== undefined && (typeof w !== "string" || !/^[a-z0-9-]+$/.test(w))) fail("weapon must be a weapon id such as deep-fryer");
      return { type: "start", ...(m === undefined ? {} : { mode: m }), ...(d === undefined ? {} : { difficulty: d }), ...(w === undefined ? {} : { weapon: w }) };
    }
    case "stop":
    case "pause":
    case "resume":
    case "summary":
      return { type: c.type };
    case "seed": {
      const seed = typeof c.seed === "string" ? c.seed.toUpperCase() : "";
      if (!SEED.test(seed) || parseInt(seed, 36) > 0xffffffff) fail("seed must be a run seed such as 1SXG9XB");
      return { type: "seed", seed };
    }
    case "checkpoint": {
      if (c.op !== "save" && c.op !== "load" && c.op !== "drop") fail("op must be save, load or drop");
      if (typeof c.name !== "string" || !CHECKPOINT_NAME.test(c.name)) fail("name must be letters, digits, _ . @ or -");
      return { type: "checkpoint", op: c.op, name: c.name };
    }
    case "loadout":
      return { type: "loadout", ...parseLoadout(c) };
    default:
      return fail("type must be move, goto, stop, choose, dash, pause, resume, speed, forecast, start, summary, seed, checkpoint or loadout");
  }
}
