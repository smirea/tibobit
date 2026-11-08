# 2026-11-07 20-59-22: lived 02:31 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=pcevp878www9s&stats=A-hGAJYCCBYCClNwb3JlIHZlbnQAAADMBwIAA9YF8S8CFgL90AKw1AEFekWctgnb4_dDjwERlQEACwEAAQAAAAMAAABsAAACCAECDATMAfABAwYFCxRHKAgEBAKUAgIFFQUAehE7ANfdGwFxtxIAx_gJAOh_CQYBAAcCAAAJBgOHMJUBAAoC8AkRAQMSAgPWFgEBIBIAENEufxrEIS_GDIL398kqNQA |
| Ending | died at 2:31, level 8, 278 kills |
| Opening | first chest listed 1:47; 0 chests opened by 2:30; 3 elite fights and 0 elites killed by 3:00; first evolution none; level 8 at 3:00 |
| Testing | E96 |
| Seed | 1GKFGV6 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 7f7e456 docs(gameplay): cursor reviews the 2026-11-07 20:55 run, lived 2:21, testing E91 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_20-59-22_nightmare-1_world_headless.csv |

## Outcome

- Lived **2:31** (151.1s), level 8, 278 kills.
- Damage taken by source: enemy:garden-slug 59, enemy:compost-maggot 26.7, boss:amusing 17.7, enemy:potato-beetle 8.9, enemy:cave-grub 8.9, enemy:ketchup-drop 8, enemy:sprout-mite 7.7, enemy:tomato-leech 3, Brambles 2.9, Spore vent 2.4, enemy:bowling-pin 2.1, enemy:crumb-ant 1.5; 149 in all. Health gained over the run, by food, regeneration and anything else: about 25 (the game does not say from what).
- Weapons: Tater Tot Pup 5/8.
- Passives: Gravy Heart 2/5, Couch Potato 1/5.
- Items: none.
- Planner asked 50 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 134/134 | 0 | 14 | 6 | 29 | - |
| 1:00 | 118/149 | 28 | 11 | 8 | 73 | enemy:compost-maggot, enemy:cave-grub |
| 2:00 | 0/149 | 121 | 0 | 8 | 108 | enemy:garden-slug, boss:amusing |

- Bosses first seen: amusing (amusing) at 2:00.
- First chest listed: 1:47. First time under 25% health: 2:21.
- Goals by kind (done / gave up / dropped): explore 3/0/8; gems 9/0/1; chest 0/2/0; elite 0/1/1.
- Dashes: 13 (1:12, 1:17, 1:28, 1:47, 1:53, 2:02, 2:07, 2:08, 2:13, 2:18, 2:24, 2:24, …).
- Model calls: 43 plans, 7 picks, 149 moves (mean 193ms); the page walked through 4 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:45 Gravy Heart 1/5 new; 0:59 Couch Potato 1/5 new.

## Plan

This run serves Nightmare 1 by keeping the confirmed E81 chest loop and E91 build path (pup levels, Gravy Heart catalyst, elite after 2:00 when no chest) while testing E96 in isolation: whether putting the 1/8 new-weapon ban first in planner.pick stops takes like Rotten Spud at 1:06 on 2LICF7 when Root Cellar was still 1/8. Stack unchanged except pick order—if any held weapon is 1/8, only level a held weapon or Skip, never a card that fills a new weapon slot; then the E91 pup, catalyst, and held-weapon level sentences. Default opening is directive rule 1: explore the map for gems and drops until a chest or food is listed; then chest, food under 70%, food under 40%, evade under 40% with no food, elites after 2:00. startWeapon tater-pup. If the hypothesis holds, a 1:06-style level-up with a held weapon at 1/8 never picks a new weapon or passive that is not a level of something already held (Rotten Spud should lose to Skip or a Root Cellar level). Pup above 1/8 by 6:00 and Gravy Pack before the queen remain secondary readouts on chest-friendly seeds; inconclusive if no pick occurs while any held weapon is 1/8. Run is inconclusive for the ban if the seed never lists a chest before death, because evolution timing was not the question.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run isolated **E96**: the 1/8 new-weapon ban moved to the **first** sentence of `planner.pick`, on the E81 opener + E91 pup/catalyst stack and seed **1GKFGV6**. Tibo lived **2:31** (level 8, pup **5/8**, Gravy Heart **2/5**), listed a chest at **1:47**, and **never finished opening it** (0 chest opens). Early level-ups while pup was **1/8** took Tater Tot Pup at **100%** (0:13, 0:17); after **0:35** no held weapon stayed **1/8**, so the Rotten-Spud-at-1:06-style pick never appeared. **E96 is inconclusive** for the reorder hypothesis; **E91 readouts are partially met** (pup past 1/8 long before 6:00, Gravy Heart taken) but evolution was untested. Death was the familiar **minute-2 collapse**: **121 hp lost** in minute 2 (stats), top sources **garden-slug** (59) and **boss:amusing** (17.7), with the last stretch on a failed chest channel and elite goals that scored high but **0 elite kills**.

## Findings

- **E96 pick reorder untested on the critical case** — Evidence: picks at 0:13 and 0:17 with pup **1/8** were Tater Tot Pup **100%**; last weapon at **1/8** ended by 0:35 (pup 4/8). No level-up offered a **new weapon** while any held weapon was still **1/8** after that. **Surety: inconclusive** (plan's own branch: inconclusive if no qualifying pick).

- **First-sentence ban does not change early pup behaviour versus E91 on a different seed** — Same pattern as 20-55-09 (pup 100% at 1/8) without needing reorder to be the cause; here reorder + directive still produced disciplined early pup levels only. **Surety: lead** (one seed, confounded with fast pup leveling).

- **Chest listed 1:47 but 0 opens; channel failed under swarm before amusing** — Goals: chest **0 done / 2 failed**; explore found chest at **1:47** (goal C262165 **95%**); charging from **1:48** lost **16 hp** opening steps (1:49–1:50 compost-maggot/cave-grub); failed **1:55** (stuck 6s, action stepped off twice); amusing first seen **2:00**; second chest attempt failed **2:02**. **Surety: likely** (log + stats).

- **E60 elite-after-2:00 fired in votes but produced no kills and no chest drops** — After chest fail **2:02**, Fight Potato Beetle **69%**; elite goal **dropped** same second; later elite fights (**E65565**, garden slug **E327704**) with **0 kills** by death; stats **3 elite fights, 0 killed by 3:00**. **Surety: confirmed** (this run only; matches B80/B75 patterns on short seeds).

- **Minute 2 health cliff matches pest + boss, not pick failure** — Stats: **1:00** 118/149 (−28, maggot/cave-grub); **2:00** 0/149 (−121, garden-slug/amusing); first under **25%** at **2:21** (40 hp); died **2:31** at **0 hp** inside Stray Dog charge with spore vent + amusing in last 3s. **Surety: likely**.

## Went well

- **0:13–0:35**: Pup **1/8 → 4/8** on four straight pup picks (100%, 100%, 98%, 97% at 1:19 for 5/8) — keeps E91 build path alive on this seed.
- **0:44–1:48**: Gravy Heart **94%** and **96%** when offered — catalyst line still wins (B67).
- **1:47**: Planner rated **Open the chest 95%** with chest listed — directive + goal chest-yes executed (same family as E81).
- **Opening minute**: **134 max hp** after Gravy Heart 1/5 at 0:45; only **28** lost in minute 1 per stats — better opener than 2LICF7 E91 minute-0 (−85).

## Went poorly

- **1:48–1:55**: Chest channel with **19+ enemies_near**; model walked off charge → **failed** at 1:55 — should have held channel or switched goal once hp bled during 1s open (B13/B54 class).
- **2:00–2:06**: Continued chest/elite intent with **amusing** at **~100%** and **distrustBossRange 0** — page walked into **−55 hp** ruled-out steps and boss ticks; should evade or abandon chest until boss farther (E59/E66 lesson not in this template set).
- **2:19–2:31**: **Fight elite** at **81%** inside Beetle Nest at **81 hp**, then garden-slug burst **40→0** in ~10s — should not start nest/elite chains under amusing with sub-40% hp.
- **Pre-1:47**: **9 gems** goals vs **3 explore done / 8 dropped** — exploreDistance 300 + planEvery 5 delayed first chest list vs H53WEU-class **1:15** (B25/B85).

## Moments

- **0:13** level-up with pup **1/8**: Tater Tot Pup **100%** over Fry Lance / Golden Fry. Better: right call (E96/E91 intent).
- **0:45** Gravy Heart 1/5: max hp **120→134**. Better: right call.
- **0:59** Couch Potato **53%** with pup **4/8** (no weapon at 1/8). Better: right call per rules.
- **1:12** dash **62%** on gems with compost-maggot — small chip. Better: acceptable.
- **1:47** explore done, chest **56 right**, open chest **95%**. Better: right call.
- **1:48** chest pick Gravy Heart **96%** while on chest. Better: right call; evolution still needs finished open.
- **1:49–1:50** on chest: **−10 hp** in two steps, enemies **23–24**. Better: dash off or abort open sooner.
- **1:55** chest goal **failed** (stuck, stepped off twice). Better: action.useful/hurt should favour stay on chest when charging.
- **2:00** amusing appears; still **Open chest 55%**. Better: boss-within-200 evade (E66/E85) not in stack.
- **2:02** chest failed; plan picks **Fight Potato Beetle 69%**. Better: evade, not elite, at **118 hp** with boss up.
- **2:21** hp **40/149** (−32 slug tick). Better: food/evade if listed; none taken.
- **2:31** stand still on Stray Dog **0 hp**, forecast rated stand still **dead**. Better: any move out; likely already doomed.

## Questions

- Does **first-in-pick 1/8 ban + explicit Skip line** change the **1:06** Rotten Spud case on **2LICF7** where Root Cellar stayed **1/8**?
- Can the **E81 chest yes** stack **finish** the first open on **1GKFGV6**-class seeds if **distrustBossRange 400** or **boss-within-200 evade** is added without dropping pre-2:00 explores?
- Why did **Potato Beetle elite** win **69–84%** repeatedly yet **0 kills** — fight duration, weapon DPS at pup 5/8, or action kiting away?

## Next

1. **E96 retest on 2LICF7** (or replay seed with documented 1:06 new-weapon offer): same pick order plus optional **"otherwise Skip"** when all non-held options are new slots — only run that can confirm/refute reorder vs E91's Rotten Spud failure.
2. **E85/E66 on a chest-friendly seed** (H53WEU / 20-13-48 class) with **E81 goal lines + E96 pick** — separates boss evade from chest listing; campaign needs opens before amusing, not another 1GKFGV6 gems stall.
3. **E86 or E89** on a run that reaches **12:00+** (exploit or E81) — late death is still the ladder gap; opening pick tests do not move Nightmare 10.

## Beliefs changed

- **B94** — confidence **likely** → **likely** (unchanged); evidence adds 1GKFGV6 E96: early **1/8** pup picks **100%**, **no** new-weapon-vs-1/8 contest after 0:35; reorder not scored on Rotten-Spud case.
- **B85** — status **recheck** → **recheck**; evidence adds **1GKFGV6**: first chest **1:47**, **0** opens by **2:31** death with E81-style chest goal yes.
- **B72** — confidence **likely** → **likely**; evidence adds **1GKFGV6**: pup **5/8** at death, **no** evolution, amusing window death.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:13** level-up: took Tater Tot Pup from Fry Lance, Golden Fry, Tater Tot Pup.
- **0:13** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:17** level-up: took Tater Tot Pup from Clean Plate, Tater Tot Pup, Hash Rush.
- **0:17** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **0:35** level-up: took Tater Tot Pup from Root Network, Butter Pat, Tater Tot Pup.
- **0:35** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **0:44** level-up: took Gravy Heart from Peeler, Skipping Cannonball, Gravy Heart.
- **0:45** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **0:59** level-up: took Couch Potato from Sprout Satellites, Couch Potato, Four-Eyed Spud.
- **0:59** gained without a pick (a chest or other): Couch Potato 1/5 new.
- **1:19** level-up: took Tater Tot Pup from Tater Tot Pup, Seeker Sprouts, Hot Start.
- **1:19** gained without a pick (a chest or other): Tater Tot Pup 4/8 to 5/8.
- **1:48** level-up: took Gravy Heart from Root Spikes, Butter Pat, Gravy Heart.
- **1:48** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. Until a chest or food is listed, explore the map for gems and drops.
2. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
3. If health is under 70% and food is listed, eat the food.
4. If health is under 40% and food is listed, eat it. If under 40% with no food listed, keep away from enemies.
5. At level-up, chest, and shrine: if Tater Tot Pup is below 5/8 and its level is on the card, take Tater Tot Pup; take a level of any other held weapon below 5/8; take Gravy Heart for Tater Tot Pup or Peeler, Fertilizer for Seed Potato or Seeker Sprouts, Big Bowl for Whisk Vortex, GPU for Chip Shuriken; do not take a new weapon while any held weapon is still 1/8.
6. After 2:00, if no chest is listed, fight the nearest listed elite until it dies.

What we know, most important first:
- A planner.goal yes on open-chest while a chest is listed starts chest goals; state alone is not enough.
- Default picks fill six new weapons and leave the starter at 1/8; level the pup and catalysts before new weapons.
- Gravy Pack is Tater Tot Pup at max plus Gravy Heart.
- Food heals about 30 hp. Eat before health is very low.
- Hot oil, spore vents, and bosses hurt on steps the forecast calls free.
- Small enemies within 60 units and ice-imp bursts dominate late minutes on full boards.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger?

If a chest is listed and the goal is to open that chest, say yes. If a chest is listed and the goal is to collect gems or explore a direction, say no.

If health is under 70% and food is listed and the goal is to eat that food, say yes.

If no chest is listed and game time is past 2:00 and the goal is to fight a listed elite, say yes. If no chest is listed and the goal is only to explore or collect gems, say no unless nothing else listed matters.
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}. Which option makes Tibo strongest?

If any held weapon is still 1/8, take only a level of a held weapon or Skip. Never take a card that adds a new weapon slot or a new passive while a held weapon is 1/8.

If Tater Tot Pup is below 5/8 and a level of Tater Tot Pup is offered, take it. If another held weapon is below 5/8 and its level is offered, take that level. If Gravy Heart is offered and Tater Tot Pup or Peeler is held, take Gravy Heart. If Fertilizer is offered and Seed Potato or Seeker Sprouts is held, take Fertilizer. If Big Bowl is offered and Whisk Vortex is held, take Big Bowl. If GPU is offered and Chip Shuriken is held, take GPU. Otherwise take the option that makes Tibo strongest.
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
