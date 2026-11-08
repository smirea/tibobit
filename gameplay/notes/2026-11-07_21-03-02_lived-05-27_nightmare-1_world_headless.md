# 2026-11-07 21-03-02: lived 05:27 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=sdjp6zvxbeg6h&stats=A8iZAQCRCw7eAQBiNgECAeYPAwAD1giDygIACXUChyoC4wMD_dADJbcCdT8DCXpFnLYJ2-UhKE_uCY-n4_eMOgET5AK0ARQCAAEAAXgIAAAAywEAAAIRAQUIBgYCBJIBhgPYBooF8AMDCgk1IxwaewwYCRIEBQPJCjYSBRUFAbfeVQBiNlMBcbcrAfhHHgBgCBUGAQAHAgAACQcD7fcC5AIACgKcDxEBAxICA9YWAQEgEgAQ0S5_GsQhL8YMKEpZr5m2AA |
| Ending | died at 5:27, level 14, 1425 kills |
| Opening | first chest listed 1:30; 2 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 10 at 3:00 |
| Testing | E82, E69 |
| Seed | WJGN9N |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | d6dc5e9 docs(gameplay): grok reviews the 2026-11-07 20:42 run, lived 9:34, testing E91 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_21-03-02_nightmare-1_world_headless.csv |

## Outcome

- Lived **5:27** (327.6s), level 14, 1425 kills.
- Damage taken by source: boss:the-masher 85.1, enemy:bog-toad 82.8, boss:amusing 43.2, boss:beetle-queen 29.9, enemy:crumb-ant 20.8, enemy:oil-drip 19.6, Hot oil 18.7, enemy:fry-fly 17.1, enemy:bog-slime 5.6, enemy:potato-beetle 5.3, enemy:sock-pile 4.8, enemy:garden-slug 4.7, Brambles 4.7, enemy:lint-bunny 3.9, enemy:sprout-mite 3.7, enemy:frost-flea 3, enemy:ketchup-drop 2, enemy:aphid 1.5; 356 in all. Health gained over the run, by food, regeneration and anything else: about 221 (the game does not say from what).
- Weapons: Tater Tot Pup 8/8, Root Cellar 2/8.
- Passives: Gravy Heart 3/5, Bacon Bits 2/5, Slow Cooker 3/5.
- Items: Hot Pepper x2.
- Planner asked 114 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 112/120 | 9 | 0 | 4 | 28 | Hot oil, enemy:bog-slime |
| 1:00 | 128/149 | 43 | 57 | 7 | 73 | enemy:oil-drip, enemy:fry-fly |
| 2:00 | 49/149 | 80 | 0 | 10 | 114 | boss:amusing, enemy:crumb-ant |
| 3:00 | 87/149 | 24 | 60 | 11 | 180 | boss:beetle-queen, enemy:garden-slug |
| 4:00 | 27/149 | 121 | 60 | 13 | 171 | boss:the-masher, enemy:bog-toad |
| 5:00 | 4/163 | 68 | 44 | 14 | 188 | boss:beetle-queen, boss:the-masher |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00; The Masher (the-masher) at 4:00.
- First chest listed: 1:30. First time under 25% health: 4:51.
- Goals by kind (done / gave up / dropped): explore 28/0/22; spot 4/1/6; chest 2/2/0; evade 0/0/2; food 1/0/0.
- Dashes: 21 (1:32, 1:37, 1:42, 1:48, 2:02, 2:02, 2:11, 2:33, 2:39, 3:03, 3:27, 3:39, …).
- Model calls: 100 plans, 14 picks, 196 moves (mean 175ms); the page walked through 35 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 1:08 Gravy Heart 1/5 new; 1:45 Tater Tot Pup 4/8 to 7/8; 1:47 Bacon Bits 1/5 new; 1:59 Hot Pepper x1 new; 2:02 Slow Cooker 1/5 new; 3:05 Root Cellar 1/8 new.

## Plan

This run is a step toward Nightmare 10: no level is won yet, and items are the one area no run has scored, so this run asks how a shop puts an item on the board while the E91 stack still opens chests and evolves. The main question is E82. Directive line 3 and the two sentences after the generic planner.goal question say a Potato Crate or a Fry Cart is a yes when gold is at least 100 and no chest is listed, and a no when gold is under 100 or a chest is listed. If that holds, a shop goal starts on a plan in the yes state, and while a chest is listed the shop option stays near the 5–8% band instead of the 20–40% leak on UM213V. The same run carries E69, which cannot mask the goal scores: if none of the E91 weapon or catalyst cards is the one to take and an item is offered, planner.pick takes the item. Score E69 only when a card's kind is item. A shop that grants an item with no pick counts for E82 and leaves E69 inconclusive. The yes is inconclusive if gold never reaches 100, or a chest stays listed the whole time after that. Zero items is not a success. Before a chest, food, or that shop applies, the directive says: Otherwise, until a chest or food is listed, explore. Low health is line 2: If health is under 70% and food is listed, eat the food. Action templates, knobs, and the start stay the 9:34 run: tater-pup, exploreDistance 300, distrustBossRange 0.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary
This run tested E82 and E69 on Nightmare 1 world, seed WJGN9N, on the E91 pick stack with a shop sentence added to planner.goal. The bot played both tests. Gold crossed 100 at 1:45, a Potato Crate goal started at 1:54 with no chest among the options and bought Hot Pepper, and a Fry Cart goal at 2:00 bought a second Hot Pepper at the 2:04 vendor pick (68% over Leave). On the one plan with gold at 121 and a chest underfoot (1:52) the shop still scored 62–64%, so the 5–8% no is refuted on this seed. Tater Tot Pup reached 8/8 at 1:53 with Gravy Heart already held, the next chest failed at 2:40, nothing evolved, and The Masher (85.1) plus bog-toad (82.8) ended the run at 5:27 while a shop goal walked into both bosses.

## Findings
- The E82 yes was carried out. At 1:45 gold went 48 to 106 as the first chest opened, and no chest stayed listed. At 1:54 Charge the Potato Crate won at 84% with gold 147; by 1:59 gold was 117 and Hot Pepper x1 was on the board with no vendor row. At 2:00, gold 117 and no chest option, Charge the Fry Cart won at 83%. At 2:04 the vendor pick took Hot Pepper 68% over Leave 32%, gold 120 to 30, Hot Pepper x2. Two shop goals, two buys, one seed. Lead, and it is the purposeful test of the yes.
- Under gold 100 the same sentence held the shop at 3–5% on the opening plans (0:00 crate 5%, 0:05 crate and cart 4%, and the same band through 1:44). Lead, many plans, one seed.
- The chest half of the no failed on the only plan that had both conditions. At 1:52 gold was 121 and Tibo was on a chest, 0.7 of 1 second into opening it. Potato Crate scored 62% and 64%, Fry Cart 64%, and the chest still won at 77%. That is the 5–8% target missed, and it is above the 20–40% leak on UM213V. One plan, so the size of the leak is a lead. Enough to refute "stays near 5–8%".
- A Frenzy Fryer outscored the shop inside the yes window: 81% against Fry Cart 74% at 1:45, then 83% and 87% against shop options at 76–80% at 1:53. The crate goal started at 1:54, after the fryer channel ended. The fryer was also standing on the second chest, which opened at 1:53 and took the pup from 7/8 to 8/8. Lead.
- The recipe was ready at 1:53 (pup 8/8, Gravy Heart held since 1:08) and no later chest opened. Chest C196654, 127 down-left, ran from 2:31 and failed at 2:40 (no closer for 6 seconds). The retry scored 27% and explore down-left won at 30%. The chest then sat at 381, 674 and 1237 and never won again. First evolution none. Lead that the evolution is the next chest after the pup hits 8/8, and this one never opened.
- The Masher at 4:00 dealt 85.1, and minute 4 lost 121, on a kit that had opened two chests and had not evolved. A page walk at 4:30 lost 11 with boss:the-masher 11.2. Evolved boards on other seeds took 6.7 from him. Holding Gravy Heart with the pup at 8/8 did not produce that 6.7. Lead, one seed beside those earlier totals.
- The Beetle Nest that finished at 4:07, with The Masher listed, ended 143 to 110 with boss:the-masher 17.9 and enemy:bog-toad 15.8, and the next options included Fight the Bog Toad 6 down-right. Bog-toad is 82.8 on the outcome, the second source. Lead, and it matches the nest-wakes-a-toad shape from 1SGEC23 under a different boss.
- At 5:18 gold was 100, the only chest in the log was 1875 down (outside the 600-unit goal list), and Charge the Potato Crate won at 62% with Colorado Queen 66 up and The Masher 87 up, health 43/149. Evade won one plan at 5:21 (45% against the crate at 43%) after the Gravy Heart level. At 5:26 the crate restarted at 67%. The next step went 33 to 4 (boss:the-masher 11.2, enemy:bog-toad 17.7). Died 5:27. The shop yes has no boss clause. Lead.
- E69's one item card was taken. No level-up and no chest offered an item. The 1:59 pepper is the crate grant, scored on E82. Minute 2 lost 80 and gained 0, hurt most by amusing and crumb-ant. The log items field is "Hot Pepper x2" with no description, so the minute does not name an item effect. Lead on the pick, and the effect stays unread.
- The food line in planner.state lost at 3:16: health 42/149, food 173 down-right at 39%, explore up at 40%. It won at 3:29, food 45 down-right at 53%, 38 to 68. Same shape as the far-food losses already on the books. Lead.
- The Spud Freezer line won three times: 0:54 at 47% (154 up-right, done 0:58), 3:22 at 45% (254 left, done 3:29), 4:44 at 60% (83 up, failed 4:52 on hot oil). Two finishes. The "loses to explore" claim is refuted. Likely, with the earlier SBBOHY finish.
- Chest goals did start when a chest was close, on the generic goal question plus the state line: 91% at 1:30 (88 left), 77% at 1:52, 89% at 2:31. Two opened, two gave up. Gems never became the goal. Third seed on that pattern. The run was not a chest-question test, so the belief stays likely.
- Picks followed the E91 lines on every card those lines name. Pup 96%, 100% and 100% while below 5/8 (0:06, 0:24, 0:38). Gravy Heart 100% at 1:08, 98% at 1:40, 97% at 5:21. The 1/8 new-weapon ban had no conflicting offer. Bacon Bits and Slow Cooker won the cards the lines do not name.
- Opening damage was small. Minute 0 lost 9 (Hot oil, bog-slime) and ended 112/120. Hot oil on the whole run is 18.7. Amusing at 2:11 is the first large hit: one step 119 to 96 with boss:amusing 27.7, then a dash right at 67% and 96 to 83. Amusing on the outcome is 43.2. Minute 2 lost 80, gained 0, ended 49/149.
- Health gains of about 30 with no food goal and no max change landed at 1:47 (100 to 130), 3:35 (68 to 98), 4:01 (83 to 113), 4:03 (113 to 143) and 5:06 (27 to 57). The food goal at 3:29 is a separate +30. Gravy Heart level-ups moved the max (120 to 134 at 1:08, 134 to 149 at 1:40, 149 to 163 at 5:21). Lead, same pattern as earlier world runs.
- No earlier run uses seed WJGN9N, so there is no same-seed comparison. One sample.

## Went well
- From 0:00 to 1:30 the directive's explore line won, and every Potato Crate and Fry Cart stayed at 3–5% while gold was under 100. The under-100 half of E82 held on every opening plan.
- Pup levels at 0:06, 0:24 and 0:38, then Gravy Heart at 1:08 and 1:40, put the recipe one chest away from ready before amusing.
- The first chest, failed at 1:37, was restarted and opened at 1:45 (pup 4/8 to 7/8, gold 48 to 106). The second chest opened at 1:53 because Tibo was already standing on it inside the Frenzy Fryer (pup 7/8 to 8/8, gold to 147).
- The shop yes then bought twice: crate by 1:59, cart at 2:04. Hot Pepper x2 is the first tested item on a world outcome.
- Spud Freezer channels finished at 0:58 and 3:29. The 3:29 freezer was followed by food at 45 away, 38 to 68, and minute 3 lost only 24.
- Colorado Queen at 3:00, on the usual clock, dealt 29.9. Health was back to 87/149 at 4:00.

## Went poorly
- At 2:04 the cart was done and the next goals were explore. At 2:09 explore up-right pointed at amusing, then 131 up-right. At 2:11 a step lost 23 and the dash at 67% lost 13 more. Minute 2 ended at 49/149 with no heal. A keep-away on the boss-appeared plan at 2:00 would have left the cart for after he passed.
- The evolution chest from 2:31 never opened. The action model walked off the down-left approach the whole 2:31–2:40 window (crumb-ant in the hurt list, enemies_near up to 22), the goal failed, and explore won the retry by 3 points. Gravy Pack never happened. The Masher then took 85.1.
- At 3:16, health 42/149, the food 173 away lost 39% to 40%. The eat came at 3:29, after a freezer, and only because the food was 45 away.
- The Beetle Nest from 4:01 to 4:07 ran with The Masher on the field and finished on a bog toad at 6 units. That second is 27 hp, and bog-toad is 82.8 on the run.
- The Spud Freezer from 4:44 failed at 4:52. At 4:46 Tibo was inside it, charged 0.4 of 1.5, on hot oil, and the model stepped off. Health went 56 to 27. First time under 25% was 4:51.
- At 5:18 the shop yes became the goal with both bosses inside 100 and health at 43/149. The 5:26 restart is the death goal. A boss no on that sentence would have left the crate alone.

## Moments
- **0:38** Explore ended inside a Boss Lair, charged 2.1 of 3, then walked off. Better: step off a Boss Lair during explore. The queen still arrived at 3:00, on the clock, while another lair was charging at 1 of 3.
- **0:54** Spud Freezer at 154 up-right scored 47% and finished at 0:58. Right call.
- **1:08** Gravy Heart at 100% with the pup at 4/8. Right call. The catalyst was on the board 45 seconds before the pup maxed.
- **1:32** On the first chest, enemies_near 9, dash down-right at 61% carried the approach off the chest. The goal failed at 1:37 at 207 up. Better: keep away until the fry flies thin, then stand on it. The restart did open it at 1:45.
- **1:45** Gold 106, no chest listed, Fry Cart 74%, Frenzy Fryer 81%. Better: in a shop-yes test the shop has to beat an unnamed fryer, or the plan has to expect one stolen cycle. The fryer channel then stood Tibo on the second chest.
- **1:53** That chest opened, pup 7/8 to 8/8, Gravy Heart already held. Right call. The evolution was the next chest, and it was not this one.
- **1:54** Potato Crate at 84%, gold 147. By 1:59 Hot Pepper was on the board and gold was 117. Right call for E82. The goal row says dropped because the next plan chose another crate at that same second.
- **2:11** Amusing 14 up, one step 119 to 96 (boss:amusing 27.7), then dash right at 67% and 96 to 83. Better: keep away when he is inside 50. The 2:00 plan had picked the Fry Cart instead.
- **2:40** Evolution chest failed. Retry 27%, explore down-left 30%. Better: evade until enemies_near falls, then open the chest. Exploring away left the recipe unfinished through The Masher.
- **3:29** Food 45 down-right at 53%, eaten, 38 to 68. Right call. At 3:16 the same rule had lost 39% to 40% with the food 173 away.
- **4:07** Beetle Nest finished, 143 to 110, bog toad 6 down-right, masher ticks in the same window. Better: no nest while a boss is listed.
- **5:18** Potato Crate 62% with the queen 66 up and The Masher 87 up, health 43/149. At 5:26 the crate won again at 67% and the next step was the death. Better: the shop is a no while a boss is within 200.

## Questions
- Does a shop yes that also says no while a boss is within 200 keep the 5:18 crate from starting? Added as E106.
- Once the pup is 8/8 and Gravy Heart is held, does evade-then-chest after one failed open evolve Gravy Pack before The Masher and cut his total below 85.1? Added as E107.
- What does Hot Pepper change, once the outcome prints its description? Minute 2 on this run lost 80 to amusing with the pepper already at x2. Added as E108.

## Next
- E107, build. This run died at 5:27 with the recipe ready and the evolution chest abandoned at 2:40. The Masher total of 85.1 sits with the unevolved kits, and the evolved kits took 6.7. A goal sentence that evades a lethal chest approach and then opens the chest is the step that turns this board into the one that has reached 17 minutes. One change, on these templates, so the masher number stays readable. Inconclusive if the recipe is never ready before 4:00.
- E106, economy. The shop yes is real, and at 5:18 it walked into two bosses at 43 hp. The next shop run needs a boss no in that sentence or it will keep spending the death on the test. Run it after E107 so the two goal changes do not share a life.
- E108, items. Items had no done experiment before this run, and Hot Pepper x2 is now on an outcome with no description in the log. The campaign still has to learn what a buy is worth. Score it on the E91 board that actually evolves, and only against the source the description names. The infra request is what makes that score possible.

## Beliefs changed
- B62: status recheck to disproved. The freezer line won three goals here and finished two. The loses-to-explore claim does not hold.
- B81: status held to recheck. The 20–40% band missed. This seed scored 62–64% with a chest underfoot and gold 121, and 74–86% once gold was at least 100 and no chest was an option. The "no does not pin the score at 5–8%" half agrees with UM213V.
- B29: evidence added. Dash down-right at 1:32 (61%) on the first chest; the chest failed at 1:37 and opened at 1:45.
- B54: evidence added. Chest 127 down-left from 2:31 failed at 2:40, retry lost 27% to 30%, no evolution.
- B73: evidence added. Nest finish at 4:07 put a bog toad at 6 units, 15.8 in that window, 82.8 on the outcome. The boss was The Masher, so confidence stays lead.
- B83: evidence added. Page walk at 4:30 lost 11 with boss:the-masher 11.2. Outcome 85.1 without an evolution.
- B90: evidence added. Pup 8/8 plus Gravy Heart, no evolution chest, Masher 85.1. The 6.7 figure stays the evolved kit.
- B96: evidence added. Food at 173 away lost 39% to 40% at 42/149 (3:16). Food at 45 away won at 53% (3:29).
- B100: evidence added. Third seed, near chests 91%, 77% and 89%, two opens. Confidence stays likely.
- B101: evidence added. The named picks held (pup 96–100% below 5/8, Gravy Heart taken). Gravy Pack did not appear because the next chest failed.
- B106 added, planner, lead, held. At gold of 100 or more the E82 shop sentence scores about 60–86%, including 62% while standing on a chest. Under 100 gold it stays near 3–5%.
- B107 added, game, lead, held. The crate buy granted Hot Pepper with no vendor pick and gold 147 to 117. The cart then opened a vendor pick.
- B108 added, game, lead, held. Pup at 8/8 with Gravy Heart held still needs a later chest to evolve. That chest failed, and The Masher dealt 85.1.
- B109 added, planner, lead, held. A Frenzy Fryer outscores the shop inside the yes window until the fryer channel ends.
- B110 added, planner, lead, held. The shop yes starts a Potato Crate with bosses inside 100 and health under 40%, and that goal was the death at 5:27.
- B111 added, planner, likely, held. A directive line that a close Spud Freezer is also good can win the goal and finish the channel.
- B112 added, planner, lead, held. On an item-versus-Leave vendor choice the E69 sentence takes the item. One choice, Hot Pepper 68%.

## Process changes
No coach prompt was edited. The shop no sat in a second sentence after the generic "best thing" question. Belief B6 already says the start of the text weighs most, and this was one miss of that rule, so the plan file stays as it is.

<!-- /review -->

## Picks

- **0:06** level-up: took Tater Tot Pup from Tater Tot Pup, Thick Skin, Chip Shuriken.
- **0:06** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:24** level-up: took Tater Tot Pup from Chives, Root Network, Tater Tot Pup.
- **0:24** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **0:38** level-up: took Tater Tot Pup from Tater Tot Pup, Peeler, Hot Streak.
- **0:38** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **1:08** level-up: took Gravy Heart from Fry Knives, Skipping Cannonball, Gravy Heart.
- **1:08** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **1:40** level-up: took Gravy Heart from Hash Rush, Seed Potato, Gravy Heart.
- **1:40** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.
- **1:45** gained without a pick (a chest or other): Tater Tot Pup 4/8 to 7/8.
- **1:47** level-up: took Bacon Bits from Julienne Dash, Bacon Bits, Root Spikes, Reroll (1).
- **1:47** gained without a pick (a chest or other): Bacon Bits 1/5 new.
- **1:53** gained without a pick (a chest or other): Tater Tot Pup 7/8 to 8/8.
- **1:59** gained without a pick (a chest or other): Hot Pepper x1 new.
- **2:02** level-up: took Slow Cooker from Chip Shuriken, Gravy Boat, Slow Cooker, Reroll (2).
- **2:02** gained without a pick (a chest or other): Slow Cooker 1/5 new.
- **2:04** vendor: took Hot Pepper from Hot Pepper, Leave.
- **2:04** gained without a pick (a chest or other): Hot Pepper x1 to x2.
- **2:15** level-up: took Slow Cooker from Bacon Bits, Slow Cooker, Rotten Spud, Reroll (2).
- **2:15** gained without a pick (a chest or other): Slow Cooker 1/5 to 2/5.
- **2:33** level-up: took Slow Cooker from Butter Streak, Slow Cooker, Fry Lance, Reroll (2).
- **2:33** gained without a pick (a chest or other): Slow Cooker 2/5 to 3/5.
- **3:05** level-up: took Root Cellar from Root Cellar, Mash Snowball, Seed Potato, Reroll (2).
- **3:05** gained without a pick (a chest or other): Root Cellar 1/8 new.
- **4:01** level-up: took Bacon Bits from Hash Boomerang, Bacon Bits, Broadside, Reroll (2).
- **4:01** gained without a pick (a chest or other): Bacon Bits 1/5 to 2/5.
- **4:03** level-up: took Root Cellar from Mash Finisher, Root Cellar, Salt Shaker, Reroll (2).
- **4:03** gained without a pick (a chest or other): Root Cellar 1/8 to 2/8.
- **5:21** level-up: took Gravy Heart from Gravy Heart, Golden Fry, Frozen Fries, Reroll (2).
- **5:21** gained without a pick (a chest or other): Gravy Heart 2/5 to 3/5.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
2. If health is under 70% and food is listed, eat the food.
3. If gold is at least 100 and no chest is listed, go to a Potato Crate or a Fry Cart and stand on it. A Potato Crate or a Fry Cart is a no when gold is under 100 or a chest is listed.
4. Otherwise, until a chest or food is listed, explore.
5. Evade only when no chest and no food is listed.
6. A Spud Freezer that is close is also good: it freezes every enemy for 7.5 seconds.
7. At a level-up, chest or shrine: if Tater Tot Pup is below 5/8 and its level is offered, take Tater Tot Pup. Take a level of any other weapon already held while it is below 5/8. Take Gravy Heart for Tater Tot Pup or Peeler, Fertilizer for Seed Potato or Seeker Sprouts, Big Bowl for Whisk Vortex, or GPU for Chip Shuriken. A new weapon is a no while any held weapon is at 1/8. If none of those is the card and an item is offered, take the item.

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
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger? When that goal is a Potato Crate or a Fry Cart, say yes if gold is at least 100 and no chest is listed, and say no if gold is under 100 or a chest is listed.
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}. If Tater Tot Pup is below 5/8 and its level is offered, take Tater Tot Pup. Take a level of any other weapon already held while it is below 5/8. Take Gravy Heart for Tater Tot Pup or Peeler, Fertilizer for Seed Potato or Seeker Sprouts, Big Bowl for Whisk Vortex, or GPU for Chip Shuriken. A new weapon is a no while any held weapon is at 1/8. If none of those is the card and an item is offered, take the item. Which option is that?
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
