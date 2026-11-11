/** Where the coach's loop stands. */
import { COACH_LOG } from "./paths";

export type CoachState = { loop: number; iteration: number };

/**
 * Where the loop goes on from, read off the last entry of the coach's log: an experiment
 * iteration is logged when it is done, and a loop when its reflection is. A full run that never
 * got its reflection is played again.
 */
export function stateFromLog(log: string): CoachState {
  const last = [...log.matchAll(/^## L(\d+)\.I(\d+): ([^(\n]+)/gm)].at(-1);
  if (last === undefined) return { loop: 1, iteration: 1 };
  const [loop, iteration, title] = [Number(last[1]), Number(last[2]), (last[3] ?? "").trim()];
  if (title === "reflection") return { loop: loop + 1, iteration: 1 };
  if (iteration >= 10) return { loop, iteration: 10 };
  return { loop, iteration: iteration + 1 };
}

export const readCoachState = async () => stateFromLog(await Bun.file(COACH_LOG).text().catch(() => ""));
