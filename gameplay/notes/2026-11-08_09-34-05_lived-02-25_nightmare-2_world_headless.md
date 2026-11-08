# 2026-11-08 09-34-05: lived 02:25 on nightmare-2 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=ksshwtr9jxz3q&stats=A5xEAIwDBwYBcbcAAACGBwYA0q4B0BoALbcCqRMAbtIBjBMAL8YBixMAF50B9AkA05sBrwQAB3pFnLZRIgnbjDrj9-UhARHcAVQGAwACAAAAAQAAAG4AAAIIAQIIBo4B8AMDCAcVHzIQAg0NBAcGJ2hAfjINBRsFAHoRUAFxtyoAjlgWAgdIb3Qgb2lsCADofwcGAQAHAgAACQYDtGLcAQAKArIGEQEDEgIXnRYBAiASABDSbB21j8gMagyY1EfAaboA |
| Ending | died at 2:25, level 7, 396 kills |
| Opening | first chest listed 1:19; 0 chests opened by 2:30; 3 elite fights and 1 elites killed by 3:00; first evolution none; level 7 at 3:00 |
| Seed | TIBO10 |
| Starting weapon | steam-vent (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | coach claude-sonnet-5-5@high |
| Bot code | dc813e0 feat(bot): dash thresholds are knobs, with a separate one near bosses |
| Coach prompts | see the coach's log |
| Templates from | /Users/stefan/code/tibobit/.runs/rsi/L4.I10.full-run.templates.json |
| Log | /Users/stefan/code/tibobit/.runs/rsi/full-runs/2026-11-08_09-34-05_nightmare-2_world_headless.csv |

## Outcome

- Lived **2:25** (145.5s), level 7, 396 kills.
- Damage taken 220, by source: enemy:garden-slug 80, boss:amusing 41.7, enemy:field-rat 21.6, Hot oil 8, enemy:cave-grub 7.2, enemy:dumpster-raccoon 7.2, enemy:compost-maggot 7.2, enemy:blight-spore 6.9; the killing blow: boss:amusing.
- Damage dealt 12596, by weapon: hash-hawk 3408.1, seed-potato 2472.8, comet-scythe 2444.4, harvest-moon 2443, steam-vent 1268.5, fry-knives 559.1.
- Kills 396, by weapon: harvest-moon 126, seed-potato 104, comet-scythe 64, steam-vent 50, hash-hawk 39, fry-knives 13.
- Bosses killed 0, elites killed 3, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 6, spent 0.
- Made: no evolution, union or evolved item.
- Health gained over the run, by food, regeneration and anything else: about 84 (the game does not say from what).
- Weapons: Steam Vent 1/8, Harvest Moon 1/8, Seed Potato 2/8, Comet Scythe 1/8, Hash Hawk 1/8, Fry Knives 1/8.
- Passives: none.
- Items: none.
- Planner asked 51 times.
- Nightmare ladder after the run: won up to Nightmare 1, so the next Open World Nightmare run plays Nightmare 2.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 99/120 | 18 | 0 | 4 | 31 | Hot oil, enemy:aphid |
| 1:00 | 76/120 | 112 | 84 | 7 | 78 | enemy:garden-slug, enemy:crumb-ant |
| 2:00 | 26/120 | 52 | 0 | 7 | 110 | enemy:field-rat, enemy:blight-spore |

- Bosses first seen: amusing (amusing) at 2:00.
- First chest listed: 1:19. First time under 25% health: 1:33.
- Goals by kind (done / gave up / dropped): explore 13/0/3; elite 1/0/1; evade 4/0/1; spot 1/0/0.
- Dashes: 8 (1:19, 1:24, 1:28, 1:29, 1:33, 1:37, 1:42, 2:25).
- Model calls: 45 plans, 6 picks, 346 moves (mean 182ms); the page walked through 12 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:24 Harvest Moon 1/8 new; 0:27 Seed Potato 1/8 new; 0:37 Comet Scythe 1/8 new; 1:07 Hash Hawk 1/8 new; 1:42 Fry Knives 1/8 new.

## Plan

The full run on Nightmare 2 plays the playbook the rehearsal settled: steam-vent start, the chest-first goal text with the 10:00 gold rule, default picks, and the current knobs (extraDamage 0.02, planEvery 5, eliteSeconds 20, boss ranges 0). Training does not support any change on the live opening. Every variant tried this loop (boss-evade and dash package, armor, commit picks, spot goals, Hot Streak picks, the hurt prompt, other starts, explore 600, extraDamage 0) lived no more often than the control. The rehearsal lived 1 of 5, so expect the bot to be at serious risk before 4:00, mainly from pest chip damage and then the 2:00 Mascot. If it gets past 4:00 with an early evolution and a steady flow of chests, the gold rule and chest-first routing are what carried Nightmare 1. This run is one data point and is not tuned to the evaluation seed.

<!-- review: written by the coach after the run -->

## Summary

The full run lost on Nightmare 2 (seed TIBO10, live, Steam Vent start, unchanged playbook). It died at 2:25 at level 7 with 396 kills and 220 damage taken. It never opened a chest (0 chests, 0 evolutions, 0 passives, max hp 120 throughout), and the killing blow was the 2:00 Festival Mascot (41.7 of the damage). The ladder stays at Nightmare 2: won up to Nightmare 1.

This is the second live full run on TIBO10 (2:15 before, 2:25 now). Both died to the same chain: pest chip damage, then the Mascot at 2:00 while the bot was near 50-70 hp, then no dash used on the boss. It matches the live 1-of-5 rehearsal, so the rehearsal was not overstated this time.

## What worked

- Killing the Garden Slug elite (1:03-1:19) did drop 3 chests. The elite is a real chest source, since explore found 0 chests (13 explores done, 3 dropped).
- The bot found five new base weapons by 1:42 and dealt 12.6k damage in 145 s (about 87 dps), well above the roughly 4k-by-2:15 of earlier Steam Vent games. Hash Hawk, Seed Potato, Comet Scythe and Harvest Moon all dealt 2.4-3.4k.
- Model lag was not an issue (mean 182 ms per move, 12 hits walked through by the page).

## What failed

- **Minute 1 (1:03-1:19):** Fight the Garden Slug started at 99/120 (82%) with 35 enemies and six 1/8 weapons. The planner rated it 71-76%. hp fell 99 to 43 in 16 s (garden-slug 80 damage in all), and the action model ruled out nearly every move ("costs more than the safest move").
- **1:19-1:56, the chests were abandoned:** At hp 43/120 (36%) the planner rated Keep away from enemies 76-79% and Open the chest 19% (chests 56, 95, 96, 112 units away). Five 8 s evade goals followed. By 1:40 the nearest chest was 477 units away and hp was 53; at 1:48 the chest list was empty. The bot paid 56 hp for three chests and never opened one. It also spent 7 of its 8 dashes in 1:19-1:42, on pests.
- **Last 30 s (2:00-2:25):**
  - 2:00: hp 76/120, Mascot 168 away. The planner rated Explore up 60% and Keep away 22%.
  - 2:12-2:13: hp 72, Mascot 160-194 away. Explore 54% and 36%, Keep away 23-24%. The dash prompt scored 19%.
  - 2:18: hp 72, Mascot 226 away. The planner chose Charge the Beetle Nest (55%) while Keep away was 27%.
  - 2:20: inside the nest at hp 69 to 65, Mascot 76 to 43 away, cave-grub biting. The goal ended "charged and used" and the planner chose Fight the Blight Spore (55%) with Keep away 18%, 105 enemies around and the Mascot 43 away.
  - 2:23: -19 hp in one step (field-rat 10.8, blight-spore 6.9, maggot). The dash prompt was 34-39%.
  - 2:25: hp 30, dash prompt 47%. The one dash fired at 51% when every move was already rated "dead". Evade never rose above 27% after 2:00 because hp stayed above the 50% line in my goal text.
- **Build:** 6 picks (Harvest Moon 84%, Seed Potato 50%, Comet Scythe 79%, Hash Hawk 61%, Seed Potato 60%, Fry Knives 54%). They built no core: six weapons at 1/8, Seed Potato 2/8, no passives, Steam Vent never levelled, Skip rated 3-7%. Gold was 6 earned and 0 spent, which does not matter before 10:00.

## Moments

1. 1:03: taking an elite fight at 82% hp in a crowd of 35 with 1/8 weapons (-56 hp in 16 s).
2. 1:19-1:56: the low-hp clause sent the bot away from three chests it had just paid for.
3. 2:18-2:20: charging a nest and then fighting a Blight Spore with the Mascot 43-226 units away, because evade was rated under 30% above half hp.
4. 2:25: the dash fired only when no escape was left.

## Next loop

Ordered by how much each would change the death:

1. **Chest before evade:** make a chest within about 150 units, with no boss within 200, outrank evade at any hp. This is the new lever from this run. Test it paired on 5+ fresh live NM2 seeds, and check it does not make bots die at low hp.
2. **Boss dash knobs:** dashThreshold, bossDashThreshold and bossDashRange now exist and are untested. Try bossDashThreshold 0.25 with bossDashRange 150 and compare dashes spent on the Mascot with damage taken from it.
3. **Weapon focus:** a pick prompt that levels the strongest weapon held, allows at most 3 weapons, and takes a catalyst at max-1. Commit-picks was tested only on Steam Vent. This run had stronger offers (Harvest Moon, Hash Hawk, Seed Potato) and still spread to 1/8 everywhere.
4. **Elite gating:** fight elites only above about 85% hp and with few enemies near, and see whether nests early are better than fighting wandering elites.
5. **Do not repeat:** hurt-prompt variants, extraDamage 0, armor, explore 600, spot goals, Hot Streak picks and start-weapon swaps. All lived no more often than their controls.

Next ladder level (NM3) will make pests tougher and the Mascot hit harder, so a plan that relies on staying above 50% hp in minute 1 will fail sooner.

<!-- /review -->

## Picks

- **0:24** level-up: took Harvest Moon from Mezzaluna, Salt Shaker, Harvest Moon.
- **0:24** gained without a pick (a chest or other): Harvest Moon 1/8 new.
- **0:27** level-up: took Seed Potato from Mash Golem, Harvest Moon, Seed Potato.
- **0:27** gained without a pick (a chest or other): Seed Potato 1/8 new.
- **0:37** level-up: took Comet Scythe from Sprouting Eyes, Harvest Moon, Comet Scythe, Skip (1).
- **0:37** gained without a pick (a chest or other): Comet Scythe 1/8 new.
- **1:07** level-up: took Hash Hawk from Hash Hawk, Harvest Moon, Seed Potato, Skip (1).
- **1:07** gained without a pick (a chest or other): Hash Hawk 1/8 new.
- **1:22** level-up: took Seed Potato from Harvest Moon, Comet Scythe, Seed Potato, Skip (1).
- **1:23** gained without a pick (a chest or other): Seed Potato 1/8 to 2/8.
- **1:41** level-up: took Fry Knives from Harvest Moon, Fry Knives, Salt Shaker, Skip (1).
- **1:42** gained without a pick (a chest or other): Fry Knives 1/8 new.

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
  "bossOfferRange": 0,
  "dashThreshold": 0.5,
  "bossDashThreshold": 0.5,
  "bossDashRange": 0
}
~~~
