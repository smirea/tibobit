# Does avoiding on-dash weapons free level-ups and a slot for stronger picks

| Field | Value |
| --- | --- |
| Status | done |
| Area | models |
| Result | refuted |
| Coach | sonnet-high |
| Created | sonnet-high L2.I10 |
| Updated | sonnet-high L3.I3 |

## Hypothesis

A planner.pick prompt that avoids Mash Landing, Peel Phantom, Julienne Dash, Afterburner Fries and Butter Streak gives more levels on the evolving weapons, since the bot dashes about twice a run.

## Method

From nm2-min5-fresh and nm2-min10-natural, 300s each: default picks vs the avoid-dash prompt, two games each. Compare weapons held, evolutions, level-ups spent on dash weapons and damage.

## Findings

L3.I2: avoid-on-dash prompt died at 3:21 and 3:42 on seeds 3131 and 3333, where baselines survived. Not adopted; Mash Landing waste stays unfixed but the prompt costs more than it saves.

## Games

### L3.I2.G3: avoid dash picks seed 3131

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3131; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 201.8s (game clock 03:21); damage taken 122 (boss:beetle-queen 61.6, enemy:beetle-brood 19.7, enemy:ketchup-drop 9.2, enemy:crumb-ant 8.8); 984 kills; level 1 to 14; planner asked 78 times, action model 370, in lockstep; ended with steam-vent 2, mash-wave 2, comet-scythe 7, harvest-moon 1, hot-potato 1, butter-pat 3, big-bowl 2.
- Damage taken 122, by source: boss:beetle-queen 61.6, enemy:beetle-brood 19.7, enemy:ketchup-drop 9.2, enemy:crumb-ant 8.8, enemy:garden-slug 5.4, enemy:potato-beetle 4.1, enemy:aphid 3.9, enemy:sprout-mite 3.6; the killing blow: boss:beetle-queen.
- Damage dealt 41053, by weapon: mash-wave 16432.1, comet-scythe 14354.2, steam-vent 3326.4, harvest-moon 2860.3, grok-bot 2443.6, hot-potato 1031.4, souffle-spud 604.8.
- Kills 984, by weapon: mash-wave 399, comet-scythe 321, steam-vent 95, grok-bot 81, harvest-moon 66, hot-potato 19, souffle-spud 3.
- Bosses killed 6, elites killed 6, boss chests 4, crates bought 0, shrines used 0, items bought 1, revives used 0; gold earned 339, spent 167.
- Made: no evolution, union or evolved item.

### L3.I2.G4: avoid dash picks seed 3333

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3333; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 222.1s (game clock 03:42); damage taken 191 (enemy:frost-flea 48.8, enemy:snow-mold 32.6, enemy:aphid 28.9, boss:amusing 20.9); 1355 kills; level 1 to 12; planner asked 79 times, action model 550, in lockstep; ended with steam-vent 1, spud-lob 1, potato-rain 8, seed-potato 1, golden-fry 2, butter-pat 1.
- Damage taken 191, by source: enemy:frost-flea 48.8, enemy:snow-mold 32.6, enemy:aphid 28.9, boss:amusing 20.9, enemy:potato-beetle 17.7, enemy:sprout-mite 13.3, enemy:crumb-ant 12.2, enemy:fry-fly 7.4; the killing blow: enemy:fry-fly.
- Damage dealt 44470, by weapon: potato-rain 24304.8, seed-potato 8029.8, spud-lob 6945.2, steam-vent 4994.9, grok-bot 195.4.
- Kills 1355, by weapon: potato-rain 724, spud-lob 324, seed-potato 188, steam-vent 109, grok-bot 10.
- Bosses killed 3, elites killed 4, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 98, spent 0.
- Made: no evolution, union or evolved item.
