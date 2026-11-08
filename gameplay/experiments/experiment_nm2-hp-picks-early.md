# Does an hp-first pick prompt from 0:00 get a natural Nightmare 2 run to Gravy Heart, Stuffed Skin and Thick Skin without losing chests or evolutions

| Field | Value |
| --- | --- |
| Status | running |
| Area | build |
| Result | - |
| Coach | sonnet-high |
| Created | sonnet-high L3.I7 |
| Updated | sonnet-high L3.I8 |

## Hypothesis

A pick prompt that keeps evolution catalysts first and then takes Gravy Heart, Stuffed Skin, Thick Skin and Starch Plating over filler and dash passives gives about 150-200 max hp by 5:00 on Nightmare 2 with the same chests and first evolution time as the unchanged playbook.

## Method

Fresh NM2 steam-vent seeds 3131, 3333 and 3434, 300s, hp-first pick prompt, against the known baselines on the same seeds (25, 84 and 23 damage, all alive, pressure-cooker at 1:38 and 1:37). Compare max hp, chests, first evolution time, passives held at 5:00, damage and survival. Save two 5:00 gyms to continue to 10:00 with the same prompt.

## Findings

L3.I7: hp-first picks lived 3 of 3 to 5:00 but no evolution on 3131 and 3333 (200 and 283 damage) against baselines with pressure-cooker at 1:38 and 25 and 84 damage; seed 3434 evolved and reached 186 hp. L3.I8 plays a catalyst-first variant (catalyst or weapon level first, then Gravy Heart, Stuffed Skin, Thick Skin, Starch Plating, no dash passives) on 3131 and 3333, one game each; the check is first evolution time, max hp at 5:00 and damage.

## Games

### L3.I7.G1: fresh 3131 hp picks

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3131; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300s (game clock 05:00), health 49/120; damage taken 200 (boss:the-masher 70.4, boss:amusing 52.1, boss:beetle-queen 25.6, enemy:potato-beetle 12.4); 3082 kills; level 1 to 17; planner asked 112 times, action model 728, in lockstep; ended with steam-vent 1, locked-gatling 1, tot-toss 2, russet-ricochet 1, chives 5, sprouting-eyes 5, root-network 1; saved as gym nm2-min5-hp-a.
- Damage taken 200, by source: boss:the-masher 70.4, boss:amusing 52.1, boss:beetle-queen 25.6, enemy:potato-beetle 12.4, enemy:aphid 12.1, enemy:sprout-mite 10.3, enemy:frost-flea 6, enemy:beetle-brood 5.1.
- Damage dealt 132484, by weapon: locked-gatling 44918.9, russet-ricochet 35908.6, skipping-cannonball 34245.1, tot-toss 11855.8, steam-vent 4924.5, grok-bot 631.4.
- Kills 3082, by weapon: locked-gatling 1125, skipping-cannonball 862, russet-ricochet 636, tot-toss 335, steam-vent 110, grok-bot 14.
- Bosses killed 9, elites killed 6, boss chests 5, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 429, spent 0.
- Made: russet-ricochet at 04:35.

### L3.I7.G2: fresh 3333 hp picks

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3333; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.2s (game clock 05:00), health 86/149; damage taken 283 (boss:the-masher 46.9, enemy:potato-beetle 46.5, enemy:wireworm-larva 40.5, boss:beetle-queen 28.4); 1451 kills; level 1 to 14; planner asked 100 times, action model 777, in lockstep; ended with steam-vent 5, peeler 1, starch-bolt 1, stuffed-skin 3, lean-lunch 2, root-network 5.
- Damage taken 283, by source: boss:the-masher 46.9, enemy:potato-beetle 46.5, enemy:wireworm-larva 40.5, boss:beetle-queen 28.4, enemy:garden-slug 28.3, enemy:sprout-mite 20.5, enemy:bog-slime 18.1, enemy:ketchup-drop 16.8.
- Damage dealt 68680, by weapon: starch-bolt 31870.8, steam-vent 29302.3, peeler 6990.9, grok-bot 516.
- Kills 1451, by weapon: steam-vent 712, starch-bolt 523, peeler 201, grok-bot 15.
- Bosses killed 3, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 250, spent 0.
- Made: no evolution, union or evolved item.

### L3.I7.G3: fresh 3434 hp picks

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3434; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.2s (game clock 05:00), health 186/186; damage taken 187 (boss:amusing 83.4, Hot oil 21.8, enemy:cave-grub 20.4, enemy:compost-maggot 18.2); 2552 kills; level 1 to 17; planner asked 112 times, action model 541, in lockstep; ended with pressure-cooker 1, railfry 1, hot-streak 4, stuffed-skin 5, thick-skin 5, root-network 5, spud-sneakers 4, mash-finisher 1; saved as gym nm2-min5-hp-b.
- Damage taken 187, by source: boss:amusing 83.4, Hot oil 21.8, enemy:cave-grub 20.4, enemy:compost-maggot 18.2, boss:beetle-queen 17.1, enemy:aphid 6.5, enemy:ketchup-drop 5.1, Spore vent 4.9.
- Damage dealt 114997, by weapon: pressure-cooker 58968, railfry 32341.1, steam-vent 9455.2, fry-lance 8752.3, grok-bot 3367.1, hot-streak 2113.2.
- Kills 2552, by weapon: pressure-cooker 1275, railfry 623, fry-lance 279, steam-vent 261, grok-bot 72, hot-streak 42.
- Bosses killed 9, elites killed 9, boss chests 17, crates bought 3, shrines used 0, items bought 0, revives used 0; gold earned 1197, spent 217.
- Made: pressure-cooker at 02:42, railfry at 03:13.
