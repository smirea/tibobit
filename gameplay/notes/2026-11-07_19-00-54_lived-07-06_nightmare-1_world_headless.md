# 2026-11-07 19-00-54: lived 07:06 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=6qb0nndnmygxx&stats=A_zHAQCYQRfJCQCGggUOAL4UCgARcADa9w0ARLgAnMEFAB5pAJzuAgDTmwDyrQIANj0E3d4BAC23AfhJAJRfAIk5AAPWANcfAC3aAaMTAqMGBqQVAf3QAhjrA7reAr_eAVZnAQl6ReP3CdvuCeUhnLaMOo-nKE8BE5ID8wEfCgABAAAACQAAANUBAQACFwEHCgYIBAwCBJAB3gKsC4YY8h7WHqoZAwsJNEkFgQEuKg8-AwQTCp4lhgzgAtAD5wPNAZcC0AEUFQUVBQHzrFUAhoJNAW_1PAFxtzwAbfweBg8DABFwlwEARLg1AB5pzAEHAgAACQcDgfAbkgMACgLWGBEBAxICA9YWAQEgEgAQYCeccwXuMjEMjvZj0N86AA |
| Ending | died at 7:06, level 23, 8344 kills |
| Opening | first chest listed 2:04; 2 chests opened by 2:30; 3 elite fights and 1 elites killed by 3:00; first evolution 2:30; level 12 at 3:00 |
| Testing | E60 |
| Seed | 1AS5RU0 |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Bot code | c758e09 docs(gameplay): cursor reviews the 2026-11-07 18:45 run, lived 13:10, testing E54, E53 |
| Coach prompts | coach-plan.md d5907851; coach-retrospective.md 29ea3ff1 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_19-00-54_nightmare-1_world_headless.csv |

## Outcome

- Lived **7:06** (426.6s), level 23, 8344 kills.
- Damage taken by source: boss:sir-strawman 85, enemy:ice-imp 77, boss:late-blight 60, boss:amusing 60, enemy:snow-mold 30, enemy:blight-spore 20, boss:the-masher 18, enemy:lint-bunny 18; 368 in all. Health gained over the run, by food, regeneration and anything else: about 243 (the game does not say from what).
- Weapons: Gravy Pack 1/1, Thousand Fries 1/1, Tater Minigun 1/1, Seed Potato 1/8, Mash Wave 4/8, Tot Toss 1/8.
- Passives: Mash Finisher 1/5, Gravy Heart 2/5, Big Bowl 3/5, Masher Grip 2/5, Butter Socks 1/5, Salt Shaker 1/5.
- Items: none.
- Planner asked 149 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 114/120 | 6 | 0 | 5 | 29 | Spore vent, enemy:compost-maggot |
| 1:00 | 118/120 | 4 | 8 | 8 | 73 | enemy:frost-flea, enemy:aphid |
| 2:00 | 123/134 | 106 | 111 | 12 | 93 | boss:amusing, enemy:snow-mold |
| 3:00 | 134/134 | 0 | 9 | 14 | 170 | - |
| 4:00 | 149/149 | 21 | 33 | 20 | 157 | boss:the-masher, enemy:lint-bunny |
| 5:00 | 149/149 | 24 | 21 | 21 | 189 | enemy:lint-bunny, enemy:blight-spore |
| 6:00 | 149/149 | 70 | 61 | 23 | 143 | boss:late-blight, enemy:blight-spore |
| 7:00 | 8/149 | 144 | 0 | 23 | 189 | boss:sir-strawman, enemy:ice-imp |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:02; The Masher (the-masher) at 4:00; Late Blight (late-blight) at 6:03; Sir Strawman (sir-strawman) at 7:01.
- First chest listed: 2:04. First time under 25% health: 7:06.
- Goals by kind (done / gave up / dropped): explore 25/0/17; elite 7/0/2; chest 12/1/2; food 1/0/0; gems 6/0/4; evade 0/0/2; spot 1/0/1.
- Dashes: 32 (0:45, 1:08, 1:14, 1:35, 2:00, 2:06, 2:14, 2:19, 2:29, 2:29, 3:17, 3:49, …).
- Model calls: 127 plans, 22 picks, 241 moves (mean 180ms); the page walked through 14 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:30 Mash Finisher 1/5 new; 0:59 Fry Knives 1/8 new; 1:25 Locked Gatling 1/8 new; 1:47 Seed Potato 1/8 new; 2:04 Mash Wave 1/8 new; 2:20 Gravy Heart 1/5 new; 2:29 Tater Tot Pup 4/8 to 7/8; 2:30 Gravy Pack 1/1 new, Tater Tot Pup gone; 2:38 Big Bowl 1/5 new; 3:19 Masher Grip 1/5 new; 3:24 Tater Minigun 1/1 new, Locked Gatling gone; 4:01 Tot Toss 1/8 new; 4:01 Butter Socks 1/5 new; 4:53 Salt Shaker 1/5 new; 6:47 Thousand Fries 1/1 new, Fry Knives gone.

## Plan

This run serves the Nightmare 1 ladder on chest-starved layouts: elites drop chests when explore alone stalls past amusing. We keep the 16:08 champion stack (E44 opening in planner.state, E24 dash, exploreDistance 300, tater-pup) and drop the E54 planner.state elite line so the only new lever is E60—planner.goal must rate Fight the nearest listed elite above explore when no chest is in the goal list and game time is past 2:00. Until the first chest or Spud Whetstone appears Tibo still explores; under 70% with food listed, food still wins via the existing goal sentence. If E60 holds, the log shows an elite goal start between about 2:00 and 3:15 on seeds like 6BZ2E7 or 10FG7AE’s no-chest window, then a chest listing after the elite dies, with survival and evolution timing beating pure explore; if explore still wins every plan call, we confirm B2 and queue a stronger per-option elite wording or planner.pick is unrelated—next step is infrastructure or knob eliteSeconds, not more state text.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run isolated **E60**: only `planner.goal` tells the model to say yes to fight a listed elite and no to explore/gems when **no chest is listed** and time is **past 2:00**, on the 16:08-style stack without the E54 elite line in `planner.state`. The bot **did execute the test**: explore owned 0:00–1:59, then at **1:59** it started **Fight the Potato Beetle** (elite ~47–48% vs explore ~43% on the prior plan). **Amusing** spawned at **2:00**; the **first chest** appeared at **2:04**; **Gravy Pack** evolved at **2:30**. Tibo lived **7:06** (8344 kills), far past the 2:00–3:15 window. **E60 is confirmed** for this seed: per-option elite wording can break pure explore in the no-chest stall. Death at **7:06** was **Sir Strawman** and **ice-imp** while charging a chest near **7:02**—a boss-range / channel problem, not failure of the elite lever.

## Findings

- **E60 carried out (confirmed):** From 0:00 to 1:59 Tibo only explored (25 explore goals completed, 0 elite starts). At **119.4s** the first elite goal started (**Fight the Potato Beetle**); plan options had been rating elites **30–48%** while explore won until the gate. **Likely** on one seed; needs a second chest-starved seed (e.g. 6BZ2E7) for **likely → confirmed** on B2/B60.
- **Chest timing matched the campaign need (likely):** Stats: first chest listed **2:04**, two chests opened by **2:30**, first evolution **2:30** at level 12 by **3:00**. Minute **2:00** lost **106** (amusing + snow-mold) but gained **111**—painful but survivable with food at **2:25** (+60 hp). **Lead** until repeated on a seed that never lists from explore alone.
- **Elite-over-explore did not block post-chest play (confirmed):** After chests listed, goals were **12 chest** (7 done), **7 elite** (7 done), heavy **gems** mid-game—not stuck on elites. E60 gate is about the **pre-chest** window.
- **Mid-game power without second evolution until 6:47 (likely):** Ended with Gravy Pack, Thousand Fries, Tater Minigun; Mash Wave 4/8; no union. Gems goals dominated **3:10–4:43** and again later—planner scores gems **40–53%** when no urgent chest, which burns time bosses later punish.
- **7:00 death pattern (confirmed):** Minute **7:00** lost **144** hp (stats); outcome **sir-strawman 85**, **ice-imp 77** in last 3s on a chest channel (**0.8** charge). Same family as B54 (planner wants chest; model/steps cannot survive boss contact) but at **7:02** with **distrustBossRange 0**.

## Went well

- **1:59** elite pivot exactly where E60 targets the no-chest window.
- **2:04–2:30** chest cluster + **Gravy Pack** evolution; **2:25** food goal (+60) after amusing chaos.
- **6:29–6:47** Beetle Nest → mole elite → **Thousand Fries** evolution—elite loop still works late for drops.
- **E44 opening:** 0 spot goals charged early; food once when low during boss minute.

## Went poorly

- **2:00–2:20** fought amusing while chest was already listed (**2:04** open chest **88%** but dropped goals for snow mold fights)—hp fell to **76** before **2:25** food.
- **3:10–3:48** and **4:00–4:43** long **gems** chains at full hp while Colorado Queen / Masher windows added pressure—time not translated into chests or passives on recipe.
- **6:03–6:15** **Late Blight**: explore then short evade; **70** hp lost in minute **6:00** (stats); boss at **6:03**, evade dropped for explore at **6:10**.
- **7:02** started **Fight Ice Imp** with **Sir Strawman** **63 down 86%**; died **7:06** at **8/149** on chest charge—should have evaded or skipped chest until boss left range.

## Moments

- **0:00–1:58** explore-only stall with elites in options at ~30% but below explore—right setup for E60.
- **1:59** **Fight the Potato Beetle** starts—**right call** for E60; first break from pure explore.
- **2:00** amusing appears; minute loses **106**—expected tax; still full enough to continue.
- **2:04** chest listed; **Open the chest** wins plan but goal dropped for snow mold—**better:** hold chest goal through amusing contact.
- **2:25** **Eat the food** at **76** hp, +60 to **124/134**—**right call**.
- **2:30** **Gravy Pack** evolution—campaign milestone.
- **3:24** **Tater Minigun** from chest—second weapon spike.
- **4:12** brief **evade** with Masher **75 up 74%**—sensible.
- **6:47** **Thousand Fries** evolution—strong late spike.
- **7:02** **Charge Beetle Nest** dropped for **Fight Ice Imp** under Strawman—**should have evaded**, not chest/elite under boss.
- **7:06** death on chest channel with **sir-strawman 60.1** + **ice-imp 57.9**—forecast/trust gap at boss, not E60.

## Questions

- Does E60 on **6BZ2E7** (no chest by ~3:00 at explore 300) produce elite **2:00–3:15** and an earlier first listing than explore-only baselines?
- Can **planner.goal** score **gems** lower when a chest recipe is incomplete and game time **&lt; 10:00**?
- Does **distrustBossRange 400** (E51) cut **7:00**-style deaths without killing **2:04** amusing chest opens?

## Next

1. **E60 recheck** on **6BZ2E7** or **10FG7AE** with same templates—confirm elite start and **first chest time** vs 18-33-39 (never listed by 3:16). Moves ladder by validating the chest-starved fix across seeds.
2. **E51** `distrustBossRange` 400 on champion + E60 goal line—test whether model steps during **Sir Strawman** / amusing channels beat the **7:06** pattern; keeps evolution pace from this run.
3. **E62** or **E59** boss-window rule (no nest/chest within 200)**—6:29 nest under Late Blight and **7:02** chest under Strawman; separates planner wins from action/forecast losses.

## Beliefs changed

- **B60** added: E60 `planner.goal` elite-over-explore after 2:00 with no chest listed → elite goal before first chest on 1AS5RU0 (**lead**, **held**).
- **B2** evidence: E60 is a clean per-option success where E54 state-only failed on YLS7TB (**likely** stays, stronger evidence).
- **B49** evidence: 1AS5RU0 first chest **2:04** at explore 300 (**likely**).
- **B54** recheck: death was post-chest boss melee on channel, not amusing-window chest refusal (**likely** held).

## Process changes

None.

<!-- /review -->

## Picks

- **0:11** level-up: took Tater Tot Pup from Mezzaluna, Spud Dice, Tater Tot Pup.
- **0:11** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **0:29** level-up: took Mash Finisher from Clean Plate, Mash Finisher, Rotten Spud.
- **0:30** gained without a pick (a chest or other): Mash Finisher 1/5 new.
- **0:45** level-up: took Tater Tot Pup from Butter Socks, Tater Tot Pup, Chives.
- **0:46** gained without a pick (a chest or other): Tater Tot Pup 2/8 to 3/8.
- **0:58** level-up: took Fry Knives from Mash Finisher, Fry Knives, Tater Tot Pup, Skip (1).
- **0:59** gained without a pick (a chest or other): Fry Knives 1/8 new.
- **1:24** level-up: took Locked Gatling from Locked Gatling, Mash Finisher, Fry Knives, Skip (1).
- **1:25** gained without a pick (a chest or other): Locked Gatling 1/8 new.
- **1:47** level-up: took Seed Potato from Locked Gatling, Seed Potato, Harvest Moon, Skip (1).
- **1:47** gained without a pick (a chest or other): Seed Potato 1/8 new.
- **1:48** level-up: took Fry Knives from Mash Finisher, Fry Knives, Hash Rush, Skip (1).
- **1:48** gained without a pick (a chest or other): Fry Knives 1/8 to 2/8.
- **2:04** level-up: took Mash Wave from Mash Wave, Fry Knives, Gravy Splash, Reroll (1), Skip (1).
- **2:04** gained without a pick (a chest or other): Mash Wave 1/8 new.
- **2:05** gained without a pick (a chest or other): Tater Tot Pup 3/8 to 4/8.
- **2:20** level-up: took Gravy Heart from Potato Rain, Fry Knives, Gravy Heart, Reroll (3), Skip (1).
- **2:20** gained without a pick (a chest or other): Gravy Heart 1/5 new.
- **2:29** gained without a pick (a chest or other): Tater Tot Pup 4/8 to 7/8.
- **2:30** gained without a pick (a chest or other): Gravy Pack 1/1 new, Tater Tot Pup gone.
- **2:32** level-up: took Locked Gatling from Locked Gatling, Chives, Salt Shaker, Reroll (3), Skip (2).
- **2:32** gained without a pick (a chest or other): Locked Gatling 1/8 to 2/8.
- **2:35** gained without a pick (a chest or other): Locked Gatling 2/8 to 3/8.
- **2:38** level-up: took Big Bowl from Seed Potato, Fry Cook Sentry, Big Bowl, Reroll (4), Skip (2).
- **2:38** gained without a pick (a chest or other): Big Bowl 1/5 new.
- **3:08** gained without a pick (a chest or other): Locked Gatling 3/8 to 4/8.
- **3:10** gained without a pick (a chest or other): Locked Gatling 4/8 to 5/8.
- **3:19** level-up: took Masher Grip from Gravy Heart, Fry Knives, Masher Grip, Reroll (6), Skip (2).
- **3:19** gained without a pick (a chest or other): Masher Grip 1/5 new.
- **3:24** gained without a pick (a chest or other): Fry Knives 2/8 to 3/8, Tater Minigun 1/1 new, Locked Gatling gone.
- **3:48** level-up: took Masher Grip from Gravy Heart, Masher Grip, Big Bowl, Reroll (7), Skip (3).
- **3:48** gained without a pick (a chest or other): Masher Grip 1/5 to 2/5.
- **4:00** level-up: took Big Bowl from Seed Potato, Tot Stampede, Big Bowl, Reroll (9), Skip (3).
- **4:00** gained without a pick (a chest or other): Big Bowl 1/5 to 2/5.
- **4:00** level-up: took Tot Toss from Tot Toss, Hot Potato, Sour Cream, Reroll (9), Skip (3).
- **4:01** gained without a pick (a chest or other): Tot Toss 1/8 new.
- **4:01** level-up: took Butter Socks from Butter Pat, Seed Potato, Butter Socks, Reroll (9), Skip (3).
- **4:01** gained without a pick (a chest or other): Butter Socks 1/5 new.
- **4:15** level-up: took Gravy Heart from Seed Potato, Gravy Heart, Mash Finisher, Reroll (9), Skip (5).
- **4:16** gained without a pick (a chest or other): Gravy Heart 1/5 to 2/5.
- **4:18** gained without a pick (a chest or other): Fry Knives 3/8 to 4/8.
- **4:30** level-up: took Mash Wave from Tater Trot, Mash Wave, Salt Shaker, Reroll (9), Skip (5).
- **4:30** gained without a pick (a chest or other): Mash Wave 1/8 to 2/8.
- **4:53** level-up: took Salt Shaker from Seed Potato, Hash Rush, Salt Shaker, Reroll (9), Skip (5).
- **4:53** gained without a pick (a chest or other): Salt Shaker 1/5 new.
- **5:07** gained without a pick (a chest or other): Fry Knives 4/8 to 5/8.
- **5:09** gained without a pick (a chest or other): Fry Knives 5/8 to 6/8.
- **5:24** level-up: took Fry Knives from Butter Socks, Big Bowl, Fry Knives, Reroll (11), Skip (5).
- **5:24** gained without a pick (a chest or other): Fry Knives 6/8 to 7/8.
- **6:18** level-up: took Big Bowl from Mash Wave, Big Bowl, Mash Finisher, Reroll (12), Skip (5).
- **6:18** gained without a pick (a chest or other): Big Bowl 2/5 to 3/5.
- **6:34** gained without a pick (a chest or other): Fry Knives 7/8 to 8/8.
- **6:47** gained without a pick (a chest or other): Thousand Fries 1/1 new, Fry Knives gone.
- **6:52** gained without a pick (a chest or other): Mash Wave 2/8 to 3/8.
- **6:54** level-up: took Mash Wave from Salt Shaker, Tot Toss, Mash Wave, Reroll (13), Skip (5).
- **6:54** gained without a pick (a chest or other): Mash Wave 3/8 to 4/8.

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
If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger? If health is under 70% and this goal is to eat listed food, say yes unless a chest open is already listed and closer. If no chest is listed and game time is past 2:00, say yes when this goal is to fight a listed elite; say no when this goal is explore or collect gems and a listed elite is available.
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
  "eliteSeconds": 20
}
~~~
