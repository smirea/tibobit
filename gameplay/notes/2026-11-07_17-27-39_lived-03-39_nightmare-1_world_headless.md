# 2026-11-07 17-27-39: lived 03:39 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=q1rfwdngza4rd&stats=A4dnAOUKDLABAKOAAQMAwQoFABQNBuHJAQAD1gPQNQAjmQGBLQAfdQH8EgJ0AutHA7YuAQZ6RZy2CduMOihP4_cBEsEBRw0DAAEAAAAFAAAArQEAAAILAQMMAgjGAa4DvggDBwYMOjQwCikECQWMBsoCywE8CAUVBQD5TRoAo4AaAfhHGQDH-A8AevkOBgEABwIAAAkHA6LAAsEBAAoC1AwRAQMWAQEgEgAQYCeccwXuMjEMHZuKdO4RAA |
| Ending | died at 3:39, level 12, 1381 kills |
| Opening | first chest listed 2:20; 1 chests opened by 2:30; 0 elite fights and 0 elites killed by 3:00; first evolution none; level 11 at 3:00 |
| Testing | E30 |
| Seed | Y9N9T2 |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | dd52f1e docs(gameplay): infrastructure requests name the commit that answered them |
| Coach prompts | coach-plan.md 40bad860; coach-retrospective.md 3ec01e62 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_17-27-39_nightmare-1_world_headless.csv |

## Outcome

- Lived **3:39** (219.9s), level 12, 1381 kills.
- Damage taken by source: enemy:ketchup-drop 26, enemy:tomato-leech 26, boss:beetle-queen 25, enemy:potato-beetle 15, enemy:dumpster-raccoon 14, boss:amusing 12, enemy:cave-grub 12, enemy:sprout-mite 10; 140 in all. Health gained over the run, by food, regeneration and anything else: about 67 (the game does not say from what).
- Weapons: Tater Tot Pup 3/8, Chip Shuriken 6/8, Tot Stampede 1/8, Sprout Squad 1/8.
- Passives: Lean Lunch 3/5, GPU 1/5.
- Items: none.
- Planner asked 80 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Plan

This run tests E30 on nightmare open world: whether telling the action model not to dash while Tibo is standing on a chest that is still charging lets that channel finish and avoids the hp crash after the 3:24 dash on 17-03-58 (67 to 37 in a few seconds, chest abandoned at half charge). Planner templates, knobs, and the E24 dash triggers stay as the 17-09-06 run; only action.dash gains {{standing_on}} and an explicit no-while-charging rule. If the hypothesis holds, the log should show dashes still firing in crowds when not on a charging chest, and the next chest walk that hits the 5-enemies or 5-hp rule should stay on the tile until the chest opens instead of dashing off. Watch standing_on rows around chest goals, dash vs walk on those steps, and whether hp after an amusing telegraph on a chest stays closer to the 3:06 open (31 hp hit but chest still opened) than the 3:24 abandon. Seeds differ, so one clean open after a half-charged moment is a lead.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run tested **E30** on nightmare open world seed Y9N9T2: keep E24 dash triggers but add `{{standing_on}}` and **no dash while a chest is still charging**. The bot carried the test (same `action.dash` as in the notes; dashes still fire elsewhere). Tibo lived **3:39**, opened **three** free chests (2:27, 2:43, 2:45), then died at **47 hp** chasing a fourth chest into **Colorado Queen** and a dense crowd. E30’s channel-finish hypothesis gets a **partial lead**: the only logged **on-chest charge** (2:27, 0.8/1 s) finished with walks, not dashes; there is **no** log row of `dash` while `standing_on` says Tibo is on a charging chest. The 17-03-style **mid-charge abandon** did not recur. Early hp loss (2:00–2:18, amusing + oil + dashes on explore) and the **3:16–3:39** queen pile still dominated—not fixed by E30 alone.

## Findings

- **E30 channel rule — partial lead:** At **2:27** (`standing_on`: on a chest, 0.8 of 1 s), goal `C196779` **opened** at **58 hp**; preceding steps on that goal were **walk**, no dash on the charging tile (**likely** for “model obeys when on chest”; one clear charge completion).
- **E30 does not stop approach dashes — likely:** Chest approach still dashes, e.g. **2:23** dash up-right **79%** (goal open chest, **65 hp**), **2:40** dash left **79%** (`C131123`, **45 hp**). Channels after arrival still completed (**likely**, consistent with B29).
- **Three chest opens without evolution picks — confirmed:** Opens at **2:27** (Chip 3→4), **2:43** / **2:45** (Chip 4→5, 5→6); no recipe at max+catalyst—**confirmed** from loadout rows.
- **First listed chest ~2:20 — likely:** Explore-only until **2:20** `found a chest`; planner **Open the chest 77%** at **2:20**; fits **B25** (exploreDistance 300, seed Y9N9T2).
- **amusing damages on outcome this seed — lead:** **boss:amusing 12** in run total; fight **2:00–2:18** with telegraph underfoot, hp **105→84** (**likely** softens B20 “no outcome line”).
- **Colorado Queen + trash endgame — likely:** **boss:beetle-queen 25**, **enemy:tomato-leech 26**, **enemy:ketchup-drop 26**; death **3:39** at **5 hp** on chest goal `C65917`, **enemies_near 11–18** (**likely** on this seed).
- **Food heal under directive — likely:** **3:11** food goal **64→94** (+30); planner rated **Eat the food 54%** at **64 hp** (**likely**, B11-style).

## Went well

- **2:20–2:27:** Explore found chest; open goal held through amusing pressure; **charge completed** at **2:27** (**right call** on E30 for the channel window).
- **2:43–2:45:** Back-to-back chest opens at **73 hp** after low stretch—directive still prioritizing chests when listed.
- **0:00–2:20:** Directive did not force premature chest goals; explore kept **hp 118→81** with only chip buildup—reasonable pre-list phase.
- **Dash logging:** `dash asked: N%` / `dash not asked: no charge` on move rows makes E30 scorable without infra guesswork.

## Went poorly

- **2:02–2:18:** Dash **66%** down-right on explore-up during amusing; hp **103→84** before first chest—**should have** walked more / lower dash appetite while goal was still explore near boss telegraph.
- **2:20–2:27:** Chest approach from **81 hp** to **58 hp** before stand-on-tile—**should have** taken food or evade breather if queen trash was already high (food existed later at **3:11** only after spore vent chunk).
- **3:16–3:39:** At **58→47 hp** planner kept **explore** over food/chest charge options; death on chest walk with **dead hurt** ruled moves—**should have** evade under 40% or eat food **F65855**-style sooner after queen (**B27** not in directive).
- **2:25 level-up on chest goal:** Pick **Sprout Squad** at **63 hp** with chest **93 left**—planner still opened chest next; minor time pressure only.

## Moments

- **0:58** Hot oil underfoot on explore; hp **117→112**—forecast miss pattern (**should** weight oil in action.state).
- **1:31** Dash down **77%** on explore; goal dropped—crowd bait (**right call** to dash? debatable; cost little hp).
- **2:00** amusing appears; planner stays **explore up**—not E9 evade test (**should** consider evade-only experiment when boss listed).
- **2:02** Dash down-right **66%**; amusing telegraph; hp bleed starts (**better:** no dash, finish explore or switch goal).
- **2:20** First chest discovered; **Open the chest** wins—directive works (**right call**).
- **2:23** Dash **79%** on chest approach at **65 hp**—E29 pattern, not charging tile yet.
- **2:27** Stand on chest **0.8/1**, open complete **58 hp**—**E30 win moment** (**right call** on no-dash-while-charging).
- **2:28** Dash **92%** on gems at **49 hp** post-open—charge rule N/A (**right call**).
- **3:00** Colorado Queen **98%**; still explore until food at **3:11**.
- **3:11** Food **64→94**; then dash **83%** on food goal tail—heal then spend charge in crowd.
- **3:31** Chest goal **60%** at **47 hp**; never opened—death spiral (**should** have skipped distant chest or evaded).
- **3:39** Died **5 hp**; last moves all **dead hurt** ruled—crowd finish (**right call** on outcome, wrong macro plan).

## Questions

- Does **any** dash while `standing_on` contains “on a chest” and charge &lt; 1.0 appear on other seeds if we force mid-charge crowds (E30b)?
- Does **lowering dash triggers while goal is Open the chest** (not only on tile) reduce 2:20–2:27 approach bleed without abandons?
- Should **planner directive evade under 40%** fire before **explore** when **boss:beetle-queen** is listed and hp &lt; 50% (E25 retest)?

## Beliefs changed

- **B20:** lead → **likely** for “amusing often no outcome line”; this run **boss:amusing 12** on Y9N9T2.
- **B29:** evidence adds **2026-11-07_17-27-39** (dash **79%** on chest approach **2:23**, channel still done **2:27**).
- **B34 (new):** action.dash “no while charging chest” → **no dash** on logged charging steps this run (**lead**, **held**, experiment **E30**).

## Process changes

(none)

<!-- /review -->

## Picks

- **0:04** level-up: took Tater Tot Pup from Gem Sling, Tater Tot Pup, Packed Pan.
- **0:04** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:16** level-up: took Tater Tot Pup from Tater Tot Pup, Butter Socks, Sprout Satellites.
- **0:16** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **0:41** level-up: took Chip Shuriken from Thick Skin, Chip Shuriken, Fry Knives.
- **0:41** gained without a pick (a chest or other): Chip Shuriken 1/8 new.
- **0:41** level-up: took Chip Shuriken from Fertilizer, Slow Cooker, Chip Shuriken.
- **0:42** gained without a pick (a chest or other): Chip Shuriken 1/8 to 2/8.
- **0:58** level-up: took Chip Shuriken from Spud Dice, Deep Fryer, Chip Shuriken.
- **0:58** gained without a pick (a chest or other): Chip Shuriken 2/8 to 3/8.
- **1:38** level-up: took Lean Lunch from Lean Lunch, Spud Decoy, Afterburner Fries.
- **1:38** gained without a pick (a chest or other): Lean Lunch 1/5 new.
- **2:08** level-up: took Lean Lunch from Lean Lunch, Chip Shuriken, Tater Tot Pup, Skip (1).
- **2:08** gained without a pick (a chest or other): Lean Lunch 1/5 to 2/5.
- **2:09** level-up: took Tot Stampede from Tater Tot Pup, Hot Sauce, Tot Stampede, Skip (1).
- **2:09** gained without a pick (a chest or other): Tot Stampede 1/8 new.
- **2:25** level-up: took Sprout Squad from Masher Grip, Sprout Squad, Big Bowl, Reroll (1), Skip (1).
- **2:25** gained without a pick (a chest or other): Sprout Squad 1/8 new.
- **2:27** gained without a pick (a chest or other): Chip Shuriken 3/8 to 4/8.
- **2:41** level-up: took GPU from Hot Potato, Starch Chain, GPU, Reroll (2), Skip (1).
- **2:41** gained without a pick (a chest or other): GPU 1/5 new.
- **2:43** gained without a pick (a chest or other): Chip Shuriken 4/8 to 5/8.
- **2:45** gained without a pick (a chest or other): Chip Shuriken 5/8 to 6/8.
- **3:19** level-up: took Lean Lunch from Tot Stampede, Lean Lunch, Bacon Bits, Reroll (2), Skip (1).
- **3:19** gained without a pick (a chest or other): Lean Lunch 2/5 to 3/5.

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
Should Tibo dash now because health fell 5 or more in the last 3 seconds, or because 5 or more enemies are within 60 units? Say no if Tibo is standing on a chest that is still charging.
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
