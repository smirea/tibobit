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
| Coach prompts | coach-plan.md c05498af |
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

(the coach is reviewing the run)

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
