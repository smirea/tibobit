# 2026-11-07 20-28-35: lived 03:16 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=j45q4agwrkcnm&stats=A-5bAI4CBgwB-EcAAADUCQMAA9YB6BcAmbQBzBMCOQK63gI3nAIIekUJ2-P3nLaMOo-nKE9RIgERegAKAAABAAAAAgAAAK4BAAACCgEDBgQCWo4B3AEDCQgYJCEOHhgUEAQFA5cBcQYFFQUBcbcYANfdEAB6EQ8A-U0OAHr5DAYBAAcCAAAJBQPtK3oACgLvDBEBAxICA9YWAQEgEgAQ0S5_GsQhL8YMgvf3ySo1AA |
| Ending | died at 3:16, level 6, 270 kills |
| Opening | first chest listed never; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 6 at 3:00 |
| Testing | E85 |
| Seed | 1H2C4C7 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 7b96b3f docs(gameplay): cursor reviews the 2026-11-07 20:13 run, lived 12:34, testing E81 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_20-28-35_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:16** (196s), level 6, 270 kills.
- Damage taken by source: boss:amusing 24.4, enemy:compost-maggot 16.1, enemy:garden-slug 14.5, enemy:ketchup-drop 13.7, enemy:dumpster-raccoon 12.4, enemy:tomato-leech 11.7, enemy:sand-crab 6.7, boss:beetle-queen 5.4, enemy:bog-slime 4.8, Hot oil 4, enemy:gull-flock 3, enemy:crumb-ant 2.9, enemy:fry-fly 2.4; 122 in all. Health gained over the run, by food, regeneration and anything else: about 0 (the game does not say from what).
- Weapons: Tater Tot Pup 1/8, Potato Rain 1/8.
- Passives: Masher Grip 2/5, Butter Pat 2/5.
- Items: none.
- Planner asked 57 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 120/120 | 0 | 0 | 3 | 29 | - |
| 1:00 | 105/120 | 16 | 0 | 5 | 73 | Hot oil, enemy:fry-fly |
| 2:00 | 54/120 | 50 | 0 | 6 | 115 | enemy:dumpster-raccoon, boss:amusing |
| 3:00 | 1/120 | 54 | 0 | 6 | 166 | enemy:garden-slug, enemy:tomato-leech |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00.
- First chest listed: never. First time under 25% health: 3:08.
- Goals by kind (done / gave up / dropped): explore 4/0/6; evade 18/0/1.
- Dashes: 10 (1:40, 1:59, 2:05, 2:18, 2:23, 2:29, 2:54, 3:00, 3:07, 3:12).
- Model calls: 52 plans, 5 picks, 445 moves (mean 178ms); the page walked through 1 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:23 Masher Grip 1/5 new; 0:59 Butter Pat 1/5 new; 1:25 Potato Rain 1/8 new.

## Plan

This run serves the Nightmare 1 ladder by keeping E81’s confirmed chest loop—planner.goal yes on open-chest and no on gems and explore while a chest is listed—and adding only E85’s boss-window goal lines from E66/E75. Until a chest or food is listed, the directive still says explore, which is the opening default. If the hypothesis holds, amusing at 2:00 and later bosses such as Fryer King and The Mandoline get keep-away winning plans while they stay within 200 units, without chest goals dropping during those windows (H53WEU lost 328 hp in minute 8 and 420 in minute 12 with distrustBossRange 0). Score success as lower Fryer King and Mandoline outcome totals and smaller minute 8 and 12 health swings versus 12:34, with first chest still near ~1:15 and chest goals still starting when no boss is within 200. Inconclusive if no boss appears within 200 while a chest is listed, or if bosses never show.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run was meant to stack E66/E75 boss-within-200 `planner.goal` lines on the E81 champion stack (E85) and compare late-boss damage to the 12:34 E81 run while keeping chest opens when no boss is near. On seed 1H2C4C7 Tibo lived only **3:16** (vs 12:34 and 17:12 on chest-friendly seeds), **never listed a chest**, opened **zero**, and died with two weapons at 1/8 and passives at 2/5. The bot did play the new boss sentences after amusing at **2:00** and Colorado Queen at **3:00** (keep-away hit **87%** on the queen appearance plan), but **evade owned the whole opening**: first goal swap at **0:05** with no boss listed (keep-away **68%** vs explore up-right **63%**). E85 is **inconclusive** on Fryer/Mandoline and minute 8/12 swings; the dominant story is **chest-starved seed + evade-before-boss**, not a failed boss-window rule once bosses were present.

## Findings

- **E85 boss goal lines fired when bosses appeared, but the run never reached Fryer King or The Mandoline** — amusing first seen **2:00**, beetle-queen **3:00**; death **3:16**; amusing outcome **24.4** hp total, queen **5.4**. **Inconclusive** for E85’s late-boss comparison (success criteria assumed ~8:00+).
- **First chest listed: never** (through death); **0** chest goals, **0** opens, **first evolution none** — matches chest-never opener pattern (E70/E79 NAFTJ5, E85 lead on seed variance). **Likely**.
- **Opening directive “explore until chest/food listed” was not what Tibo did** — at **0:05** plan after 5s explore, keep-away **68%** beat explore **63%** with **no boss** in `bosses` column (only 12 enemies). **18** evade goals vs **4** explore completed. **Confirmed** that explicit evade yes/no in `planner.goal` can win without a boss (extends B58/B16).
- **Minute health: 120 → 105 → 54 → 1** — minute **1** lost **16** (hot oil, fry-fly); minute **2** lost **50** (dumpster-raccoon, amusing **24.4** in that window); minute **3** lost **54** (garden-slug, tomato-leech, collapse **3:08** at **25%** then **1 hp**). **No healing** (~0 gained). **Confirmed** on this log.
- **At amusing appearance (2:00)**, keep-away won the boss-trigger plan but only **39%** vs explore directions **12–27%** — better than E59 fade-to-explore at **2:24**, yet Tibo was already **54/120** and never had a chest build. **Lead** that boss-window noul helps appearance beat explore but does not fix a chestless loadout.
- **Elite fight goals: 0** despite `Fight the Wireworm Larva` / `Potato Beetle` often scoring **20–35%** on plans (e.g. **1:04** plan). E60 elite-over-explore after 2:00 never became a goal because **no chest was ever listed** to compare and evade kept priority. **Inconclusive** for elite policy on this seed.

## Went well

- **Boss appearance replans used keep-away** — queen plan at **3:00**: keep-away **87%** with amusing **69** down-right and queen **158** up; evade goals chained through **2:00–2:40** and **3:00–3:13**.
- **Level-up picks stayed on build** — Masher Grip, Butter Pat, Potato Rain (**0:23–2:31**); sensible passives for tater-pup line without contradicting the stack.
- **Spud Freezer partial charge at ~0:47** while on evade — stood on freezer **0.8/1.5 s** (useful **66–75%** on stand-still rows); did not finish channel but showed spot opportunity during evade drift.
- **Dashes when crowded** — **10** dashes including **1:40**, **2:05**, **2:29**, **3:00**, **3:07**; **1:59** dash on walked step at **55%** during explore.

## Went poorly

- **Zero chest economy** — no listing by **3:16** meant E81’s confirmed chest yes/no never applied; weapons **Tater Tot Pup 1/8**, **Potato Rain 1/8** at death (**270** kills, weak DPS).
- **Evade from 0:05–~1:57** — six explore goals **dropped** when planner re-chose evade; time spent on keep-away with **no boss <200** until **2:00**.
- **Hot oil at ~1:43–1:45** on evade — **4** hp outcome; stepped on Potato Crate tile **1:43** (`standing_on` hot oil burn) while evading; health **115 → 109** band before amusing.
- **Amusing minute at 45% hp** — health **105** at **1:00**, **54** at **2:00**; boss:amusing **24.4** total plus compost-maggot, garden-slug, dumpster-raccoon in minute **2** (stats: **50** hp lost minute 2).
- **Final seconds** — **3:08** at **37/120** (25%), **3:09–3:10** evade done lost **53** in one evade window; died **3:16** at **1/120** with **166** enemies, bosses both **<300** units.

## Moments

- **0:05** First plan after run start: explore up-right dropped, keep-away **68%** wins with no boss. Better: only evade yes when a boss is within 200 (E85 intent), or explore yes/no until chest (E88).
- **0:21** Explore up-right finally starts after evade cycles. Right call for directive, but late.
- **0:47** Evade goal; stand still on Spud Freezer **0.8/1.5** charge. Better: planner spot goal when freezer <100 and no boss.
- **1:00** Health **105/120**, minute table shows hot oil + fry-fly. Threshold where chest seeds often list first chest ~1:15; this seed never does.
- **1:43** Hot oil underfoot during evade near Potato Crate. Better: action/state burn line already present — step off did not happen in time.
- **2:00** Amusing **204** down; boss plan keep-away **39%** beats explore **12–27%**. Right call for E85 boss lines; too late for hp bank.
- **2:28–2:32** Health **63 → 60** during amusing fight; level-up Masher Grip **2/5**. Evade retained; no chest to pivot.
- **3:00** Colorado Queen appears; keep-away **87%** on plan, dash up at **3:00** (**58%** dashed). Boss template engaged.
- **3:08** Health **37 → 27 → 16 → 1** in **~4s** — garden-slug, tomato-leech, amusing, compost-maggot; evade could not clear double-boss pest stack.
- **3:13** Last evade done; health **1/120**. Better: food never listed; no heal in run.
- **3:16** Death on walk up with telegraphs; both bosses still on field.

## Questions

- On chest-never seeds, does adding boss-within-200 evade **without** an opening explore yes/no (E88) always sacrifice the first 2 minutes to keep-away? → **E88** (proposed).
- If the first chest is still never listed by **2:30**, does **E60 elite goal only in planner.goal** produce an elite kill and first chest drop on 1H2C4C7? → **E90** (new proposed, spots/meta).
- Does **distrustBossRange 400** on this seed change minute-2 amusing damage when evade is already selected? → **E86** (still open; SBBOHY had 0 amusing line at 4:00 but different arc).

## Next

1. **E88** on a **chest-friendly seed** (replay SBBOHY / 1AS5RU0-class): E81 chest sentences + E85 boss lines + **planner.goal explore yes / gems-spots-elites no until chest listed**. Isolates whether E85 was harmed by opening evade or only by seed. Moves campaign because champion stack needs explore-first on every seed.
2. **E70 retest on 1H2C4C7 or parallel chest-never seed** with **E81+E85** but **E54 elite line in planner.state** OR stronger elite noul — test if first chest appears by elite drop before amusing. Addresses ladder blocker on bad opener seeds.
3. **E82** after a run that lists chests — shop yes when gold≥100 and no chest; not on this run (gold **10**, never ≥100 meaningfully).

## Beliefs changed

- **B85** (`planner`, E81 chest-friendly timing): confidence **likely → recheck** — evidence now includes this run: seed 1H2C4C7, first chest **never**, died **3:16**; contradicts “often ~1:15” without naming seed dependence (H53WEU **1:15** still holds).
- **B89** (new, **lead**, **held**): E85-style boss-within-200 lines in `planner.goal` do not stop **keep-away from beating explore before any boss is listed** when those sentences are active (this run **0:05**, **68%** vs **63%**).
- **B72**: add evidence run **2026-11-07_20-28-35** — pup **1/8** at **3:00**, no evolution, amusing+queen window.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:23** level-up: took Masher Grip from Tater Tot Pup, Tater Mines, Masher Grip.
- **0:23** gained without a pick (a chest or other): Masher Grip 1/5 new.
- **0:58** level-up: took Butter Pat from Starch Chain, Aged Russet, Butter Pat.
- **0:59** gained without a pick (a chest or other): Butter Pat 1/5 new.
- **1:24** level-up: took Potato Rain from Tater Tot Pup, Salt Shaker, Potato Rain.
- **1:25** gained without a pick (a chest or other): Potato Rain 1/8 new.
- **1:58** level-up: took Butter Pat from Potato Rain, Butter Pat, Tater Tot Pup.
- **1:58** gained without a pick (a chest or other): Butter Pat 1/5 to 2/5.
- **2:31** level-up: took Masher Grip from Lean Lunch, Fry Cook Sentry, Masher Grip.
- **2:31** gained without a pick (a chest or other): Masher Grip 1/5 to 2/5.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo in tibo.dog. Weapons fire alone; Tibo walks to goals. Survive 20:00 on {{difficulty}} ({{mode}}).

DIRECTIVE:
1. Until a chest or food is listed, explore.
2. If a chest is listed, go and open it. Chests give picks and evolve ready recipes.
3. If health is under 70% and food is listed, eat the food.

What we know:
- planner.goal must say yes on each option; state-only chest rules did not start chest goals (UM213V).
- E81 chest yes fixed opens; boss minutes near bosses still hurt hard without evade winning plans (H53WEU minute 8 Fryer King, minute 12 Mandoline).
- Crowds hurt on world; chests early keep weapons strong.
- Food heals ~30 hp. Hot oil burns; step off it.
- A step forecast as free can still cost hp with many enemies close.

Asked because {{why}}. State:
{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}: is this the best thing for Tibo to do right now?

If this goal opens a chest Tibo can walk to and stand on, say yes when a chest is listed.
If this goal collects nearby xp gems, say no when any chest is listed.
If this goal explores in a direction, say no when any chest is listed.
If a boss is within 200 units, say yes to evade and keep away from enemies and bosses.
If a boss is within 200 units, say no to opening a chest, fighting an elite, charging a spot, collecting gems, and exploring.
If this goal eats listed food, say yes when health is under 70%.
Otherwise say yes only if it clearly helps survive and grow stronger.
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}. Which option makes Tibo strongest?
~~~

### action.state

~~~text
Tibo walks toward: {{goal}}.
{{health}}
{{hurt_by}}
{{enemies}}
{{dash}}
Hot oil underfoot burns; step off burn tiles when choosing moves.
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
