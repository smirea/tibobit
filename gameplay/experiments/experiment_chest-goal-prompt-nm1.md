# Does a chest-and-elite-first goal prompt improve a natural build on Nightmare 1

| Field | Value |
| --- | --- |
| Status | running |
| Area | spots |
| Result | - |
| Coach | sonnet-high |
| Created | sonnet-high L1.I5 |
| Updated | sonnet-high L1.I10 |

## Hypothesis

A planner.goal prompt that prefers chests and elites while health is above half and food when it is low yields more boss chests and evolutions and less damage than the default goal prompt.

## Method

From gym nm1-min5-fresh, 300s, the same playbook with only planner.goal replaced; compare with the default baseline game on boss chests, elites killed, evolutions, damage and survival.

## Findings

I9: chest-first survived fresh seeds 1010 and 1111 (77 and 62 damage), the seed-909 gym from 5:00 (0 damage) and the seed-707 gym from 10:00 (19 damage). Adding boss ranges 250 died at 74s on nm1-min5-fresh. The playbook stays unchanged for the I10 full run.

## Games

### L1.I5.G3: natural 5:00 chest-first goals

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 10:00), health 130/130; damage taken 300 (enemy:bog-toad 114.1, boss:sir-strawman 46.1, boss:late-blight 37.5, enemy:sizzle-imp 27.3); 8494 kills; level 17 to 28; planner asked 100 times, action model 558, in lockstep; ended with pressure-cooker 1, stand-mixer 1, spud-lob 6, hot-potato 1, mashquake 1, peel-phantom 8, big-bowl 5, hot-start 3, aged-russet 1, root-network 1, butter-pat 3, stuffed-skin 1.
- Damage taken 300, by source: enemy:bog-toad 114.1, boss:sir-strawman 46.1, boss:late-blight 37.5, enemy:sizzle-imp 27.3, enemy:field-crow 16.4, Hot oil 16.1, enemy:fry-fly 15.7, enemy:tomato-leech 13.6.
- Damage dealt 731288, by weapon: stand-mixer 238302.7, pressure-cooker 191618, mash-wave 89310.9, whisk-vortex 84767.7, mashquake 39556.8, hot-potato 29980.2, spud-lob 25425.8, steam-vent 19900.1.
- Kills 8494, by weapon: pressure-cooker 2090, stand-mixer 1885, whisk-vortex 1492, mash-wave 1242, hot-potato 458, steam-vent 452, mashquake 355, spud-lob 323.
- Bosses killed 4, elites killed 9, boss chests 20, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1670, spent 0.
- Made: pressure-cooker at 08:00, stand-mixer at 08:43, mashquake at 09:52.

### L1.I6.G2: min5 chest-first goals repeat

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 10:00), health 120/120; damage taken 29 (boss:late-blight 16.5, boss:the-masher 11.2, Hot oil 1.6); 10983 kills; level 17 to 32; planner asked 109 times, action model 241, in lockstep; ended with pressure-cooker 1, stand-mixer 1, sack-of-russets 1, hot-potato 8, mashquake 1, peel-poltergeist 1, big-bowl 5, hot-start 2, aged-russet 1, root-network 1, butter-pat 5, peel-out 3.
- Damage taken 29, by source: boss:late-blight 16.5, boss:the-masher 11.2, Hot oil 1.6.
- Damage dealt 941429, by weapon: stand-mixer 310660.6, mashquake 248352.7, sack-of-russets 141921.9, pressure-cooker 104520.8, hot-potato 66848.4, mash-wave 31231.6, spud-lob 18893.2, whisk-vortex 13024.9.
- Kills 10983, by weapon: stand-mixer 4179, mashquake 1923, pressure-cooker 1478, sack-of-russets 1434, mash-wave 581, hot-potato 580, whisk-vortex 357, spud-lob 325.
- Bosses killed 4, elites killed 9, boss chests 22, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2072, spent 0.
- Made: stand-mixer at 05:56, pressure-cooker at 06:57, sack-of-russets at 07:40, peel-poltergeist at 07:40, mashquake at 08:59.

### L1.I6.G3: min5 chest-first plus evolve picks

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: alive after 300s (game clock 10:00), health 120/120; damage taken 146 (enemy:sizzle-imp 48, enemy:mole 33.1, boss:late-blight 21.1, enemy:sand-crab 12.9); 8977 kills; level 17 to 31; planner asked 107 times, action model 333, in lockstep; ended with pressure-cooker 1, stand-mixer 1, spud-lob 4, hot-potato 8, mashquake 1, peel-poltergeist 1, big-bowl 5, hot-start 5, aged-russet 2, root-network 2, peel-out 1.
- Damage taken 146, by source: enemy:sizzle-imp 48, enemy:mole 33.1, boss:late-blight 21.1, enemy:sand-crab 12.9, Hot oil 8.9, enemy:blight-spore 8.4, enemy:tomato-leech 5.5, enemy:fry-fly 4.2.
- Damage dealt 729564, by weapon: mashquake 279925.2, stand-mixer 169546.7, hot-potato 97504.9, pressure-cooker 95340.9, whisk-vortex 30549.7, spud-lob 19502.2, mash-wave 18898.3, steam-vent 11707.6.
- Kills 8977, by weapon: mashquake 3007, stand-mixer 2069, pressure-cooker 1232, hot-potato 990, whisk-vortex 686, mash-wave 449, steam-vent 249, spud-lob 208.
- Bosses killed 4, elites killed 11, boss chests 22, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1962, spent 0.
- Made: pressure-cooker at 06:30, stand-mixer at 07:03, mashquake at 07:17, peel-poltergeist at 09:32.

### L1.I6.G5: min10 natural chest-first goals

- Start: gym nm1-min10-natural (Nightmare 1 at 10:00), seed 606; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.2s (game clock 15:00), health 192/192; damage taken 136 (enemy:ice-imp 95.1, enemy:blight-spore 37.3, Hot oil 3.5); 20693 kills; level 33 to 48; planner asked 112 times, action model 423, in lockstep; ended with pressure-cooker 1, whisk-vortex 8, railfry 1, tater-twirl 8, mandoline-fury 1, permafrost-fries 1, root-network 5, gravy-heart 5, spud-sneakers 5, butter-pat 5, hot-start 5, thick-skin 5.
- Damage taken 136, by source: enemy:ice-imp 95.1, enemy:blight-spore 37.3, Hot oil 3.5.
- Damage dealt 4178428, by weapon: railfry 952799.1, permafrost-fries 894764, pressure-cooker 893685.4, mandoline-fury 743346, whisk-vortex 614821.6, tater-twirl 69570, grok-bot 7437.3, frozen-fries 2004.4.
- Kills 20693, by weapon: pressure-cooker 5069, railfry 4321, permafrost-fries 4291, mandoline-fury 4136, whisk-vortex 2382, tater-twirl 397, grok-bot 80, frozen-fries 17.
- Bosses killed 3, elites killed 8, boss chests 18, crates bought 1, shrines used 0, items bought 1, revives used 0; gold earned 3347, spent 419.
- Made: permafrost-fries at 10:20.

### L1.I7.G1: fresh s808 chest-first

- Start: a fresh game on Nightmare 1 with steam-vent, seed 808; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 05:00), health 120/120; damage taken 57 (enemy:snow-mold 16.3, boss:amusing 15.5, Hot oil 7.3, enemy:bog-slime 5.3); 1976 kills; level 1 to 17; planner asked 117 times, action model 343, in lockstep; ended with pressure-cooker 1, ghee-glide 1, eclipse-scythe 1, mash-landing 2, hot-streak 1, hash-brown-shield 1, lean-lunch 1, hash-rush 1, root-network 1, spud-sneakers 2, big-bowl 1, mash-finisher 1; saved as gym nm1-min5-s808-chest.
- Damage taken 57, by source: enemy:snow-mold 16.3, boss:amusing 15.5, Hot oil 7.3, enemy:bog-slime 5.3, enemy:aphid 4.3, enemy:sprout-mite 2.4, enemy:frost-flea 2.4, enemy:oil-drip 1.7.
- Damage dealt 84596, by weapon: pressure-cooker 54003.4, butter-streak 7527.1, hot-streak 6355.5, ghee-glide 3981.1, steam-vent 3655, eclipse-scythe 2719.2, comet-scythe 2689.1, alex 2486.7.
- Kills 1976, by weapon: pressure-cooker 1283, butter-streak 169, steam-vent 142, comet-scythe 99, hot-streak 88, ghee-glide 66, eclipse-scythe 66, alex 50.
- Bosses killed 3, elites killed 10, boss chests 13, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 900, spent 30.
- Made: pressure-cooker at 02:21, ghee-glide at 04:05, eclipse-scythe at 04:15.

### L1.I7.G2: fresh s808 old goal prompt

- Start: a fresh game on Nightmare 1 with steam-vent, seed 808; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.2s (game clock 05:00), health 96/120; damage taken 152 (enemy:ketchup-drop 24.7, boss:the-masher 17.4, enemy:tomato-leech 17.2, boss:beetle-queen 16.3); 1315 kills; level 1 to 14; planner asked 99 times, action model 832, in lockstep; ended with steam-vent 1, potato-battery 2, peel-phantom 5, grab-bag 2, peel-out 2, sprouting-eyes 1, root-network 2.
- Damage taken 152, by source: enemy:ketchup-drop 24.7, boss:the-masher 17.4, enemy:tomato-leech 17.2, boss:beetle-queen 16.3, enemy:garden-slug 13.6, enemy:snow-mold 8.9, enemy:bog-slime 8, enemy:aphid 7.3.
- Damage dealt 50199, by weapon: grab-bag 23478.1, potato-battery 20860.1, steam-vent 5166.5, peel-phantom 514.3, grok-bot 180.2.
- Kills 1315, by weapon: grab-bag 584, potato-battery 583, steam-vent 119, peel-phantom 17, grok-bot 12.
- Bosses killed 1, elites killed 6, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 156, spent 0.
- Made: no evolution, union or evolved item.

### L1.I8.G3: s707 gym min5 chest-first

- Start: gym nm1-min5-s707 (Nightmare 1 at 05:00), seed 707; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 10:00), health 120/120; damage taken 80 (boss:fryer-king 37.5, Hot oil 10.2, Spore vent 9.8, boss:the-masher 7.4); 11773 kills; level 13 to 33; planner asked 137 times, action model 283, in lockstep; ended with steam-vent 8, baked-alaska 1, eclipse-scythe 1, potato-rain 8, root-spikes 6, seeker-sprouts 1, starch-plating 5, butter-socks 1, thick-skin 1, big-bowl 3, hot-sauce 3, hash-rush 2; saved as gym nm1-min10-s707-chest.
- Damage taken 80, by source: boss:fryer-king 37.5, Hot oil 10.2, Spore vent 9.8, boss:the-masher 7.4, boss:beetle-queen 7.2, enemy:blight-spore 4.8, enemy:sand-crab 3.1.
- Damage dealt 815364, by weapon: baked-alaska 693031.2, eclipse-scythe 73380.4, permafrost-fries 12075.3, potato-rain 9108.7, hot-potato 8080.2, steam-vent 5948.1, comet-scythe 4816.3, seeker-sprouts 3668.1.
- Kills 11773, by weapon: baked-alaska 9915, eclipse-scythe 1022, permafrost-fries 233, hot-potato 207, comet-scythe 128, potato-rain 98, frozen-fries 55, seeker-sprouts 40.
- Bosses killed 6, elites killed 8, boss chests 18, crates bought 3, shrines used 0, items bought 0, revives used 0; gold earned 2510, spent 232.
- Made: eclipse-scythe at 05:15, permafrost-fries at 05:15, spicy-hot-potato at 05:40, baked-alaska at 05:42.

### L1.I8.G4: s808 chest gym min5 continue

- Start: gym nm1-min5-s808-chest (Nightmare 1 at 05:00), seed ?; 300s; plays the playbook.
- Outcome: not played: checkpoint failed: checkpoint gym-nm1-min5-s808-chest was saved on game build sim-wTU8O3Z8.js; this page runs sim-DA4RGMxM.js.

### L1.I9.G1: s909 steam gym 5:00 continue

- Start: gym nm1-min5-s909-steam (Nightmare 1 at 05:00), seed 909; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 10:00), health 132/132; damage taken 0; 15775 kills; level 19 to 36; planner asked 119 times, action model 49, in lockstep; ended with golden-harvest 1, permafrost-fries 1, fry-fortress 1, tater-mines 8, grease-fire 1, starch-chain 8, slow-cooker 5, root-network 5, golden-fry 5, thick-skin 5, gravy-splash 5, butter-pat 5.
- Damage taken 0, by source: none.
- Damage dealt 1327206, by weapon: grease-fire 636878.9, fry-fortress 439752.2, permafrost-fries 144934.5, tater-mines 41453.8, starch-chain 22670.6, golden-harvest 13280.4, pressure-cooker 9442.8, wildfire-roast 6967.7.
- Kills 15775, by weapon: grease-fire 7042, fry-fortress 5825, permafrost-fries 1739, tater-mines 445, pressure-cooker 184, starch-chain 180, golden-harvest 167, hot-streak 90.
- Bosses killed 3, elites killed 16, boss chests 19, crates bought 2, shrines used 0, items bought 0, revives used 0; gold earned 3043, spent 102.
- Made: permafrost-fries at 05:11, wildfire-roast at 05:55, grease-fire at 06:02.

### L1.I9.G2: fresh s1111 steam-vent playbook

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1111; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 62 (enemy:snow-mold 15.3, enemy:potato-beetle 11.2, enemy:compost-maggot 8.2, enemy:sprout-mite 6.8); 2673 kills; level 1 to 16; planner asked 115 times, action model 379, in lockstep; ended with harvest-moon 2, grease-fire 1, reset-button 4, masher-grip 3, packed-pan 1, gravy-splash 1, root-network 1, thick-skin 1, hash-rush 1.
- Damage taken 62, by source: enemy:snow-mold 15.3, enemy:potato-beetle 11.2, enemy:compost-maggot 8.2, enemy:sprout-mite 6.8, Spore vent 5.9, Brambles 5.1, enemy:aphid 4, boss:amusing 3.3.
- Damage dealt 109904, by weapon: grease-fire 80580, pressure-cooker 8556.6, hot-streak 7863.6, steam-vent 4259.8, harvest-moon 3593.1, reset-button 3546.5, grok-bot 1488.1, gravy-splash 15.8.
- Kills 2673, by weapon: grease-fire 1768, hot-streak 279, pressure-cooker 180, harvest-moon 168, steam-vent 144, grok-bot 79, reset-button 55.
- Bosses killed 3, elites killed 10, boss chests 11, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 648, spent 0.
- Made: pressure-cooker at 02:47, wildfire-roast at 03:40, grease-fire at 03:40.

### L1.I9.G4: fresh s1010 steam-vent playbook

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1010; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 77 (enemy:potato-beetle 14.9, enemy:sprout-mite 12.8, enemy:crumb-ant 11, enemy:aphid 10.4); 2778 kills; level 1 to 17; planner asked 111 times, action model 406, in lockstep; ended with steam-vent 1, gravy-flood 1, mash-wave 6, spud-lob 1, comet-scythe 2, butter-pat 2, big-bowl 3, root-network 3, potato-magnet 1.
- Damage taken 77, by source: enemy:potato-beetle 14.9, enemy:sprout-mite 12.8, enemy:crumb-ant 11, enemy:aphid 10.4, enemy:oil-drip 7.9, enemy:fry-fly 4.9, enemy:ketchup-drop 3.6, Hot oil 2.8.
- Damage dealt 88172, by weapon: gravy-flood 41111.5, mash-wave 21329.4, gravy-boat 14381.9, spud-lob 6567.7, steam-vent 2197.7, coal-baked-spud 1137.1, grok-bot 827.6, comet-scythe 619.4.
- Kills 2778, by weapon: gravy-flood 1126, mash-wave 773, gravy-boat 559, spud-lob 179, steam-vent 90, coal-baked-spud 29, grok-bot 18, comet-scythe 4.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 4, shrines used 0, items bought 0, revives used 0; gold earned 485, spent 359.
- Made: gravy-flood at 03:16.
