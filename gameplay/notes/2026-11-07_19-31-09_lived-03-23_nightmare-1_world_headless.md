# 2026-11-07 19-31-09: lived 03:23 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=c7r3x2zavsx46&stats=A7VfAJ0GC5MBAAK9AQIA7wkDAJRfAZJMANKuAoAzAAPWBJwxA_3QAzecAiW3AQl6ReUhQ48oT4-nCdvj95y2jDoBEuEBPAoCAAEAAAAEAAAAtAEAAAILAQMGCgSYAbwDgAUDCgkeEgkgEwgSCT0EBwP2AokBngIFFQUAYjY7AAK9GwDH-BQBcbcTACNvEwYBAAcCAAAJBwOvsAHhAQAKAsUKEQEDEgID1hYBASASABBgJ5xzBe4yMQyO9mPQ3zoA |
| Ending | died at 3:23, level 11, 797 kills |
| Opening | first chest listed 1:31; 2 chests opened by 2:30; first evolution none; level 10 at 3:00 |
| Testing | E75 |
| Seed | 1SGEC23 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | fd902ef docs(gameplay): grok reviews the 2026-11-07 19:14 run, lived 4:11, testing E65 |
| Coach prompts | coach-plan.md c05498af; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-31-09_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:23** (203.6s), level 11, 797 kills.
- Damage taken by source: enemy:bog-toad 59.3, enemy:sand-crab 26.7, enemy:potato-beetle 20, boss:amusing 18.8, enemy:beetle-brood 18.6, enemy:bog-slime 13.7, enemy:oil-drip 12.8, enemy:frost-flea 11.2, Hot oil 8.9, boss:beetle-queen 8.2, enemy:ketchup-drop 6.7, enemy:aphid 5.5, enemy:crumb-ant 5.2, enemy:sprout-mite 3.5, enemy:snow-mold 3, enemy:compost-maggot 1.5, Brambles 1.4; 225 in all. Health gained over the run, by food, regeneration and anything else: about 102 (the game does not say from what).
- Weapons: Tater Tot Pup 4/8, Hash Hawk 2/8, Locked Gatling 1/8.
- Passives: Gravy Heart 3/5, Butter Pat 2/5, Bacon Bits 1/5.
- Items: none.
- Planner asked 73 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 117/120 | 3 | 0 | 3 | 28 | enemy:frost-flea, enemy:crumb-ant |
| 1:00 | 148/163 | 12 | 42 | 8 | 71 | enemy:snow-mold, Hot oil |
| 2:00 | 62/163 | 116 | 30 | 10 | 116 | enemy:bog-toad, boss:amusing |
| 3:00 | 6/163 | 88 | 30 | 11 | 167 | enemy:beetle-brood, enemy:potato-beetle |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00.
- First chest listed: 1:31. First time under 25% health: 2:37.
- Goals by kind (done / gave up / dropped): explore 18/0/7; chest 2/0/0; evade 3/0/3; spot 1/0/0; elite 0/0/3; food 1/0/0.
- Dashes: 10 (1:29, 1:36, 2:03, 2:15, 2:20, 2:26, 2:37, 3:07, 3:14, 3:19).
- Model calls: 63 plans, 10 picks, 244 moves (mean 191ms); the page walked through 7 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:08 Hash Hawk 1/8 new; 0:33 Locked Gatling 1/8 new; 1:00 Gravy Heart 1/5 new; 1:52 Butter Pat 1/5 new; 3:17 Bacon Bits 1/5 new.

## Plan

This run is an exploit, and it is the ladder test: whether the best known play can survive 20:00 on Nightmare 1 and unlock the next level. Grok's last templates were the 4:11 run, which explored until a chest was listed, never saw one, and never reached the recipe choice. This run drops that stack. The directive says: if health is under 40% and food is listed, eat the food; if health is under 40% and no food is listed, evade and do not open a chest; if health is at least 40% and a chest is listed, open it; if health is under 70% and food is listed, eat the food; if no chest is listed and the time is past 2:00, fight the nearest elite and do not explore or collect gems; until a chest or food is listed, explore. The same rules are in planner.goal, because a state line alone did not start elite goals and the boss-within-200 state line faded. Dash stays the charge rule. The only knob change is distrustBossRange 400, so a boss inside 400 units is not a free walk. The start weapon is tater-pup. If this holds, the opening explores, an elite goal starts near 2:00 when no chest is listed, chests open after that, and Tibo is still alive well past 12:00. A death names the minute and the top source. If no chest is listed and no elite goal starts, the opener failed and the late half is inconclusive. Items, shops and the recipe pick wait for a stack that has already lived.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested E75: explore until a chest or food is listed, open a chest at 40% health or more, eat food under 70% and under 40%, evade under 40% when no food is listed, and fight the nearest elite past 2:00 when no chest is listed, with those rules repeated in planner.goal, E24 dash, tater-pup, and distrustBossRange 400. The opener ran. Explore lasted until the first chest at 1:31, two chests were open by 1:35, and an elite goal started at 2:10 with no chest listed. Tibo died at 3:23, level 11, 797 kills. Minute 2 lost 116 hp and bog-toad was 59.3 of 225, after a Beetle Nest during amusing woke the toad that elite goal then chased. A heal across 40% at 3:12 restarted an elite goal pointed at the queen, whose own damage was 8.2. The 20:00 claim is refuted on seed 1SGEC23. One world seed, so that is a lead.

## Findings

- The E75 stack did not reach 20:00. Death at 3:23, level 11, 225 damage, about 102 gained. Minute 0 lost 3 and ended 117/120. Minute 1 lost 12 and ended 148/163. Minute 2 lost 116 and ended 62/163. Minute 3 lost 88 and ended 6/163. Top source enemy:bog-toad 59.3, then sand-crab 26.7, potato-beetle 20, amusing 18.8, beetle-brood 18.6. Lead. No earlier run is on seed 1SGEC23. The 7:06 and 14:03 lives were other seeds and other templates, and both had an evolution by 2:30. This run's first evolution was none.
- The opener the plan named did happen, so the death is about this stack. Explore ran from 0:00 through 1:31 (explore 18 done and 7 dropped on the whole run). First chest listed at 1:31, both open by 1:35, health 151/163. Fight the Bog Toad started at 2:10 at 69% with no chest on that plan. The plan's out, no chest and no elite goal, did not apply. Confirmed from the goal rows.
- A Beetle Nest during amusing put the bog toad on the field. At 2:05 the nest 182 left scored 45% against keep-away 12%, amusing 71 right, health 142/163. The channel finished at 2:10 still at 142/163. The next plan's elites were bog toads at 51 and 61. Bog-toad is 59.3 on the outcome, the top source. That nest is the one spot goal, and it completed. Lead.
- With a chest listed and health above 40%, the elite yes still won. At 2:20, hp 102/163, the chest 65 down-right scored 27% and Fight the Bog Toad scored 75% and 74%. At 2:24, hp 88/163, the chest 27 down-left scored 51% and the toad 70%. The goal text says a chest is a yes at 40% or more, and says an elite is a yes only when no chest is listed. It never says the elite is a no once a chest is listed. Three elite goals all dropped (2:10, 2:20, 3:12). None died. Lead.
- One chosen step in that fight scored no damage and cost 34 hp. At 2:25 walk left was hurt 0.28, useful 29%, and health went 88 to 54. hurt_by on that row is bog-toad 23.7, sand-crab 7.5, ketchup-drop 4.3, oil-drip 2.2, bog-slime 2.2. Lead, one step.
- Food under 40% and the evade after it held through the queen's arrival. At 2:34, hp 43/163, Eat the food scored 64% (489 down-right) and won the tie with keep-away. Eaten at 2:42, 32 to 62. Evade from 2:42 to 2:50 and from 2:50 to 2:59 both ended kept clear for 8 seconds without losing health, hp flat at 62. The queen plan at 3:00 still chose keep-away at 48%, boss 179 right. The food heal matches the ~30 hp food belief. Likely. The flat evade is this run.
- A +30 heal with no food goal crossed 40% and restarted an elite fight toward the queen. Health was 56 at 3:11 and 86 at 3:12, hp_gained 30, max still 163. At 3:07, hp 59/163, keep-away had won at 41% over sand crab 24%. At 3:12 Fight the Sand Crab (207 down-left) won at 48% over keep-away 20%, and the queen was 219 down-left, the same way. Lead for the rule switch. The heal agrees with the no-food heal belief. Likely on the heal.
- The queen minute was her swarm, reached on an elite goal. Queen first seen at 3:00. Outcome boss:beetle-queen 8.2. From 3:17 to 3:18 health went 78 to 52 to 39 to 31, beetle-brood 13.9 then 18.6, queen 52 then 44 away. Died at 3:23. Last 3 seconds: sand-crab 12, oil-drip 5.3, potato-beetle 4, sprout-mite 2. At 3:22 Eat the food was 68% at 22 hp, food 129 up, and the steps still under the damage cap walked away from it. Lead.
- Two chests and three Gravy Heart picks left nothing to evolve. The 1:32 chest raised Tater Tot Pup 2/8 to 3/8 and the 1:35 chest raised it 3/8 to 4/8. Gravy Heart reached 3/5 at 1:35. Hash Hawk ended 2/8, Locked Gatling 1/8. Minute 1's +42 is the max-hp jumps at 1:00 (120 to 134), 1:31 (134 to 149) and 1:35 (149 to 163). Confirmed from the loadout rows.
- distrustBossRange 400 asked the action model for both bosses from the first step inside 400. From 2:00 the move rows cite amusing's distance. From 3:00 they cite the queen's. The page still walked through 7 hits. At 2:39 those walks stood on hot oil (2.1, then 4.9, then 6.5) on the way to food, and health went 38 to 33. Hot oil on the outcome is 8.9. The knob mechanism matches the confirmed belief. Those oil steps never saw a template, because distrustSeconds is 0.

## Went well

- The opening stayed cheap. Minute 0 lost 3 and minute 1 lost 12. Health at 2:00 was 148/163, level 8, 71 enemies. Explore until a chest is listed is the right opening on this seed.
- 1:31 to 1:35 both chests opened. The nearer chest scored 97% on the plan that took it. Gravy Heart, the pup's catalyst, was taken at 1:00 (69%), 1:31 (80%) and 1:35 (59%).
- 2:34 to 3:07 the low-health rules ran in order. Food, then evade, through the end of amusing and the queen's first minute. Two evade goals stayed at 62 hp and lost nothing.
- The dash rule spent the charge on real asks. Ten dashes, the yeses at 54% to 79% (1:29, 1:36, 2:03, 2:15, 2:20, 2:26, 2:37, 3:07, 3:14, 3:19). Asks at 2% to 14% stayed walks. At 1:29 and 2:37, enemies_near 6 scored 57% and dashed.

## Went poorly

- 0:08 took Hash Hawk (43%) and 0:33 took Locked Gatling (44%). Three weapons shared the early levels. The pup was still 4/8 at death, so the Gravy Heart levels had nothing to evolve. The pick question was only which option makes Tibo strongest.
- 2:05 to 2:29 a nest and then elite goals covered the amusing minute. Health went from 142 to 54 by 2:25. The chests at 65 and then 27 were the goals rule 3 asked for, and both lost to the toad. All three elite goals were dropped inside about 10 seconds. eliteSeconds is 20, and planEvery 5 replaced them first.
- 3:12 to 3:23 the sand-crab goal walked down-left, the queen's direction. Health went from 86 to 6. Evade was already holding at 62, and it should have stayed the goal while she was inside 200.
- 2:39 the food approach stood in hot oil on page-walk steps and fell to 33 hp. The eat at 2:42 still gained 30 and was worth taking. The oil on the way was the avoidable part.

## Moments

- **0:08** Hash Hawk 43% over Tater Tot Pup 36% and Big Bowl 21%. Better: level the pup. This pick question has no recipe rule, and a new weapon is what it does.
- **1:00** Gravy Heart 69% over Sprout Satellites 18% and Hash Hawk 13%. Right call. Same at 1:31 (80%) and 1:35 (59%).
- **1:31** Chests at 24 and 43 down-right. Explore ended on the nearer one, both were open by 1:35, and the pup went 2/8 to 4/8. Right call.
- **2:00** Amusing 175 left. No elite was offered. Keep-away won at 14%, explore at 9%. Better: with no chest and no elite, keep exploring. One low score is not a boss rule.
- **2:05** Beetle Nest 45% with amusing 71 right, health 142. Better: do not charge a nest while a boss is within 200.
- **2:10** Nest done at 142 hp. Fight the Bog Toad 69%, toads at 51 and 61. Better: evade while amusing is inside 200. The elite sentence is what the text asked for, and this was the wrong fight.
- **2:20** Chest 65 down-right at 27%, toad at 75%, health 102/163. Better: open the chest. The goal text has to say the elite is a no when a chest is listed.
- **2:25** Walk left scored no damage (hurt 0.28) and health went 88 to 54, bog-toad 23.7 in the window. Better: the fight should already have been dropped.
- **2:42** Food eaten, 32 to 62, then evade held through the queen at 3:00. Right call.
- **3:12** Health 86 after a +30 heal. Fight the Sand Crab 48%, queen 219 down-left, the crabs the same way. Better: evade the whole time the queen is within 200, including above 40% health.
- **3:18** Health 78 to 31 in under a second, queen about 44 away, beetle-brood and potato-beetle in hurt_by. Better: that elite goal ends as soon as the queen is the thing in front of it.
- **3:22** Eat the food 68% at 22 hp, food 129 up. The legal steps walked down-left and right. Died at 3:23. The goal matched the rule. The position was already lost.

## Questions

- On this same stack, do planner.goal lines that say yes to evade and no to elites, nests, chests and explore while a boss is within 200 keep those goals from starting in the amusing and queen windows, and is minute-2 loss then under 116? Added as E77.
- When a chest is listed, health is at least 40%, and no boss is within 200, does saying the elite is a no make the chest win, where 2:20 scored the toad at 75% and the chest at 27%? Added as E78.

## Next

- E77, bosses. Add the E66 boss-within-200 sentences to planner.goal and leave the rest of this stack as it is. This run reached the bosses at 148/163 and then lost both boss minutes to goals that line would mark no: the nest at 2:05 and the sand crab at 3:12. Minute 2 under 116, with no nest and no elite goal while the boss is inside 200, is the step toward a Nightmare 1 clear. Still alive at 4:00 is the campaign read. Inconclusive if no boss comes within 200.
- E78, models. After that, one sentence so a listed chest beats an elite when health is at least 40% and no boss is close. The 2:20 chest was the free pick rule 3 already asked for, and the elite sentence took it. That is how chests keep opening once the boss has left.
- Leave E69 (items) and E76 (the recipe pick) until a run on this stack is alive past the queen with a weapon near 5/8. The pup stopped at 4/8, so a pick rule had no evolution to show. Items and economy are still untested, and they are not what ended the run. The hole is the boss window.

## Beliefs changed

- B60: lead to likely, still held. The elite yes in planner.goal started elite goals again, at 2:10, 2:20 and 3:12.
- B55: still lead, held. Evidence now includes the 2:05 nest. The channel stayed at 142 hp. The cost was the toad afterward.
- B71: still lead, held. Evidence now includes the no-line control: one evade plan at 14%, then the nest.
- B23: still lead, recheck. Bog-toad is 59.3 on this seed, on the fight rows, and the 34 hp step was a walk. The dash-damage claim stays open.
- B11: still likely, held. The food goal at 2:42 healed 32 to 62.
- B31: still likely, held. +30 with no food goal between 3:07 and 3:12.
- B37: still likely, held. Same jump, max hp stayed 163.
- B73 added, game, lead, held. The nest during amusing woke the bog toad that took minute 2.
- B74 added, planner, lead, held. A chest yes loses to an elite yes on the same plan when the elite sentence never says no.
- B75 added, planner, lead, held. A heal across 40% during a boss turns evade back into an elite goal toward that boss.
- B76 added, game, lead, held. The queen's own damage was 8.2. The elite goal walked into her swarm and that was the death.
- B77 added, action, lead, held. A step scored no damage at 2:25 lost 34 hp in the toad crowd.

<!-- /review -->

## Picks

- **0:08** level-up: took Hash Hawk from Big Bowl, Tater Tot Pup, Hash Hawk.
- **0:08** gained without a pick (a chest or other): Hash Hawk 1/8 new.
- **0:33** level-up: took Locked Gatling from Tater Tot Pup, Fry Knives, Locked Gatling.
- **0:33** gained without a pick (a chest or other): Locked Gatling 1/8 new.
- **1:00** level-up: took Gravy Heart from Hash Hawk, Gravy Heart, Sprout Satellites.
- **1:00** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **1:27** level-up: took Tater Tot Pup from Tater Tot Pup, Spud Fence, Potato Magnet.
- **1:27** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **1:31** level-up: took Gravy Heart from Tater Tot Pup, Gravy Heart, Gravy Splash.
- **1:31** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.
- **1:32** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **1:35** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **1:35** level-up: took Gravy Heart from Gravy Heart, Tater Tot Pup, Grab Bag, Reroll (1).
- **1:35** gained without a pick (a chest or other): Gravy Heart 2/5 to 3/5.
- **1:52** level-up: took Butter Pat from Fry Knives, Butter Pat, Peel Phantom, Reroll (1), Skip (1).
- **1:52** gained without a pick (a chest or other): Butter Pat 1/5 new.
- **2:24** level-up: took Hash Hawk from Hash Hawk, Hot Potato, Locked Gatling, Reroll (1), Skip (1).
- **2:24** gained without a pick (a chest or other): Hash Hawk 1/8 to 2/8.
- **2:45** level-up: took Butter Pat from Hash Hawk, Butter Pat, Lean Lunch, Reroll (1), Skip (1).
- **2:45** gained without a pick (a chest or other): Butter Pat 1/5 to 2/5.
- **3:17** level-up: took Bacon Bits from Frozen Fries, Bacon Bits, Locked Gatling, Reroll (1), Skip (1).
- **3:17** gained without a pick (a chest or other): Bacon Bits 1/5 new.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. If health is under 40% and food is listed, eat the food.
2. If health is under 40% and no food is listed, evade. Do not open a chest.
3. If health is at least 40% and a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
4. If health is under 70% and food is listed, eat the food.
5. If no chest is listed and the time is past 2:00, fight the nearest elite. Do not explore and do not collect gems.
6. Until a chest or food is listed, explore.

What we know, most important first:
- Chests come from elites and bosses. Exploring finds a chest only after it has dropped.
- A weapon at max level evolves at the next chest if its passive is already held. Open chests to get stronger.
- Food heals about 30 hp.
- Amusing appears near 2:00. Colorado Queen appears near 3:00. Bosses hit from far away. A step that looks free can still cost health.
- Enemies inside 60 units hurt. Do not stand in hot oil or on a spore vent.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}, is that what Tibo should do now? If health is under 40% and food is listed, eating that food is a yes. If health is under 40% and no food is listed, evading is a yes and opening a chest is a no. If health is at least 40% and a chest is listed, opening that chest is a yes. If no chest is listed and the time is past 2:00, fighting an elite is a yes, and exploring or collecting gems is a no. If none of those apply, yes when this goal is the best way for Tibo to survive and grow stronger.
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
  "distrustBossRange": 400,
  "planEvery": 5,
  "eliteSeconds": 20
}
~~~
