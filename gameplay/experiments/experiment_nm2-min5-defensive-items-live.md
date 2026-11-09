# Do armor, dodge and max hp items cut boss damage from the live NM2 5:00 gym

| Field | Value |
| --- | --- |
| Status | done |
| Area | items |
| Result | inconclusive |
| Created | L8.I7 |
| Updated | L8.I8 |

## Hypothesis

Baked Buckler, Ghost Skin and Spud Muffin were the late lever on NM1 gyms. Held at 5:00 they cut the burst damage of the 6:00-8:00 bosses and get the bot to 10:00, alone and combined with the boss dash knobs.

## Method

From nm2-live-min5 with the gym build plus 2 Baked Buckler, 2 Ghost Skin, 2 Spud Muffin and full hp, 300s: one game with the playbook and one with the boss dash knobs (0.25, range 200). Compare against the two controls on alive at 10:00, damage by boss and minimum hp. Leads only.

## Findings

L8.I7: 2 Baked Buckler, 2 Ghost Skin and 2 Spud Muffin kept hp full to 7:00 but died to the Fryer King at 8:18 (alone) and 8:10 (with the boss knobs), about the same as the controls. Items do not fix the 8:00 wall. See B145.

## Games

### L8.I7.G4: min5 defensive items

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ, build swapped for steam-vent 2, gem-sling 1, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, broadside 2, gravy-splash 1, sour-cream 3, root-network 1, hot-sauce 1, masher-grip 1, potato-knish x1, baked-buckler x2, ghost-skin x2, spud-muffin x2; 300s; plays the playbook.
- Outcome: died after 198.5s (game clock 08:18); damage taken 329 (boss:fryer-king 231, enemy:field-crow 33.2, enemy:reset-zombie 28.8, boss:late-blight 28.5); 7972 kills; level 18 to 31; planner asked 91 times, action model 111; the models saw the game 30 ms late (p90 76); ended with pressure-cooker 1, gem-sling 8, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, full-broadside 1, gravy-splash 4, sour-cream 5, root-network 1, hot-sauce 1, masher-grip 2, peel-out 5.
- Damage taken 329, by source: boss:fryer-king 231, enemy:field-crow 33.2, enemy:reset-zombie 28.8, boss:late-blight 28.5, enemy:blight-spore 7.7; the killing blow: boss:fryer-king.
- Damage dealt 450608, by weapon: spicy-hot-potato 276586.7, hashnado 100081.8, pressure-cooker 30392.7, gem-sling 17397.8, mash-avalanche 13888.1, full-broadside 9258, broadside 1955.7, grok-bot 814.4.
- Kills 7972, by weapon: spicy-hot-potato 5150, hashnado 1852, pressure-cooker 434, gem-sling 232, mash-avalanche 138, full-broadside 138, grok-bot 27, broadside 1.
- Bosses killed 6, elites killed 9, boss chests 15, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1609, spent 0.
- Made: pressure-cooker at 05:21, full-broadside at 06:07.

### L8.I7.G5: min5 items plus boss dash knobs

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ, build swapped for steam-vent 2, gem-sling 1, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, broadside 2, gravy-splash 1, sour-cream 3, root-network 1, hot-sauce 1, masher-grip 1, potato-knish x1, baked-buckler x2, ghost-skin x2, spud-muffin x2; 300s; plays the playbook with bossDashThreshold 0.25, bossDashRange 200.
- Outcome: died after 190.2s (game clock 08:10); damage taken 358 (boss:fryer-king 206.9, enemy:sizzle-imp 50.8, enemy:field-crow 29.5, enemy:blight-spore 24.6); 8265 kills; level 18 to 30; planner asked 93 times, action model 127; the models saw the game 30 ms late (p90 72); ended with pressure-cooker 1, gem-catapult 1, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, full-broadside 1, gravy-splash 5, sour-cream 5, root-network 5, hot-sauce 5, masher-grip 5, potato-magnet 5.
- Damage taken 358, by source: boss:fryer-king 206.9, enemy:sizzle-imp 50.8, enemy:field-crow 29.5, enemy:blight-spore 24.6, boss:sir-strawman 18.9, enemy:bog-toad 18.7, Hot oil 8.9; the killing blow: boss:fryer-king.
- Damage dealt 405319, by weapon: spicy-hot-potato 241643.7, hashnado 82064.7, pressure-cooker 31498.9, gem-catapult 17072.5, mash-avalanche 15696.4, full-broadside 10943.7, grok-bot 4299.8, gem-sling 1786.7.
- Kills 8265, by weapon: spicy-hot-potato 5434, hashnado 1734, pressure-cooker 378, gem-catapult 328, mash-avalanche 146, full-broadside 120, grok-bot 96, gem-sling 28.
- Bosses killed 6, elites killed 12, boss chests 21, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2059, spent 0.
- Made: pressure-cooker at 05:26, full-broadside at 05:37, gem-catapult at 06:35.
