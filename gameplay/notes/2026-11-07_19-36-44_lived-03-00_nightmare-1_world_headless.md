# 2026-11-07 19-36-44: lived 03:00 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=t0x4zpp2x7w5r&stats=A8RUALYBBgUBcbcAAACQCQMAA9YDvxkA6LoBogUCLgJ1PwG_3gEJekUoT4-nUSKMOgnb4_ectu4JARGMAREQAAABAAAABAAAAHwAAAIJAQMIAgJoeIwBAwoJGgsnDBsjBRkBBAUDnAEYAgUVBQFxt1MAbC0OAMf4CwBgCAgAnQYGBgEABwIAAAkGA5AfjAEACgK0ChEBAxICA9YWAQEgEgAQYCeccwXuMjEMjvZj0N86AA |
| Ending | died at 3:00, level 6, 182 kills |
| Opening | first chest listed never; 0 chests opened by 2:30; 2 elite fights and 0 elites killed by 3:00; first evolution none; level 6 at 3:00 |
| Testing | E75 |
| Seed | 1EA7XUU |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | f815e1a docs(gameplay): cursor reviews the 2026-11-07 19:31 run, lived 3:01, testing E70 |
| Coach prompts | coach-plan.md c05498af; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-36-44_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:00** (180.3s), level 6, 182 kills.
- Damage taken by source: boss:amusing 83.2, enemy:aphid 13.8, enemy:potato-beetle 11.1, enemy:crumb-ant 7.6, enemy:sprout-mite 5.9, enemy:ketchup-drop 4.2, enemy:tomato-leech 3.4, Brambles 3, enemy:frost-flea 2.9, enemy:gull-flock 2.1, enemy:compost-maggot 1.6, Hot oil 0.7; 139 in all. Health gained over the run, by food, regeneration and anything else: about 17 (the game does not say from what).
- Weapons: Tater Tot Pup 3/8, Afterburner Fries 1/8.
- Passives: Slow Cooker 1/5, Butter Socks 1/5.
- Items: none.
- Planner asked 57 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 115/120 | 5 | 0 | 4 | 29 | enemy:gull-flock, enemy:sprout-mite |
| 1:00 | 118/120 | 15 | 17 | 5 | 73 | enemy:crumb-ant, enemy:aphid |
| 2:00 | 4/120 | 114 | 0 | 6 | 115 | boss:amusing, enemy:potato-beetle |
| 3:00 | 1/120 | 3 | 0 | 6 | 124 | boss:amusing |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00.
- First chest listed: never. First time under 25% health: 2:21.
- Goals by kind (done / gave up / dropped): explore 19/0/5; elite 0/0/2; evade 5/0/1; food 0/0/1.
- Dashes: 16 (0:26, 1:24, 1:27, 1:29, 1:46, 1:47, 1:56, 1:56, 2:02, 2:12, 2:13, 2:18, …).
- Model calls: 52 plans, 5 picks, 209 moves (mean 184ms); the page walked through 9 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:18 Slow Cooker 1/5 new; 0:24 Afterburner Fries 1/8 new; 0:57 Butter Socks 1/5 new.

## Plan

This run serves the Nightmare 1 ladder with an exploit, not a template experiment: play the integrated champion stack (E75) unchanged—explore until a chest or food is listed, open listed chests when health is at least 40% and no boss is within 200, eat listed food under 70%, evade under 40% when no food is listed, fight the nearest listed elite after 2:00 when no chest is listed, and hold evade through boss windows via planner.goal yes/no lines (E66) plus distrustBossRange 400 and E24 dash on tater-pup. If the hypothesis holds, the log shows an elite goal after 2:00 on chest-starved seeds, a first chest listing before ~3:30 on friendlier seeds, and survival well past 5:00 with evolutions on the way toward 20:00. A death before 5:00 with zero elite goals and no chest ever listed means the opener failed and the late-game score is inconclusive.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run was **E75**: the integrated champion stack (E44 opener, E60 elite `planner.goal`, E66 boss `planner.goal`, E24 dash, `distrustBossRange` 400) on Open World Nightmare 1 seed **1EA7XUU**. The opener failed in the sense the plan defines: **no chest was ever listed**, **0 chests opened**, and Tibo died at **3:00** with **11/120** hp and **no evolutions**. The E60 elite path did fire once at **2:00** (Fight the Cave Grub **85–86%**), but the **amusing** boss appeared on the same planner tick and the elite goal was **dropped** for keep-away **96%**. A second elite goal ran from **2:16** but did not produce a kill or chest before death. **Minute 2 lost 114 hp** (118→4/120); **boss:amusing** accounts for **83.2** of **139** damage total. Late-game ladder score is **inconclusive** on this seed; what we learned is chest-starvation plus the **2:00 amusing window** with weak weapons.

## Findings

- **Chest-starved seed confirmed (likely):** 19 explore goals completed, 5 dropped; **first chest listed: never** through 3:00 (stats, outcome opening). Same shape as E70 on 1XI0A94 (3:01, no chest). One sample on 1EA7XUU.
- **E75 opener-failure criterion met (confirmed for this run):** Death before 5:00, no chest, 0 evolutions; plan says late exploit is not scored (E75 intent).
- **E60 elite noul can win at 2:00 with no chest (lead):** At **2:00**, plan options show Fight the Cave Grub **85–86%** vs explore **14–28%**; goal `E131097` **starts** then **drops** same second because **amusing 188 right** triggered boss plan; keep-away **96%**. Elite fight was not carried out—finding about **boss-spawn collision**, not elite damage.
- **E66 boss `planner.goal` held evade over explore in boss windows (likely):** After **2:00**, keep-away **96–97%** through evade chains; no explore win with boss &lt;200 in the sampled plans (cf. B71 on MRDVER). **Minute 2 still lost 114 hp**—evade + distrustBossRange does not cap amusing when HP is already low entering the window.
- **Food directive insufficient at critical hp (lead):** At **2:34** hp **11/120**, food **245 down-left**, Eat food **78%** on plan; goal `F65595` started then **dropped** for evade **92%** at **2:40** with amusing still listed. One case; matches B44/B58 pattern.
- **Weak build into 2:00 boss (confirmed):** Level 6, Tater Tot Pup **3/8**, Afterburner **1/8**, passives 1/5; no chest picks, **~13 heal** total (B37-style regen only). Amusing minute with this DPS is lethal.
- **Elite goals 2, kills 0 (lead):** Stats: elite **0 done / 2 dropped**. Cave Grub fights never completed; no chest drop from elites.

## Went well

- **0:00–2:00 explore discipline:** Directive kept explore dominant; no early shrine/crop charges; level 5–6 by 2:00.
- **2:00 boss reaction:** Immediate evade **96%** when amusing appeared (**2:00.3** plan reason: boss appeared).
- **Pick cohesion:** Slow Cooker, Afterburner, Butter Socks, Tater Tot Pup levels—sensible held-card bias.
- **`distrustBossRange` 400:** Dense move rows with "forecast was not trusted: amusing" from **2:00** onward (B70 behavior).

## Went poorly

- **0:00–2:00 with no chest (fatal):** Entire opening produced **no** elite chest pipeline; weapons stayed **≤3/8**.
- **2:00 elite stolen by boss spawn:** Best chance to force a chest (E60) aborted same tick—should have been anticipated on ~2:00 amusing seeds (B26).
- **2:00–2:21 amusing engagement:** Health **114→19** by **2:21**; fought elite **E131094** at **2:16** at **~17 hp** while amusing still **207 down**—goal policy mixed fight + evade at death hp.
- **2:34 food chase abandoned:** **11 hp**, food listed, eat scored high but evade won; died **3:00** without heal.
- **Entering amusing at 114 hp without evolution:** Unlike 7:06/14:03 seeds, no Gravy Pack or extra weapon scaling.

## Moments

- **0:00** explore up wins; seed opens chest-starved explore loop. Better: right call for E75 directive.
- **1:00** **118/120**—quiet minute, still no chest in options. Better: none until listing.
- **2:00** Fight Cave Grub **85%** then amusing **188 right**; elite **dropped**, evade **start**. Better: planner should not swap elite for evade if elite is &lt;30 units and past 2:00 (template gap).
- **2:12** level-up Tater Tot Pup 2→3 during evade. Better: right call.
- **2:18** **106→90** fighting elite with amusing **89 down**. Better: pure evade until amusing &gt;200 or hp &gt;40%.
- **2:21** **19 hp**; amusing **22** away; evade. Better: food if listed (none yet).
- **2:34** food goal **78%** at **11 hp**; walked toward food then **dropped** for evade **2:40**. Better: `planner.goal` yes eat food when &lt;40% even with boss listed.
- **2:56** evade lost **7 hp** in 8s; **4 hp** left. Better: right call on evade; damage anyway.
- **3:00** amusing **110** away, queen **167**; last moves rated **dead** on many directions; **1 hp**. Better: earlier chest via elite or different seed.
- **3:00** death; amusing **3.3** last 3s. Better: unreachable without opener chest.

## Questions

- Does **`planner.goal` need "yes fight elite" to beat "yes evade" when both boss and elite are listed and time &gt;2:00?** (boss spawned on elite tick)
- On chest-never seeds, does **lowering `exploreDistance` or switching to gems+kill** list a chest before 2:00 more often than 300 explore? (map)
- Will **planner.state rule 6 elite line (E54)** keep elite through boss appearance better than E60 goal-only? (spots)
- At **&lt;15 hp** with food listed, what `planner.goal` text makes Eat food beat evade with boss at 100+ units? (movement)

## Next

1. **E54 on 1AS5RU0-class or repeat 1EA7XUU:** Add planner.state elite sentence only on top of E75 stack; score whether elite survives amusing spawn and first chest time before 3:30. Moves campaign by breaking chest-starve without abandoning champion templates.
2. **E76 on 1AS5RU0:** Recipe picks need a chest-producing seed; retest E65/E70 catalyst rule where E60 already got chest at 2:04. Unlocks evolution before queen minute.
3. **Proposed `planner.goal` food-under-boss tweak run on XEPS03 or any seed with early food list:** Strengthen eat vs evade when hp &lt;40% and food listed; reduces 2:34-style drops. Campaign survival through minute 3.

## Beliefs changed

- **B49:** confidence **likely** → **likely** (unchanged); evidence adds **2026-11-07_19-36-44 1EA7XUU: first chest never, died 3:00, 19 explores**.
- **B72:** **lead** → **likely**; second consecutive pre-5:00 death with no chest, weak weapons, amusing-dominated minute 2 (E70 + E75).
- **B75** (new): At **2:00** on chest-starved seeds, **E60 elite can win the plan vote but a boss appearance on the same cycle drops the elite goal for evade**, so elite-over-explore never executes unless boss timing slips. **Lead**, evidence this run only.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:18** level-up: took Slow Cooker from Spud Lob, Slow Cooker, Tot Toss.
- **0:18** gained without a pick (a chest or other): Slow Cooker 1/5 new.
- **0:24** level-up: took Afterburner Fries from Afterburner Fries, Stuffed Skin, Couch Potato.
- **0:24** gained without a pick (a chest or other): Afterburner Fries 1/8 new.
- **0:57** level-up: took Butter Socks from Thick Skin, Sour Cream, Butter Socks.
- **0:57** gained without a pick (a chest or other): Butter Socks 1/5 new.
- **1:27** level-up: took Tater Tot Pup from Spud Fence, Deep Fryer, Tater Tot Pup.
- **1:27** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **2:12** level-up: took Tater Tot Pup from Butter Socks, Tater Tot Pup, Fertilizer.
- **2:12** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. Until a chest or food is listed, explore to find chests. Do not charge Crop Patch, Beetle Nest, Boss Lair, or other charge spots before a chest is listed.
2. If a chest is listed and health is at least 40% and no boss is within 200 units, open it.
3. If health is under 70% and food is listed, eat the food.
4. If health is under 40% and food is listed, eat it. If health is under 40%, no food is listed, and no chest is listed, evade.
5. If a boss is within 200 units, evade and do not open a chest or charge a spot.
6. If game time is past 2:00, no chest is listed, and a listed elite is available, fight that elite to get a chest drop.
7. Do not walk into or finish charging a Boss Lair during explore.

What we know, most important first:
- Chests come from elites and bosses; explore alone may never list a chest by 3:00 on some seeds.
- On this mode the crowd hurts; bosses hit outside the one-second forecast.
- Weapons stay weak without chests; evolutions need chest picks.
- Food heals about 30 hp.
- Hot oil and Spore vent hurt if Tibo stands on them.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger? If a boss is within 200 units and this goal is to evade or keep clear of enemies, say yes. If a boss is within 200 units and this goal is to open a chest, fight an elite, charge a spot, collect gems, or explore, say no. If health is under 70% and this goal is to eat listed food, say yes unless opening a listed chest is clearly better now. If health is under 40% and this goal is to eat listed food, say yes. If no chest is listed and game time is past 2:00, say yes when this goal is to fight a listed elite; say no when this goal is explore or collect gems and a listed elite is available.
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}. Which option makes Tibo strongest? Prefer leveling weapons and passives Tibo already holds. Take evolutions and catalysts when the choice offers them and Tibo already owns the other part.
~~~

### action.state

~~~text
Tibo is a potato hero in a survivors game. Weapons fire on their own; Tibo only walks.
Goal: {{goal}}.
{{health}}
{{hurt_by}}
{{enemies}}
{{dash}}
{{standing_on}}
Hot oil, Spore vent, and Brambles underfoot burn or slow; step off that tile if the goal allows.
~~~

### action.hurt

~~~text
If Tibo does this: {{move}}. How badly does it hurt Tibo in the next second? Standing in hot oil or spore vents hurts even when the forecast looks free.
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
Should Tibo dash now because health fell 5 or more in the last 3 seconds, or because 5 or more enemies are within 60 units? Never dash while standing on a chest that is still charging.
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
