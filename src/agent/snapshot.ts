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
import type { Discovery } from "../discovery";
import type { Game, GameLink, GameState, Pool } from "../game";
import { type ComboView, type CommandStatus, DIRECTIONS, type Direction, type OptionView, type PickupView, type Rel, type RunView, type Snapshot } from "./protocol";

const NEAREST = 10;
const TICKS_PER_SECOND = 60;
const HAZARD_RANGE = 600;
const MAX_POIS = 15;
const SECTOR_RANGE = 300;
const PATH_AHEAD = 60;
const HURT_WINDOW_TICKS = 180;
const PLAYER_SPEED = 62;
const FORECAST_SECONDS = 0.6;

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

function byDamage(m: Map<string, number>): Record<string, number> {
  return Object.fromEntries([...m].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([k, v]) => [k, Math.round(v)]));
}

export function directionOf(dx: number, dy: number): Direction {
  const octant = Math.round(Math.atan2(dy, dx) / (Math.PI / 4));
  return DIRECTIONS[(octant + 8) % 8] ?? "right";
}

const round = (n: number) => Math.round(n * 10) / 10;

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
    const id = table.enemyAt(s.enemies.def[i] ?? 0)?.id ?? "unknown";
    enemies.push({
      ...relTo(s, s.enemies.x[i] ?? 0, s.enemies.y[i] ?? 0),
      id,
      name: msg("enemy", id),
      hp: round(s.enemies.hp[i] ?? 0),
      radius: s.enemies.radius[i] ?? 0,
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
      radius: s.bosses.radius[i] ?? 0,
    });
  }

  const activation = s.cfg.activation.seconds;
  const counts: Record<string, number> = {};
  const chests: PickupView[] = [];
  const loose: PickupView[] = [];
  for (const i of alive(s.pickups)) {
    const kind = enums.pickupKinds[s.pickups.kind[i] ?? -1] ?? "unknown";
    counts[kind] = (counts[kind] ?? 0) + 1;
    if (kind === "xp") continue;
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

  const pois = s.world.activePois
    .filter((p) => !p.state.used && p.state.goneAt < 0)
    .map((p) => {
      const rel = relTo(s, p.x, p.y);
      return {
        ...rel,
        uid: p.state.uid,
        kind: p.kind,
        name: msg("poi", p.kind),
        radius: p.radius,
        inside: rel.dist <= p.radius,
        charge: round(p.state.charge / TICKS_PER_SECOND),
        chargeNeeded: activation[p.kind] ?? 0,
        used: p.state.used,
      };
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, MAX_POIS);

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
  const speed = PLAYER_SPEED * (s.loadout.stats.moveSpeed > 0 ? s.loadout.stats.moveSpeed : 1);
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
    };
  });
  return {
    seed: String(s.run.seed),
    daily: s.daily !== undefined,
    tick: s.tick,
    time: round(s.runClock),
    player: {
      x: round(s.player.x[me] ?? 0),
      y: round(s.player.y[me] ?? 0),
      hp: round(s.player.hp[me] ?? 0),
      maxHp: round(s.loadout.stats.maxHp),
      level: s.loadout.level,
      xp: round(s.loadout.xp),
      xpNext: round(s.loadout.xpNext),
      gold: Math.floor(s.loadout.gold),
      dashCharges: s.player.dashCharges[me] ?? 0,
      invulnerable: (s.player.invuln[me] ?? 0) > 0,
      hurtBy: recentHurt(s),
    },
    loadout: {
      weapons: s.loadout.weapons.map((w) => owned(`weapon:${w.def.id}`, w.level)),
      passives: s.loadout.passives.map((p) => owned(`passive:${p.def.id}`, p.level)),
      items: [...s.loadout.items].filter(([, n]) => n > 0).map(([id, count]) => ({ id, name: nameOf(d.catalog, `item:${id}`), count })),
      banished: [...s.loadout.banished],
    },
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
    enemies: { total: enemies.length, nearest: nearest(enemies) },
    pickups: { counts, chests: chests.sort((a, b) => a.dist - b.dist), nearest: nearest(loose) },
    pois,
    hazards: nearest(hazards, 20),
    bullets: { total: bullets.length, nearest: nearest(bullets) },
    standingBulletHits: hitsWalking(0, 0),
    sectors,
  };
}

export function inRun(link: GameLink): boolean {
  const hud = document.querySelector(".hud-weapons");
  return link.game !== undefined && !link.game.state.over && hud !== null && hud.getClientRects().length > 0;
}

export function snapshot(link: GameLink, discovery: Discovery, commands: CommandStatus[]): Snapshot {
  link.noteRunLink();
  const base = {
    capturedAt: Date.now(),
    commands,
    ...(link.error === undefined ? {} : { error: link.error }),
    ...(link.runLink === undefined ? {} : { lastRunLink: link.runLink }),
  };
  const game = link.game;
  const ended = game?.state.over
    ? { lastRun: { time: round(game.state.runClock), level: game.state.run.level, kills: game.state.run.kills, damageTaken: byDamage(game.state.run.damageTakenBySource) } }
    : {};
  if (game === undefined || !inRun(link)) return { ...base, ...ended, screen: game?.state.over ? "over" : "title" };
  const d = liveData(link);
  if (d === undefined || !link.ready) return { ...base, screen: "run", error: link.error ?? "game content not loaded yet" };
  const s = game.state;
  const screen = s.choiceQueue.length > 0 ? "choice" : s.paused ? "paused" : "run";
  return { ...base, screen, run: runView(link, game, discovery, d) };
}
