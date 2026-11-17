import { expect, test } from "bun:test";
import { checkTemplates, DEFAULT_TEMPLATES } from "./templates";

const errorsOf = (raw: Parameters<typeof checkTemplates>[0]) => {
  const checked = checkTemplates(raw, DEFAULT_TEMPLATES);
  return "errors" in checked ? checked.errors : [];
};

test("a template that uses a value its slot lacks, or leaves out one it requires, is refused", () => {
  expect(errorsOf({ planner: { goal: "Is {{move}} good?" } })).toEqual([expect.stringContaining("{{move}}"), expect.stringContaining("{{goal}}")]);
});

test("a knob outside its range is refused", () => {
  expect(errorsOf({ knobs: { evadeSeconds: 99 } })).toEqual([expect.stringContaining("knobs.evadeSeconds")]);
});

// The game plays live: nothing can turn on a pause while the models think.
test("no knob pauses the game, so lockstep is refused", () => {
  expect(errorsOf({ knobs: { lockstep: 1 } })).toEqual([expect.stringContaining("knobs.lockstep")]);
});
