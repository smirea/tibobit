import { expect, test } from "bun:test";
import { checkTemplates, DEFAULT_TEMPLATES } from "./templates";

test("a template may only use the values its slot has, and must use the required ones", () => {
  const checked = checkTemplates({ planner: { goal: "Is {{move}} good?" }, knobs: { evadeSeconds: 99 } }, DEFAULT_TEMPLATES);
  if (!("errors" in checked)) throw new Error("the templates passed");
  expect(checked.errors.map((e) => e.split(":")[0])).toEqual(["planner.goal uses {{move}}, which it cannot", "planner.goal must use {{goal}}", "knobs.evadeSeconds must be a number from 2 to 30"]);
});

test("lockstep cannot be turned on", () => {
  const checked = checkTemplates({ knobs: { lockstep: 1 } }, DEFAULT_TEMPLATES);
  if (!("errors" in checked)) throw new Error("the templates passed");
  expect(checked.errors).toHaveLength(1);
  expect(checked.errors[0]).toContain("knobs.lockstep is a crutch");
});
