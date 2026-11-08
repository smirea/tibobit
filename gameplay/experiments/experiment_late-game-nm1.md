# Can the lockstep steam-vent playbook survive past 5 minutes on Nightmare 1

| Field | Value |
| --- | --- |
| Status | running |
| Area | meta |
| Result | - |
| Coach | sonnet-high |
| Created | sonnet-high L1.I4 |
| Updated | sonnet-high L1.I6 |

## Hypothesis

The lockstep steam-vent playbook that survives 300s can also survive another 300s from a strong build at 6:00 and at 10:00 on Nightmare 1, where pests are at full health. Boss ranges 300 help against the repeated bosses later in the run.

## Method

From own NM1 gyms at 6:00 and 10:00 (steam-vent 8, tater-twirl 4, root-network 2, gravy-heart 3, big-bowl 2), play 300s with the default playbook and with boss ranges 300. Add fresh NM1 seed 606 pair, baseline and ranges 300, saving the 5:00 state as a gym. Compare survival, damage by source and bosses killed.

## Findings

L1.I6 adds a baseline repeat on nm1-min5-fresh and the first natural 10:00 gym (nm1-min10-natural) to see whether the default playbook survives the natural mid-game.

## Games

### L1.I4.G1: fresh NM1 steam-vent lockstep seed 303

- Start: a fresh game on Nightmare 1 with steam-vent, seed 303; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 05:00), health 87/138; damage taken 170 (boss:the-masher 42.5, enemy:potato-beetle 19.7, boss:amusing 16.6, enemy:beetle-brood 14.6); 2042 kills; level 1 to 17; planner asked 104 times, action model 800, in lockstep; ended with steam-vent 1, mash-landing 6, comet-scythe 2, frozen-fries 1, hash-boomerang 2, mash-snowball 2, hot-start 3, big-bowl 2.
- Damage taken 170, by source: boss:the-masher 42.5, enemy:potato-beetle 19.7, boss:amusing 16.6, enemy:beetle-brood 14.6, enemy:bowling-ball 11.9, enemy:garden-slug 10.4, enemy:sprout-mite 9.6, boss:beetle-queen 9.1.
- Damage dealt 73949, by weapon: mash-snowball 33862.1, comet-scythe 18211.9, hash-boomerang 11063.1, steam-vent 5308, frozen-fries 3908.5, grok-bot 1389.7, mash-landing 205.8.
- Kills 2042, by weapon: mash-snowball 911, comet-scythe 479, hash-boomerang 250, steam-vent 200, frozen-fries 112, grok-bot 80, mash-landing 10.
- Bosses killed 2, elites killed 4, boss chests 1, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 248, spent 30.
- Made: no evolution, union or evolved item.

### L1.I4.G2: minute 6 default

- Start: gym nm1-minute-6-steam (Nightmare 1 at 06:00), seed 9FSGX5; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 11:00), health 192/192; damage taken 12 (Spore vent 9.9, boss:fryer-king 1, Brambles 0.9); 7816 kills; level 20 to 33; planner asked 97 times, action model 103, in lockstep; ended with pressure-cooker 1, tater-twister 1, root-spikes 1, hash-brown-shield 8, sprout-squad 7, hot-streak 8, root-network 5, gravy-heart 5, big-bowl 5, aged-russet 5, mash-finisher 3, salt-shaker 1.
- Damage taken 12, by source: Spore vent 9.9, boss:fryer-king 1, Brambles 0.9.
- Damage dealt 948346, by weapon: hot-streak 524192.8, pressure-cooker 381960.5, sprout-squad 24192.4, tater-twister 13074.8, grok-bot 4023.1, hash-brown-shield 621.4, root-spikes 281.3.
- Kills 7816, by weapon: hot-streak 4511, pressure-cooker 3189, grok-bot 53, sprout-squad 45, tater-twister 15, hash-brown-shield 3.
- Bosses killed 4, elites killed 4, boss chests 4, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1870, spent 0.
- Made: no evolution, union or evolved item.

### L1.I4.G3: minute 6 boss ranges 300

- Start: gym nm1-minute-6-steam (Nightmare 1 at 06:00), seed 9FSGX5; 300s; plays the playbook with distrustBossRange 300, bossOfferRange 300.
- Outcome: alive after 300.1s (game clock 11:00), health 192/192; damage taken 14 (Brambles 13.8); 7582 kills; level 20 to 33; planner asked 100 times, action model 153, in lockstep; ended with pressure-cooker 1, tater-twister 1, root-spikes 4, hash-brown-shield 8, sprout-squad 1, hot-streak 8, root-network 5, gravy-heart 5, big-bowl 5, aged-russet 5, mash-finisher 2, salt-shaker 1.
- Damage taken 14, by source: Brambles 13.8.
- Damage dealt 897526, by weapon: hot-streak 490468.7, pressure-cooker 381906.6, sprout-squad 13999.1, tater-twister 9729.4, hash-brown-shield 1099.1, root-spikes 278.7, grok-bot 44.7.
- Kills 7582, by weapon: hot-streak 4347, pressure-cooker 3190, sprout-squad 28, tater-twister 16, grok-bot 1.
- Bosses killed 4, elites killed 4, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1676, spent 0.
- Made: no evolution, union or evolved item.

### L1.I4.G4: minute 10 default

- Start: gym nm1-minute-10-steam (Nightmare 1 at 10:00), seed 1Q2PYDK; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 15:00), health 192/192; damage taken 98 (boss:deep-freezer 53.5, Hot oil 39, Brambles 5.1); 31767 kills; level 31 to 53; planner asked 109 times, action model 88, in lockstep; ended with pressure-cooker 1, potato-rain 8, starch-chain 8, ghee-glide 1, hash-carousel 1, hot-streak 8, root-network 5, gravy-heart 5, big-bowl 5, salt-shaker 5, sour-cream 5, spud-sneakers 5.
- Damage taken 98, by source: boss:deep-freezer 53.5, Hot oil 39, Brambles 5.1.
- Damage dealt 6660541, by weapon: pressure-cooker 2384844.1, hash-carousel 1941394.5, hashnado 876129.4, hot-streak 545652.5, starch-chain 281145.8, potato-rain 249303.6, ghee-glide 196830.6, tater-twister 177835.5.
- Kills 31767, by weapon: pressure-cooker 13319, hash-carousel 7506, hashnado 4593, hot-streak 2460, tater-twister 1200, ghee-glide 1195, potato-rain 954, starch-chain 531.
- Bosses killed 3, elites killed 6, boss chests 11, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 4554, spent 115.
- Made: [object Object], [object Object].

### L1.I4.G5: minute 10 boss ranges 300

- Start: gym nm1-minute-10-steam (Nightmare 1 at 10:00), seed 1Q2PYDK; 300s; plays the playbook with distrustBossRange 300, bossOfferRange 300.
- Outcome: alive after 300s (game clock 15:00), health 192/192; damage taken 45 (Hot oil 32.8, Spore vent 6.4, Brambles 6.1); 32717 kills; level 31 to 54; planner asked 109 times, action model 144, in lockstep; ended with pressure-cooker 1, potato-rain 8, starch-chain 8, ghee-glide 1, hash-carousel 1, mashquake 1, root-network 5, gravy-heart 5, big-bowl 5, salt-shaker 5, sour-cream 5, spud-sneakers 5.
- Damage taken 45, by source: Hot oil 32.8, Spore vent 6.4, Brambles 6.1.
- Damage dealt 6924572, by weapon: mashquake 2640789.2, hash-carousel 2469692.7, pressure-cooker 1273085.5, starch-chain 253223.5, mash-wave 103456.8, potato-rain 80365.4, ghee-glide 53556.6, grok-bot 24109.7.
- Kills 32717, by weapon: hash-carousel 11778, mashquake 9509, pressure-cooker 8573, starch-chain 1340, potato-rain 581, ghee-glide 359, mash-wave 316, grok-bot 190.
- Bosses killed 3, elites killed 8, boss chests 13, crates bought 2, shrines used 0, items bought 0, revives used 0; gold earned 5319, spent 274.
- Made: [object Object], [object Object], [object Object].

### L1.I6.G1: min10 gym baseline

- Start: gym nm1-min10-mine (Nightmare 1 at 10:00), seed 1V0N7HF; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 15:00), health 219/221; damage taken 79 (Hot oil 66.2, enemy:blight-spore 5.5, Spore vent 4.6, Brambles 2.9); 104961 kills; level 38 to 73; planner asked 101 times, action model 103, in lockstep; ended with tater-twirl 8, permafrost-fries 1, grease-fire 1, julienne-dash 8, reset-button 8, spud-grid 1, root-network 5, gravy-heart 5, big-bowl 5, hot-start 5, thick-skin 5, starch-plating 5.
- Damage taken 79, by source: Hot oil 66.2, enemy:blight-spore 5.5, Spore vent 4.6, Brambles 2.9.
- Damage dealt 22300783, by weapon: grease-fire 21494060.7, storm-tot 467159.1, permafrost-fries 248786.9, spud-grid 34733.1, tater-twirl 22336.5, static-tot 21952.8, reset-button 5627.7, julienne-dash 5542.5.
- Kills 104961, by weapon: grease-fire 101502, storm-tot 1911, permafrost-fries 1171, spud-grid 122, tater-twirl 111, static-tot 54, reset-button 53, julienne-dash 36.
- Bosses killed 4, elites killed 6, boss chests 6, crates bought 4, shrines used 5, items bought 0, revives used 0; gold earned 12189, spent 376.
- Made: [object Object], [object Object].

### L1.I6.G2: min10 gym boss ranges 300

- Start: gym nm1-min10-mine (Nightmare 1 at 10:00), seed 1V0N7HF; 300s; plays the playbook with distrustBossRange 300, bossOfferRange 300.
- Outcome: alive after 300.2s (game clock 15:00), health 220/220; damage taken 58 (Hot oil 36.8, boss:deep-freezer 20.9); 91863 kills; level 38 to 70; planner asked 99 times, action model 121, in lockstep; ended with tater-twirl 8, permafrost-fries 1, grease-fire 1, julienne-dash 8, reset-button 8, spud-grid 1, root-network 5, gravy-heart 5, big-bowl 5, hot-start 5, thick-skin 5, starch-plating 5.
- Damage taken 58, by source: Hot oil 36.8, boss:deep-freezer 20.9.
- Damage dealt 18651986, by weapon: grease-fire 18055151.2, permafrost-fries 269749.5, lightning-spud 168967.4, reset-button 72096.1, spud-grid 39554.7, tater-twirl 36521.2, julienne-dash 7672.4, potato-battery 2274.
- Kills 91863, by weapon: grease-fire 89616, permafrost-fries 1098, lightning-spud 563, tater-twirl 215, reset-button 172, spud-grid 151, julienne-dash 45, potato-battery 3.
- Bosses killed 3, elites killed 8, boss chests 8, crates bought 3, shrines used 6, items bought 0, revives used 0; gold earned 11148, spent 217.
- Made: [object Object].

### L1.I6.G3: min6 gym baseline

- Start: gym nm1-min6-mine (Nightmare 1 at 06:00), seed BIRPGY; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 11:00), health 192/192; damage taken 11 (Hot oil 10.5); 10340 kills; level 20 to 35; planner asked 106 times, action model 97, in lockstep; ended with pressure-cooker 1, tater-twister 1, hot-streak 8, comet-scythe 8, mashquake 1, hash-brown-shield 4, root-network 2, gravy-heart 5, big-bowl 5, butter-pat 5, salt-shaker 1, hot-start 2.
- Damage taken 11, by source: Hot oil 10.5.
- Damage dealt 1191941, by weapon: mashquake 451453.7, pressure-cooker 301313.6, hot-streak 286913, mash-wave 145827.2, tater-twister 5970.7, grok-bot 349.6, comet-scythe 112.8.
- Kills 10340, by weapon: mashquake 3216, hot-streak 3035, pressure-cooker 2951, mash-wave 1124, tater-twister 11, grok-bot 3.
- Bosses killed 4, elites killed 4, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1212, spent 0.
- Made: [object Object].

### L1.I6.G4: fresh NM1 seed606 baseline

- Start: a fresh game on Nightmare 1 with steam-vent, seed 606; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 05:00), health 120/120; damage taken 36 (boss:the-masher 22.4, enemy:sand-crab 5.2, enemy:compost-maggot 3.1, boss:beetle-queen 2.7); 2304 kills; level 1 to 18; planner asked 111 times, action model 749, in lockstep; ended with steam-vent 1, tater-twister 1, seed-potato 4, julienne-dash 1, seeker-sprouts 1, peel-phantom 2, gpu 3, butter-pat 2, salt-shaker 1, chives 2; saved as gym nm1-min5-fresh.
- Damage taken 36, by source: boss:the-masher 22.4, enemy:sand-crab 5.2, enemy:compost-maggot 3.1, boss:beetle-queen 2.7, enemy:aphid 1.7, enemy:sprout-mite 1.1.
- Damage dealt 93342, by weapon: tater-twirl 43432.1, tater-twister 19292.9, seed-potato 15140.5, julienne-dash 8808, seeker-sprouts 6057, steam-vent 545.3, grok-bot 66.4.
- Kills 2304, by weapon: tater-twirl 1187, tater-twister 447, seed-potato 376, julienne-dash 213, seeker-sprouts 66, steam-vent 9, grok-bot 6.
- Bosses killed 3, elites killed 4, boss chests 6, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 471, spent 0.
- Made: [object Object].

### L1.I6.G5: fresh NM1 seed606 boss ranges 300

- Start: a fresh game on Nightmare 1 with steam-vent, seed 606; 300s; plays the playbook with distrustBossRange 300, bossOfferRange 300.
- Outcome: alive after 300s (game clock 05:00), health 85/120; damage taken 185 (enemy:fry-fly 60.8, enemy:tomato-leech 22.4, boss:the-masher 22.4, boss:amusing 15.5); 772 kills; level 1 to 12; planner asked 100 times, action model 821, in lockstep; ended with steam-vent 5, mash-landing 1, sprout-satellites 1, fry-sentry 1, gpu 2, root-network 2, hot-start 1.
- Damage taken 185, by source: enemy:fry-fly 60.8, enemy:tomato-leech 22.4, boss:the-masher 22.4, boss:amusing 15.5, enemy:bog-slime 12.8, enemy:bowling-ball 11.6, enemy:beetle-brood 10.3, enemy:aphid 5.6.
- Damage dealt 28784, by weapon: steam-vent 14313.3, sprout-satellites 9477.7, fry-sentry 3607.5, grok-bot 1385.7.
- Kills 772, by weapon: steam-vent 440, sprout-satellites 219, grok-bot 67, fry-sentry 46.
- Bosses killed 1, elites killed 4, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 153, spent 0.
- Made: no evolution, union or evolved item.

### L1.I7.G4: min5 fresh gym baseline

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 10:00), health 149/149; damage taken 55 (enemy:ice-imp 29.5, enemy:blight-spore 25); 14255 kills; level 20 to 33; planner asked 95 times, action model 612, in lockstep; ended with pressure-cooker 1, whisk-vortex 1, railfry 1, tater-twirl 4, mandoline-fury 1, frozen-fries 1, root-network 2, gravy-heart 2, spud-sneakers 2, butter-pat 4, hot-start 1, thick-skin 1; saved as gym nm1-min10-natural.
- Damage taken 55, by source: enemy:ice-imp 29.5, enemy:blight-spore 25.
- Damage dealt 746219, by weapon: pressure-cooker 315214.2, mandoline-fury 255767, whisk-vortex 72750.6, fry-lance 62638.4, railfry 29132.7, frozen-fries 7668.2, tater-twirl 1869.2, grok-bot 1178.9.
- Kills 14255, by weapon: pressure-cooker 6732, mandoline-fury 5198, fry-lance 1027, whisk-vortex 920, railfry 269, frozen-fries 55, tater-twirl 36, grok-bot 18.
- Bosses killed 3, elites killed 6, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1608, spent 0.
- Made: railfry at 09:39.

### L1.I5.G1: natural 5:00 baseline

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook.
- Outcome: died after 198.2s (game clock 08:18); damage taken 325 (boss:fryer-king 77.5, boss:late-blight 68.9, enemy:bog-toad 52.5, boss:sir-strawman 33.7); 3682 kills; level 17 to 24; planner asked 65 times, action model 540, in lockstep; ended with steam-vent 3, whisk-vortex 7, spud-lob 1, hot-potato 1, mash-wave 1, peel-phantom 2, big-bowl 5, hot-start 4, aged-russet 1, chives 1.
- Damage taken 325, by source: boss:fryer-king 77.5, boss:late-blight 68.9, enemy:bog-toad 52.5, boss:sir-strawman 33.7, enemy:sizzle-imp 24.4, enemy:blight-spore 17, enemy:hay-bale 14.4, enemy:sand-crab 13.4; the killing blow: boss:fryer-king.
- Damage dealt 182572, by weapon: whisk-vortex 88345.5, mash-wave 53747.7, hot-potato 16361.1, spud-lob 12961, steam-vent 8527.3, dog:greyhound 2210.5, peel-phantom 312, grok-bot 106.9.
- Kills 3682, by weapon: whisk-vortex 1715, mash-wave 1095, hot-potato 369, spud-lob 246, steam-vent 201, dog:greyhound 46, grok-bot 6, peel-phantom 4.
- Bosses killed 3, elites killed 4, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 569, spent 0.
- Made: no evolution, union or evolved item.

### L1.I8.G5: min10 natural continue

- Start: gym nm1-min10-natural (Nightmare 1 at 10:00), seed 606; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 15:00), health 192/192; damage taken 181 (enemy:ice-imp 72.9, boss:deep-freezer 53.5, enemy:blight-spore 28.7, boss:the-mandoline 18.7); 21874 kills; level 33 to 51; planner asked 105 times, action model 663, in lockstep; ended with pressure-cooker 1, whisk-vortex 1, railfry 1, tater-twirl 8, mandoline-fury 1, permafrost-fries 1, root-network 5, gravy-heart 5, spud-sneakers 3, butter-pat 5, hot-start 5, thick-skin 1; saved as gym nm1-min15-natural.
- Damage taken 181, by source: enemy:ice-imp 72.9, boss:deep-freezer 53.5, enemy:blight-spore 28.7, boss:the-mandoline 18.7, Brambles 7.6.
- Damage dealt 4253374, by weapon: pressure-cooker 1547601.6, mandoline-fury 1114411.7, railfry 1085479.1, permafrost-fries 228491.3, whisk-vortex 162596.4, tater-twirl 75860.7, frozen-fries 38933.1.
- Kills 21874, by weapon: pressure-cooker 8910, mandoline-fury 6032, railfry 4976, permafrost-fries 893, whisk-vortex 548, tater-twirl 477, frozen-fries 38.
- Bosses killed 3, elites killed 4, boss chests 4, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2694, spent 0.
- Made: permafrost-fries at 14:02.

### L1.I6.G1: min5 natural baseline repeat

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook.
- Outcome: died after 147.2s (game clock 07:27); damage taken 238 (boss:late-blight 67.9, boss:sir-strawman 58.1, enemy:sizzle-imp 23.7, enemy:sand-crab 21.1); 2570 kills; level 17 to 20; planner asked 45 times, action model 401, in lockstep; ended with steam-vent 3, whisk-vortex 4, spud-lob 1, hot-potato 1, mash-wave 2, peel-phantom 2, big-bowl 5, hot-start 2, aged-russet 1.
- Damage taken 238, by source: boss:late-blight 67.9, boss:sir-strawman 58.1, enemy:sizzle-imp 23.7, enemy:sand-crab 21.1, enemy:crumb-ant 17.3, enemy:fry-fly 15.9, enemy:hay-bale 14.4, enemy:potato-beetle 6.3; the killing blow: boss:sir-strawman.
- Damage dealt 114015, by weapon: whisk-vortex 49867.9, mash-wave 36997, hot-potato 10830.8, spud-lob 7515.1, steam-vent 7297.8, dog:greyhound 1382.5, peel-phantom 124.3.
- Kills 2570, by weapon: whisk-vortex 1138, mash-wave 812, hot-potato 272, steam-vent 156, spud-lob 149, dog:greyhound 38, peel-phantom 5.
- Bosses killed 1, elites killed 3, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 240, spent 0.
- Made: no evolution, union or evolved item.

### L1.I6.G4: min10 natural baseline

- Start: gym nm1-min10-natural (Nightmare 1 at 10:00), seed 606; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 15:00), health 192/192; damage taken 157 (enemy:ice-imp 126.3, boss:the-mandoline 18.7, enemy:blight-spore 12.2); 17515 kills; level 33 to 47; planner asked 98 times, action model 575, in lockstep; ended with pressure-cooker 1, whisk-vortex 6, railfry 1, tater-twirl 8, mandoline-fury 1, permafrost-fries 1, root-network 4, gravy-heart 5, spud-sneakers 2, butter-pat 5, hot-start 1, thick-skin 1.
- Damage taken 157, by source: enemy:ice-imp 126.3, boss:the-mandoline 18.7, enemy:blight-spore 12.2.
- Damage dealt 3006960, by weapon: railfry 867874.2, pressure-cooker 823037, mandoline-fury 688401.3, permafrost-fries 404626.4, whisk-vortex 180749.9, frozen-fries 30778.6, tater-twirl 9763.6, grok-bot 1729.4.
- Kills 17515, by weapon: pressure-cooker 6161, mandoline-fury 4760, railfry 4444, permafrost-fries 1461, whisk-vortex 548, frozen-fries 69, tater-twirl 60, grok-bot 12.
- Bosses killed 3, elites killed 4, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2489, spent 0.
- Made: permafrost-fries at 13:09.

### L1.I7.G3: min15 chest-first

- Start: gym nm1-min15-natural (Nightmare 1 at 15:00), seed 606; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 20:00), health 259/259; damage taken 254 (boss:compost-titan 98.8, enemy:blight-spore 70.6, enemy:ice-imp 57.4, Hot oil 14); 28497 kills; level 51 to 66; planner asked 99 times, action model 543, in lockstep; ended with pressure-cooker 1, whisk-vortex 8, railfry 1, tater-twirl 8, mandoline-fury 1, permafrost-fries 1, root-network 5, gravy-heart 5, spud-sneakers 5, butter-pat 5, hot-start 5, thick-skin 5.
- Damage taken 254, by source: boss:compost-titan 98.8, enemy:blight-spore 70.6, enemy:ice-imp 57.4, Hot oil 14, Brambles 13.4.
- Damage dealt 18923016, by weapon: railfry 5461566.2, pressure-cooker 4076944.3, mandoline-fury 3689065.4, whisk-vortex 2527023.9, permafrost-fries 2200162.1, tater-twirl 552566.6, lightning-spud 409567, grok-bot 6120.4.
- Kills 28497, by weapon: pressure-cooker 7384, mandoline-fury 6920, railfry 6113, whisk-vortex 3176, permafrost-fries 3146, tater-twirl 1286, lightning-spud 460, grok-bot 12.
- Bosses killed 3, elites killed 12, boss chests 26, crates bought 12, shrines used 0, items bought 0, revives used 0; gold earned 7435, spent 4515.
- Made: no evolution, union or evolved item.

### L1.I7.G4: min15 old goal prompt

- Start: gym nm1-min15-natural (Nightmare 1 at 15:00), seed 606; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 20:00), health 192/192; damage taken 270 (enemy:grease-fiend 75, boss:compost-titan 69.4, enemy:ice-imp 59.6, Brambles 39); 33998 kills; level 51 to 67; planner asked 100 times, action model 826, in lockstep; ended with pressure-cooker 1, whisk-vortex 8, railfry 1, tater-twirl 8, mandoline-fury 1, permafrost-fries 1, root-network 5, gravy-heart 5, spud-sneakers 5, butter-pat 5, hot-start 5, thick-skin 5.
- Damage taken 270, by source: enemy:grease-fiend 75, boss:compost-titan 69.4, enemy:ice-imp 59.6, Brambles 39, enemy:blight-spore 18.4, Hot oil 8, Spore vent 0.9.
- Damage dealt 18805394, by weapon: pressure-cooker 5211290.9, railfry 4838539.6, mandoline-fury 4228390.8, whisk-vortex 2032882.9, permafrost-fries 1846648.1, tater-twirl 602518.8, grok-bot 45123.1.
- Kills 33998, by weapon: pressure-cooker 11661, mandoline-fury 9533, railfry 5216, permafrost-fries 3129, whisk-vortex 2550, tater-twirl 1818, grok-bot 91.
- Bosses killed 2, elites killed 6, boss chests 2, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 4559, spent 30.
- Made: no evolution, union or evolved item.

### L1.I9.G3: s707 min10 chest gym continue

- Start: gym nm1-min10-s707-chest (Nightmare 1 at 10:00), seed 707; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 15:00), health 120/120; damage taken 19 (enemy:ice-imp 8.3, enemy:blight-spore 7.6, Brambles 2.9); 21932 kills; level 33 to 47; planner asked 122 times, action model 485, in lockstep; ended with steam-vent 8, baked-alaska 1, eclipse-scythe 1, potato-rain 8, root-spikes 8, seeker-sprouts 8, starch-plating 5, butter-socks 5, thick-skin 5, big-bowl 5, hot-sauce 5, hash-rush 5.
- Damage taken 19, by source: enemy:ice-imp 8.3, enemy:blight-spore 7.6, Brambles 2.9.
- Damage dealt 4608832, by weapon: baked-alaska 2663563.8, eclipse-scythe 1191396.3, magma-croquette 233304.1, potato-rain 227689.4, steam-vent 93761.8, seeker-sprouts 73664.6, spicy-croquette 72946.2, root-spikes 35072.7.
- Kills 21932, by weapon: baked-alaska 12139, eclipse-scythe 6896, potato-rain 978, magma-croquette 714, steam-vent 337, spicy-croquette 303, seeker-sprouts 271, root-spikes 194.
- Bosses killed 5, elites killed 6, boss chests 11, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 3684, spent 159.
- Made: magma-croquette at 14:27.

### L1.I9.G5: min5 gym chest-first boss ranges 250

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook with distrustBossRange 250, bossOfferRange 250.
- Outcome: died after 74s (game clock 06:14); damage taken 196 (boss:late-blight 103.3, enemy:bog-toad 52.6, enemy:sizzle-imp 20.7, enemy:hay-bale 14.4); 1128 kills; level 17 to 19; planner asked 23 times, action model 201, in lockstep; ended with steam-vent 3, whisk-vortex 5, spud-lob 1, hot-potato 1, mash-wave 1, peel-phantom 2, big-bowl 3, hot-start 2, aged-russet 1, hash-rush 1.
- Damage taken 196, by source: boss:late-blight 103.3, enemy:bog-toad 52.6, enemy:sizzle-imp 20.7, enemy:hay-bale 14.4, enemy:fry-fly 4.8; the killing blow: boss:late-blight.
- Damage dealt 53581, by weapon: whisk-vortex 23351.7, mash-wave 15841, hot-potato 5344.4, spud-lob 4265.7, steam-vent 3360.2, dog:greyhound 1053.1, peel-phantom 364.5.
- Kills 1128, by weapon: whisk-vortex 444, mash-wave 342, hot-potato 147, steam-vent 83, spud-lob 82, dog:greyhound 28, peel-phantom 2.
- Bosses killed 1, elites killed 3, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 110, spent 0.
- Made: no evolution, union or evolved item.
