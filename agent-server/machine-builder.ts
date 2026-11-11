// Has Opus 5.5 write Full Self Driving's state machine from a person's request, through the claude
// CLI, and takes only a machine the bot can play: a reply that does not check goes back with what
// is wrong with it.
import type { SpotKind } from "../bot/machine-input";
import { type Machine, machineErrors } from "../protocol/machine";
import { checkHarness, runCoach } from "../rsi/coach/harnesses";
import { builderPrompt, retryPrompt } from "./machine-prompt";

const MODEL = "claude-opus-5-5";
const TRY_MS = 180_000;
const TRIES = 3;
export const REQUEST_LIMIT = 6000;

/** Throws at startup when the claude CLI is not installed. */
export const checkBuilder = () => void checkHarness("claude");

/** The JSON object in a reply, which a model may wrap in a fence or a sentence. */
function jsonIn(reply: string): unknown {
  const from = reply.indexOf("{");
  const to = reply.lastIndexOf("}");
  if (from < 0 || to < from) throw new Error("it holds no JSON object");
  return JSON.parse(reply.slice(from, to + 1));
}

export async function buildMachine(request: string, kinds: readonly SpotKind[] | undefined): Promise<Machine> {
  const known = kinds === undefined ? undefined : new Set(kinds.map((k) => k.kind));
  const first = builderPrompt(request, kinds);
  let prompt = first;
  let problems: string[] = [];
  for (let attempt = 1; attempt <= TRIES; attempt++) {
    const started = Date.now();
    const said = await runCoach("claude", MODEL, prompt, TRY_MS);
    if (said.timedOut) throw new Error(`${MODEL} did not answer within ${TRY_MS / 1000} seconds`);
    if (said.text.trim() === "") throw new Error(`${MODEL} gave no reply: ${(said.error || said.stderr).slice(0, 400)}`);
    let machine: unknown;
    try {
      machine = jsonIn(said.text);
      problems = machineErrors(machine, known);
    } catch (e) {
      problems = [`the reply is not the machine as JSON: ${e instanceof Error ? e.message : String(e)}`];
    }
    console.log(`machine builder: try ${attempt} took ${Math.round((Date.now() - started) / 1000)}s, ${problems.length === 0 ? "a machine the bot can play" : `refused: ${problems.join("; ")}`}`);
    if (problems.length === 0) return machine as Machine;
    prompt = retryPrompt(first, said.text, problems);
  }
  throw new Error(`${MODEL} wrote no machine the bot can play in ${TRIES} tries. The last one: ${problems.join("; ")}`);
}
