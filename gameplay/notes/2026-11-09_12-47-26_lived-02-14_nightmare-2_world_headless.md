# 2026-11-09 12-47-26: lived 02:14 on nightmare-2 world (headless)

| | |
| --- | --- |
| Replay | https://tibo.dog/r/?run=5r2ff86yh83b0&stats=A4c_AOwCCCEBcbcAAAC6BgUAPEIBzhgAm-MB5BYAF50B3QoAy-cChQkCqgICPIUC60cBBHpF5SEJ2-P3ARHGAU4AAQACAAAAAwEAAGoAAAIIAQIKBIYBxAMDBQQ_DR0eBAgFhwGMAScrBwUVBQFxt2wAbC0YAJ0GFQBt_A4Ax_gMBgEABwIAAAkGA71FxgEACgKRBxEBAxICF50WAQIgEgAQE-6NDdUohAYMiG48sXwmAA |
| Ending | died at 2:14, level 8, 364 kills |
| Opening | first chest listed 2:12; 0 chests opened by 2:30; 2 elite fights and 1 elites killed by 3:00; first evolution none; level 8 at 3:00 |
| Seed | TIBO10 |
| Starting weapon | steam-vent (chosen by the coach) |
| Planner | typesafe/jev-1.14-20261014 |
| Action model | typesafe/jev-1.14-20261014 |
| Coach | coach claude-sonnet-5-5@high |
| Bot code | 55dfb2a fix(bot): a dropped tab connection gets 20s to come back, and a crashed game names its cause |
| Coach prompts | see the coach's log |
| Templates from | /Users/stefan/code/tibobit/.runs/rsi/L8.I10.full-run.templates.json |
| Log | /Users/stefan/code/tibobit/.runs/rsi/full-runs/2026-11-09_12-47-26_nightmare-2_world_headless.csv |

## Outcome

- Lived **2:14** (134.5s), level 8, 364 kills.
- Damage taken 198, by source: boss:amusing 107.7, enemy:aphid 23.8, enemy:sprout-mite 21.5, enemy:snow-mold 14, enemy:potato-beetle 11.9, Spore vent 5.6, enemy:compost-maggot 5.2, enemy:frost-flea 4.6; the killing blow: boss:amusing.
- Damage dealt 8894, by weapon: fry-sentry 3149.7, spud-decoy 2915.7, steam-vent 1373, hash-brown-shield 1157.1, grok-bot 298.
- Kills 364, by weapon: spud-decoy 140, fry-sentry 135, hash-brown-shield 43, steam-vent 39, grok-bot 7.
- Bosses killed 0, elites killed 1, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 32, spent 0.
- Made: no evolution, union or evolved item.
- Health gained over the run, by food, regeneration and anything else: about 61 (the game does not say from what).
- Weapons: Steam Vent 1/8, Fry Cook Sentry 1/8, Spud Decoy 1/8, Hash Brown Shield 2/8.
- Passives: Root Network 2/5, Lean Lunch 1/5.
- Items: none.
- Planner asked 54 times.
- Nightmare ladder after the run: won up to Nightmare 1, so the next Open World Nightmare run plays Nightmare 2.

## Stats

Worked out by the bot from the run's log.

| Minute | Health at the end | Lost | Gained | Level | Enemies | Hurt most by |
| --- | --- | --- | --- | --- | --- | --- |
| 0:00 | 82/120 | 42 | 6 | 5 | 30 | enemy:aphid, enemy:potato-beetle |
| 1:00 | 108/120 | 26 | 49 | 7 | 79 | enemy:sprout-mite, enemy:snow-mold |
| 2:00 | 42/120 | 74 | 6 | 8 | 95 | boss:amusing, enemy:frost-flea |

- Bosses first seen: amusing (amusing) at 2:00.
- First chest listed: 2:12. First time under 25% health: never.
- Goals by kind (done / gave up / dropped): explore 21/0/0; elite 1/0/0.
- Dashes: 0.
- Model calls: 47 plans, 7 picks, 88 moves (mean 243ms); the page walked through 21 hits on its own.
- New cards, evolutions and jumps of 3 or more levels (chests give those): 0:22 Root Network 1/5 new; 0:36 Fry Cook Sentry 1/8 new; 0:38 Spud Decoy 1/8 new; 1:14 Lean Lunch 1/5 new; 1:38 Hash Brown Shield 1/8 new.

## Plan

The full run on Nightmare 2 plays the settled playbook: steam-vent start, the chest-first goal text with the 10:00 gold rule, default picks, extraDamage 0.02, planEvery 5, eliteSeconds 20, boss ranges 0 and default dash thresholds. No change is supported. The boss dash knobs, dash 0.3, eliteFrom, explore length, other starts, picks, prompts and items all lived no more often than the roughly 20% live baseline, and the fresh-seed replication of the boss knobs lived 0 of 3. The rehearsal lived 0 of 5, so the run is at serious risk before 3:00. This run is one data point and is not tuned to the evaluation seed. Watch: the time of the first chest and first elite kill; hp at 1:00 and 2:00; whether any chest is opened before an evade goal replaces it; how many dashes are spent on pests before 2:00 and whether any is left for the Mascot; and whether an evolution comes by about 2:00.

<!-- review: written by the coach after the run -->

## Summary
The full run (seed TIBO10, Nightmare 2, steam-vent, unchanged playbook) died at 2:14 at level 8 with 364 kills. It did not win, and the ladder stays at Nightmare 2. The earlier runs on this seed lived 2:15 and 2:25.

This death differs from the earlier ones. The bot reached the 2:00 Mascot healthy: 109/120 at 2:00 and 115/120 at 2:12. It had lost only 26 hp in minute 1 and gained 49. The Mascot then took it from 115 to 0 in about 2 seconds (-3, -42, -27, then a lethal hit). Amusing dealt 107.7 damage in total.

It had 0 chests opened, 0 dashes, no evolution, three weapons at 1/8, Hash Brown Shield at 2/8, Root Network 2/5, Lean Lunch 1/5 and max hp 120. Damage dealt was only 8894 in 134 s (about 66 dps), and Steam Vent contributed only 1373 of that.

## What worked
- Minute 0-1 chip damage was low this time: 42 lost then 26 lost, with Root Network and Lean Lunch regen healing it back.
- The one elite fight (E65567, 2:10-2:12) ended in a kill and dropped a chest.
- The forecast did flag the Mascot: it ruled out down-right (-56, -97) and put stand still at -106. Walking away from the telegraphs cost almost nothing for about 3 s.

## What failed
- **Walking into the boss.** The Mascot appeared at 2:00 at 130 units, as three amusing entries at 100%, 100% and 92%. At 2:00 the planner rated Charge the Spud Shrine (122 right) at 42%, the highest. The shrine was in the Mascot's direction. At 2:10 it rated Fight the Snow Mold (124 down-right) 65% and Keep away 40%, with the Mascot 130 away down-right. That began an elite fight beside the boss.
- **Chest left behind.** The kill dropped a chest 64 units down. At 2:12 the planner rated Open the chest 63%, Fight the Snow Mold (92 down) 72% and Keep away 43%, with the Mascot 68 units down. It started another elite fight (E65569). The chest was listed and never opened, and it was under the boss.
- **Dash.** The dash prompt scored 15-22% from 2:10 to 2:13, then 38% at 2:13.9 (hp 69, after the -42 hit) and 49% at 2:14.2, just under 0.5. 0 dashes were used all game and a charge was available. Even bossDashThreshold 0.25 would have fired only after the first big hit.
- **Last moves.** Every non-up move was ruled out at -17 to -108, and the chosen moves read 'no damage' for 1 s, but the Mascot's leap still landed. With a boss that close and 95 enemies, no step was safe.
- **Build.** Seven level-ups at 0:22-2:06 went to Root Network twice, Fry Cook Sentry, Spud Decoy, Lean Lunch and Hash Brown Shield twice. Steam Vent was never among the offered cards, so no commit-to-Steam-Vent rule could have levelled it. Skip was rated 2-4%. No hp passive was taken. The build had about 66 dps and could not hurt three Mascots (92-100% hp when Tibo died).
- **Early hp cliff.** 0:36-0:38 took hp 109 to 84 in 1.5 s at a level-up amid aphids, potato-beetles, sprout-mites and frost-fleas. It is the only cliff before the Mascot.
- **Explore.** 21 explore goals found 0 chests. The first chest was listed at 2:12.

## Moments
1. 2:00, the Mascot appears at 130 units and the planner rates the shrine toward it highest.
2. 2:10-2:12, an elite fight starts 130 units from the boss.
3. 2:12, Open the chest 63% loses to Fight the Snow Mold 72% with the Mascot 68 away.
4. 2:13.9, -42 in one step, dash score 38%.
5. 2:14.2, -27, dash 49%, death.

Comparison with the earlier TIBO10 runs: those died after losing hp in minute 1 or after a 56-hp elite fight. This one had full hp, so hp at 2:00 is not the whole story. Weapon dps and boss handling are the problem. The next ladder level (Nightmare 3) would make the Mascot and every early pest stronger. The run needs to clear 2:00 reliably before anything else matters.

## Next loop
Ordered by how much each would change this death:
1. **Early dps.** Test untried starts that deal several times Steam Vent's damage by 2:00: fry-lance, gravy-boat, spud-lob, deep-fryer, seeker-sprouts. Use damage dealt by 2:00, elites killed, hp at 2:00 and Mascot damage as metrics, not only alive/dead. Binary survival at a 20% base rate needs more seeds than the loop can run.
2. **Mascot anatomy.** Check how many amusing entries spawn on Nightmare 2 (three here) and how much hp they lose to a normal build. If three Mascots at full hp cannot be killed at 2:00, the answer is avoidance or a large dps jump, not hp or dash knobs.
3. **Boss-distance gating.** While any boss is within about 250 units, ranking chest, elite and spot goals low and a move away from the boss high is a behaviour change, not a rewording. Compare it with the plain playbook on paired fresh seeds, and check that chests still open when the boss is far.
4. Stop retesting the dash, elite, explore, distrust and safeMargin knobs and the pick prompts. All were refuted live.
5. Keep replies compact, valid JSON. Loops 5-7 produced no usable plan at all, so 27 iterations were lost.

<!-- /review -->

## Picks

- **0:22** level-up: took Root Network from Root Network, Mash Wave, Mezzaluna.
- **0:22** gained without a pick (a chest or other): Root Network 1/5 new.
- **0:36** level-up: took Fry Cook Sentry from Stuffed Skin, Fry Cook Sentry, Thick Skin.
- **0:36** gained without a pick (a chest or other): Fry Cook Sentry 1/8 new.
- **0:38** level-up: took Spud Decoy from Fry Cook Sentry, Spud Decoy, Packed Pan.
- **0:38** gained without a pick (a chest or other): Spud Decoy 1/8 new.
- **0:54** level-up: took Root Network from Root Network, Spud Decoy, Fry Cook Sentry, Skip (1).
- **0:54** gained without a pick (a chest or other): Root Network 1/5 to 2/5.
- **1:14** level-up: took Lean Lunch from Hot Start, Big Bowl, Lean Lunch, Skip (1).
- **1:14** gained without a pick (a chest or other): Lean Lunch 1/5 new.
- **1:38** level-up: took Hash Brown Shield from Root Network, Hash Brown Shield, Tater Twirl, Skip (1).
- **1:38** gained without a pick (a chest or other): Hash Brown Shield 1/8 new.
- **2:06** level-up: took Hash Brown Shield from Hash Brown Shield, Clean Plate, Lean Lunch, Skip (1).
- **2:06** gained without a pick (a chest or other): Hash Brown Shield 1/8 to 2/8.

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
  "bossDashRange": 0,
  "eliteFrom": 0,
  "eliteMinHp": 0
}
~~~
