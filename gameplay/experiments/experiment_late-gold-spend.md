# Does rating Potato Crates high when gold is over 300 turn late gold into power?

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | economy |
| Result | inconclusive |
| Created | L6.I1 |
| Updated | L6.I2 |

## Hypothesis

Strong and thin builds hold 1,500-2,000 gold unspent by 10:00 (1,959 at the 10:14 death), and the default planner rates crate goals 31-48%. A goal rule that rates crates high when gold is over 300, no boss is near and health is above 50% buys items without raising damage taken in the 10:00-11:30 window.

## Method

Gym playbook-nm1-570s (a thin playbook build at 9:30), 180 s games: playbook control against the crate rule. Metrics chosen first: crates bought, health lost 10:00-10:30 and survival to 11:00. Manipulation check: crate goals started and paid chests in the game's own counts (run.paidChests). One game per arm, so a lead only.

## Findings

L6.I1 G10: the crate rule bought 11 crates (3,611 gold) and took 21 damage against 78 for the control, with maxHp 138 and recovery 0.1 from items and similar kills. One game per arm, so a lead only. Gold stays unspent in the playbook, and a late-gold rule would need 6 or more games per arm on a gym whose boss survives.

## Games

### L6.I1.G10: spend gold on crates

- Start: gym playbook-nm1-570s (Nightmare 1 at 09:30), seed 1T3XV8D; 180s; plays the playbook with its own planner.goal.
- Outcome: alive after 180.4s (game clock 12:31), health 138/138; damage taken 21 (Hot oil 17.441, Brambles 3.375); 16223 kills; level 29 to 48; planner asked 79 times, action model 130; the models saw the game 86 ms late (p90 845); ended with overgrowth 1, kettle-cyclone 1, potato-battery 8, tailgate-party 1, fry-lance 8, eclipse-scythe 1, hot-start 5, gpu 5, big-bowl 5, hash-rush 5, fertilizer 4, butter-pat 5.
- run.timeSec: 180.35
- run.level: 19
- run.kills: 16223
- run.damageBySource: potato-battery 13679.531, dog:shiba 584.515, fry-lance 115748.004, kettle-cyclone 1590121.914, eclipse-scythe 39375.87, overgrowth 886597.361, tailgate-party 21497.681
- run.damageTakenBySource: Hot oil 17.441, Brambles 3.375
- run.killsBySource: potato-battery 35, dog:shiba 1, fry-lance 503, kettle-cyclone 9992, eclipse-scythe 273, overgrowth 5292, tailgate-party 127
- run.biomes: ["ketchup-bog"]
- run.dogHelp: damage.shiba 584.515, hits.shiba 42
- run.distance: 8388.91
- run.dodgePoints: 1742.584
- run.dodgeSecond: 180
- run.dodgeTaken: [240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,245.2663806950082,248.34423957578667,248.74569942980128,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,236.6078980584233,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767,240.85032230084767]
- run.dodgeSteps: [3799.070666665467,3805.270666665464,3806.303999998797,3806.303999998797,3811.3673333321276,3817.5673333321247,3823.767333332122,3829.967333332119,3834.1006666654503,3834.1006666654503,3834.1006666654503,3836.580666665449,3842.780666665446,3848.980666665443,3855.18066666544,3861.3806666654373,3867.5806666654344,3873.7806666654315,3879.9806666654285,3614.2486666654972,3620.4486666654943,3620.655333332161,3621.2753333321607,3627.475333332158,3633.675333332155,3636.67199999882,3636.67199999882,3639.875333332152,3646.075333332149,3652.275333332146,3658.4753333321432,3664.6753333321403,3670.8753333321374,3675.401333332147,3678.9973333321636,3685.1973333321607,3691.397333332158,3696.1558333321655,3700.07733333218,3706.277333332177,3712.477333332174,3718.677333332171,3720.020666665504,3722.1906666655027,3722.397333332169,3728.5973333321663,3733.557333332164,3733.557333332164,3738.207333332162,3744.407333332159,3749.573999998823,3750.503999998823,3756.70399999882,3762.903999998817,3769.1039999988143,3775.3039999988114,3778.7139999988094,3778.7139999988094,3780.4706666654756,3786.6706666654727,3792.87066666547]
- run.curseSince: 11801
- run.goldEarned: 2421.555
- run.goldSpent: 3611
- run.bossChests: 3
- run.paidChests: 11
- run.bossesKilled: 2
- run.elitesKilled: 2
- run.peakEnemies: 110
- run.grokBotHelps: 2
- run.throttles: 9
- run.lootRunnersMet: [3]
- counters.kills: 16223
- counters.hits: 17864
- counters.gems: 2064
- counters.coins: 1698
- counters.shots: 4141
- Gold, spots and chests: gold held at the end 870, spent 3539 (Potato Crate 3437, Tater Slots 102); spots charged and used: Potato Crate 8, Spud Whetstone 1, Tater Slots 1; chests seen 8, opened 3.
- Picks, each with the planner's odds for the card taken and for the others offered: 9:44 took Hot Start 38% over Potato Battery 23%, Fry Lance 18%, Reroll 18%, Skip 3%; 9:45 took Hot Start 64% over Fry Lance 16%, Reroll 10%, Hash Rush 9%, Skip 1%; 9:46 took Butter Pat 64% over Potato Battery 17%, Reroll 14%, Fry Lance 4%, Skip 1%; 10:07 took Potato Battery 52% over Fry Lance 25%, Reroll 17%, Fertilizer 4%, Skip 2%; 10:08 took Fry Lance 50% over Hash Rush 27%, Reroll 15%, Fertilizer 5%, Skip 3%; 10:09 took Potato Battery 51% over Hash Rush 31%, Reroll 13%, Fertilizer 3%, Skip 2%; 10:10 took Butter Pat 54% over Potato Battery 27%, Reroll 13%, Fry Lance 4%, Skip 2%; 10:11 took Potato Battery 54% over Fry Lance 22%, Reroll 17%, Fertilizer 5%, Skip 2%; 10:12 took Butter Pat 63% over Fry Lance 21%, Reroll 12%, Fertilizer 3%, Skip 1%; 10:14 took Potato Battery 41% over Fry Lance 22%, Hash Rush 17%, Reroll 17%, Skip 3%; 11:04 took Fry Lance 64% over Hash Rush 18%, Reroll 12%, Fertilizer 4%, Skip 2%; 11:06 took Fry Lance 60% over Hash Rush 24%, Reroll 11%, Fertilizer 3%, Skip 2%; 11:08 took Fry Lance 66% over GPU 23%, Reroll 8%, Fertilizer 2%, Skip 1%; 11:28 took GPU 73% over Hash Rush 12%, Reroll 9%, Fertilizer 4%, Skip 2%; 11:43 took GPU 65% over Hash Rush 12%, Fertilizer 11%, Reroll 10%, Skip 2%; 12:00 took GPU 74% over Hash Rush 13%, Reroll 7%, Fertilizer 5%, Skip 1%; 12:01 took Hash Rush 56% over Fertilizer 28%, Reroll 14%, Skip 2%; 12:20 took Hash Rush 62% over Fertilizer 18%, Reroll 16%, Skip 4%; 12:22 took Hash Rush 63% over Reroll 18%, Fertilizer 16%, Skip 3%.
- Build at 1:00, 2:00, 3:00 and the end (level, effective stats, weapons and passives): 12:30 level 48, maxHp 138, armor 27, damageMult 3.541, recovery 0.1, Overgrowth 1/1, Kettle Cyclone 1/1, Potato Battery 8/8, Tailgate Party 1/1, Fry Lance 8/8, Eclipse Scythe 1/1, Hot Start 5/5, GPU 5/5, Big Bowl 5/5, Hash Rush 5/5, Fertilizer 4/5, Butter Pat 5/5.
- Passive levels first reached: Hot Start 1 at the start, 3 at the start, 5 at 9:45; GPU 1 at the start, 3 at 11:28, 5 at 12:01; Big Bowl 1 at the start, 3 at the start, 5 at the start; Hash Rush 1 at the start, 3 at 12:01, 5 at 12:22; Fertilizer 1 at the start, 3 at 11:31; Butter Pat 1 at the start, 3 at 9:46, 5 at 10:13.
