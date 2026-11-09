# Does ranking goals low and moving away while a boss is within 250 units keep the bot alive at 2:00

| Field | Value |
| --- | --- |
| Status | done |
| Area | bosses |
| Result | refuted |
| Created | L8.I10 |
| Updated | L9.I6 |

## Hypothesis

A goal rule that, while any boss is within about 250 units, rates chest, elite and spot goals low and Keep away from enemies highest stops the bot walking into the Mascot, and chests still open when no boss is near.

## Method

Live fresh NM2 games on paired seeds: plain playbook vs boss-distance goal text, 300s. Record Mascot damage, hp at 2:30, chests opened, first evolution and survival. A behaviour change, not a rewording; confirm chests still open once the boss is far.

## Findings

L9.I5 on the live 5:00 gym: gating text died 8:05 and 6:14, no better than controls (8:04, 7:06). Opening games died before bosses spawned, so the opening was never a fair test. Closed. See B165.

## Games

### L9.I2.G5: steam-vent boss gating s6262

- Start: a fresh game on Nightmare 2 with steam-vent, seed 6262; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 94.1s (game clock 01:34); damage taken 122 (enemy:sand-crab 68.9, enemy:bowling-ball 42.1, enemy:aphid 5.5, enemy:oil-drip 3.4); 200 kills; level 1 to 6; planner asked 29 times, action model 289; the models saw the game 28 ms late (p90 48); ended with steam-vent 1, tailgate-fries 1, starch-chain 1, potato-battery 1, hot-streak 1, sprouting-eyes 1.
- Damage taken 122, by source: enemy:sand-crab 68.9, enemy:bowling-ball 42.1, enemy:aphid 5.5, enemy:oil-drip 3.4, enemy:sprout-mite 2.4; the killing blow: enemy:bowling-ball.
- Damage dealt 6563, by weapon: starch-chain 2875.6, tailgate-fries 2013.6, potato-battery 917.4, steam-vent 506.7, hot-streak 250.
- Kills 200, by weapon: starch-chain 114, tailgate-fries 36, potato-battery 33, steam-vent 13, hot-streak 4.
- Bosses killed 0, elites killed 3, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 0, spent 0.
- Made: no evolution, union or evolved item.

### L9.I4.G4: deep-fryer gating s6666

- Start: a fresh game on Nightmare 2 with deep-fryer, seed 6666; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 118.9s (game clock 01:58); damage taken 127 (enemy:sand-crab 83.7, enemy:frost-flea 9.9, enemy:crumb-ant 9.3, enemy:oil-drip 7.8); 304 kills; level 1 to 8; planner asked 45 times, action model 284; the models saw the game 27 ms late (p90 48); ended with deep-fryer 1, steam-vent 1, julienne-dash 3, hash-hawk 1, sprout-satellites 1, spud-decoy 1.
- Damage taken 127, by source: enemy:sand-crab 83.7, enemy:frost-flea 9.9, enemy:crumb-ant 9.3, enemy:oil-drip 7.8, enemy:snow-mold 6.7, enemy:fry-fly 5, enemy:potato-beetle 2.4, enemy:sprout-mite 2.4; the killing blow: enemy:snow-mold.
- Damage dealt 7420, by weapon: hash-hawk 1817.8, deep-fryer 1766.4, julienne-dash 1492.8, spud-decoy 980.2, steam-vent 677.1, sprout-satellites 592, grok-bot 93.5.
- Kills 304, by weapon: deep-fryer 80, spud-decoy 70, julienne-dash 67, hash-hawk 33, sprout-satellites 28, steam-vent 19, grok-bot 7.
- Bosses killed 0, elites killed 3, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 43, spent 0.
- Made: no evolution, union or evolved item.

### L9.I4.G5: deep-fryer gating s6464 harm check

- Start: a fresh game on Nightmare 2 with deep-fryer, seed 6464; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.1s (game clock 05:00), health 35/149; damage taken 324 (boss:the-masher 124.3, enemy:fry-fly 100.6, Hot oil 42.9, enemy:little-grey 14.3); 3360 kills; level 1 to 19; planner asked 121 times, action model 716; the models saw the game 27 ms late (p90 54); ended with deep-fryer 1, waffle-cut 1, bottomless-sack 1, hash-boomerang 8, sprout-satellites 1, frying-pan 2, butter-socks 1, gravy-heart 2, sprouting-eyes 1, sour-cream 4, root-network 1.
- Damage taken 324, by source: boss:the-masher 124.3, enemy:fry-fly 100.6, Hot oil 42.9, enemy:little-grey 14.3, enemy:crumb-ant 11, enemy:oil-drip 10.9, enemy:sand-crab 8.9, enemy:aphid 5.3.
- Damage dealt 135737, by weapon: bottomless-sack 68273.2, hash-boomerang 25871.1, waffle-cut 18432.9, grab-bag 9246.8, julienne-dash 4197.2, deep-fryer 3799.8, sprout-satellites 2004.8, frying-pan 1769.8.
- Kills 3360, by weapon: bottomless-sack 1663, hash-boomerang 547, grab-bag 450, waffle-cut 288, deep-fryer 115, julienne-dash 108, sprout-satellites 66, alex 60.
- Bosses killed 9, elites killed 9, boss chests 14, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1035, spent 0.
- Made: waffle-cut at 02:00, bottomless-sack at 03:06.

### L9.I5.G1: min5 gym gating A

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 185.2s (game clock 08:05); damage taken 293 (boss:fryer-king 144.5, boss:late-blight 51.4, enemy:blight-spore 36, enemy:sizzle-imp 27.3); 7030 kills; level 18 to 29; planner asked 82 times, action model 210; the models saw the game 32 ms late (p90 83); ended with pressure-cooker 1, gem-sling 3, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, full-broadside 1, gravy-splash 4, sour-cream 4, root-network 3, hot-sauce 1, masher-grip 2, peel-out 2.
- Damage taken 293, by source: boss:fryer-king 144.5, boss:late-blight 51.4, enemy:blight-spore 36, enemy:sizzle-imp 27.3, boss:sir-strawman 16.8, enemy:field-crow 12.4, Hot oil 4.5; the killing blow: boss:fryer-king.
- Damage dealt 382252, by weapon: spicy-hot-potato 244084.3, hashnado 90598.2, mash-avalanche 17709, full-broadside 12320, pressure-cooker 10896.1, gem-sling 5418.1, broadside 660.2, steam-vent 287.4.
- Kills 7030, by weapon: spicy-hot-potato 4747, hashnado 1690, mash-avalanche 226, pressure-cooker 174, full-broadside 108, gem-sling 62, broadside 15, grok-bot 6.
- Bosses killed 6, elites killed 6, boss chests 12, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1073, spent 0.
- Made: full-broadside at 06:20, pressure-cooker at 07:17.

### L9.I5.G2: min5 gym gating B

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 73.7s (game clock 06:14); damage taken 183 (boss:late-blight 110.5, enemy:ice-imp 32.7, enemy:sizzle-imp 27.3, Hot oil 10.4); 2656 kills; level 18 to 19; planner asked 24 times, action model 91; the models saw the game 32 ms late (p90 62); ended with steam-vent 2, gem-sling 1, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, broadside 5, gravy-splash 1, sour-cream 3, root-network 1, hot-sauce 1, masher-grip 1, aged-russet 1.
- Damage taken 183, by source: boss:late-blight 110.5, enemy:ice-imp 32.7, enemy:sizzle-imp 27.3, Hot oil 10.4, Spore vent 1.9; the killing blow: boss:late-blight.
- Damage dealt 133140, by weapon: spicy-hot-potato 88416.9, hashnado 27244.9, mash-avalanche 13608.7, broadside 2872.3, grok-bot 706.3, gem-sling 261.2, steam-vent 26.8, gravy-splash 3.3.
- Kills 2656, by weapon: spicy-hot-potato 1981, hashnado 560, mash-avalanche 74, grok-bot 26, broadside 11, gem-sling 2, steam-vent 2.
- Bosses killed 1, elites killed 6, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 184, spent 0.
- Made: no evolution, union or evolved item.
