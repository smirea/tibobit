// What the bot works out each step from the snapshot. The snapshot's `game` is the game's own state
// (src/agent/reflect.ts); this types the parts the bot reads by the game's keys, and computes what
// the bot needs on top: where things are from Tibo, crowds by direction, how long a spot charges
// (the game's cfg.activation), recipes from the game's own weapon and item definitions, and the
// damage taken lately. None of it is sent anywhere as game state.
import { type Catalog, type Combo, type Key, type Loadout, buildCatalog, combosUsing, comboProgress, idOf, nameOf, partState, partner, relevantCombos, toCombo } from "../src/catalog";
import type { Content, Messages } from "../src/game";
import { DIRECTIONS, type Direction, type Encyclopedia, type Forecast, type Snapshot, type Surroundings } from "../src/agent/protocol";

type Row = { uid: number; slot: number; x: number; y: number };
type Owned = { def: string; level: number };
type Poi = { id: string; kind: string; x: number; y: number; radius: number; varietyPlace?: string; variant?: { kind: string }; state: { uid: number; used: boolean; charge: number; goneAt: number } };

/** The parts of the game's state object the bot reads, under the game's own keys. */
export type GameJson = {
  runClock: number;
  tick: number;
  time: number;
  seed: string;
  difficulty: string;
  over: boolean;
  me: number;
  cfg: {
    win: { timeSec: number };
    ladder: { level: number };
    activation: { seconds: Record<string, number>; pickupRadius: Record<string, number> };
    economy?: { chestPriceBase: number; chestPriceLinear: number; chestPriceQuad: number; chestPriceCubic: number; chestPriceKnee: number; vendorPrice?: number[] };
  };
  paidChestsBought?: number;
  player: (Row & { hp: number; dashCharges: number })[];
  loadout: {
    level: number;
    xp: number;
    xpNext: number;
    gold: number;
    weapons: Owned[];
    passives: Owned[];
    items: Record<string, number>;
    banished: string[];
    rerolls: number;
    skips: number;
    banishes: number;
    cursesTaken: number;
    revivesUsed: number;
    stats: Record<string, number>;
    totals: Record<string, number>;
    shrineTotals: Record<string, number>;
  };
  bosses: (Row & { def: string; hp: number; maxHp: number; damage: number; speed: number; radius: number })[];
  pets: (Row & { breed: string; level: number })[];
  world: { activePois: Poi[] };
  waves: { rows: { minute: number; boss?: string; elite?: boolean; events?: string[] }[] };
  choiceQueue: Choice[];
  run: Record<string, unknown> & { damageTakenBySource: Record<string, number>; damageBySource: Record<string, number>; elitesKilled: number; dogHelp: Record<string, Record<string, number>> };
  counters: Record<string, number>;
  goldRushUntil: number;
  frenzyUntil: number;
};

/** The game's open choice as it holds it: a level-up's or chest's offers, a shrine's stat offers, or a shop. */
export type Choice = { kind: string; offers?: Offer[]; poi?: string } & Record<string, unknown>;
export type Offer = ({ type: "weapon" | "passive" | "item"; id: string; level?: number; isNew?: boolean } | { stat: string; label: string; value: number; rarity: number }) & Record<string, unknown>;

export type Placed = { dx: number; dy: number; dist: number; dir: Direction };

export function directionOf(dx: number, dy: number): Direction {
  const octant = Math.round(Math.atan2(dy, dx) / (Math.PI / 4));
  return DIRECTIONS[(octant + 8) % 8] ?? "right";
}

/** The game's content as the bot uses it: English names and descriptions, recipes, and the definitions by id. */
export type Book = {
  catalog: Catalog;
  combos: Combo[];
  text: Map<string, Record<string, string>>;
  dogs: Map<string, Record<string, unknown>>;
};

export function readBook(e: Encyclopedia): Book {
  type Def = { id: string; tier?: string } & Record<string, unknown>;
  const weapons = e.weapons as Def[];
  const items = e.items as Def[];
  const content = {
    allWeapons: weapons,
    baseWeapons: weapons.filter((w) => w.tier === "base"),
    evolutions: weapons.filter((w) => w.tier === "evolved"),
    unions: weapons.filter((w) => w.tier === "union"),
    passives: e.passives,
    allItems: items,
    items: items.filter((i) => i.tier === "base"),
    evolvedItems: items.filter((i) => i.tier === "evolved"),
    enemies: e.enemies,
    bossIds: (e.bosses as Def[]).map((b) => b.id),
  } as unknown as Content;
  const messages: Messages = {};
  const text = new Map<string, Record<string, string>>();
  const sections: [string, unknown[], string][] = [
    ["weapon", e.weapons, "id"],
    ["passive", e.passives, "id"],
    ["item", e.items, "id"],
    ["enemy", e.enemies, "id"],
    ["boss", e.bosses, "id"],
    ["dog", e.dogs, "id"],
    ["poi", e.pois, "kind"],
    ["event", e.events, "id"],
    ["botHelp", e.botHelps, "id"],
    ["biome", e.biomes, "id"],
  ];
  for (const [kind, defs, key] of sections)
    for (const d of defs as Record<string, unknown>[]) {
      const id = d[key];
      if (typeof id !== "string") continue;
      const lines = Object.fromEntries(Object.entries(d).filter((x): x is [string, string] => typeof x[1] === "string" && x[0] !== key));
      text.set(`${kind}:${id}`, lines);
      for (const [field, line] of Object.entries(lines)) messages[`content.${kind}.${id}.${field}`] = [line];
    }
  for (const [k, line] of Object.entries(e.messages)) {
    const m = k.match(/^content\.([^.]+)\.([^.]+)\.([^.]+)$/);
    if (m === null) continue;
    const key = `${m[1]}:${m[2]}`;
    text.set(key, { ...(text.get(key) ?? {}), [m[3] ?? ""]: line });
  }
  const catalog = buildCatalog(content, messages);
  return { catalog, combos: catalog.recipes.map(toCombo), text, dogs: new Map((e.dogs as Def[]).map((d) => [d.id, d])) };
}

/** The game's English line for a content entry, such as its name or desc, or undefined when the game has none. */
export const line = (b: Book, kind: string, id: string, field = "name") => b.text.get(`${kind}:${id}`)?.[field];

/** An elite: the game's own enemy entry, as `surroundings.elites` gives it, with its English name. */
export type Elite = Row & Placed & { def: string; hp: number; maxHp: number; damage: number; name: string };
/** `charged` and `chargeNeeded` are seconds (the game counts charge in ticks); `price` is what a Potato Crate takes now, `prices` a vendor's by rarity. */
export type Spot = Poi & Placed & { uid: number; name: string; description: string; inside: boolean; charged: number; chargeNeeded: number; price?: number; prices?: number[] };
/** `charged` and `chargeNeeded` are seconds, for a pickup opened by standing on it, such as a chest. */
/** A pickup that is not an xp gem, as `surroundings.pickups.items` gives it: the game's own entry, where it is, and its charge in seconds. */
export type Pickup = Row & Placed & { kind: string; value: number; charge: number; charged: number; chargeNeeded?: number };
/** One direction from Tibo: enemies on screen that way, and bullets coming from it within the horizon. */
export type Sector = { dir: Direction; enemies: number; bullets: number };
export type Held = { id: string; name: string; level: number; max: number };

/** Everything the bot reads in one step: the game state, and what is computed from it for the bot. */
export type World = {
  game: GameJson;
  forecast?: Forecast;
  surroundings: Surroundings;
  events: Record<string, unknown>[];
  time: number;
  hp: number;
  maxHp: number;
  x: number;
  y: number;
  weapons: Held[];
  passives: Held[];
  items: { id: string; name: string; count: number }[];
  elites: Elite[];
  bosses: (GameJson["bosses"][number] & Placed & { name: string })[];
  chests: Pickup[];
  food: Pickup[];
  pickups: Pickup[];
  spots: Spot[];
  sectors: Sector[];
  /** Recipes using something held, with each part's state. */
  combos: { combo: Combo; name: string; ready: boolean; parts: { key: Key; name: string; state: string; have?: number; max?: number }[] }[];
  /** Damage taken in the last 3 game seconds, by the game's damage source keys. */
  hurtBy: Record<string, number>;
};

const HURT_WINDOW = 3;
let hurtHistory: { time: number; taken: Record<string, number> }[] = [];

function recentHurt(time: number, taken: Record<string, number>): Record<string, number> {
  if (hurtHistory.length > 0 && (hurtHistory.at(-1)?.time ?? 0) > time) hurtHistory = [];
  hurtHistory.push({ time, taken: { ...taken } });
  while (hurtHistory.length > 1 && (hurtHistory[1]?.time ?? 0) <= time - HURT_WINDOW) hurtHistory.shift();
  const before = hurtHistory[0]?.taken ?? {};
  const out: Record<string, number> = {};
  for (const [source, total] of Object.entries(taken)) {
    const delta = total - (before[source] ?? 0);
    if (delta >= 0.5) out[source] = Math.round(delta * 10) / 10;
  }
  return out;
}

export function loadoutOf(g: GameJson): Loadout {
  const l: Loadout = new Map();
  for (const w of g.loadout.weapons) l.set(`weapon:${w.def}`, w.level);
  for (const p of g.loadout.passives) l.set(`passive:${p.def}`, p.level);
  for (const [id, n] of Object.entries(g.loadout.items)) if (n > 0) l.set(`item:${id}`, n);
  return l;
}

/** Recipes that use `key` and are not made yet, with what each still needs once `key` is held at `level`. */
export function pairings(b: Book, g: GameJson, key: Key, level: number) {
  const now = loadoutOf(g);
  const after: Loadout = new Map(now);
  after.set(key, key.startsWith("item:") ? (now.get(key) ?? 0) + 1 : level);
  return combosUsing(b.combos, key)
    .filter((c) => !now.has(c.result))
    .map((c) => {
      const other = partner(c, key).key;
      return { combo: c, name: nameOf(b.catalog, c.result), partner: nameOf(b.catalog, other), partnerHeld: now.has(other), partnerBanished: g.loadout.banished.includes(idOf(other)), ready: comboProgress(c, after, b.catalog).every((s) => s === "done") };
    });
}

export function see(s: Snapshot, b: Book): World | undefined {
  const g = s.game as GameJson | undefined;
  const around = s.surroundings;
  if (g === undefined || around === undefined) return undefined;
  const me = g.player.find((p) => p.slot === g.me);
  if (me === undefined) return undefined;
  const place = (x: number, y: number): Placed => {
    const dx = x - me.x;
    const dy = y - me.y;
    return { dx, dy, dist: Math.hypot(dx, dy), dir: directionOf(dx, dy) };
  };
  const activation = g.cfg.activation.seconds;
  const pickups = (around.pickups.items as unknown as (Row & Placed & { kind: string; value: number; charge: number })[]).map((p) => ({
    ...p,
    charged: Math.round((p.charge / 60) * 10) / 10,
    ...(activation[p.kind] === undefined ? {} : { chargeNeeded: activation[p.kind] }),
  }));
  // The game's crate price: base + linear·n + quad·n² + cubic·max(0, n − knee)³ for n crates bought, times the stats' chestPriceMult.
  const e = g.cfg.economy;
  const n = g.paidChestsBought ?? 0;
  const cratePrice =
    e === undefined ? undefined : Math.round(Math.round(e.chestPriceBase + e.chestPriceLinear * n + e.chestPriceQuad * n * n + e.chestPriceCubic * Math.max(0, n - e.chestPriceKnee) ** 3) * (g.loadout.stats.chestPriceMult ?? 1));
  const spots = g.world.activePois
    .filter((p) => !p.state.used && p.state.goneAt < 0)
    .map((p) => {
      const at = place(p.x, p.y);
      // A big update spot is a variety place, with its own English and no charge time the game exports, or a variant such as the Spud Forge.
      const variety = p.kind === "bigUpdate" && p.varietyPlace !== undefined ? p.varietyPlace.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`) : undefined;
      return {
        ...p,
        ...at,
        uid: p.state.uid,
        name: (variety === undefined ? line(b, "poi", p.kind) : line(b, "varietyPlace", variety)) ?? p.kind,
        description: (variety === undefined ? line(b, "poi", p.kind, "desc") : line(b, "varietyPlace", variety, "desc")) ?? "",
        inside: at.dist <= p.radius,
        charged: Math.round((p.state.charge / 60) * 10) / 10,
        chargeNeeded: p.kind === "bigUpdate" ? (p.varietyPlace === undefined ? 1.5 : 0) : (activation[p.kind] ?? 0),
        ...(p.kind === "paidChest" && cratePrice !== undefined ? { price: cratePrice } : {}),
        ...(p.kind === "vendor" && e?.vendorPrice !== undefined ? { prices: e.vendorPrice } : {}),
      };
    })
    .sort((a, z) => a.dist - z.dist);
  const sectors = DIRECTIONS.map((dir) => ({
    dir,
    enemies: around.enemies.byDirection[dir],
    bullets: around.bullets.filter((x) => x.from === dir).length,
  }));
  const held = (kind: "weapon" | "passive", o: Owned) => ({ id: o.def, name: nameOf(b.catalog, `${kind}:${o.def}`), level: o.level, max: b.catalog.maxLevel[`${kind}:${o.def}`] ?? 1 });
  const loadout = loadoutOf(g);
  return {
    game: g,
    ...(s.forecast === undefined ? {} : { forecast: s.forecast }),
    surroundings: around,
    events: s.gameEvents ?? [],
    time: g.runClock,
    hp: me.hp,
    maxHp: g.loadout.stats.maxHp ?? 0,
    x: me.x,
    y: me.y,
    weapons: g.loadout.weapons.map((w) => held("weapon", w)),
    passives: g.loadout.passives.map((p) => held("passive", p)),
    items: Object.entries(g.loadout.items)
      .filter(([, n]) => n > 0)
      .map(([id, count]) => ({ id, name: nameOf(b.catalog, `item:${id}`), count })),
    elites: around.elites.map((e) => ({ ...(e as unknown as Elite), name: line(b, "enemy", String(e.def)) ?? String(e.def) })),
    bosses: g.bosses.map((x) => ({ ...x, ...place(x.x, x.y), name: line(b, "boss", x.def) ?? x.def })).sort((a, z) => a.dist - z.dist),
    chests: pickups.filter((p) => p.kind === "chest"),
    food: pickups.filter((p) => p.kind === "heal"),
    pickups,
    spots,
    sectors,
    combos: relevantCombos(b.combos, loadout).map((c) => ({
      combo: c,
      name: nameOf(b.catalog, c.result),
      ready: comboProgress(c, loadout, b.catalog).every((x) => x === "done"),
      parts: c.parts.map((p) => {
        const have = loadout.get(p.key);
        const max = b.catalog.maxLevel[p.key];
        return { key: p.key, name: nameOf(b.catalog, p.key), state: partState(p, loadout, b.catalog), ...(have === undefined ? {} : { have }), ...(max === undefined ? {} : { max }) };
      }),
    })),
    hurtBy: recentHurt(g.runClock, g.run.damageTakenBySource),
  };
}
