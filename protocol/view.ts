// What the agent server sends its clients.
import type { ChoiceAction, CommandStatus } from "./commands";
import type { Direction } from "./geometry";
import type { Drive } from "./drive";
import type { Snapshot } from "./snapshot";

/** The parts of a snapshot outside the game state that `raw` can name. */
export const RAW_TOP = ["storage", "surroundings", "forecast", "gameEvents"] as const;

/**
 * What GET /state and /ws send: the game as a live game needs it (LiveView, absent outside a run),
 * the screen and commands, and whatever `raw` asked for (`game` holds the game state paths).
 */
export type State = Pick<Snapshot, "capturedAt" | "screen" | "mode" | "lastRunLink" | "headless" | "gameBuild" | "commands" | "error"> &
  Partial<LiveView> &
  Pick<Snapshot, "game" | (typeof RAW_TOP)[number]> & { connected: boolean; ageMs: number; drive?: Drive };

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
  /** The xp lying that way within 600 units, nearer xp counting for more; absent for standing still. */
  xp?: number;
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
 * encyclopedia (agent-server/live-view.ts). Times are run seconds; distances world units.
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
    /** Damage dealt a second over the last 3 seconds. */
    dps: number;
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

/**
 * What a waited-for command comes back as. A level-up or chest choice freezes game time, so a move
 * or goto under way when a choice opens or the run ends comes back early, still running, with what
 * interrupted it.
 */
export type Settled = CommandStatus & { interruptedBy?: "choice" | "over" };
