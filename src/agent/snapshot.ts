import {
  type Combo,
  type Key,
  type Loadout,
  comboProgress,
  combosUsing,
  idOf,
  nameOf,
  partner,
  partState,
  readLoadout,
  relevantCombos,
  unpaired,
} from "../catalog";
import { type Data, liveData } from "../data";
import { modeScreen } from "./menu";
import type { Discovery } from "../discovery";
import type { Game, GameLink, GameState, Poi, Pool, Table } from "../game";
import {
  type BuffView,
  type ComboView,
  type CommandStatus,
  DIRECTIONS,
  type EnemyView,
  type Direction,
  type EventView,
  type ForecastView,
  type OptionView,
  type PickupView,
  type Rel,
  type RunTotals,
  type RunView,
  type Snapshot,
} from "./protocol";

const NEAREST = 10;
const TICKS_PER_SECOND = 60;
const HAZARD_RANGE = 600;
const SECTOR_RANGE = 300;
const PATH_AHEAD = 60;
const HURT_WINDOW_TICKS = 180;
const FORECAST_SECONDS = 0.6;
// The game's own sim, run forward on a copy: exact for every attack, pool and bullet pattern.
const SIM_FORECAST_TICKS = 60;
const XP_RANGE = 120;

// Cumulative damage by source at recent ticks, to report what hurt the player lately.
let hurtHistory: { tick: number; totals: Map<string, number> }[] = [];

function recentHurt(s: GameState): Record<string, number> {
  const totals = new Map(s.run.damageTakenBySource);
  if (hurtHistory.length > 0 && (hurtHistory.at(-1)?.tick ?? 0) > s.tick) hurtHistory = [];
  hurtHistory.push({ tick: s.tick, totals });
  while (hurtHistory.length > 1 && (hurtHistory[1]?.tick ?? 0) <= s.tick - HURT_WINDOW_TICKS) hurtHistory.shift();
  const before = hurtHistory[0]?.totals ?? new Map<string, number>();
  const out: Record<string, number> = {};
  for (const [source, total] of totals) {
    const delta = total - (before.get(source) ?? 0);
    if (delta >= 0.5) out[source] = round(delta);
  }
  return out;
}

/** Every source, largest first, with one decimal, so the total is the run's own and a small ground source still shows. */
function byDamage(m: Map<string, number>): Record<string, number> {
  return Object.fromEntries([...m].sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, Math.round(v * 10) / 10]));
}

export function directionOf(dx: number, dy: number): Direction {
  const octant = Math.round(Math.atan2(dy, dx) / (Math.PI / 4));
  return DIRECTIONS[(octant + 8) % 8] ?? "right";
}

const round = (n: number) => Math.round(n * 10) / 10;

/** The content kind an event's `id` names, for its English name. */
const EVENT_NAMES: Record<string, string> = { bossSpawn: "boss", bossDefeated: "boss", biome: "biome", grokBotHelp: "botHelp", dogJoined: "dog" };

// Three decimals, since stat bonuses such as a shrine's +0.12 damage are fractions.
const exact = (n: number) => Math.round(n * 1000) / 1000;
const numbers = (o: object): Record<string, number> => Object.fromEntries(Object.entries(o).filter((e): e is [string, number] => typeof e[1] === "number" && Number.isFinite(e[1])).map(([k, v]) => [k, exact(v)]));

/** Per dog breed that joined: when, and every kind of help the game counts for it that is not zero. */
function dogs(run: GameState["run"], table: Table): RunTotals["dogs"] {
  const out: RunTotals["dogs"] = {};
  for (const dog of run.dogs) out[dog.id] = { joinedAt: round(dog.at) };
  for (const [help, column] of Object.entries(run.dogHelp))
    for (let i = 0; i < column.length; i++) {
      const v = column[i] ?? 0;
      if (v === 0) continue;
      const id = table.dogAt(i).id;
      (out[id] ??= {})[help] = exact(v);
    }
  return out;
}

/** Every kind of enemy alive, by id, most numerous first: how many, how many elite, the nearest one's distance, and the strongest one's numbers. */
function enemyKinds(enemies: EnemyView[]): RunView["enemies"]["kinds"] {
  const out: RunView["enemies"]["kinds"] = {};
  for (const e of enemies) {
    const k = (out[e.id] ??= { name: e.name, count: 0, elites: 0, nearest: e.dist, maxHp: e.maxHp, damage: e.damage, speed: e.speed, radius: e.radius });
    k.count++;
    if (e.elite) k.elites++;
    k.nearest = Math.min(k.nearest, e.dist);
    k.maxHp = Math.max(k.maxHp, e.maxHp);
    k.damage = Math.max(k.damage, e.damage);
  }
  return Object.fromEntries(Object.entries(out).sort((a, b) => b[1].count - a[1].count));
}

function totals(s: GameState, table: Table): RunTotals {
  const run = s.run;
  return {
    kills: run.kills,
    damageTaken: byDamage(run.damageTakenBySource),
    damageDealt: byDamage(run.damageBySource),
    killsBy: byDamage(run.killsBySource),
    goldEarned: Math.floor(run.goldEarned),
    goldSpent: Math.floor(run.goldSpent),
    bossesKilled: run.bossesKilled,
    elitesKilled: run.elitesKilled,
    bossChests: run.bossChests,
    cratesBought: run.paidChests,
    shrinesUsed: run.shrinesUsed,
    itemsBought: run.itemsBought,
    made: [...run.evolutions, ...run.unions, ...run.itemEvolutions].map((m) => ({ id: m.id, at: round(m.at) })),
    revivesUsed: run.revivesUsed,
    won: run.won,
    ...(run.killer === "" ? {} : { killer: run.killer }),
    counters: { ...numbers(s.counters), ...numbers(run) },
    dogs: dogs(run, table),
    shrineStats: Object.fromEntries(Object.entries(numbers(s.loadout.shrineTotals)).filter(([, v]) => v !== 0)),
  };
}

/** The stats object is a class whose getters fold every source together; read each getter once. */
function statValues(stats: object): Record<string, number> {
  const out: Record<string, number> = {};
  for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(stats))) {
    const value: unknown = (stats as Record<string, unknown>)[key];
    if (typeof value === "number") out[key] = Math.round(value * 1000) / 1000;
  }
  return out;
}

function buffs(s: GameState): BuffView[] {
  const left = (until: number) => round(until - s.time);
  const out: BuffView[] = [];
  if (s.goldRushUntil > s.time) out.push({ id: "goldRush", endsIn: left(s.goldRushUntil), mult: s.goldRushMult });
  if (s.frenzyUntil > s.time) out.push({ id: "frenzy", endsIn: left(s.frenzyUntil) });
  const more = s.moreVariety;
  if (more !== undefined && more.fryRushUntil > s.time) out.push({ id: "fryRush", endsIn: left(more.fryRushUntil), mult: more.fireRate });
  if (more !== undefined && more.picnicUntil > s.time) out.push({ id: "picnic", endsIn: left(more.picnicUntil) });
  return out;
}

function hudScore(): number | undefined {
  const text = document.querySelector(".hud-score-value")?.textContent?.replace(/[^\d]/g, "");
  return text === undefined || text === "" ? undefined : Number(text);
}

function difficultyOf(s: GameState): string {
  return s.difficulty === "nightmare" ? `nightmare-${s.cfg.ladder.level}` : s.difficulty;
}

function relTo(state: GameState, x: number, y: number): Rel {
  const me = state.me;
  const dx = x - (state.player.x[me] ?? 0);
  const dy = y - (state.player.y[me] ?? 0);
  return {
    x: round(x),
    y: round(y),
    dx: round(dx),
    dy: round(dy),
    dist: round(Math.hypot(dx, dy)),
    dir: directionOf(dx, dy),
    onScreen: Math.abs(dx) <= state.view.width / 2 && Math.abs(dy) <= state.view.height / 2,
  };
}

function* alive<F extends string>(p: Pool<F>): Generator<number> {
  for (let n = 0; n < p.pool.count; n++) {
    const slot = p.pool.slotAt(n);
    if (slot >= 0 && p.pool.isAlive(slot)) yield slot;
  }
}

function nearest<T extends { dist: number }>(rows: T[], n = NEAREST): T[] {
  return rows.sort((a, b) => a.dist - b.dist).slice(0, n);
}

function comboView(d: Data, discovery: Discovery, combo: Combo, loadout: Loadout): ComboView {
  const states = comboProgress(combo, loadout, d.catalog);
  return {
    result: combo.result,
    name: nameOf(d.catalog, combo.result),
    kind: combo.recipe.kind,
    ready: states.every((s) => s === "done"),
    made: discovery.made(combo.result),
    parts: combo.parts.map((p) => {
      const have = loadout.get(p.key);
      const max = d.catalog.maxLevel[p.key];
      return {
        key: p.key,
        name: nameOf(d.catalog, p.key),
        need: p.need,
        state: partState(p, loadout, d.catalog),
        ...(have === undefined ? {} : { have }),
        ...(max === undefined ? {} : { max }),
      };
    }),
  };
}

function offerKey(tip: string): { key: Key; level: number } | undefined {
  const offer = tip.match(/^(weapon|passive)-offer:([a-z0-9-]+):(\d+)$/);
  if (offer) return { key: `${offer[1] as "weapon" | "passive"}:${offer[2]}`, level: Number(offer[3]) };
  const item = tip.match(/^item:([a-z0-9-]+)$/);
  if (item) return { key: `item:${item[1]}`, level: 1 };
  return undefined;
}

/**
 * The open choice's options in on-screen order; `choose` clicks them by this index. Level-ups,
 * chests and shrines show cards; shops such as the vendor or the dog kennel show plain buttons.
 */
/** The game's pause menu (Escape or P) stops the run without setting the sim's own paused flag. */
function pauseMenuOpen(): boolean {
  return [...document.querySelectorAll<HTMLButtonElement>("button")].some((b) => !b.closest("#tibo-helper") && b.textContent?.trim() === "Resume" && b.getClientRects().length > 0);
}

export function choiceCards(): HTMLElement[] {
  const cards = [...document.querySelectorAll<HTMLElement>("button.ui-card, .ui-card[data-tip]")];
  // The other buttons of the overlay: Leave in a shop, Reroll and Skip on a level-up. Banish is
  // left out because it only toggles a mode for the next click.
  const buttons = [...document.querySelectorAll<HTMLButtonElement>("button")].filter(
    (b) =>
      !b.matches(".ui-card, .ui-pause-btn, .ui-sound") &&
      !b.closest("#tibo-helper") &&
      b.getClientRects().length > 0 &&
      (b.textContent ?? "").trim() !== "" &&
      !/^banish/i.test((b.textContent ?? "").trim()),
  );
  return [...cards, ...buttons];
}

const RECOMMENDED_LINE = /(^|\n)★?\s*RECOMMENDED(?=\n|$)/;

function options(d: Data, discovery: Discovery, loadout: Loadout, banished: ReadonlySet<string>): OptionView[] {
  return choiceCards().map((card, index) => {
    const tip = card.dataset.tip ?? "";
    const text = card.innerText.replace(/[\u2068\u2069]/g, "");
    const recommended = card.querySelector(".ui-pick-badge") !== null || RECOMMENDED_LINE.test(text);
    const label = text.replace(RECOMMENDED_LINE, "").replace(/\n+/g, " | ").trim();
    const offer = offerKey(tip);
    const available = !(card instanceof HTMLButtonElement && card.disabled);
    if (offer === undefined) return { index, type: "other", id: tip, name: label, label, available, recommended, unseen: false, combos: [] };
    const after: Loadout = new Map(loadout);
    after.set(offer.key, offer.key.startsWith("item:") ? (loadout.get(offer.key) ?? 0) + 1 : offer.level);
    const held = (c: Combo) => loadout.has(partner(c, offer.key).key);
    const uses = combosUsing(d.combos, offer.key)
      .filter((c) => !loadout.has(c.result))
      .sort((a, b) => Number(held(b)) - Number(held(a)));
    const [type = "", id = ""] = offer.key.split(":");
    return {
      index,
      type,
      id,
      name: nameOf(d.catalog, offer.key),
      label,
      available,
      ...(type === "item" ? {} : { level: offer.level }),
      recommended,
      unseen: discovery.isNew(offer.key),
      combos: uses.map((c) => {
        const other = partner(c, offer.key).key;
        return {
          ...comboView(d, discovery, c, after),
          partner: { key: other, name: nameOf(d.catalog, other) },
          partnerHeld: held(c),
          partnerBanished: banished.has(idOf(other)),
        };
      }),
    };
  });
}

function toJson(value: unknown): unknown {
  try {
    return JSON.parse(JSON.stringify(value, (_k, v: unknown) => (v instanceof Map ? Object.fromEntries(v) : v instanceof Set ? [...v] : v)));
  } catch {
    return undefined;
  }
}

let forecastCache: { game: Game; tick: number; outlook: ForecastView[] } | undefined;

// While the game is paused between agent steps, once per tick: the snapshot is pushed many times per
// tick then. A running game is forecast only on request (`forecast` live), and then at most every
// LIVE_FORECAST_TICKS, because each forecast runs the sim nine times over and would slow the game;
// in between, snapshots repeat the last one, a fraction of a second old.
const LIVE_FORECAST_TICKS = 12;
function simForecast(link: GameLink, game: Game): ForecastView[] | undefined {
  const s = game.state;
  if (link.forecast === undefined || s.over || s.choiceQueue.length > 0 || !(s.paused || link.liveForecast)) return undefined;
  const cached = forecastCache?.game === game ? forecastCache : undefined;
  if (cached !== undefined && (cached.tick === s.tick || (!s.paused && s.tick > cached.tick && s.tick - cached.tick < LIVE_FORECAST_TICKS))) return cached.outlook;
  const inputs = [...DIRECTIONS.map((_, i) => ({ x: Math.cos((i * Math.PI) / 4), y: Math.sin((i * Math.PI) / 4) })), { x: 0, y: 0 }];
  // A paused game waits for the agent, so the move lands on this very tick; a running one keeps going meanwhile.
  const outlook = link.forecast(game, inputs, SIM_FORECAST_TICKS, s.paused ? 0 : link.forecastLagTicks).map((f) => ({
    seconds: SIM_FORECAST_TICKS / 60,
    damage: round(f.damage),
    dead: f.dead,
    sources: Object.entries(f.bySource)
      .sort((a, b) => b[1] - a[1])
      .map(([source, damage]) => ({ source, damage: round(damage) })),
  }));
  forecastCache = { game, tick: s.tick, outlook };
  return outlook;
}

function runView(link: GameLink, game: Game, discovery: Discovery, d: Data): RunView {
  const s = game.state;
  const { table, enums } = link;
  if (table === undefined || enums === undefined) throw new Error("game content not loaded");
  const loadout = readLoadout(s);
  const me = s.me;
  const msg = (kind: string, id: string) => link.message(`content.${kind}.${id}.name`) ?? id;
  const owned = (key: Key, level: number) => ({ id: idOf(key), name: nameOf(d.catalog, key), level, max: d.catalog.maxLevel[key] ?? 1 });

  const enemies: RunView["enemies"]["nearest"] = [];
  for (const i of alive(s.enemies)) {
    const flags = s.enemies.flags[i] ?? 0;
    if (flags & (enums.enemyFlags.Hidden ?? 0)) continue;
    const def = table.enemyAt(s.enemies.def[i] ?? 0);
    const id = def?.id ?? "unknown";
    enemies.push({
      ...relTo(s, s.enemies.x[i] ?? 0, s.enemies.y[i] ?? 0),
      uid: s.enemies.pool.id(i),
      id,
      name: msg("enemy", id),
      hp: round(s.enemies.hp[i] ?? 0),
      maxHp: round(s.enemies.maxHp[i] ?? 0),
      damage: round(s.enemies.damage[i] ?? 0),
      radius: s.enemies.radius[i] ?? 0,
      speed: def?.speed ?? 0,
      elite: (flags & (enums.enemyFlags.Elite ?? 0)) !== 0,
    });
  }

  const bosses: RunView["bosses"] = [];
  for (const i of alive(s.bosses)) {
    const id = table.bossIdAt(s.bosses.def[i] ?? 0) ?? "unknown";
    bosses.push({
      ...relTo(s, s.bosses.x[i] ?? 0, s.bosses.y[i] ?? 0),
      id,
      name: msg("boss", id),
      hp: round(s.bosses.hp[i] ?? 0),
      maxHp: round(s.bosses.maxHp[i] ?? 0),
      damage: round(s.bosses.damage[i] ?? 0),
      speed: round(s.bosses.speed[i] ?? 0),
      radius: s.bosses.radius[i] ?? 0,
    });
  }

  const activation = s.cfg.activation.seconds;
  const counts: Record<string, number> = {};
  const chests: PickupView[] = [];
  const gems: Rel[] = [];
  const loose: PickupView[] = [];
  for (const i of alive(s.pickups)) {
    const kind = enums.pickupKinds[s.pickups.kind[i] ?? -1] ?? "unknown";
    counts[kind] = (counts[kind] ?? 0) + 1;
    if (kind === "xp") {
      const rel = relTo(s, s.pickups.x[i] ?? 0, s.pickups.y[i] ?? 0);
      if (rel.dist <= XP_RANGE) gems.push(rel);
      continue;
    }
    const needed = activation[kind];
    const view: PickupView = {
      ...relTo(s, s.pickups.x[i] ?? 0, s.pickups.y[i] ?? 0),
      uid: s.pickups.pool.id(i),
      kind,
      value: round(s.pickups.value[i] ?? 0),
      ...(needed === undefined ? {} : { charge: round((s.pickups.charge[i] ?? 0) / TICKS_PER_SECOND), chargeNeeded: needed }),
    };
    (kind === "chest" ? chests : loose).push(view);
  }

  // The game's own crate price: base + linear·n + quad·n² + cubic·max(0, n − knee)³, n crates bought so far, times the loadout's chestPriceMult.
  const economy = s.cfg.economy;
  const bought = s.paidChestsBought ?? 0;
  const cratePrice =
    economy === undefined
      ? undefined
      : Math.round(
          Math.round(economy.chestPriceBase + economy.chestPriceLinear * bought + economy.chestPriceQuad * bought * bought + economy.chestPriceCubic * Math.max(0, bought - economy.chestPriceKnee) ** 3) *
            ((s.loadout.stats as { chestPriceMult?: number }).chestPriceMult ?? 1),
        );
  // A big update spot is a variety place with its own text, or a variant such as the Spud Forge that has none.
  const spot = (p: Poi) => {
    const variant = p.varietyPlace ?? p.variant?.kind;
    if (p.kind !== "bigUpdate" || variant === undefined) return { name: msg("poi", p.kind), description: link.message(`content.poi.${p.kind}.desc`) ?? "" };
    // Variety place ids are camelCase (chiliBottle) and their English keys kebab-case (chili-bottle).
    const key = variant.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
    return { variant, name: msg("varietyPlace", key), description: link.message(`content.varietyPlace.${key}.desc`) ?? "" };
  };
  const pois = s.world.activePois
    .filter((p) => !p.state.used && p.state.goneAt < 0)
    .map((p) => {
      const rel = relTo(s, p.x, p.y);
      return {
        ...rel,
        uid: p.state.uid,
        kind: p.kind,
        ...spot(p),
        radius: p.radius,
        inside: rel.dist <= p.radius,
        charge: round(p.state.charge / TICKS_PER_SECOND),
        // The game charges a big update variant for 1.5 s; a variety place's own time is not exported, so it reads 0.
        chargeNeeded: p.kind === "bigUpdate" ? (p.varietyPlace === undefined ? 1.5 : 0) : (activation[p.kind] ?? 0),
        used: p.state.used,
        ...(p.kind === "paidChest" && cratePrice !== undefined ? { price: cratePrice } : {}),
        ...(p.kind === "vendor" && economy?.vendorPrice !== undefined ? { prices: economy.vendorPrice } : {}),
      };
    })
    .sort((a, b) => a.dist - b.dist);

  const zoneKind = Object.fromEntries(Object.entries(enums.zoneKinds).map(([k, v]) => [v, k]));
  const zoneShape = Object.fromEntries(Object.entries(enums.zoneShapes).map(([k, v]) => [v, k]));
  const px = s.player.x[me] ?? 0;
  const py = s.player.y[me] ?? 0;
  const inPool = link.inPool;
  // Each area answers "is this point (relative to the player) inside?" with the zone's real shape.
  type Area = { view: RunView["hazards"][number]; contains: (x: number, y: number) => boolean };
  const areas: Area[] = [];
  for (const h of s.world.activeHazards) {
    const rel = relTo(s, h.x, h.y);
    if (rel.dist - h.radius > HAZARD_RANGE) continue;
    const cx = h.x - px;
    const cy = h.y - py;
    const contains = (x: number, y: number) => (inPool === undefined ? Math.hypot(x - cx, y - cy) <= h.radius : inPool(h.poolShape, h.turn, x - cx, y - cy, h.radius, 0));
    areas.push({
      view: { ...rel, kind: h.kind, source: "terrain", shape: "pool", radius: round(h.radius), inside: contains(0, 0) },
      contains,
    });
  }
  for (const i of alive(s.zones)) {
    if (s.zones.hostile[i] !== 1) continue;
    const radius = s.zones.radius[i] ?? 0;
    const shape = zoneShape[s.zones.shape[i] ?? 0] ?? "circle";
    const ax = (s.zones.x[i] ?? 0) - px;
    const ay = (s.zones.y[i] ?? 0) - py;
    const kind = zoneKind[s.zones.kind[i] ?? -1] ?? "unknown";
    const poolShape = s.zones.poolShape[i] ?? 0;
    const turn = s.zones.turn[i] ?? 0;
    // Pools (boss puddles, spore clouds) have their own shape; the rest are circles or lines.
    let contains = (x: number, y: number) =>
      poolShape !== 0 && inPool !== undefined ? inPool(poolShape, turn, x - ax, y - ay, radius, 0) : Math.hypot(x - ax, y - ay) <= radius;
    let nearest = { x: ax, y: ay };
    if (shape === "line") {
      const angle = s.zones.angle[i] ?? 0;
      const length = s.zones.length[i] ?? 0;
      const ux = Math.cos(angle);
      const uy = Math.sin(angle);
      const closestOnLine = (x: number, y: number) => {
        const t = Math.max(0, Math.min(length, (x - ax) * ux + (y - ay) * uy));
        return { x: ax + ux * t, y: ay + uy * t };
      };
      contains = (x, y) => {
        const c = closestOnLine(x, y);
        return Math.hypot(x - c.x, y - c.y) <= radius;
      };
      nearest = closestOnLine(0, 0);
    }
    const rel = relTo(s, px + nearest.x, py + nearest.y);
    if (rel.dist - radius > HAZARD_RANGE) continue;
    const delay = s.zones.delay[i] ?? 0;
    areas.push({
      view: { ...rel, kind, source: "attack", shape, radius: round(radius), inside: contains(0, 0), ...(kind === "telegraph" ? { landsIn: round(delay) } : {}) },
      contains,
    });
  }
  const hazards = areas.map((a) => a.view);

  const bullets: RunView["bullets"]["nearest"] = [];
  for (const i of alive(s.bullets))
    bullets.push({ ...relTo(s, s.bullets.x[i] ?? 0, s.bullets.y[i] ?? 0), radius: s.bullets.radius[i] ?? 0, vx: round(s.bullets.vx[i] ?? 0), vy: round(s.bullets.vy[i] ?? 0) });
  // Straight-line forecast: which bullets reach the player in the next moments for each way it
  // could walk. Bullets that curve or speed up are not modelled.
  const speed = s.cfg.player.baseSpeed * s.loadout.stats.moveSpeedMult;
  const playerRadius = s.player.radius[me] ?? 6;
  const hitsWalking = (ux: number, uy: number) => {
    let hits = 0;
    for (const b of bullets) {
      if (b.dist > 200) continue;
      for (let t = 0; t <= FORECAST_SECONDS; t += 0.05) {
        const gap = Math.hypot(b.dx + b.vx * t - ux * speed * t, b.dy + b.vy * t - uy * speed * t);
        if (gap <= playerRadius + b.radius) {
          hits++;
          break;
        }
      }
    }
    return hits;
  };
  // Chasers re-aim at the player every moment, so a step toward or alongside them still meets them.
  const touchesWalking = (ux: number, uy: number) => {
    let touches = 0;
    for (const e of enemies) {
      if (e.dist > (speed + e.speed) * FORECAST_SECONDS + playerRadius + e.radius) continue;
      let ex = e.dx;
      let ey = e.dy;
      for (let t = 0; t <= FORECAST_SECONDS; t += 0.05) {
        const gx = ux * speed * t - ex;
        const gy = uy * speed * t - ey;
        const gap = Math.hypot(gx, gy);
        if (gap <= playerRadius + e.radius) {
          touches++;
          break;
        }
        ex += (gx / gap) * e.speed * 0.05;
        ey += (gy / gap) * e.speed * 0.05;
      }
    }
    return touches;
  };

  const volleys: RunView["volleys"] = [];
  for (const i of alive(s.emitters)) {
    const rel = relTo(s, s.emitters.x[i] ?? 0, s.emitters.y[i] ?? 0);
    if (rel.dist > HAZARD_RANGE) continue;
    volleys.push({
      ...rel,
      firesIn: round(s.emitters.telegraph[i] ?? 0),
      count: s.emitters.count[i] ?? 0,
      bursts: s.emitters.burstsLeft[i] ?? 0,
      speed: round(s.emitters.speed[i] ?? 0),
      damage: round(s.emitters.damage[i] ?? 0),
    });
  }
  const pets: RunView["pets"] = [];
  for (const i of alive(s.pets)) {
    const id = table.dogAt(s.pets.breed[i] ?? 0).id;
    pets.push({ ...relTo(s, s.pets.x[i] ?? 0, s.pets.y[i] ?? 0), id, name: msg("dog", id), level: s.pets.level[i] ?? 1 });
  }
  const botMode = Object.fromEntries(Object.entries(enums.botModes).map(([k, v]) => [v, k]));
  const helpers: RunView["helpers"] = [];
  for (const i of alive(s.grokBots)) {
    const help = table.botHelpAt(s.grokBots.help[i] ?? 0).id;
    helpers.push({
      ...relTo(s, s.grokBots.x[i] ?? 0, s.grokBots.y[i] ?? 0),
      help,
      name: msg("botHelp", help),
      description: link.message(`content.botHelp.${help}.desc`) ?? "",
      mode: botMode[s.grokBots.mode[i] ?? 0] ?? "unknown",
      leavesIn: round(s.grokBots.timer[i] ?? 0),
    });
  }
  const visitors: RunView["visitors"] = [];
  for (const [who, pool] of [["poteto", s.visitor], ["andrew", s.andrew], ["samir", s.samir]] as const)
    for (const i of alive(pool)) visitors.push({ ...relTo(s, pool.x[i] ?? 0, pool.y[i] ?? 0), who });

  const events: EventView[] = link.events.map((e) => {
    const view = toJson(e) as EventView;
    const named = EVENT_NAMES[e.type];
    if (named !== undefined && typeof e.id === "string") return { ...view, name: msg(named, e.id) };
    const said = e.announcement as { kind?: string; event?: string } | undefined;
    if (e.type === "announce" && said?.kind === "event" && said.event !== undefined)
      return { ...view, name: msg("event", said.event), ...(link.message(`content.event.${said.event}.announce`) === undefined ? {} : { text: link.message(`content.event.${said.event}.announce`) }) };
    return view;
  });
  const schedule = s.waves.rows
    .filter((w) => w.minute * 60 > s.runClock && (w.boss !== undefined || w.elite === true || (w.events?.length ?? 0) > 0))
    .map((w) => ({
      minute: w.minute,
      ...(w.boss === undefined ? {} : { boss: { id: w.boss, name: msg("boss", w.boss) } }),
      elite: w.elite === true,
      events: (w.events ?? []).map((id) => ({ id, name: msg("event", id) })),
    }));
  const stats = s.loadout.stats;
  const dashMax = s.cfg.dash.charges + stats.dashCharges;
  const dashCharges = s.player.dashCharges[me] ?? 0;
  const landmark = s.currentLandmark;
  const score = hudScore();

  const outlook = simForecast(link, game);
  const choice = s.choiceQueue[0];
  const sectors = DIRECTIONS.map((dir, i) => {
    const angle = (i * Math.PI) / 4;
    const ux = Math.cos(angle);
    const uy = Math.sin(angle);
    const within = <T extends Rel>(rows: T[]) => rows.filter((r) => r.dir === dir);
    const closest = (rows: Rel[]) => {
      const d = Math.min(...within(rows).map((r) => r.dist), Number.POSITIVE_INFINITY);
      return d <= SECTOR_RANGE ? round(d) : null;
    };
    const path = [0.25, 0.5, 0.75, 1].map((f) => ({ x: ux * PATH_AHEAD * f, y: uy * PATH_AHEAD * f }));
    const crosses = (a: Area) => path.some((p) => a.contains(p.x, p.y));
    const end = { x: ux * PATH_AHEAD, y: uy * PATH_AHEAD };
    const holding = areas.filter((a) => a.view.inside);
    return {
      dir,
      enemiesNear: within(enemies).filter((e) => e.dist <= 60).length,
      enemiesFar: within(enemies).filter((e) => e.dist <= 150).length,
      nearestEnemy: closest(enemies),
      nearestBoss: closest(bosses),
      nearestBullet: closest(bullets),
      bulletsNear: within(bullets).filter((b) => b.dist <= 60).length,
      hazard: areas.find((a) => !a.view.inside && crosses(a))?.view.kind ?? null,
      leavesHazard: holding.length > 0 && holding.every((a) => !a.contains(end.x, end.y)),
      clearOfAttacks: areas.every((a) => a.view.source !== "attack" || !a.contains(end.x, end.y)),
      bulletHits: hitsWalking(ux, uy),
      enemyTouches: touchesWalking(ux, uy),
      ...(outlook === undefined ? {} : { forecast: outlook[i] }),
      xpNear: within(gems).length,
    };
  });
  return {
    seed: String(s.run.seed),
    daily: s.daily !== undefined,
    difficulty: difficultyOf(s),
    tick: s.tick,
    time: round(s.runClock),
    winAt: s.cfg.win.timeSec,
    ...(score === undefined ? {} : { score }),
    ...(s.daily === undefined
      ? {}
      : { weather: { id: s.daily.weather, name: msg("dailyWeather", s.daily.weather), description: link.message(`content.dailyWeather.${s.daily.weather}.desc`) ?? "" } }),
    gear: Object.entries(s.daily?.kit ?? {}).map(([slot, g]) => ({
      slot,
      id: g.gear,
      name: msg("gear", g.gear),
      description: link.message(`content.gear.${g.gear}.desc`) ?? "",
      lines: g.lines.map((l) => ({ affix: l.affix, roll: l.roll })),
    })),
    biome: { id: s.currentBiome, name: msg("biome", s.currentBiome) },
    ...(landmark === null
      ? {}
      : {
          landmark: {
            id: landmark.biome.id,
            name: msg("biome", landmark.biome.id),
            ...(landmark.event === undefined ? {} : { event: { id: landmark.event, name: msg("event", landmark.event) } }),
          },
        }),
    player: {
      x: round(s.player.x[me] ?? 0),
      y: round(s.player.y[me] ?? 0),
      hp: round(s.player.hp[me] ?? 0),
      maxHp: round(s.loadout.stats.maxHp),
      level: s.loadout.level,
      xp: round(s.loadout.xp),
      xpNext: round(s.loadout.xpNext),
      gold: Math.floor(s.loadout.gold),
      dashCharges,
      dashMax,
      dashReadyIn: dashCharges >= dashMax ? 0 : round((s.player.dashCd[me] ?? 0) / TICKS_PER_SECOND),
      invulnerable: (s.player.invuln[me] ?? 0) > 0,
      stunned: round((s.player.stunTicks[me] ?? 0) / TICKS_PER_SECOND),
      frozen: round((s.player.freezeTicks[me] ?? 0) / TICKS_PER_SECOND),
      slowed: round(s.player.slowT[me] ?? 0),
      revivesLeft: Math.max(0, Math.floor(stats.revivals) - s.loadout.revivesUsed),
      rerolls: s.loadout.rerolls,
      skips: s.loadout.skips,
      banishes: s.loadout.banishes,
      curses: s.loadout.cursesTaken,
      hurtBy: recentHurt(s),
    },
    loadout: {
      weapons: s.loadout.weapons.map((w) => owned(`weapon:${w.def.id}`, w.level)),
      passives: s.loadout.passives.map((p) => owned(`passive:${p.def.id}`, p.level)),
      items: [...s.loadout.items].filter(([, n]) => n > 0).map(([id, count]) => ({ id, name: nameOf(d.catalog, `item:${id}`), count })),
      banished: [...s.loadout.banished],
    },
    stats: statValues(stats),
    statBonuses: Object.fromEntries(Object.entries(numbers(s.loadout.totals)).filter(([, v]) => v !== 0)),
    buffs: buffs(s),
    totals: totals(s, table),
    schedule,
    events,
    combos: relevantCombos(d.combos, loadout).map((c) => comboView(d, discovery, c, loadout)),
    unpaired: unpaired(d.combos, loadout).map((u) => ({
      key: u.held,
      name: nameOf(d.catalog, u.held),
      options: u.options.map((o) => ({
        key: o.partner.key,
        name: nameOf(d.catalog, o.partner.key),
        result: o.combo.result,
        resultName: nameOf(d.catalog, o.combo.result),
        made: discovery.made(o.combo.result),
        banished: s.loadout.banished.has(idOf(o.partner.key)),
      })),
    })),
    ...(choice === undefined ? {} : { choice: { kind: choice.kind, options: options(d, discovery, loadout, s.loadout.banished), raw: toJson(choice) } }),
    bosses: bosses.sort((a, b) => a.dist - b.dist),
    enemies: { total: enemies.length, nearest: nearest(enemies), elites: enemies.filter((e) => e.elite).sort((a, b) => a.dist - b.dist), kinds: enemyKinds(enemies) },
    pickups: { counts, chests: chests.sort((a, b) => a.dist - b.dist), nearest: nearest(loose) },
    pois,
    hazards: nearest(hazards, 20),
    bullets: { total: bullets.length, nearest: nearest(bullets) },
    volleys: nearest(volleys),
    pets,
    helpers,
    visitors,
    standingBulletHits: hitsWalking(0, 0),
    standingEnemyTouches: touchesWalking(0, 0),
    ...(outlook === undefined ? {} : { standingForecast: outlook[DIRECTIONS.length] }),
    sectors,
  };
}

export function inRun(link: GameLink): boolean {
  const hud = document.querySelector(".hud-weapons");
  return link.game !== undefined && !link.game.state.over && hud !== null && hud.getClientRects().length > 0;
}

/** The game keeps its Nightmare ladder in localStorage as {cleared: <highest level won>}. */
function ladderCleared(): number {
  try {
    const cleared = (JSON.parse(localStorage.getItem("tibo.ladder.v1") ?? "{}") as { cleared?: unknown }).cleared;
    return typeof cleared === "number" ? cleared : 0;
  } catch {
    return 0;
  }
}

export function snapshot(link: GameLink, discovery: Discovery, commands: CommandStatus[]): Snapshot {
  link.noteRunLink();
  const game = link.game;
  const playing = game !== undefined && inRun(link);
  const runMode = game === undefined ? undefined : game.state.daily === undefined ? "openWorld" : "daily";
  const mode = playing ? runMode : (modeScreen() ?? runMode);
  const base = {
    capturedAt: Date.now(),
    headless: navigator.webdriver,
    ladderCleared: ladderCleared(),
    ...(link.simBuild === undefined ? {} : { gameBuild: link.simBuild }),
    commands,
    ...(link.error === undefined ? {} : { error: link.error }),
    ...(link.runLink === undefined ? {} : { lastRunLink: link.runLink }),
    ...(mode === undefined ? {} : { mode }),
  };
  const ended = game?.state.over && link.table !== undefined ? { lastRun: { time: round(game.state.runClock), level: game.state.run.level, ...totals(game.state, link.table) } } : {};
  if (!playing) return { ...base, ...ended, screen: game?.state.over ? "over" : "title" };
  const d = liveData(link);
  if (d === undefined || !link.ready) return { ...base, screen: "run", error: link.error ?? "game content not loaded yet" };
  const s = game.state;
  const screen = s.choiceQueue.length > 0 ? "choice" : s.paused || pauseMenuOpen() ? "paused" : "run";
  return { ...base, screen, run: runView(link, game, discovery, d) };
}
