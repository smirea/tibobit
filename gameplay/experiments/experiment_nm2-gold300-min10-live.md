# Does spending gold from 300 with a nest rule beat the 10:00 gold rule in the live 10:00-15:00 window

| Field | Value |
| --- | --- |
| Status | done |
| Area | economy |
| Result | inconclusive |
| Created | L10.I4 |
| Updated | L10.I5 |

## Hypothesis

The playbook rule at 500 gold did not fire (4629 earned, 0 spent). Rating spots as high as a chest from 300 gold with no boss within 300 converts gold into crates and shrines and lowers bursts.

## Method

Live nm2-live-min10-gold, 300 s, new goal text against the unchanged control. Record crates, shrines, gold unspent, damage by source and time lived. Save the 15:00 state if it lives.

## Findings

L10.I4.G4 died 12:32 (mud-golem 296, Mandoline 220) after spending 1546 gold, no better than the control (12:17). One game. See B191.

## Games

### L10.I4.G4: gold from 300 plus nest rule, save 15:00

- Start: gym nm2-live-min10-gold (Nightmare 2 at 10:01), seed NG08BZ; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 151.9s (game clock 12:32); damage taken 588 (enemy:mud-golem 295.9, boss:the-mandoline 219.5, enemy:ice-imp 68.5, Hot oil 4.4); 8252 kills; level 35 to 46; planner asked 60 times, action model 107; the models saw the game 37 ms late (p90 102); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5.
- Damage taken 588, by source: enemy:mud-golem 295.9, boss:the-mandoline 219.5, enemy:ice-imp 68.5, Hot oil 4.4; the killing blow: enemy:mud-golem.
- Damage dealt 1638153, by weapon: overgrowth 986706.7, thunder-tuber 458369.7, pressure-cooker 63530.2, boom-spud 59715, mash-snowball 37228.9, tater-twirl 19704.8, grok-bot 10837.6, root-cellar 2060.1.
- Kills 8252, by weapon: overgrowth 5236, thunder-tuber 2366, pressure-cooker 270, mash-snowball 172, boom-spud 135, grok-bot 71, tater-twirl 1, root-cellar 1.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 3, shrines used 1, items bought 0, revives used 0; gold earned 3233, spent 1546.
- Made: no evolution, union or evolved item.
