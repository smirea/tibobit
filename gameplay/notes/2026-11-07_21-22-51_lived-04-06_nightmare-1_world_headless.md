# 2026-11-07 21-22-51: lived 04:06 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=8s41wwjepcbk8&stats=A91zALACCBAB-EcAAACSDAIAA9YEwUcCvQIDGOsC_dAB0xABCHpFjDqctgnbj6fj9yhP7gkBEq8BGxACAAEAAAAEAAAAtQEAAAINAQQIBAIAiAHQAaIBVAMJCBA6RhsNIwoSBAQCpQILBRsFAXG3KQB76hoA-U0SAHoREQIHSG90IG9pbBAGAQAHAgAACQYD_kmvAQAKApIOEQEDEgID1hYBASASABDRLn8axCEvxgyC9_fJKjUA |
| Ending | died at 4:06, level 8, 304 kills |
| Opening | first chest listed 3:42; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 7 at 3:00 |
| Testing | E107 |
| Seed | 104SEQ7 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 259b9bf docs(gameplay): cursor reviews the 2026-11-07 21:17 run, lived 3:59 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_21-22-51_nightmare-1_world_headless.csv |

## Outcome

- Lived **4:06** (246.9s), level 8, 304 kills.
- Damage taken by source: boss:amusing 41, enemy:fry-fly 25.9, enemy:ketchup-drop 17.7, enemy:garden-slug 17.1, Hot oil 16.1, enemy:tomato-leech 12.5, boss:beetle-queen 10.9, enemy:bog-slime 10.7, enemy:sand-crab 7.7, Brambles 5.8, enemy:swarm-fly 5.5, enemy:potato-beetle 2.3, enemy:crumb-ant 1.4; 175 in all. Health gained over the run, by food, regeneration and anything else: about 50 (the game does not say from what).
- Weapons: Tater Tot Pup 4/8.
- Passives: Big Bowl 2/5, Gravy Heart 1/5, Stuffed Skin 1/5.
- Items: none.
- Planner asked 82 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 105/120 | 16 | 0 | 4 | 28 | enemy:ketchup-drop, enemy:potato-beetle |
| 1:00 | 117/134 | 27 | 39 | 6 | 73 | Hot oil, enemy:tomato-leech |
| 2:00 | 68/134 | 49 | 0 | 7 | 116 | boss:amusing, enemy:swarm-fly |
| 3:00 | 16/134 | 51 | 0 | 7 | 173 | enemy:fry-fly, boss:amusing |
| 4:00 | 0/145 | 27 | 11 | 8 | 173 | boss:amusing, enemy:fry-fly |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00; The Masher (the-masher) at 4:00.
- First chest listed: 3:42. First time under 25% health: 3:39.
- Goals by kind (done / gave up / dropped): explore 20/0/4; evade 14/0/1; elite 0/0/1.
- Dashes: 16 (0:44, 1:11, 1:24, 1:39, 2:03, 2:37, 3:00, 3:05, 3:11, 3:21, 3:30, 3:35, …).
- Model calls: 75 plans, 7 picks, 397 moves (mean 181ms); the page walked through 9 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:19 Big Bowl 1/5 new; 1:28 Gravy Heart 1/5 new; 4:01 Stuffed Skin 1/5 new.

## Plan

This run serves the Nightmare 1 ladder by testing E107 on whatever seed rolls: on chest-never openers (10T7HER / 1BGLAXR class), E60 planner.goal should start a fight-elite goal after 2:00 while no chest is listed, an elite kill should list and open a first chest before ~2:30, and E105 boss lines should still make keep-away win at amusing 2:00 instead of Fight the Garden Slug. On a chest-friendly seed the same stack should still chase 20:00 via E81 chest yes and E91 picks. Default before any chest listing is directive rule 1: explore the map until a chest or food is listed; at 2:00 with a boss up, planner.goal should pick evade over explore even though the state line alone does not. Score first chest list/open time, elite goal starts 1:30–2:30, and 0 fight-elite goals during amusing if he appears. Inconclusive if amusing never appears, or if no elite is listed after 2:00 with still no chest by 3:00.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested **E107** on world seed **104SEQ7**: E60-style elite preference after 2:00 with no chest, plus **E105** boss lines so amusing at 2:00 should yield keep-away, not fight-elite. Tibo lived **4:06** (vs 3:59 on 10T7HER exploit and 3:17 on 1BGLAXR E105) with **no evolution**, first chest **listed at 3:42** and **never opened**, and **zero elite kills**. The **2:00 amusing plan did play the test**: keep-away **82%** and evade ran with **no fight-elite goals** in the amusing window. The **elite→chest-before-2:30** branch **never ran**: explore dominated through **2:00** (20 explore goals done; Garden Slug options sat ~14–38% but never won), then **evade owned** the boss minutes, so E60’s post-2:00 elite yes rarely competed. We still believe chest-never openers need an elite drop path, but **goal sentences alone** are not starting elites on this seed class once E105 is active.

## Findings

- **E105 at amusing 2:00 — confirmed (one seed).** At **2:00** (`a boss appeared: amusing`), keep-away **82%** vs Fight the Garden Slug **9%**; evade started immediately; stats show **0 elite** goals in the amusing minute. Matches 1BGLAXR (**80%** keep-away). **Sure: likely** on chest-starved seeds with current `planner.goal`.
- **E107 elite path before first chest — refuted on this sample.** First chest **listed 3:42** (stats); **0 opens** by death; **0 elite fights / 0 kills** by 3:00; only **one** brief elite goal (**3:27** Fight the Fry Fly **36%**, dropped **3:32** for evade **84%**). No chest before **2:30** via elite. **Sure: lead** (one seed; same class as 10T7HER).
- **E60 elite-after-2:00 did not execute meaningfully — inconclusive as E107 outcome, finding on templates.** With no chest through **3:42**, fight-elite options after 2:00 stayed **~8–21%** while keep-away/evade/explore won (e.g. **2:46** keep-away **54%**; **3:00** keep-away **84%** with queen). Directive rule 5 in state is not enough without beating evade when bosses are listed. **Sure: likely** for E105+E60 stack on chest-never seeds.
- **Minute-2 health cost with evade — lead.** End **68/134** at 2:00 (**49 lost** in minute 2); outcome **boss:amusing 41** total. Better bar than 1BGLAXR (**17/134**) in absolute hp but still no chest pipeline. **Sure: lead**.
- **Gravy Heart + pup picks held (E91).** Gravy **1:28** (**97%**); pup **4/8** at death; recipe ready but **no chest open** for evolution. **Sure: confirmed** pick rule only.
- **Late chest listing without open — lead.** From **3:42** chests appear in plans (**3:45** Open chest **9%** at **16/134** hp); Tibo died **4:06** at **0 hp** in triple-boss evade with **211** and **803** chest coords unused. **Sure: lead**.

## Went well

- **2:00** boss appearance: **82%** keep-away, immediate evade — exact E105 criterion (**right call**).
- **1:28** Gravy Heart for pup catalyst line (**97%** pick).
- **2:32–2:57** one evade cycle **kept clear for 8 seconds without losing health** — evade can work when bosses are offset.
- Early explore obeyed directive rule 1 until bosses crowded the clock (expected on chest-never seeds).

## Went poorly

- **0:00–2:00**: **20× explore** done, **0** elite goals despite Garden Slug listings from **1:03** (e.g. **69%** explore vs **29%** slug at **1:03**) — E60 never outvotes explore **before** chest listing (**should have** been a separate test or stronger explore-no after 2:00).
- **2:00–3:00**: **49** then **51** hp lost in minutes 2–3; mostly **evade** (14 starts) with amusing **41** + fry-fly **25.9** — **distrustBossRange 0**, forecast-free boss/contact damage (**compare E106**).
- **3:27** started Fight the Fry Fly at **52/134** hp, dropped **3:32** for evade with dual bosses — wasted elite window (**should have** eliteSeconds fight or boss-no-elite clarity).
- **3:39–4:06**: at **16 hp**, charging Beetle Nest / chest options (**9%** open chest) while evade and bosses — never converted listing to open (**should have** eaten food if listed or forced chest at >40% when listed; no food in log).
- **4:01** Stuffed Skin level-up during terminal evade — low value (**Skip**/defensive pick would be better if offered).

## Moments

- **0:08** Tater Tot Pup level — **right call** (E91).
- **0:19** Big Bowl **51%** — **right call** for bowl line.
- **1:03** Explore **69%** vs Garden Slug **29%** — **should have** tested E60 elite if hypothesis is post-2:00 only; pre-2:00 explore win is expected.
- **1:28** Gravy Heart **97%** — **right call**.
- **1:52** Hot oil underfoot during explore-up-left — useful **13%** up-right detour; still chip damage — **right call** locally, oil exposure adds up.
- **2:00** Keep-away **82%**, evade start — **right call** (E105).
- **2:03–2:08** First evade window **−28 hp** — action steps toward amusing; **should have** stricter boss-range action or distrustBossRange.
- **2:00** Big Bowl level during evade — **acceptable**.
- **3:00** Queen appearance: keep-away **84%** — **right call**.
- **3:27** Fry Fly elite **36%** start then **3:32** evade **84%** drop — **should have** kept elite if E107 is the priority and bosses allow.
- **3:45** On Beetle Nest **0.7s** charge, chest **199 left** at **9%** vs keep-away **30%** at **16 hp** — **should have** prioritized open-chest when listed and hp policy allows.
- **4:01** Stuffed Skin at **13 hp**, triple boss — **poor**; die on hot oil/fry-fly swarm next seconds — **right call** to evade was too late for win anyway.

## Questions

- After **2:00** with **no chest**, does an **explore-no / gems-no** line in `planner.goal` (E88-style opening) free E60 elite to win except when E105 blocks?
- Does **`distrustBossRange` 400** on this seed class cut minute-2 **amusing** loss below **49** without starting elites during boss window (E106)?
- Will a **planner.state** elite sentence (E54) start elites **before** amusing when explore still scores **60–70%** on 104SEQ7-class seeds?

## Next

1. **E106** on **1BGLAXR or 104SEQ7-class**: E105 `planner.goal` + **`distrustBossRange` 400** only — tests whether amusing minute hp loss drops while keeping **0 fight-elite during amusing**; moves campaign by separating boss-movement failure from goal-choice failure.
2. **E54 add-on run** after E106 (or on fresh chest-never seed): **state** line “after 2:00, no chest, fight elite” **plus** E105 — isolates whether elite goals start when evade is not winning; directly attacks **no chest by 3:00** blocker to any evolution test.
3. **Chest-friendly control (E81/E91)** on same templates without E107 — confirms ladder still climbs when opener lists chest; avoids conflating template failure with seed class.

## Beliefs changed

- **B49** (likely, held): evidence adds **104SEQ7**, first chest **3:42**, **0** opens, died **4:06**.
- **B107** (likely, held): evidence adds **104SEQ7** **2:00** keep-away **82%**, **0** elite fights in amusing window (pairs with 1BGLAXR).
- **B115** (lead, held): evidence adds sibling **104SEQ7** E107 stack: **4:06**, amusing **41**, no chest, pup **4/8**, Gravy held, no evolution (with 10T7HER).
- **B116** (new, planner, lead, held): On **E105+E60** chest-never seeds, **fight-elite options after 2:00 do not become goals** while **evade/explore** win every boss-overlapped plan; one elite start at **3:27** dropped for evade. Evidence: this run; experiments **E107,E105,E60**.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:08** level-up: took Tater Tot Pup from Root Spikes, Tater Tot Pup, Harvest Moon.
- **0:08** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:18** level-up: took Big Bowl from Big Bowl, Mash Wave, Tailgate Fries.
- **0:19** gained without a pick (a chest or other): Big Bowl 1/5 new.
- **0:42** level-up: took Tater Tot Pup from Mash Finisher, Big Bowl, Tater Tot Pup.
- **0:42** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **1:11** level-up: took Tater Tot Pup from Tater Tot Pup, Spud Decoy, Salt Shaker.
- **1:11** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **1:28** level-up: took Gravy Heart from Tater Twirl, Hot Sauce, Gravy Heart.
- **1:28** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **2:03** level-up: took Big Bowl from Root Cellar, Big Bowl, Bacon Bits.
- **2:03** gained without a pick (a chest or other): Big Bowl 1/5 to 2/5.
- **4:00** level-up: took Stuffed Skin from Butter Pat, Afterburner Fries, Stuffed Skin, Reroll (1).
- **4:01** gained without a pick (a chest or other): Stuffed Skin 1/5 new.

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
- Chest-never seeds die in the amusing minute without evolution; elite kills are the other way to list chests.
- On chest-friendly seeds, opening listed chests early beats gems; say yes on the chest option in planner.goal.
- Boss within 200: keep away beats explore when planner.goal says so (E105).
- Tater Tot Pup below 5/8: level it; take Gravy Heart for pup evolution; no new weapon while any weapon is 1/8.
- Crowds and bosses hurt on forecast-free walks; hot oil underfoot is lethal at low hp.

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
  "distrustBossRange": 0,
  "planEvery": 5,
  "eliteSeconds": 20
}
~~~
