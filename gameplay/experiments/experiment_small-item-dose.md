# Does a realistic dose of 3 cheap items at 0:00 change survival?

| Field | Value |
| --- | --- |
| Status | done |
| Area | items |
| Result | inconclusive |
| Created | L4.I4 |
| Updated | L4.I5 |

## Hypothesis

Handed bundles of 5-8 items lived 7 of 7, but a shop or crates would give only 1-3 items by 2:00. Three cheap items (baked-buckler, spud-muffin, porcupine-spud) already lift seeker-sprouts past the playbook on the same seeds. If they do not, the purchase route cannot work.

## Method

Seeker-sprouts 1 plus those three items, full health, the playbook knobs and prompts, 240 s from 0:00 on s31-35. Pair with the on-file playbook games (5:00, 5:00, 3:05, 5:00, 2:39). Read survival to 4:00, damage taken by 2:30, chests opened by 2:00 and first evolution time. Five pairs is a lead only.

## Findings

Three handed items (baked-buckler, spud-muffin, porcupine-spud) lived 4:00 on 5 of 5 seeds with 29-61 damage. Paired against the playbook that is 2 wins (s33, s35) and 3 ties, so survival is not separated at this sample size. The damage drop and the Starch Plating 5/5 plus Fry Volcano pattern in every game point to armor as the engine (B81). The items are handed over at 0:00, so this is an upper bound. The armor route from picks is tested in armor-first-picks.

## Games

### L4.I4.G1: 3 items s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31, build swapped for seeker-sprouts 1, baked-buckler x1, spud-muffin x1, porcupine-spud x1; 240s; plays the playbook.
- Outcome: alive after 240.2s (game clock 04:00), health 132/132; damage taken 56 (enemy:crumb-ant 1.001, enemy:aphid 2.826, Spore vent 1.333, enemy:cave-grub 7.946); 2064 kills; level 1 to 15; planner asked 101 times, action model 387; the models saw the game 33 ms late (p90 54); ended with seeker-sprouts 1, taproot-eruption 1, hash-brown-shield 7, mash-wave 1, starch-chain 1, hot-start 1, starch-plating 5, masher-grip 1.
- run.timeSec: 240.183
- run.level: 14
- run.kills: 2064
- run.damageBySource: seeker-sprouts 4581.655, porcupine-spud 2790.261, root-spikes 5942.007, hash-brown-shield 8400.785, grok-bot 1405.298, fry-volcano 6704.904, alex 2479.891, mash-wave 7848.003, taproot-eruption 16689.441, starch-chain 2380.812
- run.damageTakenBySource: enemy:crumb-ant 1.001, enemy:aphid 2.826, Spore vent 1.333, enemy:cave-grub 7.946, enemy:potato-beetle 10.434, enemy:frost-flea 3.043, enemy:fry-fly 1.18, boss:amusing 23.715, enemy:sprout-mite 2.525, enemy:compost-maggot 0.667, enemy:snow-mold 1.537
- run.killsBySource: seeker-sprouts 205, porcupine-spud 73, root-spikes 259, hash-brown-shield 379, grok-bot 61, fry-volcano 221, alex 97, mash-wave 193, taproot-eruption 531, starch-chain 45
- run.evolutions: [{"id":"taproot-eruption","at":186.11666666666667}]
- run.itemEvolutions: [{"id":"fry-volcano","at":138.36666666666667}]
- run.biomes: ["fry-oil-desert","compost-caves","frozen-tundra","peel-forest"]
- run.distance: 12471.093
- run.dodgePoints: 2111.725
- run.dodgeSecond: 240
- run.dodgeTaken: [49.075810656506285,49.075810656506285,49.075810656506285,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,54.67093065650629,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,56.20747914168102,48.40855556752154,48.40855556752154,48.40855556752154]
- run.dodgeSteps: [944.0946666666487,946.2646666666476,952.4646666666447,956.7013333333094,956.7013333333094,960.7313333333075,966.9313333333046,970.4446666666363,975.7146666666338,975.7146666666338,980.3646666666316,986.5646666666287,990.8013333332934,993.3846666666255,999.5846666666226,1005.7846666666197,1011.9846666666168,1018.1846666666139,1024.3846666666109,1030.584666666608,1036.784666666605,1042.9846666666022,1049.1846666665992,1055.3846666665963,1061.5846666665934,1067.7846666665905,1073.9846666665876,1080.1846666665847,1086.3846666665818,1092.5846666665789,1098.784666666576,1103.7136666665751,1108.3016666665749,1114.501666666572,1120.701666666569,1126.9016666665661,1133.1016666665632,1139.3016666665603,1145.5016666665574,1151.7016666665545,1157.9016666665516,1164.1016666665487,1170.3016666665458,1176.5016666665429,1182.70166666654,1188.901666666537,1195.0396666665342,1199.2349999998678,1199.2349999998678,1203.0686666665347,1208.1526666665336,1214.197666666531,1218.537666666531,1223.9626666665295,1230.1626666665265,1234.0893333331912,1239.772666666522,1245.972666666519,925.4946666666574,931.6946666666545,937.8946666666516]
- run.curseSince: 11505
- run.goldEarned: 431.12
- run.goldSpent: 30
- run.bossChests: 8
- run.paidChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 181
- run.shrinesUsed: 3
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2064
- counters.hits: 3024
- counters.crits: 37
- counters.gems: 942
- counters.coins: 69
- counters.shots: 693
- counters.hostileShots: 82
- counters.nearMisses: 6
- counters.hostileHits: 4
- shrineTotals.might: 0.072
- shrineTotals.magnet: 0.255
- shrineTotals.growth: 0.06
- Gold, spots and chests: gold held at the end 396, spent 30 (Potato Crate 30); spots charged and used: Crop Patch 2, Tater Lantern 2, Beetle Nest 1; chests seen 8, opened 7.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:17 took Root Spikes 39% over Seeker Sprouts 36%, Grab Bag 25%; 0:20 took Root Spikes 61% over Aged Russet 30%, Couch Potato 9%; 0:28 took Hot Start 61% over Root Spikes 27%, Aged Russet 12%; 0:43 took Pickup range 69% over Damage 29%, Luck 2%; 1:02 took Hash Brown Shield 58% over Hot Start 21%, Fry Lance 19%, Skip 2%; 1:06 took Starch Plating 79% over Four-Eyed Spud 8%, Reroll 7%, Big Bowl 5%, Skip 1%; 1:06 took Hash Brown Shield 74% over Root Spikes 16%, Leave 7%, Seeker Sprouts 3%; 1:21 took Masher Grip 49% over Chives 34%, Reroll 9%, Hearty Helping 6%, Skip 2%; 1:30 took XP gain 46% over Area 38%, Cooldown 16%; 1:36 took Starch Plating 79% over Reroll 10%, Hot Start 5%, Tater Trot 5%, Skip 1%; 1:40 took Damage 53% over Luck 45%, Crit 2%; 1:47 took Root Spikes 70% over Hash Brown Shield 23%, Leave 5%, Seeker Sprouts 2%; 1:57 took Starch Plating 83% over Reroll 8%, Seeker Sprouts 4%, Fertilizer 4%, Skip 1%; 2:11 took Starch Plating 84% over Big Bowl 7%, Reroll 6%, Hot Sauce 2%, Skip 1%; 2:17 took Starch Plating 71% over Root Spikes 22%, Reroll 5%, Hot Start 1%, Skip 1%; 2:44 took Mash Wave 45% over Chives 31%, Reroll 14%, Seeker Sprouts 7%, Skip 3%; 3:15 took Starch Chain 51% over Hash Rush 20%, Reroll 20%, Steam Vent 6%, Skip 3%; 3:43 took Hash Brown Shield 71% over Tater Mines 20%, Reroll 7%, Seeker Sprouts 1%, Skip 1%.

### L4.I4.G2: 3 items s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32, build swapped for seeker-sprouts 1, baked-buckler x1, spud-muffin x1, porcupine-spud x1; 240s; plays the playbook.
- Outcome: alive after 240.2s (game clock 04:00), health 144/144; damage taken 29 (enemy:frost-flea 1.458, enemy:potato-beetle 20.36, enemy:aphid 0.839, Hot oil 2.109); 3085 kills; level 1 to 16; planner asked 110 times, action model 225; the models saw the game 38 ms late (p90 60); ended with overgrowth 1, tater-twirl 7, hot-streak 2, reset-button 2, tater-mines 1, starch-chain 2, starch-plating 5, fertilizer 1.
- run.timeSec: 240.233
- run.level: 15
- run.kills: 3085
- run.damageBySource: seeker-sprouts 3595.308, porcupine-spud 2328.404, tater-twirl 1453.352, reset-button 247.102, hot-streak 1806.673, tater-mines 3697.307, grok-bot 663.695, starch-chain 5706.233, overgrowth 71687.426
- run.damageTakenBySource: enemy:frost-flea 1.458, enemy:potato-beetle 20.36, enemy:aphid 0.839, Hot oil 2.109, Brambles 1.292, enemy:wireworm-larva 3.128
- run.killsBySource: seeker-sprouts 208, porcupine-spud 12, tater-twirl 5, reset-button 10, hot-streak 57, tater-mines 119, grok-bot 28, starch-chain 181, overgrowth 2465
- run.evolutions: [{"id":"overgrowth","at":102.58333333333333}]
- run.biomes: ["frozen-tundra","compost-caves","chip-canyons","fry-palace","mash-swamp","peel-forest","ketchup-bog","fry-oil-desert"]
- run.dogs: [{"id":"sigkitten","at":116.86666666666666}]
- run.dogHelp: finds.sigkitten 1
- run.distance: 12969.367
- run.dodgePoints: 2246.134
- run.dodgeSecond: 240
- run.dodgeTaken: [29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915,29.186136524697915]
- run.dodgeSteps: [983.7333333333308,987.1433333333292,987.2466666666626,987.3499999999958,993.5499999999929,999.74999999999,1002.1266666666555,1003.6766666666548,1003.7799999999881,1008.429999999986,1014.629999999983,1020.8299999999801,1027.0299999999772,1033.2299999999743,1039.4299999999714,1045.6299999999685,1051.8299999999656,1058.0299999999627,1064.2299999999598,1070.4299999999569,1076.629999999954,1082.829999999951,1089.0299999999481,1095.2299999999452,1101.4299999999423,1107.6299999999394,1113.8299999999365,1120.0299999999336,1126.2299999999307,1132.4299999999278,1138.6299999999248,1143.796666666589,1149.9966666665862,1156.1966666665833,1162.3966666665804,1168.079999999911,1168.079999999911,1171.4899999999093,1177.6899999999064,1183.8899999999035,1190.0899999999006,1196.2899999998976,1202.4899999998947,1208.6899999998918,1214.889999999889,1221.089999999886,1227.289999999883,1233.4899999998802,1239.6899999998773,1245.8899999998744,1252.0899999998715,1258.2899999998685,1264.4899999998656,1270.6899999998627,1276.8899999998598,1283.089999999857,1289.289999999854,1295.489999999851,971.8500000000031,978.0500000000002,983.7333333333308]
- run.curseSince: 13152
- run.goldEarned: 580.472
- run.goldSpent: 102
- run.bossChests: 13
- run.paidChests: 2
- run.bossesKilled: 2
- run.elitesKilled: 12
- run.peakEnemies: 121
- run.grokBotHelps: 5
- run.botSwarms: 2
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 3085
- counters.hits: 3613
- counters.gems: 297
- counters.coins: 86
- counters.shots: 1415
- counters.hostileShots: 1
- counters.nearMisses: 1
- Gold, spots and chests: gold held at the end 474, spent 102 (Potato Crate 102); spots charged and used: Beetle Nest 2, Potato Crate 2, Stray Dog 1, Crop Patch 1, Tater Lantern 1; chests seen 14, opened 11.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Starch Plating 76% over Harvest Moon 16%, Potato Rain 8%; 0:12 took Tater Twirl 56% over Lean Lunch 39%, Afterburner Fries 5%; 0:24 took Hot Streak 76% over Root Network 20%, Couch Potato 4%; 0:26 took Reset Button 67% over Starch Plating 28%, Tater Twirl 5%; 0:56 took Tater Mines 47% over Spud Sneakers 30%, Bacon Bits 23%; 1:04 took Starch Chain 52% over Starch Plating 36%, Reroll 10%, Slow Cooker 2%; 1:20 took Fertilizer 30% over Tater Mines 25%, Tater Twirl 23%, Reroll 22%; 1:41 took Seeker Sprouts 69% over Starch Plating 18%, Reroll 8%, Butter Pat 5%; 1:54 took Starch Plating 64% over Tater Twirl 23%, Reroll 11%, Golden Fry 2%; 2:03 took Leave 78% over melt 12%, melt 10%; 2:08 took Starch Plating 71% over Butter Socks 16%, Reroll 9%, Tater Mines 4%; 2:31 took Starch Plating 45% over Reset Button 43%, Reroll 9%, Salt Shaker 3%; 3:32 took Starch Chain 49% over Mash Finisher 23%, Salt Shaker 15%, Reroll 13%; 3:32 took Starch Plating 68% over Reset Button 28%, Reroll 3%, Salt Shaker 1%; 3:33 took Hot Streak 48% over Salt Shaker 28%, Reroll 16%, Fertilizer 8%; 3:33 took Reset Button 49% over Salt Shaker 24%, Reroll 17%, Fertilizer 10%.

### L4.I4.G3: 3 items s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33, build swapped for seeker-sprouts 1, baked-buckler x1, spud-muffin x1, porcupine-spud x1; 240s; plays the playbook.
- Outcome: alive after 240.2s (game clock 04:00), health 183/183; damage taken 61 (enemy:sprout-mite 2.998, enemy:cave-grub 4.535, enemy:potato-beetle 7.645, enemy:fry-fly 1.245); 2038 kills; level 1 to 15; planner asked 94 times, action model 457; the models saw the game 33 ms late (p90 55); ended with overgrowth 1, spud-dynamo 1, tater-minigun 1, fry-knives 1, gravy-heart 1, starch-plating 5, masher-grip 1, fertilizer 1.
- run.timeSec: 240.233
- run.level: 14
- run.kills: 2038
- run.damageBySource: seeker-sprouts 10019.937, porcupine-spud 1691.194, spud-dynamo 2382.59, locked-gatling 9599.32, grok-bot 775.128, fry-volcano 8663.556, overgrowth 34228.166, fry-knives 599.301, tater-minigun 282.252
- run.damageTakenBySource: enemy:sprout-mite 2.998, enemy:cave-grub 4.535, enemy:potato-beetle 7.645, enemy:fry-fly 1.245, enemy:sand-crab 1.359, enemy:crumb-ant 1.073, boss:amusing 19.228, Spore vent 8.844, boss:beetle-queen 5.487, enemy:wireworm-larva 7.561, enemy:aphid 0.661
- run.killsBySource: seeker-sprouts 486, porcupine-spud 41, spud-dynamo 68, locked-gatling 325, grok-bot 51, fry-volcano 246, overgrowth 813, fry-knives 1, tater-minigun 7
- run.evolutions: [{"id":"overgrowth","at":200.4},{"id":"tater-minigun","at":232.11666666666667}]
- run.itemEvolutions: [{"id":"fry-volcano","at":133.85}]
- run.biomes: ["compost-caves","chip-canyons","peel-forest"]
- run.distance: 11937.067
- run.dodgePoints: 2113.316
- run.dodgeSecond: 240
- run.dodgeTaken: [41.61687120672219,43.72741607851706,43.72741607851706,43.72741607851706,43.72741607851706,51.288389051490036,53.39893392328491,54.66526084636183,54.66526084636183,54.66526084636183,54.66526084636183,54.66526084636183,54.66526084636183,54.66526084636183,54.66526084636183,54.66526084636183,54.66526084636183,55.9726258192485,55.9726258192485,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,56.63317701443487,57.64502134607615,57.64502134607615,57.64502134607615,57.64502134607615,57.64502134607615,57.64502134607615,57.64502134607615,57.64502134607615,57.64502134607615,57.64502134607615,57.64502134607615,58.832838604959385,60.63656110918951,60.63656110918951,60.63656110918951,60.63656110918951,60.63656110918951,60.63656110918951,60.63656110918951,60.63656110918951,60.63656110918951,60.63656110918951,60.63656110918951,39.90113516611306,39.90113516611306,40.60502687508091]
- run.dodgeSteps: [883.7066666667318,889.9066666667289,896.106666666726,902.3066666667231,908.5066666667202,914.7066666667173,920.9066666667144,927.1066666667115,933.3066666667086,939.5066666667057,945.7066666667027,951.9066666666998,958.1066666666969,963.3766666666945,965.2366666666936,971.0233333333575,975.8800000000219,977.8433333333544,977.8433333333544,983.8366666666849,990.036666666682,994.2733333333466,1000.4733333333437,1004.9166666666749,1011.116666666672,1014.733333333337,1014.733333333337,1019.4866666666682,1025.6866666666651,1031.8866666666622,1038.0866666666593,1044.2866666666564,1050.4866666666535,1056.6866666666506,1062.8866666666477,1069.0866666666448,1075.2866666666418,1081.486666666639,1087.686666666636,1093.8866666666331,1100.0866666666302,1106.2866666666273,1112.4866666666244,1116.9299999999557,1118.3766666666218,1122.40666666662,1128.606666666617,1134.806666666614,1141.0066666666112,1145.4499999999423,1151.443333333273,1157.64333333327,1163.843333333267,1170.0433333332642,1176.2433333332613,1182.4433333332584,1188.6433333332554,1192.2599999999204,865.1066666667406,871.3066666667377,877.5066666667348]
- run.curseSince: 11880
- run.goldEarned: 544.275
- run.goldSpent: 30
- run.bossChests: 8
- run.paidChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 139
- run.shrinesUsed: 5
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 2038
- counters.hits: 3687
- counters.gems: 716
- counters.coins: 83
- counters.shots: 3826
- counters.hostileShots: 80
- counters.nearMisses: 8
- counters.hostileHits: 5
- shrineTotals.cooldown: 0.03
- shrineTotals.maxHp: 26.4
- shrineTotals.armor: 22
- Gold, spots and chests: gold held at the end 509, spent 30 (Potato Crate 30); spots charged and used: Crop Patch 4, Potato Crate 1, Spud Freezer 1, Tater Lantern 1, Beetle Nest 1; chests seen 8, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Gravy Heart 55% over Hash Rush 39%, Spud Sneakers 6%; 0:15 took Spud Dynamo 78% over Seeker Sprouts 19%, Spud Sneakers 3%; 0:29 took Locked Gatling 67% over Harvest Moon 22%, Steam Vent 11%; 0:49 took Starch Plating 52% over Spud Cannon 43%, Salt Shaker 5%; 1:05 took Max HP 93% over Pickup range 4%, Crit 3%; 1:13 took Starch Plating 71% over Chives 25%, Hash Rush 4%; 1:22 took Armor 57% over Max HP 40%, Crit 3%; 1:25 took Starch Plating 63% over Potato Rain 33%, Root Spikes 4%; 1:33 took Cooldown 53% over Crit 26%, Luck 21%; 1:44 took Armor 47% over Area 43%, XP gain 10%; 1:49 took Starch Plating 76% over Seeker Sprouts 19%, Fertilizer 5%; 2:09 took Starch Plating 82% over Seed Potato 17%, Fertilizer 1%; 2:43 took Seeker Sprouts 64% over Tot Stampede 31%, Fertilizer 5%; 2:55 took Max HP 59% over Damage 38%, Move speed 3%; 3:17 took Masher Grip 39% over Sprout Satellites 32%, Fertilizer 20%, Reroll 9%; 3:18 took Fertilizer 35% over Spud Dynamo 30%, Big Bowl 24%, Reroll 11%; 3:18 took Locked Gatling 51% over Thick Skin 25%, Reroll 14%, Spud Dynamo 10%; 3:20 took Fry Knives 45% over Spud Dynamo 30%, Reroll 18%, Clean Plate 7%.

### L4.I4.G4: 3 items s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34, build swapped for seeker-sprouts 1, baked-buckler x1, spud-muffin x1, porcupine-spud x1; 240s; plays the playbook.
- Outcome: alive after 240.1s (game clock 04:00), health 132/132; damage taken 61 (enemy:aphid 2.45, enemy:ketchup-drop 1.573, enemy:tomato-leech 2.346, enemy:oil-drip 2.977); 1726 kills; level 1 to 16; planner asked 97 times, action model 570; the models saw the game 32 ms late (p90 55); ended with seeker-sprouts 8, skillet-flail 2, frying-pan 1, hash-brown-shield 5, starch-plating 5, fertilizer 1.
- run.timeSec: 240.067
- run.level: 15
- run.kills: 1726
- run.damageBySource: seeker-sprouts 9010.986, porcupine-spud 1709.074, skillet-flail 5692.236, grok-bot 923.659, fry-volcano 24054.602, frying-pan 1751.045, hash-brown-shield 7976.295
- run.damageTakenBySource: enemy:aphid 2.45, enemy:ketchup-drop 1.573, enemy:tomato-leech 2.346, enemy:oil-drip 2.977, enemy:crumb-ant 4.298, Hot oil 21.317, enemy:fry-fly 1.771, boss:amusing 6.653, enemy:garden-slug 1.427, enemy:little-grey 1.903, enemy:bog-slime 0.835, enemy:beetle-brood 1.7, enemy:snow-mold 6.074, boss:beetle-queen 2.78, enemy:potato-beetle 3.045
- run.killsBySource: seeker-sprouts 356, porcupine-spud 63, skillet-flail 181, grok-bot 61, fry-volcano 703, frying-pan 62, hash-brown-shield 300
- run.itemEvolutions: [{"id":"fry-volcano","at":103.35}]
- run.biomes: ["mash-swamp","ketchup-bog","fry-oil-desert","crop-circle","chip-canyons","frozen-tundra"]
- run.distance: 13287.478
- run.dodgePoints: 2106.442
- run.dodgeSecond: 240
- run.dodgeTaken: [46.88861761740498,47.54924752588529,47.54924752588529,49.24947133294686,49.24947133294686,49.24947133294686,49.24947133294686,49.24947133294686,49.24947133294686,49.24947133294686,50.72292563681008,50.72292563681008,50.72292563681008,50.72292563681008,50.72292563681008,50.72292563681008,52.21197216683957,52.21197216683957,52.21197216683957,52.21197216683957,52.21197216683957,53.60211772239513,53.60211772239513,53.60211772239513,53.60211772239513,53.60211772239513,55.122861205578744,55.122861205578744,55.122861205578744,56.647549190174516,56.647549190174516,56.647549190174516,56.647549190174516,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,59.58687830945859,61.14954151112526,61.14954151112526,61.14954151112526,61.14954151112526,61.14954151112526,61.14954151112526,61.14954151112526,61.14954151112526,61.14954151112526,61.14954151112526,46.88861761740498,46.88861761740498,46.88861761740498]
- run.dodgeSteps: [1022.5918333332431,1028.1718333332406,1028.1718333332406,1033.2351666665713,1039.4351666665684,1045.6351666665655,1051.8351666665626,1058.0351666665597,1064.2351666665568,1070.4351666665539,1076.635166666551,1082.835166666548,1083.3518333332145,1084.4884999998808,1090.6884999998779,1096.888499999875,1103.088499999872,1109.2884999998691,1115.4884999998662,1121.254499999864,1127.041166666528,1127.041166666528,1131.5878333331925,1137.7878333331896,1143.9878333331867,1150.1878333331838,1155.4578333331813,1160.6244999998455,1166.8244999998426,1173.0244999998397,1179.2244999998368,1185.4244999998339,1191.624499999831,1197.824499999828,1204.0244999998251,1210.2244999998222,1212.291166666488,1212.291166666488,1216.2178333331526,1216.734499999819,1222.9344999998161,1229.1344999998132,1235.3344999998103,1241.5344999998074,1247.7344999998045,1253.9344999998016,1260.1344999997987,1266.3344999997958,1272.5344999997928,1278.73449999979,1284.934499999787,1291.134499999784,1297.3344999997812,1303.5344999997783,1309.7344999997754,1315.9344999997725,1322.1344999997696,1328.3344999997666,1016.8051666665791,1021.1451666665771,1021.1451666665771]
- run.curseSince: 13997
- run.goldEarned: 355.005
- run.bossChests: 4
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 185
- run.grokBotHelps: 6
- run.botSwarms: 1
- run.lootRunnersMet: [1,1]
- counters.kills: 1726
- counters.hits: 2445
- counters.gems: 1003
- counters.coins: 123
- counters.shots: 1017
- counters.hostileShots: 182
- counters.nearMisses: 4
- Gold, spots and chests: gold held at the end 355, spent 0; spots charged and used: Crop Patch 3, Spud Freezer 2, Tater Lantern 1; chests seen 6, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:07 took Starch Plating 76% over Sprout Satellites 22%, Potato Magnet 2%; 0:15 took Starch Plating 83% over Tater Mines 14%, Butter Pat 3%; 0:24 took Seeker Sprouts 63% over Four-Eyed Spud 31%, Potato Magnet 6%; 0:35 took Starch Plating 76% over Starch Bolt 20%, Seeker Sprouts 4%; 1:08 took Starch Plating 69% over Mash Snowball 25%, Afterburner Fries 6%; 1:25 took Starch Plating 92% over Chip Shuriken 7%, Gravy Heart 1%; 1:33 took Skillet Flail 80% over Afterburner Fries 8%, Skip 7%, Spud Sneakers 5%; 1:38 took Skillet Flail 56% over Spud Cannon 21%, Mash Finisher 10%, Reroll 9%, Skip 4%; 1:44 took Leave 74% over Accept 26%; 2:34 took Frying Pan 85% over Reroll 6%, Butter Socks 4%, Seeker Sprouts 4%, Skip 1%; 2:58 took Hash Brown Shield 66% over Frying Pan 26%, Reroll 5%, Peel Phantom 2%, Skip 1%; 3:15 took Hash Brown Shield 33% over Frying Pan 30%, Seeker Sprouts 29%, Leave 8%; 3:23 took Hash Brown Shield 44% over Seeker Sprouts 33%, Skillet Flail 15%, Leave 8%; 3:27 took Seeker Sprouts 46% over Fertilizer 32%, Reroll 14%, Spud Sneakers 5%, Skip 3%; 3:50 took Hash Brown Shield 71% over Reroll 11%, Fertilizer 9%, Four-Eyed Spud 8%, Skip 1%; 3:51 took Seeker Sprouts 64% over Skillet Flail 17%, Fertilizer 10%, Reroll 8%, Skip 1%; 3:51 took Hash Brown Shield 56% over Frying Pan 20%, Fertilizer 11%, Reroll 11%, Skip 2%; 3:53 took Fertilizer 34% over Skillet Flail 27%, Lean Lunch 26%, Reroll 11%, Skip 2%.

### L4.I4.G5: 3 items s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35, build swapped for seeker-sprouts 1, baked-buckler x1, spud-muffin x1, porcupine-spud x1; 240s; plays the playbook.
- Outcome: alive after 240.1s (game clock 04:00), health 132/132; damage taken 51 (enemy:potato-beetle 13.826, Hot oil 12.181, enemy:snow-mold 8.142, boss:amusing 10.418); 2084 kills; level 1 to 14; planner asked 96 times, action model 214; the models saw the game 35 ms late (p90 55); ended with seeker-sprouts 1, starch-chain 3, russet-ricochet 1, tater-mines 1, julienne-dash 1, mash-wave 1, starch-plating 5, sprouting-eyes 2.
- run.timeSec: 240.083
- run.level: 13
- run.kills: 2084
- run.damageBySource: seeker-sprouts 5146.748, starch-chain 14067.479, tater-mines 7589.135, skipping-cannonball 6982.238, porcupine-spud 2595.439, mash-wave 6000.034, julienne-dash 683.658, grok-bot 342.27, russet-ricochet 26313.603
- run.damageTakenBySource: enemy:potato-beetle 13.826, Hot oil 12.181, enemy:snow-mold 8.142, boss:amusing 10.418, enemy:tomato-leech 1.733, boss:beetle-queen 4.907
- run.killsBySource: seeker-sprouts 245, starch-chain 416, tater-mines 251, skipping-cannonball 258, porcupine-spud 71, mash-wave 247, julienne-dash 8, grok-bot 11, russet-ricochet 577
- run.evolutions: [{"id":"russet-ricochet","at":202.03333333333333}]
- run.biomes: ["compost-caves","peel-forest","mash-swamp","ketchup-bog","chip-canyons"]
- run.distance: 13356.867
- run.dodgePoints: 2161.819
- run.dodgeSecond: 240
- run.curseHeldPeak: 5.826
- run.dodgeTaken: [37.91121889188954,39.60193645945711,39.60193645945711,39.60193645945711,39.60193645945711,39.60193645945711,39.60193645945711,41.292654027024675,41.292654027024675,41.292654027024675,43.19896563854181,43.19896563854181,43.19896563854181,43.19896563854181,43.19896563854181,43.19896563854181,43.19896563854181,43.19896563854181,43.19896563854181,43.19896563854181,49.55558551147675,49.55558551147675,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,51.206886041016915,37.91121889188954,37.91121889188954,37.91121889188954]
- run.dodgeSteps: [1021.3466666667224,1021.3466666667224,1021.3466666667224,1027.2366666667197,1033.4366666667167,1039.6366666667138,1045.836666666711,1052.036666666708,1058.236666666705,1064.4366666667022,1070.6366666666993,1076.8366666666964,1082.210000000027,1083.966666666693,1090.1666666666902,1096.3666666666873,1102.5666666666843,1108.7666666666814,1114.9666666666785,1117.7566666666771,1118.79000000001,1124.990000000007,1131.1900000000041,1137.3900000000012,1143.5899999999983,1149.7899999999954,1155.9899999999925,1162.1899999999896,1168.3899999999867,1174.5899999999838,1180.7899999999809,1180.893333333314,1183.2699999999797,1189.4699999999768,1195.669999999974,1201.869999999971,1208.069999999968,1214.2699999999652,1220.4699999999623,1226.6699999999594,1232.8699999999565,1239.0699999999536,1245.2699999999506,1251.4699999999477,1257.6699999999448,1263.869999999942,1270.069999999939,1276.269999999936,1282.4699999999332,1288.6699999999303,1294.8699999999274,1297.969999999926,1304.169999999923,1310.36999999992,1316.5699999999172,1322.7699999999143,1328.9699999999114,1335.1699999999084,1003.780000000064,1009.9800000000611,1016.1800000000582]
- run.curseTicks: 491.75
- run.curseSince: 13015
- run.goldEarned: 395.509
- run.goldSpent: 217
- run.bossChests: 6
- run.paidChests: 3
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 212
- run.shrinesUsed: 1
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 2084
- counters.hits: 3186
- counters.gems: 1090
- counters.coins: 73
- counters.shots: 1832
- counters.hostileShots: 154
- counters.nearMisses: 6
- counters.hostileHits: 3
- shrineTotals.cooldown: 0.06
- Gold, spots and chests: gold held at the end 178, spent 215 (Potato Crate 215); spots charged and used: Crop Patch 2, Potato Crate 1; chests seen 6, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Starch Chain 49% over Peel Out 38%, Afterburner Fries 13%; 0:19 took Skipping Cannonball 49% over Mash Snowball 46%, Golden Fry 5%; 0:27 took Skipping Cannonball 69% over Butter Socks 24%, Seeker Sprouts 7%; 0:28 took Tater Mines 45% over Starch Chain 37%, Masher Grip 18%; 1:01 took Julienne Dash 57% over Skipping Cannonball 40%, Tater Mines 3%; 1:09 took Mash Wave 32% over Big Bowl 30%, Spud Decoy 25%, Reroll 13%; 1:22 took Cooldown 63% over Area 22%, Gold gain 15%; 1:37 took Starch Plating 52% over Julienne Dash 31%, Reroll 12%, Clean Plate 3%, Skip 2%; 1:38 took Starch Plating 42% over Julienne Dash 26%, Sprouting Eyes 19%, Reroll 12%, Skip 1%; 2:12 took Starch Plating 54% over Sprouting Eyes 19%, Reroll 15%, Starch Chain 11%, Skip 1%; 2:14 took Skipping Cannonball 90% over Starch Chain 6%, Leave 3%, Tater Mines 1%; 2:47 took Sprouting Eyes 53% over Starch Plating 35%, Reroll 7%, Big Bowl 4%, Skip 1%; 2:52 took Sprouting Eyes 55% over Starch Plating 31%, Reroll 10%, Root Network 3%, Skip 1%; 3:21 took Starch Plating 84% over Reroll 10%, Seeker Sprouts 3%, Tater Mines 2%, Skip 1%; 3:36 took Starch Plating 86% over Reroll 8%, Mash Wave 5%, Spud Sneakers 1%, Skip 0%.
