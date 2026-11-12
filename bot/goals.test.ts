import { expect, test } from "bun:test";
import { aimAt, ending, type Pursuit } from "./goals";
import { DIRECTIONS, type Direction } from "../protocol/geometry";
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

type Way = { xp?: number; enemies?: number; damage?: number };
const field = (ways: Partial<Record<Direction, Way>>, pickups: { id: number; type: string; dist: number; dir: Direction }[] = []) =>
  ({
    time: 100,
    maxHp: 100,
    pickups,
    sectors: DIRECTIONS.map((dir) => ({ dir, enemies: ways[dir]?.enemies ?? 0, bullets: 0, xp: ways[dir]?.xp ?? 0 })),
    view: { directions: Object.fromEntries(DIRECTIONS.map((dir) => [dir, { enemies: 0, estimatedDamage: ways[dir]?.damage ?? 0 }])) },
  }) as unknown as World;
const gathering = () => ({ goal: { kind: "xp" }, since: 90 }) as unknown as Pursuit;

test("gathering xp walks the safe way with the most xp for its enemies", () => {
  withKnob(0.25);
  expect(aimAt(gathering(), field({ left: { xp: 40, enemies: 7 }, up: { xp: 20 }, down: { xp: 90, damage: 30 } }))).toMatchObject({ heading: "up" });
});

test("gathering xp keeps its way until another is clearly better, and keeps away from enemies with no xp near", () => {
  withKnob(0.25);
  const p = gathering();
  aimAt(p, field({ up: { xp: 20 } }));
  expect(aimAt(p, field({ up: { xp: 20 }, left: { xp: 24 } }))).toMatchObject({ heading: "up" });
  expect(aimAt(p, field({ up: { xp: 20 }, left: { xp: 30 } }))).toMatchObject({ heading: "left" });
  expect(aimAt(gathering(), field({ right: { enemies: 0 }, up: { enemies: 3 }, left: { enemies: 1 }, down: { enemies: 2 }, "up-left": { enemies: 4 }, "up-right": { enemies: 4 }, "down-left": { enemies: 4 }, "down-right": { enemies: 4 } }))).toMatchObject({ heading: "right" });
});

test("gathering xp takes a near magnet the safe way, and not one past danger", () => {
  withKnob(0.25);
  const magnet = { id: 9, type: "magnet", dist: 300, dir: "left" as const };
  expect(aimAt(gathering(), field({ up: { xp: 20 } }, [magnet]))).toMatchObject({ heading: "left", to: { pickup: 9 } });
  expect(aimAt(gathering(), field({ up: { xp: 20 }, left: { damage: 40 } }, [magnet]))).toMatchObject({ heading: "up" });
});
