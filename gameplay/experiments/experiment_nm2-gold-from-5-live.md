# Does spending gold and using spots from 5:00 add power before the 6:00-8:00 bosses on live NM2

| Field | Value |
| --- | --- |
| Status | done |
| Area | economy |
| Result | inconclusive |
| Created | L8.I5 |
| Updated | L8.I10 |

## Hypothesis

The 10:00 gold rule never fires in the first 10 minutes. Rating crates, Fry Cart, Whetstone and shrines like chests from 5:00 at 300 gold, with no boss within 300 units, converts early gold into items and levels. That lowers damage in 5:00-10:00 compared with the unchanged playbook from the same live 5:00 state.

## Method

From nm2-live-min5 (5:00, hp 149), 300s, one game with the unchanged playbook and one with the goal text changed to fire the spend rule from 5:00 at 300 gold. Compare gold spent, crates and shrines, whetstone levels, damage by source and boss, minimum hp and survival to 10:00. One game per arm is a lead only; repeat if the gym ran.

## Findings

From the live 5:00 gym controls lived 0 of 2 to 10:00 (8:04, 7:06) and spend-from-5:00 lived 1 of 2 (alive 10:00 with 28 boss chests, 6 crates; the other died 8:11). One game per arm of difference; a lead only. See B139.

## Games

### L8.I5.G3: min5 gym control

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook.
- Outcome: died after 184s (game clock 08:04); damage taken 303 (boss:late-blight 149.3, boss:fryer-king 99.6, boss:sir-strawman 21.8, enemy:reset-zombie 11.3); 7266 kills; level 18 to 31; planner asked 78 times, action model 439; the models saw the game 30 ms late (p90 73); ended with pressure-cooker 1, gem-sling 1, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, full-broadside 1, gravy-splash 2, sour-cream 5, root-network 1, hot-sauce 1, masher-grip 3, starch-plating 5.
- Damage taken 303, by source: boss:late-blight 149.3, boss:fryer-king 99.6, boss:sir-strawman 21.8, enemy:reset-zombie 11.3, enemy:field-crow 11.3, enemy:blight-spore 8.1, Hot oil 2; the killing blow: boss:fryer-king.
- Damage dealt 384090, by weapon: spicy-hot-potato 246572.6, hashnado 95405.9, mash-avalanche 28358.1, gem-sling 5562.6, broadside 4392.7, grok-bot 2826.6, full-broadside 368.5, pressure-cooker 340.
- Kills 7266, by weapon: spicy-hot-potato 4870, hashnado 1846, mash-avalanche 359, gem-sling 87, grok-bot 50, broadside 38, full-broadside 8, pressure-cooker 7.
- Bosses killed 6, elites killed 9, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1252, spent 0.
- Made: full-broadside at 07:56, pressure-cooker at 08:00.

### L8.I5.G4: min5 gym gold and spots from 5:00

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.2s (game clock 10:00), health 102/138; damage taken 477 (boss:fryer-king 85.4, enemy:field-crow 80.1, boss:late-blight 78.7, enemy:mole 78.6); 15130 kills; level 18 to 33; planner asked 119 times, action model 353; the models saw the game 32 ms late (p90 74); ended with pressure-cooker 1, gem-sling 8, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, full-broadside 1, gravy-splash 5, sour-cream 5, root-network 5, hot-sauce 5, masher-grip 5, packed-pan 5.
- Damage taken 477, by source: boss:fryer-king 85.4, enemy:field-crow 80.1, boss:late-blight 78.7, enemy:mole 78.6, enemy:sizzle-imp 76.9, enemy:blight-spore 47.1, boss:sir-strawman 30.3.
- Damage dealt 1257413, by weapon: spicy-hot-potato 562132.5, bonfire-spud 287051.5, hashnado 248158.8, pressure-cooker 58627.1, mash-avalanche 49043.8, full-broadside 32927.1, gem-sling 11099.2, grok-bot 4145.6.
- Kills 15130, by weapon: spicy-hot-potato 8144, hashnado 3165, bonfire-spud 2293, pressure-cooker 576, mash-avalanche 428, full-broadside 237, gem-sling 131, grok-bot 89.
- Bosses killed 9, elites killed 20, boss chests 28, crates bought 6, shrines used 1, items bought 0, revives used 0; gold earned 3822, spent 1129.
- Made: full-broadside at 05:50, pressure-cooker at 06:21, bonfire-spud at 07:55.

### L8.I6.G1: min5 gym control repeat

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook.
- Outcome: died after 126.6s (game clock 07:06); damage taken 187 (boss:sir-strawman 115.5, enemy:field-crow 23.1, boss:late-blight 21.1, enemy:reset-zombie 17.9); 4683 kills; level 18 to 24; planner asked 55 times, action model 90; the models saw the game 32 ms late (p90 89); ended with steam-vent 8, gem-sling 1, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, full-broadside 1, gravy-splash 2, sour-cream 5, root-network 1, hot-sauce 1, masher-grip 1, big-bowl 1.
- Damage taken 187, by source: boss:sir-strawman 115.5, enemy:field-crow 23.1, boss:late-blight 21.1, enemy:reset-zombie 17.9, enemy:bowling-ball 9.6; the killing blow: enemy:field-crow.
- Damage dealt 242535, by weapon: spicy-hot-potato 163351.8, hashnado 51721.7, mash-avalanche 10849.3, full-broadside 9543.3, gem-sling 3526.9, steam-vent 1645.8, broadside 1470.4, grok-bot 397.1.
- Kills 4683, by weapon: spicy-hot-potato 3359, hashnado 1023, mash-avalanche 154, full-broadside 74, gem-sling 33, steam-vent 25, broadside 7, grok-bot 7.
- Bosses killed 6, elites killed 7, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 753, spent 0.
- Made: full-broadside at 05:32.

### L8.I6.G2: min5 gym spend from 5:00 at 300 gold

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 191.2s (game clock 08:11); damage taken 400 (boss:fryer-king 168.1, enemy:blight-spore 106.5, boss:sir-strawman 72.2, Spore vent 29.7); 9548 kills; level 18 to 33; planner asked 81 times, action model 236; the models saw the game 33 ms late (p90 77); ended with pressure-cooker 1, gem-sling 5, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, full-broadside 1, gravy-splash 4, sour-cream 5, root-network 3, hot-sauce 1, masher-grip 5, mash-finisher 1.
- Damage taken 400, by source: boss:fryer-king 168.1, enemy:blight-spore 106.5, boss:sir-strawman 72.2, Spore vent 29.7, enemy:bowling-ball 14, boss:late-blight 9.3; the killing blow: boss:fryer-king.
- Damage dealt 649363, by weapon: spicy-hot-potato 375747, hashnado 146542.1, static-tot 69664.7, mash-avalanche 22572.9, full-broadside 11678.1, pressure-cooker 10164, gem-sling 10107, broadside 1508.5.
- Kills 9548, by weapon: spicy-hot-potato 5851, hashnado 2194, static-tot 824, mash-avalanche 289, pressure-cooker 136, full-broadside 117, gem-sling 100, broadside 19.
- Bosses killed 6, elites killed 6, boss chests 9, crates bought 6, shrines used 3, items bought 2, revives used 0; gold earned 1803, spent 2293.
- Made: full-broadside at 06:38, pressure-cooker at 07:35.
