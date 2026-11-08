#!/usr/bin/env bun
// Plays tibo.dog through the agent server with prompt templates the coach wrote (--templates, else
// its playbook; scripts/recursive-self-improvement.ts runs the coach). In the
// game, a decision model plans (picks every card
// and sets short-term goals) and acts (steps around danger on the way to the goal). The file removes
// only options the game itself rules out: cards Tibo cannot take, and moves the game's own
// simulation says cost clearly more health over the next second than the cheapest one.
import path from "node:path";
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { BRIDGE_ORIGIN as DEFAULT_ORIGIN, type ActionTag, type ChatLine, type GoalResult, type CommandStatus, DIRECTIONS, type Direction, type CardOption, type Encyclopedia, type ForecastView, type GameMode, type Inspect, type MoveOption, type OptionView, type PilotPace, type RunView, type SectorView, type Snapshot } from "../src/agent/protocol";
import * as loop from "./gameplay";
import { type BlockName, type Knobs, type RunPlan, type RunSetup, type Templates, DEFAULT_TEMPLATES, render } from "./gameplay";

const args = process.argv.slice(2);
const option = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};
const MODEL = option("model", "h2o-lightning-4b@q8_0");
// A trial (a training game, scripts/slots.ts) plays the run in progress, usually a loaded checkpoint, for this many
// seconds of game time with the templates in --templates, then writes what happened to --result and
// exits: no plan, notes, review or commit.
const TRIAL = args.includes("--trial") ? Number(option("trial", "")) : undefined;
if (TRIAL !== undefined && !(TRIAL > 0)) throw new Error(`--trial takes the seconds of game time to play; got ${option("trial", "nothing")}`);
const TRIAL_RESULT = option("result", "");
if (TRIAL !== undefined && TRIAL_RESULT === "") throw new Error("--trial needs --result <file> for what happened");
const BASE: { templates: Templates; weapon?: string; source: string } = await (async () => {
  const file = option("templates", "");
  if (file === "" && TRIAL !== undefined) throw new Error("--trial needs --templates <file>, a JSON object with planner, action and knobs");
  if (file !== "") {
    const checked = loop.checkTemplates(await Bun.file(file).json(), DEFAULT_TEMPLATES);
    if ("errors" in checked) throw new Error(`${file}: ${checked.errors.join("; ")}`);
    return { templates: checked.value, source: file };
  }
  const playbook = await loop.readPlaybook();
  return { templates: playbook.templates, weapon: playbook.weapon, source: playbook.updated === "never" ? "the built-in defaults" : "the coach's playbook" };
})();
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
// "highest" takes the hardest the game allows; `difficulty` then holds what the game picked, such as nightmare-3.
const DIFFICULTY = option("difficulty", "easy");
let difficulty = DIFFICULTY;
// "current" plays the mode the game is on (its open mode screen, or the run in play or just ended), else the Daily.
const MODE_ARG = option("mode", "daily");
if (MODE_ARG !== "daily" && MODE_ARG !== "openWorld" && MODE_ARG !== "current") throw new Error(`--mode must be daily, openWorld or current; got ${MODE_ARG}`);
const CRUTCH = "lockstep is a crutch: it pauses the game while the models think, which no player can do. Every game plays live, as a person plays it. Do not enable it.";
if (args.includes("--lockstep") || args.includes("--speed")) throw new Error(CRUTCH);
// Notes are for full runs only: --notes writes one to gameplay/notes when the run ends, under
// --coach-label, with --intent as its plan. Templates come from --templates (a JSON file with any of
// planner, action and knobs over the defaults), else the coach's playbook.
const NOTES = args.includes("--notes");
const COACH_LABEL = option("coach-label", "none");
const INTENT = option("intent", "");
// Without --templates, the bot plays as the coach would: its playbook's templates and starting weapon.
const WEAPON = args.includes("--weapon") ? option("weapon", "") : (BASE.weapon ?? "");
// The first run plays this Open World seed in a freshly reloaded tab, or the bot stops rather than play another.
let SEED = option("seed", "").toUpperCase();
// For "Grok take the wheel" and trials: play the run already in progress instead of starting a fresh one.
const TAKEOVER = TRIAL !== undefined || args.includes("--takeover");
const RELOAD = option("reload", "http://127.0.0.1:7358/reload");
const LOG = option("log", path.join(import.meta.dir, "..", ".runs", `${MODEL.replace(/[^\w.@-]/g, "_")}-${Date.now()}.jsonl`));

/**
 * `pace` is the panel's plan and action intervals, read every step so they can change mid-run, and
 * sent only to a bot the panel started.
 */
type Snap = Snapshot & { connected: boolean; ageMs: number; pace?: PilotPace; incognito?: boolean };
/** Seconds between planner calls while a goal is under way, and between steps. */
let pace: PilotPace = { planEvery: PLAN_EVERY, actEvery: STEP };
/** Whether the panel started this bot, which someone is watching. */
let piloted = false;
const PICK_SHOW_MS = 2000;

let chatQueue = Promise.resolve();
/**
 * A line for the panel's chat, shown while the bot has the wheel. Never awaited, so the chat cannot
 * slow a step, but sent in order, so a late streamed update never overwrites a final message.
 */
function say(line: ChatLine) {
  const body = JSON.stringify(line);
  chatQueue = chatQueue.then(() => fetch(`${SERVER}/pilot/say`, { method: "POST", headers: { "content-type": "application/json" }, body }).then(() => undefined, () => undefined));
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

// The bot plays live, as a person does: the game runs in real time and never pauses for the models,
// and each move is held until the next decision replaces it. A level-up or chest still stops the
// game, as it does for a person.
/** Whether this run's game has been set to play live; a new run starts paused at tick 0. */
let modeSet = false;

// Live, a move lands a while after the snapshot it was chosen from: the forecast was made up to 12
// ticks before the snapshot (100ms on average), the snapshot is some ms old, and the action model
// takes its time. Tibo keeps its current move meanwhile, so the page's forecast plays that first.
// Measured over 10,640 live steps, a move forecast as free lost health 14.5% of the time when it
// turned Tibo and 1.4% when it kept the direction: the turn was planned from where Tibo no longer was.
const FORECAST_REFRESH_LAG = 0.1;
let decideSeconds = 0.18;
/** This step asked the action model, so the next one does not wait out the step time. */
let modelSteered = false;
let lagSent = -1;

function lagNow(ageMs: number): number {
  return Math.min(1, Math.max(0, ageMs / 1000 + decideSeconds + FORECAST_REFRESH_LAG));
}

async function tellLag(ageMs: number) {
  const lag = Math.round(lagNow(ageMs) * 100) / 100;
  if (Math.abs(lag - lagSent) < 0.03) return;
  lagSent = lag;
  await send({ type: "forecast", live: true, lag });
}

async function setMode() {
  await command({ type: "speed", factor: 1 });
  lagSent = lagNow(30);
  await command({ type: "forecast", live: true, lag: lagSent });
  await command({ type: "resume" });
  modeSet = true;
}

const latency: number[] = [];
/** How old each step's snapshot was, in ms: games side by side that starve each other of CPU show it here. */
const snapshotAges: number[] = [];
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

// ---- The run -------------------------------------------------------------------------------
const MODE: GameMode = MODE_ARG === "current" ? ((await api<Snap>("/state")).mode ?? "daily") : MODE_ARG;
const MODE_NAME = MODE === "daily" ? "daily" : "world";
const WIN_SECONDS = 1200;
// Read once at startup: the code this process runs, whatever is committed while it plays.
const BOT_CODE = (() => {
  const git = (...a: string[]) => Bun.spawnSync(["git", ...a], { cwd: import.meta.dir }).stdout.toString().trim();
  const head = git("log", "-1", "--format=%h %s");
  return `${head || "unknown"}${git("status", "--porcelain", "--", ".") === "" ? "" : " (with uncommitted changes in scripts/)"}`;
})();

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
const csvField = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

/** The run's notes, written to gameplay/notes when the run ends; scripts/gameplay.ts has the format. */
class RunNotes {
  readonly id: string;
  /** The run's CSV log, one row per model call; outside the repo, see LOG_DIR. */
  readonly log: string;
  link = "none yet: written once the game shows the run summary";
  /** The weapon Tibo started with, and whether the coach chose it. */
  started = "unknown";
  picks: string[] = [];
  review = "(not reviewed yet)";
  file?: string;
  private end?: loop.RunEnd;

  /** A run the bot took over from a person is not saved, and neither is an incognito one. */
  constructor(
    readonly setup: RunSetup,
    readonly plan: RunPlan,
    /** Which coach prompts, by hash, planned and reviewed the run. */
    public prompts: string,
    public saved: boolean,
  ) {
    // Ids have one-second steps, and two bots can start a run in the same second; a later one moves on.
    const logFor = () => path.join(LOG_DIR, `${loop.runId(setup.started)}_${setup.difficulty}_${setup.mode}_${setup.surface}.csv`);
    while (existsSync(logFor())) setup.started = new Date(setup.started.getTime() + 1000);
    this.id = loop.runId(setup.started);
    this.log = logFor();
  }

  /** The run is over, so its notes get their name, which says how long Tibo lived. */
  async finish(end: loop.RunEnd) {
    this.end = end;
    this.file = path.join(loop.NOTES_DIR, loop.notesName(this.setup, end.lived));
    await this.write();
  }

  async write() {
    if (!this.saved || this.file === undefined || this.end === undefined) return;
    const log = Bun.file(this.log);
    const csv = (await log.exists()) ? await log.text() : "";
    const stats = csv === "" ? "(no log)" : loop.runStats(csv);
    const key = csv === "" ? "(no log)" : loop.keyNumbers(csv);
    await Bun.write(this.file, loop.renderNotes({ setup: this.setup, plan: this.plan, end: this.end, link: this.link, log: this.log, prompts: this.prompts, picks: this.picks, review: this.review, started: this.started, stats, key }));
  }
}

const pct = (part: number, whole: number) => Math.round((100 * part) / Math.max(1, whole));
const near = (r: RunView) => r.sectors.reduce((n, s) => n + s.enemiesNear, 0);

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
  "hp_gained",
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
/** `walk`: the page walked Tibo toward its goal without asking a model, and Tibo lost health on the way. `loadout`: what Tibo holds changed. */
type LogEvent = "plan" | "pick" | "move" | "walk" | "goal" | "loadout" | "run_end";
type LogRow = { event: LogEvent; model?: string; reason?: string; goal?: string; action?: string; options?: string; detail?: string; ms?: number };

class RunLog {
  /** Health at the previous row, for `hp_lost` and `hp_gained`. */
  private hp: number | undefined;
  /** Health gained between rows over the run: the game counts healing only in total, not by source. */
  healed = 0;
  private held: Map<string, string> | undefined;
  constructor(readonly file: string) {
    mkdirSync(path.dirname(file), { recursive: true });
    // Never over another run's log: two runs with one id would truncate each other's.
    writeFileSync(file, `${LOG_COLUMNS.join(",")}\n`, { flag: "wx" });
  }

  write(r: RunView | undefined, row: LogRow) {
    const p = r?.player;
    const lost = p === undefined || this.hp === undefined ? "" : String(Math.max(0, Math.round(this.hp - p.hp)));
    const gained = p === undefined || this.hp === undefined ? 0 : Math.max(0, Math.round(p.hp - this.hp));
    this.healed += gained;
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
            hp_gained: gained,
            level: p.level,
            xp_pct: pct(p.xp, p.xpNext),
            gold: p.gold,
            x: Math.round(p.x),
            y: Math.round(p.y),
            dash: p.dashCharges,
            enemies: r.enemies.total,
            enemies_near: near(r),
            bosses: r.bosses.map((b) => `${b.name} (${b.id}) ${at(b)} ${pct(b.hp, b.maxHp)}%`).join("; "),
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

  /** Health lost since the last row. */
  lostSince(r: RunView): number {
    return this.hp === undefined ? 0 : Math.max(0, this.hp - r.player.hp);
  }

  /**
   * What Tibo holds now against the last call, such as "Root Spikes 3/8 to 7/8, Taproot Eruption
   * new", or undefined when nothing changed. Chests hand out their rewards without a choice, so
   * this is the only record of what a chest gave.
   */
  loadoutChange(r: RunView): string | undefined {
    const now = new Map([...r.loadout.weapons, ...r.loadout.passives].map((x) => [x.name, `${x.level}/${x.max}`] as [string, string]));
    // A new item carries the game's description, so a review can tell what it should have changed.
    const itemSaid = new Map(r.loadout.items.map((i) => [i.name, said(book ?? new Map(), "item", i.id).replace(/^: /, " (") + (said(book ?? new Map(), "item", i.id) === "" ? "" : ")")] as [string, string]));
    for (const i of r.loadout.items) now.set(i.name, `x${i.count}`);
    const before = this.held;
    this.held = now;
    if (before === undefined) return undefined;
    const changes = [
      ...[...now].filter(([k, v]) => before.get(k) !== v).map(([k, v]) => (before.has(k) ? `${k} ${before.get(k)} to ${v}` : `${k} ${v} new${itemSaid.get(k) ?? ""}${recipeParts.has(k) ? ` (the recipe ${recipeParts.get(k)})` : ""}`)),
      ...[...before.keys()].filter((k) => !now.has(k)).map((k) => `${k} gone`),
    ];
    return changes.length === 0 ? undefined : changes.join(", ");
  }
}

// ---- What the game says about things -------------------------------------------------------
// The planner reads the game's own description of every card it holds or is offered.
type Book = Map<string, string>;
let book: Book | undefined;

/** What each evolution, union or item evolution is made of, by the result's name, from the game's recipes. */
const recipeParts = new Map<string, string>();

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
    for (const r of e.recipes as { name?: string; parts?: { name?: string; need?: string }[] }[])
      if (r.name !== undefined && r.parts !== undefined) recipeParts.set(r.name, r.parts.map((x) => `${x.name}${x.need === "max" ? " at max level" : ""}`).join(" + "));
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
type Goal = { kind: "chest" | "poi" | "food" | "elite"; uid: number } | { kind: "explore"; dir: Direction } | { kind: "gems" } | { kind: "evade" };
type TargetGoal = Extract<Goal, { uid: number }>;
type Pursuit = {
  goal: Goal;
  id: string;
  title: string;
  /** What it is, for the icon on the panel's action tiles. */
  tag: ActionTag;
  /** The planner's decision that chose it, shown when its tiles are hovered. */
  decision: Inspect;
  since: number;
  deadline: number;
  /** The least work left so far (distance, plus seconds of charging as distance) and when. */
  best: { left: number; time: number };
  origin: { x: number; y: number };
  /** Health when the goal began, to say what it cost. */
  hp: number;
  /** Steps the action model took off the spot a goal needs Tibo to stand on. */
  steppedOff: number;
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
/** The panel's plan interval when someone watches, else --plan-every when given, else the coach's knob. */
const planEvery = () => (piloted ? pace.planEvery : args.includes("--plan-every") ? PLAN_EVERY : knobs().planEvery);

/** What the coach set for this run: the in-game models' prompts and the knobs below. */
let templates: Templates = DEFAULT_TEMPLATES;
const knobs = (): Knobs => templates.knobs;
const { PLAN_RANGE, GIVE_UP_SECONDS } = loop;
const ON_CHEST = 14;
// A goto that runs out its time, and food collected on touch ("gone" before the goto counts it as
// reached), end without saying how the goal went; the next step's look at the target tells.
const STEP_OVER = new Set(["timeout", "the target is gone"]);

let pursuit: Pursuit | undefined;
const outcomes: Outcome[] = [];
const giveUps = new Map<string, number>();
// Every chest listed so far this run; exploring ends on one never listed before. Spots are not
// counted: the map is dense with them, and exploring stopped every second or two on a new one.
const everListed = new Set<string>();

function resetGoals() {
  pursuit = undefined;
  distrusted = undefined;
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
    case "elite":
      return `E${g.uid}`;
    case "explore":
      return `explore ${g.dir}`;
    default:
      return g.kind;
  }
}

const onChest = (c: RunView["pickups"]["chests"][number]) => c.dist <= ON_CHEST;
// The name alone hides what a spot does: standing in a Beetle Nest wakes an elite.
const poiWhat = (p: RunView["pois"][number]) => (p.description === "" ? "" : ` (${p.description.replace(/\.$/, "").replace(/\. /g, "; ").toLowerCase()})`);
/** What a shop spot costs against the gold Tibo holds, or "" for a spot that costs nothing. */
const priceWords = (p: RunView["pois"][number], gold: number) =>
  p.price !== undefined ? `; it costs ${p.price} gold now, and Tibo has ${gold}` : p.prices !== undefined ? `; its items cost ${p.prices.join(", ")} gold by rarity, and Tibo has ${gold}` : "";

/** Where Tibo stands, as "on a chest, 1 of 3 seconds into opening it", or undefined when on nothing. */
function spotLine(r: RunView): string | undefined {
  const chest = r.pickups.chests.find(onChest);
  if (chest !== undefined) return `on a chest, ${chest.charge ?? 0} of ${chest.chargeNeeded ?? 1} seconds into opening it`;
  const inside = r.pois.find((p) => p.inside);
  if (inside === undefined) return undefined;
  return `inside the ${inside.name}${poiWhat(inside)}${inside.chargeNeeded > 0 ? `, charged ${inside.charge} of ${inside.chargeNeeded} seconds` : ""}${priceWords(inside, r.player.gold)}`;
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
  if (g.kind === "elite") {
    const e = r.enemies.elites.find((x) => x.uid === g.uid);
    return e === undefined ? undefined : { dist: e.dist, dir: e.dir, arrived: e.dist <= ELITE_REACH, charging: 0, progress: `${e.hp} health left, ${Math.round(e.dist)} away to the ${e.dir}`, name: `the ${e.name}` };
  }
  const f = r.pickups.nearest.find((x) => x.uid === g.uid);
  return f === undefined ? undefined : { dist: f.dist, dir: f.dir, arrived: false, charging: 0, progress: "", name: "the food" };
}

// Close enough for most weapons to reach an elite; nearer, each step is the action model's.
const ELITE_REACH = 70;
const TARGET_DONE = { chest: "opened", poi: "charged and used", food: "eaten", elite: "killed" } as const;

function goalTitle(g: Goal, r: RunView): string {
  switch (g.kind) {
    case "chest":
      return "Open the chest";
    case "poi":
      return `Charge the ${r.pois.find((p) => p.uid === g.uid)?.name ?? "spot"}`;
    case "food":
      return "Eat the food";
    case "elite":
      return `Fight the ${r.enemies.elites.find((e) => e.uid === g.uid)?.name ?? "elite"}`;
    case "explore":
      return `Explore ${g.dir}`;
    case "gems":
      return "Collect xp gems";
    case "evade":
      return "Keep away from enemies";
  }
}


// By the game's own point-of-interest kind; one the game adds later shows as a plain Spot.
const SPOT_TAGS: Record<string, ActionTag> = {
  dog: "Pet",
  dogKennel: "Kennel",
  paidChest: "Crate",
  chargeShrine: "Shrine",
  curseShrine: "Curse",
  goldenShrine: "Golden",
  crops: "Farm",
  vendor: "Shop",
  microwave: "Microwave",
  eliteNest: "Nest",
  bossLair: "Lair",
  botDock: "Bot",
  whetstone: "Whetstone",
  dinnerBell: "Bell",
  taterSlots: "Slots",
  seedVault: "Vault",
  taterMagnet: "Magnet",
  rootTunnel: "Tunnel",
  taterLantern: "Light",
  spudFreezer: "Freezer",
  frenzyFryer: "Fryer",
};

function goalTag(g: Goal, r: RunView): ActionTag {
  switch (g.kind) {
    case "chest":
      return "Loot";
    case "poi": {
      const kind = r.pois.find((p) => p.uid === g.uid)?.kind;
      return (kind === undefined ? undefined : SPOT_TAGS[kind]) ?? "Spot";
    }
    case "food":
      return "Eat";
    case "elite":
      return "Hunt";
    case "explore":
      return "Wander";
    case "gems":
      return "Gems";
    case "evade":
      return "Run";
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
    case "elite": {
      const t = locate(r, g);
      // Elites are listed wherever they are, so one that is gone has died.
      if (t === undefined) return p.seen ? { done: TARGET_DONE.elite, success: true } : { done: "it is not there", success: false };
      p.seen = true;
      // Within reach the action model picks every step, as when evading: hold the elite there without touching it.
      return t.arrived ? { progress: t.progress } : { heading: t.dir, left: t.dist, progress: t.progress };
    }
    case "explore": {
      const found = r.pickups.chests.find((c) => !p.known.has(`C${c.uid}`) && c.dist < PLAN_RANGE);
      if (found !== undefined) return { done: `found a chest ${Math.round(found.dist)} away to the ${found.dir}`, success: true };
      const walked = Math.hypot(r.player.x - p.origin.x, r.player.y - p.origin.y);
      if (walked >= knobs().exploreDistance) return { done: `walked ${knobs().exploreDistance} units and found nothing new`, success: true };
      return { heading: g.dir, left: knobs().exploreDistance - walked, progress: `${Math.round(walked)} of ${knobs().exploreDistance} walked` };
    }
    case "gems": {
      const best = [...r.sectors].sort((a, b) => b.xpNear - a.xpNear)[0];
      if (best === undefined || best.xpNear === 0) return { done: "no gems left nearby", success: true };
      if (age >= knobs().gemsSeconds) return { done: `collected for ${knobs().gemsSeconds} seconds`, success: true };
      return { heading: best.dir, progress: `${best.xpNear} gems to the ${best.dir}` };
    }
    case "evade":
      if (age >= knobs().evadeSeconds) {
        const lost = Math.round(p.hp - r.player.hp);
        return { done: lost > 0 ? `the ${knobs().evadeSeconds} seconds ran out, and Tibo lost ${lost} health during them` : `kept clear for ${knobs().evadeSeconds} seconds without losing health`, success: true };
      }
      return { progress: `${Math.ceil(knobs().evadeSeconds - age)}s left` };
  }
}

function begin(goal: Goal, r: RunView, log: RunLog, decision: Inspect) {
  const title = goalTitle(goal, r);
  const p: Pursuit = {
    goal,
    id: goalId(goal),
    title,
    tag: goalTag(goal, r),
    decision,
    since: r.time,
    deadline: r.time,
    best: { left: Number.POSITIVE_INFINITY, time: r.time },
    origin: { x: r.player.x, y: r.player.y },
    hp: r.player.hp,
    steppedOff: 0,
    known: new Set(everListed),
    seen: false,
  };
  const aim = aimAt(p, r);
  const seconds = goal.kind === "gems" ? knobs().gemsSeconds : goal.kind === "evade" ? knobs().evadeSeconds : goal.kind === "elite" ? knobs().eliteSeconds : "left" in aim && aim.left !== undefined ? aim.left / GOAL_SPEED : 0;
  p.deadline = r.time + seconds + GOAL_SLACK;
  pursuit = p;
  log.write(r, { event: "goal", goal: p.id, action: "start", detail: title });
  say({ role: "action", model: "goal", time: r.time, text: title, tag: p.tag, detail: "done" in aim ? aim.done : aim.progress, inspect: decision });
}

const RESULT_WORDS: Record<GoalResult, string> = { done: "done", failed: "gave up", dropped: "dropped" };

function finish(r: RunView, log: RunLog, outcome: string, result: GoalResult) {
  const p = pursuit;
  if (p === undefined) return;
  pursuit = undefined;
  outcomes.push({ time: r.time, id: p.id, title: p.title, outcome, success: result !== "failed" });
  if (outcomes.length > 30) outcomes.shift();
  if (result === "failed" && "uid" in p.goal) giveUps.set(p.id, r.time + GIVE_UP_SECONDS);
  log.write(r, { event: "goal", goal: p.id, action: result, detail: outcome });
  say({ role: "action", model: "goal", time: r.time, text: `${p.title}: ${RESULT_WORDS[result]}`, tag: p.tag, result, detail: `${outcome} · ${Math.round(r.time - p.since)}s`, inspect: p.decision });
}

/** The planner's goal takes over, unless it is the one already under way. */
function setGoal(goal: Goal, r: RunView, log: RunLog, decision: Inspect) {
  if (pursuit?.id === goalId(goal)) return;
  if (pursuit !== undefined) finish(r, log, "the planner chose another goal", "dropped");
  begin(goal, r, log, decision);
}

/** Why the current goal ends now, if it does. */
function ending(p: Pursuit, r: RunView, aim: Aim | Ended, status: CommandStatus | undefined): Ended | undefined {
  if ("done" in aim) return aim;
  if (status?.command.type === "goto" && status.state === "done") return { done: TARGET_DONE[(p.goal as TargetGoal).kind], success: true };
  if (status?.state === "failed" && !STEP_OVER.has(status.detail ?? "")) return { done: `the game said: ${status.detail ?? "failed"}`, success: false };
  if (r.time > p.deadline) return { done: `still not done after ${Math.round(r.time - p.since)} seconds`, success: false };
  if (aim.left === undefined) return undefined;
  if (aim.left < p.best.left - 1) p.best = { left: aim.left, time: r.time };
  else if (r.time - p.best.time > knobs().stuckSeconds)
    return { done: stuckWords(p, r, aim), success: false };
  return undefined;
}

/** The forecast missed a hit on a free step; until `until`, every step asks the action model (knob distrustSeconds). */
let distrusted: { until: number; lost: number; at: number } | undefined;

/** Why the action model is asked even though the forecast calls the way to the goal cheap, if it is. */
function distrustReason(r: RunView): string | undefined {
  if (distrusted !== undefined && r.time < distrusted.until) return `the forecast was not trusted: Tibo lost ${distrusted.lost} health on a step it called free at ${clock(distrusted.at)}`;
  const range = knobs().distrustBossRange;
  const boss = range > 0 ? r.bosses.find((b) => b.dist <= range) : undefined;
  return boss === undefined ? undefined : `the forecast was not trusted: the ${boss.name} boss is ${Math.round(boss.dist)} away`;
}

/** Why a goal stopped making progress, in the words the planner reads in its recent goals. */
function stuckWords(p: Pursuit, r: RunView, aim: Aim): string {
  const seconds = knobs().stuckSeconds;
  const off = p.steppedOff === 0 ? "" : `; the action model stepped off it ${plural(p.steppedOff, "time")} to dodge`;
  if (aim.heading !== "stay") return `no closer for ${seconds} seconds${off}`;
  const spot = p.goal.kind === "poi" ? r.pois.find((x) => x.uid === (p.goal as TargetGoal).uid) : undefined;
  return `standing on it charged nothing for ${seconds} seconds${spot === undefined ? "" : priceWords(spot, r.player.gold)}${off}`;
}

/** One step toward the current goal: walk on while it is safe, else ask the action model. */
async function pursue(s: Snap, r: RunView, log: RunLog, planner: Planner) {
  for (const c of r.pickups.chests) everListed.add(`C${c.uid}`);
  const gained = log.loadoutChange(r);
  if (gained !== undefined) {
    log.write(r, { event: "loadout", action: gained, ...(pursuit === undefined ? {} : { goal: pursuit.id }) });
    if (!planner.picked) planner.notes.picks.push(`- **${clock(r.time)}** gained without a pick (a chest or other): ${gained}.`);
  }
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
    const clear = aim.heading !== undefined && (cost === undefined || cheapest === undefined || cost <= cheapest + knobs().extraDamage);
    const distrust = distrustReason(r);
    if (clear && distrust === undefined) {
      // The page walks on its own here, so a hit the forecast missed would otherwise leave no row.
      const lost = log.lostSince(r);
      if (lost >= 1) {
        log.write(r, { event: "walk", model: "none", goal: p.id, action: aim.heading === "stay" ? "stand on the goal" : `walk ${aim.heading}`, reason: "the way to the goal cost no more than the cheapest move" });
        if (knobs().distrustSeconds > 0) distrusted = { until: r.time + knobs().distrustSeconds, lost: Math.round(lost), at: r.time };
      }
      if (aim.heading !== undefined && aim.heading !== "stay" && dashWorthAsking(r)) await dashOnTheWay(r, p, aim.heading, log);
      return walkOn(p, r, aim, status, log);
    }
    p.sent = undefined;
    return steer(r, p, aim, log, distrust ?? `the way to the goal (${aim.heading ?? "none"}) costs more than the safest move`);
  }
}

async function walkOn(p: Pursuit, r: RunView, aim: Aim, status: CommandStatus | undefined, log: RunLog) {
  const order = aim.to !== undefined ? { type: "goto", to: aim.to, stay: "done" } : { type: "move", dir: aim.heading };
  // One command steers until the goal changes; it is only sent again if it changes or ends.
  const key = JSON.stringify(order);
  if (p.sent === key && (status === undefined || status.state === "running")) return;
  p.commandId = (await send(order.type === "goto" ? { ...order, timeout: Math.max(1, p.deadline - r.time) } : order)).id;
  p.sent = key;
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
const HURT_SCALE = ["takes no damage", "gets scratched", "gets badly hurt", "gets very badly hurt", "dies"];
const SAFE_ENOUGH = 0.5;

function goalWords(p: Pursuit, aim: Aim): string {
  if (p.goal.kind === "evade") return "keep away from enemies";
  if (p.goal.kind === "explore") return `walk ${p.goal.dir} to look for chests and shrines`;
  if (p.goal.kind === "gems") return `collect the xp gems, most of them to the ${aim.heading}`;
  if (p.goal.kind === "elite") return `${p.title.toLowerCase()}: keep it within ${ELITE_REACH} units so Tibo's weapons kill it, without touching it; it has ${aim.progress}`;
  return aim.heading === "stay" ? `${p.title.toLowerCase()}: stay where Tibo stands, ${aim.progress}` : `${p.title.toLowerCase()}, ${aim.progress}`;
}

/** A dash charge, a dash template, and an enemy or bullet close enough that dashing could matter. */
function dashWorthAsking(r: RunView): boolean {
  return templates.action.dash.trim() !== "" && r.player.dashCharges > 0 && r.sectors.some((x) => x.enemiesNear > 0 || (x.nearestBullet ?? 999) < 40);
}

/**
 * The page is walking Tibo to its goal without a model, which is when crowds land most of their
 * hits, so the action model still gets the dash question; a yes dashes the way Tibo walks.
 */
async function dashOnTheWay(r: RunView, p: Pursuit, heading: Direction, log: RunLog) {
  const vars = stateVars(r, { goal: goalWords(p, { heading, progress: "" }) });
  const started = performance.now();
  const answers = await decide(render(templates.action.state, vars), { dash: { type: "noul", instructions: render(templates.action.dash, vars) } });
  const odds = answers.dash?.noul ?? 0;
  if (odds <= 0.5) return;
  log.write(r, { event: "move", model: MODEL, goal: p.id, action: `dash ${heading}`, reason: "the page was walking to the goal, and the action model said to dash", detail: `dash asked on a walked step: ${Math.round(odds * 100)}%, dashed`, ms: Math.round(performance.now() - started) });
  await command({ type: "dash", dir: heading });
}

/** The way to the goal costs more than the safest move: the action model picks this step. */
async function steer(r: RunView, p: Pursuit, aim: Aim, log: RunLog, why: string) {
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
  const bossClose = knobs().bossOfferRange > 0 && r.bosses.some((b) => b.dist <= knobs().bossOfferRange);
  if (cheapest !== undefined && !bossClose) for (const k of Object.keys(moves)) if ((cost(k) ?? 0) > cheapest + knobs().extraDamage) delete moves[k];
  const vars = stateVars(r, { goal });
  const state = render(templates.action.state, vars);
  const ask = (template: string, move: string) => render(template, { ...vars, move: () => move });
  const questions: Record<string, Question> = {};
  for (const [key, text] of Object.entries(moves)) {
    questions[key] = { type: "score", instructions: ask(templates.action.hurt, text), criteria: HURT_SCALE };
    questions[`useful:${key}`] = { type: "noul", instructions: ask(templates.action.useful, text) };
  }
  const canDash = dashWorthAsking(r);
  if (canDash) questions.dash = { type: "noul", instructions: render(templates.action.dash, vars) };
  const started = performance.now();
  const answers = await decide(state, questions);
  const ms = Math.round(performance.now() - started);
  decideSeconds = 0.8 * decideSeconds + 0.2 * (ms / 1000);
  modelSteered = true;
  const risk = (k: string) => answers[k]?.noul ?? 1;
  const safest = Math.min(...Object.keys(moves).map(risk));
  const safe = Object.keys(moves).filter((k) => risk(k) <= safest + knobs().safeMargin && (risk(k) < SAFE_ENOUGH || risk(k) === safest));
  const choice = safe.sort((x, y) => (answers[`useful:${y}`]?.noul ?? 0) - (answers[`useful:${x}`]?.noul ?? 0) || risk(x) - risk(y))[0] ?? "stay";
  const dir = (DIRECTIONS as readonly string[]).includes(choice) ? (choice as Direction) : undefined;
  const dash = dir !== undefined && (answers.dash?.noul ?? 0) > 0.5;
  if (aim.heading === "stay" && dir !== undefined) p.steppedOff++;
  const dashWhy =
    templates.action.dash.trim() === ""
      ? "dash not asked: the template is empty"
      : r.player.dashCharges === 0
        ? "dash not asked: no charge"
        : !canDash
          ? "dash not asked: nothing close"
          : `dash asked: ${Math.round((answers.dash?.noul ?? 0) * 100)}%${dash ? ", dashed" : ""}`;
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
    ...(dash ? { tag: "Dash" } : {}),
    inspect: {
      kind: "moves",
      situation: state,
      questions: [`For each move: ${ask(templates.action.hurt, "<the move>")} (${HURT_SCALE.join(", ")})`, `For each move: ${ask(templates.action.useful, "<the move>")}`, ...(canDash ? [render(templates.action.dash, vars)] : [])],
      moves: weighed,
      ...(answers.dash?.noul === undefined ? {} : { dash: answers.dash.noul }),
    },
    detail: [`for: ${p.title}`, `Tibo ${HURT_SCALE[Math.round(answers[choice]?.score ?? 0)] ?? "?"}`, ...(ruledOut > 0 ? [`${ruledOut} costlier ${ruledOut === 1 ? "move" : "moves"} ruled out`] : [])].join(" · "),
  });
  log.write(r, {
    event: "move",
    model: MODEL,
    reason: why,
    goal: p.id,
    action: move,
    options: weighed.map((w) => `${w.move} ${w.forecast ?? "?"} hurt ${w.hurt ?? "-"} useful ${w.useful === undefined ? "-" : Math.round(w.useful * 100)}%${w.outcome === "ruled out" ? " (ruled out)" : ""}`).join("; "),
    detail: dashWhy,
    ms,
  });
  if (dash) await command({ type: "dash", dir });
  return dir === undefined ? command({ type: "stop" }) : send({ type: "move", dir });
}

// ---- Planner -------------------------------------------------------------------------------
// The planner is the decision model in a second persona. Before every decision it reads the state
// its template asks for, which the coach wrote for this run with the game knowledge in it. It
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

/** Every state block a template may use (see BLOCKS in scripts/gameplay.ts), rendered only when used. */
function blocks(r: RunView, b: Book): Record<BlockName, () => string> {
  const p = r.player;
  const owned = (kind: string, xs: { id: string; name: string; level: number; max: number }[]) => xs.map((x) => `\n  - ${x.name} ${x.level}/${x.max}${said(b, kind, x.id)}`).join("") || " none";
  const hp = pct(p.hp, p.maxHp);
  const v: Record<Exclude<BlockName, "state">, () => string> = {
    time: () => clock(r.time),
    difficulty: () => difficulty,
    mode: () => MODE_NAME,
    health: () => `Health ${Math.round(p.hp)}/${Math.round(p.maxHp)} (${hp}%${healthTrend(r)})${hp < 40 ? ", which is low" : ""}.`,
    level: () => `Level ${p.level}, ${pct(p.xp, p.xpNext)}% of the way to the next.`,
    gold: () => `Gold ${p.gold}.`,
    dash: () => `Dash charges ${p.dashCharges}.`,
    weapons: () => `Weapons (${r.loadout.weapons.length} of 6 slots):${owned("weapon", r.loadout.weapons)}`,
    passives: () => `Passives (${r.loadout.passives.length} of 6 slots):${owned("passive", r.loadout.passives)}`,
    items: () => `Items:${r.loadout.items.map((i) => `\n  - ${i.name} x${i.count}${said(b, "item", i.id)}`).join("") || " none"}`,
    banished: () => `Banished this run: ${r.loadout.banished.join(", ") || "nothing"}.`,
    recipes: () => `Recipes in reach: ${r.combos.map((c) => `${c.name} (${c.parts.map((x) => `${x.name} ${x.state}${x.have === undefined ? "" : ` ${x.have}/${x.max}`}`).join(" + ")})`).join("; ") || "none"}.`,
    evolutions: () => {
      const ready = r.combos.filter((c) => c.ready && c.kind !== "union").map((c) => c.name);
      return ready.length === 0 ? "No recipe is complete yet." : `The next chest opened evolves ${ready.join(" and ")}.`;
    },
    standing_on: () => `Tibo stands ${spotLine(r) ?? "on no chest or spot"}.${r.hazards.some((h) => h.inside) ? ` Underfoot: ${r.hazards.filter((h) => h.inside).map((h) => hazardWords(h.kind)).join(", ")}.` : ""}`,
    hurt_by: () => `Hurt in the last 3 seconds by: ${Object.entries(p.hurtBy).map(([k, n]) => `${sourceWords(k)} ${n}`).join(", ") || "nothing"}.`,
    bosses: () => `Bosses: ${r.bosses.map((x) => `${x.name} (${x.id}) ${Math.round(x.dist)} away to the ${x.dir}, ${pct(x.hp, x.maxHp)}% health`).join("; ") || "none"}.`,
    enemies: () => {
      const crowd = [...r.sectors].sort((a, z) => z.enemiesFar - a.enemiesFar);
      return `Enemies: ${r.enemies.total} around, ${near(r)} within 60. Most within 150 to the ${crowd[0]?.dir} (${crowd[0]?.enemiesFar}), fewest to the ${crowd.at(-1)?.dir} (${crowd.at(-1)?.enemiesFar}).`;
    },
    current_goal: () => `Current goal: ${pursuit === undefined ? "none" : `${pursuit.title}, since ${clock(pursuit.since)}`}.`,
    recent_goals: () => `Recent goals: ${outcomes.slice(-6).map((o) => `${clock(o.time)} ${o.title}: ${o.outcome}`).join("; ") || "none yet"}.`,
  };
  const state = () =>
    [
      `Time ${v.time()}. ${v.health()} ${v.level()} ${v.gold()} ${v.dash()}`,
      v.weapons(),
      v.passives(),
      v.items(),
      ...(r.loadout.banished.length === 0 ? [] : [v.banished()]),
      v.recipes(),
      v.evolutions(),
      v.standing_on(),
      v.hurt_by(),
      v.bosses(),
      v.enemies(),
      v.current_goal(),
      v.recent_goals(),
    ].join("\n");
  return { ...v, state };
}

/** The values a template is rendered with: the state blocks and the slot's own, such as {{goal}}. */
function stateVars(r: RunView, extra: Record<string, string>): Record<string, () => string> {
  return { ...blocks(r, book ?? new Map()), ...Object.fromEntries(Object.entries(extra).map(([k, x]) => [k, () => x])) };
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
        text: `${x.inside ? `stay inside the ${x.name}` : `walk to the ${x.name} ${Math.round(x.dist)} away to the ${x.dir} and stand inside it`} for ${x.chargeNeeded} seconds${x.description === "" ? "" : ` (${x.description.replace(/\.$/, "")})`}${priceWords(x, r.player.gold)}${given(`P${x.uid}`)}`,
      })),
    ...r.pickups.nearest
      .filter((x) => x.kind === "heal" && x.dist < PLAN_RANGE)
      .slice(0, 2)
      .map((x) => ({ goal: { kind: "food" as const, uid: x.uid }, text: `walk to the food ${Math.round(x.dist)} away to the ${x.dir}, which heals Tibo` })),
    ...r.enemies.elites
      .filter((e) => e.dist < PLAN_RANGE)
      .slice(0, 2)
      .map((e) => ({
        goal: { kind: "elite" as const, uid: e.uid },
        text: `fight the ${e.name} elite ${Math.round(e.dist)} away to the ${e.dir} (${e.hp} health left): keep it within reach of Tibo's weapons for up to ${knobs().eliteSeconds} seconds until it dies, which drops a chest${given(`E${e.uid}`)}`,
      })),
    ...(gems === 0 ? [] : [{ goal: { kind: "gems" as const }, text: `collect the ${gems} xp gems nearby, most of them to the ${gemSide?.dir}, for up to ${knobs().gemsSeconds} seconds` }]),
    ...r.sectors.map((s) => ({
      goal: { kind: "explore" as const, dir: s.dir },
      text: `explore ${s.dir}: walk ${knobs().exploreDistance} units that way, stopping at the first new chest, toward ${plural(s.enemiesFar, "enemy")} within 150`,
    })),
    { goal: { kind: "evade" }, text: `keep away from enemies for ${knobs().evadeSeconds} seconds` },
  ];
}

type PlanAnswer = { pick?: OptionView; goal: Goal; ms: number; cards?: CardOption[]; goals: CardOption[] };

class Planner {
  calls = 0;
  /** A card was just taken, so the goal is planned again with it in hand. */
  picked = false;
  private lastAsked = Number.NEGATIVE_INFINITY;
  /** Bosses already planned for, by id: each new one gets a plan the moment it shows up. */
  private seenBosses = new Set<string>();

  constructor(
    readonly notes: RunNotes,
    private log: RunLog,
  ) {}

  /** Why to plan again while a goal is under way, if anything. */
  due(r: RunView): string | undefined {
    const fresh = r.bosses.find((b) => !this.seenBosses.has(b.id));
    let why: string | undefined;
    if (this.picked) why = "a card was just taken";
    else if (fresh !== undefined) why = `a boss appeared: ${fresh.name}, ${Math.round(fresh.dist)} away to the ${fresh.dir}`;
    else if (r.time - this.lastAsked >= planEvery()) why = `${planEvery()} seconds passed`;
    for (const b of r.bosses) this.seenBosses.add(b.id);
    return why;
  }

  /** Picks among `options` when a choice is open, and sets the next goal. */
  async plan(r: RunView, why: string, options?: OptionView[]): Promise<PlanAnswer> {
    this.lastAsked = r.time;
    if (options === undefined) this.picked = false;
    this.calls++;
    const b = await readBook();
    const vars = { ...blocks(r, b), why: () => why };
    const state = render(templates.planner.state, vars);
    const goals = goalOptions(r);
    const questions: Record<string, Question> = {};
    const goalQuestion = (text: string) => render(templates.planner.goal, { ...vars, goal: () => text });
    for (const [i, g] of goals.entries()) questions[`goal:${i}`] = { type: "noul", instructions: goalQuestion(g.text) };
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
    const question = render(templates.planner.pick, { ...vars, choice: () => kind });
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
    const decision: Inspect = {
      kind: "plan",
      prompt: [state, ...(options === undefined ? [] : [question]), `For each goal: ${goalQuestion("…")}`].join("\n\n"),
      ...(cards === undefined ? {} : { choices: cards }),
      goals: weighed,
    };
    setGoal(goal, r, this.log, decision);

    const title = goalTitle(goal, r);
    say({
      role: "planner",
      model: PLAN_MODEL,
      time: r.time,
      text: [pick === undefined ? "" : `Take ${cardName(pick)}.`, `Goal: ${title} (${Math.round(score(best) * 100)}%).`].filter(Boolean).join(" "),
      detail: `Asked because ${why}.`,
      inspect: decision,
    });
    // The log names where each target is, so a review can tell a near spot refused from a far one.
    const placed = weighed.map((w, i) => {
      const g = goals[i]?.goal;
      const t = g !== undefined && "uid" in g ? locate(r, g) : undefined;
      return t === undefined ? w : { ...w, card: `${w.card} (${Math.round(t.dist)} ${t.dir})` };
    });
    const odds = (xs: CardOption[]) => xs.map((x) => `${x.card} ${x.probability === undefined ? "?" : Math.round(x.probability * 100)}%`).join("; ");
    this.log.write(r, {
      event: pick === undefined ? "plan" : "pick",
      model: PLAN_MODEL,
      reason: why,
      goal: goalId(goal),
      action: pick === undefined ? title : cardName(pick),
      options: cards === undefined ? odds(placed) : `${odds(cards)} | goals: ${odds(placed)}`,
      ms,
    });
    if (pick !== undefined) {
      this.notes.picks.push(`- **${clock(r.time)}** ${kind}: took ${cardName(pick)} from ${options?.map(cardName).join(", ")}.`);
    }
    return { ...(pick === undefined ? {} : { pick }), goal, ms, ...(cards === undefined ? {} : { cards }), goals: weighed };
  }

  /** The run ended: its notes are written, then the coach reviews it. */
  async finish(lastRun: NonNullable<Snapshot["lastRun"]>, last: RunView | undefined, ladder: number | undefined, healed: number) {
    await this.notes.finish({
      lived: lastRun.time,
      ending: `${lastRun.time >= WIN_SECONDS ? "won (passed 20:00), then " : ""}died at ${clock(lastRun.time)}, level ${lastRun.level}, ${lastRun.kills} kills`,
      outcome: [
        `Lived **${clock(lastRun.time)}** (${lastRun.time}s), level ${lastRun.level}, ${lastRun.kills} kills.`,
        ...loop.totalsLines(loop.totalsBetween(lastRun)),
        `Health gained over the run, by food, regeneration and anything else: about ${healed} (the game does not say from what).`,
        ...(last === undefined ? [] : loadoutLines(last)),
        `Planner asked ${this.calls} times.`,
        ...(ladder === undefined ? [] : [`Nightmare ladder after the run: ${ladder === 0 ? "no level won yet" : `won up to Nightmare ${ladder}`}, so the next Open World Nightmare run plays Nightmare ${ladder + 1}.`]),
      ],
    });
  }

}

const loadoutLines = (r: RunView) => [
  `Weapons: ${r.loadout.weapons.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}.`,
  `Passives: ${r.loadout.passives.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}.`,
  `Items: ${r.loadout.items.map((i) => `${i.name} x${i.count}${said(book ?? new Map(), "item", i.id)}`).join("; ") || "none"}.`,
];

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

/** What the last start asked for and got: the starting weapon, or why the game's Random was used instead. */
let startNote = "random";

/** Reloads the tab into SEED and waits until the page is back. */
async function seedPage() {
  const sent = await command({ type: "seed", seed: SEED }, 30);
  if (sent.state !== "done") throw new Error(`could not set seed ${SEED}: ${sent.detail ?? sent.state}`);
  await Bun.sleep(4000);
  for (let i = 0; i < 90 && !(await api<Snap>("/state")).connected; i++) await Bun.sleep(1000);
}

async function start(weapon = ""): Promise<void> {
  if (SEED === "") return startRun(weapon);
  const want = SEED;
  for (let attempt = 1; ; attempt++) {
    await seedPage();
    await startRun(weapon);
    const got = (await api<Snap>("/state")).run?.seed;
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
    rescuedLink = (await api<Snap>("/state")).lastRunLink ?? rescuedLink;
    console.log(`start failed (${started.detail ?? started.state}); reloading the game page`);
    if (RELOAD !== "") await fetch(RELOAD).catch(() => undefined);
    await Bun.sleep(8000);
    started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY, ...(startNote === "chosen" ? { weapon } : {}) }, 120);
    if (started.state !== "done") throw new Error(`could not start a run: ${started.detail ?? started.state}`);
  }
  difficulty = started.detail ?? DIFFICULTY;
  // A new run waits paused at tick 0, so the next step sets it going live.
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
  let planner: Planner | undefined;
  let runLog: RunLog | undefined;
  let last: RunView | undefined;
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
  const now = await api<Snap>("/state");
  // Every run the bot starts begins fresh, so a Daily always begins at tick 0 on its fixed seed.
  let adopted = TAKEOVER && now.run !== undefined && now.screen !== "over" && now.screen !== "title";
  if (TRIAL !== undefined && !adopted) throw new Error("--trial plays the run in progress, and there is none; start a run and load a checkpoint first");
  let trialStart: RunView | undefined;
  const endTrial = async (end: RunView | undefined, died: NonNullable<Snapshot["lastRun"]> | undefined) => {
    const start = trialStart;
    if (start === undefined || end === undefined) throw new Error("the trial ended before its first step");
    const totals = loop.totalsBetween(died ?? end.totals, start.totals);
    const endTime = died?.time ?? end.time;
    const result = {
      survived: Math.round((endTime - start.time) * 10) / 10,
      died: died !== undefined,
      start: start.time,
      end: endTime,
      hp: { start: Math.round(start.player.hp), end: died === undefined ? Math.round(end.player.hp) : 0, max: Math.round(end.player.maxHp) },
      level: { start: start.player.level, end: died?.level ?? end.player.level },
      kills: totals.kills,
      damageTaken: totals.damageTaken,
      totals,
      weapons: end.loadout.weapons.map((w) => `${w.id} ${w.level}`),
      passives: end.loadout.passives.map((p) => `${p.id} ${p.level}`),
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
    time: now.run?.time ?? 0,
    text: `${adopted ? `Taking over the run at ${clock(now.run?.time ?? 0)}` : `Starting a ${MODE === "daily" ? "Daily" : "Open World"} run on ${DIFFICULTY}`}.`,
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

  for (;;) {
    const s = await timed("state", api<Snap>("/state"));
    if (!s.connected) throw new Error("the game tab is not connected to the agent server");
    await fillLink(s);
    if (s.screen === "title" || s.screen === "over") {
      if (TRIAL !== undefined) return endTrial(last, s.lastRun ?? (last === undefined ? undefined : { time: last.time, level: last.player.level, ...last.totals }));
      if (s.screen === "over" && s.lastRun !== undefined && runs > 0 && notes !== undefined && planner !== undefined && runLog !== undefined) {
        const avg = latency.reduce((x, y) => x + y, 0) / Math.max(1, latency.length);
        console.log(`run ${runs} ended at ${s.lastRun.time}s, level ${s.lastRun.level}, ${s.lastRun.kills} kills, ${steps} steps, ${Math.round(avg)}ms per decision`);
        say({ role: "system", time: s.lastRun.time, tag: "Over", text: `Run over at ${clock(s.lastRun.time)}, level ${s.lastRun.level}, ${s.lastRun.kills} kills.` });
        console.log(`  damage taken: ${Object.entries(s.lastRun.damageTaken).map(([k, v]) => `${k} ${v}`).join(", ")}`);
        const total = Object.values(s.lastRun.damageTaken).reduce((a, b) => a + b, 0);
        const lastHurt = last === undefined ? "" : Object.entries(last.player.hurtBy).map(([k, v]) => `${k} ${v}`).join(", ");
        runLog.write(last, {
          event: "run_end",
          action: s.lastRun.time >= WIN_SECONDS ? "won, then died" : "died",
          detail: `Tibo died at ${clock(s.lastRun.time)}, level ${s.lastRun.level}, ${s.lastRun.kills} kills; hurt in its last 3 seconds by ${lastHurt || "nothing the bot saw"}; damage taken ${Math.round(total)} in all: ${Object.entries(s.lastRun.damageTaken).map(([k, v]) => `${k} ${v}`).join(", ")}`,
        });
        log.write(`${JSON.stringify({ event: "end", model: MODEL, mode: MODE, difficulty, notes: notes.id, runLog: runLog.file, ...s.lastRun, steps, plannerCalls: planner.calls, avgDecisionMs: Math.round(avg) })}\n`);
        log.flush();
        // The run is over; a stop from here on only notes the missing review.
        const ended = notes;
        notes = undefined;
        await planner.finish(s.lastRun, last, s.ladderCleared, runLog.healed);
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
        console.log(`notes: ${ended.saved ? ended.file : "not saved"}, log: ${runLog.file}`);
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
    const r = s.run;
    if (r === undefined) {
      await Bun.sleep(100);
      continue;
    }
    pace = s.pace ?? pace;
    piloted = s.pace !== undefined;
    const incognito = s.incognito ?? false;
    if (notes === undefined || planner === undefined || runLog === undefined) {
      const setup: RunSetup = { started: new Date(), difficulty: r.difficulty, mode: MODE_NAME, surface: s.headless === true ? "headless" : "browser", seed: r.seed, planner: PLAN_MODEL, action: MODEL, coach: COACH_LABEL, bot: BOT_CODE };
      const skip = !NOTES ? "no --notes" : adopted ? "taken over mid-run" : incognito ? "incognito" : undefined;
      const prompts = "see the coach's log";
      templates = plan.templates;
      notes = new RunNotes(setup, plan, prompts, skip === undefined);
      const first = r.loadout.weapons[0]?.id ?? "none";
      notes.started = startNote === "chosen" ? `${first} (chosen by the coach)` : `${first} (${startNote})`;
      adopted = false;
      runLog = new RunLog(notes.log);
      planner = new Planner(notes, runLog);
      resetGoals();
      console.log(`run seed ${r.seed}${r.daily ? " (daily)" : ""}, ${skip === undefined ? "notes at the end" : `no notes (${skip})`}, templates from ${plan.source}, log ${notes.log}`);
    }
    last = r;
    trialStart ??= r;
    if (TRIAL !== undefined && r.time - trialStart.time >= TRIAL) return endTrial(r, undefined);
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
    modelSteered = false;
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
