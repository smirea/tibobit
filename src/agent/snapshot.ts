import {
  type Combo,
  type Key,
  type Loadout,
  comboProgress,
  combosUsing,
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

/** The open choice's option cards in on-screen order; `choose` clicks them by this index. */
export function choiceCards(): HTMLElement[] {
  return [...document.querySelectorAll<HTMLElement>("button.ui-card, .ui-card[data-tip]")];
}

const RECOMMENDED_LINE = /(^|\n)★?\s*RECOMMENDED(?=\n|$)/;

function options(d: Data, discovery: Discovery, loadout: Loadout): OptionView[] {
  return choiceCards().map((card, index) => {
    const tip = card.dataset.tip ?? "";
    const text = card.innerText.replace(/[\u2068\u2069]/g, "");
    const recommended = card.querySelector(".ui-pick-badge") !== null || RECOMMENDED_LINE.test(text);
    const label = text.replace(RECOMMENDED_LINE, "").replace(/\n+/g, " | ").trim();
    const offer = offerKey(tip);
    if (offer === undefined) return { index, type: "other", id: tip, name: label, recommended, unseen: false, combos: [] };
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
      ...(type === "item" ? {} : { level: offer.level }),
      recommended,
      unseen: discovery.isNew(offer.key),
      combos: uses.map((c) => {
        const other = partner(c, offer.key).key;
        return { ...comboView(d, discovery, c, after), partner: { key: other, name: nameOf(d.catalog, other) }, partnerHeld: held(c) };
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
  const owned = (key: Key, level: number) => ({ id: key.slice(key.indexOf(":") + 1), name: nameOf(d.catalog, key), level, max: d.catalog.maxLevel[key] ?? 1 });

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
  const hazards: RunView["hazards"] = [];
  for (const h of s.world.activeHazards) {
    const rel = relTo(s, h.x, h.y);
    if (rel.dist - h.radius > HAZARD_RANGE) continue;
    hazards.push({ ...rel, kind: h.kind, source: "terrain", radius: round(h.radius), inside: rel.dist <= h.radius });
  }
  for (const i of alive(s.zones)) {
    if (s.zones.hostile[i] !== 1) continue;
    const radius = s.zones.radius[i] ?? 0;
    const rel = relTo(s, s.zones.x[i] ?? 0, s.zones.y[i] ?? 0);
    hazards.push({
      ...rel,
      kind: zoneKind[s.zones.kind[i] ?? -1] ?? "unknown",
      source: "attack",
      radius: round(radius),
      inside: rel.dist <= radius,
      secondsLeft: round(s.zones.life[i] ?? 0),
    });
  }

  const bullets: RunView["bullets"]["nearest"] = [];
  for (const i of alive(s.bullets)) bullets.push({ ...relTo(s, s.bullets.x[i] ?? 0, s.bullets.y[i] ?? 0), radius: s.bullets.radius[i] ?? 0 });

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
    // Distance from a circle's center to the segment the player would walk in the next 60 units.
    const crosses = (h: { dx: number; dy: number; radius: number }) => {
      const t = Math.max(0, Math.min(PATH_AHEAD, h.dx * ux + h.dy * uy));
      return Math.hypot(h.dx - ux * t, h.dy - uy * t) <= h.radius;
    };
    return {
      dir,
      enemiesNear: within(enemies).filter((e) => e.dist <= 60).length,
      enemiesFar: within(enemies).filter((e) => e.dist <= 150).length,
      nearestEnemy: closest(enemies),
      nearestBoss: closest(bosses),
      nearestBullet: closest(bullets),
      hazard: hazards.find(crosses)?.kind ?? null,
    };
  });
  return {
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
    },
    loadout: {
      weapons: s.loadout.weapons.map((w) => owned(`weapon:${w.def.id}`, w.level)),
      passives: s.loadout.passives.map((p) => owned(`passive:${p.def.id}`, p.level)),
      items: [...s.loadout.items].filter(([, n]) => n > 0).map(([id, count]) => ({ id, name: nameOf(d.catalog, `item:${id}`), count })),
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
      })),
    })),
    ...(choice === undefined ? {} : { choice: { kind: choice.kind, options: options(d, discovery, loadout), raw: toJson(choice) } }),
    bosses: bosses.sort((a, b) => a.dist - b.dist),
    enemies: { total: enemies.length, nearest: nearest(enemies) },
    pickups: { counts, chests: chests.sort((a, b) => a.dist - b.dist), nearest: nearest(loose) },
    pois,
    hazards: nearest(hazards, 20),
    bullets: { total: bullets.length, nearest: nearest(bullets) },
    sectors,
  };
}

export function inRun(link: GameLink): boolean {
  const hud = document.querySelector(".hud-weapons");
  return link.game !== undefined && !link.game.state.over && hud !== null && hud.getClientRects().length > 0;
}

export function snapshot(link: GameLink, discovery: Discovery, commands: CommandStatus[]): Snapshot {
  const base = { capturedAt: Date.now(), commands, ...(link.error === undefined ? {} : { error: link.error }) };
  const game = link.game;
  const ended = game?.state.over ? { lastRun: { time: round(game.state.runClock), level: game.state.run.level, kills: game.state.run.kills } } : {};
  if (game === undefined || !inRun(link)) return { ...base, ...ended, screen: game?.state.over ? "over" : "title" };
  const d = liveData(link);
  if (d === undefined || !link.ready) return { ...base, screen: "run", error: link.error ?? "game content not loaded yet" };
  const s = game.state;
  const screen = s.choiceQueue.length > 0 ? "choice" : s.paused ? "paused" : "run";
  return { ...base, screen, run: runView(link, game, discovery, d) };
}
