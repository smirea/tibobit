# Does the unchanged playbook survive 15:00-20:00 on Nightmare 2

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | meta |
| Result | - |
| Created | sonnet-high L3.I2 |
| Updated | reset at the restart (L4) |

## Hypothesis

From a natural NM2 15:00 build the unchanged playbook passes 20:00 through the Grater Golem, Titan, Kraken and Harvester windows most of the time.

## Method

nm2-min15-natural (and nm2-min15-natural-b once built), 300s, unchanged playbook, repeat to get a death rate.

## Findings

L3.I4: natural-b baseline died 18:03 (Kraken 305, Titan 132). Across both maps 3 of 4 deaths came in the 18:00-18:03 Kraken window. L3.I5 adds a natural-b repeat and a baseline from nm2-min15-gold.

Reset at the restart: still running from an earlier loop and measured with lockstep on, so its games need replaying live before they count.

## Games

### L3.I2.G1: min15 baseline A

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 257/257; damage taken 433 (boss:ketchup-kraken 216.9, enemy:grease-fiend 65.4, boss:grater-golem 59.7, enemy:field-rat 57.5); 38594 kills; level 50 to 68; planner asked 102 times, action model 645, in lockstep; ended with pressure-cooker 1, hash-harrier 1, spicy-hot-potato 1, hashnado 1, mandoline-fury 1, waffle-cut 1, root-network 5, hot-sauce 5, bacon-bits 5, gravy-heart 5, sour-cream 5, butter-socks 5.
- Damage taken 433, by source: boss:ketchup-kraken 216.9, enemy:grease-fiend 65.4, boss:grater-golem 59.7, enemy:field-rat 57.5, enemy:blight-spore 18.4, Hot oil 9.2, Brambles 6.2.
- Damage dealt 27842878, by weapon: bonfire-spud 8938012.9, hashnado 4513652.1, pressure-cooker 4162553.7, mandoline-fury 3456190.8, spicy-hot-potato 3240482.7, hash-harrier 2864148.4, waffle-cut 649896.8, spark-spud 13859.1.
- Kills 38594, by weapon: bonfire-spud 11750, pressure-cooker 7256, mandoline-fury 5961, spicy-hot-potato 5416, hashnado 4537, hash-harrier 2229, waffle-cut 1386, spark-spud 44.
- Bosses killed 9, elites killed 12, boss chests 21, crates bought 4, shrines used 2, items bought 0, revives used 0; gold earned 9807, spent 1486.
- Made: no evolution, union or evolved item.

### L3.I2.G2: min15 baseline B

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3; 300s; plays the playbook.
- Outcome: died after 63s (game clock 16:03); damage taken 350 (boss:grater-golem 318.6, enemy:field-rat 28.7, Spore vent 2.2); 6922 kills; level 50 to 52; planner asked 22 times, action model 101, in lockstep; ended with pressure-cooker 1, hash-harrier 1, spicy-hot-potato 1, hashnado 1, mandoline-fury 1, waffle-cut 1, root-network 5, hot-sauce 5, bacon-bits 5, gravy-heart 5, sour-cream 5, butter-socks 5.
- Damage taken 350, by source: boss:grater-golem 318.6, enemy:field-rat 28.7, Spore vent 2.2; the killing blow: boss:grater-golem.
- Damage dealt 2837291, by weapon: bonfire-spud 747339.9, spicy-hot-potato 550003.6, hashnado 536254.2, hash-harrier 364441.2, pressure-cooker 294270.9, mandoline-fury 261752.8, waffle-cut 81427.3, spark-spud 1691.2.
- Kills 6922, by weapon: bonfire-spud 2130, spicy-hot-potato 1414, hashnado 942, pressure-cooker 822, mandoline-fury 776, hash-harrier 548, waffle-cut 288, spark-spud 2.
- Bosses killed 0, elites killed 3, boss chests 3, crates bought 2, shrines used 0, items bought 0, revives used 0; gold earned 674, spent 578.
- Made: no evolution, union or evolved item.

### L3.I3.G1: min15 baseline C

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 250/250; damage taken 300 (boss:ketchup-kraken 174.2, enemy:grease-fiend 56.9, Hot oil 31, boss:grater-golem 17.2); 48775 kills; level 46 to 67; planner asked 92 times, action model 284, in lockstep; ended with pressure-cooker 1, hash-harrier 1, eclipse-scythe 1, hash-brown-shield 8, hot-streak 8, broadside 8, chives 5, gravy-heart 5, bacon-bits 5, root-network 5, packed-pan 5, big-bowl 5.
- Damage taken 300, by source: boss:ketchup-kraken 174.2, enemy:grease-fiend 56.9, Hot oil 31, boss:grater-golem 17.2, boss:compost-titan 14.7, enemy:ice-imp 6.3.
- Damage dealt 26026351, by weapon: pressure-cooker 10534533.6, hot-streak 6651942.2, hash-harrier 4723755.7, eclipse-scythe 2842233, heavy-russet 938615, broadside 239677.4, hash-brown-shield 49198.1, grok-bot 46333.9.
- Kills 48775, by weapon: pressure-cooker 17166, hot-streak 13553, eclipse-scythe 10622, hash-harrier 6191, broadside 848, grok-bot 240, hash-brown-shield 155.
- Bosses killed 9, elites killed 12, boss chests 21, crates bought 4, shrines used 0, items bought 0, revives used 0; gold earned 12545, spent 10360.
- Made: no evolution, union or evolved item.

### L3.I3.G2: min15 baseline D

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3; 300s; plays the playbook.
- Outcome: died after 183.2s (game clock 18:03); damage taken 1170 (enemy:grease-fiend 408.8, boss:ketchup-kraken 290.7, boss:compost-titan 188, enemy:ice-imp 104.8); 22047 kills; level 50 to 62; planner asked 60 times, action model 374, in lockstep; ended with pressure-cooker 1, hash-harrier 1, spicy-hot-potato 1, hashnado 1, mandoline-fury 1, waffle-cut 1, root-network 5, hot-sauce 5, bacon-bits 5, gravy-heart 5, sour-cream 5, butter-socks 5.
- Damage taken 1170, by source: enemy:grease-fiend 408.8, boss:ketchup-kraken 290.7, boss:compost-titan 188, enemy:ice-imp 104.8, boss:grater-golem 90.3, enemy:field-rat 57.6, enemy:blight-spore 18.4, Hot oil 11; the killing blow: boss:ketchup-kraken.
- Damage dealt 12060728, by weapon: bonfire-spud 3607510.4, hashnado 2135426.2, spicy-hot-potato 1594134.2, pressure-cooker 1440485.4, hash-harrier 1287266.5, mandoline-fury 1213465.6, lightning-spud 413314.9, waffle-cut 351157.1.
- Kills 22047, by weapon: bonfire-spud 6315, spicy-hot-potato 3429, pressure-cooker 3305, mandoline-fury 2929, hashnado 2613, hash-harrier 1554, waffle-cut 956, lightning-spud 852.
- Bosses killed 6, elites killed 9, boss chests 13, crates bought 2, shrines used 1, items bought 0, revives used 0; gold earned 5752, spent 578.
- Made: no evolution, union or evolved item.

### L3.I4.G5: min15 natural-b baseline

- Start: gym nm2-min15-natural-b (Nightmare 2 at 15:00), seed 1LISVUW; 300s; plays the playbook.
- Outcome: died after 182.6s (game clock 18:03); damage taken 444 (boss:ketchup-kraken 305.2, boss:compost-titan 131.7, Spore vent 4.1, Hot oil 3); 36653 kills; level 59 to 76; planner asked 59 times, action model 102, in lockstep; ended with pressure-cooker 1, potato-patch 1, sack-of-russets 1, butter-streak 8, spud-cannon 8, broadside 8, peel-out 5, root-network 5, chives 5, fertilizer 5, big-bowl 5, butter-pat 5.
- Damage taken 444, by source: boss:ketchup-kraken 305.2, boss:compost-titan 131.7, Spore vent 4.1, Hot oil 3; the killing blow: boss:ketchup-kraken.
- Damage dealt 17570536, by weapon: storm-tot 8993775.8, pressure-cooker 3695853.1, sack-of-russets 3011007.1, potato-patch 868797.6, spud-cannon 854466, broadside 83341.3, butter-streak 51262.3, grok-bot 7540.2.
- Kills 36653, by weapon: storm-tot 16545, pressure-cooker 9784, sack-of-russets 7082, potato-patch 1976, spud-cannon 1099, butter-streak 88, grok-bot 36, broadside 35.
- Bosses killed 6, elites killed 12, boss chests 18, crates bought 8, shrines used 0, items bought 0, revives used 0; gold earned 8480, spent 5189.
- Made: no evolution, union or evolved item.

### L3.I5.G4: natural-b baseline repeat

- Start: gym nm2-min15-natural-b (Nightmare 2 at 15:00), seed 1LISVUW; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 20:00), health 192/192; damage taken 247 (boss:compost-titan 173.6, boss:grater-golem 37.2, enemy:ice-imp 31.6, Hot oil 5); 51327 kills; level 50 to 70; planner asked 90 times, action model 401, in lockstep; ended with pressure-cooker 1, factory-reset 1, mashquake 1, gravy-pack 1, hash-harrier 1, stand-mixer 1, lean-lunch 5, four-eyed-spud 5, big-bowl 5, root-network 5, gravy-heart 5, bacon-bits 5.
- Damage taken 247, by source: boss:compost-titan 173.6, boss:grater-golem 37.2, enemy:ice-imp 31.6, Hot oil 5.
- Damage dealt 27485619, by weapon: mashquake 10261907.2, stand-mixer 6669113.2, pressure-cooker 6069789.8, hash-harrier 2646471.4, gravy-pack 905716.9, factory-reset 537764.7, coal-baked-spud 393104, grok-bot 1751.6.
- Kills 51327, by weapon: pressure-cooker 15772, mashquake 15352, stand-mixer 12773, hash-harrier 3912, gravy-pack 1989, factory-reset 869, coal-baked-spud 654, grok-bot 6.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 11813, spent 205.
- Made: no evolution, union or evolved item.

### L3.I5.G5: gold gym baseline

- Start: gym nm2-min15-gold (Nightmare 2 at 15:00), seed 11X8043; 300s; plays the playbook.
- Outcome: died after 187s (game clock 18:07); damage taken 346 (boss:ketchup-kraken 196.9, enemy:grease-fiend 86, enemy:ice-imp 51.2, Spore vent 8.6); 30489 kills; level 56 to 70; planner asked 66 times, action model 307, in lockstep; ended with pressure-cooker 1, spicy-hot-potato 1, mezzaluna 8, cast-iron 1, tater-twirl 8, gravy-boat 8, root-network 5, chives 5, gravy-splash 5, hot-sauce 5, starch-plating 5, four-eyed-spud 5.
- Damage taken 346, by source: boss:ketchup-kraken 196.9, enemy:grease-fiend 86, enemy:ice-imp 51.2, Spore vent 8.6, Hot oil 2.4, Brambles 0.9; the killing blow: boss:ketchup-kraken.
- Damage dealt 20365354, by weapon: storm-tot 5561843.2, spicy-hot-potato 5009609.1, gravy-boat 2080650.5, spicy-croquette 2069674.9, bonfire-spud 1610414.3, pressure-cooker 1397210.3, cast-iron 1052811.7, heavy-russet 642940.7.
- Kills 30489, by weapon: spicy-hot-potato 8222, storm-tot 7897, gravy-boat 3271, spicy-croquette 2971, pressure-cooker 2693, bonfire-spud 2186, cast-iron 1690, boom-spud 724.
- Bosses killed 6, elites killed 16, boss chests 29, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 12638, spent 0.
- Made: no evolution, union or evolved item.
