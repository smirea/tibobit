# 2026-11-07 22-00-47: lived 02:08 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=mpv09b7brs54v&stats=A5M8AMQBCEEBcbcAAACbBgUAy-cBzBcALdoCsg8AA9YBvwwAeu0B3wQCvQEB_dADB3pF5SHj9wnbnLaMOihPARGkAQAHBQABAAAAAgAAAGMAAAIHAQIECj72AQMIBwcOHxUFCigEBgU9UiwFBAUkBQDof0QAehEmAXG3GgIHSG90IG9pbA4CClNwb3JlIHZlbnQMBgEABwIAAAkGA9k5pAEACgK9BhEBAxICA9YWAQEgEgAQ0S5_GsQhL8YMgvf3ySo1AA |
| Ending | died at 2:08, level 8, 196 kills |
| Opening | first chest listed 1:54; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 8 at 3:00 |
| Testing | nothing named |
| Seed | 1GSODM7 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 088d411 docs(gameplay): the cursor loop records, unreviewed, the 2026-11-07 21:46 run, lived 13:08, testing E124 |
| Coach prompts | none (exploit run); coach-retrospective.md 29ea3ff1 |
| Templates from | 2026-11-07_20-34-44_lived-17-41_nightmare-1_world_headless.md (exploit run) |
| Log | /tmp/tibobit/2026-11-07_22-00-47_nightmare-1_world_headless.csv |

## Outcome

- Lived **2:08** (128.3s), level 8, 196 kills.
- Damage taken by source: enemy:cave-grub 68.5, enemy:garden-slug 37.5, boss:amusing 25.5, Hot oil 14, Spore vent 11.7, enemy:crumb-ant 6.6; 164 in all. Health gained over the run, by food, regeneration and anything else: about 37 (the game does not say from what).
- Weapons: Tater Tot Pup 1/8, Tot Toss 2/8, Hash Brown Shield 1/8, Deep Fryer 1/8.
- Passives: Gravy Heart 3/5.
- Items: none.
- Planner asked 48 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 73/120 | 50 | 0 | 2 | 28 | enemy:cave-grub, Spore vent |
| 1:00 | 49/149 | 53 | 28 | 7 | 73 | Hot oil, enemy:garden-slug |
| 2:00 | 13/163 | 45 | 9 | 8 | 80 | enemy:cave-grub, boss:amusing |

- Bosses first seen: amusing (amusing) at 2:00.
- First chest listed: 1:54. First time under 25% health: 2:03.
- Goals by kind (done / gave up / dropped): explore 12/0/5; spot 5/0/0; chest 0/1/3.
- Dashes: 7 (0:22, 0:31, 1:25, 1:46, 1:54, 2:00, 2:05).
- Model calls: 41 plans, 7 picks, 94 moves (mean 197ms); the page walked through 5 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:26 Tot Toss 1/8 new; 1:24 Hash Brown Shield 1/8 new; 1:37 Gravy Heart 1/5 new; 1:57 Deep Fryer 1/8 new.

## Plan

Exploit run (one run in 3 of this coach): the champion templates from 2026-11-07_20-34-44_lived-17-41_nightmare-1_world_headless.md (Nightmare 1, lived 17:41), unchanged, starting with tater-pup. It tests nothing new: it is a real attempt at 20:00 and a second sample of the best play so far, so the review can tell how much of that run was luck.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

Exploit run on seed **1GSODM7**: same champion-family templates as **2026-11-07_20-34-44** (lived 17:41), **tater-pup**, no named experiment. Tibo died at **2:08**, level **8**, with **0 chests opened**, **first chest listed 1:54**, **no evolution**, and **amusing** at **2:00**. The minute table shows a weak opener (**73/120** at 1:00, **49/149** at 2:00) driven by **cave-grub**, **Spore vent**, **Hot oil**, and **garden-slug**, then collapse in the amusing minute (**13/163** at death) with **boss:amusing 25.5** on the outcome. This is another **chest-listed / never-opened** short exploit, not a near-miss on the 16–18 minute band. **B103** batch scoring still applies: one short exploit beside one long champion run does not measure stack luck without stratifying by **first chest time** and **opens by 2:30**.

## Findings

- **Champion stack on a chest-starved opener dies before amusing evolution window** — first chest **1:54**, **0 opens**, pup **1/8**–**3/5** Gravy only, died **2:08** with amusing **25.5** dmg (Stats, outcome). **Likely** (matches NJRNZQ / R7YOVY / 1EXPRJG class; one seed).
- **State chest directive did not keep Open through the 1:54 window** — explore left found chest **1:54**; plan **Open the chest 81%**; goal **dropped** same second for level-up **Gravy Heart** (**1:54–1:56** rows), then **failed/gave up** chest goals (**0/1/3** chest goals) with **11 enemies_near** on chest stand rows. **Likely** (log); complements **B123** on NJRNZQ-style drops, here interrupted by pick + boss minute.
- **Minute-0–1 contact damage without chest power** — lost **50** hp minute 0 and **53** minute 1 while only **5 spot** charges completed and **12 explores**; top sources **cave-grub 68.5**, **garden-slug 37.5** (outcome). **Likely** on this seed.
- **Generic `planner.pick` still stacked Gravy Heart on low board** — four weapons at **1/8**, Gravy **3/5** at death; no E81 goal lines on this exploit copy (generic goal only). Picks match prior exploit behavior, not E91 discipline. **Likely**.
- **distrustBossRange 0 + amusing at ~49 hp** — from **2:00** boss plan still rated **Open chest 44–39%** while amusing **206→26** left; action steps ruled most chest directions **dead** or high hurt; **no** `distrustBossRange` (knobs 0). **Likely** (confirms E106 refutation class on weak openers, not a retest of E106).

## Went well

- **1:54** explore **found a chest 52 down-left** and planner scored **Open 81%** — the state chest line plus listing worked once a drop existed (**1:54** plan row).
- **Beetle Nest channels** completed several times (**0:20**, **0:30**, **0:44**, **1:12**) without elite-fight goals — spot loop functioned.
- **Spud Freezer** charged **1:46** (**P148** done) — directive freezer line still wins occasionally on full exploit templates.
- **Dash template** fired under crowd pressure (**0:22**, **2:00**, **2:05** dashes with **48–73%** asks).

## Went poorly

- **No chest open before boss** — first list **1:54**, amusing **2:00**, health **49/149**; evolution none; weapons weak (**Stats**: 0 opens by **2:30**). Should have finished **one** open before **2:00** or switched to survive amusing without chasing a multi-chest cluster.
- **Level-up stole chest goal at 1:54** — **C65611** start then **dropped** for pick mid-approach; **Gravy Heart 2/5** did not offset minute-2 swarm. Should defer pick completion or replan **Open** immediately after pick (no E81 chest-yes on generic exploit goal).
- **Chest goal failures at low hp with crowds** — **1:56** chest goal **dropped**; **2:03** open-chest **failed** (stuck 6s, step-off); died **2:08** at **13 hp** with chests still listed (**log** `C65611`, `C458835`).
- **Opening explore burn** — **73/120** at **1:00** with **Spore vent** and **cave-grub** (minute 0 hurt-most). **Hot oil** **14** total by death; walked on oil **1:22–1:24** (**walk` none`** rows).

## Moments

- **0:20** Beetle Nest charge done — **right call**; spot trade for channel without boss.
- **0:25** explore up **dropped** at **77 hp** for nest — **Better:** keep explore if no chest listed yet on chest-starved seeds.
- **1:54** explore finds chest; **Open 81%** — **right call**.
- **1:54** level-up **Gravy Heart** during chest goal — **Better:** finish channel or replan Open before pick on exploit stack without E91 pacing.
- **1:55–1:56** on chest charge, **−14 to −28 hp** ruled steps, goal **dropped** — **Better:** evade or gems until amusing passes when **<50%** and **enemies_near>8**.
- **1:46** Spud Freezer done — **right call**.
- **2:00** amusing appears at **49/149**, still **Open chest** goal — **Better:** E105-class keep-away on generic exploit (not in this template set).
- **2:03** chest goal **failed** stuck + dodge — **Better:** higher `stuckSeconds` or do not replan explore over open at **44 hp**.
- **2:07** pick **Gravy Heart 3/5** on **10 hp** with boss up — **Better:** skip/reroll or evade; healing passive useless at death threshold.
- **2:08** death step **up** at **13 hp**, amusing **22 down 85%** — **right call** given options all **dead** or lethal.

## Questions

- Does **1GSODM7** match **2LICF7** (hot opening) or **chest-never until ~1:54** stratum for exploit batch charts?
- Would **E81 planner.goal chest yes** on this exploit copy have reopened **C65611** after the **1:54** pick instead of explore/charge spots through **2:00**?
- Can **one** elite kill before **1:54** on this seed list a chest earlier (E60 never started — **0 elite fights**)?

## Next

1. **E131 / E123 on NJRNZQ** — same exploit + **E81 goal lines only**; score **5s replan** while two chests listed (**1:07** class). Moves campaign by fixing **listed-but-unopened** exploit tails without touching picks.
2. **E111** on **E105+E60 chest-starved** seed — **explore-no after 2:00** to force elite drops listing chests; this run had **no chest before 1:54** and **0 elite goals**. Moves campaign on **chest-never** openers.
3. **Continue exploit batch** per **E103** — log **1GSODM7** with **first chest 1:54, 0 opens**; do not interpret **2:08 vs 17:41** as n=1 luck. Stratify before comparing to champion.

## Beliefs changed

- **B103** — evidence adds **2026-11-07_22-00-47**: exploit champion templates, seed **1GSODM7**, **first chest 1:54**, **0 opens**, **2:08**, amusing **25.5**; confidence stays **likely**, status **held**.
- **B124** — recheck note: exploit **without** E81 lines can score **Open 81%** once yet still **0 opens** when pick + amusing interrupt (this run); TZ4L67 fix not automatic on generic goal. Status **recheck**, confidence **likely**.
- **B35** — evidence adds early exploit tail **2:08** beside **17:41**; top-band **16:32–17:41** unchanged. **confirmed**, **held**.

## Process changes

None.

<!-- /review -->

## Picks

- **0:26** level-up: took Tot Toss from Fry Lance, Potato Rain, Tot Toss.
- **0:26** gained without a pick (a chest or other): Tot Toss 1/8 new.
- **1:04** level-up: took Tot Toss from Tater Tot Pup, Tot Toss, Butter Socks.
- **1:04** gained without a pick (a chest or other): Tot Toss 1/8 to 2/8.
- **1:24** level-up: took Hash Brown Shield from Mash Wave, Tot Toss, Hash Brown Shield.
- **1:24** gained without a pick (a chest or other): Hash Brown Shield 1/8 new.
- **1:37** level-up: took Gravy Heart from Gravy Heart, Locked Gatling, Lean Lunch.
- **1:37** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **1:54** level-up: took Gravy Heart from Golden Fry, Mezzaluna, Gravy Heart, Reroll (1).
- **1:54** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.
- **1:56** level-up: took Deep Fryer from Spud Sneakers, Deep Fryer, Hash Brown Shield, Reroll (2).
- **1:57** gained without a pick (a chest or other): Deep Fryer 1/8 new.
- **2:07** level-up: took Gravy Heart from Hash Brown Shield, Gravy Heart, Lean Lunch, Reroll (3).
- **2:08** gained without a pick (a chest or other): Gravy Heart 2/5 to 3/5.

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
  "eliteSeconds": 20,
  "lockstep": 0,
  "bossOfferRange": 0
}
~~~
