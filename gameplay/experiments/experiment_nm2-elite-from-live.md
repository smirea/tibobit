# Does keeping elite fights out of the first 2:30 protect minute-1 hp on live NM2

| Field | Value |
| --- | --- |
| Status | done |
| Area | enemies |
| Result | inconclusive |
| Created | L8.I9 |
| Updated | L8.I10 |

## Hypothesis

Elite fights at 1:00-1:20 cost 37-103 hp in several logs. eliteFrom 150 removes them from the goal options until 2:30. This should leave more hp for the 2:00 Mascot, at some cost to early chests.

## Method

One live fresh game on seed 5353 with boss knobs and eliteFrom 150, paired against the boss-knobs-only game on seed 5353. Compare hp at 1:00 and 2:00, chests, elites killed and survival. One game is a lead only.

## Findings

eliteFrom 150 with the boss knobs on 5353 died 3:22 with 1 elite and 0 chests, longer than the knobs-only game (2:04) but still dead. One game; no benefit shown. See B151.

## Games

### L8.I9.G4: boss knobs + eliteFrom 150 s5353

- Start: a fresh game on Nightmare 2 with steam-vent, seed 5353; 300s; plays the playbook with bossDashThreshold 0.25, bossDashRange 150, eliteFrom 150.
- Outcome: died after 202.5s (game clock 03:22); damage taken 238 (boss:amusing 110.2, enemy:potato-beetle 55.9, enemy:sprout-mite 17.6, enemy:aphid 16.7); 541 kills; level 1 to 10; planner asked 73 times, action model 418; the models saw the game 29 ms late (p90 57); ended with steam-vent 2, peel-lash 1, seeker-sprouts 1, sprout-squad 1, packed-pan 1, starch-plating 3, root-network 1.
- Damage taken 238, by source: boss:amusing 110.2, enemy:potato-beetle 55.9, enemy:sprout-mite 17.6, enemy:aphid 16.7, boss:beetle-queen 11.2, enemy:ketchup-drop 7.4, enemy:bog-slime 5.2, enemy:beetle-brood 5; the killing blow: enemy:potato-beetle.
- Damage dealt 16046, by weapon: peel-lash 6516.9, steam-vent 4238.6, seeker-sprouts 3431.5, sprout-squad 1858.6.
- Kills 541, by weapon: peel-lash 277, steam-vent 128, seeker-sprouts 100, sprout-squad 36.
- Bosses killed 0, elites killed 1, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 22, spent 0.
- Made: no evolution, union or evolved item.
