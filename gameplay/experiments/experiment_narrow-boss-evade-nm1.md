# Does a narrow boss-only evade rule keep chests flowing on fresh Nightmare 1 seeds

| Field | Value |
| --- | --- |
| Status | running |
| Area | models |
| Result | - |
| Coach | sonnet-medium |
| Created | sonnet-medium L3.I1 |
| Updated | sonnet-medium L3.I2 |

## Hypothesis

Evading only for a boss within 200 or health under 40% keeps chests and evolutions flowing and survives 0-5 minutes on fresh seeds as well as plain chest-first, and a catalyst-committed pick prompt gets an evolution by 5:00.

## Method

Fresh NM1 steam-vent on seeds 1212, 1313, 1414 with the narrow text, a catalyst pick variant on 1212, and a playbook-text control on 1313; compare chests, evolutions, evade goals, damage and survival.

## Findings

L3.I1: narrow text survived 3 of 3 but starved chests on 1313 and 1414; catalyst picks worse on 1212; control died 4:28. L3.I2 tests a tighter boss-within-100 variant on 1414.

## Games

### L3.I1.G1: narrow evade seed 1212

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1212; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.2s (game clock 05:00), health 120/120; damage taken 32 (enemy:cave-grub 11.4, enemy:tomato-leech 8.9, Hot oil 5.1, Spore vent 3.1); 2425 kills; level 1 to 18; planner asked 102 times, action model 342, in lockstep; ended with pressure-cooker 1, root-spikes 2, sprout-squad 7, root-network 5, hearty-helping 5, butter-pat 5, spud-sneakers 3, clean-plate 2, lean-lunch 1.
- Damage taken 32, by source: enemy:cave-grub 11.4, enemy:tomato-leech 8.9, Hot oil 5.1, Spore vent 3.1, enemy:bog-slime 1.9, enemy:aphid 1.3.
- Damage dealt 90935, by weapon: pressure-cooker 76110.3, sprout-squad 9974.6, steam-vent 3998.6, root-spikes 491.2, grok-bot 360.
- Kills 2425, by weapon: pressure-cooker 2060, sprout-squad 208, steam-vent 140, grok-bot 12, root-spikes 5.
- Bosses killed 3, elites killed 8, boss chests 11, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 930, spent 0.
- Made: pressure-cooker at 01:29.

### L3.I1.G2: narrow evade seed 1313

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1313; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.1s (game clock 05:00), health 73/120; damage taken 73 (enemy:potato-beetle 15.7, enemy:sprout-mite 11.7, boss:beetle-queen 8.2, enemy:snow-mold 7.9); 271 kills; level 1 to 10; planner asked 87 times, action model 788, in lockstep; ended with steam-vent 3, butter-socks 2, slow-cooker 3, chives 1, thick-skin 1.
- Damage taken 73, by source: enemy:potato-beetle 15.7, enemy:sprout-mite 11.7, boss:beetle-queen 8.2, enemy:snow-mold 7.9, boss:amusing 7.8, enemy:aphid 6.3, enemy:compost-maggot 5.9, Brambles 4.8.
- Damage dealt 9398, by weapon: steam-vent 9398.4.
- Kills 271, by weapon: steam-vent 271.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 60, spent 0.
- Made: no evolution, union or evolved item.

### L3.I1.G3: narrow evade seed 1414

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1414; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.1s (game clock 05:00), health 33/120; damage taken 246 (boss:the-masher 101.4, enemy:frost-flea 27.5, enemy:snow-mold 22, enemy:garden-slug 17.3); 1372 kills; level 1 to 15; planner asked 102 times, action model 737, in lockstep; ended with steam-vent 5, root-spikes 3, potato-rain 1, thick-skin 2, root-network 2, sour-cream 1, masher-grip 1.
- Damage taken 246, by source: boss:the-masher 101.4, enemy:frost-flea 27.5, enemy:snow-mold 22, enemy:garden-slug 17.3, enemy:ketchup-drop 15.5, boss:beetle-queen 13.6, enemy:bog-slime 11.2, enemy:aphid 10.7.
- Damage dealt 49701, by weapon: root-spikes 19401.5, steam-vent 17549.1, potato-rain 12750.1.
- Kills 1372, by weapon: root-spikes 602, steam-vent 459, potato-rain 311.
- Bosses killed 1, elites killed 6, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 174, spent 0.
- Made: no evolution, union or evolved item.

### L3.I1.G4: narrow evade seed 1212 catalyst picks

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1212; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: alive after 300s (game clock 05:00), health 69/120; damage taken 161 (enemy:tomato-leech 52.3, boss:the-masher 34.6, enemy:crumb-ant 7.6, boss:amusing 7.5); 914 kills; level 1 to 13; planner asked 94 times, action model 829, in lockstep; ended with steam-vent 4, root-spikes 1, mash-finisher 5, starch-plating 1, root-network 1.
- Damage taken 161, by source: enemy:tomato-leech 52.3, boss:the-masher 34.6, enemy:crumb-ant 7.6, boss:amusing 7.5, enemy:potato-beetle 6.7, enemy:cave-grub 6.6, enemy:snow-mold 6.4, enemy:fry-fly 6.4.
- Damage dealt 31200, by weapon: root-spikes 19185.2, steam-vent 11924.7, grok-bot 90.5.
- Kills 914, by weapon: root-spikes 587, steam-vent 321, grok-bot 6.
- Bosses killed 1, elites killed 6, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 201, spent 0.
- Made: no evolution, union or evolved item.

### L3.I1.G5: control: playbook text seed 1313

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1313; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 268.9s (game clock 04:28); damage taken 211 (enemy:beetle-brood 46.4, enemy:cave-grub 28.2, boss:beetle-queen 22.1, boss:the-masher 14.9); 480 kills; level 1 to 11; planner asked 82 times, action model 624, in lockstep; ended with steam-vent 3, frying-pan 2, butter-socks 3, starch-plating 4.
- Damage taken 211, by source: enemy:beetle-brood 46.4, enemy:cave-grub 28.2, boss:beetle-queen 22.1, boss:the-masher 14.9, enemy:compost-maggot 11.9, enemy:sprout-mite 10.9, enemy:potato-beetle 10, enemy:fry-fly 10; the killing blow: boss:beetle-queen.
- Damage dealt 21021, by weapon: steam-vent 10790.9, frying-pan 9787.1, grok-bot 443.4.
- Kills 480, by weapon: steam-vent 240, frying-pan 222, grok-bot 18.
- Bosses killed 1, elites killed 3, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 151, spent 0.
- Made: no evolution, union or evolved item.

### L3.I2.G4: tight exception boss 100 seed 1414

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1414; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 05:00), health 120/120; damage taken 82 (enemy:bog-slime 19.1, enemy:garden-slug 17.5, enemy:ketchup-drop 14.8, enemy:aphid 8.4); 2192 kills; level 1 to 17; planner asked 103 times, action model 601, in lockstep; ended with steam-vent 6, hunters-moon 1, spud-lob 1, thick-skin 2, gpu 2, butter-pat 3, potato-magnet 1, root-network 2.
- Damage taken 82, by source: enemy:bog-slime 19.1, enemy:garden-slug 17.5, enemy:ketchup-drop 14.8, enemy:aphid 8.4, Hot oil 6.5, enemy:sprout-mite 5.3, enemy:parking-gull 4.4, enemy:tomato-leech 3.7.
- Damage dealt 76232, by weapon: hunters-moon 43868.7, harvest-moon 18642.8, spud-lob 8436.9, steam-vent 4922.9, grok-bot 360.5.
- Kills 2192, by weapon: hunters-moon 1181, harvest-moon 657, spud-lob 178, steam-vent 163, grok-bot 13.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 509, spent 0.
- Made: hunters-moon at 03:24.
