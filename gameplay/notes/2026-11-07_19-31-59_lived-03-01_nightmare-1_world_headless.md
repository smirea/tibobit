# 2026-11-07 19-31-59: lived 03:01 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=9f6vwd3cwnh6p&stats=A41VANQBBwUBcbcAAAD7CAIAA9YCzxUAnIcCxwsBfzYDCHpFCdvj94-n7gmctgMWjDoBEogBDQkAAAEAAAADAAAAhgEAAAIKAQMIBAJqtAGKAQMJCA8eDRcJFyobBAQCkwFBBRsFAXG3QQBiNhgAbC0HAGAIBwIHSG90IG9pbAUGAQAHAgAACQYDliGIAQAKAu4LEQEDEgID1hYBASASABBgJ5xzBe4yMQyO9mPQ3zoA |
| Ending | died at 3:01, level 7, 212 kills |
| Opening | first chest listed never; 0 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 7 at 3:00 |
| Testing | E70 |
| Seed | 1XI0A94 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 7928c36 docs(gameplay): cursor reviews the 2026-11-07 19:26 run, lived 3:38, testing E66 |
| Coach prompts | coach-plan.md c05498af; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-31-59_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:01** (181.6s), level 7, 212 kills.
- Damage taken by source: boss:amusing 65.4, enemy:bog-toad 24.4, enemy:aphid 7.2, enemy:crumb-ant 6.8, Hot oil 4.9, enemy:cave-grub 4.9, enemy:bog-slime 4.8, enemy:little-grey 4.6, enemy:lint-bunny 4.2, enemy:ketchup-drop 4.2, enemy:compost-maggot 2.8, enemy:sprout-mite 1.6; 136 in all. Health gained over the run, by food, regeneration and anything else: about 13 (the game does not say from what).
- Weapons: Tater Tot Pup 2/8, Julienne Dash 2/8.
- Passives: Hot Sauce 3/5.
- Items: none.
- Planner asked 61 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 115/120 | 4 | 0 | 4 | 28 | enemy:lint-bunny, enemy:aphid |
| 1:00 | 108/120 | 21 | 13 | 6 | 73 | enemy:little-grey, enemy:aphid |
| 2:00 | 65/120 | 44 | 0 | 7 | 116 | boss:amusing, enemy:cave-grub |
| 3:00 | 4/120 | 62 | 0 | 7 | 134 | boss:amusing, enemy:bog-toad |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00.
- First chest listed: never. First time under 25% health: 3:00.
- Goals by kind (done / gave up / dropped): explore 19/0/4; evade 6/0/1; spot 0/0/1.
- Dashes: 9 (1:09, 1:35, 1:45, 1:50, 2:10, 2:22, 2:27, 2:36, 2:59).
- Model calls: 55 plans, 6 picks, 190 moves (mean 205ms); the page walked through 15 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:14 Hot Sauce 1/5 new; 0:21 Julienne Dash 1/8 new.

## Plan

This run serves Nightmare 1 by keeping the 14:03 champion stack that just lived 14:03—E44 opening in planner.state, E24 dash, E60 fight-elite-over-explore in planner.goal, E66 boss-within-200 yes/no lines in planner.goal, exploreDistance 300, tater-pup, distrustBossRange 400—and changing only the build pick rule from E65 in planner.state and planner.pick. We test E70: on a goal policy that already lists chests and levels weapons (E60 elite pivot after 2:00 when no chest is listed), Tibo should reach 5/8 on a held weapon, take Gravy Heart (or another named catalyst) when it is offered, and evolve Gravy Pack on the next chest before the queen window. Until a chest or Spud Whetstone is listed, the default goal is explore to find chests—not evade. If the hypothesis holds, a pick at or after 5/8 chooses the catalyst passive over a new weapon, and a chest before ~3:30 shows an evolution in the log. Inconclusive if no weapon reaches 5/8, no catalyst is offered on a choice, or no chest is listed; do not score minute-3 hp against XEPS03’s 97.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested **E70**: E65-style recipe picks on top of the E66 boss-goal stack and E60 elite-over-explore, asking whether a weapon reaches 5/8, Tibo takes Gravy Heart (or another named catalyst), and the next chest evolves before the queen window. On seed **1XI0A94** the bot followed the opening directive (**19 explore** goals, **0 elite** starts, **0 chests** ever listed). Tater Tot Pup peaked at **2/8**; **Gravy Heart never appeared** on any of **6 picks**. The hypothesis is **inconclusive** by the plan’s own rules—not refuted. Tibo died at **3:01** with **boss:amusing 65.4** of **136** damage after the amusing minute collapsed health from **108→65** between **2:00** and **3:00**. The run mainly confirms that **chest-starved seeds** block both E60’s elite pivot (explore still wins until **2:00**, then boss evade owns the clock) and any catalyst/evolution test.

## Findings

- **E70 inconclusive (lead):** No weapon reached **5/8** (max Tater Tot Pup **2/8** at death); no pick offered Fertilizer, Gravy Heart, Big Bowl, or GPU; **first chest listed: never** (notes opening, stats). Pick rule was never exercised.
- **Chest-starved seed matches B49 (likely):** Same shape as E66’s late-first-list seeds but harsher—**0 chests** by **3:01** vs E66 first list **2:34** on MRDVER. Explore cannot surface a drop without elite/boss kills on this layout.
- **E60 elite line not executed here (lead):** From **1:00** onward plans showed **Fight the Spittlebug ~25–47%** vs **Explore ~60–81%**; no `fight` goal rows. Past **2:00** the amusing appearance plan (**keep-away 88%** at **2:00**) replaced the elite test. One sample; does not refute E60 on 1AS5RU0.
- **E66 planner.goal boss hold (likely):** With boss within **200**, keep-away stayed **82–92%** on replans (**2:05**, **2:13**, **2:16**, **2:42**); explore options **7–15%** while amusing was up. Aligns with E66 anti-fade on this seed through death.
- **Amusing minute is lethal without evolution (confirmed on this build):** Stats minute **2:00–3:00**: **65→4** effective trajectory (**44 lost** in minute 2, **62** in minute 3). Single-step **-20 hp** at **2:09** (`hp_lost` on evade step, `boss:amusing 23.3`). **65.4** amusing on outcome—dominant source.
- **Second weapon dilutes E70 path (lead):** Julienne Dash taken **0:21** and leveled **0:40**; six picks spent on Hot Sauce (**3/5**) and dash weapon, not pup levels toward **5/8**.
- **~13 hp heal without food goal (likely):** **1:33** row **107→120** (`hp_gained 13`) during explore; matches B31/B37 pattern, not scored against E70.

## Went well

- **0:00–2:00** explore-first directive: continuous explore goals, no premature shrine/chest charges in opening plans.
- **2:00** boss appearance: evade wins **88%** over explore **9–13%** (plan at amusing **175 left**).
- **E24 dashes** fired at meaningful swings (**1:09**, **1:35**, **1:45**, **2:10**, **2:22**, **2:27**, **2:36**, **2:59**) with `distrustBossRange` forcing model steps through amusing window.
- **1:33** passive sustain **+13 hp** bought time before amusing.

## Went poorly

- **0–3:00** no chest listing: entire build/evolution ladder absent; **212 kills** without a drop to open.
- **2:08–2:16** evade under amusing: **106→80** then **80→70** with repeated **boss:amusing** and hot oil (**2:07** `Hot oil 2.7`); **8s evade** goals lost **23 hp** in one cycle (**2:16** goal end).
- **2:21** replan during evade picked **Charge Root Tunnel 68%**, dropping evade while amusing **121 away** and partially charging **Beetle Nest**—off-directive spot work during boss minute.
- **2:35** level-up took **Hot Sauce** again (**98%**) at **70 hp** with amusing still active—not catalyst, not pup levels.
- **3:00** Colorado Queen listed with **4 hp**; final seconds **boss:amusing 35.5** + **bog-toad 24.4**—no evolution, no freezer/chest recovery.

## Moments

- **0:14** Hot Sauce over weapons—reasonable support pick; no recipe yet.
- **0:21** Julienne Dash second weapon—Better: max Tater Tot Pup toward 5/8 before adding weapons.
- **1:33** explore heals **+13**—right call for sustain.
- **2:00** amusing appears; evade **88%**—right call per E66.
- **2:09** **-20 hp** on evade step, amusing **33 away**—Better: stronger dash/off-axis exit template (forecast distrusted but hurt still landed).
- **2:04** evade walks onto **Moldy Shrine** **0.4/1.5** charge—Better: planner.goal no charge spots while boss within 200.
- **2:16** evade cycle ends **-23 hp**—amusing chip damage during “clear” evade.
- **2:21** Root Tunnel goal **68%** during boss—Better: keep evade until amusing >200 or hp >70%.
- **2:35** Hot Sauce 3/5 at **70 hp** under boss pressure—Better: only if Gravy Heart absent and pup still <5/8, prioritize pup level cards.
- **2:36** dash left at **53%** under amusing—right call.
- **3:00** queen + amusing at **4 hp**—inevitable death without chest power spike.

## Questions

- Will **E70** pick logic fire on **1AS5RU0** (chest **2:04**, evolution **2:30**) with the same templates?
- On **chest-never** seeds, does forcing **fight elite** after **2:00** (not just planner.goal noul) list a chest before **3:30**?
- Does **banning second weapons** until pup **5/8** speed catalyst offers on level-ups?

## Next

1. **E75 (proposed):** Replay E70 pick text on **1AS5RU0** / E60 policy so a chest and **5/8** are reachable—only valid E70 confirmation path.
2. **E63/E54:** Chest-starved seed elite mandate in **planner.state** after **2:00** when `chests` empty—campaign needs drops, not more explore.
3. **E71:** After a confirmed E70 evolve, retest **distrustBossRange 400** on mid-game survival (1AS5RU0 baseline **7:06**).

## Beliefs changed

- **B49:** evidence extended with **1XI0A94** (E70): no chest by **3:01**, **19 explores**, died **3:01**.
- **B67:** evidence extended—second run with E65/E70 pick wording, **no 5/8**, no named catalysts offered.
- **B72 (new):** chest-never early deaths block recipe/evolution tests regardless of pick template.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:14** level-up: took Hot Sauce from Spud Dice, Chip Shuriken, Hot Sauce.
- **0:14** gained without a pick (a chest or other): Hot Sauce 1/5 new.
- **0:21** level-up: took Julienne Dash from Julienne Dash, Broadside, Fry Lance.
- **0:21** gained without a pick (a chest or other): Julienne Dash 1/8 new.
- **0:40** level-up: took Julienne Dash from Mash Finisher, Mash Snowball, Julienne Dash.
- **0:40** gained without a pick (a chest or other): Julienne Dash 1/8 to 2/8.
- **1:14** level-up: took Tater Tot Pup from Butter Pat, Tater Tot Pup, Mezzaluna.
- **1:14** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **1:35** level-up: took Hot Sauce from Hot Sauce, Frozen Fries, Chives.
- **1:35** gained without a pick (a chest or other): Hot Sauce 1/5 to 2/5.
- **2:35** level-up: took Hot Sauce from Hot Sauce, Skipping Cannonball, Spry Sprout.
- **2:36** gained without a pick (a chest or other): Hot Sauce 2/5 to 3/5.

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

At level-up, chest, or shrine: take the card that finishes a held recipe. Gravy Heart finishes Tater Tot Pup and Peeler. Fertilizer finishes Seed Potato and Seeker Sprouts. Big Bowl finishes Whisk Vortex. GPU finishes Chip Shuriken. If a held weapon is at 5/8 or higher and its catalyst passive is on the choice, take that passive, not a new weapon. Do not fill a sixth weapon slot until one recipe is ready for the next chest.

Before any chest is listed (often not until about 1:30), explore. Do not only evade.

What we know, most important first:
- On this mode the crowd hurts. Small enemies inside 60 units took Tibo from 120 to 1 hp in 3 minutes.
- Some seeds never list a chest from explore alone by 3:00; killing a listed elite after 2:00 can drop a chest.
- Weapons stay weak without chests. Open chests early to get stronger.
- Tater Tot Pup at max level plus Gravy Heart evolves at the next chest to Gravy Pack.
- A step that looks free can still cost 4 to 9 hp when many enemies are close.
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
Tibo is at a {{choice}}. Which option makes Tibo strongest? If a held weapon is at 5/8 or higher and Gravy Heart, Fertilizer, Big Bowl, or GPU is offered and it finishes that weapon's recipe, take that passive, not a new weapon. Do not add a sixth weapon while a recipe is one catalyst away. Otherwise prefer leveling weapons and passives Tibo already holds.
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
