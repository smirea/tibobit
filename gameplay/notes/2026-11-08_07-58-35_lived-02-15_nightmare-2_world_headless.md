# 2026-11-08 07-58-35: lived 02:15 on nightmare-2 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=kyrxyc1kebxpq&stats=A9c_AMwCCmYBcbcAAgCoBgUAPgQBvxoAF50EoxoAFA0B6RUA1LYCoQcC5AECPIUD_dABBnpFjDqctgnbUSIoTwESngKCAQMDAAIAAAADAAAAagAAAgcBAggKJqoDAwcGRxAOBhIMBAcFXJEBQhkEBRUFAXG3egCjgCQAe-oTAL5iEQD5TRAGAQAHAgAACQYD0FOeAgAKArMGEQEDEgIXnRYBAiASABDSbB21j8gMagzsHIqEGsEA |
| Ending | died at 2:15, level 10, 332 kills |
| Opening | first chest listed 1:47; 2 chests opened by 2:30; 5 elite fights and 1 elites killed by 3:00; first evolution none; level 10 at 3:00 |
| Seed | TIBO10 |
| Starting weapon | steam-vent (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | sonnet-high |
| Bot code | d113b01 feat(loop): coaches reason at high effort or more |
| Coach prompts | see the coach's log |
| Templates from | /Users/stefan/code/tibobit/.runs/rsi/sonnet-high/L3.I10.full-run.templates.json |
| Log | /Users/stefan/code/tibobit/.runs/rsi/sonnet-high/full-runs/2026-11-08_07-58-35_nightmare-2_world_headless.csv |

## Outcome

- Lived **2:15** (135.9s), level 10, 332 kills.
- Damage taken 286, by source: boss:amusing 121.6, enemy:tomato-leech 36.4, enemy:fry-fly 19.1, enemy:bog-slime 16.8, enemy:ketchup-drop 16.5, enemy:aphid 15.3, enemy:dumpster-raccoon 11.7, enemy:gull-flock 11.1; the killing blow: boss:amusing.
- Damage dealt 10704, by weapon: butter-streak 3390.7, steam-vent 3362.9, chip-shuriken 2792.8, peeler 929.4, grok-bot 227.7.
- Kills 332, by weapon: steam-vent 145, butter-streak 92, chip-shuriken 66, peeler 25, grok-bot 4.
- Bosses killed 0, elites killed 3, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 102, spent 0.
- Made: no evolution, union or evolved item.
- Health gained over the run, by food, regeneration and anything else: about 98 (the game does not say from what).
- Weapons: Steam Vent 4/8, Chip Shuriken 1/8, Butter Streak 1/8, Peeler 2/8.
- Passives: Root Network 3/5, Gravy Heart 1/5.
- Items: none.
- Planner asked 55 times.
- Nightmare ladder after the run: won up to Nightmare 1, so the next Open World Nightmare run plays Nightmare 2.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 114/120 | 22 | 14 | 4 | 31 | enemy:potato-beetle, enemy:aphid |
| 1:00 | 58/120 | 111 | 40 | 9 | 80 | enemy:tomato-leech, enemy:crumb-ant |
| 2:00 | 21/134 | 94 | 44 | 10 | 95 | boss:amusing, enemy:dumpster-raccoon |

- Bosses first seen: amusing (amusing) at 2:00.
- First chest listed: 1:47. First time under 25% health: 2:15.
- Goals by kind (done / gave up / dropped): explore 14/0/2; elite 1/0/4; chest 2/0/0; evade 2/0/1.
- Dashes: 3 (1:52, 1:57, 2:03).
- Model calls: 46 plans, 9 picks, 226 moves (mean 207ms); the page walked through 18 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:14 Root Network 1/5 new; 1:19 Chip Shuriken 1/8 new; 1:34 Butter Streak 1/8 new; 1:44 Peeler 1/8 new; 2:09 Gravy Heart 1/5 new.

## Plan

Play steam-vent with the chest-first goal text and the 10:00 gold rule, default picks and the current knobs (extraDamage 0.02, planEvery 5, eliteSeconds 20, boss ranges 0). Lockstep is gone, so the bot plays live. This is the best-supported playbook, but it only lived 1 of 5 in the live NM2 rehearsal, with the risk concentrated in 0-4:00 (the 2:00 Festival Mascot and early chargers). I am not guessing at an unproven opening change: no variant has live evidence, and the earlier lockstep tests of knobs and prompts do not carry over. If the opening survives, chests, an early evolution and the gold rule are what carried the NM1 win.

<!-- review: written by the coach after the run -->

## Summary

The full run (seed TIBO10, Nightmare 2, steam-vent, playbook unchanged, played live) **did not win**. It died at **2:15**, level 10, 332 kills, killed by boss:amusing (the 2:00 Festival Mascot), which did 121.6 of the 286 damage taken. The ladder stays at Nightmare 2, so the next run plays Nightmare 2 again. This is the live rehearsal result repeated: live play has now survived 5:00 on 1 of 6 fresh NM2 starts, and 0 of 1 on the evaluation seed. Every earlier "5 of 5 early survival" figure came from lockstep, which is banned, so those figures do not describe the game we play.

## What worked

- 0:00-1:30 was safe. HP stayed 111-120 of 120 and the bot took no real damage until about 1:23 (aphid, potato-beetle, ketchup-drop).
- The bot kept levelling: level 10 at 2:09, with a first chest at 1:48.
- Killing the Tomato Leech elite at 1:50 dropped 2 chests. They gave Steam Vent 1/8 -> 4/8 within 3 seconds (1:48-1:51), so elite goals do pay out.
- Evade with dashes at 1:52, 1:57 and 2:03 brought HP from 52 back to 58-59 before the boss arrived.
- Planner and action model latency was about 207 ms, with no crashes.

## What failed

- **The build had no core.** Level-ups at 0:14, 0:40 and 0:52 all took Root Network (80%, 63% and 87% pick probability) while Steam Vent sat at 1/8. Steam Vent stayed 1/8 until the chests at 1:48. The remaining picks were Chip Shuriken, Butter Streak (an on-dash weapon) and Peeler, spread across 4 weapons. There was no evolution. Damage dealt was only 10704 in total. This is the scatter pattern from B48/B68 again.
- **The elite fight cost about 60 HP.** At 1:32-1:50 the bot chased Tomato Leech elites with 80-90 enemies around and a 1/8 weapon. HP went 111 -> 100 (1:34) -> 77 (1:48, crumb-ant, raccoon, leech 13) -> 52 (1:51). Standing on the chest at 1:48 cost 14 HP more (gull-flock 11). It entered the 2:00 boss at 57/120, with 0 gold spent and 102 gold unspent.
- **The planner stopped evading with the boss adjacent.** At 2:09 HP was 73/134 (54%), above the half-HP threshold in my goal text, and Amusing was 45 units away. Evade rated 54% before the pick, then 36% after the card was taken, against Explore up-left at 42%. The planner chose Explore up-left. It chose Explore up-left again at 2:14 (evade 26%, boss 26 away). The chest-first text said to avoid evading above half HP, and the 'boss exception' had been rejected earlier from lockstep evidence only.
- **No dash at the kill.** At 2:15 the move rows ruled out up-left and up as "dead", and HP went 72 -> 20 in one step (about 52 from one hit), then death at 21 HP. A dash charge was available (dash=1 from 2:09), but the dash prompt rated 36-39% at 2:09-2:15 and never passed 0.5. The three dashes that were spent went on pests at 1:52-2:03.
- **Exploring found nothing.** 14 explore goals each ended "walked 300 units and found nothing new". The first chest was listed at 1:47, and only because an elite dropped it.

At death: HP 21/134 (max 134 after a late Gravy Heart), 3 dashes used in total, goal 'explore up-left', gold 102 unspent, 0 crates, 0 evolution.

## Moments

1. 0:14-0:52: three Root Network picks with Steam Vent at 1/8 meant no real weapon and no evolution path by 2:00.
2. 1:32-1:50: the Tomato Leech elite fight turned 111 HP into 52 HP, with no recovery before 2:00.
3. 2:09: after the Gravy Heart pick the planner replaced Evade with Explore while Amusing was 45 units away.
4. 2:14-2:15: a single hit took 52 HP, and the dash prompt stayed below 0.5.

## Next loop

The next nine iterations should aim at live play on NM2 through 0-5:00, since that is where 5 of 6 live games died. Ordered by how much each would change the death:

1. **Boss-adjacent behaviour at 2:00 (the Mascot).** Compare, live and paired on the same seeds, three variants against the playbook. (a) Goal text with an evade exception when a boss is within about 120 units, whatever the HP. (b) A boss-slam dash prompt (dash yes when a boss telegraph or hit is near). (c) A rule against starting elite fights between 1:30 and 2:00 when HP is under 70%. Use gyms built live just before 2:00.
2. **Pick commitment.** Level the starting weapon first (Steam Vent to 8), then its catalyst, with at most 3 weapons held and no on-dash weapons. Test it live on at least 5 fresh seeds against default picks. Under lockstep this lived 8 of 8, so it is a lead worth checking.
3. **Opening 0-2:00 routing.** The first chest came from an elite at 1:48. Test whether earlier elite goals (before 1:00) or other spots give power sooner, and what explore goals find.
4. **Start weapon live.** Test steam-vent against peeler and one or two other starts live on the same seeds.
5. Only if the opening survives at least 4 of 5 seeds live: the 6:00-20:00 stretch. On NM2 the 18:03 Kraken window and the Grater Golem at 16:00 remain the likely killers, and a high-HP and dodge build was the best lever (B79), but it was measured under lockstep.

Nightmare 3 and later will make the 2:00-4:00 bosses and the chargers (sand-crab, potato-beetle) harder, so there is little room left in the opening.

<!-- /review -->

## Picks

- **0:14** level-up: took Root Network from Root Network, Mash Wave, Mezzaluna.
- **0:14** gained without a pick (a chest or other): Root Network 1/5 new.
- **0:40** level-up: took Root Network from Mash Wave, Root Network, Starch Plating.
- **0:40** gained without a pick (a chest or other): Root Network 1/5 to 2/5.
- **0:52** level-up: took Root Network from Root Network, Gravy Boat, Hash Boomerang.
- **0:52** gained without a pick (a chest or other): Root Network 2/5 to 3/5.
- **1:19** level-up: took Chip Shuriken from Mash Finisher, Thick Skin, Chip Shuriken, Skip (1).
- **1:19** gained without a pick (a chest or other): Chip Shuriken 1/8 new.
- **1:34** level-up: took Butter Streak from Butter Streak, Tater Twirl, Mash Golem, Skip (1).
- **1:34** gained without a pick (a chest or other): Butter Streak 1/8 new.
- **1:44** level-up: took Peeler from Peeler, Chives, Steam Vent, Skip (1).
- **1:44** gained without a pick (a chest or other): Peeler 1/8 new.
- **1:48** level-up: took Steam Vent from Steam Vent, Salt Shaker, Slow Cooker, Skip (1).
- **1:48** gained without a pick (a chest or other): Steam Vent 1/8 to 2/8.
- **1:49** gained without a pick (a chest or other): Steam Vent 2/8 to 3/8.
- **1:51** gained without a pick (a chest or other): Steam Vent 3/8 to 4/8.
- **1:58** level-up: took Peeler from Fertilizer, Peeler, Chip Shuriken, Reroll (2), Skip (1).
- **1:58** gained without a pick (a chest or other): Peeler 1/8 to 2/8.
- **2:09** level-up: took Gravy Heart from Gravy Heart, Sprout Squad, Peeler, Reroll (2), Skip (1).
- **2:09** gained without a pick (a chest or other): Gravy Heart 1/5 new.

## Prompts

The templates the planner and the action model played with; `{{name}}` is filled from the game state.

### planner.state

~~~text
You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.

The aim: survive 20 minutes on {{difficulty}}.

Asked now because {{why}}. State now:

{{state}}
~~~

### planner.goal

~~~text
Tibo could next: {{goal}}. {{health}} {{evolutions}} Time {{time}}, {{gold}}. Chests are the best source of power: each gives a free pick and evolves a ready recipe, and elites and bosses drop them. While health is above half, rate opening a known chest or fighting an elite highest, then exploring for a chest, then gems; avoid evading unless enemies crowd Tibo. From 10:00 on, with 500 gold or more and no boss within 300 units, rate a Potato Crate, Fry Cart, Whetstone or shrine as high as a chest: items bought with gold carry the late bosses. If health is low, rate food and evading highest. Is this the best goal now?
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
  "safeMargin": 0.1,
  "distrustSeconds": 0,
  "distrustBossRange": 0,
  "planEvery": 5,
  "eliteSeconds": 20,
  "bossOfferRange": 0
}
~~~
