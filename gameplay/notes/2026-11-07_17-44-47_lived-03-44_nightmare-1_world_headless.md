# 2026-11-07 17-44-47: lived 03:44 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=ya2wr8q78akcr&stats=A4FpAMIFCXYAKqkBAgCWCwMANj0B91MA8hMGkEcC0AECut4DGOsBCHpFjDqctihP7gmPpwnbQ48BEtEBVBQCAAEAAAAGAAAAtQEAAAIKAQMGCAQ2ogK-BQMJCCs4HzAPDQ0GBAYDgwO7AgQFGwUAKqlCAXG3GgBgCBUCB0hvdCBvaWwUAEQjCgYBAAcCAAAJBwPWnAHRAQAKAuEMEQEDFgEBIBIAEGAnnHMF7jIxDB2binTuEQA |
| Ending | died at 3:44, level 9, 706 kills |
| Opening | first chest listed 1:37; 2 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 9 at 3:00 |
| Testing | E43 |
| Seed | Z40504 |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | 1822e19 docs(gameplay): grok reviews the 2026-11-07 17:20 run, lived 15:03, testing E26 |
| Coach prompts | coach-plan.md 40bad860; coach-retrospective.md 3ec01e62 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_17-44-47_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:44** (224s), level 9, 706 kills.
- Damage taken by source: enemy:sizzle-imp 66, boss:amusing 26, enemy:crumb-ant 21, Hot oil 20, enemy:bowling-ball 10, enemy:fry-fly 10, enemy:bog-slime 9, boss:beetle-queen 8; 170 in all. Health gained over the run, by food, regeneration and anything else: about 58 (the game does not say from what).
- Weapons: Root Spikes 6/8, Mash Wave 1/8.
- Passives: Masher Grip 3/5, Big Bowl 1/5.
- Items: none.
- Planner asked 76 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Plan

This run tests E43 on nightmare open world: whether the first Spud Whetstone is worth charging before a chest. Only the planner directive changes. Its first line says that if a Spud Whetstone is listed and health is at least 40%, charge that spot once before any chest, because the game says it levels one weapon. Until a chest or a Spud Whetstone is listed, which is often not until about 1:30, Tibo explores, and a close Spud Freezer can still win. Under 40% health Tibo does not start a whetstone: a listed chest comes first, food if health is under 70% and food is listed, and evade only when neither is listed. Knobs stay at exploreDistance 300, and the action templates stay as the 2:59 run, including the dash question. If the hypothesis holds, the first listed Spud Whetstone becomes the goal while health is at least 40%, the channel finishes, one weapon's level rises, and health lost on that channel is under 20. If none is listed, the run should follow the chest plan and the question stays open.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested E43: charge the first listed Spud Whetstone before any chest while health is at least 40%, and do not start one under 40%. That case never appeared. No Spud Whetstone was offered from 0:00 through 2:26, while health was still 49/120 at 2:14, and every later offer was under 40% health, scored 5% to 9%, and was never the goal, so the channel never started and the weapon claim is untested. Two close chests did open, at 1:37 and 1:40, taking Root Spikes from 4/8 to 6/8. Food lost all five votes it was offered, Tibo died at 3:44 on nightmare-1 world seed Z40504, and sizzle-imp was 66 of 170 damage.

## Findings

- The E43 treatment never ran. No Spud Whetstone was a goal option while health was at least 40% (still 49/120 at 2:14). The first offer was at 2:27. Confirmed for this log. One world seed, Z40504, with no earlier run on it, so how often that happens is a lead.
- Under 40% health the planner left every listed Spud Whetstone alone. Scores were 6% at 2:27 (35 hp), 6% at 2:28 (35 hp), 5% at 2:38 (34 hp), 5% at 3:28 (41 hp), 9% at 3:33 (39 hp) and 8% at 3:39 (36 hp). No whetstone goal, and no weapon level came from one. Confirmed for this log.
- From 2:45 (58 hp) until about 3:11 (55 hp) health was back above 40%, and no Spud Whetstone was offered in that window. Lead that the 2:27 offer had left range. One seed.
- The food line lost 5 of 5 votes while health was under 70%: 2:14 eat 41% against evade 42% (food 257 away, 49 hp), 2:19 eat 36% against evade 45% (228 away, 42 hp), 2:22 eat 35% against explore 40% (293 away, 42 hp), 2:54 eat 19% against evade 56% (212 away, 72 hp), 2:57 eat 17% against explore 50% (316 away, 69 hp). Zero food goals. Confirmed for this log. Every pickup was 210 units or farther, so closer food is untested. Lead that distance beats this food line.
- A chest inside about 80 units was opened, and one at 138 units was not. At 1:37 a chest 77 away scored 77% at 82 hp and was open by 1:40; the next, 22 away, scored 61% and was open at 1:41. At 3:08 a chest 138 away scored 35% against explore 43% at 63 hp. Chests at 307, 376 and 510 then scored 23%, 18% and 17%. Likely, and it matches the distance half of B22. One run.
- Those two chests raised Root Spikes from 4/8 to 5/8 at 1:40 and to 6/8 at 1:41. Mash Wave stayed 1/8. No recipe completed. Confirmed for this log.
- Hot oil is 20 of the outcome damage. From 0:47 to 0:49 health fell from 115 to 102, including page walks at 0:48 that the forecast treated as free while underfoot was burn (oil 7.6, then 10.5, then 11.7). Likely the same forecast miss as B17.
- Amusing appeared at 2:00 and Colorado Queen at 3:00. Amusing is 26 on the outcome list; the queen is 8. The spawn clock is likely (another run on the same timetable). On this short run the queen was a small line. Lead on that split.
- Health rose 24 at 2:45 (34 to 58) and 30 at 2:48 (58 to 88), max hp still 120, with no food goal. Outcome health gained is about 58, those two jumps plus 4 on the death row. The 2:48 row is inside a Stray Dog, charged 0.2 of 1 second. The jump size is likely, a second run beside 17-20-20. That the dog caused the second jump is a lead, because the +24 was not on a dog.
- At 3:43 a step the forecast priced at -3 hp dealt sizzle-imp 22.1, with 24 enemies within 60, and the other directions were priced as death (hurt rating 2.47 on the only step still offered). The last 3 seconds were sizzle-imp 43.9 and sand-crab 4.3. Sizzle-imp is 66 of 170 and the killing blow. Lead, one run.
- At 1:38 action.dash answered 90% yes on an open-chest walk with 3 enemies within 60 and crumb-ant 1.5 in the last 3 seconds, so none of its yes or no lines matched. The chest still opened and that dash cost about 2 hp. At 2:57, on an explore goal, it answered 51% with 1 enemy within 60 and amusing 2.2. Lead, one clear row and one borderline row.
- The first chest on this exploreDistance 300 seed was found at 1:37 at 82 hp, when an explore goal ended on a chest 77 away. Likely as another 300-knob sample beside 1:32, 1:46, 2:16, 2:20 and 3:02. It says nothing about the 600-knob case.
- Before any chest existed the planner charged two Crop Patches, at 0:34 (51%, finished by 0:38, health 119 to 116) and at 1:12 (48%, failed at 1:22, health 92 to 83). Lead that an unnamed charge spot outscores the explore line by a few points.

## Went well

- From 0:00 to 0:46 health stayed at 119–120 while Tibo explored. The opening minute was cheap.
- At 1:37–1:41 two chests inside 80 units were opened in one stretch. Root Spikes went from 4/8 to 6/8 and health stayed at 80.
- Every Spud Whetstone offered under 40% health stayed at 5–9% and was never started. The guard in the directive held on all six listings.
- The two chest channels completed with no dash while standing on a chest that was still charging.

## Went poorly

- At 0:47–0:49 Tibo walked and then dashed through hot oil. Health 115 to 102. The page took the goal direction once the forecast called it free. Leaving the oil was the step that should have won.
- At 1:12 a Crop Patch pulled Tibo off explore. The action model stepped off it, the goal failed at 1:22 after 6 seconds no closer, and health fell from 92 to 83. Exploring for a chest should have stayed the goal.
- At 2:14 food was listed, health was 49, and evade won by one point (42% against 41%). That evade lost 7 hp by 2:22, and amusing damage through 2:23 took health from 68 at 2:00 down to 35. Eating the food was what the directive asked for.
- From 3:08 on, listed chests at 138 units and beyond lost to explore, a Beetle Nest and evade, at 41–63 hp. The close-chest rule had already done its work at 1:37; these were left behind.
- At 3:43 the only step not priced as death was forecast at -3 hp and dealt 22 from sizzle-imp. Death followed at 3:44. No offered move was a safe one.

## Moments

- **0:34** Level-up took Root Spikes, then the planner charged a Crop Patch at 51% over explore. Better: keep exploring until a chest or a Spud Whetstone is listed.
- **0:48** Page walks up through hot oil the forecast called free. Health 110 to 102 by 0:49, then a dash up at 70%. Better: step off the burn instead of walking the goal through it.
- **1:22** The Crop Patch goal failed: no closer for 6 seconds, and the action model had stepped off it twice. Health 83. Better: drop a patch whose tile forecasts as a hit and go back to explore.
- **1:38** Dashed up at 90% toward a chest with 3 enemies within 60 and 1.5 hp of recent damage, so no dash rule matched. Better: say no when no yes-rule matches. The chest still opened.
- **1:40** Both chests were open. Root Spikes 4/8 to 6/8, health 80. Right call.
- **2:00** Amusing appeared 160 up at 100% health. The planner kept exploring, then turned down at 2:01. By 2:08 a page walk had taken amusing 3.3 and health was 57. Better: leave once the boss is inside about 100 and the forecast is calling the step free.
- **2:14** Food 257 away scored 41% and evade scored 42% at 49 hp. Better: eat the food. The evade lost 7 hp by 2:22.
- **2:27** The first Spud Whetstone scored 6% at 35 hp. Right call under the 40% rule. The test gate was still closed.
- **2:48** Health reached 88, up 30 on this row and 24 three seconds earlier, with no food goal. The 2:48 step was inside a Stray Dog. Right call to still be alive. The log does not name the heal.
- **3:08** A chest 138 away scored 35% and explore scored 43%, while Tibo stood in a Boss Lair at 0.6 of 3 seconds, health 63. Better: open that chest, and walk off the lair without charging it.
- **3:43** Sizzle-imp dealt 22 on a step forecast at -3 hp, with 24 enemies within 60. Death at 3:44. Better: nothing offered was safe. This one is a forecast miss.

## Questions

- Can health still be at least 40% when the first Spud Whetstone is listed, if Tibo does not charge crop patches or other spots before that and takes food that is actually offered? (E44)
- Did the Stray Dog cause the +30 at 2:48, or is it the same unnamed heal as the +24 at 2:45? (E45)
- Does sizzle-imp regularly deal about 20 hp on a step the forecast prices at about 3 hp? (E46)
- Does an explicit "if none of these apply, say no" on action.dash stop a yes when neither the 5 hp rule nor the 5-enemy rule matches? (E47)

## Beliefs changed

- B6: evidence now includes this run's whetstone ban and the close-chest opens. Confidence lead, status held, unchanged.
- B9: evidence now includes three Reroll offers at 4–6% that lost, and the upgrades of Root Spikes and Masher Grip. Stays recheck, likely. No Skip was offered.
- B10: the evidence pointer now says B37, and this run's +24 and +30 are named. Lead, held, unchanged.
- B13: both chest channels completed without a step-off failure. Likely, held, unchanged.
- B15: this death was trash-heavy with enemies_near 24 on the killing step (sizzle-imp 66, crumb-ant 21, bowling-ball 10, fry-fly 10, bog-slime 9, plus amusing 26, hot oil 20, queen 8). Stays recheck, likely.
- B17: evidence adds the 0:48 oil walks and the 3:43 sizzle-imp step. Likely, held, unchanged.
- B18: evidence adds the +24 at 2:45. Stays disproved.
- B20: evidence adds amusing 26 and queen 8 on this short run. Likely, held, unchanged.
- B21: evidence adds two opens inside 80 units and four skips at 138 units and beyond. Likely, held, unchanged.
- B22: evidence adds the 77-unit win at 82 hp and the 138-unit loss at 63 hp. Stays recheck, lead.
- B25: evidence adds a first chest at 1:37 on seed Z40504 at exploreDistance 300, health 82. Stays recheck, likely.
- B26: evidence adds amusing at 2:00 and Colorado Queen at 3:00. Likely, held, unchanged.
- B28: most dashes this run still fired with 5 or more enemies within 60. Confirmed, held, unchanged.
- B29: evidence adds the 1:38 dash up on the chest approach, about 2 hp, channel still completed. Likely, held, unchanged.
- B34: no dash row while standing on a charging chest, and both channels completed. The charging window was about a second, so this is a weak extra sample. Stays lead, held.
- B37: confidence lead to likely. A second run agrees: +24 at 2:45 and +30 at 2:48, max hp unchanged, no food goal. Status held.
- B42 added, planner, lead, held. Under 40% health a listed Spud Whetstone scored 5–9% and was never chosen.
- B43 added, game, lead, held. At exploreDistance 300 the first Spud Whetstone offer can arrive only after health is already under 40%.
- B44 added, planner, lead, held. Listed food at 210 units and beyond lost every vote under this directive, even under 70% health.
- B45 added, action, lead, held. With no dash yes-rule and no dash no-rule matching, action.dash can still answer yes, including about 90% on a chest approach.
- B46 added, game, lead, held. A sizzle-imp can deal about 20 hp on a step the forecast prices at about 3 hp, and can be the killing blow.

## Process changes

None.

<!-- /review -->

## Picks

- **0:34** level-up: took Root Spikes from Root Spikes, Four-Eyed Spud, Clean Plate.
- **0:34** gained without a pick (a chest or other): Root Spikes 1/8 to 2/8.
- **0:44** level-up: took Masher Grip from Gem Sling, Spud Dice, Masher Grip.
- **0:44** gained without a pick (a chest or other): Masher Grip 1/5 new.
- **1:12** level-up: took Big Bowl from Peel Phantom, Spud Sneakers, Big Bowl.
- **1:12** gained without a pick (a chest or other): Big Bowl 1/5 new.
- **1:15** level-up: took Root Spikes from Gravy Splash, Root Spikes, Harvest Moon.
- **1:15** gained without a pick (a chest or other): Root Spikes 2/8 to 3/8.
- **1:34** level-up: took Root Spikes from Root Network, Big Bowl, Root Spikes.
- **1:34** gained without a pick (a chest or other): Root Spikes 3/8 to 4/8.
- **1:38** level-up: took Mash Wave from Mezzaluna, Mash Wave, Chip Shuriken, Reroll (1).
- **1:39** gained without a pick (a chest or other): Mash Wave 1/8 new.
- **1:40** gained without a pick (a chest or other): Root Spikes 4/8 to 5/8.
- **1:41** gained without a pick (a chest or other): Root Spikes 5/8 to 6/8.
- **2:08** level-up: took Masher Grip from Masher Grip, Thick Skin, Mash Wave, Reroll (1).
- **2:08** gained without a pick (a chest or other): Masher Grip 1/5 to 2/5.
- **2:49** level-up: took Masher Grip from Sour Cream, Masher Grip, Couch Potato, Reroll (1).
- **2:49** gained without a pick (a chest or other): Masher Grip 2/5 to 3/5.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. If a Spud Whetstone is listed and health is at least 40%, go charge that Spud Whetstone before any chest. The game says it levels one weapon. Do this for the first one only. After it finishes, do not go to another Spud Whetstone.
2. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
3. If health is under 70% and food is listed, eat the food.
4. Evade only when no chest and no food is listed.
5. A Spud Freezer that is close is also good: it freezes every enemy for 7.5 seconds.

Before any chest or Spud Whetstone is listed (often not until about 1:30), explore to find them. Do not only evade.

Under 40% health, do not start a Spud Whetstone. Open a listed chest, eat listed food when health is under 70%, and evade only when no chest and no food is listed.

What we know, most important first:
- A Spud Whetstone is a charge spot. The game says charging it levels one weapon. Take the first one while health is at least 40%, then go back to chests.
- On this mode the crowd hurts. Small enemies inside 60 units took Tibo from 120 to 1 hp in 3 minutes.
- Evading all the time did not work: a run that never opened a chest died at 3:16.
- Weapons stay weak without chests. Open chests to get stronger once the first Spud Whetstone is done, or sooner if none is listed.
- A step that looks free can still cost 4 to 9 hp when many enemies are close.
- A base weapon at max level plus its catalyst evolves at the next chest.
- Food heals about 30 hp. Eat it before health is very low.
- Hot oil and bosses also hurt. Do not stand in hot oil.
- Dashing off a chest that is still charging can fail the open.

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
{{standing_on}}
Goal: {{goal}}
Say no if Tibo is standing on a chest that is still charging.
Say no if the goal is to open a chest, Tibo is not yet on that chest charging it, and health fell 5 or more in the last 3 seconds. Walk the approach; keep the dash for crowding on other goals.
Say yes if health fell 5 or more in the last 3 seconds and the nos above do not apply, or if 5 or more enemies are within 60 units and the nos above do not apply.
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
