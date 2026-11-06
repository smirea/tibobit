// Page-world access to the running game. tibo.dog ships native ES modules, and a module URL
// imported a second time returns the instance the game already uses, so importing the game's
// own chunks gives live access to its classes and content tables without parsing anything.

export type WeaponDef = { id: string; tier: "base" | "evolved" | "union"; levels?: unknown[]; from?: string | string[]; catalyst?: string };
export type PassiveDef = { id: string; maxLevel: number };
export type ItemDef = { id: string; tier: "base" | "evolved"; from?: string; catalyst?: string };

export type Content = {
  baseWeapons: WeaponDef[];
  allWeapons: WeaponDef[];
  evolutions: WeaponDef[];
  unions: WeaponDef[];
  passives: PassiveDef[];
  items: ItemDef[];
  evolvedItems: ItemDef[];
  allItems: ItemDef[];
  enemies: { id: string }[];
  bossIds: string[];
};

export type Offer = { type: "weapon" | "passive" | "item"; id: string; level?: number; isNew?: boolean };
export type Choice = { kind: string; offers?: Offer[]; rewards?: unknown[]; level?: number };

export type GameState = {
  loadout: {
    level: number;
    xp: number;
    xpNext: number;
    gold: number;
    weapons: { def: WeaponDef; level: number }[];
    passives: { def: PassiveDef; level: number }[];
    items: Map<string, number>;
  };
  bigUpdate: Record<string, boolean>;
  choiceQueue: Choice[];
  over: boolean;
  paused: boolean;
  tick: number;
  runClock: number;
};

export type Game = { state: GameState };

export type Messages = Record<string, string[]>;

const SIM_CHUNK = /\/assets\/sim-[\w-]+\.js$/;
const ENGLISH_CHUNK = /\/assets\/i18n-en-[\w.-]+\.js$/;

function isGameClass(value: unknown): value is { prototype: { step: () => unknown; choose: unknown } } {
  return typeof value === "function" && typeof value.prototype?.step === "function" && typeof value.prototype?.choose === "function";
}

function findGameClass(ns: Record<string, unknown>) {
  for (const value of Object.values(ns)) {
    if (value === null || typeof value !== "object") continue;
    const candidate = (value as Record<string, unknown>).Game;
    if (isGameClass(candidate)) return candidate;
  }
  throw new Error("the sim chunk no longer exports a Game class");
}

// The content registry is built by a function the sim chunk imports and calls as
// `x(e.bigUpdate).baseWeapons`. Its exported name is minified per build, so find the local
// name at that call site and follow the import clause to the module that exports it.
async function findContentFn(simUrl: string): Promise<(bigUpdate: Record<string, boolean>) => Content> {
  const source = await (await fetch(simUrl)).text();
  const local = source.match(/([\w$]+)\(e\.bigUpdate\)\.baseWeapons/)?.[1];
  if (local === undefined) throw new Error("could not find the content registry call in the sim chunk");
  for (const clause of source.matchAll(/import\{([^}]*)\}from"([^"]+)"/g)) {
    for (const binding of (clause[1] ?? "").split(",")) {
      const [exported = "", as] = binding.split(" as ");
      if ((as ?? exported) !== local) continue;
      const mod = (await import(new URL(clause[2] ?? "", simUrl).href)) as Record<string, unknown>;
      const fn = mod[exported];
      if (typeof fn !== "function") throw new Error(`content registry export ${exported} is not a function`);
      return fn as (bigUpdate: Record<string, boolean>) => Content;
    }
  }
  throw new Error(`could not find where the sim chunk imports ${local}`);
}

function assertContent(value: unknown): asserts value is Content {
  const c = value as Partial<Record<keyof Content, unknown>>;
  for (const key of ["baseWeapons", "evolutions", "unions", "passives", "items", "evolvedItems", "allWeapons", "allItems"] as const)
    if (!Array.isArray(c[key])) throw new Error(`content registry has no ${key} list`);
}

export class GameLink {
  game: Game | undefined;
  messages: Messages = {};
  error: string | undefined;
  private contentFn: ((bigUpdate: Record<string, boolean>) => Content) | undefined;
  private seen = new Set<string>();
  private listeners = new Set<() => void>();

  constructor() {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) this.saw(entry.name);
    }).observe({ type: "resource", buffered: true });
  }

  onChange(fn: () => void) {
    this.listeners.add(fn);
  }

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
    else if (ENGLISH_CHUNK.test(url)) this.loadMessages(url).catch((e) => this.fail(e));
  }

  private async attachSim(url: string) {
    const ns = (await import(url)) as Record<string, unknown>;
    const Game = findGameClass(ns);
    const link = this;
    const step = Game.prototype.step;
    Game.prototype.step = function (this: Game) {
      if (link.game !== this) {
        link.game = this;
        link.changed();
      }
      return step.call(this);
    };
    this.contentFn = await findContentFn(url);
    this.changed();
  }

  private async loadMessages(url: string) {
    const ns = (await import(url)) as Record<string, unknown>;
    for (const value of Object.values(ns)) {
      if (value === null || typeof value !== "object" || !Object.keys(value).some((k) => k.startsWith("content."))) continue;
      Object.assign(this.messages, value);
    }
    this.changed();
  }
}
