# 2026-11-07 19-14-47: lived 04:11 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=w8t77ad63vptz&stats=A_N1ALABBw0AhoIAAACtDAMAA9YCtB0CvwMAzf4BAAJWZwE8hQMJekUoT4-nCdvlIe4J4_ectlEiARLyAXkNAAABAAAABQAAAM4BAAACCgEECAIAAlpkTEwDCgkwGiQVRwoRBBIEBQOiAQ4ABRUFAIaCSAH4Rx4BcbcbAHpyFwACvQ0GAQAHAgAACQYD8yDyAQAKAtoNEQEDEgID1hYBASASABBgJ5xzBe4yMQyO9mPQ3zoA |
| Ending | died at 4:11, level 7, 176 kills |
| Opening | first chest listed never; 0 chests opened by 2:30; first evolution none; level 5 at 3:00 |
| Testing | E65 |
| Seed | Y1EN48 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | 8c5cdb0 docs(gameplay): grok reviews the 2026-11-07 19:00 run, lived 3:45, testing E59 |
| Coach prompts | coach-plan.md 99ee6853; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-14-47_nightmare-1_world_headless.csv |

## Outcome

- Lived **4:11** (251.5s), level 7, 176 kills.
- Damage taken by source: enemy:ice-imp 72.2, boss:beetle-queen 30.5, boss:amusing 26.6, enemy:oil-drip 22.9, enemy:sand-crab 12.6, enemy:snow-mold 11.7, Hot oil 11.3, boss:the-masher 11.2, enemy:frost-flea 9.9, enemy:aphid 5.9, enemy:crumb-ant 4.6, enemy:fry-fly 4.6, enemy:potato-beetle 4.5, enemy:ketchup-drop 4.4, enemy:cave-grub 4.2, enemy:sprout-mite 2.9, enemy:lint-bunny 1.6; 242 in all. Health gained over the run, by food, regeneration and anything else: about 77 (the game does not say from what).
- Weapons: Tater Tot Pup 2/8, Frying Pan 1/8.
- Passives: Salt Shaker 1/5, Root Network 3/5.
- Items: none.
- Planner asked 79 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 116/120 | 11 | 5 | 4 | 28 | Hot oil, enemy:oil-drip |
| 1:00 | 119/120 | 18 | 17 | 5 | 74 | enemy:oil-drip, enemy:crumb-ant |
| 2:00 | 120/120 | 32 | 35 | 5 | 118 | enemy:sand-crab, enemy:oil-drip |
| 3:00 | 77/120 | 72 | 18 | 6 | 173 | enemy:ice-imp, boss:beetle-queen |
| 4:00 | 30/120 | 53 | 2 | 7 | 191 | boss:the-masher, enemy:potato-beetle |

- Bosses first seen: Colorado Queen (beetle-queen) at 1:44; amusing (amusing) at 2:00; The Masher (the-masher) at 4:00.
- First chest listed: never. First time under 25% health: 4:09.
- Goals by kind (done / gave up / dropped): explore 30/0/14; evade 2/0/1; spot 1/0/0.
- Dashes: 15 (0:46, 0:56, 1:04, 1:10, 1:19, 1:39, 2:02, 2:35, 2:44, 3:04, 3:05, 3:18, …).
- Model calls: 73 plans, 7 picks, 156 moves (mean 177ms); the page walked through 27 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:11 Salt Shaker 1/5 new; 0:23 Root Network 1/5 new; 4:10 Frying Pan 1/8 new.

## Plan

This run climbs Nightmare 1 by testing one build question: whether finishing a held recipe before the Colorado Queen is what the 3:45 death lacked. That run maxed Seed Potato, evolved nothing, and lost 97 hp in minute 3. Goals stay the last run's words. Until a chest or food is listed, explore. If health is under 40% and food is listed, eat the food. If health is under 40% and no food is listed, evade. If a boss is within 200 units, evade, and do not open a chest or charge a spot. If a chest is listed and no boss is within 200, open it. The only change is the card choice, written in both planner.state and planner.pick because the pick reads its own question and the state is on the page at that choice. Take the card that finishes a held recipe. Fertilizer finishes Seed Potato and Seeker Sprouts. Gravy Heart finishes Tater Tot Pup and Peeler. Big Bowl finishes Whisk Vortex. GPU finishes Chip Shuriken. If a held weapon is at 5/8 or higher and a passive is offered, take that passive, not a new weapon. Do not fill a sixth weapon slot until one recipe is ready. If that holds, the passive wins the 2:23-style choice and a chest before 3:30 evolves a weapon. If the queen is reached after that, minute 3 should lose less than 97 hp. Inconclusive if no choice offers a passive while a weapon is at 5/8 or higher, or if no recipe is ever one card from done. Action text, knobs and tater-pup stay as the 3:45 run. Build has sat since early today; the last two runs were bosses and hazards.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run was E65: take the passive that finishes a held weapon once that weapon is at 5/8, so a chest before the queen evolves it and minute 3 loses less than the 97 hp of the 3:45 run. The test never started. Tater Tot Pup ended at 2/8, none of Fertilizer, Gravy Heart, Big Bowl or GPU was offered, no chest was ever listed, and nothing evolved. What the bot did play was the leftover goal rule, explore until a chest or food is listed: 30 explores finished, level 5 at 3:00, 176 kills, death at 4:11. Health stayed near full until 3:03, then ice-imp hits of 20.6 and a stack of bosses (a queen at 1:44, a second queen near 3:02, amusing from 2:00, The Masher at 4:00) finished it. The recipe rule is unmeasured. This explore policy does not create the chest or the weapon level that rule needs.

## Findings

- E65 was not carried out. Six picks, and the weapon never passed 2/8: Salt Shaker at 0:10 (43%), Root Network at 0:23 (51%), Root Network at 0:56 (89%), Tater Tot Pup at 1:40 (52%, 1/8 to 2/8), Root Network at 3:31 (77%), Frying Pan at 4:10 (45%). No offered card was Fertilizer, Gravy Heart, Big Bowl or GPU. The plan's own out was inconclusive if no weapon is at 5/8 or no recipe is one card from done. Both were true. Confirmed for this run. The hypothesis about minute-3 damage is not scored.
- Explore-until-a-chest-is-listed produced no chest and almost no levels. Goals: explore 30 done / 0 gave up / 14 dropped, evade 2/0/1, spot 1/0/0. First chest listed: never. First evolution: none. Level 5 at 3:00, level 7 at 4:11, 176 kills. The 3:45 run on XEPS03 was level 9 at 3:00 with 1222 kills and three chests. Likely that this goal policy cannot host a recipe test on a seed that does not drop a chest on its own. One seed (Y1EN48).
- The boss-within-200 evade line won the close, ugly plans and lost the calm ones. It won at 1:44 (keep-away 35% vs explore up 34%, queen 116, reason a boss appeared), at 3:03 (47%, queen 79), at 3:54 (52%, queen 65) and at 4:08 (50%, queen 171, health 50/120). It lost amusing's first plan at 2:00 (explore up 45% vs keep-away 26%, amusing 173, reason 5 seconds passed). Another 26 explores and one Beetle Nest won while a boss was still inside 200, including 2:21 (explore right 71% vs keep-away 25%, amusing 117, health 119). Likely, and it contradicts the "wins the appearance plan and holds for a few cycles" half of B59. Same state line as E59, no planner.goal sentence.
- Standing in a Boss Lair during explore woke an extra queen. At 1:43 the explore goal ended inside the Boss Lair, charged 1.7 of 3 seconds. The next plan scored Charge the Boss Lair 16% and left. At 1:44 Colorado Queen was 116 down-left; the lair had been 57 down-left. A second beetle-queen was listed by 3:02 (87 down at 99% health, and 492 down-left at 100%). Amusing still arrived at 2:00. The ~3:00 clock is not refuted; the 1:44 queen is a second body. Lead, one seed.
- The Beetle Nest at 2:57 put ice imps on the field, and an ice-imp hit is about 20.6 on a step scored as no damage. Fight offers before the nest were potato beetles. The nest finished at 2:58 (it was already 1.2 of 1.5, amusing 148 away, nest won at 28% over keep-away 20%). That same plan listed Fight the Ice Imp at 30 and 54. Ice-imp is 72.2 of 242, the top source. At 3:03 the chosen step was scored no damage (hurt 0.33) and health went 120 to 99 with ice-imp 20.6. At 4:09 another chosen step was scored no damage (hurt 0.23) and health went 49 to 29 with ice-imp 20.6. enemies_near was 1 both times. The run_end last-3-seconds line is ice-imp 20.6 and beetle-queen 2.2. Lead.
- A forecast-free walk took the masher hit. distrustBossRange was 0. At 4:03 the page walked up-left and lost 15 hp, with The Masher 213 left. hurt_by on that row: masher 11.2, queen 2.2, potato-beetle 4.5. The page walked through 27 hits in the run. Lead as a masher example, and it agrees with the older forecast-free boss hits.
- Health held, on paper, until the nest. Minutes ended at 116, 119, 120, 77, then 30. Minute 3 lost 72 (ice-imp and the queen). Minute 4 lost 53 in about 11 seconds. At 2:47 health went 97 to 120 (+23) with no food goal and max hp still 120. That matches the unexplained jumps already on the books. Lead only as another sample of the jump, not as a new source.
- Queen and amusing were on the outcome here: queen 30.5, amusing 26.6. Amusing was still at 91% health at 4:00, so it was never killed. Four bosses were listed at death. A missing queen line is not every world seed.

## Went well

- **1:44** Queen appearance plan. Keep-away won by a point (35% to 34%) at 116 away. By 1:50 she was 238 away and the goal could legally go back to explore. Health stayed 116–117 through that window.
- **3:03 to 3:11** After the 21 hp ice-imp tick, keep-away won at 47% with the queen 79 away. The goal end says the 8 seconds lost 33 hp, almost all of it in the first second (120 to 90). From there health sat at 84–87 and the queen opened out to 221.
- **3:54 to 4:02** Keep-away won at 52% with the queen 65 away and amusing 91 away. The goal ended "kept clear for 8 seconds without losing health" (78 to 79).
- **1:40** Tater Tot Pup at 52% over Starch Plating 45% and Rotten Spud 3%. That was the only level the held weapon got (1/8 to 2/8). Rotten Spud stayed at 3%.
- Dashes fired when the crunch was already on: 3:04 at 52%, 3:05 at 75%, 3:53 at 75%, 3:58 at 76%. Fifteen dashes in the run. The early yeses at 0:46, 0:56, 1:04, 1:10 and 1:19 were 59–69% with enemies_near 5–7.

## Went poorly

- The whole opening was explore at 300 units. No elite was fought. Fight-the-Potato-Beetle sat around 12–26% and lost. No chest, no evolution, level 5 at 3:00. The recipe test needed a weapon at 5/8 and a chest. This directive has produced neither on a quiet seed. The levels that did come went into passives: Root Network three times, to 3/5, and Salt Shaker once.
- **2:00 through 2:52** Explore kept winning while amusing was inside 200, including at 117 away with full health (2:21, explore 71%). At 2:35 health went 118 to 103 on model steps (oil-drip, sand-crab, ketchup-drop, amusing about 70 away), then page walks took it to 96. The 2:32 plan should have been evade.
- **2:57** Charged a Beetle Nest while amusing was 148 away. The directive says not to charge a spot inside that range. Ice imps were listed a second later and then did 72.2 hp.
- **4:02** A clean evade had just ended. The next plan was explore up-left, 48% to keep-away 42%, with the queen 118 away. One second later the page walked into the masher.
- **4:03** Forecast-free walk, −15 hp, Masher 213 left. distrustBossRange 0, so the model was not asked. E51 is still the knob for this.
- **4:09 to 4:11** Ice-imp 20.6 again, 49 to 29, on a step scored no damage. Died at 4:11, level 7, still at 30 hp on the last rows, last 3 seconds ice-imp 20.6 and queen 2.2. The 4:10 pick (Frying Pan 45%, Hot Streak 31%, Small Fry 24%) could not matter: nothing on the list finishes Tater Tot Pup, and a new weapon at 1/8 does not change the next second.

## Moments

- **1:40** Tater Tot Pup 52% over Starch Plating 45%. The pup went 1/8 to 2/8. Right call. It was the only level that weapon got.
- **1:43** Explore ended inside the Boss Lair at 1.7 of 3 seconds. Better: do not stand in a lair on the way through. The next plan scored the lair 16% and walked off.
- **1:44** Colorado Queen 116 down-left. Keep-away 35% beat explore 34%. By 1:50 she was 238 away. Right call.
- **2:00** Amusing 173 up-left. Explore up 45% beat keep-away 26%. The reason on the row was 5 seconds passed, not a boss appearing. Better: evade. She was inside 200.
- **2:21** Amusing 117 left, health 119, explore right 71%, keep-away 25%. Better: evade. Same sort of distance as the 1:44 win, opposite result, full health.
- **2:35** Health 118 to 103, then page walks to 96, amusing about 70 away, oil-drip and sand-crab in the window. Better: the 2:32 plan should have been evade.
- **2:47** Health 97 to 120, +23, no food goal, max hp still 120. Right call only in that Tibo was back to full. The log does not say what healed it.
- **2:57** Already inside a Beetle Nest at 1.2 of 1.5, amusing 148 away. The nest won at 28%. Ice Imps were 30 and 54 away a second later. Better: do not charge a spot while a boss is within 200.
- **3:03** Chosen step scored no damage (hurt 0.33) and ice-imp dealt 20.6, 120 to 99. Keep-away then won at 47% with the queen 79 away. Better: the step. The evade after it was right, and health stabilized near 85.
- **4:02** The evade had just kept clear for 8 seconds. Explore up-left 48% beat keep-away 42% with the queen 118 away. Better: stay on evade.
- **4:03** The page walked up-left and lost 15. The Masher was 213 left (11.2), with the queen 2.2 and a potato-beetle 4.5 in the window. Better: stay on evade. A boss-range distrust would have asked the model on that step.
- **4:09** Ice-imp 20.6 again, 49 to 29, hurt score 0.23 on the chosen step. Died at 4:11. Better: nothing in the pick list could fix a 2/8 weapon with four bosses up.

## Questions

- Once a policy that has already produced chests and weapon levels is under the same pick text, does a weapon reach 5/8, does the passive win that choice, and does the next chest evolve it? Added as E70. Minute-3 hp is not the score, because the goal policy changes too.
- Did the Boss Lair charge at 1:43 cause the extra queen at 1:44, with the timed queen still arriving near 3:02? Added as E71.
- Was the ice imp the Beetle Nest's elite, and does walking away from that elite (no chest, 20.6 a hit, forecast blind) repeat? Added as E72.
- Does a planner.goal sentence hold keep-away above explore for the whole time a boss is inside 200? Already E66. This run is the second sample of the state line failing, so E66's learnings are updated and B59 is recheck.

## Next

- E70, build. Put the E65 pick text on the E60 goal policy (fight a listed elite once it is past 2:00 and no chest is listed). That policy has already listed a chest at 2:04 and evolved at 2:30. This run showed the pick rule cannot be scored on explore-until-listed-chest. Score whether a 5/8 weapon's passive is taken and whether the next chest evolves. That is the step from a 4-minute death to the runs that lived past 7:00. Inconclusive if the weapon still never reaches 5/8 or no chest appears.
- E66, models. The state line "evade while a boss is within 200" just lost 27 calls on a second seed, including amusing's first plan. A planner.goal sentence is the untested fix, and B2 says one option at a time beats another line in the state wall. Holding evade while bosses are up is what stops the stack this run died under (two queens, amusing still at 91%, the masher). Do not also change the pick text in that run.
- E71, bosses. One walk through a Boss Lair is the difference between one queen at 3:00 and two queens from 1:44. If avoiding the lair keeps the early queen off the field, every later boss minute gets easier. Items (E69) are still the area with nothing done, and a 4-minute run that never sees an item cannot test them. Run E69 on a stack that has already lived long enough to be offered one.

## Beliefs changed

- B59: confidence lead, status held → lead, recheck. The fade half happened again. The "wins the appearance plan and the next cycles" half failed for amusing at 2:00 (173 away, explore 45% vs 26%) and never held. At 2:21 explore won 71% to 25% with amusing 117 away.
- B49: evidence only. Confidence stays likely, status held. Y1EN48 listed no chest in 4:11 at exploreDistance 300.
- B17: evidence only. Likely, held. 27 forecast-free hits, including the masher walk at 4:03.
- B20: evidence only. Likely, held. First queen at 1:44 was beside the lair; a second queen was up by 3:02; amusing at 2:00. Queen 30.5 and amusing 26.6 are on this outcome.
- B26: evidence only. Likely, held. Same split. The ~3:00 clock still fits the second queen.
- B28: evidence only. Stays recheck. This seed dashed at 59% at 0:46 with enemies_near 5 while health had risen from 117 to 119. XEPS03 did not dash on that clause.
- B31: evidence only. Likely, held. +23 at 2:47, 97 to 120, no food, max hp 120.
- B37: evidence only. Likely, held. Same jump.
- B62: evidence only. Lead, held. Freezer still never started. It scored 46% against explore 49% at 3:43 even though amusing was 95 away, so the "no boss within 200" condition was false and the line still scored high.
- B65: added. Game, lead, held. An explore that stands in a Boss Lair charges it, and a queen can appear there a second later.
- B66: added. Game, lead, held. Ice-imp hit about 20.6 on a step the forecast and the hurt score both called no damage.
- B67: added. Planner, lead, held. The E65 pick text does not select a card until a weapon is at 5/8 or a named catalyst is offered. Those levels went into Root Network.
- B68: added. Planner, lead, held. "Do not charge a spot" while a boss is within 200 did not stop a Beetle Nest Tibo was already standing on.

## Process changes

Edited coach-plan.md, one bullet under Choosing what this run tests. E50, E57, E59 and now E65 were all inconclusive because the state the question needed never showed up (the pest, the oil, a chest during the boss, a weapon at 5/8). The plan already knew to mark that case inconclusive. It did not say to stop attaching the interesting half of the question to a policy that has not produced the state. The new bullet says that run answers whether the state shows up, and to put the test on a policy that has already produced it.

<!-- /review -->

## Picks

- **0:10** level-up: took Salt Shaker from Stuffed Skin, Salt Shaker, Broadside.
- **0:11** gained without a pick (a chest or other): Salt Shaker 1/5 new.
- **0:23** level-up: took Root Network from Clean Plate, Root Network, Golden Fry.
- **0:23** gained without a pick (a chest or other): Root Network 1/5 new.
- **0:56** level-up: took Root Network from Tater Mines, Salt Line, Root Network.
- **0:56** gained without a pick (a chest or other): Root Network 1/5 to 2/5.
- **1:40** level-up: took Tater Tot Pup from Rotten Spud, Starch Plating, Tater Tot Pup.
- **1:40** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **3:31** level-up: took Root Network from Root Network, Bacon Bits, Fry Knives.
- **3:31** gained without a pick (a chest or other): Root Network 2/5 to 3/5.
- **4:10** level-up: took Frying Pan from Hot Streak, Frying Pan, Small Fry.
- **4:10** gained without a pick (a chest or other): Frying Pan 1/8 new.

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

On a card choice: take the card that finishes a held recipe. Fertilizer finishes Seed Potato and Seeker Sprouts. Gravy Heart finishes Tater Tot Pup and Peeler. Big Bowl finishes Whisk Vortex. GPU finishes Chip Shuriken. If a held weapon is at 5/8 or higher and a passive is offered, take that passive, not a new weapon. Do not fill a sixth weapon slot until one recipe is ready.

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
Tibo is at a {{choice}}. Take the card that finishes a held recipe. Fertilizer finishes Seed Potato and Seeker Sprouts. Gravy Heart finishes Tater Tot Pup and Peeler. Big Bowl finishes Whisk Vortex. GPU finishes Chip Shuriken. If a held weapon is at 5/8 or higher and a passive is offered, take that passive, not a new weapon. Do not fill a sixth weapon slot until one recipe is ready. Which option makes Tibo strongest?
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
