# Does a pick rule that takes Starch Plating early reproduce the plating-3 loadout on deep-fryer starts

| Field | Value |
| --- | --- |
| Status | done |
| Area | build |
| Result | refuted |
| Created | L9.I6 |
| Updated | L9.I7 |

## Hypothesis

Taking Starch Plating when offered (up to 3), then levelling Deep Fryer and taking Bacon Bits, gives the armor that let the loadout arm live, without a loadout.

## Method

Live fresh NM2 deep-fryer on s6363, s6565 and s6161 with the pick prompt, paired against plain deep-fryer (0 of 3) and plating 3 (2 of 3). Record Starch Plating level and when it was taken, minute 0-1 hp loss, hp at 2:00, chests, evolution and survival.

## Findings

Lived 0 of 3 with no Starch Plating taken and 0 chests (B167). Closed.

## Games

### L9.I6.G1: fryer plating picks s6363

- Start: a fresh game on Nightmare 2 with deep-fryer, seed 6363; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 140.1s (game clock 02:20); damage taken 149 (enemy:potato-beetle 75.8, boss:amusing 20.9, enemy:aphid 19.4, enemy:sprout-mite 18.3); 194 kills; level 1 to 7; planner asked 50 times, action model 362; the models saw the game 29 ms late (p90 48); ended with deep-fryer 2, skillet-flail 1, thick-skin 3, chives 1.
- Damage taken 149, by source: enemy:potato-beetle 75.8, boss:amusing 20.9, enemy:aphid 19.4, enemy:sprout-mite 18.3, enemy:crumb-ant 6.8, enemy:oil-drip 3.7, enemy:fry-fly 2.9, enemy:bog-slime 1.6; the killing blow: enemy:crumb-ant.
- Damage dealt 3931, by weapon: deep-fryer 3889.6, skillet-flail 41.6.
- Kills 194, by weapon: deep-fryer 193, skillet-flail 1.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 8, spent 0.
- Made: no evolution, union or evolved item.

### L9.I6.G2: fryer plating picks s6565

- Start: a fresh game on Nightmare 2 with deep-fryer, seed 6565; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 128.4s (game clock 02:08); damage taken 151 (enemy:potato-beetle 42, enemy:ketchup-drop 30.4, enemy:wireworm-larva 14.8, boss:amusing 10.4); 165 kills; level 1 to 7; planner asked 46 times, action model 344; the models saw the game 31 ms late (p90 49); ended with deep-fryer 4, hot-start 3.
- Damage taken 151, by source: enemy:potato-beetle 42, enemy:ketchup-drop 30.4, enemy:wireworm-larva 14.8, boss:amusing 10.4, enemy:tomato-leech 9.2, enemy:aphid 8.3, Hot oil 8, enemy:fry-fly 7.6; the killing blow: boss:amusing.
- Damage dealt 4294, by weapon: deep-fryer 4204.1, grok-bot 90.2.
- Kills 165, by weapon: deep-fryer 159, grok-bot 6.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 10, spent 0.
- Made: no evolution, union or evolved item.

### L9.I6.G3: fryer plating picks s6161

- Start: a fresh game on Nightmare 2 with deep-fryer, seed 6161; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 82.3s (game clock 01:22); damage taken 138 (enemy:garden-slug 38.1, enemy:bowling-ball 27.5, enemy:bowling-pin 13.9, enemy:crumb-ant 13.5); 78 kills; level 1 to 5; planner asked 35 times, action model 143; the models saw the game 28 ms late (p90 48); ended with deep-fryer 3, thick-skin 2.
- Damage taken 138, by source: enemy:garden-slug 38.1, enemy:bowling-ball 27.5, enemy:bowling-pin 13.9, enemy:crumb-ant 13.5, enemy:aphid 12.4, enemy:wireworm-larva 11.8, enemy:potato-beetle 8.1, enemy:compost-maggot 4.3; the killing blow: enemy:crumb-ant.
- Damage dealt 1545, by weapon: deep-fryer 1408.4, grok-bot 136.6.
- Kills 78, by weapon: deep-fryer 72, grok-bot 6.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 3, spent 0.
- Made: no evolution, union or evolved item.
