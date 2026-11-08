# 2026-11-07 22-09-45: lived 04:41 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=byzq5dxqg2sgw&stats=A4WEAQCNBAocAbfeAAAA4Q0DAM3-At9pAAPWArUjAusEAhjrBaLNAQl6RYw6nLYJ2-UhQ4-PpyhP4_cBE40CjAETAQABAAAABwAAALoBAAACDQEECAICAkaOAfABhgIDCgk9DwsdRi0cCQ4EBQP_An0RBRUFAbfeLQBt_CUAx_gdAEQjHAFxtxIGAQAHAgAACQcDgJIBjQIACgLNDhEBAxICA9YWAQEgEgAQ0S5_GsQhL8YMKEpZr5m2AA |
| Ending | died at 4:41, level 10, 525 kills |
| Opening | first chest listed 4:01; 0 chests opened by 2:30; 3 elite fights and 0 elites killed by 3:00; first evolution none; level 6 at 3:00 |
| Testing | nothing named |
| Seed | NYE3O |
| Starting weapon | tater-pup (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | grok grok-4.7-build-fast |
| Bot code | 98b46c0 docs(gameplay): grok reviews the 2026-11-07 21:54 run, lived 6:42, testing E125 |
| Coach prompts | none (exploit run); coach-retrospective.md 29ea3ff1 |
| Templates from | 2026-11-07_20-34-44_lived-17-41_nightmare-1_world_headless.md (exploit run) |
| Log | /tmp/tibobit/2026-11-07_22-09-45_nightmare-1_world_headless.csv |

## Outcome

- Lived **4:41** (281.7s), level 10, 525 kills.
- Damage taken by source: boss:the-masher 44.8, enemy:snow-mold 36.8, enemy:potato-beetle 29.5, enemy:bowling-ball 27.8, boss:amusing 17.7, boss:beetle-queen 16.3, enemy:aphid 14.4, enemy:frost-flea 12.7, enemy:wireworm-larva 12.3, enemy:oil-drip 10.1, enemy:beetle-brood 10, enemy:crumb-ant 7.2, enemy:bowling-pin 5.5, enemy:sand-crab 4.7, enemy:bog-slime 4.7, Brambles 3.6, enemy:ketchup-drop 3, enemy:swarm-fly 2.8, enemy:compost-maggot 2.3, enemy:sprout-mite 2.3; 269 in all. Health gained over the run, by food, regeneration and anything else: about 141 (the game does not say from what).
- Weapons: Tater Tot Pup 2/8, Frying Pan 2/8.
- Passives: Big Bowl 5/5, Packed Pan 1/5.
- Items: none.
- Planner asked 96 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 99/120 | 21 | 0 | 4 | 31 | enemy:wireworm-larva, enemy:potato-beetle |
| 1:00 | 106/120 | 24 | 30 | 5 | 71 | enemy:potato-beetle, enemy:bowling-pin |
| 2:00 | 93/120 | 38 | 24 | 6 | 114 | boss:amusing, enemy:frost-flea |
| 3:00 | 98/120 | 53 | 57 | 7 | 180 | enemy:bowling-ball, enemy:sand-crab |
| 4:00 | 3/120 | 122 | 30 | 10 | 172 | enemy:snow-mold, boss:the-masher |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00; The Masher (the-masher) at 4:00.
- First chest listed: 4:01. First time under 25% health: 4:16.
- Goals by kind (done / gave up / dropped): explore 33/0/8; spot 4/0/0; elite 0/0/7; chest 0/1/0; evade 0/0/1.
- Dashes: 20 (0:35, 1:24, 2:02, 2:02, 2:10, 2:26, 2:31, 2:57, 3:07, 3:12, 3:21, 3:26, …).
- Model calls: 87 plans, 9 picks, 234 moves (mean 181ms); the page walked through 20 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:23 Frying Pan 1/8 new; 0:57 Big Bowl 1/5 new; 4:03 Packed Pan 1/5 new.

## Plan

Exploit run (one run in 3 of this coach): the champion templates from 2026-11-07_20-34-44_lived-17-41_nightmare-1_world_headless.md (Nightmare 1, lived 17:41), unchanged, starting with tater-pup. It tests nothing new: it is a real attempt at 20:00 and a second sample of the best play so far, so the review can tell how much of that run was luck.

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

This was an exploit of the 17:41 champion templates, tater-pup, seed NYE3O, and it tested nothing new. It lived 4:41 at level 10 with no chest opened and no evolution. The first chest listed at 4:01, Open scored 80% at 54 units, and that goal failed at 4:08 because the safe steps walked away from The Masher. Minutes 2 and 3 ended at 93/120 and 98/120 (amusing 17.7, queen 16.3). Minute 4 lost 122 of the run's 269 damage, mostly The Masher 44.8 and snow-mold 36.8, and a crumb-ant tick finished 3 hp at 4:41. The gap against 17:41 is this seed's chest clock: seven elite fights all dropped within about 6 seconds, so nothing died that could drop a chest, and the generic pick maxed Big Bowl while both weapons stayed at 2/8.

## Findings

- The champion policy was played. The one listed chest became the goal at 4:01 (Open 80%). No food option appeared on the plans. Evade goals were 0 done and 1 dropped. Same templates as the 17:41 note, same weapon. The short life is a late-list sample. Likely.
- First chest at 4:01, 0 opens by 2:30, 0 elite kills, no evolution. Weapons ended Tater Tot Pup 2/8 and Frying Pan 2/8. Level 6 at 3:00, against level 10 at 3:00 on the 17:41 run. Stats: explore 33/0/8, spot 4/0/0, elite 0/0/7, chest 0/1/0, evade 0/0/1. Likely as a late-list class, one seed for the 4:01 clock.
- All seven elite goals dropped on the next plan, about 5–6 seconds, and none ran the 20 second elite timer. Potato Beetle 0:32–0:38, Potato Beetle 1:22–1:28 (health 92 to 78, beetle window 14.4), Wireworm 2:28–2:33 while amusing closed from 207 to 26, Wireworm 3:44–3:49, Bowling Ball started and dropped in the same second as the 4:00 level-up (fight 55%, then explore up-right 60%), Snow Mold 4:08–4:13, Potato Beetle 4:13–4:18 at 15 hp. At death The Masher was still 98% at 307, the queen 88%, amusing 7%. No boss kill, no elite kill. Lead.
- Fight steps often logged the way to the goal as none (0:33, 1:23, 2:30, 4:08, 4:14). Where a direction was present, that way was ruled out: at 3:44 the goal was left and left was forecast at -30 hp, so the model walked down-right. Holding the goal longer may still kite. Lead.
- The chest at 4:01 stayed the goal across two level-ups: 80% at 54 down, 49% at 73 right (4:03), 31% at 111 up-right (4:04). It failed at 4:08, "no closer for 6 seconds", chest then 227 up-right, health 62. From 4:04 the chest side was forecast dead or about -30 hp with The Masher 103–145 right. The 4:04 dash at 73% was the no-damage step and lost 11, window boss:the-masher 11.2. Snow-mold on those steps climbed 4.3, 11.6, 15.8, 20.1, 24.3, 28.6. Outcome snow-mold 36.8 and masher 44.8. Later the same chest scored 16% at 227, 14% at 395, 12% at 479, 15% at 372 while health was 10. Lead.
- Minute 4 lost 122 and ended 3/120. First time under 25% health was 4:16. Death at 4:41 was a model step, hurt 0.75, the only move not priced dead, enemy:crumb-ant 2.4, from 3 hp. The Masher was 307 away. The page walked through 20 hits with distrustSeconds 0. Those walks were 2–4 hp ticks, including queen 2.7 at 4:21 and 4:22 while health was 13 then 10. The collapse was the model steps in the chest crowd, plus attrition after 4:16. Lead.
- Generic pick took Frying Pan at 0:23 (50% over pup 42%), then Big Bowl at 0:57 (49%), 1:20 (55%), 2:02 (46%), 4:00 (45% over Hash Brown Shield 44%), and 4:04 (86%), to 5/5. Whisk Vortex was never held. The pup won once, at 3:05, 30% to Potato Rain 29%. Gravy Heart was never on a card. Packed Pan 1/5 at 4:03 with the pan at 2/8. No recipe could evolve. Lead. B122 stays on recheck.
- Crop Patch from 2:55 to 2:57 finished at 93/120 with health unchanged and gold 5 to 12. That refutes the fill-to-cap claim on a belief already at recheck. The +7 gold matches earlier finishes at about +6 to +8. Likely for the gold.
- Health rose with no food goal and max still 120: 78 to 108 from 1:28 to 1:33, 71 to 95 at 2:44 (the row records hp_gained 24), 86 to 116 from 3:08 to 3:10, and 49 to 74 at 4:07 in the middle of the snow-mold window. Minute gains were 0, 30, 24, 57, 30. Likely.
- Boss clock on NYE3O: amusing at 2:00, Colorado Queen at 3:00, The Masher at 4:00. Likely.
- Dash asks at or above 0.5 dashed (0:35 64%, 1:24 55%, 3:21 56%, 3:26 59%, 3:57 59%, 4:04 73%, 4:14 66%). Asks under 0.5 stayed walks (0:33 4%, 0:59 5%, 1:23 30%, 4:27 41%, 4:41 12%). Confirmed.
- Keep-away won once, at 4:28, health 8/120, 31% over explore 30%, and the evade was dropped at 4:33 when explore left scored 31% to 29%. At 4:39, health 5/120, explore up-left won at 46%. The line "Evade only when no chest and no food is listed" still did not hold an evade. Likely.

## Went well

- Through 2:00 health stayed at or above 78/120. The first minute ended 106/120 after gaining 30. Three Beetle Nests completed (0:32, 0:44, 1:22) with the channel itself near free.
- After amusing at 2:00 and the queen at 3:00, explore walked away. Minute 2 ended 93/120, lost 38. Minute 3 ended 98/120, lost 53 and gained 57. Boss totals for the whole run: amusing 17.7, queen 16.3.
- At 2:30 amusing was 26 up and the forecast priced the toward-him steps at about -20 to -54. The model took the two steps that were still offered. Right call on the offers.
- At 4:00 he was inside the Dinner Bell, charged 0.4 of 1.5, text saying it calls a ring of pests. Explore up scored 48% and the bell 24%. He left it while three bosses were up.
- The 4:07 rise from 49 to 74, with no food goal, is why the run reached 4:41 instead of ending in the first snow-mold burst.

## Went poorly

- From 0:23 the picks built Big Bowl to 5/5 and left both weapons at 2/8. A chest at 4:01 had nothing ready to evolve: no weapon near max, Gravy Heart never offered, Whisk Vortex never held.
- Every elite fight was abandoned on the next plan. The 1:22 fight had already taken beetle contact to 14.4. Zero kills meant the chest directive had nothing to open until an explore found a drop at 4:01.
- 4:01–4:08 spent the only chest in The Masher's half of the field. Health on the fail row was 62, and the minute went on to lose 122. The chest side was already priced dead at 4:04. The goal should have become keep-away then, instead of waiting out stuckSeconds 6 inside the crowd.
- The 4:04 dash spent the charge on a forecast of no damage and still took the 11.2 Masher tick. Later dashes at 4:14 (66%) were into the same crowd, at 33 hp.
- At 4:08 Fight the Snow Mold started at 7 units with the window already 28.6. That fight and the beetle fight after it carried him from 62 hp through 21 hp at 4:16.
- At 4:33 the only evade, at 8 hp, was dropped for explore. Page walks at 4:21 and 4:22 took queen ticks at 13 and 10 hp. The 4:41 step had one legal move and it was lethal from 3 hp.

## Moments

- **0:23** Frying Pan 50%, Tater Tot Pup 42%, Mash Finisher 8%. Better: take the pup while it is 1/8.
- **0:32** Fight the Potato Beetle started after a nest. Dropped at 0:38 for another Beetle Nest at 45%, after wireworm-larva had reached 12.3. Better: stay on the beetle until it dies.
- **1:24** Dash down-right at 55% in the beetle fight, health 83 to 78, window potato-beetle 14.4. At 1:28 explore up-left won at 58% and the fight was dropped. Better: keep the fight that was already the goal.
- **2:00** Amusing listed 180 up. Explore down-left 50%, keep-away 19%, fights about 32%. Better: keep away while he is inside 200. The explore that followed did hold minute 2 to 38 lost.
- **2:30** Amusing 26 up, 97% health. Walk down scored hurt 1.03 and lost 5, then down-right scored no damage and lost 7, window amusing 6.7. Better: those were the only steps still offered. Right call. The forecast still missed him.
- **2:57** Crop Patch done. Gold 5 to 12. Health stayed 93/120. Amusing had closed to 69 during the channel. Better: skip a patch taken for a heal. This one did not heal.
- **3:00** Colorado Queen 177 down. Explore left 47%, keep-away 24%. She was 492 away by 3:32, and minute 3 ended at 98/120. Right call.
- **4:00** The Masher 180 down-right, standing in the Dinner Bell at 0.4 of 1.5. A Bowling Ball fight started at 55% and the level-up on the same second scored explore up-right 60% and dropped it. The pick was Big Bowl 45% over Hash Brown Shield 44%. Better: leave the bell, and do not start an elite in that crowd. Level the pup or take the shield over a fifth Big Bowl.
- **4:01** Chest found 54 down. Open 80%, with The Masher 173 down-right and the queen 182 down-right. Better: keep away while he stands in that direction, and open the chest once he does not.
- **4:04** Dash down-left at 73%, forecast no damage, lost 11, masher 11.2. Chest drifted from 79 right to 121 up-right. Health 92 to 81. Better: drop the chest as soon as its side is priced dead.
- **4:08** Chest failed, no closer for 6 seconds, health 62, snow-mold window 28.6. Fight the Snow Mold won at 24% with the mold 7 up-right. Better: keep away. The mold was the contact.
- **4:28** Keep-away 31% at 8/120, chest 375 down at 18%. At 4:33 explore left won 31% to 29% and the evade was dropped. At 4:41 the only legal step lost the last 2 hp to a crumb-ant. Better: stay on keep-away under 25% health.

## Questions

- If an elite fight that has already started stays yes until that elite dies or a boss is within 100, does an elite die, and does a chest list before 4:00? The move log may still kite, because several fight steps had no goal direction and the elite's direction was priced above extraDamage. E138.
- If a chest is a no while a boss within 200 lies in its direction, and keep-away is a yes then, does minute 4 lose less than 122, and does the chest still open once that boss leaves the way? E139.
- If a passive is a no unless its weapon is held, and a held weapon under 5/8 is a yes over that passive, does Big Bowl stay off a board with no Whisk Vortex, and is the pup above 2/8 by 4:00? E140.
- The Dinner Bell text says a ring of pests that drop triple xp. He left one at 0.4 of 1.5 under three bosses. What does finishing one do to enemy count, xp and health when no boss is within 200? E141.

## Next

- E138, enemies. Hold the current elite fight across the 5 second replan, the level-up replan and the boss-appearance replan, on these champion templates. This run's chest drought is seven dropped fights and zero kills. A chest before The Masher is what separates the 4-minute deaths from the 13–17 minute runs, which is as far as Nightmare 1 has gone. Score the kill, not only the goal timer: if the goal is held and the elite is still full when the timer ends, the action model kited and the kill claim fails.
- E139, bosses. The 4:01 chest was the directive firing in the wrong minute. Refusing a chest that shares its direction with a boss inside 200 tests whether the 122 hp in minute 4 was that approach. E135 is the related sentence on the E113 stack and is already running. This one is the generic champion question the exploit plays.
- E140, build, after E138 if that run gets a chest on the board. This board could not evolve even if the 4:01 chest had opened. Big Bowl 5/5 with no Whisk Vortex, pup 2/8, Gravy Heart never offered.

Enemies is the thin area that also caps the long branch: ice-imp after 15:00 is still open (E36), and this death's snow-mold window climbed to 28.6 on steps scored as the least bad forecast. E138 is the enemies experiment that can also produce a chest. Another unstratified exploit will keep sampling the late-list band and will not move the 20:00 ladder.

## Beliefs changed

- B93: recheck to disproved. The 2:57 Crop Patch left health at 93/120. Gold went 5 to 12.
- B138: added, likely, held. A finished Crop Patch adds about 6 to 8 gold. Health on a finish has stayed flat, gained 1, or filled, so a patch is not a heal plan.
- B95: lead to likely. Second seed. The 4:00 level-up dropped Fight the Bowling Ball in the same second it started (55%, then explore 60%).
- B139: added, lead, held. On the generic champion question, elite fights start and the next replan drops them within about 6 seconds. Seven starts, zero kills, first chest at 4:01.
- B140: added, lead, held. A chest 54 away scored 80% with The Masher in that direction, failed the 6 second stuck timer, and minute 4 lost 122.
- B100, B103, B49, B72, B58, B37, B35, B90, B22, B26, B113, B17, B122: evidence now includes NYE3O. Confidence and status unchanged. B122 stays recheck: the generic question took the pup once (3:05, 30%) and took Frying Pan over the pup at 0:23 (50% to 42%).

<!-- /review -->

## Picks

- **0:23** level-up: took Frying Pan from Frying Pan, Tater Tot Pup, Mash Finisher.
- **0:23** gained without a pick (a chest or other): Frying Pan 1/8 new.
- **0:25** level-up: took Frying Pan from Root Network, Frying Pan, Fry Knives.
- **0:25** gained without a pick (a chest or other): Frying Pan 1/8 to 2/8.
- **0:57** level-up: took Big Bowl from Stuffed Skin, Big Bowl, Sprout Satellites.
- **0:57** gained without a pick (a chest or other): Big Bowl 1/5 new.
- **1:20** level-up: took Big Bowl from Skipping Cannonball, Butter Pat, Big Bowl, Reroll (1).
- **1:20** gained without a pick (a chest or other): Big Bowl 1/5 to 2/5.
- **2:02** level-up: took Big Bowl from Big Bowl, Tater Tot Pup, Hot Streak, Reroll (2).
- **2:02** gained without a pick (a chest or other): Big Bowl 2/5 to 3/5.
- **3:05** level-up: took Tater Tot Pup from Potato Rain, Tater Tot Pup, Fry Lance, Reroll (2).
- **3:05** gained without a pick (a chest or other): Tater Tot Pup 1/8 to 2/8.
- **4:00** level-up: took Big Bowl from Tater Tot Pup, Big Bowl, Hash Brown Shield, Reroll (2).
- **4:01** gained without a pick (a chest or other): Big Bowl 3/5 to 4/5.
- **4:03** level-up: took Packed Pan from Fry Knives, Packed Pan, Chip Shuriken, Reroll (2).
- **4:03** gained without a pick (a chest or other): Packed Pan 1/5 new.
- **4:04** level-up: took Big Bowl from Packed Pan, Big Bowl, Thick Skin, Reroll (2).
- **4:04** gained without a pick (a chest or other): Big Bowl 4/5 to 5/5.

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
