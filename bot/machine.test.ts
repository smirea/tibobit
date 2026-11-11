import { expect, test } from "bun:test";
import { EXAMPLE_MACHINE, FAR, type MachineInput } from "../protocol/machine";
import { MachineRunner } from "./machine";

const none = { count: 0, dist: FAR };
const calm: MachineInput = {
  time: 10,
  stateSeconds: 0,
  health: { hp: 100, max: 100, pct: 100, lost: 0 },
  level: 1,
  gold: 0,
  dps: 0,
  dash: { charges: 1, max: 1 },
  loadout: { weapons: 1, passives: 0, evolutionsReady: 0 },
  enemies: { count: 5, most: 2, fewest: 0, bullets: 0 },
  ground: { xp: 0, gold: 0 },
  bosses: none,
  elites: none,
  chests: none,
  food: none,
  magnets: none,
  spots: none,
  spot: { chargeShrine: none },
};
const hurt = { ...calm.health, hp: 30, pct: 30 };

test("the machine stays in its state until a guard holds, then names the transition it took", () => {
  const runner = new MachineRunner(EXAMPLE_MACHINE, 0);
  expect([runner.state, runner.action]).toEqual(["farm", { type: "explore", dir: "fewestEnemies" }]);
  expect(runner.tick(calm)).toBeUndefined();
  expect(runner.tick({ ...calm, time: 12, chests: { count: 1, dist: 320 } })).toEqual({ from: "farm", target: "loot", guard: "chests.dist < 500", description: "A chest is close" });
  expect([runner.state, runner.since, runner.action]).toEqual(["loot", 12, { type: "chest" }]);
});

test("the first transition whose guard holds wins, in the order written", () => {
  const withFood = new MachineRunner(EXAMPLE_MACHINE, 0);
  withFood.tick({ ...calm, health: hurt, food: { count: 1, dist: 200 }, chests: { count: 1, dist: 100 } });
  const without = new MachineRunner(EXAMPLE_MACHINE, 0);
  without.tick({ ...calm, health: hurt, chests: { count: 1, dist: 100 } });
  expect([withFood.state, without.state]).toEqual(["eat", "escape"]);
});

test("one tick takes one transition, and the next tick takes the next", () => {
  const runner = new MachineRunner(EXAMPLE_MACHINE, 0);
  const spent = { ...calm, health: hurt, dash: { charges: 0, max: 1 } };
  const first = runner.tick({ ...spent, time: 20 })?.target;
  const second = runner.tick({ ...spent, time: 20.3 })?.target;
  const healed = runner.tick({ ...calm, time: 31 })?.target;
  expect([first, second, healed, runner.since]).toEqual(["escape", "retreat", "farm", 31]);
});
