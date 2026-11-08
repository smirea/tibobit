# 2026-11-08 03-33-31: lived 06:42 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=ewm1jx31rg79w&stats=A9a8AQK0HRTiAgFv9QMBAL8TBACUXwfK2QUA0q4Bq8oBABedA7C-AQL7AgM3nAW63gR_NgEIekXj9wnbnLaMOihPj6flIb0IARLLAUsOBgABAAAABwAAAN4BAAACFAEGCggCCgIE3AG-A-wGhg6QCfgNAwkIQns3OQ8hJBEECATREckCygMMBRUFAG38IwDofyAAVi0WAW_1EQDX3Q8GAQAHAgEACQcDh-YKywEACgLpGREBAxICF50WAQEgEgAQjW_9JHfqzq0M-XOXS4YHAA |
| Ending | died at 6:42, level 20, 3764 kills |
| Opening | first chest listed 1:22; 1 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 10 at 3:00 |
| Seed | TIBO10 |
| Starting weapon | steam-vent (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | sonnet-medium |
| Bot code | f057b14 fix(gyms): slots move to the newest game build before rebuilding a gym, and a failed fresh start is tried again |
| Coach prompts | see the coach's log |
| Templates from | /Users/stefan/code/tibobit/.runs/rsi/sonnet-medium/L2.I10.full-run.templates.json |
| Log | /Users/stefan/code/tibobit/.runs/rsi/sonnet-medium/full-runs/2026-11-08_03-33-31_nightmare-1_world_headless.csv |

## Outcome

- Lived **6:42** (402.5s), level 20, 3764 kills.
- Damage taken 203, by source: enemy:snow-mold 34.8, enemy:cave-grub 31.8, enemy:blight-spore 22.1, boss:late-blight 17.5, enemy:compost-maggot 14.7, enemy:hay-bale 14.4, boss:the-masher 11.2, enemy:sand-crab 9.8; the killing blow: boss:late-blight.
- Damage dealt 176903, by weapon: locked-gatling 93386, alex 32871.4, hash-hawk 25898.6, steam-vent 24368.1, grok-bot 379.3.
- Kills 3764, by weapon: locked-gatling 2257, alex 708, steam-vent 458, hash-hawk 329, grok-bot 12.
- Bosses killed 3, elites killed 6, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 354, spent 0.
- Made: no evolution, union or evolved item.
- Health gained over the run, by food, regeneration and anything else: about 76 (the game does not say from what).
- Weapons: Steam Vent 3/8, Hash Hawk 1/8, Locked Gatling 7/8.
- Passives: Butter Pat 5/5, Masher Grip 4/5, Hot Sauce 1/5.
- Items: none.
- Planner asked 136 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 119/120 | 1 | 0 | 5 | 28 | enemy:sprout-mite |
| 1:00 | 116/120 | 3 | 0 | 9 | 73 | enemy:ketchup-drop, enemy:parking-gull |
| 2:00 | 114/120 | 2 | 0 | 10 | 114 | enemy:crumb-ant |
| 3:00 | 120/120 | 40 | 46 | 15 | 155 | enemy:sand-crab, enemy:snow-mold |
| 4:00 | 113/120 | 7 | 0 | 16 | 173 | enemy:cave-grub, enemy:compost-maggot |
| 5:00 | 57/120 | 57 | 0 | 18 | 191 | enemy:cave-grub, boss:the-masher |
| 6:00 | 4/120 | 82 | 30 | 20 | 208 | enemy:snow-mold, enemy:blight-spore |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00; The Masher (the-masher) at 4:00; Late Blight (late-blight) at 6:00.
- First chest listed: 1:22. First time under 25% health: 6:27.
- Goals by kind (done / gave up / dropped): explore 4/0/2; evade 43/0/1; spot 1/0/0; gems 1/0/1; chest 1/0/2.
- Dashes: 14 (5:19, 5:23, 5:27, 5:31, 5:36, 5:40, 5:44, 6:05, 6:16, 6:21, 6:25, 6:30, …).
- Model calls: 115 plans, 21 picks, 1031 moves (mean 188ms); the page walked through 3 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:11 Hash Hawk 1/8 new; 0:13 Locked Gatling 1/8 new; 1:23 Butter Pat 1/5 new; 1:38 Masher Grip 1/5 new; 5:31 Hot Sauce 1/5 new.

## Plan

Play steam-vent, lockstep 1, and the chest-first goal prompt with its boss/crowd exception at 300 units (evade or food first when a boss is close). The other knobs stay unchanged and the boss ranges stay at 0. I drop the untested hp-leaning pick prompt because the hp/dash pick died sooner in testing. The pick prompt now finishes evolutions, keeps damage passives, and takes armor and dodge items (Baked Buckler, Ghost Skin, Thick Skin) when offered. Early and mid-game have survived on every seed tried, so the aim is to reach the 17:00-18:00 bosses with the same strong build and hope the armor and dodge picks and the boss rule carry it past 20:00.

<!-- review: written by the coach after the run -->

## Summary
The full run (steam-vent, lockstep 1, chest-first goal with a 300-unit boss/crowd exception) died at 6:42, level 20, on seed TIBO10. This is far worse than the earlier 17:20 and 18:36 runs on the same base. It died to Late Blight after health collapsed from 5:00 on. No evolution was made all run, and only 1 boss chest was opened.

## What worked
- Minutes 0-4 were safe: health stayed 113-120/120 through 4:00. The planner mostly picked evade, which is consistent with the boss/crowd exception.
- Locked Gatling reached 7/8 and Butter Pat 5/5, so damage passives were taken as the pick prompt asked.
- The Spud Freezer and food goals fired near the end, but too late to matter.

## What failed
- Build never evolved. Picks were split across Steam Vent 3/8, Hash Hawk 1/8 and Locked Gatling 7/8, so nothing reached max with its catalyst. Locked Gatling needs Masher Grip 5 (it was at 4/5 at 6:08) and Steam Vent needs Root Network, which was never taken. Reroll was chosen at 3:45 and 6:08 instead of a card.
- Chests: only 1 opened (1:24). From 1:49 on, the chest goal was dropped or replaced by evade, and 'evade' was the active goal for nearly the whole run (43 done). The boss/crowd exception fired almost always, so chests, elites and gems were starved: 0 elite fights.
- Health collapse: 5:16 a 27 hp burst (cave-grub, Masher, wireworm), 5:17 -50 over one 8s evade, then 57/120 and no recovery. Max hp stayed 120 with no Gravy Heart. At 6:05-6:42 Late Blight, hay-bale, snow-mold, blight-spore and spittlebugs took the rest. Many hurt-ratings showed every direction ruled out, so evading was boxed in.
- Dashes: none taken until 5:19; 14 dashes in 5:19-6:38 did not save the run.

## Moments
- 1:24 - the only chest opened; everything after was evade.
- 5:16-5:17 - 68 to 57 hp, 27+ hp burst in a crowd; never recovered.
- 6:00 - Late Blight appears; run ends 42s later.

## Next loop
- The prior two full runs on this base lived 17:20 and 18:36, so this was largely seed variance plus an over-eager evade rule. Test the evade exception: is it too broad (a crowd of 150+ pests is always 'many enemies')? Compare plain chest-first vs the exception on nm1-min5-fresh and fresh seeds.
- Build focus: commit to one evolution line early (steam-vent plus Root Network, or Locked Gatling plus Masher Grip) and avoid Reroll/scattered weapons. Test a pick prompt that names the starting weapon's catalyst.
- Add Gravy Heart or max hp earlier; 120 max hp at 5:00 is too thin.
- Keep late gyms (nm1-min16-full, lo-full) for item tests, but spend more games on 3:00-10:00 fresh-seed survival, since this run shows the early-mid window is not safe.

<!-- /review -->

## Picks

- **0:11** level-up: took Hash Hawk from Hash Hawk, Masher Grip, Starch Bolt.
- **0:11** gained without a pick (a chest or other): Hash Hawk 1/8 new.
- **0:13** level-up: took Locked Gatling from Couch Potato, Spud Cannon, Locked Gatling.
- **0:13** gained without a pick (a chest or other): Locked Gatling 1/8 new.
- **0:29** level-up: took Steam Vent from Butter Socks, Starch Chain, Steam Vent.
- **0:29** gained without a pick (a chest or other): Steam Vent 1/8 to 2/8.
- **0:40** level-up: took Locked Gatling from Locked Gatling, Sour Cream, Fertilizer.
- **0:40** gained without a pick (a chest or other): Locked Gatling 1/8 to 2/8.
- **1:08** level-up: took Locked Gatling from Steam Vent, Locked Gatling, Sprout Satellites.
- **1:08** gained without a pick (a chest or other): Locked Gatling 2/8 to 3/8.
- **1:23** level-up: took Butter Pat from Mash Wave, Butter Pat, Frying Pan.
- **1:23** gained without a pick (a chest or other): Butter Pat 1/5 new.
- **1:24** gained without a pick (a chest or other): Locked Gatling 3/8 to 4/8.
- **1:38** level-up: took Masher Grip from Sprout Squad, Potato Magnet, Masher Grip, Reroll (1).
- **1:38** gained without a pick (a chest or other): Masher Grip 1/5 new.
- **1:50** level-up: took Butter Pat from Spud Dice, Butter Pat, Hash Hawk, Reroll (1).
- **1:50** gained without a pick (a chest or other): Butter Pat 1/5 to 2/5.
- **2:38** level-up: took Masher Grip from Reset Button, Julienne Dash, Masher Grip, Reroll (1), Skip (1).
- **2:38** gained without a pick (a chest or other): Masher Grip 1/5 to 2/5.
- **3:08** level-up: took Butter Pat from Butter Pat, Hash Rush, Hot Start, Reroll (3), Skip (1).
- **3:08** gained without a pick (a chest or other): Butter Pat 2/5 to 3/5.
- **3:09** level-up: took Butter Pat from Tater Mines, Steam Vent, Butter Pat, Reroll (3), Skip (1).
- **3:09** gained without a pick (a chest or other): Butter Pat 3/5 to 4/5.
- **3:21** level-up: took Locked Gatling from Locked Gatling, Steam Vent, Spud Sneakers, Reroll (5), Skip (1).
- **3:21** gained without a pick (a chest or other): Locked Gatling 4/8 to 5/8.
- **3:45** level-up: took Reroll (7) from Potato Rain, Peeler, Hot Streak, Reroll (7), Skip (1).
- **3:45** level-up: took Steam Vent from Steam Vent, Chives, Golden Fry, Reroll (6), Skip (1).
- **3:45** gained without a pick (a chest or other): Steam Vent 2/8 to 3/8.
- **3:55** level-up: took Masher Grip from Mash Snowball, Lean Lunch, Masher Grip, Reroll (6), Skip (1).
- **3:55** gained without a pick (a chest or other): Masher Grip 2/5 to 3/5.
- **4:40** level-up: took Locked Gatling from Locked Gatling, Spud Dice, Lean Lunch, Reroll (6), Skip (1).
- **4:40** gained without a pick (a chest or other): Locked Gatling 5/8 to 6/8.
- **5:16** level-up: took Butter Pat from Butter Pat, Clean Plate, Packed Pan, Reroll (6), Skip (1).
- **5:16** gained without a pick (a chest or other): Butter Pat 4/5 to 5/5.
- **5:31** level-up: took Hot Sauce from Hot Sauce, Potato Rain, Hash Hawk, Reroll (7), Skip (1).
- **5:31** gained without a pick (a chest or other): Hot Sauce 1/5 new.
- **6:08** level-up: took Reroll (8) from Deep Fryer, Slow Cooker, Mash Landing, Reroll (8), Skip (3).
- **6:08** level-up: took Masher Grip from Masher Grip, Whisk Vortex, Spud Lob, Reroll (7), Skip (3).
- **6:08** gained without a pick (a chest or other): Masher Grip 3/5 to 4/5.
- **6:11** level-up: took Locked Gatling from Locked Gatling, Hash Hawk, Hot Sauce, Reroll (7), Skip (3).
- **6:11** gained without a pick (a chest or other): Locked Gatling 6/8 to 7/8.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}}.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}: is that the best thing now? Rank in this order. If health is under 40%, or a boss is within 300 units, or many enemies are close, food or evading enemies come first. Otherwise: opening a chest first (free pick, and it evolves weapons), fighting an elite next (it drops a chest), then collecting nearby xp gems, then exploring for new chests. Skip anything that walks Tibo into a crowd or a boss.
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}. Which option makes Tibo strongest? Finish evolutions when a recipe is nearly ready. Keep damage passives (Butter Pat, Aged Russet, Hot Sauce) over hp or dash passives. When items are offered, prefer armor (Baked Buckler) and dodge (Ghost Skin, Thick Skin) over other items, and take healing (Gravy Heart, regeneration) over levelling extra weak weapons.
~~~

### action.state

~~~text
Tibo is a potato hero in a survivors game. Weapons fire on their own; Tibo only walks.
Goal: {{goal}}.
{{health}}
~~~

### action.hurt

~~~text
If Tibo does this: {{move}}. How badly does it hurt Tibo in the next second?
~~~

### action.useful

~~~text
If Tibo does this: {{move}}. Does it bring Tibo closer to its goal ({{goal}})?
~~~

### action.dash

~~~text
Is Tibo about to be hit or surrounded, so a quick dash away would save it?
~~~

### knobs

~~~json
{
  "exploreDistance": 300,
  "evadeSeconds": 8,
  "gemsSeconds": 12,
  "stuckSeconds": 6,
  "extraDamage": 0.02,
  "safeMargin": 0.1,
  "distrustSeconds": 0,
  "distrustBossRange": 0,
  "planEvery": 5,
  "eliteSeconds": 20,
  "lockstep": 1,
  "bossOfferRange": 0
}
~~~
