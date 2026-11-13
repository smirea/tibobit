
type WeaponDef = {
  id: string;
  tier: "base" | "evolved" | "union";
  levels?: unknown[];
  from?: string | string[];
  catalyst?: string;
};
type PassiveDef = { id: string; maxLevel: number; stat?: string; perLevel?: number };
type ItemDef = { id: string; tier: "base" | "evolved"; from?: string; catalyst?: string; rarity?: number };
type EnemyDef = { id: string; hp: number; speed: number; damage: number; radius: number };

export type Content = {
  baseWeapons: WeaponDef[];
  allWeapons: WeaponDef[];
  evolutions: WeaponDef[];
  unions: WeaponDef[];
  passives: PassiveDef[];
  items: ItemDef[];
  evolvedItems: ItemDef[];
  allItems: ItemDef[];
  enemies: EnemyDef[];
  bossIds: string[];
};

/** The game's global content table: every definition regardless of which updates a run enables. */
export type Table = Content & {
  enemyAt(index: number): EnemyDef;
  bossIdAt(index: number): string;
  dogAt(index: number): { id: string };
  botHelpAt(index: number): { id: string };
  biomes: { id: string }[];
  pois: { kind: string; radius: number }[];
  dogs: { id: string }[];
  events: { id: string }[];
  botHelps: { id: string }[];
};

type Offer = { type: "weapon" | "passive" | "item"; id: string; level?: number; isNew?: boolean };
/** What a Spud Shrine offers: an amount added to one stat, by the game's stat name. */
type ShrineOffer = { stat: string; value: number };
/** Where a Crossroads choice is: its three offers, the weapon a Sacrifice or Transmute takes, or the weapons the one in slot `from` can become. */
type CrossroadsStep = { kind: "offers" } | { kind: "weapon"; offer: number } | { kind: "target"; offer: number; from: number; into: string[] };
type Choice = { kind: string; offers?: (Offer | ShrineOffer)[]; rewards?: unknown[]; level?: number; gold?: number; step?: CrossroadsStep };

type Column<T = number> = { [index: number]: T | undefined; length: number };
type SlotPool = { count: number; slotAt(n: number): number; isAlive(slot: number): boolean; id(slot: number): number; has(id: number): boolean };
type Pool<F extends string> = { pool: SlotPool } & Record<F, Column>;

type Poi = {
  id: string;
  kind: string;
  x: number;
  y: number;
  radius: number;
  state: { uid: number; used: boolean; charge: number; armed: boolean; goneAt: number };
  /** Which variety place a "varietyPlace" spot is. */
  varietyPlace?: string;
};
type Hazard = { kind: string; x: number; y: number; radius: number; strength: number; poolShape: number; turn: number };

/** The game's hit test for a shaped pool: is the point (dx, dy) from its centre inside, with `pad` of slack? */
export type InPool = (poolShape: number, turn: number, dx: number, dy: number, radius: number, pad: number) => boolean;

export type GameState = {
  loadout: {
    level: number;
    xp: number;
    xpNext: number;
    gold: number;
    /** `damageDealt` is the weapon's own tally this run, which the Crossroads weighs weapons by. */
    weapons: { def: WeaponDef; level: number; slot: number; damageDealt: number }[];
    passives: { def: PassiveDef; level: number }[];
    items: Map<string, number>;
    /** Ids the player banished this run; the game never offers them again. */
    banished: Set<string>;
    rerolls: number;
    skips: number;
    banishes: number;
    cursesTaken: number;
    revivesUsed: number;
    /** What every Spud Shrine pick has added so far, by the game's stat names; zero for the rest. */
    shrineTotals: Record<string, number>;
    /** What passives, items, shrines and the like add to each stat before the base, by the game's stat names. */
    totals: Record<string, number>;
    /** A class whose getters are the effective stats: maxHp, moveSpeedMult, armor, luck and so on. */
    stats: { maxHp: number; moveSpeedMult: number; revivals: number; dashCharges: number; dashCooldownMult: number };
  };
  player: Pool<"x" | "y" | "fx" | "fy" | "hp" | "invuln" | "dashCharges" | "dashCd" | "moving" | "radius" | "stunTicks" | "freezeTicks" | "slowT" | "slowF" | "terrainSlow">;
  me: number;
  enemies: Pool<"x" | "y" | "hp" | "maxHp" | "radius" | "def" | "flags" | "damage">;
  bosses: Pool<"x" | "y" | "hp" | "maxHp" | "radius" | "def" | "damage" | "speed">;
  emitters: Pool<"x" | "y" | "count" | "speed" | "damage" | "burstsLeft" | "telegraph">;
  pets: Pool<"x" | "y" | "breed" | "level">;
  grokBots: Pool<"x" | "y" | "help" | "mode" | "timer">;
  /** Poteto, Andrew and Samir walk in once a run; each is a pool of one. */
  visitor: Pool<"x" | "y" | "phase">;
  andrew: Pool<"x" | "y" | "phase">;
  samir: Pool<"x" | "y" | "phase">;
  pickups: Pool<"x" | "y" | "kind" | "source" | "value" | "charge">;
  zones: Pool<"x" | "y" | "radius" | "kind" | "hostile" | "shape" | "life" | "maxLife" | "damage" | "delay" | "angle" | "length" | "poolShape" | "turn">;
  bullets: Pool<"x" | "y" | "radius" | "vx" | "vy" | "damage">;
  world: { activePois: Poi[]; activeHazards: Hazard[] };
  view: { width: number; height: number };
  cfg: {
    player: { baseSpeed: number };
    dash: { charges: number; cooldownSec: number; minCooldownSec: number };
    win: { timeSec: number };
    ladder: { level: number };
    activation: { seconds: Record<string, number>; pickupRadius: Record<string, number> };
    /** The Potato Crate's price grows with each one bought; vendors price items by rarity. */
    economy?: { chestPriceBase: number; chestPriceLinear: number; chestPriceQuad: number; chestPriceCubic: number; chestPriceKnee: number; vendorPrice?: number[] };
  };
  paidChestsBought?: number;
  choiceQueue: Choice[];
  over: boolean;
  paused: boolean;
  tick: number;
  /** Game seconds, the clock every `...Until` field counts in; `runClock` is the run's own clock on the HUD. */
  time: number;
  runClock: number;
  difficulty: string;
  /** "standard" for Open World. */
  mode: string;
  currentBiome: string;
  currentLandmark: { biome: { id: string }; event?: string } | null;
  /** The schedule by minute: the boss that comes, whether an elite does, and the events. */
  waves: { rows: { minute: number; boss?: string; elite?: boolean; events?: string[] }[] };
  goldRushUntil: number;
  goldRushMult: number;
  frenzyUntil: number;
  moreVariety?: { fryRushUntil: number; fireRate: number; picnicUntil: number };
  run: {
    timeSec: number;
    level: number;
    kills: number;
    seed: string;
    damageTakenBySource: Map<string, number>;
    damageBySource: Map<string, number>;
    killsBySource: Map<string, number>;
    /** Each with the game time it was made at. */
    evolutions: { id: string; at: number }[];
    unions: { id: string; at: number }[];
    itemEvolutions: { id: string; at: number }[];
    killer: string;
    won: boolean;
    goldEarned: number;
    goldSpent: number;
    bossesKilled: number;
    elitesKilled: number;
    bossChests: number;
    paidChests: number;
    shrinesUsed: number;
    itemsBought: number;
    revivesUsed: number;
    /** Each dog that joined, with the game time it joined at. */
    dogs: { id: string; at: number }[];
    /** What each dog breed has done this run, one column per kind of help, indexed like the content table's dogs. */
    dogHelp: Record<string, ArrayLike<number>>;
  };
  /** Run-wide tallies the game keeps alongside `run`, such as hits, crits, shots and near misses. */
  counters: Record<string, number>;
  /** Only on a Daily: its weather, and the gear kit Tibo wears, by slot. */
  daily?: { weather: string; kit: Record<string, { gear: string; lines: { affix: string; roll: number }[] }> };
};

/** What the game records for its renderer each tick, such as `{type: "bossSpawn", id}` or `{type: "announce", announcement}`. */
export type GameEvent = { type: string } & Record<string, unknown>;

export type Game = {
  state: GameState;
  drainEvents(): GameEvent[];
  setInput(x: number, y: number): void;
  setPaused(paused: boolean): void;
  dash(x: number, y: number): void;
  /** The game's own action on the open choice, such as `{ type: "pick", index: 0 }` or `{ type: "skip" }`. */
  choose(action: { type: string; index?: number }): void;
  /** Marks the run as not replayable from its inputs, so the game neither posts it nor counts it. */
  taint(): void;
};

/** The game's photo of a pointing hand, in image pixels: its size and its fingertip. */
export type Hand = { url: string; width: number; height: number; tipX: number; tipY: number };

/** Enum tables the game exports from its boot chunk, found by shape rather than by minified name. */
export type Enums = {
  pickupKinds: string[];
  /** What left a pickup, by the number in its `source` column. */
  pickupSources: string[];
  zoneKinds: Record<string, number>;
  zoneShapes: Record<string, number>;
  enemyFlags: Record<string, number>;
  botModes: Record<string, number>;
};

export type Messages = Record<string, string[]>;

export type IconFrame = { x: number; y: number; w: number; h: number; ax: number; ay: number };
export type IconPage = { url: string; width: number; height: number };
/** The game's own icon sprite sheet, keyed by weapon, passive or item id. */
export type IconSheet = IconPage & { frames: Map<string, IconFrame>; pageOf(frame: IconFrame): IconPage };

/** While set, replaces the player's movement input every simulation tick. */
export type Steer = (game: Game) => { x: number; y: number } | undefined;
