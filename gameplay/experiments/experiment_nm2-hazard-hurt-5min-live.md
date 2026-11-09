# Does a hazard-aware hurt prompt cut Hot oil and Spore vent damage on the live NM2 5:00 gym

| Field | Value |
| --- | --- |
| Status | done |
| Area | hazards |
| Result | inconclusive |
| Created | L10.I3 |
| Updated | L10.I4 |

## Hypothesis

Controls on the live 5:00 gym lose 40-50 hp per game to Hot oil and Spore vent, which the one-second forecast sees poorly once pests crowd the moves. A hurt prompt that tells the action model that hazards keep hurting and that boss slams and exploders come in bursts lowers hazard damage with no loss of chests.

## Method

Live nm2-live-min5, 300 s, hurt prompt vs the four control games (damage 67, 94 and the L10.I1/I2 repeats). Record Hot oil, Spore vent and Brambles damage, total damage, hp at 6:00-10:00, chests and time lived. It needs lower hazard damage with equal chests in at least 2 of 3 games to count, so this is a lead after one game.

## Findings

One game: 100 damage with Hot oil 52, no better than controls (67, 94). See B188.

## Games

### L10.I3.G2: hazard-aware hurt prompt, 5:00 gym

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with its own action.hurt.
- Outcome: alive after 300.2s (game clock 10:00), health 120/120; damage taken 100 (Hot oil 52.3, boss:late-blight 47.8); 15259 kills; level 19 to 36; planner asked 132 times, action model 81; the models saw the game 33 ms late (p90 83); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 2, butter-pat 5, fertilizer 4, root-network 5, sprouting-eyes 5.
- Damage taken 100, by source: Hot oil 52.3, boss:late-blight 47.8.
- Damage dealt 1290138, by weapon: overgrowth 583048.6, storm-tot 558151.6, thunder-tuber 126316.4, static-tot 12851.3, mash-snowball 4732.9, pressure-cooker 2531.8, grok-bot 1353.4, tater-twirl 889.9.
- Kills 15259, by weapon: overgrowth 7781, storm-tot 5684, thunder-tuber 1449, static-tot 270, mash-snowball 44, grok-bot 16, pressure-cooker 14, tater-twirl 1.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 1975, spent 30.
- Made: pressure-cooker at 08:06, storm-tot at 07:06.
