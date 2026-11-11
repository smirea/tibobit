import { SERVER } from "./config";
import type { ChatLine } from "../protocol/pilot";
import type { Drive } from "../protocol/drive";
import type { Command } from "../protocol/commands";
import { AgentServer } from "../agent-server/client";

/** The Full Self Driving instructions, which the panel sends every step, so they can change mid-run. */
export let drive: Drive | undefined;

/** Whether the panel started this bot, which someone is watching. */
export let piloted = false;


let chatQueue = Promise.resolve();

/**
 * A line for the panel's chat, shown while the bot has the wheel. Never awaited, so the chat cannot
 * slow a step, but sent in order, so a late streamed update never overwrites a final message.
 */
export function say(line: ChatLine) {
  const body = JSON.stringify(line);
  chatQueue = chatQueue.then(() => fetch(`${SERVER}/pilot/say`, { method: "POST", headers: { "content-type": "application/json" }, body }).then(() => undefined, () => undefined));
}

// A restarting agent server is ridden out instead of losing the run.
export const server = new AgentServer(SERVER, 30);

export const timings = { state: 0, decide: 0, command: 0, steps: 0 };

export async function timed<T>(phase: "state" | "decide" | "command", work: Promise<T>): Promise<T> {
  const started = performance.now();
  try {
    return await work;
  } finally {
    timings[phase] += performance.now() - started;
  }
}

export async function command(c: Command, timeoutSeconds = 30) {
  return timed("command", server.run(c, timeoutSeconds));
}

/** Sends a command without waiting for it to finish, such as a move held until the next one. */
export async function send(c: Command) {
  return timed("command", server.send(c));
}

// The live view, plus what the bot keeps beyond it, under the game's keys: its run tallies (logs and
// results), the browser's storage (the Nightmare ladder), and the clock and level for a run that ended.
export const RAW = "run,counters,storage,runClock,over,loadout.level,loadout.shrineTotals";

/** The panel sends its instructions only to a bot it started. */
export function followPanel(sent: Drive | undefined) {
  drive = sent;
  piloted = sent !== undefined;
}

/** The game state as the planner can embed it, for the panel's list. Never awaited, like `say`. */
export function showState(time: number, blocks: Record<string, string>) {
  const body = JSON.stringify({ time, blocks });
  chatQueue = chatQueue.then(() => fetch(`${SERVER}/pilot/state`, { method: "POST", headers: { "content-type": "application/json" }, body }).then(() => undefined, () => undefined));
}
