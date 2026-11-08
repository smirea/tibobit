# 2026-11-07 19-49-10: lived 03:23 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=g18va5c8jeywj&stats=A5tfAIUBBxgBcbcAAACfCgIAA9YBvxwCTAS_3gKiAAK2LgGxgwEHekUoT4w6nLYJ2-UhUSIBEpIBGB4AAAEAAAAFAAAAtQEAAAIIAQMIAgRcPFADCAcSBUpKCA8KBAQCggEDBRsFAgdIb3Qgb2lsIAD5TRoAvmIUAXG3EwB6ERIGAQAHAgAACQYDix2SAQAKApkLEQEDEgID1hYBASASABBgJ5xzBe4yMQyO9mPQ3zoA |
| Ending | died at 3:23, level 7, 133 kills |
| Opening | first chest listed never; 0 chests opened by 2:30; 6 elite fights and 0 elites killed by 3:00; first evolution none; level 7 at 3:00 |
| Testing | E79 |
| Seed | NAFTJ5 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 6c0f744 docs(gameplay): cursor reviews the 2026-11-07 19:42 run, lived 3:51, testing E77 |
| Coach prompts | coach-plan.md c05498af; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-49-10_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:23** (203.1s), level 7, 133 kills.
- Damage taken by source: Hot oil 32.1, enemy:ketchup-drop 26.3, enemy:bog-slime 19.8, boss:amusing 18.8, enemy:garden-slug 18.2, enemy:snow-mold 15.6, enemy:fry-fly 4.9, enemy:aphid 3.2, enemy:sprout-mite 2.8, boss:beetle-queen 2.7, enemy:crumb-ant 1.3; 146 in all. Health gained over the run, by food, regeneration and anything else: about 24 (the game does not say from what).
- Weapons: Tater Tot Pup 1/8.
- Passives: Butter Socks 2/5, Sour Cream 2/5, GPU 1/5, Hot Start 1/5.
- Items: none.
- Planner asked 64 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 98/120 | 22 | 0 | 4 | 29 | Hot oil, enemy:ketchup-drop |
| 1:00 | 78/120 | 19 | 0 | 5 | 72 | enemy:garden-slug, enemy:fry-fly |
| 2:00 | 28/120 | 74 | 24 | 7 | 115 | enemy:ketchup-drop, enemy:bog-slime |
| 3:00 | 1/120 | 28 | 0 | 7 | 181 | enemy:snow-mold, boss:amusing |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00.
- First chest listed: never. First time under 25% health: 2:58.
- Goals by kind (done / gave up / dropped): explore 13/0/3; elite 0/1/5; evade 9/0/0.
- Dashes: 30 (0:29, 0:29, 0:52, 0:55, 0:57, 1:06, 1:06, 1:11, 1:22, 1:22, 1:28, 1:31, …).
- Model calls: 58 plans, 6 picks, 363 moves (mean 196ms); the page walked through 4 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:21 Butter Socks 1/5 new; 0:45 Sour Cream 1/5 new; 2:12 GPU 1/5 new; 2:58 Hot Start 1/5 new.

## Plan

This run serves the Nightmare 1 ladder by keeping the integrated E77 stack (E75 opener, E66 boss-window yes/no in planner.goal, E60 elite-after-2:00, E24 dash, distrustBossRange 400, tater-pup) and testing only E79. On 1SGEC23 at 2:20 the planner scored Fight the Bog Toad about 75% while a chest 65 away scored 27% even though health was above 40% and no boss was within 200, because the elite sentence stayed yes-shaped whenever no chest was the only condition. We add one planner.goal rule: when a chest is listed, health is at least 40%, and no boss is within 200, opening that chest is a yes and fighting a listed elite is a no. If the hypothesis holds, the first plan row where both options appear shows the chest above the elite and a chest goal starts instead of another elite walk into the amusing minute. The run is inconclusive for E79 if that pair never appears before death; a death with zero chest opens on a chest-never seed still scores opener health and minute-2 boss loss separately. Default goal before any chest is listed remains explore.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run kept the E77 stack (E75 opener, E66 boss-window lines in planner.goal, E60 elite-after-2:00, E24 dash, distrustBossRange 400, tater-pup) and changed only E79: when a chest is listed, health is at least 40%, and no boss is within 200, planner.goal should say yes to opening that chest and no to fighting a listed elite. On seed NAFTJ5 Tibo never listed a chest (Stats: first chest never; 0 opens), so the chest-versus-elite score pair E79 needs never appeared. The hypothesis is **inconclusive for E79**, not refuted. Tibo still exercised the stack: explore until amusing at 2:00, nine evade segments, six elite fight goals after 1:26 with **zero elite kills** and therefore no chest drops. Health fell from 98% at 1:00 to 28/120 at 2:00 and 1/120 by 3:00; death at 3:23 with Tater Tot Pup 1/8 and no evolution. Hot oil led damage (32.1 of 146), same opening pattern as IXJBKS more than YLS7TB spores.

## Findings

- **E79 untested on pairing (inconclusive, lead):** Plan required the first plan row where both open-chest and fight-elite appear with hp ≥ 40% and no boss within 200. Outcome and Stats: first chest listed never; goal kinds show no chest goals. No log row can score chest vs elite. This is a **template-readiness** result on a chest-never seed, not evidence that the elite-no / chest-yes sentences fail. (Sure: high.)
- **Elite goals without kills do not advance the ladder (likely):** Stats: elite 0 done / 1 gave up / 5 dropped; 6 fight attempts, 0 elites killed by 3:00. Examples: Fight the Garden Slug from 1:26 (plan ~54%) through 1:58 failed (stuck 6s at 82 hp); repeated slug goals 2:08–2:12 dropped for evade when amusing appeared. No chest from elites. (Sure: likely on this seed; one sample.)
- **Minute 2 is still the hinge on chest-starved seeds (likely):** Stats minute 2: 78→28 hp, −74 lost, hurt most ketchup-drop and bog-slime; amusing first seen 2:00. E77 on 16YSA5O lived 3:51 with chests at 1:30; this seed never opened the E79 or evolution path. (Sure: likely.)
- **Boss-window evade still fires; amusing damage remains material (likely):** At 2:00 plan chose Keep away 74% (boss appeared). Later evade segments lost 29 hp (2:20), 16 hp (2:45), etc.; outcome boss:amusing 18.8. distrustBossRange 400 forced model steps near amusing (many move rows). (Sure: likely.)
- **Opening hot oil again (lead):** Minute 0 −22 hp, hurt most Hot oil and ketchup-drop; log 0:26–0:30 hot oil underfoot during explore up-left. Outcome hot oil 32.1 top source. (Sure: lead; same mechanic as IXJBKS, different seed mix.)

## Went well

- **2:00 amusing:** Evade won on boss appearance (plan keep-away 74% at 2:00, hp 78/120) — E66-style goal lines still beat explore in the first boss plan.
- **0:21–0:59 picks:** Butter Socks and Sour Cream taken twice; sensible passive stacking on tater-pup without a sixth weapon clog.
- **2:08–2:17 evade blocks:** Two evade goals ended “kept clear for 8 seconds without losing health” (2:08, 2:53) while amusing was on the field — boss kite sometimes works at ~50 hp.
- **Knobs:** E24 dash used 30 times; distrustBossRange 400 visible on amusing steps (forecast not trusted).

## Went poorly

- **1:26–1:58 elite walks (hp and time):** Fight the Garden Slug goals at ~87–82 hp made little progress; 1:58 goal failed (no closer 6s). Should have been explore or evade until 2:00 on a chest-never seed, or elite only after a clear kill window — elite consumed planner cycles without a drop.
- **2:00–2:12 amusing overlap:** Dropped slug goal for evade at 2:00 at 78 hp, then after first evade done at 2:08 immediately restarted Fight the Garden Slug (60% plan) with amusing 210 away — past-2:00 elite rule fired without a chest payoff.
- **2:58 Hot Start at 28/120:** Level-up during evade with amusing 63 down; pick did not restore runway before queen minute.
- **3:17 death band:** 28→1 hp in final minute (snow-mold, amusing, beetle-queen 2.7); no food goal ever listed under 40%.

## Moments

- **0:27** Hot oil while exploring up-left (−5 hp, underfoot burn). Better: same as E57 — step off hazard when action is asked; opener still costly on this seed.
- **0:59** Butter Socks 2/5 level-up during explore. Right call for movement/defense early.
- **1:26** First Fight the Garden Slug goal (54% plan, hp 94). Better: on NAFTJ5 with no chest path, defer elite until post-2:00 unless template forces fight — fight started 34s early.
- **1:58** Elite goal failed stuck; hp 78. Better: shorter eliteSeconds or abandon slug when not closing.
- **2:00** Amusing appears; evade 74% over slug. Right call.
- **2:12** GPU pick + amusing 75 away; hp dropped 81→75 on evade steps. Acceptable trade for level; risky at boss range.
- **2:20** Evade ended losing 29 hp in 8s (51→28%). Better: food if listed; none was.
- **2:58** Hot Start at 28/120 (under 25%). Better: evade-only until food; no food listed.
- **3:00** Colorado Queen plan (evade 86%); hp 28.
- **3:11** Last evade lost 25 hp in 8s; hp 33→near death.
- **3:23** Died 1/120 on model step with amusing 87 left and queen 310 away. Better: not applicable — no heal source left.

## Questions

- On chest-never seeds, does forcing elite-no when chest *would* be listed still matter if we never get a listing without changing elite kill rate? (Proposed experiment E80.)
- Should planner.state forbid starting elite goals before 2:00 on Open World, matching the E60 planner.goal window? (Elite at 1:26 on this run.)
- Does NAFTJ5 always chest-never at explore 300, or did exploreDistance / path miss a drop? (Map/meta.)

## Next

1. **E80 (models):** Re-run E79 chest-yes / elite-no planner.goal on **1SGEC23 or 16YSA5O** (chest listed by ~1:30). Log first plan with both options at ≥40% hp, no boss within 200; compare to 2:20 / 2:24 on E75 (elite 75% vs chest 27%). Moves E79 from inconclusive to confirmed/refuted.
2. **E78 (bosses):** E75 stack + E66 lines on a **chest-strong** seed; target minute-2 hp below E75’s −116 on 1SGEC23, with nest/elite not started while boss &lt;200.
3. **E70/E76 (build):** Once a chest lists, E65 pick on 1AS5RU0-class seed — this run never reached 5/8 weapon; pair with E80 policy seed.

## Beliefs changed

- **B49** (likely → likely, evidence): added NAFTJ5 E79 — first chest never, 19 explores, died 3:23.
- **B72** (likely, evidence): added E79 — pup 1/8, no evolution, amusing minute on chest-never.
- **B74** (likely, evidence): E79 run did not exercise chest-vs-elite pairing; inconclusive for rule, not for 1SGEC23 2:20 case.

## Process changes

None.

<!-- /review -->

## Picks

- **0:21** level-up: took Butter Socks from Peel Out, Mash Wave, Butter Socks.
- **0:21** gained without a pick (a chest or other): Butter Socks 1/5 new.
- **0:45** level-up: took Sour Cream from Chip Shuriken, Hash Boomerang, Sour Cream.
- **0:45** gained without a pick (a chest or other): Sour Cream 1/5 new.
- **0:59** level-up: took Butter Socks from Butter Socks, Spry Sprout, Tater Tot Pup.
- **0:59** gained without a pick (a chest or other): Butter Socks 1/5 to 2/5.
- **1:39** level-up: took Sour Cream from Spry Sprout, Steam Vent, Sour Cream.
- **1:39** gained without a pick (a chest or other): Sour Cream 1/5 to 2/5.
- **2:12** level-up: took GPU from GPU, Harvest Moon, Butter Streak.
- **2:12** gained without a pick (a chest or other): GPU 1/5 new.
- **2:58** level-up: took Hot Start from Starch Chain, Four-Eyed Spud, Hot Start.
- **2:58** gained without a pick (a chest or other): Hot Start 1/5 new.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. Until a chest or food is listed, explore to find chests. Do not charge Crop Patch, Beetle Nest, Boss Lair, or other charge spots before a chest is listed.
2. If a chest is listed and health is at least 40% and no boss is within 200 units, open it.
3. If health is under 70% and food is listed, eat the food.
4. If health is under 40% and food is listed, eat it. If health is under 40%, no food is listed, and no chest is listed, evade.
5. If a boss is within 200 units, evade and do not open a chest or charge a spot.
6. If game time is past 2:00, no chest is listed, and a listed elite is available, fight that elite to get a chest drop.
7. Do not walk into or finish charging a Boss Lair during explore.

What we know, most important first:
- Chests come from elites and bosses; explore alone may never list a chest by 3:00 on some seeds.
- When a chest and an elite are both offered at 40%+ hp with no boss near, opening the chest beats fighting the elite.
- On this mode the crowd hurts; bosses hit outside the one-second forecast.
- Food heals about 30 hp.
- Hot oil and Spore vent hurt if Tibo stands on them.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger? Chest listed, health at least 40%, no boss within 200: say yes to opening that chest; say no to fighting a listed elite. Boss within 200: yes evade; no chest, elite, charge spot, gems, or explore. Health under 40% and food listed: yes eat food; no evade even if a boss is within 200. Health under 70%: yes eat food when listed. Past 2:00 and no chest listed: yes fight a listed elite; no explore or gems when that elite is listed.
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}. Which option makes Tibo strongest? Prefer leveling weapons and passives Tibo already holds. Take evolutions and catalysts when the choice offers them and Tibo already owns the other part.
~~~

### action.state

~~~text
Tibo is a potato hero in a survivors game. Weapons fire on their own; Tibo only walks.
Goal: {{goal}}.
{{health}}
{{hurt_by}}
{{enemies}}
{{dash}}
{{standing_on}}
Hot oil, Spore vent, and Brambles underfoot burn or slow; step off that tile if the goal allows.
~~~

### action.hurt

~~~text
If Tibo does this: {{move}}. How badly does it hurt Tibo in the next second? Standing in hot oil or spore vents hurts even when the forecast looks free.
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
Should Tibo dash now because health fell 5 or more in the last 3 seconds, or because 5 or more enemies are within 60 units? Never dash while standing on a chest that is still charging.
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
