# Do the boss-range knobs raise 4:00 survival on fresh seeds s41-50?

| Field | Value |
| --- | --- |
| Status | done |
| Area | bosses |
| Result | refuted |
| Created | L5.I10 |
| Updated | L6.I2 |

## Hypothesis

distrustBossRange 250, bossOfferRange 250, bossDashRange 250 and bossDashThreshold 0.3 cut boss damage (amusing, queen, later bosses) and raise alive-at-4:00 from about 6-7 of 10 to 8 or more of 10.

## Method

Seeker-sprouts with the playbook knobs, 240 s from 0:00, on seeds 41-50. Play both arms now (playbook and boss knobs), 10 pairs. Metric: alive at 4:00, net paired wins, amusing and queen damage. Manipulation check: action-model moves asked and dashes while a boss is within 250, with scores and health. Check each game's model lateness before pairing. Adopt only on 8 or more of 10 alive and net +3.

## Findings

L6.I1 s41-47: 4 of 7 alive at 4:00 against 5 of 7 for the playbook on file (2 wins, 3 losses, 2 ties). Pooled with s31-40: 13 of 17 against 11 of 17. s48-50 were not played, since 8 of 10 is no longer reachable. Dashes did fire near bosses (s45 22, s47 21, s41 7) but the deaths were thin builds with 0-2 chests or the Reset Button starved s47. The playbook keeps the boss knobs off (distrustBossRange 0, bossOfferRange 0, bossDashRange 0).

## Games

### L6.I1.G1: boss knobs s41

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 41; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: died after 129.7s (game clock 02:09); damage taken 152 (enemy:aphid 1.154, enemy:ketchup-drop 18.29, enemy:sand-crab 2.927, enemy:wireworm-larva 2.532); 371 kills; level 1 to 9; planner asked 48 times, action model 238; the models saw the game 51 ms late (p90 320); ended with seeker-sprouts 1, broadside 2, mash-landing 1, harvest-moon 2, whisk-vortex 1, deep-fryer 1, starch-plating 1.
- run.timeSec: 129.733
- run.level: 8
- run.kills: 371
- run.damageBySource: seeker-sprouts 2333.825, broadside 996.792, harvest-moon 715.856, grok-bot 207.595, whisk-vortex 2327.563, deep-fryer 431.216, mash-landing 284.413
- run.damageTakenBySource: enemy:aphid 1.154, enemy:ketchup-drop 18.29, enemy:sand-crab 2.927, enemy:wireworm-larva 2.532, enemy:sprout-mite 6.99, enemy:crumb-ant 3.866, enemy:potato-beetle 75.987, enemy:bog-slime 3.754, enemy:compost-maggot 1.401, boss:amusing 32.836, Hot oil 2.25
- run.killsBySource: seeker-sprouts 130, broadside 40, harvest-moon 35, grok-bot 16, whisk-vortex 120, deep-fryer 20, mash-landing 10
- run.biomes: ["chip-canyons","fry-oil-desert","peel-forest","mash-swamp"]
- run.distance: 7706.608
- run.dodgePoints: 790.766
- run.dodgeSecond: 129
- run.dodgeTaken: [115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,118.45277634953301,119.7160428554315,19.04972556411593,20.452198022641085,25.638655580371385,35.99709482934359,44.93672149601026,46.74219526239177,46.74219526239177,46.74219526239177,46.74219526239177,51.2120085957251,60.15163526239177,69.09126192905843,70.49213871045468,70.49213871045468,70.49213871045468,74.96195204378802,74.96195204378802,74.96195204378802,74.96195204378802,78.37748525754992,87.31711192421659,87.31711192421659,87.31711192421659,98.24389712324265,109.1706823222687,109.1706823222687,111.16842968286636,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968,115.63824301619968]
- run.dodgeSteps: [716.8341666667054,722.2075000000362,731.2441666667044,737.4441666667069,743.6441666667081,749.8441666667052,756.0441666667023,766.1141666667003,414.05666666665894,418.53616666666096,423.80616666666026,427.5416666666614,431.64916666666204,437.8491666666646,444.04916666666594,450.2491666666685,455.70516666667083,461.9051666666734,466.4776666666754,471.6546666666776,477.85466666667855,484.0546666666779,489.1180000000133,493.56133333334844,498.55233333335065,501.9623333333523,505.372333333354,511.4793333333565,517.6793333333547,522.902833333357,526.3128333333586,529.8623333333604,534.6208333333616,540.8208333333641,547.0208333333667,557.0908333333686,563.2908333333711,569.4908333333736,575.6908333333762,580.4441666667115,586.6441666667124,592.844166666714,599.0441666667166,605.2441666667191,611.4441666667217,621.5141666667196,627.7141666667179,633.5008333333869,637.634166666722,644.6041666667227,648.6341666667215,654.8341666667187,661.0341666667158,667.2341666667129,673.434166666712,679.6341666667091,685.8341666667062,692.0341666667044,698.2341666667037,704.4341666667062,710.6341666667067]
- run.curseSince: 7667
- run.killer: "boss:amusing"
- run.goldEarned: 69.615
- run.elitesKilled: 2
- run.peakEnemies: 98
- run.grokBotHelps: 4
- run.botSwarms: 1
- counters.kills: 371
- counters.hits: 1217
- counters.gems: 132
- counters.coins: 45
- counters.shots: 465
- counters.hostileShots: 60
- counters.nearMisses: 3
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 69, spent 0; spots charged and used: Crop Patch 1; chests seen 2, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Broadside 53% over Lean Lunch 31%, Seeker Sprouts 16%; 0:23 took Broadside 43% over Tater Mines 30%, Root Network 27%; 0:39 took Mash Landing 65% over Broadside 22%, Butter Socks 13%; 0:51 took Harvest Moon 84% over Skillet Flail 13%, Hot Sauce 3%; 1:12 took Whisk Vortex 80% over Sprout Squad 10%, Rotten Spud 10%; 1:29 took Deep Fryer 43% over Whisk Vortex 29%, Salt Line 15%, Reroll 13%; 1:36 took Harvest Moon 63% over Reroll 19%, Potato Magnet 12%, Deep Fryer 6%; 2:07 took Starch Plating 50% over Root Network 22%, Broadside 20%, Reroll 8%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Broadside 2/8, Mash Landing 1/8, Harvest Moon 1/8 | 1:59 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Broadside 2/8, Mash Landing 1/8, Harvest Moon 2/8, Whisk Vortex 1/8, Deep Fryer 1/8 | 2:09 level 9, maxHp 120, armor 20, damageMult 1, recovery 0, Seeker Sprouts 1/8, Broadside 2/8, Mash Landing 1/8, Harvest Moon 2/8, Whisk Vortex 1/8, Deep Fryer 1/8, Starch Plating 1/5.
- Passive levels first reached: Starch Plating 1 at 2:07.

### L6.I1.G2: boss knobs s42

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 42; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240.7s (game clock 04:00), health 116/137; damage taken 94 (Hot oil 9.851, enemy:sand-crab 16.17, enemy:tomato-leech 4.881, enemy:oil-drip 2.162); 1246 kills; level 1 to 13; planner asked 86 times, action model 427; the models saw the game 49 ms late (p90 218); ended with seeker-sprouts 1, mash-golem 1, hash-brown-shield 4, fry-lance 2, skillet-flail 1, spud-dice 1, starch-plating 2, peel-out 1.
- run.timeSec: 240.683
- run.level: 12
- run.kills: 1246
- run.damageBySource: seeker-sprouts 4786.617, fry-lance 8547.574, dog:dalmatian 876.536, hash-brown-shield 12245.159, mash-golem 1558.572, skillet-flail 4198.364, grok-bot 2598.993, spud-dice 2940.4
- run.damageTakenBySource: Hot oil 9.851, enemy:sand-crab 16.17, enemy:tomato-leech 4.881, enemy:oil-drip 2.162, enemy:ketchup-drop 2.234, enemy:bowling-ball 9.785, enemy:aphid 2.651, enemy:potato-beetle 12.351, enemy:bowling-pin 1.162, enemy:sprout-mite 3.679, enemy:beetle-brood 2.22, boss:beetle-queen 11.333, enemy:wireworm-larva 15.996
- run.killsBySource: seeker-sprouts 169, fry-lance 312, dog:dalmatian 43, hash-brown-shield 432, mash-golem 41, skillet-flail 111, grok-bot 64, spud-dice 74
- run.biomes: ["fry-oil-desert","ketchup-bog","gutterball-lanes","mash-swamp","peel-forest","frozen-tundra"]
- run.dogs: [{"id":"retriever","at":17.983333333333334},{"id":"dalmatian","at":24.033333333333335}]
- run.dogHelp: damage.dalmatian 876.536, hits.dalmatian 72, fetched.retriever 407
- run.distance: 13587.744
- run.dodgePoints: 1963.191
- run.dodgeSecond: 240
- run.dodgeTaken: [46.83853367182898,46.83853367182898,46.83853367182898,46.83853367182898,50.36674090410263,59.89897308391323,63.42718031618688,66.95538754846052,66.95538754846052,75.976647085965,86.54274111069147,86.54274111069147,86.54274111069147,86.54274111069147,86.54274111069147,86.54274111069147,86.54274111069147,86.54274111069147,86.54274111069147,88.24264736069148,91.0758244440248,91.0758244440248,91.0758244440248,91.0758244440248,92.7757306940248,92.7757306940248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,94.4756369440248,46.83853367182898,46.83853367182898,46.83853367182898]
- run.dodgeSteps: [990.238993333173,996.8729933331712,1003.5069933331694,1009.8092933331676,1014.563659999833,1021.1976599998312,1027.8316599998293,1036.5794933331613,1044.9045599998267,1051.5385599998249,1058.172559999823,1064.8065599998213,1072.7088599998197,1081.8794599998184,1088.5134599998166,1095.1474599998148,1101.781459999813,1112.220359999812,1118.8543599998102,1125.4883599998084,1130.132159999807,1134.8865266664725,1145.3254266664715,1151.9594266664697,1156.713793333135,1161.4681599998005,1168.1021599997987,1174.7361599997969,1179.4905266664623,1185.5938066664623,1190.2376066664676,1194.8814066664727,1200.4207966664749,1207.054796666473,1213.6887966664713,1220.3227966664695,1226.9567966664677,1233.5907966664658,1240.224796666464,1246.8587966664622,1252.763056666463,1258.4019566664647,1265.0359566664629,1271.2055766664628,1277.839576666461,1284.4735766664592,1291.1075766664574,1297.7415766664556,1300.3951766664547,1301.1691433331212,1307.8031433331194,1314.4371433331175,1321.0711433331157,1327.705143333114,1334.3391433331121,1340.9731433331103,1347.6071433331085,1354.2411433331067,970.3369933331784,976.9709933331766,983.6049933331748]
- run.curseSince: 10057
- run.goldEarned: 153.353
- run.bossesKilled: 1
- run.elitesKilled: 6
- run.peakEnemies: 188
- run.shrinesUsed: 4
- run.grokBotHelps: 3
- run.botSwarms: 1
- run.lootRunnersMet: [1]
- counters.kills: 1246
- counters.hits: 2240
- counters.gems: 1011
- counters.coins: 66
- counters.shots: 1108
- counters.hostileShots: 333
- counters.nearMisses: 25
- counters.hostileHits: 6
- shrineTotals.moveSpeed: 0.07
- shrineTotals.maxHp: 14.4
- shrineTotals.armor: 29
- Gold, spots and chests: gold held at the end 153, spent 0; spots charged and used: Stray Dog 2, Tater Lantern 2, Crop Patch 1; chests seen 7, opened 0.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:08 took Mash Golem 67% over Packed Pan 21%, Mash Finisher 12%; 0:19 took Hash Brown Shield 64% over Spud Cannon 25%, Mash Golem 11%; 0:22 took Fry Lance 79% over Mash Golem 13%, Gravy Splash 8%; 0:31 took Hash Brown Shield 43% over Julienne Dash 41%, Fry Knives 16%; 0:50 took Hash Brown Shield 48% over Mash Finisher 36%, Reroll 13%, Mash Golem 3%; 0:59 took Max HP 83% over Damage 16%, Duration 1%; 1:04 took Hash Brown Shield 49% over Tater Tot Pup 32%, Spud Sneakers 11%, Reroll 8%; 1:09 took Armor 95% over Gold gain 3%, Crit 2%; 1:21 took Move speed 85% over Crit 8%, Luck 7%; 1:29 took Starch Plating 74% over Reroll 12%, Seeker Sprouts 9%, Slow Cooker 5%; 1:32 took Armor 67% over Cooldown 30%, Move speed 3%; 1:47 took Peel Out 40% over Mash Mallet 33%, Spud Sneakers 16%, Reroll 11%; 2:20 took Skillet Flail 73% over Seeker Sprouts 12%, Reroll 11%, Tater Trot 4%; 2:25 took Leave 91% over option 0 5%, option 1 3%, option 2 1%; 2:47 took Starch Plating 51% over Hot Potato 42%, Reroll 5%, Sour Cream 2%; 3:11 took Spud Dice 49% over Seeker Sprouts 21%, Big Bowl 17%, Reroll 13%; 3:23 took Fry Lance 34% over Masher Grip 27%, Reroll 25%, Spud Dice 14%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:59 level 6, maxHp 137.28, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Mash Golem 1/8, Hash Brown Shield 3/8, Fry Lance 1/8 | 1:56 level 9, maxHp 137.28, armor 49, damageMult 1, recovery 0, Seeker Sprouts 1/8, Mash Golem 1/8, Hash Brown Shield 4/8, Fry Lance 1/8, Starch Plating 1/5, Peel Out 1/5 | 2:59 level 11, maxHp 137.28, armor 69, damageMult 1, recovery 0, Seeker Sprouts 1/8, Mash Golem 1/8, Hash Brown Shield 4/8, Fry Lance 1/8, Skillet Flail 1/8, Starch Plating 2/5, Peel Out 1/5 | 3:59 level 13, maxHp 137.28, armor 69, damageMult 1, recovery 0, Seeker Sprouts 1/8, Mash Golem 1/8, Hash Brown Shield 4/8, Fry Lance 2/8, Skillet Flail 1/8, Spud Dice 1/8, Starch Plating 2/5, Peel Out 1/5.
- Passive levels first reached: Starch Plating 1 at 1:29; Peel Out 1 at 1:47.

### L6.I1.G3: boss knobs s43

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 43; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: died after 124.7s (game clock 02:04); damage taken 142 (Spore vent 6.133, enemy:crumb-ant 5.921, enemy:fry-fly 38.979, enemy:potato-beetle 6.097); 390 kills; level 1 to 8; planner asked 46 times, action model 200; the models saw the game 51 ms late (p90 330); ended with seeker-sprouts 5, reset-button 2, small-fry 1, fry-sentry 1, gravy-splash 1, four-eyed-spud 2.
- run.timeSec: 124.683
- run.level: 7
- run.kills: 390
- run.damageBySource: seeker-sprouts 2801.084, reset-button 635.454, dog:dalmatian 386.073, grok-bot 113.48, small-fry 1731.479, dog:terrier 765.703, fry-sentry 1795.025
- run.damageTakenBySource: Spore vent 6.133, enemy:crumb-ant 5.921, enemy:fry-fly 38.979, enemy:potato-beetle 6.097, Hot oil 9.167, enemy:oil-drip 2.18, boss:amusing 66.525, enemy:swarm-fly 5.544, enemy:sprout-mite 1.635
- run.killsBySource: seeker-sprouts 178, reset-button 31, dog:dalmatian 19, grok-bot 7, small-fry 59, dog:terrier 32, fry-sentry 64
- run.biomes: ["frozen-tundra","compost-caves","chip-canyons","fry-oil-desert"]
- run.dogs: [{"id":"dalmatian","at":20.2},{"id":"beagle","at":25.35},{"id":"terrier","at":47.1}]
- run.dogHelp: damage.terrier 765.703, damage.dalmatian 386.073, hits.terrier 52, hits.dalmatian 32, gold.beagle 39, finds.beagle 13
- run.distance: 6833.28
- run.dodgePoints: 1016.156
- run.dodgeSecond: 124
- run.dodgeTaken: [71.85881006785146,104.01272117896256,115.5711195658912,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,6.133333333333339,7.592690639166673,7.592690639166673,7.592690639166673,7.592690639166673,7.592690639166673,11.490552601223618,11.490552601223618,15.388414563280563,30.054510297486758,39.339206997097534,49.96136363752993,49.96136363752993,49.96136363752993,53.85922559958688,53.85922559958688,53.85922559958688,53.85922559958688,56.52589226625354,57.19255893292021,57.19255893292021,57.19255893292021,59.85922559958688,59.85922559958688,59.85922559958688,59.85922559958688,59.85922559958688,61.359225599586885,61.359225599586885,63.02589226625355,63.02589226625355,63.02589226625355,63.02589226625355,63.02589226625355,63.02589226625355,63.02589226625355,63.02589226625355,63.02589226625355,63.02589226625355,63.02589226625355,63.02589226625355,65.20627673451813,65.20627673451813,65.20627673451813]
- run.dodgeSteps: [666.6913333333126,672.8913333333137,679.0913333333162,328.4346666666603,334.6346666666601,340.8346666666599,347.03466666665975,353.23466666665956,359.4346666666594,365.6346666666592,371.834666666659,378.03466666665884,384.23466666665865,390.4346666666585,396.6346666666583,402.8346666666581,409.0346666666579,415.23466666665536,421.43466666665245,427.63466666664954,433.8346666666466,440.0346666666437,446.2346666666408,452.4346666666379,458.63466666663805,464.834666666638,470.00133333330376,472.27466666663605,478.47466666663314,484.67466666663523,490.8746666666378,497.0746666666393,503.27466666664185,503.58466666664197,508.3379999999773,514.5379999999798,520.7379999999823,526.9379999999849,533.1379999999859,539.3379999999843,539.7513333333175,539.7513333333175,545.0213333333149,551.221333333312,557.4213333333091,563.6213333333086,569.82133333331,576.0213333333104,582.221333333312,588.4213333333129,594.6213333333154,600.821333333318,607.0213333333173,613.2213333333173,619.4213333333198,625.621333333321,631.8213333333181,638.0213333333152,644.2213333333123,650.4213333333125,656.6213333333108]
- run.curseSince: 5527
- run.killer: "boss:amusing"
- run.goldEarned: 196.005
- run.goldSpent: 30
- run.bossChests: 2
- run.paidChests: 1
- run.elitesKilled: 4
- run.peakEnemies: 99
- run.grokBotHelps: 3
- counters.kills: 390
- counters.hits: 965
- counters.gems: 129
- counters.coins: 64
- counters.shots: 714
- counters.hostileShots: 10
- counters.nearMisses: 8
- counters.hostileHits: 2
- Gold, spots and chests: gold held at the end 166, spent 30 (Potato Crate 30); spots charged and used: Stray Dog 3, Crop Patch 2, Spud Freezer 1; chests seen 4, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:10 took Gravy Splash 44% over Gravy Heart 43%, Stuffed Skin 13%; 0:14 took Reset Button 87% over Gravy Splash 8%, Gem Sling 5%; 0:36 took Small Fry 42% over Seeker Sprouts 37%, Hash Rush 21%; 1:02 took Fry Cook Sentry 59% over Small Fry 34%, Slow Cooker 7%; 1:26 took Four-Eyed Spud 58% over Butter Streak 28%, Tot Toss 14%; 1:32 took Four-Eyed Spud 47% over Hash Boomerang 25%, Fry Cook Sentry 15%, Reroll 13%; 1:53 took Reset Button 68% over Fertilizer 13%, Starch Puddle 12%, Reroll 5%, Fry Cook Sentry 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 4, maxHp 120, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 1/8, Reset Button 1/8, Small Fry 1/8, Gravy Splash 1/5 | 2:00 level 8, maxHp 132, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 5/8, Reset Button 2/8, Small Fry 1/8, Fry Cook Sentry 1/8, Gravy Splash 1/5, Four-Eyed Spud 2/5 | 2:04 level 8, maxHp 132, armor 0, damageMult 1.03, recovery 0, Seeker Sprouts 5/8, Reset Button 2/8, Small Fry 1/8, Fry Cook Sentry 1/8, Gravy Splash 1/5, Four-Eyed Spud 2/5.
- Passive levels first reached: Gravy Splash 1 at 0:10; Four-Eyed Spud 1 at 1:26.

### L6.I1.G4: boss knobs s44

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 44; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240.1s (game clock 04:00), health 123/176; damage taken 184 (Spore vent 42.233, enemy:potato-beetle 8.84, enemy:aphid 8.941, enemy:compost-maggot 11.081); 1967 kills; level 1 to 16; planner asked 89 times, action model 444; the models saw the game 47 ms late (p90 164); ended with seeker-sprouts 1, tot-cavalry 1, peel-phantom 4, potato-battery 1, seed-potato 1, whisk-vortex 1, stuffed-skin 1, gravy-heart 3, starch-plating 1, butter-socks 2, peel-out 1.
- run.timeSec: 240.067
- run.level: 15
- run.kills: 1967
- run.damageBySource: seeker-sprouts 4325.831, tot-stampede 17721.379, potato-battery 4912.633, seed-potato 4403.807, whisk-vortex 10530.043, lightning-spud 3668.924, peel-phantom 49.46, tot-cavalry 12946.605, grok-bot 222.672
- run.damageTakenBySource: Spore vent 42.233, enemy:potato-beetle 8.84, enemy:aphid 8.941, enemy:compost-maggot 11.081, enemy:garden-slug 2.648, enemy:sprout-mite 3.881, boss:amusing 33.774, enemy:crumb-ant 7.594, enemy:bowling-ball 14.524, enemy:bowling-pin 5.751, boss:beetle-queen 37.843, enemy:beetle-brood 7.208
- run.killsBySource: seeker-sprouts 206, tot-stampede 720, potato-battery 156, seed-potato 141, whisk-vortex 300, lightning-spud 105, peel-phantom 2, tot-cavalry 331, grok-bot 6
- run.evolutions: [{"id":"tot-cavalry","at":208.41666666666666}]
- run.biomes: ["compost-caves","frozen-tundra","peel-forest","gutterball-lanes"]
- run.distance: 13606.317
- run.dodgePoints: 1541.997
- run.dodgeSecond: 240
- run.dodgeTaken: [105.8453803539019,108.16228961316116,108.16228961316116,108.16228961316116,108.16228961316116,108.16228961316116,108.16228961316116,108.16228961316116,112.3792466248965,112.3792466248965,112.3792466248965,113.82458711171128,121.5476179759088,139.31058896356313,154.2418305311851,155.76176457619073,155.76176457619073,155.76176457619073,162.54372821255436,166.11379492687877,166.11379492687877,166.11379492687877,166.11379492687877,166.11379492687877,167.67122121325355,170.78607378600316,172.34543170622965,181.12254408752614,181.12254408752614,182.67984578807096,182.67984578807096,182.67984578807096,182.67984578807096,182.67984578807096,182.67984578807096,182.67984578807096,182.67984578807096,182.67984578807096,182.67984578807096,182.67984578807096,182.67984578807096,182.67984578807096,182.67984578807096,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,184.31963722658844,101.52819965494061,102.96298673036037,105.8453803539019]
- run.dodgeSteps: [1029.5049999998723,1035.7049999998694,1041.9049999998665,1048.1049999998636,1054.3049999998607,1060.5049999998578,1066.7049999998549,1072.904999999852,1079.104999999849,1085.3049999998461,1091.5049999998432,1097.7049999998403,1102.8716666665046,1108.2449999998353,1117.8849999998333,1123.3783333331644,1127.614999999829,1133.401666666493,1139.60166666649,1145.5949999998206,1148.7983333331524,1154.9983333331495,1161.1983333331466,1167.3983333331437,1173.5983333331408,1179.7983333331379,1181.9683333331368,1185.0683333331353,1191.2683333331324,1197.4683333331295,1203.048333333127,1206.8716666664584,1207.1816666664583,1213.3816666664554,1217.61833333312,1223.8183333331172,1230.0183333331142,1236.2183333331113,1242.4183333331084,1248.6183333331055,1254.8183333331026,1261.0183333330997,1267.2183333330968,1273.4183333330939,1279.618333333091,1285.818333333088,1292.0183333330851,1298.2183333330822,1304.4183333330793,1310.6183333330764,1316.8183333330735,1323.0183333330706,1329.2183333330677,1335.4183333330648,1341.6183333330619,1347.818333333059,1354.018333333056,1360.2183333330531,1010.9049999998809,1017.104999999878,1023.3049999998751]
- run.curseSince: 12625
- run.goldEarned: 455.178
- run.goldSpent: 30
- run.bossChests: 7
- run.paidChests: 1
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 170
- run.grokBotHelps: 7
- run.lootRunnersMet: [1]
- counters.kills: 1967
- counters.hits: 6033
- counters.gems: 1176
- counters.coins: 96
- counters.shots: 1705
- counters.hostileShots: 72
- counters.nearMisses: 14
- counters.hostileHits: 7
- Gold, spots and chests: gold held at the end 425, spent 30 (Potato Crate 30); spots charged and used: Crop Patch 2, Tater Lantern 1, Beetle Nest 1, Potato Crate 1; chests seen 8, opened 7.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:07 took Tot Stampede 89% over Couch Potato 8%, Bacon Bits 3%; 0:20 took Peel Phantom 65% over Root Network 31%, Hearty Helping 4%; 0:40 took Stuffed Skin 40% over Peel Phantom 33%, Butter Pat 27%; 0:42 took Potato Battery 79% over Big Bowl 11%, Peel Phantom 10%; 0:42 took Seed Potato 65% over Spud Lob 20%, Four-Eyed Spud 15%; 1:01 took Whisk Vortex 82% over Tot Stampede 14%, Hot Sauce 4%; 1:26 took Gravy Heart 61% over Whisk Vortex 21%, Seed Potato 18%; 1:34 took Starch Plating 45% over Whisk Vortex 25%, Butter Socks 20%, Reroll 10%; 1:45 took Gravy Heart 28% over Potato Battery 27%, Butter Socks 26%, Reroll 19%; 2:14 took Gravy Heart 53% over Butter Socks 34%, Reroll 7%, Spud Sneakers 6%; 2:40 took Butter Socks 39% over Seed Potato 20%, Reroll 20%, Potato Battery 18%, Skip 3%; 3:01 took Tot Stampede 94% over Reroll 3%, Whisk Vortex 2%, Skip 1%, Seeker Sprouts 0%; 3:23 took Peel Phantom 33% over Thick Skin 29%, Reroll 19%, Sour Cream 16%, Skip 3%; 3:24 took Butter Socks 51% over Hot Start 30%, Seed Potato 9%, Reroll 8%, Skip 2%; 3:30 took Peel Out 70% over Gravy Heart 20%, Reroll 7%, Slow Cooker 2%, Skip 1%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 6, maxHp 129.6, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Tot Stampede 1/8, Peel Phantom 1/8, Potato Battery 1/8, Seed Potato 1/8, Stuffed Skin 1/5 | 1:59 level 10, maxHp 160.704, armor 20, damageMult 1, recovery 0, Seeker Sprouts 1/8, Tot Stampede 6/8, Peel Phantom 1/8, Potato Battery 1/8, Seed Potato 1/8, Whisk Vortex 1/8, Stuffed Skin 1/5, Gravy Heart 2/5, Starch Plating 1/5 | 2:59 level 12, maxHp 176.256, armor 20, damageMult 1, recovery 0, Seeker Sprouts 1/8, Tot Stampede 7/8, Peel Phantom 1/8, Potato Battery 1/8, Seed Potato 1/8, Whisk Vortex 1/8, Stuffed Skin 1/5, Gravy Heart 3/5, Starch Plating 1/5, Butter Socks 1/5 | 3:59 level 16, maxHp 176.256, armor 20, damageMult 1, recovery 0, Seeker Sprouts 1/8, Tot Cavalry 1/1, Peel Phantom 4/8, Potato Battery 1/8, Seed Potato 1/8, Whisk Vortex 1/8, Stuffed Skin 1/5, Gravy Heart 3/5, Starch Plating 1/5, Butter Socks 2/5, Peel Out 1/5.
- Passive levels first reached: Stuffed Skin 1 at 0:40; Gravy Heart 1 at 1:26, 3 at 2:14; Starch Plating 1 at 1:34; Butter Socks 1 at 2:40; Peel Out 1 at 3:30.

### L6.I1.G5: boss knobs s45

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 45; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240.1s (game clock 04:00), health 10/120; damage taken 120 (Hot oil 33.4, enemy:fry-fly 43.376, enemy:ketchup-drop 1.772, enemy:tomato-leech 2.764); 851 kills; level 1 to 8; planner asked 72 times, action model 642; the models saw the game 57 ms late (p90 173); ended with seeker-sprouts 3, spud-cannon 2, harvest-moon 1, grab-bag 1, fry-knives 1, hash-brown-shield 1, hot-sauce 1.
- run.timeSec: 240.117
- run.level: 7
- run.kills: 851
- run.damageBySource: seeker-sprouts 5424.097, spud-cannon 4518.152, harvest-moon 2413.505, grab-bag 4562.937, grok-bot 509.364, fry-knives 1492.075, hash-brown-shield 1413.889, alex 2540.83
- run.damageTakenBySource: Hot oil 33.4, enemy:fry-fly 43.376, enemy:ketchup-drop 1.772, enemy:tomato-leech 2.764, enemy:oil-drip 1.914, enemy:little-grey 1.639, enemy:swarm-fly 2.772, boss:amusing 15.523, boss:beetle-queen 8.16, enemy:lint-bunny 1.997, enemy:snow-mold 4.241, enemy:frost-flea 2.125
- run.killsBySource: seeker-sprouts 237, spud-cannon 193, harvest-moon 92, grab-bag 137, grok-bot 36, fry-knives 21, hash-brown-shield 52, alex 83
- run.biomes: ["ketchup-bog","fry-oil-desert","chip-canyons","mash-swamp","crop-circle","coin-laundromat","frozen-tundra","compost-caves","peel-forest"]
- run.distance: 14804.86
- run.dodgePoints: 1791.109
- run.dodgeSecond: 240
- run.dodgeTaken: [103.15963587698329,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,105.87948587698328,108.59933587698329,108.59933587698329,110.59598003051974,110.59598003051974,116.9618868961545,116.9618868961545,119.6817368961545,119.6817368961545,119.6817368961545,119.6817368961545,119.6817368961545,119.6817368961545,119.6817368961545,119.6817368961545,119.6817368961545,119.6817368961545,119.6817368961545,119.6817368961545,119.6817368961545,103.15963587698329,103.15963587698329,103.15963587698329]
- run.dodgeSteps: [1116.2863333332161,1122.4863333332132,1128.6863333332103,1138.7563333332084,1144.9563333332055,1151.1563333332026,1157.3563333331997,1163.5563333331968,1169.7563333331939,1179.826333333192,1186.026333333189,1192.2263333331862,1198.4263333331833,1204.6263333331804,1214.6963333331782,1220.8963333331753,1227.0963333331724,1233.2963333331695,1239.4963333331666,1249.1323333331654,1254.9603333331631,1260.695333333161,1266.895333333158,1273.0953333331552,1279.2953333331523,1285.4953333331493,1291.6953333331464,1296.241999999811,1302.441999999808,1308.6419999998052,1314.8419999998023,1319.4919999998,1329.3553333331315,1335.5553333331286,1341.7553333331257,1347.6143333331233,1352.202333333123,1358.4023333331202,1364.6023333331173,1373.742333333117,1379.0433333331155,1382.1743333331156,1386.9276666664466,1390.4409999997783,1400.5109999997762,1406.7109999997733,1412.011999999772,1417.2509999997706,1421.7459999997704,1426.292666666435,1432.4926666664321,1439.9826666664296,1448.7626666664273,1454.9626666664244,1461.1626666664215,1467.3626666664186,1473.5626666664157,1479.7626666664128,1093.8163333332238,1103.886333333222,1110.086333333219]
- run.curseSince: 4475
- run.goldEarned: 91.413
- run.bossChests: 2
- run.bossesKilled: 1
- run.elitesKilled: 2
- run.peakEnemies: 184
- run.grokBotHelps: 3
- run.botSwarms: 1
- run.lootRunnersMet: [1,1]
- counters.kills: 851
- counters.hits: 1853
- counters.crits: 77
- counters.gems: 150
- counters.coins: 13
- counters.shots: 1275
- counters.hostileShots: 712
- counters.nearMisses: 21
- counters.hostileHits: 7
- Gold, spots and chests: gold held at the end 91, spent 0; spots charged and used: Tater Lantern 1; chests seen 3, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Spud Cannon 76% over Seeker Sprouts 19%, Salt Shaker 5%; 0:35 took Harvest Moon 73% over Starch Plating 19%, Seeker Sprouts 8%; 0:41 took Grab Bag 73% over Seeker Sprouts 19%, Spud Sneakers 8%; 1:01 took Fry Knives 43% over Hot Start 37%, Harvest Moon 20%; 1:14 took Hot Sauce 38% over Spud Cannon 23%, Reroll 23%, Fry Knives 16%; 1:34 took Spud Cannon 34% over Hot Sauce 34%, Potato Magnet 16%, Reroll 16%; 3:19 took Hash Brown Shield 94% over Bacon Bits 2%, Mash Finisher 2%, Reroll 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:58 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Spud Cannon 1/8, Harvest Moon 1/8, Grab Bag 1/8 | 2:00 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Spud Cannon 2/8, Harvest Moon 1/8, Grab Bag 1/8, Fry Knives 1/8, Hot Sauce 1/5 | 2:59 level 7, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Spud Cannon 2/8, Harvest Moon 1/8, Grab Bag 1/8, Fry Knives 1/8, Hot Sauce 1/5 | 3:59 level 8, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Spud Cannon 2/8, Harvest Moon 1/8, Grab Bag 1/8, Fry Knives 1/8, Hash Brown Shield 1/8, Hot Sauce 1/5.
- Passive levels first reached: Hot Sauce 1 at 1:14.

### L6.I1.G6: boss knobs s46

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 46; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: alive after 240.1s (game clock 04:00), health 102/120; damage taken 46 (Brambles 1.2, enemy:tomato-leech 13.409, enemy:bog-slime 1.745, Hot oil 25.4); 2566 kills; level 1 to 12; planner asked 91 times, action model 167; the models saw the game 40 ms late (p90 75); ended with overgrowth 1, starch-chain 1, butter-streak 2, hash-brown-shield 7, skipping-cannonball 1, fry-knives 1, fertilizer 1.
- run.timeSec: 240.083
- run.level: 11
- run.kills: 2566
- run.damageBySource: seeker-sprouts 5035.711, starch-chain 6947.744, butter-streak 931.824, hash-brown-shield 1213.979, grok-bot 239.525, skipping-cannonball 199.449, overgrowth 62343.73, fry-knives 1310.741
- run.damageTakenBySource: Brambles 1.2, enemy:tomato-leech 13.409, enemy:bog-slime 1.745, Hot oil 25.4, enemy:sizzle-imp 3.832
- run.killsBySource: seeker-sprouts 287, starch-chain 233, butter-streak 14, hash-brown-shield 9, grok-bot 14, skipping-cannonball 5, overgrowth 1996, fry-knives 8
- run.evolutions: [{"id":"overgrowth","at":131.26666666666668}]
- run.biomes: ["compost-caves","mash-swamp","peel-forest","ketchup-bog","fry-oil-desert","frozen-tundra"]
- run.dogs: [{"id":"collie","at":15.666666666666666}]
- run.dogHelp: pushed.collie 22
- run.distance: 12736.785
- run.dodgePoints: 2250.48
- run.dodgeSecond: 240
- run.dodgeTaken: [27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,27.92065147711802,29.087318143784685,39.08731814378472,45.58625816396429,27.92065147711802,27.92065147711802,27.92065147711802]
- run.dodgeSteps: [996.4196183335073,1002.8056183335095,1009.1916183335118,1015.577618333514,1019.5156516668487,1019.5156516668487,1023.02795166685,1029.4139516668522,1035.7999516668544,1040.8023183335229,1040.9087516668562,1042.5052516668568,1046.6561516668582,1050.913485000193,1050.913485000193,1050.913485000193,1050.913485000193,1050.913485000193,1051.0199183335264,1057.4059183335287,1063.791918333531,1070.1779183335332,1076.5639183335354,1082.0984516668707,1082.0984516668707,1082.0984516668707,1082.737051666871,1089.1230516668732,1095.5090516668754,1101.8950516668776,1108.2810516668799,1114.6670516668821,1121.0530516668844,1127.4390516668866,1133.8250516668888,1140.211051666891,1146.5970516668933,1152.9830516668956,1159.3690516668978,1165.7550516669,1172.1410516669023,1178.5270516669045,1184.9130516669068,1191.299051666909,1197.6850516669112,1204.0710516669135,1210.4570516669157,1216.843051666918,1223.2290516669202,1229.6150516669225,1236.0010516669247,1242.2806183335936,1245.3671850002613,1251.7531850002636,1258.1391850002658,1264.525185000268,1266.7602850002688,1273.146285000271,977.2616183335006,983.6476183335028,990.033618333505]
- run.curseSince: 12021
- run.goldEarned: 358.218
- run.bossChests: 6
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 127
- run.shrinesUsed: 2
- run.grokBotHelps: 6
- run.lootRunnersMet: [1]
- run.lootRunnersCaught: [1]
- counters.kills: 2566
- counters.hits: 3210
- counters.gems: 306
- counters.coins: 53
- counters.shots: 1638
- counters.hostileShots: 72
- counters.nearMisses: 5
- shrineTotals.might: 0.162
- Gold, spots and chests: gold held at the end 358, spent 0; spots charged and used: Crop Patch 3, Tater Lantern 3, Stray Dog 1, Dinner Bell 1, Seed Vault 1, Beetle Nest 1; chests seen 8, opened 6.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:06 took Seeker Sprouts 88% over Couch Potato 7%, Hearty Helping 5%; 0:20 took Starch Chain 43% over Tot Stampede 30%, Seeker Sprouts 27%; 0:26 took Seeker Sprouts 43% over Skillet Flail 39%, Sprout Satellites 18%; 0:27 took Butter Streak 65% over Starch Chain 29%, Bacon Bits 6%; 1:19 took Hash Brown Shield 66% over Starch Plating 25%, Butter Streak 5%, Reroll 4%; 1:24 took Hash Brown Shield 63% over Seeker Sprouts 19%, Starch Chain 13%, Leave 5%; 1:30 took Seeker Sprouts 49% over Starch Chain 32%, Butter Streak 11%, Leave 8%; 1:39 took Damage 57% over Pickup range 36%, Crit 7%; 1:39 took Fertilizer 39% over Thick Skin 36%, Reroll 14%, Salt Shaker 11%; 1:52 took Skipping Cannonball 54% over Butter Streak 23%, Reroll 15%, Tater Mines 8%; 2:12 took Hash Brown Shield 43% over GPU 36%, Mash Finisher 13%, Reroll 8%; 2:32 took Fry Knives 66% over Starch Chain 22%, Reroll 7%, Fertilizer 5%; 3:05 took Butter Streak 47% over Thick Skin 33%, Reroll 11%, Fertilizer 9%; 3:20 took Damage 42% over Armor 34%, Cooldown 24%; 3:23 took Hash Brown Shield 45% over Starch Plating 41%, Reroll 10%, Fry Knives 4%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 0:57 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 3/8, Starch Chain 1/8, Butter Streak 1/8 | 1:59 level 8, maxHp 120, armor 0, damageMult 1.102, recovery 0, Seeker Sprouts 8/8, Starch Chain 1/8, Butter Streak 1/8, Hash Brown Shield 2/8, Skipping Cannonball 1/8, Fertilizer 1/5 | 2:59 level 10, maxHp 120, armor 0, damageMult 1.102, recovery 0, Overgrowth 1/1, Starch Chain 1/8, Butter Streak 1/8, Hash Brown Shield 3/8, Skipping Cannonball 1/8, Fry Knives 1/8, Fertilizer 1/5 | 3:59 level 12, maxHp 120, armor 0, damageMult 1.162, recovery 0, Overgrowth 1/1, Starch Chain 1/8, Butter Streak 2/8, Hash Brown Shield 7/8, Skipping Cannonball 1/8, Fry Knives 1/8, Fertilizer 1/5.
- Passive levels first reached: Fertilizer 1 at 1:40.

### L6.I1.G7: boss knobs s47

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 47; 240s; plays the playbook with distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3.
- Outcome: died after 205.6s (game clock 03:25); damage taken 145 (Hot oil 12.333, enemy:fry-fly 44.404, enemy:oil-drip 16.131, enemy:aphid 7.143); 251 kills; level 1 to 5; planner asked 58 times, action model 496; the models saw the game 35 ms late (p90 56); ended with seeker-sprouts 1, reset-button 6.
- run.timeSec: 205.55
- run.level: 4
- run.kills: 251
- run.damageBySource: seeker-sprouts 3835.788, reset-button 1572.972
- run.damageTakenBySource: Hot oil 12.333, enemy:fry-fly 44.404, enemy:oil-drip 16.131, enemy:aphid 7.143, enemy:ketchup-drop 2.081, boss:amusing 22.175, enemy:sand-crab 12.684, enemy:frost-flea 5.414, enemy:snow-mold 7.196, enemy:potato-beetle 3.888, boss:beetle-queen 5.44, Brambles 6
- run.killsBySource: seeker-sprouts 184, reset-button 67
- run.biomes: ["fry-oil-desert","ketchup-bog","mash-swamp","frozen-tundra","peel-forest"]
- run.dogs: [{"id":"beagle","at":10.616666666666667}]
- run.dogHelp: gold.beagle 75, finds.beagle 25
- run.distance: 12801.993
- run.dodgePoints: 1366.054
- run.dodgeSecond: 205
- run.dodgeTaken: [108.97053558439649,108.97053558439649,108.97053558439649,111.1880466955076,111.1880466955076,120.82650766314832,120.82650766314832,123.54635766314831,123.54635766314831,123.54635766314831,123.54635766314831,123.54635766314831,125.04635766314831,132.26620766314832,132.26620766314832,132.26620766314832,132.26620766314832,132.26620766314832,132.26620766314832,132.26620766314832,138.91874099648166,141.13625210759275,141.13625210759275,92.95262453460055,92.95262453460055,92.95262453460055,92.95262453460055,92.95262453460055,95.1220769013483,97.3395880124594,97.3395880124594,97.3395880124594,97.3395880124594,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,104.53537263805732,106.4147204553283,106.4147204553283,106.4147204553283,106.4147204553283,106.4147204553283,106.4147204553283,106.4147204553283,106.4147204553283,108.97053558439649]
- run.dodgeSteps: [1121.0393333332113,1128.0993333332085,1137.3093333332065,1143.5093333332036,1149.7093333332007,1155.9093333331978,1165.9793333331959,1172.179333333193,1178.37933333319,1184.5793333331872,1194.649333333185,1200.8493333331821,1207.0493333331792,1213.2493333331763,1219.4493333331734,1228.6593333331714,1235.7193333331686,1241.9193333331657,1248.1193333331628,1254.3193333331599,1264.389333333158,1270.589333333155,1276.7893333331522,867.3343333333075,876.4123333333073,882.6123333333044,888.8123333333015,895.0123333332986,901.2123333332956,911.2823333332938,917.4823333332909,923.6823333332879,929.882333333285,936.5123333332822,945.7803333332807,950.64733333328,955.4833333332793,961.311333333277,970.6993333332763,976.8993333332734,983.0993333332705,989.2993333332676,995.4993333332646,1001.6993333332617,1007.8993333332588,1014.0993333332559,1020.299333333253,1030.369333333251,1036.569333333248,1042.7693333332452,1048.9693333332423,1055.1693333332394,1061.3693333332365,1067.5693333332335,1073.7693333332306,1079.9693333332277,1086.1693333332248,1092.369333333222,1102.43933333322,1108.639333333217,1114.8393333332142]
- run.curseSince: 637
- run.killer: "enemy:oil-drip"
- run.goldEarned: 136.95
- run.bossChests: 2
- run.elitesKilled: 2
- run.peakEnemies: 175
- run.grokBotHelps: 3
- run.lootRunnersMet: [1]
- counters.kills: 251
- counters.hits: 469
- counters.gems: 62
- counters.coins: 78
- counters.shots: 419
- counters.hostileShots: 626
- counters.nearMisses: 20
- counters.hostileHits: 6
- Gold, spots and chests: gold held at the end 136, spent 0; spots charged and used: Stray Dog 1, Beetle Nest 1, Tater Lantern 1, Spud Freezer 1; chests seen 2, opened 2.
- Picks, each with the planner's odds for the card taken and for the others offered: 0:14 took Reset Button 86% over Afterburner Fries 10%, Potato Magnet 4%; 0:25 took Reset Button 74% over Butter Socks 19%, Salt Shaker 7%; 0:52 took Reset Button 66% over Four-Eyed Spud 19%, Peel Phantom 15%; 1:36 took Reset Button 75% over Four-Eyed Spud 16%, Grab Bag 9%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 1:00 level 4, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Reset Button 5/8 | 1:59 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Reset Button 6/8 | 3:00 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Reset Button 6/8 | 3:25 level 5, maxHp 120, armor 0, damageMult 1, recovery 0, Seeker Sprouts 1/8, Reset Button 6/8.
