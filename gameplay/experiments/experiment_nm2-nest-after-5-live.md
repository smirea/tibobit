# Does avoiding Beetle Nest charges after 5:00 stop the 6:50-style hp cliff on NM2

| Field | Value |
| --- | --- |
| Status | proposed |
| Area | spots |
| Result | - |
| Created | L9.I10 |
| Updated | L9.I10 |

## Hypothesis

Charging a Beetle Nest spawns an elite beside Tibo (134 hp in 2 s at 6:50). A rule that rates nests low after 5:00 unless hp is full, a dash charge is held and no boss is within 300 units cuts the largest hp cliffs without losing many chests, since boss and elite kills elsewhere still drop chests.

## Method

Live gyms nm2-live-min5 and nm2-live-min5-fryer, 300 s, paired with the plain playbook, 3-4 games per arm. Record nest charges, hp lost within 3 s of a nest finishing, chests opened, damage by source and time lived.

## Findings

(none yet)

## Games

### L10.I1.G2: gold from 5:00 plus nest rule

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.4s (game clock 10:00), health 176/176; damage taken 136 (enemy:blight-spore 43.3, Spore vent 40.7, Hot oil 30.8, enemy:field-rat 18.4); 11288 kills; level 19 to 36; planner asked 126 times, action model 70; the models saw the game 33 ms late (p90 72); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5.
- Damage taken 136, by source: enemy:blight-spore 43.3, Spore vent 40.7, Hot oil 30.8, enemy:field-rat 18.4, Brambles 2.5.
- Damage dealt 956437, by weapon: overgrowth 701940, thunder-tuber 211220, pressure-cooker 19397.7, mash-snowball 14672.9, tater-twirl 5396, porcupine-spud 3101.8, root-cellar 509, grok-bot 130.
- Kills 11288, by weapon: overgrowth 8662, thunder-tuber 2275, pressure-cooker 195, mash-snowball 147, grok-bot 4, tater-twirl 3, steam-vent 1, porcupine-spud 1.
- Bosses killed 9, elites killed 15, boss chests 20, crates bought 10, shrines used 5, items bought 0, revives used 0; gold earned 2826, spent 2705.
- Made: pressure-cooker at 07:13.
