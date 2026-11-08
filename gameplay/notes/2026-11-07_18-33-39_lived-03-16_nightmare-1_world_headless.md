# 2026-11-07 18-33-39: lived 03:16 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=kc8667v9ffrjy&stats=A-5bAKEECAYB-EcAAADUCQMApggDj1QAy-cB5wcAxuEB8AMC-6ACOH8BCHpF4_flIY-nCdsoT5y2jDoBEo8BFwkAAAEAAAAFAAAApwEAAAILAQMIBAKiAYwCrgMDCQgPFxskJB4IFwQFA-cDIBoFHgUAe-oeAGAIEAIKU3BvcmUgdmVudBAAvmINAXG3DQYBAAcCAAAJBgPmX48BAAoCqAwRAQMWAQEgEgAQYCeccwXuMjEMjvZj0N86AA |
| Ending | died at 3:16, level 8, 545 kills |
| Opening | first chest listed never; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 7 at 3:00 |
| Testing | E48, E49 |
| Seed | 6BZ2E7 |
| Starting weapon | starch-bolt (random) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | dd0d8d4 feat(loop): every run's notes and the run history name its opening: first chest, chests opened by 2:30, first evolution |
| Coach prompts | coach-plan.md d5907851; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_18-33-39_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:16** (196s), level 8, 545 kills.
- Damage taken by source: enemy:fry-fly 30, enemy:crumb-ant 16, Spore vent 16, enemy:bog-slime 13, boss:amusing 13, enemy:frost-flea 7, Brambles 6, Hot oil 6; 107 in all. Health gained over the run, by food, regeneration and anything else: about 21 (the game does not say from what).
- Weapons: Starch Bolt 3/8, Reset Button 1/8, Hash Brown Shield 1/8.
- Passives: Sprouting Eyes 2/5, Starch Plating 1/5.
- Items: none.
- Planner asked 65 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 101/120 | 19 | 0 | 4 | 28 | Spore vent, enemy:frost-flea |
| 1:00 | 114/120 | 9 | 21 | 6 | 73 | Hot oil, Brambles |
| 2:00 | 70/120 | 48 | 0 | 7 | 116 | Brambles, enemy:tomato-leech |
| 3:00 | 2/120 | 70 | 0 | 8 | 154 | enemy:fry-fly, enemy:crumb-ant |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00.
- First chest listed: never. First time under 25% health: 3:11.
- Goals by kind (done / gave up / dropped): explore 23/0/12; evade 1/0/0.
- Dashes: 10 (1:05, 2:02, 2:10, 2:18, 2:38, 2:48, 3:02, 3:07, 3:13, 3:13).
- Model calls: 58 plans, 7 picks, 106 moves (mean 189ms); the page walked through 30 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:21 Sprouting Eyes 1/5 new; 1:01 Reset Button 1/8 new; 2:23 Starch Plating 1/5 new; 3:13 Hash Brown Shield 1/8 new.

## Plan

This run tests E48 on nightmare open world: after E44 showed the first Spud Whetstone at 69% hp but the planner never started it (19% vs 21% explore at 7:59), the directive now states that a listed Spud Whetstone at 40%+ health is the top goal before any chest, explore, or gems until one channel completes. E49 adds never charge a Beetle Nest so the 12:02 full-hp nest does not repeat. Everything else matches the 16:08 champion—E24 dash templates, exploreDistance 300, random start—so Tibo still chases 20:00 while we read whether a stronger first-line whetstone rule produces a Charge the Spud Whetstone goal start, a finished channel, and a weapon level jump with under ~20 hp lost on that spot.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested **E48** (charge the first listed Spud Whetstone at 40%+ before chest, explore, or gems) and **E49** (never charge a Beetle Nest) on nightmare open world seed **6BZ2E7**, with the same E24 dash stack and **exploreDistance 300** as the 18:01 champion. Tibo died at **3:16** (same clock as the 16:36 baseline), level **8**, with **no chest ever listed**, **zero chest opens**, and **no evolutions**. Spud Whetstone appeared in planner options from **0:45** at **104/120 (87%)** through **2:23** at **102/120**, always scoring **11–19%** while explore won **50–67%**; **no** `Charge the Spud Whetstone` goal ever started, so E48 did not execute the behaviour it meant to test. E49 cannot be scored: Beetle Nest options peaked at **~22%** but explore always won, so the nest ban never faced a live choice. The minute table shows recovery to **114/120** at 1:00 (+21 gained), then **48 hp** lost in minute 2 (Brambles, tomato-leech) and **70 hp** in minute 3 (fry-fly, crumb-ant, bosses at **2:00** amusing, **3:00** Colorado Queen); death at **2 hp** during a futile Spud Freezer charge after an **8 s evade** that cost **42 hp**.

## Findings

- **E48 refuted (one seed, high confidence on template, not on whetstone value):** Stronger planner.state directive (whetstone before any chest/explore/gems at 40%+) did **not** produce a whetstone goal. Evidence: **0:45** plan — whetstone **11%** vs explore left **59%** at **104/120**; **1:37** whetstone **16%** vs explore up-right **67%** at **117/120**; **1:59** whetstone **19%** vs explore up **62%** at **116/120**; zero goal rows named whetstone. Same failure mode as E44 at 7:59 on another seed, but earlier listings and higher hp did not help.
- **No chest listing is a hard map failure on this seed (likely):** Stats: first chest **never**; **23** explore goals completed with "found nothing new"; picks show only level-up gains, no chest picks. At **1:43** food was listed (**115 up-right**) at **117/120** but explore up won **55%** vs Eat food **15%** — directive line 5 not followed when food was secondary to explore habit.
- **Explore-first votes ignore mid-priority spots even when forbidden spots are irrelevant (likely):** E49's nest ban never mattered; **0:24** Beetle Nest **18%** vs explore up-left **64%**. Shrines, nests, whetstones, and freezers all sit in the **6–22%** band while explore sits **50–70%** for the whole run.
- **Late evade at critical hp matches B27 pattern (lead):** At **3:01** hp **61/120** with food **108 up** at **38%** in options, planner still started **explore down-left**; evade only at **3:07** with **44/120** and **51%** Keep away. Collapse **61→2** by **3:15**; evade window lost **42 hp** per goal end row.
- **Boss timing holds on world (likely):** amusing first plan at **2:00** (**114/120**); Colorado Queen at **3:00** (**70/120**). Outcome: boss:amusing **13** hp total — consistent with B20/B26.
- **Damage profile is trash-heavy without chest power spike (lead):** Outcome top sources enemy:fry-fly **30**, crumb-ant **16**, Spore vent **16**; minute 3 lost **70** with **154** enemies. Weak build (Starch Bolt **3/8**, no chest evolutions) matches 3:16 deaths on other no-chest seeds.

## Went well

- **E49 directive clarity:** Nest options never won; no full-hp nest goal like 18:01 **12:02** — irrelevancy, not proof the line works, but no regression.
- **Dash template still fires under pressure:** **10** dashes (e.g. **1:05** 62% on explore, **2:02** 68% vs amusing, **3:02–3:13** cluster at low hp) — consistent with B28.
- **Level-up picks stay sensible:** Sprouting Eyes, Starch Bolt, Reset Button, Starch Plating, Hash Brown Shield — growth without chests still reached level **8** by **3:12**.

## Went poorly

- **0:00–3:16:** Entire run on explore with **no chest listing** — weapons capped low; should have tested whether **exploreDistance 600** (E26/E41) or a second seed finds a chest before 3:00 on bad maps.
- **0:45–2:30:** Whetstones visible at **87–85%** hp never prioritized — template test never ran; should use **planner.goal** wording or harness filter, not longer `planner.state` alone.
- **1:43:** Food at **117/120** ignored (**15%** eat vs **55%** explore) — wasted heal buffer before minute-2 crash to **70/120** at **2:00**.
- **3:01–3:07:** Continued explore at **61 hp** with food listed instead of eat or evade — should have eaten at **38%** food vote or evaded before queen overlap.
- **3:07–3:15:** Evade then Spud Freezer at **2 hp** — freezer at **48%** plan vote could not outrun fry-fly burst; should not start new charge spots under **10%** hp without food first.

## Moments

- **0:00** explore up-right **64%** vs shrines ≤17%. **Right call** for E21-style open, but chest never appeared.
- **0:15** Spore vent **8** underfoot; **112→101** on explore. **Better:** action/state already warns crowds; accept cost but note seed hazard pressure early.
- **0:45** First Spud Whetstone in options **278 up** at **87%** hp; explore left **59%** wins. **Better:** E48 needs planner.goal change, not only directive — test never started.
- **1:01** level-up Reset Button; whetstone **172** at **16%** vs explore down-right **67%**. **Went poorly:** directive ignored again.
- **1:21** +**19** hp to **120/120** (crumb-ant tick context). **Right call** on regen; still no chest.
- **1:43** food **115** away at **117/120**; explore up **55%**. **Better:** enforce eat when >70% directive and food listed.
- **2:00** amusing appears; **114/120**, explore up still **50%**. **Better:** optional boss evade untested; stayed on explore.
- **2:00→2:30** hp **114→89** (Brambles, bog-slime, boss pressure). **Went poorly:** no chest, no whetstone channel, no evolution.
- **3:00** Colorado Queen + amusing; **70→61** in seconds. **Better:** distrustBossRange (E51) or evade at 50% hp.
- **3:07** first **evade** at **44/120** (**51%**). **Right call** late; too late for campaign.
- **3:12** level-up Hash Brown Shield at **17/120**. **Right pick** but no time to benefit.
- **3:15** evade ends, lost **42 hp**; Spud Freezer goal at **2 hp**, walk into death. **Better:** food **493 up** at **10–13%** in plans — should beat freezer at 2 hp.

## Questions

- Does **planner.goal** that asks "does this follow the directive first?" make whetstone at 40%+ beat explore when both are listed? (→ **E52** proposed, spots.)
- On seeds with **no chest by 3:00**, does **exploreDistance 600** list a chest before death more often than 300? (→ **E41** recheck / second seed.)
- When food is listed above **70%** hp, does a **planner.goal** health line beat explore without breaking champion seed XZIVVU food timing? (→ **E53** proposed, movement.)
- Does **distrustSeconds 8** (E50) reduce minute-2/3 trash damage on short lives, or only matter after chests open? (E50 running.)

## Next

1. **E52 (spots):** Keep E48 directive in `planner.state` but change **planner.goal** to: "If the directive says charge Spud Whetstone now, is this option that charge?" on whetstone options only — isolates B2/B6 vs text-only directive failure.
2. **E50 (enemies):** Continue running on champion loadout — this run does not replace it; short death still shows trash forecast misses (**30** walk hits on own) but E50 targets long-run blight-spore.
3. **E41 (map):** Second seed at **exploreDistance 600** with E44 opening rules — 6BZ2E7 shows 300 can fail to list any chest by 3:16; campaign needs a chest-discovery fallback on bad seeds.

## Beliefs changed

- **B42:** evidence adds E48 run; claim unchanged (whetstone loses to explore above 40%); confidence stays **likely**, status **held**.
- **B25:** status **held** → **recheck**; evidence adds 6BZ2E7 **never** listed chest by 3:16 at explore 300.
- **B6:** evidence adds E48: explore **59–67%** beats whetstone **11–19%** with directive at top of state.
- **B49 (new):** lead, held — some nightmare world seeds never list a chest in the first **3+** minutes despite **exploreDistance 300** and many completed explores.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:21** level-up: took Sprouting Eyes from Couch Potato, Hash Boomerang, Sprouting Eyes.
- **0:21** gained without a pick (a chest or other): Sprouting Eyes 1/5 new.
- **0:24** level-up: took Sprouting Eyes from Sprouting Eyes, Hash Rush, Mash Landing.
- **0:24** gained without a pick (a chest or other): Sprouting Eyes 1/5 to 2/5.
- **0:49** level-up: took Starch Bolt from Sprouting Eyes, Starch Bolt, Hot Sauce.
- **0:49** gained without a pick (a chest or other): Starch Bolt 1/8 to 2/8.
- **1:01** level-up: took Reset Button from Root Network, Sprout Squad, Reset Button.
- **1:01** gained without a pick (a chest or other): Reset Button 1/8 new.
- **1:37** level-up: took Starch Bolt from Starch Bolt, Spry Sprout, Tater Twirl.
- **1:37** gained without a pick (a chest or other): Starch Bolt 2/8 to 3/8.
- **2:23** level-up: took Starch Plating from Tot Stampede, Hot Start, Starch Plating.
- **2:23** gained without a pick (a chest or other): Starch Plating 1/5 new.
- **3:12** level-up: took Hash Brown Shield from Hash Brown Shield, Starch Bolt, Tater Twirl, Reroll (1).
- **3:13** gained without a pick (a chest or other): Hash Brown Shield 1/8 new.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. When a Spud Whetstone is listed and health is at least 40%, charge that Spud Whetstone before any chest, explore, or gems. Finish the channel once before anything else.
2. Until a chest or Spud Whetstone is listed, explore to find chests. Do not start charging a Crop Patch, shrine, Beetle Nest, Boss Lair, or any other charge spot.
3. Never charge a Beetle Nest.
4. If a chest is listed, go and open it after any due whetstone at 40%+ is done or none is listed.
5. If health is under 70% and food is listed, eat the food before exploring or evading.
6. Under 40% health do not start a Spud Whetstone; prefer a listed chest, then food under 70%, then evade.
7. Evade only when no chest, food, or whetstone applies.
8. A close Spud Freezer is also good: it freezes every enemy for 7.5 seconds.

Before any chest is listed (often not until about 1:30), explore. Do not only evade.

What we know, most important first:
- On this mode the crowd hurts. Small enemies inside 60 units took Tibo from 120 to 1 hp in 3 minutes.
- Evading all the time did not work: the last run never opened a chest and died at 3:16.
- Weapons stay weak without chests. Open chests early to get stronger.
- A step that looks free can still cost 4 to 9 hp when many enemies are close.
- A base weapon at max level plus its catalyst evolves at the next chest.
- Food heals about 30 hp. Eat it before health is very low.
- Hot oil and bosses also hurt. Do not stand in hot oil.
- E44 kept health at 69% when Spud Whetstone first listed but explore beat whetstone in the vote.

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
  "distrustBossRange": 0
}
~~~
