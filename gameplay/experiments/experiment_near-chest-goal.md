# Does a minimal chest-when-near planner.goal raise 4:00 survival over 10 paired seeds?

| Field | Value |
| --- | --- |
| Status | done |
| Area | spots |
| Result | refuted |
| Created | L4.I9 |
| Updated | L4.I10 |

## Hypothesis

Chests opened over the whole game separate survivors from deaths (B85), and steam-vent left 2-6 listed chests unopened in all five games. The earlier chest-first goal (1 of 4) also changed food and elite rules and had too few seeds. A goal that only rates 'open a chest within 250 units' high while health is above 50% and no elite is within 150 units should open more chests early and evolve sooner without the side effects.

## Method

Seeker-sprouts with the playbook knobs, 240 s from 0:00 on seeds 31-40, only planner.goal changed. Pair with the playbook games on file (s31-40 alive at 4:00 on 6 of 10). Read chests opened by 2:00 and at the end, first evolution time, damage taken by 2:30, evade goals and 4:00 survival. A playbook change needs 8 or more of 10 alive and a net of 3 or more paired wins, and a change this late would still have to beat the playbook in the pre-run rehearsal.

## Findings

Seeker-sprouts with the playbook knobs and only planner.goal changed (open a listed chest within 250 units while health is above 50% and no elite is within 150), 240 s on s31-40. It was alive at 4:00 on 4 of 10 (s32, s33, s36, s37) against 6 of 10 for the playbook. Paired: 2 wins, 4 losses, 4 ties. Chests opened over the whole game separated survivors (6, 6, 9, 7) from deaths (0-4, five of six with 0-1), as in B85. But the first chest was never listed before 1:05-1:37, so the goal could not make chests arrive sooner. Deaths came at 2:12-3:29 to the amusing boss, Fry Fly or Snow Mold elites and the 3:00 queen, at 120-156 max hp, with 0-3 dashes. Not added to the playbook.

## Games

### L4.I9.G1: near chest s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 141.6s (game clock 02:21); damage taken 180 (enemy:fry-fly 80.144, Hot oil 11.833, enemy:bowling-ball 7.639, enemy:crumb-ant 5.732); 584 kills; level 1 to 9; planner asked 45 times, action model 245; the models saw the game 29 ms late (p90 49); ended with seeker-sprouts 4, starch-chain 2, mash-snowball 1, deep-fryer 1, peel-out 2.
- run.timeSec: 141.617
- run.level: 8
- run.kills: 584
- run.damageBySource: seeker-sprouts 3276.084, dog:dalmatian 359.262, starch-chain 4509.102, mash-snowball 1923.628, deep-fryer 565.981, grok-bot 329.965
- run.damageTakenBySource: enemy:fry-fly 80.144, Hot oil 11.833, enemy:bowling-ball 7.639, enemy:crumb-ant 5.732, enemy:bowling-pin 1.888, boss:amusing 73.178
- run.killsBySource: seeker-sprouts 205, dog:dalmatian 25, starch-chain 226, mash-snowball 85, deep-fryer 21, grok-bot 22
- run.biomes: ["chip-canyons","fry-oil-desert","gutterball-lanes"]
- run.dogs: [{"id":"dalmatian","at":10.116666666666667},{"id":"beagle","at":40.233333333333334}]
- run.dogHelp: damage.dalmatian 359.262, hits.dalmatian 35, gold.beagle 39, finds.beagle 13
- run.distance: 7852.667
- run.dodgePoints: 791.589
- run.dodgeSecond: 141
- run.dodgeTaken: [102.7583369103261,102.7583369103261,109.41087024365943,109.41087024365943,136.02100357699277,162.63113691032606,175.93620357699274,175.93620357699274,175.93620357699274,175.93620357699274,175.93620357699274,175.93620357699274,175.93620357699274,175.93620357699274,175.93620357699274,175.93620357699274,175.93620357699274,175.93620357699274,175.93620357699274,175.93620357699274,93.09539066101827,93.09539066101827,93.09539066101827,93.09539066101827,93.09539066101827,93.09539066101827,93.09539066101827,93.09539066101827,93.09539066101827,93.09539066101827,93.09539066101827,93.26205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,98.76205732768493,102.7583369103261,102.7583369103261,102.7583369103261,102.7583369103261,102.7583369103261,102.7583369103261,102.7583369103261,102.7583369103261,102.7583369103261,102.7583369103261,102.7583369103261,102.7583369103261,102.7583369103261,102.7583369103261]
- run.dodgeSteps: [675.3866666666772,679.8300000000123,683.4466666666794,689.6466666666784,694.503333333347,694.9166666666803,701.116666666682,707.3166666666846,713.5166666666853,719.7166666666851,725.9166666666877,735.9866666666854,742.1866666666832,748.3866666666848,754.5866666666836,764.6566666666847,770.8566666666873,777.0566666666891,778.400000000023,778.400000000023,441.54333333332727,446.9166666666624,446.9166666666624,453.11666666666497,459.3166666666675,465.51666666667006,471.7166666666726,477.91666666667516,482.6700000000104,488.87000000001296,495.0700000000155,501.27000000001806,507.47000000002026,513.670000000022,518.630000000024,519.7666666666912,525.9666666666927,532.1666666666899,538.366666666687,542.2106666666862,547.5840000000173,553.7840000000144,559.9840000000138,566.1840000000163,572.3840000000189,577.8400000000204,584.0400000000229,590.2400000000255,596.4400000000276,602.6400000000247,608.8400000000217,615.0400000000188,621.2400000000159,625.7866666666805,631.9866666666776,638.1866666666747,644.3866666666718,650.5866666666689,656.7866666666696,662.9866666666721,669.1866666666747]
- run.curseSince: 8431
- run.killer: "enemy:fry-fly"
- run.goldEarned: 124.317
- run.goldSpent: 45
- run.bossChests: 1
- run.paidChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 99
- run.shrinesUsed: 1
- run.grokBotHelps: 3
- run.botSwarms: 1
- counters.kills: 584
- counters.hits: 911
- counters.gems: 222
- counters.coins: 55
- counters.shots: 410
- counters.hostileShots: 96
- counters.nearMisses: 32
- shrineTotals.cooldown: 0.042
- Gold, spots and chests: gold held at the end 79, spent 42 (Potato Crate 27, Tater Slots 15); spots charged and used: Stray Dog 2, Tater Lantern 1, Tater Slots 1, Potato Crate 1; chests seen 3, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:13 took Peel Out 49% over Potato Rain 36%, Peel Phantom 15%; 0:17 took Seeker Sprouts 82% over Masher Grip 10%, Stuffed Skin 8%; 0:35 took Cooldown 78% over Area 19%, Move speed 3%; 0:42 took Starch Chain 47% over Frozen Fries 41%, Gravy Heart 12%; 0:58 took Mash Snowball 75% over Thick Skin 19%, Gravy Heart 6%; 1:16 took Starch Chain 48% over Mash Snowball 35%, Seeker Sprouts 17%; 1:18 took Deep Fryer 63% over Seeker Sprouts 30%, Bacon Bits 7%; 1:33 took Peel Out 56% over Seeker Sprouts 32%, Fertilizer 12%; 2:02 took Seeker Sprouts 78% over Deep Fryer 17%, Golden Fry 5%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Starch Chain 1/8, Mash Snowball 1/8, Peel Out 1/5 | 1:58 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Starch Chain 2/8, Mash Snowball 1/8, Deep Fryer 1/8, Peel Out 2/5 | 2:21 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 4/8, Starch Chain 2/8, Mash Snowball 1/8, Deep Fryer 1/8, Peel Out 2/5.
- Passive levels first reached: Peel Out 1 at 0:13.

### L4.I9.G2: near chest s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240.2s (game clock 04:00), health 91/144; damage taken 170 (Hot oil 65.141, Spore vent 3.967, enemy:snow-mold 35.971, enemy:parking-gull 1.374); 1883 kills; level 1 to 14; planner asked 91 times, action model 439; the models saw the game 30 ms late (p90 50); ended with seeker-sprouts 1, comet-scythe 8, tot-toss 1, sprout-satellites 1, pestle-barrage 1, gem-sling 1, peel-out 1, big-bowl 1, clean-plate 2, salt-shaker 1.
- run.timeSec: 240.183
- run.level: 13
- run.kills: 1883
- run.damageBySource: seeker-sprouts 4767.421, comet-scythe 8552.054, tot-toss 2806.318, sprout-satellites 1784.038, mash-mortar 14000.54, gem-sling 5352.151, pestle-barrage 19921.196, grok-bot 206.654
- run.damageTakenBySource: Hot oil 65.141, Spore vent 3.967, enemy:snow-mold 35.971, enemy:parking-gull 1.374, boss:amusing 28.388, enemy:dumpster-raccoon 7.168, enemy:wireworm-larva 3.186, enemy:crumb-ant 1.653, boss:beetle-queen 7.755, enemy:sand-crab 4.18, enemy:fry-fly 6.057, enemy:bowling-ball 5.362
- run.killsBySource: seeker-sprouts 218, comet-scythe 283, tot-toss 106, sprout-satellites 58, mash-mortar 588, gem-sling 111, pestle-barrage 513, grok-bot 6
- run.evolutions: [{"id":"pestle-barrage","at":197.93333333333334}]
- run.biomes: ["fry-oil-desert","compost-caves","mash-swamp","peel-forest","fry-palace","ketchup-bog","chip-canyons","gutterball-lanes"]
- run.dogs: [{"id":"husky","at":4.666666666666667},{"id":"corgi","at":11.366666666666667},{"id":"whippet","at":75.68333333333334}]
- run.dogHelp: frozen.corgi 100, finds.husky 35, blocked.whippet 8
- run.distance: 13621.423
- run.dodgePoints: 1645.019
- run.dodgeSecond: 240
- run.dodgeTaken: [97.53347997453342,97.53347997453342,97.53347997453342,100.21892598392311,110.63771508492033,117.25086550396358,117.25086550396358,117.25086550396358,117.25086550396358,121.43077233100249,121.43077233100249,121.43077233100249,121.43077233100249,126.19133571128421,126.19133571128421,132.98058676528728,140.30453042725898,146.77401399533403,154.0979576573057,155.92894357279863,156.17307502819767,159.83504685918354,159.83504685918354,162.52049286857317,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,164.83974169486424,170.20209412243037,170.20209412243037,170.20209412243037,170.20209412243037,170.20209412243037,90.9419306787588,93.87150814354753,97.53347997453342]
- run.dodgeSteps: [1022.4473393708498,1028.647339370847,1034.847339370844,1041.0473393708412,1047.2473393708383,1056.9623416454035,1063.1623416454006,1069.3623416453977,1075.5623416453948,1081.0390083120587,1087.0323416453894,1093.2323416453864,1099.4323416453835,1105.6323416453806,1106.7690083120467,1112.9402033840981,1116.556870050763,1121.206870050761,1127.406870050758,1133.606870050755,1138.0502033840862,1141.9768700507511,1146.1102033840825,1152.3102033840796,1158.5102033840767,1164.7102033840738,1170.9102033840709,1177.110203384068,1183.310203384065,1189.5102033840622,1195.7102033840592,1201.9102033840563,1208.1102033840534,1214.3102033840505,1220.5102033840476,1226.7102033840447,1232.9102033840418,1239.1102033840389,1245.310203384036,1251.510203384033,1257.7102033840301,1263.9102033840272,1270.1102033840243,1276.3102033840214,1281.6835367173521,1286.0235367173502,1292.2235367173473,1298.4235367173444,1304.6235367173415,1310.8235367173386,1317.0235367173357,1323.2235367173328,1329.4235367173299,1339.2229795627804,1345.4229795627775,1350.0523128961092,1356.2523128961063,1361.4603128961066,1008.1873393708565,1012.7340060375211,1016.2473393708527]
- run.curseSince: 12408
- run.goldEarned: 397.448
- run.goldSpent: 102
- run.bossChests: 6
- run.paidChests: 2
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 161
- run.grokBotHelps: 6
- run.lootRunnersMet: [1]
- counters.kills: 1883
- counters.hits: 3448
- counters.crits: 126
- counters.gems: 958
- counters.coins: 58
- counters.shots: 1611
- counters.hostileShots: 85
- counters.nearMisses: 7
- counters.hostileHits: 4
- Gold, spots and chests: gold held at the end 295, spent 102 (Potato Crate 102); spots charged and used: Stray Dog 4, Frenzy Fryer 1, Potato Crate 1, Tater Lantern 1, Spud Freezer 1; chests seen 6, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Comet Scythe 87% over Sour Cream 7%, Peeler 6%; 0:26 took Peel Out 36% over Hot Streak 36%, Comet Scythe 28%; 0:35 took Tot Toss 43% over Mash Mallet 38%, Masher Grip 19%; 0:36 took Sprout Satellites 50% over Hot Potato 39%, Starch Bolt 11%; 0:37 took Comet Scythe 86% over Seeker Sprouts 7%, Leave 5%, Tot Toss 2%; 1:02 took Mash Mortar 56% over Julienne Dash 28%, Peel Out 16%; 1:05 took Mash Mortar 82% over Seeker Sprouts 7%, Leave 6%, Sprout Satellites 5%; 1:23 took Gem Sling 60% over Sprout Satellites 26%, Potato Magnet 10%, Skip 4%; 1:36 took Big Bowl 56% over Mash Mortar 37%, Reroll 5%, Gem Sling 1%, Skip 1%; 2:07 took Mash Mortar 82% over Comet Scythe 9%, Reroll 7%, Skip 2%, Tot Toss 0%; 2:15 took Comet Scythe 56% over Sour Cream 22%, Reroll 10%, Sprout Satellites 6%, Skip 6%; 2:52 took Clean Plate 29% over Sprout Satellites 27%, Reroll 19%, Gem Sling 17%, Skip 8%; 2:54 took Comet Scythe 66% over Butter Socks 18%, Reroll 10%, Sprout Satellites 4%, Skip 2%; 2:55 took Salt Shaker 31% over Reroll 29%, Gem Sling 16%, Skip 15%, Tot Toss 9%; 3:26 took Clean Plate 56% over Fertilizer 14%, Reroll 13%, Gem Sling 11%, Skip 6%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:56 level 5, maxHp 120, armor 6, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 2/8, Tot Toss 1/8, Sprout Satellites 1/8, Peel Out 1/5 | 1:59 level 8, maxHp 144, armor 6, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 2/8, Tot Toss 1/8, Sprout Satellites 1/8, Mash Mortar 6/8, Gem Sling 1/8, Peel Out 1/5, Big Bowl 1/5 | 2:59 level 13, maxHp 144, armor 6, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 4/8, Tot Toss 1/8, Sprout Satellites 1/8, Mash Mortar 8/8, Gem Sling 1/8, Peel Out 1/5, Big Bowl 1/5, Clean Plate 1/2, Salt Shaker 1/5 | 3:59 level 14, maxHp 144, armor 6, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 8/8, Tot Toss 1/8, Sprout Satellites 1/8, Pestle Barrage 1/1, Gem Sling 1/8, Peel Out 1/5, Big Bowl 1/5, Clean Plate 2/2, Salt Shaker 1/5.
- Passive levels first reached: Peel Out 1 at 0:26; Big Bowl 1 at 1:37; Clean Plate 1 at 2:52; Salt Shaker 1 at 2:55.

### L4.I9.G3: near chest s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240s (game clock 04:00), health 123/140; damage taken 150 (enemy:aphid 5.881, enemy:garden-slug 43.301, enemy:bowling-pin 4.328, enemy:crumb-ant 5.719); 2531 kills; level 1 to 15; planner asked 90 times, action model 419; the models saw the game 33 ms late (p90 55); ended with seeker-sprouts 1, mash-avalanche 1, starch-puddle 1, chip-shuriken 8, reset-button 2, four-eyed-spud 1, chives 1, masher-grip 1, butter-pat 2, gpu 2.
- run.timeSec: 240.033
- run.level: 14
- run.kills: 2531
- run.damageBySource: seeker-sprouts 5628.443, mash-snowball 4009.901, dog:dalmatian 1045.592, starch-puddle 8978.099, chip-shuriken 27787.989, grok-bot 143.992, mash-avalanche 26875.89, reset-button 2813.612
- run.damageTakenBySource: enemy:aphid 5.881, enemy:garden-slug 43.301, enemy:bowling-pin 4.328, enemy:crumb-ant 5.719, enemy:sprout-mite 1.122, enemy:bowling-ball 12.247, enemy:sand-crab 2.629, enemy:wireworm-larva 2.363, boss:amusing 20.167, enemy:lint-bunny 42.218, enemy:ketchup-drop 1.852, enemy:bog-slime 1.946, enemy:sock-pile 6.487
- run.killsBySource: seeker-sprouts 260, mash-snowball 144, dog:dalmatian 60, starch-puddle 302, chip-shuriken 757, grok-bot 10, mash-avalanche 909, reset-button 89
- run.evolutions: [{"id":"mash-avalanche","at":133.96666666666667}]
- run.biomes: ["chip-canyons","gutterball-lanes","ketchup-bog","mash-swamp","coin-laundromat"]
- run.dogs: [{"id":"dalmatian","at":33.5},{"id":"pomchi","at":117.51666666666667}]
- run.dogHelp: damage.dalmatian 1045.592, hits.dalmatian 79, finds.pomchi 3
- run.distance: 11256.823
- run.dodgePoints: 1727.919
- run.dodgeSecond: 240
- run.dodgeTaken: [110.06448939502549,110.06448939502549,110.06448939502549,111.5617398238583,113.03274589347963,114.53061601689707,114.53061601689707,114.53061601689707,114.53061601689707,114.53061601689707,114.53061601689707,114.53061601689707,114.53061601689707,114.53061601689707,123.61728859645197,123.61728859645197,123.61728859645197,123.61728859645197,125.20839139404569,125.20839139404569,125.20839139404569,125.20839139404569,125.20839139404569,125.20839139404569,125.20839139404569,128.44004374455062,128.44004374455062,128.44004374455062,128.44004374455062,128.44004374455062,128.44004374455062,131.68061593322543,131.68061593322543,131.68061593322543,133.32035562761365,133.32035562761365,133.32035562761365,133.32035562761365,134.98187510887772,134.98187510887772,134.98187510887772,136.6605703938686,138.33782032413168,138.33782032413168,138.33782032413168,138.33782032413168,138.33782032413168,138.33782032413168,146.8155644726684,148.52514334125445,148.52514334125445,148.52514334125445,148.52514334125445,148.52514334125445,150.2600608171653,150.2600608171653,150.2600608171653,150.2600608171653,110.06448939502549,110.06448939502549,110.06448939502549]
- run.dodgeSteps: [865.9643333332912,865.9643333332912,865.9643333332912,867.4109999999571,872.2676666666215,875.9876666666198,875.9876666666198,879.707666666618,884.6056666666148,890.8056666666118,897.0056666666089,903.205666666606,909.4056666666031,913.4356666666012,917.7756666665991,922.6323333332635,922.6323333332635,928.8323333332606,935.0323333332577,941.2323333332548,947.4323333332519,951.46233333325,957.662333333247,963.8623333332441,970.0623333332412,976.2623333332383,982.4623333332354,988.1456666665661,990.4189999998983,996.6189999998954,1002.8189999998925,1009.0189999998896,1015.2189999998867,1020.9023333332174,1023.1756666665497,1029.3756666665467,1035.5756666665438,1041.775666666541,1047.975666666538,1048.4923333332044,1051.902333333203,1052.8323333332023,1052.8323333332023,1052.8323333332023,1058.9289999998662,1065.1289999998633,1071.3289999998603,1075.565666666525,1081.765666666522,1087.9656666665192,1094.1656666665162,1100.3656666665133,1106.5656666665104,1112.7656666665075,1113.4889999998406,1113.4889999998406,1119.2756666665045,1125.4756666665016,853.3576666666304,859.5576666666275,865.7576666666246]
- run.curseSince: 14244
- run.goldEarned: 636.7
- run.goldSpent: 376
- run.bossChests: 7
- run.paidChests: 4
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 225
- run.shrinesUsed: 3
- run.grokBotHelps: 7
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2531
- counters.hits: 4088
- counters.crits: 176
- counters.gems: 256
- counters.coins: 125
- counters.shots: 754
- counters.hostileShots: 71
- counters.nearMisses: 10
- counters.hostileHits: 1
- shrineTotals.duration: 0.084
- shrineTotals.maxHp: 16.8
- shrineTotals.armor: 17
- Gold, spots and chests: gold held at the end 260, spent 376 (Potato Crate 376); spots charged and used: Potato Crate 4, Stray Dog 1, Beetle Nest 1; chests seen 8, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Four-Eyed Spud 41% over Spud Decoy 35%, Spud Fence 24%; 0:13 took Armor 97% over Pickup range 3%, Gold gain 0%; 0:17 took Mash Snowball 50% over Seeker Sprouts 45%, Salt Shaker 5%; 0:42 took Chives 49% over Mash Golem 27%, Fry Knives 24%; 0:47 took Max HP 70% over XP gain 17%, Pickup range 13%; 0:59 took Mash Snowball 88% over Potato Magnet 7%, Couch Potato 5%; 1:16 took Starch Puddle 46% over Mash Snowball 45%, Bacon Bits 9%; 1:25 took Chip Shuriken 47% over Seeker Sprouts 32%, Reroll 14%, Salt Shaker 7%; 1:28 took Masher Grip 44% over Sprout Squad 41%, Chip Shuriken 8%, Reroll 7%; 1:34 took Butter Pat 54% over Reroll 20%, Starch Puddle 17%, Seeker Sprouts 9%; 2:26 took Butter Pat 74% over Chip Shuriken 12%, Couch Potato 7%, Reroll 4%, Rotten Spud 3%; 3:17 took Reset Button 70% over GPU 20%, Grab Bag 5%, Reroll 5%; 3:34 took GPU 61% over Butter Socks 30%, Reroll 6%, Tater Trot 3%; 3:45 took Duration 61% over Cooldown 35%, Move speed 4%; 3:52 took Reset Button 67% over Hash Rush 17%, Big Bowl 10%, Reroll 6%; 3:55 took Chip Shuriken 63% over Potato Battery 26%, Butter Pat 7%, Reroll 4%; 3:56 took GPU 41% over Harvest Moon 31%, Reset Button 24%, Reroll 4%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 140.16, armor 17, damageMult 1, recovery 0, Seeker Sprouts 1/8, Mash Snowball 2/8, Four-Eyed Spud 1/5, Chives 1/5 | 2:00 level 9, maxHp 140.16, armor 17, damageMult 1.2, recovery 0, Seeker Sprouts 1/8, Mash Snowball 6/8, Starch Puddle 1/8, Chip Shuriken 1/8, Four-Eyed Spud 1/5, Chives 1/5, Masher Grip 1/5, Butter Pat 1/5 | 2:57 level 10, maxHp 140.16, armor 17, damageMult 1.44, recovery 0, Seeker Sprouts 1/8, Mash Avalanche 1/1, Starch Puddle 1/8, Chip Shuriken 1/8, Four-Eyed Spud 1/5, Chives 1/5, Masher Grip 1/5, Butter Pat 2/5 | 3:59 level 15, maxHp 140.16, armor 17, damageMult 1.44, recovery 0, Seeker Sprouts 1/8, Mash Avalanche 1/1, Starch Puddle 1/8, Chip Shuriken 8/8, Reset Button 2/8, Four-Eyed Spud 1/5, Chives 1/5, Masher Grip 1/5, Butter Pat 2/5, GPU 2/5.
- Passive levels first reached: Four-Eyed Spud 1 at 0:06; Chives 1 at 0:42; Masher Grip 1 at 1:29; Butter Pat 1 at 1:34; GPU 1 at 3:34.

### L4.I9.G4: near chest s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 197.5s (game clock 03:17); damage taken 198 (enemy:sprout-mite 2.999, enemy:fry-fly 26.074, boss:amusing 39.915, enemy:frost-flea 1.814); 1306 kills; level 1 to 13; planner asked 77 times, action model 173; the models saw the game 32 ms late (p90 50); ended with seeker-sprouts 8, mash-mallet 2, sprout-satellites 1, whisk-vortex 4, root-spikes 1, salt-line 1, butter-pat 1, lean-lunch 2.
- run.timeSec: 197.483
- run.level: 12
- run.kills: 1306
- run.damageBySource: seeker-sprouts 16175.618, mash-mallet 1999.383, sprout-satellites 1048.854, whisk-vortex 7850.684, dog:terrier 1783.11, dog:saluki 927.673, salt-line 2559.833, root-spikes 994.493
- run.damageTakenBySource: enemy:sprout-mite 2.999, enemy:fry-fly 26.074, boss:amusing 39.915, enemy:frost-flea 1.814, enemy:bowling-ball 97.298, boss:beetle-queen 29.918
- run.killsBySource: seeker-sprouts 723, mash-mallet 87, sprout-satellites 34, whisk-vortex 285, dog:terrier 75, dog:saluki 47, salt-line 25, root-spikes 30
- run.biomes: ["peel-forest","compost-caves","mash-swamp","fry-oil-desert","chip-canyons","crop-circle","frozen-tundra","gutterball-lanes"]
- run.dogs: [{"id":"retriever","at":14.066666666666666},{"id":"terrier","at":18.566666666666666},{"id":"saluki","at":33}]
- run.dogHelp: damage.terrier 1783.11, damage.saluki 927.673, hits.terrier 105, hits.saluki 57, fetched.retriever 514
- run.distance: 9399.746
- run.dodgePoints: 1565.886
- run.dodgeSecond: 197
- run.dodgeTaken: [75.7172707856705,75.7172707856705,75.7172707856705,75.7172707856705,75.7172707856705,80.84861855488518,89.91478522155185,97.82574251152047,97.82574251152047,106.89190917818715,115.95807584485381,115.95807584485381,124.24714251152048,162.60496556497318,179.18309889830653,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,67.24638036124662,69.06079134377671,69.06079134377671,69.06079134377671,69.06079134377671,69.06079134377671,73.97581415488783,73.97581415488783,73.97581415488783,73.97581415488783,73.97581415488783,73.97581415488783,73.97581415488783,73.97581415488783,73.97581415488783,73.97581415488783,75.7172707856705,75.7172707856705,75.7172707856705,75.7172707856705,75.7172707856705,75.7172707856705,75.7172707856705,75.7172707856705,75.7172707856705]
- run.dodgeSteps: [877.6868799999345,884.1348799999384,890.5828799999424,896.9019199999462,901.673439999949,905.8861333332832,908.5942933332833,911.990239999951,918.0083733332876,923.4246933332901,924.5853333332901,924.5853333332901,925.4235733332902,930.4100266666253,936.8580266666293,642.4315999999416,648.8795999999401,655.3275999999386,661.3457333332706,664.2473333332698,670.6953333332683,677.1433333332668,680.2598666665995,680.2598666665995,685.6331999999315,692.08119999993,698.5291999999286,699.9370133332615,703.8165599999272,709.2651199999257,713.7787199999241,718.2923199999225,724.288959999921,729.8664799999194,736.1532799999179,742.6012799999164,746.4700799999155,746.4700799999155,751.3060799999143,757.7540799999128,764.2020799999113,770.6500799999098,777.0980799999084,783.5460799999069,789.9940799999054,796.4420799999039,802.8900799999024,809.3380799999009,815.7860799998994,822.2340799999005,828.6820799999044,835.1300799999084,841.5780799999123,848.0260799999163,854.4740799999203,860.9220799999242,861.4594133332579,861.4594133332579,867.4775466665949,873.9255466665988,877.2570133332677]
- run.curseSince: 11606
- run.killer: "enemy:bowling-ball"
- run.goldEarned: 402.468
- run.goldSpent: 45
- run.bossChests: 5
- run.paidChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 159
- run.shrinesUsed: 1
- run.grokBotHelps: 4
- run.lootRunnersMet: [1,1]
- counters.kills: 1306
- counters.hits: 2916
- counters.crits: 8
- counters.gems: 741
- counters.coins: 89
- counters.shots: 1939
- counters.hostileShots: 92
- counters.nearMisses: 13
- counters.hostileHits: 4
- shrineTotals.might: 0.06
- Gold, spots and chests: gold held at the end 357, spent 45 (Potato Crate 30, Tater Slots 15); spots charged and used: Stray Dog 3, Spud Freezer 2, Tater Lantern 2, Tater Slots 1, Beetle Nest 1, Crop Patch 1, Potato Crate 1; chests seen 6, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Mash Mallet 77% over Seeker Sprouts 21%, Golden Fry 2%; 0:15 took Sprout Satellites 73% over Mash Mallet 20%, Bacon Bits 7%; 0:18 took Whisk Vortex 57% over Sprout Squad 28%, Sprout Satellites 15%; 0:24 took Root Spikes 68% over Hash Rush 19%, Sprout Satellites 13%; 0:43 took Keep the pack 48% over Swap Pip (level 1) 18%, Swap Gale (level 1) 18%, Swap Biscuit (level 1) 16%; 0:51 took Salt Line 61% over Tot Toss 21%, Mash Mallet 18%; 0:56 took Damage 88% over Gold gain 10%, Move speed 2%; 1:06 took Butter Pat 43% over Whisk Vortex 38%, Reroll 15%, Seeker Sprouts 4%; 1:24 took Seeker Sprouts 81% over Reroll 8%, Slow Cooker 7%, Fertilizer 4%; 1:28 took Keep the pack 58% over Swap Gale (level 1) 16%, Swap Pip (level 1) 15%, Swap Biscuit (level 1) 11%; 1:42 took Lean Lunch 49% over Root Spikes 36%, Reroll 8%, Fertilizer 7%; 1:42 took Leave; 2:03 took Seeker Sprouts 75% over Reroll 12%, Fertilizer 10%, Salt Line 3%; 2:22 took Whisk Vortex 46% over Fertilizer 24%, Reroll 19%, Salt Line 8%, Skip 3%; 2:48 took Mash Mallet 42% over Reroll 21%, Fertilizer 20%, Lean Lunch 13%, Skip 4%; 2:57 took Keep the pack 59% over Swap Pip (level 1) 14%, Swap Gale (level 1) 14%, Swap Biscuit (level 1) 13%; 3:00 took Lean Lunch 39% over Root Network 21%, Fertilizer 19%, Reroll 17%, Skip 4%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:56 level 6, maxHp 120, armor 0, damageMult 1.092, recovery 0, Seeker Sprouts 1/8, Mash Mallet 1/8, Sprout Satellites 1/8, Whisk Vortex 1/8, Root Spikes 1/8, Salt Line 1/8 | 1:57 level 9, maxHp 120, armor 0, damageMult 1.31, recovery 0, Seeker Sprouts 6/8, Mash Mallet 1/8, Sprout Satellites 1/8, Whisk Vortex 1/8, Root Spikes 1/8, Salt Line 1/8, Butter Pat 1/5, Lean Lunch 1/5 | 2:57 level 12, maxHp 120, armor 0, damageMult 1.31, recovery 0, Seeker Sprouts 8/8, Mash Mallet 2/8, Sprout Satellites 1/8, Whisk Vortex 2/8, Root Spikes 1/8, Salt Line 1/8, Butter Pat 1/5, Lean Lunch 1/5 | 3:17 level 13, maxHp 120, armor 0, damageMult 1.31, recovery 0, Seeker Sprouts 8/8, Mash Mallet 2/8, Sprout Satellites 1/8, Whisk Vortex 4/8, Root Spikes 1/8, Salt Line 1/8, Butter Pat 1/5, Lean Lunch 2/5.
- Passive levels first reached: Butter Pat 1 at 1:06; Lean Lunch 1 at 1:42.

### L4.I9.G5: near chest s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 186.2s (game clock 03:06); damage taken 203 (enemy:aphid 1.248, Brambles 10.9, Hot oil 45.067, enemy:tomato-leech 17.879); 896 kills; level 1 to 12; planner asked 65 times, action model 346; the models saw the game 30 ms late (p90 52); ended with seeker-sprouts 6, hash-hawk 1, whisk-vortex 1, spud-dynamo 1, potato-rain 2, broadside 2, peel-out 2.
- run.timeSec: 186.217
- run.level: 11
- run.kills: 896
- run.damageBySource: seeker-sprouts 5564.439, hash-hawk 2990.932, whisk-vortex 6132.008, dog:terrier 1481.359, spud-dynamo 1928.603, grok-bot 2030.044, potato-rain 866.003, broadside 1478.036
- run.damageTakenBySource: enemy:aphid 1.248, Brambles 10.9, Hot oil 45.067, enemy:tomato-leech 17.879, enemy:oil-drip 6.694, enemy:crumb-ant 8.449, enemy:ketchup-drop 11.301, boss:amusing 21.066, enemy:sand-crab 12.095, enemy:fry-fly 2.902, enemy:bog-slime 10.023, enemy:garden-slug 20.928, boss:beetle-queen 20.852, enemy:beetle-brood 13.733
- run.killsBySource: seeker-sprouts 316, hash-hawk 71, whisk-vortex 248, dog:terrier 68, spud-dynamo 66, grok-bot 57, potato-rain 39, broadside 31
- run.biomes: ["peel-forest","mash-swamp","ketchup-bog","fry-oil-desert","chip-canyons"]
- run.dogs: [{"id":"newfoundland","at":3.4833333333333334},{"id":"terrier","at":33.083333333333336},{"id":"husky","at":37.81666666666667}]
- run.dogHelp: damage.terrier 1481.359, hits.terrier 96, finds.husky 15, blocked.newfoundland 6
- run.distance: 9700.315
- run.dodgePoints: 1166.496
- run.dodgeSecond: 186
- run.dodgeTaken: [169.88242400127004,181.6684406679367,186.24596630233322,188.82672230302765,86.57387978148746,86.57387978148746,86.57387978148746,104.31396867037634,104.31396867037634,106.47440632583911,108.15845792068234,115.46438428075844,115.46438428075844,115.46438428075844,115.46438428075844,115.46438428075844,115.46438428075844,115.46438428075844,115.46438428075844,115.46438428075844,119.85428759209462,119.85428759209462,119.85428759209462,124.50908112412824,124.50908112412824,126.85654918001293,126.85654918001293,126.85654918001293,126.85654918001293,126.85654918001293,126.85654918001293,126.85654918001293,129.1559127669592,129.1559127669592,129.1559127669592,133.24404857787306,137.326443852805,137.326443852805,137.326443852805,137.326443852805,137.326443852805,137.326443852805,137.326443852805,137.326443852805,137.326443852805,137.326443852805,137.326443852805,137.326443852805,137.326443852805,158.25429548971167,158.25429548971167,158.25429548971167,158.25429548971167,158.25429548971167,158.25429548971167,158.25429548971167,158.25429548971167,158.25429548971167,158.25429548971167,158.25429548971167,158.25429548971167]
- run.dodgeSteps: [951.2248333332598,956.2881666665908,962.4881666665879,968.688166666585,639.3439999999861,645.5439999999832,651.7439999999823,655.8773333333138,662.0773333333117,668.2773333333091,674.4773333333071,680.6773333333097,686.8773333333116,693.0773333333133,699.2773333333158,705.4773333333184,711.6773333333194,717.877333333322,722.4239999999876,727.5906666666551,732.5506666666572,738.7506666666598,744.9506666666623,751.1506666666628,757.3506666666653,763.5506666666679,769.7506666666704,775.9506666666717,782.1506666666722,788.3506666666715,794.550666666669,800.7506666666661,806.9506666666657,813.1506666666683,816.1473333333362,816.1473333333362,819.5573333333372,825.7573333333343,831.2598333333311,835.2278333333276,841.4278333333247,847.6278333333217,853.8278333333188,860.0278333333159,863.9958333333122,867.4058333333085,871.1413333333048,876.5508333333016,882.7508333332987,886.7653333332952,890.1753333332914,895.3058333332881,901.040833333285,905.4738333332816,907.1219999999464,910.6714999999427,916.8714999999398,923.0714999999369,929.271499999934,935.4714999999311,941.6714999999282]
- run.curseSince: 10212
- run.killer: "enemy:ketchup-drop"
- run.goldEarned: 203.44
- run.goldSpent: 30
- run.bossChests: 3
- run.paidChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 4
- run.peakEnemies: 140
- run.shrinesUsed: 1
- run.grokBotHelps: 3
- run.botSwarms: 2
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 896
- counters.hits: 2684
- counters.gems: 654
- counters.coins: 52
- counters.shots: 644
- counters.hostileShots: 84
- counters.nearMisses: 11
- counters.hostileHits: 3
- shrineTotals.maxHp: 12
- Gold, spots and chests: gold held at the end 173, spent 30 (Potato Crate 30); spots charged and used: Stray Dog 3, Crop Patch 1, Potato Crate 1, Frenzy Fryer 1, Spud Freezer 1; chests seen 5, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:15 took Max HP 85% over XP gain 13%, Luck 2%; 0:17 took Hash Hawk 43% over Big Bowl 39%, Mezzaluna 18%; 0:22 took Whisk Vortex 49% over Hash Hawk 38%, Peeler 13%; 0:33 took Spud Dynamo 53% over Butter Pat 44%, Gem Sling 3%; 1:02 took Keep the pack 57% over Swap Pip (level 1) 17%, Swap Echo (level 1) 17%, Swap Buoy (level 1) 9%; 1:09 took Peel Out 64% over Spud Dynamo 30%, Four-Eyed Spud 6%; 1:14 took Potato Rain 52% over Mash Landing 34%, Seeker Sprouts 14%; 1:56 took Seeker Sprouts 46% over Hash Hawk 37%, Potato Rain 17%; 2:12 took Broadside 72% over Chives 21%, Fertilizer 7%; 2:25 took Broadside 46% over Potato Rain 34%, Fertilizer 20%; 2:34 took Potato Rain 40% over Spud Dynamo 39%, Fertilizer 21%; 2:35 took Seeker Sprouts 74% over Spud Dynamo 18%, Fertilizer 8%; 2:50 took Peel Out 83% over Big Bowl 13%, Fertilizer 4%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:57 level 4, maxHp 144, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 1/8, Hash Hawk 1/8, Whisk Vortex 1/8, Spud Dynamo 1/8 | 2:00 level 7, maxHp 144, armor 0, damageMult 1.07, recovery 0, Seeker Sprouts 4/8, Hash Hawk 1/8, Whisk Vortex 1/8, Spud Dynamo 1/8, Potato Rain 1/8, Peel Out 1/5 | 2:59 level 12, maxHp 144, armor 0, damageMult 1.07, recovery 0, Seeker Sprouts 6/8, Hash Hawk 1/8, Whisk Vortex 1/8, Spud Dynamo 1/8, Potato Rain 2/8, Broadside 2/8, Peel Out 2/5 | 3:05 level 12, maxHp 144, armor 0, damageMult 1.07, recovery 0, Seeker Sprouts 6/8, Hash Hawk 1/8, Whisk Vortex 1/8, Spud Dynamo 1/8, Potato Rain 2/8, Broadside 2/8, Peel Out 2/5.
- Passive levels first reached: Peel Out 1 at 1:09.

### L4.I9.G6: near chest s36

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 36; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240s (game clock 04:00), health 113/120; damage taken 77 (enemy:tomato-leech 2.338, enemy:potato-beetle 8.316, boss:amusing 9.463, enemy:sprout-mite 1.562); 1679 kills; level 1 to 15; planner asked 96 times, action model 285; the models saw the game 30 ms late (p90 50); ended with seeker-sprouts 8, frozen-fries 1, mash-wave 1, mash-landing 1, julienne-dash 2, eclipse-scythe 1, big-bowl 5, fertilizer 2.
- run.timeSec: 240.033
- run.level: 14
- run.kills: 1679
- run.damageBySource: seeker-sprouts 17173.413, frozen-fries 2932.71, dog:dalmatian 792.176, mash-wave 15113.941, julienne-dash 2491.442, comet-scythe 5150.595, grok-bot 4625.313, eclipse-scythe 5232.585
- run.damageTakenBySource: enemy:tomato-leech 2.338, enemy:potato-beetle 8.316, boss:amusing 9.463, enemy:sprout-mite 1.562, enemy:compost-maggot 1.573, enemy:fry-fly 22.713, enemy:sand-crab 5.651, boss:beetle-queen 25.85
- run.killsBySource: seeker-sprouts 579, frozen-fries 71, dog:dalmatian 38, mash-wave 465, julienne-dash 29, comet-scythe 167, grok-bot 178, eclipse-scythe 152
- run.evolutions: [{"id":"eclipse-scythe","at":217.7}]
- run.biomes: ["mash-swamp","fry-oil-desert","ketchup-bog","chip-canyons"]
- run.dogs: [{"id":"beagle","at":4.083333333333333},{"id":"dalmatian","at":8.133333333333333},{"id":"corgi","at":13.266666666666667}]
- run.dogHelp: damage.dalmatian 792.176, hits.dalmatian 69, frozen.corgi 68, gold.beagle 90, finds.beagle 30
- run.distance: 11540.577
- run.dodgePoints: 2051.209
- run.dodgeSecond: 240
- run.dodgeTaken: [51.61560939547436,54.200590800433034,54.200590800433034,54.200590800433034,54.200590800433034,54.200590800433034,54.200590800433034,56.785572205391716,56.785572205391716,56.785572205391716,56.785572205391716,56.785572205391716,56.785572205391716,56.785572205391716,56.785572205391716,56.785572205391716,56.785572205391716,56.785572205391716,61.95553501530907,68.84881876186554,68.84881876186554,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,77.46542344506113,51.61560939547436,51.61560939547436,51.61560939547436]
- run.dodgeSteps: [854.1843333333516,860.3843333333486,866.5843333333457,872.7843333333428,878.9843333333399,885.184333333337,891.3843333333341,897.5843333333312,903.7843333333283,906.8843333333268,912.9809999999907,916.390999999989,921.45433333332,924.1409999999854,925.5876666666514,931.0643333333155,937.2643333333126,943.4643333333097,946.0476666666418,947.3909999999745,953.5909999999716,959.7909999999687,965.9909999999658,972.1909999999629,978.39099999996,984.590999999957,990.7909999999541,996.9909999999512,1003.1909999999483,1009.3909999999454,1015.5909999999425,1018.8976666666076,1024.167666666605,1024.167666666605,1026.5443333332707,1026.5443333332707,1030.7809999999354,1036.9809999999325,1043.1809999999296,1049.3809999999266,1055.5809999999237,1061.7809999999208,1067.980999999918,1069.5309999999172,1073.2509999999154,1079.4509999999125,1085.6509999999096,1091.8509999999067,1098.0509999999038,1104.2509999999008,1110.450999999898,1116.650999999895,1122.850999999892,1129.0509999998892,1135.2509999998863,1141.4509999998834,1147.6509999998805,1153.8509999998776,839.4076666666919,841.7843333333574,847.9843333333545]
- run.curseSince: 14273
- run.goldEarned: 710.027
- run.goldSpent: 30
- run.bossChests: 10
- run.paidChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 8
- run.peakEnemies: 153
- run.grokBotHelps: 7
- run.botSwarms: 3
- run.lootRunnersMet: [1]
- counters.kills: 1679
- counters.hits: 3208
- counters.gems: 369
- counters.coins: 176
- counters.shots: 1468
- counters.hostileShots: 269
- counters.nearMisses: 15
- counters.hostileHits: 6
- Gold, spots and chests: gold held at the end 673, spent 30 (Potato Crate 30); spots charged and used: Stray Dog 3, Crop Patch 3, Tater Lantern 3, Beetle Nest 2, Potato Crate 1, Bot Dock 1; chests seen 10, opened 9.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Frozen Fries 69% over Starch Plating 13%, Big Bowl 11%, Reroll 7%; 0:19 took Mash Wave 70% over Seeker Sprouts 20%, Reroll 7%, Golden Fry 3%; 0:23 took Keep the pack 48% over Swap Waffles (level 1) 24%, Swap Sprinkles (level 1) 15%, Swap Scout (level 1) 13%; 0:23 took Mash Landing 36% over Broadside 29%, Sprout Satellites 21%, Reroll 14%; 0:24 took Julienne Dash 50% over Mash Landing 20%, Skillet Flail 20%, Reroll 10%; 0:56 took Keep the pack 39% over Swap Waffles (level 1) 37%, Swap Sprinkles (level 1) 13%, Swap Scout (level 1) 11%; 0:58 took Comet Scythe 84% over Julienne Dash 7%, Reroll 6%, Frozen Fries 3%; 1:02 took Keep the pack 46% over Swap Waffles (level 1) 34%, Swap Sprinkles (level 1) 11%, Swap Scout (level 1) 9%; 1:18 took Keep the pack 40% over Swap Waffles (level 1) 33%, Swap Sprinkles (level 1) 15%, Swap Scout (level 1) 12%; 1:25 took Big Bowl 67% over Mash Wave 14%, Reroll 11%, Masher Grip 8%; 1:45 took Big Bowl 79% over Seeker Sprouts 7%, Julienne Dash 7%, Reroll 6%, Skip 1%; 2:36 took Comet Scythe 57% over Mash Wave 17%, Couch Potato 13%, Reroll 11%, Skip 2%; 2:51 took Big Bowl 69% over Mash Landing 12%, Gravy Splash 11%, Reroll 5%, Fertilizer 2%, Skip 1%; 3:20 took Big Bowl 79% over Fertilizer 11%, Sprouting Eyes 5%, Reroll 4%, Skip 1%; 3:29 took Big Bowl 70% over Comet Scythe 22%, Reroll 5%, Fertilizer 2%, Skip 1%; 3:56 took Julienne Dash 47% over Fertilizer 31%, Lean Lunch 10%, Reroll 10%, Skip 2%; 3:57 took Fertilizer 73% over Julienne Dash 15%, Reroll 7%, Frozen Fries 4%, Skip 1%; 3:57 took Fertilizer 59% over Hot Start 28%, Julienne Dash 8%, Reroll 4%, Skip 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 6, maxHp 120, armor 6, damageMult 1, recovery 0, Seeker Sprouts 1/8, Frozen Fries 1/8, Mash Wave 1/8, Mash Landing 1/8, Julienne Dash 1/8, Comet Scythe 1/8 | 2:00 level 8, maxHp 120, armor 6, damageMult 1, recovery 0, Seeker Sprouts 3/8, Frozen Fries 1/8, Mash Wave 1/8, Mash Landing 1/8, Julienne Dash 1/8, Comet Scythe 1/8, Big Bowl 2/5 | 2:56 level 10, maxHp 120, armor 6, damageMult 1.04, recovery 0, Seeker Sprouts 8/8, Frozen Fries 1/8, Mash Wave 1/8, Mash Landing 1/8, Julienne Dash 1/8, Comet Scythe 3/8, Big Bowl 3/5 | 3:58 level 15, maxHp 120, armor 6, damageMult 1.04, recovery 0, Seeker Sprouts 8/8, Frozen Fries 1/8, Mash Wave 1/8, Mash Landing 1/8, Julienne Dash 2/8, Eclipse Scythe 1/1, Big Bowl 5/5, Fertilizer 2/5.
- Passive levels first reached: Big Bowl 1 at 1:25, 3 at 2:51, 5 at 3:29; Fertilizer 1 at 3:57.

### L4.I9.G7: near chest s37

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 37; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240s (game clock 04:00), health 156/156; damage taken 156 (enemy:aphid 1.157, Spore vent 32.667, enemy:cave-grub 19.295, enemy:compost-maggot 1.567); 2095 kills; level 1 to 12; planner asked 84 times, action model 448; the models saw the game 30 ms late (p90 49); ended with seeker-sprouts 1, factory-reset 1, gratin-arc 1, tater-pup 1, gem-sling 1, spud-dynamo 2, four-eyed-spud 2, hot-sauce 1.
- run.timeSec: 239.983
- run.level: 11
- run.kills: 2095
- run.damageBySource: seeker-sprouts 5252.624, reset-button 927.243, starch-chain 14501.604, tater-pup 2329.446, dog:terrier 1486.808, grok-bot 869.921, gem-sling 3026.821, spud-dynamo 2965.703, static-tot 4905.224, boom-spud 666.407, factory-reset 2230.263, gratin-arc 15891.146
- run.damageTakenBySource: enemy:aphid 1.157, Spore vent 32.667, enemy:cave-grub 19.295, enemy:compost-maggot 1.567, boss:amusing 65.417, enemy:swarm-fly 2.772, boss:beetle-queen 23.572, enemy:beetle-brood 9.426
- run.killsBySource: seeker-sprouts 246, reset-button 67, starch-chain 673, tater-pup 66, dog:terrier 58, grok-bot 13, gem-sling 103, spud-dynamo 73, static-tot 142, boom-spud 35, factory-reset 55, gratin-arc 564
- run.evolutions: [{"id":"factory-reset","at":147.85},{"id":"gratin-arc","at":209.31666666666666}]
- run.biomes: ["compost-caves","crop-circle","peel-forest","fry-oil-desert"]
- run.dogs: [{"id":"whippet","at":7.95},{"id":"terrier","at":45.61666666666667},{"id":"beagle","at":62.733333333333334}]
- run.dogHelp: damage.terrier 1486.808, hits.terrier 98, gold.beagle 69, finds.beagle 23, blocked.whippet 5
- run.distance: 13176.698
- run.dodgePoints: 1645.985
- run.dodgeSecond: 239
- run.dodgeTaken: [120.87289808639699,132.65891475306364,132.65891475306364,132.65891475306364,132.65891475306364,132.65891475306364,132.65891475306364,132.65891475306364,132.65891475306364,132.65891475306364,132.65891475306364,132.65891475306364,132.65891475306364,135.37876475306365,135.37876475306365,144.8048864421571,144.8048864421571,144.8048864421571,148.27155310882378,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,155.87155310882375,111.80673141973031,111.80673141973031,111.80673141973031,111.80673141973031]
- run.dodgeSteps: [1029.2664713408083,1035.4664713408054,1041.6664713408024,1047.8664713407995,1054.0664713407966,1060.2664713407937,1064.9164713407915,1071.1164713407886,1077.3164713407857,1083.5164713407828,1089.71647134078,1093.9531380074445,1100.1531380074416,1105.1131380074394,1110.6931380074368,1116.893138007434,1123.093138007431,1129.293138007428,1133.4264713407595,1135.389804674092,1141.3831380074223,1145.8264713407536,1152.0264713407507,1158.2264713407478,1164.426471340745,1170.626471340742,1170.9364713407417,1173.3131380074074,1179.5131380074045,1185.7131380074015,1190.983138007399,1194.0831380073976,1200.2831380073947,1206.0698046740586,1206.0698046740586,1206.0698046740586,1206.0698046740586,1209.479804674057,1215.6798046740541,1221.8798046740512,1228.0798046740483,1234.2798046740454,1240.4798046740425,1246.6798046740396,1252.8798046740367,1259.0798046740338,1265.2798046740309,1271.479804674028,1277.679804674025,1283.8798046740221,1290.0798046740192,1296.2798046740163,1302.4798046740134,1308.6798046740105,1314.8798046740076,1317.6698046740062,1317.6698046740062,1001.8957082935524,1008.0957082935495,1014.2957082935466,1020.4957082935437]
- run.curseSince: 9622
- run.goldEarned: 614.035
- run.goldSpent: 376
- run.bossChests: 8
- run.paidChests: 4
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 158
- run.shrinesUsed: 1
- run.grokBotHelps: 6
- run.botSwarms: 1
- run.lootRunnersMet: [1,1]
- counters.kills: 2095
- counters.hits: 3626
- counters.crits: 245
- counters.gems: 419
- counters.coins: 131
- counters.shots: 1230
- counters.hostileShots: 212
- counters.nearMisses: 30
- counters.hostileHits: 2
- shrineTotals.area: 0.06
- Gold, spots and chests: gold held at the end 234, spent 373 (Potato Crate 373); spots charged and used: Crop Patch 4, Stray Dog 3, Potato Crate 2, Frenzy Fryer 1; chests seen 8, opened 7.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Reset Button 84% over Frozen Fries 12%, Masher Grip 4%; 0:14 took Area 63% over Gold gain 27%, Duration 10%; 0:17 took Reset Button 59% over Starch Puddle 27%, Gravy Splash 14%; 0:24 took Starch Chain 78% over Root Network 18%, Tater Trot 4%; 0:41 took Tater Tot Pup 51% over Starch Chain 41%, Seeker Sprouts 8%; 1:07 took Gem Sling 51% over Starch Chain 40%, Spud Sneakers 9%; 1:14 took Spud Dynamo 53% over Skillet Flail 31%, Masher Grip 8%, Reroll 8%; 1:53 took Four-Eyed Spud 45% over Spud Dynamo 44%, Reroll 9%, Golden Fry 2%; 2:08 took Four-Eyed Spud 75% over Thick Skin 13%, Sour Cream 9%, Reroll 3%, Golden Fry 0%; 2:29 took Hot Sauce 36% over Clean Plate 20%, Seeker Sprouts 18%, Reroll 15%, Gem Sling 11%; 3:06 took Starch Chain 74% over Four-Eyed Spud 11%, Mash Finisher 10%, Reroll 3%, Hash Rush 2%; 3:32 took Spud Dynamo 40% over Gem Sling 24%, Salt Shaker 19%, Reroll 17%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 132, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 1/8, Reset Button 2/8, Starch Chain 1/8, Tater Tot Pup 1/8 | 1:59 level 8, maxHp 132, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 1/8, Reset Button 4/8, Starch Chain 1/8, Tater Tot Pup 1/8, Gem Sling 1/8, Spud Dynamo 1/8, Four-Eyed Spud 1/5 | 2:57 level 10, maxHp 156, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 1/8, Factory Reset 1/1, Starch Chain 5/8, Tater Tot Pup 1/8, Gem Sling 1/8, Spud Dynamo 1/8, Four-Eyed Spud 2/5, Hot Sauce 1/5 | 3:58 level 12, maxHp 156, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 1/8, Factory Reset 1/1, Gratin Arc 1/1, Tater Tot Pup 1/8, Gem Sling 1/8, Spud Dynamo 2/8, Four-Eyed Spud 2/5, Hot Sauce 1/5.
- Passive levels first reached: Four-Eyed Spud 1 at 1:53; Hot Sauce 1 at 2:29.

### L4.I9.G8: near chest s38

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 38; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 132.1s (game clock 02:12); damage taken 123 (enemy:frost-flea 1.261, Hot oil 5, Spore vent 8.667, enemy:cave-grub 48.536); 556 kills; level 1 to 7; planner asked 48 times, action model 185; the models saw the game 31 ms late (p90 49); ended with seeker-sprouts 5, starch-puddle 1, starch-chain 2, locked-gatling 1.
- run.timeSec: 132.117
- run.level: 6
- run.kills: 556
- run.damageBySource: seeker-sprouts 4023.436, dog:greyhound 266.59, starch-puddle 1361.748, starch-chain 3152.269, locked-gatling 2034.287, grok-bot 201.672, heavy-russet 330.298, dog:saluki 157.593
- run.damageTakenBySource: enemy:frost-flea 1.261, Hot oil 5, Spore vent 8.667, enemy:cave-grub 48.536, boss:amusing 57.655, enemy:compost-maggot 1.678
- run.killsBySource: seeker-sprouts 233, dog:greyhound 17, starch-puddle 43, starch-chain 177, locked-gatling 81, grok-bot 4, dog:saluki 1
- run.biomes: ["compost-caves"]
- run.dogs: [{"id":"greyhound","at":3.2333333333333334},{"id":"saluki","at":120.45}]
- run.dogHelp: damage.greyhound 266.59, damage.saluki 157.593, hits.greyhound 18, hits.saluki 6
- run.distance: 7565.645
- run.dodgePoints: 1245.584
- run.dodgeSecond: 132
- run.dodgeTaken: [14.927853390996258,14.927853390996258,14.927853390996258,20.320706770167433,31.106413528509783,31.106413528509783,34.43268019517645,52.82875144380108,91.18242269242572,104.4874893590924,119.47091547755491,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,1.2611867243295838,2.261186724329584,6.261186724329583,6.261186724329583,6.261186724329583,6.261186724329583,6.261186724329583,6.261186724329583,6.261186724329583,6.261186724329583,6.261186724329583,6.261186724329583,6.261186724329583,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,9.061186724329584,12.527853390996256,14.927853390996258,14.927853390996258,14.927853390996258]
- run.dodgeSteps: [687.4291333333906,694.2491333333885,701.0691333333864,704.2518000000521,711.07180000005,717.8918000000479,724.7118000000457,731.5318000000436,738.3518000000415,745.1718000000394,755.7688000000373,391.7345999999805,393.5966666666469,400.1686666666461,406.7406666666453,413.31266666664607,419.884666666648,426.45666666664994,428.97593333331736,428.97593333331736,434.8907333333191,441.462733333321,448.03473333332295,454.6067333333249,461.1787333333268,467.75073333332875,474.3227333333307,480.8947333333326,487.46673333333456,494.0387333333365,500.61073333333843,507.18273333334037,513.7547333333423,520.3267333333442,526.8987333333462,533.4707333333481,540.04273333335,546.614733333352,553.1867333333539,559.7587333333558,566.3307333333578,572.9027333333597,579.4747333333617,586.0467333333636,592.6187333333655,599.1907333333675,605.7627333333694,612.3347333333713,618.9067333333733,625.4787333333752,630.2982000000433,630.2982000000433,636.8702000000452,643.4422000000471,650.0142000000491,656.586200000051,663.158200000053,669.7302000000549,676.3022000000568,682.6551333333921,682.6551333333921]
- run.curseSince: 7227
- run.killer: "boss:amusing"
- run.goldEarned: 93.747
- run.goldSpent: 30
- run.bossChests: 2
- run.paidChests: 1
- run.elitesKilled: 3
- run.peakEnemies: 98
- run.shrinesUsed: 2
- run.grokBotHelps: 2
- counters.kills: 556
- counters.hits: 1093
- counters.gems: 118
- counters.coins: 27
- counters.shots: 1571
- counters.hostileShots: 70
- counters.nearMisses: 3
- counters.hostileHits: 4
- shrineTotals.might: 0.072
- shrineTotals.cooldown: 0.036
- Gold, spots and chests: gold held at the end 63, spent 30 (Potato Crate 30); spots charged and used: Stray Dog 2, Crop Patch 2, Potato Crate 1, Tater Lantern 1, Beetle Nest 1; chests seen 3, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:18 took Seeker Sprouts 41% over Lean Lunch 37%, Mash Finisher 22%; 0:23 took Starch Puddle 76% over Seeker Sprouts 19%, Slow Cooker 5%; 0:36 took Starch Chain 43% over Potato Rain 42%, Reroll 10%, Spud Sneakers 5%; 0:52 took Locked Gatling 79% over Seeker Sprouts 9%, Fertilizer 8%, Reroll 4%; 1:04 took Damage 93% over Gold gain 4%, Move speed 3%; 1:10 took Starch Chain 37% over Root Spikes 29%, Rösti Disc 21%, Reroll 13%; 1:12 took Cooldown 58% over Luck 38%, Crit 4%; 1:24 took Seeker Sprouts 39% over Locked Gatling 38%, Reroll 15%, Fertilizer 8%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:55 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Starch Puddle 1/8, Starch Chain 1/8, Locked Gatling 1/8 | 2:00 level 7, maxHp 120, armor 0, damageMult 1.072, recovery 0, Seeker Sprouts 5/8, Starch Puddle 1/8, Starch Chain 2/8, Locked Gatling 1/8 | 2:11 level 7, maxHp 120, armor 0, damageMult 1.072, recovery 0, Seeker Sprouts 5/8, Starch Puddle 1/8, Starch Chain 2/8, Locked Gatling 1/8.

### L4.I9.G9: near chest s39

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 39; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 198.2s (game clock 03:18); damage taken 233 (enemy:sprout-mite 6.575, enemy:potato-beetle 18.194, enemy:frost-flea 19.44, enemy:snow-mold 90.132); 859 kills; level 1 to 13; planner asked 66 times, action model 399; the models saw the game 29 ms late (p90 48); ended with seeker-sprouts 7, harvest-moon 1, root-spikes 1, potato-battery 1, sprout-squad 1, hot-start 1, gravy-heart 1.
- run.timeSec: 198.2
- run.level: 12
- run.kills: 859
- run.damageBySource: seeker-sprouts 7297.806, dog:dalmatian 812.922, harvest-moon 3651.526, root-spikes 3342.495, potato-battery 3454.735, grok-bot 73.12, sprout-squad 576.655
- run.damageTakenBySource: enemy:sprout-mite 6.575, enemy:potato-beetle 18.194, enemy:frost-flea 19.44, enemy:snow-mold 90.132, enemy:crumb-ant 6.243, enemy:aphid 6.869, enemy:oil-drip 6.246, enemy:sand-crab 17.508, boss:amusing 33.263, enemy:cave-grub 9.583, Brambles 0.4, enemy:wireworm-larva 3.693, enemy:compost-maggot 7.417, boss:beetle-queen 2.72, enemy:beetle-brood 4.645
- run.killsBySource: seeker-sprouts 384, dog:dalmatian 42, harvest-moon 138, root-spikes 141, potato-battery 136, grok-bot 6, sprout-squad 12
- run.biomes: ["frozen-tundra","fry-oil-desert","chip-canyons","compost-caves"]
- run.dogs: [{"id":"retriever","at":14.516666666666667},{"id":"dalmatian","at":27.483333333333334}]
- run.dogHelp: damage.dalmatian 812.922, hits.dalmatian 65, fetched.retriever 466
- run.distance: 10986.97
- run.dodgePoints: 1295.559
- run.dodgeSecond: 198
- run.dodgeTaken: [145.89222349285805,149.53974185496347,151.45136258770415,151.45136258770415,151.45136258770415,151.45136258770415,151.45136258770415,157.33346592474672,157.33346592474672,157.33346592474672,157.33346592474672,157.33346592474672,161.9308419921396,173.2418429492834,177.203520410404,213.57720469390108,105.35493949257032,105.35493949257032,105.35493949257032,110.56565479977715,110.56565479977715,110.56565479977715,110.56565479977715,110.56565479977715,110.56565479977715,110.56565479977715,110.56565479977715,110.56565479977715,110.56565479977715,113.89192146644382,117.21818813311049,117.21818813311049,117.21818813311049,117.21818813311049,117.21818813311049,123.06070618242555,123.06070618242555,123.06070618242555,123.06070618242555,123.06070618242555,123.06070618242555,123.06070618242555,123.06070618242555,123.06070618242555,123.46070618242555,123.46070618242555,126.78697284909221,126.78697284909221,126.78697284909221,126.78697284909221,126.78697284909221,126.78697284909221,126.78697284909221,126.78697284909221,126.78697284909221,126.78697284909221,126.78697284909221,133.43950618242556,133.43950618242556,133.43950618242556,145.89222349285805]
- run.dodgeSteps: [1006.3789999998211,1010.7189999998212,1016.8569999998184,1023.0569999998155,1029.2569999998127,1035.4569999998098,1041.6569999998069,1047.856999999804,1054.056999999801,1060.2569999997982,1066.4569999997952,1072.6569999997923,1078.8569999997894,1085.0569999997865,1091.2569999997836,1097.4569999997807,758.3583333332142,764.5583333332168,770.2933333332187,776.4933333332212,781.2466666665565,786.1033333332236,792.3033333332262,798.5033333332287,804.1143333332295,810.3143333332321,816.5143333332336,822.714333333233,828.91433333323,833.5643333332279,839.764333333225,845.964333333222,852.1643333332191,854.6443333332179,859.2943333332157,865.4943333332128,871.6943333332099,877.894333333207,884.0943333332041,890.2943333332012,896.4943333331983,902.6943333331953,908.8943333331924,915.0943333331895,921.2943333331866,927.4943333331837,933.6943333331808,939.8943333331779,946.094333333175,952.2943333331721,958.4943333331692,964.6943333331662,970.8943333331633,977.0943333331604,982.2713333331592,987.2933333331582,991.6333333331584,994.226999999824,994.226999999824,996.3969999998229,1001.8219999998213]
- run.curseSince: 10971
- run.killer: "enemy:snow-mold"
- run.goldEarned: 107.572
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 171
- run.shrinesUsed: 1
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 859
- counters.hits: 1801
- counters.gems: 769
- counters.coins: 52
- counters.shots: 541
- counters.hostileShots: 437
- counters.nearMisses: 18
- counters.hostileHits: 9
- shrineTotals.growth: 0.072
- Gold, spots and chests: gold held at the end 107, spent 0; spots charged and used: Tater Lantern 6, Stray Dog 3, Crop Patch 1, Beetle Nest 1; chests seen 3, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Hot Start 36% over GPU 35%, Seeker Sprouts 29%; 0:15 took Seeker Sprouts 44% over Potato Rain 34%, Rösti Disc 22%; 0:18 took Seeker Sprouts 46% over GPU 46%, Sour Cream 8%; 0:38 took Harvest Moon 39% over Seeker Sprouts 38%, Hash Hawk 23%; 0:45 took Seeker Sprouts 50% over Fry Knives 44%, Spud Sneakers 6%; 1:06 took Root Spikes 38% over Fertilizer 32%, Chip Shuriken 20%, Reroll 10%; 1:33 took Potato Battery 79% over Fertilizer 10%, Reroll 6%, Sour Cream 4%, Skip 1%; 1:42 took Seeker Sprouts 68% over Fertilizer 12%, Reroll 11%, Clean Plate 7%, Skip 2%; 1:57 took Gravy Heart 71% over Four-Eyed Spud 11%, Fertilizer 9%, Reroll 8%, Skip 1%; 2:26 took Seeker Sprouts 65% over Fertilizer 16%, Reroll 12%, Root Spikes 5%, Skip 2%; 2:59 took Sprout Squad 63% over Fertilizer 15%, Big Bowl 12%, Reroll 8%, Skip 2%; 3:02 took XP gain 66% over Cooldown 25%, Crit 9%; 3:17 took Seeker Sprouts 71% over Reroll 12%, Sprout Squad 8%, Fertilizer 6%, Skip 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 4/8, Harvest Moon 1/8, Hot Start 1/5 | 2:00 level 10, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Harvest Moon 1/8, Root Spikes 1/8, Potato Battery 1/8, Hot Start 1/5, Gravy Heart 1/5 | 2:59 level 12, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 6/8, Harvest Moon 1/8, Root Spikes 1/8, Potato Battery 1/8, Sprout Squad 1/8, Hot Start 1/5, Gravy Heart 1/5 | 3:18 level 13, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 7/8, Harvest Moon 1/8, Root Spikes 1/8, Potato Battery 1/8, Sprout Squad 1/8, Hot Start 1/5, Gravy Heart 1/5.
- Passive levels first reached: Hot Start 1 at 0:10; Gravy Heart 1 at 1:57.

### L4.I9.G10: near chest s40

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 40; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 209.2s (game clock 03:29); damage taken 262 (enemy:frost-flea 2.647, enemy:snow-mold 71.951, Brambles 2.062, enemy:sprout-mite 2.609); 1525 kills; level 1 to 14; planner asked 72 times, action model 344; the models saw the game 29 ms late (p90 49); ended with seeker-sprouts 1, chip-shuriken 1, mash-mortar 5, rosti-disc 1, tailgate-fries 1, mash-mallet 1, chives 2, gravy-splash 1, big-bowl 2, butter-pat 1.
- run.timeSec: 209.15
- run.level: 13
- run.kills: 1525
- run.damageBySource: seeker-sprouts 4100.023, chip-shuriken 7656.242, mash-mortar 12327.647, rosti-disc 3742.72, tailgate-fries 3304.458, grok-bot 749.98, mash-mallet 4321.612, gravy-splash 301.393
- run.damageTakenBySource: enemy:frost-flea 2.647, enemy:snow-mold 71.951, Brambles 2.062, enemy:sprout-mite 2.609, Spore vent 1.12, enemy:compost-maggot 8.28, enemy:swarm-fly 4.32, boss:amusing 80.669, enemy:potato-beetle 2.625, enemy:wireworm-larva 5.328, enemy:aphid 4.065, enemy:cave-grub 18.424, enemy:lint-bunny 18.267, enemy:sock-pile 2.881, boss:beetle-queen 25.275, enemy:beetle-brood 10.993
- run.killsBySource: seeker-sprouts 254, chip-shuriken 206, mash-mortar 562, rosti-disc 99, tailgate-fries 98, grok-bot 55, mash-mallet 233, gravy-splash 18
- run.biomes: ["compost-caves","frozen-tundra","peel-forest","coin-laundromat"]
- run.dogs: [{"id":"retriever","at":3.0833333333333335},{"id":"dachshund","at":38.13333333333333},{"id":"newfoundland","at":42.6}]
- run.dogHelp: fetched.retriever 520, gold.dachshund 174, finds.dachshund 6, blocked.newfoundland 12
- run.distance: 10664.582
- run.dodgePoints: 1366.102
- run.dodgeSecond: 209
- run.dodgeTaken: [126.34008815883713,128.70965444671592,128.70965444671592,134.1262173275734,134.1262173275734,149.52395849364746,157.42251278657673,164.42971247861803,164.42971247861803,167.56585588154897,167.56585588154897,167.56585588154897,167.56585588154897,170.7229482728665,177.02660158779534,177.02660158779534,190.64055302301765,190.64055302301765,193.74545168292116,193.74545168292116,193.74545168292116,193.74545168292116,193.74545168292116,214.69444476383228,227.60220932964012,234.0603557300101,251.80797992464514,113.51445166995856,113.51445166995856,114.89061219571906,114.89061219571906,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,117.62984581385106,121.95800687908797,123.39854763895755,123.39854763895755,124.86039508290335,124.86039508290335,124.86039508290335,126.34008815883713,126.34008815883713,126.34008815883713,126.34008815883713]
- run.dodgeSteps: [910.5385333332948,916.9865333332988,918.1686666666328,922.3598666666354,928.8078666666394,935.2558666666433,941.7038666666473,948.1518666666512,954.5998666666552,959.3283999999915,965.7763999999954,972.2243999999994,978.6724000000033,985.1204000000073,991.5684000000113,998.0164000000152,1004.4644000000192,1010.9124000000231,1017.3604000000271,1023.808400000031,1030.256400000035,1036.0273600000369,1041.3469600000376,1047.0856800000397,1051.599280000038,1060.4615200000378,1065.7811200000385,749.5534666665883,754.2819999999206,760.5150666665858,766.9630666665843,772.4438666665831,772.4438666665831,776.4201333332487,782.8681333332472,789.3161333332457,795.7641333332442,802.2121333332427,808.6601333332412,815.1081333332397,821.5561333332402,828.0041333332441,834.4521333332481,840.900133333252,847.348133333256,851.9691999999255,851.9691999999255,851.9691999999255,851.9691999999255,851.9691999999255,851.9691999999255,855.0857333332608,855.0857333332608,858.9545333332632,865.4025333332671,871.8505333332711,878.298533333275,884.746533333279,891.194533333283,897.6425333332869,904.0905333332909]
- run.curseSince: 11278
- run.killer: "enemy:snow-mold"
- run.goldEarned: 402.499
- run.goldSpent: 30
- run.bossChests: 2
- run.paidChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 2
- run.peakEnemies: 179
- run.shrinesUsed: 1
- run.grokBotHelps: 3
- run.botSwarms: 2
- run.lootRunnersMet: [1]
- counters.kills: 1525
- counters.hits: 3213
- counters.gems: 1317
- counters.coins: 244
- counters.shots: 1595
- counters.hostileShots: 163
- counters.nearMisses: 26
- counters.hostileHits: 4
- shrineTotals.armor: 17
- Gold, spots and chests: gold held at the end 371, spent 22 (Potato Crate 22); spots charged and used: Stray Dog 3, Crop Patch 3, Tater Lantern 2, Spud Freezer 1, Frenzy Fryer 1, Potato Crate 1, Seed Vault 1; chests seen 4, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Chip Shuriken 43% over Spud Fence 33%, Gravy Boat 24%; 0:13 took Mash Mortar 88% over Gravy Splash 8%, Spud Sneakers 4%; 0:23 took Rösti Disc 68% over Seeker Sprouts 20%, Spry Sprout 12%; 0:35 took Tailgate Fries 58% over Root Network 29%, Chip Shuriken 13%; 0:55 took Armor 60% over Pickup range 30%, Damage 10%; 0:57 took Mash Mallet 82% over Chip Shuriken 9%, Spud Sneakers 9%; 1:03 took Chives 87% over Tailgate Fries 7%, Mash Mallet 6%; 1:12 took Mash Mortar 47% over Chives 41%, GPU 12%; 1:36 took Gravy Splash 47% over Seeker Sprouts 22%, Reroll 17%, Rösti Disc 14%; 1:52 took Big Bowl 77% over Reroll 13%, Rösti Disc 5%, Tailgate Fries 5%; 2:12 took Big Bowl 67% over Gravy Splash 16%, Reroll 10%, Chip Shuriken 5%, Skip 2%; 2:45 took Butter Pat 38% over Reroll 33%, Chip Shuriken 21%, Rösti Disc 5%, Skip 3%; 2:48 took Mash Mortar 69% over Big Bowl 24%, Reroll 5%, Rösti Disc 1%, Skip 1%; 3:04 took Keep the pack 65% over Swap Frank (level 1) 15%, Swap Biscuit (level 1) 12%, Swap Buoy (level 1) 8%; 3:08 took Chives 62% over Mash Finisher 18%, Tater Trot 11%, Reroll 8%, Skip 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:57 level 6, maxHp 129.6, armor 17, damageMult 1, recovery 0, Seeker Sprouts 1/8, Chip Shuriken 1/8, Mash Mortar 1/8, Rösti Disc 1/8, Tailgate Fries 1/8, Mash Mallet 1/8 | 1:59 level 10, maxHp 129.6, armor 17, damageMult 1, recovery 0, Seeker Sprouts 1/8, Chip Shuriken 1/8, Mash Mortar 4/8, Rösti Disc 1/8, Tailgate Fries 1/8, Mash Mallet 1/8, Chives 1/5, Gravy Splash 1/5, Big Bowl 1/5 | 3:00 level 13, maxHp 129.6, armor 17, damageMult 1.2, recovery 0, Seeker Sprouts 1/8, Chip Shuriken 1/8, Mash Mortar 5/8, Rösti Disc 1/8, Tailgate Fries 1/8, Mash Mallet 1/8, Chives 1/5, Gravy Splash 1/5, Big Bowl 2/5, Butter Pat 1/5 | 3:29 level 14, maxHp 129.6, armor 17, damageMult 1.2, recovery 0, Seeker Sprouts 1/8, Chip Shuriken 1/8, Mash Mortar 5/8, Rösti Disc 1/8, Tailgate Fries 1/8, Mash Mallet 1/8, Chives 2/5, Gravy Splash 1/5, Big Bowl 2/5, Butter Pat 1/5.
- Passive levels first reached: Chives 1 at 1:03; Gravy Splash 1 at 1:36; Big Bowl 1 at 1:52; Butter Pat 1 at 2:45.
