# 2026-11-07 18-40-20: lived 03:38 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=shnmh241myrr5&stats=A6pmAIwDCI0BAXG3AAEA1AoFAC3aBYAhAC_GAbEcAAPWAf8WANS2AccCAlACE-ACPIUBCHpF5SEJ2-P3j6coT4w6nLYBEp0BIgsCAAEAAAADAAAAtgEAAAIKAQMGBgJc6AGmAgMJCD1GExMFDQ4SBAcFlQF8bwcFBRsFAXG3TwB76iQCB0hvdCBvaWwKAAK9CQH4RwUGAQAHAgAACQYDyFedAQAKApkOEQEDEgID1hYBASASABBgJ5xzBe4yMQyO9mPQ3zoA |
| Ending | died at 3:38, level 8, 396 kills |
| Opening | (no numbers: the log is damaged) |
| Testing | E41 |
| Seed | 1UNSC63 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | cd3dea6 docs(gameplay): cursor reviews the 2026-11-07 18:33 run, lived 3:16, testing E48, E49 (with uncommitted changes in scripts/) |
| Coach prompts | coach-plan.md d5907851; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_18-40-20_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:38** (218.3s), level 8, 396 kills.
- Damage taken by source: boss:amusing 79, enemy:fry-fly 36, Hot oil 10, enemy:sand-crab 9, boss:beetle-queen 5, enemy:frost-flea 4, enemy:snow-mold 3, enemy:aphid 3; 149 in all. Health gained over the run, by food, regeneration and anything else: about 26 (the game does not say from what).
- Weapons: Tater Tot Pup 1/8, Tot Toss 5/8, Harvest Moon 1/8, Peeler 1/8.
- Passives: Chives 2/5, Root Network 1/5.
- Items: none.
- Planner asked 63 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | undefined/undefined | 0 | 0 | undefined | undefined | - |

- Bosses first seen: none.
- First chest listed: never. First time under 25% health: never.
- Goals by kind (done / gave up / dropped): none.
- Dashes: 0.
- Model calls: 0 plans, 0 picks, 0 moves (mean 0ms); the page walked through 0 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): nothing logged.

## Plan

This run serves the Nightmare ladder by attacking a map failure that killed the last cursor run: on seed 6BZ2E7, exploreDistance 300 never listed a chest in 3+ minutes, so Tibo had no evolutions and died at 3:16. We rotate off spots (E48/E44) to map experiment E41: keep the 16:08 champion stack—E44 opening (explore only until a chest or Spud Whetstone is listed, chest and food under 70%, E24 dash templates, tater-pup)—and change only exploreDistance from 300 to 600, matching the E26 seed that first listed a chest at 1:08. If the hypothesis holds, the log shows a first chest row before ~1:30 while health is still high, chest opens by 2:30, and survival passes the 3:16 wall on seeds that starved at 300; if a chest still never appears, we learn 600 is not enough on some layouts and queue a second lever (E53 food goal or infrastructure). We drop E48 whetstone-first and E49 nest lines so this sample isolates the map knob.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

E41 tested whether `exploreDistance` 600 on a fresh Nightmare 1 world seed (1UNSC63) lists a chest before ~1:30 and clears the 6BZ2E7 starvation wall at 300. The bot ran the E44 opening stack and the knob change; explore dominated until ~2:37, then briefly charged a Beetle Nest and later a second nest attempt amid hot oil and fry-fly pressure. No chest appeared in goals before 3:15 (`explore down-left` done: "found a chest 55 away to the down-right"); the chest opened at **3:35** at **57 hp** with no evolution ready. Tibo lived **3:38** (+22s vs 6BZ2E7 at 300 with zero listings). **E41** refutes "first chest before 1:30 on a second seed at 600" but shows 600 can eventually surface a drop on at least one chest-starved layout; the campaign still dies early without evolution because listing and open come after amusing (~79 hp) and fry-fly (36 hp).

## Findings

- **E41 map knob (600 vs 300 on a non-6BZ2E7 seed):** First planner-visible chest at **3:15**, open **3:35**, zero opens by **2:30**, no evolution — **inconclusive** for the full hypothesis, **refuted** for "before ~1:30 at high hp" (one sample). Evidence: goal rows 3:15 `C65738`, 3:35 `C65747` opened; outcome 149 dmg, level 8.
- **600 vs 6BZ2E7 starvation:** On 1UNSC63 a chest was found and opened; on 18-33-39 at 300 no chest was ever listed by 3:16 — **likely** that 600 helps some seeds list before death, not all, and not early enough for evolutions on this seed (**lead**, n=1 contrast).
- **Directive leak — Beetle Nest:** Despite planner.state forbidding early charge spots, **2:37** `Charge the Beetle Nest` started at **106/120 hp** (plan row: nest **39%** vs explore **37%**); nest finished **2:43** with no chest open until 3:35 — **likely** mid-game nest options can beat explore without an explicit post-3:00 exception (**lead**).
- **Damage curve:** Outcome totals: `boss:amusing` **79**, `enemy:fry-fly` **36**, Hot oil **10**; Colorado Queen on field from **~3:01**; death **3:38** with amusing **38.8** in last 3s — **confirmed** amusing remains the main tax on short world runs without chest power (**likely**).
- **Chest goal dropped for level-up:** **3:19** pick `Peeler` while chest **91 up-left** (`C65738`); planner switched to `explore down-right` before open completed — **likely** `a card was just taken` re-plan deprioritizes in-progress chest vs explore (**lead**).
- **Late open value:** Chest reward Tot Toss **2/8→5/8** at **3:35** then evade death **3:38** at **4 hp** — **lead** that opens after 3:00 without evolution do not change survival on this seed (n=1).

## Went well

- **0:09–2:26:** E44-style explore chain (multiple 600-unit completes) kept spot goals rare until **2:37**; hp mostly **106–120** through **2:26**.
- **3:15:** Explore finally attached a chest goal (`Open the chest` **76%** at 65 hp) — correct priority once listed.
- **3:33–3:35:** Second chest listing at **28 down**, channel completed, Tot Toss jump — planner did open when hp was still **57**.
- **E24 dash template:** Dashes fired on crowded/evade steps (e.g. **3:01** dash left **62%**, **3:35** dash down **67%** on low hp), consistent with B28.

## Went poorly

- **2:37–2:49:** Beetle Nest goal + hot oil/fry-fly while amusing up-right — hp **120→88** by **2:49**; should have stayed on explore/evade per opening directive.
- **2:09–2:26:** Repeated explore with amusing **~100%** nearby — **7–29 hp** spikes on move rows **2:16–2:18**; should have evaded or broken line earlier when boss damage appears in `hurt_by`.
- **3:19:** Level-up pick interrupted chest approach at **59 hp** with queen + amusing present — should keep chest goal until open or explicit sub-40% rule.
- **3:19–3:33:** Abandoned first chest (**91+ up-left**) for explore while bosses up — wasted the only early power spike window.
- **3:35–3:38:** Evade after open with **two bosses** and no dash charge — died to amusing + trash with weapons still pre-evolution.

## Moments

- **2:09** Explore up-left done, 600u, nothing new — right call to keep mapping.
- **2:16** Amusing chip **7 hp** on explore up-right; better: evade or angle away once `boss:amusing` in `hurt_by`.
- **2:37** Beetle Nest goal at full hp — better: explore or gems; violates opening directive.
- **2:43** Nest charged; no chest open — better: never start nest pre-first-chest.
- **2:47–2:48** Hot oil + fry-fly nest approach **120→99** — better: abort nest goal.
- **3:01** Colorado Queen appears; evade **57%** — right call at **85 hp**, but 8s cost **18 hp**.
- **3:15** Explore finds chest 55 away — right call; late but decisive listing.
- **3:19** Pick Peeler, drop chest goal — should not re-plan to explore over `Open the chest`.
- **3:33** Second chest listed **28 down** — right call to open at **60 hp**.
- **3:35** Chest opens Tot Toss **5/8** — right call; too late for evolution.
- **3:35** Dash down into amusing burst **57→37 hp** — better: no dash toward boss telegraph at low hp.
- **3:38** Stand still forecasts "dead" on all moves — run ends; better: distrust/evade before sub-20% with no charge.

## Questions

- Can **fight elite** goals surface chest listings faster than explore 600 on seeds like 6BZ2E7 when no drop is in scan range?
- Does **planner.goal** text (not state) need a hard "never Beetle Nest until a chest has opened" rule to stop **2:37**-style votes?
- After **pick**, should chest-in-progress be pinned in planner.state so re-plan does not drop `C65738` for explore?
- Does **1UNSC63** need **>600** explore or elite hunting to list before **2:00**, or is drop timing boss/elite-gated only?

## Next

1. **E53** (movement/planner.goal food weighting) on a seed with early food listing — not exercised here; keep for hp recovery on explore-heavy seeds.
2. **E52** (planner.goal whetstone) — still irrelevant until chest/whetstone listings exist before 3:00; pair with map work first.
3. **E54 (proposed):** On E44 + E24 + explore 600, add planner.state line to **fight nearest elite** when no chest listed and `time>2:00`, testing whether chest drops beat pure explore on 6BZ2E7-class seeds.

## Beliefs changed

- **B25:** evidence adds 1UNSC63 — no listing before 1:30 at 600; **recheck** unchanged.
- **B39:** evidence adds counterexample 1UNSC63 first find **3:15** not <1:30; confidence stays **lead**, **held**.
- **B49:** evidence — 600 on 1UNSC63 eventually listed; starvation at 300 not universal at 600; **lead**, **held**, refined.
- **B50 (new):** planner can start Beetle Nest above 70% hp before any chest open when nest option ~high-30s% — **lead**, **held**.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:09** level-up: took Chives from Peeler, Chives, Tot Stampede.
- **0:09** gained without a pick (a chest or other): Chives 1/5 new.
- **0:44** level-up: took Tot Toss from Tot Toss, Tater Tot Pup, Tailgate Fries.
- **0:44** gained without a pick (a chest or other): Tot Toss 1/8 new.
- **1:07** level-up: took Tot Toss from Salt Shaker, Tot Toss, Chives.
- **1:07** gained without a pick (a chest or other): Tot Toss 1/8 to 2/8.
- **1:27** level-up: took Chives from Spry Sprout, Chives, Clean Plate.
- **1:27** gained without a pick (a chest or other): Chives 1/5 to 2/5.
- **1:55** level-up: took Harvest Moon from Potato Rain, Harvest Moon, Big Bowl, Reroll (1).
- **1:56** gained without a pick (a chest or other): Harvest Moon 1/8 new.
- **2:44** level-up: took Root Network from Steam Vent, Sprout Satellites, Root Network, Reroll (1).
- **2:44** gained without a pick (a chest or other): Root Network 1/5 new.
- **3:19** level-up: took Peeler from Root Network, Lean Lunch, Peeler, Reroll (3).
- **3:19** gained without a pick (a chest or other): Peeler 1/8 new.
- **3:35** gained without a pick (a chest or other): Tot Toss 2/8 to 5/8.

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
- Some seeds never list a chest at exploreDistance 300 by 3:00; longer explore walks find dropped chests sooner.
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
  "exploreDistance": 600,
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
