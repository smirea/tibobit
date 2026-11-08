# Does a boss and crowd aware goal prompt survive 17:00-20:00 on Nightmare 1

| Field | Value |
| --- | --- |
| Status | running |
| Area | bosses |
| Result | - |
| Coach | sonnet-medium |
| Created | sonnet-medium L2.I1 |
| Updated | sonnet-medium L2.I8 |

## Hypothesis

A planner.goal prompt that rates evading and leaving highest when a boss is within about 300 units or the crowd is thick, even above half health, and drops chest and nest goals then, cuts damage in the Titan and Kraken windows compared with chest-first alone.

## Method

From nm1-min16-natural-b (16:40), 300s: chest-first baseline vs boss-aware goal, two repeats each. Compare damage by source, minimum hp, goals dropped and survival to 20:00.

## Findings

L2.I7: playbook text died 18:04 and 18:41 on the full gym; evade 15 mixed. L2.I8 tests a stricter 450-unit evade-only text alone, with boss ranges 300, with evade 15, with a boss-aware hurt prompt, and boss ranges on the old text.

## Games

### L2.I1.G1: titan baseline

- Start: gym nm1-min16-titan (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook.
- Outcome: not played: gym nm1-min16-titan is failed.

### L2.I1.G2: titan boss-aware goal

- Start: gym nm1-min16-titan (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook with its own planner.goal.
- Outcome: not played: gym nm1-min16-titan is failed.

### L2.I1.G5: min15 goal plus picks 15-20

- Start: gym nm1-min15-late (Nightmare 1 at 15:00), seed ?; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: not played: gym nm1-min15-late is failed.

### L2.I2.G1: titan baseline

- Start: gym nm1-min16-titan-b (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook.
- Outcome: not played: gym nm1-min16-titan-b is failed.

### L2.I2.G2: titan boss-aware goal

- Start: gym nm1-min16-titan-b (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook with its own planner.goal.
- Outcome: not played: gym nm1-min16-titan-b is failed.

### L2.I2.G5: min15 goal plus picks 15-20

- Start: gym nm1-min15-late-b (Nightmare 1 at 15:00), seed ?; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: not played: gym nm1-min15-late-b is failed.

### L2.I3.G1: titan baseline

- Start: gym nm1-min16-titan-c (Nightmare 1 at 16:40), seed 143P2NQ; 300s; plays the playbook.
- Outcome: died after 266.4s (game clock 21:06); damage taken 216 (boss:fryer-king 216, Brambles 0.4); 148748 kills; level 82 to 104; planner asked 72 times, action model 248, in lockstep; ended with tater-twister 1, permafrost-fries 1, grease-fire 1, julienne-dash 8, reset-button 8, spud-decoy 8, root-network 5, big-bowl 5, hot-start 5, thick-skin 5, starch-plating 5, salt-shaker 5.
- Damage taken 216, by source: boss:fryer-king 216, Brambles 0.4; the killing blow: boss:fryer-king.
- Damage dealt 127033454, by weapon: grease-fire 126315602.1, permafrost-fries 474528, tater-twister 191856.3, reset-button 35891.8, julienne-dash 8967.3, spud-decoy 6608.1.
- Kills 148748, by weapon: grease-fire 147984, permafrost-fries 402, tater-twister 288, reset-button 69, julienne-dash 3, spud-decoy 2.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 22401, spent 0.
- Made: no evolution, union or evolved item.

### L2.I3.G2: titan boss-aware goal

- Start: gym nm1-min16-titan-c (Nightmare 1 at 16:40), seed 143P2NQ; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 21:40), health 15/120; damage taken 614 (boss:fryer-king 540, boss:ketchup-kraken 70.2, Hot oil 3.3); 179212 kills; level 82 to 107; planner asked 91 times, action model 605, in lockstep; ended with tater-twister 1, permafrost-fries 1, grease-fire 1, julienne-dash 8, reset-button 8, spud-decoy 8, root-network 2, big-bowl 5, hot-start 5, thick-skin 5, starch-plating 5, salt-shaker 5.
- Damage taken 614, by source: boss:fryer-king 540, boss:ketchup-kraken 70.2, Hot oil 3.3.
- Damage dealt 175861756, by weapon: grease-fire 174398419.2, permafrost-fries 626249.7, tater-twister 521525.2, reset-button 274060.9, julienne-dash 26566.2, spud-decoy 14935.2.
- Kills 179212, by weapon: grease-fire 178077, tater-twister 546, permafrost-fries 379, reset-button 202, spud-decoy 4, julienne-dash 4.
- Bosses killed 4, elites killed 5, boss chests 7, crates bought 0, shrines used 1, items bought 0, revives used 0; gold earned 26603, spent 2500.
- Made: no evolution, union or evolved item.

### L2.I3.G5: min15 goal plus picks 15-20

- Start: gym nm1-min15-c (Nightmare 1 at 15:00), seed KE7UTP; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: alive after 300.2s (game clock 20:00), health 120/120; damage taken 11 (Spore vent 10.6); 113948 kills; level 71 to 97; planner asked 96 times, action model 249, in lockstep; ended with tater-twister 1, permafrost-fries 1, grease-fire 1, julienne-dash 8, reset-button 8, butter-streak 8, root-network 5, big-bowl 5, hot-start 5, thick-skin 5, starch-plating 5, salt-shaker 5.
- Damage taken 11, by source: Spore vent 10.6.
- Damage dealt 87758869, by weapon: grease-fire 87221850.8, permafrost-fries 412376.8, tater-twister 79865.4, grok-bot 39888.9, julienne-dash 2579.9, butter-streak 2307.5.
- Kills 113948, by weapon: grease-fire 113310, permafrost-fries 442, grok-bot 103, tater-twister 93.
- Bosses killed 3, elites killed 8, boss chests 11, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 21914, spent 0.
- Made: no evolution, union or evolved item.

### L2.I1.G1: lo-full baseline

- Start: gym nm1-min16-lo-full (Nightmare 1 at 16:40), seed 12DDMN0; 300s; plays the playbook.
- Outcome: died after 245.5s (game clock 20:45); damage taken 1237 (boss:harvester 331.9, boss:ketchup-kraken 305.2, boss:compost-titan 296.4, enemy:grease-fiend 194.9); 32352 kills; level 53 to 67; planner asked 71 times, action model 487, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-pat 5, aged-russet 5.
- Damage taken 1237, by source: boss:harvester 331.9, boss:ketchup-kraken 305.2, boss:compost-titan 296.4, enemy:grease-fiend 194.9, enemy:ice-imp 84.6, enemy:blight-spore 18.8, Brambles 5.4; the killing blow: boss:harvester.
- Damage dealt 24341599, by weapon: mash-avalanche 6716207.9, mandoline-fury 4916403.6, pressure-cooker 4781545.4, gratin-arc 3421731.7, tater-minigun 3233458.4, wandering-eyes 1059790.6, harvest-moon 169254.5, grok-bot 27724.6.
- Kills 32352, by weapon: mash-avalanche 9180, pressure-cooker 7198, mandoline-fury 6286, tater-minigun 4214, gratin-arc 4082, wandering-eyes 1158, harvest-moon 129, grok-bot 83.
- Bosses killed 2, elites killed 4, boss chests 6, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 6479, spent 791.
- Made: no evolution, union or evolved item.

### L2.I1.G2: lo-full boss-aware goal

- Start: gym nm1-min16-lo-full (Nightmare 1 at 16:40), seed 12DDMN0; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 109s (game clock 18:29); damage taken 300 (boss:ketchup-kraken 203.5, enemy:ice-imp 59.9, boss:compost-titan 32.9, Hot oil 4.1); 14149 kills; level 53 to 59; planner asked 29 times, action model 239, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-pat 5, aged-russet 5.
- Damage taken 300, by source: boss:ketchup-kraken 203.5, enemy:ice-imp 59.9, boss:compost-titan 32.9, Hot oil 4.1; the killing blow: enemy:ice-imp.
- Damage dealt 7905199, by weapon: mash-avalanche 1907733.2, mandoline-fury 1721724.4, pressure-cooker 1364661.3, gratin-arc 1319039.4, tater-minigun 1199516.7, wandering-eyes 332366.2, harvest-moon 55416, grok-bot 1981.5.
- Kills 14149, by weapon: mash-avalanche 3571, mandoline-fury 3111, pressure-cooker 2884, gratin-arc 2084, tater-minigun 1996, wandering-eyes 456, harvest-moon 38, grok-bot 6.
- Bosses killed 0, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2113, spent 0.
- Made: no evolution, union or evolved item.

### L2.I1.G4: lo-surv boss-aware goal

- Start: gym nm1-min16-lo-surv (Nightmare 1 at 16:40), seed 1NKFNEH; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 167.9s (game clock 19:28); damage taken 1354 (boss:ketchup-kraken 365.4, enemy:mud-golem 317.4, enemy:ice-imp 243.9, boss:compost-titan 208.3); 12160 kills; level 48 to 57; planner asked 52 times, action model 465, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-socks 5, stuffed-skin 5.
- Damage taken 1354, by source: boss:ketchup-kraken 365.4, enemy:mud-golem 317.4, enemy:ice-imp 243.9, boss:compost-titan 208.3, enemy:grease-fiend 133.6, boss:grater-golem 63.7, enemy:blight-spore 19.4, Brambles 2.5; the killing blow: enemy:mud-golem.
- Damage dealt 9288237, by weapon: mash-avalanche 3624372.8, pressure-cooker 2093579.9, mandoline-fury 1699227.3, gratin-arc 866370.8, tater-minigun 786171.6, boom-spud 158870.3, harvest-moon 59643.9.
- Kills 12160, by weapon: mash-avalanche 4174, pressure-cooker 3106, mandoline-fury 2503, gratin-arc 1151, tater-minigun 967, boom-spud 177, harvest-moon 82.
- Bosses killed 1, elites killed 4, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1987, spent 0.
- Made: no evolution, union or evolved item.

### L2.I4.G1: full build baseline

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 300s; plays the playbook.
- Outcome: died after 112.6s (game clock 18:32); damage taken 430 (enemy:ice-imp 322.8, boss:ketchup-kraken 107.1); 15298 kills; level 57 to 63; planner asked 31 times, action model 284, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 430, by source: enemy:ice-imp 322.8, boss:ketchup-kraken 107.1; the killing blow: enemy:ice-imp.
- Damage dealt 8651230, by weapon: mash-avalanche 2610116.3, mandoline-fury 1757674.3, pressure-cooker 1497395.6, gratin-arc 1472373.4, tater-minigun 1252931.4, harvest-moon 59172.1, dog:dalmatian 1566.4.
- Kills 15298, by weapon: mash-avalanche 4732, pressure-cooker 3053, mandoline-fury 2837, gratin-arc 2391, tater-minigun 2243, harvest-moon 39, dog:dalmatian 3.
- Bosses killed 0, elites killed 2, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2618, spent 0.
- Made: no evolution, union or evolved item.

### L2.I4.G2: full build boss-aware goal

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 266.1s (game clock 21:06); damage taken 643 (boss:harvester 437.1, boss:ketchup-kraken 107.1, boss:compost-titan 69.4, enemy:ice-imp 28.4); 25899 kills; level 57 to 69; planner asked 78 times, action model 685, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 643, by source: boss:harvester 437.1, boss:ketchup-kraken 107.1, boss:compost-titan 69.4, enemy:ice-imp 28.4, Brambles 0.8; the killing blow: boss:harvester.
- Damage dealt 25629489, by weapon: mash-avalanche 8052251.7, pressure-cooker 5049333, mandoline-fury 4914772.2, gratin-arc 3991051.9, tater-minigun 3354502.8, harvest-moon 155327.6, grok-bot 110065.4, dog:dalmatian 2184.6.
- Kills 25899, by weapon: mash-avalanche 7920, pressure-cooker 5140, mandoline-fury 4872, gratin-arc 4130, tater-minigun 3552, grok-bot 159, harvest-moon 125, dog:dalmatian 1.
- Bosses killed 1, elites killed 6, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 4611, spent 0.
- Made: no evolution, union or evolved item.

### L2.I4.G4: titan-c boss-aware repeat

- Start: gym nm1-min16-titan-c (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook with its own planner.goal.
- Outcome: not played: gym nm1-min16-titan-c is retired.

### L2.I4.G5: titan-c baseline repeat

- Start: gym nm1-min16-titan-c (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook.
- Outcome: not played: gym nm1-min16-titan-c is retired.

### L2.I5.G1: full baseline repeat

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 300s; plays the playbook.
- Outcome: died after 86.7s (game clock 18:07); damage taken 352 (boss:ketchup-kraken 258.3, enemy:ice-imp 58.9, boss:compost-titan 34.7); 9119 kills; level 57 to 61; planner asked 25 times, action model 209, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 352, by source: boss:ketchup-kraken 258.3, enemy:ice-imp 58.9, boss:compost-titan 34.7; the killing blow: boss:ketchup-kraken.
- Damage dealt 5815031, by weapon: mash-avalanche 1601777.6, mandoline-fury 1141012.6, gratin-arc 1135201.1, pressure-cooker 1025956.1, tater-minigun 878850.4, harvest-moon 31274.6, dog:dalmatian 958.1.
- Kills 9119, by weapon: mash-avalanche 2620, pressure-cooker 1768, mandoline-fury 1717, gratin-arc 1683, tater-minigun 1289, harvest-moon 39, dog:dalmatian 3.
- Bosses killed 0, elites killed 2, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1613, spent 0.
- Made: no evolution, union or evolved item.

### L2.I5.G2: boss-aware goal repeat A

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 262.7s (game clock 21:03); damage taken 1621 (boss:ketchup-kraken 918.6, enemy:grease-fiend 294.4, enemy:pack-rat 158.8, enemy:hunt-crow 151.5); 24263 kills; level 57 to 68; planner asked 78 times, action model 730, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 1621, by source: boss:ketchup-kraken 918.6, enemy:grease-fiend 294.4, enemy:pack-rat 158.8, enemy:hunt-crow 151.5, enemy:ice-imp 84.6, Hot oil 12.8; the killing blow: enemy:grease-fiend.
- Damage dealt 25728510, by weapon: mash-avalanche 8829035.1, mandoline-fury 4794446.6, pressure-cooker 4697632.9, gratin-arc 3843275.6, tater-minigun 3407983.2, harvest-moon 132840, grok-bot 20268.1, dog:dalmatian 3028.4.
- Kills 24263, by weapon: mash-avalanche 7285, pressure-cooker 4743, mandoline-fury 4554, gratin-arc 4209, tater-minigun 3341, harvest-moon 112, grok-bot 18, dog:dalmatian 1.
- Bosses killed 3, elites killed 6, boss chests 2, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 4117, spent 30.
- Made: no evolution, union or evolved item.

### L2.I5.G3: boss-aware goal repeat B

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 216.5s (game clock 20:16); damage taken 1125 (boss:ketchup-kraken 610.5, enemy:grease-fiend 225.3, enemy:ice-imp 115.1, boss:harvester 85.1); 28727 kills; level 57 to 67; planner asked 61 times, action model 576, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 1125, by source: boss:ketchup-kraken 610.5, enemy:grease-fiend 225.3, enemy:ice-imp 115.1, boss:harvester 85.1, boss:compost-titan 65.9, Hot oil 22.6; the killing blow: enemy:grease-fiend.
- Damage dealt 19712212, by weapon: mash-avalanche 6802931.8, mandoline-fury 3911558.2, pressure-cooker 3431248.1, gratin-arc 2856476.7, tater-minigun 2530740.4, harvest-moon 137442.7, grok-bot 38885.1, dog:dalmatian 2929.4.
- Kills 28727, by weapon: mash-avalanche 9608, pressure-cooker 5705, mandoline-fury 5657, gratin-arc 4052, tater-minigun 3514, harvest-moon 95, grok-bot 94, dog:dalmatian 2.
- Bosses killed 0, elites killed 4, boss chests 0, crates bought 1, shrines used 1, items bought 0, revives used 0; gold earned 4230, spent 30.
- Made: no evolution, union or evolved item.

### L2.I5.G4: boss-aware plus planEvery 3

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 300s; plays the playbook with planEvery 3, its own planner.goal.
- Outcome: died after 132.3s (game clock 18:52); damage taken 899 (boss:ketchup-kraken 641.4, enemy:ice-imp 123.6, enemy:mud-golem 101.8, enemy:blight-spore 20.1); 15294 kills; level 57 to 64; planner asked 51 times, action model 288, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 899, by source: boss:ketchup-kraken 641.4, enemy:ice-imp 123.6, enemy:mud-golem 101.8, enemy:blight-spore 20.1, Hot oil 11.9; the killing blow: boss:ketchup-kraken.
- Damage dealt 10184181, by weapon: mash-avalanche 3108224.2, mandoline-fury 1882801.4, gratin-arc 1799535.2, pressure-cooker 1789778.3, tater-minigun 1544344.1, harvest-moon 57229.6, grok-bot 1167.5, dog:dalmatian 1100.6.
- Kills 15294, by weapon: mash-avalanche 4700, pressure-cooker 2963, mandoline-fury 2792, gratin-arc 2633, tater-minigun 2138, harvest-moon 59, grok-bot 6, dog:dalmatian 3.
- Bosses killed 1, elites killed 2, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2811, spent 0.
- Made: no evolution, union or evolved item.

### L2.I5.G5: boss-aware plus extraDamage 0

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 300s; plays the playbook with extraDamage 0, its own planner.goal.
- Outcome: died after 233.6s (game clock 20:33); damage taken 1204 (boss:ketchup-kraken 734.2, boss:compost-titan 208.3, enemy:ice-imp 179.5, enemy:mud-golem 78.3); 23926 kills; level 57 to 68; planner asked 70 times, action model 617, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 1204, by source: boss:ketchup-kraken 734.2, boss:compost-titan 208.3, enemy:ice-imp 179.5, enemy:mud-golem 78.3, Hot oil 3.4; the killing blow: enemy:ice-imp.
- Damage dealt 18621654, by weapon: mash-avalanche 5455340.2, mandoline-fury 3804110.1, gratin-arc 3339857.5, pressure-cooker 3156551.7, tater-minigun 2740652.1, harvest-moon 107311.1, grok-bot 14603.7, dog:dalmatian 3227.9.
- Kills 23926, by weapon: mash-avalanche 6626, mandoline-fury 5009, pressure-cooker 4617, gratin-arc 4183, tater-minigun 3399, harvest-moon 87, grok-bot 4, dog:dalmatian 1.
- Bosses killed 0, elites killed 4, boss chests 1, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 4050, spent 30.
- Made: no evolution, union or evolved item.

### L2.I5.G1: full gym my boss-aware goal A

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 175.6s (game clock 19:35); damage taken 1033 (boss:ketchup-kraken 963.9, boss:compost-titan 69.4); 19856 kills; level 57 to 64; planner asked 50 times, action model 493, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 1033, by source: boss:ketchup-kraken 963.9, boss:compost-titan 69.4; the killing blow: boss:ketchup-kraken.
- Damage dealt 13432676, by weapon: mash-avalanche 4438496.2, mandoline-fury 2410301.5, gratin-arc 2372191, pressure-cooker 2112492.1, tater-minigun 2021769, harvest-moon 74398.2, dog:dalmatian 1828.5, grok-bot 1199.9.
- Kills 19856, by weapon: mash-avalanche 6374, mandoline-fury 3739, pressure-cooker 3554, gratin-arc 3362, tater-minigun 2768, harvest-moon 52, grok-bot 5, dog:dalmatian 2.
- Bosses killed 1, elites killed 4, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 3504, spent 0.
- Made: no evolution, union or evolved item.

### L2.I5.G2: full gym my boss-aware goal B

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 133.6s (game clock 18:53); damage taken 698 (boss:ketchup-kraken 535.5, boss:compost-titan 104.2, enemy:ice-imp 58); 16439 kills; level 57 to 63; planner asked 36 times, action model 382, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 698, by source: boss:ketchup-kraken 535.5, boss:compost-titan 104.2, enemy:ice-imp 58; the killing blow: boss:compost-titan.
- Damage dealt 10611399, by weapon: mash-avalanche 3311942.7, mandoline-fury 2053462.1, gratin-arc 1826789.2, pressure-cooker 1756661.8, tater-minigun 1608078.7, harvest-moon 52724.9, dog:dalmatian 1739.1.
- Kills 16439, by weapon: mash-avalanche 5026, mandoline-fury 3184, pressure-cooker 2977, gratin-arc 2676, tater-minigun 2516, harvest-moon 58, dog:dalmatian 2.
- Bosses killed 0, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2322, spent 0.
- Made: no evolution, union or evolved item.

### L2.I6.G1: lo-full boss-aware A

- Start: gym nm1-min16-lo-full (Nightmare 1 at 16:40), seed 12DDMN0; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 261.9s (game clock 21:02); damage taken 517 (enemy:ice-imp 243.5, boss:ketchup-kraken 203.5, boss:compost-titan 65.9, Brambles 4.3); 31296 kills; level 50 to 68; planner asked 71 times, action model 629, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-pat 5, aged-russet 5.
- Damage taken 517, by source: enemy:ice-imp 243.5, boss:ketchup-kraken 203.5, boss:compost-titan 65.9, Brambles 4.3; the killing blow: enemy:ice-imp.
- Damage dealt 31471662, by weapon: mash-avalanche 11644616.5, pressure-cooker 6373516, mandoline-fury 5480734.2, gratin-arc 4099048.7, tater-minigun 3650813.6, harvest-moon 196381.2, spark-spud 16695.1, souffle-spud 4929.5.
- Kills 31296, by weapon: mash-avalanche 10498, pressure-cooker 6790, mandoline-fury 5172, gratin-arc 4557, tater-minigun 4115, harvest-moon 139, spark-spud 17, grok-bot 6.
- Bosses killed 3, elites killed 4, boss chests 2, crates bought 0, shrines used 0, items bought 1, revives used 0; gold earned 5561, spent 175.
- Made: no evolution, union or evolved item.

### L2.I6.G2: lo-full boss-aware B

- Start: gym nm1-min16-lo-full (Nightmare 1 at 16:40), seed 12DDMN0; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 210.7s (game clock 20:11); damage taken 908 (boss:ketchup-kraken 508.7, boss:compost-titan 197.6, enemy:mud-golem 79.7, enemy:grease-fiend 76.1); 23384 kills; level 50 to 64; planner asked 69 times, action model 565, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-pat 5, aged-russet 5.
- Damage taken 908, by source: boss:ketchup-kraken 508.7, boss:compost-titan 197.6, enemy:mud-golem 79.7, enemy:grease-fiend 76.1, boss:harvester 42.6, Brambles 1.9, Hot oil 0.9; the killing blow: enemy:mud-golem.
- Damage dealt 16845142, by weapon: mash-avalanche 5064476.1, gratin-arc 3118026.4, mandoline-fury 3114365.2, pressure-cooker 2792913, tater-minigun 2605332.2, harvest-moon 97966.5, grok-bot 41403.3, souffle-spud 7435.5.
- Kills 23384, by weapon: mash-avalanche 6894, pressure-cooker 4540, mandoline-fury 4263, gratin-arc 4070, tater-minigun 3454, grok-bot 84, harvest-moon 59, souffle-spud 17.
- Bosses killed 0, elites killed 4, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 3574, spent 0.
- Made: no evolution, union or evolved item.

### L2.I6.G3: lo-surv boss-aware A

- Start: gym nm1-min16-lo-surv (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook with its own planner.goal.
- Outcome: not played: checkpoint failed: checkpoint gym-nm1-min16-lo-surv was saved on game build sim-DwWYU7G5.js; this page runs sim-BEF9Qth5.js.

### L2.I6.G4: lo-surv boss-aware B

- Start: gym nm1-min16-lo-surv (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook with its own planner.goal.
- Outcome: not played: checkpoint failed: checkpoint gym-nm1-min16-lo-surv was saved on game build sim-DwWYU7G5.js; this page runs sim-BEF9Qth5.js.

### L2.I6.G5: full boss-aware new text

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 117.2s (game clock 18:37); damage taken 649 (enemy:ice-imp 402.5, boss:compost-titan 138.9, boss:ketchup-kraken 107.1); 15498 kills; level 57 to 64; planner asked 35 times, action model 296, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 649, by source: enemy:ice-imp 402.5, boss:compost-titan 138.9, boss:ketchup-kraken 107.1; the killing blow: enemy:ice-imp.
- Damage dealt 8928507, by weapon: mash-avalanche 2825368.3, mandoline-fury 1661139.8, gratin-arc 1520609.8, pressure-cooker 1513388, tater-minigun 1352646.5, harvest-moon 53920.8, dog:dalmatian 1433.3.
- Kills 15498, by weapon: mash-avalanche 4788, pressure-cooker 3015, mandoline-fury 2745, gratin-arc 2544, tater-minigun 2353, harvest-moon 53.
- Bosses killed 0, elites killed 2, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2628, spent 0.
- Made: no evolution, union or evolved item.

### L2.I7.G1: full playbook repeat A

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook.
- Outcome: died after 83.7s (game clock 18:04); damage taken 278 (boss:ketchup-kraken 151.2, enemy:ice-imp 124.8, Spore vent 1.7); 7984 kills; level 57 to 60; planner asked 21 times, action model 189, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 278, by source: boss:ketchup-kraken 151.2, enemy:ice-imp 124.8, Spore vent 1.7; the killing blow: enemy:ice-imp.
- Damage dealt 5047361, by weapon: mash-avalanche 1166354.5, gratin-arc 1091829, mandoline-fury 1058447.9, pressure-cooker 875613.8, tater-minigun 830738.4, harvest-moon 23079.1, dog:dalmatian 1298.3.
- Kills 7984, by weapon: mash-avalanche 2004, gratin-arc 1694, mandoline-fury 1531, pressure-cooker 1490, tater-minigun 1237, harvest-moon 27, dog:dalmatian 1.
- Bosses killed 0, elites killed 2, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1290, spent 0.
- Made: no evolution, union or evolved item.

### L2.I7.G2: full playbook repeat B

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook.
- Outcome: died after 121.5s (game clock 18:41); damage taken 593 (boss:ketchup-kraken 428.4, enemy:ice-imp 162.3, Hot oil 1.9); 16745 kills; level 57 to 64; planner asked 34 times, action model 324, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 593, by source: boss:ketchup-kraken 428.4, enemy:ice-imp 162.3, Hot oil 1.9; the killing blow: enemy:ice-imp.
- Damage dealt 9958154, by weapon: mash-avalanche 3212323.4, mandoline-fury 1840337, pressure-cooker 1791395.3, gratin-arc 1603084.3, tater-minigun 1445304.7, harvest-moon 64306.8, dog:dalmatian 1402.3.
- Kills 16745, by weapon: mash-avalanche 5245, pressure-cooker 3339, mandoline-fury 3113, gratin-arc 2575, tater-minigun 2409, harvest-moon 63, dog:dalmatian 1.
- Bosses killed 1, elites killed 2, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2551, spent 0.
- Made: no evolution, union or evolved item.

### L2.I8.G1: strict boss evade text

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 94.9s (game clock 18:15); damage taken 416 (boss:ketchup-kraken 214.2, boss:compost-titan 138.9, enemy:ice-imp 63.3); 10942 kills; level 57 to 61; planner asked 24 times, action model 267, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 416, by source: boss:ketchup-kraken 214.2, boss:compost-titan 138.9, enemy:ice-imp 63.3; the killing blow: boss:ketchup-kraken.
- Damage dealt 6548166, by weapon: mash-avalanche 1863116.8, mandoline-fury 1249414.4, gratin-arc 1243549.2, tater-minigun 1082805.3, pressure-cooker 1073445.6, harvest-moon 33851.4, grok-bot 1087.6, dog:dalmatian 895.8.
- Kills 10942, by weapon: mash-avalanche 3102, mandoline-fury 2138, gratin-arc 2039, pressure-cooker 1928, tater-minigun 1699, harvest-moon 30, grok-bot 6.
- Bosses killed 1, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1641, spent 0.
- Made: no evolution, union or evolved item.

### L2.I8.G2: strict text plus boss ranges 300

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with distrustBossRange 300, bossOfferRange 300, its own planner.goal.
- Outcome: died after 122.4s (game clock 18:42); damage taken 312 (boss:compost-titan 138.9, enemy:ice-imp 98.9, enemy:grease-fiend 73, Hot oil 0.7); 16423 kills; level 57 to 63; planner asked 35 times, action model 348, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 312, by source: boss:compost-titan 138.9, enemy:ice-imp 98.9, enemy:grease-fiend 73, Hot oil 0.7; the killing blow: boss:compost-titan.
- Damage dealt 9119606, by weapon: mash-avalanche 2879026.3, mandoline-fury 1853416.6, gratin-arc 1565258.9, pressure-cooker 1476160.5, tater-minigun 1279598.3, harvest-moon 64115.1, dog:dalmatian 2030.5.
- Kills 16423, by weapon: mash-avalanche 5013, mandoline-fury 3241, pressure-cooker 3158, gratin-arc 2679, tater-minigun 2274, harvest-moon 58.
- Bosses killed 1, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2241, spent 0.
- Made: no evolution, union or evolved item.

### L2.I8.G3: strict text plus evade 15

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with evadeSeconds 15, its own planner.goal.
- Outcome: died after 198.7s (game clock 19:59); damage taken 1048 (boss:ketchup-kraken 749.7, enemy:grease-fiend 157.7, boss:compost-titan 109, enemy:ice-imp 31.1); 25943 kills; level 57 to 65; planner asked 46 times, action model 558, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 1048, by source: boss:ketchup-kraken 749.7, enemy:grease-fiend 157.7, boss:compost-titan 109, enemy:ice-imp 31.1; the killing blow: boss:ketchup-kraken.
- Damage dealt 16539342, by weapon: mash-avalanche 5281790.2, mandoline-fury 3582363.6, pressure-cooker 2732185.4, gratin-arc 2556811.3, tater-minigun 2265305.4, harvest-moon 112944.8, grok-bot 5772.4, dog:dalmatian 2168.7.
- Kills 25943, by weapon: mash-avalanche 8285, mandoline-fury 5571, pressure-cooker 4628, gratin-arc 3903, tater-minigun 3447, harvest-moon 91, grok-bot 12, dog:dalmatian 6.
- Bosses killed 0, elites killed 4, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 4099, spent 0.
- Made: no evolution, union or evolved item.

### L2.I8.G4: strict text plus boss-aware hurt prompt

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with its own planner.goal, its own action.hurt.
- Outcome: died after 103.1s (game clock 18:23); damage taken 356 (boss:ketchup-kraken 321.3, boss:compost-titan 34.7); 10068 kills; level 57 to 61; planner asked 27 times, action model 294, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 356, by source: boss:ketchup-kraken 321.3, boss:compost-titan 34.7; the killing blow: boss:ketchup-kraken.
- Damage dealt 6681418, by weapon: mash-avalanche 1895088.1, gratin-arc 1417621.4, mandoline-fury 1210111.8, tater-minigun 1102956.6, pressure-cooker 1025862.1, harvest-moon 28762.6, dog:dalmatian 1015.3.
- Kills 10068, by weapon: mash-avalanche 2882, gratin-arc 2069, mandoline-fury 1742, pressure-cooker 1672, tater-minigun 1671, harvest-moon 32.
- Bosses killed 0, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1174, spent 0.
- Made: no evolution, union or evolved item.

### L2.I8.G5: playbook text plus boss ranges 300

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with distrustBossRange 300, bossOfferRange 300.
- Outcome: died after 110.9s (game clock 18:31); damage taken 767 (boss:ketchup-kraken 428.4, enemy:ice-imp 269.4, boss:compost-titan 69.4); 14315 kills; level 57 to 62; planner asked 34 times, action model 285, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 767, by source: boss:ketchup-kraken 428.4, enemy:ice-imp 269.4, boss:compost-titan 69.4; the killing blow: enemy:ice-imp.
- Damage dealt 8182283, by weapon: mash-avalanche 2318550, mandoline-fury 1721347.7, gratin-arc 1434445.9, pressure-cooker 1390464.6, tater-minigun 1263281.6, harvest-moon 52640.7, dog:dalmatian 1552.7.
- Kills 14315, by weapon: mash-avalanche 4136, mandoline-fury 2809, pressure-cooker 2775, gratin-arc 2351, tater-minigun 2203, harvest-moon 41.
- Bosses killed 0, elites killed 2, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1964, spent 0.
- Made: no evolution, union or evolved item.
