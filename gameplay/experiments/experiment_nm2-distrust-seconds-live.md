# Does asking the action model for 10 s after an unforecast hit cut live NM2 minute 0-1 damage

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | refuted |
| Created | L5.I5 |
| Updated | L5.I6 |

## Hypothesis

With distrustSeconds 0 the page walks Tibo through hits the forecast called free (chargers, bullets) for the rest of the walk. Setting distrustSeconds 10 makes the action model rate every step for 10 s after such a hit, which lowers minute 0-1 hp loss and lets the bot reach 2:00 with enough hp to survive the Mascot and get its first evolution.

## Method

Five fresh live NM2 steam-vent games of 300s on 1919, 4141, 2121, 1313 and 4444, where the unchanged playbook lived 0 of 5, changing only knobs.distrustSeconds to 10. Compare hp at 1:00 and 2:00, hits walked through, dashes, chests, first evolution and survival. Confirmed at 4 of 5 alive at 5:00 with an evolution by about 2:30. Refuted at 2 or fewer.

## Findings

L5.I5: lived 0 of 5 on 1919, 4141, 2121, 1313, 4444 (died 1:54, 2:20, 2:11, 1:32, 2:09), same as the 0 of 5 controls. Minute 0-1 hp loss stayed at 71-111, and the page walked through only 1-6 hits per game. Not adopted. See B130.

## Games

### L5.I5.G1: distrust 10 s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with distrustSeconds 10.
- Outcome: died after 114.3s (game clock 01:54); damage taken 121 (enemy:potato-beetle 54.2, enemy:bowling-ball 27, enemy:aphid 15.8, enemy:sprout-mite 10.1); 99 kills; level 1 to 6; planner asked 43 times, action model 434; the models saw the game 27 ms late (p90 49); ended with steam-vent 2, afterburner-fries 1, potato-battery 1, peel-out 2.
- Damage taken 121, by source: enemy:potato-beetle 54.2, enemy:bowling-ball 27, enemy:aphid 15.8, enemy:sprout-mite 10.1, enemy:oil-drip 4.4, Spore vent 3.5, enemy:cave-grub 2.9, enemy:crumb-ant 1.5; the killing blow: enemy:bowling-ball.
- Damage dealt 3213, by weapon: steam-vent 2286.7, grok-bot 442.9, potato-battery 270, afterburner-fries 213.
- Kills 99, by weapon: steam-vent 87, potato-battery 8, grok-bot 2, afterburner-fries 2.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 8, spent 0.
- Made: no evolution, union or evolved item.

### L5.I5.G2: distrust 10 s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with distrustSeconds 10.
- Outcome: died after 140.8s (game clock 02:20); damage taken 243 (boss:amusing 93.8, enemy:potato-beetle 62, enemy:wireworm-larva 32.7, enemy:sprout-mite 11.6); 216 kills; level 1 to 7; planner asked 47 times, action model 537; the models saw the game 28 ms late (p90 49); ended with steam-vent 1, deep-fryer 1, potato-rain 1, root-network 2, gravy-heart 2.
- Damage taken 243, by source: boss:amusing 93.8, enemy:potato-beetle 62, enemy:wireworm-larva 32.7, enemy:sprout-mite 11.6, enemy:aphid 9.4, enemy:frost-flea 8.9, enemy:compost-maggot 7.1, Brambles 4; the killing blow: boss:amusing.
- Damage dealt 6430, by weapon: deep-fryer 3260.9, steam-vent 2033.7, potato-rain 1135.
- Kills 216, by weapon: deep-fryer 113, steam-vent 60, potato-rain 43.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 18, spent 0.
- Made: no evolution, union or evolved item.

### L5.I5.G3: distrust 10 s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with distrustSeconds 10.
- Outcome: died after 131.2s (game clock 02:11); damage taken 190 (boss:amusing 93.8, enemy:tomato-leech 60.8, Hot oil 20.1, enemy:potato-beetle 7.1); 335 kills; level 1 to 9; planner asked 52 times, action model 401; the models saw the game 29 ms late (p90 49); ended with steam-vent 1, mash-snowball 8, factory-reset 1, spud-lob 2, potato-rain 1, four-eyed-spud 2, masher-grip 1.
- Damage taken 190, by source: boss:amusing 93.8, enemy:tomato-leech 60.8, Hot oil 20.1, enemy:potato-beetle 7.1, enemy:bog-slime 3.9, enemy:ketchup-drop 3.8; the killing blow: boss:amusing.
- Damage dealt 13987, by weapon: mash-snowball 7277.1, reset-button 2000.5, spud-lob 1936, steam-vent 968.4, factory-reset 837.3, grok-bot 503.1, potato-rain 465.
- Kills 335, by weapon: mash-snowball 159, spud-lob 62, reset-button 44, potato-rain 23, factory-reset 23, grok-bot 18, steam-vent 6.
- Bosses killed 0, elites killed 9, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 414, spent 0.
- Made: factory-reset at 01:24.

### L5.I5.G4: distrust 10 s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with distrustSeconds 10.
- Outcome: died after 92.8s (game clock 01:32); damage taken 121 (enemy:sand-crab 83.4, enemy:dumpster-raccoon 16.3, enemy:fry-fly 15.6, enemy:potato-beetle 2.4); 141 kills; level 1 to 6; planner asked 31 times, action model 457; the models saw the game 30 ms late (p90 49); ended with steam-vent 1, whisk-vortex 1, skipping-cannonball 2, mash-golem 1, mash-finisher 1.
- Damage taken 121, by source: enemy:sand-crab 83.4, enemy:dumpster-raccoon 16.3, enemy:fry-fly 15.6, enemy:potato-beetle 2.4, enemy:frost-flea 1.6, enemy:compost-maggot 1.3, Spore vent 0.5; the killing blow: enemy:frost-flea.
- Damage dealt 4449, by weapon: whisk-vortex 3019, steam-vent 802.7, skipping-cannonball 440.5, mash-golem 186.5.
- Kills 141, by weapon: whisk-vortex 97, skipping-cannonball 21, steam-vent 16, mash-golem 7.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 12, spent 0.
- Made: no evolution, union or evolved item.

### L5.I5.G5: distrust 10 s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook with distrustSeconds 10.
- Outcome: died after 129.7s (game clock 02:09); damage taken 138 (boss:amusing 62.6, enemy:cave-grub 60.7, enemy:aphid 7.9, enemy:frost-flea 5.4); 359 kills; level 1 to 9; planner asked 53 times, action model 491; the models saw the game 29 ms late (p90 48); ended with steam-vent 1, root-spikes 1, julienne-dash 1, tot-toss 1, harvest-moon 1, seeker-sprouts 5, fertilizer 1.
- Damage taken 138, by source: boss:amusing 62.6, enemy:cave-grub 60.7, enemy:aphid 7.9, enemy:frost-flea 5.4, enemy:sprout-mite 1.4; the killing blow: boss:amusing.
- Damage dealt 9369, by weapon: root-spikes 1980.2, seeker-sprouts 1802.5, julienne-dash 1740, harvest-moon 1261, tot-toss 1072.5, grok-bot 772, steam-vent 740.3.
- Kills 359, by weapon: root-spikes 85, seeker-sprouts 67, harvest-moon 51, julienne-dash 48, grok-bot 48, tot-toss 44, steam-vent 16.
- Bosses killed 0, elites killed 3, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 88, spent 0.
- Made: no evolution, union or evolved item.
