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
| Coach prompts | coach-plan.md c05498af |
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

(the coach is reviewing the run)

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
