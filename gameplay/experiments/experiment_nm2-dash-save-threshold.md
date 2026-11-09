# Does a higher normal dashThreshold save charges for the Mascot on live NM2

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | refuted |
| Created | L5.I3 |
| Updated | L5.I4 |

## Hypothesis

dashThreshold 0.75 together with bossDashThreshold 0.25 and bossDashRange 150 stops dash charges going to minute-0/1 pests and keeps them for the 2:00 Mascot, so it lives the seeds (2121, 1313) where the boss knobs alone died.

## Method

Live fresh NM2 steam-vent games of 300s on 2121 and 1313, paired with the boss-knobs-only games from L5.I2 (both died) and the unchanged controls (both died). Compare dash count and timing, hp at 2:00, Mascot damage and survival. Two seeds is a lead only.

## Findings

dashThreshold 0.75 plus boss knobs lived 0 of 2 (2121 died 2:18, 1313 died 1:45 with 0 dashes), earlier than boss knobs alone. Dash scores sit at 0.51-0.55, so 0.75 disables dashing.

## Games

### L5.I3.G2: dash 0.75 plus boss 0.25/150 s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with dashThreshold 0.75, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: died after 138.2s (game clock 02:18); damage taken 124 (enemy:cave-grub 60.7, boss:amusing 48.7, enemy:sprout-mite 4.9, enemy:aphid 4); 612 kills; level 1 to 10; planner asked 57 times, action model 432; the models saw the game 29 ms late (p90 52); ended with steam-vent 1, mash-snowball 2, whisk-vortex 6, seed-potato 1, julienne-dash 1, locked-gatling 1, masher-grip 2, big-bowl 1.
- Damage taken 124, by source: enemy:cave-grub 60.7, boss:amusing 48.7, enemy:sprout-mite 4.9, enemy:aphid 4, enemy:compost-maggot 2.8, enemy:ketchup-drop 2.4; the killing blow: boss:amusing.
- Damage dealt 17710, by weapon: whisk-vortex 7275.5, mash-snowball 4496.9, locked-gatling 2697.6, seed-potato 1450.1, julienne-dash 993.5, steam-vent 668.8, grok-bot 128.1.
- Kills 612, by weapon: whisk-vortex 270, mash-snowball 158, locked-gatling 72, seed-potato 63, steam-vent 23, julienne-dash 18, grok-bot 8.
- Bosses killed 3, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 195, spent 0.
- Made: no evolution, union or evolved item.

### L5.I3.G3: dash 0.75 plus boss 0.25/150 s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with dashThreshold 0.75, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: died after 105.1s (game clock 01:45); damage taken 124 (enemy:sand-crab 43.8, enemy:potato-beetle 37.8, enemy:compost-maggot 7.9, enemy:cave-grub 6.5); 173 kills; level 1 to 7; planner asked 41 times, action model 338; the models saw the game 30 ms late (p90 52); ended with steam-vent 1, spud-dynamo 2, rosti-disc 2, starch-plating 1, butter-socks 1.
- Damage taken 124, by source: enemy:sand-crab 43.8, enemy:potato-beetle 37.8, enemy:compost-maggot 7.9, enemy:cave-grub 6.5, enemy:sprout-mite 5.5, enemy:fry-fly 5.1, enemy:parking-gull 4.7, enemy:crumb-ant 4; the killing blow: enemy:sand-crab.
- Damage dealt 4495, by weapon: steam-vent 1521.2, spud-dynamo 1520.2, rosti-disc 1453.1.
- Kills 173, by weapon: spud-dynamo 65, steam-vent 58, rosti-disc 50.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 22, spent 0.
- Made: no evolution, union or evolved item.
