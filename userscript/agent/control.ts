import type { Game, GameState } from "../../game/types";
import type { GameLink } from "../link/game-link";
import { type Command, CommandFailure, type CommandStatus, type Envelope } from "../../protocol/commands";
import { STILL, TICKS_PER_SECOND, unitOf } from "../../protocol/geometry";
import { inRun } from "../link/screen";
import { type CheckpointFile, Checkpoints } from "./checkpoint";
import { showSummary, startRun } from "./menus";
import { anchored, type Place, place, toward } from "./targets";
import { applyLoadout } from "./loadout";
import { requestSeed } from "./seed";
import { Forecaster } from "./forecast";

/** Where checkpoints live: the agent server's disk, reached through the bridge. */
export type CheckpointStore = { put(file: CheckpointFile): Promise<void>; get(name: string): Promise<CheckpointFile> };

const STUCK_TICKS = 90;
const KEEP_STATUSES = 10;

type Movement = Extract<Command, { type: "move" } | { type: "goto" }>;

type Active = {
  status: CommandStatus;
  command: Movement;
  startTick?: number;
  arrivedTick?: number;
  best?: { dist: number; tick: number };
  /** The goto's target, a relative one anchored where the player stood when the command started. */
  to?: Place;
};

export class Controller {
  readonly statuses: CommandStatus[] = [];
  private active: Active | undefined;
  private checkpoints: Checkpoints;

  constructor(
    private link: GameLink,
    private forecaster: Forecaster,
  ) {
    link.steer = (game) => this.steer(game);
    this.checkpoints = new Checkpoints(link);
  }

  handle({ id, command }: Envelope, store: CheckpointStore) {
    const status: CommandStatus = { id, command, state: "running", at: Date.now() };
    this.statuses.push(status);
    if (this.statuses.length > KEEP_STATUSES) this.statuses.splice(0, this.statuses.length - KEEP_STATUSES);
    try {
      this.run(status, command, store);
    } catch (e) {
      this.fail(status, e);
    }
  }

  /** After the bot lets go: no held movement, normal speed, and a run the bot left paused resumes. */
  release() {
    if (this.active !== undefined) this.finish(this.active.status, "replaced");
    this.link.speed = 1;
    this.forecaster.reset();
    if (inRun(this.link)) this.link.game?.setPaused(false);
  }

  private fail(status: CommandStatus, e: unknown) {
    if (e instanceof CommandFailure) {
      status.failure = e.failure;
      if (e.offered !== undefined) status.offered = e.offered;
    }
    this.finish(status, "failed", e instanceof Error ? e.message : String(e));
  }

  private finish(status: CommandStatus, state: CommandStatus["state"], detail?: string) {
    status.state = state;
    status.at = Date.now();
    if (detail !== undefined) status.detail = detail;
    if (this.active?.status !== status) return;
    if (this.active.command.pause && state !== "replaced") this.link.game?.setPaused(true);
    this.active = undefined;
  }

  private game(): Game {
    const game = this.link.game;
    if (game === undefined || !inRun(this.link)) throw new CommandFailure("noRun", "no run in progress");
    return game;
  }

  private run(status: CommandStatus, command: Command, store: CheckpointStore) {
    switch (command.type) {
      case "move":
      case "goto":
        const game = this.game();
        if (this.active !== undefined) this.finish(this.active.status, "replaced");
        this.active = { status, command };
        if (command.pause) game.setPaused(false);
        return;
      case "stop":
        if (this.active !== undefined) this.finish(this.active.status, "replaced");
        this.finish(status, "done");
        return;
      case "choose": {
        const game = this.game();
        const open = game.state.choiceQueue[0];
        if (open === undefined) throw new Error("no choice is open");
        const before = JSON.stringify(game.state.choiceQueue);
        game.choose(command.action);
        // The game ignores an action it cannot take, such as a pick past the last offer or a reroll with none left.
        if (JSON.stringify(game.state.choiceQueue) === before) throw new Error(`the game did not take ${JSON.stringify(command.action)} on this ${open.kind} choice`);
        this.finish(status, "done");
        return;
      }
      case "dash": {
        const game = this.game();
        const me = game.state.me;
        // The game ignores a dash without a charge; saying so keeps a caller from counting it as done.
        if ((game.state.player.dashCharges[me] ?? 0) <= 0) throw new Error("Tibo has no dash charge");
        const v = command.dir === undefined ? { x: game.state.player.fx[me] ?? 1, y: game.state.player.fy[me] ?? 0 } : unitOf(command.dir);
        game.dash(v.x, v.y);
        this.finish(status, "done");
        return;
      }
      case "pause":
      case "resume":
        this.game().setPaused(command.type === "pause");
        this.finish(status, "done");
        return;
      case "speed":
        this.link.speed = command.factor;
        this.finish(status, "done");
        return;
      case "forecast":
        this.forecaster.configure(command, this.link.game?.state);
        this.finish(status, "done");
        return;
      case "start":
        startRun(this.link, command.mode ?? "openWorld", command.difficulty ?? "easy", command.weapon).then((picked) => this.finish(status, "done", picked), (e) => this.fail(status, e));
        return;
      case "summary":
        showSummary(this.link).then(() => this.finish(status, "done"), (e) => this.fail(status, e));
        return;
      case "seed":
        requestSeed(command.seed);
        this.finish(status, "done");
        // The title screen reports twice a second, so the server hears "done" before the reload.
        setTimeout(() => location.reload(), 1500);
        return;
      case "checkpoint":
        this.checkpoint(status, command, store).catch((e) => this.fail(status, e));
        return;
      case "loadout": {
        const game = this.game();
        applyLoadout(this.link, game, command);
        const L = game.state.loadout;
        this.finish(status, "done", [...L.weapons.map((w) => `${w.def.id} ${w.level}`), ...L.passives.map((p) => `${p.def.id} ${p.level}`), ...[...L.items.keys()]].join(", "));
        return;
      }
    }
  }

  private async checkpoint(status: CommandStatus, { op, name }: Extract<Command, { type: "checkpoint" }>, store: CheckpointStore) {
    if (op === "drop") {
      this.checkpoints.drop(name);
      return this.finish(status, "done");
    }
    const game = this.game();
    if (op === "save") {
      const file = this.checkpoints.save(game, name);
      await store.put(file);
      return this.finish(status, "done", `${file.meta.time}s, ${file.state.nodes.length} objects`);
    }
    const file = this.checkpoints.has(name) ? undefined : await store.get(name);
    // The movement under way aimed at things of the state being replaced.
    if (this.active !== undefined) this.finish(this.active.status, "replaced");
    this.checkpoints.load(game, name, file);
    this.finish(status, "done", `${Math.round(game.state.runClock * 10) / 10}s`);
  }

  private steer(game: Game): { x: number; y: number } | undefined {
    const active = this.active;
    if (active === undefined) return undefined;
    const s = game.state;
    active.startTick ??= s.tick;
    const elapsed = s.tick - active.startTick;
    const { command, status } = active;

    if (command.type === "move") {
      if (command.seconds !== undefined && elapsed >= command.seconds * TICKS_PER_SECOND) {
        this.finish(status, "done");
        return STILL;
      }
      return unitOf(command.dir);
    }

    if (elapsed >= (command.timeout ?? 60) * TICKS_PER_SECOND) {
      this.fail(status, new CommandFailure("timeout", "timeout"));
      return STILL;
    }
    active.to ??= anchored(s, command.to);
    const goal = place(this.link.enums, s, active.to, command.within);
    if (goal === undefined) {
      if (command.stay === "done" && active.arrivedTick !== undefined) this.finish(status, "done", "used up");
      else this.fail(status, new CommandFailure("targetGone", "the target is gone"));
      return STILL;
    }
    const me = s.me;
    const dx = goal.x - (s.player.x[me] ?? 0);
    const dy = goal.y - (s.player.y[me] ?? 0);
    const dist = Math.hypot(dx, dy);
    if (dist > goal.within) {
      if (active.best === undefined || dist < active.best.dist - 1) active.best = { dist, tick: s.tick };
      else if (s.tick - active.best.tick > STUCK_TICKS) {
        this.finish(status, "failed", `stuck ${Math.round(dist)} units away`);
        return STILL;
      }
      // Also covers being knocked out of the circle mid-stay: walk back, keep the stay timer.
      return { x: dx / dist, y: dy / dist };
    }
    active.arrivedTick ??= s.tick;
    active.best = undefined;
    const stay = command.stay;
    if (stay === undefined || stay === 0 || (typeof stay === "number" && s.tick - active.arrivedTick >= stay * TICKS_PER_SECOND)) {
      this.finish(status, "done");
    }
    return STILL;
  }

  /** What the movement command under way holds at each tick of a copy of the game; undefined when no command steers. */
  course(): ((s: GameState) => { x: number; y: number }) | undefined {
    const active = this.active;
    const live = this.link.game?.state;
    if (active === undefined || live === undefined) return undefined;
    const { command } = active;
    if (command.type === "move") {
      const held = unitOf(command.dir);
      const end = command.seconds === undefined ? Infinity : (active.startTick ?? live.tick) + command.seconds * TICKS_PER_SECOND;
      return (s) => (s.tick >= end ? STILL : held);
    }
    const to = active.to ?? anchored(live, command.to);
    return (s) => toward(s, place(this.link.enums, s, to, command.within));
  }
}
