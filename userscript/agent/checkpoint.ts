import type { Game, GameState } from "../../game/types";
import type { GameLink } from "../link/game-link";
import type { CheckpointMeta } from "../../protocol/commands";
import { TICKS_PER_SECOND } from "../../protocol/geometry";
import { isRuleModule } from "../link/clone";
import { pick, WEAPON_SLOTS } from "./loadout";

type Encoded = number | string | boolean | null | { u: 1 } | { n: string } | { b: string } | { s: string } | { r: number };
type Node = { T: string; d: string } | { A: Encoded[] } | { M: [Encoded, Encoded][] } | { S: Encoded[] } | { O: Record<string, Encoded>; P?: string; z?: 1 };
type StateData = { root: Encoded; nodes: Node[] };
export type CheckpointFile = { meta: CheckpointMeta; state: StateData };

const b64 = (u8: Uint8Array) => {
  let s = "";
  for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode(...u8.subarray(i, i + 0x8000));
  return btoa(s);
};
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

// Minified class names repeat across modules (several are "e"), so a class is known by its name
// and its own method names together.
function classKey(proto: object): string {
  const name = (proto as { constructor?: { name?: string } }).constructor?.name ?? "?";
  return `${name}(${Object.getOwnPropertyNames(proto).sort().join(",")})`;
}

const WARM_UP_TICKS = 3 * TICKS_PER_SECOND;
const MAX_CACHED = 3;

/**
 * Saves and restores whole game states inside a run. A state is the game's
 * own object graph: content definitions and rule modules are shared with the page and stored by
 * their path from the content table, and class instances by their class, so the page that loads it
 * must run the same build.
 */
export class Checkpoints {
  private shared: { byObject: Map<object, string>; byPath: Map<string, object> } | undefined;
  private classes = new Map<string, object | "ambiguous">();
  private warmed = false;
  private cache = new Map<string, GameState>();

  constructor(private link: GameLink) {}

  private sim() {
    const { copyState, simulator } = this.link;
    if (copyState === undefined || simulator === undefined) throw new Error("the game's sim is not hooked yet");
    return { copyState, simulator };
  }

  private sharedObjects(state: GameState) {
    if (this.shared === undefined) {
      const byObject = new Map<object, string>();
      const queue: [unknown, string][] = [[this.link.table, "t"]];
      for (const [k, v] of Object.entries(state)) if (isRuleModule(v)) queue.push([v, `r.${k}`]);
      for (let i = 0; i < queue.length; i++) {
        const [v, p] = queue[i] as [unknown, string];
        if ((typeof v !== "object" && typeof v !== "function") || v === null || byObject.has(v) || ArrayBuffer.isView(v)) continue;
        byObject.set(v, p);
        if (v instanceof Map) {
          let n = 0;
          for (const [k, x] of v) {
            queue.push([k, `${p}.k${n}`], [x, `${p}.v${n}`]);
            n++;
          }
        } else if (v instanceof Set) {
          let n = 0;
          for (const x of v) queue.push([x, `${p}.s${n++}`]);
        } else if (typeof v === "object") for (const k of Object.keys(v)) queue.push([(v as Record<string, unknown>)[k], `${p}.${k}`]);
      }
      this.shared = { byObject, byPath: new Map([...byObject].map(([o, p]) => [p, o])) };
    }
    return this.shared;
  }

  encode(state: GameState): StateData {
    const { byObject } = this.sharedObjects(state);
    const ids = new Map<object, number>();
    const nodes: Node[] = [];
    const functions = new Set<string>();
    const enc = (v: unknown): Encoded => {
      if (v === undefined) return { u: 1 };
      if (typeof v === "number") return Number.isFinite(v) ? v : { n: String(v) };
      if (typeof v === "bigint") return { b: String(v) };
      if (typeof v === "string" || typeof v === "boolean") return v;
      if (v === null) return null;
      if (typeof v !== "object" && typeof v !== "function") throw new Error(`cannot save a ${typeof v}`);
      const path = byObject.get(v);
      if (path !== undefined) return { s: path };
      if (typeof v === "function") {
        functions.add(v.name || "anonymous");
        return { u: 1 };
      }
      const known = ids.get(v);
      if (known !== undefined) return { r: known };
      const id = nodes.length;
      ids.set(v, id);
      nodes.push({ A: [] });
      let node: Node;
      if (ArrayBuffer.isView(v)) node = { T: v.constructor.name, d: b64(new Uint8Array(v.buffer, v.byteOffset, v.byteLength)) };
      else if (Array.isArray(v)) node = { A: v.map(enc) };
      else if (v instanceof Map) node = { M: [...v].map(([k, x]) => [enc(k), enc(x)] as [Encoded, Encoded]) };
      else if (v instanceof Set) node = { S: [...v].map(enc) };
      else {
        const proto = Object.getPrototypeOf(v) as object | null;
        const O: Record<string, Encoded> = {};
        for (const k of Object.keys(v)) O[k] = enc((v as Record<string, unknown>)[k]);
        node = proto === null ? { O, z: 1 } : proto === Object.prototype ? { O } : { O, P: classKey(proto) };
      }
      nodes[id] = node;
      return { r: id };
    };
    const root = enc(state);
    // A function in the state is a closure the page cannot rebuild, so such a state cannot be saved.
    if (functions.size > 0) throw new Error(`the state holds functions (${[...functions].join(", ")}), which cannot be saved`);
    return { root, nodes };
  }

  private learnClasses(root: unknown) {
    const seen = new Set<object>();
    const stack = [root];
    while (stack.length > 0) {
      const v = stack.pop();
      if (typeof v !== "object" || v === null || seen.has(v) || ArrayBuffer.isView(v)) continue;
      seen.add(v);
      const proto = Object.getPrototypeOf(v) as object | null;
      if (proto !== null && proto !== Object.prototype && !(v instanceof Map) && !(v instanceof Set) && !Array.isArray(v)) {
        const key = classKey(proto);
        const had = this.classes.get(key);
        if (had === undefined) this.classes.set(key, proto);
        else if (had !== proto) this.classes.set(key, "ambiguous");
      }
      if (v instanceof Map) for (const [k, x] of v) stack.push(k, x);
      else if (v instanceof Set) for (const x of v) stack.push(x);
      else for (const k of Object.keys(v)) stack.push((v as Record<string, unknown>)[k]);
    }
  }

  /**
   * Weapons create their entity pools the first time they fire, so a page that has not seen a
   * weapon lacks its classes. A copy of the run fires every weapon in the game for a few seconds.
   */
  private warmUp(game: Game) {
    if (this.warmed) return;
    const content = this.link.content();
    if (content === undefined) throw new Error("the game's content is not loaded yet");
    const { copyState, simulator } = this.sim();
    const ids = content.allWeapons.map((w) => w.id);
    for (let at = 0; at < ids.length; at += WEAPON_SLOTS) {
      const { sim, step } = simulator(game, copyState(game.state));
      sim.state.loadout.weapons.length = 0;
      sim.state.choiceQueue.length = 0;
      for (const id of ids.slice(at, at + WEAPON_SLOTS)) pick(sim, { type: "weapon", id, level: 1, isNew: true });
      for (let i = 0; i < WARM_UP_TICKS && !sim.state.over; i++) {
        sim.state.choiceQueue.length = 0;
        step();
      }
      this.learnClasses(sim.state);
    }
    this.warmed = true;
  }

  decode(data: StateData, game: Game): GameState {
    const { byPath } = this.sharedObjects(game.state);
    this.learnClasses(game.state);
    const needed = new Set(data.nodes.flatMap((n) => ("P" in n && n.P !== undefined ? [n.P] : [])));
    if ([...needed].some((k) => !this.classes.has(k))) this.warmUp(game);
    const missing = [...needed].filter((k) => !this.classes.has(k));
    const ambiguous = [...needed].filter((k) => this.classes.get(k) === "ambiguous");
    if (missing.length > 0 || ambiguous.length > 0)
      throw new Error(`this page cannot rebuild classes ${[...missing, ...ambiguous.map((k) => `${k} (two classes share this name)`)].join(", ")}`);
    const made: unknown[] = new Array(data.nodes.length);
    const dec = (x: Encoded): unknown => {
      if (x === null || typeof x !== "object") return x;
      if ("u" in x) return undefined;
      if ("n" in x) return Number(x.n);
      if ("b" in x) return BigInt(x.b);
      if ("s" in x) {
        const o = byPath.get(x.s);
        if (o === undefined) throw new Error(`the page has no shared object at ${x.s}; the checkpoint is from another build`);
        return o;
      }
      return node(x.r);
    };
    const node = (id: number): unknown => {
      if (made[id] !== undefined) return made[id];
      const n = data.nodes[id];
      if (n === undefined) throw new Error(`the checkpoint has no node ${id}`);
      if ("T" in n) {
        const bytes = unb64(n.d);
        const View = (globalThis as unknown as Record<string, new (b: ArrayBuffer) => unknown>)[n.T];
        if (View === undefined) throw new Error(`no typed array ${n.T}`);
        return (made[id] = new View(bytes.buffer));
      }
      if ("A" in n) {
        const a: unknown[] = [];
        made[id] = a;
        for (const x of n.A) a.push(dec(x));
        return a;
      }
      if ("M" in n) {
        const m = new Map();
        made[id] = m;
        for (const [k, x] of n.M) m.set(dec(k), dec(x));
        return m;
      }
      if ("S" in n) {
        const s = new Set();
        made[id] = s;
        for (const x of n.S) s.add(dec(x));
        return s;
      }
      const proto = n.z === 1 ? null : n.P === undefined ? Object.prototype : (this.classes.get(n.P) as object);
      const o = Object.create(proto) as Record<string, unknown>;
      made[id] = o;
      for (const [k, x] of Object.entries(n.O)) o[k] = dec(x);
      return o;
    };
    return dec(data.root) as GameState;
  }

  save(game: Game, name: string): CheckpointFile {
    const s = game.state;
    const { copyState } = this.sim();
    this.remember(name, copyState(s));
    const meta: CheckpointMeta = {
      name,
      build: this.link.simBuild ?? "unknown",
      seed: s.run.seed,
      mode: s.mode,
      difficulty: s.difficulty,
      time: Math.round(s.runClock * 10) / 10,
      level: s.loadout.level,
      hp: Math.round(s.player.hp[s.me] ?? 0),
      weapons: s.loadout.weapons.map((w) => `${w.def.id} ${w.level}`),
      passives: s.loadout.passives.map((p) => `${p.def.id} ${p.level}`),
      items: [...s.loadout.items].map(([id, count]) => (count > 1 ? `${id} x${count}` : id)),
      savedAt: new Date().toISOString(),
    };
    return { meta, state: this.encode(s) };
  }

  private remember(name: string, state: GameState) {
    this.cache.delete(name);
    this.cache.set(name, state);
    for (const key of this.cache.keys()) {
      if (this.cache.size <= MAX_CACHED) break;
      this.cache.delete(key);
    }
  }

  /** Whether this page holds the checkpoint already, so loading it needs no download. */
  has(name: string): boolean {
    return this.cache.has(name);
  }

  drop(name: string) {
    this.cache.delete(name);
  }

  /** Swaps the run's state for the checkpoint's. The run is tainted and waits paused, as a new run does. */
  load(game: Game, name: string, file?: CheckpointFile) {
    if (file !== undefined) {
      if (file.meta.build !== this.link.simBuild) throw new Error(`checkpoint ${name} was saved on game build ${file.meta.build}; this page runs ${this.link.simBuild ?? "an unknown build"}`);
      this.remember(name, this.decode(file.state, game));
    }
    const saved = this.cache.get(name);
    if (saved === undefined) throw new Error(`checkpoint ${name} is not loaded in this page`);
    const { copyState } = this.sim();
    game.state = copyState(saved);
    this.link.events = [];
    // A loaded state no longer replays from the run's inputs, so the game must not post it to boards or count it as a win.
    game.taint();
    game.setPaused(true);
  }

}
