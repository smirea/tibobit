# Can the bot survive the 2:00 Festival Mascot on Nightmare 10

| Field | Value |
| --- | --- |
| Status | done |
| Area | bosses |
| Result | inconclusive |
| Coach | sonnet-high |
| Created | sonnet-high L1.I3 |
| Updated | sonnet-high L1.I4 |

## Hypothesis

The one-second forecast does not include boss attacks, and reaction lag makes dodges land late. Lockstep 1 and a wide boss range (distrustBossRange and bossOfferRange at 300) let the action model dodge amusing, which cuts boss damage well below the 74 to 99 seen with the live playbook.

## Method

From one Nightmare 10 gym (1:45, steam-vent 4, tater-twirl 3, gravy-heart 2, big-bowl 2, full hp) play 90s three ways: lockstep 1; lockstep 1 with the boss ranges at 300; a live control. Repeat on fresh seed 101 for 240s with lockstep 1 and with lockstep 1 plus the boss ranges, and compare with the I2 baselines on that seed. Compare boss:amusing damage, survival past 2:30 and health at 3:00.

## Findings

L1.I3: lockstep 1 survived the 2:00 and 3:00 bosses on fresh seed 101 (alive at 240s in both games; live I2 games died at 132-142s). Boss ranges 300 cut amusing damage (39.5 vs 123.5) but raised beetle-queen damage and did not lower total damage, so that half is unresolved. The gym was too easy to separate the variants. Boss ranges are rechecked from later Nightmare 1 gyms in late-game-nm1.

## Games

### L1.I3.G1: gym lockstep 1

- Start: gym boss-nm10-strong (Nightmare 10 at 01:45), seed 18OA3TT; 90s; plays the playbook with lockstep 1.
- Outcome: alive after 90s (game clock 03:15), health 163/163; damage taken 16 (Spore vent 10.3, boss:beetle-queen 5.4); 1156 kills; level 10 to 15; planner asked 31 times, action model 119, in lockstep; ended with pressure-cooker 1, tater-twirl 4, julienne-dash 2, comet-scythe 2, harvest-moon 1, gravy-heart 3, big-bowl 3, root-network 4, hearty-helping 1.
- Damage taken 16, by source: Spore vent 10.3, boss:beetle-queen 5.4.
- Damage dealt 35398, by weapon: pressure-cooker 15664.8, steam-vent 9780.1, tater-twirl 4417.8, harvest-moon 2245.1, comet-scythe 2088.2, julienne-dash 1202.3.
- Kills 1156, by weapon: pressure-cooker 527, steam-vent 419, tater-twirl 94, harvest-moon 45, julienne-dash 41, comet-scythe 30.
- Bosses killed 6, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 342, spent 0.
- Made: [object Object].

### L1.I3.G2: gym lockstep 1 + boss ranges 300

- Start: gym boss-nm10-strong (Nightmare 10 at 01:45), seed 18OA3TT; 90s; plays the playbook with lockstep 1, distrustBossRange 300, bossOfferRange 300.
- Outcome: alive after 90.1s (game clock 03:15), health 149/149; damage taken 8 (Spore vent 3.1, enemy:compost-maggot 2.3, enemy:aphid 2.3); 1459 kills; level 10 to 16; planner asked 30 times, action model 117, in lockstep; ended with pressure-cooker 1, tater-twister 1, julienne-dash 6, comet-scythe 2, harvest-moon 1, hot-streak 1, gravy-heart 2, big-bowl 4, root-network 5, salt-shaker 1.
- Damage taken 8, by source: Spore vent 3.1, enemy:compost-maggot 2.3, enemy:aphid 2.3.
- Damage dealt 38191, by weapon: pressure-cooker 22463.7, steam-vent 5444.2, tater-twirl 3432.6, hot-streak 2483.6, harvest-moon 1669.6, comet-scythe 1109.9, julienne-dash 915.6, tater-twister 671.9.
- Kills 1459, by weapon: pressure-cooker 1033, steam-vent 158, hot-streak 140, tater-twirl 59, harvest-moon 29, comet-scythe 22, julienne-dash 14, tater-twister 4.
- Bosses killed 6, elites killed 0, boss chests 5, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 530, spent 0.
- Made: [object Object], [object Object].

### L1.I3.G3: gym live control

- Start: gym boss-nm10-strong (Nightmare 10 at 01:45), seed 18OA3TT; 90s; plays the playbook with lockstep 0.
- Outcome: alive after 90.2s (game clock 03:15), health 149/149; damage taken 36 (boss:amusing 10, enemy:sock-pile 4.8, enemy:potato-beetle 4.7, enemy:snow-mold 4.6); 1621 kills; level 10 to 16; planner asked 33 times, action model 65, live; ended with pressure-cooker 1, tater-twister 1, julienne-dash 3, comet-scythe 1, harvest-moon 1, hot-streak 1, gravy-heart 2, big-bowl 4, root-network 5, salt-shaker 1.
- Damage taken 36, by source: boss:amusing 10, enemy:sock-pile 4.8, enemy:potato-beetle 4.7, enemy:snow-mold 4.6, enemy:cave-grub 4.6, boss:beetle-queen 2.7, enemy:lint-bunny 2.4, enemy:compost-maggot 2.3.
- Damage dealt 42231, by weapon: pressure-cooker 28729.1, hot-streak 4483.1, steam-vent 3893.2, tater-twirl 2216.5, harvest-moon 998.4, tater-twister 867.6, comet-scythe 591.8, julienne-dash 451.2.
- Kills 1621, by weapon: pressure-cooker 1182, hot-streak 267, steam-vent 92, tater-twirl 39, julienne-dash 18, harvest-moon 10, tater-twister 9, comet-scythe 4.
- Bosses killed 6, elites killed 3, boss chests 5, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 475, spent 0.
- Made: [object Object], [object Object].

### L1.I3.G4: fresh seed 101 lockstep 1

- Start: a fresh game on Nightmare 10 with steam-vent, seed 101; 240s; plays the playbook with lockstep 1.
- Outcome: alive after 240s (game clock 04:00), health 163/163; damage taken 172 (boss:amusing 123.5, enemy:aphid 14.8, boss:beetle-queen 12.2, enemy:little-grey 11.7); 2099 kills; level 1 to 17; planner asked 89 times, action model 631, in lockstep; ended with steam-vent 1, tater-twirl 5, mandoline-fury 1, broadside 1, frozen-fries 1, potato-rain 1, packed-pan 2, peel-out 3, gravy-heart 3, big-bowl 1.
- Damage taken 172, by source: boss:amusing 123.5, enemy:aphid 14.8, boss:beetle-queen 12.2, enemy:little-grey 11.7, enemy:snow-mold 4.3, enemy:frost-flea 2.2, Hot oil 2, enemy:sprout-mite 1.7.
- Damage dealt 219553, by weapon: mandoline-fury 117192.2, tater-twirl 34669.5, broadside 29740.2, peeler 19730.4, grok-bot 9066, potato-rain 4007.7, frozen-fries 3076.4, steam-vent 2070.7.
- Kills 2099, by weapon: mandoline-fury 897, tater-twirl 494, broadside 330, peeler 226, grok-bot 84, steam-vent 27, potato-rain 25, frozen-fries 16.
- Bosses killed 6, elites killed 6, boss chests 8, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 652, spent 0.
- Made: [object Object].

### L1.I3.G5: fresh seed 101 lockstep 1 + boss ranges

- Start: a fresh game on Nightmare 10 with steam-vent, seed 101; 240s; plays the playbook with lockstep 1, distrustBossRange 300, bossOfferRange 300.
- Outcome: alive after 240s (game clock 04:00), health 69/120; damage taken 152 (boss:amusing 39.5, boss:beetle-queen 36.7, enemy:little-grey 18.8, enemy:sand-crab 14.2); 1397 kills; level 1 to 14; planner asked 82 times, action model 506, in lockstep; ended with steam-vent 2, hot-streak 2, reset-button 7, mash-landing 1, root-network 2, chives 2, four-eyed-spud 1.
- Damage taken 152, by source: boss:amusing 39.5, boss:beetle-queen 36.7, enemy:little-grey 18.8, enemy:sand-crab 14.2, enemy:spittlebug 12.4, enemy:potato-beetle 9.8, enemy:garden-slug 7.7, enemy:fry-fly 5.2.
- Damage dealt 146612, by weapon: hot-streak 113998.9, reset-button 28080.7, steam-vent 3716.3, grok-bot 816.4.
- Kills 1397, by weapon: hot-streak 1108, reset-button 234, steam-vent 43, grok-bot 12.
- Bosses killed 3, elites killed 6, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 264, spent 0.
- Made: no evolution, union or evolved item.

### L1.I5.G1: strong gym lockstep baseline

- Start: gym boss-nm10-strong (Nightmare 10 at 01:45), seed 18OA3TT; 150s; plays the playbook.
- Outcome: alive after 150s (game clock 04:15), health 163/163; damage taken 22 (Spore vent 10.1, boss:beetle-queen 5.4, enemy:compost-maggot 2.3, enemy:aphid 2.3); 2292 kills; level 10 to 19; planner asked 53 times, action model 204, in lockstep; ended with pressure-cooker 1, tater-twirl 6, julienne-dash 3, comet-scythe 1, harvest-moon 2, frozen-fries 1, gravy-heart 3, big-bowl 4, root-network 5, chives 1.
- Damage taken 22, by source: Spore vent 10.1, boss:beetle-queen 5.4, enemy:compost-maggot 2.3, enemy:aphid 2.3, enemy:lint-bunny 2.
- Damage dealt 66770, by weapon: pressure-cooker 29483.3, steam-vent 17122.4, tater-twirl 6531.2, harvest-moon 4709, comet-scythe 3658.3, julienne-dash 3167.5, frozen-fries 1939.6, grok-bot 159.
- Kills 2292, by weapon: pressure-cooker 1105, steam-vent 713, tater-twirl 160, harvest-moon 112, julienne-dash 98, comet-scythe 68, frozen-fries 30, grok-bot 6.
- Bosses killed 6, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 472, spent 0.
- Made: [object Object].

### L1.I5.G2: strong gym boss ranges 300

- Start: gym boss-nm10-strong (Nightmare 10 at 01:45), seed 18OA3TT; 150s; plays the playbook with distrustBossRange 300, bossOfferRange 300.
- Outcome: alive after 150.3s (game clock 04:15), health 163/163; damage taken 50 (boss:beetle-queen 32.6, Spore vent 12.7, enemy:compost-maggot 2.3, enemy:aphid 2.3); 3079 kills; level 10 to 20; planner asked 56 times, action model 237, in lockstep; ended with pressure-cooker 1, tater-twirl 5, julienne-dash 2, comet-scythe 3, harvest-moon 2, starch-bolt 1, gravy-heart 3, big-bowl 3, root-network 5, sour-cream 1.
- Damage taken 50, by source: boss:beetle-queen 32.6, Spore vent 12.7, enemy:compost-maggot 2.3, enemy:aphid 2.3.
- Damage dealt 88867, by weapon: pressure-cooker 55281.5, steam-vent 13698, tater-twirl 5474.3, harvest-moon 4418.1, starch-bolt 4230.8, comet-scythe 3774.7, julienne-dash 1936.6, grok-bot 53.3.
- Kills 3079, by weapon: pressure-cooker 1942, steam-vent 658, comet-scythe 129, tater-twirl 111, starch-bolt 107, harvest-moon 65, julienne-dash 61, grok-bot 6.
- Bosses killed 9, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 593, spent 0.
- Made: [object Object].
