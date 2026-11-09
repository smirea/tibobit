# Does a finish-the-current-goal rule stop elite and nest goal flip-flopping in the live NM2 opening

| Field | Value |
| --- | --- |
| Status | done |
| Area | models |
| Result | inconclusive |
| Created | L8.I5 |
| Updated | L8.I6 |

## Hypothesis

In the L4.I10 full run elite goals flipped every 5 s and killed nothing (14 goals, 0 kills). Telling the planner to rate other goals below the current one unless a boss is within 150 or hp is under 30% lets goals finish, so chests, elite kills and an evolution come earlier. The change is a commitment rule using {{current_goal}}, not a reworded priority order.

## Method

Fresh live NM2 steam-vent on seed 4141 (controls died 3:06 and 1:50), 300s, with the commitment goal text and everything else unchanged. Compare goals by kind (done, gave up, dropped), chests, first evolution, hp at 1:00 and 2:00, and survival. One game is a lead only; repeat on 1919, 2121, 1313 and 4444 if promising.

## Findings

L8.I5.G5 on s4141 died 2:33, no better than controls. One game; not pursued.

## Games

### L8.I5.G5: finish current goal text s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 153.7s (game clock 02:33); damage taken 232 (boss:amusing 125.1, enemy:aphid 26.4, enemy:little-grey 21.8, enemy:snow-mold 11.1); 653 kills; level 1 to 11; planner asked 62 times, action model 389; the models saw the game 29 ms late (p90 53); ended with steam-vent 5, mash-landing 1, tot-toss 2, hot-streak 1, spud-lob 1, potato-rain 2, gravy-heart 1, root-network 1.
- Damage taken 232, by source: boss:amusing 125.1, enemy:aphid 26.4, enemy:little-grey 21.8, enemy:snow-mold 11.1, enemy:sprout-mite 10.6, enemy:compost-maggot 10.4, enemy:frost-flea 9.3, enemy:cave-grub 5.5; the killing blow: boss:amusing.
- Damage dealt 17131, by weapon: hot-streak 6712.7, steam-vent 4211.2, tot-toss 2399.3, spud-lob 2278.4, potato-rain 1467, mash-landing 62.6.
- Kills 653, by weapon: hot-streak 296, steam-vent 125, spud-lob 98, tot-toss 85, potato-rain 45, mash-landing 4.
- Bosses killed 1, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 122, spent 0.
- Made: no evolution, union or evolved item.
