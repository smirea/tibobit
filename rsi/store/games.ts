// How a training game is written into its experiment's file, and what the loop reads back from
// those entries: which loops an experiment had games in, and whether any started from 0:00.

import type { Experiment } from "./experiments";
import type { Gym } from "./gyms";
import { clockPadded } from "../../clock";
import type { GameResult, Start } from "../training/slots";
import { totalsLines } from "../../bot/tallies";

/** A training game's id: its iteration's tag and its place in the iteration, such as L4.I3.G2. */
export const gameId = (tag: string, n: number) => `${tag}.G${n}`;

const FRESH = "a fresh game";

const describeStart = (from: Start, gyms: Gym[]) => {
  if ("gym" in from) {
    const name = from.gym;
    const g = gyms.find((x) => x.name === name);
    return `gym ${from.gym}${g === undefined ? "" : ` (Nightmare ${g.difficulty} at ${clockPadded(g.at)})`}`;
  }
  return `${FRESH} on Nightmare ${from.fresh.difficulty}${from.fresh.weapon === "" ? "" : ` with ${from.fresh.weapon}`}`;
};

export function outcome(r: GameResult): string {
  if (r.error !== undefined) return `not played: ${r.error}`;
  const t = r.result;
  if (t === undefined) return "no result";
  const taken = Object.values(t.damageTaken).reduce((a, b) => a + b, 0);
  const top = Object.entries(t.damageTaken).slice(0, 4).map(([k, v]) => `${k} ${v}`).join(", ");
  return `${t.died ? `died after ${t.survived}s (game clock ${clockPadded(t.end)})` : `alive after ${t.survived}s (game clock ${clockPadded(t.end)}), health ${t.hp.end}/${t.hp.max}`}; damage taken ${Math.round(taken)}${top === "" ? "" : ` (${top})`}; ${t.kills} kills; level ${t.level.start} to ${t.level.end}; planner asked ${t.plannerCalls} times, action model ${t.actionCalls}; the models saw the game ${t.snapshotAgeMs.p50} ms late (p90 ${t.snapshotAgeMs.p90}); ended with ${[...t.weapons, ...t.passives].join(", ") || "nothing"}${r.savedGym === undefined ? "" : `; saved as gym ${r.spec.saveGym?.name}`}`;
}

export function gameEntry(r: GameResult, gyms: Gym[], full: boolean): string {
  const s = r.spec;
  return [
    `### ${s.id}: ${s.label}`,
    "",
    `- Start: ${describeStart(s.from, gyms)}, seed ${r.seed || "?"}${s.loadout === undefined ? "" : `, build swapped for ${[...s.loadout.weapons.map((w) => `${w.id} ${w.level}`), ...s.loadout.passives.map((p) => `${p.id} ${p.level}`), ...s.loadout.items.map((x) => `${x.id} x${x.count}`)].join(", ")}`}; ${s.seconds}s; plays the playbook${s.changes === "" ? "" : ` with ${s.changes}`}.`,
    `- Outcome: ${outcome(r)}.`,
    ...(r.result?.totals === undefined ? [] : totalsLines(r.result.totals).map((l) => `- ${l}`)),
    ...(!full && r.economy !== undefined ? [`- Gold, spots and chests: ${r.economy}.`] : []),
    ...(full && r.stats !== undefined ? ["", r.stats] : []),
  ].join("\n");
}

/** The loops an experiment had games in, from its game ids (L4.I3.G2). */
export const gameLoops = (e: Experiment) => [...e.games.matchAll(/^### L(\d+)\.I\d+\.G\d+/gm)].map((m) => Number(m[1]));

/** Whether an experiment's games include one from a fresh start (0:00 on a new seed). */
export const hasFreshGames = (e: Experiment) => e.games.split("\n").some((line) => line.startsWith(`- Start: ${FRESH}`));
