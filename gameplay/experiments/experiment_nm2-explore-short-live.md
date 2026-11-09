# Does exploreDistance 100 cut live NM2 minute 0-1 chip damage by keeping explore legs short

| Field | Value |
| --- | --- |
| Status | done |
| Area | map |
| Result | refuted |
| Created | L5.I7 |
| Updated | L8.I1 |

## Hypothesis

Explore finds no chests in the first 2 minutes (chests come only from elites, nests and bosses), and 300-unit legs walk the bot into new pests. With exploreDistance 100 each leg ends quickly and the bot re-plans near where it is. It should lose less hp in minute 0-1 and reach 2:00 healthy enough to evolve and meet the Mascot.

## Method

Five fresh live NM2 steam-vent games of 300s on 1919, 4141, 2121, 1313 and 4444, where the unchanged playbook lived 0 of 5. Change only knobs.exploreDistance to 100. Compare hp at 1:00 and 2:00, chests, first evolution and survival. Confirmed at 4 of 5 alive at 5:00 with an evolution by about 2:30. Refuted at 2 or fewer of 5. Check that chests do not starve.

## Findings

L5.I7: 0 of 3 played games alive at 5:00 (died 2:03, 2:09, 2:29, no evolution, 0-3 chests); 2 games did not run because the bot exited with code 1. Even 2 of 2 on the missing seeds would be 2 of 5, so refuted. See B133.

## Games

### L5.I7.G1: explore 100 s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with exploreDistance 100.
- Outcome: died after 123.9s (game clock 02:03); damage taken 186 (enemy:tomato-leech 98, enemy:aphid 20.1, enemy:potato-beetle 16.4, enemy:bog-slime 15.7); 215 kills; level 1 to 8; planner asked 54 times, action model 427; the models saw the game 30 ms late (p90 49); ended with steam-vent 5, peel-out 1, root-network 1, chives 1.
- Damage taken 186, by source: enemy:tomato-leech 98, enemy:aphid 20.1, enemy:potato-beetle 16.4, enemy:bog-slime 15.7, enemy:sprout-mite 14.2, enemy:ketchup-drop 7.5, enemy:wireworm-larva 5.6, enemy:compost-maggot 3.7; the killing blow: enemy:potato-beetle.
- Damage dealt 5328, by weapon: steam-vent 5327.9.
- Kills 215, by weapon: steam-vent 215.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 20, spent 0.
- Made: no evolution, union or evolved item.

### L5.I7.G2: explore 100 s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with exploreDistance 100.
- Outcome: not played: the bot exited with code 1; see /Users/stefan/code/tibobit/.runs/rsi/logs/L5.I7.G2.bot.log.

### L5.I7.G3: explore 100 s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with exploreDistance 100.
- Outcome: died after 129.1s (game clock 02:09); damage taken 140 (boss:amusing 62.6, enemy:potato-beetle 52.6, enemy:sprout-mite 8.7, enemy:aphid 8.4); 365 kills; level 1 to 9; planner asked 69 times, action model 369; the models saw the game 29 ms late (p90 50); ended with steam-vent 1, mash-snowball 2, reset-button 8, frying-pan 1, deep-fryer 1, four-eyed-spud 1.
- Damage taken 140, by source: boss:amusing 62.6, enemy:potato-beetle 52.6, enemy:sprout-mite 8.7, enemy:aphid 8.4, enemy:compost-maggot 4.1, enemy:tomato-leech 3.4; the killing blow: boss:amusing.
- Damage dealt 10573, by weapon: mash-snowball 6548.9, frying-pan 1444.7, steam-vent 953.3, deep-fryer 759.1, reset-button 711, grok-bot 155.8.
- Kills 365, by weapon: mash-snowball 236, reset-button 41, frying-pan 38, steam-vent 24, deep-fryer 14, grok-bot 12.
- Bosses killed 0, elites killed 3, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 163, spent 0.
- Made: no evolution, union or evolved item.

### L5.I7.G4: explore 100 s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with exploreDistance 100.
- Outcome: died after 149.3s (game clock 02:29); damage taken 255 (boss:amusing 107.7, enemy:tomato-leech 65.3, enemy:aphid 19.2, enemy:sprout-mite 17); 613 kills; level 1 to 10; planner asked 71 times, action model 518; the models saw the game 30 ms late (p90 51); ended with steam-vent 1, spud-dynamo 1, deep-fryer 1, butter-streak 1, locked-gatling 1, gravy-heart 3, packed-pan 1, root-network 1.
- Damage taken 255, by source: boss:amusing 107.7, enemy:tomato-leech 65.3, enemy:aphid 19.2, enemy:sprout-mite 17, enemy:potato-beetle 15, enemy:crumb-ant 8.3, enemy:oil-drip 7.3, enemy:garden-slug 3.6; the killing blow: boss:amusing.
- Damage dealt 16431, by weapon: butter-streak 5257.1, locked-gatling 3391.4, spud-dynamo 3272.5, deep-fryer 2409.5, steam-vent 2017.5, grok-bot 83.1.
- Kills 613, by weapon: butter-streak 203, locked-gatling 138, deep-fryer 113, steam-vent 85, spud-dynamo 68, grok-bot 6.
- Bosses killed 0, elites killed 3, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 54, spent 0.
- Made: no evolution, union or evolved item.

### L5.I7.G5: explore 100 s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook with exploreDistance 100.
- Outcome: not played: the bot exited with code 1; see /Users/stefan/code/tibobit/.runs/rsi/logs/L5.I7.G5.bot.log.
