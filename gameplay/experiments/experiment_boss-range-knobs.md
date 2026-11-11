# Do boss-range knobs (distrust, offer and dash near a boss) cut amusing and queen damage and raise 4:00 survival from 0:00?

| Field | Value |
| --- | --- |
| Status | done |
| Area | bosses |
| Result | refuted |
| Created | L5.I9 |
| Updated | L6.I2 |

## Hypothesis

The 2:00 amusing boss and the 3:00 queen kill many 120 hp builds in about 4 s while the forecast prices no boss attacks. Asking the action model about every step and offering every move within 250 units of a boss, plus dashing near a boss at threshold 0.3, cuts boss damage and raises alive-at-4:00 on the playbook.

## Method

Seeker-sprouts with the playbook plus distrustBossRange 250, bossOfferRange 250, bossDashRange 250 and bossDashThreshold 0.3, 240 s from 0:00 on s31-40, paired with the 10 playbook games on file (6 of 10 alive). Metrics chosen first: amusing plus Colorado Queen damage taken per game (mean and spread over 10 seeds) and alive at 4:00. Manipulation check: action-model moves and dashes logged while a boss is within 250 units, and dashes at 2:00-2:15. Adopt only on 8 or more of 10 alive with a net of 3 or more paired wins, then confirm on fresh seeds s41-50.

## Findings

The 9 of 10 at s31-40 did not replicate on s41-47 (4 of 7 against 5 of 7). Regression to the mean, as with the holdAbortHurt lead.

## Games

### L5.I9.G1: boss knobs s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240.2s (game clock 04:00), health 41/130; damage taken 195 (Hot oil 38.6, enemy:crumb-ant 6.82, enemy:fry-fly 11.767, enemy:garden-slug 13.79); 1517 kills; level 1 to 15; planner asked 86 times, action model 550; the models saw the game 43 ms late (p90 76); ended with seeker-sprouts 1, reset-button 1, mash-mallet 1, tater-minigun 1, potato-rain 2, salt-line 1, stuffed-skin 1, masher-grip 2, butter-socks 1.
- run.timeSec: 240.183
- run.level: 14
- run.kills: 1517
- run.damageBySource: seeker-sprouts 4681.505, reset-button 3373.611, mash-mallet 4571.334, locked-gatling 10235.069, dog:terrier 2817.508, potato-rain 2916.965, alex 2914.51, salt-line 5207.289, grok-bot 753.402, tater-minigun 7325.894
- run.damageTakenBySource: Hot oil 38.6, enemy:crumb-ant 6.82, enemy:fry-fly 11.767, enemy:garden-slug 13.79, enemy:ketchup-drop 4.319, enemy:potato-beetle 10.162, enemy:swarm-fly 5.544, boss:amusing 45.459, enemy:aphid 5.168, enemy:wireworm-larva 3.294, enemy:oil-drip 10.042, boss:beetle-queen 11.786, enemy:bowling-ball 21.012, enemy:bog-slime 2.63, enemy:tomato-leech 4.121
- run.killsBySource: seeker-sprouts 173, reset-button 97, mash-mallet 201, locked-gatling 349, dog:terrier 104, potato-rain 109, alex 110, salt-line 130, grok-bot 39, tater-minigun 205
- run.evolutions: [{"id":"tater-minigun","at":200.23333333333332}]
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","gutterball-lanes","chip-canyons"]
- run.dogs: [{"id":"terrier","at":57.7}]
- run.dogHelp: damage.terrier 2817.508, hits.terrier 167
- run.distance: 13463.775
- run.dodgePoints: 1487.296
- run.dodgeSecond: 240
- run.dodgeTaken: [141.77941823502294,141.77941823502294,141.77941823502294,146.31250156835628,155.9345663032896,155.9345663032896,155.9345663032896,163.87946084039703,163.87946084039703,163.87946084039703,166.5092110765769,171.80540977657688,171.80540977657688,171.80540977657688,171.80540977657688,171.80540977657688,171.80540977657688,171.80540977657688,171.80540977657688,175.15971545891165,175.15971545891165,175.15971545891165,175.15971545891165,175.15971545891165,175.15971545891165,175.15971545891165,175.15971545891165,179.28084267129657,179.28084267129657,179.28084267129657,186.76482810728845,186.76482810728845,186.76482810728845,186.76482810728845,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,189.55881905327607,194.51453237241049,194.51453237241049,194.51453237241049,194.51453237241049,194.51453237241049,194.51453237241049,194.51453237241049,194.51453237241049,194.51453237241049,141.77941823502294,141.77941823502294,141.77941823502294]
- run.dodgeSteps: [1029.2571666666336,1035.4571666666307,1041.6571666666277,1047.8571666666248,1054.057166666622,1062.1638333332876,1068.3638333332847,1074.5638333332818,1079.6271666666128,1085.2071666666102,1095.277166666608,1101.4771666666052,1107.6771666666023,1113.8771666665994,1120.0771666665964,1126.2771666665935,1132.4771666665906,1134.9571666665895,1134.9571666665895,1134.9571666665895,1141.8238333332558,1148.023833333253,1154.22383333325,1158.0471666665815,1162.4904999999128,1168.69049999991,1174.890499999907,1181.090499999904,1187.2904999999012,1193.4904999998982,1199.6904999998953,1209.7604999998935,1215.9604999998905,1222.1604999998876,1228.3604999998847,1234.5139999998817,1238.481999999878,1243.2353333332092,1248.830833333206,1251.1041666665383,1257.3041666665354,1263.5041666665325,1269.7041666665295,1274.3541666665274,1276.9374999998595,1283.1374999998566,1287.8908333331879,1293.3674999998518,1297.9141666665164,1302.2541666665143,1304.5274999998467,1308.0408333331784,1314.2408333331755,1320.4408333331726,1326.6408333331697,1332.8408333331668,1339.0408333331638,1345.240833333161,1006.7871666666413,1012.9871666666384,1019.1871666666354]
- run.curseSince: 13961
- run.goldEarned: 262.05
- run.bossChests: 4
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 173
- run.shrinesUsed: 1
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1517
- counters.hits: 2853
- counters.gems: 1127
- counters.coins: 56
- counters.shots: 4345
- counters.hostileShots: 122
- counters.nearMisses: 11
- counters.hostileHits: 8
- shrineTotals.magnet: 0.255
- Gold, spots and chests: gold held at the end 262, spent 0; spots charged and used: Crop Patch 1, Spud Freezer 1, Stray Dog 1, Tater Lantern 1; chests seen 6, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:17 took Reset Button 83% over Seeker Sprouts 13%, Hash Boomerang 4%; 0:36 took Mash Mallet 35% over Butter Pat 35%, Seeker Sprouts 30%; 0:58 took Locked Gatling 62% over Mash Snowball 22%, Seeker Sprouts 16%; 1:13 took Locked Gatling 52% over Sprout Satellites 40%, Seeker Sprouts 8%; 1:14 took Pickup range 50% over Damage 33%, Luck 17%; 1:30 took Potato Rain 84% over Sprouting Eyes 10%, Reroll 5%, Golden Fry 1%; 1:51 took Stuffed Skin 36% over Potato Rain 34%, Reroll 21%, Mash Mallet 9%; 2:05 took Locked Gatling 59% over Rösti Disc 34%, Reroll 5%, Clean Plate 2%; 2:14 took Masher Grip 56% over Starch Chain 36%, Reroll 5%, Peel Phantom 3%; 2:29 took Locked Gatling 48% over Masher Grip 47%, Reroll 4%, Seeker Sprouts 1%; 2:31 took Salt Line 56% over Potato Rain 31%, Reroll 8%, Fertilizer 5%; 2:48 took Locked Gatling 89% over Hot Start 5%, Reroll 5%, Fertilizer 1%; 3:45 took Masher Grip 58% over Salt Line 21%, Bacon Bits 11%, Reroll 10%; 3:52 took Butter Socks 49% over Butter Pat 23%, Salt Line 17%, Reroll 11%; 3:57 took Potato Rain 40% over Butter Socks 34%, Salt Line 13%, Reroll 13%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 4, maxHp 120, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 1/8, Reset Button 1/8, Mash Mallet 1/8, Locked Gatling 1/8 | 1:59 level 7, maxHp 129.6, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 1/8, Reset Button 1/8, Mash Mallet 1/8, Locked Gatling 3/8, Potato Rain 1/8, Stuffed Skin 1/5 | 2:59 level 12, maxHp 129.6, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 1/8, Reset Button 1/8, Mash Mallet 1/8, Locked Gatling 7/8, Potato Rain 1/8, Salt Line 1/8, Stuffed Skin 1/5, Masher Grip 1/5 | 3:59 level 15, maxHp 129.6, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 1/8, Reset Button 1/8, Mash Mallet 1/8, Tater Minigun 1/1, Potato Rain 2/8, Salt Line 1/8, Stuffed Skin 1/5, Masher Grip 2/5, Butter Socks 1/5.
- Passive levels first reached: Stuffed Skin 1 at 1:51; Masher Grip 1 at 2:14; Butter Socks 1 at 3:52.

### L5.I9.G2: boss knobs s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240s (game clock 04:00), health 47/152; damage taken 134 (enemy:potato-beetle 39.981, enemy:aphid 2.253, enemy:frost-flea 4.717, enemy:compost-maggot 1.137); 1055 kills; level 1 to 10; planner asked 80 times, action model 459; the models saw the game 36 ms late (p90 68); ended with seeker-sprouts 1, comet-scythe 3, fry-lance 3, root-spikes 1, mash-snowball 1, spud-dice 1, spud-sneakers 1.
- run.timeSec: 239.983
- run.level: 9
- run.kills: 1055
- run.damageBySource: seeker-sprouts 4709.326, comet-scythe 4938.484, fry-lance 6043.319, root-spikes 2712.468, mash-snowball 5827.492, grok-bot 76.591, spud-dice 2571.169
- run.damageTakenBySource: enemy:potato-beetle 39.981, enemy:aphid 2.253, enemy:frost-flea 4.717, enemy:compost-maggot 1.137, enemy:crumb-ant 2.637, boss:amusing 41.868, enemy:sprout-mite 6.192, enemy:snow-mold 4.478, Spore vent 0.667, boss:beetle-queen 4.5, Hot oil 15.288, enemy:dumpster-raccoon 6.753, enemy:bowling-ball 4.013
- run.killsBySource: seeker-sprouts 184, comet-scythe 224, fry-lance 190, root-spikes 160, mash-snowball 220, grok-bot 4, spud-dice 73
- run.biomes: ["frozen-tundra","compost-caves","peel-forest","ketchup-bog","fry-palace","fry-oil-desert","chip-canyons","mash-swamp"]
- run.distance: 13646.405
- run.dodgePoints: 1774.036
- run.dodgeSecond: 239
- run.dodgeTaken: [99.26892154307286,101.51915715458365,101.51915715458365,101.51915715458365,105.21953168641886,106.77758412087579,106.77758412087579,106.77758412087579,106.77758412087579,106.77758412087579,106.77758412087579,106.77758412087579,106.77758412087579,108.91990621825406,114.76260284746752,120.18903468210199,120.18903468210199,122.43927029361278,122.43927029361278,122.43927029361278,125.81033080537752,125.81033080537752,125.81033080537752,125.81033080537752,125.81033080537752,125.81033080537752,125.81033080537752,125.81033080537752,127.32367900113677,127.32367900113677,127.32367900113677,127.32367900113677,127.32367900113677,127.32367900113677,127.32367900113677,127.32367900113677,127.32367900113677,127.32367900113677,127.32367900113677,127.32367900113677,127.32367900113677,131.33676167986366,131.33676167986366,131.33676167986366,131.33676167986366,131.33676167986366,134.48589790780142,134.48589790780142,134.48589790780142,134.48589790780142,134.48589790780142,134.48589790780142,134.48589790780142,134.48589790780142,134.48589790780142,134.48589790780142,134.48589790780142,99.26892154307286,99.26892154307286,99.26892154307286,99.26892154307286]
- run.dodgeSteps: [966.9490733332939,974.0170733332932,981.0850733332925,982.7342733332923,988.9776733332917,997.193873333292,1004.2618733332913,1011.3298733332906,1018.3978733332899,1025.4658733332892,1032.5338733332885,1039.6018733332878,1046.6698733332871,1053.7378733332864,1057.036273333286,1061.3948733332857,1068.462873333285,1075.5308733332843,1082.5988733332836,1089.6668733332829,1096.7348733332822,1106.2960733332818,1114.6106733332813,1121.6786733332806,1128.74667333328,1135.8146733332792,1142.8826733332785,1153.6904733332785,1160.7584733332778,1167.8264733332771,1174.8944733332764,1177.6660066666095,1188.0582733332762,1195.1262733332755,1202.1942733332749,1209.2622733332742,1216.3302733332735,1223.3982733332728,1230.466273333272,1237.5342733332714,1244.6022733332707,1251.67027333327,1258.7382733332693,1265.8062733332686,1272.8742733332679,1279.9422733332672,1287.0102733332665,1294.0782733332658,1301.146273333265,1308.2142733332644,1315.2822733332637,1322.350273333263,1329.4182733332623,1336.4862733332616,1343.5542733332609,1350.6222733332602,1357.6902733332595,936.7042733332959,943.7722733332952,950.8402733332945,957.4370733332938]
- run.curseSince: 9221
- run.goldEarned: 120.957
- run.bossChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 3
- run.peakEnemies: 180
- run.shrinesUsed: 5
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 1055
- counters.hits: 1854
- counters.gems: 306
- counters.coins: 49
- counters.shots: 794
- counters.hostileShots: 276
- counters.nearMisses: 17
- counters.hostileHits: 4
- shrineTotals.moveSpeed: 0.06
- shrineTotals.maxHp: 26.4
- shrineTotals.armor: 24
- Gold, spots and chests: gold held at the end 120, spent 0; spots charged and used: Spud Freezer 1; chests seen 4, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Comet Scythe 89% over Peeler 6%, Sour Cream 5%; 0:25 took Comet Scythe 68% over Mash Finisher 21%, Small Fry 11%; 0:33 took Spud Sneakers 39% over Seeker Sprouts 37%, Aged Russet 24%; 0:58 took Max HP 79% over Duration 11%, Area 10%; 1:06 took Armor 80% over Area 13%, Damage 7%; 1:10 took Fry Lance 48% over Hot Potato 35%, Spud Sneakers 17%; 1:20 took Root Spikes 54% over Spud Sneakers 28%, Reroll 10%, Fertilizer 6%, Skip 2%; 1:26 took Mash Snowball 31% over Sprout Satellites 24%, Tailgate Fries 21%, Reroll 18%, Skip 6%; 1:43 took Armor 51% over Area 30%, Damage 19%; 1:58 took Fry Lance 63% over Four-Eyed Spud 18%, Reroll 12%, Bacon Bits 5%, Skip 2%; 1:58 took Move speed 51% over Cooldown 43%, Luck 6%; 2:27 took Fry Lance 46% over Salt Shaker 19%, Reroll 19%, Root Spikes 13%, Skip 3%; 2:33 took Max HP 85% over Damage 14%, Crit 1%; 2:41 took Spud Dice 51% over Slow Cooker 20%, Seeker Sprouts 16%, Reroll 10%, Skip 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 4, maxHp 137.28, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 2/8, Spud Sneakers 1/5 | 2:00 level 8, maxHp 137.28, armor 24, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 3/8, Fry Lance 2/8, Root Spikes 1/8, Mash Snowball 1/8, Spud Sneakers 1/5 | 2:58 level 10, maxHp 151.68, armor 24, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 3/8, Fry Lance 3/8, Root Spikes 1/8, Mash Snowball 1/8, Spud Dice 1/8, Spud Sneakers 1/5 | 3:59 level 10, maxHp 151.68, armor 24, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 3/8, Fry Lance 3/8, Root Spikes 1/8, Mash Snowball 1/8, Spud Dice 1/8, Spud Sneakers 1/5.
- Passive levels first reached: Spud Sneakers 1 at 0:33.

### L5.I9.G3: boss knobs s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240.2s (game clock 04:00), health 120/120; damage taken 57 (enemy:aphid 1.15, Hot oil 31.167, enemy:fry-fly 7.197, Brambles 3.2); 2535 kills; level 1 to 14; planner asked 89 times, action model 244; the models saw the game 41 ms late (p90 83); ended with overgrowth 1, hash-brown-shield 1, julienne-dash 8, fry-lance 1, spud-cannon 1, tot-stampede 6, hearty-helping 1, butter-pat 2, fertilizer 1, butter-socks 2.
- run.timeSec: 240.233
- run.level: 13
- run.kills: 2535
- run.damageBySource: seeker-sprouts 18890.837, hash-brown-shield 1173.106, julienne-dash 2948.359, fry-lance 3039.192, spud-cannon 3498.308, tot-stampede 7907.963, grok-bot 1360.926, overgrowth 26956.276
- run.damageTakenBySource: enemy:aphid 1.15, Hot oil 31.167, enemy:fry-fly 7.197, Brambles 3.2, enemy:sand-crab 9.169, boss:beetle-queen 2.72, enemy:frost-flea 1.958
- run.killsBySource: seeker-sprouts 962, hash-brown-shield 34, julienne-dash 32, fry-lance 137, spud-cannon 125, tot-stampede 316, grok-bot 61, overgrowth 868
- run.evolutions: [{"id":"overgrowth","at":195.1}]
- run.biomes: ["fry-oil-desert","chip-canyons","peel-forest","frozen-tundra","compost-caves","crop-circle"]
- run.dogs: [{"id":"dachshund","at":75.93333333333334}]
- run.dogHelp: gold.dachshund 168, finds.dachshund 6
- run.distance: 13760.073
- run.dodgePoints: 2061.247
- run.dodgeSecond: 240
- run.dodgeTaken: [39.42919782415052,39.42919782415052,39.42919782415052,39.42919782415052,39.42919782415052,39.42919782415052,39.42919782415052,39.42919782415052,39.42919782415052,51.88212623038003,51.88212623038003,54.60197623038003,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,56.559765267430194,39.42919782415052,39.42919782415052,39.42919782415052]
- run.dodgeSteps: [1034.9039999999436,1041.1039999999407,1047.3039999999378,1051.2306666666027,1057.1206666665998,1063.320666666597,1069.520666666594,1075.7206666665911,1081.9206666665882,1088.1206666665853,1094.3206666665824,1100.5206666665795,1102.8973333332451,1109.0973333332422,1113.5406666665735,1117.7773333332382,1123.150666666569,1128.4206666665664,1134.6206666665635,1138.9606666665616,1145.1606666665587,1151.3606666665557,1157.5606666665528,1163.76066666655,1169.960666666547,1176.160666666544,1182.3606666665412,1188.5606666665383,1194.7606666665354,1200.9606666665325,1207.1606666665296,1213.3606666665266,1219.5606666665237,1225.7606666665208,1231.960666666518,1238.160666666515,1244.360666666512,1250.5606666665092,1256.7606666665063,1262.9606666665034,1269.1606666665004,1275.3606666664975,1281.5606666664946,1287.7606666664917,1293.9606666664888,1300.160666666486,1306.360666666483,1312.56066666648,1318.7606666664772,1324.9606666664743,1331.1606666664713,1337.3606666664684,1343.5606666664655,1349.7606666664626,1355.9606666664597,1362.1606666664568,1368.3606666664539,1374.560666666451,1018.0606666666183,1024.2606666666154,1030.4606666666125]
- run.curseSince: 14142
- run.goldEarned: 871.368
- run.bossChests: 8
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 132
- run.grokBotHelps: 5
- run.botSwarms: 2
- run.lootRunnersMet: [1,1]
- run.lootRunnersCaught: [1,1]
- counters.kills: 2535
- counters.hits: 2786
- counters.gems: 286
- counters.coins: 277
- counters.shots: 2151
- counters.hostileShots: 141
- counters.nearMisses: 25
- counters.hostileHits: 1
- Gold, spots and chests: gold held at the end 863, spent 0; spots charged and used: Crop Patch 4, Stray Dog 1, Frenzy Fryer 1; chests seen 8, opened 8.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Hearty Helping 47% over Rotten Spud 27%, Golden Fry 26%; 0:19 took Hash Brown Shield 72% over Grab Bag 19%, Root Network 9%; 0:28 took Julienne Dash 76% over Fertilizer 16%, Thick Skin 8%; 0:48 took Fry Lance 74% over Seeker Sprouts 19%, Hot Sauce 7%; 1:08 took Spud Cannon 63% over Fry Lance 22%, Fertilizer 15%; 1:18 took Butter Pat 70% over Julienne Dash 16%, Fertilizer 8%, Reroll 6%; 1:32 took Julienne Dash 51% over Fertilizer 31%, Spud Sneakers 9%, Reroll 9%; 1:54 took Tot Stampede 50% over Fertilizer 36%, Couch Potato 7%, Reroll 7%; 2:19 took Julienne Dash 47% over Fertilizer 33%, Reroll 10%, Spud Cannon 8%, Skip 2%; 2:45 took Butter Pat 67% over Hash Brown Shield 14%, Fertilizer 10%, Reroll 8%, Skip 1%; 3:13 took Fertilizer 43% over Fry Lance 37%, Reroll 11%, Slow Cooker 7%, Skip 2%; 3:42 took Butter Socks 77% over Hash Brown Shield 13%, Reroll 8%, Golden Fry 1%, Skip 1%; 3:55 took Butter Socks 84% over Reroll 8%, Fry Lance 4%, Spud Cannon 3%, Skip 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:57 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 4/8, Hash Brown Shield 1/8, Julienne Dash 1/8, Fry Lance 1/8, Hearty Helping 1/5 | 1:59 level 9, maxHp 120, armor 0, damageMult 1.2, recovery 0, Seeker Sprouts 8/8, Hash Brown Shield 1/8, Julienne Dash 5/8, Fry Lance 1/8, Spud Cannon 1/8, Tot Stampede 1/8, Hearty Helping 1/5, Butter Pat 1/5 | 3:00 level 11, maxHp 120, armor 0, damageMult 1.44, recovery 0, Seeker Sprouts 8/8, Hash Brown Shield 1/8, Julienne Dash 7/8, Fry Lance 1/8, Spud Cannon 1/8, Tot Stampede 1/8, Hearty Helping 1/5, Butter Pat 2/5 | 3:58 level 14, maxHp 120, armor 0, damageMult 1.44, recovery 0, Overgrowth 1/1, Hash Brown Shield 1/8, Julienne Dash 8/8, Fry Lance 1/8, Spud Cannon 1/8, Tot Stampede 6/8, Hearty Helping 1/5, Butter Pat 2/5, Fertilizer 1/5, Butter Socks 2/5.
- Passive levels first reached: Hearty Helping 1 at 0:12; Butter Pat 1 at 1:18; Fertilizer 1 at 3:14; Butter Socks 1 at 3:42.

### L5.I9.G4: boss knobs s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240s (game clock 04:00), health 71/120; damage taken 231 (enemy:little-grey 11.707, Hot oil 9, enemy:sprout-mite 1.431, enemy:spittlebug 5.957); 1485 kills; level 1 to 15; planner asked 84 times, action model 565; the models saw the game 36 ms late (p90 64); ended with seeker-sprouts 2, peel-lash 1, tater-mines 1, seed-potato 6, mash-golem 1, skillet-flail 3, fertilizer 1, thick-skin 2.
- run.timeSec: 239.95
- run.level: 14
- run.kills: 1485
- run.damageBySource: seeker-sprouts 5316.756, peel-lash 6768.279, tater-mines 8034.907, seed-potato 12336.725, mash-golem 1197.886, skillet-flail 5967.575, grok-bot 225.922
- run.damageTakenBySource: enemy:little-grey 11.707, Hot oil 9, enemy:sprout-mite 1.431, enemy:spittlebug 5.957, enemy:tomato-leech 26.819, enemy:oil-drip 6.511, enemy:garden-slug 7.362, enemy:bog-slime 6.444, boss:amusing 18.849, enemy:aphid 3.492, boss:beetle-queen 29.918, enemy:beetle-brood 4.578, enemy:snow-mold 79.76, enemy:frost-flea 4.062, enemy:potato-beetle 8.336, enemy:cave-grub 4.267, enemy:compost-maggot 2.133
- run.killsBySource: seeker-sprouts 233, peel-lash 291, tater-mines 308, seed-potato 449, skillet-flail 152, mash-golem 40, grok-bot 12
- run.biomes: ["ketchup-bog","fry-oil-desert","crop-circle","mash-swamp","chip-canyons","frozen-tundra","compost-caves"]
- run.distance: 13198.46
- run.dodgePoints: 1531.573
- run.dodgeSecond: 239
- run.dodgeTaken: [89.70319561409777,97.00057124849428,115.13290458182763,124.19907124849429,124.19907124849429,124.19907124849429,124.19907124849429,129.62797423211072,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,132.0670386363612,152.23322117942098,178.67391370406273,188.9747415234686,193.05876934287448,197.15520171840902,197.15520171840902,197.15520171840902,201.28484826536942,219.87754374986997,219.87754374986997,219.87754374986997,219.87754374986997,219.87754374986997,219.87754374986997,219.87754374986997,219.87754374986997,219.87754374986997,219.87754374986997,224.14440969153665,226.27784266236998,226.27784266236998,226.27784266236998,226.27784266236998,226.27784266236998,226.27784266236998,226.27784266236998,226.27784266236998,230.62575232911078,230.62575232911078,230.62575232911078,230.62575232911078,230.62575232911078,230.62575232911078,230.62575232911078,89.70319561409777,89.70319561409777,89.70319561409777,89.70319561409777]
- run.dodgeSteps: [1048.1566666664746,1053.736666666472,1058.799999999803,1064.9999999998001,1075.0699999997983,1081.2699999997953,1087.4699999997924,1093.6699999997895,1097.183333333121,1100.799999999786,1102.3499999997853,1108.5499999997824,1112.9933333331137,1112.9933333331137,1117.126666666445,1119.3999999997773,1125.5999999997744,1131.7999999997714,1137.9999999997685,1139.6533333331013,1143.3836666664333,1146.1323333331,1150.7203333330997,1156.9203333330968,1163.1203333330939,1169.320333333091,1175.520333333088,1179.7569999997527,1185.9569999997498,1188.953666666415,1194.8436666664124,1198.8736666664104,1203.5443333330766,1206.2826666664096,1210.6226666664097,1215.5826666664088,1221.782666666406,1227.982666666403,1234.1826666664,1240.3826666663972,1246.5826666663943,1250.6126666663924,1252.1626666663917,1253.712666666391,1259.189333333055,1265.389333333052,1269.5226666663834,1275.7226666663805,1280.8893333330448,1283.1626666663772,1288.3293333330414,1291.8426666663731,1298.0426666663702,1301.969333333035,1301.969333333035,1307.7559999996988,1313.955999999696,1023.3566666664863,1029.5566666664834,1035.7566666664804,1041.9566666664775]
- run.curseSince: 14352
- run.goldEarned: 217.04
- run.bossChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 188
- run.grokBotHelps: 6
- run.lootRunnersMet: [1,1]
- counters.kills: 1485
- counters.hits: 2218
- counters.gems: 1194
- counters.coins: 86
- counters.shots: 1354
- counters.hostileShots: 152
- counters.nearMisses: 15
- counters.hostileHits: 6
- Gold, spots and chests: gold held at the end 214, spent 0; spots charged and used: Spud Freezer 3, Crop Patch 2; chests seen 6, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:14 took Peel Lash 86% over Mash Finisher 11%, Hot Sauce 3%; 0:20 took Tater Mines 51% over Peel Lash 25%, Seeker Sprouts 24%; 0:24 took Seeker Sprouts 53% over Masher Grip 33%, Slow Cooker 14%; 0:47 took Seed Potato 74% over Fry Cook Sentry 16%, Salt Shaker 10%; 1:18 took Seed Potato 46% over Seeker Sprouts 28%, Reroll 17%, Peel Lash 9%; 1:38 took Mash Golem 29% over Tater Mines 28%, Peel Phantom 27%, Reroll 16%; 1:39 took Skillet Flail 82% over Seeker Sprouts 9%, Reroll 7%, Peel Lash 2%; 1:54 took Skillet Flail 51% over Sour Cream 33%, Reroll 11%, Clean Plate 4%, Skip 1%; 2:17 took Seed Potato 30% over Lean Lunch 27%, Reroll 25%, Skillet Flail 14%, Skip 4%; 3:10 took Seed Potato 61% over Fertilizer 20%, Reroll 11%, Skillet Flail 7%, Skip 1%; 3:13 took Fertilizer 49% over Reroll 24%, Tater Mines 16%, Peel Lash 9%, Skip 2%; 3:16 took Thick Skin 55% over Peel Lash 26%, Reroll 16%, Bacon Bits 2%, Skip 1%; 3:33 took Skillet Flail 40% over Reroll 35%, Tater Mines 13%, Peel Lash 9%, Skip 3%; 3:35 took Seed Potato 91% over Leave 5%, Peel Lash 2%, Mash Golem 2%; 3:59 took Thick Skin 35% over Reroll 28%, Tater Mines 25%, Mash Golem 10%, Skip 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Peel Lash 1/8, Tater Mines 1/8, Seed Potato 1/8 | 2:00 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Peel Lash 1/8, Tater Mines 1/8, Seed Potato 2/8, Mash Golem 1/8, Skillet Flail 2/8 | 2:59 level 10, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Peel Lash 1/8, Tater Mines 1/8, Seed Potato 4/8, Mash Golem 1/8, Skillet Flail 2/8 | 3:59 level 15, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Peel Lash 1/8, Tater Mines 1/8, Seed Potato 6/8, Mash Golem 1/8, Skillet Flail 3/8, Fertilizer 1/5, Thick Skin 2/5.
- Passive levels first reached: Fertilizer 1 at 3:13; Thick Skin 1 at 3:16.

### L5.I9.G5: boss knobs s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240.1s (game clock 04:00), health 82/130; damage taken 184 (enemy:aphid 8.964, enemy:garden-slug 61.25, enemy:ketchup-drop 2.041, boss:amusing 13.305); 1663 kills; level 1 to 15; planner asked 93 times, action model 341; the models saw the game 44 ms late (p90 85); ended with overgrowth 1, spud-dynamo 1, mash-wave 1, frozen-fries 7, root-spikes 1, salt-line 1, stuffed-skin 1, fertilizer 1, thick-skin 1.
- run.timeSec: 240.067
- run.level: 14
- run.kills: 1663
- run.damageBySource: seeker-sprouts 15177.141, spud-dynamo 4591.515, mash-wave 10278.017, frozen-fries 6575.945, root-spikes 3339.545, grok-bot 208.652, salt-line 2974.31, overgrowth 11003.213
- run.damageTakenBySource: enemy:aphid 8.964, enemy:garden-slug 61.25, enemy:ketchup-drop 2.041, boss:amusing 13.305, enemy:bog-slime 2.163, boss:beetle-queen 35.358, enemy:beetle-brood 9.426, enemy:cave-grub 32.464, enemy:compost-maggot 6.124, enemy:potato-beetle 8.241, Spore vent 4.267
- run.killsBySource: seeker-sprouts 624, spud-dynamo 92, mash-wave 324, frozen-fries 172, root-spikes 109, grok-bot 4, salt-line 58, overgrowth 280
- run.evolutions: [{"id":"overgrowth","at":227.1}]
- run.biomes: ["compost-caves","ketchup-bog","mash-swamp","peel-forest","frozen-tundra"]
- run.dogs: [{"id":"husky","at":46.56666666666667}]
- run.distance: 13173.87
- run.dodgePoints: 1703.011
- run.dodgeSecond: 240
- run.dodgeTaken: [76.77087102683255,79.49072102683255,79.49072102683255,79.49072102683255,79.49072102683255,79.49072102683255,79.49072102683255,79.49072102683255,79.49072102683255,79.49072102683255,79.49072102683255,82.21057102683255,91.27673769349921,112.12892102683256,121.55504271592602,121.55504271592602,121.55504271592602,121.55504271592602,121.55504271592602,125.50095396122299,125.50095396122299,127.51613156538966,127.51613156538966,127.51613156538966,131.4514393703962,131.4514393703962,131.4514393703962,135.55113883745145,135.55113883745145,135.55113883745145,135.55113883745145,135.55113883745145,135.55113883745145,164.21323118764863,166.26839389158476,166.26839389158476,166.26839389158476,170.38952110396968,170.38952110396968,170.38952110396968,174.50982955979438,179.33655050635247,179.33655050635247,179.33655050635247,179.33655050635247,181.60321717301915,181.8698838396858,181.8698838396858,181.8698838396858,181.8698838396858,181.8698838396858,181.8698838396858,182.40321717301913,183.60321717301915,183.60321717301915,183.60321717301915,183.60321717301915,183.60321717301915,76.77087102683255,76.77087102683255,76.77087102683255]
- run.dodgeSteps: [1007.0869999999186,1013.2869999999157,1019.4869999999128,1025.6869999999099,1028.9936666665749,1031.9903333332402,1037.1569999999044,1043.0469999999018,1046.8703333332332,1053.0703333332303,1059.2703333332274,1065.4703333332245,1071.6703333332216,1081.7403333332197,1087.9403333332168,1093.9336666665472,1093.9336666665472,1098.6869999998785,1107.4136666665438,1113.613666666541,1119.2969999998716,1125.4969999998686,1131.6969999998657,1137.5869999998629,1143.78699999986,1149.986999999857,1156.1869999998542,1162.3869999998512,1168.5869999998483,1174.7869999998454,1180.9869999998425,1187.1869999998396,1193.3869999998367,1199.5869999998338,1203.9269999998319,1206.7169999998305,1211.263666666495,1217.4636666664921,1221.0803333331571,1223.973666666489,1230.173666666486,1236.3736666664831,1240.1969999998148,1246.396999999812,1248.5669999998108,1251.0469999998097,1252.7003333331422,1254.9736666664744,1261.1736666664715,1267.3736666664686,1273.5736666664657,1279.7736666664628,1285.9736666664598,1292.173666666457,1298.373666666454,1304.5736666664511,1310.7736666664482,1316.9736666664453,988.4869999999273,994.6869999999244,1000.8869999999215]
- run.curseSince: 14086
- run.goldEarned: 393.108
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 175
- run.grokBotHelps: 6
- run.lootRunnersMet: [1]
- counters.kills: 1663
- counters.hits: 3330
- counters.gems: 1023
- counters.coins: 84
- counters.shots: 2857
- counters.hostileShots: 182
- counters.nearMisses: 8
- counters.hostileHits: 6
- Gold, spots and chests: gold held at the end 393, spent 0; spots charged and used: Spud Freezer 3, Crop Patch 1, Stray Dog 1, Beetle Nest 1; chests seen 8, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Spud Dynamo 49% over Peel Out 38%, Tailgate Fries 13%; 0:15 took Mash Wave 45% over Small Fry 29%, Gravy Heart 26%; 0:26 took Frozen Fries 40% over Tater Tot Pup 35%, Starch Plating 25%; 0:27 took Root Spikes 57% over Spud Dynamo 28%, Fertilizer 15%; 1:05 took Salt Line 71% over Spud Dynamo 21%, Seeker Sprouts 8%; 1:09 took Stuffed Skin 63% over Seeker Sprouts 33%, Salt Line 4%; 1:30 took Seeker Sprouts 31% over Reroll 28%, Mash Wave 22%, Frozen Fries 19%; 1:46 took Seeker Sprouts 60% over Fertilizer 22%, Reroll 12%, Spud Dynamo 6%; 1:58 took Frozen Fries 36% over Stuffed Skin 26%, Fertilizer 20%, Reroll 18%; 2:18 took Frozen Fries 35% over Stuffed Skin 34%, Fertilizer 18%, Reroll 13%; 2:45 took Fertilizer 45% over Spud Dynamo 23%, Root Spikes 18%, Reroll 14%; 3:23 took Frozen Fries 68% over Reroll 17%, Root Spikes 9%, Salt Line 6%; 3:35 took Frozen Fries 59% over Thick Skin 23%, Reroll 11%, Bacon Bits 7%; 3:54 took Thick Skin 68% over Spud Dynamo 14%, Reroll 12%, Salt Line 6%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Spud Dynamo 1/8, Mash Wave 1/8, Frozen Fries 1/8, Root Spikes 1/8 | 1:58 level 10, maxHp 129.6, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Spud Dynamo 1/8, Mash Wave 1/8, Frozen Fries 2/8, Root Spikes 1/8, Salt Line 1/8, Stuffed Skin 1/5 | 2:59 level 12, maxHp 129.6, armor 0, damageMult 1, recovery 0, Seeker Sprouts 7/8, Spud Dynamo 1/8, Mash Wave 1/8, Frozen Fries 3/8, Root Spikes 1/8, Salt Line 1/8, Stuffed Skin 1/5, Fertilizer 1/5 | 3:59 level 15, maxHp 129.6, armor 0, damageMult 1, recovery 0, Overgrowth 1/1, Spud Dynamo 1/8, Mash Wave 1/8, Frozen Fries 7/8, Root Spikes 1/8, Salt Line 1/8, Stuffed Skin 1/5, Fertilizer 1/5, Thick Skin 1/5.
- Passive levels first reached: Stuffed Skin 1 at 1:09; Fertilizer 1 at 2:45; Thick Skin 1 at 3:54.

### L5.I9.G6: boss knobs s36

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 36; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240.2s (game clock 04:00), health 85/120; damage taken 164 (enemy:aphid 2.365, Hot oil 44.133, enemy:ketchup-drop 11.786, boss:amusing 18.849); 1558 kills; level 1 to 15; planner asked 89 times, action model 506; the models saw the game 36 ms late (p90 176); ended with seeker-sprouts 8, spud-decoy 1, hash-brown-shield 7, tater-mines 1, sprout-squad 2, fry-knives 1, gravy-splash 1, butter-pat 1.
- run.timeSec: 240.167
- run.level: 14
- run.kills: 1558
- run.damageBySource: seeker-sprouts 9717.323, spud-decoy 6820.024, hash-brown-shield 13087.591, tater-mines 7449.262, sprout-squad 5524.572, grok-bot 711.594, fry-knives 2921.066, gravy-splash 390.079
- run.damageTakenBySource: enemy:aphid 2.365, Hot oil 44.133, enemy:ketchup-drop 11.786, boss:amusing 18.849, enemy:tomato-leech 10.517, enemy:bog-slime 16.914, boss:beetle-queen 17.226, enemy:beetle-brood 4.645, enemy:sand-crab 14.957, enemy:crumb-ant 4.3, enemy:fry-fly 3.599, enemy:bowling-pin 2.864, enemy:bowling-ball 11.657
- run.killsBySource: seeker-sprouts 355, spud-decoy 277, hash-brown-shield 454, tater-mines 275, sprout-squad 138, grok-bot 24, fry-knives 24, gravy-splash 11
- run.biomes: ["fry-oil-desert","mash-swamp","ketchup-bog","chip-canyons","gutterball-lanes"]
- run.distance: 13781.833
- run.dodgePoints: 1786.424
- run.dodgeSecond: 240
- run.dodgeTaken: [89.74240514947999,89.74240514947999,89.74240514947999,89.74240514947999,89.74240514947999,89.74240514947999,98.80857181614667,106.17350819135903,106.17350819135903,111.90684152469235,114.44017485802567,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,120.99533588603487,133.0082942565019,133.0082942565019,133.0082942565019,146.57064236144686,149.29049236144684,157.91262036613887,157.91262036613887,157.91262036613887,157.91262036613887,157.91262036613887,163.81186502447133,89.74240514947999,89.74240514947999,89.74240514947999]
- run.dodgeSteps: [1034.2533333332228,1040.45333333322,1046.653333333217,1052.853333333214,1059.0533333332112,1065.2533333332083,1071.4533333332054,1077.6533333332025,1083.8533333331995,1090.0533333331966,1096.2533333331937,1106.3233333331918,1112.523333333189,1118.723333333186,1124.923333333183,1131.1233333331802,1141.1933333331783,1147.3933333331754,1153.5933333331725,1159.7933333331696,1165.9933333331667,1176.0633333331648,1177.8199999998305,1181.953333333162,1188.153333333159,1194.3533333331561,1200.5533333331532,1206.7533333331503,1212.9533333331474,1219.1533333331445,1225.3533333331416,1231.5533333331387,1237.7533333331357,1243.9533333331328,1250.15333333313,1256.353333333127,1262.553333333124,1268.7533333331212,1274.9533333331183,1281.1533333331154,1284.7699999997803,1290.763333333111,1295.206666666442,1301.4066666664392,1307.6066666664362,1313.8066666664333,1320.0066666664304,1326.2066666664275,1332.4066666664246,1338.6066666664217,1344.7033333330855,1347.5966666664176,1353.7966666664147,1359.9966666664118,1366.1966666664089,1372.396666666406,1378.1833333330699,1378.1833333330699,1025.98666666656,1025.98666666656,1029.8099999998917]
- run.curseSince: 11307
- run.goldEarned: 370.67
- run.bossChests: 5
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 174
- run.shrinesUsed: 1
- run.grokBotHelps: 7
- run.lootRunnersMet: [1]
- counters.kills: 1558
- counters.hits: 2748
- counters.gems: 1084
- counters.coins: 86
- counters.shots: 1088
- counters.hostileShots: 338
- counters.nearMisses: 26
- counters.hostileHits: 6
- shrineTotals.might: 0.12
- Gold, spots and chests: gold held at the end 370, spent 0; spots charged and used: Crop Patch 2, Tater Lantern 1, Spud Freezer 1; chests seen 6, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Spud Decoy 77% over Masher Grip 12%, Potato Magnet 11%; 0:16 took Hash Brown Shield 80% over Seeker Sprouts 14%, Spud Decoy 6%; 0:26 took Seeker Sprouts 59% over Hash Rush 32%, Salt Shaker 9%; 0:27 took Tater Mines 64% over Spud Decoy 19%, Slow Cooker 17%; 0:56 took Sprout Squad 51% over Spud Decoy 27%, Four-Eyed Spud 22%; 1:12 took Hash Brown Shield 70% over Mash Finisher 14%, Reroll 11%, Seeker Sprouts 5%; 1:57 took Fry Knives 64% over Sprouting Eyes 19%, Reroll 10%, Spud Decoy 7%; 2:02 took Damage 86% over Gold gain 8%, Crit 6%; 2:10 took Gravy Splash 37% over Tater Mines 35%, Reroll 19%, Hot Sauce 9%; 2:19 took Sprout Squad 39% over Reroll 23%, Spud Decoy 21%, Fry Knives 17%; 2:44 took Hash Brown Shield 68% over Reroll 13%, Fertilizer 11%, Tater Mines 8%; 3:08 took Butter Pat 62% over Fry Knives 20%, Fertilizer 10%, Reroll 8%; 3:49 took Hash Brown Shield 46% over Gravy Splash 40%, Reroll 10%, Fertilizer 4%; 3:55 took Hash Brown Shield 68% over Fertilizer 14%, Reroll 12%, Sprout Squad 6%; 3:57 took Hash Brown Shield 63% over Big Bowl 19%, Fertilizer 10%, Reroll 8%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Spud Decoy 1/8, Hash Brown Shield 1/8, Tater Mines 1/8, Sprout Squad 1/8 | 1:59 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Spud Decoy 1/8, Hash Brown Shield 2/8, Tater Mines 1/8, Sprout Squad 1/8, Fry Knives 1/8 | 2:58 level 11, maxHp 120, armor 0, damageMult 1.12, recovery 0, Seeker Sprouts 4/8, Spud Decoy 1/8, Hash Brown Shield 3/8, Tater Mines 1/8, Sprout Squad 2/8, Fry Knives 1/8, Gravy Splash 1/5 | 3:59 level 15, maxHp 120, armor 0, damageMult 1.344, recovery 0, Seeker Sprouts 8/8, Spud Decoy 1/8, Hash Brown Shield 7/8, Tater Mines 1/8, Sprout Squad 2/8, Fry Knives 1/8, Gravy Splash 1/5, Butter Pat 1/5.
- Passive levels first reached: Gravy Splash 1 at 2:10; Butter Pat 1 at 3:08.

### L5.I9.G7: boss knobs s37

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 37; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240s (game clock 04:00), health 95/120; damage taken 104 (enemy:cave-grub 2.314, enemy:spittlebug 45.292, enemy:aphid 1.413, enemy:little-grey 20.836); 1620 kills; level 1 to 13; planner asked 88 times, action model 425; the models saw the game 37 ms late (p90 126); ended with seeker-sprouts 1, broadside 8, julienne-dash 1, cold-storage 1, seed-potato 1, hash-brown-shield 1, slow-cooker 1, butter-pat 1.
- run.timeSec: 239.95
- run.level: 12
- run.kills: 1620
- run.damageBySource: seeker-sprouts 4704.307, julienne-dash 1948.442, broadside 4473.709, root-cellar 4267.928, seed-potato 4699.996, grok-bot 399.496, cold-storage 21905.261, hash-brown-shield 705.424
- run.damageTakenBySource: enemy:cave-grub 2.314, enemy:spittlebug 45.292, enemy:aphid 1.413, enemy:little-grey 20.836, boss:amusing 8.87, enemy:sand-crab 24.922
- run.killsBySource: seeker-sprouts 200, julienne-dash 54, broadside 192, seed-potato 184, grok-bot 26, root-cellar 207, cold-storage 750, hash-brown-shield 7
- run.evolutions: [{"id":"cold-storage","at":160.28333333333333}]
- run.biomes: ["compost-caves","crop-circle","peel-forest","fry-oil-desert","chip-canyons","frozen-tundra","ketchup-bog"]
- run.distance: 13590.4
- run.dodgePoints: 1989.978
- run.dodgeSecond: 239
- run.dodgeTaken: [70.86610912077536,70.86610912077536,70.86610912077536,70.86610912077536,70.86610912077536,70.86610912077536,70.86610912077536,70.86610912077536,70.86610912077536,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,76.04677578744203,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,78.72514347528016,87.03249883438995,103.64720955260955,70.86610912077536,70.86610912077536,70.86610912077536,70.86610912077536]
- run.dodgeSteps: [1040.9799999998966,1047.1799999998937,1053.3799999998907,1059.5799999998878,1065.779999999885,1071.979999999882,1078.179999999879,1084.3799999998762,1090.5799999998733,1096.7799999998704,1097.8133333332032,1102.6699999998677,1108.8699999998648,1115.069999999862,1116.7233333331944,1120.2366666665262,1126.4366666665233,1126.4366666665233,1127.3666666665226,1133.5666666665197,1139.7666666665168,1145.966666666514,1152.166666666511,1158.366666666508,1164.5666666665052,1168.9066666665033,1175.1066666665004,1181.3066666664974,1187.5066666664945,1193.7066666664916,1199.9066666664887,1206.1066666664858,1212.306666666483,1218.50666666648,1224.706666666477,1230.9066666664742,1237.1066666664713,1243.3066666664683,1249.5066666664654,1255.7066666664625,1261.9066666664596,1268.1066666664567,1274.3066666664538,1280.5066666664509,1286.706666666448,1292.906666666445,1299.1066666664422,1305.3066666664392,1311.5066666664363,1317.7066666664334,1323.9066666664305,1330.1066666664276,1336.3066666664247,1342.5066666664218,1344.3666666664208,1346.949999999753,1353.14999999975,1016.1799999999082,1022.3799999999053,1028.5799999999024,1034.7799999998995]
- run.curseSince: 11626
- run.goldEarned: 487.845
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 168
- run.grokBotHelps: 6
- run.botSwarms: 1
- run.lootRunnersMet: [1,1]
- counters.kills: 1620
- counters.hits: 2145
- counters.gems: 484
- counters.coins: 97
- counters.shots: 1263
- counters.hostileShots: 367
- counters.nearMisses: 40
- counters.hostileHits: 20
- Gold, spots and chests: gold held at the end 487, spent 0; spots charged and used: Crop Patch 5; chests seen 6, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:04 took Broadside 82% over Gravy Heart 11%, Gravy Splash 7%; 0:12 took Julienne Dash 72% over Broadside 17%, Seeker Sprouts 11%; 0:25 took Root Cellar 60% over Julienne Dash 29%, Broadside 11%; 0:43 took Seed Potato 53% over Broadside 38%, Small Fry 9%; 1:02 took Root Cellar 47% over Salt Shaker 27%, Seeker Sprouts 26%; 1:19 took Root Cellar 68% over Spud Sneakers 13%, Reroll 10%, Rotten Spud 9%; 1:54 took Root Cellar 44% over Slow Cooker 28%, Big Bowl 21%, Reroll 7%; 2:22 took Broadside 41% over Slow Cooker 39%, Reroll 12%, Rotten Spud 8%; 2:37 took Slow Cooker 67% over Butter Pat 26%, Reroll 5%, Rotten Spud 2%; 3:00 took Hash Brown Shield 74% over Broadside 12%, Seed Potato 8%, Reroll 6%; 3:13 took Butter Pat 46% over Slow Cooker 34%, Reroll 15%, Salt Shaker 4%, Skip 1%; 3:37 took Broadside 41% over Butter Pat 28%, Sour Cream 21%, Reroll 9%, Skip 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Broadside 1/8, Julienne Dash 1/8, Root Cellar 1/8, Seed Potato 1/8 | 1:55 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Broadside 1/8, Julienne Dash 1/8, Root Cellar 5/8, Seed Potato 1/8 | 2:57 level 10, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Broadside 2/8, Julienne Dash 1/8, Cold Storage 1/1, Seed Potato 1/8, Slow Cooker 1/5 | 3:59 level 13, maxHp 120, armor 0, damageMult 1.2, recovery 0, Seeker Sprouts 1/8, Broadside 8/8, Julienne Dash 1/8, Cold Storage 1/1, Seed Potato 1/8, Hash Brown Shield 1/8, Slow Cooker 1/5, Butter Pat 1/5.
- Passive levels first reached: Slow Cooker 1 at 2:37; Butter Pat 1 at 3:13.

### L5.I9.G8: boss knobs s38

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 38; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240.2s (game clock 04:00), health 112/120; damage taken 146 (Spore vent 15.954, enemy:compost-maggot 5.605, enemy:potato-beetle 17.947, enemy:cave-grub 5.66); 1764 kills; level 1 to 16; planner asked 93 times, action model 523; the models saw the game 40 ms late (p90 246); ended with seeker-sprouts 7, fry-sentry 2, root-spikes 3, hash-boomerang 1, julienne-dash 2, butter-streak 1, fertilizer 2, lean-lunch 1, chives 1.
- run.timeSec: 240.217
- run.level: 15
- run.kills: 1764
- run.damageBySource: seeker-sprouts 17518.321, fry-sentry 6337.034, root-spikes 4753.461, hash-boomerang 14138.553, julienne-dash 3442.222, butter-streak 3982.737, grok-bot 648.434
- run.damageTakenBySource: Spore vent 15.954, enemy:compost-maggot 5.605, enemy:potato-beetle 17.947, enemy:cave-grub 5.66, enemy:sprout-mite 3.819, enemy:ketchup-drop 1.652, boss:amusing 10.564, enemy:sand-crab 3.08, enemy:oil-drip 5.458, Hot oil 33.247, enemy:fry-fly 5.227, enemy:aphid 3.162, enemy:beetle-brood 7.472, boss:beetle-queen 11.058, enemy:crumb-ant 1.589, enemy:frost-flea 4.801, enemy:snow-mold 9.72
- run.killsBySource: seeker-sprouts 674, fry-sentry 231, root-spikes 176, hash-boomerang 481, julienne-dash 99, butter-streak 93, grok-bot 10
- run.biomes: ["compost-caves","peel-forest","ketchup-bog","chip-canyons","fry-oil-desert","frozen-tundra"]
- run.dogs: [{"id":"retriever","at":155.31666666666666}]
- run.dogHelp: fetched.retriever 343
- run.distance: 13368.133
- run.dodgePoints: 1769.759
- run.dodgeSecond: 240
- run.dodgeTaken: [90.10151152272809,90.10151152272809,92.67321974332027,92.67321974332027,92.67321974332027,92.67321974332027,94.22461764398085,94.22461764398085,94.22461764398085,94.22461764398085,94.22461764398085,94.22461764398085,104.22554174160238,104.22554174160238,104.22554174160238,104.22554174160238,105.81452747848678,105.81452747848678,105.81452747848678,108.18409376636556,108.18409376636556,110.83946218915918,115.63576982172144,127.38731410919137,128.9978470389065,134.59170517969883,134.59170517969883,134.59170517969883,134.59170517969883,134.59170517969883,134.59170517969883,134.59170517969883,134.59170517969883,134.59170517969883,134.59170517969883,134.59170517969883,137.89593229556183,137.89593229556183,137.89593229556183,137.89593229556183,137.89593229556183,137.89593229556183,137.89593229556183,142.54633879962685,142.54633879962685,142.54633879962685,142.54633879962685,142.54633879962685,142.54633879962685,142.54633879962685,142.54633879962685,142.54633879962685,142.54633879962685,142.54633879962685,146.01550638133276,146.01550638133276,146.01550638133276,146.01550638133276,90.10151152272809,90.10151152272809,90.10151152272809]
- run.dodgeSteps: [1008.1666666666221,1014.3666666666192,1020.5666666666162,1026.7666666666132,1032.9666666666103,1039.1666666666074,1045.3666666666045,1051.5666666666016,1057.7666666665987,1063.9666666665958,1068.6166666665936,1071.9233333332588,1072.8533333332584,1079.0533333332555,1085.2533333332526,1091.4533333332497,1095.999999999914,1102.1999999999111,1108.3999999999082,1114.5999999999053,1120.7999999999024,1126.9999999998995,1133.1999999998966,1139.3999999998937,1145.5999999998908,1151.7999999998879,1157.999999999885,1164.199999999882,1170.3999999998791,1176.5999999998762,1182.7999999998733,1188.9999999998704,1195.1999999998675,1205.2699999998656,1209.5066666665302,1215.7066666665273,1218.8066666665259,1223.3533333331904,1229.5533333331875,1235.7533333331846,1241.9533333331817,1246.6033333331795,1249.8066666665113,1256.0066666665084,1261.2766666665061,1266.4433333331704,1270.7833333331682,1276.9833333331653,1282.4599999998295,1285.8699999998278,1292.0699999998249,1298.269999999822,1304.469999999819,1310.6699999998161,1316.8699999998132,1323.0699999998103,1329.2699999998074,1335.4699999998045,989.5666666666308,995.7666666666279,1001.966666666625]
- run.curseSince: 13786
- run.goldEarned: 226.09
- run.bossChests: 2
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 175
- run.shrinesUsed: 2
- run.grokBotHelps: 3
- run.lootRunnersMet: [1]
- counters.kills: 1764
- counters.hits: 3219
- counters.gems: 1379
- counters.coins: 64
- counters.shots: 1495
- counters.hostileShots: 194
- counters.nearMisses: 13
- counters.hostileHits: 4
- shrineTotals.armor: 17
- shrineTotals.growth: 0.12
- Gold, spots and chests: gold held at the end 226, spent 0; spots charged and used: Crop Patch 2, Tater Lantern 2, Stray Dog 1; chests seen 6, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Fry Cook Sentry 61% over Spud Decoy 25%, Gravy Splash 14%; 0:22 took Root Spikes 68% over Root Network 24%, Seeker Sprouts 8%; 0:36 took Hash Boomerang 86% over Sour Cream 12%, Bacon Bits 2%; 0:45 took Armor 89% over Area 10%, Crit 1%; 0:53 took XP gain 88% over Pickup range 11%, Luck 1%; 1:08 took Julienne Dash 64% over Lean Lunch 29%, Seeker Sprouts 7%; 1:16 took Butter Streak 48% over Julienne Dash 32%, Fry Knives 20%; 1:23 took Fertilizer 43% over Root Spikes 33%, Hash Boomerang 24%; 1:31 took Fertilizer 69% over Reroll 19%, Tater Trot 8%, Lean Lunch 4%; 1:52 took Julienne Dash 42% over Fertilizer 35%, Reroll 12%, Butter Streak 11%; 2:19 took Lean Lunch 37% over Butter Streak 32%, Hash Boomerang 16%, Reroll 15%; 2:38 took Seeker Sprouts 84% over Reroll 8%, Root Spikes 6%, Hash Boomerang 2%; 2:39 took Seeker Sprouts 58% over Fertilizer 19%, Julienne Dash 15%, Reroll 8%; 2:41 took Root Spikes 50% over Lean Lunch 22%, Reroll 22%, Bacon Bits 6%; 3:15 took Root Spikes 31% over Reroll 28%, Hash Boomerang 25%, Lean Lunch 16%; 3:24 took Fry Cook Sentry 36% over Reroll 26%, Slow Cooker 19%, Lean Lunch 14%, Skip 5%; 3:49 took Chives 56% over Root Spikes 21%, Reroll 12%, Butter Streak 9%, Skip 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:55 level 4, maxHp 120, armor 17, damageMult 1, recovery 0, Seeker Sprouts 1/8, Fry Cook Sentry 1/8, Root Spikes 1/8, Hash Boomerang 1/8 | 1:59 level 9, maxHp 120, armor 17, damageMult 1, recovery 0, Seeker Sprouts 5/8, Fry Cook Sentry 1/8, Root Spikes 1/8, Hash Boomerang 1/8, Julienne Dash 2/8, Butter Streak 1/8, Fertilizer 2/5 | 2:59 level 13, maxHp 120, armor 17, damageMult 1, recovery 0, Seeker Sprouts 7/8, Fry Cook Sentry 1/8, Root Spikes 2/8, Hash Boomerang 1/8, Julienne Dash 2/8, Butter Streak 1/8, Fertilizer 2/5, Lean Lunch 1/5 | 3:59 level 16, maxHp 120, armor 17, damageMult 1, recovery 0, Seeker Sprouts 7/8, Fry Cook Sentry 2/8, Root Spikes 3/8, Hash Boomerang 1/8, Julienne Dash 2/8, Butter Streak 1/8, Fertilizer 2/5, Lean Lunch 1/5, Chives 1/5.
- Passive levels first reached: Fertilizer 1 at 1:23; Lean Lunch 1 at 2:19; Chives 1 at 3:49.

### L5.I9.G9: boss knobs s39

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 39; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240s (game clock 04:00), health 137/137; damage taken 45 (enemy:frost-flea 4.263, enemy:snow-mold 6.954, enemy:cave-grub 25.711, boss:amusing 3.326); 2693 kills; level 1 to 18; planner asked 100 times, action model 260; the models saw the game 36 ms late (p90 150); ended with seeker-sprouts 7, permafrost-fries 1, tater-pup 1, spud-decoy 1, hot-streak 2, peel-lash 2, sprouting-eyes 1, thick-skin 4, sour-cream 2.
- run.timeSec: 239.967
- run.level: 17
- run.kills: 2693
- run.damageBySource: seeker-sprouts 7189.863, frozen-fries 4031.675, tater-pup 3462.323, spud-decoy 6661.632, hot-streak 11988.76, grok-bot 994.522, peel-lash 4811.361, permafrost-fries 33154.016
- run.damageTakenBySource: enemy:frost-flea 4.263, enemy:snow-mold 6.954, enemy:cave-grub 25.711, boss:amusing 3.326, boss:beetle-queen 4.533
- run.killsBySource: seeker-sprouts 317, frozen-fries 201, tater-pup 98, spud-decoy 279, hot-streak 406, grok-bot 62, peel-lash 220, permafrost-fries 1110
- run.evolutions: [{"id":"permafrost-fries","at":153.96666666666667}]
- run.biomes: ["frozen-tundra","compost-caves","peel-forest"]
- run.dogs: [{"id":"retriever","at":33.75}]
- run.dogHelp: fetched.retriever 1004
- run.distance: 12553.243
- run.dodgePoints: 2176.069
- run.dodgeSecond: 239
- run.dodgeTaken: [36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536,40.734089095513866,40.734089095513866,40.734089095513866,40.734089095513866,40.734089095513866,40.734089095513866,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,44.78750226817229,36.201005762180536,36.201005762180536,36.201005762180536,36.201005762180536]
- run.dodgeSteps: [997.7866666666207,1002.3746666666204,1007.5516666666192,1013.7516666666163,1019.9516666666134,1026.1516666666105,1032.3516666666076,1033.2816666666072,1036.3816666666057,1042.5816666666028,1048.7816666666,1054.361666666598,1058.7016666665982,1063.9096666665969,1068.4976666665966,1074.6976666665937,1078.7276666665916,1082.0343333332569,1085.6509999999219,1091.850999999919,1094.0209999999179,1094.3309999999178,1100.530999999915,1106.730999999912,1112.930999999909,1119.1309999999062,1120.7843333332387,1120.7843333332387,1120.7843333332387,1120.7843333332387,1120.7843333332387,1124.2976666665704,1130.4976666665675,1136.6976666665646,1142.8976666665617,1149.0976666665588,1155.2976666665559,1161.497666666553,1166.974333333217,1166.974333333217,1168.0076666665498,1174.2076666665469,1180.407666666544,1186.607666666541,1192.8076666665381,1198.2016666665365,1204.4016666665336,1210.6016666665307,1216.088666666529,1220.6456666665288,1226.690666666526,1232.8906666665232,1237.7473333331877,1237.7473333331877,1238.8839999998538,1243.9989999998527,1249.3309999998512,972.9866666666323,979.1866666666294,985.3866666666265,991.5866666666236]
- run.curseSince: 13978
- run.goldEarned: 494.565
- run.bossChests: 8
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 191
- run.shrinesUsed: 1
- run.grokBotHelps: 6
- run.botSwarms: 2
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2693
- counters.hits: 3629
- counters.gems: 2552
- counters.coins: 139
- counters.shots: 1728
- counters.hostileShots: 144
- counters.nearMisses: 8
- counters.hostileHits: 2
- shrineTotals.maxHp: 14.4
- Gold, spots and chests: gold held at the end 492, spent 0; spots charged and used: Crop Patch 2, Stray Dog 1, Spud Freezer 1, Tater Lantern 1; chests seen 8, opened 8.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:14 took Frozen Fries 64% over Seeker Sprouts 23%, Gravy Splash 13%; 0:25 took Sprouting Eyes 71% over Salt Line 23%, Masher Grip 6%; 0:35 took Frozen Fries 42% over Spud Dice 35%, Gravy Heart 23%; 0:51 took Tater Tot Pup 73% over Sprouting Eyes 23%, Bacon Bits 4%; 1:00 took Frozen Fries 61% over Broadside 24%, Starch Bolt 15%; 1:27 took Spud Decoy 53% over Gravy Heart 30%, Salt Shaker 17%; 1:40 took Thick Skin 57% over Mash Mallet 36%, Salt Shaker 7%; 1:44 took Hot Streak 63% over Big Bowl 23%, Chip Shuriken 14%; 1:55 took Peel Lash 61% over Seeker Sprouts 20%, Sour Cream 11%, Reroll 8%; 2:08 took Thick Skin 41% over Big Bowl 28%, Reroll 16%, Seeker Sprouts 15%; 2:17 took Frozen Fries 54% over Thick Skin 30%, Reroll 13%, Peel Lash 3%; 2:43 took Sour Cream 36% over Seeker Sprouts 27%, Reroll 19%, Peel Lash 18%; 3:05 took Thick Skin 42% over Tater Tot Pup 29%, Reroll 15%, Hearty Helping 14%; 3:16 took Sour Cream 62% over Butter Pat 21%, Reroll 9%, Fertilizer 8%; 3:23 took Hot Streak 73% over Spud Decoy 11%, Tater Tot Pup 10%, Leave 6%; 3:32 took Max HP 63% over XP gain 31%, Gold gain 6%; 3:34 took Peel Lash 58% over Fertilizer 22%, Reroll 16%, Golden Fry 4%; 3:43 took Seeker Sprouts 61% over Mash Finisher 26%, Reroll 7%, Fertilizer 6%; 3:53 took Thick Skin 59% over Reroll 19%, Fertilizer 12%, Sprouting Eyes 8%, Skip 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Frozen Fries 2/8, Tater Tot Pup 1/8, Sprouting Eyes 1/5 | 1:59 level 10, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Frozen Fries 4/8, Tater Tot Pup 1/8, Spud Decoy 1/8, Hot Streak 1/8, Peel Lash 1/8, Sprouting Eyes 1/5, Thick Skin 1/5 | 2:59 level 13, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Permafrost Fries 1/1, Tater Tot Pup 1/8, Spud Decoy 1/8, Hot Streak 1/8, Peel Lash 1/8, Sprouting Eyes 1/5, Thick Skin 2/5, Sour Cream 1/5 | 3:56 level 18, maxHp 137.28, armor 0, damageMult 1, recovery 0, Seeker Sprouts 7/8, Permafrost Fries 1/1, Tater Tot Pup 1/8, Spud Decoy 1/8, Hot Streak 2/8, Peel Lash 2/8, Sprouting Eyes 1/5, Thick Skin 4/5, Sour Cream 2/5.
- Passive levels first reached: Sprouting Eyes 1 at 0:25; Thick Skin 1 at 1:40, 3 at 3:05; Sour Cream 1 at 2:43.

### L5.I9.G10: boss knobs s40

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 40; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: died after 191.1s (game clock 03:11); damage taken 191 (enemy:crumb-ant 14.071, Hot oil 9.167, enemy:oil-drip 1.6, enemy:snow-mold 86.386); 1150 kills; level 1 to 12; planner asked 69 times, action model 499; the models saw the game 29 ms late (p90 57); ended with seeker-sprouts 1, seed-potato 1, sprout-squad 1, mash-mortar 5, harvest-moon 1, spud-cannon 1, packed-pan 1, butter-pat 2, big-bowl 1, thick-skin 1.
- run.timeSec: 191.117
- run.level: 11
- run.kills: 1150
- run.damageBySource: seeker-sprouts 4387.309, seed-potato 2533.086, sprout-squad 2894.859, mash-mortar 10177.223, harvest-moon 4134.412, grok-bot 215.506, spud-cannon 1589.375
- run.damageTakenBySource: enemy:crumb-ant 14.071, Hot oil 9.167, enemy:oil-drip 1.6, enemy:snow-mold 86.386, enemy:frost-flea 6.171, enemy:sprout-mite 6.553, enemy:compost-maggot 3.145, Spore vent 3.867, boss:amusing 13.305, enemy:aphid 3.635, enemy:sand-crab 17.763, enemy:beetle-brood 9.155, enemy:fry-fly 6.484, boss:beetle-queen 5.44, enemy:potato-beetle 3.891
- run.killsBySource: seeker-sprouts 230, seed-potato 110, mash-mortar 471, sprout-squad 73, harvest-moon 180, grok-bot 12, spud-cannon 74
- run.biomes: ["fry-oil-desert","chip-canyons","frozen-tundra","compost-caves"]
- run.distance: 10133.663
- run.dodgePoints: 1142.02
- run.dodgeSecond: 191
- run.dodgeTaken: [144.36083370775057,144.36083370775057,156.74182997741167,156.74182997741167,160.59607784643111,162.55587029743631,162.55587029743631,175.06697034197614,186.15485375369718,123.40916580433709,123.40916580433709,123.40916580433709,123.40916580433709,123.40916580433709,123.40916580433709,125.1242868800371,138.42935354670377,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,140.13120269807337,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057,144.36083370775057]
- run.dodgeSteps: [965.3729999999056,971.1596666665695,977.3596666665666,983.5596666665637,989.7596666665607,999.8296666665589,1003.0329999998906,1006.442999999889,1012.6429999998861,734.5819999999728,741.9319999999741,748.9919999999713,755.19199999997,761.3919999999696,764.6986666666347,768.4186666666362,776.8353333333034,781.4853333333037,782.9319999999698,787.2719999999678,787.2719999999678,789.8553333332999,799.8013333333,805.6603333332978,809.793666666631,812.0256666666306,816.3656666666308,820.2096666666291,820.8296666666289,820.8296666666289,820.8296666666289,828.3163333332948,830.6929999999604,830.6929999999604,835.7563333332913,841.9563333332884,850.3729999999539,854.5063333332853,857.9163333332838,864.1163333332809,868.8696666666119,873.4163333332765,881.832999999942,888.0329999999391,892.3729999999371,896.6096666666017,902.8096666665988,907.25299999993,913.4529999999271,918.6196666665913,924.1996666665888,930.3996666665859,934.5329999999173,938.7696666665819,941.5596666665806,944.0396666665795,945.3829999999122,949.8263333332434,953.2363333332418,953.2363333332418,960.5163333332412]
- run.curseSince: 8984
- run.killer: "enemy:sand-crab"
- run.goldEarned: 156.238
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 4
- run.peakEnemies: 139
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 1150
- counters.hits: 2072
- counters.gems: 759
- counters.coins: 37
- counters.shots: 455
- counters.hostileShots: 136
- counters.nearMisses: 12
- counters.hostileHits: 1
- Gold, spots and chests: gold held at the end 155, spent 0; spots charged and used: Spud Freezer 1, Tater Lantern 1, Beetle Nest 1; chests seen 5, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Seed Potato 58% over Lean Lunch 26%, Seeker Sprouts 16%; 0:14 took Sprout Squad 51% over Seeker Sprouts 36%, Hash Boomerang 13%; 0:28 took Mash Mortar 50% over Julienne Dash 28%, Seed Potato 22%; 0:42 took Packed Pan 42% over Tot Toss 41%, Seeker Sprouts 17%; 0:46 took Harvest Moon 40% over Broadside 36%, Packed Pan 24%; 1:08 took Mash Mortar 52% over Harvest Moon 25%, Seeker Sprouts 12%, Leave 11%; 1:16 took Butter Pat 75% over Sprout Squad 11%, Reroll 8%, Four-Eyed Spud 6%; 1:24 took Butter Pat 63% over Harvest Moon 22%, Reroll 9%, Seeker Sprouts 5%, Skip 1%; 1:39 took Mash Mortar 36% over Starch Puddle 33%, Big Bowl 19%, Reroll 10%, Skip 2%; 2:15 took Big Bowl 50% over Sprout Squad 23%, Reroll 15%, Slow Cooker 9%, Skip 3%; 2:16 took Spud Cannon 37% over Deep Fryer 22%, Reroll 22%, Seeker Sprouts 15%, Skip 4%; 2:29 took Thick Skin 55% over Butter Pat 26%, Sprout Squad 12%, Reroll 6%, Skip 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Seed Potato 1/8, Sprout Squad 1/8, Mash Mortar 1/8, Harvest Moon 1/8, Packed Pan 1/5 | 1:59 level 9, maxHp 120, armor 0, damageMult 1.44, recovery 0, Seeker Sprouts 1/8, Seed Potato 1/8, Sprout Squad 1/8, Mash Mortar 5/8, Harvest Moon 1/8, Packed Pan 1/5, Butter Pat 2/5 | 2:59 level 12, maxHp 120, armor 0, damageMult 1.44, recovery 0, Seeker Sprouts 1/8, Seed Potato 1/8, Sprout Squad 1/8, Mash Mortar 5/8, Harvest Moon 1/8, Spud Cannon 1/8, Packed Pan 1/5, Butter Pat 2/5, Big Bowl 1/5, Thick Skin 1/5 | 3:11 level 12, maxHp 120, armor 0, damageMult 1.44, recovery 0, Seeker Sprouts 1/8, Seed Potato 1/8, Sprout Squad 1/8, Mash Mortar 5/8, Harvest Moon 1/8, Spud Cannon 1/8, Packed Pan 1/5, Butter Pat 2/5, Big Bowl 1/5, Thick Skin 1/5.
- Passive levels first reached: Packed Pan 1 at 0:42; Butter Pat 1 at 1:16; Big Bowl 1 at 2:15; Thick Skin 1 at 2:29.
