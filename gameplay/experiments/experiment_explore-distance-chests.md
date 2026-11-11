# Does a longer exploreDistance find chests and spots sooner than 300?

| Field | Value |
| --- | --- |
| Status | done |
| Area | map |
| Result | inconclusive |
| Created | L3.I2 |
| Updated | L3.I4 |

## Hypothesis

Explore goals end at 300 units or at the first new chest. Exploring 700 units reaches chests sooner and with fewer re-plans, which should raise chests opened by 2:00 on seeds where the first chest is late.

## Method

Seeker-sprouts with the playbook knobs and exploreDistance 700, 300 s. Seed 33 first (the knobs-only game died at 3:05 with 0 chests), then seeds 31, 32 and 34. Read first chest listed and opened, chests by 2:00, opening damage and 5:00 survival. One game per seed is a lead only.

## Findings

Seeker with exploreDistance 700 on s31, s33, s34, s35 lived 2 of 4, the same as knobs alone on those seeds (2 of 4). Chests by 2:00 were not consistently higher, and s34 and s35 died with 1 and 0 chests. Playbook stays at 300.

## Games

### L3.I2.G5: seeker explore 700 s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 300s; plays the playbook with exploreDistance 700.
- Outcome: alive after 300s (game clock 05:00), health 17/134; damage taken 268 (enemy:potato-beetle 40.009, enemy:aphid 5.799, enemy:oil-drip 3.429, enemy:snow-mold 51.508); 1803 kills; level 1 to 15; planner asked 101 times, action model 556; the models saw the game 30 ms late (p90 50); ended with seeker-sprouts 1, peel-phantom 1, comet-scythe 7, grab-bag 2, cold-storage 1, salt-line 1, slow-cooker 2, peel-out 1, big-bowl 2.
- run.timeSec: 300.017
- run.level: 14
- run.kills: 1803
- run.damageBySource: seeker-sprouts 5811.206, comet-scythe 6969.002, grab-bag 9908.577, root-cellar 11663.89, salt-line 5697.985, grok-bot 2906.043, cold-storage 20958.012, peel-phantom 95.339
- run.damageTakenBySource: enemy:potato-beetle 40.009, enemy:aphid 5.799, enemy:oil-drip 3.429, enemy:snow-mold 51.508, enemy:fry-fly 2.402, boss:amusing 34.371, enemy:beetle-brood 4.578, enemy:bowling-ball 49.11, boss:beetle-queen 5.44, enemy:sand-crab 4.649, boss:the-masher 67.184
- run.killsBySource: seeker-sprouts 210, comet-scythe 158, grab-bag 264, root-cellar 473, salt-line 157, grok-bot 79, cold-storage 459, peel-phantom 3
- run.evolutions: [{"id":"cold-storage","at":228.16666666666666}]
- run.biomes: ["fry-oil-desert","chip-canyons","compost-caves","frozen-tundra","gutterball-lanes","ketchup-bog","peel-forest","mash-swamp"]
- run.distance: 16729.26
- run.dodgePoints: 1729.997
- run.dodgeSecond: 300
- run.dodgeTaken: [212.49257296003844,212.49257296003844,212.49257296003844,212.49257296003844,212.49257296003844,212.49257296003844,212.49257296003844,212.49257296003844,212.49257296003844,223.68990629337176,223.68990629337176,223.68990629337176,223.68990629337176,234.88723962670508,234.88723962670508,234.88723962670508,234.88723962670508,246.08457296003843,246.08457296003843,246.08457296003843,246.08457296003843,246.08457296003843,257.2819062933718,257.2819062933718,257.2819062933718,257.2819062933718,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,268.47923962670507,201.2952396267051,201.2952396267051,201.2952396267051,201.2952396267051]
- run.dodgeSteps: [1407.653333333065,1410.6499999997302,1416.8499999997273,1423.0499999997244,1429.2499999997215,1433.6313333330538,1442.2546666663898,1448.4546666663869,1453.5179999997176,1458.8913333330486,1462.8179999997133,1467.467999999711,1471.6013333330425,1478.847999999708,1485.9079999997052,1492.1079999997023,1496.8613333330336,1496.8613333330336,1496.8613333330336,1499.547999999699,1499.547999999699,1499.547999999699,1504.8179999996964,1511.0179999996935,1517.2179999996906,1520.1113333330227,1526.3113333330198,1529.1013333330184,1531.5813333330173,1532.9246666663498,1537.3679999996812,1543.5679999996782,1549.7679999996753,1555.9679999996724,1560.7213333330035,1565.4746666663345,1568.1613333330001,1574.3613333329972,1580.5613333329943,1586.7613333329914,1592.9613333329885,1601.3779999996539,1607.577999999651,1613.777999999648,1616.5679999996469,1619.564666666312,1625.764666666309,1630.3113333329736,1636.5113333329707,1640.644666666302,1645.3979999996332,1650.2959999996299,1655.049333332961,1661.249333332958,1667.4493333329551,1668.8959999996212,1672.9259999996193,1383.7366666664068,1386.733333333072,1392.9333333330692,1402.5899999997341]
- run.curseSince: 15867
- run.goldEarned: 430.775
- run.bossChests: 6
- run.bossesKilled: 3
- run.elitesKilled: 6
- run.peakEnemies: 198
- run.shrinesUsed: 1
- run.grokBotHelps: 7
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1803
- counters.hits: 3408
- counters.gems: 929
- counters.coins: 100
- counters.shots: 2827
- counters.hostileShots: 374
- counters.nearMisses: 26
- counters.hostileHits: 3
- shrineTotals.maxHp: 12
- Gold, spots and chests: gold held at the end 430, spent 0; spots charged and used: Spud Freezer 2, Crop Patch 1; chests seen 9, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Peel Phantom 66% over Seeker Sprouts 31%, Hearty Helping 3%; 0:18 took Comet Scythe 91% over Seeker Sprouts 7%, Slow Cooker 2%; 0:23 took Grab Bag 64% over Slow Cooker 20%, Mash Mallet 16%; 0:57 took Root Cellar 85% over Grab Bag 11%, Seeker Sprouts 4%; 1:18 took Salt Line 95% over Bacon Bits 3%, Golden Fry 2%; 1:23 took Root Cellar 34% over Slow Cooker 26%, Reroll 22%, Seeker Sprouts 18%; 1:27 took Slow Cooker 55% over Sour Cream 19%, Salt Line 15%, Reroll 11%; 1:42 took Slow Cooker 68% over Comet Scythe 22%, Reroll 7%, Seeker Sprouts 3%; 2:24 took Comet Scythe 47% over Hot Start 37%, Reroll 9%, Hash Rush 7%; 2:29 took Comet Scythe 71% over Grab Bag 15%, Leave 9%, Seeker Sprouts 5%; 2:33 took Grab Bag 48% over Reroll 21%, Seeker Sprouts 18%, Salt Line 13%; 3:06 took Peel Out 51% over Grab Bag 24%, Mash Finisher 16%, Reroll 9%; 4:01 took Big Bowl 78% over Thick Skin 16%, Reroll 4%, Clean Plate 2%; 4:05 took Big Bowl 81% over Reroll 8%, Grab Bag 7%, Seeker Sprouts 4%; 4:07 took Comet Scythe 79% over Butter Socks 12%, Reroll 7%, Seeker Sprouts 2%; 4:24 took Max HP 63% over Pickup range 33%, Gold gain 4%.

### L3.I3.G3: seeker explore 700 s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 300s; plays the playbook with exploreDistance 700.
- Outcome: alive after 300.2s (game clock 05:00), health 119/120; damage taken 41 (Hot oil 21.528, enemy:fry-fly 11.175, boss:amusing 2.815, Spore vent 3.879); 2628 kills; level 1 to 17; planner asked 103 times, action model 413; the models saw the game 36 ms late (p90 57); ended with overgrowth 1, hash-bulwark 1, starch-puddle 2, spud-cannon 1, broadside 1, skillet-flail 1, starch-plating 3, sprouting-eyes 1, peel-out 2, fertilizer 1.
- run.timeSec: 300.233
- run.level: 16
- run.kills: 2628
- run.damageBySource: seeker-sprouts 17864.243, hash-brown-shield 3115.358, starch-puddle 7984.505, spud-cannon 6836.795, grok-bot 855.497, broadside 2645.975, hash-bulwark 18152.743, alex 3185.418, skillet-flail 1447.157, overgrowth 34034.047
- run.damageTakenBySource: Hot oil 21.528, enemy:fry-fly 11.175, boss:amusing 2.815, Spore vent 3.879, Brambles 1.352
- run.killsBySource: seeker-sprouts 574, hash-brown-shield 34, starch-puddle 250, spud-cannon 192, grok-bot 56, broadside 80, hash-bulwark 484, alex 116, skillet-flail 29, overgrowth 813
- run.evolutions: [{"id":"hash-bulwark","at":136.86666666666667},{"id":"overgrowth","at":266.3333333333333}]
- run.biomes: ["fry-oil-desert","chip-canyons","ketchup-bog","mash-swamp","peel-forest","compost-caves","coin-laundromat"]
- run.distance: 16991.772
- run.dodgePoints: 2793.619
- run.dodgeSecond: 300
- run.dodgeTaken: [40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505,40.74876507936505]
- run.dodgeSteps: [1377.996499999733,1382.584499999732,1390.0244999997308,1397.4644999997295,1402.3004999997288,1402.3004999997288,1408.0044999997276,1415.4444999997263,1422.884499999725,1430.3244999997237,1437.7644999997224,1445.204499999721,1452.6444999997198,1460.0844999997184,1467.5244999997171,1474.9644999997158,1482.4044999997145,1489.8444999997132,1497.284499999712,1504.7244999997106,1512.0404999997093,1518.2404999997063,1521.753833333038,1522.477166666371,1528.677166666368,1534.8771666663652,1541.0771666663622,1544.6938333330272,1544.6938333330272,1550.1704999996914,1556.3704999996885,1561.2271666663528,1561.2271666663528,1563.500499999685,1569.700499999682,1575.9004999996791,1582.1004999996762,1588.3004999996733,1589.0238333330065,1592.3304999996715,1598.5304999996686,1604.7304999996657,1610.9304999996627,1617.1304999996598,1623.330499999657,1629.530499999654,1635.730499999651,1641.9304999996482,1648.1304999996453,1654.3304999996424,1660.5304999996395,1666.7304999996365,1672.9304999996336,1679.1304999996307,1685.3304999996278,1691.530499999625,1697.730499999622,1364.563166666406,1370.763166666403,1376.9631666664002,1377.996499999733]
- run.curseSince: 17195
- run.goldEarned: 668.61
- run.goldSpent: 217
- run.bossChests: 9
- run.paidChests: 3
- run.bossesKilled: 4
- run.elitesKilled: 6
- run.peakEnemies: 193
- run.grokBotHelps: 4
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 2628
- counters.hits: 4117
- counters.gems: 1619
- counters.coins: 113
- counters.shots: 2184
- counters.hostileShots: 224
- counters.nearMisses: 12
- counters.hostileHits: 1
- Gold, spots and chests: gold held at the end 451, spent 187 (Potato Crate 187); spots charged and used: Spud Freezer 3, Crop Patch 1, Beetle Nest 1, Dinner Bell 1, Frenzy Fryer 1, Potato Crate 1, Tater Lantern 1; chests seen 10, opened 7.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Hash Brown Shield 82% over Tater Twirl 17%, Golden Fry 1%; 0:34 took Starch Puddle 88% over Spry Sprout 8%, Sour Cream 4%; 0:53 took Hash Brown Shield 48% over Starch Bolt 29%, Gravy Heart 23%; 1:23 took Spud Cannon 43% over Steam Vent 30%, Spud Fence 27%; 1:27 took Starch Plating 63% over Gem Sling 29%, Reroll 5%, Rotten Spud 3%; 1:50 took Hash Brown Shield 77% over Tot Stampede 16%, Reroll 6%, Seeker Sprouts 1%; 2:05 took Hash Brown Shield 95% over Reroll 3%, Stuffed Skin 1%, Starch Puddle 1%; 2:07 took Broadside 58% over Seeker Sprouts 24%, Reroll 13%, Mash Mallet 5%; 2:23 took Seeker Sprouts 47% over Four-Eyed Spud 24%, Reroll 20%, Spud Cannon 9%; 2:45 took Skillet Flail 74% over Gravy Heart 12%, Reroll 10%, Fertilizer 4%; 3:18 took Starch Plating 48% over Seeker Sprouts 35%, Reroll 10%, Fertilizer 7%; 3:27 took Starch Plating 64% over Bacon Bits 27%, Reroll 7%, Fertilizer 2%; 3:58 took Sprouting Eyes 53% over Fertilizer 23%, Spud Cannon 13%, Reroll 11%; 4:03 took Peel Out 55% over Starch Puddle 22%, Fertilizer 13%, Reroll 10%; 4:20 took Fertilizer 60% over Stuffed Skin 21%, Reroll 17%, Potato Magnet 2%; 4:46 took Peel Out 46% over Starch Puddle 35%, Reroll 15%, Fertilizer 4%.

### L3.I3.G4: seeker explore 700 s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 300s; plays the playbook with exploreDistance 700.
- Outcome: died after 158.3s (game clock 02:38); damage taken 165 (enemy:oil-drip 1.58, enemy:bowling-ball 42.868, enemy:tomato-leech 2.782, enemy:crumb-ant 1.43); 405 kills; level 1 to 8; planner asked 50 times, action model 372; the models saw the game 33 ms late (p90 53); ended with seeker-sprouts 2, sprout-satellites 1, comet-scythe 5, deep-fryer 1, harvest-moon 1, big-bowl 1.
- run.timeSec: 158.317
- run.level: 7
- run.kills: 405
- run.damageBySource: seeker-sprouts 3136.932, sprout-satellites 1079.881, comet-scythe 3112.191, grok-bot 1007.38, deep-fryer 865.501, harvest-moon 469.76
- run.damageTakenBySource: enemy:oil-drip 1.58, enemy:bowling-ball 42.868, enemy:tomato-leech 2.782, enemy:crumb-ant 1.43, Hot oil 3.2, enemy:ketchup-drop 6.275, boss:amusing 106.441
- run.killsBySource: seeker-sprouts 161, sprout-satellites 21, comet-scythe 129, grok-bot 52, deep-fryer 26, harvest-moon 16
- run.biomes: ["fry-oil-desert","chip-canyons","frozen-tundra","compost-caves","peel-forest","ketchup-bog","gutterball-lanes","mash-swamp"]
- run.distance: 9002.615
- run.dodgePoints: 1097.961
- run.dodgeSecond: 158
- run.dodgeTaken: [55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,72.36912015234185,85.67418681900851,125.58938681900852,152.19952015234185,152.19952015234185,152.19952015234185,152.19952015234185,152.19952015234185,152.19952015234185,152.19952015234185,152.19952015234185,152.19952015234185,152.19952015234185,152.19952015234185,155.52578681900852,158.85205348567519,158.85205348567519,162.17832015234185,162.17832015234185,162.17832015234185,162.17832015234185,162.17832015234185,162.17832015234185,162.17832015234185,162.17832015234185,162.17832015234185,162.17832015234185,162.17832015234185,162.17832015234185,39.939812443877805,39.939812443877805,43.81828459678629,43.81828459678629,43.81828459678629,43.81828459678629,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851,55.73778681900851]
- run.dodgeSteps: [676.0273333333772,682.2273333333798,688.4273333333823,694.6273333333849,700.8273333333874,707.02733333339,713.2273333333925,719.427333333395,725.6273333333967,731.8273333333977,738.0273333333993,744.2273333334,754.2973333334019,760.4973333334032,766.6973333334057,772.8973333334083,779.0973333334102,784.6906666667435,791.7506666667439,797.9506666667461,803.3136666667472,808.0721666667494,815.9515000000837,819.3615000000833,823.3915000000814,827.6281666667461,832.7948333334103,841.624833333409,847.8248333334061,854.0248333334032,860.2248333334003,866.4248333333974,872.6248333333945,878.8248333333916,885.0248333333886,891.2248333333857,894.4281666667175,543.7038333333591,549.9038333333616,556.1038333333632,562.3038333333603,568.5038333333581,574.7038333333592,580.9038333333594,587.103833333362,593.3038333333645,599.5038333333671,605.7038333333675,611.5938333333684,613.7638333333676,618.7083333333668,622.1183333333685,627.0163333333678,633.2163333333649,639.416333333362,645.6163333333641,651.8163333333666,656.9468333333688,661.3798333333708,667.0218333333731,670.4318333333748]
- run.curseSince: 4126
- run.killer: "enemy:ketchup-drop"
- run.goldEarned: 58.265
- run.bossChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 116
- run.grokBotHelps: 2
- run.botSwarms: 1
- counters.kills: 405
- counters.hits: 858
- counters.gems: 186
- counters.coins: 15
- counters.shots: 319
- counters.hostileShots: 156
- counters.nearMisses: 8
- counters.hostileHits: 8
- Gold, spots and chests: gold held at the end 58, spent 0; spots charged and used: none; chests seen 3, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:07 took Sprout Satellites 92% over Hot Sauce 4%, Spud Sneakers 4%; 0:20 took Comet Scythe 62% over Sprouting Eyes 28%, Spud Cannon 10%; 0:45 took Comet Scythe 54% over Hash Hawk 43%, Sprout Satellites 3%; 0:51 took Comet Scythe 91% over Leave 6%, Seeker Sprouts 2%, Sprout Satellites 1%; 0:55 took Comet Scythe 94% over Leave 3%, Seeker Sprouts 2%, Sprout Satellites 1%; 1:08 took Big Bowl 69% over Hot Streak 20%, Fry Lance 11%; 1:28 took Deep Fryer 53% over Seeker Sprouts 25%, Reroll 15%, Salt Shaker 7%; 1:39 took Seeker Sprouts 35% over Deep Fryer 25%, Reroll 20%, Potato Magnet 16%, Skip 4%; 1:48 took Harvest Moon 59% over Big Bowl 33%, Reroll 5%, Sprout Satellites 2%, Skip 1%.

### L3.I3.G5: seeker explore 700 s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 300s; plays the playbook with exploreDistance 700.
- Outcome: died after 165.2s (game clock 02:45); damage taken 145 (enemy:aphid 4.493, enemy:sprout-mite 1.292, enemy:sand-crab 3.028, enemy:bog-slime 3.62); 449 kills; level 1 to 8; planner asked 52 times, action model 383; the models saw the game 28 ms late (p90 48); ended with seeker-sprouts 2, gravy-boat 1, mash-golem 1, frying-pan 1, tater-pup 1, peel-out 2, bacon-bits 1.
- run.timeSec: 165.167
- run.level: 7
- run.kills: 449
- run.damageBySource: seeker-sprouts 3548.597, gravy-boat 4128.748, mash-golem 325.401, frying-pan 1418.226, tater-pup 531.429
- run.damageTakenBySource: enemy:aphid 4.493, enemy:sprout-mite 1.292, enemy:sand-crab 3.028, enemy:bog-slime 3.62, enemy:tomato-leech 89.949, enemy:crumb-ant 1.416, Hot oil 0.815, enemy:compost-maggot 2.448, Brambles 5.299, boss:amusing 22.088, enemy:ketchup-drop 7.443, enemy:bowling-ball 3.566
- run.killsBySource: seeker-sprouts 195, gravy-boat 176, mash-golem 14, frying-pan 44, tater-pup 20
- run.biomes: ["compost-caves","peel-forest","chip-canyons","mash-swamp","ketchup-bog"]
- run.distance: 9879.405
- run.dodgePoints: 1032.684
- run.dodgeSecond: 165
- run.dodgeTaken: [104.89693955873041,104.89693955873041,104.89693955873041,104.89693955873041,104.89693955873041,105.9878486496395,107.31252397431481,107.31252397431481,107.31252397431481,107.31252397431481,107.31252397431481,110.19354234701822,110.19354234701822,122.9744489264262,126.50213479757794,126.50213479757794,126.50213479757794,126.50213479757794,126.50213479757794,126.50213479757794,128.42281371271355,128.42281371271355,131.30383208541699,131.30383208541699,131.30383208541699,131.30383208541699,131.30383208541699,131.30383208541699,133.329806111391,133.329806111391,133.329806111391,133.329806111391,136.21082448409442,136.21082448409442,136.21082448409442,136.21082448409442,136.21082448409442,138.08558646329803,143.54092107148477,143.54092107148477,143.54092107148477,143.54092107148477,143.54092107148477,143.54092107148477,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.03979670158755,104.27356293535378]
- run.dodgeSteps: [728.381666666733,734.5816666667317,740.7816666667325,746.9816666667296,753.1816666667266,759.3816666667237,765.5816666667221,771.7816666667193,777.9816666667218,784.1816666667244,790.2783333333936,795.1350000000623,799.8883333333976,806.0883333333998,812.2883333333968,822.3583333333961,828.0003333333931,833.2238333333898,839.4238333333869,845.623833333384,854.2471666667161,860.2405000000466,866.4405000000437,872.6405000000408,882.7105000000389,888.910500000036,895.1105000000331,901.3105000000302,907.5105000000273,913.7105000000244,923.7805000000224,928.9471666666866,932.4605000000183,936.697166666683,939.7971666666815,945.630500000015,950.5905000000126,956.3771666666765,962.370500000007,966.9171666666716,969.8105000000036,979.8805000000017,982.7738333333336,987.4238333333315,622.9816666667358,629.1816666667384,635.3816666667358,641.5816666667329,647.7816666667329,653.9816666667327,660.1816666667298,666.3816666667269,672.581666666724,678.7816666667231,684.9816666667247,691.1816666667272,697.3816666667298,703.5816666667323,709.7816666667322,715.9816666667317,722.1816666667335]
- run.curseSince: 8264
- run.killer: "enemy:ketchup-drop"
- run.goldEarned: 25.043
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 116
- run.shrinesUsed: 1
- run.grokBotHelps: 3
- counters.kills: 449
- counters.hits: 1030
- counters.gems: 201
- counters.coins: 13
- counters.shots: 566
- counters.hostileShots: 190
- counters.nearMisses: 5
- counters.hostileHits: 4
- shrineTotals.armor: 17
- Gold, spots and chests: gold held at the end 25, spent 0; spots charged and used: Crop Patch 1; chests seen 3, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Peel Out 43% over Spud Lob 35%, Tailgate Fries 22%; 0:18 took Peel Out 34% over Gem Sling 33%, Seeker Sprouts 33%; 0:23 took Gravy Boat 62% over Seeker Sprouts 31%, Fertilizer 7%; 0:35 took Seeker Sprouts 47% over Gravy Boat 37%, Leave 16%; 0:40 took Mash Golem 48% over Potato Magnet 32%, Starch Plating 20%; 1:19 took Armor 86% over Move speed 11%, Pickup range 3%; 1:24 took Frying Pan 51% over Peel Out 37%, Tater Mines 12%; 2:09 took Tater Tot Pup 69% over Seeker Sprouts 25%, Gravy Boat 6%; 2:17 took Bacon Bits 69% over Tater Tot Pup 17%, Gravy Boat 14%.
