import { expect, test } from "bun:test";
import { bossCell, changeCell, changesCell, dashCell, eliteCell, goalCell, hurtCell, listCell, weighedCell } from "./cells";

test("a boss, an elite and a hurt source read back as written, names with spaces and brackets included", () => {
  expect(bossCell.decode(bossCell.encode({ name: "The Amusing (Bouche)", type: "amusing", dist: 119.6, dir: "down-left", hp: 3200, maxHp: 4000 }))).toEqual({ name: "The Amusing (Bouche)", type: "amusing", dist: 120, dir: "down-left", percent: 80, maxHp: 4000 });
  expect(eliteCell.decode(eliteCell.encode({ id: 17, name: "Potato Beetle", type: "potato-beetle", hp: 899.6, maxHp: 4000, dist: 85.2, dir: "up" }))).toEqual({ uid: "17", name: "Potato Beetle", type: "potato-beetle", hp: 900, maxHp: 4000, dist: 85, dir: "up" });
  expect(hurtCell.decode(hurtCell.encode(["Hot oil", 12.5]))).toEqual(["Hot oil", 12.5]);
  expect(listCell.decode(listCell.encode(["a 1", "b 2"]))).toEqual(["a 1", "b 2"]);
  expect(listCell.decode("")).toEqual([]);
});

test("a change to what Tibo holds says whether it is a new card, a loss, a chest's jump or an evolution", () => {
  const leveled = changeCell.encode({ name: "Peeler", before: "3/8", now: "7/8" });
  const step = changeCell.encode({ name: "Peeler", before: "3/8", now: "4/8" });
  const evolved = changeCell.encode({ name: "Rind Whip", now: "1/1" });
  const item = changeCell.encode({ name: "Crit Chip", now: "x1", said: " (crits more often)" });
  const gone = changeCell.encode({ name: "Peeler" });
  expect(changesCell.decode(changesCell.encode([leveled, evolved, gone]))).toEqual([leveled, evolved, gone]);
  expect([leveled, step, evolved, item, gone].map((c) => changeCell.notable(c, 3))).toEqual([true, false, true, true, true]);
  expect([leveled, evolved, item, gone].map(changeCell.evolution)).toEqual([false, true, false, false]);
});

test("a dash detail and a goal id read back as written", () => {
  expect(dashCell.decode(dashCell.encode(0.62, true))).toEqual({ percent: 62, dashed: true });
  expect(dashCell.decode(dashCell.encode(0.2, false))).toEqual({ percent: 20, dashed: false });
  expect(dashCell.decode("the forecast was fine")).toBeUndefined();
  expect([{ kind: "chest", uid: 12 }, { kind: "poi", uid: 7 }, { kind: "food", uid: 3 }, { kind: "elite", uid: 9 }, { kind: "explore", dir: "left" }, { kind: "evade" }].map((g) => goalCell.kind(goalCell.encode(g)))).toEqual(["chest", "spot", "food", "elite", "explore", "evade"]);
});

test("what the planner weighed reads back as written, with and without a choice open", () => {
  const goals = [{ card: "Open the chest (85 up)", probability: 0.71 }, { card: "Explore left", probability: 0.4 }];
  const cards = [{ card: "Peeler", probability: 0.613 }, { card: "Root Cellar" }];
  expect(weighedCell.decode(weighedCell.encode(goals))).toEqual({ cards: [], goals: [{ card: "Open the chest (85 up)", percent: 71 }, { card: "Explore left", percent: 40 }] });
  expect(weighedCell.decode(weighedCell.encode(goals, cards)).cards).toEqual([{ card: "Peeler", percent: 61 }, { card: "Root Cellar", percent: undefined }]);
});
