// What the bot reads each step: the agent server's live view of the game (LiveView), with the
// targets of every direction gathered into lists, and the game's own run tallies, which the bot asks
// for with `raw` to write its logs and results.
import type { Aim, DirectionView, LiveView, LoadoutItem, State } from "../protocol/view";
import { type Direction, DIRECTIONS } from "../protocol/geometry";

/** Where a target is: its distance, and the way to walk to it, or "still" when Tibo stands on or in it. */
export type Placed = { dist: number; dir: Direction | "still" };
export type Target = Aim & Placed;
export type Chest = Target & { charged: number; chargeSeconds: number };
export type Fighter = Target & { hp: number; maxHp: number };
export type Spot = Target & { charged: number; chargeSeconds: number; inside: boolean };
/** One direction from Tibo: enemies on screen that way, and bullets coming from it within the horizon. */
export type Sector = { dir: Direction; enemies: number; bullets: number };

/** The game's own run tallies the bot reads, under the game's keys (`raw=run,counters`). */
export type RunJson = Record<string, unknown> & { seed: string; kills: number; killer: string; damageTakenBySource: Record<string, number>; damageBySource: Record<string, number>; elitesKilled: number };

export type World = {
  state: State;
  view: LiveView;
  run: RunJson;
  counters: Record<string, number>;
  time: number;
  hp: number;
  maxHp: number;
  x: number;
  y: number;
  weapons: LoadoutItem[];
  passives: LoadoutItem[];
  items: LiveView["tibo"]["items"];
  elites: Fighter[];
  bosses: Fighter[];
  chests: Chest[];
  food: Target[];
  pickups: Target[];
  spots: Spot[];
  sectors: Sector[];
  hurtBy: Record<string, number>;
  dps: number;
};

export function see(s: State): World | undefined {
  const { time, tibo, directions } = s;
  const run = s.game?.run as RunJson | undefined;
  if (time === undefined || tibo === undefined || directions === undefined || s.world === undefined || s.attacks === undefined || run === undefined) return undefined;
  const view = { time, world: s.world, tibo, directions, attacks: s.attacks, ...(s.choice === undefined ? {} : { choice: s.choice }) } as LiveView;
  const gather = <T extends Aim>(pick: (d: DirectionView) => T[] | undefined): (T & Placed)[] =>
    ([...DIRECTIONS, "still"] as const)
      .flatMap((dir) => {
        const d = directions[dir];
        return (d === undefined ? [] : (pick(d) ?? [])).map((t) => ({ ...t, dist: t.distance, dir }));
      })
      .sort((a, z) => a.dist - z.dist);
  return {
    state: s,
    view,
    run,
    counters: (s.game?.counters ?? {}) as Record<string, number>,
    time,
    hp: tibo.life.hp,
    maxHp: tibo.life.max,
    x: tibo.position.x,
    y: tibo.position.y,
    weapons: tibo.weapons,
    passives: tibo.passives,
    items: tibo.items,
    elites: gather((d) => d.elites),
    bosses: gather((d) => d.bosses),
    chests: gather((d) => d.chests),
    food: gather((d) => d.food),
    pickups: gather((d) => d.pickups),
    spots: gather((d) => d.spots).map((x) => ({ ...x, inside: x.dir === "still" })),
    sectors: DIRECTIONS.map((dir) => ({ dir, enemies: directions[dir]?.enemies ?? 0, bullets: directions[dir]?.bullets ?? 0 })),
    hurtBy: tibo.hurtBy,
    dps: tibo.dps,
  };
}

/** What the game keeps of a run that ended, read with `raw`. */
export type EndJson = { runClock: number; over: boolean; run: World["run"]; counters: Record<string, number>; loadout: { level: number; shrineTotals: Record<string, number> } };
