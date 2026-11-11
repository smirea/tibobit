#!/usr/bin/env bun
// Plays tibo.dog through the agent server with prompt templates the coach wrote (--templates, else
// its playbook; rsi/main.ts runs the coach). In the game, a decision model plans (picks every card
// and sets short-term goals) and acts (steps around danger on the way to the goal). The file removes
// only options the game itself rules out: cards Tibo cannot take, and moves the game's own
// simulation says cost clearly more health over its horizon (the forecastSeconds knob) than the cheapest one.
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { ladderCleared } from "../protocol/view";
import { type EndJson, see, type World } from "./world";
import type { RunPlan, RunSetup } from "./notes";
import { talliesOf, totalsBetween } from "./tallies";
import { onScreen, readBook } from "./words";
import { command, followPanel, pace, RAW, say, server, type Snap, timed, timings } from "./server";
import { BOT_CODE, difficulty, MODE, MODE_NAME, setDifficulty, WIN_SECONDS } from "./run-context";
import { BASE, COACH_LABEL, DIFFICULTY, INTENT, LOG, MODEL, NOTES, option, PLAN_MODEL, RELOAD, RUN_COUNT, STEP, TAKEOVER, TRIAL, TRIAL_RESULT, WEAPON } from "./flags";
import { RunNotes } from "./run-notes";
import { setTemplates } from "./playing";
import { choose, loadoutLines, Planner } from "./planner";
import { beginStep, forgetMode, modelSteered, modeSet, setMode, tellLag } from "./live";
import { pursue } from "./pursue";
import { latency, snapshotAges } from "./decider";
import { LOG_DIR, RunLog } from "./run-log/writer";
import { pursuit, resetGoals } from "./goals";
import { clock } from "../format";

// The first run plays this Open World seed in a freshly reloaded tab, or the bot stops rather than play another.
let SEED = option("seed", "").toUpperCase();


let rescuedLink: string | undefined;

/** What the last start asked for and got: the starting weapon, or why the game's Random was used instead. */
let startNote = "random";

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

async function startRun(weapon = ""): Promise<void> {
  startNote = weapon === "" ? "random" : "chosen";
  let started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY, ...(weapon === "" ? {} : { weapon }) }, 120);
  if (started.state !== "done" && /is not offered/.test(started.detail ?? "")) {
    // A weapon this profile has not unlocked; the run still happens, on Random, and the notes say so.
    startNote = `random, because ${started.detail}`;
    console.log(`start: ${started.detail}; starting on Random`);
    started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY }, 120);
  }
  if (started.state !== "done") {
    // The page has already shown the finished run's link by now; a reload would lose it.
    rescuedLink = (await server.state(RAW)).lastRunLink ?? rescuedLink;
    console.log(`start failed (${started.detail ?? started.state}); reloading the game page`);
    if (RELOAD !== "") await fetch(RELOAD).catch(() => undefined);
    await Bun.sleep(8000);
    started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY, ...(startNote === "chosen" ? { weapon } : {}) }, 120);
    if (started.state !== "done") throw new Error(`could not start a run: ${started.detail ?? started.state}`);
  }
  setDifficulty(started.detail ?? DIFFICULTY);
  forgetMode();
}

let recordCrash: ((e: unknown) => Promise<void>) | undefined;

/** What the game holds of a run the bot needs once it is over, when the live view is gone, under the game's keys. */
const ended = (s: Snap) => s.game as EndJson | undefined;
/** The seed of the run the tab holds, from the game's `run.seed`. */
const gameSeed = (s: Snap) => ended(s)?.run.seed?.toString();
const runClock = (s: Snap) => ended(s)?.runClock ?? 0;

async function main() {
  await mkdir(path.dirname(LOG), { recursive: true });
  await Bun.write(LOG, "");
  const log = Bun.file(LOG).writer();
  let runs = 0;
  let lastReport = -1;
  let steps = 0;
  let notes: RunNotes | undefined;
  let planner: Planner | undefined;
  let runLog: RunLog | undefined;
  let last: World | undefined;
  // The previous run's notes wait for its share link, which appears while the next run starts.
  let awaitingLink: { notes: RunNotes; known: string | undefined } | undefined;
  console.log(`model ${MODEL}, ${MODE} ${DIFFICULTY}, step ${STEP}s, planner ${PLAN_MODEL}, templates from ${BASE.source}, run logs in ${LOG_DIR}`);
  // A run the bot is stopped in the middle of leaves no notes: it ended neither in the game nor in a bug.
  const stop = async () => {
    process.exit(0);
  };
  process.on("SIGINT", () => void stop());
  process.on("SIGTERM", () => void stop());
  /** A run cut short by the bot or the page gets notes that say so, and no review. */
  const cutShort = async (n: RunNotes, ending: string) => {
    n.link = "none";
    n.review = "(no review: the run was cut short)";
    await n.finish({ lived: last?.time ?? 0, ending: `${ending} at ${last === undefined ? "the start" : clock(last.time)}`, outcome: last === undefined ? [] : loadoutLines(last) });
  };
  recordCrash = async (e) => {
    if (notes !== undefined) await cutShort(notes, `the bot crashed (${e instanceof Error ? e.message : String(e)})`);
  };
  const now = await server.state(RAW);
  // Every run the bot starts begins fresh, so a Daily always begins at tick 0 on its fixed seed.
  let adopted = TAKEOVER && now.tibo !== undefined && now.screen !== "over" && now.screen !== "title";
  if (TRIAL !== undefined && !adopted) throw new Error("--trial plays the run in progress, and there is none; start a run and load a checkpoint first");
  let trialStart: World | undefined;
  const endTrial = async (end: World | undefined, died: EndJson | undefined) => {
    const start = trialStart;
    if (start === undefined || end === undefined) throw new Error("the trial ended before its first step");
    const tallies = (r: World) => ({ run: r.run, counters: r.counters, loadout: { shrineTotals: r.view.tibo.shrineTotals } });
    const totals = totalsBetween(talliesOf(died ?? tallies(end)), talliesOf(tallies(start)));
    const endTime = died?.runClock ?? end.time;
    const run = (totals.run ?? {}) as Record<string, unknown>;
    const result = {
      survived: Math.round((endTime - start.time) * 10) / 10,
      died: died !== undefined,
      start: start.time,
      end: endTime,
      hp: { start: Math.round(start.hp), end: died === undefined ? Math.round(end.hp) : 0, max: Math.round(end.maxHp) },
      level: { start: start.view.tibo.level.level, end: died?.loadout.level ?? end.view.tibo.level.level },
      kills: Number(run.kills ?? 0),
      damageTaken: (run.damageTakenBySource ?? {}) as Record<string, number>,
      totals,
      weapons: end.weapons.map((w) => `${w.id} ${w.level}`),
      passives: end.passives.map((p) => `${p.id} ${p.level}`),
      steps,
      plannerCalls: planner?.calls ?? 0,
      actionCalls: latency.length - (planner?.calls ?? 0),
      avgDecisionMs: Math.round(latency.reduce((x, y) => x + y, 0) / Math.max(1, latency.length)),
      snapshotAgeMs: (() => {
        const sorted = [...snapshotAges].sort((a, b) => a - b);
        const at = (q: number) => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * q))] ?? 0;
        return { p50: at(0.5), p90: at(0.9) };
      })(),
      log: runLog?.file,
    };
    if (died === undefined) {
      await command({ type: "stop" });
      await command({ type: "pause" });
    }
    await Bun.write(TRIAL_RESULT, `${JSON.stringify(result, null, 2)}\n`);
    console.log(`trial: ${died === undefined ? "alive" : "died"} after ${result.survived}s, hp ${result.hp.start} -> ${result.hp.end}, ${result.kills} kills`);
  };
  say({
    role: "system",
    tag: adopted ? "Take over" : "Start",
    time: runClock(now),
    text: `${adopted ? `Taking over the run at ${clock(runClock(now))}` : `Starting a ${MODE === "daily" ? "Daily" : "Open World"} run on ${DIFFICULTY}`}.`,
    detail: `Planner ${PLAN_MODEL}, action model ${MODEL}, templates from ${BASE.source}. Run logs: ${LOG_DIR}`,
  });
  const plan: RunPlan = { source: BASE.source, intent: INTENT, templates: BASE.templates, weapon: WEAPON };
  const prepareAndStart = () => start(WEAPON);
  if (!adopted) await prepareAndStart();
  runs = 1;

  const fillLink = async (s: Snap) => {
    const link = [s.lastRunLink, rescuedLink].find((l) => l !== undefined && l !== awaitingLink?.known);
    if (awaitingLink === undefined || link === undefined) return;
    awaitingLink.notes.link = link;
    await awaitingLink.notes.write();
    console.log(`run link: ${link}`);
    awaitingLink = undefined;
    rescuedLink = undefined;
  };

  // The tab's command stream can drop and reconnect after 3s; the server re-sends the pilot state
  // when it does, so the run carries on. Two training games were lost to drops before this wait.
  const reconnected = async (): Promise<Snap> => {
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
    await fillLink(s);
    if (s.screen === "title" || s.screen === "over") {
      const over = ended(s)?.over === true ? ended(s) : undefined;
      if (TRIAL !== undefined) return endTrial(last, over ?? (last === undefined ? undefined : { runClock: last.time, over: true, run: last.run, counters: last.counters, loadout: { level: last.view.tibo.level.level, shrineTotals: last.view.tibo.shrineTotals } }));
      if (s.screen === "over" && over !== undefined && runs > 0 && notes !== undefined && planner !== undefined && runLog !== undefined) {
        const avg = latency.reduce((x, y) => x + y, 0) / Math.max(1, latency.length);
        const lived = over.runClock;
        const kills = Number(over.run.kills ?? 0);
        const taken = over.run.damageTakenBySource;
        console.log(`run ${runs} ended at ${Math.round(lived)}s, level ${over.loadout.level}, ${kills} kills, ${steps} steps, ${Math.round(avg)}ms per decision`);
        say({ role: "system", time: lived, tag: "Over", text: `Run over at ${clock(lived)}, level ${over.loadout.level}, ${kills} kills.` });
        console.log(`  damage taken: ${Object.entries(taken).map(([k, v]) => `${k} ${v}`).join(", ")}`);
        const total = Object.values(taken).reduce((a, b) => a + b, 0);
        const lastHurt = last === undefined ? "" : Object.entries(last.hurtBy).map(([k, v]) => `${k} ${v}`).join(", ");
        runLog.write(last, {
          event: "run_end",
          action: lived >= WIN_SECONDS ? "won, then died" : "died",
          detail: `Tibo died at ${clock(lived)}, level ${over.loadout.level}, ${kills} kills; hurt in its last 3 seconds by ${lastHurt || "nothing the bot saw"}; damage taken ${Math.round(total)} in all: ${Object.entries(taken).map(([k, v]) => `${k} ${Math.round(v * 10) / 10}`).join(", ")}`,
        });
        log.write(`${JSON.stringify({ event: "end", model: MODEL, mode: MODE, difficulty, notes: notes.id, runLog: runLog.file, time: lived, level: over.loadout.level, kills, damageTaken: taken, killer: over.run.killer, steps, plannerCalls: planner.calls, avgDecisionMs: Math.round(avg) })}\n`);
        log.flush();
        // The run is over; a stop from here on only notes the missing review.
        const ended = notes;
        notes = undefined;
        await planner.finish(over, last, ladderCleared(s), runLog.healed);
        // The share link only exists on the run summary, and a page reload loses it, so it goes into
        // the notes now, before the review, rather than whenever the next run starts.
        const summary = await command({ type: "summary" }, 60);
        const shown = (await server.state(RAW)).lastRunLink;
        if (summary.state === "done" && shown !== undefined && shown !== s.lastRunLink) {
          ended.link = shown;
          await ended.write();
          console.log(`run link: ${shown}`);
        } else {
          console.log(`run summary showed no link (${summary.detail ?? summary.state}); it is read again when the next run starts`);
          awaitingLink = { notes: ended, known: s.lastRunLink };
        }
        console.log(`notes: ${ended.saved ? ended.file : "not saved"}, log: ${runLog.file}`);
        planner = undefined;
        runLog = undefined;
        if (runs >= RUN_COUNT) {
          // A run the panel played hands the wheel back on its end screen instead of starting another.
          if (awaitingLink !== undefined && !TAKEOVER) {
            await start();
            await fillLink(await server.state(RAW));
          }
          return;
        }
      } else if (notes !== undefined) {
        // tibo.dog reloads itself when it ships a new build, which drops the run with no death screen.
        console.log(`run ${runs} was lost at ${last === undefined ? "the start" : clock(last.time)}: the game left it without a death screen`);
        await cutShort(notes, "the game page left the run without a death screen (tibo.dog reloads itself for a new build)");
        notes = undefined;
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
    const b = await readBook();
    const r = b === undefined ? undefined : see(s);
    if (r === undefined) {
      await Bun.sleep(100);
      continue;
    }
    followPanel(s.pace);
    const incognito = s.incognito ?? false;
    if (notes === undefined || planner === undefined || runLog === undefined) {
      const setup: RunSetup = { started: new Date(), difficulty: r.view.world.difficulty, mode: MODE_NAME, surface: s.headless === true ? "headless" : "browser", seed: String(r.run.seed), planner: PLAN_MODEL, action: MODEL, coach: COACH_LABEL, bot: BOT_CODE };
      const skip = !NOTES ? "no --notes" : adopted ? "taken over mid-run" : incognito ? "incognito" : undefined;
      const prompts = "see the coach's log";
      setTemplates(plan.templates);
      notes = new RunNotes(setup, plan, prompts, skip === undefined);
      const first = r.weapons[0]?.id ?? "none";
      notes.started = startNote === "chosen" ? `${first} (chosen by the coach)` : `${first} (${startNote})`;
      adopted = false;
      runLog = new RunLog(notes.log);
      planner = new Planner(notes, runLog);
      resetGoals();
      console.log(`run seed ${String(r.run.seed)}${MODE === "daily" ? " (daily)" : ""}, ${skip === undefined ? "notes at the end" : `no notes (${skip})`}, templates from ${plan.source}, log ${notes.log}`);
    }
    last = r;
    trialStart ??= r;
    if (TRIAL !== undefined && r.time - trialStart.time >= TRIAL) return endTrial(r, undefined);
    if (Math.floor(r.time / 30) !== lastReport) {
      lastReport = Math.floor(r.time / 30);
      const per = (ms: number) => Math.round(ms / Math.max(1, timings.steps));
      console.log(
        `${r.time}s hp ${Math.round(r.hp)}/${Math.round(r.maxHp)} lv ${r.view.tibo.level.level} enemies on screen ${onScreen(r)} ${r.weapons.map((w) => `${w.id}:${w.level}`).join(",")} | per step: state ${per(timings.state)}ms decide ${per(timings.decide)}ms command ${per(timings.command)}ms`,
      );
      Object.assign(timings, { state: 0, decide: 0, command: 0, steps: 0 });
      log.write(`${JSON.stringify({ event: "tick", time: r.time, hp: r.hp, level: r.view.tibo.level.level, enemies: onScreen(r) })}\n`);
      log.flush();
    }
    steps++;
    timings.steps++;
    if (incognito && notes.saved) {
      notes.saved = false;
      console.log("incognito: this run gets no notes and no review");
      say({ role: "system", time: r.time, tag: "Incognito", text: "Incognito: this run gets no notes, and it will not be reviewed." });
    }
    if (!modeSet) await setMode();
    // Live, the bot never pauses the game itself, so a pause is the player's: the models wait for it.
    if (s.screen === "paused") {
      await Bun.sleep(250);
      continue;
    }
    const stepStarted = performance.now();
    beginStep();
    snapshotAges.push(s.ageMs);
    await tellLag(s.ageMs);
    if (s.screen === "choice") await choose(r, planner, runLog);
    else {
      const why = pursuit === undefined ? undefined : planner.due(r);
      if (why !== undefined) await planner.plan(r, why);
      await pursue(s, r, runLog, planner);
    }
    // A move the action model chose was decided from a state already a few hundred ms old, so the
    // next one starts as soon as it lands; the page walks the cheap steps on its own anyway.
    if (!modelSteered) await Bun.sleep(Math.max(0, pace.actEvery * 1000 - (performance.now() - stepStarted)));
  }
}

await main().catch(async (e: unknown) => {
  await recordCrash?.(e);
  throw e;
});
