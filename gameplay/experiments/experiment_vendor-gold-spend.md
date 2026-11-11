# Does a vendor-aware planner turn gold into chosen items at a Fry Cart?

| Field | Value |
| --- | --- |
| Status | done |
| Area | economy |
| Result | inconclusive |
| Created | L4.I3 |
| Updated | L4.I5 |

## Hypothesis

Paid Potato Crates give random junk (B36), but a Fry Cart sells chosen items for 80-640 gold. With gold in hand and spots and gold shown to the planner, a goal prompt that rates a Fry Cart within 400 units above exploring buys useful items early (armor, max HP) and cuts opening damage. Gold earned is only 30-400 by 4:00, so this is tested with 200 gold handed over.

## Method

L4.I4: no handed gold. A gold-aware planner (planner.state with {{spots}}, planner.goal rating a Fry Cart or Potato Crate high when earned gold covers the price, health is above 50% and no elite is near), seeker-sprouts with the playbook knobs, 240 s from 0:00 on s31-35, paired with the on-file playbook games. Read gold spent, items bought and when, chests opened, damage by 2:30 and survival to 4:00.

## Findings

L4.I4 earned-gold shop planner on s31-35 (no handed gold): alive at 4:00 on 4 of 5 (s35 died 3:30 with 0 chests), against 3 of 5 for the playbook. It took 133-253 damage in four games, opened 0-5 chests, bought 0-1 items per game and ran 13-22 evade goals. Gold earned by 4:00 is only 210-590, so a Fry Cart item (80+ gold) is rarely affordable early. Not worth adding to the playbook (B82, B83).

## Games

### L4.I3.G5: 200 gold, vendor goal s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35, build swapped for seeker-sprouts 1; 240s; plays the playbook with its own planner.state, its own planner.goal.
- Outcome: alive after 240s (game clock 04:00), health 159/159; damage taken 47 (enemy:aphid 2.595, Brambles 4.3, enemy:potato-beetle 17.879, Hot oil 5.333); 1614 kills; level 1 to 16; planner asked 91 times, action model 659; the models saw the game 35 ms late (p90 56); ended with seeker-sprouts 2, gravy-boat 1, tot-toss 1, tater-twister 1, tater-pup 4, tot-stampede 1, salt-shaker 4, aged-russet 1, gravy-heart 1.
- run.timeSec: 239.95
- run.level: 15
- run.kills: 1614
- run.damageBySource: seeker-sprouts 5131.222, gravy-boat 8867.833, tot-toss 2712.479, tater-pup 3642.738, tater-twirl 1545.728, tot-stampede 5633.741, grok-bot 21.74, tater-twister 17123.939, dog:saluki 537.749
- run.damageTakenBySource: enemy:aphid 2.595, Brambles 4.3, enemy:potato-beetle 17.879, Hot oil 5.333, boss:amusing 13.305, enemy:sand-crab 3.607
- run.killsBySource: seeker-sprouts 240, gravy-boat 290, tot-toss 101, tater-pup 102, tater-twirl 36, tot-stampede 257, grok-bot 1, tater-twister 574, dog:saluki 13
- run.evolutions: [{"id":"tater-twister","at":134.28333333333333}]
- run.biomes: ["chip-canyons","fry-oil-desert","ketchup-bog","mash-swamp","frozen-tundra"]
- run.dogs: [{"id":"newfoundland","at":18.066666666666666},{"id":"saluki","at":168.18333333333334}]
- run.dogHelp: damage.saluki 537.749, hits.saluki 24, blocked.newfoundland 2
- run.distance: 13119.927
- run.dodgePoints: 2140.98
- run.dodgeSecond: 239
- run.dodgeTaken: [47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041,47.01986940712041]
- run.dodgeSteps: [980.4626266665771,987.158626666577,991.734226666577,998.4302266665769,1005.1262266665768,1011.8222266665767,1018.5182266665767,1025.2142266665765,1031.9102266665764,1037.6018266665765,1037.6018266665765,1040.1686266665763,1046.8646266665762,1053.5606266665761,1060.256626666576,1066.952626666576,1073.6486266665759,1080.3446266665758,1087.0406266665757,1092.698746666574,1098.289906666572,1104.985906666572,1110.2757466665696,1114.9629466665663,1119.650146666563,1125.810466666562,1132.506466666562,1139.2024666665618,1142.4388666665618,1142.4388666665618,1146.4564666665617,1153.1524666665616,1158.2079466665589,1162.9621066665557,1168.9885066665545,1175.6845066665544,1182.3805066665543,1189.0765066665542,1195.638586666554,1201.0623466665518,1207.7583466665517,1214.4543466665516,1221.1503466665515,1227.8463466665514,1234.5423466665513,1241.2383466665513,1247.9343466665512,1252.6215466665512,1252.6215466665512,1258.7595466665512,1265.455546666551,1272.151546666551,1278.847546666551,1285.5435466665508,1292.2395466665507,1298.9355466665506,1305.6315466665505,953.6786266665774,960.3746266665773,967.0706266665773,973.7666266665772]
- run.curseSince: 14247
- run.goldEarned: 370.925
- run.goldSpent: 468
- run.bossChests: 3
- run.paidChests: 3
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 190
- run.shrinesUsed: 1
- run.itemsBought: 2
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 1614
- counters.hits: 3107
- counters.crits: 95
- counters.gems: 862
- counters.coins: 125
- counters.shots: 1387
- counters.hostileShots: 12
- counters.nearMisses: 2
- shrineTotals.might: 0.06
- Gold, spots and chests: gold held at the end 95, spent 468 (Fry Cart 323, Potato Crate 145); spots charged and used: Crop Patch 3, Potato Crate 2, Stray Dog 1, Spud Freezer 1, Dinner Bell 1, Tater Magnet 1; chests seen 6, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Gravy Boat 52% over Seeker Sprouts 38%, Gravy Splash 10%; 0:22 took Tot Toss 58% over Seeker Sprouts 34%, Spry Sprout 8%; 0:24 took Tater Twirl 46% over Gravy Boat 33%, Peel Lash 21%; 0:30 took Tater Tot Pup 51% over Gravy Boat 37%, Afterburner Fries 12%; 0:35 took Damage 80% over Gold gain 12%, Cooldown 8%; 0:47 took option 1 92% over Leave 8%, option 0 0%, option 2 0%; 0:54 took Tater Twirl 60% over Tater Tot Pup 17%, Leave 12%, Gravy Boat 11%; 1:13 took Tater Tot Pup 39% over Gravy Boat 32%, Reroll 21%, Tot Toss 8%; 1:18 took Salt Shaker 35% over Gravy Boat 31%, Slow Cooker 17%, Reroll 17%; 1:44 took Tot Stampede 77% over Mash Finisher 10%, Seeker Sprouts 7%, Reroll 5%, Skip 1%; 2:09 took Seeker Sprouts 31% over Tot Stampede 28%, Reroll 24%, Tot Toss 12%, Skip 5%; 2:38 took Salt Shaker 47% over Gravy Boat 22%, Reroll 16%, Tot Toss 13%, Skip 2%; 3:13 took option 0 33% over option 1 29%, Leave 23%, option 2 15%; 3:24 took Salt Shaker 41% over Gravy Boat 21%, Tot Stampede 19%, Reroll 17%, Skip 2%; 3:25 took Tater Tot Pup 42% over Spry Sprout 30%, Reroll 16%, Tot Toss 8%, Skip 4%; 3:52 took Salt Shaker 31% over Bacon Bits 28%, Seeker Sprouts 23%, Reroll 16%, Skip 2%; 3:52 took Aged Russet 44% over Seeker Sprouts 22%, Sprouting Eyes 14%, Butter Socks 12%, Reroll 6%, Skip 2%; 3:55 took Tater Tot Pup 42% over Thick Skin 31%, Reroll 15%, Gravy Boat 9%, Skip 3%; 3:57 took Gravy Heart 40% over Reroll 23%, Tot Stampede 21%, Tot Toss 12%, Skip 4%.

### L4.I4.G6: earned-gold shop planner s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with its own planner.state, its own planner.goal.
- Outcome: alive after 240.2s (game clock 04:00), health 105/204; damage taken 253 (enemy:wireworm-larva 13.108, enemy:potato-beetle 49.667, enemy:garden-slug 8.347, boss:amusing 6.653); 1174 kills; level 1 to 13; planner asked 81 times, action model 819; the models saw the game 30 ms late (p90 51); ended with seeker-sprouts 2, tater-twirl 1, reset-button 6, starch-chain 1, gravy-heart 4, four-eyed-spud 1, bacon-bits 1.
- run.timeSec: 240.167
- run.level: 12
- run.kills: 1174
- run.damageBySource: seeker-sprouts 5043.805, tater-twirl 19578.21, reset-button 8521.686, alex 6434.283, grok-bot 74.819, starch-chain 2016.197, coal-baked-spud 202.877
- run.damageTakenBySource: enemy:wireworm-larva 13.108, enemy:potato-beetle 49.667, enemy:garden-slug 8.347, boss:amusing 6.653, enemy:compost-maggot 3.643, enemy:crumb-ant 13.05, enemy:bowling-ball 14.651, Brambles 19.7, enemy:bowling-pin 7.377, boss:beetle-queen 37.171, enemy:aphid 8.187, enemy:sprout-mite 1.97, enemy:frost-flea 5.943, enemy:sand-crab 4.542, enemy:cave-grub 34.802, enemy:beetle-brood 24.529
- run.killsBySource: seeker-sprouts 194, tater-twirl 501, reset-button 229, alex 184, grok-bot 6, starch-chain 51, coal-baked-spud 9
- run.biomes: ["compost-caves","mash-swamp","ketchup-bog","peel-forest","chip-canyons","gutterball-lanes","frozen-tundra"]
- run.distance: 13826.105
- run.dodgePoints: 1617.281
- run.dodgeSecond: 240
- run.dodgeTaken: [106.62521236234787,112.04506236234789,112.1450623623479,112.1450623623479,114.06653374601665,114.06653374601665,114.06653374601665,114.06653374601665,116.03153898659998,118.00184301548265,119.98268174604294,123.94435920716352,123.94435920716352,126.66420920716352,126.66420920716352,126.66420920716352,126.66420920716352,126.66420920716352,126.66420920716352,126.66420920716352,126.66420920716352,126.66420920716352,139.24606663366737,145.46286663366737,145.46286663366737,145.46286663366737,145.46286663366737,145.46286663366737,147.5314613250494,151.6151629305425,151.6151629305425,170.69626012342746,201.00628760144582,210.845398182101,210.845398182101,210.845398182101,210.845398182101,219.19176625583805,225.5222057539305,225.5222057539305,228.24205575393046,232.4871541638051,232.4871541638051,232.4871541638051,232.4871541638051,232.4871541638051,232.4871541638051,232.4871541638051,232.4871541638051,235.2070041638051,235.2070041638051,235.2070041638051,235.2070041638051,235.2070041638051,253.33933749713844,253.33933749713844,253.33933749713844,253.33933749713844,106.62521236234787,106.62521236234787,106.62521236234787]
- run.dodgeSteps: [1046.6271666665612,1052.8271666665582,1059.0271666665553,1065.2271666665524,1071.4271666665495,1077.6271666665466,1083.8271666665437,1090.0271666665408,1096.2271666665379,1102.427166666535,1108.627166666532,1114.8271666665291,1121.0271666665262,1127.2271666665233,1133.4271666665204,1139.6271666665175,1145.8271666665146,1152.0271666665117,1158.2271666665088,1164.4271666665059,1170.627166666503,1176.8271666665,1183.0271666664971,1189.2271666664942,1195.4271666664913,1201.6271666664884,1207.8271666664855,1214.0271666664826,1220.2271666664797,1226.4271666664768,1229.0104999998089,1230.2504999998082,1235.1071666664725,1241.3071666664696,1247.5071666664667,1253.7071666664638,1259.9071666664609,1266.107166666458,1272.307166666455,1278.5071666664521,1284.7071666664492,1290.9071666664463,1297.1071666664434,1303.3071666664405,1313.3771666664386,1318.647166666436,1323.8138333331003,1328.6704999997648,1334.870499999762,1341.070499999759,1347.270499999756,1353.4704999997532,1354.9171666664192,1356.7771666664182,1362.9771666664153,1369.1771666664124,1375.3771666664095,1381.5771666664066,1028.0271666665699,1034.227166666567,1040.427166666564]
- run.curseSince: 14142
- run.goldEarned: 211.278
- run.goldSpent: 102
- run.bossChests: 3
- run.paidChests: 2
- run.bossesKilled: 2
- run.elitesKilled: 8
- run.peakEnemies: 179
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 1174
- counters.hits: 1916
- counters.gems: 778
- counters.coins: 45
- counters.shots: 535
- counters.hostileShots: 327
- counters.nearMisses: 15
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 109, spent 101 (Potato Crate 101); spots charged and used: Potato Crate 2, Beetle Nest 1; chests seen 10, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Tater Twirl 60% over Hot Potato 26%, Golden Fry 14%; 0:24 took Reset Button 89% over Seeker Sprouts 8%, Couch Potato 3%; 0:56 took Gravy Heart 63% over Butter Pat 25%, Mash Finisher 12%; 2:20 took Reset Button 49% over Mash Mortar 38%, Tater Twirl 13%; 2:22 took Gravy Heart 74% over Mash Finisher 21%, Hot Sauce 5%; 2:31 took Seeker Sprouts 56% over Salt Shaker 23%, Bacon Bits 21%; 2:37 took Reset Button 79% over Mash Snowball 17%, Mezzaluna 4%; 2:41 took Gravy Heart 37% over Four-Eyed Spud 36%, Steam Vent 27%; 2:55 took Four-Eyed Spud 60% over Potato Battery 37%, Spud Dice 3%; 3:20 took Starch Chain 41% over Tater Tot Pup 30%, Packed Pan 29%; 3:32 took Bacon Bits 39% over Butter Pat 32%, Tater Twirl 29%; 3:55 took Gravy Heart 60% over Fry Knives 34%, Reroll 4%, Potato Magnet 1%, Skip 1%.

### L4.I4.G7: earned-gold shop planner s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 240s; plays the playbook with its own planner.state, its own planner.goal.
- Outcome: alive after 240.4s (game clock 04:00), health 78/120; damage taken 140 (enemy:spittlebug 26.842, enemy:little-grey 4.47, enemy:aphid 2.235, Hot oil 3.833); 2240 kills; level 1 to 17; planner asked 89 times, action model 642; the models saw the game 33 ms late (p90 52); ended with seeker-sprouts 4, mash-wave 1, locked-gatling 2, grab-bag 5, skillet-flail 1, whisk-vortex 1, gpu 1, masher-grip 2, sprouting-eyes 1.
- run.timeSec: 240.417
- run.level: 16
- run.kills: 2240
- run.damageBySource: seeker-sprouts 6148.428, mash-wave 11769.307, locked-gatling 12566.328, grok-bot 2391.768, grab-bag 8206.986, skillet-flail 2764.819, whisk-vortex 16451.085, dog:terrier 891.628
- run.damageTakenBySource: enemy:spittlebug 26.842, enemy:little-grey 4.47, enemy:aphid 2.235, Hot oil 3.833, enemy:cave-grub 42.65, boss:amusing 23.284, enemy:frost-flea 7.736, boss:beetle-queen 9.066, enemy:snow-mold 20.02
- run.killsBySource: seeker-sprouts 338, mash-wave 380, locked-gatling 408, grok-bot 86, grab-bag 279, skillet-flail 76, whisk-vortex 621, dog:terrier 52
- run.biomes: ["frozen-tundra","chip-canyons","fry-oil-desert","crop-circle","ketchup-bog","mash-swamp","peel-forest","compost-caves"]
- run.dogs: [{"id":"terrier","at":151.41666666666666}]
- run.dogHelp: damage.terrier 891.628, hits.terrier 68
- run.distance: 13356.248
- run.dodgePoints: 1777.065
- run.dodgeSecond: 240
- run.dodgeTaken: [92.6979481888213,92.6979481888213,92.6979481888213,92.6979481888213,101.76411485548797,101.76411485548797,101.76411485548797,101.76411485548797,101.76411485548797,101.76411485548797,101.76411485548797,105.68369975749835,105.68369975749835,105.68369975749835,105.68369975749835,109.67488817135514,113.66817647842805,113.66817647842805,113.66817647842805,113.66817647842805,113.66817647842805,113.66817647842805,113.66817647842805,121.79642155387968,125.86073382465293,125.86073382465293,125.86073382465293,125.86073382465293,125.86073382465293,125.86073382465293,125.86073382465293,125.86073382465293,125.86073382465293,125.86073382465293,125.86073382465293,125.86073382465293,128.66793858885592,128.66793858885592,128.66793858885592,128.66793858885592,128.66793858885592,128.66793858885592,128.66793858885592,134.34844542886606,134.34844542886606,134.34844542886606,134.34844542886606,134.34844542886606,134.34844542886606,134.34844542886606,134.34844542886606,134.34844542886606,134.34844542886606,134.34844542886606,134.34844542886606,134.34844542886606,140.1362626059992,140.1362626059992,90.79338546783364,90.79338546783364,90.79338546783364]
- run.dodgeSteps: [1021.0678333332278,1027.2678333332249,1033.467833333222,1039.667833333219,1045.8678333332161,1052.0678333332132,1056.717833333211,1061.0578333332091,1064.6744999998741,1070.6678333332045,1073.4578333332033,1079.554499999867,1085.754499999864,1091.9544999998611,1097.06949999986,1103.0214999998575,1109.2214999998546,1115.4214999998517,1121.001499999849,1121.001499999849,1124.618166666514,1130.8181666665112,1137.0181666665083,1143.2181666665053,1149.108166666503,1154.8431666665008,1159.183166666501,1163.523166666501,1169.4131666664987,1175.6131666664958,1181.8131666664929,1188.01316666649,1194.213166666487,1200.4131666664841,1206.6131666664812,1212.8131666664783,1219.0131666664754,1225.2131666664725,1229.3464999998039,1235.546499999801,1241.746499999798,1247.9464999997952,1254.1464999997922,1260.3464999997893,1266.5464999997864,1272.7464999997835,1278.9464999997806,1285.1464999997777,1291.3464999997748,1297.5464999997719,1303.746499999769,1309.6054999997666,1314.348499999766,1315.0718333330992,1316.2084999997653,1320.858499999765,1326.8414999997624,1333.0414999997595,1002.4678333332365,1008.6678333332336,1014.8678333332307]
- run.curseSince: 14209
- run.goldEarned: 359.435
- run.goldSpent: 313
- run.bossChests: 1
- run.paidChests: 3
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 177
- run.itemsBought: 1
- run.grokBotHelps: 6
- run.botSwarms: 1
- run.throttles: 20
- run.lootRunnersMet: [1,1]
- counters.kills: 2240
- counters.hits: 9409
- counters.gems: 1193
- counters.coins: 161
- counters.shots: 5781
- counters.hostileShots: 165
- counters.nearMisses: 21
- counters.hostileHits: 14
- Gold, spots and chests: gold held at the end 39, spent 289 (Potato Crate 193, Fry Cart 96); spots charged and used: Crop Patch 3, Tater Lantern 1, Beetle Nest 1, Potato Crate 1; chests seen 8, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:16 took Mash Wave 73% over Seeker Sprouts 20%, Potato Magnet 7%; 0:24 took GPU 56% over Gem Sling 42%, Rotten Spud 2%; 0:36 took Locked Gatling 82% over Root Spikes 10%, Tater Mines 8%; 0:37 took Masher Grip 66% over Hash Boomerang 29%, Clean Plate 5%; 1:08 took Grab Bag 35% over Mash Wave 35%, Spud Decoy 30%; 1:17 took Skillet Flail 52% over GPU 42%, Four-Eyed Spud 3%, Reroll 3%; 1:39 took Whisk Vortex 60% over Masher Grip 30%, Four-Eyed Spud 6%, Reroll 4%; 2:08 took Seeker Sprouts 55% over Hash Rush 29%, Reroll 11%, Golden Fry 5%; 2:27 took Grab Bag 35% over Skillet Flail 35%, Reroll 17%, Mash Wave 13%; 2:46 took Sprouting Eyes 59% over Skillet Flail 17%, Reroll 17%, Mash Wave 7%; 3:21 took option 1 94% over Leave 5%, option 0 1%, option 2 0%; 3:25 took Grab Bag 66% over Sprouting Eyes 17%, Reroll 13%, Mash Wave 4%; 3:26 took Locked Gatling 39% over Seeker Sprouts 34%, Whisk Vortex 14%, Reroll 13%; 3:26 took Seeker Sprouts 67% over Reroll 14%, Slow Cooker 10%, Fertilizer 9%; 3:27 took Grab Bag 72% over Whisk Vortex 15%, Reroll 10%, Fertilizer 3%; 3:55 took Grab Bag 74% over Reroll 13%, Skillet Flail 8%, Fertilizer 5%; 3:56 took Masher Grip 56% over Lean Lunch 35%, Reroll 6%, Fertilizer 3%.

### L4.I4.G8: earned-gold shop planner s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 240s; plays the playbook with its own planner.state, its own planner.goal.
- Outcome: alive after 240s (game clock 04:00), health 78/120; damage taken 231 (Hot oil 17.6, enemy:fry-fly 14.899, enemy:lint-bunny 4.16, enemy:crumb-ant 3.233); 1439 kills; level 1 to 14; planner asked 90 times, action model 749; the models saw the game 34 ms late (p90 56); ended with seeker-sprouts 1, hash-hawk 6, mash-mallet 1, locked-gatling 1, potato-rain 1, hot-streak 2, chives 1, mash-finisher 1, thick-skin 1, bacon-bits 1.
- run.timeSec: 239.95
- run.level: 13
- run.kills: 1439
- run.damageBySource: seeker-sprouts 4875.37, hash-hawk 11364.186, mash-mallet 5412.681, locked-gatling 10804.217, potato-rain 3683.872, hot-streak 10923.979
- run.damageTakenBySource: Hot oil 17.6, enemy:fry-fly 14.899, enemy:lint-bunny 4.16, enemy:crumb-ant 3.233, enemy:tomato-leech 60.794, enemy:bog-slime 4.637, boss:amusing 6.653, boss:beetle-queen 36.265, enemy:ketchup-drop 5.107, enemy:sprout-mite 1.921, enemy:potato-beetle 18.65, enemy:sand-crab 47.805, enemy:garden-slug 9.707
- run.killsBySource: seeker-sprouts 199, hash-hawk 185, mash-mallet 199, locked-gatling 346, potato-rain 143, hot-streak 367
- run.biomes: ["fry-oil-desert","coin-laundromat","ketchup-bog","mash-swamp","peel-forest","chip-canyons","compost-caves"]
- run.dogs: [{"id":"beagle","at":129.9}]
- run.dogHelp: gold.beagle 42, finds.beagle 14
- run.distance: 12859.122
- run.dodgePoints: 1439.475
- run.dodgeSecond: 239
- run.dodgeTaken: [109.4368471596947,109.4368471596947,109.4368471596947,113.96993049302803,125.51262400160165,131.72942400160164,162.29535733493503,173.91977592635118,173.91977592635118,178.4987984792212,178.4987984792212,178.4987984792212,178.4987984792212,178.4987984792212,178.4987984792212,178.4987984792212,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,187.82269254473414,192.66722657383067,197.51847204080968,202.3745139404254,212.0249794254757,216.90792074008968,216.90792074008968,216.90792074008968,221.70330038260738,221.70330038260738,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,231.43233599116795,109.4368471596947,109.4368471596947,109.4368471596947,109.4368471596947]
- run.dodgeSteps: [966.8131666665173,973.0131666665144,974.7698333331803,976.9398333331792,983.1398333331763,989.3398333331734,995.5398333331705,1001.7398333331676,1011.8098333331657,1017.9633333331627,1023.2333333331595,1027.9866666664907,1030.9833333331558,1037.1833333331529,1042.0399999998174,1047.723333333148,1050.203333333147,1056.403333333144,1062.603333333141,1068.8033333331382,1075.0033333331353,1081.2033333331324,1087.4033333331295,1093.6033333331266,1099.8033333331236,1106.0033333331207,1112.2033333331178,1118.403333333115,1124.603333333112,1130.803333333109,1132.8699999997748,1134.0066666664409,1140.206666666438,1145.683333333102,1151.3666666664326,1159.3441666664316,1160.70816666643,1163.0021666664281,1164.5521666664274,1170.7521666664245,1180.8221666664226,1187.0221666664197,1193.2221666664168,1199.422166666414,1205.622166666411,1211.822166666408,1218.0221666664052,1224.2221666664022,1230.4221666663993,1236.6221666663964,1242.8221666663935,1249.0221666663906,1255.2221666663877,1261.4221666663848,1267.6221666663819,1273.822166666379,1280.022166666376,964.0231666665186,964.0231666665186,964.0231666665186,964.0231666665186]
- run.curseSince: 12734
- run.goldEarned: 295.598
- run.goldSpent: 123
- run.bossChests: 2
- run.paidChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 173
- run.itemsBought: 1
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 1439
- counters.hits: 3633
- counters.crits: 43
- counters.gems: 762
- counters.coins: 106
- counters.shots: 2974
- counters.hostileShots: 86
- counters.nearMisses: 6
- counters.hostileHits: 4
- Gold, spots and chests: gold held at the end 172, spent 123 (Fry Cart 93, Potato Crate 30); spots charged and used: Crop Patch 1, Potato Crate 1, Beetle Nest 1; chests seen 8, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Hash Hawk 42% over Sprouting Eyes 40%, Root Spikes 18%; 0:23 took Chives 51% over Starch Chain 37%, Peeler 12%; 0:58 took Mash Mallet 46% over Chives 42%, Seeker Sprouts 12%; 0:58 took Hash Hawk 66% over Mash Snowball 18%, Peel Phantom 16%; 1:08 took Locked Gatling 48% over Hash Hawk 40%, Bacon Bits 12%; 1:12 took Potato Rain 58% over Steam Vent 20%, Potato Magnet 11%, Reroll 11%; 1:52 took Hash Hawk 38% over Big Bowl 34%, Potato Rain 17%, Reroll 11%; 2:23 took Hot Streak 38% over Potato Rain 26%, Peel Lash 25%, Reroll 11%; 2:43 took Leave 67% over option 0 17%, option 1 14%, option 2 2%; 2:50 took Leave 66% over option 0 20%, option 1 12%, option 2 2%; 3:03 took Mash Finisher 52% over Potato Rain 26%, Reroll 14%, Mash Mallet 8%; 3:05 took option 0 61% over Leave 20%, option 1 18%, option 2 1%; 3:28 took Thick Skin 39% over Hash Hawk 39%, Potato Rain 12%, Reroll 10%; 3:28 took Hot Streak 48% over Thick Skin 32%, Spud Sneakers 12%, Reroll 8%; 3:29 took Hash Hawk 70% over Reroll 15%, Potato Rain 9%, Seeker Sprouts 6%; 3:32 took Bacon Bits 37% over Potato Rain 36%, Gravy Splash 14%, Reroll 13%.

### L4.I4.G9: earned-gold shop planner s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 240s; plays the playbook with its own planner.state, its own planner.goal.
- Outcome: alive after 240.4s (game clock 04:00), health 115/120; damage taken 133 (Hot oil 24.733, enemy:oil-drip 1.841, enemy:crumb-ant 1.406, boss:beetle-queen 25.019); 1824 kills; level 1 to 15; planner asked 89 times, action model 621; the models saw the game 30 ms late (p90 51); ended with seeker-sprouts 1, tater-minigun 1, mash-landing 1, fry-sentry 1, gratin-arc 1, tater-twirl 2, masher-grip 1, packed-pan 1, hot-sauce 1, butter-pat 1.
- run.timeSec: 240.367
- run.level: 14
- run.kills: 1824
- run.damageBySource: seeker-sprouts 4511.175, locked-gatling 8625.655, fry-sentry 6538.021, starch-chain 12769.141, tater-twirl 5624.666, grok-bot 347.77, chili-bottle 673.836, tater-minigun 9800.609, gratin-arc 6039.691
- run.damageTakenBySource: Hot oil 24.733, enemy:oil-drip 1.841, enemy:crumb-ant 1.406, boss:beetle-queen 25.019, enemy:beetle-brood 3.782, boss:amusing 29.936, enemy:sand-crab 46.68
- run.killsBySource: seeker-sprouts 207, locked-gatling 364, fry-sentry 215, starch-chain 421, tater-twirl 203, grok-bot 11, chili-bottle 16, tater-minigun 221, gratin-arc 166
- run.evolutions: [{"id":"tater-minigun","at":197.65},{"id":"gratin-arc","at":234.9}]
- run.biomes: ["fry-oil-desert","chip-canyons","frozen-tundra","compost-caves","ketchup-bog"]
- run.distance: 12428.933
- run.dodgePoints: 1780.644
- run.dodgeSecond: 240
- run.dodgeTaken: [95.11827935977196,95.11827935977196,95.11827935977196,95.11827935977196,95.11827935977196,95.11827935977196,97.83812935977197,97.83812935977197,97.83812935977197,102.43550542716487,102.43550542716487,102.43550542716487,106.9685887604982,106.9685887604982,106.9685887604982,106.9685887604982,111.53526770910932,111.53526770910932,111.53526770910932,111.53526770910932,123.41241248489033,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,128.06503098570929,133.3983643190426,133.3983643190426,133.3983643190426,95.11827935977196,95.11827935977196,95.11827935977196]
- run.dodgeSteps: [946.8433333332714,953.0433333332685,959.2433333332656,965.1333333332628,969.5766666665941,975.7766666665912,981.9766666665882,987.9699999999187,994.1699999999158,1000.3699999999129,1006.56999999991,1012.7699999999071,1018.9699999999042,1025.1699999999014,1027.6499999999,1027.6499999999,1030.7499999998986,1036.9499999998957,1041.2899999998938,1045.9399999998916,1052.1399999998887,1058.3399999998858,1064.5399999998829,1070.73999999988,1076.939999999877,1083.1399999998741,1089.3399999998712,1095.5399999998683,1101.7399999998654,1107.9399999998625,1114.1399999998596,1115.6899999998589,1115.6899999998589,1121.579999999856,1127.779999999853,1133.9799999998502,1140.1799999998473,1144.416666666512,1144.416666666512,1148.5499999998433,1154.7499999998404,1160.9499999998375,1167.1499999998346,1173.3499999998317,1179.5499999998287,1185.7499999998258,1191.949999999823,1193.9133333331554,1193.9133333331554,1199.3899999998196,1205.5899999998167,1211.7899999998137,1212.7199999998134,1215.819999999812,1222.019999999809,1228.219999999806,1234.4199999998032,1240.6199999998003,937.0266666666093,937.0266666666093,940.6433333332743]
- run.curseSince: 14391
- run.goldEarned: 586.03
- run.goldSpent: 377
- run.bossChests: 6
- run.paidChests: 3
- run.bossesKilled: 3
- run.elitesKilled: 4
- run.peakEnemies: 173
- run.itemsBought: 1
- run.grokBotHelps: 7
- run.lootRunnersMet: [1]
- counters.kills: 1824
- counters.hits: 4089
- counters.crits: 84
- counters.gems: 1189
- counters.coins: 74
- counters.shots: 4057
- counters.hostileShots: 206
- counters.nearMisses: 14
- counters.hostileHits: 7
- Gold, spots and chests: gold held at the end 206, spent 377 (Potato Crate 217, Fry Cart 160); spots charged and used: Potato Crate 3, Crop Patch 2; chests seen 7, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:18 took Locked Gatling 70% over Root Cellar 23%, Sprout Satellites 7%; 0:23 took Mash Landing 41% over Potato Rain 32%, Spud Dynamo 27%; 0:24 took Fry Cook Sentry 50% over Locked Gatling 34%, Root Network 16%; 0:46 took Locked Gatling 58% over Mash Landing 30%, Hot Sauce 12%; 1:11 took Starch Chain 74% over Sprouting Eyes 22%, Gem Sling 4%; 1:34 took Tater Twirl 42% over Seeker Sprouts 31%, Skipping Cannonball 27%; 1:54 took Tater Twirl 60% over Seeker Sprouts 21%, Fry Cook Sentry 19%; 2:11 took Starch Chain 54% over Aged Russet 43%, Tater Trot 3%; 2:24 took Leave 81% over option 0 13%, option 2 4%, option 1 2%; 2:35 took Locked Gatling 40% over Butter Socks 34%, Masher Grip 17%, Reroll 9%; 2:37 took Leave 76% over option 0 18%, option 2 4%, option 1 2%; 2:42 took Locked Gatling 44% over Mash Landing 28%, Masher Grip 21%, Reroll 7%; 2:43 took Masher Grip 45% over Mash Landing 39%, Tater Twirl 9%, Reroll 7%; 2:48 took option 0 93% over Leave 6%, option 2 1%, option 1 0%; 3:08 took Packed Pan 34% over Mash Landing 34%, Butter Socks 25%, Reroll 7%; 3:28 took Hot Sauce 44% over Fry Cook Sentry 28%, Reroll 16%, Seeker Sprouts 12%; 3:59 took Butter Pat 46% over Mash Landing 31%, Reroll 11%, Fry Cook Sentry 10%, Skip 2%.

### L4.I4.G10: earned-gold shop planner s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 240s; plays the playbook with its own planner.state, its own planner.goal.
- Outcome: died after 210s (game clock 03:30); damage taken 140 (enemy:cave-grub 16.328, enemy:frost-flea 21.413, boss:amusing 17.74, enemy:crumb-ant 5.555); 1124 kills; level 1 to 9; planner asked 65 times, action model 772; the models saw the game 32 ms late (p90 51); ended with seeker-sprouts 2, tater-pup 3, skipping-cannonball 1, whisk-vortex 1, frying-pan 2.
- run.timeSec: 210.017
- run.level: 8
- run.kills: 1124
- run.damageBySource: seeker-sprouts 4518.257, tater-pup 5196.432, skipping-cannonball 1511.326, grok-bot 2533.981, whisk-vortex 15889.419, frying-pan 1965.462
- run.damageTakenBySource: enemy:cave-grub 16.328, enemy:frost-flea 21.413, boss:amusing 17.74, enemy:crumb-ant 5.555, enemy:sprout-mite 3.803, enemy:sand-crab 4.34, enemy:bowling-ball 4.869, boss:beetle-queen 23.129, enemy:potato-beetle 7.974, enemy:snow-mold 23.77, Spore vent 2.933, enemy:wireworm-larva 8.231
- run.killsBySource: seeker-sprouts 225, tater-pup 200, skipping-cannonball 63, grok-bot 70, whisk-vortex 506, frying-pan 60
- run.biomes: ["frozen-tundra","peel-forest","mash-swamp","chip-canyons","compost-caves"]
- run.distance: 12338.418
- run.dodgePoints: 1750.639
- run.dodgeSecond: 210
- run.dodgeTaken: [62.2871056469042,65.0069556469042,65.0069556469042,66.9358281046988,68.85801522977086,68.85801522977086,71.48932293543287,71.48932293543287,71.48932293543287,75.41756829184533,75.41756829184533,79.34501176937296,94.37745287920181,96.37175516267665,112.12311775727068,112.12311775727068,112.12311775727068,122.15575101015912,122.15575101015912,122.15575101015912,122.15575101015912,122.15575101015912,122.15575101015912,122.15575101015912,125.08908434349246,127.80893434349245,131.85438451883695,135.9697819441786,30.690717119907106,30.690717119907106,30.690717119907106,30.690717119907106,30.690717119907106,30.690717119907106,37.34325045324044,37.34325045324044,39.56076156435155,39.56076156435155,39.56076156435155,39.56076156435155,39.56076156435155,39.56076156435155,39.56076156435155,39.56076156435155,39.56076156435155,39.56076156435155,41.42248006101824,41.42248006101824,41.42248006101824,43.29623324367642,43.29623324367642,43.29623324367642,43.29623324367642,43.29623324367642,43.29623324367642,57.76784886240346,57.76784886240346,59.65579794124219,59.65579794124219,59.65579794124219,59.65579794124219]
- run.dodgeSteps: [1077.513499999978,1083.713499999975,1088.9524999999737,1094.3464999999721,1100.5464999999692,1106.7464999999663,1112.9464999999634,1119.1464999999605,1125.3464999999576,1131.5464999999547,1137.7464999999518,1143.9464999999489,1149.8364999999465,1154.548499999946,1163.9984999999451,1168.1318333332765,1173.5051666666072,1179.7051666666043,1185.9051666666014,1195.9751666665995,1202.1751666665966,1205.8951666665948,1205.8951666665948,1212.1418333332615,1216.7918333332593,1221.338499999924,1227.538499999921,1233.738499999918,902.5133333334088,906.8533333334053,910.2633333334015,913.6733333333977,918.3853333333943,921.8883333333906,925.763333333387,930.9403333333837,934.3503333333799,938.7368333333765,944.9368333333736,951.1368333333706,957.3368333333677,963.5368333333648,966.5335000000301,970.8735000000281,977.0735000000252,983.2735000000223,989.4735000000194,995.6735000000165,1001.8735000000136,1008.0735000000107,1014.2735000000077,1020.4735000000048,1026.673500000002,1032.873499999999,1039.073499999996,1045.2734999999932,1051.4734999999903,1057.6734999999874,1063.8734999999845,1068.2134999999823,1071.3134999999809]
- run.killer: "enemy:wireworm-larva"
- run.goldEarned: 53.97
- run.bossesKilled: 1
- run.elitesKilled: 4
- run.peakEnemies: 183
- run.grokBotHelps: 4
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1124
- counters.hits: 5837
- counters.gems: 146
- counters.coins: 40
- counters.shots: 571
- counters.hostileShots: 457
- counters.nearMisses: 35
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 53, spent 0; spots charged and used: Crop Patch 1; chests seen 5, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Tater Tot Pup 60% over Seeker Sprouts 29%, Aged Russet 11%; 0:23 took Seeker Sprouts 51% over Hash Rush 27%, Salt Shaker 22%; 0:24 took Tater Tot Pup 41% over Spud Cannon 31%, Peel Phantom 28%; 0:40 took Tater Tot Pup 46% over Harvest Moon 45%, Hash Boomerang 9%; 1:24 took Skipping Cannonball 67% over Sprouting Eyes 25%, Deep Fryer 8%; 2:14 took Whisk Vortex 61% over Seeker Sprouts 24%, Tot Stampede 11%, Skip 4%; 3:06 took Frying Pan 58% over Skillet Flail 33%, Skip 5%, Chip Shuriken 4%; 3:18 took Frying Pan 67% over Aged Russet 23%, Masher Grip 8%, Skip 2%.
