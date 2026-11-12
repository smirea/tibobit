import { expect, test } from "bun:test";
import { namedIn } from "./entities";

const shrine = { key: "chargeShrine", name: "Spud Shrine" };
const heal = { key: "heal", name: "heal" };

test("a name counts in quotes, as an object key or read off an object", () => {
  expect(namedIn(`p.kind === "chargeShrine"`, shrine)).toBe(true);
  expect(namedIn("const rank = {\n  chargeShrine: 2,\n};", shrine)).toBe(true);
  expect(namedIn("type Memory = { chargeShrine?: number };", shrine)).toBe(true);
  expect(namedIn("return rank.chargeShrine;", shrine)).toBe(true);
  expect(namedIn("why: `go to ${p.kind === 'Spud Shrine' ? 1 : 2}`", shrine)).toBe(true);
});

test("a bare variable, a longer word or a why does not", () => {
  expect(namedIn("const heal = pickups.find((p) => p.dist < 9);", heal)).toBe(false);
  expect(namedIn(`p.kind === "healer"`, heal)).toBe(false);
  expect(namedIn(`why: "charge the Spud Shrine"`, shrine)).toBe(false);
  expect(namedIn("// don't go to chargeShrine yet", shrine)).toBe(false);
});
