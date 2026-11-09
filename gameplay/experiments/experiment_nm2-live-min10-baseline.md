# Does the unchanged playbook survive 10:00-15:00 live on Nightmare 2 from the gold gym

| Field | Value |
| --- | --- |
| Status | running |
| Area | meta |
| Result | - |
| Created | L10.I3 |
| Updated | L10.I4 |

## Hypothesis

From the 10:00 state built by the gold-from-5:00 package (162 hp, items bought), the unchanged playbook passes the Deep Freezer and Great Wireworm windows to 15:00 and gives a live 15:00 gym.

## Method

Live nm2-live-min10-gold, 300 s, unchanged playbook; record damage by source, hp per minute, crates, shrines, dashes and time lived. If alive, save nm2-live-min15-a.

## Findings

L10.I3.G3: unchanged playbook died 14:07 (Deep Freezer), 0 gold spent. L10.I4 repeats it as a control next to three arms.

## Games

### L10.I3.G3: unchanged playbook from 10:00 gym, save 15:00

- Start: gym nm2-live-min10-gold (Nightmare 2 at 10:01), seed NG08BZ; 300s; plays the playbook.
- Outcome: died after 247s (game clock 14:07); damage taken 655 (boss:deep-freezer 223.6, enemy:ice-imp 153.9, boss:great-wireworm 129.4, enemy:field-rat 100.2); 13338 kills; level 35 to 50; planner asked 89 times, action model 160; the models saw the game 50 ms late (p90 139); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5.
- Damage taken 655, by source: boss:deep-freezer 223.6, enemy:ice-imp 153.9, boss:great-wireworm 129.4, enemy:field-rat 100.2, Hot oil 26.2, enemy:blight-spore 21.8; the killing blow: boss:deep-freezer.
- Damage dealt 3096114, by weapon: overgrowth 1776296.4, thunder-tuber 942655.1, pressure-cooker 142501.2, boom-spud 100895.1, mash-snowball 76923.6, tater-twirl 25616, grok-bot 23251.8, root-cellar 6966.1.
- Kills 13338, by weapon: overgrowth 7828, thunder-tuber 4337, pressure-cooker 559, mash-snowball 373, grok-bot 110, boom-spud 110, tater-twirl 8, static-socks 8.
- Bosses killed 9, elites killed 15, boss chests 26, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 4629, spent 0.
- Made: no evolution, union or evolved item.

### L10.I4.G1: control from 10:00 gym

- Start: gym nm2-live-min10-gold (Nightmare 2 at 10:01), seed NG08BZ; 300s; plays the playbook.
- Outcome: died after 137.4s (game clock 12:17); damage taken 289 (boss:the-mandoline 236.1, enemy:field-rat 28, Hot oil 25.2); 7155 kills; level 35 to 45; planner asked 49 times, action model 72; the models saw the game 35 ms late (p90 93); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5.
- Damage taken 289, by source: boss:the-mandoline 236.1, enemy:field-rat 28, Hot oil 25.2; the killing blow: boss:the-mandoline.
- Damage dealt 1444460, by weapon: overgrowth 898005.1, thunder-tuber 398177, pressure-cooker 56624.8, boom-spud 47202.8, mash-snowball 23250.5, tater-twirl 19288.7, root-cellar 1663.3, static-socks 248.
- Kills 7155, by weapon: overgrowth 4627, thunder-tuber 2066, pressure-cooker 232, mash-snowball 144, boom-spud 81, static-socks 3, tater-twirl 2.
- Bosses killed 7, elites killed 12, boss chests 20, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 3524, spent 402.
- Made: no evolution, union or evolved item.
