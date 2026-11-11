import type { GameLink, GameState } from "../game";
import { DIRECTIONS, type Direction, type Surroundings, type Threats } from "./protocol";

// Volleys, attack zones and hazards farther than this from Tibo are left out.
const REACH = 300;
// Enemies this close count as on Tibo, for standing still.
const NEAR = 60;
const HURT_WINDOW_TICKS = 180;

// Damage taken by source at recent ticks, to say what hurt Tibo lately.
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
const PATH_SAMPLES = [0.25, 0.5, 0.75, 1];

export function directionOf(dx: number, dy: number): Direction {
  const octant = Math.round(Math.atan2(dy, dx) / (Math.PI / 4));
  return DIRECTIONS[(octant + 8) % 8] ?? "right";
}

const round = (n: number) => Math.round(n * 10) / 10;
const bearing = (dx: number, dy: number) => ({ dist: round(Math.hypot(dx, dy)), dir: directionOf(dx, dy) });
const unit = (dir: Direction) => {
  const a = (DIRECTIONS.indexOf(dir) * Math.PI) / 4;
  return { x: Math.cos(a), y: Math.sin(a) };
};

function* alive(p: { pool: { count: number; slotAt(n: number): number; isAlive(slot: number): boolean } }): Generator<number> {
  for (let n = 0; n < p.pool.count; n++) {
    const slot = p.pool.slotAt(n);
    if (slot >= 0 && p.pool.isAlive(slot)) yield slot;
  }
}

/**
 * What is around Tibo, worked out from the game state for agents that should not read every enemy,
 * bullet and hazard: counts, the elites, and what could hit Tibo or what Tibo would walk into within
 * `seconds`. `elites` are the game's own enemy entries.
 */
export function surroundings(link: GameLink, s: GameState, seconds: number, rows: { enemies: Record<string, unknown>[]; pickups: Record<string, unknown>[] }): Surroundings {
  const px = s.player.x[s.me] ?? 0;
  const py = s.player.y[s.me] ?? 0;
  const elites = rows.enemies
    .filter((e) => Array.isArray(e.flags) && (e.flags as string[]).includes("Elite"))
    .map((e) => ({ ...e, ...bearing(Number(e.x) - px, Number(e.y) - py) }))
    .sort((a, b) => a.dist - b.dist);

  const counts: Record<string, number> = {};
  const value = { xp: 0, gold: 0 };
  const items: Surroundings["pickups"]["items"] = [];
  for (const p of rows.pickups) {
    const kind = String(p.kind);
    counts[kind] = (counts[kind] ?? 0) + 1;
    const dx = Number(p.x) - px;
    const dy = Number(p.y) - py;
    if (kind === "xp" || kind === "gold") value[kind] += Number(p.value) || 0;
    else items.push({ ...p, ...bearing(dx, dy) });
  }
  items.sort((a, z) => a.dist - z.dist);

  return { seconds, hurtBy: recentHurt(s), ...threats(link, s, seconds), elites, pickups: { counts, value: { xp: round(value.xp), gold: round(value.gold) }, items } };
}

/** What could hit Tibo, or what Tibo would walk into within `seconds`, in any game state, a copy included. Shapes use the game's own hit test for pools. */
export function threats(link: GameLink, s: GameState, seconds: number): Threats {
  const enums = link.enums;
  const me = s.me;
  const px = s.player.x[me] ?? 0;
  const py = s.player.y[me] ?? 0;
  const radius = s.player.radius[me] ?? 6;
  const reach = s.cfg.player.baseSpeed * s.loadout.stats.moveSpeedMult * seconds;
  const halfW = s.view.width / 2;
  const halfH = s.view.height / 2;
  const hidden = enums?.enemyFlags.Hidden ?? 0;

  const byDirection = Object.fromEntries(DIRECTIONS.map((d) => [d, 0])) as Record<Direction, number>;
  let onScreen = 0;
  let near = 0;
  for (const i of alive(s.enemies)) {
    if ((s.enemies.flags[i] ?? 0) & hidden) continue;
    const dx = (s.enemies.x[i] ?? 0) - px;
    const dy = (s.enemies.y[i] ?? 0) - py;
    if (Math.hypot(dx, dy) <= NEAR) near++;
    if (Math.abs(dx) > halfW || Math.abs(dy) > halfH) continue;
    onScreen++;
    byDirection[directionOf(dx, dy)]++;
  }

  // Straight paths: when each bullet passes closest to a Tibo who stands still, and whether that is a hit.
  const bullets: Threats["bullets"] = [];
  const b = s.bullets;
  for (const i of alive(b)) {
    const dx = (b.x[i] ?? 0) - px;
    const dy = (b.y[i] ?? 0) - py;
    const vx = b.vx[i] ?? 0;
    const vy = b.vy[i] ?? 0;
    const v2 = vx * vx + vy * vy;
    const t = v2 === 0 ? 0 : Math.max(0, -(dx * vx + dy * vy) / v2);
    if (t > seconds) continue;
    const gap = Math.hypot(dx + vx * t, dy + vy * t);
    if (gap > radius + (b.radius[i] ?? 0)) continue;
    bullets.push({ from: directionOf(dx, dy), in: Math.round(t * 100) / 100, damage: round(b.damage[i] ?? 0) });
  }
  bullets.sort((x, y) => x.in - y.in);

  const volleys: Threats["volleys"] = [];
  for (const i of alive(s.emitters)) {
    const dx = (s.emitters.x[i] ?? 0) - px;
    const dy = (s.emitters.y[i] ?? 0) - py;
    if (Math.hypot(dx, dy) > REACH) continue;
    volleys.push({ ...bearing(dx, dy), firesIn: round(s.emitters.telegraph[i] ?? 0), count: s.emitters.count[i] ?? 0, bursts: s.emitters.burstsLeft[i] ?? 0, damage: round(s.emitters.damage[i] ?? 0) });
  }
  volleys.sort((x, y) => x.dist - y.dist);

  const inPool = link.inPool;
  const paths = DIRECTIONS.map((dir) => {
    const u = unit(dir);
    return { dir, points: PATH_SAMPLES.map((f) => ({ x: u.x * reach * f, y: u.y * reach * f })) };
  });
  const entered = (contains: (x: number, y: number) => boolean) => paths.filter((p) => p.points.some((q) => contains(q.x, q.y))).map((p) => p.dir);

  const zoneKind = Object.fromEntries(Object.entries(enums?.zoneKinds ?? {}).map(([k, v]) => [v, k]));
  const zoneShape = Object.fromEntries(Object.entries(enums?.zoneShapes ?? {}).map(([k, v]) => [v, k]));
  const attacks: Threats["attacks"] = [];
  for (const i of alive(s.zones)) {
    if (s.zones.hostile[i] !== 1) continue;
    const r = s.zones.radius[i] ?? 0;
    const shape = zoneShape[s.zones.shape[i] ?? 0] ?? "circle";
    const ax = (s.zones.x[i] ?? 0) - px;
    const ay = (s.zones.y[i] ?? 0) - py;
    const poolShape = s.zones.poolShape[i] ?? 0;
    const turn = s.zones.turn[i] ?? 0;
    // Pools (boss puddles, spore clouds) have the game's own shape; the rest are circles or lines.
    let contains = (x: number, y: number) => (poolShape !== 0 && inPool !== undefined ? inPool(poolShape, turn, x - ax, y - ay, r, 0) : Math.hypot(x - ax, y - ay) <= r);
    let nearest = { x: ax, y: ay };
    if (shape === "line") {
      const angle = s.zones.angle[i] ?? 0;
      const length = s.zones.length[i] ?? 0;
      const ux = Math.cos(angle);
      const uy = Math.sin(angle);
      const closest = (x: number, y: number) => {
        const t = Math.max(0, Math.min(length, (x - ax) * ux + (y - ay) * uy));
        return { x: ax + ux * t, y: ay + uy * t };
      };
      contains = (x, y) => {
        const c = closest(x, y);
        return Math.hypot(x - c.x, y - c.y) <= r;
      };
      nearest = closest(0, 0);
    }
    const at = bearing(nearest.x, nearest.y);
    if (at.dist - r > REACH) continue;
    const kind = zoneKind[s.zones.kind[i] ?? -1] ?? String(s.zones.kind[i]);
    attacks.push({ ...at, kind, shape, inside: contains(0, 0), ...(kind === "telegraph" ? { landsIn: round(s.zones.delay[i] ?? 0) } : {}), enters: entered(contains) });
  }
  attacks.sort((x, y) => x.dist - y.dist);

  const underfoot: string[] = [];
  const hazardPaths: Partial<Record<Direction, string[]>> = {};
  for (const h of s.world.activeHazards) {
    const cx = h.x - px;
    const cy = h.y - py;
    if (Math.hypot(cx, cy) - h.radius > REACH) continue;
    const contains = (x: number, y: number) => (inPool === undefined ? Math.hypot(x - cx, y - cy) <= h.radius : inPool(h.poolShape, h.turn, x - cx, y - cy, h.radius, 0));
    if (contains(0, 0)) {
      if (!underfoot.includes(h.kind)) underfoot.push(h.kind);
      continue;
    }
    for (const dir of entered(contains)) {
      const list = (hazardPaths[dir] ??= []);
      if (!list.includes(h.kind)) list.push(h.kind);
    }
  }

  return { enemies: { onScreen, near, byDirection }, bullets, volleys, attacks, hazards: { underfoot, byDirection: hazardPaths } };
}
