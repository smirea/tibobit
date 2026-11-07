# 2026-11-07 15-44-50: lived 18:20 on nightmare daily (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=6mrv1g0an17w4&stats=A-aCAwKevwRL82UBMU8LDQCNJw8ASaIAxO3yCQAplACum70FAK22ANaEuAMAlF8I2MhyAOD0ANmBMQDTmwiPrCkAJRIAo80jAC3aCM-_HQDlWgCHywgAxuEI86YIADwsAPCcAgBFVADY0wEAg50AtcUBAtg9AHicANoeBurtAhkqBfugBTh_BetHBX82BQUoT-P3CdvlIXpFgQkBE4cG1wQCFAABAAAAGAIAANIGBQACLAENDAoEEAgICA4MDg4MDMID9gjYEIwW4hr0IfokgkKWbJp16KAB4rQB3t0BAwcFgAYGLQIFBB4Pr-QBsGKRswGaE50DjAP8FfYC0QL6AcULPSo7oAEFHgUCB0hvdCBvaWySAgExT8EBASCOkAEByB9SAXG3LgYdBgAlEoIBAK22lAEA4PTQAgCDnUYBKZQCAUmisgEHAgEACQgD772OFYcGAAoC0T8RAQMVA5yiARYBASASABDmsHJYYQj-uAzAIqw5PgUA |
| Ending | died at 18:20, level 75, 73630 kills |
| Testing | E1 |
| Seed | DG0S-Z730R0 |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Coach prompts | coach-plan.md 1bd0fda2; coach-retrospective.md 25fb437e |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_15-44-50_nightmare_daily_headless.csv |

## Outcome

- Lived **18:20** (1100.2s), level 75, 73630 kills.
- Damage taken by source: Hot oil 274, boss:ketchup-kraken 193, boss:compost-titan 144, boss:deep-freezer 82, boss:amusing 46, boss:grater-golem 16, enemy:blight-spore 14, Spore vent 4.
- Weapons: Baked Alaska 1/1, Locked Gatling 8/8, Hungry Sprouts 1/1, Tot Toss 8/8, Reset Button 8/8, Fry Knives 8/8.
- Passives: Thick Skin 2/5, Fertilizer 5/5, Sprouting Eyes 5/5, Starch Plating 5/5, Lean Lunch 5/5, Hot Sauce 5/5.
- Items: Penny Spud x1.
- Planner asked 392 times.

## Plan

This is the baseline, E1, on today's Nightmare Daily. The planner and action templates stay the built-in ones, and every knob stays at its default, so the run carries no strategy and no game knowledge. The question is how long that lasts, and which damage sources in which minutes do the killing. If the hypothesis holds, Tibo dies before 5:00, goals wander among gems, exploring and the nearest chest, and picks never finish a recipe. Watch health and what is hurting Tibo around the collapse; later runs compare with this one.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary
E1 was carried out. The built-in templates and the default knobs ran the whole Nightmare Daily on seed DG0S-Z730R0, with no directive to follow. The prediction that this dies before 5:00 is refuted for this run: Tibo was level 21 at 60/129 at 4:56 and at 5:02, and the log ends at 18:20, level 75, 73630 kills, at 17/129. With no directive the planner evades, then collects gems, and opens chests in bursts that finished Permafrost Fries (2:09), Overgrowth (4:38), Big Fry (10:14), Baked Alaska (11:26) and Hungry Sprouts (14:24). Damage is hot oil (274) and bosses. Compost Titan (17:03) and Ketchup Kraken (18:04) are the late bosses, and the end row shows the same 17 hp as 18:10. One sample, and this is the only run on the seed.

## Findings
- The baseline survives the first five minutes on this seed. At 4:56 and 5:02 Tibo was level 21 at 60/129, and the run went on to 18:20. Confirmed for this run. The hypothesis is refuted. How often that happens on another seed is still open.
- The crowd barely hurt Tibo. Outcome totals are hot oil 274, boss:ketchup-kraken 193, boss:compost-titan 144, boss:deep-freezer 82, boss:amusing 46, boss:grater-golem 16, enemy:blight-spore 14, Spore vent 4. That is 755 from oil and bosses out of 773. enemies_near stayed 0 on almost every row, including 800 enemies around and 0 within 60 at 17:09, and 799 around at 18:20. Confirmed for this run.
- With no directive the planner evades, then collects gems, and opens chests in bursts. Evade was re-picked from 0:05 through 1:13, aside from a 3-second explore at 1:02, while a Potato Crate sat 31 away at 0:05. Gems took over at 1:21 and stayed the usual goal through 16:30. Chest bursts at 1:53–2:11, 4:13–4:38, 10:10–10:14, 11:21–11:26 and 14:18–14:24 are a tighter pattern than wandering to whatever chest is nearest. Confirmed for this run.
- Picks finished recipes, so the plan's expectation that they never would is refuted. Frozen Fries reached 8/8 at 1:59 and the chest at 2:09 produced Permafrost Fries. Seeker Sprouts hit 8/8 at 4:13, Fertilizer hit 5/5 at 4:14, and the chest at 4:38 produced Overgrowth. Small Fry became Big Fry at 10:14. Hot Potato plus Hot Sauce became Spicy Hot Potato at 11:24, and the chest at 11:26 replaced Permafrost Fries and Spicy Hot Potato with Baked Alaska. The chest at 14:24 replaced Overgrowth and Big Fry with Hungry Sprouts. Penny Spud was already in the inventory on the 14:23 row of that open. The end build was Baked Alaska, Locked Gatling 8/8, Hungry Sprouts, Tot Toss 8/8, Reset Button 8/8, Fry Knives 8/8, five passives at 5/5, and Thick Skin 2/5. Confirmed from the weapon columns.
- The pick question favours a card already being leveled, and the margin can be thin. It also takes a new weapon when that card scores higher, and it never took Reroll or Skip in the listed choices. Frozen Fries won at 78% (0:16), 74% (0:41), 38% (1:05, five points over Sprouting Eyes), 59% (1:28) and 65% (1:53). Fertilizer reached 84% at 4:14. New cards still won: Locked Gatling 41% at 4:15, Reset Button 73% at 11:35, Fry Knives 36% at 15:17. At 14:34 Reroll scored 23% against Reset Button 29%. At 17:58 the only card left was Thick Skin at 87% against Skip 13%. Confirmed for the listed picks.
- A boss on screen usually left the goal alone. amusing at 2:00 (176 away, then 0 away at 2:08) stayed a chest goal while hp went 105 to 57; boss:amusing on the 2:09 row is 45.7, matching the outcome 46. The Deep Freezer (14:00), The Great Wireworm (10:00), Sir Strawman (7:03), The Mandoline (12:04) and Grater Golem (16:00) stayed gems. The Masher at 4:01 has no hurt_by in the following rows. Compost Titan is the exception: at 17:03 gems were dropped mid-goal for evade, with the titan 90 down at 47% and a row of telegraphs. Confirmed for this run.
- Four named bosses left no line in the damage outcome: The Masher (4:01), Sir Strawman (7:03), The Great Wireworm (10:00) and The Mandoline (12:04, already at 16% health). Grater Golem's whole outcome total is 16. A rule that evades every boss would spend those minutes wrong. Confirmed for the outcome list. Lead for the next seed, one fight each.
- Compost Titan and Ketchup Kraken are the display names of those damage ids, and both hit while far away. Same-row pairs: 17:09 bosses "Compost Titan 184 down 1%" and hurt_by boss:compost-titan 61.9 (hp 129 to 67); 17:10 another 32 hp (hurt_by 123.8) while the titan stayed about 180 away; 17:14 another 21. That is about 115 of the outcome 144. Ketchup Kraken is on the 18:04 row with boss:ketchup-kraken 64.3 (hp 116 at 17:59 to 52, no move row in between), then the food goal ended at 18:10 at 17 hp (hp_lost 34) with the kraken 167 away. That is about 98 of the outcome 193. The rest of each total is not on a sampled row. Confirmed for the names and these hits. Lead: the attacks are the telegraphs and the scar, since the bosses were 140 to 180 away.
- Evading did not stop the titan. The goal was already evade at 17:09, and the chosen step forecast −2 hp on up-right while the past second had cost 62. At 17:10 several directions forecast no damage and the model dashed right, after another 32 had landed. Health then chunked back: 35 at 17:10, 65 at 17:12, 45 at 17:14, 75 at 17:20, 105 at 17:21, 129 at 17:33. Confirmed for the sequence. Likely: a planner rule that only switches the goal to evade does not answer this boss.
- The run's last logged state is 17/129, and the end detail says survived 18:20. hp stayed 17 at 18:10, 18:15, 18:18 and the 18:20 end row (hp_lost 0, Ketchup Kraken 289 down-left at 42%, telegraph underfoot, dash 0). The notes header records a death at 18:20. Confirmed for the rows. Lead: whatever ended the run is not a hit in the last 10 seconds of the log.
- Grater Golem was cheap on this seed. First named at 16:00 (178 up-left, 100%). At 16:04 the boss was 67 right, hurt_by boss:grater-golem 15.6, hp 126 to 110, and the model walked down-right, which forecast no damage. At 16:05 hp was 129. At 16:12 the boss was 196 away at 1%. Outcome total 16, so this hit is the whole of it. Confirmed for this fight.
- Chest channels fail because stand-still is ruled out before the model is asked, and the fail text talks about gold anyway. From 4:23 to 4:32 the model walked off C65921 while it was 0.4 to 1.1 seconds into a 1-second open. Staying forecast about −4 to −7 hp. extraDamage 0.02 of 129 is about 2.6 hp, so those stands are marked ruled out. The goal failed at 4:32 with "standing there did nothing for 6 seconds (it may cost gold Tibo lacks)" while gold was 510 and standing_on still said the chest was charging. The same chest was reopened and produced Overgrowth at 4:38. At 2:09 the channel reset from 0.5/1 to 0 as Permafrost Fries appeared, so that step-off still delivered the evolution. At 15:23 stand-still was ruled out at −3 hp during an open that completed anyway and took Reset Button from 5/8 to 8/8. Confirmed. The gold clause is false on the 4:32 row. A prompt that says "stand still" cannot choose a move the knob has already removed.
- Health returns in chunks of about 25 to 30 with no food goal, and those chunks are why the low points did not end the run. 57 at 2:11 to 83 at 2:17, 49 at 3:53 to 75 at 3:58, 55 at 4:15 to 84 at 4:20, 73 at 6:47 to 103 at 6:52, 92 at 7:23 to 122 at 7:28, 103 at 9:36 to 129 at 9:41, 84 at 14:12 to 113 at 14:16 during the freezer and before the food goal, 35 at 17:10 to 65 at 17:12, then 45 at 17:17 to 75 at 17:20 to 105 at 17:21. The 17:20 and 17:21 jumps are about 2 seconds apart, and the 17:21 pick opened with hp already 105, so the card taken (Lean Lunch) is not the heal. Confirmed for the jumps. The source is unseen. Lead: the early chunks are why 49/129 from 3:05 still reached 5:00, and the 17:12 chunk is why the titan did not end the run.
- Food heals about 30 when the row is quiet, and the last eat did not. 5:50 food goal at 49 hp, eaten at 5:53 at 79. 14:17 food at 88 hp during the freezer, eaten at 14:18 at 118. 16:45 food at 125 hp, eaten at 16:46 at 129 (the cap). 18:07 food at 52 hp with the kraken on the row, eaten at 18:10 at 17. Confirmed for these four. Lead: the 18:10 pickup was outpaced by the kraken hit, or it did not heal.
- Colorado Queen at 3:05 shares a row with boss:beetle-queen 2.2 (hp 52 to 49). That id is absent from the outcome totals. Lead that the names match.
- Spot visits were incidental, and two copies of one spot get swapped. The Spud Freezer finished at 9:24 (hp stayed 106) after the planner swapped P89 and P95 from 9:16 to 9:24; at 9:16 both freezers scored 57%. A second freezer finished at 17:59 (hp 116). Its description says bosses only slow. A Fry Cart was left at 0.5 to 0.7 of 1.5 seconds (3:28, 6:29, 11:47). A Stray Dog was left at 0.7 of 1 at 11:21. A Moldy Shrine was stood in at 0.5 of 1.5 at 17:06 during the titan and not finished. No Beetle Nest was charged. Confirmed. This run did not carry out a visit-every-spot test.

## Went well
- 1:53 to 1:59, two chests opened and Frozen Fries went from 5/8 to 8/8, so the 2:09 chest had a finished weapon to evolve.
- 4:13 to 4:14, Fertilizer was taken to 5/5 immediately after Seeker Sprouts hit 8/8, the Overgrowth pair, and the chest at 4:38 evolved it even after the failed channel.
- 5:50 to 5:53, the early food goal, 49 hp to 79. Health was 129/129 by 7:28 and mostly stayed there until the freezer.
- 9:13 to 9:24, the planner left gems, reached a Spud Freezer, and finished the channel. hp stayed 106.
- 11:21 to 11:26, two chests turned a maxed Hot Potato into Spicy Hot Potato and then into Baked Alaska.
- 14:08, the action model took the no-damage side of the Deep Freezer after the forecast priced −72 hp on the right. 14:17 to 14:18, food during that fight, 88 hp to 118, then the chest at 14:24 made Hungry Sprouts.
- 16:04, the action model took the no-damage side of Grater Golem. The boss was at 1% by 16:12 and the outcome damage is 16.
- 17:03, the one time a boss pulled the planner off gems onto evade, with Compost Titan 90 away and telegraphs underfoot.
- 17:59, the second Spud Freezer finished charging. The pick list through 17:58 had filled every weapon slot and five passive slots.

## Went poorly
- 0:05 to 1:21, evade after evade while hot oil ticked (2.4 at 0:05, then 1.5, 3.6, 6, 7.5 across 0:14–0:16, hp 129 to 119, then 111 by 0:25) and a crate 31 away was ignored. Evade has no direction, so every costly step asked the action model, and enemies_near was 0. The crate, or a step off the burn, was the better goal.
- 2:00 to 2:09, the amusing fight. The planner held the chest from 176 away down to contact. hp 105 to 57. At 2:06 up and up-right forecast no damage. At 2:07 every walk was ruled out and standing still (forecast −11 hp) was the only legal move. Evade should have won once the boss was inside about 30 and a no-damage step existed.
- 2:40 to 5:50, hot oil held hp around 49 to 68, with food on screen from 3:20 (172 away) and the planner on gems or evade. Eating at 3:20 would have spent that plateau on a heal. The chunk to 75 at 3:58 is what actually lifted it, and the real food goal waited until 5:50.
- 4:15 to 4:32, level-ups and a chest channel inside a burn (hot oil 14.8 at 4:15, hp about 72 down to 55, then a chunk to 84 by 4:20) and then six seconds of stepping off a chest that was already charging. Standing still for the rest of the second was the better play, and the knob had removed that move. The reopen still evolved Overgrowth at 4:38.
- 9:16 to 9:24, the planner swapped between two Spud Freezers three times before one of them finished. One freezer, held to the end of the channel, was the better goal. The cost this time was seconds, and hp stayed 106.
- 14:00 to 14:18, gems stayed the goal through the Deep Freezer. Drops of about 20 hp at 14:08, 14:12 and 14:16, about 62 of the outcome 82. The 14:12 drop is on a plan row and has no move row. A chunk from 84 to 113 landed before the food goal. Evade should have won after the first hit, even though the 14:08 step itself took the safe side.
- 17:06, during the titan evade, Tibo stood inside a Moldy Shrine at 0.5 of 1.5 seconds. The description on the row says a curse brings extra elites and bosses. Leaving it unfinished was lucky; starting it was the wrong approach.
- 17:09 to 17:14, about 115 hp from Compost Titan while the goal was already evade and the boss was ~180 away at 1% health. The safe-looking step did not price the hit. No goal change available in this template set had a move that forecast it.
- 18:04 to 18:10, Ketchup Kraken, 144 then 167 away, hp 116 to 52 with no move row, then a food goal that ended at 17 hp. From 18:10 to 18:20 the log shows 17 hp and no new hit, one minute and forty seconds short of 20:00, with an otherwise full build.

## Moments
- **0:05** Explore up-right was dropped for evade. A Potato Crate was 31 away and hot oil had just dealt 2.4. Better: open that crate.
- **0:16** Evade steps walked through oil and hp fell 127 to 119. The goal text has no away-direction. Better: the step whose forecast leaves the burn.
- **1:59** The second chest opened and Frozen Fries hit 8/8. Right call.
- **2:08** amusing was on top of Tibo, hp 78, and the planner kept the chest. By 2:09 hp was 57 and Permafrost Fries had evolved. Better: evade once a no-damage step existed at 2:06.
- **3:20** hp 49/129, food 172 away, and the planner started gems. Better: eat. The plateau at 49 lasted until the chunk at 3:58.
- **4:32** C65921 failed after the model spent six seconds stepping off a charging chest, with 510 gold. Stand still was ruled out. Better: stand still for the rest of the second. It was reopened, and Overgrowth arrived at 4:38.
- **5:53** The food goal ended eaten, hp 79, up from 49 at 5:50. Right call, and late.
- **11:26** The chest open replaced Permafrost Fries and Spicy Hot Potato with Baked Alaska. Right call.
- **14:08** The Deep Freezer forecast −72 hp on the right and no damage on the left. The model walked left, after a hit of about 20 had already landed. Right call for the step. Better: the planner should already have left gems.
- **16:04** Grater Golem forecast a heavy hit on the right and no damage on down-right. The model walked down-right. hp was 129 a second later, and the boss was at 1% by 16:12. Right call.
- **17:09** Compost Titan was 184 away at 1% and the goal was already evade. The step forecast −2 hp and the row had lost 62. Better: nothing the questions were offered had priced this hit. The dash right at 17:10, onto a no-damage forecast, was the right step after it.
- **18:10** The food goal ended eaten at 17 hp, down from 52, with Ketchup Kraken 167 away. hp was still 17 at 18:20. Better: a step off the scar before the long walk to food.

## Questions
- Does stepping off hot oil, and not evading while enemies_near is 0 and no boss is close, cut the 274 oil damage and still live past 5:00? Already E12.
- If stand-still is actually offered during a chest channel, do the failed opens stop? The 4:32 failure is the extraDamage filter ruling out a −4 to −7 forecast, so a prompt change alone cannot test it. E13 raises extraDamage to 0.06 and tells the action model to stay.
- The display names are on the same rows as the ids. Compost Titan is boss:compost-titan and Ketchup Kraken is boss:ketchup-kraken. The open question is the gap between the logged drops (about 115 and 98) and the outcome totals (144 and 193), and what the 18:20 end row is, since it shows 17 hp and no new hit. E14 stays done and inconclusive on the killing-blow clause. The end-row wording is already an infrastructure request.
- Do the ~30 hp chunks (2:17, 3:58, 4:20, 6:52, 7:28, 9:41, 14:16, 17:12, and twice at 17:20 and 17:21) repeat on the next run, and are they why both the 49 hp plateau and the titan failed to end it? E15, with the 14:12-to-14:16 rise added. Unreadable as a source until heals are logged.
- Does a finished food goal heal about 30 only when no boss hit lands in the same seconds? E1: +30 at 5:53, +30 at 14:18, a cap at 16:46, and 52 to 17 at 18:10 during the kraken. Already E16.
- Is Grater Golem cheap enough, and are The Masher, Sir Strawman, The Great Wireworm and The Mandoline empty enough, that a blanket "evade every boss" rule would give up the wrong minutes? E1 stayed on gems through all five. Grater Golem cost 16 and was at 1% twelve seconds later. The other four are absent from the damage outcome. E17 covers Grater Golem. E9's test now records the empty minutes too.
- For a boss that hits from 150 or more away, does switching the goal to evade change the damage at all? E1 already evaded from 17:03 and lost about 115 to Compost Titan by 17:14, while amusing (contact, chest kept) cost 46. E9 treats those as different minutes.
- Once a charge has started, does holding that spot beat swapping to a second copy of the same kind? From 9:16 to 9:24 the planner swapped two Spud Freezers that had both scored 57%, then one finished and hp stayed 106. Added as E18.

## Beliefs changed
- B7 added. about game. confidence lead, status held. Crowds barely hurt; oil and bosses are the damage. Evidence is this run only.
- B8 claim narrowed. Old claim: a boss on screen does not change the goal. New claim: with no directive the planner evades through the first minute and then collects gems, and a boss on screen usually does not replace that goal. The titan at 17:03 did switch gems to evade, so the old wording rested on more than this run shows. Confidence stays lead. Status stays held.
- B9 evidence extended. The claim is unchanged: the default pick favours a held card, never took Reroll or Skip here, and still finished five recipes. The 1:05 win was only 38% to 33%, and Locked Gatling, Reset Button and Fry Knives were taken as new weapons. Confidence stays lead. Status stays held.
- B10 added. about game. confidence lead, status held. Health rises about 25 to 30 with no food goal on the row, and the source is not logged.
- B11 added. about game. confidence lead, status held. A finished food goal heals about 30 when no boss hit lands in the same seconds.
- B12 added. about game. confidence lead, status held. Compost Titan and Ketchup Kraken hit from 140 or more away, and the one-second forecast does not price the hit.
- B13 added. about action. confidence lead, status held. At extraDamage 0.02, stand-still on a chest is removed when the forecast is worse than about 3 hp, so a prompt cannot finish that channel.
- B14 added. about game. confidence lead, status held. On this seed, evading every boss would spend cheap minutes: Grater Golem cost 16, and four other named bosses left no damage outcome.

## Process changes
None. No coach prompt was edited.

<!-- /review -->

## Picks

- **0:16** level-up: took Frozen Fries from Spry Sprout, Root Network, Frozen Fries.
- **0:25** level-up: took Seeker Sprouts from Seeker Sprouts, Big Bowl, Four-Eyed Spud.
- **0:41** level-up: took Frozen Fries from Golden Fry, Potato Magnet, Frozen Fries.
- **1:05** level-up: took Frozen Fries from Sprouting Eyes, Gem Sling, Frozen Fries.
- **1:12** level-up: took Thick Skin from Seeker Sprouts, Masher Grip, Thick Skin.
- **1:28** level-up: took Frozen Fries from Frozen Fries, Seeker Sprouts, Hot Sauce.
- **1:53** level-up: took Frozen Fries from Frozen Fries, Thick Skin, Mash Finisher.
- **2:02** level-up: took Seeker Sprouts from Seeker Sprouts, Spud Sneakers, Gravy Heart.
- **2:09** level-up: took Fertilizer from Tailgate Fries, Masher Grip, Fertilizer, Reroll (1).
- **2:36** level-up: took Seeker Sprouts from Hot Start, Hot Potato, Seeker Sprouts, Reroll (1).
- **3:02** level-up: took Sprouting Eyes from Root Network, Tater Trot, Sprouting Eyes, Reroll (1).
- **3:28** level-up: took Fertilizer from Fertilizer, Grab Bag, Lean Lunch, Reroll (1).
- **4:03** level-up: took Fertilizer from Sprouting Eyes, Hot Potato, Fertilizer, Reroll (1).
- **4:13** level-up: took Fertilizer from Sprouting Eyes, Fertilizer, Lean Lunch, Reroll (1), Skip (1).
- **4:13** level-up: took Seeker Sprouts from Thick Skin, Fertilizer, Seeker Sprouts, Reroll (1), Skip (1).
- **4:14** level-up: took Sprouting Eyes from Hot Start, Sprouting Eyes, Thick Skin, Reroll (1), Skip (1).
- **4:14** level-up: took Fertilizer from Thick Skin, Butter Pat, Fertilizer, Reroll (1), Skip (1).
- **4:15** level-up: took Locked Gatling from Locked Gatling, Hot Start, Hot Potato, Reroll (1), Skip (1).
- **4:35** level-up: took Hot Potato from Couch Potato, Tater Trot, Hot Potato, Reroll (1), Skip (1).
- **4:56** level-up: took Sprouting Eyes from Hot Sauce, Sprouting Eyes, Small Fry, Reroll (2), Skip (2).
- **5:40** level-up: took Small Fry from Small Fry, Hot Potato, Sprouting Eyes, Reroll (3), Skip (4).
- **6:13** level-up: took Starch Plating from Starch Plating, Sprouting Eyes, Locked Gatling, Reroll (5), Skip (4).
- **6:14** level-up: took Small Fry from Locked Gatling, Tater Trot, Small Fry, Reroll (5), Skip (4).
- **6:15** level-up: took Sprouting Eyes from Sprouting Eyes, Hot Sauce, Starch Plating, Reroll (5), Skip (4).
- **7:05** level-up: took Lean Lunch from Slow Cooker, Lean Lunch, Spud Sneakers, Reroll (6), Skip (5).
- **7:16** level-up: took Sprouting Eyes from Hearty Helping, Sprouting Eyes, Hot Potato, Reroll (6), Skip (6).
- **7:17** level-up: took Lean Lunch from Stuffed Skin, Thick Skin, Lean Lunch, Reroll (6), Skip (6).
- **7:49** level-up: took Hot Sauce from Thick Skin, Big Bowl, Hot Sauce, Reroll (10), Skip (7).
- **8:36** level-up: took Small Fry from Starch Plating, Tot Toss, Small Fry, Reroll (11), Skip (7).
- **9:13** level-up: took Small Fry from Locked Gatling, Small Fry, Thick Skin, Reroll (11), Skip (7).
- **9:16** level-up: took Locked Gatling from Thick Skin, Hot Sauce, Locked Gatling, Reroll (11), Skip (7).
- **9:17** level-up: took Small Fry from Hot Potato, Starch Plating, Small Fry, Reroll (11), Skip (7).
- **9:25** level-up: took Hot Potato from Hot Potato, Thick Skin, Hot Sauce, Reroll (12), Skip (7).
- **9:59** level-up: took Small Fry from Small Fry, Hot Potato, Afterburner Fries, Reroll (13), Skip (8).
- **10:24** level-up: took Starch Plating from Locked Gatling, Lean Lunch, Starch Plating, Reroll (16), Skip (8).
- **10:25** level-up: took Hot Potato from Hot Sauce, Thick Skin, Hot Potato, Reroll (16), Skip (8).
- **10:26** level-up: took Hot Potato from Locked Gatling, Hot Potato, Thick Skin, Reroll (16), Skip (8).
- **10:26** level-up: took Tot Toss from Lean Lunch, Thick Skin, Tot Toss, Reroll (16), Skip (8).
- **10:38** level-up: took Hot Potato from Lean Lunch, Starch Plating, Hot Potato, Reroll (19), Skip (9).
- **10:44** level-up: took Starch Plating from Starch Plating, Lean Lunch, Tot Toss, Reroll (20), Skip (9).
- **11:06** level-up: took Hot Potato from Hot Potato, Lean Lunch, Thick Skin, Reroll (21), Skip (12).
- **11:20** level-up: took Hot Potato from Hot Potato, Locked Gatling, Hot Sauce, Reroll (23), Skip (13).
- **11:21** level-up: took Hot Sauce from Thick Skin, Locked Gatling, Hot Sauce, Reroll (23), Skip (13).
- **11:35** level-up: took Reset Button from Hot Sauce, Reset Button, Thick Skin, Reroll (26), Skip (13).
- **11:59** level-up: took Locked Gatling from Locked Gatling, Thick Skin, Tot Toss, Reroll (26), Skip (13).
- **12:04** level-up: took Starch Plating from Tot Toss, Reset Button, Starch Plating, Reroll (27), Skip (15).
- **12:06** level-up: took Reset Button from Lean Lunch, Reset Button, Hot Sauce, Reroll (27), Skip (15).
- **12:35** level-up: took Starch Plating from Starch Plating, Locked Gatling, Lean Lunch, Reroll (31), Skip (15).
- **12:41** level-up: took Locked Gatling from Hot Sauce, Locked Gatling, Reset Button, Reroll (31), Skip (15).
- **12:41** level-up: took Tot Toss from Tot Toss, Hot Sauce, Thick Skin, Reroll (31), Skip (15).
- **12:55** level-up: took Locked Gatling from Thick Skin, Locked Gatling, Tot Toss, Reroll (31), Skip (15).
- **12:56** level-up: took Tot Toss from Tot Toss, Hot Sauce, Thick Skin, Reroll (31), Skip (15).
- **13:21** level-up: took Locked Gatling from Locked Gatling, Reset Button, Thick Skin, Reroll (32), Skip (15).
- **13:22** level-up: took Tot Toss from Tot Toss, Hot Sauce, Lean Lunch, Reroll (33), Skip (15).
- **13:33** level-up: took Tot Toss from Thick Skin, Tot Toss, Lean Lunch, Reroll (34), Skip (15).
- **13:53** level-up: took Tot Toss from Reset Button, Tot Toss, Hot Sauce, Reroll (35), Skip (19).
- **14:04** level-up: took Locked Gatling from Locked Gatling, Thick Skin, Hot Sauce, Reroll (36), Skip (20).
- **14:34** level-up: took Reset Button from Gem Sling, Reset Button, Tailgate Fries, Reroll (40), Skip (23).
- **14:36** level-up: took Reset Button from Lean Lunch, Reset Button, Hot Sauce, Reroll (40), Skip (23).
- **15:01** level-up: took Reset Button from Reset Button, Lean Lunch, Thick Skin, Reroll (40), Skip (23).
- **15:17** level-up: took Fry Knives from Lean Lunch, Fry Knives, Thick Skin, Reroll (42), Skip (24).
- **15:22** level-up: took Fry Knives from Fry Knives, Thick Skin, Lean Lunch, Reroll (42), Skip (25).
- **15:34** level-up: took Fry Knives from Fry Knives, Lean Lunch, Hot Sauce, Reroll (43), Skip (26).
- **15:40** level-up: took Fry Knives from Fry Knives, Hot Sauce, Lean Lunch, Reroll (43), Skip (27).
- **15:55** level-up: took Fry Knives from Fry Knives, Hot Sauce, Lean Lunch, Reroll (45), Skip (27).
- **16:10** level-up: took Fry Knives from Fry Knives, Hot Sauce, Lean Lunch, Reroll (47), Skip (27).
- **16:33** level-up: took Fry Knives from Hot Sauce, Lean Lunch, Fry Knives, Reroll (50), Skip (27).
- **16:45** level-up: took Hot Sauce from Thick Skin, Hot Sauce, Lean Lunch, Skip (27).
- **16:45** level-up: took Hot Sauce from Lean Lunch, Hot Sauce, Thick Skin, Skip (27).
- **17:06** level-up: took Hot Sauce from Thick Skin, Lean Lunch, Hot Sauce, Skip (28).
- **17:08** level-up: took Lean Lunch from Lean Lunch, Thick Skin, Skip (29).
- **17:21** level-up: took Lean Lunch from Lean Lunch, Thick Skin, Skip (31).
- **17:56** level-up: took Lean Lunch from Lean Lunch, Thick Skin, Skip (33).
- **17:58** level-up: took Thick Skin from Thick Skin, Skip (33).

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
