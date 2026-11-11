// The training ground's game slots: each slot is an agent server and a headless game of its own, so
// several games play side by side. A game starts fresh (any Nightmare level, any seed but the
// evaluation seed) or from a gym, optionally with the build swapped, and the bot plays it for a set
// time (tibo-bot.ts --trial). A gym is built the same way and saved at its time.
import path from "node:path";
import { closeSync, mkdirSync, openSync } from "node:fs";
import { ENTRY, ROOT } from "../paths";
import type { CheckpointMeta, CommandStatus, LoadoutSpec, State } from "../protocol/protocol";
import { type Gym, type Templates, type Totals, clock, runStats } from "../rsi/gameplay";

export const DECISION_MODEL = "typesafe/jev-1.14-20261014";
const GYM_STAGE_SECONDS = 300;
const GYM_STAGE_TRIES = 3;

/** What tibo-bot.ts --trial writes. */
export type TrialResult = {
  survived: number;
  died: boolean;
  start: number;
  end: number;
  hp: { start: number; end: number; max: number };
  level: { start: number; end: number };
  kills: number;
  damageTaken: Record<string, number>;
  /** Everything the game counted during the game: damage dealt and kills by weapon, gold, bosses, elites, chests and more. */
  totals?: Totals;
  weapons: string[];
  passives: string[];
  steps: number;
  plannerCalls?: number;
  actionCalls?: number;
  avgDecisionMs: number;
  snapshotAgeMs?: { p50: number; p90: number };
  log?: string;
};

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

export type GameResult = { spec: GameSpec; seed: string; difficulty: string; result?: TrialResult; stats?: string; savedGym?: CheckpointMeta; error?: string };

type Snap = State;

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
const gameSeed = (s: Snap) => (s.game as { run?: { seed?: unknown } } | undefined)?.run?.seed?.toString();

export class Slot {
  private children: Child[] = [];
  private headless: Child | undefined;
  readonly server: string;
  readonly game: string;

  private constructor(
    readonly name: string,
    private serverPort: number,
    private gamePort: number,
    readonly profile: string,
    readonly logs: string,
  ) {
    this.server = `http://127.0.0.1:${serverPort}`;
    this.game = `http://127.0.0.1:${gamePort}`;
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
    // The page reaches the agent server before the headless game serves its own API, which /eval needs.
    const end = Date.now() + 90_000;
    while (!(await this.evaluate("true").then(() => true, () => false))) {
      if (Date.now() > end) throw new Error(`${this.name}: the headless game never served ${this.game}`);
      await Bun.sleep(250);
    }
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

  async api<T>(route: string, body?: unknown): Promise<T> {
    const res = await fetch(`${this.server}${route}`, body === undefined ? undefined : { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    const json = (await res.json()) as T & { error?: string };
    if (!res.ok) throw new Error(json.error ?? `${route}: ${res.status}`);
    return json;
  }

  async command(c: unknown, timeoutSeconds = 120): Promise<CommandStatus> {
    const status = await this.api<CommandStatus>(`/command?wait=1&timeout=${timeoutSeconds}`, c);
    if (status.state !== "done") throw new Error(`${(c as { type: string }).type} ${status.state}: ${status.detail ?? ""}`);
    return status;
  }

  /** The state, with the game's own state paths in `raw` (`run` holds the seed). */
  state = (raw = "run") => this.api<Snap>(`/state?raw=${raw}`);

  async connected(limitMs: number): Promise<Snap> {
    const end = Date.now() + limitMs;
    for (;;) {
      const s = await this.state().catch(() => undefined);
      if (s?.connected === true) return s;
      if (Date.now() > end) throw new Error(`${this.name}: the game never connected to ${this.server}`);
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
    const offered = await this.api<CommandStatus>("/command?wait=1&timeout=120", { type: "start", mode: "openWorld", difficulty: "highest", ...(weapon === "" ? {} : { weapon }) });
    const lacking = offered.state !== "done" && /is not offered/.test(offered.detail ?? "");
    if (offered.state !== "done" && !lacking) throw new Error(`start ${offered.state}: ${offered.detail ?? ""}`);
    const started = lacking ? await this.command({ type: "start", mode: "openWorld", difficulty: "highest" }) : offered;
    if (lacking) await this.command({ type: "loadout", weapons: [{ id: weapon, level: 1 }], passives: [], items: [] });
    const picked = started.detail ?? "";
    if (picked !== `nightmare-${difficulty}`) throw new Error(`asked for Nightmare ${difficulty}, the game started ${picked}`);
    return picked;
  }

  /** A run to load a checkpoint into: the one in progress, or a new one. */
  async anyRun() {
    const s = await this.state();
    if (s.screen === "title" || s.screen === "over") await this.command({ type: "start", mode: "openWorld", difficulty: "nightmare" });
  }

  /** Plays the run in progress for `seconds` with these templates; the run waits paused after. */
  async trial(id: string, seconds: number, templates: Templates): Promise<{ result: TrialResult; stats: string }> {
    const base = path.join(this.logs, id.replace(/[^\w.-]/g, "_"));
    await Bun.write(`${base}.templates.json`, JSON.stringify(templates));
    const bot = this.spawn(
      ENTRY.bot,
      ["--server", this.server, "--reload", `${this.game}/reload`, "--decider", "openrouter", "--model", DECISION_MODEL, "--mode", "openWorld", "--trial", String(seconds), "--templates", `${base}.templates.json`, "--result", `${base}.result.json`, "--log-dir", base],
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
    return { result, stats: csv === "" ? "(no log)" : runStats(csv) };
  }

  /** Loads a gym into a run here, building it first when this game build cannot load it. */
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
    if (gym.checkpoint.build !== page) ready = await build(gym);
    // Another slot may have built the gym again since this page last loaded it.
    await this.command({ type: "checkpoint", op: "drop", name: `gym-${ready.name}` });
    const loaded = await this.api<CommandStatus>("/command?wait=1&timeout=120", { type: "checkpoint", op: "load", name: `gym-${ready.name}` });
    if (loaded.state === "done") return ready;
    // The screen read a moment before can be stale: the last game's run had just ended.
    if (!/no run in progress/.test(loaded.detail ?? "")) throw new Error(`checkpoint ${loaded.state}: ${loaded.detail ?? ""}`);
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
        difficulty = `nightmare-${ready.difficulty}`;
      } else {
        seed = spec.from.fresh.seed ?? freshSeed(evalSeed);
        if (seed.toUpperCase() === evalSeed.toUpperCase()) throw new Error("the evaluation seed is kept for full runs");
        difficulty = await this.fresh(seed, spec.from.fresh.difficulty, spec.from.fresh.weapon);
      }
      if (spec.loadout !== undefined) await this.command({ type: "loadout", ...spec.loadout });
      const { result, stats } = await this.trial(spec.id, spec.seconds, spec.templates);
      let savedGym: CheckpointMeta | undefined;
      if (spec.saveGym !== undefined && !result.died) {
        await this.command({ type: "checkpoint", op: "save", name: `gym-${spec.saveGym.name}` });
        savedGym = (await this.api<CheckpointMeta[]>("/checkpoints")).find((c) => c.name === `gym-${spec.saveGym?.name}`);
      }
      return { spec, seed, difficulty, result, stats, ...(savedGym === undefined ? {} : { savedGym }) };
    } catch (e) {
      return { spec, seed, difficulty, error: e instanceof Error ? e.message : String(e) };
    }
  }

  /** Builds a gym from its recipe: a fresh game played to its time, then saved. */
  async buildGym(gym: Gym, templates: Templates, evalSeed: string): Promise<Gym> {
    const seed = gym.seed === "" || gym.seed.toUpperCase() === evalSeed.toUpperCase() ? freshSeed(evalSeed) : gym.seed;
    try {
      await this.fresh(seed, gym.difficulty, gym.weapon);
      if (gym.loadout !== undefined) await this.command({ type: "loadout", ...gym.loadout });
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
          if (deaths.length >= GYM_STAGE_TRIES) return { ...gym, seed, status: "failed", error: `Tibo died ${deaths.length} times between ${clock(time)} and ${clock(time + seconds)}, at ${deaths.map((d) => clock(d)).join(", ")}, on the way to ${clock(gym.at)}`, templates };
          await this.anyRun();
          await this.command({ type: "checkpoint", op: "drop", name: stage });
          await this.command({ type: "checkpoint", op: "load", name: stage });
        }
      }
      await this.command({ type: "checkpoint", op: "save", name: `gym-${gym.name}` });
      const checkpoint = (await this.api<CheckpointMeta[]>("/checkpoints")).find((c) => c.name === `gym-${gym.name}`);
      if (checkpoint === undefined) throw new Error("the checkpoint was saved but is not listed");
      const { error: _, ...rest } = gym;
      return { ...rest, seed, status: "ready", checkpoint, templates };
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
