// The contract between the userscript, the local server and agents. World units: +x is right,
// +y is down, and the player walks about 62 units per second at base speed.

export const BRIDGE_PORT = 7357;
export const bridgeOrigin = (port: number) => `http://127.0.0.1:${port}`;
export const BRIDGE_ORIGIN = bridgeOrigin(BRIDGE_PORT);

export function validPort(port: number): boolean {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
}

export const DIRECTIONS = ["right", "down-right", "down", "down-left", "left", "up-left", "up", "up-right"] as const;

export type Direction = (typeof DIRECTIONS)[number];

/** Compass bearing in degrees: 0 is right, 90 is down. */
export type Heading = Direction | number;

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
   * the forecast and `surroundings` (0.1 to 2; 0.5 until set).
   */
  | { type: "forecast"; live: boolean; lag?: number; seconds?: number }
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

/**
 * What the game's own simulation, run forward on a copy of the state, says each move would cost:
 * the eight directions and standing still, held for `seconds` after the agent's `lag`. `bySource`
 * uses the game's damage-by-source keys. This is a tool's output, not game state.
 */
export type Forecast = { lag: number; seconds: number; moves: Record<Direction | "still", { damage: number; dead: boolean; bySource: Record<string, number> }> };

/** Where something is from Tibo, in world units. */
export type Bearing = { dist: number; dir: Direction };

/**
 * What is around Tibo, worked out from the game state so an agent need not read every enemy, bullet
 * and hazard (the snapshot's `raw` groups). A tool's output, not game state. `seconds` is the
 * horizon, the same as the forecast's.
 */
export type Surroundings = {
  seconds: number;
  /** Damage taken in the last 3 seconds, by the game's damage source keys. */
  hurtBy: Record<string, number>;
  /** Enemies inside the game's camera view, in all and by direction from Tibo, and those within 60 units of him. */
  enemies: { onScreen: number; near: number; byDirection: Record<Direction, number> };
  /** Every elite alive: the game's own enemy entries, nearest first, with where each is. */
  elites: (Record<string, unknown> & Bearing)[];
  /** Enemy bullets on a straight path to hit Tibo within `seconds` if he stands still, soonest first: where each comes from, seconds to impact, its damage. */
  bullets: { from: Direction; in: number; damage: number }[];
  /** The game's bullet emitters within 300 units: seconds until they fire, bullets per burst, bursts left, damage. */
  volleys: (Bearing & { firesIn: number; count: number; bursts: number; damage: number })[];
  /** Hostile attack zones (the game's zones, by its kind and shape names) reaching within 300 units: whether Tibo is inside, when a telegraphed one lands, and which directions walk into it within `seconds`. */
  attacks: (Bearing & { kind: string; shape: string; inside: boolean; landsIn?: number; enters: Direction[] })[];
  /** Terrain hazards (the game's world.activeHazards, by kind) Tibo stands in, and those each direction walks into within `seconds`. */
  hazards: { underfoot: string[]; byDirection: Partial<Record<Direction, string[]>> };
  /** The game's pickups: how many of each kind, the total `value` of the xp and gold on the ground, and every pickup that is neither (chests, food, rerolls and the like) as the game's own entries, nearest first. */
  pickups: { counts: Record<string, number>; value: { xp: number; gold: number }; items: (Record<string, unknown> & Bearing)[] };
};

/** The parts of a snapshot outside the game state that `raw` can name. */
const RAW_TOP = ["storage", "surroundings", "forecast", "gameEvents"] as const;

/**
 * Parses a `raw` list: paths into the game state by its own keys, such as "enemies", "cfg", "run"
 * or "world.activeHazards"; "storage", "surroundings", "forecast" or "gameEvents"; or "all".
 */
export function parseRaw(list: string | null | undefined): string[] {
  if (list === null || list === undefined || list === "") return [];
  return list.split(",").map((n) => {
    const path = n.trim();
    if (!/^[\w.]+$/.test(path)) fail(`raw takes game state paths such as enemies,cfg,world.activeHazards, or ${RAW_TOP.join(", ")}, or all; got ${path}`);
    return path;
  });
}

const at = (o: unknown, path: string): unknown => path.split(".").reduce<unknown>((v, k) => (typeof v === "object" && v !== null ? (v as Record<string, unknown>)[k] : undefined), o);
function put(o: Record<string, unknown>, path: string, v: unknown) {
  const keys = path.split(".");
  let here = o;
  for (const k of keys.slice(0, -1)) here = (here[k] ??= {}) as Record<string, unknown>;
  here[keys.at(-1) ?? ""] = v;
}

/** The parts of the snapshot `raw` asks for: game state paths under `game`, and the snapshot's own parts; throws on a path the game state does not have. */
export function rawParts(s: Snapshot, raw: string[]): Pick<Snapshot, "game" | (typeof RAW_TOP)[number]> {
  if (raw.includes("all")) return { ...(s.game === undefined ? {} : { game: s.game }), ...Object.fromEntries(RAW_TOP.flatMap((k) => (s[k] === undefined ? [] : [[k, s[k]]]))) };
  const out: Record<string, unknown> = {};
  const game: Record<string, unknown> = {};
  for (const path of raw) {
    if ((RAW_TOP as readonly string[]).includes(path)) {
      if (s[path as (typeof RAW_TOP)[number]] !== undefined) out[path] = s[path as (typeof RAW_TOP)[number]];
      continue;
    }
    if (s.game === undefined) continue;
    const v = at(s.game, path);
    if (v === undefined) fail(`the game state has no ${path}; its keys are ${Object.keys(s.game).join(", ")}; the snapshot's own parts are ${RAW_TOP.join(", ")}`);
    put(game, path, v);
  }
  return { ...out, ...(Object.keys(game).length === 0 ? {} : { game }) };
}

/**
 * What GET /state and /ws send: the game as a live game needs it (LiveView, absent outside a run),
 * the screen and commands, and whatever `raw` asked for (`game` holds the game state paths).
 */
export type State = Pick<Snapshot, "capturedAt" | "screen" | "mode" | "lastRunLink" | "headless" | "gameBuild" | "commands" | "error"> &
  Partial<LiveView> &
  Pick<Snapshot, "game" | (typeof RAW_TOP)[number]> & { connected: boolean; ageMs: number; pace?: PilotPace; incognito?: boolean };

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

export type Snapshot = {
  capturedAt: number;
  screen: "title" | "run" | "choice" | "paused" | "over";
  /** The game's state object, under the game's own keys (see src/agent/reflect.ts); present once a game exists, including one that just ended. */
  game?: Record<string, unknown>;
  /** What the game recorded for its renderer since the run began, newest last, as the game wrote it (the rarer kinds only; see NOISY_EVENTS in src/game.ts). */
  gameEvents?: Record<string, unknown>[];
  /** What the game keeps in this browser's localStorage, by the game's own keys (those starting "tibo."), parsed. */
  storage?: Record<string, unknown>;
  /** The mode the game is on: the mode screen that is open, else the run in play or the one that just ended. Absent before any run. */
  mode?: GameMode;
  /** The share link of the last finished run, once the game has shown its summary (https://tibo.dog/r/?...). */
  lastRunLink?: string;
  /** See Forecast; present while the game is paused, or running with `forecast` live. */
  forecast?: Forecast;
  /** See Surroundings; present during a run. */
  surroundings?: Surroundings;
  /** Whether the page runs under automation (navigator.webdriver), as in scripts/headless.ts. */
  headless?: boolean;
  /** The game's sim chunk; a checkpoint loads only on the build it was saved on. */
  gameBuild?: string;
  commands: CommandStatus[];
  error?: string;
};

/** A weapon, passive or dog Tibo has: the game's id and English name and description, and its level of the most it can reach. */
export type LoadoutItem = { id: string; name: string; level: number; max: number; description: string };

/** Something Tibo can go for, by the id `goto` takes (`{"poi": id}` for a spot, `{"pickup": id}` for a chest, food or other pickup) and the game's kind as `type`. */
export type Aim = { id: number; type: string; name: string; distance: number };

/** One way Tibo can move, or stand still, over the next `horizonMilliseconds`. */
export type DirectionView = {
  /** Enemies on screen that way; for standing still, those within 60 units. */
  enemies: number;
  /** Health the game's own simulation says the move costs over the horizon, and whether Tibo would die. */
  estimatedDamage: number;
  dead?: true;
  /** The sources most of that damage comes from, in the game's English where it names them. */
  damageFrom?: string[];
  /** Enemy bullets coming from that side that would hit Tibo standing still within the horizon. */
  bullets?: number;
  /** Hazards and attack zones (the game's kinds) that walking that way enters within the horizon; for standing still, those Tibo is in. */
  enters?: string[];
  /** What lies that way (for standing still, what Tibo stands on or in), nearest first. Spots carry their charge so far and the seconds they need. */
  spots?: (Aim & { charged: number; chargeSeconds: number })[];
  /** Chests open after standing on them `chargeSeconds`; `charged` is how far. */
  chests?: (Aim & { charged: number; chargeSeconds: number })[];
  food?: Aim[];
  pickups?: Aim[];
  bosses?: (Aim & { hp: number; maxHp: number })[];
  elites?: (Aim & { hp: number; maxHp: number })[];
};

/** One option of the open choice: the game's own action that takes it (send it as `choose`'s `action`), and what it is. */
export type ChoiceOption = { action: ChoiceAction; name: string; description?: string } & Record<string, unknown>;

/**
 * The game as a live game needs it, built by the agent server from the game state and the game's
 * encyclopedia (scripts/view.ts). Times are run seconds; distances world units.
 */
export type LiveView = {
  time: number;
  world: {
    difficulty: string;
    /** Run seconds at which the run counts as won. */
    winAt: number;
    biome: { id: string; name: string };
    landmark?: { id: string; name: string; event?: string };
    curses: number;
    /** Elites and bosses the curses add, by the game's rules. */
    extraElites: number;
    extraBosses: number;
    /** How strong enemies are now against their base, by the game's own names (hp, dmg, speed, count, bulletCount and the like). */
    scale: Record<string, number>;
    /** Gold: a Potato Crate now, a Fry Cart item by rarity, a Tater Slots spin, each Dog Kennel level. */
    prices: { crate: number; vendor: number[]; slots: number; kennel: number[] };
    /** The total value of the xp and the gold lying on the ground. */
    ground: { xp: number; gold: number };
    enemiesOnScreen: number;
    /** The next boss, elite and event to come, with the run second each comes at. */
    upcoming: { at: number; text: string }[];
    /** Timed boosts running, by the game's key, with the seconds left. */
    boosts: { name: string; endsIn: number }[];
    /** What the game showed lately (boss arrivals, banners, chests), newest last. */
    events: { at: number; text: string }[];
  };
  tibo: {
    life: { hp: number; max: number };
    level: { level: number; xp: number; next: number };
    gold: number;
    dash: { charges: number; max: number; readyIn: number };
    position: { x: number; y: number };
    /** Seconds left of each that is on: stunned, frozen, slowed; invulnerable while hits do not land. */
    status: { stunned?: number; frozen?: number; slowed?: number; invulnerable?: true };
    rerolls: number;
    skips: number;
    banishes: number;
    /** What was banished this run, by the game's ids, which the game never offers again. */
    banished: string[];
    revives: number;
    weapons: LoadoutItem[];
    passives: LoadoutItem[];
    items: { id: string; name: string; count: number; description: string }[];
    /** Tibo's dogs, with what each breed has done this run by the game's own counts. */
    dogs: (LoadoutItem & { helped: Record<string, number> })[];
    /** The effective stats, by the game's own names. */
    stats: Record<string, number>;
    /** What Spud Shrines have added, by the game's stat names. */
    shrineTotals: Record<string, number>;
    /** What the next chest opened evolves, and every recipe that uses something held, with its parts. */
    evolves: string[];
    recipes: string[];
    /** Damage taken in the last 3 seconds, by source. */
    hurtBy: Record<string, number>;
  };
  directions: { horizonMilliseconds: number } & Partial<Record<Direction | "still", DirectionView>>;
  attacks: {
    /** Bullets that would hit Tibo standing still: the side each comes from, seconds to impact, damage. */
    bullets: { from: Direction; in: number; damage: number }[];
    /** Attack zones near Tibo: the game's kind and shape, whether Tibo is inside, when a telegraph lands, and which ways walk into it. */
    zones: { kind: string; shape: string; distance: number; direction: Direction; inside: boolean; landsIn?: number; enters: Direction[] }[];
    /** Bullet emitters near Tibo: seconds until they fire, bullets a burst, bursts left, damage. */
    volleys: { distance: number; direction: Direction; firesIn: number; count: number; bursts: number; damage: number }[];
  };
  /** The open choice, by the game's kind, with what each option is; only what that kind of choice needs. */
  choice?: { kind: string; options: ChoiceOption[] } & Record<string, unknown>;
};

/** The highest Open World Nightmare level this browser has won, from the game's own `tibo.ladder.v1` entry (ask for `raw=storage`); the next one up is the hardest it can start. */
export function ladderCleared(s: { storage?: Record<string, unknown> }): number {
  const cleared = (s.storage?.["tibo.ladder.v1"] as { cleared?: unknown } | undefined)?.cleared;
  return typeof cleared === "number" ? cleared : 0;
}

/**
 * The game's content, each entry its own definition plus all its English lines (name, desc and the
 * like, by the game's message field names). `messages` is the game's English for content kinds with
 * no definition table, such as shrine stat labels and rarities, under the game's own message keys.
 */
export type Encyclopedia = {
  capturedAt: number;
  weapons: unknown[];
  passives: unknown[];
  items: unknown[];
  enemies: unknown[];
  bosses: unknown[];
  dogs: unknown[];
  pois: unknown[];
  events: unknown[];
  botHelps: unknown[];
  biomes: unknown[];
  messages: Record<string, string>;
};

function fail(message: string): never {
  throw new Error(message);
}

function num(v: unknown, what: string): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fail(`${what} must be a number`);
}

function heading(v: unknown, what: string): Heading {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string" && (DIRECTIONS as readonly string[]).includes(v)) return v as Direction;
  return fail(`${what} must be one of ${DIRECTIONS.join(", ")} or degrees`);
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
      return { type: "forecast", live: c.live as boolean, ...(c.lag === undefined ? {} : { lag: num(c.lag, "lag") }), ...(c.seconds === undefined ? {} : { seconds: num(c.seconds, "seconds") }) };
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

/**
 * "Grok take the wheel": the agent server runs scripts/tibo-bot.ts for the tab, and the bot's
 * models talk in the panel. The planner is the decision model choosing cards and goals (and, between
 * runs, the coach reviewing them); the action model is the decision model steering a step, and
 * action messages also report goals starting and ending.
 */
export const PILOT_ROLES = ["planner", "action", "system"] as const;
export type PilotRole = (typeof PILOT_ROLES)[number];
/** How often, in seconds, the bot asks its planner while a goal is under way, and takes a step. */
export type PilotPace = { planEvery: number; actEvery: number };
export const DEFAULT_PACE: PilotPace = { planEvery: 5, actEvery: 0.3 };
export const PACE_LIMITS = { planEvery: { min: 0.5, max: 300, step: 0.5 }, actEvery: { min: 0.1, max: 5, step: 0.1 } } as const;
/** `incognito`: the bot just plays, keeping no notes and writing no review, so the run teaches nothing. */
export type PilotSettings = { pace: PilotPace; incognito: boolean };
export const DEFAULT_SETTINGS: PilotSettings = { pace: DEFAULT_PACE, incognito: false };
export type PilotState = PilotSettings & { state: "off" | "on" | "stopping"; detail?: string };
export type PilotChange = { on?: boolean; incognito?: boolean } & Partial<PilotPace>;

/** Validates a change to the pilot from the panel or a script; throws with a message a caller can act on. */
export function parsePilotChange(input: unknown): PilotChange {
  const c = (input ?? {}) as Record<string, unknown>;
  const change: PilotChange = {};
  for (const key of ["on", "incognito"] as const) {
    if (c[key] === undefined) continue;
    if (typeof c[key] !== "boolean") fail(`${key} must be true or false`);
    change[key] = c[key] as boolean;
  }
  for (const key of ["planEvery", "actEvery"] as const) {
    if (c[key] === undefined) continue;
    const { min, max, step } = PACE_LIMITS[key];
    const v = num(c[key], key);
    if (v < min || v > max) fail(`${key} must be from ${min} to ${max} seconds`);
    change[key] = Number((Math.round(v / step) * step).toFixed(1));
  }
  if (Object.keys(change).length === 0) fail('send {"on": true|false}, {"incognito": true|false}, {"planEvery": seconds} or {"actEvery": seconds}');
  return change;
}
/** One move the action model weighed: the game's own forecast, the model's scores, and what became of it. */
export type MoveOption = {
  move: string;
  description: string;
  /** Health the sim forecast says this move costs over the next second, or "dead". */
  forecast?: string;
  /** The model's 0-4 hurt score and 0-1 usefulness; absent for a move ruled out before asking. */
  hurt?: number;
  useful?: number;
  outcome: "chosen" | "safe" | "risky" | "ruled out";
};
/** `index` is the option's position in the open choice, so the page can find its card. */
export type CardOption = { card: string; notes: string; probability?: number; chosen: boolean; index?: number };
/**
 * What hovering a chat message shows: the question a model got and what it weighed. A plan carries
 * the cards it chose among and every goal it weighed, each with the model's odds.
 */
export type Inspect =
  | { kind: "prompt"; prompt: string; reasoning?: string; reply?: string }
  | { kind: "plan"; prompt: string; choices?: CardOption[]; goals: CardOption[] }
  | { kind: "moves"; situation: string; questions?: string[]; moves: MoveOption[]; dash?: number }
  | { kind: "cards"; situation: string; question: string; cards: CardOption[] };
/**
 * What the bot says; the server stamps it into a ChatMessage. A line with a `key` replaces the
 * earlier message with that key, which is how a planner message streams: `stream` holds its
 * reasoning so far until the final text replaces it.
 */
/**
 * What a non-step action is, which picks its tile's icon in the panel (src/icons.ts). A new tag
 * needs an icon there before it type-checks.
 */
export const ACTION_TAGS = [
  ...["Loot", "Wander", "Run", "Eat", "Hunt", "Spot"],
  ...["Pet", "Kennel", "Crate", "Shrine", "Curse", "Golden", "Farm", "Shop", "Microwave", "Nest", "Lair", "Bot", "Whetstone", "Bell", "Slots", "Vault", "Magnet", "Tunnel", "Light", "Freezer", "Fryer"],
  ...["Dash", "Start", "Take over", "Over", "Stopped", "Incognito"],
] as const;
export type ActionTag = (typeof ACTION_TAGS)[number];
/** How a goal ended; `dropped` means the planner chose another goal first. */
export const GOAL_RESULTS = ["done", "failed", "dropped"] as const;
export type GoalResult = (typeof GOAL_RESULTS)[number];
export type ChatLine = { role: PilotRole; text: string; tag?: ActionTag; result?: GoalResult; detail?: string; model?: string; time?: number; key?: string; stream?: string; inspect?: Inspect };
export type ChatMessage = ChatLine & { id: number; at: number };

const KEEP_PLANS = 500;
const KEEP_OTHERS = 400;

/**
 * Drops the oldest messages beyond what the panel shows: every planner decision of a run (its
 * history is inspectable) but only the latest actions, which come several a second.
 */
export function trimChat(chat: ChatMessage[]) {
  let plans = 0;
  let others = 0;
  for (let i = chat.length - 1; i >= 0; i--) {
    const keep = chat[i]?.role === "planner" ? ++plans <= KEEP_PLANS : ++others <= KEEP_OTHERS;
    if (!keep) chat.splice(i, 1);
  }
}
/** One line of the server's held-open stream to the page. */
export type PageLine = { hello: true } | { error: string } | Envelope | { chat: ChatMessage } | { pilot: PilotState };

function optionalString(v: unknown, what: string): string | undefined {
  return v === undefined ? undefined : typeof v === "string" ? v : fail(`${what} must be a string`);
}

export function parseChatLine(input: unknown): ChatLine {
  const c = (input ?? {}) as Record<string, unknown>;
  if (!(PILOT_ROLES as readonly unknown[]).includes(c.role)) fail(`role must be one of ${PILOT_ROLES.join(", ")}`);
  if (typeof c.text !== "string" || c.text === "") fail("text must be a non-empty string");
  const detail = optionalString(c.detail, "detail");
  const model = optionalString(c.model, "model");
  const key = optionalString(c.key, "key");
  const stream = optionalString(c.stream, "stream");
  const tag = c.tag === undefined ? undefined : (ACTION_TAGS as readonly unknown[]).includes(c.tag) ? (c.tag as ActionTag) : fail(`tag must be one of ${ACTION_TAGS.join(", ")}`);
  const result = c.result === undefined ? undefined : (GOAL_RESULTS as readonly unknown[]).includes(c.result) ? (c.result as GoalResult) : fail(`result must be one of ${GOAL_RESULTS.join(", ")}`);
  const inspect = c.inspect as Inspect | undefined;
  if (inspect !== undefined && !["prompt", "plan", "moves", "cards"].includes((inspect as { kind?: unknown } | null)?.kind as string)) fail("inspect.kind must be prompt, plan, moves or cards");
  return {
    role: c.role as PilotRole,
    text: c.text,
    ...(detail === undefined ? {} : { detail }),
    ...(model === undefined ? {} : { model }),
    ...(c.time === undefined ? {} : { time: num(c.time, "time") }),
    ...(key === undefined ? {} : { key }),
    ...(stream === undefined ? {} : { stream }),
    ...(tag === undefined ? {} : { tag }),
    ...(result === undefined ? {} : { result }),
    ...(inspect === undefined ? {} : { inspect }),
  };
}
