#!/usr/bin/env bun
// Plays tibo.dog through the agent server with a local decision model (LM Studio's
// /v1/systemone). This file only describes the game to the model and turns its answers into
// commands; every decision (where to move, what to pick) is the model's.
import os from "node:os";
import path from "node:path";
import { BRIDGE_ORIGIN, type CommandStatus, DIRECTIONS, type Direction, type RunView, type SectorView, type Snapshot } from "../src/agent/protocol";

const args = process.argv.slice(2);
const option = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};
const MODEL = option("model", "h2o-lightning-4b@q8_0");
const DECIDER = option("decider", "http://localhost:1234/v1/systemone");
const STEP = Number(option("step", "0.35"));
const RUNS = Number(option("runs", "1"));
const DIFFICULTY = option("difficulty", "easy");
const SPEED = Number(option("speed", "4"));
const PLANNER = option("planner", "grok");
const PLAN_EVERY = Number(option("plan-every", "300"));
const LOG = option("log", path.join(import.meta.dir, "..", ".runs", `${MODEL.replace(/[^\w.@-]/g, "_")}-${Date.now()}.jsonl`));

type Snap = Snapshot & { connected: boolean; ageMs: number };
type Choice = { type: "choice"; instructions: string; criteria: Record<string, string | null> };
type Answer = { choice: string; probabilities: Record<string, number>; confidence: number };

async function api<T>(route: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BRIDGE_ORIGIN}${route}`, body === undefined ? undefined : { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
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

const command = (c: unknown) => timed("command", api<CommandStatus & { interruptedBy?: string }>("/command?wait=1&timeout=30", c));

const latency: number[] = [];
async function decide(state: string, questions: Record<string, Choice>): Promise<Record<string, Answer>> {
  const started = performance.now();
  const res = await timed("decide", fetch(DECIDER, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ model: MODEL, state, questions }) }));
  const json = (await res.json()) as { answers?: Record<string, Answer>; error?: unknown };
  latency.push(performance.now() - started);
  if (json.answers === undefined) throw new Error(`decision model error: ${JSON.stringify(json.error ?? json).slice(0, 300)}`);
  return json.answers;
}

// A long-range plan from a large model, refreshed rarely and in the background. The decision
// model sees it as context: the advice line, and a mark on options the plan wants.
type Plan = { want: string[]; advice: string };
let plan: Plan | undefined;
let planAsked = Number.NEGATIVE_INFINITY;
let planning = false;
let planCalls = 0;

function requestPlan(r: RunView) {
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
  void new Response(proc.stdout)
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

const plural = (n: number, one: string) => `${n} ${one}${n === 1 ? "" : "s"}`;

function situation(r: RunView): string {
  const p = r.player;
  const hp = Math.round((p.hp / p.maxHp) * 100);
  const near = r.sectors.reduce((n, s) => n + s.enemiesNear, 0);
  return [
    `Tibo is a potato hero in a survivors game. Weapons fire on their own; Tibo only chooses where to walk.`,
    `Time ${Math.floor(r.time / 60)}:${String(Math.floor(r.time % 60)).padStart(2, "0")}. Health ${hp}%. Level ${p.level}. ${plural(near, "enemy")} within 60 units, ${plural(r.enemies.total, "enemy")} around.`,
    ...(r.bosses.length > 0 ? [`Boss ${r.bosses[0]?.name} is ${Math.round(r.bosses[0]?.dist ?? 0)} units away to the ${r.bosses[0]?.dir}.`] : []),
    `Weapons: ${r.loadout.weapons.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}. Passives: ${r.loadout.passives.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}.`,
    ...(plan === undefined ? [] : [`Plan: ${plan.advice}`]),
  ].join("\n");
}

function sights(r: RunView, dir: Direction): string[] {
  const out: string[] = [];
  for (const c of r.pickups.chests) if (c.dir === dir && c.dist < 300) out.push(`a chest ${Math.round(c.dist)} away`);
  for (const p of r.pickups.nearest) if (p.dir === dir && p.dist < 200 && p.kind !== "gold") out.push(`a ${p.kind} pickup ${Math.round(p.dist)} away`);
  for (const p of r.pois) if (p.dir === dir && p.dist < 300 && p.chargeNeeded > 0) out.push(`a ${p.name} ${Math.round(p.dist)} away`);
  return out.slice(0, 2);
}

function describe(r: RunView, s: SectorView): string {
  const parts = [
    s.enemiesNear > 0 ? `${plural(s.enemiesNear, "enemy")} close` : "no enemies close",
    s.enemiesFar > s.enemiesNear ? `${s.enemiesFar - s.enemiesNear} more further out` : "",
    s.nearestBoss !== null && s.nearestBoss < 200 ? `the boss ${Math.round(s.nearestBoss)} away` : "",
    s.nearestBullet !== null && s.nearestBullet < 80 ? `a bullet ${Math.round(s.nearestBullet)} away` : "",
    s.hazard !== null ? `a ${s.hazard} hazard in the way` : "",
    ...sights(r, s.dir),
  ];
  return parts.filter(Boolean).join(", ");
}

async function move(r: RunView) {
  const criteria: Record<string, string> = {};
  for (const s of r.sectors) criteria[s.dir] = `walk ${s.dir}: ${describe(r, s)}`;
  const inside = r.pois.find((p) => p.inside && p.chargeNeeded > 0);
  criteria.stay = inside === undefined ? "stand still" : `stand still inside the ${inside.name}, charged ${inside.charge} of ${inside.chargeNeeded} seconds`;
  const { move: answer } = await decide(situation(r), {
    move: { type: "choice", instructions: "Which way should Tibo walk next to stay alive and collect useful things?", criteria },
  });
  const choice = answer?.choice ?? "stay";
  const dir = (DIRECTIONS as readonly string[]).includes(choice) ? (choice as Direction) : undefined;
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
  let runs = 0;
  let lastReport = -1;
  let steps = 0;
  console.log(`model ${MODEL}, step ${STEP}s, speed x${SPEED}, log ${LOG}`);
  await command({ type: "speed", factor: SPEED });
  for (;;) {
    const s = await timed("state", api<Snap>("/state"));
    if (!s.connected) throw new Error("the game tab is not connected to the agent server");
    if (s.screen === "title" || s.screen === "over") {
      if (s.screen === "over" && s.lastRun !== undefined && runs > 0) {
        const avg = latency.reduce((a, b) => a + b, 0) / Math.max(1, latency.length);
        console.log(`run ${runs} ended at ${s.lastRun.time}s, level ${s.lastRun.level}, ${s.lastRun.kills} kills, ${steps} steps, ${Math.round(avg)}ms per decision`);
        log.write(`${JSON.stringify({ event: "end", model: MODEL, ...s.lastRun, steps, planCalls, avgDecisionMs: Math.round(avg) })}\n`);
        log.flush();
        if (runs >= RUNS) return;
      }
      const started = await command({ type: "start", difficulty: DIFFICULTY });
      if (started.state !== "done") throw new Error(`could not start a run: ${started.detail ?? started.state}`);
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
    requestPlan(r);
    if (s.screen === "choice") await choose(r);
    else await move(r);
  }
}

await main();
