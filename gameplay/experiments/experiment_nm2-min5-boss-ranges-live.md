# Does asking the action model about every move while a boss is within 300 units cut boss damage on the live NM2 5:00 gym

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | inconclusive |
| Created | L8.I7 |
| Updated | L8.I8 |

## Hypothesis

Boss attacks are not in the one-second forecast, so the page walks through them. distrustBossRange 300 and bossOfferRange 300 hand every step near a boss to the action model and offer every move, which lowers boss damage. The only earlier tests were lockstep on NM1 and mixed.

## Method

From nm2-live-min5, 300s, one game with distrustBossRange 300 and bossOfferRange 300 against the two controls. Compare boss damage, hits the page walked through and alive at 10:00. One game is a lead.

## Findings

L8.I7.G3: distrustBossRange 300 with bossOfferRange 300 died 6:11 to Late Blight (122 damage, 0 dashes), earlier than the controls. One game; not pursued.

## Games

### L8.I7.G3: min5 boss ranges 300

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with distrustBossRange 300, bossOfferRange 300.
- Outcome: died after 71.5s (game clock 06:11); damage taken 164 (boss:late-blight 121.9, enemy:field-crow 17.7, enemy:reset-zombie 17.7, enemy:bowling-ball 6.9); 2779 kills; level 18 to 19; planner asked 24 times, action model 81; the models saw the game 27 ms late (p90 62); ended with steam-vent 7, gem-sling 1, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, full-broadside 1, gravy-splash 1, sour-cream 3, root-network 1, hot-sauce 1, masher-grip 1, packed-pan 1.
- Damage taken 164, by source: boss:late-blight 121.9, enemy:field-crow 17.7, enemy:reset-zombie 17.7, enemy:bowling-ball 6.9; the killing blow: boss:late-blight.
- Damage dealt 120599, by weapon: spicy-hot-potato 84097.8, hashnado 25920.4, mash-avalanche 5851.2, full-broadside 2272.5, grok-bot 1848.3, steam-vent 248.3, gem-sling 220.4, broadside 135.2.
- Kills 2779, by weapon: spicy-hot-potato 2086, hashnado 543, grok-bot 57, mash-avalanche 45, full-broadside 39, broadside 4, gem-sling 3, steam-vent 2.
- Bosses killed 0, elites killed 6, boss chests 6, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 451, spent 0.
- Made: full-broadside at 05:18.
