import { expect, test } from "bun:test";
import { logEntry, REFLECTION, stateFromLog } from "./coach-log";
import { EXPERIMENT_ITERATIONS, FULL_RUN_ITERATION } from "../rules";

test("the loop goes on from the coach log's last entry", () => {
  const entry = (loop: number, iteration: number, title: string) => logEntry({ loop, iteration }, title, "Text.", new Date(2026, 10, 8, 10));
  expect(stateFromLog("")).toEqual({ loop: 1, iteration: 1 });
  expect(stateFromLog(`${entry(4, 3, "experiments")}\n## Note from the loop manager\n\nx\n`)).toEqual({ loop: 4, iteration: 4 });
  expect(stateFromLog(entry(4, EXPERIMENT_ITERATIONS, "no usable plan"))).toEqual({ loop: 4, iteration: FULL_RUN_ITERATION });
  expect(stateFromLog(entry(4, FULL_RUN_ITERATION, "rehearsal") + entry(4, FULL_RUN_ITERATION, "full run"))).toEqual({ loop: 4, iteration: FULL_RUN_ITERATION });
  expect(stateFromLog(entry(4, FULL_RUN_ITERATION, REFLECTION))).toEqual({ loop: 5, iteration: 1 });
});
