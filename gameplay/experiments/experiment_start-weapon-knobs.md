# Do spud-lob, starch-bolt and spud-cannon live 5:00 with the opening knobs on?

| Field | Value |
| --- | --- |
| Status | done |
| Area | build |
| Result | refuted |
| Created | L3.I1 |
| Updated | L3.I4 |

## Hypothesis

Seeker-sprouts depends on Fertilizer, which the planner rarely takes, so it stays weak unless chests level it. A start with an attractive catalyst or stronger early damage (spud-lob with butter-pat, starch-bolt, spud-cannon) opens more chests, evolves sooner and lives 5:00 on more fresh seeds than seeker-sprouts with the same knobs.

## Method

Fresh games from 0:00, 300 s, playbook knobs unchanged. L3.I1: spud-lob on seeds 31-33, starch-bolt on 31-32. Next: starch-bolt 33, spud-cannon 31-33, then seeds 34-35 for any arm that looks promising. Baseline is seeker-sprouts with knobs on seeds 31-35: 5:00, 5:00, 3:05, 5:00, 2:39. A start enters the playbook only if it lives on at least 4 of 5 paired seeds.

## Findings

Seeds 31-35 with the knobs: seeker-sprouts 3 of 5 lived, starch-bolt 3 of 5, spud-lob 1 of 3, spud-cannon 0 of 3. No alternative start beats seeker-sprouts, so the start stays and no playbook change is made.

## Games

### L3.I1.G1: spud-lob knobs s31

- Start: a fresh game on Nightmare 1 with spud-lob, seed 31; 300s; plays the playbook.
- Outcome: died after 144.3s (game clock 02:24); damage taken 120 (enemy:compost-maggot 2.357, enemy:cave-grub 4.851, enemy:sprout-mite 12.464, enemy:crumb-ant 19.595); 242 kills; level 1 to 7; planner asked 47 times, action model 370; the models saw the game 28 ms late (p90 47); ended with spud-lob 1, sprout-squad 1, harvest-moon 2, peel-out 1, starch-plating 2.
- run.timeSec: 144.317
- run.level: 6
- run.kills: 242
- run.damageBySource: spud-lob 2447.357, sprout-squad 533.416, harvest-moon 1716.348
- run.damageTakenBySource: enemy:compost-maggot 2.357, enemy:cave-grub 4.851, enemy:sprout-mite 12.464, enemy:crumb-ant 19.595, enemy:lint-bunny 3.16, enemy:aphid 8.255, enemy:garden-slug 3.189, enemy:wireworm-larva 16.091, enemy:bog-slime 1.821, enemy:potato-beetle 27.928, enemy:oil-drip 3.787, enemy:sand-crab 10.064, enemy:fry-fly 2.413, enemy:ketchup-drop 3.852, Brambles 0.18
- run.killsBySource: spud-lob 145, sprout-squad 17, harvest-moon 80
- run.biomes: ["compost-caves","peel-forest","mash-swamp","chip-canyons","fry-oil-desert","frozen-tundra","coin-laundromat"]
- run.distance: 9056.98
- run.dodgePoints: 817.863
- run.dodgeSecond: 144
- run.dodgeTaken: [119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,104.85429594850066,106.33886189051105,106.33886189051105,106.33886189051105,106.33886189051105,110.80867522384439,110.80867522384439,114.38452589051106,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,117.96037655717772,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601,119.82725832605601]
- run.dodgeSteps: [755.7246666666917,761.9246666666943,768.1246666666968,774.3246666666994,780.5246666667019,786.7246666667045,792.924666666707,801.704666666709,809.1946666667114,815.394666666714,821.5946666667144,827.7946666667115,833.9946666667086,844.0646666667066,850.2646666667036,856.4646666667007,862.6646666666978,868.8646666666949,875.064666666692,881.2646666666891,887.4646666666862,897.5346666666843,903.7346666666814,498.3113333333158,505.8013333333167,512.0013333333193,518.2013333333218,524.4013333333244,530.6013333333269,540.6713333333288,546.8713333333275,553.071333333329,559.2713333333315,564.1280000000002,571.0979999999988,576.6779999999962,582.877999999997,589.0779999999995,597.3913333333328,603.5913333333317,608.2413333333304,614.441333333332,620.6413333333345,630.7113333333356,636.9113333333338,643.1113333333309,649.311333333328,659.3813333333264,665.5813333333281,671.7813333333306,677.9813333333332,684.1813333333357,694.2513333333376,700.4513333333401,706.6513333333427,712.7480000000119,716.9846666666803,727.0546666666821,733.2546666666847,739.4546666666872,745.6546666666898]
- run.curseSince: 6018
- run.killer: "Brambles"
- run.goldEarned: 14.385
- run.elitesKilled: 1
- run.peakEnemies: 100
- run.grokBotHelps: 3
- counters.kills: 242
- counters.hits: 498
- counters.gems: 148
- counters.coins: 3
- counters.shots: 108
- counters.hostileShots: 156
- counters.nearMisses: 2
- Gold, spots and chests: gold held at the end 14, spent 0; spots charged and used: Tater Lantern 1; chests seen 1, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:35 took Sprout Squad 61% over Spud Lob 35%, Hearty Helping 4%; 0:37 took Peel Out 47% over Fry Cook Sentry 30%, Grab Bag 23%; 0:49 took Harvest Moon 83% over Spud Lob 15%, Slow Cooker 2%; 1:07 took Harvest Moon 39% over Packed Pan 35%, Peel Out 26%; 1:30 took Starch Plating 87% over Peel Out 12%, Salt Shaker 1%; 1:40 took Starch Plating 78% over Chip Shuriken 15%, Spud Lob 7%.

### L3.I1.G2: spud-lob knobs s32

- Start: a fresh game on Nightmare 1 with spud-lob, seed 32; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 05:00), health 116/145; damage taken 176 (enemy:sprout-mite 2.275, enemy:aphid 3.866, enemy:compost-maggot 1.169, enemy:frost-flea 2.294); 2776 kills; level 1 to 18; planner asked 117 times, action model 661; the models saw the game 30 ms late (p90 49); ended with sack-of-russets 1, potato-battery 2, root-cellar 2, grab-bag 1, fry-knives 1, tater-mines 1, gravy-heart 1, peel-out 3, butter-pat 4, stuffed-skin 1.
- run.timeSec: 300.033
- run.level: 17
- run.kills: 2776
- run.damageBySource: spud-lob 15057.517, potato-battery 11856.772, root-cellar 11621.722, grok-bot 95.499, grab-bag 9732.612, fry-knives 6300.762, tater-mines 7972.538, sack-of-russets 19963.793
- run.damageTakenBySource: enemy:sprout-mite 2.275, enemy:aphid 3.866, enemy:compost-maggot 1.169, enemy:frost-flea 2.294, enemy:snow-mold 25.086, boss:amusing 5.082, enemy:oil-drip 1.872, enemy:spittlebug 38.834, enemy:little-grey 3.247, boss:beetle-queen 2.502, enemy:potato-beetle 50.274, enemy:sand-crab 4.342, boss:the-masher 26.874, Brambles 8.488
- run.killsBySource: spud-lob 619, potato-battery 510, root-cellar 250, grok-bot 12, grab-bag 387, fry-knives 163, tater-mines 308, sack-of-russets 527
- run.evolutions: [{"id":"sack-of-russets","at":241.55}]
- run.biomes: ["compost-caves","frozen-tundra","crop-circle","fry-oil-desert","chip-canyons","peel-forest"]
- run.distance: 15005.24
- run.dodgePoints: 2165.333
- run.dodgeSecond: 300
- run.dodgeTaken: [147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,147.35368906075388,161.51613373767475,161.51613373767475,161.51613373767475,161.51613373767475,161.51613373767475,161.51613373767475,161.51613373767475,161.51613373767475,161.51613373767475,161.51613373767475,167.71773373767476,167.71773373767476,167.71773373767476,167.71773373767476,167.71773373767476,167.71773373767476,167.71773373767476,167.71773373767476,167.71773373767476,167.71773373767476,167.71773373767476,167.71773373767476,167.71773373767476,170.43023373767477,170.43023373767477,170.43023373767477,171.83023373767477,173.84273373767476,176.20523373767477,176.20523373767477,176.20523373767477,176.20523373767477,176.20523373767477,176.20523373767477,176.20523373767477,176.20523373767477,176.20523373767477,176.20523373767477,176.20523373767477,137.01768906075387,137.01768906075387,137.01768906075387,137.01768906075387]
- run.dodgeSteps: [1213.6603333330938,1219.860333333091,1226.060333333088,1232.260333333085,1238.4603333330822,1244.6603333330793,1250.8603333330764,1257.0603333330735,1263.2603333330705,1269.4603333330676,1274.5236666663986,1274.5236666663986,1279.7936666663961,1285.9936666663932,1290.953666666391,1290.953666666391,1297.0503333330548,1303.250333333052,1307.3836666663833,1313.5836666663804,1319.7836666663775,1325.9836666663746,1332.1836666663717,1338.3836666663688,1344.5836666663658,1349.4196666663652,1353.7906666663653,1359.2673333330292,1359.2673333330292,1359.2673333330292,1359.2673333330292,1359.2673333330292,1360.610666666362,1366.810666666359,1373.0106666663562,1379.2106666663533,1385.4106666663504,1387.6839999996826,1393.4706666663465,1399.6706666663435,1405.8706666663406,1412.0706666663377,1417.960666666335,1422.9206666663326,1425.917333332998,1432.117333332995,1438.3173333329921,1444.5173333329892,1450.7173333329863,1456.9173333329834,1463.1173333329805,1469.3173333329776,1475.5173333329747,1481.7173333329717,1487.9173333329688,1494.117333332966,1500.317333332963,1200.0203333331003,1203.223666666432,1203.223666666432,1207.4603333330967]
- run.curseSince: 16528
- run.goldEarned: 412.925
- run.bossChests: 5
- run.bossesKilled: 3
- run.elitesKilled: 6
- run.peakEnemies: 156
- run.shrinesUsed: 7
- run.grokBotHelps: 8
- run.lootRunnersMet: [1,1]
- counters.kills: 2776
- counters.hits: 4270
- counters.crits: 204
- counters.gems: 1991
- counters.coins: 128
- counters.shots: 1328
- counters.hostileShots: 315
- counters.nearMisses: 34
- counters.hostileHits: 20
- shrineTotals.might: 0.06
- shrineTotals.area: 0.06
- shrineTotals.cooldown: 0.042
- shrineTotals.duration: 0.084
- shrineTotals.armor: 10
- shrineTotals.growth: 0.072
- shrineTotals.critChance: 0.048
- Gold, spots and chests: gold held at the end 412, spent 0; spots charged and used: Crop Patch 3, Spud Freezer 1, Beetle Nest 1; chests seen 9, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Potato Battery 70% over Spud Lob 19%, Gravy Heart 11%; 0:15 took Root Cellar 59% over Spud Lob 36%, Tot Toss 5%; 0:36 took Armor 63% over Damage 27%, Pickup range 10%; 0:45 took Damage 86% over Luck 9%, Crit 5%; 0:46 took Spud Lob 48% over Gem Sling 29%, Potato Battery 23%; 0:53 took Area 43% over XP gain 30%, Move speed 27%; 1:02 took Crit 72% over Cooldown 16%, Gold gain 12%; 1:10 took Grab Bag 48% over Root Cellar 24%, Stuffed Skin 18%, Reroll 10%; 1:10 took XP gain 70% over Cooldown 16%, Area 14%; 1:21 took Fry Knives 42% over Root Cellar 25%, Spud Lob 22%, Reroll 11%; 1:40 took Tater Mines 38% over Hot Potato 29%, Fry Knives 19%, Reroll 14%; 1:43 took Gravy Heart 53% over Spud Lob 33%, Reroll 10%, Rotten Spud 4%; 1:43 took Peel Out 72% over Root Cellar 15%, Reroll 8%, Tater Mines 5%; 1:56 took Butter Pat 30% over Tater Mines 29%, Gravy Splash 29%, Reroll 12%; 2:22 took Potato Battery 32% over Root Cellar 30%, Reroll 24%, Tater Mines 14%; 2:45 took Duration 67% over Gold gain 31%, Move speed 2%; 2:46 took Butter Pat 84% over Reroll 8%, Tater Mines 7%, Golden Fry 1%; 2:55 took Butter Pat 56% over Peel Out 23%, Gravy Heart 14%, Reroll 7%; 3:02 took Butter Pat 85% over Reroll 7%, Grab Bag 6%, Fry Knives 2%; 3:25 took Root Cellar 34% over Grab Bag 30%, Reroll 20%, Fry Knives 16%; 3:55 took Peel Out 66% over Reroll 16%, Tater Mines 12%, Fry Knives 6%; 4:04 took Peel Out 64% over Potato Battery 15%, Reroll 15%, Tater Mines 6%; 4:30 took Stuffed Skin 39% over Fry Knives 35%, Reroll 18%, Rotten Spud 5%, Skip 3%; 4:35 took Cooldown 76% over Max HP 23%, Move speed 1%.

### L3.I1.G3: spud-lob knobs s33

- Start: a fresh game on Nightmare 1 with spud-lob, seed 33; 300s; plays the playbook.
- Outcome: died after 123.8s (game clock 02:03); damage taken 120 (enemy:aphid 8.775, enemy:sprout-mite 2.28, enemy:potato-beetle 2.447, Spore vent 18.667); 345 kills; level 1 to 7; planner asked 44 times, action model 363; the models saw the game 28 ms late (p90 45); ended with spud-lob 4, seed-potato 1, comet-scythe 2, tailgate-fries 1, big-bowl 1, butter-pat 1.
- run.timeSec: 123.8
- run.level: 6
- run.kills: 345
- run.damageBySource: spud-lob 2075.694, seed-potato 1492.381, comet-scythe 1389.828, tailgate-fries 1181.699, grok-bot 463.245
- run.damageTakenBySource: enemy:aphid 8.775, enemy:sprout-mite 2.28, enemy:potato-beetle 2.447, Spore vent 18.667, enemy:cave-grub 62.25, enemy:compost-maggot 5.872, boss:amusing 19.958
- run.killsBySource: spud-lob 111, seed-potato 76, comet-scythe 88, tailgate-fries 39, grok-bot 31
- run.biomes: ["compost-caves","peel-forest"]
- run.distance: 7177.333
- run.dodgePoints: 776.561
- run.dodgeSecond: 123
- run.dodgeTaken: [98.69998475547573,100.29162908844935,34.60810390204822,34.60810390204822,34.60810390204822,34.60810390204822,34.60810390204822,34.60810390204822,34.60810390204822,34.60810390204822,34.60810390204822,34.60810390204822,34.60810390204822,39.07791723538156,48.01754390204823,55.297671044997514,73.17692437833085,77.64673771166417,86.58636437833084,91.05617771166419,91.05617771166419,91.05617771166419,91.05617771166419,91.05617771166419,91.05617771166419,91.05617771166419,91.05617771166419,91.05617771166419,91.05617771166419,91.05617771166419,91.05617771166419,91.05617771166419,91.05617771166419,92.5764527281485,94.09672774463282,94.09672774463282,94.09672774463282,95.62646078320694,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573,98.69998475547573]
- run.dodgeSteps: [706.5733333333861,712.7733333333883,360.0133333333245,360.0133333333245,362.69999999999106,368.8999999999909,375.0999999999907,381.2999999999905,387.49999999999034,387.9133333333237,390.7033333333236,396.9033333333234,401.5533333333233,407.7533333333231,413.95333333332326,420.1533333333251,426.35333333332636,436.42333333332755,441.58999999999634,441.58999999999634,445.7233333333302,451.9233333333327,458.12333333333197,464.32333333333315,470.52333333333263,476.7233333333318,482.92333333333374,489.1233333333319,495.323333333329,501.52333333332945,507.7233333333285,513.9233333333311,520.1233333333337,526.3233333333362,536.3933333333381,542.593333333339,548.7933333333395,554.9933333333421,561.1933333333426,567.393333333344,573.5933333333439,579.7933333333438,585.9933333333454,596.0633333333474,602.2633333333499,608.4633333333525,614.663333333355,620.8633333333576,630.9333333333594,637.133333333362,643.3333333333645,649.5333333333671,652.3233333333682,656.9733333333701,663.1733333333726,669.3733333333752,675.5733333333777,681.7733333333803,687.9733333333828,694.1733333333854,700.3733333333864]
- run.curseSince: 5439
- run.killer: "boss:amusing"
- run.goldEarned: 100.508
- run.bossChests: 2
- run.elitesKilled: 2
- run.peakEnemies: 91
- run.grokBotHelps: 1
- run.botSwarms: 1
- counters.kills: 345
- counters.hits: 554
- counters.gems: 113
- counters.coins: 26
- counters.shots: 482
- counters.hostileShots: 10
- counters.nearMisses: 3
- Gold, spots and chests: gold held at the end 100, spent 0; spots charged and used: Crop Patch 2, Spud Freezer 1; chests seen 2, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:13 took Seed Potato 59% over Mash Golem 27%, Butter Socks 14%; 0:23 took Comet Scythe 89% over Spud Lob 8%, Slow Cooker 3%; 0:32 took Tailgate Fries 44% over Seed Potato 28%, Spud Lob 28%; 0:52 took Comet Scythe 91% over Hearty Helping 6%, Golden Fry 3%; 1:10 took Spud Lob 49% over Seed Potato 39%, Leave 8%, Tailgate Fries 4%; 1:18 took Big Bowl 34% over Comet Scythe 32%, Fry Lance 25%, Reroll 9%; 1:30 took Butter Pat 74% over Peeler 17%, Reroll 6%, Fertilizer 3%.

### L3.I1.G4: starch-bolt knobs s31

- Start: a fresh game on Nightmare 1 with starch-bolt, seed 31; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 05:00), health 130/134; damage taken 90 (enemy:aphid 2.28, Hot oil 22.167, enemy:oil-drip 6.575, enemy:crumb-ant 10.099); 3141 kills; level 1 to 17; planner asked 117 times, action model 518; the models saw the game 29 ms late (p90 48); ended with thunder-tuber 1, potato-rain 1, julienne-dash 7, eclipse-scythe 1, mezzaluna 1, broadside 1, big-bowl 1, gravy-heart 1, sprouting-eyes 1, butter-pat 2, butter-socks 2, masher-grip 2.
- run.timeSec: 300.017
- run.level: 16
- run.kills: 3141
- run.damageBySource: starch-bolt 7818.272, julienne-dash 1255.741, potato-rain 1985.563, comet-scythe 2199.314, grok-bot 227.487, mezzaluna 1225.485, broadside 1251.36, eclipse-scythe 37198.22, alex 2421.694, thunder-tuber 43166.941
- run.damageTakenBySource: enemy:aphid 2.28, Hot oil 22.167, enemy:oil-drip 6.575, enemy:crumb-ant 10.099, enemy:fry-fly 13.464, enemy:sprout-mite 1.28, enemy:sand-crab 10.43, boss:amusing 9.979, enemy:lint-bunny 2.084, boss:the-masher 11.197
- run.killsBySource: starch-bolt 422, julienne-dash 37, potato-rain 72, comet-scythe 72, grok-bot 13, mezzaluna 39, broadside 35, eclipse-scythe 1212, alex 92, thunder-tuber 1147
- run.evolutions: [{"id":"eclipse-scythe","at":112.86666666666666},{"id":"thunder-tuber","at":190.38333333333333}]
- run.biomes: ["fry-oil-desert","chip-canyons","mash-swamp","peel-forest","coin-laundromat"]
- run.distance: 17120.994
- run.dodgePoints: 2521.614
- run.dodgeSecond: 300
- run.dodgeTaken: [74.18911106335109,74.18911106335109,74.18911106335109,74.18911106335109,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,85.38644439668442,89.38644439668445,89.55311106335111,89.55311106335111,89.55311106335111,89.55311106335111,89.55311106335111,89.55311106335111,89.55311106335111,89.55311106335111,89.55311106335111,89.55311106335111,89.55311106335111,74.18911106335109,74.18911106335109,74.18911106335109,74.18911106335109]
- run.dodgeSteps: [1365.0895466669226,1371.5375466669266,1377.9855466669305,1384.4335466669345,1390.8815466669384,1395.7175466669414,1402.1655466669454,1408.6135466669493,1415.0615466669533,1421.5095466669572,1427.9575466669612,1434.4055466669652,1440.8535466669691,1447.301546666973,1453.749546666977,1453.749546666977,1454.0719466669773,1460.5199466669812,1466.9679466669852,1473.4159466669892,1479.8639466669931,1486.311946666997,1492.759946667001,1499.207946667005,1505.655946667009,1512.103946667013,1518.5519466670169,1524.9999466670208,1531.4479466670248,1537.8959466670287,1544.3439466670327,1550.7919466670367,1557.2399466670406,1563.6879466670446,1570.1359466670485,1576.5839466670525,1583.0319466670564,1589.4799466670604,1595.9279466670644,1602.3759466670683,1608.8239466670723,1615.2719466670762,1621.7199466670802,1628.1679466670842,1634.615946667088,1641.063946667092,1647.511946667096,1653.9599466671,1660.407946667104,1666.855946667108,1673.3039466671119,1679.7519466671158,1686.1999466671198,1692.6479466671237,1699.0959466671277,1705.5439466671316,1711.9919466671356,1341.0170133335746,1347.4650133335786,1352.1935466669147,1358.6415466669187]
- run.curseSince: 15402
- run.goldEarned: 768.582
- run.goldSpent: 102
- run.bossChests: 9
- run.paidChests: 2
- run.bossesKilled: 3
- run.elitesKilled: 6
- run.peakEnemies: 197
- run.shrinesUsed: 1
- run.grokBotHelps: 7
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 3141
- counters.hits: 3337
- counters.gems: 1530
- counters.coins: 115
- counters.shots: 1698
- counters.hostileShots: 36
- counters.nearMisses: 2
- counters.hostileHits: 1
- shrineTotals.area: 0.084
- Gold, spots and chests: gold held at the end 666, spent 95 (Potato Crate 95); spots charged and used: Crop Patch 2, Tater Lantern 2, Potato Crate 2, Beetle Nest 1; chests seen 9, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:16 took Potato Rain 49% over Starch Bolt 33%, Fry Knives 18%; 0:24 took Julienne Dash 76% over Butter Socks 16%, Starch Bolt 8%; 0:36 took Comet Scythe 70% over Julienne Dash 27%, Gravy Boat 3%; 0:47 took Comet Scythe 73% over Julienne Dash 16%, Leave 6%, Potato Rain 5%; 1:02 took Area 64% over Armor 29%, Damage 7%; 1:03 took Mezzaluna 82% over Peel Phantom 15%, Tater Trot 3%; 1:26 took Comet Scythe 91% over Potato Rain 5%, Starch Bolt 4%; 1:32 took Comet Scythe 58% over Salt Line 18%, Frozen Fries 18%, Reroll 6%; 1:38 took Big Bowl 79% over Potato Battery 16%, Reroll 3%, Mezzaluna 2%; 1:41 took Broadside 74% over Lean Lunch 16%, Reroll 6%, Sprouting Eyes 4%; 2:06 took Gravy Heart 35% over Starch Bolt 31%, Sprouting Eyes 23%, Reroll 11%; 2:40 took Sprouting Eyes 42% over Broadside 26%, Reroll 18%, Potato Rain 14%; 2:48 took Butter Pat 60% over Reroll 19%, Potato Rain 13%, Mezzaluna 7%, Skip 1%; 3:24 took Butter Socks 49% over Broadside 20%, Reroll 17%, Sprouting Eyes 12%, Skip 2%; 3:54 took Masher Grip 45% over Gravy Heart 24%, Reroll 17%, Mezzaluna 12%, Skip 2%; 4:01 took Masher Grip 49% over Broadside 28%, Reroll 16%, Mezzaluna 5%, Skip 2%; 4:01 took Butter Pat 62% over Butter Socks 15%, Potato Rain 11%, Reroll 11%, Skip 1%; 4:16 took Butter Socks 30% over Gravy Heart 29%, Reroll 24%, Mezzaluna 15%, Skip 2%.

### L3.I1.G5: starch-bolt knobs s32

- Start: a fresh game on Nightmare 1 with starch-bolt, seed 32; 300s; plays the playbook.
- Outcome: died after 261.6s (game clock 04:21); damage taken 271 (enemy:cave-grub 14.051, enemy:snow-mold 40.814, enemy:compost-maggot 10.652, enemy:aphid 31.05); 1567 kills; level 1 to 15; planner asked 91 times, action model 767; the models saw the game 27 ms late (p90 47); ended with starch-bolt 2, tater-twirl 6, potato-rain 1, seed-potato 1, salt-shaker 4, chives 1, gravy-heart 2.
- run.timeSec: 261.567
- run.level: 14
- run.kills: 1567
- run.damageBySource: starch-bolt 10110.614, tater-twirl 25562.774, potato-rain 4423.533, seed-potato 9154.986
- run.damageTakenBySource: enemy:cave-grub 14.051, enemy:snow-mold 40.814, enemy:compost-maggot 10.652, enemy:aphid 31.05, Brambles 15.7, boss:amusing 22.175, enemy:sprout-mite 11.852, boss:beetle-queen 19.039, Hot oil 20.4, boss:the-masher 80.621, enemy:dumpster-raccoon 4.908
- run.killsBySource: starch-bolt 357, tater-twirl 754, potato-rain 164, seed-potato 292
- run.biomes: ["frozen-tundra","compost-caves","peel-forest","mash-swamp","fry-palace","ketchup-bog","fry-oil-desert"]
- run.distance: 14769.197
- run.dodgePoints: 1754.528
- run.dodgeSecond: 261
- run.dodgeTaken: [174.0769902370749,174.0769902370749,174.0769902370749,174.0769902370749,190.18268875513044,192.90253875513045,192.90253875513045,192.90253875513045,192.90253875513045,192.90253875513045,192.90253875513045,195.62238875513046,195.62238875513046,195.62238875513046,195.62238875513046,195.62238875513046,224.23385542179713,246.62852208846377,142.79759023707493,145.5174402370749,145.5174402370749,145.5174402370749,145.5174402370749,145.5174402370749,145.5174402370749,145.5174402370749,145.5174402370749,145.5174402370749,145.5174402370749,145.5174402370749,145.5174402370749,145.5174402370749,148.23729023707492,148.23729023707492,148.23729023707492,148.23729023707492,148.23729023707492,148.23729023707492,150.95714023707492,150.95714023707492,150.95714023707492,150.95714023707492,150.95714023707492,150.95714023707492,150.95714023707492,156.4238069037416,159.35714023707493,167.3571402370749,171.3571402370749,171.3571402370749,171.3571402370749,171.3571402370749,171.3571402370749,174.0769902370749,174.0769902370749,174.0769902370749,174.0769902370749,174.0769902370749,174.0769902370749,174.0769902370749,174.0769902370749]
- run.dodgeSteps: [1379.5693333331067,1383.8059999997713,1390.0059999997684,1394.2529999997648,1400.452999999762,1404.0696666664269,1409.8563333330908,1416.0563333330879,1422.256333333085,1426.6996666664163,1431.9696666664138,1438.1696666664109,1444.369666666408,1450.569666666405,1456.7696666664021,1462.9696666663992,1469.1696666663963,1475.3696666663934,1149.047333333205,1154.6273333332024,1160.6206666665328,1165.4773333331973,1175.5473333331952,1181.7473333331923,1187.9473333331894,1191.047333333188,1197.247333333185,1207.3173333331831,1210.2106666665152,1214.4473333331798,1220.647333333177,1229.8573333331747,1235.2639999998396,1236.193999999839,1240.4306666665038,1246.630666666501,1253.1206666664993,1261.040666666497,1267.240666666494,1270.1339999998258,1276.333999999823,1282.53399999982,1288.7339999998171,1294.9339999998142,1301.1339999998113,1304.2339999998098,1310.2273333331405,1316.4273333331375,1321.0773333331354,1327.0839999998013,1334.1439999997988,1340.3439999997959,1346.543999999793,1349.0239999997916,1353.777333333123,1357.2906666664544,1357.6006666664543,1363.283999999785,1367.9494999997817,1370.2796666664458,1374.5059999997757]
- run.curseSince: 14181
- run.killer: "boss:the-masher"
- run.goldEarned: 183.745
- run.bossChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 192
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 1567
- counters.hits: 2194
- counters.gems: 1458
- counters.coins: 62
- counters.shots: 199
- counters.hostileShots: 360
- counters.nearMisses: 12
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 183, spent 0; spots charged and used: Frenzy Fryer 2, Tater Lantern 1, Spud Freezer 1; chests seen 6, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:18 took Tater Twirl 65% over Starch Bolt 28%, Masher Grip 7%; 0:27 took Tater Twirl 57% over Tater Mines 27%, Stuffed Skin 16%; 0:41 took Potato Rain 50% over Mash Wave 33%, Afterburner Fries 17%; 0:45 took Tater Twirl 70% over Potato Rain 13%, Starch Bolt 10%, Leave 7%; 0:55 took Salt Shaker 46% over Big Bowl 33%, Starch Bolt 21%; 1:08 took Tater Twirl 72% over Starch Puddle 18%, Reroll 6%, Spud Lob 4%; 1:20 took Tater Twirl 75% over Stuffed Skin 12%, Reroll 9%, Potato Rain 3%, Skip 1%; 1:49 took Seed Potato 47% over Tater Twirl 28%, Salt Shaker 18%, Reroll 6%, Skip 1%; 2:10 took Salt Shaker 58% over Seed Potato 21%, Reroll 11%, Potato Rain 8%, Skip 2%; 2:10 took Salt Shaker 44% over Chives 36%, Reroll 11%, Potato Rain 8%, Skip 1%; 2:34 took Salt Shaker 44% over Locked Gatling 43%, Reroll 7%, Deep Fryer 4%, Skip 2%; 3:16 took Chives 55% over Potato Rain 28%, Reroll 11%, Hearty Helping 4%, Skip 2%; 3:19 took Gravy Heart 69% over Mash Mallet 14%, Seed Potato 10%, Reroll 6%, Skip 1%; 3:56 took Gravy Heart 74% over Steam Vent 14%, Reroll 7%, Starch Bolt 4%, Skip 1%; 4:19 took Starch Bolt 54% over Reroll 18%, Potato Magnet 15%, Golden Fry 10%, Skip 3%.

### L3.I2.G1: starch-bolt knobs s33

- Start: a fresh game on Nightmare 1 with starch-bolt, seed 33; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 155/155; damage taken 107 (enemy:aphid 7.758, enemy:sprout-mite 4.453, enemy:compost-maggot 17.787, Spore vent 46.533); 2266 kills; level 1 to 16; planner asked 118 times, action model 580; the models saw the game 29 ms late (p90 49); ended with starch-bolt 1, tater-twister 1, fry-sentry 1, spark-corral 1, fry-lance 1, seed-potato 3, salt-shaker 1, gpu 1, chives 1, peel-out 1.
- run.timeSec: 300.1
- run.level: 15
- run.kills: 2266
- run.damageBySource: starch-bolt 10416.134, tater-twirl 5689.139, fry-sentry 9502.047, spud-fence 7120.341, fry-lance 6386.905, seed-potato 8261.819, grok-bot 177.492, tater-twister 32651.515, spark-corral 8090.738
- run.damageTakenBySource: enemy:aphid 7.758, enemy:sprout-mite 4.453, enemy:compost-maggot 17.787, Spore vent 46.533, enemy:bog-slime 2.113, enemy:cave-grub 3.145, enemy:potato-beetle 3.983, Hot oil 9.733, boss:the-masher 11.197
- run.killsBySource: starch-bolt 299, tater-twirl 273, fry-sentry 241, spud-fence 228, fry-lance 155, seed-potato 202, grok-bot 11, tater-twister 637, spark-corral 220
- run.evolutions: [{"id":"tater-twister","at":185.16666666666666},{"id":"spark-corral","at":243.63333333333333}]
- run.biomes: ["peel-forest","compost-caves","mash-swamp","ketchup-bog"]
- run.distance: 15452.777
- run.dodgePoints: 2458.036
- run.dodgeSecond: 300
- run.dodgeTaken: [103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,103.50235606079464,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,106.70235606079463,92.3050227274613,92.3050227274613,103.50235606079464,103.50235606079464]
- run.dodgeSteps: [1252.1519999998648,1258.3519999998618,1264.551999999859,1270.751999999856,1276.9519999998531,1283.1519999998502,1289.3519999998473,1295.5519999998444,1301.7519999998415,1306.8824999998383,1310.6179999998344,1316.8179999998315,1323.0179999998286,1329.2179999998257,1335.4179999998228,1341.6179999998199,1347.817999999817,1354.017999999814,1360.2179999998111,1366.4179999998082,1372.6179999998053,1377.748499999802,1379.0556666664675,1381.044833333132,1384.4548333331281,1387.8648333331244,1392.0188333331207,1398.2188333331178,1404.418833333115,1410.618833333112,1416.818833333109,1423.0188333331062,1426.7388333331044,1426.7388333331044,1426.7388333331044,1431.3888333331022,1437.5888333330993,1443.7888333330964,1449.9888333330935,1456.1888333330905,1462.3888333330876,1468.5888333330847,1474.7888333330818,1480.849333333079,1484.2593333330751,1489.0643333330718,1495.2643333330689,1499.9143333330667,1503.634333333065,1508.387666666396,1508.387666666396,1514.17433333306,1520.3743333330572,1526.5743333330543,1532.7743333330513,1538.9743333330484,1544.657666666379,1234.7919999998728,1240.99199999987,1247.191999999867,1251.531999999865]
- run.curseSince: 14495
- run.goldEarned: 529.662
- run.bossChests: 8
- run.bossesKilled: 3
- run.elitesKilled: 6
- run.peakEnemies: 173
- run.shrinesUsed: 3
- run.grokBotHelps: 5
- run.throttles: 4
- run.lootRunnersMet: [1]
- counters.kills: 2266
- counters.hits: 4287
- counters.gems: 1449
- counters.coins: 103
- counters.shots: 450
- counters.hostileShots: 62
- shrineTotals.maxHp: 28.8
- shrineTotals.growth: 0.072
- Gold, spots and chests: gold held at the end 529, spent 0; spots charged and used: Crop Patch 3, Tater Lantern 2, Spud Freezer 1, Beetle Nest 1; chests seen 9, opened 7.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Tater Twirl 91% over Gravy Splash 6%, Fertilizer 3%; 0:14 took Fry Cook Sentry 62% over Root Network 20%, Tater Twirl 18%; 0:22 took Spud Fence 40% over Gravy Heart 38%, Spud Decoy 22%; 0:29 took Max HP 94% over Gold gain 4%, Duration 2%; 0:37 took XP gain 76% over Cooldown 15%, Pickup range 9%; 0:48 took Max HP 88% over Pickup range 11%, Duration 1%; 0:51 took Tater Twirl 49% over Big Bowl 46%, Spry Sprout 5%; 1:32 took Fry Lance 67% over Spud Fence 17%, Thick Skin 16%; 1:52 took Spud Fence 33% over Starch Bolt 23%, Fry Cook Sentry 23%, Reroll 21%; 2:10 took Tater Twirl 39% over Mezzaluna 31%, Fry Lance 22%, Reroll 8%; 2:17 took Salt Shaker 34% over Spud Fence 29%, Reroll 21%, Fry Cook Sentry 16%; 2:34 took Seed Potato 63% over Peel Out 29%, Reroll 5%, Spud Dice 3%; 2:47 took Tater Twirl 75% over Clean Plate 11%, Fry Lance 7%, Reroll 7%; 3:08 took Spud Fence 53% over Fry Lance 21%, Reroll 17%, Fry Cook Sentry 9%; 3:37 took GPU 84% over Salt Shaker 6%, Reroll 6%, Fry Cook Sentry 4%; 3:41 took Seed Potato 36% over Salt Shaker 32%, Reroll 18%, Starch Bolt 14%; 3:43 took Chives 46% over Peel Out 38%, Fertilizer 8%, Reroll 8%; 4:01 took Peel Out 45% over Fry Cook Sentry 22%, Mash Finisher 22%, Reroll 11%.

### L3.I2.G2: spud-cannon knobs s31

- Start: a fresh game on Nightmare 1 with spud-cannon, seed 31; 300s; plays the playbook.
- Outcome: died after 230.5s (game clock 03:50); damage taken 212 (Hot oil 28.167, enemy:oil-drip 15.754, enemy:sprout-mite 3.272, enemy:compost-maggot 3.981); 1270 kills; level 1 to 13; planner asked 86 times, action model 566; the models saw the game 30 ms late (p90 52); ended with spud-cannon 4, sprout-squad 1, potato-rain 1, skipping-cannonball 4, julienne-dash 2, spud-dice 1, peel-out 1, root-network 1.
- run.timeSec: 230.5
- run.level: 12
- run.kills: 1270
- run.damageBySource: spud-cannon 7205.316, sprout-squad 3729.903, potato-rain 3583.545, skipping-cannonball 2841.157, julienne-dash 3525.778, spud-dice 4438.612, alex 5951.41
- run.damageTakenBySource: Hot oil 28.167, enemy:oil-drip 15.754, enemy:sprout-mite 3.272, enemy:compost-maggot 3.981, enemy:potato-beetle 12.444, enemy:tomato-leech 53.638, enemy:aphid 10.152, enemy:crumb-ant 15.75, enemy:ketchup-drop 1.875, boss:amusing 24.393, enemy:fry-fly 27.314, enemy:sand-crab 4.51, boss:beetle-queen 10.879
- run.killsBySource: spud-cannon 359, sprout-squad 86, potato-rain 145, skipping-cannonball 119, julienne-dash 157, spud-dice 188, alex 216
- run.biomes: ["fry-oil-desert","mash-swamp","chip-canyons"]
- run.distance: 12873.753
- run.dodgePoints: 1393.55
- run.dodgeSecond: 230
- run.dodgeTaken: [155.187371970786,157.907221970786,157.907221970786,157.907221970786,157.907221970786,157.907221970786,167.56909638702265,169.52064012846998,169.52064012846998,169.52064012846998,169.52064012846998,169.52064012846998,173.5084373873246,176.22828738732457,176.22828738732457,176.22828738732457,176.22828738732457,179.56047146393973,179.56047146393973,181.5756490681064,181.5756490681064,185.63508003974664,185.63508003974664,185.63508003974664,185.63508003974664,191.07478003974666,191.07478003974666,191.07478003974666,191.07478003974666,191.07478003974666,191.07478003974666,197.9522623704032,197.9522623704032,197.9522623704032,201.45424415090787,204.95622593141255,204.95622593141255,204.95622593141255,204.95622593141255,204.95622593141255,204.95622593141255,204.95622593141255,204.95622593141255,204.95622593141255,208.5119475494681,208.5119475494681,208.5119475494681,208.5119475494681,148.19411648278293,150.67756017163444,150.67756017163444,150.67756017163444,150.67756017163444,150.67756017163444,150.67756017163444,150.67756017163444,150.67756017163444,150.67756017163444,150.67756017163444,150.67756017163444,150.67756017163444]
- run.dodgeSteps: [1015.8919999999704,1022.0919999999675,1026.4319999999655,1029.6353333332972,1035.2153333332947,1039.7619999999592,1043.8953333332906,1047.4086666666221,1052.5753333332864,1058.7753333332835,1064.9753333332806,1071.1753333332776,1077.3753333332747,1083.5753333332718,1089.775333333269,1094.115333333267,1100.315333333264,1106.5153333332612,1112.7153333332583,1118.9153333332554,1124.598666666586,1129.7653333332503,1135.138666666581,1142.8319999999135,1149.0319999999106,1155.2319999999077,1161.4319999999047,1166.185333333236,1173.5686666665686,1178.1153333332331,1182.5586666665645,1187.4153333332288,1197.485333333227,1203.685333333224,1209.885333333221,1214.6386666665521,1220.8386666665492,1230.9086666665473,1237.1086666665444,1241.345333333209,1247.5453333332061,1248.268666666539,1251.9886666665375,1256.6386666665353,1262.8386666665324,1269.0386666665295,1275.2386666665266,1284.8786666665244,938.6553333333371,948.7253333333352,952.8586666666666,959.0586666666637,965.2586666666608,971.4586666666579,977.658666666655,983.8586666666521,990.0586666666492,996.2586666666463,1002.4586666666434,1008.6586666666404,1014.5486666666377]
- run.curseSince: 10510
- run.killer: "enemy:fry-fly"
- run.goldEarned: 174.493
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 183
- run.shrinesUsed: 1
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 1270
- counters.hits: 2343
- counters.gems: 962
- counters.coins: 61
- counters.shots: 912
- counters.hostileShots: 257
- counters.nearMisses: 5
- counters.hostileHits: 3
- shrineTotals.maxHp: 14.4
- Gold, spots and chests: gold held at the end 174, spent 0; spots charged and used: Crop Patch 1, Spud Freezer 1; chests seen 3, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:22 took Sprout Squad 55% over Spud Cannon 42%, Hearty Helping 3%; 0:33 took Potato Rain 71% over Sprout Squad 24%, Spry Sprout 5%; 0:44 took Max HP 87% over Gold gain 9%, Move speed 4%; 0:46 took Skipping Cannonball 37% over Potato Rain 35%, Mash Snowball 28%; 0:57 took Julienne Dash 80% over Aged Russet 11%, Spud Cannon 9%; 1:19 took Spud Dice 40% over Spud Cannon 32%, Tot Stampede 28%; 1:29 took Julienne Dash 53% over Skipping Cannonball 39%, Spud Dice 8%; 1:56 took Spud Cannon 45% over Potato Rain 38%, Clean Plate 17%; 1:58 took Skipping Cannonball 38% over Spud Cannon 36%, Hot Sauce 26%; 2:45 took Peel Out 63% over Skipping Cannonball 28%, Hot Sauce 9%; 2:46 took Skipping Cannonball 58% over Spud Sneakers 24%, Hot Sauce 18%; 2:55 took Root Network 77% over Spry Sprout 14%, Hot Sauce 9%; 3:20 took Skipping Cannonball 46% over Peel Out 43%, Hot Sauce 11%.

### L3.I2.G3: spud-cannon knobs s32

- Start: a fresh game on Nightmare 1 with spud-cannon, seed 32; 300s; plays the playbook.
- Outcome: died after 190.6s (game clock 03:10); damage taken 169 (Spore vent 7.2, enemy:aphid 8.018, enemy:frost-flea 1.227, enemy:snow-mold 2.526); 881 kills; level 1 to 13; planner asked 76 times, action model 470; the models saw the game 28 ms late (p90 52); ended with spud-cannon 4, fry-lance 1, spud-decoy 1, potato-rain 1, frying-pan 4, root-spikes 1, aged-russet 2, hot-sauce 1.
- run.timeSec: 190.633
- run.level: 12
- run.kills: 881
- run.damageBySource: spud-cannon 7312.923, fry-lance 3840.149, spud-decoy 3667.882, potato-rain 2171.661, frying-pan 3731.262, grok-bot 843.163, root-spikes 2949.997
- run.damageTakenBySource: Spore vent 7.2, enemy:aphid 8.018, enemy:frost-flea 1.227, enemy:snow-mold 2.526, enemy:sprout-mite 6.075, enemy:potato-beetle 63.479, enemy:wireworm-larva 4.47, Brambles 3.3, enemy:sand-crab 7.923, enemy:compost-maggot 3.068, enemy:crumb-ant 3.358, boss:amusing 23.284, enemy:bog-slime 2.37, enemy:ketchup-drop 2.373, enemy:garden-slug 4.149, enemy:oil-drip 2.363, boss:beetle-queen 23.572
- run.killsBySource: spud-cannon 275, fry-lance 137, spud-decoy 136, potato-rain 74, frying-pan 90, grok-bot 54, root-spikes 115
- run.biomes: ["compost-caves","frozen-tundra","peel-forest","chip-canyons","mash-swamp","ketchup-bog"]
- run.distance: 9549.045
- run.dodgePoints: 1190.269
- run.dodgeSecond: 190
- run.dodgeTaken: [145.18111884938452,147.90096884938453,147.90096884938453,147.90096884938453,147.90096884938453,147.90096884938453,147.90096884938453,150.6208188493845,124.15029691177476,124.15029691177476,124.15029691177476,124.15029691177476,124.15029691177476,124.15029691177476,124.15029691177476,124.15029691177476,124.15029691177476,124.15029691177476,124.15029691177476,125.880943330466,125.880943330466,125.880943330466,125.880943330466,125.880943330466,125.880943330466,125.880943330466,125.880943330466,125.880943330466,125.880943330466,125.880943330466,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,134.7721886045623,138.89858215651174,138.89858215651174,138.89858215651174,138.89858215651174,143.25121093500476,143.25121093500476,143.25121093500476,143.25121093500476,143.25121093500476,143.25121093500476,143.25121093500476,143.25121093500476,143.25121093500476,143.25121093500476,143.25121093500476]
- run.dodgeSteps: [916.0044999999509,920.8611666666153,927.0611666666124,933.2611666666095,941.7811666666082,947.9811666666053,952.3211666666033,952.3211666666033,614.290999999994,624.3609999999913,630.5609999999893,636.7609999999864,642.3409999999838,646.5776666666496,656.6476666666509,661.1943333333182,667.3943333333208,669.357666666655,672.0443333333227,676.0743333333244,678.8643333333255,688.9343333333247,695.0309999999923,699.1643333333274,705.3643333333299,711.5643333333325,717.1443333333348,722.1611666666672,728.3611666666698,734.5611666666723,740.7611666666749,746.9611666666751,747.8911666666747,747.8911666666747,754.0911666666718,760.2911666666689,766.4911666666676,772.691166666668,778.8911666666651,785.0911666666622,791.2911666666621,797.491166666661,803.6911666666581,809.891166666657,816.0911666666564,822.291166666656,828.491166666653,834.6911666666501,840.4211666666503,844.6578333333149,850.7544999999787,855.3011666666432,861.5011666666403,866.5644999999713,870.5944999999695,874.9344999999673,881.1344999999644,887.3344999999615,893.5344999999586,899.7344999999557,909.8044999999538]
- run.curseSince: 11420
- run.killer: "boss:beetle-queen"
- run.goldEarned: 201.343
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 8
- run.peakEnemies: 161
- run.shrinesUsed: 4
- run.grokBotHelps: 3
- run.botSwarms: 2
- run.lootRunnersMet: [1]
- counters.kills: 881
- counters.hits: 1206
- counters.crits: 122
- counters.gems: 676
- counters.coins: 51
- counters.shots: 651
- counters.hostileShots: 81
- counters.nearMisses: 2
- counters.hostileHits: 1
- shrineTotals.maxHp: 12
- shrineTotals.magnet: 0.18
- shrineTotals.critChance: 0.096
- Gold, spots and chests: gold held at the end 195, spent 0; spots charged and used: Spud Freezer 2; chests seen 9, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:14 took Spud Cannon 51% over Spud Dice 46%, Spry Sprout 3%; 0:15 took Fry Lance 58% over Spud Cannon 33%, Grab Bag 9%; 0:28 took Spud Decoy 84% over Spry Sprout 12%, Tater Trot 4%; 0:48 took Max HP 48% over Move speed 45%, Gold gain 7%; 1:01 took Potato Rain 78% over Hot Start 19%, Slow Cooker 3%; 1:06 took Crit 74% over Gold gain 14%, Duration 12%; 1:06 took Frying Pan 61% over Hot Sauce 18%, Spud Cannon 15%, Reroll 6%; 1:16 took Crit 41% over XP gain 30%, Gold gain 29%; 1:27 took Pickup range 72% over Duration 20%, Move speed 8%; 1:29 took Root Spikes 46% over Spud Cannon 22%, Mezzaluna 18%, Reroll 14%; 1:50 took Aged Russet 59% over Reroll 16%, Fry Lance 14%, Root Spikes 11%; 2:04 took Hot Sauce 40% over Potato Rain 28%, Reroll 22%, Spud Decoy 10%; 2:19 took Frying Pan 55% over Reroll 19%, Spud Decoy 14%, Root Spikes 12%; 2:49 took Frying Pan 66% over Spud Sneakers 18%, Reroll 10%, Fry Lance 6%; 3:09 took Aged Russet 37% over Potato Rain 30%, Reroll 21%, Fry Lance 12%; 3:10 took Frying Pan 48% over Spud Cannon 34%, Reroll 10%, Spud Decoy 8%.

### L3.I2.G4: spud-cannon knobs s33

- Start: a fresh game on Nightmare 1 with spud-cannon, seed 33; 300s; plays the playbook.
- Outcome: died after 201.6s (game clock 03:21); damage taken 252 (Hot oil 41.667, enemy:oil-drip 12.022, enemy:fry-fly 59.656, enemy:tomato-leech 5.622); 612 kills; level 1 to 10; planner asked 68 times, action model 558; the models saw the game 29 ms late (p90 49); ended with spud-cannon 1, frying-pan 5, tater-pup 1, peel-lash 1, sour-cream 2, starch-plating 1.
- run.timeSec: 201.617
- run.level: 9
- run.kills: 612
- run.damageBySource: spud-cannon 5296.633, frying-pan 5888.972, tater-pup 2476.676, peel-lash 3750.17
- run.damageTakenBySource: Hot oil 41.667, enemy:oil-drip 12.022, enemy:fry-fly 59.656, enemy:tomato-leech 5.622, enemy:crumb-ant 10.18, enemy:sprout-mite 4.055, boss:amusing 5.629, enemy:bowling-ball 31.941, enemy:bowling-pin 10.713, enemy:ketchup-drop 7.392, enemy:garden-slug 31.304, boss:beetle-queen 22.397, enemy:beetle-brood 7.001, enemy:bog-slime 1.933
- run.killsBySource: spud-cannon 214, frying-pan 194, tater-pup 46, peel-lash 158
- run.biomes: ["fry-oil-desert","coin-laundromat","chip-canyons","gutterball-lanes","peel-forest","mash-swamp"]
- run.distance: 11595.3
- run.dodgePoints: 1092.598
- run.dodgeSecond: 201
- run.dodgeTaken: [162.42852285692757,166.58582687676417,188.0467833967732,200.71376498669252,204.08622612259364,204.08622612259364,204.08622612259364,206.4031353818529,213.50278916636978,217.00582574104237,219.00936049614694,219.00936049614694,219.00936049614694,227.3690707433841,232.8707801390001,239.38674985158988,246.39282742283083,247.92981714520076,247.92981714520076,124.9118120145292,124.9118120145292,124.9118120145292,124.9118120145292,128.37938711790298,128.37938711790298,137.48699185348792,137.48699185348792,137.48699185348792,137.48699185348792,137.48699185348792,145.12661483521651,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,150.41835754923352,154.1268786678549,162.42852285692757,162.42852285692757]
- run.dodgeSteps: [1055.5763333332775,1061.7763333332746,1067.9763333332717,1074.1763333332688,1080.3763333332658,1086.576333333263,1092.59033333326,1096.0003333332563,1099.4103333332525,1108.9223333332504,1115.1223333332475,1119.4623333332454,1125.6623333332425,1130.4208333332392,1133.8308333332354,1137.2408333332316,1146.6133333332295,1151.7799999998938,1155.7066666665585,848.4033333333613,853.1566666666962,857.0420000000338,863.2420000000309,869.442000000028,873.8853333333593,880.0853333333564,886.2853333333535,892.278666666684,892.278666666684,892.6920000000171,892.6920000000171,898.6853333333477,904.8853333333448,911.0853333333419,917.2853333333389,923.485333333336,929.6853333333331,935.8853333333302,941.1759999999967,945.5159999999996,951.7159999999967,957.9159999999938,964.1159999999909,970.315999999988,976.5159999999851,982.7159999999822,988.9159999999792,995.1159999999763,1001.3159999999734,1007.5159999999705,1013.7159999999676,1019.1254999999644,1022.9539999999608,1028.3634999999576,1033.7729999999544,1039.9729999999515,1042.246333333284,1044.829666666616,1047.3096666666147,1047.3096666666147,1050.4096666666132]
- run.curseSince: 9125
- run.killer: "enemy:garden-slug"
- run.goldEarned: 120.325
- run.bossChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 4
- run.peakEnemies: 173
- run.shrinesUsed: 1
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 612
- counters.hits: 1074
- counters.gems: 376
- counters.coins: 41
- counters.shots: 536
- counters.hostileShots: 94
- counters.nearMisses: 6
- shrineTotals.maxHp: 14.4
- Gold, spots and chests: gold held at the end 120, spent 0; spots charged and used: Crop Patch 1, Beetle Nest 1; chests seen 5, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:22 took Sour Cream 82% over Hearty Helping 10%, Golden Fry 8%; 0:35 took Frying Pan 60% over Spud Cannon 21%, GPU 19%; 0:41 took Tater Tot Pup 73% over Gem Sling 14%, Spud Sneakers 13%; 0:49 took Frying Pan 71% over Sprouting Eyes 24%, Potato Magnet 5%; 1:25 took Frying Pan 54% over Seed Potato 29%, Spud Lob 17%; 1:33 took Peel Lash 58% over Spud Cannon 22%, Reroll 12%, Slow Cooker 8%; 1:47 took Starch Plating 67% over Four-Eyed Spud 24%, Reroll 7%, Potato Magnet 2%; 2:31 took Max HP 92% over Gold gain 5%, Move speed 3%; 2:32 took Sour Cream 49% over Peel Lash 19%, Reroll 18%, Bacon Bits 14%; 3:07 took Frying Pan 84% over Reroll 9%, Afterburner Fries 6%, Slow Cooker 1%.

### L3.I3.G1: starch-bolt knobs s34

- Start: a fresh game on Nightmare 1 with starch-bolt, seed 34; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 05:00), health 76/120; damage taken 136 (enemy:aphid 1.14, enemy:potato-beetle 60.847, Spore vent 9.333, boss:amusing 39.915); 2854 kills; level 1 to 17; planner asked 110 times, action model 404; the models saw the game 30 ms late (p90 50); ended with thunder-tuber 1, hot-streak 1, reset-button 6, gem-sling 1, whisk-vortex 2, potato-battery 1, butter-pat 2, sprouting-eyes 3, peel-out 1.
- run.timeSec: 300.283
- run.level: 16
- run.kills: 2854
- run.damageBySource: starch-bolt 6705.816, hot-streak 8158.267, dog:saluki 1450.796, reset-button 2741.946, grok-bot 1565.792, gem-sling 15260.899, thunder-tuber 52320.882, whisk-vortex 11551.223, potato-battery 4411.96
- run.damageTakenBySource: enemy:aphid 1.14, enemy:potato-beetle 60.847, Spore vent 9.333, boss:amusing 39.915, Brambles 2.4, boss:the-masher 22.395
- run.killsBySource: starch-bolt 377, hot-streak 238, dog:saluki 47, reset-button 78, grok-bot 73, gem-sling 320, thunder-tuber 1380, whisk-vortex 246, potato-battery 95
- run.evolutions: [{"id":"thunder-tuber","at":144.83333333333334}]
- run.biomes: ["fry-oil-desert","ketchup-bog","peel-forest","compost-caves","frozen-tundra","mash-swamp","chip-canyons"]
- run.dogs: [{"id":"saluki","at":57.46666666666667},{"id":"retriever","at":72.35}]
- run.dogHelp: damage.saluki 1450.796, hits.saluki 66, fetched.retriever 1152
- run.distance: 17458.253
- run.dodgePoints: 2363.872
- run.dodgeSecond: 300
- run.dodgeTaken: [84.32687900185991,84.32687900185991,84.32687900185991,84.32687900185991,84.32687900185991,84.32687900185991,84.32687900185991,84.32687900185991,84.32687900185991,84.32687900185991,99.09932476122991,106.48554764091492,121.25799340028492,121.25799340028492,121.25799340028492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,136.03043915965492,61.932212335193235,61.932212335193235,61.932212335193235,61.932212335193235]
- run.dodgeSteps: [1427.5198266668945,1430.7438266668964,1431.1736933335635,1437.6216933335675,1444.0696933335714,1450.5176933335754,1453.526760000244,1459.6523600002477,1464.703293333584,1469.2168933335868,1473.7304933335895,1478.5664933335925,1482.7576933335952,1489.2056933335991,1495.653693333603,1502.101693333607,1508.549693333611,1514.997693333615,1521.445693333619,1527.8936933336229,1534.3416933336268,1540.7896933336308,1547.2376933336348,1553.6856933336387,1560.1336933336427,1566.5816933336466,1573.0296933336506,1579.4776933336545,1585.9256933336585,1592.3736933336625,1598.8216933336664,1605.2696933336704,1611.7176933336743,1618.1656933336783,1624.6136933336822,1631.0616933336862,1637.5096933336902,1643.957693333694,1649.545960000364,1651.6952933336986,1658.1432933337026,1664.5912933337065,1670.0076133337075,1674.5212133337059,1680.9369733337098,1687.3849733337138,1693.8329733337177,1700.2809733337217,1706.7289733337257,1712.2097733337268,1717.5616133337276,1724.0096133337315,1730.4576133337355,1736.9056133337394,1741.4192133337424,1741.4192133337424,1743.9984133337439,1401.7278266668786,1408.1758266668826,1414.6238266668865,1421.0718266668905]
- run.curseSince: 13108
- run.goldEarned: 463.69
- run.bossChests: 5
- run.bossesKilled: 3
- run.elitesKilled: 10
- run.peakEnemies: 155
- run.grokBotHelps: 6
- run.botSwarms: 2
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2854
- counters.hits: 6459
- counters.gems: 2039
- counters.coins: 115
- counters.shots: 1712
- counters.hostileShots: 144
- counters.nearMisses: 6
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 463, spent 0; spots charged and used: Stray Dog 2, Beetle Nest 2, Crop Patch 1, Spud Freezer 1, Tater Lantern 1, Tater Magnet 1; chests seen 13, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Starch Bolt 42% over Tater Tot Pup 42%, Small Fry 16%; 0:20 took Butter Pat 86% over Slow Cooker 11%, Bacon Bits 3%; 0:23 took Hot Streak 72% over Starch Bolt 21%, Masher Grip 7%; 0:38 took Butter Pat 51% over Fry Knives 42%, Starch Bolt 7%; 1:13 took Reset Button 75% over Hot Streak 19%, Starch Bolt 6%; 1:28 took Gem Sling 42% over Mash Finisher 36%, Reroll 12%, Clean Plate 10%; 1:43 took Sprouting Eyes 62% over Rösti Disc 23%, Thick Skin 9%, Reroll 6%; 2:04 took Sprouting Eyes 66% over Packed Pan 17%, Big Bowl 11%, Reroll 6%; 2:13 took Sprouting Eyes 66% over Reset Button 27%, Reroll 4%, Hot Streak 3%; 2:28 took Whisk Vortex 53% over Butter Pat 37%, Reroll 7%, Slow Cooker 2%, Skip 1%; 2:57 took Reset Button 40% over Mash Snowball 38%, Mash Finisher 13%, Reroll 7%, Skip 2%; 3:22 took Potato Battery 57% over Fry Cook Sentry 22%, Reroll 11%, Mezzaluna 7%, Skip 3%; 3:38 took Peel Out 62% over Whisk Vortex 24%, Reroll 9%, Gem Sling 4%, Skip 1%; 3:40 took Reset Button 66% over Hot Streak 15%, Clean Plate 10%, Reroll 8%, Skip 1%; 4:03 took Reset Button 63% over Butter Pat 17%, Four-Eyed Spud 13%, Reroll 6%, Skip 1%; 4:39 took Whisk Vortex 38% over Four-Eyed Spud 37%, Reroll 12%, Slow Cooker 10%, Skip 3%.

### L3.I3.G2: starch-bolt knobs s35

- Start: a fresh game on Nightmare 1 with starch-bolt, seed 35; 300s; plays the playbook.
- Outcome: died after 134.9s (game clock 02:14); damage taken 129 (Hot oil 6.8, Brambles 4.3, enemy:garden-slug 25.355, enemy:sand-crab 15.644); 387 kills; level 1 to 9; planner asked 50 times, action model 258; the models saw the game 31 ms late (p90 51); ended with starch-bolt 6, hash-brown-shield 2, comet-scythe 1, skipping-cannonball 1, sprouting-eyes 2.
- run.timeSec: 134.85
- run.level: 8
- run.kills: 387
- run.damageBySource: starch-bolt 5051.561, hash-brown-shield 1260.665, comet-scythe 1316.972, grok-bot 935.194, skipping-cannonball 406.607
- run.damageTakenBySource: Hot oil 6.8, Brambles 4.3, enemy:garden-slug 25.355, enemy:sand-crab 15.644, boss:amusing 73.178, Spore vent 3.867
- run.killsBySource: starch-bolt 284, hash-brown-shield 12, comet-scythe 29, grok-bot 39, skipping-cannonball 23
- run.biomes: ["ketchup-bog","fry-oil-desert","peel-forest","chip-canyons","mash-swamp","frozen-tundra","compost-caves"]
- run.distance: 7015.51
- run.dodgePoints: 1089.453
- run.dodgeSecond: 134
- run.dodgeTaken: [52.09902060267848,52.09902060267848,78.7091539360118,78.7091539360118,78.7091539360118,78.7091539360118,78.7091539360118,78.7091539360118,78.7091539360118,78.7091539360118,78.7091539360118,92.01422060267848,95.3475539360118,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,36.454673936011815,41.66945615823404,41.66945615823404,46.88423838045626]
- run.dodgeSteps: [623.5443333333232,625.5076666666573,628.0909999999903,638.1609999999922,644.3609999999924,650.5609999999912,656.7609999999895,663.8209999999866,673.0309999999852,679.2309999999828,683.8809999999825,690.0809999999796,696.2809999999772,362.8343333333294,369.03433333332924,375.23433333332906,375.23433333332906,376.784333333329,382.98433333332883,389.18433333332865,395.38433333332847,401.5843333333283,407.7843333333281,413.98433333332684,420.18433333332666,426.3843333333264,430.0009999999929,430.0009999999929,433.4109999999943,439.61099999999686,445.81099999999543,452.0109999999935,458.2109999999931,464.4109999999956,470.61099999999476,476.81099999999185,483.0109999999918,489.2109999999922,495.41099999999204,501.4043333333251,501.4043333333251,501.4043333333251,507.60433333332765,513.8043333333302,520.0043333333327,526.2043333333328,532.4043333333341,538.6043333333339,544.8043333333364,551.0043333333354,557.2043333333324,563.4043333333295,569.6043333333266,575.8043333333237,582.0043333333208,588.2043333333191,594.4043333333162,600.6043333333148,604.9443333333155,611.1443333333181,617.3443333333206]
- run.curseSince: 8022
- run.killer: "boss:amusing"
- run.goldEarned: 140.78
- run.bossChests: 3
- run.elitesKilled: 4
- run.peakEnemies: 99
- run.shrinesUsed: 1
- run.grokBotHelps: 3
- run.botSwarms: 1
- counters.kills: 387
- counters.hits: 551
- counters.gems: 141
- counters.coins: 22
- counters.shots: 104
- counters.hostileShots: 70
- counters.nearMisses: 7
- counters.hostileHits: 2
- shrineTotals.growth: 0.06
- Gold, spots and chests: gold held at the end 140, spent 0; spots charged and used: Spud Freezer 2, Crop Patch 1, Tater Lantern 1; chests seen 4, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Hash Brown Shield 52% over Potato Battery 25%, Starch Bolt 23%; 0:19 took Starch Bolt 88% over Hot Sauce 9%, Golden Fry 3%; 0:25 took Hash Brown Shield 70% over Starch Bolt 21%, Couch Potato 9%; 0:42 took Comet Scythe 42% over Starch Plating 39%, Hash Brown Shield 19%; 0:57 took XP gain 73% over Gold gain 15%, Move speed 12%; 1:02 took Skipping Cannonball 55% over Butter Pat 28%, Starch Bolt 10%, Reroll 7%; 1:22 took Sprouting Eyes 67% over Spud Fence 15%, Root Network 13%, Reroll 5%; 1:46 took Starch Bolt 47% over Hash Brown Shield 29%, Tater Mines 14%, Reroll 10%; 2:13 took Sprouting Eyes 49% over Comet Scythe 31%, Reroll 12%, Skipping Cannonball 8%.
