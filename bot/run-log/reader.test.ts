import { expect, test } from "bun:test";
import { eliteCell, hurtLeaveCell, listCell, LOG_COLUMNS, targetCell } from "./cells";
import { buildOverTime, economy, passiveLevels, runStats } from "./reader";

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

test("chests opened and kills come from the game's own counts, with the time of each", () => {
  const counted = (seconds: number, time: string, bossChests: number, elitesKilled: number) => ({ seconds: String(seconds), time, event: "move", counts: `bossChests ${bossChests}; paidChests 0; elitesKilled ${elitesKilled}; bossesKilled 0; shrinesUsed 0` });
  const csv = log([counted(1, "0:01", 0, 0), counted(65, "1:05", 0, 1), counted(116, "1:56", 1, 1), counted(200, "3:20", 3, 2)]);
  expect(economy(csv)).toEndWith("chests seen 0, opened 3");
  expect(runStats(csv)).toContain("By the game's own counts: chests opened at 1:56, 3:20, 3:20; Potato Crates bought at none; elites killed at 1:05, 3:20; bosses killed at none; shrines used at none.");
  expect(runStats(csv)).toContain("chests opened 1. Chests opened in the whole game: 3.");
});

test("a game from a gym counts only what it opened itself", () => {
  const csv = log([{ seconds: "350", time: "5:50", event: "move", counts: "bossChests 4" }, { seconds: "400", time: "6:40", event: "move", counts: "bossChests 5" }]);
  expect(economy(csv)).toEndWith("opened 1");
});

test("goals left for the health they cost are listed apart, with whether the planner went back", () => {
  const goal = (seconds: number, time: string, id: string, action: string, detail: string) => ({ seconds: String(seconds), time, event: "goal", goal: id, action, detail });
  const csv = log([
    goal(90, "1:30", "P7", "start", "Charge the Spud Shrine"),
    goal(97, "1:37", "P7", "failed", hurtLeaveCell.encode(31.6, 3)),
    goal(120, "2:00", "P7", "start", "Charge the Spud Shrine"),
    goal(126, "2:06", "P7", "failed", "standing on it charged nothing for 6 seconds"),
    goal(130, "2:10", "C9", "start", "Open the chest"),
    goal(133, "2:13", "C9", "failed", hurtLeaveCell.encode(18, 3)),
  ]);
  expect(runStats(csv)).toContain("(holdAbortHurt): 2: 1:37 Charge the Spud Shrine (32 health lost), picked again at 2:00 | 2:13 Open the chest (18 health lost), not picked again within 45 s.");
});

test("a goal for a summoning spot says what followed its use, and other spots are left out", () => {
  const counts = (elitesKilled: number, bossChests: number) => `bossChests ${bossChests}; paidChests 0; elitesKilled ${elitesKilled}; bossesKilled 0; shrinesUsed 0`;
  const move = (seconds: number, time: string, elite_list: string, c: string) => ({ seconds: String(seconds), time, event: "move", elite_list, counts: c });
  const elite = (id: number, dist: number) => eliteCell.encode({ id, name: "Potato Beetle", type: "potato-beetle", hp: 900, maxHp: 900, dist, dir: "left" });
  const csv = log([
    move(20, "0:20", elite(3, 400), counts(0, 0)),
    { seconds: "27", time: "0:27", event: "goal", goal: "P5", action: "start", detail: "Charge the Beetle Nest", hp: "110", max_hp: "120", target: targetCell.encode({ kind: "eliteNest", dist: 180.4, dir: "left" }), counts: counts(0, 0) },
    { seconds: "28", time: "0:28", event: "goal", goal: "P6", action: "start", detail: "Charge the Spud Shrine", hp: "110", max_hp: "120", target: targetCell.encode({ kind: "chargeShrine", dist: 90, dir: "up" }), counts: counts(0, 0) },
    { seconds: "33", time: "0:33", event: "goal", goal: "P5", action: "done", detail: "charged and used", counts: counts(0, 0) },
    move(35, "0:35", listCell.encode([elite(3, 380), elite(9, 60)]), counts(0, 0)),
    { ...move(50, "0:50", "", counts(1, 0)), chests: "C77 12 left" },
    move(52, "0:52", "", counts(1, 1)),
    move(120, "2:00", "", counts(2, 2)),
  ]);
  expect(runStats(csv)).toContain("(the game's kinds eliteNest, bossLair, dinnerBell, botDock): 0:27 Beetle Nest (eliteNest) picked 180 away at 110/120 health, used at 0:33; elites first seen in the 20 s after: 0:35 Potato Beetle 60 left; in the 60 s after: elites killed at 0:50, bosses killed at none, chests first listed at 0:50, chests opened at 0:52.");
});
