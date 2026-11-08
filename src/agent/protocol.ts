// The contract between the userscript, the local server and agents. World units: +x is right,
// +y is down, and the player walks about 62 units per second at base speed.

export const BRIDGE_PORT = 7357;
export const bridgeOrigin = (port: number) => `http://127.0.0.1:${port}`;
export const BRIDGE_ORIGIN = bridgeOrigin(BRIDGE_PORT);

export function validPort(port: number): boolean {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
}

export const DIRECTIONS = ["right", "down-right", "down", "down-left", "left", "up-left", "up", "up-right"] as const;
/** The damage a copy of the game took when run forward with one input held. Sources are the game's damage-by-source keys. */
export type ForecastView = { seconds: number; damage: number; dead: boolean; sources: { source: string; damage: number }[] };

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
   * `live` keeps the sim forecasts (`forecast`, `standingForecast`) coming while the game runs,
   * a few times a second, for an agent that does not pause between steps. Off, they only appear
   * while the game is paused.
   */
  | { type: "forecast"; live: boolean }
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
  | { type: "summary" };

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

export type GameMode = "openWorld" | "daily";

export type Snapshot = {
  capturedAt: number;
  screen: "title" | "run" | "choice" | "paused" | "over";
  /** The mode the game is on: the mode screen that is open, else the run in play or the one that just ended. Absent before any run. */
  mode?: GameMode;
  run?: RunView;
  /** The share link of the last finished run, once the game has shown its summary (https://tibo.dog/r/?...). */
  lastRunLink?: string;
  /** How the most recent run went; set once a run has ended. */
  lastRun?: { time: number; level: number } & RunTotals;
  /** Whether the page runs under automation (navigator.webdriver), as in scripts/headless.ts. */
  headless?: boolean;
  /** The highest Open World Nightmare level this browser has won (survived 20:00 on); the next one up is the hardest it can start. */
  ladderCleared?: number;
  commands: CommandStatus[];
  error?: string;
};

export type EnemyView = Rel & { uid: number; id: string; name: string; hp: number; maxHp: number; damage: number; radius: number; speed: number; elite: boolean };

/**
 * What the game counts over the whole run. Sources are a weapon id for damage dealt and kills, and
 * "enemy:<id>", "boss:<id>" or a ground name such as "burn" for damage taken; each map is largest first.
 */
export type RunTotals = {
  kills: number;
  damageTaken: Record<string, number>;
  damageDealt: Record<string, number>;
  killsBy: Record<string, number>;
  goldEarned: number;
  goldSpent: number;
  bossesKilled: number;
  elitesKilled: number;
  bossChests: number;
  cratesBought: number;
  shrinesUsed: number;
  itemsBought: number;
  /** Every evolution, union and evolved item made this run, by id. */
  made: string[];
  revivesUsed: number;
  /** Survived to `winAt`. The run goes on after a win until Tibo dies. */
  won: boolean;
  /** The source of the killing blow, once Tibo is dead. */
  killer?: string;
};

/** A timed boost; `endsIn` is game seconds left, `mult` the gold or fire-rate multiplier. */
export type BuffView = { id: "goldRush" | "frenzy" | "fryRush" | "picnic"; endsIn: number; mult?: number };

/**
 * Something the game showed or recorded, newest last: a boss spawning or defeated, a banner
 * (`announce`, whose `announcement.kind` says what, such as "event" with the event's id), a chest,
 * an evolution, a level-up, a dog joining. `time` is the run clock. `name` and `text` are the
 * game's English for a boss or event.
 */
export type EventView = { time: number; type: string; name?: string; text?: string } & Record<string, unknown>;

export type RunView = {
  /** The run's seed and whether it is today's Daily; the same Daily seed means the same map and spawns. */
  seed: string;
  daily: boolean;
  /** Such as "normal" or "nightmare-3", as the HUD shows it. */
  difficulty: string;
  tick: number;
  time: number;
  /** The run clock at which the run counts as won. */
  winAt: number;
  /** The score on the HUD. */
  score?: number;
  biome: { id: string; name: string };
  /** A Daily's weather, which changes the rules for the whole run. */
  weather?: { id: string; name: string; description: string };
  /** The gear a Daily starts Tibo in; its stat lines are already in `stats`. Empty outside a Daily. */
  gear: { slot: string; id: string; name: string; description: string; lines: { affix: string; roll: number }[] }[];
  /** The landmark Tibo is in, such as the Coin Laundromat, and the event it holds. */
  landmark?: { id: string; name: string; event?: { id: string; name: string } };
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
    dashMax: number;
    /** Seconds until the next dash charge comes back; 0 when every charge is ready. */
    dashReadyIn: number;
    invulnerable: boolean;
    /** Seconds left of each; Tibo cannot move while stunned or frozen. */
    stunned: number;
    frozen: number;
    slowed: number;
    revivesLeft: number;
    rerolls: number;
    skips: number;
    banishes: number;
    /** Curses held: those the difficulty starts with plus each Moldy Shrine taken. Each brings more elites and bosses. */
    curses: number;
    /** Damage taken in the last 3 game seconds by source, such as "enemy:aphid", "boss:..." or "burn". */
    hurtBy: Record<string, number>;
  };
  /** `banished` lists the ids banished this run, which the game never offers again. */
  loadout: { weapons: Owned[]; passives: Owned[]; items: { id: string; name: string; count: number }[]; banished: string[] };
  /**
   * The effective stats after passives, items, shrines and dogs, by the game's own names:
   * multipliers such as damageMult, areaMult, cooldownMult, moveSpeedMult and growthMult (1 is
   * base), and flat values such as maxHp, armor, recovery, magnetRadius, luck, curse, critChance and evasion.
   */
  stats: Record<string, number>;
  buffs: BuffView[];
  totals: RunTotals;
  /** The minutes still to come that bring a boss, an elite or an event, in order; this minute first. */
  schedule: { minute: number; boss?: { id: string; name: string }; elite: boolean; events: { id: string; name: string }[] }[];
  events: EventView[];
  /** Recipes using something held. */
  combos: ComboView[];
  unpaired: UnpairedView[];
  choice?: { kind: string; options: OptionView[]; raw?: unknown };
  bosses: (Rel & { id: string; name: string; hp: number; maxHp: number; damage: number; speed: number; radius: number })[];
  /** `elites` is every elite alive, nearest first, wherever it is; `uid` follows one enemy across snapshots. */
  enemies: { total: number; nearest: EnemyView[]; elites: EnemyView[] };
  /** Counts by kind, every chest, and the nearest pickups that are not xp gems. */
  pickups: { counts: Record<string, number>; chests: PickupView[]; nearest: PickupView[] };
  /** The 15 nearest unused points of interest. Standing inside one's circle charges it; `charge` and `chargeNeeded` are seconds. */
  /** `description` is the game's own line for it, such as "An elite waits here. It drops a chest." */
  /** `price` is the gold a Potato Crate takes now (each one bought raises the next); `prices` a vendor's by item rarity. */
  /** `variant` names what a "bigUpdate" spot is, such as "chiliBottle" or "spudForge"; a variety place such as the chili bottle has `chargeNeeded` 0 because the game does not export its charge time. */
  pois: (Rel & { uid: number; kind: string; variant?: string; name: string; description: string; radius: number; inside: boolean; charge: number; chargeNeeded: number; used: boolean; price?: number; prices?: number[] })[];
  /**
   * Terrain patches and enemy attack zones. Positions are the zone's nearest point to the player.
   * A "line" zone (a boss sweep or charge) is a band `radius` wide each side of a segment, so
   * stepping sideways leaves it; `landsIn` is the seconds until a telegraphed attack hits.
   */
  hazards: (Rel & { kind: string; source: "terrain" | "attack"; shape: string; radius: number; inside: boolean; landsIn?: number })[];
  /** Enemy bullets; `vx`/`vy` are units per second. */
  bullets: { total: number; nearest: (Rel & { radius: number; vx: number; vy: number })[] };
  /** Enemy bullet patterns about to fire, nearest first: `firesIn` seconds, then `bursts` volleys of `count` bullets. */
  volleys: (Rel & { firesIn: number; count: number; bursts: number; speed: number; damage: number })[];
  /** Tibo's dogs. */
  pets: (Rel & { id: string; name: string; level: number })[];
  /**
   * Grok Bots on the map, each with one kind of `help`, such as a shield or coins. In `mode` wander
   * one hops over once Tibo comes near, helps when it reaches him, then cheers; beam means it is
   * leaving, and swarm is a Bot Dock's swarm. `leavesIn` is seconds until its current mode ends.
   */
  helpers: (Rel & { help: string; name: string; description: string; mode: string; leavesIn: number })[];
  /** Poteto, Andrew or Samir while one is walking in; each comes once a run with a gift. */
  visitors: (Rel & { who: "poteto" | "andrew" | "samir" })[];
  /** Enemy bullets that would hit the player within 0.6 seconds if it stands still. */
  standingBulletHits: number;
  /** Enemies that would reach the player within 0.6 seconds if it stands still, chasing at their base speed. */
  standingEnemyTouches: number;
  /** What standing still for the next second costs, from the game's own simulation. Only while paused between agent steps. */
  standingForecast?: ForecastView;
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
  /** Enemies that would reach the player within 0.6 seconds if it walks this way, chasing at their base speed. */
  enemyTouches: number;
  /** What walking this way for the next second costs, from the game's own simulation. Only while paused between agent steps. */
  forecast?: ForecastView;
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
    case "forecast":
      if (typeof c.live !== "boolean") fail("live must be true or false");
      return { type: "forecast", live: c.live as boolean };
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
    default:
      return fail("type must be move, goto, stop, choose, dash, pause, resume, speed, forecast, start or summary");
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
  ...["Loot", "Wander", "Run", "Gems", "Eat", "Hunt", "Spot"],
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
