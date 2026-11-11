/** Where the coach's loop stands. */
import { COACH_LOG } from "./paths";
import { FULL_RUN_ITERATION } from "../rules";

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
  if (title === REFLECTION) return { loop: loop + 1, iteration: 1 };
  if (iteration >= FULL_RUN_ITERATION) return { loop, iteration: FULL_RUN_ITERATION };
  return { loop, iteration: iteration + 1 };
}

export const readCoachState = async () => stateFromLog(await Bun.file(COACH_LOG).text().catch(() => ""));

/** An iteration's name, such as L4.I3: it stamps what the iteration writes and starts the ids of its games. */
export const tagOf = (s: CoachState) => `L${s.loop}.I${s.iteration}`;

/** The title of the entry that ends a loop. */
export const REFLECTION = "reflection";

export const logEntry = (state: CoachState, title: string, body: string, at: Date) => `\n## ${tagOf(state)}: ${title} (${at.toISOString().slice(0, 16).replace("T", " ")})\n\n${body.trim()}\n`;

/** One entry per iteration; the last one also tells a restarted loop where it stands (see stateFromLog). */
export async function appendLog(state: CoachState, title: string, body: string) {
  await Bun.write(COACH_LOG, `${await Bun.file(COACH_LOG).text().catch(() => "")}${logEntry(state, title, body, new Date())}`);
}
