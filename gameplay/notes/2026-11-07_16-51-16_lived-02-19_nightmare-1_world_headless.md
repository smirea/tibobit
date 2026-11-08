# 2026-11-07 16-51-16: lived 02:19 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=et3mewt0jhfde&stats=A5tBAJUCCe0BAPlNAAUAvQYFAPITAJomAsoPAB91AuYGABedAYQGAJCmAKcCAjh_ArreAgZ6RY-nCdvj9yhPjDoBEHkAAQYAAQAAAAEBAABjAAACBwECCApavAIDBwYSBhMVHC8EBwXKAR4TDQ0FHgUAYjYsAHvqCgDofwoAYAgJAgpTcG9yZSB2ZW50CAYGAQCQposBBwIAAAkFA_VEeQAKAqAHEQEDFgEBIBIAEGAnnHMF7jIxDB2binTuEQA |
| Ending | died at 2:19, level 9, 277 kills |
| Opening | first chest listed 1:32; 4 chests opened by 2:30; first evolution none; level 9 at 3:00 |
| Testing | E21 |
| Seed | 1Q4CI77 |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | claude sonnet |
| Coach prompts | coach-plan.md 5b6dc362; coach-retrospective.md 3ec01e62 |
| Templates from | coach-plan.md |
| Log | /tmp/tibobit/2026-11-07_16-51-16_nightmare-1_world_headless.csv |

## Outcome

- Lived **2:19** (139.1s), level 9, 277 kills.
- Damage taken by source: enemy:bog-toad 44, enemy:fry-fly 10, enemy:cave-grub 10, enemy:crumb-ant 9, Spore vent 8, Hot oil 8, enemy:aphid 8, enemy:ketchup-drop 5.
- Weapons: Taproot Eruption 1/1, Sprout Squad 2/8, Steam Vent 1/8.
- Passives: Starch Plating 2/5, Masher Grip 2/5.
- Items: none.
- Planner asked 52 times.

## Plan

This run tests E21 on nightmare open world: does a plain directive in planner.state get a chest opened and keep Tibo alive past 3:16? The last world run evaded for its whole life and never started a chest, food or gems goal, and died at 3:16 on 1 hp with both weapons at 3/8. The directive sits at the top of planner.state: open a listed chest, eat food when health is under 70%, and evade only when no chest or food is listed. Only planner.state changes. The planner goal and pick questions, the action templates and the knobs stay as the last run had them. If the directive carries, you should see chest goals start within the first two minutes, at least one chest open (a free pick, with a recipe evolving if one is ready), and food goals when health drops under 70%. Evade should appear less often than the 22 starts last time. If chests still lose the vote to evade, the planner is not following a state directive, and that is a finding. Watch hp at 3:16 and the count of chests opened. Also note any steps the forecast calls free that still lose 2 hp or more (E20), any heal of 10 hp or more with no food goal (E22), and whether bosses show up on the damage list (E23).

<!-- review: written by the coach from coach-retrospective.md -->

## Summary

E21 tested whether a plain directive in planner.state (open a listed chest, eat under 70% if food is listed, evade only when neither is listed) gets a chest opened and keeps Tibo alive past 3:16 on nightmare open world. The directive carried: evade started 0 times (22 last run), 8 chest goals started once chests were listed, 4 chests opened (1:43, 1:45, 1:48, 2:19) and Root Spikes evolved into Taproot Eruption at 2:19. Survival did not improve: Tibo died at 2:19 (hp 120 to 1, level 9, 277 kills), earlier than the 3:16 baseline, on a different seed. The first chest was only listed at 1:32, when hp was already 70 with 53 enemies around. The chest trips from 1:32 to 1:46 cost 53 hp, mostly to a Bog Toad charger, and the unused dash charge was spent only at 2:13 at 5 hp. The food half of the directive never ran, because food was never listed. The hypothesis is refuted on survival and confirmed on directive-following. One sample.

## Findings

- **A plain directive moves the goal vote (lead).** Evade starts fell from 22 to 0 and 'Keep away from enemies' scored 14-31%, never top. Chest goals topped the vote whenever a chest was near: 79% at 1:32, 55% at 1:39, 74% at 1:40, 47% at 1:43, 54-57% at 1:46, 48% at 2:17. All 8 level-up picks matched the top card. The directive text also says evading failed, so how much of the evade drop comes from that line is unknown. One run.
- **The directive could not act before the first chest was listed (likely).** The chests column is empty from 0:00 to 1:32. Twenty-two explore goals walked about 300 units each, and the first chest was found at 1:32, 69 away. Last run's first chest was listed at 2:16. Potato Crates are listed as spots but gold was 0 until 1:25. Discovery is the bottleneck, not the vote. Two world runs, different seeds.
- **Chest score falls with distance and with low health, and at low health the planner left chests for explore (lead).** At 53-69 away the score went 79% (hp 70, 1:32), 55% (hp 53, 1:39), 32% (hp 25, 1:45) and 28% (hp 17, 1:48). Chests 120-220 away scored 12-23%, under explore at 30-41%. At 1:48 two chests were listed (53 and 109 away) and 'Explore left' won at 32%. The 53-away chest was probably C131127, the one that evolved Taproot at 2:19. Tibo explored for 24 s at hp 17 to 6 and only came back to it at 2:12. One run, confounded by distance.
- **The chest trips are where the health went (likely for the cost, lead for the cause).** hp 70 at 1:32 became 17 at 1:46 (-53 in 14 s). From 1:35 to 1:38 every step toward the chest was ruled out (-8 to -27 forecasts). The chest grew from 47 to 128 away, the goal was dropped at 1:39, and hp 70 to 53 was lost in the crowd (cave-grub, oil-drip, bog-toad, enemies_near 8-12). Then three chests opened under Bog Toad contact: hp 46 at 1:43, 39 at 1:44, 25 at 1:45, 17 at 1:46. The forecast called those steps 'no damage' (hurt 0.36-0.67) and they cost 7, 7 and 14.
- **Bog Toad (a charger) is the top damage source and the forecast does not see it (lead).** Bog Toad took 44 of the 102 listed hp. The other listed damage was fry-fly 10, cave-grub 10, crumb-ant 9, Spore vent 8, Hot oil 8, aphid 8 and ketchup-drop 5. The listed total is 17 short of the 119 lost. No boss is on the list.
- **The dash charge sat unused until 2:13 (lead).** The dash column is 1 from the start and the only dash is at 2:13.6 (up-left, hp 5). It was never used through hp 70 to 17 at 1:35-1:46 with enemies_near 8-12 and a charging toad. The charge was back by 2:19, so the cooldown is 5.5 s or less. The log does not record the action.dash probability, so we cannot tell whether it was asked and said no.
- **No heal appeared (likely).** hp never rises by 10 or more in 2:19, max hp stays 120, and no food was listed. Together with E19 that is two world runs without the daily's +25 to +30 heals.
- **Amusing arrives at 2:00 again and puts no line on the damage list (likely for amusing).** It was 161 away at 100%, then 74% at 2:19. The forecast rates steps toward it as 'dead' (2:06 to 2:09), so the model stayed away. Colorado Queen was not reached.
- **Beetle Nests were net negative early (lead).** The nest at 0:25 (charged by 0:34) went 117 to 92 by 0:36 (fry-fly, cave-grub, aphid, spore vent) and no chest was listed after it. The nest at 1:25 (charged at 1:28) was followed by enemies_near 8 and hp 74 to 53 by 1:39. No elite or chest drop shows in the log.
- **Explore picks flipped between neighbouring directions every 5 s (lead).** Examples: up, up-right, up-left, up-right at 0:46-1:02. The net heading was still up (y -1158 to -2543 by 1:13). That may be harmless, but explore never reached the 300-unit end on most goals.

## Went well

- **1:32** Open the chest scored 79% against about 14% for everything else, so the directive worked the moment a chest existed.
- **1:46 and 1:50** Masher Grip was taken at 84% and 77%. It is the Root Spikes catalyst, and Taproot Eruption evolved at the next chest (2:19).
- **1:43-1:48** Three chests opened in 5 s, taking Root Spikes from 3/8 to 7/8. That is a fast evolution for 1:48 in the game.
- Level 9 was reached at 1:50 (the baseline reached it at 3:16).

## Went poorly

- **0:25-0:36** The Beetle Nest goal cost about 25 hp for no listed reward. It should have been skipped (E6).
- **1:35-1:39** Tibo walked away from the chest while the goal was still Open the chest (distance 47 to 128), taking about 17 hp. Better: dash through, or evade first and return.
- **1:43-1:46** Chests were opened under a Bog Toad (28 hp lost). Better: dash away from the charger when it is within about 100.
- **1:48-2:12** At hp 17 to 6, Tibo explored instead of finishing the 53-away chest. Better: take the chest, or evade. No goal or template rule handles hp under 20%.
- **1:35-2:13** The dash charge was unused for about 38 s of crowd contact.
- The food rule was untested because no food was ever listed.

## Moments

- **0:25** Charge the Beetle Nest chosen at 48%. Standing in it at 0:33-0:34 under fry-fly and cave-grub, then hp 117 to 92 by 0:36. Better: skip nests early.
- **1:28** The second nest was used with enemies_near 8, and hp went 74 to 53 by 1:39. Better: skip it, or leave the area after charging.
- **1:32** An explore found a chest 69 away and Open the chest scored 79%. Right call.
- **1:35** The walk to the chest was ruled out in every toward-chest direction, hp 65 to 53 in about 1 s, and the chest fell from 47 to 128 away. Better: use the dash, or drop the goal and evade.
- **1:43** C262173 opened at hp 46 (Root Spikes 3/8 to 5/8) with a Bog Toad hit of 7. Right call to open it, wrong to ignore the toad.
- **1:44** Standing on the next chest, hits of 7 and then 14 landed on steps forecast 'no damage', hp 39 to 25. Better: dash away from the toad, or let the chest finish and then leave.
- **1:46** The level-up took Masher Grip at 84%, the Taproot catalyst. Right call.
- **1:48** At hp 17 the 53-away chest (28%) lost to Explore left (32%). Better: open it, since it evolved Root Spikes 31 s later.
- **2:00** Amusing appeared 161 away at hp 10, and the plan stayed on explore. The boss stayed off the damage list.
- **2:13** First and only dash (up-left) at hp 5. Better: dash from 1:35, when hp fell 70 to 17 in a crowd.
- **2:19** C131127 opened at hp 1 and Taproot Eruption appeared, and the run ended on the same row. Better: open it at 1:48.

## Questions

- Does a looser action.dash (fire when hp fell 5 or more in 3 s or enemies_near is 5 or more) cut hp loss in 1:30-2:30? Added as E24.
- Does telling the planner to evade when health is under 40% keep the chest directive from burning the last hp? Added as E25.
- Does exploreDistance 600 find the first chest before 1:30? Added as E26.
- What does gold buy at the Fry Cart? Gold was 157 to 236 and unspent from 1:46, with the cart 44-78 away. Added as E27.
- Can naming Bog Toad (a charger, 50 hp, 13 damage) in a template reduce its 44 hp? Added as E28.

## Beliefs changed

- B9: lead to likely. Third run with upgrade-held wins (4 of 8) and new cards winning when higher.
- B15: lead to likely. Second world run with trash mobs as the listed damage and no boss line.
- B16: still lead, evidence added. Without the directive the planner evaded; with it, evade went to 0.
- B17: lead to likely. Second world run with free-forecast steps costing hp (7, 7, 14 at 1:44-1:45).
- B18: lead to likely. Second world run with no heal through 2:19.
- B20: lead to likely for amusing, which was absent from the damage list in both world runs; Colorado Queen is still one appearance.
- New: B21 directive moves the vote (lead), B22 chest score falls with distance and low hp (lead), B23 Bog Toad (lead), B24 dash unused (lead), B25 first chest listed late (likely), B26 boss clock times (likely), B27 explore at low hp (lead).

## Process changes

I added one bullet to coach-plan.md. A directive that fires only when something is listed (a chest, food) does nothing until that thing is listed, and half of E21 never ran. The plan should state the default goal for the time before that, and should say that world chests may not be listed before about 1:30.

<!-- /review -->

## Picks

- **0:11** level-up: took Starch Plating from Starch Plating, Rotten Spud, Bacon Bits.
- **0:34** level-up: took Root Spikes from Root Spikes, Hash Rush, Sprouting Eyes.
- **0:40** level-up: took Sprout Squad from Sprout Squad, Fry Knives, Mezzaluna.
- **1:20** level-up: took Steam Vent from Hot Streak, Steam Vent, Gem Sling.
- **1:34** level-up: took Root Spikes from Steam Vent, Sprout Squad, Root Spikes.
- **1:40** level-up: took Starch Plating from Spud Dice, Spry Sprout, Starch Plating, Reroll (3).
- **1:46** level-up: took Masher Grip from Sprout Squad, Sour Cream, Masher Grip, Reroll (3).
- **1:50** level-up: took Masher Grip from Masher Grip, Steam Vent, Potato Magnet, Reroll (4).

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
Is Tibo about to be hit or surrounded, so a quick dash away would save it?
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
