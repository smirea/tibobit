import path from "node:path";
import { stopping } from "../stop";
import { COACH_TIMEOUT_MS } from "../rules";
import { LOGS, waitOnline } from "../session";
import { jsonObject } from "./reply";
import { effort, harness, model } from "../flags";
import type { Checked } from "../../protocol/parse";
import { offlineHost, UNREACHABLE } from "../network";
import { runCoach } from "./harnesses";

/** Asks the coach until a reply passes `check`: a harness failure is tried again, a rejected reply is asked again with the reasons. */
export async function ask<T>(tag: string, prompt: string, check: (raw: Record<string, unknown>) => Checked<T>): Promise<T | undefined> {
  await Bun.write(path.join(LOGS, `${tag}.prompt.md`), prompt);
  let request = prompt;
  for (let attempt = 1; attempt <= 3 && !stopping; attempt++) {
    await waitOnline();
    const started = Date.now();
    const said = await runCoach(harness, model, request, COACH_TIMEOUT_MS, effort);
    const seconds = Math.round((Date.now() - started) / 1000);
    await Bun.write(path.join(LOGS, `${tag}.reply-${attempt}.md`), `${said.reasoning}\n\n---\n\n${said.text}\n\n---\n\n${said.error}\n${said.stderr}`);
    const raw = jsonObject(said.text);
    if (raw === undefined) {
      console.error(`${tag}: no JSON from the coach after ${seconds}s${said.timedOut ? " (timed out)" : ""}: ${(said.error || said.text || said.stderr).slice(0, 400)}`);
      // A call lost to an outage does not count; waitOnline holds the next one until the network is back.
      if (UNREACHABLE.test(said.error || said.stderr) && (await offlineHost()) !== undefined) attempt--;
      if (said.text.trim() !== "" && !said.timedOut) request = `${prompt}\n\n# Your previous reply held no JSON object\n\nReply again in full, with only the JSON object.`;
      await Bun.sleep(15_000);
      continue;
    }
    const checked = check(raw);
    if ("value" in checked) {
      console.log(`${tag}: the coach answered in ${seconds}s`);
      return checked.value;
    }
    console.error(`${tag}: reply rejected:\n- ${checked.errors.join("\n- ")}`);
    request = `${prompt}\n\n# Your previous reply was rejected\n\n- ${checked.errors.join("\n- ")}\n\nReply again in full, with only the JSON object.`;
  }
  return undefined;
}

export const NO_TOOLS = "Answer from these facts alone; you cannot read files, browse or run tools. Reply with only one JSON object with these keys:";
