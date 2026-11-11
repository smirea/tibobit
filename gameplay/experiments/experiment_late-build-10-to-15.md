# What first threatens a strong build between 10:00 and 15:00?

| Field | Value |
| --- | --- |
| Status | done |
| Area | enemies |
| Result | confirmed |
| Created | L2.I8 |
| Updated | L2.I9 |

## Hypothesis

A seeker-sprouts build that reached 10:00 on the playbook keeps full health through 15:00. If it does not, tier 4-5 elites (hp 2400 at 10:00, 10000 at 15:00) and scaled bosses are the first thing that hurts it, and the unspent gold (about 2000 at 10:00) is the first thing to use.

## Method

Gym seeker-knobs-10min-s31 (10:00, hp 138, hash-harrier, russet-ricochet, hashnado) played for 300 s with the unchanged playbook. Read health over time, damage by source, elites and bosses met, chests and gold spent, and death time. If Tibo lives, save the 15:00 state as a gym.

## Findings

The 10:00 seeker gym build lived to 15:00 on the playbook at 174/174 health: 37431 kills, 230 damage taken (Ice Imp 52, Harvest Mouse 53, Mud Golem 49, Blight Spore 17, hazards 46). Tier 4-5 elites did not threaten it. 7613 gold went unspent (4 paid crates, 1389). Nothing in 10:00-15:00 needs fixing. The next question is 15:00-20:00 (late-build-15-to-20). The 15:00 state is saved as a gym.

## Games

### L2.I8.G5: 10:00 gym, playbook as is

- Start: gym seeker-knobs-10min-s31 (Nightmare 1 at 10:00), seed 31; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 15:00), health 174/174; damage taken 230 (Hot oil 37.136, Brambles 9.191, enemy:blight-spore 16.594, enemy:ice-imp 51.878); 37431 kills; level 30 to 59; planner asked 113 times, action model 268; the models saw the game 44 ms late (p90 65); ended with seeker-sprouts 8, hash-harrier 1, gratin-puddle 1, hash-boomerang 8, russet-ricochet 1, clockwork-spud 1, starch-plating 5, butter-pat 5, sprouting-eyes 5, bacon-bits 5, four-eyed-spud 5, peel-out 5; saved as gym seeker-knobs-15min-s31.
- run.timeSec: 300.2
- run.level: 29
- run.kills: 37431
- run.damageBySource: seeker-sprouts 500908.731, hash-boomerang 1982267.043, alex 9877.43, gratin-puddle 404482.036, russet-ricochet 3546435.026, grok-bot 903, hash-harrier 1525831.563, lightning-spud 399806.717, clockwork-spud 283924.865, freezer-burn 11089.753
- run.damageTakenBySource: Hot oil 37.136, Brambles 9.191, enemy:blight-spore 16.594, enemy:ice-imp 51.878, enemy:harvest-mouse 53.462, enemy:field-rat 12.05, enemy:mud-golem 49.375
- run.killsBySource: seeker-sprouts 2068, hash-boomerang 8776, alex 16, gratin-puddle 2039, russet-ricochet 15978, grok-bot 5, hash-harrier 5523, lightning-spud 1537, clockwork-spud 1461, freezer-burn 28
- run.biomes: ["gutterball-lanes"]
- run.distance: 15746.392
- run.dodgePoints: 1910.16
- run.dodgeSecond: 300
- run.curseHeldPeak: 1.75
- run.dodgeTaken: [517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,517.2806063403137,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,566.6557355797931,508.3169699766772,509.91696997667714,509.91696997667714,509.91696997667714,509.91696997667714,509.91696997667714,509.91696997667714,509.91696997667714,509.91696997667714,513.64424270395,513.64424270395,513.64424270395,513.64424270395,515.8260608857682]
- run.dodgeSteps: [4560.9374133357405,4567.3854133357445,4573.833413335748,4580.281413335752,4586.729413335756,4593.17741333576,4599.625413335764,4606.073413335768,4612.521413335772,4618.969413335776,4624.213786669117,4627.60973333579,4627.60973333579,4629.501146669127,4633.369946669138,4639.603013335809,4641.85981333581,4645.083813335812,4651.531813335816,4657.97981333582,4663.868986669158,4667.952720002502,4674.400720002506,4680.84872000251,4687.296720002514,4693.744720002518,4700.192720002522,4704.383920002525,4707.930320002527,4711.584186669196,4715.238053335865,4715.990320002532,4722.438320002536,4728.88632000254,4735.334320002544,4741.782320002548,4748.230320002552,4754.678320002556,4761.12632000256,4767.574320002564,4772.195386669233,4772.195386669233,4777.998586669237,4784.446586669241,4790.894586669245,4796.654800002584,4801.512293335925,4489.901946669031,4496.349946669035,4502.7979466690385,4509.2459466690425,4515.693946669046,4520.422480002382,4520.422480002382,4523.539013335718,4529.987013335722,4536.435013335726,4542.88301333573,4549.223546669067,4549.223546669067,4554.489413335737]
- run.curseTicks: 1974.9
- run.curseSince: 19749
- run.goldEarned: 6917.905
- run.goldSpent: 1389
- run.bossChests: 14
- run.paidChests: 4
- run.bossesKilled: 3
- run.elitesKilled: 12
- run.peakEnemies: 172
- run.shrinesUsed: 2
- run.grokBotHelps: 7
- run.autoPicks: 18
- run.metCoworkers: samir true
- run.lootRunnersMet: [4]
- run.lootRunnersCaught: [3]
- counters.kills: 37431
- counters.hits: 47610
- counters.gems: 6454
- counters.coins: 3646
- counters.shots: 3928
- counters.hostileShots: 335
- counters.nearMisses: 20
- counters.hostileHits: 6
- shrineTotals.might: 0.06
- shrineTotals.maxHp: 20.4
- Gold, spots and chests: gold held at the end 7613, spent 1348 (Potato Crate 1348); spots charged and used: Potato Crate 4, Crop Patch 2, Tater Lantern 2, Beetle Nest 2, Spud Freezer 1; chests seen 21, opened 12.
- Picks, each with the planner's odds for the card taken and for the others offered: 10:21 took Peel Out 38% over Starch Plating 31%, Sprouting Eyes 12%, Reroll 10%, Bacon Bits 8%, Skip 1%; 11:21 took Sprouting Eyes 34% over Peel Out 31%, Starch Plating 13%, Bacon Bits 12%, Reroll 9%, Skip 1%; 11:23 took Peel Out 32% over Bacon Bits 23%, Starch Plating 18%, Sprouting Eyes 15%, Reroll 11%, Skip 1%; 11:24 took Bacon Bits 32% over Starch Plating 27%, Reroll 20%, Sprouting Eyes 19%, Skip 2%; 11:25 took Peel Out 39% over Bacon Bits 27%, Starch Plating 16%, Reroll 9%, Sprouting Eyes 8%, Skip 1%; 11:25 took Peel Out 60% over Bacon Bits 15%, Starch Plating 11%, Reroll 8%, Sprouting Eyes 5%, Skip 1%; 11:27 took Bacon Bits 41% over Starch Plating 31%, Reroll 17%, Sprouting Eyes 10%, Skip 1%; 11:29 took Starch Plating 50% over Sprouting Eyes 30%, Reroll 19%, Skip 1%; 11:29 took Starch Plating 63% over Reroll 19%, Sprouting Eyes 16%, Skip 2%; 11:31 took Starch Plating 57% over Sprouting Eyes 23%, Reroll 18%, Skip 2%; 11:50 took Starch Plating 70% over Reroll 17%, Sprouting Eyes 11%, Skip 2%; 11:57 took Max HP 53% over XP gain 30%, Cooldown 17%; 12:19 took Damage 97% over Gold gain 2%, Move speed 1%.
