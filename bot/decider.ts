import { timed } from "./server";
import { DECIDER, DECIDER_KEY, MODEL } from "./config";

export type Question =
  | { type: "choice"; instructions: string; criteria: Record<string, string | null> }
  | { type: "noul"; instructions: string }
  | { type: "score"; instructions: string; criteria: string[] };

type Answer = { choice?: string; probabilities?: Record<string, number>; confidence?: number; noul?: number; score?: number };

export const latency: number[] = [];

/** How old each step's snapshot was, in ms: games side by side that starve each other of CPU show it here. */
export const snapshotAges: number[] = [];

// A decision asked while the game runs is worth nothing late: Tibo holds his last move until it
// lands, and the state it was asked about is gone. An answer takes about a quarter of a second,
// but over the loop's first 63 games one call in 220 took more than 3 seconds and the worst took
// 59. An answer this late is given up on, and the next step asks afresh about the game as it is then.
const LIVE_ANSWER_MS = 1200;
/** How many decisions asked while the game ran were given up on, for the run's end summary. */
export const unanswered = { count: 0 };

/**
 * Asks the decision model. `frozen` says the game is stopped on a choice, where a slow answer costs
 * no health and is waited for. Otherwise the answer is undefined when no try came back in time,
 * and the caller falls back on what it knows without the model.
 */
export async function decide(state: string, questions: Record<string, Question>, model = MODEL, frozen = false): Promise<Record<string, Answer> | undefined> {
  const started = performance.now();
  const body = JSON.stringify({ model, state, questions });
  let json: { answers?: Record<string, Answer>; error?: unknown } | undefined;
  const headers: Record<string, string> = { "content-type": "application/json", ...(DECIDER_KEY === undefined ? {} : { authorization: `Bearer ${DECIDER_KEY}` }) };
  const giveUp = () => {
    unanswered.count++;
    latency.push(performance.now() - started);
    return undefined;
  };
  // LM Studio occasionally never answers a request, and OpenRouter rate-limits; ask again. A lost
  // network gets two minutes to come back: five games died to a short DNS outage on 2026-11-09.
  for (let attempt = 0; json === undefined; attempt++) {
    try {
      const res = await timed("decide", fetch(DECIDER, { method: "POST", headers, body, signal: AbortSignal.timeout(frozen ? 60_000 : LIVE_ANSWER_MS) }));
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      json = (await res.json()) as { answers?: Record<string, Answer>; error?: unknown };
    } catch (e) {
      if (!frozen && e instanceof Error && e.name === "TimeoutError") return giveUp();
      const offline = /ENOTFOUND|EAI_AGAIN|ECONNREFUSED|ECONNRESET|Unable to connect/.test(String(e)) && performance.now() - started < 120_000;
      if (attempt >= 5 && !offline) throw e;
      console.log(`decision request failed (${e instanceof Error ? e.message : e}); retrying`);
      if (!frozen && performance.now() - started > LIVE_ANSWER_MS) return giveUp();
      await Bun.sleep(Math.min(5000, 250 * 2 ** attempt));
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
