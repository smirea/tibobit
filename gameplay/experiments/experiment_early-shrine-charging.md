# Does a shrine-first goal prompt in the first 2 minutes raise max HP, armor and survival?

| Field | Value |
| --- | --- |
| Status | done |
| Area | spots |
| Result | inconclusive |
| Created | L4.I1 |
| Updated | L4.I2 |

## Hypothesis

The planner rates Spud Shrines at 25-35% against explore at 30-45%, so most builds stay at 120 max hp and 0 armor. The L3.I9 games that charged shrines reached 140-149 max hp and 14-26 armor. A planner.goal that rates the nearest Spud Shrine within 300 units very high before 2:00 (health above 60%, no elite or boss near) gives armor and max HP by 2:00, cuts the opening damage and raises survival to 3:00 and 4:00.

## Method

Seeker-sprouts with the playbook knobs, 240 s from 0:00 on seeds 31-35, only planner.goal changed. Pair each game with the playbook game on file (5:00, 5:00, 3:05, 5:00, 2:39). Read shrines charged, max hp and armor at 2:00, damage by 2:30, spot goals dropped against finished, chests opened by 2:00, and survival to 3:00 and 4:00. Seeds 36-40 with new playbook baselines follow if the arm shows a clear margin.

## Findings

Shrine-first planner.goal on seeker-sprouts s31-35, 240 s: alive at 4:00 on 2 of 5 (s33, s35) against 3 of 5 for the playbook (paired 2 wins, 3 losses). Shrines were charged (max hp 134 in 3 games, armor 12-29 in 2), but s31, s32 and s34 died at 3:12-3:24 with 0-1 chests opened and 80-105 health lost to the amusing boss or the 3:00 swarm. Spot goals were still dropped often. Not added to the playbook.

## Games

### L4.I1.G1: shrine goal s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 205s (game clock 03:24); damage taken 167 (enemy:lint-bunny 8.024, enemy:oil-drip 9.052, Hot oil 10.5, enemy:sand-crab 24.218); 483 kills; level 1 to 8; planner asked 67 times, action model 382; the models saw the game 35 ms late (p90 54); ended with seeker-sprouts 1, reset-button 3, spud-cannon 1, frozen-fries 1, butter-socks 1, four-eyed-spud 1.
- run.timeSec: 204.95
- run.level: 7
- run.kills: 483
- run.damageBySource: seeker-sprouts 3982.171, reset-button 1977.088, spud-cannon 3960.453, frozen-fries 1929.659
- run.damageTakenBySource: enemy:lint-bunny 8.024, enemy:oil-drip 9.052, Hot oil 10.5, enemy:sand-crab 24.218, enemy:crumb-ant 3.107, enemy:swarm-fly 2.772, boss:amusing 79.83, enemy:sprout-mite 3.535, Brambles 6.1, enemy:ketchup-drop 2.263, enemy:bog-slime 4.672, boss:beetle-queen 5.44, enemy:tomato-leech 4.046, enemy:wireworm-larva 3.887
- run.killsBySource: seeker-sprouts 183, reset-button 41, spud-cannon 203, frozen-fries 56
- run.biomes: ["coin-laundromat","chip-canyons","fry-oil-desert","mash-swamp","peel-forest","compost-caves","ketchup-bog"]
- run.distance: 12599.967
- run.dodgePoints: 1397.371
- run.dodgeSecond: 204
- run.dodgeTaken: [123.74309359130817,123.74309359130817,123.74309359130817,123.74309359130817,126.33864723629247,130.89934629150355,130.89934629150355,138.1668921244769,147.68728797986856,149.9608909124141,149.9608909124141,149.9608909124141,149.9608909124141,149.9608909124141,156.79422424574742,156.79422424574742,156.79422424574742,156.79422424574742,160.84048666344495,160.84048666344495,160.84048666344495,164.72710491329224,107.37873919452952,107.37873919452952,107.37873919452952,110.70500586119618,110.70500586119618,110.70500586119618,110.70500586119618,110.70500586119618,112.48745056243075,112.48745056243075,112.48745056243075,112.48745056243075,112.48745056243075,112.48745056243075,112.48745056243075,112.48745056243075,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,114.3168269246415,115.3168269246415,120.4168269246415,120.4168269246415,120.4168269246415,120.4168269246415,120.4168269246415,123.74309359130817]
- run.dodgeSteps: [1119.3699999997648,1125.5699999997619,1131.769999999759,1137.969999999756,1144.1699999997531,1150.3699999997502,1156.5699999997473,1162.7699999997444,1168.9699999997415,1175.1699999997386,1181.3699999997357,1187.5699999997328,1193.7699999997299,1199.969999999727,1206.169999999724,1212.3699999997211,1218.5699999997182,1224.7699999997153,1230.9699999997124,1237.1699999997095,1243.3699999997066,1247.7099999997045,861.0666666665359,867.266666666533,881.206666666532,887.4066666665291,893.6066666665262,899.8066666665233,906.0066666665203,912.2066666665174,918.4066666665145,924.6066666665116,930.8066666665087,937.0066666665058,943.2066666665029,949.4066666665,955.6066666664971,961.8066666664942,975.7466666664932,981.9466666664903,988.1466666664874,994.3466666664845,1004.4166666664826,1010.6166666664797,1016.8166666664767,1023.0166666664738,1029.216666666471,1035.416666666468,1041.616666666465,1047.8166666664622,1054.0166666664593,1060.2166666664564,1066.4166666664535,1071.2733333331178,1077.0599999997817,1083.2599999997788,1089.046666666443,1092.353333333108,1098.553333333105,1104.753333333102,1109.2999999997667]
- run.curseSince: 8373
- run.killer: "boss:beetle-queen"
- run.goldEarned: 18.428
- run.elitesKilled: 4
- run.peakEnemies: 181
- run.shrinesUsed: 1
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 483
- counters.hits: 982
- counters.gems: 193
- counters.coins: 16
- counters.shots: 741
- counters.hostileShots: 604
- counters.nearMisses: 36
- counters.hostileHits: 6
- shrineTotals.maxHp: 12
- Gold, spots and chests: gold held at the end 18, spent 0; spots charged and used: none; chests seen 4, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Max HP 57% over Cooldown 33%, Crit 10%; 0:10 took Reset Button 86% over Peel Out 7%, Seeker Sprouts 7%; 0:16 took Reset Button 45% over Deep Fryer 40%, Aged Russet 15%; 0:32 took Spud Cannon 59% over Sprouting Eyes 35%, Spud Sneakers 6%; 1:12 took Frozen Fries 72% over Spud Cannon 20%, Salt Shaker 8%; 1:46 took Butter Socks 46% over Frozen Fries 35%, Seeker Sprouts 19%; 2:19 took Four-Eyed Spud 56% over Mash Landing 38%, Gem Sling 6%; 2:52 took Reset Button 84% over Butter Socks 11%, Mash Finisher 5%.

### L4.I1.G2: shrine goal s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 192.5s (game clock 03:12); damage taken 209 (Spore vent 3.6, enemy:cave-grub 2.426, Brambles 6.7, enemy:compost-maggot 33.109); 889 kills; level 1 to 9; planner asked 67 times, action model 434; the models saw the game 32 ms late (p90 50); ended with seeker-sprouts 1, hash-hawk 6, locked-gatling 1, butter-pat 1, bacon-bits 1.
- run.timeSec: 192.5
- run.level: 8
- run.kills: 889
- run.damageBySource: seeker-sprouts 4435.606, hash-hawk 8311.897, grok-bot 79.297, locked-gatling 6614.367
- run.damageTakenBySource: Spore vent 3.6, enemy:cave-grub 2.426, Brambles 6.7, enemy:compost-maggot 33.109, enemy:sprout-mite 16.144, enemy:snow-mold 11.469, enemy:frost-flea 17.082, enemy:parking-gull 15.73, enemy:crumb-ant 7.038, enemy:aphid 28.428, enemy:fry-fly 3.03, enemy:wireworm-larva 15.425, enemy:bog-slime 2.406, boss:beetle-queen 5.44, enemy:beetle-brood 22.888, enemy:potato-beetle 3.935, enemy:garden-slug 4.591, boss:the-masher 10.012
- run.killsBySource: seeker-sprouts 283, hash-hawk 246, grok-bot 7, locked-gatling 353
- run.biomes: ["compost-caves","peel-forest","frozen-tundra","fry-palace"]
- run.distance: 10988.933
- run.dodgePoints: 1522.91
- run.dodgeSecond: 192
- run.dodgeTaken: [112.5506087003704,112.5506087003704,117.18168264573707,132.53782357484795,150.4371435805263,186.9756203568551,188.93805859379938,188.93805859379938,188.93805859379938,192.87272414306923,35.90222054324359,35.90222054324359,35.90222054324359,35.90222054324359,35.90222054324359,35.90222054324359,37.627431803253465,39.35961025091437,41.09516071217685,44.57324014660354,46.3146967773862,51.50433881366048,53.25124722384773,53.25124722384773,53.25124722384773,53.25124722384773,54.987334338649056,54.987334338649056,54.987334338649056,54.987334338649056,54.987334338649056,54.987334338649056,54.987334338649056,54.987334338649056,54.987334338649056,54.987334338649056,58.61133206401742,58.61133206401742,58.61133206401742,60.43789905833803,60.43789905833803,62.26993014333908,62.26993014333908,62.26993014333908,62.26993014333908,62.26993014333908,62.26993014333908,69.72034134600794,75.27646792381182,75.27646792381182,81.97927058787269,83.8502681699987,87.616693561095,87.616693561095,91.4004928145015,91.4004928145015,91.4004928145015,93.29041677187185,95.19046452434792,95.19046452434792,106.8479774238722]
- run.dodgeSteps: [1037.8799999999057,1044.0799999999028,1050.2799999999,1056.479999999897,1062.679999999894,1068.8799999998912,1078.9499999998893,1085.1499999998864,1089.5933333332175,1095.7933333332146,729.8433333333626,736.0433333333651,742.2433333333631,748.4433333333602,754.6433333333573,760.8433333333544,767.0433333333515,773.2433333333486,779.4433333333457,785.643333333344,791.8433333333436,798.0433333333424,804.2433333333414,810.4433333333385,816.6433333333407,822.84333333334,829.043333333337,835.2433333333341,841.4433333333312,847.6433333333283,851.8799999999931,856.4266666666575,862.6266666666546,868.8266666666517,875.0266666666488,879.8833333333132,886.0833333333103,892.2833333333074,898.4833333333045,904.6833333333016,910.8833333332987,917.0833333332957,923.2833333332928,929.4833333332899,935.683333333287,941.8833333332841,948.0833333332812,954.2833333332783,960.4833333332754,966.6833333332725,972.8833333332695,979.0833333332666,985.2833333332637,991.4833333332608,996.0299999999254,1001.9199999999225,1008.1199999999196,1014.3199999999167,1020.5199999999138,1026.719999999911,1031.6799999999087]
- run.curseSince: 7028
- run.killer: "boss:the-masher"
- run.goldEarned: 24.413
- run.bossesKilled: 2
- run.elitesKilled: 2
- run.peakEnemies: 163
- run.shrinesUsed: 2
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 889
- counters.hits: 1746
- counters.gems: 183
- counters.coins: 21
- counters.shots: 1876
- counters.hostileShots: 84
- counters.nearMisses: 3
- counters.hostileHits: 2
- shrineTotals.cooldown: 0.051
- shrineTotals.luck: 0.072
- Gold, spots and chests: gold held at the end 24, spent 0; spots charged and used: none; chests seen 4, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:13 took Hash Hawk 47% over Seeker Sprouts 36%, Root Spikes 17%; 0:13 took Luck 54% over Damage 40%, Cooldown 6%; 0:22 took Butter Pat 69% over Salt Line 17%, Tot Toss 14%; 0:40 took Hash Hawk 62% over Gravy Boat 19%, Root Cellar 19%; 1:01 took Hash Hawk 76% over Seeker Sprouts 14%, Leave 10%; 1:08 took Hash Hawk 57% over Potato Battery 28%, Sour Cream 9%, Mash Golem 6%; 1:23 took Locked Gatling 70% over Bacon Bits 23%, Seeker Sprouts 7%; 1:49 took Cooldown 37% over Pickup range 33%, XP gain 30%; 1:57 took Bacon Bits 40% over Peeler 40%, Seeker Sprouts 20%; 2:19 took Hash Hawk 83% over Root Network 13%, Seeker Sprouts 4%; 2:51 took Hash Hawk 65% over GPU 19%, Butter Pat 16%.

### L4.I1.G3: shrine goal s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240s (game clock 04:00), health 80/120; damage taken 100 (enemy:potato-beetle 2.623, enemy:oil-drip 1.862, enemy:aphid 3.415, enemy:cave-grub 14.617); 1698 kills; level 1 to 14; planner asked 94 times, action model 437; the models saw the game 32 ms late (p90 53); ended with overgrowth 1, spud-fence 5, deep-fryer 1, potato-rain 1, butter-streak 1, mash-wave 1, hot-start 4, fertilizer 1.
- run.timeSec: 239.967
- run.level: 13
- run.kills: 1698
- run.damageBySource: seeker-sprouts 8211.215, spud-fence 6232.349, deep-fryer 3521.657, potato-rain 2158.258, butter-streak 1260.982, mash-wave 11919.244, overgrowth 24894.636
- run.damageTakenBySource: enemy:potato-beetle 2.623, enemy:oil-drip 1.862, enemy:aphid 3.415, enemy:cave-grub 14.617, enemy:compost-maggot 4.443, Spore vent 2.533, enemy:garden-slug 51.005, boss:beetle-queen 2.72, enemy:tomato-leech 7.922, enemy:ketchup-drop 5.247, enemy:bog-slime 2.536, Hot oil 0.667
- run.killsBySource: seeker-sprouts 425, spud-fence 145, deep-fryer 118, potato-rain 82, butter-streak 23, mash-wave 352, overgrowth 553
- run.evolutions: [{"id":"overgrowth","at":213.48333333333332}]
- run.biomes: ["peel-forest","chip-canyons","compost-caves","mash-swamp","ketchup-bog"]
- run.distance: 12442.833
- run.dodgePoints: 2037.143
- run.dodgeSecond: 239
- run.dodgeTaken: [27.225274083743106,27.225274083743106,27.225274083743106,27.225274083743106,27.225274083743106,27.225274083743106,27.225274083743106,29.945124083743107,29.945124083743107,29.945124083743107,29.945124083743107,29.945124083743107,29.945124083743107,29.945124083743107,29.945124083743107,29.945124083743107,29.945124083743107,29.945124083743107,29.945124083743107,29.945124083743107,54.115310260420074,61.28801177578033,61.28801177578033,61.28801177578033,73.1238980249282,80.37683135826154,94.8826980249282,94.8826980249282,94.8826980249282,94.8826980249282,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,98.92376330092789,99.59042996759456,99.59042996759456,99.59042996759456,99.59042996759456,99.59042996759456,99.59042996759456,99.59042996759456,99.59042996759456,99.59042996759456,27.225274083743106,27.225274083743106,27.225274083743106,27.225274083743106]
- run.dodgeSteps: [910.8833333332639,915.636666666595,921.8366666665921,928.0366666665892,934.2366666665863,940.4366666665834,946.6366666665805,952.8366666665776,959.0366666665747,965.2366666665718,971.4366666665688,977.6366666665659,983.836666666563,990.0366666665601,996.2366666665572,1002.4366666665543,1008.6366666665514,1014.8366666665485,1020.7266666665457,1025.7899999998767,1031.5766666665406,1037.7766666665377,1043.9766666665348,1050.176666666532,1055.8599999998626,1062.0599999998597,1068.2599999998567,1074.4599999998538,1080.659999999851,1086.859999999848,1088.306666666514,1088.306666666514,1091.923333333179,1094.919999999844,1098.0199999998426,1104.2199999998397,1110.4199999998368,1116.619999999834,1122.819999999831,1129.019999999828,1135.2199999998252,1141.4199999998223,1147.6199999998194,1153.8199999998164,1160.0199999998135,1166.2199999998106,1172.4199999998077,1178.6199999998048,1187.8299999998028,1194.8899999998,1201.089999999797,1207.2899999997942,1213.4899999997913,1219.6899999997884,1225.8899999997855,1232.0899999997825,1238.2899999997796,886.0833333332755,892.2833333332726,898.4833333332697,904.6833333332668]
- run.curseSince: 12151
- run.goldEarned: 377.048
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 173
- run.shrinesUsed: 5
- run.grokBotHelps: 3
- run.lootRunnersMet: [1]
- counters.kills: 1698
- counters.hits: 3308
- counters.gems: 824
- counters.coins: 49
- counters.shots: 1041
- counters.hostileShots: 110
- counters.nearMisses: 5
- shrineTotals.area: 0.12
- shrineTotals.cooldown: 0.03
- shrineTotals.magnet: 0.21
- shrineTotals.growth: 0.06
- shrineTotals.greed: 0.12
- Gold, spots and chests: gold held at the end 377, spent 0; spots charged and used: Spud Freezer 1, Tater Lantern 1, Seed Vault 1; chests seen 6, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Pickup range 85% over Area 9%, Cooldown 6%; 0:10 took Spud Fence 60% over Chives 34%, Potato Magnet 6%; 0:17 took XP gain 40% over Gold gain 39%, Crit 21%; 0:18 took Deep Fryer 82% over Slow Cooker 16%, Golden Fry 2%; 0:26 took Gold gain 34% over Move speed 34%, Pickup range 32%; 0:27 took Potato Rain 44% over Skipping Cannonball 37%, Deep Fryer 19%; 0:36 took Cooldown 49% over Max HP 44%, Move speed 7%; 0:46 took Seeker Sprouts 41% over Spud Fence 41%, Potato Magnet 18%; 1:13 took Butter Streak 61% over Seeker Sprouts 24%, Spud Fence 15%; 1:18 took Hot Start 51% over Butter Pat 44%, Slow Cooker 5%; 1:31 took Seeker Sprouts 64% over Potato Rain 15%, Butter Streak 12%, Leave 9%; 1:44 took Mash Wave 75% over Spud Fence 17%, Fertilizer 8%; 2:17 took Area 91% over Damage 7%, Duration 2%; 2:20 took Fertilizer 34% over Butter Streak 34%, Deep Fryer 28%, Skip 4%; 2:25 took Hot Start 44% over Potato Rain 24%, Reroll 17%, Butter Streak 13%, Skip 2%; 2:43 took Hot Start 54% over Butter Socks 27%, Reroll 12%, Hot Sauce 5%, Skip 2%; 2:50 took Spud Fence 35% over Reroll 26%, Mash Wave 20%, Deep Fryer 15%, Skip 4%; 3:22 took Hot Start 47% over Butter Streak 23%, Reroll 17%, Stuffed Skin 11%, Skip 2%; 3:37 took Spud Fence 35% over GPU 34%, Reroll 17%, Deep Fryer 11%, Skip 3%.

### L4.I1.G4: shrine goal s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 204.4s (game clock 03:24); damage taken 151 (enemy:aphid 4.888, Brambles 6.694, Hot oil 20.559, enemy:spittlebug 28.383); 1311 kills; level 1 to 14; planner asked 81 times, action model 425; the models saw the game 28 ms late (p90 49); ended with seeker-sprouts 1, hash-hawk 6, grab-bag 2, hot-potato 1, gravy-boat 1, starch-chain 1, bacon-bits 2, packed-pan 3.
- run.timeSec: 204.367
- run.level: 13
- run.kills: 1311
- run.damageBySource: seeker-sprouts 3509.205, hash-hawk 7994.769, grab-bag 3352.57, hot-potato 6769.615, gravy-boat 3707.152, starch-chain 4453.651, grok-bot 55.247
- run.damageTakenBySource: enemy:aphid 4.888, Brambles 6.694, Hot oil 20.559, enemy:spittlebug 28.383, enemy:little-grey 9.558, enemy:crumb-ant 6.319, enemy:fry-fly 33.716, enemy:oil-drip 4.347, boss:beetle-queen 12.314, enemy:bog-slime 2.218, enemy:beetle-brood 11.736, enemy:sand-crab 3.896, enemy:tomato-leech 6.5
- run.killsBySource: seeker-sprouts 221, hash-hawk 169, grab-bag 159, hot-potato 380, gravy-boat 148, starch-chain 228, grok-bot 6
- run.biomes: ["peel-forest","mash-swamp","fry-oil-desert","ketchup-bog","crop-circle","chip-canyons"]
- run.distance: 11247.733
- run.dodgePoints: 1687.063
- run.dodgeSecond: 204
- run.dodgeTaken: [63.95660096990989,66.41945726912249,66.41945726912249,71.91937264182603,71.91937264182603,77.1250003474537,77.1250003474537,77.1250003474537,77.1250003474537,79.34265856178052,79.34265856178052,90.51865337793964,97.36961942400539,103.59293391867372,112.55586225855143,115.35761091751284,115.35761091751284,117.82046721672543,117.82046721672543,125.7965196768624,125.7965196768624,143.704885266919,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,45.90568341237745,48.898202759205645,48.898202759205645,51.454306593340824,52.98796889382193,52.98796889382193,52.98796889382193,52.98796889382193,52.98796889382193,52.98796889382193,52.98796889382193,54.5471335455936,54.5471335455936,56.62601974795583,58.188202701511635,58.188202701511635,58.188202701511635,58.188202701511635,58.188202701511635,58.188202701511635,58.61028062358957]
- run.dodgeSteps: [991.5866666665261,997.7866666665232,1003.9866666665203,1010.1866666665173,1016.3866666665144,1022.5866666665115,1028.7866666665086,1034.9866666665057,1041.1866666665028,1047.3866666664999,1053.586666666497,1059.786666666494,1065.9866666664911,1076.0566666664893,1080.6033333331538,1086.803333333151,1093.003333333148,1097.2399999998127,1107.3099999998108,1112.6833333331415,1116.4033333331397,1122.6033333331368,754.5399999999601,760.7399999999626,766.9399999999648,773.1399999999619,779.339999999959,785.5399999999561,791.7399999999532,797.9399999999503,804.1399999999473,810.3399999999444,816.5399999999415,822.7399999999386,828.9399999999357,835.1399999999328,841.3399999999299,847.539999999927,853.7399999999241,859.9399999999212,866.1399999999182,872.3399999999153,878.5399999999124,884.7399999999095,888.0466666665747,892.3866666665726,898.5866666665697,904.7866666665668,910.9866666665639,917.186666666561,923.3866666665581,929.5866666665552,935.7866666665523,941.9866666665494,948.1866666665464,954.3866666665435,960.5866666665406,966.7866666665377,972.9866666665348,979.1866666665319,985.386666666529]
- run.curseSince: 11671
- run.killer: "enemy:fry-fly"
- run.goldEarned: 219.628
- run.bossChests: 3
- run.bossesKilled: 2
- run.elitesKilled: 3
- run.peakEnemies: 173
- run.shrinesUsed: 3
- run.grokBotHelps: 4
- run.lootRunnersMet: [1,1]
- counters.kills: 1311
- counters.hits: 2592
- counters.gems: 743
- counters.coins: 77
- counters.shots: 906
- counters.hostileShots: 219
- counters.nearMisses: 34
- counters.hostileHits: 12
- shrineTotals.maxHp: 12
- shrineTotals.armor: 12
- shrineTotals.growth: 0.072
- Gold, spots and chests: gold held at the end 219, spent 0; spots charged and used: Dinner Bell 1, Crop Patch 1; chests seen 5, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:07 took Max HP 64% over Cooldown 23%, Area 13%; 0:09 took Hash Hawk 77% over Seeker Sprouts 15%, Butter Pat 8%; 0:16 took Armor 78% over Area 11%, Max HP 11%; 0:27 took Grab Bag 67% over Hot Start 23%, Gravy Splash 10%; 0:27 took Hot Potato 51% over Grab Bag 28%, Hash Rush 21%; 0:28 took Hash Hawk 74% over Grab Bag 15%, Seeker Sprouts 11%; 0:50 took Hash Hawk 75% over Rotten Spud 14%, Seeker Sprouts 11%; 1:20 took Gravy Boat 48% over Deep Fryer 34%, Potato Magnet 18%; 1:31 took Starch Chain 37% over Bacon Bits 28%, Hash Hawk 27%, Reroll 8%; 1:55 took XP gain 58% over Max HP 23%, Damage 19%; 1:57 took Bacon Bits 84% over Reroll 10%, Gravy Boat 4%, Seeker Sprouts 2%; 2:33 took Grab Bag 44% over Spry Sprout 22%, Reroll 19%, Hot Potato 11%, Skip 4%; 2:51 took Bacon Bits 75% over Big Bowl 12%, Grab Bag 6%, Reroll 6%, Skip 1%; 2:53 took Packed Pan 73% over Hot Potato 11%, Reroll 9%, Spry Sprout 6%, Skip 1%; 2:53 took Packed Pan 77% over Hot Potato 10%, Reroll 10%, Golden Fry 2%, Skip 1%; 3:14 took Packed Pan 68% over Reroll 13%, Grab Bag 11%, Hot Potato 6%, Skip 2%.

### L4.I1.G5: shrine goal s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240s (game clock 04:00), health 126/134; damage taken 91 (Spore vent 9.783, Brambles 1.724, enemy:cave-grub 19.82, enemy:compost-maggot 1.416); 2362 kills; level 1 to 14; planner asked 93 times, action model 381; the models saw the game 30 ms late (p90 51); ended with seeker-sprouts 1, harvest-moon 1, mash-snowball 1, hot-potato 7, gratin-arc 1, tot-toss 1, peel-out 2, hot-sauce 1, thick-skin 1.
- run.timeSec: 240.033
- run.level: 13
- run.kills: 2362
- run.damageBySource: seeker-sprouts 4697.593, harvest-moon 1096.079, mash-snowball 4434.206, hot-potato 12294.988, grok-bot 670.26, starch-chain 7888.387, tot-toss 1805.601, gratin-arc 61948.517
- run.damageTakenBySource: Spore vent 9.783, Brambles 1.724, enemy:cave-grub 19.82, enemy:compost-maggot 1.416, boss:amusing 22.993, Hot oil 20.894, boss:beetle-queen 2.463, enemy:garden-slug 12.37
- run.killsBySource: seeker-sprouts 197, harvest-moon 23, mash-snowball 139, hot-potato 322, grok-bot 41, starch-chain 308, tot-toss 30, gratin-arc 1302
- run.evolutions: [{"id":"gratin-arc","at":167.2}]
- run.biomes: ["compost-caves","peel-forest","mash-swamp","frozen-tundra","ketchup-bog"]
- run.distance: 12846.297
- run.dodgePoints: 2022.801
- run.dodgeSecond: 240
- run.curseHeldPeak: 6.778
- run.dodgeTaken: [59.11202702788051,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,61.574883327093104,62.957862050497354,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.63162091574557,65.81601807886614,71.34793297248319,76.87984786610019,79.09261382354697,79.09261382354697,79.09261382354697,79.09261382354697,79.09261382354697,79.09261382354697,79.09261382354697,79.09261382354697,79.09261382354697,79.09261382354697,79.09261382354697,79.09261382354697,79.09261382354697,85.27784307685282,91.46307233015865,91.46307233015865,91.46307233015865,91.46307233015865,91.46307233015865,91.46307233015865,91.46307233015865,55.73540365125713,55.73540365125713,55.73540365125713]
- run.dodgeSteps: [1024.4311666666244,1030.6311666666215,1036.8311666666186,1043.0311666666157,1048.8178333332796,1053.7778333332774,1059.9778333332745,1066.1778333332716,1070.052833333268,1074.1138333332642,1080.3138333332613,1086.5138333332584,1088.890499999924,1088.890499999924,1088.890499999924,1088.890499999924,1088.890499999924,1092.7138333332555,1098.9138333332526,1105.1138333332497,1111.3138333332467,1117.5138333332438,1123.713833333241,1129.913833333238,1136.113833333235,1142.3138333332322,1148.5138333332293,1154.7138333332264,1158.9504999998912,1164.8404999998884,1171.0404999998855,1177.2404999998826,1183.4404999998796,1189.6404999998767,1195.8404999998738,1196.97716666654,1196.97716666654,1202.2471666665374,1208.4471666665345,1212.7871666665326,1218.9871666665297,1222.9138333331944,1229.1138333331915,1235.3138333331885,1241.5138333331856,1242.8571666665184,1248.540499999849,1254.7404999998462,1260.9404999998433,1265.2339999998399,1270.2663333331702,1272.2296666665027,1272.2296666665027,1272.2296666665027,1272.2296666665027,1272.2296666665027,1278.222999999833,1284.4229999998302,1005.8311666666332,1012.0311666666303,1018.2311666666274]
- run.curseTicks: 961.1
- run.curseSince: 14251
- run.goldEarned: 576.228
- run.bossChests: 10
- run.bossesKilled: 2
- run.elitesKilled: 11
- run.peakEnemies: 169
- run.shrinesUsed: 5
- run.grokBotHelps: 4
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 2362
- counters.hits: 3899
- counters.crits: 521
- counters.gems: 705
- counters.coins: 49
- counters.shots: 1228
- counters.hostileShots: 168
- counters.nearMisses: 10
- counters.hostileHits: 2
- shrineTotals.cooldown: 0.03
- shrineTotals.maxHp: 12
- shrineTotals.armor: 29
- shrineTotals.curse: 0.1
- Gold, spots and chests: gold held at the end 576, spent 0; spots charged and used: none; chests seen 11, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:07 took Max HP 73% over Cooldown 21%, Move speed 6%; 0:13 took Harvest Moon 78% over Seeker Sprouts 11%, Gravy Splash 11%; 0:20 took Mash Snowball 69% over Seeker Sprouts 26%, Couch Potato 5%; 0:24 took Peel Out 51% over Sprout Satellites 33%, Seeker Sprouts 16%; 0:29 took Armor 62% over Move speed 25%, Cooldown 13%; 0:44 took Hot Potato 68% over Butter Pat 28%, Spud Sneakers 4%; 1:14 took Leave 65% over Accept 35%; 1:17 took Accept 50% over Leave 50%; 1:23 took Starch Chain 65% over Peel Out 28%, Big Bowl 7%; 1:39 took Tot Toss 53% over Starch Chain 38%, Harvest Moon 9%; 1:45 took Starch Chain 55% over Harvest Moon 21%, Reroll 17%, Hot Potato 7%; 2:13 took Starch Chain 61% over Hot Sauce 30%, Reroll 8%, Tot Toss 1%; 2:21 took Starch Chain 42% over Hot Sauce 39%, Gravy Heart 9%, Reroll 8%, Skip 2%; 2:21 took Hot Sauce 43% over Butter Pat 34%, Mash Snowball 13%, Reroll 8%, Skip 2%; 2:42 took Starch Chain 80% over Starch Plating 10%, Reroll 6%, Gravy Splash 3%, Skip 1%; 3:19 took Armor 75% over Gold gain 14%, Move speed 11%; 3:20 took Thick Skin 49% over Reroll 19%, Harvest Moon 17%, Seeker Sprouts 13%, Skip 2%; 3:53 took Peel Out 54% over Thick Skin 24%, Reroll 16%, Tot Toss 4%, Skip 2%; 3:57 took Cooldown 67% over Max HP 26%, Move speed 7%.
