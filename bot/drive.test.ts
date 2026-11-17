import { expect, test } from 'bun:test';
import { loadoutErrors } from './drive';

test('a loadout question that embeds something the picker cannot read is refused, naming it', () => {
	expect(loadoutErrors('{{health}} {{health.pct}} at this {{choice}}')).toEqual([
		expect.stringContaining('{{health.pct}}'),
	]);
});
