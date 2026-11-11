# What lets a strong 15:00 build survive to 20:00: earlier dashes or spending gold?

| Field | Value |
| --- | --- |
| Status | done |
| Area | meta |
| Result | inconclusive |
| Created | L4.I8 |
| Updated | L4.I9 |

## Hypothesis

The earlier 15:00 build died at 18:23 to tier 5 Grease Fiend bursts with 174 max hp, 0 dashes and 15k gold unspent. A lower dash threshold with a boss dash range and a spare dash charge, or a goal that spends gold on crates, vendors and whetstones, should cut burst damage or raise power in 15:00-20:00.

## Method

Gym late-evolved-15min built this iteration from a strong evolved loadout. 300 s (to 20:00): playbook twice, dashThreshold 0.25 with bossDashThreshold 0.25 and bossDashRange 300, and a gold-spending planner.goal. One or two games per arm, so leads only. Read death time, health lost per minute, burst sizes, dashes and their health, gold spent, items bought and chests opened.

## Findings

All four 300 s games from the 15:00 evolved gym won (playbook x2, dash 0.25, gold-spend), so there is no difference to read. The gym build (240 hp, armor 100) is much stronger than anything the playbook builds from 0:00. Dash 0.25 fired 3 times at 32-38% scores at 47-74% health against Kraken bursts, gold spending bought 8 crates and lowered kills, and neither changed survival. The 15:00-20:00 stretch needs no lever for a strong build. The open issue is reaching that build from 0:00.

## Games

### L4.I8.G6: 15:00 playbook A

- Start: gym late-evolved-15min (Nightmare 1 at 15:00), seed VCN67U; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 20:00), health 240/240; damage taken 196 (Brambles 5.187, Spore vent 0.856, Hot oil 2.444, boss:compost-titan 45.072); 71009 kills; level 60 to 81; planner asked 98 times, action model 154; the models saw the game 88 ms late (p90 131); ended with overgrowth 1, hash-harrier 1, hashnado 1, russet-ricochet 1, clockwork-spud 1, gratin-arc 1, starch-plating 5, gravy-heart 5, butter-pat 5, bacon-bits 5, sprouting-eyes 5, root-network 5.
- run.timeSec: 300
- run.level: 21
- run.kills: 71009
- run.damageBySource: gratin-arc 6915526.14, overgrowth 4429833.66, hashnado 13852334.024, russet-ricochet 10678841.174, lightning-spud 1757052.415, clockwork-spud 362286.535, hash-harrier 2039894.095, boom-spud 2100522.561, freezer-burn 327948.439
- run.damageTakenBySource: Brambles 5.187, Spore vent 0.856, Hot oil 2.444, boss:compost-titan 45.072, enemy:ice-imp 142.009
- run.killsBySource: gratin-arc 13840, overgrowth 8556, hashnado 22099, russet-ricochet 18082, lightning-spud 2417, clockwork-spud 828, hash-harrier 3242, boom-spud 1692, freezer-burn 253
- run.distance: 17599.072
- run.dodgePoints: 2215.177
- run.dodgeSecond: 300
- run.dodgeTaken: [261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,262.1502539831665,262.1502539831665,262.1502539831665,262.1502539831665,262.1502539831665,262.1502539831665,262.1502539831665,262.1502539831665,262.1502539831665,262.1502539831665,119.7272749147233,119.7272749147233,119.7272749147233,119.7272749147233,119.7272749147233,119.7272749147233,119.7272749147233,119.7272749147233,119.7272749147233,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808,261.7359682688808]
- run.dodgeSteps: [6549.885426673521,6556.8294266735375,6563.773426673555,6570.717426673573,6577.6614266735905,6584.605426673608,6591.549426673626,6598.493426673644,6605.437426673661,6610.761160007009,6610.761160007009,6615.621960007021,6621.263960007042,6628.20796000706,6635.151960007078,6642.0959600070955,6646.85260000712,6653.796600007137,6660.740600007155,6667.684600007173,6673.326600007194,6680.270600007212,6687.21460000723,6693.741960007249,6697.561160007276,6701.380360007303,6705.199560007331,6711.51860000735,6718.462600007368,6725.406600007385,6732.350600007403,6739.294600007421,6746.238600007438,6753.182600007456,6760.126600007474,6767.0706000074915,6774.014600007509,6777.370866674185,6778.412466674187,6780.958600007527,6783.2732666741995,6790.217266674217,6444.91529333992,6446.651293339924,6453.595293339942,6460.53929333996,6467.4832933399775,6474.427293339995,6475.23742667333,6477.204893340002,6484.14889334002,6489.819826673368,6491.555826673372,6498.49982667339,6505.443826673408,6508.2214266734145,6515.165426673432,6522.10942667345,6529.053426673468,6535.997426673485,6542.941426673503]
- run.curseSince: 18555
- run.goldEarned: 12447.33
- run.goldSpent: 1460
- run.bossChests: 10
- run.paidChests: 2
- run.bossesKilled: 3
- run.elitesKilled: 8
- run.won: true
- run.wonAt: 1200
- run.peakEnemies: 467
- run.shrinesUsed: 1
- run.grokBotHelps: 5
- run.autoPicks: 20
- run.metCoworkers: andrew true
- run.lootRunnersMet: [5]
- run.lootRunnersCaught: [5]
- counters.kills: 71009
- counters.hits: 107280
- counters.crits: 4438
- counters.gems: 8942
- counters.coins: 8171
- counters.shots: 7222
- counters.hostileShots: 268
- counters.nearMisses: 6
- counters.hostileHits: 9
- shrineTotals.growth: 0.12
- Gold, spots and chests: gold held at the end 21032, spent 1207 (Potato Crate 1207); spots charged and used: Crop Patch 3, Spud Freezer 3, Potato Crate 2, Tater Lantern 2, Beetle Nest 1; chests seen 12, opened 9.
- Picks, each with the planner's odds for the card taken and for the others offered: 19:00 took XP gain 64% over Pickup range 20%, Cooldown 16%; 19:12 took Reroll 65% over Skip 16%, undefined 12%, undefined 7%; 19:12 took Skip 64% over undefined 21%, undefined 15%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 20:00 level 81, maxHp 240, armor 100, damageMult 5.872, recovery 1.35, Overgrowth 1/1, Hash Harrier 1/1, Hashnado 1/1, Russet Ricochet 1/1, Clockwork Spud 1/1, Gratin Arc 1/1, Starch Plating 5/5, Gravy Heart 5/5, Butter Pat 5/5, Bacon Bits 5/5, Sprouting Eyes 5/5, Root Network 5/5.
- Passive levels first reached: Starch Plating 1 at the start, 3 at the start, 5 at the start; Gravy Heart 1 at the start, 3 at the start, 5 at the start; Butter Pat 1 at the start, 3 at the start, 5 at the start; Bacon Bits 1 at the start, 3 at the start, 5 at the start; Sprouting Eyes 1 at the start, 3 at the start, 5 at the start; Root Network 1 at the start, 3 at the start, 5 at the start.

### L4.I8.G7: 15:00 playbook B

- Start: gym late-evolved-15min (Nightmare 1 at 15:00), seed VCN67U; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 240/240; damage taken 4 (Brambles 4.119); 70553 kills; level 60 to 80; planner asked 93 times, action model 39; the models saw the game 92 ms late (p90 130); ended with overgrowth 1, hash-harrier 1, hashnado 1, russet-ricochet 1, clockwork-spud 1, gratin-arc 1, starch-plating 5, gravy-heart 5, butter-pat 5, bacon-bits 5, sprouting-eyes 5, root-network 5.
- run.timeSec: 300.233
- run.level: 20
- run.kills: 70553
- run.damageBySource: gratin-arc 7215959.54, overgrowth 4452778.349, hashnado 14491205.455, russet-ricochet 10155895.97, lightning-spud 1874017.909, clockwork-spud 389131.403, hash-harrier 2108119.443, grok-bot 1477.319, boom-spud 2049595.138, freezer-burn 71073.263
- run.damageTakenBySource: Brambles 4.119
- run.killsBySource: gratin-arc 13892, overgrowth 8328, hashnado 22930, russet-ricochet 17056, lightning-spud 2562, clockwork-spud 819, hash-harrier 3363, grok-bot 5, boom-spud 1518, freezer-burn 80
- run.biomes: ["ketchup-bog"]
- run.distance: 17393.368
- run.dodgePoints: 2979.403
- run.dodgeSecond: 300
- run.dodgeTaken: [70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067,70.70190695337067]
- run.dodgeSteps: [6503.309786672546,6510.253786672563,6517.197786672581,6524.141786672599,6531.085786672616,6538.029786672634,6544.314106672644,6550.702586672656,6557.646586672674,6564.590586672692,6571.534586672709,6573.039120006046,6575.469520006052,6582.41352000607,6589.357520006088,6596.301520006105,6603.245520006123,6610.189520006141,6617.1335200061585,6624.077520006176,6631.021520006194,6637.965520006212,6644.909520006229,6651.853520006247,6658.797520006265,6665.741520006282,6672.6855200063,6679.629520006318,6686.5735200063355,6693.517520006353,6700.461520006371,6707.4055200063885,6714.349520006406,6721.293520006424,6728.237520006442,6735.181520006459,6742.125520006477,6748.791760006492,6754.03448000649,6759.520240006493,6766.46424000651,6773.3735200065275,6396.1407200056055,6399.728453338948,6406.672453338966,6413.616453338984,6420.5604533390015,6427.504453339019,6434.448453339037,6441.392453339055,6443.938586672394,6446.3689866724,6450.766853339078,6452.155653339081,6459.099653339099,6466.043653339117,6472.987653339134,6479.931653339152,6485.718320005833,6489.42178667251,6496.365786672528]
- run.curseSince: 16865
- run.goldEarned: 12915.659
- run.goldSpent: 1460
- run.bossChests: 11
- run.paidChests: 2
- run.bossesKilled: 4
- run.elitesKilled: 6
- run.won: true
- run.wonAt: 1200
- run.peakEnemies: 467
- run.grokBotHelps: 4
- run.autoPicks: 20
- run.metCoworkers: andrew true
- run.lootRunnersMet: [5]
- run.lootRunnersCaught: [5]
- counters.kills: 70553
- counters.hits: 106890
- counters.crits: 4543
- counters.gems: 11279
- counters.coins: 8245
- counters.shots: 7242
- counters.hostileShots: 35
- Gold, spots and chests: gold held at the end 21502, spent 1460 (Potato Crate 1460); spots charged and used: Potato Crate 2, Crop Patch 1, Spud Freezer 1, Tater Lantern 1, Boss Lair 1, Seed Vault 1; chests seen 11, opened 11.
- Picks, each with the planner's odds for the card taken and for the others offered: none.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 20:00 level 80, maxHp 240, armor 100, damageMult 5.823, recovery 1.35, Overgrowth 1/1, Hash Harrier 1/1, Hashnado 1/1, Russet Ricochet 1/1, Clockwork Spud 1/1, Gratin Arc 1/1, Starch Plating 5/5, Gravy Heart 5/5, Butter Pat 5/5, Bacon Bits 5/5, Sprouting Eyes 5/5, Root Network 5/5.
- Passive levels first reached: Starch Plating 1 at the start, 3 at the start, 5 at the start; Gravy Heart 1 at the start, 3 at the start, 5 at the start; Butter Pat 1 at the start, 3 at the start, 5 at the start; Bacon Bits 1 at the start, 3 at the start, 5 at the start; Sprouting Eyes 1 at the start, 3 at the start, 5 at the start; Root Network 1 at the start, 3 at the start, 5 at the start.

### L4.I8.G8: 15:00 dash 0.25

- Start: gym late-evolved-15min (Nightmare 1 at 15:00), seed VCN67U; 300s; plays the playbook with dashThreshold 0.25, bossDashThreshold 0.25, bossDashRange 300.
- Outcome: alive after 300.1s (game clock 20:00), health 240/240; damage taken 263 (Brambles 9.038, Spore vent 4.555, Hot oil 6.402, boss:ketchup-kraken 242.978); 76392 kills; level 60 to 81; planner asked 88 times, action model 112; the models saw the game 88 ms late (p90 127); ended with overgrowth 1, hash-harrier 1, hashnado 1, russet-ricochet 1, clockwork-spud 1, gratin-arc 1, starch-plating 5, gravy-heart 5, butter-pat 5, bacon-bits 5, sprouting-eyes 5, root-network 5.
- run.timeSec: 300.05
- run.level: 21
- run.kills: 76392
- run.damageBySource: gratin-arc 7043094.785, overgrowth 4332159.486, hashnado 17147332.094, russet-ricochet 10973140.671, lightning-spud 1880163.686, clockwork-spud 354433.155, hash-harrier 2490424.184, grok-bot 25867.771, boom-spud 2321991.502
- run.damageTakenBySource: Brambles 9.038, Spore vent 4.555, Hot oil 6.402, boss:ketchup-kraken 242.978
- run.killsBySource: gratin-arc 14226, overgrowth 8592, hashnado 26502, russet-ricochet 17774, lightning-spud 2497, clockwork-spud 910, hash-harrier 3873, grok-bot 74, boom-spud 1944
- run.biomes: ["ketchup-bog","gutterball-lanes"]
- run.distance: 16765.202
- run.dodgePoints: 1801.784
- run.dodgeSecond: 300
- run.dodgeTaken: [329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,327.3372293370438,327.3372293370438,327.3940920821418,328.92938619978895,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674,329.5548763958674]
- run.dodgeSteps: [6488.066966672215,6494.762966672226,6496.771766672229,6497.32976667223,6504.025766672241,6510.721766672252,6515.74376667226,6515.74376667226,6518.868566672265,6525.564566672276,6532.260566672287,6538.956566672297,6545.652566672308,6552.348566672319,6559.0445666722935,6565.740566672261,6572.436566672228,6579.132566672195,6583.038566672176,6584.37776667217,6591.073766672137,6597.769766672104,6604.465766672071,6611.1617666720385,6617.857766672006,6624.553766671973,6631.24976667194,6637.945766671907,6644.641766671874,6651.337766671842,6658.033766671809,6664.729766671776,6668.412566671757,6668.412566671757,6672.988166671736,6679.684166671703,6686.38016667167,6693.076166671637,6695.754566671623,6695.754566671623,6697.629446671626,6705.664646671639,6385.6181666720495,6392.31416667206,6399.010166672071,6405.706166672082,6412.402166672093,6419.098166672104,6419.432966672104,6424.231766672112,6430.927766672123,6437.623766672134,6444.319766672144,6451.015766672155,6457.711766672166,6464.407766672177,6471.103766672188,6471.326966672188,6471.326966672188,6474.6749666721935,6481.370966672204]
- run.curseSince: 18177
- run.goldEarned: 12811.236
- run.goldSpent: 1460
- run.bossChests: 11
- run.paidChests: 2
- run.bossesKilled: 5
- run.elitesKilled: 8
- run.won: true
- run.wonAt: 1200
- run.peakEnemies: 467
- run.shrinesUsed: 1
- run.grokBotHelps: 7
- run.botSwarms: 3
- run.autoPicks: 21
- run.metCoworkers: andrew true
- run.lootRunnersMet: [5]
- run.lootRunnersCaught: [5]
- counters.kills: 76392
- counters.hits: 114317
- counters.crits: 4582
- counters.gems: 8865
- counters.coins: 8496
- counters.shots: 7280
- counters.hostileShots: 44
- counters.nearMisses: 2
- shrineTotals.armor: 10
- Gold, spots and chests: gold held at the end 21234, spent 1429 (Potato Crate 1429); spots charged and used: Crop Patch 2, Tater Lantern 2, Potato Crate 1, Boss Lair 1, Beetle Nest 1, Frenzy Fryer 1; chests seen 14, opened 9.
- Picks, each with the planner's odds for the card taken and for the others offered: 16:47 took Armor 84% over Pickup range 10%, Move speed 6%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 20:00 level 81, maxHp 240, armor 110, damageMult 5.922, recovery 1.45, Overgrowth 1/1, Hash Harrier 1/1, Hashnado 1/1, Russet Ricochet 1/1, Clockwork Spud 1/1, Gratin Arc 1/1, Starch Plating 5/5, Gravy Heart 5/5, Butter Pat 5/5, Bacon Bits 5/5, Sprouting Eyes 5/5, Root Network 5/5.
- Passive levels first reached: Starch Plating 1 at the start, 3 at the start, 5 at the start; Gravy Heart 1 at the start, 3 at the start, 5 at the start; Butter Pat 1 at the start, 3 at the start, 5 at the start; Bacon Bits 1 at the start, 3 at the start, 5 at the start; Sprouting Eyes 1 at the start, 3 at the start, 5 at the start; Root Network 1 at the start, 3 at the start, 5 at the start.

### L4.I8.G9: 15:00 spend gold

- Start: gym late-evolved-15min (Nightmare 1 at 15:00), seed VCN67U; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.2s (game clock 20:00), health 288/288; damage taken 22 (Hot oil 5.399, boss:grater-golem 17.067); 47505 kills; level 60 to 78; planner asked 92 times, action model 106; the models saw the game 80 ms late (p90 111); ended with overgrowth 1, hash-harrier 1, hashnado 1, russet-ricochet 1, clockwork-spud 1, gratin-arc 1, starch-plating 5, gravy-heart 5, butter-pat 5, bacon-bits 5, sprouting-eyes 5, root-network 5.
- run.timeSec: 300.167
- run.level: 18
- run.kills: 47505
- run.damageBySource: gratin-arc 5727751.878, overgrowth 7585826.647, hashnado 10271268.085, russet-ricochet 4539758.912, lightning-spud 2196642.69, clockwork-spud 106137.092, hash-harrier 838650.933, boom-spud 1248834.434, freezer-burn 128801.514, porcupine-spud 1311.25
- run.damageTakenBySource: Hot oil 5.399, boss:grater-golem 17.067
- run.killsBySource: gratin-arc 8851, overgrowth 11332, hashnado 14848, russet-ricochet 7462, lightning-spud 2679, clockwork-spud 252, hash-harrier 1068, boom-spud 921, freezer-burn 91, porcupine-spud 1
- run.itemEvolutions: [{"id":"fry-volcano","at":1070.05}]
- run.biomes: ["coin-laundromat","ketchup-bog"]
- run.distance: 11151.63
- run.dodgePoints: 2881.692
- run.dodgeSecond: 300
- run.dodgeTaken: [84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,86.12826952460198,86.68065047698292,86.68065047698292,86.68065047698292,86.68065047698292,86.68065047698292,89.04799741575843,89.04799741575843,89.04799741575843,89.04799741575843,89.04799741575843,89.04799741575843,89.04799741575843,89.04799741575843,89.04799741575843,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083,84.62894979671083]
- run.dodgeSteps: [6072.771866671516,6072.771866671516,6077.7938666715245,6084.489866671535,6091.185866671546,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6094.199066671551,6097.547066671556,6104.243066671567,6110.939066671578,6117.635066671589,6122.433866671597,6122.433866671597,6126.005066671602,6132.701066671613,6139.397066671624,6146.093066671635,6149.10626667164,6149.10626667164,6149.10626667164,6149.10626667164,6149.10626667164,6149.10626667164,6149.10626667164,6044.537066671471,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6051.121466671481,6055.697066671489,6062.3930666715,6069.08906667151]
- run.curseSince: 18006
- run.goldEarned: 9762.479
- run.goldSpent: 14179
- run.bossChests: 4
- run.paidChests: 8
- run.bossesKilled: 3
- run.elitesKilled: 6
- run.won: true
- run.wonAt: 1200
- run.peakEnemies: 233
- run.itemsBought: 3
- run.grokBotHelps: 7
- run.autoPicks: 18
- run.metCoworkers: andrew true
- run.lootRunnersMet: [5]
- run.lootRunnersCaught: [5]
- counters.kills: 47505
- counters.hits: 75702
- counters.crits: 6260
- counters.gems: 4142
- counters.coins: 5878
- counters.shots: 7254
- counters.hostileShots: 23
- counters.nearMisses: 1
- Gold, spots and chests: gold held at the end 5627, spent 13685 (Potato Crate 12289, Fry Cart 770, Tater Slots 626); spots charged and used: Potato Crate 7, Tater Slots 2, Frenzy Fryer 1, Seed Vault 1; chests seen 10, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 15:03 took option 0 62% over Leave 24%, option 2 8%, option 1 6%; 15:49 took option 2 62% over Leave 24%, option 0 9%, option 1 5%; 16:46 took Leave 39% over option 0 24%, option 1 22%, option 2 15%; 17:38 took Leave 42% over option 0 22%, option 1 20%, option 2 16%; 17:56 took Leave 28% over option 0 27%, option 1 24%, option 2 21%; 18:11 took option 0 69% over Leave 19%, option 1 6%, option 2 6%; 18:25 took Leave 32% over option 0 25%, option 1 24%, option 2 19%; 19:02 took Leave 30% over option 0 27%, option 1 26%, option 2 17%; 19:24 took Leave 32% over option 0 27%, option 1 24%, option 2 17%; 19:54 took Leave 34% over option 0 26%, option 1 23%, option 2 17%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 20:00 level 78, maxHp 288, armor 100, damageMult 5.872, recovery 1.45, Overgrowth 1/1, Hash Harrier 1/1, Hashnado 1/1, Russet Ricochet 1/1, Clockwork Spud 1/1, Gratin Arc 1/1, Starch Plating 5/5, Gravy Heart 5/5, Butter Pat 5/5, Bacon Bits 5/5, Sprouting Eyes 5/5, Root Network 5/5.
- Passive levels first reached: Starch Plating 1 at the start, 3 at the start, 5 at the start; Gravy Heart 1 at the start, 3 at the start, 5 at the start; Butter Pat 1 at the start, 3 at the start, 5 at the start; Bacon Bits 1 at the start, 3 at the start, 5 at the start; Sprouting Eyes 1 at the start, 3 at the start, 5 at the start; Root Network 1 at the start, 3 at the start, 5 at the start.
