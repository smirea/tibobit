# Does withholding fight-the-elite goals before 2:00 cut opening damage?

| Field | Value |
| --- | --- |
| Status | done |
| Area | enemies |
| Result | refuted |
| Created | L3.I7 |
| Updated | L3.I9 |

## Hypothesis

A thin seeker build with 3 weak weapons loses 70-140 health in the first 90 s walking into early elites (Potato Beetle, Wireworm Larva, Tomato Leech) on fight-the-elite goals. With eliteFrom 120 the planner explores or evades instead, the weapons still hit the elites as they come, and health stays higher. Survival to 5:00 rises from 3 of 5.

## Method

Seeker-sprouts from 0:00, 300 s, playbook knobs plus eliteFrom 120, s31, s33 and s35 now and s32 and s34 next iteration. Compare with the playbook games on the same seeds (5:00, 5:00, 3:05, 5:00, 2:39). Read health lost in minutes 0-2, chests opened by 2:00, elites killed, first evolution and 5:00 survival. The first three seeds were picked for early elite damage, so regression to the mean favours this arm. A playbook change needs 4 of 5 lived with wins on at least 4 of 5 paired seeds.

## Findings

eliteFrom 120 on s31-35 lived 2 of 5 against 3 of 5 for the playbook (1 win, 1 tie, 3 losses). s32 and s34 died at 3:08 and 3:15 to the 2:00 amusing boss with 1 chest each, while the playbook lived them. s33 died 1:16 to Fry Fly elites with no elite goal involved. Elite goals are not the cause of the opening damage. The playbook keeps eliteFrom 0.

## Games

### L3.I7.G1: eliteFrom 120 s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 300s; plays the playbook with eliteFrom 120.
- Outcome: alive after 302.2s (game clock 05:02), health 125/132; damage taken 33 (Brambles 5.9, enemy:ketchup-drop 1.733, boss:amusing 3.154, enemy:sand-crab 9.342); 2625 kills; level 1 to 17; planner asked 117 times, action model 298; the models saw the game 32 ms late (p90 50); ended with seeker-sprouts 1, hash-harrier 1, tater-twirl 1, gem-sling 4, gravy-boat 1, mash-landing 8, gpu 1, bacon-bits 2, hot-start 2, peel-out 1.
- run.timeSec: 302.217
- run.level: 16
- run.kills: 2625
- run.damageBySource: seeker-sprouts 7047.016, hash-hawk 3873.821, tater-twirl 6379.051, dog:terrier 2752.407, gem-sling 10961.588, grok-bot 1036.696, gravy-boat 9263.762, hash-harrier 52456.915, alex 2766.181
- run.damageTakenBySource: Brambles 5.9, enemy:ketchup-drop 1.733, boss:amusing 3.154, enemy:sand-crab 9.342, enemy:compost-maggot 1.923, enemy:fry-fly 3.6, Spore vent 4.544, enemy:frost-flea 2.322
- run.killsBySource: seeker-sprouts 293, hash-hawk 91, tater-twirl 220, dog:terrier 156, gem-sling 296, grok-bot 45, gravy-boat 326, hash-harrier 1089, alex 109
- run.evolutions: [{"id":"hash-harrier","at":130.41666666666666}]
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","peel-forest","gutterball-lanes","chip-canyons","compost-caves","frozen-tundra"]
- run.dogs: [{"id":"terrier","at":51.1},{"id":"corgi","at":62.13333333333333}]
- run.dogHelp: damage.terrier 2752.407, hits.terrier 199, frozen.corgi 82
- run.distance: 16715.81
- run.dodgePoints: 2909.956
- run.dodgeSecond: 302
- run.dodgeTaken: [16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,16.930045550268538,20.530240201360407,20.530240201360407,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,25.653319485188593,28.355073871153504,30.197179134311398,30.197179134311398,32.51882339585689,32.51882339585689,32.51882339585689,16.930045550268538,16.930045550268538]
- run.dodgeSteps: [1333.42387333314,1336.0774733331393,1342.7114733331375,1349.3454733331357,1355.979473333134,1360.4463666664642,1364.8690333331278,1371.503033333126,1378.1370333331242,1384.7710333331224,1391.4050333331206,1398.0390333331188,1404.673033333117,1411.3070333331152,1417.9410333331134,1424.5750333331116,1431.2090333331098,1437.843033333108,1444.4770333331062,1451.1110333331044,1457.7450333331026,1464.3790333331008,1471.013033333099,1477.6470333330972,1484.2810333330954,1490.9150333330936,1497.5490333330918,1504.18303333309,1510.8170333330881,1517.4510333330863,1520.4363333330855,1520.4363333330855,1524.9695666664177,1531.6035666664159,1538.237566666414,1544.8715666664123,1551.5055666664105,1558.1395666664087,1564.7735666664069,1571.407566666405,1578.0415666664032,1584.6755666664014,1591.3095666663996,1597.9435666663978,1604.577566666396,1611.2115666663942,1617.8455666663924,1619.3934999997252,1619.3934999997252,1619.3934999997252,1623.8161666663907,1630.450166666389,1637.084166666387,1643.7181666663855,1648.0302666663843,1650.241599999717,1656.8755999997152,1663.5095999997134,1670.1435999997116,1327.4532733331416,1333.42387333314]
- run.curseSince: 16485
- run.goldEarned: 593.735
- run.goldSpent: 30
- run.bossChests: 9
- run.paidChests: 1
- run.bossesKilled: 3
- run.elitesKilled: 8
- run.peakEnemies: 175
- run.shrinesUsed: 1
- run.grokBotHelps: 6
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2625
- counters.hits: 5242
- counters.gems: 1960
- counters.coins: 102
- counters.shots: 2221
- counters.hostileShots: 10
- counters.nearMisses: 1
- counters.hostileHits: 1
- shrineTotals.moveSpeed: 0.07
- Gold, spots and chests: gold held at the end 563, spent 29 (Potato Crate 29); spots charged and used: Tater Lantern 3, Crop Patch 2, Spud Freezer 2, Stray Dog 2, Beetle Nest 2, Potato Crate 1; chests seen 9, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Hash Hawk 60% over Peel Lash 25%, Aged Russet 15%; 0:22 took Tater Twirl 47% over Hash Hawk 44%, Seeker Sprouts 9%; 0:45 took Hash Hawk 74% over Tater Mines 19%, Hash Boomerang 7%; 1:02 took GPU 37% over Spud Dice 33%, Big Bowl 30%; 1:30 took Gem Sling 50% over Tater Twirl 41%, Potato Magnet 9%; 1:34 took Gravy Boat 72% over Sour Cream 11%, Reroll 9%, Hearty Helping 8%; 1:34 took Mash Landing 75% over Hash Hawk 16%, Reroll 6%, Seeker Sprouts 3%; 1:48 took Bacon Bits 88% over Spry Sprout 5%, Reroll 5%, Clean Plate 2%; 1:56 took Mash Landing 46% over Gem Sling 23%, Reroll 19%, Gravy Boat 12%; 2:24 took Move speed 77% over Duration 12%, Gold gain 11%; 2:32 took Gem Sling 31% over Bacon Bits 30%, Gravy Boat 23%, Reroll 16%; 2:36 took Mash Landing 57% over Butter Pat 23%, Reroll 11%, Tater Twirl 9%; 3:16 took Hot Start 52% over Mash Landing 37%, Reroll 7%, Gravy Boat 3%, Skip 1%; 3:19 took Bacon Bits 37% over Seeker Sprouts 35%, Reroll 15%, Fertilizer 11%, Skip 2%; 3:50 took Hot Start 31% over Tater Twirl 29%, Thick Skin 23%, Reroll 14%, Skip 3%; 3:53 took Peel Out 68% over Seeker Sprouts 11%, Mash Finisher 10%, Reroll 9%, Skip 2%; 4:29 took Gem Sling 44% over Reroll 20%, Tater Twirl 18%, Gravy Boat 13%, Skip 5%.

### L3.I7.G2: eliteFrom 120 s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 300s; plays the playbook with eliteFrom 120.
- Outcome: died after 76.6s (game clock 01:16); damage taken 145 (enemy:oil-drip 3.292, Hot oil 19.333, enemy:fry-fly 103.465, enemy:bowling-ball 18.834); 130 kills; level 1 to 6; planner asked 30 times, action model 203; the models saw the game 29 ms late (p90 46); ended with seeker-sprouts 2, starch-chain 2, mash-landing 1, hearty-helping 1, clean-plate 1.
- run.timeSec: 76.6
- run.level: 5
- run.kills: 130
- run.damageBySource: seeker-sprouts 1497.056, starch-chain 1747.043, mash-landing 199.602
- run.damageTakenBySource: enemy:oil-drip 3.292, Hot oil 19.333, enemy:fry-fly 103.465, enemy:bowling-ball 18.834
- run.killsBySource: seeker-sprouts 71, starch-chain 57, mash-landing 2
- run.biomes: ["fry-oil-desert","chip-canyons","gutterball-lanes"]
- run.distance: 4687.307
- run.dodgePoints: 539.018
- run.dodgeSecond: 76
- run.dodgeTaken: [64.04226863459573,64.04226863459573,64.04226863459573,64.04226863459573,64.04226863459573,67.80910208941387,71.3747486814742,78.50604186559485,89.40416850453364,96.5354616886543,103.86794173553275,111.35961963479535,122.57614197850238,130.02583086739128,130.02583086739128,137.47551975628016,1.5456370357111369,1.5456370357111369,1.5456370357111369,1.5456370357111369,3.045637035711137,5.2123037023778025,5.2123037023778025,5.2123037023778025,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,9.712303702377808,10.378970369044472,13.87897036904446,13.87897036904446,13.87897036904446,13.87897036904446,13.87897036904446,13.87897036904446,21.010263553165107,23.204802752257056,32.08274249017345,32.08274249017345,32.08274249017345,35.64838908223378,49.779682266354435,56.910975450475085,56.910975450475085,56.910975450475085,60.47662204253541,64.04226863459573,64.04226863459573]
- run.dodgeSteps: [370.90999999999275,377.10999999999257,383.3099999999924,389.5099999999922,395.709999999992,401.90999999999184,408.10999999999166,414.3099999999902,419.76599999998797,423.94066666665356,430.14066666665076,436.34066666664785,442.54066666664494,448.740666666642,458.81066666663935,465.01066666663644,94.5500000000006,100.75000000000041,106.95000000000023,113.15000000000005,119.34999999999987,125.54999999999968,131.7499999999995,137.9499999999993,144.14999999999912,150.34999999999894,156.54999999999876,162.74999999999858,168.9499999999984,175.14999999999822,181.34999999999803,187.54999999999785,191.26999999999776,193.4399999999977,199.6399999999975,205.83999999999733,212.03999999999715,218.23999999999697,224.4399999999968,230.6399999999966,236.83999999999642,243.03999999999624,249.23999999999606,255.43999999999588,261.63999999999567,267.8399999999955,274.0399999999953,280.2399999999951,286.43999999999494,292.63999999999476,298.8399999999946,305.0399999999944,311.2399999999942,317.43999999999403,323.63999999999385,329.83999999999367,336.0399999999935,342.2399999999933,348.4399999999931,358.5099999999931,364.70999999999293]
- run.curseSince: 2250
- run.killer: "enemy:fry-fly"
- run.goldEarned: 56.175
- run.bossChests: 1
- run.elitesKilled: 2
- run.peakEnemies: 41
- run.grokBotHelps: 2
- counters.kills: 130
- counters.hits: 289
- counters.crits: 3
- counters.gems: 51
- counters.coins: 11
- counters.shots: 217
- Gold, spots and chests: gold held at the end 56, spent 0; spots charged and used: Tater Lantern 1; chests seen 2, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Hearty Helping 45% over Rotten Spud 31%, Golden Fry 24%; 0:22 took Starch Chain 46% over Sprouting Eyes 31%, Spud Dynamo 23%; 0:37 took Clean Plate 46% over Masher Grip 44%, Golden Fry 10%; 1:07 took Mash Landing 50% over Starch Chain 26%, Thick Skin 24%; 1:10 took Starch Chain 49% over Spud Dice 23%, Reroll 18%, Slow Cooker 10%.

### L3.I7.G3: eliteFrom 120 s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 300s; plays the playbook with eliteFrom 120.
- Outcome: alive after 300.1s (game clock 05:00), health 92/120; damage taken 172 (enemy:aphid 6.167, enemy:compost-maggot 1.154, Spore vent 3.733, Hot oil 43.511); 2368 kills; level 1 to 16; planner asked 108 times, action model 732; the models saw the game 34 ms late (p90 54); ended with seeker-sprouts 1, sack-of-russets 1, seed-potato 4, mash-wave 1, mash-snowball 1, starch-bolt 1, butter-pat 2, masher-grip 3, starch-plating 1.
- run.timeSec: 300.1
- run.level: 15
- run.kills: 2368
- run.damageBySource: seeker-sprouts 6447.698, spud-lob 11675.918, seed-potato 8843.199, mash-wave 12403.016, mash-snowball 12633.149, starch-bolt 9359.813, grok-bot 112.553, sack-of-russets 28093.071
- run.damageTakenBySource: enemy:aphid 6.167, enemy:compost-maggot 1.154, Spore vent 3.733, Hot oil 43.511, enemy:tomato-leech 6.409, boss:amusing 3.326, Brambles 5.4, boss:beetle-queen 11.786, enemy:wireworm-larva 20.389, enemy:potato-beetle 12, enemy:snow-mold 27.037, enemy:sprout-mite 2.052, boss:the-masher 28.793
- run.killsBySource: seeker-sprouts 251, spud-lob 359, mash-wave 387, seed-potato 252, mash-snowball 316, starch-bolt 198, grok-bot 5, sack-of-russets 600
- run.evolutions: [{"id":"sack-of-russets","at":212.33333333333334}]
- run.biomes: ["compost-caves","ketchup-bog","mash-swamp","peel-forest"]
- run.distance: 16586.138
- run.dodgePoints: 2115.838
- run.dodgeSecond: 300
- run.dodgeTaken: [144.08628192482973,144.08628192482973,144.08628192482973,144.08628192482973,153.68399621054402,153.68399621054402,153.68399621054402,153.68399621054402,166.7805739887425,166.7805739887425,166.7805739887425,168.95835176652025,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,171.75835176652015,134.48856763911544,134.48856763911544,134.48856763911544,134.48856763911544]
- run.dodgeSteps: [1325.1468333331427,1329.6263333331394,1335.8263333331365,1341.7938333331335,1347.9938333331306,1354.1938333331277,1360.3938333331248,1366.593833333122,1372.793833333119,1378.993833333116,1385.1938333331132,1391.3938333331103,1397.5938333331073,1403.7938333331044,1409.9938333331015,1416.1938333330986,1422.3938333330957,1428.5938333330928,1434.7938333330899,1440.993833333087,1447.193833333084,1451.8438333330819,1457.733833333079,1463.933833333076,1470.1338333330732,1476.3338333330703,1480.8804999997349,1486.770499999732,1492.970499999729,1499.1704999997262,1505.3704999997233,1511.5704999997204,1517.7704999997175,1521.180499999716,1525.1071666663806,1531.3071666663777,1537.5071666663748,1543.6038333330387,1548.1504999997032,1554.3504999997003,1560.5504999996974,1566.7504999996945,1572.9504999996916,1579.1504999996887,1583.59383333302,1589.7938333330171,1595.9938333330142,1602.1938333330113,1608.3938333330084,1614.5938333330055,1620.7938333330026,1626.9938333329997,1633.1938333329967,1639.3938333329938,1645.593833332991,1651.793833332988,1657.993833332985,1303.6844999998216,1306.6398333331515,1312.7468333331485,1318.9468333331456]
- run.curseSince: 14504
- run.goldEarned: 394.89
- run.bossChests: 5
- run.bossesKilled: 3
- run.elitesKilled: 4
- run.peakEnemies: 171
- run.grokBotHelps: 7
- run.lootRunnersMet: [1]
- counters.kills: 2368
- counters.hits: 3757
- counters.gems: 643
- counters.coins: 111
- counters.shots: 1335
- counters.hostileShots: 182
- counters.nearMisses: 12
- counters.hostileHits: 3
- Gold, spots and chests: gold held at the end 394, spent 0; spots charged and used: Crop Patch 2, Tater Lantern 1, Spud Freezer 1; chests seen 7, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Spud Lob 43% over Peel Out 38%, Tailgate Fries 19%; 0:18 took Spud Lob 49% over Seeker Sprouts 27%, Small Fry 24%; 0:21 took Seed Potato 85% over Seeker Sprouts 14%, Golden Fry 1%; 0:28 took Mash Wave 49% over Seed Potato 39%, Gravy Splash 12%; 1:18 took Mash Snowball 59% over Seeker Sprouts 25%, Hash Boomerang 16%; 1:35 took Spud Lob 48% over Seed Potato 43%, Mash Wave 9%; 1:46 took Starch Bolt 50% over Butter Pat 31%, Reroll 13%, Seeker Sprouts 6%; 2:41 took Butter Pat 66% over Peel Out 22%, Reroll 7%, Thick Skin 5%; 3:20 took Masher Grip 66% over Seeker Sprouts 13%, Reroll 12%, Starch Bolt 9%; 3:23 took Leave; 3:31 took Seed Potato 46% over Packed Pan 43%, Reroll 9%, Tater Trot 2%; 3:33 took Masher Grip 69% over Butter Pat 16%, Reroll 10%, Seeker Sprouts 5%; 4:00 took Masher Grip 83% over Butter Pat 7%, Reroll 6%, Seeker Sprouts 4%; 4:01 took Butter Pat 44% over Big Bowl 25%, Reroll 17%, Seeker Sprouts 14%; 4:01 took Starch Plating 64% over Butter Pat 24%, Mash Wave 6%, Reroll 6%; 4:05 took Seed Potato 62% over Gravy Splash 27%, Reroll 7%, Hash Rush 4%.

### L3.I8.G1: eliteFrom 120 s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 300s; plays the playbook with eliteFrom 120.
- Outcome: died after 188.5s (game clock 03:08); damage taken 199 (enemy:aphid 3.134, enemy:frost-flea 1.496, enemy:snow-mold 16.548, boss:amusing 105.332); 1222 kills; level 1 to 11; planner asked 71 times, action model 372; the models saw the game 27 ms late (p90 44); ended with seeker-sprouts 1, starch-puddle 2, starch-chain 5, chip-shuriken 1, grab-bag 1, harvest-moon 1, hash-rush 1, hot-sauce 1.
- run.timeSec: 188.517
- run.level: 10
- run.kills: 1222
- run.damageBySource: seeker-sprouts 3421.07, starch-puddle 3576.757, starch-chain 9928.742, chip-shuriken 4924.415, grab-bag 1801.016, harvest-moon 434.694
- run.damageTakenBySource: enemy:aphid 3.134, enemy:frost-flea 1.496, enemy:snow-mold 16.548, boss:amusing 105.332, boss:beetle-queen 67.996, enemy:beetle-brood 4.578
- run.killsBySource: seeker-sprouts 213, starch-puddle 183, starch-chain 621, chip-shuriken 95, grab-bag 85, harvest-moon 25
- run.biomes: ["frozen-tundra","chip-canyons"]
- run.distance: 9502.383
- run.dodgePoints: 1216.591
- run.dodgeSecond: 188
- run.dodgeTaken: [142.73236504077624,156.37605734183944,165.44222400850612,174.5083906751728,174.5083906751728,185.48474979060973,109.07745392966515,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292,124.60003170744292]
- run.dodgeSteps: [917.2283333334202,923.4283333334173,927.9750000000819,938.0450000000799,942.075000000078,948.2750000000751,605.5023333333968,615.5723333333988,621.7723333334013,627.9723333334039,634.1723333334064,638.5123333334082,644.7123333334107,654.7823333334126,657.7790000000805,662.1190000000822,667.5440000000838,671.3776666667507,674.3330000000841,679.6030000000862,684.0773333334204,688.4173333334205,694.5243333334226,700.7243333334245,705.2710000000914,711.4710000000936,717.6710000000961,723.8710000000987,730.0710000001011,735.5270000001027,738.3686666667704,743.2563333334383,749.2083333334406,755.40833333344,761.6083333334426,767.8083333334451,774.0083333334477,779.3816666667833,784.6516666667854,789.6116666667874,795.6050000001233,801.8050000001258,803.4583333334598,809.0383333334621,813.5850000001307,818.0283333334658,824.2283333334639,830.428333333461,836.628333333458,842.8283333334551,849.0283333334522,855.2283333334493,861.4283333334464,867.6283333334435,873.8283333334406,880.0283333334377,886.2283333334348,892.4283333334319,898.6283333334289,904.828333333426,911.0283333334231]
- run.curseSince: 9144
- run.killer: "boss:beetle-queen"
- run.goldEarned: 108
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 137
- run.shrinesUsed: 4
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 1222
- counters.hits: 2285
- counters.crits: 45
- counters.gems: 293
- counters.coins: 39
- counters.shots: 908
- counters.hostileShots: 146
- counters.nearMisses: 25
- counters.hostileHits: 7
- shrineTotals.might: 0.072
- shrineTotals.cooldown: 0.036
- shrineTotals.maxHp: 14.4
- shrineTotals.magnet: 0.18
- Gold, spots and chests: gold held at the end 107, spent 0; spots charged and used: Spud Freezer 1; chests seen 3, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Starch Puddle 70% over Seeker Sprouts 23%, Spud Sneakers 7%; 0:13 took Starch Puddle 53% over Hash Boomerang 27%, Root Spikes 20%; 0:24 took Starch Chain 74% over Starch Puddle 24%, Golden Fry 2%; 0:44 took Chip Shuriken 58% over Starch Chain 19%, Slow Cooker 16%, Reroll 7%; 1:17 took Damage 57% over Armor 38%, Crit 5%; 1:27 took Cooldown 84% over Pickup range 11%, Gold gain 5%; 1:28 took Grab Bag 38% over Chip Shuriken 25%, Peeler 23%, Reroll 14%; 1:36 took Pickup range 81% over XP gain 10%, Luck 9%; 1:39 took Harvest Moon 67% over Sprout Satellites 15%, Grab Bag 9%, Reroll 9%; 1:41 took Starch Chain 43% over Grab Bag 22%, Reroll 19%, Bacon Bits 16%; 1:57 took Max HP 84% over Cooldown 13%, Luck 3%; 2:13 took Hash Rush 33% over Hot Sauce 29%, Grab Bag 21%, Reroll 17%; 2:32 took Hot Sauce 43% over Spud Sneakers 32%, Lean Lunch 16%, Reroll 9%; 2:46 took Starch Chain 91% over Reroll 6%, Grab Bag 2%, Seeker Sprouts 1%.

### L3.I8.G2: eliteFrom 120 s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 300s; plays the playbook with eliteFrom 120.
- Outcome: died after 195.2s (game clock 03:15); damage taken 174 (Brambles 2.7, enemy:snow-mold 2.618, Hot oil 14.933, boss:amusing 96.462); 789 kills; level 1 to 9; planner asked 68 times, action model 382; the models saw the game 27 ms late (p90 48); ended with seeker-sprouts 4, peeler 1, peel-lash 1, afterburner-fries 1, skipping-cannonball 2, spud-fence 2.
- run.timeSec: 195.167
- run.level: 8
- run.kills: 789
- run.damageBySource: seeker-sprouts 5074.806, peel-lash 4339.866, peeler 1173.201, dog:saluki 823.269, skipping-cannonball 1732.25, spud-fence 4514.039, afterburner-fries 122.199, grok-bot 182.751
- run.damageTakenBySource: Brambles 2.7, enemy:snow-mold 2.618, Hot oil 14.933, boss:amusing 96.462, enemy:garden-slug 3.749, enemy:compost-maggot 1.811, enemy:aphid 1.955, boss:the-masher 49.591
- run.killsBySource: seeker-sprouts 264, peel-lash 181, peeler 27, dog:saluki 46, skipping-cannonball 73, spud-fence 185, afterburner-fries 1, grok-bot 12
- run.biomes: ["peel-forest","mash-swamp","compost-caves","ketchup-bog","fry-oil-desert","crop-circle","frozen-tundra","chip-canyons"]
- run.dogs: [{"id":"dachshund","at":57.016666666666666},{"id":"saluki","at":61.86666666666667}]
- run.dogHelp: damage.saluki 823.269, hits.saluki 56, gold.dachshund 138, finds.dachshund 4
- run.distance: 11074.589
- run.dodgePoints: 1306.559
- run.dodgeSecond: 195
- run.dodgeTaken: [122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,124.22754794537788,124.22754794537788,124.22754794537788,124.22754794537788,124.22754794537788,134.1458343619481,134.1458343619481,144.06412077851832,163.90069361165874,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,120.46166391478071,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171,122.27296263600171]
- run.dodgeSteps: [1040.6560333333603,1045.1696333333587,1051.1823933333612,1057.6303933333652,1064.0783933333691,1070.526393333373,1076.974393333377,1081.81039333338,1088.258393333384,1092.8794600000535,1099.2914600000552,1105.7394600000591,1106.921593333393,766.9029666665681,766.9029666665681,775.8941666665668,780.7301666665657,785.3512333332312,791.7992333332297,796.3128333332287,799.1069666665614,805.55496666656,815.8357666665584,819.7045666665579,822.068833333226,827.8720333332296,830.6661666665647,830.6661666665647,836.4693666665682,842.9173666665722,849.3653666665762,855.8133666665801,862.2613666665841,868.709366666588,874.6200333332583,874.8349666665918,881.2829666665957,887.7309666665997,894.1789666666036,900.6269666666076,907.0749666666115,911.6960333332811,918.144033333285,924.592033333289,931.040033333293,937.4880333332969,943.9360333333009,950.3840333333048,956.8320333333088,963.2800333333128,969.7280333333167,976.1760333333207,982.6240333333246,989.0720333333286,995.5200333333325,1001.9680333333365,1008.4160333333405,1014.8640333333444,1021.3120333333484,1027.7600333333523,1034.2080333333563]
- run.curseSince: 6579
- run.killer: "boss:the-masher"
- run.goldEarned: 317.356
- run.goldSpent: 30
- run.bossChests: 2
- run.paidChests: 1
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 168
- run.grokBotHelps: 3
- run.lootRunnersMet: [1,1]
- counters.kills: 789
- counters.hits: 1137
- counters.gems: 299
- counters.coins: 158
- counters.shots: 1008
- counters.hostileShots: 108
- counters.nearMisses: 27
- counters.hostileHits: 7
- Gold, spots and chests: gold held at the end 287, spent 30 (Potato Crate 30); spots charged and used: Stray Dog 2, Potato Crate 1; chests seen 3, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Peeler 85% over Mash Finisher 11%, Hot Sauce 4%; 0:19 took Peel Lash 60% over Starch Bolt 21%, Hash Boomerang 19%; 1:00 took Afterburner Fries 53% over Peel Lash 35%, Salt Shaker 12%; 1:04 took Skipping Cannonball 92% over Salt Shaker 6%, Spud Sneakers 2%; 1:18 took Spud Fence 81% over Seeker Sprouts 10%, Peel Lash 9%; 1:24 took Seeker Sprouts 83% over Bacon Bits 11%, Lean Lunch 6%; 1:47 took Spud Fence 51% over Fertilizer 32%, Reroll 14%, Golden Fry 3%; 2:06 took Skipping Cannonball 39% over Spud Fence 29%, Reroll 21%, Fertilizer 11%.
