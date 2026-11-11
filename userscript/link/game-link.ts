import { assertContent, BOOT_CHUNK, ENGLISH_CHUNK, findEnums, findGameClass, importBinding, isRecord, localAt, SIM_CHUNK } from "./chunks";
import type { Content, Enums, Game, GameEvent, GameState, IconFrame, IconPage, IconSheet, InPool, Messages, Steer, Table } from "../../game/types";
import { cloneState, isRuleModule, NO_RECORDER, reachable } from "./clone";

// Page-world access to the running game. tibo.dog ships native ES modules, and a module URL
// imported a second time returns the instance the game already uses, so importing the game's
// own chunks gives live access to its classes and content tables without parsing anything.

const KEEP_EVENTS = 40;
// Every few seconds or faster, and they would push the rare events out; the snapshot already says
// what they do (hurtBy, dash charges, the boss's position).
const NOISY_EVENTS = new Set(["playerHit", "hitStop", "dodge", "dashed", "block", "throttle", "reelStop", "dogAbility", "bossLanding"]);

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
  /** Pause the next new run before its first tick, so agents start every run from tick 0. */
  pauseAtStart = false;
  /** A deep copy of a game state that shares content definitions and rule modules with it, as the sim needs. */
  copyState: ((state: GameState) => GameState) | undefined;
  /** A copy of the game that steps without recording, rendering or being taken for the live game; `setInput` holds a direction on it, past any agent's steering. */
  simulator: ((game: Game, state: GameState) => { sim: Game; step(): void; setInput(x: number, y: number): void }) | undefined;
  /** The sim chunk's file name, which changes with every game build. */
  simBuild: string | undefined;
  /** The share link of the last finished run. The game puts it in the address bar (run=...&stats=...) on its summary. */
  runLink: string | undefined;
  /** The latest events of the current game, oldest first, each stamped with the game time it was drained at. */
  events: (GameEvent & { time: number })[] = [];

  noteRunLink() {
    if (!new URLSearchParams(location.search).has("run")) return;
    const share = new URL("/r/", location.origin);
    share.search = location.search;
    this.runLink = share.toString();
  }
  private contentFn: (() => Content) | undefined;
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
      const content = this.contentFn();
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
      // Icons are decoration: without them the panel falls back to initials, so a miss only warns.
      this.loadIcons(url).catch((e) => console.warn("[tibobit] no game icons:", e instanceof Error ? e.message : e));
    else if (ENGLISH_CHUNK.test(url)) this.loadMessages(url).catch((e) => this.fail(e));
  }

  private async attachSim(url: string) {
    const ns = (await import(url)) as Record<string, unknown>;
    const Game = findGameClass(ns);
    this.simBuild = url.split("/").at(-1);
    const link = this;
    const { step, setInput, drainEvents } = Game.prototype;
    // The renderer drains the game's events every frame to show banners and effects, so this sees
    // every event once, after the ticks of that frame.
    Game.prototype.drainEvents = function (this: Game) {
      const events = drainEvents.call(this);
      if (this === link.game) {
        for (const e of events) if (!NOISY_EVENTS.has(e.type)) link.events.push({ ...e, time: Math.round(this.state.runClock * 10) / 10 });
        link.events.splice(0, link.events.length - KEEP_EVENTS);
      }
      return events;
    };
    Game.prototype.step = function (this: Game) {
      if (link.game !== this) {
        link.game = this;
        link.events = [];
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
    const copyState = (state: GameState): GameState => {
      if (shared === undefined) {
        shared = new WeakSet();
        reachable(link.table, shared);
      }
      for (const v of Object.values(state)) if (isRuleModule(v)) shared.add(v as object);
      return cloneState(state, shared);
    };
    const simulator = (game: Game, state: GameState) => {
      const sim = Object.assign(Object.create(Object.getPrototypeOf(game) as object) as Game, game, { recorder: NO_RECORDER });
      sim.state = state;
      sim.state.paused = false;
      return { sim, step: () => step.call(sim), setInput: (x: number, y: number) => setInput.call(sim, x, y) };
    };
    this.copyState = copyState;
    this.simulator = simulator;
    const source = await (await fetch(url)).text();
    // The registry function is called as `x().baseWeapons` and the global table as
    // `w.enemyAt(...)`. Their exported names are minified per build, so follow the import clauses.
    const contentFn = await importBinding(source, url, localAt(source, /([\w$]+)\(\)\.baseWeapons/, "content registry call"));
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
    this.contentFn = contentFn.value as () => Content;
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
