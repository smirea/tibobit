#!/usr/bin/env bun
// Runs the learning loop unattended: its own agent server and headless game on free ports, then the
// bot playing Open World on the hardest difficulty the game allows, run after run, with the coach
// planning and reviewing each one and committing gameplay/ after every review. The headless profile
// lives in .runs/headless-profile, so the game's own unlocks, such as higher Nightmare levels,
// carry over from one session to the next.
import path from "node:path";
import { mkdirSync } from "node:fs";
import { checkHarness, defaultModel, HARNESSES } from "./coach";

const USAGE = `usage: scripts/recursive-self-improvement.ts [--model <harness>[:<model>]] [--rounds <n>] [-- <more tibo-bot.ts flags>]

  --model    the coach's harness, one of ${Object.keys(HARNESSES).join(", ")} (default grok), and
             optionally its model after a colon, such as claude:sonnet. Without one, each harness
             uses ${Object.entries(HARNESSES)
               .map(([h]) => `${h} ${defaultModel(h as keyof typeof HARNESSES) ?? "its own default"}`)
               .join(", ")}.
  --rounds   how many runs to play, each planned, reviewed and committed (default: until stopped)
  --exploit-every  every this many runs, replay the champion templates (the best run so far) unplanned
             instead of a new experiment: a real attempt at 20:00 and a replicate (default 3; 0 turns it off)

The planner and the action model are TypeSafe's Jev through OpenRouter (OPENROUTER_API_KEY in
.env.local). Ctrl-C stops the bot, the game and the server.`;

const ROOT = path.join(import.meta.dir, "..");
const DECISION_MODEL = "typesafe/jev-1.14-20261014";
// A bot that crashes this many times in a row, each within CRASH_WINDOW_MS of starting, is broken, not unlucky.
const MAX_CRASHES = 5;
const CRASH_WINDOW_MS = 300_000;

const argv = process.argv.slice(2);
if (argv.includes("--help") || argv.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
const split = argv.indexOf("--");
const own = split < 0 ? argv : argv.slice(0, split);
const extra = split < 0 ? [] : argv.slice(split + 1);
const flags: Record<string, string> = {};
for (let i = 0; i < own.length; i += 2) {
  const [name, value] = [own[i] ?? "", own[i + 1]];
  if (name !== "--model" && name !== "--rounds" && name !== "--exploit-every") throw new Error(`unexpected argument ${name}\n\n${USAGE}`);
  if (value === undefined || value.startsWith("--")) throw new Error(`${name} needs a value\n\n${USAGE}`);
  flags[name.slice(2)] = value;
}
const [harnessArg = "grok", ...modelParts] = (flags.model ?? "grok").split(":");
const harness = checkHarness(harnessArg);
const model = modelParts.length > 0 ? modelParts.join(":") : defaultModel(harness);
const rounds = flags.rounds === undefined ? Number.POSITIVE_INFINITY : Number(flags.rounds);
if (!Number.isInteger(rounds) && rounds !== Number.POSITIVE_INFINITY) throw new Error(`--rounds must be a whole number, got ${flags.rounds}`);
if (rounds < 1) throw new Error("--rounds must be at least 1");

/** A port nothing listens on right now. */
function freePort(): number {
  const probe = Bun.serve({ port: 0, hostname: "127.0.0.1", fetch: () => new Response() });
  const port = probe.port;
  probe.stop(true);
  if (port === undefined) throw new Error("could not find a free port");
  return port;
}

const serverPort = freePort();
let gamePort = freePort();
while (gamePort === serverPort) gamePort = freePort();
const server = `http://127.0.0.1:${serverPort}`;
const logs = path.join(ROOT, ".runs", `rsi-${new Date().toISOString().replace(/[:.]/g, "-")}`);
mkdirSync(logs, { recursive: true });

type Child = ReturnType<typeof Bun.spawn>;
const children: Child[] = [];
function spawn(name: string, script: string, args: string[], quiet: boolean): Child {
  const out = quiet ? Bun.file(path.join(logs, `${name}.log`)) : "inherit";
  const child = Bun.spawn([process.execPath, path.join(import.meta.dir, script), ...args], { cwd: ROOT, stdin: "ignore", stdout: out, stderr: out });
  children.push(child);
  return child;
}

let stopping = false;
async function shutdown(code: number): Promise<never> {
  stopping = true;
  // The bot first, so a review it is writing is marked interrupted while the server still answers.
  for (const child of [...children].reverse()) {
    child.kill("SIGTERM");
    await Promise.race([child.exited, Bun.sleep(5000)]);
    child.kill("SIGKILL");
  }
  process.exit(code);
}
process.on("SIGINT", () => void shutdown(130));
process.on("SIGTERM", () => void shutdown(143));

console.log(`coach ${harness} ${model ?? "(its default model)"}, ${rounds === Number.POSITIVE_INFINITY ? "until stopped" : `${rounds} ${rounds === 1 ? "run" : "runs"}`}; agent server ${server}, game screenshots at http://127.0.0.1:${gamePort}/screenshot; logs in ${logs}`);
spawn("agent-server", "agent-server.ts", ["--port", String(serverPort)], true);

// Each coach climbs its own Nightmare ladder: a browser profile holds one, and two browsers cannot share a profile.
const PROFILE = path.join(ROOT, ".runs", `headless-profile-${harness}`);
const DIST = path.join(ROOT, "dist", "tibo-helper.user.js");
let game: Child | undefined;
let gameBuild = 0;

/** (Re)starts the headless game and waits until it talks to the server. */
async function startGame() {
  if (game !== undefined) {
    game.kill("SIGTERM");
    await Promise.race([game.exited, Bun.sleep(5000)]);
    children.splice(children.indexOf(game), 1);
  }
  gameBuild = Bun.file(DIST).lastModified;
  game = spawn("headless", "headless.ts", ["--bridge", String(serverPort), "--port", String(gamePort), "--profile", PROFILE], true);
  const deadline = Date.now() + 90_000;
  for (;;) {
    const state = await fetch(`${server}/state`).then((r) => r.json() as Promise<{ connected?: boolean; ladderCleared?: number }>, () => undefined);
    if (state?.connected === true) return state;
    if (Date.now() > deadline) {
      console.error(`the headless game never connected to the agent server; see ${logs}`);
      return shutdown(1);
    }
    await Bun.sleep(500);
  }
}
const first = await startGame();
console.log(`ladder: ${first.ladderCleared ? `won up to Nightmare ${first.ladderCleared}` : "no Nightmare level won yet"}`);

const botArgs = [
  "--server", server,
  "--reload", `http://127.0.0.1:${gamePort}/reload`,
  "--decider", "openrouter",
  "--model", DECISION_MODEL,
  "--mode", "openWorld",
  "--difficulty", "highest",
  "--runs", "1",
  "--exploit-every", flags["exploit-every"] ?? "3",
  "--coach", harness,
  ...(model === undefined ? [] : ["--coach-model", model]),
  ...extra,
];
// One bot process per round, so a fix to the bot lands on the next round; a new userscript build
// restarts the game the same way.
let crashes = 0;
for (let round = 1; round <= rounds; ) {
  if (Bun.file(DIST).lastModified !== gameBuild) {
    console.log("the userscript was rebuilt; restarting the game");
    await startGame();
  }
  const started = Date.now();
  console.log(`round ${round}${rounds === Number.POSITIVE_INFINITY ? "" : ` of ${rounds}`}`);
  const bot = spawn("tibo-bot", "tibo-bot.ts", botArgs, false);
  const code = await bot.exited;
  children.splice(children.indexOf(bot), 1);
  if (stopping) break;
  if (code === 0) {
    round++;
    crashes = 0;
    continue;
  }
  crashes = Date.now() - started < CRASH_WINDOW_MS ? crashes + 1 : 1;
  if (crashes >= MAX_CRASHES) {
    console.error(`the bot crashed ${crashes} times in a row, each within ${CRASH_WINDOW_MS / 60_000} minutes; stopping`);
    await shutdown(1);
  }
  console.error(`the bot exited with code ${code}; playing round ${round} again in 10 seconds`);
  await Bun.sleep(10_000);
}
await shutdown(0);
