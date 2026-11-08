# 2026-11-07 19-14-47: lived 04:11 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=w8t77ad63vptz&stats=A_N1ALABBw0AhoIAAACtDAMAA9YCtB0CvwMAzf4BAAJWZwE8hQMJekUoT4-nCdvlIe4J4_ectlEiARLyAXkNAAABAAAABQAAAM4BAAACCgEECAIAAlpkTEwDCgkwGiQVRwoRBBIEBQOiAQ4ABRUFAIaCSAH4Rx4BcbcbAHpyFwACvQ0GAQAHAgAACQYD8yDyAQAKAtoNEQEDEgID1hYBASASABBgJ5xzBe4yMQyO9mPQ3zoA |
| Ending | died at 4:11, level 7, 176 kills |
| Opening | first chest listed never; 0 chests opened by 2:30; first evolution none; level 5 at 3:00 |
| Testing | E65 |
| Seed | Y1EN48 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | 8c5cdb0 docs(gameplay): grok reviews the 2026-11-07 19:00 run, lived 3:45, testing E59 |
| Coach prompts | coach-plan.md 99ee6853 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-14-47_nightmare-1_world_headless.csv |

## Outcome

- Lived **4:11** (251.5s), level 7, 176 kills.
- Damage taken by source: enemy:ice-imp 72.2, boss:beetle-queen 30.5, boss:amusing 26.6, enemy:oil-drip 22.9, enemy:sand-crab 12.6, enemy:snow-mold 11.7, Hot oil 11.3, boss:the-masher 11.2, enemy:frost-flea 9.9, enemy:aphid 5.9, enemy:crumb-ant 4.6, enemy:fry-fly 4.6, enemy:potato-beetle 4.5, enemy:ketchup-drop 4.4, enemy:cave-grub 4.2, enemy:sprout-mite 2.9, enemy:lint-bunny 1.6; 242 in all. Health gained over the run, by food, regeneration and anything else: about 77 (the game does not say from what).
- Weapons: Tater Tot Pup 2/8, Frying Pan 1/8.
- Passives: Salt Shaker 1/5, Root Network 3/5.
- Items: none.
- Planner asked 79 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 116/120 | 11 | 5 | 4 | 28 | Hot oil, enemy:oil-drip |
| 1:00 | 119/120 | 18 | 17 | 5 | 74 | enemy:oil-drip, enemy:crumb-ant |
| 2:00 | 120/120 | 32 | 35 | 5 | 118 | enemy:sand-crab, enemy:oil-drip |
| 3:00 | 77/120 | 72 | 18 | 6 | 173 | enemy:ice-imp, boss:beetle-queen |
| 4:00 | 30/120 | 53 | 2 | 7 | 191 | boss:the-masher, enemy:potato-beetle |

- Bosses first seen: Colorado Queen (beetle-queen) at 1:44; amusing (amusing) at 2:00; The Masher (the-masher) at 4:00.
- First chest listed: never. First time under 25% health: 4:09.
- Goals by kind (done / gave up / dropped): explore 30/0/14; evade 2/0/1; spot 1/0/0.
- Dashes: 15 (0:46, 0:56, 1:04, 1:10, 1:19, 1:39, 2:02, 2:35, 2:44, 3:04, 3:05, 3:18, …).
- Model calls: 73 plans, 7 picks, 156 moves (mean 177ms); the page walked through 27 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:11 Salt Shaker 1/5 new; 0:23 Root Network 1/5 new; 4:10 Frying Pan 1/8 new.

## Plan

This run climbs Nightmare 1 by testing one build question: whether finishing a held recipe before the Colorado Queen is what the 3:45 death lacked. That run maxed Seed Potato, evolved nothing, and lost 97 hp in minute 3. Goals stay the last run's words. Until a chest or food is listed, explore. If health is under 40% and food is listed, eat the food. If health is under 40% and no food is listed, evade. If a boss is within 200 units, evade, and do not open a chest or charge a spot. If a chest is listed and no boss is within 200, open it. The only change is the card choice, written in both planner.state and planner.pick because the pick reads its own question and the state is on the page at that choice. Take the card that finishes a held recipe. Fertilizer finishes Seed Potato and Seeker Sprouts. Gravy Heart finishes Tater Tot Pup and Peeler. Big Bowl finishes Whisk Vortex. GPU finishes Chip Shuriken. If a held weapon is at 5/8 or higher and a passive is offered, take that passive, not a new weapon. Do not fill a sixth weapon slot until one recipe is ready. If that holds, the passive wins the 2:23-style choice and a chest before 3:30 evolves a weapon. If the queen is reached after that, minute 3 should lose less than 97 hp. Inconclusive if no choice offers a passive while a weapon is at 5/8 or higher, or if no recipe is ever one card from done. Action text, knobs and tater-pup stay as the 3:45 run. Build has sat since early today; the last two runs were bosses and hazards.

<!-- review: written by the coach from coach-retrospective.md -->

(the coach is reviewing the run)

<!-- /review -->

## Picks

- **0:10** level-up: took Salt Shaker from Stuffed Skin, Salt Shaker, Broadside.
- **0:11** gained without a pick (a chest or other): Salt Shaker 1/5 new.
- **0:23** level-up: took Root Network from Clean Plate, Root Network, Golden Fry.
- **0:23** gained without a pick (a chest or other): Root Network 1/5 new.
- **0:56** level-up: took Root Network from Tater Mines, Salt Line, Root Network.
- **0:56** gained without a pick (a chest or other): Root Network 1/5 to 2/5.
- **1:40** level-up: took Tater Tot Pup from Rotten Spud, Starch Plating, Tater Tot Pup.
- **1:40** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **3:31** level-up: took Root Network from Root Network, Bacon Bits, Fry Knives.
- **3:31** gained without a pick (a chest or other): Root Network 2/5 to 3/5.
- **4:10** level-up: took Frying Pan from Hot Streak, Frying Pan, Small Fry.
- **4:10** gained without a pick (a chest or other): Frying Pan 1/8 new.

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

On a card choice: take the card that finishes a held recipe. Fertilizer finishes Seed Potato and Seeker Sprouts. Gravy Heart finishes Tater Tot Pup and Peeler. Big Bowl finishes Whisk Vortex. GPU finishes Chip Shuriken. If a held weapon is at 5/8 or higher and a passive is offered, take that passive, not a new weapon. Do not fill a sixth weapon slot until one recipe is ready.

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
Tibo is at a {{choice}}. Take the card that finishes a held recipe. Fertilizer finishes Seed Potato and Seeker Sprouts. Gravy Heart finishes Tater Tot Pup and Peeler. Big Bowl finishes Whisk Vortex. GPU finishes Chip Shuriken. If a held weapon is at 5/8 or higher and a passive is offered, take that passive, not a new weapon. Do not fill a sixth weapon slot until one recipe is ready. Which option makes Tibo strongest?
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
