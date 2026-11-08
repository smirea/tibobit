# Does an action.hurt prompt that names slow tanks, chargers and ground hazards cut live NM2 minute-1 damage

| Field | Value |
| --- | --- |
| Status | done |
| Area | enemies |
| Result | refuted |
| Created | L4.I5 |
| Updated | L4.I9 |

## Hypothesis

Minute-1 chip damage comes from walking into or beside garden slugs, sand crabs and spore, oil or bramble hazards that the one-second forecast prices as cheap. Naming them in the hurt prompt makes the action model rate those moves worse and lowers minute-1 losses on 1919.

## Method

Fresh live NM2 Steam Vent on seed 1919, 300 s, only action.hurt changed. Compare minute-1 hp lost, damage by source and survival against the 1919 controls (died 2:30, 2:35; minute-1 loss 66-117). One game is a lead; repeat on 4141 and 2020 if minute-1 damage drops.

## Findings

Pooled 5 of 10 alive for the prompt. On the four paired seeds (2121, 1313, 4343, 4444) prompt and unchanged control both lived 1 of 4. The verdict rule says refuted when the controls live at least as often. Not adopted.

## Games

### L4.I5.G5: hurt prompt tanks chargers hazards s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with its own action.hurt.
- Outcome: alive after 300.3s (game clock 05:00), health 120/120; damage taken 56 (enemy:snow-mold 38.5, Brambles 9.1, enemy:aphid 3.6, enemy:frost-flea 2.9); 3469 kills; level 1 to 18; planner asked 132 times, action model 225; the models saw the game 29 ms late (p90 60); ended with tater-minigun 1, grease-fire 1, hash-bulwark 1, frozen-fries 7, sprout-satellites 1, root-network 4, big-bowl 1, gravy-splash 1, masher-grip 1, thick-skin 1, starch-plating 1.
- Damage taken 56, by source: enemy:snow-mold 38.5, Brambles 9.1, enemy:aphid 3.6, enemy:frost-flea 2.9, enemy:sprout-mite 1.2, Spore vent 0.9.
- Damage dealt 178225, by weapon: grease-fire 73564.4, wildfire-roast 28443.3, tater-minigun 25599.3, pressure-cooker 16989.2, hot-streak 13152.2, locked-gatling 8150.3, hash-bulwark 4865.7, grok-bot 2561.3.
- Kills 3469, by weapon: grease-fire 1316, hot-streak 465, wildfire-roast 442, tater-minigun 432, pressure-cooker 335, locked-gatling 243, grok-bot 111, hash-bulwark 62.
- Bosses killed 9, elites killed 15, boss chests 24, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1413, spent 0.
- Made: tater-minigun at 02:14, pressure-cooker at 02:52, wildfire-roast at 03:21, hash-bulwark at 04:03, grease-fire at 04:03.

### L4.I6.G1: hurt tanks chargers hazards s1919 repeat

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with its own action.hurt.
- Outcome: alive after 300s (game clock 05:00), health 110/120; damage taken 76 (boss:the-masher 23.5, enemy:cave-grub 14, boss:amusing 11.8, enemy:potato-beetle 9.5); 3368 kills; level 1 to 19; planner asked 134 times, action model 294; the models saw the game 30 ms late (p90 65); ended with steam-vent 6, gratin-arc 1, harvest-moon 8, cold-storage 1, tater-twister 1, hash-bulwark 1, slow-cooker 1, hot-sauce 1, starch-plating 4, peel-out 1, salt-shaker 3, butter-pat 1.
- Damage taken 76, by source: boss:the-masher 23.5, enemy:cave-grub 14, boss:amusing 11.8, enemy:potato-beetle 9.5, Brambles 7.9, Spore vent 4.5, enemy:aphid 3.6, enemy:ketchup-drop 1.6.
- Damage dealt 179233, by weapon: gratin-arc 126005.2, starch-chain 20902.8, hash-bulwark 13422.4, tater-twirl 5588.4, tater-twister 5052.1, hash-brown-shield 3599.9, harvest-moon 1944.9, root-cellar 1611.9.
- Kills 3368, by weapon: gratin-arc 2277, starch-chain 793, hash-bulwark 99, tater-twirl 71, harvest-moon 62, root-cellar 20, grok-bot 16, hash-brown-shield 15.
- Bosses killed 9, elites killed 15, boss chests 24, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1770, spent 0.
- Made: hash-bulwark at 02:11, gratin-arc at 03:12, tater-twister at 04:06, cold-storage at 04:30.

### L4.I6.G2: hurt tanks chargers hazards s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with its own action.hurt.
- Outcome: died after 160.6s (game clock 02:40); damage taken 302 (enemy:potato-beetle 91.6, boss:amusing 66, enemy:tomato-leech 39.8, enemy:aphid 30.6); 512 kills; level 1 to 10; planner asked 63 times, action model 449; the models saw the game 27 ms late (p90 50); ended with steam-vent 7, locked-gatling 2, root-network 4.
- Damage taken 302, by source: enemy:potato-beetle 91.6, boss:amusing 66, enemy:tomato-leech 39.8, enemy:aphid 30.6, enemy:frost-flea 19, enemy:sprout-mite 18.8, enemy:cave-grub 10.6, enemy:compost-maggot 9.7; the killing blow: boss:amusing.
- Damage dealt 13303, by weapon: locked-gatling 7557.7, steam-vent 5744.9.
- Kills 512, by weapon: locked-gatling 316, steam-vent 196.
- Bosses killed 0, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 142, spent 0.
- Made: no evolution, union or evolved item.

### L4.I6.G3: hurt tanks chargers hazards s4242 regression

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4242; 300s; plays the playbook with its own action.hurt.
- Outcome: alive after 300.3s (game clock 05:00), health 149/149; damage taken 137 (Hot oil 34.5, enemy:garden-slug 32.7, boss:amusing 27.8, enemy:sand-crab 13.7); 3637 kills; level 1 to 19; planner asked 136 times, action model 207; the models saw the game 28 ms late (p90 49); ended with grease-fire 1, russet-ricochet 1, cast-iron 1, root-network 4, gravy-heart 2, thick-skin 1, sprouting-eyes 2, starch-plating 1.
- Damage taken 137, by source: Hot oil 34.5, enemy:garden-slug 32.7, boss:amusing 27.8, enemy:sand-crab 13.7, boss:beetle-queen 11.4, enemy:crumb-ant 6.5, enemy:potato-beetle 4.8, enemy:oil-drip 2.
- Damage dealt 159761, by weapon: grease-fire 114374.2, wildfire-roast 17215.5, hot-streak 11426.1, russet-ricochet 7995.4, grok-bot 3345, alex 1838.1, steam-vent 1511.2, skipping-cannonball 1429.2.
- Kills 3637, by weapon: grease-fire 2288, wildfire-roast 550, hot-streak 380, russet-ricochet 169, grok-bot 115, alex 54, skipping-cannonball 48, steam-vent 25.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1228, spent 0.
- Made: wildfire-roast at 02:14, pressure-cooker at 03:05, russet-ricochet at 03:49, cast-iron at 04:37, grease-fire at 03:05.

### L4.I6.G4: hurt tanks chargers hazards s2020 regression

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2020; 300s; plays the playbook with its own action.hurt.
- Outcome: alive after 300.3s (game clock 05:00), health 163/163; damage taken 267 (boss:amusing 107.7, boss:the-masher 35.2, enemy:snow-mold 30.8, enemy:frost-flea 15.1); 4599 kills; level 1 to 20; planner asked 125 times, action model 751; the models saw the game 29 ms late (p90 71); ended with steam-vent 8, gravy-flood 1, potato-rain 1, mash-avalanche 1, spud-decoy 8, mash-golem 1, butter-socks 1, gravy-heart 3, potato-magnet 1, masher-grip 2, gpu 1, sprouting-eyes 1.
- Damage taken 267, by source: boss:amusing 107.7, boss:the-masher 35.2, enemy:snow-mold 30.8, enemy:frost-flea 15.1, enemy:dumpster-raccoon 12.9, enemy:fry-fly 11.6, enemy:aphid 11.2, enemy:parking-gull 10.8.
- Damage dealt 174949, by weapon: gravy-flood 90585.7, gravy-boat 33341.6, mash-avalanche 18886.6, mash-snowball 13453.3, steam-vent 5323.8, spud-decoy 4740.3, potato-rain 3281.7, grok-bot 2456.6.
- Kills 4599, by weapon: gravy-flood 2193, gravy-boat 984, mash-avalanche 467, mash-snowball 464, spud-decoy 145, grok-bot 94, potato-rain 82, steam-vent 78.
- Bosses killed 9, elites killed 6, boss chests 15, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1170, spent 0.
- Made: gravy-flood at 03:22, mash-avalanche at 03:28.

### L4.I7.G1: hurt prompt s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with its own action.hurt.
- Outcome: died after 134.3s (game clock 02:14); damage taken 140 (enemy:tomato-leech 66.1, Hot oil 31.1, boss:amusing 17.4, enemy:spittlebug 12.4); 303 kills; level 1 to 8; planner asked 49 times, action model 527; the models saw the game 28 ms late (p90 51); ended with steam-vent 1, peel-phantom 1, tater-twirl 2, salt-line 1, skipping-cannonball 1, harvest-moon 1, gravy-heart 1.
- Damage taken 140, by source: enemy:tomato-leech 66.1, Hot oil 31.1, boss:amusing 17.4, enemy:spittlebug 12.4, enemy:little-grey 6.4, enemy:aphid 4.3, enemy:sprout-mite 2.4; the killing blow: boss:amusing.
- Damage dealt 13097, by weapon: tater-twirl 3210.9, grok-bot 3110.7, salt-line 2771, harvest-moon 1164, steam-vent 1015.3, peel-phantom 1003.2, skipping-cannonball 821.8.
- Kills 303, by weapon: tater-twirl 74, grok-bot 64, salt-line 63, harvest-moon 39, skipping-cannonball 31, peel-phantom 21, steam-vent 11.
- Bosses killed 0, elites killed 8, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 72, spent 0.
- Made: no evolution, union or evolved item.

### L4.I7.G2: hurt prompt s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with its own action.hurt.
- Outcome: died after 192.3s (game clock 03:12); damage taken 203 (boss:amusing 70, enemy:potato-beetle 51.6, enemy:sand-crab 30.9, enemy:sprout-mite 12.1); 521 kills; level 1 to 9; planner asked 67 times, action model 638; the models saw the game 28 ms late (p90 53); ended with steam-vent 2, spud-dynamo 1, deep-fryer 1, harvest-moon 1, spud-cannon 1, starch-plating 2, spud-sneakers 1.
- Damage taken 203, by source: boss:amusing 70, enemy:potato-beetle 51.6, enemy:sand-crab 30.9, enemy:sprout-mite 12.1, boss:beetle-queen 6.3, enemy:crumb-ant 5.6, Spore vent 4.4, enemy:compost-maggot 3.7; the killing blow: boss:amusing.
- Damage dealt 18694, by weapon: spud-dynamo 5377.6, harvest-moon 4580.9, deep-fryer 3536.6, spud-cannon 2700.5, steam-vent 2498.8.
- Kills 521, by weapon: harvest-moon 155, deep-fryer 135, spud-dynamo 100, spud-cannon 73, steam-vent 58.
- Bosses killed 0, elites killed 4, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 54, spent 0.
- Made: no evolution, union or evolved item.

### L4.I7.G3: hurt prompt s4343

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4343; 300s; plays the playbook with its own action.hurt.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 121 (enemy:tomato-leech 26.4, Hot oil 24.9, enemy:potato-beetle 16.4, enemy:snow-mold 12.1); 3524 kills; level 1 to 18; planner asked 132 times, action model 636; the models saw the game 30 ms late (p90 66); ended with steam-vent 1, bottomless-sack 1, spark-corral 1, root-cellar 2, seed-potato 8, waffle-cut 1, gpu 2, sprouting-eyes 1, butter-socks 2, aged-russet 1, peel-out 1.
- Damage taken 121, by source: enemy:tomato-leech 26.4, Hot oil 24.9, enemy:potato-beetle 16.4, enemy:snow-mold 12.1, enemy:aphid 10.3, boss:beetle-queen 9.5, enemy:frost-flea 5.7, enemy:oil-drip 4.5.
- Damage dealt 165310, by weapon: bottomless-sack 94481, spark-corral 32628.7, grab-bag 10445.8, spud-fence 7420.8, seed-potato 7383.8, grok-bot 5876.6, root-cellar 3572.6, steam-vent 1312.
- Kills 3524, by weapon: bottomless-sack 1852, spark-corral 633, grab-bag 325, seed-potato 197, grok-bot 195, spud-fence 191, root-cellar 44, waffle-cut 35.
- Bosses killed 9, elites killed 12, boss chests 21, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1244, spent 0.
- Made: spark-corral at 02:11, bottomless-sack at 03:24, waffle-cut at 04:03.

### L4.I7.G4: hurt prompt s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook with its own action.hurt.
- Outcome: died after 144.7s (game clock 02:24); damage taken 177 (boss:amusing 93.8, enemy:compost-maggot 14.6, enemy:frost-flea 13.1, enemy:cave-grub 11.9); 361 kills; level 1 to 8; planner asked 54 times, action model 449; the models saw the game 27 ms late (p90 49); ended with steam-vent 7, root-spikes 2, broadside 1, packed-pan 1, root-network 1.
- Damage taken 177, by source: boss:amusing 93.8, enemy:compost-maggot 14.6, enemy:frost-flea 13.1, enemy:cave-grub 11.9, enemy:potato-beetle 10.8, enemy:aphid 10.7, enemy:snow-mold 8.1, Spore vent 5.6; the killing blow: boss:amusing.
- Damage dealt 10619, by weapon: root-spikes 3588.5, steam-vent 3298, broadside 2533.4, grok-bot 1199.2.
- Kills 361, by weapon: root-spikes 169, steam-vent 115, broadside 41, grok-bot 36.
- Bosses killed 0, elites killed 3, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 133, spent 0.
- Made: no evolution, union or evolved item.

### L4.I7.G5: hurt prompt s4545

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4545; 300s; plays the playbook with its own action.hurt.
- Outcome: died after 128.9s (game clock 02:08); damage taken 128 (enemy:potato-beetle 49.5, boss:amusing 48.7, enemy:aphid 10.3, Hot oil 8.8); 494 kills; level 1 to 8; planner asked 47 times, action model 472; the models saw the game 30 ms late (p90 56); ended with steam-vent 1, afterburner-fries 4, locked-gatling 1, starch-chain 1, whisk-vortex 1, tot-stampede 1.
- Damage taken 128, by source: enemy:potato-beetle 49.5, boss:amusing 48.7, enemy:aphid 10.3, Hot oil 8.8, enemy:sprout-mite 5.7, enemy:frost-flea 5.3; the killing blow: boss:amusing.
- Damage dealt 12295, by weapon: locked-gatling 3723.2, starch-chain 2546.9, whisk-vortex 2429.6, tot-stampede 2178.4, steam-vent 958.5, afterburner-fries 366.5, grok-bot 91.5.
- Kills 494, by weapon: locked-gatling 140, tot-stampede 117, whisk-vortex 102, starch-chain 90, steam-vent 36, grok-bot 7, afterburner-fries 2.
- Bosses killed 0, elites killed 3, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 69, spent 0.
- Made: no evolution, union or evolved item.

### L4.I8.G1: control unchanged s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook.
- Outcome: died after 147.5s (game clock 02:27); damage taken 170 (boss:amusing 73, enemy:cave-grub 39.1, enemy:compost-maggot 14.3, enemy:potato-beetle 10); 586 kills; level 1 to 10; planner asked 55 times, action model 385; the models saw the game 29 ms late (p90 55); ended with steam-vent 1, mash-snowball 3, reset-button 3, gravy-boat 1, deep-fryer 1, fry-sentry 1, masher-grip 1.
- Damage taken 170, by source: boss:amusing 73, enemy:cave-grub 39.1, enemy:compost-maggot 14.3, enemy:potato-beetle 10, enemy:spittlebug 9.5, enemy:aphid 8.9, Spore vent 5.5, enemy:sprout-mite 4.3; the killing blow: boss:amusing.
- Damage dealt 19204, by weapon: mash-snowball 10586.1, gravy-boat 4216.3, deep-fryer 1432.9, steam-vent 1191.3, fry-sentry 1093.4, reset-button 522.4, grok-bot 161.8.
- Kills 586, by weapon: mash-snowball 329, gravy-boat 108, fry-sentry 44, deep-fryer 33, steam-vent 32, reset-button 28, grok-bot 12.
- Bosses killed 0, elites killed 6, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 93, spent 0.
- Made: no evolution, union or evolved item.

### L4.I8.G2: control unchanged s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook.
- Outcome: died after 123.5s (game clock 02:03); damage taken 128 (enemy:sand-crab 70.7, boss:the-masher 26.2, enemy:potato-beetle 7.1, enemy:sprout-mite 6.8); 415 kills; level 1 to 9; planner asked 49 times, action model 571; the models saw the game 29 ms late (p90 49); ended with steam-vent 2, potato-rain 1, starch-chain 2, potato-battery 1, peeler 1, reset-button 1, mash-finisher 1.
- Damage taken 128, by source: enemy:sand-crab 70.7, boss:the-masher 26.2, enemy:potato-beetle 7.1, enemy:sprout-mite 6.8, enemy:compost-maggot 4.8, enemy:crumb-ant 4.3, enemy:dumpster-raccoon 3.6, enemy:oil-drip 3.3; the killing blow: boss:the-masher.
- Damage dealt 14356, by weapon: starch-chain 5548.9, potato-battery 2786.9, reset-button 2389.1, potato-rain 1690, steam-vent 1318, peeler 623.
- Kills 415, by weapon: starch-chain 213, potato-battery 54, potato-rain 50, steam-vent 42, reset-button 38, peeler 18.
- Bosses killed 0, elites killed 9, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 52, spent 0.
- Made: no evolution, union or evolved item.

### L4.I8.G3: control unchanged s4343

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4343; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 05:00), health 98/120; damage taken 221 (boss:the-masher 69, boss:amusing 62.6, enemy:snow-mold 37.6, enemy:sprout-mite 13.2); 3719 kills; level 1 to 19; planner asked 125 times, action model 675; the models saw the game 28 ms late (p90 54); ended with steam-vent 1, grab-bag 6, waffle-cut 1, tater-twister 1, starch-chain 1, whisk-vortex 1, lean-lunch 2, butter-socks 1, starch-plating 4, sour-cream 1, salt-shaker 1, gpu 2.
- Damage taken 221, by source: boss:the-masher 69, boss:amusing 62.6, enemy:snow-mold 37.6, enemy:sprout-mite 13.2, enemy:aphid 9.8, boss:beetle-queen 9.3, enemy:frost-flea 8.2, enemy:potato-beetle 4.5.
- Damage dealt 150712, by weapon: tater-twister 39874.1, waffle-cut 34313.4, whisk-vortex 24115.5, grab-bag 19997.4, tater-twirl 13234.2, starch-chain 12753.7, julienne-dash 4468.7, steam-vent 1382.8.
- Kills 3719, by weapon: tater-twister 1045, waffle-cut 715, tater-twirl 521, grab-bag 498, whisk-vortex 495, starch-chain 241, julienne-dash 131, steam-vent 54.
- Bosses killed 9, elites killed 6, boss chests 13, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 998, spent 0.
- Made: waffle-cut at 03:02, tater-twister at 03:24.

### L4.I8.G4: control unchanged s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook.
- Outcome: died after 135.6s (game clock 02:15); damage taken 164 (boss:amusing 104.3, enemy:potato-beetle 18.7, enemy:aphid 16.4, enemy:sprout-mite 10.4); 546 kills; level 1 to 10; planner asked 59 times, action model 228; the models saw the game 27 ms late (p90 47); ended with steam-vent 1, potato-battery 1, broadside 6, whisk-vortex 1, tater-twirl 1, mash-golem 2, sour-cream 1.
- Damage taken 164, by source: boss:amusing 104.3, enemy:potato-beetle 18.7, enemy:aphid 16.4, enemy:sprout-mite 10.4, enemy:oil-drip 6.1, enemy:cave-grub 2.6, enemy:fry-fly 2.5, enemy:frost-flea 1.7; the killing blow: boss:amusing.
- Damage dealt 14611, by weapon: whisk-vortex 4590.2, broadside 4019.2, tater-twirl 2514.3, potato-battery 2404.5, steam-vent 633.5, mash-golem 348.1, grok-bot 101.3.
- Kills 546, by weapon: whisk-vortex 195, potato-battery 115, tater-twirl 101, broadside 91, steam-vent 23, mash-golem 16, grok-bot 5.
- Bosses killed 0, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 114, spent 0.
- Made: no evolution, union or evolved item.
