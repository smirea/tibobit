# 2026-11-07 21-28-57: lived 02:42 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=nfrdd659j0yys&stats=A4RMAM0BBwYACUAAAAD9BwIAA9YCyRoCNgE3nAUGekWMOkOPj6flIShPARGFAQwKAAABAAAABAAAAHQAAAIHAQIIBHKkAQMHBiMEThcQBgQEAskBBAUVBQFxt08AYAgNAAlADQBEIwsAnQYHBgEABwIAAAkGA_8ahQEACgLyCBEBAxICA9YWAQEgEgAQ0S5_GsQhL8YMgvf3ySo1AA |
| Ending | died at 2:42, level 7, 205 kills |
| Opening | first chest listed never; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 7 at 3:00 |
| Testing | E106 |
| Seed | 1DJ7TPV |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 8621fd4 docs(gameplay): cursor reviews the 2026-11-07 21:22 run, lived 4:06, testing E107 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_21-28-57_nightmare-1_world_headless.csv |

## Outcome

- Lived **2:42** (162.2s), level 7, 205 kills.
- Damage taken by source: boss:amusing 78.7, enemy:crumb-ant 13.3, enemy:bowling-pin 13.1, enemy:bowling-ball 11.2, enemy:sprout-mite 6.5, enemy:frost-flea 3.5, Hot oil 3.2, enemy:aphid 3.1; 133 in all. Health gained over the run, by food, regeneration and anything else: about 12 (the game does not say from what).
- Weapons: Tater Tot Pup 2/8.
- Passives: Butter Pat 5/5.
- Items: none.
- Planner asked 55 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 117/120 | 13 | 12 | 4 | 28 | enemy:crumb-ant, enemy:sprout-mite |
| 1:00 | 93/120 | 24 | 0 | 6 | 72 | enemy:bowling-ball, enemy:crumb-ant |
| 2:00 | 1/120 | 93 | 0 | 7 | 116 | boss:amusing, enemy:bowling-pin |

- Bosses first seen: amusing (amusing) at 2:00.
- First chest listed: never. First time under 25% health: 2:03.
- Goals by kind (done / gave up / dropped): explore 17/0/6; gems 1/0/0; evade 5/0/0.
- Dashes: 10 (0:31, 0:36, 0:53, 1:24, 1:38, 1:47, 1:58, 2:03, 2:17, 2:29).
- Model calls: 49 plans, 6 picks, 151 moves (mean 187ms); the page walked through 12 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:18 Butter Pat 1/5 new.

## Plan

This run tests E106 on whatever Nightmare 1 Open World seed rolls: keep the E107 stack (E81 chest yes, E91/E96 picks, E105 boss evade in planner.goal, E60 elite after 2:00, E101 food lines) unchanged except knobs.distrustBossRange 400. If amusing appears near 2:00 on a chest-starved opener, move rows should name him inside 400 while the 2:00 plan still picks keep-away over fight-elite (E105). Success is boss:amusing and minute-2 health lost below the 104SEQ7 E107 readout (amusing 41, minute 2 lost 49, ended 68/134) or the 1BGLAXR E105 readout (62.1, 84 lost, 17/134)—not a new exploit of the 17:41 champion. On a chest-friendly seed the same knob should still allow E81 opens and E91 evolution while boss minutes use the action model on ranged boss ticks. Until a chest or food is listed, directive rule 1 applies: explore the map for gems and drops. Inconclusive if amusing never appears; still log distrustBossRange move reasons and amusing outcome total.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested **E106** on seed **1DJ7TPV**: the E107 champion-family stack (E81 chest yes, E91/E96 picks, E105 boss evade in `planner.goal`, E60 elite after 2:00, E101 food lines, E24 dash) with the sole knob change **`distrustBossRange` 400**. Amusing appeared at **2:00** as planned; the bot carried out the test—**keep-away won 77%** on the boss appearance plan, **five evade goals** ran from 2:00 onward, **151 move rows** cited distrust of the forecast because amusing was within 400, and **no chest or elite goal** ever started. Tibo still died at **2:42** with **boss:amusing 78.7** (59% of 133 total damage) and minute-2 health **1/120** after **93 hp lost** in that minute—worse than both comparison readouts (E107: amusing 41, −49 minute-2; E105: amusing 62.1, −84, 17/134 end). We now treat **boss-range distrust as necessary but not sufficient** when the opener never lists a chest, build stays at pup **2/8**, and amusing is met at **~92 hp**.

## Findings

- **E106 refuted on damage criteria (lead).** Outcome **boss:amusing 78.7** vs E107 **41** and E105 **62.1**; Stats minute-2 **lost 93** vs **49** and **84**; health at **2:00 was 92/120**, at minute end **1/120**. Evidence: stats table, outcome, log rows 2:00–2:42.
- **The knob fired as designed (confirmed, B70).** From **2:00** onward, move `reason` strings name amusing distance inside 400 (e.g. 2:00 "forecast was not trusted: the amusing boss is 159 away"); **151** model move calls vs **12** page walks. One seed; mechanism already held from 19:10 run.
- **E105 boss evade executed (likely, B107).** At **2:00** plan: Keep away **77%**, goal **evade** start; **0** elite goals; fight-elite options **6–11%** on same plans. No chest listed, so E81 untested.
- **Chest-starved opener unchanged (likely, B49/B72).** **First chest listed: never**; **17 explore done** through **2:00**; directive explore until chest/food held. Level **7**, pup **2/8**, Butter Pat **5/5**, **0** evolutions.
- **First evade 8s cycle cost 72 hp (lead).** Goal end **2:08**: "the 8 seconds ran out, and Tibo lost **72** health during them" (92→20 hp band in log). Boss ticks logged **boss:amusing 23.3–69.9** in 3s windows **2:02–2:04**; many steps rated **no damage** on hurt scale but still lost double-digit hp (e.g. **2:02** −23 with amusing 17 away).
- **E101 food clause not scorable (likely, B105).** **Food column empty** entire log; first under-25% **2:03** at **42/120**—same shape as 1HHPOWV.
- **E60 elite-after-2:00 did not win a goal (lead, B116).** From **1:01** plans show Fight Potato Beetle **13–39%** but explore always won until **2:00**; after 2:00 evade dominated. **0** elite kills, no chest drops.

## Went well

- **2:00** boss appearance: immediate **evade** goal and **keep-away 77%**—E105 template behavior on a fresh chest-never seed (**2:00** plan row).
- **distrustBossRange 400** removed silent page-walk through amusing minute; every contested step is reviewable in the log (**2:00–2:42** move density).
- Pick discipline: Butter Pat to **5/5**, pup leveled to **2/8** (**0:52** Tater Tot Pup 92%)—E91 partial progress despite no chests.
- Post-collapse evade at **~20 hp** (2:16–2:24) sometimes **kept clear** (e.g. **2:16** evade done, 0 hp lost in 8s)—shows evade can work when boss is **100+** away, too late to matter.

## Went poorly

- **Minute 2 wipe (2:00–2:08):** entered boss window at **92/120** with weak weapons; **72 hp** in one evade timer—should have had evolution/chest policy or higher hp buffer before **2:00** on chest-never seeds.
- **2:09–2:42 death spiral at 1–20 hp:** action rows show **stand still −40**, **down dead**, **up −37 ruled out** (**2:01–2:03**); model still picked **up-right** useful **79–89%** on evade while amusing **<120** away—likely walked into telegraph lanes.
- **0:09–0:10 hot oil** (−8 hp, `Hot oil 3.2`) early explore cost; **no heal** entire run (**~12** regen only per outcome).
- **17 explore segments, 0 drops found**—map RNG plus no elite chests; campaign still blocked on **first chest before amusing** on this seed class.

## Moments

- **0:00** Explore up-right 72%; chest-never opener starts. Right call for directive 1.
- **0:09** Walk on hot oil; **−8 hp**. Better: action/state hot-oil line already present—planner might bias away from oil patches when explore ties.
- **0:18** Butter Pat 98% pick. Right call for E91 passives.
- **0:52** Tater Tot Pup 92%. Right call.
- **1:34** Single **gems** goal (94s); brief deviation. Acceptable.
- **2:00** Amusing 159 up; **keep-away 77%**, evade start; first distrust move. Right call for E105.
- **2:02** **−23 hp** with amusing 17 away; hurt ratings mostly "no damage". Better: action.hurt must treat amusing telegraph / close boss as badly hurt, not useful-up-right.
- **2:03** **42→28 hp**; under 25% but **no food**. E101 untestable; evade continues.
- **2:08** Evade done **−72 hp** in 8s. Better: longer evade or dash-heavy template when boss <100 and hp <50.
- **2:15** Butter Pat to 5/5 during evade at **20 hp**. Pick ok; goal priority wrong.
- **2:29** Dash down-right 74% at **11 hp** with amusing 93 away—last meaningful reposition.
- **2:42** All directions **dead** on hurt; Tibo dies at **1 hp**. Forecast/trust could not save; minute already lost.

## Questions

- Does **planner.goal explore-no after 2:00** (when no chest, no boss within 200) finally start **elite** goals on chest-never seeds and list a chest before queen? → **E111** proposed.
- Does **E108** (shop no while boss within 200) matter on chest-friendly seeds only, or also when crate options appear under amusing? → stays proposed.
- Can **action.useful** be constrained during **evade** so "closer to goal" cannot prefer directions the move text marks as **−20+ hp** or **telegraph**? → new movement experiment.
- On chest-never seeds, is **starting weapon + exploreDistance** the real lever—not boss knobs—for surviving amusing? → meta/map.

## Next

1. **E111** on the same stack: add **planner.goal** explore-no / elite-yes after **2:00** when no chest and no boss within 200—only way on this seed class to get a chest drop before **3:00** without fighting amusing.
2. **E106 recheck** on a **chest-friendly** seed (SBBOHY-class): isolate whether distrustBossRange **400** helps Masher/Kraken minutes on an evolved board without conflating chest-starved minute-2 wipes.
3. **E101** on a seed known to **list food under 25%** (1EXPRJG-class), not another food-empty seed.

## Beliefs changed

- **B70** — evidence adds this run: 151 distrust-boss move reasons 2:00–2:42; status **held**, confidence **confirmed** unchanged.
- **B107** — evidence adds 1DJ7TPV keep-away 77% at 2:00; status **held**, confidence **likely** unchanged.
- **B108** — extended: with E105 + distrustBossRange 400, amusing can still exceed E105-only damage on chest-starved seeds (**78.7** vs **62.1**); confidence **lead** → **likely**, status **held**.
- **B118** (new, **game**): On chest-never Nightmare 1 seeds, **distrustBossRange 400** does not cap **boss:amusing** below the E105-only baseline when Tibo enters the **2:00** window near full hp on a weak board (pup ≤2/8, no evolution); **lead**; evidence 1DJ7TPV E106 vs 1BGLAXR/104SEQ7.
- **B119** (new, **action**): During amusing evade with distrustBossRange on, the action model often rates steps **no damage** on the hurt scale while **boss:amusing** still deals **10–40 hp** in the next second when the boss is **<100** units; **lead**; evidence 2:02–2:04 move/hurt_by rows.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:18** level-up: took Butter Pat from Spud Decoy, Frozen Fries, Butter Pat.
- **0:18** gained without a pick (a chest or other): Butter Pat 1/5 new.
- **0:32** level-up: took Butter Pat from Fry Knives, Spud Sneakers, Butter Pat.
- **0:32** gained without a pick (a chest or other): Butter Pat 1/5 to 2/5.
- **0:52** level-up: took Tater Tot Pup from Butter Pat, Masher Grip, Tater Tot Pup.
- **0:52** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **1:26** level-up: took Butter Pat from Butter Pat, Lean Lunch, Frozen Fries.
- **1:26** gained without a pick (a chest or other): Butter Pat 2/5 to 3/5.
- **1:34** level-up: took Butter Pat from Slow Cooker, Butter Pat, Tot Toss.
- **1:34** gained without a pick (a chest or other): Butter Pat 3/5 to 4/5.
- **2:15** level-up: took Butter Pat from Butter Pat, GPU, Peel Out.
- **2:15** gained without a pick (a chest or other): Butter Pat 4/5 to 5/5.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose upgrades and the next goal.

Aim: survive 20:00 on {{difficulty}} ({{mode}}).

DIRECTIVE, follow first:
1. Until a chest or food is listed, explore the map for gems and drops.
2. If a chest is listed and health is at least 40%, open that chest. Chests evolve a ready recipe.
3. If health is under 70% and food is listed, eat the food.
4. If health is under 40% and food is listed, eat it; if no food is listed, evade.
5. After game time 2:00, if no chest is listed, fight the nearest listed elite until it dies so it may drop a chest.
6. A Spud Freezer close by is worth charging when listed.

What we know:
- distrustBossRange 400 asks the action model while a boss is within 400; this run tests whether that cuts amusing minute bleed on chest-starved seeds.
- E105 planner.goal keeps fight-elite off when a boss is within 200; evade should still win at 2:00.
- On chest-friendly seeds, open listed chests early; chest yes lives in planner.goal.
- Tater Tot Pup below 5/8: level it; take Gravy Heart for pup; no new weapon while any weapon is 1/8.
- Hot oil underfoot is lethal at low hp; food heals ~30 on a finished food goal.

Asked because {{why}}. State:

{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo now to survive and grow stronger?

When a chest is listed, say yes only to opening that chest and no to collecting gems nearby and no to exploring for a chest.

When a boss is within 200 units, say yes to keeping away from enemies and no to fighting a listed elite, no to opening a chest, no to charging a spot, no to collecting gems, and no to exploring.

When no chest is listed and game time is past 2:00, say yes to fighting a listed elite and no to exploring for a chest.

When health is under 25% or Tibo stands on hot oil or burn, and food is listed, say yes to eating that food and no to exploring.
~~~

### planner.pick

~~~text
If Tater Tot Pup is below 5/8 and a level of it is offered, take that. If another held weapon is below 5/8 and its level is offered, take that level. Take Gravy Heart with Tater Tot Pup or Peeler, Fertilizer with Seed Potato or Seeker Sprouts, Big Bowl with Whisk Vortex, GPU with Chip Shuriken. If any held weapon is at 1/8, take only a level of a held weapon or Skip; never a card that adds a new weapon slot. Otherwise take the strongest upgrade for what Tibo already holds. Tibo is at a {{choice}}. Which option makes Tibo strongest?
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
  "distrustBossRange": 400,
  "planEvery": 5,
  "eliteSeconds": 20
}
~~~
