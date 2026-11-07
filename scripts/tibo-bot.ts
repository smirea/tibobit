#!/usr/bin/env bun
// Plays tibo.dog through the agent server with a local decision model (LM Studio's
// /v1/systemone). This file describes the game to the model and turns its answers into commands.
// The model makes every choice (where to move, what to pick); the file only removes options the
// game itself rules out: cards Tibo cannot take, and moves the game's own simulation says cost
// clearly more health over the next second than the cheapest one.
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import { BRIDGE_ORIGIN as DEFAULT_ORIGIN, type ChatLine, type CommandStatus, DIRECTIONS, type Direction, type ForecastView, type OptionView, type RunView, type SectorView, type Snapshot } from "../src/agent/protocol";

const args = process.argv.slice(2);
const option = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};
const MODEL = option("model", "h2o-lightning-4b@q8_0");
// Level-up picks are rare (a few dozen a run), so they can afford a slower, stronger model.
const PICK_MODEL = option("pick-model", MODEL);
const SERVER = option("server", process.env.TIBO_SERVER ?? DEFAULT_ORIGIN);
// A System One decisions endpoint: LM Studio locally, or OpenRouter's (`--decider openrouter`),
// which serves TypeSafe's Jev models and needs OPENROUTER_API_KEY.
const DECIDERS: Record<string, string> = { lmstudio: "http://localhost:1234/v1/systemone", openrouter: "https://openrouter.ai/api/alpha/decisions" };
const DECIDER = DECIDERS[option("decider", "lmstudio")] ?? option("decider", "lmstudio");
const DECIDER_KEY = new URL(DECIDER).hostname === "openrouter.ai" ? process.env.OPENROUTER_API_KEY : undefined;
if (new URL(DECIDER).hostname === "openrouter.ai" && !DECIDER_KEY) throw new Error("--decider openrouter needs OPENROUTER_API_KEY (in .env.local, managed by env-manager)");
const STEP = Number(option("step", "0.35"));
const RUNS = Number(option("runs", "1"));
const DIFFICULTY = option("difficulty", "easy");
const MODE = option("mode", "daily");
const SPEED = Number(option("speed", "4"));
const COACH = option("coach", "grok");
const COACH_MODEL = option("coach-model", "grok-4.7-build-fast");
const TRACE = args.includes("--trace");
// For "Grok take the wheel": play the run already in progress instead of starting a fresh one.
const TAKEOVER = args.includes("--takeover");
const RELOAD = option("reload", "http://127.0.0.1:7358/reload");
const LOG = option("log", path.join(import.meta.dir, "..", ".runs", `${MODEL.replace(/[^\w.@-]/g, "_")}-${Date.now()}.jsonl`));

/** `live` is the server's "DO IT LIVE" switch, read every step so it can change mid-run. */
type Snap = Snapshot & { connected: boolean; ageMs: number; live?: boolean };

const PLANNER = COACH === "none" ? "none" : `${COACH} ${COACH_MODEL}`;
/** A line for the panel's chat, shown while the bot has the wheel. Never awaited: the chat must not slow a step. */
function say(line: ChatLine) {
  void fetch(`${SERVER}/pilot/say`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(line) }).catch(() => undefined);
}
type Question =
  | { type: "choice"; instructions: string; criteria: Record<string, string | null> }
  | { type: "noul"; instructions: string }
  | { type: "score"; instructions: string; criteria: string[] };
type Answer = { choice?: string; probabilities?: Record<string, number>; confidence?: number; noul?: number; score?: number };

async function api<T>(route: string, body?: unknown): Promise<T> {
  const init = body === undefined ? undefined : { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) };
  let res: Response | undefined;
  // Ride out a restarting agent server instead of losing the run.
  for (let attempt = 0; res === undefined; attempt++) {
    try {
      res = await fetch(`${SERVER}${route}`, init);
    } catch (e) {
      if (attempt >= 30) throw e;
      await Bun.sleep(2000);
    }
  }
  const json = (await res.json()) as T & { error?: string };
  if (!res.ok) throw new Error(`${route}: ${json.error ?? res.status}`);
  return json;
}

const timings = { state: 0, decide: 0, command: 0, steps: 0 };
async function timed<T>(phase: "state" | "decide" | "command", work: Promise<T>): Promise<T> {
  const started = performance.now();
  try {
    return await work;
  } finally {
    timings[phase] += performance.now() - started;
  }
}

const command = (c: unknown, timeoutSeconds = 30) =>
  timed("command", api<CommandStatus & { interruptedBy?: string }>(`/command?wait=1&timeout=${timeoutSeconds}`, c));
/** Sends a command without waiting for it to finish, such as a move held until the next one. */
const send = (c: unknown) => timed("command", api<{ id: number }>("/command", c));

// Live play runs the game in real time and never pauses it: each move is held until the next
// decision replaces it, and the coach thinks while the game goes on. A level-up or chest still
// stops the game, as it does for a person.
let playingLive: boolean | undefined;
const LIVE_MIN_STEP_MS = 100;

async function playLive(live: boolean, r: RunView) {
  await command({ type: "speed", factor: live ? 1 : SPEED });
  await command({ type: "forecast", live });
  await command({ type: live ? "resume" : "pause" });
  if (live || playingLive !== undefined)
    say({ role: "system", time: r.time, text: live ? "DO IT LIVE: the game keeps running while the models think." : "Lockstep: the game waits while the models think." });
  playingLive = live;
}

/** Waits until the server's live switch turns on, or `done` says to stop waiting. */
async function untilLive(done: () => boolean) {
  // Sleeps first: most steps ask the coach nothing, and those should not cost a request.
  for (;;) {
    await Bun.sleep(250);
    if (done() || (await api<Snap>("/state")).live === true) return;
  }
}

const latency: number[] = [];
let trace: ((entry: unknown) => void) | undefined;
async function decide(state: string, questions: Record<string, Question>, model = MODEL): Promise<Record<string, Answer>> {
  const started = performance.now();
  const body = JSON.stringify({ model, state, questions });
  let json: { answers?: Record<string, Answer>; error?: unknown } | undefined;
  const headers: Record<string, string> = { "content-type": "application/json", ...(DECIDER_KEY === undefined ? {} : { authorization: `Bearer ${DECIDER_KEY}` }) };
  // LM Studio occasionally never answers a request, and OpenRouter rate-limits; ask again.
  for (let attempt = 0; json === undefined; attempt++) {
    try {
      const res = await timed("decide", fetch(DECIDER, { method: "POST", headers, body, signal: AbortSignal.timeout(60_000) }));
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      json = (await res.json()) as { answers?: Record<string, Answer>; error?: unknown };
    } catch (e) {
      if (attempt >= 5) throw e;
      console.log(`decision request failed (${e instanceof Error ? e.message : e}); retrying`);
      await Bun.sleep(250 * 2 ** attempt);
    }
  }
  latency.push(performance.now() - started);
  if (json.answers === undefined) throw new Error(`decision model error: ${JSON.stringify(json.error ?? json).slice(0, 300)}`);
  trace?.({ event: "decision", state, questions, answers: json.answers });
  // A score is an index into its criteria; as a share of the scale it reads like a noul.
  for (const [key, q] of Object.entries(questions)) {
    const a = json.answers[key];
    if (q.type === "score" && a?.score !== undefined) a.noul = a.score / Math.max(1, q.criteria.length - 1);
  }
  return json.answers;
}

// ---- Learning loop -------------------------------------------------------------------------
// A large model (the coach) reads the generic strategy and this run's notes at checkpoints,
// writes a note, and hands the decision model one line of advice plus a list of upgrades to
// favour. After the run it reviews the notes and stats and rewrites the strategy for the next.
const GAMEPLAY = path.join(import.meta.dir, "..", "gameplay");
const STRATEGY_FILE = path.join(GAMEPLAY, "strategy.md");
const NOTES_DIR = path.join(GAMEPLAY, "notes");
const FEEDBACK_FILE = path.join(GAMEPLAY, "infrastructure_feedback.csv");
// Every few runs is an experiment: the coach picks a high-level strategy from experiments.md and
// plays it on purpose even where strategy.md disagrees, so the strategy does not settle into a
// local maximum. Results go to experiments.csv; lessons that hold up go into strategy.md.
const EXPERIMENTS_FILE = path.join(GAMEPLAY, "experiments.md");
const EXPERIMENTS_CSV = path.join(GAMEPLAY, "experiments.csv");
const EXPERIMENT_EVERY = Number(option("experiment-every", "3"));
const FORCED_EXPERIMENT = option("experiment", "");
type Experiment = { name: string; hypothesis: string; directive: string };
const CHECKPOINTS = [30, 150, 300, 480, 660, 840, 1020, 1140];
const COACH_COOLDOWN = 45;
// A post-run review rewrites two files in one reply, which can take grok a few minutes. A consult
// during the run holds the paused game, so it gets less.
const REVIEW_TIMEOUT_MS = 900_000;
const CONSULT_TIMEOUT_MS = 180_000;
const URGENT_COOLDOWN = 10;
const LOW_HEALTH = 0.5;

type Plan = { want: string[]; otherwise: "reroll" | "choose"; advice: string; at: number };
// The coach's advice line lapses after this many game seconds, so a stale instruction cannot
// stay in force while the situation changes; its upgrade list stays until the next consult.
const ADVICE_SECONDS = 90;
let plan: Plan | undefined;
const inPlan = (name: string) => plan?.want.some((w) => w.toLowerCase() === name.toLowerCase()) ?? false;

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
const today = () => new Date().toISOString().slice(0, 10);

async function readStrategy(): Promise<string> {
  const file = Bun.file(STRATEGY_FILE);
  return (await file.exists()) ? file.text() : "# Strategy\n\n(no strategy yet)\n";
}

async function readExperiments(): Promise<string> {
  const file = Bun.file(EXPERIMENTS_FILE);
  return (await file.exists()) ? file.text() : "# Experiments\n\n(no ideas yet)\n";
}

async function experimentLog(): Promise<string> {
  const file = Bun.file(EXPERIMENTS_CSV);
  const text = (await file.exists()) ? (await file.text()).trim() : "";
  return text.split("\n").length > 1 ? text : "(no experiment runs yet)";
}

// Counted from the notes, not this process, so restarts and a second bot keep the cadence.
async function experimentDue(): Promise<boolean> {
  if (FORCED_EXPERIMENT !== "") return true;
  if (EXPERIMENT_EVERY <= 0) return false;
  const names: string[] = [];
  for await (const name of new Bun.Glob("2*.md").scan(NOTES_DIR)) names.push(name);
  const finished: string[] = [];
  for (const name of names.sort().reverse()) {
    const text = await Bun.file(path.join(NOTES_DIR, name)).text();
    if (!text.includes(`| Mode | ${MODE} ${DIFFICULTY} |`)) continue;
    // Another bot already playing an experiment counts, or two bots run the same one at once.
    if (text.includes("| Run type | experiment") && text.includes("(the run is in progress)")) return false;
    if (text.includes("Survived **")) finished.push(text);
    if (finished.length === EXPERIMENT_EVERY - 1) break;
  }
  return finished.length === EXPERIMENT_EVERY - 1 && finished.every((t) => !t.includes("| Run type | experiment"));
}

async function chooseExperiment(): Promise<Experiment | undefined> {
  say({ role: "planner", model: PLANNER, text: "Thinking: this run is an experiment; choosing which…" });
  const reply = await askCoach(
    [
      "You coach a bot that plays tibo.dog, and the next run is an experiment run.",
      GAME_RULES,
      `Goal of the serious runs: survive 20 minutes on ${DIFFICULTY} in today's ${MODE === "daily" ? "Daily (the same seed every attempt today)" : "Open World"}.`,
      "Experiment runs exist to escape a local maximum: they play one high-level strategy on purpose, even where the serious strategy disagrees, to learn which of its ideas hold and which do not.",
      "The experiment list:",
      await readExperiments(),
      "Results of earlier experiment runs (CSV):",
      await experimentLog(),
      "The serious strategy now:",
      await readStrategy(),
      "Finished runs in this mode, longest first:",
      await runHistory(),
      FORCED_EXPERIMENT === "" ? "Pick the experiment that would teach the most now: untried ideas first, or a retry where a result was unclear. You may also invent a new one." : `Run the experiment named "${FORCED_EXPERIMENT}".`,
      "Answer from these facts alone; do not browse, search or use tools.",
      'Reply with only JSON: {"name": "the experiment name as in the list", "hypothesis": "one sentence: what you expect to happen and why", "directive": "the high-level strategy for this run in two to four sentences, written for the coach that advises the bot during the run: what to pick, where to walk, and what to give up"}',
    ].join("\n\n"),
    CONSULT_TIMEOUT_MS,
  );
  if (reply === undefined || typeof reply.name !== "string" || typeof reply.directive !== "string") return undefined;
  return { name: reply.name, hypothesis: typeof reply.hypothesis === "string" ? reply.hypothesis : "", directive: reply.directive };
}

const csvField = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

async function infraFeedback(run: string, time: string, note: string) {
  const text = note.trim();
  if (text === "") return;
  await appendFile(FEEDBACK_FILE, `${[today(), run, time, text.replace(/\s+/g, " ")].map(csvField).join(",")}\n`);
}

/** Runs the coach CLI once and returns the JSON object in its reply, or undefined. */
async function askCoach(prompt: string, timeoutMs: number): Promise<Record<string, unknown> | undefined> {
  if (COACH === "none") return undefined;
  const started = performance.now();
  const proc = Bun.spawn(["grok", "-p", prompt, "-m", COACH_MODEL, "--output-format", "plain"], { cwd: os.tmpdir(), stdout: "pipe", stderr: "pipe" });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    proc.kill();
  }, timeoutMs);
  const seconds = () => Math.round((performance.now() - started) / 1000);
  try {
    const text = await new Response(proc.stdout).text();
    const json = text.match(/\{[\s\S]*\}/)?.[0];
    if (json === undefined) {
      const err = (await new Response(proc.stderr).text()).trim();
      console.error(`coach gave no JSON after ${seconds()}s${timedOut ? " (timed out)" : ""}: ${(text.trim() || err).slice(0, 300) || "(empty output)"}`);
      say({ role: "planner", model: PLANNER, text: `No answer after ${seconds()}s${timedOut ? " (timed out)" : ""}; the previous plan stands.` });
      return undefined;
    }
    return JSON.parse(json) as Record<string, unknown>;
  } catch (e) {
    console.error(`coach reply unreadable after ${seconds()}s:`, e instanceof Error ? e.message : e);
    return undefined;
  } finally {
    clearTimeout(timer);
  }
}

/** The run's notes file, rendered from gameplay/notes/TEMPLATE.md and rewritten on every change. */
class RunNotes {
  readonly id: string;
  readonly file: string;
  link = "pending: written once the game shows the run summary";
  timeline: string[] = [];
  outcome = "(the run is in progress)";
  review = "(written after the run)";
  private fields: Record<string, string>;

  /**
   * A run the bot took over from a person is not saved: its notes would credit the bot with
   * someone else's opening, and the mode and difficulty it was started with are unknown.
   */
  constructor(r: RunView, strategy: string, readonly experiment?: Experiment, readonly saved = true) {
    const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 19);
    this.id = `${stamp}-${MODE}-${DIFFICULTY}-${r.seed}`;
    this.file = path.join(NOTES_DIR, `${this.id}.md`);
    this.fields = {
      title: `Run ${stamp.slice(0, 10)} ${stamp.slice(11, 16).replace("-", ":")}, ${MODE} ${DIFFICULTY}`,
      date: new Date().toISOString(),
      mode: MODE,
      difficulty: DIFFICULTY,
      seed: r.seed,
      model: PICK_MODEL === MODEL ? MODEL : `${MODEL} (moves), ${PICK_MODEL} (picks)`,
      coach: COACH === "none" ? "none" : `${COACH} ${COACH_MODEL}`,
      step: String(STEP),
      speed: String(SPEED),
      strategy: `strategy.md ${createHash("sha1").update(strategy).digest("hex").slice(0, 8)}`,
      kind: experiment === undefined ? "serious" : `experiment: ${experiment.name}`,
      experiment:
        experiment === undefined
          ? "None: a serious run that follows strategy.md."
          : `**${experiment.name}**\n\nHypothesis: ${experiment.hypothesis}\n\nDirective: ${experiment.directive}`,
    };
  }

  async write() {
    if (!this.saved) return;
    const template = await Bun.file(path.join(NOTES_DIR, "TEMPLATE.md")).text();
    const values: Record<string, string> = {
      ...this.fields,
      link: this.link,
      timeline: this.timeline.length === 0 ? "(no notes yet)" : this.timeline.join("\n"),
      outcome: this.outcome,
      review: this.review,
    };
    await Bun.write(this.file, template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => values[key] ?? ""));
  }
}

const where = (x: { dist: number; dir: string } | undefined) => (x === undefined ? "none in sight" : `${Math.round(x.dist)} away to the ${x.dir}`);

function digest(r: RunView): string {
  const p = r.player;
  return [
    `Time ${clock(r.time)}, health ${Math.round(p.hp)}/${Math.round(p.maxHp)}, level ${p.level}, gold ${p.gold}, ${r.enemies.total} enemies around.`,
    `Weapons: ${r.loadout.weapons.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}.`,
    `Passives: ${r.loadout.passives.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}.`,
    `Items: ${r.loadout.items.map((i) => `${i.name} x${i.count}`).join(", ") || "none"}.`,
    `Recipes in reach: ${r.combos.map((c) => `${c.name} (${c.parts.map((x) => `${x.name} ${x.state}`).join(" + ")})`).join("; ") || "none"}.`,
    `Unpaired: ${r.unpaired.map((u) => `${u.name} needs one of ${u.options.map((o) => o.name).join(", ")}`).join("; ") || "none"}.`,
    `Bosses: ${r.bosses.map((b) => `${b.name} ${Math.round(b.dist)} away, ${Math.round(b.hp)}/${Math.round(b.maxHp)} hp`).join("; ") || "none"}.`,
    `Hurt in the last 3 seconds by: ${Object.entries(p.hurtBy).map(([k, v]) => `${k} ${v}`).join(", ") || "nothing"}.`,
    `Nearest chest: ${where(r.pickups.chests[0])}. Nearest food: ${where(r.pickups.nearest.find((x) => x.kind === "heal"))}. Nearest shrine to stand in: ${where(r.pois.find((x) => x.chargeNeeded > 0))}.`,
    `Attacks on the ground: ${r.hazards.filter((h) => h.source === "attack").slice(0, 4).map((h) => `${h.shape} ${h.kind} ${Math.round(h.dist)} away to the ${h.dir}${h.landsIn === undefined ? "" : `, lands in ${h.landsIn}s`}`).join("; ") || "none"}.`,
    ...(r.choice === undefined ? [] : [`Open ${r.choice.kind} choice: ${r.choice.options.map((o) => o.name).join(", ")}.`]),
    `Enemies by direction (within 60 / within 150): ${r.sectors.map((x) => `${x.dir} ${x.enemiesNear}/${x.enemiesFar}`).join(", ")}.`,
    `Health 30 seconds ago: ${healthHistory[0]?.hp ?? "unknown"}%.`,
    `Level-up picks since the last consult: ${pickLog.splice(0).join("; ") || "none"}.`,
  ].join("\n");
}

const GAME_RULES = [
  "tibo.dog is a survivors-like game. Weapons fire on their own; the player only walks, dashes, and picks level-up upgrades and chest rewards.",
  "A base weapon at max level plus its catalyst (a passive or an item) evolves at the next chest; evolved weapons are much stronger. Two evolved weapons can sometimes fuse into a union.",
  "A small local decision model plays every step. It only sees one line of advice from you, and a mark on level-up options whose exact names you list in want.",
].join("\n");

/** One line per finished run in gameplay/notes: how long it lasted and what it carried. */
async function runHistory(): Promise<string> {
  const glob = new Bun.Glob("*.md");
  const rows: { time: number; held: number; line: string }[] = [];
  for await (const name of glob.scan(NOTES_DIR)) {
    if (!name.startsWith("2")) continue;
    const text = await Bun.file(path.join(NOTES_DIR, name)).text();
    if (!text.includes(`| Mode | ${MODE} ${DIFFICULTY} |`)) continue;
    const survived = text.match(/Survived \*\*([\d:]+)\*\* \(([\d.]+)s\), level (\d+)/);
    if (survived === null) continue;
    const weapons = text.match(/- (?:Final weapons|Weapons at [\d:]+): (.*)\./)?.[1] ?? "unknown";
    const passives = text.match(/- Final passives: (.*)\./)?.[1] ?? "unknown";
    const held = weapons === "unknown" ? 0 : weapons.split(", ").length;
    const kind = text.match(/\| Run type \| (experiment: [^|]+?) \|/)?.[1];
    rows.push({ time: Number(survived[2]), held, line: `${name.slice(0, 16)}${kind === undefined ? "" : ` (${kind})`}: survived ${survived[1]}, level ${survived[3]}; weapons ${weapons}; passives ${passives}` });
  }
  if (rows.length === 0) return "(no finished runs yet)";
  rows.sort((a, b) => b.time - a.time);
  return [...rows.map((r) => `- ${r.line}`), "", `Survival by weapons held at the end: ${weaponTable(rows)}.`].join("\n");
}

// The coach kept narrowing the build to one weapon while every long run held five or six, so the
// history states that comparison outright instead of leaving it to be inferred.
function weaponTable(rows: { time: number; held: number }[]): string {
  const groups = [
    { label: "1-2 weapons", has: (n: number) => n >= 1 && n <= 2 },
    { label: "3-4 weapons", has: (n: number) => n >= 3 && n <= 4 },
    { label: "5-6 weapons", has: (n: number) => n >= 5 },
  ];
  return groups
    .map((g) => {
      const times = rows.filter((r) => g.has(r.held)).map((r) => r.time);
      if (times.length === 0) return `${g.label}: no runs`;
      const mean = times.reduce((a, b) => a + b, 0) / times.length;
      return `${g.label}: ${times.length} runs, ${clock(Math.min(...times))} to ${clock(Math.max(...times))}, mean ${clock(mean)}`;
    })
    .join("; ");
}

/**
 * Asks the coach to review a finished run, rewrites strategy.md from its answer and files its
 * infrastructure suggestions. Returns the review paragraph.
 */
async function reviewRun(timeline: string, outcome: string, recent: string[], runId: string, endTime: string, experiment?: Experiment): Promise<string | undefined> {
  if (COACH === "none") return undefined;
  const experimentReply =
    experiment === undefined
      ? ""
      : ', "experiment": {"expected": "which parts of the hypothesis played out as expected, and why", "unexpected": "which did not, and why", "lesson": "what a serious run should take from this, or that it should take nothing"}';
  const prompt = [
    "You coach a bot that plays tibo.dog, and a run just ended.",
    GAME_RULES,
    `Goal: survive 20 minutes on ${DIFFICULTY} in today's ${MODE === "daily" ? "Daily (the same seed every attempt today)" : "Open World"}.`,
    "Current strategy file:",
    await readStrategy(),
    "Every finished run in this mode so far, longest first. Compare builds and timings across runs before trusting a lesson from one run:",
    await runHistory(),
    "Every Build rule must agree with this history. A rule that refuses the weapons the longest runs held, or narrows the build below what those runs had, is wrong: rewrite it.",
    "The experiment list:",
    await readExperiments(),
    "Results of earlier experiment runs (CSV):",
    await experimentLog(),
    experiment === undefined
      ? "This was a serious run that followed the strategy file."
      : `This was an experiment run, not a serious one: **${experiment.name}**. Hypothesis: ${experiment.hypothesis} Directive it played: ${experiment.directive} Judge the experiment on what it was testing, not on survival alone, and take into strategy.md only the parts that held up.`,
    "This run's notes:",
    timeline || "(none)",
    "Outcome:",
    outcome,
    ...(recent.length === 0 ? [] : ["The last few situations the decision model saw:", recent.join("\n---\n")]),
    "Answer from these facts alone; do not browse, search or use tools.",
    'Reply with only JSON: {"review": "a short paragraph: why the run ended, what worked, what to change", "strategy": "the full updated strategy.md in Markdown. Keep it generic advice for future runs (seed-specific facts only where the Daily repeats), keep its sections, stay under 70 lines, and add one dated line to Lessons", "infra": ["concrete suggestions to improve the data or controls the bot has"], "experiments": "the full updated experiments.md: keep its intro, add new ideas this run suggests, and under each idea record its status and what runs so far showed and why"' + experimentReply + "}",
  ].join("\n\n");
  const reply = await askCoach(prompt, REVIEW_TIMEOUT_MS);
  if (reply === undefined) return undefined;
  if (typeof reply.strategy === "string" && reply.strategy.trimStart().startsWith("# Strategy") && reply.strategy.length < 12_000) {
    await Bun.write(STRATEGY_FILE, `${reply.strategy.trim()}\n`);
    console.log("strategy.md updated");
  }
  if (Array.isArray(reply.infra)) for (const s of reply.infra) await infraFeedback(runId, endTime, String(s));
  if (typeof reply.experiments === "string" && reply.experiments.trimStart().startsWith("# Experiments") && reply.experiments.length < 12_000) {
    await Bun.write(EXPERIMENTS_FILE, `${reply.experiments.trim()}\n`);
    console.log("experiments.md updated");
  }
  const result = reply.experiment as Record<string, unknown> | undefined;
  if (experiment !== undefined && result !== undefined) {
    const field = (k: string) => (typeof result[k] === "string" ? String(result[k]).replace(/\s+/g, " ") : "");
    const row = [today(), runId, experiment.name, experiment.hypothesis, endTime, field("expected"), field("unexpected"), field("lesson")];
    await appendFile(EXPERIMENTS_CSV, `${row.map(csvField).join(",")}\n`);
    console.log(`experiments.csv: ${experiment.name}`);
  }
  return typeof reply.review === "string" ? reply.review : undefined;
}

/** `--review <notes.md>`: review a finished run whose review never got written (the bot was stopped mid-review). */
async function reviewNotesFile(file: string) {
  const text = await Bun.file(file).text();
  const section = (name: string) => text.match(new RegExp(`## ${name}\\n\\n([\\s\\S]*?)(?=\\n## |$)`))?.[1]?.trim() ?? "";
  const outcome = section("Outcome");
  if (!outcome.includes("Survived")) throw new Error(`${file} has no finished outcome to review`);
  const time = outcome.match(/Survived \*\*([\d:]+)\*\*/)?.[1] ?? "";
  const experimentText = section("Experiment");
  const name = experimentText.match(/^\*\*(.+?)\*\*/)?.[1];
  const experiment =
    name === undefined
      ? undefined
      : { name, hypothesis: experimentText.match(/Hypothesis: (.*)/)?.[1] ?? "", directive: experimentText.match(/Directive: (.*)/)?.[1] ?? "" };
  const review = await reviewRun(section("Timeline"), outcome, [], path.basename(file, ".md"), time, experiment);
  if (review === undefined) throw new Error("the coach gave no review");
  await Bun.write(file, text.replace(/## Review\n\n[\s\S]*$/, `## Review\n\n${review}\n`));
  console.log(`reviewed ${file}`);
}

class Coach {
  private nextCheckpoint = 0;
  private lastAsked = Number.NEGATIVE_INFINITY;
  private sawBoss = false;
  private lowHealth = false;
  private critical = false;
  private bleeding = false;
  private bossClose = false;
  private attack = false;
  private evolved = 0;
  calls = 0;

  constructor(private notes: RunNotes) {}

  /** The reason to consult the coach now, if there is one. */
  private reason(r: RunView): string | undefined {
    const evolved = r.loadout.weapons.filter((w) => w.max === 1).length;
    const low = r.player.hp / r.player.maxHp < LOW_HEALTH;
    const checkpoint = CHECKPOINTS[this.nextCheckpoint];
    let why: string | undefined;
    const attack = r.hazards.some((h) => h.source === "attack" && h.landsIn !== undefined && h.dist < 120);
    const bossClose = r.bosses.some((b) => b.dist < 50);
    const critical = r.player.hp / r.player.maxHp < 0.15;
    const then = healthHistory[0];
    const bleeding = then !== undefined && then.hp - (r.player.hp / r.player.maxHp) * 100 >= 33;
    const cooled = r.time - this.lastAsked >= COACH_COOLDOWN;
    // Emergencies may re-ask sooner, so a stale line cannot ride through a collapse.
    const urgentCooled = r.time - this.lastAsked >= URGENT_COOLDOWN;
    if (!this.sawBoss && r.bosses.length > 0) why = `a boss appeared: ${r.bosses[0]?.name}`;
    else if (critical && !this.critical && urgentCooled) why = "health dropped below 15%";
    else if (bleeding && !this.bleeding && urgentCooled) why = "health fell by a third within 30 seconds";
    else if (bossClose && !this.bossClose && urgentCooled) why = "a boss came within 50 units";
    else if (attack && !this.attack && urgentCooled) why = "a boss attack is telegraphed nearby";
    else if (low && !this.lowHealth && cooled) why = "health dropped below half";
    else if (evolved > this.evolved && r.time - this.lastAsked >= COACH_COOLDOWN) why = "a weapon evolved";
    else if (checkpoint !== undefined && r.time >= checkpoint) why = `checkpoint at ${clock(checkpoint)}`;
    this.sawBoss ||= r.bosses.length > 0;
    this.lowHealth = low;
    this.critical = critical;
    this.bleeding = bleeding;
    this.bossClose = bossClose;
    this.attack = attack;
    this.evolved = Math.max(this.evolved, evolved);
    while (CHECKPOINTS[this.nextCheckpoint] !== undefined && r.time >= (CHECKPOINTS[this.nextCheckpoint] ?? 0)) this.nextCheckpoint++;
    return why;
  }

  // Awaited while the game is paused, so a checkpoint always lands on the same tick.
  async consult(r: RunView) {
    const why = this.reason(r);
    if (why === undefined || COACH === "none") return;
    this.lastAsked = r.time;
    this.calls++;
    say({ role: "planner", model: PLANNER, time: r.time, text: `Thinking: ${why}…` });
    const prompt = [
      "You coach a bot that plays tibo.dog.",
      GAME_RULES,
      `Goal: survive 20 minutes on ${DIFFICULTY} in today's ${MODE === "daily" ? "Daily (the same seed every attempt today)" : "Open World"}.`,
      ...(this.notes.experiment === undefined
        ? ["Strategy file, learned from earlier runs:", await readStrategy()]
        : [
            `This run is an experiment: **${this.notes.experiment.name}**. Hypothesis: ${this.notes.experiment.hypothesis}`,
            `Play this directive for the whole run, even where the strategy file disagrees, so the experiment tests what it set out to: ${this.notes.experiment.directive}`,
            "Strategy file, for background only:",
            await readStrategy(),
          ]),
      "Finished runs in this mode, longest first:",
      await runHistory(),
      "Notes so far this run:",
      this.notes.timeline.join("\n") || "(none yet)",
      `You are asked now because ${why}. State now:`,
      digest(r),
      "Answer from these facts alone; do not browse, search or use tools.",
      'Reply with only JSON: {"want": [up to 8 exact weapon, passive or item names, best first. This list is binding: whenever a level-up offers any name on it, only those can be taken, so include the weapons to keep levelling as well as the passives you want], "otherwise": "reroll" or "choose": what a level-up that offers nothing on want does. reroll spends a reroll (or skips) instead of filling a slot with an unplanned card; choose lets the decision model pick the strongest card", "advice": "one short sentence for the decision model about the next minute or two; it stays in force for 90 seconds, so never name a compass direction or a countdown", "note": "one or two sentences for the run notes: what is happening and what to watch", "infra": "one concrete suggestion to improve the data or controls the bot has, or an empty string"}',
    ].join("\n\n");
    const reply = await askCoach(prompt, CONSULT_TIMEOUT_MS);
    if (reply === undefined) return;
    if (Array.isArray(reply.want) && typeof reply.advice === "string")
      plan = { want: reply.want.map(String), otherwise: reply.otherwise === "reroll" ? "reroll" : "choose", advice: reply.advice, at: r.time };
    const note = typeof reply.note === "string" ? reply.note : "";
    this.notes.timeline.push(`- **${clock(r.time)}** (${why}) ${note}${plan === undefined ? "" : ` Advice: ${plan.advice} Want: ${plan.want.join(", ")}.`}`);
    await this.notes.write();
    if (typeof reply.infra === "string" && this.notes.saved) await infraFeedback(this.notes.id, clock(r.time), reply.infra);
    console.log(`coach ${clock(r.time)} (${why}): ${note}`);
    say({
      role: "planner",
      model: PLANNER,
      time: r.time,
      text: plan === undefined ? note || "(no plan)" : plan.advice,
      detail: [note, plan === undefined ? "" : `Want: ${plan.want.join(", ")}${plan.otherwise === "reroll" ? "; reroll anything else" : ""}`].filter(Boolean).join("\n"),
    });
  }

  async review(lastRun: NonNullable<Snapshot["lastRun"]>, last: RunView | undefined, recent: string[]) {
    if (!this.notes.saved) return;
    const damage = Object.entries(lastRun.damageTaken).map(([k, v]) => `${k} ${v}`).join(", ");
    this.notes.outcome = [
      `- Survived **${clock(lastRun.time)}** (${lastRun.time}s), level ${lastRun.level}, ${lastRun.kills} kills.`,
      `- Damage taken by source: ${damage || "none recorded"}.`,
      ...(last === undefined
        ? []
        : [
            `- Final weapons: ${last.loadout.weapons.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ")}.`,
            `- Final passives: ${last.loadout.passives.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ")}.`,
          ]),
      `- Coach consulted ${this.calls} times.`,
    ].join("\n");
    await this.notes.write();
    say({ role: "planner", model: PLANNER, time: lastRun.time, text: "Reviewing the run and rewriting the strategy…" });
    const review = await reviewRun(this.notes.timeline.join("\n"), this.notes.outcome, recent, this.notes.id, clock(lastRun.time), this.notes.experiment);
    if (review === undefined) return;
    say({ role: "planner", model: PLANNER, time: lastRun.time, text: review });
    this.notes.review = review;
    await this.notes.write();
  }
}

const plural = (n: number, one: string) => `${n} ${n === 1 ? one : one.replace(/y$/, "ie")}${n === 1 ? "" : "s"}`;

function sourceWords(source: string): string {
  if (!source.includes(":")) return source.toLowerCase();
  const [kind = "", id = ""] = source.split(":");
  if (kind === "enemy") return `${id.replace(/-/g, " ")} enemies`;
  if (kind === "boss") return `the ${id.replace(/-/g, " ")} boss`;
  return hazardWords(source);
}

// Health samples by game time, to tell the model whether it is bleeding.
const healthHistory: { time: number; hp: number }[] = [];

function healthTrend(r: RunView): string[] {
  const pct = Math.round((r.player.hp / r.player.maxHp) * 100);
  if (healthHistory.length > 0 && (healthHistory.at(-1)?.time ?? 0) > r.time) healthHistory.length = 0;
  healthHistory.push({ time: r.time, hp: pct });
  while (healthHistory.length > 1 && (healthHistory[1]?.time ?? 0) <= r.time - 30) healthHistory.shift();
  const then = healthHistory[0];
  if (then === undefined || r.time - then.time < 20 || Math.abs(then.hp - pct) < 10) return [];
  return [`Health went from ${then.hp}% to ${pct}% over the last ${Math.round(r.time - then.time)} seconds.`];
}

// A complete recipe evolves at the next chest, which makes the nearest chest worth the walk.
function readyLine(r: RunView): string[] {
  const ready = r.combos.filter((c) => c.ready && c.kind !== "union").map((c) => c.name);
  if (ready.length === 0) return [];
  const chest = r.pickups.chests[0];
  return [`The next chest evolves ${ready.join(" and ")}; ${chest === undefined ? "no chest is in sight" : `the nearest chest is ${Math.round(chest.dist)} away to the ${chest.dir}`}.`];
}

function hurtLine(r: RunView): string[] {
  const sources = Object.entries(r.player.hurtBy).sort((a, b) => b[1] - a[1]).slice(0, 2);
  return sources.length === 0 ? [] : [`In the last 3 seconds Tibo was hurt by ${sources.map(([k]) => sourceWords(k)).join(" and ")}.`];
}

function situation(r: RunView): string {
  const p = r.player;
  const hp = Math.round((p.hp / p.maxHp) * 100);
  const near = r.sectors.reduce((n, s) => n + s.enemiesNear, 0);
  return [
    `Tibo is a potato hero in a survivors game. Weapons fire on their own; Tibo only chooses where to walk.`,
    `Time ${Math.floor(r.time / 60)}:${String(Math.floor(r.time % 60)).padStart(2, "0")}. Health ${hp}%${hp < 40 ? ", which is low" : ""}. Level ${p.level}. ${plural(near, "enemy")} within 60 units, ${plural(r.enemies.total, "enemy")} around.`,
    ...(r.bosses.length > 0 ? [`Boss ${r.bosses[0]?.name} is ${Math.round(r.bosses[0]?.dist ?? 0)} units away to the ${r.bosses[0]?.dir}.`] : []),
    ...r.hazards
      .filter((h) => h.inside)
      .slice(0, 1)
      .map((h) =>
        h.landsIn === undefined
          ? `Tibo is standing in ${hazardWords(h.kind)}.`
          : `Tibo is standing where a boss attack lands in ${h.landsIn.toFixed(1)} seconds, and must step out of it.`,
      ),
    `Weapons: ${r.loadout.weapons.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}. Passives: ${r.loadout.passives.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}.`,
    ...hurtLine(r),
    ...healthTrend(r),
    ...readyLine(r),
    ...(plan === undefined || r.time - plan.at > ADVICE_SECONDS ? [] : [`Plan: ${plan.advice}`]),
  ].join("\n");
}

// The name alone hides what a spot does: standing in a Beetle Nest wakes an elite.
const poiWhat = (p: RunView["pois"][number]) => (p.description === "" ? "" : ` (${p.description.replace(/\.$/, "").replace(/\. /g, "; ").toLowerCase()})`);

function sights(r: RunView, dir: Direction): string[] {
  const out: string[] = [];
  for (const c of r.pickups.chests) if (c.dir === dir && c.dist < 300) out.push(`a chest ${Math.round(c.dist)} away`);
  for (const p of r.pickups.nearest)
    if (p.dir === dir && p.dist < 200 && p.kind !== "gold") out.push(p.kind === "heal" ? `food that heals Tibo ${Math.round(p.dist)} away` : `a ${p.kind} pickup ${Math.round(p.dist)} away`);
  for (const p of r.pois) if (p.dir === dir && p.dist < 300 && p.chargeNeeded > 0) out.push(`a ${p.name} ${Math.round(p.dist)} away${poiWhat(p)}`);
  return out.slice(0, 2);
}

const HAZARD_WORDS: Record<string, string> = {
  telegraph: "a boss attack about to land",
  hazardPool: "a damaging puddle",
  strike: "a strike about to land",
  slow: "a sticky patch that slows Tibo",
  chill: "an icy patch that slows Tibo",
};
const hazardWords = (kind: string) => HAZARD_WORDS[kind] ?? `a ${kind} patch that hurts Tibo`;

// The direction opposite the nearest boss, or one step either side of it.
function awayFromBoss(r: RunView, dir: Direction): string | undefined {
  const boss = r.bosses[0];
  if (boss === undefined || boss.dist > 300) return undefined;
  const offset = (DIRECTIONS.indexOf(dir) - DIRECTIONS.indexOf(boss.dir) + 8) % 8;
  return offset >= 3 && offset <= 5 ? `away from the ${boss.name} boss` : undefined;
}

// Words, not percentages: on 50 replayed states Laya picked a move within 2% of the least
// damaging one 90% of the time with these words, 80% with "would lose N%", and 38% when the
// number stood alone.
function hurtWords(share: number): string {
  if (share <= 3) return "get scratched";
  if (share <= 9) return "get badly hurt";
  return "get very badly hurt";
}

function outlook(r: RunView, f: ForecastView): string {
  if (f.dead) return `Tibo would die within a second${f.sources.length === 0 ? "" : `, killed by ${f.sources.slice(0, 2).map((x) => sourceWords(x.source)).join(" and ")}`}`;
  const share = Math.round((100 * f.damage) / r.player.maxHp);
  if (share < 1) return "Tibo takes no damage in the next second";
  return `Tibo would ${hurtWords(share)} within a second, by ${f.sources
    .slice(0, 2)
    .map((x) => sourceWords(x.source))
    .join(" and ")}`;
}

// Threats come first: the models weigh the start of a description most.
function describe(r: RunView, s: SectorView): string {
  const boss = r.bosses.find((b) => b.dir === s.dir);
  // The sim forecast is exact, so it replaces the rough bullet and contact guesses when present.
  const parts = [
    s.forecast === undefined ? "" : outlook(r, s.forecast),
    boss !== undefined && boss.dist < 250 ? `toward the ${boss.name} boss only ${Math.round(boss.dist)} away, which hurts Tibo on contact` : "",
    s.forecast !== undefined ? "" : s.bulletHits > 0 ? `${plural(s.bulletHits, "enemy bullet")} would hit Tibo` : s.bulletsNear > 0 ? "enemy bullets nearby but none on course to hit" : "",
    s.forecast !== undefined ? "" : s.enemyTouches > 0 ? `${plural(s.enemyTouches, "enemy")} would bump into Tibo and hurt it` : "",
    awayFromBoss(r, s.dir) ?? "",
    s.hazard !== null ? `into ${hazardWords(s.hazard)}` : "",
    s.leavesHazard ? "out of the danger Tibo stands in" : "",
    r.hazards.some((h) => h.inside && h.source === "attack") && s.clearOfAttacks ? "clear of every boss attack" : "",
    s.enemiesNear > 0 ? `${plural(s.enemiesNear, "enemy")} close` : "no enemies close",
    s.enemiesFar > s.enemiesNear ? `${s.enemiesFar - s.enemiesNear} more further out` : "",
    ...sights(r, s.dir),
    s.xpNear >= 3 ? `${s.xpNear} xp gems to collect` : "",
  ];
  return parts.filter(Boolean).join(", ");
}

// Chests and shrines only open after Tibo stands on them for a moment, so standing still says so.
// "Stand still" must carry the threats around Tibo too, or it reads as the safest move in a swarm.
function standing(r: RunView): string {
  const near = r.sectors.reduce((n, x) => n + x.enemiesNear, 0);
  const crowd = near > 0 ? ` with ${plural(near, "enemy")} within 60 units closing in` : "";
  const forecast = r.standingForecast === undefined ? "" : `, where ${outlook(r, r.standingForecast).replace(/^Tibo /, "it ")}`;
  const touches = r.standingForecast === undefined && r.standingEnemyTouches > 0 ? `, where ${plural(r.standingEnemyTouches, "enemy")} would bump into Tibo and hurt it` : "";
  const hits = r.standingForecast === undefined && r.standingBulletHits > 0 ? `, where ${plural(r.standingBulletHits, "enemy bullet")} would hit Tibo` : "";
  const under = r.hazards.find((h) => h.inside);
  const inAttack = under === undefined ? "" : under.landsIn === undefined ? `, staying in ${hazardWords(under.kind)}` : `, staying where a boss attack lands in ${under.landsIn.toFixed(1)} seconds`;
  return `${standingSpot(r)}${crowd}${forecast}${touches}${hits}${inAttack}`;
}

function standingSpot(r: RunView): string {
  const chest = r.pickups.chests.find((c) => c.dist <= 14);
  if (chest !== undefined) return `stand still on the chest to open it, ${chest.charge ?? 0} of ${chest.chargeNeeded ?? 1} seconds done`;
  const inside = r.pois.find((p) => p.inside && p.chargeNeeded > 0);
  if (inside !== undefined) return `stand still inside the ${inside.name}${poiWhat(inside)}, charged ${inside.charge} of ${inside.chargeNeeded} seconds`;
  return "stand still";
}

// Small decision models judge one concrete option far better than they rank nine at once, so
// every direction (and standing still) is its own question. On replayed Nightmare steps, a 0-4
// hurt score per move picked a least-damaging move 98-100% of the time with Jev, against 95%
// for a yes/no danger question (which, like Laya, rated a fatal move safest when its description
// listed few threats). Only moves rated about as safe as the safest, and safe outright, compete
// on usefulness: letting any near-safest move through doubled the health lost per step.
const SAFE_MARGIN = 0.1;
const HURT_SCALE = ["takes no damage", "gets scratched", "gets badly hurt", "gets very badly hurt", "dies"];
// Share of max health a move may cost over the cheapest move in the next second and still be offered.
const AFFORDABLE_EXTRA_DAMAGE = 0.02;
const SAFE_ENOUGH = 0.5;

async function move(r: RunView) {
  const moves: Record<string, string> = {};
  for (const s of r.sectors) moves[s.dir] = `walk ${s.dir}: ${describe(r, s)}`;
  moves.stay = standing(r);
  // The game's own simulation prices every move for the next second, and Laya cannot weigh those
  // prices: on replayed states it rated a fatal move safest in 4 of 8, and it stood in hot oil
  // forecast "very badly hurt" for ten seconds while every step out was "scratched" (its danger
  // score tracks how many threats a description lists, not which). So moves that cost clearly
  // more than the cheapest are not offered, like a card Tibo cannot afford; the model chooses
  // among the rest on what the forecast cannot see (bosses closing in, crowds further out, loot).
  const cost = (k: string) => {
    const f = k === "stay" ? r.standingForecast : r.sectors.find((x) => x.dir === k)?.forecast;
    return f === undefined ? undefined : f.dead ? Number.POSITIVE_INFINITY : f.damage / r.player.maxHp;
  };
  const costs = Object.keys(moves).map(cost);
  if (costs.every((c) => c !== undefined)) {
    const cheapest = Math.min(...(costs as number[]));
    for (const k of Object.keys(moves)) if ((cost(k) ?? 0) > cheapest + AFFORDABLE_EXTRA_DAMAGE) delete moves[k];
  }
  const state = situation(r);

  // One request per step: how badly each move hurts (a score on a scale, which Jev and Laya both
  // weigh better than a yes/no "danger" question) and whether it leads somewhere useful. The bot
  // keeps the moves rated about as safe as the safest and takes the most useful of those.
  const questions: Record<string, Question> = {};
  for (const [key, text] of Object.entries(moves)) {
    questions[key] = { type: "score", instructions: `If Tibo does this: ${text}. How badly does it hurt Tibo in the next second?`, criteria: HURT_SCALE };
    questions[`useful:${key}`] = { type: "noul", instructions: `If Tibo does this: ${text}. Does it bring Tibo toward something useful, like food when hurt, a chest, a shrine to stand in, or xp gems to level up?` };
  }
  const canDash = r.player.dashCharges > 0 && r.sectors.some((x) => x.enemiesNear > 0 || (x.nearestBullet ?? 999) < 40);
  if (canDash) questions.dash = { type: "noul", instructions: "Is Tibo about to be hit or surrounded, so a quick dash away would save it?" };
  const answers = await decide(state, questions);
  const risk = (k: string) => answers[k]?.noul ?? 1;
  const safest = Math.min(...Object.keys(moves).map(risk));
  const safe = Object.keys(moves).filter((k) => risk(k) <= safest + SAFE_MARGIN && (risk(k) < SAFE_ENOUGH || risk(k) === safest));
  const choice = safe.sort((x, y) => (answers[`useful:${y}`]?.noul ?? 0) - (answers[`useful:${x}`]?.noul ?? 0) || risk(x) - risk(y))[0] ?? "stay";
  const dir = (DIRECTIONS as readonly string[]).includes(choice) ? (choice as Direction) : undefined;
  const dash = dir !== undefined && (answers.dash?.noul ?? 0) > 0.5;
  const ruledOut = r.sectors.length + 1 - Object.keys(moves).length;
  say({
    role: "action",
    model: MODEL,
    time: r.time,
    text: dir === undefined ? "Stand still" : `${dash ? "Dash" : "Walk"} ${dir}`,
    detail: [`Tibo ${HURT_SCALE[Math.round(answers[choice]?.score ?? 0)] ?? "?"}`, `useful ${Math.round((answers[`useful:${choice}`]?.noul ?? 0) * 100)}%`, ...(ruledOut > 0 ? [`${ruledOut} costlier ${ruledOut === 1 ? "move" : "moves"} ruled out`] : [])].join(" · "),
  });
  if (dash) await command({ type: "dash", dir });
  if (playingLive) return dir === undefined ? command({ type: "stop" }) : send({ type: "move", dir });
  return command(dir === undefined ? { type: "goto", to: { dx: 0, dy: 0 }, stay: STEP, pause: true } : { type: "move", dir, seconds: STEP, pause: true });
}

// Every level-up offer and what was taken, for the coach to see between consults.
const pickLog: string[] = [];

// Picks that did nothing (an item Tibo cannot afford, say) for the choice now open, so the model
// is told instead of picking them forever.
let deadPicks: { signature: string; names: Set<string> } = { signature: "", names: new Set() };

function cardKind(r: RunView, o: OptionView): string {
  const held = [...r.loadout.weapons, ...r.loadout.passives].find((x) => x.name === o.name);
  if (o.type === "weapon")
    return held === undefined ? `new weapon, fills weapon slot ${r.loadout.weapons.length + 1} of 6` : `weapon upgrade to level ${held.level + 1} of ${held.max}`;
  if (o.type === "passive")
    return held === undefined ? `new passive, fills passive slot ${r.loadout.passives.length + 1} of 6` : `passive upgrade to level ${held.level + 1} of ${held.max}`;
  return o.type === "other" ? "" : o.type;
}

// Shrine and chest options join their lines with "|", and some start with an empty one.
const cardName = (o: OptionView) => o.name.split(/\s*\|\s*/).find((part) => part !== "") ?? o.label;

async function choose(r: RunView) {
  const options = r.choice?.options ?? [];
  if (options.length === 0) throw new Error(`a ${r.choice?.kind} choice with no options`);
  const signature = `${r.tick}|${options.map((o) => o.name).join("|")}`;
  if (deadPicks.signature !== signature) deadPicks = { signature, names: new Set() };
  // The coach's upgrade list is its plan; when the row offers any of it, the pick is among those.
  // Only options that can be taken: a model shown an unaffordable card picks it again and again.
  const takeable = options.filter((o) => o.available && !deadPicks.names.has(o.name));
  if (takeable.length === 0) throw new Error(`every option of this ${r.choice?.kind} was tried without closing it: ${options.map((o) => o.name).join(", ")}`);
  const wanted = takeable.filter((o) => inPlan(o.name));
  // The coach decides what a row without any wanted card is worth: a reroll or skip, or a free pick.
  const escape = takeable.filter((o) => o.type === "other" && /^(Reroll|Skip)\b/.test(o.name));
  const fallback = plan?.otherwise === "reroll" && escape.length > 0 ? escape.slice(0, 1) : takeable;
  const considered = wanted.length > 0 ? wanted : fallback;
  // The decision API reads a choice's keys, not their descriptions: replayed picks did not change
  // at all when a note was added to the description, and Laya took a new weapon in 4 of 6 offers
  // once the key said so. So everything the model should weigh goes into the key.
  const criteria: Record<string, string> = {};
  for (const o of considered) {
    const notes = [
      cardKind(r, o),
      inPlan(o.name) ? "in the coach's plan" : "",
      ...o.combos.filter((c) => c.partnerHeld).map((c) => `pairs with your ${c.partner.name} into ${c.name}${c.ready ? " right away" : ""}`),
      o.recommended ? "the game recommends it" : "",
    ].filter(Boolean);
    const name = o.type === "other" ? cardName(o) : o.name;
    criteria[`${o.index}: ${name}${notes.length > 0 ? ` (${notes.join("; ")})` : ""}`] = o.label;
  }
  // A single wanted card needs no question: the coach already chose it.
  const only = considered.length === 1 ? considered[0] : undefined;
  const { pick } = only !== undefined ? { pick: { choice: `${only.index}: ${only.name}` } } : await decide(
    situation(r),
    { pick: { type: "choice", instructions: r.choice?.kind === "levelUp" ? "Tibo levelled up. Which upgrade makes Tibo strongest?" : `Tibo is at a ${r.choice?.kind}. Which option makes Tibo strongest?`, criteria } },
    PICK_MODEL,
  );
  const picked = considered.find((o) => o.index === Number((pick?.choice ?? "").split(":")[0])) ?? considered[0];
  const index = picked?.index ?? 0;
  const sure = pick !== undefined && "confidence" in pick ? pick.confidence : undefined;
  say({
    role: "actor",
    model: PICK_MODEL,
    time: r.time,
    text: `Take ${picked === undefined ? `option ${index}` : cardName(picked)}`,
    detail: [
      `${r.choice?.kind === "levelUp" ? "Level up" : `At a ${r.choice?.kind}`}: ${options.map(cardName).join(", ")}`,
      only !== undefined ? "the only card on the planner's list" : wanted.length > 0 ? "from the planner's list" : sure === undefined ? "" : `${Math.round(sure * 100)}% sure`,
    ]
      .filter(Boolean)
      .join("\n"),
  });
  if (picked !== undefined) deadPicks.names.add(picked.name);
  pickLog.push(
    `${clock(r.time)} ${r.choice?.kind}: offered ${options.map((o) => o.name).join(", ")}; took ${picked?.name ?? index}${wanted.length > 0 ? " (from the want list)" : ""}; slots weapons ${r.loadout.weapons.length}/6, passives ${r.loadout.passives.length}/6`,
  );
  return command({ type: "choose", index });
}

let rescuedLink: string | undefined;

async function start(): Promise<void> {
  let started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY }, 120);
  if (started.state !== "done") {
    // The page has already shown the finished run's link by now; a reload would lose it.
    rescuedLink = (await api<Snap>("/state")).lastRunLink ?? rescuedLink;
    console.log(`start failed (${started.detail ?? started.state}); reloading the game page`);
    if (RELOAD !== "") await fetch(RELOAD).catch(() => undefined);
    await Bun.sleep(8000);
    started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY }, 120);
    if (started.state !== "done") throw new Error(`could not start a run: ${started.detail ?? started.state}`);
  }
  await command({ type: "speed", factor: SPEED });
  // A new run waits paused at tick 0 at lockstep speed, so the next step applies the mode again.
  playingLive = undefined;
}

let recordCrash: ((e: unknown) => Promise<void>) | undefined;

async function main() {
  await mkdir(path.dirname(LOG), { recursive: true });
  await Bun.write(LOG, "");
  const log = Bun.file(LOG).writer();
  if (TRACE) trace = (entry) => log.write(`${JSON.stringify(entry)}\n`);
  let runs = 0;
  let lastReport = -1;
  let steps = 0;
  let notes: RunNotes | undefined;
  let reviewing: RunNotes | undefined;
  let coach: Coach | undefined;
  let consulting: Promise<void> | undefined;
  let last: RunView | undefined;
  const recent: string[] = [];
  // The previous run's notes wait for its share link, which appears while the next run starts.
  let awaitingLink: { notes: RunNotes; known: string | undefined } | undefined;
  console.log(`model ${MODEL}, ${MODE} ${DIFFICULTY}, step ${STEP}s, speed x${SPEED}, coach ${COACH}, log ${LOG}`);
  // A run the bot is stopped in the middle of says so in its notes instead of staying "in progress".
  const stop = async (signal: string) => {
    if (reviewing !== undefined) {
      reviewing.review = `Interrupted: the bot was stopped (${signal}) before the review finished. Rerun it with ./scripts/tibo-bot.ts --review ${reviewing.file}`;
      await reviewing.write();
    }
    if (notes !== undefined) {
      notes.link = "none (run aborted)";
      notes.outcome = `- Aborted at ${last === undefined ? "the start" : clock(last.time)}: the bot was stopped (${signal}).`;
      notes.review = "No review: the run was stopped, not lost.";
      await notes.write();
    }
    process.exit(0);
  };
  process.on("SIGINT", () => void stop("SIGINT"));
  process.on("SIGTERM", () => void stop("SIGTERM"));
  recordCrash = async (e) => {
    if (notes === undefined) return;
    notes.link = "none (bot crashed)";
    notes.outcome = `- Crashed at ${last === undefined ? "the start" : clock(last.time)}: ${e instanceof Error ? e.message : String(e)}`;
    notes.review = "No review: the bot crashed.";
    await notes.write();
  };
  await command({ type: "speed", factor: SPEED });
  const now = await api<Snap>("/state");
  // Every run the bot starts begins fresh, so a Daily always begins at tick 0 on its fixed seed.
  let adopted = TAKEOVER && now.run !== undefined && now.screen !== "over" && now.screen !== "title";
  say({
    role: "system",
    text: adopted ? `Taking over the run at ${clock(now.run?.time ?? 0)}.` : `Starting a ${MODE === "daily" ? "Daily" : "Open World"} run on ${DIFFICULTY}.`,
    detail: `Planner ${PLANNER}, actor ${PICK_MODEL}, action model ${MODEL}`,
  });
  if (!adopted) await start();
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

  for (;;) {
    const s = await timed("state", api<Snap>("/state"));
    if (!s.connected) throw new Error("the game tab is not connected to the agent server");
    await fillLink(s);
    if (s.screen === "title" || s.screen === "over") {
      if (s.screen === "over" && s.lastRun !== undefined && runs > 0 && notes !== undefined && coach !== undefined) {
        const avg = latency.reduce((x, y) => x + y, 0) / Math.max(1, latency.length);
        console.log(`run ${runs} ended at ${s.lastRun.time}s, level ${s.lastRun.level}, ${s.lastRun.kills} kills, ${steps} steps, ${Math.round(avg)}ms per decision`);
        say({ role: "system", time: s.lastRun.time, text: `Run over at ${clock(s.lastRun.time)}, level ${s.lastRun.level}, ${s.lastRun.kills} kills.` });
        console.log(`  damage taken: ${Object.entries(s.lastRun.damageTaken).map(([k, v]) => `${k} ${v}`).join(", ")}`);
        log.write(`${JSON.stringify({ event: "end", model: MODEL, mode: MODE, difficulty: DIFFICULTY, notes: notes.id, ...s.lastRun, steps, coachCalls: coach.calls, avgDecisionMs: Math.round(avg) })}\n`);
        log.flush();
        // The run is over; a stop from here on must not mark it aborted, only note the missing review.
        const ended = notes;
        reviewing = ended;
        notes = undefined;
        // The share link only exists on the run summary, and a page reload loses it, so it goes into
        // the notes now, before the review, rather than whenever the next run starts.
        const summary = await command({ type: "summary" }, 60);
        const shown = (await api<Snap>("/state")).lastRunLink;
        if (summary.state === "done" && shown !== undefined && shown !== s.lastRunLink) {
          ended.link = shown;
          await ended.write();
          console.log(`run link: ${shown}`);
        } else {
          console.log(`run summary showed no link (${summary.detail ?? summary.state}); it is read again when the next run starts`);
          awaitingLink = { notes: ended, known: s.lastRunLink };
        }
        await coach.review(s.lastRun, last, recent);
        reviewing = undefined;
        console.log(`notes: ${ended.file}`);
        coach = undefined;
        if (runs >= RUNS) {
          if (awaitingLink !== undefined) {
            await start();
            await fillLink(await api<Snap>("/state"));
          }
          return;
        }
      } else if (notes !== undefined) {
        // tibo.dog reloads itself when it ships a new build, which drops the run with no death screen.
        console.log(`run ${runs} was lost at ${last === undefined ? "the start" : clock(last.time)}: the game left it without a death screen`);
        notes.link = "none (run lost)";
        notes.outcome = `- Lost at ${last === undefined ? "the start" : clock(last.time)}: the game page left the run without a death screen (tibo.dog reloads itself for a new build).`;
        notes.review = "No review: the run was cut off, not lost to the game.";
        await notes.write();
        notes = undefined;
        coach = undefined;
      }
      await start();
      runs++;
      steps = 0;
      plan = undefined;
      lastReport = -1;
      latency.length = 0;
      recent.length = 0;
      continue;
    }
    const r = s.run;
    if (r === undefined) {
      await Bun.sleep(100);
      continue;
    }
    if (notes === undefined || coach === undefined) {
      // Chosen while the game is paused at tick 0, so the coach's wait does not cost game time.
      const experiment = !adopted && COACH !== "none" && (await experimentDue()) ? await chooseExperiment() : undefined;
      notes = new RunNotes(r, await readStrategy(), experiment, !adopted);
      adopted = false;
      coach = new Coach(notes);
      await notes.write();
      console.log(`run seed ${r.seed}${r.daily ? " (daily)" : ""}, notes ${notes.saved ? notes.file : "not saved (taken over mid-run)"}`);
      if (experiment !== undefined) {
        console.log(`experiment run: ${experiment.name}: ${experiment.directive}`);
        say({ role: "planner", model: PLANNER, time: r.time, text: `Experiment run: ${experiment.name}`, detail: experiment.directive });
      }
    }
    last = r;
    if (Math.floor(r.time / 30) !== lastReport) {
      lastReport = Math.floor(r.time / 30);
      const per = (ms: number) => Math.round(ms / Math.max(1, timings.steps));
      console.log(
        `${r.time}s hp ${Math.round(r.player.hp)}/${Math.round(r.player.maxHp)} lv ${r.player.level} enemies ${r.enemies.total} ${r.loadout.weapons.map((w) => `${w.id}:${w.level}`).join(",")} | per step: state ${per(timings.state)}ms decide ${per(timings.decide)}ms command ${per(timings.command)}ms`,
      );
      Object.assign(timings, { state: 0, decide: 0, command: 0, steps: 0 });
      log.write(`${JSON.stringify({ event: "tick", time: r.time, hp: r.player.hp, level: r.player.level, enemies: r.enemies.total })}\n`);
      log.flush();
    }
    steps++;
    timings.steps++;
    const live = s.live === true;
    if (live !== playingLive) await playLive(live, r);
    const stepStarted = performance.now();
    const asking = (consulting ??= coach
      .consult(r)
      .catch((e: unknown) => console.error("coach consult failed:", e instanceof Error ? e.message : e))
      .finally(() => {
        consulting = undefined;
      }));
    // Lockstep holds the paused game until the coach answers, unless DO IT LIVE is pressed meanwhile;
    // then the answer lands whenever it comes, as it does in live play.
    if (!live) await Promise.race([asking, untilLive(() => consulting !== asking)]);
    recent.push(situation(r));
    if (recent.length > 4) recent.shift();
    if (s.screen === "choice") await choose(r);
    else await move(r);
    if (live) await Bun.sleep(Math.max(0, LIVE_MIN_STEP_MS - (performance.now() - stepStarted)));
  }
}

const reviewTarget = option("review", "");
if (reviewTarget !== "") await reviewNotesFile(reviewTarget);
else
  await main().catch(async (e: unknown) => {
    await recordCrash?.(e);
    throw e;
  });
