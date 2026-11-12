// What Full Self Driving's function reads and returns. The bot calls `drive(state)` four times a
// second and has the autopilot carry out the action it returns. This file stands alone, with no
// imports: its text is the type check's prelude, part of the builder's prompt, and what the popup
// shows beside the code. Names are the game's own.

export type Direction = "right" | "down-right" | "down" | "down-left" | "left" | "up-left" | "up" | "up-right";

/** Where something is from Tibo. Distances are world units; Tibo walks about 62 a second. */
export type Placed = {
  /** The id an action names it by. */
  id: number;
  dist: number;
  /** The way to walk to it; "still" when Tibo stands on or in it. */
  dir: Direction | "still";
  /** Tibo gave up on it in the last 45 seconds: it could not be reached, charged or paid for. */
  gaveUp: boolean;
};

/** A weapon or passive Tibo holds, by the game's id, with its level of the most it can reach. */
export type Held = { id: string; name: string; level: number; max: number };

export type Pickup = Placed & {
  /**
   * The game's pickup kind. A chest opens after Tibo has stood on it; the game calls it a goldChest
   * when a boss or Poteto left it. heal is food. magnet pulls in all the xp on the ground.
   */
  kind: "chest" | "goldChest" | "heal" | "magnet" | "reroll" | "skip" | "banish" | "item" | "beacon";
  /** For a chest: seconds stood on it so far, and the seconds it takes to open. */
  charged?: number;
  chargeSeconds?: number;
};

/** A point of interest: a place that does something once Tibo has stood inside it. Only unused ones are listed. */
export type Poi = Placed & {
  /** The game's kind, such as chargeShrine or paidChest; a variety place goes by its own id, such as lighthouse. */
  kind: string;
  /** The game's English name, such as Spud Shrine or Potato Crate. */
  name: string;
  inside: boolean;
  /** Seconds stood inside so far, and the seconds it takes to charge. */
  charged: number;
  chargeSeconds: number;
};

export type Enemy = Placed & {
  /** The game's id of the enemy or boss. */
  kind: string;
  name: string;
  hp: number;
  maxHp: number;
};

export type State = {
  /** Seconds of game time since the run began. */
  time: number;
  /** The second the run counts as won; it goes on after that until Tibo dies. */
  winAt: number;
  tibo: {
    hp: number;
    maxHp: number;
    /** Health lost over the last 3 seconds. */
    hurt: number;
    /** Damage dealt a second over the last 3 seconds. */
    dps: number;
    level: number;
    gold: number;
    x: number;
    y: number;
    dash: { charges: number; max: number };
    /** Up to 6 of each. */
    weapons: Held[];
    passives: Held[];
    items: { id: string; name: string; count: number }[];
    /** Weapons the next chest opened would evolve, because their recipe is complete. */
    evolves: string[];
    /** The effective stats, by the game's own names, such as damageMult, armor and magnetRadius. */
    stats: Record<string, number>;
  };
  enemies: {
    onScreen: number;
    /** Enemies on screen in each direction. */
    byDirection: Record<Direction, number>;
    /** The direction with the fewest enemies on screen, and the one with the most. */
    fewest: Direction;
    most: Direction;
    /** Bullets about to arrive from each direction. */
    bullets: Record<Direction, number>;
  };
  /** Every list below is nearest first. */
  elites: Enemy[];
  bosses: Enemy[];
  /** What lies on the ground, other than xp and gold. */
  pickups: Pickup[];
  pois: Poi[];
  /** The total value of the xp and of the gold lying on the ground, and the xp lying each way within about half a screen, nearer xp counting for more. */
  ground: { xp: number; gold: number; xpByDirection: Record<Direction, number> };
  /** Gold a Potato Crate (paidChest) costs now, and a Tater Slots spin. */
  prices: { crate: number; slots: number };
  /** Timed boosts running, by the game's key, with the seconds left. */
  boosts: { name: string; endsIn: number }[];
  /** The next boss, elite and event to come, with the run second each comes at. */
  upcoming: { at: number; text: string }[];
  /** What `drive` returned last time and for how many seconds it has returned the same; null on the first call. To remember anything else, keep it in `memory`. */
  previous: { action: Action; seconds: number } | null;
};

/**
 * What the autopilot does until the next call. It walks there and dodges on its own. `why` is a
 * few words shown to the person watching, and comes back as `state.previous.action.why`.
 */
export type Action = (
  /** Walk to a pickup and take it; a chest is stood on until it opens. */
  | { type: "pickup"; id: number }
  /** Walk to a point of interest and stand inside it until it has charged. */
  | { type: "poi"; id: number }
  /** Fight an elite: keep it within reach of Tibo's weapons until it dies. */
  | { type: "elite"; id: number }
  /** Walk that way. */
  | { type: "move"; dir: Direction }
  /** Dash that way, a quick burst that spends a dash charge; with none, walk that way. */
  | { type: "dash"; dir: Direction }
  /**
   * Gather xp: each step, walk the safe way with the most xp for the fewest enemies, and take any
   * magnet within 500 on the way. With no xp near, keep away from enemies. It lasts until another action.
   */
  | { type: "xp" }
  /** Stand still, stepping aside only when standing would cost more health than moving. */
  | { type: "still" }
) & { why?: string };
