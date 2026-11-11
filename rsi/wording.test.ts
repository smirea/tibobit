import { expect, test } from "bun:test";
import { DEFAULT_TEMPLATES } from "../bot/templates";
import { wordsChanged } from "./wording";

test("games a few words apart test wording, and different knobs are never wording", () => {
  const goal = (g: string) => ({ ...DEFAULT_TEMPLATES, planner: { ...DEFAULT_TEMPLATES.planner, goal: g } });
  const base = goal("If Tibo's next goal is to {{goal}}: is that the best thing to do now?");
  expect(wordsChanged(base, goal("If Tibo's next goal is to {{goal}}: is that the best move to make now?"))).toBe(2);
  expect(wordsChanged(base, { ...base, knobs: { ...base.knobs, evadeSeconds: 12 } })).toBeUndefined();
});
