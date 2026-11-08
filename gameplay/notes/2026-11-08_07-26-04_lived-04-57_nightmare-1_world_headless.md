# 2026-11-08 07-26-04: lived 04:57 on nightmare-1 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=ywex3ff6e4g05&stats=A8WLAQDBAgosAAK9AAAA1Q4CABedArxSApMEBLreAzbRAfugAjh_AQh6RYw6USIoT4-nnLYJ2-P3ARKTARgNAAABAAAABwAAALgBAAACDAEECgIEAkhawAHAAQMJCERCJT4TDh0DBAQCswIKBRUFAbfeGQDH-BIAvmIPAXG3DgACvQ4GAQAHAgAACQYD6laTAQAKAvsREQEDEgIXnRYBASASABDSbB21j8gMagxUhdsLv6UA |
| Ending | died at 4:57, level 10, 321 kills |
| Opening | first chest listed never; 0 chests opened by 2:30; 6 elite fights and 0 elites killed by 3:00; first evolution none; level 8 at 3:00 |
| Seed | TIBO10 |
| Starting weapon | steam-vent (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | sonnet-medium |
| Bot code | f4ba97a fix(slots): a gym load that finds the last run just ended starts a run and loads again |
| Coach prompts | see the coach's log |
| Templates from | /Users/stefan/code/tibobit/.runs/rsi/sonnet-medium/L4.I10.full-run.templates.json |
| Log | /Users/stefan/code/tibobit/.runs/rsi/sonnet-medium/full-runs/2026-11-08_07-26-04_nightmare-1_world_headless.csv |

## Outcome

- Lived **4:57** (297.7s), level 10, 321 kills.
- Damage taken 147, by source: boss:the-masher 24.6, enemy:potato-beetle 18.1, enemy:bog-slime 14.7, boss:amusing 14.4, enemy:sand-crab 14.2, enemy:fry-fly 10.3, enemy:sprout-mite 9.9, enemy:wireworm-larva 8.9; the killing blow: enemy:sand-crab.
- Damage dealt 11114, by weapon: steam-vent 10555.7, grok-bot 531.2, gravy-splash 27.1.
- Kills 321, by weapon: steam-vent 307, grok-bot 10, gravy-splash 4.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 44, spent 0.
- Made: no evolution, union or evolved item.
- Health gained over the run, by food, regeneration and anything else: about 24 (the game does not say from what).
- Weapons: Steam Vent 2/8.
- Passives: Masher Grip 3/5, Gravy Splash 1/5, Sprouting Eyes 2/5, Starch Plating 1/5.
- Items: none.
- Planner asked 90 times.
- Nightmare ladder after the run: no level won yet, so the next Open World Nightmare run plays Nightmare 1.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 99/120 | 19 | 0 | 5 | 29 | enemy:potato-beetle, enemy:sprout-mite |
| 1:00 | 93/120 | 31 | 24 | 6 | 73 | enemy:wireworm-larva, enemy:potato-beetle |
| 2:00 | 79/120 | 13 | 0 | 8 | 116 | boss:amusing, enemy:bog-slime |
| 3:00 | 47/120 | 31 | 0 | 9 | 175 | enemy:potato-beetle, enemy:fry-fly |
| 4:00 | 4/120 | 45 | 0 | 10 | 173 | boss:the-masher, enemy:sand-crab |

- Bosses first seen: amusing (amusing) at 2:00; Colorado Queen (beetle-queen) at 3:00; The Masher (the-masher) at 4:00.
- First chest listed: never. First time under 25% health: 4:06.
- Goals by kind (done / gave up / dropped): explore 16/0/6; gems 3/0/1; spot 2/0/0; elite 0/1/13; evade 6/0/0.
- Dashes: 13 (4:03, 4:08, 4:12, 4:16, 4:20, 4:25, 4:29, 4:33, 4:38, 4:42, 4:46, 4:50, …).
- Model calls: 81 plans, 9 picks, 566 moves (mean 199ms); the page walked through 20 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:06 Masher Grip 1/5 new; 0:13 Gravy Splash 1/5 new; 2:09 Sprouting Eyes 1/5 new; 4:57 Starch Plating 1/5 new.

## Plan

Play steam-vent with lockstep 1 and chest-first goals, with no evade exception and no knob changes. Between 10:00 and 15:45, when gold is 300 or more and no boss is within 300 units, crates, Fry Cart, whetstone and shrines rate like chests, converting gold into items and max hp before the 16:00 crowd doubling. After 15:45 it is plain chest-first again. The aim is to pass 20:00 on the evaluation seed without tuning to its map.

<!-- review: written by the coach after the run -->

## Summary
The full run (seed TIBO10, steam-vent, lockstep 1, plain chest-first plus the 10:00-15:45 gold rule) died at 4:57, level 10, 321 kills. It never opened a chest, never evolved, and killed no elites. The gold rule never applied because it only acts after 10:00. This was the worst early result in loop 4, after rehearsals lived 5 of 5 fresh seeds.

## What worked
Nothing special. Steam-vent kept Tibo alive through the first three bosses (amusing 2:00, Colorado Queen 3:00) with 47/120 hp at 3:00. Lockstep kept moves legal.

## What failed
- No chest was ever listed (first chest listed: never), so the chest-first prompt had nothing to chase. 16 explore goals finished with 'walked 300 units and found nothing new' from 0:04 to 2:06 (log rows 0:04 to 2:06).
- Elite goals: 13 dropped, 1 gave up (E65566/E65565 from 1:10 to 3:15), 0 elites killed. The planner kept rating 'Fight the Potato Beetle/Wireworm Larva' at 40-55% over everything, flipping between targets every 5 s with planEvery 5, so no kill landed (2:17 failed 'no closer for 6 seconds').
- Build was scattered: Masher Grip 3, Gravy Splash 1, Sprouting Eyes 2, Starch Plating 1, Steam Vent only 2/8 at 4:57. No Root Network was ever offered or taken, so no pressure-cooker. Picks skipped Steam Vent at 0:06, 0:13, 0:56 (took Masher Grip three times) and took Skip (1) at 1:23.
- Damage: 3:26-4:13 hp fell 74 to 15 (Masher 24.6, Colorado Queen, sand-crab, potato-beetle). Evade goal from 4:05 was too late; 13 dashes, none saved it. Died at 4:57 with hp 4.
- Gold rule and everything shipped for 10:00+ went untested here; the run ended 5 minutes before it could matter.

## Moments
- 0:06 Masher Grip over Hash Hawk/Starch Bolt: first of three off-line picks; no catalyst ever lined up.
- 1:10 first elite goal started: the first of 14 elite goals with no kill.
- 3:26 only Steam Vent level-up at 3:26 (2/8): weapon level lagged badly (level 9 with an 8-level weapon at 2).
- 4:03 The Masher dealt 6.7 plus sand-crab 7.8 in one step at 41 hp, the turning point.

## Next loop
1. Early-game starvation is the real failure mode (seeds with 0 chests). Test fixes on fresh seeds 0-5:00, 3+ seeds each: a pick prompt that always levels Steam Vent and takes Root Network (the catalyst) before Masher Grip or Gravy Splash; elite goal exclusion before 3:00 when no kill lands; and a lower elite rating so gems and chest exploration win early.
2. Keep late gold rule tests from gyms but do not claim anything from this run about them.
3. Measure how often plain fails (0 chests by 2:30) across ~10 fresh seeds and find a leading marker.

<!-- /review -->

## Picks

- **0:06** level-up: took Masher Grip from Hash Hawk, Masher Grip, Starch Bolt.
- **0:06** gained without a pick (a chest or other): Masher Grip 1/5 new.
- **0:13** level-up: took Gravy Splash from Gravy Splash, Tater Twirl, Spud Decoy.
- **0:13** gained without a pick (a chest or other): Gravy Splash 1/5 new.
- **0:28** level-up: took Masher Grip from Small Fry, Steam Vent, Masher Grip.
- **0:28** gained without a pick (a chest or other): Masher Grip 1/5 to 2/5.
- **0:56** level-up: took Masher Grip from Masher Grip, Steam Vent, Skipping Cannonball, Skip (1).
- **0:56** gained without a pick (a chest or other): Masher Grip 2/5 to 3/5.
- **1:23** level-up: took Skip (1) from Sprout Satellites, Frying Pan, Fry Lance, Skip (1).
- **2:09** level-up: took Sprouting Eyes from Sprouting Eyes, Whisk Vortex, Hot Streak.
- **2:09** gained without a pick (a chest or other): Sprouting Eyes 1/5 new.
- **2:31** level-up: took Sprouting Eyes from Frozen Fries, Sprouting Eyes, Butter Socks.
- **2:31** gained without a pick (a chest or other): Sprouting Eyes 1/5 to 2/5.
- **3:26** level-up: took Steam Vent from Comet Scythe, Chives, Steam Vent.
- **3:26** gained without a pick (a chest or other): Steam Vent 1/8 to 2/8.
- **4:57** level-up: took Starch Plating from Sprouting Eyes, Reset Button, Starch Plating.
- **4:57** gained without a pick (a chest or other): Starch Plating 1/5 new.

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
If Tibo's next goal is to {{goal}}: is that the best thing now? Rank in this order. If health is under 25%, food or evading comes first. Otherwise: opening a chest first (free pick, and it evolves weapons), fighting an elite next (it drops a chest), then collecting nearby xp gems, then exploring for new chests. Exception: only when the game time {{time}} is between 10:00 and 15:45, gold is 300 or more, and no boss is within 300, buying a Potato Crate, visiting a Fry Cart, Spud Whetstone or a shrine rates as high as a chest. After 15:45 ignore shops and shrines. Do not evade just because many pests or a boss are around; the weapons handle them.
~~~

### planner.pick

~~~text
Tibo is at a {{choice}}. Which option makes Tibo strongest? Commit to one evolution line: level the weapon that has its catalyst passive held or on offer (Steam Vent with Root Network, Locked Gatling with Masher Grip) and take the catalyst when offered. Never take Reroll when a useful card is shown. Take Gravy Heart for max hp early. Keep damage passives (Butter Pat, Hot Sauce) next, and prefer armor and dodge items when offered.
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
  "lockstep": 1,
  "bossOfferRange": 0
}
~~~
