#!/usr/bin/env bun
// The learning loop, left to run on its own for one coach. A loop is ten iterations: nine
// experiment iterations, where the coach picks what to focus on and plays up to five short games in
// the training ground (fresh games or gyms, side by side in game slots), then one full run on the
// evaluation seed in a reloaded tab, with the coach's best playbook. After the full run the coach
// reviews it, reflects on its own prompts and rewrites them, and the loop commits gameplay/.
// Everything the coach knows between calls is in gameplay/ (see rsi/store/).
import path from "node:path";
import { updateGyms } from "./store/gyms";
import { EXPERIMENT_ITERATIONS } from "./rules";
import { readCoachState, tagOf } from "./store/coach-log";
import { checkLoopFiles } from "./store/startup";
import { stopping } from "./stop";
import { ladder, shutdown } from "./session";
import { commit } from "./commit";
import { experimentIteration, fullRun, reflect } from "./iterations";
import { standardGyms } from "./gym-builds";
import { LOOPS } from "./flags";

await checkLoopFiles();
const next = (await ladder()) + 1;
await updateGyms((gyms) => {
  for (const g of standardGyms(next)) if (!gyms.some((x) => x.name === g.name)) gyms.push(g);
  // A build the loop was running when it stopped never finished, and one of the loop's own that failed gets another try.
  for (const g of gyms) if (g.status === "building" || (g.status === "failed" && g.coach === "loop")) g.status = "pending";
});
let state = await readCoachState();
for (let played = 0; played < LOOPS && !stopping; played++) {
  while (state.iteration <= EXPERIMENT_ITERATIONS && !stopping) {
    console.log(`== ${tagOf(state)}: experiments`);
    await experimentIteration(state);
    if (stopping) break;
    state = { ...state, iteration: state.iteration + 1 };
  }
  if (stopping) break;
  console.log(`== ${tagOf(state)}: full run`);
  const notesFile = await fullRun(state);
  if (stopping) break;
  await reflect(state, notesFile);
  await commit(state, notesFile);
  state = { loop: state.loop + 1, iteration: 1 };
}
await shutdown(0);
