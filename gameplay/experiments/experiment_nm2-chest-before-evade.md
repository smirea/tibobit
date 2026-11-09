# Does letting a nearby chest outrank evading at any hp keep power flowing on live NM2

| Field | Value |
| --- | --- |
| Status | done |
| Area | spots |
| Result | refuted |
| Created | L4.I10 |
| Updated | L5.I2 |

## Hypothesis

In the chest-first goal text, replace the low-hp clause with: a chest within about 150 units and no boss within 200 is rated highest at any hp; otherwise food and evading. Bots that kill an elite then open the chests it dropped, reach more picks and an evolution by about 2:30, and live 5:00 more often than the unchanged text.

## Method

Five fresh live NM2 steam-vent games of 300s on seeds 1919, 4141, 2121, 1313 and 4444, with only planner.goal changed: a chest within about 150 units and no boss within 200 is rated highest at any hp. Paired against earlier unchanged live controls on the same seeds (all died). Compare chests opened, first evolution, hp at 2:00, damage by source, deaths at low hp and survival to 5:00. Confirmed if at least 4 of 5 are alive at 5:00 with an evolution by about 2:30 and no rise in low-hp deaths. Refuted if 2 or fewer of 5 are alive.

## Findings

L5.I1: lived 1 of 5 (4444 alive; 1919 died 4:08, 4141 2:16, 2121 2:03, 1313 2:42) against controls 0 of 5. Chest flow rose (6-18 chests on four seeds) but hp was already gone by 2:00 on the dead seeds and no evolution came before 2:24. Not adopted. The cause is minute 0-1 hp loss (B122), so the next tests are the boss dash knobs and then elite gating.

## Games

### L5.I1.G1: chest-first any hp s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 248.2s (game clock 04:08); damage taken 295 (boss:amusing 62.6, boss:the-masher 52.8, enemy:potato-beetle 31.7, enemy:aphid 30.2); 1995 kills; level 1 to 17; planner asked 104 times, action model 637; the models saw the game 27 ms late (p90 51); ended with steam-vent 1, frying-pan 8, tater-minigun 1, mash-avalanche 1, reset-button 1, peel-out 3, masher-grip 1, packed-pan 1, starch-plating 2, butter-pat 1, mash-finisher 1.
- Damage taken 295, by source: boss:amusing 62.6, boss:the-masher 52.8, enemy:potato-beetle 31.7, enemy:aphid 30.2, boss:beetle-queen 19.9, enemy:beetle-brood 19.2, Hot oil 17.2, enemy:sprout-mite 12.7; the killing blow: boss:the-masher.
- Damage dealt 83181, by weapon: tater-minigun 29678.7, mash-avalanche 14027.8, mash-snowball 11109.9, frying-pan 9079.1, locked-gatling 7271.8, lightning-spud 7242.8, steam-vent 2655.5, reset-button 2066.3.
- Kills 1995, by weapon: tater-minigun 611, mash-snowball 342, mash-avalanche 334, locked-gatling 236, frying-pan 206, lightning-spud 172, steam-vent 48, reset-button 43.
- Bosses killed 6, elites killed 6, boss chests 12, crates bought 2, shrines used 0, items bought 0, revives used 0; gold earned 872, spent 102.
- Made: tater-minigun at 02:27, mash-avalanche at 03:14.

### L5.I1.G2: chest-first any hp s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 136.9s (game clock 02:16); damage taken 222 (enemy:sand-crab 144.3, boss:amusing 20.9, enemy:aphid 14.4, enemy:frost-flea 10.4); 279 kills; level 1 to 8; planner asked 49 times, action model 501; the models saw the game 28 ms late (p90 50); ended with steam-vent 2, mash-landing 1, harvest-moon 3, fry-knives 1, gravy-heart 1, hot-start 1.
- Damage taken 222, by source: enemy:sand-crab 144.3, boss:amusing 20.9, enemy:aphid 14.4, enemy:frost-flea 10.4, enemy:sprout-mite 9, enemy:potato-beetle 7.4, enemy:spittlebug 6.9, enemy:little-grey 3.3; the killing blow: boss:amusing.
- Damage dealt 8330, by weapon: harvest-moon 4454.8, steam-vent 2839.1, mash-landing 631.8, fry-knives 403.9.
- Kills 279, by weapon: harvest-moon 156, steam-vent 110, mash-landing 7, fry-knives 6.
- Bosses killed 0, elites killed 1, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 53, spent 0.
- Made: no evolution, union or evolved item.

### L5.I1.G3: chest-first any hp s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 123.8s (game clock 02:03); damage taken 170 (boss:amusing 76.5, enemy:tomato-leech 21.1, enemy:ketchup-drop 14.4, enemy:aphid 12.1); 316 kills; level 1 to 8; planner asked 46 times, action model 313; the models saw the game 28 ms late (p90 48); ended with steam-vent 7, julienne-dash 1, reset-button 8, root-network 1, four-eyed-spud 1.
- Damage taken 170, by source: boss:amusing 76.5, enemy:tomato-leech 21.1, enemy:ketchup-drop 14.4, enemy:aphid 12.1, enemy:bog-slime 10.1, Hot oil 9.8, enemy:fry-fly 8.4, enemy:crumb-ant 6.2; the killing blow: boss:amusing.
- Damage dealt 10523, by weapon: reset-button 4979.2, steam-vent 3583.9, julienne-dash 1889.4, grok-bot 70.
- Kills 316, by weapon: steam-vent 125, julienne-dash 93, reset-button 93, grok-bot 5.
- Bosses killed 0, elites killed 6, boss chests 6, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 257, spent 30.
- Made: no evolution, union or evolved item.

### L5.I1.G4: chest-first any hp s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 162.7s (game clock 02:42); damage taken 190 (enemy:sand-crab 83.1, boss:amusing 34.8, Hot oil 23.5, enemy:oil-drip 14.5); 704 kills; level 1 to 12; planner asked 63 times, action model 484; the models saw the game 28 ms late (p90 50); ended with steam-vent 1, spud-dice 3, hunters-moon 1, potato-rain 1, sprout-satellites 1, mezzaluna 1, potato-magnet 3, stuffed-skin 1, starch-plating 1.
- Damage taken 190, by source: enemy:sand-crab 83.1, boss:amusing 34.8, Hot oil 23.5, enemy:oil-drip 14.5, enemy:potato-beetle 10.5, enemy:crumb-ant 6.7, enemy:fry-fly 5.3, enemy:aphid 5; the killing blow: Hot oil.
- Damage dealt 21111, by weapon: harvest-moon 6338.9, spud-dice 4313.1, hunters-moon 3654.2, mezzaluna 2322.1, potato-rain 2105.1, sprout-satellites 1290, steam-vent 1087.4.
- Kills 704, by weapon: harvest-moon 229, hunters-moon 167, spud-dice 145, potato-rain 66, mezzaluna 55, steam-vent 28, sprout-satellites 14.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 442, spent 30.
- Made: hunters-moon at 02:24.

### L5.I1.G5: chest-first any hp s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.2s (game clock 05:00), health 120/120; damage taken 108 (enemy:potato-beetle 23.9, enemy:cave-grub 18.7, Spore vent 18.4, boss:amusing 17.4); 4633 kills; level 1 to 21; planner asked 127 times, action model 383; the models saw the game 29 ms late (p90 61); ended with steam-vent 1, root-spikes 1, hash-harrier 1, stand-mixer 1, gratin-arc 1, grab-bag 8, sprouting-eyes 2, hot-sauce 1, bacon-bits 2, big-bowl 5.
- Damage taken 108, by source: enemy:potato-beetle 23.9, enemy:cave-grub 18.7, Spore vent 18.4, boss:amusing 17.4, enemy:aphid 13.6, Brambles 6.4, enemy:sprout-mite 6, enemy:compost-maggot 3.3.
- Damage dealt 203434, by weapon: gratin-arc 131535.9, stand-mixer 17595.2, starch-chain 14399.6, grab-bag 10898.1, hash-harrier 10439, whisk-vortex 8086.2, hash-hawk 7167.3, root-spikes 1674.6.
- Kills 4633, by weapon: gratin-arc 2844, starch-chain 640, stand-mixer 345, whisk-vortex 209, grab-bag 204, hash-harrier 124, hash-hawk 115, root-spikes 82.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1369, spent 0.
- Made: gratin-arc at 02:57, hash-harrier at 03:42, stand-mixer at 04:01.
