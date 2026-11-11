# Does ending stand-still goals when hurt (goal text plus planEvery 2) cut bursts and raise 4:00 survival?

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | refuted |
| Created | L5.I1 |
| Updated | L5.I2 |

## Hypothesis

Bursts of 40 hp or more in 5 s happen while a charge, open-chest or fight-elite goal holds Tibo in place and the goal is re-rated only every 5 s. A planner.goal text that rates keep-away highest whenever hurt_by shows damage in the last 3 s, and stand-still goals very low then, with planEvery 2 so the goal is re-rated within about 2 s of being hurt, cuts bursts and health lost in 1:00-2:30 and 2:00-3:30 without losing chests.

## Method

Seeker-sprouts, playbook knobs plus planEvery 2, only planner.goal changed, 240 s on s31-40 from 0:00, paired with the 10 playbook games on file (6 of 10 alive at 4:00). Manipulation check: a charge, open, fight or food goal ends and a keep-away goal starts within about 3 s of hurt_by showing damage (goal-change lines, dropped counts). Metrics chosen first: bursts of 40 hp or more in 5 s, health lost 1:00-2:30, chests opened (checked against run.bossChests), alive at 4:00. Adopt only on 8 or more of 10 alive with 3 or more net paired wins, or a large drop in bursts with no loss of chests; report mean and spread per arm. If the infra knob chargeAbortHurt arrives, test it next.

## Findings

10 paired seeds s31-40, 240 s: alive at 4:00 on 6 of 10, the same as the playbook (3 wins, 3 losses, 4 ties). Manipulation check passed: keep-away goals started at 87-96% within seconds of damage, and no goal-driven burst of 40+ hp in 3 s occurred. Bursts still came from the amusing boss (50 and 77 hp in about 4 s on s34 and s37) and the 3:00-3:40 crowd (s35, s40), and the opening deaths had 0-1 chests. Constant keep-away dropped chest goals (s38 6 dropped, 0 opened). Not added to the playbook (B98, B99). The chargeAbortHurt infra knob is still open.

## Games

### L5.I1.G1: keepaway when hurt s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with planEvery 2, its own planner.goal.
- Outcome: alive after 240s (game clock 04:00), health 145/149; damage taken 78 (Hot oil 38.467, enemy:potato-beetle 13.409, boss:amusing 13.305, enemy:frost-flea 1.443); 1838 kills; level 1 to 14; planner asked 153 times, action model 253; the models saw the game 44 ms late (p90 79); ended with seeker-sprouts 1, fry-lance 2, potato-rain 8, hash-bulwark 1, hash-boomerang 1, comet-scythe 1, starch-plating 1, root-network 1.
- run.timeSec: 240.017
- run.level: 13
- run.kills: 1838
- run.damageBySource: seeker-sprouts 4906.779, fry-lance 4803.273, potato-rain 6234.557, hash-brown-shield 9935.361, grok-bot 1248.452, alex 3669.078, hash-boomerang 9627.793, comet-scythe 2877.482, hash-bulwark 8970.698
- run.damageTakenBySource: Hot oil 38.467, enemy:potato-beetle 13.409, boss:amusing 13.305, enemy:frost-flea 1.443, boss:beetle-queen 8.495, enemy:snow-mold 2.989
- run.killsBySource: seeker-sprouts 201, fry-lance 216, potato-rain 246, hash-brown-shield 275, grok-bot 76, alex 145, hash-boomerang 310, comet-scythe 43, hash-bulwark 326
- run.evolutions: [{"id":"hash-bulwark","at":211.63333333333333}]
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","chip-canyons","peel-forest","frozen-tundra","compost-caves"]
- run.distance: 13073.785
- run.dodgePoints: 1987.143
- run.dodgeSecond: 240
- run.dodgeTaken: [70.48588032552368,72.80278958478294,72.80278958478294,72.80278958478294,72.80278958478294,72.80278958478294,75.79215535206416,75.79215535206416,75.79215535206416,75.79215535206416,75.79215535206416,75.79215535206416,75.79215535206416,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,78.1090646113234,65.18117333333328,66.62436489342491,66.62436489342491]
- run.dodgeSteps: [999.8894999999845,1006.0894999999816,1012.2894999999787,1018.4894999999758,1024.689499999973,1030.88949999997,1037.089499999967,1043.2894999999642,1049.4894999999613,1055.6894999999583,1061.8894999999554,1068.0894999999525,1074.2894999999496,1080.4894999999467,1086.6894999999438,1092.8894999999409,1099.089499999938,1104.0184999999371,1109.195499999936,1115.395499999933,1121.59549999993,1127.7954999999272,1133.9954999999243,1140.1954999999214,1146.3954999999185,1152.5954999999155,1158.7954999999126,1164.9954999999097,1170.3688333332407,1170.3688333332407,1174.502166666572,1174.502166666572,1176.5688333332378,1178.0154999999036,1181.8388333332352,1188.0388333332323,1194.2388333332294,1199.1368333332287,1203.7558333332283,1209.9558333332254,1214.2958333332233,1219.979166666554,1226.179166666551,1232.3791666665481,1238.5791666665452,1244.7791666665423,1250.9791666665394,1257.1791666665365,1263.3791666665336,1269.5791666665307,1275.7791666665278,1281.9791666665249,1287.4351666665232,1290.4731666665234,1290.4731666665234,1294.8751666665223,1301.0751666665194,1307.2751666665165,982.1368333333261,987.4894999999904,993.6894999999874]
- run.curseSince: 12648
- run.goldEarned: 390.193
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 201
- run.shrinesUsed: 2
- run.grokBotHelps: 3
- run.botSwarms: 2
- run.lootRunnersMet: [1]
- counters.kills: 1838
- counters.hits: 2559
- counters.gems: 786
- counters.coins: 52
- counters.shots: 841
- counters.hostileShots: 152
- counters.nearMisses: 12
- counters.hostileHits: 1
- shrineTotals.might: 0.102
- shrineTotals.maxHp: 24
- Gold, spots and chests: gold held at the end 389, spent 0; spots charged and used: Spud Freezer 3, Beetle Nest 1; chests seen 8, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Fry Lance 64% over Seeker Sprouts 26%, Grab Bag 10%; 0:23 took Potato Rain 67% over Fry Lance 22%, Spry Sprout 11%; 0:53 took Hash Brown Shield 62% over Starch Chain 23%, Potato Rain 15%; 0:59 took Hash Brown Shield 74% over Spud Fence 22%, Mezzaluna 4%; 1:13 took Potato Rain 60% over Tater Trot 24%, Seeker Sprouts 16%; 1:20 took Damage 90% over Cooldown 7%, Move speed 3%; 1:25 took Hash Brown Shield 58% over Gravy Splash 32%, Fry Lance 10%; 2:04 took Hash Brown Shield 66% over Starch Plating 31%, Potato Rain 3%; 2:39 took Starch Plating 95% over Fry Lance 3%, Seeker Sprouts 2%; 2:41 took Potato Rain 84% over Golden Fry 9%, Seeker Sprouts 7%; 2:44 took Hash Boomerang 83% over Golden Fry 9%, Spry Sprout 8%; 2:55 took Max HP 81% over Damage 17%, Crit 2%; 3:18 took Comet Scythe 53% over Starch Plating 47%, Golden Fry 0%; 3:30 took Root Network 60% over Hash Boomerang 21%, Reroll 11%, Golden Fry 8%; 3:56 took Fry Lance 51% over Seeker Sprouts 21%, Hash Boomerang 17%, Leave 11%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Fry Lance 1/8, Potato Rain 1/8, Hash Brown Shield 2/8 | 1:59 level 7, maxHp 120, armor 0, damageMult 1.102, recovery 0, Seeker Sprouts 1/8, Fry Lance 1/8, Potato Rain 2/8, Hash Brown Shield 7/8 | 2:59 level 11, maxHp 148.8, armor 20, damageMult 1.102, recovery 0, Seeker Sprouts 1/8, Fry Lance 1/8, Potato Rain 4/8, Hash Brown Shield 8/8, Hash Boomerang 1/8, Starch Plating 1/5 | 3:59 level 13, maxHp 148.8, armor 20, damageMult 1.102, recovery 0.25, Seeker Sprouts 1/8, Fry Lance 2/8, Potato Rain 8/8, Hash Bulwark 1/1, Hash Boomerang 1/8, Comet Scythe 1/8, Starch Plating 1/5, Root Network 1/5.
- Passive levels first reached: Starch Plating 1 at 2:39; Root Network 1 at 3:30.

### L5.I1.G2: keepaway when hurt s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 240s; plays the playbook with planEvery 2, its own planner.goal.
- Outcome: alive after 240.2s (game clock 04:00), health 104/120; damage taken 90 (Spore vent 4, enemy:cave-grub 29.405, enemy:sand-crab 36.503, enemy:bog-slime 1.868); 2118 kills; level 1 to 16; planner asked 156 times, action model 160; the models saw the game 37 ms late (p90 65); ended with seeker-sprouts 7, eclipse-scythe 1, gratin-arc 1, fry-lance 1, grab-bag 1, gravy-boat 1, big-bowl 3, sour-cream 3, hot-sauce 1.
- run.timeSec: 240.217
- run.level: 15
- run.kills: 2118
- run.damageBySource: seeker-sprouts 6218.52, comet-scythe 1106.331, starch-chain 21573.77, fry-lance 3397.753, grab-bag 3303.037, gravy-boat 2886.26, eclipse-scythe 13791.958, grok-bot 956.277, gratin-arc 12992.553
- run.damageTakenBySource: Spore vent 4, enemy:cave-grub 29.405, enemy:sand-crab 36.503, enemy:bog-slime 1.868, enemy:ketchup-drop 1.925, boss:beetle-queen 2.72, enemy:potato-beetle 13.568
- run.killsBySource: seeker-sprouts 214, comet-scythe 48, starch-chain 761, fry-lance 123, grab-bag 107, gravy-boat 99, eclipse-scythe 400, grok-bot 33, gratin-arc 333
- run.evolutions: [{"id":"eclipse-scythe","at":120.11666666666666},{"id":"gratin-arc","at":227.21666666666667}]
- run.biomes: ["compost-caves","frozen-tundra","chip-canyons","mash-swamp"]
- run.distance: 12686.027
- run.dodgePoints: 1962.772
- run.dodgeSecond: 240
- run.dodgeTaken: [73.70084433471328,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,76.42069433471327,83.20462210749994,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,89.98854988028661,73.70084433471328,73.70084433471328,73.70084433471328]
- run.dodgeSteps: [961.0826666666266,967.2826666666236,973.4826666666207,979.6826666666178,984.9526666666154,988.3626666666138,990.8426666666126,991.0493333332792,997.2493333332762,1003.4493333332733,1007.9959999999379,1014.195999999935,1017.6059999999334,1017.8126666666,1024.012666666597,1026.182666666596,1027.8359999999286,1034.0359999999257,1040.2359999999228,1046.4359999999199,1052.635999999917,1058.835999999914,1065.0359999999112,1071.2359999999082,1077.4359999999053,1083.6359999999024,1089.8359999998995,1096.0359999998966,1102.2359999998937,1108.4359999998908,1114.6359999998879,1120.835999999885,1127.035999999882,1129.6193333332142,1129.6193333332142,1134.4759999998785,1140.6759999998756,1146.8759999998726,1153.0759999998697,1159.2759999998668,1165.475999999864,1171.675999999861,1177.875999999858,1184.0759999998552,1190.2759999998523,1192.8593333331844,1199.0593333331815,1205.2593333331786,1211.4593333331757,1217.6593333331728,1223.8593333331698,1230.059333333167,1236.259333333164,1242.459333333161,1248.6593333331582,1254.8593333331553,1261.0593333331524,1267.2593333331495,946.2026666666336,952.4026666666307,956.9493333332952]
- run.curseSince: 12971
- run.goldEarned: 750.002
- run.bossChests: 10
- run.bossesKilled: 2
- run.elitesKilled: 8
- run.peakEnemies: 141
- run.shrinesUsed: 3
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2118
- counters.hits: 3053
- counters.crits: 104
- counters.gems: 1127
- counters.coins: 103
- counters.shots: 1180
- counters.hostileShots: 24
- counters.nearMisses: 3
- shrineTotals.might: 0.222
- shrineTotals.area: 0.06
- Gold, spots and chests: gold held at the end 750, spent 0; spots charged and used: Beetle Nest 2; chests seen 10, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Comet Scythe 88% over Peeler 7%, Sour Cream 5%; 0:13 took Comet Scythe 47% over Tater Twirl 46%, Seeker Sprouts 7%; 0:24 took Comet Scythe 68% over Seeker Sprouts 18%, Leave 14%; 0:27 took Starch Chain 47% over Comet Scythe 46%, Sour Cream 7%; 1:06 took Fry Lance 54% over Starch Chain 44%, Tot Toss 2%; 1:16 took Grab Bag 77% over Four-Eyed Spud 14%, Fertilizer 9%; 1:23 took Damage 89% over Luck 9%, Duration 2%; 1:26 took Gravy Boat 73% over Reroll 12%, Starch Chain 11%, Seeker Sprouts 4%; 1:38 took Damage 66% over XP gain 32%, Duration 2%; 1:54 took Big Bowl 64% over Grab Bag 19%, Reroll 10%, Couch Potato 6%, Skip 1%; 2:02 took Sour Cream 52% over Grab Bag 22%, Reroll 13%, Seeker Sprouts 11%, Skip 2%; 2:08 took Sour Cream 70% over Reroll 18%, Fry Lance 6%, Gravy Boat 5%, Skip 1%; 2:35 took Big Bowl 59% over Grab Bag 15%, Reroll 14%, Rotten Spud 10%, Skip 2%; 2:46 took Area 92% over Gold gain 6%, Move speed 2%; 2:47 took Starch Chain 75% over Reroll 14%, Fry Lance 6%, Gravy Boat 3%, Skip 2%; 3:16 took Sour Cream 55% over Hot Sauce 24%, Reroll 14%, Seeker Sprouts 5%, Skip 2%; 3:35 took Hot Sauce 79% over Grab Bag 8%, Thick Skin 6%, Reroll 6%, Skip 1%; 3:36 took Big Bowl 65% over Grab Bag 16%, Reroll 10%, Golden Fry 6%, Skip 3%; 3:52 took Seeker Sprouts 65% over Fertilizer 16%, Reroll 13%, Fry Lance 5%, Skip 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 3/8, Starch Chain 1/8 | 1:59 level 8, maxHp 120, armor 0, damageMult 1.222, recovery 0, Seeker Sprouts 1/8, Comet Scythe 5/8, Starch Chain 1/8, Fry Lance 1/8, Grab Bag 1/8, Gravy Boat 1/8, Big Bowl 1/5 | 2:59 level 12, maxHp 120, armor 0, damageMult 1.222, recovery 0, Seeker Sprouts 1/8, Eclipse Scythe 1/1, Starch Chain 3/8, Fry Lance 1/8, Grab Bag 1/8, Gravy Boat 1/8, Big Bowl 2/5, Sour Cream 2/5 | 3:59 level 16, maxHp 120, armor 0, damageMult 1.222, recovery 0, Seeker Sprouts 7/8, Eclipse Scythe 1/1, Gratin Arc 1/1, Fry Lance 1/8, Grab Bag 1/8, Gravy Boat 1/8, Big Bowl 3/5, Sour Cream 3/5, Hot Sauce 1/5.
- Passive levels first reached: Big Bowl 1 at 1:54, 3 at 3:36; Sour Cream 1 at 2:02, 3 at 3:17; Hot Sauce 1 at 3:35.

### L5.I1.G3: keepaway when hurt s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 240s; plays the playbook with planEvery 2, its own planner.goal.
- Outcome: alive after 240.1s (game clock 04:00), health 116/120; damage taken 73 (Spore vent 15.6, enemy:wireworm-larva 26.819, Brambles 8.9, Hot oil 21.333); 2903 kills; level 1 to 16; planner asked 155 times, action model 258; the models saw the game 38 ms late (p90 63); ended with overgrowth 1, starch-chain 1, hot-streak 8, broadside 1, hash-hawk 2, steam-vent 1, lean-lunch 4, fertilizer 1, thick-skin 2.
- run.timeSec: 240.117
- run.level: 15
- run.kills: 2903
- run.damageBySource: seeker-sprouts 3251.746, starch-chain 6176.433, hot-streak 2755.647, grok-bot 370.987, hash-hawk 881.921, broadside 332.892, overgrowth 70861.156
- run.damageTakenBySource: Spore vent 15.6, enemy:wireworm-larva 26.819, Brambles 8.9, Hot oil 21.333
- run.killsBySource: seeker-sprouts 192, starch-chain 205, hot-streak 46, grok-bot 17, hash-hawk 11, overgrowth 2431, broadside 1
- run.evolutions: [{"id":"overgrowth","at":107.78333333333333}]
- run.biomes: ["compost-caves","peel-forest","chip-canyons","mash-swamp","ketchup-bog","fry-oil-desert"]
- run.distance: 13901.485
- run.dodgePoints: 2086.181
- run.dodgeSecond: 240
- run.dodgeTaken: [51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,51.31887999999997,58.81887999999998,61.15221333333331,61.15221333333331,61.15221333333331,61.15221333333331,61.15221333333331,61.15221333333331,61.15221333333331,61.15221333333331,61.15221333333331,61.31887999999997,66.65221333333328,66.65221333333328,66.65221333333328,66.65221333333328,66.65221333333328,66.65221333333328,66.65221333333328,66.65221333333328,66.65221333333328,68.31887999999995,72.65221333333332,72.65221333333332,72.65221333333332,51.31887999999997,51.31887999999997,51.31887999999997]
- run.dodgeSteps: [1078.4951666664629,1084.69516666646,1090.895166666457,1091.1018333331235,1091.1018333331235,1091.1018333331235,1091.1018333331235,1091.1018333331235,1097.3018333331206,1100.9184999997856,1100.9184999997856,1106.2918333331165,1112.4918333331136,1118.6918333331107,1124.8918333331078,1131.091833333105,1137.291833333102,1143.491833333099,1149.6918333330962,1155.8918333330932,1162.0918333330903,1168.2918333330874,1174.4918333330845,1180.6918333330816,1186.8918333330787,1193.0918333330758,1199.2918333330729,1205.49183333307,1211.691833333067,1217.8918333330641,1224.0918333330612,1230.2918333330583,1236.4918333330554,1242.6918333330525,1248.8918333330496,1255.0918333330467,1261.2918333330438,1267.4918333330409,1273.691833333038,1279.891833333035,1286.0918333330321,1292.2918333330292,1298.4918333330263,1304.6918333330234,1310.8918333330205,1317.0918333330176,1323.2918333330147,1329.4918333330118,1335.6918333330088,1341.891833333006,1348.091833333003,1354.291833333,1360.4918333329972,1366.6918333329943,1372.8918333329914,1377.0251666663228,1383.2251666663199,1389.425166666317,1059.8951666664716,1066.0951666664687,1072.2951666664658]
- run.curseSince: 11948
- run.goldEarned: 519.305
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 122
- run.shrinesUsed: 1
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2903
- counters.hits: 3339
- counters.crits: 60
- counters.gems: 549
- counters.coins: 89
- counters.shots: 1527
- counters.hostileShots: 20
- counters.nearMisses: 2
- shrineTotals.critChance: 0.056
- Gold, spots and chests: gold held at the end 519, spent 0; spots charged and used: none; chests seen 8, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Lean Lunch 52% over Seeker Sprouts 32%, Sour Cream 16%; 0:21 took Starch Chain 60% over Stuffed Skin 23%, Seeker Sprouts 17%; 0:33 took Lean Lunch 56% over Whisk Vortex 25%, Julienne Dash 19%; 0:57 took Hot Streak 58% over Tot Stampede 28%, Spud Decoy 14%; 1:08 took Broadside 45% over Starch Chain 41%, Fertilizer 14%; 1:32 took Fertilizer 54% over Masher Grip 24%, Reroll 16%, Golden Fry 6%; 1:35 took Hash Hawk 54% over Starch Chain 20%, Fertilizer 17%, Reroll 9%; 1:51 took Hot Streak 44% over Big Bowl 30%, Reroll 14%, Broadside 12%; 2:19 took Hot Streak 84% over Broadside 6%, Hash Hawk 5%, Leave 5%; 2:29 took Lean Lunch 36% over Broadside 26%, Thick Skin 26%, Reroll 12%; 2:56 took Thick Skin 39% over Hash Hawk 31%, Mash Finisher 20%, Reroll 10%; 3:09 took Crit 64% over Move speed 21%, Luck 15%; 3:15 took Lean Lunch 39% over Starch Chain 31%, Gravy Heart 17%, Reroll 13%; 3:18 took Steam Vent 32% over Starch Chain 29%, Hash Hawk 20%, Reroll 19%; 3:18 took Hot Streak 88% over Reroll 6%, Starch Chain 5%, Hash Hawk 1%; 3:19 took Thick Skin 80% over Broadside 10%, Reroll 6%, Steam Vent 4%; 3:30 took Hash Hawk 45% over Lean Lunch 27%, Reroll 17%, Fertilizer 11%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Starch Chain 1/8, Hot Streak 1/8, Lean Lunch 2/5 | 1:59 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Overgrowth 1/1, Starch Chain 1/8, Hot Streak 2/8, Broadside 1/8, Hash Hawk 1/8, Lean Lunch 2/5, Fertilizer 1/5 | 2:59 level 11, maxHp 120, armor 0, damageMult 1, recovery 0, Overgrowth 1/1, Starch Chain 1/8, Hot Streak 6/8, Broadside 1/8, Hash Hawk 1/8, Lean Lunch 3/5, Fertilizer 1/5, Thick Skin 1/5 | 3:59 level 16, maxHp 120, armor 0, damageMult 1, recovery 0, Overgrowth 1/1, Starch Chain 1/8, Hot Streak 8/8, Broadside 1/8, Hash Hawk 2/8, Steam Vent 1/8, Lean Lunch 4/5, Fertilizer 1/5, Thick Skin 2/5.
- Passive levels first reached: Lean Lunch 1 at 0:09, 3 at 2:29; Fertilizer 1 at 1:32; Thick Skin 1 at 2:56.

### L5.I1.G4: keepaway when hurt s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 240s; plays the playbook with planEvery 2, its own planner.goal.
- Outcome: alive after 240.2s (game clock 04:00), health 102/120; damage taken 211 (Hot oil 16.667, enemy:oil-drip 16.685, enemy:spittlebug 2.98, boss:amusing 49.894); 1433 kills; level 1 to 14; planner asked 146 times, action model 434; the models saw the game 36 ms late (p90 57); ended with seeker-sprouts 1, mash-mallet 1, hash-hawk 3, starch-puddle 1, frozen-fries 2, potato-battery 5, root-network 1.
- run.timeSec: 240.2
- run.level: 13
- run.kills: 1433
- run.damageBySource: seeker-sprouts 4607.571, mash-mallet 4146.063, hash-hawk 7383.149, starch-puddle 11154.719, frozen-fries 3035.265, potato-battery 11858.266, grok-bot 233.304
- run.damageTakenBySource: Hot oil 16.667, enemy:oil-drip 16.685, enemy:spittlebug 2.98, boss:amusing 49.894, enemy:aphid 1.658, enemy:ketchup-drop 4.807, enemy:crumb-ant 7.518, enemy:fry-fly 9.395, enemy:bog-slime 2.465, boss:beetle-queen 30.825, enemy:potato-beetle 7.862, enemy:beetle-brood 4.645, enemy:cave-grub 29.514, Spore vent 8.8, enemy:compost-maggot 6.444, enemy:sand-crab 4.908, enemy:sprout-mite 2.101, enemy:wireworm-larva 4.324
- run.killsBySource: seeker-sprouts 221, mash-mallet 191, hash-hawk 144, starch-puddle 380, frozen-fries 95, potato-battery 396, grok-bot 6
- run.biomes: ["ketchup-bog","fry-oil-desert","crop-circle","chip-canyons","mash-swamp","peel-forest","frozen-tundra","compost-caves"]
- run.dogs: [{"id":"retriever","at":165.98333333333332}]
- run.dogHelp: fetched.retriever 250
- run.distance: 13110.108
- run.dodgePoints: 1554.045
- run.dodgeSecond: 240
- run.dodgeTaken: [120.43705363831108,124.31393148153607,124.31393148153607,124.31393148153607,131.5668648148694,131.5668648148694,131.5668648148694,131.5668648148694,131.5668648148694,131.5668648148694,131.5668648148694,134.2867148148694,149.39266304837946,152.68092241946025,152.68092241946025,152.68092241946025,152.68092241946025,152.68092241946025,152.68092241946025,156.72198769545994,156.72198769545994,156.72198769545994,156.72198769545994,156.72198769545994,156.72198769545994,162.1085043621266,164.24183769545996,168.24183769545996,168.24183769545996,168.24183769545996,168.24183769545996,168.24183769545996,168.24183769545996,168.24183769545996,168.24183769545996,168.24183769545996,168.24183769545996,170.3535288650402,170.3535288650402,170.3535288650402,170.3535288650402,170.3535288650402,170.3535288650402,170.3535288650402,174.46925361199072,174.46925361199072,174.46925361199072,174.46925361199072,187.2896560173504,202.86819735762333,204.9691386337279,204.9691386337279,204.9691386337279,204.9691386337279,204.9691386337279,209.29358021262934,211.49286637379583,211.49286637379583,99.72683473716039,99.72683473716039,99.72683473716039]
- run.dodgeSteps: [974.9241666665615,981.1241666665586,987.3241666665557,989.8041666665546,994.7641666665522,1000.390833333219,1005.1441666665502,1011.3441666665473,1017.5441666665444,1020.5408333332095,1026.7408333332066,1032.9408333332037,1039.1408333332008,1045.0308333331982,1051.2308333331953,1057.4308333331924,1061.9774999998567,1068.1774999998538,1074.377499999851,1080.577499999848,1086.777499999845,1092.9774999998422,1099.1774999998393,1105.3774999998363,1111.5774999998334,1117.7774999998305,1123.9774999998276,1130.1774999998247,1136.3774999998218,1142.5774999998189,1148.777499999816,1154.977499999813,1161.1774999998102,1167.3774999998072,1173.5774999998043,1179.7774999998014,1185.9774999997985,1192.1774999997956,1195.6908333331273,1201.8908333331244,1208.0908333331215,1214.2908333331186,1220.4908333331157,1226.6908333331128,1232.8908333331099,1239.090833333107,1245.290833333104,1251.4908333331011,1257.587499999765,1262.2374999997628,1268.43749999976,1274.637499999757,1278.7708333330884,1284.9708333330855,1291.1708333330826,1297.3708333330796,1303.5708333330767,1309.7708333330738,956.3241666665702,962.5241666665673,968.7241666665644]
- run.curseSince: 10989
- run.goldEarned: 135.03
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 176
- run.shrinesUsed: 2
- run.grokBotHelps: 4
- run.lootRunnersMet: [1,1]
- counters.kills: 1433
- counters.hits: 3517
- counters.gems: 1002
- counters.coins: 66
- counters.shots: 966
- counters.hostileShots: 230
- counters.nearMisses: 29
- counters.hostileHits: 9
- shrineTotals.might: 0.084
- shrineTotals.duration: 0.072
- Gold, spots and chests: gold held at the end 135, spent 0; spots charged and used: Spud Freezer 2, Crop Patch 1, Tater Lantern 1; chests seen 6, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Mash Mallet 75% over Seeker Sprouts 23%, Golden Fry 2%; 0:22 took Hash Hawk 36% over Tater Twirl 36%, Butter Pat 28%; 0:26 took Starch Puddle 55% over Rösti Disc 36%, Hot Sauce 9%; 0:27 took Frozen Fries 76% over Starch Puddle 18%, Mash Mallet 6%; 0:55 took Damage 64% over Area 20%, Gold gain 16%; 1:33 took Potato Battery 70% over Hash Hawk 25%, Skip 3%, Seeker Sprouts 2%; 1:56 took Duration 84% over Area 13%, Luck 3%; 1:57 took Potato Battery 73% over Sour Cream 22%, Clean Plate 3%, Skip 2%; 2:24 took Potato Battery 54% over Frozen Fries 26%, Starch Puddle 16%, Skip 4%; 2:53 took Hash Hawk 47% over Starch Puddle 32%, Tater Trot 16%, Skip 5%; 3:00 took Potato Battery 79% over Frozen Fries 11%, Hot Sauce 8%, Skip 2%; 3:02 took Potato Battery 51% over Root Network 43%, Hot Sauce 4%, Skip 2%; 3:03 took Root Network 75% over Frozen Fries 18%, Seeker Sprouts 4%, Skip 3%; 3:27 took Hash Hawk 81% over Clean Plate 10%, Seeker Sprouts 6%, Skip 3%; 3:51 took Frozen Fries 46% over Starch Puddle 38%, Mash Mallet 8%, Skip 8%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1.084, recovery 0, Seeker Sprouts 1/8, Mash Mallet 1/8, Hash Hawk 1/8, Starch Puddle 1/8, Frozen Fries 1/8 | 1:59 level 7, maxHp 120, armor 0, damageMult 1.084, recovery 0, Seeker Sprouts 1/8, Mash Mallet 1/8, Hash Hawk 1/8, Starch Puddle 1/8, Frozen Fries 1/8, Potato Battery 2/8 | 2:59 level 9, maxHp 120, armor 0, damageMult 1.084, recovery 0, Seeker Sprouts 1/8, Mash Mallet 1/8, Hash Hawk 2/8, Starch Puddle 1/8, Frozen Fries 1/8, Potato Battery 3/8 | 3:59 level 14, maxHp 120, armor 0, damageMult 1.084, recovery 0.25, Seeker Sprouts 1/8, Mash Mallet 1/8, Hash Hawk 3/8, Starch Puddle 1/8, Frozen Fries 2/8, Potato Battery 5/8, Root Network 1/5.
- Passive levels first reached: Root Network 1 at 3:03.

### L5.I1.G5: keepaway when hurt s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 240s; plays the playbook with planEvery 2, its own planner.goal.
- Outcome: died after 233.7s (game clock 03:53); damage taken 178 (enemy:aphid 6.464, enemy:compost-maggot 1.154, enemy:crumb-ant 1.344, enemy:bog-slime 1.951); 1696 kills; level 1 to 13; planner asked 146 times, action model 426; the models saw the game 34 ms late (p90 57); ended with seeker-sprouts 1, spud-dynamo 2, seed-potato 8, starch-puddle 4, spud-fence 1, hot-streak 2, aged-russet 1, fertilizer 1.
- run.timeSec: 233.733
- run.level: 12
- run.kills: 1696
- run.damageBySource: seeker-sprouts 4666.973, spud-dynamo 6542.056, starch-puddle 10104.159, seed-potato 5989.021, spud-fence 10928.599, grok-bot 194.719, hot-streak 8424.933
- run.damageTakenBySource: enemy:aphid 6.464, enemy:compost-maggot 1.154, enemy:crumb-ant 1.344, enemy:bog-slime 1.951, enemy:ketchup-drop 2.144, enemy:swarm-fly 2.772, boss:amusing 36.589, Spore vent 2.267, enemy:sprout-mite 9.546, boss:beetle-queen 9.066, Brambles 1.1, enemy:potato-beetle 24.794, enemy:sand-crab 28.467, enemy:snow-mold 36.791, enemy:tomato-leech 4.078, enemy:frost-flea 4.164, enemy:garden-slug 4.992
- run.killsBySource: seeker-sprouts 199, spud-dynamo 164, starch-puddle 362, seed-potato 224, spud-fence 364, grok-bot 11, hot-streak 372
- run.biomes: ["compost-caves","peel-forest","mash-swamp","fry-oil-desert","chip-canyons","frozen-tundra"]
- run.distance: 12145.083
- run.dodgePoints: 1771.183
- run.dodgeSecond: 233
- run.dodgeTaken: [69.26328092372898,69.26328092372898,70.36328092372898,70.36328092372898,70.36328092372898,70.36328092372898,70.36328092372898,70.36328092372898,70.36328092372898,72.28196986729112,72.28196986729112,72.28196986729112,72.28196986729112,76.22257792505647,76.22257792505647,80.81995399244937,80.81995399244937,80.81995399244937,80.81995399244937,80.81995399244937,80.81995399244937,88.8065306065952,88.8065306065952,88.8065306065952,93.50255856186389,97.55954915019713,97.55954915019713,101.6378698646356,101.6378698646356,101.6378698646356,111.20993663037909,111.20993663037909,124.9056970503735,124.9056970503735,153.77974892067584,153.77974892067584,162.08532168025533,162.08532168025533,162.08532168025533,162.08532168025533,162.08532168025533,164.19974566570227,164.19974566570227,164.19974566570227,172.6901213193027,172.6901213193027,172.6901213193027,172.6901213193027,172.6901213193027,172.6901213193027,172.6901213193027,56.488513143875565,56.488513143875565,56.488513143875565,56.488513143875565,60.197114257062324,60.197114257062324,60.197114257062324,60.197114257062324,60.197114257062324,60.197114257062324]
- run.dodgeSteps: [987.0916666666214,993.2916666666185,999.4916666666156,1005.6916666666127,1008.688333333278,1014.8883333332751,1021.0883333332722,1023.2583333332711,1029.4583333332682,1035.6583333332653,1038.861666666597,1043.4083333332617,1049.6083333332588,1055.8083333332559,1060.0449999999205,1066.2449999999176,1069.0349999999164,1072.2383333332482,1077.5083333332457,1083.7083333332428,1086.6016666665748,1092.3883333332387,1096.0049999999037,1098.4849999999026,1101.8949999999008,1105.5116666665658,1105.5116666665658,1108.1983333332314,1112.5383333332293,1114.1916666665618,1119.7716666665592,1123.3883333332242,1127.9349999998888,1136.0416666665544,1140.3816666665523,1142.5516666665512,1148.7516666665483,1153.6083333332128,1162.9549999998778,1169.154999999875,1171.738333333207,1175.7683333332052,1181.9683333332023,1190.384999999868,1194.0016666665329,1195.6549999998654,1198.0316666665308,1203.7983333331963,1209.4449999998617,1209.548333333195,1212.9583333331934,935.011666666646,939.041666666644,939.041666666644,943.6916666666418,949.8916666666389,956.091666666636,962.2916666666331,968.4916666666302,974.6916666666273,980.8916666666244]
- run.curseSince: 12956
- run.killer: "enemy:garden-slug"
- run.goldEarned: 258.927
- run.bossChests: 4
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 161
- run.shrinesUsed: 2
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 1696
- counters.hits: 3141
- counters.gems: 690
- counters.coins: 49
- counters.shots: 610
- counters.hostileShots: 76
- counters.nearMisses: 11
- counters.hostileHits: 3
- shrineTotals.cooldown: 0.03
- shrineTotals.greed: 0.1
- Gold, spots and chests: gold held at the end 258, spent 0; spots charged and used: Crop Patch 1; chests seen 6, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Spud Dynamo 52% over Peel Out 33%, Tailgate Fries 15%; 0:23 took Seed Potato 75% over Seeker Sprouts 20%, Couch Potato 5%; 0:25 took Starch Puddle 53% over Chives 35%, Seeker Sprouts 12%; 0:52 took Spud Fence 54% over Seed Potato 40%, Rotten Spud 6%; 1:08 took Seed Potato 43% over Leave 23%, Spud Fence 21%, Seeker Sprouts 13%; 1:16 took Seed Potato 74% over Spud Dynamo 11%, Leave 10%, Starch Puddle 5%; 1:17 took Seed Potato 92% over Starch Puddle 4%, Spud Fence 4%; 1:23 took Cooldown 54% over Armor 39%, Move speed 7%; 1:25 took Spud Dynamo 48% over Fertilizer 47%, Salt Shaker 5%; 1:48 took Starch Puddle 39% over Spud Fence 30%, Leave 16%, Seeker Sprouts 15%; 2:00 took Seed Potato 75% over Fertilizer 19%, Seeker Sprouts 3%, Skip 3%; 2:01 took Hot Streak 77% over Fertilizer 16%, Spud Fence 5%, Skip 2%; 2:08 took Starch Puddle 41% over Fertilizer 30%, Spud Fence 22%, Skip 7%; 2:39 took Gold gain 56% over Crit 25%, Luck 19%; 2:40 took Aged Russet 51% over Fertilizer 30%, Seeker Sprouts 16%, Skip 3%; 3:15 took Hot Streak 44% over Fertilizer 37%, Spud Fence 13%, Skip 6%; 3:35 took Fertilizer 72% over Spud Fence 9%, Reroll 9%, Seeker Sprouts 7%, Skip 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Spud Dynamo 1/8, Seed Potato 1/8, Starch Puddle 1/8, Spud Fence 1/8 | 2:00 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Spud Dynamo 2/8, Seed Potato 6/8, Starch Puddle 2/8, Spud Fence 1/8 | 2:59 level 11, maxHp 120, armor 0, damageMult 1.05, recovery 0, Seeker Sprouts 1/8, Spud Dynamo 2/8, Seed Potato 7/8, Starch Puddle 3/8, Spud Fence 1/8, Hot Streak 1/8, Aged Russet 1/5 | 3:53 level 13, maxHp 120, armor 0, damageMult 1.06, recovery 0, Seeker Sprouts 1/8, Spud Dynamo 2/8, Seed Potato 8/8, Starch Puddle 4/8, Spud Fence 1/8, Hot Streak 2/8, Aged Russet 1/5, Fertilizer 1/5.
- Passive levels first reached: Aged Russet 1 at 2:40; Fertilizer 1 at 3:36.

### L5.I1.G6: keepaway when hurt s36

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 36; 240s; plays the playbook with planEvery 2, its own planner.goal.
- Outcome: died after 122.4s (game clock 02:02); damage taken 121 (enemy:sprout-mite 2.438, enemy:fry-fly 82.872, enemy:ketchup-drop 1.862, enemy:crumb-ant 2.874); 224 kills; level 1 to 7; planner asked 72 times, action model 182; the models saw the game 33 ms late (p90 54); ended with seeker-sprouts 3, comet-scythe 2, lean-lunch 3.
- run.timeSec: 122.417
- run.level: 6
- run.kills: 224
- run.damageBySource: seeker-sprouts 4572.71, comet-scythe 1186.256, grok-bot 281.33
- run.damageTakenBySource: enemy:sprout-mite 2.438, enemy:fry-fly 82.872, enemy:ketchup-drop 1.862, enemy:crumb-ant 2.874, enemy:sand-crab 17.186, boss:amusing 13.305
- run.killsBySource: seeker-sprouts 179, comet-scythe 41, grok-bot 4
- run.biomes: ["compost-caves","chip-canyons","peel-forest","mash-swamp","ketchup-bog","fry-oil-desert"]
- run.distance: 7249.098
- run.dodgePoints: 715.694
- run.dodgeSecond: 122
- run.dodgeTaken: [107.23231128582435,85.31040364664933,85.31040364664933,85.31040364664933,85.31040364664933,85.31040364664933,85.31040364664933,85.31040364664933,85.31040364664933,85.31040364664933,87.17224603460839,87.17224603460839,87.17224603460839,87.17224603460839,87.17224603460839,88.61392649102282,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,90.04627583020478,95.7749543154113,101.50363280061782,101.50363280061782,101.50363280061782,107.23231128582435,107.23231128582435,107.23231128582435,107.23231128582435,107.23231128582435,107.23231128582435,107.23231128582435,107.23231128582435,107.23231128582435]
- run.dodgeSteps: [724.9098333332297,360.56649999999485,366.76649999999466,372.9664999999945,379.1664999999943,385.3664999999941,391.56649999999394,397.76649999999375,403.9664999999936,408.92649999999344,408.92649999999344,417.343166666661,423.5431666666635,429.74316666666607,435.9431666666686,442.14316666666707,448.34316666666416,454.54316666666125,460.74316666665834,466.94316666665543,473.1431666666525,479.34316666664984,485.5431666666469,491.743166666644,497.9431666666411,504.1431666666382,510.3431666666353,516.5431666666324,522.7431666666295,528.9431666666266,535.1431666666236,541.3431666666207,547.5431666666178,553.7431666666192,559.9431666666218,566.1431666666243,572.3431666666265,578.5431666666267,584.7431666666251,590.9431666666222,597.1431666666193,603.3431666666164,609.5431666666135,615.7431666666106,621.9431666666077,628.1431666666048,634.343166666602,640.5431666665991,646.5364999999296,651.0831666665941,657.2831666665912,663.4831666665883,672.1064999999196,678.3064999999167,684.5064999999138,690.7064999999109,696.906499999908,703.106499999905,709.3064999999021,715.5064999998992,721.7064999998966]
- run.curseSince: 4162
- run.killer: "boss:amusing"
- run.goldEarned: 69.545
- run.bossChests: 1
- run.elitesKilled: 3
- run.peakEnemies: 99
- run.grokBotHelps: 3
- counters.kills: 224
- counters.hits: 371
- counters.gems: 94
- counters.coins: 17
- counters.shots: 304
- counters.hostileShots: 10
- counters.nearMisses: 1
- counters.hostileHits: 4
- Gold, spots and chests: gold held at the end 69, spent 0; spots charged and used: Crop Patch 1, Beetle Nest 1; chests seen 3, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Lean Lunch 52% over Seeker Sprouts 42%, Slow Cooker 6%; 0:20 took Seeker Sprouts 51% over Spud Cannon 37%, Mezzaluna 12%; 0:25 took Lean Lunch 56% over Tater Twirl 41%, Hearty Helping 3%; 0:57 took Comet Scythe 71% over Seeker Sprouts 22%, Hot Sauce 7%; 1:09 took Lean Lunch 51% over Peeler 30%, Seeker Sprouts 19%; 1:37 took Comet Scythe 38% over Lean Lunch 35%, Hot Start 27%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Comet Scythe 1/8, Lean Lunch 2/5 | 1:59 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Comet Scythe 2/8, Lean Lunch 3/5 | 2:02 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Comet Scythe 2/8, Lean Lunch 3/5.
- Passive levels first reached: Lean Lunch 1 at 0:08, 3 at 1:09.

### L5.I1.G7: keepaway when hurt s37

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 37; 240s; plays the playbook with planEvery 2, its own planner.goal.
- Outcome: alive after 240.1s (game clock 04:00), health 67/138; damage taken 183 (Spore vent 31.6, enemy:cave-grub 8.115, enemy:lint-bunny 15.557, enemy:compost-maggot 2.779); 1059 kills; level 1 to 11; planner asked 139 times, action model 385; the models saw the game 32 ms late (p90 53); ended with seeker-sprouts 4, broadside 1, mash-landing 1, steam-vent 1, mash-snowball 1, harvest-moon 2, aged-russet 3, gpu 1.
- run.timeSec: 240.1
- run.level: 10
- run.kills: 1059
- run.damageBySource: seeker-sprouts 6953.183, broadside 7186.056, steam-vent 1033.527, mash-snowball 7645.332, grok-bot 1186.805, harvest-moon 5134.033, mash-landing 113.644
- run.damageTakenBySource: Spore vent 31.6, enemy:cave-grub 8.115, enemy:lint-bunny 15.557, enemy:compost-maggot 2.779, boss:amusing 76.504, enemy:sprout-mite 1.905, enemy:bog-slime 2.551, boss:beetle-queen 18.132, enemy:tomato-leech 16.555, Hot oil 5.067, enemy:sock-pile 3.742
- run.killsBySource: seeker-sprouts 300, broadside 223, steam-vent 21, mash-snowball 315, grok-bot 30, harvest-moon 169, mash-landing 1
- run.biomes: ["compost-caves","peel-forest","coin-laundromat","ketchup-bog","mash-swamp","frozen-tundra"]
- run.distance: 13311.35
- run.dodgePoints: 1521.891
- run.dodgeSecond: 240
- run.dodgeTaken: [137.14009880609504,139.85994880609505,139.85994880609505,139.85994880609505,145.29964880609504,150.73934880609505,155.27243213942836,155.27243213942836,155.27243213942836,155.27243213942836,155.27243213942836,155.27243213942836,167.70603213942837,167.70603213942837,167.70603213942837,167.70603213942837,172.10603213942838,172.10603213942838,172.10603213942838,172.77269880609504,172.77269880609504,172.77269880609504,172.77269880609504,172.77269880609504,176.51469397034705,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,178.38569155247305,182.50681876485797,182.50681876485797,182.50681876485797,182.50681876485797,182.50681876485797,182.50681876485797,182.50681876485797,137.14009880609504,137.14009880609504,137.14009880609504]
- run.dodgeSteps: [1007.4949999999369,1010.9049999999331,1014.3149999999293,1019.3059999999261,1025.5059999999232,1031.7059999999203,1036.3559999999181,1042.5559999999152,1048.7559999999123,1054.9559999999094,1061.1559999999065,1065.702666666571,1071.9026666665682,1078.1026666665653,1084.3026666665623,1090.5026666665594,1096.7026666665565,1102.9026666665536,1109.1026666665507,1115.3026666665478,1121.5026666665449,1127.702666666542,1133.902666666539,1140.1026666665362,1146.3026666665332,1152.5026666665303,1158.7026666665274,1164.9026666665245,1171.1026666665216,1177.3026666665187,1183.5026666665158,1189.7026666665129,1195.90266666651,1202.102666666507,1208.3026666665041,1214.5026666665012,1220.7026666664983,1226.9026666664954,1233.1026666664925,1239.3026666664896,1245.5026666664867,1251.7026666664838,1257.9026666664809,1262.5216666664805,1268.2876666664783,1274.4876666664754,1280.6876666664725,1286.4536666664703,1292.6536666664674,1298.8536666664645,1302.0569999997974,1304.8779999997973,1304.8779999997973,1307.4819999997976,1313.1239999997956,1319.3239999997927,1325.5239999997898,1330.7009999997886,997.2649999999483,1000.6749999999445,1004.0849999999407]
- run.curseSince: 13098
- run.goldEarned: 174.728
- run.goldSpent: 30
- run.bossChests: 2
- run.paidChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 178
- run.shrinesUsed: 1
- run.grokBotHelps: 4
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1059
- counters.hits: 1931
- counters.gems: 357
- counters.coins: 30
- counters.shots: 855
- counters.hostileShots: 93
- counters.nearMisses: 32
- counters.hostileHits: 8
- shrineTotals.might: 0.06
- Gold, spots and chests: gold held at the end 144, spent 30 (Potato Crate 30); spots charged and used: Spud Freezer 1; chests seen 6, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:04 took Broadside 78% over Gravy Heart 15%, Gravy Splash 7%; 0:11 took Mash Landing 56% over Broadside 28%, Packed Pan 16%; 0:38 took Steam Vent 59% over Seeker Sprouts 23%, Sour Cream 18%; 1:06 took Mash Snowball 56% over Steam Vent 39%, Gravy Boat 5%; 1:07 took Aged Russet 50% over Mash Snowball 34%, Seeker Sprouts 16%; 1:11 took Harvest Moon 55% over Fry Lance 42%, Rotten Spud 3%; 1:19 took Damage 69% over Area 29%, Luck 2%; 1:53 took Aged Russet 40% over Seeker Sprouts 32%, Root Network 28%; 2:18 took Aged Russet 61% over Seeker Sprouts 30%, Steam Vent 9%; 2:39 took Harvest Moon 36% over Mash Snowball 24%, Broadside 23%, Leave 17%; 2:40 took GPU 74% over Broadside 15%, Seeker Sprouts 11%; 3:38 took Seeker Sprouts 56% over Mash Landing 23%, Broadside 21%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Broadside 1/8, Mash Landing 1/8, Steam Vent 1/8 | 1:59 level 8, maxHp 138, armor 0, damageMult 1.134, recovery 0, Seeker Sprouts 2/8, Broadside 1/8, Mash Landing 1/8, Steam Vent 1/8, Mash Snowball 1/8, Harvest Moon 1/8, Aged Russet 2/5 | 2:58 level 10, maxHp 138, armor 0, damageMult 1.203, recovery 0, Seeker Sprouts 3/8, Broadside 1/8, Mash Landing 1/8, Steam Vent 1/8, Mash Snowball 1/8, Harvest Moon 2/8, Aged Russet 3/5, GPU 1/5 | 3:59 level 11, maxHp 138, armor 0, damageMult 1.219, recovery 0, Seeker Sprouts 4/8, Broadside 1/8, Mash Landing 1/8, Steam Vent 1/8, Mash Snowball 1/8, Harvest Moon 2/8, Aged Russet 3/5, GPU 1/5.
- Passive levels first reached: Aged Russet 1 at 1:07, 3 at 2:18; GPU 1 at 2:40.

### L5.I1.G8: keepaway when hurt s38

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 38; 240s; plays the playbook with planEvery 2, its own planner.goal.
- Outcome: died after 192s (game clock 03:12); damage taken 124 (enemy:potato-beetle 11.009, Spore vent 3.333, enemy:aphid 4.375, enemy:little-grey 3.014); 878 kills; level 1 to 10; planner asked 111 times, action model 367; the models saw the game 31 ms late (p90 51); ended with seeker-sprouts 3, mash-wave 1, spud-decoy 1, seed-potato 2, tot-toss 1, frying-pan 2, thick-skin 1.
- run.timeSec: 192
- run.level: 9
- run.kills: 878
- run.damageBySource: seeker-sprouts 4433.283, mash-wave 7609.789, seed-potato 3278.169, spud-decoy 2652.012, tot-toss 1458.295, frying-pan 1625.864
- run.damageTakenBySource: enemy:potato-beetle 11.009, Spore vent 3.333, enemy:aphid 4.375, enemy:little-grey 3.014, enemy:sprout-mite 6.929, enemy:cave-grub 26.819, enemy:compost-maggot 3.071, boss:amusing 29.936, enemy:bog-slime 2.326, Hot oil 11.733, enemy:ketchup-drop 2.494, enemy:oil-drip 2.521, enemy:sand-crab 4.424, boss:beetle-queen 2.72, enemy:beetle-brood 9.29
- run.killsBySource: seeker-sprouts 221, mash-wave 273, seed-potato 144, spud-decoy 149, tot-toss 45, frying-pan 46
- run.biomes: ["compost-caves","peel-forest","crop-circle","mash-swamp","ketchup-bog"]
- run.distance: 10870.463
- run.dodgePoints: 1423.495
- run.dodgeSecond: 192
- run.dodgeTaken: [101.17400290245592,101.17400290245592,108.11840214974615,108.11840214974615,108.11840214974615,108.11840214974615,110.03709109330829,114.70360632704651,114.70360632704651,123.99377907747125,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,84.62121869290985,86.94684564249826,86.94684564249826,86.94684564249826,86.94684564249826,86.94684564249826,86.94684564249826,86.94684564249826,92.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,98.6801789758316,101.17400290245592,101.17400290245592,101.17400290245592,101.17400290245592,101.17400290245592,101.17400290245592,101.17400290245592]
- run.dodgeSteps: [1032.0833333331568,1037.4463333331537,1043.6463333331508,1049.8463333331479,1056.046333333145,1062.246333333142,1068.4463333331391,1074.6463333331362,1080.8463333331333,1087.0463333331304,779.7278333332854,785.9278333332825,792.1278333332796,795.7444999999445,801.1178333332753,807.3178333332723,813.5178333332746,819.7178333332765,822.8953333332735,824.2024999999387,825.9074999999368,827.5556666666016,832.3606666665983,836.4939999999297,842.6939999999267,846.5173333332583,852.0973333332556,856.3443333332522,860.8238333332487,867.0238333332458,872.3868333332426,875.7968333332389,881.3923333332357,885.9389999999003,892.1389999998974,898.3389999998944,902.2656666665592,905.4689999998911,911.6689999998882,917.8689999998853,922.828999999883,925.1023333332153,931.3023333332123,937.5023333332094,943.7023333332065,949.9023333332036,956.1023333332007,962.3023333331978,966.6888333331942,970.1453333331905,976.3453333331876,982.5453333331847,988.7453333331817,994.9453333331788,1001.1453333331759,1007.345333333173,1011.8919999998376,1013.9586666665033,1019.4353333331674,1025.2633333331644,1028.6733333331606]
- run.curseSince: 8360
- run.killer: "enemy:beetle-brood"
- run.goldEarned: 80.217
- run.bossChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 162
- run.grokBotHelps: 4
- run.lootRunnersMet: [1,1]
- counters.kills: 878
- counters.hits: 1630
- counters.gems: 316
- counters.coins: 45
- counters.shots: 852
- counters.hostileShots: 119
- counters.nearMisses: 5
- counters.hostileHits: 1
- Gold, spots and chests: gold held at the end 80, spent 0; spots charged and used: none; chests seen 3, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Seeker Sprouts 44% over Hot Potato 37%, Salt Line 19%; 0:13 took Mash Wave 63% over Lean Lunch 26%, Butter Socks 11%; 0:23 took Spud Decoy 67% over Mash Wave 18%, Masher Grip 15%; 0:41 took Seed Potato 71% over Seeker Sprouts 24%, Tailgate Fries 5%; 1:30 took Tot Toss 41% over Mash Finisher 28%, Seeker Sprouts 23%, Reroll 8%; 1:37 took Frying Pan 63% over Lean Lunch 28%, Reroll 5%, Spry Sprout 4%; 1:56 took Frying Pan 38% over Four-Eyed Spud 31%, Reroll 19%, Mash Wave 12%; 2:19 took Thick Skin 55% over Seeker Sprouts 21%, Sprouting Eyes 15%, Reroll 9%; 2:44 took Seed Potato 42% over Mash Finisher 27%, Reroll 17%, Mash Wave 14%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Mash Wave 1/8, Spud Decoy 1/8, Seed Potato 1/8 | 2:00 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Mash Wave 1/8, Spud Decoy 1/8, Seed Potato 1/8, Tot Toss 1/8, Frying Pan 2/8 | 3:00 level 10, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Mash Wave 1/8, Spud Decoy 1/8, Seed Potato 2/8, Tot Toss 1/8, Frying Pan 2/8, Thick Skin 1/5 | 3:10 level 10, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Mash Wave 1/8, Spud Decoy 1/8, Seed Potato 2/8, Tot Toss 1/8, Frying Pan 2/8, Thick Skin 1/5.
- Passive levels first reached: Thick Skin 1 at 2:19.

### L5.I1.G9: keepaway when hurt s39

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 39; 240s; plays the playbook with planEvery 2, its own planner.goal.
- Outcome: alive after 240.2s (game clock 04:00), health 120/120; damage taken 11 (enemy:crumb-ant 1.306, Brambles 1.7, enemy:snow-mold 7.745); 2367 kills; level 1 to 17; planner asked 155 times, action model 129; the models saw the game 33 ms late (p90 52); ended with seeker-sprouts 1, mash-golem 1, tater-minigun 1, hash-brown-shield 4, hash-boomerang 1, root-cellar 1, gpu 1, masher-grip 1, starch-plating 2, slow-cooker 2, packed-pan 1.
- run.timeSec: 240.217
- run.level: 16
- run.kills: 2367
- run.damageBySource: seeker-sprouts 5202.249, mash-golem 1198.412, locked-gatling 21129.469, grok-bot 1813.886, hash-brown-shield 5555.788, hash-boomerang 15790.057, root-cellar 5811.301, tater-minigun 5093.131
- run.damageTakenBySource: enemy:crumb-ant 1.306, Brambles 1.7, enemy:snow-mold 7.745
- run.killsBySource: seeker-sprouts 249, mash-golem 68, locked-gatling 851, grok-bot 81, hash-brown-shield 276, hash-boomerang 628, root-cellar 39, tater-minigun 175
- run.evolutions: [{"id":"tater-minigun","at":219.5}]
- run.biomes: ["frozen-tundra","compost-caves","peel-forest","coin-laundromat"]
- run.distance: 12692.02
- run.dodgePoints: 2345.989
- run.dodgeSecond: 240
- run.dodgeTaken: [10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358,10.751080685357358]
- run.dodgeSteps: [940.1370000000643,946.3370000000614,952.5370000000585,958.7370000000556,964.9370000000526,971.1370000000497,977.3370000000468,983.5370000000439,989.737000000041,994.5110000000404,999.9050000000389,1005.3920000000371,1010.0730000000367,1016.2730000000338,1022.4730000000309,1027.6810000000296,1032.3930000000291,1036.9810000000289,1043.181000000026,1049.381000000023,1055.5810000000201,1060.4790000000194,1065.687000000018,1071.8870000000152,1078.0870000000123,1084.2870000000094,1090.4870000000064,1096.6870000000035,1100.841,1105.8319999999967,1112.0319999999938,1118.2319999999909,1124.431999999988,1130.631999999985,1136.8319999999821,1143.0319999999792,1144.5819999999785,1144.5819999999785,1150.0586666666427,1156.2586666666398,1162.4586666666369,1168.658666666634,1174.858666666631,1181.0586666666281,1187.2586666666252,1193.4586666666223,1199.6586666666194,1205.8586666666165,1212.0586666666136,1218.2586666666107,1224.4586666666078,1230.6586666666049,1236.858666666602,1243.058666666599,1249.2586666665961,1255.4586666665932,1261.6586666665903,1267.8586666665874,923.5210000000698,929.7210000000669,934.7120000000659]
- run.curseSince: 13377
- run.goldEarned: 396.28
- run.bossChests: 4
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 185
- run.shrinesUsed: 2
- run.grokBotHelps: 7
- run.botSwarms: 1
- run.throttles: 13
- run.lootRunnersMet: [1]
- counters.kills: 2367
- counters.hits: 4089
- counters.gems: 1943
- counters.coins: 141
- counters.shots: 5640
- counters.hostileShots: 106
- counters.nearMisses: 12
- shrineTotals.might: 0.12
- shrineTotals.growth: 0.12
- Gold, spots and chests: gold held at the end 396, spent 0; spots charged and used: Crop Patch 2, Spud Freezer 1, Tater Lantern 1; chests seen 6, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Mash Golem 52% over Salt Line 30%, Spry Sprout 18%; 0:22 took Locked Gatling 82% over Chives 14%, Mash Golem 4%; 0:27 took Locked Gatling 80% over Packed Pan 14%, Spry Sprout 6%; 0:40 took GPU 77% over Mash Golem 20%, Hot Sauce 3%; 1:01 took Locked Gatling 57% over Spud Cannon 36%, Salt Shaker 7%; 1:24 took Hash Brown Shield 67% over Butter Pat 22%, Gravy Boat 11%; 1:33 took Hash Boomerang 67% over Reroll 17%, Slow Cooker 8%, Salt Shaker 8%; 1:47 took Masher Grip 64% over Lean Lunch 24%, Reroll 7%, Mash Golem 5%; 1:53 took Damage 92% over Cooldown 6%, Area 2%; 2:05 took Starch Plating 53% over Lean Lunch 35%, Reroll 7%, Gravy Splash 5%; 2:14 took Starch Plating 64% over Reroll 18%, Seeker Sprouts 12%, Mash Golem 6%; 2:22 took Root Cellar 52% over GPU 36%, Reroll 7%, Mash Golem 5%; 2:28 took XP gain 91% over Damage 9%, Duration 0%; 2:34 took Hash Brown Shield 57% over Leave 26%, Root Cellar 12%, Mash Golem 5%; 2:45 took Hash Brown Shield 61% over Reroll 22%, Salt Shaker 8%, Skip 5%, Mash Golem 4%; 2:53 took Hash Brown Shield 40% over Starch Plating 28%, Chives 15%, Reroll 15%, Skip 2%; 3:12 took Slow Cooker 31% over Root Cellar 29%, Reroll 23%, Skip 11%, Hash Boomerang 6%; 3:42 took Slow Cooker 42% over Masher Grip 32%, Reroll 19%, Hash Boomerang 5%, Skip 2%; 3:43 took Packed Pan 52% over Masher Grip 19%, Reroll 17%, Hash Boomerang 10%, Skip 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Mash Golem 1/8, Locked Gatling 2/8, GPU 1/5 | 2:00 level 9, maxHp 120, armor 0, damageMult 1.12, recovery 0, Seeker Sprouts 1/8, Mash Golem 1/8, Locked Gatling 7/8, Hash Brown Shield 1/8, Hash Boomerang 1/8, GPU 1/5, Masher Grip 1/5 | 2:58 level 14, maxHp 120, armor 40, damageMult 1.12, recovery 0, Seeker Sprouts 1/8, Mash Golem 1/8, Locked Gatling 8/8, Hash Brown Shield 4/8, Hash Boomerang 1/8, Root Cellar 1/8, GPU 1/5, Masher Grip 1/5, Starch Plating 2/5 | 3:59 level 17, maxHp 120, armor 40, damageMult 1.12, recovery 0, Seeker Sprouts 1/8, Mash Golem 1/8, Tater Minigun 1/1, Hash Brown Shield 4/8, Hash Boomerang 1/8, Root Cellar 1/8, GPU 1/5, Masher Grip 1/5, Starch Plating 2/5, Slow Cooker 2/5, Packed Pan 1/5.
- Passive levels first reached: GPU 1 at 0:40; Masher Grip 1 at 1:47; Starch Plating 1 at 2:05; Slow Cooker 1 at 3:12; Packed Pan 1 at 3:43.

### L5.I1.G10: keepaway when hurt s40

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 40; 240s; plays the playbook with planEvery 2, its own planner.goal.
- Outcome: died after 198.5s (game clock 03:18); damage taken 188 (Hot oil 17.867, enemy:sprout-mite 2.632, enemy:aphid 4.652, enemy:oil-drip 23.418); 792 kills; level 1 to 9; planner asked 112 times, action model 389; the models saw the game 30 ms late (p90 51); ended with seeker-sprouts 2, chip-shuriken 1, julienne-dash 3, rosti-disc 1, tater-pup 1, potato-rain 1.
- run.timeSec: 198.467
- run.level: 8
- run.kills: 792
- run.damageBySource: seeker-sprouts 3496.226, chip-shuriken 5820.378, julienne-dash 2649.734, grok-bot 780.486, rosti-disc 2189.042, tater-pup 1176.563, potato-rain 1121.667
- run.damageTakenBySource: Hot oil 17.867, enemy:sprout-mite 2.632, enemy:aphid 4.652, enemy:oil-drip 23.418, enemy:ketchup-drop 2.001, enemy:crumb-ant 19.276, enemy:sand-crab 34.165, enemy:fry-fly 37.223, enemy:potato-beetle 16.956, boss:amusing 16.631, enemy:swarm-fly 5.544, enemy:beetle-brood 4.578, boss:beetle-queen 2.72
- run.killsBySource: seeker-sprouts 274, chip-shuriken 190, julienne-dash 95, grok-bot 62, rosti-disc 62, tater-pup 47, potato-rain 62
- run.biomes: ["frozen-tundra","fry-oil-desert","chip-canyons","peel-forest","ketchup-bog","mash-swamp"]
- run.distance: 12055.962
- run.dodgePoints: 1444.522
- run.dodgeSecond: 198
- run.dodgeTaken: [111.9821809788981,111.9821809788981,111.9821809788981,111.9821809788981,111.9821809788981,119.08503376180391,119.08503376180391,133.98361997298264,167.71817609287126,167.71817609287126,172.30318832089904,172.30318832089904,172.30318832089904,175.02303832089905,175.02303832089905,183.64895183431048,78.16340517930472,78.16340517930472,81.48967184597139,81.48967184597139,81.48967184597139,81.48967184597139,81.48967184597139,81.48967184597139,81.48967184597139,81.48967184597139,81.48967184597139,81.48967184597139,83.26941006674997,83.26941006674997,83.26941006674997,83.26941006674997,83.26941006674997,83.26941006674997,83.26941006674997,83.26941006674997,87.40284671310715,87.40284671310715,89.81977871863698,89.81977871863698,92.22334151732312,92.22334151732312,92.22334151732312,92.22334151732312,92.22334151732312,92.22334151732312,92.22334151732312,92.22334151732312,92.22334151732312,96.35667485065645,97.42334151732311,97.42334151732311,97.42334151732311,97.42334151732311,97.42334151732311,97.42334151732311,97.42334151732311,107.80519790409778,109.60414406049728,109.60414406049728,109.60414406049728]
- run.dodgeSteps: [1109.8006666665576,1113.2106666665538,1116.62066666655,1122.216166666547,1128.416166666544,1134.6161666665412,1140.8161666665383,1147.0161666665354,1153.2161666665324,1163.2861666665306,1169.4861666665277,1175.6861666665247,1180.6461666665223,1190.3028333331872,1196.5028333331843,1202.7028333331814,839.8833333333544,849.5233333333523,856.1533333333495,862.3533333333465,868.5533333333436,871.2400000000091,880.896666666674,887.0966666666711,893.2966666666682,899.4966666666653,905.6966666666624,911.8966666666595,918.0966666666566,924.2966666666537,930.4966666666508,936.6966666666478,942.8966666666449,949.096666666642,955.2966666666391,961.4966666666362,967.6966666666333,973.8966666666304,980.0966666666275,986.2966666666246,992.4966666666216,998.6966666666187,1004.8966666666158,1009.5466666666136,1015.7466666666107,1021.9466666666078,1028.146666666605,1034.346666666602,1040.546666666599,1046.7466666665962,1052.9466666665933,1059.1466666665904,1065.3466666665875,1068.8031666665836,1072.2131666665798,1075.623166666576,1081.6836666665731,1087.8836666665702,1094.0836666665673,1100.2836666665644,1106.3906666665614]
- run.killer: "enemy:potato-beetle"
- run.goldEarned: 46.095
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 175
- run.grokBotHelps: 3
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 792
- counters.hits: 1815
- counters.gems: 210
- counters.coins: 19
- counters.shots: 946
- counters.hostileShots: 252
- counters.nearMisses: 11
- counters.hostileHits: 3
- Gold, spots and chests: gold held at the end 46, spent 0; spots charged and used: Crop Patch 1; chests seen 3, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Chip Shuriken 40% over Spud Fence 32%, Gravy Boat 28%; 0:17 took Seeker Sprouts 39% over Salt Shaker 37%, Fertilizer 24%; 0:37 took Julienne Dash 69% over Hot Start 23%, Seeker Sprouts 8%; 0:52 took Julienne Dash 46% over Butter Pat 37%, Thick Skin 17%; 1:36 took Rösti Disc 69% over Mash Finisher 21%, Potato Magnet 7%, Skip 3%; 1:54 took Tater Tot Pup 72% over Chip Shuriken 19%, Potato Magnet 7%, Skip 2%; 2:04 took Potato Rain 53% over Julienne Dash 27%, Gravy Heart 18%, Skip 2%; 3:09 took Julienne Dash 78% over Golden Fry 11%, Tater Tot Pup 8%, Skip 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Chip Shuriken 1/8, Julienne Dash 2/8 | 1:59 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Chip Shuriken 1/8, Julienne Dash 2/8, Rösti Disc 1/8, Tater Tot Pup 1/8 | 2:58 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Chip Shuriken 1/8, Julienne Dash 2/8, Rösti Disc 1/8, Tater Tot Pup 1/8, Potato Rain 1/8 | 3:18 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Chip Shuriken 1/8, Julienne Dash 3/8, Rösti Disc 1/8, Tater Tot Pup 1/8, Potato Rain 1/8.
