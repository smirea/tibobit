# Does ranking free Spud Whetstone and Spud Shrine first from 5:00 add power before the 6:00-8:00 bosses on live NM2

| Field | Value |
| --- | --- |
| Status | done |
| Area | spots |
| Result | inconclusive |
| Created | L8.I6 |
| Updated | L8.I7 |

## Hypothesis

Spud Whetstones level a weapon and Spud Shrines give a stat for free. Rating them above chests from 5:00 when no boss is near, with stuckSeconds 10 so a charge is not abandoned, adds weapon levels and stats and lowers 5:00-10:00 damage compared with the unchanged playbook from the same live gym state.

## Method

From nm2-live-min5 (5:00, hp 149), 300s: one game with the free-spots text and stuckSeconds 10, compared with the control games (L8.I5.G3 and the L8.I6 repeat). Compare whetstones and shrines used, weapon levels, damage by boss, minimum hp and survival to 10:00. One game is a lead only.

## Findings

L8.I6.G3: died 7:03 with 6 shrines used and 0 chests, no better than controls (8:04, 7:06). One game. See B143.

## Games

### L8.I6.G3: min5 gym free spots first, stuck 10

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with stuckSeconds 10, its own planner.goal.
- Outcome: died after 122.9s (game clock 07:03); damage taken 178 (boss:sir-strawman 87.1, boss:late-blight 69.4, enemy:bowling-ball 8.2, enemy:blight-spore 7.2); 4585 kills; level 18 to 21; planner asked 41 times, action model 211; the models saw the game 31 ms late (p90 66); ended with steam-vent 2, gem-sling 1, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, broadside 3, gravy-splash 1, sour-cream 4, root-network 1, hot-sauce 1, masher-grip 1, mash-finisher 1.
- Damage taken 178, by source: boss:sir-strawman 87.1, boss:late-blight 69.4, enemy:bowling-ball 8.2, enemy:blight-spore 7.2, Hot oil 6.5; the killing blow: boss:sir-strawman.
- Damage dealt 216032, by weapon: spicy-hot-potato 150055.1, hashnado 50776.4, mash-avalanche 13311.9, broadside 1234.8, gem-sling 578.1, steam-vent 70.8, gravy-splash 5.4.
- Kills 4585, by weapon: spicy-hot-potato 3296, hashnado 1127, mash-avalanche 148, broadside 10, gem-sling 4.
- Bosses killed 3, elites killed 3, boss chests 0, crates bought 0, shrines used 6, items bought 0, revives used 0; gold earned 119, spent 0.
- Made: no evolution, union or evolved item.
