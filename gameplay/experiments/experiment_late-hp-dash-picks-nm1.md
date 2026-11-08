# Does a pick prompt favouring max hp and dash charges help from 10:00 on Nightmare 1

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | build |
| Result | - |
| Created | sonnet-medium L2.I1 |
| Updated | reset at the restart (L4) |

## Hypothesis

Preferring Butter Socks, Gravy Heart, Stuffed Skin, Thick Skin and Spry Sprout over extra damage passives gives dash charges and a larger hp pool, so the 17:00-18:30 bursts are survivable.

## Method

From nm1-min10-natural-b (10:00) play to 15:00, then from nm1-min16-natural-b: default picks vs the hp/dash pick prompt, two repeats each. Compare max hp, dashes held, damage taken and survival.

## Findings

L1.I10 had 0 dashes and 192 max hp when it died.

Reset at the restart: still running from an earlier loop and measured with lockstep on, so its games need replaying live before they count.

## Games

### L2.I1.G3: titan HP and dash picks

- Start: gym nm1-min16-titan (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: gym nm1-min16-titan is failed.

### L2.I1.G4: titan goal plus picks

- Start: gym nm1-min16-titan (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: not played: gym nm1-min16-titan is failed.

### L2.I2.G3: titan HP and dash picks

- Start: gym nm1-min16-titan-b (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: gym nm1-min16-titan-b is failed.

### L2.I2.G4: titan goal plus picks

- Start: gym nm1-min16-titan-b (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: not played: gym nm1-min16-titan-b is failed.

### L2.I3.G3: titan HP and dash picks

- Start: gym nm1-min16-titan-c (Nightmare 1 at 16:40), seed 143P2NQ; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 270.5s (game clock 21:10); damage taken 298 (boss:fryer-king 216, boss:harvester 69.5, Brambles 6.9, Spore vent 5.2); 127871 kills; level 82 to 101; planner asked 75 times, action model 276, in lockstep; ended with tater-twister 1, permafrost-fries 1, grease-fire 1, julienne-dash 8, reset-button 8, spud-decoy 8, root-network 5, big-bowl 5, hot-start 5, thick-skin 5, starch-plating 5, salt-shaker 5.
- Damage taken 298, by source: boss:fryer-king 216, boss:harvester 69.5, Brambles 6.9, Spore vent 5.2; the killing blow: boss:fryer-king.
- Damage dealt 123555224, by weapon: grease-fire 122542479.2, permafrost-fries 552068.9, tater-twister 360504, reset-button 68733.4, grok-bot 14281.7, julienne-dash 9252.7, spud-decoy 7903.8.
- Kills 127871, by weapon: grease-fire 126763, permafrost-fries 606, tater-twister 436, grok-bot 54, julienne-dash 6, spud-decoy 3, reset-button 3.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 18490, spent 0.
- Made: no evolution, union or evolved item.

### L2.I3.G4: titan goal plus picks

- Start: gym nm1-min16-titan-c (Nightmare 1 at 16:40), seed 143P2NQ; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: died after 217.4s (game clock 20:17); damage taken 175 (boss:harvester 167.6, Brambles 4.8, Hot oil 2.4); 127764 kills; level 82 to 101; planner asked 67 times, action model 270, in lockstep; ended with tater-twister 1, permafrost-fries 1, grease-fire 1, julienne-dash 8, reset-button 8, spud-decoy 8, root-network 5, big-bowl 5, hot-start 5, thick-skin 5, starch-plating 5, salt-shaker 5.
- Damage taken 175, by source: boss:harvester 167.6, Brambles 4.8, Hot oil 2.4; the killing blow: boss:harvester.
- Damage dealt 86717478, by weapon: grease-fire 86193046.2, permafrost-fries 310270.2, tater-twister 143874.7, grok-bot 45621.2, spud-decoy 10172.3, reset-button 8773.4, julienne-dash 5720.2.
- Kills 127764, by weapon: grease-fire 127057, permafrost-fries 417, tater-twister 168, grok-bot 67, reset-button 38, spud-decoy 9, julienne-dash 8.
- Bosses killed 2, elites killed 6, boss chests 8, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 17107, spent 0.
- Made: no evolution, union or evolved item.

### L2.I4.G3: full build hp dash picks

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 89.2s (game clock 18:09); damage taken 564 (boss:compost-titan 208.3, enemy:ice-imp 181.4, boss:ketchup-kraken 168.8, Spore vent 5.7); 10039 kills; level 57 to 62; planner asked 27 times, action model 207, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 564, by source: boss:compost-titan 208.3, enemy:ice-imp 181.4, boss:ketchup-kraken 168.8, Spore vent 5.7; the killing blow: boss:compost-titan.
- Damage dealt 6165211, by weapon: mash-avalanche 1750375.3, pressure-cooker 1204752.7, mandoline-fury 1141886.6, gratin-arc 1123620.5, tater-minigun 905664.4, harvest-moon 35845.9, grok-bot 2146.8, dog:dalmatian 918.4.
- Kills 10039, by weapon: mash-avalanche 2819, pressure-cooker 2109, gratin-arc 1936, mandoline-fury 1808, tater-minigun 1319, harvest-moon 41, grok-bot 6, dog:dalmatian 1.
- Bosses killed 0, elites killed 2, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1571, spent 0.
- Made: no evolution, union or evolved item.
