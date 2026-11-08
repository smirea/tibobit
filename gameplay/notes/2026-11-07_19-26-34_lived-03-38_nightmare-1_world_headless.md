# 2026-11-07 19-26-34: lived 03:38 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=84z3dt42fq8kc&stats=A59mAt4IDIoBAHvqAQEAuAoIAPUBBcFQAA3vAtE4AKLwAc8eAAPWAfMUAJxqAd8UAoYLAT4wyAQACsABqgQCogAB2nEBB3pFCdvj95y2KE-Pp0OPWgERegAHAwABAAAABQEAALQBAAACCwEDCgQIpgH8AsAGAwgHLR8NKhkYJgQLCOsCkQJ0a1VUFA4FFQUARCMUAL5iEgB76hAB-EcLAHoRCgYGAQI-MK4BBwIAAAkGA9rvAXoACgKzDREBAxICA9YWAQEgEgAQYCeccwXuMjEMjvZj0N86AA |
| Ending | died at 3:38, level 12, 1118 kills |
| Opening | first chest listed 2:34; 0 chests opened by 2:30; first evolution none; level 11 at 3:00 |
| Testing | E66 |
| Seed | MRDVER |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | e4764da docs(gameplay): cursor reviews the 2026-11-07 19:10 run, lived 14:03, testing E51 |
| Coach prompts | coach-plan.md 99ee6853; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-26-34_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:38** (218.1s), level 12, 1118 kills.
- Damage taken by source: enemy:bowling-ball 19.9, enemy:bog-slime 17.7, enemy:fry-fly 16.2, boss:beetle-queen 10.9, enemy:garden-slug 10.4, enemy:ketchup-drop 10, enemy:crumb-ant 6.9, enemy:oil-drip 6.1, enemy:sprout-mite 5.7, enemy:sand-crab 4.8, Spore vent 4.3, enemy:aphid 3.4, enemy:potato-beetle 3, Hot oil 2.8; 122 in all. Health gained over the run, by food, regeneration and anything else: about 0 (the game does not say from what).
- Weapons: Tater Tot Pup 1/8, Tailgate Fries 1/8, Hash Boomerang 5/8, Potato Battery 1/8, Mash Snowball 2/8, Mezzaluna 1/8.
- Passives: Sour Cream 1/5, Potato Magnet 1/5.
- Items: none.
- Planner asked 74 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 108/120 | 12 | 0 | 5 | 29 | Spore vent, enemy:fry-fly |
| 1:00 | 68/120 | 41 | 0 | 7 | 72 | enemy:bog-slime, enemy:ketchup-drop |
| 2:00 | 32/120 | 36 | 0 | 11 | 110 | enemy:bowling-ball, enemy:garden-slug |
| 3:00 | 1/120 | 32 | 0 | 12 | 173 | enemy:fry-fly, boss:beetle-queen |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00.
- First chest listed: 2:34. First time under 25% health: 3:04.
- Goals by kind (done / gave up / dropped): explore 14/0/9; evade 8/0/2; elite 1/0/3; chest 1/0/2.
- Dashes: 8 (1:14, 2:34, 2:57, 3:06, 3:18, 3:25, 3:25, 3:34).
- Model calls: 63 plans, 11 picks, 280 moves (mean 189ms); the page walked through 20 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:10 Tailgate Fries 1/8 new; 0:22 Hash Boomerang 1/8 new; 0:59 Potato Battery 1/8 new; 1:53 Mash Snowball 1/8 new; 2:38 Sour Cream 1/5 new; 2:44 Potato Magnet 1/5 new; 3:25 Mezzaluna 1/8 new.

## Plan

This run serves the Nightmare 1 ladder by holding the 14:03 champion stack—E44 opening rules in planner.state, E24 dash, E60 elite-over-explore in planner.goal, exploreDistance 300, tater-pup, and distrustBossRange 400—and changing only planner.goal to test E66. E59 showed a boss-within-200 line in planner.state wins the appearance plan then explore beats keep-away while the boss is still inside 200; the 14:03 run died charging Spud Freezer with Ketchup Kraken at 155 down. If the hypothesis holds, every plan while a boss is within 200 rates evade or keep-away above explore, chest, elite, gems, and charge spots, so Tibo does not start freezer or nest channels in double-boss windows and still opens chests when no boss is that close. Until a chest or Spud Whetstone is listed, the directive still says explore to find chests; evade is not the default opening. Inconclusive if no boss comes within 200; a zero count of boss-window evade wins only matters when the log shows a boss inside 200 for multiple plan cycles.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

E66 changed only `planner.goal`: while a boss is within 200, evade/keep-away should score above explore, chest, elite, gems, and charge spots. The stack matched the 14:03 champion except for that goal template (`distrustBossRange` 400, E44 directive, E60 elite line, exploreDistance 300, tater-pup). Tibo lived **3:38** (218s), level 12, on seed **MRDVER**—shorter than the E59 XEPS03 control (3:45) and far from ladder progress. The boss-window part of the hypothesis **did run**: amusing appeared at **2:00** and Colorado Queen at **3:00**; planner plans in those windows show keep-away at **84–92%** while explore stayed in the teens or twenties, unlike E59’s fade where explore beat keep-away at 2:24+ with amusing still inside 200. **Confirmed (one seed):** E66’s goal wording stops the explore takeover during boss proximity. **Inconclusive:** no chest was **listed** while a live boss was within 200 (first chest list **2:34**; amusing at **0%** by **2:34**; the only open came from the **2:43** elite at **42 hp**). The run mainly teaches that fixing boss-window goals does not fix **pre-chest explore bleed** (health **108→32** by 2:00, **0** chests opened by 2:30, **0** evolutions).

## Findings

- **E66 anti-fade worked on this sample (likely).** With amusing inside ~200 from **2:00–2:32** and the queen from **3:00–3:19+**, plan rows show `Keep away from enemies` at **86%** (2:00, reason boss appeared), **84%** (2:05), **92%** (2:13), **69%** (2:29); queen cycle **92%** (3:00), **90%** (3:05), **92%** (3:11, 3:14). No plan in those windows had explore above keep-away while `bosses` listed distance under 200—contrast E59 at 2:24 explore **36%** vs keep-away **27%** (amusing **91** away).
- **Chest-during-boss rule untested (inconclusive).** Stats: first chest listed **2:34**; goals chest **1 done / 2 gave up**. Log at **2:34**: amusing **137 down-right 0%**; chest options appear only after elite kill **2:43** (`Open the chest` **86%** at **2:43**). Zero contested “open chest vs evade with boss <200.”
- **Opening damage dominated, not boss policy (confirmed for this seed).** Minute table: **0:00** end **108/120** (−12); **1:00** **68/120** (−41, bog-slime/ketchup); **2:00** **32/120** (−36, bowling-ball/garden-slug); **3:00** **1/120** (−32, fry-fly/beetle-queen). Outcome pests: bowling-ball **19.9**, bog-slime **17.7**, fry-fly **16.2**; queen line **10.9**—minute 3 collapse matches queen-minute evade at **1 hp**, not E66 failure.
- **Elite-at-2:00+ fired once (lead).** E60 line in `planner.goal`: after **2:36** pick, goal `Fight the Garden Slug` started; elite done **2:43** at **42/120**, chest opened **2:44** (Hash **5/8**). Goals elite **1/3** gave up—mostly explore era never listing elites as winning goal before **2:00**.
- **Compare E59 on different seed:** E66 run is **not** a controlled replay of XEPS03; shorter life is consistent with **MRDVER** never listing a chest until **2:34** and **~0** healing vs XEPS03’s **~30** heal at 1:44.

## Went well

- **2:00** boss-appearance plan: keep-away **86%**, evade goal started immediately; distrustBossRange forced model steps (`forecast was not trusted: the amusing boss is 184 away` at 2:00).
- **3:00** queen appearance: keep-away **92%** with queen **175** away; evade through **3:04** at **27/120** before bleed.
- **2:43–2:44** elite→chest chain at **42 hp**: only evolution-adjacent power spike (Hash **5/8**, Sour Cream **2:38**).
- **E24 dashes** at clutch: **2:34** dash **68%** during amusing telegraph; **2:57** and **3:06** dashes under bowling-ball pressure; **8** total dashes per stats.

## Went poorly

- **0:00–2:00 explore without chest income:** **14** explore completes, **0** chest finds; health **120→32** before amusing—directive explore-until-listed worked but seed gave no early drop.
- **1:00–2:00** minute lost **41 hp** (stats: bog-slime, ketchup, fry-fly wave)—weak six weapons, no chest by **2:30**.
- **2:58–3:00** evade at **32→24 hp** lost **10** on bowling-ball during evade timer (**2:58** goal end note); entered queen at **1/120** (**3:04** first under 25%).
- **2:50–3:06** chest goals **dropped** (unopened chests **87** and **256** away in plans) for more evade—could not capitalize on post-elite chests at dying hp.
- **3:19+** planner switched to `Fight the Bowling Ball` at **24 hp** with queen **287** away—evade dropped; death **3:38** fry-fly **10.5** last 3s, **122** total damage, **~0** healed.

## Moments

- **0:00** explore left **75%**—opening per E44; Spore vent minute 0 hurt. **Right call** for directive, costly seed.
- **1:04** plan lists elite fights **34–37%** but explore **76%** wins—E60 not triggered before **2:00**. **Better:** same as E60 1:59 pivot only after clock, not here.
- **2:00** amusing **184 down**; keep-away **86%**. **Right call**—E66 test engaged.
- **2:16** evade cycle lost **2 hp** in 8s with amusing **83** away. **Right call** to stay evade; hp already **66/120**.
- **2:34** amusing **0%**; dash **68%** on evade. **Right call** mechanically; amusing effectively gone.
- **2:36** level-up during evade; elite goal **78–83%** vs open chest **45%**. **Right call** for E60 post-2:00 no-chest window.
- **2:43** elite killed at **42 hp** on chest charge. **Right call**—first and only chest open.
- **2:50** chest open goal dropped for evade **75%** at **42 hp**. **Better:** open second chest if boss dead and hp low.
- **3:00** queen plan keep-away **92%** at **175** away, **32/120**. **Right call**.
- **3:06** evade at **27 hp** lost **5** in 8s (beetle-queen in hurt_by). **Right call** on goal type; **too late** on hp budget.
- **3:19** fight Bowling Ball **48%** vs keep-away **39%** at **24 hp**. **Questionable**—low hp evade might beat chasing elite.
- **3:38** died evading with queen **160** away, fry-fly finish. **Outcome:** movement didn’t kill; **1 hp** entering minute 3 did.

## Questions

- Does **planner.goal** boss-200 rule hold on **XEPS03** replay (same seed as E59 fade)? → proposed experiment.
- Can **E60 + E66** open an elite chest before **2:00** on chest-starved seeds without explore bleed? → spots/map.
- Why **MRDVER** lists first chest **2:34** vs champion seeds **~1:45–2:04**? → map belief.
- At **<25% hp**, should `planner.goal` forbid **fight elite** over open chest? → movement.

## Next

1. **Replay XEPS03 with E66 stack** (only `planner.goal` E66 vs E59 log)—tests fade fix on the seed that showed explore winning at 2:24; moves campaign by validating boss-window policy before more seeds.
2. **E65 recipe directive on a chest-friendly seed** (e.g. 1AS5RU0 or 12NR1J6 class)—evolution before queen minute; campaign needs power, not more evade-only runs on starved seeds.
3. **E67 pest control** once hp **>40%** at queen: same boss templates, measure garden-slug/tomato-leech/sand-crab vs XEPS03 **97** hp minute-3—campaign blocker after goal policy fixed.

## Beliefs changed

- **B59** (recheck): E59 state-only boss line still fades; **E66 `planner.goal` lines on MRDVER prevented explore beating keep-away while boss <200** (evidence: plan odds 2:00–2:29, 3:00–3:14).
- **B71** (new, lead): `planner.goal` explicit boss-within-200 yes/no on evade beats explore in-plan while boss listed under 200 (MRDVER E66 run only).

## Process changes

(none)

<!-- /review -->

## Picks

- **0:10** level-up: took Tailgate Fries from Tater Tot Pup, Chives, Tailgate Fries.
- **0:10** gained without a pick (a chest or other): Tailgate Fries 1/8 new.
- **0:22** level-up: took Hash Boomerang from Mash Finisher, Tater Tot Pup, Hash Boomerang.
- **0:22** gained without a pick (a chest or other): Hash Boomerang 1/8 new.
- **0:43** level-up: took Hash Boomerang from Lean Lunch, Salt Shaker, Hash Boomerang.
- **0:43** gained without a pick (a chest or other): Hash Boomerang 1/8 to 2/8.
- **0:58** level-up: took Potato Battery from Tater Tot Pup, Potato Battery, Tailgate Fries.
- **0:59** gained without a pick (a chest or other): Potato Battery 1/8 new.
- **1:19** level-up: took Hash Boomerang from Tater Mines, Hash Boomerang, Starch Plating.
- **1:19** gained without a pick (a chest or other): Hash Boomerang 2/8 to 3/8.
- **1:52** level-up: took Mash Snowball from Clean Plate, Tater Trot, Mash Snowball.
- **1:53** gained without a pick (a chest or other): Mash Snowball 1/8 new.
- **2:36** level-up: took Hash Boomerang from Hash Boomerang, Bacon Bits, Mash Snowball.
- **2:36** gained without a pick (a chest or other): Hash Boomerang 3/8 to 4/8.
- **2:38** level-up: took Sour Cream from Clean Plate, Lean Lunch, Sour Cream, Skip (1).
- **2:38** gained without a pick (a chest or other): Sour Cream 1/5 new.
- **2:41** level-up: took Mash Snowball from Clean Plate, Tater Tot Pup, Mash Snowball, Skip (1).
- **2:41** gained without a pick (a chest or other): Mash Snowball 1/8 to 2/8.
- **2:44** gained without a pick (a chest or other): Hash Boomerang 4/8 to 5/8.
- **2:44** level-up: took Potato Magnet from Potato Battery, Potato Magnet, Tater Tot Pup, Skip (1).
- **2:44** gained without a pick (a chest or other): Potato Magnet 1/5 new.
- **3:25** level-up: took Mezzaluna from Butter Pat, Potato Magnet, Mezzaluna, Reroll (1), Skip (1).
- **3:25** gained without a pick (a chest or other): Mezzaluna 1/8 new.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}} ({{mode}}).

DIRECTIVE, follow it first:
1. Until a chest or Spud Whetstone is listed, explore to find chests. Do not start charging a Crop Patch, shrine, Beetle Nest, Boss Lair, or any other charge spot.
2. If a chest is listed, go and open it. A chest gives a free pick and evolves a ready recipe.
3. If health is under 70% and food is listed, eat the food before exploring or evading.
4. Under 40% health do not start a Spud Whetstone; prefer a listed chest, then food under 70%, then evade.
5. Evade only when no chest, food, or whetstone applies.
6. A close Spud Freezer is also good: it freezes every enemy for 7.5 seconds.

Before any chest is listed (often not until about 1:30), explore. Do not only evade.

What we know, most important first:
- On this mode the crowd hurts. Small enemies inside 60 units took Tibo from 120 to 1 hp in 3 minutes.
- Some seeds never list a chest from explore alone by 3:00; killing an elite can drop a chest.
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
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger? If a boss is within 200 units and this goal is to evade or keep clear of enemies, say yes. If a boss is within 200 units and this goal is to open a chest, fight an elite, charge a spot, collect gems, or explore, say no. If health is under 70% and this goal is to eat listed food, say yes unless a chest open is already listed and closer. If no chest is listed and game time is past 2:00, say yes when this goal is to fight a listed elite; say no when this goal is explore or collect gems and a listed elite is available.
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
  "distrustBossRange": 400,
  "planEvery": 5,
  "eliteSeconds": 20
}
~~~
