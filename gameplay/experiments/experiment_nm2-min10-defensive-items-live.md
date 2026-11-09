# Do 2 Baked Buckler and 2 Ghost Skin lower damage in the live 10:00-15:00 window

| Field | Value |
| --- | --- |
| Status | done |
| Area | items |
| Result | inconclusive |
| Created | L10.I4 |
| Updated | L10.I5 |

## Hypothesis

Armor and dodge items cut the 100+ hp bursts that kill the build at 11:00-14:00.

## Method

Live nm2-live-min10-gold, 300 s, items added to the gym build against the unchanged control. Record damage by source, minimum hp and time lived.

## Findings

2 Baked Buckler and 2 Ghost Skin on the old passives died 13:42 (ice-imp 310, mud-golem 178), between the controls (12:17, 14:07). See B192.

## Games

### L10.I4.G5: armor and dodge items at 10:00

- Start: gym nm2-live-min10-gold (Nightmare 2 at 10:01), seed NG08BZ, build swapped for pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5, pickle-jar x1, static-socks x1, lucky-peel x1, spud-muffin x2, potato-knish x1, starch-sock x1, baked-buckler x2, ghost-skin x2; 300s; plays the playbook.
- Outcome: died after 221.6s (game clock 13:42); damage taken 775 (enemy:ice-imp 310.1, enemy:mud-golem 178.1, enemy:sizzle-imp 101.7, Hot oil 69); 14939 kills; level 35 to 50; planner asked 83 times, action model 163; the models saw the game 55 ms late (p90 145); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, hot-start 5, butter-socks 5, butter-pat 5, fertilizer 5, root-network 5, sprouting-eyes 5.
- Damage taken 775, by source: enemy:ice-imp 310.1, enemy:mud-golem 178.1, enemy:sizzle-imp 101.7, Hot oil 69, enemy:mole 66, enemy:harvest-mouse 28.3, enemy:field-rat 13.1, enemy:blight-spore 8.7; the killing blow: enemy:mud-golem.
- Damage dealt 3196964, by weapon: overgrowth 1664810.1, thunder-tuber 994492.6, pressure-cooker 368255.7, mash-snowball 107511.1, tater-twirl 27655.3, root-cellar 18596.8, grok-bot 12006.4, static-socks 2310.8.
- Kills 14939, by weapon: overgrowth 7854, thunder-tuber 4604, pressure-cooker 1817, mash-snowball 554, grok-bot 78, tater-twirl 12, root-cellar 9, static-socks 9.
- Bosses killed 6, elites killed 15, boss chests 21, crates bought 6, shrines used 0, items bought 0, revives used 0; gold earned 4453, spent 4611.
- Made: no evolution, union or evolved item.
