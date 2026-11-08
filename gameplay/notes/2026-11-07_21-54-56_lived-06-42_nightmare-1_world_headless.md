# 2026-11-07 21-54-56: lived 06:42 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=mbn4vjqrwm4k8&stats=A9-8AQKuFxKJBAAqqQIDALgUBgBEuAD1ygMAlF8AvJgCAMvnArx_AAPWBN9UANS2AdwEAtQBAzh_BbreAf3QAQh6RQnbj6fj9yhPjDqctu4JxQYBE5sCjQEpBwABAAAACQAAANYBAAACFAEGCgQIAgQCwAGeAqIExAeSCc4QAwkIfgpDBFQbIzIECwbxB6UI4gLYAQQKBRsFAbfeLAFv9RgAe-oXAgdIb3Qgb2lsEwDH-BMGBgEARLi1AgcCAAAJBwO1yQibAgAKApYWEQEDEgID1hYBASASABDRLn8axCEvxgwoSlmvmbYA |
| Ending | died at 6:42, level 18, 2990 kills |
| Opening | first chest listed 2:04; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution 5:09; level 11 at 3:00 |
| Testing | E125 |
| Seed | 1HWOI3N |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | f8d49db docs(gameplay): grok reviews the 2026-11-07 21:37 run, lived 7:14, testing E113 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_21-54-56_nightmare-1_world_headless.csv |

## Outcome

- Lived **6:42** (402.7s), level 18, 2990 kills.
- Damage taken by source: boss:the-masher 44, boss:late-blight 24.4, enemy:fry-fly 23.1, Hot oil 19.4, enemy:potato-beetle 18.5, boss:amusing 17.7, enemy:sand-crab 15.7, enemy:field-rat 15, enemy:hay-bale 12.8, enemy:sizzle-imp 12.2, boss:beetle-queen 10.2, enemy:lint-bunny 9.9, enemy:oil-drip 9.5, enemy:crumb-ant 8.3, enemy:aphid 8.1, enemy:beetle-brood 4.8, enemy:bog-slime 4.1, enemy:sprout-mite 3.9, enemy:garden-slug 3.6, enemy:ketchup-drop 3.4, enemy:compost-maggot 2.8, enemy:swarm-fly 2.4, enemy:sock-pile 2.3, enemy:spittlebug 2.2, Brambles 2.1, enemy:cave-grub 1.5, enemy:frost-flea 0.7; 283 in all. Health gained over the run, by food, regeneration and anything else: about 156 (the game does not say from what).
- Weapons: Tater Tot Pup 4/8, Tater Minigun 1/1, Hash Brown Shield 2/8, Peeler 1/8.
- Passives: Starch Plating 5/5, Masher Grip 1/5, Gravy Heart 1/5.
- Items: none.
- Planner asked 138 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 114/120 | 7 | 0 | 5 | 29 | enemy:sprout-mite, enemy:aphid |
| 1:00 | 108/120 | 13 | 6 | 7 | 73 | enemy:compost-maggot, enemy:potato-beetle |
| 2:00 | 99/120 | 29 | 20 | 11 | 116 | boss:amusing, enemy:potato-beetle |
| 3:00 | 76/120 | 51 | 30 | 12 | 153 | enemy:fry-fly, boss:amusing |
| 4:00 | 94/120 | 40 | 56 | 14 | 170 | boss:the-masher, boss:beetle-queen |
| 5:00 | 79/134 | 61 | 44 | 15 | 187 | enemy:field-rat, boss:the-masher |
| 6:00 | 3/134 | 76 | 0 | 18 | 208 | boss:late-blight, enemy:hay-bale |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00; The Masher (the-masher) at 4:00; Late Blight (late-blight) at 6:00.
- First chest listed: 2:04. First time under 25% health: 6:10.
- Goals by kind (done / gave up / dropped): explore 25/0/5; evade 22/0/5; chest 3/0/3; food 0/0/1.
- Dashes: 41 (0:21, 0:42, 1:14, 2:01, 2:12, 2:27, 2:33, 2:39, 2:48, 2:53, 2:59, 3:06, …).
- Model calls: 121 plans, 17 picks, 656 moves (mean 188ms); the page walked through 27 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:18 Starch Plating 1/5 new; 0:28 Locked Gatling 1/8 new; 3:22 Hash Brown Shield 1/8 new; 4:01 Masher Grip 1/5 new; 5:09 Locked Gatling gone; 5:13 Gravy Heart 1/5 new; 6:03 Peeler 1/8 new.

## Plan

This run is a step toward Nightmare 10. Nightmare 1 still has no 20:00, and the E113 policy is the one that held a near-full bar through 6:00 and then lost minute 7 (141 hp) to Sir Strawman and Late Blight on steps the forecast called free. It tests E125 with one change, action.hurt, on the 21-37-57 templates, the same knobs, and tater-pup. The hurt question now leads with: a step that names Sir Strawman or Late Blight within 100 units hurts Tibo badly, even when the forecast says no damage. If that holds, on a two-option moment like 7:14 the boss step's hurt score rises above the other offered step, that step stops winning, and minute 7 loses less than 141. The sentence can split the steps only when the boss direction's move names the boss and the other step's does not; if both name him, the scores will not split, and that is the result. If the lethal step is the only move offered, as at 7:10, the sentence is not a failure; that case is the offer filter already requested. Minute 7 is inconclusive if neither boss comes inside 100. A boss damage total of zero counts only when that boss was listed. Until a chest or food is listed, and no boss is within 200, the goal question says yes to explore, including when health is low and no food is listed. When health is under 70%, food is listed, no chest is listed, and no boss is within 200, it says yes to eating the food. When a chest is listed and no boss is within 200, it says yes to opening that chest. When a boss is within 200, it says yes only to keep-away or evade. A close Spud Freezer can still win, because that state line is unchanged. Those goal rules stay, so this is the E113 life with one hurt sentence, and the 17:41 champion keeps its own exploit runs.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary
This run tested E125 on the E113 goal stack: one action.hurt sentence that a step naming Sir Strawman or Late Blight within 100 units hurts badly even when the forecast says no damage. The goal rules were what the bot played, and the hurt sentence never had a model step. Sir Strawman was absent, Late Blight's closest move row was 122 units, and he reached 83 only on the death tick. Tibo died at 6:42 in minute 6, which lost 76 and ended at 3/134, so the 141 comparison was never measured. The hypothesis is inconclusive. The run's own lesson is that chests at 300 to 500 units still become the goal once bosses leave 200, and the 6:04 step lost 14 hp with a hay-bale window of 12.8 while Late Blight was 188 away.

## Findings
- E125 is inconclusive. Sir Strawman never listed. Late Blight listed at 6:00. Closest move rows were 125 up-right at 6:01, 122 right at 6:10, and 125 up at 6:40. The death row at 6:42 has him at 83 up and the last 3 seconds as enemy:fry-fly 2.5, with no move row inside 100. Minute 7 did not happen (died 6:42). Confirmed that the condition was absent. The hurt hypothesis is unscored.
- The E113 goal text was the policy the bot played. Stats: explore 25/0/5, evade 22/0/5, chest 3/0/3, food 0/0/1. Explore held the opening through 1:59 (health 108/120 at 2:00). Appearance plans went to keep-away: amusing 2:00 at 64% (173 down), queen 3:00 at 52%, Masher 4:00 at 64%, Late Blight 6:00 at 38%. A chest 50 up at 2:05 scored 34% against keep-away 65% with amusing 93 left. Likely.
- Keep-away did not win every replan once a chest goal was already walking and a boss then entered 200. At 3:10 Open the chest (375 down) 53% beat keep-away 47% with amusing 67 up-left, and the chest opened at 3:16 after health fell 99 to 80. At 5:08, on the chest 0.7 of 1 second in, Open (7 up) 47% beat keep-away 36% with Colorado Queen 180 down and The Masher 195 down, and that open evolved Tater Minigun. Switches that did happen: 4:39 (bosses 108 and 186, keep-away 28%), 5:27 (196 and 202, keep-away 52%), 6:11 (137 and 155, keep-away 47%). Lead.
- A chest past 250 can win by a lot once every boss is outside 200. Open scored 51% at 506 down (3:05, amusing 237), 90% at 372 down-left (4:33, bosses past 400), 58% at 299 up (5:03), 51% at 425 down (5:22), and 43% at 449 down-right (6:06, health 45/134). Three of those opened (3:16, 3:32, 5:09). The 372, 425, and 449 walks were dropped when the bosses closed back in. Lead. This puts B130 on recheck.
- The 6:04 step is outside the E125 sentence. Walk up-left, forecast -2 hp, hurt 1.09, useful 47%, health 64 to 50. Late Blight was 188 right. The hay-bale window on that row is 12.8, which is the whole outcome line for hay-bale. The step before lost 6 with hay-bale 6.4. Minute 6 lost 76 and gained 0, hurt most by late-blight and hay-bale. Outcome boss:late-blight 24.4. Lead.
- At 5:35 health was 91/134, food 129 down scored 24%, the chest 390 down scored 39%, and keep-away won at 46% with both bosses past 300. The food goal that did start, at 5:59 (Eat the food 234 right at 52%, health 79/134), was dropped at 6:00 when Late Blight appeared at 172. One food goal, zero eaten. Lead.
- Generic planner.pick left no Gravy Pack. Pup offers lost at 0:28 (37% to Locked Gatling 54%) and 1:59 (4% to Starch Plating 73%), then won at 2:53 (35%), 2:55 (40%), and 6:06 (64%). Pup ended 4/8. Gravy Heart was first offered at 5:13 and taken at 43%, still 1/5 at death. Masher Grip at 4:01 (51%) plus Locked Gatling 6/8 evolved to Tater Minigun at 5:09. The loadout row names the recipe Locked Gatling at max plus Masher Grip. Lead, and it agrees with B122 that the generic question is not a pup policy.
- The Masher on this chest-opened, not-yet-evolved kit was 44 damage and still 30% at 6:42. Minute 4 lost 40, gained 56, ended 94/120. He was 99% at 4:09 and 71% at 5:32, after the minigun existed. That sits between the evolved-kit 6.7 totals and the 85 to 109 totals with no evolution. B90 stays on recheck. Lead.
- At 12 to 14 hp, with no food and no chest inside the goal list, keep-away beat the explore yes while bosses were past 300: 6:19 keep-away 37% over explore 32% (bosses 325 and 338), 6:24 45% over 36%, 6:34 48% over 32%. At 6:28 explore up-left still won at 52%. Lead. Boss clock matched B26: amusing 2:00, queen 3:00, Masher 4:00, Late Blight 6:00.

## Went well
- Opening explore through 1:59. Minute 0 lost 7, minute 1 lost 13, health 108/120 and level 7 at 2:00, with 29 enemies and no chest on the map yet.
- Boss appearance plans from 2:00, 3:00, 4:00, and 6:00 all took keep-away, and the chest 50 up during amusing stayed a no.
- Masher Grip at 4:01, then the chest channel that was already 0.7 charged at 5:08, opened at 5:09 into Tater Minigun. Health on that open was 91/120. First evolution of the run, and the only one.
- Dash asks under 0.5 stayed walks, including 2:00 at 5% and 6:12 at 48%. Dashes at or above 0.5 fired (2:27 at 66% away from amusing at 36, 4:44 at 76%, 5:10 at 70%, 6:07 at 62%). 41 dashes in the stats.
- A +29 jump at 3:53 (47 to 76, no food goal, max still 120) and a +44 jump at 4:03 (76 to 120, max still 120, level 13 to 14) put a full bar under The Masher minute. Same shape as the unexplained world heals.

## Went poorly
- 3:05 to 3:16, the chest 506 down. Health 99 to 80 on the walk, for Locked Gatling 3/8 to 4/8. Amusing closed from 237 to 67 while the goal stayed the chest.
- 4:33 to 4:39, the chest 372 down-left at 90% with health 120. By 4:37 a page walk lost 6 (boss:the-masher 6.1, boss:beetle-queen 1.5) and at 4:39 the chest was dropped with the bosses at 108 and 186. Health 120 to 108, no open.
- 5:09 to 5:10, on the evolution tile. Field-rat window 7.5 then 15, health 91 to 70, enemies_near 10 then 14. The dash at 70% went up-left, which was the offered step. Outcome field-rat is 15, so that window is the whole line. Minute 5 lost 61.
- 5:22 to 5:27, chest 425 down at 51% with health 114/134. The walk lost 4, 6, 6, and 5 (boss:the-masher window 12.2) and the goal dropped at 92 hp.
- 5:35, food 129 down at 24% with health 91/134. Keep-away and a chest at 390 outranked it. The later food goal lived one second.
- 6:03 to 6:11, health 78 to 28. The 6:04 step lost 14 on a -2 hp forecast. At 6:06 a chest 449 away started at 45/134 and was dropped at 6:11. Minute 6 gained 0. First time under 25% health was 6:10. Died 6:42 at 3/134, level 18, 2990 kills, 283 damage.

## Moments
- **2:00** Amusing 173 down, keep-away 64%, the explore goal dropped. Right call.
- **2:05** Chest 50 up scored 34% against keep-away 65%, amusing 93 left. Right call. That chest was not opened in the amusing window.
- **2:29** Evade in amusing's melee. The 8 seconds ending 2:32 lost 14 hp (110 to 100), with amusing 39 to 49 away, hot oil, and fry-fly. Many directions were forecast at -16 hp or worse. The least-bad steps still cost the health.
- **3:05** Chest 506 down won 51% to 50% with amusing 237 away. Better: leave a chest that far while he is just outside 200.
- **3:10** Amusing was 67 up-left and Open the chest still won 53% to 47%. Better: switch to keep-away. The channel then opened at 3:16 after the walk from 99 to 80.
- **4:01** Masher Grip 51% over Locked Gatling 33% and Lean Lunch 7%. Right call. It was the catalyst for the 5:09 evolution.
- **4:33** Chest 372 down-left at 90%, health 120, bosses past 400. Better: he was still at 99% health on the map. The walk met him and the chest was dropped at 4:39.
- **5:08** Already on the chest, 0.7 of 1 second, both bosses inside 200, Open 47% over keep-away 36%. The written no said keep-away. Finishing it evolved Tater Minigun at 5:09. Better: keep a chest that is already charging, and save the no for a chest that is still a walk.
- **5:10** Field-rat window 15, health 91 to 70, dash 70% up-left on a step the forecast already priced at -8 hp. The yes-rule fired on the offered direction.
- **5:35** Food 129 down at 24%, health 91/134, chest 390 at 39%, keep-away 46%. Better: eat the food. The far chest was blocking it.
- **6:00** Late Blight 172 up-right, the food goal dropped, keep-away 38%. Right call under the boss rule, and the heal was cancelled on the second it started.
- **6:04** Walk up-left, forecast -2 hp, hurt 1.09, lost 14, hay-bale window 12.8, Late Blight 188 right. Better: the within-100 sentence does not see this step. Naming hay-bale is the open question.
- **6:06** Chest 449 down-right started at 45/134 with Late Blight 213 right. Better: keep away. Health was 28 by 6:11 and the chest was dropped.
- **6:42** Died at 3 hp. Late Blight 83 up on the death row, last 3 seconds fry-fly 2.5, no move row inside 100. The test condition arrived as he died.

## Questions
- While health is under 70%, does a no on any chest past 300, plus a yes on listed food, eat the food at 5:35 (129 down, 24%, health 91/134) and skip the chest at 6:06 (449 away, 45/134), while the 5:03 chest at 299 can still start from 94/120? E133.
- On a step like 6:04, does naming hay-bale in action.hurt raise the direction that names it above a direction that does not, when the forecast says about 2 hp and Late Blight is still outside 100? E134.
- Does an extra planner.goal sentence, that a chest already charging stays a yes and a chest that is still a walk becomes a no once a boss is inside 200, flip the 3:10 plan (53% vs 47%, amusing at 67) and still finish a channel that is already at 0.7, as at 5:08? E135.

## Next
- E133, spots. One planner.goal change on these templates: under 70% health, a chest past 300 is a no and listed food is a yes even if a farther chest is in the log. This is the 5:35 miss and the 6:06 walk, which is how minute 6 started at 45 hp and gained nothing. The 5:09 evolution started above 70% toward a chest at 299, so that open can still happen. It moves the campaign by arriving at Late Blight with the heal this run cancelled.
- E126, build, on the following run. Generic pick got the pup to 4/8 and one level of Gravy Heart at 5:13, and the evolution that did happen was Tater Minigun. WEWS93 offered Gravy Heart at 2:09 with the pup still 1/8. The pup sentence is the untested half of a second evolution before minute 6. On this seed the catalyst was not offered until 5:13, so E126 would not have replaced the minigun here.
- Leave E125 inconclusive. Repeat the hurt sentence only on a run that is alive when Sir Strawman or Late Blight is inside 100 with two offered steps. This seed died at 6:42 with his closest model step at 122. The within-100 line did not decide minute 6.

## Beliefs changed
- B71, planner: confidence stayed likely. Status held to recheck. Two replans kept an open-chest goal after a boss entered 200 (3:10 and 5:08). Appearance plans still took keep-away.
- B126, planner: confidence stayed confirmed. Status held to recheck. The opening explore and the appearance keep-aways held. The every-plan half failed on those same two replans, and at 12 to 14 hp keep-away beat explore with bosses past 300 (6:19, 6:24, 6:34).
- B130, planner: confidence stayed lead. Status held to recheck. Chests at 299, 372, 425, 449, and 506 won once bosses were outside 200, including 90% at 372.
- B64, game: claim now includes Locked Gatling at max plus Masher Grip evolves to Tater Minigun. Confidence stayed likely. Status stayed held.
- B90, game: status stayed recheck. Evidence adds this run's Masher total of 44, still 30% at 6:42, with Tater Minigun from 5:09 and chests opened before that.
- B122, planner: status stayed recheck. Evidence adds pup ending at 4/8, Gravy Heart 1/5 from 5:13, and no Gravy Pack.
- B134, planner, added: an in-progress chest goal can survive a boss closing inside 200. Lead, held.
- B135, game, added: the 6:04 step lost 14 hp with hay-bale 12.8 while Late Blight was 188 away and the forecast said about 2 hp. Lead, held.
- B136, planner, added: at about 10% health, keep-away can beat the explore yes with bosses past 300 and no food or chest offered. Lead, held.

## Process changes
None. The plan already said minute 7 is inconclusive when neither named boss comes inside 100, and that is the result.

<!-- /review -->

## Picks

- **0:18** level-up: took Starch Plating from Butter Streak, Salt Line, Starch Plating.
- **0:18** gained without a pick (a chest or other): Starch Plating 1/5 new.
- **0:23** level-up: took Starch Plating from Hot Start, Locked Gatling, Starch Plating.
- **0:24** gained without a pick (a chest or other): Starch Plating 1/5 to 2/5.
- **0:28** level-up: took Locked Gatling from Tater Tot Pup, Chip Shuriken, Locked Gatling.
- **0:28** gained without a pick (a chest or other): Locked Gatling 1/8 new.
- **0:43** level-up: took Starch Plating from GPU, Sour Cream, Starch Plating.
- **0:43** gained without a pick (a chest or other): Starch Plating 2/5 to 3/5.
- **1:18** level-up: took Locked Gatling from Root Spikes, Locked Gatling, Sprouting Eyes.
- **1:18** gained without a pick (a chest or other): Locked Gatling 1/8 to 2/8.
- **1:59** level-up: took Starch Plating from Tater Tot Pup, Spud Fence, Starch Plating, Reroll (1).
- **1:59** gained without a pick (a chest or other): Starch Plating 3/5 to 4/5.
- **2:29** level-up: took Starch Plating from Gravy Boat, Starch Plating, Starch Bolt, Reroll (1).
- **2:29** gained without a pick (a chest or other): Starch Plating 4/5 to 5/5.
- **2:44** level-up: took Locked Gatling from Peel Out, Locked Gatling, Aged Russet, Reroll (1), Skip (1).
- **2:44** gained without a pick (a chest or other): Locked Gatling 2/8 to 3/8.
- **2:53** level-up: took Tater Tot Pup from Thick Skin, Tater Tot Pup, Afterburner Fries, Reroll (1), Skip (1).
- **2:53** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **2:55** level-up: took Tater Tot Pup from Tater Tot Pup, Tailgate Fries, Butter Streak, Reroll (1), Skip (1).
- **2:55** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **3:16** gained without a pick (a chest or other): Locked Gatling 3/8 to 4/8.
- **3:22** level-up: took Hash Brown Shield from Hash Brown Shield, Locked Gatling, Masher Grip, Reroll (2), Skip (1).
- **3:22** gained without a pick (a chest or other): Hash Brown Shield 1/8 new.
- **3:32** gained without a pick (a chest or other): Locked Gatling 4/8 to 5/8.
- **4:01** level-up: took Masher Grip from Locked Gatling, Lean Lunch, Masher Grip, Reroll (3), Skip (2).
- **4:01** gained without a pick (a chest or other): Masher Grip 1/5 new.
- **4:03** level-up: took Locked Gatling from Locked Gatling, Hash Brown Shield, Tater Tot Pup, Reroll (3), Skip (2).
- **4:03** gained without a pick (a chest or other): Locked Gatling 5/8 to 6/8.
- **5:09** gained without a pick (a chest or other): Tater Minigun 1/1 new (the recipe Locked Gatling at max level + Masher Grip), Locked Gatling gone.
- **5:13** level-up: took Gravy Heart from Peeler, Hash Hawk, Gravy Heart, Reroll (4), Skip (2).
- **5:13** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **6:03** level-up: took Peeler from Hot Sauce, Hot Potato, Peeler, Reroll (4), Skip (2).
- **6:03** gained without a pick (a chest or other): Peeler 1/8 new.
- **6:04** level-up: took Hash Brown Shield from Hash Brown Shield, Gravy Heart, Fertilizer, Reroll (4), Skip (2).
- **6:04** gained without a pick (a chest or other): Hash Brown Shield 1/8 to 2/8.
- **6:06** level-up: took Tater Tot Pup from Steam Vent, Starch Bolt, Tater Tot Pup, Reroll (4), Skip (2).
- **6:06** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
2. If health is under 70% and food is listed, eat the food.
3. Evade only when no chest and no food is listed.
4. A Spud Freezer that is close is also good: it freezes every enemy for 7.5 seconds.

What we know, most important first:
- On this mode the crowd hurts. Small enemies inside 60 units took Tibo from 120 to 1 hp in 3 minutes.
- Evading all the time did not work: the last run never opened a chest and died at 3:16.
- Weapons stay weak without chests. Open chests early to get stronger.
- A step that looks free can still cost 4 to 9 hp when many enemies are close.
- A base weapon at max level plus its catalyst evolves at the next chest.
- Food heals about 30 hp. Eat it before health is very low.
- Hot oil and bosses also hurt. Do not stand in hot oil.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
The goal is {{goal}}. Use the first rule that matches.

When a boss is within 200 units, yes only if this goal is keep-away or evade. Otherwise no.

When a chest is listed and no boss is within 200, yes if this goal opens that chest. No if this goal is explore, gems, or food.

When health is under 70%, food is listed, no chest is listed, and no boss is within 200, yes if this goal eats the food. No if this goal is explore.

When no boss is within 200, no chest is listed, and health is at least 70% or no food is listed, yes if this goal is explore. No if this goal is keep-away.
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
A step that names Sir Strawman or Late Blight within 100 units hurts Tibo badly, even when the forecast says no damage. If Tibo does this: {{move}}. How badly does it hurt Tibo in the next second?
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
  "eliteSeconds": 20,
  "lockstep": 0
}
~~~
