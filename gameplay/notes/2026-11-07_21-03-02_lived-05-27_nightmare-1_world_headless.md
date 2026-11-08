# 2026-11-07 21-03-02: lived 05:27 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=sdjp6zvxbeg6h&stats=A8iZAQCRCw7eAQBiNgECAeYPAwAD1giDygIACXUChyoC4wMD_dADJbcCdT8DCXpFnLYJ2-UhKE_uCY-n4_eMOgET5AK0ARQCAAEAAXgIAAAAywEAAAIRAQUIBgYCBJIBhgPYBooF8AMDCgk1IxwaewwYCRIEBQPJCjYSBRUFAbfeVQBiNlMBcbcrAfhHHgBgCBUGAQAHAgAACQcD7fcC5AIACgKcDxEBAxICA9YWAQEgEgAQ0S5_GsQhL8YMKEpZr5m2AA |
| Ending | died at 5:27, level 14, 1425 kills |
| Opening | first chest listed 1:30; 2 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 10 at 3:00 |
| Testing | E82, E69 |
| Seed | WJGN9N |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | d6dc5e9 docs(gameplay): grok reviews the 2026-11-07 20:42 run, lived 9:34, testing E91 |
| Coach prompts | coach-plan.md 71e16386 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_21-03-02_nightmare-1_world_headless.csv |

## Outcome

- Lived **5:27** (327.6s), level 14, 1425 kills.
- Damage taken by source: boss:the-masher 85.1, enemy:bog-toad 82.8, boss:amusing 43.2, boss:beetle-queen 29.9, enemy:crumb-ant 20.8, enemy:oil-drip 19.6, Hot oil 18.7, enemy:fry-fly 17.1, enemy:bog-slime 5.6, enemy:potato-beetle 5.3, enemy:sock-pile 4.8, enemy:garden-slug 4.7, Brambles 4.7, enemy:lint-bunny 3.9, enemy:sprout-mite 3.7, enemy:frost-flea 3, enemy:ketchup-drop 2, enemy:aphid 1.5; 356 in all. Health gained over the run, by food, regeneration and anything else: about 221 (the game does not say from what).
- Weapons: Tater Tot Pup 8/8, Root Cellar 2/8.
- Passives: Gravy Heart 3/5, Bacon Bits 2/5, Slow Cooker 3/5.
- Items: Hot Pepper x2.
- Planner asked 114 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 112/120 | 9 | 0 | 4 | 28 | Hot oil, enemy:bog-slime |
| 1:00 | 128/149 | 43 | 57 | 7 | 73 | enemy:oil-drip, enemy:fry-fly |
| 2:00 | 49/149 | 80 | 0 | 10 | 114 | boss:amusing, enemy:crumb-ant |
| 3:00 | 87/149 | 24 | 60 | 11 | 180 | boss:beetle-queen, enemy:garden-slug |
| 4:00 | 27/149 | 121 | 60 | 13 | 171 | boss:the-masher, enemy:bog-toad |
| 5:00 | 4/163 | 68 | 44 | 14 | 188 | boss:beetle-queen, boss:the-masher |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00; The Masher (the-masher) at 4:00.
- First chest listed: 1:30. First time under 25% health: 4:51.
- Goals by kind (done / gave up / dropped): explore 28/0/22; spot 4/1/6; chest 2/2/0; evade 0/0/2; food 1/0/0.
- Dashes: 21 (1:32, 1:37, 1:42, 1:48, 2:02, 2:02, 2:11, 2:33, 2:39, 3:03, 3:27, 3:39, …).
- Model calls: 100 plans, 14 picks, 196 moves (mean 175ms); the page walked through 35 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 1:08 Gravy Heart 1/5 new; 1:45 Tater Tot Pup 4/8 to 7/8; 1:47 Bacon Bits 1/5 new; 1:59 Hot Pepper x1 new; 2:02 Slow Cooker 1/5 new; 3:05 Root Cellar 1/8 new.

## Plan

This run is a step toward Nightmare 10: no level is won yet, and items are the one area no run has scored, so this run asks how a shop puts an item on the board while the E91 stack still opens chests and evolves. The main question is E82. Directive line 3 and the two sentences after the generic planner.goal question say a Potato Crate or a Fry Cart is a yes when gold is at least 100 and no chest is listed, and a no when gold is under 100 or a chest is listed. If that holds, a shop goal starts on a plan in the yes state, and while a chest is listed the shop option stays near the 5–8% band instead of the 20–40% leak on UM213V. The same run carries E69, which cannot mask the goal scores: if none of the E91 weapon or catalyst cards is the one to take and an item is offered, planner.pick takes the item. Score E69 only when a card's kind is item. A shop that grants an item with no pick counts for E82 and leaves E69 inconclusive. The yes is inconclusive if gold never reaches 100, or a chest stays listed the whole time after that. Zero items is not a success. Before a chest, food, or that shop applies, the directive says: Otherwise, until a chest or food is listed, explore. Low health is line 2: If health is under 70% and food is listed, eat the food. Action templates, knobs, and the start stay the 9:34 run: tater-pup, exploreDistance 300, distrustBossRange 0.

<!-- review: written by the coach from coach-retrospective.md -->

(the coach is reviewing the run)

<!-- /review -->

## Picks

- **0:06** level-up: took Tater Tot Pup from Tater Tot Pup, Thick Skin, Chip Shuriken.
- **0:06** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:24** level-up: took Tater Tot Pup from Chives, Root Network, Tater Tot Pup.
- **0:24** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **0:38** level-up: took Tater Tot Pup from Tater Tot Pup, Peeler, Hot Streak.
- **0:38** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **1:08** level-up: took Gravy Heart from Fry Knives, Skipping Cannonball, Gravy Heart.
- **1:08** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **1:40** level-up: took Gravy Heart from Hash Rush, Seed Potato, Gravy Heart.
- **1:40** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.
- **1:45** gained without a pick (a chest or other): Tater Tot Pup 4/8 to 7/8.
- **1:47** level-up: took Bacon Bits from Julienne Dash, Bacon Bits, Root Spikes, Reroll (1).
- **1:47** gained without a pick (a chest or other): Bacon Bits 1/5 new.
- **1:53** gained without a pick (a chest or other): Tater Tot Pup 7/8 to 8/8.
- **1:59** gained without a pick (a chest or other): Hot Pepper x1 new.
- **2:02** level-up: took Slow Cooker from Chip Shuriken, Gravy Boat, Slow Cooker, Reroll (2).
- **2:02** gained without a pick (a chest or other): Slow Cooker 1/5 new.
- **2:04** vendor: took Hot Pepper from Hot Pepper, Leave.
- **2:04** gained without a pick (a chest or other): Hot Pepper x1 to x2.
- **2:15** level-up: took Slow Cooker from Bacon Bits, Slow Cooker, Rotten Spud, Reroll (2).
- **2:15** gained without a pick (a chest or other): Slow Cooker 1/5 to 2/5.
- **2:33** level-up: took Slow Cooker from Butter Streak, Slow Cooker, Fry Lance, Reroll (2).
- **2:33** gained without a pick (a chest or other): Slow Cooker 2/5 to 3/5.
- **3:05** level-up: took Root Cellar from Root Cellar, Mash Snowball, Seed Potato, Reroll (2).
- **3:05** gained without a pick (a chest or other): Root Cellar 1/8 new.
- **4:01** level-up: took Bacon Bits from Hash Boomerang, Bacon Bits, Broadside, Reroll (2).
- **4:01** gained without a pick (a chest or other): Bacon Bits 1/5 to 2/5.
- **4:03** level-up: took Root Cellar from Mash Finisher, Root Cellar, Salt Shaker, Reroll (2).
- **4:03** gained without a pick (a chest or other): Root Cellar 1/8 to 2/8.
- **5:21** level-up: took Gravy Heart from Gravy Heart, Golden Fry, Frozen Fries, Reroll (2).
- **5:21** gained without a pick (a chest or other): Gravy Heart 2/5 to 3/5.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
2. If health is under 70% and food is listed, eat the food.
3. If gold is at least 100 and no chest is listed, go to a Potato Crate or a Fry Cart and stand on it. A Potato Crate or a Fry Cart is a no when gold is under 100 or a chest is listed.
4. Otherwise, until a chest or food is listed, explore.
5. Evade only when no chest and no food is listed.
6. A Spud Freezer that is close is also good: it freezes every enemy for 7.5 seconds.
7. At a level-up, chest or shrine: if Tater Tot Pup is below 5/8 and its level is offered, take Tater Tot Pup. Take a level of any other weapon already held while it is below 5/8. Take Gravy Heart for Tater Tot Pup or Peeler, Fertilizer for Seed Potato or Seeker Sprouts, Big Bowl for Whisk Vortex, or GPU for Chip Shuriken. A new weapon is a no while any held weapon is at 1/8. If none of those is the card and an item is offered, take the item.

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
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger? When that goal is a Potato Crate or a Fry Cart, say yes if gold is at least 100 and no chest is listed, and say no if gold is under 100 or a chest is listed.
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}. If Tater Tot Pup is below 5/8 and its level is offered, take Tater Tot Pup. Take a level of any other weapon already held while it is below 5/8. Take Gravy Heart for Tater Tot Pup or Peeler, Fertilizer for Seed Potato or Seeker Sprouts, Big Bowl for Whisk Vortex, or GPU for Chip Shuriken. A new weapon is a no while any held weapon is at 1/8. If none of those is the card and an item is offered, take the item. Which option is that?
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
