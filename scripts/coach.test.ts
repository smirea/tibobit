import { expect, test } from "bun:test";
import { jsonObject } from "./coach";

test("a coach's JSON is found inside prose and a fence, even when the prose has backticks and braces", () => {
  const reply = 'I keep `{{state}}` as it is.\n```json\n{"intent": "x", "planner": {"state": "a `{{why}}` b"}}\n```\nDone.';
  expect(jsonObject(reply)).toEqual({ intent: "x", planner: { state: "a `{{why}}` b" } });
  expect(jsonObject('Plan: {"intent": "y"}')).toEqual({ intent: "y" });
  expect(jsonObject("Gathering details from the log…")).toBeUndefined();
});
