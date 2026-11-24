import { expect, test } from "bun:test";
import { csvField } from "./csv";

test("a field stays one CSV field: quoted with its quotes doubled when it holds a comma or quote, its line breaks turned to spaces", () => {
  expect(['he said "no", twice', "one\nline\tafter another", "plain", ""].map(csvField)).toEqual([
    '"he said ""no"", twice"',
    "one line after another",
    "plain",
    "",
  ]);
});
