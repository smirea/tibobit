# 2026-11-07 22-04-07: lived 04:33 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=vd9dnx9yf66ng&stats=A_t_AIYEC0sBt94BAAC-DQMAA9YF60UAmbQBrzACxAsCM-MB_dAECnpFUSKPpyhPCdvlIeP3nLbuCYw6ARKxAncOAgABAAAACAEAALcBAAACDQEEBgQEAniCAd4CmgIDCwpAA1ggGQsUDQ0FBAYDxQKZASgFFQUAI29RAfhHJgFxtyIBt94iAKOAGgYBAAcCAAAJBwPegQGxAgAKApwQEQEDEgID1hYBASASABDRLn8axCEvxgyC9_fJKjUA |
| Ending | died at 4:33, level 11, 518 kills |
| Opening | first chest listed 2:10; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 7 at 3:00 |
| Testing | E126 |
| Seed | 17M7R2Y |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | ddf36a1 docs(gameplay): cursor reviews the 2026-11-07 22:00 run, lived 2:08 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_22-04-07_nightmare-1_world_headless.csv |

## Outcome

- Lived **4:33** (273s), level 11, 518 kills.
- Damage taken by source: enemy:beetle-brood 81.3, boss:beetle-queen 38.4, boss:amusing 34.4, boss:the-masher 33.6, enemy:tomato-leech 25.5, boss:great-wireworm 20.4, enemy:sand-crab 13.3, enemy:potato-beetle 12.4, enemy:snow-mold 8.3, enemy:sock-pile 7.8, Hot oil 4.8, enemy:crumb-ant 4.4, enemy:oil-drip 4.2, enemy:aphid 3.7, enemy:fry-fly 3.6, enemy:cave-grub 3.4, enemy:sprout-mite 2, enemy:compost-maggot 1.8, enemy:parking-gull 1.2; 305 in all. Health gained over the run, by food, regeneration and anything else: about 170 (the game does not say from what).
- Weapons: Tater Tot Pup 5/8, Potato Rain 1/8.
- Passives: Peel Out 1/5, Gravy Heart 4/5.
- Items: none.
- Planner asked 91 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 112/120 | 8 | 0 | 3 | 32 | boss:beetle-queen, enemy:sand-crab |
| 1:00 | 99/120 | 14 | 0 | 5 | 69 | boss:beetle-queen, enemy:oil-drip |
| 2:00 | 114/134 | 29 | 43 | 7 | 116 | boss:amusing, boss:beetle-queen |
| 3:00 | 83/134 | 60 | 30 | 8 | 173 | enemy:snow-mold, enemy:sock-pile |
| 4:00 | 4/178 | 176 | 97 | 11 | 172 | enemy:beetle-brood, enemy:tomato-leech |

- Bosses first seen: Colorado Queen (beetle-queen) at 0:46; amusing (amusing) at 2:00; The Masher (the-masher) at 4:00; The Great Wireworm (great-wireworm) at 4:21.
- First chest listed: 2:10. First time under 25% health: 4:22.
- Goals by kind (done / gave up / dropped): explore 16/0/5; evade 19/0/1.
- Dashes: 14 (2:11, 2:21, 2:52, 3:08, 3:14, 3:27, 3:32, 3:37, 3:43, 3:53, 4:03, 4:17, …).
- Model calls: 81 plans, 10 picks, 481 moves (mean 193ms); the page walked through 10 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:32 Potato Rain 1/8 new; 1:04 Peel Out 1/5 new; 2:24 Gravy Heart 1/5 new.

## Plan

This run tests E126 on Nightmare 1 Open World: whether adding only the E91 pick sentences to planner.pick on the E113 goal stack levels Tater Tot Pup below 5/8, takes Gravy Heart when offered, and gets Gravy Pack from a chest before 7:00. Templates match WEWS93 (21-37-57): E113 planner.goal for opening explore, boss-within-200 keep-away, chest yes when no boss, and food under 70%; champion action and dash; exploreDistance 300; tater-pup; distrustBossRange 0. Default opening is explore until a chest or food is listed, then open chests. If the pup is still 1/8 at 6:00 or Gravy Pack never appears before 7:00, the pick rule failed or never got offers. If Sir Strawman appears, minute-7 hp lost is a readout only, not the pass rule. Campaign: chest-friendly seeds need evolution before the queen minute; E124 proved E81 opens without E91 picks.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested **E126** on seed 17M7R2Y: E113 boss-and-chest goal text with only the E91 pup and Gravy Heart sentences added to `planner.pick`. The bot played the pick test: every pup level-up below 5/8 went to **Tater Tot Pup** (0:22, 1:33, 2:04, 3:21), and **Gravy Heart** was taken at 2:24 and again at 4:01–4:20 while the pup was held. Tibo still died at **4:33** with **0 chests opened**, pup **5/8**, Gravy Heart **4/5**, and **no evolution**. Minute 4 lost **176** hp; **enemy:beetle-brood** (81.3) dominated. The pick hypothesis is **partly confirmed**; Gravy Pack before 7:00 is **inconclusive** because the goal stack never opened a chest after the first list at **2:10**, while amusing and other bosses kept **keep-away** over **Open the chest** (e.g. 2:10 plan: Open 9% vs keep-away 56%).

## Findings

- **E91 pick sentences executed when cards were offered** — Pup raised 1/8→5/8 via picks at 0:22, 1:33, 2:04, 3:21; Gravy Heart 89–98% at 2:24 and 89–98% at 4:01–4:20. **Likely** (one seed; matches 15QD6RY/WJGN9N pick behavior).
- **Gravy Pack before 7:00 not testable on outcome** — Recipe needs max pup + Gravy Heart and an open chest; 0 opens, pup 5/8 at death. **Inconclusive** for evolution; pick path did not block offers.
- **E113 keep-away won over listed chests in boss window** — First chest listed 2:10 (explore found 68 right); immediate evade, Open scored 9% at 2:10 and 5–10% while chests stayed in column through 4:21. **Likely** (extends B71/B126 recheck on “every plan” vs chest exceptions).
- **Minute 3–4 collapse is trash + boss pile, not missing pup levels** — Stats: 3:00 **83/134**, 4:00 **4/178**; beetle-brood, tomato-leech, queens/masher/wireworm on outcome. **Likely** on this weak board without evolution.
- **Potato Rain at 0:32 with pup 2/8** — Third weapon at 32s; E91 “no new weapon while 1/8” not triggered (no weapon at 1/8 at that pick). **Lead** (slip is potato rain, not rotten spud case).

## Went well

- **0:22–3:21** — Pup discipline on level-ups; Gravy Heart at **2:24** with pup held (Gravy Heart 89% on pick row).
- **2:08–2:10** — Explore found first droppped chest (goal done “found chest 68 right”); policy correctly identified chest in state (even though open never won).
- **E113 opening** — Explore until bosses/chests; evade at **0:46** queen and **2:00** amusing without early chest starvation of listing (chest at 2:10 vs R7YOVY 2:45).

## Went poorly

- **2:10–4:21** — Chests listed but **0 opens**; 19 evade cycles while `chests` column often full and bosses inside 200 (amusing + queen overlap from 2:00). Should have had a chest-open exception or boss-range chest rule (E134/E135 family) on this seed class.
- **4:19–4:22** — Charged **Boss Lair** 2.2/3s during evade; **4:20–4:21** beetle-brood burst (**39** then **15** hp steps); died **4/33** at **4/178**. Should not stand on lair while evade has no direction toward safety (E112-class).
- **4:01–4:20** — Three Gravy Heart picks in a row in a lethal minute; pick rule correct but **no weapon levels** on pup past 5/8 and no chest to evolve. Planner stuck on evade while leveling passives only.

## Moments

- **0:46** Colorado Queen → evade 63% on appearance; **right call**, cheap minute 0.
- **0:32** Potato Rain 44% over Starch Chain — **better**: defer third weapon if policy wants pup-only; acceptable for E126 pick-only scope.
- **2:10** Chest 68 right found then evade 56% beats Open 9% with amusing 70 left — **better**: E113 chest-yes when boss >200 or charging chest after boss fades (per B134).
- **2:24** Gravy Heart during evade with chests listed — **right call** for E91.
- **3:21** Tater Tot Pup to 5/8 at **96** hp amid evade — **right call**.
- **3:35–3:37** snow-mold + crowd; hp **75→79** — evade walk **left** 84% useful; **right call**, still lost minute 3 (**60** lost per stats).
- **4:03** Dash down-left 65% with Masher + amusing — lost **11**; **better**: dash template already fired; distrustBossRange 0 leaves forecast gaps.
- **4:20** Gravy Heart pick inside Boss Lair charge — **right call** on pick; **wrong** macro goal still evade on lair.
- **4:21** **261s** walk down-right into beetle-brood swarm — **better**: bossOfferRange/bossOfferRange 0 + no stand-still under brood; immediate death spiral.
- **4:22** Under **25%** hp first time; no food goal — food column had options **565+** away earlier; **better**: E133 food-under-70% / far-chest no.

## Questions

- On chest-friendly list times (~2:10) with E113, does **“chest charging stays yes / walk becomes no inside 200”** (E135) open one chest before amusing minute-2 without losing B134 Masher opens?
- Does **elite-after-2:00** on this seed drop a chest when **0 opens** through 3:00 (E111 on 17M7R2Y class)?
- After E91 pup is 5/8+, does a **minimal planner.pick** (“otherwise strongest”) still spam Gravy Heart over pup-to-8 on crowded deaths?

## Next

1. **E135** — Split chest-walk vs chest-charging under boss 200 on E113 stack; seed with early list (17M7R2Y or replay with same templates). Moves campaign by restoring opens for Gravy Pack tests without abandoning boss evade.
2. **E133** — Food yes / far-chest no under 70% on E113+E91; this run had food in options at 2:59+ but never ate. Reduces 4:00 wipe risk on brood minutes.
3. **E131** — NJRNZQ E81 replan drop (orthogonal) OR **E127** explore-toward-chest when recipe ready but all chests >600 — after one open exists; deferred until E135 gets first open.

## Beliefs changed

- **B101** — confidence **confirmed** (unchanged); evidence adds 17M7R2Y E126: pup 98% at 0:22, Gravy 89% at 2:24, pup to 5/8 by 3:21; no pack without open chest.
- **B126** — status **recheck**; evidence adds 17M7R2Y: explore before 2:10 yes; keep-away beat Open 2:10 with chest 68 right listed; not “every plan” failure but chest-open half strained on multi-boss seeds.
- **B72** — confidence **likely** (held); evidence adds 17M7R2Y: first chest 2:10, 0 opens, pup 5/8 — evolution test still blocked by opens not picks.
- **B122** — confidence **lead**, status **recheck** (fix: confidence was invalid); E126 used named E91 picks not generic question; generic unchanged.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:22** level-up: took Tater Tot Pup from Sour Cream, Masher Grip, Tater Tot Pup.
- **0:22** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:32** level-up: took Potato Rain from Small Fry, Starch Chain, Potato Rain.
- **0:32** gained without a pick (a chest or other): Potato Rain 1/8 new.
- **1:04** level-up: took Peel Out from Frying Pan, Peel Out, Root Spikes.
- **1:04** gained without a pick (a chest or other): Peel Out 1/5 new.
- **1:33** level-up: took Tater Tot Pup from Mash Golem, Tater Tot Pup, Potato Rain.
- **1:33** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **2:04** level-up: took Tater Tot Pup from Spry Sprout, Butter Socks, Tater Tot Pup.
- **2:04** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **2:24** level-up: took Gravy Heart from Big Bowl, Hot Potato, Gravy Heart.
- **2:24** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **3:21** level-up: took Tater Tot Pup from Tater Tot Pup, Fertilizer, Gravy Heart.
- **3:21** gained without a pick (a chest or other): Tater Tot Pup 4/8 to 5/8.
- **4:01** level-up: took Gravy Heart from Gravy Heart, Tot Toss, Rösti Disc.
- **4:01** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.
- **4:11** level-up: took Gravy Heart from Gravy Heart, Couch Potato, Big Bowl.
- **4:12** gained without a pick (a chest or other): Gravy Heart 2/5 to 3/5.
- **4:20** level-up: took Gravy Heart from Gravy Heart, Potato Rain, Gravy Splash.
- **4:20** gained without a pick (a chest or other): Gravy Heart 3/5 to 4/5.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose upgrades and the next goal.

Aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow first:
1. Until a chest or food is listed, explore the map.
2. If a chest is listed, open it. Chests give a free pick and evolve a ready recipe.
3. If health is under 70% and food is listed, eat the food.
4. A close Spud Freezer is also good: it freezes enemies 7.5 seconds.
5. If a boss is within 200 units, keep away and do not open chests or charge spots.

What we know, most important first:
- Crowds inside 60 units kill weak kits fast; chests and evolutions matter more than gems.
- Max weapon plus its catalyst evolves at the next chest; Gravy Pack needs Tater Tot Pup max and Gravy Heart.
- Food heals about 30 hp. Hot oil and bosses hurt; do not stand in hot oil.
- Steps that look free can still cost hp when many enemies are close.

Asked because {{why}}. State:

{{state}}
~~~

### planner.goal

~~~text
If a boss is within 200 units: yes to keep away or evade; no to open chest, eat food, gems, explore, charge spots, fight elite.
If a chest is listed and no boss within 200: yes to open it; no to gems and explore.
If health under 70%, food listed, no chest, no boss within 200: yes to eat food; no to explore.
If no boss within 200 and no chest listed: yes to explore; no to keep away.
If Tibo's next goal is to {{goal}}: is that best now to survive and grow stronger?
~~~

### planner.pick

~~~text
At this {{choice}}: if Tater Tot Pup is below 5/8 and its level is on the card, take the pup. If Gravy Heart is offered and Tater Tot Pup is held, take Gravy Heart. If another held weapon is below 5/8 and its level is offered, take that level. Do not take a card that adds a new weapon while any held weapon is still 1/8. Otherwise take what makes Tibo strongest for 20:00.
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
  "eliteSeconds": 20,
  "lockstep": 0,
  "bossOfferRange": 0
}
~~~
