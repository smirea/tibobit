# 2026-11-07 21-39-30: lived 02:46 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=1ccqz4dfjawp4&stats=A_RNAO4BCBYARCMAAAD9BwQAeJwByhYAA9YCphIAL8YBkwQCvAIBZBsEBnpF5SFDj4-nCduMOgERiAEPDwEAAQAAAAUAAAB0AAACBwECCgRysAEDBwY1GUUTAAEEBQRecBYKBRUFAMf4MQACvR8ARCMQAXG3DQBgCAkGAQAHAgAACQYDvy-IAQAKAs4IEQEDEgID1hYBASASABDRLn8axCEvxgyC9_fJKjUA |
| Ending | died at 2:46, level 8, 238 kills |
| Opening | first chest listed 2:45; 0 chests opened by 2:30; 2 elite fights and 0 elites killed by 3:00; first evolution none; level 8 at 3:00 |
| Testing | E123 |
| Seed | R7YOVY |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | ed56a41 docs(gameplay): cursor reviews the 2026-11-07 21:33 run, lived 4:11 |
| Coach prompts | coach-plan.md 71e16386; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_21-39-30_nightmare-1_world_headless.csv |

## Outcome

- Lived **2:46** (166.2s), level 8, 238 kills.
- Damage taken by source: enemy:potato-beetle 48.9, enemy:sand-crab 31.1, enemy:bowling-ball 16.2, boss:amusing 13.3, enemy:crumb-ant 8.9, enemy:sprout-mite 4.8, enemy:bowling-pin 3.3, enemy:aphid 3.1, enemy:swarm-fly 2.8, enemy:oil-drip 1.9, enemy:frost-flea 1.6; 136 in all. Health gained over the run, by food, regeneration and anything else: about 15 (the game does not say from what).
- Weapons: Tater Tot Pup 2/8, Frozen Fries 1/8, Harvest Moon 1/8.
- Passives: Four-Eyed Spud 4/5.
- Items: none.
- Planner asked 58 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 113/120 | 8 | 0 | 5 | 28 | enemy:bowling-pin, enemy:potato-beetle |
| 1:00 | 51/120 | 77 | 15 | 7 | 73 | enemy:potato-beetle, enemy:bowling-ball |
| 2:00 | 4/120 | 46 | 0 | 8 | 116 | enemy:sand-crab, enemy:potato-beetle |

- Bosses first seen: amusing (amusing) at 2:00.
- First chest listed: 2:45. First time under 25% health: 2:03.
- Goals by kind (done / gave up / dropped): explore 13/0/2; spot 5/0/0; gems 2/0/2; elite 0/0/2; evade 2/0/0.
- Dashes: 17 (0:31, 0:38, 0:39, 0:49, 1:15, 1:28, 1:36, 1:41, 1:46, 1:52, 1:57, 2:03, …).
- Model calls: 50 plans, 8 picks, 166 moves (mean 200ms); the page walked through 3 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:32 Frozen Fries 1/8 new; 0:39 Four-Eyed Spud 1/5 new; 2:22 Harvest Moon 1/8 new.

## Plan

This run tests E123 for the Nightmare 1 ladder: on seeds that list a chest early but never open it on the raw champion stack (NJRNZQ listed at 1:07, Open the chest won at 80% at 1:07, then a 5s replan dropped that goal for explore at 1:12 with chests still in the log). Templates are the 17:41 champion action text, dash rule, and knobs unchanged; planner.state keeps the champion directive but rule 1 now says explicitly to explore the map until a chest or food is listed (not the evade-only line that never selects evade). The only deliberate change is planner.goal: say yes to opening a listed chest, and say no to gems and explore while a chest is listed. Starting weapon stays tater-pup; picks stay the generic strongest question so any chest open is readable as goal wording, not E91 picks. If the hypothesis holds, the first plan after a chest appears should start Open the chest and replans should not swap to explore while two chests stay listed and health is high; we should see at least one chest goal done before 2:30 on a chest-friendly seed. If no chest lists before death, the run is inconclusive for opens but still logs whether any listed chest ever scored above explore on replans. Tibo should still chase 20:00 via opens and evolutions once chests channel; this run does not add boss evade lines or distrustBossRange after E106.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run was meant to test **E123** on Nightmare 1 world seed **R7YOVY**: champion action templates, unchanged knobs, state explore-until-chest-or-food, and **planner.goal** chest yes / gems and explore no while a chest is listed (E81 wording on the generic question). The bot lived **2:46**, level **8**, with **0 chests opened** and **first chest listed at 2:45**—seconds before death—so the NJRNZQ failure mode (chest at **1:07**, open goal dropped for explore at **1:12** on **planEvery 5**) **never occurred**. When explore finally listed a chest **59 up-right** at **2:45**, the next plan scored **Open the chest 73%** and started an open goal; Tibo died at **4/120** during approach with **boss:amusing** at **84%** and no pick on the chest. We now believe E81 goal sentences **do** elevate open-chest when a chest exists, but on this seed **chest policy is moot until ~2:45**; the run is **inconclusive for E123** and another **chest-starved** opener like **E107** / **10T7HER** class.

## Findings

- **E123 replan-drop hypothesis is inconclusive on R7YOVY**: no chest in the log until **2:45** (`explore down-left` done, detail "found a chest 59 away to the up-right"); **0** open-chest goals before death except the final **C65587** start at **2:45** with **0** charge time completed—**likely** (one seed, test not carried).
- **E81 chest yes fires when a chest finally lists**: at **2:45** plan options **Open the chest (59 up-right) 73%** vs explore **30%** and keep-away **11%** with hp **4/120**—**lead** (single plan row).
- **Minute-1 attrition dominates without chest power**: stats show **113→51** hp in minute **0–1** (lost **77**), outcome top sources **enemy:potato-beetle 48.9**, **enemy:sand-crab 31.1**; ended minute **2** at **4/120**—**likely** (stats + outcome).
- **Elite goals start but drop; no elite chests**: stats **0** elite kills, **2** elite fights **0** done; log **1:49** Fight Sand Crab dropped for explore, **2:00** fight elite dropped when amusing appeared—**lead** (log goals).
- **Early Beetle Nest channel without chest payoff**: **0:10–0:13** Beetle Nest charged and used; no chest from nest in window before death—**lead** (B50/B55 pattern, no drop).

## Went well

- **2:45** immediate **Open the chest 73%** once a chest existed—valid read on E81 goal lines (**2:45** plan).
- **0:36** curse shrine **Leave 91%**—avoided curse elites/bosses (**0:36** pick).
- **1:04** Spud Freezer channel completed at **~53%** goal vote (**0:57–1:04**)—directive freezer line still wins sometimes (B113 family).
- **Four-Eyed Spud** stacked to **4/5** via consistent picks through **1:55**—passive growth despite weak weapons.

## Went poorly

- **0:29–1:44** repeated **gems** goals (including drops at **1:44** at **99/120** sinking into pest stack)—should have been explore or spots until chest exists; no chest listed to trigger gems **no** (**29:29** gems 55%, **1:34** gems 58%).
- **1:44–1:45** gems dropped at **99→91** hp under **potato-beetle**/**bowling-ball** pressure, then **explore down** at **49%**—action useful chasing gems in crowds (**1:44** hp_lost **8**).
- **2:00** amusing at **51/120**; planner kept **Fight Potato Beetle** then dropped for explore/evade late—no E105 boss evade template on this stack (**2:00** boss plan, **2:05** evade 45%).
- **0 chests by 2:30** on a plan that hoped chest-friendly behavior before **2:30**—seed is chest-starved, not a template win (**Stats** opening line).

## Moments

- **0:10** level-up **Tater Tot Pup**; Beetle Nest goal wins **63%** at **0:10**. Right call for nest on full hp, wrong campaign priority without follow-up chest.
- **0:13** Beetle Nest **done**—no chest logged from nest. Better: elite fight if E60 policy targets drops on chest-starved seeds.
- **0:36** **Leave** curse shrine. Right call.
- **0:57** **Charge Spud Freezer 53%**. Right call.
- **1:00** health **51/120** after minute lost **77**. Better: evade or food if listed; none listed.
- **1:21** explore left **done** with **+7** hp (regen). Neutral.
- **1:26** second Beetle Nest charge inside nest during level-up. Risky; nest done **1:27**.
- **1:44** gems goal **dropped** at **99** hp under pests. Better: evade or explore, not gems without chest rule firing.
- **2:00** **amusing** appears; elite fight **dropped**. Better: keep-away if E105 lines were in this stack.
- **2:22** **Harvest Moon** new weapon at **11** hp—too late for power curve. Right pick given options.
- **2:45** explore finds chest; **Open 73%** starts. Right call; **4 hp** too late.
- **2:46** death **4/120** on open-chest moves with amusing **84%**. Better: evade at sub-25% with boss near; chest open impossible.

## Questions

- Does **R7YOVY** ever list a chest from an elite kill before **2:30** if E111 explore-no / elite-yes is added after **2:00**?
- On seeds that list chest only at **2:40+**, does **stuckSeconds 10** reduce open failures without helping chest-starved openers?
- Should exploit/champion runs **rotate off** chest-list-by-explore-only seeds when testing **E123** (need **NJRNZQ** replay)?

## Next

1. **Replay E123 on NJRNZQ** (or fixed daily seed with chest **~1:07**): only change is E81 **planner.goal** chest yes / gems+explore no; score whether open survives **5s** replans through **2:30**. Moves campaign by validating the actual NJRNZQ bugfix.
2. **E111 on R7YOVY-class seeds**: elite-over-evade after **2:00** when no chest, plus E105 boss evade; score first chest list/open before amusing. Addresses chest-starved ladder.
3. **E91 pick stack on chest-friendly seed** (15QD6RY class): separate opener power from E123; needed for evolution before minute-3 bosses.

## Beliefs changed

- **B125** (new): seed **R7YOVY** can leave **zero chests listed until an explore drop ~2:45**; E81 open scored **73%** at listing but death at **4 hp** prevented open—**lead**, **held**.
- **B49**: add **R7YOVY** to chest-late / chest-never evidence (**2:45** first list, **0** opens)—**likely**, **held**.
- **B123**: add that **E123 on R7YOVY did not exercise** the NJRNZQ replan-drop case—**likely**, **held** (recheck unchanged).

## Process changes

(none)

<!-- /review -->

## Picks

- **0:10** level-up: took Tater Tot Pup from Sprouting Eyes, Root Network, Tater Tot Pup.
- **0:10** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:32** level-up: took Frozen Fries from Frozen Fries, Tater Tot Pup, Masher Grip.
- **0:32** gained without a pick (a chest or other): Frozen Fries 1/8 new.
- **0:36** curseShrine: took Leave from Accept, Leave.
- **0:38** level-up: took Four-Eyed Spud from Couch Potato, Four-Eyed Spud, Fertilizer.
- **0:39** gained without a pick (a chest or other): Four-Eyed Spud 1/5 new.
- **0:56** level-up: took Four-Eyed Spud from Hot Streak, Whisk Vortex, Four-Eyed Spud.
- **0:56** gained without a pick (a chest or other): Four-Eyed Spud 1/5 to 2/5.
- **1:26** level-up: took Four-Eyed Spud from Potato Magnet, Frozen Fries, Four-Eyed Spud.
- **1:26** gained without a pick (a chest or other): Four-Eyed Spud 2/5 to 3/5.
- **1:55** level-up: took Four-Eyed Spud from Four-Eyed Spud, Tot Stampede, Frozen Fries.
- **1:55** gained without a pick (a chest or other): Four-Eyed Spud 3/5 to 4/5.
- **2:22** level-up: took Harvest Moon from Starch Chain, Harvest Moon, Hash Rush.
- **2:22** gained without a pick (a chest or other): Harvest Moon 1/8 new.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. Until a chest or food is listed, explore the map.
2. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
3. If health is under 70% and food is listed, eat the food.
4. A Spud Freezer that is close is also good: it freezes every enemy for 7.5 seconds.

What we know, most important first:
- On Nightmare world, a listed chest that never opens leaves Tibo weak; NJRNZQ listed at 1:07, dropped open-chest at 1:12 for explore, and died at 4:11 with no evolution.
- A yes or no on each goal option beats a chest rule that lives only in this paragraph.
- Weapons stay weak without chests. Open chests early to get stronger.
- Food heals about 30 hp. Eat it before health is very low.
- Hot oil and bosses hurt. Do not stand on hot oil while charging a chest or spot.
- A step that looks free can still cost hp when many enemies are close.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger?
If {{goal}} is to walk to a listed chest and open it, say yes.
If {{goal}} is to collect nearby gems and a chest is listed, say no.
If {{goal}} is to explore and a chest is listed, say no.
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
  "lockstep": 0
}
~~~
