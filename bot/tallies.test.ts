import { expect, test } from "bun:test";
import { totalsBetween, totalsLines } from "./tallies";

test("a training game's stats count only what changed in the game's own tallies", () => {
  const start = {
    run: { kills: 10, damageTakenBySource: { "enemy:aphid": 5 }, evolutions: [], killer: "", dogHelp: { damage: { greyhound: 100, terrier: 0 } } },
    counters: { crits: 3, nearMisses: 1 },
    shrineTotals: { might: 0, duration: 0.1 },
  };
  const end = {
    run: { kills: 40, damageTakenBySource: { "enemy:aphid": 12.5, "boss:amusing": 30 }, evolutions: [{ id: "peel-storm", at: 95.5 }], killer: "boss:amusing", dogHelp: { damage: { greyhound: 160, terrier: 69.2 } } },
    counters: { crits: 3, nearMisses: 4 },
    shrineTotals: { might: 0.12, duration: 0.1 },
  };
  const t = totalsBetween(end, start);
  expect(t).toEqual({
    run: { kills: 30, damageTakenBySource: { "enemy:aphid": 7.5, "boss:amusing": 30 }, evolutions: [{ id: "peel-storm", at: 95.5 }], killer: "boss:amusing", dogHelp: { damage: { greyhound: 60, terrier: 69.2 } } },
    counters: { nearMisses: 3 },
    shrineTotals: { might: 0.12 },
  });
  expect(totalsLines(t)).toEqual([
    "run.kills: 30",
    "run.damageTakenBySource: enemy:aphid 7.5, boss:amusing 30",
    'run.evolutions: [{"id":"peel-storm","at":95.5}]',
    'run.killer: "boss:amusing"',
    "run.dogHelp: damage.greyhound 60, damage.terrier 69.2",
    "counters.nearMisses: 3",
    "shrineTotals.might: 0.12",
  ]);
});
