# What keeps Tibo alive in the first 150s of Nightmare 10

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | movement |
| Result | - |
| Created | sonnet-medium L1.I3 |
| Updated | reset at the restart (L4) |

## Hypothesis

Early deaths on NM10 come from move choice and reaction lag rather than the weapon; lockstep, a more defensive action setting, an easier dash prompt or a safer goal prompt each lengthen survival versus the same-seed baseline.

## Method

Five fresh NM10 steam-vent games on seed 303, 150s, differing only in one change each: none, lockstep 1, extraDamage 0 with distrustSeconds 10, a permissive dash prompt, and a safer planner.goal prompt. Compare survival time, health at 1:00 and damage by source.

## Findings

L1.I4: lockstep 1 survived 300s in 2 of 4 games (seeds 303 and 404), the live control died at 124s. extraDamage 0 under lockstep died at 213s, so no gain. Survivors opened chests early and evolved. L1.I5 repeats on seed 505 and tests boss ranges and planEvery 10.

Reset at the restart: still running from an earlier loop and measured with lockstep on, so its games need replaying live before they count.

## Games

### L1.I3.G1: baseline steam-vent NM10

- Start: a fresh game on Nightmare 10 with steam-vent, seed 303; 150s; plays the playbook.
- Outcome: died after 123.1s (game clock 02:03); damage taken 147 (enemy:aphid 29.9, enemy:garden-slug 21, enemy:bog-slime 16.7, enemy:fry-fly 14.8); 73 kills; level 1 to 4; ended with steam-vent 2, reset-button 1, hash-hawk 1.
- Damage taken 147, by source: enemy:aphid 29.9, enemy:garden-slug 21, enemy:bog-slime 16.7, enemy:fry-fly 14.8, enemy:wireworm-larva 13.6, boss:amusing 9.9, enemy:sprout-mite 9.6, enemy:ketchup-drop 8.6; the killing blow: boss:amusing.
- Damage dealt 5807, by weapon: hash-hawk 2659.4, steam-vent 1835.7, reset-button 1303.5, grok-bot 8.7.
- Kills 73, by weapon: steam-vent 35, reset-button 20, hash-hawk 17, grok-bot 1.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2, spent 0.
- Made: no evolution, union or evolved item.

### L1.I3.G2: lockstep 1

- Start: a fresh game on Nightmare 10 with steam-vent, seed 303; 150s; plays the playbook with lockstep 1.
- Outcome: alive after 150.1s (game clock 02:30), health 62/120; damage taken 60 (boss:amusing 29.6, enemy:ketchup-drop 7.2, enemy:compost-maggot 5.1, enemy:bog-slime 4.9); 217 kills; level 1 to 8; ended with steam-vent 1, small-fry 3, broadside 1, skipping-cannonball 1, mash-golem 1, reset-button 1, peel-out 1.
- Damage taken 60, by source: boss:amusing 29.6, enemy:ketchup-drop 7.2, enemy:compost-maggot 5.1, enemy:bog-slime 4.9, enemy:potato-beetle 3.6, Spore vent 3.1, enemy:bowling-pin 2.5, enemy:crumb-ant 1.9.
- Damage dealt 22676, by weapon: broadside 10065.6, small-fry 5166.7, reset-button 4430.5, steam-vent 1827.7, skipping-cannonball 665, mash-golem 520.8.
- Kills 217, by weapon: broadside 103, small-fry 64, reset-button 33, steam-vent 16, mash-golem 1.
- Bosses killed 0, elites killed 3, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 57, spent 0.
- Made: no evolution, union or evolved item.

### L1.I3.G3: defensive action knobs

- Start: a fresh game on Nightmare 10 with steam-vent, seed 303; 150s; plays the playbook with extraDamage 0, distrustSeconds 10, safeMargin 0.05.
- Outcome: not played: the bot exited with code 1; see /Users/stefan/code/tibobit/.runs/rsi/sonnet-medium/logs/L1.I3.G3.bot.log.

### L1.I3.G4: permissive dash prompt

- Start: a fresh game on Nightmare 10 with steam-vent, seed 303; 150s; plays the playbook with its own action.dash.
- Outcome: alive after 150.1s (game clock 02:30), health 14/120; damage taken 106 (boss:amusing 46.1, enemy:snow-mold 15.1, enemy:potato-beetle 13.9, enemy:cave-grub 7.5); 280 kills; level 1 to 7; ended with steam-vent 3, tot-stampede 1, salt-line 2, sprout-satellites 1, hash-brown-shield 1.
- Damage taken 106, by source: boss:amusing 46.1, enemy:snow-mold 15.1, enemy:potato-beetle 13.9, enemy:cave-grub 7.5, enemy:frost-flea 6.3, enemy:aphid 5.2, enemy:sand-crab 5.2, enemy:sprout-mite 3.8.
- Damage dealt 23614, by weapon: salt-line 9946.6, tot-stampede 6107, hash-brown-shield 3219.1, steam-vent 2198.3, sprout-satellites 2142.6.
- Kills 280, by weapon: tot-stampede 108, salt-line 92, hash-brown-shield 34, steam-vent 30, sprout-satellites 16.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 8, spent 0.
- Made: no evolution, union or evolved item.

### L1.I3.G5: gems and evade goal prompt

- Start: a fresh game on Nightmare 10 with steam-vent, seed 303; 150s; plays the playbook with its own planner.goal.
- Outcome: died after 109.7s (game clock 01:49); damage taken 122 (enemy:tomato-leech 38.2, enemy:aphid 27.2, enemy:frost-flea 18.1, enemy:sand-crab 10.4); 80 kills; level 1 to 5; ended with steam-vent 2, reset-button 1, fry-sentry 1, tater-pup 1.
- Damage taken 122, by source: enemy:tomato-leech 38.2, enemy:aphid 27.2, enemy:frost-flea 18.1, enemy:sand-crab 10.4, enemy:sprout-mite 7.7, enemy:snow-mold 4.6, enemy:wireworm-larva 4.3, enemy:fry-fly 3.7; the killing blow: enemy:snow-mold.
- Damage dealt 4372, by weapon: steam-vent 2420.3, fry-sentry 1280.5, reset-button 573.3, tater-pup 98.
- Kills 80, by weapon: steam-vent 43, fry-sentry 18, reset-button 17, tater-pup 2.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 4, spent 0.
- Made: no evolution, union or evolved item.

### L1.I4.G1: lockstep1 seed303 repeat

- Start: a fresh game on Nightmare 10 with steam-vent, seed 303; 300s; plays the playbook.
- Outcome: died after 243.7s (game clock 04:03); damage taken 160 (boss:beetle-queen 32.6, boss:the-masher 27.2, enemy:potato-beetle 19.3, boss:amusing 14.8); 604 kills; level 1 to 11; planner asked 80 times, action model 629, in lockstep; ended with steam-vent 1, tot-stampede 2, tot-toss 1, fry-knives 3, spud-decoy 1, sprout-satellites 1, lean-lunch 1, chives 1.
- Damage taken 160, by source: boss:beetle-queen 32.6, boss:the-masher 27.2, enemy:potato-beetle 19.3, boss:amusing 14.8, enemy:bowling-ball 13.7, enemy:wireworm-larva 12.2, enemy:sprout-mite 11.8, enemy:frost-flea 6.6; the killing blow: boss:the-masher.
- Damage dealt 64386, by weapon: spud-decoy 33313.8, tot-stampede 13533.5, steam-vent 5267.7, grok-bot 4647.7, tot-toss 3887.8, fry-knives 2519.6, sprout-satellites 1215.8.
- Kills 604, by weapon: spud-decoy 307, tot-stampede 162, steam-vent 45, grok-bot 45, tot-toss 32, fry-knives 8, sprout-satellites 5.
- Bosses killed 0, elites killed 1, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 45, spent 0.
- Made: no evolution, union or evolved item.

### L1.I4.G2: live control seed404

- Start: a fresh game on Nightmare 10 with steam-vent, seed 404; 300s; plays the playbook with lockstep 0.
- Outcome: died after 123.8s (game clock 02:03); damage taken 139 (enemy:potato-beetle 41.5, boss:amusing 29.6, enemy:fry-fly 28.7, enemy:cave-grub 9.2); 232 kills; level 1 to 7; planner asked 41 times, action model 615, live; ended with steam-vent 1, locked-gatling 2, skipping-cannonball 1, fry-knives 1, seed-potato 1, packed-pan 1.
- Damage taken 139, by source: enemy:potato-beetle 41.5, boss:amusing 29.6, enemy:fry-fly 28.7, enemy:cave-grub 9.2, enemy:aphid 7.7, enemy:garden-slug 5.2, enemy:sand-crab 5.1, enemy:swarm-fly 4.1; the killing blow: boss:amusing.
- Damage dealt 16718, by weapon: locked-gatling 9952.7, seed-potato 3454.2, steam-vent 1729.8, skipping-cannonball 929.9, fry-knives 651.4.
- Kills 232, by weapon: locked-gatling 155, seed-potato 47, steam-vent 19, skipping-cannonball 11.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 9, spent 0.
- Made: no evolution, union or evolved item.

### L1.I4.G3: lockstep1 seed404

- Start: a fresh game on Nightmare 10 with steam-vent, seed 404; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 05:00), health 134/134; damage taken 83 (boss:amusing 47.7, enemy:fry-fly 18.2, enemy:potato-beetle 4.6, enemy:crumb-ant 4.5); 2941 kills; level 1 to 20; planner asked 109 times, action model 507, in lockstep; ended with pressure-cooker 1, locked-gatling 2, mash-wave 7, frozen-fries 2, sprouting-eyes 5, root-network 3, big-bowl 1, starch-plating 2.
- Damage taken 83, by source: boss:amusing 47.7, enemy:fry-fly 18.2, enemy:potato-beetle 4.6, enemy:crumb-ant 4.5, boss:beetle-queen 4.1, enemy:sprout-mite 4.
- Damage dealt 400476, by weapon: pressure-cooker 181910.9, mash-wave 136593.5, locked-gatling 50440.1, steam-vent 19636.3, frozen-fries 11017.7, grok-bot 877.7.
- Kills 2941, by weapon: pressure-cooker 1358, mash-wave 928, locked-gatling 342, steam-vent 239, frozen-fries 62, grok-bot 12.
- Bosses killed 9, elites killed 6, boss chests 7, crates bought 0, shrines used 1, items bought 0, revives used 0; gold earned 846, spent 0.
- Made: [object Object].

### L1.I4.G4: lockstep1 extraDamage0

- Start: a fresh game on Nightmare 10 with steam-vent, seed 303; 300s; plays the playbook with extraDamage 0.
- Outcome: died after 213s (game clock 03:33); damage taken 150 (boss:amusing 59.3, enemy:bowling-ball 22.4, enemy:ketchup-drop 18.2, boss:beetle-queen 16.3); 575 kills; level 1 to 9; planner asked 69 times, action model 532, in lockstep; ended with steam-vent 2, seed-potato 3, starch-chain 1, rosti-disc 1, spud-cannon 2, hash-hawk 1, hot-sauce 1.
- Damage taken 150, by source: boss:amusing 59.3, enemy:bowling-ball 22.4, enemy:ketchup-drop 18.2, boss:beetle-queen 16.3, enemy:bog-slime 9.6, enemy:crumb-ant 5.7, enemy:garden-slug 5.6, enemy:sprout-mite 4.6; the killing blow: enemy:bowling-ball.
- Damage dealt 70465, by weapon: seed-potato 25466.8, hash-hawk 11024.7, rosti-disc 9041.1, starch-chain 9040.7, spud-cannon 8427.9, steam-vent 7463.4.
- Kills 575, by weapon: seed-potato 220, starch-chain 86, steam-vent 85, spud-cannon 81, hash-hawk 59, rosti-disc 44.
- Bosses killed 1, elites killed 1, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 55, spent 0.
- Made: no evolution, union or evolved item.

### L1.I4.G5: lockstep1 explicit dash prompt

- Start: a fresh game on Nightmare 10 with steam-vent, seed 303; 300s; plays the playbook with its own action.dash.
- Outcome: alive after 300.2s (game clock 05:00), health 138/138; damage taken 97 (boss:the-masher 51, enemy:garden-slug 16.5, boss:amusing 14.8, enemy:aphid 6.6); 2137 kills; level 1 to 19; planner asked 108 times, action model 749, in lockstep; ended with steam-vent 1, mash-landing 4, tater-twister 1, rosti-storm 1, mash-golem 1, mash-snowball 1, packed-pan 2, salt-shaker 1, starch-plating 3, masher-grip 1.
- Damage taken 97, by source: boss:the-masher 51, enemy:garden-slug 16.5, boss:amusing 14.8, enemy:aphid 6.6, enemy:snow-mold 5.7, Brambles 2.7.
- Damage dealt 381260, by weapon: tater-twister 186890.4, tater-twirl 74051.3, rosti-storm 59722.7, rosti-disc 24933.9, mash-snowball 24271, grok-bot 6097.8, mash-golem 2899.3, steam-vent 2092.
- Kills 2137, by weapon: tater-twister 1110, tater-twirl 645, rosti-storm 174, grok-bot 71, mash-snowball 60, rosti-disc 42, steam-vent 23, mash-golem 10.
- Bosses killed 9, elites killed 6, boss chests 9, crates bought 2, shrines used 0, items bought 0, revives used 0; gold earned 891, spent 102.
- Made: [object Object], [object Object].

### L1.I5.G3: lockstep seed505

- Start: a fresh game on Nightmare 10 with steam-vent, seed 505; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 30 (enemy:potato-beetle 19.8, boss:the-masher 10.2); 3876 kills; level 1 to 20; planner asked 107 times, action model 285, in lockstep; ended with steam-vent 1, wildfire-roast 1, reset-button 2, gravy-boat 1, spud-fence 7, spud-decoy 1, big-bowl 4, thick-skin 1, root-network 1, gpu 2.
- Damage taken 30, by source: enemy:potato-beetle 19.8, boss:the-masher 10.2.
- Damage dealt 551396, by weapon: wildfire-roast 479556.9, hot-streak 38106, spud-fence 17199.3, spud-decoy 6738.3, gravy-boat 5127.2, reset-button 3636.5, steam-vent 680.9, grok-bot 350.8.
- Kills 3876, by weapon: wildfire-roast 3155, hot-streak 522, spud-fence 96, reset-button 39, spud-decoy 30, gravy-boat 18, steam-vent 8, grok-bot 8.
- Bosses killed 9, elites killed 6, boss chests 5, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 760, spent 0.
- Made: [object Object].

### L1.I5.G4: lockstep seed505 boss ranges 300

- Start: a fresh game on Nightmare 10 with steam-vent, seed 505; 300s; plays the playbook with distrustBossRange 300, bossOfferRange 300.
- Outcome: alive after 300.2s (game clock 05:00), health 120/120; damage taken 67 (Brambles 30.6, enemy:wireworm-larva 19.8, enemy:spittlebug 10.7, boss:beetle-queen 3.5); 2942 kills; level 1 to 20; planner asked 108 times, action model 376, in lockstep; ended with steam-vent 1, wildfire-roast 1, fry-lance 4, potato-rain 2, spud-cannon 1, whisk-vortex 1, thick-skin 2, starch-plating 1, hot-start 1, peel-out 3, hash-rush 1, root-network 2.
- Damage taken 67, by source: Brambles 30.6, enemy:wireworm-larva 19.8, enemy:spittlebug 10.7, boss:beetle-queen 3.5, enemy:sprout-mite 2.3.
- Damage dealt 480235, by weapon: wildfire-roast 323185.8, hot-streak 113347.4, whisk-vortex 15183.2, fry-lance 13222.6, spud-cannon 9078.7, potato-rain 4835.3, steam-vent 883.3, grok-bot 499.2.
- Kills 2942, by weapon: wildfire-roast 1569, hot-streak 1176, whisk-vortex 86, spud-cannon 32, fry-lance 31, potato-rain 29, steam-vent 11, grok-bot 8.
- Bosses killed 9, elites killed 6, boss chests 6, crates bought 0, shrines used 1, items bought 0, revives used 0; gold earned 711, spent 0.
- Made: [object Object].

### L1.I5.G5: lockstep seed505 planEvery 10

- Start: a fresh game on Nightmare 10 with steam-vent, seed 505; 300s; plays the playbook with planEvery 10.
- Outcome: died after 188.7s (game clock 03:08); damage taken 194 (boss:amusing 88.9, enemy:tomato-leech 71.2, enemy:beetle-brood 13.7, enemy:crumb-ant 5.7); 727 kills; level 1 to 11; planner asked 48 times, action model 513, in lockstep; ended with steam-vent 1, mash-snowball 2, peel-phantom 1, skipping-cannonball 2, whisk-vortex 1, sprouting-eyes 1, root-network 3, stuffed-skin 1.
- Damage taken 194, by source: boss:amusing 88.9, enemy:tomato-leech 71.2, enemy:beetle-brood 13.7, enemy:crumb-ant 5.7, enemy:fry-fly 4, enemy:ketchup-drop 3.4, enemy:bog-slime 2.7, enemy:lint-bunny 2.4; the killing blow: enemy:tomato-leech.
- Damage dealt 65111, by weapon: mash-snowball 33170.4, whisk-vortex 22001.4, skipping-cannonball 4397.7, steam-vent 3171.7, peel-phantom 1879.9, grok-bot 489.6.
- Kills 727, by weapon: mash-snowball 329, whisk-vortex 283, steam-vent 45, skipping-cannonball 43, peel-phantom 16, grok-bot 11.
- Bosses killed 3, elites killed 3, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 114, spent 0.
- Made: no evolution, union or evolved item.
