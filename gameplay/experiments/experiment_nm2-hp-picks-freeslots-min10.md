# Does an hp, armor and regen pick prompt fill free passive slots with Gravy Heart, Starch Plating and Thick Skin from 10:00

| Field | Value |
| --- | --- |
| Status | running |
| Area | build |
| Result | - |
| Created | L10.I5 |
| Updated | L10.I5 |

## Hypothesis

With 3 free passive slots, a pick prompt that ranks hp, armor, dodge and regen first reaches the lethal swap build through level-ups alone, and lives longer than default picks.

## Method

Live nm2-live-min10-gold with hot-start, fertilizer and sprouting-eyes removed, 300 s: hp-pick prompt vs default picks. Record cards taken, max hp, damage by source and time lived.

## Findings

(none yet)

## Games

### L10.I5.G4: free slots + hp/armor/regen picks

- Start: gym nm2-live-min10-gold (Nightmare 2 at 10:01), seed NG08BZ, build swapped for pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, root-network 5, butter-socks 5, butter-pat 5, pickle-jar x1, static-socks x1, lucky-peel x1, spud-muffin x2, potato-knish x1, starch-sock x1; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 258.7s (game clock 14:19); damage taken 1549 (boss:deep-freezer 511, enemy:ice-imp 351.1, enemy:mud-golem 272.8, boss:the-mandoline 188.2); 17071 kills; level 35 to 49; planner asked 126 times, action model 328; the models saw the game 46 ms late (p90 139); ended with pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, root-network 5, butter-socks 5, butter-pat 5, starch-plating 5, gravy-heart 5, thick-skin 5.
- Damage taken 1549, by source: boss:deep-freezer 511, enemy:ice-imp 351.1, enemy:mud-golem 272.8, boss:the-mandoline 188.2, enemy:grease-fiend 184.6, enemy:blight-spore 30.2, Hot oil 10.8; the killing blow: boss:deep-freezer.
- Damage dealt 3908055, by weapon: overgrowth 1366663.3, thunder-tuber 1228014.4, pressure-cooker 799803.3, mash-snowball 229238.9, heavy-russet 80884.5, tater-twirl 80328.3, grok-bot 53463.1, root-cellar 51107.7.
- Kills 17071, by weapon: overgrowth 6269, thunder-tuber 5598, pressure-cooker 3794, mash-snowball 1050, grok-bot 222, tater-twirl 55, root-cellar 47, static-socks 36.
- Bosses killed 12, elites killed 24, boss chests 33, crates bought 4, shrines used 1, items bought 0, revives used 0; gold earned 5719, spent 2349.
- Made: no evolution, union or evolved item.

### L10.I5.G5: free slots + default picks

- Start: gym nm2-live-min10-gold (Nightmare 2 at 10:01), seed NG08BZ, build swapped for pressure-cooker 1, tater-twirl 8, thunder-tuber 1, overgrowth 1, mash-snowball 8, root-cellar 8, root-network 5, butter-socks 5, butter-pat 5, pickle-jar x1, static-socks x1, lucky-peel x1, spud-muffin x2, potato-knish x1, starch-sock x1; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 15:00), health 162/162; damage taken 345 (enemy:ice-imp 209.7, boss:deep-freezer 47.9, enemy:blight-spore 44, Brambles 18); 16367 kills; level 35 to 49; planner asked 124 times, action model 289; the models saw the game 87 ms late (p90 220); ended with pressure-cooker 1, tater-twister 1, thunder-tuber 1, overgrowth 1, mash-avalanche 1, cold-storage 1, root-network 5, butter-socks 5, butter-pat 5, salt-shaker 5, masher-grip 5, slow-cooker 5.
- Damage taken 345, by source: enemy:ice-imp 209.7, boss:deep-freezer 47.9, enemy:blight-spore 44, Brambles 18, boss:great-wireworm 16.6, Hot oil 8.6.
- Damage dealt 4306316, by weapon: overgrowth 1588988.6, thunder-tuber 1138421.7, glacier-spud 717513.4, pressure-cooker 311688.3, lightning-spud 276350.1, mash-avalanche 126299.3, tater-twister 88057.2, cold-storage 29356.1.
- Kills 16367, by weapon: overgrowth 6612, thunder-tuber 4841, glacier-spud 1659, pressure-cooker 1548, lightning-spud 849, mash-avalanche 573, cold-storage 109, grok-bot 71.
- Bosses killed 12, elites killed 15, boss chests 29, crates bought 5, shrines used 0, items bought 0, revives used 0; gold earned 4995, spent 3356.
- Made: tater-twister at 10:10, mash-avalanche at 10:36, cold-storage at 12:03, glacier-spud at 13:12.
