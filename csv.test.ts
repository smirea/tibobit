import { expect, test } from "bun:test";
import { parseCsv } from "./csv";

test("csv fields keep their commas and quotes", () => {
  expect(parseCsv('a,b\n"x, ""y""",z\n')).toEqual([
    ["a", "b"],
    ['x, "y"', "z"],
  ]);
});
