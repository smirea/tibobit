# Does rating xp gems above exploring before 2:30 give earlier levels and survive the live NM2 opening

| Field | Value |
| --- | --- |
| Status | done |
| Area | models |
| Result | refuted |
| Created | L8.I6 |
| Updated | L8.I7 |

## Hypothesis

Explore finds nothing in the first 2 minutes (B117) and walks into new pests. Collecting gems for up to 20 s instead gives levels, picks and an earlier evolution without crossing the map, so the bot reaches 2:00 with more hp and power.

## Method

Live fresh NM2 steam-vent on 1919 and 4141 (controls died 2:30/2:35 and 3:06/1:50), 300s, with the gems-first text and gemsSeconds 20. Compare hp at 1:00 and 2:00, level at 2:00, chests, first evolution and survival. Two seeds is a lead; the bar is 4 of 5 alive with an evolution by about 2:30, so extend to 1313, 2121 and 4444 if promising.

## Findings

L8.I6: 0 of 2 alive (1919 and 4141 both died 2:38 with 0 chests and no evolution, minute-1 hp loss 77-81). Same as the controls. See B141.

## Games

### L8.I6.G4: gems over explore before 2:30 s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with gemsSeconds 20, its own planner.goal.
- Outcome: died after 158.9s (game clock 02:38); damage taken 253 (boss:amusing 93.8, enemy:potato-beetle 83, enemy:aphid 21.9, enemy:bog-slime 12.7); 517 kills; level 1 to 10; planner asked 55 times, action model 550; the models saw the game 29 ms late (p90 53); ended with steam-vent 6, starch-bolt 2, root-network 1, bacon-bits 1.
- Damage taken 253, by source: boss:amusing 93.8, enemy:potato-beetle 83, enemy:aphid 21.9, enemy:bog-slime 12.7, enemy:sprout-mite 11.3, enemy:tomato-leech 11.2, enemy:cave-grub 7.6, Brambles 7.4; the killing blow: boss:amusing.
- Damage dealt 13391, by weapon: starch-bolt 6632.9, steam-vent 5892.3, grok-bot 866.2.
- Kills 517, by weapon: starch-bolt 274, steam-vent 201, grok-bot 42.
- Bosses killed 0, elites killed 3, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 54, spent 0.
- Made: no evolution, union or evolved item.

### L8.I6.G5: gems over explore before 2:30 s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with gemsSeconds 20, its own planner.goal.
- Outcome: died after 158s (game clock 02:38); damage taken 307 (boss:amusing 107.7, enemy:sand-crab 69.4, enemy:potato-beetle 30.8, enemy:aphid 19.1); 414 kills; level 1 to 10; planner asked 53 times, action model 608; the models saw the game 29 ms late (p90 50); ended with steam-vent 5, sprout-squad 1, root-network 2, peel-out 2.
- Damage taken 307, by source: boss:amusing 107.7, enemy:sand-crab 69.4, enemy:potato-beetle 30.8, enemy:aphid 19.1, enemy:garden-slug 12.9, enemy:frost-flea 10.5, enemy:sprout-mite 8.3, enemy:compost-maggot 6.7; the killing blow: boss:amusing.
- Damage dealt 11753, by weapon: steam-vent 11096.4, sprout-squad 656.5.
- Kills 414, by weapon: steam-vent 404, sprout-squad 10.
- Bosses killed 0, elites killed 3, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 48, spent 0.
- Made: no evolution, union or evolved item.
