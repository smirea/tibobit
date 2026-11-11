# Does a strong seeker build survive from 15:00 to the Harvester at 20:00?

| Field | Value |
| --- | --- |
| Status | done |
| Area | bosses |
| Result | refuted |
| Created | L2.I9 |
| Updated | L2.I10 |

## Hypothesis

The 15:00 build with hash-harrier, russet-ricochet and hash-boomerang survives tier 5 elites (10000+ hp) and scaled bosses through 20:00 on Nightmare 1. If it does not, the first killer will be a tier 5 elite wave or the Harvester, and spending the large unspent gold is the first thing to try.

## Method

(none yet)

## Findings

The 15:00 seeker build did not reach 20:00. It died at 18:23 to Grease Fiend elites after Ice Imp and Mud Golem bursts at 17:00. It had 174 max hp, 0 dashes, 8 of 22 chests opened and 15171 gold unspent. The first things to try next loop are spending gold, taking max hp and armor, and using dash and chest goals during 15:00-18:00.

## Games

### L2.I9.G5: 15:00 gym to 20:00, playbook as is

- Start: gym seeker-knobs-15min-s31 (Nightmare 1 at 15:01), seed 31; 300s; plays the playbook.
- Outcome: died after 202.9s (game clock 18:23); damage taken 902 (Hot oil 11.489, enemy:ice-imp 129.341, enemy:field-rat 56.695, enemy:mud-golem 35.375); 46821 kills; level 59 to 74; planner asked 64 times, action model 238; the models saw the game 65 ms late (p90 112); ended with seeker-sprouts 8, hash-harrier 1, gratin-puddle 1, hash-boomerang 8, russet-ricochet 1, clockwork-spud 1, starch-plating 5, butter-pat 5, sprouting-eyes 5, bacon-bits 5, four-eyed-spud 5, peel-out 5.
- run.timeSec: 202.917
- run.level: 15
- run.kills: 46821
- run.damageBySource: seeker-sprouts 488077.037, hash-boomerang 4980979.647, alex 22279.279, gratin-puddle 834203.403, russet-ricochet 10378176.836, grok-bot 13589.849, hash-harrier 3320455.22, lightning-spud 822238.306, clockwork-spud 590111.643, freezer-burn 40013.086
- run.damageTakenBySource: Hot oil 11.489, enemy:ice-imp 129.341, enemy:field-rat 56.695, enemy:mud-golem 35.375, enemy:grease-fiend 669.315
- run.killsBySource: seeker-sprouts 764, hash-boomerang 11128, alex 7, gratin-puddle 2481, russet-ricochet 22993, grok-bot 69, hash-harrier 6027, lightning-spud 1487, clockwork-spud 1809, freezer-burn 56
- run.distance: 11081.103
- run.dodgePoints: 1021.857
- run.dodgeSecond: 203
- run.curseHeldPeak: 0.643
- run.dodgeTaken: [1262.3210981177863,1262.3210981177863,1262.3210981177863,1262.3210981177863,1262.3210981177863,1303.6102416821168,826.2979186466173,826.2979186466173,845.0731281863492,845.0731281863492,847.3710005267749,847.3710005267749,851.3922771225198,851.3922771225198,851.3922771225198,851.3922771225198,851.3922771225198,982.4417274627426,983.0161955478491,983.0161955478491,983.0161955478491,983.0161955478491,983.0161955478491,983.0161955478491,983.0161955478491,986.0800253350833,986.0800253350833,986.0800253350833,986.0800253350833,986.0800253350833,1024.8748279163508,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1082.7488077972039,1152.1072474606328,1221.4656871240618,1221.4656871240618,1221.4656871240618,1221.4656871240618,1221.4656871240618,1221.4656871240618,1221.4656871240618,1221.4656871240618,1221.4656871240618,1221.4656871240618,1262.3210981177863,1262.3210981177863,1262.3210981177863]
- run.dodgeSteps: [5877.382586670037,5883.830586670041,5890.278586670045,5896.726586670049,5903.174586670053,5909.622586670057,5564.009786669844,5566.481520003179,5572.929520003183,5579.377520003187,5585.825520003191,5592.273520003195,5598.721520003199,5605.169520003203,5607.856186669871,5613.659386669875,5620.107386669879,5626.555386669883,5633.003386669887,5639.451386669891,5645.791920003228,5645.791920003228,5651.487653336565,5652.347386669899,5657.398320003235,5663.846320003239,5670.294320003243,5676.742320003247,5683.190320003251,5689.638320003255,5696.086320003259,5702.534320003263,5708.982320003267,5715.430320003271,5721.878320003275,5728.326320003279,5734.774320003283,5741.222320003287,5747.670320003291,5754.118320003295,5760.566320003299,5767.014320003303,5773.462320003307,5779.9103200033105,5786.3583200033145,5792.806320003318,5794.955653336653,5797.964720003321,5804.412720003325,5810.860720003329,5817.308720003333,5823.756720003337,5830.204720003341,5836.652720003345,5843.100720003349,5849.548720003353,5855.996720003357,5860.402853336693,5864.701520003362,5865.991120003363,5870.934586670033]
- run.curseTicks: 1207.9
- run.curseSince: 12079
- run.killer: "enemy:grease-fiend"
- run.goldEarned: 7552.91
- run.bossChests: 9
- run.bossesKilled: 3
- run.elitesKilled: 12
- run.peakEnemies: 380
- run.shrinesUsed: 1
- run.grokBotHelps: 3
- run.botSwarms: 1
- run.autoPicks: 15
- run.lootRunnersMet: [5]
- run.lootRunnersCaught: [4]
- counters.kills: 46821
- counters.hits: 67283
- counters.gems: 5421
- counters.coins: 4331
- counters.shots: 2875
- counters.hostileShots: 193
- counters.nearMisses: 11
- counters.hostileHits: 8
- shrineTotals.growth: 0.084
- Gold, spots and chests: gold held at the end 15171, spent 0; spots charged and used: Beetle Nest 2, Spud Freezer 1, Seed Vault 1; chests seen 22, opened 8.
- Picks, each with the planner's odds for the card taken and for the others offered: 16:51 took XP gain 44% over Armor 42%, Crit 14%.
