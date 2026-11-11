# Does the forecast-only autopilot mover beat the action model from 0:00?

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | refuted |
| Created | L3.I5 |
| Updated | L3.I6 |

## Hypothesis

Autopilot 1 takes the forecast's move nearest the goal, answers at once and never asks the action model, so it avoids model lag and over-cautious ruling-out. It lives 5:00 on at least 4 of 5 fresh seeds, against 3 of 5 for the playbook knobs.

## Method

Seeker-sprouts from 0:00, 300 s, seeds 31-35, playbook knobs plus autopilot 1. Compare with the playbook games already played on the same seeds (5:00, 5:00, 3:05, 5:00, 2:39). Read 5:00 survival, damage by source, chests by 2:00 and the Masher at 4:00. The mover never dashes, so it is judged on survival, not dashes.

## Findings

Seeker-sprouts with autopilot 1 on s31-35 lived 1 of 5 (s33), against 3 of 5 for the knobs with the action model. Deaths at 3:41, 3:28, 2:33 and 2:28 were thin openings with 0-2 chests. The mover never dashes and skips the distrustSeconds check. It is not worth adding to the playbook, which keeps autopilot 0.

## Games

### L3.I5.G1: seeker autopilot s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 300s; plays the playbook with autopilot 1.
- Outcome: died after 221.6s (game clock 03:41); damage taken 185 (Hot oil 22.825, enemy:oil-drip 3.97, enemy:aphid 2.681, enemy:crumb-ant 6.745); 1086 kills; level 1 to 11; planner asked 78 times, action model 19; the models saw the game 33 ms late (p90 52); ended with seeker-sprouts 6, starch-bolt 1, harvest-moon 1, root-cellar 1, spud-lob 1, big-bowl 5.
- run.timeSec: 221.617
- run.level: 10
- run.kills: 1086
- run.damageBySource: seeker-sprouts 7800.248, starch-bolt 5766.15, harvest-moon 6028.945, root-cellar 2730.674, spud-lob 3398.542, alex 1944.207
- run.damageTakenBySource: Hot oil 22.825, enemy:oil-drip 3.97, enemy:aphid 2.681, enemy:crumb-ant 6.745, enemy:ketchup-drop 1.643, enemy:sprout-mite 1.3, enemy:potato-beetle 30.499, boss:amusing 65.187, boss:beetle-queen 37.051, Brambles 4.761, enemy:beetle-brood 4.535, enemy:sand-crab 4.277
- run.killsBySource: seeker-sprouts 385, starch-bolt 220, harvest-moon 245, spud-lob 125, root-cellar 43, alex 68
- run.biomes: ["fry-oil-desert","ketchup-bog","chip-canyons","peel-forest","compost-caves","mash-swamp"]
- run.dogs: [{"id":"corgi","at":51.4}]
- run.dogHelp: frozen.corgi 94
- run.distance: 13007.6
- run.dodgePoints: 1531.439
- run.dodgeSecond: 221
- run.dodgeTaken: [127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,131.29041978066158,134.85049298182545,134.85049298182545,134.85049298182545,134.85049298182545,134.85049298182545,134.85049298182545,134.85049298182545,134.85049298182545,134.85049298182545,134.85049298182545,134.85049298182545,137.43547438678414,137.43547438678414,137.43547438678414,137.43547438678414,137.43547438678414,137.43547438678414,137.43547438678414,137.43547438678414,137.43547438678414,137.43547438678414,137.43547438678414,154.94333164049925,161.67530781004717,161.67530781004717,162.04150499314576,172.58064488760897,172.58064488760897,98.18014484298916,100.39378719252451,100.39378719252451,100.39378719252451,100.39378719252451,113.01066075574289,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768,127.73034657949768]
- run.dodgeSteps: [1061.3366666666684,1067.5366666666655,1073.7366666666626,1079.9366666666597,1086.1366666666568,1092.3366666666539,1098.536666666651,1104.736666666648,1110.9366666666451,1117.1366666666422,1123.3366666666393,1129.5366666666364,1135.7366666666335,1141.9366666666306,1148.1366666666277,1154.3366666666248,1160.5366666666218,1166.736666666619,1172.936666666616,1179.136666666613,1185.3366666666102,1191.5366666666073,1197.7366666666044,1203.9366666666015,1210.1366666665986,1216.3366666665956,1222.5366666665927,1228.7366666665898,1234.936666666587,1241.136666666584,1247.336666666581,1253.5366666665782,1259.7366666665753,1265.9366666665724,1272.1366666665695,1278.3366666665665,1284.5366666665636,1290.7366666665607,1296.9366666665578,934.9600000000612,941.1600000000583,947.3600000000554,948.9100000000547,949.7366666667209,955.936666666718,962.1366666667151,968.3366666667122,974.5366666667093,980.7366666667064,986.9366666667034,993.1366666667005,999.3366666666976,1005.5366666666947,1011.7366666666918,1017.9366666666889,1024.1366666666859,1030.336666666683,1036.53666666668,1042.7366666666771,1048.9366666666742,1055.1366666666713]
- run.curseSince: 12981
- run.killer: "boss:beetle-queen"
- run.goldEarned: 194.59
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 181
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 1086
- counters.hits: 2471
- counters.gems: 395
- counters.coins: 38
- counters.shots: 738
- counters.hostileShots: 429
- counters.nearMisses: 30
- counters.hostileHits: 10
- Gold, spots and chests: gold held at the end 194, spent 0; spots charged and used: Tater Lantern 2, Spud Freezer 2, Crop Patch 1, Stray Dog 1; chests seen 3, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Big Bowl 47% over Gravy Boat 37%, Mezzaluna 16%; 0:33 took Seeker Sprouts 56% over Tater Mines 42%, Golden Fry 2%; 0:50 took Starch Bolt 55% over Fertilizer 35%, Masher Grip 10%; 0:59 took Harvest Moon 78% over Big Bowl 18%, Starch Bolt 4%; 1:10 took Big Bowl 59% over Starch Plating 35%, Slow Cooker 6%; 1:33 took Root Cellar 64% over Big Bowl 33%, Bacon Bits 3%; 1:34 took Spud Lob 78% over Root Cellar 17%, Salt Shaker 5%; 2:01 took Big Bowl 48% over Chives 39%, Fertilizer 7%, Reroll 6%; 2:47 took Big Bowl 58% over Spud Lob 19%, Fertilizer 12%, Reroll 11%; 3:36 took Big Bowl 66% over Root Cellar 20%, Reroll 9%, Fertilizer 3%, Skip 2%.

### L3.I5.G2: seeker autopilot s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 300s; plays the playbook with autopilot 1.
- Outcome: died after 208.3s (game clock 03:28); damage taken 190 (enemy:snow-mold 31.988, enemy:frost-flea 25.307, enemy:cave-grub 27.208, enemy:sprout-mite 7.653); 1222 kills; level 1 to 11; planner asked 73 times, action model 6; the models saw the game 30 ms late (p90 49); ended with seeker-sprouts 1, wildfire-roast 1, reset-button 1, chip-shuriken 2, thick-skin 1, spud-sneakers 1.
- run.timeSec: 208.3
- run.level: 10
- run.kills: 1222
- run.damageBySource: seeker-sprouts 3754.565, hot-streak 13833.624, reset-button 3597.709, chip-shuriken 6328.575, grok-bot 117.034, wildfire-roast 2845.404
- run.damageTakenBySource: enemy:snow-mold 31.988, enemy:frost-flea 25.307, enemy:cave-grub 27.208, enemy:sprout-mite 7.653, enemy:little-grey 1.211, enemy:aphid 4.003, boss:amusing 44.986, enemy:compost-maggot 1.356, boss:beetle-queen 29.554, enemy:parking-gull 1.692, enemy:dumpster-raccoon 7.879, enemy:fry-fly 2.875, enemy:beetle-brood 4.05
- run.killsBySource: seeker-sprouts 208, hot-streak 663, reset-button 102, chip-shuriken 158, grok-bot 6, wildfire-roast 85
- run.evolutions: [{"id":"wildfire-roast","at":200.71666666666667}]
- run.biomes: ["compost-caves","frozen-tundra","peel-forest","fry-palace","chip-canyons","ketchup-bog"]
- run.dogs: [{"id":"whippet","at":24.7}]
- run.dogHelp: blocked.whippet 6
- run.distance: 11437.195
- run.dodgePoints: 1414.445
- run.dodgeSecond: 208
- run.dodgeTaken: [126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,141.40114891010688,141.40114891010688,143.00708278434553,143.00708278434553,144.6992494132354,144.6992494132354,151.10173347308617,151.10173347308617,157.9160458774471,161.96651030580463,178.38555230055528,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482,126.94192102619482]
- run.dodgeSteps: [960.9404674955822,968.0704674955832,975.2004674955842,982.3304674955853,989.4604674955863,996.5904674955873,1003.7204674955883,1010.8504674955893,1017.9804674955903,1025.1104674955914,1032.2404674955924,1039.3704674955934,1046.5004674955944,1053.6304674955954,1060.7604674955965,1070.2805070938061,1077.4105070938072,1084.5405070938082,1091.6705070938092,1098.8005070938102,1105.9305070938112,1113.0605070938122,1120.1905070938133,1127.3205070938143,1134.4505070938153,1141.5805070938163,728.9552741622942,735.5892741622924,742.2232741622906,748.8572741622888,755.491274162287,762.1252741622852,768.7592741622834,775.3932741622816,782.0272741622798,788.6612741622781,795.2952741622763,801.9292741622745,808.5632741622727,815.1972741622709,821.8312741622691,828.4652741622673,835.0992741622655,841.7332741622637,848.3672741622619,855.0012741622601,861.6352741622583,868.2692741622565,874.9032741622547,881.5372741622529,888.171274162251,894.8052741622492,901.4392741622474,908.0732741622456,914.7072741622438,921.341274162242,926.548964162245,932.5527341622455,939.5504674955791,946.6804674955802,953.8104674955812]
- run.curseSince: 10756
- run.killer: "enemy:snow-mold"
- run.goldEarned: 195.802
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 3
- run.peakEnemies: 176
- run.shrinesUsed: 5
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 1222
- counters.hits: 2057
- counters.gems: 376
- counters.coins: 36
- counters.shots: 520
- counters.hostileShots: 592
- counters.nearMisses: 21
- counters.hostileHits: 3
- shrineTotals.area: 0.084
- shrineTotals.moveSpeed: 0.07
- shrineTotals.armor: 12
- shrineTotals.luck: 0.06
- shrineTotals.growth: 0.072
- Gold, spots and chests: gold held at the end 195, spent 0; spots charged and used: Stray Dog 1; chests seen 4, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Hot Streak 59% over Tater Twirl 28%, Slow Cooker 13%; 0:17 took Hot Streak 52% over Afterburner Fries 30%, Seeker Sprouts 18%; 0:27 took Reset Button 81% over Spud Cannon 14%, Rotten Spud 5%; 0:39 took Armor 68% over Damage 25%, Pickup range 7%; 0:51 took Luck 45% over Cooldown 41%, Crit 14%; 0:52 took Chip Shuriken 60% over Hash Rush 24%, Seeker Sprouts 16%; 0:58 took Move speed 63% over Duration 23%, Luck 14%; 1:17 took Hot Streak 56% over Fry Cook Sentry 32%, Chip Shuriken 6%, Hearty Helping 4%, Skip 2%; 1:27 took XP gain 50% over Max HP 48%, Luck 2%; 1:29 took Hot Streak 88% over Seeker Sprouts 5%, Chip Shuriken 4%, Skip 3%; 1:40 took Thick Skin 49% over Reset Button 41%, Seeker Sprouts 7%, Skip 3%; 1:48 took Area 95% over XP gain 4%, Crit 1%; 1:49 took Hot Streak 67% over Reset Button 27%, Spud Dice 5%, Skip 1%; 2:34 took Hot Streak 73% over Harvest Moon 24%, Skip 2%, Salt Shaker 1%; 2:59 took Spud Sneakers 52% over Seeker Sprouts 22%, Sprouting Eyes 21%, Skip 5%.

### L3.I5.G3: seeker autopilot s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 300s; plays the playbook with autopilot 1.
- Outcome: alive after 300.1s (game clock 05:00), health 42/120; damage taken 270 (Hot oil 16.333, enemy:crumb-ant 14.129, enemy:oil-drip 10.605, enemy:aphid 4.117); 2283 kills; level 1 to 15; planner asked 106 times, action model 68; the models saw the game 32 ms late (p90 52); ended with overgrowth 1, starch-bolt 1, mash-mallet 1, starch-puddle 1, julienne-dash 1, reset-button 3, butter-socks 1, fertilizer 2.
- run.timeSec: 300.117
- run.level: 14
- run.kills: 2283
- run.damageBySource: seeker-sprouts 25526.515, starch-bolt 8319.046, mash-mallet 3411.842, dog:shiba 2687.089, starch-puddle 6618.002, julienne-dash 680.609, reset-button 1709.757, overgrowth 31460.035
- run.damageTakenBySource: Hot oil 16.333, enemy:crumb-ant 14.129, enemy:oil-drip 10.605, enemy:aphid 4.117, enemy:fry-fly 12.16, enemy:lint-bunny 15.893, enemy:compost-maggot 1.612, enemy:little-grey 11.751, enemy:bog-slime 7.482, enemy:spittlebug 6.456, enemy:sprout-mite 1.657, boss:amusing 64.308, enemy:cave-grub 7.197, boss:beetle-queen 22.665, enemy:potato-beetle 8.102, enemy:snow-mold 4.047, enemy:sand-crab 26.021, enemy:tomato-leech 4.322, enemy:frost-flea 2.087, enemy:beetle-brood 5.191, enemy:sock-pile 12.434, boss:the-masher 11.197
- run.killsBySource: seeker-sprouts 892, starch-bolt 167, mash-mallet 125, dog:shiba 87, starch-puddle 149, julienne-dash 16, reset-button 58, overgrowth 789
- run.evolutions: [{"id":"overgrowth","at":259.9}]
- run.biomes: ["fry-oil-desert","chip-canyons","compost-caves","peel-forest","mash-swamp","crop-circle","frozen-tundra","coin-laundromat","ketchup-bog"]
- run.dogs: [{"id":"shiba","at":97.15}]
- run.dogHelp: damage.shiba 2687.089, hits.shiba 240
- run.distance: 17829.237
- run.dodgePoints: 1730.029
- run.dodgeSecond: 300
- run.dodgeTaken: [191.72019734897972,191.72019734897972,191.72019734897972,191.72019734897972,191.72019734897972,191.72019734897972,191.72019734897972,192.38686401564638,195.55353068231307,198.55353068231304,198.55353068231304,202.3752015904812,208.62335801958577,208.62335801958577,214.84015801958577,225.72520472767806,228.44505472767807,261.7350550720791,267.04806265155565,267.04806265155565,267.04806265155565,267.04806265155565,267.04806265155565,267.04806265155565,267.04806265155565,267.04806265155565,267.04806265155565,267.04806265155565,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,269.76791265155566,174.5416186022648,174.5416186022648,188.79849611303587,191.72019734897972]
- run.dodgeSteps: [1459.1958333329997,1465.3958333329967,1471.5958333329938,1477.795833332991,1483.995833332988,1490.195833332985,1496.3958333329822,1502.5958333329793,1508.7958333329764,1514.9958333329735,1521.1958333329706,1527.3958333329676,1533.5958333329647,1539.7958333329618,1545.995833332959,1552.195833332956,1553.1258333329556,1556.2258333329542,1562.4258333329512,1568.6258333329483,1574.8258333329454,1581.0258333329425,1587.2258333329396,1593.4258333329367,1599.6258333329338,1605.8258333329309,1612.025833332928,1617.502499999592,1621.84249999959,1621.84249999959,1626.9058333329208,1633.1058333329179,1639.305833332915,1645.505833332912,1651.194333332909,1654.6043333329053,1658.2003333329017,1664.4003333328988,1670.6003333328958,1676.800333332893,1683.00033333289,1689.200333332887,1695.4003333328842,1701.6003333328813,1707.8003333328784,1714.0003333328755,1720.2003333328726,1726.4003333328696,1732.6003333328667,1738.8003333328638,1745.000333332861,1751.200333332858,1757.400333332855,1763.6003333328522,1769.8003333328493,1776.0003333328464,1782.2003333328435,1434.3958333330113,1440.5958333330084,1446.7958333330055,1452.9958333330026]
- run.curseSince: 15464
- run.goldEarned: 421.857
- run.bossChests: 2
- run.bossesKilled: 2
- run.elitesKilled: 8
- run.peakEnemies: 184
- run.grokBotHelps: 5
- run.lootRunnersMet: [1,1]
- counters.kills: 2283
- counters.hits: 3803
- counters.gems: 682
- counters.coins: 111
- counters.shots: 1373
- counters.hostileShots: 453
- counters.nearMisses: 18
- counters.hostileHits: 13
- Gold, spots and chests: gold held at the end 421, spent 0; spots charged and used: Crop Patch 2, Beetle Nest 1, Stray Dog 1, Spud Freezer 1; chests seen 10, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Seeker Sprouts 52% over Spud Fence 36%, Rotten Spud 12%; 0:25 took Seeker Sprouts 70% over Four-Eyed Spud 22%, Spry Sprout 8%; 0:40 took Seeker Sprouts 48% over Chives 43%, Sour Cream 9%; 1:28 took Starch Bolt 47% over Fertilizer 43%, Stuffed Skin 10%; 2:14 took Mash Mallet 52% over Fertilizer 40%, Salt Shaker 8%; 2:22 took Starch Puddle 61% over Fertilizer 28%, Spud Sneakers 6%, Reroll 5%; 2:34 took Butter Socks 57% over Fertilizer 21%, Mash Mallet 11%, Reroll 11%; 2:44 took Seeker Sprouts 72% over Starch Puddle 12%, Fertilizer 8%, Reroll 8%; 3:24 took Fertilizer 32% over Starch Puddle 29%, Peeler 29%, Reroll 10%; 4:01 took Julienne Dash 79% over Mash Wave 8%, Starch Bolt 8%, Reroll 5%; 4:05 took Reset Button 90% over Peel Lash 5%, Reroll 3%, Mash Mallet 2%; 4:10 took Reset Button 74% over Spud Sneakers 11%, Reroll 10%, Starch Bolt 5%; 4:17 took Fertilizer 84% over Chives 11%, Reroll 3%, Mash Mallet 2%; 4:24 took Reset Button 83% over Fertilizer 7%, Reroll 7%, Starch Bolt 3%.

### L3.I5.G4: seeker autopilot s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 300s; plays the playbook with autopilot 1.
- Outcome: died after 153.1s (game clock 02:33); damage taken 175 (enemy:sprout-mite 9.486, enemy:aphid 40.017, enemy:fry-fly 2.106, enemy:crumb-ant 1.418); 585 kills; level 1 to 10; planner asked 57 times, action model 11; the models saw the game 29 ms late (p90 47); ended with seeker-sprouts 1, peeler 1, seed-potato 2, chip-shuriken 1, reset-button 5, mash-landing 1, gravy-heart 1, hot-start 1.
- run.timeSec: 153.067
- run.level: 9
- run.kills: 585
- run.damageBySource: seeker-sprouts 2591.693, peeler 1506.271, seed-potato 2037.667, chip-shuriken 3609.326, reset-button 1283.038
- run.damageTakenBySource: enemy:sprout-mite 9.486, enemy:aphid 40.017, enemy:fry-fly 2.106, enemy:crumb-ant 1.418, Spore vent 3.733, Brambles 3.8, enemy:compost-maggot 13.058, enemy:little-grey 18.744, enemy:spittlebug 8.923, boss:amusing 66.525, enemy:potato-beetle 6.906
- run.killsBySource: seeker-sprouts 173, peeler 102, seed-potato 127, chip-shuriken 129, reset-button 54
- run.biomes: ["ketchup-bog","fry-oil-desert","crop-circle","mash-swamp","chip-canyons","peel-forest","compost-caves"]
- run.distance: 8799.867
- run.dodgePoints: 1296.22
- run.dodgeSecond: 153
- run.dodgeTaken: [30.60695131729489,30.60695131729489,32.25437191316357,32.25437191316357,32.25437191316357,32.25437191316357,39.98603618086259,43.28148088037617,46.58062337759622,52.163967808000386,53.816973470354085,53.816973470354085,53.816973470354085,57.7262467691731,61.05251343583977,62.74522839731739,66.07149506398406,67.79685935152264,70.01437046263375,70.01437046263375,72.32935773506173,72.32935773506173,77.42123762194247,77.42123762194247,80.84450053017643,82.57514694886767,86.02832427925686,88.24583539036797,100.19704154557907,103.69163825795808,114.16256006549521,159.64980607009494,13.421314511790134,13.421314511790134,13.421314511790134,14.95644803059587,14.95644803059587,18.01199664474131,18.01199664474131,18.01199664474131,21.071906411547896,22.596613089639206,22.596613089639206,22.596613089639206,22.596613089639206,22.596613089639206,22.596613089639206,22.596613089639206,24.154584607318313,24.154584607318313,24.154584607318313,24.154584607318313,24.154584607318313,27.33697679906133,27.33697679906133,27.33697679906133,27.33697679906133,27.33697679906133,27.33697679906133,27.33697679906133,27.33697679906133]
- run.dodgeSteps: [695.1233333331954,701.3233333331925,707.5233333331896,713.7233333331867,719.9233333331838,726.1233333331809,732.323333333178,738.5233333331751,744.7233333331721,750.9233333331692,757.1233333331663,763.3233333331634,769.5233333331605,775.7233333331576,781.9233333331547,788.1233333331518,794.3233333331489,800.523333333146,806.723333333143,812.9233333331401,819.1233333331372,825.3233333331343,831.5233333331314,835.5533333331296,841.7533333331266,847.9533333331237,854.1533333331208,860.3533333331179,866.553333333115,872.7533333331121,873.8899999997782,879.5733333331088,534.543333333264,540.743333333261,546.9433333332581,553.1433333332552,559.3433333332523,565.5433333332494,571.7433333332465,577.9433333332443,584.1433333332413,590.3433333332388,596.543333333236,602.7433333332331,608.9433333332302,615.1433333332272,621.3433333332243,627.5433333332214,631.5733333332195,637.7733333332166,643.9733333332136,650.173333333215,656.3733333332136,660.6099999998784,666.8099999998755,671.6666666665399,672.1833333332063,678.3833333332034,681.173333333202,682.7233333332013,688.9233333331983]
- run.curseSince: 9111
- run.killer: "boss:amusing"
- run.goldEarned: 137.01
- run.bossChests: 1
- run.elitesKilled: 2
- run.peakEnemies: 108
- run.grokBotHelps: 2
- run.lootRunnersMet: [2]
- counters.kills: 585
- counters.hits: 1158
- counters.gems: 289
- counters.coins: 43
- counters.shots: 659
- counters.hostileShots: 267
- counters.nearMisses: 41
- counters.hostileHits: 13
- Gold, spots and chests: gold held at the end 137, spent 0; spots charged and used: Crop Patch 4, Spud Freezer 1; chests seen 2, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Peeler 85% over Mash Finisher 12%, Hot Sauce 3%; 0:32 took Seed Potato 74% over Steam Vent 14%, Root Network 12%; 0:51 took Chip Shuriken 66% over Seeker Sprouts 26%, Hot Sauce 8%; 1:16 took Reset Button 94% over Butter Socks 5%, Seeker Sprouts 1%; 1:44 took Mash Landing 61% over GPU 23%, Seed Potato 16%; 1:49 took Reset Button 75% over Seed Potato 20%, Seeker Sprouts 5%; 2:09 took Seed Potato 49% over Four-Eyed Spud 38%, Fertilizer 13%; 2:25 took Gravy Heart 56% over Four-Eyed Spud 31%, Chip Shuriken 13%; 2:31 took Hot Start 52% over Four-Eyed Spud 40%, Seeker Sprouts 8%.

### L3.I5.G5: seeker autopilot s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 300s; plays the playbook with autopilot 1.
- Outcome: died after 148.8s (game clock 02:28); damage taken 122 (enemy:aphid 2.333, enemy:frost-flea 2.387, enemy:potato-beetle 16.71, enemy:compost-maggot 3.628); 165 kills; level 1 to 5; planner asked 41 times, action model 48; the models saw the game 30 ms late (p90 48); ended with seeker-sprouts 2, sprout-squad 1, peel-out 1, thick-skin 1.
- run.timeSec: 148.833
- run.level: 4
- run.kills: 165
- run.damageBySource: seeker-sprouts 3391.597, sprout-squad 216.217, grok-bot 250.42
- run.damageTakenBySource: enemy:aphid 2.333, enemy:frost-flea 2.387, enemy:potato-beetle 16.71, enemy:compost-maggot 3.628, enemy:cave-grub 15.575, enemy:snow-mold 7.464, enemy:oil-drip 13.352, enemy:sand-crab 7.043, enemy:fry-fly 25.442, enemy:sprout-mite 4.482, enemy:crumb-ant 3.342, enemy:swarm-fly 2.772, boss:amusing 5.544, Hot oil 9.333, enemy:ketchup-drop 2.291
- run.killsBySource: seeker-sprouts 154, sprout-squad 4, grok-bot 7
- run.biomes: ["compost-caves","ketchup-bog","mash-swamp","chip-canyons","peel-forest","fry-oil-desert"]
- run.distance: 9050.142
- run.dodgePoints: 1103.663
- run.dodgeSecond: 148
- run.dodgeTaken: [67.0939376628576,69.8658265517465,69.8658265517465,69.8658265517465,69.8658265517465,69.8658265517465,69.8658265517465,69.8658265517465,69.8658265517465,69.8658265517465,69.8658265517465,77.74220682125124,77.74220682125124,77.74220682125124,83.07554015458457,87.23514015458458,87.23514015458458,89.52135732831772,89.52135732831772,92.40576802613646,99.91067653657527,107.9790655296461,111.6757798382427,116.59676370481174,118.88736033862142,119.38736033862142,119.38736033862142,46.485126375766235,46.485126375766235,46.485126375766235,46.485126375766235,49.51918062380821,49.51918062380821,49.51918062380821,49.51918062380821,49.51918062380821,49.51918062380821,49.51918062380821,49.51918062380821,49.51918062380821,49.51918062380821,53.35187674610453,53.35187674610453,55.96299263954176,55.96299263954176,55.96299263954176,55.96299263954176,55.96299263954176,55.96299263954176,55.96299263954176,55.96299263954176,55.96299263954176,55.96299263954176,59.68118813551541,59.68118813551541,61.205894813606726,61.205894813606726,61.205894813606726,61.205894813606726,62.81227533974912,62.81227533974912]
- run.dodgeSteps: [734.7774999998712,740.9774999998683,747.1774999998654,753.3774999998625,759.5774999998596,765.7774999998567,771.9774999998538,778.1774999998514,784.3774999998511,790.5774999998509,796.7774999998508,802.9774999998496,809.1774999998466,815.3774999998437,821.5774999998408,827.7774999998379,833.977499999835,840.1774999998321,846.3774999998292,852.5774999998263,858.7774999998234,868.8474999998214,875.0474999998185,881.2474999998155,887.4474999998126,893.6474999998097,899.8474999998068,523.9774999999702,530.1774999999673,536.3774999999644,542.5774999999614,548.7774999999585,554.9774999999556,561.1774999999527,567.3774999999498,573.5774999999469,579.777499999944,585.9774999999411,592.1774999999382,598.3774999999353,604.5774999999323,610.7774999999294,616.9774999999265,623.1774999999236,629.3774999999207,635.5774999999178,641.7774999999149,647.977499999912,654.1774999999091,660.3774999999061,666.5774999999032,672.7774999999003,678.9774999998974,685.1774999998945,691.3774999998916,697.5774999998887,703.7774999998858,709.9774999998829,716.17749999988,722.377499999877,728.5774999998741]
- run.curseSince: 2058
- run.killer: "enemy:oil-drip"
- run.goldEarned: 2.52
- run.peakEnemies: 105
- run.grokBotHelps: 3
- counters.kills: 165
- counters.hits: 337
- counters.gems: 70
- counters.coins: 2
- counters.shots: 300
- counters.hostileShots: 185
- counters.nearMisses: 7
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 2, spent 0; spots charged and used: none; chests seen 0, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Peel Out 41% over Spud Lob 40%, Tailgate Fries 19%; 0:16 took Sprout Squad 56% over Seeker Sprouts 26%, Hot Start 18%; 0:23 took Seeker Sprouts 84% over Salt Shaker 11%, Hearty Helping 5%; 0:34 took Thick Skin 49% over Seeker Sprouts 32%, Sprout Squad 19%.
