# Does a damage-first planner.pick beat the default from 0:00?

| Field | Value |
| --- | --- |
| Status | done |
| Area | models |
| Result | refuted |
| Created | L4.I7 |
| Updated | L4.I8 |

## Hypothesis

Early damage is the gate: survivors dealt about 4600 or more by 2:00 and killed an elite or opened a chest, while armor-first picks cut damage and lost (2 of 8 alive). The inverse text should raise damage by 2:00 and so survival. It takes a Damage stat card first, then new weapons while fewer than 5 are held or levels of weapons below 4, then damage and cooldown passives, and catalysts only for weapons at level 6 or more. It avoids gold, luck, pickup range, crit damage, reroll and skip.

## Method

Seeker-sprouts with the playbook knobs and prompts, only planner.pick changed. 240 s from 0:00 on s31-38, each paired with a playbook game on file (alive at 4:00: s31, s32, s34, s36, s38; dead: s33, s35, s37). Playbook games on s39 and s40 extend the pooled baseline. Read damage dealt by 2:00, weapons held and their levels at 2:00, chests by 2:00, damage taken by 3:00 and survival to 4:00. A change needs at least 7 of 8 alive and a net of 3 or more paired wins.

## Findings

Seeker-sprouts with the damage-first planner.pick, 240 s from 0:00 on s31-38: alive at 4:00 on 4 of 8 against 5 of 8 for the playbook (1 win, 2 losses, 5 ties). It did not raise damage by 2:00 in a way that mattered, and the builds stayed at 120-137 max hp with armor 0 and 1-2 weapons per game above level 3. Deaths came at 2:16-3:27 to the amusing boss, Fry Flies and the 3:00 queen. The playbook on s39 died 3:26 and on s40 lived, so the pooled playbook is 6 of 10. Not added to the playbook.

## Games

### L4.I7.G1: damage-first s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 136.9s (game clock 02:16); damage taken 161 (enemy:wireworm-larva 12.694, enemy:potato-beetle 16.068, enemy:crumb-ant 2.908, Hot oil 14.833); 426 kills; level 1 to 8; planner asked 52 times, action model 133; the models saw the game 32 ms late (p90 53); ended with seeker-sprouts 4, hash-hawk 2, mash-wave 1, harvest-moon 2, mash-finisher 1.
- run.timeSec: 136.917
- run.level: 7
- run.kills: 426
- run.damageBySource: seeker-sprouts 2884.172, hash-hawk 2310, mash-wave 2598.886, harvest-moon 697.194, grok-bot 755.289
- run.damageTakenBySource: enemy:wireworm-larva 12.694, enemy:potato-beetle 16.068, enemy:crumb-ant 2.908, Hot oil 14.833, enemy:oil-drip 2.046, Spore vent 2.533, boss:amusing 98.679, enemy:sand-crab 7.449, enemy:snow-mold 3.378
- run.killsBySource: seeker-sprouts 175, hash-hawk 63, mash-wave 133, harvest-moon 36, grok-bot 19
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","peel-forest","chip-canyons","frozen-tundra","compost-caves"]
- run.distance: 7701.692
- run.dodgePoints: 1116.06
- run.dodgeSecond: 136
- run.dodgeTaken: [47.70885524452237,47.70885524452237,47.70885524452237,47.70885524452237,47.70885524452237,47.70885524452237,47.70885524452237,51.03512191118904,51.03512191118904,53.252633022300145,53.252633022300145,59.905166355633476,84.03746512590192,100.71610362601056,133.97877029267724,26.820445394465263,26.820445394465263,28.98711206113193,37.32044539446526,37.32044539446526,37.32044539446526,37.32044539446526,37.32044539446526,38.79613330407031,38.79613330407031,38.79613330407031,38.79613330407031,38.79613330407031,38.79613330407031,38.79613330407031,38.79613330407031,38.79613330407031,38.79613330407031,38.79613330407031,38.79613330407031,40.84218857785572,40.84218857785572,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,45.17552191118904,46.642188577855705,47.70885524452237,47.70885524452237,47.70885524452237,47.70885524452237,47.70885524452237,47.70885524452237,47.70885524452237,47.70885524452237]
- run.dodgeSteps: [679.3391666666,685.5391666666013,691.7391666666036,697.9391666666007,704.1391666666013,710.3391666666015,716.5391666665986,722.7391666665957,728.9391666665953,735.1391666665978,741.3391666665985,747.539166666598,753.7391666665951,759.9391666665937,766.1391666665919,394.1391666666568,400.33916666665664,406.53916666665646,412.73916666665764,418.9391666666602,425.1391666666599,431.339166666657,437.53916666665407,443.73916666665116,449.93916666664825,456.13916666664556,462.33916666664265,468.53916666663974,474.73916666663683,480.9391666666339,487.1391666666338,493.33916666663634,499.5391666666389,505.73916666664144,511.939166666644,518.1391666666466,524.3391666666491,530.5391666666517,536.7391666666542,542.9391666666568,549.1391666666557,555.3391666666528,561.5391666666499,567.739166666647,573.9391666666471,580.1391666666442,586.3391666666413,592.5391666666384,598.7391666666355,604.9391666666326,611.1391666666296,617.3391666666267,623.5391666666238,629.739166666621,635.9391666666181,642.1391666666152,648.3391666666123,654.5391666666094,660.7391666666065,666.9391666666036,673.1391666666007]
- run.curseSince: 3284
- run.killer: "boss:amusing"
- run.goldEarned: 101.573
- run.bossChests: 2
- run.elitesKilled: 4
- run.peakEnemies: 99
- run.grokBotHelps: 3
- run.botSwarms: 1
- counters.kills: 426
- counters.hits: 733
- counters.gems: 151
- counters.coins: 19
- counters.shots: 346
- counters.hostileShots: 96
- counters.nearMisses: 16
- counters.hostileHits: 6
- Gold, spots and chests: gold held at the end 101, spent 0; spots charged and used: Crop Patch 1, Tater Lantern 1, Spud Freezer 1, Beetle Nest 1; chests seen 4, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:12 took Hash Hawk 86% over Mezzaluna 12%, Aged Russet 2%; 0:25 took Mash Wave 67% over Seeker Sprouts 33%, Golden Fry 0%; 0:54 took Mash Finisher 94% over Stuffed Skin 4%, Butter Socks 2%; 1:02 took Harvest Moon 79% over Starch Puddle 19%, Root Network 1%, Reroll 1%; 1:04 took Harvest Moon 66% over Mash Wave 24%, Mash Finisher 8%, Reroll 2%; 1:30 took Hash Hawk 54% over Seeker Sprouts 40%, Mash Finisher 4%, Reroll 2%; 2:12 took Seeker Sprouts 54% over Hash Hawk 40%, Hearty Helping 3%, Reroll 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Hash Hawk 1/8, Mash Wave 1/8, Mash Finisher 1/5 | 1:59 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Hash Hawk 2/8, Mash Wave 1/8, Harvest Moon 2/8, Mash Finisher 1/5 | 2:16 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 4/8, Hash Hawk 2/8, Mash Wave 1/8, Harvest Moon 2/8, Mash Finisher 1/5.
- Passive levels first reached: Mash Finisher 1 at 0:54.

### L4.I7.G2: damage-first s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 240s; plays the playbook with its own planner.pick.
- Outcome: alive after 240.2s (game clock 04:00), health 120/120; damage taken 57 (enemy:cave-grub 20.217, Brambles 9.8, Hot oil 19.5, Spore vent 0.8); 1345 kills; level 1 to 14; planner asked 89 times, action model 284; the models saw the game 33 ms late (p90 52); ended with seeker-sprouts 1, tater-twister 1, hot-streak 8, tot-stampede 2, tailgate-fries 2, tot-toss 1, salt-shaker 1, chives 1.
- run.timeSec: 240.15
- run.level: 13
- run.kills: 1345
- run.damageBySource: seeker-sprouts 4831.806, tater-twirl 2840.726, hot-streak 20432.899, grok-bot 1907.881, tot-stampede 6460.32, tailgate-fries 2628.79, tot-toss 891.142, tater-twister 313.119
- run.damageTakenBySource: enemy:cave-grub 20.217, Brambles 9.8, Hot oil 19.5, Spore vent 0.8, enemy:wireworm-larva 6.217
- run.killsBySource: seeker-sprouts 167, tater-twirl 60, hot-streak 697, grok-bot 72, tot-stampede 286, tailgate-fries 49, tot-toss 5, tater-twister 9
- run.evolutions: [{"id":"tater-twister","at":218.01666666666668}]
- run.biomes: ["frozen-tundra","compost-caves","peel-forest","ketchup-bog","fry-oil-desert","chip-canyons","crop-circle","mash-swamp"]
- run.distance: 13876.84
- run.dodgePoints: 2122.033
- run.dodgeSecond: 240
- run.dodgeTaken: [50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,50.316608784852235,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,56.533408784852234,50.316608784852235,50.316608784852235,50.316608784852235]
- run.dodgeSteps: [1070.7606666664083,1073.6539999997403,1073.6539999997403,1078.613999999738,1084.8139999997352,1091.0139999997323,1097.2139999997294,1103.4139999997265,1109.6139999997235,1115.8139999997206,1122.0139999997177,1128.2139999997148,1134.413999999712,1140.613999999709,1146.813999999706,1153.0139999997032,1159.2139999997003,1165.4139999996974,1171.6139999996944,1177.8139999996915,1178.5373333330244,1179.8806666663572,1186.0806666663543,1192.2806666663514,1198.4806666663485,1204.6806666663456,1210.8806666663427,1217.0806666663398,1223.2806666663369,1229.480666666334,1235.680666666331,1241.8806666663281,1248.0806666663252,1254.2806666663223,1260.4806666663194,1262.133999999652,1266.16399999965,1272.3639999996471,1278.5639999996442,1284.7639999996413,1290.9639999996384,1297.1639999996355,1303.3639999996326,1309.5639999996297,1315.7639999996268,1321.9639999996239,1328.163999999621,1334.363999999618,1340.5639999996151,1346.7639999996122,1352.9639999996093,1359.1639999996064,1365.3639999996035,1371.5639999996006,1377.1439999995978,1377.1439999995978,1380.5539999995963,1386.7539999995934,1052.160666666417,1058.360666666414,1064.5606666664112]
- run.curseSince: 8807
- run.goldEarned: 448.798
- run.bossChests: 5
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 177
- run.grokBotHelps: 3
- run.botSwarms: 1
- run.lootRunnersMet: [1,1]
- run.lootRunnersCaught: [1,1]
- counters.kills: 1345
- counters.hits: 2213
- counters.gems: 996
- counters.coins: 67
- counters.shots: 1550
- counters.hostileShots: 12
- counters.nearMisses: 1
- Gold, spots and chests: gold held at the end 447, spent 0; spots charged and used: Spud Freezer 1, Crop Patch 1; chests seen 8, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Tater Twirl 89% over Gem Sling 9%, Slow Cooker 2%; 0:27 took Hot Streak 64% over Tater Twirl 29%, Peel Out 7%; 0:33 took Hot Streak 48% over Spud Cannon 40%, Seeker Sprouts 12%; 0:36 took Tater Twirl 58% over Seeker Sprouts 31%, Thick Skin 9%, Reroll 2%; 0:43 took Hot Streak 61% over Harvest Moon 31%, Thick Skin 8%, Reroll 0%; 1:32 took Tot Stampede 75% over Thick Skin 21%, Bacon Bits 3%, Reroll 1%; 1:57 took Tailgate Fries 67% over Thick Skin 18%, Tot Stampede 14%, Reroll 1%; 2:22 took Tot Stampede 43% over Salt Shaker 34%, Fry Cook Sentry 17%, Reroll 6%; 2:24 took Salt Shaker 57% over Hash Boomerang 28%, Gravy Heart 8%, Reroll 7%; 2:26 took Chives 62% over Thick Skin 31%, Hearty Helping 6%, Reroll 1%; 2:54 took Tater Twirl 72% over Chives 23%, Thick Skin 4%, Reroll 1%; 3:07 took Tot Toss 54% over Root Cellar 19%, Thick Skin 17%, Reroll 10%; 3:54 took Tailgate Fries 77% over Hot Sauce 13%, Thick Skin 8%, Reroll 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Tater Twirl 2/8, Hot Streak 7/8 | 1:57 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Tater Twirl 2/8, Hot Streak 7/8, Tot Stampede 1/8, Tailgate Fries 1/8 | 2:57 level 12, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Tater Twirl 5/8, Hot Streak 8/8, Tot Stampede 2/8, Tailgate Fries 1/8, Salt Shaker 1/5, Chives 1/5 | 3:58 level 14, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Tater Twister 1/1, Hot Streak 8/8, Tot Stampede 2/8, Tailgate Fries 2/8, Tot Toss 1/8, Salt Shaker 1/5, Chives 1/5.
- Passive levels first reached: Salt Shaker 1 at 2:24; Chives 1 at 2:26.

### L4.I7.G3: damage-first s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 197.5s (game clock 03:17); damage taken 230 (enemy:sand-crab 23.706, enemy:oil-drip 37.328, enemy:aphid 7.41, enemy:sprout-mite 8.748); 1229 kills; level 1 to 12; planner asked 76 times, action model 430; the models saw the game 30 ms late (p90 49); ended with seeker-sprouts 1, hash-harrier 1, starch-chain 3, starch-bolt 1, tot-toss 1, skipping-cannonball 2, bacon-bits 1.
- run.timeSec: 197.517
- run.level: 11
- run.kills: 1229
- run.damageBySource: seeker-sprouts 3433.06, hash-hawk 7554.502, starch-chain 7085.156, starch-bolt 3548.159, grok-bot 585.837, dog:dalmatian 249.337, tot-toss 645.596, skipping-cannonball 682.276, hash-harrier 6375.509
- run.damageTakenBySource: enemy:sand-crab 23.706, enemy:oil-drip 37.328, enemy:aphid 7.41, enemy:sprout-mite 8.748, Hot oil 23.833, enemy:fry-fly 41.923, enemy:crumb-ant 38.781, boss:amusing 16.631, enemy:swarm-fly 8.316, enemy:lint-bunny 12.331, boss:beetle-queen 10.879
- run.killsBySource: seeker-sprouts 201, hash-hawk 201, starch-chain 406, starch-bolt 172, grok-bot 38, dog:dalmatian 18, tot-toss 41, skipping-cannonball 26, hash-harrier 126
- run.evolutions: [{"id":"hash-harrier","at":182.76666666666668}]
- run.biomes: ["fry-oil-desert","chip-canyons","coin-laundromat"]
- run.dogs: [{"id":"dalmatian","at":142.75}]
- run.dogHelp: damage.dalmatian 249.337, hits.dalmatian 25
- run.distance: 10503.733
- run.dodgePoints: 1231.767
- run.dodgeSecond: 197
- run.dodgeTaken: [198.04736108067482,200.76721108067483,204.00739105904603,206.727241059046,212.69153311527643,217.28708676026073,217.28708676026073,223.273257511936,223.273257511936,223.273257511936,223.273257511936,223.273257511936,223.273257511936,223.273257511936,223.273257511936,90.16332585493706,91.85893165483495,91.85893165483495,95.29964228707044,95.29964228707044,95.29964228707044,95.29964228707044,97.0410989178531,97.0410989178531,98.78255554863577,101.07794209404483,101.07794209404483,101.07794209404483,103.37037278390457,109.75212752202249,112.05965608027748,112.05965608027748,112.05965608027748,112.05965608027748,112.05965608027748,112.05965608027748,112.05965608027748,112.05965608027748,112.05965608027748,118.05965608027746,118.05965608027746,118.05965608027746,130.38536862849747,140.29777906482846,140.29777906482846,140.29777906482846,140.29777906482846,140.29777906482846,140.29777906482846,143.42070103592542,143.42070103592542,145.91903861280298,153.27235573521742,168.6782080343316,182.53208835350688,182.53208835350688,186.2812512619908,187.11458459532412,196.11458459532417,196.11458459532417,196.11458459532417]
- run.dodgeSteps: [977.8433333333427,982.4933333333405,986.5233333333387,991.5866666666695,997.7866666666666,1003.9866666666637,1014.0566666666618,1018.9133333333262,1021.9099999999914,1023.7699999999907,1027.5033333333245,1033.1166666666556,1038.5933333333198,1044.793333333317,1050.3733333333143,704.2166666667657,710.4166666667683,716.6166666667681,722.8166666667652,729.0166666667623,735.2166666667594,741.4166666667564,747.6166666667535,753.8166666667506,760.0166666667477,766.2166666667448,772.4166666667419,776.756666666741,782.9566666667431,789.1566666667436,795.3566666667451,801.5566666667477,807.7566666667462,813.9566666667488,820.1566666667501,826.3566666667472,832.5566666667443,838.7566666667414,844.9566666667384,851.1566666667355,853.7400000000677,859.6300000000649,865.830000000062,872.0300000000591,878.2300000000562,884.4300000000533,890.6300000000504,896.8300000000474,903.0300000000445,909.2300000000416,915.4300000000387,921.6300000000358,927.8300000000329,934.03000000003,940.2300000000271,946.4300000000242,952.6300000000213,958.8300000000183,963.4800000000162,969.6800000000133,975.8800000000103]
- run.curseSince: 8565
- run.killer: "enemy:fry-fly"
- run.goldEarned: 291.975
- run.bossChests: 5
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 151
- run.shrinesUsed: 3
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1229
- counters.hits: 1916
- counters.gems: 259
- counters.coins: 69
- counters.shots: 730
- counters.hostileShots: 74
- counters.nearMisses: 3
- counters.hostileHits: 3
- shrineTotals.area: 0.132
- shrineTotals.maxHp: 14.4
- Gold, spots and chests: gold held at the end 290, spent 0; spots charged and used: Crop Patch 1, Tater Lantern 1, Beetle Nest 1; chests seen 8, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Hash Hawk 56% over Root Spikes 33%, Sprouting Eyes 11%; 0:22 took Hash Hawk 73% over Tater Tot Pup 17%, Gem Sling 10%; 0:28 took Hash Hawk 82% over Seeker Sprouts 14%, Leave 4%; 0:36 took Starch Chain 54% over Broadside 23%, Seeker Sprouts 22%, Skip 1%; 0:54 took Area 96% over XP gain 3%, Gold gain 1%; 1:02 took Area 70% over Cooldown 23%, XP gain 7%; 1:12 took Max HP 88% over XP gain 10%, Gold gain 2%; 1:13 took Hash Hawk 82% over Bacon Bits 15%, Salt Shaker 2%, Skip 1%; 1:22 took Hash Hawk 81% over Seeker Sprouts 10%, Bacon Bits 7%, Reroll 1%, Skip 1%; 1:24 took Bacon Bits 54% over Starch Chain 31%, Butter Pat 12%, Reroll 2%, Skip 1%; 1:34 took Starch Bolt 37% over Bacon Bits 31%, Seeker Sprouts 30%, Reroll 1%, Skip 1%; 2:07 took Starch Chain 68% over Bacon Bits 18%, Starch Bolt 12%, Reroll 1%, Skip 1%; 2:26 took Tot Toss 46% over Seeker Sprouts 34%, Starch Bolt 16%, Reroll 2%, Skip 2%; 2:55 took Skipping Cannonball 45% over Starch Bolt 25%, Butter Pat 21%, Skip 7%, Reroll 2%; 3:16 took Skipping Cannonball 66% over Seeker Sprouts 22%, Bacon Bits 9%, Skip 2%, Reroll 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Hash Hawk 3/8, Starch Chain 1/8 | 1:58 level 8, maxHp 137.28, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Hash Hawk 7/8, Starch Chain 1/8, Starch Bolt 1/8, Bacon Bits 1/5 | 2:59 level 11, maxHp 137.28, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Hash Hawk 8/8, Starch Chain 2/8, Starch Bolt 1/8, Tot Toss 1/8, Skipping Cannonball 1/8, Bacon Bits 1/5 | 3:17 level 12, maxHp 137.28, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Hash Harrier 1/1, Starch Chain 3/8, Starch Bolt 1/8, Tot Toss 1/8, Skipping Cannonball 2/8, Bacon Bits 1/5.
- Passive levels first reached: Bacon Bits 1 at 1:24.

### L4.I7.G4: damage-first s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 240s; plays the playbook with its own planner.pick.
- Outcome: alive after 240.3s (game clock 04:00), health 86/120; damage taken 123 (Hot oil 4.2, enemy:tomato-leech 17.879, enemy:ketchup-drop 1.961, enemy:little-grey 3.703); 1784 kills; level 1 to 12; planner asked 85 times, action model 468; the models saw the game 30 ms late (p90 51); ended with seeker-sprouts 2, locked-gatling 8, hash-hawk 1, hash-boomerang 1, potato-rain 6, sprouting-eyes 1.
- run.timeSec: 240.267
- run.level: 11
- run.kills: 1784
- run.damageBySource: seeker-sprouts 5755.742, locked-gatling 22182.671, hash-hawk 6275.828, hash-boomerang 15756.101, potato-rain 5561.78, grok-bot 380.145
- run.damageTakenBySource: Hot oil 4.2, enemy:tomato-leech 17.879, enemy:ketchup-drop 1.961, enemy:little-grey 3.703, boss:amusing 13.305, enemy:crumb-ant 1.681, enemy:oil-drip 4.697, enemy:aphid 5.987, enemy:spittlebug 15.897, enemy:sprout-mite 1.913, boss:beetle-queen 42.629, enemy:garden-slug 9.288
- run.killsBySource: seeker-sprouts 239, locked-gatling 679, hash-hawk 129, hash-boomerang 545, potato-rain 180, grok-bot 12
- run.biomes: ["ketchup-bog","fry-oil-desert","crop-circle","mash-swamp","chip-canyons"]
- run.distance: 13052.24
- run.dodgePoints: 1894.668
- run.dodgeSecond: 240
- run.dodgeTaken: [56.332840030700616,59.05269003070062,59.05269003070062,59.05269003070062,59.05269003070062,59.05269003070062,59.05269003070062,59.05269003070062,59.05269003070062,59.05269003070062,77.647344019725,96.24199800874936,100.79037357434606,103.51022357434607,103.51022357434607,103.51022357434607,103.51022357434607,103.51022357434607,103.51022357434607,103.51022357434607,103.51022357434607,103.51022357434607,103.51022357434607,103.51022357434607,103.51022357434607,103.51022357434607,108.2496427162239,108.2496427162239,108.2496427162239,108.2496427162239,108.2496427162239,111.01488149955723,111.01488149955723,111.01488149955723,111.01488149955723,111.01488149955723,113.10229698345226,113.10229698345226,113.10229698345226,113.10229698345226,117.33322578841144,117.33322578841144,117.33322578841144,117.33322578841144,117.33322578841144,117.33322578841144,117.33322578841144,117.33322578841144,117.33322578841144,117.33322578841144,117.33322578841144,117.33322578841144,123.13916979326727,123.13916979326727,123.13916979326727,123.13916979326727,123.13916979326727,123.13916979326727,56.332840030700616,56.332840030700616,56.332840030700616]
- run.dodgeSteps: [1045.2166666664905,1051.4166666664876,1057.6166666664847,1063.8166666664818,1070.0166666664788,1076.216666666476,1081.2541666664727,1084.6641666664689,1087.221666666466,1091.0914999997963,1092.538166666462,1096.8781666664602,1101.8381666664577,1107.2114999997887,1111.9648333331197,1116.2014999997843,1119.714833333116,1122.7114999997814,1125.81149999978,1128.8081666664452,1133.7681666664428,1138.5214999997738,1140.4848333331063,1142.7581666664387,1148.9581666664358,1154.7396666664326,1158.1496666664289,1161.559666666425,1164.9696666664213,1169.0306666664178,1175.230666666415,1181.430666666412,1187.630666666409,1192.1773333330734,1196.4139999997383,1198.0673333330708,1204.2673333330679,1208.5039999997325,1214.7039999997296,1220.9039999997267,1227.1039999997238,1230.823999999722,1234.1306666663872,1239.0906666663848,1245.2906666663819,1251.490666666379,1257.690666666376,1263.8906666663731,1270.0906666663702,1276.2906666663673,1281.7673333330315,1285.1773333330298,1291.3773333330269,1295.407333333025,1298.1973333330238,1301.193999999689,1301.607333333022,1303.5706666663546,1026.6166666664992,1032.8166666664963,1039.0166666664934]
- run.curseSince: 4800
- run.goldEarned: 328.15
- run.bossChests: 3
- run.bossesKilled: 3
- run.elitesKilled: 4
- run.peakEnemies: 173
- run.grokBotHelps: 7
- run.lootRunnersMet: [1,1]
- counters.kills: 1784
- counters.hits: 3472
- counters.gems: 345
- counters.coins: 78
- counters.shots: 5602
- counters.hostileShots: 178
- counters.nearMisses: 20
- counters.hostileHits: 10
- Gold, spots and chests: gold held at the end 326, spent 0; spots charged and used: Crop Patch 4, Spud Freezer 2; chests seen 7, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Locked Gatling 68% over Hot Streak 23%, Seeker Sprouts 9%; 0:20 took Hash Hawk 68% over Tot Stampede 19%, Butter Pat 13%; 0:24 took Hash Boomerang 54% over Seeker Sprouts 35%, GPU 11%; 0:26 took Locked Gatling 84% over Hash Boomerang 16%, Thick Skin 0%; 1:20 took Sprouting Eyes 96% over Rotten Spud 3%, Spry Sprout 1%; 1:35 took Potato Rain 88% over Seeker Sprouts 11%, Slow Cooker 1%; 1:45 took Potato Rain 73% over Hash Boomerang 20%, Sour Cream 7%; 2:07 took Potato Rain 75% over Masher Grip 19%, Big Bowl 6%; 2:35 took Seeker Sprouts 54% over Masher Grip 24%, Sprout Satellites 19%, Skip 3%; 3:02 took Potato Rain 76% over Masher Grip 13%, Hash Brown Shield 9%, Skip 2%; 3:45 took Potato Rain 67% over Masher Grip 26%, Sprouting Eyes 5%, Reroll 1%, Skip 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:57 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Locked Gatling 2/8, Hash Hawk 1/8, Hash Boomerang 1/8 | 2:00 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Locked Gatling 5/8, Hash Hawk 1/8, Hash Boomerang 1/8, Potato Rain 2/8, Sprouting Eyes 1/5 | 2:59 level 10, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Locked Gatling 6/8, Hash Hawk 1/8, Hash Boomerang 1/8, Potato Rain 3/8, Sprouting Eyes 1/5 | 3:59 level 12, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Locked Gatling 8/8, Hash Hawk 1/8, Hash Boomerang 1/8, Potato Rain 6/8, Sprouting Eyes 1/5.
- Passive levels first reached: Sprouting Eyes 1 at 1:20.

### L4.I7.G5: damage-first s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 207.8s (game clock 03:27); damage taken 153 (enemy:aphid 2.526, enemy:cave-grub 7.664, enemy:snow-mold 8.94, Spore vent 2.133); 940 kills; level 1 to 10; planner asked 76 times, action model 465; the models saw the game 31 ms late (p90 51); ended with seeker-sprouts 5, spud-dynamo 1, mash-wave 2, julienne-dash 3, starch-bolt 1, broadside 1.
- run.timeSec: 207.817
- run.level: 9
- run.kills: 940
- run.damageBySource: seeker-sprouts 7432.637, spud-dynamo 2516.792, mash-wave 6414.386, julienne-dash 2442.053, starch-bolt 4334.145, grok-bot 150.362, broadside 441.604
- run.damageTakenBySource: enemy:aphid 2.526, enemy:cave-grub 7.664, enemy:snow-mold 8.94, Spore vent 2.133, Brambles 1.7, boss:amusing 56.547, Hot oil 3.867, enemy:ketchup-drop 2.491, enemy:fry-fly 9.861, enemy:oil-drip 2.613, boss:beetle-queen 8.16, enemy:beetle-brood 18.716, enemy:sand-crab 26.043, enemy:crumb-ant 2.033
- run.killsBySource: seeker-sprouts 387, spud-dynamo 62, mash-wave 245, julienne-dash 57, starch-bolt 165, grok-bot 8, broadside 16
- run.biomes: ["compost-caves","frozen-tundra","peel-forest","mash-swamp","fry-oil-desert","ketchup-bog"]
- run.dogs: [{"id":"newfoundland","at":77.86666666666666}]
- run.dogHelp: blocked.newfoundland 8
- run.distance: 11667.163
- run.dodgePoints: 1593.071
- run.dodgeSecond: 207
- run.dodgeTaken: [85.86727167131069,85.86727167131069,85.86727167131069,85.86727167131069,85.86727167131069,85.86727167131069,91.75105866755808,94.47090866755808,97.75033183839687,97.75033183839687,97.75033183839687,97.75033183839687,97.75033183839687,97.75033183839687,109.76035458882161,122.49780947864338,127.04002835736593,127.04002835736593,127.04002835736593,134.4559063126346,134.4559063126346,136.48936476803823,136.48936476803823,136.48936476803823,136.48936476803823,79.5097185484249,79.5097185484249,79.5097185484249,79.5097185484249,79.5097185484249,79.5097185484249,79.5097185484249,79.5097185484249,79.5097185484249,79.5097185484249,79.5097185484249,79.5097185484249,79.5097185484249,83.37638521509156,83.37638521509156,83.37638521509156,83.37638521509156,83.37638521509156,83.37638521509156,83.37638521509156,83.37638521509156,83.37638521509156,83.37638521509156,83.37638521509156,83.37638521509156,85.86727167131069,85.86727167131069,85.86727167131069,85.86727167131069,85.86727167131069,85.86727167131069,85.86727167131069,85.86727167131069,85.86727167131069,85.86727167131069,85.86727167131069]
- run.dodgeSteps: [1030.4296666666094,1036.6296666666065,1042.8296666666035,1049.0296666666006,1055.2296666665977,1061.4296666665948,1067.0096666665922,1071.7629999999233,1077.9629999999204,1083.4396666665846,1088.709666666582,1094.5996666665792,1097.4929999999113,1103.6929999999084,1109.2729999999058,1111.2363333332382,1117.3329999999019,1125.8529999999007,1132.0529999998978,1138.2529999998949,1140.7329999998938,1145.0729999998916,1155.1429999998898,1157.5196666665554,1161.6529999998868,818.5963333333751,824.7963333333726,830.9963333333696,837.1963333333667,843.3963333333638,849.5963333333609,855.796333333358,861.9963333333551,868.1963333333522,874.3963333333493,880.5963333333464,886.7963333333435,892.9963333333405,899.1963333333376,905.3963333333347,911.5963333333318,917.7963333333289,923.996333333326,930.1963333333231,936.3963333333202,942.5963333333173,948.7963333333144,954.9963333333114,961.1963333333085,967.3963333333056,973.5963333333027,979.7963333332998,985.9963333332969,992.196333333294,998.3963333332911,1004.5963333332882,1010.7963333332852,1016.9963333332823,1023.1963333332794,1029.3963333332765,1029.912999999943]
- run.curseSince: 4672
- run.killer: "enemy:sand-crab"
- run.goldEarned: 170.758
- run.bossChests: 3
- run.bossesKilled: 1
- run.elitesKilled: 4
- run.peakEnemies: 182
- run.grokBotHelps: 3
- run.lootRunnersMet: [1]
- counters.kills: 940
- counters.hits: 1621
- counters.gems: 252
- counters.coins: 35
- counters.shots: 1066
- counters.hostileShots: 158
- counters.nearMisses: 10
- counters.hostileHits: 4
- Gold, spots and chests: gold held at the end 170, spent 0; spots charged and used: Spud Freezer 3, Crop Patch 2, Stray Dog 1, Dinner Bell 1; chests seen 5, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Spud Dynamo 86% over Tailgate Fries 8%, Peel Out 6%; 0:15 took Mash Wave 97% over Small Fry 3%, Gravy Heart 0%; 0:44 took Julienne Dash 77% over Tot Stampede 17%, Hot Sauce 6%; 0:46 took Julienne Dash 91% over Butter Socks 9%, Fertilizer 0%; 0:56 took Starch Bolt 86% over Aged Russet 13%, Masher Grip 1%; 1:01 took Julienne Dash 69% over Mash Landing 18%, Mash Wave 13%; 1:23 took Seeker Sprouts 78% over Spud Dynamo 22%, Potato Magnet 0%; 2:11 took Mash Wave 97% over Reroll 2%, Fertilizer 1%, Spud Sneakers 0%; 3:18 took Broadside 56% over Starch Bolt 42%, Fertilizer 1%, Reroll 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:56 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Spud Dynamo 1/8, Mash Wave 1/8, Julienne Dash 2/8, Starch Bolt 1/8 | 1:59 level 8, maxHp 129.6, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Spud Dynamo 1/8, Mash Wave 1/8, Julienne Dash 3/8, Starch Bolt 1/8 | 2:55 level 9, maxHp 129.6, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Spud Dynamo 1/8, Mash Wave 2/8, Julienne Dash 3/8, Starch Bolt 1/8 | 3:27 level 10, maxHp 129.6, armor 0, damageMult 1, recovery 0, Seeker Sprouts 5/8, Spud Dynamo 1/8, Mash Wave 2/8, Julienne Dash 3/8, Starch Bolt 1/8, Broadside 1/8.

### L4.I7.G6: damage-first s36

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 36; 240s; plays the playbook with its own planner.pick.
- Outcome: alive after 240.2s (game clock 04:00), health 80/134; damage taken 80 (Brambles 4.5, Spore vent 9.2, boss:beetle-queen 19.039, enemy:potato-beetle 20.359); 1629 kills; level 1 to 11; planner asked 85 times, action model 306; the models saw the game 30 ms late (p90 50); ended with seeker-sprouts 8, hash-brown-shield 2, tater-mines 2, reset-button 8, spud-cannon 1, hot-start 1.
- run.timeSec: 240.217
- run.level: 10
- run.kills: 1629
- run.damageBySource: seeker-sprouts 25937.738, tater-mines 8118.443, hash-brown-shield 4322.417, reset-button 4455.313, grok-bot 537.713, spud-cannon 4247.933
- run.damageTakenBySource: Brambles 4.5, Spore vent 9.2, boss:beetle-queen 19.039, enemy:potato-beetle 20.359, enemy:aphid 2.007, enemy:sprout-mite 6.166, enemy:cave-grub 18.65
- run.killsBySource: seeker-sprouts 956, tater-mines 253, hash-brown-shield 143, reset-button 95, grok-bot 13, spud-cannon 169
- run.biomes: ["compost-caves","chip-canyons","fry-oil-desert","mash-swamp","peel-forest"]
- run.distance: 12393.283
- run.dodgePoints: 2133.203
- run.dodgeSecond: 240
- run.dodgeTaken: [13.700000000000006,13.700000000000006,16.419850000000007,16.419850000000007,25.486016666666675,25.486016666666675,25.486016666666675,25.486016666666675,25.486016666666675,25.486016666666675,25.486016666666675,25.486016666666675,25.486016666666675,25.486016666666675,28.205866666666676,28.205866666666676,32.17801569166667,32.17801569166667,32.17801569166667,32.17801569166667,32.17801569166667,32.17801569166667,34.185253067092596,34.185253067092596,42.77353811089156,48.84838747872902,48.84838747872902,48.84838747872902,48.84838747872902,48.84838747872902,55.06518747872902,69.56467627797593,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,79.92102756885174,13.700000000000006,13.700000000000006,13.700000000000006]
- run.dodgeSteps: [940.3333333333278,942.0899999999936,943.1233333333264,943.1233333333264,946.7038333333236,953.2138333333183,959.7238333333131,966.2338333333079,972.7438333333026,976.3243333332997,976.3243333332997,976.3243333332997,977.3008333332989,977.3008333332989,982.183333333295,988.6933333332897,995.2033333332845,1001.7133333332793,1008.223333333274,1014.7333333332688,1021.2433333332635,1027.7533333332583,1034.263333333253,1040.7733333332478,1047.2833333332426,1053.7933333332373,1060.303333333232,1066.8133333332269,1073.3233333332216,1079.8333333332164,1083.8478333332132,1089.4898333332087,1095.9998333332035,1102.5098333331982,1109.019833333193,1114.119333333189,1120.6293333331837,1125.4033333331797,1131.9133333331745,1138.4233333331692,1144.933333333164,1151.4433333331588,1157.9533333331535,1164.4633333331483,1170.973333333143,1177.4833333331378,1183.9933333331326,1190.5033333331273,1197.013333333122,1200.810833333119,1202.2213333331179,1204.2828333331163,1209.2738333331122,1215.4583333331072,1221.968333333102,1226.4168333330986,1231.4078333330945,1237.9178333330892,932.5833333333314,938.7833333333285,940.3333333333278]
- run.curseSince: 11739
- run.goldEarned: 345.273
- run.bossChests: 9
- run.bossesKilled: 2
- run.elitesKilled: 10
- run.peakEnemies: 180
- run.shrinesUsed: 4
- run.grokBotHelps: 4
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1629
- counters.hits: 2074
- counters.gems: 392
- counters.coins: 61
- counters.shots: 1114
- counters.hostileShots: 229
- counters.nearMisses: 15
- counters.hostileHits: 5
- shrineTotals.might: 0.12
- shrineTotals.moveSpeed: 0.05
- shrineTotals.maxHp: 12
- Gold, spots and chests: gold held at the end 345, spent 0; spots charged and used: Crop Patch 4, Beetle Nest 2, Dinner Bell 1; chests seen 12, opened 7.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Hash Brown Shield 73% over Tater Tot Pup 24%, Salt Shaker 3%; 0:25 took Tater Mines 74% over Chives 25%, Hearty Helping 1%, Reroll 0%; 0:29 took Seeker Sprouts 46% over Hash Brown Shield 41%, Tater Mines 11%, Reroll 2%; 0:35 took Reset Button 47% over Mash Wave 30%, Hash Brown Shield 22%, Reroll 1%; 0:43 took Reset Button 78% over Peel Phantom 13%, Tater Mines 8%, Reroll 1%; 1:13 took Spud Cannon 53% over Four-Eyed Spud 29%, Frying Pan 16%, Reroll 2%; 1:30 took Seeker Sprouts 42% over Four-Eyed Spud 40%, Hash Brown Shield 17%, Reroll 1%; 1:58 took Hash Brown Shield 94% over Fertilizer 3%, Reroll 2%, Spry Sprout 1%; 2:32 took Hot Start 82% over Fertilizer 9%, Masher Grip 6%, Reroll 3%; 2:45 took Damage 76% over Cooldown 22%, Duration 2%; 2:56 took Max HP 74% over Armor 19%, XP gain 7%; 3:05 took Move speed 64% over Luck 26%, Gold gain 10%; 3:15 took Damage 92% over Max HP 6%, Duration 2%; 3:32 took Tater Mines 58% over Hot Start 39%, Fertilizer 2%, Reroll 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:57 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Hash Brown Shield 1/8, Tater Mines 1/8, Reset Button 7/8 | 1:59 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 7/8, Hash Brown Shield 2/8, Tater Mines 1/8, Reset Button 8/8, Spud Cannon 1/8 | 2:59 level 10, maxHp 134.4, armor 0, damageMult 1.06, recovery 0, Seeker Sprouts 8/8, Hash Brown Shield 2/8, Tater Mines 1/8, Reset Button 8/8, Spud Cannon 1/8, Hot Start 1/5 | 3:58 level 11, maxHp 134.4, armor 0, damageMult 1.12, recovery 0, Seeker Sprouts 8/8, Hash Brown Shield 2/8, Tater Mines 2/8, Reset Button 8/8, Spud Cannon 1/8, Hot Start 1/5.
- Passive levels first reached: Hot Start 1 at 2:32.

### L4.I7.G7: damage-first s37

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 37; 240s; plays the playbook with its own planner.pick.
- Outcome: alive after 240.1s (game clock 04:00), health 76/137; damage taken 189 (enemy:sprout-mite 4.996, enemy:little-grey 21.708, enemy:ketchup-drop 7.719, enemy:compost-maggot 7.282); 1408 kills; level 1 to 13; planner asked 83 times, action model 660; the models saw the game 29 ms late (p90 49); ended with seeker-sprouts 1, full-broadside 1, gem-sling 1, potato-rain 1, frozen-fries 4, locked-gatling 2, sour-cream 1.
- run.timeSec: 240.1
- run.level: 12
- run.kills: 1408
- run.damageBySource: seeker-sprouts 4587.493, broadside 13247.602, gem-sling 5557.528, potato-rain 4258.663, frozen-fries 5258.832, locked-gatling 6094.639, full-broadside 5432.824
- run.damageTakenBySource: enemy:sprout-mite 4.996, enemy:little-grey 21.708, enemy:ketchup-drop 7.719, enemy:compost-maggot 7.282, enemy:bog-slime 5.862, enemy:aphid 15.18, Hot oil 9.867, boss:amusing 22.175, Spore vent 5.333, enemy:cave-grub 33.917, boss:beetle-queen 8.16, enemy:spittlebug 24.321, enemy:garden-slug 9.281, enemy:potato-beetle 8.338, enemy:wireworm-larva 4.426
- run.killsBySource: seeker-sprouts 212, broadside 379, gem-sling 154, potato-rain 172, frozen-fries 164, locked-gatling 166, full-broadside 161
- run.evolutions: [{"id":"full-broadside","at":209.4}]
- run.biomes: ["compost-caves","crop-circle","mash-swamp","peel-forest","ketchup-bog"]
- run.dogs: [{"id":"husky","at":90.96666666666667}]
- run.distance: 13593.448
- run.dodgePoints: 1668.147
- run.dodgeSecond: 240
- run.dodgeTaken: [93.58594626556174,95.47737165943592,97.36082096539789,97.36082096539789,97.36082096539789,97.36082096539789,97.36082096539789,97.36082096539789,97.36082096539789,97.36082096539789,100.08067096539789,100.08067096539789,102.71470865768569,102.71470865768569,106.61491599475227,110.56082724004924,110.56082724004924,113.21247374934319,113.21247374934319,113.21247374934319,120.57270514060762,127.23004847207059,140.14416823601152,140.14416823601152,140.14416823601152,142.1434786819806,146.20583794644736,146.20583794644736,165.2413051918529,165.2413051918529,165.2413051918529,165.2413051918529,165.2413051918529,165.2413051918529,165.2413051918529,165.2413051918529,165.2413051918529,165.2413051918529,177.74793307954712,177.74793307954712,177.74793307954712,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,184.13842017739293,188.56454652346662,93.58594626556174,93.58594626556174,93.58594626556174]
- run.dodgeSteps: [1040.6648333331586,1046.8648333331557,1053.0648333331528,1059.26483333315,1065.464833333147,1071.664833333144,1077.8648333331412,1084.0648333331383,1090.2648333331354,1092.2281666664678,1092.331499999801,1096.7748333331324,1102.9748333331295,1109.1748333331266,1115.3748333331237,1121.5748333331208,1127.7748333331178,1133.974833333115,1140.174833333112,1146.374833333109,1152.5748333331062,1158.7748333331033,1164.9748333331004,1171.1748333330975,1177.3748333330946,1183.5748333330916,1187.6048333330896,1187.6048333330896,1192.8748333330873,1199.0748333330844,1205.2748333330815,1211.4748333330785,1217.6748333330756,1223.8748333330727,1230.0748333330698,1236.274833333067,1242.474833333064,1248.674833333061,1254.8748333330582,1261.0748333330553,1267.2748333330524,1271.9248333330502,1276.3681666663813,1279.2614999997134,1284.944833333044,1290.731499999708,1295.794833333039,1298.378166666371,1302.9248333330356,1309.1248333330327,1315.3248333330298,1321.524833333027,1327.724833333024,1333.924833333021,1340.1248333330182,1346.3248333330152,1352.5248333330123,1358.7248333330094,1022.4781666665006,1028.2648333331645,1034.4648333331616]
- run.curseSince: 11933
- run.goldEarned: 356.455
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 173
- run.shrinesUsed: 1
- run.grokBotHelps: 5
- run.lootRunnersMet: [1,1]
- counters.kills: 1408
- counters.hits: 3591
- counters.gems: 606
- counters.coins: 67
- counters.shots: 2777
- counters.hostileShots: 422
- counters.nearMisses: 22
- counters.hostileHits: 13
- shrineTotals.maxHp: 14.4
- Gold, spots and chests: gold held at the end 356, spent 0; spots charged and used: Crop Patch 4, Tater Lantern 1, Beetle Nest 1; chests seen 8, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:04 took Broadside 97% over Gravy Splash 3%, Gravy Heart 0%; 0:17 took Gem Sling 72% over Packed Pan 26%, Bacon Bits 2%; 0:35 took Broadside 60% over Rösti Disc 28%, Peel Phantom 12%; 1:00 took Potato Rain 78% over Broadside 21%, Salt Shaker 1%; 1:00 took Max HP 56% over Crit 43%, Gold gain 1%; 1:23 took Frozen Fries 53% over Potato Rain 46%, Masher Grip 1%; 1:37 took Frozen Fries 43% over Skipping Cannonball 33%, Gem Sling 24%; 1:54 took Broadside 81% over Grab Bag 11%, Hash Rush 6%, Reroll 2%; 2:17 took Broadside 73% over Skillet Flail 14%, Sour Cream 12%, Reroll 1%; 2:44 took Locked Gatling 39% over Sour Cream 32%, Potato Rain 28%, Reroll 1%; 3:03 took Broadside 66% over Sour Cream 22%, Gem Sling 11%, Reroll 1%; 3:18 took Sour Cream 62% over Potato Rain 35%, Thick Skin 1%, Reroll 1%, Skip 1%; 3:28 took Locked Gatling 57% over Frozen Fries 39%, Skip 2%, Thick Skin 1%, Reroll 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Broadside 2/8, Gem Sling 1/8 | 1:59 level 8, maxHp 137.28, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Broadside 4/8, Gem Sling 1/8, Potato Rain 1/8, Frozen Fries 2/8 | 2:59 level 10, maxHp 137.28, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Broadside 7/8, Gem Sling 1/8, Potato Rain 1/8, Frozen Fries 2/8, Locked Gatling 1/8 | 3:59 level 13, maxHp 137.28, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Full Broadside 1/1, Gem Sling 1/8, Potato Rain 1/8, Frozen Fries 4/8, Locked Gatling 2/8, Sour Cream 1/5.
- Passive levels first reached: Sour Cream 1 at 3:18.

### L4.I7.G8: damage-first s38

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 38; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 197s (game clock 03:17); damage taken 213 (enemy:compost-maggot 1.155, enemy:aphid 20.51, Hot oil 12.133, enemy:cave-grub 8.94); 907 kills; level 1 to 11; planner asked 72 times, action model 468; the models saw the game 31 ms late (p90 52); ended with seeker-sprouts 7, butter-streak 1, hash-hawk 2, julienne-dash 2, hot-sauce 1.
- run.timeSec: 197
- run.level: 10
- run.kills: 907
- run.damageBySource: seeker-sprouts 10208.34, butter-streak 3290.25, hash-hawk 4974.616, julienne-dash 3271.871, grok-bot 68.869, dog:greyhound 833.245
- run.damageTakenBySource: enemy:compost-maggot 1.155, enemy:aphid 20.51, Hot oil 12.133, enemy:cave-grub 8.94, enemy:sprout-mite 19.648, enemy:ketchup-drop 10.883, enemy:potato-beetle 48.849, enemy:oil-drip 4.16, boss:amusing 12.196, enemy:crumb-ant 3.236, enemy:frost-flea 3.203, enemy:swarm-fly 5.544, enemy:fry-fly 2.896, Spore vent 30.4, boss:beetle-queen 5.44, enemy:bog-slime 10.37, enemy:garden-slug 9.17, enemy:wireworm-larva 3.967
- run.killsBySource: seeker-sprouts 493, butter-streak 112, hash-hawk 132, julienne-dash 131, grok-bot 6, dog:greyhound 33
- run.biomes: ["compost-caves","mash-swamp","ketchup-bog","fry-oil-desert","peel-forest"]
- run.dogs: [{"id":"dachshund","at":56.21666666666667},{"id":"greyhound","at":129.25}]
- run.dogHelp: damage.greyhound 833.245, hits.greyhound 43, gold.dachshund 144, finds.dachshund 3
- run.distance: 11426.569
- run.dodgePoints: 1331.312
- run.dodgeSecond: 197
- run.dodgeTaken: [129.75643043647213,129.75643043647213,132.90053842349482,133.56720509016148,133.56720509016148,133.56720509016148,133.56720509016148,146.29201192447147,161.7366687587815,172.78136041288076,174.75552179130088,174.75552179130088,180.0377584061283,191.8386309197077,212.7009595867945,89.84109206416277,94.87568722806282,94.87568722806282,96.5798985386211,96.5798985386211,96.5798985386211,98.32680694880834,98.32680694880834,98.32680694880834,98.32680694880834,98.32680694880834,101.22309710313885,101.22309710313885,101.22309710313885,101.22309710313885,101.48976376980552,102.82309710313885,102.82309710313885,102.82309710313885,104.28976376980552,112.02309710313885,119.48976376980549,127.08976376980547,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213,129.75643043647213]
- run.dodgeSteps: [1050.6489000000051,1057.2209000000016,1063.792899999998,1070.3648999999946,1076.936899999991,1083.5088999999875,1090.080899999984,1096.6528999999805,1103.224899999977,1109.7968999999734,1116.36889999997,1122.9408999999664,1129.5128999999629,1136.0848999999594,1142.6568999999558,778.6776333334506,785.2496333334525,791.8216333334544,798.3936333334564,804.9656333334583,811.5376333334602,818.1096333334622,821.5051666667945,821.5051666667945,823.3672333334601,823.3672333334601,827.9676333334577,833.0061666667883,835.9635666667867,842.5355666667832,849.1075666667797,855.6795666667762,862.2515666667726,868.8235666667691,875.3955666667656,881.9675666667621,888.5395666667586,895.111566666755,901.6835666667515,908.255566666748,914.8275666667445,921.399566666741,927.9715666667374,934.5435666667339,941.1155666667304,945.4969000000614,952.0689000000579,958.6409000000543,965.2129000000508,971.7849000000473,978.3569000000438,984.9289000000402,991.5009000000367,998.0729000000332,1004.6449000000297,1011.2169000000262,1017.7889000000226,1024.3609000000192,1030.9329000000157,1037.5049000000122,1044.0769000000087]
- run.curseSince: 8945
- run.killer: "enemy:aphid"
- run.goldEarned: 272.41
- run.bossChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 2
- run.peakEnemies: 167
- run.shrinesUsed: 1
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 907
- counters.hits: 1323
- counters.crits: 76
- counters.gems: 497
- counters.coins: 196
- counters.shots: 955
- counters.hostileShots: 132
- counters.nearMisses: 10
- counters.hostileHits: 6
- shrineTotals.critChance: 0.04
- Gold, spots and chests: gold held at the end 272, spent 0; spots charged and used: Tater Lantern 1, Stray Dog 1, Crop Patch 1; chests seen 4, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Butter Streak 47% over Seeker Sprouts 42%, Chives 11%; 0:18 took Hash Hawk 84% over Butter Streak 11%, Gravy Splash 4%, Skip 1%; 0:26 took Seeker Sprouts 51% over Frying Pan 38%, GPU 10%, Skip 1%; 0:55 took Julienne Dash 93% over Spud Sneakers 3%, Hot Sauce 3%, Skip 1%; 1:18 took Hash Hawk 63% over Julienne Dash 32%, Butter Streak 3%, Leave 2%; 1:30 took Hot Sauce 72% over Clean Plate 15%, Reroll 6%, Skip 5%, Root Network 2%; 1:31 took Seeker Sprouts 86% over Aged Russet 8%, Tater Trot 4%, Reroll 1%, Skip 1%; 2:02 took Seeker Sprouts 69% over Root Cellar 30%, Reroll 1%, Fertilizer 0%, Skip 0%; 2:03 took Julienne Dash 85% over Hot Sauce 13%, Reroll 1%, Skip 1%, Fertilizer 0%; 2:08 took Seeker Sprouts 97% over Spud Sneakers 1%, Reroll 1%, Skip 1%, Fertilizer 0%; 2:29 took Crit 68% over Max HP 29%, Armor 3%; 2:32 took Seeker Sprouts 92% over Hot Sauce 7%, Reroll 1%, Fertilizer 0%, Skip 0%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Butter Streak 1/8, Hash Hawk 1/8, Julienne Dash 1/8 | 2:00 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 4/8, Butter Streak 1/8, Hash Hawk 2/8, Julienne Dash 1/8, Hot Sauce 1/5 | 2:59 level 11, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 7/8, Butter Streak 1/8, Hash Hawk 2/8, Julienne Dash 2/8, Hot Sauce 1/5 | 3:16 level 11, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 7/8, Butter Streak 1/8, Hash Hawk 2/8, Julienne Dash 2/8, Hot Sauce 1/5.
- Passive levels first reached: Hot Sauce 1 at 1:30.

### L4.I7.G9: playbook s39

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 39; 240s; plays the playbook.
- Outcome: died after 206.5s (game clock 03:26); damage taken 148 (enemy:frost-flea 6.547, enemy:snow-mold 22.895, enemy:aphid 1.191, enemy:potato-beetle 6.175); 1250 kills; level 1 to 12; planner asked 78 times, action model 397; the models saw the game 30 ms late (p90 49); ended with seeker-sprouts 4, peel-lash 2, starch-bolt 1, butter-streak 5, frozen-fries 1, deep-fryer 1, butter-socks 1.
- run.timeSec: 206.483
- run.level: 11
- run.kills: 1250
- run.damageBySource: seeker-sprouts 5332.588, peel-lash 4119.491, starch-bolt 5283.085, butter-streak 8683.374, frozen-fries 1875.133, deep-fryer 2642.267, grok-bot 77.477, mash-bomb 1010.182
- run.damageTakenBySource: enemy:frost-flea 6.547, enemy:snow-mold 22.895, enemy:aphid 1.191, enemy:potato-beetle 6.175, enemy:sprout-mite 1.377, boss:amusing 39.638, enemy:swarm-fly 2.376, boss:beetle-queen 35.782, enemy:sand-crab 11.738, enemy:fry-fly 2.86, enemy:crumb-ant 5.216, enemy:oil-drip 4.607, enemy:wireworm-larva 3.433, enemy:garden-slug 4.134
- run.killsBySource: seeker-sprouts 301, peel-lash 209, starch-bolt 238, butter-streak 336, deep-fryer 61, frozen-fries 47, grok-bot 6, mash-bomb 52
- run.biomes: ["frozen-tundra","chip-canyons","fry-oil-desert"]
- run.distance: 11242.105
- run.dodgePoints: 1593.082
- run.dodgeSecond: 206
- run.dodgeTaken: [97.10339635205645,97.10339635205645,97.10339635205645,97.10339635205645,97.10339635205645,99.4745797946982,99.4745797946982,103.4498798323634,103.4498798323634,103.4498798323634,107.43654689667825,116.44289626039436,116.44289626039436,116.44289626039436,118.16485938478112,127.28118684651987,127.28118684651987,139.14198701251334,139.14198701251334,139.14198701251334,139.14198701251334,139.14198701251334,141.46295828142487,143.83414172406663,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,73.30809935746453,75.67928280010628,78.05046624274803,78.05046624274803,78.05046624274803,78.05046624274803,78.05046624274803,78.05046624274803,78.05046624274803,78.05046624274803,78.05046624274803,78.05046624274803,78.05046624274803,80.42164968538978]
- run.dodgeSteps: [983.4956666666409,989.695666666638,995.8956666666351,1002.0956666666322,1008.2956666666292,1014.4956666666263,1020.6956666666234,1025.1389999999546,1029.6489999999537,1040.1123333332866,1044.5556666666178,1050.6523333332816,1054.9923333332795,1065.0623333332776,1071.2623333332747,1074.4656666666065,1079.012333333271,1089.0823333332692,1095.2823333332663,1101.4823333332633,1106.65933333326,1110.1623333332564,1115.013833333253,1121.21383333325,764.3256666667343,770.5256666667314,776.7256666667284,782.9256666667255,789.1256666667226,795.3256666667197,801.5256666667168,807.7256666667147,813.9256666667158,820.1256666667175,826.3256666667146,832.5256666667117,838.7256666667088,844.9256666667059,851.125666666703,857.3256666667,863.5256666666971,869.7256666666942,874.4790000000254,880.6790000000225,886.7756666666862,887.8090000000191,894.0090000000162,900.2090000000132,906.4090000000103,912.6090000000074,918.8090000000045,925.0090000000016,931.2089999999987,937.4089999999958,943.6089999999929,949.80899999999,956.008999999987,962.2089999999841,964.8956666666496,971.0956666666467,977.2956666666438]
- run.curseSince: 10895
- run.killer: "enemy:garden-slug"
- run.goldEarned: 129.955
- run.goldSpent: 15
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 181
- run.shrinesUsed: 2
- run.grokBotHelps: 4
- run.lootRunnersMet: [1]
- counters.kills: 1250
- counters.hits: 2217
- counters.gems: 853
- counters.coins: 33
- counters.shots: 951
- counters.hostileShots: 391
- counters.nearMisses: 16
- counters.hostileHits: 5
- shrineTotals.duration: 0.102
- shrineTotals.armor: 10
- Gold, spots and chests: gold held at the end 114, spent 15 (Tater Slots 15); spots charged and used: Tater Lantern 2, Spud Freezer 1; chests seen 3, opened 1.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:14 took Seeker Sprouts 50% over Butter Pat 40%, Potato Magnet 10%; 0:25 took Peel Lash 57% over Gravy Boat 35%, Mezzaluna 8%; 0:39 took Starch Bolt 55% over Peel Lash 38%, Clean Plate 7%; 1:03 took Duration 68% over Max HP 29%, Move speed 3%; 1:07 took Butter Streak 65% over Gravy Heart 18%, Thick Skin 9%, Reroll 8%; 1:14 took Armor 55% over Move speed 43%, Crit 2%; 1:20 took Butter Streak 32% over Starch Bolt 32%, Peel Lash 30%, Leave 6%; 1:23 took Frozen Fries 66% over Butter Streak 18%, Reroll 10%, Peel Lash 6%; 1:24 took Deep Fryer 51% over Sour Cream 23%, Seeker Sprouts 13%, Reroll 13%; 1:35 took Butter Streak 46% over Frozen Fries 25%, Reroll 16%, Fertilizer 13%; 1:52 took Butter Streak 72% over Fertilizer 13%, Reroll 11%, Starch Bolt 4%; 1:53 took Peel Lash 53% over Fertilizer 25%, Reroll 13%, Potato Magnet 9%; 2:16 took Butter Socks 54% over Peel Lash 23%, Fertilizer 14%, Reroll 9%; 2:24 took Butter Streak 57% over Spud Sneakers 29%, Reroll 10%, Fertilizer 4%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:56 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Peel Lash 1/8, Starch Bolt 1/8 | 1:59 level 10, maxHp 120, armor 10, damageMult 1, recovery 0, Seeker Sprouts 4/8, Peel Lash 2/8, Starch Bolt 1/8, Butter Streak 4/8, Frozen Fries 1/8, Deep Fryer 1/8 | 2:59 level 12, maxHp 120, armor 10, damageMult 1, recovery 0, Seeker Sprouts 4/8, Peel Lash 2/8, Starch Bolt 1/8, Butter Streak 5/8, Frozen Fries 1/8, Deep Fryer 1/8, Butter Socks 1/5 | 3:26 level 12, maxHp 120, armor 10, damageMult 1.1, recovery 0, Seeker Sprouts 4/8, Peel Lash 2/8, Starch Bolt 1/8, Butter Streak 5/8, Frozen Fries 1/8, Deep Fryer 1/8, Butter Socks 1/5.
- Passive levels first reached: Butter Socks 1 at 2:16.

### L4.I7.G10: playbook s40

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 40; 240s; plays the playbook.
- Outcome: alive after 240.2s (game clock 04:00), health 76/120; damage taken 110 (Hot oil 23.867, enemy:cave-grub 36.772, enemy:compost-maggot 1.639, boss:amusing 2.218); 1991 kills; level 1 to 15; planner asked 94 times, action model 337; the models saw the game 30 ms late (p90 51); ended with overgrowth 1, chip-shuriken 1, mash-snowball 2, hot-streak 6, deep-fryer 1, mash-landing 1, chives 2, peel-out 1, fertilizer 1, thick-skin 1.
- run.timeSec: 240.2
- run.level: 14
- run.kills: 1991
- run.damageBySource: seeker-sprouts 18980.225, chip-shuriken 7604.088, mash-snowball 4541.285, hot-streak 9144.003, deep-fryer 1373.714, grok-bot 146.48, overgrowth 22252.344
- run.damageTakenBySource: Hot oil 23.867, enemy:cave-grub 36.772, enemy:compost-maggot 1.639, boss:amusing 2.218, enemy:snow-mold 3.271, Spore vent 2, boss:beetle-queen 35.358, Brambles 4.5
- run.killsBySource: seeker-sprouts 813, chip-shuriken 169, mash-snowball 151, hot-streak 298, deep-fryer 45, grok-bot 7, overgrowth 508
- run.evolutions: [{"id":"overgrowth","at":216.08333333333334}]
- run.biomes: ["fry-oil-desert","chip-canyons","frozen-tundra","compost-caves","peel-forest","mash-swamp","ketchup-bog"]
- run.dogs: [{"id":"retriever","at":32.733333333333334}]
- run.dogHelp: fetched.retriever 481
- run.distance: 13557.953
- run.dodgePoints: 1887.733
- run.dodgeSecond: 240
- run.dodgeTaken: [65.23359471572455,67.95344471572454,67.95344471572454,67.95344471572454,67.95344471572454,70.67329471572455,79.73946138239121,82.45931138239122,100.59164471572456,100.59164471572456,100.59164471572456,100.59164471572456,100.59164471572456,100.59164471572456,100.59164471572456,100.59164471572456,101.39164471572455,101.39164471572455,101.39164471572455,101.39164471572455,101.39164471572455,101.39164471572455,101.39164471572455,101.39164471572455,101.39164471572455,101.39164471572455,101.39164471572455,103.19164471572455,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,105.09164471572456,109.62497804905787,109.62497804905787,109.62497804905787,109.62497804905787,109.62497804905787,109.62497804905787,109.62497804905787,109.62497804905787,109.62497804905787,65.23359471572455,65.23359471572455,65.23359471572455]
- run.dodgeSteps: [1047.655333333341,1047.655333333341,1047.655333333341,1047.655333333341,1051.4786666666728,1057.6786666666699,1063.878666666667,1070.078666666664,1076.2786666666611,1079.171999999993,1085.2686666666568,1091.468666666654,1097.668666666651,1103.868666666648,1110.0686666666452,1116.2686666666423,1121.641999999973,1121.641999999973,1121.641999999973,1124.9486666666382,1131.1486666666353,1137.3486666666324,1143.5486666666295,1149.7486666666266,1155.9486666666237,1162.1486666666208,1168.3486666666179,1174.548666666615,1180.748666666612,1186.9486666666091,1193.1486666666062,1199.3486666666033,1205.5486666666004,1209.0619999999321,1211.955333333264,1218.155333333261,1224.3553333332582,1230.5553333332552,1236.7553333332523,1242.9553333332494,1249.1553333332465,1255.3553333332436,1261.5553333332407,1267.7553333332378,1273.9553333332349,1280.155333333232,1286.355333333229,1292.5553333332261,1298.7553333332232,1304.9553333332203,1311.1553333332174,1317.3553333332145,1323.5553333332116,1329.7553333332087,1335.9553333332058,1342.1553333332029,1348.3553333332,1354.555333333197,1029.9853333333494,1036.1853333333465,1042.3853333333436]
- run.curseSince: 13285
- run.goldEarned: 482.135
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 8
- run.peakEnemies: 179
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 1991
- counters.hits: 3326
- counters.gems: 960
- counters.coins: 101
- counters.shots: 1032
- counters.hostileShots: 96
- counters.nearMisses: 10
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 482, spent 0; spots charged and used: Crop Patch 4, Beetle Nest 2, Tater Lantern 1, Spud Freezer 1; chests seen 10, opened 4.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Chip Shuriken 43% over Spud Fence 30%, Gravy Boat 27%; 0:14 took Mash Snowball 88% over Bacon Bits 8%, Rotten Spud 4%; 0:33 took Hot Streak 44% over Hash Hawk 37%, Gravy Heart 19%; 0:40 took Deep Fryer 72% over Big Bowl 24%, Salt Shaker 4%; 0:54 took Chives 35% over Fry Lance 33%, Skillet Flail 32%; 1:18 took Mash Landing 40% over Chives 31%, Peel Phantom 27%, Skip 2%; 1:34 took Hot Streak 41% over Big Bowl 34%, Aged Russet 12%, Reroll 11%, Skip 2%; 1:49 took Seeker Sprouts 45% over Hot Streak 26%, Reroll 14%, Fertilizer 13%, Skip 2%; 2:01 took Peel Out 65% over Mash Snowball 21%, Reroll 8%, Fertilizer 5%, Skip 1%; 2:10 took Chives 68% over Fertilizer 12%, Rotten Spud 10%, Reroll 9%, Skip 1%; 2:13 took Mash Snowball 42% over Fertilizer 26%, Reroll 18%, Chip Shuriken 10%, Skip 4%; 2:52 took Hot Streak 58% over Hot Start 20%, Fertilizer 15%, Reroll 6%, Skip 1%; 3:29 took Fertilizer 39% over Mash Snowball 39%, Reroll 12%, Hot Sauce 8%, Skip 2%; 3:41 took Thick Skin 52% over Mash Snowball 19%, Spud Sneakers 17%, Reroll 10%, Skip 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Chip Shuriken 1/8, Mash Snowball 1/8, Hot Streak 1/8, Deep Fryer 1/8, Chives 1/5 | 2:00 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 6/8, Chip Shuriken 1/8, Mash Snowball 1/8, Hot Streak 2/8, Deep Fryer 1/8, Mash Landing 1/8, Chives 1/5 | 2:56 level 13, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 8/8, Chip Shuriken 1/8, Mash Snowball 2/8, Hot Streak 6/8, Deep Fryer 1/8, Mash Landing 1/8, Chives 2/5, Peel Out 1/5 | 3:59 level 15, maxHp 120, armor 0, damageMult 1, recovery 0, Overgrowth 1/1, Chip Shuriken 1/8, Mash Snowball 2/8, Hot Streak 6/8, Deep Fryer 1/8, Mash Landing 1/8, Chives 2/5, Peel Out 1/5, Fertilizer 1/5, Thick Skin 1/5.
- Passive levels first reached: Chives 1 at 0:54; Peel Out 1 at 2:01; Fertilizer 1 at 3:29; Thick Skin 1 at 3:41.
