#!/usr/bin/env bun
// The training ground: plays scenarios (gameplay/training/<id>.json, see scripts/scenarios.ts) by
// loading the same checkpoint for every trial and letting the bot play it for a fixed time with
// each arm's templates, arms interleaved so a drift in the models' service hits them alike.
import path from "node:path";
import { mkdirSync } from "node:fs";
import type { CheckpointMeta, CommandStatus, Snapshot } from "../src/agent/protocol";
import { type Scenario, type TrialResult, readScenarios, scenarioFile, scenarioSummary, templatesFor, writeScenario } from "./scenarios";

const USAGE = `usage: scripts/training.ts [--server <url> --reload <url>] [--coach <harness>] (--pending | <id>...)

  --pending   play every pending scenario in gameplay/training (only this coach's with --coach)
  <id>        play these scenarios again from the start, whatever their status
  --server, --reload   an agent server and its headless game's /reload to use; without them the
              script starts its own on free ports, with the browser profile .runs/headless-profile-training`;

const ROOT = path.join(import.meta.dir, "..");
const DECISION_MODEL = "typesafe/jev-1.14-20261014";
const args = process.argv.slice(2);
const option = (name: string) => {
  const i = args.indexOf(`--${name}`);
  if (i < 0) return undefined;
  const v = args[i + 1];
  if (v === undefined || v.startsWith("--")) throw new Error(`--${name} needs a value\n\n${USAGE}`);
  args.splice(i, 2);
  return v;
};
if (args.includes("--help") || args.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
let server = option("server");
let reload = option("reload");
const coach = option("coach");
const pending = args.includes("--pending");
const ids = args.filter((a) => a !== "--pending");
if ((server === undefined) !== (reload === undefined)) throw new Error(`pass --server and --reload together\n\n${USAGE}`);
if (pending === (ids.length > 0)) throw new Error(USAGE);

const all = await readScenarios();
const missing = ids.filter((id) => !all.some((s) => s.id === id));
if (missing.length > 0) throw new Error(`no scenario ${missing.join(", ")} in gameplay/training`);
const queue = pending ? all.filter((s) => s.status === "pending" && (coach === undefined || s.coach === coach)) : all.filter((s) => ids.includes(s.id));
if (queue.length === 0) {
  console.log("no scenarios to play");
  process.exit(0);
}

const scratch = path.join(ROOT, ".runs", "training");
mkdirSync(scratch, { recursive: true });
type Child = ReturnType<typeof Bun.spawn>;
const children: Child[] = [];
const spawn = (script: string, scriptArgs: string[], log?: string): Child => {
  const out = log === undefined ? "inherit" : Bun.file(log);
  const child = Bun.spawn([process.execPath, path.join(import.meta.dir, script), ...scriptArgs], { cwd: ROOT, stdin: "ignore", stdout: out, stderr: out });
  children.push(child);
  return child;
};
async function shutdown(code: number): Promise<never> {
  for (const child of [...children].reverse()) {
    child.kill("SIGTERM");
    await Promise.race([child.exited, Bun.sleep(5000)]);
  }
  process.exit(code);
}
process.on("SIGINT", () => void shutdown(130));
process.on("SIGTERM", () => void shutdown(143));

function freePort(): number {
  const probe = Bun.serve({ port: 0, hostname: "127.0.0.1", fetch: () => new Response() });
  const port = probe.port;
  probe.stop(true);
  if (port === undefined) throw new Error("could not find a free port");
  return port;
}

type Snap = Snapshot & { connected: boolean };
async function api<T>(route: string, body?: unknown): Promise<T> {
  const res = await fetch(`${server}${route}`, body === undefined ? undefined : { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const json = (await res.json()) as T & { error?: string };
  if (!res.ok) throw new Error(json.error ?? `${route}: ${res.status}`);
  return json;
}
async function command(c: unknown, timeoutSeconds = 120): Promise<CommandStatus> {
  const status = await api<CommandStatus>(`/command?wait=1&timeout=${timeoutSeconds}`, c);
  if (status.state !== "done") throw new Error(`${JSON.stringify(c)} ${status.state}: ${status.detail ?? ""}`);
  return status;
}

async function connected(limitMs: number): Promise<Snap> {
  const end = Date.now() + limitMs;
  for (;;) {
    const s = await api<Snap>("/state").catch(() => undefined);
    if (s?.connected === true) return s;
    if (Date.now() > end) throw new Error(`the game never connected to ${server}`);
    await Bun.sleep(500);
  }
}

if (server === undefined) {
  const serverPort = freePort();
  const gamePort = freePort();
  server = `http://127.0.0.1:${serverPort}`;
  reload = `http://127.0.0.1:${gamePort}/reload`;
  spawn("agent-server.ts", ["--port", String(serverPort)], path.join(scratch, "agent-server.log"));
  spawn("headless.ts", ["--bridge", String(serverPort), "--port", String(gamePort), "--profile", path.join(ROOT, ".runs", "headless-profile-training")], path.join(scratch, "headless.log"));
  console.log(`agent server ${server}, game screenshots at http://127.0.0.1:${gamePort}/screenshot, logs in ${scratch}`);
}
await connected(90_000);

/** A run to load checkpoints into: the one in progress, or a new one. */
async function runInProgress() {
  const s = await api<Snap>("/state");
  if (s.screen === "title" || s.screen === "over") await command({ type: "start", mode: "openWorld", difficulty: "nightmare" });
}

async function play(s: Scenario) {
  const checkpoints = await api<CheckpointMeta[]>("/checkpoints");
  const from = checkpoints.find((c) => c.name === s.from);
  if (from === undefined) throw new Error(`no checkpoint ${s.from}`);
  // The game loads its sim, and so names its build, only once a run starts.
  await runInProgress();
  const build = (await api<Snap>("/state")).gameBuild;
  if (from.build !== build) throw new Error(`checkpoint ${s.from} is from game build ${from.build}; the game runs ${build ?? "an unknown build"}`);
  let start = s.from;
  if (s.loadout !== undefined) {
    await runInProgress();
    await command({ type: "checkpoint", op: "load", name: s.from });
    await command({ type: "loadout", ...s.loadout });
    start = `${s.id}@start`;
    await command({ type: "checkpoint", op: "save", name: start });
  }
  s.results = [];
  for (let trial = 1; trial <= s.trials; trial++) {
    for (const arm of s.arms) {
      const templates = path.join(scratch, `${s.id}-${arm.name}.json`);
      const result = path.join(scratch, `${s.id}-${arm.name}-${trial}.result.json`);
      await Bun.write(templates, JSON.stringify(templatesFor(s, arm)));
      await runInProgress();
      await command({ type: "checkpoint", op: "load", name: start });
      console.log(`${s.id}: ${arm.name}, trial ${trial} of ${s.trials}`);
      const bot = spawn("tibo-bot.ts", ["--server", server as string, "--reload", reload as string, "--decider", "openrouter", "--model", DECISION_MODEL, "--mode", "openWorld", "--trial", String(s.seconds), "--templates", templates, "--result", result], path.join(scratch, `${s.id}-${arm.name}-${trial}.log`));
      const code = await bot.exited;
      children.splice(children.indexOf(bot), 1);
      if (code !== 0) throw new Error(`the bot exited with code ${code} in ${arm.name} trial ${trial}; see ${path.join(scratch, `${s.id}-${arm.name}-${trial}.log`)}`);
      s.results.push({ arm: arm.name, trial, ...((await Bun.file(result).json()) as Omit<TrialResult, "arm" | "trial">) });
      await writeScenario(s);
    }
  }
}

let failed = 0;
for (const s of queue) {
  s.status = "running";
  delete s.error;
  await writeScenario(s);
  try {
    await play(s);
    s.status = "done";
  } catch (e) {
    s.status = "failed";
    s.error = e instanceof Error ? e.message : String(e);
    failed++;
  }
  s.finished = new Date().toISOString();
  await writeScenario(s);
  console.log(`${scenarioSummary(s)}\n(${path.relative(ROOT, scenarioFile(s.id))})\n`);
}
await shutdown(failed > 0 ? 1 : 0);
