# 2026-11-07 18-47-09: lived 02:43 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=qdn0vqn4zgex8&stats=A9BMAMECCBUAVi0AAADgBwQADe8D10QAA9YDrBIAbtIBjRIAdm0B1AQAB3pFj6ectgnb4_dDj-UhARGnAS0HCAABAAAAAgAAAHYAAAIHAQIIAmCsAQMIBxsKBiY3ChIEBgS4AVkmCgUeBQFxtzYA6H8gAFYtFQIKU3BvcmUgdmVudBIAjlgKBgEABwIAAAkGA-NtpwEACgKrChEBAxICA9YWAQEgEgAQYCeccwXuMjEMjvZj0N86AA |
| Ending | died at 2:43, level 8, 321 kills |
| Opening | first chest listed 2:15; 0 chests opened by 2:30; first evolution none; level 8 at 3:00 |
| Testing | E57 |
| Seed | YLS7TB |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | d866e28 docs(gameplay): grok reviews the 2026-11-07 18:32 run, lived 2:23, testing E50 |
| Coach prompts | coach-plan.md d5907851; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_18-47-09_nightmare-1_world_headless.csv |

## Outcome

- Lived **2:43** (163.5s), level 8, 321 kills.
- Damage taken by source: boss:amusing 54, enemy:cave-grub 32, enemy:blight-spore 21, Spore vent 18, enemy:field-rat 10, enemy:compost-maggot 7, enemy:frost-flea 7, enemy:potato-beetle 5; 154 in all. Health gained over the run, by food, regeneration and anything else: about 45 (the game does not say from what).
- Weapons: Tater Tot Pup 3/8, Mash Snowball 3/8, Comet Scythe 1/8, Mash Golem 1/8.
- Passives: none.
- Items: none.
- Planner asked 57 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 115/120 | 6 | 0 | 4 | 28 | enemy:bowling-ball, Spore vent |
| 1:00 | 93/120 | 36 | 15 | 5 | 73 | enemy:blight-spore, Spore vent |
| 2:00 | 5/120 | 115 | 30 | 8 | 113 | boss:amusing, enemy:cave-grub |

- Bosses first seen: amusing (amusing) at 2:00.
- First chest listed: 2:15. First time under 25% health: 2:43.
- Goals by kind (done / gave up / dropped): explore 16/0/8; spot 6/0/0; chest 0/0/4.
- Dashes: 8 (1:20, 1:31, 1:37, 1:58, 2:12, 2:28, 2:33, 2:39).
- Model calls: 50 plans, 7 picks, 106 moves (mean 195ms); the page walked through 10 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:27 Mash Snowball 1/8 new; 1:37 Comet Scythe 1/8 new; 2:03 Mash Golem 1/8 new.

## Plan

This run is the first look at hazards, an area nothing has tested, on the way to surviving 20:00 on Nightmare 1. The last grok run died at 2:23 with distrustSeconds 8 and never reached the pests it meant to measure, so this run goes back to the 17:14 champion planner and E24 dash, exploreDistance 300, tater-pup, and distrustSeconds 0. The only change is the action templates: action.state says hot oil burns, shows what is underfoot, and tells Tibo to step off it, and action.hurt adds that standing in hot oil hurts. Until a chest or food is listed, directive rule 3 has Tibo evade, including under 40% health. Under 70% health it eats listed food. A listed chest is opened, even at low health. If the hypothesis holds, the first time hot oil is underfoot or in the recent damage, the next steps leave it, and the hot oil total finishes well under the 24 hp IXJBKS took by 2:23. One seed, so the leave-or-stay pattern is the result.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run was E57, the first hazards look: the champion chest-and-food planner, the E24 dash, exploreDistance 300, tater-pup, distrustSeconds 0, and action text that says hot oil burns and to step off it. Hot oil never appears in the log, so the leave-or-stay test did not run and the hypothesis is inconclusive. The hazard that did appear was Spore vent, 18 hp, and the hot-oil line did not clear it. Tibo died at 2:43, level 8, with no chest opened: six Beetle Nests filled the opening, the first chest was listed at 2:15 in amusing's direction, the planner kept choosing it, the action model refused the lethal steps, and a forecast-free walk into the boss at 2:43 ended the run. Amusing dealt 54 of 154 damage. The wall in front of a 20:00 Nightmare 1 win is still that boss-minute chest, and hazards remain unscored.

## Findings

- E57 was not carried out. Action.state and action.hurt named hot oil for the whole run. Hot oil is absent from hurt_by, standing_on, underfoot and the outcome (0 hp). Score that wording on a log that names hot oil. The absence on YLS7TB is confirmed. The hypothesis is inconclusive.
- Spore vent dealt 18 hp, the entire hazards total in the outcome. The 3-second windows are 1.9 at 0:51, 7.2 at 1:30 and 9.1 at 2:00, with underfoot spores. On the model steps at 1:28 and 1:58 Tibo took the least-forecast step and was still on spores a second later. One of those steps (1:28) was forecast at no damage. Three page walks (0:51, 1:29, 1:59) added ticks the template is never shown, because distrustSeconds was 0. Confirmed on this run. Lead that a hot-oil sentence does not cover a vent.
- The 1:07 page walk records Brambles 2.3 and hp 115 to 112. The outcome list has no Brambles line, and amusing 54 through potato-beetle 5 sums to the stated 154. Lead that a small hazard can be missing from the outcome.
- The evade rule never selected evade. The line was 'Evade only when no chest and no food is listed'. Keep-away stayed about 16–25% on every plan (high was 25% at 2:00 and 2:12). Explore won the pre-chest plans at about 40–66%, starting at 0:00 with explore up-right 54% against keep-away 19%. Zero evade goals. Food was never listed, so the under-70% eat rule had nothing to do. The intent said rule 3 would evade, including under 40% health. Those words are not in the template, and the same intent also said to open a listed chest at low health. The template did the second. Confirmed on this run.
- With no nest ban, Beetle Nest won six times and every 1.5 second channel completed: 0:48, 1:11, 1:20, 1:35, 1:58 and 2:12. Scores were 50%, 56%, 63%, 50%, 61% and 51%, at full or high hp. The 2:08 nest won at 51% with amusing 242 down-left and telegraph underfoot, and the channel ended at 2:12 with hp 90 to 77 (field-rat 10.1 and amusing 2.2). At 1:53 a Seed Vault at 0.4 of 2 seconds lost to a nest at 61%. Confirmed on this run. Lead as a rule for this kind of directive.
- After the first chest, the planner followed 'open a listed chest' on 6 of 7 plans: 2:15 at 65% (91 down-left, hp 74), 2:25 at 44%, 2:29 at 36%, 2:35 at 31%, 2:40 at 26% and 2:42 at 25%. The miss was 2:20, chest 299 down-left at 41% against explore down-left at 58%, with amusing 86 down-left. Five chest goals, four dropped, the fifth still active at death, zero opened. From 2:15 the chest direction was forecast at about -20 to -50 hp and ruled out while amusing stood that way (boss 134 down-left at the listing). Likely, and it is the same stall as the 18:32 run, so that pattern is now likely.
- Minute 2 lost 115 hp and ended at 5/120. Damage for the run: amusing 54, cave-grub 32, blight-spore 21, Spore vent 18, field-rat 10, compost-maggot 7, frost-flea 7, potato-beetle 5. The last model step at 2:43 went 34 to 16 with amusing 23.3. The page then walked the chest direction, 16 to 5, with amusing 25 away, because the forecast called that step as cheap as the safest. distrustBossRange was 0. The last 3 seconds were amusing 29.9, cave-grub 14.1 and sprout-mite 1.8. Confirmed on this run.
- Health jumped with no food goal and no max-hp change: +15 at 1:35 (105 to 120) and +30 at 2:22 (61 to 91). The minute table's gains are 15 then 30, and the outcome's about 45 matches. The source is still not in the log. Confirmed events, same pattern as earlier world runs.
- All 7 picks were weapons. The run ended Tater Tot Pup 3/8, Mash Snowball 3/8, Comet Scythe 1/8, Mash Golem 1/8, no passive, no item, no evolution. Comet Scythe won at 80% at 1:37 and Mash Golem at 78% at 2:03. Confirmed on this run. Nothing was near a recipe when the chests finally listed.
- The E24 dash rules held. Eight dashes, at 1:20, 1:31, 1:37, 1:58, 2:12, 2:28, 2:33 and 2:39, each with enemies_near at least 5 or a drop of about 5 hp or more. Asks at 3–8% stayed walks. The 2:28 dash (59%) went down on the chest approach and the next row had 21 enemies near and -6 hp. Confirmed, another sample of the dash belief.
- Amusing was first seen at 2:00. The run died before a Colorado Queen. First chest at exploreDistance 300 was 2:15, at 74/120, and amusing was still at 80%, so that chest was an elite drop. Agrees with the boss clock, and with first chests at 300 often landing after 1:30. Confirmed on this seed.

## Went well

- Minute 0 ended 115/120, 6 hp lost, level 4. From 0:00 to the 0:51 vent tick, explore took no damage and the first two level-ups put Tater Tot Pup at 2/8 and Mash Snowball on the bar.
- From 2:15 to 2:42 the action model refused chest steps forecast at about 20 hp or more. Hp was still 50 at 2:40 because of that refusal.
- Dash asks at 0:44 (6%), 0:56 (3–4%) and 1:11 (4%) stayed walks. The eight dashes were the ones the 5 hp / 5 enemy rule names.
- All six nest channels reached charged-and-used even though stand-still was ruled out near the end of the 1.5 second charge (0:47, 1:10, 1:20, 1:57, 2:11).
- At 2:00, amusing 156 left, hp 90, the planner picked explore up at 47%. That direction was away from the boss.

## Went poorly

- 0:51, 1:28–1:31 and 1:58–2:00. Spore vent, 18 hp. The model stayed in the cloud and the page walked further in on steps priced as cheap. The action text talked about hot oil while underfoot said spores. With distrustSeconds 0 the entry walks never asked the model.
- 0:42–2:12. Six nests and no chest open. At 1:53 a Seed Vault already charging was dropped. At 2:08 a nest was started under amusing and cost 12 hp at 2:12, which is the whole field-rat total. A nest ban, or a boss ban on nests, would have skipped both.
- 2:15–2:43. The chest chase. Hp 74 to 5, zero opens, minute 2 lost 115. Cave-grub dealt 32 in that crowd (enemies_near 21 at 2:28). The planner re-targeted a new chest every few seconds (2:28, 2:35, 2:40) instead of leaving the boss. At 2:42, hp 44/120, it still scored Open the chest highest (25%).
- 2:20. The one chest-rule miss, and it pointed at the boss: explore down-left 58% with amusing 86 down-left and the chest already drifted from 91 to 299. The action model then walked left, off that line. The close chest at 2:15 was the one that mattered, and the model spent 2:15–2:19 walking up and right until it was gone.
- Picks at 1:37 and 2:03 took new level-1 weapons. At death four weapons sat at 3/8 or 1/8, so the chests they could not reach would have evolved nothing anyway.

## Moments

- **0:42** Beetle Nest at 50%, full hp, first of six. It completed at 0:48 with hp still 120. Right call under this directive, which never forbids nests. Better: a ban until a chest exists, if the next run does not want six elites woken first.
- **0:51** Page walk through Spore vent, 120 to 118, forecast called the step as cheap as the safest. Better: nothing in the action text can catch this while distrustSeconds is 0.
- **1:28** Underfoot spores, vent window climbing to 7.2 by 1:30. The model took a no-damage step and was still on spores, then the page walked up for another point. Better: name Spore vent and prefer a step that leaves the tile, once a clean step is actually offered.
- **1:31** Dash up-left at 54% after about 7 hp in the vent, off the Frenzy Fryer (charged 0.3 of 2) and out of the cloud. Right call. Hp was 120 again at 1:35 (+15, no food listed).
- **1:37** Comet Scythe taken at 80% over Mash Finisher 17% and Couch Potato 3%. Better: another level of a held weapon, so one recipe is close when a chest finally lists.
- **1:53** Standing on a Seed Vault at 0.4 of 2 seconds, Beetle Nest 232 away wins at 61%. Better: finish the vault. That nest's completion at 1:58 was blight-spore 8.8, hp 114 to 105, and a dash down-left at 51%.
- **2:00** Amusing appears, 156 left, hp 90, enemies_near 6, Spore vent still 9.1 in the window. Explore up at 47%, keep-away 25%. Right call on direction. Better: a boss line, because the next chosen goal was another nest.
- **2:12** Nest done under the boss, 90 to 77, field-rat 10.1 and amusing 2.2, boss now 104 down. Better: never have started it at 2:08, when telegraph was already underfoot and amusing was 242 away at 96%.
- **2:15** First chest, 91 down-left, amusing 134 down-left at 80%, Open the chest at 65%, hp 74. The model walked up-right and right (down-left forecast about -20 to -32 and ruled out). Right call by the action model. Better for the planner: do not start a chest a boss is standing toward.
- **2:20** Chest now 299 down-left at 41%, explore down-left 58%, amusing 86 down-left, hp 63. The planner dropped the chest and aimed at the boss. Better: evade while the boss is that close. The model walked left instead and took the +30 heal at 2:22 (61 to 91).
- **2:43** Page walk down-right, 16 to 5, amusing 25 away, on an open-chest goal. Died. The model step just before had already lost 18 (34 to 16, amusing 23.3). Better: distrustBossRange so the cheap forecast is asked, and a directive that has already dropped the chest.

## Questions

- If action.state and action.hurt name Spore vent and Brambles and say to step off that tile, do the model steps leave, and does the vent damage on the steps the model is actually asked fall below this run's model-step stretch? Page walks stay outside the score while distrustSeconds is 0. Inconclusive if the outcome names none of those hazards. Added as E60.
- If the directive forbids a Beetle Nest while any boss is listed, does the 2:08 nest disappear, and does the channel's 12 hp (field-rat 10.1 and amusing 2.2) stay unspent? Added as E61.

## Next

- E59 (bosses), and run it next. One directive line: do not start a chest when a boss is within about 100, and under 40% health evade. This run followed 'open every listed chest' from 2:15 to 2:43, lost 115 hp in minute 2, and opened nothing. If the skip holds, the amusing minute stops being an automatic death and a later chest can still evolve a weapon. That is the current wall in front of 20:00 on Nightmare 1. The last two grok runs were enemies and hazards, so a bosses run is also the rotation.
- E51 (bosses), on its own run. Only distrustBossRange 400, champion stack otherwise. The killing step at 2:43 was a page walk with amusing 25 away and the knob at 0, after the model had refused that direction since 2:15. Keep it separate from E59 so the two fixes are not masked.
- E60 (hazards), after those. Hazards still have nothing scored: E57 never met hot oil, and a zero total would have been the wrong success. Name Spore vent and Brambles beside hot oil, judge the model steps, and treat a missing source as inconclusive. E61 (no nest while a boss is up) is queued behind these. The 12 hp nest hit is real and smaller than the chest stall.

## Beliefs changed

- B54: confidence lead to likely, claim tightened, status held. A close chest in the boss's direction wins the vote and the channel never finishes. A chest that has drifted to about 300 can lose to explore, as at 2:20.
- B15, B17, B20, B21, B22, B25, B26, B28, B29, B30, B31, B37, B53: evidence now includes this run. Confidence and status unchanged. B15 stays recheck (pests 82, amusing 54, Spore vent 18). B53 stays held: hot oil can take 24 on a seed that has it, and YLS7TB had none.
- B55 added, planner, lead, held. With no nest ban, Beetle Nest wins at 50–63% and the channel completes, including once a boss is up.
- B56 added, game, lead, held. Some world openings deal their hazard damage as Spore vent, not hot oil.
- B57 added, action, lead, held. A hot-oil-only line is not applied to spores. The model minimizes the one-second forecast and can still be on spores a second later.
- B58 added, planner, lead, held. 'Evade only when nothing is listed' selected zero evade goals. Explore held the opening.

## Process changes

coach-plan.md gained two bullets. The intent has to name the default goal in the directive's own words, because a limit such as 'evade only when' does not select evade, and it must not describe a low-health rule the directive does not contain. This run's intent said rule 3 would evade, including under 40%, and the template says neither. And if the hypothesis needs a named source, the intent says the run is inconclusive when the outcome never lists it. Zero hot oil would have looked like a pass under the old success line.

<!-- /review -->

## Picks

- **0:27** level-up: took Tater Tot Pup from Tater Tot Pup, Bacon Bits, Locked Gatling.
- **0:27** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:27** level-up: took Mash Snowball from Mash Snowball, Clean Plate, Small Fry.
- **0:27** gained without a pick (a chest or other): Mash Snowball 1/8 new.
- **0:55** level-up: took Mash Snowball from Butter Pat, Mash Snowball, GPU.
- **0:56** gained without a pick (a chest or other): Mash Snowball 1/8 to 2/8.
- **1:37** level-up: took Comet Scythe from Mash Finisher, Couch Potato, Comet Scythe.
- **1:37** gained without a pick (a chest or other): Comet Scythe 1/8 new.
- **2:03** level-up: took Mash Golem from Couch Potato, GPU, Mash Golem.
- **2:03** gained without a pick (a chest or other): Mash Golem 1/8 new.
- **2:28** level-up: took Mash Snowball from Sour Cream, Hot Sauce, Mash Snowball.
- **2:29** gained without a pick (a chest or other): Mash Snowball 2/8 to 3/8.
- **2:42** level-up: took Tater Tot Pup from Slow Cooker, Tater Tot Pup, Comet Scythe, Reroll (1).
- **2:42** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.

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
Hot oil burns. If Tibo is standing in hot oil, step off it.
Tibo is a potato hero in a survivors game. Weapons fire on their own; Tibo only walks.
Goal: {{goal}}.
{{health}}
{{standing_on}}
{{hurt_by}}
{{enemies}}
{{dash}}
~~~

### action.hurt

~~~text
If Tibo does this: {{move}}. How badly does it hurt Tibo in the next second? Standing in hot oil hurts.
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
