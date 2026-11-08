# 2026-11-07 17-03-58: lived 03:38 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=knwrgrqdtj63n&stats=A5lmAJsGDKABAMf4AQEAwwoFANS2CIZdAJm0AswtAMvnAo8mAp8DAIzOAVgB_dACB3pFCduPp5y2jDooT1EiARK1AR4MAgABAAAABgAAALIBAAACCgEDBgYCQv4B5AIDCAcPGCclKB0iBAkFxgLqAdMBFgIFFQUBcbc9AMf4KQB76hQAAr0OAHr5CQYBAAcCAAAJBwPYtAG1AQAKAvINEQEDFgEBIBIAEGAnnHMF7jIxDB2binTuEQA |
| Ending | died at 3:38, level 12, 795 kills |
| Opening | first chest listed 3:01; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 7 at 3:00 |
| Testing | E24 |
| Seed | 1SIDY5R |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Coach prompts | coach-plan.md 40bad860; coach-retrospective.md 3ec01e62 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_17-03-58_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:38** (218s), level 12, 795 kills.
- Damage taken by source: boss:amusing 61, enemy:potato-beetle 41, enemy:fry-fly 20, enemy:sand-crab 14, enemy:dumpster-raccoon 9, enemy:ketchup-drop 8, enemy:sprout-mite 6, enemy:oil-drip 5.
- Weapons: Peeler 8/8, Potato Rain 2/8, Hash Brown Shield 2/8, Starch Chain 1/8.
- Passives: Gravy Heart 2/5.
- Items: none.
- Planner asked 80 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Plan

This run tests E24 on nightmare open world. The last run followed the chest directive, opened four chests, and evolved Root Spikes, but the dash charge was used once, at 2:13, after health had already fallen from 70 to 17 between 1:32 and 1:46 with 8 to 12 enemies inside 60 units. The planner, the goal and pick questions, the hurt and useful questions, and every knob stay as that run. Two action lines change. action.state also shows the last 3 seconds of damage and the enemies around, and action.dash says yes only when 5 or more enemies are within 60 units, or when that damage adds up to 5 hp or more. If the hypothesis holds, the dash charge should drop several times from 1:00 to 2:30, not once at the end, and health lost in that window should be clearly less than the fall from 70 to 17. Seeds differ, so a gap is a lead. The new state lines also sit in front of the hurt and useful questions, so a safer step can add to any gain; only the dash count comes from the new question. The dash goes along the move already chosen, not a free aim away from a Bog Toad. Until a chest is listed, about 1:30 on the last two world runs, the unchanged planner explores, may charge a close Spud Freezer, and evades only when no chest and no food is listed. Under 40% health it can still explore, as it did from 1:48 to 2:12 last run. That low-health stretch is not what this run changes.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary
This run tested E24 on nightmare-1 open world, seed 1SIDY5R: the chest directive from the 2:19 run, a dash question that says yes at 5 enemies within 60 or at 5 hp in the last 3 seconds, and those two facts added to the action state. The dash question was played. The charge fell from 1 to 0 six times between 1:00 and 2:30 and twelve times in the 3:38, against one dash at 2:13 in the previous world run. Health in that window went from 109 to 94, and from 1:29 to 1:45 it went from 104 to 94, against 70 to 17 before. That gap is a lead only: this seed has no Bog Toad, Gravy Heart raised max hp at 1:57, and the new state lines also sit in front of the hurt and useful questions. The first chest was listed at 3:02 and opened at 3:06. A later dash left the next chest half charged, the planner kept voting for a chest 144 away at 17% health, and Tibo died at 3:38.

## Findings
- The loose dash question spends the charge when the action model is asked and a condition holds. Lead, from one run that tested it. The charge is 0 after dashes at 0:44 (6 near), 1:16 (5), 1:27 (5), 1:42 (the 1:40 and 1:41 rows both say dash while the charge is still 1), 1:53 (7), 2:13 (9), 2:27 (5), 3:02 (6), 3:09 (8), 3:25, 3:30 (5) and 3:36 (13). At 1:53.2, with 4 near and no recent damage, the chosen step is a walk; at 1:53.6, with 7 near, it is a dash. The 3:24 dash is the damage rule: 3 near, boss:amusing 13.3, while a chest was 0.5 of 1 second charged.
- Health lost from 1:00 to 2:30 was smaller than the 70 to 17 fall, and the dash is not isolated as the cause. Lead. Hp is 109/120 at 1:03, 94/120 at 1:57, 108/134 after Gravy Heart, 99 at 2:13 and 94/134 at 2:27. From 1:29 to 1:45, with enemies_near up to 9, hp went 104 to 94. Outcome damage has no bog-toad. The previous run's 44 hp from that charger is absent here, so the quieter window has a second explanation.
- Steps the page walks by itself never ask the dash question, so a full charge sits out a crowd. Lead. At 2:42 enemies_near is 7 and dash is 1, and the next rows are goals with no move until 3:00.
- Late dashes did not stop a death once the chest channel was abandoned. Lead. Three dashes from 3:24 to 3:36, and hp went 67 to 4 by 3:38. The last hurt_by is fry-fly 10.4 and potato-beetle 24.9.
- Once a chest is listed the directive still takes the vote, including at low health and long range. The directive half is a second sample, so the chest-vote belief moves to likely. The low-health half contradicts B22, one sample, so that belief goes to recheck. The first chest scores 43% at 3:02 (112 away, hp 88) and opens at 3:06. At 3:23 a chest 18 away scores 66%. At 3:36, hp 26/149, a chest 144 away scores 27% against keep-away 24% and explore around 15%, and the planner starts it again after it failed.
- Amusing is the top damage source, and the largest hit is missing from the one-second forecast. Lead. Outcome boss:amusing 61. At 3:05, on a chest 0.2s into the channel, the chosen step is forecast as no damage (hurt 0.34) and the row loses 31, with amusing 62 left at 47%. Smaller amusing lines sit at 2:12 (3.3 then 6.7) and 3:23 (13.3). Colorado Queen appears at 3:00 (140 up-left, 100%) and is absent from the damage list; at death she is 150 left at 90%.
- A 30 hp rise with no food goal and no max-hp change happened at 3:14. Lead. Hp 51/134 at 3:11 and 81/134 at 3:14, hp_lost 0, with no move row between them. Gravy Heart is a different event: 94/120 to 108/134 at 1:57, and 25/134 to 39/149 at 3:34.
- Food was never listed, so the eat-under-70% line was not played. The first chest is at 3:02, after a long run of 300-unit explores that found nothing new. Gold is 20 at 3:05 and 83 at 3:06.
- The 3:06 chest took Peeler from 4/8 to 7/8 with no pick row. Lead. The 3:14 level-up then maxed Peeler. No evolution. Weapons at death: Peeler 8/8, Potato Rain 2/8, Hash Brown Shield 2/8, Starch Chain 1/8, Gravy Heart 2/5.
- Trash is still most of the listed damage: 103 of 164. Potato-beetle 41, fry-fly 20, sand-crab 14, dumpster-raccoon 9, ketchup-drop 8, sprout-mite 6, oil-drip 5, amusing 61. hurt_by also names garden-slug 4.8 at 0:36, and garden-slug has no outcome line.
- All 11 level-ups took the top card. Seven upgraded a held card. New cards won when they scored higher: Potato Rain 50% at 0:48, Hash Brown Shield 57% at 1:45, Gravy Heart 67% at 1:57, Starch Chain 40% at 3:37. Reroll lost at 4% and at 29%.

## Went well
- 0:44 to 2:27: dashes line up with 5 or more enemies near, and hp stays in the 90s until Tibo stands in amusing's telegraph at 2:12.
- 1:53: a walk at 4 near, then a dash at 7 near. The threshold in the question matches the action word.
- 1:57: Gravy Heart, top card at 67%, lifts 94/120 to 108/134 before amusing spawns at 2:00.
- 2:00 to 2:10: amusing is about 157 away at 100%, explore stays the goal, hp stays 108.
- 3:02: the new chest tops the vote at 43% and the goal switches off the Crop Patch.
- 3:06: that chest opens. Peeler is 7/8 and gold is 83.

## Went poorly
- 0:00 to 3:02: explore walks of 300 units, no chest on the list, so the dash test ran on a weak build (Peeler 3/8, Potato Rain 2/8 at 2:12). A longer explore was the untested knob.
- 0:36: the Beetle Nest finishes into garden-slug 4.8, hp 118 to 113, and no chest is listed afterwards.
- 3:05: the chest channel under amusing costs 31 on a step priced at no damage. The open still completes at 3:06, at 57 hp with 22 enemies near.
- 3:06 to 3:14: hp 57 then 51 (38%), no chest and no food, and explore beats keep-away 36% to 26% at 3:11. The directive allows that.
- 3:24: dash up-right leaves a chest at 0.5 of 1 second, because amusing's 13.3 hp met the damage rule at only 3 near. Hp goes 67, 63, 53, 49, 37 by 3:26, with dumpster-raccoon, sand-crab, potato-beetle and fry-fly.
- 3:29 to 3:38: the planner holds a chest goal from 37 hp to the death at 4 hp. Steps toward the chest are ruled out (forecasts of 13 to 30 hp), the safe steps walk away, the goal fails "no closer for 6 seconds" at 3:36 with the chest 144 away, and the next plan starts a chest again.

## Moments
- **0:36** Beetle Nest completes, garden-slug 4.8, hp 118 to 113, no chest afterwards. Better: leave elite nests until a chest is the goal.
- **0:44** First dash, up-right, 6 near, hp stays 111. Right call for the question.
- **1:16** Dash up-left, 5 near, hp stays 105. Right call.
- **1:41** Dash in a crowd of 7 to 9, hp 99 to 96 by 1:42. Right call for the question. The fall is small.
- **1:57** Gravy Heart, 12 near, 94/120 to 108/134. Right call.
- **2:00** Amusing spawns 156 left. Explore up-right scores 43% against keep-away 21%. Right call under this directive, and hp stays 108 until 2:12.
- **2:12** Telegraph underfoot, amusing 61 to 77 away, hp 108 to 102, then a dash down-right. Better: leave a boss telegraph before the chip.
- **3:05** On the chest, walk right forecast as no damage, lose 31 to amusing. Better: drop the channel when the boss is inside about 80 and a telegraph is up. The chest still opened.
- **3:14** Hp 51 to 81 with no food, no card, and max hp still 134. No better action. Record it.
- **3:24** Dash up-right off a chest at 0.5 of 1 second. Better: the dash question should say no while a chest is charging.
- **3:26** Hp 67 to 37 in about two seconds on steps forecast as no damage, dash empty. Better: under 40% health, evade, and ignore a chest farther than 60.
- **3:36** The chest goal fails at 144 away, hp 26, and the planner starts a chest again at 27%. Better: after a failed open at low health, evade.

## Questions
- Does saying no to a dash while a chest is charging get that chest open and avoid the 67 to 37 fall? Added as E30.
- Does the 30 hp rise at 3:14 repeat on a later world run after 3:00, with max hp unchanged and no food? Added as E31.
- Does amusing's large hit keep landing on steps the one-second forecast prices at no damage? Added as E32.
- Does the next chest raise a held weapon by more than one level with no pick, the way Peeler went from 4/8 to 7/8? Added as E34.

## Beliefs changed
- B9: evidence extended with this run's 11 picks. Confidence stays likely. Status stays held.
- B10: evidence now includes the 3:14 world rise. Confidence stays lead. Status stays held.
- B13: evidence extended with the 3:05 and 3:24 channels. Confidence stays lead. Status stays held.
- B15: held to recheck. This run's outcome has a boss line, amusing 61, so "bosses have no damage line" does not hold here. Trash is still 103 of 164.
- B16: evidence notes that the directive run again had 0 evade starts. The claim is about the no-directive text. Confidence stays lead. Status stays held.
- B17: evidence extended with the forecast-free losses, including 31 at 3:05. Confidence stays likely. Status stays held.
- B18: held to recheck. A +30 with no food and no max-hp change happened at 3:14.
- B20: held to recheck. Amusing leads the damage list at 61. Queen still has no line.
- B21: lead to likely. Second run of this directive: a listed chest took the vote, and evade starts stayed 0.
- B22: held to recheck. At 3:36 a chest 144 away still won at 17% health.
- B23: held to recheck. This seed's damage list has no bog-toad, and amusing is the largest source. The forecast-miss half was not tested.
- B24: evidence notes the contrast. This run used a different question and spent the charge about twelve times. The claim is about the default question. Confidence stays lead. Status stays held.
- B25: evidence extended. First chest at 3:02. Confidence stays likely. Status stays held.
- B26: evidence extended. Amusing at 2:00, Colorado Queen at 3:00. Confidence stays likely. Status stays held.
- B27: evidence notes explore beating evade 36 to 26 at 38% health (3:11, hp 51). No stretch under 20% without a chest. Confidence stays lead. Status stays held.
- B28 added, action, lead, held. The loose dash question spends the charge when the model is asked and a condition holds.
- B29 added, action, lead, held. That dash follows the move already chosen and can leave a charging chest.
- B30 added, game, lead, held. Amusing's 31 hp hit at 3:05 was forecast as no damage while Tibo stood on a chest.
- B31 added, game, lead, held. A 30 hp rise with no food and no max-hp change happened on world at 3:14.

## Process changes
None.

<!-- /review -->

## Picks

- **0:37** level-up: took Peeler from Starch Chain, Peeler, Frying Pan.
- **0:48** level-up: took Potato Rain from Potato Rain, Chives, Butter Pat.
- **1:23** level-up: took Potato Rain from Tailgate Fries, Potato Rain, Couch Potato.
- **1:45** level-up: took Hash Brown Shield from Hash Brown Shield, Whisk Vortex, Big Bowl.
- **1:57** level-up: took Gravy Heart from Gravy Heart, Peeler, Spud Fence.
- **2:12** level-up: took Peeler from Peeler, Starch Chain, Mash Wave.
- **3:03** level-up: took Peeler from Hash Brown Shield, Mash Landing, Peeler.
- **3:14** level-up: took Peeler from Butter Pat, Peeler, Hash Brown Shield.
- **3:24** level-up: took Hash Brown Shield from Hot Sauce, Hash Brown Shield, Hash Boomerang.
- **3:34** level-up: took Gravy Heart from Potato Battery, Gravy Heart, Tot Toss, Reroll (1).
- **3:37** level-up: took Starch Chain from Hot Streak, Starch Chain, Tater Trot, Reroll (1).

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
  "exploreDistance": 300,
  "evadeSeconds": 8,
  "gemsSeconds": 12,
  "stuckSeconds": 6,
  "extraDamage": 0.02,
  "safeMargin": 0.1
}
~~~
