# Does early armor (Starch Plating) remove the pest chip damage that kills live NM2 openings

| Field | Value |
| --- | --- |
| Status | done |
| Area | items |
| Result | refuted |
| Created | L4.I2 |
| Updated | L4.I3 |

## Hypothesis

Starch Plating cuts 20 damage per hit per level, and pests hit for 3-7, so holding it from 0:00 sharply cuts minute-1 damage and the 2:00 Mascot hit, and carries seeds 4141 and 1919 past 5:00. If the upper bound works, a live pick prompt that takes Starch Plating first is worth testing, and Baked Buckler and Ghost Skin from crates early.

## Method

L4.I2: fresh live NM2 steam-vent from 0:00 with loadout steam-vent 1 plus starch-plating 2 on seeds 4141 and 1919, 300s, playbook unchanged. Paired with controls (4141 died 3:06; 1919 control played this iteration; package died 1:50 and 2:35). Compare hp lost in minute 1, boss:amusing damage, first chest, evolution and survival at 5:00. If it lives both, test a natural pick prompt on at least 5 seeds.

## Findings

L4.I2: Starch Plating 2 from 0:00 lived 0 of 2 (4141 died 3:58, 1919 died 4:04). Both outlived their controls (3:06, 2:30) but entered the 3:00-4:00 bosses with no evolution and 3 chests. Armor alone does not fix the opening; chest and evolution flow matters more (B97).

## Games

### L4.I2.G4: armor upper bound s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141, build swapped for steam-vent 1, starch-plating 2; 300s; plays the playbook.
- Outcome: died after 238s (game clock 03:58); damage taken 178 (enemy:snow-mold 77.9, boss:beetle-queen 35, boss:amusing 32.8, enemy:spittlebug 12.1); 1834 kills; level 1 to 14; planner asked 89 times, action model 808; the models saw the game 29 ms late (p90 59); ended with steam-vent 2, mash-wave 5, harvest-moon 1, tater-twirl 1, starch-chain 1, fry-sentry 2, starch-plating 5, big-bowl 1, salt-shaker 1.
- Damage taken 178, by source: enemy:snow-mold 77.9, boss:beetle-queen 35, boss:amusing 32.8, enemy:spittlebug 12.1, enemy:frost-flea 6.4, enemy:compost-maggot 4.5, enemy:sand-crab 4, enemy:aphid 1.9; the killing blow: boss:beetle-queen.
- Damage dealt 65411, by weapon: mash-wave 46339.2, tater-twirl 5404.6, harvest-moon 5169.2, starch-chain 3569.8, fry-sentry 2804.6, steam-vent 2123.9.
- Kills 1834, by weapon: mash-wave 1459, harvest-moon 110, tater-twirl 104, starch-chain 57, fry-sentry 55, steam-vent 49.
- Bosses killed 3, elites killed 6, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 306, spent 0.
- Made: no evolution, union or evolved item.

### L4.I2.G5: armor upper bound s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919, build swapped for steam-vent 1, starch-plating 2; 300s; plays the playbook.
- Outcome: died after 244.1s (game clock 04:04); damage taken 152 (enemy:potato-beetle 27, enemy:sand-crab 21.5, enemy:bowling-ball 18.1, boss:amusing 16.4); 807 kills; level 1 to 12; planner asked 92 times, action model 778; the models saw the game 30 ms late (p90 64); ended with steam-vent 1, broadside 7, starch-chain 1, butter-streak 1, starch-plating 5, sour-cream 2.
- Damage taken 152, by source: enemy:potato-beetle 27, enemy:sand-crab 21.5, enemy:bowling-ball 18.1, boss:amusing 16.4, boss:beetle-queen 15.2, enemy:aphid 9.7, enemy:beetle-brood 8, enemy:snow-mold 7.6; the killing blow: boss:the-masher.
- Damage dealt 37855, by weapon: broadside 26584.9, starch-chain 7256.5, steam-vent 2875.8, grok-bot 1039.1, butter-streak 98.8.
- Kills 807, by weapon: broadside 518, starch-chain 164, steam-vent 81, grok-bot 39, butter-streak 5.
- Bosses killed 4, elites killed 6, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 291, spent 0.
- Made: no evolution, union or evolved item.
