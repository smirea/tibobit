# Do held items close the gap between the full gym and the lo-full gym at 16:40-20:00 on Nightmare 1

| Field | Value |
| --- | --- |
| Status | running |
| Area | items |
| Result | - |
| Coach | sonnet-high |
| Created | sonnet-high L2.I4 |
| Updated | sonnet-high L2.I7 |

## Hypothesis

The damage-passive build on the full gym dies at 18:32 while the same passives with 8-12 items pass 20:00. Giving the full gym the lo-surv swap items (boom-spud, pickle-jar, hot-pepper, salt-crystal, starch-sock, lucky-peel) makes it pass 20:00, and adding defensive items (baked-buckler, ghost-skin, thorny-jacket, spud-muffin, vampire-tot) lowers damage taken further. If so, the late planner should buy crates and Fry Cart items and take armor and hp items when offered.

## Method

From nm1-min16-full, 240s (to 20:40), loadout of the full gym build plus items A twice, and plus items A and defensive items B twice, baseline playbook. Compare alive at 20:00, damage by source before 20:00 and minimum hp with the full baselines (18:32 and sonnet-medium's repeats). Then one game with 8000 gold and a gold-spend sentence (see late-gold-spend-nm1).

## Findings

L2.I4: the nine-item defensive set B passed 20:00 in 2 of 2 games, while damage items A died at 18:06-18:14. L2.I7 splits set B on top of items A into armor and dodge (2 Baked Buckler, 2 Ghost Skin) and max hp and sustain (2 Spud Muffin, 2 Vampire Tot, Thorny Jacket), two games each, to find which half carries the effect. If one half passes 20:00 in 2 of 2, the late pick and shop rules should favour those items.

## Games

### L2.I4.G1: full gym plus damage items A

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1; 240s; plays the playbook.
- Outcome: died after 94.2s (game clock 18:14); damage taken 433 (boss:ketchup-kraken 321.3, enemy:ice-imp 57.8, boss:compost-titan 34.7, Hot oil 14); 11619 kills; level 57 to 62; planner asked 27 times, action model 213, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 433, by source: boss:ketchup-kraken 321.3, enemy:ice-imp 57.8, boss:compost-titan 34.7, Hot oil 14, Brambles 5.3; the killing blow: boss:ketchup-kraken.
- Damage dealt 7016706, by weapon: mash-avalanche 1815491.7, mandoline-fury 1324382.1, gratin-arc 1193567.7, pressure-cooker 1106114.3, tater-minigun 1084698.4, boom-spud 413695.8, harvest-moon 44691.8, grok-bot 32969.4.
- Kills 11619, by weapon: mash-avalanche 2987, mandoline-fury 2374, pressure-cooker 2228, gratin-arc 1927, tater-minigun 1682, boom-spud 297, grok-bot 76, harvest-moon 47.
- Bosses killed 1, elites killed 2, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2091, spent 0.
- Made: no evolution, union or evolved item.

### L2.I4.G2: full gym plus damage items A repeat

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1; 240s; plays the playbook.
- Outcome: died after 86.5s (game clock 18:06); damage taken 528 (boss:compost-titan 347.2, boss:ketchup-kraken 107.1, enemy:ice-imp 60, Hot oil 8.8); 8970 kills; level 57 to 61; planner asked 26 times, action model 195, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 528, by source: boss:compost-titan 347.2, boss:ketchup-kraken 107.1, enemy:ice-imp 60, Hot oil 8.8, Brambles 5.3; the killing blow: boss:compost-titan.
- Damage dealt 5731276, by weapon: mash-avalanche 1339230.4, mandoline-fury 1163913.9, gratin-arc 1114024.8, tater-minigun 932224, pressure-cooker 843366.3, boom-spud 303251.3, harvest-moon 30051.1, grok-bot 4723.3.
- Kills 8970, by weapon: mash-avalanche 2193, mandoline-fury 1891, gratin-arc 1697, pressure-cooker 1576, tater-minigun 1287, boom-spud 293, harvest-moon 27, grok-bot 6.
- Bosses killed 0, elites killed 2, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1618, spent 0.
- Made: no evolution, union or evolved item.

### L2.I4.G3: full gym plus defensive items B

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1, baked-buckler x2, ghost-skin x2, thorny-jacket x1, spud-muffin x2, vampire-tot x2; 240s; plays the playbook.
- Outcome: alive after 240s (game clock 20:40), health 259/259; damage taken 288 (enemy:ice-imp 141.2, boss:harvester 81.3, boss:compost-titan 31.3, Hot oil 17.1); 20438 kills; level 57 to 67; planner asked 67 times, action model 312, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 288, by source: enemy:ice-imp 141.2, boss:harvester 81.3, boss:compost-titan 31.3, Hot oil 17.1, Spore vent 13.5, Brambles 3.7.
- Damage dealt 19956700, by weapon: mandoline-fury 4067296.1, pressure-cooker 3713435.1, mash-avalanche 3703286, gratin-arc 3625790.5, tater-minigun 3206945.3, freezer-burn 827446.9, boom-spud 694928.5, harvest-moon 100509.6.
- Kills 20438, by weapon: pressure-cooker 4258, mandoline-fury 4233, mash-avalanche 4103, gratin-arc 3661, tater-minigun 3103, freezer-burn 546, boom-spud 414, harvest-moon 94.
- Bosses killed 3, elites killed 6, boss chests 11, crates bought 4, shrines used 0, items bought 0, revives used 0; gold earned 4627, spent 376.
- Made: no evolution, union or evolved item.

### L2.I4.G4: full gym plus defensive items B repeat

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1, baked-buckler x2, ghost-skin x2, thorny-jacket x1, spud-muffin x2, vampire-tot x2; 240s; plays the playbook.
- Outcome: alive after 240s (game clock 20:40), health 259/259; damage taken 569 (enemy:ice-imp 250.3, Hot oil 114.6, boss:ketchup-kraken 96.9, boss:compost-titan 62.7); 25083 kills; level 57 to 69; planner asked 60 times, action model 490, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 569, by source: enemy:ice-imp 250.3, Hot oil 114.6, boss:ketchup-kraken 96.9, boss:compost-titan 62.7, boss:harvester 40.6, Brambles 3.5.
- Damage dealt 23147161, by weapon: mash-avalanche 6890870.8, mandoline-fury 4442284.3, pressure-cooker 3948707.4, gratin-arc 3539149.4, tater-minigun 3078980.7, boom-spud 1034325, harvest-moon 130227.6, moon-dust 72330.
- Kills 25083, by weapon: mash-avalanche 7301, mandoline-fury 4938, pressure-cooker 4756, gratin-arc 3955, tater-minigun 3365, boom-spud 607, harvest-moon 123, grok-bot 17.
- Bosses killed 2, elites killed 4, boss chests 7, crates bought 3, shrines used 0, items bought 0, revives used 0; gold earned 5631, spent 217.
- Made: no evolution, union or evolved item.

### L2.I9.G1: full gym + items A + armor

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1, baked-buckler x2; 240s; plays the playbook.
- Outcome: alive after 240.1s (game clock 20:40), health 192/192; damage taken 222 (boss:compost-titan 125.3, boss:harvester 40.6, boss:ketchup-kraken 39.9, Hot oil 15.4); 26909 kills; level 57 to 67; planner asked 64 times, action model 580, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 222, by source: boss:compost-titan 125.3, boss:harvester 40.6, boss:ketchup-kraken 39.9, Hot oil 15.4, Brambles 1.2.
- Damage dealt 21993804, by weapon: mash-avalanche 6848939.2, mandoline-fury 3970929.7, pressure-cooker 3559392.1, gratin-arc 3487697.8, tater-minigun 3017895.5, boom-spud 974569.7, harvest-moon 127346.1, grok-bot 4032.4.
- Kills 26909, by weapon: mash-avalanche 8323, pressure-cooker 5114, mandoline-fury 5104, gratin-arc 4126, tater-minigun 3538, boom-spud 590, harvest-moon 106, grok-bot 6.
- Bosses killed 2, elites killed 4, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 4848, spent 0.
- Made: no evolution, union or evolved item.

### L2.I9.G2: full gym + items A + dodge

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1, ghost-skin x2; 240s; plays the playbook.
- Outcome: alive after 240.3s (game clock 20:40), health 191/192; damage taken 82 (boss:harvester 44.7, enemy:ice-imp 32, Spore vent 5.2); 26223 kills; level 57 to 67; planner asked 59 times, action model 553, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 82, by source: boss:harvester 44.7, enemy:ice-imp 32, Spore vent 5.2.
- Damage dealt 22528059, by weapon: mash-avalanche 6553326.6, pressure-cooker 4192083.5, mandoline-fury 3951405.2, gratin-arc 3557365.6, tater-minigun 3220292.9, boom-spud 926042.5, harvest-moon 121971.7, dog:dalmatian 3118.7.
- Kills 26223, by weapon: mash-avalanche 7625, pressure-cooker 5718, mandoline-fury 4555, gratin-arc 4127, tater-minigun 3561, boom-spud 530, harvest-moon 94, grok-bot 9.
- Bosses killed 2, elites killed 4, boss chests 4, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 4135, spent 0.
- Made: no evolution, union or evolved item.

### L2.I9.G3: full gym + items A + max hp

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1, spud-muffin x2; 240s; plays the playbook.
- Outcome: died after 216.3s (game clock 20:16); damage taken 978 (boss:ketchup-kraken 428.4, boss:compost-titan 243, boss:harvester 207.4, enemy:grease-fiend 66.1); 26394 kills; level 57 to 67; planner asked 59 times, action model 528, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 978, by source: boss:ketchup-kraken 428.4, boss:compost-titan 243, boss:harvester 207.4, enemy:grease-fiend 66.1, enemy:ice-imp 31.6, Hot oil 1.4; the killing blow: boss:harvester.
- Damage dealt 18584873, by weapon: mash-avalanche 5249445.5, mandoline-fury 3515550, pressure-cooker 3109832.8, gratin-arc 2956563.6, tater-minigun 2617035.6, boom-spud 952366.5, harvest-moon 127037.2, grok-bot 54547.7.
- Kills 26394, by weapon: mash-avalanche 7562, pressure-cooker 5128, mandoline-fury 5097, gratin-arc 4131, tater-minigun 3718, boom-spud 589, harvest-moon 104, grok-bot 64.
- Bosses killed 1, elites killed 4, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 4553, spent 0.
- Made: no evolution, union or evolved item.

### L2.I9.G4: full gym + items A + thorns and kill-heal

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1, thorny-jacket x1, vampire-tot x2; 240s; plays the playbook.
- Outcome: alive after 240s (game clock 20:40), health 192/192; damage taken 768 (boss:ketchup-kraken 642.6, enemy:ice-imp 90.4, boss:compost-titan 34.7); 22923 kills; level 57 to 67; planner asked 67 times, action model 609, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 768, by source: boss:ketchup-kraken 642.6, enemy:ice-imp 90.4, boss:compost-titan 34.7.
- Damage dealt 21363198, by weapon: mash-avalanche 6609103.8, gratin-arc 3632375.4, mandoline-fury 3611353.7, pressure-cooker 3442677.1, tater-minigun 3121296.6, boom-spud 843498.4, harvest-moon 100551.3, dog:dalmatian 2341.4.
- Kills 22923, by weapon: mash-avalanche 6745, mandoline-fury 4207, pressure-cooker 4132, gratin-arc 3813, tater-minigun 3333, boom-spud 589, harvest-moon 99, dog:dalmatian 5.
- Bosses killed 1, elites killed 4, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 3877, spent 0.
- Made: no evolution, union or evolved item.

### L2.I9.G5: full gym + full defensive set B repeat

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1, baked-buckler x2, ghost-skin x2, thorny-jacket x1, spud-muffin x2, vampire-tot x2; 240s; plays the playbook.
- Outcome: alive after 240.2s (game clock 20:40), health 196/230; damage taken 468 (boss:harvester 248, boss:ketchup-kraken 136.8, enemy:ice-imp 49.5, boss:compost-titan 31.3); 27392 kills; level 57 to 68; planner asked 63 times, action model 607, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 468, by source: boss:harvester 248, boss:ketchup-kraken 136.8, enemy:ice-imp 49.5, boss:compost-titan 31.3, Spore vent 2.1.
- Damage dealt 22876983, by weapon: mash-avalanche 7083770.3, pressure-cooker 4066637.2, mandoline-fury 4063077.1, gratin-arc 3394101.2, tater-minigun 3124307.8, boom-spud 1004068.5, harvest-moon 130148, grok-bot 6517.4.
- Kills 27392, by weapon: mash-avalanche 8336, pressure-cooker 5501, mandoline-fury 5155, gratin-arc 4064, tater-minigun 3563, boom-spud 639, harvest-moon 121, grok-bot 12.
- Bosses killed 2, elites killed 6, boss chests 6, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 4780, spent 0.
- Made: no evolution, union or evolved item.

### L2.I7.G1: full gym items A plus armor and dodge, A

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1, baked-buckler x2, ghost-skin x2; 240s; plays the playbook.
- Outcome: alive after 240s (game clock 20:40), health 192/192; damage taken 555 (boss:ketchup-kraken 290.7, enemy:ice-imp 110, enemy:grease-fiend 69.9, boss:compost-titan 62.7); 25059 kills; level 57 to 68; planner asked 73 times, action model 340, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 555, by source: boss:ketchup-kraken 290.7, enemy:ice-imp 110, enemy:grease-fiend 69.9, boss:compost-titan 62.7, Hot oil 14.7, Brambles 6.9.
- Damage dealt 21688658, by weapon: mash-avalanche 4719367.2, mandoline-fury 4695744.2, pressure-cooker 4242760.9, gratin-arc 3702512.3, tater-minigun 3253801.4, boom-spud 897645, harvest-moon 139419, grok-bot 34090.1.
- Kills 25059, by weapon: mash-avalanche 5724, pressure-cooker 5401, mandoline-fury 5212, gratin-arc 4246, tater-minigun 3690, boom-spud 567, harvest-moon 133, grok-bot 83.
- Bosses killed 3, elites killed 6, boss chests 11, crates bought 3, shrines used 0, items bought 0, revives used 0; gold earned 5377, spent 217.
- Made: no evolution, union or evolved item.

### L2.I7.G2: full gym items A plus armor and dodge, B

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1, baked-buckler x2, ghost-skin x2; 240s; plays the playbook.
- Outcome: died after 93.4s (game clock 18:13); damage taken 264 (enemy:ice-imp 165.5, boss:ketchup-kraken 96.9, Brambles 1.7); 9570 kills; level 57 to 61; planner asked 27 times, action model 134, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 264, by source: enemy:ice-imp 165.5, boss:ketchup-kraken 96.9, Brambles 1.7; the killing blow: enemy:ice-imp.
- Damage dealt 6350389, by weapon: mandoline-fury 1309393.5, gratin-arc 1208361, mash-avalanche 1202909.7, pressure-cooker 1173541.5, tater-minigun 1100791.5, boom-spud 306544.7, harvest-moon 38153.7, porcupine-spud 9957.5.
- Kills 9570, by weapon: pressure-cooker 1985, mandoline-fury 1939, mash-avalanche 1877, gratin-arc 1811, tater-minigun 1629, boom-spud 276, harvest-moon 37, porcupine-spud 16.
- Bosses killed 1, elites killed 4, boss chests 6, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 2512, spent 30.
- Made: no evolution, union or evolved item.

### L2.I7.G3: full gym items A plus max hp and sustain, A

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1, spud-muffin x2, vampire-tot x2, thorny-jacket x1; 240s; plays the playbook.
- Outcome: alive after 240.1s (game clock 20:40), health 230/230; damage taken 1230 (boss:ketchup-kraken 524.8, enemy:grease-fiend 286.5, enemy:ice-imp 228.6, boss:compost-titan 104.2); 25336 kills; level 57 to 69; planner asked 73 times, action model 449, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 1230, by source: boss:ketchup-kraken 524.8, enemy:grease-fiend 286.5, enemy:ice-imp 228.6, boss:compost-titan 104.2, Hot oil 50.2, enemy:blight-spore 20.1, Spore vent 16.
- Damage dealt 22161260, by weapon: mash-avalanche 5234834.3, mandoline-fury 3956529.1, pressure-cooker 3565990.7, gratin-arc 3401462.6, tater-minigun 3220942.9, static-tot 1133399.1, boom-spud 856309.2, storm-tot 604311.1.
- Kills 25336, by weapon: mash-avalanche 6061, pressure-cooker 4930, mandoline-fury 4928, gratin-arc 3944, tater-minigun 3763, static-tot 786, boom-spud 492, storm-tot 226.
- Bosses killed 3, elites killed 4, boss chests 9, crates bought 5, shrines used 0, items bought 0, revives used 0; gold earned 5638, spent 581.
- Made: storm-tot at 20:37.

### L2.I7.G4: full gym items A plus max hp and sustain, B

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1, spud-muffin x2, vampire-tot x2, thorny-jacket x1; 240s; plays the playbook.
- Outcome: died after 238.3s (game clock 20:38); damage taken 571 (boss:harvester 268.1, enemy:grease-fiend 137.4, boss:compost-titan 69.4, enemy:ice-imp 60.7); 22015 kills; level 57 to 69; planner asked 60 times, action model 391, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 571, by source: boss:harvester 268.1, enemy:grease-fiend 137.4, boss:compost-titan 69.4, enemy:ice-imp 60.7, Hot oil 26.2, Brambles 9.4; the killing blow: boss:harvester.
- Damage dealt 19916659, by weapon: mash-avalanche 4366687.6, mandoline-fury 3988112.7, pressure-cooker 3895821.2, gratin-arc 3605000.2, tater-minigun 3186035.4, boom-spud 761531.9, harvest-moon 106861.5, grok-bot 3477.1.
- Kills 22015, by weapon: mash-avalanche 5240, pressure-cooker 4687, mandoline-fury 4320, gratin-arc 3830, tater-minigun 3316, boom-spud 490, harvest-moon 124, grok-bot 6.
- Bosses killed 2, elites killed 4, boss chests 7, crates bought 6, shrines used 0, items bought 0, revives used 0; gold earned 4931, spent 838.
- Made: no evolution, union or evolved item.
