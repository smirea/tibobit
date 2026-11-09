# Do the boss dash-threshold knobs save a dash charge for the Mascot on live NM2

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | inconclusive |
| Created | L4.I10 |
| Updated | L5.I4 |

## Hypothesis

bossDashThreshold 0.25 with bossDashRange 150 (dashThreshold 0.5 unchanged) makes the bot dash when the Mascot is close instead of spending dashes on pests and firing only when every move is lethal, and lives more often than the unchanged playbook on the seeds where it died.

## Method

Four fresh live NM2 steam-vent games of 300s on seeds 1919, 4141, 2121 and 1313 with only the knobs changed, paired against the earlier unchanged live controls on the same seeds (all died). Compare dashes and when they fire relative to the Mascot, Mascot damage, hp at 2:30 and survival to 5:00. Confirmed only at 4 of 4 alive; refuted at 1 or fewer. Four seeds is below the five per arm, so a clean result stays a lead.

## Findings

2 of 5 alive (1919, 4141) against controls 0 of 5; 4444 died 3:10 after 23 dashes, 10 spent on pests at low hp. Not 4 of 5, not 1 or fewer. Dashes in the dead games went to pests, but raising dashThreshold made it worse (nm2-dash-save-threshold). Not shipped; a repeat on fresh seeds is possible if the opening gets fixed.

## Games

### L5.I2.G1: boss dash 0.25/150 s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with bossDashThreshold 0.25, bossDashRange 150.
- Outcome: alive after 300.2s (game clock 05:00), health 120/120; damage taken 125 (boss:amusing 31.3, enemy:sand-crab 27.1, boss:beetle-queen 17.1, enemy:aphid 13.3); 2576 kills; level 1 to 17; planner asked 141 times, action model 362; the models saw the game 28 ms late (p90 52); ended with steam-vent 8, tater-minigun 1, eclipse-scythe 1, factory-reset 1, hash-bulwark 1, harvest-moon 1, big-bowl 3, four-eyed-spud 1, masher-grip 2, starch-plating 1, root-network 1.
- Damage taken 125, by source: boss:amusing 31.3, enemy:sand-crab 27.1, boss:beetle-queen 17.1, enemy:aphid 13.3, Hot oil 10.4, Brambles 8.6, enemy:potato-beetle 7.7, enemy:oil-drip 4.
- Damage dealt 128997, by weapon: eclipse-scythe 61034.2, tater-minigun 26106.1, locked-gatling 10327.2, hash-bulwark 7480.2, factory-reset 5771.9, steam-vent 5539.1, reset-button 4820, grok-bot 2876.2.
- Kills 2576, by weapon: eclipse-scythe 1272, tater-minigun 501, locked-gatling 331, factory-reset 125, reset-button 97, comet-scythe 85, steam-vent 53, grok-bot 53.
- Bosses killed 9, elites killed 15, boss chests 24, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1505, spent 0.
- Made: eclipse-scythe at 01:45, factory-reset at 02:32, tater-minigun at 03:07, hash-bulwark at 03:24.

### L5.I2.G2: boss dash 0.25/150 s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with bossDashThreshold 0.25, bossDashRange 150.
- Outcome: alive after 300.3s (game clock 05:00), health 120/120; damage taken 230 (boss:beetle-queen 67.7, boss:amusing 59.1, enemy:snow-mold 46.9, Spore vent 11.6); 4000 kills; level 1 to 20; planner asked 129 times, action model 535; the models saw the game 30 ms late (p90 69); ended with pressure-cooker 1, mashquake 1, hash-harrier 1, locked-gatling 8, spud-dynamo 1, hot-streak 1, root-network 3, big-bowl 1, gpu 2, bacon-bits 2, masher-grip 1.
- Damage taken 230, by source: boss:beetle-queen 67.7, boss:amusing 59.1, enemy:snow-mold 46.9, Spore vent 11.6, enemy:tomato-leech 6.6, enemy:potato-beetle 6.5, enemy:spittlebug 5.2, Hot oil 4.3.
- Damage dealt 184372, by weapon: mashquake 74817.5, locked-gatling 23527.4, pressure-cooker 22217.7, hash-harrier 19085.9, hash-hawk 15953.4, mash-wave 13211.4, steam-vent 9411.5, spud-dynamo 4810.9.
- Kills 4000, by weapon: mashquake 1795, locked-gatling 491, mash-wave 414, steam-vent 348, pressure-cooker 339, hash-harrier 301, hash-hawk 216, spud-dynamo 59.
- Bosses killed 12, elites killed 9, boss chests 18, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 1500, spent 30.
- Made: pressure-cooker at 02:57, mashquake at 03:15, hash-harrier at 04:05.

### L5.I2.G3: boss dash 0.25/150 s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with bossDashThreshold 0.25, bossDashRange 150.
- Outcome: died after 129.1s (game clock 02:09); damage taken 193 (boss:amusing 79.9, enemy:tomato-leech 42, Hot oil 20.5, enemy:little-grey 9.3); 246 kills; level 1 to 8; planner asked 49 times, action model 380; the models saw the game 29 ms late (p90 52); ended with steam-vent 3, gravy-boat 1, julienne-dash 1, gravy-heart 3, root-network 1.
- Damage taken 193, by source: boss:amusing 79.9, enemy:tomato-leech 42, Hot oil 20.5, enemy:little-grey 9.3, enemy:aphid 8.1, enemy:ketchup-drop 7.2, enemy:bog-slime 7.1, enemy:sprout-mite 6.1; the killing blow: boss:amusing.
- Damage dealt 6310, by weapon: gravy-boat 2863.6, steam-vent 1649, julienne-dash 1638.8, grok-bot 158.8.
- Kills 246, by weapon: gravy-boat 115, steam-vent 68, julienne-dash 51, grok-bot 12.
- Bosses killed 0, elites killed 2, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 45, spent 0.
- Made: no evolution, union or evolved item.

### L5.I2.G4: boss dash 0.25/150 s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with bossDashThreshold 0.25, bossDashRange 150.
- Outcome: died after 127.5s (game clock 02:07); damage taken 144 (enemy:sand-crab 71.5, boss:amusing 13.9, enemy:garden-slug 11.9, enemy:sprout-mite 8.4); 366 kills; level 1 to 9; planner asked 49 times, action model 456; the models saw the game 27 ms late (p90 48); ended with steam-vent 2, whisk-vortex 1, spud-lob 2, harvest-moon 1, mash-finisher 1, root-network 1, butter-socks 1.
- Damage taken 144, by source: enemy:sand-crab 71.5, boss:amusing 13.9, enemy:garden-slug 11.9, enemy:sprout-mite 8.4, enemy:potato-beetle 7, Hot oil 6.2, enemy:compost-maggot 6, enemy:oil-drip 3.7; the killing blow: enemy:garden-slug.
- Damage dealt 10879, by weapon: whisk-vortex 5783.6, spud-lob 2729.7, steam-vent 1501.2, harvest-moon 864.3.
- Kills 366, by weapon: whisk-vortex 224, spud-lob 88, steam-vent 32, harvest-moon 22.
- Bosses killed 0, elites killed 3, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 43, spent 0.
- Made: no evolution, union or evolved item.

### L5.I3.G1: boss dash 0.25/150 s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook with bossDashThreshold 0.25, bossDashRange 150.
- Outcome: died after 190s (game clock 03:10); damage taken 214 (enemy:potato-beetle 72.7, boss:amusing 41.7, enemy:wireworm-larva 40.8, boss:beetle-queen 17.1); 887 kills; level 1 to 12; planner asked 69 times, action model 646; the models saw the game 28 ms late (p90 63); ended with steam-vent 1, root-spikes 1, julienne-dash 1, mash-snowball 2, fry-lance 4, seed-potato 1, hot-start 1, spud-sneakers 1.
- Damage taken 214, by source: enemy:potato-beetle 72.7, boss:amusing 41.7, enemy:wireworm-larva 40.8, boss:beetle-queen 17.1, Brambles 12.8, enemy:lint-bunny 8.8, enemy:sprout-mite 8.5, enemy:cave-grub 4.8; the killing blow: boss:beetle-queen.
- Damage dealt 29331, by weapon: mash-snowball 11318.2, fry-lance 5271.5, root-spikes 4729.4, julienne-dash 4070.5, steam-vent 1419, seed-potato 1415.2, grok-bot 636.1, alex 470.8.
- Kills 887, by weapon: mash-snowball 355, root-spikes 200, fry-lance 166, julienne-dash 66, seed-potato 35, grok-bot 31, alex 21, steam-vent 13.
- Bosses killed 3, elites killed 6, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 107, spent 0.
- Made: no evolution, union or evolved item.
