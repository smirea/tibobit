# Does a gold rule gated to before 15:45 keep the gold benefit without the 16:00 crowd deaths on Nightmare 1

| Field | Value |
| --- | --- |
| Status | done |
| Area | economy |
| Result | inconclusive |
| Coach | sonnet-medium |
| Created | sonnet-medium L4.I7 |
| Updated | sonnet-medium L4.I10 |

## Hypothesis

Spending gold on crates, carts, whetstones and shrines only before 15:45 and no boss within 300 gets the max hp and items benefit and avoids the spot goals in the 800-pest crowd that killed the ungated rule at 18:19 and 19:21 on plain-g.

## Method

L4.I7: plain-g 15:00 with the gated text twice against a plain control, plus gated from the 10:00 plain-g gym (saving a 15:00 gym) and 10:00 plain-f. Compare survival, damage, gold spent and max hp.

## Findings

Gated gold (10:00-15:45, no boss within 300) survived every game and raised max hp, but never lowered damage versus plain. Shipped in the L4.I10 full run; its result is the test.

## Games

### L4.I7.G1: plain-g 15:00 gated gold A

- Start: gym nm1-min15-plain-g (Nightmare 1 at 15:00), seed S7OXEY; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.3s (game clock 20:00), health 192/192; damage taken 305 (enemy:mud-golem 148.9, enemy:field-rat 63.4, enemy:blight-spore 52.2, enemy:ice-imp 24.9); 53753 kills; level 46 to 69; planner asked 119 times, action model 149, in lockstep; ended with root-current 1, mash-avalanche 1, grease-fire 1, hash-harrier 1, gravy-pack 1, inferno-basket 1, butter-socks 5, gravy-heart 5, root-network 5, bacon-bits 5, masher-grip 5, thick-skin 5.
- Damage taken 305, by source: enemy:mud-golem 148.9, enemy:field-rat 63.4, enemy:blight-spore 52.2, enemy:ice-imp 24.9, Brambles 10.1, Spore vent 5.3.
- Damage dealt 34017818, by weapon: grease-fire 31226505.6, root-current 1048926.1, mash-avalanche 714224.6, hash-harrier 405152.4, wildfire-roast 230987.8, moon-dust 170806.3, pressure-cooker 97006.8, inferno-basket 54095.8.
- Kills 53753, by weapon: grease-fire 48047, root-current 2896, mash-avalanche 1284, wildfire-roast 502, hash-harrier 410, moon-dust 288, pressure-cooker 142, gravy-pack 103.
- Bosses killed 4, elites killed 10, boss chests 14, crates bought 0, shrines used 1, items bought 0, revives used 0; gold earned 7529, spent 0.
- Made: hash-harrier at 16:06, inferno-basket at 18:01, gravy-pack at 19:08, grease-fire at 15:13.

### L4.I7.G2: plain-g 15:00 gated gold B

- Start: gym nm1-min15-plain-g (Nightmare 1 at 15:00), seed S7OXEY; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.2s (game clock 20:00), health 192/192; damage taken 109 (Brambles 37.8, boss:grater-golem 37.2, enemy:ice-imp 24.5, Spore vent 6.5); 47674 kills; level 46 to 70; planner asked 113 times, action model 162, in lockstep; ended with root-current 1, mash-avalanche 1, grease-fire 1, hash-harrier 1, gravy-pack 1, tater-minigun 1, butter-socks 5, gravy-heart 5, root-network 5, bacon-bits 5, masher-grip 5, thick-skin 5.
- Damage taken 109, by source: Brambles 37.8, boss:grater-golem 37.2, enemy:ice-imp 24.5, Spore vent 6.5, Hot oil 2.9.
- Damage dealt 31180242, by weapon: grease-fire 27907420.6, root-current 1188387.8, mash-avalanche 574783.7, hash-harrier 450255.9, wildfire-roast 284952.6, moon-dust 220413.9, gravy-pack 187831.5, pressure-cooker 152860.4.
- Kills 47674, by weapon: grease-fire 41681, root-current 3210, mash-avalanche 813, wildfire-roast 632, hash-harrier 393, moon-dust 287, pressure-cooker 236, gravy-pack 227.
- Bosses killed 4, elites killed 10, boss chests 14, crates bought 0, shrines used 0, items bought 2, revives used 0; gold earned 8347, spent 739.
- Made: hash-harrier at 15:37, gravy-pack at 17:16, tater-minigun at 19:22, grease-fire at 15:26.

### L4.I7.G3: plain-g 15:00 plain control

- Start: gym nm1-min15-plain-g (Nightmare 1 at 15:00), seed S7OXEY; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 192/192; damage taken 39 (enemy:ice-imp 24.6, Brambles 10.5, Spore vent 4.1); 44663 kills; level 46 to 67; planner asked 115 times, action model 109, in lockstep; ended with root-current 1, mash-avalanche 1, grease-fire 1, hash-harrier 1, gravy-pack 1, mash-wave 8, butter-socks 5, gravy-heart 5, root-network 5, bacon-bits 5, masher-grip 5, thick-skin 5.
- Damage taken 39, by source: enemy:ice-imp 24.6, Brambles 10.5, Spore vent 4.1.
- Damage dealt 30957121, by weapon: grease-fire 28451063.7, root-current 886692.3, mash-avalanche 431691.7, wildfire-roast 411223.3, hash-harrier 257775.9, moon-dust 211996.8, gravy-pack 166732.2, pressure-cooker 111958.6.
- Kills 44663, by weapon: grease-fire 39397, root-current 2316, wildfire-roast 1068, mash-avalanche 669, moon-dust 414, gravy-pack 284, hash-harrier 270, pressure-cooker 208.
- Bosses killed 3, elites killed 10, boss chests 13, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 7211, spent 0.
- Made: hash-harrier at 15:56, gravy-pack at 17:10, grease-fire at 15:30.

### L4.I7.G4: plain-g 10:00 gated gold, save 15:00

- Start: gym nm1-min10-plain-g (Nightmare 1 at 10:00), seed 63R4P6; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.3s (game clock 15:00), health 263/263; damage taken 327 (boss:great-wireworm 129.8, boss:deep-freezer 84.9, enemy:blight-spore 63.2, enemy:ice-imp 35.3); 23570 kills; level 30 to 51; planner asked 145 times, action model 442, in lockstep; ended with gravy-pack 1, root-current 1, mandoline-fury 1, grease-fire 1, tot-toss 5, mash-landing 2, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5; saved as gym nm1-min15-gated-i.
- Damage taken 327, by source: boss:great-wireworm 129.8, boss:deep-freezer 84.9, enemy:blight-spore 63.2, enemy:ice-imp 35.3, Brambles 8.1, Hot oil 3.5, Spore vent 2.2.
- Damage dealt 5714703, by weapon: grease-fire 2163168.7, pressure-cooker 1179777.7, gravy-pack 753792, taproot-eruption 633168.1, root-current 359210, wildfire-roast 352783.4, mandoline-fury 120212.1, hot-streak 86445.5.
- Kills 23570, by weapon: grease-fire 7705, pressure-cooker 6518, taproot-eruption 3168, root-current 1747, gravy-pack 1722, wildfire-roast 1668, hot-streak 491, mandoline-fury 297.
- Bosses killed 4, elites killed 5, boss chests 9, crates bought 4, shrines used 11, items bought 0, revives used 0; gold earned 4119, spent 376.
- Made: taproot-eruption at 10:20, wildfire-roast at 12:09, spud-grid at 13:32, mandoline-fury at 14:05, grease-fire at 13:32, root-current at 13:32.

### L4.I7.G5: plain-f 10:00 gated gold

- Start: gym nm1-min10-plain-f (Nightmare 1 at 10:00), seed 1R3XP30; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.3s (game clock 15:00), health 194/194; damage taken 51 (boss:the-mandoline 25.7, boss:deep-freezer 24.5, Brambles 1.1); 23755 kills; level 31 to 52; planner asked 124 times, action model 36, in lockstep; ended with pressure-cooker 1, mashquake 1, golden-harvest 1, root-legion 1, hash-bulwark 1, tailgate-party 1, butter-pat 5, starch-plating 5, root-network 5, big-bowl 5, golden-fry 5, peel-out 5.
- Damage taken 51, by source: boss:the-mandoline 25.7, boss:deep-freezer 24.5, Brambles 1.1.
- Damage dealt 5084642, by weapon: mashquake 3046194.2, root-legion 736094, golden-harvest 599492.4, pressure-cooker 515159.9, fry-volcano 66903.2, freezer-burn 48180.5, hash-bulwark 38675.9, tailgate-fries 18161.2.
- Kills 23755, by weapon: mashquake 14571, root-legion 3544, golden-harvest 2712, pressure-cooker 2444, fry-volcano 208, hash-bulwark 115, freezer-burn 78, tailgate-party 56.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 8, shrines used 6, items bought 2, revives used 0; gold earned 5524, spent 2029.
- Made: hash-bulwark at 12:15, tailgate-party at 14:35, fry-volcano at 11:10.

### L4.I8.G1: gated-i plain A

- Start: gym nm1-min15-gated-i (Nightmare 1 at 15:01), seed 63R4P6; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 263/263; damage taken 39 (Hot oil 39); 83213 kills; level 51 to 80; planner asked 95 times, action model 48, in lockstep; ended with gravy-pack 1, root-current 1, mandoline-fury 1, grease-fire 1, tot-toss 8, mash-landing 8, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5.
- Damage taken 39, by source: Hot oil 39.
- Damage dealt 50706580, by weapon: grease-fire 49574439.4, root-current 528320, mandoline-fury 249982, gravy-pack 243277.3, tot-toss 110553, thorny-jacket 8.
- Kills 83213, by weapon: grease-fire 81300, root-current 1211, mandoline-fury 484, gravy-pack 199, tot-toss 19.
- Bosses killed 3, elites killed 9, boss chests 12, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 14466, spent 0.
- Made: no evolution, union or evolved item.

### L4.I8.G2: gated-i plain B

- Start: gym nm1-min15-gated-i (Nightmare 1 at 15:01), seed 63R4P6; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 263/263; damage taken 2 (Spore vent 2.4); 66085 kills; level 51 to 76; planner asked 100 times, action model 54, in lockstep; ended with gravy-pack 1, root-current 1, mandoline-fury 1, grease-fire 1, tot-toss 8, mash-landing 8, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5.
- Damage taken 2, by source: Spore vent 2.4.
- Damage dealt 44876229, by weapon: grease-fire 43232800.1, root-current 892904.6, gravy-pack 319580.2, mandoline-fury 310048, tot-toss 102250.1, grok-bot 18637.6, thorny-jacket 8.
- Kills 66085, by weapon: grease-fire 63982, root-current 1297, mandoline-fury 520, gravy-pack 219, grok-bot 45, tot-toss 22.
- Bosses killed 4, elites killed 12, boss chests 16, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 11948, spent 0.
- Made: no evolution, union or evolved item.

### L4.I8.G3: plain-h plain control

- Start: gym nm1-min15-plain-h (Nightmare 1 at 15:01), seed 63R4P6; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 20:00), health 192/192; damage taken 51 (enemy:grease-fiend 37, Hot oil 14); 50457 kills; level 50 to 71; planner asked 117 times, action model 101, in lockstep; ended with gravy-pack 1, root-current 1, mandoline-fury 1, grease-fire 1, cast-iron 1, reset-button 8, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5.
- Damage taken 51, by source: enemy:grease-fiend 37, Hot oil 14.
- Damage dealt 30540874, by weapon: grease-fire 28064769.6, root-current 951310.8, wildfire-roast 652410.5, gravy-pack 390519.3, mandoline-fury 313236.5, reset-button 64139.2, pressure-cooker 53870.7, grok-bot 30173.3.
- Kills 50457, by weapon: grease-fire 44456, root-current 2560, wildfire-roast 2462, mandoline-fury 430, gravy-pack 343, grok-bot 85, pressure-cooker 48, reset-button 48.
- Bosses killed 3, elites killed 8, boss chests 11, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 8196, spent 0.
- Made: mandoline-fury at 16:07, cast-iron at 18:24, grease-fire at 15:26.

### L4.I8.G4: gold-h plain repeat

- Start: gym nm1-min15-gold-h (Nightmare 1 at 15:00), seed 63R4P6; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 215/215; damage taken 87 (boss:ketchup-kraken 44.7, Hot oil 23.2, Brambles 11.4, boss:compost-titan 8.1); 57067 kills; level 47 to 74; planner asked 112 times, action model 79, in lockstep; ended with gravy-pack 1, root-current 1, mandoline-fury 1, grease-fire 1, hash-bulwark 1, rosti-storm 1, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5.
- Damage taken 87, by source: boss:ketchup-kraken 44.7, Hot oil 23.2, Brambles 11.4, boss:compost-titan 8.1.
- Damage dealt 46348981, by weapon: grease-fire 27549932.7, storm-tot 15662188.9, root-current 1056482.1, rosti-storm 717595.6, gravy-pack 566329.3, coal-baked-spud 365685.7, mandoline-fury 331585, taproot-eruption 36312.5.
- Kills 57067, by weapon: grease-fire 36890, storm-tot 16201, root-current 2047, mandoline-fury 515, gravy-pack 486, rosti-storm 388, coal-baked-spud 310, taproot-eruption 90.
- Bosses killed 6, elites killed 20, boss chests 32, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 15899, spent 0.
- Made: mandoline-fury at 15:31, spud-grid at 15:37, hash-bulwark at 15:52, rosti-storm at 17:07, root-current at 15:38.

### L4.I8.G5: plain-f 10:00 plain repeat

- Start: gym nm1-min10-plain-f (Nightmare 1 at 10:00), seed 1R3XP30; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 15:00), health 120/120; damage taken 16 (Spore vent 10.6, Brambles 4.9, Hot oil 0.3); 30061 kills; level 31 to 53; planner asked 107 times, action model 23, in lockstep; ended with pressure-cooker 1, mashquake 1, golden-harvest 1, root-legion 1, hash-bulwark 1, hot-streak 8, butter-pat 5, starch-plating 5, root-network 5, big-bowl 5, golden-fry 5, peel-out 5.
- Damage taken 16, by source: Spore vent 10.6, Brambles 4.9, Hot oil 0.3.
- Damage dealt 6468720, by weapon: mashquake 3861319.1, root-legion 789912.3, golden-harvest 712838.7, pressure-cooker 577342.1, hot-streak 524808.7, dog:shiba 2499.4.
- Kills 30061, by weapon: mashquake 16543, root-legion 3994, golden-harvest 3539, pressure-cooker 3310, hot-streak 2667, dog:shiba 8.
- Bosses killed 4, elites killed 6, boss chests 10, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 7915, spent 0.
- Made: hash-bulwark at 11:08.

### L4.I9.G1: plain-g 15:00 plain repeat

- Start: gym nm1-min15-plain-g (Nightmare 1 at 15:00), seed S7OXEY; 300s; plays the playbook.
- Outcome: died after 110.9s (game clock 16:51); damage taken 266 (enemy:ice-imp 166, enemy:mud-golem 99.3, Spore vent 0.5); 12806 kills; level 46 to 52; planner asked 42 times, action model 56, in lockstep; ended with root-current 1, mash-avalanche 1, grease-fire 1, hash-harrier 1, tater-pup 2, butter-socks 3, gravy-heart 5, root-network 5, bacon-bits 5, masher-grip 5, thick-skin 3.
- Damage taken 266, by source: enemy:ice-imp 166, enemy:mud-golem 99.3, Spore vent 0.5; the killing blow: enemy:ice-imp.
- Damage dealt 4501188, by weapon: grease-fire 3337908.3, root-current 482753.4, wildfire-roast 334886.1, mash-avalanche 225188, pressure-cooker 68126.4, moon-dust 36731.7, hash-harrier 9826.3, hash-hawk 4942.5.
- Kills 12806, by weapon: grease-fire 10049, root-current 1357, wildfire-roast 836, mash-avalanche 403, pressure-cooker 109, moon-dust 42, hash-harrier 8, hash-hawk 1.
- Bosses killed 1, elites killed 4, boss chests 5, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2085, spent 0.
- Made: hash-harrier at 16:48, grease-fire at 15:18.

### L4.I9.G2: plain-g 15:00 plain repeat B

- Start: gym nm1-min15-plain-g (Nightmare 1 at 15:00), seed S7OXEY; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 192/192; damage taken 21 (Brambles 17.6, Hot oil 2.3, Spore vent 1.1); 53903 kills; level 46 to 69; planner asked 107 times, action model 98, in lockstep; ended with root-current 1, mash-avalanche 1, grease-fire 1, hash-harrier 1, gravy-pack 1, mash-landing 8, butter-socks 5, gravy-heart 5, root-network 5, bacon-bits 5, masher-grip 5, thick-skin 5.
- Damage taken 21, by source: Brambles 17.6, Hot oil 2.3, Spore vent 1.1.
- Damage dealt 34230587, by weapon: grease-fire 31676202.8, root-current 884837.5, wildfire-roast 446965.3, mash-avalanche 420477.8, hash-harrier 324622.1, gravy-pack 202297.7, moon-dust 178635, pressure-cooker 70290.1.
- Kills 53903, by weapon: grease-fire 48395, root-current 2408, wildfire-roast 1223, mash-avalanche 711, moon-dust 356, gravy-pack 336, hash-harrier 314, pressure-cooker 110.
- Bosses killed 4, elites killed 8, boss chests 12, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 7928, spent 0.
- Made: hash-harrier at 16:08, gravy-pack at 17:07, grease-fire at 15:26.

### L4.I9.G3: plain-f 10:00 plain

- Start: gym nm1-min10-plain-f (Nightmare 1 at 10:00), seed 1R3XP30; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 15:00), health 192/192; damage taken 53 (enemy:blight-spore 53); 13532 kills; level 30 to 45; planner asked 96 times, action model 415, in lockstep; ended with pressure-cooker 1, root-legion 1, eclipse-scythe 1, spud-grid 1, gravy-pack 1, root-spikes 8, chives 5, root-network 5, starch-plating 5, mash-finisher 5, big-bowl 5, gravy-heart 5.
- Damage taken 53, by source: enemy:blight-spore 53.
- Damage dealt 3446755, by weapon: root-legion 1180577.8, spud-grid 767946.4, gravy-pack 740768.4, pressure-cooker 554418.8, eclipse-scythe 152039.9, tater-pup 25543, grok-bot 22768, root-spikes 2692.6.
- Kills 13532, by weapon: root-legion 5199, spud-grid 3833, pressure-cooker 2059, gravy-pack 1496, eclipse-scythe 721, tater-pup 123, grok-bot 94, root-spikes 7.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2285, spent 0.
- Made: gravy-pack at 11:29.
