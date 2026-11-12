import { expect, test } from "bun:test";
import path from "node:path";
import { stateFields, typeDeclarations } from "./driver-types";

const source = await Bun.file(path.join(import.meta.dir, "../../protocol/driver.ts")).text();
const fields = stateFields(source);
const field = (p: string) => fields.find((f) => f.path === p);

test("a field carries its declared type and its comment", () => {
  expect(field("tibo.hurt")).toEqual({ path: "tibo.hurt", type: "number", about: "Health lost over the last 3 seconds." });
  expect(field("pickups")).toEqual({ path: "pickups", type: "Pickup[]", about: "What lies on the ground, other than xp and gold." });
});

test("a nested object's type is its block, without comments", () => {
  expect(field("enemies")?.type).toBe("{\n  onScreen: number;\n  byDirection: Record<Direction, number>;\n  fewest: Direction;\n  most: Direction;\n  bullets: Record<Direction, number>;\n}");
});

test("nested fields are listed under their parent, and the list ends with State", () => {
  expect(fields.filter((f) => f.path.startsWith("enemies")).map((f) => f.path)).toEqual(["enemies", "enemies.onScreen", "enemies.byDirection", "enemies.fewest", "enemies.most", "enemies.bullets"]);
  expect(fields.at(-1)?.path).toBe("previous");
});

test("every declared type is found with its comment, State and Action included", () => {
  const types = typeDeclarations(source);
  expect([...types.keys()]).toEqual(["Direction", "Placed", "Held", "Pickup", "Poi", "Enemy", "State", "Action"]);
  expect(types.get("Held")).toBe("/** A weapon or passive Tibo holds, by the game's id, with its level of the most it can reach. */\ntype Held = { id: string; name: string; level: number; max: number };");
  expect(types.get("Action")?.endsWith(") & { why?: string };")).toBe(true);
  expect(types.get("State")?.split("\n").at(-1)).toBe("};");
  expect(types.get("State")).toContain("  previous: { action: Action; seconds: number } | null;");
});
