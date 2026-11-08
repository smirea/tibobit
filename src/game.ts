// Page-world access to the running game. tibo.dog ships native ES modules, and a module URL
// imported a second time returns the instance the game already uses, so importing the game's
// own chunks gives live access to its classes and content tables without parsing anything.

export type WeaponDef = {
  id: string;
  tier: "base" | "evolved" | "union";
  levels?: unknown[];
  from?: string | string[];
  catalyst?: string;
};
export type PassiveDef = { id: string; maxLevel: number; stat?: string; perLevel?: number };
export type ItemDef = { id: string; tier: "base" | "evolved"; from?: string; catalyst?: string; rarity?: number };
export type EnemyDef = { id: string; hp: number; speed: number; damage: number; radius: number };

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
  biomes: { id: string }[];
  pois: { id?: string; kind?: string }[];
};

export type Offer = { type: "weapon" | "passive" | "item"; id: string; level?: number; isNew?: boolean };
export type Choice = { kind: string; offers?: Offer[]; rewards?: unknown[]; level?: number; gold?: number };

type Column<T = number> = { [index: number]: T | undefined; length: number };
export type SlotPool = { count: number; slotAt(n: number): number; isAlive(slot: number): boolean; id(slot: number): number; has(id: number): boolean };
export type Pool<F extends string> = { pool: SlotPool } & Record<F, Column>;

export type Poi = {
  id: string;
  kind: string;
  x: number;
  y: number;
  radius: number;
  state: { uid: number; used: boolean; charge: number; armed: boolean; goneAt: number };
};
export type Hazard = { kind: string; x: number; y: number; radius: number; strength: number; poolShape: number; turn: number };

/** The game's hit test for a shaped pool: is the point (dx, dy) from its centre inside, with `pad` of slack? */
export type InPool = (poolShape: number, turn: number, dx: number, dy: number, radius: number, pad: number) => boolean;

export type GameState = {
  loadout: {
    level: number;
    xp: number;
    xpNext: number;
    gold: number;
    weapons: { def: WeaponDef; level: number }[];
    passives: { def: PassiveDef; level: number }[];
    items: Map<string, number>;
    /** Ids the player banished this run; the game never offers them again. */
    banished: Set<string>;
    stats: { maxHp: number; moveSpeed: number };
  };
  player: Pool<"x" | "y" | "fx" | "fy" | "hp" | "invuln" | "dashCharges" | "dashCd" | "moving" | "radius">;
  me: number;
  enemies: Pool<"x" | "y" | "hp" | "maxHp" | "radius" | "def" | "flags" | "damage">;
  bosses: Pool<"x" | "y" | "hp" | "maxHp" | "radius" | "def">;
  pickups: Pool<"x" | "y" | "kind" | "source" | "value" | "charge">;
  zones: Pool<"x" | "y" | "radius" | "kind" | "hostile" | "shape" | "life" | "maxLife" | "damage" | "delay" | "angle" | "length" | "poolShape" | "turn">;
  bullets: Pool<"x" | "y" | "radius" | "vx" | "vy" | "damage">;
  world: { activePois: Poi[]; activeHazards: Hazard[] };
  view: { width: number; height: number };
  cfg: {
    activation: { seconds: Record<string, number>; pickupRadius: Record<string, number> };
    /** The Potato Crate's price grows with each one bought; vendors price items by rarity. */
    economy?: { chestPriceBase: number; chestPriceLinear: number; chestPriceQuad: number; chestPriceCubic: number; chestPriceKnee: number; vendorPrice?: number[] };
  };
  paidChestsBought?: number;
  bigUpdate: Record<string, boolean>;
  choiceQueue: Choice[];
  over: boolean;
  paused: boolean;
  tick: number;
  runClock: number;
  run: { timeSec: number; level: number; kills: number; seed: string; damageTakenBySource: Map<string, number> };
  daily: unknown;
};

export type Game = {
  state: GameState;
  setInput(x: number, y: number): void;
  setPaused(paused: boolean): void;
  dash(x: number, y: number): void;
};

/** Enum tables the game exports from its boot chunk, found by shape rather than by minified name. */
export type Enums = {
  pickupKinds: string[];
  zoneKinds: Record<string, number>;
  zoneShapes: Record<string, number>;
  enemyFlags: Record<string, number>;
};

export type Messages = Record<string, string[]>;

export type IconFrame = { x: number; y: number; w: number; h: number; ax: number; ay: number };
export type IconPage = { url: string; width: number; height: number };
/** The game's own icon sprite sheet, keyed by weapon, passive or item id. */
export type IconSheet = IconPage & { frames: Map<string, IconFrame>; pageOf(frame: IconFrame): IconPage };

/** What a copy of the game took when run forward with one input held. */
export type Forecast = { damage: number; bySource: Record<string, number>; dead: boolean; x: number; y: number; hp: number };

const NO_RECORDER = { step() {}, choose() {}, dash() {}, taint() {}, log() {} };

// A deep copy that keeps prototypes (the game's pools are classes) and shared identity within the
// state, but leaves content definitions and rule modules shared, since the sim compares them by identity.
function cloneState<T>(root: T, shared: WeakSet<object>): T {
  const memo = new Map<object, unknown>();
  const copy = (v: unknown): unknown => {
    if (typeof v !== "object" || v === null || shared.has(v)) return v;
    const known = memo.get(v);
    if (known !== undefined) return known;
    if (ArrayBuffer.isView(v)) {
      const c = v instanceof DataView ? new DataView(v.buffer.slice(0)) : (v as unknown as { slice(): object }).slice();
      memo.set(v, c);
      return c;
    }
    if (Array.isArray(v)) {
      const c: unknown[] = [];
      memo.set(v, c);
      for (const x of v) c.push(copy(x));
      return c;
    }
    if (v instanceof Map) {
      const c = new Map();
      memo.set(v, c);
      for (const [k, x] of v) c.set(copy(k), copy(x));
      return c;
    }
    if (v instanceof Set) {
      const c = new Set();
      memo.set(v, c);
      for (const x of v) c.add(copy(x));
      return c;
    }
    const c = Object.create(Object.getPrototypeOf(v)) as Record<string, unknown>;
    memo.set(v, c);
    for (const k of Object.keys(v)) c[k] = copy((v as Record<string, unknown>)[k]);
    return c;
  };
  return copy(root) as T;
}

function reachable(root: unknown, into: WeakSet<object>) {
  const stack = [root];
  while (stack.length > 0) {
    const v = stack.pop();
    if (typeof v !== "object" || v === null || into.has(v) || ArrayBuffer.isView(v)) continue;
    into.add(v);
    if (v instanceof Map) for (const [k, x] of v) stack.push(k, x);
    else if (v instanceof Set) for (const x of v) stack.push(x);
    else for (const x of Object.values(v)) stack.push(x);
  }
}

const isRuleModule = (v: unknown) =>
  typeof v === "object" && v !== null && !Array.isArray(v) && Object.values(v).length > 0 && Object.values(v).every((x) => typeof x === "function");

/** While set, replaces the player's movement input every simulation tick. */
export type Steer = (game: Game) => { x: number; y: number } | undefined;

const SIM_CHUNK = /\/assets\/sim-[\w-]+\.js$/;
const BOOT_CHUNK = /\/assets\/boot-[\w-]+\.js$/;
const ENGLISH_CHUNK = /\/assets\/i18n-en-[\w.-]+\.js$/;

type GamePrototype = { step(): unknown; setInput(x: number, y: number): unknown; choose: unknown };

function isGameClass(value: unknown): value is { prototype: GamePrototype } {
  if (typeof value !== "function") return false;
  const proto = value.prototype as Partial<GamePrototype> | undefined;
  return typeof proto?.step === "function" && typeof proto.setInput === "function" && typeof proto.choose === "function";
}

function findGameClass(ns: Record<string, unknown>) {
  for (const value of Object.values(ns)) {
    if (value === null || typeof value !== "object") continue;
    const candidate = (value as Record<string, unknown>).Game;
    if (isGameClass(candidate)) return candidate;
  }
  throw new Error("the sim chunk no longer exports a Game class");
}

/** Resolves a minified local binding in a chunk to the module and export it was imported from. */
async function importBinding(source: string, sourceUrl: string, local: string): Promise<{ value: unknown; module: Record<string, unknown> }> {
  for (const clause of source.matchAll(/import\{([^}]*)\}from"([^"]+)"/g)) {
    for (const binding of (clause[1] ?? "").split(",")) {
      const [exported = "", as] = binding.split(" as ");
      if ((as ?? exported) !== local) continue;
      const module = (await import(new URL(clause[2] ?? "", sourceUrl).href)) as Record<string, unknown>;
      return { value: module[exported], module };
    }
  }
  throw new Error(`could not find where the sim chunk imports ${local}`);
}

function localAt(source: string, pattern: RegExp, what: string): string {
  const local = source.match(pattern)?.[1];
  if (local === undefined) throw new Error(`could not find the ${what} in the sim chunk`);
  return local;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function findEnums(module: Record<string, unknown>): Enums {
  const values = Object.values(module);
  const pickupKinds = values.find(
    (v): v is string[] => Array.isArray(v) && v[0] === "xp" && v.includes("gold") && v.includes("chest"),
  );
  const zoneKinds = values.find((v): v is Record<string, number> => isRecord(v) && typeof v.telegraph === "number" && typeof v.hazardPool === "number");
  const enemyFlags = values.find((v): v is Record<string, number> => isRecord(v) && typeof v.Elite === "number" && typeof v.Hidden === "number");
  if (pickupKinds === undefined) throw new Error("could not find the pickup kinds table");
  if (zoneKinds === undefined) throw new Error("could not find the zone kinds table");
  const zoneShapes = values.find((v): v is Record<string, number> => isRecord(v) && v.circle === 0 && typeof v.line === "number" && typeof v.cone === "number");
  if (zoneShapes === undefined) throw new Error("could not find the zone shapes table");
  if (enemyFlags === undefined) throw new Error("could not find the enemy flags table");
  return { pickupKinds, zoneKinds, zoneShapes, enemyFlags };
}

function assertContent(value: unknown): asserts value is Content {
  const c = value as Partial<Record<keyof Content, unknown>>;
  for (const key of ["baseWeapons", "evolutions", "unions", "passives", "items", "evolvedItems", "allWeapons", "allItems", "enemies", "bossIds"] as const)
    if (!Array.isArray(c[key])) throw new Error(`content registry has no ${key} list`);
}

export class GameLink {
  game: Game | undefined;
  table: Table | undefined;
  enums: Enums | undefined;
  messages: Messages = {};
  icons: IconSheet | undefined;
  error: string | undefined;
  steer: Steer | undefined;
  inPool: InPool | undefined;
  /** Simulation ticks per game frame; above 1 the game runs faster than real time. */
  speed = 1;
  /** Forecast while the game runs, not only while it is paused; see the `forecast` command. */
  liveForecast = false;
  /** Pause the next new run before its first tick, so agents start every run from tick 0. */
  pauseAtStart = false;
  /** Runs a copy of the game forward once per input, each held for `ticks`; the real game is untouched. */
  forecast: ((game: Game, inputs: { x: number; y: number }[], ticks: number) => Forecast[]) | undefined;
  /** The share link of the last finished run. The game puts it in the address bar (run=...&stats=...) on its summary. */
  runLink: string | undefined;

  noteRunLink() {
    if (!new URLSearchParams(location.search).has("run")) return;
    const share = new URL("/r/", location.origin);
    share.search = location.search;
    this.runLink = share.toString();
  }
  private contentFn: ((bigUpdate: Record<string, boolean>) => Content) | undefined;
  private seen = new Set<string>();
  private listeners = new Set<() => void>();

  constructor() {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) this.saw(entry.name);
    }).observe({ type: "resource", buffered: true });
  }

  get ready(): boolean {
    return this.contentFn !== undefined && this.table !== undefined && this.enums !== undefined;
  }

  onChange(fn: () => void) {
    this.listeners.add(fn);
  }

  /** The content enabled for the current run. */
  content(): Content | undefined {
    if (this.game === undefined || this.contentFn === undefined) return undefined;
    try {
      const content = this.contentFn(this.game.state.bigUpdate);
      assertContent(content);
      return content;
    } catch (e) {
      this.fail(e);
      return undefined;
    }
  }

  message(key: string): string | undefined {
    return this.messages[key]?.[0];
  }

  private changed() {
    for (const fn of this.listeners) fn();
  }

  private fail(e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    if (this.error === message) return;
    this.error = message;
    console.error("[tibobit]", message);
    this.changed();
  }

  private saw(url: string) {
    if (this.seen.has(url)) return;
    this.seen.add(url);
    if (SIM_CHUNK.test(url)) this.attachSim(url).catch((e) => this.fail(e));
    else if (BOOT_CHUNK.test(url))
      // Icons are decoration: without them the helper falls back to initials, so a miss only warns.
      this.loadIcons(url).catch((e) => console.warn("[tibobit] no game icons:", e instanceof Error ? e.message : e));
    else if (ENGLISH_CHUNK.test(url)) this.loadMessages(url).catch((e) => this.fail(e));
  }

  private async attachSim(url: string) {
    const ns = (await import(url)) as Record<string, unknown>;
    const Game = findGameClass(ns);
    const link = this;
    const { step, setInput } = Game.prototype;
    Game.prototype.step = function (this: Game) {
      if (link.game !== this) {
        link.game = this;
        link.changed();
        if (link.pauseAtStart) {
          link.pauseAtStart = false;
          this.setPaused(true);
          return undefined;
        }
      }
      const result = step.call(this);
      // Extra ticks re-steer before each one, so agent commands stay tick-exact at any speed.
      for (let i = 1; i < link.speed; i++) {
        const override = link.steer?.(this);
        if (override !== undefined) setInput.call(this, override.x, override.y);
        step.call(this);
      }
      return result;
    };
    Game.prototype.setInput = function (this: Game, x: number, y: number) {
      const override = link.steer?.(this);
      return setInput.call(this, override?.x ?? x, override?.y ?? y);
    };
    let shared: WeakSet<object> | undefined;
    this.forecast = (game, inputs, ticks) => {
      if (shared === undefined) {
        shared = new WeakSet();
        reachable(link.table, shared);
      }
      for (const v of Object.values(game.state)) if (isRuleModule(v)) shared.add(v as object);
      return inputs.map(({ x, y }) => {
        const sim = Object.assign(Object.create(Object.getPrototypeOf(game) as object) as Game, game, { recorder: NO_RECORDER });
        sim.state = cloneState(game.state, shared ?? new WeakSet());
        sim.state.paused = false;
        setInput.call(sim, x, y);
        const before = new Map(sim.state.run.damageTakenBySource);
        for (let i = 0; i < ticks && !sim.state.over && sim.state.choiceQueue.length === 0; i++) step.call(sim);
        const bySource: Record<string, number> = {};
        let damage = 0;
        for (const [source, total] of sim.state.run.damageTakenBySource) {
          const taken = total - (before.get(source) ?? 0);
          if (taken <= 0) continue;
          bySource[source] = taken;
          damage += taken;
        }
        const { player, me } = sim.state;
        return { damage, bySource, dead: sim.state.over, x: player.x[me] ?? 0, y: player.y[me] ?? 0, hp: player.hp[me] ?? 0 };
      });
    };

    const source = await (await fetch(url)).text();
    // The registry function is called as `x(e.bigUpdate).baseWeapons` and the global table as
    // `w.enemyAt(...)`. Their exported names are minified per build, so follow the import clauses.
    const contentFn = await importBinding(source, url, localAt(source, /([\w$]+)\(e\.bigUpdate\)\.baseWeapons/, "content registry call"));
    if (typeof contentFn.value !== "function") throw new Error("the content registry is not a function");
    const table = await importBinding(source, url, localAt(source, /([\w$]+)\.enemyAt\(/, "content table"));
    if (!isRecord(table.value) || typeof table.value.enemyAt !== "function") throw new Error("the content table has no enemyAt");
    assertContent(table.value);
    this.enums = findEnums(table.module);
    this.table = table.value as Table;
    // The game's own hit test for shaped pools (clover, blob...): called as
    // `x(r.poolShape,r.turn,dx,dy,radius,pad)` and exported by the sim chunk under a minified name.
    const poolLocal = localAt(source, /([\w$]+)\([a-z]\.poolShape,[a-z]\.turn,/, "pool hit test");
    const poolExport = (source.match(/export\{([^}]*)\}/)?.[1] ?? "")
      .split(",")
      .map((b) => b.split(" as "))
      .find(([local]) => local === poolLocal)?.[1];
    const inPool = poolExport === undefined ? undefined : ns[poolExport];
    if (typeof inPool !== "function") throw new Error("the sim chunk does not export its pool hit test");
    this.inPool = inPool as InPool;
    this.contentFn = contentFn.value as (bigUpdate: Record<string, boolean>) => Content;
    this.changed();
  }

  // The boot chunk exports the loader that builds the game's icon sheet, `async function x(){return
  // y(await z())}`, and the helper that points a style at the right atlas page for a frame,
  // `function x(e,t){let n=m.get(t);n!==void 0&&f(e,n)}`. Their export names are minified.
  private async loadIcons(url: string) {
    const source = await (await fetch(url)).text();
    const exported = new Map(
      (source.match(/export\{([^}]*)\}/)?.[1] ?? "").split(",").map((b) => {
        const [local = "", as] = b.split(" as ");
        return [local, as ?? local] as const;
      }),
    );
    const name = (pattern: RegExp, what: string) => {
      const local = source.match(pattern)?.[1];
      const exportedName = local === undefined ? undefined : exported.get(local);
      if (exportedName === undefined) throw new Error(`could not find the ${what} in the boot chunk`);
      return exportedName;
    };
    const loaderName = name(/async function ([\w$]+)\(\)\{return [\w$]+\(await [\w$]+\(\)\)\}/, "icon sheet loader");
    const pageName = name(/function ([\w$]+)\(e,t\)\{let n=[\w$]+\.get\(t\);n!==void 0&&[\w$]+\(e,n\)\}/, "icon page lookup");
    const mod = (await import(url)) as Record<string, unknown>;
    const loader = mod[loaderName];
    const page = mod[pageName];
    if (typeof loader !== "function" || typeof page !== "function") throw new Error("icon exports are not functions");
    const sheet = (await loader()) as IconPage & { frames: unknown };
    if (!(sheet.frames instanceof Map) || typeof sheet.url !== "string") throw new Error("the icon sheet has an unexpected shape");
    const frames = sheet.frames as Map<string, IconFrame>;
    const pageOf = (frame: IconFrame): IconPage => {
      const props: Record<string, string> = {};
      page({ setProperty: (k: string, v: string) => (props[k] = v) }, frame);
      const pageUrl = props["--icon-sheet"]?.match(/^url\("(.*)"\)$/)?.[1];
      if (pageUrl === undefined) return sheet;
      return { url: pageUrl, width: Number(props["--icon-sheet-w"]), height: Number(props["--icon-sheet-h"]) };
    };
    this.icons = { url: sheet.url, width: sheet.width, height: sheet.height, frames, pageOf };
    this.changed();
  }

  private async loadMessages(url: string) {
    const ns = (await import(url)) as Record<string, unknown>;
    for (const value of Object.values(ns)) {
      if (!isRecord(value) || !Object.keys(value).some((k) => k.startsWith("content."))) continue;
      Object.assign(this.messages, value);
    }
    this.changed();
  }
}
