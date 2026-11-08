# Does a high max hp and dodge build (Gravy Heart 5, Stuffed Skin 5, Thick Skin 5) survive the NM2 15:00-20:00 bosses

| Field | Value |
| --- | --- |
| Status | running |
| Area | build |
| Result | - |
| Coach | sonnet-high |
| Created | sonnet-high L3.I6 |
| Updated | sonnet-high L3.I9 |

## Hypothesis

Raising max hp from 144 to about 250 and adding about 25% dodge, with the weapons and items unchanged, lets the bot survive three Kraken slams (about 321) and the 16:00 Golem charge, so it passes 20:00 more often than the roughly 50% of the unchanged baseline on nm2-min15-natural.

## Method

From nm2-min15-natural (4 baselines: 2 alive, 2 dead), 300s: three games with a swapped hp and dodge loadout (Gravy Heart, Stuffed Skin and Thick Skin at 5 in place of Gravy Splash, Sour Cream and Fertilizer) and two control loadouts with the original passives and the same gold, to check that a loadout swap alone does not change outcomes. Compare survival, Kraken, Golem and Titan damage, minimum hp and dashes. If the hp build passes 3 of 3, next design a pick prompt that takes these passives in the first minutes and test it on fresh NM2 seeds for 5:00 survival.

## Findings

L3.I8 natural-c: hp+armor+dodge 2 of 2 alive with 64 and 94 damage; unchanged control died 18:23. Across three maps hp builds live 6 of 7, unchanged about 4 of 10. The open question is whether natural play can reach such a build, which nm2-hp-picks-early tests.

## Games

### L3.I6.G1: hp+dodge build A

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3, build swapped for pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-heart 5, stuffed-skin 5, thick-skin 5, spud-spring x1, spud-muffin x2, lucky-peel x1, copper-spoon x1, salt-crystal x1, pickle-jar x1; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 20:00), health 336/336; damage taken 27 (boss:grater-golem 26.5); 30463 kills; level 54 to 67; planner asked 96 times, action model 64, in lockstep; ended with pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-heart 5, stuffed-skin 5, thick-skin 5.
- Damage taken 27, by source: boss:grater-golem 26.5.
- Damage dealt 22576984, by weapon: mashquake 11717292.1, big-fry 4541293.2, pressure-cooker 3623024.7, spud-grid 1557564.3, wandering-eyes 678923.9, full-broadside 350299.8, root-cellar 60661.3, grok-bot 23109.8.
- Kills 30463, by weapon: mashquake 17266, pressure-cooker 5354, spud-grid 2996, big-fry 2956, wandering-eyes 1101, full-broadside 631, grok-bot 71, root-cellar 65.
- Bosses killed 9, elites killed 12, boss chests 21, crates bought 5, shrines used 0, items bought 0, revives used 0; gold earned 7626, spent 1691.
- Made: no evolution, union or evolved item.

### L3.I6.G2: hp+dodge build B

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3, build swapped for pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-heart 5, stuffed-skin 5, thick-skin 5, spud-spring x1, spud-muffin x2, lucky-peel x1, copper-spoon x1, salt-crystal x1, pickle-jar x1; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 20:00), health 307/307; damage taken 450 (boss:ketchup-kraken 212.9, boss:grater-golem 196.5, boss:compost-titan 34.7, Brambles 5.8); 33842 kills; level 54 to 69; planner asked 104 times, action model 107, in lockstep; ended with pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-heart 5, stuffed-skin 5, thick-skin 5.
- Damage taken 450, by source: boss:ketchup-kraken 212.9, boss:grater-golem 196.5, boss:compost-titan 34.7, Brambles 5.8.
- Damage dealt 24817367, by weapon: mashquake 13568950, big-fry 4941107, pressure-cooker 3509631, spud-grid 1512043, heavy-russet 792336.4, full-broadside 389244.3, root-cellar 43053.1, grok-bot 37354.1.
- Kills 33842, by weapon: mashquake 20453, pressure-cooker 6043, spud-grid 3833, big-fry 2735, full-broadside 595, grok-bot 95, root-cellar 69, mandoline-fury 12.
- Bosses killed 9, elites killed 12, boss chests 21, crates bought 3, shrines used 0, items bought 0, revives used 0; gold earned 7764, spent 783.
- Made: no evolution, union or evolved item.

### L3.I6.G3: hp+dodge build C

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3, build swapped for pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-heart 5, stuffed-skin 5, thick-skin 5, spud-spring x1, spud-muffin x2, lucky-peel x1, copper-spoon x1, salt-crystal x1, pickle-jar x1; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 307/307; damage taken 439 (boss:ketchup-kraken 383.1, boss:compost-titan 34.7, Brambles 13, Spore vent 8); 35530 kills; level 54 to 69; planner asked 100 times, action model 109, in lockstep; ended with pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-heart 5, stuffed-skin 5, thick-skin 5.
- Damage taken 439, by source: boss:ketchup-kraken 383.1, boss:compost-titan 34.7, Brambles 13, Spore vent 8.
- Damage dealt 25908348, by weapon: mashquake 14212761.3, big-fry 6714549.6, pressure-cooker 3156226.2, spud-grid 1519758, full-broadside 241491.1, root-cellar 22793, grok-bot 15954.1, sack-of-russets 13870.
- Kills 35530, by weapon: mashquake 22864, pressure-cooker 5465, spud-grid 3381, big-fry 3237, full-broadside 413, root-cellar 82, grok-bot 65, mandoline-fury 15.
- Bosses killed 9, elites killed 12, boss chests 21, crates bought 11, shrines used 0, items bought 0, revives used 0; gold earned 7496, spent 8850.
- Made: no evolution, union or evolved item.

### L3.I6.G4: control loadout A (original passives)

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3, build swapped for pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-splash 5, sour-cream 5, fertilizer 5, spud-spring x1, spud-muffin x2, lucky-peel x1, copper-spoon x1, salt-crystal x1, pickle-jar x1; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 168/168; damage taken 210 (boss:ketchup-kraken 107.1, boss:compost-titan 69.4, boss:grater-golem 26.5, Hot oil 6.6); 40843 kills; level 54 to 75; planner asked 90 times, action model 175, in lockstep; ended with pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-splash 5, sour-cream 5, fertilizer 5.
- Damage taken 210, by source: boss:ketchup-kraken 107.1, boss:compost-titan 69.4, boss:grater-golem 26.5, Hot oil 6.6, Brambles 0.7.
- Damage dealt 25378385, by weapon: mashquake 14491977, big-fry 4855545.5, pressure-cooker 3606322.4, spud-grid 1908369.4, full-broadside 406071.6, root-cellar 61585.4, grok-bot 17722.6, sack-of-russets 13319.
- Kills 40843, by weapon: mashquake 24418, pressure-cooker 7558, spud-grid 4610, big-fry 3172, full-broadside 912, root-cellar 91, grok-bot 54, mandoline-fury 12.
- Bosses killed 9, elites killed 15, boss chests 24, crates bought 8, shrines used 0, items bought 0, revives used 0; gold earned 9497, spent 4139.
- Made: no evolution, union or evolved item.

### L3.I6.G5: control loadout B (original passives)

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3, build swapped for pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-splash 5, sour-cream 5, fertilizer 5, spud-spring x1, spud-muffin x2, lucky-peel x1, copper-spoon x1, salt-crystal x1, pickle-jar x1; 300s; plays the playbook.
- Outcome: died after 194.4s (game clock 18:14); damage taken 808 (boss:compost-titan 486, boss:ketchup-kraken 321.3, Brambles 0.9); 23280 kills; level 54 to 68; planner asked 59 times, action model 141, in lockstep; ended with pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-splash 5, sour-cream 5, fertilizer 5.
- Damage taken 808, by source: boss:compost-titan 486, boss:ketchup-kraken 321.3, Brambles 0.9; the killing blow: boss:ketchup-kraken.
- Damage dealt 12730360, by weapon: mashquake 7483541.1, big-fry 2648907.5, pressure-cooker 1515658.1, spud-grid 939703.2, full-broadside 95526.3, root-cellar 22903.5, sack-of-russets 13319, mandoline-fury 10313.
- Kills 23280, by weapon: mashquake 14531, pressure-cooker 3747, spud-grid 2777, big-fry 1849, full-broadside 322, root-cellar 35, mandoline-fury 12, sack-of-russets 7.
- Bosses killed 6, elites killed 6, boss chests 12, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 5626, spent 205.
- Made: no evolution, union or evolved item.

### L3.I7.G4: natural-b hp+dodge A

- Start: gym nm2-min15-natural-b (Nightmare 2 at 15:00), seed 1LISVUW, build swapped for pressure-cooker 1, factory-reset 1, mashquake 1, gravy-pack 1, hash-harrier 1, stand-mixer 1, root-network 5, big-bowl 5, four-eyed-spud 5, gravy-heart 5, stuffed-skin 5, thick-skin 5, golden-gravy x1, starch-sock x1, tailwind-tater x1, coal-baked-spud x1; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 20:00), health 269/269; damage taken 1368 (boss:ketchup-kraken 749.7, boss:compost-titan 277.7, enemy:grease-fiend 267.5, boss:grater-golem 37.2); 62617 kills; level 53 to 72; planner asked 99 times, action model 627, in lockstep; ended with pressure-cooker 1, factory-reset 1, mashquake 1, gravy-pack 1, hash-harrier 1, stand-mixer 1, root-network 5, big-bowl 5, four-eyed-spud 5, gravy-heart 5, stuffed-skin 5, thick-skin 5.
- Damage taken 1368, by source: boss:ketchup-kraken 749.7, boss:compost-titan 277.7, enemy:grease-fiend 267.5, boss:grater-golem 37.2, Hot oil 35.5.
- Damage dealt 31919270, by weapon: mashquake 12864667.4, stand-mixer 8431107.5, pressure-cooker 5500234.9, hash-harrier 3353931.6, gravy-pack 859994.3, factory-reset 550495.6, coal-baked-spud 318799.3, grok-bot 37740.
- Kills 62617, by weapon: mashquake 19076, pressure-cooker 17134, stand-mixer 16591, hash-harrier 5880, gravy-pack 2201, factory-reset 966, coal-baked-spud 624, grok-bot 144.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 13422, spent 0.
- Made: no evolution, union or evolved item.

### L3.I7.G5: natural-b hp+dodge B

- Start: gym nm2-min15-natural-b (Nightmare 2 at 15:00), seed 1LISVUW, build swapped for pressure-cooker 1, factory-reset 1, mashquake 1, gravy-pack 1, hash-harrier 1, stand-mixer 1, root-network 5, big-bowl 5, four-eyed-spud 5, gravy-heart 5, stuffed-skin 5, thick-skin 5, golden-gravy x1, starch-sock x1, tailwind-tater x1, coal-baked-spud x1; 300s; plays the playbook.
- Outcome: died after 191.6s (game clock 18:11); damage taken 828 (boss:ketchup-kraken 535.5, boss:grater-golem 188.6, boss:compost-titan 104.2); 31007 kills; level 53 to 65; planner asked 59 times, action model 265, in lockstep; ended with pressure-cooker 1, factory-reset 1, mashquake 1, gravy-pack 1, hash-harrier 1, stand-mixer 1, root-network 5, big-bowl 5, four-eyed-spud 5, gravy-heart 5, stuffed-skin 5, thick-skin 5.
- Damage taken 828, by source: boss:ketchup-kraken 535.5, boss:grater-golem 188.6, boss:compost-titan 104.2; the killing blow: boss:ketchup-kraken.
- Damage dealt 14712356, by weapon: mashquake 5821998.4, stand-mixer 3676466.8, pressure-cooker 2724599.3, hash-harrier 1419143.1, gravy-pack 574663.1, factory-reset 260377.7, coal-baked-spud 209764.5, grok-bot 23043.9.
- Kills 31007, by weapon: mashquake 10054, pressure-cooker 8224, stand-mixer 8085, hash-harrier 2564, gravy-pack 1113, factory-reset 500, coal-baked-spud 397, grok-bot 69.
- Bosses killed 12, elites killed 9, boss chests 17, crates bought 2, shrines used 1, items bought 0, revives used 0; gold earned 8860, spent 578.
- Made: no evolution, union or evolved item.

### L3.I8.G1: natural-c hp+armor+dodge A

- Start: gym nm2-min15-natural-c (Nightmare 2 at 15:00), seed 1SIX6LD, build swapped for pressure-cooker 1, mash-avalanche 1, factory-reset 1, cold-frame 1, root-current 1, hot-streak 8, root-network 5, masher-grip 5, four-eyed-spud 5, gravy-heart 5, stuffed-skin 5, starch-plating 5, meteor-russet x1, spicy-croquette x1, salt-crystal x2, cursed-crown x1, ghost-skin x2; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 20:00), health 269/269; damage taken 64 (Hot oil 57.8, Spore vent 5.7); 42094 kills; level 52 to 71; planner asked 90 times, action model 193, in lockstep; ended with pressure-cooker 1, mash-avalanche 1, factory-reset 1, cold-frame 1, root-current 1, hot-streak 8, root-network 5, masher-grip 5, four-eyed-spud 5, gravy-heart 5, stuffed-skin 5, starch-plating 5.
- Damage taken 64, by source: Hot oil 57.8, Spore vent 5.7.
- Damage dealt 30588856, by weapon: spicy-croquette 8617264.2, meteor-russet 8363625.4, root-current 4459684.2, cold-frame 4291364.7, mash-avalanche 2420126.9, pressure-cooker 1042806, factory-reset 725108.4, hot-streak 557393.3.
- Kills 42094, by weapon: meteor-russet 9904, spicy-croquette 9700, root-current 8591, cold-frame 8259, mash-avalanche 3462, factory-reset 902, pressure-cooker 654, hot-streak 476.
- Bosses killed 15, elites killed 9, boss chests 24, crates bought 7, shrines used 0, items bought 0, revives used 0; gold earned 14680, spent 17137.
- Made: no evolution, union or evolved item.

### L3.I8.G2: natural-c hp+armor+dodge B

- Start: gym nm2-min15-natural-c (Nightmare 2 at 15:00), seed 1SIX6LD, build swapped for pressure-cooker 1, mash-avalanche 1, factory-reset 1, cold-frame 1, root-current 1, hot-streak 8, root-network 5, masher-grip 5, four-eyed-spud 5, gravy-heart 5, stuffed-skin 5, starch-plating 5, meteor-russet x1, spicy-croquette x1, salt-crystal x2, cursed-crown x1, ghost-skin x2; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 20:00), health 269/269; damage taken 94 (enemy:ice-imp 55.3, Hot oil 28.7, enemy:blight-spore 10.1); 38961 kills; level 52 to 70; planner asked 95 times, action model 203, in lockstep; ended with pressure-cooker 1, mash-avalanche 1, factory-reset 1, cold-frame 1, root-current 1, hot-streak 8, root-network 5, masher-grip 5, four-eyed-spud 5, gravy-heart 5, stuffed-skin 5, starch-plating 5.
- Damage taken 94, by source: enemy:ice-imp 55.3, Hot oil 28.7, enemy:blight-spore 10.1.
- Damage dealt 29546961, by weapon: meteor-russet 8322583.5, spicy-croquette 8163922.2, root-current 4911973.5, cold-frame 3737357.6, mash-avalanche 2068520.9, pressure-cooker 973205.7, factory-reset 871895.3, hot-streak 402026.4.
- Kills 38961, by weapon: meteor-russet 9861, spicy-croquette 8764, root-current 8357, cold-frame 6892, mash-avalanche 2864, factory-reset 1012, pressure-cooker 760, hot-streak 314.
- Bosses killed 9, elites killed 18, boss chests 27, crates bought 7, shrines used 0, items bought 0, revives used 0; gold earned 13049, spent 17137.
- Made: no evolution, union or evolved item.

### L3.I8.G3: natural-c unchanged control

- Start: gym nm2-min15-natural-c (Nightmare 2 at 15:00), seed 1SIX6LD; 300s; plays the playbook.
- Outcome: died after 203.1s (game clock 18:23); damage taken 341 (boss:ketchup-kraken 305.2, boss:compost-titan 32.9, Hot oil 3.3); 39760 kills; level 52 to 68; planner asked 65 times, action model 132, in lockstep; ended with pressure-cooker 1, fry-by 1, potato-rain 8, spicy-hot-potato 1, stand-mixer 1, hot-streak 8, butter-pat 5, root-network 5, hot-start 5, hot-sauce 5, big-bowl 5, sour-cream 5.
- Damage taken 341, by source: boss:ketchup-kraken 305.2, boss:compost-titan 32.9, Hot oil 3.3; the killing blow: boss:ketchup-kraken.
- Damage dealt 20069579, by weapon: stand-mixer 6797540.2, spicy-hot-potato 5266961.8, pressure-cooker 3834839.3, hot-streak 1954041.5, fry-by 1296501.6, wandering-eyes 540671.9, potato-rain 373920.2, spark-spud 3899.6.
- Kills 39760, by weapon: stand-mixer 11138, spicy-hot-potato 10624, pressure-cooker 9156, hot-streak 4330, fry-by 2410, wandering-eyes 1286, potato-rain 804, grok-bot 6.
- Bosses killed 6, elites killed 12, boss chests 18, crates bought 3, shrines used 0, items bought 0, revives used 0; gold earned 10417, spent 4711.
- Made: no evolution, union or evolved item.
