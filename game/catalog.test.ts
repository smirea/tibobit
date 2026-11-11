import { expect, test } from "bun:test";
import { type Key, type Recipe, toCombo, unpaired } from "./catalog";

const combos = (
  [
    { kind: "evolution", weapon: "fry-knives", catalyst: "passive:salt-shaker", result: "thousand-fries" },
    { kind: "evolution", weapon: "tater-twirl", catalyst: "passive:salt-shaker", result: "tater-twister" },
    { kind: "evolution", weapon: "deep-fryer", catalyst: "passive:bacon-bits", result: "inferno-basket" },
    { kind: "evolution", weapon: "mash-landing", catalyst: "item:mash-splat", result: "mash-meteor" },
    { kind: "itemEvolution", item: "boom-spud", catalyst: "rotten-spud", result: "kaboom-spud" },
  ] satisfies Recipe[]
).map(toCombo);

const rows = (held: [Key, number][]) => unpaired(combos, new Map(held)).map((u) => [u.held, u.options.map((o) => o.partner.key)]);

test("held things with no held partner list every partner they could take", () => {
  expect(rows([["passive:salt-shaker", 1], ["item:mash-splat", 1], ["item:boom-spud", 1]])).toEqual([
    ["passive:salt-shaker", ["weapon:fry-knives", "weapon:tater-twirl"]],
    ["item:mash-splat", ["weapon:mash-landing"]],
    ["item:boom-spud", ["passive:rotten-spud"]],
  ]);
});

test("a held pair hides both sides, and things without recipes never show", () => {
  expect(rows([["weapon:fry-knives", 3], ["passive:salt-shaker", 1], ["passive:hash-rush", 2], ["weapon:deep-fryer", 1]])).toEqual([
    ["weapon:deep-fryer", ["passive:bacon-bits"]],
  ]);
});

test("a result already held drops its recipe", () => {
  expect(rows([["weapon:deep-fryer", 8], ["weapon:inferno-basket", 1]])).toEqual([]);
});
