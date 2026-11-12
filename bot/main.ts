#!/usr/bin/env bun
// Plays tibo.dog through the agent server with prompt templates (--templates, else the built-in
// defaults). In the game, a decision model plans (picks every card
// and sets short-term goals) and acts (steps around danger on the way to the goal). The file removes
// only options the game itself rules out: cards Tibo cannot take, and moves the game's own
// simulation says cost clearly more health over its horizon (the forecastSeconds knob) than the cheapest one.
import path from "node:path";
import { existsSync } from "node:fs";
import type { State } from "../protocol/view";
import { type EndJson, see, type World } from "./world";
import { command, drive, followPanel, RAW, say, server, timed, timings } from "./server";
import { MODE, MODE_NAME, setDifficulty } from "./run-context";
import { BASE, DIFFICULTY, LOG_DIR, MODEL, option, PLAN_MODEL, RELOAD, RUN_COUNT, STEP, TAKEOVER, WEAPON } from "./config";
import { setTemplates } from "./run-templates";
import { choose, Planner } from "./planner";
import { beginStep, forgetMode, modelSteered, modeSet, setMode, tellLag } from "./forecast-lag";
import { pursue } from "./pursue";
import { latency } from "./decider";
import { RunLog } from "./run-log/writer";
import { pursuit, resetGoals } from "./goals";
import { driveTemplates } from "./drive";
import { Driver } from "./driver";
import { clock } from "../clock";
import { type Book, bookFrom } from "../game/book";

let book: Book | undefined;
// The first run plays this Open World seed in a freshly reloaded tab, or the bot stops rather than play another.
let SEED = option("seed", "").toUpperCase();

/** Reloads the tab into SEED and waits until the page is back. */
async function seedPage() {
  const sent = await command({ type: "seed", seed: SEED }, 30);
  if (sent.state !== "done") throw new Error(`could not set seed ${SEED}: ${sent.detail ?? sent.state}`);
  await Bun.sleep(4000);
  for (let i = 0; i < 90 && !(await server.state(RAW)).connected; i++) await Bun.sleep(1000);
}

async function start(weapon = ""): Promise<void> {
  if (SEED === "") return startRun(weapon);
  const want = SEED;
  for (let attempt = 1; ; attempt++) {
    await seedPage();
    await startRun(weapon);
    const got = gameSeed(await server.state(RAW));
    if (got === want) break;
    if (attempt === 2) throw new Error(`asked for seed ${want} twice, the game rolled ${got ?? "nothing"}`);
    console.log(`asked for seed ${want}, the game rolled ${got ?? "nothing"}; trying once more`);
  }
  // Only the first run: a later one in this tab is a new attempt on the seed, another map.
  SEED = "";
}

async function startRun(asked = ""): Promise<void> {
  let weapon = asked;
  let started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY, ...(weapon === "" ? {} : { weapon }) }, 120);
  if (started.failure === "weaponNotOffered") {
    // A weapon this profile has not unlocked; the run still happens, on Random.
    console.log(`start: ${started.detail}; starting on Random`);
    weapon = "";
    started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY }, 120);
  }
  if (started.state !== "done") {
    console.log(`start failed (${started.detail ?? started.state}); reloading the game page`);
    if (RELOAD !== "") await fetch(RELOAD).catch(() => undefined);
    await Bun.sleep(8000);
    started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY, ...(weapon === "" ? {} : { weapon }) }, 120);
    if (started.state !== "done") throw new Error(`could not start a run: ${started.detail ?? started.state}`);
  }
  setDifficulty(started.detail ?? DIFFICULTY);
  forgetMode();
}

/** What the game holds of a run the bot needs once it is over, when the live view is gone, under the game's keys. */
const ended = (s: State) => s.game as EndJson | undefined;
/** The seed of the run the tab holds, from the game's `run.seed`. */
const gameSeed = (s: State) => ended(s)?.run.seed?.toString();
const runClock = (s: State) => ended(s)?.runClock ?? 0;

const pad = (n: number) => String(n).padStart(2, "0");

/** The run's CSV log, named for when it started; two bots starting in the same second get the later second. */
function logFile(difficulty: string, surface: string): string {
  for (let t = Date.now(); ; t += 1000) {
    const d = new Date(t);
    const file = path.join(LOG_DIR, `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}_${difficulty}_${MODE_NAME}_${surface}.csv`);
    if (!existsSync(file)) return file;
  }
}

async function main() {
  let runs = 0;
  let lastReport = -1;
  let steps = 0;
  let planner: Planner | undefined;
  /** The panel's function, which sets the goals under Full Self Driving instead of the planner. */
  let driver: Driver | undefined;
  let runLog: RunLog | undefined;
  let last: World | undefined;
  let shownPaused = false;
  console.log(`model ${MODEL}, ${MODE} ${DIFFICULTY}, step ${STEP}s, planner ${PLAN_MODEL}, templates from ${BASE.source}, run logs in ${LOG_DIR}`);
  for (const signal of ["SIGINT", "SIGTERM"] as const) process.on(signal, () => process.exit(0));
  const now = await server.state(RAW);
  followPanel(now.drive);
  // Every run the bot starts begins fresh, so a Daily always begins at tick 0 on its fixed seed.
  const adopted = TAKEOVER && now.tibo !== undefined && now.screen !== "over" && now.screen !== "title";
  say({
    role: "system",
    tag: adopted ? "Take over" : "Start",
    time: runClock(now),
    text: `${adopted ? `Taking over the run at ${clock(runClock(now))}` : `Starting a ${MODE === "daily" ? "Daily" : "Open World"} run on ${DIFFICULTY}`}.`,
    detail: drive === undefined ? `Planner ${PLAN_MODEL}, action model ${MODEL}, templates from ${BASE.source}. Run logs: ${LOG_DIR}` : `Full Self Driving: your function sets the goals, the autopilot steps, and ${PLAN_MODEL} picks the cards. Run logs: ${LOG_DIR}`,
  });
  /** The loadout question the picker's templates were last made from. */
  let loadout: string | undefined;
  const prepareAndStart = () => start(WEAPON);
  if (!adopted) await prepareAndStart();
  runs = 1;

  // The tab's command stream can drop and reconnect after 3s; the server re-sends the pilot state
  // when it does, so the run carries on. Runs were lost to drops before this wait.
  const reconnected = async (): Promise<State> => {
    const since = Date.now();
    for (;;) {
      await Bun.sleep(500);
      const s = await server.state(RAW);
      if (s.connected) {
        console.error(`the game tab dropped its connection and came back after ${((Date.now() - since) / 1000).toFixed(1)}s`);
        return s;
      }
      if (Date.now() - since > 20_000) throw new Error("the game tab lost its connection to the agent server for 20s");
    }
  };

  for (;;) {
    const polled = await timed("state", server.state(RAW));
    const s = polled.connected ? polled : await reconnected();
    if (s.screen === "title" || s.screen === "over") {
      const over = ended(s)?.over === true ? ended(s) : undefined;
      if (s.screen === "over" && over !== undefined && runs > 0 && runLog !== undefined) {
        const avg = latency.reduce((x, y) => x + y, 0) / Math.max(1, latency.length);
        const lived = over.runClock;
        const won = last !== undefined && lived >= last.view.world.winAt;
        const kills = Number(over.run.kills ?? 0);
        const taken = over.run.damageTakenBySource;
        console.log(`run ${runs} ended at ${Math.round(lived)}s, level ${over.loadout.level}, ${kills} kills, ${steps} steps, ${Math.round(avg)}ms per decision`);
        say({ role: "system", time: lived, tag: "Over", text: `Run over at ${clock(lived)}, level ${over.loadout.level}, ${kills} kills.` });
        console.log(`  damage taken: ${Object.entries(taken).map(([k, v]) => `${k} ${v}`).join(", ")}`);
        const total = Object.values(taken).reduce((a, b) => a + b, 0);
        const lastHurt = last === undefined ? "" : Object.entries(last.hurtBy).map(([k, v]) => `${k} ${v}`).join(", ");
        runLog.write(last, {
          event: "run_end",
          action: won ? "won, then died" : "died",
          detail: `Tibo died at ${clock(lived)}, level ${over.loadout.level}, ${kills} kills; hurt in its last 3 seconds by ${lastHurt || "nothing the bot saw"}; damage taken ${Math.round(total)} in all: ${Object.entries(taken).map(([k, v]) => `${k} ${Math.round(v * 10) / 10}`).join(", ")}`,
        });
        planner = undefined;
        runLog = undefined;
        if (runs >= RUN_COUNT) return;
      } else if (runLog !== undefined) {
        // tibo.dog reloads itself when it ships a new build, which drops the run with no death screen.
        console.log(`run ${runs} was lost at ${last === undefined ? "the start" : clock(last.time)}: the game left it without a death screen`);
        planner = undefined;
        runLog = undefined;
      }
      await prepareAndStart();
      runs++;
      steps = 0;
      resetGoals();
      lastReport = -1;
      latency.length = 0;
      continue;
    }
    // The page sends the encyclopedia a moment after it connects; nothing is decided before it arrives.
    book ??= await server.encyclopedia().then(bookFrom, () => undefined);
    const r = book === undefined ? undefined : see(s, book);
    if (r === undefined) {
      await Bun.sleep(100);
      continue;
    }
    followPanel(s.drive);
    if (planner === undefined || runLog === undefined) {
      setTemplates(BASE.templates);
      loadout = undefined;
      driver = drive === undefined ? undefined : new Driver();
      runLog = new RunLog(logFile(r.view.world.difficulty, s.headless === true ? "headless" : "browser"));
      planner = new Planner(runLog);
      resetGoals();
      console.log(`run seed ${String(r.run.seed)}${MODE === "daily" ? " (daily)" : ""}, templates from ${drive === undefined ? BASE.source : "Full Self Driving"}, log ${runLog.file}`);
    }
    // The panel's loadout question can change mid-run.
    if (drive !== undefined && drive.loadout !== loadout) {
      loadout = drive.loadout;
      setTemplates(driveTemplates(drive));
    }
    last = r;
    if (Math.floor(r.time / 30) !== lastReport) {
      lastReport = Math.floor(r.time / 30);
      const per = (ms: number) => Math.round(ms / Math.max(1, timings.steps));
      console.log(
        `${r.time}s hp ${Math.round(r.hp)}/${Math.round(r.maxHp)} lv ${r.view.tibo.level.level} enemies on screen ${r.view.world.enemiesOnScreen} ${r.weapons.map((w) => `${w.id}:${w.level}`).join(",")} | per step: state ${per(timings.state)}ms decide ${per(timings.decide)}ms command ${per(timings.command)}ms`,
      );
      Object.assign(timings, { state: 0, decide: 0, command: 0, steps: 0 });
    }
    steps++;
    timings.steps++;
    if (!modeSet) await setMode();
    // Live, the bot never pauses the game itself, so a pause is the player's: the models wait for it.
    if (s.screen === "paused") {
      // The panel pauses the game while its popup is open, and lists the state as it is then.
      if (!shownPaused) driver?.show(r);
      shownPaused = true;
      await Bun.sleep(250);
      continue;
    }
    shownPaused = false;
    const stepStarted = performance.now();
    beginStep();
    await tellLag(s.ageMs);
    if (s.screen === "choice") await choose(r, planner, runLog);
    else if (driver !== undefined) {
      const [driving, log] = [driver, runLog];
      driving.step(r, log);
      await pursue(s, r, log, (now) => driving.direct(now, log));
      planner.picked = false;
    } else {
      const [asked, why] = [planner, pursuit === undefined ? undefined : planner.due(r)];
      if (why !== undefined) await asked.plan(r, why);
      await pursue(s, r, runLog, (now, reason) => asked.plan(now, reason));
    }
    // A move the action model chose was decided from a state already a few hundred ms old, so the
    // next one starts as soon as it lands; the page walks the cheap steps on its own anyway.
    if (!modelSteered) await Bun.sleep(Math.max(0, STEP * 1000 - (performance.now() - stepStarted)));
  }
}

await main();
