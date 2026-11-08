# Does ranking free spots (Spud Shrine, Whetstone, Stray Dog) after chests and elites raise early power on live NM2

| Field | Value |
| --- | --- |
| Status | done |
| Area | spots |
| Result | inconclusive |
| Created | L4.I3 |
| Updated | L4.I4 |

## Hypothesis

Shrines, whetstones and dogs are free power that the bot almost never uses (shrines used 0 in most games). Ranking them after chests and elites, with no boss within 200 units, adds stats or a weapon level before 2:00 without extra damage.

## Method

L4.I3: fresh live NM2 seed 1919, 300s, the goal text with a free-spot clause (the 10:00 gold sentence is omitted because the game ends at 5:00). Compare with the 1919 control (died 2:30, shrines used 0): spots done, shrines used, chests, hp at 2:00 and survival. One game is a lead; if spots are reached without more damage, repeat on 4141, 2020 and 4242.

## Findings

L4.I3.G5 seed 1919: 1 shrine used, 10 evades, 0 chests, died 2:40 (control 2:30). No sign of benefit; one game. Spots stay unranked in the opening.

## Games

### L4.I3.G5: free spots after chests s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 160.4s (game clock 02:40); damage taken 238 (enemy:sand-crab 52.8, boss:amusing 48.7, enemy:crumb-ant 31.1, enemy:bowling-ball 25); 437 kills; level 1 to 9; planner asked 56 times, action model 669; the models saw the game 28 ms late (p90 51); ended with steam-vent 2, fry-lance 5, root-network 2, spud-sneakers 1.
- Damage taken 238, by source: enemy:sand-crab 52.8, boss:amusing 48.7, enemy:crumb-ant 31.1, enemy:bowling-ball 25, enemy:potato-beetle 17, enemy:aphid 13.9, enemy:oil-drip 13.8, enemy:sprout-mite 11.8; the killing blow: boss:amusing.
- Damage dealt 14517, by weapon: fry-lance 11534.8, steam-vent 2982.1.
- Kills 437, by weapon: fry-lance 369, steam-vent 68.
- Bosses killed 0, elites killed 6, boss chests 0, crates bought 0, shrines used 1, items bought 0, revives used 0; gold earned 33, spent 0.
- Made: no evolution, union or evolved item.
