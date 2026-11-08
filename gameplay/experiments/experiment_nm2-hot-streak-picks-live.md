# Can a pick prompt steer a Steam Vent start into Hot Streak plus Thick Skin and lift live NM2 survival

| Field | Value |
| --- | --- |
| Status | done |
| Area | build |
| Result | refuted |
| Created | L4.I5 |
| Updated | L4.I6 |

## Hypothesis

Every live NM2 survivor with an early evolution held Hot Streak, and the Hot Streak 1 plus Thick Skin 1 loadout lived 2 of 2 on the dying seeds. A pick prompt that takes Hot Streak whenever it is offered, then Thick Skin to evolve it into Wildfire Roast, with at most 3 weapons and no on-dash weapons, gets an evolution by about 2:00 and lives 5:00 on 1919 and 4141 without breaking 2020 and 4242.

## Method

Fresh live NM2 Steam Vent, 300 s, seeds 1919, 4141, 2020 and 4242, with the Hot Streak pick prompt and everything else unchanged. Compare against the existing unchanged-playbook controls on the same seeds: survival, first evolution time, chests by 4:00 and minute-1 damage. Note on each seed whether Hot Streak was ever offered. At least 5 seeds per arm are needed before calling it.

## Findings

L4.I5: lived 1 of 4. 1919 died 2:10 and 4141 died 2:09 (Steam Vent 5/8, 0 chests, no evolution), 4242 died 3:16, 2020 lived without Wildfire Roast. No better than controls on the dying seeds. Not adopted.

## Games

### L4.I5.G1: hot-streak picks s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 130s (game clock 02:10); damage taken 151 (enemy:snow-mold 95.6, enemy:potato-beetle 21, enemy:frost-flea 8.2, boss:amusing 7); 184 kills; level 1 to 7; planner asked 44 times, action model 535; the models saw the game 29 ms late (p90 49); ended with steam-vent 5, peel-out 1, root-network 1.
- Damage taken 151, by source: enemy:snow-mold 95.6, enemy:potato-beetle 21, enemy:frost-flea 8.2, boss:amusing 7, enemy:swarm-fly 5.8, enemy:cave-grub 2.6, enemy:sprout-mite 2.4, enemy:bowling-pin 2.2; the killing blow: boss:amusing.
- Damage dealt 5333, by weapon: steam-vent 5332.6.
- Kills 184, by weapon: steam-vent 184.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 12, spent 0.
- Made: no evolution, union or evolved item.

### L4.I5.G2: hot-streak picks s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 129.3s (game clock 02:09); damage taken 221 (enemy:sand-crab 100, boss:amusing 62.6, enemy:aphid 12.2, enemy:spittlebug 12.1); 114 kills; level 1 to 6; planner asked 45 times, action model 489; the models saw the game 29 ms late (p90 49); ended with steam-vent 5, root-network 1.
- Damage taken 221, by source: enemy:sand-crab 100, boss:amusing 62.6, enemy:aphid 12.2, enemy:spittlebug 12.1, enemy:fry-fly 8.9, enemy:potato-beetle 7.1, enemy:wireworm-larva 5.7, enemy:sprout-mite 5.1; the killing blow: boss:amusing.
- Damage dealt 3024, by weapon: steam-vent 3024.2.
- Kills 114, by weapon: steam-vent 114.
- Bosses killed 0, elites killed 1, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 7, spent 0.
- Made: no evolution, union or evolved item.

### L4.I5.G3: hot-streak picks s2020 regression

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2020; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.2s (game clock 05:00), health 207/207; damage taken 83 (enemy:garden-slug 21.8, Hot oil 15.2, enemy:potato-beetle 8.2, boss:amusing 5.9); 2941 kills; level 1 to 19; planner asked 142 times, action model 222; the models saw the game 29 ms late (p90 59); ended with pressure-cooker 1, spark-corral 1, mash-golem 1, hot-streak 4, starch-plating 5, root-network 5, gpu 5, gravy-heart 5, stuffed-skin 1, thick-skin 1.
- Damage taken 83, by source: enemy:garden-slug 21.8, Hot oil 15.2, enemy:potato-beetle 8.2, boss:amusing 5.9, enemy:fry-fly 5.7, boss:beetle-queen 5.6, enemy:sprout-mite 4.7, enemy:oil-drip 2.9.
- Damage dealt 121652, by weapon: pressure-cooker 66533.7, spark-corral 34132.4, spud-fence 8841, grok-bot 5088.3, hot-streak 4342.6, steam-vent 1655.2, alex 704.8, mash-golem 354.3.
- Kills 2941, by weapon: pressure-cooker 1695, spark-corral 600, spud-fence 335, grok-bot 145, hot-streak 97, steam-vent 45, alex 22, mash-golem 2.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1283, spent 0.
- Made: pressure-cooker at 01:25, spark-corral at 03:05.

### L4.I5.G4: hot-streak picks s4242 regression

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4242; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 196s (game clock 03:16); damage taken 205 (enemy:cave-grub 85, boss:beetle-queen 25.6, enemy:sprout-mite 18.1, enemy:aphid 15.7); 973 kills; level 1 to 12; planner asked 72 times, action model 693; the models saw the game 28 ms late (p90 52); ended with steam-vent 4, spud-fence 2, mezzaluna 1, tater-mines 1, stuffed-skin 2, packed-pan 1, root-network 1.
- Damage taken 205, by source: enemy:cave-grub 85, boss:beetle-queen 25.6, enemy:sprout-mite 18.1, enemy:aphid 15.7, boss:amusing 10.4, enemy:potato-beetle 8.8, enemy:sand-crab 8, enemy:compost-maggot 7.6; the killing blow: boss:beetle-queen.
- Damage dealt 31973, by weapon: spud-fence 16432.1, steam-vent 7689.5, mezzaluna 3076.8, alex 2813.8, tater-mines 1128.5, grok-bot 832.7.
- Kills 973, by weapon: spud-fence 473, steam-vent 187, mezzaluna 128, alex 88, grok-bot 49, tater-mines 48.
- Bosses killed 3, elites killed 3, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 75, spent 0.
- Made: no evolution, union or evolved item.
