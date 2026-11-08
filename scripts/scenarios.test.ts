import { expect, test } from "bun:test";
import { DEFAULT_TEMPLATES } from "./gameplay";
import { checkTraining } from "./scenarios";

const context = { coach: "grok", run: "2026-11-08_10-00-00" };
const request = { question: "Does a longer evade survive the 2:00 boss?", from: "2026-11-07_22-18-14@02-00", seconds: 60, trials: 3, arms: [{ name: "base" }, { name: "long-evade", knobs: { evadeSeconds: 12 } }] };

test("a valid request becomes a pending scenario whose arms change only what they name", () => {
  const checked = checkTraining([request], DEFAULT_TEMPLATES, [request.from], context);
  if (!("value" in checked)) throw new Error(checked.errors.join("; "));
  const [s] = checked.value;
  expect(s?.id).toBe("2026-11-08_10-00-00_1");
  expect(s?.status).toBe("pending");
  expect(s?.arms).toEqual([{ name: "base" }, { name: "long-evade", knobs: { evadeSeconds: 12 } }]);
});

test("unknown checkpoints, bad knobs and over-long scenarios are turned away with reasons", () => {
  const checked = checkTraining([{ ...request, from: "nope", seconds: 300, trials: 5, arms: [{ name: "a", knobs: { evadeSeconds: 99 } }] }], DEFAULT_TEMPLATES, [request.from], context);
  expect("errors" in checked ? checked.errors : []).toEqual([
    'training[0].from must be one of the checkpoints listed, not "nope"',
    "training[0].arms[0] (a): knobs.evadeSeconds must be a number from 2 to 30",
    "training[0] plays 1500 seconds in all; the limit is 1200",
  ]);
});
