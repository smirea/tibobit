# Do the boss dash knobs alone cut Mascot damage from the live pre-Mascot gym

| Field | Value |
| --- | --- |
| Status | done |
| Area | bosses |
| Result | inconclusive |
| Created | L8.I2 |
| Updated | L8.I5 |

## Hypothesis

From the live 1:45 state (hp 38) the unchanged playbook meets the 2:00 Festival Mascot with dashThreshold 0.5 and spends charges on pests. bossDashThreshold 0.25 with bossDashRange 150 keeps a dash for the Mascot, so Mascot damage is lower and the bot survives to 3:45 more often.

## Method

From nm2-live-pre-mascot-b, 120 s: unchanged playbook against boss dash knobs only (dashThreshold stays 0.5). Compare alive at 3:45, damage by source (amusing), dash times and dash scores, and dashes left at 2:00. This is a lead only: two games from one gym.

## Findings

L8.I2.G5 knobs: 35 damage, alive. L8.I4.G5 control: 27 damage, alive. The gym is too easy to separate the arms (B138). Closed.

## Games

### L8.I2.G4: pre-mascot gym control

- Start: gym nm2-live-pre-mascot-b (Nightmare 2 at 01:45), seed ?; 120s; plays the playbook.
- Outcome: not played: the tibo.dog tab is not connected; open it with the userscript installed.

### L8.I2.G5: pre-mascot gym boss dash knobs

- Start: gym nm2-live-pre-mascot-b (Nightmare 2 at 01:45), seed 3HM36M; 120s; plays the playbook with bossDashThreshold 0.25, bossDashRange 150.
- Outcome: alive after 120.3s (game clock 03:45), health 90/120; damage taken 35 (Hot oil 21.7, boss:beetle-queen 8.2, boss:amusing 3.3, enemy:crumb-ant 1.7); 1447 kills; level 8 to 13; planner asked 48 times, action model 123; the models saw the game 31 ms late (p90 59); ended with steam-vent 1, loaded-dice 1, potato-battery 6, tater-twister 1, hot-streak 1, sprouting-eyes 1, four-eyed-spud 2, salt-shaker 1, root-network 1.
- Damage taken 35, by source: Hot oil 21.7, boss:beetle-queen 8.2, boss:amusing 3.3, enemy:crumb-ant 1.7.
- Damage dealt 34736, by weapon: loaded-dice 19383.3, potato-battery 5477.8, spud-dice 3958.7, grok-bot 2254.2, tater-twirl 2008.2, hot-streak 903.7, tater-twister 669.9, steam-vent 80.
- Kills 1447, by weapon: loaded-dice 755, potato-battery 266, spud-dice 195, grok-bot 82, tater-twirl 72, tater-twister 40, hot-streak 35, steam-vent 2.
- Bosses killed 6, elites killed 3, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 558, spent 0.
- Made: loaded-dice at 02:34, tater-twister at 03:22.

### L8.I4.G5: pre-mascot gym control

- Start: gym nm2-live-pre-mascot-b (Nightmare 2 at 01:45), seed 3HM36M; 120s; plays the playbook.
- Outcome: alive after 120.2s (game clock 03:45), health 133/134; damage taken 27 (boss:amusing 13.3, boss:beetle-queen 9.1, Spore vent 2.8, enemy:aphid 1.8); 1497 kills; level 8 to 12; planner asked 49 times, action model 83; the models saw the game 35 ms late (p90 88); ended with steam-vent 5, loaded-dice 1, spud-grid 1, tater-twister 1, sprouting-eyes 1, four-eyed-spud 1, gravy-heart 1, salt-shaker 1, root-network 1.
- Damage taken 27, by source: boss:amusing 13.3, boss:beetle-queen 9.1, Spore vent 2.8, enemy:aphid 1.8.
- Damage dealt 38241, by weapon: loaded-dice 22484.2, potato-battery 5510.8, tater-twister 3123.3, tater-twirl 3038.5, spud-dice 2917.8, spud-grid 1084.8, steam-vent 81.2.
- Kills 1497, by weapon: loaded-dice 984, potato-battery 262, spud-dice 86, tater-twirl 69, spud-grid 49, tater-twister 46, steam-vent 1.
- Bosses killed 6, elites killed 6, boss chests 12, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 828, spent 0.
- Made: loaded-dice at 02:05, tater-twister at 03:07, spud-grid at 03:42.
