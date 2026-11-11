// Saved game states the training ground starts games from, kept so ideas can be tried again and
// again under known conditions. A gym is built by playing a fresh game on a seed other than the
// evaluation seed to its time, or saved from the end of a game. A gym the game can no longer load
// (tibo.dog shipped a new game build) is built again on its seed with the build it held.

import type { CheckpointMeta, LoadoutSpec } from "../../protocol/commands";
import type { Templates } from "../../bot/templates";
import { clockPadded } from "../../clock";
import { GYMS_JSONL } from "./paths";
import { withLock } from "./lock";

export type Gym = {
  name: string;
  status: "pending" | "building" | "ready" | "failed" | "retired";
  purpose: string;
  /** "loop" for the gyms the loop keeps from the start, else "coach". */
  coach: string;
  created: string;
  /** The Nightmare level, 1 to GOAL_LEVEL. */
  difficulty: number;
  /** Game seconds the gym is saved at. */
  at: number;
  weapon: string;
  loadout?: LoadoutSpec;
  seed: string;
  /** How it came to be: built from a recipe, or saved at the end of a game. */
  source: string;
  /** Every iteration a game started from it, with when. */
  used?: { iteration: string; at: string }[];
  /** The templates that played up to it, for a rebuild. */
  templates?: Templates;
  /** What Tibo held when it was saved, which a rebuild starts with and puts back at its time. */
  held?: LoadoutSpec;
  checkpoint?: CheckpointMeta;
  error?: string;
};

export const GYM_NAME = /^[a-z0-9]+(-[a-z0-9]+){0,6}$/;

export async function readGyms(): Promise<Gym[]> {
  const f = Bun.file(GYMS_JSONL);
  if (!(await f.exists())) return [];
  return (await f.text())
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => JSON.parse(line) as Gym);
}

/** Changes gyms under the lock. */
export async function updateGyms<T>(change: (gyms: Gym[]) => T | Promise<T>): Promise<T> {
  return withLock(async () => {
    const gyms = await readGyms();
    const out = await change(gyms);
    await Bun.write(GYMS_JSONL, gyms.map((g) => `${JSON.stringify(g)}\n`).join(""));
    return out;
  });
}

/** A ready gym no game here can load as it is, because a game runs another game build than the one it was saved on. */
export const stale = (g: Gym, gameBuilds: string[]) => g.status === "ready" && g.checkpoint !== undefined && gameBuilds.some((b) => b !== g.checkpoint?.build);

export function gymLine(g: Gym, gameBuilds: string[]): string {
  const build = g.checkpoint === undefined ? "" : `; lv ${g.checkpoint.level}, hp ${g.checkpoint.hp}, ${[...g.checkpoint.weapons, ...g.checkpoint.passives, ...g.checkpoint.items].join(", ")}`;
  const used = g.used === undefined || g.used.length === 0 ? "never used" : `used in ${g.used.length} iterations, last ${g.used.at(-1)?.iteration}`;
  const status = stale(g, gameBuilds) ? `ready, but saved on an older game build: ${g.held === undefined ? "replayed from 0:00 by its recipe" : "built again with the build listed here"} before the first game from it` : g.status;
  return `- ${g.name} (${status}${g.error === undefined ? "" : `: ${g.error}`}): Nightmare ${g.difficulty} at ${clockPadded(g.at)}${g.weapon === "" ? "" : `, started with ${g.weapon}`}${g.loadout === undefined ? "" : ", build swapped in at the start"}${build}. ${g.purpose} (by ${g.coach}, ${g.source}; ${used})`;
}

/** Puts a gym in the list, in place of the one with its name. */
export function upsertGym(gyms: Gym[], gym: Gym) {
  const at = gyms.findIndex((g) => g.name === gym.name);
  if (at >= 0) gyms[at] = gym;
  else gyms.push(gym);
}
