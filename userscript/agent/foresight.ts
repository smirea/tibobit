import type { Game, GameLink, GameState } from "../game";
import { type Controller, toward } from "./control";
import { type Direction, directionOf, DIRECTIONS, STILL, TICKS_PER_SECOND, unitOf } from "../../protocol/geometry";
import type { Ahead, Forecast, Routes } from "../../protocol/snapshot";
import { threats } from "./surroundings";

// The copies run on the page's own thread, in slices this long, and take at most this share of its
// time: a whole forecast in one go would hold up the game's frames and the agent's commands.
const SLICE_MS = 4;
const SHARE = 0.75;
// An outcome this old is no longer about the game as it stands.
const KEEP_TICKS = 2 * TICKS_PER_SECOND;

type Plan = {
  name: string;
  ticks: number;
  /** The input the plan holds at tick `i` of its run. */
  input(s: GameState, i: number): { x: number; y: number };
  dash?: { x: number; y: number };
  /** A trip's end: where it leads, undefined once that is used up, and how long Tibo must stand there. */
  trip?: { goal(s: GameState): { x: number; y: number; within: number } | undefined; stayTicks: number };
};

const playing = (s: GameState) => !s.over && s.choiceQueue.length === 0;
const dealt = (s: GameState) => {
  let total = 0;
  for (const amount of s.run.damageBySource.values()) total += amount;
  return total;
};

/**
 * Prices plans on copies of the game, off the snapshot's path: a running game gets one plan at a
 * time, each on a fresh copy, so the newest outcomes are always a few frames old however long a
 * whole round takes.
 */
export class Foresight {
  private outcomes = new Map<string, Routes["options"][string]>();
  private run: { game: Game; tick: number; steps: Generator<void, void> } | undefined;
  private turn = 0;
  private restUntil = 0;
  private game: Game | undefined;
  /** Whether the outcomes held are of trips; "still" is a plan of both kinds. */
  private routed = false;
  /** Whether the outcomes held are of a paused game, which are priced with no lag. */
  private paused = false;

  constructor(
    private link: GameLink,
    private controller: Controller,
  ) {
    setInterval(() => this.slice(), SLICE_MS);
  }

  private plans(s: GameState): Plan[] {
    const route = this.link.forecastRoute;
    const place = route === undefined ? undefined : this.controller.place(s, route.to);
    if (route === undefined || place === undefined) {
      return [...DIRECTIONS, "still" as const].map((name) => {
        const held = name === "still" ? STILL : unitOf(name);
        return { name, ticks: this.link.forecastTicks, input: () => held };
      });
    }
    const goal = (state: GameState) => this.controller.place(state, route.to);
    const straight = (state: GameState) => toward(state, goal(state));
    const way = DIRECTIONS.indexOf(directionOf(place.x - (s.player.x[s.me] ?? 0), place.y - (s.player.y[s.me] ?? 0)));
    const beside = [-2, -1, 1, 2].map((turn) => DIRECTIONS[(way + turn + 8) % 8] as Direction);
    const first = (held: { x: number; y: number }) => (state: GameState, i: number) => (i < route.legTicks ? held : straight(state));
    const ahead = DIRECTIONS[way] as Direction;
    const trip = { goal, stayTicks: route.stayTicks };
    return [
      { name: "straight", ticks: route.ticks, input: straight, trip },
      ...beside.map((dir) => ({ name: dir, ticks: route.ticks, input: first(unitOf(dir)), trip })),
      { name: "still", ticks: route.ticks, input: first(STILL), trip },
      { name: `dash ${ahead}`, ticks: route.ticks, input: straight, dash: unitOf(ahead), trip },
    ];
  }

  /** A copy of the game, played `lagTicks` on with the movement command under way. */
  private *lead(game: Game, lagTicks: number) {
    const { copyState, simulator } = this.link;
    if (copyState === undefined || simulator === undefined) throw new Error("the game's sim is not hooked yet");
    const copy = simulator(game, copyState(game.state));
    const course = this.controller.course();
    for (let i = 0; i < lagTicks && playing(copy.sim.state); i++) {
      if (course !== undefined) {
        const held = course(copy.sim.state);
        copy.setInput(held.x, held.y);
      }
      copy.step();
      yield;
    }
    return copy;
  }

  private *play(game: Game, plan: Plan, lagTicks: number): Generator<void, void> {
    const tick = game.state.tick;
    const { sim, step, setInput } = yield* this.lead(game, lagTicks);
    const s = sim.state;
    const me = s.me;
    if (plan.dash !== undefined) {
      if ((s.player.dashCharges[me] ?? 0) <= 0) {
        this.outcomes.delete(plan.name);
        return;
      }
      sim.dash(plan.dash.x, plan.dash.y);
    }
    const before = new Map(s.run.damageTakenBySource);
    const dealtBefore = dealt(s);
    let arrived: number | undefined;
    let stood = 0;
    let done: number | undefined;
    let played = 0;
    for (let i = 0; i < plan.ticks && playing(s) && done === undefined; i++) {
      const held = plan.input(s, i);
      setInput(held.x, held.y);
      step();
      played++;
      if (plan.trip !== undefined) {
        const goal = plan.trip.goal(s);
        const there = goal !== undefined && Math.hypot(goal.x - (s.player.x[me] ?? 0), goal.y - (s.player.y[me] ?? 0)) <= goal.within;
        // Only ticks stood there in a row count: a plan that starts on the place and walks off has not stayed.
        stood = there ? stood + 1 : 0;
        if (there) arrived ??= i + 1;
        if (goal === undefined || (there && stood > plan.trip.stayTicks)) done = i + 1;
      }
      yield;
    }
    const bySource: Record<string, number> = {};
    let damage = 0;
    for (const [source, total] of s.run.damageTakenBySource) {
      const taken = total - (before.get(source) ?? 0);
      if (taken <= 0) continue;
      bySource[source] = taken;
      damage += taken;
    }
    this.outcomes.set(plan.name, {
      tick,
      damage,
      dead: s.over,
      bySource,
      dps: played === 0 ? 0 : ((dealt(s) - dealtBefore) * TICKS_PER_SECOND) / played,
      ...(arrived === undefined ? {} : { arrives: arrived / TICKS_PER_SECOND }),
      ...(done === undefined ? {} : { done: done / TICKS_PER_SECOND }),
    });
  }

  private forget() {
    this.outcomes.clear();
    this.run = undefined;
  }

  /** The game `lagTicks` on, played on a copy with the movement command under way. */
  private look(game: Game, lagTicks: number): Ahead {
    const steps = this.lead(game, lagTicks);
    let step = steps.next();
    while (!step.done) step = steps.next();
    const s = step.value.sim.state;
    const me = s.me;
    return {
      tick: game.state.tick,
      seconds: lagTicks / TICKS_PER_SECOND,
      player: { x: s.player.x[me] ?? 0, y: s.player.y[me] ?? 0, hp: s.player.hp[me] ?? 0, dashCharges: s.player.dashCharges[me] ?? 0 },
      threats: threats(this.link, s, this.link.forecastTicks / TICKS_PER_SECOND),
    };
  }

  /** The plans for the game as it stands; outcomes of other plans, of another game or of a route no longer asked for are dropped. */
  private current(game: Game): Plan[] {
    const plans = this.plans(game.state);
    const routed = plans[0]?.name === "straight";
    if (game !== this.game || routed !== this.routed || game.state.paused !== this.paused) this.forget();
    this.game = game;
    this.routed = routed;
    this.paused = game.state.paused;
    const names = new Set(plans.map((p) => p.name));
    const tick = game.state.tick;
    for (const [name, o] of this.outcomes) if (!names.has(name) || o.tick > tick || tick - o.tick > KEEP_TICKS) this.outcomes.delete(name);
    return plans;
  }

  private slice() {
    const game = this.link.game;
    if (game === undefined || !this.link.ready || !this.link.liveForecast || game.state.paused || !playing(game.state)) {
      this.run = undefined;
      return;
    }
    const now = performance.now();
    if (now < this.restUntil) return;
    // A loaded checkpoint takes the game back in time, away from the copy a run started from.
    if (this.run !== undefined && (this.run.game !== game || this.run.tick > game.state.tick)) this.run = undefined;
    while (performance.now() - now < SLICE_MS) {
      if (this.run === undefined) {
        const plans = this.current(game);
        const plan = plans[this.turn++ % plans.length] as Plan;
        this.run = { game, tick: game.state.tick, steps: this.play(game, plan, this.link.forecastLagTicks) };
      }
      if (this.run.steps.next().done) this.run = undefined;
    }
    const worked = performance.now() - now;
    this.restUntil = now + worked / SHARE;
  }

  /**
   * The forecast as it stands, with the game played `lag` ahead from this very tick. A paused game
   * waits for the agent, so it also gets every plan for its tick here, with no lag. Both take the
   * page's time on the spot: call this outside the time a snapshot is allowed.
   */
  read(): Forecast | undefined {
    const game = this.link.game;
    if (game === undefined || !this.link.ready) return undefined;
    const s = game.state;
    if (!playing(s) || !(s.paused || this.link.liveForecast)) return undefined;
    const plans = this.current(game);
    if (s.paused) {
      this.run = undefined;
      for (const plan of plans) if (this.outcomes.get(plan.name)?.tick !== s.tick) for (const _ of this.play(game, plan, 0));
    }
    const ahead = this.look(game, s.paused ? 0 : this.link.forecastLagTicks);
    const route = this.link.forecastRoute;
    const outcomes: Routes["options"] = {};
    for (const { name } of plans) {
      const outcome = this.outcomes.get(name);
      if (outcome !== undefined) outcomes[name] = outcome;
    }
    return {
      lag: s.paused ? 0 : this.link.forecastLagTicks / TICKS_PER_SECOND,
      seconds: this.link.forecastTicks / TICKS_PER_SECOND,
      ahead,
      ...(this.routed && route !== undefined ? { routes: { seconds: route.ticks / TICKS_PER_SECOND, leg: route.legTicks / TICKS_PER_SECOND, stay: route.stayTicks / TICKS_PER_SECOND, options: outcomes } } : { moves: outcomes }),
    };
  }
}
