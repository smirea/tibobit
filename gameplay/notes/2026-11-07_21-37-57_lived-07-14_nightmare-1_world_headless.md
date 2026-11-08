# 2026-11-07 21-37-57: lived 07:14 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=dr4h1c5sz7w6c&stats=A9zLAQCRMRLGBQBWLQUHAMgUBwCQrQDU6RIAFA0I9OYDAIzOANvYAgAJVQLhzwEAA9YBnzkAy-cC9gMCWwV_NgT90AL7oAE4fwG2LgEKekWMOu4Jj6coT-Uh4_cJ25y2AxYBEvUBVgcIAAEAAAAIAAQA1AEBAAIXAQcKBgQCDAIA9AGQBaAJnA7sD4wWpBgDCwohPA4WQBZKKFgSBA0HyBmYBZ4N-AOYAQECBRsFAfOsUgFv9S0AVi0eAfhHEAIHSG90IG9pbBAGBgEAkK2ZAgcCAAAJBwPzthv1AQAKAvQdEQEDEgID1hYBASASABDRLn8axCEvxgwoSlmvmbYA |
| Ending | died at 7:14, level 18, 6289 kills |
| Opening | first chest listed 1:33; 2 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution 4:41; level 10 at 3:00 |
| Testing | E113 |
| Seed | WEWS93 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | 572ec12 docs(gameplay): grok reviews the 2026-11-07 21:21 run, lived 8:10 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_21-37-57_nightmare-1_world_headless.csv |

## Outcome

- Lived **7:14** (434.6s), level 18, 6289 kills.
- Damage taken by source: boss:sir-strawman 81.8, boss:late-blight 45, enemy:blight-spore 29.5, boss:beetle-queen 16.3, Hot oil 16.1, boss:the-masher 9.6, enemy:spittlebug 8.6, Spore vent 7.9, Brambles 5.5, enemy:fry-fly 5.2, enemy:potato-beetle 4.5, enemy:tomato-leech 4.3, enemy:sprout-mite 3.5, enemy:crumb-ant 3.3, enemy:oil-drip 2.6, enemy:lint-bunny 1.3; 245 in all. Health gained over the run, by food, regeneration and anything else: about 112 (the game does not say from what).
- Weapons: Tater Tot Pup 1/8, Gratin Arc 1/1, Spud Lob 2/8, Chip Shuriken 8/8, Hash Brown Shield 2/8.
- Passives: Hot Sauce 4/5, Gravy Heart 2/5, Sprouting Eyes 1/5, Starch Plating 1/5, GPU 1/5.
- Items: none.
- Planner asked 165 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 109/120 | 12 | 0 | 5 | 29 | Hot oil, enemy:lint-bunny |
| 1:00 | 108/120 | 13 | 12 | 8 | 71 | enemy:potato-beetle, enemy:tomato-leech |
| 2:00 | 119/134 | 4 | 14 | 10 | 93 | enemy:crumb-ant, Hot oil |
| 3:00 | 126/134 | 38 | 43 | 11 | 129 | boss:beetle-queen, enemy:spittlebug |
| 4:00 | 143/149 | 16 | 33 | 17 | 116 | Spore vent, boss:the-masher |
| 5:00 | 146/149 | 8 | 10 | 18 | 135 | Brambles, Spore vent |
| 6:00 | 142/149 | 4 | 0 | 18 | 145 | boss:late-blight |
| 7:00 | 1/149 | 141 | 0 | 18 | 182 | boss:sir-strawman, boss:late-blight |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00; The Masher (the-masher) at 4:00; Late Blight (late-blight) at 6:00; Sir Strawman (sir-strawman) at 7:00.
- First chest listed: 1:33. First time under 25% health: 7:12.
- Goals by kind (done / gave up / dropped): explore 49/0/7; chest 5/0/1; evade 15/0/2; spot 1/0/0.
- Dashes: 7 (0:46, 0:54, 1:19, 3:05, 3:47, 4:09, 7:11).
- Model calls: 148 plans, 17 picks, 448 moves (mean 195ms); the page walked through 10 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:12 Starch Chain 1/8 new; 0:20 Spud Lob 1/8 new; 0:45 Chip Shuriken 1/8 new; 1:55 Hot Sauce 1/5 new; 1:56 Starch Chain 4/8 to 8/8; 2:09 Gravy Heart 1/5 new; 3:05 Sprouting Eyes 1/5 new; 4:00 Hash Brown Shield 1/8 new; 4:02 Starch Plating 1/5 new; 4:41 Gratin Arc 1/1 new, Starch Chain gone; 5:21 Chip Shuriken 5/8 to 8/8; 6:00 GPU 1/5 new.

## Plan

This run is a step toward Nightmare 10. Nightmare 1 still has no 20:00, and the last champion-template life died at 8:10 because explore walked into The Fryer King and The Great Wireworm (minute 8 lost 170, boss:fryer-king 106.4). It tests E113 with one change, planner.goal, on the 21-21-05 champion templates, the same knobs, and tater-pup. Until a chest or food is listed, with no boss within 200, the question says yes to explore, including when health is low and no food is listed. When health is under 70%, food is listed, no chest is listed, and no boss is within 200, it says yes to eating the food. When a chest is listed and no boss is within 200, it says yes to opening that chest. When a boss is within 200, it says yes only to keep-away or evade. If that holds, explore is the goal before 2:00, keep-away wins once amusing is within 200, chests open in the quiet window, and a run that reaches 8:00 with an evolution loses less than 170 in minute 8 with boss:fryer-king under 106.4. Minute-8 damage is inconclusive if Fryer King never appears or Tibo dies before 8:00; the opening and the amusing plans are still the result. A fryer total of zero counts only when he was listed. The food sentence is the champion eat-under-70% rule, placed on the option so the generic question can come off while food stays.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested E113 on seed WEWS93: the champion templates from the 8:10 run, with planner.goal as the only change. The goal rules were played and held. Every goal before 2:00 was explore or a near chest, and keep-away won every plan while a boss stayed inside 200, including when chests were listed. The minute-8 cut is unscored: Tibo died at 7:14, Fryer King never appeared, and the food-under-70% sentence never had its state. The bar stayed near full through 6:00 (142/149) and minute 7 lost 141 to Sir Strawman (81.8), Late Blight (45) and blight-spore (29.5) on an evade whose forecast called the killing steps free. One world seed, so the goal result is one purposeful sample.

## Findings

- E113's explore sentence kept the opening on explore. From 0:00 to 2:00 every goal was explore except the chests at 1:33 and 1:55, keep-away sat at 27–41%, and no spot, elite or gems goal started. Confirmed on this seed; it was the test, and the plans agree with each other.
- While a boss was inside 200, keep-away won every plan: amusing 2:00–2:14 (61–72%), Colorado Queen 3:00–3:49 (45–73%), The Masher 4:00–4:32 (43–66%), Late Blight 6:00–6:05 (62–68%), Sir Strawman 7:00–7:13 (55–69%). At 3:13 chests 49 and 115 away scored 35% and 32% against keep-away 58%. At 4:00 the open-chest goal was dropped, keep-away 43%. Confirmed on this seed. E66 never had a chest listed in that window; this run did.
- The minute-8 claim is not a result. Death at 7:14, no fryer-king line, evolution already out (Gratin Arc at 4:41). The plan's own branch says that half is inconclusive.
- The food sentence never applied. Health stayed at or above 70% until the Strawman minute. At 7:13 food at 145 and 147 scored 21% against keep-away 55%, with Late Blight 78 away, so the boss rule was the one in force. Do not score eat-under-70% here.
- A chest within about 50 and no boss inside 200 became the goal and opened: 1:33 at 45 (95%), 1:55 at 41 (95%), 5:16 at 28 (90%), 5:19 at 14 (82%). A chest at 111 lost at 2:16 (59% vs explore 71%) and won at 4:38 (78%). Chests past 250 usually lost; one at 425 scored 80% at 3:59 and the goal started, then Masher cancelled it. Lead, one seed.
- After Late Blight left 200, keep-away still won twice: 6:08 at 218 units (60%) and 6:13 at 306 (45%). At 6:16, with him at 277, explore won 45% to 43%. The question already says no to keep-away in that state. Lead.
- Sir Strawman closed from 165 to 16 between 7:00 and 7:05 while the goal stayed evade and health went 142 to 141. Late Blight closed from 340 to melee in the same minute. The contact window then took the bar: minute 7 lost 141 and gained 0, first time under 25% health at 7:12, dead at 7:14. Lead.
- Steps the forecast called free were the Strawman damage the model was allowed to take. At 4:08 every direction was forecast free and the chosen step lost 10, Masher 113 away, his whole outcome of 9.6. At 7:10 stand still was the only move still offered, forecast free, hurt 1.78, lost 26 (strawman 29.3, late-blight 16, blight-spore 11.4). At 7:12 up-right was forecast free, hurt 0.54, lost 19. At 7:14 up-right was forecast free, hurt 0.32, useful 59% over stand still 25%, and lost the last 15. These were model steps, so distrustBossRange would not have put them on the page. Lead.
- The generic pick left Tater Tot Pup at 1/8. It was offered at 0:20 (24% vs Spud Lob 63%), 1:55 (6% vs Hot Sauce 84%) and 3:05 (15% vs Sprouting Eyes 36%). Gravy Heart was taken at 2:09 anyway. The only evolution was Gratin Arc at 4:41, Starch Chain consumed. Chip Shuriken hit 8/8 at 5:21 and GPU was taken at 5:59, and no later chest came inside 600, so that recipe never fired. Lead.
- The Masher total of 9.6 on this unevolved keep-away board contradicts reading 109.7 as what every unevolved kit takes. Minute 4 lost 16 and ended 143/149. One step, one seed. B90 goes to recheck.
- A finished Crop Patch at 6:33–6:38, health already 142/149, added gold 684 to 692 and no health. Same shape as the 6:12 patch on the 8:10 run. Bears on B93, which stays on recheck.
- Boss clock on this seed matches the held ladder: amusing 2:00, Colorado Queen 3:00, The Masher 4:00, Late Blight 6:00, Sir Strawman 7:00. No same-seed prior run. WEWS93 is new.

## Went well

- 0:00–1:56 explore found two chests and opened both. Starch Chain reached 8/8 at 1:56. Health ended minute 1 at 108/120 after losing 13.
- Boss minutes before Strawman stayed cheap under keep-away. Minute 2 lost 4. Minute 3 lost 38 and gained 43, queen's own line 16.3. Minute 4 lost 16, Masher 9.6. Minute 6 lost 4, and ended 142/149.
- 3:13 and 4:00 are the chest-during-boss case E66 missed, and the chest lost both times.
- 4:38 the quiet-window chest at 111 won at 78% and opened at 4:41 into Gratin Arc. Chip Shuriken went 4/8 to 8/8 on the 5:16 and 5:19 chests.

## Went poorly

- 0:46 a dash at 54% went right into hot oil (window 5.7) and onto a Beetle Nest. The up-left step was the one leaving the oil. Hot oil ended at 16.1, most of it in the opening (minute 0 lost 12).
- 0:20, 1:55 and 3:05 the pup was on the card and lost. The board that met Strawman was Pup 1/8, Gratin Arc, Spud Lob 2/8, Chip Shuriken 8/8, Hash Brown Shield 2/8, GPU 1/5 with no chest left to evolve the chips.
- 2:16 a chest 111 down, no boss listed, lost to explore 71% to 59%. The question said to open it.
- 6:08 and 6:13 keep-away continued with Late Blight at 218 and 306. Cost was small (minute 6 lost 4) and it was still the wrong goal.
- 6:33 a Crop Patch at 95% health won at 51% and gave +8 gold and no heal. The explore sentence does not say no to a charge spot.
- 7:00–7:14 evade held the goal and lost the run. Strawman walked from 165 to 16 for free, then forecast-free steps took 26, 19 and 15. At 7:10 every exit was ruled out by the forecast, so the hurt question had nothing else to pick. Food at 7:13 could not win while he was inside 200.

## Moments

- **0:00** Explore up-right 83%, keep-away 38%. Better: right call.
- **0:46** Dash right at 54% into hot oil and a Beetle Nest, window 5.7. Better: take the up-left step that was leaving the oil.
- **1:33** Chest 45 left at 95%, opened at 1:34. Better: right call.
- **2:00** Amusing 173 up-right, keep-away 61%, explore dropped. Better: right call.
- **2:16** No boss listed, chest 111 down at 59%, explore up 71%. Better: open that chest.
- **3:13** Queen 130 away, chests at 49 and 115 scored 35% and 32%, keep-away 58%. Better: right call.
- **4:00** Masher 156, the chest goal dropped, keep-away 43%. Better: right call.
- **4:08** Every direction forecast free; the chosen step lost 10 to The Masher at 113, his whole 9.6. Better: a boss tick has to count as damage even when the forecast says none.
- **6:08** Late Blight 218, keep-away 60%. Better: explore; he is outside 200.
- **7:05** Strawman went from 165 to 16 during evade, health still 141. Better: be walking away while he is still at 165; the free approach is the failure.
- **7:10** Stand still was the only offered move, forecast free, hurt 1.78, lost 26 to Strawman, Late Blight and blight-spore. Better: the exits the forecast called costly have to be offered, because the free step was the hit.
- **7:14** Up-right forecast free, hurt 0.32, useful 59%, lost the last 15. Better: that direction names the bosses, so it should lose to standing still on hurt.

## Questions

- On this same goal text, does an action.hurt sentence that rates a forecast-free step as a bad hit when it names Sir Strawman or Late Blight inside 100 raise those hurt scores and cut minute 7 below 141? E125.
- Does the E91 pup sentence, added only to planner.pick on this goal stack, take the pup on the 0:20-style offer and put Gravy Pack on the board before 7:00? E126.
- When a weapon is maxed, its catalyst is held, and every listed chest is past 600, does explore toward that chest's direction get a second evolution, where Chip Shuriken 8/8 plus GPU from 5:59 got none? E127.
- After the boss passes 200, does one more "no" on keep-away stop the 6:08 and 6:13 wins, or does the model keep the goal it just finished? E128.
- Does saying no to charge spots in the quiet-window explore rule stop a full-health Crop Patch like 6:33? E129.

## Next

Nightmare 1 still has no 20:00. This policy held a near-full bar to 7:00 with one evolution and then lost it to two bosses the forecast called safe. The goal rule is no longer the gap. The open area that matches the death is models: what the action model does with a boss step the forecast prices at nothing. Build is the other lever, because this generic pick never leveled the pup, and earlier evolved boards met a cheaper Strawman on other seeds.

- E125, models. One hurt sentence on the E113 stack. If the 7:14-style choice flips, the minute-7 wall moves without a new goal type. If the bad step is the only one offered, the result says so and the infra request is the follow-up.
- E126, build. The pup sentence alone, same goals. Scores the three-offer failure directly, and a Gravy Pack before Strawman is the readout that says whether the board was the other half of minute 7.
- E127, map. Aim explore at a chest past 600 once a recipe is ready. This run's second evolution was stuck behind the 600-unit offer limit from 5:59 to the death. E114 stays proposed and waiting: Fryer King never appeared, and the killing steps were already model steps, which is the case E114 says the knob does not fix.

## Beliefs changed

- B26, held, likely stays likely. Evidence now includes WEWS93's clock through Sir Strawman at 7:00.
- B64, held, likely stays likely. Claim now includes Gratin Arc from Starch Chain at 8/8; catalyst not on the row.
- B71, lead to likely, held. Second run of boss-within-200 goal lines, and the listed-chest case held.
- B89, lead to likely, held. The explore-yes pairing stopped the opening leak on this seed.
- B90, likely, held to recheck. Unevolved keep-away kit took Masher 9.6, not 109.7.
- B93, recheck stays recheck. Another finished Crop Patch that did not fill health (142/149, +8 gold).
- B122, lead, held to recheck. Same generic question refused the pup on three offers.
- B126 added, planner, confirmed, held. E113 explore-yes and boss-within-200 keep-away, every scored plan on this seed.
- B127 added, planner, lead, held. Keep-away can win again just after the boss passes 200.
- B128 added, action, lead, held. Forecast-free steps during this evade were the Strawman minute's damage.
- B129 added, game, lead, held. Strawman closed 165 to 16 in one evade cycle without taking health.
- B130 added, planner, lead, held. E113 chest-yes is reliable near 50 units and shaky past about 100.

## Process changes

None. The plan's branch for a death before 8:00 matched the run, and the opening and boss plans were still scorable.

<!-- /review -->

## Picks

- **0:12** level-up: took Starch Chain from Deep Fryer, Fry Cook Sentry, Starch Chain.
- **0:12** gained without a pick (a chest or other): Starch Chain 1/8 new.
- **0:20** level-up: took Spud Lob from Tater Tot Pup, Salt Shaker, Spud Lob.
- **0:20** gained without a pick (a chest or other): Spud Lob 1/8 new.
- **0:22** level-up: took Spud Lob from Tater Mines, Tater Twirl, Spud Lob.
- **0:22** gained without a pick (a chest or other): Spud Lob 1/8 to 2/8.
- **0:45** level-up: took Chip Shuriken from Four-Eyed Spud, Butter Socks, Chip Shuriken.
- **0:45** gained without a pick (a chest or other): Chip Shuriken 1/8 new.
- **1:10** level-up: took Chip Shuriken from Stuffed Skin, Hash Rush, Chip Shuriken.
- **1:10** gained without a pick (a chest or other): Chip Shuriken 1/8 to 2/8.
- **1:33** level-up: took Starch Chain from Starch Chain, Chives, Spud Lob, Skip (1).
- **1:33** gained without a pick (a chest or other): Starch Chain 1/8 to 2/8.
- **1:34** gained without a pick (a chest or other): Starch Chain 2/8 to 4/8.
- **1:55** level-up: took Hot Sauce from Tater Tot Pup, Clean Plate, Hot Sauce, Reroll (1), Skip (1).
- **1:55** gained without a pick (a chest or other): Hot Sauce 1/5 new.
- **1:56** gained without a pick (a chest or other): Starch Chain 4/8 to 8/8.
- **2:09** level-up: took Gravy Heart from Spud Lob, Gravy Heart, Tot Toss, Reroll (1), Skip (1).
- **2:09** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **2:21** level-up: took Hot Sauce from Hot Sauce, Gravy Heart, Hash Boomerang, Reroll (1), Skip (1).
- **2:21** gained without a pick (a chest or other): Hot Sauce 1/5 to 2/5.
- **3:05** level-up: took Sprouting Eyes from Spud Lob, Tater Tot Pup, Sprouting Eyes, Reroll (1), Skip (2).
- **3:05** gained without a pick (a chest or other): Sprouting Eyes 1/5 new.
- **4:00** level-up: took Hash Brown Shield from Spud Lob, Gem Sling, Hash Brown Shield, Reroll (1), Skip (3).
- **4:00** gained without a pick (a chest or other): Hash Brown Shield 1/8 new.
- **4:01** level-up: took Hot Sauce from Gravy Splash, Hot Sauce, Hash Brown Shield, Reroll (1), Skip (3).
- **4:01** gained without a pick (a chest or other): Hot Sauce 2/5 to 3/5.
- **4:02** level-up: took Starch Plating from Root Network, Thick Skin, Starch Plating, Reroll (1), Skip (3).
- **4:02** gained without a pick (a chest or other): Starch Plating 1/5 new.
- **4:04** level-up: took Hot Sauce from Seed Potato, Hot Sauce, Spud Lob, Reroll (1), Skip (3).
- **4:04** gained without a pick (a chest or other): Hot Sauce 3/5 to 4/5.
- **4:05** level-up: took Hash Brown Shield from Fry Knives, Hash Brown Shield, Mezzaluna, Reroll (1), Skip (3).
- **4:06** gained without a pick (a chest or other): Hash Brown Shield 1/8 to 2/8.
- **4:38** level-up: took Gravy Heart from Gravy Heart, Bacon Bits, Potato Magnet, Reroll (1), Skip (3).
- **4:38** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.
- **4:41** gained without a pick (a chest or other): Gratin Arc 1/1 new, Chip Shuriken 2/8 to 4/8, Starch Chain gone.
- **5:18** gained without a pick (a chest or other): Chip Shuriken 4/8 to 5/8.
- **5:21** gained without a pick (a chest or other): Chip Shuriken 5/8 to 8/8.
- **5:59** level-up: took GPU from Hot Sauce, Hash Brown Shield, GPU, Reroll (1), Skip (3).
- **6:00** gained without a pick (a chest or other): GPU 1/5 new.

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
  "eliteSeconds": 20,
  "lockstep": 0
}
~~~
