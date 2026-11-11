import { expect, test } from "bun:test";
import { compileGuard } from "./guard";

const input = { time: 95, health: { pct: 35, hp: 42 }, food: { count: 2, dist: 180 }, dash: { charges: 0 } };
const holds = (source: string) => compileGuard(source).test(input);

test("a guard compares paths of the input", () => {
  expect([holds("health.pct < 40"), holds("health.pct >= 40"), holds("food.count == 2"), holds("dash.charges != 0")]).toEqual([true, false, true, false]);
});

test("&& binds tighter than ||, and ! and parentheses apply", () => {
  expect([holds("health.pct > 90 || food.count > 0 && time > 60"), holds("(health.pct > 90 || food.count > 0) && time > 600"), holds("!(health.pct < 40)")]).toEqual([true, false, false]);
});

test("arithmetic runs before the comparison", () => {
  expect([holds("health.hp + 8 == 50"), holds("food.dist / 2 < 100 - 5 * 2"), holds("-time < 0")]).toEqual([true, false, true]);
});

test("a guard names the paths it reads", () => {
  expect(compileGuard("health.pct < 40 && (food.count > 0 || health.pct < 10)").paths).toEqual(["health.pct", "food.count"]);
});

test("a guard that cannot be read says why", () => {
  const error = (source: string) => {
    try {
      compileGuard(source);
      return "none";
    } catch (e) {
      return (e as Error).message;
    }
  };
  expect([error("health.pct <"), error("health.pct < 40 )"), error("(time > 3"), error("time > 3 ; alert(1)"), error("  ")]).toEqual([
    "the expression ends early",
    '")" is out of place',
    "a ( is never closed",
    'cannot read "; alert(1)"',
    "the guard is empty",
  ]);
});

test("a path the input lacks stops the machine instead of reading as false", () => {
  expect(() => holds("health.percent < 40")).toThrow("the machine's input has no health.percent");
});
