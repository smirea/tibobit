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
  /** Pick an option of the open level-up, chest or shrine choice by its index. */
  | { type: "choose"; index: number }
  | { type: "dash"; dir?: Heading }
  | { type: "pause" }
  | { type: "resume" }
  /** Run the simulation `factor` ticks per frame (1 to 8). Movement input still applies to every tick. */
  | { type: "speed"; factor: number }
  /**
   * From the title screen, the end screen or mid-run, start a new run. `mode` "daily" plays
   * today's Daily, which has the same seed and build for everyone, so runs are comparable. The
   * new run waits paused at tick 0; use `resume` or a `move`/`goto` with `pause` to play it.
   */
  | { type: "start"; mode?: "openWorld" | "daily"; difficulty?: "easy" | "normal" | "hard" | "nightmare" };

export type CommandState = "running" | "done" | "failed" | "replaced";
export type CommandStatus = { id: number; command: Command; state: CommandState; detail?: string; at: number };

export type Envelope = { id: number; command: Command };

export type Rel = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  dist: number;
  dir: Direction;
  /** Inside the game's camera view. Things off screen get an arrow at the screen edge in the game. */
  onScreen: boolean;
};

export type Owned = { id: string; name: string; level: number; max: number };

export type ComboPart = { key: string; name: string; need: "own" | "max"; state: "done" | "leveling" | "missing"; have?: number; max?: number };
export type ComboView = { result: string; name: string; kind: "evolution" | "union" | "itemEvolution"; ready: boolean; made: boolean; parts: ComboPart[] };

/** One recipe an option joins: `ready` means picking the option completes it. */
export type PairingView = ComboView & { partner: { key: string; name: string }; partnerHeld: boolean; partnerBanished: boolean };

/** A held weapon, passive or item with recipes left and no partner held yet, as in the panel. */
export type UnpairedView = { key: string; name: string; options: { key: string; name: string; result: string; resultName: string; made: boolean; banished: boolean }[] };

export type OptionView = {
  index: number;
  type: string;
  id: string;
  name: string;
  /** The option's text on screen, with prices and stats. */
  label: string;
  /** False for a greyed-out option, such as an item you cannot afford. */
  available: boolean;
  level?: number;
  /** The game's own pick suggestion. */
  recommended: boolean;
  /** Never offered before in this browser profile. */
  unseen: boolean;
  /** Every recipe this option is part of whose result is not held yet, held partners first. */
  combos: PairingView[];
};

export type Snapshot = {
  capturedAt: number;
  screen: "title" | "run" | "choice" | "paused" | "over";
  run?: RunView;
  /** The share link of the last finished run, once the game has shown its summary (https://tibo.dog/r/?...). */
  lastRunLink?: string;
  /** How the most recent run went; set once a run has ended. `damageTaken` is by source, largest first. */
  lastRun?: { time: number; level: number; kills: number; damageTaken: Record<string, number> };
  commands: CommandStatus[];
  error?: string;
};

export type RunView = {
  /** The run's seed and whether it is today's Daily; the same Daily seed means the same map and spawns. */
  seed: string;
  daily: boolean;
  tick: number;
  time: number;
  player: {
    x: number;
    y: number;
    hp: number;
    maxHp: number;
    level: number;
    xp: number;
    xpNext: number;
    gold: number;
    dashCharges: number;
    invulnerable: boolean;
    /** Damage taken in the last 3 game seconds by source, such as "enemy:aphid", "boss:..." or "burn". */
    hurtBy: Record<string, number>;
  };
  /** `banished` lists the ids banished this run, which the game never offers again. */
  loadout: { weapons: Owned[]; passives: Owned[]; items: { id: string; name: string; count: number }[]; banished: string[] };
  /** Recipes using something held. */
  combos: ComboView[];
  unpaired: UnpairedView[];
  choice?: { kind: string; options: OptionView[]; raw?: unknown };
  bosses: (Rel & { id: string; name: string; hp: number; maxHp: number; radius: number })[];
  enemies: { total: number; nearest: (Rel & { id: string; name: string; hp: number; radius: number; elite: boolean })[] };
  /** Counts by kind, every chest, and the nearest pickups that are not xp gems. */
  pickups: { counts: Record<string, number>; chests: PickupView[]; nearest: PickupView[] };
  /** The 15 nearest unused points of interest. Standing inside one's circle charges it; `charge` and `chargeNeeded` are seconds. */
  pois: (Rel & { uid: number; kind: string; name: string; radius: number; inside: boolean; charge: number; chargeNeeded: number; used: boolean })[];
  /**
   * Terrain patches and enemy attack zones. Positions are the zone's nearest point to the player.
   * A "line" zone (a boss sweep or charge) is a band `radius` wide each side of a segment, so
   * stepping sideways leaves it; `landsIn` is the seconds until a telegraphed attack hits.
   */
  hazards: (Rel & { kind: string; source: "terrain" | "attack"; shape: string; radius: number; inside: boolean; landsIn?: number })[];
  /** Enemy bullets; `vx`/`vy` are units per second. */
  bullets: { total: number; nearest: (Rel & { radius: number; vx: number; vy: number })[] };
  /** Enemy bullets that would hit the player within 0.6 seconds if it stands still. */
  standingBulletHits: number;
  /** Everything around the player bucketed by compass direction, nearest first within each. */
  sectors: SectorView[];
};

export type SectorView = {
  dir: Direction;
  /** Enemies within 60 and within 150 units in this direction. */
  enemiesNear: number;
  enemiesFar: number;
  /** Distance to the nearest enemy, boss or bullet this way, or null when there is none within 300. */
  nearestEnemy: number | null;
  nearestBoss: number | null;
  nearestBullet: number | null;
  /** Enemy bullets within 60 units this way. */
  bulletsNear: number;
  /** A terrain hazard or attack zone the player is not already in overlaps the next 60 units this way. */
  hazard: string | null;
  /** The player stands in a hazard, and 60 units this way is clear of it. */
  leavesHazard: boolean;
  /** 60 units this way is outside every enemy attack zone on the ground. */
  clearOfAttacks: boolean;
  /** Enemy bullets that would hit the player within 0.6 seconds if it walks this way, from their current paths. */
  bulletHits: number;
  /** XP gems within 120 units this way. */
  xpNear: number;
};

/** `charge` and `chargeNeeded` (seconds) appear on pickups you open by standing on them. */
export type PickupView = Rel & { uid: number; kind: string; value: number; charge?: number; chargeNeeded?: number };

export type Encyclopedia = {
  capturedAt: number;
  weapons: unknown[];
  passives: unknown[];
  items: unknown[];
  recipes: unknown[];
  enemies: unknown[];
  bosses: unknown[];
  pois: unknown[];
  biomes: unknown[];
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
    case "choose":
      return { type: "choose", index: num(c.index, "index") };
    case "speed": {
      const factor = num(c.factor, "factor");
      if (!Number.isInteger(factor) || factor < 1 || factor > 8) fail("factor must be a whole number from 1 to 8");
      return { type: "speed", factor };
    }
    case "dash":
      return c.dir === undefined ? { type: "dash" } : { type: "dash", dir: heading(c.dir, "dir") };
    case "start": {
      const d = c.difficulty;
      if (d !== undefined && d !== "easy" && d !== "normal" && d !== "hard" && d !== "nightmare") fail("difficulty must be easy, normal, hard or nightmare");
      const m = c.mode;
      if (m !== undefined && m !== "openWorld" && m !== "daily") fail("mode must be openWorld or daily");
      return { type: "start", ...(m === undefined ? {} : { mode: m }), ...(d === undefined ? {} : { difficulty: d }) };
    }
    case "stop":
    case "pause":
    case "resume":
      return { type: c.type };
    default:
      return fail("type must be move, goto, stop, choose, dash, pause, resume, speed or start");
  }
}
