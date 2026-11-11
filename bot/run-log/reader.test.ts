import { expect, test } from "bun:test";
import { LOG_COLUMNS } from "./cells";
import { buildOverTime, passiveLevels } from "./reader";

const log = (rows: Record<string, string>[]) => [LOG_COLUMNS.join(","), ...rows.map((r) => LOG_COLUMNS.map((c) => r[c] ?? "").join(","))].join("\n");
const row = (seconds: number, time: string, level: number, passives: string, armor: number) => ({ seconds: String(seconds), time, level: String(level), weapons: "Seeker Sprouts 2/8", passives, stats: `maxHp 120; armor ${armor}; damageMult 1; recovery 0` });

test("a game's build is read at each minute mark it played through and at its end", () => {
  const csv = log([row(1, "0:01", 1, "", 0), row(58, "0:58", 5, "Starch Plating 1/5", 4), row(61, "1:01", 5, "Starch Plating 2/5", 8), row(130, "2:10", 9, "Starch Plating 3/5", 12)]);
  expect(buildOverTime(csv)).toEqual([
    "0:58 level 5, maxHp 120, armor 4, damageMult 1, recovery 0, Seeker Sprouts 2/8, Starch Plating 1/5",
    "1:01 level 5, maxHp 120, armor 8, damageMult 1, recovery 0, Seeker Sprouts 2/8, Starch Plating 2/5",
    "2:10 level 9, maxHp 120, armor 12, damageMult 1, recovery 0, Seeker Sprouts 2/8, Starch Plating 3/5",
  ]);
});

test("a game from a gym past 3:00 shows its end alone, and a passive it began with is marked", () => {
  const csv = log([row(350, "5:50", 18, "Butter Pat 3/5", 0), row(500, "8:20", 22, "Butter Pat 5/5; Peel Out 1/5", 0)]);
  expect(buildOverTime(csv)).toHaveLength(1);
  expect(passiveLevels(csv)).toEqual(["Butter Pat 1 at the start, 3 at the start, 5 at 8:20", "Peel Out 1 at 8:20"]);
});
