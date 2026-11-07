#!/usr/bin/env bun
// Plays tibo.dog through the agent server in three layers. strategy.md is the game knowledge,
// rewritten after every run from the run's log. The planner (grok) reads it with the whole state
// and the game's descriptions, picks every level-up, chest and shrine option, and sets short-term
// goals. The action model (a System One decision model) steps around danger on the way to the
// goal, told only the goal and what each move costs. The file removes only options the game itself
// rules out: cards Tibo cannot take, and moves the game's own simulation says cost clearly more
// health over the next second than the cheapest one.
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import { appendFile, mkdir, rm } from "node:fs/promises";
import { BRIDGE_ORIGIN as DEFAULT_ORIGIN, type ChatLine, type CommandStatus, DIRECTIONS, type Direction, type CardOption, type Encyclopedia, type ForecastView, type MoveOption, type OptionView, type PilotPace, type RunView, type SectorView, type Snapshot } from "../src/agent/protocol";

const args = process.argv.slice(2);
const option = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};
const MODEL = option("model", "h2o-lightning-4b@q8_0");
// The decision model's planner persona, which picks cards and goals; the same model unless named.
const PLAN_MODEL = option("plan-model", MODEL);
const SERVER = option("server", process.env.TIBO_SERVER ?? DEFAULT_ORIGIN);
// A System One decisions endpoint: LM Studio locally, or OpenRouter's (`--decider openrouter`),
// which serves TypeSafe's Jev models and needs OPENROUTER_API_KEY.
const DECIDERS: Record<string, string> = { lmstudio: "http://localhost:1234/v1/systemone", openrouter: "https://openrouter.ai/api/alpha/decisions" };
const DECIDER = DECIDERS[option("decider", "lmstudio")] ?? option("decider", "lmstudio");
const DECIDER_KEY = new URL(DECIDER).hostname === "openrouter.ai" ? process.env.OPENROUTER_API_KEY : undefined;
if (new URL(DECIDER).hostname === "openrouter.ai" && !DECIDER_KEY) throw new Error("--decider openrouter needs OPENROUTER_API_KEY (in .env.local, managed by env-manager)");
const STEP = Number(option("step", "0.35"));
const PLAN_EVERY = Number(option("plan-every", "5"));
const RUNS = Number(option("runs", "1"));
const DIFFICULTY = option("difficulty", "easy");
const MODE = option("mode", "daily");
const SPEED = Number(option("speed", "4"));
// The coach (grok) only works after a run: it reviews it and names the next experiment.
const COACH = option("coach", "grok");
const COACH_MODEL = option("coach-model", "grok-4.7-build-fast");
// For "Grok take the wheel": play the run already in progress instead of starting a fresh one.
const TAKEOVER = args.includes("--takeover");
// Incognito runs just play: no notes file, no review, and they do not count toward experiments.
const INCOGNITO = args.includes("--incognito");
const RELOAD = option("reload", "http://127.0.0.1:7358/reload");
const LOG = option("log", path.join(import.meta.dir, "..", ".runs", `${MODEL.replace(/[^\w.@-]/g, "_")}-${Date.now()}.jsonl`));

/**
 * `pace` is the panel's plan and action intervals, read every step so they can change mid-run, and
 * sent only to a bot the panel started.
 */
type Snap = Snapshot & { connected: boolean; ageMs: number; pace?: PilotPace; incognito?: boolean };
/** Seconds between planner calls while a goal is under way, and between steps (game time in lockstep, wall time live). */
let pace: PilotPace = { planEvery: PLAN_EVERY, actEvery: STEP };
/** Whether the panel started this bot, which someone is watching. */
let piloted = false;
const PICK_SHOW_MS = 4000;

const COACH_NAME = `${COACH} ${COACH_MODEL}`;
let chatQueue = Promise.resolve();
/**
 * A line for the panel's chat, shown while the bot has the wheel. Never awaited, so the chat cannot
 * slow a step, but sent in order, so a late streamed update never overwrites a final message.
 */
function say(line: ChatLine) {
  const body = JSON.stringify(line);
  chatQueue = chatQueue.then(() => fetch(`${SERVER}/pilot/say`, { method: "POST", headers: { "content-type": "application/json" }, body }).then(() => undefined, () => undefined));
}

/** One coach message, rewritten as the coach reads its prompt, thinks, and answers. */
class CoachBubble {
  private static made = 0;
  private line: ChatLine;
  constructor(text: string, time?: number) {
    this.line = { role: "planner", model: COACH_NAME, text, key: `coach-${process.pid}-${CoachBubble.made++}`, ...(time === undefined ? {} : { time }) };
  }
  set(fields: Partial<ChatLine>) {
    this.line = { ...this.line, ...fields };
    say(this.line);
  }
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

async function command(c: unknown, timeoutSeconds = 30) {
  return timed("command", api<CommandStatus & { interruptedBy?: string }>(`/command?wait=1&timeout=${timeoutSeconds}`, c));
}
/** Sends a command without waiting for it to finish, such as a move held until the next one. */
async function send(c: unknown) {
  return timed("command", api<{ id: number }>("/command", c));
}

// Live play runs the game in real time and never pauses it: each move is held until the next
// decision replaces it. A level-up or chest still stops the game, as it does for a person.
// `--lockstep` instead runs the game a step at a time and pauses it while the models think, so the
// same model on the same Daily replays the same game.
const LIVE = !args.includes("--lockstep");
/** Whether this run's game has been set to play live or in lockstep; a new run starts unset. */
let modeSet = false;

async function setMode() {
  await command({ type: "speed", factor: LIVE ? 1 : SPEED });
  await command({ type: "forecast", live: LIVE });
  await command({ type: LIVE ? "resume" : "pause" });
  modeSet = true;
}

const latency: number[] = [];
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
  // A score is an index into its criteria; as a share of the scale it reads like a noul.
  for (const [key, q] of Object.entries(questions)) {
    const a = json.answers[key];
    if (q.type === "score" && a?.score !== undefined) a.noul = a.score / Math.max(1, q.criteria.length - 1);
  }
  return json.answers;
}

// ---- Learning loop -------------------------------------------------------------------------
// After a run the coach reviews its log, notes and stats and rewrites strategy.md for the next.
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
// A post-run review rewrites three files in one reply, which can take grok a few minutes.
const REVIEW_TIMEOUT_MS = 900_000;

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

// The coach names the next experiment at the end of each review, so no model is asked when a run starts.
const NEXT_EXPERIMENT_FILE = path.join(GAMEPLAY, "next-experiment.json");

async function chooseExperiment(): Promise<Experiment | undefined> {
  const file = Bun.file(NEXT_EXPERIMENT_FILE);
  const next = (await file.exists()) ? ((await file.json()) as Partial<Experiment>) : undefined;
  if (FORCED_EXPERIMENT !== "" && next?.name !== FORCED_EXPERIMENT) {
    // A named experiment plays its entry in experiments.md as written.
    const entry = (await readExperiments()).split("\n\n").find((p) => p.includes(`**${FORCED_EXPERIMENT}**`));
    if (entry === undefined) throw new Error(`--experiment ${FORCED_EXPERIMENT} is not in ${EXPERIMENTS_FILE}`);
    return { name: FORCED_EXPERIMENT, hypothesis: "", directive: entry.replace(/\s+/g, " ").trim() };
  }
  if (typeof next?.name !== "string" || typeof next.directive !== "string") {
    console.log(`an experiment run is due but ${NEXT_EXPERIMENT_FILE} names none; playing a serious run`);
    return undefined;
  }
  say({ role: "system", time: 0, text: `Experiment run: ${next.name}`, detail: next.directive });
  return { name: next.name, hypothesis: next.hypothesis ?? "", directive: next.directive };
}

const csvField = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

async function infraFeedback(run: string, time: string, note: string) {
  const text = note.trim();
  if (text === "") return;
  await appendFile(FEEDBACK_FILE, `${[today(), run, time, text.replace(/\s+/g, " ")].map(csvField).join(",")}\n`);
}

const STREAM_EVERY_MS = 250;
const STREAM_TAIL = 900;

/**
 * Runs the coach CLI once and returns the JSON object in its reply, or undefined. Its reasoning
 * and reply stream into `bubble` as they arrive, and hovering the bubble shows the prompt.
 */
async function askCoach(prompt: string, timeoutMs: number, bubble: CoachBubble): Promise<Record<string, unknown> | undefined> {
  if (COACH === "none") return undefined;
  const started = performance.now();
  bubble.set({ inspect: { kind: "prompt", prompt } });
  const proc = Bun.spawn(["grok", "-p", prompt, "-m", COACH_MODEL, "--output-format", "streaming-json"], { cwd: os.tmpdir(), stdout: "pipe", stderr: "pipe" });
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    proc.kill();
  }, timeoutMs);
  const seconds = () => Math.round((performance.now() - started) / 1000);
  let reasoning = "";
  let text = "";
  const finish = (fields: Partial<ChatLine>) =>
    bubble.set({ stream: undefined, inspect: { kind: "prompt", prompt, ...(reasoning === "" ? {} : { reasoning }), ...(text === "" ? {} : { reply: text }) }, ...fields });
  try {
    const decoder = new TextDecoder();
    let buffer = "";
    let shown = 0;
    for await (const chunk of proc.stdout) {
      buffer += decoder.decode(chunk, { stream: true });
      for (let nl = buffer.indexOf("\n"); nl >= 0; nl = buffer.indexOf("\n")) {
        const event = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (event === "") continue;
        try {
          const e = JSON.parse(event) as { type?: string; data?: unknown };
          if (e.type === "thought" && typeof e.data === "string") reasoning += e.data;
          if (e.type === "text" && typeof e.data === "string") text += e.data;
        } catch {}
      }
      if (performance.now() - shown >= STREAM_EVERY_MS) {
        shown = performance.now();
        const live = text === "" ? reasoning : `${reasoning}\n\n${text}`;
        if (live !== "") bubble.set({ stream: live.length > STREAM_TAIL ? `…${live.slice(-STREAM_TAIL)}` : live });
      }
    }
    const json = text.match(/\{[\s\S]*\}/)?.[0];
    if (json === undefined) {
      const err = (await new Response(proc.stderr).text()).trim();
      console.error(`coach gave no JSON after ${seconds()}s${timedOut ? " (timed out)" : ""}: ${(text.trim() || err).slice(0, 300) || "(empty output)"}`);
      finish({ text: `No answer after ${seconds()}s${timedOut ? " (timed out)" : ""}; the previous plan stands.` });
      return undefined;
    }
    finish({});
    return JSON.parse(json) as Record<string, unknown>;
  } catch (e) {
    console.error(`coach reply unreadable after ${seconds()}s:`, e instanceof Error ? e.message : e);
    finish({ text: `Unreadable answer after ${seconds()}s; the previous plan stands.` });
    return undefined;
  } finally {
    clearTimeout(timer);
  }
}

/** The run's notes file, rendered from gameplay/notes/TEMPLATE.md and rewritten on every change. */
class RunNotes {
  readonly id: string;
  readonly file: string;
  /** The run's CSV log, one row per model call; outside the repo, see LOG_DIR. */
  readonly log: string;
  link = "pending: written once the game shows the run summary";
  timeline: string[] = [];
  outcome = "(the run is in progress)";
  review = "(written after the run)";
  private fields: Record<string, string>;

  /**
   * A run the bot took over from a person is not saved: its notes would credit the bot with
   * someone else's opening, and the mode and difficulty it was started with are unknown. Neither is
   * an incognito run.
   */
  constructor(r: RunView, strategy: string, readonly experiment?: Experiment, public saved = true) {
    const stamp = new Date().toISOString().replace(/[:T]/g, "-").slice(0, 19);
    this.id = `${stamp}-${MODE}-${DIFFICULTY}-${r.seed}`;
    this.file = path.join(NOTES_DIR, `${this.id}.md`);
    this.log = path.join(LOG_DIR, `${this.id}.csv`);
    this.fields = {
      title: `Run ${stamp.slice(0, 10)} ${stamp.slice(11, 16).replace("-", ":")}, ${MODE} ${DIFFICULTY}`,
      date: new Date().toISOString(),
      mode: MODE,
      difficulty: DIFFICULTY,
      seed: r.seed,
      model: PLAN_MODEL === MODEL ? MODEL : `${MODEL} (moves), ${PLAN_MODEL} (plans and picks)`,
      coach: COACH === "none" ? "none" : COACH_NAME,
      step: String(pace.actEvery),
      speed: String(SPEED),
      strategy: `strategy.md ${createHash("sha1").update(strategy).digest("hex").slice(0, 8)}`,
      kind: experiment === undefined ? "serious" : `experiment: ${experiment.name}`,
      log: this.log,
      experiment:
        experiment === undefined
          ? "None: a serious run that follows strategy.md."
          : `**${experiment.name}**\n\nHypothesis: ${experiment.hypothesis}\n\nDirective: ${experiment.directive}`,
    };
  }

  /** Incognito was turned on mid-run: the notes so far go, and nothing more is written or reviewed. */
  async discard() {
    this.saved = false;
    await rm(this.file, { force: true });
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

const pct = (part: number, whole: number) => Math.round((100 * part) / Math.max(1, whole));
const near = (r: RunView) => r.sectors.reduce((n, s) => n + s.enemiesNear, 0);

const GAME_RULES = [
  "tibo.dog is a survivors-like game. Weapons fire on their own; the player only walks, dashes, and picks level-up upgrades, chest rewards and shrine options.",
  "A base weapon at max level plus its catalyst (a passive or an item) evolves at the next chest; evolved weapons are much stronger. Two evolved weapons can sometimes fuse into a union.",
  "During a run, a small fast decision model plays in two personas. As the planner it reads strategy.md (the game knowledge) and the whole state before every decision, picks every level-up, chest and shrine option, and weighs every goal Tibo could take on next, one at a time: a chest to open, a shrine or other spot to charge, food to eat, xp gems to collect, a direction to explore, or a spell of evading. The highest-rated goal wins. As the action model it steers each step toward the goal, seeing only the goal and what each move costs over the next second.",
].join("\n");

// ---- Run log -------------------------------------------------------------------------------
// One CSV row per model call and per goal that starts or ends, with the player's state at that
// moment, so a run can be read back decision by decision. The post-run review reads it.
const LOG_DIR = option("log-dir", "/tmp/tibobit");
// Numbers first and free text last, so a reader splitting on commas gets the numbers right.
const LOG_COLUMNS = [
  "time",
  "seconds",
  "wall",
  "event",
  "model",
  "ms",
  "hp",
  "max_hp",
  "hp_lost",
  "level",
  "xp_pct",
  "gold",
  "x",
  "y",
  "dash",
  "enemies",
  "enemies_near",
  "goal",
  "action",
  "reason",
  "detail",
  "bosses",
  "hurt_by",
  "standing_on",
  "underfoot",
  "chests",
  "food",
  "pois",
  "weapons",
  "passives",
  "items",
  "options",
] as const;
type LogEvent = "plan" | "pick" | "move" | "goal" | "run_end";
type LogRow = { event: LogEvent; model?: string; reason?: string; goal?: string; action?: string; options?: string; detail?: string; ms?: number };

class RunLog {
  /** Health at the previous row, for `hp_lost`. */
  private hp: number | undefined;
  constructor(readonly file: string) {
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, `${LOG_COLUMNS.join(",")}\n`);
  }

  write(r: RunView | undefined, row: LogRow) {
    const p = r?.player;
    const lost = p === undefined || this.hp === undefined ? "" : String(Math.max(0, Math.round(this.hp - p.hp)));
    if (p !== undefined) this.hp = p.hp;
    const at = (x: { dist: number; dir: string }) => `${Math.round(x.dist)} ${x.dir}`;
    const state: Partial<Record<(typeof LOG_COLUMNS)[number], string | number>> =
      r === undefined || p === undefined
        ? {}
        : {
            time: clock(r.time),
            seconds: r.time,
            hp: Math.round(p.hp),
            max_hp: Math.round(p.maxHp),
            hp_lost: lost,
            level: p.level,
            xp_pct: pct(p.xp, p.xpNext),
            gold: p.gold,
            x: Math.round(p.x),
            y: Math.round(p.y),
            dash: p.dashCharges,
            enemies: r.enemies.total,
            enemies_near: near(r),
            bosses: r.bosses.map((b) => `${b.name} ${at(b)} ${pct(b.hp, b.maxHp)}%`).join("; "),
            hurt_by: Object.entries(p.hurtBy).map(([k, v]) => `${k} ${v}`).join("; "),
            standing_on: spotLine(r) ?? "",
            underfoot: r.hazards.filter((h) => h.inside).map((h) => h.kind).join("; "),
            chests: r.pickups.chests.slice(0, 3).map(at).join("; "),
            food: r.pickups.nearest.filter((x) => x.kind === "heal").slice(0, 2).map(at).join("; "),
            pois: r.pois.filter((x) => x.chargeNeeded > 0).slice(0, 4).map((x) => `${x.name} ${at(x)}`).join("; "),
            weapons: r.loadout.weapons.map((w) => `${w.name} ${w.level}/${w.max}`).join("; "),
            passives: r.loadout.passives.map((w) => `${w.name} ${w.level}/${w.max}`).join("; "),
            items: r.loadout.items.map((i) => `${i.name} x${i.count}`).join("; "),
          };
    const values = { ...state, ...row, wall: new Date().toISOString().slice(11, 19) } as Record<string, string | number | undefined>;
    appendFileSync(this.file, `${LOG_COLUMNS.map((c) => csvField(String(values[c] ?? ""))).join(",")}\n`);
  }
}

/** The run log for the review, cut to fit: moves that cost nothing go first when it is long. */
async function logForReview(file: string): Promise<string> {
  const f = Bun.file(file);
  if (!(await f.exists())) return "(no log: it was not found)";
  const text = await f.text();
  if (text.length <= REVIEW_LOG_CHARS) return text;
  const lines = text.trimEnd().split("\n");
  const header = (lines[0] ?? "").split(",");
  const event = header.indexOf("event");
  const lost = header.indexOf("hp_lost");
  const kept = lines.filter((l, i) => {
    const cells = l.split(",");
    return i === 0 || cells[event] !== "move" || Number(cells[lost]) > 0;
  });
  const cut = kept.join("\n");
  return cut.length <= REVIEW_LOG_CHARS ? `${cut}\n(moves that cost no health left out)` : `${cut.slice(0, REVIEW_LOG_CHARS)}\n(cut off at ${REVIEW_LOG_CHARS} characters)`;
}
const REVIEW_LOG_CHARS = 400_000;

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

type Moment = { time?: unknown; happened?: unknown; better?: unknown };

/**
 * Asks the coach to review a finished run from its log, rewrites strategy.md from its answer and
 * files its infrastructure suggestions. Returns the review: a paragraph and the moments that
 * decided the run.
 */
async function reviewRun(timeline: string, outcome: string, log: string, runId: string, endTime: string, experiment?: Experiment): Promise<string | undefined> {
  if (COACH === "none") return undefined;
  const experimentReply =
    experiment === undefined
      ? ""
      : ', "experiment": {"expected": "which parts of the hypothesis played out as expected, and why", "unexpected": "which did not, and why", "lesson": "what a serious run should take from this, or that it should take nothing"}';
  const prompt = [
    "You coach a bot that plays tibo.dog, and a run just ended.",
    GAME_RULES,
    `Goal: survive 20 minutes on ${DIFFICULTY} in today's ${MODE === "daily" ? "Daily (the same seed every attempt today)" : "Open World"}.`,
    "Current strategy file, the game knowledge the planner reads before every decision:",
    await readStrategy(),
    "Every finished run in this mode so far, longest first. Compare builds and timings across runs before trusting a lesson from one run:",
    await runHistory(),
    "The experiment list:",
    await readExperiments(),
    "Results of earlier experiment runs (CSV):",
    await experimentLog(),
    experiment === undefined
      ? "This was a serious run that followed the strategy file."
      : `This was an experiment run, not a serious one: **${experiment.name}**. Hypothesis: ${experiment.hypothesis} Directive it played: ${experiment.directive} Judge the experiment on what it was testing, not on survival alone, and take into strategy.md only the parts that held up.`,
    "Picks this run:",
    timeline || "(none)",
    "Outcome:",
    outcome,
    "This run's log: one row per model call (plan: the planner chose the next goal; pick: the planner took a level-up, chest or shrine option; move: the action model chose a step because the way to the goal was costly), with the odds it gave each option, and one row per goal that started or ended, with the player's state at that moment. hp_lost is health lost since the row before.",
    log,
    "Go through the log: find the points that decided the run, good or bad, and what should have happened instead.",
    "Then choose the experiment the next experiment run will play: the one that would teach the most now, untried ideas first, or a retry where a result was unclear. You may also invent one and add it to the list.",
    "Answer from these facts alone; do not browse, search or use tools.",
    'Reply with only JSON: {"review": "a short paragraph: why the run ended, what worked, what to change", "moments": [5 to 12 objects {"time": "m:ss", "happened": "what was decided and what came of it", "better": "what the planner or the action model should have done instead, or \\"right call\\" for a decision worth repeating"}], "strategy": "the full updated strategy.md in Markdown: the game knowledge the planner reads before every pick and every goal. The planner is a small model, so write short, plain rules it can apply directly, naming cards and spots exactly as the game does. Generalize from this run and the history into advice that holds across runs: which picks to make in which order, which goals to set in which phase of a run (chests, shrines, food, gems, exploring, evading) and which to avoid. Seed-specific facts only where the Daily repeats. Keep its sections, stay under 70 lines, and add one dated line to Lessons", "infra": ["concrete suggestions to improve the data or controls the bot has"], "experiments": "the full updated experiments.md: keep its intro, add new ideas this run suggests, and under each idea record its status and what runs so far showed and why", "next_experiment": {"name": "the experiment name exactly as in the list", "hypothesis": "one sentence: what you expect to happen and why", "directive": "the high-level strategy for that run in two to four short sentences, for the small planner model: what to pick, which goals to favour, and what to give up"}' +
      experimentReply +
      "}",
  ].join("\n\n");
  const bubble = new CoachBubble("Reviewing the run and rewriting the strategy…");
  const reply = await askCoach(prompt, REVIEW_TIMEOUT_MS, bubble);
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
  const next = reply.next_experiment as Partial<Experiment> | undefined;
  if (typeof next?.name === "string" && typeof next.directive === "string") {
    await Bun.write(NEXT_EXPERIMENT_FILE, `${JSON.stringify({ name: next.name, hypothesis: next.hypothesis ?? "", directive: next.directive }, null, 2)}\n`);
    console.log(`next experiment: ${next.name}`);
  }
  const result = reply.experiment as Record<string, unknown> | undefined;
  if (experiment !== undefined && result !== undefined) {
    const field = (k: string) => (typeof result[k] === "string" ? String(result[k]).replace(/\s+/g, " ") : "");
    const row = [today(), runId, experiment.name, experiment.hypothesis, endTime, field("expected"), field("unexpected"), field("lesson")];
    await appendFile(EXPERIMENTS_CSV, `${row.map(csvField).join(",")}\n`);
    console.log(`experiments.csv: ${experiment.name}`);
  }
  if (typeof reply.review !== "string") return undefined;
  bubble.set({ text: reply.review });
  const moments = Array.isArray(reply.moments) ? (reply.moments as Moment[]) : [];
  const lines = moments.filter((m) => typeof m.happened === "string").map((m) => `- **${String(m.time ?? "?")}** ${String(m.happened)} Better: ${String(m.better ?? "?")}`);
  return lines.length === 0 ? reply.review : `${reply.review}\n\n### Moments\n\n${lines.join("\n")}`;
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
  const logFile = text.match(/\| Log \| (.+?) \|/)?.[1] ?? "";
  const review = await reviewRun(section("Timeline"), outcome, await logForReview(logFile), path.basename(file, ".md"), time, experiment);
  if (review === undefined) throw new Error("the coach gave no review");
  await Bun.write(file, text.replace(/## Review\n\n[\s\S]*$/, `## Review\n\n${review}\n`));
  console.log(`reviewed ${file}`);
}

// ---- What the game says about things -------------------------------------------------------
// The planner reads the game's own description of every card it holds or is offered.
type Book = Map<string, string>;
let book: Book | undefined;

async function readBook(): Promise<Book> {
  if (book !== undefined) return book;
  try {
    const e = await api<Encyclopedia>("/encyclopedia");
    const out: Book = new Map();
    for (const [kind, defs] of [
      ["weapon", e.weapons],
      ["passive", e.passives],
      ["item", e.items],
    ] as const)
      for (const d of defs as { id?: string; description?: string }[]) if (d.id !== undefined && d.description !== undefined) out.set(`${kind}:${d.id}`, d.description);
    book = out;
    return out;
  } catch (e) {
    // Asked again next time: the page sends the encyclopedia a moment after it connects.
    console.error("no encyclopedia yet:", e instanceof Error ? e.message : e);
    return new Map();
  }
}

const said = (b: Book, kind: string, id: string) => {
  const d = b.get(`${kind}:${id}`);
  return d === undefined ? "" : `: ${d.replace(/\s+/g, " ").trim()}`;
};

// ---- Goals ---------------------------------------------------------------------------------
// The planner sets goals, things to collect or places to explore for, by the ids it is shown.
// The page walks Tibo to the goal on its own while the way there costs no more than the safest
// move, by the game's own forecast. When it costs more, the action model picks the step, told
// only the goal and what each move costs. A goal ends when it is used up, reached, stuck or late.
type Goal = { kind: "chest" | "poi" | "food"; uid: number } | { kind: "explore"; dir: Direction } | { kind: "gems" } | { kind: "evade" };
type TargetGoal = Extract<Goal, { uid: number }>;
type Pursuit = {
  goal: Goal;
  id: string;
  title: string;
  since: number;
  deadline: number;
  /** The least work left so far (distance, plus seconds of charging as distance) and when. */
  best: { left: number; time: number };
  origin: { x: number; y: number };
  /** Chests listed before the goal began; exploring ends on any other. */
  known: Set<string>;
  /** A target is only "used up" once it was seen: one missing from the start was never there. */
  seen: boolean;
  commandId?: number;
  /** The command now steering it, to send it again only when it changes or ends. */
  sent?: string;
};
/** Where a goal points now. `heading` is absent while evading, which always asks the action model. */
type Aim = { heading?: Direction | "stay"; left?: number; progress: string; to?: { pickup: number } | { poi: number } };
type Ended = { done: string; success: boolean };
type Outcome = { time: number; id: string; title: string; outcome: string; success: boolean };

const GOAL_SPEED = 45;
const GOAL_SLACK = 10;
const GOAL_STUCK_SECONDS = 6;
const EXPLORE_DISTANCE = 300;
const GEMS_SECONDS = 12;
const EVADE_SECONDS = 8;
const PLAN_RANGE = 600;
const ON_CHEST = 14;
// A target given up on is marked for the planner and skipped by the bot's own goals for a while: a
// Potato Crate charges nothing without the gold for it.
const GIVE_UP_SECONDS = 45;
// A lockstep goal step ends by timing out, and food collected on touch ends as "gone" before the
// goto counts it as reached; the next step's look at the target tells which it was.
const STEP_OVER = new Set(["timeout", "the target is gone"]);

let pursuit: Pursuit | undefined;
const outcomes: Outcome[] = [];
const giveUps = new Map<string, number>();
// Every chest listed so far this run; exploring ends on one never listed before. Spots are not
// counted: the map is dense with them, and exploring stopped every second or two on a new one.
const everListed = new Set<string>();

function resetGoals() {
  pursuit = undefined;
  outcomes.length = 0;
  giveUps.clear();
  everListed.clear();
}

function goalId(g: Goal): string {
  switch (g.kind) {
    case "chest":
      return `C${g.uid}`;
    case "poi":
      return `P${g.uid}`;
    case "food":
      return `F${g.uid}`;
    case "explore":
      return `explore ${g.dir}`;
    default:
      return g.kind;
  }
}

const TARGET_KINDS = { C: "chest", P: "poi", F: "food" } as const;

function parseGoal(text: string): Goal | undefined {
  const id = text.trim();
  const target = id.match(/^([CPF])(\d+)$/i);
  if (target !== null) return { kind: TARGET_KINDS[(target[1] ?? "C").toUpperCase() as keyof typeof TARGET_KINDS], uid: Number(target[2]) };
  const dir = id.match(/^explore\s+(.+)$/i)?.[1]?.toLowerCase();
  if (dir !== undefined) return (DIRECTIONS as readonly string[]).includes(dir) ? { kind: "explore", dir: dir as Direction } : undefined;
  return id === "gems" || id === "evade" ? { kind: id } : undefined;
}

const onChest = (c: RunView["pickups"]["chests"][number]) => c.dist <= ON_CHEST;
// The name alone hides what a spot does: standing in a Beetle Nest wakes an elite.
const poiWhat = (p: RunView["pois"][number]) => (p.description === "" ? "" : ` (${p.description.replace(/\.$/, "").replace(/\. /g, "; ").toLowerCase()})`);

/** Where Tibo stands, as "on a chest, 1 of 3 seconds into opening it", or undefined when on nothing. */
function spotLine(r: RunView): string | undefined {
  const chest = r.pickups.chests.find(onChest);
  if (chest !== undefined) return `on a chest, ${chest.charge ?? 0} of ${chest.chargeNeeded ?? 1} seconds into opening it`;
  const inside = r.pois.find((p) => p.inside);
  if (inside === undefined) return undefined;
  return `inside the ${inside.name}${poiWhat(inside)}${inside.chargeNeeded > 0 ? `, charged ${inside.charge} of ${inside.chargeNeeded} seconds` : ""}`;
}

type Located = { dist: number; dir: Direction; arrived: boolean; charging: number; progress: string; name: string };

function locate(r: RunView, g: TargetGoal): Located | undefined {
  if (g.kind === "poi") {
    const p = r.pois.find((x) => x.uid === g.uid);
    return p === undefined ? undefined : { dist: p.dist, dir: p.dir, arrived: p.inside, charging: p.chargeNeeded - p.charge, progress: `${p.charge} of ${p.chargeNeeded}s charged`, name: `the ${p.name}` };
  }
  if (g.kind === "chest") {
    const c = r.pickups.chests.find((x) => x.uid === g.uid);
    return c === undefined
      ? undefined
      : { dist: c.dist, dir: c.dir, arrived: onChest(c), charging: (c.chargeNeeded ?? 1) - (c.charge ?? 0), progress: `${c.charge ?? 0} of ${c.chargeNeeded ?? 1}s opened`, name: "the chest" };
  }
  const f = r.pickups.nearest.find((x) => x.uid === g.uid);
  return f === undefined ? undefined : { dist: f.dist, dir: f.dir, arrived: false, charging: 0, progress: "", name: "the food" };
}

const TARGET_DONE = { chest: "opened", poi: "charged and used", food: "eaten" } as const;

function goalTitle(g: Goal, r: RunView): string {
  switch (g.kind) {
    case "chest":
      return "Open the chest";
    case "poi":
      return `Charge the ${r.pois.find((p) => p.uid === g.uid)?.name ?? "spot"}`;
    case "food":
      return "Eat the food";
    case "explore":
      return `Explore ${g.dir}`;
    case "gems":
      return "Collect xp gems";
    case "evade":
      return "Keep away from enemies";
  }
}


function aimAt(p: Pursuit, r: RunView): Aim | Ended {
  const g = p.goal;
  const age = r.time - p.since;
  switch (g.kind) {
    case "chest":
    case "poi":
    case "food": {
      const t = locate(r, g);
      if (t === undefined) return p.seen ? { done: TARGET_DONE[g.kind], success: true } : { done: "it is not there", success: false };
      p.seen = true;
      return { heading: t.arrived ? "stay" : t.dir, left: t.dist + t.charging * GOAL_SPEED, progress: t.arrived ? t.progress : `${Math.round(t.dist)} away to the ${t.dir}`, to: g.kind === "poi" ? { poi: g.uid } : { pickup: g.uid } };
    }
    case "explore": {
      const found = r.pickups.chests.find((c) => !p.known.has(`C${c.uid}`) && c.dist < PLAN_RANGE);
      if (found !== undefined) return { done: `found a chest ${Math.round(found.dist)} away to the ${found.dir}`, success: true };
      const walked = Math.hypot(r.player.x - p.origin.x, r.player.y - p.origin.y);
      if (walked >= EXPLORE_DISTANCE) return { done: `walked ${EXPLORE_DISTANCE} units and found nothing new`, success: true };
      return { heading: g.dir, left: EXPLORE_DISTANCE - walked, progress: `${Math.round(walked)} of ${EXPLORE_DISTANCE} walked` };
    }
    case "gems": {
      const best = [...r.sectors].sort((a, b) => b.xpNear - a.xpNear)[0];
      if (best === undefined || best.xpNear === 0) return { done: "no gems left nearby", success: true };
      if (age >= GEMS_SECONDS) return { done: `collected for ${GEMS_SECONDS} seconds`, success: true };
      return { heading: best.dir, progress: `${best.xpNear} gems to the ${best.dir}` };
    }
    case "evade":
      if (age >= EVADE_SECONDS) return { done: `kept clear for ${EVADE_SECONDS} seconds`, success: true };
      return { progress: `${Math.ceil(EVADE_SECONDS - age)}s left` };
  }
}

function begin(goal: Goal, r: RunView, log: RunLog) {
  const title = goalTitle(goal, r);
  const p: Pursuit = {
    goal,
    id: goalId(goal),
    title,
    since: r.time,
    deadline: r.time,
    best: { left: Number.POSITIVE_INFINITY, time: r.time },
    origin: { x: r.player.x, y: r.player.y },
    known: new Set(everListed),
    seen: false,
  };
  const aim = aimAt(p, r);
  const seconds = goal.kind === "gems" ? GEMS_SECONDS : goal.kind === "evade" ? EVADE_SECONDS : "left" in aim && aim.left !== undefined ? aim.left / GOAL_SPEED : 0;
  p.deadline = r.time + seconds + GOAL_SLACK;
  pursuit = p;
  log.write(r, { event: "goal", goal: p.id, action: "start", detail: title });
  say({ role: "action", model: "goal", time: r.time, text: title, detail: "done" in aim ? aim.done : aim.progress });
}

/** `dropped`: the planner chose another goal before this one ended. */
type Result = "done" | "failed" | "dropped";
const RESULT_WORDS: Record<Result, string> = { done: "done", failed: "gave up", dropped: "dropped" };

function finish(r: RunView, log: RunLog, outcome: string, result: Result) {
  const p = pursuit;
  if (p === undefined) return;
  pursuit = undefined;
  outcomes.push({ time: r.time, id: p.id, title: p.title, outcome, success: result !== "failed" });
  if (outcomes.length > 30) outcomes.shift();
  if (result === "failed" && "uid" in p.goal) giveUps.set(p.id, r.time + GIVE_UP_SECONDS);
  log.write(r, { event: "goal", goal: p.id, action: result, detail: outcome });
  say({ role: "action", model: "goal", time: r.time, text: `${p.title}: ${RESULT_WORDS[result]}`, detail: `${outcome} · ${Math.round(r.time - p.since)}s` });
}

/** The planner's goal takes over, unless it is the one already under way. */
function setGoal(goal: Goal, r: RunView, log: RunLog) {
  if (pursuit?.id === goalId(goal)) return;
  if (pursuit !== undefined) finish(r, log, "the planner chose another goal", "dropped");
  begin(goal, r, log);
}

/** Why the current goal ends now, if it does. */
function ending(p: Pursuit, r: RunView, aim: Aim | Ended, status: CommandStatus | undefined): Ended | undefined {
  if ("done" in aim) return aim;
  if (status?.command.type === "goto" && status.state === "done") return { done: TARGET_DONE[(p.goal as TargetGoal).kind], success: true };
  if (status?.state === "failed" && !STEP_OVER.has(status.detail ?? "")) return { done: `the game said: ${status.detail ?? "failed"}`, success: false };
  if (r.time > p.deadline) return { done: `still not done after ${Math.round(r.time - p.since)} seconds`, success: false };
  if (aim.left === undefined) return undefined;
  if (aim.left < p.best.left - 1) p.best = { left: aim.left, time: r.time };
  else if (r.time - p.best.time > GOAL_STUCK_SECONDS)
    return { done: aim.heading === "stay" ? `standing there did nothing for ${GOAL_STUCK_SECONDS} seconds (it may cost gold Tibo lacks)` : `no closer for ${GOAL_STUCK_SECONDS} seconds`, success: false };
  return undefined;
}

/** One step toward the current goal: walk on while it is safe, else ask the action model. */
async function pursue(s: Snap, r: RunView, log: RunLog, planner: Planner) {
  for (const c of r.pickups.chests) everListed.add(`C${c.uid}`);
  for (let starts = 0; ; starts++) {
    if (pursuit === undefined) await planner.plan(r, outcomes.length === 0 ? "the run started" : "the last goal ended");
    const p = pursuit as Pursuit | undefined;
    if (p === undefined) throw new Error("the planner set no goal");
    const status = p.commandId === undefined ? undefined : s.commands.find((c) => c.id === p.commandId);
    const aim = aimAt(p, r);
    const ended = ending(p, r, aim, status);
    if (ended !== undefined && starts < 3) {
      finish(r, log, ended.done, ended.success ? "done" : "failed");
      continue;
    }
    if ("done" in aim) return;
    const cost = aim.heading === undefined ? undefined : moveCost(r, aim.heading);
    const cheapest = cheapestMove(r);
    const clear = aim.heading !== undefined && (cost === undefined || cheapest === undefined || cost <= cheapest + AFFORDABLE_EXTRA_DAMAGE);
    if (clear) return walkOn(p, r, aim, status, log);
    p.sent = undefined;
    return steer(r, p, aim, log);
  }
}

async function walkOn(p: Pursuit, r: RunView, aim: Aim, status: CommandStatus | undefined, log: RunLog) {
  const order = aim.to !== undefined ? { type: "goto", to: aim.to, stay: "done" } : { type: "move", dir: aim.heading };
  if (LIVE) {
    // Live, one command steers until the goal changes; it is only sent again if it changes or ends.
    const key = JSON.stringify(order);
    if (p.sent === key && (status === undefined || status.state === "running")) return;
    p.commandId = (await send(order.type === "goto" ? { ...order, timeout: Math.max(1, p.deadline - r.time) } : order)).id;
    p.sent = key;
    return;
  }
  // Lockstep walks a step at a time, so the forecast is checked between steps.
  const result = await command(order.type === "goto" ? { ...order, timeout: pace.actEvery, pause: true } : { ...order, seconds: pace.actEvery, pause: true });
  p.commandId = result.id;
  const ended = ending(p, r, aim, result);
  if (ended !== undefined) finish(r, log, ended.done, ended.success ? "done" : "failed");
}

// ---- Action model --------------------------------------------------------------------------
const plural = (n: number, one: string) => `${n} ${n === 1 ? one : one.replace(/y$/, "ie")}${n === 1 ? "" : "s"}`;

function sourceWords(source: string): string {
  if (!source.includes(":")) return source.toLowerCase();
  const [kind = "", id = ""] = source.split(":");
  if (kind === "enemy") return `${id.replace(/-/g, " ")} enemies`;
  if (kind === "boss") return `the ${id.replace(/-/g, " ")} boss`;
  return hazardWords(source);
}

// Health samples by game time, to tell the planner whether Tibo is bleeding.
const healthHistory: { time: number; hp: number }[] = [];

function healthTrend(r: RunView): string {
  const now = pct(r.player.hp, r.player.maxHp);
  if (healthHistory.length > 0 && (healthHistory.at(-1)?.time ?? 0) > r.time) healthHistory.length = 0;
  healthHistory.push({ time: r.time, hp: now });
  while (healthHistory.length > 1 && (healthHistory[1]?.time ?? 0) <= r.time - 30) healthHistory.shift();
  const then = healthHistory[0];
  if (then === undefined || r.time - then.time < 20 || Math.abs(then.hp - now) < 10) return "";
  return `, ${then.hp > now ? "down" : "up"} from ${then.hp}% ${Math.round(r.time - then.time)} seconds ago`;
}

const HAZARD_WORDS: Record<string, string> = {
  telegraph: "a boss attack about to land",
  hazardPool: "a damaging puddle",
  strike: "a strike about to land",
  slow: "a sticky patch that slows Tibo",
  chill: "an icy patch that slows Tibo",
};
const hazardWords = (kind: string) => HAZARD_WORDS[kind] ?? `a ${kind} patch that hurts Tibo`;

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

function bearing(dir: Direction, goal: Direction | "stay" | undefined): string {
  if (goal === undefined) return "";
  if (goal === "stay") return "off the spot Tibo is holding for its goal";
  const i = DIRECTIONS.indexOf(dir);
  const j = DIRECTIONS.indexOf(goal);
  const off = Math.min((i - j + 8) % 8, (j - i + 8) % 8);
  return off === 0 ? "straight toward the goal" : off === 1 ? "roughly toward the goal" : off === 2 ? "sideways to the goal" : "away from the goal";
}

// Only what the next steps need: the forecast first (the models weigh the start of a description
// most), then what it cannot see, and where the goal lies.
function describe(r: RunView, s: SectorView, goal: Direction | "stay" | undefined): string {
  const boss = r.bosses.find((b) => b.dir === s.dir);
  return [
    s.forecast === undefined ? "" : outlook(r, s.forecast),
    boss !== undefined && boss.dist < 250 ? `toward the ${boss.name} boss only ${Math.round(boss.dist)} away, which hurts Tibo on contact` : "",
    s.forecast !== undefined ? "" : s.bulletHits > 0 ? `${plural(s.bulletHits, "enemy bullet")} would hit Tibo` : "",
    s.forecast !== undefined ? "" : s.enemyTouches > 0 ? `${plural(s.enemyTouches, "enemy")} would bump into Tibo and hurt it` : "",
    s.hazard !== null ? `into ${hazardWords(s.hazard)}` : "",
    s.leavesHazard ? "out of the danger Tibo stands in" : "",
    s.enemiesNear > 0 ? `${plural(s.enemiesNear, "enemy")} close` : "no enemies close",
    bearing(s.dir, goal),
  ]
    .filter(Boolean)
    .join(", ");
}

// "Stand still" must carry the threats around Tibo too, or it reads as the safest move in a swarm.
function standing(r: RunView, goal: Direction | "stay" | undefined): string {
  const crowd = near(r) > 0 ? ` with ${plural(near(r), "enemy")} within 60 units closing in` : "";
  const forecast = r.standingForecast === undefined ? "" : `, where ${outlook(r, r.standingForecast).replace(/^Tibo /, "it ")}`;
  const under = r.hazards.find((h) => h.inside);
  const inAttack = under === undefined ? "" : under.landsIn === undefined ? `, staying in ${hazardWords(under.kind)}` : `, staying where a boss attack lands in ${under.landsIn.toFixed(1)} seconds`;
  const spot = spotLine(r);
  const purpose = goal === "stay" ? ", which is what the goal needs" : goal === undefined ? "" : ", no closer to the goal";
  return `stand still${spot === undefined ? "" : ` ${spot}`}${crowd}${forecast}${inAttack}${purpose}`;
}

/** What a move costs over the next second as a share of max health, from the game's own simulation. */
function moveCost(r: RunView, heading: Direction | "stay"): number | undefined {
  const f = heading === "stay" ? r.standingForecast : r.sectors.find((x) => x.dir === heading)?.forecast;
  return f === undefined ? undefined : f.dead ? Number.POSITIVE_INFINITY : f.damage / r.player.maxHp;
}

function cheapestMove(r: RunView): number | undefined {
  const costs = [...DIRECTIONS, "stay" as const].map((h) => moveCost(r, h));
  return costs.every((c) => c !== undefined) ? Math.min(...(costs as number[])) : undefined;
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

function goalWords(p: Pursuit, aim: Aim): string {
  if (p.goal.kind === "evade") return "keep away from enemies";
  if (p.goal.kind === "explore") return `walk ${p.goal.dir} to look for chests and shrines`;
  if (p.goal.kind === "gems") return `collect the xp gems, most of them to the ${aim.heading}`;
  return aim.heading === "stay" ? `${p.title.toLowerCase()}: stay where Tibo stands, ${aim.progress}` : `${p.title.toLowerCase()}, ${aim.progress}`;
}

/** The way to the goal costs more than the safest move: the action model picks this step. */
async function steer(r: RunView, p: Pursuit, aim: Aim, log: RunLog) {
  const goal = goalWords(p, aim);
  const moves: Record<string, string> = {};
  for (const s of r.sectors) moves[s.dir] = `walk ${s.dir}: ${describe(r, s, aim.heading)}`;
  moves.stay = standing(r, aim.heading);
  // The game's own simulation prices every move for the next second, and Laya cannot weigh those
  // prices: on replayed states it rated a fatal move safest in 4 of 8, and it stood in hot oil
  // forecast "very badly hurt" for ten seconds while every step out was "scratched" (its danger
  // score tracks how many threats a description lists, not which). So moves that cost clearly
  // more than the cheapest are not offered, like a card Tibo cannot afford.
  const cost = (k: string) => moveCost(r, k === "stay" ? "stay" : (k as Direction));
  const offered = { ...moves };
  const cheapest = cheapestMove(r);
  if (cheapest !== undefined) for (const k of Object.keys(moves)) if ((cost(k) ?? 0) > cheapest + AFFORDABLE_EXTRA_DAMAGE) delete moves[k];
  const hp = pct(r.player.hp, r.player.maxHp);
  const state = [`Tibo is a potato hero in a survivors game. Weapons fire on their own; Tibo only walks.`, `Goal: ${goal}.`, `Health ${hp}%${hp < 40 ? ", which is low" : ""}.`].join("\n");
  const usefulness = p.goal.kind === "evade" ? "Does it take Tibo away from enemies, toward open ground?" : `Does it bring Tibo closer to its goal (${goal})?`;
  const questions: Record<string, Question> = {};
  for (const [key, text] of Object.entries(moves)) {
    questions[key] = { type: "score", instructions: `If Tibo does this: ${text}. How badly does it hurt Tibo in the next second?`, criteria: HURT_SCALE };
    questions[`useful:${key}`] = { type: "noul", instructions: `If Tibo does this: ${text}. ${usefulness}` };
  }
  const canDash = r.player.dashCharges > 0 && r.sectors.some((x) => x.enemiesNear > 0 || (x.nearestBullet ?? 999) < 40);
  if (canDash) questions.dash = { type: "noul", instructions: "Is Tibo about to be hit or surrounded, so a quick dash away would save it?" };
  const started = performance.now();
  const answers = await decide(state, questions);
  const ms = Math.round(performance.now() - started);
  const risk = (k: string) => answers[k]?.noul ?? 1;
  const safest = Math.min(...Object.keys(moves).map(risk));
  const safe = Object.keys(moves).filter((k) => risk(k) <= safest + SAFE_MARGIN && (risk(k) < SAFE_ENOUGH || risk(k) === safest));
  const choice = safe.sort((x, y) => (answers[`useful:${y}`]?.noul ?? 0) - (answers[`useful:${x}`]?.noul ?? 0) || risk(x) - risk(y))[0] ?? "stay";
  const dir = (DIRECTIONS as readonly string[]).includes(choice) ? (choice as Direction) : undefined;
  const dash = dir !== undefined && (answers.dash?.noul ?? 0) > 0.5;
  const ruledOut = Object.keys(offered).length - Object.keys(moves).length;
  const forecast = (k: string) => {
    const f = k === "stay" ? r.standingForecast : r.sectors.find((x) => x.dir === k)?.forecast;
    return f === undefined ? undefined : f.dead ? "dead" : f.damage === 0 ? "no damage" : `-${Math.round(f.damage)} hp`;
  };
  const weighed: MoveOption[] = Object.entries(offered).map(([k, description]) => {
    const f = forecast(k);
    const hurt = answers[k]?.score;
    const useful = answers[`useful:${k}`]?.noul;
    return {
      move: k === "stay" ? "stand still" : k,
      description,
      ...(f === undefined ? {} : { forecast: f }),
      ...(hurt === undefined ? {} : { hurt }),
      ...(useful === undefined ? {} : { useful }),
      outcome: k === choice ? "chosen" : !(k in moves) ? "ruled out" : safe.includes(k) ? "safe" : "risky",
    };
  });
  const move = dir === undefined ? "stand still" : `${dash ? "dash" : "walk"} ${dir}`;
  say({
    role: "action",
    model: MODEL,
    time: r.time,
    text: `${move[0]?.toUpperCase()}${move.slice(1)}`,
    inspect: {
      kind: "moves",
      situation: state,
      questions: ["For each move: If Tibo does this: <the move>. How badly does it hurt Tibo in the next second? (takes no damage, gets scratched, gets badly hurt, gets very badly hurt, dies)", `For each move: If Tibo does this: <the move>. ${usefulness}`, ...(canDash ? ["Is Tibo about to be hit or surrounded, so a quick dash away would save it?"] : [])],
      moves: weighed,
      ...(answers.dash?.noul === undefined ? {} : { dash: answers.dash.noul }),
    },
    detail: [`for: ${p.title}`, `Tibo ${HURT_SCALE[Math.round(answers[choice]?.score ?? 0)] ?? "?"}`, ...(ruledOut > 0 ? [`${ruledOut} costlier ${ruledOut === 1 ? "move" : "moves"} ruled out`] : [])].join(" · "),
  });
  log.write(r, {
    event: "move",
    model: MODEL,
    reason: `the way to the goal (${aim.heading ?? "none"}) costs more than the safest move`,
    goal: p.id,
    action: move,
    options: weighed.map((w) => `${w.move} ${w.forecast ?? "?"} hurt ${w.hurt ?? "-"} useful ${w.useful === undefined ? "-" : Math.round(w.useful * 100)}%${w.outcome === "ruled out" ? " (ruled out)" : ""}`).join("; "),
    ms,
  });
  if (dash) await command({ type: "dash", dir });
  if (LIVE) return dir === undefined ? command({ type: "stop" }) : send({ type: "move", dir });
  return command(dir === undefined ? { type: "goto", to: { dx: 0, dy: 0 }, stay: pace.actEvery, pause: true } : { type: "move", dir, seconds: pace.actEvery, pause: true });
}

// ---- Planner -------------------------------------------------------------------------------
// The planner is the decision model in a second persona. Before every decision it reads the game
// knowledge (strategy.md, which the coach rewrites after each run) and the whole player state. It
// picks every level-up, chest and shrine option, and weighs every goal Tibo could take on next,
// one question each; the most promising becomes the goal. It is asked when a goal ends, at every
// choice, when a boss appears, and every pace.planEvery seconds, so a better goal can take over.

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

function plannerState(r: RunView, b: Book): string {
  const p = r.player;
  const owned = (kind: string, xs: { id: string; name: string; level: number; max: number }[]) => xs.map((x) => `\n  - ${x.name} ${x.level}/${x.max}${said(b, kind, x.id)}`).join("") || " none";
  const ready = r.combos.filter((c) => c.ready && c.kind !== "union").map((c) => c.name);
  const crowd = [...r.sectors].sort((a, z) => z.enemiesFar - a.enemiesFar);
  return [
    `Time ${clock(r.time)}. Health ${Math.round(p.hp)}/${Math.round(p.maxHp)} (${pct(p.hp, p.maxHp)}%${healthTrend(r)}). Level ${p.level}, ${pct(p.xp, p.xpNext)}% of the way to the next. Gold ${p.gold}. Dash charges ${p.dashCharges}.`,
    `Weapons (${r.loadout.weapons.length} of 6 slots):${owned("weapon", r.loadout.weapons)}`,
    `Passives (${r.loadout.passives.length} of 6 slots):${owned("passive", r.loadout.passives)}`,
    `Items:${r.loadout.items.map((i) => `\n  - ${i.name} x${i.count}${said(b, "item", i.id)}`).join("") || " none"}`,
    ...(r.loadout.banished.length === 0 ? [] : [`Banished this run: ${r.loadout.banished.join(", ")}.`]),
    `Recipes in reach: ${r.combos.map((c) => `${c.name} (${c.parts.map((x) => `${x.name} ${x.state}${x.have === undefined ? "" : ` ${x.have}/${x.max}`}`).join(" + ")})`).join("; ") || "none"}.`,
    ready.length === 0 ? "No recipe is complete yet." : `The next chest opened evolves ${ready.join(" and ")}.`,
    `Tibo stands ${spotLine(r) ?? "on no chest or spot"}.${r.hazards.some((h) => h.inside) ? ` Underfoot: ${r.hazards.filter((h) => h.inside).map((h) => hazardWords(h.kind)).join(", ")}.` : ""}`,
    `Hurt in the last 3 seconds by: ${Object.entries(p.hurtBy).map(([k, v]) => `${sourceWords(k)} ${v}`).join(", ") || "nothing"}.`,
    `Bosses: ${r.bosses.map((x) => `${x.name} ${Math.round(x.dist)} away to the ${x.dir}, ${pct(x.hp, x.maxHp)}% health`).join("; ") || "none"}.`,
    `Enemies: ${r.enemies.total} around, ${near(r)} within 60. Most within 150 to the ${crowd[0]?.dir} (${crowd[0]?.enemiesFar}), fewest to the ${crowd.at(-1)?.dir} (${crowd.at(-1)?.enemiesFar}).`,
    `Current goal: ${pursuit === undefined ? "none" : `${pursuit.title}, since ${clock(pursuit.since)}`}.`,
    `Recent goals: ${outcomes.slice(-6).map((o) => `${clock(o.time)} ${o.title}: ${o.outcome}`).join("; ") || "none yet"}.`,
  ].join("\n");
}

type GoalOption = { goal: Goal; text: string };

/** Every goal Tibo could take on next, in words the model can weigh one at a time. */
function goalOptions(r: RunView): GoalOption[] {
  const given = (id: string) => {
    const until = giveUps.get(id);
    const last = [...outcomes].reverse().find((o) => o.id === id && !o.success);
    return until === undefined || until <= r.time || last === undefined ? "" : `; Tibo gave up on it at ${clock(last.time)} because ${last.outcome}`;
  };
  const ready = r.combos.filter((c) => c.ready && c.kind !== "union").map((c) => c.name);
  const gems = r.sectors.reduce((n, s) => n + s.xpNear, 0);
  const gemSide = [...r.sectors].sort((a, z) => z.xpNear - a.xpNear)[0];
  return [
    ...r.pickups.chests
      .filter((c) => c.dist < PLAN_RANGE)
      .slice(0, 4)
      .map((c) => ({
        goal: { kind: "chest" as const, uid: c.uid },
        text: `${onChest(c) ? "stay on the chest Tibo stands on" : `walk to the chest ${Math.round(c.dist)} away to the ${c.dir} and stand on it`} for ${c.chargeNeeded ?? 1} seconds to open it, which gives a free pick${ready.length === 0 ? "" : ` and evolves ${ready.join(" and ")}`}${given(`C${c.uid}`)}`,
      })),
    ...r.pois
      .filter((x) => x.chargeNeeded > 0 && x.dist < PLAN_RANGE)
      .slice(0, 6)
      .map((x) => ({
        goal: { kind: "poi" as const, uid: x.uid },
        text: `${x.inside ? `stay inside the ${x.name}` : `walk to the ${x.name} ${Math.round(x.dist)} away to the ${x.dir} and stand inside it`} for ${x.chargeNeeded} seconds${x.description === "" ? "" : ` (${x.description.replace(/\.$/, "")})`}${given(`P${x.uid}`)}`,
      })),
    ...r.pickups.nearest
      .filter((x) => x.kind === "heal" && x.dist < PLAN_RANGE)
      .slice(0, 2)
      .map((x) => ({ goal: { kind: "food" as const, uid: x.uid }, text: `walk to the food ${Math.round(x.dist)} away to the ${x.dir}, which heals Tibo` })),
    ...(gems === 0 ? [] : [{ goal: { kind: "gems" as const }, text: `collect the ${gems} xp gems nearby, most of them to the ${gemSide?.dir}, for up to ${GEMS_SECONDS} seconds` }]),
    ...r.sectors.map((s) => ({
      goal: { kind: "explore" as const, dir: s.dir },
      text: `explore ${s.dir}: walk ${EXPLORE_DISTANCE} units that way, stopping at the first new chest, toward ${plural(s.enemiesFar, "enemy")} within 150`,
    })),
    { goal: { kind: "evade" }, text: `keep away from enemies for ${EVADE_SECONDS} seconds` },
  ];
}

type PlanAnswer = { pick?: OptionView; goal: Goal; ms: number; cards?: CardOption[]; goals: CardOption[] };

class Planner {
  calls = 0;
  /** A card was just taken, so the goal is planned again with it in hand. */
  picked = false;
  private lastAsked = Number.NEGATIVE_INFINITY;
  private sawBoss = false;

  constructor(
    private notes: RunNotes,
    private log: RunLog,
  ) {}

  /** Why to plan again while a goal is under way, if anything. */
  due(r: RunView): string | undefined {
    let why: string | undefined;
    if (this.picked) why = "a card was just taken";
    else if (!this.sawBoss && r.bosses.length > 0) why = `a boss appeared: ${r.bosses[0]?.name}`;
    else if (r.time - this.lastAsked >= pace.planEvery) why = `${pace.planEvery} seconds passed`;
    this.sawBoss ||= r.bosses.length > 0;
    return why;
  }

  /** Picks among `options` when a choice is open, and sets the next goal. */
  async plan(r: RunView, why: string, options?: OptionView[]): Promise<PlanAnswer> {
    this.lastAsked = r.time;
    if (options === undefined) this.picked = false;
    this.calls++;
    const b = await readBook();
    const experiment = this.notes.experiment;
    const state = [
      "You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.",
      `The aim: survive 20 minutes on ${DIFFICULTY}.`,
      ...(experiment === undefined ? [] : [`This run tests a strategy, so follow it even where the knowledge below disagrees: ${experiment.directive}`]),
      "Game knowledge from earlier runs:",
      await readStrategy(),
      `Asked now because ${why}. State now:`,
      plannerState(r, b),
    ].join("\n\n");
    const goals = goalOptions(r);
    const questions: Record<string, Question> = {};
    for (const [i, g] of goals.entries()) questions[`goal:${i}`] = { type: "noul", instructions: `If Tibo's next goal is to ${g.text}: is that the best thing for Tibo to do now, to survive and grow stronger?` };
    // The decision API reads a choice's keys, not their descriptions: replayed picks did not change
    // at all when a note was added to the description, and Laya took a new weapon in 4 of 6 offers
    // once the key said so. So everything the model should weigh goes into the key.
    const keys = new Map<string, OptionView>();
    for (const o of options ?? []) {
      const notes = [
        cardKind(r, o),
        ...o.combos.filter((c) => c.partnerHeld).map((c) => `pairs with your ${c.partner.name} into ${c.name}${c.ready ? " right away" : ""}`),
        o.recommended ? "the game recommends it" : "",
        said(b, o.type, o.id).replace(/^: /, ""),
      ].filter(Boolean);
      keys.set(`${o.index}: ${o.type === "other" ? cardName(o) : o.name}${notes.length > 0 ? ` (${notes.join("; ")})` : ""}`, o);
    }
    const kind = r.choice?.kind === "levelUp" ? "level-up" : (r.choice?.kind ?? "choice");
    const question = `Tibo is at a ${kind}. Which option does the game knowledge favour, and makes Tibo strongest?`;
    if (options !== undefined) questions.pick = { type: "choice", instructions: question, criteria: Object.fromEntries([...keys].map(([k, o]) => [k, o.label])) };
    const started = performance.now();
    const answers = await decide(state, questions, PLAN_MODEL);
    const ms = Math.round(performance.now() - started);

    const score = (i: number) => answers[`goal:${i}`]?.noul ?? 0;
    const best = goals.map((_, i) => i).sort((x, y) => score(y) - score(x))[0] ?? goals.length - 1;
    const goal = goals[best]?.goal ?? { kind: "evade" };
    const pickKey = answers.pick?.choice;
    const pick = options === undefined ? undefined : (keys.get(pickKey ?? "") ?? [...keys].find(([k]) => k.split(":")[0] === (pickKey ?? "").split(":")[0])?.[1] ?? options[0]);
    const cards: CardOption[] | undefined =
      options === undefined
        ? undefined
        : [...keys].map(([k, o]) => {
            const probability = answers.pick?.probabilities?.[k];
            return { card: cardName(o), notes: k.slice(k.indexOf(": ") + 2), ...(probability === undefined ? {} : { probability }), chosen: o === pick, index: o.index };
          });
    const weighed: CardOption[] = goals.map((g, i) => ({ card: goalTitle(g.goal, r), notes: g.text, probability: score(i), chosen: i === best }));
    setGoal(goal, r, this.log);

    const title = goalTitle(goal, r);
    say({
      role: "planner",
      model: PLAN_MODEL,
      time: r.time,
      text: [pick === undefined ? "" : `Take ${cardName(pick)}.`, `Goal: ${title} (${Math.round(score(best) * 100)}%).`].filter(Boolean).join(" "),
      detail: `Asked because ${why}.`,
      inspect: {
        kind: "plan",
        prompt: [state, ...(options === undefined ? [] : [question]), "For each goal: If Tibo's next goal is to …: is that the best thing for Tibo to do now, to survive and grow stronger?"].join("\n\n"),
        ...(cards === undefined ? {} : { choices: cards }),
        goals: weighed,
      },
    });
    const odds = (xs: CardOption[]) => xs.map((x) => `${x.card} ${x.probability === undefined ? "?" : Math.round(x.probability * 100)}%`).join("; ");
    this.log.write(r, {
      event: pick === undefined ? "plan" : "pick",
      model: PLAN_MODEL,
      reason: why,
      goal: goalId(goal),
      action: pick === undefined ? title : cardName(pick),
      options: cards === undefined ? odds(weighed) : `${odds(cards)} | goals: ${odds(weighed)}`,
      ms,
    });
    if (pick !== undefined) {
      this.notes.timeline.push(`- **${clock(r.time)}** ${kind}: took ${cardName(pick)} from ${options?.map(cardName).join(", ")}.`);
      await this.notes.write();
    }
    return { ...(pick === undefined ? {} : { pick }), goal, ms, ...(cards === undefined ? {} : { cards }), goals: weighed };
  }

  async review(lastRun: NonNullable<Snapshot["lastRun"]>, last: RunView | undefined) {
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
      `- Planner asked ${this.calls} times.`,
    ].join("\n");
    await this.notes.write();
    const review = await reviewRun(this.notes.timeline.join("\n"), this.notes.outcome, await logForReview(this.log.file), this.notes.id, clock(lastRun.time), this.notes.experiment);
    if (review === undefined) return;
    this.notes.review = review;
    await this.notes.write();
  }
}

// ---- Picks ---------------------------------------------------------------------------------
// Picks that did nothing (an item Tibo cannot afford, say) for the choice now open, so they are
// not taken again and again.
let deadPicks: { signature: string; names: Set<string> } = { signature: "", names: new Set() };

async function choose(r: RunView, planner: Planner, log: RunLog) {
  const options = r.choice?.options ?? [];
  if (options.length === 0) throw new Error(`a ${r.choice?.kind} choice with no options`);
  const signature = `${r.tick}|${options.map((o) => o.name).join("|")}`;
  if (deadPicks.signature !== signature) deadPicks = { signature, names: new Set() };
  const takeable = options.filter((o) => o.available && !deadPicks.names.has(o.name));
  if (takeable.length === 0) throw new Error(`every option of this ${r.choice?.kind} was tried without closing it: ${options.map((o) => o.name).join(", ")}`);
  const kind = r.choice?.kind === "levelUp" ? "level-up" : (r.choice?.kind ?? "choice");
  let picked = takeable.length === 1 ? takeable[0] : undefined;
  if (picked === undefined) {
    picked = (await planner.plan(r, `a ${kind} choice opened`, takeable)).pick;
    // The panel shows the odds over the cards and lands a highlight on the pick before it is taken;
    // the choice freezes the game, so the wait costs no game time.
    if (piloted) await Bun.sleep(PICK_SHOW_MS);
  }
  else log.write(r, { event: "pick", model: "none", reason: kind, action: cardName(picked), detail: "the only option that can be taken" });
  if (picked === undefined) throw new Error(`no ${kind} option was picked`);
  deadPicks.names.add(picked.name);
  planner.picked = true;
  return command({ type: "choose", index: picked.index });
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
  // A new run waits paused at tick 0 at lockstep speed, so the next step sets the mode again.
  modeSet = false;
}

let recordCrash: ((e: unknown) => Promise<void>) | undefined;

async function main() {
  await mkdir(path.dirname(LOG), { recursive: true });
  await Bun.write(LOG, "");
  const log = Bun.file(LOG).writer();
  let runs = 0;
  let lastReport = -1;
  let steps = 0;
  let notes: RunNotes | undefined;
  let reviewing: RunNotes | undefined;
  let planner: Planner | undefined;
  let runLog: RunLog | undefined;
  let last: RunView | undefined;
  // The previous run's notes wait for its share link, which appears while the next run starts.
  let awaitingLink: { notes: RunNotes; known: string | undefined } | undefined;
  console.log(`model ${MODEL}, ${MODE} ${DIFFICULTY}, step ${STEP}s, speed x${SPEED}, planner ${PLAN_MODEL}, coach ${COACH === "none" ? "none" : COACH_NAME}, run logs in ${LOG_DIR}`);
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
    time: now.run?.time ?? 0,
    text: `${adopted ? `Taking over the run at ${clock(now.run?.time ?? 0)}` : `Starting a ${MODE === "daily" ? "Daily" : "Open World"} run on ${DIFFICULTY}`}${(now.incognito ?? INCOGNITO) ? ", incognito: no notes, no review" : ""}.`,
    detail: `Planner ${PLAN_MODEL}, action model ${MODEL}, run review by ${COACH === "none" ? "nobody" : COACH_NAME}. Run logs: ${LOG_DIR}`,
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
      if (s.screen === "over" && s.lastRun !== undefined && runs > 0 && notes !== undefined && planner !== undefined && runLog !== undefined) {
        const avg = latency.reduce((x, y) => x + y, 0) / Math.max(1, latency.length);
        console.log(`run ${runs} ended at ${s.lastRun.time}s, level ${s.lastRun.level}, ${s.lastRun.kills} kills, ${steps} steps, ${Math.round(avg)}ms per decision`);
        say({ role: "system", time: s.lastRun.time, text: `Run over at ${clock(s.lastRun.time)}, level ${s.lastRun.level}, ${s.lastRun.kills} kills.` });
        console.log(`  damage taken: ${Object.entries(s.lastRun.damageTaken).map(([k, v]) => `${k} ${v}`).join(", ")}`);
        runLog.write(last, { event: "run_end", detail: `survived ${clock(s.lastRun.time)}, level ${s.lastRun.level}, ${s.lastRun.kills} kills; damage by ${Object.entries(s.lastRun.damageTaken).map(([k, v]) => `${k} ${v}`).join(", ")}` });
        log.write(`${JSON.stringify({ event: "end", model: MODEL, mode: MODE, difficulty: DIFFICULTY, notes: notes.id, runLog: runLog.file, ...s.lastRun, steps, plannerCalls: planner.calls, avgDecisionMs: Math.round(avg) })}\n`);
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
        await planner.review(s.lastRun, last);
        reviewing = undefined;
        console.log(`notes: ${ended.file}, log: ${runLog.file}`);
        planner = undefined;
        runLog = undefined;
        if (runs >= RUNS) {
          // A run the panel played hands the wheel back on its end screen instead of starting another.
          if (awaitingLink !== undefined && !TAKEOVER) {
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
        planner = undefined;
        runLog = undefined;
      }
      await start();
      runs++;
      steps = 0;
      resetGoals();
      lastReport = -1;
      latency.length = 0;
      continue;
    }
    const r = s.run;
    if (r === undefined) {
      await Bun.sleep(100);
      continue;
    }
    pace = s.pace ?? pace;
    piloted = s.pace !== undefined;
    const incognito = s.incognito ?? INCOGNITO;
    if (notes === undefined || planner === undefined || runLog === undefined) {
      const experiment = !adopted && !incognito && (await experimentDue()) ? await chooseExperiment() : undefined;
      notes = new RunNotes(r, await readStrategy(), experiment, !adopted && !incognito);
      adopted = false;
      runLog = new RunLog(notes.log);
      planner = new Planner(notes, runLog);
      resetGoals();
      await notes.write();
      console.log(`run seed ${r.seed}${r.daily ? " (daily)" : ""}, notes ${notes.saved ? notes.file : incognito ? "not saved (incognito)" : "not saved (taken over mid-run)"}, log ${notes.log}`);
      if (experiment !== undefined) console.log(`experiment run: ${experiment.name}: ${experiment.directive}`);
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
    if (incognito && notes.saved) {
      await notes.discard();
      console.log(`incognito: deleted ${notes.file}; this run gets no review`);
      say({ role: "system", time: r.time, text: "Incognito: this run's notes are deleted, and it will not be reviewed." });
    }
    if (!modeSet) await setMode();
    const stepStarted = performance.now();
    if (s.screen === "choice") await choose(r, planner, runLog);
    else {
      const why = pursuit === undefined ? undefined : planner.due(r);
      if (why !== undefined) await planner.plan(r, why);
      await pursue(s, r, runLog, planner);
    }
    if (LIVE) await Bun.sleep(Math.max(0, pace.actEvery * 1000 - (performance.now() - stepStarted)));
  }
}

const reviewTarget = option("review", "");
if (reviewTarget !== "") await reviewNotesFile(reviewTarget);
else
  await main().catch(async (e: unknown) => {
    await recordCrash?.(e);
    throw e;
  });
