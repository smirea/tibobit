# Which half of the hp+armor+dodge passive swap carries the live 10:00-15:00 window

| Field | Value |
| --- | --- |
| Status | running |
| Area | build |
| Result | - |
| Created | L10.I5 |
| Updated | L10.I5 |

## Hypothesis

Max hp (Gravy Heart, Stuffed Skin) or armor and dodge (Starch Plating, Thick Skin) alone is enough to survive the Mandoline, Great Wireworm and Deep Freezer from 10:00.

## Method

Live nm2-live-min10-gold, 300 s, hp-only and armor/dodge-only passive swaps, with the full swap repeated in nm2-hp-build-min10-live. Record time lived, hp, damage by source and dashes.

## Findings

(none yet)

## Games

### L10.I5.G2: max hp only swap

- Start: gym nm2-live-min10-gold (Nightmare 2 at 10:01), seed NG08BZ, build swapped for pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, root-network 5, butter-socks 5, butter-pat 5, gravy-heart 5, stuffed-skin 5, spud-sneakers 5, pickle-jar x1, static-socks x1, lucky-peel x1, spud-muffin x2, potato-knish x1, starch-sock x1; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 15:00), health 354/365; damage taken 830 (boss:great-wireworm 215.8, enemy:ice-imp 188.4, boss:deep-freezer 151.7, enemy:blight-spore 148.6); 15439 kills; level 35 to 47; planner asked 103 times, action model 325; the models saw the game 54 ms late (p90 178); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, root-network 5, butter-socks 5, butter-pat 5, gravy-heart 5, stuffed-skin 5, spud-sneakers 5.
- Damage taken 830, by source: boss:great-wireworm 215.8, enemy:ice-imp 188.4, boss:deep-freezer 151.7, enemy:blight-spore 148.6, Hot oil 69.2, boss:the-mandoline 56.5.
- Damage dealt 3865018, by weapon: overgrowth 1523045.1, thunder-tuber 1225134.8, pressure-cooker 753795.9, mash-snowball 166991.4, root-cellar 59754.1, heavy-russet 59313.6, tater-twirl 28288.4, coal-baked-spud 24980.2.
- Kills 15439, by weapon: overgrowth 6292, thunder-tuber 5075, pressure-cooker 2908, mash-snowball 643, root-cellar 182, coal-baked-spud 150, grok-bot 129, tater-twirl 60.
- Bosses killed 12, elites killed 12, boss chests 24, crates bought 5, shrines used 0, items bought 0, revives used 0; gold earned 4946, spent 3356.
- Made: no evolution, union or evolved item.

### L10.I5.G3: armor and dodge only swap

- Start: gym nm2-live-min10-gold (Nightmare 2 at 10:01), seed NG08BZ, build swapped for pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, root-network 5, butter-socks 5, butter-pat 5, starch-plating 5, thick-skin 5, spud-sneakers 5, pickle-jar x1, static-socks x1, lucky-peel x1, spud-muffin x2, potato-knish x1, starch-sock x1; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 15:00), health 180/180; damage taken 1641 (enemy:ice-imp 722.4, boss:the-mandoline 239.5, boss:deep-freezer 235.6, enemy:grease-fiend 221.2); 23005 kills; level 35 to 52; planner asked 119 times, action model 584; the models saw the game 83 ms late (p90 229); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, root-network 5, butter-socks 5, butter-pat 5, starch-plating 5, thick-skin 5, spud-sneakers 5.
- Damage taken 1641, by source: enemy:ice-imp 722.4, boss:the-mandoline 239.5, boss:deep-freezer 235.6, enemy:grease-fiend 221.2, enemy:mud-golem 90.5, enemy:blight-spore 38.7, Hot oil 34.4, enemy:mole 28.2.
- Damage dealt 5478519, by weapon: pressure-cooker 1607808.3, thunder-tuber 1492366.3, overgrowth 1427950.8, mash-snowball 423432.1, wandering-eyes 217964.2, root-cellar 187566.4, tater-twirl 110851.2, static-socks 9640.
- Kills 23005, by weapon: pressure-cooker 7598, overgrowth 6399, thunder-tuber 6197, mash-snowball 1862, wandering-eyes 488, tater-twirl 256, root-cellar 175, static-socks 24.
- Bosses killed 21, elites killed 21, boss chests 38, crates bought 4, shrines used 0, items bought 0, revives used 0; gold earned 7912, spent 2349.
- Made: no evolution, union or evolved item.
