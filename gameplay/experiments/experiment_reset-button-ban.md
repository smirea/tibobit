# Does banning Reset Button picks keep thin builds levelling and alive at 4:00?

| Field | Value |
| --- | --- |
| Status | done |
| Area | models |
| Result | inconclusive |
| Created | L6.I2 |
| Updated | L6.I3 |

## Hypothesis

The game erases every XP gem and coin on screen when a reset fires, and Reset Button deals no damage. The default planner takes it at 66-87% whenever offered, and games that took it two or more times died by 3:25 in 4 of 4. A planner.pick text that never takes Reset Button or Factory Reset keeps levelling going and raises level at 3:00 and alive at 4:00 on seeds where it is offered.

## Method

Seeker-sprouts with the playbook knobs and only planner.pick changed, 240 s from 0:00. Seeds 31, 43 and 47 get two games each, because Reset Button was the first offer on all three in earlier games. Seeds 41, 48, 49 and 50 are a collateral check against playbook games on file (all alive at 4:00). Metrics chosen first: Reset Button taken (target 0), level and kills at 3:00, and alive at 4:00. Manipulation check: Reset Button appears in a picks line and is not taken. Only games where it is offered can speak to the effect, and I will report how many. This is a lead only. A playbook change needs 10 fresh paired seeds.

## Findings

L6.I2: 1 of 10 alive at 4:00 against 7 of 7 playbook games on file for the same seeds. Reset Button was never offered in any of the 10 games, so the manipulation check failed and the card was not tested. The pick text lost on other effects (B123). A start-of-run banish (open infra request) would test the card cleanly.

## Games

### L6.I2.G1: no reset pick s31 a

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 212.2s (game clock 03:32); damage taken 190 (Hot oil 6.667, enemy:crumb-ant 37.845, enemy:lint-bunny 5.831, enemy:oil-drip 30.989); 682 kills; level 1 to 8; planner asked 70 times, action model 375; the models saw the game 36 ms late (p90 55); ended with seeker-sprouts 4, hash-hawk 3, chives 2.
- run.timeSec: 212.2
- run.level: 7
- run.kills: 682
- run.damageBySource: seeker-sprouts 6502.312, hash-hawk 8457.885, grok-bot 107.001, alex 3234.989
- run.damageTakenBySource: Hot oil 6.667, enemy:crumb-ant 37.845, enemy:lint-bunny 5.831, enemy:oil-drip 30.989, enemy:bog-slime 19.231, enemy:ketchup-drop 1.914, Brambles 9.7, enemy:sprout-mite 7.718, enemy:aphid 1.893, enemy:potato-beetle 31.084, enemy:cave-grub 3.888, enemy:beetle-brood 29.017, boss:beetle-queen 4.533
- run.killsBySource: seeker-sprouts 348, hash-hawk 182, grok-bot 6, alex 146
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","coin-laundromat","chip-canyons","peel-forest","frozen-tundra","compost-caves"]
- run.dogs: [{"id":"pomeranian","at":68.75},{"id":"sigkitten","at":73.91666666666667}]
- run.dogHelp: finds.sigkitten 56, blocked.pomeranian 11
- run.distance: 12617.472
- run.dodgePoints: 1476.427
- run.dodgeSecond: 212
- run.dodgeTaken: [111.17677606469374,111.17677606469374,111.17677606469374,123.61037606469374,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,151.9791593750395,154.69445464778437,183.40805141624062,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,107.39566234301148,111.17677606469374,111.17677606469374,111.17677606469374,111.17677606469374,111.17677606469374,111.17677606469374,111.17677606469374,111.17677606469374]
- run.dodgeSteps: [1078.1338333331953,1084.3338333331924,1090.5338333331895,1096.7338333331866,1102.9338333331837,1113.0038333331818,1119.2038333331789,1125.403833333176,1131.603833333173,1137.8038333331701,1144.0038333331672,1150.2038333331643,1156.4038333331614,1162.6038333331585,1168.8038333331556,1175.0038333331527,1181.2038333331498,1187.4038333331468,1193.603833333144,1202.0204999998093,1204.7071666664747,1210.9071666664718,1217.1071666664689,1223.307166666466,1229.507166666463,1235.7071666664601,1241.9071666664572,1248.1071666664543,1254.3071666664514,1260.5071666664485,885.9338333332855,892.1338333332826,898.3338333332797,904.5338333332768,910.7338333332739,916.933833333271,923.1338333332681,929.3338333332651,935.5338333332622,941.7338333332593,947.9338333332564,954.1338333332535,960.3338333332506,966.5338333332477,972.7338333332448,978.9338333332419,985.133833333239,991.333833333236,997.5338333332331,1003.7338333332302,1009.9338333332273,1016.1338333332244,1022.3338333332215,1028.5338333332186,1034.7338333332157,1040.9338333332128,1047.1338333332099,1053.333833333207,1059.533833333204,1065.7338333332011,1071.9338333331982]
- run.curseSince: 5204
- run.killer: "enemy:crumb-ant"
- run.goldEarned: 90.76
- run.bossChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 181
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 682
- counters.hits: 969
- counters.gems: 152
- counters.coins: 19
- counters.shots: 476
- counters.hostileShots: 266
- counters.nearMisses: 4
- counters.hostileHits: 1
- Gold, spots and chests: gold held at the end 90, spent 0; spots charged and used: Crop Patch 1, Tater Lantern 1, Spud Freezer 1, Stray Dog 1; chests seen 3, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Hash Hawk 68% over Aged Russet 17%, Mezzaluna 15%; 0:28 took Chives 95% over Stuffed Skin 3%, Thick Skin 2%; 0:42 took Seeker Sprouts 66% over Potato Battery 32%, Tater Trot 2%; 0:57 took Seeker Sprouts 69% over Mash Finisher 29%, Spud Sneakers 2%; 1:15 took Hash Hawk 48% over Locked Gatling 45%, Hash Rush 7%; 1:26 took Chives 65% over Big Bowl 21%, Reroll 10%, Slow Cooker 4%; 2:45 took Hash Hawk 76% over Fertilizer 11%, Small Fry 9%, Reroll 4%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Hash Hawk 1/8, Chives 1/5 | 1:59 level 7, maxHp 120, armor 0, damageMult 1, recovery 0.15, Seeker Sprouts 4/8, Hash Hawk 2/8, Chives 2/5 | 2:59 level 8, maxHp 120, armor 0, damageMult 1, recovery 0.15, Seeker Sprouts 4/8, Hash Hawk 3/8, Chives 2/5 | 3:32 level 8, maxHp 120, armor 0, damageMult 1, recovery 0.15, Seeker Sprouts 4/8, Hash Hawk 3/8, Chives 2/5.
- Passive levels first reached: Chives 1 at 0:28.

### L6.I2.G2: no reset pick s31 b

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 206.5s (game clock 03:26); damage taken 229 (Brambles 1.5, enemy:potato-beetle 55.887, enemy:crumb-ant 23.8, enemy:sprout-mite 5.308); 922 kills; level 1 to 11; planner asked 73 times, action model 413; the models saw the game 38 ms late (p90 61); ended with seeker-sprouts 6, hash-harrier 1, frying-pan 1, fertilizer 1, bacon-bits 2, lean-lunch 1.
- run.timeSec: 206.5
- run.level: 10
- run.kills: 922
- run.damageBySource: seeker-sprouts 4969.692, hash-hawk 8593.499, frying-pan 1917.36, alex 1830.336, grok-bot 1268.26, hash-harrier 12747.973
- run.damageTakenBySource: Brambles 1.5, enemy:potato-beetle 55.887, enemy:crumb-ant 23.8, enemy:sprout-mite 5.308, enemy:cave-grub 5.762, enemy:ketchup-drop 3.555, Spore vent 4.533, enemy:compost-maggot 1.546, enemy:aphid 3.707, enemy:frost-flea 1.714, enemy:oil-drip 20.063, Hot oil 2.667, enemy:fry-fly 84.894, enemy:sand-crab 13.672
- run.killsBySource: seeker-sprouts 234, hash-hawk 209, frying-pan 78, alex 108, grok-bot 76, hash-harrier 217
- run.evolutions: [{"id":"hash-harrier","at":174.58333333333334}]
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","peel-forest","compost-caves","frozen-tundra","chip-canyons"]
- run.distance: 11661.168
- run.dodgePoints: 1428.038
- run.dodgeSecond: 206
- run.dodgeTaken: [140.1447183298269,140.1447183298269,140.1447183298269,143.3834337397855,143.3834337397855,145.3432261907907,147.3030186417959,147.3030186417959,147.3030186417959,147.3030186417959,150.5912780128767,152.56423363552517,152.56423363552517,158.54107928317686,158.54107928317686,158.54107928317686,158.54107928317686,158.54107928317686,158.54107928317686,161.88202365303636,161.88202365303636,161.88202365303636,177.90056997130682,215.84461603376127,84.0262102919768,84.0262102919768,84.0262102919768,84.0262102919768,84.0262102919768,84.0262102919768,84.0262102919768,84.0262102919768,84.0262102919768,84.0262102919768,84.0262102919768,86.42532249120794,90.63161258151456,90.63161258151456,92.45264343094905,92.45264343094905,96.72009717504424,99.38676384171092,99.38676384171092,99.38676384171092,99.38676384171092,109.35324664944153,109.35324664944153,119.31972945717214,126.76497139262722,126.76497139262722,126.76497139262722,126.76497139262722,126.76497139262722,126.76497139262722,126.76497139262722,126.76497139262722,126.76497139262722,126.76497139262722,126.76497139262722,133.1470968180331,140.1447183298269]
- run.dodgeSteps: [1034.4234999999014,1040.6234999998985,1046.8234999998956,1053.0234999998927,1059.2234999998898,1065.4234999998869,1071.623499999884,1074.8268333332157,1077.823499999881,1084.0234999998781,1090.2234999998752,1096.4234999998723,1102.6234999998694,1108.8234999998665,1118.8934999998646,1125.0934999998617,1131.2934999998588,1137.4934999998559,1143.693499999853,1149.89349999985,1156.0934999998472,1161.4668333331779,1161.4668333331779,1163.0168333331771,853.4868333333197,859.6868333333168,865.8868333333139,872.086833333311,878.2868333333081,884.4868333333052,890.6868333333023,896.7834999999661,898.9534999999651,901.0201666666308,902.2601666666302,908.4601666666273,914.6601666666244,917.4501666666231,921.6868333332877,927.8868333332848,934.0868333332819,940.286833333279,943.2834999999443,943.2834999999443,945.7634999999431,951.9634999999402,958.1634999999372,964.3634999999343,969.323499999932,975.0068333332626,979.2434999999274,985.4434999999245,989.4734999999225,989.4734999999225,994.7434999999201,1000.9434999999172,1007.1434999999143,1011.7934999999121,1015.8234999999102,1022.0234999999072,1028.2234999999043]
- run.curseSince: 12175
- run.killer: "enemy:crumb-ant"
- run.goldEarned: 409.828
- run.bossChests: 5
- run.bossesKilled: 2
- run.elitesKilled: 10
- run.peakEnemies: 154
- run.grokBotHelps: 6
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 922
- counters.hits: 1226
- counters.gems: 258
- counters.coins: 35
- counters.shots: 517
- counters.hostileShots: 10
- counters.nearMisses: 1
- Gold, spots and chests: gold held at the end 409, spent 0; spots charged and used: Crop Patch 1, Tater Lantern 1, Spud Freezer 1, Beetle Nest 1; chests seen 12, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Hash Hawk 84% over Hash Boomerang 11%, Stuffed Skin 5%; 0:25 took Hash Hawk 68% over Aged Russet 16%, Seeker Sprouts 16%; 0:51 took Hash Hawk 70% over Whisk Vortex 27%, Stuffed Skin 3%; 0:58 took Fertilizer 50% over Mash Snowball 45%, Spud Fence 5%; 0:59 took Seeker Sprouts 80% over Mash Finisher 19%, Spud Sneakers 1%; 1:33 took Bacon Bits 58% over Seeker Sprouts 35%, Hash Rush 7%; 1:36 took Hash Hawk 96% over Butter Streak 2%, Spud Dynamo 2%; 2:11 took Frying Pan 59% over Seeker Sprouts 39%, Fertilizer 2%; 2:49 took Lean Lunch 56% over Mash Mallet 21%, Reroll 16%, Sprout Satellites 7%; 3:22 took Bacon Bits 59% over Tater Twirl 36%, Reroll 4%, Slow Cooker 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Hash Hawk 3/8, Fertilizer 1/5 | 2:00 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Hash Hawk 7/8, Fertilizer 1/5, Bacon Bits 1/5 | 2:59 level 10, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 4/8, Hash Harrier 1/1, Frying Pan 1/8, Fertilizer 1/5, Bacon Bits 1/5, Lean Lunch 1/5 | 3:26 level 11, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 6/8, Hash Harrier 1/1, Frying Pan 1/8, Fertilizer 1/5, Bacon Bits 2/5, Lean Lunch 1/5.
- Passive levels first reached: Fertilizer 1 at 0:58; Bacon Bits 1 at 1:33; Lean Lunch 1 at 2:49.

### L6.I2.G3: no reset pick s43 a

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 43; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 133.6s (game clock 02:13); damage taken 120 (enemy:crumb-ant 6.763, enemy:aphid 12.054, enemy:bog-slime 5.618, enemy:sprout-mite 8.193); 338 kills; level 1 to 7; planner asked 45 times, action model 210; the models saw the game 32 ms late (p90 51); ended with seeker-sprouts 4, fry-lance 2, fertilizer 1.
- run.timeSec: 133.6
- run.level: 6
- run.kills: 338
- run.damageBySource: seeker-sprouts 3413.35, fry-lance 2476.313, grok-bot 446.905
- run.damageTakenBySource: enemy:crumb-ant 6.763, enemy:aphid 12.054, enemy:bog-slime 5.618, enemy:sprout-mite 8.193, enemy:potato-beetle 39.518, enemy:frost-flea 7.201, enemy:wireworm-larva 17.879, Brambles 3.5, enemy:garden-slug 3.768, boss:amusing 15.523
- run.killsBySource: seeker-sprouts 195, fry-lance 115, grok-bot 28
- run.biomes: ["frozen-tundra","chip-canyons","peel-forest","mash-swamp","ketchup-bog"]
- run.distance: 7567.105
- run.dodgePoints: 880.413
- run.dodgeSecond: 133
- run.dodgeTaken: [95.63456322481684,95.63456322481684,99.40272186819438,99.40272186819438,99.40272186819438,99.40272186819438,99.40272186819438,99.40272186819438,106.05525520152771,108.27276631263882,113.29136768113796,116.61763434780462,22.306106440469676,22.306106440469676,22.306106440469676,25.134864124467835,26.574794024020793,41.27545310094585,49.982378711154794,51.421798116446766,60.36142478311342,76.62024422091058,85.55987088757725,90.02968422091058,90.92968422091059,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,93.52968422091058,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684,95.63456322481684]
- run.dodgeSteps: [680.9205000000123,687.1205000000094,693.3205000000081,703.390500000009,709.5905000000115,715.790500000014,721.9905000000166,728.1905000000191,734.3905000000217,740.5905000000242,746.790500000024,752.9905000000266,382.147333333324,387.5206666666572,393.720666666657,399.9206666666568,405.5006666666567,405.60399999999,407.46399999998994,413.66399999998913,419.8639999999903,426.0639999999905,432.2639999999889,442.33399999998676,448.53399999998385,454.73399999998094,460.933999999978,467.1339999999758,473.3339999999729,479.5339999999734,485.7339999999729,491.93399999997547,498.133999999978,504.33399999998056,510.5339999999831,516.7339999999855,522.9339999999826,533.0039999999799,539.2039999999788,545.4039999999766,551.6039999999791,557.8039999999817,564.0039999999842,570.2039999999868,576.4039999999893,582.6039999999919,588.8039999999934,594.1204999999957,600.3204999999982,606.5205000000008,612.7205000000033,618.9205000000059,625.1205000000068,631.3205000000094,637.5205000000119,643.7205000000145,649.920500000017,656.1205000000195,662.3205000000195,668.5205000000166,674.7205000000151]
- run.curseSince: 4672
- run.killer: "enemy:aphid"
- run.goldEarned: 7.98
- run.elitesKilled: 2
- run.peakEnemies: 99
- run.shrinesUsed: 1
- run.grokBotHelps: 4
- run.botSwarms: 1
- counters.kills: 338
- counters.hits: 431
- counters.crits: 16
- counters.gems: 157
- counters.coins: 7
- counters.shots: 390
- counters.hostileShots: 70
- counters.nearMisses: 6
- counters.hostileHits: 3
- shrineTotals.critChance: 0.068
- Gold, spots and chests: gold held at the end 7, spent 0; spots charged and used: Tater Lantern 1; chests seen 2, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Fry Lance 43% over Mash Wave 30%, Bacon Bits 27%; 0:24 took Seeker Sprouts 90% over Hot Sauce 7%, Clean Plate 3%; 0:45 took Fry Lance 71% over Sprout Squad 24%, Grab Bag 5%; 0:59 took Seeker Sprouts 76% over Spud Sneakers 16%, Fertilizer 8%; 1:02 took Seeker Sprouts 44% over Fry Lance 35%, Mash Snowball 21%; 1:04 took Crit 69% over Max HP 25%, Luck 6%; 1:17 took Fertilizer 49% over Sprouting Eyes 41%, Reroll 7%, Slow Cooker 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Fry Lance 2/8 | 1:57 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 4/8, Fry Lance 2/8, Fertilizer 1/5 | 2:13 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 4/8, Fry Lance 2/8, Fertilizer 1/5.
- Passive levels first reached: Fertilizer 1 at 1:17.

### L6.I2.G4: no reset pick s43 b

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 43; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 131.1s (game clock 02:11); damage taken 126 (enemy:aphid 3.882, enemy:potato-beetle 5.235, enemy:sprout-mite 7.32, enemy:snow-mold 5.102); 327 kills; level 1 to 7; planner asked 44 times, action model 244; the models saw the game 30 ms late (p90 54); ended with seeker-sprouts 2, spud-lob 1, frying-pan 2, mash-finisher 2.
- run.timeSec: 131.05
- run.level: 6
- run.kills: 327
- run.damageBySource: seeker-sprouts 2921.742, grok-bot 81.552, dog:greyhound 689.764, spud-lob 1357.524, frying-pan 1295.387
- run.damageTakenBySource: enemy:aphid 3.882, enemy:potato-beetle 5.235, enemy:sprout-mite 7.32, enemy:snow-mold 5.102, enemy:crumb-ant 4.295, Hot oil 11.5, enemy:oil-drip 9.651, enemy:fry-fly 2.462, enemy:sand-crab 5.215, enemy:frost-flea 1.597, boss:amusing 69.852
- run.killsBySource: seeker-sprouts 177, grok-bot 6, dog:greyhound 47, spud-lob 61, frying-pan 36
- run.biomes: ["frozen-tundra","fry-oil-desert","chip-canyons","compost-caves"]
- run.dogs: [{"id":"greyhound","at":33.53333333333333}]
- run.dogHelp: damage.greyhound 689.764, hits.greyhound 50
- run.distance: 8063.098
- run.dodgePoints: 1067.649
- run.dodgeSecond: 131
- run.dodgeTaken: [54.66131363505349,59.584381820757656,79.54198182075766,79.54198182075766,79.54198182075766,79.54198182075766,79.54198182075766,79.54198182075766,86.19451515409098,112.8046484874243,18.182696304008754,18.182696304008754,18.182696304008754,18.182696304008754,18.182696304008754,18.349362970675422,18.349362970675422,23.632488105178297,30.22100632602739,30.22100632602739,30.22100632602739,32.682930525609855,36.849597192276526,39.34959719227652,39.34959719227652,39.34959719227652,39.34959719227652,39.34959719227652,39.34959719227652,39.34959719227652,39.34959719227652,39.34959719227652,39.34959719227652,39.34959719227652,39.34959719227652,39.34959719227652,39.34959719227652,44.72476066324277,44.72476066324277,44.72476066324277,44.72476066324277,44.72476066324277,44.72476066324277,51.49922328006376,51.49922328006376,51.49922328006376,51.49922328006376,54.66131363505349,54.66131363505349,54.66131363505349,54.66131363505349,54.66131363505349,54.66131363505349,54.66131363505349,54.66131363505349,54.66131363505349,54.66131363505349,54.66131363505349,54.66131363505349,54.66131363505349,54.66131363505349]
- run.dodgeSteps: [754.215740000065,760.787740000067,767.3597400000689,772.3982733334037,778.9702733334057,785.3779733334077,790.2412533334106,796.8132533334125,801.4793733334149,806.0797733334178,426.63439999997956,433.2063999999815,439.77839999998344,446.35039999998537,452.9223999999873,459.49439999998924,466.0663999999912,472.6383999999931,479.21039999999505,485.782399999997,492.3543999999989,498.92640000000085,505.4984000000028,512.0704000000047,518.6424000000067,525.2144000000086,531.7864000000105,538.3584000000125,544.9304000000144,551.5024000000163,558.0744000000183,563.1348400000168,567.7352400000143,572.368500000012,578.9405000000139,585.5125000000158,592.0845000000178,598.6565000000197,604.702740000021,611.2747400000229,617.8467400000249,624.4187400000268,630.9907400000287,635.9197400000302,642.4917400000321,649.063740000034,655.635740000036,662.2077400000379,668.7797400000399,675.3517400000418,681.9237400000437,688.4957400000457,695.0677400000476,701.6397400000495,708.2117400000515,714.7837400000534,721.3557400000553,727.9277400000573,734.4997400000592,741.0717400000611,747.6437400000631]
- run.curseSince: 2550
- run.killer: "boss:amusing"
- run.goldEarned: 18.848
- run.elitesKilled: 2
- run.peakEnemies: 99
- run.grokBotHelps: 3
- counters.kills: 327
- counters.hits: 454
- counters.gems: 119
- counters.coins: 17
- counters.shots: 358
- counters.hostileShots: 60
- counters.nearMisses: 1
- counters.hostileHits: 1
- Gold, spots and chests: gold held at the end 18, spent 0; spots charged and used: Tater Lantern 1, Stray Dog 1; chests seen 2, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Seeker Sprouts 75% over Peel Out 24%, Tater Trot 1%; 0:32 took Mash Finisher 55% over Chip Shuriken 30%, Hash Boomerang 15%; 0:42 took Mash Finisher 62% over Fry Knives 24%, Tater Mines 14%; 1:08 took Spud Lob 59% over Sprouting Eyes 41%, Spud Sneakers 0%; 1:35 took Frying Pan 78% over Tater Trot 14%, Reroll 8%, Rotten Spud 0%; 1:49 took Frying Pan 74% over Sour Cream 18%, Reroll 6%, Slow Cooker 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Mash Finisher 2/5 | 1:57 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Spud Lob 1/8, Frying Pan 2/8, Mash Finisher 2/5 | 2:10 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Spud Lob 1/8, Frying Pan 2/8, Mash Finisher 2/5.
- Passive levels first reached: Mash Finisher 1 at 0:32.

### L6.I2.G5: no reset pick s47 a

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 47; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 207.6s (game clock 03:27); damage taken 180 (Hot oil 25.967, enemy:tomato-leech 4.47, enemy:aphid 3.399, enemy:crumb-ant 1.598); 1182 kills; level 1 to 12; planner asked 70 times, action model 492; the models saw the game 32 ms late (p90 52); ended with seeker-sprouts 7, hot-streak 4, starch-puddle 1, seed-potato 1, thick-skin 1, fertilizer 1.
- run.timeSec: 207.6
- run.level: 11
- run.kills: 1182
- run.damageBySource: seeker-sprouts 13073.779, hot-streak 7887.163, starch-puddle 5204.325, seed-potato 4644.251, grok-bot 259.249
- run.damageTakenBySource: Hot oil 25.967, enemy:tomato-leech 4.47, enemy:aphid 3.399, enemy:crumb-ant 1.598, boss:amusing 72.069, enemy:frost-flea 1.636, enemy:bog-slime 2.435, enemy:garden-slug 8.533, boss:beetle-queen 13.599, enemy:sand-crab 13.701, enemy:potato-beetle 26.442, enemy:wireworm-larva 6.217
- run.killsBySource: seeker-sprouts 548, hot-streak 291, starch-puddle 191, seed-potato 147, grok-bot 5
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","peel-forest","gutterball-lanes","chip-canyons"]
- run.distance: 11479.048
- run.dodgePoints: 1427.889
- run.dodgeSecond: 207
- run.dodgeTaken: [115.44016107142131,118.16001107142131,118.16001107142131,118.16001107142131,118.16001107142131,118.16001107142131,132.67911453487847,143.19090263000925,143.19090263000925,143.19090263000925,143.19090263000925,143.19090263000925,143.19090263000925,145.91075263000926,145.91075263000926,152.12755263000926,169.18310966798327,175.39990966798328,175.39990966798328,175.39990966798328,175.39990966798328,175.39990966798328,175.39990966798328,175.39990966798328,175.39990966798328,102.68908846036086,102.68908846036086,102.68908846036086,102.68908846036086,102.68908846036086,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,104.47153316159543,111.11355309969636,115.44016107142131,115.44016107142131,115.44016107142131,115.44016107142131,115.44016107142131]
- run.dodgeSteps: [1007.061499999938,1011.814833333269,1018.0148333332661,1024.2148333332632,1028.864833333261,1035.064833333258,1041.2648333332552,1044.6748333332537,1048.4981666665851,1052.9414999999165,1059.1414999999135,1065.3414999999106,1071.5414999999077,1077.7414999999048,1083.941499999902,1090.141499999899,1096.341499999896,1102.5414999998932,1106.9848333332243,1113.1848333332214,1119.3848333332185,1125.5848333332156,1131.7848333332126,1137.9848333332097,1144.1848333332068,815.7500000000236,818.3746666666899,822.4615000000218,827.9381666666859,832.3815000000171,837.1348333333483,839.201500000014,845.4015000000111,851.6015000000082,857.8015000000053,864.0015000000024,867.3081666666674,873.5081666666645,875.8848333333301,877.7448333333292,882.9114999999935,889.1114999999905,895.3114999999876,898.9281666666526,905.1281666666497,910.708166666647,915.3581666666448,921.5581666666419,927.758166666639,933.9581666666361,940.1581666666332,944.7048333332978,950.9048333332948,957.1048333332919,963.304833333289,969.0914999999529,975.29149999995,985.3614999999481,991.5614999999452,994.6614999999438,1000.8614999999409]
- run.curseSince: 7849
- run.killer: "Hot oil"
- run.goldEarned: 181.503
- run.bossChests: 3
- run.bossesKilled: 1
- run.elitesKilled: 4
- run.peakEnemies: 174
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 1182
- counters.hits: 1998
- counters.gems: 491
- counters.coins: 40
- counters.shots: 645
- counters.hostileShots: 168
- counters.nearMisses: 18
- counters.hostileHits: 6
- Gold, spots and chests: gold held at the end 181, spent 0; spots charged and used: none; chests seen 5, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Hot Streak 58% over Mash Snowball 33%, Gravy Heart 9%; 0:21 took Starch Puddle 76% over Big Bowl 18%, Butter Socks 6%; 0:24 took Thick Skin 52% over Spud Cannon 36%, Tater Mines 12%; 0:25 took Seed Potato 56% over Thick Skin 36%, Bacon Bits 8%; 1:00 took Seeker Sprouts 64% over Starch Puddle 30%, Spry Sprout 6%; 1:33 took Hot Streak 78% over Seed Potato 21%, Spry Sprout 1%; 1:50 took Seeker Sprouts 39% over Thick Skin 32%, Seed Potato 19%, Reroll 10%; 2:10 took Fertilizer 56% over Mash Golem 33%, Reroll 6%, Hearty Helping 5%; 2:11 took Seeker Sprouts 46% over Thick Skin 26%, Aged Russet 23%, Reroll 5%; 2:57 took Hot Streak 49% over Mash Mortar 40%, Hash Rush 5%, Reroll 5%, Skip 1%; 3:27 took Hot Streak 71% over Fertilizer 16%, Gravy Splash 8%, Reroll 4%, Skip 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Hot Streak 1/8, Starch Puddle 1/8, Seed Potato 1/8, Thick Skin 1/5 | 1:59 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Hot Streak 2/8, Starch Puddle 1/8, Seed Potato 1/8, Thick Skin 1/5 | 3:00 level 11, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 7/8, Hot Streak 3/8, Starch Puddle 1/8, Seed Potato 1/8, Thick Skin 1/5, Fertilizer 1/5 | 3:27 level 12, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 7/8, Hot Streak 4/8, Starch Puddle 1/8, Seed Potato 1/8, Thick Skin 1/5, Fertilizer 1/5.
- Passive levels first reached: Thick Skin 1 at 0:24; Fertilizer 1 at 2:10.

### L6.I2.G6: no reset pick s47 b

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 47; 240s; plays the playbook with its own planner.pick.
- Outcome: alive after 240.1s (game clock 04:00), health 54/120; damage taken 126 (Hot oil 16, enemy:garden-slug 5.215, Brambles 0.7, boss:amusing 3.326); 1958 kills; level 1 to 15; planner asked 93 times, action model 447; the models saw the game 35 ms late (p90 61); ended with overgrowth 1, hot-streak 2, fry-sentry 2, thick-skin 4, fertilizer 1.
- run.timeSec: 240.133
- run.level: 14
- run.kills: 1958
- run.damageBySource: seeker-sprouts 8344.266, hot-streak 9943.122, fry-sentry 4292.333, grok-bot 1256.23, overgrowth 41722.91
- run.damageTakenBySource: Hot oil 16, enemy:garden-slug 5.215, Brambles 0.7, boss:amusing 3.326, enemy:sprout-mite 1.691, enemy:crumb-ant 5.693, enemy:sand-crab 68.186, enemy:ketchup-drop 2.428, enemy:lint-bunny 1.791, boss:beetle-queen 16.319, enemy:beetle-brood 4.578
- run.killsBySource: seeker-sprouts 398, hot-streak 388, fry-sentry 93, grok-bot 33, overgrowth 1046
- run.evolutions: [{"id":"overgrowth","at":188.03333333333333}]
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","peel-forest","compost-caves","coin-laundromat"]
- run.distance: 13477.095
- run.dodgePoints: 1760.321
- run.dodgeSecond: 240
- run.dodgeTaken: [101.11150136094204,101.11150136094204,101.11150136094204,101.11150136094204,114.75519366200524,114.75519366200524,119.28827699533856,123.95927067337918,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,125.92692457588247,101.11150136094204,101.11150136094204,101.11150136094204]
- run.dodgeSteps: [1005.4694999998895,1011.6694999998866,1015.802833333218,1019.8328333332162,1021.4861666665487,1026.0328333332131,1032.2328333332102,1038.4328333332073,1043.0828333332051,1049.2828333332022,1055.4828333331993,1061.6828333331964,1067.8828333331935,1074.0828333331906,1080.2828333331877,1086.4828333331848,1092.6828333331819,1098.882833333179,1105.082833333176,1111.2828333331731,1117.4828333331702,1123.6828333331673,1129.8828333331644,1136.0828333331615,1142.2828333331586,1148.4828333331557,1154.6828333331528,1160.8828333331498,1167.082833333147,1173.282833333144,1179.4828333331411,1185.6828333331382,1191.8828333331353,1198.0828333331324,1204.2828333331295,1210.4828333331266,1216.6828333331237,1222.8828333331207,1229.0828333331178,1235.282833333115,1241.482833333112,1247.682833333109,1253.8828333331062,1260.0828333331033,1266.2828333331004,1272.4828333330975,1278.6828333330945,1284.8828333330916,1291.0828333330887,1297.2828333330858,1303.482833333083,1309.68283333308,1315.882833333077,1322.0828333330742,1328.2828333330713,1334.4828333330684,1340.6828333330654,1346.8828333330625,991.2094999998963,997.2028333332267,999.2694999998924]
- run.curseSince: 11905
- run.goldEarned: 343.108
- run.goldSpent: 94
- run.bossChests: 3
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 146
- run.shrinesUsed: 1
- run.itemsBought: 1
- run.grokBotHelps: 6
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1958
- counters.hits: 2737
- counters.gems: 1162
- counters.coins: 93
- counters.shots: 777
- counters.hostileShots: 146
- counters.nearMisses: 8
- counters.hostileHits: 4
- shrineTotals.area: 0.06
- Gold, spots and chests: gold held at the end 249, spent 94 (Fry Cart 94); spots charged and used: Tater Lantern 2, Spud Freezer 1, Crop Patch 1; chests seen 8, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Hot Streak 56% over Mash Snowball 34%, Gravy Heart 10%; 0:17 took Seeker Sprouts 90% over Mash Finisher 6%, Butter Socks 4%; 0:24 took Seeker Sprouts 66% over Mash Landing 23%, Sprouting Eyes 11%; 1:00 took Seeker Sprouts 78% over Aged Russet 13%, Hot Start 9%; 1:01 took Thick Skin 59% over Fertilizer 37%, Spud Sneakers 4%; 1:23 took Area 50% over XP gain 46%, Gold gain 4%; 1:35 took Thick Skin 61% over Fertilizer 30%, Butter Socks 7%, Skip 2%; 1:44 took Fry Cook Sentry 53% over Fertilizer 39%, Big Bowl 7%, Skip 1%; 2:11 took Seeker Sprouts 79% over Fertilizer 14%, Fry Cook Sentry 6%, Skip 1%; 2:27 took Fertilizer 63% over Mash Wave 32%, Butter Socks 4%, Skip 1%; 2:44 took Seeker Sprouts 83% over Thick Skin 12%, Fry Cook Sentry 4%, Skip 1%; 2:50 took option 0 42% over option 1 36%, Leave 21%, option 2 1%; 3:03 took Hot Streak 79% over Fertilizer 19%, Root Network 2%, Skip 0%; 3:05 took Fry Cook Sentry 62% over Peeler 28%, Four-Eyed Spud 8%, Skip 2%; 3:17 took Thick Skin 45% over Fry Cook Sentry 31%, Chives 23%, Skip 1%; 3:18 took Thick Skin 49% over Spud Dynamo 27%, Seed Potato 23%, Skip 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:57 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Hot Streak 1/8 | 1:59 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 4/8, Hot Streak 1/8, Fry Cook Sentry 1/8, Thick Skin 2/5 | 3:00 level 11, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 7/8, Hot Streak 1/8, Fry Cook Sentry 1/8, Thick Skin 2/5, Fertilizer 1/5 | 3:59 level 15, maxHp 120, armor 0, damageMult 1, recovery 0, Overgrowth 1/1, Hot Streak 2/8, Fry Cook Sentry 2/8, Thick Skin 4/5, Fertilizer 1/5.
- Passive levels first reached: Thick Skin 1 at 1:01, 3 at 3:17; Fertilizer 1 at 2:27.

### L6.I2.G7: no reset pick s41

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 41; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 157.8s (game clock 02:37); damage taken 140 (enemy:little-grey 18.619, enemy:aphid 47.106, enemy:oil-drip 6.219, enemy:crumb-ant 6.372); 487 kills; level 1 to 9; planner asked 55 times, action model 250; the models saw the game 31 ms late (p90 56); ended with seeker-sprouts 3, spud-lob 6, butter-pat 2.
- run.timeSec: 157.817
- run.level: 8
- run.kills: 487
- run.damageBySource: seeker-sprouts 3953.313, spud-lob 5826.806, grok-bot 98.079
- run.damageTakenBySource: enemy:little-grey 18.619, enemy:aphid 47.106, enemy:oil-drip 6.219, enemy:crumb-ant 6.372, enemy:spittlebug 8.271, enemy:cave-grub 17.879, enemy:ketchup-drop 2.088, enemy:swarm-fly 5.544, boss:amusing 8.87, enemy:frost-flea 3.467, Spore vent 1.733, enemy:fry-fly 2.815, enemy:field-rat 10.774
- run.killsBySource: seeker-sprouts 221, spud-lob 260, grok-bot 6
- run.biomes: ["chip-canyons","ketchup-bog","mash-swamp","frozen-tundra","crop-circle","fry-oil-desert","compost-caves"]
- run.distance: 9123
- run.dodgePoints: 1112.595
- run.dodgeSecond: 157
- run.dodgeTaken: [101.04599118888063,105.99545479917167,108.76734368806055,110.42095347382305,110.42095347382305,110.42095347382305,110.42095347382305,115.42383517835843,117.64134628946954,117.64134628946954,117.64134628946954,117.64134628946954,117.64134628946954,117.64134628946954,117.64134628946954,117.64134628946954,117.64134628946954,117.64134628946954,117.64134628946954,122.84133513906419,125.6568244318119,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,128.98309109847858,16.859618522044514,26.10611039024542,26.10611039024542,27.637840317968212,29.19076232172199,30.732634567555326,30.732634567555326,30.732634567555326,30.732634567555326,30.732634567555326,32.31218842990083,32.31218842990083,32.31218842990083,33.89718740731281,33.89718740731281,33.89718740731281,45.9390734554285,68.02969387901732,74.28822817966132,82.28432624982669,87.59558923421373,87.59558923421373,89.21366556487227,96.17238663681991,99.41777429901174]
- run.dodgeSteps: [677.0503333332659,683.250333333263,689.4503333332601,695.6503333332573,705.7203333332588,710.7836666665911,714.2969999999259,720.4969999999269,726.696999999924,732.896999999921,741.2469999999182,749.1669999999154,755.3669999999161,761.5669999999158,767.7669999999129,772.4479999999124,781.3399999999117,787.5399999999088,793.7399999999071,799.9399999999081,806.1399999999057,810.4799999999059,820.5499999999065,826.7499999999036,832.9499999999007,839.1499999998978,847.5666666665633,853.7666666665604,859.9666666665574,866.1666666665545,872.3666666665516,878.5666666665487,884.7666666665458,890.9666666665429,897.16666666654,905.5166666665376,528.3536666666289,534.553666666626,540.7536666666259,546.953666666623,553.1536666666201,559.3536666666172,565.5536666666175,571.7536666666158,577.9536666666141,584.1536666666135,590.3536666666156,596.5536666666144,602.7536666666156,608.9536666666156,615.1536666666136,621.3536666666143,624.5569999999476,627.4503333332821,633.650333333281,639.8503333332795,646.050333333277,652.2503333332754,658.4503333332732,664.6503333332718,670.8503333332688]
- run.curseSince: 5886
- run.killer: "enemy:field-rat"
- run.goldEarned: 114.982
- run.bossChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 118
- run.grokBotHelps: 4
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 487
- counters.hits: 603
- counters.gems: 203
- counters.coins: 62
- counters.shots: 492
- counters.hostileShots: 242
- counters.nearMisses: 16
- counters.hostileHits: 7
- Gold, spots and chests: gold held at the end 114, spent 0; spots charged and used: Crop Patch 3, Tater Lantern 1; chests seen 3, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Spud Lob 42% over Hash Rush 31%, Hot Potato 27%; 0:25 took Seeker Sprouts 77% over Mash Finisher 20%, Bacon Bits 3%; 0:36 took Spud Lob 71% over Peel Phantom 24%, Hot Sauce 5%; 0:43 took Spud Lob 66% over Seeker Sprouts 23%, Leave 11%; 0:57 took Spud Lob 57% over Tailgate Fries 29%, Seeker Sprouts 14%; 1:32 took Butter Pat 75% over Hot Streak 24%, Salt Line 1%; 1:38 took Butter Pat 51% over Locked Gatling 48%, Hearty Helping 1%; 1:52 took Spud Lob 86% over Seeker Sprouts 7%, Mash Wave 7%; 2:04 took Seeker Sprouts 52% over Potato Battery 30%, Butter Socks 13%, Reroll 5%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:57 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Spud Lob 4/8 | 1:59 level 8, maxHp 120, armor 0, damageMult 1.44, recovery 0, Seeker Sprouts 2/8, Spud Lob 6/8, Butter Pat 2/5 | 2:37 level 9, maxHp 120, armor 0, damageMult 1.44, recovery 0, Seeker Sprouts 3/8, Spud Lob 6/8, Butter Pat 2/5.
- Passive levels first reached: Butter Pat 1 at 1:32.

### L6.I2.G8: no reset pick s48

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 48; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 98.4s (game clock 01:38); damage taken 127 (enemy:aphid 2.55, enemy:fry-fly 99.687, enemy:crumb-ant 6.983, enemy:sprout-mite 1.31); 265 kills; level 1 to 8; planner asked 34 times, action model 202; the models saw the game 32 ms late (p90 56); ended with seeker-sprouts 5, frying-pan 2, lean-lunch 3, fertilizer 1.
- run.timeSec: 98.35
- run.level: 7
- run.kills: 265
- run.damageBySource: seeker-sprouts 3324.992, frying-pan 1497.96, grok-bot 887.729, mash-bomb 111.977
- run.damageTakenBySource: enemy:aphid 2.55, enemy:fry-fly 99.687, enemy:crumb-ant 6.983, enemy:sprout-mite 1.31, enemy:tomato-leech 2.768, enemy:ketchup-drop 1.86, Hot oil 7.467, enemy:oil-drip 4.098
- run.killsBySource: seeker-sprouts 197, frying-pan 37, grok-bot 23, mash-bomb 8
- run.biomes: ["fry-oil-desert","ketchup-bog"]
- run.distance: 5770.033
- run.dodgePoints: 652.051
- run.dodgeSecond: 98
- run.dodgeTaken: [5.554830163185783,19.39887481448855,33.30594576049883,42.10810595705932,55.99081027792783,63.431222662112184,70.87163504629655,78.3120474304809,89.47266600675744,95.05287867683327,98.77308486892545,106.22277375781434,113.67246264670322,113.67246264670322,113.67246264670322,113.67246264670322,113.67246264670322,113.67246264670322,113.67246264670322,113.67246264670322,113.67246264670322,113.67246264670322,113.67246264670322,113.67246264670322,113.67246264670322,113.67246264670322,115.15820345106974,115.15820345106974,115.15820345106974,119.15820345106974,122.62487011773642,122.62487011773642,122.62487011773642,122.62487011773642,122.62487011773642,122.62487011773642,122.62487011773642,124.67378739182669,1.188452635366339,1.188452635366339,1.188452635366339,1.188452635366339,1.188452635366339,1.188452635366339,1.188452635366339,1.188452635366339,1.188452635366339,1.188452635366339,1.188452635366339,5.554830163185783,5.554830163185783,5.554830163185783,5.554830163185783,5.554830163185783,5.554830163185783,5.554830163185783,5.554830163185783,5.554830163185783,5.554830163185783,5.554830163185783,5.554830163185783]
- run.dodgeSteps: [352.3666666666585,358.5666666666583,364.7666666666581,370.96666666665794,375.4099999999911,381.6099999999909,387.80999999999074,394.00999999999055,400.2099999999904,406.4099999999902,407.13333333332355,408.99333333332345,415.19333333332577,421.3933333333237,427.5933333333208,433.7933333333179,439.9933333333168,446.1933333333166,452.39333333331706,456.8366666666522,461.6933333333209,467.8933333333234,474.093333333326,480.2933333333285,486.49333333333107,494.4133333333333,502.7633333333355,508.963333333338,515.1633333333406,521.3633333333431,527.5633333333457,533.7633333333482,539.9633333333486,546.1633333333511,552.3633333333537,558.5633333333562,564.7633333333588,574.8333333333607,230.63999999999538,233.4299999999953,233.4299999999953,239.11333333332846,245.31333333332827,251.5133333333281,257.7133333333279,263.9133333333277,270.11333333332755,276.31333333332736,282.5133333333272,288.713333333327,294.9133333333268,301.11333333332664,307.31333333332645,313.5133333333263,319.7133333333261,325.9133333333259,332.1133333333257,338.31333333332555,344.51333333332536,348.8533333333252,349.5766666666585]
- run.curseSince: 5857
- run.killer: "enemy:oil-drip"
- run.goldEarned: 129.315
- run.bossChests: 3
- run.elitesKilled: 4
- run.peakEnemies: 57
- run.grokBotHelps: 2
- run.botSwarms: 1
- counters.kills: 265
- counters.hits: 363
- counters.gems: 105
- counters.coins: 12
- counters.shots: 332
- Gold, spots and chests: gold held at the end 129, spent 0; spots charged and used: Crop Patch 1, Beetle Nest 1; chests seen 4, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Lean Lunch 53% over Tater Mines 45%, Starch Plating 2%; 0:25 took Seeker Sprouts 70% over Aged Russet 21%, Fry Knives 9%; 0:49 took Frying Pan 75% over Mash Finisher 17%, Salt Shaker 8%; 1:04 took Frying Pan 81% over Four-Eyed Spud 11%, Thick Skin 8%; 1:08 took Lean Lunch 51% over Seeker Sprouts 46%, Big Bowl 3%; 1:12 took Lean Lunch 59% over Fertilizer 31%, Big Bowl 5%, Reroll 5%; 1:37 took Fertilizer 65% over Hot Start 15%, Hearty Helping 12%, Reroll 8%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Frying Pan 1/8, Lean Lunch 1/5 | 1:38 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Frying Pan 2/8, Lean Lunch 3/5, Fertilizer 1/5.
- Passive levels first reached: Lean Lunch 1 at 0:09, 3 at 1:12; Fertilizer 1 at 1:37.

### L6.I2.G9: no reset pick s49

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 49; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 196.8s (game clock 03:16); damage taken 151 (Hot oil 51.6, enemy:sand-crab 10.843, enemy:oil-drip 1.714, enemy:crumb-ant 2.895); 914 kills; level 1 to 10; planner asked 66 times, action model 383; the models saw the game 43 ms late (p90 190); ended with seeker-sprouts 6, gem-sling 1, spud-cannon 1, locked-gatling 1, lean-lunch 1, butter-pat 2.
- run.timeSec: 196.767
- run.level: 9
- run.kills: 914
- run.damageBySource: seeker-sprouts 8778.873, gem-sling 1777.699, spud-cannon 4691.872, locked-gatling 7003.549
- run.damageTakenBySource: Hot oil 51.6, enemy:sand-crab 10.843, enemy:oil-drip 1.714, enemy:crumb-ant 2.895, enemy:potato-beetle 16.248, enemy:sprout-mite 5.66, enemy:aphid 4.389, enemy:fry-fly 47.173, boss:amusing 2.218, enemy:tomato-leech 7.934
- run.killsBySource: seeker-sprouts 421, gem-sling 69, spud-cannon 180, locked-gatling 244
- run.biomes: ["fry-oil-desert","chip-canyons","mash-swamp","ketchup-bog"]
- run.distance: 11133.813
- run.dodgePoints: 1427.622
- run.dodgeSecond: 196
- run.dodgeTaken: [103.74399531542177,103.74399531542177,114.1053286487551,124.46666198208844,129.64732864875512,136.17556293515267,136.17556293515267,136.17556293515267,136.17556293515267,136.17556293515267,142.73883104053903,142.73883104053903,146.70582339709384,146.70582339709384,78.95094754884357,78.95094754884357,78.95094754884357,86.61761421551016,91.45094754884343,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,91.6176142155101,95.35094754884342,98.95094754884339,100.55094754884341,100.55094754884341,100.55094754884341,100.55094754884341,100.55094754884341,103.74399531542177,103.74399531542177,103.74399531542177,103.74399531542177,103.74399531542177]
- run.dodgeSteps: [1021.6313333333022,1027.8313333332994,1034.0313333332965,1040.2313333332936,1050.3013333332915,1056.5013333332886,1062.7013333332857,1068.9013333332828,1075.1013333332799,1081.301333333277,1087.501333333274,1097.5713333332722,1103.7713333332692,1109.9713333332663,757.8366666667205,764.0366666667176,770.2366666667161,776.4366666667145,782.6366666667169,788.8366666667195,795.036666666722,801.2366666667245,807.4366666667271,808.8833333333944,810.1233333333948,816.0133333333935,821.9343333333933,825.8713333333914,832.7380000000576,838.9380000000547,845.1380000000518,845.1380000000518,849.4780000000497,855.6780000000468,861.8780000000439,864.8746666667091,871.0746666667062,877.2746666667033,883.4746666667004,889.6746666666975,895.8746666666946,902.0746666666917,908.2746666666887,914.4746666666858,920.6746666666829,926.87466666668,933.0746666666771,939.2746666666742,945.4746666666713,951.6746666666684,957.8746666666655,964.0746666666626,970.2746666666596,976.4746666666567,982.6746666666538,988.8746666666509,995.074666666648,998.7946666666463,1003.754666666644,1009.231333333308,1015.4313333333051]
- run.curseSince: 5445
- run.killer: "enemy:tomato-leech"
- run.goldEarned: 177.553
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 6
- run.peakEnemies: 175
- run.shrinesUsed: 1
- run.grokBotHelps: 2
- run.lootRunnersMet: [1]
- counters.kills: 914
- counters.hits: 1736
- counters.gems: 379
- counters.coins: 39
- counters.shots: 2411
- counters.hostileShots: 120
- counters.hostileHits: 1
- shrineTotals.might: 0.072
- Gold, spots and chests: gold held at the end 177, spent 0; spots charged and used: Tater Magnet 1, Crop Patch 1; chests seen 7, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Gem Sling 61% over Spud Decoy 23%, Starch Plating 16%; 0:19 took Spud Cannon 67% over Aged Russet 29%, Slow Cooker 4%; 0:21 took Lean Lunch 47% over Seeker Sprouts 32%, Potato Rain 21%; 0:26 took Butter Pat 89% over Chives 10%, Butter Socks 1%; 0:43 took Butter Pat 89% over Sprout Squad 6%, Mash Wave 3%, Reroll 2%; 0:58 took Seeker Sprouts 73% over Gem Sling 12%, Thick Skin 9%, Reroll 6%; 1:29 took Seeker Sprouts 78% over Broadside 15%, Fertilizer 5%, Reroll 2%; 1:30 took Damage 73% over Pickup range 17%, Armor 10%; 1:34 took Locked Gatling 61% over Gem Sling 24%, Fertilizer 12%, Reroll 2%, Skip 1%; 2:09 took Seeker Sprouts 84% over Fertilizer 7%, Chives 6%, Reroll 3%, Skip 0%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 7, maxHp 120, armor 0, damageMult 1.44, recovery 0, Seeker Sprouts 3/8, Gem Sling 1/8, Spud Cannon 1/8, Lean Lunch 1/5, Butter Pat 2/5 | 1:59 level 9, maxHp 120, armor 0, damageMult 1.544, recovery 0, Seeker Sprouts 5/8, Gem Sling 1/8, Spud Cannon 1/8, Locked Gatling 1/8, Lean Lunch 1/5, Butter Pat 2/5 | 2:59 level 10, maxHp 120, armor 0, damageMult 1.544, recovery 0, Seeker Sprouts 6/8, Gem Sling 1/8, Spud Cannon 1/8, Locked Gatling 1/8, Lean Lunch 1/5, Butter Pat 2/5 | 3:16 level 10, maxHp 120, armor 0, damageMult 1.544, recovery 0, Seeker Sprouts 6/8, Gem Sling 1/8, Spud Cannon 1/8, Locked Gatling 1/8, Lean Lunch 1/5, Butter Pat 2/5.
- Passive levels first reached: Lean Lunch 1 at 0:21; Butter Pat 1 at 0:26.

### L6.I2.G10: no reset pick s50

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 50; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 124.7s (game clock 02:04); damage taken 131 (Hot oil 40.533, enemy:bog-slime 7.29, enemy:tomato-leech 8.507, enemy:ketchup-drop 10.819); 229 kills; level 1 to 7; planner asked 41 times, action model 192; the models saw the game 32 ms late (p90 61); ended with seeker-sprouts 3, deep-fryer 1, chives 4.
- run.timeSec: 124.733
- run.level: 6
- run.kills: 229
- run.damageBySource: seeker-sprouts 3225.914, deep-fryer 705.796
- run.damageTakenBySource: Hot oil 40.533, enemy:bog-slime 7.29, enemy:tomato-leech 8.507, enemy:ketchup-drop 10.819, Brambles 11.8, boss:amusing 46.568, enemy:swarm-fly 5.544
- run.killsBySource: seeker-sprouts 193, deep-fryer 36
- run.biomes: ["ketchup-bog","mash-swamp","peel-forest"]
- run.distance: 7019.072
- run.dodgePoints: 844.443
- run.dodgeSecond: 124
- run.dodgeTaken: [78.04859775171677,78.94859775171676,101.67808664060566,42.210641851266374,42.210641851266374,42.210641851266374,42.210641851266374,42.210641851266374,42.210641851266374,42.210641851266374,42.210641851266374,42.210641851266374,42.210641851266374,42.210641851266374,42.210641851266374,42.210641851266374,42.210641851266374,46.7503172787399,50.2783862345239,55.6234413788228,60.43698881336418,60.43698881336418,64.18254923579488,64.18254923579488,64.18254923579488,64.18254923579488,64.18254923579488,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,67.14859775171679,69.44859775171679,70.64859775171679,70.64859775171679,70.64859775171679,71.94859775171679,71.94859775171679,74.04859775171678]
- run.dodgeSteps: [688.0604999999862,691.1604999999847,697.3604999999818,357.90533333332166,361.3153333333206,366.16683333332,372.36683333331985,378.56683333331966,384.7668333333195,390.9668333333193,397.1668333333191,402.71583333331876,406.1258333333177,409.53583333331665,412.9458333333182,418.6808333333206,424.8808333333225,431.08083333332416,437.2808333333267,443.48083333332795,449.68083333332834,455.8808333333257,462.08083333332615,468.28083333332324,474.4808333333249,480.6808333333274,481.81749999999454,483.98749999999546,490.187499999998,496.38749999999874,502.5874999999998,507.65083333333524,513.2308333333375,519.4308333333383,525.6308333333379,531.8308333333405,538.030833333343,544.2308333333407,550.4308333333394,556.6308333333393,562.8308333333418,569.0308333333444,575.2308333333469,581.4308333333495,587.630833333352,593.8308333333546,600.030833333356,606.2308333333536,612.4308333333507,618.6308333333478,622.319833333349,627.403833333348,633.603833333345,639.8038333333421,646.0038333333392,652.2038333333363,658.4038333333334,664.6038333333305,670.8038333333276,677.0038333333247,683.2038333333218]
- run.curseSince: 5621
- run.killer: "boss:amusing"
- run.goldEarned: 26.775
- run.peakEnemies: 99
- run.grokBotHelps: 3
- counters.kills: 229
- counters.hits: 435
- counters.gems: 109
- counters.coins: 24
- counters.shots: 304
- counters.hostileShots: 10
- counters.nearMisses: 4
- Gold, spots and chests: gold held at the end 26, spent 0; spots charged and used: Spud Freezer 1; chests seen 0, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:16 took Chives 53% over Fry Knives 28%, Root Cellar 19%; 0:25 took Seeker Sprouts 73% over Locked Gatling 26%, Afterburner Fries 1%; 0:26 took Chives 61% over Hot Streak 33%, Spud Dice 6%; 0:56 took Chives 58% over Frozen Fries 24%, Sprouting Eyes 18%; 1:23 took Deep Fryer 78% over Tater Trot 15%, Spud Sneakers 7%; 1:27 took Seeker Sprouts 65% over Deep Fryer 25%, Leave 10%; 1:33 took Chives 64% over Deep Fryer 32%, Hearty Helping 4%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Chives 3/5 | 2:00 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Deep Fryer 1/8, Chives 4/5 | 2:04 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Deep Fryer 1/8, Chives 4/5.
- Passive levels first reached: Chives 1 at 0:16, 3 at 0:56.
