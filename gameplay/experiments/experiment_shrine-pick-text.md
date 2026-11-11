# Does a shrine card priority text give more armor and max HP?

| Field | Value |
| --- | --- |
| Status | done |
| Area | spots |
| Result | refuted |
| Created | L4.I10 |
| Updated | L5.I7 |

## Hypothesis

A planner.pick text for shrine cards (Armor, then Max HP, then Damage, then Cooldown or Move speed; never Gold gain, Luck, Pickup range, XP gain or Crit) raises armor and max HP at 2:00 and cuts health lost by 3:00, because shrine cards cost no weapon level-up. Default picks took Gold gain, Luck and Move speed with 0 gold spent.

## Method

Seeker-sprouts, playbook knobs, default goal text, only planner.pick changed. 240 s from 0:00 on s31-40, paired with the 10 playbook games on file (6 of 10 alive at 4:00). Metrics chosen first: armor and max HP at 2:00, health lost by 3:00, alive at 4:00. Manipulation check: every shrine pick in the picks lines is Armor, Max HP or Damage when offered. Report how many games charged any shrine. Adopt only on 8 or more of 10 alive with a net of 3 or more paired wins.

## Findings

L5.I6 s31-40, 240 s, seeker-sprouts with the shrine-card pick text: 2 of 10 alive at 4:00 (s36, s40) against 6 of 10 for the playbook; 0 wins, 4 losses, 6 ties. Only 3 games charged a shrine, and Armor or Max HP was taken whenever offered. The text also pulled level-up picks toward Gravy Heart, which gave max HP 134-178 but little damage and 0 chests in s37-s39. Deaths came at 1:31-3:09 to Fry Fly, Cave Grub and Snow Mold elites and the amusing boss. Not added to the playbook (B108).

## Games

### L5.I6.G1: shrine picks s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 134.6s (game clock 02:14); damage taken 198 (enemy:bog-slime 7.342, enemy:oil-drip 8.375, enemy:fry-fly 90.375, Hot oil 16.551); 205 kills; level 1 to 7; planner asked 47 times, action model 290; the models saw the game 28 ms late (p90 47); ended with seeker-sprouts 1, aged-russet 2, butter-pat 1, packed-pan 1, gravy-heart 1, lean-lunch 1.
- run.timeSec: 134.55
- run.level: 6
- run.kills: 205
- run.damageBySource: seeker-sprouts 3470.199, dog:dalmatian 617.194
- run.damageTakenBySource: enemy:bog-slime 7.342, enemy:oil-drip 8.375, enemy:fry-fly 90.375, Hot oil 16.551, enemy:crumb-ant 10.653, enemy:bowling-pin 1.766, boss:amusing 56.776, enemy:tomato-leech 5.694
- run.killsBySource: seeker-sprouts 181, dog:dalmatian 24
- run.biomes: ["fry-oil-desert","gutterball-lanes","ketchup-bog","chip-canyons"]
- run.dogs: [{"id":"corgi","at":35.31666666666667},{"id":"dalmatian","at":39.333333333333336}]
- run.dogHelp: damage.dalmatian 617.194, hits.dalmatian 41, frozen.corgi 98
- run.distance: 7794.7
- run.dodgePoints: 743.26
- run.dodgeSecond: 134
- run.dodgeTaken: [129.171888886653,129.171888886653,129.171888886653,129.171888886653,129.171888886653,129.171888886653,129.171888886653,129.171888886653,129.171888886653,129.171888886653,129.171888886653,141.78876244987137,161.1791726881144,68.31730073245166,68.31730073245166,73.93985638174577,73.93985638174577,73.93985638174577,73.93985638174577,80.86979953420055,90.43348110409535,97.36342425655012,109.87613110654596,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,122.09589451241621,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,123.48677528075405,124.94312584641455,124.94312584641455,124.94312584641455,124.94312584641455,126.74764646241059,129.171888886653]
- run.dodgeSteps: [703.1066666666298,709.3066666666311,715.5066666666296,721.7066666666302,727.9066666666315,734.1066666666328,740.3066666666344,746.5066666666347,752.7066666666367,758.9066666666387,765.1066666666401,771.3066666666416,777.5066666666423,398.556666666659,404.7566666666588,410.956666666658,417.15666666666056,423.3566666666631,426.45666666666386,432.65666666666186,438.85666666665895,445.05666666665604,451.25666666665313,461.32666666665045,467.52666666664754,473.72666666664463,479.9266666666417,487.8466666666389,496.1966666666361,502.3966666666332,507.9766666666309,511.82066666663013,518.0206666666306,524.2206666666332,530.4206666666357,535.4633333333035,541.4153333333057,551.4853333333056,557.6853333333062,563.8853333333076,568.9279999999735,577.3033333333057,583.5033333333056,589.7033333333081,595.9033333333107,602.1033333333086,608.3033333333057,614.5033333333027,620.7033333332998,626.9033333332969,633.1033333332973,643.1733333332984,649.3733333332978,655.2633333332982,659.7066666666294,665.9066666666265,672.1066666666258,678.3066666666274,684.5066666666299,690.706666666631,696.9066666666328]
- run.curseSince: 7392
- run.killer: "boss:amusing"
- run.goldEarned: 25.463
- run.elitesKilled: 1
- run.peakEnemies: 99
- run.shrinesUsed: 1
- run.grokBotHelps: 3
- counters.kills: 205
- counters.hits: 316
- counters.gems: 79
- counters.coins: 13
- counters.shots: 284
- counters.hostileShots: 70
- counters.nearMisses: 6
- shrineTotals.maxHp: 20.4
- Gold, spots and chests: gold held at the end 25, spent 0; spots charged and used: Stray Dog 2, Crop Patch 1; chests seen 1, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:13 took Aged Russet 49% over Hash Hawk 30%, Mezzaluna 21%; 0:24 took Butter Pat 58% over Reset Button 36%, Tater Trot 6%; 0:41 took Packed Pan 52% over Deep Fryer 24%, Butter Streak 24%; 0:59 took Max HP 65% over Cooldown 34%, Gold gain 1%; 1:00 took Gravy Heart 74% over Butter Pat 17%, Fry Knives 9%; 1:13 took Lean Lunch 65% over Starch Puddle 32%, Spud Dice 3%; 2:03 took Aged Russet 63% over Grab Bag 25%, Clean Plate 12%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 4, maxHp 144.48, armor 6, damageMult 1.218, recovery 0, Seeker Sprouts 1/8, Aged Russet 1/5, Butter Pat 1/5, Packed Pan 1/5 | 1:59 level 6, maxHp 161.818, armor 6, damageMult 1.23, recovery 0, Seeker Sprouts 1/8, Aged Russet 1/5, Butter Pat 1/5, Packed Pan 1/5, Gravy Heart 1/5, Lean Lunch 1/5 | 2:14 level 7, maxHp 161.818, armor 6, damageMult 1.272, recovery 0, Seeker Sprouts 1/8, Aged Russet 2/5, Butter Pat 1/5, Packed Pan 1/5, Gravy Heart 1/5, Lean Lunch 1/5.
- Passive levels first reached: Aged Russet 1 at 0:14; Butter Pat 1 at 0:24; Packed Pan 1 at 0:41; Gravy Heart 1 at 1:00; Lean Lunch 1 at 1:13.

### L5.I6.G2: shrine picks s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 172.2s (game clock 02:52); damage taken 129 (enemy:frost-flea 8.038, enemy:aphid 1.362, enemy:compost-maggot 2.692, enemy:cave-grub 44.698); 335 kills; level 1 to 8; planner asked 54 times, action model 341; the models saw the game 31 ms late (p90 53); ended with seeker-sprouts 1, comet-scythe 5, thick-skin 3.
- run.timeSec: 172.217
- run.level: 7
- run.kills: 335
- run.damageBySource: seeker-sprouts 3457.601, comet-scythe 4441.71
- run.damageTakenBySource: enemy:frost-flea 8.038, enemy:aphid 1.362, enemy:compost-maggot 2.692, enemy:cave-grub 44.698, enemy:sprout-mite 4.031, enemy:potato-beetle 24.189, enemy:parking-gull 1.64, boss:amusing 28.828, enemy:gull-flock 5.554, Hot oil 5.6, enemy:ketchup-drop 2.446
- run.killsBySource: seeker-sprouts 168, comet-scythe 167
- run.biomes: ["frozen-tundra","compost-caves","mash-swamp","fry-palace","chip-canyons","peel-forest","ketchup-bog"]
- run.distance: 10556.913
- run.dodgePoints: 1218.477
- run.dodgeSecond: 172
- run.dodgeTaken: [80.82386661901208,87.47639995234542,93.0302668893977,93.0302668893977,93.0302668893977,93.0302668893977,93.0302668893977,93.0302668893977,93.0302668893977,93.0302668893977,93.0302668893977,93.0302668893977,96.35653355606436,96.35653355606436,96.35653355606436,99.02320022273103,101.95653355606437,101.95653355606437,101.95653355606437,101.95653355606437,101.95653355606437,101.95653355606437,101.95653355606437,101.95653355606437,101.95653355606437,101.95653355606437,101.95653355606437,101.95653355606437,101.95653355606437,101.95653355606437,104.17404466717548,104.17404466717548,104.17404466717548,104.17404466717548,104.17404466717548,104.17404466717548,104.17404466717548,109.99934846312318,109.99934846312318,109.99934846312318,109.99934846312318,109.99934846312318,112.44580644531757,115.77207311198424,115.77207311198424,115.77207311198424,115.77207311198424,115.77207311198424,115.77207311198424,115.77207311198424,115.77207311198424,79.18360794340094,79.18360794340094,79.18360794340094,79.18360794340094,79.18360794340094,79.18360794340094,79.18360794340094,79.18360794340094,79.18360794340094,80.82386661901208]
- run.dodgeSteps: [722.5590000000085,732.6290000000066,738.8290000000067,745.0290000000075,751.2290000000096,757.4290000000067,763.6290000000038,769.8290000000009,776.028999999998,782.228999999995,789.7189999999941,798.4989999999951,804.6989999999929,810.8989999999915,817.098999999994,827.168999999992,833.3689999999891,839.5689999999862,845.7689999999833,851.9689999999804,858.1689999999775,864.3689999999746,870.5689999999717,876.7689999999687,882.9689999999658,889.1689999999629,895.36899999996,901.5689999999571,907.7689999999542,913.9689999999513,920.1689999999484,926.3689999999455,932.5689999999425,942.6389999999407,948.8389999999378,955.0389999999348,961.2389999999319,971.3089999999299,977.508999999927,983.7089999999241,989.025499999921,997.0494999999185,1001.389499999915,1007.0779999999119,1013.277999999909,1019.477999999906,1025.677999999903,1031.8779999999,1041.9479999998982,1048.1479999998953,1054.3479999998924,656.6889999999958,662.8889999999948,669.0889999999973,675.2889999999999,681.4890000000024,687.689000000005,693.8890000000075,703.9590000000062,710.1590000000034,716.359000000006]
- run.curseSince: 3727
- run.killer: "boss:amusing"
- run.goldEarned: 10.238
- run.peakEnemies: 119
- run.grokBotHelps: 1
- counters.kills: 335
- counters.hits: 627
- counters.gems: 194
- counters.coins: 9
- counters.shots: 361
- counters.hostileShots: 340
- counters.nearMisses: 20
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 10, spent 0; spots charged and used: Tater Lantern 1, Frenzy Fryer 1; chests seen 0, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Comet Scythe 59% over Peeler 29%, Sour Cream 12%; 0:18 took Comet Scythe 70% over Seeker Sprouts 28%, Golden Fry 2%; 0:26 took Thick Skin 85% over Root Spikes 12%, Tater Mines 3%; 0:34 took Comet Scythe 68% over Leave 21%, Seeker Sprouts 11%; 0:44 took Comet Scythe 64% over Reset Button 31%, Grab Bag 5%; 0:55 took Thick Skin 76% over Reroll 10%, Big Bowl 9%, Seeker Sprouts 5%; 1:02 took Thick Skin 78% over Reroll 8%, Seeker Sprouts 7%, Big Bowl 7%; 2:28 took Comet Scythe 43% over Reroll 35%, Big Bowl 21%, Fertilizer 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:55 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 4/8, Thick Skin 2/5 | 1:59 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 4/8, Thick Skin 3/5 | 2:51 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Comet Scythe 5/8, Thick Skin 3/5.
- Passive levels first reached: Thick Skin 1 at 0:26, 3 at 1:02.

### L5.I6.G3: shrine picks s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 189.3s (game clock 03:09); damage taken 169 (Hot oil 19.445, enemy:oil-drip 8.554, enemy:aphid 12.238, enemy:sprout-mite 8.243); 722 kills; level 1 to 11; planner asked 66 times, action model 407; the models saw the game 28 ms late (p90 49); ended with seeker-sprouts 1, hash-brown-shield 5, starch-bolt 1, root-spikes 1, potato-rain 1, hearty-helping 2, starch-plating 1, gravy-heart 1.
- run.timeSec: 189.3
- run.level: 10
- run.kills: 722
- run.damageBySource: seeker-sprouts 3588.971, hash-brown-shield 6907.391, starch-bolt 3026.983, root-spikes 1734.334, grok-bot 113.989, potato-rain 21.741
- run.damageTakenBySource: Hot oil 19.445, enemy:oil-drip 8.554, enemy:aphid 12.238, enemy:sprout-mite 8.243, enemy:cave-grub 40.228, enemy:crumb-ant 9.301, enemy:sand-crab 10.084, enemy:fry-fly 16.64, boss:amusing 18.764, boss:beetle-queen 25.486
- run.killsBySource: seeker-sprouts 170, hash-brown-shield 296, starch-bolt 142, root-spikes 107, grok-bot 6, potato-rain 1
- run.biomes: ["fry-oil-desert","chip-canyons","mash-swamp"]
- run.distance: 10965.633
- run.dodgePoints: 1270.606
- run.dodgeSecond: 189
- run.dodgeTaken: [126.57339142344485,128.8903006827041,128.8903006827041,128.8903006827041,128.8903006827041,140.04422581639395,167.45204568171383,95.20109913630516,97.07745469186072,98.33565539929587,101.1501887326292,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,106.77925539929586,112.40832206596254,115.4333350997431,117.99420474922066,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485,126.57339142344485]
- run.dodgeSteps: [1053.6333333333782,1059.8333333333753,1066.0333333333724,1072.2333333333695,1078.4333333333666,1084.6333333333637,1091.693333333361,736.4566666667847,742.6566666667873,748.8566666667898,755.0566666667924,761.2566666667949,767.4566666667974,773.6566666668,779.8566666668025,786.0566666668051,792.2566666668076,798.4566666668102,804.6566666668127,810.8566666668153,817.0566666668178,823.2566666668168,829.4566666668139,835.656666666811,841.8566666668081,848.0566666668052,854.2566666668023,860.4566666667994,864.9000000001306,871.1000000001277,877.3000000001248,883.5000000001219,891.2966666667877,897.4966666667848,901.8366666667828,908.0366666667799,912.6866666667777,914.236666666777,918.3700000001083,920.6433333334405,925.3966666667717,929.6333333334363,935.8333333334334,942.0333333334305,948.2333333334276,954.4333333334247,960.6333333334218,966.8333333334189,973.033333333416,979.233333333413,985.4333333334101,991.6333333334072,997.8333333334043,1004.0333333334014,1010.2333333333985,1016.4333333333956,1022.6333333333927,1028.8333333333899,1035.033333333387,1041.233333333384,1047.4333333333811]
- run.curseSince: 7679
- run.killer: "Hot oil"
- run.goldEarned: 138.698
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 159
- run.grokBotHelps: 5
- run.lootRunnersMet: [1]
- counters.kills: 722
- counters.hits: 1039
- counters.gems: 460
- counters.coins: 54
- counters.shots: 465
- counters.hostileShots: 232
- counters.nearMisses: 10
- counters.hostileHits: 9
- Gold, spots and chests: gold held at the end 138, spent 0; spots charged and used: Crop Patch 2, Tater Lantern 1; chests seen 3, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Hearty Helping 82% over Sour Cream 11%, Four-Eyed Spud 7%; 0:18 took Hash Brown Shield 79% over Butter Socks 14%, Peel Out 7%; 0:30 took Reroll 38% over Sprouting Eyes 25%, Skip 14%, Starch Puddle 13%, Tater Tot Pup 10%; 0:30 took Hash Brown Shield 78% over Skip 12%, Mash Snowball 6%, Tater Twirl 4%; 0:59 took Hash Brown Shield 73% over Hearty Helping 12%, Locked Gatling 10%, Skip 5%; 1:24 took Hearty Helping 45% over Sprouting Eyes 39%, Skip 15%, Potato Magnet 1%; 1:35 took Starch Bolt 59% over Bacon Bits 26%, Skip 14%, Hot Sauce 1%; 1:41 took Root Spikes 42% over Hearty Helping 27%, Seeker Sprouts 22%, Skip 9%; 1:51 took Starch Plating 87% over Reroll 6%, Root Spikes 4%, Gravy Splash 2%, Skip 1%; 2:08 took Gravy Heart 60% over Butter Socks 24%, Reroll 11%, GPU 3%, Skip 2%; 3:07 took Reroll 43% over Root Spikes 25%, Couch Potato 12%, Starch Bolt 11%, Skip 9%; 3:07 took Potato Rain 33% over Hearty Helping 25%, Reroll 25%, Starch Bolt 11%, Skip 6%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Hash Brown Shield 3/8, Hearty Helping 1/5 | 1:59 level 9, maxHp 120, armor 20, damageMult 1, recovery 0, Seeker Sprouts 1/8, Hash Brown Shield 5/8, Starch Bolt 1/8, Root Spikes 1/8, Hearty Helping 2/5, Starch Plating 1/5 | 2:59 level 10, maxHp 134.4, armor 20, damageMult 1, recovery 0, Seeker Sprouts 1/8, Hash Brown Shield 5/8, Starch Bolt 1/8, Root Spikes 1/8, Hearty Helping 2/5, Starch Plating 1/5, Gravy Heart 1/5 | 3:09 level 11, maxHp 134.4, armor 20, damageMult 1, recovery 0, Seeker Sprouts 1/8, Hash Brown Shield 5/8, Starch Bolt 1/8, Root Spikes 1/8, Potato Rain 1/8, Hearty Helping 2/5, Starch Plating 1/5, Gravy Heart 1/5.
- Passive levels first reached: Hearty Helping 1 at 0:08; Starch Plating 1 at 1:51; Gravy Heart 1 at 2:08.

### L5.I6.G4: shrine picks s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 91.3s (game clock 01:31); damage taken 124 (enemy:aphid 3.381, enemy:sprout-mite 1.049, enemy:fry-fly 98.082, enemy:potato-beetle 11.215); 143 kills; level 1 to 5; planner asked 33 times, action model 128; the models saw the game 27 ms late (p90 47); ended with seeker-sprouts 2, butter-pat 2, thick-skin 1.
- run.timeSec: 91.3
- run.level: 4
- run.kills: 143
- run.damageBySource: seeker-sprouts 2163.226
- run.damageTakenBySource: enemy:aphid 3.381, enemy:sprout-mite 1.049, enemy:fry-fly 98.082, enemy:potato-beetle 11.215, enemy:crumb-ant 10.542
- run.killsBySource: seeker-sprouts 143
- run.biomes: ["peel-forest","compost-caves","fry-oil-desert"]
- run.distance: 5162.9
- run.dodgePoints: 717.621
- run.dodgeSecond: 91
- run.dodgeTaken: [3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,6.612867564070999,16.329853071317377,26.046838578563754,35.763824085810136,42.24181442397438,62.003518747603984,83.85273470401643,89.33472726093076,89.33472726093076,89.33472726093076,89.33472726093076,96.47017613366957,96.47017613366957,98.4184029854979,102.31485668915458,106.21131039281126,106.21131039281126,106.21131039281126,106.21131039281126,106.21131039281126,106.21131039281126,106.21131039281126,106.21131039281126,106.21131039281126,116.67354144534518,1.2717370307098768,1.2717370307098768,1.2717370307098768,1.2717370307098768,1.2717370307098768,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873,3.373872394988873]
- run.dodgeSteps: [316.8199999999923,323.01999999999214,329.21999999999196,335.4199999999918,341.6199999999916,347.8199999999914,354.0199999999912,360.21999999999105,366.41999999999086,372.6199999999907,378.8199999999905,385.0199999999903,391.21999999999014,401.28999999999013,407.48999999998995,413.68999999999005,419.88999999999106,427.3799999999904,436.15999999999093,442.3599999999935,448.5599999999936,454.75999999999146,460.95999999998855,467.15999999998564,473.35999999998273,479.5599999999798,489.6299999999772,495.8299999999743,502.0299999999714,508.22999999996847,514.4299999999655,175.35666666666316,181.55666666666298,187.7566666666628,193.9566666666626,200.15666666666243,206.35666666666225,208.52666666666218,208.52666666666218,208.52666666666218,208.52666666666218,208.52666666666218,208.52666666666218,208.52666666666218,211.41999999999544,217.61999999999526,223.81999999999508,230.0199999999949,236.2199999999947,242.41999999999453,248.61999999999435,254.81999999999417,261.01999999999396,267.2199999999938,273.4199999999936,279.6199999999934,285.81999999999323,292.01999999999305,298.21999999999287,304.4199999999927,310.6199999999925]
- run.curseSince: 3030
- run.killer: "enemy:crumb-ant"
- run.goldEarned: 8.663
- run.peakEnemies: 52
- run.shrinesUsed: 1
- run.grokBotHelps: 2
- counters.kills: 143
- counters.hits: 174
- counters.gems: 52
- counters.coins: 8
- counters.shots: 184
- shrineTotals.armor: 12
- Gold, spots and chests: gold held at the end 8, spent 0; spots charged and used: Crop Patch 1; chests seen 0, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Seeker Sprouts 81% over Tater Tot Pup 10%, Sprout Satellites 9%; 0:23 took Butter Pat 69% over Spry Sprout 30%, Hot Sauce 1%; 0:24 took Thick Skin 86% over Skillet Flail 10%, Skipping Cannonball 4%; 0:41 took Armor 100% over Pickup range 0%, Gold gain 0%; 0:50 took Butter Pat 51% over Mash Mortar 37%, Chives 12%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:57 level 5, maxHp 120, armor 12, damageMult 1.44, recovery 0, Seeker Sprouts 2/8, Butter Pat 2/5, Thick Skin 1/5 | 1:31 level 5, maxHp 120, armor 12, damageMult 1.44, recovery 0, Seeker Sprouts 2/8, Butter Pat 2/5, Thick Skin 1/5.
- Passive levels first reached: Butter Pat 1 at 0:23; Thick Skin 1 at 0:24.

### L5.I6.G5: shrine picks s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 155.4s (game clock 02:35); damage taken 181 (enemy:cave-grub 49.79, enemy:frost-flea 5.95, enemy:aphid 7.908, enemy:compost-maggot 2.388); 299 kills; level 1 to 8; planner asked 56 times, action model 363; the models saw the game 27 ms late (p90 47); ended with seeker-sprouts 3, comet-scythe 2, peel-out 2, butter-socks 1.
- run.timeSec: 155.417
- run.level: 7
- run.kills: 299
- run.damageBySource: seeker-sprouts 3797.215, comet-scythe 2879.782, grok-bot 70.919
- run.damageTakenBySource: enemy:cave-grub 49.79, enemy:frost-flea 5.95, enemy:aphid 7.908, enemy:compost-maggot 2.388, enemy:tomato-leech 58.108, enemy:crumb-ant 2.926, enemy:ketchup-drop 8.529, enemy:sand-crab 7.035, enemy:oil-drip 4.159, boss:amusing 31.045, enemy:potato-beetle 3.435
- run.killsBySource: seeker-sprouts 186, comet-scythe 108, grok-bot 5
- run.biomes: ["compost-caves","ketchup-bog","fry-oil-desert","mash-swamp","chip-canyons","frozen-tundra"]
- run.distance: 9449.075
- run.dodgePoints: 807.479
- run.dodgeSecond: 155
- run.dodgeTaken: [135.34016816814355,135.34016816814355,135.34016816814355,135.34016816814355,135.34016816814355,135.34016816814355,135.34016816814355,135.34016816814355,135.34016816814355,137.55767927925467,139.77519039036576,143.10145705703243,143.10145705703243,143.10145705703243,143.10145705703243,143.10145705703243,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,153.60284271335325,155.97582700772472,161.31517595130634,96.83069331062556,96.83069331062556,96.83069331062556,96.83069331062556,96.83069331062556,96.83069331062556,101.3005066439589,105.77031997729223,113.43027828770148,117.26025744290611,119.3170750639633,133.25444904396508,133.25444904396508,133.25444904396508,133.25444904396508,133.25444904396508,133.25444904396508,133.25444904396508,133.25444904396508,133.25444904396508,133.25444904396508,135.34016816814355,135.34016816814355,135.34016816814355,135.34016816814355,135.34016816814355,135.34016816814355]
- run.dodgeSteps: [718.8128333332816,725.0128333332841,735.0828333332848,741.0968333332852,745.4368333332853,755.444833333286,761.6448333332875,767.8448333332884,774.0448333332889,784.1148333332902,790.3148333332928,796.5148333332943,802.7148333332968,808.4188333332987,812.7588333332989,817.160833333299,828.5208333332992,837.300833333297,843.500833333294,849.7008333332911,858.910833333289,865.9708333332862,872.1708333332833,878.3708333332804,884.5708333332775,890.7708333332746,896.9708333332717,903.1708333332688,909.3708333332659,915.570833333263,925.6408333332611,932.1974999999275,938.3974999999245,944.5974999999216,545.0161666666556,551.2161666666527,557.4161666666498,563.6161666666469,569.816166666644,576.0161666666411,582.2161666666382,588.4161666666353,594.6161666666324,600.8161666666311,607.0161666666327,613.2161666666298,619.4161666666269,625.6161666666239,631.816166666621,636.6728333332854,642.8728333332825,649.0728333332796,655.2728333332767,661.4728333332738,667.6728333332709,677.7428333332708,683.9428333332722,690.1428333332748,696.3428333332762,706.4128333332781,712.612833333279]
- run.curseSince: 6888
- run.killer: "boss:amusing"
- run.goldEarned: 55.125
- run.elitesKilled: 4
- run.peakEnemies: 114
- run.grokBotHelps: 3
- counters.kills: 299
- counters.hits: 569
- counters.gems: 154
- counters.coins: 11
- counters.shots: 312
- counters.hostileShots: 216
- counters.nearMisses: 7
- counters.hostileHits: 4
- Gold, spots and chests: gold held at the end 55, spent 0; spots charged and used: Crop Patch 1, Spud Freezer 1; chests seen 4, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Peel Out 44% over Spud Dynamo 34%, Tailgate Fries 22%; 0:21 took Seeker Sprouts 51% over Mash Snowball 27%, Hearty Helping 22%; 0:28 took Peel Out 52% over Seeker Sprouts 46%, Hot Sauce 2%; 0:39 took Seeker Sprouts 48% over Aged Russet 39%, Grab Bag 13%; 1:18 took Comet Scythe 44% over Reroll 29%, Peel Out 16%, Seeker Sprouts 11%; 1:44 took Reroll 40% over Comet Scythe 27%, Seeker Sprouts 20%, Mash Wave 13%; 1:44 took Comet Scythe 40% over Peel Out 39%, Mash Mortar 21%; 1:54 took Butter Socks 40% over Comet Scythe 39%, Reroll 18%, Bacon Bits 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:57 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Peel Out 2/5 | 1:59 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Comet Scythe 2/8, Peel Out 2/5, Butter Socks 1/5 | 2:35 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Comet Scythe 2/8, Peel Out 2/5, Butter Socks 1/5.
- Passive levels first reached: Peel Out 1 at 0:06; Butter Socks 1 at 1:54.

### L5.I6.G6: shrine picks s36

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 36; 240s; plays the playbook with its own planner.pick.
- Outcome: alive after 240.2s (game clock 04:00), health 120/120; damage taken 59 (Brambles 2.987, enemy:sprout-mite 0.933, enemy:garden-slug 36.102, enemy:ketchup-drop 1.333); 1636 kills; level 1 to 15; planner asked 102 times, action model 294; the models saw the game 29 ms late (p90 49); ended with seeker-sprouts 1, hash-bulwark 1, iron-flail 1, seed-potato 4, butter-pat 1, starch-plating 3, lean-lunch 1.
- run.timeSec: 240.15
- run.level: 14
- run.kills: 1636
- run.damageBySource: seeker-sprouts 5422.459, skillet-flail 9524.903, hash-brown-shield 3483.867, seed-potato 7148.688, hash-bulwark 28482.367, grok-bot 1444.859
- run.damageTakenBySource: Brambles 2.987, enemy:sprout-mite 0.933, enemy:garden-slug 36.102, enemy:ketchup-drop 1.333, boss:amusing 4.752, enemy:swarm-fly 3.198, Spore vent 9.598
- run.killsBySource: seeker-sprouts 202, skillet-flail 325, hash-brown-shield 157, seed-potato 192, hash-bulwark 721, grok-bot 39
- run.evolutions: [{"id":"hash-bulwark","at":141.71666666666667},{"id":"iron-flail","at":237.98333333333332}]
- run.biomes: ["compost-caves","peel-forest","mash-swamp"]
- run.distance: 12130.248
- run.dodgePoints: 2113.689
- run.dodgeSecond: 240
- run.dodgeTaken: [52.3054764715174,52.3054764715174,52.3054764715174,52.3054764715174,52.3054764715174,52.3054764715174,52.3054764715174,53.259604911884374,53.259604911884374,53.259604911884374,53.259604911884374,53.259604911884374,53.259604911884374,53.259604911884374,53.259604911884374,53.259604911884374,53.259604911884374,53.259604911884374,53.49813702197612,55.008840385890494,55.008840385890494,55.008840385890494,55.008840385890494,55.008840385890494,55.008840385890494,55.008840385890494,55.008840385890494,55.008840385890494,55.008840385890494,55.008840385890494,55.008840385890494,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,57.15871118692408,58.205691052695904,58.90367762987712,58.90367762987712,58.90367762987712,58.90367762987712,58.90367762987712,58.90367762987712,58.90367762987712,58.90367762987712,58.90367762987712,58.90367762987712,52.3054764715174,52.3054764715174,52.3054764715174]
- run.dodgeSteps: [890.4181666666991,896.6181666666962,902.8181666666933,909.0181666666904,913.4615000000216,914.9081666666876,917.594833333353,923.7948333333501,929.9948333333472,936.1948333333443,942.3948333333414,948.5948333333384,954.7948333333355,960.9948333333326,967.1948333333297,973.3948333333268,979.5948333333239,985.794833333321,991.9948333333181,998.1948333333152,1004.3948333333122,1010.5948333333093,1016.7948333333064,1022.9948333333035,1029.1948333333007,1033.9481666666318,1039.7348333332957,1044.3848333332935,1048.7248333332914,1050.8948333332905,1053.0648333332895,1059.2648333332866,1065.4648333332837,1071.6648333332807,1077.8648333332778,1084.064833333275,1090.264833333272,1096.464833333269,1102.6648333332662,1108.8648333332633,1115.0648333332604,1121.2648333332575,1127.4648333332545,1133.6648333332516,1139.8648333332487,1146.0648333332458,1152.264833333243,1158.46483333324,1164.664833333237,1170.8648333332342,1177.0648333332313,1183.2648333332284,1187.2948333332265,1190.7048333332248,1196.9048333332219,1201.4514999998864,1207.6514999998835,1213.0248333332142,871.8181666667078,878.0181666667049,884.218166666702]
- run.curseSince: 13086
- run.goldEarned: 539.41
- run.bossChests: 7
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 174
- run.shrinesUsed: 5
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 1636
- counters.hits: 2171
- counters.crits: 102
- counters.gems: 1260
- counters.coins: 86
- counters.shots: 1100
- counters.hostileShots: 122
- counters.nearMisses: 7
- shrineTotals.area: 0.102
- shrineTotals.duration: 0.084
- shrineTotals.armor: 24
- shrineTotals.critChance: 0.048
- Gold, spots and chests: gold held at the end 539, spent 0; spots charged and used: Crop Patch 2, Beetle Nest 1; chests seen 8, opened 7.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Hash Brown Shield 75% over Salt Shaker 21%, Tater Tot Pup 4%; 0:17 took Skillet Flail 70% over Butter Socks 29%, Potato Magnet 1%; 0:24 took Hash Brown Shield 86% over Seeker Sprouts 13%, Fertilizer 1%; 0:34 took Skillet Flail 67% over Mash Landing 31%, Four-Eyed Spud 2%; 0:40 took Armor 98% over Cooldown 2%, Pickup range 0%; 0:51 took Armor 100% over Pickup range 0%, XP gain 0%; 0:58 took Hash Brown Shield 85% over Root Cellar 12%, Spud Lob 3%; 0:58 took Duration 82% over Crit 15%, XP gain 3%; 1:08 took Crit 48% over XP gain 42%, Gold gain 10%; 1:18 took Area 92% over XP gain 7%, Gold gain 1%; 1:24 took Seed Potato 49% over Seeker Sprouts 48%, Four-Eyed Spud 3%; 1:35 took Reroll 34% over Butter Pat 34%, Rösti Disc 17%, Fry Cook Sentry 15%; 1:35 took Butter Pat 51% over Skillet Flail 39%, Seed Potato 10%; 1:49 took Starch Plating 93% over Skillet Flail 4%, Spry Sprout 3%; 2:17 took Hash Brown Shield 79% over Root Network 17%, Mash Wave 4%; 2:35 took Seed Potato 47% over Mash Finisher 27%, Reroll 25%, Four-Eyed Spud 1%; 3:04 took Skillet Flail 44% over Reroll 30%, Gravy Splash 14%, Sprout Satellites 12%; 3:22 took Lean Lunch 42% over Reroll 29%, Seed Potato 23%, Gem Sling 6%; 3:23 took Starch Plating 86% over Skillet Flail 7%, Frying Pan 5%, Reroll 2%; 3:38 took Starch Plating 92% over Root Network 5%, Reroll 3%, Hot Sauce 0%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 6, maxHp 120, armor 24, damageMult 1, recovery 0, Seeker Sprouts 1/8, Hash Brown Shield 3/8, Skillet Flail 2/8 | 1:56 level 9, maxHp 120, armor 44, damageMult 1.2, recovery 0, Seeker Sprouts 1/8, Hash Brown Shield 4/8, Skillet Flail 2/8, Seed Potato 1/8, Butter Pat 1/5, Starch Plating 1/5 | 3:00 level 11, maxHp 120, armor 44, damageMult 1.2, recovery 0, Seeker Sprouts 1/8, Hash Bulwark 1/1, Skillet Flail 2/8, Seed Potato 2/8, Butter Pat 1/5, Starch Plating 1/5 | 3:59 level 15, maxHp 120, armor 84, damageMult 1.2, recovery 0, Seeker Sprouts 1/8, Hash Bulwark 1/1, Iron Flail 1/1, Seed Potato 4/8, Butter Pat 1/5, Starch Plating 3/5, Lean Lunch 1/5.
- Passive levels first reached: Butter Pat 1 at 1:35; Starch Plating 1 at 1:49, 3 at 3:38; Lean Lunch 1 at 3:22.

### L5.I6.G7: shrine picks s37

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 37; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 162.3s (game clock 02:42); damage taken 197 (Spore vent 24.933, enemy:compost-maggot 15.708, enemy:little-grey 8.94, enemy:spittlebug 27.564); 252 kills; level 1 to 8; planner asked 54 times, action model 345; the models saw the game 29 ms late (p90 49); ended with seeker-sprouts 3, frying-pan 1, gravy-heart 3, thick-skin 1.
- run.timeSec: 162.3
- run.level: 7
- run.kills: 252
- run.damageBySource: seeker-sprouts 4283.502, grok-bot 114.42, frying-pan 1852.367
- run.damageTakenBySource: Spore vent 24.933, enemy:compost-maggot 15.708, enemy:little-grey 8.94, enemy:spittlebug 27.564, enemy:aphid 4.618, enemy:cave-grub 84.808, enemy:sprout-mite 9.998, enemy:wireworm-larva 3.227, Brambles 3, enemy:swarm-fly 5.544, boss:amusing 8.87
- run.killsBySource: seeker-sprouts 202, grok-bot 10, frying-pan 40
- run.biomes: ["compost-caves","crop-circle","peel-forest"]
- run.distance: 9767.388
- run.dodgePoints: 998.079
- run.dodgeSecond: 162
- run.dodgeTaken: [113.08302061896634,121.3336393860501,126.15894876959199,134.00272654736978,134.00272654736978,134.00272654736978,134.00272654736978,134.00272654736978,138.12803593091164,142.25334531445353,142.25334531445353,142.25334531445353,142.25334531445353,142.25334531445353,142.25334531445353,143.58667864778687,147.58667864778684,147.58667864778684,147.58667864778684,147.58667864778684,147.58667864778684,147.58667864778684,149.72001198112017,149.72001198112017,149.72001198112017,149.72001198112017,149.72001198112017,149.98667864778685,149.98667864778685,149.98667864778685,149.98667864778685,149.98667864778685,149.98667864778685,149.98667864778685,149.98667864778685,149.98667864778685,154.0061630378103,162.46587426221907,162.46587426221907,170.71649302930282,189.5635444280734,57.76633802435899,57.76633802435899,57.76633802435899,57.76633802435899,57.76633802435899,57.76633802435899,57.76633802435899,57.76633802435899,57.76633802435899,57.76633802435899,57.76633802435899,57.76633802435899,59.38126315723507,59.38126315723507,63.50657254077694,69.2524354054821,74.99874877578773,78.13431506378198,88.53075702331233,104.83240185188261]
- run.dodgeSteps: [704.748833333329,710.9488333333304,717.148833333332,723.3488333333343,733.4188333333346,739.6188333333355,745.818833333338,752.0188333333406,758.2188333333431,768.2888333333451,774.4888333333477,780.6888333333502,786.8888333333518,793.5188333333489,803.1588333333463,809.3588333333433,815.5588333333415,821.7588333333385,827.9588333333356,834.1588333333327,840.3588333333298,846.5588333333269,856.198833333325,862.8288333333221,869.0288333333192,875.2288333333163,881.4288333333134,891.4988333333115,897.6988333333086,903.8988333333057,910.0988333333028,916.2988333332999,922.498833333297,932.568833333295,938.768833333292,944.9688333332891,951.1688333332862,959.0888333332838,967.4388333332814,970.0221666666135,974.878833333278,591.185500000006,597.3855000000085,603.5855000000067,609.7855000000038,615.9855000000009,616.2955000000007,617.9488333333333,624.1488333333303,630.3488333333274,636.5488333333276,642.7488333333301,648.9488333333327,655.1488333333352,661.3488333333378,667.5488333333367,673.7488333333338,679.9488333333309,686.1488333333302,692.348833333332,698.5488333333311]
- run.curseSince: 9634
- run.killer: "enemy:cave-grub"
- run.goldEarned: 79.223
- run.bossesKilled: 1
- run.elitesKilled: 1
- run.peakEnemies: 116
- run.grokBotHelps: 4
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 252
- counters.hits: 407
- counters.gems: 126
- counters.coins: 36
- counters.shots: 361
- counters.hostileShots: 308
- counters.nearMisses: 10
- counters.hostileHits: 11
- Gold, spots and chests: gold held at the end 79, spent 0; spots charged and used: Crop Patch 2, Spud Freezer 1; chests seen 2, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:04 took Gravy Heart 65% over Broadside 29%, Gravy Splash 6%; 0:12 took Seeker Sprouts 39% over Potato Rain 32%, Mash Finisher 29%; 0:24 took Gravy Heart 77% over Tailgate Fries 17%, Sprouting Eyes 6%; 0:51 took Gravy Heart 65% over Peeler 31%, Spud Sneakers 4%; 1:10 took Seeker Sprouts 45% over Aged Russet 31%, Tater Tot Pup 24%; 2:16 took Frying Pan 56% over Skillet Flail 43%, Golden Fry 1%; 2:40 took Thick Skin 89% over Butter Streak 9%, Couch Potato 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 5, maxHp 163.2, armor 0, damageMult 1, recovery 0, Seeker Sprouts 2/8, Gravy Heart 3/5 | 2:00 level 6, maxHp 163.2, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Gravy Heart 3/5 | 2:42 level 8, maxHp 163.2, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Frying Pan 1/8, Gravy Heart 3/5, Thick Skin 1/5.
- Passive levels first reached: Gravy Heart 1 at 0:04, 3 at 0:51; Thick Skin 1 at 2:40.

### L5.I6.G8: shrine picks s38

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 38; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 150.8s (game clock 02:30); damage taken 184 (enemy:cave-grub 40.25, Spore vent 10.133, Brambles 3, enemy:compost-maggot 33.426); 313 kills; level 1 to 8; planner asked 52 times, action model 359; the models saw the game 31 ms late (p90 49); ended with seeker-sprouts 1, julienne-dash 1, gravy-splash 1, chives 2, gravy-heart 3.
- run.timeSec: 150.783
- run.level: 7
- run.kills: 313
- run.damageBySource: seeker-sprouts 3086.361, dog:greyhound 1237.737, gravy-splash 19.141, julienne-dash 2261.956
- run.damageTakenBySource: enemy:cave-grub 40.25, Spore vent 10.133, Brambles 3, enemy:compost-maggot 33.426, enemy:sprout-mite 9.851, enemy:oil-drip 6.075, enemy:aphid 15.485, enemy:wireworm-larva 5.629, enemy:bog-slime 5.731, boss:amusing 45.459, enemy:ketchup-drop 1.808, enemy:sand-crab 3.711, enemy:potato-beetle 3.564
- run.killsBySource: seeker-sprouts 166, dog:greyhound 79, gravy-splash 2, julienne-dash 66
- run.biomes: ["compost-caves","peel-forest","fry-oil-desert","ketchup-bog","mash-swamp"]
- run.dogs: [{"id":"greyhound","at":41.71666666666667}]
- run.dogHelp: damage.greyhound 1237.737, hits.greyhound 89
- run.distance: 9227.15
- run.dodgePoints: 1149.625
- run.dodgeSecond: 150
- run.dodgeTaken: [70.34132497964241,70.34132497964241,70.34132497964241,70.34132497964241,70.34132497964241,70.34132497964241,73.0079916463091,73.14132497964242,73.14132497964242,73.14132497964242,86.44639164630908,86.44639164630908,86.44639164630908,88.138270071467,88.138270071467,88.138270071467,88.138270071467,88.138270071467,88.138270071467,88.138270071467,89.87435718626834,103.179423852935,103.179423852935,104.89737132829228,123.98188946236394,167.99785631943647,173.67077188448818,173.67077188448818,173.67077188448818,19.789173263900206,19.789173263900206,25.77232497125267,29.822257441090148,31.302933169203005,31.302933169203005,31.302933169203005,31.302933169203005,31.302933169203005,31.302933169203005,31.302933169203005,31.302933169203005,31.302933169203005,31.302933169203005,31.302933169203005,31.302933169203005,31.302933169203005,31.302933169203005,36.968769600925995,57.89485630662834,59.375458656837694,63.53903330359879,68.69707182561793,68.69707182561793,68.69707182561793,68.69707182561793,68.69707182561793,68.69707182561793,68.69707182561793,68.69707182561793,68.69707182561793,68.69707182561793]
- run.dodgeSteps: [733.4608266667358,740.0328266667377,744.8522933334058,751.4242933334077,757.9962933334097,764.5682933334116,771.1402933334135,777.7122933334155,784.2842933334174,790.8562933334193,797.4282933334213,804.0002933334232,810.5722933334251,817.1442933334271,823.7162933334251,830.2882933334216,836.8602933334181,843.4322933334146,850.004293333411,856.5762933334075,863.148293333404,869.7202933334005,876.292293333397,882.8642933333934,889.4362933333899,899.8224933333875,906.3944933333839,910.9948933333815,917.566893333378,526.7933333333417,533.3653333333436,539.9373333333456,546.5093333333475,553.0813333333494,559.6533333333514,566.2253333333533,572.7973333333553,579.3693333333572,585.9413333333591,592.5133333333611,599.085333333363,605.6573333333649,612.2293333333669,618.8013333333688,625.3733333333707,631.9453333333727,638.5173333333746,645.0893333333765,649.8868933333778,656.4588933333797,663.0308933333816,669.6028933333836,676.1748933333855,682.7468933333874,689.3188933333894,695.8908933333913,702.4628933333933,709.0348933333952,715.6068933333971,722.1788933333991,727.1078933334005]
- run.curseSince: 8754
- run.killer: "enemy:aphid"
- run.goldEarned: 38.588
- run.peakEnemies: 105
- run.grokBotHelps: 3
- counters.kills: 313
- counters.hits: 524
- counters.gems: 163
- counters.coins: 36
- counters.shots: 382
- counters.hostileShots: 190
- counters.nearMisses: 12
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 38, spent 0; spots charged and used: Tater Lantern 1, Stray Dog 1, Crop Patch 1; chests seen 0, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:09 took Gravy Splash 44% over Spud Decoy 30%, Fry Cook Sentry 26%; 0:16 took Chives 49% over Starch Puddle 33%, Peel Phantom 18%; 0:23 took Gravy Heart 61% over Gravy Splash 20%, Potato Battery 19%; 1:04 took Gravy Heart 79% over Gravy Splash 14%, Chives 7%; 1:32 took Reroll 37% over Seeker Sprouts 29%, Whisk Vortex 22%, Steam Vent 12%; 1:32 took Chives 70% over Fry Lance 20%, Mash Wave 10%; 2:09 took Julienne Dash 44% over Hash Hawk 37%, Spud Cannon 19%; 2:25 took Gravy Heart 90% over Lean Lunch 9%, Tater Trot 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 4, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Gravy Splash 1/5, Chives 1/5, Gravy Heart 1/5 | 1:59 level 6, maxHp 148.8, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Gravy Splash 1/5, Chives 2/5, Gravy Heart 2/5 | 2:30 level 8, maxHp 163.2, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Julienne Dash 1/8, Gravy Splash 1/5, Chives 2/5, Gravy Heart 3/5.
- Passive levels first reached: Gravy Splash 1 at 0:09; Chives 1 at 0:16; Gravy Heart 1 at 0:23, 3 at 2:25.

### L5.I6.G9: shrine picks s39

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 39; 240s; plays the playbook with its own planner.pick.
- Outcome: died after 172.1s (game clock 02:52); damage taken 221 (enemy:frost-flea 14.554, enemy:snow-mold 82.697, enemy:compost-maggot 20.714, enemy:sprout-mite 4.391); 443 kills; level 1 to 10; planner asked 62 times, action model 366; the models saw the game 28 ms late (p90 48); ended with seeker-sprouts 3, peel-lash 2, peeler 1, gravy-heart 4.
- run.timeSec: 172.067
- run.level: 9
- run.kills: 443
- run.damageBySource: seeker-sprouts 4137.802, peel-lash 3584.758, peeler 851.388, grok-bot 40.834
- run.damageTakenBySource: enemy:frost-flea 14.554, enemy:snow-mold 82.697, enemy:compost-maggot 20.714, enemy:sprout-mite 4.391, enemy:aphid 6.341, enemy:crumb-ant 3.126, enemy:oil-drip 2.089, enemy:potato-beetle 3.305, boss:amusing 80.939, enemy:ketchup-drop 2.355
- run.killsBySource: seeker-sprouts 247, peel-lash 163, peeler 30, grok-bot 3
- run.biomes: ["ketchup-bog","frozen-tundra","compost-caves","chip-canyons","fry-oil-desert","gutterball-lanes","peel-forest"]
- run.dogs: [{"id":"retriever","at":10.216666666666667}]
- run.dogHelp: fetched.retriever 159
- run.distance: 10371.217
- run.dodgePoints: 1015.743
- run.dodgeSecond: 172
- run.dodgeTaken: [133.91117061528647,133.91117061528647,137.21582281766396,137.21582281766396,137.21582281766396,137.21582281766396,137.21582281766396,137.21582281766396,137.21582281766396,137.21582281766396,140.54208948433063,153.8471561509973,153.8471561509973,153.8471561509973,153.8471561509973,153.8471561509973,153.8471561509973,153.8471561509973,156.0646672621084,156.0646672621084,156.0646672621084,156.0646672621084,156.0646672621084,156.0646672621084,156.0646672621084,156.0646672621084,156.0646672621084,156.0646672621084,156.0646672621084,156.0646672621084,156.0646672621084,156.0646672621084,159.39093392877507,159.39093392877507,159.39093392877507,159.39093392877507,159.39093392877507,159.39093392877507,161.6084450398862,168.26097837321953,168.26097837321953,168.26097837321953,168.26097837321953,168.26097837321953,168.26097837321953,168.26097837321953,168.26097837321953,168.26097837321953,168.26097837321953,170.61646162807648,207.2053949614098,123.9830100781339,123.9830100781339,130.68132034953427,130.68132034953427,133.91117061528647,133.91117061528647,133.91117061528647,133.91117061528647,133.91117061528647,133.91117061528647]
- run.dodgeSteps: [722.0163333334272,728.2163333334297,734.4163333334322,740.6163333334348,746.8163333334373,753.0163333334399,759.2163333334424,769.2863333334443,775.4863333334469,781.6863333334494,787.886333333452,794.0863333334545,800.286333333457,806.4863333334596,812.6863333334621,818.8863333334647,828.956333333463,835.1563333334601,841.3563333334572,847.5563333334543,857.6263333334524,863.8263333334495,870.0263333334466,876.2263333334437,882.4263333334408,888.6263333334379,894.826333333435,901.026333333432,907.2263333334291,913.4263333334262,919.6263333334233,923.8630000000879,930.063000000085,936.2630000000821,942.4630000000792,948.6630000000763,953.9123333334097,959.161666666743,965.3616666667401,973.2816666667377,981.6316666667353,987.8316666667324,994.0316666667295,1000.2316666667266,1006.4316666667237,1012.6316666667208,1018.8316666667179,1025.031666666715,1029.9916666667127,1036.1916666667098,1037.1216666667092,652.276333333403,658.4763333334056,664.6763333334081,673.4563333334102,680.9463333334126,687.1463333334151,693.3463333334176,699.5463333334202,705.7463333334227,715.8163333334246]
- run.curseSince: 8762
- run.killer: "boss:amusing"
- run.goldEarned: 45.045
- run.elitesKilled: 2
- run.peakEnemies: 116
- run.grokBotHelps: 2
- counters.kills: 443
- counters.hits: 603
- counters.gems: 427
- counters.coins: 23
- counters.shots: 643
- counters.hostileShots: 340
- counters.nearMisses: 17
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 45, spent 0; spots charged and used: Crop Patch 1, Spud Freezer 1; chests seen 2, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:11 took Seeker Sprouts 58% over Starch Puddle 39%, Potato Magnet 3%; 0:17 took Peel Lash 50% over Tater Twirl 40%, Mezzaluna 10%; 0:26 took Gravy Heart 78% over Big Bowl 21%, Potato Magnet 1%; 0:47 took Seeker Sprouts 76% over Root Spikes 18%, Steam Vent 6%; 1:08 took Peel Lash 70% over Deep Fryer 24%, Small Fry 6%; 1:21 took Gravy Heart 85% over Seeker Sprouts 12%, Tot Toss 3%; 1:34 took Peeler 66% over Hearty Helping 23%, Big Bowl 11%; 1:51 took Gravy Heart 83% over Packed Pan 9%, Reroll 6%, Salt Shaker 2%; 2:26 took Gravy Heart 50% over Thick Skin 39%, Butter Socks 8%, Reroll 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 5, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Peel Lash 1/8, Gravy Heart 1/5 | 1:59 level 9, maxHp 163.2, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Peel Lash 2/8, Peeler 1/8, Gravy Heart 3/5 | 2:52 level 10, maxHp 177.6, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Peel Lash 2/8, Peeler 1/8, Gravy Heart 4/5.
- Passive levels first reached: Gravy Heart 1 at 0:26, 3 at 1:51.

### L5.I6.G10: shrine picks s40

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 40; 240s; plays the playbook with its own planner.pick.
- Outcome: alive after 240s (game clock 04:00), health 134/134; damage taken 127 (enemy:crumb-ant 1.183, Hot oil 45.333, enemy:fry-fly 73.083, Brambles 2.6); 4361 kills; level 1 to 16; planner asked 100 times, action model 433; the models saw the game 30 ms late (p90 49); ended with seeker-sprouts 8, kettle-cyclone 1, bacon-bits 2, chives 5, spry-sprout 3, gpu 2, gravy-heart 1.
- run.timeSec: 239.95
- run.level: 15
- run.kills: 4361
- run.damageBySource: seeker-sprouts 28632.822, chip-shuriken 3971.226, grok-bot 217.889, kettle-cyclone 95285.192
- run.damageTakenBySource: enemy:crumb-ant 1.183, Hot oil 45.333, enemy:fry-fly 73.083, Brambles 2.6, Spore vent 4.667
- run.killsBySource: seeker-sprouts 757, chip-shuriken 191, grok-bot 15, kettle-cyclone 3398
- run.evolutions: [{"id":"kettle-cyclone","at":86.81666666666666}]
- run.biomes: ["fry-oil-desert","chip-canyons","mash-swamp","ketchup-bog","peel-forest","compost-caves"]
- run.distance: 13932.333
- run.dodgePoints: 1673.651
- run.dodgeSecond: 239
- run.dodgeTaken: [122.19938377525465,122.19938377525465,122.19938377525465,122.19938377525465,122.19938377525465,122.19938377525465,122.19938377525465,122.19938377525465,122.19938377525465,122.19938377525465,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,126.86605044192132,119.59938377525465,119.59938377525465,119.59938377525465,122.19938377525465]
- run.dodgeSteps: [1064.6333333331415,1070.8333333331386,1077.0333333331357,1083.2333333331328,1087.8833333331306,1094.0833333331277,1100.2833333331248,1106.483333333122,1112.683333333119,1118.883333333116,1125.0833333331132,1131.2833333331102,1137.4833333331073,1143.6833333331044,1149.8833333331015,1155.7733333330987,1160.4233333330965,1162.6966666664289,1164.3499999997614,1170.5499999997585,1176.7499999997556,1182.9499999997527,1189.1499999997498,1195.3499999997468,1201.549999999744,1207.749999999741,1213.949999999738,1220.1499999997352,1226.3499999997323,1232.5499999997294,1238.7499999997265,1244.9499999997236,1251.1499999997206,1257.3499999997177,1263.5499999997148,1269.749999999712,1275.949999999709,1282.149999999706,1288.3499999997032,1294.5499999997003,1300.7499999996974,1306.9499999996945,1313.1499999996915,1319.3499999996886,1321.9333333330208,1321.9333333330208,1325.343333333019,1331.543333333016,1337.7433333330132,1343.9433333330103,1350.1433333330074,1356.3433333330045,1362.5433333330016,1368.7433333329986,1374.9433333329957,1381.1433333329928,1387.34333333299,1039.8333333331532,1046.0333333331503,1052.2333333331474,1058.4333333331444]
- run.curseSince: 11302
- run.goldEarned: 558.437
- run.goldSpent: 30
- run.bossChests: 7
- run.paidChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 120
- run.grokBotHelps: 4
- run.botSwarms: 2
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 4361
- counters.hits: 4977
- counters.gems: 645
- counters.coins: 89
- counters.shots: 1285
- counters.hostileShots: 12
- counters.nearMisses: 2
- Gold, spots and chests: gold held at the end 526, spent 25 (Potato Crate 25); spots charged and used: Tater Lantern 2, Potato Crate 1; chests seen 8, opened 7.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Chip Shuriken 36% over Spud Fence 33%, Gravy Boat 31%; 0:14 took Bacon Bits 53% over Hash Hawk 24%, Steam Vent 23%; 0:30 took Chip Shuriken 55% over Peel Out 40%, Tater Trot 5%; 0:48 took Chives 59% over Spud Dynamo 36%, Sour Cream 5%; 0:52 took Reroll 45% over GPU 30%, Tater Tot Pup 21%, Sour Cream 4%; 0:52 took Spry Sprout 53% over Seeker Sprouts 28%, GPU 19%; 1:25 took GPU 44% over Bacon Bits 38%, Spry Sprout 18%; 1:43 took Spry Sprout 41% over Reroll 32%, Potato Battery 20%, Hot Potato 7%; 2:07 took Chives 53% over Mash Mortar 21%, Reroll 21%, Skip 3%, Tot Stampede 2%; 2:21 took Seeker Sprouts 39% over Bacon Bits 33%, Reroll 24%, Skip 3%, Fertilizer 1%; 2:41 took Reroll 50% over Gravy Splash 31%, Skip 9%, Fertilizer 8%, Rotten Spud 2%; 2:41 took Chives 81% over Afterburner Fries 13%, Skip 4%, Fertilizer 2%; 2:44 took Skip 33% over Starch Bolt 27%, Mash Mallet 26%, Fertilizer 14%; 2:45 took Chives 59% over Comet Scythe 40%, Fertilizer 1%; 2:46 took GPU 71% over Spry Sprout 27%, Fertilizer 2%; 2:46 took Chives 81% over Broadside 18%, Fertilizer 1%; 3:08 took Reroll 49% over Grab Bag 30%, Fertilizer 14%, Skip 7%, Golden Fry 0%; 3:08 took Gravy Heart 83% over Mash Snowball 13%, Skip 3%, Fertilizer 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 6, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Chip Shuriken 7/8, Bacon Bits 1/5, Chives 1/5, Spry Sprout 1/5 | 1:58 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Kettle Cyclone 1/1, Bacon Bits 1/5, Chives 1/5, Spry Sprout 2/5, GPU 1/5 | 2:56 level 15, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 6/8, Kettle Cyclone 1/1, Bacon Bits 1/5, Chives 5/5, Spry Sprout 2/5, GPU 2/5 | 3:56 level 16, maxHp 134.4, armor 0, damageMult 1, recovery 0, Seeker Sprouts 8/8, Kettle Cyclone 1/1, Bacon Bits 2/5, Chives 5/5, Spry Sprout 3/5, GPU 2/5, Gravy Heart 1/5.
- Passive levels first reached: Bacon Bits 1 at 0:14; Chives 1 at 0:48, 3 at 2:41, 5 at 2:46; Spry Sprout 1 at 0:52, 3 at 3:06; GPU 1 at 1:25; Gravy Heart 1 at 3:08.
