# Does a lower dash threshold cut amusing and queen boss damage from 0:00?

| Field | Value |
| --- | --- |
| Status | done |
| Area | bosses |
| Result | inconclusive |
| Created | L4.I2 |
| Updated | L4.I3 |

## Hypothesis

At dashThreshold 0.5 the dash fires only below about 35% health, after the 2:00 amusing boss (73-106 damage in about 6 s on thin builds) and the 3:00 Mother of Beetles have done their damage. dashThreshold 0.3 with bossDashThreshold 0.3 and bossDashRange 250 dashes earlier near bosses, which cuts boss damage and raises survival to 4:00.

## Method

Seeker-sprouts with the playbook knobs plus dashThreshold 0.3, bossDashThreshold 0.3 and bossDashRange 250, 240 s from 0:00 on seeds 31-35, paired with the playbook games on file (5:00, 5:00, 3:05, 5:00, 2:39). Read amusing and queen damage, dash count and health at each dash, health lost in the 2:00 and 3:00 minutes, and survival to 4:00. Seeds 36-40 with new baselines follow next iteration to reach 8-10 pairs. This also covers the open opening-dash question.

## Findings

dashThreshold 0.3 with boss dash 0.3 and range 250 on seeker-sprouts s31-35, 240 s: alive at 4:00 on 2 of 5 against 3 of 5 for the playbook (paired 2 wins, 1 tie, 2 losses). It dashed 0-18 times per game and cut the amusing boss to 13-45 damage, but s32 (0 chests, Tomato Leech 80) and s35 (0 chests) still died, and s31 died to the 3:00 queen with 1 chest. Some dashes fired at 31% scores at 73-76% health in calm moments. Seeds 36-40 were not played, so it is short of 8 pairs and no playbook change follows.

## Games

### L4.I2.G1: dash 0.3 s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.3, bossDashRange 250.
- Outcome: died after 195.6s (game clock 03:15); damage taken 177 (Hot oil 10.833, enemy:oil-drip 1.562, enemy:crumb-ant 6.848, enemy:sprout-mite 3.201); 835 kills; level 1 to 11; planner asked 74 times, action model 353; the models saw the game 29 ms late (p90 50); ended with seeker-sprouts 1, hash-hawk 5, mash-landing 1, fry-lance 1, tater-pup 1, root-cellar 2, thick-skin 1, bacon-bits 1.
- run.timeSec: 195.617
- run.level: 10
- run.kills: 835
- run.damageBySource: seeker-sprouts 3521.432, hash-hawk 7534.425, grok-bot 274.451, fry-lance 2603.435, tater-pup 1510.106, root-cellar 3017.998, mash-landing 708.7, alex 1474.372
- run.damageTakenBySource: Hot oil 10.833, enemy:oil-drip 1.562, enemy:crumb-ant 6.848, enemy:sprout-mite 3.201, enemy:potato-beetle 14.261, enemy:aphid 1.445, enemy:compost-maggot 15.372, enemy:lint-bunny 16.09, boss:amusing 25.501, enemy:swarm-fly 2.772, boss:beetle-queen 42.611, enemy:beetle-brood 4.645, enemy:wireworm-larva 24.867, enemy:bog-slime 2.603, enemy:sand-crab 4.593
- run.killsBySource: seeker-sprouts 189, hash-hawk 193, grok-bot 20, fry-lance 145, tater-pup 109, root-cellar 49, mash-landing 22, alex 108
- run.biomes: ["fry-oil-desert","frozen-tundra","coin-laundromat","compost-caves","chip-canyons","peel-forest"]
- run.distance: 11334.433
- run.dodgePoints: 1551.138
- run.dodgeSecond: 195
- run.dodgeTaken: [70.79309565654168,73.51294565654167,73.51294565654167,89.28916098818108,107.42149432151442,118.41255297487044,118.41255297487044,126.8742527435347,133.42953156751733,145.86313156751734,162.2006192436456,166.1045069197739,172.61098637998774,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,65.23415725076839,67.12495040514324,68.94870958619596,70.79309565654168,70.79309565654168,70.79309565654168,70.79309565654168]
- run.dodgeSteps: [1065.2533333333213,1070.936666666652,1077.136666666649,1083.3366666666461,1092.2699999999782,1098.2633333333085,1104.4633333333056,1110.6633333333027,1115.5199999999672,1121.4566666666337,1126.3133333332983,1131.1699999999626,1133.443333333295,801.030000000109,807.230000000109,813.4300000001061,819.6300000001032,825.8300000001003,832.0300000000974,838.2300000000945,844.4300000000916,850.6300000000887,856.8300000000858,863.0300000000829,869.2300000000799,875.430000000077,881.6300000000741,887.8300000000712,894.0300000000683,900.2300000000654,906.4300000000625,912.6300000000596,918.8300000000567,925.0300000000537,931.2300000000508,937.4300000000479,941.8733333333792,941.8733333333792,946.1100000000439,952.310000000041,958.5100000000381,964.7100000000352,970.9100000000323,977.1100000000293,983.3100000000264,989.5100000000235,995.7100000000206,1001.9100000000177,1008.1100000000148,1014.3100000000119,1020.3033333333424,1020.3033333333424,1025.3666666666734,1030.6366666666709,1030.6366666666709,1030.9466666666708,1037.146666666668,1043.346666666665,1049.546666666662,1055.7466666666592,1061.6366666666563]
- run.curseSince: 10568
- run.killer: "enemy:sand-crab"
- run.goldEarned: 192.278
- run.goldSpent: 102
- run.bossChests: 2
- run.paidChests: 2
- run.bossesKilled: 2
- run.elitesKilled: 2
- run.peakEnemies: 165
- run.grokBotHelps: 2
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 835
- counters.hits: 1517
- counters.crits: 32
- counters.gems: 472
- counters.coins: 26
- counters.shots: 534
- counters.hostileShots: 101
- counters.nearMisses: 11
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 90, spent 101 (Potato Crate 101); spots charged and used: Tater Lantern 3, Potato Crate 2, Crop Patch 1, Spud Freezer 1; chests seen 4, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Hash Hawk 71% over Stuffed Skin 19%, Hash Boomerang 10%; 0:21 took Mash Landing 40% over Seeker Sprouts 33%, Tater Twirl 27%; 0:45 took Hash Hawk 51% over Starch Chain 44%, Starch Bolt 5%; 0:58 took Fry Lance 55% over Seeker Sprouts 33%, Small Fry 12%; 1:18 took Thick Skin 52% over Salt Shaker 32%, Potato Magnet 16%; 1:23 took Tater Tot Pup 37% over Gravy Heart 29%, Fry Lance 22%, Reroll 12%; 1:37 took Root Cellar 57% over Bacon Bits 32%, Reroll 7%, Tater Tot Pup 4%; 1:44 took Bacon Bits 63% over Reroll 13%, Root Cellar 12%, Tater Tot Pup 12%; 2:12 took Root Cellar 39% over Mash Finisher 32%, Reroll 16%, Spud Sneakers 13%; 3:11 took Hash Hawk 74% over Reroll 11%, Root Cellar 10%, Tater Trot 5%.

### L4.I2.G2: dash 0.3 s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 240s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.3, bossDashRange 250.
- Outcome: died after 153.9s (game clock 02:33); damage taken 137 (enemy:aphid 19.007, enemy:tomato-leech 80.457, enemy:crumb-ant 3.202, enemy:oil-drip 1.739); 507 kills; level 1 to 8; planner asked 53 times, action model 333; the models saw the game 28 ms late (p90 47); ended with seeker-sprouts 1, harvest-moon 2, hot-potato 1, mezzaluna 1, fry-lance 1, mash-mallet 1, gravy-heart 1.
- run.timeSec: 153.867
- run.level: 7
- run.kills: 507
- run.damageBySource: seeker-sprouts 2829.706, harvest-moon 1512.085, grok-bot 35.442, hot-potato 3441.713, mezzaluna 477.816, fry-lance 578.491, mash-mallet 262.489
- run.damageTakenBySource: enemy:aphid 19.007, enemy:tomato-leech 80.457, enemy:crumb-ant 3.202, enemy:oil-drip 1.739, enemy:frost-flea 2.985, boss:amusing 29.936
- run.killsBySource: seeker-sprouts 158, harvest-moon 90, grok-bot 2, hot-potato 179, mezzaluna 22, fry-lance 41, mash-mallet 15
- run.biomes: ["fry-oil-desert","chip-canyons","frozen-tundra","compost-caves"]
- run.distance: 9372.197
- run.dodgePoints: 953.089
- run.dodgeSecond: 153
- run.dodgeTaken: [103.90538378026594,103.90538378026594,110.55791711359927,110.55791711359927,110.55791711359927,110.55791711359927,110.55791711359927,110.55791711359927,112.24994762675277,112.24994762675277,112.24994762675277,112.24994762675277,112.24994762675277,115.57621429341944,115.57621429341944,115.57621429341944,115.57621429341944,115.57621429341944,115.57621429341944,115.57621429341944,115.57621429341944,115.57621429341944,115.57621429341944,128.8812809600861,128.8812809600861,132.20754762675276,132.20754762675276,132.20754762675276,132.20754762675276,132.20754762675276,132.20754762675276,132.20754762675276,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594,103.90538378026594]
- run.dodgeSteps: [719.0456666667284,721.5256666667282,731.5956666667291,736.679666666729,742.8796666667304,749.0796666667275,755.2796666667275,765.3496666667295,771.549666666732,777.7496666667346,783.9496666667371,790.1496666667397,800.2196666667415,804.7663333334101,810.9663333334126,817.1663333334152,827.2363333334149,833.436333333412,839.6363333334091,845.8363333334062,852.0363333334033,862.1063333334014,868.3063333333985,874.5063333333956,880.7063333333926,890.7763333333908,896.9763333333879,903.176333333385,909.376333333382,919.44633333338,925.6463333333771,931.8463333333742,563.4253333333802,567.7033333333818,575.9030000000483,578.7756666667158,584.9756666667183,591.1756666667209,597.3756666667234,602.1290000000588,602.1290000000588,602.8523333333918,609.0523333333921,615.2523333333932,621.4523333333957,627.6523333333982,633.8523333334008,640.0523333334025,646.2523333334013,652.4523333334039,658.6523333334019,664.8523333334017,671.0523333334032,677.2523333334058,683.452333333406,689.6523333334053,694.6123333334044,700.2956666667351,706.4956666667322,714.4990000000638,714.4990000000638]
- run.curseSince: 1632
- run.killer: "boss:amusing"
- run.goldEarned: 25.463
- run.elitesKilled: 2
- run.peakEnemies: 111
- run.grokBotHelps: 3
- counters.kills: 507
- counters.hits: 1014
- counters.gems: 175
- counters.coins: 15
- counters.shots: 538
- counters.hostileShots: 216
- counters.nearMisses: 8
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 25, spent 0; spots charged and used: Spud Freezer 1; chests seen 2, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Harvest Moon 57% over Seeker Sprouts 36%, Spud Fence 7%; 0:27 took Gravy Heart 54% over Rösti Disc 27%, Hash Boomerang 19%; 0:47 took Harvest Moon 38% over Spud Decoy 37%, Seeker Sprouts 25%; 1:18 took Hot Potato 43% over Gravy Heart 36%, Hearty Helping 16%, Reroll 5%; 1:27 took Mezzaluna 78% over Frying Pan 11%, Hot Potato 6%, Reroll 5%; 1:36 took Fry Lance 41% over Thick Skin 28%, Spud Dynamo 23%, Reroll 8%; 2:11 took Mash Mallet 70% over Reroll 15%, Seeker Sprouts 10%, Hot Potato 5%.

### L4.I2.G3: dash 0.3 s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 240s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.3, bossDashRange 250.
- Outcome: alive after 240.1s (game clock 04:00), health 74/120; damage taken 119 (Brambles 15.3, Spore vent 12.933, enemy:potato-beetle 6.179, boss:beetle-queen 27.199); 1207 kills; level 1 to 10; planner asked 86 times, action model 433; the models saw the game 28 ms late (p90 50); ended with seeker-sprouts 3, wildfire-roast 1, hash-brown-shield 1, spud-cannon 1, starch-bolt 1, starch-puddle 1, thick-skin 1, peel-out 1.
- run.timeSec: 240.1
- run.level: 9
- run.kills: 1207
- run.damageBySource: seeker-sprouts 5667.401, hot-streak 7204.632, hash-brown-shield 3536.71, spud-cannon 4297.725, starch-bolt 5186.76, starch-puddle 4880.849, wildfire-roast 9065.067
- run.damageTakenBySource: Brambles 15.3, Spore vent 12.933, enemy:potato-beetle 6.179, boss:beetle-queen 27.199, enemy:bowling-ball 57.644
- run.killsBySource: seeker-sprouts 243, hot-streak 233, spud-cannon 149, starch-bolt 159, hash-brown-shield 81, starch-puddle 138, wildfire-roast 204
- run.evolutions: [{"id":"wildfire-roast","at":190.01666666666668}]
- run.biomes: ["chip-canyons","mash-swamp","peel-forest","compost-caves","gutterball-lanes"]
- run.dogs: [{"id":"collie","at":138.73333333333332}]
- run.dogHelp: pushed.collie 54
- run.distance: 13351.341
- run.dodgePoints: 1888.776
- run.dodgeSecond: 240
- run.dodgeTaken: [34.41209786582613,34.41209786582613,34.41209786582613,34.41209786582613,34.41209786582613,43.478264532492794,61.61059786582613,66.83991760005165,66.83991760005165,66.83991760005165,87.58879470084155,87.58879470084155,98.13996771876103,98.13996771876103,103.3870447921031,108.60610644765865,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,119.25487526651978,28.233333333333288,28.233333333333288,28.233333333333288]
- run.dodgeSteps: [1036.0357066667289,1038.1643733333963,1040.399473333397,1046.7854733333993,1053.1714733334015,1059.5574733334038,1068.614806666739,1069.785573333406,1069.785573333406,1073.510740000074,1078.5131066667425,1088.741206666745,1091.8277733334128,1096.0851066667476,1098.3202066667484,1106.5260733334167,1110.8898400000849,1117.275840000087,1121.2138733334218,1127.599873333424,1132.0700733334256,1140.3823733334275,1142.7239066667616,1144.3204066667622,1149.7485066667641,1154.5380066667658,1160.604706666768,1166.9907066667702,1172.5252400001054,1177.846906666774,1184.2329066667762,1190.6189066667785,1197.0049066667807,1203.0503200001162,1209.4363200001185,1214.0129533334534,1220.3989533334557,1223.4855200001234,1223.4855200001234,1226.6785200001245,1230.0843866667924,1236.4703866667946,1242.8563866667969,1248.1780533334654,1253.819020000134,1260.2050200001363,1266.5910200001385,1272.9770200001408,1279.363020000143,1285.7490200001453,1292.1350200001475,1298.5210200001497,1304.907020000152,1311.2930200001542,1317.0404200001562,1321.7234866668246,1328.1094866668268,1334.495486666829,1018.3677733333892,1024.7537733333916,1031.1397733333938]
- run.curseSince: 13225
- run.goldEarned: 291.658
- run.goldSpent: 30
- run.bossChests: 4
- run.paidChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 173
- run.grokBotHelps: 3
- run.lootRunnersMet: [1]
- counters.kills: 1207
- counters.hits: 2237
- counters.gems: 237
- counters.coins: 43
- counters.shots: 776
- counters.hostileShots: 62
- counters.nearMisses: 13
- Gold, spots and chests: gold held at the end 260, spent 30 (Potato Crate 30); spots charged and used: Spud Freezer 3, Tater Lantern 2, Crop Patch 1, Frenzy Fryer 1, Beetle Nest 1; chests seen 8, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:17 took Hot Streak 61% over Butter Pat 27%, Spud Decoy 12%; 0:49 took Seeker Sprouts 73% over Salt Shaker 20%, Bacon Bits 7%; 0:50 took Hot Streak 44% over Seeker Sprouts 43%, Leave 13%; 0:58 took Hash Brown Shield 59% over Potato Battery 26%, Seeker Sprouts 12%, Skip 3%; 1:24 took Spud Cannon 77% over Seeker Sprouts 18%, Golden Fry 3%, Skip 2%; 1:36 took Starch Bolt 65% over Seeker Sprouts 32%, Skip 2%, Golden Fry 1%; 1:45 took Hot Streak 52% over Gravy Heart 27%, Seeker Sprouts 18%, Skip 3%; 1:59 took Hot Streak 67% over Hash Brown Shield 24%, Leave 6%, Starch Bolt 3%; 2:04 took Thick Skin 45% over Hash Brown Shield 37%, Reroll 12%, Spud Cannon 4%, Skip 2%; 2:35 took Starch Puddle 34% over Broadside 28%, Reroll 18%, Seeker Sprouts 17%, Skip 3%; 3:09 took Peel Out 73% over Starch Puddle 9%, Reroll 9%, Seeker Sprouts 6%, Skip 3%.

### L4.I2.G4: dash 0.3 s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 240s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.3, bossDashRange 250.
- Outcome: alive after 240.3s (game clock 04:00), health 120/120; damage taken 53 (Hot oil 32, enemy:frost-flea 4.345, enemy:sprout-mite 1.406, boss:amusing 13.305); 2024 kills; level 1 to 16; planner asked 95 times, action model 262; the models saw the game 32 ms late (p90 51); ended with seeker-sprouts 1, spud-cannon 1, comet-scythe 8, spud-grid 1, frozen-fries 1, afterburner-fries 1, root-network 2, peel-out 1, big-bowl 1, packed-pan 1.
- run.timeSec: 240.25
- run.level: 15
- run.kills: 2024
- run.damageBySource: seeker-sprouts 4545.398, spud-cannon 4048.872, potato-battery 4596.414, comet-scythe 3646.228, frozen-fries 1888.326, spud-grid 36318.313, grok-bot 177.662
- run.damageTakenBySource: Hot oil 32, enemy:frost-flea 4.345, enemy:sprout-mite 1.406, boss:amusing 13.305, Spore vent 1.486
- run.killsBySource: seeker-sprouts 173, spud-cannon 169, potato-battery 232, comet-scythe 129, frozen-fries 25, spud-grid 1290, grok-bot 6
- run.evolutions: [{"id":"spud-grid","at":134.56666666666666}]
- run.biomes: ["ketchup-bog","fry-oil-desert","crop-circle","chip-canyons","frozen-tundra","compost-caves","peel-forest","mash-swamp"]
- run.distance: 12218.908
- run.dodgePoints: 2048.796
- run.dodgeSecond: 240
- run.dodgeTaken: [52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706,52.54170700851706]
- run.dodgeSteps: [930.0981666666903,935.4715000000211,935.4715000000211,939.6048333333525,945.8048333333496,949.3181666666812,949.3181666666812,953.0381666666796,954.278166666679,957.3781666666775,963.5781666666746,965.2315000000071,965.2315000000071,970.604833333338,976.7015000000017,976.7015000000017,981.4548333333329,987.65483333333,993.8548333333271,1000.0548333333242,1006.2548333333212,1011.4938333333199,1017.073833333318,1023.2738333333151,1029.473833333312,1035.6738333333092,1041.8738333333063,1048.0738333333034,1054.2738333333004,1060.4738333332975,1066.6738333332946,1072.8738333332917,1079.0738333332888,1085.273833333286,1091.473833333283,1097.67383333328,1101.0838333332786,1101.0838333332786,1105.1138333332767,1111.3138333332738,1117.513833333271,1123.713833333268,1129.913833333265,1136.1138333332622,1142.3138333332593,1148.5138333332563,1154.7138333332534,1160.9138333332505,1167.1138333332476,1173.3138333332447,1179.358833333242,1183.6988333332422,1189.3408333332402,1195.5408333332373,1201.7408333332344,1207.9408333332315,1214.1408333332286,1220.3408333332256,911.498166666699,917.6981666666961,923.8981666666932]
- run.curseSince: 14283
- run.goldEarned: 415.643
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 183
- run.shrinesUsed: 1
- run.grokBotHelps: 5
- run.lootRunnersMet: [1,1]
- run.lootRunnersCaught: [1]
- counters.kills: 2024
- counters.hits: 2816
- counters.gems: 446
- counters.coins: 129
- counters.shots: 879
- counters.hostileShots: 76
- counters.nearMisses: 14
- shrineTotals.armor: 10
- Gold, spots and chests: gold held at the end 414, spent 0; spots charged and used: Crop Patch 4, Spud Freezer 4, Seed Vault 1, Dinner Bell 1; chests seen 6, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:13 took Spud Cannon 50% over Mash Finisher 26%, Sprout Squad 24%; 0:23 took Comet Scythe 94% over Butter Pat 5%, Clean Plate 1%; 0:24 took Potato Battery 77% over Spud Fence 17%, Gravy Boat 6%; 1:03 took Potato Battery 43% over Deep Fryer 39%, Chip Shuriken 18%; 1:12 took Potato Battery 78% over Spud Cannon 11%, Seeker Sprouts 6%, Leave 5%; 1:19 took Potato Battery 87% over Leave 5%, Seeker Sprouts 4%, Spud Cannon 4%; 1:28 took Comet Scythe 56% over Root Network 25%, Gravy Heart 19%; 1:31 took Frozen Fries 54% over Root Network 41%, Spud Cannon 5%; 1:36 took Root Network 81% over Slow Cooker 14%, Couch Potato 5%; 2:03 took Root Network 88% over Reroll 7%, Spud Cannon 2%, Seeker Sprouts 2%, Skip 1%; 2:15 took Armor 64% over Damage 29%, Pickup range 7%; 2:37 took Afterburner Fries 43% over Frozen Fries 21%, Thick Skin 21%, Reroll 12%, Skip 3%; 3:06 took Comet Scythe 55% over Root Network 29%, Reroll 12%, Seeker Sprouts 3%, Skip 1%; 3:29 took Peel Out 40% over Big Bowl 37%, Reroll 11%, Frozen Fries 10%, Skip 2%; 3:57 took Comet Scythe 72% over Big Bowl 19%, Reroll 7%, Afterburner Fries 1%, Skip 1%; 3:57 took Big Bowl 66% over Root Network 22%, Reroll 6%, Clean Plate 5%, Skip 1%; 3:58 took Packed Pan 75% over Reroll 12%, Lean Lunch 9%, Bacon Bits 2%, Skip 2%; 3:59 took Comet Scythe 87% over Root Network 5%, Reroll 5%, Hot Sauce 2%, Skip 1%.

### L4.I2.G5: dash 0.3 s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 240s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.3, bossDashRange 250.
- Outcome: died after 188.5s (game clock 03:08); damage taken 156 (enemy:aphid 3.449, enemy:compost-maggot 1.154, Spore vent 7.733, Hot oil 27.067); 852 kills; level 1 to 9; planner asked 64 times, action model 500; the models saw the game 31 ms late (p90 52); ended with seeker-sprouts 1, spud-lob 2, skillet-flail 1, mash-snowball 1, hot-potato 1, spud-dynamo 1, hot-start 1, starch-plating 1.
- run.timeSec: 188.517
- run.level: 8
- run.kills: 852
- run.damageBySource: seeker-sprouts 3725.291, spud-lob 3643.702, skillet-flail 1294.058, mash-snowball 2518.332, grok-bot 413.655, hot-potato 5381.098, spud-dynamo 1597.077
- run.damageTakenBySource: enemy:aphid 3.449, enemy:compost-maggot 1.154, Spore vent 7.733, Hot oil 27.067, enemy:fry-fly 40.973, enemy:sand-crab 3.416, boss:amusing 44.862, boss:beetle-queen 27.803
- run.killsBySource: seeker-sprouts 213, spud-lob 177, skillet-flail 42, mash-snowball 112, grok-bot 29, hot-potato 249, spud-dynamo 30
- run.biomes: ["compost-caves","ketchup-bog","chip-canyons","fry-oil-desert","mash-swamp","peel-forest"]
- run.distance: 11072.14
- run.dodgePoints: 1198.815
- run.dodgeSecond: 188
- run.dodgeTaken: [128.65394328766644,130.9708525469257,133.28776180618496,133.28776180618496,141.0107926703825,148.73382353458,105.37585439877755,107.07585439877757,107.07585439877757,107.07585439877757,107.07585439877757,107.07585439877757,109.8903877321109,109.8903877321109,109.8903877321109,109.8903877321109,109.8903877321109,109.8903877321109,109.8903877321109,109.8903877321109,109.8903877321109,109.8903877321109,109.8903877321109,109.8903877321109,115.51945439877755,115.51945439877755,115.51945439877755,117.39580995433312,120.21034328766645,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644,128.65394328766644]
- run.dodgeSteps: [1073.8473333332615,1083.0906666665933,1086.8106666665915,1089.4973333332568,1095.283999999921,1104.0106666665863,753.5333333333684,762.3133333333706,769.8033333333728,775.3523333333723,778.0235000000403,783.7120000000402,791.8755000000416,798.0755000000411,801.5888333333727,806.4455000000371,810.4135000000379,819.0420000000383,822.4520000000348,825.862000000031,831.5040000000279,837.704000000025,847.7740000000231,853.560666666687,858.5206666666847,861.1040000000169,869.727333333349,875.927333333346,882.1273333333431,885.8473333333413,892.0473333333384,898.2473333333355,904.4473333333326,906.3073333333317,906.3073333333317,912.4039999999956,922.4739999999936,928.6739999999907,934.8739999999877,941.0739999999848,947.2739999999819,953.473999999979,959.6739999999761,965.8739999999732,972.0739999999703,978.2739999999674,984.4739999999645,988.8139999999624,998.8839999999606,1002.8106666666254,1009.0106666666225,1013.2473333332871,1017.5873333332851,1023.7873333332822,1027.713999999947,1032.777333333278,1042.847333333276,1049.0473333332732,1055.2473333332703,1061.4473333332674,1067.6473333332644]
- run.curseSince: 7694
- run.killer: "boss:beetle-queen"
- run.goldEarned: 90.037
- run.goldSpent: 30
- run.paidChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 154
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 852
- counters.hits: 1649
- counters.gems: 221
- counters.coins: 35
- counters.shots: 1169
- counters.hostileShots: 206
- counters.nearMisses: 16
- counters.hostileHits: 10
- Gold, spots and chests: gold held at the end 58, spent 30 (Potato Crate 30); spots charged and used: Crop Patch 2, Spud Freezer 2; chests seen 3, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Spud Lob 46% over Peel Out 38%, Tailgate Fries 16%; 0:18 took Skillet Flail 86% over Seeker Sprouts 11%, Hearty Helping 3%; 0:23 took Mash Snowball 43% over Mash Wave 30%, Thick Skin 27%; 0:24 took Hot Start 46% over Seeker Sprouts 45%, Hot Sauce 9%; 1:01 took Spud Lob 59% over Seeker Sprouts 22%, Hot Sauce 19%; 1:08 took Hot Potato 69% over Mash Snowball 25%, Seeker Sprouts 6%; 1:33 took Spud Dynamo 59% over Thick Skin 36%, Skillet Flail 5%; 2:08 took Starch Plating 73% over Spud Lob 23%, Seeker Sprouts 4%.
