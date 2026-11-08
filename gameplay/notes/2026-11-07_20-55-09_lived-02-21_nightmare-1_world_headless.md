# 2026-11-07 20-55-09: lived 02:21 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=svc3n02tzaj7a&stats=A8JCAPkCCUEBcbcAAACCBwMACXUCmiIAA9YExhkC8QED6u0BFLQB_dABA3pFj6coTwERogEYDAMAAQAAAAQAAABqAAACCAECCgaiAYADAwQDMCQ6BAUDePwBBQUbBQACvTIBcbceAgdIb3Qgb2lsHQB6chMAYAgSBgEABwIAAAkGA9E9ogEFCgLeBxEBAxICA9YWAQEgEgAQ0S5_GsQhL8YMgvf3ySo1AA |
| Ending | died at 2:21, level 9, 377 kills |
| Opening | first chest listed 1:51; 0 chests opened by 2:30; 3 elite fights and 1 elites killed by 3:00; first evolution none; level 9 at 3:00 |
| Testing | E91 |
| Seed | 2LICF7 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | fb48118 docs(gameplay): cursor reviews the 2026-11-07 20:34 run, lived 17:41 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_20-55-09_nightmare-1_world_headless.csv |

## Outcome

- Lived **2:21** (141.9s), level 9, 377 kills.
- Damage taken by source: enemy:sand-crab 49.8, boss:amusing 29.9, Hot oil 28.5, enemy:oil-drip 18.8, enemy:crumb-ant 18.4, enemy:aphid 7.5, enemy:potato-beetle 3.1, enemy:fry-fly 2.6, enemy:sprout-mite 1.5, enemy:frost-flea 1.5; 162 in all. Health gained over the run, by food, regeneration and anything else: about 38 (the game does not say from what).
- Weapons: Tater Tot Pup 4/8, Root Cellar 2/8.
- Passives: Thick Skin 1/5, Rotten Spud 1/5, Gravy Heart 1/5.
- Items: none.
- Planner asked 52 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 94/120 | 28 | 0 | 5 | 29 | Hot oil, enemy:sand-crab |
| 1:00 | 63/120 | 57 | 24 | 8 | 79 | enemy:sand-crab, Hot oil |
| 2:00 | 0/134 | 76 | 14 | 9 | 104 | boss:amusing, enemy:sand-crab |

- Bosses first seen: amusing (amusing) at 2:00.
- First chest listed: 1:51. First time under 25% health: 2:12.
- Goals by kind (done / gave up / dropped): spot 4/0/0; gems 6/0/1; explore 6/0/2; elite 1/0/1; chest 0/1/1.
- Dashes: 12 (0:58, 1:04, 1:09, 1:15, 1:20, 1:25, 1:34, 1:46, 2:02, 2:08, 2:13, 2:19).
- Model calls: 44 plans, 8 picks, 170 moves (mean 175ms); the page walked through 11 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:48 Root Cellar 1/8 new; 0:54 Thick Skin 1/5 new; 1:06 Rotten Spud 1/5 new; 2:01 Gravy Heart 1/5 new.

## Plan

This run serves the Nightmare 1 ladder by keeping the confirmed E81 chest loop on a chest-friendly opener while testing whether explicit pick rules get Tater Tot Pup past 1/8 and a second evolution before the queen minute—the failure mode on the 7:12 exploit (six weapons, one evolution, pup 1/8). Stack: E44-style planner.state (explore until chest or food is listed, then chest, food under 70%, elite after 2:00 when no chest), E81 planner.goal chest yes and gems/explore no while a chest is listed, food and elite noul lines, E24 dash, exploreDistance 300, tater-pup, distrustBossRange 0. The only deliberate change is directive line 5 in planner.state and matching planner.pick text (pup and held weapons below 5/8, named catalysts, no new weapon while any held weapon is 1/8). If the hypothesis holds, picks before 6:00 show Tater Tot Pup above 1/8 and at least two evolutions before 7:00 on a seed that lists a chest by ~2:30 like SBBOHY or H53WEU. Inconclusive if level-ups never offer a level of a weapon already held. A death before first chest listing measures opener seed, not the pick rule.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run was E91 on the E81 champion stack: explicit `planner.state` directive 5 and matching `planner.pick` text to level Tater Tot Pup and named catalysts while refusing new weapons while any held weapon is still 1/8. Seed 2LICF7 listed a chest at 1:51 after one elite kill, so the opener was not chest-never; Tibo still died at 2:21 with zero chests opened and zero evolutions. Picks did fire on pup when it was on the card (two level-ups to 4/8 plus Gravy Heart 1/5), but at 1:06 the planner took Rotten Spud while Root Cellar was 1/8, breaking the new-weapon ban. Health fell from 94% at 0:00 to death at 2:00 amusing plus minute-2 sand-crab and boss pressure; the chest goal that started at 1:51 was dropped for a level-up at 2:01 and failed at 2:07 while amusing was on the field. The pick directive helps pup leveling when offers exist; survival and evolution on this sample are dominated by opening hazard damage and the amusing-minute chest channel, not by default pick-fill.

## Findings

- **E91 pick rule (pup leveling):** When Tater Tot Pup was on the card below 5/8, the planner took it at 0:09 and 0:18 (100% each) and at 1:37 (96%), ending at 4/8; **likely** for “explicit text levels pup when offered,” one seed, compared with 20-29-08 default pick leaving pup 1/8 through 7:12.
- **E91 pick rule (no new weapon at 1/8):** At 1:06 Rotten Spud won at 81% while Root Cellar was 1/8; **lead** that the sentence is insufficient—model still prefers a new weapon/passive when the held 1/8 weapon is not the featured option.
- **E91 evolution / before-queen criterion:** Zero evolutions and death at 2:21; **refuted** for “second evolution before 7:00” on this run; not scored as refuting the full pick stack because the chest never opened.
- **Chest loop on 2LICF7:** First chest listed 1:51 (elite drop); goals chest 0 done / 1 gave up / 1 dropped; open-chest failed at 2:07 (`no closer for 6 seconds`) with amusing at 98% and hp 60/134; **likely** same boss-direction stall pattern as B54 on a much weaker board (pup 4/8, no evolution).
- **Opening damage:** 162 total; sand-crab 49.8, amusing 29.9, Hot oil 28.5; minute 0–1 lost 85 hp (stats); **likely** this seed’s opener is hazard- and pest-heavy despite chest listing by ~1:50.
- **Contrast same experiment:** 2026-11-07_20-42-39 on E91 lived 9:34 with first evolution 2:07 and four chests by 2:30—**likely** E91 outcome is seed-variance on survival/evolution, not pick-template absence.

## Went well

- **0:09–0:18** Pup taken twice at 100% on level-ups; reached 3/8 before any extra weapon clutter beyond Root Cellar at 0:48.
- **1:51** E60-style elite fight killed Sand Crab and listed a chest; planner immediately scored Open the chest 54%+ and started the goal—E81 chest policy engaged once a drop existed.
- **2:01** Gravy Heart taken at 93% with pup held—catalyst path toward Gravy Pack is on the board if a chest ever opens.
- **1:23** Beetle Nest channel at 0:22 completed (elite spot) without a nest ban—cheap early structure on this seed.

## Went poorly

- **0:32–0:54** Hot oil on explore down-left (`walk`/`move` rows, ~12+ hp in window); minute 0 ended 94/120 with 28 lost—should have weighted leaving oil higher or shortened gem/explore chains in poison.
- **1:06** Rotten Spud pick with Root Cellar at 1/8—should have been Skip or a Root Cellar level if offered; violated directive 5.
- **1:51–2:07** Chest open chase with hp falling 68→60 and amusing at 2:00; chest goal dropped at 2:01 for Gravy Heart pick, then failed stuck at 2:07—should have kept chest goal through pick or evaded once boss telegraphed during channel.
- **2:12–2:21** Under 25% hp at 2:12; fight sand-crab goals with unopened chests listed; died to sand-crab + amusing—should have prioritized surviving boss minute over secondary elite/chest juggling at 9 hp.

## Moments

- **0:09** level-up Tater Tot Pup 100%—right call.
- **0:48** Root Cellar new weapon—acceptable (no held weapon at 1/8).
- **1:06** Rotten Spud 81% with Root Cellar 1/8—should have refused new weapon.
- **0:32** hot oil ticks during explore—should have replanned off oil sooner.
- **1:51** elite kill → chest listed → open chest goal—right call.
- **2:00** amusing appears; still on chest approach at 63 hp—borderline; distrustBossRange 0 leaves forecast-only steps.
- **2:01** level-up Gravy Heart 93%; chest goal dropped for pick—retake chest goal immediately after pick was needed.
- **2:07** open chest failed (stuck 6s)—planner should have switched to evade with boss on field.
- **2:13** hp 25/134; elite/chest goals persist—should have evaded.
- **2:21** died 0 hp to sand-crab + amusing—run lost in boss minute without opening the only chest.

## Questions

- Does reordering `planner.pick` to check “any held weapon at 1/8 → only level held weapons or Skip” stop Rotten Spud–class takes? (→ proposed experiment below.)
- On chest-listed seeds that still die near 2:00, does E66 boss-within-200 on the E81 stack preserve the 1:51 chest long enough to open before amusing? (→ E92 area, chest-open precondition.)
- Is 2LICF7 class opener (hot oil + sand-crab before 2:00) predictable from first-minute standing_on, or only from outcome totals? (→ hazards/movement.)

## Next

1. **E91b / pick enforcement** on a chest-friendly seed (H53WEU or repeat 20-42-39 class): put “if any held weapon is 1/8, do not take any card that would add a new weapon” first in `planner.pick`, score whether Rotten Spud–type picks disappear while Root Cellar is 1/8; moves campaign by separating pick compliance from survival noise.
2. **E92** on a run that opens at least one chest before queen (same stack): boss-within-200 goal lines during amusing/queen to stop snow-mold-style elite/chase deaths; campaign needs evolution before minute 3.
3. **E88 opening** on E81: `planner.goal` explore yes / gems no until chest listed, so opening time is not spent on gems when explore should dominate—reduces 0:58–1:28 gem chains on short lives.

## Beliefs changed

- **B94** id: added run evidence; confidence stays **likely**; claim tightened: explicit pick text levels pup when on card but does not reliably enforce the 1/8 new-weapon ban.
- **B85** id: add 2LICF7 first chest 1:51, 0 opens by death 2:21; status **likely**, **recheck** unchanged.
- **B67** id: add Gravy Heart 1/5 taken at 2:01 on chest-listed run with pup 4/8; catalyst sentence works when offered; **lead** held.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:09** level-up: took Tater Tot Pup from Tater Tot Pup, Gravy Boat, Mash Wave.
- **0:10** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:18** level-up: took Tater Tot Pup from Tater Tot Pup, Mezzaluna, Clean Plate.
- **0:18** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **0:48** level-up: took Root Cellar from Root Cellar, Butter Streak, Skipping Cannonball.
- **0:48** gained without a pick (a chest or other): Root Cellar 1/8 new.
- **0:54** level-up: took Thick Skin from Potato Battery, Aged Russet, Thick Skin.
- **0:54** gained without a pick (a chest or other): Thick Skin 1/5 new.
- **1:06** level-up: took Rotten Spud from Rotten Spud, Spud Cannon, Hash Boomerang.
- **1:06** gained without a pick (a chest or other): Rotten Spud 1/5 new.
- **1:20** level-up: took Root Cellar from Tailgate Fries, Root Cellar, Fry Lance, Skip (1).
- **1:20** gained without a pick (a chest or other): Root Cellar 1/8 to 2/8.
- **1:37** level-up: took Tater Tot Pup from Rotten Spud, Root Cellar, Tater Tot Pup, Skip (1).
- **1:37** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **2:01** level-up: took Gravy Heart from Rotten Spud, Sour Cream, Gravy Heart, Skip (1).
- **2:01** gained without a pick (a chest or other): Gravy Heart 1/5 new.

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
5. At level-up, chest, and shrine: if Tater Tot Pup is below 5/8 and its level is on the card, take it. Take a level of any other held weapon below 5/8. Take Gravy Heart for Tater Tot Pup or Peeler, Fertilizer for Seed Potato or Seeker Sprouts, Big Bowl for Whisk Vortex, GPU for Chip Shuriken. Do not take a new weapon while any held weapon is still 1/8.
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

If Tater Tot Pup is below 5/8 and a level of Tater Tot Pup is offered, take it. If another held weapon is below 5/8 and its level is offered, take that level. If Gravy Heart is offered and Tater Tot Pup or Peeler is held, take Gravy Heart. If Fertilizer is offered and Seed Potato or Seeker Sprouts is held, take Fertilizer. If Big Bowl is offered and Whisk Vortex is held, take Big Bowl. If GPU is offered and Chip Shuriken is held, take GPU. Do not take a new weapon while any held weapon is still 1/8. Otherwise take the option that makes Tibo strongest.
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
