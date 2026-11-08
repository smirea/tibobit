# 2026-11-07 20-59-22: lived 02:31 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=pcevp878www9s&stats=A-hGAJYCCBYCClNwb3JlIHZlbnQAAADMBwIAA9YF8S8CFgL90AKw1AEFekWctgnb4_dDjwERlQEACwEAAQAAAAMAAABsAAACCAECDATMAfABAwYFCxRHKAgEBAKUAgIFFQUAehE7ANfdGwFxtxIAx_gJAOh_CQYBAAcCAAAJBgOHMJUBAAoC8AkRAQMSAgPWFgEBIBIAENEufxrEIS_GDIL398kqNQA |
| Ending | died at 2:31, level 8, 278 kills |
| Opening | first chest listed 1:47; 0 chests opened by 2:30; 3 elite fights and 0 elites killed by 3:00; first evolution none; level 8 at 3:00 |
| Testing | E96 |
| Seed | 1GKFGV6 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 7f7e456 docs(gameplay): cursor reviews the 2026-11-07 20:55 run, lived 2:21, testing E91 |
| Coach prompts | coach-plan.md 71e16386 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_20-59-22_nightmare-1_world_headless.csv |

## Outcome

- Lived **2:31** (151.1s), level 8, 278 kills.
- Damage taken by source: enemy:garden-slug 59, enemy:compost-maggot 26.7, boss:amusing 17.7, enemy:potato-beetle 8.9, enemy:cave-grub 8.9, enemy:ketchup-drop 8, enemy:sprout-mite 7.7, enemy:tomato-leech 3, Brambles 2.9, Spore vent 2.4, enemy:bowling-pin 2.1, enemy:crumb-ant 1.5; 149 in all. Health gained over the run, by food, regeneration and anything else: about 25 (the game does not say from what).
- Weapons: Tater Tot Pup 5/8.
- Passives: Gravy Heart 2/5, Couch Potato 1/5.
- Items: none.
- Planner asked 50 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 134/134 | 0 | 14 | 6 | 29 | - |
| 1:00 | 118/149 | 28 | 11 | 8 | 73 | enemy:compost-maggot, enemy:cave-grub |
| 2:00 | 0/149 | 121 | 0 | 8 | 108 | enemy:garden-slug, boss:amusing |

- Bosses first seen: amusing (amusing) at 2:00.
- First chest listed: 1:47. First time under 25% health: 2:21.
- Goals by kind (done / gave up / dropped): explore 3/0/8; gems 9/0/1; chest 0/2/0; elite 0/1/1.
- Dashes: 13 (1:12, 1:17, 1:28, 1:47, 1:53, 2:02, 2:07, 2:08, 2:13, 2:18, 2:24, 2:24, …).
- Model calls: 43 plans, 7 picks, 149 moves (mean 193ms); the page walked through 4 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:45 Gravy Heart 1/5 new; 0:59 Couch Potato 1/5 new.

## Plan

This run serves Nightmare 1 by keeping the confirmed E81 chest loop and E91 build path (pup levels, Gravy Heart catalyst, elite after 2:00 when no chest) while testing E96 in isolation: whether putting the 1/8 new-weapon ban first in planner.pick stops takes like Rotten Spud at 1:06 on 2LICF7 when Root Cellar was still 1/8. Stack unchanged except pick order—if any held weapon is 1/8, only level a held weapon or Skip, never a card that fills a new weapon slot; then the E91 pup, catalyst, and held-weapon level sentences. Default opening is directive rule 1: explore the map for gems and drops until a chest or food is listed; then chest, food under 70%, food under 40%, evade under 40% with no food, elites after 2:00. startWeapon tater-pup. If the hypothesis holds, a 1:06-style level-up with a held weapon at 1/8 never picks a new weapon or passive that is not a level of something already held (Rotten Spud should lose to Skip or a Root Cellar level). Pup above 1/8 by 6:00 and Gravy Pack before the queen remain secondary readouts on chest-friendly seeds; inconclusive if no pick occurs while any held weapon is 1/8. Run is inconclusive for the ban if the seed never lists a chest before death, because evolution timing was not the question.

<!-- review: written by the coach from coach-retrospective.md -->

(the coach is reviewing the run)

<!-- /review -->

## Picks

- **0:13** level-up: took Tater Tot Pup from Fry Lance, Golden Fry, Tater Tot Pup.
- **0:13** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:17** level-up: took Tater Tot Pup from Clean Plate, Tater Tot Pup, Hash Rush.
- **0:17** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **0:35** level-up: took Tater Tot Pup from Root Network, Butter Pat, Tater Tot Pup.
- **0:35** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **0:44** level-up: took Gravy Heart from Peeler, Skipping Cannonball, Gravy Heart.
- **0:45** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **0:59** level-up: took Couch Potato from Sprout Satellites, Couch Potato, Four-Eyed Spud.
- **0:59** gained without a pick (a chest or other): Couch Potato 1/5 new.
- **1:19** level-up: took Tater Tot Pup from Tater Tot Pup, Seeker Sprouts, Hot Start.
- **1:19** gained without a pick (a chest or other): Tater Tot Pup 4/8 to 5/8.
- **1:48** level-up: took Gravy Heart from Root Spikes, Butter Pat, Gravy Heart.
- **1:48** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. Until a chest or food is listed, explore the map for gems and drops.
2. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
3. If health is under 70% and food is listed, eat the food.
4. If health is under 40% and food is listed, eat it. If under 40% with no food listed, keep away from enemies.
5. At level-up, chest, and shrine: if Tater Tot Pup is below 5/8 and its level is on the card, take Tater Tot Pup; take a level of any other held weapon below 5/8; take Gravy Heart for Tater Tot Pup or Peeler, Fertilizer for Seed Potato or Seeker Sprouts, Big Bowl for Whisk Vortex, GPU for Chip Shuriken; do not take a new weapon while any held weapon is still 1/8.
6. After 2:00, if no chest is listed, fight the nearest listed elite until it dies.

What we know, most important first:
- A planner.goal yes on open-chest while a chest is listed starts chest goals; state alone is not enough.
- Default picks fill six new weapons and leave the starter at 1/8; level the pup and catalysts before new weapons.
- Gravy Pack is Tater Tot Pup at max plus Gravy Heart.
- Food heals about 30 hp. Eat before health is very low.
- Hot oil, spore vents, and bosses hurt on steps the forecast calls free.
- Small enemies within 60 units and ice-imp bursts dominate late minutes on full boards.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger?

If a chest is listed and the goal is to open that chest, say yes. If a chest is listed and the goal is to collect gems or explore a direction, say no.

If health is under 70% and food is listed and the goal is to eat that food, say yes.

If no chest is listed and game time is past 2:00 and the goal is to fight a listed elite, say yes. If no chest is listed and the goal is only to explore or collect gems, say no unless nothing else listed matters.
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}. Which option makes Tibo strongest?

If any held weapon is still 1/8, take only a level of a held weapon or Skip. Never take a card that adds a new weapon slot or a new passive while a held weapon is 1/8.

If Tater Tot Pup is below 5/8 and a level of Tater Tot Pup is offered, take it. If another held weapon is below 5/8 and its level is offered, take that level. If Gravy Heart is offered and Tater Tot Pup or Peeler is held, take Gravy Heart. If Fertilizer is offered and Seed Potato or Seeker Sprouts is held, take Fertilizer. If Big Bowl is offered and Whisk Vortex is held, take Big Bowl. If GPU is offered and Chip Shuriken is held, take GPU. Otherwise take the option that makes Tibo strongest.
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
