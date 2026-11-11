import { expect, test } from "bun:test";
import { csvField, parseCsv } from "./csv";

test("csv fields keep their commas and quotes", () => {
  expect(parseCsv('a,b\n"x, ""y""",z\n')).toEqual([
    ["a", "b"],
    ['x, "y"', "z"],
  ]);
});

test("a field reads back as written, with its line breaks flattened to spaces", () => {
  const fields = ['he said "no", twice', "one\nline\tafter another", "plain", ""];
  expect(parseCsv(`${fields.map(csvField).join(",")}\nx,y,z,w\n`)[0]).toEqual(['he said "no", twice', "one line after another", "plain", ""]);
});
