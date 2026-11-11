# Does a longer distrust window and forecast cut opening damage further than 10 s and 1 s?

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | refuted |
| Created | L3.I9 |
| Updated | L3.I10 |

## Hypothesis

distrustSeconds 10 with forecastSeconds 1 confirmed that asking the action model after a free-looking hit and looking further ahead cuts opening damage. Pushing both further (distrustSeconds 20, forecastSeconds 1.5) catches more of the Fry Fly and Potato Beetle elite hits and the 2:00 amusing boss, raising 5:00 survival above the playbook's 3 of 5 on the same seeds.

## Method

Seeker-sprouts from 0:00, 300 s, playbook with distrustSeconds 20 and forecastSeconds 1.5, on s31-35. Compare with the playbook games on the same seeds (5:00, 5:00, 3:05, 5:00, 2:39). Read amusing and elite damage, health lost in minutes 0-3, model-asked moves and mean model delay, chests by 2:00 and 5:00 survival. A playbook change needs at least 4 of 5 lived and at least 4 of 5 paired wins; otherwise the full run plays the unchanged playbook.

## Findings

Seeker-sprouts with distrustSeconds 20 and forecastSeconds 1.5 on s31-35 lived 2 of 5 (s33, s35) against 3 of 5 for the playbook (distrustSeconds 10, forecastSeconds 1). Paired record: 2 wins (s33, s35) and 3 losses (s31, s32, s34), short of the 4 of 5 lived and 4 of 5 paired wins required. Deaths were at 3:12, 4:35 and 4:11, with 1-2 chests opened. The playbook keeps 10 and 1.

## Games

### L3.I9.G1: caution 20/1.5 s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 300s; plays the playbook with distrustSeconds 20, forecastSeconds 1.5.
- Outcome: died after 192.7s (game clock 03:12); damage taken 124 (enemy:sprout-mite 5.715, enemy:fry-fly 8.52, enemy:crumb-ant 3.767, enemy:tomato-leech 2.592); 620 kills; level 1 to 8; planner asked 63 times, action model 599; the models saw the game 31 ms late (p90 51); ended with seeker-sprouts 1, mash-landing 1, mash-snowball 2, big-bowl 4, gpu 1.
- run.timeSec: 192.683
- run.level: 7
- run.kills: 620
- run.damageBySource: seeker-sprouts 4117.201, mash-snowball 11899.73, mash-landing 360.887, alex 824.103, grok-bot 111.911
- run.damageTakenBySource: enemy:sprout-mite 5.715, enemy:fry-fly 8.52, enemy:crumb-ant 3.767, enemy:tomato-leech 2.592, enemy:ketchup-drop 3.914, enemy:aphid 6.105, enemy:potato-beetle 24.388, boss:amusing 12.196, enemy:wireworm-larva 5.256, enemy:compost-maggot 3.413, enemy:sand-crab 3.623, enemy:garden-slug 3.771, enemy:bog-slime 2.135, boss:beetle-queen 29.918, enemy:beetle-brood 4.578, enemy:cave-grub 3.951
- run.killsBySource: seeker-sprouts 151, mash-snowball 418, mash-landing 7, alex 38, grok-bot 6
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","peel-forest","compost-caves"]
- run.distance: 11321.727
- run.dodgePoints: 1478.454
- run.dodgeSecond: 192
- run.dodgeTaken: [83.45017607680734,101.58250941014067,113.36852607680734,117.94605171120386,117.94605171120386,117.94605171120386,119.8927169449421,119.8927169449421,119.8927169449421,119.8927169449421,49.71643015151014,53.04269681817681,56.368963484843476,61.62526660912214,63.31813368186325,63.31813368186325,63.31813368186325,74.5596831094378,80.12390941014067,80.12390941014067,80.12390941014067,80.12390941014067,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734,83.45017607680734]
- run.dodgeSteps: [1075.3959999999568,1081.5959999999538,1091.665999999952,1097.865999999949,1104.0659999999461,1110.2659999999432,1116.4659999999403,1122.6659999999374,1127.3159999999352,1131.3459999999334,778.0380000000647,784.2380000000618,790.4380000000596,796.6380000000605,802.838000000061,809.0380000000636,815.2380000000661,821.4380000000667,831.5080000000647,837.7080000000618,843.9080000000589,848.1446666667237,854.3446666667207,864.4146666667187,870.6146666667158,876.8146666667129,881.4801666667096,887.6801666667067,894.4435000000396,898.8868333333709,905.086833333368,910.1501666666989,915.626833333363,925.464333333361,931.6643333333581,936.1076666666893,942.3076666666864,944.8910000000185,952.3776666666845,956.8210000000157,961.3676666666803,965.2943333333451,971.4943333333422,976.14433333334,979.037666666672,985.237666666669,991.4376666666661,997.6376666666632,1003.8376666666603,1010.0376666666574,1016.2376666666545,1021.0891666666512,1024.4991666666474,1030.6526666666446,1036.8526666666417,1043.0526666666387,1045.8426666666373,1052.0426666666344,1058.2426666666315,1064.4426666666286,1070.2293333332925]
- run.curseSince: 8306
- run.killer: "enemy:cave-grub"
- run.goldEarned: 83.19
- run.bossChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 4
- run.peakEnemies: 165
- run.grokBotHelps: 3
- run.lootRunnersMet: [1]
- counters.kills: 620
- counters.hits: 976
- counters.gems: 180
- counters.coins: 18
- counters.shots: 421
- counters.hostileShots: 194
- counters.nearMisses: 12
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 83, spent 0; spots charged and used: Crop Patch 1, Spud Freezer 1; chests seen 5, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Big Bowl 44% over Gravy Boat 43%, Mezzaluna 13%; 0:27 took Mash Landing 54% over Spud Cannon 31%, Stuffed Skin 15%; 0:36 took Big Bowl 52% over Root Spikes 31%, Seeker Sprouts 17%; 0:59 took Mash Snowball 54% over Hot Start 24%, Starch Plating 22%; 1:09 took Big Bowl 67% over Deep Fryer 17%, Tot Stampede 16%; 1:20 took Big Bowl 52% over Frying Pan 24%, Skipping Cannonball 16%, Reroll 8%; 2:18 took GPU 38% over Spud Fence 32%, Seeker Sprouts 20%, Reroll 10%.

### L3.I9.G2: caution 20/1.5 s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 300s; plays the playbook with distrustSeconds 20, forecastSeconds 1.5.
- Outcome: died after 275.8s (game clock 04:35); damage taken 290 (enemy:aphid 6.518, enemy:frost-flea 14.555, enemy:snow-mold 42.078, enemy:sprout-mite 4.483); 1237 kills; level 1 to 14; planner asked 96 times, action model 693; the models saw the game 31 ms late (p90 51); ended with seeker-sprouts 2, sprout-satellites 1, potato-battery 5, afterburner-fries 1, mezzaluna 1, mash-mallet 1, peel-out 2, root-network 2.
- run.timeSec: 275.833
- run.level: 13
- run.kills: 1237
- run.damageBySource: seeker-sprouts 5714.052, sprout-satellites 4340.553, potato-battery 13901.602, grok-bot 147.511, mezzaluna 3881.479, mash-mallet 7492.226, afterburner-fries 739.076
- run.damageTakenBySource: enemy:aphid 6.518, enemy:frost-flea 14.555, enemy:snow-mold 42.078, enemy:sprout-mite 4.483, enemy:potato-beetle 8.157, enemy:swarm-fly 4.495, boss:amusing 30.491, Brambles 3.324, enemy:bog-slime 6.128, enemy:crumb-ant 2.971, boss:beetle-queen 19.397, enemy:garden-slug 23.625, enemy:cave-grub 32.28, enemy:tomato-leech 13.6, enemy:ketchup-drop 6.867, boss:the-masher 52.143, Hot oil 9.861, enemy:beetle-brood 8.559
- run.killsBySource: seeker-sprouts 229, sprout-satellites 137, potato-battery 447, grok-bot 10, mezzaluna 135, mash-mallet 272, afterburner-fries 7
- run.biomes: ["frozen-tundra","peel-forest","mash-swamp","chip-canyons","ketchup-bog","compost-caves","coin-laundromat","fry-oil-desert"]
- run.distance: 15429.45
- run.dodgePoints: 1603.149
- run.dodgeSecond: 275
- run.dodgeTaken: [224.9846212273158,224.9846212273158,224.9846212273158,224.9846212273158,224.9846212273158,224.9846212273158,229.15128789398247,234.84573233842693,244.8731950249941,250.8896726369344,250.8896726369344,250.8896726369344,250.8896726369344,250.8896726369344,260.91713532350155,260.91713532350155,260.91713532350155,270.9445980100687,270.9445980100687,270.9445980100687,270.9445980100687,270.9445980100687,280.9720606966359,280.9720606966359,280.9720606966359,280.9720606966359,280.9720606966359,280.9720606966359,280.9720606966359,280.9720606966359,280.9720606966359,280.9720606966359,170.70777029434748,184.40448912171286,194.4665430054198,201.33353747159742,201.33353747159742,207.77123079187402,211.78425163153045,211.78425163153045,211.78425163153045,214.1187986541352,214.1187986541352,216.54347113475535,216.54347113475535,216.54347113475535,216.54347113475535,216.54347113475535,216.54347113475535,218.9681436153755,218.9681436153755,218.9681436153755,218.9681436153755,218.9681436153755,218.9681436153755,218.9681436153755,218.9681436153755,218.9681436153755,218.9681436153755,218.9681436153755,224.9846212273158]
- run.dodgeSteps: [1341.986666666451,1348.186666666448,1354.386666666445,1364.4566666664432,1370.6566666664403,1376.8566666664374,1381.2999999997687,1387.4999999997658,1391.1166666664308,1396.4899999997615,1402.6899999997586,1412.7599999997567,1418.9599999997538,1425.1599999997509,1431.359999999748,1437.559999999745,1446.7309999997447,1451.3809999997443,1455.7209999997444,1461.579999999742,1471.58799999974,1475.9279999997402,1480.2679999997404,1484.6079999997405,1490.7149999997378,1500.7849999997359,1506.984999999733,1513.18499999973,1519.3849999997271,1525.5849999997242,1531.7849999997213,1537.9849999997184,1144.7999999998628,1150.99999999986,1161.069999999858,1167.2699999998551,1172.5399999998526,1177.7066666665169,1183.906666666514,1190.106666666511,1200.1766666665092,1206.3766666665063,1212.5766666665033,1218.7766666665004,1224.9766666664975,1231.1766666664946,1237.3766666664917,1243.5766666664888,1253.646666666487,1259.846666666484,1266.046666666481,1272.2466666664782,1278.4466666664753,1284.6466666664724,1294.7166666664702,1300.9166666664673,1307.1166666664644,1313.3166666664615,1319.5166666664586,1328.2966666664565,1335.7866666664538]
- run.curseSince: 14611
- run.killer: "enemy:beetle-brood"
- run.goldEarned: 197.573
- run.bossChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 4
- run.peakEnemies: 183
- run.shrinesUsed: 4
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 1237
- counters.hits: 2657
- counters.crits: 118
- counters.gems: 1044
- counters.coins: 68
- counters.shots: 989
- counters.hostileShots: 663
- counters.nearMisses: 28
- counters.hostileHits: 12
- shrineTotals.maxHp: 16.8
- shrineTotals.armor: 14
- shrineTotals.luck: 0.072
- shrineTotals.critChance: 0.048
- Gold, spots and chests: gold held at the end 197, spent 0; spots charged and used: Tater Lantern 1, Spud Freezer 1; chests seen 5, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Peel Out 81% over Slow Cooker 14%, Masher Grip 5%; 0:13 took Sprout Satellites 49% over Small Fry 30%, Mash Finisher 21%; 0:39 took Potato Battery 76% over Peel Out 21%, Potato Magnet 3%; 0:47 took Crit 71% over Pickup range 21%, Duration 8%; 0:54 took Luck 67% over XP gain 19%, Move speed 14%; 1:02 took Max HP 89% over Crit 6%, Move speed 5%; 1:03 took Root Network 41% over Peel Out 30%, Salt Line 29%; 1:12 took Armor 96% over Pickup range 3%, Crit 1%; 1:21 took Afterburner Fries 39% over Seeker Sprouts 34%, Gravy Heart 27%; 1:37 took Mezzaluna 52% over Root Network 38%, Sprout Satellites 10%; 1:41 took Mash Mallet 61% over Mezzaluna 20%, Reroll 10%, Sour Cream 9%; 1:52 took Potato Battery 59% over Starch Plating 19%, Reroll 12%, Thick Skin 10%; 2:10 took Peel Out 58% over Sprout Satellites 15%, Reroll 15%, Slow Cooker 12%; 3:29 took Seeker Sprouts 32% over Mezzaluna 27%, Clean Plate 22%, Reroll 19%; 3:31 took Potato Battery 67% over Mezzaluna 16%, Reroll 12%, Afterburner Fries 5%; 3:35 took Potato Battery 41% over Root Network 28%, Peel Out 22%, Reroll 9%; 4:03 took Root Network 61% over Gravy Splash 17%, Big Bowl 13%, Reroll 9%.

### L3.I9.G3: caution 20/1.5 s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 300s; plays the playbook with distrustSeconds 20, forecastSeconds 1.5.
- Outcome: alive after 300.6s (game clock 05:00), health 9/120; damage taken 322 (Hot oil 11.968, enemy:fry-fly 23.284, enemy:lint-bunny 20.063, enemy:sock-pile 20.214); 2158 kills; level 1 to 16; planner asked 104 times, action model 976; the models saw the game 31 ms late (p90 50); ended with seeker-sprouts 1, rosti-disc 1, julienne-dash 8, potato-battery 2, starch-puddle 1, fry-knives 1, starch-plating 2, butter-socks 1, gravy-splash 1, butter-pat 1.
- run.timeSec: 300.583
- run.level: 15
- run.kills: 2158
- run.damageBySource: seeker-sprouts 5625.731, rosti-disc 8871.806, julienne-dash 16601.383, potato-battery 10949.292, starch-puddle 21056.869, grok-bot 693.196, fry-knives 3166.429, gravy-splash 1138.149
- run.damageTakenBySource: Hot oil 11.968, enemy:fry-fly 23.284, enemy:lint-bunny 20.063, enemy:sock-pile 20.214, enemy:garden-slug 9.175, enemy:sprout-mite 0.898, enemy:ketchup-drop 13.775, boss:amusing 9.702, enemy:bog-slime 6.468, enemy:oil-drip 16.283, enemy:crumb-ant 13.05, boss:beetle-queen 27.649, enemy:tomato-leech 29.71, enemy:beetle-brood 20.153, enemy:sand-crab 12.657, enemy:frost-flea 2.375, enemy:cave-grub 4.392, enemy:snow-mold 22.899, boss:the-masher 49.124, enemy:bowling-ball 2.87, enemy:wireworm-larva 2.527, Spore vent 2.882
- run.killsBySource: seeker-sprouts 219, rosti-disc 135, julienne-dash 599, potato-battery 417, starch-puddle 673, grok-bot 35, fry-knives 35, gravy-splash 45
- run.biomes: ["fry-oil-desert","coin-laundromat","peel-forest","mash-swamp","ketchup-bog","chip-canyons","frozen-tundra","compost-caves"]
- run.dogs: [{"id":"pomchi","at":224.58333333333334}]
- run.dogHelp: finds.pomchi 2
- run.distance: 16066.117
- run.dodgePoints: 1730.557
- run.dodgeSecond: 300
- run.dodgeTaken: [190.3917156869605,190.3917156869605,192.88072662119737,192.88072662119737,207.53512724614978,209.074705317026,213.12682791897487,213.12682791897487,213.12682791897487,213.12682791897487,217.46127953187812,221.56913387000412,231.70828734273135,246.7229879605654,248.29159457862096,248.29159457862096,248.29159457862096,261.1865826267201,262.9146641184328,262.9146641184328,262.9146641184328,262.9146641184328,262.9146641184328,262.9146641184328,262.9146641184328,262.9146641184328,264.5280547424403,264.5280547424403,266.15856858964366,266.15856858964366,266.15856858964366,266.15856858964366,269.0282784614617,269.0282784614617,269.0282784614617,269.0282784614617,269.0282784614617,269.0282784614617,269.0282784614617,269.0282784614617,269.0282784614617,270.7563599531744,270.7563599531744,270.7563599531744,270.7563599531744,270.7563599531744,273.06397281300383,298.09736143769584,298.09736143769584,302.26884958353213,309.49293560503753,313.94059066140744,313.94059066140744,316.961070522507,322.1175354416354,322.1175354416354,322.1175354416354,168.31229879249278,172.68885911723675,181.43954817374242,181.43954817374242]
- run.dodgeSteps: [1298.5073333331297,1304.1906666664604,1310.3906666664575,1316.5906666664546,1322.1706666664518,1326.4073333331166,1332.6073333331137,1338.8073333331108,1345.007333333108,1351.207333333105,1354.20399999977,1358.7506666664347,1364.9506666664317,1369.6006666664296,1375.3873333330935,1381.5873333330906,1387.7873333330876,1392.540666666419,1398.740666666416,1404.940666666413,1411.1406666664102,1417.3406666664073,1423.5406666664044,1429.7406666664015,1435.9406666663986,1441.7273333330625,1446.5839999997268,1452.7839999997238,1458.983999999721,1465.183999999718,1471.3839999997151,1477.5839999997122,1483.7839999997093,1489.9839999997064,1496.1839999997035,1502.3839999997006,1505.5873333330323,1505.5873333330323,1505.5873333330323,1509.77233333303,1515.972333333027,1522.1723333330242,1524.3423333330234,1524.3423333330234,1524.8589999996898,1531.0589999996869,1537.258999999684,1543.458999999681,1545.2156666663468,1551.2089999996774,1557.4089999996745,1567.4789999996724,1576.618999999672,1581.2999999996716,1587.4999999996687,1596.4889999996678,1602.9949999996652,1274.9473333331407,1281.1473333331378,1287.3473333331349,1293.547333333132]
- run.curseSince: 17397
- run.goldEarned: 280.97
- run.goldSpent: 30
- run.bossChests: 3
- run.paidChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 4
- run.peakEnemies: 193
- run.shrinesUsed: 3
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 2158
- counters.hits: 6477
- counters.gems: 1453
- counters.coins: 100
- counters.shots: 1914
- counters.hostileShots: 721
- counters.nearMisses: 29
- counters.hostileHits: 12
- shrineTotals.area: 0.06
- shrineTotals.armor: 26
- Gold, spots and chests: gold held at the end 250, spent 30 (Potato Crate 30); spots charged and used: Tater Lantern 2, Crop Patch 1, Potato Crate 1, Root Tunnel 1; chests seen 5, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Rösti Disc 86% over Big Bowl 11%, Hearty Helping 3%; 0:18 took Julienne Dash 58% over Sprouting Eyes 34%, Mezzaluna 8%; 0:30 took Julienne Dash 49% over Potato Rain 27%, Butter Streak 24%; 0:32 took Potato Battery 75% over Rösti Disc 20%, Hash Boomerang 5%; 0:39 took Starch Plating 71% over Seeker Sprouts 26%, Skip 2%, Golden Fry 1%; 0:58 took Area 58% over Luck 36%, Move speed 6%; 1:06 took Armor 94% over Area 5%, Crit 1%; 1:14 took Starch Puddle 69% over Chives 23%, Masher Grip 6%, Skip 2%; 1:25 took Butter Socks 51% over Gem Sling 29%, Reroll 10%, Aged Russet 8%, Skip 2%; 1:39 took Armor 89% over Move speed 9%, Luck 2%; 1:40 took Starch Plating 41% over Butter Socks 37%, Reroll 13%, Seeker Sprouts 7%, Skip 2%; 2:10 took Fry Knives 36% over Butter Socks 36%, Potato Battery 13%, Reroll 12%, Skip 3%; 2:40 took Gravy Splash 40% over Seeker Sprouts 24%, Reroll 22%, Fry Knives 11%, Skip 3%; 3:21 took Julienne Dash 76% over Chives 14%, Reroll 8%, Fry Knives 1%, Skip 1%; 3:23 took Potato Battery 35% over Rösti Disc 34%, Reroll 21%, Spud Sneakers 7%, Skip 3%; 3:25 took Julienne Dash 82% over Reroll 10%, Gravy Splash 6%, Fry Knives 1%, Skip 1%; 4:01 took Julienne Dash 87% over Reroll 6%, Butter Pat 3%, Bacon Bits 3%, Skip 1%; 4:50 took Butter Pat 31% over Starch Puddle 24%, Rösti Disc 22%, Reroll 19%, Skip 4%.

### L3.I9.G4: caution 20/1.5 s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 300s; plays the playbook with distrustSeconds 20, forecastSeconds 1.5.
- Outcome: died after 251.4s (game clock 04:11); damage taken 224 (Hot oil 7.533, enemy:crumb-ant 10.365, enemy:fry-fly 13.198, enemy:oil-drip 8.25); 1224 kills; level 1 to 14; planner asked 87 times, action model 746; the models saw the game 31 ms late (p90 52); ended with seeker-sprouts 5, mash-mallet 1, broadside 1, afterburner-fries 2, tailgate-fries 1, hash-hawk 6, fertilizer 1, bacon-bits 1.
- run.timeSec: 251.383
- run.level: 13
- run.kills: 1224
- run.damageBySource: seeker-sprouts 9333.772, mash-mallet 5019.57, broadside 5383.082, tailgate-fries 5058.21, hash-hawk 11431.543, grok-bot 160.989, afterburner-fries 717.381
- run.damageTakenBySource: Hot oil 7.533, enemy:crumb-ant 10.365, enemy:fry-fly 13.198, enemy:oil-drip 8.25, enemy:swarm-fly 2.772, boss:amusing 58.764, enemy:little-grey 3.229, enemy:aphid 13.304, enemy:compost-maggot 3.823, boss:beetle-queen 8.16, enemy:cave-grub 17.91, enemy:potato-beetle 23.493, enemy:sprout-mite 3.899, enemy:beetle-brood 9.29, enemy:snow-mold 12.118, enemy:sand-crab 10.4, boss:the-masher 17.916
- run.killsBySource: seeker-sprouts 457, mash-mallet 214, broadside 193, tailgate-fries 96, hash-hawk 241, grok-bot 14, afterburner-fries 9
- run.biomes: ["ketchup-bog","fry-oil-desert","crop-circle","compost-caves","frozen-tundra","chip-canyons","peel-forest"]
- run.distance: 14999.727
- run.dodgePoints: 1493.564
- run.dodgeSecond: 251
- run.dodgeTaken: [206.50603809926946,206.50603809926946,206.50603809926946,206.50603809926946,217.7033714326028,217.7033714326028,217.7033714326028,217.7033714326028,141.16828994425813,173.89806323217286,177.82293970606145,177.82293970606145,177.82293970606145,177.82293970606145,181.81622801313438,185.78837703813437,189.79751028196577,189.79751028196577,189.79751028196577,189.79751028196577,189.79751028196577,189.79751028196577,189.79751028196577,189.79751028196577,189.79751028196577,189.79751028196577,189.79751028196577,189.79751028196577,189.79751028196577,189.79751028196577,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,193.9346996647299,196.10638914702002,196.10638914702002,196.10638914702002,196.10638914702002,196.10638914702002,196.10638914702002,196.10638914702002,196.10638914702002,196.10638914702002,196.10638914702002,201.3026461096363]
- run.dodgeSteps: [1449.8959999996355,1456.5259999996326,1462.7259999996297,1468.9259999996268,1475.125999999624,1485.195999999622,1491.395999999619,1497.5959999996162,1117.7566666664325,1123.9566666664296,1130.1566666664266,1136.3566666664237,1142.5566666664208,1152.03766666642,1156.37766666642,1162.112666666418,1168.312666666415,1178.3826666664131,1183.2393333330774,1189.4393333330745,1191.6093333330734,1197.4993333330708,1205.1926666664033,1211.3926666664004,1217.5926666663975,1223.7926666663946,1229.9926666663916,1236.1926666663887,1242.3926666663858,1248.592666666383,1254.79266666638,1264.8626666663781,1269.6159999997092,1272.3026666663745,1278.5026666663716,1283.2559999997027,1289.4559999996998,1298.492666666365,1304.3826666663622,1310.5826666663593,1316.7826666663564,1326.8526666663545,1333.0526666663516,1337.2893333330162,1341.6293333330143,1347.8293333330114,1354.0293333330085,1360.2293333330056,1366.4293333330027,1372.6293333329997,1378.8293333329968,1385.029333332994,1391.229333332991,1397.429333332988,1402.1826666663192,1407.969333332983,1414.1693333329802,1424.2393333329783,1427.8559999996432,1434.0559999996403,1440.2559999996374]
- run.curseSince: 14552
- run.killer: "boss:the-masher"
- run.goldEarned: 278.708
- run.bossChests: 2
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 176
- run.grokBotHelps: 4
- run.botSwarms: 1
- run.lootRunnersMet: [1,1]
- counters.kills: 1224
- counters.hits: 2182
- counters.gems: 867
- counters.coins: 60
- counters.shots: 1929
- counters.hostileShots: 164
- counters.nearMisses: 17
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 278, spent 0; spots charged and used: Crop Patch 2, Spud Freezer 2; chests seen 8, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Mash Mallet 72% over Seeker Sprouts 26%, Golden Fry 2%; 0:19 took Broadside 73% over Starch Plating 19%, Mash Mallet 8%; 0:23 took Afterburner Fries 49% over Clean Plate 26%, Peel Phantom 25%; 0:47 took Tailgate Fries 63% over Starch Plating 25%, Gravy Heart 12%; 1:21 took Hash Hawk 67% over Afterburner Fries 17%, Small Fry 16%; 1:31 took Hash Hawk 60% over Broadside 34%, Mash Mallet 6%; 2:04 took Hash Hawk 67% over Reroll 15%, Fertilizer 11%, Mash Mallet 7%; 2:09 took Hash Hawk 58% over Broadside 22%, Reroll 13%, Fertilizer 7%; 2:10 took Afterburner Fries 49% over Fertilizer 22%, Hearty Helping 15%, Reroll 14%; 3:10 took Hash Hawk 76% over Reroll 10%, Afterburner Fries 8%, Fertilizer 6%; 4:01 took Fertilizer 42% over Afterburner Fries 33%, Reroll 17%, Tailgate Fries 8%; 4:02 took Bacon Bits 42% over Chives 29%, Afterburner Fries 17%, Reroll 12%; 4:03 took Hash Hawk 60% over Spry Sprout 34%, Reroll 4%, Hearty Helping 2%.

### L3.I9.G5: caution 20/1.5 s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 300s; plays the playbook with distrustSeconds 20, forecastSeconds 1.5.
- Outcome: alive after 300.2s (game clock 05:00), health 149/149; damage taken 83 (Spore vent 9.867, enemy:cave-grub 8.94, Brambles 7.9, boss:amusing 41.024); 3187 kills; level 1 to 18; planner asked 121 times, action model 436; the models saw the game 33 ms late (p90 52); ended with seeker-sprouts 1, sack-of-russets 1, spud-cannon 1, tot-toss 1, hash-bulwark 1, tater-mines 7, butter-pat 3, gpu 1, root-network 1, starch-plating 2, fertilizer 1.
- run.timeSec: 300.167
- run.level: 17
- run.kills: 3187
- run.damageBySource: seeker-sprouts 8217.244, spud-lob 10836.999, spud-cannon 9788.708, tot-toss 5825.308, hash-brown-shield 13808.697, tater-mines 12045.468, grok-bot 2427.961, sack-of-russets 33861.77, hash-bulwark 8684.359
- run.damageTakenBySource: Spore vent 9.867, enemy:cave-grub 8.94, Brambles 7.9, boss:amusing 41.024, enemy:frost-flea 1.658, enemy:snow-mold 13.298
- run.killsBySource: seeker-sprouts 321, spud-lob 404, spud-cannon 367, tot-toss 140, hash-brown-shield 398, tater-mines 389, grok-bot 85, sack-of-russets 906, hash-bulwark 177
- run.evolutions: [{"id":"sack-of-russets","at":217.46666666666667},{"id":"hash-bulwark","at":271.3}]
- run.biomes: ["compost-caves","peel-forest","chip-canyons","mash-swamp","frozen-tundra"]
- run.distance: 15713.435
- run.dodgePoints: 2590.995
- run.dodgeSecond: 300
- run.dodgeTaken: [79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,82.68603594727804,79.82691236395033,79.82691236395033,79.82691236395033,79.82691236395033]
- run.dodgeSteps: [1279.8401666664445,1280.5634999997776,1286.7634999997747,1292.9634999997718,1299.1634999997689,1305.363499999766,1311.563499999763,1317.7634999997601,1323.9634999997572,1330.1634999997543,1336.3634999997514,1342.5634999997485,1348.7634999997456,1354.9634999997427,1361.1634999997398,1367.3634999997369,1373.563499999734,1379.763499999731,1385.9634999997281,1392.1634999997252,1398.3634999997223,1404.5634999997194,1410.7634999997165,1415.4134999997143,1421.6134999997114,1427.8134999997085,1434.0134999997056,1436.5968333330377,1436.5968333330377,1442.590166666368,1448.7901666663652,1454.9901666663623,1461.1901666663593,1467.3901666663564,1473.5901666663535,1479.7901666663506,1484.62616666635,1490.826166666347,1495.5794999996783,1501.7794999996754,1507.9794999996725,1514.1794999996696,1518.9328333330006,1518.9328333330006,1521.309499999666,1526.1454999996654,1531.353499999664,1537.5534999996612,1543.7534999996583,1549.9534999996554,1556.1534999996525,1560.700166666317,1560.700166666317,1565.3501666663149,1566.073499999648,1568.5534999996466,1570.3101666663126,1261.0334999997835,1265.0841666664485,1269.4241666664486,1274.880166666447]
- run.curseSince: 17224
- run.goldEarned: 716.495
- run.goldSpent: 102
- run.bossChests: 9
- run.paidChests: 2
- run.bossesKilled: 3
- run.elitesKilled: 6
- run.peakEnemies: 179
- run.shrinesUsed: 3
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.throttles: 19
- run.lootRunnersMet: [1]
- counters.kills: 3187
- counters.hits: 3946
- counters.gems: 2624
- counters.coins: 151
- counters.shots: 2171
- counters.hostileShots: 155
- counters.nearMisses: 14
- counters.hostileHits: 3
- shrineTotals.might: 0.084
- shrineTotals.area: 0.084
- shrineTotals.maxHp: 24
- Gold, spots and chests: gold held at the end 614, spent 93 (Potato Crate 93); spots charged and used: Crop Patch 3, Spud Freezer 3, Potato Crate 2, Beetle Nest 1; chests seen 9, opened 9.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Spud Lob 41% over Peel Out 37%, Tailgate Fries 22%; 0:14 took Spud Cannon 63% over Seeker Sprouts 26%, Potato Magnet 11%; 0:43 took Tot Toss 49% over Seeker Sprouts 37%, Bacon Bits 14%; 1:00 took Area 48% over Pickup range 45%, XP gain 7%; 1:12 took Hash Brown Shield 82% over Mash Finisher 11%, Mash Mallet 7%; 1:20 took Spud Lob 65% over Seeker Sprouts 15%, Leave 15%, Tot Toss 5%; 1:24 took Tater Mines 71% over Spud Lob 25%, Spud Cannon 4%; 1:37 took Hash Brown Shield 60% over Butter Pat 34%, Spud Cannon 6%; 1:56 took Butter Pat 54% over Big Bowl 28%, Reroll 12%, Hot Sauce 6%; 2:11 took Butter Pat 89% over Reroll 5%, Hot Sauce 3%, Slow Cooker 3%; 2:16 took GPU 71% over Tot Toss 14%, Reroll 9%, Hot Sauce 6%; 2:18 took Hash Brown Shield 60% over Mash Finisher 22%, Reroll 12%, Salt Shaker 6%; 2:42 took Butter Pat 94% over Reroll 4%, Spud Cannon 2%, Tot Toss 0%; 3:16 took Root Network 49% over Reroll 23%, Tater Mines 15%, Seeker Sprouts 13%; 3:39 took Hash Brown Shield 48% over Starch Plating 42%, Reroll 8%, Tater Mines 2%; 3:40 took Starch Plating 66% over Root Network 17%, Seeker Sprouts 9%, Reroll 8%; 3:50 took Max HP 47% over XP gain 46%, Cooldown 7%; 3:58 took Reroll 33% over Hot Sauce 27%, Spud Cannon 26%, Seeker Sprouts 14%; 3:58 took Starch Plating 73% over Reroll 13%, Hot Sauce 7%, Bacon Bits 7%; 4:00 took Damage 85% over Armor 14%, Crit 1%; 4:09 took Hash Brown Shield 91% over Reroll 5%, Hot Sauce 3%, Tater Mines 1%; 4:45 took Fertilizer 39% over Seeker Sprouts 27%, Reroll 25%, Tot Toss 9%.
