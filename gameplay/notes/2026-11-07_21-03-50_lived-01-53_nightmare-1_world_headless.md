# 2026-11-07 21-03-50: lived 01:53 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=g88p2xy487jfk&stats=A_s0AH8HNgIHSG90IG9pbAABAMMFAgAD1gWoFgDTmwHAAQH90AIGekWPpyhP7gkJ2-P3ARGwARsKAgABAAAAAgAAAEQAAAIEAQEGOAMHBiIRIggMCQQDAnUKBRsFAHvqMADH-BkAenIYAgdIb3Qgb2lsFgACvQoGAQAHAgAACQYD6BewAQAKAoMGEQEDEgID1hYBASASABDRLn8axCEvxgyC9_fJKjUA |
| Ending | died at 1:53, level 7, 127 kills |
| Opening | first chest listed 1:21; 1 chests opened by 2:30; 2 elite fights and 0 elites killed by 3:00; first evolution none; level 7 at 3:00 |
| Testing | nothing named |
| Seed | 1EXPRJG |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 86b102b docs(gameplay): cursor reviews the 2026-11-07 20:59 run, lived 2:31, testing E96 |
| Coach prompts | none (exploit run); coach-retrospective.md 29ea3ff1 |
| Templates from | 2026-11-07_20-34-44_lived-17-41_nightmare-1_world_headless.md (exploit run) |
| Log | /tmp/tibobit/2026-11-07_21-03-50_nightmare-1_world_headless.csv |

## Outcome

- Lived **1:53** (113s), level 7, 127 kills.
- Damage taken by source: enemy:fry-fly 48.3, enemy:potato-beetle 24.6, enemy:oil-drip 23.9, Hot oil 21.5, enemy:sand-crab 10.4, enemy:sprout-mite 9.6, enemy:frost-flea 9.1, enemy:lint-bunny 6.1, enemy:bog-slime 5.9, enemy:crumb-ant 5.5, Brambles 4, enemy:tomato-leech 3.1, enemy:aphid 2.3, enemy:compost-maggot 1.5; 176 in all. Health gained over the run, by food, regeneration and anything else: about 55 (the game does not say from what).
- Weapons: Tater Tot Pup 5/8, Fry Knives 1/8.
- Passives: Gravy Heart 2/5.
- Items: none.
- Planner asked 38 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 107/134 | 26 | 14 | 3 | 28 | enemy:fry-fly, enemy:potato-beetle |
| 1:00 | 0/149 | 148 | 41 | 7 | 68 | enemy:oil-drip, enemy:fry-fly |

- Bosses first seen: none.
- First chest listed: 1:21. First time under 25% health: 1:44.
- Goals by kind (done / gave up / dropped): explore 10/0/5; spot 1/0/1; elite 0/0/2; chest 1/2/0.
- Dashes: 10 (0:15, 0:34, 0:49, 0:55, 1:03, 1:18, 1:23, 1:31, 1:40, 1:46).
- Model calls: 32 plans, 6 picks, 95 moves (mean 187ms); the page walked through 10 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:23 Gravy Heart 1/5 new; 1:39 Fry Knives 1/8 new.

## Plan

Exploit run (one run in 3 of this coach): the champion templates from 2026-11-07_20-34-44_lived-17-41_nightmare-1_world_headless.md (Nightmare 1, lived 17:41), unchanged, starting with tater-pup. It tests nothing new: it is a real attempt at 20:00 and a second sample of the best play so far, so the review can tell how much of that run was luck.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This was the third exploit run in the coach rotation: champion templates from the 17:41 Nightmare-1 run, unchanged, with tater-pup. It tested no named experiment; the implicit question was whether a second sample lands near the champion time. Tibo died at **1:53** (level 7, 127 kills) with **no evolution**, one chest opened at **1:42**, and no bosses seen. Minute stats show a soft opening (**107/134** at 0:00) then a **148 hp** loss in the second minute (health hit **0/149** at the 1:00 mark before regen and levels). The stack behaved like prior champion logs (explore until a chest exists, then chest goals, E24 dashes), but this seed’s fry-fly and oil-drip pressure plus failed chest channels and a final **Hot oil** burn ended the run far below the 16–17 minute band. We should read this as **seed/opener catastrophe**, not as proof the 17:41 run was mostly luck.

## Findings

- **Champion exploit replication on 1EXPRJG landed at 1:53, not near 17:41** — same template family as 20-34-44; died 1:53 vs 17:41 on another seed; **likely** that long runs are seed- and board-dependent, consistent with B35’s top-band spread, not a single-lottery 17:41.
- **Second-minute collapse dominated by pests, not bosses** — stats: 0:00 end 107/134 (−26), 1:00 end 0/149 (−148, +41 gained); outcome fry-fly 48.3, potato-beetle 24.6, oil-drip 23.9, Hot oil 21.5; no bosses first seen; **confirmed** for this run.
- **Chest policy executed once listings existed but two opens failed before success** — first chest listed 1:21; goals chest 1 done / 2 failed / 0 gave up; opens at 1:42 (C196612 done) after failures 1:29 (stuck, stepped off) and 1:35 (stuck on chest 133 up); **likely** B13-style step-off under crowd still hurts on champion knobs.
- **Explore still owned the pre-listing minute** — goals explore 10 done, 5 dropped; 0 evade goals; keep-away ~18–29% on plans; **likely** B58 on this stack.
- **Elite fight options never converted** — elite 0 done, 2 dropped (e.g. E65552 from 0:46–0:51); 0 elite kills; no extra chest drops from elites; **lead** on this seed.
- **Death at 2 hp on burn with food listed and explore chosen** — 1:52 plan: Open chest 600 up-right 10%, Eat food 82 right **25%**, Explore up **42%**; underfoot burn, Hot oil 17.8–19.5 in last seconds; **likely** generic planner.goal lacks food-over-explore at critical hp (B96 class).
- **E91-style pick discipline not in play** — exploit used champion pick text, not E91 sentences; pup 5/8 and Gravy 2/5 by death, Fry Knives 1/8 at 1:39; no evolution; **confirmed** this run does not bear on B101.

## Went well

- **0:23** Gravy Heart taken 89% — catalyst path started early on a short run.
- **0:33** Beetle Nest spot goal **done** (charged and used) — one chest-equivalent channel completed at low cost.
- **1:21–1:42** Planner eventually prioritized **Open the chest** (57–62% on plans once chest 27 down-left listed) and finished one open at **1:42** despite damage on the channel.
- **0:15–0:34** Dashes fired in opening crowd (e.g. **0:15** 51%, **0:34** 53%) per E24 template; 10 dashes total per stats.
- **0:18–1:21** Tater Tot Pup leveled to **4/8** before first chest listing — leveling kept pace with champion exploit expectations.

## Went poorly

- **0:00–1:00** Explore chain with **no chest listed** — first listing **1:21** (B25-class timing); time and exposure before first evolution opportunity.
- **1:18** Dash up-left at fight-elite goal cost **12 hp** (120→108) with fry-fly 6.4 and sand-crab 5.2; elite goal dropped **1:21** for chest.
- **1:29–1:35** Two **failed** chest goals (stuck / step-off) at ~91 and ~92 hp — wasted chest charges while oil-drip and fry-fly stacked in hurt_by.
- **1:42–1:44** Chest open completed at **67→21 hp** in seconds (walk rows oil-drip, frost-flea, sprout-mite, potato-beetle); first time under 25% **1:44** per stats.
- **1:47–1:52** At **20 hp**, planner picked **explore left** over distant chest; at **2 hp** **explore up** beat **Eat food** 25% with food **82 right** and **burn** underfoot — lethal Hot oil 19.5 on final rows.

## Moments

- **0:10** Planner dropped partial Beetle Nest for **explore up-right** — right call for directive before nest value, but extended explore streak.
- **0:33** Beetle Nest **done** — right call; rare spot success on this seed.
- **0:46** **Fight the Fry Fly** started then **dropped 0:51** for explore — better: keep fight or evade locally until kill for chest drop; elite never finished.
- **1:21** Chest listed; planner **Open chest** wins; level-up and chest goal coincide — right call to prioritize chest.
- **1:29** Chest goal **failed** (stuck, stepped off once) at 91 hp — better: stand still tolerance / lower dodge on charging chest (B13).
- **1:31** Level-up **Gravy Heart** during failed chest approach — right pick for evolution path if run had lasted.
- **1:35** Second chest goal **failed** stuck at 92 hp — same fix as 1:29.
- **1:39** **Fry Knives** new weapon at 90 hp — splits build on a run that needed pup max + catalyst; debatable on 1:53 horizon.
- **1:42** Chest **done** opened at 67 hp — right call to finish; too late for board power.
- **1:44** Health **26→20** on page walks through oil-drip crowd — better: distrust or evade once hp <40%.
- **1:52** At **2 hp**, **explore up** 42% over **Eat food** 25% with burn tile — should have been food or evade; planner/action left Tibo on burn until death **1:53**.

## Questions

- Does a **planner.goal yes for food under 25%** (or while `underfoot` is burn) beat explore on champion templates when food is within ~100 units?
- On crowded chest channels, does **extraDamage 0.02** plus dodge moves cause most 1:29-style failures, or is **stuckSeconds 6** too tight for this seed’s density?
- Would **one elite kill before 1:30** have listed a second chest and changed minute-2 survivability on 1EXPRJG?
- Is **1:00 health 0/149** (then heavy regen from levels/passives) a pattern worth tagging in beliefs for Gravy Heart opening minutes?

## Next

1. **E100 / chest-before-amusing on a chest-friendly seed** (e.g. H53WEU or replay 1GKFGV6 with E81 chest goal lines + E91 picks) — this run listed at 1:21 but died with failed channels; need a run that tests boss/evade additives without conflating listing with open.
2. **E77 or new food-at-critical planner.goal line** on champion stack — this death is the missing score for food vs explore at **2 hp** with food listed; moves campaign opener survivability without waiting for 17:00 swarms.
3. **E98 distrustSeconds 8** on an E91-class board that reaches 8:00 — orthogonal to this 1:53 seed; still the main path past Fryer/ice-imp for 20:00.

## Beliefs changed

- **B35** (evidence add): exploit 1EXPRJG **1:53** vs 17:41 champion on same template family — early tail exists; does not shrink confirmed top-band ~69s spread.
- **B36** (evidence add): Hot oil **21.5** outcome, lethal window **19.5** at 1:53 on burn with food 79–82 right — reinforces lead.
- **B96** (evidence add): 1:52 **Eat food 25%** vs **explore up 42%** at 2 hp with burn — another miss beside 2:55/4:12 pair.
- **B58** (evidence add): third exploit sample **0 evade** goals, explore dominated pre-chest — stays **likely**.
- **B103** (new, see beliefs array): champion stack can die before 2:00 on nightmare-1 world with chest listed ~1:21 — **lead**, one seed.

## Process changes

None.

<!-- /review -->

## Picks

- **0:18** level-up: took Tater Tot Pup from Salt Shaker, Tater Tot Pup, Golden Fry.
- **0:18** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:23** level-up: took Gravy Heart from Potato Battery, Gravy Heart, Starch Plating.
- **0:23** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **1:18** level-up: took Tater Tot Pup from Gravy Splash, Tater Tot Pup, Gravy Boat.
- **1:18** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **1:21** level-up: took Tater Tot Pup from Butter Pat, Tater Tot Pup, Reset Button.
- **1:21** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **1:31** level-up: took Gravy Heart from Gravy Heart, Hot Start, Frying Pan.
- **1:31** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.
- **1:39** level-up: took Fry Knives from Masher Grip, Fry Knives, Couch Potato.
- **1:39** gained without a pick (a chest or other): Fry Knives 1/8 new.
- **1:42** gained without a pick (a chest or other): Tater Tot Pup 4/8 to 5/8.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
2. If health is under 70% and food is listed, eat the food.
3. Evade only when no chest and no food is listed.
4. A Spud Freezer that is close is also good: it freezes every enemy for 7.5 seconds.

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
  "distrustSeconds": 0,
  "distrustBossRange": 0,
  "planEvery": 5,
  "eliteSeconds": 20
}
~~~
