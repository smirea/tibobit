// The training ground's game slots: each slot is an agent server and a headless game of its own, so
// several games play side by side. A game starts fresh (any Nightmare level, any seed but the
// evaluation seed) or from a gym, optionally with the build swapped, and the bot plays it for a set
// time (the bot with --trial). A gym is built the same way and saved at its time.
import path from "node:path";
import { closeSync, mkdirSync, openSync } from "node:fs";
import { ENTRY, ROOT } from "../../paths";
import { type CheckpointMeta, type Command, type CommandStatus, type LoadoutSpec, playedOn } from "../../protocol/commands";
import type { State } from "../../protocol/view";
import { clockPadded } from "../../clock";
import type { Gym } from "../store/gyms";
import { buildLines, economy, picks, runStats } from "../../bot/run-log/reader";
import type { Templates } from "../../bot/templates";
import { AgentServer } from "../../agent-server/client";
import { localOrigin } from "../../protocol/address";
import type { TrialResult } from "../../bot/trial-result";
import { botArgv, JEV } from "../../bot/args";

export const GYM_STAGE_SECONDS = 300;
export const GYM_STAGE_TRIES = 3;

export type Start = { gym: string } | { fresh: { difficulty: number; weapon: string; seed?: string } };

export type GameSpec = {
  /** Such as "L1.I3.G2". */
  id: string;
  label: string;
  experiment?: string;
  from: Start;
  loadout?: LoadoutSpec;
  seconds: number;
  templates: Templates;
  /** What the arm changed from the playbook, in words, for the results. */
  changes: string;
  saveGym?: { name: string; purpose: string };
};

export type GameResult = { spec: GameSpec; seed: string; difficulty: string; result?: TrialResult; stats?: string; economy?: string; picks?: string[]; build?: string[]; savedGym?: { checkpoint: CheckpointMeta; held: LoadoutSpec }; error?: string };

/** A random Open World seed, as the game rolls them, that is not the evaluation seed. */
export function freshSeed(evalSeed: string): string {
  for (;;) {
    const seed = crypto.getRandomValues(new Uint32Array(1))[0]?.toString(36).toUpperCase() ?? "";
    if (seed !== "" && seed !== evalSeed.toUpperCase()) return seed;
  }
}

function freePort(): number {
  const probe = Bun.serve({ port: 0, hostname: "127.0.0.1", fetch: () => new Response() });
  const port = probe.port;
  probe.stop(true);
  if (port === undefined) throw new Error("could not find a free port");
  return port;
}

type Child = ReturnType<typeof Bun.spawn>;

/** One agent server and headless game. The main slot of a loop plays its full runs; the others play training games. */
/** The seed of the run the tab holds, from the game's `run.seed`. */
const gameSeed = (s: State) => (s.game as { run?: { seed?: unknown } } | undefined)?.run?.seed?.toString();

export class Slot {
  private children: Child[] = [];
  private headless: Child | undefined;
  /** The slot's agent server. */
  readonly agent: AgentServer;
  /** The headless game's own API. */
  readonly game: string;

  private constructor(
    readonly name: string,
    private serverPort: number,
    private gamePort: number,
    readonly profile: string,
    readonly logs: string,
  ) {
    this.agent = new AgentServer(localOrigin(serverPort));
    this.game = localOrigin(gamePort);
  }

  static async open(name: string, profile: string, logs: string): Promise<Slot> {
    mkdirSync(logs, { recursive: true });
    const serverPort = freePort();
    let gamePort = freePort();
    while (gamePort === serverPort) gamePort = freePort();
    const slot = new Slot(name, serverPort, gamePort, profile, logs);
    await slot.launch();
    return slot;
  }

  private spawn(entry: string, args: string[], log: string): Child {
    // Appended, so a restarted loop keeps the evidence of what went wrong before it.
    const out = openSync(log, "a");
    const child = Bun.spawn([process.execPath, entry, ...args], { cwd: ROOT, stdin: "ignore", stdout: out, stderr: out });
    // The child holds its own copy; the loop spawns a bot per game and would run out of descriptors.
    closeSync(out);
    this.children.push(child);
    return child;
  }

  private async launch() {
    this.spawn(ENTRY.agentServer, ["--port", String(this.serverPort)], path.join(this.logs, `${this.name}-agent-server.log`));
    await this.startGame();
  }

  private async startGame() {
    this.headless = this.spawn(ENTRY.headless, ["--bridge", String(this.serverPort), "--port", String(this.gamePort), "--profile", this.profile], path.join(this.logs, `${this.name}-headless.log`));
    await this.connected(90_000);
  }

  /** Restarts the headless game, which loads the newest userscript and game build. */
  async restartGame() {
    const old = this.headless;
    if (old !== undefined) {
      old.kill("SIGTERM");
      await Promise.race([old.exited, Bun.sleep(5000)]);
      old.kill("SIGKILL");
      this.children.splice(this.children.indexOf(old), 1);
    }
    // The server still holds the old page's stream until it notices the page is gone.
    await Bun.sleep(2000);
    await this.startGame();
  }

  async close() {
    for (const child of this.children.splice(0).reverse()) {
      child.kill("SIGTERM");
      await Promise.race([child.exited, Bun.sleep(5000)]);
      child.kill("SIGKILL");
    }
  }

  /** Runs a command to its end; one that fails, is replaced or is still running after `seconds` throws. */
  async command(c: Command, seconds = 120): Promise<CommandStatus> {
    const status = await this.agent.run(c, seconds);
    if (status.state !== "done") throw new Error(`${c.type} ${status.state}: ${status.detail ?? ""}`);
    return status;
  }

  /** The state, with the game's own state paths in `raw` (`run` holds the seed). */
  state = (raw = "run") => this.agent.state(raw);

  async connected(limitMs: number): Promise<State> {
    const end = Date.now() + limitMs;
    for (;;) {
      const s = await this.state().catch(() => undefined);
      if (s?.connected === true) return s;
      if (Date.now() > end) throw new Error(`${this.name}: the game never connected to ${this.agent.origin}`);
      await Bun.sleep(500);
    }
  }

  private async evaluate(expression: string): Promise<unknown> {
    const res = await fetch(`${this.game}/eval`, { method: "POST", body: expression });
    if (!res.ok) throw new Error(`${this.name}: eval failed: ${await res.text()}`);
    return res.json();
  }

  /**
   * A fresh Open World run on this seed and Nightmare level, in a reloaded tab. A training slot's
   * ladder is set to just below the level, so "highest" picks it.
   */
  async fresh(seed: string, difficulty: number, weapon: string): Promise<string> {
    let first: string;
    try {
      const picked = await this.freshOnce(seed, difficulty, weapon);
      const got = await this.startedSeed();
      if (got === seed) return picked;
      first = `the game rolled seed ${got ?? "nothing"}`;
    } catch (e) {
      // The start screen sometimes misses a click, such as the weapon picker showing nothing picked.
      first = e instanceof Error ? e.message : String(e);
    }
    console.error(`${this.name}: a fresh game on seed ${seed} failed (${first}); restarting the game and trying once more`);
    // A tab left on an error page, or stuck on a screen, only recovers when it is opened again.
    await this.restartGame();
    const again = await this.freshOnce(seed, difficulty, weapon);
    const second = await this.startedSeed();
    if (second !== seed) throw new Error(`asked for seed ${seed} twice: ${first}, then the game rolled ${second ?? "nothing"}`);
    return again;
  }

  /** The seed of the run just started; the snapshot that holds it can come a moment after the start command is done. */
  private async startedSeed(): Promise<string | undefined> {
    for (let waited = 0; waited < 5000; waited += 250) {
      const seed = gameSeed(await this.state());
      if (seed !== undefined) return seed;
      await Bun.sleep(250);
    }
    return undefined;
  }

  private async freshOnce(seed: string, difficulty: number, weapon: string): Promise<string> {
    await this.evaluate(`(() => { const k = "tibo.ladder.v1"; const o = JSON.parse(localStorage.getItem(k) ?? "{}"); o.cleared = ${difficulty - 1}; localStorage.setItem(k, JSON.stringify(o)); return true; })()`);
    await this.command({ type: "seed", seed });
    // The page reloads after the seed command finishes.
    await Bun.sleep(4000);
    await this.connected(90_000);
    // A training profile has not unlocked every starting weapon, so one it lacks is swapped in at 0:00.
    const offered = await this.agent.run({ type: "start", mode: "openWorld", difficulty: "highest", ...(weapon === "" ? {} : { weapon }) });
    const lacking = offered.failure === "weaponNotOffered";
    if (offered.state !== "done" && !lacking) throw new Error(`start ${offered.state}: ${offered.detail ?? ""}`);
    const started = lacking ? await this.command({ type: "start", mode: "openWorld", difficulty: "highest" }) : offered;
    if (lacking) await this.command({ type: "loadout", weapons: [{ id: weapon, level: 1 }], passives: [], items: [] });
    const picked = started.detail ?? "";
    if (picked !== playedOn("nightmare", difficulty)) throw new Error(`asked for Nightmare ${difficulty}, the game started ${picked}`);
    return picked;
  }

  /** A run to load a checkpoint into: the one in progress, or a new one. */
  async anyRun() {
    const s = await this.state();
    if (s.screen === "title" || s.screen === "over") await this.command({ type: "start", mode: "openWorld", difficulty: "nightmare" });
  }

  /** Plays the run in progress for `seconds` with these templates; the run waits paused after. */
  async trial(id: string, seconds: number, templates: Templates): Promise<{ result: TrialResult } & Required<Pick<GameResult, "stats" | "economy" | "picks" | "build">>> {
    const base = path.join(this.logs, id.replace(/[^\w.-]/g, "_"));
    await Bun.write(`${base}.templates.json`, JSON.stringify(templates));
    const bot = this.spawn(
      ENTRY.bot,
      botArgv({ server: this.agent.origin, reload: `${this.game}/reload`, ...JEV, mode: "openWorld", trial: seconds, templates: `${base}.templates.json`, result: `${base}.result.json`, "log-dir": base }),
      `${base}.bot.log`,
    );
    const code = await bot.exited;
    this.children.splice(this.children.indexOf(bot), 1);
    if (code !== 0) {
      const cause = (await Bun.file(`${base}.bot.log`).text().catch(() => "")).match(/^(?:error|\w*Error): (.*)$/m)?.[1];
      throw new Error(`the bot exited with code ${code}${cause === undefined ? "" : ` (${cause})`}; see ${base}.bot.log`);
    }
    const result = (await Bun.file(`${base}.result.json`).json()) as TrialResult;
    const csv = result.log === undefined ? "" : await Bun.file(result.log).text().catch(() => "");
    return { result, stats: csv === "" ? "(no log)" : runStats(csv), economy: csv === "" ? "(no log)" : economy(csv), picks: picks(csv), build: buildLines(csv) };
  }

  /**
   * Loads a gym into a run here. A gym saved on another game build means tibo.dog shipped a new
   * one: this game restarts onto the newest build first, and the gym is built again only when it is
   * still older, so every slot and gym moves to the newest build instead of trading places.
   */
  async loadGym(gym: Gym, build: (gym: Gym) => Promise<Gym>): Promise<Gym> {
    if (gym.status !== "ready" || gym.checkpoint === undefined) throw new Error(`gym ${gym.name} is ${gym.status}`);
    await this.anyRun();
    let page = (await this.state()).gameBuild;
    if (gym.checkpoint.build !== page) {
      console.error(`${this.name}: gym ${gym.name} is on game build ${gym.checkpoint.build}, this game on ${page ?? "?"}; restarting the game onto the newest build`);
      await this.restartGame();
      await this.anyRun();
      page = (await this.state()).gameBuild;
    }
    let ready = gym;
    if (gym.checkpoint.build !== page) {
      ready = await build(gym);
      if (ready.status !== "ready") throw new Error(`gym ${gym.name} was saved on game build ${gym.checkpoint.build}, this game runs ${page ?? "?"}, and building it again failed: ${ready.error ?? ready.status}`);
    }
    // Another slot may have built the gym again since this page last loaded it.
    await this.command({ type: "checkpoint", op: "drop", name: `gym-${ready.name}` });
    const loaded = await this.agent.run({ type: "checkpoint", op: "load", name: `gym-${ready.name}` });
    if (loaded.state === "done") return ready;
    // The screen read a moment before can be stale: the last game's run had just ended.
    if (loaded.failure !== "noRun") throw new Error(`checkpoint ${loaded.state}: ${loaded.detail ?? ""}`);
    await this.command({ type: "start", mode: "openWorld", difficulty: "nightmare" });
    await this.command({ type: "checkpoint", op: "load", name: `gym-${ready.name}` });
    return ready;
  }

  async play(spec: GameSpec, gyms: Gym[], evalSeed: string, build: (gym: Gym) => Promise<Gym>): Promise<GameResult> {
    let seed = "";
    let difficulty = "";
    try {
      if ("gym" in spec.from) {
        const name = spec.from.gym;
        const gym = gyms.find((g) => g.name === name);
        if (gym === undefined) throw new Error(`no gym ${name}`);
        const ready = await this.loadGym(gym, build);
        seed = ready.seed;
        difficulty = playedOn("nightmare", ready.difficulty);
      } else {
        seed = spec.from.fresh.seed ?? freshSeed(evalSeed);
        if (seed.toUpperCase() === evalSeed.toUpperCase()) throw new Error("the evaluation seed is kept for full runs");
        difficulty = await this.fresh(seed, spec.from.fresh.difficulty, spec.from.fresh.weapon);
      }
      if (spec.loadout !== undefined) await this.command({ type: "loadout", ...spec.loadout });
      const played = await this.trial(spec.id, spec.seconds, spec.templates);
      const { result } = played;
      const savedGym = spec.saveGym === undefined || result.died ? undefined : await this.saveGym(spec.saveGym.name);
      return { spec, seed, difficulty, ...played, ...(savedGym === undefined ? {} : { savedGym }) };
    } catch (e) {
      return { spec, seed, difficulty, error: e instanceof Error ? e.message : String(e) };
    }
  }

  /** What Tibo holds now, as a loadout that puts it back. */
  private async held(): Promise<LoadoutSpec> {
    const state = await this.state("loadout.shrineTotals");
    const tibo = state.tibo;
    // Every stat, zeros too, so putting it back also takes away what a rebuild's own shrines added.
    const shrineTotals = (state.game as { loadout?: { shrineTotals?: Record<string, number> } } | undefined)?.loadout?.shrineTotals;
    if (tibo === undefined || shrineTotals === undefined) throw new Error("no run to read what Tibo holds from");
    const leveled = (list: { id: string; level: number }[]) => list.map(({ id, level }) => ({ id, level }));
    return { weapons: leveled(tibo.weapons), passives: leveled(tibo.passives), items: tibo.items.map(({ id, count }) => ({ id, count })), gold: tibo.gold, hp: tibo.life.hp, shrineTotals };
  }

  private async saveGym(name: string): Promise<{ checkpoint: CheckpointMeta; held: LoadoutSpec }> {
    await this.command({ type: "checkpoint", op: "save", name: `gym-${name}` });
    const checkpoint = (await this.agent.checkpoints()).find((c) => c.name === `gym-${name}`);
    if (checkpoint === undefined) throw new Error("the checkpoint was saved but is not listed");
    return { checkpoint, held: await this.held() };
  }

  /**
   * Builds a gym: a fresh game played to its time, then saved. A gym built before starts with what
   * it held then, so Tibo lives to a time the playbook alone may not reach, and gets exactly that
   * back at the end: the state differs from the first save only in the map, the level and the enemies.
   */
  async buildGym(gym: Gym, templates: Templates, evalSeed: string): Promise<Gym> {
    const seed = gym.seed === "" || gym.seed.toUpperCase() === evalSeed.toUpperCase() ? freshSeed(evalSeed) : gym.seed;
    try {
      await this.fresh(seed, gym.difficulty, gym.weapon);
      const start = gym.held === undefined ? gym.loadout : { ...gym.held, hp: "full" as const };
      if (start !== undefined) await this.command({ type: "loadout", ...start });
      // Played in stages, each saved: a death replays that stage from its start (the models choose
      // differently each time) rather than the whole game from 0:00.
      const stage = `gym-${gym.name}-stage`;
      let time = (await this.state()).time ?? 0;
      while (time < gym.at - 1) {
        await this.command({ type: "checkpoint", op: "save", name: stage });
        const seconds = Math.min(GYM_STAGE_SECONDS, Math.ceil(gym.at - time));
        const deaths: number[] = [];
        for (;;) {
          const { result } = await this.trial(`gym-${gym.name}-${Date.now()}`, seconds, templates);
          if (!result.died) {
            time = result.end;
            break;
          }
          deaths.push(result.end);
          if (deaths.length >= GYM_STAGE_TRIES) return { ...gym, seed, status: "failed", error: `Tibo died ${deaths.length} times between ${clockPadded(time)} and ${clockPadded(time + seconds)}, at ${deaths.map((d) => clockPadded(d)).join(", ")}, on the way to ${clockPadded(gym.at)}`, templates };
          await this.anyRun();
          await this.command({ type: "checkpoint", op: "drop", name: stage });
          await this.command({ type: "checkpoint", op: "load", name: stage });
        }
      }
      if (gym.held !== undefined) {
        // A loadout cannot replace a build while a choice is open; the bot picks it.
        for (let tries = 0; (await this.state()).screen === "choice"; tries++) {
          if (tries >= 5) throw new Error("a choice stayed open at the gym's time");
          await this.trial(`gym-${gym.name}-${Date.now()}`, 2, templates);
        }
        await this.command({ type: "loadout", ...gym.held });
      }
      const saved = await this.saveGym(gym.name);
      const { error: _, ...rest } = gym;
      return { ...rest, seed, status: "ready", checkpoint: saved.checkpoint, held: gym.held ?? saved.held, templates };
    } catch (e) {
      return { ...gym, seed, status: "failed", error: e instanceof Error ? e.message : String(e), templates };
    }
  }
}

/** Runs jobs on the slots, each slot taking the next job when it is free. */
export async function onSlots<J, R>(slots: Slot[], jobs: J[], work: (slot: Slot, job: J) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(jobs.length);
  let next = 0;
  await Promise.all(
    slots.map(async (slot) => {
      while (next < jobs.length) {
        const i = next++;
        out[i] = await work(slot, jobs[i] as J);
      }
    }),
  );
  return out;
}
