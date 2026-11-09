# Does gating elite fights and walking to nests early improve the first minutes on live NM2

| Field | Value |
| --- | --- |
| Status | done |
| Area | spots |
| Result | refuted |
| Created | L4.I10 |
| Updated | L5.I4 |

## Hypothesis

Fight elites only above about 85% hp with few enemies near, and rate a known Beetle Nest highest when hp is above 70% and no boss is within 300; this gets elite chests with less hp lost than fighting wandering elites in a crowd.

## Method

Fresh live NM2 seeds, at least 5 per arm, paired with the unchanged playbook. Compare hp lost per elite fight, elites killed, chests, first evolution and survival.

## Findings

eliteMinHp 0.85 lived 0 of 2 (1919 died 3:42 with 6 chests and no evolution, 4141 died 2:11 with 0 chests and 65 hp lost to a sand-crab with no elite fight). The nest-first rating was not tested. Closed; the hp gate is not adopted.

## Games

### L5.I3.G4: eliteMinHp 0.85 s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with eliteMinHp 0.85.
- Outcome: died after 222.1s (game clock 03:42); damage taken 181 (boss:beetle-queen 35.7, enemy:cave-grub 29.2, enemy:beetle-brood 26.1, enemy:aphid 18.5); 1459 kills; level 1 to 15; planner asked 97 times, action model 497; the models saw the game 29 ms late (p90 62); ended with steam-vent 1, tater-minigun 1, harvest-moon 4, fry-knives 1, julienne-dash 1, afterburner-fries 1, hot-start 1, masher-grip 2, chives 1, potato-magnet 1, starch-plating 3.
- Damage taken 181, by source: boss:beetle-queen 35.7, enemy:cave-grub 29.2, enemy:beetle-brood 26.1, enemy:aphid 18.5, enemy:sprout-mite 17.4, enemy:snow-mold 17.2, Spore vent 9.7, enemy:compost-maggot 8.9; the killing blow: enemy:potato-beetle.
- Damage dealt 58006, by weapon: tater-minigun 31499.6, harvest-moon 8898.1, julienne-dash 7428.3, locked-gatling 4835.1, steam-vent 2502.2, fry-knives 2425.3, grok-bot 270.7, afterburner-fries 146.9.
- Kills 1459, by weapon: tater-minigun 739, harvest-moon 235, locked-gatling 226, julienne-dash 163, steam-vent 42, fry-knives 41, grok-bot 12, afterburner-fries 1.
- Bosses killed 6, elites killed 6, boss chests 6, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 587, spent 0.
- Made: tater-minigun at 01:57.

### L5.I3.G5: eliteMinHp 0.85 s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with eliteMinHp 0.85.
- Outcome: died after 131.1s (game clock 02:11); damage taken 159 (enemy:sand-crab 61.2, boss:amusing 24.3, enemy:potato-beetle 13.1, enemy:aphid 11.1); 191 kills; level 1 to 8; planner asked 50 times, action model 312; the models saw the game 27 ms late (p90 52); ended with steam-vent 4, spud-dynamo 1, broadside 1, gravy-splash 1, root-network 1.
- Damage taken 159, by source: enemy:sand-crab 61.2, boss:amusing 24.3, enemy:potato-beetle 13.1, enemy:aphid 11.1, enemy:sprout-mite 10.1, enemy:ketchup-drop 9.6, Hot oil 8.4, enemy:snow-mold 5; the killing blow: enemy:sand-crab.
- Damage dealt 5354, by weapon: steam-vent 2415.4, broadside 1438.6, spud-dynamo 1401, gravy-splash 98.9.
- Kills 191, by weapon: steam-vent 110, spud-dynamo 35, broadside 34, gravy-splash 12.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 20, spent 0.
- Made: no evolution, union or evolved item.
