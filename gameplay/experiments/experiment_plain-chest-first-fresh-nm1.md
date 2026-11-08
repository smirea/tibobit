# Does plain chest-first without an evade exception keep chests flowing on fresh Nightmare 1 seeds

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | models |
| Result | - |
| Created | sonnet-medium L3.I2 |
| Updated | reset at the restart (L4) |

## Hypothesis

Chest-first with evade only under 25% health yields more boss chests and an earlier evolution than the narrow boss-within-200 exception on seeds 1313 and 1414, without dying in 0-5 minutes.

## Method

Fresh NM1 steam-vent, seeds 1313, 1414, 1515, 300s, plus the natural 5:00 gym nm1-min5-fresh-d; compare chests, evolutions, evade goals, damage and survival with L3.I1.

## Findings

L3.I9 plays the unchanged playbook on seeds 2323-2727 to estimate the early death rate before the full run.

Reset at the restart: still running from an earlier loop and measured with lockstep on, so its games need replaying live before they count.

## Games

### L3.I2.G1: plain chest-first seed 1313

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1313; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 05:00), health 120/120; damage taken 140 (boss:amusing 32.2, enemy:cave-grub 26.5, enemy:crumb-ant 13.5, enemy:parking-gull 13.2); 2168 kills; level 1 to 17; planner asked 106 times, action model 459, in lockstep; ended with pressure-cooker 1, butter-socks 5, gravy-splash 3, butter-pat 5, packed-pan 3, root-network 5.
- Damage taken 140, by source: boss:amusing 32.2, enemy:cave-grub 26.5, enemy:crumb-ant 13.5, enemy:parking-gull 13.2, enemy:compost-maggot 12.7, Brambles 12.5, enemy:dumpster-raccoon 7.6, enemy:sprout-mite 6.
- Damage dealt 80826, by weapon: pressure-cooker 68833.3, steam-vent 10979, gravy-splash 898.5, grok-bot 115.3.
- Kills 2168, by weapon: pressure-cooker 1609, steam-vent 517, gravy-splash 36, grok-bot 6.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 579, spent 0.
- Made: pressure-cooker at 02:50.

### L3.I2.G2: plain chest-first seed 1414

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1414; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 05:00), health 120/120; damage taken 112 (boss:amusing 26.6, enemy:fry-fly 19.2, enemy:parking-gull 15.2, enemy:bog-slime 13.8); 2518 kills; level 1 to 18; planner asked 104 times, action model 437, in lockstep; ended with pressure-cooker 1, hot-streak 3, thick-skin 5, root-network 5, starch-plating 1, sprouting-eyes 1.
- Damage taken 112, by source: boss:amusing 26.6, enemy:fry-fly 19.2, enemy:parking-gull 15.2, enemy:bog-slime 13.8, enemy:aphid 9.4, enemy:oil-drip 8.5, enemy:ketchup-drop 6.8, enemy:crumb-ant 4.4.
- Damage dealt 76467, by weapon: pressure-cooker 55163.4, steam-vent 14452.5, hot-streak 6673.4, grok-bot 177.9.
- Kills 2518, by weapon: pressure-cooker 1569, steam-vent 750, hot-streak 193, grok-bot 6.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 527, spent 0.
- Made: pressure-cooker at 02:54.

### L3.I2.G3: plain chest-first seed 1515

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1515; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.3s (game clock 05:00), health 120/120; damage taken 94 (enemy:snow-mold 38.5, enemy:frost-flea 16.5, enemy:cave-grub 16.1, enemy:compost-maggot 8.5); 3896 kills; level 1 to 20; planner asked 112 times, action model 545, in lockstep; ended with pressure-cooker 1, taproot-eruption 1, potato-battery 4, big-bowl 4, peel-out 2, masher-grip 2, root-network 2, butter-pat 1.
- Damage taken 94, by source: enemy:snow-mold 38.5, enemy:frost-flea 16.5, enemy:cave-grub 16.1, enemy:compost-maggot 8.5, Spore vent 4.3, enemy:aphid 3.7, enemy:potato-beetle 2.6, enemy:sprout-mite 2.4.
- Damage dealt 123797, by weapon: taproot-eruption 52767.7, pressure-cooker 46342.2, steam-vent 19967.5, root-spikes 2991.4, potato-battery 1714.4, grok-bot 14.2.
- Kills 3896, by weapon: taproot-eruption 1739, pressure-cooker 1279, steam-vent 697, root-spikes 116, potato-battery 63, grok-bot 2.
- Bosses killed 3, elites killed 8, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 640, spent 0.
- Made: taproot-eruption at 01:23, pressure-cooker at 03:41.

### L3.I2.G5: plain chest-first from natural 5:00 gym d

- Start: gym nm1-min5-fresh-d (Nightmare 1 at 05:00), seed 1KOOT67; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 61.4s (game clock 06:01); damage taken 211 (enemy:field-rat 90, enemy:garden-slug 41, boss:the-masher 22.4, boss:beetle-queen 10.9); 428 kills; level 15 to 16; planner asked 15 times, action model 176, in lockstep; ended with steam-vent 5, hash-brown-shield 2, big-bowl 4, stuffed-skin 4, gravy-splash 1, root-network 2.
- Damage taken 211, by source: enemy:field-rat 90, enemy:garden-slug 41, boss:the-masher 22.4, boss:beetle-queen 10.9, enemy:bog-slime 6.5, enemy:beetle-brood 6, enemy:tomato-leech 5.3, enemy:wireworm-larva 5.3; the killing blow: enemy:garden-slug.
- Damage dealt 20863, by weapon: hash-brown-shield 11439.6, steam-vent 9026.1, gravy-splash 397.7.
- Kills 428, by weapon: hash-brown-shield 297, steam-vent 129, gravy-splash 2.
- Bosses killed 0, elites killed 1, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 8, spent 0.
- Made: no evolution, union or evolved item.

### L3.I3.G1: plain chest-first seed 1616

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1616; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 115 (Hot oil 27.9, enemy:garden-slug 24.4, enemy:bog-slime 20, enemy:fry-fly 7); 2535 kills; level 1 to 17; planner asked 105 times, action model 621, in lockstep; ended with pressure-cooker 1, tater-minigun 1, butter-socks 1, masher-grip 4, root-network 2, mash-finisher 1; saved as gym nm1-min5-fresh-e.
- Damage taken 115, by source: Hot oil 27.9, enemy:garden-slug 24.4, enemy:bog-slime 20, enemy:fry-fly 7, boss:amusing 6.7, enemy:crumb-ant 6.6, enemy:oil-drip 6.2, enemy:sprout-mite 5.8.
- Damage dealt 93614, by weapon: tater-minigun 33313, steam-vent 23458.1, pressure-cooker 22252.8, locked-gatling 9094.5, alex 3824.6, grok-bot 1671.4.
- Kills 2535, by weapon: tater-minigun 866, pressure-cooker 548, steam-vent 507, locked-gatling 416, alex 114, grok-bot 84.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 569, spent 0.
- Made: tater-minigun at 02:41, pressure-cooker at 04:15.

### L3.I3.G2: plain chest-first seed 1717

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1717; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 178/178; damage taken 163 (enemy:potato-beetle 33.4, boss:amusing 22.8, enemy:sprout-mite 16.5, boss:the-masher 15.1); 1754 kills; level 1 to 16; planner asked 101 times, action model 704, in lockstep; ended with pressure-cooker 1, hot-streak 1, mash-finisher 4, starch-plating 5, root-network 5, gravy-heart 4, thick-skin 1.
- Damage taken 163, by source: enemy:potato-beetle 33.4, boss:amusing 22.8, enemy:sprout-mite 16.5, boss:the-masher 15.1, enemy:bog-slime 13.4, enemy:ketchup-drop 10.2, enemy:aphid 9.4, enemy:garden-slug 8.4.
- Damage dealt 63951, by weapon: pressure-cooker 31355.7, steam-vent 28172.4, grok-bot 2211.6, hot-streak 2211.4.
- Kills 1754, by weapon: steam-vent 888, pressure-cooker 728, hot-streak 70, grok-bot 68.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1015, spent 0.
- Made: pressure-cooker at 04:14.

### L3.I3.G4: plain chest-first gym d repeat

- Start: gym nm1-min5-fresh-d (Nightmare 1 at 05:00), seed 1KOOT67; 300s; plays the playbook.
- Outcome: died after 75.2s (game clock 06:15); damage taken 180 (boss:the-masher 51.5, boss:late-blight 35.6, enemy:hay-bale 14.4, enemy:bog-toad 13.8); 739 kills; level 15 to 17; planner asked 23 times, action model 215, in lockstep; ended with steam-vent 6, hash-brown-shield 2, big-bowl 4, stuffed-skin 4, gravy-splash 1, root-network 2.
- Damage taken 180, by source: boss:the-masher 51.5, boss:late-blight 35.6, enemy:hay-bale 14.4, enemy:bog-toad 13.8, enemy:wireworm-larva 11.2, enemy:garden-slug 11.1, boss:beetle-queen 10.9, enemy:tomato-leech 10.6; the killing blow: boss:the-masher.
- Damage dealt 37212, by weapon: hash-brown-shield 20501.5, steam-vent 15646.7, grok-bot 705.9, gravy-splash 357.4.
- Kills 739, by weapon: hash-brown-shield 528, steam-vent 202, gravy-splash 5, grok-bot 4.
- Bosses killed 0, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 40, spent 0.
- Made: no evolution, union or evolved item.

### L3.I4.G1: plain fresh seed 1818

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1818; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 05:00), health 149/149; damage taken 139 (enemy:potato-beetle 19.2, boss:beetle-queen 17.2, enemy:crumb-ant 16.6, Hot oil 16.3); 2817 kills; level 1 to 18; planner asked 105 times, action model 701, in lockstep; ended with pressure-cooker 1, mash-avalanche 1, potato-battery 3, root-network 4, masher-grip 2, gravy-heart 2.
- Damage taken 139, by source: enemy:potato-beetle 19.2, boss:beetle-queen 17.2, enemy:crumb-ant 16.6, Hot oil 16.3, enemy:aphid 12.8, boss:the-masher 11.2, enemy:sprout-mite 11.1, enemy:fry-fly 10.
- Damage dealt 87463, by weapon: mash-avalanche 32622.5, mash-snowball 18884.3, steam-vent 15297.1, pressure-cooker 14945.8, potato-battery 4890.5, grok-bot 822.6.
- Kills 2817, by weapon: mash-avalanche 898, mash-snowball 866, pressure-cooker 439, steam-vent 382, potato-battery 189, grok-bot 43.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 627, spent 0.
- Made: mash-avalanche at 03:25, pressure-cooker at 04:16.

### L3.I4.G2: plain fresh seed 1919

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1919; 300s; plays the playbook.
- Outcome: died after 292.8s (game clock 04:52); damage taken 226 (enemy:potato-beetle 39.3, boss:beetle-queen 35.6, boss:the-masher 22.4, enemy:sprout-mite 19); 430 kills; level 1 to 10; planner asked 96 times, action model 772, in lockstep; ended with steam-vent 4, mash-landing 1, gravy-heart 4, gravy-splash 1.
- Damage taken 226, by source: enemy:potato-beetle 39.3, boss:beetle-queen 35.6, boss:the-masher 22.4, enemy:sprout-mite 19, boss:amusing 18.8, enemy:beetle-brood 16.1, enemy:aphid 8.7, enemy:garden-slug 7.9; the killing blow: boss:the-masher.
- Damage dealt 14075, by weapon: steam-vent 13760.3, grok-bot 213.4, mash-landing 101.7.
- Kills 430, by weapon: steam-vent 422, grok-bot 4, mash-landing 4.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 39, spent 0.
- Made: no evolution, union or evolved item.

### L3.I4.G3: plain gym e 5:00-10:00

- Start: gym nm1-min5-fresh-e (Nightmare 1 at 05:00), seed 1616; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 10:00), health 120/120; damage taken 27 (enemy:blight-spore 17.9, boss:late-blight 9.3); 13649 kills; level 17 to 30; planner asked 98 times, action model 327, in lockstep; ended with tater-minigun 1, grease-fire 1, butter-socks 4, masher-grip 5, root-network 5, mash-finisher 2, thick-skin 2, hot-sauce 1.
- Damage taken 27, by source: enemy:blight-spore 17.9, boss:late-blight 9.3.
- Damage dealt 918538, by weapon: storm-tot 440440.3, grease-fire 209290, pressure-cooker 121833.4, tater-minigun 85591.7, hot-streak 33781, static-tot 14949, grok-bot 6377.6, alex 6274.5.
- Kills 13649, by weapon: storm-tot 5601, pressure-cooker 3098, grease-fire 2059, tater-minigun 1736, hot-streak 642, static-tot 347, alex 84, grok-bot 82.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 1, revives used 0; gold earned 1332, spent 183.
- Made: wildfire-roast at 09:09, grease-fire at 09:11, storm-tot at 06:20.

### L3.I5.G1: plain fresh seed 2020

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2020; 300s; plays the playbook.
- Outcome: died after 285.9s (game clock 04:45); damage taken 154 (enemy:frost-flea 53, enemy:snow-mold 23.4, boss:amusing 14.4, boss:the-masher 11.2); 681 kills; level 1 to 12; planner asked 98 times, action model 744, in lockstep; ended with steam-vent 4, masher-grip 5, hot-sauce 1, thick-skin 1, gravy-heart 1.
- Damage taken 154, by source: enemy:frost-flea 53, enemy:snow-mold 23.4, boss:amusing 14.4, boss:the-masher 11.2, enemy:compost-maggot 11, enemy:dumpster-raccoon 10.9, enemy:aphid 10, enemy:parking-gull 7.7; the killing blow: boss:the-masher.
- Damage dealt 17837, by weapon: steam-vent 17183.5, grok-bot 653.5.
- Kills 681, by weapon: steam-vent 639, grok-bot 42.
- Bosses killed 0, elites killed 1, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 64, spent 0.
- Made: no evolution, union or evolved item.

### L3.I5.G2: plain fresh seed 2121

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2121; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 05:00), health 33/120; damage taken 213 (enemy:fry-fly 52.2, boss:amusing 34.4, boss:the-masher 33.6, enemy:beetle-brood 23.8); 805 kills; level 1 to 13; planner asked 93 times, action model 813, in lockstep; ended with steam-vent 6, potato-magnet 2, root-network 2, gravy-splash 1, peel-out 2.
- Damage taken 213, by source: enemy:fry-fly 52.2, boss:amusing 34.4, boss:the-masher 33.6, enemy:beetle-brood 23.8, enemy:tomato-leech 23.3, enemy:frost-flea 9.8, enemy:cave-grub 9.2, enemy:snow-mold 8.6.
- Damage dealt 27995, by weapon: steam-vent 26915.4, gravy-splash 1047.6, grok-bot 32.4.
- Kills 805, by weapon: steam-vent 791, gravy-splash 8, grok-bot 6.
- Bosses killed 0, elites killed 10, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 146, spent 0.
- Made: no evolution, union or evolved item.

### L3.I5.G3: plain fresh seed 2222

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2222; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 05:00), health 139/139; damage taken 62 (enemy:sand-crab 28.1, enemy:tomato-leech 9.5, boss:amusing 6.7, enemy:ketchup-drop 4.1); 3343 kills; level 1 to 20; planner asked 108 times, action model 291, in lockstep; ended with pressure-cooker 1, big-fry 1, fertilizer 4, root-network 5, aged-russet 1, packed-pan 1, stuffed-skin 2, starch-plating 2.
- Damage taken 62, by source: enemy:sand-crab 28.1, enemy:tomato-leech 9.5, boss:amusing 6.7, enemy:ketchup-drop 4.1, Hot oil 2.8, enemy:sprout-mite 2.5, enemy:potato-beetle 2.3, enemy:oil-drip 1.9.
- Damage dealt 116835, by weapon: big-fry 95558.8, pressure-cooker 11813.2, small-fry 4752.3, steam-vent 2953.2, grok-bot 1757.8.
- Kills 3343, by weapon: big-fry 2731, pressure-cooker 280, small-fry 236, grok-bot 53, steam-vent 43.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 726, spent 0.
- Made: big-fry at 01:47, pressure-cooker at 03:15.

### L3.I9.G1: plain seed 2323

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2323; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 168/168; damage taken 89 (Hot oil 55.2, enemy:sprout-mite 11.6, enemy:fry-fly 9, enemy:sand-crab 4.6); 2581 kills; level 1 to 18; planner asked 107 times, action model 342, in lockstep; ended with pressure-cooker 1, hash-bulwark 1, frying-pan 2, stuffed-skin 5, root-network 5, starch-plating 2, hearty-helping 4, chives 1.
- Damage taken 89, by source: Hot oil 55.2, enemy:sprout-mite 11.6, enemy:fry-fly 9, enemy:sand-crab 4.6, enemy:oil-drip 3.6, enemy:aphid 2.3, enemy:crumb-ant 1.5, enemy:lint-bunny 1.3.
- Damage dealt 76654, by weapon: pressure-cooker 69323.2, hash-bulwark 2760.1, steam-vent 2351.5, grok-bot 1687.9, hash-brown-shield 531.2.
- Kills 2581, by weapon: pressure-cooker 2430, steam-vent 78, grok-bot 49, hash-bulwark 22, hash-brown-shield 2.
- Bosses killed 3, elites killed 6, boss chests 11, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 842, spent 0.
- Made: pressure-cooker at 01:46, hash-bulwark at 03:07.

### L3.I9.G2: plain seed 2424

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2424; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 101 (boss:amusing 29.9, enemy:sprout-mite 14.1, enemy:aphid 13.6, enemy:crumb-ant 12.2); 2549 kills; level 1 to 18; planner asked 109 times, action model 595, in lockstep; ended with pressure-cooker 1, tater-minigun 1, mash-snowball 3, hot-streak 1, lean-lunch 3, bacon-bits 2, masher-grip 1, root-network 1, thick-skin 2.
- Damage taken 101, by source: boss:amusing 29.9, enemy:sprout-mite 14.1, enemy:aphid 13.6, enemy:crumb-ant 12.2, Hot oil 10.2, enemy:ketchup-drop 9.1, enemy:tomato-leech 4.2, enemy:oil-drip 4.1.
- Damage dealt 82819, by weapon: pressure-cooker 27080.7, locked-gatling 14793.4, mash-snowball 12957.8, tater-minigun 12807, steam-vent 12763.3, hot-streak 2298.7, grok-bot 118.2.
- Kills 2549, by weapon: pressure-cooker 695, locked-gatling 689, steam-vent 401, mash-snowball 368, tater-minigun 334, hot-streak 56, grok-bot 6.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 1, revives used 0; gold earned 672, spent 169.
- Made: tater-minigun at 03:21, pressure-cooker at 03:41.

### L3.I9.G3: plain seed 2525

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2525; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 05:00), health 88/192; damage taken 243 (boss:amusing 45.5, enemy:sprout-mite 26.9, enemy:ketchup-drop 17.4, enemy:aphid 17); 2189 kills; level 1 to 17; planner asked 108 times, action model 645, in lockstep; ended with steam-vent 3, big-fry 1, hot-streak 6, fertilizer 4, gravy-heart 5, thick-skin 1.
- Damage taken 243, by source: boss:amusing 45.5, enemy:sprout-mite 26.9, enemy:ketchup-drop 17.4, enemy:aphid 17, enemy:cave-grub 16.6, enemy:garden-slug 16.2, enemy:compost-maggot 13.3, enemy:snow-mold 11.5.
- Damage dealt 83939, by weapon: hot-streak 35061.7, big-fry 20511.2, small-fry 15515.6, steam-vent 10656.8, alex 1839.6, grok-bot 353.9.
- Kills 2189, by weapon: hot-streak 870, small-fry 526, big-fry 475, steam-vent 268, alex 38, grok-bot 12.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 559, spent 0.
- Made: big-fry at 04:31.

### L3.I9.G4: plain seed 2626

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2626; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 74 (enemy:snow-mold 46.2, enemy:frost-flea 18.5, enemy:compost-maggot 3.9, enemy:aphid 2.3); 4070 kills; level 1 to 20; planner asked 106 times, action model 315, in lockstep; ended with pressure-cooker 1, hot-streak 7, root-cellar 1, potato-battery 1, salt-line 1, root-network 5, big-bowl 5, thick-skin 1, aged-russet 1, slow-cooker 1.
- Damage taken 74, by source: enemy:snow-mold 46.2, enemy:frost-flea 18.5, enemy:compost-maggot 3.9, enemy:aphid 2.3, enemy:ketchup-drop 1.5, enemy:sprout-mite 1.1.
- Damage dealt 129451, by weapon: pressure-cooker 76838.7, hot-streak 41272.3, steam-vent 8223.8, alex 1887.3, potato-battery 1214.5, root-cellar 14.7.
- Kills 4070, by weapon: pressure-cooker 2460, hot-streak 1172, steam-vent 351, alex 60, potato-battery 27.
- Bosses killed 3, elites killed 8, boss chests 10, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 628, spent 0.
- Made: pressure-cooker at 02:02.

### L3.I9.G5: plain seed 2727

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2727; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 173/177; damage taken 148 (boss:amusing 58.8, enemy:spittlebug 37.5, enemy:snow-mold 19.1, enemy:little-grey 8.5); 2690 kills; level 1 to 18; planner asked 109 times, action model 409, in lockstep; ended with pressure-cooker 1, mash-landing 8, hot-streak 3, stuffed-skin 4, thick-skin 3, root-network 5, gravy-heart 1, bacon-bits 1.
- Damage taken 148, by source: boss:amusing 58.8, enemy:spittlebug 37.5, enemy:snow-mold 19.1, enemy:little-grey 8.5, enemy:aphid 6.5, enemy:potato-beetle 4.6, enemy:frost-flea 3.7, enemy:cave-grub 2.7.
- Damage dealt 64443, by weapon: pressure-cooker 54054.2, steam-vent 4943.1, hot-streak 3665.8, grok-bot 1779.6.
- Kills 2690, by weapon: pressure-cooker 2210, steam-vent 252, hot-streak 140, grok-bot 88.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 917, spent 0.
- Made: pressure-cooker at 02:08.

### L4.I9.G4: fresh plain seed 3535

- Start: a fresh game on Nightmare 1 with steam-vent, seed 3535; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 05:00), health 66/120; damage taken 282 (boss:amusing 35.8, enemy:compost-maggot 27.6, boss:beetle-queen 22, enemy:sprout-mite 21.5); 1964 kills; level 1 to 15; planner asked 102 times, action model 781, in lockstep; ended with steam-vent 8, butter-streak 2, peeler 1, starch-plating 3, spud-sneakers 2, slow-cooker 1, root-network 3.
- Damage taken 282, by source: boss:amusing 35.8, enemy:compost-maggot 27.6, boss:beetle-queen 22, enemy:sprout-mite 21.5, enemy:aphid 20.2, enemy:cave-grub 19.6, enemy:potato-beetle 17.1, enemy:bog-slime 16.5.
- Damage dealt 70221, by weapon: steam-vent 38052, butter-streak 20261.2, alex 11820.9, grok-bot 87.
- Kills 1964, by weapon: steam-vent 1019, butter-streak 677, alex 262, grok-bot 6.
- Bosses killed 1, elites killed 4, boss chests 3, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 500, spent 30.
- Made: no evolution, union or evolved item.

### L4.I9.G5: fresh plain seed 3636

- Start: a fresh game on Nightmare 1 with steam-vent, seed 3636; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 05:00), health 192/192; damage taken 69 (boss:beetle-queen 18.4, enemy:sand-crab 10.1, enemy:snow-mold 7.8, enemy:fry-fly 5.2); 2441 kills; level 1 to 18; planner asked 102 times, action model 287, in lockstep; ended with pressure-cooker 1, hash-brown-shield 7, gravy-heart 5, butter-socks 2, hot-start 1, root-network 3, starch-plating 3.
- Damage taken 69, by source: boss:beetle-queen 18.4, enemy:sand-crab 10.1, enemy:snow-mold 7.8, enemy:fry-fly 5.2, enemy:potato-beetle 5, Hot oil 4.8, enemy:beetle-brood 3.4, enemy:aphid 3.
- Damage dealt 89136, by weapon: pressure-cooker 75014.8, hash-brown-shield 6382.6, alex 3806.4, steam-vent 3475.7, grok-bot 456.2.
- Kills 2441, by weapon: pressure-cooker 2023, hash-brown-shield 208, steam-vent 101, alex 97, grok-bot 12.
- Bosses killed 4, elites killed 8, boss chests 12, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 630, spent 0.
- Made: pressure-cooker at 01:56.
