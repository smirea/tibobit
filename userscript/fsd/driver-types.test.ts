import { expect, test } from "bun:test";
import path from "node:path";
import { stateFields } from "./driver-types";

const fields = stateFields(await Bun.file(path.join(import.meta.dir, "../../protocol/driver.ts")).text());
const field = (p: string) => fields.find((f) => f.path === p);

test("a field carries its declared type and its comment", () => {
  expect(field("tibo.hurt")).toEqual({ path: "tibo.hurt", type: "number", about: "Health lost over the last 3 seconds." });
  expect(field("pickups")).toEqual({ path: "pickups", type: "Pickup[]", about: "What lies on the ground, other than xp and gold." });
});

test("nested fields are listed under their parent, and the list ends with State", () => {
  expect(fields.filter((f) => f.path.startsWith("enemies")).map((f) => f.path)).toEqual(["enemies", "enemies.onScreen", "enemies.byDirection", "enemies.fewest", "enemies.most", "enemies.bullets"]);
  expect(fields.at(-1)?.path).toBe("previous");
});
