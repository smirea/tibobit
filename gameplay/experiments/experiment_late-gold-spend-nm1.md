# Does spending gold and using shops and shrines make the late build stronger on Nightmare 1

| Field | Value |
| --- | --- |
| Status | done |
| Area | economy |
| Result | confirmed |
| Coach | sonnet-high |
| Created | sonnet-high L1.I10 |
| Updated | sonnet-high L2.I10 |

## Hypothesis

A goal prompt that rates Fry Cart, Potato Crate, Whetstone and Spud Shrine goals like chests when gold is 500 or more and no boss is near converts the 6000-8000 gold earned per 5 late minutes into items and levels, with no more damage than chest-first alone.

## Method

From nm1-min10-natural-b, 300s: chest-first baseline vs chest-first plus a gold and shrine sentence, two repeats each. Compare gold spent, shrines used, items held, damage and survival.

## Findings

Gold rule gated to 10:00+ and no boss within 300 spent 14338 gold in the L2.I10 full run with hp 150/150 through 20:00.

## Games

### L2.I2.G5: lo-surv chest-first plus gold sentence

- Start: gym nm1-min16-lo-surv (Nightmare 1 at 16:40), seed 1NKFNEH; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 46.6s (game clock 17:26); damage taken 488 (boss:compost-titan 244, enemy:ice-imp 116.8, enemy:mud-golem 65.4, boss:grater-golem 53.1); 4333 kills; level 48 to 51; planner asked 17 times, action model 121, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-socks 5, stuffed-skin 5.
- Damage taken 488, by source: boss:compost-titan 244, enemy:ice-imp 116.8, enemy:mud-golem 65.4, boss:grater-golem 53.1, Hot oil 4.2, Spore vent 4; the killing blow: boss:compost-titan.
- Damage dealt 2450982, by weapon: mash-avalanche 858281.9, pressure-cooker 565302.6, mandoline-fury 503602.5, gratin-arc 230905.4, tater-minigun 210580.1, boom-spud 59272, harvest-moon 23037.4.
- Kills 4333, by weapon: mash-avalanche 1408, pressure-cooker 1087, mandoline-fury 957, gratin-arc 399, tater-minigun 330, boom-spud 108, harvest-moon 44.
- Bosses killed 1, elites killed 1, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 688, spent 0.
- Made: no evolution, union or evolved item.

### L2.I4.G5: full gym items A, 8000 gold, gold sentence

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240s (game clock 20:40), health 221/221; damage taken 616 (enemy:ice-imp 207.9, boss:compost-titan 138.9, Hot oil 117.8, boss:ketchup-kraken 107.1); 26979 kills; level 57 to 71; planner asked 71 times, action model 578, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 616, by source: enemy:ice-imp 207.9, boss:compost-titan 138.9, Hot oil 117.8, boss:ketchup-kraken 107.1, boss:harvester 44.7.
- Damage dealt 24979383, by weapon: mash-avalanche 9386139.2, mandoline-fury 4268267.3, pressure-cooker 3540724.9, gratin-arc 3506717.1, tater-minigun 3132548, boom-spud 1012674.4, harvest-moon 127187.2, dog:dalmatian 2575.2.
- Kills 26979, by weapon: mash-avalanche 8996, mandoline-fury 5050, pressure-cooker 4490, gratin-arc 4124, tater-minigun 3531, boom-spud 645, harvest-moon 135, grok-bot 5.
- Bosses killed 2, elites killed 4, boss chests 7, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 5905, spent 30.
- Made: no evolution, union or evolved item.

### L2.I5.G3: boss-aware plus gold rule 8000 gold A

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, potato-knish x1; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 127.1s (game clock 18:47); damage taken 668 (boss:ketchup-kraken 535.5, enemy:grease-fiend 66, boss:compost-titan 34.7, enemy:ice-imp 31.8); 13434 kills; level 57 to 60; planner asked 35 times, action model 347, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 668, by source: boss:ketchup-kraken 535.5, enemy:grease-fiend 66, boss:compost-titan 34.7, enemy:ice-imp 31.8; the killing blow: boss:ketchup-kraken.
- Damage dealt 8639809, by weapon: mash-avalanche 2693444.4, mandoline-fury 1650741.2, gratin-arc 1634430.9, tater-minigun 1345178.7, pressure-cooker 1274648.1, harvest-moon 37753.3, grok-bot 1834.4, dog:dalmatian 1778.3.
- Kills 13434, by weapon: mash-avalanche 4224, gratin-arc 2451, mandoline-fury 2443, pressure-cooker 2264, tater-minigun 2012, harvest-moon 32, grok-bot 6, dog:dalmatian 2.
- Bosses killed 0, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1113, spent 0.
- Made: no evolution, union or evolved item.

### L2.I5.G4: boss-aware plus gold rule 8000 gold B

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, potato-knish x1; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 99s (game clock 18:19); damage taken 427 (enemy:ice-imp 219.9, boss:ketchup-kraken 107.1, boss:compost-titan 69.4, enemy:blight-spore 19.9); 13341 kills; level 57 to 62; planner asked 27 times, action model 270, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 427, by source: enemy:ice-imp 219.9, boss:ketchup-kraken 107.1, boss:compost-titan 69.4, enemy:blight-spore 19.9, Hot oil 10.4; the killing blow: boss:ketchup-kraken.
- Damage dealt 7524979, by weapon: mash-avalanche 2234371.9, mandoline-fury 1679843.7, pressure-cooker 1394808.4, gratin-arc 1143775.6, tater-minigun 1021916.3, harvest-moon 48463.4, dog:dalmatian 1799.9.
- Kills 13341, by weapon: mash-avalanche 3827, pressure-cooker 2946, mandoline-fury 2607, gratin-arc 2139, tater-minigun 1771, harvest-moon 50, dog:dalmatian 1.
- Bosses killed 1, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1964, spent 0.
- Made: no evolution, union or evolved item.

### L2.I7.G5: natural 10:00 gold rule before the crowd

- Start: gym nm1-min10-natural-b (Nightmare 1 at 10:00), seed 1V0HDWX; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 15:00), health 244/244; damage taken 56 (Spore vent 24.1, enemy:field-rat 16.4, enemy:blight-spore 12.9, Brambles 3); 25104 kills; level 31 to 51; planner asked 96 times, action model 113, in lockstep; ended with steam-vent 8, clockwork-spud 1, eclipse-scythe 1, hunters-moon 1, mandoline-fury 1, mashquake 1, starch-plating 5, big-bowl 5, four-eyed-spud 5, gravy-heart 5, butter-pat 5, potato-magnet 5; saved as gym nm1-min15-natural-b-gold.
- Damage taken 56, by source: Spore vent 24.1, enemy:field-rat 16.4, enemy:blight-spore 12.9, Brambles 3.
- Damage dealt 5439941, by weapon: mashquake 4290624.8, lightning-spud 430885.2, mandoline-fury 285773.4, clockwork-spud 206903.6, eclipse-scythe 126100.5, heavy-russet 54726, hunters-moon 28644.6, steam-vent 10253.4.
- Kills 25104, by weapon: mashquake 20519, lightning-spud 1675, mandoline-fury 1177, clockwork-spud 1014, eclipse-scythe 569, hunters-moon 98, grok-bot 34, steam-vent 13.
- Bosses killed 3, elites killed 10, boss chests 13, crates bought 8, shrines used 2, items bought 0, revives used 0; gold earned 4701, spent 5189.
- Made: hunters-moon at 10:04, mandoline-fury at 11:20.

### L2.I8.G1: gold gym 15:00 baseline A

- Start: gym nm1-min15-natural-b-gold (Nightmare 1 at 15:00), seed 1V0HDWX; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 20:00), health 273/273; damage taken 231 (boss:ketchup-kraken 210.5, Hot oil 20.3); 37413 kills; level 51 to 68; planner asked 83 times, action model 76, in lockstep; ended with steam-vent 8, clockwork-spud 1, eclipse-scythe 1, hunters-moon 1, mandoline-fury 1, mashquake 1, starch-plating 5, big-bowl 5, four-eyed-spud 5, gravy-heart 5, butter-pat 5, potato-magnet 5.
- Damage taken 231, by source: boss:ketchup-kraken 210.5, Hot oil 20.3.
- Damage dealt 23108627, by weapon: mashquake 16711950.6, mandoline-fury 2197161.3, lightning-spud 1601493.7, heavy-russet 882832, eclipse-scythe 723433.7, clockwork-spud 605853.7, hunters-moon 218793.5, fry-volcano 102196.4.
- Kills 37413, by weapon: mashquake 27564, mandoline-fury 3994, lightning-spud 2263, eclipse-scythe 1533, clockwork-spud 1300, hunters-moon 480, steam-vent 142, fry-volcano 121.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 3, shrines used 0, items bought 0, revives used 0; gold earned 8561, spent 5773.
- Made: fry-volcano at 16:15.

### L2.I8.G2: gold gym 15:00 baseline B

- Start: gym nm1-min15-natural-b-gold (Nightmare 1 at 15:00), seed 1V0HDWX; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 20:00), health 273/273; damage taken 308 (boss:ketchup-kraken 280.7, boss:compost-titan 22.5, Hot oil 2.2, Spore vent 1.3); 36456 kills; level 51 to 68; planner asked 92 times, action model 133, in lockstep; ended with steam-vent 8, clockwork-spud 1, eclipse-scythe 1, hunters-moon 1, mandoline-fury 1, mashquake 1, starch-plating 5, big-bowl 5, four-eyed-spud 5, gravy-heart 5, butter-pat 5, potato-magnet 5.
- Damage taken 308, by source: boss:ketchup-kraken 280.7, boss:compost-titan 22.5, Hot oil 2.2, Spore vent 1.3, Brambles 0.9.
- Damage dealt 22512847, by weapon: mashquake 16018381.6, mandoline-fury 2172964.9, lightning-spud 1700902.2, heavy-russet 892706, eclipse-scythe 815944.1, clockwork-spud 605171.6, hunters-moon 240513.1, steam-vent 59235.
- Kills 36456, by weapon: mashquake 26184, mandoline-fury 4085, lightning-spud 2333, eclipse-scythe 1659, clockwork-spud 1451, hunters-moon 529, steam-vent 175, grok-bot 40.
- Bosses killed 3, elites killed 10, boss chests 13, crates bought 3, shrines used 0, items bought 0, revives used 0; gold earned 7559, spent 5773.
- Made: no evolution, union or evolved item.

### L2.I8.G3: gold gym plus gold rule goal

- Start: gym nm1-min15-natural-b-gold (Nightmare 1 at 15:00), seed 1V0HDWX; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.3s (game clock 20:00), health 244/244; damage taken 22 (Hot oil 16.1, Brambles 6.3); 54208 kills; level 51 to 72; planner asked 91 times, action model 57, in lockstep; ended with steam-vent 8, clockwork-spud 1, eclipse-scythe 1, hunters-moon 1, mandoline-fury 1, mashquake 1, starch-plating 5, big-bowl 5, four-eyed-spud 5, gravy-heart 5, butter-pat 5, potato-magnet 5.
- Damage taken 22, by source: Hot oil 16.1, Brambles 6.3.
- Damage dealt 29284914, by weapon: mashquake 15636561.2, magma-croquette 7879475.4, mandoline-fury 1485171, lightning-spud 1438727.8, spicy-croquette 759078.2, heavy-russet 630136.4, clockwork-spud 604469.1, eclipse-scythe 385436.9.
- Kills 54208, by weapon: mashquake 32093, magma-croquette 11096, mandoline-fury 3455, lightning-spud 2511, clockwork-spud 1438, eclipse-scythe 1158, spicy-croquette 1097, coal-baked-spud 784.
- Bosses killed 3, elites killed 8, boss chests 11, crates bought 4, shrines used 2, items bought 4, revives used 0; gold earned 10666, spent 10503.
- Made: magma-croquette at 17:11.

### L2.I8.G5: gold gym plus gold rule and armor picks

- Start: gym nm1-min15-natural-b-gold (Nightmare 1 at 15:00), seed 1V0HDWX; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: alive after 300.1s (game clock 20:00), health 273/273; damage taken 77 (boss:ketchup-kraken 70.2, Hot oil 7); 41446 kills; level 51 to 69; planner asked 82 times, action model 142, in lockstep; ended with steam-vent 8, clockwork-spud 1, eclipse-scythe 1, hunters-moon 1, mandoline-fury 1, mashquake 1, starch-plating 5, big-bowl 5, four-eyed-spud 5, gravy-heart 5, butter-pat 5, potato-magnet 5.
- Damage taken 77, by source: boss:ketchup-kraken 70.2, Hot oil 7.
- Damage dealt 25249987, by weapon: mashquake 15431457.7, magma-croquette 2230638.3, heavy-russet 2104900, mandoline-fury 1878711.9, lightning-spud 1706789.2, clockwork-spud 723024.5, eclipse-scythe 645589.8, spicy-croquette 280774.6.
- Kills 41446, by weapon: mashquake 28842, mandoline-fury 4165, lightning-spud 2629, magma-croquette 1739, eclipse-scythe 1659, clockwork-spud 1442, hunters-moon 449, spicy-croquette 266.
- Bosses killed 3, elites killed 8, boss chests 11, crates bought 3, shrines used 0, items bought 2, revives used 0; gold earned 8384, spent 7397.
- Made: magma-croquette at 19:19.

### L2.I9.G1: natural-c 15:00 old text A

- Start: gym nm1-min15-natural-c (Nightmare 1 at 15:00), seed 1FWJ9T6; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.4s (game clock 20:01), health 138/138; damage taken 119 (boss:ketchup-kraken 107.1, Brambles 10.7, Hot oil 1.3); 71127 kills; level 56 to 78; planner asked 85 times, action model 43, in lockstep; ended with pressure-cooker 1, mashquake 1, factory-reset 1, bottomless-sack 1, spud-artillery 1, gratin-arc 1, big-bowl 5, root-network 5, four-eyed-spud 5, hot-sauce 5, sprouting-eyes 5, butter-pat 5.
- Damage taken 119, by source: boss:ketchup-kraken 107.1, Brambles 10.7, Hot oil 1.3.
- Damage dealt 43368563, by weapon: spud-artillery 19939967.3, bonfire-spud 7066059.9, mashquake 6736440.7, bottomless-sack 5167926, gratin-arc 4173907.4, pressure-cooker 197963, starch-chain 54256.7, factory-reset 31306.4.
- Kills 71127, by weapon: spud-artillery 31742, mashquake 11735, bonfire-spud 9809, bottomless-sack 8897, gratin-arc 8332, pressure-cooker 408, starch-chain 141, factory-reset 60.
- Bosses killed 3, elites killed 10, boss chests 12, crates bought 6, shrines used 0, items bought 0, revives used 0; gold earned 12120, spent 3677.
- Made: gratin-arc at 15:20.

### L2.I9.G2: natural-c 15:00 old text B

- Start: gym nm1-min15-natural-c (Nightmare 1 at 15:00), seed 1FWJ9T6; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.1s (game clock 20:00), health 138/138; damage taken 112 (boss:ketchup-kraken 107.1, Brambles 2.9, Hot oil 2.4); 74657 kills; level 56 to 80; planner asked 79 times, action model 10, in lockstep; ended with pressure-cooker 1, mashquake 1, factory-reset 1, bottomless-sack 1, spud-artillery 1, gratin-arc 1, big-bowl 5, root-network 5, four-eyed-spud 5, hot-sauce 5, sprouting-eyes 5, butter-pat 5.
- Damage taken 112, by source: boss:ketchup-kraken 107.1, Brambles 2.9, Hot oil 2.4.
- Damage dealt 42801871, by weapon: spud-artillery 19300071.4, bottomless-sack 6355711.2, mashquake 6179980.1, bonfire-spud 6089046.9, gratin-arc 4480344.3, pressure-cooker 266561.2, factory-reset 73079.5, starch-chain 54256.7.
- Kills 74657, by weapon: spud-artillery 35192, mashquake 11022, bottomless-sack 10468, bonfire-spud 8551, gratin-arc 8544, pressure-cooker 611, starch-chain 141, factory-reset 125.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 12440, spent 0.
- Made: gratin-arc at 15:20.

### L2.I9.G3: natural-c 15:00 new playbook A

- Start: gym nm1-min15-natural-c (Nightmare 1 at 15:00), seed 1FWJ9T6; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 20:00), health 179/179; damage taken 87 (boss:ketchup-kraken 61.7, Hot oil 19.2, Brambles 3.2, Spore vent 2.4); 53181 kills; level 56 to 76; planner asked 95 times, action model 102, in lockstep; ended with pressure-cooker 1, mashquake 1, factory-reset 1, bottomless-sack 1, spud-artillery 1, gratin-arc 1, big-bowl 5, root-network 5, four-eyed-spud 5, hot-sauce 5, sprouting-eyes 5, butter-pat 5.
- Damage taken 87, by source: boss:ketchup-kraken 61.7, Hot oil 19.2, Brambles 3.2, Spore vent 2.4.
- Damage dealt 38856214, by weapon: spud-artillery 17457487.6, bonfire-spud 7416286.3, bottomless-sack 5164261.2, mashquake 3888544, gratin-arc 3349626.4, heavy-russet 849313.4, moon-dust 568540.1, pressure-cooker 79771.
- Kills 53181, by weapon: spud-artillery 23812, bonfire-spud 9762, bottomless-sack 7226, mashquake 6167, gratin-arc 5534, moon-dust 447, pressure-cooker 105, factory-reset 78.
- Bosses killed 3, elites killed 10, boss chests 13, crates bought 10, shrines used 2, items bought 0, revives used 0; gold earned 10865, spent 10705.
- Made: gratin-arc at 15:09.

### L2.I9.G4: natural-c 15:00 new playbook B

- Start: gym nm1-min15-natural-c (Nightmare 1 at 15:00), seed 1FWJ9T6; 300s; plays the playbook.
- Outcome: alive after 300.4s (game clock 20:01), health 138/138; damage taken 0; 53739 kills; level 56 to 78; planner asked 88 times, action model 36, in lockstep; ended with pressure-cooker 1, mashquake 1, factory-reset 1, bottomless-sack 1, spud-artillery 1, gratin-arc 1, big-bowl 5, root-network 5, four-eyed-spud 5, hot-sauce 5, sprouting-eyes 5, butter-pat 5.
- Damage taken 0, by source: none.
- Damage dealt 48897265, by weapon: spud-artillery 20275520, bonfire-spud 9367428.2, bottomless-sack 6744074.9, mashquake 5981324.9, gratin-arc 5384476.1, heavy-russet 744732, pressure-cooker 288461.9, factory-reset 84139.9.
- Kills 53739, by weapon: spud-artillery 21556, bonfire-spud 9669, bottomless-sack 7819, mashquake 7555, gratin-arc 6560, pressure-cooker 412, factory-reset 117, starch-chain 50.
- Bosses killed 4, elites killed 8, boss chests 12, crates bought 6, shrines used 2, items bought 0, revives used 0; gold earned 10672, spent 3677.
- Made: gratin-arc at 15:10.

### L2.I9.G5: natural-b 10:00 new playbook

- Start: gym nm1-min10-natural-b (Nightmare 1 at 10:00), seed 1V0HDWX; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 15:00), health 192/192; damage taken 73 (boss:the-mandoline 62.2, Brambles 7.5, Spore vent 3.1); 25053 kills; level 31 to 50; planner asked 114 times, action model 144, in lockstep; ended with steam-vent 8, clockwork-spud 1, eclipse-scythe 1, hunters-moon 1, mandoline-fury 1, mashquake 1, starch-plating 5, big-bowl 5, four-eyed-spud 5, gravy-heart 5, butter-pat 5, potato-magnet 5.
- Damage taken 73, by source: boss:the-mandoline 62.2, Brambles 7.5, Spore vent 3.1.
- Damage dealt 4906933, by weapon: mashquake 3898563.3, lightning-spud 422069.7, mandoline-fury 268646.7, clockwork-spud 141316.9, eclipse-scythe 131642.1, hunters-moon 32488.2, steam-vent 11338.4, peeler 753.8.
- Kills 25053, by weapon: mashquake 20431, lightning-spud 1812, mandoline-fury 1333, clockwork-spud 756, eclipse-scythe 576, steam-vent 79, hunters-moon 66.
- Bosses killed 3, elites killed 14, boss chests 17, crates bought 5, shrines used 2, items bought 0, revives used 0; gold earned 4342, spent 2124.
- Made: hunters-moon at 10:04, mandoline-fury at 10:59.

### L3.I4.G4: plain text 15:00 map c

- Start: gym nm1-min15-natural-c (Nightmare 1 at 15:00), seed 1FWJ9T6; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 138/138; damage taken 107 (boss:ketchup-kraken 107.1); 90513 kills; level 56 to 83; planner asked 84 times, action model 17, in lockstep; ended with pressure-cooker 1, mashquake 1, factory-reset 1, bottomless-sack 1, spud-artillery 1, gratin-arc 1, big-bowl 5, root-network 5, four-eyed-spud 5, hot-sauce 5, sprouting-eyes 5, butter-pat 5.
- Damage taken 107, by source: boss:ketchup-kraken 107.1.
- Damage dealt 46028353, by weapon: spud-artillery 19701259.9, mashquake 9471315.9, bonfire-spud 6224466.8, bottomless-sack 6066557.1, gratin-arc 4026199.7, pressure-cooker 314817.5, factory-reset 188419.9, starch-chain 32792.1.
- Kills 90513, by weapon: spud-artillery 38208, mashquake 19791, bottomless-sack 12707, bonfire-spud 9888, gratin-arc 8681, pressure-cooker 859, factory-reset 289, starch-chain 83.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 14453, spent 0.
- Made: gratin-arc at 15:17.

### L3.I4.G5: plain plus gold rule 15:00 map c

- Start: gym nm1-min15-natural-c (Nightmare 1 at 15:00), seed 1FWJ9T6; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.3s (game clock 20:00), health 155/155; damage taken 246 (boss:ketchup-kraken 214.2, Hot oil 31.2, Brambles 0.9); 98252 kills; level 56 to 87; planner asked 108 times, action model 90, in lockstep; ended with pressure-cooker 1, mashquake 1, factory-reset 1, bottomless-sack 1, spud-artillery 1, gratin-arc 1, big-bowl 5, root-network 5, four-eyed-spud 5, hot-sauce 5, sprouting-eyes 5, butter-pat 5.
- Damage taken 246, by source: boss:ketchup-kraken 214.2, Hot oil 31.2, Brambles 0.9.
- Damage dealt 75730395, by weapon: spud-artillery 32864313.6, mashquake 11723962.7, storm-tot 9329825.7, bonfire-spud 8608623.2, bottomless-sack 6792248.4, gratin-arc 3017646, lightning-spud 1954311.6, boom-spud 1106691.2.
- Kills 98252, by weapon: spud-artillery 41603, mashquake 19451, bonfire-spud 10492, bottomless-sack 9912, storm-tot 7060, gratin-arc 5322, lightning-spud 2430, boom-spud 1200.
- Bosses killed 4, elites killed 10, boss chests 14, crates bought 6, shrines used 11, items bought 6, revives used 0; gold earned 22116, spent 9574.
- Made: gratin-arc at 15:32, storm-tot at 18:55.

### L3.I5.G4: plain 15:00 map c repeat

- Start: gym nm1-min15-natural-c (Nightmare 1 at 15:00), seed 1FWJ9T6; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 20:00), health 138/138; damage taken 1 (Hot oil 0.9); 70428 kills; level 56 to 78; planner asked 86 times, action model 26, in lockstep; ended with pressure-cooker 1, mashquake 1, factory-reset 1, bottomless-sack 1, spud-artillery 1, gratin-arc 1, big-bowl 5, root-network 5, four-eyed-spud 5, hot-sauce 5, sprouting-eyes 5, butter-pat 5.
- Damage taken 1, by source: Hot oil 0.9.
- Damage dealt 39373954, by weapon: spud-artillery 16041530, mashquake 7772257.7, bonfire-spud 6879253.1, bottomless-sack 5544738.8, gratin-arc 2831236.5, pressure-cooker 162789.1, starch-chain 74709.3, factory-reset 62323.7.
- Kills 70428, by weapon: spud-artillery 27253, mashquake 16724, bonfire-spud 10253, bottomless-sack 10199, gratin-arc 5237, pressure-cooker 376, starch-chain 217, factory-reset 157.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 12248, spent 0.
- Made: gratin-arc at 15:29.

### L3.I5.G5: gym e 5:00 plain repeat

- Start: gym nm1-min5-fresh-e (Nightmare 1 at 05:00), seed 1616; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 10:00), health 120/120; damage taken 27 (boss:sir-strawman 11.7, boss:late-blight 7.2, boss:fryer-king 5.5, Hot oil 2.2); 15484 kills; level 17 to 34; planner asked 110 times, action model 427, in lockstep; ended with pressure-cooker 1, tater-minigun 1, spark-corral 1, hash-bulwark 1, butter-socks 4, masher-grip 5, root-network 5, mash-finisher 2, gpu 4, starch-plating 3.
- Damage taken 27, by source: boss:sir-strawman 11.7, boss:late-blight 7.2, boss:fryer-king 5.5, Hot oil 2.2.
- Damage dealt 851769, by weapon: storm-tot 467499.8, pressure-cooker 176980.7, tater-minigun 111631.7, spark-corral 59953.1, hash-bulwark 15877, grok-bot 6109.8, spud-fence 6091.1, alex 5491.4.
- Kills 15484, by weapon: storm-tot 7515, pressure-cooker 4148, tater-minigun 2340, spark-corral 871, hash-bulwark 204, spud-fence 156, alex 102, grok-bot 94.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 1, revives used 0; gold earned 2223, spent 183.
- Made: spark-corral at 08:10, hash-bulwark at 09:15, storm-tot at 05:14.
