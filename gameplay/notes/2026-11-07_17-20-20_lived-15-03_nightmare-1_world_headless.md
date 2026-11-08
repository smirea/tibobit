# 2026-11-07 17-20-20: lived 15:03 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=zyf9av355f3cp&stats=A7OnAwKFywI0pjsAhoIJIwHSKAwAJRIAm_znAQARcADf1tQBANFAAMm6xQEAKHQAlK3DAQA9SgD9kgsACVUAsIUDAHicAOmnAgLqqAEAlWwI2HcAxuEA1iQA0ogA3SIAA9YA7BgGZBsF_dAF-6AFsYMF6u0FN5wFCnpF7gkJ2-P3j6coT5y2jDrlIVEi-wUBFMoJiQgXGgABAQGGAhMDAAmdAwQAAi4BDwQMAgoKAAIKDAQKBgoECELAA6oL8hSkG_4ZzBi4KZQ5ujygR6RauFCaRoZIAw0KaApTND_5AU4f5AEEBBcM20ziXPs7sEyVBPkDqgKMARggngGwAQUdBQCGgoUGAf7VkgEBwk9LAW_1OgIHSG90IG9pbDcGFgUAPUpjABFwGQAodE4AJRLhAQDRQEUHAgEACA8CcEPx8hPXA_h905wTlQYJCAPC5IEHygkACgKALREBAxYBASASABBgJ5xzBe4yMQwdm4p07hEA |
| Ending | died at 15:03, level 52, 42373 kills |
| Opening | first chest listed 1:08; 8 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution 1:38; level 9 at 3:00 |
| Testing | E26 |
| Seed | 127B4T9 |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Coach prompts | coach-plan.md 40bad860; coach-retrospective.md 3ec01e62 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_17-20-20_nightmare-1_world_headless.csv |

## Outcome

- Lived **15:03** (903.3s), level 52, 42373 kills.
- Damage taken by source: enemy:ice-imp 773, boss:the-mandoline 146, boss:great-wireworm 75, boss:late-blight 58, Hot oil 55, enemy:crumb-ant 28, enemy:blight-spore 23, enemy:field-rat 21; 1179 in all. Health gained over the run, by food, regeneration and anything else: about 1033 (the game does not say from what).
- Weapons: Gravy Pack 1/1, Factory Reset 1/1, Loaded Dice 1/1, Mash Landing 8/8, Sack of Russets 1/1, Permafrost Fries 1/1.
- Passives: Four-Eyed Spud 5/5, Gravy Heart 5/5, Sprouting Eyes 5/5, Hot Start 5/5, Thick Skin 5/5, Butter Pat 5/5.
- Items: Boom Spud x1, Coal-Baked Spud x1.
- Planner asked 293 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Plan

This run tests E26 on nightmare open world: whether an explore walk of 600 units lists the first chest well before 1:30. The planner text, the action text, and the other knobs stay as the 3:38 run. exploreDistance is the only change, from 300 to 600. An explore goal walks that far and stops early at the first chest that has never been listed. The last three world seeds, all at 300 units, listed the first chest at 1:32 (70 hp), 2:16, and 3:02 (88 hp). If the extra distance is what was missing, a chest should appear before 1:30 while health is still high, and the same directive should then open it. Until a chest or food is on the list, the planner explores, and a close Spud Freezer can still win. Health under 40% still uses that same directive, which at 3:36 last run started a chest 144 away at 17% health. Seeds differ, so an earlier chest is a lead. Watch the clock and the hp on the first chest row. If that row is still after 1:30, or the explore goals turn aside before they cover 600, the longer walk was not enough.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested E26: whether exploreDistance 600 lists a chest before 1:30 on nightmare open world, with the 3:38 templates and the other knobs unchanged. The bot played the test. From 0:00 to 1:07 four explore goals each walked 600 units and found nothing, and one explore (0:47–0:52) turned aside to a Beetle Nest. At 1:08 two chests were listed, 40 and 54 away, at 108/120 hp, and the planner opened them. That is earlier and healthier than the 300-unit world runs (1:32, 1:46, 2:16, 2:20, 3:02), on one seed (127B4T9), so it is a lead. The same chest directive then evolved five weapons by 8:16 and carried the run to 15:03, where enemy:ice-imp (773 of 1179, the last 169 in one second) killed Tibo on steps the one-second forecast had priced as free.

## Findings

- E26's clock line was met on seed 127B4T9: the first chest row is 1:08, chests 40 down and 54 down-left, hp 108/120, after explore goals ended "walked 600 units and found nothing new" at 0:10, 0:21, 0:47 and 1:07. Lead. One seed.
- Those first chests appeared in the list at the 1:08 level-up. Later explores did stop early on a chest that had never been listed: 2:04 at 33, 4:01 at 155, 5:03 at 46, 7:04 at 71, 7:08 at 141, 9:08 at 173, 10:11 at 75, 11:15 at 342, 13:20 at 165, 14:06 at 80. Lead that the 600 early-stop fires once a chest is there to find.
- The chest directive was what the planner played once a chest was listed: about 32 opens completed, and one fail (C65563 at 1:19, "no closer for 6 seconds", hp 108 down to 76 while the model stepped away). No evade goal started. Food goals started when food was listed under 70% hp, at 12:38, 14:26, 14:36 and 15:03. Likely.
- Five evolutions were in by 8:16: Factory Reset 1:38, Gravy Pack 2:04, Loaded Dice 3:21, Permafrost Fries 7:07, Sack of Russets 8:16. The run lived 15:03 at level 52 with 42373 kills, the second nightmare world run past 15:00 on this directive plus the dash question. Likely.
- enemy:ice-imp was 773 of 1179 damage and the killing blow (15:03, hurt_by enemy:ice-imp 169.1, hp 48 then 24). The big ticks at 10:56 (34 hp), 13:47 (87 hp) and 14:19 (114 hp) are page walks with enemies_near 0. Likely, second long run after ice-imp 116 of 392 on the 17:14 run.
- The Mandoline dealt 63.6 at 12:18 from 273 away and 82.3 at 12:27 from 132 away, both page walks the forecast treated as as cheap as the safest step. Great Wireworm dealt 56.4 at 10:03 on a dash the model rated no damage (hurt 0.13). Lead. Same shape as the amusing forecast miss.
- Hp rose with max hp unchanged and no food goal: +24 at 1:37 (67 to 91) and +29 at 1:38 (87 to 116), then +35 at 12:25 (139 to 173), +34 at 12:49 (94 to 129), +30 at 12:54 and +46 at 13:20 (146 to 192). Lead. This is the rise the short world runs had missed before 3:00.
- With all six weapons and six passives filled, Skip beat Sack of Gold and Baked Potato at high hp (10:13 twice, 11:59 twice, 13:34, 14:02) and Baked Potato won when hp was lower (12:31 at 96, 12:56 at 110, 13:16 at 116, 14:02 at 103, 14:26 at 84). Reroll was on offer from 3:34 and was never taken. Lead.
- At 10:02 the shrine pick was crit chance 0% to 6% at 75%, over max HP 192 to 215 at 19%, with Great Wireworm 94 away at 93%. The next second the worm hit for 56. Lead.
- Boom Spud, gained at 8:03 from a Potato Crate, and Coal-Baked Spud, bought at 10:57 (gold 3804 to 3572), were still held at death. The goal list has no use-item option. Lead.
- A finished food goal healed +31 at 12:38 (131 to 162) with no hit on that row. The 14:37 food ended at +7 while ice-imp 23.1 was on the hurt list. Likely, the ~30 heal when the same seconds stay clean.
- Hot oil was 55 for the whole run. A large share of it is the 3:12–3:27 chest cluster in burn, which still opened and produced Loaded Dice plus Mash Landing 8/8. Lead that the oil was the smaller cost.

## Went well

- 0:00–1:07 the explore legs covered 600 units and hp went 120 to 108. Sprout-mite, potato-beetle and compost-maggot ticks stayed in single digits.
- 1:08–1:11 the first two chests opened at 108 hp and Reset Button reached 8/8.
- 1:38–8:16 the chest chain finished five evolutions. Hp was full again by 2:28 and stayed near max until the worm at 10:03.
- 6:31 a Spud Freezer 39 to the left was charged and used by 6:34.
- 12:38, 14:26 and 14:36 food was taken while hp was under 70%.
- Dashes at 10:22 (88%), 12:54 (86%) and 13:01 (85%) left the ice-imp direction the forecast had marked dead.

## Went poorly

- 1:14–1:25 the chest was up-left and the model walked and dashed right and down (dash 78% at 1:14, 96% at 1:20). Hp 108 to 76. C65563 failed at 1:19. A step that still closed the last 50 units would have kept the channel.
- 3:12–3:25 the model left chests that were 0.4 to 0.7 charged, because standing still forecast a few hp, while hot oil was underfoot (ticks up to 13.8). The opens still finished. Staying on the tile for the last half-second would have dropped the oil total.
- 3:51 a Spud Freezer 41 to the left lost to explore up. The directive calls a close freezer good. The 6:31 freezer, 39 away, shows the planner will take one.
- 10:02 crit over +23 max HP, then 10:03 Great Wireworm for 56 on a move rated no damage. Max HP was the survival card with the worm inside 100.
- 10:56, 13:47 and 14:19 the page walked into ice-imp for 34, 87 and 114, enemies_near 0, forecast as cheap as the safest step. 12:18 and 12:27 the page walked into The Mandoline for 64 and 82 from 273 and 132 away. The action model was not asked. Those steps are where the run's health actually left.
- 10:57 Coal-Baked Spud was bought and never used, and Boom Spud had sat unused since 8:03. Gold 7328 was still in hand at death.
- 15:02–15:03 ice-imp 48.5 then 169, food 99 and 104 away, the food direction forecast as dead. The model walked down from 48 hp and died at 24. The food goal matched the directive and the burst was already faster than a 100-unit walk.

## Moments

- **0:10** Explore up-right walked 600 units and found nothing, hp 119. Better: right call.
- **1:08** Two chests listed at 40 and 54, hp 108, and the planner opened them. Reset Button was 8/8 by 1:11. Better: right call.
- **1:19** Chest C65563 failed, no closer for 6 seconds, after dashes right away from an up-left chest, hp 108 down to 91 and still falling. Better: take a step that shortens the chest distance once the forecast is a scratch.
- **1:38** The chest opened into Factory Reset and hp went 87 to 116. Better: right call.
- **3:21** Loaded Dice evolved in hot oil; Mash Landing was 8/8 by 3:27. Better: right call to finish the cluster, and stand the last half-second of each channel.
- **3:51** Spud Freezer 41 left, explore up won. Better: charge the freezer.
- **6:31** Spud Freezer 39 left, charged and used by 6:34. Better: right call.
- **8:16** Sack of Russets evolved. Five evolutions, hp 163/163. Better: right call.
- **10:03** Great Wireworm hit for 56 on a dash rated no damage, one second after the shrine took crit over +23 max HP. Better: take max HP, and treat a worm inside 20 as a forecast miss.
- **12:18** The Mandoline hit for 64 from 273 away on a page walk the forecast called free. Better: ask the action model while a boss is listed.
- **13:47** Ice-imp hit for 87 on a page walk, enemies_near 0, hp 192 to 105. Better: ask the model on that step.
- **15:03** Ice-imp hit for 169, food was about 100 away, and Tibo died at 24 hp. Better: the food goal was the right call and an hour too late; the free walks at 13:47 and 14:19 were the loss.

## Questions

- Does a second nightmare world seed at exploreDistance 600 also list a chest before 1:30 with hp still above about 80%? Added as E39.
- Do Great Wireworm and The Mandoline hits of 50 hp or more keep landing on steps the forecast prices as free, so the action model is never asked? Added as E38.
- If planner.pick says max HP beats crit while a boss is within 150, and Baked Potato beats Skip under 70% hp, do the 10:02 shrine and the late Skip picks flip? Added as E40.
- Boom Spud and Coal-Baked Spud stayed unused from 8:03 and 10:57 through death. The goal list has no use-item option, so a template cannot spend them. Filed as infrastructure.

## Beliefs changed

- B9: likely, held → likely, recheck. Skip won six times on a full build. Reroll still never won.
- B15: likely, held → likely, recheck. The ice-imp killing hits are logged with enemies_near 0.
- B18: likely, recheck → likely, disproved. +24 at 1:37 and +29 at 1:38, max hp still 120, no food goal.
- B22: evidence added (a chest 342 away opened at 11:15–11:22 at full hp). Confidence and status stay lead, recheck.
- B25: likely, held → likely, recheck. First chests at 1:08 under exploreDistance 600.
- B32: lead, held → likely, held. Second world run past 15:00 (15:03) on this directive and dash question.
- B33: lead, held → likely, held. Ice-imp 773 of 1179 and the killing blow.
- B11, B13, B17, B20, B21, B23, B26, B28, B29, B31, B34: evidence from this run added. Confidence and status unchanged.
- B35 added: game, lead, held. Non-food heals of about 24–46 with max hp unchanged, including before 3:00.
- B36 added: game, lead, held. Great Wireworm and The Mandoline deal 56–82 hp on a step the forecast prices as free.
- B37 added: game, lead, held. At exploreDistance 600, seed 127B4T9 listed a chest at 1:08 at 108/120.
- B38 added: planner, lead, held. On a full build, Skip beats Sack of Gold and Baked Potato at high hp, and Baked Potato wins when hp is lower.
- B39 added: planner, lead, held. The shrine question took crit over +23 max HP with Great Wireworm 94 away.

## Process changes

No coach prompt edit.

<!-- /review -->

## Picks

- **0:11** level-up: took Reset Button from Reset Button, Mash Wave, Chives.
- **0:11** gained without a pick (a chest or other): Reset Button 1/8 new.
- **1:08** level-up: took Reset Button from Gravy Splash, Reset Button, Tater Tot Pup.
- **1:08** gained without a pick (a chest or other): Reset Button 1/8 to 2/8.
- **1:10** gained without a pick (a chest or other): Reset Button 2/8 to 7/8.
- **1:11** gained without a pick (a chest or other): Reset Button 7/8 to 8/8.
- **1:26** level-up: took Four-Eyed Spud from Spud Cannon, Hash Brown Shield, Four-Eyed Spud.
- **1:26** gained without a pick (a chest or other): Four-Eyed Spud 1/5 new.
- **1:38** gained without a pick (a chest or other): Factory Reset 1/1 new, Reset Button gone.
- **1:39** level-up: took Spud Dice from Spry Sprout, Spud Dice, Tater Tot Pup.
- **1:39** gained without a pick (a chest or other): Spud Dice 1/8 new.
- **1:39** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **1:40** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **1:41** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 8/8.
- **1:43** gained without a pick (a chest or other): Spud Dice 1/8 to 2/8.
- **1:52** level-up: took Gravy Heart from Hot Start, Slow Cooker, Gravy Heart.
- **1:52** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **1:53** level-up: took Mash Landing from Starch Plating, Mash Landing, Sour Cream, Seeker Sprouts.
- **1:53** gained without a pick (a chest or other): Mash Landing 1/8 new.
- **1:57** level-up: took Sprouting Eyes from Spud Cannon, Sprouting Eyes, Mash Golem.
- **1:57** gained without a pick (a chest or other): Sprouting Eyes 1/5 new.
- **2:04** gained without a pick (a chest or other): Gravy Pack 1/1 new, Spud Dice 2/8 to 4/8, Tater Tot Pup gone.
- **2:07** gained without a pick (a chest or other): Spud Dice 4/8 to 5/8.
- **2:28** level-up: took Four-Eyed Spud from Lean Lunch, Spud Lob, Four-Eyed Spud.
- **2:29** gained without a pick (a chest or other): Four-Eyed Spud 1/5 to 2/5.
- **3:13** gained without a pick (a chest or other): Spud Dice 5/8 to 6/8.
- **3:20** gained without a pick (a chest or other): Spud Dice 6/8 to 7/8.
- **3:21** gained without a pick (a chest or other): Loaded Dice 1/1 new, Mash Landing 1/8 to 2/8, Spud Dice gone.
- **3:25** gained without a pick (a chest or other): Mash Landing 2/8 to 7/8.
- **3:27** gained without a pick (a chest or other): Mash Landing 7/8 to 8/8.
- **3:31** gained without a pick (a chest or other): Four-Eyed Spud 2/5 to 3/5, Sprouting Eyes 1/5 to 3/5.
- **3:31** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5, Sprouting Eyes 3/5 to 5/5.
- **3:34** level-up: took Spud Lob from Spud Lob, Sprout Satellites, Four-Eyed Spud, Reroll (1).
- **3:34** gained without a pick (a chest or other): Spud Lob 1/8 new.
- **3:36** level-up: took Frozen Fries from Four-Eyed Spud, Frozen Fries, Lean Lunch, Reroll (1).
- **3:37** gained without a pick (a chest or other): Frozen Fries 1/8 new.
- **3:46** level-up: took Spud Lob from Stuffed Skin, Root Network, Spud Lob, Spud Sneakers, Reroll (1).
- **3:46** gained without a pick (a chest or other): Spud Lob 1/8 to 2/8.
- **3:54** level-up: took Four-Eyed Spud from Gravy Heart, Four-Eyed Spud, Frozen Fries, Spud Lob, Reroll (1).
- **3:54** gained without a pick (a chest or other): Four-Eyed Spud 3/5 to 4/5.
- **3:55** level-up: took Four-Eyed Spud from Gravy Heart, Four-Eyed Spud, Chives, Reroll (1).
- **3:55** gained without a pick (a chest or other): Four-Eyed Spud 4/5 to 5/5.
- **4:00** level-up: took Frozen Fries from Gravy Heart, Spry Sprout, Spud Lob, Frozen Fries, Reroll (1).
- **4:00** gained without a pick (a chest or other): Frozen Fries 1/8 to 2/8.
- **4:03** level-up: took Frozen Fries from Packed Pan, Gravy Heart, Frozen Fries, Reroll (1).
- **4:03** gained without a pick (a chest or other): Frozen Fries 2/8 to 3/8.
- **4:04** level-up: took Hot Start from Frozen Fries, Hot Start, Gravy Heart, Packed Pan, Reroll (1).
- **4:04** gained without a pick (a chest or other): Hot Start 1/5 new.
- **4:06** gained without a pick (a chest or other): Frozen Fries 3/8 to 6/8.
- **4:21** level-up: took Thick Skin from Chives, Slow Cooker, Thick Skin, Reroll (1).
- **4:21** gained without a pick (a chest or other): Thick Skin 1/5 new.
- **4:42** level-up: took Spud Lob from Hot Start, Lean Lunch, Big Bowl, Spud Lob, Reroll (3).
- **4:43** gained without a pick (a chest or other): Spud Lob 2/8 to 3/8.
- **5:05** gained without a pick (a chest or other): Frozen Fries 6/8 to 7/8.
- **5:07** gained without a pick (a chest or other): Frozen Fries 7/8 to 8/8.
- **6:24** level-up: took Thick Skin from Thick Skin, Spud Lob, Hot Start, Big Bowl, Reroll (4), Skip (1).
- **6:24** gained without a pick (a chest or other): Thick Skin 1/5 to 2/5.
- **7:07** gained without a pick (a chest or other): Spud Lob 3/8 to 5/8, Permafrost Fries 1/1 new, Frozen Fries gone.
- **7:16** gained without a pick (a chest or other): Spud Lob 5/8 to 6/8.
- **7:18** gained without a pick (a chest or other): Spud Lob 6/8 to 8/8, Hot Start 1/5 to 2/5.
- **7:22** gained without a pick (a chest or other): Gravy Heart 2/5 to 3/5.
- **7:31** level-up: took Butter Pat from Hot Start, Thick Skin, Butter Pat, Reroll (6), Skip (1).
- **7:31** gained without a pick (a chest or other): Butter Pat 1/5 new.
- **7:58** level-up: took Butter Pat from Hot Start, Butter Pat, Gravy Heart, Reroll (6), Skip (1).
- **7:58** gained without a pick (a chest or other): Butter Pat 1/5 to 2/5.
- **7:58** level-up: took Butter Pat from Hot Start, Butter Pat, Gravy Heart, Thick Skin, Skip (1).
- **7:58** gained without a pick (a chest or other): Butter Pat 2/5 to 3/5.
- **7:59** level-up: took Butter Pat from Butter Pat, Hot Start, Thick Skin, Reroll (6), Skip (1).
- **7:59** gained without a pick (a chest or other): Butter Pat 3/5 to 4/5.
- **7:59** level-up: took Butter Pat from Butter Pat, Thick Skin, Gravy Heart, Reroll (6), Skip (1).
- **8:00** gained without a pick (a chest or other): Butter Pat 4/5 to 5/5.
- **8:03** gained without a pick (a chest or other): Boom Spud x1 new.
- **8:16** gained without a pick (a chest or other): Sack of Russets 1/1 new, Spud Lob gone.
- **8:46** level-up: took Gravy Heart from Gravy Heart, Hot Start, Thick Skin, Skip (2).
- **8:46** gained without a pick (a chest or other): Gravy Heart 3/5 to 4/5.
- **8:47** level-up: took Gravy Heart from Gravy Heart, Hot Start, Thick Skin, Skip (2).
- **8:47** gained without a pick (a chest or other): Gravy Heart 4/5 to 5/5.
- **8:48** level-up: took Hot Start from Thick Skin, Hot Start, Skip (2).
- **8:48** gained without a pick (a chest or other): Hot Start 2/5 to 3/5.
- **8:49** level-up: took Hot Start from Hot Start, Thick Skin, Skip (2).
- **8:49** gained without a pick (a chest or other): Hot Start 3/5 to 4/5.
- **8:52** level-up: took Hot Start from Hot Start, Thick Skin, Skip (2).
- **8:52** gained without a pick (a chest or other): Hot Start 4/5 to 5/5.
- **8:56** level-up: took Thick Skin from Thick Skin, Skip (2).
- **8:56** gained without a pick (a chest or other): Thick Skin 2/5 to 3/5.
- **9:11** gained without a pick (a chest or other): Thick Skin 3/5 to 4/5.
- **9:13** gained without a pick (a chest or other): Thick Skin 4/5 to 5/5.
- **10:02** shrine: took Crit chance 0% → 6% from Max HP 192 → 215, Crit chance 0% → 6%, Duration +25% → +32%.
- **10:13** level-up: took Skip (2) from Sack of Gold, Baked Potato, Skip (2).
- **10:13** level-up: took Skip (1) from Sack of Gold, Baked Potato, Skip (1).
- **10:14** level-up: took Baked Potato from Sack of Gold, Baked Potato.
- **10:57** vendor: took Coal-Baked Spud from Potato Knish, Pickle Jar, Coal-Baked Spud, Leave.
- **10:57** gained without a pick (a chest or other): Coal-Baked Spud x1 new.
- **11:59** level-up: took Skip (8) from Sack of Gold, Baked Potato, Skip (8).
- **11:59** level-up: took Skip (7) from Sack of Gold, Baked Potato, Skip (7).
- **12:31** level-up: took Baked Potato from Sack of Gold, Baked Potato, Skip (6).
- **12:56** level-up: took Baked Potato from Sack of Gold, Baked Potato, Skip (7).
- **13:16** level-up: took Baked Potato from Sack of Gold, Baked Potato, Skip (8).
- **13:34** level-up: took Skip (8) from Sack of Gold, Baked Potato, Skip (8).
- **14:02** level-up: took Baked Potato from Sack of Gold, Baked Potato, Skip (8).
- **14:02** level-up: took Skip (8) from Sack of Gold, Baked Potato, Skip (8).
- **14:26** level-up: took Baked Potato from Sack of Gold, Baked Potato, Skip (8).

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
Should Tibo dash? Yes only when 5 or more enemies are within 60 units, or when the damage taken in the last 3 seconds adds up to 5 hp or more. No if neither is true.
~~~

### knobs

~~~json
{
  "exploreDistance": 600,
  "evadeSeconds": 8,
  "gemsSeconds": 12,
  "stuckSeconds": 6,
  "extraDamage": 0.02,
  "safeMargin": 0.1
}
~~~
