# Which part of the cheap item bundle matters: armor and max HP or on-hit and sustain?

| Field | Value |
| --- | --- |
| Status | done |
| Area | items |
| Result | inconclusive |
| Created | L4.I3 |
| Updated | L4.I4 |

## Hypothesis

The 5-item bundle that lived 3 of 3 seeds (porcupine-spud, boom-spud, vampire-tot, baked-buckler, spud-muffin) works through survivability. Armor and max HP items (baked-buckler 3, spud-muffin 3, potato-knish 2) alone keep a seeker build alive through 2:00-4:00 on seeds where the playbook died (s33 3:05, s35 2:39), and on-hit and sustain items (porcupine-spud, vampire-tot 2, boom-spud, thorny-jacket 2) do less.

## Method

Seeker-sprouts with the playbook knobs, items handed over at 0:00, 240 s on s33 and s35, one arm per bundle. Read survival to 4:00, damage taken by minute, the amusing and queen damage, chests opened and kills against the playbook (3:05 and 2:39). A handed-over loadout is an upper bound. Only a clear gain would justify a purchase route (vendor or crates), tested in vendor-gold-spend.

## Findings

L4.I3, 240 s, handed items on s33 and s35: armor+hp items 2 of 2 alive at 4:00 (273 and 80 damage), on-hit+sustain items 2 of 2 alive (207 and 65 damage). The playbook died at 3:05 and 2:39 on those seeds. Both kinds help and neither beat the other on two seeds each. The loadouts are handed over, so this is an upper bound. The dose needed is tested in small-item-dose, and the purchase route in vendor-gold-spend.

## Games

### L4.I3.G1: armor+hp items s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33, build swapped for seeker-sprouts 1, baked-buckler x3, spud-muffin x3, potato-knish x2; 240s; plays the playbook.
- Outcome: alive after 240.1s (game clock 04:00), health 97/192; damage taken 273 (enemy:oil-drip 8.416, enemy:crumb-ant 9.638, enemy:fry-fly 92.549, enemy:lint-bunny 4.065); 2000 kills; level 1 to 13; planner asked 88 times, action model 569; the models saw the game 41 ms late (p90 67); ended with overgrowth 1, grab-bag 1, starch-chain 6, rosti-disc 2, tater-pup 1, mash-golem 1, fertilizer 2, thick-skin 1.
- run.timeSec: 240.133
- run.level: 12
- run.kills: 2000
- run.damageBySource: seeker-sprouts 16196.852, grab-bag 5699.787, starch-chain 11789.048, grok-bot 748.322, rosti-disc 5160.089, tater-pup 1686.463, mash-golem 611.052, overgrowth 14799.4
- run.damageTakenBySource: enemy:oil-drip 8.416, enemy:crumb-ant 9.638, enemy:fry-fly 92.549, enemy:lint-bunny 4.065, Hot oil 38.373, boss:amusing 12.196, enemy:bowling-ball 2.644, enemy:aphid 5.064, boss:beetle-queen 38.109, enemy:sand-crab 25.902, enemy:beetle-brood 16.547, enemy:tomato-leech 8.087, enemy:ketchup-drop 1.69, enemy:potato-beetle 8.165, enemy:bog-slime 1.781
- run.killsBySource: seeker-sprouts 738, grab-bag 165, starch-chain 454, grok-bot 43, rosti-disc 106, tater-pup 49, mash-golem 11, overgrowth 434
- run.evolutions: [{"id":"overgrowth","at":217.1}]
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","coin-laundromat","chip-canyons"]
- run.distance: 14049.305
- run.dodgePoints: 1369.55
- run.dodgeSecond: 240
- run.dodgeTaken: [118.50847680572298,120.66559921951608,120.66559921951608,120.66559921951608,124.97984404710229,124.97984404710229,128.8653440471023,147.20866556048367,147.20866556048367,147.20866556048367,151.7093054898051,153.95916716475512,153.95916716475512,162.15891199234133,166.04441199234134,168.32736963184513,168.32736963184513,197.578412468255,207.4652831141636,212.8226785559274,212.8226785559274,212.8226785559274,221.50672222283922,221.50672222283922,221.50672222283922,226.93210913996552,226.93210913996552,226.93210913996552,229.25133661311384,229.25133661311384,229.25133661311384,231.40845902690694,233.56558144070004,238.11230137408785,241.44918190607447,262.545630478138,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,273.2279797735017,118.50847680572298,118.50847680572298,118.50847680572298]
- run.dodgeSteps: [1073.2871666666128,1079.48716666661,1082.4838333332752,1082.4838333332752,1085.1704999999406,1091.3704999999377,1097.5704999999348,1103.7704999999319,1109.970499999929,1116.170499999926,1122.3704999999231,1128.5704999999202,1134.7704999999173,1140.9704999999144,1147.1704999999115,1153.3704999999086,1159.5704999999057,1165.7704999999028,1171.9704999998999,1178.170499999897,1184.370499999894,1190.5704999998911,1196.7704999998882,1202.9704999998853,1209.1704999998824,1215.3704999998795,1221.5704999998766,1227.7704999998737,1233.9704999998708,1240.1704999998678,1246.370499999865,1252.570499999862,1258.770499999859,1264.9704999998562,1267.1404999998554,1267.6571666665218,1273.8571666665189,1278.0938333331835,1287.233833333182,1292.5038333331795,1298.7038333331766,1304.9038333331737,1311.1038333331708,1317.3038333331679,1323.503833333165,1329.703833333162,1335.9038333331591,1342.1038333331562,1348.3038333331533,1354.5038333331504,1360.7038333331475,1366.9038333331446,1373.1038333331417,1379.3038333331388,1385.5038333331358,1391.703833333133,1397.90383333313,1404.103833333127,1054.6871666666216,1060.8871666666187,1067.0871666666158]
- run.curseSince: 13085
- run.goldEarned: 514.115
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 174
- run.grokBotHelps: 4
- run.botSwarms: 2
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2000
- counters.hits: 3400
- counters.gems: 429
- counters.coins: 69
- counters.shots: 1358
- counters.hostileShots: 204
- counters.nearMisses: 14
- counters.hostileHits: 7
- Gold, spots and chests: gold held at the end 513, spent 0; spots charged and used: Crop Patch 1, Tater Lantern 1; chests seen 8, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Seeker Sprouts 53% over Spud Fence 39%, Rotten Spud 8%; 0:22 took Grab Bag 61% over Seeker Sprouts 30%, Masher Grip 9%; 0:51 took Starch Chain 73% over Seeker Sprouts 22%, Grab Bag 5%; 0:51 took Rösti Disc 67% over Gravy Heart 20%, Thick Skin 13%; 1:04 took Rösti Disc 43% over Fertilizer 37%, Tater Trot 20%; 1:17 took Starch Chain 56% over Fertilizer 25%, Reroll 17%, Golden Fry 2%; 1:47 took Tater Tot Pup 62% over Grab Bag 14%, Fertilizer 12%, Reroll 12%; 2:12 took Fertilizer 32% over Tater Tot Pup 30%, Rotten Spud 24%, Reroll 14%; 2:32 took Mash Golem 62% over Grab Bag 17%, Reroll 17%, Tater Tot Pup 4%; 2:57 took Seeker Sprouts 84% over Sour Cream 7%, Reroll 6%, Mash Golem 3%; 3:05 took Leave 38% over melt 36%, melt 26%; 3:19 took Fertilizer 84% over Grab Bag 8%, Potato Magnet 4%, Reroll 4%; 3:38 took Thick Skin 53% over Hot Sauce 32%, Tater Tot Pup 8%, Reroll 7%.

### L4.I3.G2: armor+hp items s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35, build swapped for seeker-sprouts 1, baked-buckler x3, spud-muffin x3, potato-knish x2; 240s; plays the playbook.
- Outcome: alive after 240.2s (game clock 04:00), health 224/226; damage taken 80 (enemy:aphid 3.34, enemy:compost-maggot 0.721, Brambles 7.625, enemy:potato-beetle 23.848); 1721 kills; level 1 to 15; planner asked 100 times, action model 403; the models saw the game 37 ms late (p90 64); ended with seeker-sprouts 1, mash-avalanche 1, harvest-moon 8, hash-boomerang 2, tot-stampede 1, hash-hawk 1, peel-out 1, masher-grip 4, potato-magnet 1, hot-start 1.
- run.timeSec: 240.183
- run.level: 14
- run.kills: 1721
- run.damageBySource: seeker-sprouts 4823.018, mash-snowball 4254.332, harvest-moon 7723.717, dog:terrier 2023.49, hash-boomerang 9820.384, tot-stampede 6884.684, hash-hawk 3420.899, mash-avalanche 11569.703, grok-bot 2328.977
- run.damageTakenBySource: enemy:aphid 3.34, enemy:compost-maggot 0.721, Brambles 7.625, enemy:potato-beetle 23.848, Hot oil 3.451, enemy:bog-slime 3.846, boss:amusing 13.206, enemy:sprout-mite 4.913, enemy:ketchup-drop 1.366, enemy:garden-slug 13.433, enemy:wireworm-larva 2.287, enemy:cave-grub 2.277
- run.killsBySource: seeker-sprouts 188, mash-snowball 170, dog:terrier 106, harvest-moon 233, hash-boomerang 351, tot-stampede 274, hash-hawk 37, mash-avalanche 284, grok-bot 78
- run.evolutions: [{"id":"mash-avalanche","at":172.7}]
- run.biomes: ["compost-caves","peel-forest","mash-swamp","ketchup-bog"]
- run.dogs: [{"id":"terrier","at":39.833333333333336},{"id":"newfoundland","at":139.18333333333334}]
- run.dogHelp: damage.terrier 2023.49, hits.terrier 142
- run.distance: 12726.083
- run.dodgePoints: 1984.857
- run.dodgeSecond: 240
- run.dodgeTaken: [75.74867354437552,75.74867354437552,75.74867354437552,75.74867354437552,75.74867354437552,75.74867354437552,75.74867354437552,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,78.03563357790004,80.31240480933324,80.31240480933324,80.31240480933324,75.74867354437552,75.74867354437552,75.74867354437552]
- run.dodgeSteps: [977.0104666666964,982.2763333333663,982.2763333333663,986.7899333333692,993.2379333333731,997.8482533333718,1001.6848133333682,1008.1328133333722,1014.5808133333761,1021.0288133333801,1027.4768133333841,1033.924813333388,1040.372813333392,1046.820813333396,1053.2688133334,1059.716813333404,1066.164813333408,1072.6128133334119,1074.5472133334129,1076.589080000081,1083.0370800000849,1089.4850800000888,1095.9330800000928,1099.801880000095,1106.249880000099,1112.697880000103,1119.145880000107,1125.5938800001109,1132.0418800001148,1138.4898800001188,1139.1346800001193,1139.1346800001193,1144.400546666789,1150.848546666793,1157.296546666797,1163.744546666801,1170.192546666805,1176.6405466668089,1183.0885466668128,1189.5365466668168,1195.9845466668207,1202.4325466668247,1208.8805466668286,1215.3285466668326,1221.7765466668366,1228.2245466668405,1234.6725466668445,1241.1205466668484,1247.5685466668524,1251.9746800001885,1251.9746800001885,1251.9746800001885,1251.9746800001885,1251.9746800001885,1254.0165466668564,1260.4645466668603,1266.9125466668643,1271.6410800002006,961.0033066666941,967.4513066666981,971.6263866666956]
- run.curseSince: 14182
- run.goldEarned: 605.772
- run.goldSpent: 102
- run.bossChests: 8
- run.paidChests: 2
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 173
- run.shrinesUsed: 3
- run.grokBotHelps: 6
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1721
- counters.hits: 2690
- counters.gems: 1361
- counters.coins: 72
- counters.shots: 1158
- counters.hostileShots: 72
- counters.nearMisses: 5
- counters.hostileHits: 2
- shrineTotals.maxHp: 20.4
- shrineTotals.armor: 29
- Gold, spots and chests: gold held at the end 503, spent 101 (Potato Crate 101); spots charged and used: Stray Dog 2, Potato Crate 2, Crop Patch 1, Beetle Nest 1; chests seen 8, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Peel Out 41% over Spud Lob 39%, Tailgate Fries 20%; 0:20 took Mash Snowball 66% over Seeker Sprouts 18%, Hearty Helping 16%; 0:23 took Harvest Moon 72% over Chives 18%, Seeker Sprouts 10%; 0:43 took Hash Boomerang 59% over Big Bowl 29%, Four-Eyed Spud 12%; 0:57 took Max HP 81% over Armor 17%, Gold gain 2%; 0:59 took Tot Stampede 68% over Butter Socks 26%, Rotten Spud 6%; 1:16 took Mash Snowball 51% over Stuffed Skin 32%, Hash Boomerang 17%; 1:30 took Harvest Moon 46% over Reroll 25%, Tot Stampede 23%, Hash Boomerang 6%; 1:37 took Armor 87% over Pickup range 11%, Luck 2%; 2:09 took Hash Hawk 69% over Masher Grip 21%, Reroll 6%, Tot Stampede 4%; 2:10 took Masher Grip 47% over Mash Snowball 39%, Reroll 11%, Seeker Sprouts 3%; 2:18 took Masher Grip 79% over Harvest Moon 14%, Reroll 5%, Seeker Sprouts 2%; 2:53 took Masher Grip 64% over Potato Magnet 16%, Rotten Spud 12%, Reroll 8%; 3:25 took Potato Magnet 50% over Hash Hawk 30%, Big Bowl 13%, Reroll 7%; 3:34 took Hot Start 47% over Hash Hawk 22%, Tot Stampede 17%, Reroll 14%; 3:56 took Masher Grip 62% over Reroll 19%, Hash Boomerang 12%, Seeker Sprouts 7%; 3:56 took Armor 92% over Gold gain 5%, Luck 3%.

### L4.I3.G3: on-hit+sustain items s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33, build swapped for seeker-sprouts 1, porcupine-spud x1, vampire-tot x2, boom-spud x1, thorny-jacket x2; 240s; plays the playbook.
- Outcome: alive after 240.1s (game clock 04:00), health 120/120; damage taken 207 (Hot oil 53.333, enemy:fry-fly 47.785, enemy:tomato-leech 2.455, enemy:crumb-ant 22.561); 1804 kills; level 1 to 15; planner asked 92 times, action model 726; the models saw the game 33 ms late (p90 56); ended with seeker-sprouts 4, waffle-cut 1, broadside 1, fry-sentry 1, hash-rush 2, butter-socks 3, butter-pat 1, chives 2.
- run.timeSec: 240.1
- run.level: 14
- run.kills: 1804
- run.damageBySource: seeker-sprouts 6246.141, thorny-jacket 752.985, porcupine-spud 12906.252, julienne-dash 791.454, boom-spud 3318.064, grok-bot 786.48, waffle-cut 19675.185, broadside 4722.038, fry-sentry 3392.438
- run.damageTakenBySource: Hot oil 53.333, enemy:fry-fly 47.785, enemy:tomato-leech 2.455, enemy:crumb-ant 22.561, enemy:ketchup-drop 6.536, enemy:oil-drip 19.107, enemy:lint-bunny 15.418, enemy:bog-slime 4.197, boss:beetle-queen 8.16, enemy:sprout-mite 6.289, enemy:sand-crab 19.344, enemy:aphid 2.064
- run.killsBySource: seeker-sprouts 242, porcupine-spud 461, thorny-jacket 33, julienne-dash 28, boom-spud 98, grok-bot 43, waffle-cut 645, broadside 197, fry-sentry 57
- run.evolutions: [{"id":"waffle-cut","at":70.93333333333334}]
- run.biomes: ["fry-oil-desert","coin-laundromat","mash-swamp","chip-canyons"]
- run.distance: 13956.613
- run.dodgePoints: 1472.414
- run.dodgeSecond: 240
- run.curseHeldPeak: 2.687
- run.dodgeTaken: [139.6083161084933,142.32816610849332,142.32816610849332,142.32816610849332,142.32816610849332,145.57354079518254,145.57354079518254,145.57354079518254,151.01324079518253,153.6127391149046,153.6127391149046,156.22184270789933,156.22184270789933,156.22184270789933,159.5586078801146,159.5586078801146,159.5586078801146,161.56374089963433,161.56374089963433,161.56374089963433,166.29177459846787,166.29177459846787,166.29177459846787,166.29177459846787,166.29177459846787,166.29177459846787,174.44425437455723,174.44425437455723,177.88576308846444,180.59172474150034,180.59172474150034,183.34340206346076,183.34340206346076,185.40716005493107,185.40716005493107,187.49803569421286,187.49803569421286,193.09143623700064,193.09143623700064,197.91834856659256,197.91834856659256,197.91834856659256,200.0340152777905,200.0340152777905,200.0340152777905,200.0340152777905,200.0340152777905,200.0340152777905,200.0340152777905,200.0340152777905,202.20218312211884,202.20218312211884,202.20218312211884,202.20218312211884,207.2495136523946,207.2495136523946,207.2495136523946,207.2495136523946,137.69026292840144,139.6083161084933,139.6083161084933]
- run.dodgeSteps: [1055.1779999998844,1061.3779999998815,1067.5779999998786,1073.7779999998756,1079.9779999998727,1086.1779999998698,1092.377999999867,1098.577999999864,1104.777999999861,1110.6679999998582,1116.8679999998553,1123.0679999998524,1129.2679999998495,1133.814666666514,1140.0146666665112,1146.2146666665083,1152.4146666665054,1158.6146666665024,1164.8146666664995,1171.0146666664966,1175.5613333331612,1181.7613333331583,1187.9613333331554,1194.1613333331525,1200.3613333331496,1206.5613333331466,1212.7613333331437,1216.791333333142,1222.7846666664723,1228.9846666664694,1232.7046666664678,1238.904666666465,1245.104666666462,1251.304666666459,1257.5046666664562,1259.8813333331216,1264.8413333331193,1271.0413333331164,1277.2413333331135,1283.4413333331106,1289.6413333331077,1295.8413333331048,1302.0413333331019,1308.241333333099,1314.441333333096,1320.6413333330931,1326.8413333330902,1333.0413333330873,1339.2413333330844,1345.4413333330815,1351.6413333330786,1357.8413333330757,1364.0413333330728,1370.2413333330699,1376.441333333067,1382.641333333064,1388.8413333330611,1395.0413333330582,1036.577999999893,1042.7779999998902,1048.9779999998873]
- run.curseTicks: 226
- run.curseSince: 12795
- run.goldEarned: 609.728
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 7
- run.peakEnemies: 167
- run.shrinesUsed: 1
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1804
- counters.hits: 2572
- counters.gems: 1455
- counters.coins: 77
- counters.shots: 1263
- counters.hostileShots: 46
- counters.nearMisses: 3
- counters.hostileHits: 2
- shrineTotals.curse: 0.1
- Gold, spots and chests: gold held at the end 609, spent 0; spots charged and used: Crop Patch 1, Beetle Nest 1; chests seen 9, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Hash Rush 70% over Masher Grip 17%, Spud Sneakers 13%; 0:16 took Julienne Dash 88% over Packed Pan 11%, Golden Fry 1%; 0:32 took Julienne Dash 74% over Afterburner Fries 24%, Spud Sneakers 2%; 0:33 took Julienne Dash 61% over Hash Rush 30%, Sour Cream 9%; 0:43 took Julienne Dash 55% over Locked Gatling 21%, Butter Socks 18%, Reroll 6%; 0:53 took Butter Socks 85% over Spud Dice 11%, Reroll 3%, Golden Fry 1%; 1:10 took Butter Socks 51% over Comet Scythe 42%, Starch Plating 4%, Reroll 3%; 1:45 took Broadside 48% over Seeker Sprouts 32%, Spud Decoy 10%, Reroll 10%; 2:12 took Hash Rush 64% over Peel Lash 15%, Chip Shuriken 11%, Reroll 10%; 2:45 took Leave 58% over Accept 42%; 2:46 took Fry Cook Sentry 44% over Butter Socks 26%, Broadside 19%, Reroll 9%, Skip 2%; 2:47 took Butter Pat 50% over Deep Fryer 25%, Butter Socks 17%, Reroll 6%, Skip 2%; 2:55 took Accept 54% over Leave 46%; 3:13 took Butter Socks 40% over Rösti Disc 30%, Reroll 17%, Tater Mines 11%, Skip 2%; 3:30 took Chives 40% over Butter Socks 40%, Bacon Bits 9%, Reroll 9%, Skip 2%; 3:33 took Chives 57% over Masher Grip 25%, Reroll 11%, Fertilizer 6%, Skip 1%.

### L4.I3.G4: on-hit+sustain items s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35, build swapped for seeker-sprouts 1, porcupine-spud x1, vampire-tot x2, boom-spud x1, thorny-jacket x2; 240s; plays the playbook.
- Outcome: alive after 240.1s (game clock 04:00), health 138/138; damage taken 65 (enemy:compost-maggot 2.092, Spore vent 4, enemy:cave-grub 16.01, Hot oil 15.793); 2204 kills; level 1 to 13; planner asked 92 times, action model 281; the models saw the game 36 ms late (p90 57); ended with seeker-sprouts 8, butter-streak 1, fry-lance 8, mash-snowball 1, harvest-moon 1, starch-puddle 5, gpu 1, starch-plating 2, peel-out 1.
- run.timeSec: 240.05
- run.level: 12
- run.kills: 2204
- run.damageBySource: seeker-sprouts 35239.954, thorny-jacket 170.234, porcupine-spud 3882.338, butter-streak 765.972, boom-spud 2799.342, fry-lance 8284.55, mash-snowball 3400.449, harvest-moon 934.435, starch-puddle 6840.484, grok-bot 94.679
- run.damageTakenBySource: enemy:compost-maggot 2.092, Spore vent 4, enemy:cave-grub 16.01, Hot oil 15.793, boss:amusing 11.258, Brambles 0.825, boss:beetle-queen 4.036, enemy:sand-crab 7.86, enemy:fry-fly 1.698, enemy:crumb-ant 1.066
- run.killsBySource: seeker-sprouts 1433, thorny-jacket 2, porcupine-spud 65, butter-streak 11, boom-spud 103, fry-lance 277, mash-snowball 103, starch-puddle 180, harvest-moon 24, grok-bot 6
- run.biomes: ["compost-caves","peel-forest","mash-swamp","chip-canyons","frozen-tundra","fry-oil-desert","ketchup-bog"]
- run.distance: 12890.494
- run.dodgePoints: 2077.413
- run.dodgeSecond: 240
- run.dodgeTaken: [38.38012447689108,40.398077702697535,40.398077702697535,40.398077702697535,40.398077702697535,40.398077702697535,40.398077702697535,43.23711405679532,43.23711405679532,43.23711405679532,50.27632882106331,50.27632882106331,50.27632882106331,51.974815611934474,51.974815611934474,52.91311016711496,52.91311016711496,52.91311016711496,52.91311016711496,52.91311016711496,52.91311016711496,52.91311016711496,52.91311016711496,52.91311016711496,52.91311016711496,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,57.18569869521599,60.39236536188263,64.63903202854927,64.63903202854927,64.63903202854927,64.63903202854927,64.63903202854927,64.63903202854927,64.63903202854927,64.63903202854927,64.63903202854927,64.63903202854927,38.38012447689108,38.38012447689108,38.38012447689108]
- run.dodgeSteps: [964.392640000084,970.840640000088,977.288640000092,983.7366400000959,990.1846400000999,996.6326400001038,1000.8238400001064,1000.8238400001064,1000.8238400001064,1004.2627733334418,1007.3793066667771,1007.3793066667771,1009.3137066667783,1015.6542400001156,1020.275306666785,1025.7561066667884,1031.129440000125,1037.577440000129,1044.025440000133,1050.4734400001369,1056.9214400001408,1063.3694400001448,1069.8174400001487,1074.0086400001514,1075.9430400001525,1082.3910400001564,1088.8390400001604,1095.2870400001643,1101.7350400001683,1108.1830400001722,1114.6310400001762,1121.0790400001802,1127.5270400001841,1133.975040000188,1140.423040000192,1146.871040000196,1153.3190400002,1159.767040000204,1166.2150400002079,1172.6630400002118,1179.1110400002158,1185.5590400002197,1192.0070400002237,1198.4550400002277,1204.9030400002316,1211.3510400002356,1217.7990400002395,1224.2470400002435,1230.6950400002474,1237.1430400002514,1243.5910400002554,1250.0390400002593,1256.4870400002633,1262.9350400002672,1269.3830400002712,1275.8310400002752,1282.279040000279,1288.727040000283,945.0486400000722,951.4966400000761,957.9446400000801]
- run.curseSince: 13777
- run.goldEarned: 474.868
- run.goldSpent: 217
- run.bossChests: 8
- run.paidChests: 3
- run.bossesKilled: 2
- run.elitesKilled: 8
- run.peakEnemies: 174
- run.shrinesUsed: 2
- run.grokBotHelps: 3
- run.throttles: 8
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2204
- counters.hits: 3058
- counters.gems: 190
- counters.coins: 75
- counters.shots: 1840
- counters.hostileShots: 59
- counters.nearMisses: 4
- shrineTotals.cooldown: 0.03
- shrineTotals.armor: 20
- Gold, spots and chests: gold held at the end 257, spent 217 (Potato Crate 217); spots charged and used: Potato Crate 3, Crop Patch 2, Beetle Nest 1, Spud Freezer 1; chests seen 10, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:07 took Butter Streak 64% over Mash Golem 33%, Golden Fry 3%; 0:17 took Seeker Sprouts 45% over Sprout Satellites 30%, Big Bowl 25%; 0:23 took GPU 63% over Seeker Sprouts 24%, Butter Streak 13%; 0:28 took Fry Lance 84% over Hash Rush 14%, Masher Grip 2%; 0:28 took Mash Snowball 75% over Butter Streak 17%, Masher Grip 8%; 0:42 took Fry Lance 46% over Mash Snowball 25%, Butter Streak 16%, Leave 13%; 0:45 took Starch Plating 65% over Butter Streak 26%, Fertilizer 9%; 1:17 took Fry Lance 55% over Mash Snowball 20%, Butter Streak 14%, Leave 11%; 1:25 took Cooldown 55% over Duration 35%, Move speed 10%; 1:26 took Harvest Moon 71% over Butter Pat 13%, Fertilizer 11%, Reroll 5%; 1:54 took Fry Lance 78% over Leave 8%, Butter Streak 7%, Harvest Moon 7%; 2:08 took Starch Puddle 73% over Lean Lunch 14%, Fertilizer 9%, Reroll 4%; 2:29 took Starch Puddle 37% over Fertilizer 31%, Reroll 20%, Butter Streak 12%; 2:58 took Starch Plating 66% over Harvest Moon 17%, Reroll 9%, Fertilizer 8%; 3:14 took Armor 97% over Gold gain 2%, Duration 1%; 3:22 took Starch Puddle 43% over Fertilizer 24%, Harvest Moon 18%, Reroll 15%; 3:49 took Peel Out 69% over Butter Streak 15%, Fertilizer 9%, Reroll 7%.
