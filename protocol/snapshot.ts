// What the page sends the agent server: the game's own state, and what its tools work out from it.
import type { CommandStatus, GameMode } from "./commands";
import type { Direction } from "./geometry";

/**
 * What one plan cost and did on a copy of the game taken at game tick `tick`: the damage Tibo took,
 * with `bySource` in the game's damage-by-source keys, and the damage he dealt a second while the
 * plan played, by the game's `run.damageBySource` tally.
 */
type Outcome = { tick: number; damage: number; dead: boolean; bySource: Record<string, number>; dps: number };

/**
 * Whole trips to the `forecast` command's `route.to`, each played on a copy of the game until it is
 * done or `seconds` have passed: "straight" walks there and stands on it; a direction or "still" is
 * held for `leg` seconds first; "dash <direction>" (only while a charge is ready) dashes first. The
 * directions are the ones up to a quarter turn either side of the way there. `arrives` is the
 * seconds until Tibo first stands on the place, and `done` the seconds until he has stood there for
 * `stay`, or until the point of interest or pickup is used up; each is absent when the trip does
 * not get that far. `damage` is what the trip costs up to `done`, so only trips that are done
 * compare like for like.
 */
export type Routes = { seconds: number; leg: number; stay: number; options: Record<string, Outcome & { arrives?: number; done?: number }> };

/**
 * The game as it will stand `seconds` from game tick `tick`, when a move chosen now lands: a copy
 * played forward with the movement command the page holds at that tick, so a command sent after
 * the snapshot was taken is not in it. `player` uses the game's own player keys.
 */
export type Ahead = { tick: number; seconds: number; player: { x: number; y: number; hp: number; dashCharges: number }; threats: Threats };

/**
 * What the game's own simulation, run forward on copies of the state, says each plan would cost
 * after the agent's `lag`: the eight directions and standing still held for `seconds`, or, with a
 * `route`, whole trips. A running game is copied afresh for every plan, one plan after another, so
 * each outcome carries the tick of its copy; `ahead` is made for every snapshot, from its own tick. This is a tool's
 * output, not game state.
 */
export type Forecast = { lag: number; seconds: number; ahead: Ahead; moves?: Partial<Record<Direction | "still", Outcome>>; routes?: Routes };

/** Where something is from Tibo, in world units. */
type Bearing = { dist: number; dir: Direction };

/**
 * What is around Tibo, worked out from the game state so an agent need not read every enemy, bullet
 * and hazard (the game's own pools, which `raw` can ask for). A tool's output, not game state. `seconds` is the
 * horizon, the same as the forecast's.
 */
export type Surroundings = Threats & {
  seconds: number;
  /** Damage taken in the last 3 seconds, by the game's damage source keys. */
  hurtBy: Record<string, number>;
  /** Damage Tibo dealt a second over the last 3 seconds, by the game's `run.damageBySource` tally. */
  dps: number;
  /** Every elite alive: the game's own enemy entries, nearest first, with where each is. */
  elites: (Record<string, unknown> & Bearing)[];
  /** The game's pickups: how many of each kind, the total `value` of the xp and gold on the ground, and every pickup that is neither (chests, food, rerolls and the like) as the game's own entries, nearest first. */
  pickups: { counts: Record<string, number>; value: { xp: number; gold: number }; items: (Record<string, unknown> & Bearing)[] };
};

/** What could hurt Tibo where he stands and along each direction, from the game's enemy, bullet, emitter, zone and hazard pools. */
export type Threats = {
  /** Enemies inside the game's camera view, in all and by direction from Tibo, and those within 60 units of him. */
  enemies: { onScreen: number; near: number; byDirection: Record<Direction, number> };
  /** Enemy bullets on a straight path to hit Tibo within `seconds` if he stands still, soonest first: where each comes from, seconds to impact, its damage. */
  bullets: { from: Direction; in: number; damage: number }[];
  /** The game's bullet emitters within 300 units: seconds until they fire, bullets per burst, bursts left, damage. */
  volleys: (Bearing & { firesIn: number; count: number; bursts: number; damage: number })[];
  /** Hostile attack zones (the game's zones, by its kind and shape names) reaching within 300 units: whether Tibo is inside, when a telegraphed one lands, and which directions walk into it within `seconds`. */
  attacks: (Bearing & { kind: string; shape: string; inside: boolean; landsIn?: number; enters: Direction[] })[];
  /** Terrain hazards (the game's world.activeHazards, by kind) Tibo stands in, and those each direction walks into within `seconds`. */
  hazards: { underfoot: string[]; byDirection: Partial<Record<Direction, string[]>> };
};

export type Snapshot = {
  capturedAt: number;
  screen: "title" | "run" | "choice" | "paused" | "over";
  /** The game's state object, under the game's own keys (see userscript/agent/reflect.ts); present once a game exists, including one that just ended. */
  game?: Record<string, unknown>;
  /** The latest of what the game recorded for its renderer, newest last, as the game wrote it (the rarer kinds only; see NOISY_EVENTS in userscript/link/game-link.ts). */
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
  /** Whether the page runs under automation (navigator.webdriver), as in the headless game. */
  headless?: boolean;
  /** The game's sim chunk; a checkpoint loads only on the build it was saved on. */
  gameBuild?: string;
  commands: CommandStatus[];
  error?: string;
};

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
