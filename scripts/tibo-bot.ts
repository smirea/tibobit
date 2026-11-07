#!/usr/bin/env bun
// Plays tibo.dog through the agent server with a local decision model (LM Studio's
// /v1/systemone). This file only describes the game to the model and turns its answers into
// commands; every decision (where to move, what to pick) is the model's.
import os from "node:os";
import path from "node:path";
import { BRIDGE_ORIGIN as DEFAULT_ORIGIN, type CommandStatus, DIRECTIONS, type Direction, type RunView, type SectorView, type Snapshot } from "../src/agent/protocol";

const args = process.argv.slice(2);
const option = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};
const MODEL = option("model", "h2o-lightning-4b@q8_0");
const SERVER = option("server", process.env.TIBO_SERVER ?? DEFAULT_ORIGIN);
const DECIDER = option("decider", "http://localhost:1234/v1/systemone");
const STEP = Number(option("step", "0.35"));
const RUNS = Number(option("runs", "1"));
const DIFFICULTY = option("difficulty", "easy");
const MODE = option("mode", "daily");
const SPEED = Number(option("speed", "4"));
const PLANNER = option("planner", "grok");
const PLAN_EVERY = Number(option("plan-every", "300"));
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
async function decide(state: string, questions: Record<string, Question>): Promise<Record<string, Answer>> {
  const started = performance.now();
  const body = JSON.stringify({ model: MODEL, state, questions });
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

// A long-range plan from a large model, refreshed rarely and in the background. The decision
// model sees it as context: the advice line, and a mark on options the plan wants.
type Plan = { want: string[]; advice: string };
let plan: Plan | undefined;
let planAsked = Number.NEGATIVE_INFINITY;
let planning = false;
let planCalls = 0;

// Asked at fixed game times and awaited while the game is paused, so a plan always lands on the
// same tick; only the planner's own wording can differ between runs.
async function updatePlan(r: RunView) {
  if (PLANNER === "none" || planning || r.time - planAsked < PLAN_EVERY) return;
  planAsked = r.time;
  planning = true;
  planCalls++;
  const prompt = [
    "You advise a small model that plays tibo.dog, a survivors-like game: weapons auto-fire, the player only walks and picks level-up upgrades.",
    "A base weapon at max level plus its catalyst (a passive or item) evolves at the next chest; evolved weapons are much stronger.",
    `Goal: survive 20 minutes. Now: time ${Math.round(r.time)}s, level ${r.player.level}, health ${Math.round(r.player.hp)}/${Math.round(r.player.maxHp)}.`,
    `Weapons: ${r.loadout.weapons.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}.`,
    `Passives: ${r.loadout.passives.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}.`,
    `Unpaired: ${r.unpaired.map((u) => `${u.name} needs one of ${u.options.map((o) => `${o.name} (makes ${o.resultName})`).join(", ")}`).join("; ") || "none"}.`,
    "Answer from these facts alone; do not browse, search or use tools.",
    'Reply with only JSON: {"want": [up to 6 exact weapon or passive names to take when offered, best first], "advice": "one short sentence on how to play the next few minutes"}',
  ].join("\n");
  const proc = Bun.spawn(["grok", "-p", prompt, "-m", "grok-4.7-build-fast", "--output-format", "plain"], { cwd: os.tmpdir(), stdout: "pipe", stderr: "ignore" });
  await new Response(proc.stdout)
    .text()
    .then((text) => {
      const json = text.match(/\{[\s\S]*\}/)?.[0];
      const parsed = json === undefined ? undefined : (JSON.parse(json) as Partial<Plan>);
      if (parsed !== undefined && Array.isArray(parsed.want) && typeof parsed.advice === "string") {
        plan = { want: parsed.want.map(String), advice: parsed.advice };
        console.log(`plan: want ${plan.want.join(", ")}; ${plan.advice}`);
      }
    })
    .catch((e) => console.error("planner failed:", e instanceof Error ? e.message : e))
    .finally(() => {
      planning = false;
    });
}

const inPlan = (name: string) => plan?.want.some((w) => w.toLowerCase() === name.toLowerCase()) ?? false;

const plural = (n: number, one: string) => `${n} ${n === 1 ? one : one.replace(/y$/, "ie")}${n === 1 ? "" : "s"}`;

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
    ...(plan === undefined ? [] : [`Plan: ${plan.advice}`]),
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

// Threats come first: the models weigh the start of a description most.
function describe(r: RunView, s: SectorView): string {
  const boss = r.bosses.find((b) => b.dir === s.dir);
  const parts = [
    boss !== undefined && boss.dist < 250 ? `toward the ${boss.name} boss only ${Math.round(boss.dist)} away, which hurts Tibo on contact` : "",
    s.bulletsNear > 1 ? `${s.bulletsNear} enemy bullets within 60` : s.nearestBullet !== null && s.nearestBullet < 80 ? `an enemy bullet ${Math.round(s.nearestBullet)} away` : "",
    awayFromBoss(r, s.dir) ?? "",
    s.hazard !== null ? `into ${hazardWords(s.hazard)}` : "",
    s.leavesHazard ? "out of the danger Tibo stands in" : "",
    s.enemiesNear > 0 ? `${plural(s.enemiesNear, "enemy")} close` : "no enemies close",
    s.enemiesFar > s.enemiesNear ? `${s.enemiesFar - s.enemiesNear} more further out` : "",
    ...sights(r, s.dir),
  ];
  return parts.filter(Boolean).join(", ");
}

// Small decision models judge one concrete option far better than they rank nine at once, so
// every direction (and standing still) is its own yes/no question. They also notice a threat in
// a description far more reliably than they weigh "good" against "bad": on 60 replayed Daily
// states, Laya picked the safest way 97% of the time when asked "does it put Tibo in danger",
// against 77% for "is it a good move" and 48% for one nine-way choice. So Tibo first keeps the
// moves the model rates about as safe as the safest, then asks which of those is useful.
const SAFE_MARGIN = 0.1;

async function move(r: RunView) {
  const moves: Record<string, string> = {};
  for (const s of r.sectors) moves[s.dir] = `walk ${s.dir}: ${describe(r, s)}`;
  const inside = r.pois.find((p) => p.inside && p.chargeNeeded > 0);
  moves.stay = inside === undefined ? "stand still" : `stand still inside the ${inside.name}, charged ${inside.charge} of ${inside.chargeNeeded} seconds`;
  const state = situation(r);

  const questions: Record<string, Question> = {};
  for (const [key, text] of Object.entries(moves))
    questions[key] = { type: "noul", instructions: `If Tibo does this: ${text}. Does it put Tibo in danger, from enemies, a boss, bullets or a harmful patch?` };
  const canDash = r.player.dashCharges > 0 && r.sectors.some((x) => x.enemiesNear > 0 || (x.nearestBullet ?? 999) < 40);
  if (canDash) questions.dash = { type: "noul", instructions: "Is Tibo about to be hit or surrounded, so a quick dash away would save it?" };
  const danger = await decide(state, questions);
  const risk = (k: string) => danger[k]?.noul ?? 1;
  const safest = Math.min(...Object.keys(moves).map(risk));
  const safe = Object.keys(moves).filter((k) => risk(k) <= safest + SAFE_MARGIN);

  let choice = safe.sort((x, y) => risk(x) - risk(y))[0] ?? "stay";
  if (safe.length > 1) {
    const useful: Record<string, Question> = {};
    for (const k of safe) useful[k] = { type: "noul", instructions: `If Tibo does this: ${moves[k]}. Does it bring Tibo toward something useful, like food when hurt, a chest, or a shrine to stand in?` };
    const gain = await decide(state, useful);
    choice = safe.sort((x, y) => (gain[y]?.noul ?? 0) - (gain[x]?.noul ?? 0))[0] ?? choice;
  }
  const dir = (DIRECTIONS as readonly string[]).includes(choice) ? (choice as Direction) : undefined;
  if (dir !== undefined && (danger.dash?.noul ?? 0) > 0.5) await command({ type: "dash", dir });
  return command(dir === undefined ? { type: "goto", to: { dx: 0, dy: 0 }, stay: STEP, pause: true } : { type: "move", dir, seconds: STEP, pause: true });
}

async function choose(r: RunView) {
  const options = r.choice?.options ?? [];
  if (options.length === 0) throw new Error(`a ${r.choice?.kind} choice with no options`);
  const criteria: Record<string, string> = {};
  for (const o of options) {
    const notes = [
      o.type === "other" ? o.name : `${o.type}${o.level === undefined ? "" : ` level ${o.level}`}`,
      o.recommended ? "the game recommends it" : "",
      inPlan(o.name) ? "part of the long-term plan" : "",
      ...o.combos.filter((c) => c.partnerHeld).map((c) => `pairs with your ${c.partner.name} into ${c.name}${c.ready ? " right away" : ""}`),
    ];
    criteria[`${o.index}: ${o.type === "other" ? o.name.split(" | ")[0] : o.name}`] = notes.filter(Boolean).join("; ");
  }
  const { pick } = await decide(situation(r), {
    pick: { type: "choice", instructions: `Tibo levelled up. Which ${r.choice?.kind === "levelUp" ? "upgrade" : "reward"} makes Tibo strongest?`, criteria },
  });
  const index = Number((pick?.choice ?? "0").split(":")[0]);
  return command({ type: "choose", index: Number.isFinite(index) ? index : 0 });
}

async function main() {
  await Bun.write(LOG, "");
  const log = Bun.file(LOG).writer();
  if (TRACE) trace = (entry) => log.write(`${JSON.stringify(entry)}\n`);
  let runs = 0;
  let lastSeed = "";
  let lastReport = -1;
  let steps = 0;
  console.log(`model ${MODEL}, ${MODE} ${DIFFICULTY}, step ${STEP}s, speed x${SPEED}, log ${LOG}`);
  await command({ type: "speed", factor: SPEED });
  const first = await api<Snap>("/state");
  if (first.screen !== "title" && first.screen !== "over") runs = 1;
  for (;;) {
    const s = await timed("state", api<Snap>("/state"));
    if (!s.connected) throw new Error("the game tab is not connected to the agent server");
    if (s.screen === "title" || s.screen === "over") {
      if (s.screen === "over" && s.lastRun !== undefined && runs > 0) {
        const avg = latency.reduce((a, b) => a + b, 0) / Math.max(1, latency.length);
        console.log(`run ${runs} ended at ${s.lastRun.time}s, level ${s.lastRun.level}, ${s.lastRun.kills} kills, ${steps} steps, ${Math.round(avg)}ms per decision`);
        log.write(`${JSON.stringify({ event: "end", model: MODEL, mode: MODE, seed: lastSeed, ...s.lastRun, steps, planCalls, avgDecisionMs: Math.round(avg) })}\n`);
        log.flush();
        if (runs >= RUNS) return;
      }
      let started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY }, 120);
      if (started.state !== "done") {
        console.log(`start failed (${started.detail ?? started.state}); reloading the game page`);
        await fetch(RELOAD).catch(() => undefined);
        await Bun.sleep(8000);
        started = await command({ type: "start", mode: MODE, difficulty: DIFFICULTY }, 120);
        if (started.state !== "done") throw new Error(`could not start a run: ${started.detail ?? started.state}`);
      }
      await command({ type: "speed", factor: SPEED });
      runs++;
      steps = 0;
      plan = undefined;
      planAsked = Number.NEGATIVE_INFINITY;
      planCalls = 0;
      lastReport = -1;
      latency.length = 0;
      continue;
    }
    const r = s.run;
    if (r !== undefined && r.seed !== lastSeed) {
      lastSeed = r.seed;
      console.log(`run seed ${r.seed}${r.daily ? " (daily)" : ""}`);
    }
    if (r === undefined) {
      await Bun.sleep(100);
      continue;
    }
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
    await updatePlan(r);
    if (s.screen === "choice") await choose(r);
    else await move(r);
  }
}

await main();
