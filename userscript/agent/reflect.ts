import type { GameLink } from "../link/game-link";
import type { GameState, Table } from "../../game/types";

/**
 * The game's state object as the game holds it, under the game's own keys, made into JSON:
 * - a column pool (enemies, bullets, pickups and the like: one typed array per column, indexed by
 *   slot) becomes a list of its live entries, each with the pool's `uid`, its `slot` (what the
 *   game's own references hold, such as `me` for the player) and every column;
 * - a column whose numbers index a game table holds that entry's id instead, from the game's own
 *   lookup (an enemy's `def` is "bog-slime", a pickup's `kind` is "xp", a damage `src` is "fry-knives");
 * - a content definition (a weapon, passive, item, enemy, dog and so on) appears as its id, and a
 *   list the game indexes like a content table (each dog breed's help in `run.dogHelp`) is keyed by id;
 * - a class's getters, such as the effective stats, appear as fields;
 * - Maps become objects, Sets and typed arrays become lists, and functions are left out.
 * Nothing is renamed and nothing is computed.
 */
type Reflection = Record<string, unknown>;

// Engine internals that are not the state of the game: per-tick scratch space and spatial indexes the
// sim rebuilds every tick, what only the renderer reads, random number generators, the renderer's
// event queue (drained into the snapshot's `gameEvents`), and the terrain noise and chunk caches the
// world is generated from (its spots and hazards are in `world.activePois` and `world.activeHazards`).
const NOT_STATE: Record<string, readonly string[]> = {
  "": ["rng", "spawnRng", "lootRng", "botRng", "hits", "hash", "buf", "scratch", "attack", "damageRing", "effects", "fx", "colors", "colorIndex", "sourceColors", "recordEvents", "events", "itemFx"],
  world: ["chunks", "activeChunks", "temp", "moist", "height", "biomeByBand"],
};

type Resolve = (n: number) => unknown;
type Pool = { pool: { count: number; slotAt(n: number): number; isAlive(slot: number): boolean; id(slot: number): number } } & Record<string, unknown>;

const isPool = (v: object): v is Pool => {
  const p = (v as { pool?: unknown }).pool as Pool["pool"] | undefined;
  return typeof p?.slotAt === "function" && typeof p.isAlive === "function";
};

function flagNames(flags: Record<string, number>): Resolve {
  return (n) => Object.entries(flags).filter(([, bit]) => bit !== 0 && (n & bit) === bit).map(([name]) => name);
}

/** Columns whose numbers index a game table, by pool key, resolved through the game's own tables. */
function resolvers(link: GameLink, s: GameState, table: Table): Record<string, Record<string, Resolve>> {
  const enums = link.enums;
  const name = (m: Record<string, number> | undefined): Resolve => {
    const byNumber = new Map(Object.entries(m ?? {}).map(([k, v]) => [v, k]));
    return (n) => byNumber.get(n) ?? n;
  };
  const sources = (s as unknown as { sources?: string[] }).sources ?? [];
  const source: Resolve = (n) => sources[n] ?? n;
  return {
    enemies: { def: (n) => table.enemyAt(n)?.id ?? n, flags: enums === undefined ? (n) => n : flagNames(enums.enemyFlags) },
    bosses: { def: (n) => table.bossIdAt(n) ?? n },
    pets: { breed: (n) => table.dogAt(n)?.id ?? n },
    grokBots: { help: (n) => table.botHelpAt(n)?.id ?? n, mode: name(enums?.botModes) },
    pickups: { kind: (n) => enums?.pickupKinds[n] ?? n },
    zones: { kind: name(enums?.zoneKinds), shape: name(enums?.zoneShapes) },
    "*": { src: source, burnSrc: source, lastSrc: source },
  };
}

function contentIds(table: Table): WeakMap<object, string> {
  const ids = new WeakMap<object, string>();
  const lists: unknown[][] = [table.allWeapons, table.passives, table.allItems, table.enemies, table.dogs, table.events, table.botHelps, table.biomes];
  for (const list of lists) for (const d of list) if (typeof d === "object" && d !== null && typeof (d as { id?: unknown }).id === "string") ids.set(d, (d as { id: string }).id);
  return ids;
}

export function reflect(link: GameLink, s: GameState): Reflection {
  const table = link.table;
  if (table === undefined) throw new Error("game content not loaded");
  const resolve = resolvers(link, s, table);
  const ids = contentIds(table);
  // Only the path from the root, so an object reached twice, such as a spot's state, shows both times.
  const path = new Set<object>();

  const value = (v: unknown, at: string): unknown => {
    if (typeof v === "function") return undefined;
    if (typeof v === "number") return Number.isFinite(v) ? v : String(v);
    if (typeof v !== "object" || v === null) return v;
    const id = ids.get(v);
    if (id !== undefined) return id;
    if (ArrayBuffer.isView(v)) {
      const list = Array.from(v as unknown as ArrayLike<number>);
      // The game counts each dog breed's help in a column indexed like its dog table.
      return at.startsWith("run.dogHelp.") ? Object.fromEntries(list.map((n, i) => [table.dogAt(i)?.id ?? String(i), n])) : list;
    }
    if (path.has(v)) return "(cycle)";
    path.add(v);
    try {
      if (isPool(v)) return rows(v, at);
      if (v instanceof Map) return Object.fromEntries([...v].map(([k, x]) => [String(k), value(x, `${at}.${String(k)}`)]));
      if (v instanceof Set) return [...v].map((x) => value(x, at));
      if (Array.isArray(v)) return v.map((x) => value(x, at));
      const skip = NOT_STATE[at] ?? [];
      const out: Record<string, unknown> = {};
      for (const k of Object.keys(v)) {
        if (skip.includes(k)) continue;
        const raw = (v as Record<string, unknown>)[k];
        const r = resolve["*"]?.[k];
        const x = r !== undefined && typeof raw === "number" ? r(raw) : value(raw, at === "" ? k : `${at}.${k}`);
        if (x !== undefined) out[k] = x;
      }
      const proto: unknown = Object.getPrototypeOf(v);
      if (proto !== null && proto !== Object.prototype)
        for (const [k, d] of Object.entries(Object.getOwnPropertyDescriptors(proto))) {
          if (d.get === undefined || k in out) continue;
          try {
            const x = value((v as Record<string, unknown>)[k], `${at}.${k}`);
            if (x !== undefined) out[k] = x;
          } catch {}
        }
      return out;
    } finally {
      path.delete(v);
    }
  };

  const rows = (p: Pool, at: string): Record<string, unknown>[] => {
    const own = resolve[at.split(".").at(-1) ?? ""] ?? {};
    const columns = Object.keys(p).filter((k) => k !== "pool" && ArrayBuffer.isView(p[k]));
    const out: Record<string, unknown>[] = [];
    for (let n = 0; n < p.pool.count; n++) {
      const slot = p.pool.slotAt(n);
      if (slot < 0 || !p.pool.isAlive(slot)) continue;
      const row: Record<string, unknown> = { uid: p.pool.id(slot), slot };
      for (const c of columns) {
        const raw = (p[c] as unknown as ArrayLike<number>)[slot] ?? 0;
        const r = own[c] ?? resolve["*"]?.[c];
        row[c] = r === undefined ? raw : r(raw);
      }
      out.push(row);
    }
    return out;
  };

  return value(s, "") as Reflection;
}
