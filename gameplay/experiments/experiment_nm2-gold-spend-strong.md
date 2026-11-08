# Does a stronger gold-spend rule convert NM2 gold into items and lower 15:00-20:00 deaths

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | economy |
| Result | - |
| Created | sonnet-high L3.I4 |
| Updated | reset at the restart (L4) |

## Hypothesis

A goal text that rates crates, Fry Cart, Whetstone and shrines above a chest from 300 gold (no boss within 300) spends far more of the gold than the 500-gold as-high-as-a-chest rule, and the bought items cut Kraken, Titan and grease-fiend damage in 15:00-20:00 on Nightmare 2.

## Method

L3.I4: nm2-min15-natural three games with the strong text against the four unchanged baselines (2 alive, 2 dead); one game from nm2-min10-natural measures gold spent and saves nm2-min15-gold. Compare gold spent, crates, shrines, damage by source and survival to 20:00.

## Findings

L3.I5: strong rule lived 3 of 5 games overall (natural 1 of 2 in I4, 1 of 2 in I5 repeats, natural-b 1 of 1), against 3 of 7 for baselines on the same gyms. Deaths for both are the 18:03-18:22 Kraken window. Not adopted into the playbook; the effect is not separable.

Reset at the restart: still running from an earlier loop and measured with lockstep on, so its games need replaying live before they count.

## Games

### L3.I4.G1: min15 strong spend A

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.3s (game clock 20:00), health 269/269; damage taken 108 (boss:ketchup-kraken 87.1, Hot oil 11.5, enemy:ice-imp 5.6, Brambles 3.6); 36613 kills; level 46 to 65; planner asked 102 times, action model 178, in lockstep; ended with pressure-cooker 1, hash-harrier 1, eclipse-scythe 1, hash-brown-shield 8, hot-streak 8, broadside 8, chives 5, gravy-heart 5, bacon-bits 5, root-network 5, packed-pan 5, big-bowl 5.
- Damage taken 108, by source: boss:ketchup-kraken 87.1, Hot oil 11.5, enemy:ice-imp 5.6, Brambles 3.6.
- Damage dealt 25458965, by weapon: storm-tot 9219633.9, magma-croquette 4835915.2, pressure-cooker 4430182.3, hash-harrier 2814049.2, hot-streak 2324602.2, eclipse-scythe 709712.8, heavy-russet 646641.5, coal-baked-spud 184039.2.
- Kills 36613, by weapon: storm-tot 12021, pressure-cooker 8209, magma-croquette 6055, hot-streak 3979, hash-harrier 3831, eclipse-scythe 1655, coal-baked-spud 304, spicy-croquette 275.
- Bosses killed 12, elites killed 15, boss chests 12, crates bought 3, shrines used 4, items bought 7, revives used 0; gold earned 9214, spent 9523.
- Made: magma-croquette at 15:33, storm-tot at 15:44.

### L3.I4.G2: min15 strong spend B

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed ?; 300s; plays the playbook with its own planner.goal.
- Outcome: not played: checkpoint failed: no run in progress.

### L3.I4.G3: min15 strong spend C

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 183.2s (game clock 18:03); damage taken 691 (boss:ketchup-kraken 321.3, boss:compost-titan 277.7, enemy:mud-golem 86.1, Spore vent 3.4); 18089 kills; level 50 to 63; planner asked 57 times, action model 138, in lockstep; ended with pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-splash 5, sour-cream 5, fertilizer 5.
- Damage taken 691, by source: boss:ketchup-kraken 321.3, boss:compost-titan 277.7, enemy:mud-golem 86.1, Spore vent 3.4, Hot oil 2.7; the killing blow: boss:ketchup-kraken.
- Damage dealt 10391032, by weapon: mashquake 5637627.7, big-fry 2485674.4, pressure-cooker 1229843.9, spud-grid 919088.3, full-broadside 90885.3, root-cellar 14273.2, grok-bot 13500.4, gravy-splash 138.9.
- Kills 18089, by weapon: mashquake 11486, pressure-cooker 2722, big-fry 1989, spud-grid 1793, grok-bot 41, full-broadside 34, root-cellar 24.
- Bosses killed 7, elites killed 12, boss chests 1, crates bought 7, shrines used 3, items bought 0, revives used 0; gold earned 3374, spent 4187.
- Made: no evolution, union or evolved item.

### L3.I4.G4: min10 strong spend, save 15:00

- Start: gym nm2-min10-natural (Nightmare 2 at 10:00), seed 11X8043; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 15:00), health 120/120; damage taken 115 (enemy:ice-imp 57.4, boss:great-wireworm 43.3, Hot oil 9.7, Brambles 3); 41401 kills; level 41 to 57; planner asked 106 times, action model 178, in lockstep; ended with grease-fire 1, potato-rain 8, baked-alaska 1, reset-button 8, spud-fence 8, mash-golem 8, hot-sauce 5, butter-pat 5, mash-finisher 5, thick-skin 5, root-network 5, masher-grip 5; saved as gym nm2-min15-gold.
- Damage taken 115, by source: enemy:ice-imp 57.4, boss:great-wireworm 43.3, Hot oil 9.7, Brambles 3, Spore vent 1.8.
- Damage dealt 10178898, by weapon: grease-fire 3540142.5, baked-alaska 3379866.1, storm-tot 2735526.2, boom-spud 190049, static-tot 152662.8, spud-fence 78409.8, potato-rain 31669.9, copper-tot 26041.9.
- Kills 41401, by weapon: grease-fire 14767, baked-alaska 14683, storm-tot 9997, static-tot 641, boom-spud 511, spud-fence 416, potato-rain 161, reset-button 78.
- Bosses killed 12, elites killed 12, boss chests 6, crates bought 13, shrines used 2, items bought 8, revives used 0; gold earned 4993, spent 9657.
- Made: storm-tot at 12:27.

### L3.I5.G1: min15 strong spend repeat A

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 202.6s (game clock 18:22); damage taken 304 (boss:ketchup-kraken 214.2, enemy:mud-golem 86.1, Brambles 2.4, Hot oil 1.8); 23518 kills; level 50 to 66; planner asked 66 times, action model 57, in lockstep; ended with pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-splash 5, sour-cream 5, fertilizer 5.
- Damage taken 304, by source: boss:ketchup-kraken 214.2, enemy:mud-golem 86.1, Brambles 2.4, Hot oil 1.8; the killing blow: boss:ketchup-kraken.
- Damage dealt 13006421, by weapon: mashquake 7024020.8, big-fry 3165611.1, pressure-cooker 1795276.1, spud-grid 938412.9, full-broadside 41875.1, root-cellar 22909, grok-bot 18196.4, gravy-splash 119.1.
- Kills 23518, by weapon: mashquake 13828, pressure-cooker 4575, big-fry 2613, spud-grid 2354, grok-bot 51, full-broadside 51, root-cellar 46.
- Bosses killed 6, elites killed 9, boss chests 10, crates bought 5, shrines used 0, items bought 0, revives used 0; gold earned 5652, spent 2124.
- Made: no evolution, union or evolved item.

### L3.I5.G2: min15 strong spend repeat B

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.1s (game clock 20:00), health 144/144; damage taken 132 (enemy:mud-golem 86.1, boss:compost-titan 34.7, Hot oil 11.2); 42599 kills; level 50 to 75; planner asked 103 times, action model 137, in lockstep; ended with pressure-cooker 1, spud-grid 1, full-broadside 1, mashquake 1, big-fry 1, root-cellar 8, root-network 5, butter-pat 5, big-bowl 5, gravy-splash 5, sour-cream 5, fertilizer 5.
- Damage taken 132, by source: enemy:mud-golem 86.1, boss:compost-titan 34.7, Hot oil 11.2.
- Damage dealt 25742874, by weapon: mashquake 14524784.3, big-fry 5069503.1, pressure-cooker 4061389, spud-grid 1891804.7, full-broadside 110221.6, root-cellar 68685.9, grok-bot 16329.3, gravy-splash 155.8.
- Kills 42599, by weapon: mashquake 25345, pressure-cooker 8578, spud-grid 4620, big-fry 3646, full-broadside 206, root-cellar 127, grok-bot 77.
- Bosses killed 9, elites killed 15, boss chests 24, crates bought 2, shrines used 0, items bought 0, revives used 0; gold earned 11679, spent 578.
- Made: no evolution, union or evolved item.

### L3.I5.G3: natural-b strong spend

- Start: gym nm2-min15-natural-b (Nightmare 2 at 15:00), seed 1LISVUW; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.1s (game clock 20:00), health 221/221; damage taken 335 (boss:ketchup-kraken 214.2, enemy:ice-imp 58.5, boss:compost-titan 34.7, Hot oil 26); 63503 kills; level 50 to 75; planner asked 82 times, action model 127, in lockstep; ended with pressure-cooker 1, factory-reset 1, mashquake 1, gravy-pack 1, hash-harrier 1, stand-mixer 1, lean-lunch 5, four-eyed-spud 5, big-bowl 5, root-network 5, gravy-heart 5, bacon-bits 5.
- Damage taken 335, by source: boss:ketchup-kraken 214.2, enemy:ice-imp 58.5, boss:compost-titan 34.7, Hot oil 26, Brambles 1.8.
- Damage dealt 42052485, by weapon: mashquake 15677286.9, stand-mixer 9442851.3, pressure-cooker 5760198.4, hash-harrier 3710099.1, magma-croquette 3497364.2, heavy-russet 1528628.5, gravy-pack 1332858, factory-reset 494915.2.
- Kills 63503, by weapon: mashquake 19838, stand-mixer 14939, pressure-cooker 14497, hash-harrier 5770, magma-croquette 4154, gravy-pack 2430, factory-reset 744, coal-baked-spud 665.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 11, shrines used 0, items bought 0, revives used 0; gold earned 16028, spent 8850.
- Made: magma-croquette at 17:55.
