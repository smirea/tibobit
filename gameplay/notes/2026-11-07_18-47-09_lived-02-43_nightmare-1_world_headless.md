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
| Coach prompts | coach-plan.md d5907851 |
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

(the coach is reviewing the run)

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
