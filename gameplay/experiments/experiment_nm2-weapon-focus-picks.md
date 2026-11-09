# Does levelling one strong weapon with at most three weapons beat scattering picks on live NM2

| Field | Value |
| --- | --- |
| Status | done |
| Area | build |
| Result | refuted |
| Created | L4.I10 |
| Updated | L5.I5 |

## Hypothesis

A pick prompt that levels the strongest weapon held (and takes its catalyst when it reaches max-1), allows at most 3 weapons and bans on-dash weapons, gives levels above 3 and an earlier evolution than default picks, and lowers early damage taken.

## Method

L5.I4: five fresh live NM2 steam-vent games of 300s on 1919, 4141, 2121, 1313, 4444 (unchanged-playbook controls all died, 0 of 5), changing only planner.pick: up to 3 aim-free non-dash weapons, then level the highest-level held weapon, catalyst at level 5+, no on-dash weapons, no 4th weapon. Compare weapon levels at 2:00 and 4:00, first evolution, chests, damage and survival. Confirmed only at 4 of 5 alive at 5:00 with an evolution by about 2:30; refuted at 2 or fewer.

## Findings

L5.I4: 0 of 5 alive at 5:00 (died 2:09-2:24, four to the Mascot), no evolution in any game, controls 0 of 5. Prompt not adopted. See B128.

## Games

### L5.I4.G1: focus picks s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 144.8s (game clock 02:24); damage taken 161 (boss:amusing 88, enemy:wireworm-larva 56, enemy:potato-beetle 4.8, enemy:sprout-mite 3.7); 497 kills; level 1 to 9; planner asked 61 times, action model 272; the models saw the game 28 ms late (p90 52); ended with steam-vent 1, locked-gatling 1, comet-scythe 7, root-cellar 1, hot-sauce 1, big-bowl 1.
- Damage taken 161, by source: boss:amusing 88, enemy:wireworm-larva 56, enemy:potato-beetle 4.8, enemy:sprout-mite 3.7, enemy:tomato-leech 2.9, enemy:aphid 2.4, enemy:bog-slime 1.9, enemy:compost-maggot 1.7; the killing blow: boss:amusing.
- Damage dealt 12837, by weapon: locked-gatling 5377.7, comet-scythe 4364.5, root-cellar 1456.9, grok-bot 953.1, steam-vent 685.1.
- Kills 497, by weapon: comet-scythe 205, locked-gatling 200, grok-bot 49, root-cellar 24, steam-vent 19.
- Bosses killed 0, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 144, spent 0.
- Made: no evolution, union or evolved item.

### L5.I4.G2: focus picks s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 141.8s (game clock 02:21); damage taken 211 (boss:amusing 107.7, enemy:potato-beetle 48.9, enemy:snow-mold 23, Spore vent 8.7); 529 kills; level 1 to 9; planner asked 56 times, action model 345; the models saw the game 28 ms late (p90 49); ended with steam-vent 8, mash-golem 2, gravy-boat 4.
- Damage taken 211, by source: boss:amusing 107.7, enemy:potato-beetle 48.9, enemy:snow-mold 23, Spore vent 8.7, enemy:sprout-mite 8.4, enemy:aphid 6, enemy:frost-flea 5.7, enemy:oil-drip 1.6; the killing blow: boss:amusing.
- Damage dealt 15143, by weapon: gravy-boat 8031.4, steam-vent 6407.5, mash-golem 565, grok-bot 138.9.
- Kills 529, by weapon: gravy-boat 253, steam-vent 245, mash-golem 25, grok-bot 6.
- Bosses killed 0, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 217, spent 0.
- Made: no evolution, union or evolved item.

### L5.I4.G3: focus picks s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 134.3s (game clock 02:14); damage taken 139 (enemy:tomato-leech 78.8, boss:amusing 17.6, enemy:sand-crab 16.3, enemy:frost-flea 10.1); 286 kills; level 1 to 9; planner asked 47 times, action model 580; the models saw the game 28 ms late (p90 49); ended with steam-vent 1, mash-snowball 3, potato-rain 4, butter-pat 1, starch-plating 1.
- Damage taken 139, by source: enemy:tomato-leech 78.8, boss:amusing 17.6, enemy:sand-crab 16.3, enemy:frost-flea 10.1, enemy:sprout-mite 5.8, enemy:snow-mold 3.3, enemy:oil-drip 2, enemy:bog-slime 1.6; the killing blow: boss:amusing.
- Damage dealt 12348, by weapon: mash-snowball 8995.6, potato-rain 2052.3, steam-vent 971.9, grok-bot 327.7.
- Kills 286, by weapon: mash-snowball 208, potato-rain 59, steam-vent 13, grok-bot 6.
- Bosses killed 0, elites killed 8, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 113, spent 0.
- Made: no evolution, union or evolved item.

### L5.I4.G4: focus picks s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 129.1s (game clock 02:09); damage taken 137 (enemy:sand-crab 47.2, boss:amusing 24.3, enemy:potato-beetle 17.4, enemy:aphid 12.4); 205 kills; level 1 to 7; planner asked 46 times, action model 485; the models saw the game 28 ms late (p90 50); ended with steam-vent 2, potato-rain 2, mash-finisher 1, bacon-bits 2.
- Damage taken 137, by source: enemy:sand-crab 47.2, boss:amusing 24.3, enemy:potato-beetle 17.4, enemy:aphid 12.4, enemy:oil-drip 7.9, enemy:compost-maggot 7.6, enemy:crumb-ant 6.8, enemy:sprout-mite 6.8; the killing blow: boss:amusing.
- Damage dealt 5394, by weapon: potato-rain 2949.7, steam-vent 2444.2.
- Kills 205, by weapon: potato-rain 109, steam-vent 96.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 12, spent 0.
- Made: no evolution, union or evolved item.

### L5.I4.G5: focus picks s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 131.1s (game clock 02:11); damage taken 174 (boss:amusing 76.5, enemy:fry-fly 60.7, Hot oil 10.3, enemy:aphid 9.5); 359 kills; level 1 to 9; planner asked 52 times, action model 408; the models saw the game 29 ms late (p90 50); ended with steam-vent 2, root-spikes 4, tater-twirl 1, potato-rain 3, gravy-heart 1.
- Damage taken 174, by source: boss:amusing 76.5, enemy:fry-fly 60.7, Hot oil 10.3, enemy:aphid 9.5, enemy:sprout-mite 5.4, enemy:potato-beetle 4.9, enemy:oil-drip 3.7, enemy:crumb-ant 2.8; the killing blow: boss:amusing.
- Damage dealt 9694, by weapon: tater-twirl 3630.9, root-spikes 3132.2, potato-rain 1930.1, steam-vent 938.6, grok-bot 62.2.
- Kills 359, by weapon: root-spikes 130, tater-twirl 129, potato-rain 78, steam-vent 18, grok-bot 4.
- Bosses killed 0, elites killed 3, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 89, spent 0.
- Made: no evolution, union or evolved item.
