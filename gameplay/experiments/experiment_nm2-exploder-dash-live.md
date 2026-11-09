# Does an enemy-aware dash state and prompt spend dashes on exploders and crowds instead of single pests

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | inconclusive |
| Created | L10.I2 |
| Updated | L10.I5 |

## Hypothesis

The action state never showed enemies, bosses or recent damage, so the dash score sat at 51-58% on single pests at low hp and stayed under 40% at the Sizzle Imp burst. Showing them and asking about big hits and crowds should move dashes to the dangerous moments.

## Method

Live gym nm2-live-min5, 300 s, with dashThreshold 0.4 and the new action.state and action.dash, against the unchanged control. Record dash count, the situation at each dash (enemies within 60, hp, boss), hp lost per minute and time lived. Note that hurt and useful prompts also see the richer state.

## Findings

Enemy-aware dash lived the lenient 5:00 gym with 0 dashes but died 12:07 on the 10:00 gym after 7 dashes at high scores far from the boss. Not shown to help. See B190.

## Games

### L10.I2.G3: enemy-aware dash state and prompt

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with dashThreshold 0.4, its own action.state, its own action.dash.
- Outcome: alive after 300.1s (game clock 10:00), health 120/120; damage taken 141 (boss:fryer-king 49.9, Spore vent 31.3, boss:sir-strawman 24.4, enemy:blight-spore 18.6); 11956 kills; level 19 to 38; planner asked 128 times, action model 128; the models saw the game 36 ms late (p90 96); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5.
- Damage taken 141, by source: boss:fryer-king 49.9, Spore vent 31.3, boss:sir-strawman 24.4, enemy:blight-spore 18.6, Brambles 16.3.
- Damage dealt 970351, by weapon: overgrowth 734550.7, thunder-tuber 197561.9, mash-snowball 13045.6, pressure-cooker 9999.8, grok-bot 7387.6, tater-twirl 6721.6, root-cellar 1028.1, steam-vent 56.
- Kills 11956, by weapon: overgrowth 9355, thunder-tuber 2323, mash-snowball 138, pressure-cooker 67, grok-bot 64, root-cellar 8, tater-twirl 1.
- Bosses killed 12, elites killed 18, boss chests 29, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 3517, spent 0.
- Made: pressure-cooker at 06:42.

### L10.I4.G3: enemy-aware dash state at 10:00

- Start: gym nm2-live-min10-gold (Nightmare 2 at 10:01), seed NG08BZ; 300s; plays the playbook with dashThreshold 0.4, its own action.state, its own action.dash.
- Outcome: died after 127.1s (game clock 12:07); damage taken 475 (boss:the-mandoline 242.8, enemy:mud-golem 115.5, enemy:ice-imp 83.4, enemy:blight-spore 21.2); 7663 kills; level 35 to 44; planner asked 50 times, action model 71; the models saw the game 55 ms late (p90 145); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5.
- Damage taken 475, by source: boss:the-mandoline 242.8, enemy:mud-golem 115.5, enemy:ice-imp 83.4, enemy:blight-spore 21.2, Hot oil 6.3, Spore vent 5.6; the killing blow: boss:the-mandoline.
- Damage dealt 1447645, by weapon: overgrowth 816358.6, thunder-tuber 392349, pressure-cooker 90933.4, boom-spud 64641.5, mash-snowball 36122.2, tater-twirl 19752.9, grok-bot 17880.2, static-socks 6697.1.
- Kills 7663, by weapon: overgrowth 4465, thunder-tuber 2264, pressure-cooker 441, mash-snowball 228, boom-spud 142, grok-bot 98, static-socks 18, root-cellar 4.
- Bosses killed 3, elites killed 15, boss chests 15, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 2668, spent 402.
- Made: no evolution, union or evolved item.
