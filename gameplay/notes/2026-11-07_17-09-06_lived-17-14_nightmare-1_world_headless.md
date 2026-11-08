# 2026-11-07 17-09-06: lived 17:14 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=pjvxq2meww266&stats=A43lAwLz-AM_ok8AhoIKJACKLgsAJOsAs5bxBQCptwDE8NoFAD-ZAPb5rgQAH_EIz9jDAQAttwid_zQASmYA0u4ZAET_ALGwAgAZYgCV2QEAPEIA4LgBAMvnAOB-AoVWBjecBXU_BetHBTh_BVsyBfugBQl6ReUhnLYJ24-nKE9RIow64_fLAgEThgSEAxEaAAEBAAAXAQAF0gYEAAI3AREICgIGDAgGBgYECgIOCgIICqoBygOmCfAPhhXKHPIixCiyKeQxzkLSTdpW1Gu0fLqAAZSBAQMPCYgBgAHeAZEBbwcPU7wBBBgLrccBqY4BmF-CJdAJqQXKBIsBlwe6AkIFHgUAhoJ0AWiiWAB9n0sAr9ghAgpTcG9yZSB2ZW50HAYTBAAk680BAD-ZogEASmZyAKm3SgcHAQUBAgUFBQkIA82zlRKGBAAKAvRBEQEDFgEBIBIAEGAnnHMF7jIxDB2binTuEQA |
| Ending | died at 17:14, level 63, 64627 kills |
| Opening | first chest listed 1:46; 3 chests opened by 2:30; first evolution 3:25; level 10 at 3:00 |
| Testing | E24 |
| Seed | 1SXG9XB |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | cursor composer-2.5 |
| Coach prompts | coach-plan.md 40bad860; coach-retrospective.md 3ec01e62 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_17-09-06_nightmare-1_world_headless.csv |

## Outcome

- Lived **17:14** (1034.9s), level 63, 64627 kills.
- Damage taken by source: enemy:ice-imp 116, boss:grater-golem 88, enemy:grease-fiend 75, enemy:mole 33, Spore vent 28, enemy:sprout-mite 18, enemy:potato-beetle 17, enemy:field-crow 17; 392 in all. Health gained over the run, by food, regeneration and anything else: about 384 (the game does not say from what).
- Weapons: Fry Fortress 1/1, Rösti Storm 1/1, Hash Bulwark 1/1, Russet Ricochet 1/1, Whisk Vortex 8/8, Seed Potato 8/8.
- Passives: Butter Pat 5/5, Slow Cooker 5/5, Lean Lunch 5/5, Starch Plating 5/5, Aged Russet 5/5, Sprouting Eyes 5/5.
- Items: none.
- Planner asked 379 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Plan

This run tests E24 on nightmare open world: does a looser dash question, with recent damage and crowd size in action.state, fire the dash charge during chest trips and cut hp lost from 1:00 to 2:30? Planner.state, goal, pick, action.hurt, action.useful, and all knobs stay as the 16-51-16 E21 run so only dash behavior changes. If the hypothesis holds, the log should show several dashes per minute (not one dash at 2:13 like E21), and hp from 1:32 to 1:46 should fall less than the ~53 hp lost to Bog Toad and contact on that run. Watch dash count, hurt_by bog-toad rows, and whether dashes happen while walking to chests. E29 will read whether those dashes help or push Tibo into worse contact.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This run executed E24 as planned: E21-era planner templates and knobs, with only the looser `action.dash` (health dropped ≥5 in the last 3 seconds or ≥5 enemies within 60) and `hurt_by` / `enemies` added to `action.state`. Tibo lived **17:14** on nightmare-1 open world (seed 1SXG9XB), level 63, with **64627** kills — a different regime than the 2:19 and 3:38 world runs on other seeds. In the test window **1:00–2:30**, hp went **107→86** (food at 2:28), with **three** logged dashes (1:04, 1:12, 1:47) versus E21’s single dash at 2:13; the charge was spent **18** times over the full run. Late damage was **boss:grater-golem** (88) and heavy trash (**ice-imp** 116, **grease-fiend** 75), not amusing topping the sheet. We now believe E24’s dash wording reliably spends the charge when asked, and that this directive-plus-dash stack can snowball into a long exploit run once chests and evolutions start — but this run does not isolate dash as the only reason survival reached 17 minutes.

## Findings

- **E24 dash fires often when the action model is asked** — 18 move rows with `dashed` in the full log (e.g. 0:42 57%, 0:53 59%, 1:04 59%, 1:12 53%, 1:47 51%, 7:06 60% near Sir Strawman), plus many more `dash asked` below 50%. **Likely** (two E24 seeds now; infra logs probabilities).
- **1:00–2:30 hp loss is far below E21’s Bog Toad corridor** — hp **107** at 1:00, **105–98** through 1:20 contact, **86** after food at 2:28; E21 lost ~53 hp from 1:32–1:46 with one dash at 2:13. Same directive family, **different seed** (no `enemy:bog-toad` on outcome). **Lead** that E24 helps early crowds; **inconclusive** as sole cause of 17:14.
- **Planner directive + chests dominated once listings appeared** — first explore-only to **0:51** (Tater Lantern), first **chest open** chain **1:46–1:51** (hp ~80), then steady chest goals; **Fry Fortress** at 3:25, **Rösti Storm** 6:07, **Hash Bulwark** 8:01, **Russet Ricochet** 9:15, six passives at 5/5 by ~13:06. Matches exploit, not just a dash A/B.
- **amusing at 2:00 did not own the damage list on this seed** — amusing on screen from 2:00; hp dip to **56** at 2:00 then food to **86** at 2:28; outcome has **no boss:amusing line** while **boss:grater-golem** 88 and **ice-imp** 116 lead. Contradicts “amusing always tops” on long world runs (B20 partial). **Likely** seed-dependent.
- **Death was Compost Titan contact at 17:13–17:14** — hp **23**, last `hurt_by` **boss:compost-titan 6.1**; dash asked 64% but surrounded by `dead` forecasts. Same class as daily titan issue (B12) at low hp. **Lead** on open world.
- **~384 hp gained vs 392 lost** — outcome notes health gained ≈384; many food goals (2:28, 7:33, 13:02, 16:20, etc.) plus passive sustain; not the daily-only mystery heal pattern alone (B10/B31). **Lead** that late world runs are heal-neutral if food is taken.

## Went well

- **0:42–1:12** — early dashes into lantern/chest pressure without catastrophic hp bleed (dashes 0:42, 0:53, 1:04, 1:12).
- **1:46–3:25** — chest directive plus openings despite amusing at 2:00; evolved **Fry Fortress** with passives stacking.
- **2:28** — planner chose **food** at **93** hp (F65792), restoring to **86**; food rule works when food is listed.
- **6:07–10:32** — chest chains while walking evolved **Rösti Storm**, **Whisk Vortex** 8/8, **Slow Cooker** 5/5 from chest loot.
- **7:06** — dash **60%** away from Sir Strawman crow contact then chest burst (hp 100→87, opened chests at 7:08–7:12).

## Went poorly

- **0:00–0:51** — pure explore; directive could not act until spots/chests listed (**1:46** first chest in vote). Cost ~8 minutes of test time on power curve.
- **2:00–2:02** — amusing spawn: hp **67→56** with no evade switch; kept explore/chest plans. Acceptable on this seed but risky on amusing-heavy seeds.
- **3:16–3:21** — chest **C131439** at low hp: zig-zag moves, goal dropped 3:21; lost **64→23** hp in contact before eventual opens.
- **16:18–16:20** — **Grater Golem** chunked hp **32→87** then ate food; **88** boss damage in outcome — standing near grater in telegraph.
- **17:12–17:14** — **Compost Titan** at **23** hp; `dead` forecasts on all moves; death despite dash ask **64%**.

## Moments

- **0:42** dash **57%** while routing to Tater Lantern — early proof E24 spends charge. Better: right call.
- **0:55** first level-up **Rösti Disc** after lantern charge — economy starts. Right call.
- **1:20** `dash asked: 50%` with **10 enemies_near**, walked — charge retained; model conservative. Better: lower threshold or clearer “dash to escape” wording.
- **1:46** planner finally rates chest after explore found crate; opens **1:51**. Better: lower exploreDistance or earlier spot detour.
- **2:00** amusing **100%** while exploring — hp **67**. Better: brief evade or chest-only lock while boss listed.
- **2:28** food goal at **93** hp → **86**. Right call.
- **3:25** **Fry Fortress** evolution — run shifts from test to snowball. Right call.
- **6:04** dash **60%** during Late Blight chest trip — boss contact controlled enough to open. Right call.
- **7:06** dash **60%** with field-crow **16.9** hurt_by — opened three chests at **7:08–7:12** at **87** hp. Right call.
- **16:18** chest open under Grater: **83** hp lost in seconds. Better: abandon chest when `boss:grater-golem` in hurt_by.
- **17:14** died at **23** hp in compost titan pile. Better: evade goal when boss named and hp under 40%.

## Questions

- Does E24’s dash wording still help on **Bog Toad seeds** (1Q4CI77) if we replay E24 there?
- Should **action.dash** say no while `standing_on` chest is charging (E30), and did 1:47 dash help or hurt that channel?
- What drives **~384** passive heal over 17 minutes — Lean Lunch, Slow Cooker, regen, or unlogged sources?
- Can **Skip** picks after 13:00 be planned (planner picks Skip on purpose) without breaking evolution timing?

## Beliefs changed

- **B24** — confidence **lead → likely**; evidence adds 17:18 dashes, 18-09-06 17:14 run.
- **B28** — add run 17:18-06 to evidence (many spends, includes chest-window dash 1:47).
- **B10** — add 17:18-06 (~384 gained, food-heavy); still **lead** on unexplained jumps.
- **B20** — **amusing** clause **recheck** strengthened; long run 17:18-06 has no amusing outcome line but other bosses/trash dominate.
- **B15** — add 17:18-06 (ice-imp 116, grease-fiend 75, grater 88); keep **likely** for trash-heavy world, refine claim away from “no boss line” only.
- **B32** (new) — **lead**: directive + E24 dash + chest snowball can reach 15:00+ on nightmare world without further code (17:18-06).
- **B33** (new) — **lead**: on long world runs **ice-imp** can top listed damage (116/392 on 17:18-06).

## Process changes

(none)

<!-- /review -->

## Picks

- **0:36** level-up: took Fry Cook Sentry from Fry Cook Sentry, Root Network, Spud Cannon.
- **0:36** gained without a pick (a chest or other): Fry Cook Sentry 1/8 to 2/8.
- **0:36** level-up: took Fry Cook Sentry from Salt Shaker, Chip Shuriken, Fry Cook Sentry.
- **0:36** gained without a pick (a chest or other): Fry Cook Sentry 2/8 to 3/8.
- **0:55** level-up: took Rösti Disc from Rösti Disc, Gravy Splash, Gem Sling.
- **0:55** gained without a pick (a chest or other): Rösti Disc 1/8 new.
- **1:32** level-up: took Rösti Disc from Golden Fry, Small Fry, Rösti Disc.
- **1:32** gained without a pick (a chest or other): Rösti Disc 1/8 to 2/8.
- **1:34** level-up: took Hash Brown Shield from Big Bowl, Fertilizer, Hash Brown Shield.
- **1:34** gained without a pick (a chest or other): Hash Brown Shield 1/8 new.
- **1:36** level-up: took Butter Pat from Potato Rain, Gravy Boat, Butter Pat.
- **1:36** gained without a pick (a chest or other): Butter Pat 1/5 new.
- **1:42** level-up: took Slow Cooker from Thick Skin, Slow Cooker, Butter Pat.
- **1:42** gained without a pick (a chest or other): Slow Cooker 1/5 new.
- **1:51** gained without a pick (a chest or other): Fry Cook Sentry 3/8 to 4/8.
- **1:54** gained without a pick (a chest or other): Fry Cook Sentry 4/8 to 5/8.
- **1:58** level-up: took Fry Cook Sentry from Tater Tot Pup, Tater Mines, Fry Cook Sentry, Reroll (1).
- **1:58** gained without a pick (a chest or other): Fry Cook Sentry 5/8 to 6/8.
- **2:15** gained without a pick (a chest or other): Fry Cook Sentry 6/8 to 7/8.
- **2:30** level-up: took Butter Pat from Butter Pat, Mash Golem, Fry Lance, Reroll (1).
- **2:30** gained without a pick (a chest or other): Butter Pat 1/5 to 2/5.
- **3:16** level-up: took Lean Lunch from Lean Lunch, Grab Bag, Potato Magnet, Reroll (1), Skip (1).
- **3:16** gained without a pick (a chest or other): Lean Lunch 1/5 new.
- **3:23** gained without a pick (a chest or other): Fry Cook Sentry 7/8 to 8/8.
- **3:25** gained without a pick (a chest or other): Fry Fortress 1/1 new, Fry Cook Sentry gone.
- **3:31** level-up: took Hash Brown Shield from Rösti Disc, Hash Brown Shield, Sprouting Eyes, Reroll (2), Skip (1).
- **3:31** gained without a pick (a chest or other): Hash Brown Shield 1/8 to 2/8.
- **3:34** gained without a pick (a chest or other): Rösti Disc 2/8 to 3/8.
- **3:52** level-up: took Butter Pat from Hash Brown Shield, Butter Pat, Masher Grip, Reroll (2), Skip (1).
- **3:52** gained without a pick (a chest or other): Butter Pat 2/5 to 3/5.
- **4:00** level-up: took Lean Lunch from Fry Lance, Lean Lunch, Rösti Disc, Reroll (2), Skip (1).
- **4:01** gained without a pick (a chest or other): Lean Lunch 1/5 to 2/5.
- **4:01** level-up: took Butter Pat from Rotten Spud, Butter Pat, Hash Brown Shield, Reroll (2), Skip (1).
- **4:01** gained without a pick (a chest or other): Butter Pat 3/5 to 4/5.
- **4:03** level-up: took Hash Brown Shield from Hash Brown Shield, Big Bowl, Fertilizer, Reroll (2), Skip (1).
- **4:03** gained without a pick (a chest or other): Hash Brown Shield 2/8 to 3/8.
- **4:05** shrine: took XP gain +58% → +74% from Cooldown 0% → -5%, Area 0% → +10%, XP gain +58% → +74%.
- **4:07** gained without a pick (a chest or other): Rösti Disc 3/8 to 4/8.
- **4:15** level-up: took Starch Plating from Hot Potato, Root Spikes, Starch Plating, Reroll (2), Skip (2).
- **4:15** gained without a pick (a chest or other): Starch Plating 1/5 new.
- **4:27** level-up: took Butter Pat from Butter Pat, Hash Brown Shield, Starch Chain, Reroll (3), Skip (2).
- **4:27** gained without a pick (a chest or other): Butter Pat 4/5 to 5/5.
- **4:50** level-up: took Slow Cooker from Hearty Helping, Slow Cooker, Clean Plate, Reroll (4), Skip (2).
- **4:50** gained without a pick (a chest or other): Slow Cooker 1/5 to 2/5.
- **5:05** level-up: took Starch Plating from Mash Finisher, Starch Plating, Gravy Heart, Reroll (4), Skip (3).
- **5:05** gained without a pick (a chest or other): Starch Plating 1/5 to 2/5.
- **5:17** gained without a pick (a chest or other): Rösti Disc 4/8 to 5/8.
- **5:19** gained without a pick (a chest or other): Rösti Disc 5/8 to 6/8.
- **5:37** gained without a pick (a chest or other): Rösti Disc 6/8 to 7/8.
- **5:39** gained without a pick (a chest or other): Rösti Disc 7/8 to 8/8.
- **5:47** level-up: took Aged Russet from Root Spikes, Starch Bolt, Aged Russet, Reroll (8), Skip (3).
- **5:47** gained without a pick (a chest or other): Aged Russet 1/5 new.
- **5:50** level-up: took Skipping Cannonball from Skipping Cannonball, Hash Boomerang, Tater Tot Pup, Reroll (9), Skip (3).
- **5:50** gained without a pick (a chest or other): Skipping Cannonball 1/8 new.
- **5:50** level-up: took Hash Brown Shield from Tater Tot Pup, Hash Brown Shield, Aged Russet, Reroll (9), Skip (3).
- **5:50** gained without a pick (a chest or other): Hash Brown Shield 3/8 to 4/8.
- **6:07** gained without a pick (a chest or other): Rösti Storm 1/1 new, Rösti Disc gone.
- **6:13** level-up: took Slow Cooker from Gravy Boat, Slow Cooker, Whisk Vortex, Reroll (12), Skip (4).
- **6:13** gained without a pick (a chest or other): Slow Cooker 2/5 to 3/5.
- **6:17** level-up: took Hash Brown Shield from Aged Russet, Stuffed Skin, Hash Brown Shield, Reroll (12), Skip (4).
- **6:18** gained without a pick (a chest or other): Hash Brown Shield 4/8 to 5/8.
- **6:45** level-up: took Whisk Vortex from Lean Lunch, Chives, Whisk Vortex, Reroll (13), Skip (5).
- **6:46** gained without a pick (a chest or other): Whisk Vortex 1/8 new.
- **7:08** gained without a pick (a chest or other): Hash Brown Shield 5/8 to 6/8.
- **7:10** gained without a pick (a chest or other): Hash Brown Shield 6/8 to 7/8.
- **7:12** gained without a pick (a chest or other): Hash Brown Shield 7/8 to 8/8.
- **7:27** level-up: took Aged Russet from Whisk Vortex, Aged Russet, Spud Dice, Reroll (14), Skip (5).
- **7:27** gained without a pick (a chest or other): Aged Russet 1/5 to 2/5.
- **7:28** level-up: took Skipping Cannonball from Whisk Vortex, Root Network, Skipping Cannonball, Reroll (14), Skip (5).
- **7:28** gained without a pick (a chest or other): Skipping Cannonball 1/8 to 2/8.
- **7:48** level-up: took Seed Potato from Golden Fry, Seed Potato, Lean Lunch, Reroll (14), Skip (5).
- **7:48** gained without a pick (a chest or other): Seed Potato 1/8 new.
- **8:01** gained without a pick (a chest or other): Hash Bulwark 1/1 new, Skipping Cannonball 2/8 to 4/8, Hash Brown Shield gone.
- **8:01** gained without a pick (a chest or other): Skipping Cannonball 4/8 to 5/8.
- **8:03** level-up: took Sprouting Eyes from Lean Lunch, Thick Skin, Sprouting Eyes, Reroll (14), Skip (5).
- **8:03** gained without a pick (a chest or other): Sprouting Eyes 1/5 new.
- **8:05** gained without a pick (a chest or other): Skipping Cannonball 5/8 to 6/8.
- **8:55** level-up: took Aged Russet from Aged Russet, Whisk Vortex, Lean Lunch, Reroll (15), Skip (6).
- **8:56** gained without a pick (a chest or other): Aged Russet 2/5 to 3/5.
- **8:58** level-up: took Skipping Cannonball from Skipping Cannonball, Seed Potato, Starch Plating, Reroll (15), Skip (6).
- **8:58** gained without a pick (a chest or other): Skipping Cannonball 6/8 to 7/8.
- **9:00** level-up: took Aged Russet from Aged Russet, Slow Cooker, Whisk Vortex, Reroll (15), Skip (6).
- **9:00** gained without a pick (a chest or other): Aged Russet 3/5 to 4/5.
- **9:13** gained without a pick (a chest or other): Skipping Cannonball 7/8 to 8/8.
- **9:15** gained without a pick (a chest or other): Russet Ricochet 1/1 new, Skipping Cannonball gone.
- **9:43** level-up: took Slow Cooker from Seed Potato, Sprouting Eyes, Slow Cooker, Reroll (16), Skip (9).
- **9:43** gained without a pick (a chest or other): Slow Cooker 3/5 to 4/5.
- **10:07** gained without a pick (a chest or other): Whisk Vortex 1/8 to 2/8.
- **10:08** gained without a pick (a chest or other): Whisk Vortex 2/8 to 3/8.
- **10:12** gained without a pick (a chest or other): Whisk Vortex 3/8 to 4/8.
- **10:32** gained without a pick (a chest or other): Whisk Vortex 4/8 to 5/8, Slow Cooker 4/5 to 5/5.
- **10:36** level-up: took Aged Russet from Aged Russet, Seed Potato, Sprouting Eyes, Reroll (19), Skip (11).
- **10:36** gained without a pick (a chest or other): Aged Russet 4/5 to 5/5.
- **10:37** level-up: took Whisk Vortex from Sprouting Eyes, Seed Potato, Whisk Vortex, Reroll (19), Skip (11).
- **10:37** gained without a pick (a chest or other): Whisk Vortex 5/8 to 6/8.
- **10:37** level-up: took Starch Plating from Starch Plating, Sprouting Eyes, Lean Lunch, Reroll (19), Skip (11).
- **10:37** gained without a pick (a chest or other): Starch Plating 2/5 to 3/5.
- **10:38** level-up: took Whisk Vortex from Whisk Vortex, Seed Potato, Lean Lunch, Reroll (19), Skip (11).
- **10:38** gained without a pick (a chest or other): Whisk Vortex 6/8 to 7/8.
- **10:40** level-up: took Starch Plating from Seed Potato, Sprouting Eyes, Starch Plating, Reroll (19), Skip (11).
- **10:40** gained without a pick (a chest or other): Starch Plating 3/5 to 4/5.
- **11:19** gained without a pick (a chest or other): Whisk Vortex 7/8 to 8/8.
- **11:40** gained without a pick (a chest or other): Seed Potato 1/8 to 2/8.
- **11:42** level-up: took Seed Potato from Sprouting Eyes, Lean Lunch, Seed Potato, Reroll (23), Skip (13).
- **11:42** gained without a pick (a chest or other): Seed Potato 2/8 to 3/8.
- **12:00** level-up: took Seed Potato from Lean Lunch, Seed Potato, Sprouting Eyes, Reroll (25), Skip (13).
- **12:00** gained without a pick (a chest or other): Seed Potato 3/8 to 4/8.
- **12:00** level-up: took Starch Plating from Starch Plating, Sprouting Eyes, Lean Lunch, Reroll (25), Skip (13).
- **12:00** gained without a pick (a chest or other): Starch Plating 4/5 to 5/5.
- **12:01** level-up: took Seed Potato from Seed Potato, Lean Lunch, Sprouting Eyes, Skip (13).
- **12:01** gained without a pick (a chest or other): Seed Potato 4/8 to 5/8.
- **12:02** level-up: took Seed Potato from Seed Potato, Lean Lunch, Sprouting Eyes, Skip (13).
- **12:02** gained without a pick (a chest or other): Seed Potato 5/8 to 6/8.
- **12:04** gained without a pick (a chest or other): Seed Potato 6/8 to 7/8.
- **12:16** level-up: took Seed Potato from Sprouting Eyes, Seed Potato, Lean Lunch, Skip (15).
- **12:16** gained without a pick (a chest or other): Seed Potato 7/8 to 8/8.
- **12:38** level-up: took Sprouting Eyes from Lean Lunch, Sprouting Eyes, Skip (15).
- **12:38** gained without a pick (a chest or other): Sprouting Eyes 1/5 to 2/5.
- **12:56** level-up: took Sprouting Eyes from Lean Lunch, Sprouting Eyes, Skip (15).
- **12:56** gained without a pick (a chest or other): Sprouting Eyes 2/5 to 3/5.
- **13:02** gained without a pick (a chest or other): Sprouting Eyes 3/5 to 4/5.
- **13:06** gained without a pick (a chest or other): Sprouting Eyes 4/5 to 5/5.
- **13:11** level-up: took Skip (15) from Lean Lunch, Skip (15).
- **13:12** gained without a pick (a chest or other): Lean Lunch 2/5 to 4/5.
- **13:25** level-up: took Lean Lunch from Lean Lunch, Skip (14).
- **13:25** gained without a pick (a chest or other): Lean Lunch 4/5 to 5/5.
- **14:52** level-up: took Skip (17) from Sack of Gold, Baked Potato, Skip (17).
- **15:03** level-up: took Skip (16) from Sack of Gold, Baked Potato, Skip (16).
- **15:14** level-up: took Skip (15) from Sack of Gold, Baked Potato, Skip (15).
- **15:16** level-up: took Skip (14) from Sack of Gold, Baked Potato, Skip (14).
- **16:00** level-up: took Skip (17) from Sack of Gold, Baked Potato, Skip (17).
- **16:00** level-up: took Skip (16) from Sack of Gold, Baked Potato, Skip (16).
- **16:32** level-up: took Baked Potato from Sack of Gold, Baked Potato, Skip (18).
- **16:37** level-up: took Skip (18) from Sack of Gold, Baked Potato, Skip (18).
- **17:04** level-up: took Skip (18) from Sack of Gold, Baked Potato, Skip (18).

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
  "safeMargin": 0.1
}
~~~
