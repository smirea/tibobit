import { timed } from "./server";
import { DECIDER, DECIDER_KEY, MODEL } from "./flags";

export type Question =
  | { type: "choice"; instructions: string; criteria: Record<string, string | null> }
  | { type: "noul"; instructions: string }
  | { type: "score"; instructions: string; criteria: string[] };

export type Answer = { choice?: string; probabilities?: Record<string, number>; confidence?: number; noul?: number; score?: number };

export const latency: number[] = [];

/** How old each step's snapshot was, in ms: games side by side that starve each other of CPU show it here. */
export const snapshotAges: number[] = [];

export async function decide(state: string, questions: Record<string, Question>, model = MODEL): Promise<Record<string, Answer>> {
  const started = performance.now();
  const body = JSON.stringify({ model, state, questions });
  let json: { answers?: Record<string, Answer>; error?: unknown } | undefined;
  const headers: Record<string, string> = { "content-type": "application/json", ...(DECIDER_KEY === undefined ? {} : { authorization: `Bearer ${DECIDER_KEY}` }) };
  // LM Studio occasionally never answers a request, and OpenRouter rate-limits; ask again. A lost
  // network gets two minutes to come back: five games died to a short DNS outage on 2026-11-09.
  for (let attempt = 0; json === undefined; attempt++) {
    try {
      const res = await timed("decide", fetch(DECIDER, { method: "POST", headers, body, signal: AbortSignal.timeout(60_000) }));
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      json = (await res.json()) as { answers?: Record<string, Answer>; error?: unknown };
    } catch (e) {
      const offline = /ENOTFOUND|EAI_AGAIN|ECONNREFUSED|ECONNRESET|Unable to connect/.test(String(e)) && performance.now() - started < 120_000;
      if (attempt >= 5 && !offline) throw e;
      console.log(`decision request failed (${e instanceof Error ? e.message : e}); retrying`);
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
