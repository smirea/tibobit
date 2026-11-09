# Do mid-game hp and regen picks raise survival from 5:00 on NM2

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | build |
| Result | - |
| Created | L9.I10 |
| Updated | L10.I2 |

## Hypothesis

A pick prompt that, once a first evolution exists, takes Root Network, Gravy Heart or Starch Plating when offered before a fifth damage passive raises max hp and regen and cuts the time spent at under 30% hp in the 6:00-8:00 bosses.

## Method

Live gyms nm2-live-min5 and nm2-live-min5-fryer, 300 s, paired with default picks, 3-4 games per arm. Record max hp, passives taken, minutes under 30% hp, damage by source and time lived. Do not compare to opening pick prompts, which were refuted.

## Findings

L10.I1.G3: the hp and regen pick prompt could not act, because all six passive slots in nm2-live-min5 were already full (hot-start, butter-socks, butter-pat, fertilizer, root-network, sprouting-eyes). It took 210 damage (Fryer King 99.8, Sir Strawman 66.2) and lived to 10:00 at 120/120. Needs a gym or fresh game with free passive slots, such as nm2-live-min10-gold if it has some.

## Games

### L10.I1.G3: hp and regen picks after evolution

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.5s (game clock 10:00), health 120/120; damage taken 210 (boss:fryer-king 99.8, boss:sir-strawman 66.2, Spore vent 34.1, Hot oil 10.3); 10489 kills; level 19 to 36; planner asked 133 times, action model 123; the models saw the game 31 ms late (p90 73); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5.
- Damage taken 210, by source: boss:fryer-king 99.8, boss:sir-strawman 66.2, Spore vent 34.1, Hot oil 10.3.
- Damage dealt 941813, by weapon: overgrowth 735716.1, thunder-tuber 192117.4, mash-snowball 8432.2, pressure-cooker 2667.9, grok-bot 1434.9, tater-twirl 1305.7, root-cellar 99, steam-vent 39.4.
- Kills 10489, by weapon: overgrowth 8439, thunder-tuber 1931, mash-snowball 79, grok-bot 19, pressure-cooker 19, tater-twirl 2.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1961, spent 0.
- Made: pressure-cooker at 07:36.
