#!/usr/bin/env bun
// Plays tibo.dog through the agent server with a local decision model (LM Studio's
// /v1/systemone). This file only describes the game to the model and turns its answers into
// commands; every decision (where to move, what to pick) is the model's.
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import { BRIDGE_ORIGIN as DEFAULT_ORIGIN, type CommandStatus, DIRECTIONS, type Direction, type ForecastView, type RunView, type SectorView, type Snapshot } from "../src/agent/protocol";

const args = process.argv.slice(2);
const option = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};
const MODEL = option("model", "h2o-lightning-4b@q8_0");
// Level-up picks are rare (a few dozen a run), so they can afford a slower, stronger model.
const PICK_MODEL = option("pick-model", MODEL);
const SERVER = option("server", process.env.TIBO_SERVER ?? DEFAULT_ORIGIN);
const DECIDER = option("decider", "http://localhost:1234/v1/systemone");
const STEP = Number(option("step", "0.35"));
const RUNS = Number(option("runs", "1"));
const DIFFICULTY = option("difficulty", "easy");
const MODE = option("mode", "daily");
const SPEED = Number(option("speed", "4"));
const COACH = option("coach", "grok");
const COACH_MODEL = option("coach-model", "grok-4.7-build-fast");
const TRACE = args.includes("--trace");
const RELOAD = option("reload", "http://127.0.0.1:7358/reload");
const LOG = option("log", path.join(import.meta.dir, "..", ".runs", `${MODEL.replace(/[^\w.@-]/g, "_")}-${Date.now()}.jsonl`));

type Snap = Snapshot & { connected: boolean; ageMs: number };
type Question = { type: "choice"; instructions: string; criteria: Record<string, string | null> } | { type: "noul"; instructions: string };
type Answer = { choice?: string; probabilities?: Record<string, number>; confidence?: number; noul?: number };

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

const latency: number[] = [];
let trace: ((entry: unknown) => void) | undefined;
async function decide(state: string, questions: Record<string, Question>, model = MODEL): Promise<Record<string, Answer>> {
  const started = performance.now();
  const body = JSON.stringify({ model, state, questions });
  let json: { answers?: Record<string, Answer>; error?: unknown } | undefined;
  // LM Studio occasionally never answers a request; give up on it and ask again.
  for (let attempt = 0; json === undefined; attempt++) {
    try {
      const res = await timed("decide", fetch(DECIDER, { method: "POST", headers: { "content-type": "application/json" }, body, signal: AbortSignal.timeout(60_000) }));
      json = (await res.json()) as { answers?: Record<string, Answer>; error?: unknown };
    } catch (e) {
      if (attempt >= 3) throw e;
      console.log(`decision request failed (${e instanceof Error ? e.message : e}); retrying`);
    }
  }
  latency.push(performance.now() - started);
  if (json.answers === undefined) throw new Error(`decision model error: ${JSON.stringify(json.error ?? json).slice(0, 300)}`);
  trace?.({ event: "decision", state, questions, answers: json.answers });
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
const CHECKPOINTS = [30, 150, 300, 480, 660, 840, 1020, 1140];
const COACH_COOLDOWN = 45;
const URGENT_COOLDOWN = 10;
const LOW_HEALTH = 0.5;

type Plan = { want: string[]; advice: string; at: number };
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

const csvField = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);

async function infraFeedback(run: string, time: string, note: string) {
  const text = note.trim();
  if (text === "") return;
  await appendFile(FEEDBACK_FILE, `${[today(), run, time, text.replace(/\s+/g, " ")].map(csvField).join(",")}\n`);
}

/** Runs the coach CLI once and returns the JSON object in its reply, or undefined. */
async function askCoach(prompt: string): Promise<Record<string, unknown> | undefined> {
  if (COACH === "none") return undefined;
  const proc = Bun.spawn(["grok", "-p", prompt, "-m", COACH_MODEL, "--output-format", "plain"], { cwd: os.tmpdir(), stdout: "pipe", stderr: "ignore" });
  const timer = setTimeout(() => proc.kill(), 240_000);
  try {
    const text = await new Response(proc.stdout).text();
    const json = text.match(/\{[\s\S]*\}/)?.[0];
    return json === undefined ? undefined : (JSON.parse(json) as Record<string, unknown>);
  } catch (e) {
    console.error("coach failed:", e instanceof Error ? e.message : e);
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

  constructor(r: RunView, strategy: string) {
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
    };
  }

  async write() {
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
  const rows: { time: number; line: string }[] = [];
  for await (const name of glob.scan(NOTES_DIR)) {
    if (!name.startsWith("2")) continue;
    const text = await Bun.file(path.join(NOTES_DIR, name)).text();
    if (!text.includes(`| Mode | ${MODE} ${DIFFICULTY} |`)) continue;
    const survived = text.match(/Survived \*\*([\d:]+)\*\* \(([\d.]+)s\), level (\d+)/);
    if (survived === null) continue;
    const weapons = text.match(/- (?:Final weapons|Weapons at [\d:]+): (.*)\./)?.[1] ?? "unknown";
    const passives = text.match(/- Final passives: (.*)\./)?.[1] ?? "unknown";
    rows.push({ time: Number(survived[2]), line: `${name.slice(0, 16)}: survived ${survived[1]}, level ${survived[3]}; weapons ${weapons}; passives ${passives}` });
  }
  rows.sort((a, b) => b.time - a.time);
  return rows.map((r) => `- ${r.line}`).join("\n") || "(no finished runs yet)";
}

/**
 * Asks the coach to review a finished run, rewrites strategy.md from its answer and files its
 * infrastructure suggestions. Returns the review paragraph.
 */
async function reviewRun(timeline: string, outcome: string, recent: string[], runId: string, endTime: string): Promise<string | undefined> {
  if (COACH === "none") return undefined;
  const prompt = [
    "You coach a bot that plays tibo.dog, and a run just ended.",
    GAME_RULES,
    `Goal: survive 20 minutes on ${DIFFICULTY} in today's ${MODE === "daily" ? "Daily (the same seed every attempt today)" : "Open World"}.`,
    "Current strategy file:",
    await readStrategy(),
    "Every finished run in this mode so far, longest first. Compare builds and timings across runs before trusting a lesson from one run:",
    await runHistory(),
    "This run's notes:",
    timeline || "(none)",
    "Outcome:",
    outcome,
    ...(recent.length === 0 ? [] : ["The last few situations the decision model saw:", recent.join("\n---\n")]),
    "Answer from these facts alone; do not browse, search or use tools.",
    'Reply with only JSON: {"review": "a short paragraph: why the run ended, what worked, what to change", "strategy": "the full updated strategy.md in Markdown. Keep it generic advice for future runs (seed-specific facts only where the Daily repeats), keep its sections, stay under 70 lines, and add one dated line to Lessons", "infra": ["concrete suggestions to improve the data or controls the bot has"]}',
  ].join("\n\n");
  const reply = await askCoach(prompt);
  if (reply === undefined) return undefined;
  if (typeof reply.strategy === "string" && reply.strategy.trimStart().startsWith("# Strategy") && reply.strategy.length < 12_000) {
    await Bun.write(STRATEGY_FILE, `${reply.strategy.trim()}\n`);
    console.log("strategy.md updated");
  }
  if (Array.isArray(reply.infra)) for (const s of reply.infra) await infraFeedback(runId, endTime, String(s));
  return typeof reply.review === "string" ? reply.review : undefined;
}

/** `--review <notes.md>`: review a finished run whose review never got written (the bot was stopped mid-review). */
async function reviewNotesFile(file: string) {
  const text = await Bun.file(file).text();
  const section = (name: string) => text.match(new RegExp(`## ${name}\\n\\n([\\s\\S]*?)(?=\\n## |$)`))?.[1]?.trim() ?? "";
  const outcome = section("Outcome");
  if (!outcome.includes("Survived")) throw new Error(`${file} has no finished outcome to review`);
  const time = outcome.match(/Survived \*\*([\d:]+)\*\*/)?.[1] ?? "";
  const review = await reviewRun(section("Timeline"), outcome, [], path.basename(file, ".md"), time);
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
    const prompt = [
      "You coach a bot that plays tibo.dog.",
      GAME_RULES,
      `Goal: survive 20 minutes on ${DIFFICULTY} in today's ${MODE === "daily" ? "Daily (the same seed every attempt today)" : "Open World"}.`,
      "Strategy file, learned from earlier runs:",
      await readStrategy(),
      "Finished runs in this mode, longest first:",
      await runHistory(),
      "Notes so far this run:",
      this.notes.timeline.join("\n") || "(none yet)",
      `You are asked now because ${why}. State now:`,
      digest(r),
      "Answer from these facts alone; do not browse, search or use tools.",
      'Reply with only JSON: {"want": [up to 8 exact weapon, passive or item names, best first. This list is binding: whenever a level-up offers any name on it, only those can be taken, so include the weapons to keep levelling as well as the passives you want], "advice": "one short sentence for the decision model about the next minute or two; it stays in force for 90 seconds, so never name a compass direction or a countdown", "note": "one or two sentences for the run notes: what is happening and what to watch", "infra": "one concrete suggestion to improve the data or controls the bot has, or an empty string"}',
    ].join("\n\n");
    const reply = await askCoach(prompt);
    if (reply === undefined) return;
    if (Array.isArray(reply.want) && typeof reply.advice === "string") plan = { want: reply.want.map(String), advice: reply.advice, at: r.time };
    const note = typeof reply.note === "string" ? reply.note : "";
    this.notes.timeline.push(`- **${clock(r.time)}** (${why}) ${note}${plan === undefined ? "" : ` Advice: ${plan.advice} Want: ${plan.want.join(", ")}.`}`);
    await this.notes.write();
    if (typeof reply.infra === "string") await infraFeedback(this.notes.id, clock(r.time), reply.infra);
    console.log(`coach ${clock(r.time)} (${why}): ${note}`);
  }

  async review(lastRun: NonNullable<Snapshot["lastRun"]>, last: RunView | undefined, recent: string[]) {
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
    const review = await reviewRun(this.notes.timeline.join("\n"), this.notes.outcome, recent, this.notes.id, clock(lastRun.time));
    if (review === undefined) return;
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

function sights(r: RunView, dir: Direction): string[] {
  const out: string[] = [];
  for (const c of r.pickups.chests) if (c.dir === dir && c.dist < 300) out.push(`a chest ${Math.round(c.dist)} away`);
  for (const p of r.pickups.nearest)
    if (p.dir === dir && p.dist < 200 && p.kind !== "gold") out.push(p.kind === "heal" ? `food that heals Tibo ${Math.round(p.dist)} away` : `a ${p.kind} pickup ${Math.round(p.dist)} away`);
  for (const p of r.pois) if (p.dir === dir && p.dist < 300 && p.chargeNeeded > 0) out.push(`a ${p.name} ${Math.round(p.dist)} away`);
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
  if (f.dead) return "Tibo would die within a second";
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
  if (inside !== undefined) return `stand still inside the ${inside.name}, charged ${inside.charge} of ${inside.chargeNeeded} seconds`;
  return "stand still";
}

// Small decision models judge one concrete option far better than they rank nine at once, so
// every direction (and standing still) is its own yes/no question. They also notice a threat in
// a description far more reliably than they weigh "good" against "bad": on 60 replayed Daily
// states, Laya picked the safest way 97% of the time when asked "does it put Tibo in danger",
// against 77% for "is it a good move" and 48% for one nine-way choice. So Tibo first keeps the
// moves the model rates about as safe as the safest, then asks which of those is useful.
// Only moves the model itself calls safe go to that second question: on 400 replayed Nightmare
// states with the sim forecast, letting any near-safest move through doubled the health lost
// per step (0.87% against 0.45%), and the cap brings it back to 0.48% while still asking in 87%.
const SAFE_MARGIN = 0.1;
const SAFE_ENOUGH = 0.5;

async function move(r: RunView) {
  const moves: Record<string, string> = {};
  for (const s of r.sectors) moves[s.dir] = `walk ${s.dir}: ${describe(r, s)}`;
  moves.stay = standing(r);
  const state = situation(r);

  const questions: Record<string, Question> = {};
  for (const [key, text] of Object.entries(moves))
    questions[key] = { type: "noul", instructions: `If Tibo does this: ${text}. Does it put Tibo in danger, from enemies, a boss, bullets or a harmful patch?` };
  const canDash = r.player.dashCharges > 0 && r.sectors.some((x) => x.enemiesNear > 0 || (x.nearestBullet ?? 999) < 40);
  if (canDash) questions.dash = { type: "noul", instructions: "Is Tibo about to be hit or surrounded, so a quick dash away would save it?" };
  const danger = await decide(state, questions);
  const risk = (k: string) => danger[k]?.noul ?? 1;
  const safest = Math.min(...Object.keys(moves).map(risk));
  const safe = Object.keys(moves).filter((k) => risk(k) <= safest + SAFE_MARGIN && (risk(k) < SAFE_ENOUGH || risk(k) === safest));

  let choice = safe.sort((x, y) => risk(x) - risk(y))[0] ?? "stay";
  if (safe.length > 1) {
    const useful: Record<string, Question> = {};
    for (const k of safe) useful[k] = { type: "noul", instructions: `If Tibo does this: ${moves[k]}. Does it bring Tibo toward something useful, like food when hurt, a chest, a shrine to stand in, or xp gems to level up?` };
    const gain = await decide(state, useful);
    choice = safe.sort((x, y) => (gain[y]?.noul ?? 0) - (gain[x]?.noul ?? 0))[0] ?? choice;
  }
  const dir = (DIRECTIONS as readonly string[]).includes(choice) ? (choice as Direction) : undefined;
  if (dir !== undefined && (danger.dash?.noul ?? 0) > 0.5) await command({ type: "dash", dir });
  return command(dir === undefined ? { type: "goto", to: { dx: 0, dy: 0 }, stay: STEP, pause: true } : { type: "move", dir, seconds: STEP, pause: true });
}

// Every level-up offer and what was taken, for the coach to see between consults.
const pickLog: string[] = [];

// Picks that did nothing (an item Tibo cannot afford, say) for the choice now open, so the model
// is told instead of picking them forever.
let deadPicks: { signature: string; names: Set<string> } = { signature: "", names: new Set() };

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
  const considered = wanted.length > 0 ? wanted : takeable;
  const criteria: Record<string, string> = {};
  for (const o of considered) {
    const notes = [
      o.type === "other" ? o.name : `${o.type}${o.level === undefined ? "" : ` level ${o.level}`}, ${o.label}`,
      o.recommended ? "the game recommends it" : "",
      inPlan(o.name) ? "part of the long-term plan" : "",
      ...o.combos.filter((c) => c.partnerHeld).map((c) => `pairs with your ${c.partner.name} into ${c.name}${c.ready ? " right away" : ""}`),
    ];
    criteria[`${o.index}: ${o.type === "other" ? o.name.split(" | ")[0] : o.name}`] = notes.filter(Boolean).join("; ");
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
  if (picked !== undefined) deadPicks.names.add(picked.name);
  pickLog.push(
    `${clock(r.time)} ${r.choice?.kind}: offered ${options.map((o) => o.name).join(", ")}; took ${picked?.name ?? index}${wanted.length > 0 ? " (from the want list)" : ""}; slots weapons ${r.loadout.weapons.length}/6, passives ${r.loadout.passives.length}/6`,
  );
  return command({ type: "choose", index });
}

async function start(): Promise<void> {
  let started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY }, 120);
  if (started.state !== "done") {
    console.log(`start failed (${started.detail ?? started.state}); reloading the game page`);
    await fetch(RELOAD).catch(() => undefined);
    await Bun.sleep(8000);
    started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY }, 120);
    if (started.state !== "done") throw new Error(`could not start a run: ${started.detail ?? started.state}`);
  }
  await command({ type: "speed", factor: SPEED });
}

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
  await command({ type: "speed", factor: SPEED });
  // Every run starts fresh, so a Daily always begins at tick 0 on its fixed seed.
  await start();
  runs = 1;

  const fillLink = async (s: Snap) => {
    if (awaitingLink === undefined || s.lastRunLink === undefined || s.lastRunLink === awaitingLink.known) return;
    awaitingLink.notes.link = s.lastRunLink;
    await awaitingLink.notes.write();
    console.log(`run link: ${s.lastRunLink}`);
    awaitingLink = undefined;
  };

  for (;;) {
    const s = await timed("state", api<Snap>("/state"));
    if (!s.connected) throw new Error("the game tab is not connected to the agent server");
    await fillLink(s);
    if (s.screen === "title" || s.screen === "over") {
      if (s.screen === "over" && s.lastRun !== undefined && runs > 0 && notes !== undefined && coach !== undefined) {
        const avg = latency.reduce((x, y) => x + y, 0) / Math.max(1, latency.length);
        console.log(`run ${runs} ended at ${s.lastRun.time}s, level ${s.lastRun.level}, ${s.lastRun.kills} kills, ${steps} steps, ${Math.round(avg)}ms per decision`);
        console.log(`  damage taken: ${Object.entries(s.lastRun.damageTaken).map(([k, v]) => `${k} ${v}`).join(", ")}`);
        log.write(`${JSON.stringify({ event: "end", model: MODEL, mode: MODE, difficulty: DIFFICULTY, notes: notes.id, ...s.lastRun, steps, coachCalls: coach.calls, avgDecisionMs: Math.round(avg) })}\n`);
        log.flush();
        // The run is over; a stop from here on must not mark it aborted, only note the missing review.
        const ended = notes;
        reviewing = ended;
        notes = undefined;
        await coach.review(s.lastRun, last, recent);
        reviewing = undefined;
        console.log(`notes: ${ended.file}`);
        awaitingLink = { notes: ended, known: s.lastRunLink };
        coach = undefined;
        if (runs >= RUNS) {
          // Starting walks through the end screens, which is where the game shows the share link.
          await start();
          await fillLink(await api<Snap>("/state"));
          return;
        }
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
      notes = new RunNotes(r, await readStrategy());
      coach = new Coach(notes);
      await notes.write();
      console.log(`run seed ${r.seed}${r.daily ? " (daily)" : ""}, notes ${notes.file}`);
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
    await coach.consult(r);
    recent.push(situation(r));
    if (recent.length > 4) recent.shift();
    if (s.screen === "choice") await choose(r);
    else await move(r);
  }
}

const reviewTarget = option("review", "");
if (reviewTarget !== "") await reviewNotesFile(reviewTarget);
else await main();
