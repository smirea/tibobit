# 2026-11-07 21-07-23: lived 03:08 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=n4f77hjyz0zvv&stats=A6lYALQCCBkAe-oAAADYCQIAA9YE8TQCCwK_3gL90AIIekWctgnb5SGPp-P3USIoTwESlwEAGQEAAQAAAAQAAACeAQAAAgsBAwoEApYB-AHEAQMJCBUMEzEHMx0ABAQCswIBBRUFAXG3KAB76h8AbfwNAHr5CwB6EQoGAQAHAgAACQYD_DSXAQAKAoILEQEDEgID1hYBASASABDRLn8axCEvxgyC9_fJKjUA |
| Ending | died at 3:08, level 8, 308 kills |
| Opening | first chest listed 3:06; 0 chests opened by 2:30; 6 elite fights and 0 elites killed by 3:00; first evolution none; level 8 at 3:00 |
| Testing | E101 |
| Seed | 1HHPOWV |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 288fc78 docs(gameplay): cursor reviews the 2026-11-07 21:03 run, lived 1:53 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_21-07-23_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:08** (188.4s), level 8, 308 kills.
- Damage taken by source: boss:amusing 39.9, enemy:fry-fly 30.6, enemy:snow-mold 13.4, enemy:dumpster-raccoon 11.4, enemy:garden-slug 9.8, Spore vent 9.6, enemy:frost-flea 6.2, enemy:crumb-ant 5.3, enemy:compost-maggot 4.7, enemy:sand-crab 4.3, enemy:tomato-leech 3.9, enemy:parking-gull 3.5, boss:beetle-queen 2.7, enemy:oil-drip 2.4, enemy:sprout-mite 1.6, enemy:ketchup-drop 1.5; 151 in all. Health gained over the run, by food, regeneration and anything else: about 28 (the game does not say from what).
- Weapons: Tater Tot Pup 4/8.
- Passives: Butter Socks 2/5, Gravy Heart 2/5.
- Items: none.
- Planner asked 64 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 111/120 | 10 | 0 | 5 | 29 | enemy:snow-mold, enemy:frost-flea |
| 1:00 | 130/149 | 10 | 28 | 7 | 72 | Spore vent, enemy:compost-maggot |
| 2:00 | 28/149 | 101 | 0 | 8 | 116 | boss:amusing, enemy:dumpster-raccoon |
| 3:00 | 3/149 | 26 | 0 | 8 | 157 | enemy:fry-fly, enemy:tomato-leech |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00.
- First chest listed: 3:06. First time under 25% health: 2:54.
- Goals by kind (done / gave up / dropped): explore 18/0/6; elite 1/2/5.
- Dashes: 26 (0:27, 0:40, 0:40, 0:52, 1:34, 1:35, 1:35, 1:45, 1:46, 1:56, 1:57, 2:01, …).
- Model calls: 57 plans, 7 picks, 230 moves (mean 201ms); the page walked through 3 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:28 Butter Socks 1/5 new; 1:35 Gravy Heart 1/5 new.

## Plan

This run serves Nightmare 1 by replaying the chest-and-build stack that reaches 15–17 minutes on friendly seeds (E81 chest yes in planner.goal, E44-style opener in planner.state, E91/E96 pick discipline, E24 dash, tater-pup) and changes only planner.goal: when health is under 25% or Tibo stands on burn or hot oil, eat listed food is a yes and explore is a no. That is E101, motivated by the exploit at 1:53 on 1EXPRJG where at 2 hp with food 82 right and Hot oil underfoot Eat food scored 25% and explore up won 42%. If the hypothesis holds, any plan between about 1:30 and death with food listed under 25% hp or on a burn tile should start or finish a food goal instead of explore, and Tibo should live past that moment often enough to list and open chests. Secondary readouts unchanged: pup past 1/8 by 6:00, first evolution before queen if a chest opens. Inconclusive if no food is listed while health is under 25% or on burn before death.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested **E101** only: on the champion stack, `planner.goal` should say yes to listed food and no to explore when health is under 25% or Tibo stands on burn/hot oil. Tibo lived **3:08** on seed **1HHPOWV** with **0 chests opened** (first chest **3:06**, only after a snow mold kill), **pup 4/8**, **no evolution**, and **six elite goals with zero elite kills** before 3:00. Health first dipped under 25% at **2:54** (stats: **28/149** at minute 2); the `food` column is **empty on every log row**, so the food-vs-explore noul was **never exercised**. **E101 is inconclusive** on mechanism, not refuted. The run still shows the campaign bottleneck on chest-starved openers: explore until 2:00, amusing at 2:00 (**39.9** outcome damage), minute 2 **−101 HP**, then snow-mold elite goals while hp bleed continued until death at **3 HP** to fry-fly and crowd.

## Findings

- **E101 untestable this seed (inconclusive).** Plan required food listed under 25% hp or on burn with food available. First under-25% at **2:54**; no `food` field populated before death at **3:08**. Cannot confirm or refute the 25%/burn food line vs explore. **Sure: lead** (one seed, absent precondition).
- **Champion chest loop never started.** Stats: first chest **3:06**; **0** opens by 2:30. Goals **explore 18 done / 6 dropped**; no open-chest goals. Same E81-style `planner.state` chest directive as long runs, but no drop to open until post–elite-kill listing. **Sure: likely** (matches B49/B85 chest-never class).
- **Amusing minute still dominant on world.** Outcome **boss:amusing 39.9** of 151; minute 2 table **−101** hp, ended **28/149**. At **2:00** plan: **Fight the Garden Slug 78%** with amusing **177 up-right**; elite goal started, not food/evade/chest. **Sure: likely** on one seed (B30/B26 held).
- **Elite goals after 2:00 do not produce drops when stuck.** **1 elite goal done** (snow mold kill **3:06** → chest listed); **2 gave up**, **5 dropped**; **0** elite kills by 3:00 per header. Multiple **Fight the Snow Mold** replans at **74–87 hp** with amusing still listed. **Sure: lead** (reinforces B80/B95 replan pattern).
- **E91 pick discipline held on short life.** Pup **100%** at **0:12**, **0:40**, **0:59**; Gravy Heart **1:35**, **1:58**; ended **4/8 pup**, **2/5** Butter Socks and Gravy Heart. **Sure: likely** (consistent with B101 on other seeds).
- **Versus prior exploit 1:53 (1EXPRJG):** both died before bosses mattered for build; 1EXPRJG had chest **1:21** and hot-oil death **with food listed** (B96/E101 motivation). This run had **no food listing** and **no chest until 3:06**, so it does **not** replicate that exploit failure mode.

## Went well

- **0:12–0:59:** consistent Tater Tot Pup level picks (four pup levels by **0:59**).
- **1:35–1:59:** Gravy Heart catalyst path started on plan.
- **1:00:** minute 1 ended **130/149** with **+28** gained (Gravy max / passive synergy)—opening farming workable before amusing.
- **E101 template** was the only change from champion stack; picks and dash stack unchanged—clean isolation for the untestable outcome.

## Went poorly

- **2:00–2:08:** amusing appearance → **Fight the Garden Slug** elite goal **78%** instead of evade/chest/food; hp already falling into amusing window (**128→114** by **2:08**).
- **2:00–2:40:** minute 2 **101 hp lost**; no chest to evolve, no food goal channel.
- **2:08–2:25:** elite fight goals **failed/dropped** (`no closer for 6 seconds` at **2:08**); planner kept re-picking snow mold/garden slug fights at **~50–89%** while amusing proximity persisted.
- **2:54:** first under-25% with still **no food** in state—E101 clause idle.
- **3:00–3:08:** queen listed **3:00**; death at **3 HP** with fry-fly (**30.6** total) and amusing still active—no recovery path.

## Moments

- **0:12** level-up: Tater Tot Pup **100%**—right call for E91.
- **2:00** boss amusing appears; plan **Fight the Garden Slug 78%**—should have evaded or gemmed per boss-window policy; elite sentence won.
- **2:08** elite goal failed stuck 6s at **114/149**—should not restart elite at full amusing pressure; evade or explore for drop.
- **2:21** pick Butter Socks during snow-mold fight—ok for build, but fight goal still dominant.
- **2:40** hp **62/149**; plan still **Fight the Snow Mold 80%+**—better: keep-away/evade under amusing.
- **2:54** health **~25%** band (stats)—no food in log; E101 cannot fire.
- **3:00** Colorado Queen appears; still elite/snow mold scoring **64–73%**—wrong priority at **28 hp**.
- **3:06** snow mold **killed**, first chest **56 left** listed—too late; **Open chest 14%** vs fight fry fly **64%**—should open chest if channel survivable.
- **3:08** death at **3/149**—right call none; lethal crowd with no heal lever.

## Questions

- Does seed class **1HHPOWV** never list food in the first 3 minutes at all, or only when hp is high?
- Can **planner.state** force evade when amusing appears without relying on elite **78%** noul wins?
- Will **E101** food lines score if we replay a seed that lists food under 25% (e.g. **1EXPRJG** or **16YSA5O**)?
- Does **stuckSeconds 10** (E102) convert any **3:06** chest into an open before death on one-kill listings?

## Next

1. **E101 retest on 1EXPRJG (or 16YSA5O):** same `planner.goal` food/burn lines only; need food listed with hp **<25%** or on burn. Moves campaign by testing the actual 21-03 failure (explore over eat) without confounding seed that omits food.
2. **E100 on 1GKFGV6/H53WEU-class seed:** E81 chest yes + boss-window handling; score **chest open before 2:00**. Without first chest, E91 evolution path never starts—blocks ladder.
3. **E88 opening explore yes/no in `planner.goal`:** until chest listed, stop pure explore chains on seeds that never list chest by 2:00; pairs with elite-at-2:00 (E60) without letting amusing own minute 2.

## Beliefs changed

- **B49** (likely, held): add **1HHPOWV** / this run—first chest **3:06**, none before amusing; **0** opens, died **3:08**.
- **B96** (lead, held): add—at **2:54** under 25%, **no food listed**; E101 clause never ran (contrast **1EXPRJG** food **82** at **2 hp**).
- **B103** (lead, held): add third short champion-template sample **3:08** beside **1:53** exploit—opener variance, not one-off exploit luck alone.
- **B80** (likely, held): add—**Fight Garden Slug 78%** at amusing **2:00** on this run; **0** elite kills by 3:00 despite repeated snow mold goals.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:12** level-up: took Tater Tot Pup from Hearty Helping, Tater Tot Pup, Tater Mines.
- **0:12** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:28** level-up: took Butter Socks from Seed Potato, Butter Socks, Big Bowl.
- **0:28** gained without a pick (a chest or other): Butter Socks 1/5 new.
- **0:40** level-up: took Tater Tot Pup from Butter Socks, Tater Tot Pup, Golden Fry.
- **0:40** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **0:59** level-up: took Tater Tot Pup from Chives, Tater Tot Pup, Frying Pan.
- **0:59** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **1:35** level-up: took Gravy Heart from Masher Grip, Starch Bolt, Gravy Heart.
- **1:35** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **1:58** level-up: took Gravy Heart from Slow Cooker, Spud Fence, Gravy Heart, Reroll (1).
- **1:59** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.
- **2:21** level-up: took Butter Socks from Hash Boomerang, Butter Socks, Starch Plating, Reroll (1).
- **2:21** gained without a pick (a chest or other): Butter Socks 1/5 to 2/5.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog. Weapons fire on their own; you choose goals and upgrades.

Aim: survive 20:00 on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. Until a chest or food is listed, explore the map for gems and drops.
2. When a chest is listed and health is at least 40%, open that chest. Chests evolve ready recipes.
3. When health is under 70% and food is listed, eat the food.
4. When health is under 40% and food is listed, eat the food.
5. When health is under 40% and no food is listed, evade. Do not start opening a chest.
6. When game time is past 2:00 and no chest is listed, fight the nearest listed elite.

What we know:
- Small enemies inside 60 units and forecast-free walks cost hp on world; chests and evolutions matter.
- Food heals about 30 hp on a finished food goal.
- Hot oil and burn tiles kill at low hp if Tibo keeps exploring.
- Base weapon at max plus its catalyst evolves at the next chest.

Asked because {{why}}. State:
{{state}}
~~~

### planner.goal

~~~text
Option: {{goal}}

Score this one option:
- Health under 25%, or standing on burn or hot oil: yes if eating listed food; no if exploring.
- A chest is listed: yes if opening that chest; no if collecting gems or exploring.
- Health under 40% and food listed: yes if eating that food.
- Past 2:00 with no chest listed: yes if fighting a listed elite.

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
