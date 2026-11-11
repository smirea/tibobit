# Does a planner.goal that rates evading low raise survival from 0:00?

| Field | Value |
| --- | --- |
| Status | done |
| Area | models |
| Result | inconclusive |
| Created | L4.I6 |
| Updated | L4.I7 |

## Hypothesis

The loop manager's pooled table shows survivors spend 32% of steps evading against 52% for deaths, and the dying armor-first games ran 8-10 evade goals. Evade goals walk away from gems, chests and shrines and pull enemies into a crowd. The action model already dodges while walking to any goal. A planner.goal that rates keeping away low unless health is under 35% or a boss is within 150 units should give more levels, chests and kills by 2:00 and more games alive at 4:00.

## Method

Seeker-sprouts with the playbook knobs and prompts, only planner.goal changed, 240 s from 0:00 on s31-39. Pair with the playbook games on file for s31-37 (alive at 4:00: s31, s32, s34, s36 yes; s33, s35, s37 no) and with a new playbook game on s38. s39 gets its playbook game next iteration. Read evade goals per game, chests by 2:00, damage dealt by 2:00, damage taken by 3:00 and survival to 4:00. A change needs 8 or more pairs and a clear margin, for example 6 of 8 alive against 4 of 8.

## Findings

Seeker-sprouts with the evade-less planner.goal, 240 s from 0:00 on s31-39: alive at 4:00 on 5 of 9 (s31, s33, s34, s35, s38). On the 8 seeds with playbook games on file it was 5 of 8 against 5 of 8 (2 wins, 2 losses, 4 ties). With the keep-away option gone the bot hopped between shrines on s32 (died 2:03) and fought elites at once on s36 (died 0:37). Evade is a symptom of trouble, not a cause. Not added to the playbook.

## Games

### L4.I6.G1: evade-less s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240.1s (game clock 04:00), health 134/134; damage taken 48 (enemy:aphid 1.14, enemy:fry-fly 1.948, enemy:sand-crab 5.096, enemy:lint-bunny 2.624); 2343 kills; level 1 to 13; planner asked 92 times, action model 253; the models saw the game 37 ms late (p90 58); ended with overgrowth 1, tater-twirl 1, potato-battery 8, locked-gatling 1, fry-knives 1, skillet-flail 3, fertilizer 1, root-network 1, gravy-heart 1.
- run.timeSec: 240.133
- run.level: 12
- run.kills: 2343
- run.damageBySource: seeker-sprouts 17600.691, tater-twirl 1976.261, potato-battery 7556.383, locked-gatling 7760.7, fry-knives 2368.264, skillet-flail 405.584, grok-bot 2730.064, alex 577.026, overgrowth 30403.984
- run.damageTakenBySource: enemy:aphid 1.14, enemy:fry-fly 1.948, enemy:sand-crab 5.096, enemy:lint-bunny 2.624, boss:amusing 3.326, Hot oil 9.167, boss:beetle-queen 17.226, enemy:garden-slug 7.253
- run.killsBySource: seeker-sprouts 875, tater-twirl 36, potato-battery 256, locked-gatling 205, fry-knives 28, skillet-flail 7, grok-bot 109, alex 26, overgrowth 801
- run.evolutions: [{"id":"overgrowth","at":201.18333333333334}]
- run.biomes: ["fry-oil-desert","chip-canyons","mash-swamp","coin-laundromat","peel-forest"]
- run.distance: 13660.512
- run.dodgePoints: 2171.727
- run.dodgeSecond: 240
- run.dodgeTaken: [23.300844597410016,26.020694597410017,26.020694597410017,26.020694597410017,26.020694597410017,26.020694597410017,26.020694597410017,28.740544597410015,28.740544597410015,28.740544597410015,28.740544597410015,35.99347793074335,35.99347793074335,35.99347793074335,38.71332793074335,38.71332793074335,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,47.77949459741002,23.300844597410016,23.300844597410016,23.300844597410016]
- run.dodgeSteps: [1046.0433333332198,1052.243333333217,1058.443333333214,1064.643333333211,1070.8433333332082,1077.0433333332053,1083.2433333332024,1089.4433333331995,1095.6433333331966,1101.8433333331936,1108.0433333331907,1114.2433333331878,1118.7899999998524,1124.783333333183,1130.98333333318,1137.1833333331772,1143.1766666665076,1146.4833333331728,1149.6866666665046,1149.6866666665046,1155.6799999998352,1161.8799999998323,1168.0799999998294,1174.2799999998265,1180.4799999998236,1186.6799999998207,1192.8799999998178,1197.9174999998145,1201.3274999998107,1206.0394999998073,1212.2394999998044,1218.4394999998015,1222.5728333331328,1227.1194999997974,1232.9939999997944,1236.4504999997905,1242.6504999997876,1248.8504999997847,1255.0504999997818,1261.2504999997789,1267.450499999776,1273.650499999773,1279.8504999997701,1286.0504999997672,1292.2504999997643,1296.543999999761,1299.9539999997571,1303.3639999997533,1309.4244999997504,1315.6244999997475,1321.8244999997446,1328.0244999997417,1334.2244999997388,1340.4244999997359,1346.624499999733,1352.82449999973,1359.0244999997271,1365.2244999997242,1027.4433333332286,1033.6433333332257,1039.8433333332227]
- run.curseSince: 13054
- run.goldEarned: 487.975
- run.bossChests: 8
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 175
- run.grokBotHelps: 6
- run.botSwarms: 3
- run.lootRunnersMet: [1]
- counters.kills: 2343
- counters.hits: 4279
- counters.gems: 304
- counters.coins: 52
- counters.shots: 4210
- counters.hostileShots: 158
- counters.nearMisses: 17
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 486, spent 0; spots charged and used: Spud Freezer 1; chests seen 8, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Tater Twirl 58% over Hot Potato 38%, Golden Fry 4%; 0:24 took Seeker Sprouts 51% over Mash Golem 26%, Tailgate Fries 23%; 0:42 took Potato Battery 71% over Mash Landing 19%, Spud Sneakers 10%; 0:47 took Potato Battery 42% over Seeker Sprouts 34%, Tater Twirl 15%, Leave 9%; 0:57 took Locked Gatling 64% over Tater Twirl 23%, Reroll 9%, Gem Sling 4%; 1:01 took Fry Knives 46% over Locked Gatling 44%, Reroll 7%, Golden Fry 3%; 1:08 took Skillet Flail 36% over Grab Bag 32%, Fertilizer 26%, Reroll 6%; 1:30 took Skillet Flail 46% over Fertilizer 23%, Reroll 21%, Fry Knives 10%; 1:38 took Seeker Sprouts 80% over Fertilizer 9%, Slow Cooker 6%, Reroll 5%; 2:29 took Fertilizer 47% over Locked Gatling 38%, Reroll 11%, Fry Knives 4%; 2:49 took Potato Battery 52% over Root Network 32%, Reroll 10%, Clean Plate 6%; 3:32 took Root Network 60% over Skillet Flail 21%, Reroll 9%, Sour Cream 8%, Skip 2%; 3:37 took Gravy Heart 52% over Tater Twirl 26%, Reroll 13%, Fertilizer 6%, Skip 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Tater Twirl 1/8, Potato Battery 2/8, Locked Gatling 1/8 | 1:56 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 8/8, Tater Twirl 1/8, Potato Battery 3/8, Locked Gatling 1/8, Fry Knives 1/8, Skillet Flail 2/8 | 2:58 level 11, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 8/8, Tater Twirl 1/8, Potato Battery 7/8, Locked Gatling 1/8, Fry Knives 1/8, Skillet Flail 2/8, Fertilizer 1/5 | 3:58 level 13, maxHp 134.4, armor 0, damageMult 1, recovery 0.25, Overgrowth 1/1, Tater Twirl 1/8, Potato Battery 8/8, Locked Gatling 1/8, Fry Knives 1/8, Skillet Flail 3/8, Fertilizer 1/5, Root Network 1/5, Gravy Heart 1/5.
- Passive levels first reached: Fertilizer 1 at 2:30; Root Network 1 at 3:32; Gravy Heart 1 at 3:37.

### L4.I6.G2: evade-less s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 123.8s (game clock 02:03); damage taken 141 (enemy:potato-beetle 7.515, enemy:snow-mold 18.328, enemy:frost-flea 30.699, enemy:compost-maggot 4.229); 378 kills; level 1 to 8; planner asked 42 times, action model 353; the models saw the game 28 ms late (p90 48); ended with seeker-sprouts 1, peel-phantom 1, seed-potato 4, skipping-cannonball 1, whisk-vortex 1, fry-sentry 1, peel-out 1.
- run.timeSec: 123.783
- run.level: 7
- run.kills: 378
- run.damageBySource: seeker-sprouts 2206.985, seed-potato 2610.585, skipping-cannonball 669.031, whisk-vortex 2097.069, peel-phantom 64.619, fry-sentry 239.277
- run.damageTakenBySource: enemy:potato-beetle 7.515, enemy:snow-mold 18.328, enemy:frost-flea 30.699, enemy:compost-maggot 4.229, enemy:cave-grub 47.391, enemy:aphid 6.256, enemy:sprout-mite 13.492, boss:amusing 13.305
- run.killsBySource: seeker-sprouts 136, seed-potato 110, skipping-cannonball 34, whisk-vortex 85, peel-phantom 2, fry-sentry 11
- run.biomes: ["frozen-tundra","compost-caves"]
- run.distance: 6645.68
- run.dodgePoints: 992.915
- run.dodgeSecond: 123
- run.dodgeTaken: [119.69928254456381,119.69928254456381,9.573676500686823,9.573676500686823,9.573676500686823,9.573676500686823,10.919859077320824,10.919859077320824,10.919859077320824,10.919859077320824,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,15.076389313751532,18.051983966536795,19.546910743860252,19.546910743860252,19.546910743860252,19.546910743860252,19.546910743860252,19.546910743860252,19.546910743860252,19.546910743860252,19.546910743860252,19.546910743860252,25.5014716553373,25.5014716553373,25.5014716553373,25.5014716553373,25.5014716553373,25.5014716553373,25.5014716553373,25.5014716553373,30.101840862559495,60.09582719846867,90.27564348115236,105.24489729710562,105.24489729710562,105.24489729710562,105.24489729710562,105.24489729710562,105.24489729710562,105.24489729710562,106.835421101328,108.43895621759467,108.43895621759467,108.43895621759467,108.43895621759467,108.43895621759467,113.25697733476343]
- run.dodgeSteps: [657.1280000000701,659.7113333334045,310.28933333332884,316.48933333332866,322.6893333333285,328.8893333333283,335.0893333333281,341.28933333332793,347.48933333332775,353.68933333332757,359.8893333333274,366.0893333333272,372.289333333327,378.48933333332684,384.68933333332666,390.8893333333265,397.0893333333263,403.2893333333261,408.21833333332614,412.68233333332626,417.9833333333248,424.183333333326,430.38333333332855,434.8783333333289,440.83033333333117,447.0303333333337,453.23033333333626,459.4303333333388,465.63033333334135,471.8303333333439,478.03033333334645,484.230333333349,490.43033333335154,494.5636666666866,494.8736666666867,501.07366666668923,507.2736666666918,513.3703333333609,519.5703333333635,525.770333333366,531.9703333333686,538.1703333333711,544.3703333333737,550.5703333333762,556.7703333333787,562.9703333333813,569.1703333333838,573.7170000000524,579.9170000000549,589.9870000000568,596.1870000000555,602.3870000000537,608.2460000000552,612.5860000000554,617.2980000000559,623.4980000000585,629.698000000061,635.8980000000636,645.9680000000656,652.1680000000681,655.0613333334026]
- run.curseSince: 2720
- run.killer: "boss:amusing"
- run.goldEarned: 47.4
- run.bossChests: 1
- run.elitesKilled: 4
- run.peakEnemies: 99
- run.shrinesUsed: 1
- run.grokBotHelps: 3
- counters.kills: 378
- counters.hits: 1120
- counters.gems: 201
- counters.coins: 10
- counters.shots: 287
- counters.hostileShots: 10
- shrineTotals.duration: 0.072
- Gold, spots and chests: gold held at the end 47, spent 0; spots charged and used: Tater Lantern 1, Beetle Nest 1; chests seen 4, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Peel Out 83% over Slow Cooker 12%, Masher Grip 5%; 0:16 took Peel Phantom 88% over Grab Bag 9%, Slow Cooker 3%; 0:26 took Seed Potato 78% over Butter Pat 11%, Four-Eyed Spud 11%; 0:38 took Seed Potato 48% over Mash Mallet 23%, Reroll 16%, Starch Bolt 13%; 0:45 took Duration 50% over Pickup range 39%, Gold gain 11%; 0:53 took Seed Potato 71% over Leave 13%, Seeker Sprouts 10%, Peel Phantom 6%; 1:18 took Skipping Cannonball 68% over GPU 14%, Slow Cooker 11%, Reroll 7%; 1:46 took Whisk Vortex 63% over Peel Out 28%, Reroll 6%, Seeker Sprouts 3%; 1:57 took Fry Cook Sentry 50% over Peel Out 29%, Whisk Vortex 11%, Reroll 10%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Peel Phantom 1/8, Seed Potato 3/8, Peel Out 1/5 | 1:58 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Peel Phantom 1/8, Seed Potato 3/8, Skipping Cannonball 1/8, Whisk Vortex 1/8, Fry Cook Sentry 1/8, Peel Out 1/5 | 2:03 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Peel Phantom 1/8, Seed Potato 4/8, Skipping Cannonball 1/8, Whisk Vortex 1/8, Fry Cook Sentry 1/8, Peel Out 1/5.
- Passive levels first reached: Peel Out 1 at 0:06.

### L4.I6.G3: evade-less s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240.4s (game clock 04:00), health 102/134; damage taken 327 (enemy:aphid 2.853, Hot oil 32.467, enemy:fry-fly 61.193, enemy:crumb-ant 8.661); 2099 kills; level 1 to 16; planner asked 89 times, action model 669; the models saw the game 32 ms late (p90 52); ended with seeker-sprouts 1, peel-poltergeist 1, mash-avalanche 1, mash-mortar 1, tot-stampede 1, spud-cannon 1, gravy-heart 1, peel-out 2, packed-pan 1, masher-grip 3, potato-magnet 1.
- run.timeSec: 240.383
- run.level: 15
- run.kills: 2099
- run.damageBySource: seeker-sprouts 4780.754, mash-snowball 15790.601, mash-mortar 8024.391, peel-phantom 49.23, tot-stampede 6235.342, peel-poltergeist 14125.682, grok-bot 103.501, mash-avalanche 12200.21, spud-cannon 907.079
- run.damageTakenBySource: enemy:aphid 2.853, Hot oil 32.467, enemy:fry-fly 61.193, enemy:crumb-ant 8.661, enemy:sock-pile 45.055, enemy:lint-bunny 38.377, enemy:garden-slug 6.389, boss:amusing 6.653, enemy:bog-slime 22.26, enemy:ketchup-drop 22.109, boss:beetle-queen 57.117, enemy:tomato-leech 20.608, enemy:oil-drip 2.841
- run.killsBySource: seeker-sprouts 152, mash-snowball 640, mash-mortar 280, peel-phantom 1, tot-stampede 230, peel-poltergeist 366, grok-bot 6, mash-avalanche 405, spud-cannon 19
- run.evolutions: [{"id":"peel-poltergeist","at":136.1},{"id":"mash-avalanche","at":218.4}]
- run.biomes: ["fry-oil-desert","ketchup-bog","coin-laundromat","mash-swamp"]
- run.distance: 13627.037
- run.dodgePoints: 865.033
- run.dodgeSecond: 240
- run.dodgeTaken: [207.49781006183593,224.31035530698603,242.44268864031935,260.57502197365267,269.64118864031934,269.64118864031934,269.64118864031934,272.22577386913605,272.22577386913605,272.22577386913605,272.22577386913605,272.22577386913605,272.22577386913605,272.22577386913605,272.22577386913605,272.22577386913605,272.22577386913605,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,276.22973034457345,280.36150794306724,291.3870954432521,301.0937098104064,305.26854237330497,307.3398445316194,311.53083095060094,315.0775466195581,315.0775466195581,317.9185758943807,317.9185758943807,317.9185758943807,317.9185758943807,317.9185758943807,324.3926880259921,324.3926880259921,324.3926880259921,324.3926880259921,324.3926880259921,324.3926880259921,324.3926880259921,326.58303736663566,326.58303736663566,207.49781006183593,207.49781006183593,207.49781006183593]
- run.dodgeSteps: [1060.4069999998235,1066.6069999998206,1072.8069999998177,1079.0069999998148,1085.2069999998118,1095.27699999981,1101.476999999807,1103.956999999806,1110.156999999803,1114.8069999998008,1120.9036666664647,1125.036999999796,1131.2369999997932,1135.0603333331246,1141.2603333331217,1147.4603333331188,1153.660333333116,1159.860333333113,1165.0269999997772,1170.0903333331082,1176.2903333331053,1180.6303333331032,1186.8303333331003,1193.0303333330974,1199.2303333330944,1203.466999999759,1209.6669999997562,1215.8669999997533,1219.1736666664185,1220.4136666664178,1226.613666666415,1232.2969999997456,1236.740333333077,1242.940333333074,1249.140333333071,1249.9669999997373,1249.9669999997373,1256.1669999997343,1261.0236666663989,1267.223666666396,1270.0136666663946,1276.2136666663916,1282.4136666663887,1288.6136666663858,1294.813666666383,1301.01366666638,1307.213666666377,1313.4136666663742,1319.6136666663713,1324.1603333330359,1330.360333333033,1336.56033333303,1342.7603333330271,1347.410333333025,1352.2669999996892,1352.5769999996892,1356.503666666354,1360.3269999996855,1045.2169999998307,1048.0069999998293,1054.2069999998264]
- run.curseSince: 13414
- run.goldEarned: 652.565
- run.bossChests: 8
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 179
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2099
- counters.hits: 3259
- counters.gems: 1113
- counters.coins: 111
- counters.shots: 956
- counters.hostileShots: 120
- counters.nearMisses: 10
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 649, spent 0; spots charged and used: Beetle Nest 1; chests seen 8, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Peel Phantom 64% over Seeker Sprouts 31%, Hearty Helping 5%; 0:15 took Mash Snowball 60% over Hash Boomerang 21%, Slow Cooker 19%; 0:22 took Mash Mortar 83% over Grab Bag 13%, Slow Cooker 4%; 0:39 took Gravy Heart 56% over Chives 42%, Clean Plate 2%; 0:51 took Peel Phantom 36% over Mash Finisher 32%, Tot Toss 32%; 1:17 took Peel Out 78% over Mash Snowball 15%, Reroll 5%, Rotten Spud 2%; 1:25 took Tot Stampede 60% over Four-Eyed Spud 19%, Seeker Sprouts 12%, Reroll 9%; 1:34 took Peel Phantom 89% over Mash Mortar 7%, Reroll 3%, Tot Stampede 1%; 2:01 took Packed Pan 52% over Mash Mortar 37%, Reroll 8%, Tot Stampede 3%; 2:27 took Masher Grip 38% over Aged Russet 26%, Mash Mortar 26%, Reroll 10%; 3:03 took Masher Grip 62% over Packed Pan 20%, Sprouting Eyes 10%, Reroll 7%, Skip 1%; 3:30 took Masher Grip 35% over Packed Pan 32%, Mash Snowball 21%, Reroll 9%, Skip 3%; 3:41 took Potato Magnet 42% over Sprouting Eyes 32%, Reroll 15%, Fertilizer 7%, Skip 4%; 3:41 took Spud Cannon 81% over Reroll 8%, Couch Potato 7%, Bacon Bits 2%, Skip 2%; 3:43 took Peel Out 45% over Potato Magnet 30%, Spud Cannon 12%, Reroll 11%, Skip 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 6, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Peel Phantom 4/8, Mash Snowball 1/8, Mash Mortar 1/8, Gravy Heart 1/5 | 1:58 level 9, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Peel Phantom 8/8, Mash Snowball 1/8, Mash Mortar 1/8, Tot Stampede 1/8, Gravy Heart 1/5, Peel Out 1/5 | 3:00 level 11, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Peel Poltergeist 1/1, Mash Snowball 4/8, Mash Mortar 1/8, Tot Stampede 1/8, Gravy Heart 1/5, Peel Out 1/5, Packed Pan 1/5, Masher Grip 1/5 | 3:59 level 16, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Peel Poltergeist 1/1, Mash Avalanche 1/1, Mash Mortar 1/8, Tot Stampede 1/8, Spud Cannon 1/8, Gravy Heart 1/5, Peel Out 2/5, Packed Pan 1/5, Masher Grip 3/5, Potato Magnet 1/5.
- Passive levels first reached: Gravy Heart 1 at 0:39; Peel Out 1 at 1:17; Packed Pan 1 at 2:01; Masher Grip 1 at 2:27, 3 at 3:30; Potato Magnet 1 at 3:41.

### L4.I6.G4: evade-less s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240s (game clock 04:00), health 137/140; damage taken 154 (enemy:cave-grub 77.392, enemy:snow-mold 12.877, enemy:potato-beetle 28.597, Spore vent 3.333); 1559 kills; level 1 to 15; planner asked 92 times, action model 555; the models saw the game 29 ms late (p90 49); ended with seeker-sprouts 4, small-fry 1, sprout-satellites 1, cast-iron 1, harvest-moon 3, skipping-cannonball 1, starch-plating 2, packed-pan 1, four-eyed-spud 1.
- run.timeSec: 240.033
- run.level: 14
- run.kills: 1559
- run.damageBySource: seeker-sprouts 5708.838, small-fry 6419.86, frying-pan 2998.742, sprout-satellites 3073.755, harvest-moon 7003.426, skipping-cannonball 3543.687, grok-bot 2701.779, cast-iron 14395.174
- run.damageTakenBySource: enemy:cave-grub 77.392, enemy:snow-mold 12.877, enemy:potato-beetle 28.597, Spore vent 3.333, enemy:compost-maggot 1.408, enemy:sprout-mite 4.92, Brambles 15.415, enemy:aphid 2.267, boss:beetle-queen 2.018, enemy:garden-slug 2.915, enemy:frost-flea 1.274, enemy:bog-slime 1.67
- run.killsBySource: seeker-sprouts 224, small-fry 221, sprout-satellites 86, frying-pan 107, harvest-moon 251, skipping-cannonball 140, grok-bot 84, cast-iron 446
- run.evolutions: [{"id":"cast-iron","at":147.15}]
- run.biomes: ["compost-caves","frozen-tundra","peel-forest","mash-swamp"]
- run.distance: 12761.667
- run.dodgePoints: 1690.72
- run.dodgeSecond: 240
- run.dodgeTaken: [108.28298710860145,108.28298710860145,108.8401299657443,110.01632044193477,110.01632044193477,114.32025890347322,118.62419736501168,124.9460890523566,124.9460890523566,124.9460890523566,124.9460890523566,124.9460890523566,124.9460890523566,124.9460890523566,124.9460890523566,124.9460890523566,126.49370809997563,127.8556128618804,127.8556128618804,127.8556128618804,127.8556128618804,128.8460890523566,132.5603747666423,132.8698985761661,132.8698985761661,132.8698985761661,132.8698985761661,132.8698985761661,132.8698985761661,138.3191495699719,138.3191495699719,139.59306437259943,139.59306437259943,139.59306437259943,139.59306437259943,139.59306437259943,139.59306437259943,139.59306437259943,139.59306437259943,139.59306437259943,139.59306437259943,139.59306437259943,142.54324089700327,142.54324089700327,142.54324089700327,142.54324089700327,142.54324089700327,142.54324089700327,150.42731326506743,150.42731326506743,150.42731326506743,150.42731326506743,150.42731326506743,150.42731326506743,150.42731326506743,150.42731326506743,150.73683707459122,153.95761629537043,104.83276396007167,105.96709761134574,108.28298710860145]
- run.dodgeSteps: [968.2333333334129,974.43333333341,980.6333333334071,986.8333333334042,993.0333333334013,999.2333333333984,1005.4333333333955,1011.6333333333926,1017.8333333333896,1019.796666666722,1019.796666666722,1019.796666666722,1019.796666666722,1020.1066666667218,1022.8966666667205,1024.7566666667196,1030.9566666667167,1037.1566666667138,1043.356666666711,1049.556666666708,1055.756666666705,1061.9566666667022,1068.1566666666993,1074.3566666666964,1080.5566666666934,1086.7566666666905,1092.9566666666876,1099.0533333333515,1101.7400000000168,1107.940000000014,1114.140000000011,1120.340000000008,1126.5400000000052,1132.7400000000023,1138.9399999999994,1145.1399999999965,1151.3399999999936,1157.5399999999906,1163.7399999999877,1169.9399999999848,1176.139999999982,1182.339999999979,1188.539999999976,1194.7399999999732,1200.9399999999703,1207.1399999999674,1213.3399999999644,1218.0933333332955,1224.2933333332926,1230.4933333332897,1236.6933333332868,1242.8933333332839,1249.093333333281,1255.293333333278,1261.4933333332751,1267.6933333332722,1273.8933333332693,1276.1666666666017,949.6333333334217,955.8333333334188,962.0333333334158]
- run.curseSince: 11739
- run.goldEarned: 350.068
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 173
- run.shrinesUsed: 4
- run.grokBotHelps: 6
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1559
- counters.hits: 3159
- counters.gems: 1537
- counters.coins: 71
- counters.shots: 1952
- counters.hostileShots: 153
- counters.nearMisses: 2
- shrineTotals.might: 0.132
- shrineTotals.maxHp: 16.8
- shrineTotals.growth: 0.072
- Gold, spots and chests: gold held at the end 350, spent 0; spots charged and used: none; chests seen 8, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:07 took Small Fry 86% over Hot Sauce 7%, Spud Sneakers 7%; 0:15 took Sprout Satellites 53% over Small Fry 40%, Bacon Bits 7%; 0:23 took Frying Pan 50% over Peel Lash 32%, Tailgate Fries 18%; 0:36 took Frying Pan 50% over Thick Skin 26%, Small Fry 13%, Reroll 11%; 0:39 took Harvest Moon 43% over Hash Hawk 38%, Seeker Sprouts 10%, Reroll 9%; 1:02 took XP gain 57% over Cooldown 22%, Gold gain 21%; 1:06 took Skipping Cannonball 40% over Seed Potato 38%, Reroll 12%, Thick Skin 10%; 1:27 took Frying Pan 69% over Skipping Cannonball 15%, Reroll 13%, Sprout Satellites 2%, Skip 1%; 1:50 took Starch Plating 79% over Skipping Cannonball 12%, Reroll 6%, Seeker Sprouts 2%, Skip 1%; 1:55 took Packed Pan 34% over Slow Cooker 28%, Seeker Sprouts 18%, Reroll 18%, Skip 2%; 2:24 took Max HP 94% over Crit 4%, Move speed 2%; 2:25 took Starch Plating 73% over Skipping Cannonball 16%, Reroll 7%, Small Fry 3%, Skip 1%; 2:35 took Damage 94% over Area 5%, Move speed 1%; 2:47 took Harvest Moon 55% over Seeker Sprouts 19%, Reroll 19%, Rotten Spud 4%, Skip 3%; 2:49 took Four-Eyed Spud 51% over Reroll 20%, Butter Socks 19%, Salt Shaker 8%, Skip 2%; 3:15 took Damage 95% over Crit 3%, Duration 2%; 3:18 took Seeker Sprouts 25% over Reroll 25%, Sour Cream 24%, Big Bowl 23%, Skip 3%; 3:44 took Harvest Moon 35% over Small Fry 21%, Reroll 21%, Fertilizer 20%, Skip 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Small Fry 1/8, Sprout Satellites 1/8, Frying Pan 3/8, Harvest Moon 1/8 | 1:59 level 10, maxHp 120, armor 20, damageMult 1, recovery 0, Seeker Sprouts 2/8, Small Fry 1/8, Sprout Satellites 1/8, Frying Pan 8/8, Harvest Moon 1/8, Skipping Cannonball 1/8, Starch Plating 1/5, Packed Pan 1/5 | 2:56 level 13, maxHp 140.16, armor 40, damageMult 1.072, recovery 0, Seeker Sprouts 2/8, Small Fry 1/8, Sprout Satellites 1/8, Cast Iron 1/1, Harvest Moon 2/8, Skipping Cannonball 1/8, Starch Plating 2/5, Packed Pan 1/5, Four-Eyed Spud 1/5 | 3:59 level 15, maxHp 140.16, armor 40, damageMult 1.132, recovery 0, Seeker Sprouts 4/8, Small Fry 1/8, Sprout Satellites 1/8, Cast Iron 1/1, Harvest Moon 3/8, Skipping Cannonball 1/8, Starch Plating 2/5, Packed Pan 1/5, Four-Eyed Spud 1/5.
- Passive levels first reached: Starch Plating 1 at 1:50; Packed Pan 1 at 1:55; Four-Eyed Spud 1 at 2:50.

### L4.I6.G5: evade-less s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240.1s (game clock 04:00), health 111/120; damage taken 31 (enemy:snow-mold 2.398, enemy:frost-flea 2.597, enemy:sprout-mite 1.285, enemy:cave-grub 8.539); 3318 kills; level 1 to 14; planner asked 100 times, action model 211; the models saw the game 30 ms late (p90 49); ended with overgrowth 1, spud-dynamo 1, skillet-flail 1, seed-potato 1, hashnado 1, julienne-dash 7, butter-pat 2, fertilizer 1, sour-cream 1.
- run.timeSec: 240.1
- run.level: 13
- run.kills: 3318
- run.damageBySource: seeker-sprouts 3428.912, spud-dynamo 1214.354, skillet-flail 1386.945, hash-boomerang 5458.007, seed-potato 801.045, julienne-dash 1107.054, overgrowth 81227.924, grok-bot 225.506, hashnado 13374.315
- run.damageTakenBySource: enemy:snow-mold 2.398, enemy:frost-flea 2.597, enemy:sprout-mite 1.285, enemy:cave-grub 8.539, enemy:aphid 1.537, enemy:potato-beetle 3.129, boss:beetle-queen 2.72, Hot oil 8.533
- run.killsBySource: seeker-sprouts 206, spud-dynamo 73, skillet-flail 44, seed-potato 41, hash-boomerang 205, julienne-dash 7, overgrowth 2436, grok-bot 7, hashnado 299
- run.evolutions: [{"id":"overgrowth","at":106.76666666666667},{"id":"hashnado","at":191.23333333333332}]
- run.biomes: ["compost-caves","frozen-tundra","gutterball-lanes","ketchup-bog","mash-swamp"]
- run.distance: 13328.347
- run.dodgePoints: 2279.375
- run.dodgeSecond: 240
- run.dodgeTaken: [19.48652643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.20637643709005,22.339709770423383,30.339709770423394,30.739709770423392,19.48652643709005,19.48652643709005,19.48652643709005]
- run.dodgeSteps: [1064.064666666516,1070.264666666513,1076.46466666651,1082.6646666665072,1088.8646666665043,1095.0646666665014,1101.2646666664984,1107.4646666664955,1113.5613333331594,1113.5613333331594,1117.3846666664942,1122.0139999998296,1128.2139999998267,1134.4139999998238,1140.6139999998209,1146.2766666664852,1149.99666666649,1153.7166666664948,1159.2966666664938,1165.496666666491,1171.696666666488,1177.896666666485,1184.0966666664822,1190.2966666664793,1193.2933333331446,1193.2933333331446,1193.2933333331446,1193.2933333331446,1193.2933333331446,1196.1866666664766,1202.3866666664737,1208.5866666664708,1211.169999999803,1211.169999999803,1211.169999999803,1211.169999999803,1211.169999999803,1215.3033333331343,1221.5033333331314,1227.7033333331285,1233.9033333331256,1240.1033333331227,1246.3033333331198,1252.5033333331169,1258.1659999997823,1263.2499999997829,1269.44999999978,1275.649999999777,1281.8499999997741,1288.0499999997712,1294.2499999997683,1300.2846666664325,1304.0046666664373,1307.724666666442,1313.7179999997732,1319.9179999997702,1326.1179999997673,1332.3179999997644,1052.9046666665213,1059.1046666665184,1061.894666666517]
- run.curseSince: 13145
- run.goldEarned: 605.535
- run.bossChests: 10
- run.bossesKilled: 2
- run.elitesKilled: 10
- run.peakEnemies: 126
- run.shrinesUsed: 2
- run.grokBotHelps: 4
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 3318
- counters.hits: 3523
- counters.gems: 884
- counters.coins: 73
- counters.shots: 2479
- counters.hostileShots: 22
- counters.nearMisses: 3
- counters.hostileHits: 1
- shrineTotals.might: 0.102
- shrineTotals.area: 0.102
- Gold, spots and chests: gold held at the end 605, spent 0; spots charged and used: Beetle Nest 3, Tater Lantern 1; chests seen 11, opened 7.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Spud Dynamo 55% over Peel Out 26%, Tailgate Fries 19%; 0:12 took Skillet Flail 76% over Seeker Sprouts 13%, Aged Russet 11%; 0:23 took Seed Potato 72% over Thick Skin 20%, Mezzaluna 8%; 0:26 took Hash Boomerang 58% over Butter Socks 27%, Seed Potato 15%; 0:47 took Butter Pat 76% over Skillet Flail 16%, Seeker Sprouts 8%; 0:51 took Julienne Dash 57% over Potato Rain 25%, Seeker Sprouts 11%, Reroll 7%; 0:53 took Butter Pat 69% over Julienne Dash 11%, Seed Potato 10%, Reroll 10%; 1:27 took Fertilizer 58% over Skillet Flail 20%, Reroll 13%, Hash Boomerang 9%; 1:42 took Seeker Sprouts 84% over Reroll 7%, Hearty Helping 6%, Hash Boomerang 3%; 1:51 took Hash Boomerang 36% over Seed Potato 32%, Fertilizer 16%, Reroll 16%; 2:06 took Sour Cream 39% over Aged Russet 35%, Gravy Heart 18%, Reroll 8%; 2:09 took Hash Boomerang 78% over Lean Lunch 9%, Reroll 8%, Seed Potato 5%; 3:05 took Julienne Dash 37% over Four-Eyed Spud 26%, Spud Dynamo 24%, Reroll 13%; 3:31 took Area 69% over Crit 21%, Duration 10%; 3:39 took Damage 94% over Move speed 3%, Pickup range 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 8, maxHp 120, armor 0, damageMult 1.44, recovery 0, Seeker Sprouts 4/8, Spud Dynamo 1/8, Skillet Flail 1/8, Seed Potato 1/8, Hash Boomerang 1/8, Julienne Dash 1/8, Butter Pat 2/5 | 1:57 level 11, maxHp 120, armor 0, damageMult 1.44, recovery 0, Overgrowth 1/1, Spud Dynamo 1/8, Skillet Flail 1/8, Seed Potato 1/8, Hash Boomerang 4/8, Julienne Dash 1/8, Butter Pat 2/5, Fertilizer 1/5 | 2:59 level 13, maxHp 120, armor 0, damageMult 1.44, recovery 0, Overgrowth 1/1, Spud Dynamo 1/8, Skillet Flail 1/8, Seed Potato 1/8, Hash Boomerang 8/8, Julienne Dash 1/8, Butter Pat 2/5, Fertilizer 1/5, Sour Cream 1/5 | 3:59 level 14, maxHp 120, armor 0, damageMult 1.587, recovery 0, Overgrowth 1/1, Spud Dynamo 1/8, Skillet Flail 1/8, Seed Potato 1/8, Hashnado 1/1, Julienne Dash 7/8, Butter Pat 2/5, Fertilizer 1/5, Sour Cream 1/5.
- Passive levels first reached: Butter Pat 1 at 0:47; Fertilizer 1 at 1:27; Sour Cream 1 at 2:06.

### L4.I6.G6: evade-less s36

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 36; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 37.5s (game clock 00:37); damage taken 121 (enemy:cave-grub 108.815, enemy:aphid 7.033, enemy:compost-maggot 4.97); 46 kills; level 1 to 4; planner asked 16 times, action model 51; the models saw the game 24 ms late (p90 48); ended with seeker-sprouts 1, lean-lunch 1, sour-cream 2.
- run.timeSec: 37.517
- run.level: 3
- run.kills: 46
- run.damageBySource: seeker-sprouts 943.016
- run.damageTakenBySource: enemy:cave-grub 108.815, enemy:aphid 7.033, enemy:compost-maggot 4.97
- run.killsBySource: seeker-sprouts 46
- run.biomes: ["compost-caves"]
- run.distance: 2188.6
- run.dodgePoints: 311.683
- run.dodgeSecond: 37
- run.dodgeTaken: [4.0266799333966885,16.106719733586754,28.186759533776822,32.21343946717351,40.26679933396688,49.10208506556018,64.8925550198592,83.41750681738795,105.24860211213272]
- run.dodgeSteps: [1.4466666666666665,7.646666666666656,13.846666666666644,20.04666666666663,26.24666666666664,32.4466666666668,38.64666666666696,44.84666666666712,51.04666666666728,57.2466666666671,63.44666666666692,69.64666666666682,75.84666666666732,82.04666666666739,88.24666666666721,94.44666666666703,96.7200000000003,102.92000000000012,109.11999999999993,115.31999999999975,121.51999999999957,127.71999999999939,133.91999999999922,140.11999999999904,146.31999999999886,152.51999999999867,158.51333333333181,159.85666666666512,166.05666666666494,172.25666666666476,178.45666666666457,184.6566666666644,190.8566666666642,197.05666666666403,203.25666666666385,209.45666666666366,215.65666666666348]
- run.curseSince: 1469
- run.killer: "enemy:aphid"
- run.goldEarned: 3.465
- run.peakEnemies: 22
- run.grokBotHelps: 1
- counters.kills: 46
- counters.hits: 80
- counters.gems: 29
- counters.coins: 3
- counters.shots: 84
- Gold, spots and chests: gold held at the end 3, spent 0; spots charged and used: Beetle Nest 2; chests seen 0, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:07 took Lean Lunch 61% over Seeker Sprouts 33%, Slow Cooker 6%; 0:14 took Sour Cream 36% over Seeker Sprouts 34%, Sprout Squad 30%; 0:24 took Sour Cream 40% over Lean Lunch 34%, Chip Shuriken 26%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:37 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Lean Lunch 1/5, Sour Cream 2/5.
- Passive levels first reached: Lean Lunch 1 at 0:07; Sour Cream 1 at 0:14.

### L4.I6.G7: evade-less s37

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 37; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 213.8s (game clock 03:33); damage taken 246 (Spore vent 8.933, enemy:cave-grub 19.496, enemy:aphid 1.381, enemy:sand-crab 29.774); 1137 kills; level 1 to 12; planner asked 78 times, action model 529; the models saw the game 27 ms late (p90 49); ended with seeker-sprouts 4, broadside 2, peeler 1, potato-battery 2, mash-snowball 1, frozen-fries 1, chives 1, aged-russet 2, stuffed-skin 1.
- run.timeSec: 213.783
- run.level: 11
- run.kills: 1137
- run.damageBySource: seeker-sprouts 6454.31, broadside 6112.38, peeler 1786.126, grok-bot 375.294, potato-battery 4916.952, mash-snowball 9265.206, frozen-fries 1769.496
- run.damageTakenBySource: Spore vent 8.933, enemy:cave-grub 19.496, enemy:aphid 1.381, enemy:sand-crab 29.774, enemy:fry-fly 14.931, enemy:bog-slime 6.086, enemy:tomato-leech 7.152, Hot oil 5.333, enemy:swarm-fly 5.544, boss:amusing 64.308, enemy:crumb-ant 13.361, enemy:frost-flea 1.747, enemy:sprout-mite 1.84, enemy:potato-beetle 3.728, boss:beetle-queen 38.985, enemy:spittlebug 21.503, enemy:little-grey 2.018
- run.killsBySource: seeker-sprouts 318, peeler 51, broadside 165, grok-bot 19, potato-battery 190, mash-snowball 357, frozen-fries 37
- run.biomes: ["compost-caves","peel-forest","crop-circle","fry-oil-desert","ketchup-bog","chip-canyons","mash-swamp"]
- run.distance: 12115.012
- run.dodgePoints: 1172.465
- run.dodgeSecond: 213
- run.dodgeTaken: [188.1749262534012,190.8947762534012,190.8947762534012,190.8947762534012,190.8947762534012,190.8947762534012,190.8947762534012,193.6146262534012,193.6146262534012,193.6146262534012,193.6146262534012,193.6146262534012,193.6146262534012,196.33447625340122,196.33447625340122,200.89517530861227,200.89517530861227,200.89517530861227,203.61502530861225,206.33487530861225,206.33487530861225,206.33487530861225,206.33487530861225,206.33487530861225,215.80412166632945,215.80412166632945,220.55775575816722,220.55775575816722,220.55775575816722,228.62657700226407,232.6862821662797,143.76928766369358,143.76928766369358,143.76928766369358,143.76928766369358,143.76928766369358,145.57359071303262,145.57359071303262,145.57359071303262,145.57359071303262,145.57359071303262,145.57359071303262,145.57359071303262,145.57359071303262,145.57359071303262,145.57359071303262,145.57359071303262,145.57359071303262,150.5229936335468,156.0913830931332,156.0913830931332,162.32519433257121,162.32519433257121,162.32519433257121,162.32519433257121,165.50950958673454,165.50950958673454,165.50950958673454,165.50950958673454,165.50950958673454,165.50950958673454]
- run.dodgeSteps: [1037.399999999822,1043.5999999998191,1049.7999999998162,1055.9999999998133,1062.1999999998104,1068.3999999998075,1074.5999999998046,1080.7999999998017,1086.9999999997988,1093.1999999997959,1099.399999999793,1105.59999999979,1111.7999999997871,1117.9999999997842,1124.1999999997813,1130.3999999997784,1136.5999999997755,1142.7999999997726,1148.9999999997697,1155.1999999997668,1161.3999999997638,1167.599999999761,1173.799999999758,1179.9999999997551,1186.1999999997522,1189.1243333330833,1193.69683333308,1198.2951666664098,1201.023166666407,1204.4331666664032,1208.9643333330673,878.943333333227,878.943333333227,887.6699999998924,891.493333333224,891.493333333224,891.493333333224,891.493333333224,896.0399999998884,900.9999999998861,907.1999999998832,913.3999999998803,919.5999999998774,925.7999999998744,931.9999999998715,938.1999999998686,944.3999999998657,950.5999999998628,956.7999999998599,962.999999999857,969.1999999998541,975.3999999998512,981.5999999998483,987.7999999998453,993.9999999998424,1000.1999999998395,1006.3999999998366,1012.5999999998337,1018.7999999998308,1024.9999999998279,1031.199999999825]
- run.curseSince: 12707
- run.killer: "enemy:spittlebug"
- run.goldEarned: 190.485
- run.bossChests: 3
- run.bossesKilled: 2
- run.elitesKilled: 5
- run.peakEnemies: 175
- run.shrinesUsed: 2
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1,1]
- counters.kills: 1137
- counters.hits: 2007
- counters.gems: 476
- counters.coins: 38
- counters.shots: 1263
- counters.hostileShots: 199
- counters.nearMisses: 20
- counters.hostileHits: 13
- shrineTotals.might: 0.06
- shrineTotals.luck: 0.102
- Gold, spots and chests: gold held at the end 190, spent 0; spots charged and used: none; chests seen 7, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Broadside 75% over Rotten Spud 15%, Mash Mallet 10%; 0:19 took Chives 52% over Seeker Sprouts 43%, Spry Sprout 5%; 0:24 took Peeler 69% over Spud Decoy 22%, Salt Line 9%; 0:25 took Aged Russet 60% over Root Network 34%, Hearty Helping 6%; 0:37 took Broadside 38% over Starch Plating 35%, Chives 27%; 0:57 took Potato Battery 67% over Seeker Sprouts 22%, Reroll 7%, Salt Shaker 4%; 1:39 took Mash Snowball 66% over Chives 21%, Reroll 8%, Masher Grip 5%; 1:40 took Luck 50% over Cooldown 47%, Move speed 3%; 2:04 took Frozen Fries 79% over Butter Socks 8%, Fertilizer 8%, Reroll 5%; 2:19 took Stuffed Skin 62% over Seeker Sprouts 18%, Aged Russet 12%, Reroll 6%, Fertilizer 2%; 2:38 took Damage 56% over Move speed 41%, Luck 3%; 2:51 took Aged Russet 63% over Masher Grip 27%, Reroll 6%, Fertilizer 4%; 3:31 took Potato Battery 39% over Reroll 24%, Peeler 22%, Fertilizer 15%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 7, maxHp 120, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 3/8, Broadside 2/8, Peeler 1/8, Potato Battery 1/8, Chives 1/5, Aged Russet 1/5 | 1:59 level 8, maxHp 120, armor 0, damageMult 1.035, recovery 0, Seeker Sprouts 4/8, Broadside 2/8, Peeler 1/8, Potato Battery 1/8, Mash Snowball 1/8, Chives 1/5, Aged Russet 1/5 | 2:59 level 11, maxHp 129.6, armor 0, damageMult 1.166, recovery 0, Seeker Sprouts 4/8, Broadside 2/8, Peeler 1/8, Potato Battery 1/8, Mash Snowball 1/8, Frozen Fries 1/8, Chives 1/5, Aged Russet 2/5, Stuffed Skin 1/5 | 3:33 level 12, maxHp 129.6, armor 0, damageMult 1.177, recovery 0, Seeker Sprouts 4/8, Broadside 2/8, Peeler 1/8, Potato Battery 2/8, Mash Snowball 1/8, Frozen Fries 1/8, Chives 1/5, Aged Russet 2/5, Stuffed Skin 1/5.
- Passive levels first reached: Chives 1 at 0:19; Aged Russet 1 at 0:25; Stuffed Skin 1 at 2:19.

### L4.I6.G8: evade-less s38

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 38; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240s (game clock 04:00), health 141/144; damage taken 107 (Brambles 13.4, enemy:snow-mold 11.614, Hot oil 8.8, enemy:bog-slime 4.55); 1740 kills; level 1 to 15; planner asked 97 times, action model 388; the models saw the game 29 ms late (p90 48); ended with seeker-sprouts 8, fry-sentry 1, tater-twirl 4, frozen-fries 3, mash-wave 2, rosti-disc 2, butter-pat 3.
- run.timeSec: 240
- run.level: 14
- run.kills: 1740
- run.damageBySource: seeker-sprouts 13986.187, fry-sentry 7524.128, tater-twirl 6469.029, frozen-fries 5401.138, mash-wave 15230.089, rosti-disc 5508.089
- run.damageTakenBySource: Brambles 13.4, enemy:snow-mold 11.614, Hot oil 8.8, enemy:bog-slime 4.55, enemy:swarm-fly 2.772, boss:amusing 15.523, enemy:spittlebug 11.382, enemy:ketchup-drop 2.446, boss:beetle-queen 28.105, enemy:potato-beetle 8.155
- run.killsBySource: seeker-sprouts 565, fry-sentry 282, tater-twirl 182, frozen-fries 141, mash-wave 478, rosti-disc 92
- run.biomes: ["compost-caves","peel-forest","mash-swamp","ketchup-bog"]
- run.distance: 12504.367
- run.dodgePoints: 1967.833
- run.dodgeSecond: 240
- run.dodgeTaken: [60.79592560728338,60.79592560728338,60.79592560728338,60.79592560728338,60.79592560728338,60.79592560728338,60.79592560728338,63.51577560728338,63.51577560728338,63.51577560728338,63.51577560728338,63.51577560728338,63.51577560728338,66.23562560728338,66.23562560728338,66.23562560728338,66.23562560728338,66.23562560728338,66.23562560728338,66.23562560728338,66.23562560728338,70.23958208272077,70.23958208272077,70.23958208272077,92.90499874938745,92.90499874938745,92.90499874938745,94.40499874938743,94.40499874938743,94.40499874938743,94.40499874938743,94.40499874938743,94.40499874938743,95.10499874938743,99.2556492453148,99.2556492453148,99.2556492453148,99.2556492453148,99.2556492453148,99.2556492453148,99.2556492453148,99.2556492453148,99.2556492453148,99.2556492453148,99.2556492453148,103.44663566429625,103.44663566429625,103.44663566429625,103.44663566429625,103.44663566429625,103.44663566429625,103.44663566429625,103.44663566429625,103.44663566429625,103.44663566429625,104.04663566429628,106.74663566429626,106.74663566429626,60.79592560728338,60.79592560728338,60.79592560728338]
- run.dodgeSteps: [928.0779999999728,934.2779999999699,940.477999999967,946.6779999999641,952.8779999999612,959.0779999999583,965.2779999999553,971.4779999999524,977.3989999999494,980.8089999999456,984.823499999942,991.0234999999391,997.2234999999362,1003.4234999999333,1009.6234999999303,1015.8234999999274,1020.2668333332588,1026.4668333332559,1032.666833333253,1038.86683333325,1045.0668333332471,1051.2668333332442,1057.4668333332413,1061.703499999906,1067.8001666665698,1072.966833333234,1079.1668333332311,1085.3668333332282,1089.3968333332264,1093.633499999891,1098.1801666665556,1102.4168333332202,1102.8301666665534,1105.310166666552,1111.5101666665491,1117.7101666665462,1123.9101666665433,1130.1101666665404,1136.3101666665375,1142.5101666665346,1148.7101666665317,1154.9101666665288,1161.1101666665259,1167.310166666523,1173.51016666652,1179.7101666665171,1185.9101666665142,1192.1101666665113,1198.3101666665084,1204.5101666665055,1210.7101666665026,1214.399166666499,1219.4366666664957,1225.6366666664928,1231.83666666649,1238.036666666487,1244.236666666484,1250.4366666664812,909.4779999999815,915.6779999999786,921.8779999999757]
- run.curseSince: 13253
- run.goldEarned: 407.008
- run.bossChests: 4
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 174
- run.shrinesUsed: 5
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 1740
- counters.hits: 3424
- counters.gems: 1328
- counters.coins: 86
- counters.shots: 1193
- counters.hostileShots: 180
- counters.nearMisses: 10
- counters.hostileHits: 7
- shrineTotals.might: 0.084
- shrineTotals.area: 0.12
- shrineTotals.maxHp: 20.4
- shrineTotals.magnet: 0.15
- Gold, spots and chests: gold held at the end 407, spent 0; spots charged and used: Tater Lantern 1; chests seen 6, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Fry Cook Sentry 54% over Spud Decoy 26%, Gravy Splash 20%; 0:22 took Butter Pat 43% over Reroll 21%, Seeker Sprouts 19%, Fry Cook Sentry 17%; 0:28 took Area 77% over Luck 15%, Duration 8%; 0:36 took Max HP 96% over Area 3%, Luck 1%; 0:39 took Tater Twirl 63% over Butter Pat 31%, Fertilizer 3%, Reroll 3%; 0:48 took Frozen Fries 74% over Thick Skin 16%, Reroll 6%, Couch Potato 4%; 1:05 took Damage 82% over Armor 15%, Move speed 3%; 1:16 took Area 60% over Gold gain 26%, Move speed 14%; 1:18 took Mash Wave 55% over Seeker Sprouts 23%, Clean Plate 12%, Reroll 10%; 1:20 took Frozen Fries 44% over Fertilizer 21%, Mash Wave 18%, Reroll 17%; 1:33 took Tater Twirl 47% over Fertilizer 20%, Reroll 18%, Mash Wave 15%; 1:35 took Rösti Disc 56% over Butter Pat 34%, Reroll 6%, Fertilizer 4%; 1:56 took Frozen Fries 55% over Reroll 16%, Mash Wave 15%, Fertilizer 14%; 2:18 took Pickup range 48% over Area 37%, Gold gain 15%; 2:22 took Mash Wave 60% over Fertilizer 21%, Reroll 15%, Golden Fry 4%; 3:03 took Rösti Disc 47% over Reroll 19%, Fertilizer 18%, Potato Magnet 16%; 3:20 took Tater Twirl 44% over Fertilizer 23%, Reroll 19%, Mash Wave 14%; 3:39 took Butter Pat 48% over Fertilizer 21%, Tater Twirl 17%, Reroll 13%, Skip 1%; 3:40 took Butter Pat 50% over Fertilizer 20%, Tater Twirl 16%, Reroll 13%, Skip 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 144.48, armor 0, damageMult 1.2, recovery 0, Seeker Sprouts 1/8, Fry Cook Sentry 1/8, Tater Twirl 1/8, Frozen Fries 1/8, Butter Pat 1/5 | 2:00 level 10, maxHp 144.48, armor 0, damageMult 1.301, recovery 0, Seeker Sprouts 4/8, Fry Cook Sentry 1/8, Tater Twirl 2/8, Frozen Fries 3/8, Mash Wave 1/8, Rösti Disc 1/8, Butter Pat 1/5 | 3:00 level 11, maxHp 144.48, armor 0, damageMult 1.301, recovery 0, Seeker Sprouts 5/8, Fry Cook Sentry 1/8, Tater Twirl 2/8, Frozen Fries 3/8, Mash Wave 2/8, Rösti Disc 1/8, Butter Pat 1/5 | 3:59 level 15, maxHp 144.48, armor 0, damageMult 1.873, recovery 0, Seeker Sprouts 8/8, Fry Cook Sentry 1/8, Tater Twirl 4/8, Frozen Fries 3/8, Mash Wave 2/8, Rösti Disc 2/8, Butter Pat 3/5.
- Passive levels first reached: Butter Pat 1 at 0:22, 3 at 3:41.

### L4.I6.G9: evade-less s39

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 39; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 194.8s (game clock 03:14); damage taken 164 (enemy:aphid 11.587, enemy:sprout-mite 6.476, enemy:cave-grub 4.47, Brambles 2.8); 1061 kills; level 1 to 13; planner asked 73 times, action model 424; the models saw the game 29 ms late (p90 50); ended with seeker-sprouts 2, locked-gatling 7, julienne-dash 1, mash-landing 1, tot-stampede 1, mash-finisher 2, butter-socks 1, masher-grip 2.
- run.timeSec: 194.767
- run.level: 12
- run.kills: 1061
- run.damageBySource: seeker-sprouts 4623.981, locked-gatling 14525.523, grok-bot 193.513, julienne-dash 4272.959, mash-landing 217.764, tot-stampede 263.909
- run.damageTakenBySource: enemy:aphid 11.587, enemy:sprout-mite 6.476, enemy:cave-grub 4.47, Brambles 2.8, enemy:compost-maggot 8.067, Spore vent 10.533, boss:amusing 32.154, enemy:potato-beetle 10.715, enemy:crumb-ant 14.267, enemy:sand-crab 16.447, enemy:oil-drip 11.884, boss:beetle-queen 7.927, enemy:frost-flea 9.304, enemy:snow-mold 17.854
- run.killsBySource: seeker-sprouts 240, locked-gatling 608, grok-bot 13, julienne-dash 182, mash-landing 11, tot-stampede 7
- run.biomes: ["chip-canyons","fry-oil-desert","peel-forest","compost-caves","frozen-tundra"]
- run.distance: 11559.96
- run.dodgePoints: 1358.599
- run.dodgeSecond: 194
- run.dodgeTaken: [149.30513394613,149.30513394613,149.30513394613,149.30513394613,153.20374157378433,153.20374157378433,155.14202089954858,159.8190190203819,162.5388690203819,162.5388690203819,162.5388690203819,162.5388690203819,63.151923933064865,63.151923933064865,63.151923933064865,63.151923933064865,63.151923933064865,63.151923933064865,63.151923933064865,71.67298107128687,73.38291154228898,75.09078241981463,83.0724164665616,85.35588510993988,85.35588510993988,85.35588510993988,87.11918272176831,89.6065964452496,89.6065964452496,89.6065964452496,91.96856024316797,91.96856024316797,93.76200005218188,93.76200005218188,93.76200005218188,93.76200005218188,97.35990551829671,99.17330480786197,99.17330480786197,99.17330480786197,105.81803342591527,109.45176919088478,118.35869143407443,126.8396119285857,126.8396119285857,126.8396119285857,126.8396119285857,126.8396119285857,128.68274548275235,141.2884057246366,145.51168442044238,145.51168442044238,145.51168442044238,147.40500701944396,149.30513394613,149.30513394613,149.30513394613,149.30513394613,149.30513394613,149.30513394613,149.30513394613]
- run.dodgeSteps: [1084.747333333223,1090.94733333322,1097.1473333332171,1103.3473333332142,1109.5473333332113,1114.75533333321,1119.0953333332102,1128.9793333332086,1133.3193333332065,1139.5193333332036,1144.8926666665343,1147.3726666665332,780.7866666666671,786.9866666666696,793.1866666666676,799.386666666667,804.5533333333312,809.72,815.9200000000022,822.1200000000002,828.3199999999973,834.5199999999944,840.7199999999915,846.9199999999886,853.1199999999857,859.3199999999828,867.8399999999816,874.0399999999787,880.2399999999758,886.4399999999729,892.63999999997,898.8399999999671,905.0399999999642,911.2399999999612,917.4399999999583,923.6399999999554,929.8399999999525,936.0399999999496,942.2399999999467,948.4399999999438,954.6399999999409,960.839999999938,967.039999999935,976.2499999999329,987.1799999999312,992.0366666665956,998.2366666665927,1004.4366666665898,1010.6366666665868,1016.8366666665839,1023.036666666581,1029.236666666578,1035.436666666575,1041.6366666665722,1046.1833333332368,1052.3833333332338,1058.583333333231,1064.5043333332285,1067.9763333332287,1072.3473333332288,1078.5473333332259]
- run.curseSince: 9548
- run.killer: "enemy:frost-flea"
- run.goldEarned: 253.98
- run.bossChests: 4
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 165
- run.shrinesUsed: 1
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 1061
- counters.hits: 1913
- counters.gems: 831
- counters.coins: 56
- counters.shots: 3427
- counters.hostileShots: 158
- counters.nearMisses: 15
- counters.hostileHits: 3
- shrineTotals.cooldown: 0.036
- Gold, spots and chests: gold held at the end 253, spent 0; spots charged and used: Beetle Nest 1; chests seen 6, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Mash Finisher 61% over Potato Magnet 24%, Spud Sneakers 15%; 0:20 took Seeker Sprouts 48% over Frozen Fries 37%, Mash Mallet 15%; 0:23 took Locked Gatling 93% over Masher Grip 4%, Sour Cream 3%; 0:37 took Cooldown 62% over Max HP 31%, Move speed 7%; 0:50 took Mash Finisher 50% over Tater Mines 41%, Bacon Bits 9%; 1:11 took Julienne Dash 87% over Root Network 9%, Rotten Spud 4%; 1:24 took Locked Gatling 47% over Potato Rain 37%, Hot Potato 16%; 1:25 took Butter Socks 47% over Seeker Sprouts 45%, Potato Magnet 8%; 1:47 took Locked Gatling 46% over Julienne Dash 28%, Masher Grip 26%; 2:10 took Masher Grip 49% over Julienne Dash 47%, Fertilizer 4%; 2:12 took Mash Landing 48% over Masher Grip 44%, Mash Finisher 8%; 2:39 took Masher Grip 66% over Packed Pan 19%, Lean Lunch 15%; 3:08 took Tot Stampede 63% over Seeker Sprouts 28%, Slow Cooker 9%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Locked Gatling 1/8, Mash Finisher 2/5 | 1:59 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Locked Gatling 7/8, Julienne Dash 1/8, Mash Finisher 2/5, Butter Socks 1/5 | 2:59 level 12, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Locked Gatling 7/8, Julienne Dash 1/8, Mash Landing 1/8, Mash Finisher 2/5, Butter Socks 1/5, Masher Grip 2/5 | 3:14 level 13, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Locked Gatling 7/8, Julienne Dash 1/8, Mash Landing 1/8, Tot Stampede 1/8, Mash Finisher 2/5, Butter Socks 1/5, Masher Grip 2/5.
- Passive levels first reached: Mash Finisher 1 at 0:11; Butter Socks 1 at 1:25; Masher Grip 1 at 2:10.

### L4.I6.G10: playbook s38

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 38; 240s; plays the playbook.
- Outcome: alive after 240s (game clock 04:00), health 120/120; damage taken 69 (enemy:compost-maggot 1.154, enemy:cave-grub 7.87, enemy:tomato-leech 31.289, Hot oil 7.8); 4457 kills; level 1 to 19; planner asked 98 times, action model 318; the models saw the game 31 ms late (p90 51); ended with overgrowth 1, butter-streak 2, harvest-moon 3, spicy-hot-potato 1, spud-dice 1, mezzaluna 1, hot-sauce 2, fertilizer 2, starch-plating 1.
- run.timeSec: 240.017
- run.level: 18
- run.kills: 4457
- run.damageBySource: seeker-sprouts 6733.094, butter-streak 641.72, harvest-moon 564.266, hot-potato 4469.712, dog:greyhound 603.974, grok-bot 73.978, spud-dice 4475.101, spicy-hot-potato 87881.93, mezzaluna 156.017, overgrowth 21323.769
- run.damageTakenBySource: enemy:compost-maggot 1.154, enemy:cave-grub 7.87, enemy:tomato-leech 31.289, Hot oil 7.8, boss:amusing 13.305, Spore vent 1.6, boss:beetle-queen 2.72, enemy:crumb-ant 1.955, Brambles 1.4
- run.killsBySource: seeker-sprouts 239, butter-streak 6, harvest-moon 11, hot-potato 242, dog:greyhound 30, grok-bot 5, spud-dice 121, spicy-hot-potato 3166, mezzaluna 1, overgrowth 636
- run.evolutions: [{"id":"spicy-hot-potato","at":96.08333333333333},{"id":"overgrowth","at":209.41666666666666}]
- run.biomes: ["compost-caves","mash-swamp","peel-forest","ketchup-bog","chip-canyons","crop-circle"]
- run.dogs: [{"id":"greyhound","at":31.216666666666665}]
- run.dogHelp: damage.greyhound 603.974, hits.greyhound 33
- run.distance: 13783.969
- run.dodgePoints: 2036.621
- run.dodgeSecond: 240
- run.dodgeTaken: [63.01721167094187,65.73706167094187,65.73706167094187,65.73706167094187,65.73706167094187,67.69164698031804,67.69164698031804,67.69164698031804,67.69164698031804,67.69164698031804,67.69164698031804,67.69164698031804,67.69164698031804,67.69164698031804,67.69164698031804,67.69164698031804,67.69164698031804,67.69164698031804,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,69.09164698031805,63.01721167094187,63.01721167094187,63.01721167094187]
- run.dodgeSteps: [1047.4967166666415,1051.8780499999725,1054.7259166666377,1060.6407166666345,1067.212716666631,1073.7847166666274,1080.356716666624,1086.9287166666204,1093.5007166666169,1100.0727166666134,1106.6447166666098,1113.2167166666063,1119.7887166666028,1126.3607166665993,1132.9327166665958,1139.5047166665922,1146.0767166665887,1146.2957833332553,1149.80084999992,1156.3728499999165,1162.944849999913,1169.5168499999095,1176.088849999906,1182.6608499999024,1189.232849999899,1194.5999833332294,1197.8859833332276,1197.8859833332276,1204.019849999891,1206.1009833332232,1207.8535166665556,1214.425516666552,1220.9975166665486,1227.569516666545,1234.1415166665415,1240.713516666538,1247.2855166665345,1253.857516666531,1260.4295166665274,1267.001516666524,1273.5735166665204,1280.1455166665169,1286.7175166665133,1293.2895166665098,1299.8615166665063,1306.4335166665028,1313.0055166664993,1319.5775166664957,1326.1495166664922,1329.216449999824,1332.2833833331556,1338.855383333152,1345.4273833331486,1351.999383333145,1358.5713833331415,1365.143383333138,1371.7153833331345,1378.287383333131,1030.957183333317,1035.2289833333148,1041.8009833333113]
- run.curseSince: 14334
- run.goldEarned: 665.705
- run.bossChests: 7
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 119
- run.grokBotHelps: 7
- run.lootRunnersMet: [1,1]
- run.lootRunnersCaught: [1,1]
- counters.kills: 4457
- counters.hits: 5691
- counters.crits: 483
- counters.gems: 871
- counters.coins: 200
- counters.shots: 1537
- counters.hostileShots: 33
- counters.nearMisses: 5
- Gold, spots and chests: gold held at the end 665, spent 0; spots charged and used: Tater Lantern 5, Crop Patch 4; chests seen 8, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Butter Streak 63% over Seeker Sprouts 20%, Chives 17%; 0:21 took Harvest Moon 87% over Butter Streak 10%, Slow Cooker 3%; 0:25 took Hot Potato 54% over Masher Grip 27%, Small Fry 19%; 0:59 took Spud Dice 55% over Butter Pat 42%, Couch Potato 3%; 1:11 took Hot Potato 50% over Four-Eyed Spud 33%, Reroll 10%, Hot Sauce 7%; 1:16 took Hot Potato 65% over Hot Sauce 18%, Reroll 12%, Spud Dice 5%; 1:32 took Hot Sauce 52% over Harvest Moon 24%, Reroll 14%, Butter Streak 10%; 1:54 took Mezzaluna 68% over Seeker Sprouts 18%, Reroll 8%, Butter Streak 6%; 2:18 took Hot Sauce 33% over Butter Socks 32%, Reroll 18%, Thick Skin 15%, Skip 2%; 3:05 took Seeker Sprouts 58% over Big Bowl 25%, Reroll 8%, Fertilizer 7%, Skip 2%; 3:06 took Seeker Sprouts 61% over Hot Sauce 13%, Fertilizer 13%, Reroll 12%, Skip 1%; 3:06 took Harvest Moon 47% over Fertilizer 18%, Reroll 17%, Butter Streak 16%, Skip 2%; 3:06 took Harvest Moon 45% over Butter Socks 30%, Reroll 15%, Fertilizer 8%, Skip 2%; 3:07 took Seeker Sprouts 65% over Lean Lunch 20%, Reroll 7%, Fertilizer 6%, Skip 2%; 3:07 took Fertilizer 35% over Spud Dice 26%, Reroll 19%, Mezzaluna 17%, Skip 3%; 3:08 took Fertilizer 49% over Spud Dice 20%, Reroll 19%, Mezzaluna 10%, Skip 2%; 3:18 took Butter Streak 33% over Hot Sauce 30%, Reroll 20%, Mezzaluna 15%, Skip 2%; 3:58 took Starch Plating 44% over Spud Dice 29%, Reroll 16%, Mezzaluna 8%, Skip 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Butter Streak 1/8, Harvest Moon 1/8, Hot Potato 1/8, Spud Dice 1/8 | 1:57 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Butter Streak 1/8, Harvest Moon 1/8, Spicy Hot Potato 1/1, Spud Dice 1/8, Mezzaluna 1/8, Hot Sauce 1/5 | 2:59 level 10, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Butter Streak 1/8, Harvest Moon 1/8, Spicy Hot Potato 1/1, Spud Dice 1/8, Mezzaluna 1/8, Hot Sauce 2/5 | 3:59 level 19, maxHp 120, armor 20, damageMult 1, recovery 0, Overgrowth 1/1, Butter Streak 2/8, Harvest Moon 3/8, Spicy Hot Potato 1/1, Spud Dice 1/8, Mezzaluna 1/8, Hot Sauce 2/5, Fertilizer 2/5, Starch Plating 1/5.
- Passive levels first reached: Hot Sauce 1 at 1:33; Fertilizer 1 at 3:07; Starch Plating 1 at 3:59.
