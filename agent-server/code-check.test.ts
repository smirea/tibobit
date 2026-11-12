import { expect, test } from "bun:test";
import { EXAMPLE_CODE } from "../protocol/drive";
import { codeErrors, codeIn } from "./code-check";

const drive = (body: string) => `function drive(state: State): Action {\n${body}\n}`;

test("the starting function type-checks", async () => {
  expect(await codeErrors(EXAMPLE_CODE)).toEqual([]);
});

test("a path that returns nothing is refused, by its line", async () => {
  expect(await codeErrors(drive('  if (state.tibo.hp < 40) return { type: "still" };'))).toEqual(["line 1, column 31: Function lacks ending return statement and return type does not include 'undefined'. (TS2366)"]);
});

test("a field the state lacks and an action the autopilot lacks are refused", async () => {
  const errors = await codeErrors(drive('  if (state.tibo.health < 40) return { type: "flee" };\n  return { type: "still" };'));
  expect(errors.map((e) => e.replace(/: .*\(/, " (")).sort()).toEqual(["line 2, column 18 (TS2339)", "line 2, column 40 (TS2322)"]);
});

test("the function cannot reach outside the state", async () => {
  expect(await codeErrors(drive('  fetch("https://example.com");\n  return { type: "still" };'))).toEqual(["line 2, column 3: Cannot find name 'fetch'. (TS2304)"]);
  expect(await codeErrors(drive('  while (true) {}\n  return { type: "still", why: "wait for it" };'))).toEqual(["`while` cannot be used: write plain branching over the state, with array methods such as find, filter and some instead of loops"]);
});

test("a reply's fence and export are dropped", () => {
  expect(codeIn('Here it is:\n```ts\nexport function drive(state: State): Action {\n  return { type: "still" };\n}\n```\n')).toBe('function drive(state: State): Action {\n  return { type: "still" };\n}');
});

test("memory is anything unless the code declares its shape, and then it is checked", async () => {
  const keeps = 'function drive(state: State, memory: Memory): Action {\n  memory.seen = state.time;\n  return { type: "still" };\n}';
  expect(await codeErrors(keeps)).toEqual([]);
  expect(await codeErrors(`type Memory = { seen?: string };\n\n${keeps}`)).toEqual(["line 4, column 3: Type 'number' is not assignable to type 'string'. (TS2322)"]);
  expect(await codeErrors(`type Memory = { seen?: number };\n\n${keeps}`)).toEqual([]);
});
