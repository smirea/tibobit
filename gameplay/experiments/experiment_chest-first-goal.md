# Does a chest-first planner.goal raise chests opened and survival on fresh seeds?

| Field | Value |
| --- | --- |
| Status | done |
| Area | spots |
| Result | refuted |
| Created | L2.I9 |
| Updated | L2.I10 |

## Hypothesis

A planner.goal prompt that rates an openable chest highest while health is above 35% and no boss is close, allows elite fights only above 50% health and puts food first below 40% opens more chests by 2:00, evolves earlier and lives 5:00 more often than the default goal prompt with the same knobs.

## Method

Fresh seeker-sprouts on seeds 31-34, 300 s, playbook knobs unchanged, only planner.goal changed. Compare with knobs-only games on the same seeds (5:00, 5:00, died 3:05, 5:00). Read chests listed and opened by 2:00, first chest time, evolution time, health under 40% time and death time. It needs at least 3 seeds to count, and the playbook changes only if it beats knobs alone.

## Findings

Played from 0:00 on seeds 31-34 with the playbook knobs, it lived 1 of 4 (only seed 34, 12 chests, Hash Harrier at 136 s) against 3 of 4 for knobs alone. It did raise chests opened on seeds 32 and 34 (4 and 12 by the end), but seeds 32 and 33 still died at 3:26 and 3:35 with scattered builds and no Fertilizer. Chest count alone does not fix thin openings, and the playbook stays on the knobs only.

## Games

### L2.I9.G1: chest-first goal s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 148.4s (game clock 02:28); damage taken 163 (enemy:potato-beetle 4.808, enemy:fry-fly 19.653, enemy:crumb-ant 10.122, enemy:sprout-mite 2.427); 578 kills; level 1 to 11; planner asked 55 times, action model 458; the models saw the game 33 ms late (p90 53); ended with seeker-sprouts 4, deep-fryer 1, locked-gatling 1, tater-pup 2, harvest-moon 1, sprout-squad 1, big-bowl 2, four-eyed-spud 1.
- run.timeSec: 148.367
- run.level: 10
- run.kills: 578
- run.damageBySource: seeker-sprouts 3268.337, deep-fryer 1843.938, locked-gatling 4320.659, tater-pup 531.607, harvest-moon 922.881, sprout-squad 101.31
- run.damageTakenBySource: enemy:potato-beetle 4.808, enemy:fry-fly 19.653, enemy:crumb-ant 10.122, enemy:sprout-mite 2.427, Hot oil 43, enemy:oil-drip 13.912, enemy:aphid 2.996, enemy:swarm-fly 2.772, boss:amusing 63.199
- run.killsBySource: seeker-sprouts 220, deep-fryer 85, locked-gatling 189, tater-pup 21, harvest-moon 57, sprout-squad 6
- run.biomes: ["fry-oil-desert"]
- run.distance: 8993.1
- run.dodgePoints: 989.105
- run.dodgeSecond: 148
- run.dodgeTaken: [84.63147013505727,87.13147013505723,87.13147013505723,89.90335902394612,89.90335902394612,89.90335902394612,89.90335902394612,89.90335902394612,89.90335902394612,89.90335902394612,89.90335902394612,89.90335902394612,93.22962569061279,93.22962569061279,93.22962569061279,94.93551399604918,94.93551399604918,94.93551399604918,110.4996637839686,110.4996637839686,110.4996637839686,110.4996637839686,110.4996637839686,117.15219711730194,130.45726378396859,158.82799815921544,158.82799815921544,74.95084162639985,74.95084162639985,74.95084162639985,74.95084162639985,74.95084162639985,74.95084162639985,77.45231880427488,77.45231880427488,77.45231880427488,77.45231880427488,77.45231880427488,77.45231880427488,77.45231880427488,77.45231880427488,77.45231880427488,77.45231880427488,77.45231880427488,77.45231880427488,79.02062527018141,79.02062527018141,81.13147013505731,81.13147013505731,81.13147013505731,81.13147013505731,81.13147013505731,81.13147013505731,81.13147013505731,81.13147013505731,81.13147013505731,81.13147013505731,81.13147013505731,81.13147013505731,81.13147013505731,84.63147013505727]
- run.dodgeSteps: [744.5166666666731,750.716666666672,756.9166666666738,763.1166666666763,769.3166666666789,775.5166666666814,781.716666666684,787.9166666666865,794.1166666666852,800.3166666666837,806.5166666666807,812.7166666666778,817.160000000013,822.4300000000123,826.1500000000106,832.3500000000076,836.6900000000056,841.2366666666701,847.4366666666672,853.6366666666643,859.8366666666614,866.0366666666584,872.2366666666555,878.4366666666526,884.6366666666497,890.8366666666468,897.0366666666439,540.1233333333481,546.3233333333482,552.5233333333507,558.7233333333533,564.923333333353,571.1233333333533,577.3233333333559,579.8033333333558,583.3166666666875,589.5166666666846,595.7166666666817,601.9166666666795,608.116666666682,614.3166666666846,620.516666666685,626.7166666666828,632.9166666666815,639.116666666684,645.3166666666865,651.5166666666876,657.7166666666894,663.9166666666886,670.1166666666911,676.3166666666933,682.5166666666942,688.7166666666956,694.9166666666931,701.1166666666902,707.31666666669,713.5166666666877,719.7166666666848,725.9166666666819,732.116666666679,738.316666666676]
- run.curseSince: 5484
- run.killer: "enemy:aphid"
- run.goldEarned: 121.55
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 101
- run.grokBotHelps: 3
- counters.kills: 578
- counters.hits: 1680
- counters.gems: 519
- counters.coins: 15
- counters.shots: 1206
- counters.hostileShots: 166
- counters.nearMisses: 18
- counters.hostileHits: 1
- Gold, spots and chests: gold held at the end 121, spent 0; spots charged and used: none; chests seen 3, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:13 took Big Bowl 43% over Gravy Boat 40%, Mezzaluna 17%; 0:22 took Seeker Sprouts 70% over Stuffed Skin 16%, Masher Grip 14%; 0:45 took Deep Fryer 40% over Tater Tot Pup 35%, Four-Eyed Spud 25%; 0:52 took Big Bowl 68% over Slow Cooker 16%, Potato Magnet 16%; 1:22 took Locked Gatling 81% over Big Bowl 10%, GPU 9%; 1:31 took Four-Eyed Spud 39% over Deep Fryer 25%, Salt Line 24%, Reroll 12%; 1:47 took Tater Tot Pup 58% over Deep Fryer 22%, Reroll 12%, Fertilizer 8%; 1:48 took Harvest Moon 64% over Seeker Sprouts 28%, Reroll 6%, Fertilizer 2%; 2:17 took Sprout Squad 53% over Seeker Sprouts 39%, Reroll 6%, Fertilizer 2%; 2:27 took Tater Tot Pup 55% over Reroll 24%, Potato Magnet 15%, Fertilizer 6%.

### L2.I9.G2: chest-first goal s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 206.1s (game clock 03:26); damage taken 166 (Brambles 0.8, enemy:frost-flea 10.889, enemy:garden-slug 10.43, boss:amusing 49.894); 1274 kills; level 1 to 11; planner asked 78 times, action model 327; the models saw the game 30 ms late (p90 49); ended with seeker-sprouts 8, mash-wave 1, reset-button 2, spud-lob 1, tater-pup 1, mash-landing 1, gpu 2, chives 1.
- run.timeSec: 206.117
- run.level: 10
- run.kills: 1274
- run.damageBySource: seeker-sprouts 19197.394, mash-wave 5469.037, grok-bot 65.266, reset-button 1186.44, spud-lob 2449.374, tater-pup 1607.586
- run.damageTakenBySource: Brambles 0.8, enemy:frost-flea 10.889, enemy:garden-slug 10.43, boss:amusing 49.894, Hot oil 27.067, boss:beetle-queen 5.44, enemy:sprout-mite 1.949, enemy:aphid 6.022, enemy:beetle-brood 43.059, enemy:snow-mold 10.164
- run.killsBySource: seeker-sprouts 883, mash-wave 221, grok-bot 4, reset-button 24, spud-lob 108, tater-pup 34
- run.biomes: ["frozen-tundra","compost-caves","peel-forest","ketchup-bog","mash-swamp","chip-canyons","fry-oil-desert"]
- run.distance: 11960.007
- run.dodgePoints: 1615.738
- run.dodgeSecond: 206
- run.dodgeTaken: [91.19223246072715,93.91208246072715,93.91208246072715,93.91208246072715,93.91208246072715,93.91208246072715,93.91208246072715,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,98.58123627455431,107.34397846887288,160.9278404649114,64.12556579406055,64.12556579406055,64.12556579406055,64.12556579406055,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,69.72556579406056,74.25889912739389,81.59223246072719,89.59223246072716,91.19223246072715,91.19223246072715,91.19223246072715,91.19223246072715,91.19223246072715,91.19223246072715,91.19223246072715,91.19223246072715,91.19223246072715,91.19223246072715,91.19223246072715,91.19223246072715,91.19223246072715]
- run.dodgeSteps: [1066.213999999707,1066.213999999707,1066.8339999997067,1073.0339999997038,1079.233999999701,1085.433999999698,1091.633999999695,1097.8339999996922,1104.0339999996893,1110.2339999996864,1116.4339999996835,1122.6339999996806,1128.8339999996776,1135.0339999996747,1141.2339999996718,1147.433999999669,1153.633999999666,1159.833999999663,1166.0339999996602,1172.2339999996573,1178.4339999996544,1184.6339999996515,1190.8339999996485,1195.2773333329799,845.2873333331441,851.4873333331412,857.6873333331383,863.8873333331354,870.0873333331325,876.2873333331296,882.4873333331267,888.6873333331238,894.8873333331209,901.087333333118,907.287333333115,913.4873333331121,919.6873333331092,925.8873333331063,932.0873333331034,938.2873333331005,944.4873333330976,950.6873333330947,956.8873333330918,963.0873333330888,969.2873333330859,975.487333333083,981.6873333330801,987.8873333330772,994.0873333330743,1000.2873333330714,1006.4873333330685,1012.6873333330656,1018.8873333330627,1025.0873333330596,1029.4273333330577,1035.6273333330548,1041.827333333052,1048.027333333049,1054.227333333046,1060.4273333330432,1066.213999999707]
- run.curseSince: 12270
- run.killer: "enemy:beetle-brood"
- run.goldEarned: 217.378
- run.bossChests: 4
- run.bossesKilled: 1
- run.elitesKilled: 4
- run.peakEnemies: 181
- run.grokBotHelps: 5
- run.throttles: 6
- run.lootRunnersMet: [1]
- counters.kills: 1274
- counters.hits: 1922
- counters.gems: 236
- counters.coins: 33
- counters.shots: 1024
- counters.hostileShots: 122
- counters.nearMisses: 11
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 217, spent 0; spots charged and used: Beetle Nest 1, Tater Lantern 1; chests seen 5, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:18 took Mash Wave 69% over Seeker Sprouts 25%, Potato Magnet 6%; 0:25 took GPU 63% over Gem Sling 32%, Rotten Spud 5%; 0:34 took Chives 83% over Fertilizer 14%, Clean Plate 3%; 1:13 took Seeker Sprouts 65% over Root Network 17%, Reroll 11%, Rotten Spud 7%; 1:33 took Reset Button 89% over Seeker Sprouts 6%, Reroll 3%, Mash Wave 2%; 1:49 took Spud Lob 49% over Fertilizer 22%, Peel Lash 18%, Reroll 11%; 1:55 took Tater Tot Pup 41% over Chives 32%, Fertilizer 21%, Reroll 6%; 2:17 took Reset Button 49% over Packed Pan 30%, Fertilizer 14%, Reroll 7%; 2:57 took Mash Landing 58% over Spud Lob 16%, Fertilizer 16%, Reroll 10%; 3:24 took GPU 61% over Fertilizer 17%, Chives 15%, Reroll 7%.

### L2.I9.G3: chest-first goal s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 216s (game clock 03:35); damage taken 193 (Hot oil 28.667, enemy:compost-maggot 1.272, enemy:aphid 4.17, enemy:fry-fly 13.287); 1395 kills; level 1 to 12; planner asked 84 times, action model 513; the models saw the game 29 ms late (p90 48); ended with seeker-sprouts 7, spud-cannon 1, harvest-moon 3, comet-scythe 2, afterburner-fries 1, hot-streak 1, chives 2.
- run.timeSec: 215.95
- run.level: 11
- run.kills: 1395
- run.damageBySource: seeker-sprouts 14788.143, spud-cannon 4794.137, harvest-moon 6570.32, comet-scythe 6030.055, grok-bot 122.311, hot-streak 2234.084, afterburner-fries 73.451
- run.damageTakenBySource: Hot oil 28.667, enemy:compost-maggot 1.272, enemy:aphid 4.17, enemy:fry-fly 13.287, boss:amusing 37.698, enemy:crumb-ant 7.148, enemy:lint-bunny 42.337, boss:beetle-queen 10.879, enemy:sock-pile 7.929, enemy:bog-slime 2.588, enemy:tomato-leech 37.301
- run.killsBySource: seeker-sprouts 656, spud-cannon 238, harvest-moon 259, comet-scythe 156, grok-bot 6, hot-streak 77, afterburner-fries 3
- run.biomes: ["fry-oil-desert","peel-forest","coin-laundromat"]
- run.distance: 12915.067
- run.dodgePoints: 1618.505
- run.dodgeSecond: 215
- run.dodgeTaken: [92.23839935740153,94.95824935740153,94.95824935740153,94.95824935740153,96.90235734442423,96.90235734442423,96.90235734442423,99.62220734442424,107.38880772946786,107.38880772946786,107.38880772946786,107.38880772946786,107.38880772946786,107.38880772946786,107.38880772946786,107.38880772946786,107.38880772946786,107.38880772946786,109.38811817543696,109.38811817543696,109.38811817543696,128.05825117746582,128.05825117746582,128.05825117746582,128.05825117746582,128.05825117746582,130.0829259662382,130.0829259662382,130.0829259662382,130.0829259662382,130.0829259662382,141.08276044522026,166.35550565908895,87.3243271034554,87.3243271034554,87.3243271034554,87.3243271034554,87.3243271034554,87.3243271034554,87.3243271034554,87.3243271034554,87.3243271034554,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,90.32257069745452,92.23839935740153,92.23839935740153,92.23839935740153,92.23839935740153]
- run.dodgeSteps: [1097.1933333333045,1103.3933333333016,1109.5933333332987,1115.7933333332958,1121.9933333332929,1128.19333333329,1134.393333333287,1140.5933333332841,1146.7933333332812,1152.9933333332783,1159.1933333332754,1165.3933333332725,1171.5933333332696,1176.036666666601,1182.236666666598,1188.436666666595,1194.6366666665922,1200.8366666665893,1207.0366666665864,1213.2366666665835,1219.4366666665805,1225.6366666665776,1231.8366666665747,1238.0366666665718,1242.5833333332362,1245.4766666665682,1250.126666666566,1254.1566666665642,1259.6333333332282,1264.9033333332259,1270.9999999998895,1275.546666666554,1281.7466666665512,932.0666666667154,938.2666666667125,944.4666666667096,950.6666666667066,956.8666666667037,963.0666666667008,969.2666666666979,975.466666666695,981.6666666666921,987.8666666666892,994.0666666666863,1000.2666666666834,1006.4666666666805,1012.6666666666775,1018.8666666666746,1023.9300000000055,1025.0666666666716,1028.9933333333365,1035.1933333333336,1041.3933333333307,1047.5933333333278,1053.7933333333249,1059.993333333322,1066.193333333319,1072.3933333333161,1078.5933333333132,1084.7933333333103,1090.9933333333074]
- run.curseSince: 6191
- run.killer: "enemy:tomato-leech"
- run.goldEarned: 276.278
- run.bossChests: 3
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 185
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 1395
- counters.hits: 2637
- counters.gems: 416
- counters.coins: 62
- counters.shots: 809
- counters.hostileShots: 310
- counters.nearMisses: 18
- counters.hostileHits: 10
- Gold, spots and chests: gold held at the end 276, spent 0; spots charged and used: none; chests seen 3, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:18 took Seeker Sprouts 51% over Sprouting Eyes 47%, Bacon Bits 2%; 0:22 took Spud Cannon 60% over Seeker Sprouts 25%, Stuffed Skin 15%; 0:45 took Harvest Moon 73% over Seeker Sprouts 22%, Spud Sneakers 5%; 1:04 took Comet Scythe 85% over Root Network 10%, Seeker Sprouts 5%; 1:26 took Chives 46% over Root Spikes 38%, Spud Cannon 16%; 1:43 took Chives 41% over Spud Decoy 38%, Seeker Sprouts 21%; 1:56 took Afterburner Fries 68% over Fertilizer 26%, Spud Sneakers 6%; 2:27 took Comet Scythe 72% over Fertilizer 18%, Spud Cannon 10%; 3:01 took Harvest Moon 59% over Potato Magnet 23%, Fertilizer 18%; 3:22 took Hot Streak 65% over Fertilizer 17%, Reroll 9%, Slow Cooker 7%, Skip 2%; 3:35 took Harvest Moon 45% over Reroll 21%, Fertilizer 16%, Spud Cannon 10%, Skip 8%.

### L2.I9.G4: chest-first goal s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.3s (game clock 05:00), health 55/120; damage taken 228 (Brambles 11.5, enemy:sand-crab 25.98, enemy:frost-flea 6.49, enemy:snow-mold 29.732); 2632 kills; level 1 to 17; planner asked 121 times, action model 654; the models saw the game 31 ms late (p90 50); ended with seeker-sprouts 8, hash-harrier 1, spud-dynamo 3, skipping-cannonball 8, whisk-vortex 1, rosti-disc 2, bacon-bits 2, hot-start 1.
- run.timeSec: 300.283
- run.level: 16
- run.kills: 2632
- run.damageBySource: seeker-sprouts 25921.223, hash-hawk 4270.313, spud-dynamo 4322.486, skipping-cannonball 3557.436, whisk-vortex 11904.41, rosti-disc 4051.573, grok-bot 849.398, hash-harrier 38772.662
- run.damageTakenBySource: Brambles 11.5, enemy:sand-crab 25.98, enemy:frost-flea 6.49, enemy:snow-mold 29.732, enemy:oil-drip 4.54, enemy:compost-maggot 3.21, boss:amusing 49.894, enemy:crumb-ant 15.989, enemy:aphid 6.455, enemy:bowling-ball 34.089, enemy:fry-fly 14.033, boss:the-masher 6.718, enemy:potato-beetle 18.968
- run.killsBySource: seeker-sprouts 967, hash-hawk 98, spud-dynamo 127, skipping-cannonball 145, whisk-vortex 421, rosti-disc 73, grok-bot 49, hash-harrier 752
- run.evolutions: [{"id":"hash-harrier","at":136.33333333333334}]
- run.biomes: ["ketchup-bog","peel-forest","compost-caves","frozen-tundra","chip-canyons","gutterball-lanes","fry-oil-desert"]
- run.distance: 16913.858
- run.dodgePoints: 1968.256
- run.dodgeSecond: 300
- run.dodgeTaken: [163.07911489623226,163.07911489623226,163.07911489623226,163.07911489623226,184.67697291743482,192.72578480586648,192.72578480586648,192.72578480586648,192.72578480586648,192.72578480586648,192.72578480586648,192.72578480586648,192.72578480586648,195.0199077269097,195.0199077269097,195.0199077269097,195.0199077269097,195.0199077269097,195.0199077269097,197.35377017373412,197.35377017373412,197.35377017373412,197.35377017373412,198.65377017373413,202.7537701737341,203.45377017373409,203.8537701737341,206.25377017373407,206.25377017373407,206.25377017373407,206.25377017373407,206.25377017373407,215.7148950346459,222.83362037423194,222.83362037423194,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,227.59858253993679,150.44430537482046,150.44430537482046,150.44430537482046,156.36071489623225]
- run.dodgeSteps: [1387.461833332959,1393.6618333329561,1399.8618333329532,1404.0984999996178,1404.201833332951,1408.2318333329492,1414.4318333329463,1420.6318333329434,1426.8318333329405,1433.0318333329376,1439.2318333329347,1445.4318333329318,1451.6318333329289,1457.831833332926,1464.031833332923,1470.2318333329201,1476.4318333329172,1482.6318333329143,1488.8318333329114,1495.0318333329085,1497.2018333329074,1497.2018333329074,1502.9884999995716,1509.1884999995686,1515.3884999995657,1521.5884999995628,1527.78849999956,1531.8184999995578,1538.018499999555,1544.218499999552,1547.9384999995505,1547.9384999995505,1552.898499999548,1557.4451666662126,1557.4451666662126,1562.4051666662103,1568.6051666662074,1574.8051666662045,1581.0051666662016,1587.2051666661987,1593.4051666661958,1599.6051666661929,1605.80516666619,1612.005166666187,1618.2051666661841,1624.4051666661812,1630.6051666661783,1636.8051666661754,1641.6824999995042,1646.2291666661658,1652.429166666163,1658.62916666616,1664.829166666157,1671.0291666661542,1677.2291666661513,1683.4291666661484,1689.6291666661455,1362.6618333329707,1368.8618333329678,1375.0618333329649,1381.261833332962]
- run.curseSince: 14550
- run.goldEarned: 678.807
- run.bossChests: 13
- run.bossesKilled: 3
- run.elitesKilled: 10
- run.peakEnemies: 175
- run.grokBotHelps: 5
- run.botSwarms: 2
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2632
- counters.hits: 6932
- counters.gems: 925
- counters.coins: 85
- counters.shots: 1308
- counters.hostileShots: 48
- counters.nearMisses: 7
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 678, spent 0; spots charged and used: Beetle Nest 2; chests seen 13, opened 12.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:15 took Hash Hawk 82% over Seeker Sprouts 11%, Butter Pat 7%; 0:23 took Spud Dynamo 52% over Harvest Moon 42%, Spud Sneakers 6%; 0:24 took Skipping Cannonball 64% over Clean Plate 20%, Afterburner Fries 16%; 0:44 took Hash Hawk 49% over Spud Dynamo 40%, Spry Sprout 11%; 1:12 took Whisk Vortex 70% over Hash Hawk 27%, Salt Shaker 3%; 1:23 took Rösti Disc 58% over Chives 24%, Sprouting Eyes 18%; 1:24 took Hash Hawk 68% over Reroll 15%, Spud Dynamo 9%, Rösti Disc 8%; 1:44 took Bacon Bits 71% over Reroll 12%, Skipping Cannonball 11%, Seeker Sprouts 6%; 2:16 took Skipping Cannonball 35% over Seeker Sprouts 30%, Reroll 22%, Spud Dynamo 13%; 3:05 took Seeker Sprouts 77% over Masher Grip 12%, Reroll 7%, Fertilizer 4%; 3:31 took Skipping Cannonball 54% over Fertilizer 21%, Masher Grip 15%, Reroll 10%; 4:00 took Bacon Bits 59% over Fertilizer 19%, Rösti Disc 11%, Reroll 11%; 4:01 took Spud Dynamo 40% over Fertilizer 37%, Reroll 14%, Rösti Disc 9%; 4:02 took Hot Start 38% over Fertilizer 32%, Big Bowl 22%, Reroll 8%; 4:03 took Rösti Disc 33% over Fertilizer 29%, Hot Sauce 24%, Reroll 14%; 4:46 took Spud Dynamo 37% over Whisk Vortex 28%, Fertilizer 21%, Reroll 14%.
