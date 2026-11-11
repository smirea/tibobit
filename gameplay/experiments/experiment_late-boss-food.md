# Does withholding food and crate goals near a boss cut health lost at the 10:00 Great Wireworm?

| Field | Value |
| --- | --- |
| Status | done |
| Area | bosses |
| Result | inconclusive |
| Created | L5.I10 |
| Updated | L6.I2 |

## Hypothesis

The default planner picks 'Eat the food' at 90% health with a boss within 200, walking Tibo into it. A planner.goal rule that rates food and crate goals low while a boss is within 300 and health is above 60% cuts health lost in the first 30 s of a boss arrival.

## Method

Build a gym in the same iteration from a thin playbook build at about 9:30 (stages of 5 minutes, up to 3 replays), then play 3 or more games per arm for 120 s: playbook against the rule. Metric: health lost 10:00-10:30, survival to 11:00. A lead only; confirm with more games before any playbook change.

## Findings

L6.I1 gym playbook-nm1-570s, 180 s: control 78 damage, no-food rule 176 damage (Wireworm 66 at 10:04, Mandoline 70). The gym build was too strong, killing the Wireworm in 1-5 s, so food goals near the boss were barely tested. Redo only on a gym whose boss survives for 10 s or more, which is a weak build, with 6 or more games per arm. Gym retired.

## Games

### L6.I1.G8: gym control playbook

- Start: gym playbook-nm1-570s (Nightmare 1 at 09:30), seed 1T3XV8D; 180s; plays the playbook.
- Outcome: alive after 180.7s (game clock 12:31), health 63/120; damage taken 78 (Hot oil 6.959, Brambles 4.023, enemy:blight-spore 9.854, enemy:mud-golem 57.011); 15130 kills; level 29 to 46; planner asked 81 times, action model 115; the models saw the game 85 ms late (p90 1053); ended with overgrowth 1, kettle-cyclone 1, potato-battery 8, tailgate-party 1, fry-lance 8, eclipse-scythe 1, hot-start 5, gpu 5, big-bowl 5, hash-rush 2, fertilizer 2, butter-pat 5.
- run.timeSec: 180.7
- run.level: 17
- run.kills: 15130
- run.damageBySource: potato-battery 8647.275, dog:shiba 1172.402, fry-lance 68988.075, grok-bot 2508.691, kettle-cyclone 1693555.146, eclipse-scythe 75390.251, overgrowth 823207.129, tailgate-party 28406.977, coal-baked-spud 1686.556
- run.damageTakenBySource: Hot oil 6.959, Brambles 4.023, enemy:blight-spore 9.854, enemy:mud-golem 57.011
- run.killsBySource: potato-battery 35, dog:shiba 5, fry-lance 212, grok-bot 27, kettle-cyclone 9449, eclipse-scythe 491, overgrowth 4757, tailgate-party 150, coal-baked-spud 4
- run.biomes: ["ketchup-bog"]
- run.dogHelp: damage.shiba 1172.402, hits.shiba 85
- run.distance: 9565.515
- run.dodgePoints: 1707.505
- run.dodgeSecond: 181
- run.dodgeTaken: [248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,248.76552651678142,305.7767877302291,305.7767877302291,305.7767877302291,305.7767877302291,305.7767877302291,229.48687369317526,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,239.3409799562861,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,241.8068890471952,242.87744865790077,248.76552651678142,248.76552651678142]
- run.dodgeSteps: [3916.93783333202,3923.137833332017,3929.3378333320143,3935.5378333320114,3941.7378333320084,3947.9378333320055,3954.1378333320026,3960.3378333319997,3966.537833331997,3968.1911666653295,3968.1911666653295,3968.2944999986626,3974.4944999986596,3980.6944999986567,3980.901166665323,3980.901166665323,3983.0711666653224,3989.2711666653195,3995.4711666653166,4001.6711666653136,3696.7396666654145,3702.9396666654116,3709.1396666654086,3715.3396666654057,3721.539666665403,3727.7396666654,3733.939666665397,3740.139666665394,3746.339666665391,3752.5396666653883,3758.7396666653854,3764.9396666653824,3771.1396666653795,3777.3396666653766,3783.5396666653737,3789.739666665371,3795.939666665368,3802.139666665365,3808.339666665362,3814.539666665359,3817.5363333320247,3819.189666665357,3825.389666665354,3831.589666665351,3837.7896666653482,3843.9896666653453,3850.1896666653424,3856.3896666653395,3862.5896666653366,3867.9991666653395,3871.4091666653576,3876.260666665365,3881.3911666653703,3886.867833332034,3886.867833332034,3886.867833332034,3891.414499998699,3897.614499998696,3900.8178333320275,3904.537833332026,3910.737833332023]
- run.curseSince: 11739
- run.goldEarned: 2047.97
- run.goldSpent: 102
- run.bossChests: 5
- run.paidChests: 2
- run.bossesKilled: 2
- run.elitesKilled: 6
- run.peakEnemies: 98
- run.grokBotHelps: 5
- run.botSwarms: 1
- run.throttles: 9
- run.lootRunnersMet: [3]
- counters.kills: 15130
- counters.hits: 19180
- counters.gems: 854
- counters.coins: 1583
- counters.shots: 4362
- counters.hostileShots: 53
- counters.nearMisses: 4
- counters.hostileHits: 1
- Gold, spots and chests: gold held at the end 4010, spent 102 (Potato Crate 102); spots charged and used: Crop Patch 2, Potato Crate 2, Spud Freezer 1, Dinner Bell 1; chests seen 12, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 9:44 took Hot Start 44% over Potato Battery 22%, Reroll 18%, Fry Lance 13%, Skip 3%; 9:48 took Hot Start 46% over Butter Pat 34%, Reroll 14%, Hash Rush 4%, Skip 2%; 10:36 took GPU 54% over Potato Battery 18%, Reroll 14%, Fry Lance 12%, Skip 2%; 11:07 took GPU 55% over Potato Battery 24%, Reroll 14%, Hash Rush 5%, Skip 2%; 11:41 took GPU 70% over Fry Lance 11%, Reroll 10%, Hash Rush 8%, Skip 1%; 11:42 took Potato Battery 64% over Butter Pat 22%, Reroll 9%, Hash Rush 4%, Skip 1%; 11:42 took Fry Lance 46% over Hash Rush 30%, Reroll 17%, Fertilizer 5%, Skip 2%; 11:43 took Butter Pat 49% over Fry Lance 22%, Reroll 19%, Hash Rush 8%, Skip 2%; 11:43 took Butter Pat 54% over Reroll 19%, Fry Lance 16%, Hash Rush 9%, Skip 2%; 11:44 took Butter Pat 53% over Fry Lance 31%, Reroll 12%, Fertilizer 3%, Skip 1%; 11:44 took Fry Lance 44% over Hash Rush 34%, Reroll 16%, Fertilizer 4%, Skip 2%; 11:45 took Fry Lance 54% over Hash Rush 28%, Reroll 13%, Fertilizer 3%, Skip 2%; 11:46 took Fry Lance 58% over Hash Rush 20%, Reroll 16%, Fertilizer 4%, Skip 2%; 11:47 took Fry Lance 64% over Hash Rush 15%, Reroll 13%, Fertilizer 6%, Skip 2%; 11:47 took Fry Lance 62% over Hash Rush 18%, Reroll 14%, Fertilizer 4%, Skip 2%; 11:50 took Fry Lance 70% over Hash Rush 14%, Reroll 11%, Fertilizer 4%, Skip 1%; 12:01 took Hash Rush 66% over Reroll 16%, Fertilizer 15%, Skip 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 12:29 level 46, maxHp 120, armor 27, damageMult 3.246, recovery 0, Overgrowth 1/1, Kettle Cyclone 1/1, Potato Battery 8/8, Tailgate Party 1/1, Fry Lance 8/8, Eclipse Scythe 1/1, Hot Start 5/5, GPU 5/5, Big Bowl 5/5, Hash Rush 2/5, Fertilizer 2/5, Butter Pat 5/5.
- Passive levels first reached: Hot Start 1 at the start, 3 at the start, 5 at 9:48; GPU 1 at the start, 3 at 10:36, 5 at 11:41; Big Bowl 1 at the start, 3 at the start, 5 at the start; Hash Rush 1 at the start; Fertilizer 1 at the start; Butter Pat 1 at the start, 3 at 11:43, 5 at 11:44.

### L6.I1.G9: no food or crate near boss

- Start: gym playbook-nm1-570s (Nightmare 1 at 09:30), seed 1T3XV8D; 180s; plays the playbook with its own planner.goal.
- Outcome: alive after 180.1s (game clock 12:30), health 120/120; damage taken 176 (boss:great-wireworm 66.419, Brambles 28.795, enemy:blight-spore 9.953, boss:the-mandoline 70.431); 16059 kills; level 29 to 49; planner asked 82 times, action model 97; the models saw the game 83 ms late (p90 1055); ended with overgrowth 1, kettle-cyclone 1, potato-battery 8, tailgate-party 1, fry-lance 8, eclipse-scythe 1, hot-start 5, gpu 5, big-bowl 5, hash-rush 5, fertilizer 5, butter-pat 5.
- run.timeSec: 180.117
- run.level: 20
- run.kills: 16059
- run.damageBySource: potato-battery 12552.555, dog:shiba 574, fry-lance 111661.096, kettle-cyclone 1704420.901, eclipse-scythe 32224.651, overgrowth 934550.777, tailgate-party 24930.556
- run.damageTakenBySource: boss:great-wireworm 66.419, Brambles 28.795, enemy:blight-spore 9.953, boss:the-mandoline 70.431
- run.killsBySource: potato-battery 39, fry-lance 357, kettle-cyclone 10012, eclipse-scythe 190, overgrowth 5323, tailgate-party 138
- run.dogHelp: damage.shiba 574, hits.shiba 41
- run.distance: 8862.28
- run.dodgePoints: 1121.174
- run.dodgeSecond: 180
- run.dodgeTaken: [403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,320.4398972603276,323.14444271487304,323.14444271487304,323.14444271487304,323.14444271487304,323.14444271487304,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,333.0970606222038,387.520798804022,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375,403.52778062220375]
- run.dodgeSteps: [3827.7043333321076,3833.9043333321047,3840.1043333321018,3846.304333332099,3852.504333332096,3858.704333332093,3861.597666665425,3861.597666665425,3866.7643333320893,3872.9643333320864,3879.1643333320835,3885.3643333320806,3891.5643333320777,3897.764333332075,3903.964333332072,3910.164333332069,3916.364333332066,3922.564333332063,3928.7643333320602,3607.1496666654566,3613.3496666654537,3619.549666665451,3625.749666665448,3631.949666665445,3638.149666665442,3644.349666665439,3650.5496666654362,3656.7496666654333,3662.9496666654304,3669.1496666654275,3675.3496666654246,3681.5496666654217,3687.7496666654188,3693.949666665416,3700.149666665413,3706.34966666541,3712.549666665407,3718.749666665404,3724.9496666654013,3725.052999998735,3726.0863333320676,3732.2863333320647,3735.6963333320627,3735.6963333320627,3735.6963333320627,3740.9663333320605,3747.1663333320575,3753.3663333320546,3759.5663333320517,3764.1853333320605,3767.5953333320786,3772.586333332085,3778.786333332082,3784.614333332082,3788.0243333321,3791.434333332118,3796.704333332122,3802.904333332119,3809.1043333321163,3815.3043333321134,3821.5043333321105]
- run.curseSince: 10781
- run.goldEarned: 2353.378
- run.bossChests: 5
- run.bossesKilled: 2
- run.elitesKilled: 4
- run.peakEnemies: 100
- run.shrinesUsed: 3
- run.grokBotHelps: 3
- run.throttles: 7
- run.autoPicks: 3
- run.lootRunnersMet: [3]
- counters.kills: 16059
- counters.hits: 18173
- counters.gems: 2099
- counters.coins: 1648
- counters.shots: 4393
- counters.hostileShots: 74
- counters.nearMisses: 5
- counters.hostileHits: 4
- shrineTotals.might: 0.06
- shrineTotals.growth: 0.168
- Gold, spots and chests: gold held at the end 4416, spent 0; spots charged and used: Crop Patch 2, Spud Freezer 1; chests seen 10, opened 5.
- Picks, each with the planner's odds for the card taken and for the others offered: 10:01 took GPU 63% over Fry Lance 14%, Reroll 12%, Hash Rush 9%, Skip 2%; 10:02 took Butter Pat 60% over Potato Battery 21%, Reroll 12%, Hash Rush 5%, Skip 2%; 10:03 took GPU 45% over Butter Pat 40%, Reroll 8%, Fry Lance 6%, Skip 1%; 10:04 took GPU 75% over Potato Battery 11%, Reroll 7%, Hot Start 6%, Skip 1%; 10:05 took Hot Start 43% over Fry Lance 36%, Reroll 14%, Fertilizer 5%, Skip 2%; 10:06 took Butter Pat 52% over Potato Battery 27%, Reroll 12%, Hash Rush 7%, Skip 2%; 10:07 took Potato Battery 55% over Hash Rush 27%, Reroll 13%, Fertilizer 3%, Skip 2%; 10:07 took Hot Start 59% over Hash Rush 27%, Reroll 10%, Fertilizer 3%, Skip 1%; 10:09 took Fry Lance 44% over Hash Rush 33%, Reroll 16%, Fertilizer 5%, Skip 2%; 10:32 took Damage 59% over Cooldown 39%, Luck 2%; 10:42 took XP gain 61% over Move speed 37%, Luck 2%; 10:45 took Butter Pat 71% over Potato Battery 11%, Reroll 10%, Fry Lance 7%, Skip 1%; 10:46 took Potato Battery 48% over Fry Lance 25%, Reroll 18%, Fertilizer 6%, Skip 3%; 10:46 took Potato Battery 46% over Fry Lance 24%, Reroll 21%, Fertilizer 7%, Skip 2%; 10:55 took XP gain 68% over Damage 18%, Pickup range 14%; 11:01 took Potato Battery 77% over Fry Lance 15%, Leave 8%; 11:03 took Potato Battery 70% over Fry Lance 14%, Reroll 11%, Fertilizer 4%, Skip 1%; 11:06 took Fry Lance 54% over Hash Rush 30%, Reroll 10%, Fertilizer 4%, Skip 2%; 11:29 took Hash Rush 74% over Reroll 15%, Fertilizer 9%, Skip 2%; 11:30 took Hash Rush 79% over Reroll 11%, Fertilizer 8%, Skip 2%; 12:00 took Hash Rush 81% over Reroll 10%, Fertilizer 7%, Skip 2%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 12:29 level 49, maxHp 120, armor 27, damageMult 3.1, recovery 0, Overgrowth 1/1, Kettle Cyclone 1/1, Potato Battery 8/8, Tailgate Party 1/1, Fry Lance 8/8, Eclipse Scythe 1/1, Hot Start 5/5, GPU 5/5, Big Bowl 5/5, Hash Rush 5/5, Fertilizer 5/5, Butter Pat 5/5.
- Passive levels first reached: Hot Start 1 at the start, 3 at the start, 5 at 10:07; GPU 1 at the start, 3 at 10:01, 5 at 10:04; Big Bowl 1 at the start, 3 at the start, 5 at the start; Hash Rush 1 at the start, 3 at 11:29, 5 at 12:01; Fertilizer 1 at the start, 3 at 11:53, 5 at 12:06; Butter Pat 1 at the start, 3 at 10:02, 5 at 10:45.
