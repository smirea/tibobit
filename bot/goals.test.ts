import { expect, test } from "bun:test";
import { ending, type Pursuit } from "./goals";
import { setTemplates } from "./run-templates";
import { DEFAULT_TEMPLATES } from "./templates";
import type { World } from "./world";

const world = (hurtBy: Record<string, number>) => ({ time: 100, maxHp: 120, hp: 80, hurtBy }) as unknown as World;
const pursuing = (kind: "poi" | "elite") => ({ goal: { kind, uid: 7 }, since: 95, deadline: 130, best: { left: 0, time: 100 } }) as unknown as Pursuit;
const withKnob = (holdAbortHurt: number) => setTemplates({ ...DEFAULT_TEMPLATES, knobs: { ...DEFAULT_TEMPLATES.knobs, holdAbortHurt } });

test("a goal that holds Tibo in place is given up when it costs more health than the knob allows", () => {
  withKnob(0.25);
  const standing = { heading: "stay", left: 30, progress: "charging" } as const;
  expect(ending(pursuing("poi"), world({ "Fry Fly": 20, "Hot oil": 12 }), standing, undefined)).toEqual({ done: "Tibo lost 32 health in 3 seconds while this goal kept it in place", success: false });
  expect(ending(pursuing("poi"), world({ "Fry Fly": 20 }), standing, undefined)).toBeUndefined();
  expect(ending(pursuing("elite"), world({ "Fry Fly": 40 }), { progress: "in reach" }, undefined)?.success).toBe(false);
});

test("a goal still walking to its target, or the knob at 0, is not given up for health lost", () => {
  withKnob(0.25);
  expect(ending(pursuing("poi"), world({ "Fry Fly": 60 }), { heading: "left", left: 30, progress: "30 away" }, undefined)).toBeUndefined();
  withKnob(0);
  expect(ending(pursuing("poi"), world({ "Fry Fly": 60 }), { heading: "stay", left: 30, progress: "charging" }, undefined)).toBeUndefined();
});
