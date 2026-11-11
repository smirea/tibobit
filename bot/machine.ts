// Runs Full Self Driving's state machine (protocol/machine.ts) in XState: every step of the game is
// one `tick` event carrying the game state, and the guards of the active state's transitions decide
// whether the machine moves on.
import { createActor, setup } from "xstate";
import { compileGuard } from "../protocol/guard";
import type { Machine, MachineAction, MachineInput, Transition } from "../protocol/machine";

type Tick = { type: "tick"; input: MachineInput };

export class MachineRunner {
  private actor;
  /** Game time when the machine entered the state it is in. */
  since: number;

  constructor(
    readonly machine: Machine,
    time: number,
  ) {
    const sources = Object.values(machine.states).flatMap((s) => (s.on?.tick ?? []).flatMap((t) => (t.guard === undefined ? [] : [t.guard])));
    // XState looks a string guard up by name, so each guard is implemented under its own source.
    const guards = Object.fromEntries([...new Set(sources)].map((source) => [source, compileGuard(source)] as const).map(([source, guard]) => [source, ({ event }: { event: Tick }) => guard.test(event.input)]));
    this.actor = createActor(setup({ types: {} as { events: Tick }, guards }).createMachine(machine as never));
    this.actor.start();
    this.since = time;
  }

  get state(): string {
    return String(this.actor.getSnapshot().value);
  }

  get action(): MachineAction {
    const state = this.machine.states[this.state];
    if (state === undefined) throw new Error(`the machine is in ${this.state}, which is not one of its states`);
    return state.meta.action;
  }

  /** One step of the game. Returns the transition the machine took, if it took one. */
  tick(input: MachineInput): (Transition & { from: string }) | undefined {
    const from = this.state;
    this.actor.send({ type: "tick", input });
    if (this.state === from) return undefined;
    this.since = input.time;
    // XState takes the first transition whose guard holds, so that is the one to name.
    const taken = (this.machine.states[from]?.on?.tick ?? []).find((t) => t.target === this.state);
    return { target: this.state, ...taken, from };
  }
}
