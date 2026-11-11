import path from "node:path";
import { beginStop, stopping } from "./stop";
import { coachSpec, EVAL_SEED, SLOT_COUNT } from "./flags";
import { mkdirSync } from "node:fs";
import { type GameResult, type GameSpec, Slot } from "./training/slots";
import { UNREACHABLE, waitForHosts } from "./network";
import { ROOT, RUNS, USERSCRIPT } from "../paths";
import { ladderCleared } from "../protocol/view";
import type { Gym } from "./store/gyms";
import type { Encyclopedia } from "../protocol/snapshot";
export const LOGS = path.join(RUNS, "rsi");
mkdirSync(LOGS, { recursive: true });

const opened: Slot[] = [];

let closing: Promise<unknown> | undefined;

/** Stops the games and the servers, then exits. A stop signal and the loop's own end can both ask; the slots are closed once and every caller waits for that. */
export async function shutdown(code: number): Promise<never> {
  beginStop();
  closing ??= Promise.all(opened.map((s) => s.close()));
  await closing;
  process.exit(code);
}
process.on("SIGINT", () => void shutdown(130));
process.on("SIGTERM", () => void shutdown(143));

const open = async (name: string, profile: string) => {
  const slot = await Slot.open(name, profile, path.join(LOGS, "logs"));
  opened.push(slot);
  return slot;
};
console.log(`the coach is ${coachSpec}, ${SLOT_COUNT} training slots, evaluation seed ${EVAL_SEED}; logs in ${path.relative(ROOT, LOGS)}`);
const [first, ...rest] = await Promise.all([
  open("main", path.join(RUNS, "coach-profile")),
  ...Array.from({ length: SLOT_COUNT }, (_, i) => open(`slot${i + 1}`, path.join(RUNS, `coach-profile-slot${i + 1}`))),
]);
if (first === undefined) throw new Error("no main slot");
/** The slot that plays the full runs, with the profile that holds the coach's Nightmare ladder. */
export const main = first;
/** The training slots. */
export const slots = rest;

/** The game build each training slot runs. */
export const gameBuilds = async () => (await Promise.all(slots.map((s) => s.state()))).flatMap((s) => (s.gameBuild === undefined ? [] : [s.gameBuild]));

// A rebuilt userscript reaches the games when they restart, which happens between iterations.
let gamesBuilt = Bun.file(USERSCRIPT).lastModified;

export async function waitOnline() {
  if (await waitForHosts()) await Promise.all(opened.map((s) => s.restartGame()));
}

/** Plays a game, and once more on a reopened tab when the network lost it; other slots play on meanwhile. */
export async function playGame(slot: Slot, spec: GameSpec, gyms: Gym[], build: (gym: Gym) => Promise<Gym>): Promise<GameResult> {
  const first = await slot.play(spec, gyms, EVAL_SEED, build);
  if (stopping || first.error === undefined || !UNREACHABLE.test(first.error)) return first;
  console.error(`${spec.id}: lost to the network (${first.error.slice(0, 200)}); playing it again`);
  await waitForHosts();
  await slot.restartGame();
  return slot.play(spec, gyms, EVAL_SEED, build);
}

export async function refreshGames() {
  await waitOnline();
  if (Bun.file(USERSCRIPT).lastModified === gamesBuilt) return;
  gamesBuilt = Bun.file(USERSCRIPT).lastModified;
  console.log("the userscript was rebuilt; restarting the games");
  await Promise.all(opened.map((s) => s.restartGame()));
}

// The game sends its encyclopedia once a run has loaded its content.
async function encyclopedia(): Promise<Encyclopedia> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const book = await main.agent.encyclopedia().catch(() => undefined);
    if (book !== undefined) return book;
    await main.anyRun();
    await Bun.sleep(3000);
  }
  throw new Error("the game never sent its encyclopedia");
}

export const BOOK = await encyclopedia();

const idsOf = (section: "weapons" | "passives" | "items", keep: (x: Record<string, unknown>) => boolean = () => true) =>
  new Set((BOOK[section] as Record<string, unknown>[]).filter((x) => typeof x.id === "string" && keep(x)).map((x) => x.id as string));

export const IDS = { weapons: idsOf("weapons"), base: idsOf("weapons", (w) => w.tier === "base"), evolved: idsOf("weapons", (w) => w.tier !== "base"), passives: idsOf("passives"), items: idsOf("items") };

export const ladder = async () => ladderCleared(await main.state("storage"));

// The start command names the weapons the profile offers when asked for one it does not.
export const OFFERED = await (async () => {
  const probe = await main.agent.run({ type: "start", mode: "openWorld", difficulty: "nightmare", weapon: "no-such-weapon" });
  if (probe.offered === undefined) throw new Error(`could not read the starting weapons the game offers: ${probe.state} ${probe.detail ?? ""}`);
  return probe.offered;
})();
