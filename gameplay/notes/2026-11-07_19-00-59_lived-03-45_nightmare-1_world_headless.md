# 2026-11-07 19-00-59: lived 03:45 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=1p5ax8en5vt9q&stats=A71pAMYJCvQBAKOAAQMAwwoHAB_xA_SAAQAUDQGTPQAttwjiOQAD1gHxFwDUtgGIEAA8LAHyDAKgAwEZKgIJekWctgnb4_flIUOPjDooT4-nARKXAR4NAgABAQAAAwAAALMBAAACCwEDCAYEiAHQA64GAwoJEUALGQwNJh8PBAwHsgSbAfEBjgFDLAsFFQUAehEgAKOAFQACvRIA-U0OAHpyDAYBAAcCAAAJBwP2rwKXAQAKAvwNEQEDEgID1hYBASASABBgJ5xzBe4yMQyO9mPQ3zoA |
| Ending | died at 3:45, level 10, 1222 kills |
| Opening | first chest listed 1:44; 2 chests opened by 2:30; first evolution none; level 9 at 3:00 |
| Testing | E59 |
| Seed | XEPS03 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | 9551fb4 docs(gameplay): grok reviews the 2026-11-07 18:47 run, lived 2:43, testing E57 |
| Coach prompts | coach-plan.md 99ee6853 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-00-59_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:45** (225s), level 10, 1222 kills.
- Damage taken by source: enemy:garden-slug 32, enemy:tomato-leech 21, enemy:sand-crab 18, enemy:ketchup-drop 14, enemy:oil-drip 12, enemy:bog-slime 9, enemy:fry-fly 7, boss:amusing 6; 119 in all. Health gained over the run, by food, regeneration and anything else: about 30 (the game does not say from what).
- Weapons: Tater Tot Pup 1/8, Chip Shuriken 1/8, Seed Potato 8/8, Whisk Vortex 3/8, Peeler 1/8, Seeker Sprouts 1/8.
- Passives: Fertilizer 2/5.
- Items: none.
- Planner asked 76 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 108/120 | 11 | 0 | 4 | 28 | Brambles, Spore vent |
| 1:00 | 117/120 | 21 | 30 | 7 | 73 | enemy:aphid, enemy:bog-slime |
| 2:00 | 96/120 | 22 | 0 | 9 | 115 | boss:amusing, enemy:ketchup-drop |
| 3:00 | 2/120 | 97 | 0 | 10 | 173 | enemy:garden-slug, enemy:tomato-leech |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:02.
- First chest listed: 1:44. First time under 25% health: 3:27.
- Goals by kind (done / gave up / dropped): explore 18/0/10; spot 0/0/1; gems 0/0/1; chest 3/0/2; evade 6/0/1.
- Dashes: 13 (2:02, 2:14, 2:29, 2:41, 2:47, 2:54, 3:06, 3:12, 3:17, 3:22, 3:29, 3:34, …).
- Model calls: 66 plans, 10 picks, 249 moves (mean 172ms); the page walked through 18 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:19 Chip Shuriken 1/8 new; 0:35 Seed Potato 1/8 new; 0:58 Whisk Vortex 1/8 new; 1:45 Peeler 1/8 new; 2:23 Seeker Sprouts 1/8 new; 2:59 Fertilizer 1/5 new.

## Plan

This run is for the Nightmare 1 climb. The last two grok runs died in the amusing minute chasing a chest that never opened, so nothing evolved and 20:00 stayed out of reach. We play the 17:14 champion (tater-pup, E24 dash, exploreDistance 300, champion action text) and change only the planner directive. Until a chest or food is listed, explore. If health is under 40% and food is listed, eat the food. If health is under 40% and no food is listed, evade, and do not open a chest. If a boss is within 200 units, evade, and do not open a chest or charge a spot. If a chest is listed and no boss is within 200 units, open it. Food under 70% is still eaten when those rules do not apply. If this holds, once a boss is within 200 the plans show evade winning, and a listed chest does not become the goal, so that minute loses well under the 115 hp of the 2:43 run. Inconclusive if no boss comes within 200. A zero chest-goal count counts only when a chest was listed in that window and was not taken. If no chest is listed while the boss is within 200, the skip itself is inconclusive, and we still read whether evade won. The hot-oil action lines go back to the champion text: that test never saw hot oil, and it is not this question.

<!-- review: written by the coach from coach-retrospective.md -->

(the coach is reviewing the run)

<!-- /review -->

## Picks

- **0:19** level-up: took Chip Shuriken from Starch Plating, Chip Shuriken, Broadside.
- **0:19** gained without a pick (a chest or other): Chip Shuriken 1/8 new.
- **0:35** level-up: took Seed Potato from Lean Lunch, Seed Potato, Sprouting Eyes.
- **0:35** gained without a pick (a chest or other): Seed Potato 1/8 new.
- **0:57** level-up: took Whisk Vortex from Hot Sauce, Starch Plating, Whisk Vortex.
- **0:58** gained without a pick (a chest or other): Whisk Vortex 1/8 new.
- **1:33** shrine: took Damage taken 0% → -27% from Damage taken 0% → -27%, Gold gain +5% → +23%, Pickup range 0% → +25%.
- **1:36** level-up: took Seed Potato from Chip Shuriken, Whisk Vortex, Seed Potato.
- **1:36** gained without a pick (a chest or other): Seed Potato 1/8 to 2/8.
- **1:44** level-up: took Peeler from Peeler, Skipping Cannonball, Small Fry.
- **1:45** gained without a pick (a chest or other): Peeler 1/8 new.
- **1:46** level-up: took Seed Potato from Whisk Vortex, Seed Potato, Chip Shuriken, Reroll (1).
- **1:46** gained without a pick (a chest or other): Seed Potato 2/8 to 3/8.
- **1:47** gained without a pick (a chest or other): Seed Potato 3/8 to 4/8.
- **1:48** gained without a pick (a chest or other): Seed Potato 4/8 to 5/8.
- **2:23** level-up: took Seeker Sprouts from Tater Tot Pup, Seeker Sprouts, Fertilizer, Reroll (2).
- **2:23** gained without a pick (a chest or other): Seeker Sprouts 1/8 new.
- **2:57** gained without a pick (a chest or other): Seed Potato 5/8 to 8/8, Whisk Vortex 1/8 to 3/8.
- **2:59** level-up: took Fertilizer from Seeker Sprouts, Tater Tot Pup, Fertilizer, Reroll (2).
- **2:59** gained without a pick (a chest or other): Fertilizer 1/5 new.
- **3:21** level-up: took Fertilizer from Peeler, Seeker Sprouts, Fertilizer, Reroll (2).
- **3:21** gained without a pick (a chest or other): Fertilizer 1/5 to 2/5.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. If health is under 40% and food is listed, eat the food.
2. If a boss is within 200 units, evade. Do not open a chest. Do not charge a spot.
3. If health is under 40% and no food is listed, evade. Do not open a chest.
4. If a chest is listed and no boss is within 200 units, go and open it. A chest gives a free pick and evolves a ready recipe.
5. If health is under 70% and food is listed, eat the food.
6. Until a chest or food is listed, explore.
7. When no boss is within 200 units, a Spud Freezer that is close is also good: it freezes every enemy for 7.5 seconds.

What we know, most important first:
- A chest while a boss is within 200 units does not finish. The boss hits from far away and the walk kills Tibo.
- While that boss is within 200 units, evade. Open a chest only once the boss is farther than 200.
- Weapons stay weak without a chest. A finished recipe evolves at the next chest.
- Enemies inside 60 units hurt. A step that looks free can still cost health when a boss is close.
- Food heals about 30 hp.
- Amusing appears near 2:00. Colorado Queen appears near 3:00.

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
  "distrustSeconds": 0,
  "distrustBossRange": 0,
  "planEvery": 5,
  "eliteSeconds": 20
}
~~~
