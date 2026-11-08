# 2026-11-07 19-42-19: lived 03:51 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=0q08qtv2ghbnk&stats=A6dsAMoJDL0BAG38AQQAlAsDAIzOCLHiAQAD1gXMPALHBAPrRwF_NgH90AEJekUoT4w6nLYJ24-nAxbj9-UhARLbAVIOBgABAAAABQEAALYBAAACCwEDCAoChAHWA-gHAwoJDCURBEYFCEENBAYDxQfsARkFGwUBcbcsAG38IgIHSG90IG9pbBgAe-oVAfhHFQYBAAcCAAAJBwPEowLbAQAKAs8LEQEDEgID1hYBASASABBgJ5xzBe4yMQyO9mPQ3zoA |
| Ending | died at 3:51, level 12, 1226 kills |
| Opening | first chest listed 1:30; 3 chests opened by 2:30; 3 elite fights and 2 elites killed by 3:00; first evolution none; level 10 at 3:00 |
| Testing | E77 |
| Seed | 16YSA5O |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 8c24116 docs(gameplay): cursor reviews the 2026-11-07 19:36 run, lived 3:00, testing E75 |
| Coach prompts | coach-plan.md c05498af; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-42-19_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:51** (231.1s), level 12, 1226 kills.
- Damage taken by source: boss:amusing 44.4, enemy:snow-mold 34.3, Hot oil 24.3, enemy:fry-fly 20.9, boss:beetle-queen 20.9, enemy:field-rat 18.8, enemy:cave-grub 15.9, Spore vent 10.3, enemy:garden-slug 10, enemy:blight-spore 6, Brambles 5.3, enemy:crumb-ant 2.6, enemy:bog-slime 1.9, enemy:frost-flea 1.9, enemy:aphid 1.6; 219 in all. Health gained over the run, by food, regeneration and anything else: about 97 (the game does not say from what).
- Weapons: Tater Tot Pup 5/8, Starch Chain 8/8.
- Passives: Lean Lunch 1/5, Hot Sauce 1/5, Gravy Heart 1/5.
- Items: none.
- Planner asked 87 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 116/120 | 31 | 26 | 4 | 28 | Hot oil, enemy:crumb-ant |
| 1:00 | 64/120 | 54 | 0 | 9 | 71 | enemy:fry-fly, enemy:field-rat |
| 2:00 | 54/134 | 52 | 44 | 10 | 104 | boss:amusing, enemy:blight-spore |
| 3:00 | 2/134 | 82 | 27 | 12 | 173 | enemy:snow-mold, enemy:cave-grub |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00.
- First chest listed: 1:30. First time under 25% health: 2:08.
- Goals by kind (done / gave up / dropped): explore 17/0/4; spot 2/0/0; elite 2/0/2; chest 3/0/0; gems 0/0/1; evade 10/0/0; food 1/0/0.
- Dashes: 15 (0:35, 1:29, 1:35, 1:48, 2:03, 2:08, 2:14, 2:35, 2:36, 3:04, 3:10, 3:17, …).
- Model calls: 73 plans, 14 picks, 325 moves (mean 186ms); the page walked through 4 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:24 Lean Lunch 1/5 new; 0:46 Starch Chain 1/8 new; 1:37 Hot Sauce 1/5 new; 2:35 Gravy Heart 1/5 new.

## Plan

This run serves the Nightmare 1 ladder by keeping the integrated E75 champion stack unchanged (explore until a chest or food is listed, E66 boss window goals, E60 elite-after-2:00, distrustBossRange 400, tater-pup) and testing only E77. The 19-36-44 run listed food at 11/120 and planner.goal scored Eat food at 78%, but the goal was dropped for evade at 92% while amusing was still on the field. We add planner.goal lines that score yes for listed food under 40% even when a boss is within 200, and no for evade or keep-clear when food is listed and health is under 40%. If the hypothesis holds, a sub-40% food listing produces a completed food goal instead of an evade chain into death; if food never lists under 40%, the run is inconclusive for E77 but still gives Tibo a normal exploit attempt on whatever seed draws.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run was **E77** on seed **16YSA5O**: the E75 champion stack plus `planner.goal` lines that say yes to listed food under 40% even when a boss is within 200, and no to evade when food is listed and health is under 40%. Tibo lived **3:51** (level 12), better than E75 on 1SGEC23 (3:23) and with a stronger opener (first chest **1:30**, three chests and **Starch Chain 8/8** by 3:18). The headline test is only **partly satisfied**: at **2:37** a **food goal completed** from **13/134** hp (+30 to 58/134), so sub-40% food can win and heal. During the critical window (**2:08–2:13**) with amusing inside ~150 units and food listed at **11–26%** health, **keep-away still beat eat food** (e.g. **2:13** Eat food **54%** vs Keep away **66%**; **2:08** food **27%** vs evade **69%**), so the boss-within-200 override did not hold on every replan. Death was minute-3 crowd and boss pressure (outcome: snow-mold **34.3**, amusing **44.4**, cave-grub **15.9**), not a repeat of the E75 food-vs-evade miss at 11 hp on another seed.

## Findings

- **E77 food-under-40% can complete after many evade cycles** — Food goal **F65784** started **2:32** at **13/120**, plan Eat food **55%**; **done eaten 2:37**, hp **28→58/134** (+30). **Likely** on this seed; one clean boss-overlap sub-40% win not shown.
- **Boss-within-200 + sub-40% + food listed still lost to evade on several plans** — **2:08** amusing ~43 away, hp **54→26**, evade **69%** over food **27%**; **2:13** food **54%** but evade **66%** chosen. **Refutes** the strict reading of E77 (always food over evade in that state); template conflict or noul not decisive enough. **Likely**.
- **E75 opener behaved on this seed** — Explore until chest, nests at **0:45** and **1:45**, first chest **1:30**, three chest opens, Starch Chain maxed **3:18**; no evolution (catalyst pattern still unproven). **Lead** for ladder opener, not campaign win.
- **Minute 2 amusing evade cost ~60 hp** — Stats: **64/120→54/134** at 2:00 with amusing top minute hurt; first **<25%** at **2:08**. Same structural boss minute as E75/E66, slightly less total amusing damage than 1SGEC23 (**44.4** vs **83.2** on a prior note). **Likely**.
- **Single food goal in run (1 done)** — Stats food **1/0/0**; gems dropped once at **1:53** at **64/120**; no repeat food crisis after queen. **Lead**.

## Went well

- **1:30–1:40** elite/chest chain: fry-fly kill → chest opens, Starch Chain stacked; built real DPS before **2:00**.
- **2:32–2:37** E77 payoff: forced food pick from **13 hp**, +30 heal, Gravy Heart taken **2:35** same window.
- **E66 boss `planner.goal` lines** kept amusing appearance at **2:00** on evade (**84%**); no chest goal during boss proximity when chests existed elsewhere (three chest goals total, none in 2:00–2:16 window with amusing close).

## Went poorly

- **0:26–0:34** hot-oil loop on explore: health **116→94** on standing_on hot oil (hurt_by Hot oil **24.3** total by end).
- **2:00–2:32** extended evade with food on the board under 40%: **10 evade goals**, lost **~45 hp** in evade goal endings (e.g. **2:16** goal ended lost **35 hp** in 8s).
- **3:00+** queen minute at **2/134** after minute 3 lost **82**; evade chains with **Eat food 30–45%** never taken; died **3:51** snow-mold/cave-grub on crowded steps.

## Moments

- **0:45** Charge Beetle Nest completes — right call, chest economy starts; **better**: none.
- **1:30** First chest listed, fight fry-fly then open — right call.
- **2:00** amusing spawns, evade **84%** — right call per E66; **better**: none for protocol.
- **2:08** hp **54→28**, evade **69%** beats food **27%** with amusing **43** away — **better**: food must win if E77 hypothesis is strict.
- **2:13** food **54%** but evade **66%** still — **better**: same.
- **2:16** second evade block loses **35 hp** — **better**: eat food if listed under 40%.
- **2:32** food goal starts at **13 hp**, **55%** — **right call**.
- **2:37** food eaten **+30** — **right call**; run's main E77 evidence.
- **2:37–2:45** back to evade despite listed food — **better**: hold food priority until >40%.
- **3:00** gems goal dropped for queen evade — acceptable.
- **3:50** level-up at **2/134** then death next second — too weak for queen minute; **better**: earlier food or chest evolution path.

## Questions

- Why does keep-away beat eat-food at **54%** vs **66%** when directive and `planner.goal` both favour food under 40%? (models / template ordering)
- Does doubling food noul when boss <200 and hp <40% change **2:08**-style plans without breaking E66 boss window?
- Can Gravy Heart + max Starch Chain without evolution reach queen minute on 16YSA5O with less minute-3 loss?

## Next

1. **E77b (models)** — Same stack; strengthen `planner.goal` only: under 40% + food listed ⇒ food **yes** and evade **no** even if boss <200; replay seed **16YSA5O** or track food-goal-start at first sub-40% boss overlap. Moves campaign by fixing the 2:08–2:13 failure mode E75 had on another seed.
2. **E78 (bosses)** — E75 stack + E66 boss `planner.goal`; forbid elite/chest during boss <200; compare minute-2 loss to **116** on 1SGEC23. Moves campaign by buying hp through amusing.
3. **E76 (build)** — E60 + E65 pick on **1AS5RU0**-class seed once chests level weapons; first evolution before queen. Moves campaign via power spike.

## Beliefs changed

- **B79** (new, lead): Sub-40% food can complete after prolonged evade when food eventually wins the vote (**2:37** on 16YSA5O); E77 lines alone do not guarantee first sub-40% plan picks food over evade when boss is near.
- **B71** — evidence extended: amusing **2:00** keep-away **84%**; evade dominant until food win **2:32**.
- **B11** — evidence: food goal **done 2:37**, **13→58** hp, +30, amusing still on map but farther.

## Process changes

None.

<!-- /review -->

## Picks

- **0:11** level-up: took Tater Tot Pup from Tater Tot Pup, Seed Potato, Bacon Bits.
- **0:11** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:23** level-up: took Lean Lunch from Seed Potato, Lean Lunch, Bacon Bits.
- **0:24** gained without a pick (a chest or other): Lean Lunch 1/5 new.
- **0:46** level-up: took Reroll (1) from Big Bowl, Butter Socks, Hash Brown Shield, Reroll (1).
- **0:46** level-up: took Starch Chain from Starch Chain, Mash Golem, Hot Streak.
- **0:46** gained without a pick (a chest or other): Starch Chain 1/8 new.
- **1:18** level-up: took Starch Chain from Starch Chain, Big Bowl, Fertilizer.
- **1:18** gained without a pick (a chest or other): Starch Chain 1/8 to 2/8.
- **1:30** level-up: took Starch Chain from Starch Chain, Starch Bolt, Locked Gatling, Reroll (1).
- **1:30** gained without a pick (a chest or other): Starch Chain 2/8 to 3/8.
- **1:31** gained without a pick (a chest or other): Starch Chain 3/8 to 4/8.
- **1:34** gained without a pick (a chest or other): Starch Chain 4/8 to 5/8.
- **1:36** level-up: took Hot Sauce from Starch Bolt, Fertilizer, Hot Sauce, Reroll (2).
- **1:37** gained without a pick (a chest or other): Hot Sauce 1/5 new.
- **1:39** gained without a pick (a chest or other): Starch Chain 5/8 to 6/8.
- **1:39** level-up: took Reroll (2) from Four-Eyed Spud, Couch Potato, Potato Rain, Reroll (2).
- **1:39** level-up: took Reroll (1) from Julienne Dash, Fry Cook Sentry, Slow Cooker, Reroll (1).
- **1:39** level-up: took Tater Tot Pup from Tater Tot Pup, Hot Streak, Lean Lunch.
- **1:39** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **1:40** gained without a pick (a chest or other): Starch Chain 6/8 to 7/8.
- **1:56** level-up: took Tater Tot Pup from Tater Tot Pup, Starch Plating, Peel Phantom.
- **1:56** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **2:35** level-up: took Gravy Heart from Lean Lunch, Tater Tot Pup, Gravy Heart, Skip (1).
- **2:35** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **3:18** level-up: took Starch Chain from Thick Skin, Starch Chain, Deep Fryer, Skip (1).
- **3:18** gained without a pick (a chest or other): Starch Chain 7/8 to 8/8.
- **3:50** level-up: took Tater Tot Pup from Tater Tot Pup, Mash Finisher, Mash Wave, Skip (1).
- **3:50** gained without a pick (a chest or other): Tater Tot Pup 4/8 to 5/8.

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
- On this mode the crowd hurts; bosses hit outside the one-second forecast.
- Weapons stay weak without chests; evolutions need chest picks.
- Food heals about 30 hp.
- Hot oil and Spore vent hurt if Tibo stands on them.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger? Boss within 200: yes evade, no chest/elite/spot/gems/explore. Under 70%: yes eat food unless chest better. Under 40%: yes eat food even if boss within 200; no evade if food is listed. Past 2:00 and no chest: yes fight listed elite; no explore/gems if elite listed.
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
