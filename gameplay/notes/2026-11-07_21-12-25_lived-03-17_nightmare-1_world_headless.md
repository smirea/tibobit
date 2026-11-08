# 2026-11-07 21-12-25: lived 03:17 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=6sbv77cx4d6gf&stats=A6tcAvECCBcApH4BAADsCQIAA9YF6z8CswECJbcC_dABCXpF4_cJ25y2jDruCShPj6flITcBEoYBAAwAAAEAAAAFAAAAsQEAAAILAQMMAgKYAYwC2AEDCgkUTR8LChEPDQMEBALLAgsFJAUBcbc-AHoRCgIKU3BvcmUgdmVudAoApH4JAgdIb3Qgb2lsCAYBAAcCAAAJBgP1SYYBAAoCmAwRAQMSAgPWFgEBIBIAENEufxrEIS_GDIL398kqNQA |
| Ending | died at 3:17, level 8, 369 kills |
| Opening | first chest listed 2:57; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 8 at 3:00 |
| Testing | E105 |
| Seed | 1BGLAXR |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | bfabe3f docs(gameplay): cursor reviews the 2026-11-07 21:07 run, lived 3:08, testing E101 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_21-12-25_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:17** (197s), level 8, 369 kills.
- Damage taken by source: boss:amusing 62.1, enemy:garden-slug 10.4, Spore vent 10.1, enemy:lint-bunny 8.9, Hot oil 7.7, enemy:compost-maggot 6.8, enemy:cave-grub 5.3, enemy:snow-mold 4, enemy:sock-pile 3.5, Brambles 3.3, boss:beetle-queen 2.7, enemy:potato-beetle 2.4, enemy:ketchup-drop 2.3, enemy:bog-slime 2.1, enemy:sprout-mite 1.4, enemy:aphid 1.4; 134 in all. Health gained over the run, by food, regeneration and anything else: about 14 (the game does not say from what).
- Weapons: Tater Tot Pup 5/8.
- Passives: Bacon Bits 2/5, Gravy Heart 1/5.
- Items: none.
- Planner asked 72 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 103/120 | 16 | 0 | 6 | 29 | Spore vent, enemy:cave-grub |
| 1:00 | 102/134 | 16 | 14 | 7 | 73 | enemy:compost-maggot, Brambles |
| 2:00 | 17/134 | 84 | 0 | 8 | 116 | boss:amusing, enemy:garden-slug |
| 3:00 | 2/134 | 17 | 0 | 8 | 176 | enemy:lint-bunny, enemy:sock-pile |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00.
- First chest listed: 2:57. First time under 25% health: 2:56.
- Goals by kind (done / gave up / dropped): explore 20/0/4; evade 9/0/0.
- Dashes: 13 (0:16, 1:07, 1:13, 1:24, 1:40, 2:03, 2:13, 2:29, 2:36, 2:51, 2:56, 3:05, …).
- Model calls: 65 plans, 7 picks, 252 moves (mean 185ms); the page walked through 9 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:44 Bacon Bits 1/5 new; 1:00 Gravy Heart 1/5 new.

## Plan

This run tests E105 on Nightmare 1 Open World: when a boss is listed within 200 units, planner.goal should say yes to keep-away and no to fight-elite, charge spots, chest, gems, and explore. On chest-starved seeds like 1HHPOWV, amusing at 2:00 had Fight the Garden Slug at about 78% and minute 2 lost 101 hp with zero chest opens; if the hypothesis holds, the first plan at 2:00 and replans through about 2:30 should pick evade over elite fights while amusing is up, hp should stay higher than 28/149 at the end of minute 2 when a chest still has not listed, and elite goal starts in that window should drop. Stack otherwise matches the E81 chest path and E91/E96 picks: explore until a chest or food is listed, open listed chests at 40%+ health, E101 food-under-25% and burn lines unchanged but not scored this run. Default opening meanwhile is directive rule 1: explore the map for gems and drops until a chest or food is listed. Inconclusive if amusing never appears or no fight-elite option is offered while a boss is within 200.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested **E105** on Nightmare 1 Open World seed **1BGLAXR**: `planner.goal` boss-within-200 keeps evade high and fight-elite, chest, gems, charge, and explore low, stacked on the E81 chest path and E101 food lines (food not scored). **Amusing appeared at 2:00**; the **2:00 boss plan chose keep-away at 80%**, dropped explore for evade, and **no fight-elite goal ever started** (0 elite fights by death). The behavioral half of E105 **held**. The run still **lost 84 hp in minute 2** and ended that minute at **17/134**, **below** the 1HHPOWV fight-elite reference **28/149**, so the **hp success criterion failed**. Tibo lived **3:17** (slightly longer than 1HHPOWV’s 3:08) with **no chest opens**, first chest **2:57**, **Tater Tot Pup 5/8**, **no evolution**; **boss:amusing 62.1** dominated damage. We now believe explicit boss `planner.goal` lines **stop the 2:00 garden-slug elite mistake** on chest-starved seeds but **do not by themselves cap amusing-minute bleed** without boss-range action help or power from chests.

## Findings

- **E105 planner behavior: boss plan picks evade, elites do not start** — At **2:00** amusing **176 up**, plan scores **Keep away 80%** vs **Fight the Garden Slug 7%**; goal switches to evade (log row `2:00,120.1`). Through **2:30** replans keep evade **82–93%** while amusing stays listed; stats show **0 elite fights** and **0 elites killed** by **3:00**. **Confirmed** for the scored planner behavior; one seed.

- **E105 hp criterion: minute-2 bar lower than 1HHPOWV fight-elite baseline** — Stats: minute **2:00** health **17/134**, **84 lost** in minute 2; first under **25%** at **2:56**. Compare 2026-11-07_21-07-23 (**1HHPOWV**): minute 2 ended **28/149** with fight-elite at 2:00. This run is **worse on hp**, not better. **Refuted** for the hp arm of E105; amusing still **62.1** of **134** total.

- **Chest-starved opener unchanged** — **20 explore done**, **0 chest opens**; first chest listed **2:57** (elite snow mold context at **2:57** plan). Same shape as B49/B105 class seeds. **Likely** held; adds **1BGLAXR**.

- **Evade goals bleed while amusing is on** — Evade cycles at **2:40** (lost **19** in 8s), **2:49** (lost **9**), **2:56–2:57** (lost **52** in one cycle, hp **53→17→2**); action still takes steps priced safe while amusing closes (**2:56** amusing **2 down-left 5%**). **Lead**: evade + current action/dash stack does not equal boss damage immunity.

- **Queen minute on 17 hp** — Colorado Queen **3:00**; evade continues, chest **192 up-right** appears **3:00** at **17 hp** but chest not opened; death **3:17** with lint-bunny/sock-pile/queen in last 3s. Campaign still blocked by **no early chest/evolution**, not by elite goals at 2:00.

## Went well

- **2:00 boss appearance protocol worked** — Instant switch to evade with **80%** keep-away (**2:00**); no repeat of **1HHPOWV**’s **~78% Fight the Garden Slug** at amusing spawn.
- **Stable hp through minute 1** — **103→102/134** at **1:00** with only **16** lost; E91 picks (pup to **5/8**, Bacon Bits, Gravy Heart) on schedule (**0:44**, **0:59**, **1:42**, **2:08**).
- **Evade streak without elite detours** — **9 evade** starts, **0** dropped evades for explore in the amusing window until hp collapsed.

## Went poorly

- **Minute 2 damage cliff** — **84** lost minute 2, mostly **boss:amusing** and contact during evade (**2:35–2:57**); ended minute 2 at **17/134**.
- **Zero chests / zero evolutions** — No power spike before queen; **5/8 pup** cannot out-dps **116+** enemies by **3:00**.
- **Late chest listing** — First chest **2:57** after the amusing bleed already spent the bar; E81 chest-yes never got a fair **40%+ open** test.
- **E101 food untested again** — No food in log (same as **1HHPOWV**); **2:56** under 25% with no food option.

## Moments

- **0:00–1:59** explore chain only; fight-elite options sit **8–15%** on plans, never win. **Right call** for E105 opener on chest-starved seed.
- **2:00** amusing listed; explore dropped, **evade 80%** wins. **Right call** — core E105 test executed.
- **2:08** level-up **during evade** (pup **5/8**); replan keeps evade **87–90%**. **Right call**.
- **2:24–2:32** evade cycles complete with amusing **48–102** away; hp still **102→97**. **Right call** on planner; action movement still in danger band.
- **2:35** evade step into amusing **~45 down**; **7 hp** lost, amusing window grows. **Better**: `distrustBossRange` or stricter boss-close action (not in this run’s knobs).
- **2:56–2:57** evade loses **52** hp; amusing **0–7%** hp. **Better**: longer evade, boss-range distrust, or food if listed (none here).
- **2:57** first chest in options; hp **17**, still evade for queen. **Inevitable** given hp, not planner fault.
- **3:00** beetle-queen plan **72%** evade; chest **192** at **6%** open. **Right call** at **17 hp**.
- **3:14–3:16** dash at **89%** with **6 hp** into swarm. **Understandable**; too late to matter.

## Questions

- Does **`distrustBossRange` 400** (or 200) during amusing cut **`boss:amusing`** below **62** on chest-starved seeds while E105 goal lines stay? → **E106** proposed.
- On seeds that list **food under 25%**, do E101 `planner.goal` food beats re-open after E105 fixes elites? Need **1EXPRJG**-class, not **1BGLAXR**. → **E101** stays proposed.
- Can **E60 elite-after-2:00** plus **E105 boss evade** list a chest **before 2:30** without starting fight-elite at **2:00**? → **E107** proposed.

## Next

1. **E106** (bosses): E105 stack + **`distrustBossRange` 400** only; score amusing outcome and minute-2 lost vs this run (**84**, **62.1** amusing). Moves campaign if amusing minute is forecast/action blind.
2. **E101** (models): replay on **1EXPRJG** or seed with food + burn/under-25% moments; E105 lines stay so elites do not confound.
3. **E88** (models): opening **`planner.goal` explore yes / gems no** until first chest — separates chest-starved explore grind from boss-window policy on a **chest-friendly** seed (H53WEU class) so E81 can run before amusing.

## Beliefs changed

- **B107** (new): planner.goal boss-within-200 on chest-starved seeds stops 2:00 fight-elite wins; elites 0 in amusing window — **lead**, **held**.
- **B108** (new): same policy does not guarantee minute-2 hp above fight-elite baseline on another chest-starved seed — **lead**, **held**.
- **B49**: add **1BGLAXR**, first chest **2:57**, 0 opens — **likely**, **held** (recheck unchanged).

## Process changes

(none)

<!-- /review -->

## Picks

- **0:16** level-up: took Tater Tot Pup from Tater Tot Pup, Butter Pat, Tot Stampede.
- **0:16** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:24** level-up: took Tater Tot Pup from Starch Plating, Tater Tot Pup, Frozen Fries.
- **0:25** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **0:44** level-up: took Bacon Bits from Rotten Spud, Spud Dice, Bacon Bits.
- **0:44** gained without a pick (a chest or other): Bacon Bits 1/5 new.
- **0:58** level-up: took Tater Tot Pup from Tater Tot Pup, Hot Sauce, Bacon Bits.
- **0:58** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **0:59** level-up: took Gravy Heart from Slow Cooker, Fertilizer, Gravy Heart.
- **1:00** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **1:42** level-up: took Bacon Bits from Potato Magnet, Bacon Bits, Peel Phantom.
- **1:42** gained without a pick (a chest or other): Bacon Bits 1/5 to 2/5.
- **2:08** level-up: took Tater Tot Pup from Tater Tot Pup, Spud Lob, Fertilizer.
- **2:08** gained without a pick (a chest or other): Tater Tot Pup 4/8 to 5/8.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog. Weapons fire on their own; you choose goals and upgrades.

Aim: survive 20:00 on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. Until a chest or food is listed, explore the map for gems and drops.
2. When a chest is listed and health is at least 40%, open that chest.
3. When health is under 70% and food is listed, eat the food.
4. When health is under 40% and food is listed, eat the food.
5. When health is under 40% and no food is listed, evade. Do not start opening a chest.
6. When game time is past 2:00 and no chest is listed, fight the nearest listed elite.
7. When any boss is listed within 200 units, evade. Do not fight elites, charge spots, or open chests until the boss is farther.

What we know:
- Chests and evolutions matter on world; elite kills drop chests when no chest is listed yet.
- Food heals about 30 hp on a finished food goal.
- Boss minutes without evade bleed hp fast; fight-elite during amusing failed on 1HHPOWV.
- Base weapon at max plus its catalyst evolves at the next chest.

Asked because {{why}}. State:
{{state}}
~~~

### planner.goal

~~~text
Option: {{goal}}

Score this one option:
- A boss is listed within 200 units: yes if evading; no if fighting a listed elite, charging a spot, opening a chest, collecting gems, or exploring.
- Health under 25%, or standing on burn or hot oil: yes if eating listed food; no if exploring.
- A chest is listed and no boss within 200: yes if opening that chest; no if collecting gems or exploring.
- Health under 40% and food listed: yes if eating that food.
- Past 2:00 with no chest listed and no boss within 200: yes if fighting a listed elite.

Is yes the right score for this option now?
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}.

Pick rules, first wins:
1. If any held weapon is 1/8, take only a level of a weapon already held or Skip. Never fill a new weapon slot.
2. If Tater Tot Pup is below 5/8 and its level is offered, take Tater Tot Pup.
3. If another held weapon is below 5/8 and its level is offered, take that level.
4. Take Gravy Heart with Tater Tot Pup or Peeler, Fertilizer with Seed Potato or Seeker Sprouts, Big Bowl with Whisk Vortex, GPU with Chip Shuriken.

Which card best serves surviving to 20:00?
~~~

### action.state

~~~text
Tibo walks toward: {{goal}}.
{{health}}
{{standing_on}}
{{hurt_by}}
{{enemies}}
{{dash}}
Hot oil and burn underfoot hurt. Step off burn when the goal allows.
~~~

### action.hurt

~~~text
If Tibo does this: {{move}}. How badly hurt in the next second? (none, scratch, bad, very bad, death)
~~~

### action.useful

~~~text
If Tibo does this: {{move}}. Does it help the goal ({{goal}})?
~~~

### action.dash

~~~text
{{health}}
{{hurt_by}}
{{enemies}}
Dash now if health fell 5+ in the last 3 seconds, or 5+ enemies are within 60 units?
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
