# 2026-11-07 18-32-36: lived 02:23 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=zck2yg0becmgh&stats=A5ZDAIQCCCoAehEAAAD7BgYAPgQCkxoAA9YBig8AovABkQMA4BEBwgIA6LoCuQEAlWwBrQEACHpFjDqctihPQ4-Ppwnb4_cBEHkABQIAAQAAAAMAAABjAAACBwECCARkyAEDCQgMKBsPDQEFHgQHBntlChQCBAUbBQFxtxwCB0hvdCBvaWwYAL5iEgD5TQ8AO8QGBgEABwIAAAkFA9YxeQAKAuoIEQEDEgID1hYBASASABBgJ5xzBe4yMQyO9mPQ3zoA |
| Ending | died at 2:23, level 8, 260 kills |
| Testing | E50 |
| Seed | IXJBKS |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | 25a7931 docs(gameplay): cursor reviews the 2026-11-07 18:01 run, lived 16:08, testing E44 |
| Coach prompts | coach-plan.md d5907851; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_18-32-36_nightmare-1_world_headless.csv |

## Outcome

- Lived **2:23** (143.3s), level 8, 260 kills.
- Damage taken by source: boss:amusing 28, Hot oil 24, enemy:bog-slime 18, enemy:ketchup-drop 15, enemy:spittlebug 6, enemy:aphid 6, enemy:sprout-mite 5, enemy:oil-drip 4; 106 in all. Health gained over the run, by food, regeneration and anything else: about 0 (the game does not say from what).
- Weapons: Tater Tot Pup 1/8, Peel Phantom 1/8, Butter Streak 2/8, Afterburner Fries 2/8, Mash Landing 1/8, Tailgate Fries 1/8.
- Passives: none.
- Items: none.
- Planner asked 53 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 105/120 | 17 | 0 | 4 | 29 | Hot oil, enemy:ketchup-drop |
| 1:00 | 70/120 | 38 | 0 | 6 | 73 | Hot oil, enemy:bog-slime |
| 2:00 | 3/120 | 66 | 0 | 8 | 98 | boss:amusing, enemy:spittlebug |

- Bosses first seen: amusing (amusing) at 2:00.
- First chest listed: 2:04. First time under 25% health: 2:18.
- Goals by kind (done / gave up / dropped): explore 18/0/7; chest 0/1/1.
- Dashes: 5 (1:24, 1:56, 2:02, 2:14, 2:19).
- Model calls: 46 plans, 7 picks, 235 moves (mean 205ms); the page walked through 8 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:18 Peel Phantom 1/8 new; 0:26 Butter Streak 1/8 new; 0:55 Afterburner Fries 1/8 new; 1:13 Mash Landing 1/8 new; 2:13 Tailgate Fries 1/8 new.

## Plan

This run explores enemies, an area no run has tested, on the way to surviving 20:00 on Nightmare 1. The last long runs die on forecast-free page walks: on the 16:08 seed blight-spore dealt 617 and ice-imp 114, including the killing blow, across 101 hits the page walked by itself. The planner and the dash question stay the 16:08 stack, and the only knob change is distrustSeconds 8, so after each forecast-free hit the action model is asked for 8 seconds. Until a chest or a Spud Whetstone is listed, Tibo explores and does not start a Crop Patch, shrine, Beetle Nest, or other charge spot. Under 40% health Tibo skips a whetstone, opens a listed chest, eats listed food when under 70%, and evades when neither is listed. If the hypothesis holds, walk rows after those hits say the forecast was not trusted, chests still open, and blight-spore and ice-imp finish well under 617 and 114. One seed, so a drop is a lead toward a lever later Nightmare levels need. The low-health evade line is the opening default the directive has to state; goal rows split it from the knob.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

E50 tested distrustSeconds 8 on the 16:08 planner and dash stack: after each forecast-free hit the action model should be asked for 8 seconds, blight-spore and ice-imp should finish well under 617 and 114, and chests should still open. The knob fired on all eight free-forecast walks (15 hp) and the later rows name that miss, but the run died at 2:23 on seed IXJBKS with neither pest in the damage list and with no chest opened, so the pest comparison is inconclusive. Of 106 damage, amusing took 28, hot oil 24, bog-slime 18 and ketchup-drop 15; health gained was 0, and the minute that ended at 2:00 lost 66 down to 3/120. The planner did explore and did skip every charge spot, and it also left a Spud Whetstone listed from 0:41 at 114/120, then started two chests that sat on amusing.

## Findings

- E50's mechanism showed up eight times, and its pest totals did not. Page walks the forecast called free: 0:13 aphid 1, 0:23 ketchup-drop 2, 0:43 bog-slime 2, 0:56 hot oil 2, 1:10 bog-slime 2, 1:18 bog-slime 2, 1:46 bog-slime 2, 2:09 amusing 2. Each was followed by about 8 seconds of move rows that say the forecast was not trusted. Blight-spore and ice-imp are absent because the run ended at 2:23. Chests ended 0 done, 1 dropped, 1 failed. The hypothesis is inconclusive. The mechanism is a lead with eight repeats in this one log.
- The spot ban held and the whetstone, food and chest lines did not. Spot goals started: 0, including a Beetle Nest at 34% at 1:36. Spud Whetstone on plan rows: 0:43 at 168 up-right, 15% against explore up 59%, hp 112/120; 0:48 at 219 down, 11% against 63%; 0:49 at 231 down, 12% against explore up-right 69%; 1:33 at 235 down-left, 12–13% against 63–65%, hp 74/120. A move row at 0:45 had it 130 right. The directive said charge it before any chest, and explore was still a legal goal, so explore won. Food at 2:00 was 94 up-left and scored 46% against explore up-left 60% at 70/120. Lead for the whetstone and food misses. Likely for the spot ban, which held the whole run.
- A listed chest with amusing on it took the last minute. At 2:04 the chest was 94 up-left and amusing was 64 up-left; the planner opened it at 75%, the action model refused steps forecast around −16 to −31 hp, and the goal was dropped at 2:09 (chest 18%, explore up-left 27%). At 2:14 a chest 36 down started at 37/120 with amusing 37 down-left, never got closer, and failed at 2:21 at 9 hp. The directive has no exception for a boss on the chest or for health under 40%. Lead.
- Hot oil was the second source at 24 hp, and the forecast missed some of it. The 0:56 page walk lost 2 hp to hot oil. From 1:24 to 1:26, inside the distrust window that began at 1:18, hot oil climbed from 0.5 to 13.3 and health fell from 95 to 74. The dash at 1:24.9 (52%, dashed up) spent the charge while the oil kept ticking. At 0:49, already on model steps, oil took health from 112 to 107. Lead.
- Amusing arrived at 2:00 and dealt 28, which matches the world clock on a new seed. The free walk at 2:09 lost 2 hp to it; the 2:14 model step lost 10. At death it was 99 away at 22% health, on a telegraph. The last 3 seconds were aphid 1.7, amusing 6.7 and little-grey 1.7. little-grey is missing from the 106 source list, as is bowling-ball (3.7 at 1:02, 4 hp on that row). Spawn time agrees with the held clock. Lead that this amusing was chip and telegraph. The source-list gap is a lead and a known logging limit.
- Health gained was 0. This opening has no +24 to +30 jump. Longer world runs still show those jumps; they are absent from this first 2:23. Lead.

## Went well

- From 0:00 to 0:41 the planner only explored. Shrines, nests, carts and freezers sat around 4–28% and never started. Health was 114/120 at 0:41.
- Dash followed the written rule. Asks at 3–15% stayed walks while enemies_near was 0–2. The five dashes (1:24, 1:56, 2:02, 2:14, 2:19) came with enemies_near at least 5 or with health falling hard.
- From 2:04 the action model refused the chest steps that forecast dead or worse than about −15 hp toward amusing. The chest stalled, and Tibo was still alive at 2:21.

## Went poorly

- The Spud Whetstone from 0:41, at 95% health and as close as 130–168, never became the goal. A charge then would have leveled a weapon before amusing. Explore continued until the boss.
- Hot oil at 0:49 (112 to 107) and 1:24–1:26 (95 to 74). The model should have left the burn on the first tick.
- At 2:00 health was 70/120 and food was 94 up-left at 46%. The planner explored up-left at 60%. It should have eaten.
- At 2:04 and 2:14 the chest and amusing were the same direction. The planner should have left that chest. At 37 hp the goal should have been evade or food.
- Death loadout: six weapons at 1/8 or 2/8, no passive, no item, no chest, level 8, 260 kills. Nothing could evolve. The picks were outside the test; the missing chest was the loss.

## Moments

- **0:13** A free-forecast walk loses 1 hp to an aphid, enemies_near 0. Better: right call that the next steps ask the model. The triggering hit still lands.
- **0:41** Spud Whetstone is 304 up-right at 114/120 and the planner keeps explore up-right. Better: charge that whetstone.
- **0:49** On model steps, a walk into hot oil takes health from 112 to 107. Better: step off the burn.
- **0:56** The distrust window has just ended and a free walk loses 2 hp to hot oil. Better: treat oil as damage when the one-second forecast says none.
- **1:24** Hot oil and bog-slime take health from 95 to 74. Dash up at 52% spends the charge. Better: leave the oil on the first burn tick and keep a charge.
- **1:36** Beetle Nest 110 up-left scores 30–34% and loses to explore. Better: right call.
- **2:00** Amusing appears 165 up-right, Tibo at 70/120. Food 94 up-left scores 46%, explore up-left 60%. Better: eat the food.
- **2:04** First chest, 94 up-left, amusing 64 up-left. Planner opens it at 75%. Better: leave a chest that sits on the boss.
- **2:09** The chest drops to 18% and explore up-left wins at 27%. A free walk then loses 2 hp to amusing. Better: food, or a chest away from the boss.
- **2:14** Chest 36 down starts at 37 hp, amusing 37 down-left, dash down-right. Better: evade. The chest is the boss.
- **2:21** The chest fails, no closer for 6 seconds, at 9 hp. Evade starts with chests and food still listed. Better: that evade belonged at 2:14. Died at 2:23 on a telegraph.

## Questions

- Does a hurt line that names hot oil, on the 16:08 stack with distrustSeconds at 0, cut opening hot-oil damage below the 24 hp this seed took by 2:23? E52.
- On a run that meets blight-spore and ice-imp, does distrustSeconds 8 put their totals below 617 and 114 and still open chests? A death before those pests is a different result. E53.
- Does "charge the Spud Whetstone before explore" make the planner start it at 40% health or more? This run's line said before any chest, and explore won 59% to 15% at 0:43. That is E48, and the test needs the word explore.
- Does skipping a chest when a boss is within about 100, including under 40% health, lose less in the amusing minute than opening it? E38's 25% line would have allowed the chest at 37 hp. E54.

## Next

- E52, hazards. Hot oil was 24 of 106 hp, and hazards have never been tested. One sentence in the action templates, on the 16:08 stack with distrustSeconds left at 0, shows whether the opening bleed is a prompt or a forecast hole. Less oil before the first chest is how Tibo is still healthy when amusing arrives at 2:00.
- E54, bosses. This death was a chest goal walked at amusing at 31% health. An exception in the directive is the difference between a failed channel at 2:21 and a run that continues after the first boss. It is a small change on the champion planner.
- E53, enemies, only on a run set up to live. E50 showed that the knob asks the model, and it showed nothing about blight-spore. The 16:08 run is still the evidence that those page-walk pests end a long Nightmare 1 life. Score E53 when they appear. E41 (exploreDistance 600 on a second seed) is the paired map question, because a chest after 2:00 is what let amusing end this one first.

What stands between a 20:00 win and this bot is the opening: no chest and no weapon level before amusing, hot oil with no answer, and a chest rule that follows the boss. The late-pest lever is real and unmeasured. The untested area this run points at is hazards.

## Beliefs changed

- B15: evidence extended. Forecast-free walks were 15 of 106 hp here; oil, amusing and contact pests on model steps were the rest. Status stays recheck, confidence stays likely.
- B17: evidence extended with these eight walks (15 hp). Confidence stays likely, status stays held.
- B20 and B26: evidence extended with amusing at 2:00 and 28 damage on IXJBKS. Confidence stays likely, status stays held.
- B21: evidence extended. The spot ban held (0 spot goals). The whetstone, food and chest-on-boss lines did not. Confidence stays likely, status stays held.
- B25: evidence extended. First chest at 2:04 at exploreDistance 300, hp 62/120. Status stays recheck, confidence stays likely.
- B28: evidence extended with 5 dashes on the 5-enemy or falling-health side. Confidence stays confirmed, status stays held.
- B30: evidence extended. The free-forecast amusing hit at 2:09 was 2 hp. Confidence stays likely, status stays held.
- B42: evidence extended with the 0:41–1:33 whetstone listings (11–15% against explore 59–69% at 74–114 hp). Confidence stays likely, status stays held.
- B44: status held to recheck. Food 94 away at 58% health scored 46% and lost to explore, so distance past ~210 is not the whole story. The food and the winning explore were the same direction, so the claim is not disproved.
- B49 added. action, lead, held. distrustSeconds 8 asks the model for about 8 seconds after a forecast-free hit, and the page still takes that hit.
- B51 added. planner, lead, held. "Charge the whetstone before any chest" loses to explore while explore is still legal.
- B52 added. game, lead, held. Hot oil took 24 hp in this world opening, including a forecast-free tick.
- B53 added. planner, lead, held. A listed chest on a boss still wins the vote, and the action model then stalls the channel.

<!-- /review -->

## Picks

- **0:18** level-up: took Peel Phantom from Peel Phantom, Tater Twirl, Potato Rain.
- **0:18** gained without a pick (a chest or other): Peel Phantom 1/8 new.
- **0:26** level-up: took Butter Streak from Aged Russet, Butter Streak, Thick Skin.
- **0:26** gained without a pick (a chest or other): Butter Streak 1/8 new.
- **0:55** level-up: took Afterburner Fries from Peel Phantom, Butter Streak, Afterburner Fries.
- **0:55** gained without a pick (a chest or other): Afterburner Fries 1/8 new.
- **1:13** level-up: took Mash Landing from Mash Landing, Tater Tot Pup, Butter Streak.
- **1:13** gained without a pick (a chest or other): Mash Landing 1/8 new.
- **1:36** level-up: took Afterburner Fries from Chip Shuriken, Tot Stampede, Afterburner Fries.
- **1:36** gained without a pick (a chest or other): Afterburner Fries 1/8 to 2/8.
- **2:13** level-up: took Tailgate Fries from Mash Landing, Aged Russet, Tailgate Fries.
- **2:13** gained without a pick (a chest or other): Tailgate Fries 1/8 new.
- **2:18** level-up: took Butter Streak from Tater Tot Pup, Tailgate Fries, Butter Streak.
- **2:18** gained without a pick (a chest or other): Butter Streak 1/8 to 2/8.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. Until a chest or a Spud Whetstone is listed, only explore. Do not start a Crop Patch, a shrine, a Beetle Nest, or any other charge spot.
2. If a Spud Whetstone is listed and health is at least 40%, charge that Spud Whetstone before any chest. Only the first one. Under 40% health, do not start a Spud Whetstone.
3. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
4. If health is under 70% and food is listed, eat the food.
5. Evade only when no chest and no food is listed. Under 40% health, with no chest and no food listed, evade rather than explore.
6. Once a chest has been listed, a close Spud Freezer is also good: it freezes every enemy for 7.5 seconds.

What we know, most important first:
- Until a chest or Spud Whetstone is listed, exploring finds them. Charge spots before that do not make weapons stronger.
- A Spud Whetstone levels one weapon. Charge the first one only while health is at least 40%, then go back to chests.
- On this mode the crowd hurts. Small enemies inside 60 units took Tibo from 120 to 1 hp in 3 minutes.
- Evading all the time did not work: a run that never opened a chest died at 3:16.
- Weapons stay weak without chests. Open chests to get stronger.
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
  "distrustSeconds": 8,
  "distrustBossRange": 0
}
~~~
