# Does swapping finished catalysts for Gravy Heart, Starch Plating and Thick Skin lower damage and carry the live 10:00-15:00 window

| Field | Value |
| --- | --- |
| Status | running |
| Area | build |
| Result | - |
| Created | L10.I4 |
| Updated | L10.I5 |

## Hypothesis

After Overgrowth and Thunder Tuber exist, Fertilizer, Sprouting Eyes and Hot Start do nothing. Swapping them for hp, armor and dodge passives lowers the Great Wireworm, Deep Freezer and ice-imp bursts and lives past 14:07.

## Method

Live nm2-live-min10-gold, 300 s, loadout swap against the unchanged control. Record time lived, damage by source, minimum hp and dashes.

## Findings

L10.I4.G2: swap alive at 15:00 (191/259, 900 damage) against controls 0 of 2. L10.I4.G5, armor and dodge items on the old passives, died 13:42. L10.I5 repeats the full swap and saves a 15:00 gym.

## Games

### L10.I4.G2: hp+armor+dodge passives swapped in

- Start: gym nm2-live-min10-gold (Nightmare 2 at 10:01), seed NG08BZ, build swapped for pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, root-network 5, butter-socks 5, butter-pat 5, gravy-heart 5, starch-plating 5, thick-skin 5, pickle-jar x1, static-socks x1, lucky-peel x1, spud-muffin x2, potato-knish x1, starch-sock x1; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 15:00), health 191/259; damage taken 900 (enemy:ice-imp 330.3, enemy:harvest-mouse 206.2, boss:great-wireworm 156.8, boss:deep-freezer 115.1); 19132 kills; level 35 to 50; planner asked 112 times, action model 306; the models saw the game 38 ms late (p90 111); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, root-network 5, butter-socks 5, butter-pat 5, gravy-heart 5, starch-plating 5, thick-skin 5.
- Damage taken 900, by source: enemy:ice-imp 330.3, enemy:harvest-mouse 206.2, boss:great-wireworm 156.8, boss:deep-freezer 115.1, boss:the-mandoline 47, enemy:blight-spore 25.2, enemy:field-rat 13.3, Hot oil 6.3.
- Damage dealt 4672654, by weapon: thunder-tuber 1514582.6, overgrowth 1472870.4, pressure-cooker 1192665.4, mash-snowball 308826.7, root-cellar 91853.4, grok-bot 46740.2, tater-twirl 45115.4.
- Kills 19132, by weapon: overgrowth 6155, thunder-tuber 6120, pressure-cooker 5136, mash-snowball 1241, grok-bot 281, root-cellar 146, tater-twirl 53.
- Bosses killed 12, elites killed 15, boss chests 29, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 6218, spent 0.
- Made: no evolution, union or evolved item.

### L10.I5.G1: full hp+armor+dodge swap repeat, save 15:00

- Start: gym nm2-live-min10-gold (Nightmare 2 at 10:01), seed NG08BZ, build swapped for pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, root-network 5, butter-socks 5, butter-pat 5, gravy-heart 5, starch-plating 5, thick-skin 5, pickle-jar x1, static-socks x1, lucky-peel x1, spud-muffin x2, potato-knish x1, starch-sock x1; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 15:00), health 259/259; damage taken 917 (boss:deep-freezer 470.8, enemy:ice-imp 194.4, enemy:blight-spore 103.9, enemy:harvest-mouse 70.2); 19034 kills; level 35 to 49; planner asked 107 times, action model 455; the models saw the game 52 ms late (p90 164); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, root-network 5, butter-socks 5, butter-pat 5, gravy-heart 5, starch-plating 5, thick-skin 5; saved as gym nm2-live-min15-hp.
- Damage taken 917, by source: boss:deep-freezer 470.8, enemy:ice-imp 194.4, enemy:blight-spore 103.9, enemy:harvest-mouse 70.2, enemy:mole 49.6, enemy:field-rat 10.4, Brambles 9.2, Spore vent 8.6.
- Damage dealt 4724573, by weapon: overgrowth 1509084.9, thunder-tuber 1487634.1, pressure-cooker 1149726.8, mash-snowball 391995.5, root-cellar 85975.5, tater-twirl 51160.8, grok-bot 48995.3.
- Kills 19034, by weapon: overgrowth 6112, thunder-tuber 6036, pressure-cooker 5022, mash-snowball 1466, grok-bot 227, root-cellar 113, tater-twirl 58.
- Bosses killed 12, elites killed 18, boss chests 28, crates bought 7, shrines used 0, items bought 0, revives used 0; gold earned 6020, spent 6163.
- Made: no evolution, union or evolved item.
