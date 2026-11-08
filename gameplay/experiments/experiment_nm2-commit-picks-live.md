# Do commit-the-weapon picks (starting weapon to 8, then its catalyst, at most 3 weapons, no on-dash weapons) lift live NM2 survival

| Field | Value |
| --- | --- |
| Status | done |
| Area | build |
| Result | refuted |
| Created | sonnet-high L3.I10 |
| Updated | L4.I4 |

## Hypothesis

Leveling Steam Vent first and taking Root Network only after it, with at most 3 weapons and no on-dash weapons, gives an evolution by about 3:00 and more damage, and raises live survival at 5:00 above the 1 of 6 baseline.

## Method

Fresh live NM2 steam-vent, 300s, at least 5 paired seeds: default picks vs the commit prompt. Compare first evolution time, damage dealt, weapons held, damage taken by source, survival at 5:00.

## Findings

L4.I3: commit picks died 0 of 2 live (1919 at 2:19, 4141 at 2:12), earlier than controls, with 0 chests and Steam Vent 3-4/8. Not adopted. The starting weapon's early damage is the limit, not pick order.

## Games

### L4.I3.G1: commit picks s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 139.6s (game clock 02:19); damage taken 140 (enemy:potato-beetle 53.7, boss:amusing 41.7, enemy:aphid 19.5, enemy:frost-flea 10.5); 160 kills; level 1 to 7; planner asked 50 times, action model 433; the models saw the game 30 ms late (p90 50); ended with steam-vent 4, peel-out 1, hash-rush 2, root-network 1.
- Damage taken 140, by source: enemy:potato-beetle 53.7, boss:amusing 41.7, enemy:aphid 19.5, enemy:frost-flea 10.5, enemy:cave-grub 5.6, enemy:compost-maggot 4.6, enemy:sprout-mite 4; the killing blow: boss:amusing.
- Damage dealt 3932, by weapon: steam-vent 3932.1.
- Kills 160, by weapon: steam-vent 160.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 11, spent 0.
- Made: no evolution, union or evolved item.

### L4.I3.G2: commit picks s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 132.9s (game clock 02:12); damage taken 203 (boss:amusing 111.2, enemy:sprout-mite 26.2, enemy:potato-beetle 16.8, enemy:snow-mold 16.5); 195 kills; level 1 to 8; planner asked 50 times, action model 385; the models saw the game 28 ms late (p90 50); ended with steam-vent 3, hot-potato 1, root-network 3, hot-sauce 1.
- Damage taken 203, by source: boss:amusing 111.2, enemy:sprout-mite 26.2, enemy:potato-beetle 16.8, enemy:snow-mold 16.5, enemy:frost-flea 9.3, enemy:aphid 6.6, enemy:swarm-fly 5.8, enemy:crumb-ant 4.2; the killing blow: boss:amusing.
- Damage dealt 4197, by weapon: steam-vent 3738.4, hot-potato 458.1.
- Kills 195, by weapon: steam-vent 178, hot-potato 17.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 27, spent 0.
- Made: no evolution, union or evolved item.
