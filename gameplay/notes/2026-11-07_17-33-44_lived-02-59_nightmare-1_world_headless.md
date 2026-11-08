# 2026-11-07 17-33-44: lived 02:59 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=k2t3jnt7k37s8&stats=A_lTAIQEC5sBAHr5AQIA7QgHAB_xB6VBANObA8kSANKuAf0MAJyHAfIIAC_GAagCAG7SAbABAlMBGOsBCXpFKE-Pp4w6USLlIZy2Cdvj9wERkwEYDAIAAQAAAAIAAAB0AAACBwECBAIQhAEDCgkVCxABKx4PCCIECQfsAkYXJgYJBgUVBQBWLRkA190WAGI2FAAwfhMAYAgOBgEABwIAAAkGA4dukwEACgL_CxEBAxYBASASABBgJ5xzBe4yMQwdm4p07hEA |
| Ending | died at 2:59, level 11, 516 kills |
| Opening | first chest listed 2:44; 0 chests opened by 2:30; first evolution none; level 11 at 3:00 |
| Testing | E37 |
| Seed | 2JETBL |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | 5ce752b docs(gameplay): cursor reviews the 2026-11-07 17:27 run, lived 3:39, testing E30 |
| Coach prompts | coach-plan.md 40bad860; coach-retrospective.md 3ec01e62 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_17-33-44_nightmare-1_world_headless.csv |

## Outcome

- Lived **2:59** (179.1s), level 11, 516 kills.
- Damage taken by source: enemy:blight-spore 25, enemy:compost-maggot 22, enemy:bog-toad 20, enemy:parking-gull 19, enemy:crumb-ant 14, enemy:dumpster-raccoon 13, boss:amusing 9, enemy:frost-flea 9; 131 in all. Health gained over the run, by food, regeneration and anything else: about 21 (the game does not say from what).
- Weapons: Fry Knives 3/8, Whisk Vortex 7/8, Hash Hawk 1/8, Julienne Dash 1/8, Harvest Moon 1/8, Comet Scythe 1/8.
- Passives: Big Bowl 1/5.
- Items: none.
- Planner asked 69 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Plan

This run tests E37 on nightmare open world with the same planner, knobs, and E30 charging-chest dash rule as 17-27-39; only action.dash adds a second no: when the goal is to open a chest, Tibo is not yet standing on that chest while it charges, and hurt_by shows 5+ hp in the last 3 seconds, say no so approach steps walk instead of dash (as at 2:23 at 79%). If the hypothesis holds, hp from first chest list to first open should drop versus 17-27 (81→58 on approach) while E30 behavior stays: no dash rows with standing_on on a partial charge, and channel still completes. Watch dash asked % on chest goals before standing_on shows charging, hp in 2:20–2:27, and whether amusing/queen windows still dominate without E25.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run executed **E37** on nightmare open world (seed **2JETBL**): same directive and knobs as **17-27-39**, with **E30** (no dash while `standing_on` shows a chest charging) plus a new **action.dash** line—say no on **open-chest** approach when health dropped **5+** in the last 3 seconds (`hurt_by`). Tibo explored until **2:44** (first chest discovered via explore), opened one chest at **2:58** (Whisk Vortex **3→7/8**), then died at **2:59** at **1 hp** on a second open goal with **hot oil** and **blight-spore** in `hurt_by`. Versus **17-27** on a different seed (**3:39**, first chest listed **2:20**, open at **2:27**), hp bleed on the first chest arc was **worse** here (**50→15**, ~35 hp) than the prior comparison (**~81→58**, ~23 hp). E37’s approach rule did not clearly dominate dash usage during the open window (**2:49** dash **74%** on chest charge **0.3–0.6s**; **2:54** dashes **89%** / **82%** at **47→35 hp**). Charging-channel steps near **2:56** mostly showed **dash not asked**, consistent with **E30**. Overall: test was played; survival did not improve; approach-dash hypothesis **not supported** on this sample.

## Findings

- **E37 executed in templates** — `action.dash` in the notes matches the plan (charging no + approach `hurt_by` no). **Likely** (one run, template present).
- **Hp from first chest goal to first completed open: ~35 hp lost** — goal **C65851** at **2:44** (`hp` **50**); chest `done` **2:58** (`hp` **15**); outcome total damage **131**. Versus **17-27-39** plan anchor **81→58** on approach. **Lead** (different seeds; not a controlled pair).
- **Approach dashes still fired on open-chest goal after recent damage** — **2:49** `dash down-left` **74%** with `standing_on` chest **0.3–0.6/1s** and `hurt_by` including **blight-spore 8**; **2:54** **89%** / **82%** dashes with **compost-maggot** / **parking-gull** in `hurt_by`. Conflicts with intended E37 behavior; model or trigger wording inadequate. **Likely**.
- **E30 charging no-dash held on late channel** — rows **2:56–2:57** on chest with `standing_on` **0.4–0.8/1s**: `dash not asked: no charge` or low dash %; open completed **2:58**. **Likely** (matches **17-27** pattern).
- **Death: crowd + hazard on partial second open** — `run_end` **2:59**: **blight-spore 5.6**, **bog-toad 19.6**, **dumpster-raccoon 8.8**; `standing_on` chest **0.2–0.3/1s**; **1 hp**. Boss **amusing** only **9** of **131** on this seed. **Confirmed** (outcome + last row).
- **First chest still late via explore** — no `Open the chest` until **2:44** (`explore up` `found a chest 214 away`); explore goals from **0:00**. **Likely** (supports **B25**, seed **2JETBL**).
- **Planner interrupted chest for level-ups** — picks at **2:46–2:57** while goals **C65851** / **C65886**; goals dropped/restarted. Channel still finished once. **Likely**.

## Went well

- **Directive + explore** until chest exists (**0:00–2:44**): consistent explore, no evade-only spiral (**1:00**, **1:19** Beetle Nest charges completed).
- **First chest evolution** (**2:58**): Whisk Vortex **7/8**, Big Bowl **1/5**, six weapon slots filled—stronger than **17-27** at death time.
- **E30 on-channel** (**2:56–2:58**): charging tile without high-probability dashes; channel completed at **15 hp**.
- **Amusing window survivable** (**2:00–2:18**): stayed **~105 hp** through explore with boss on screen (outcome **amusing 9** total).

## Went poorly

- **2:12–2:18** — explore through **amusing** + trash: **105→86 hp** (`enemy:compost-maggot`, **parking-gull**, **frost-flea`); should have favored shorter paths to listed Potato Crates / Spud Shrine **38** (`2:05` plan had shrine **40%** nearby).
- **2:13** — `dash right` **91%** on explore during boss (`hurt_by` **compost-maggot 3.4**); cost **100→92 hp** in burst.
- **2:48–2:54** — open-chest window: **69→47→30 hp** with **dash 74%** on charging chest and later dashes at **<50%** health; E37 intent was walk approach—template not respected.
- **2:55–2:59** — opened at **15 hp**, immediately leveled, chased second chest; died on tile with **hot oil** in `hurt_by` (**2:55** plan row). Planner should not reprioritize distant second chest at **<20%** without food goal (none taken).

## Moments

- **0:00** explore spiral starts; no chests in options. **Right call** for pre-1:30 default.
- **0:31** dash **93%** on explore at full hp. **Better:** save dash for post-**2:00** crowd.
- **1:00** Beetle Nest goal **P101** charged. **Right call** (spot test).
- **1:24** dropped Beetle Nest **P136** at **1.3/1.5s** for explore. **Better:** finish nest once committed.
- **2:00** boss **amusing**; planner still explore. **Right call** given no chest.
- **2:13** dash **91%**, **hp 100→92**. **Better:** walk under E37-style hurt gate.
- **2:44** explore finds chest; **Open the chest 60%**. **Right call**.
- **2:48** on chest **0.3s**; dash **74%** anyway. **Better:** enforce approach no (E37).
- **2:54** level-up burst + dash **89%** at **47 hp**. **Better:** stand/channel during picks if game allows.
- **2:58** chest `done`, Whisk **7/8**, **15 hp**. **Right call** to complete despite chaos.
- **2:59** **1 hp**, forecast `dead` on moves; partial second chest. **Better:** evade or gems, not second open at **15 hp**.

## Questions

- Does the approach **hurt_by ≥5** clause need to be mirrored in **action.state** (not only **action.dash**) so the model sees it on every dash ask?
- At **<25% hp**, does **planner.goal** rate **Open the chest** below explore even with directive—should directive add “do not start a new chest below 25%”?
- Can **level-up pauses** during channel explain **2:48** step-off and dashes—would **stuckSeconds** or planner “stay on chest” need a directive line?
- **2JETBL** vs **Y9N9T2**: is late first chest seed-fixed or path-dependent?

## Beliefs changed

- **B29** — confidence **likely** → **likely**; evidence adds **17-33-44** dashes **74%/89%/82%** on open-chest at low hp despite E37 wording.
- **B34** — **held** → **likely** (second run with clean channel at **2:56–2:58**).
- **B20** — evidence adds **17-33-44**: **amusing 9/131** on **2JETBL** (weaker than **17-27** queen+amusing chunk).
- **B32** — remains **lead**; this run refutes “long run” but confirms chest snowball starts (**Whisk 7/8** at **3:00**).
- New lead **B35** (proposed id below table): E37 approach dash gate alone does not stop chest-goal dashes after damage.

## Process changes

(none)

<!-- /review -->

## Picks

- **0:39** level-up: took Fry Knives from Fry Knives, Golden Fry, Big Bowl.
- **0:39** gained without a pick (a chest or other): Fry Knives 1/8 to 2/8.
- **1:43** level-up: took Whisk Vortex from Whisk Vortex, Gravy Heart, Mezzaluna.
- **1:44** gained without a pick (a chest or other): Whisk Vortex 1/8 new.
- **2:12** level-up: took Fry Knives from Starch Chain, Fry Knives, Mash Wave.
- **2:12** gained without a pick (a chest or other): Fry Knives 2/8 to 3/8.
- **2:28** level-up: took Hash Hawk from Hash Hawk, Spud Decoy, Fry Knives.
- **2:28** gained without a pick (a chest or other): Hash Hawk 1/8 new.
- **2:46** level-up: took Whisk Vortex from Whisk Vortex, Bacon Bits, Spud Sneakers.
- **2:47** gained without a pick (a chest or other): Whisk Vortex 1/8 to 2/8.
- **2:48** level-up: took Julienne Dash from Whisk Vortex, Fry Knives, Julienne Dash.
- **2:48** gained without a pick (a chest or other): Julienne Dash 1/8 new.
- **2:54** level-up: took Harvest Moon from Julienne Dash, Afterburner Fries, Harvest Moon.
- **2:54** gained without a pick (a chest or other): Harvest Moon 1/8 new.
- **2:55** level-up: took Big Bowl from Fry Knives, Hash Hawk, Big Bowl.
- **2:55** gained without a pick (a chest or other): Big Bowl 1/5 new.
- **2:55** level-up: took Whisk Vortex from Fry Knives, Whisk Vortex, Sprout Satellites.
- **2:56** gained without a pick (a chest or other): Whisk Vortex 2/8 to 3/8.
- **2:57** level-up: took Comet Scythe from Fry Knives, Sprout Squad, Comet Scythe, Reroll (1).
- **2:57** gained without a pick (a chest or other): Comet Scythe 1/8 new.
- **2:58** gained without a pick (a chest or other): Whisk Vortex 3/8 to 4/8.
- **2:58** gained without a pick (a chest or other): Whisk Vortex 4/8 to 7/8.

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

Before any chest is listed (often not until about 1:30), explore to find chests. Do not only evade.

What we know, most important first:
- On this mode the crowd hurts. Small enemies inside 60 units took Tibo from 120 to 1 hp in 3 minutes.
- Evading all the time did not work: the last run never opened a chest and died at 3:16.
- Weapons stay weak without chests. Open chests early to get stronger.
- A step that looks free can still cost 4 to 9 hp when many enemies are close.
- A base weapon at max level plus its catalyst evolves at the next chest.
- Food heals about 30 hp. Eat it before health is very low.
- Hot oil and bosses also hurt. Do not stand in hot oil.
- Dashing off a chest that is still charging can fail the open.

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
{{standing_on}}
Goal: {{goal}}
Say no if Tibo is standing on a chest that is still charging.
Say no if the goal is to open a chest, Tibo is not yet on that chest charging it, and health fell 5 or more in the last 3 seconds. Walk the approach; keep the dash for crowding on other goals.
Say yes if health fell 5 or more in the last 3 seconds and the nos above do not apply, or if 5 or more enemies are within 60 units and the nos above do not apply.
~~~

### knobs

~~~json
{
  "exploreDistance": 300,
  "evadeSeconds": 8,
  "gemsSeconds": 12,
  "stuckSeconds": 6,
  "extraDamage": 0.02,
  "safeMargin": 0.1
}
~~~
