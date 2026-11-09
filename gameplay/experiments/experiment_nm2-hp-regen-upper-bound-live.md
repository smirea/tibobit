# Does a high hp and regen build survive the live NM2 6:00-8:00 bosses from the 5:00 gym

| Field | Value |
| --- | --- |
| Status | done |
| Area | build |
| Result | inconclusive |
| Created | L10.I1 |
| Updated | L10.I2 |

## Hypothesis

Root Network 3, Gravy Heart 3 and Starch Plating 3 in place of Gravy Splash and Hot Sauce raise max hp and regen enough to survive Late Blight, Sir Strawman and the Fryer King, which killed the unchanged build at 7:06-8:04. If the upper bound does not beat the controls, hp picks are not worth a prompt.

## Method

Live gym nm2-live-min5, 300 s, loadout swap against the unchanged control and the other arms. Record time lived, hp at 6:00 and 7:00, minutes under 30% hp and damage by boss.

## Findings

L10.I1.G4: the loadout swap (Root Network 3, Gravy Heart 3, Starch Plating 3) lived to 10:00 at 240/240 but took 226 damage, no less than the control (67) or the other arms (136, 210). The gym is too lenient this time to separate arms, since the control also lived.

## Games

### L10.I1.G4: hp regen loadout upper bound

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ, build swapped for steam-vent 2, gem-sling 1, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, broadside 2, root-network 3, gravy-heart 3, starch-plating 3, sour-cream 3, masher-grip 1, hot-sauce 1, potato-knish x1; 300s; plays the playbook.
- Outcome: alive after 300.5s (game clock 10:00), health 240/240; damage taken 226 (enemy:sizzle-imp 59.1, enemy:ice-imp 51.5, enemy:blight-spore 46.8, boss:fryer-king 41.4); 14199 kills; level 19 to 34; planner asked 134 times, action model 237; the models saw the game 32 ms late (p90 75); ended with pressure-cooker 1, gem-sling 8, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, full-broadside 1, root-network 5, gravy-heart 5, starch-plating 5, sour-cream 5, masher-grip 5, hot-sauce 5.
- Damage taken 226, by source: enemy:sizzle-imp 59.1, enemy:ice-imp 51.5, enemy:blight-spore 46.8, boss:fryer-king 41.4, Hot oil 27.7.
- Damage dealt 1178208, by weapon: spicy-hot-potato 560844.5, hashnado 372571.4, pressure-cooker 107159.9, mash-avalanche 59069.1, gem-sling 38438.2, full-broadside 28717.7, grok-bot 9062.5, overgrowth 1136.4.
- Kills 14199, by weapon: spicy-hot-potato 7755, hashnado 4058, pressure-cooker 1132, mash-avalanche 525, gem-sling 302, full-broadside 273, grok-bot 79, overgrowth 51.
- Bosses killed 9, elites killed 7, boss chests 17, crates bought 2, shrines used 0, items bought 0, revives used 0; gold earned 2501, spent 102.
- Made: pressure-cooker at 06:09, full-broadside at 07:17.
