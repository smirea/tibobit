import { expect, test } from 'bun:test';
import { EXAMPLE_CODE } from '../protocol/drive';
import { codeErrors } from './code-check';

const drive = (body: string) => `function drive(state: State): Action {\n${body}\n}`;
// Where each error is and TypeScript's code for it; the compiler's wording is not ours.
const placed = (errors: string[]) => errors.map(e => e.replace(/: .*\(/, ' (')).sort();

test.concurrent('the example function the popup and the builder start from type-checks', async () => {
	expect(await codeErrors(EXAMPLE_CODE)).toEqual([]);
});

test.concurrent('a path that returns nothing is refused at its line in the function, not in the types before it', async () => {
	expect(placed(await codeErrors(drive('  if (state.tibo.hp < 40) return { type: "still" };')))).toEqual([
		'line 1, column 31 (TS2366)',
	]);
});

test.concurrent('a field the state lacks and an action the autopilot lacks are refused', async () => {
	expect(
		placed(
			await codeErrors(drive('  if (state.tibo.health < 40) return { type: "flee" };\n  return { type: "still" };')),
		),
	).toEqual(['line 2, column 18 (TS2339)', 'line 2, column 40 (TS2322)']);
});

test.concurrent('the function cannot reach outside the state or loop', async () => {
	expect(placed(await codeErrors(drive('  fetch("https://example.com");\n  return { type: "still" };')))).toEqual([
		'line 2, column 3 (TS2304)',
	]);
	expect(await codeErrors(drive('  while (true) {}\n  return { type: "still", why: "wait for it" };'))).toEqual([
		expect.stringContaining('`while`'),
	]);
});

test.concurrent('memory holds anything unless the code declares its shape, and then the shape is checked', async () => {
	const keeps =
		'function drive(state: State, memory: Memory): Action {\n  memory.seen = state.time;\n  return { type: "still" };\n}';
	expect(await codeErrors(keeps)).toEqual([]);
	expect(placed(await codeErrors(`type Memory = { seen?: string };\n\n${keeps}`))).toEqual([
		'line 4, column 3 (TS2322)',
	]);
	expect(await codeErrors(`type Memory = { seen?: number };\n\n${keeps}`)).toEqual([]);
});
