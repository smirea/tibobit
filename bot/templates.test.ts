import { expect, test } from "bun:test";
import { checkTemplates, DEFAULT_TEMPLATES } from "./templates";
import { loadoutErrors } from "./drive";

test("a template may only use the values its slot has, and must use the required ones", () => {
  const checked = checkTemplates({ planner: { goal: "Is {{move}} good?" }, knobs: { evadeSeconds: 99 } }, DEFAULT_TEMPLATES);
  if (!("errors" in checked)) throw new Error("the templates passed");
  expect(checked.errors.map((e) => e.split(/[:;]/)[0])).toEqual(["planner.goal uses {{move}}, which it cannot", "planner.goal must use {{goal}}", "knobs.evadeSeconds must be a number from 2 to 30"]);
  // The game plays live: nothing can turn on a pause while the models think.
  const paused = checkTemplates({ knobs: { lockstep: 1 } }, DEFAULT_TEMPLATES);
  expect("errors" in paused && paused.errors[0]?.split(";")[0]).toBe("knobs.lockstep is not a knob");
});

test("a loadout question has no length limit", () => {
  expect(loadoutErrors("Which option makes Tibo strongest at this {{choice}}? ".repeat(30))).toEqual([]);
});
