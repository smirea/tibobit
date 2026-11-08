# Chest-and-elite goal prompt on a natural NM1 build

| Field | Value |
| --- | --- |
| Status | running |
| Area | spots |
| Result | - |
| Coach | sonnet-medium |
| Created | sonnet-medium L1.I8 |
| Updated | sonnet-medium L1.I9 |

## Hypothesis

Preferring chests and elites yields more boss chests and evolutions than the default goal prompt.

## Method

(none yet)

## Findings

I8: chest-elite prompt survived with 17 boss chests and 4 evolutions. I9 repeats it twice on the 5:00 gym and on fresh seed 808 against baselines.

## Games

### L1.I8.G1: min5 chest-elite goal prompt

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.1s (game clock 10:00), health 120/120; damage taken 183 (boss:sir-strawman 117.9, enemy:blight-spore 19.1, boss:fryer-king 14.4, Hot oil 14); 7720 kills; level 17 to 31; planner asked 108 times, action model 510, in lockstep; ended with pressure-cooker 1, stand-mixer 1, spud-lob 1, hot-potato 6, mashquake 1, peel-poltergeist 1, big-bowl 3, hot-start 3, aged-russet 4, root-network 2, peel-out 2, packed-pan 1.
- Damage taken 183, by source: boss:sir-strawman 117.9, enemy:blight-spore 19.1, boss:fryer-king 14.4, Hot oil 14, enemy:sand-crab 7.3, enemy:fry-fly 5.2, boss:late-blight 4.6.
- Damage dealt 627263, by weapon: stand-mixer 280015.5, mashquake 138975.4, pressure-cooker 81362.2, whisk-vortex 45530.7, mash-wave 29180.4, hot-potato 23807.7, spud-lob 17960.6, steam-vent 8554.4.
- Kills 7720, by weapon: stand-mixer 3917, mashquake 1024, pressure-cooker 773, whisk-vortex 759, mash-wave 516, hot-potato 312, spud-lob 207, steam-vent 181.
- Bosses killed 4, elites killed 9, boss chests 17, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1743, spent 0.
- Made: stand-mixer at 06:27, pressure-cooker at 08:03, peel-poltergeist at 08:44, mashquake at 09:08.

### L1.I9.G1: min5 baseline repeat

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook.
- Outcome: died after 155.9s (game clock 07:35); damage taken 219 (boss:late-blight 45.8, enemy:bog-toad 44.8, boss:sir-strawman 22.2, enemy:tomato-leech 21.5); 2632 kills; level 17 to 22; planner asked 48 times, action model 426, in lockstep; ended with steam-vent 5, whisk-vortex 3, spud-lob 1, hot-potato 1, mash-wave 1, peel-phantom 2, big-bowl 4, hot-start 2, aged-russet 1, root-network 2, starch-plating 1.
- Damage taken 219, by source: boss:late-blight 45.8, enemy:bog-toad 44.8, boss:sir-strawman 22.2, enemy:tomato-leech 21.5, enemy:field-crow 16.4, enemy:dumpster-raccoon 15.4, enemy:hay-bale 14.4, Hot oil 9.4; the killing blow: enemy:dumpster-raccoon.
- Damage dealt 130253, by weapon: whisk-vortex 44760.2, mash-wave 44309.2, steam-vent 16705.9, hot-potato 12683.3, spud-lob 8734.3, dog:greyhound 1939.3, peel-phantom 586.4, grok-bot 534.3.
- Kills 2632, by weapon: whisk-vortex 868, mash-wave 866, steam-vent 378, hot-potato 291, spud-lob 173, dog:greyhound 38, peel-phantom 13, grok-bot 5.
- Bosses killed 2, elites killed 3, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 328, spent 0.
- Made: no evolution, union or evolved item.

### L1.I9.G2: min5 chest-first prompt A

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 10:00), health 134/134; damage taken 50 (boss:late-blight 31.9, Hot oil 15, enemy:oil-drip 3.4); 9455 kills; level 17 to 33; planner asked 108 times, action model 449, in lockstep; ended with pressure-cooker 1, stand-mixer 1, spud-lob 1, hot-potato 1, mashquake 1, peel-phantom 8, big-bowl 5, hot-start 2, aged-russet 3, root-network 1, peel-out 4, gravy-heart 1.
- Damage taken 50, by source: boss:late-blight 31.9, Hot oil 15, enemy:oil-drip 3.4.
- Damage dealt 768480, by weapon: mashquake 340205.1, stand-mixer 234626.3, pressure-cooker 101505.2, mash-wave 28683.6, hot-potato 24218.1, whisk-vortex 15701.6, spud-lob 14744.5, steam-vent 7305.8.
- Kills 9455, by weapon: mashquake 3240, stand-mixer 3192, pressure-cooker 1434, mash-wave 630, whisk-vortex 347, hot-potato 258, steam-vent 177, spud-lob 158.
- Bosses killed 4, elites killed 7, boss chests 12, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1702, spent 0.
- Made: pressure-cooker at 06:03, stand-mixer at 06:17, mashquake at 08:09.

### L1.I9.G3: min5 chest-first prompt B

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.2s (game clock 10:00), health 163/163; damage taken 374 (enemy:bog-toad 118.1, boss:fryer-king 85.4, enemy:ice-imp 60.2, boss:late-blight 36); 8538 kills; level 17 to 32; planner asked 101 times, action model 685, in lockstep; ended with steam-vent 8, stand-mixer 1, spud-lob 1, hot-potato 1, mash-wave 7, peel-phantom 2, big-bowl 3, hot-start 4, aged-russet 3, sour-cream 3, gravy-heart 3, four-eyed-spud 2.
- Damage taken 374, by source: enemy:bog-toad 118.1, boss:fryer-king 85.4, enemy:ice-imp 60.2, boss:late-blight 36, Hot oil 26.7, boss:sir-strawman 16.8, enemy:field-crow 16.4, enemy:dumpster-raccoon 8.3.
- Damage dealt 721887, by weapon: stand-mixer 439202.4, mash-wave 119815.3, whisk-vortex 67908.2, steam-vent 39397.9, hot-potato 30075.2, spud-lob 19936.5, dog:greyhound 3601, spark-spud 1921.4.
- Kills 8538, by weapon: stand-mixer 4808, whisk-vortex 1374, mash-wave 1183, steam-vent 442, hot-potato 439, spud-lob 227, dog:greyhound 46, spark-spud 19.
- Bosses killed 4, elites killed 6, boss chests 14, crates bought 0, shrines used 0, items bought 1, revives used 0; gold earned 1393, spent 219.
- Made: stand-mixer at 07:17.

### L1.I9.G4: seed808 baseline

- Start: a fresh game on Nightmare 1 with steam-vent, seed 808; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 05:00), health 163/163; damage taken 95 (boss:beetle-queen 21.5, enemy:snow-mold 12.4, boss:amusing 12.2, enemy:potato-beetle 11.1); 2545 kills; level 1 to 17; planner asked 104 times, action model 740, in lockstep; ended with steam-vent 1, mandoline-fury 1, harvest-moon 3, rosti-disc 1, mash-wave 1, starch-plating 2, peel-out 3, gravy-heart 3, root-network 2.
- Damage taken 95, by source: boss:beetle-queen 21.5, enemy:snow-mold 12.4, boss:amusing 12.2, enemy:potato-beetle 11.1, enemy:wireworm-larva 8.5, enemy:aphid 6.9, enemy:compost-maggot 5.7, enemy:cave-grub 4.2.
- Damage dealt 90239, by weapon: mandoline-fury 34835.9, peeler 25336.6, mash-wave 9949.9, harvest-moon 6884.1, rosti-disc 5604.3, dog:terrier 4151.4, steam-vent 2389.4, grok-bot 1087.4.
- Kills 2545, by weapon: peeler 979, mandoline-fury 844, dog:terrier 193, harvest-moon 193, mash-wave 183, steam-vent 60, rosti-disc 47, grok-bot 46.
- Bosses killed 3, elites killed 4, boss chests 6, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 465, spent 0.
- Made: mandoline-fury at 03:39.

### L1.I9.G5: seed808 chest-first prompt

- Start: a fresh game on Nightmare 1 with steam-vent, seed 808; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 23 (enemy:snow-mold 8.9, enemy:aphid 8.4, enemy:potato-beetle 4.6, enemy:compost-maggot 1.2); 3625 kills; level 1 to 19; planner asked 104 times, action model 293, in lockstep; ended with steam-vent 1, frying-pan 7, potato-battery 2, locked-gatling 1, wildfire-roast 1, tater-twirl 1, thick-skin 1, starch-plating 2, aged-russet 2, peel-out 1, butter-socks 1.
- Damage taken 23, by source: enemy:snow-mold 8.9, enemy:aphid 8.4, enemy:potato-beetle 4.6, enemy:compost-maggot 1.2.
- Damage dealt 108032, by weapon: wildfire-roast 71682.7, hot-streak 17929.2, locked-gatling 13150.3, tater-twirl 1994, potato-battery 1772.8, frying-pan 955.2, steam-vent 462.8, grok-bot 85.3.
- Kills 3625, by weapon: wildfire-roast 2103, hot-streak 948, locked-gatling 373, potato-battery 85, tater-twirl 61, frying-pan 37, steam-vent 12, grok-bot 6.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 477, spent 0.
- Made: wildfire-roast at 03:10.
