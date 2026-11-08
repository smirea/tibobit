# 2026-11-07 19-46-16: lived 04:21 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=gh62gapvhc13g&stats=A7B6ANQOEawBAbfeAgAAkg0HAMk6BICoAQBFVAOxbQDTmwK8OQB54gHwNAAD1gG8HAA8LAGLFQKKBAOxgwEZKgNWZwEDekWMOihPARK1ATwYBAABAQAABgEAAKUBAAACDgEECggIBsQBxgPACMIMAwUD5wERDQQNB9AFigSSAfYBkQFBIAUVBQG33m4Ax_giAXG3DACjgAwAnQYGBgEABwIAAAkHA665A7UBAAoC-hARAQMSAgPWFgEBIBIAEGAnnHMF7jIxDI72Y9DfOgA |
| Ending | died at 4:21, level 17, 1876 kills |
| Opening | first chest listed 1:30; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 13 at 3:00 |
| Testing | E27 |
| Seed | UM213V |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | 21d9df5 docs(gameplay): grok reviews the 2026-11-07 19:31 run, lived 3:23, testing E75 |
| Coach prompts | coach-plan.md c05498af; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-46-16_nightmare-1_world_headless.csv |

## Outcome

- Lived **4:21** (261.1s), level 17, 1876 kills.
- Damage taken by source: boss:the-masher 109.7, enemy:potato-beetle 34.4, boss:amusing 12.2, enemy:tomato-leech 12.1, enemy:sprout-mite 5.6, enemy:ketchup-drop 5.3, enemy:aphid 1.7; 181 in all. Health gained over the run, by food, regeneration and anything else: about 60 (the game does not say from what).
- Weapons: Tater Tot Pup 1/8, Small Fry 3/8, Fry Lance 1/8, Fry Knives 2/8, Tater Twirl 4/8, Seeker Sprouts 1/8.
- Passives: Hot Start 1/5, Fertilizer 3/5, Salt Shaker 1/5.
- Items: none.
- Planner asked 96 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 111/120 | 8 | 0 | 5 | 28 | enemy:potato-beetle |
| 1:00 | 119/120 | 1 | 9 | 9 | 71 | enemy:sprout-mite |
| 2:00 | 120/120 | 13 | 15 | 13 | 99 | boss:amusing, enemy:aphid |
| 3:00 | 120/120 | 36 | 36 | 16 | 136 | enemy:potato-beetle, enemy:tomato-leech |
| 4:00 | 10/120 | 108 | 0 | 17 | 164 | boss:the-masher, enemy:potato-beetle |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00; The Masher (the-masher) at 4:00.
- First chest listed: 1:30. First time under 25% health: 4:08.
- Goals by kind (done / gave up / dropped): explore 11/0/2; gems 17/0/0; spot 0/0/1; elite 1/0/0; evade 2/0/0.
- Dashes: 27 (0:18, 1:13, 1:23, 1:40, 2:01, 2:02, 2:13, 2:19, 2:25, 2:30, 2:40, 2:46, …).
- Model calls: 79 plans, 17 picks, 133 moves (mean 223ms); the page walked through 10 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:15 Small Fry 1/8 new; 0:18 Hot Start 1/5 new; 0:30 Fry Lance 1/8 new; 0:43 Fry Knives 1/8 new; 1:19 Tater Twirl 1/8 new; 1:30 Fertilizer 1/5 new; 2:25 Seeker Sprouts 1/8 new; 4:09 Salt Shaker 1/5 new.

## Plan

This run explores shops, which no finished experiment has touched, on the way to Nightmare 10. The last grok stack died at 3:23, so this run plays the 17:14 champion and changes the shop rule only. The directive says: until a chest or food is listed, explore; if a chest is listed, go and open it; if health is under 70% and food is listed, eat the food. Chests are often unlisted before about 1:30, so the opening goal is explore. planner.goal carries the test: a Fry Cart or a Potato Crate is a yes when gold is at least 100 and no chest is listed, exploring and collecting gems are a no then, and the shop is a no when a chest is listed. Dash, tater-pup, and the knobs stay on the champion, including distrustBossRange 0. The explore line and the shop sentence do not mask each other: the shop is scored only once one is listed. If the hypothesis holds, a shop goal starts on a plan that lists a Fry Cart or a Potato Crate with gold at least 100 and no chest listed. The run is inconclusive when neither shop is listed, or gold stays under 100. A shop that appears only beside a chest tests the no. A buy is a lead on whether the gold was worth spending: read the item and the next minute.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary
This run tested E27 on world seed UM213V: a planner.goal yes for a Fry Cart or a Potato Crate when gold is at least 100 and no chest is listed, and a no for that shop when a chest is listed. The yes never had a plan to score. Potato Crate was listed from 0:00, Fry Cart was never listed, gold was still 87 at 3:07, and chests had been listed since 1:30 because none were opened. The no was on the board from 3:08 (gold 114) to the death at 4:21, and it did not hold as a low score: crate options rose from about 6% to 20–40% and still lost to gems, so no shop goal and no buy happened. Health stayed full through 3:00 (level 13,  the queen left no damage line) and minute 4 lost 108, almost all to The Masher. The campaign wall on this seed is the chest line living only in planner.state: zero chest goals, no evolution, then a 4:00 boss the unevolved kit could not stand in.

## Findings
- E27's yes is untested. A shop goal was required only on a plan with gold at least 100 and no chest listed. Gold was 0–4 through 1:25, 25 at 1:30, and 87 at 3:07; the 3:08 level-up row is the first at 114, and death came at 172. Chests were in the log from 1:30 through 4:21. Fry Cart never appears. Potato Crate was in the poi list from the 0:00 plan. Shop goals started: 0. Buys: 0. Items: none. Confidence: confirmed for this log. The hypothesis is not scored on the missing state.
- While a chest was listed, the crate-no failed as a score the moment gold crossed 100. At 3:07 (gold 87) Charge the Potato Crate was 6% and 5%. At 3:08 (gold 114) the same kind of option was 25%, 22% and 23%. Later crate scores include 40% and 35% at 3:14, 40% at 3:27, and 39% at 3:51. The floor after 3:08 is about 16% (4:09, 4:11), still far above the pre-100 band. Gems stayed near 40–57%, so no crate goal started. One seed. Confidence: lead.
- The champion chest line in planner.state started no chest goal. Open-chest lost to gems or explore whenever both were offered: 1:30 chests 29 and 34 up-left at 27–28% against gems 56%; 1:41, with no gems left, chests 72 down at 21% and 23% against explore down-left 41%; 3:14 a chest 40 down at 25% against gems 54%, one second after an elite kill dropped it; 3:20 a chest 23 down-left at 24% against gems 57%; 3:44 a chest 37 up at 26% against gems 55% and explore left 48%; 3:51 a chest 49 up at 32% against gems 50%. Goals by kind have no chest row (explore 11/0/2, gems 17/0/0, spot 0/0/1, elite 1/0/0, evade 2/0/0). The shop paragraph says yes and no only about the shop option, and "say no to exploring or collecting gems" sits inside that shop conditional, so the gems question falls through to "is this the best thing". One seed, and this goal text is the only change from the champion. Confidence: likely that this wording is what held chests near 20–32%.
- Before any chest, the state line "until a chest or food is listed, explore" also lost stretches to gems. Gems goals ran at 0:05, 0:18, and from 0:52 through 1:28, with gems at 34–56%. Crate scores in that window stayed 5–10% while gold was under 30, which is the under-100 half of the shop sentence behaving. Confidence: lead.
- The Masher, first seen at 4:00 at 170 up-right, is 109.7 of 181 damage. Minute 4 ended 10/120, lost 108, gained 0. From 4:00 (120 hp, gems 48%, keep-away 31%) to 4:03 (96 hp) two 11-hp steps landed, one of them a page walk at 4:03 (masher 6.7 in that window, distrustBossRange 0). Evade then won at 39% and the goal end at 4:11 says the 8 seconds lost 74 health (96 to 22). A step scored no damage still lost 11: at 4:07 walk left, hurt 0.67, Masher 41 up, and the next row is 22 hp with 11 lost. At 4:21 every direction was forecast dead, the chosen walk right was hurt 1.79, and the end row names no source in the last 3 seconds. The outcome list already sums to 181, and the masher is the minute. One seed. Confidence: lead.
- Colorado Queen at 3:00 (174 up-left, 100%) fell to 35% by 3:07 and is absent from the bosses column at 3:08. She has no outcome line. Minute 3 lost 36 and gained 36, ending 120/120, hurt most by potato-beetle and tomato-leech. Amusing, first seen at 2:00, is 12.2 on the outcome, and minute 2 ended full. Confidence: lead.
- The level-up picks filled all 6 weapon slots by 2:25 (Seeker Sprouts) and left Tater Tot Pup at 1/8 for the whole run. Highest weapon at death is Tater Twirl 4/8. Fertilizer reached 3/5 with Seeker Sprouts at 1/8. First evolution: none. Level 17 and 1876 kills came from 17 gems goals, with 0 chests opened. Confidence: confirmed as the loadout; lead that an opened chest still had no finished recipe waiting.
- Tibo stood inside a Potato Crate four times and left before 1.5 seconds: 3:01 at 0.4 (gold 86), 3:37 at 0.2 (gold 149), 3:42 at 0.3 (gold 152), 4:00 at 0.6 (gold 170). No item was gained. The log text says the crate costs gold and never says the price. Confidence: confirmed.
- At 2:01 a dash on a walked step scored 68% with enemies_near 7 and health 119/120, and it dashed. The crowd clause cleared 0.5 on this seed with no 5 hp drop. The run dashed 27 times. One row against the XEPS03 stretch where the same clause stayed under 0.5. Confidence: lead, and B28 stays on recheck.

## Went well
- Health held through the bosses that usually end these runs. Minute ends: 0:00 111/120, 1:00 119/120, 2:00 120/120, 3:00 120/120. Amusing 12.2. The queen minute netted zero.
- The Spud Shrine Tibo walked into at 1:57 (0.5 of 5 seconds) was charged to a choice at 2:01. Damage +6% won at 73% over pickup range 15% and duration 12%. Health was still 119 when amusing was 126 down.
- The only elite goal, Fight the Potato Beetle at 3:14, killed in about 0.4 seconds (gold 116 to 127) and dropped a chest 40 down. The fight itself was free.
- Gems farming is why the clock reached 4:21 at level 17 with 1876 kills. The early beetle ticks (8 hp in minute 0) were the only damage before the bosses, and food was never listed, so the under-70% eat line had nothing to do.

## Went poorly
- From 1:30 to 4:00 the listed chests were the power on the map and the planner left them. The closest calls are the 23-unit chest at 3:20 (24% vs gems 57%) and the 37-unit chest at 3:44 (26% vs gems 55%). Zero opened by 2:30 and zero opened at all, so nothing evolved.
- The shop test could not reach its yes, and the no did not pin the crate score. Gold crossed 100 at 3:08 only after chests had been sitting since 1:30. Crate scores then lived at 20–40% until death.
- Four partial crate channels (3:01, 3:37, 3:42, 4:00) walked off at 0.2–0.6 of 1.5 seconds. Items stayed none, so the buy is still unread.
- Picks spent the early levels on new weapons. At 2:25 the sixth slot filled with Seeker Sprouts while the starting pup was still 1/8. A later chest would have had Twirl at 4/8 and no catalyst pair ready.
- At 4:00, with the Masher 170 up-right and chests 55–99 away, gems won at 48% over keep-away 31%. The page then walked one 11 hp hit at 4:03 (distrustBossRange 0). Evade from 4:03 lost 74 hp in 8 seconds while the masher sat inside about 50 and steps labeled no damage still cost 11.

## Moments
- **0:00** Explore up-right 33% over Potato Crate options at 7% and 6%, gold 0. Better: right call.
- **0:18** Beetle ticks had taken health from 120 to 111 and a dash left scored 56% with enemies_near 3. Better: right call.
- **1:30** First chests, 29 and 34 up-left, scored 28% and 27%. Gems scored 56% and stayed the goal. Better: open the chest. The state line already said to.
- **1:41** Gems ended with none left. Chests 72 down scored 21% and 23%. Explore down-left scored 41%. Better: open the chest.
- **2:00** Amusing appeared 172 down during a shrine channel at 3.6 of 5 seconds. The shrine scored 53% and the choice opened at 2:01. Better: right call to finish it. Amusing ended at 12.2 for the run.
- **2:25** Seeker Sprouts taken at 68%, sixth weapon, pup still 1/8. Better: put the level into a weapon already held so a chest has something to finish.
- **3:08** Gold 114, the first row past 100. A crate 22 down scored 25% with chests listed, and a chest 42 left also scored 25%. Gems scored 53%. Better: open the chest, and the crate sentence should have been a low score.
- **3:14** Potato Beetle died in 0.4 seconds and a chest sat 40 down. The next plan scored that chest 25% and gems 54%. Better: open the chest the elite just dropped.
- **3:20** Chest 23 down-left at 24%, gems 57%, health 97/120. Better: open it. This is the clearest missed chest of the run.
- **4:00** The Masher at 170 up-right, health 120, gems 48%, keep-away 31%, chests about 55–99 away at 22–26%. Better: keep away, or open the nearest chest before he closes.
- **4:03** Evade started at 96 hp after an 11 hp page walk (masher 6.7 plus beetles). The 8-second evade lost 74. Better: the keep-away had to win at 4:00, while he was still 170 away. Once he was inside 20, steps scored no damage were already 11 hp ticks.
- **4:21** At 10 hp every move was forecast dead, telegraphs were underfoot, and walk right (hurt 1.79) was chosen. Died at 4:21. The end row names nothing in the last 3 seconds. Better: there was no scored safe step left. The miss was the three minutes of skipped chests before 4:00.

## Questions
- If planner.goal says yes on the open-chest option, and says no on the gems option and the explore option while a chest is listed, does a chest goal start when one is within about 100 units? UM213V's comparison point is 3:20: chest 23 away at 24%, gems 57%, and no chest goal all run.
- Once a chest-yes policy can clear the listed chests, does the shop yes start a Potato Crate or Fry Cart goal on a plan with gold at least 100 and no chest listed? And while a chest is still listed, can the crate option be held near the 5–8% band it had here under gold 100, instead of the 20–40% band it had after 3:08?
- On a run that has opened chests, does The Masher still tick about 11 hp on steps scored no damage inside 50 units, and does distrustBossRange 400 or a keep-away yes while he is within 200 cut his total below the 109.7 he dealt to this unevolved kit?

## Next
- E80, the chest yes written on the chest option and the gems/explore no written on those options. This run's 4:21 is a level-17 kit with no evolution, and the champion seeds that opened chests lived 14 to 17 minutes. A chest goal is also the only way E27's yes-state can exist, because a shop test that waits for "no chest listed" never gets there while listed chests are ignored. One change, on this run's stack.
- E81, the shop retry, only after E80. Economy still has nothing done. Score a shop goal only when gold is at least 100 and no chest is listed, and score the crate-no while a chest is listed against this run's 6% to 25% jump at 3:08. A buy, if one happens, is a lead: name the item and read the next minute. The crate's price is still missing from the log.
- E82 waits behind those. The Masher is what killed this run, and he did it to a build that had never opened a chest. Other seeds on the champion stack have lived past 4:00, so his 109.7 is not yet the ladder's wall. Test him once a chest policy is in the templates.

## Beliefs changed
- B2, evidence extended. Confidence stays likely, status stays held. The crate option's own sentence moved its score when gold crossed 100. The chest line, present only in planner.state, moved no chest goal.
- B21, status likely/held to likely/recheck. On UM213V the state line "if a chest is listed, go and open it" started 0 chest goals from 1:30 to 4:21, including a chest 23 away at full health.
- B22, evidence extended. Status stays recheck. A chest 23 away at 97/120 scored 24% and lost to gems 57%. Distance and low health do not explain that loss.
- B28, evidence extended. Confidence stays confirmed, status stays recheck. At 2:01 the crowd clause dashed at 68% with enemies_near 7 and health 119. This seed clears 0.5. XEPS03 did not.
- B80 added, planner, lead, held. At gold at least 100, Potato Crate scores about 20–40% while a chest is listed, up from about 5–8% below 100. The no in that sentence did not hold the score down. No crate goal started.
- B81 added, planner, lead, held. A yes or a no has to be on the option it names. A chest yes that lived only in planner.state started 0 chest goals here, and gems on its own question stayed near 50% with a chest 23 away.
- B82 added, game, lead, held. The Masher closed from 170 to melee in a few seconds and then ticked about 11 hp, including on steps scored no damage while he was inside about 50. Minute 4 lost 108. His outcome line is 109.7 of 181. The 4:03 evade lost 74 hp in 8 seconds.

## Process changes
None.

<!-- /review -->

## Picks

- **0:15** level-up: took Small Fry from Masher Grip, Small Fry, Root Spikes.
- **0:15** gained without a pick (a chest or other): Small Fry 1/8 new.
- **0:18** level-up: took Hot Start from Starch Bolt, Hash Boomerang, Hot Start.
- **0:18** gained without a pick (a chest or other): Hot Start 1/5 new.
- **0:30** level-up: took Fry Lance from Fry Lance, Deep Fryer, Tater Mines.
- **0:30** gained without a pick (a chest or other): Fry Lance 1/8 new.
- **0:43** level-up: took Fry Knives from Fry Knives, Fertilizer, Fry Lance.
- **0:43** gained without a pick (a chest or other): Fry Knives 1/8 new.
- **1:01** level-up: took Fry Knives from Fry Knives, Root Network, Mash Snowball.
- **1:01** gained without a pick (a chest or other): Fry Knives 1/8 to 2/8.
- **1:19** level-up: took Tater Twirl from Tater Twirl, Small Fry, Chives.
- **1:19** gained without a pick (a chest or other): Tater Twirl 1/8 new.
- **1:30** level-up: took Fertilizer from Fertilizer, Potato Magnet, Four-Eyed Spud.
- **1:30** gained without a pick (a chest or other): Fertilizer 1/5 new.
- **1:55** level-up: took Small Fry from Spry Sprout, Small Fry, Aged Russet, Skip (1).
- **1:55** gained without a pick (a chest or other): Small Fry 1/8 to 2/8.
- **2:01** shrine: took Damage 0% → +6% from Pickup range 0% → +18%, Duration +25% → +31%, Damage 0% → +6%.
- **2:16** level-up: took Small Fry from Fry Lance, Small Fry, Tater Tot Pup, Skip (1).
- **2:16** gained without a pick (a chest or other): Small Fry 2/8 to 3/8.
- **2:25** level-up: took Seeker Sprouts from Fry Knives, Seeker Sprouts, Salt Line, Skip (1).
- **2:25** gained without a pick (a chest or other): Seeker Sprouts 1/8 new.
- **2:45** level-up: took Tater Twirl from Fry Knives, Tater Twirl, Tater Tot Pup, Reroll (2), Skip (1).
- **2:45** gained without a pick (a chest or other): Tater Twirl 1/8 to 2/8.
- **2:52** level-up: took Tater Twirl from Tater Twirl, Fry Lance, Fry Knives, Reroll (2), Skip (1).
- **2:52** gained without a pick (a chest or other): Tater Twirl 2/8 to 3/8.
- **3:08** level-up: took Fertilizer from Sprouting Eyes, Hot Start, Fertilizer, Reroll (2), Skip (1).
- **3:08** gained without a pick (a chest or other): Fertilizer 1/5 to 2/5.
- **3:24** level-up: took Fertilizer from Fry Knives, Fertilizer, Butter Pat, Reroll (4), Skip (1).
- **3:24** gained without a pick (a chest or other): Fertilizer 2/5 to 3/5.
- **3:45** level-up: took Tater Twirl from Tater Twirl, Mash Finisher, Potato Magnet, Reroll (4), Skip (1).
- **3:46** gained without a pick (a chest or other): Tater Twirl 3/8 to 4/8.
- **4:08** level-up: took Salt Shaker from Thick Skin, Fry Lance, Salt Shaker, Reroll (4), Skip (1).
- **4:09** gained without a pick (a chest or other): Salt Shaker 1/5 new.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. Until a chest or food is listed, explore.
2. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
3. If health is under 70% and food is listed, eat the food.
4. A Spud Freezer that is close is also good: it freezes every enemy for 7.5 seconds.

What we know, most important first:
- Chests come from elites and bosses. Exploring finds a chest only after it has dropped.
- Food heals about 30 hp.
- Amusing appears near 2:00. Colorado Queen appears near 3:00. Bosses hit from far away.
- Enemies inside 60 units hurt. Do not stand in hot oil or on a spore vent.
- A step that looks free can still cost health.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}: when this is a Fry Cart or a Potato Crate, gold is at least 100, and no chest is listed, say yes, and say no to exploring or collecting gems. When a chest is listed, a Fry Cart or a Potato Crate is a no. Otherwise, is this the best thing for Tibo to do now, to survive and grow stronger?
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
