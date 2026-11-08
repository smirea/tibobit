# 2026-11-07 19-00-59: lived 03:45 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=1p5ax8en5vt9q&stats=A71pAMYJCvQBAKOAAQMAwwoHAB_xA_SAAQAUDQGTPQAttwjiOQAD1gHxFwDUtgGIEAA8LAHyDAKgAwEZKgIJekWctgnb4_flIUOPjDooT4-nARKXAR4NAgABAQAAAwAAALMBAAACCwEDCAYEiAHQA64GAwoJEUALGQwNJh8PBAwHsgSbAfEBjgFDLAsFFQUAehEgAKOAFQACvRIA-U0OAHpyDAYBAAcCAAAJBwP2rwKXAQAKAvwNEQEDEgID1hYBASASABBgJ5xzBe4yMQyO9mPQ3zoA |
| Ending | died at 3:45, level 10, 1222 kills |
| Opening | first chest listed 1:44; 2 chests opened by 2:30; first evolution none; level 9 at 3:00 |
| Testing | E59 |
| Seed | XEPS03 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | 9551fb4 docs(gameplay): grok reviews the 2026-11-07 18:47 run, lived 2:43, testing E57 |
| Coach prompts | coach-plan.md 99ee6853; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-00-59_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:45** (225s), level 10, 1222 kills.
- Damage taken by source: enemy:garden-slug 32, enemy:tomato-leech 21, enemy:sand-crab 18, enemy:ketchup-drop 14, enemy:oil-drip 12, enemy:bog-slime 9, enemy:fry-fly 7, boss:amusing 6; 119 in all. Health gained over the run, by food, regeneration and anything else: about 30 (the game does not say from what).
- Weapons: Tater Tot Pup 1/8, Chip Shuriken 1/8, Seed Potato 8/8, Whisk Vortex 3/8, Peeler 1/8, Seeker Sprouts 1/8.
- Passives: Fertilizer 2/5.
- Items: none.
- Planner asked 76 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 108/120 | 11 | 0 | 4 | 28 | Brambles, Spore vent |
| 1:00 | 117/120 | 21 | 30 | 7 | 73 | enemy:aphid, enemy:bog-slime |
| 2:00 | 96/120 | 22 | 0 | 9 | 115 | boss:amusing, enemy:ketchup-drop |
| 3:00 | 2/120 | 97 | 0 | 10 | 173 | enemy:garden-slug, enemy:tomato-leech |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:02.
- First chest listed: 1:44. First time under 25% health: 3:27.
- Goals by kind (done / gave up / dropped): explore 18/0/10; spot 0/0/1; gems 0/0/1; chest 3/0/2; evade 6/0/1.
- Dashes: 13 (2:02, 2:14, 2:29, 2:41, 2:47, 2:54, 3:06, 3:12, 3:17, 3:22, 3:29, 3:34, …).
- Model calls: 66 plans, 10 picks, 249 moves (mean 172ms); the page walked through 18 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:19 Chip Shuriken 1/8 new; 0:35 Seed Potato 1/8 new; 0:58 Whisk Vortex 1/8 new; 1:45 Peeler 1/8 new; 2:23 Seeker Sprouts 1/8 new; 2:59 Fertilizer 1/5 new.

## Plan

This run is for the Nightmare 1 climb. The last two grok runs died in the amusing minute chasing a chest that never opened, so nothing evolved and 20:00 stayed out of reach. We play the 17:14 champion (tater-pup, E24 dash, exploreDistance 300, champion action text) and change only the planner directive. Until a chest or food is listed, explore. If health is under 40% and food is listed, eat the food. If health is under 40% and no food is listed, evade, and do not open a chest. If a boss is within 200 units, evade, and do not open a chest or charge a spot. If a chest is listed and no boss is within 200 units, open it. Food under 70% is still eaten when those rules do not apply. If this holds, once a boss is within 200 the plans show evade winning, and a listed chest does not become the goal, so that minute loses well under the 115 hp of the 2:43 run. Inconclusive if no boss comes within 200. A zero chest-goal count counts only when a chest was listed in that window and was not taken. If no chest is listed while the boss is within 200, the skip itself is inconclusive, and we still read whether evade won. The hot-oil action lines go back to the champion text: that test never saw hot oil, and it is not this question.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested E59 on Nightmare 1 world, seed XEPS03: while a boss is within 200, evade, and do not open a chest. Amusing appeared at 2:00 at 182 and Colorado Queen at 3:02 at 67, so the boss half of the test was played. No chest was listed during either of those windows, so the skip itself was not tested and E59 is inconclusive. Evade won the appearance plans and the next couple of cycles, then explore beat it at 2:24 (amusing still 91 away) and again at 3:18 (queen still 160 away). Minute 2 lost 22 hp, against 115 on the 2:43 run, on a different seed. The death was the queen minute: minute 3 lost 97 hp, mostly garden-slug, tomato-leech and sand-crab, with Seed Potato maxed and nothing evolved, and Tibo died at 3:45.

## Findings

- E59's chest skip was not played. From amusing's appearance at 2:00 until the boss left the list before 2:49, and again from the queen at 3:02 through the death, the chests column never held a chest. The three chest goals (1:45, 1:46, 2:49) all started with no boss within 200, and all three opened. Confidence: confirmed on this log. The hypothesis does not get a result from it.
- The boss-within-200 evade line won at the appearance and then faded while the boss was still inside 200. Amusing at 2:00: keep-away 30% and the goal switched off explore (reason: a boss appeared). It won again at 2:05 (59%), 2:08 (49%), 2:13 (63%), 2:16 (31%), 2:21 (31%) and 2:23 (46%). At 2:24 explore up scored 36% against keep-away 27% with amusing 91 left. Explore then won at 2:29 (52% vs 25%, boss 137 down), 2:30 (28% vs 22%, boss 156 down), 2:35 (33% vs 26%, boss 83 down-left) and 2:41 (48% vs 33%, boss 116 up). The queen's first plan, at 3:05, was keep-away 45% (queen 125 right); it held at 3:10 (56%) and 3:13 (37%), then at 3:18 explore up-right scored 33% against keep-away 31% with the queen 160 right and health 76/120. Lead, one seed, both bosses.
- Minute 2 lost 22 hp and ended at 96/120. Amusing's outcome line is 6. The 2:43 run lost 115 in that minute while chasing a chest on YLS7TB. These are different seeds, and after 2:24 this run was exploring, so the 22 is a lead that staying off a chest in the boss's direction is cheap, which is what E59 could not score directly.
- The queen is not what killed Tibo. Outcome damage is garden-slug 32, tomato-leech 21, sand-crab 18, ketchup-drop 14, oil-drip 12, bog-slime 9, fry-fly 7, boss:amusing 6, summing to the stated 119. Colorado Queen has no outcome line. Minute 3 lost 97 and ended at 2/120. The evade from 3:21 to 3:29 lost 48 hp (73 to 25), with a tomato-leech window of 15.1 on the step from 73 to 60 at 3:21 while the queen was 33 away. Lead.
- Three chests opened and nothing evolved. Seed Potato went 2/8 to 5/8 on the 1:47 and 1:48 opens, then 5/8 to 8/8 at 2:57, with Whisk Vortex 1/8 to 3/8 on that same chest. The other four weapons stayed at 1/8. The only passive, Fertilizer, was taken at 2:59, after that chest. At 2:23, with Seed Potato already 5/8, the pick was Seeker Sprouts 42% over Fertilizer 35%. Lead that the wide build is why the 2:57 chest had no recipe to evolve.
- The under-40% food line lost to a far pickup. At 3:26 health was 32/120, food was 260 down-right, and Eat the food scored 9% against keep-away 49%, with the queen 101 down. At 3:29 food 341 scored 8% at 25 hp. Same shape as the far-food losses already on the books. Lead, and it agrees with the distance reading.
- The E24 dash rule missed the first real crowd. From 1:38 to 1:43, asks with enemies_near 5 to 9 scored 15% to 49% (44, 47, 28, 15, 49, 22, 38, 35, 16, 42) and Tibo did not dash. Health in that stretch drifted 96 to 90, so the 5 hp clause was not met. Later yeses at 53% to 84% did dash (13 dashes, first at 2:02). The enemies_near>=5 clause is not enough on its own. Lead, and it contradicts the confirmed dash belief.
- A +30 heal with no food goal hit at 1:44 (90 to 120, max stayed 120) as the gems goal ended and the first chests were listed. That is the run's whole heal (about 30). Likely, another world sample of the same jump.
- "A close Spud Freezer is also good" did not select the freezer. At 1:08 the freezer 127 up-left scored 35% and explore up-right 55%. No freezer goal started. Lead.
- After the Golden Spud Shrine finished, gems scored 62% at 1:33 and ran until 1:44, with no chest listed yet. The explore-until-a-chest line lost that call. During the gems goal enemies_near climbed to 9 and health went 96 to 90. Lead.
- Boss clock held on this seed: amusing first seen at 2:00, Colorado Queen at 3:02. Likely.
- First chest at exploreDistance 300 was 1:44, and both nearby chests were open by 1:48, at full health. Likely, same timing band as the other 300-distance seeds.
- The page walked through 18 hits (distrustSeconds 0). The killing ticks were model steps. Brambles and Spore vent are who minute 0 names (11 hp lost, ended 108/120), and Hot oil shows in hurt_by at 3:04 to 3:08 (window up to 4.7, underfoot burn), and none of the three is on the outcome list. Lead that this build's outcome still keeps eight integer sources.

## Went well

- Explore-only opening. Minute 0 ended 108/120, level 4, 11 hp lost.
- Golden Spud Shrine at 1:24, blessing taken at 1:33: Damage taken -27% at 91%, over gold and pickup range. Health was 96/120.
- Chests at 1:45 and 1:46, no boss up, scores 86% and 80%. Both open by 1:48. Seed Potato 2/8 to 5/8. Health still 120.
- Evade at the moment amusing appeared (2:00, 182 left, keep-away 30%). The 2:00 to 2:08 evade ended with no health lost. The amusing hit at 2:14 was 6 hp, then a dash up-left at 53% with the boss 33 away. Minute 2 lost 22.
- Chest at 2:49, 148 down-left, no boss on the row, score 63%. Opened at 2:57.
- Asks at 2% to 8% stayed walks. Dashes that fired were 53% and up.

## Went poorly

- 1:28 to 1:30, standing on the shrine was forecast at about -4 hp, so the action model walked off a channel that had reached 3.9 of 5 seconds. It was finished only after walking back. Standing the last second would have opened the blessing sooner.
- 1:33 to 1:44, gems into a crowd (enemies_near 9 by 1:38). Health 96 to 90. The dash question was asked and stayed under 0.5. Explore, per the directive, until a chest was listed.
- 2:23, Seeker Sprouts over Fertilizer, filling the sixth weapon slot at level 1 while Seed Potato was 5/8. The 2:57 chest then maxed Seed Potato and raised Whisk to 3/8 with no evolution.
- 2:24 to 2:41, five plans chose explore with amusing still inside 200 (91, then 137, 156, 83, 116). Keep-away was 22% to 33%. The directive said evade.
- 3:02, queen 67 up-right, and the goal stayed explore left. The next plan is 3:05, reason "5 seconds passed", not a boss appearance. Hot oil's window climbed to 4.7 on a burn tile in that stretch (94 hp to 90).
- 3:18, explore beat evade by two points (33% vs 31%) with the queen 160 away and health 76/120.
- 3:21 to 3:45, evade with no direction in a swarm. The 3:21 to 3:29 evade lost 48 hp. Minute 3 lost 97. Garden-slug 32, tomato-leech 21, sand-crab 18. Died at 3:45, level 10, 2/120, 173 enemies, 15 within 60. An evolved weapon had to already be in the slots; the least-bad step did not leave the swarm. Food at 260 was the heal on offer and scored 9%.

## Moments

- **1:24** Walked onto the Golden Spud Shrine while exploring and the planner charged it (45%, then 58%). Better: right call.
- **1:28** Stand-still on the shrine forecast -4 hp, so Tibo walked off at 3.9 of 5 seconds. Better: stand the last second and take the blessing.
- **1:33** Shrine pick was Damage taken -27% at 91%. The same call then started gems at 62%. Better: take the blessing, then explore until a chest is listed.
- **1:44** Health jumped 90 to 120 with no food goal, and two chests were listed at 46 and 55. Better: right call to open them, which happened at 1:45 (86%).
- **1:48** Second chest opened. Seed Potato at 5/8, health 120, no boss yet. Better: right call.
- **2:00** Amusing at 182 left. Explore dropped, keep-away 30%, reason "a boss appeared". Better: right call.
- **2:14** Amusing 35 away, 6 hp lost, dash up-left at 53%. Better: right call.
- **2:23** Level-up during the evade: Seeker Sprouts 42%, Fertilizer 35%, Tater Tot Pup 13%. Better: take Fertilizer, the passive on offer, over a sixth level-1 weapon.
- **2:24** Evade ended after losing 3 hp. Explore up 36% beat keep-away 27% with amusing 91 left. Better: keep evading while the boss is inside 200.
- **2:57** Chest opened. Seed Potato 5/8 to 8/8, Whisk 1/8 to 3/8, no evolution. Better: opening was right; the build had no finished recipe for that chest to evolve.
- **3:05** First plan after the queen, who had been 67 away since 3:02. Keep-away 45%. Better: that plan should have been at 3:02, with the reason that the queen appeared.
- **3:21** Tomato-leech window 15.1, health 73 to 60, queen 33 away, then the evade lost 48 hp by 3:29. Better: the recipe had to be evolved before this minute; once the swarm is on Tibo, evade-with-no-direction still bleeds out.

## Questions

- If planner.goal itself says to evade whenever a boss is within 200, does keep-away stay above explore for the whole time the boss is inside 200, instead of fading after one to three cycles? Added as E64.
- If the pick and the directive refuse a new weapon while a held weapon is past halfway and a passive is on offer, does a chest before 3:30 evolve something, and does minute 3 lose less than 97 hp? Added as E63.
- On a run that reaches the queen with no evolution, do garden-slug, tomato-leech and sand-crab again account for about 71 hp while the goal is evade? Added as E65.
- Does a harder dash line turn the enemies_near 5-to-9 asks from the 15–49% band up over 0.5, the way the 1:38 to 1:43 stretch did not? Added as E66.

## Next

- E63 (build). This run opened three chests, maxed Seed Potato, and evolved nothing, then lost 97 hp in the queen minute to contact pests. The 17:14 run was level 10 at 3:00 as well and had an evolution at 3:25. One change: the pick and the directive finish one held recipe before a sixth weapon. If a chest before 3:30 evolves a weapon, the queen minute has something to test the swarm against, which is the gap between a 3:45 death and a 20:00 attempt. Inconclusive if no recipe is ever one card away.
- E64 (models). E59 showed the state line works at the appearance and dies within about 25 seconds, and it never saw a chest while the boss was inside 200. Put the same rule in planner.goal and keep the E59 directive. Read every plan while a boss is inside 200. A chest listed in that window must not win, and this time that half can actually be scored if one drops. This is what still sits between the bot and a calm amusing minute on a seed where the chest and the boss overlap.
- E66 (movement), the B28 recheck. The confirmed dash rule said no through a crowd of 5 to 9 enemies at 1:38–1:43. One line in action.dash, everything else as this run, tells us whether that clause can be made to fire. It is a different area from the last two runs. E65 waits until a run reaches the queen on a known build, so the 71 hp pest total has a control. Items and economy are still untested; they are the coverage hole after this build run, and they are not what ended this one.

## Beliefs changed

- B13, likely, held. Evidence extended with the 1:28 shrine step-off. Status unchanged.
- B15, likely, recheck. Evidence extended with XEPS03 pests 113 of 119 and amusing 6. Status unchanged.
- B17, likely, held. Evidence extended with 18 page-walk hits on this run. Status unchanged.
- B20, likely, held. Evidence extended with amusing at 2:00 (6 damage) and the queen at 3:02 with no outcome line. Status unchanged.
- B21, likely, held. Evidence extended with this directive's appearance wins and the chest wins when no boss was up. Status unchanged.
- B22, lead, recheck. Evidence extended with the 55-away chest at 86% and the 148-away chest at 63%. Status unchanged.
- B25, likely, recheck. Evidence extended with the first chest at 1:44 on exploreDistance 300. Status unchanged.
- B26, likely, held. Evidence extended with amusing 2:00 and Colorado Queen 3:02. Status unchanged.
- B28, confirmed, held, now confirmed, recheck. The enemies_near>=5 clause scored under 0.5 across the 1:38–1:43 crowd.
- B31, likely, held. Evidence extended with +30 at 1:44, max 120, no food goal. Status unchanged.
- B37, likely, held. Same +30. Status unchanged.
- B44, likely, recheck. Evidence extended with food at 260 scoring 9% at 32 hp and food at 341 scoring 8% at 25 hp. Status unchanged.
- B54, likely, held. Evidence extended: no chest was listed while a boss was within 200, so the boss-direction half was not retested. Status unchanged.
- B59, new, planner, lead, held. The boss-within-200 evade line wins the appearance and the next few plans, then explore beats it while the boss is still inside 200.
- B60, new, game, lead, held. The queen's own damage can be absent while garden-slug, tomato-leech and sand-crab take the queen minute.
- B61, new, planner, lead, held. A line that a close Spud Freezer is also good loses to explore.
- B62, new, planner, lead, held. A new weapon over a passive, with one weapon at 5/8, left the next chest with nothing to evolve.

## Process changes

None.

<!-- /review -->

## Picks

- **0:19** level-up: took Chip Shuriken from Starch Plating, Chip Shuriken, Broadside.
- **0:19** gained without a pick (a chest or other): Chip Shuriken 1/8 new.
- **0:35** level-up: took Seed Potato from Lean Lunch, Seed Potato, Sprouting Eyes.
- **0:35** gained without a pick (a chest or other): Seed Potato 1/8 new.
- **0:57** level-up: took Whisk Vortex from Hot Sauce, Starch Plating, Whisk Vortex.
- **0:58** gained without a pick (a chest or other): Whisk Vortex 1/8 new.
- **1:33** shrine: took Damage taken 0% → -27% from Damage taken 0% → -27%, Gold gain +5% → +23%, Pickup range 0% → +25%.
- **1:36** level-up: took Seed Potato from Chip Shuriken, Whisk Vortex, Seed Potato.
- **1:36** gained without a pick (a chest or other): Seed Potato 1/8 to 2/8.
- **1:44** level-up: took Peeler from Peeler, Skipping Cannonball, Small Fry.
- **1:45** gained without a pick (a chest or other): Peeler 1/8 new.
- **1:46** level-up: took Seed Potato from Whisk Vortex, Seed Potato, Chip Shuriken, Reroll (1).
- **1:46** gained without a pick (a chest or other): Seed Potato 2/8 to 3/8.
- **1:47** gained without a pick (a chest or other): Seed Potato 3/8 to 4/8.
- **1:48** gained without a pick (a chest or other): Seed Potato 4/8 to 5/8.
- **2:23** level-up: took Seeker Sprouts from Tater Tot Pup, Seeker Sprouts, Fertilizer, Reroll (2).
- **2:23** gained without a pick (a chest or other): Seeker Sprouts 1/8 new.
- **2:57** gained without a pick (a chest or other): Seed Potato 5/8 to 8/8, Whisk Vortex 1/8 to 3/8.
- **2:59** level-up: took Fertilizer from Seeker Sprouts, Tater Tot Pup, Fertilizer, Reroll (2).
- **2:59** gained without a pick (a chest or other): Fertilizer 1/5 new.
- **3:21** level-up: took Fertilizer from Peeler, Seeker Sprouts, Fertilizer, Reroll (2).
- **3:21** gained without a pick (a chest or other): Fertilizer 1/5 to 2/5.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. If health is under 40% and food is listed, eat the food.
2. If a boss is within 200 units, evade. Do not open a chest. Do not charge a spot.
3. If health is under 40% and no food is listed, evade. Do not open a chest.
4. If a chest is listed and no boss is within 200 units, go and open it. A chest gives a free pick and evolves a ready recipe.
5. If health is under 70% and food is listed, eat the food.
6. Until a chest or food is listed, explore.
7. When no boss is within 200 units, a Spud Freezer that is close is also good: it freezes every enemy for 7.5 seconds.

What we know, most important first:
- A chest while a boss is within 200 units does not finish. The boss hits from far away and the walk kills Tibo.
- While that boss is within 200 units, evade. Open a chest only once the boss is farther than 200.
- Weapons stay weak without a chest. A finished recipe evolves at the next chest.
- Enemies inside 60 units hurt. A step that looks free can still cost health when a boss is close.
- Food heals about 30 hp.
- Amusing appears near 2:00. Colorado Queen appears near 3:00.

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
{{hurt_by}}
{{enemies}}
{{dash}}
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
{{health}}
{{hurt_by}}
{{enemies}}
Should Tibo dash now because health fell 5 or more in the last 3 seconds, or because 5 or more enemies are within 60 units?
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
  "eliteSeconds": 20
}
~~~
