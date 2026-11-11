import { expect, test } from "bun:test";
import { nearestToGoal } from "./autopilot";

const costs = (table: Record<string, number>) => (move: string) => table[move];

test("the autopilot takes the allowed move nearest the way to the goal, and the cheaper of two as near", () => {
  expect(nearestToGoal(["up", "up-right", "down", "stay"], "right", costs({}))).toBe("up-right");
  expect(nearestToGoal(["up-right", "down-right"], "right", costs({ "up-right": 9, "down-right": 2 }))).toBe("down-right");
  expect(nearestToGoal(["left", "stay"], "right", costs({}))).toBe("stay");
  expect(nearestToGoal(["up", "stay"], "right", costs({}))).toBe("up");
});

test("holding a spot, the autopilot stands when it may; with no way to go, it takes the cheapest move", () => {
  expect(nearestToGoal(["left", "stay"], "stay", costs({ left: 0, stay: 5 }))).toBe("stay");
  expect(nearestToGoal(["left", "up"], "stay", costs({ left: 4, up: 1 }))).toBe("up");
  expect(nearestToGoal(["left", "up", "stay"], undefined, costs({ left: 4, up: 1, stay: 2 }))).toBe("up");
});
