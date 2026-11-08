# 2026-11-07 22-11-48: lived 04:46 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=z5yvst317qa2p&stats=A6yGAQCxAQcMAXG3AAAAoQ4BAAPWArggAjyFBBjrAQl6RShPjDqcto-n5SEJ2-P3Q48BE6wCsgEWAAABAAAABgAAALsBAAACCgEECAICAFxeSDgDCgkhRi0TKSIYAxIEAwGxAQUbBQG33lwBcbcsAHvqGQACvRUCB0hvdCBvaWwVBgEABwIAAAkGA7ggrAIACgK2DhEBAxICA9YWAQEgEgAQ0S5_GsQhL8YMgvf3ySo1AA |
| Ending | died at 4:46, level 7, 177 kills |
| Opening | first chest listed never; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 6 at 3:00 |
| Testing | E135 |
| Seed | 1WU57JI |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | bdff9ae docs(gameplay): cursor reviews the 2026-11-07 22:04 run, lived 4:33, testing E126 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_22-11-48_nightmare-1_world_headless.csv |

## Outcome

- Lived **4:46** (286.6s), level 7, 177 kills.
- Damage taken by source: boss:the-masher 91.8, boss:amusing 44.4, enemy:fry-fly 24.9, enemy:sand-crab 20.9, Hot oil 20.8, boss:beetle-queen 13.6, enemy:bog-slime 12.5, enemy:aphid 10.9, enemy:snow-mold 10.6, enemy:crumb-ant 9.7, enemy:sprout-mite 7.9, enemy:wireworm-larva 7.8, enemy:bowling-ball 6.5, enemy:oil-drip 5.6, enemy:garden-slug 5.4, enemy:sock-pile 3.9, Brambles 2.3; 300 in all. Health gained over the run, by food, regeneration and anything else: about 72 (the game does not say from what).
- Weapons: Tater Tot Pup 2/8.
- Passives: Root Network 4/5, Big Bowl 1/5.
- Items: none.
- Planner asked 87 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 107/120 | 22 | 8 | 4 | 29 | Hot oil, enemy:crumb-ant |
| 1:00 | 119/120 | 24 | 35 | 5 | 72 | enemy:fry-fly, enemy:crumb-ant |
| 2:00 | 116/120 | 28 | 9 | 6 | 116 | boss:amusing, enemy:bowling-ball |
| 3:00 | 105/120 | 54 | 13 | 6 | 181 | Hot oil, boss:amusing |
| 4:00 | 2/120 | 142 | 7 | 7 | 181 | boss:the-masher, boss:amusing |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00; The Masher (the-masher) at 4:00.
- First chest listed: never. First time under 25% health: 4:17.
- Goals by kind (done / gave up / dropped): explore 20/0/5; evade 19/0/0.
- Dashes: 22 (0:47, 0:57, 1:30, 1:49, 2:06, 2:13, 2:18, 2:24, 2:33, 2:39, 2:56, 3:06, …).
- Model calls: 81 plans, 6 picks, 491 moves (mean 199ms); the page walked through 13 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:23 Root Network 1/5 new; 1:26 Big Bowl 1/5 new.

## Plan

This run tests E135 on Nightmare 1 Open World: whether a planner.goal line that keeps Open yes while Tibo is already charging a chest, but says no to starting a chest walk once a boss is inside 200, gets at least one evolution chest open on seeds like 17M7R2Y where E126 listed a chest at ~2:10 but keep-away won every replan (Open ~9% vs keep-away ~56%) and Gravy Pack never had a case. Stack is unchanged from E126: E113 boss and chest rules, E91 pup and Gravy picks, E24 dash, exploreDistance 300, tater-pup, distrustBossRange 0. The only change is the E135 sentence at the top of planner.goal. Default opening is explore the map until a chest or food is listed (directive rule 1); under 40% with no food listed the model should still pick keep-away or evade when bosses crowd the amusing–queen window. If the hypothesis holds, expect a chest goal to stay on or start while charging after a boss closes in only when Tibo is already on the tile, and at least one chest open before minute 4 on a chest-friendly list time. If amusing overlaps a long walk to a listed chest with no charge started, keep-away should still win and the run is inconclusive for the charging half only when no channel ever started. Campaign: without opens, E91 cannot evolve Gravy Pack and Nightmare 1 stays seed-lottery in the boss stack; E124 proved E81 opens on friendly seeds—this run asks whether E135 fixes the multi-boss keep-away lock on early-listed chests.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run queued **E135** on seed **1WU57JI** with the E113 goal stack, E91 picks, and the new planner.goal line about finishing a chest channel under a boss versus blocking a walk-to chest. Tibo **never listed a dropped chest** (unlike E126 on 17M7R2Y at 2:10), so the E135 wording was **never scored**: no open-chest options, no charging chest tile. From 2:00 through death the plan was **evade** (19 cycles, 0 explore wins after amusing). Minute 4 lost **142** hp (105→2) once **The Masher** stacked with amusing and Colorado Queen; **boss:the-masher 91.8** dominated the outcome. **0 evolutions**, pup **2/8**, Root Network **4/5**—pick pressure went to passives, not the E91 pup track.

## Findings

- **E135 (charging vs walk-away chest under boss): inconclusive** — Stats: first chest listed **never**, 0 opens; no log row with a chest in the goal set. The hypothesis cannot be confirmed or refuted; it is a **seed/template execution** finding (wrong seed class vs plan’s 17M7R2Y-class). *(inconclusive)*
- **Chest-never at exploreDistance 300** — Twenty explore goals completed (300 units each), 5 dropped replans, **no elite kills**, no boss drops → no chest channel for E135 or Gravy. Same failure mode as B49/B72, stricter than E126 (which at least listed at 2:10). *(likely)*
- **E113 keep-away lock without listed chest** — At **2:00** amusing appearance, keep-away **61%**; from 2:00–4:00 evade dominated (e.g. **3:00** queen plan keep-away **84%**). No Open vs keep-away contest because no chest option. *(likely, one sample)*
- **Masher minute wipes sub-evolved boards** — Health **105/120** at 3:00 end, **2/120** at 4:00 end; **4:02–4:07** rows show Masher closing from **180** to melee with **boss:the-masher** ticks (**4:03** −46 hp on one step). Outcome **91.8** Masher vs **6.7** on evolved 15QD6RY. *(likely)*
- **E91 picks partially ignored early** — **0:23–2:14** four **Root Network** takes; **Tater Tot Pup** level only at **4:09** (98%) at **35** hp with three bosses listed. No **Gravy Heart** offer scored. Build track did not run. *(lead)*

## Went well

- **0:00–2:00** opening held **107→119** hp despite hot oil/crumbs (minute 0–1 tables).
- **2:08** and **2:32** evade goals ended **kept clear** eight seconds with amusing listed.
- **2:39** dash up-right at **52%** during amusing evade—E24 dash still fires under boss crowding.
- **3:18** evade cycle completed without hp loss with **two** bosses listed.

## Went poorly

- **Entire run** chest-starved: no evolution, no Gravy test, E135 idle—**explore-only income** on 1WU57JI.
- **2:49** after evade, **Charge Spud Shrine 46%** lost to keep-away **41%** with amusing **202** away—no progress on spots during boss window (acceptable for E135 chest focus but cost power).
- **3:00–3:51** queen+amusing evade: minute 3 **−54** hp (wireworm, fry-fly, amusing); food never listed under E101 clauses.
- **4:00–4:07** triple-boss evade: **4:07** evade done lost **56** hp in 8s; **4:09** level-up inside Beetle Nest at **35** hp instead of fleeing.
- **4:17** first under **25%**; death **4:46** with pup **2/8**—campaign still blocked on **chest listing + opens** before boss stack.

## Moments

- **0:23** Root Network over Hot Start—pup not prioritized on first level-up.
- **2:00** explore dropped, **evade 61%** on amusing appearance—E113 boss rule engaged.
- **2:14** level-up during evade; Root Network **61%**; amusing **56** away.
- **2:49** evade ends on Spud Shrine **0.2/5** charge; replan picks evade over shrine **46%**.
- **3:00** Colorado Queen appears; keep-away **84%** on same plan tick.
- **3:25** walk **right** **81%** useful on Bot Dock **0.5/2** charge—evade motion while charging spot, not chest.
- **3:40** evade loses **13** hp in 8s with amusing+queen in melee band.
- **4:00** The Masher appears **180** up-right; keep-away **71%**.
- **4:03** Masher **8** units: **−11**, then **−46** hp steps; health **48**.
- **4:09** pick **Tater Tot Pup 98%** at **35** hp on nest—too late for evolution.
- **4:46** **−7** hp step; died **boss:amusing 6.7**, **boss:beetle-queen 2.7**. Right call: none on chest policy; **wrong seed** for E135.

## Questions

- Does **1WU57JI** never drop chests from elites/bosses before 5:00 without **fight-elite** goals? → **E137** (proposed).
- Can **exploreDistance 600** or **E60 elite after 2:00** list a first chest on chest-never seeds without dying in amusing minute? → extend **E54/E111**.
- On chest-never seeds, does **E135** need to pair with **elite-kill-for-drop** before testing charging semantics? → new meta experiment (proposed below).

## Next

1. **Re-run E135 on 17M7R2Y** (or Daily-fixed seed) so a chest lists by ~2:10 and Open vs keep-away is measurable; keep E135 sentence only change vs E126.
2. **E137** on same stack: after 2:00, fight-elite when no chest and no boss within 200—to manufacture first chest on 1WU57JI-class seeds.
3. **E133** food-under-70% / far-chest no on **1HWOI3N** stack if a run survives past 5:00 with food listed (this seed had no food column usage).

## Beliefs changed

- **B49**: evidence adds **1WU57JI** never lists chest through **4:46** at explore 300; status **likely** held.
- **B72**: evidence adds **1WU57JI**—E91/E113 cannot test catalyst chest before death; status **likely** held.
- **B137**: evidence adds **1WU57JI** (stricter than 17M7R2Y: never listed); status **likely** held.
- **B134**: no change—charging chest under boss **not tested** this run.
- **B83**: evidence adds minute **4** lost **142** and Masher **91.8** with pup **2/8**, 0 chests; reinforces Masher cost on unevolved kit.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:23** level-up: took Root Network from Hot Start, Root Network, Butter Pat.
- **0:23** gained without a pick (a chest or other): Root Network 1/5 new.
- **0:45** level-up: took Root Network from Salt Line, Root Network, Aged Russet.
- **0:45** gained without a pick (a chest or other): Root Network 1/5 to 2/5.
- **0:58** level-up: took Root Network from Root Network, Hash Hawk, Hash Rush.
- **0:59** gained without a pick (a chest or other): Root Network 2/5 to 3/5.
- **1:26** level-up: took Big Bowl from Thick Skin, Big Bowl, Sprout Satellites.
- **1:26** gained without a pick (a chest or other): Big Bowl 1/5 new.
- **2:14** level-up: took Root Network from Tater Trot, Root Network, Big Bowl.
- **2:14** gained without a pick (a chest or other): Root Network 3/5 to 4/5.
- **4:09** level-up: took Tater Tot Pup from Tater Tot Pup, Couch Potato, Hot Potato.
- **4:09** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose upgrades and the next goal.

Aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow first:
1. Until a chest or food is listed, explore the map.
2. If a chest is listed and no boss is within 200 units, open it. Chests give a free pick and evolve a ready recipe.
3. If health is under 70% and food is listed, eat the food.
4. A close Spud Freezer is also good: it freezes enemies 7.5 seconds.
5. If a boss is within 200 units, keep away and do not start opening a chest or charging a spot.

What we know, most important first:
- Option sentences on each goal move votes; state lines alone do not open chests.
- Gravy Pack needs Tater Tot Pup at max and Gravy Heart owned; level the pup before 5/8.
- Food heals about 30 hp. Hot oil burns; do not stand in hot oil.
- Steps that look free can still cost hp when many enemies are close.

Asked because {{why}}. State:

{{state}}
~~~

### planner.goal

~~~text
If Tibo is already standing on a chest that is charging, yes to keep opening it even when a boss is within 200; if the chest is still a walk away and a boss is within 200, yes keep-away or evade and no to open that chest.
If a boss is within 200 units: yes keep-away or evade; no to open a chest that is still a walk away, eat food, gems, explore, charge spots, fight elite.
If a chest is listed and no boss within 200: yes open it; no gems and explore.
If health under 70%, food listed, no chest among options, no boss within 200: yes eat food; no explore.
If no boss within 200 and no chest listed: yes explore; no keep-away.
If Tibo's next goal is to {{goal}}: is that best now to survive and grow stronger?
~~~

### planner.pick

~~~text
At this {{choice}}: if Tater Tot Pup is below 5/8 and its level is on the card, take the pup. If Gravy Heart is offered and Tater Tot Pup is held, take Gravy Heart. If another held weapon is below 5/8 and its level is offered, take that level. Do not take a card that adds a new weapon while any held weapon is still 1/8. Otherwise take what makes Tibo strongest for 20:00.
~~~

### action.state

~~~text
Tibo is a potato hero in a survivors game. Weapons fire on its own; Tibo only walks.
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
  "eliteSeconds": 20,
  "lockstep": 0,
  "bossOfferRange": 0
}
~~~
