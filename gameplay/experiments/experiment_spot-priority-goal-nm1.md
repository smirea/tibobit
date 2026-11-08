# Does ranking safe charging spots after chests help a natural Nightmare 1 build

| Field | Value |
| --- | --- |
| Status | running |
| Area | economy |
| Result | - |
| Coach | sonnet-high |
| Created | sonnet-high L1.I7 |
| Updated | sonnet-high L1.I7 |

## Hypothesis

A goal prompt that puts chests and elites first and then safe charging spots (shrines, whetstone, seed vault) above exploring and gems makes the bot use the spots it ignores today (shrines used 0 in most games), giving stronger weapons and stats and no more damage than chest-first alone.

## Method

From nm1-min5-fresh, 300s, the chest-first prompt with one added sentence ranking safe spots next; compare shrines used, whetstone levels, damage and evolutions with the chest-first games I5.G3, I6.G2 and I6.G3.

## Findings

(none yet)

## Games

### L1.I7.G5: min5 chest-first plus spots

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 10:00), health 132/132; damage taken 99 (enemy:bog-toad 35.1, boss:sir-strawman 16.8, boss:fryer-king 14.4, enemy:sand-crab 12.1); 8967 kills; level 17 to 32; planner asked 110 times, action model 302, in lockstep; ended with pressure-cooker 1, stand-mixer 1, sack-of-russets 1, hot-potato 8, mashquake 1, peel-poltergeist 1, big-bowl 5, hot-start 3, aged-russet 4, root-network 2, peel-out 2, butter-pat 5.
- Damage taken 99, by source: enemy:bog-toad 35.1, boss:sir-strawman 16.8, boss:fryer-king 14.4, enemy:sand-crab 12.1, boss:late-blight 7.2, enemy:tomato-leech 5.1, Hot oil 4.4, enemy:ketchup-drop 3.4.
- Damage dealt 773746, by weapon: stand-mixer 230129.4, mashquake 215081.3, hot-potato 171023.7, pressure-cooker 58982.5, spud-lob 38906.1, sack-of-russets 16161.7, grok-bot 15575.3, mash-wave 13446.6.
- Kills 8967, by weapon: stand-mixer 3100, mashquake 2363, hot-potato 1603, pressure-cooker 643, spud-lob 350, mash-wave 289, whisk-vortex 209, grok-bot 198.
- Bosses killed 4, elites killed 15, boss chests 26, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2460, spent 0.
- Made: stand-mixer at 05:44, pressure-cooker at 06:35, peel-poltergeist at 07:09, mashquake at 07:33, sack-of-russets at 09:46.
