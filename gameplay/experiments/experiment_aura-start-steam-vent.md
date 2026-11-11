# Does a steam-vent start live 4:00 more often than seeker-sprouts with the opening knobs?

| Field | Value |
| --- | --- |
| Status | done |
| Area | build |
| Result | refuted |
| Created | L4.I8 |
| Updated | L4.I9 |

## Hypothesis

Steam-vent is an aura that hurts everything in contact without aiming, and its evolution Pressure Cooker (with root-network) heals. Pests that reach Tibo are exactly what kills thin openings, so it should survive the 1:00-3:30 window more often than seeker-sprouts (6 of 10 alive at 4:00 on s31-40). It was only tested fresh in loop 1 without the knobs (died 3:12, 1 chest).

## Method

Steam-vent with the playbook knobs and prompts, 240 s from 0:00 on s31-35, paired with the playbook games on file. Read 4:00 survival, chests by 2:00, damage dealt by 2:00, Pressure Cooker timing, max hp and damage taken by killer. If it lives 5 of 5, play s36-40 next iteration to reach 10 pairs; otherwise it is out.

## Findings

Steam-vent with the knobs, 240 s on s31-35: alive at 4:00 on 1 of 5 against 3 of 5 for seeker-sprouts. Deaths at 3:23, 2:52, 2:02 and 2:53 with 120 max hp and 0 chests opened (2-6 listed per game). The aura stayed at 1/8 and Pressure Cooker never came. Not extended to s36-40.

## Games

### L4.I8.G1: steam-vent s31

- Start: a fresh game on Nightmare 1 with steam-vent, seed 31; 240s; plays the playbook.
- Outcome: died after 203.8s (game clock 03:23); damage taken 138 (enemy:aphid 3.076, enemy:sprout-mite 8.878, enemy:crumb-ant 6.388, enemy:oil-drip 12.741); 913 kills; level 1 to 9; planner asked 70 times, action model 485; the models saw the game 36 ms late (p90 60); ended with steam-vent 1, frozen-fries 2, tater-pup 1, spud-decoy 1, frying-pan 1, small-fry 1, gpu 1, root-network 1.
- run.timeSec: 203.833
- run.level: 8
- run.kills: 913
- run.damageBySource: steam-vent 1517.275, frozen-fries 4061.273, tater-pup 2739.435, spud-decoy 6527.443, frying-pan 2957.224, alex 1989.666, small-fry 883.752
- run.damageTakenBySource: enemy:aphid 3.076, enemy:sprout-mite 8.878, enemy:crumb-ant 6.388, enemy:oil-drip 12.741, enemy:fry-fly 40.973, enemy:sand-crab 11.903, boss:amusing 18.849, enemy:bowling-ball 14.681, enemy:ketchup-drop 5.041, enemy:potato-beetle 7.72, boss:beetle-queen 8.16
- run.killsBySource: steam-vent 58, frozen-fries 139, tater-pup 129, spud-decoy 360, frying-pan 127, alex 71, small-fry 29
- run.biomes: ["fry-oil-desert","chip-canyons","gutterball-lanes","ketchup-bog","mash-swamp","peel-forest","frozen-tundra","compost-caves"]
- run.distance: 11481.27
- run.dodgePoints: 1507.666
- run.dodgeSecond: 203
- run.dodgeTaken: [110.22461482759608,114.88569752862566,114.88569752862566,114.88569752862566,114.88569752862566,114.88569752862566,114.88569752862566,117.60554752862566,124.35098213640315,126.30292597446729,126.30292597446729,126.30292597446729,131.12206701733524,131.12206701733524,131.12206701733524,131.12206701733524,131.12206701733524,131.12206701733524,131.12206701733524,133.84191701733525,133.84191701733525,80.04399351882594,80.04399351882594,80.04399351882594,80.04399351882594,80.04399351882594,80.04399351882594,80.04399351882594,80.04399351882594,80.04399351882594,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,81.82210852801406,86.75342191197002,86.75342191197002,91.68410836913952,94.16294381413047,94.16294381413047,94.16294381413047,94.16294381413047,94.16294381413047,94.16294381413047,94.16294381413047,94.16294381413047,94.16294381413047,94.16294381413047,98.00739774042016,101.86163903859291,105.72719200929424]
- run.dodgeSteps: [1053.276999999899,1059.4769999998962,1065.6769999998933,1071.8769999998904,1078.0769999998874,1084.2769999998845,1090.4769999998816,1096.6769999998787,1102.8769999998758,1110.9836666665415,1116.8736666665386,1118.6303333332046,1121.62699999987,1125.2436666665349,1125.2436666665349,1125.2436666665349,1125.2436666665349,1125.2436666665349,1134.5903333331999,1138.7236666665312,1144.9236666665283,837.9299999999969,844.1766666666633,846.553333333329,850.0666666666606,854.6133333333252,860.8133333333222,865.1533333333202,870.526666666651,879.6666666666495,883.489999999981,889.6899999999781,895.8899999999752,902.0899999999723,904.9833333333042,909.7366666666354,914.5933333332998,915.6266666666327,919.9666666666305,926.1666666666276,930.9199999999588,937.1199999999559,943.319999999953,949.5199999999501,953.8599999999481,960.0599999999451,964.2966666666098,970.4966666666069,976.696666666604,981.759999999935,987.959999999932,994.1599999999291,1000.3599999999262,1003.8629999999224,1009.8769999999195,1016.0769999999166,1022.2769999999136,1028.4769999999107,1034.6769999999078,1040.876999999905,1047.076999999902]
- run.curseSince: 8152
- run.killer: "enemy:sand-crab"
- run.goldEarned: 86.782
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 177
- run.grokBotHelps: 4
- run.throttles: 7
- run.lootRunnersMet: [1]
- counters.kills: 913
- counters.hits: 2019
- counters.gems: 225
- counters.coins: 39
- counters.shots: 739
- counters.hostileShots: 180
- counters.nearMisses: 3
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 86, spent 0; spots charged and used: Spud Freezer 2; chests seen 3, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:33 took Frozen Fries 76% over Steam Vent 21%, Potato Magnet 3%; 0:44 took Tater Tot Pup 62% over Frozen Fries 36%, Golden Fry 2%; 1:08 took Spud Decoy 58% over Tailgate Fries 27%, Tater Trot 15%; 1:16 took GPU 55% over Tater Mines 36%, Slow Cooker 9%; 1:33 took Frozen Fries 49% over Steam Vent 27%, Clean Plate 24%; 1:50 took Frying Pan 74% over Tater Tot Pup 12%, Reroll 9%, Fertilizer 5%; 2:15 took Root Network 70% over Frozen Fries 13%, Reroll 11%, Steam Vent 6%; 2:50 took Small Fry 35% over Steam Vent 34%, Reroll 20%, Tater Tot Pup 11%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:57 level 3, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Frozen Fries 1/8, Tater Tot Pup 1/8 | 1:59 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Frozen Fries 2/8, Tater Tot Pup 1/8, Spud Decoy 1/8, Frying Pan 1/8, GPU 1/5 | 2:58 level 9, maxHp 120, armor 0, damageMult 1, recovery 0.25, Steam Vent 1/8, Frozen Fries 2/8, Tater Tot Pup 1/8, Spud Decoy 1/8, Frying Pan 1/8, Small Fry 1/8, GPU 1/5, Root Network 1/5 | 3:23 level 9, maxHp 120, armor 0, damageMult 1, recovery 0.25, Steam Vent 1/8, Frozen Fries 2/8, Tater Tot Pup 1/8, Spud Decoy 1/8, Frying Pan 1/8, Small Fry 1/8, GPU 1/5, Root Network 1/5.
- Passive levels first reached: GPU 1 at 1:16; Root Network 1 at 2:16.

### L4.I8.G2: steam-vent s32

- Start: a fresh game on Nightmare 1 with steam-vent, seed 32; 240s; plays the playbook.
- Outcome: died after 173s (game clock 02:52); damage taken 131 (enemy:sprout-mite 17.64, Spore vent 14, enemy:compost-maggot 2.739, enemy:potato-beetle 9.051); 477 kills; level 1 to 8; planner asked 62 times, action model 491; the models saw the game 28 ms late (p90 48); ended with steam-vent 1, butter-streak 1, fry-sentry 2, sprout-satellites 1, potato-rain 2, afterburner-fries 1, peel-out 1.
- run.timeSec: 172.983
- run.level: 7
- run.kills: 477
- run.damageBySource: steam-vent 1072.163, butter-streak 2411.422, fry-sentry 3952.841, sprout-satellites 1506.994, potato-rain 846.891, grok-bot 184.163, afterburner-fries 305.86
- run.damageTakenBySource: enemy:sprout-mite 17.64, Spore vent 14, enemy:compost-maggot 2.739, enemy:potato-beetle 9.051, enemy:frost-flea 9.724, enemy:aphid 9.533, enemy:fry-fly 10.05, enemy:parking-gull 3.057, Hot oil 3.6, enemy:oil-drip 4.303, enemy:swarm-fly 11.088, boss:amusing 26.61, enemy:cave-grub 8.051, Brambles 1.8
- run.killsBySource: steam-vent 48, butter-streak 110, fry-sentry 189, sprout-satellites 70, potato-rain 45, grok-bot 10, afterburner-fries 5
- run.biomes: ["compost-caves","frozen-tundra","fry-palace","peel-forest","mash-swamp"]
- run.distance: 10220.607
- run.dodgePoints: 1195.987
- run.dodgeSecond: 172
- run.dodgeTaken: [56.13774040931854,57.7835016473208,57.7835016473208,68.87105720287636,68.87105720287636,68.87105720287636,68.87105720287636,68.87105720287636,68.87105720287636,68.87105720287636,68.87105720287636,68.87105720287636,68.87105720287636,68.87105720287636,72.25861686133716,103.46320592091014,105.1691704657089,105.1691704657089,106.88795850828791,112.08924529105543,112.08924529105543,112.08924529105543,112.08924529105543,113.48924529105544,113.68924529105543,113.88924529105543,113.88924529105543,113.88924529105543,115.6612584640999,124.0907476799724,125.86770356251154,125.86770356251154,125.86770356251154,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,127.66393458662202,48.590905685681896,48.590905685681896,50.20643091404367,50.20643091404367,50.20643091404367,54.50929796980665,56.13774040931854,56.13774040931854,56.13774040931854,56.13774040931854]
- run.dodgeSteps: [724.1703333332796,730.3703333332802,736.57033333328,742.770333333279,748.9703333332761,755.1703333332732,760.7813333332718,765.4313333332724,771.6313333332749,777.8313333332775,784.03133333328,788.6813333332819,794.8813333332845,799.2213333332863,805.4213333332889,811.6213333332905,821.4123333332903,827.1163333332883,833.3163333332853,839.5163333332824,845.7163333332795,851.9163333332766,858.1163333332737,867.2873333332733,872.3506666666042,877.723999999935,883.9239999999321,890.1239999999292,891.0539999999288,899.8839999999275,906.0839999999246,910.217333333256,916.417333333253,926.4873333332511,932.6873333332481,938.2673333332456,938.2673333332456,939.4039999999117,949.4739999999098,955.6739999999069,961.873999999904,968.073999999901,974.2739999998981,980.4739999998952,986.6739999998923,992.8739999998894,999.0739999998865,1000.5206666665524,1005.067333333217,1015.1373333332151,1015.9639999998814,662.1703333332839,668.3703333332865,674.570333333289,680.7703333332877,686.9703333332868,693.170333333286,699.3703333332847,705.5703333332818,711.7703333332804,717.9703333332775]
- run.curseSince: 635
- run.killer: "enemy:cave-grub"
- run.goldEarned: 15.383
- run.bossesKilled: 1
- run.elitesKilled: 1
- run.peakEnemies: 117
- run.grokBotHelps: 4
- counters.kills: 477
- counters.hits: 1264
- counters.gems: 196
- counters.coins: 5
- counters.shots: 176
- counters.hostileShots: 216
- counters.nearMisses: 10
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 15, spent 0; spots charged and used: Tater Lantern 1; chests seen 2, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Peel Out 75% over Masher Grip 17%, Potato Magnet 8%; 1:07 took Butter Streak 49% over Sprout Squad 45%, Salt Shaker 6%; 1:09 took Fry Cook Sentry 62% over Steam Vent 19%, Peel Out 19%; 1:10 took Fry Cook Sentry 38% over Steam Vent 31%, Butter Streak 22%, Leave 9%; 1:25 took Sprout Satellites 35% over Mash Mallet 34%, Gravy Heart 31%; 1:49 took Potato Rain 63% over Starch Plating 22%, Butter Socks 13%, Skip 2%; 2:16 took Afterburner Fries 44% over Tater Twirl 30%, Butter Streak 22%, Skip 4%; 2:29 took Potato Rain 56% over Steam Vent 23%, Afterburner Fries 14%, Skip 7%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 2, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Peel Out 1/5 | 2:00 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Butter Streak 1/8, Fry Cook Sentry 2/8, Sprout Satellites 1/8, Potato Rain 1/8, Peel Out 1/5 | 2:52 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Butter Streak 1/8, Fry Cook Sentry 2/8, Sprout Satellites 1/8, Potato Rain 2/8, Afterburner Fries 1/8, Peel Out 1/5.
- Passive levels first reached: Peel Out 1 at 0:10.

### L4.I8.G3: steam-vent s33

- Start: a fresh game on Nightmare 1 with steam-vent, seed 33; 240s; plays the playbook.
- Outcome: died after 122.9s (game clock 02:02); damage taken 121 (enemy:aphid 1.14, enemy:sprout-mite 1.14, enemy:potato-beetle 4.827, enemy:fry-fly 52.937); 372 kills; level 1 to 9; planner asked 44 times, action model 289; the models saw the game 28 ms late (p90 49); ended with steam-vent 2, hot-streak 2, reset-button 2, seed-potato 1, spud-lob 1, mash-snowball 1, sour-cream 1.
- run.timeSec: 122.883
- run.level: 8
- run.kills: 372
- run.damageBySource: steam-vent 996.013, hot-streak 3653.072, reset-button 1287.539, seed-potato 1349.061, spud-lob 1147.418, mash-snowball 728.152
- run.damageTakenBySource: enemy:aphid 1.14, enemy:sprout-mite 1.14, enemy:potato-beetle 4.827, enemy:fry-fly 52.937, enemy:crumb-ant 1.199, Hot oil 10.667, enemy:oil-drip 3.835, enemy:sand-crab 44.098, enemy:lint-bunny 1.451
- run.killsBySource: steam-vent 26, hot-streak 170, reset-button 24, seed-potato 75, spud-lob 51, mash-snowball 26
- run.biomes: ["chip-canyons","fry-oil-desert","coin-laundromat"]
- run.distance: 7269.867
- run.dodgePoints: 795.279
- run.dodgeSecond: 122
- run.dodgeTaken: [112.48517314644772,18.326808150118747,18.326808150118747,18.326808150118747,32.40160222541408,32.40160222541408,32.40160222541408,32.40160222541408,35.568268892080745,36.568268892080745,43.068268892080745,43.068268892080745,43.068268892080745,43.068268892080745,43.068268892080745,43.068268892080745,43.068268892080745,43.068268892080745,47.3899069403756,52.90215309049353,52.90215309049353,65.85667060501225,71.36891675513017,76.88116290524809,83.84392213036186,83.84392213036186,83.84392213036186,83.84392213036186,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,94.86841443059771,99.27260410956022,108.08098346748521,112.48517314644772]
- run.dodgeSteps: [721.5099999999652,364.0433333333246,364.0433333333246,364.0433333333246,367.8666666666578,374.0666666666576,380.26666666665744,386.46666666665726,392.6666666666571,398.8666666666569,405.0666666666567,411.26666666665625,416.1233333333249,418.6033333333244,424.8033333333261,431.00333333332867,435.75666666666393,441.54333333333295,447.2266666666659,453.4266666666655,459.62666666666325,465.8266666666632,472.0266666666653,478.2266666666657,484.42666666666736,490.626666666669,496.82666666667154,503.0266666666741,511.3766666666763,519.2966666666769,525.496666666674,531.696666666671,537.8966666666681,544.0966666666652,550.2966666666623,556.4966666666594,562.6966666666565,568.8966666666536,575.0966666666507,581.2966666666478,587.4966666666448,593.6966666666419,599.8966666666404,606.0966666666397,612.2966666666368,618.4966666666339,624.696666666631,630.8966666666281,637.0966666666258,643.2966666666241,649.496666666625,655.6966666666275,661.89666666663,666.2366666666319,670.3699999999653,680.4399999999653,686.6399999999628,692.8399999999621,699.0399999999634,705.239999999964,715.309999999965]
- run.curseSince: 993
- run.killer: "enemy:fry-fly"
- run.goldEarned: 76.125
- run.elitesKilled: 4
- run.peakEnemies: 100
- run.grokBotHelps: 2
- counters.kills: 372
- counters.hits: 603
- counters.gems: 163
- counters.coins: 47
- counters.shots: 43
- counters.hostileShots: 10
- Gold, spots and chests: gold held at the end 76, spent 0; spots charged and used: Crop Patch 1, Tater Lantern 1, Dinner Bell 1, Beetle Nest 1; chests seen 4, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:13 took Steam Vent 59% over Big Bowl 38%, Salt Shaker 3%; 0:16 took Sour Cream 55% over Four-Eyed Spud 31%, Hearty Helping 14%; 0:24 took Hot Streak 80% over Sour Cream 19%, Bacon Bits 1%; 0:28 took Reset Button 94% over Steam Vent 5%, Spry Sprout 1%; 1:00 took Hot Streak 74% over Starch Bolt 25%, Golden Fry 1%; 1:04 took Seed Potato 78% over Hot Streak 20%, Golden Fry 1%, Skip 1%; 1:08 took Spud Lob 51% over Hot Streak 43%, Steam Vent 4%, Skip 2%; 1:13 took Reset Button 68% over Hot Streak 25%, Spud Lob 4%, Leave 3%; 1:35 took Mash Snowball 47% over Stuffed Skin 43%, Seed Potato 8%, Skip 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:55 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 2/8, Hot Streak 1/8, Reset Button 1/8, Sour Cream 1/5 | 2:00 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 2/8, Hot Streak 2/8, Reset Button 2/8, Seed Potato 1/8, Spud Lob 1/8, Mash Snowball 1/8, Sour Cream 1/5 | 2:02 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 2/8, Hot Streak 2/8, Reset Button 2/8, Seed Potato 1/8, Spud Lob 1/8, Mash Snowball 1/8, Sour Cream 1/5.
- Passive levels first reached: Sour Cream 1 at 0:16.

### L4.I8.G4: steam-vent s34

- Start: a fresh game on Nightmare 1 with steam-vent, seed 34; 240s; plays the playbook.
- Outcome: died after 173.4s (game clock 02:53); damage taken 180 (enemy:sprout-mite 16.066, enemy:compost-maggot 8.421, Spore vent 2.933, enemy:ketchup-drop 19.934); 682 kills; level 1 to 9; planner asked 56 times, action model 509; the models saw the game 30 ms late (p90 48); ended with steam-vent 1, peel-phantom 1, mash-mortar 5, potato-rain 2.
- run.timeSec: 173.383
- run.level: 8
- run.kills: 682
- run.damageBySource: steam-vent 2073.117, mash-mortar 8801.27, potato-rain 2664.44, grok-bot 866.336, peel-phantom 768.849
- run.damageTakenBySource: enemy:sprout-mite 16.066, enemy:compost-maggot 8.421, Spore vent 2.933, enemy:ketchup-drop 19.934, enemy:aphid 15.689, enemy:sand-crab 34.853, enemy:oil-drip 5.892, enemy:bog-slime 10.277, enemy:snow-mold 3.102, enemy:frost-flea 13.065, enemy:wireworm-larva 12.586, enemy:potato-beetle 9.699, enemy:swarm-fly 5.544, boss:amusing 22.175
- run.killsBySource: steam-vent 90, mash-mortar 400, potato-rain 104, grok-bot 49, peel-phantom 39
- run.biomes: ["compost-caves","peel-forest","mash-swamp","chip-canyons"]
- run.distance: 10002.938
- run.dodgePoints: 938.932
- run.dodgeSecond: 173
- run.dodgeTaken: [125.26782003966471,126.9039364762883,132.44771425406609,134.0998893528252,134.0998893528252,134.0998893528252,134.0998893528252,134.0998893528252,134.0998893528252,134.0998893528252,134.0998893528252,139.1167418673438,139.1167418673438,142.44300853401046,142.44300853401046,142.44300853401046,142.44300853401046,144.17181709787727,144.17181709787727,144.17181709787727,144.17181709787727,144.17181709787727,149.71559487565503,156.36812820898837,159.96106154232172,159.96106154232172,159.96106154232172,159.96106154232172,159.96106154232172,159.96106154232172,161.7471428831904,163.53508221686627,163.53508221686627,163.53508221686627,163.53508221686627,165.33674493958927,165.33674493958927,165.33674493958927,165.33674493958927,167.16362400905672,167.16362400905672,167.16362400905672,167.16362400905672,167.16362400905672,167.16362400905672,169.02345734480843,170.88604011144707,178.34910473139087,178.34910473139087,178.34910473139087,178.34910473139087,178.34910473139087,64.82372130760186,71.65507628342738,86.17732477150922,97.71336277078308,109.35498777483281,117.8657583368126,125.26782003966471,125.26782003966471,125.26782003966471]
- run.dodgeSteps: [671.7338333332631,675.8671666665945,682.0671666665916,688.2671666665887,694.4671666665857,701.5271666665828,710.7371666665802,716.9371666665772,721.6904999999084,725.927166666573,732.1271666665701,740.8538333332348,745.607166666566,751.807166666563,758.007166666564,764.2071666665665,770.4071666665691,776.6071666665716,782.8071666665742,792.4638333332425,795.873833333244,802.0738333332465,808.2738333332462,818.3438333332467,824.5438333332446,830.7438333332417,836.9438333332388,843.1438333332359,849.343833333233,855.54383333323,861.7438333332271,866.807166666558,875.9471666665565,881.8371666665538,886.6938333332182,892.8938333332153,899.0938333332124,905.2938333332095,911.9538333332091,918.1538333332062,924.3538333332033,930.5538333332004,936.7538333331975,942.9538333331946,949.1538333331916,959.2238333331898,965.4238333331868,971.6238333331839,977.823833333181,984.0238333331781,994.0938333331762,1000.2938333331733,619.0338333332872,625.2338333332843,631.4338333332814,637.6338333332785,643.8338333332756,650.0338333332727,656.2338333332698,662.4338333332669,668.633833333264]
- run.curseSince: 2878
- run.killer: "enemy:aphid"
- run.goldEarned: 34.703
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 116
- run.shrinesUsed: 1
- run.grokBotHelps: 2
- run.botSwarms: 2
- counters.kills: 682
- counters.hits: 1318
- counters.gems: 256
- counters.coins: 22
- counters.shots: 55
- counters.hostileShots: 190
- counters.nearMisses: 10
- counters.hostileHits: 5
- shrineTotals.area: 0.06
- Gold, spots and chests: gold held at the end 34, spent 0; spots charged and used: Spud Freezer 1, Crop Patch 1; chests seen 3, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:05 took Peel Phantom 41% over Steam Vent 41%, Sprouting Eyes 18%; 0:21 took Mash Mortar 96% over Four-Eyed Spud 2%, Sour Cream 2%; 0:23 took Potato Rain 83% over Steam Vent 12%, Peel Phantom 5%; 0:48 took Area 87% over Luck 8%, Crit 5%; 0:58 took Mash Mortar 50% over Hot Streak 45%, Peel Phantom 5%; 1:25 took Mash Mortar 43% over Big Bowl 40%, Spud Lob 17%; 1:34 took Potato Rain 47% over Reroll 21%, Steam Vent 19%, Peel Phantom 13%; 1:57 took Mash Mortar 65% over Tater Twirl 27%, Reroll 5%, Peel Phantom 3%; 2:45 took Mash Mortar 43% over Big Bowl 31%, Potato Rain 15%, Reroll 11%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Peel Phantom 1/8, Mash Mortar 2/8, Potato Rain 1/8 | 2:00 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Peel Phantom 1/8, Mash Mortar 4/8, Potato Rain 2/8 | 2:53 level 9, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Peel Phantom 1/8, Mash Mortar 5/8, Potato Rain 2/8.

### L4.I8.G5: steam-vent s35

- Start: a fresh game on Nightmare 1 with steam-vent, seed 35; 240s; plays the playbook.
- Outcome: alive after 240.1s (game clock 04:00), health 36/120; damage taken 236 (enemy:aphid 4.691, enemy:sprout-mite 4.934, Spore vent 6.133, Brambles 2.5); 1413 kills; level 1 to 12; planner asked 82 times, action model 656; the models saw the game 29 ms late (p90 50); ended with steam-vent 1, rosti-disc 1, peel-lash 1, mash-wave 5, spud-lob 1, salt-line 2, packed-pan 1, chives 2.
- run.timeSec: 240.133
- run.level: 11
- run.kills: 1413
- run.damageBySource: steam-vent 872.002, rosti-disc 4894.53, peel-lash 6103.188, mash-wave 20202.665, dog:shiba 1443.17, spud-lob 4884.856, salt-line 1259.276, grok-bot 133.662
- run.damageTakenBySource: enemy:aphid 4.691, enemy:sprout-mite 4.934, Spore vent 6.133, Brambles 2.5, enemy:potato-beetle 88.348, boss:amusing 83.157, enemy:sand-crab 3.871, boss:beetle-queen 38.078, enemy:snow-mold 4.287
- run.killsBySource: steam-vent 29, rosti-disc 96, peel-lash 231, mash-wave 824, dog:shiba 63, spud-lob 146, salt-line 18, grok-bot 6
- run.biomes: ["compost-caves","peel-forest","mash-swamp","chip-canyons","frozen-tundra","ketchup-bog"]
- run.dogs: [{"id":"shiba","at":93.91666666666667}]
- run.dogHelp: damage.shiba 1443.17, hits.shiba 143
- run.distance: 13961.452
- run.dodgePoints: 1351.425
- run.dodgeSecond: 240
- run.dodgeTaken: [202.18239519658175,204.90224519658176,204.90224519658176,204.90224519658176,204.90224519658176,210.34194519658178,210.34194519658178,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,213.06179519658176,217.34864633516202,217.34864633516202,217.34864633516202,217.34864633516202,217.34864633516202,229.78224633516203,235.99904633516206,235.99904633516206,235.99904633516206,235.99904633516206,235.99904633516206,235.99904633516206,174.98389519658176,174.98389519658176,184.05006186324843]
- run.dodgeSteps: [1059.5876299999657,1065.0259599999638,1071.5979599999603,1077.841359999957,1079.5938933332893,1084.4133599999534,1090.65675999995,1095.3666933332809,1100.186159999945,1103.36262666661,1105.772359999942,1110.153693333273,1116.7256933332694,1123.297693333266,1129.8696933332624,1136.4416933332589,1143.0136933332553,1149.5856933332518,1156.1576933332483,1162.7296933332448,1169.3016933332412,1175.8736933332377,1182.4456933332342,1189.0176933332307,1195.5896933332272,1202.1616933332236,1207.2002266665543,1208.6241599998868,1212.4578266665515,1218.1535599998817,1224.7255599998782,1231.2975599998747,1237.8695599998712,1244.4415599998676,1251.0135599998641,1257.5855599998606,1264.157559999857,1270.7295599998536,1277.30155999985,1283.8735599998465,1290.445559999843,1297.0175599998395,1303.589559999836,1310.1615599998324,1316.733559999829,1323.3055599998254,1329.8775599998219,1336.4495599998183,1343.0215599998148,1349.5935599998113,1356.1655599998078,1362.7375599998043,1369.3095599998007,1375.8815599997972,1377.415026666463,1383.9870266664595,1388.6969599997904,1395.2689599997868,1043.469799999971,1050.0417999999675,1055.9730299999649]
- run.curseSince: 8569
- run.goldEarned: 195.245
- run.bossChests: 2
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 175
- run.shrinesUsed: 1
- run.grokBotHelps: 6
- run.lootRunnersMet: [1]
- counters.kills: 1413
- counters.hits: 2645
- counters.gems: 689
- counters.coins: 63
- counters.shots: 1661
- counters.hostileShots: 187
- counters.nearMisses: 22
- counters.hostileHits: 10
- shrineTotals.moveSpeed: 0.06
- Gold, spots and chests: gold held at the end 194, spent 0; spots charged and used: Crop Patch 1, Stray Dog 1; chests seen 6, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Rösti Disc 48% over GPU 48%, Hot Sauce 4%; 0:15 took Peel Lash 64% over Steam Vent 26%, Rösti Disc 10%; 0:27 took Mash Wave 52% over Deep Fryer 39%, Fertilizer 9%; 0:43 took Mash Wave 51% over Spud Decoy 29%, Gem Sling 20%; 0:48 took Move speed 72% over Crit 18%, Duration 10%; 1:35 took Packed Pan 53% over Tater Mines 44%, Fertilizer 3%; 1:40 took Chives 71% over Steam Vent 26%, Bacon Bits 3%; 1:47 took Spud Lob 80% over Mash Wave 12%, Peel Lash 8%; 2:22 took Chives 57% over Spud Lob 30%, Steam Vent 13%; 2:25 took Salt Line 53% over Spud Lob 37%, Hearty Helping 10%; 2:34 took Salt Line 69% over Hot Sauce 19%, Hearty Helping 12%; 3:17 took Mash Wave 44% over Packed Pan 37%, Reroll 13%, Steam Vent 6%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Rösti Disc 1/8, Peel Lash 1/8, Mash Wave 2/8 | 1:59 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Rösti Disc 1/8, Peel Lash 1/8, Mash Wave 2/8, Spud Lob 1/8, Packed Pan 1/5, Chives 1/5 | 2:57 level 11, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Rösti Disc 1/8, Peel Lash 1/8, Mash Wave 3/8, Spud Lob 1/8, Salt Line 2/8, Packed Pan 1/5, Chives 2/5 | 3:59 level 12, maxHp 120, armor 0, damageMult 1, recovery 0, Steam Vent 1/8, Rösti Disc 1/8, Peel Lash 1/8, Mash Wave 5/8, Spud Lob 1/8, Salt Line 2/8, Packed Pan 1/5, Chives 2/5.
- Passive levels first reached: Packed Pan 1 at 1:35; Chives 1 at 1:40.
