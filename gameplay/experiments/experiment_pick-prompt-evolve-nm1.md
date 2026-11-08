# Does a pick prompt steering toward evolution recipes, HP and area help on Nightmare 1

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | models |
| Result | - |
| Created | sonnet-high L1.I5 |
| Updated | reset at the restart (L4) |

## Hypothesis

A planner.pick prompt that ranks recipe progress, max HP, regeneration and area above new weak weapons gives a build with more evolutions and less damage than the default pick prompt over minutes 5 to 10 and on a fresh seed.

## Method

From gym nm1-min5-fresh, 300s with the default pick prompt vs the evolve prompt, and on fresh NM1 seed 707 steam-vent, baseline vs evolve prompt. Compare evolutions made, level, max HP, damage taken and survival.

## Findings

Reset at the restart: still running from an earlier loop and measured with lockstep on, so its games need replaying live before they count.

## Games

### L1.I5.G2: natural 5:00 evolve picks

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.3s (game clock 10:00), health 50/120; damage taken 247 (boss:fryer-king 64.4, enemy:harvest-mouse 43.1, boss:sir-strawman 36.8, boss:late-blight 32.9); 8666 kills; level 17 to 32; planner asked 103 times, action model 696, in lockstep; ended with steam-vent 5, stand-mixer 1, spud-lob 1, hot-potato 1, mash-wave 8, peel-phantom 2, big-bowl 5, hot-start 3, aged-russet 1, peel-out 1, root-network 2.
- Damage taken 247, by source: boss:fryer-king 64.4, enemy:harvest-mouse 43.1, boss:sir-strawman 36.8, boss:late-blight 32.9, enemy:sizzle-imp 30.8, enemy:bog-toad 17.5, boss:the-masher 11.2, enemy:tomato-leech 5.1.
- Damage dealt 713439, by weapon: stand-mixer 414530.3, mash-wave 198784.9, whisk-vortex 38306.6, hot-potato 22629, spud-lob 16832.3, steam-vent 10108.6, grok-bot 5347.5, dog:terrier 3717.1.
- Kills 8666, by weapon: stand-mixer 4903, mash-wave 2137, whisk-vortex 728, hot-potato 339, spud-lob 182, steam-vent 148, grok-bot 127, dog:terrier 66.
- Bosses killed 4, elites killed 4, boss chests 6, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1185, spent 0.
- Made: stand-mixer at 07:02.

### L1.I5.G4: fresh seed 707 baseline

- Start: a fresh game on Nightmare 1 with steam-vent, seed 707; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 05:00), health 101/120; damage taken 133 (enemy:beetle-brood 35.1, boss:the-masher 26.9, enemy:dumpster-raccoon 13.5, enemy:potato-beetle 10.2); 1097 kills; level 1 to 13; planner asked 98 times, action model 830, in lockstep; ended with steam-vent 1, frozen-fries 7, comet-scythe 8, hot-potato 1, potato-rain 1, starch-plating 3, butter-socks 1, thick-skin 1, big-bowl 1; saved as gym nm1-min5-s707.
- Damage taken 133, by source: enemy:beetle-brood 35.1, boss:the-masher 26.9, enemy:dumpster-raccoon 13.5, enemy:potato-beetle 10.2, enemy:snow-mold 9.8, boss:amusing 7.8, enemy:fry-fly 7.4, enemy:sand-crab 5.9.
- Damage dealt 42811, by weapon: comet-scythe 19493.3, frozen-fries 8981.1, hot-potato 4779.7, steam-vent 4207.9, grok-bot 3458.2, potato-rain 1890.3.
- Kills 1097, by weapon: comet-scythe 480, frozen-fries 253, steam-vent 148, grok-bot 96, hot-potato 84, potato-rain 36.
- Bosses killed 1, elites killed 8, boss chests 5, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 448, spent 0.
- Made: no evolution, union or evolved item.

### L1.I5.G5: fresh seed 707 evolve picks

- Start: a fresh game on Nightmare 1 with steam-vent, seed 707; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300s (game clock 05:00), health 105/120; damage taken 152 (boss:amusing 35.5, enemy:garden-slug 25.4, enemy:snow-mold 24.3, enemy:oil-drip 14.1); 981 kills; level 1 to 13; planner asked 96 times, action model 839, in lockstep; ended with steam-vent 5, potato-battery 1, big-bowl 3, gravy-splash 1, root-network 3.
- Damage taken 152, by source: boss:amusing 35.5, enemy:garden-slug 25.4, enemy:snow-mold 24.3, enemy:oil-drip 14.1, enemy:crumb-ant 7.4, enemy:sand-crab 7.2, enemy:potato-beetle 6.9, enemy:frost-flea 6.9.
- Damage dealt 37109, by weapon: steam-vent 31122.4, potato-battery 4687.1, gravy-splash 962.8, grok-bot 336.9.
- Kills 981, by weapon: steam-vent 852, potato-battery 90, gravy-splash 23, grok-bot 16.
- Bosses killed 1, elites killed 4, boss chests 0, crates bought 0, shrines used 1, items bought 0, revives used 0; gold earned 212, spent 0.
- Made: no evolution, union or evolved item.
