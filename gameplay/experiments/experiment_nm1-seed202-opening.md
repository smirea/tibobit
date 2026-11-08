# Can the lockstep playbook survive the first 5 minutes of the seed 202 map where steam-vent died on Nightmare 1

| Field | Value |
| --- | --- |
| Status | running |
| Area | build |
| Result | - |
| Coach | sonnet-medium |
| Created | sonnet-medium L1.I7 |
| Updated | sonnet-medium L1.I7 |

## Hypothesis

Seed 202 killed steam-vent at 166s under live play. Under lockstep the baseline survives, and a shorter planEvery (3) or a peeler start (Mandoline Fury heals) does not do worse.

## Method

Three fresh NM1 seed 202 games, 300s: steam-vent baseline, steam-vent with planEvery 3, peeler start. Compare survival, damage by source and chests opened by 1:35.

## Findings

(none yet)

## Games

### L1.I7.G1: seed202 steam-vent baseline

- Start: a fresh game on Nightmare 1 with steam-vent, seed 202; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 05:00), health 118/120; damage taken 56 (enemy:sand-crab 12.4, boss:the-masher 11.2, enemy:crumb-ant 10.8, enemy:oil-drip 5.7); 2452 kills; level 1 to 16; planner asked 102 times, action model 672, in lockstep; ended with steam-vent 1, mash-snowball 6, locked-gatling 2, tater-twirl 1, reset-button 2, mash-golem 1, packed-pan 1, butter-pat 4, masher-grip 1.
- Damage taken 56, by source: enemy:sand-crab 12.4, boss:the-masher 11.2, enemy:crumb-ant 10.8, enemy:oil-drip 5.7, Spore vent 4.8, enemy:frost-flea 3.7, enemy:sprout-mite 2.3, boss:amusing 2.2.
- Damage dealt 87325, by weapon: mash-snowball 34726.9, locked-gatling 23349.6, tater-twirl 18057.3, reset-button 5061.2, porcupine-spud 2342.4, steam-vent 2120.2, mash-golem 1263.9, grok-bot 403.2.
- Kills 2452, by weapon: mash-snowball 1013, locked-gatling 648, tater-twirl 524, reset-button 124, porcupine-spud 42, steam-vent 38, grok-bot 32, mash-golem 31.
- Bosses killed 3, elites killed 4, boss chests 3, crates bought 0, shrines used 0, items bought 1, revives used 0; gold earned 260, spent 172.
- Made: no evolution, union or evolved item.

### L1.I7.G2: seed202 planEvery 3

- Start: a fresh game on Nightmare 1 with steam-vent, seed 202; 300s; plays the playbook with planEvery 3.
- Outcome: alive after 300.1s (game clock 05:00), health 101/120; damage taken 69 (enemy:lint-bunny 16.8, boss:the-masher 11.2, enemy:potato-beetle 8.9, enemy:sprout-mite 8.2); 2471 kills; level 1 to 17; planner asked 137 times, action model 771, in lockstep; ended with steam-vent 1, mash-snowball 3, spud-cannon 2, hash-harrier 1, julienne-dash 1, broadside 1, masher-grip 3, bacon-bits 2.
- Damage taken 69, by source: enemy:lint-bunny 16.8, boss:the-masher 11.2, enemy:potato-beetle 8.9, enemy:sprout-mite 8.2, enemy:aphid 6.4, enemy:ketchup-drop 5.7, enemy:crumb-ant 4.8, enemy:bog-slime 4.5.
- Damage dealt 84043, by weapon: mash-snowball 33591, hash-hawk 18734.9, broadside 8744.7, spud-cannon 7699.2, julienne-dash 6082, hash-harrier 4312.4, steam-vent 3916.9, grok-bot 961.7.
- Kills 2471, by weapon: mash-snowball 1125, spud-cannon 319, hash-hawk 309, broadside 287, julienne-dash 235, hash-harrier 85, steam-vent 60, grok-bot 51.
- Bosses killed 3, elites killed 4, boss chests 3, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 418, spent 30.
- Made: hash-harrier at 04:44.

### L1.I7.G3: seed202 peeler start

- Start: a fresh game on Nightmare 1 with peeler, seed 202; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 05:00), health 120/120; damage taken 93 (boss:beetle-queen 20.9, enemy:snow-mold 20.4, boss:amusing 15.5, Spore vent 6.5); 3770 kills; level 1 to 19; planner asked 107 times, action model 435, in lockstep; ended with peeler 1, seed-potato 2, gratin-arc 1, starch-bolt 1, hash-brown-shield 2, chives 4, lean-lunch 1, hot-sauce 1, sprouting-eyes 2, starch-plating 1, butter-pat 1.
- Damage taken 93, by source: boss:beetle-queen 20.9, enemy:snow-mold 20.4, boss:amusing 15.5, Spore vent 6.5, enemy:sprout-mite 6.1, enemy:compost-maggot 5.9, enemy:beetle-brood 4.8, enemy:frost-flea 3.9.
- Damage dealt 118551, by weapon: gratin-arc 74906.2, starch-chain 27181.8, starch-bolt 6958.7, seed-potato 6395.9, peeler 2714.8, grok-bot 393.9.
- Kills 3770, by weapon: gratin-arc 2089, starch-chain 1090, starch-bolt 254, seed-potato 247, peeler 78, grok-bot 12.
- Bosses killed 3, elites killed 4, boss chests 4, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 457, spent 0.
- Made: gratin-arc at 03:33.
