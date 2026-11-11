# Does fighting the first elites at full health bring chests sooner without more bursts?

| Field | Value |
| --- | --- |
| Status | done |
| Area | enemies |
| Result | refuted |
| Created | L4.I10 |
| Updated | L5.I3 |

## Hypothesis

Chests only drop from elites and bosses, and the first chest is listed at 1:08-1:47, after the first elite pair dies. A goal text that rates fight-the-elite high between 0:50 and 1:40 at 80% health or more with no boss near and no damage in the last 3 s, plus knobs eliteFrom 50, eliteMinHp 0.8 and eliteSeconds 15, kills the first elites sooner and so brings the first chest and level jumps sooner, without more 40 hp bursts.

## Method

Seeker-sprouts, playbook knobs plus eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15, planner.goal text only, 240 s from 0:00 on s31-40, paired with the 10 playbook games on file (6 of 10 alive at 4:00). Manipulation check: fight-elite goals starting between 0:50 and 1:40 at 80% health or more, and elites killed before 1:40. Metrics chosen first: first chest opened (check run.bossChests), chests by 2:00, health lost 1:00-2:00, bursts of 40 hp or more in 5 s, alive at 4:00. Adopt only on 8 or more of 10 alive with 3 or more net paired wins. Mind B68 (withholding elite fights before 2:00 lost) and B74 (elite fights can burst).

## Findings

Seeker-sprouts with eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15 and an early-elite goal text, s31-40, 240 s: alive at 4:00 on 1 of 10 (s34) against 6 of 10 for the playbook (0 wins, 5 losses, 5 ties). The manipulation passed: fight goals started 0:50-1:12 at 80% health or more. They cost 50-112 hp in minute 1 and were dropped by keep-away in every game, and 9 of 10 games opened 0 chests by 2:00. The first chest was listed 0:57-1:39, not sooner than before. Not added to the playbook (B100).

## Games

### L5.I2.G1: early elite fights s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15, its own planner.goal.
- Outcome: died after 136.5s (game clock 02:16); damage taken 128 (enemy:potato-beetle 33.76, enemy:compost-maggot 1.402, Hot oil 13.933, enemy:frost-flea 1.621); 388 kills; level 1 to 8; planner asked 47 times, action model 430; the models saw the game 30 ms late (p90 51); ended with seeker-sprouts 1, spud-lob 1, starch-chain 1, seed-potato 1, grab-bag 1, harvest-moon 1, lean-lunch 2.
- run.timeSec: 136.533
- run.level: 7
- run.kills: 388
- run.damageBySource: seeker-sprouts 2666.735, spud-lob 1233.55, starch-chain 3181.175, seed-potato 1008.419, grok-bot 27.554, harvest-moon 260.146, grab-bag 827.465
- run.damageTakenBySource: enemy:potato-beetle 33.76, enemy:compost-maggot 1.402, Hot oil 13.933, enemy:frost-flea 1.621, boss:amusing 73.178, enemy:bog-slime 2.251, enemy:bowling-pin 2.059
- run.killsBySource: seeker-sprouts 128, spud-lob 54, starch-chain 119, seed-potato 51, grok-bot 2, harvest-moon 8, grab-bag 26
- run.biomes: ["mash-swamp","peel-forest","compost-caves","chip-canyons","fry-oil-desert","frozen-tundra","ketchup-bog"]
- run.distance: 8292.812
- run.dodgePoints: 1113.521
- run.dodgeSecond: 136
- run.dodgeTaken: [49.11582737943545,49.11582737943545,49.11582737943545,49.11582737943545,49.11582737943545,49.11582737943545,50.715827379435446,50.715827379435446,57.36836071276878,57.36836071276878,60.694627379435445,62.94570147691467,62.94570147691467,69.59823481024802,96.20836814358134,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,35.16179040032709,39.82845706699376,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,47.495123733660414,49.11582737943545,49.11582737943545,49.11582737943545,49.11582737943545,49.11582737943545,49.11582737943545,49.11582737943545]
- run.dodgeSteps: [735.3044999999781,741.5044999999798,747.7044999999822,753.9044999999848,760.1044999999873,766.3044999999898,772.5044999999924,778.7044999999949,784.904499999995,791.1044999999975,797.3044999999977,803.5044999999964,809.7044999999972,815.9044999999993,825.974499999997,453.6488333333302,459.8488333333291,466.0488333333262,472.24883333332826,478.44883333332956,484.64883333333165,490.8488333333289,497.04883333333146,503.248833333332,509.4488333333311,515.6488333333289,521.8488333333273,528.0488333333299,534.2488333333316,540.4488333333309,546.6488333333306,552.8488333333321,559.0488333333346,565.2488333333337,571.4488333333312,577.6488333333309,583.8488333333295,590.0488333333284,594.2854999999962,600.4854999999934,606.6854999999905,612.8854999999905,619.0854999999917,625.2854999999906,631.4854999999877,637.6854999999848,643.8854999999819,650.085499999979,656.2854999999761,662.4854999999732,668.6854999999703,674.8854999999674,681.0854999999644,687.2854999999641,692.958499999966,698.1044999999672,704.3044999999697,710.5044999999723,716.7044999999748,722.9044999999742,729.1044999999756]
- run.curseSince: 5477
- run.killer: "boss:amusing"
- run.goldEarned: 23.625
- run.elitesKilled: 3
- run.peakEnemies: 97
- run.grokBotHelps: 2
- counters.kills: 388
- counters.hits: 784
- counters.gems: 211
- counters.coins: 3
- counters.shots: 541
- counters.hostileShots: 96
- counters.nearMisses: 11
- counters.hostileHits: 6
- Gold, spots and chests: gold held at the end 23, spent 0; spots charged and used: Beetle Nest 1; chests seen 3, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:07 took Spud Lob 56% over Seeker Sprouts 35%, Rotten Spud 9%; 0:25 took Starch Chain 61% over Stuffed Skin 20%, Fry Cook Sentry 19%; 0:53 took Lean Lunch 47% over Sprout Squad 40%, Seeker Sprouts 13%; 0:57 took Seed Potato 55% over Spud Lob 29%, Salt Shaker 16%; 1:31 took Lean Lunch 59% over Starch Chain 31%, Seeker Sprouts 10%; 1:33 took Grab Bag 50% over Starch Chain 37%, Spud Lob 13%; 1:35 took Harvest Moon 71% over Spud Lob 15%, Salt Shaker 14%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Spud Lob 1/8, Starch Chain 1/8, Seed Potato 1/8, Lean Lunch 1/5 | 1:59 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Spud Lob 1/8, Starch Chain 1/8, Seed Potato 1/8, Grab Bag 1/8, Harvest Moon 1/8, Lean Lunch 2/5 | 2:16 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Spud Lob 1/8, Starch Chain 1/8, Seed Potato 1/8, Grab Bag 1/8, Harvest Moon 1/8, Lean Lunch 2/5.
- Passive levels first reached: Lean Lunch 1 at 0:53.

### L5.I2.G2: early elite fights s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 240s; plays the playbook with eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15, its own planner.goal.
- Outcome: died after 193.3s (game clock 03:13); damage taken 213 (Hot oil 19.5, enemy:spittlebug 1.746, enemy:potato-beetle 38.576, enemy:frost-flea 4.744); 1193 kills; level 1 to 11; planner asked 67 times, action model 639; the models saw the game 36 ms late (p90 62); ended with seeker-sprouts 3, broadside 1, seed-potato 1, tot-stampede 1, fry-sentry 1, fry-lance 1, peel-out 1, sprouting-eyes 1, big-bowl 1.
- run.timeSec: 193.3
- run.level: 10
- run.kills: 1193
- run.damageBySource: seeker-sprouts 5256.889, seed-potato 4102.656, broadside 3775.464, tot-stampede 5994.742, dog:terrier 1251.742, fry-sentry 4256.825, grok-bot 240.305, fry-lance 1549.725
- run.damageTakenBySource: Hot oil 19.5, enemy:spittlebug 1.746, enemy:potato-beetle 38.576, enemy:frost-flea 4.744, enemy:sprout-mite 5.805, enemy:snow-mold 12.346, enemy:oil-drip 12.085, enemy:aphid 8.837, boss:amusing 5.544, boss:beetle-queen 60.743, enemy:fry-fly 18.272, enemy:beetle-brood 18.58, enemy:crumb-ant 5.88
- run.killsBySource: seeker-sprouts 283, seed-potato 174, broadside 90, tot-stampede 348, dog:terrier 74, fry-sentry 156, grok-bot 12, fry-lance 56
- run.biomes: ["fry-oil-desert","chip-canyons","frozen-tundra"]
- run.dogs: [{"id":"terrier","at":75.65}]
- run.dogHelp: damage.terrier 1251.742, hits.terrier 87
- run.distance: 11503.743
- run.dodgePoints: 1411.739
- run.dodgeSecond: 193
- run.dodgeTaken: [95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,98.10959446024775,103.54929446024775,125.17081616977109,154.56933642143122,182.57303272863345,194.97849803398702,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508,95.5174504775508]
- run.dodgeSteps: [1088.224333333298,1094.4243333332952,1100.6243333332923,1106.8243333332894,1113.0243333332864,1119.2243333332835,1125.4243333332806,1131.6243333332777,1136.8943333332752,1139.684333333274,1148.5143333332726,818.8343333334242,824.6210000000885,829.4776666667528,830.2010000000859,834.1276666667507,838.7776666667485,840.7410000000809,844.6676666667457,850.8676666667428,857.0676666667399,862.4410000000707,862.544333333404,867.7110000000682,870.8110000000668,875.1510000000648,879.2843333333961,883.211000000061,889.411000000058,893.5443333333894,899.7443333333865,903.9810000000513,910.1810000000484,916.3810000000454,922.5810000000425,928.7810000000396,934.9810000000367,941.1810000000338,947.3810000000309,953.581000000028,959.7810000000251,965.9810000000222,972.1810000000193,978.3810000000163,984.5810000000134,990.7810000000105,996.9810000000076,1003.1810000000047,1009.3810000000018,1015.5809999999989,1021.780999999996,1027.980999999993,1034.18099999999,1040.3809999999871,1046.5809999999842,1052.7809999999813,1058.9809999999784,1065.1809999999755,1071.3809999999726,1077.5809999999697,1083.7809999999668]
- run.curseSince: 11541
- run.killer: "enemy:fry-fly"
- run.goldEarned: 83.317
- run.bossesKilled: 1
- run.elitesKilled: 4
- run.peakEnemies: 142
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 1193
- counters.hits: 2041
- counters.gems: 260
- counters.coins: 34
- counters.shots: 1198
- counters.hostileShots: 107
- counters.nearMisses: 9
- counters.hostileHits: 7
- Gold, spots and chests: gold held at the end 83, spent 0; spots charged and used: Beetle Nest 1; chests seen 5, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Peel Out 87% over Slow Cooker 8%, Masher Grip 5%; 0:19 took Seeker Sprouts 59% over Mezzaluna 23%, Gravy Heart 18%; 0:40 took Broadside 55% over Root Network 27%, Sprout Satellites 18%; 0:42 took Seed Potato 50% over Whisk Vortex 41%, Salt Line 9%; 0:53 took Seeker Sprouts 39% over Broadside 24%, Reroll 20%, Spry Sprout 17%; 1:11 took Tot Stampede 39% over Seeker Sprouts 36%, Seed Potato 13%, Reroll 12%; 1:20 took Fry Cook Sentry 52% over Peel Out 26%, Seeker Sprouts 13%, Reroll 9%; 2:04 took Sprouting Eyes 39% over Seeker Sprouts 31%, Fry Cook Sentry 16%, Reroll 14%; 2:20 took Fry Lance 38% over Seeker Sprouts 30%, Frying Pan 20%, Reroll 12%; 3:10 took Leave 69% over Accept 31%; 3:12 took Big Bowl 42% over Fry Lance 25%, Four-Eyed Spud 20%, Reroll 13%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Broadside 1/8, Seed Potato 1/8, Peel Out 1/5 | 1:58 level 8, maxHp 120, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 3/8, Broadside 1/8, Seed Potato 1/8, Tot Stampede 1/8, Fry Cook Sentry 1/8, Peel Out 1/5 | 3:00 level 10, maxHp 120, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 3/8, Broadside 1/8, Seed Potato 1/8, Tot Stampede 1/8, Fry Cook Sentry 1/8, Fry Lance 1/8, Peel Out 1/5, Sprouting Eyes 1/5 | 3:13 level 11, maxHp 120, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 3/8, Broadside 1/8, Seed Potato 1/8, Tot Stampede 1/8, Fry Cook Sentry 1/8, Fry Lance 1/8, Peel Out 1/5, Sprouting Eyes 1/5, Big Bowl 1/5.
- Passive levels first reached: Peel Out 1 at 0:06; Sprouting Eyes 1 at 2:04; Big Bowl 1 at 3:12.

### L5.I2.G3: early elite fights s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 240s; plays the playbook with eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15, its own planner.goal.
- Outcome: died after 210s (game clock 03:29); damage taken 150 (enemy:crumb-ant 1.282, enemy:ketchup-drop 1.683, enemy:sand-crab 20.689, enemy:aphid 5.948); 1217 kills; level 1 to 11; planner asked 68 times, action model 704; the models saw the game 33 ms late (p90 55); ended with seeker-sprouts 6, spud-fence 1, harvest-moon 1, grab-bag 2, sour-cream 2, chives 1, sprouting-eyes 1.
- run.timeSec: 209.967
- run.level: 10
- run.kills: 1217
- run.damageBySource: seeker-sprouts 9433.827, spud-fence 11683.319, harvest-moon 4884.397, grab-bag 6362.395, grok-bot 970.736
- run.damageTakenBySource: enemy:crumb-ant 1.282, enemy:ketchup-drop 1.683, enemy:sand-crab 20.689, enemy:aphid 5.948, enemy:wireworm-larva 12.393, Brambles 13.2, enemy:snow-mold 3.116, enemy:oil-drip 2.079, enemy:potato-beetle 19.374, enemy:frost-flea 1.594, boss:amusing 13.305, enemy:cave-grub 50.153, boss:beetle-queen 5.44
- run.killsBySource: seeker-sprouts 442, spud-fence 367, harvest-moon 155, grab-bag 203, grok-bot 50
- run.biomes: ["fry-oil-desert","chip-canyons","compost-caves","peel-forest","mash-swamp"]
- run.distance: 11938.933
- run.dodgePoints: 1574.518
- run.dodgeSecond: 209
- run.dodgeTaken: [86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,94.46300184076765,98.37217245952,106.24278806953312,106.24278806953312,106.24278806953312,111.68248806953312,111.68248806953312,115.63354460796484,115.63354460796484,131.97103228409313,135.90537672162864,142.12217672162865,142.12217672162865,142.12217672162865,142.12217672162865,142.12217672162865,146.16697715350324,146.16697715350324,146.16697715350324,146.16697715350324,146.16697715350324,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863,86.63953498034863]
- run.dodgeSteps: [1099.7766666665825,1104.2199999999139,1108.6633333332452,1114.8633333332423,1117.7566666665741,1123.9566666665712,1130.1566666665683,1136.3566666665654,1143.3799999998973,1147.3566666665631,1150.0433333332285,1153.2466666665603,1153.86666666656,1162.2833333332255,1165.0733333332241,1170.9633333332215,1173.5466666665536,1176.543333333219,1176.543333333219,1177.1633333332186,1179.0233333332176,1179.6433333332175,1187.2333333332167,1188.2666666665496,1188.2666666665496,1188.2666666665496,1188.2666666665496,896.3133333333448,902.5133333333418,908.7133333333389,914.913333333336,921.1133333333331,927.3133333333302,933.5133333333273,939.2999999999913,943.9499999999891,950.1499999999862,956.3499999999833,961.8266666666474,966.9933333333116,973.1933333333087,979.3933333333058,985.5933333333029,991.7933333333,997.9933333332971,1004.1933333332942,1010.3933333332913,1016.5933333332883,1022.7933333332854,1028.9933333332824,1035.1933333332795,1041.3933333332766,1047.5933333332737,1052.036666666605,1058.236666666602,1064.4366666665992,1070.6366666665963,1074.9766666665942,1081.1766666665912,1087.3766666665883,1093.5766666665854]
- run.curseSince: 11346
- run.killer: "enemy:wireworm-larva"
- run.goldEarned: 221.563
- run.bossChests: 3
- run.bossesKilled: 2
- run.elitesKilled: 8
- run.peakEnemies: 173
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1217
- counters.hits: 2517
- counters.gems: 239
- counters.coins: 50
- counters.shots: 789
- counters.hostileShots: 110
- counters.nearMisses: 3
- counters.hostileHits: 4
- Gold, spots and chests: gold held at the end 221, spent 0; spots charged and used: Beetle Nest 2; chests seen 10, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Spud Fence 66% over Chives 29%, Potato Magnet 5%; 0:23 took Seeker Sprouts 43% over Spud Fence 33%, Masher Grip 24%; 0:38 took Sour Cream 46% over Seeker Sprouts 45%, Clean Plate 9%; 0:59 took Harvest Moon 79% over Seeker Sprouts 12%, Chives 9%; 1:05 took Chives 37% over Salt Line 35%, Harvest Moon 28%; 1:14 took Sprouting Eyes 68% over Butter Socks 20%, Gravy Splash 12%; 1:33 took Grab Bag 53% over Frying Pan 28%, Spud Fence 19%; 1:53 took Seeker Sprouts 55% over Harvest Moon 28%, Potato Magnet 17%; 2:11 took Grab Bag 52% over Spud Fence 26%, Reroll 14%, Fertilizer 8%; 3:09 took Sour Cream 54% over Spud Fence 23%, Reroll 17%, Fertilizer 6%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Spud Fence 1/8, Harvest Moon 1/8, Sour Cream 1/5 | 1:59 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Spud Fence 1/8, Harvest Moon 1/8, Grab Bag 1/8, Sour Cream 1/5, Chives 1/5, Sprouting Eyes 1/5 | 2:59 level 10, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Spud Fence 1/8, Harvest Moon 1/8, Grab Bag 2/8, Sour Cream 1/5, Chives 1/5, Sprouting Eyes 1/5 | 3:30 level 11, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 6/8, Spud Fence 1/8, Harvest Moon 1/8, Grab Bag 2/8, Sour Cream 2/5, Chives 1/5, Sprouting Eyes 1/5.
- Passive levels first reached: Sour Cream 1 at 0:38; Chives 1 at 1:05; Sprouting Eyes 1 at 1:14.

### L5.I2.G4: early elite fights s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 240s; plays the playbook with eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15, its own planner.goal.
- Outcome: alive after 240.1s (game clock 04:00), health 63/120; damage taken 159 (Hot oil 13.3, enemy:fry-fly 99.204, enemy:frost-flea 1.393, boss:amusing 12.196); 1149 kills; level 1 to 13; planner asked 83 times, action model 762; the models saw the game 33 ms late (p90 57); ended with seeker-sprouts 3, seed-potato 1, comet-scythe 3, skillet-flail 1, starch-chain 1, tater-pup 1, sprouting-eyes 1, big-bowl 1, butter-socks 1, chives 1.
- run.timeSec: 240.133
- run.level: 12
- run.kills: 1149
- run.damageBySource: seeker-sprouts 6070.357, seed-potato 10114.155, comet-scythe 5950.663, skillet-flail 2581.903, starch-chain 9003.528, grok-bot 295.339, tater-pup 2359.142
- run.damageTakenBySource: Hot oil 13.3, enemy:fry-fly 99.204, enemy:frost-flea 1.393, boss:amusing 12.196, boss:beetle-queen 17.226, enemy:garden-slug 4.567, Spore vent 2, enemy:cave-grub 8.641
- run.killsBySource: seeker-sprouts 278, seed-potato 340, comet-scythe 145, skillet-flail 60, starch-chain 232, grok-bot 18, tater-pup 76
- run.biomes: ["fry-oil-desert","chip-canyons","ketchup-bog","mash-swamp","peel-forest","frozen-tundra","compost-caves"]
- run.distance: 14189.168
- run.dodgePoints: 1641.732
- run.dodgeSecond: 240
- run.dodgeTaken: [126.09377375309896,128.81362375309897,128.81362375309897,128.81362375309897,128.81362375309897,128.81362375309897,128.81362375309897,128.81362375309897,128.81362375309897,133.3467070864323,137.87979041976564,137.87979041976564,137.87979041976564,140.59964041976562,140.59964041976562,140.59964041976562,140.59964041976562,140.59964041976562,140.59964041976562,140.59964041976562,140.59964041976562,140.59964041976562,140.59964041976562,140.59964041976562,140.59964041976562,140.59964041976562,143.31949041976563,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,147.88616936837673,149.88616936837673,149.88616936837673,149.88616936837673,149.88616936837673,149.88616936837673,158.52668570168578,158.52668570168578,158.52668570168578,158.52668570168578,158.52668570168578,158.52668570168578,158.52668570168578,158.52668570168578,158.52668570168578,158.52668570168578,158.52668570168578,126.09377375309896,126.09377375309896,126.09377375309896]
- run.dodgeSteps: [1106.286999999857,1112.486999999854,1118.6869999998512,1124.8869999998483,1131.0869999998454,1135.32366666651,1141.0121666665068,1144.0139999998385,1148.638166666502,1152.0481666664982,1155.4581666664944,1160.170166666491,1166.370166666488,1172.5701666664852,1178.7701666664823,1184.9701666664794,1191.1701666664765,1197.3701666664736,1203.5701666664706,1209.7701666664677,1215.9701666664648,1222.170166666462,1228.370166666459,1234.570166666456,1240.7701666664532,1242.3201666664525,1248.0034999997831,1254.2034999997802,1260.4034999997773,1266.6034999997744,1272.8034999997715,1279.0034999997686,1285.2034999997657,1291.4034999997627,1297.6034999997598,1303.803499999757,1310.003499999754,1316.203499999751,1322.4034999997482,1328.6034999997453,1334.8034999997424,1341.0034999997395,1347.2034999997366,1353.4034999997336,1359.6034999997307,1365.8034999997278,1372.003499999725,1378.203499999722,1384.403499999719,1390.6034999997162,1394.3234999997144,1398.6634999997125,1402.3834999997107,1406.3101666663756,1408.4801666663745,1412.0968333330395,1412.0968333330395,1418.09016666637,1087.6869999998657,1093.8869999998628,1100.08699999986]
- run.curseSince: 13772
- run.goldEarned: 154.572
- run.bossChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 5
- run.peakEnemies: 179
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1149
- counters.hits: 2776
- counters.gems: 599
- counters.coins: 48
- counters.shots: 1290
- counters.hostileShots: 288
- counters.nearMisses: 9
- counters.hostileHits: 4
- Gold, spots and chests: gold held at the end 154, spent 0; spots charged and used: Beetle Nest 1; chests seen 6, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:15 took Seed Potato 69% over Butter Socks 25%, Tater Mines 6%; 0:25 took Comet Scythe 93% over Butter Pat 6%, Clean Plate 1%; 0:26 took Seeker Sprouts 43% over Masher Grip 37%, Slow Cooker 20%; 0:46 took Comet Scythe 51% over Thick Skin 27%, Seeker Sprouts 22%; 1:08 took Skillet Flail 49% over Seeker Sprouts 43%, Spud Dice 8%; 1:18 took Starch Chain 41% over Spud Decoy 40%, Skillet Flail 19%; 1:58 took Tater Tot Pup 61% over Comet Scythe 24%, Reroll 10%, Seed Potato 5%; 2:47 took Sprouting Eyes 41% over Tater Tot Pup 29%, Reroll 17%, Gravy Splash 13%; 3:32 took Comet Scythe 60% over Starch Chain 21%, Reroll 11%, Rotten Spud 6%, Skip 2%; 3:44 took Big Bowl 75% over Slow Cooker 10%, Reroll 9%, Salt Shaker 4%, Skip 2%; 3:47 took Butter Socks 46% over Skillet Flail 33%, Reroll 14%, Clean Plate 5%, Skip 2%; 3:49 took Chives 42% over Seeker Sprouts 32%, Reroll 13%, Fertilizer 11%, Skip 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Seed Potato 1/8, Comet Scythe 2/8 | 2:00 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Seed Potato 1/8, Comet Scythe 2/8, Skillet Flail 1/8, Starch Chain 1/8, Tater Tot Pup 1/8 | 2:59 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Seed Potato 1/8, Comet Scythe 2/8, Skillet Flail 1/8, Starch Chain 1/8, Tater Tot Pup 1/8, Sprouting Eyes 1/5 | 3:59 level 13, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Seed Potato 1/8, Comet Scythe 3/8, Skillet Flail 1/8, Starch Chain 1/8, Tater Tot Pup 1/8, Sprouting Eyes 1/5, Big Bowl 1/5, Butter Socks 1/5, Chives 1/5.
- Passive levels first reached: Sprouting Eyes 1 at 2:47; Big Bowl 1 at 3:44; Butter Socks 1 at 3:47; Chives 1 at 3:49.

### L5.I2.G5: early elite fights s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 240s; plays the playbook with eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15, its own planner.goal.
- Outcome: died after 195.2s (game clock 03:15); damage taken 161 (enemy:cave-grub 58.468, enemy:fry-fly 13.742, enemy:crumb-ant 6.741, enemy:ketchup-drop 1.938); 692 kills; level 1 to 9; planner asked 61 times, action model 655; the models saw the game 31 ms late (p90 53); ended with seeker-sprouts 1, mash-mortar 1, steam-vent 1, mash-snowball 2, spud-dice 1, tater-mines 1, salt-shaker 1, root-network 1.
- run.timeSec: 195.183
- run.level: 8
- run.kills: 692
- run.damageBySource: seeker-sprouts 4032.91, mash-mortar 6542.122, steam-vent 547.662, spud-dice 1943.561, mash-snowball 3795.591, grok-bot 1348.711, tater-mines 1471.183
- run.damageTakenBySource: enemy:cave-grub 58.468, enemy:fry-fly 13.742, enemy:crumb-ant 6.741, enemy:ketchup-drop 1.938, enemy:aphid 1.512, enemy:compost-maggot 1.586, Spore vent 2.133, enemy:sprout-mite 1.621, enemy:lint-bunny 1.621, enemy:sock-pile 3.181, boss:amusing 35.48, enemy:bowling-ball 23.865, boss:beetle-queen 2.72, enemy:bog-slime 2.599, enemy:tomato-leech 3.984
- run.killsBySource: seeker-sprouts 125, mash-mortar 221, steam-vent 15, mash-snowball 123, spud-dice 82, grok-bot 66, tater-mines 60
- run.biomes: ["compost-caves","frozen-tundra","chip-canyons","fry-oil-desert","ketchup-bog","mash-swamp","peel-forest","gutterball-lanes"]
- run.distance: 11532.227
- run.dodgePoints: 1232.21
- run.dodgeSecond: 195
- run.dodgeTaken: [151.89048942229746,154.61033942229747,154.61033942229747,154.61033942229747,154.61033942229747,157.20941117406701,157.20941117406701,157.20941117406701,157.20941117406701,157.20941117406701,157.20941117406701,157.20941117406701,157.20941117406701,113.86500426400931,113.86500426400931,113.86500426400931,113.86500426400931,113.86500426400931,120.51753759734264,120.51753759734264,120.51753759734264,120.51753759734264,120.51753759734264,120.51753759734264,120.51753759734264,120.51753759734264,127.39347113561973,127.39347113561973,132.68344535663095,137.34924492942307,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,142.01504450221518,146.8563797618156,146.8563797618156,146.8563797618156,146.8563797618156,146.8563797618156,146.8563797618156,151.89048942229746,151.89048942229746,151.89048942229746,151.89048942229746,151.89048942229746,151.89048942229746,151.89048942229746,151.89048942229746,151.89048942229746]
- run.dodgeSteps: [1085.239333333128,1086.9959999997936,1091.5426666664582,1097.3293333331221,1106.0559999997874,1108.3293333331198,1114.3226666664502,1118.972666666448,1125.1726666664451,1131.3726666664422,1137.5726666664393,1143.7726666664364,1152.0859999997688,830.8933333332322,837.0933333332293,843.2933333332264,853.3633333332245,856.5666666665563,861.1133333332209,867.313333333218,873.5133333332151,883.5833333332132,889.7833333332103,895.9833333332074,898.091333333205,906.0533333332005,908.8846666665328,913.2659999998654,918.3499999998637,924.5499999998608,934.6199999998589,938.6499999998571,944.8499999998542,948.6733333331856,954.8733333331827,959.1306666665107,962.8506666665046,969.0093333331682,972.3573333331667,973.4733333331676,975.746666666501,976.4286666665018,980.0659999998327,990.1359999998307,993.2359999998292,999.4359999998263,1003.6726666664911,1008.0126666664889,1015.9326666664865,1024.2826666664841,1030.4826666664812,1036.4759999998118,1040.919333333143,1041.9526666664758,1041.9526666664758,1045.8793333331407,1054.0893333331396,1060.2893333331367,1064.6293333331346,1070.8293333331317,1079.0393333331308]
- run.curseSince: 7720
- run.killer: "enemy:tomato-leech"
- run.goldEarned: 44.888
- run.bossesKilled: 1
- run.elitesKilled: 6
- run.peakEnemies: 167
- run.grokBotHelps: 3
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 692
- counters.hits: 1644
- counters.gems: 228
- counters.coins: 20
- counters.shots: 516
- counters.hostileShots: 216
- counters.nearMisses: 17
- counters.hostileHits: 1
- Gold, spots and chests: gold held at the end 44, spent 0; spots charged and used: none; chests seen 7, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:22 took Salt Shaker 54% over Gravy Splash 25%, Potato Magnet 21%; 1:12 took Mash Mortar 61% over Mash Landing 23%, Hot Start 16%; 1:34 took Steam Vent 46% over Big Bowl 30%, Seeker Sprouts 24%; 2:08 took Root Network 82% over Salt Shaker 15%, Clean Plate 3%; 2:09 took Mash Snowball 80% over Salt Shaker 18%, Golden Fry 2%; 2:10 took Spud Dice 51% over Salt Shaker 27%, Spry Sprout 22%; 2:32 took Tater Mines 71% over Mash Snowball 21%, Seeker Sprouts 8%; 2:57 took Mash Snowball 49% over Lean Lunch 34%, Seeker Sprouts 17%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 2, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Salt Shaker 1/5 | 1:59 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Mash Mortar 1/8, Steam Vent 1/8, Salt Shaker 1/5 | 2:59 level 9, maxHp 120, armor 0, damageMult 1, recovery 0.25, Seeker Sprouts 1/8, Mash Mortar 1/8, Steam Vent 1/8, Mash Snowball 2/8, Spud Dice 1/8, Tater Mines 1/8, Salt Shaker 1/5, Root Network 1/5 | 3:15 level 9, maxHp 120, armor 0, damageMult 1, recovery 0.25, Seeker Sprouts 1/8, Mash Mortar 1/8, Steam Vent 1/8, Mash Snowball 2/8, Spud Dice 1/8, Tater Mines 1/8, Salt Shaker 1/5, Root Network 1/5.
- Passive levels first reached: Salt Shaker 1 at 0:22; Root Network 1 at 2:08.

### L5.I2.G6: early elite fights s36

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 36; 240s; plays the playbook with eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15, its own planner.goal.
- Outcome: died after 72.7s (game clock 01:12); damage taken 121 (Spore vent 5.2, enemy:cave-grub 115.959); 139 kills; level 1 to 6; planner asked 28 times, action model 245; the models saw the game 34 ms late (p90 54); ended with seeker-sprouts 1, gem-sling 1, whisk-vortex 3, reset-button 1.
- run.timeSec: 72.667
- run.level: 5
- run.kills: 139
- run.damageBySource: seeker-sprouts 1299.333, whisk-vortex 1333.374, reset-button 62.905, gem-sling 57.788
- run.damageTakenBySource: Spore vent 5.2, enemy:cave-grub 115.959
- run.killsBySource: seeker-sprouts 87, whisk-vortex 45, reset-button 5, gem-sling 2
- run.biomes: ["mash-swamp","peel-forest","compost-caves"]
- run.distance: 4402.933
- run.dodgePoints: 631.84
- run.dodgeSecond: 72
- run.dodgeTaken: [23.018968514011206,36.38319489951961,40.83793702802241,45.29267915652521,58.65690554203361,67.56638979903921,67.56638979903921,80.97582979903922,94.38526979903922,112.23438072271149,116.70419405604483,116.70419405604483,3.333333333333333,5.200000000000003,5.200000000000003,5.200000000000003,5.200000000000003,5.200000000000003,5.200000000000003,5.200000000000003,5.200000000000003,5.200000000000003,5.200000000000003,5.200000000000003,9.654742128502804]
- run.dodgeSteps: [364.24999999999073,370.44999999999055,376.64999999999037,382.8499999999902,389.04999999999,399.11999999999,405.3199999999898,411.5199999999901,417.71999999998997,423.9199999999896,433.98999999998904,437.5033333333207,67.26999999999943,73.46999999999925,79.66999999999906,85.86999999999888,92.0699999999987,98.26999999999852,104.46999999999835,110.66999999999817,116.86999999999799,123.0699999999978,129.26999999999762,135.46999999999744,141.66999999999726,147.86999999999708,154.0699999999969,160.2699999999967,166.46999999999653,172.66999999999635,178.86999999999617,185.06999999999599,191.2699999999958,197.46999999999562,203.66999999999544,209.86999999999526,216.06999999999508,222.2699999999949,228.4699999999947,234.66999999999453,240.86999999999435,247.06999999999417,253.26999999999398,259.4699999999938,265.6699999999936,271.8699999999934,278.06999999999323,284.26999999999305,290.46999999999287,296.6699999999927,302.8699999999925,309.0699999999923,315.26999999999214,321.46999999999196,327.6699999999918,333.8699999999916,340.0699999999914,346.2699999999912,352.46999999999105,355.77666666665766,358.0499999999909]
- run.killer: "enemy:cave-grub"
- run.goldEarned: 11.655
- run.peakEnemies: 38
- run.grokBotHelps: 2
- counters.kills: 139
- counters.hits: 499
- counters.gems: 53
- counters.coins: 11
- counters.shots: 225
- Gold, spots and chests: gold held at the end 11, spent 0; spots charged and used: Beetle Nest 1; chests seen 0, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:05 took Gem Sling 71% over Slow Cooker 15%, Reroll 11%, Hearty Helping 3%; 0:30 took Whisk Vortex 64% over Gem Sling 22%, Deep Fryer 7%, Reroll 7%; 0:35 took Reset Button 88% over Whisk Vortex 5%, Chives 4%, Reroll 3%; 0:54 took Whisk Vortex 43% over Reroll 25%, Masher Grip 20%, Seeker Sprouts 12%; 1:12 took Whisk Vortex 38% over Hot Start 36%, Reroll 16%, Gem Sling 10%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Gem Sling 1/8, Whisk Vortex 2/8, Reset Button 1/8 | 1:12 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Gem Sling 1/8, Whisk Vortex 3/8, Reset Button 1/8.

### L5.I2.G7: early elite fights s37

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 37; 240s; plays the playbook with eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15, its own planner.goal.
- Outcome: died after 135.5s (game clock 02:15); damage taken 121 (Brambles 2.2, Spore vent 4.133, enemy:aphid 7.042, enemy:ketchup-drop 9.012); 345 kills; level 1 to 5; planner asked 43 times, action model 458; the models saw the game 29 ms late (p90 50); ended with seeker-sprouts 2, seed-potato 1, spud-dynamo 1, chives 1.
- run.timeSec: 135.5
- run.level: 4
- run.kills: 345
- run.damageBySource: seeker-sprouts 2828.96, grok-bot 117.536, seed-potato 1694.63, spud-dynamo 1484.396
- run.damageTakenBySource: Brambles 2.2, Spore vent 4.133, enemy:aphid 7.042, enemy:ketchup-drop 9.012, enemy:sand-crab 2.862, enemy:cave-grub 58.124, enemy:bog-slime 3.514, enemy:compost-maggot 13.166, enemy:sprout-mite 1.409, enemy:frost-flea 3.014, enemy:crumb-ant 4.981, boss:amusing 3.326, enemy:garden-slug 7.943
- run.killsBySource: seeker-sprouts 177, grok-bot 8, seed-potato 88, spud-dynamo 72
- run.biomes: ["peel-forest","mash-swamp","compost-caves","frozen-tundra","chip-canyons","fry-oil-desert","ketchup-bog"]
- run.distance: 8641.475
- run.dodgePoints: 848.959
- run.dodgeSecond: 135
- run.dodgeTaken: [103.08851112975275,103.08851112975275,106.20311704592896,106.20311704592896,106.20311704592896,106.20311704592896,107.74247066234142,107.74247066234142,111.06873732900809,111.06873732900809,111.06873732900809,111.06873732900809,111.06873732900809,115.04007420374694,79.08263383337032,79.08263383337032,79.08263383337032,79.08263383337032,79.08263383337032,79.08263383337032,79.08263383337032,79.08263383337032,79.08263383337032,83.55244716670366,83.55244716670366,86.47320988939845,90.87538216472241,92.37030894204587,93.83639864698891,95.30248835193194,96.80889770764182,96.80889770764182,96.80889770764182,96.80889770764182,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,99.82260052161374,103.08851112975275,103.08851112975275,103.08851112975275,103.08851112975275]
- run.dodgeSteps: [772.7074999999988,778.9074999999959,785.107499999993,791.3074999999901,797.5074999999872,803.7074999999843,809.9074999999814,818.2574999999795,826.1774999999768,832.3774999999739,838.577499999971,844.7774999999681,854.8474999999662,861.0474999999633,453.9745000000057,460.1745000000042,466.37450000000473,472.5745000000058,478.77450000000835,484.9745000000109,491.17450000001156,497.37450000001274,507.4445000000146,513.6445000000172,519.8445000000197,526.0445000000221,536.1145000000212,542.3145000000216,548.5145000000236,554.7145000000249,560.9145000000259,570.9845000000278,577.1845000000303,583.3845000000307,586.1745000000312,596.24450000003,602.4445000000298,608.6445000000324,614.8445000000299,621.044500000027,627.2445000000241,637.0975000000237,643.2975000000263,649.4975000000277,655.6975000000263,661.8975000000288,671.9675000000276,678.1675000000247,684.3675000000218,690.5675000000199,700.637500000018,706.8375000000162,713.0375000000133,719.2375000000104,725.4375000000114,735.5075000000132,741.7075000000134,747.9075000000105,754.1075000000076,760.3075000000047,766.5075000000018]
- run.curseSince: 5647
- run.killer: "enemy:crumb-ant"
- run.goldEarned: 2.1
- run.peakEnemies: 99
- run.grokBotHelps: 2
- counters.kills: 345
- counters.hits: 516
- counters.gems: 61
- counters.coins: 2
- counters.shots: 279
- counters.hostileShots: 83
- counters.nearMisses: 4
- counters.hostileHits: 1
- Gold, spots and chests: gold held at the end 2, spent 0; spots charged and used: none; chests seen 0, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:36 took Seeker Sprouts 77% over Potato Magnet 13%, Hash Rush 10%; 0:51 took Leave 67% over Accept 33%; 0:57 took Seed Potato 74% over Chives 21%, Grab Bag 5%; 1:08 took Spud Dynamo 78% over Gravy Splash 12%, Spud Dice 10%; 1:34 took Chives 48% over Mash Snowball 27%, Tailgate Fries 25%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 3, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Seed Potato 1/8 | 1:57 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Seed Potato 1/8, Spud Dynamo 1/8, Chives 1/5 | 2:15 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Seed Potato 1/8, Spud Dynamo 1/8, Chives 1/5.
- Passive levels first reached: Chives 1 at 1:34.

### L5.I2.G8: early elite fights s38

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 38; 240s; plays the playbook with eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15, its own planner.goal.
- Outcome: died after 166.2s (game clock 02:46); damage taken 121 (Hot oil 14.867, enemy:tomato-leech 58.204, enemy:lint-bunny 1.376, enemy:fry-fly 32.885); 618 kills; level 1 to 8; planner asked 53 times, action model 509; the models saw the game 35 ms late (p90 56); ended with seeker-sprouts 1, small-fry 2, potato-rain 2, mash-mortar 3.
- run.timeSec: 166.2
- run.level: 7
- run.kills: 618
- run.damageBySource: seeker-sprouts 2938.128, small-fry 4259.687, potato-rain 1108.057, mash-mortar 4877.172, grok-bot 594.006
- run.damageTakenBySource: Hot oil 14.867, enemy:tomato-leech 58.204, enemy:lint-bunny 1.376, enemy:fry-fly 32.885, enemy:bog-slime 1.861, enemy:ketchup-drop 5.659, enemy:crumb-ant 4.399, boss:amusing 2.218
- run.killsBySource: seeker-sprouts 166, small-fry 169, potato-rain 47, mash-mortar 203, grok-bot 33
- run.biomes: ["fry-oil-desert","ketchup-bog","chip-canyons","crop-circle"]
- run.distance: 10469.033
- run.dodgePoints: 1072.354
- run.dodgeSecond: 166
- run.dodgeTaken: [116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,118.38136323224283,108.49718545446507,108.49718545446507,108.49718545446507,108.49718545446507,108.49718545446507,108.49718545446507,108.49718545446507,108.49718545446507,108.49718545446507,108.49718545446507,108.49718545446507,114.99718545446507,116.16385212113173,116.16385212113173,116.16385212113173,116.16385212113173]
- run.dodgeSteps: [767.1166666666555,773.3166666666526,779.5166666666497,785.7166666666468,791.9166666666439,798.116666666641,808.186666666639,814.3866666666388,820.5866666666394,826.7866666666365,832.9866666666336,843.0566666666316,849.2566666666287,855.4566666666258,861.6566666666229,867.85666666662,877.9266666666181,882.5766666666159,888.776666666613,894.9766666666101,903.0833333332757,909.2833333332728,915.4833333332699,921.683333333267,927.8833333332641,934.0833333332612,940.2833333332583,942.9699999999236,951.9033333332557,952.7299999999219,958.929999999919,965.1299999999161,971.3299999999132,977.8866666665796,980.5733333332449,985.3266666665761,991.3199999999066,997.5199999999037,1007.5899999999017,1013.7899999998988,1019.9899999998959,1026.189999999893,1032.38999999989,1038.5899999998871,1045.66333333322,665.4933333333178,670.2466666666494,676.4466666666519,682.6466666666505,688.8466666666476,695.04666666665,701.2466666666526,707.4466666666551,717.5166666666552,723.7166666666571,729.9166666666597,736.1166666666622,742.3166666666633,748.5166666666609,754.7166666666614,760.9166666666584]
- run.killer: "enemy:fry-fly"
- run.goldEarned: 35.07
- run.elitesKilled: 4
- run.peakEnemies: 116
- run.grokBotHelps: 3
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 618
- counters.hits: 1418
- counters.gems: 139
- counters.coins: 21
- counters.shots: 1151
- counters.hostileShots: 302
- counters.nearMisses: 5
- counters.hostileHits: 1
- Gold, spots and chests: gold held at the end 35, spent 0; spots charged and used: Beetle Nest 1; chests seen 4, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Small Fry 69% over Gravy Heart 30%, Golden Fry 1%; 0:24 took Potato Rain 44% over Seeker Sprouts 38%, Spud Lob 18%; 0:50 took Mash Mortar 51% over Starch Plating 33%, Peeler 16%; 1:12 took Mash Mortar 59% over Spud Sneakers 30%, Potato Rain 11%; 1:31 took Small Fry 49% over Seeker Sprouts 28%, Clean Plate 23%; 2:09 took Mash Mortar 69% over Sprout Squad 21%, Grab Bag 10%; 2:40 took Potato Rain 64% over Small Fry 22%, Salt Shaker 14%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Small Fry 1/8, Potato Rain 1/8, Mash Mortar 1/8 | 1:58 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Small Fry 2/8, Potato Rain 1/8, Mash Mortar 2/8 | 2:46 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Small Fry 2/8, Potato Rain 2/8, Mash Mortar 3/8.

### L5.I2.G9: early elite fights s39

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 39; 240s; plays the playbook with eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15, its own planner.goal.
- Outcome: died after 186.5s (game clock 03:06); damage taken 144 (enemy:fry-fly 16.137, enemy:potato-beetle 40.228, enemy:compost-maggot 5.69, enemy:frost-flea 2.903); 384 kills; level 1 to 7; planner asked 57 times, action model 603; the models saw the game 29 ms late (p90 50); ended with seeker-sprouts 1, comet-scythe 4, peel-phantom 1, gravy-heart 1.
- run.timeSec: 186.517
- run.level: 6
- run.kills: 384
- run.damageBySource: seeker-sprouts 3492.195, comet-scythe 4204.469, peel-phantom 474.305, grok-bot 23.979
- run.damageTakenBySource: enemy:fry-fly 16.137, enemy:potato-beetle 40.228, enemy:compost-maggot 5.69, enemy:frost-flea 2.903, enemy:sprout-mite 1.513, enemy:snow-mold 3.133, enemy:lint-bunny 1.61, boss:amusing 36.589, enemy:bog-slime 4.648, Hot oil 20.4, enemy:garden-slug 8.042, boss:beetle-queen 2.72
- run.killsBySource: seeker-sprouts 169, comet-scythe 184, peel-phantom 28, grok-bot 3
- run.biomes: ["fry-oil-desert","frozen-tundra","compost-caves","coin-laundromat","peel-forest","mash-swamp","ketchup-bog"]
- run.distance: 11446.197
- run.dodgePoints: 1377.522
- run.dodgeSecond: 186
- run.dodgeTaken: [113.797341703559,124.59070501526351,128.33954470497542,137.59718688726906,61.46717075068906,61.46717075068906,61.46717075068906,61.46717075068906,70.3372151951335,70.3372151951335,80.3160151951335,80.3160151951335,80.3160151951335,80.3160151951335,80.3160151951335,80.3160151951335,80.3160151951335,80.3160151951335,80.3160151951335,80.3160151951335,80.3160151951335,80.3160151951335,80.3160151951335,86.63795736951039,88.37129070284372,88.37129070284372,91.69755736951039,91.69755736951039,91.69755736951039,93.91506848062151,96.13257959173261,96.13257959173261,96.13257959173261,96.13257959173261,96.13257959173261,96.13257959173261,96.13257959173261,96.13257959173261,96.13257959173261,96.13257959173261,99.45884625839928,99.45884625839928,99.45884625839928,99.45884625839928,102.78511292506595,102.78511292506595,102.78511292506595,102.78511292506595,102.78511292506595,106.11137959173261,110.46400837022566,110.46400837022566,110.46400837022566,110.46400837022566,110.46400837022566,110.46400837022566,110.46400837022566,110.46400837022566,110.46400837022566,110.46400837022566,110.46400837022566]
- run.dodgeSteps: [1122.8163333332348,1129.0163333332318,1135.216333333229,1141.416333333226,768.3660000000384,774.5660000000355,780.7660000000326,786.9660000000297,793.1660000000268,798.2035000000258,801.6135000000274,810.8000000000269,815.3260000000267,818.7360000000284,822.8280000000268,832.448500000025,837.7185000000225,843.2985000000199,849.498500000017,855.6985000000141,861.8985000000112,866.1351666666758,872.3351666666729,878.53516666667,888.6051666666681,894.8051666666652,901.0051666666623,907.2051666666594,909.271833333325,917.6884999999905,923.8884999999876,930.0884999999847,936.2884999999818,942.4884999999789,948.688499999976,956.1784999999734,964.9584999999712,971.1584999999683,977.3584999999654,981.0009999999617,986.3174999999585,996.3874999999565,1002.5874999999536,1008.7874999999507,1012.0579999999484,1015.4679999999446,1024.7939999999423,1030.9939999999394,1036.5429999999365,1040.6763333332678,1050.7463333332657,1056.9463333332628,1063.14633333326,1069.346333333257,1075.546333333254,1085.6163333332522,1091.8163333332493,1098.0163333332464,1104.2163333332435,1110.4163333332406,1116.6163333332377]
- run.curseSince: 9687
- run.killer: "enemy:garden-slug"
- run.goldEarned: 7.508
- run.peakEnemies: 158
- run.grokBotHelps: 2
- run.lootRunnersMet: [1]
- counters.kills: 384
- counters.hits: 695
- counters.gems: 145
- counters.coins: 5
- counters.shots: 376
- counters.hostileShots: 452
- counters.nearMisses: 19
- counters.hostileHits: 10
- Gold, spots and chests: gold held at the end 7, spent 0; spots charged and used: none; chests seen 0, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Comet Scythe 89% over Four-Eyed Spud 8%, Spry Sprout 3%; 0:16 took Comet Scythe 64% over Chip Shuriken 29%, Fertilizer 7%; 0:45 took Peel Phantom 41% over Masher Grip 36%, Deep Fryer 23%; 0:56 took Comet Scythe 64% over Root Network 30%, Seeker Sprouts 6%; 1:24 took Comet Scythe 70% over Afterburner Fries 25%, Peel Phantom 5%; 2:41 took Gravy Heart 55% over Big Bowl 38%, Lean Lunch 7%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 3/8, Peel Phantom 1/8 | 2:00 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 4/8, Peel Phantom 1/8 | 2:59 level 7, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 4/8, Peel Phantom 1/8, Gravy Heart 1/5 | 3:06 level 7, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 4/8, Peel Phantom 1/8, Gravy Heart 1/5.
- Passive levels first reached: Gravy Heart 1 at 2:41.

### L5.I2.G10: early elite fights s40

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 40; 240s; plays the playbook with eliteFrom 50, eliteMinHp 0.8, eliteSeconds 15, its own planner.goal.
- Outcome: died after 233.6s (game clock 03:53); damage taken 239 (enemy:cave-grub 91.666, enemy:compost-maggot 2.854, enemy:frost-flea 7.407, enemy:snow-mold 14.645); 1432 kills; level 1 to 10; planner asked 74 times, action model 818; the models saw the game 29 ms late (p90 49); ended with seeker-sprouts 5, chip-shuriken 1, broadside 1, fry-sentry 1, small-fry 1, rosti-disc 1, hash-rush 1, gravy-heart 1, fertilizer 1.
- run.timeSec: 233.55
- run.level: 9
- run.kills: 1432
- run.damageBySource: seeker-sprouts 7908.48, chip-shuriken 8289.319, broadside 4639.107, fry-sentry 5428.959, small-fry 4367.719, rosti-disc 4890.645, grok-bot 129.76
- run.damageTakenBySource: enemy:cave-grub 91.666, enemy:compost-maggot 2.854, enemy:frost-flea 7.407, enemy:snow-mold 14.645, enemy:lint-bunny 1.497, boss:amusing 12.196, enemy:sand-crab 8.118, enemy:fry-fly 66.541, Hot oil 4.333, enemy:crumb-ant 3.806, enemy:oil-drip 13.108, enemy:sprout-mite 1.868, enemy:aphid 4.113, enemy:garden-slug 4.91, enemy:little-grey 2.18
- run.killsBySource: seeker-sprouts 428, chip-shuriken 221, broadside 184, fry-sentry 272, small-fry 173, rosti-disc 143, grok-bot 11
- run.biomes: ["frozen-tundra","coin-laundromat","compost-caves","chip-canyons","fry-oil-desert","mash-swamp","crop-circle"]
- run.distance: 14127.592
- run.dodgePoints: 1338.865
- run.dodgeSecond: 233
- run.dodgeTaken: [152.83852437666047,152.83852437666047,152.83852437666047,163.28181081193912,163.28181081193912,166.53611758152823,166.53611758152823,166.53611758152823,169.82169828284705,169.82169828284705,176.43764943414274,179.7522075707602,179.7522075707602,179.7522075707602,189.0525233819267,189.0525233819267,189.0525233819267,189.0525233819267,189.0525233819267,189.0525233819267,189.0525233819267,189.0525233819267,189.0525233819267,189.0525233819267,189.0525233819267,194.23319004859337,214.42672639501106,227.52827666692593,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,232.1522866792868,149.682723155991,149.682723155991,152.83852437666047,152.83852437666047,152.83852437666047,152.83852437666047,152.83852437666047,152.83852437666047,152.83852437666047,152.83852437666047]
- run.dodgeSteps: [1093.431999999832,1099.631999999829,1105.8319999998262,1112.0319999998233,1118.2319999998203,1124.4319999998174,1130.6319999998145,1136.8319999998116,1143.0319999998087,1149.2319999998058,1155.4319999998029,1165.501999999801,1171.701999999798,1177.9019999997952,1184.1019999997923,1194.1719999997904,1200.3719999997875,1206.5719999997846,1212.7719999997817,1217.6699999997784,1227.0424999997763,1233.2424999997734,1239.4424999997705,1245.6424999997676,1255.7124999997654,1260.3624999997633,1266.5624999997603,1272.7624999997574,1278.9624999997545,1289.0324999997526,1295.2324999997497,1301.4324999997468,1307.632499999744,1317.702499999742,1323.9024999997391,1330.1024999997362,1336.3024999997333,1342.5024999997304,1348.7024999997275,1354.9024999997246,1361.1024999997217,1371.1724999997198,1377.3724999997169,1380.5758333330486,1382.0224999997147,1384.8124999997133,1386.155833333046,1393.229166666379,1396.949166666377,1403.1491666663742,1409.3491666663713,1031.431999999861,1037.6319999998582,1043.8319999998553,1050.0319999998524,1056.2319999998494,1062.4319999998465,1068.6319999998436,1074.8319999998407,1081.0319999998378,1087.231999999835]
- run.curseSince: 9828
- run.killer: "enemy:little-grey"
- run.goldEarned: 183.175
- run.bossChests: 3
- run.bossesKilled: 1
- run.elitesKilled: 6
- run.peakEnemies: 173
- run.grokBotHelps: 6
- run.lootRunnersMet: [1,1]
- counters.kills: 1432
- counters.hits: 3817
- counters.gems: 255
- counters.coins: 36
- counters.shots: 1750
- counters.hostileShots: 174
- counters.nearMisses: 6
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 183, spent 0; spots charged and used: none; chests seen 7, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Seeker Sprouts 48% over Fertilizer 33%, Chives 19%; 0:36 took Chip Shuriken 47% over Hot Start 30%, Seeker Sprouts 23%; 0:53 took Broadside 83% over Mash Finisher 14%, Couch Potato 3%; 1:05 took Fry Cook Sentry 74% over Four-Eyed Spud 18%, Spud Sneakers 8%; 1:10 took Small Fry 59% over Starch Plating 37%, Potato Magnet 4%; 1:17 took Rösti Disc 54% over Broadside 29%, Reroll 11%, Bacon Bits 6%; 1:31 took Hash Rush 39% over Broadside 38%, Reroll 15%, Chip Shuriken 8%; 1:50 took Gravy Heart 41% over Fertilizer 33%, Four-Eyed Spud 19%, Reroll 7%; 2:43 took Fertilizer 44% over Chip Shuriken 23%, Hash Rush 17%, Reroll 16%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Chip Shuriken 1/8, Broadside 1/8 | 2:00 level 9, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Chip Shuriken 1/8, Broadside 1/8, Fry Cook Sentry 1/8, Small Fry 1/8, Rösti Disc 1/8, Hash Rush 1/5, Gravy Heart 1/5 | 3:00 level 10, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Chip Shuriken 1/8, Broadside 1/8, Fry Cook Sentry 1/8, Small Fry 1/8, Rösti Disc 1/8, Hash Rush 1/5, Gravy Heart 1/5, Fertilizer 1/5 | 3:53 level 10, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Chip Shuriken 1/8, Broadside 1/8, Fry Cook Sentry 1/8, Small Fry 1/8, Rösti Disc 1/8, Hash Rush 1/5, Gravy Heart 1/5, Fertilizer 1/5.
- Passive levels first reached: Hash Rush 1 at 1:31; Gravy Heart 1 at 1:50; Fertilizer 1 at 2:43.
