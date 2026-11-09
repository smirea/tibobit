# Do gold from 5:00 and a nest rule beat the unchanged playbook on the live NM2 5:00 gym

| Field | Value |
| --- | --- |
| Status | running |
| Area | economy |
| Result | - |
| Created | L10.I2 |
| Updated | L10.I4 |

## Hypothesis

Rating crates, Fry Cart, Whetstone and shrines like a chest from 300 gold after 5:00, and a Beetle Nest low unless hp is full, a dash is held and no boss is near, gives more max hp, crates and a safer 6:00-10:00 than the unchanged playbook, and the saved 10:00 state lets 10:00-15:00 be tested.

## Method

Live gym nm2-live-min5, 300 s, package vs control. Record crates, shrines, max hp, damage by source, hp lost within 3 s of a nest finishing, chests and time lived. Save the package game's 10:00 state as nm2-live-min10-gold. Needs 3 of 4 pairs better on hp or damage to confirm.

## Findings

Package 4 of 5 alive against controls 2 of 4 on nm2-live-min5, but the gym is too lenient to separate arms. L10.I4 tests spending from 300 gold on the 10:00 gym instead.

## Games

### L10.I2.G1: gold from 5:00 plus nest rule, save 10:00

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.1s (game clock 10:00), health 162/162; damage taken 15 (enemy:blight-spore 15.4); 10944 kills; level 19 to 35; planner asked 133 times, action model 121; the models saw the game 31 ms late (p90 69); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5; saved as gym nm2-live-min10-gold.
- Damage taken 15, by source: enemy:blight-spore 15.4.
- Damage dealt 905227, by weapon: overgrowth 658137.2, thunder-tuber 222704.1, pressure-cooker 12076.1, mash-snowball 10028.3, tater-twirl 1511.4, root-cellar 548.4, grok-bot 210.8, steam-vent 11.
- Kills 10944, by weapon: overgrowth 8284, thunder-tuber 2462, mash-snowball 111, pressure-cooker 79, root-cellar 5, grok-bot 3.
- Bosses killed 12, elites killed 9, boss chests 16, crates bought 7, shrines used 6, items bought 0, revives used 0; gold earned 2065, spent 1159.
- Made: pressure-cooker at 08:37.

### L10.I2.G2: control unchanged playbook

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 10:00), health 120/120; damage taken 94 (Hot oil 48, boss:fryer-king 43.3, Spore vent 3.1); 11045 kills; level 19 to 36; planner asked 124 times, action model 85; the models saw the game 32 ms late (p90 78); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5.
- Damage taken 94, by source: Hot oil 48, boss:fryer-king 43.3, Spore vent 3.1.
- Damage dealt 924937, by weapon: overgrowth 718391.1, thunder-tuber 187604.3, mash-snowball 8750, pressure-cooker 6467.9, grok-bot 2280.8, tater-twirl 1283.9, root-cellar 144.3, steam-vent 15.
- Kills 11045, by weapon: overgrowth 8696, thunder-tuber 2143, mash-snowball 114, pressure-cooker 56, grok-bot 35, root-cellar 1.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2791, spent 0.
- Made: pressure-cooker at 07:18.

### L10.I3.G1: package repeat on 5:00 gym

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.1s (game clock 10:00), health 182/182; damage taken 47 (Hot oil 19.3, enemy:blight-spore 14.6, enemy:ice-imp 13.2); 12260 kills; level 19 to 38; planner asked 128 times, action model 62; the models saw the game 31 ms late (p90 72); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5.
- Damage taken 47, by source: Hot oil 19.3, enemy:blight-spore 14.6, enemy:ice-imp 13.2.
- Damage dealt 1002172, by weapon: overgrowth 686715.1, thunder-tuber 260040.2, pressure-cooker 39479.4, mash-snowball 11766.5, root-cellar 2244.3, tater-twirl 958.8, porcupine-spud 884.8, grok-bot 83.2.
- Kills 12260, by weapon: overgrowth 9055, thunder-tuber 2735, pressure-cooker 316, mash-snowball 137, porcupine-spud 9, root-cellar 5, tater-twirl 2, grok-bot 1.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 9, shrines used 5, items bought 0, revives used 0; gold earned 2928, spent 2067.
- Made: pressure-cooker at 07:22.
