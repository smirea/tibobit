// Has Opus 5.5 write Full Self Driving's function from a person's request, through the claude CLI,
// and takes only a function that type-checks: a reply that does not goes back with the compiler's errors.
import type { Book } from "../game/book";
import { checkHarness, runCoach } from "../rsi/coach/harnesses";
import { codeErrors, codeIn } from "./code-check";
import { builderPrompt, retryPrompt } from "./code-prompt";

const MODEL = "claude-opus-5-5";
const TRY_MS = 180_000;
const TRIES = 3;
export const REQUEST_LIMIT = 6000;

/** Throws at startup when the claude CLI is not installed. */
export const checkBuilder = () => void checkHarness("claude");

export async function buildCode(request: string, book: Book | undefined): Promise<string> {
  const first = builderPrompt(request, book);
  let prompt = first;
  let problems: string[] = [];
  for (let attempt = 1; attempt <= TRIES; attempt++) {
    const started = Date.now();
    const said = await runCoach("claude", MODEL, prompt, TRY_MS);
    if (said.timedOut) throw new Error(`${MODEL} did not answer within ${TRY_MS / 1000} seconds`);
    if (said.text.trim() === "") throw new Error(`${MODEL} gave no reply: ${(said.error || said.stderr).slice(0, 400)}`);
    const code = codeIn(said.text);
    problems = await codeErrors(code);
    console.log(`code builder: try ${attempt} took ${Math.round((Date.now() - started) / 1000)}s, ${problems.length === 0 ? "a function that type-checks" : `refused: ${problems.join("; ")}`}`);
    if (problems.length === 0) return code;
    prompt = retryPrompt(first, said.text, problems);
  }
  throw new Error(`${MODEL} wrote no function that type-checks in ${TRIES} tries. The last one: ${problems.join("; ")}`);
}
