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
| Coach prompts | coach-plan.md d5907851 |
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

(the coach is reviewing the run)

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
