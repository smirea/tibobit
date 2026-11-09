# Does safeMargin 0 (always the safest rated move) cut live NM2 minute 0-1 damage

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | refuted |
| Created | L5.I6 |
| Updated | L5.I7 |

## Hypothesis

With safeMargin 0.1, the action model's usefulness rating can pick a slightly riskier step in a crowd. With safeMargin 0 only the safest-rated step is taken when the model is asked, so minute 0-1 chip damage from chargers and pests falls and the bot reaches 2:00 with enough hp to evolve and survive the Mascot.

## Method

Five fresh live NM2 steam-vent games of 300s on 1919, 4141, 2121, 1313 and 4444, where the unchanged playbook lived 0 of 5, changing only knobs.safeMargin to 0. Compare hp at 1:00 and 2:00, dashes, chests, first evolution and survival. Confirmed at 4 of 5 alive at 5:00 with an evolution by about 2:30. Refuted at 2 or fewer. Check chests do not starve.

## Findings

L5.I6: safeMargin 0 lived 0 of 5 (died 2:08-3:04) on seeds where the unchanged playbook lived 0 of 5. Minute 0-1 hp loss stayed at 36-171 and dashes still went to single pests at 51-54% scores. Not adopted. See B132.

## Games

### L5.I6.G1: safeMargin 0 s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with safeMargin 0.
- Outcome: died after 135.2s (game clock 02:15); damage taken 152 (enemy:fry-fly 73.9, enemy:sand-crab 25.9, boss:amusing 10.4, enemy:sprout-mite 9.7); 143 kills; level 1 to 7; planner asked 47 times, action model 509; the models saw the game 29 ms late (p90 49); ended with steam-vent 4, peel-out 2, root-network 1.
- Damage taken 152, by source: enemy:fry-fly 73.9, enemy:sand-crab 25.9, boss:amusing 10.4, enemy:sprout-mite 9.7, enemy:aphid 8.5, enemy:oil-drip 6, enemy:ketchup-drop 5.5, enemy:potato-beetle 4.9; the killing blow: enemy:fry-fly.
- Damage dealt 4974, by weapon: steam-vent 4644.9, grok-bot 329.5.
- Kills 143, by weapon: steam-vent 140, grok-bot 3.
- Bosses killed 0, elites killed 1, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 11, spent 0.
- Made: no evolution, union or evolved item.

### L5.I6.G2: safeMargin 0 s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with safeMargin 0.
- Outcome: died after 184s (game clock 03:04); damage taken 224 (enemy:spittlebug 62.2, boss:amusing 55.6, enemy:aphid 34.9, enemy:snow-mold 22.5); 623 kills; level 1 to 11; planner asked 66 times, action model 661; the models saw the game 29 ms late (p90 53); ended with steam-vent 6, tater-twirl 2, mash-golem 1, potato-rain 1, root-network 1, stuffed-skin 1.
- Damage taken 224, by source: enemy:spittlebug 62.2, boss:amusing 55.6, enemy:aphid 34.9, enemy:snow-mold 22.5, enemy:sprout-mite 11.7, enemy:frost-flea 7.3, enemy:potato-beetle 7.1, boss:beetle-queen 5.7; the killing blow: boss:beetle-queen.
- Damage dealt 17728, by weapon: tater-twirl 7993, steam-vent 6375.1, potato-rain 2301.7, mash-golem 867.7, grok-bot 190.2.
- Kills 623, by weapon: tater-twirl 316, steam-vent 176, potato-rain 90, mash-golem 29, grok-bot 12.
- Bosses killed 3, elites killed 3, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 61, spent 0.
- Made: no evolution, union or evolved item.

### L5.I6.G3: safeMargin 0 s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with safeMargin 0.
- Outcome: died after 128.7s (game clock 02:08); damage taken 145 (enemy:tomato-leech 75.3, boss:amusing 55.6, enemy:cave-grub 6.6, enemy:ketchup-drop 3.6); 424 kills; level 1 to 11; planner asked 50 times, action model 478; the models saw the game 30 ms late (p90 61); ended with steam-vent 1, mash-snowball 2, broadside 2, locked-gatling 6, seed-potato 1, deep-fryer 1, masher-grip 1.
- Damage taken 145, by source: enemy:tomato-leech 75.3, boss:amusing 55.6, enemy:cave-grub 6.6, enemy:ketchup-drop 3.6, enemy:aphid 2.4, enemy:lint-bunny 1.6; the killing blow: boss:amusing.
- Damage dealt 17256, by weapon: mash-snowball 6782, locked-gatling 4276, broadside 3592.2, steam-vent 1049.1, seed-potato 963.7, deep-fryer 442.8, grok-bot 150.
- Kills 424, by weapon: mash-snowball 194, locked-gatling 103, broadside 62, seed-potato 35, steam-vent 14, grok-bot 10, deep-fryer 6.
- Bosses killed 0, elites killed 9, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 282, spent 0.
- Made: no evolution, union or evolved item.

### L5.I6.G4: safeMargin 0 s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with safeMargin 0.
- Outcome: died after 143.4s (game clock 02:23); damage taken 176 (enemy:potato-beetle 70.8, boss:amusing 20.9, enemy:aphid 17.7, enemy:crumb-ant 15.1); 234 kills; level 1 to 8; planner asked 52 times, action model 506; the models saw the game 29 ms late (p90 52); ended with steam-vent 4, spud-dynamo 1, masher-grip 1, root-network 2.
- Damage taken 176, by source: enemy:potato-beetle 70.8, boss:amusing 20.9, enemy:aphid 17.7, enemy:crumb-ant 15.1, enemy:oil-drip 11.5, enemy:fry-fly 11.4, enemy:sand-crab 7.9, enemy:compost-maggot 7.6; the killing blow: boss:amusing.
- Damage dealt 5278, by weapon: steam-vent 2761.2, spud-dynamo 2517.1.
- Kills 234, by weapon: steam-vent 136, spud-dynamo 98.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 18, spent 0.
- Made: no evolution, union or evolved item.

### L5.I6.G5: safeMargin 0 s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook with safeMargin 0.
- Outcome: died after 130.9s (game clock 02:10); damage taken 163 (boss:amusing 88.6, enemy:sand-crab 32.2, enemy:aphid 10.2, enemy:sprout-mite 6.4); 222 kills; level 1 to 8; planner asked 49 times, action model 382; the models saw the game 29 ms late (p90 52); ended with steam-vent 1, frozen-fries 2, mezzaluna 1, hot-sauce 1, starch-plating 3.
- Damage taken 163, by source: boss:amusing 88.6, enemy:sand-crab 32.2, enemy:aphid 10.2, enemy:sprout-mite 6.4, enemy:potato-beetle 4.9, enemy:bog-slime 4.7, enemy:crumb-ant 3.1, enemy:ketchup-drop 2.5; the killing blow: boss:amusing.
- Damage dealt 6306, by weapon: steam-vent 2372.9, mezzaluna 2041.7, frozen-fries 1549.3, grok-bot 342.5.
- Kills 222, by weapon: steam-vent 91, mezzaluna 70, frozen-fries 50, grok-bot 11.
- Bosses killed 0, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 16, spent 0.
- Made: no evolution, union or evolved item.
