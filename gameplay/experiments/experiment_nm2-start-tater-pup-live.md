# Does a Tater Tot Pup start (aim-free, Gravy Heart evolution) carry the live NM2 seeds that kill Steam Vent

| Field | Value |
| --- | --- |
| Status | running |
| Area | build |
| Result | - |
| Created | L8.I3 |
| Updated | L8.I3 |

## Hypothesis

Tater Tot Pup follows Tibo and shoots on its own, so a walk-only bot gets steady early damage. It evolves into Gravy Pack with Gravy Heart, which adds max hp and heals on each bite. That gives early elites and chests and softens minute 0-1 chip damage, where Steam Vent games dealt only about 4000 damage by 2:15.

## Method

Two fresh live NM2 games of 300s with tater-pup and the unchanged playbook on 1919 and 4141, where Steam Vent controls died 0 of 4 (2:30, 2:35, 3:06, 1:50). Compare alive at 5:00, hp at 1:00 and 2:00, damage dealt by 2:15, chests, first evolution and elites killed. Two seeds is a lead only; 4 of 5 alive with an evolution by about 2:30 would be needed across five seeds.

## Findings

(none yet)

## Games

### L8.I3.G4: tater-pup start s1919

- Start: a fresh game on Nightmare 2 with tater-pup, seed 1919; 300s; plays the playbook.
- Outcome: not played: slot4: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I3.G5: tater-pup start s4141

- Start: a fresh game on Nightmare 2 with tater-pup, seed 4141; 300s; plays the playbook.
- Outcome: died after 165.3s (game clock 02:45); damage taken 226 (enemy:potato-beetle 70, boss:amusing 52.1, enemy:wireworm-larva 42.4, Spore vent 12.1); 433 kills; level 1 to 9; planner asked 63 times, action model 342; the models saw the game 29 ms late (p90 56); ended with tater-pup 5, hot-potato 1, steam-vent 1, hash-hawk 1, gravy-heart 4.
- Damage taken 226, by source: enemy:potato-beetle 70, boss:amusing 52.1, enemy:wireworm-larva 42.4, Spore vent 12.1, enemy:aphid 10.7, enemy:sprout-mite 10.5, enemy:little-grey 5.7, enemy:cave-grub 5.7; the killing blow: boss:amusing.
- Damage dealt 15844, by weapon: hot-potato 6814.9, tater-pup 4618, hash-hawk 3154.2, steam-vent 1257.1.
- Kills 433, by weapon: hot-potato 222, tater-pup 174, steam-vent 26, hash-hawk 11.
- Bosses killed 1, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 122, spent 0.
- Made: no evolution, union or evolved item.
