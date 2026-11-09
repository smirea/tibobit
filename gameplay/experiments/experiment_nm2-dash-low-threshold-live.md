# Does a lower normal dashThreshold (0.3) with the boss dash knobs cut live NM2 minute 0-1 hp loss

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | refuted |
| Created | L8.I1 |
| Updated | L8.I6 |

## Hypothesis

At dashThreshold 0.5 the dash fires only at 13-40% hp on single pests (scores 51-58%), after the minute 0-1 chip damage has already taken 80-130 hp. A threshold of 0.3, with bossDashThreshold 0.25 and range 150 (the only arm above baseline, 2 of 5), dashes out of a closing crowd while hp is still high and so reaches 2:00 with more hp and an earlier evolution.

## Method

Five fresh live NM2 steam-vent games of 300s on 1919, 4141, 2121, 1313 and 4444, where the unchanged playbook lived 0 of 5. Change only knobs: dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150. Compare hp at 1:00 and 2:00, dash times and dash scores, chests, first evolution and survival. Confirmed at 4 of 5 alive at 5:00 with an evolution by about 2:30; refuted at 2 or fewer of 5. Check that all charges are not gone before 2:00 and that chests do not starve.

## Findings

L8.I4-I5: 2 of 5 alive (1919, 4444); 4141, 2121 and 1313 died at 3:15, 2:00 and 2:21 after 21-25 dashes each. Same as the boss knobs alone (2 of 5). Refuted by the rule. See B137.

## Games

### L8.I1.G1: dash 0.3 + boss knobs s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot1: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I1.G2: dash 0.3 + boss knobs s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot2: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I1.G3: dash 0.3 + boss knobs s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot3: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I1.G4: dash 0.3 + boss knobs s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot4: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I1.G5: dash 0.3 + boss knobs s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot5: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I2.G1: dash 0.3 + boss knobs s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot1: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I2.G2: dash 0.3 + boss knobs s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot2: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I2.G3: dash 0.3 + boss knobs s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot3: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I3.G1: dash 0.3 + boss knobs s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot1: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I3.G2: dash 0.3 + boss knobs s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot2: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I3.G3: dash 0.3 + boss knobs s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot3: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I4.G1: dash 0.3 + boss knobs s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: alive after 300.1s (game clock 05:00), health 119/120; damage taken 111 (enemy:garden-slug 49.9, enemy:potato-beetle 20.7, enemy:wireworm-larva 11.2, boss:beetle-queen 9.7); 2899 kills; level 1 to 19; planner asked 128 times, action model 114; the models saw the game 30 ms late (p90 69); ended with steam-vent 1, wildfire-roast 1, eclipse-scythe 1, cast-iron 1, spud-grid 1, hash-brown-shield 7, starch-plating 2, thick-skin 1, root-network 3, big-bowl 1, hot-sauce 1.
- Damage taken 111, by source: enemy:garden-slug 49.9, enemy:potato-beetle 20.7, enemy:wireworm-larva 11.2, boss:beetle-queen 9.7, enemy:spittlebug 5.6, Spore vent 5.4, enemy:aphid 2.5, enemy:bog-slime 1.7.
- Damage dealt 125610, by weapon: wildfire-roast 76233.7, cast-iron 17176.2, spud-grid 10552.2, hot-streak 8151, comet-scythe 4712.8, potato-battery 3539.9, eclipse-scythe 2724, frying-pan 1116.7.
- Kills 2899, by weapon: wildfire-roast 1793, cast-iron 358, hot-streak 265, spud-grid 208, potato-battery 94, comet-scythe 75, eclipse-scythe 44, frying-pan 36.
- Bosses killed 9, elites killed 12, boss chests 21, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1352, spent 0.
- Made: wildfire-roast at 01:52, cast-iron at 02:20, eclipse-scythe at 03:37, spud-grid at 03:45.

### L8.I4.G2: dash 0.3 + boss knobs s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: died after 195.4s (game clock 03:15); damage taken 325 (boss:amusing 77.1, enemy:snow-mold 69.4, boss:beetle-queen 41.8, enemy:wireworm-larva 24.1); 663 kills; level 1 to 12; planner asked 76 times, action model 354; the models saw the game 32 ms late (p90 78); ended with steam-vent 4, julienne-dash 1, mash-snowball 8, lean-lunch 3, starch-plating 3, butter-pat 1.
- Damage taken 325, by source: boss:amusing 77.1, enemy:snow-mold 69.4, boss:beetle-queen 41.8, enemy:wireworm-larva 24.1, enemy:tomato-leech 23.3, enemy:beetle-brood 17.6, enemy:spittlebug 16.6, Hot oil 9.4; the killing blow: enemy:wireworm-larva.
- Damage dealt 31824, by weapon: mash-snowball 15198.5, julienne-dash 9246.4, steam-vent 6663.1, grok-bot 716.4.
- Kills 663, by weapon: mash-snowball 294, julienne-dash 172, steam-vent 161, grok-bot 36.
- Bosses killed 3, elites killed 6, boss chests 6, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 465, spent 0.
- Made: no evolution, union or evolved item.

### L8.I4.G3: dash 0.3 + boss knobs s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: died after 120.9s (game clock 02:00); damage taken 122 (enemy:tomato-leech 44.7, enemy:beetle-brood 16, Hot oil 12, boss:beetle-queen 10.3); 278 kills; level 1 to 7; planner asked 44 times, action model 228; the models saw the game 28 ms late (p90 65); ended with steam-vent 1, locked-gatling 1, reset-button 5, four-eyed-spud 2.
- Damage taken 122, by source: enemy:tomato-leech 44.7, enemy:beetle-brood 16, Hot oil 12, boss:beetle-queen 10.3, enemy:oil-drip 6.2, enemy:sprout-mite 5.9, enemy:potato-beetle 5.6, enemy:crumb-ant 4.9; the killing blow: enemy:beetle-brood.
- Damage dealt 10754, by weapon: locked-gatling 5362.8, reset-button 3906.1, steam-vent 1103.3, grok-bot 381.5.
- Kills 278, by weapon: locked-gatling 205, reset-button 46, steam-vent 24, grok-bot 3.
- Bosses killed 0, elites killed 9, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 71, spent 0.
- Made: no evolution, union or evolved item.

### L8.I5.G1: dash 0.3 + boss knobs s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: died after 141.8s (game clock 02:21); damage taken 121 (enemy:cave-grub 32.9, boss:amusing 26.5, enemy:wireworm-larva 12.2, enemy:crumb-ant 10.6); 330 kills; level 1 to 10; planner asked 52 times, action model 449; the models saw the game 28 ms late (p90 56); ended with steam-vent 1, hash-hawk 1, broadside 1, potato-rain 1, comet-scythe 3, spud-dynamo 1, mash-finisher 2, starch-plating 1.
- Damage taken 121, by source: enemy:cave-grub 32.9, boss:amusing 26.5, enemy:wireworm-larva 12.2, enemy:crumb-ant 10.6, enemy:potato-beetle 7.5, enemy:compost-maggot 6.6, enemy:aphid 6.6, enemy:fry-fly 5.1; the killing blow: boss:amusing.
- Damage dealt 12710, by weapon: hash-hawk 5793.6, comet-scythe 1951, broadside 1883.7, steam-vent 1460.1, potato-rain 954.8, spud-dynamo 666.3.
- Kills 330, by weapon: hash-hawk 84, broadside 75, steam-vent 63, comet-scythe 55, potato-rain 37, spud-dynamo 16.
- Bosses killed 0, elites killed 6, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 123, spent 0.
- Made: no evolution, union or evolved item.

### L8.I5.G2: dash 0.3 + boss knobs s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: alive after 300.2s (game clock 05:00), health 120/120; damage taken 104 (enemy:snow-mold 44.3, boss:the-masher 26.9, Brambles 11.3, enemy:frost-flea 4.4); 3644 kills; level 1 to 19; planner asked 132 times, action model 275; the models saw the game 31 ms late (p90 57); ended with steam-vent 1, cold-storage 1, hash-harrier 1, spud-grid 1, spud-cannon 1, comet-scythe 1, starch-plating 5, bacon-bits 1, slow-cooker 2, root-network 1, gravy-splash 1, butter-pat 1.
- Damage taken 104, by source: enemy:snow-mold 44.3, boss:the-masher 26.9, Brambles 11.3, enemy:frost-flea 4.4, enemy:lint-bunny 3.7, enemy:sprout-mite 3.6, enemy:aphid 3.6, enemy:bog-slime 3.
- Damage dealt 160473, by weapon: hash-harrier 79229.6, spud-grid 30188.5, cold-storage 18165.9, potato-battery 9592.4, root-cellar 6764.5, spud-cannon 6027.7, hash-hawk 5466.5, alex 3309.3.
- Kills 3644, by weapon: hash-harrier 1496, spud-grid 740, cold-storage 478, potato-battery 340, spud-cannon 145, steam-vent 121, root-cellar 119, alex 100.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1352, spent 0.
- Made: hash-harrier at 01:50, cold-storage at 03:12, spud-grid at 04:06.
