// The game as a state machine's guards read it (MachineInput in protocol/machine.ts): numbers only,
// with every kind of thing Tibo can go after counted and measured to its nearest.
import { FAR, type MachineInput, type Near } from "../protocol/machine";
import type { Book } from "../game/book";
import { recentLoss, type World } from "./world";

/** A spot's kind as a machine names it: the game's own kind, and for a variety place its own id (the live view spells it with dashes). */
export const spotKind = (type: string) => type.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase());

export type SpotKind = { kind: string; name: string; about: string };

/** Every kind of spot the game has, with its English name and description. */
export function spotKinds(book: Book): SpotKind[] {
  const kinds: SpotKind[] = [];
  for (const [key, lines] of book.text) {
    const [section, id] = key.split(":");
    // The game's `varietyPlace` kind stands for every variety place; each one is a kind here.
    if ((section !== "poi" && section !== "varietyPlace") || id === undefined || key === "poi:varietyPlace") continue;
    kinds.push({ kind: spotKind(id), name: lines.name ?? id, about: lines.desc ?? "" });
  }
  return kinds.sort((a, z) => a.kind.localeCompare(z.kind));
}

const near = (things: { dist: number }[]): Near => ({ count: things.length, dist: Math.round(things[0]?.dist ?? FAR) });

/** Spots a machine can send Tibo to: the ones that charge by standing in them. */
export const usableSpots = (r: World) => r.spots.filter((x) => x.chargeSeconds > 0);

export function machineInput(r: World, stateSeconds: number, kinds: readonly SpotKind[]): MachineInput {
  const t = r.view.tibo;
  const crowd = r.sectors.map((s) => s.enemies);
  const spots = usableSpots(r);
  return {
    time: Math.round(r.time * 10) / 10,
    stateSeconds: Math.round(stateSeconds * 10) / 10,
    health: { hp: Math.round(r.hp), max: Math.round(r.maxHp), pct: Math.round((r.hp / Math.max(1, r.maxHp)) * 100), lost: Math.round(recentLoss(r)) },
    level: t.level.level,
    gold: t.gold,
    dps: Math.round(r.dps),
    dash: { charges: t.dash.charges, max: t.dash.max },
    loadout: { weapons: r.weapons.length, passives: r.passives.length, evolutionsReady: t.evolves.length },
    enemies: { count: r.view.world.enemiesOnScreen, most: Math.max(0, ...crowd), fewest: Math.min(...crowd), bullets: r.sectors.reduce((n, s) => n + s.bullets, 0) },
    ground: { xp: Math.round(r.view.world.ground.xp), gold: Math.round(r.view.world.ground.gold) },
    bosses: near(r.bosses),
    elites: near(r.elites),
    chests: near(r.chests),
    food: near(r.food),
    magnets: near(r.pickups.filter((x) => x.type === "magnet")),
    spots: near(spots),
    spot: Object.fromEntries(kinds.map(({ kind }) => [kind, near(spots.filter((x) => spotKind(x.type) === kind))])),
  };
}
