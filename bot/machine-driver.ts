// Full Self Driving's state machine at the wheel: each step it is fed the game, and the action of
// the state it is in becomes Tibo's goal, which the autopilot then walks.
import { ACTIONS, type MachineAction, type Way } from "../protocol/machine";
import type { Direction } from "../protocol/geometry";
import type { Inspect } from "../protocol/pilot";
import { clock } from "../clock";
import { renderBlocks } from "./blocks";
import { giveUps, type Goal, goalId, pursuit, setGoal } from "./goals";
import { MachineRunner } from "./machine";
import { machineInput, spotKind, spotKinds, type SpotKind, usableSpots } from "./machine-input";
import type { RunLog } from "./run-log/writer";
import { drive, say, showState } from "./server";
import type { World } from "./world";

/** How often the panel is shown the machine's input while nothing changes, in game seconds. */
const SHOW_EVERY = 1;

function wayOf(way: Way, r: World): Direction {
  if (way !== "fewestEnemies" && way !== "mostEnemies") return way;
  const crowd = [...r.sectors].sort((a, z) => a.enemies - z.enemies);
  const sector = way === "fewestEnemies" ? crowd[0] : crowd.at(-1);
  if (sector === undefined) throw new Error("the game listed no directions");
  return sector.dir;
}

/** The goal an action asks for now, or undefined when there is nothing for it to go after. A target Tibo just gave up on is passed over. */
function goalFor(action: MachineAction, r: World): Goal | undefined {
  const nearest = (kind: "chest" | "poi" | "food" | "elite" | "pickup", things: { id: number }[]): Goal | undefined =>
    things.map((x): Goal => ({ kind, uid: x.id })).find((g) => (giveUps.get(goalId(g)) ?? 0) <= r.time);
  switch (action.type) {
    case "chest":
      return nearest("chest", r.chests);
    case "food":
      return nearest("food", r.food);
    case "magnet":
      return nearest("pickup", r.pickups.filter((x) => x.type === "magnet"));
    case "elite":
      return nearest("elite", r.elites);
    case "spot":
      return nearest("poi", usableSpots(r).filter((x) => action.kind === undefined || spotKind(x.type) === action.kind));
    case "explore":
      return { kind: "explore", dir: wayOf(action.dir, r) };
    case "dash":
      return r.view.tibo.dash.charges > 0 ? { kind: "dash", dir: wayOf(action.dir, r) } : undefined;
    case "still":
      return { kind: "still" };
  }
}

const actionWords = (action: MachineAction) => `${JSON.stringify(action)}: ${ACTIONS[action.type].about}`;

export class MachineDriver {
  private runner: MachineRunner | undefined;
  /** The machine the runner was made from, as sent, to tell when the panel sends another. */
  private sent = "";
  /** The state whose action set the goal under way; `waiting` when that goal only stands in for an action with nothing to go after. */
  private held: { state: string; waiting: boolean } | undefined;
  private shownAt = Number.NEGATIVE_INFINITY;
  private kinds: SpotKind[] | undefined;
  private how: Inspect = { kind: "state", state: "", about: "" };

  private running(r: World): MachineRunner {
    if (drive === undefined) throw new Error("Full Self Driving has no machine to run");
    const sent = JSON.stringify(drive.machine);
    if (this.runner !== undefined && sent === this.sent) return this.runner;
    const replaced = this.runner !== undefined;
    this.runner = new MachineRunner(drive.machine, r.time);
    this.sent = sent;
    this.held = undefined;
    this.entered(r, this.runner, replaced ? "the panel sent another machine, which starts over" : "the machine started");
    return this.runner;
  }

  private entered(r: World, runner: MachineRunner, because: string) {
    const state = runner.machine.states[runner.state];
    this.how = { kind: "state", state: runner.state, about: [state?.description, actionWords(runner.action)].filter(Boolean).join("\n"), because };
    say({ role: "planner", model: "machine", time: r.time, text: runner.state, detail: because, inspect: this.how });
    this.show(r);
  }

  /** One step of the game: the machine reads it, and the state it ends in sets Tibo's goal. */
  step(r: World, log: RunLog) {
    const runner = this.running(r);
    const taken = runner.tick(this.input(r, runner));
    if (taken !== undefined) {
      const because = `${taken.from} -> ${taken.target}${taken.guard === undefined ? "" : ` because ${taken.guard}`}${taken.description === undefined ? "" : ` (${taken.description})`}`;
      log.write(r, { event: "plan", model: "machine", reason: because, action: taken.target });
      this.entered(r, runner, because);
    } else if (r.time - this.shownAt >= SHOW_EVERY) this.show(r);
    this.direct(r, log);
  }

  /** Gives Tibo the goal the machine's state asks for, unless the one it set is still under way. */
  direct(r: World, log: RunLog) {
    const runner = this.running(r);
    if (pursuit !== undefined && this.held?.state === runner.state && !this.held.waiting) return;
    const goal = goalFor(runner.action, r);
    this.held = { state: runner.state, waiting: goal === undefined };
    setGoal(goal ?? { kind: "still" }, r, log, this.how, `the machine is in ${runner.state} since ${clock(runner.since)}`);
  }

  private input(r: World, runner: MachineRunner) {
    this.kinds ??= spotKinds(r.book);
    return machineInput(r, r.time - runner.since, this.kinds);
  }

  /** Tells the panel what the machine reads now and the state it is in. */
  show(r: World) {
    const runner = this.running(r);
    this.shownAt = r.time;
    showState({ time: r.time, state: runner.state, input: this.input(r, runner), blocks: renderBlocks(r) });
  }
}
