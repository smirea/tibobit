# Does a pick text that levels the top weapon and takes HP or armor beat spreading across new weapons?

| Field | Value |
| --- | --- |
| Status | done |
| Area | models |
| Result | inconclusive |
| Created | L3.I8 |
| Updated | L3.I9 |

## Hypothesis

A planner.pick that orders catalyst for a weapon at level 6+, then levels of the top weapon, then max HP, armor or regeneration, then other levels, and takes a new weapon only below 4 held, leaves fewer weapons at 1/8 at 5:00 and a higher max HP than the default. Damage per weapon rises and the thin-build deaths drop.

## Method

Seeker-sprouts from 0:00, 300 s, playbook knobs, only planner.pick changed. s31, s33 and s35 in L3.I8, s32 and s34 in L3.I9. The comparison is knobs-only games on the same seeds (5:00, 5:00, 3:05, 5:00, 2:39). Read weapons at 1/8 at 5:00, max hp, damage taken, first evolution and 5:00 survival. A playbook change needs 4 of 5 paired wins and games from 0:00 on fresh seeds. Fresh games cap at 300 s, so a 6:00-7:00 effect needs a gym built in the same iteration.

## Findings

Hold-levels picks on s31, s33 and s35 lived 1 of 3 (s35 5:00 with 3027 kills; s31 died 4:03 and s33 died 2:19, both with 0 chests), the same as the playbook on those seeds. The pick text still spread across new weapons, and the survivor's levels came from chests. s32 and s34 were not played, so a 4 of 5 paired result is out of reach. No playbook change.

## Games

### L3.I8.G3: hold-levels picks s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 243.8s (game clock 04:03); damage taken 187 (enemy:garden-slug 43.659, enemy:bog-slime 3.38, enemy:ketchup-drop 5.212, enemy:oil-drip 6.414); 814 kills; level 1 to 11; planner asked 83 times, action model 567; the models saw the game 33 ms late (p90 53); ended with seeker-sprouts 4, hash-hawk 3, steam-vent 1, peel-phantom 1, fertilizer 1, stuffed-skin 1.
- run.timeSec: 243.817
- run.level: 10
- run.kills: 814
- run.damageBySource: seeker-sprouts 6592.425, hash-hawk 7189.635, steam-vent 1409.052, dog:dalmatian 1142.256, peel-phantom 720.467, alex 5055.898
- run.damageTakenBySource: enemy:garden-slug 43.659, enemy:bog-slime 3.38, enemy:ketchup-drop 5.212, enemy:oil-drip 6.414, enemy:lint-bunny 3.019, boss:amusing 47.313, enemy:sand-crab 25.351, enemy:potato-beetle 6.741, Hot oil 4.613, enemy:wireworm-larva 3.569, boss:beetle-queen 13.787, enemy:crumb-ant 1.874, enemy:bowling-ball 5.037, boss:the-masher 17.063
- run.killsBySource: seeker-sprouts 326, hash-hawk 161, steam-vent 41, dog:dalmatian 56, peel-phantom 40, alex 190
- run.biomes: ["fry-oil-desert","mash-swamp","chip-canyons","coin-laundromat","peel-forest","ketchup-bog","gutterball-lanes"]
- run.dogs: [{"id":"dalmatian","at":45.13333333333333},{"id":"corgi","at":49.38333333333333}]
- run.dogHelp: damage.dalmatian 1142.256, hits.dalmatian 91, frozen.corgi 111
- run.distance: 14178.74
- run.dodgePoints: 1662.37
- run.dodgeSecond: 243
- run.dodgeTaken: [119.2707296486955,119.2707296486955,119.2707296486955,119.2707296486955,119.2707296486955,119.2707296486955,126.40419410198423,135.02079878517984,135.02079878517984,135.02079878517984,135.02079878517984,135.02079878517984,135.02079878517984,137.6057801901385,137.6057801901385,137.6057801901385,137.6057801901385,137.6057801901385,137.6057801901385,140.19076159509717,148.665229984973,148.665229984973,148.665229984973,148.665229984973,153.03250624837284,154.9066619494794,154.9066619494794,154.9066619494794,154.9066619494794,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,164.3165742148345,165.29310003643076,165.29310003643076,165.29310003643076,165.29310003643076,165.29310003643076,165.29310003643076,165.29310003643076,165.29310003643076,165.29310003643076,169.96769816587403,169.96769816587403,169.96769816587403,169.96769816587403,169.96769816587403,169.96769816587403,169.96769816587403,176.36617435635023]
- run.dodgeSteps: [1063.527499999821,1067.5574999998191,1073.7574999998162,1079.9574999998133,1084.194166666478,1089.7741666664754,1094.1141666664732,1100.3141666664703,1106.5141666664674,1112.7141666664645,1118.9141666664616,1125.1141666664587,1131.3141666664558,1139.6274999997881,1145.8274999997852,1150.5859999997817,1153.995999999778,1158.8009999997746,1165.0009999997717,1175.0709999997698,1181.270999999767,1187.470999999764,1191.8109999997619,1198.010999999759,1204.210999999756,1210.4109999997531,1216.6109999997502,1223.2409999997476,1232.8809999997454,1239.0809999997425,1245.2809999997396,1251.4809999997367,1257.6809999997338,1263.8809999997309,1270.080999999728,1276.280999999725,1282.4809999997221,1286.0304999997184,1294.5194999997161,1300.7194999997132,1306.092833333044,1309.399499999709,1315.599499999706,1322.259499999706,1327.7154999997026,1331.1254999996988,1336.6279999996957,1342.8279999996928,1349.0279999996899,1355.227999999687,1361.427999999684,1367.6279999996812,1373.8279999996782,1377.9613333330096,1384.1613333330067,1386.2279999996724,1391.8079999996698,1398.007999999667,1399.2479999996663,1403.5311666663297,1412.8106666663275]
- run.curseSince: 9975
- run.killer: "boss:the-masher"
- run.goldEarned: 73.815
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 181
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 814
- counters.hits: 1484
- counters.gems: 496
- counters.coins: 19
- counters.shots: 488
- counters.hostileShots: 292
- counters.nearMisses: 24
- counters.hostileHits: 10
- Gold, spots and chests: gold held at the end 73, spent 0; spots charged and used: Spud Freezer 3, Stray Dog 2, Crop Patch 1; chests seen 3, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Hash Hawk 45% over Aged Russet 35%, Peel Lash 20%; 0:28 took Steam Vent 68% over Spry Sprout 19%, Sour Cream 13%; 0:42 took Seeker Sprouts 79% over Chip Shuriken 16%, Thick Skin 5%; 1:05 took Seeker Sprouts 98% over Sprout Satellites 1%, Spud Cannon 1%; 1:39 took Hash Hawk 74% over Mezzaluna 19%, Clean Plate 7%; 1:54 took Peel Phantom 46% over Fertilizer 37%, Root Network 17%; 1:58 took Seeker Sprouts 85% over Gravy Splash 11%, Hash Boomerang 4%; 2:02 took Fertilizer 53% over Steam Vent 45%, Golden Fry 2%; 2:46 took Stuffed Skin 46% over GPU 30%, Hot Potato 24%; 4:03 took Hash Hawk 90% over Skipping Cannonball 7%, Steam Vent 3%.

### L3.I8.G4: hold-levels picks s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 139.1s (game clock 02:19); damage taken 122 (enemy:oil-drip 3.001, enemy:fry-fly 61.336, enemy:lint-bunny 0.924, Hot oil 12.206); 260 kills; level 1 to 8; planner asked 46 times, action model 402; the models saw the game 27 ms late (p90 46); ended with seeker-sprouts 4, skipping-cannonball 1, hearty-helping 1, starch-plating 2.
- run.timeSec: 139.133
- run.level: 7
- run.kills: 260
- run.damageBySource: seeker-sprouts 3531.875, skipping-cannonball 243.836, grok-bot 1145.721
- run.damageTakenBySource: enemy:oil-drip 3.001, enemy:fry-fly 61.336, enemy:lint-bunny 0.924, Hot oil 12.206, enemy:crumb-ant 8.891, enemy:sprout-mite 0.946, enemy:compost-maggot 2.288, enemy:frost-flea 1.191, enemy:potato-beetle 6.942, boss:amusing 23.83
- run.killsBySource: seeker-sprouts 190, skipping-cannonball 8, grok-bot 62
- run.biomes: ["fry-oil-desert","chip-canyons","ketchup-bog","compost-caves","frozen-tundra"]
- run.distance: 8396.353
- run.dodgePoints: 1070.191
- run.dodgeSecond: 139
- run.dodgeTaken: [53.692254825328504,56.672130380884056,59.65200593643961,65.61175704755073,73.88534453631034,79.84509564742146,85.80484675853258,91.7645978696437,99.60070453631035,119.11480231408814,119.11480231408814,119.11480231408814,119.11480231408814,119.11480231408814,119.11480231408814,119.11480231408814,119.11480231408814,119.11480231408814,44.129984952346,44.129984952346,44.129984952346,44.129984952346,44.129984952346,44.129984952346,44.129984952346,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,45.58572576650558,46.72949138921135,47.873257011917104,47.873257011917104,47.873257011917104,47.873257011917104,47.873257011917104,47.873257011917104,47.873257011917104,47.873257011917104,47.873257011917104,47.873257011917104,47.873257011917104,47.873257011917104,49.06458207003151,49.06458207003151,51.378418447680005,51.378418447680005,53.692254825328504,53.692254825328504]
- run.dodgeSteps: [729.0786666667078,735.2786666667062,741.4786666667045,747.6786666667034,753.8786666667031,760.0786666667033,766.2786666667051,772.4786666667027,778.6786666667027,784.8786666666999,794.9486666666984,801.1486666666967,807.3486666666952,813.5486666666926,817.0620000000247,826.4086666666893,832.6086666666864,838.8086666666835,482.25666666667314,488.4566666666722,494.65666666667056,500.85666666666765,507.05666666666474,513.2566666666619,519.456666666659,525.6566666666561,531.8566666666567,538.0566666666592,544.2566666666618,550.4566666666643,556.6566666666669,562.8566666666694,569.056666666672,575.2566666666745,581.456666666677,587.6566666666796,593.8566666666821,600.0566666666847,606.2566666666872,612.4566666666898,618.6566666666923,624.5466666666947,624.5466666666947,624.5466666666947,630.1886666666968,635.5206666666983,641.7206666667008,647.9206666667034,652.9116666667029,658.3676666667012,662.9866666667017,669.1866666667013,675.3866666666992,681.5866666667017,687.7866666667043,693.9866666667068,700.1866666667094,706.3866666667105,712.5866666667076,716.9886666667077,722.8786666667096]
- run.curseSince: 7801
- run.killer: "boss:amusing"
- run.goldEarned: 43.628
- run.elitesKilled: 2
- run.peakEnemies: 99
- run.grokBotHelps: 2
- run.botSwarms: 1
- counters.kills: 260
- counters.hits: 371
- counters.gems: 167
- counters.coins: 20
- counters.shots: 299
- counters.hostileShots: 120
- counters.nearMisses: 6
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 43, spent 0; spots charged and used: Tater Lantern 1, Spud Freezer 1; chests seen 2, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Hearty Helping 49% over Golden Fry 44%, Rotten Spud 7%; 0:22 took Seeker Sprouts 92% over Locked Gatling 6%, Salt Shaker 2%; 0:29 took Starch Plating 49% over Tailgate Fries 39%, Afterburner Fries 12%; 0:44 took Seeker Sprouts 84% over Lean Lunch 10%, Hearty Helping 6%; 1:42 took Skipping Cannonball 45% over Spry Sprout 33%, Seed Potato 21%, Skip 1%; 2:10 took Starch Plating 76% over Mash Landing 16%, Lean Lunch 8%, Skip 0%; 2:15 took Seeker Sprouts 47% over Starch Plating 36%, Reset Button 17%, Skip 0%.

### L3.I8.G5: hold-levels picks s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300s (game clock 05:00), health 120/120; damage taken 152 (enemy:sprout-mite 8.721, enemy:compost-maggot 8.774, enemy:potato-beetle 39.43, enemy:wireworm-larva 17.879); 3027 kills; level 1 to 20; planner asked 115 times, action model 756; the models saw the game 29 ms late (p90 50); ended with overgrowth 1, landmine-harvest 1, deep-fryer 4, broadside 1, butter-streak 1, rotten-spud 1, fertilizer 3.
- run.timeSec: 299.983
- run.level: 19
- run.kills: 3027
- run.damageBySource: seeker-sprouts 17674.826, tater-mines 7120.296, landmine-harvest 43364.474, deep-fryer 1412.246, grok-bot 3157.746, broadside 2437.358, overgrowth 46434.708
- run.damageTakenBySource: enemy:sprout-mite 8.721, enemy:compost-maggot 8.774, enemy:potato-beetle 39.43, enemy:wireworm-larva 17.879, enemy:aphid 8.343, enemy:ketchup-drop 7.66, enemy:bowling-ball 4.492, enemy:bowling-pin 2.216, enemy:bog-slime 2.408, enemy:crumb-ant 1.993, enemy:tomato-leech 4.101, enemy:garden-slug 14.62, boss:the-masher 29.113, Spore vent 2.533
- run.killsBySource: seeker-sprouts 510, tater-mines 311, landmine-harvest 1049, deep-fryer 13, grok-bot 93, broadside 42, overgrowth 1009
- run.evolutions: [{"id":"landmine-harvest","at":132.93333333333334},{"id":"overgrowth","at":246.55}]
- run.biomes: ["peel-forest","compost-caves","mash-swamp","gutterball-lanes","chip-canyons","fry-oil-desert","ketchup-bog"]
- run.distance: 16395.127
- run.dodgePoints: 2225.714
- run.dodgeSecond: 299
- run.curseHeldPeak: 6.747
- run.dodgeTaken: [138.55423820626547,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,149.7515715395988,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,152.28490487293215,120.63850487293215,120.63850487293215,120.63850487293215,120.63850487293215,127.35690487293215]
- run.dodgeSteps: [1321.4526666665183,1327.6526666665154,1328.0659999998484,1328.0659999998484,1331.3726666665136,1337.5726666665107,1343.7726666665078,1349.972666666505,1356.172666666502,1362.372666666499,1368.5726666664962,1374.7726666664933,1380.9726666664903,1387.1726666664874,1393.3726666664845,1399.5726666664816,1405.7726666664787,1411.9726666664758,1418.1726666664729,1424.37266666647,1426.3359999998024,1432.5359999997995,1438.7359999997966,1444.9359999997937,1451.1359999997908,1457.3359999997879,1463.535999999785,1469.735999999782,1475.9359999997791,1482.1359999997762,1488.3359999997733,1494.5359999997704,1500.7359999997675,1506.9359999997646,1513.1359999997617,1519.3359999997588,1525.5359999997559,1531.735999999753,1537.93599999975,1544.1359999997471,1550.3359999997442,1556.5359999997413,1562.7359999997384,1568.9359999997355,1575.1359999997326,1581.3359999997297,1587.5359999997268,1593.7359999997238,1599.935999999721,1606.135999999718,1612.335999999715,1618.5359999997122,1623.909333333043,1623.909333333043,1627.215999999708,1633.415999999705,1292.725999999865,1298.9259999998621,1305.1259999998592,1311.3259999998563,1315.2526666665212]
- run.curseTicks: 1150.5
- run.curseSince: 17360
- run.goldEarned: 915.68
- run.bossChests: 6
- run.bossesKilled: 5
- run.elitesKilled: 4
- run.peakEnemies: 195
- run.shrinesUsed: 1
- run.grokBotHelps: 6
- run.botSwarms: 2
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 3027
- counters.hits: 3688
- counters.gems: 2038
- counters.coins: 410
- counters.shots: 1714
- counters.hostileShots: 104
- counters.nearMisses: 8
- counters.hostileHits: 1
- shrineTotals.might: 0.072
- Gold, spots and chests: gold held at the end 915, spent 0; spots charged and used: Crop Patch 2; chests seen 9, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Tater Mines 46% over Root Network 43%, Clean Plate 11%; 0:23 took Seeker Sprouts 93% over Gravy Splash 4%, Rotten Spud 3%; 0:24 took Tater Mines 72% over Skipping Cannonball 18%, Spud Cannon 10%; 0:43 took Tater Mines 72% over Fertilizer 19%, Gravy Splash 9%; 0:48 took Damage 86% over XP gain 11%, Crit 3%; 1:08 took Tater Mines 91% over Seeker Sprouts 7%, Spry Sprout 2%; 1:18 took Tater Mines 69% over Rotten Spud 29%, GPU 2%; 1:37 took Rotten Spud 56% over Hash Brown Shield 26%, Reset Button 18%; 2:11 took Tater Mines 98% over Hot Sauce 1%, Seeker Sprouts 1%; 2:13 took Seeker Sprouts 91% over Potato Rain 6%, Hearty Helping 3%; 2:18 took Seeker Sprouts 88% over Locked Gatling 9%, Rotten Spud 3%; 2:46 took Fertilizer 52% over Gem Sling 32%, Salt Shaker 16%; 3:02 took Deep Fryer 47% over Tater Twirl 35%, Hot Potato 18%; 3:24 took Broadside 52% over Mash Finisher 26%, Hearty Helping 13%, Reroll 9%; 3:26 took Deep Fryer 51% over Mash Golem 33%, Potato Magnet 9%, Reroll 7%; 4:00 took Seeker Sprouts 99% over Butter Socks 1%, Root Spikes 0%, Reroll 0%; 4:05 took Fertilizer 95% over Potato Rain 3%, Fry Cook Sentry 1%, Reroll 1%; 4:49 took Butter Streak 48% over Fry Lance 34%, Reroll 11%, Starch Bolt 7%; 4:49 took Fertilizer 54% over Small Fry 33%, Masher Grip 9%, Reroll 4%; 4:50 took Deep Fryer 88% over Small Fry 8%, Seed Potato 3%, Reroll 1%.
