import { expect, test } from "bun:test";
import { EXAMPLE_MACHINE, machineErrors } from "./machine";

const KINDS = new Set(["chargeShrine", "vendor"]);
const machine = (states: Record<string, unknown>, initial = "a") => ({ id: "m", initial, states });
const still = { meta: { action: { type: "still" } } };

test("the starting machine checks, against the game's kinds of spot too", () => {
  expect(machineErrors(EXAMPLE_MACHINE, KINDS)).toEqual([]);
});

test("XState features this machine does not run are refused by name", () => {
  expect(machineErrors(machine({ a: { ...still, always: [{ target: "a" }], after: { 1000: "a" } } }))).toEqual([
    'state a has "always", which this machine cannot use; it takes only description, meta, on',
    'state a has "after", which this machine cannot use; it takes only description, meta, on',
  ]);
});

test("transitions must lead to another state that exists", () => {
  expect(machineErrors(machine({ a: { ...still, on: { tick: [{ target: "b" }, { target: "a" }, { target: "c" }] } }, c: still }))).toEqual([
    'state a, transition 1: target must name one of the states, not "b"',
    "state a, transition 2 targets its own state",
  ]);
});

test("a state no transition leads to is refused", () => {
  expect(machineErrors(machine({ a: still, b: { ...still, on: { tick: [{ target: "a" }] } } }))).toEqual(["state b can never be reached from a"]);
});

test("a guard is checked for its syntax and for what it reads", () => {
  const guarded = (guard: string) => machineErrors(machine({ a: { ...still, on: { tick: [{ target: "b", guard }] } }, b: still }), KINDS);
  expect([guarded("health.pct < 40 && spot.vendor.dist < 300"), guarded("health.percent < 40"), guarded("spot.casino.count > 0"), guarded("health.pct <")]).toEqual([
    [],
    ['state a, transition 1: the guard "health.percent < 40" reads health.percent, which is not part of the input'],
    ['state a, transition 1: the guard "spot.casino.count > 0" reads spot.casino.count, and casino is not a kind of spot'],
    ['state a, transition 1: the expression ends early in the guard "health.pct <"'],
  ]);
});

test("an action is checked for its type and what it takes", () => {
  const acting = (action: unknown) => machineErrors(machine({ a: { meta: { action } } }), KINDS);
  expect([acting({ type: "explore", dir: "up" }), acting({ type: "explore" }), acting({ type: "spot", kind: "casino" }), acting({ type: "chest", dir: "up" }), acting({ type: "evade" })]).toEqual([
    [],
    ['state a: a explore action needs "dir", one of right, down-right, down, down-left, left, up-left, up, up-right, fewestEnemies, mostEnemies'],
    ['state a: "casino" is not a kind of spot; the kinds are chargeShrine, vendor'],
    ['state a: a chest action takes no "dir"'],
    ['state a: meta.action.type must be one of chest, food, magnet, elite, spot, explore, dash, still, not "evade"'],
  ]);
});
