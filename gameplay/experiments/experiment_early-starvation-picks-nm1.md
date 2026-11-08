# Do catalyst-committed picks and fewer early elite goals fix 0-chest starvation on fresh Nightmare 1 seeds

| Field | Value |
| --- | --- |
| Status | running |
| Area | models |
| Result | - |
| Coach | sonnet-medium |
| Created | sonnet-medium L4.I10 |
| Updated | sonnet-medium L5.I3 |

## Hypothesis

A pick prompt that always takes Steam Vent levels and Root Network first, plus a goal text that rates gems and exploring above elite fights before 3:00, gets a chest and an evolution by 3:00 on seeds that starved (1919, 2020, 2121, 1313).

## Method

Fresh NM1 steam-vent games of 300s on known starving seeds and 3 new seeds: plain vs picks only vs picks plus early-elite text. Compare chests, first evolution, elites killed, damage, survival.

## Findings

L5.I1-I2 (lockstep): picks only lived 8 of 8, and the early-elite text starved 2020 and was dropped. Lockstep is banned, so L5.I3 plays the shipped playbook live on 1919, 2020, 2121, 1313 and 4141.

## Games

### L5.I1.G1: picks only s1919

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1919; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.1s (game clock 05:00), health 114/120; damage taken 289 (boss:amusing 62.1, enemy:sand-crab 50.1, boss:the-masher 29.1, enemy:tomato-leech 26.4); 1294 kills; level 1 to 14; planner asked 101 times, action model 760, in lockstep; ended with pressure-cooker 1, peel-out 4, root-network 4, salt-shaker 5, hash-rush 5, butter-pat 5.
- Damage taken 289, by source: boss:amusing 62.1, enemy:sand-crab 50.1, boss:the-masher 29.1, enemy:tomato-leech 26.4, enemy:potato-beetle 20.3, enemy:sock-pile 14.2, enemy:bog-slime 14.1, enemy:lint-bunny 13.8.
- Damage dealt 51621, by weapon: steam-vent 29494.4, pressure-cooker 17343.5, grok-bot 4782.6.
- Kills 1294, by weapon: steam-vent 811, pressure-cooker 372, grok-bot 111.
- Bosses killed 3, elites killed 11, boss chests 10, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 713, spent 0.
- Made: pressure-cooker at 04:39.

### L5.I1.G2: picks only s2020

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2020; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 123 (enemy:potato-beetle 32.6, enemy:snow-mold 24.6, boss:the-masher 11.2, enemy:frost-flea 10.8); 2489 kills; level 1 to 18; planner asked 131 times, action model 507, in lockstep; ended with pressure-cooker 1, masher-grip 5, potato-magnet 5, aged-russet 5, root-network 5, slow-cooker 5, hearty-helping 5.
- Damage taken 123, by source: enemy:potato-beetle 32.6, enemy:snow-mold 24.6, boss:the-masher 11.2, enemy:frost-flea 10.8, enemy:sand-crab 10.5, enemy:aphid 5.7, boss:amusing 5.5, enemy:bog-slime 4.6.
- Damage dealt 99878, by weapon: pressure-cooker 75500.3, steam-vent 12785.5, alex 6168.4, grok-bot 5424.1.
- Kills 2489, by weapon: pressure-cooker 1738, steam-vent 471, grok-bot 167, alex 113.
- Bosses killed 3, elites killed 12, boss chests 15, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 930, spent 0.
- Made: pressure-cooker at 02:55.

### L5.I1.G3: picks only s2121

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2121; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300s (game clock 05:00), health 120/120; damage taken 55 (boss:beetle-queen 33.3, enemy:spittlebug 6.6, enemy:tomato-leech 3.8, enemy:little-grey 2.9); 2257 kills; level 1 to 17; planner asked 114 times, action model 337, in lockstep; ended with pressure-cooker 1, potato-magnet 5, slow-cooker 5, root-network 5, hash-rush 2, fertilizer 2.
- Damage taken 55, by source: boss:beetle-queen 33.3, enemy:spittlebug 6.6, enemy:tomato-leech 3.8, enemy:little-grey 2.9, enemy:aphid 2.3, enemy:oil-drip 2, enemy:ketchup-drop 1.6, enemy:bog-slime 1.5.
- Damage dealt 74075, by weapon: pressure-cooker 66302.5, steam-vent 5232.9, grok-bot 2539.9.
- Kills 2257, by weapon: pressure-cooker 1976, steam-vent 196, grok-bot 85.
- Bosses killed 4, elites killed 6, boss chests 10, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 711, spent 0.
- Made: pressure-cooker at 01:45.

### L5.I1.G4: picks plus early-elite text s1919

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1919; 300s; plays the playbook with its own planner.pick, its own planner.goal.
- Outcome: alive after 300.2s (game clock 05:00), health 120/120; damage taken 93 (boss:amusing 18.8, enemy:sand-crab 15, enemy:aphid 11.5, enemy:potato-beetle 6.1); 2512 kills; level 1 to 17; planner asked 110 times, action model 421, in lockstep; ended with pressure-cooker 1, mashquake 1, peel-out 3, root-network 5, big-bowl 4, four-eyed-spud 1, chives 1.
- Damage taken 93, by source: boss:amusing 18.8, enemy:sand-crab 15, enemy:aphid 11.5, enemy:potato-beetle 6.1, enemy:fry-fly 5.9, enemy:bowling-ball 5.2, enemy:bog-slime 4.9, enemy:sprout-mite 4.8.
- Damage dealt 104245, by weapon: mashquake 58960.8, pressure-cooker 15696.9, mash-wave 12797.6, steam-vent 11827.3, grok-bot 4962.4.
- Kills 2512, by weapon: mashquake 1209, mash-wave 491, steam-vent 379, pressure-cooker 332, grok-bot 101.
- Bosses killed 3, elites killed 10, boss chests 13, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 680, spent 0.
- Made: pressure-cooker at 03:14, mashquake at 03:24.

### L5.I1.G5: picks plus early-elite text s2020

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2020; 300s; plays the playbook with its own planner.pick, its own planner.goal.
- Outcome: alive after 300s (game clock 05:00), health 37/149; damage taken 176 (boss:beetle-queen 24.5, enemy:oil-drip 20.6, enemy:sprout-mite 20.2, enemy:crumb-ant 18.4); 634 kills; level 1 to 12; planner asked 100 times, action model 746, in lockstep; ended with steam-vent 5, masher-grip 2, potato-magnet 2, gravy-heart 2, root-network 1.
- Damage taken 176, by source: boss:beetle-queen 24.5, enemy:oil-drip 20.6, enemy:sprout-mite 20.2, enemy:crumb-ant 18.4, enemy:potato-beetle 17.1, boss:amusing 15.5, enemy:aphid 13.9, boss:the-masher 11.2.
- Damage dealt 19924, by weapon: steam-vent 14334.7, grok-bot 5589.6.
- Kills 634, by weapon: steam-vent 516, grok-bot 118.
- Bosses killed 0, elites killed 3, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 85, spent 0.
- Made: no evolution, union or evolved item.

### L5.I2.G1: picks only s2020 repeat

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2020; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 174 (enemy:aphid 58.1, enemy:potato-beetle 24.2, enemy:sprout-mite 23.7, enemy:bog-slime 19.4); 2424 kills; level 1 to 18; planner asked 108 times, action model 714, in lockstep; ended with steam-vent 8, gravy-flood 1, sour-cream 2, hot-sauce 3, golden-fry 1, potato-magnet 2, root-network 1, clean-plate 1.
- Damage taken 174, by source: enemy:aphid 58.1, enemy:potato-beetle 24.2, enemy:sprout-mite 23.7, enemy:bog-slime 19.4, enemy:garden-slug 15.8, enemy:ketchup-drop 14.7, enemy:tomato-leech 8.1, boss:beetle-queen 4.5.
- Damage dealt 91298, by weapon: gravy-boat 52777.3, gravy-flood 20132.8, steam-vent 16526.4, alex 1477.2, grok-bot 384.7.
- Kills 2424, by weapon: gravy-boat 1510, gravy-flood 458, steam-vent 398, alex 47, grok-bot 11.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 626, spent 0.
- Made: gravy-flood at 04:21.

### L5.I2.G2: picks only s1313

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1313; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.3s (game clock 05:00), health 120/120; damage taken 167 (enemy:cave-grub 44.1, enemy:potato-beetle 24.6, enemy:sprout-mite 21.7, enemy:compost-maggot 16.2); 2246 kills; level 1 to 18; planner asked 105 times, action model 585, in lockstep; ended with pressure-cooker 1, spud-dynamo 6, potato-battery 1, starch-plating 5, lean-lunch 1, root-network 2, big-bowl 1.
- Damage taken 167, by source: enemy:cave-grub 44.1, enemy:potato-beetle 24.6, enemy:sprout-mite 21.7, enemy:compost-maggot 16.2, enemy:aphid 11.4, boss:beetle-queen 11.3, Spore vent 8.1, enemy:wireworm-larva 5.7.
- Damage dealt 81498, by weapon: pressure-cooker 32083.9, steam-vent 27131.2, spud-dynamo 15170.4, potato-battery 7040, grok-bot 72.8.
- Kills 2246, by weapon: steam-vent 894, pressure-cooker 771, spud-dynamo 343, potato-battery 232, grok-bot 6.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 445, spent 0.
- Made: pressure-cooker at 03:55.

### L5.I2.G3: picks only s1818

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1818; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300s (game clock 05:00), health 120/120; damage taken 67 (enemy:cave-grub 29.7, boss:amusing 7.8, enemy:compost-maggot 7.7, enemy:sprout-mite 6.3); 2324 kills; level 1 to 18; planner asked 111 times, action model 321, in lockstep; ended with pressure-cooker 1, couch-potato 5, butter-pat 5, root-network 5, chives 5, hot-sauce 1.
- Damage taken 67, by source: enemy:cave-grub 29.7, boss:amusing 7.8, enemy:compost-maggot 7.7, enemy:sprout-mite 6.3, enemy:oil-drip 3.9, enemy:aphid 3.4, enemy:potato-beetle 2.3, Brambles 2.2.
- Damage dealt 83532, by weapon: pressure-cooker 72986, steam-vent 9593.1, grok-bot 952.8.
- Kills 2324, by weapon: pressure-cooker 1854, steam-vent 407, grok-bot 63.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 1, items bought 0, revives used 0; gold earned 680, spent 0.
- Made: pressure-cooker at 02:35.

### L5.I2.G4: picks only s3737

- Start: a fresh game on Nightmare 1 with steam-vent, seed 3737; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.2s (game clock 05:00), health 163/163; damage taken 148 (enemy:fry-fly 34.6, enemy:compost-maggot 22.9, enemy:potato-beetle 14.3, boss:beetle-queen 12.4); 3197 kills; level 1 to 19; planner asked 105 times, action model 562, in lockstep; ended with pressure-cooker 1, gravy-flood 1, potato-magnet 3, starch-plating 2, gravy-heart 3, root-network 4.
- Damage taken 148, by source: enemy:fry-fly 34.6, enemy:compost-maggot 22.9, enemy:potato-beetle 14.3, boss:beetle-queen 12.4, enemy:sprout-mite 11, enemy:aphid 10.3, enemy:cave-grub 10, enemy:oil-drip 9.5.
- Damage dealt 102820, by weapon: gravy-flood 50732.7, gravy-boat 28328, pressure-cooker 12109.9, steam-vent 10603.2, grok-bot 1046.4.
- Kills 3197, by weapon: gravy-flood 1430, gravy-boat 1143, pressure-cooker 350, steam-vent 217, grok-bot 57.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 646, spent 0.
- Made: gravy-flood at 03:29, pressure-cooker at 04:09.

### L5.I2.G5: picks only s3838

- Start: a fresh game on Nightmare 1 with steam-vent, seed 3838; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.3s (game clock 05:00), health 120/120; damage taken 98 (boss:the-masher 17.9, enemy:sprout-mite 15.9, enemy:cave-grub 13.4, enemy:aphid 11.8); 4361 kills; level 1 to 21; planner asked 110 times, action model 381, in lockstep; ended with pressure-cooker 1, hot-streak 7, potato-battery 1, root-network 5, slow-cooker 5, packed-pan 3, fertilizer 1, thick-skin 1.
- Damage taken 98, by source: boss:the-masher 17.9, enemy:sprout-mite 15.9, enemy:cave-grub 13.4, enemy:aphid 11.8, Spore vent 9.6, enemy:lint-bunny 6.8, enemy:sock-pile 6.3, enemy:potato-beetle 4.8.
- Damage dealt 134674, by weapon: pressure-cooker 101162.1, hot-streak 27086.8, steam-vent 6260.3, grok-bot 94.4, potato-battery 70.
- Kills 4361, by weapon: pressure-cooker 3175, hot-streak 850, steam-vent 330, grok-bot 6.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 763, spent 0.
- Made: pressure-cooker at 02:12.
