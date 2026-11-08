# 2026-11-07 16-36-04: lived 03:16 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=ex6csnqxmcx0y&stats=A-5bALYGCSoB-EcBAADQCQIARP8DvGgAzf4DhCkC60cCE-ABB3pF4_flIY-njDoDFgnbARF6AAgCAAEAAAADAAAArwEAAAIKAQMIBgRS6ALEBwMIBy4-FyMHFQIEBQLnBM8BBRUFAG38EwDofxIA190PAAK9CwB76goGAQAHAgAACQYDwJEBegAKAuQLEQEDFgEBIBIAEHc60swjZJ6lDPD_-LI6OQA |
| Ending | died at 3:16, level 9, 822 kills |
| Opening | first chest listed 2:16; 0 chests opened by 2:30; first evolution none; level 9 at 3:00 |
| Testing | E19 |
| Seed | 2R6JH5 |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Coach prompts | coach-plan.md 5b6dc362; coach-retrospective.md 3ec01e62 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_16-36-04_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:16** (196s), level 9, 822 kills.
- Damage taken by source: enemy:snow-mold 19, enemy:cave-grub 18, enemy:compost-maggot 15, enemy:sand-crab 11, enemy:fry-fly 10, enemy:oil-drip 8, enemy:frost-flea 8, enemy:potato-beetle 7.
- Weapons: Rösti Disc 3/8, Frying Pan 3/8.
- Passives: Lean Lunch 2/5, Chives 1/5.
- Items: none.
- Planner asked 61 times.

## Plan

This run tests E19, the first nightmare open world sample. Planner, action and knobs stay the built-in baseline from the daily, so the only difference a watcher can credit is the mode. The question is whether that baseline pattern transfers: evade through the first minute, then gems, with nearly all damage from hazards and bosses rather than the crowd. If it transfers, the opening goals are evade while enemies_near stays at 0, gems take over after that, and the outcome damage list is topped by hazards and bosses. If open world plays differently, enemies_near sits above 0 and crowd, thorn or elite hits lead the damage list. Treat clocks and point totals as this run's own. Write down any rise of about 25 to 30 hp with no food goal as a lead.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run played E19, the first nightmare open-world sample, on seed 2R6JH5 with the daily baseline templates and knobs left as they were. The bot played that test: all 8 level-ups and every goal used those questions, and the logged top score won each time, including the 1:26 tie at 41%. The daily pattern is absent. Evade started 22 times and was still the goal at 1 hp; gems, food and chests started zero times; the damage list is eight trash enemies. Health fell from 120 to 1 and the run ended at 3:16, level 9, 822 kills. One world seed, so the failed transfer is a lead.

## Findings

- The baseline was what the models played. 8 of 8 picks match the top card score, and every goal start matches the top goal score. Confirmed for this log.
- On this seed the crowd sits inside 60 units from early on. enemies_near is 4 at 0:08, 8 at 0:13, 7 at 0:26, 9 at 1:08, 9 at 1:47, 6 at 2:00 with 99 enemies around, and 12 at 2:41. Rows at 0 are scattered (0:00, 0:05, 0:16, 0:37, 1:06, 1:18, 1:32, 1:52). Confirmed for this run. Lead for the mode.
- With no directive the planner evades through death, and gems never take a goal. In the first two minutes evade starts 13 times, explore 3 times and the Spud Freezer once. Gems peak at 42% at 1:06, one point behind explore down-right. The whole run starts gems, food and chests zero times. At 3:12, at 1 hp, evade is still ahead at 45% over a Spud Shrine at 37%. Confirmed for this run. Lead for the planner.
- Listed damage is trash contact only: snow-mold 19, cave-grub 18, compost-maggot 15, sand-crab 11, fry-fly 10, oil-drip 8, frost-flea 8, potato-beetle 7. Those sum to 96. Health fell from 120 to 1. Hazards and bosses have no line on the list. About 23 hp of the fall is unaccounted. Confirmed for the list. Lead that the crowd caused the death.
- Steps the forecast calls free still cost health. Chosen no-damage steps lose 9 hp at 1:56, 5 at 1:57, 4 at 2:32, 4 at 2:36, 4 at 2:50, 4 at 3:00 and 4 at 3:01, and many other steps lose 2. The 1:55 up-right forecast of about 3 hp lands as a loss of 7. Confirmed on these rows. Lead that the one-second forecast misses open-world crowd hits.
- Health only falls. The curve is 120 at 0:00, 111 at 0:58, 96 at 1:42, 72 at 1:57, 61 at 2:23, 29 at 2:42, 9 at 3:00 and 1 at 3:10, and max hp stays 120. There is no rise of about 25 to 30. Confirmed for this run. Lead that the daily's unexplained heal is absent on this world sample.
- The Spud Freezer started at 0:53 from 139 away and was used at 0:58. Its own line says it freezes every enemy for 7.5 seconds. enemies_near goes from 4 to 1 at 0:59 and 0 at 1:06, and hp stays 111. One use. Lead.
- amusing appears at 2:00, 157 up, at 100%, is 40 away at 2:03, and is gone by 2:33 after a 7% row at 2:32. Colorado Queen appears at 3:00 at 100% and is at 73%, 278 right, on the 3:15 end row. Neither name is on the damage list. From 2:00 to 2:33 hp goes from 72 to 53 on trash rows (snow-mold, fry-fly, sand-crab, oil-drip, compost-maggot). Lead.
- Evade goals end with the words "kept clear for 8 seconds" on rows that also show damage: 0:45 (aphid 1.3, hp 117), 1:55 (fry-fly, hp 93), 2:03 (amusing 40 away, enemies_near 9, hp 69), 3:04 (hp 3) and 3:12 (hp 1). The next goal is evade again each time. Confirmed for this log.
- The pick question upgrades a held card on 5 of 8 level-ups, and a new card wins when it scores higher (Lean Lunch 49% at 0:26, Frying Pan 57% at 0:59, Chives 56% at 2:23). Reroll and Skip are not offered. No chest opens, so Rösti Disc and Frying Pan stay at 3/8 and no recipe finishes. Lead. This agrees with the upgrade half of the daily pick belief only.

## Went well

- 0:00 to 0:45: five evade goals, hp 120 until 0:37 and 119 at the 0:45 pick, level 1 to 3, with evade scored from 42% to 64%.
- 0:53 to 0:58: the Spud Freezer is charged and used, hp 112 to 111.
- Later picks are decisive. Frying Pan 57% at 0:59, Rösti Disc 59% at 1:30, Frying Pan 62% at 1:54, Chives 56% at 2:23, Frying Pan 64% at 2:41.
- 2:00 to 2:33: amusing falls from 100% to gone while the goal stays evade, and the damage list has no amusing line.

## Went poorly

- 0:32 to 0:37: explore up walks the full 300 units, finds nothing, and hp goes 120 to 119. A Potato Crate was 86 to the right when that walk started.
- 1:06, 1:26 and 2:19: explore wins by one or two points (43% over gems 42%; a 41% tie with evade; 36% over evade 34%). The next card or plan drops it at 1:10, 1:30 and 2:23, before it reaches a new chest.
- 1:18 to 1:47: food is offered, 185 left at 1:18 and 164 down at 1:36, scoring 20% to 30% while hp is 103 to 96. Evade stays at 44% to 59%. From 1:52 the food option is gone and later rows put food hundreds of units away.
- 1:55 to 1:57: hp 93 to 72. The safest listed steps cost 7, then 9, then 5. On the 1:55 plan the Spud Freezer, 85 up-left, scores 45% against evade at 47% and is not started.
- From 2:16 a chest 66 left scores 22%. At 2:37, hp 43, two chests score 32% and 19% against evade at 60%. None is started. The 3:15 row still lists chests, and both weapons are at 3/8.
- 2:32 to 2:42: hp 61 to 29. Evade is re-picked at 47%, 60%, 50% and 64% with about 110 enemies around and enemies_near up to 12. Dashes at 2:36, 2:41 and 2:42 are on forecast-free steps that lose 4, 4 and 2 hp.

## Moments

- **0:00** Evade at 42%, enemies_near 0, Stray Dog 110 down-right. Better: right call.
- **0:26** Lean Lunch 49% over Grab Bag 35% and Thick Skin 16%, hp still 120. Better: right call under the strongest-card question.
- **0:32** Explore up 40% edges evade 39% and gems 33%. The walk finds nothing. Better: the Potato Crate 86 to the right.
- **0:53** Spud Freezer 44% over evade 40%, used at 0:58. Better: right call.
- **1:06** Explore down-right 43% over gems 42%. The 1:10 level-up drops it for evade. Better: gems, which this test was watching for.
- **1:18** Food 185 left scores 23% at hp 103, and evade wins at 44%. Better: eat while that food is close.
- **1:55** Evade 47% edges the Spud Freezer 45%, then hp falls 93 to 72 on three steps the forecast mostly calls free. Better: charge that freezer.
- **2:00** amusing appears 157 up at 100%. Evade stays at 56%. The freezer is 27 down and scores 46%. Better: charge the freezer before the boss is 40 away at 2:03.
- **2:16** The first chest, 66 left, scores 22% against evade 49%. Better: open it.
- **2:37** Hp 43, chests at 32% and 19%, evade at 60%, enemies_near 7. Better: open a chest. Evade through 3:12 leaves hp at 1.
- **3:10** Hp 1 on a scar, Colorado Queen 142 up-right. Every step but down-right is forecast as dead, and that step's hurt score is 1.88. Better: right call among the steps offered. The run is already over.

## Questions

- Does a second nightmare world run also lose 2 hp or more on steps the forecast calls free? Added as E20.
- If the planner is told to open a listed chest, and to eat under 70% health, does this mode get a chest open and stay alive past 3:16? Added as E21.
- Does the unexplained heal of about 25 to 30 hp stay absent on nightmare open world? Added as E22.
- Do amusing and Colorado Queen stay off the damage list on a second world run? Added as E23.

## Beliefs changed

- B8: status held to recheck. Confidence stays lead. The same templates evaded and never switched to gems on this world run.
- B9: evidence extended with these 8 picks. Confidence stays lead. Status stays held. No Reroll, Skip or finished recipe was available to check.
- B15 added. About game. Lead, held. Listed damage on this world run is trash contact.
- B16 added. About planner. Lead, held. With no directive, evade wins through death and gems, food and chests start zero times.
- B17 added. About game. Lead, held. Forecast-free steps still cost several hp.
- B18 added. About game. Lead, held. This world run has no unexplained heal of about 25 to 30 hp.
- B19 added. About game. Lead, held. One finished Spud Freezer, and enemies_near fell during its freeze.
- B20 added. About game. Lead, held. amusing and Colorado Queen are absent from the damage list.

## Process changes

None.

<!-- /review -->

## Picks

- **0:26** level-up: took Lean Lunch from Grab Bag, Thick Skin, Lean Lunch.
- **0:45** level-up: took Rösti Disc from Rösti Disc, Fry Lance, Butter Socks.
- **0:59** level-up: took Frying Pan from Mash Golem, Root Spikes, Frying Pan.
- **1:10** level-up: took Lean Lunch from Lean Lunch, Peel Phantom, Frying Pan.
- **1:30** level-up: took Rösti Disc from Mash Wave, Rösti Disc, Salt Line.
- **1:54** level-up: took Frying Pan from Rösti Disc, Afterburner Fries, Frying Pan.
- **2:23** level-up: took Chives from Harvest Moon, Spud Cannon, Chives.
- **2:41** level-up: took Frying Pan from Potato Rain, Frying Pan, Tater Trot.

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
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger?
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}. Which option makes Tibo strongest?
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
  "safeMargin": 0.1
}
~~~
