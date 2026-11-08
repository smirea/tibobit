# Does an hp-first pick prompt from 0:00 get a natural Nightmare 2 run to Gravy Heart, Stuffed Skin and Thick Skin without losing chests or evolutions

| Field | Value |
| --- | --- |
| Status | done |
| Area | build |
| Result | refuted |
| Coach | sonnet-high |
| Created | sonnet-high L3.I7 |
| Updated | sonnet-high L3.I10 |

## Hypothesis

A pick prompt that keeps evolution catalysts first and then takes Gravy Heart, Stuffed Skin, Thick Skin and Starch Plating over filler and dash passives gives about 150-200 max hp by 5:00 on Nightmare 2 with the same chests and first evolution time as the unchanged playbook.

## Method

Fresh NM2 steam-vent seeds 3131, 3333 and 3434, 300s, hp-first pick prompt, against the known baselines on the same seeds (25, 84 and 23 damage, all alive, pressure-cooker at 1:38 and 1:37). Compare max hp, chests, first evolution time, passives held at 5:00, damage and survival. Save two 5:00 gyms to continue to 10:00 with the same prompt.

## Findings

Plain hp-first picks left 3131 and 3333 with no evolution. Catalyst-first picks lived 3131, 3333 and 3636 but died on 3434 and 3535 (4:34, 4:08) with no evolution, against baselines that lived. No reliable gain, so it is not adopted.

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

### L3.I8.G4: seed 3131 catalyst-first hp picks

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3131; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.2s (game clock 05:00), health 192/192; damage taken 45 (enemy:aphid 9.5, boss:beetle-queen 8.5, enemy:wireworm-larva 6.5, enemy:sprout-mite 6.4); 5807 kills; level 1 to 21; planner asked 135 times, action model 229, in lockstep; ended with pressure-cooker 1, tater-minigun 1, factory-reset 1, kettle-cyclone 1, hot-streak 1, root-network 5, masher-grip 5, four-eyed-spud 5, gpu 5, gravy-heart 5, thick-skin 1.
- Damage taken 45, by source: enemy:aphid 9.5, boss:beetle-queen 8.5, enemy:wireworm-larva 6.5, enemy:sprout-mite 6.4, enemy:potato-beetle 4.7, boss:amusing 3.5, Spore vent 3.3, enemy:crumb-ant 2.7.
- Damage dealt 275513, by weapon: kettle-cyclone 164581.7, tater-minigun 44119.1, pressure-cooker 31530.4, chip-shuriken 19096.3, locked-gatling 6574.3, grok-bot 4338.4, reset-button 2679.3, steam-vent 1679.7.
- Kills 5807, by weapon: kettle-cyclone 3331, tater-minigun 840, pressure-cooker 697, chip-shuriken 479, locked-gatling 208, reset-button 103, grok-bot 71, steam-vent 61.
- Bosses killed 9, elites killed 18, boss chests 27, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 2087, spent 30.
- Made: pressure-cooker at 01:21, tater-minigun at 02:21, factory-reset at 03:03, kettle-cyclone at 03:27.

### L3.I8.G5: seed 3333 catalyst-first hp picks

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3333; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300s (game clock 05:00), health 156/189; damage taken 155 (boss:the-masher 93.8, enemy:frost-flea 27.3, enemy:aphid 9.1, enemy:snow-mold 7.7); 4047 kills; level 1 to 21; planner asked 116 times, action model 534, in lockstep; ended with pressure-cooker 1, moon-cleaver 1, mash-snowball 8, hot-streak 2, stuffed-skin 2, root-network 1, rotten-spud 2, gravy-heart 3, thick-skin 1, masher-grip 1.
- Damage taken 155, by source: boss:the-masher 93.8, enemy:frost-flea 27.3, enemy:aphid 9.1, enemy:snow-mold 7.7, enemy:sprout-mite 4.8, enemy:potato-beetle 3.6, boss:beetle-queen 2.8, enemy:compost-maggot 2.6.
- Damage dealt 188535, by weapon: pressure-cooker 68362.2, moon-cleaver 63257.6, mash-snowball 27808.2, steam-vent 13442.8, mezzaluna 7009.3, hot-streak 6732, grok-bot 1922.6.
- Kills 4047, by weapon: pressure-cooker 1328, moon-cleaver 1238, mash-snowball 724, mezzaluna 286, steam-vent 234, hot-streak 161, grok-bot 76.
- Bosses killed 9, elites killed 6, boss chests 15, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 1047, spent 45.
- Made: moon-cleaver at 02:36, pressure-cooker at 03:26.

### L3.I9.G1: seed 3434 catalyst-first picks

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3434; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 274.6s (game clock 04:34); damage taken 291 (enemy:cave-grub 62.2, boss:the-masher 35.2, enemy:potato-beetle 28.7, boss:beetle-queen 25.6); 902 kills; level 1 to 13; planner asked 88 times, action model 715, in lockstep; ended with steam-vent 7, gravy-heart 2, hot-sauce 2, root-network 2, bacon-bits 1, stuffed-skin 1.
- Damage taken 291, by source: enemy:cave-grub 62.2, boss:the-masher 35.2, enemy:potato-beetle 28.7, boss:beetle-queen 25.6, enemy:beetle-brood 21.3, boss:amusing 17.4, enemy:compost-maggot 16.8, enemy:oil-drip 13.1; the killing blow: enemy:potato-beetle.
- Damage dealt 39720, by weapon: steam-vent 39001.7, grok-bot 718.2.
- Kills 902, by weapon: steam-vent 893, grok-bot 9.
- Bosses killed 3, elites killed 4, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 248, spent 0.
- Made: no evolution, union or evolved item.

### L3.I9.G2: seed 3535 catalyst-first picks

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3535; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 248.2s (game clock 04:08); damage taken 259 (boss:late-blight 38.5, boss:the-masher 35.2, boss:beetle-queen 34.1, enemy:beetle-brood 31.4); 1132 kills; level 1 to 14; planner asked 92 times, action model 609, in lockstep; ended with steam-vent 7, spud-cannon 3, tater-trot 1, butter-pat 1, root-network 3, aged-russet 1, hot-sauce 1.
- Damage taken 259, by source: boss:late-blight 38.5, boss:the-masher 35.2, boss:beetle-queen 34.1, enemy:beetle-brood 31.4, enemy:dumpster-raccoon 21.1, enemy:fry-fly 19.1, enemy:sand-crab 16.1, enemy:sprout-mite 15; the killing blow: boss:the-masher.
- Damage dealt 45018, by weapon: steam-vent 30726.9, spud-cannon 10296.8, alex 3342.2, grok-bot 652.3.
- Kills 1132, by weapon: steam-vent 670, spud-cannon 416, alex 38, grok-bot 8.
- Bosses killed 3, elites killed 4, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 266, spent 0.
- Made: no evolution, union or evolved item.

### L3.I9.G3: seed 3535 baseline

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3535; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 05:00), health 8/149; damage taken 397 (boss:beetle-queen 68.3, boss:the-masher 56.3, boss:amusing 55.6, enemy:beetle-brood 46); 2267 kills; level 1 to 17; planner asked 109 times, action model 741, in lockstep; ended with steam-vent 8, spud-dynamo 1, fry-lance 2, afterburner-fries 1, root-network 4, gravy-heart 2.
- Damage taken 397, by source: boss:beetle-queen 68.3, boss:the-masher 56.3, boss:amusing 55.6, enemy:beetle-brood 46, enemy:snow-mold 30.3, enemy:frost-flea 28.5, enemy:little-grey 25, enemy:potato-beetle 22.7.
- Damage dealt 93810, by weapon: steam-vent 47783.1, spud-dynamo 17700.2, fry-lance 17368, alex 10610.4, afterburner-fries 189.1, grok-bot 159.1.
- Kills 2267, by weapon: steam-vent 1378, fry-lance 432, alex 224, spud-dynamo 215, grok-bot 12, afterburner-fries 6.
- Bosses killed 3, elites killed 6, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 307, spent 0.
- Made: no evolution, union or evolved item.

### L3.I9.G4: seed 3636 catalyst-first picks

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3636; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300s (game clock 05:00), health 120/120; damage taken 74 (enemy:snow-mold 22.2, enemy:crumb-ant 15.3, enemy:oil-drip 10.6, enemy:sprout-mite 8.5); 2782 kills; level 1 to 18; planner asked 121 times, action model 287, in lockstep; ended with pressure-cooker 1, root-current 1, sprout-squad 1, golden-fry 5, gpu 5, masher-grip 5, root-network 5, hearty-helping 4.
- Damage taken 74, by source: enemy:snow-mold 22.2, enemy:crumb-ant 15.3, enemy:oil-drip 10.6, enemy:sprout-mite 8.5, boss:amusing 3.5, enemy:sand-crab 3.5, boss:beetle-queen 2.8, enemy:aphid 2.6.
- Damage dealt 136559, by weapon: root-current 71105.1, taproot-eruption 33468.5, pressure-cooker 18020.3, root-spikes 4316.8, steam-vent 3076.4, alex 3036.9, potato-battery 1504.6, sprout-squad 1086.7.
- Kills 2782, by weapon: root-current 1228, taproot-eruption 756, pressure-cooker 411, root-spikes 116, steam-vent 94, alex 81, grok-bot 49, potato-battery 39.
- Bosses killed 12, elites killed 12, boss chests 24, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2559, spent 0.
- Made: taproot-eruption at 01:23, pressure-cooker at 02:07, spud-grid at 03:17, root-current at 03:17.

### L3.I9.G5: seed 3636 baseline

- Start: a fresh game on Nightmare 2 with steam-vent, seed 3636; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 05:00), health 120/120; damage taken 38 (boss:amusing 13.9, enemy:beetle-brood 9.6, enemy:sand-crab 6.3, Hot oil 3.5); 3216 kills; level 1 to 18; planner asked 122 times, action model 127, in lockstep; ended with comet-scythe 8, grease-fire 1, rosti-storm 1, peel-phantom 7, thick-skin 2, packed-pan 2, root-network 2, starch-plating 2, bacon-bits 1.
- Damage taken 38, by source: boss:amusing 13.9, enemy:beetle-brood 9.6, enemy:sand-crab 6.3, Hot oil 3.5, enemy:ketchup-drop 1.6, enemy:sprout-mite 1.4, enemy:aphid 1.2, Brambles 0.8.
- Damage dealt 189247, by weapon: grease-fire 135522.8, rosti-storm 16671.9, wildfire-roast 16652.9, hot-streak 10325.7, rosti-disc 3354.8, comet-scythe 2411.3, grok-bot 1183.9, alex 1163.8.
- Kills 3216, by weapon: grease-fire 1980, wildfire-roast 453, hot-streak 295, rosti-storm 285, grok-bot 62, comet-scythe 38, rosti-disc 38, alex 28.
- Bosses killed 9, elites killed 15, boss chests 24, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1594, spent 15.
- Made: wildfire-roast at 02:06, pressure-cooker at 03:07, rosti-storm at 04:07, grease-fire at 03:07.
