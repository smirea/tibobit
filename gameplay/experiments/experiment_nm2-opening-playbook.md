# Does the unchanged playbook survive the first 10 minutes on Nightmare 2

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | meta |
| Result | - |
| Coach | sonnet-high |
| Created | sonnet-high L2.I10 |
| Updated | sonnet-high L3.I10 |

## Hypothesis

Steam-vent, lockstep 1 and the chest-first goal text with the 10:00 gold rule survive 0-10:00 on Nightmare 2 on most seeds, with early deaths coming from 0 chests and no evolution.

## Method

L3.I1: fresh NM2 steam-vent seeds 3131 and 3232, 300s, plus the pending gyms nm2-min5-fresh and nm2-min10-natural, 300s each, all with the unchanged playbook. Compare chests, first evolution time, damage by source and survival.

## Findings

L3.I1-I9 lockstep results (5 of 5 alive at 5:00) do not hold live: the live rehearsal lived 1 of 5 and the full run died 2:15.

## Games

### L3.I1.G1: fresh NM2 seed 3131 baseline

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3131; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 05:00), health 120/120; damage taken 25 (enemy:cave-grub 10.2, Spore vent 5.2, enemy:sprout-mite 3.8, enemy:frost-flea 2.7); 2972 kills; level 1 to 18; planner asked 121 times, action model 215, in lockstep; ended with pressure-cooker 1, tater-minigun 1, hunters-moon 1, mash-landing 7, seed-potato 8, cast-iron 1, root-network 3, masher-grip 1, starch-plating 1, gravy-splash 2, potato-magnet 1.
- Damage taken 25, by source: enemy:cave-grub 10.2, Spore vent 5.2, enemy:sprout-mite 3.8, enemy:frost-flea 2.7, enemy:spittlebug 2.1, enemy:aphid 1.2.
- Damage dealt 118203, by weapon: pressure-cooker 49452.5, tater-minigun 27149.1, cast-iron 15169.7, seed-potato 9869.1, locked-gatling 6446.2, grok-bot 3693.4, steam-vent 2318, hunters-moon 1571.9.
- Kills 2972, by weapon: pressure-cooker 1288, tater-minigun 623, seed-potato 309, cast-iron 296, locked-gatling 210, grok-bot 80, steam-vent 57, hunters-moon 45.
- Bosses killed 9, elites killed 18, boss chests 27, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1741, spent 0.
- Made: pressure-cooker at 01:38, tater-minigun at 02:20, cast-iron at 02:56, hunters-moon at 04:06.

### L3.I1.G2: fresh NM2 seed 3232 baseline

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3232; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 149/149; damage taken 42 (Hot oil 13.9, Spore vent 11.2, boss:amusing 10.4, enemy:tomato-leech 4); 7834 kills; level 1 to 24; planner asked 140 times, action model 168, in lockstep; ended with steam-vent 8, tot-cavalry 1, fry-fortress 1, gratin-arc 1, potato-rain 8, spicy-hot-potato 1, big-bowl 4, butter-socks 1, gravy-heart 2, hot-sauce 2, slow-cooker 2, chives 2.
- Damage taken 42, by source: Hot oil 13.9, Spore vent 11.2, boss:amusing 10.4, enemy:tomato-leech 4, Brambles 2.3.
- Damage dealt 406578, by weapon: spicy-hot-potato 176714.7, gratin-arc 99198.1, tot-cavalry 67748.2, fry-fortress 38198.8, hot-potato 9873.7, tot-stampede 5525.2, starch-chain 4038.9, fry-sentry 3723.1.
- Kills 7834, by weapon: spicy-hot-potato 3146, gratin-arc 2074, tot-cavalry 1370, fry-fortress 548, hot-potato 267, tot-stampede 188, starch-chain 154, fry-sentry 57.
- Bosses killed 9, elites killed 18, boss chests 27, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1878, spent 0.
- Made: tot-cavalry at 01:19, gratin-arc at 02:05, spicy-hot-potato at 03:13, fry-fortress at 03:41.

### L3.I1.G3: NM2 5:00 gym baseline

- Start: gym nm2-min5-fresh (Nightmare 2 at 05:00), seed 1GBSKDN; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 10:00), health 120/120; damage taken 14 (Hot oil 13.7); 15189 kills; level 18 to 36; planner asked 124 times, action model 246, in lockstep; ended with russet-ricochet 1, grease-fire 1, reset-button 8, sack-of-russets 1, bottomless-sack 1, starch-chain 8, root-network 5, thick-skin 5, sprouting-eyes 5, butter-pat 5, mash-finisher 1, masher-grip 5.
- Damage taken 14, by source: Hot oil 13.7.
- Damage dealt 1320290, by weapon: grease-fire 907357.6, sack-of-russets 165288.6, bottomless-sack 154333.3, russet-ricochet 60782.3, starch-chain 21982.6, spud-lob 5760.1, reset-button 2260.8, grok-bot 947.4.
- Kills 15189, by weapon: grease-fire 10368, sack-of-russets 1913, bottomless-sack 1703, russet-ricochet 730, starch-chain 228, spud-lob 161, reset-button 28, grok-bot 27.
- Bosses killed 9, elites killed 9, boss chests 17, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2644, spent 0.
- Made: sack-of-russets at 06:05, russet-ricochet at 07:09.

### L3.I1.G4: NM2 10:00 gym baseline

- Start: gym nm2-min10-natural (Nightmare 2 at 10:00), seed 11X8043; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 15:00), health 120/120; damage taken 22 (boss:the-mandoline 18.7, Brambles 3); 43597 kills; level 41 to 62; planner asked 84 times, action model 50, in lockstep; ended with grease-fire 1, potato-rain 8, baked-alaska 1, reset-button 8, spud-fence 8, mash-golem 8, hot-sauce 5, butter-pat 5, mash-finisher 5, thick-skin 5, root-network 5, masher-grip 5.
- Damage taken 22, by source: boss:the-mandoline 18.7, Brambles 3.
- Damage dealt 10773201, by weapon: grease-fire 6996311.3, baked-alaska 3672860, spud-fence 63731, potato-rain 19862.5, alex 12262.7, mash-golem 4857.9, grok-bot 3299.5, thorny-jacket 16.
- Kills 43597, by weapon: grease-fire 28464, baked-alaska 14644, spud-fence 321, potato-rain 89, alex 33, mash-golem 24, grok-bot 22.
- Bosses killed 9, elites killed 6, boss chests 15, crates bought 6, shrines used 0, items bought 0, revives used 0; gold earned 7862, spent 838.
- Made: no evolution, union or evolved item.

### L3.I2.G5: fresh seed 3333 baseline

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3333; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 161/161; damage taken 84 (boss:the-masher 46.9, enemy:aphid 11.3, enemy:crumb-ant 6.2, enemy:potato-beetle 4.8); 4295 kills; level 1 to 19; planner asked 124 times, action model 380, in lockstep; ended with steam-vent 1, sack-of-russets 1, potato-rain 8, mashquake 1, tater-minigun 1, skipping-cannonball 6, masher-grip 2, gravy-heart 2, chives 1, stuffed-skin 1, big-bowl 1, butter-pat 3.
- Damage taken 84, by source: boss:the-masher 46.9, enemy:aphid 11.3, enemy:crumb-ant 6.2, enemy:potato-beetle 4.8, enemy:sprout-mite 4.3, boss:beetle-queen 2.8, enemy:frost-flea 2.8, Hot oil 2.5.
- Damage dealt 180961, by weapon: mashquake 82718.7, tater-minigun 29091.5, mash-wave 18547.4, sack-of-russets 16894.9, spud-lob 14347.6, locked-gatling 11451.1, potato-rain 3522.6, skipping-cannonball 2597.1.
- Kills 4295, by weapon: mashquake 1972, mash-wave 524, tater-minigun 520, spud-lob 385, sack-of-russets 346, locked-gatling 310, potato-rain 92, skipping-cannonball 90.
- Bosses killed 9, elites killed 12, boss chests 21, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1470, spent 0.
- Made: tater-minigun at 02:58, mashquake at 03:15, sack-of-russets at 04:11.

### L3.I3.G5: fresh NM2 seed 3434 baseline

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3434; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 05:00), health 130/130; damage taken 23 (Spore vent 8.8, enemy:potato-beetle 4.8, enemy:sprout-mite 2.8, enemy:aphid 2.6); 3431 kills; level 1 to 18; planner asked 121 times, action model 228, in lockstep; ended with skipping-cannonball 1, clockwork-spud 1, mashquake 1, bottomless-sack 1, grease-fire 1, root-network 2, big-bowl 3, four-eyed-spud 1, sprouting-eyes 2, thick-skin 1.
- Damage taken 23, by source: Spore vent 8.8, enemy:potato-beetle 4.8, enemy:sprout-mite 2.8, enemy:aphid 2.6, enemy:fry-fly 2.2, enemy:compost-maggot 1.4.
- Damage dealt 161984, by weapon: mashquake 55599, grease-fire 28266.7, pressure-cooker 23891, bottomless-sack 18889.2, grab-bag 8731.1, clockwork-spud 8658.2, mash-wave 6628.5, grok-bot 3451.9.
- Kills 3431, by weapon: mashquake 1123, grease-fire 556, pressure-cooker 478, bottomless-sack 376, mash-wave 228, grab-bag 173, clockwork-spud 124, grok-bot 118.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 0, shrines used 1, items bought 0, revives used 0; gold earned 1654, spent 0.
- Made: pressure-cooker at 01:37, mashquake at 02:53, clockwork-spud at 03:13, bottomless-sack at 04:13, wildfire-roast at 04:45, grease-fire at 04:45.
