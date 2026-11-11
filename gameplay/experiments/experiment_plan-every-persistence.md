# Does a longer planEvery (10 s) let goals finish and open more chests?

| Field | Value |
| --- | --- |
| Status | done |
| Area | map |
| Result | inconclusive |
| Created | L3.I6 |
| Updated | L3.I7 |

## Hypothesis

At planEvery 5 the planner drops explore, spot and chest goals before they finish (17 dropped spot goals on s32, 0 of 4 listed chests opened). With planEvery 10, more goals complete, more chests are opened by 2:00, evolutions come sooner, and 5:00 survival is at least 4 of 5 against 3 of 5.

## Method

Seeker-sprouts from 0:00, 300 s, seeds 31-35, playbook knobs with only planEvery 10. Compare with the playbook games on the same seeds (5:00, 5:00, 3:05, 5:00, 2:39). Read goals done against dropped by kind, chests opened by 2:00, first evolution, damage by source and 5:00 survival. Check that evade still starts in time when elites or bosses arrive. A playbook change needs at least 4 of 5 lived and wins on at least 4 of 5 paired seeds.

## Findings

Seeker-sprouts with planEvery 10 on s31-35 lived 3 of 5 (s32, s34, s35), the same as the playbook at 5 (3 of 5). Paired: worse on s31 and s33, equal on s32 and s34, better on s35. Goal dropping continued, so persistence was not the limit. No playbook change.

## Games

### L3.I6.G1: planEvery 10 s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 300s; plays the playbook with planEvery 10.
- Outcome: died after 212s (game clock 03:32); damage taken 154 (Hot oil 1.667, enemy:potato-beetle 63.104, enemy:wireworm-larva 16.044, enemy:fry-fly 10.217); 773 kills; level 1 to 11; planner asked 51 times, action model 552; the models saw the game 31 ms late (p90 50); ended with seeker-sprouts 1, hash-hawk 7, peeler 1, reset-button 2, root-cellar 1, skipping-cannonball 1, chives 2.
- run.timeSec: 212
- run.level: 10
- run.kills: 773
- run.damageBySource: seeker-sprouts 4271.047, hash-hawk 12153.79, peeler 1725.917, reset-button 1376.987, grok-bot 138.382, alex 3019.015, root-cellar 942.052, skipping-cannonball 535.675
- run.damageTakenBySource: Hot oil 1.667, enemy:potato-beetle 63.104, enemy:wireworm-larva 16.044, enemy:fry-fly 10.217, enemy:bog-slime 4.317, Brambles 1.5, boss:amusing 9.979, enemy:swarm-fly 2.772, enemy:ketchup-drop 9.062, enemy:crumb-ant 12.617, enemy:oil-drip 9.894, enemy:aphid 1.857, enemy:bowling-pin 2.577, boss:beetle-queen 8.16
- run.killsBySource: seeker-sprouts 199, hash-hawk 252, peeler 62, reset-button 76, grok-bot 12, alex 137, root-cellar 20, skipping-cannonball 15
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","peel-forest","gutterball-lanes"]
- run.distance: 12248.833
- run.dodgePoints: 1462.646
- run.dodgeSecond: 212
- run.dodgeTaken: [130.73604124334318,133.3130765571441,133.3130765571441,133.3130765571441,136.0329265571441,136.0329265571441,136.0329265571441,138.75277655714407,138.75277655714407,138.75277655714407,138.75277655714407,138.75277655714407,138.75277655714407,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,141.47262655714408,153.76731396104003,103.47069604429662,103.47069604429662,103.47069604429662,103.47069604429662,103.47069604429662,103.47069604429662,105.2816058661148,107.09251568793297,107.09251568793297,107.09251568793297,107.09251568793297,107.09251568793297,107.09251568793297,107.09251568793297,107.09251568793297,108.9496011046551,108.9496011046551,121.30728236258274,126.2705895659506,126.2705895659506,126.2705895659506,126.2705895659506,126.2705895659506,128.16675934328208,128.16675934328208,128.16675934328208,128.16675934328208,128.16675934328208,128.16675934328208,128.16675934328208,130.73604124334318]
- run.dodgeSteps: [1058.4696666666146,1064.6696666666116,1070.8696666666087,1075.1063333332734,1079.8596666666044,1081.7196666666036,1087.9196666666007,1097.9896666665986,1104.1896666665957,1110.3896666665928,1116.58966666659,1121.3429999999212,1130.379666666589,1135.6289999999224,1141.8289999999195,1148.0289999999166,1153.4436666665795,1157.1636666665734,1162.578333333236,1168.7783333332331,1174.9783333332302,1181.1783333332273,1184.5883333332235,1187.9983333332198,1192.4313333332163,1198.6313333332134,1204.7848333332106,1213.7388333332083,1218.683333333205,1224.883333333202,856.4163333333676,862.6163333333647,868.8163333333617,875.0163333333588,881.2163333333559,887.416333333353,893.6163333333501,899.8163333333472,906.0163333333443,912.2163333333414,918.4163333333385,924.6163333333355,930.8163333333326,937.0163333333297,943.2163333333268,952.4263333333247,959.486333333322,965.6863333333191,971.8863333333162,978.0863333333133,988.1563333333113,994.3563333333084,1000.5563333333055,1006.7563333333026,1012.9563333332997,1019.1563333332967,1025.3563333332938,1031.556333333291,1037.756333333288,1043.956333333285,1050.1563333332822]
- run.curseSince: 6545
- run.killer: "enemy:potato-beetle"
- run.goldEarned: 217.405
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 6
- run.peakEnemies: 175
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 773
- counters.hits: 1411
- counters.gems: 524
- counters.coins: 32
- counters.shots: 850
- counters.hostileShots: 137
- counters.nearMisses: 7
- counters.hostileHits: 4
- Gold, spots and chests: gold held at the end 217, spent 0; spots charged and used: Crop Patch 1, Tater Lantern 1, Spud Freezer 1, Beetle Nest 1; chests seen 7, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Hash Hawk 55% over Peel Lash 26%, Aged Russet 19%; 0:36 took Chives 72% over Stuffed Skin 19%, Thick Skin 9%; 0:50 took Peeler 79% over Hash Hawk 14%, Seeker Sprouts 7%; 0:53 took Hash Hawk 61% over Clean Plate 14%, Reroll 14%, Seeker Sprouts 11%; 0:59 took Reset Button 79% over Stuffed Skin 14%, Peeler 5%, Reroll 2%; 1:49 took Chives 48% over Reroll 18%, Salt Shaker 17%, Seeker Sprouts 15%, Skip 2%; 2:32 took Reset Button 69% over Hash Hawk 21%, Reroll 6%, Seeker Sprouts 2%, Skip 2%; 3:00 took Root Cellar 40% over Hash Hawk 31%, Bacon Bits 19%, Reroll 7%, Skip 3%; 3:03 took Skipping Cannonball 44% over Bacon Bits 39%, Peel Out 9%, Reroll 5%, Skip 3%; 3:05 took Hash Hawk 55% over Bacon Bits 35%, Reroll 7%, Skip 2%, Seeker Sprouts 1%.

### L3.I6.G2: planEvery 10 s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 300s; plays the playbook with planEvery 10.
- Outcome: alive after 300.2s (game clock 05:00), health 170/176; damage taken 211 (enemy:snow-mold 14.304, enemy:frost-flea 5.753, Brambles 2.792, enemy:aphid 1.37); 2111 kills; level 1 to 17; planner asked 87 times, action model 534; the models saw the game 28 ms late (p90 48); ended with seeker-sprouts 4, harvest-moon 1, spud-grid 1, julienne-dash 3, skillet-flail 1, fry-knives 1, root-network 1, packed-pan 2, gravy-heart 1, peel-out 1.
- run.timeSec: 300.183
- run.level: 16
- run.kills: 2111
- run.damageBySource: seeker-sprouts 7288.929, harvest-moon 4482.875, potato-battery 23769.942, julienne-dash 3437.327, skillet-flail 3647.399, grok-bot 2960.697, fry-knives 4064.623, spud-grid 27691.979
- run.damageTakenBySource: enemy:snow-mold 14.304, enemy:frost-flea 5.753, Brambles 2.792, enemy:aphid 1.37, enemy:ketchup-drop 4.331, boss:amusing 78.26, enemy:oil-drip 2.006, enemy:sprout-mite 1.532, boss:beetle-queen 12.511, enemy:garden-slug 8.578, Hot oil 24.249, enemy:sand-crab 25.611, enemy:tomato-leech 11.029, enemy:beetle-brood 8.231, boss:the-masher 10.336
- run.killsBySource: seeker-sprouts 245, harvest-moon 87, potato-battery 869, julienne-dash 93, skillet-flail 99, grok-bot 68, fry-knives 54, spud-grid 596
- run.evolutions: [{"id":"spud-grid","at":242.76666666666668}]
- run.biomes: ["frozen-tundra","peel-forest","mash-swamp","ketchup-bog"]
- run.dogs: [{"id":"retriever","at":21.183333333333334}]
- run.dogHelp: fetched.retriever 1154
- run.distance: 15081.967
- run.dodgePoints: 2019.481
- run.dodgeSecond: 300
- run.dodgeTaken: [183.97295537138172,183.97295537138172,183.97295537138172,183.97295537138172,183.97295537138172,183.97295537138172,183.97295537138172,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,188.49322130702555,195.02655464035888,199.8098879736922,199.8098879736922,199.8098879736922,199.8098879736922,199.8098879736922,199.8098879736922,199.8098879736922,199.8098879736922,199.8098879736922,199.8098879736922,199.8098879736922,199.8098879736922,204.24322130702558,204.24322130702558,204.24322130702558,204.24322130702558,204.24322130702558,204.24322130702558,204.24322130702558,204.24322130702558,204.24322130702558,204.24322130702558,204.24322130702558,204.24322130702558,204.24322130702558,204.24322130702558,204.70988797369225,210.8932213070256,210.8932213070256,210.8932213070256,210.8932213070256,173.6369553713817,173.6369553713817,173.6369553713817,173.6369553713817]
- run.dodgeSteps: [1213.8206666665628,1220.02066666656,1226.220666666557,1227.357333333223,1227.667333333223,1233.8673333332201,1240.0673333332172,1246.2673333332143,1252.4673333332114,1258.6673333332085,1264.8673333332056,1269.5793333332022,1275.4073333331992,1281.6073333331963,1286.980666666527,1292.5606666665244,1296.1773333331894,1299.7939999998543,1304.831499999851,1308.2414999998473,1313.557999999844,1319.757999999841,1325.9579999998382,1332.1579999998353,1338.3579999998324,1344.5579999998295,1350.7579999998266,1356.9579999998236,1363.1579999998207,1369.3579999998178,1374.7313333331488,1374.7313333331488,1377.727999999814,1383.9279999998112,1390.1279999998083,1396.3279999998053,1402.5279999998024,1408.7279999997995,1414.9279999997966,1421.1279999997937,1427.3279999997908,1433.5279999997879,1439.727999999785,1443.9284999997813,1447.3384999997775,1452.1899999997743,1453.94666666644,1455.9099999997725,1461.0869999997692,1464.4969999997654,1469.8599999997623,1476.0599999997594,1482.2599999997565,1488.4599999997536,1494.6599999997507,1500.8599999997477,1507.0599999997448,1200.9039999999022,1205.4506666665668,1211.650666666564,1211.650666666564]
- run.curseSince: 13040
- run.goldEarned: 399.405
- run.bossChests: 5
- run.bossesKilled: 3
- run.elitesKilled: 4
- run.peakEnemies: 179
- run.shrinesUsed: 5
- run.grokBotHelps: 6
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 2111
- counters.hits: 3935
- counters.gems: 2020
- counters.coins: 99
- counters.shots: 2358
- counters.hostileShots: 250
- counters.nearMisses: 25
- counters.hostileHits: 5
- shrineTotals.might: 0.132
- shrineTotals.maxHp: 31.2
- shrineTotals.armor: 10
- Gold, spots and chests: gold held at the end 399, spent 0; spots charged and used: Spud Freezer 3, Stray Dog 1, Crop Patch 1, Tater Lantern 1; chests seen 7, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Harvest Moon 52% over Seeker Sprouts 32%, Spud Fence 16%; 0:19 took Potato Battery 71% over Starch Plating 23%, Hash Rush 6%; 0:22 took Julienne Dash 70% over Potato Battery 16%, Gravy Heart 14%; 0:38 took Skillet Flail 88% over Harvest Moon 6%, Seeker Sprouts 6%; 0:53 took Potato Battery 53% over Sprouting Eyes 26%, Reroll 12%, Fertilizer 9%; 1:09 took Fry Knives 52% over Chives 27%, Butter Socks 12%, Reroll 9%; 1:18 took Damage 64% over Armor 32%, Crit 4%; 1:19 took Root Network 50% over Julienne Dash 26%, Reroll 15%, Skillet Flail 9%; 1:28 took Max HP 76% over XP gain 17%, Luck 7%; 1:35 took Packed Pan 37% over Root Network 31%, Julienne Dash 23%, Reroll 9%; 1:36 took Armor 89% over Duration 7%, Move speed 4%; 1:46 took Max HP 59% over XP gain 30%, Cooldown 11%; 1:57 took Damage 54% over Max HP 38%, Cooldown 8%; 2:01 took Julienne Dash 50% over Reroll 22%, Seeker Sprouts 17%, Fry Knives 11%; 2:22 took Packed Pan 61% over Harvest Moon 21%, Reroll 11%, Fry Knives 7%; 2:43 took Potato Battery 58% over Root Network 31%, Reroll 8%, Skillet Flail 3%; 3:18 took Gravy Heart 45% over Julienne Dash 42%, Reroll 9%, Fry Knives 4%; 3:37 took Peel Out 53% over Packed Pan 36%, Reroll 6%, Fry Knives 5%; 3:54 took Seeker Sprouts 31% over Sprouting Eyes 30%, Sour Cream 24%, Reroll 15%; 4:21 took Julienne Dash 49% over Root Network 28%, Reroll 17%, Fry Knives 6%; 4:55 took Seeker Sprouts 47% over Reroll 22%, Slow Cooker 16%, Fry Knives 15%.

### L3.I6.G3: planEvery 10 s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 300s; plays the playbook with planEvery 10.
- Outcome: died after 90.5s (game clock 01:30); damage taken 161 (Hot oil 18.333, enemy:oil-drip 1.822, enemy:potato-beetle 59.294, enemy:aphid 2.855); 218 kills; level 1 to 7; planner asked 25 times, action model 195; the models saw the game 27 ms late (p90 46); ended with seeker-sprouts 3, grab-bag 1, skipping-cannonball 1, root-cellar 1, deep-fryer 1.
- run.timeSec: 90.517
- run.level: 6
- run.kills: 218
- run.damageBySource: seeker-sprouts 2078.274, grab-bag 1309.893, skipping-cannonball 380.601, root-cellar 581.962, deep-fryer 279.056
- run.damageTakenBySource: Hot oil 18.333, enemy:oil-drip 1.822, enemy:potato-beetle 59.294, enemy:aphid 2.855, enemy:crumb-ant 2.821, enemy:fry-fly 2.283, Brambles 9.1, enemy:wireworm-larva 51.779, enemy:snow-mold 5.772, enemy:frost-flea 1.47, enemy:compost-maggot 5.923
- run.killsBySource: seeker-sprouts 123, grab-bag 61, skipping-cannonball 20, deep-fryer 9, root-cellar 5
- run.biomes: ["fry-oil-desert","chip-canyons","compost-caves"]
- run.dogs: [{"id":"retriever","at":40.583333333333336}]
- run.dogHelp: fetched.retriever 46
- run.distance: 5145.433
- run.dodgePoints: 715.003
- run.dodgeSecond: 90
- run.dodgeTaken: [20.15525078868312,20.15525078868312,20.15525078868312,20.15525078868312,20.15525078868312,29.09487745534979,29.09487745534979,33.56469078868312,33.56469078868312,36.29629797588622,38.57922989045377,38.57922989045377,38.57922989045377,38.57922989045377,38.57922989045377,40.57922989045377,41.979229890453766,41.979229890453766,41.979229890453766,56.10080071782556,65.51518126940675,67.71518126940676,80.15480793607341,80.15480793607341,80.15480793607341,89.5691884876546,98.9835690392358,124.57996297397032,142.88909790168938,155.2635091667354,4.499999999999999,12.166666666666657,12.166666666666657,12.166666666666657,12.166666666666657,12.166666666666657,12.166666666666657,12.166666666666657,12.166666666666657,12.166666666666657,12.166666666666657,12.166666666666657,18.333333333333325,18.333333333333325,18.333333333333325,18.333333333333325,18.333333333333325,18.333333333333325,18.333333333333325,18.333333333333325,18.333333333333325,18.333333333333325,18.333333333333325,20.15525078868312,20.15525078868312,20.15525078868312]
- run.dodgeSteps: [337.8999999999918,337.8999999999918,343.3766666666583,349.5766666666581,355.77666666665795,361.97666666665776,368.1766666666576,374.3766666666574,380.5766666666572,386.77666666665704,392.97666666665685,399.1766666666567,405.3766666666565,411.57666666665557,417.77666666665266,423.97666666665265,430.1766666666507,436.3766666666509,442.576666666649,448.7766666666477,454.97666666664907,460.96999999998025,465.9299999999779,472.12999999997817,477.089999999978,482.66999999997535,488.86999999997244,495.0699999999695,505.1399999999676,511.33999999996684,163.16333333333026,169.36333333333008,175.5633333333299,181.7633333333297,187.96333333332953,194.16333333332935,200.36333333332917,206.563333333329,212.76333333332883,218.96333333332865,225.16333333332847,225.9899999999951,230.94999999999496,237.14999999999478,243.3499999999946,249.5499999999944,255.74999999999423,261.949999999994,265.97999999999394,272.17999999999375,278.3799999999936,283.13333333332673,288.91999999999325,288.91999999999325,294.49999999999307,300.6999999999929,306.8999999999927,313.0999999999925,319.29999999999234,325.49999999999216,331.699999999992]
- run.curseSince: 2435
- run.killer: "enemy:wireworm-larva"
- run.goldEarned: 26.25
- run.elitesKilled: 1
- run.peakEnemies: 52
- run.grokBotHelps: 2
- counters.kills: 218
- counters.hits: 456
- counters.gems: 125
- counters.coins: 16
- counters.shots: 282
- Gold, spots and chests: gold held at the end 26, spent 0; spots charged and used: Crop Patch 2, Tater Lantern 2, Stray Dog 1; chests seen 1, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Seeker Sprouts 79% over Mash Finisher 11%, Gravy Splash 10%; 0:18 took Grab Bag 54% over Seeker Sprouts 35%, Masher Grip 11%; 0:27 took Skipping Cannonball 73% over Starch Bolt 14%, Gravy Boat 13%; 0:44 took Seeker Sprouts 47% over Grab Bag 28%, Slow Cooker 25%; 1:10 took Root Cellar 49% over Starch Puddle 38%, Salt Shaker 9%, Skip 4%; 1:20 took Deep Fryer 77% over Rotten Spud 10%, Hot Sauce 10%, Skip 3%.

### L3.I6.G4: planEvery 10 s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 300s; plays the playbook with planEvery 10.
- Outcome: alive after 300s (game clock 05:00), health 153/156; damage taken 107 (enemy:potato-beetle 7.946, enemy:sprout-mite 4.113, enemy:aphid 2.92, boss:amusing 9.147); 2745 kills; level 1 to 17; planner asked 93 times, action model 406; the models saw the game 29 ms late (p90 49); ended with seeker-sprouts 5, spud-cannon 2, tater-minigun 1, frozen-fries 2, sack-of-russets 1, whisk-vortex 1, peel-out 2, butter-pat 1, masher-grip 1.
- run.timeSec: 299.967
- run.level: 16
- run.kills: 2745
- run.damageBySource: seeker-sprouts 8283.175, spud-cannon 5980.283, locked-gatling 13921.79, frozen-fries 4148.235, spud-lob 5859.178, whisk-vortex 13909.155, grok-bot 38.832, sack-of-russets 21179.199, tater-minigun 11582.192
- run.damageTakenBySource: enemy:potato-beetle 7.946, enemy:sprout-mite 4.113, enemy:aphid 2.92, boss:amusing 9.147, enemy:compost-maggot 1.533, enemy:oil-drip 9.535, boss:beetle-queen 7.507, enemy:fry-fly 18.464, enemy:sand-crab 19.506, Hot oil 2.022, boss:the-masher 20.672, enemy:tomato-leech 3.779
- run.killsBySource: seeker-sprouts 343, spud-cannon 228, locked-gatling 512, frozen-fries 108, spud-lob 261, whisk-vortex 417, grok-bot 4, sack-of-russets 612, tater-minigun 260
- run.evolutions: [{"id":"sack-of-russets","at":202.01666666666668},{"id":"tater-minigun","at":237.93333333333334}]
- run.biomes: ["ketchup-bog","compost-caves","chip-canyons","fry-oil-desert"]
- run.dogs: [{"id":"retriever","at":131.91666666666666}]
- run.dogHelp: fetched.retriever 703
- run.distance: 16188.2
- run.dodgePoints: 2482.363
- run.dodgeSecond: 299
- run.dodgeTaken: [79.15571005261401,99.71181714784734,99.71181714784734,99.71181714784734,99.71181714784734,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,104.21523984878145,107.14340894985345,107.14340894985345,107.14340894985345,65.63906138327482,68.81971005261401,68.81971005261401,68.81971005261401,68.81971005261401]
- run.dodgeSteps: [1306.649999999929,1312.849999999926,1319.049999999923,1323.1833333332545,1323.1833333332545,1328.2466666665855,1334.4466666665826,1340.6466666665797,1346.8466666665768,1353.0466666665739,1359.246666666571,1365.446666666568,1371.6466666665651,1377.8466666665622,1384.0466666665593,1390.2466666665564,1396.4466666665535,1402.6466666665506,1408.8466666665477,1415.0466666665448,1421.2466666665418,1427.446666666539,1433.646666666536,1439.846666666533,1446.0466666665302,1452.2466666665273,1458.4466666665244,1464.6466666665215,1470.8466666665186,1477.0466666665156,1483.2466666665127,1489.4466666665098,1495.646666666507,1501.846666666504,1508.046666666501,1514.2466666664982,1520.4466666664953,1526.6466666664924,1532.8466666664895,1539.0466666664865,1539.563333333153,1541.423333333152,1547.623333333149,1553.8233333331461,1560.0233333331432,1566.2233333331403,1572.4233333331374,1578.6233333331345,1584.8233333331316,1591.0233333331287,1594.329999999794,1595.46666666646,1601.666666666457,1607.8666666664542,1610.2433333331196,1616.2366666664502,1291.1499999999362,1297.3499999999333,1300.7599999999316,1300.7599999999316,1300.7599999999316]
- run.curseSince: 17062
- run.goldEarned: 594.707
- run.goldSpent: 217
- run.bossChests: 7
- run.paidChests: 3
- run.bossesKilled: 3
- run.elitesKilled: 4
- run.peakEnemies: 181
- run.shrinesUsed: 2
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 2745
- counters.hits: 7710
- counters.gems: 2225
- counters.coins: 120
- counters.shots: 6203
- counters.hostileShots: 233
- counters.nearMisses: 9
- counters.hostileHits: 3
- shrineTotals.area: 0.06
- shrineTotals.armor: 10
- Gold, spots and chests: gold held at the end 377, spent 210 (Potato Crate 210); spots charged and used: Potato Crate 3, Crop Patch 2, Spud Freezer 2, Stray Dog 1, Beetle Nest 1; chests seen 7, opened 7.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Spud Cannon 53% over Sprout Squad 24%, Mash Finisher 23%; 0:23 took Peel Out 54% over Peel Phantom 44%, Golden Fry 2%; 0:24 took Locked Gatling 69% over Starch Plating 25%, Hash Boomerang 6%; 0:30 took Frozen Fries 50% over Chives 43%, Fry Knives 7%; 0:58 took Armor 61% over XP gain 33%, Luck 6%; 1:00 took Spud Lob 56% over Sprouting Eyes 25%, Peel Out 19%; 1:07 took Area 43% over Pickup range 38%, Crit 19%; 1:29 took Spud Lob 32% over Reroll 28%, Seeker Sprouts 25%, Spud Cannon 10%, Skip 5%; 1:43 took Whisk Vortex 70% over Butter Pat 12%, Reroll 10%, Spud Cannon 6%, Skip 2%; 1:52 took Locked Gatling 44% over Whisk Vortex 19%, Reroll 18%, Butter Pat 17%, Skip 2%; 2:16 took Peel Out 46% over Whisk Vortex 24%, Reroll 15%, Butter Pat 13%, Skip 2%; 2:37 took Locked Gatling 57% over Butter Pat 18%, Reroll 18%, Spud Cannon 5%, Skip 2%; 2:39 took Butter Pat 35% over Gravy Heart 27%, Reroll 21%, Seeker Sprouts 15%, Skip 2%; 3:07 took Spud Lob 47% over Packed Pan 25%, Peel Out 17%, Reroll 9%, Skip 2%; 3:36 took Masher Grip 76% over Lean Lunch 11%, Spud Cannon 6%, Reroll 6%, Skip 1%; 3:41 took Seeker Sprouts 45% over Reroll 19%, Gravy Splash 17%, Hot Sauce 12%, Skip 7%; 3:59 took Spud Cannon 38% over Butter Socks 35%, Reroll 16%, Fertilizer 9%, Skip 2%; 4:34 took Frozen Fries 41% over Hot Sauce 31%, Reroll 19%, Fertilizer 7%, Skip 2%.

### L3.I6.G5: planEvery 10 s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 300s; plays the playbook with planEvery 10.
- Outcome: alive after 300s (game clock 05:00), health 20/137; damage taken 207 (enemy:aphid 2.3, enemy:compost-maggot 8.386, Spore vent 5.867, enemy:sprout-mite 1.259); 2220 kills; level 1 to 14; planner asked 75 times, action model 687; the models saw the game 27 ms late (p90 48); ended with seeker-sprouts 5, spud-lob 2, reset-button 5, spud-fence 1, hash-brown-shield 1, skipping-cannonball 2, lean-lunch 1.
- run.timeSec: 300.033
- run.level: 13
- run.kills: 2220
- run.damageBySource: seeker-sprouts 12876.222, spud-lob 14699.815, reset-button 8896.435, spud-fence 23632.29, grok-bot 19.046, hash-brown-shield 8223.479, skipping-cannonball 3655.976
- run.damageTakenBySource: enemy:aphid 2.3, enemy:compost-maggot 8.386, Spore vent 5.867, enemy:sprout-mite 1.259, Brambles 5, enemy:cave-grub 31.788, enemy:bog-slime 4.412, boss:amusing 13.305, enemy:snow-mold 11.644, enemy:tomato-leech 12.176, boss:beetle-queen 29.918, enemy:crumb-ant 2.047, enemy:potato-beetle 8.259, enemy:sand-crab 19.153, boss:the-masher 47.029, enemy:frost-flea 4.673
- run.killsBySource: seeker-sprouts 507, spud-lob 473, reset-button 230, spud-fence 676, grok-bot 2, hash-brown-shield 276, skipping-cannonball 56
- run.biomes: ["compost-caves","peel-forest","gutterball-lanes","mash-swamp","ketchup-bog","frozen-tundra","chip-canyons","fry-oil-desert"]
- run.distance: 16824.02
- run.dodgePoints: 2050.138
- run.dodgeSecond: 300
- run.dodgeTaken: [153.70982237977194,153.70982237977194,155.9515034436062,155.9515034436062,167.14883677693953,167.14883677693953,167.14883677693953,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,173.86723677693954,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,176.20675562838088,182.92515562838088,185.35679549642774,201.44661912266034,201.44661912266034,201.44661912266034,201.44661912266034,201.44661912266034,202.24661912266032,207.21526134767268,207.21526134767268,207.21526134767268,207.21526134767268,207.21526134767268,207.21526134767268,207.21526134767268,142.5124890464386,142.5124890464386,142.5124890464386,142.5124890464386]
- run.dodgeSteps: [1394.2719999998158,1400.4719999998129,1406.67199999981,1412.871999999807,1417.6253333331383,1423.2053333331355,1429.4053333331326,1434.3653333331304,1438.3953333331285,1442.8386666664596,1449.0386666664567,1455.2386666664538,1461.438666666451,1467.638666666448,1473.838666666445,1480.0386666664422,1486.2386666664393,1492.4386666664363,1498.6386666664334,1504.8386666664305,1511.0386666664276,1517.2386666664247,1521.5786666664228,1526.5386666664203,1531.3953333330849,1535.5286666664163,1541.0053333330802,1543.6919999997458,1547.6186666664105,1551.9586666664086,1556.505333333073,1565.128666666405,1570.0886666664028,1574.2219999997342,1580.4219999997313,1586.6219999997284,1592.8219999997254,1595.921999999724,1598.6086666663894,1600.985333333055,1604.4986666663867,1606.5653333330524,1612.661999999716,1617.4153333330473,1623.4586666663786,1630.275333333044,1636.4753333330411,1642.6753333330385,1648.8753333330355,1657.6019999996993,1663.8019999996964,1669.7953333330267,1669.7953333330267,1669.7953333330267,1669.7953333330267,1675.9953333330238,1682.195333333021,1371.7453333331598,1377.945333333157,1381.8719999998216,1388.0719999998187]
- run.curseSince: 6290
- run.goldEarned: 229.848
- run.bossChests: 3
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 195
- run.shrinesUsed: 1
- run.grokBotHelps: 2
- run.lootRunnersMet: [1]
- counters.kills: 2220
- counters.hits: 3517
- counters.gems: 1189
- counters.coins: 74
- counters.shots: 1125
- counters.hostileShots: 306
- counters.nearMisses: 20
- counters.hostileHits: 6
- shrineTotals.maxHp: 14.4
- Gold, spots and chests: gold held at the end 229, spent 0; spots charged and used: Crop Patch 2, Tater Lantern 1; chests seen 6, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Spud Lob 45% over Peel Out 34%, Tailgate Fries 21%; 0:17 took Seeker Sprouts 50% over Mash Finisher 31%, Sour Cream 19%; 0:26 took Reset Button 80% over Grab Bag 12%, Gravy Heart 8%; 0:32 took Spud Fence 62% over Spud Lob 28%, Tater Trot 10%; 0:46 took Max HP 54% over Armor 41%, Move speed 5%; 1:18 took Spud Lob 45% over Spud Fence 40%, Tater Trot 15%; 1:20 took Hash Brown Shield 82% over Spud Fence 9%, Stuffed Skin 9%; 1:44 took Lean Lunch 60% over Spud Lob 22%, Reroll 11%, Fertilizer 7%; 2:12 took Reset Button 62% over Spud Lob 15%, Reroll 13%, Fertilizer 10%; 3:13 took Reset Button 62% over GPU 22%, Reroll 9%, Fertilizer 7%; 3:16 took Reset Button 77% over Reroll 10%, Spud Fence 8%, Fertilizer 5%; 3:19 took Skipping Cannonball 51% over Fertilizer 19%, Reroll 17%, Afterburner Fries 13%; 3:42 took Reset Button 80% over Four-Eyed Spud 12%, Reroll 6%, Fertilizer 2%; 4:02 took Skipping Cannonball 57% over Slow Cooker 16%, Reroll 14%, Fertilizer 13%.
