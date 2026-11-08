# Evolve-focused pick prompt on NM1

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | models |
| Result | - |
| Created | sonnet-medium L1.I8 |
| Updated | reset at the restart (L4) |

## Hypothesis

A pick prompt that ranks recipe completion first gives more evolutions and less damage.

## Method

(none yet)

## Findings

Reset at the restart: still running from an earlier loop and measured with lockstep on, so its games need replaying live before they count.

## Games

### L1.I8.G2: min5 evolve pick prompt

- Start: gym nm1-min5-fresh (Nightmare 1 at 05:00), seed 606; 300s; plays the playbook with its own planner.pick.
- Outcome: died after 88.1s (game clock 06:28); damage taken 156 (enemy:sizzle-imp 43.6, enemy:bog-toad 31.1, boss:late-blight 26.2, enemy:field-crow 25.7); 1315 kills; level 17 to 21; planner asked 29 times, action model 231, in lockstep; ended with steam-vent 3, whisk-vortex 4, spud-lob 1, hot-potato 1, mash-wave 2, peel-phantom 2, big-bowl 3, hot-start 2, aged-russet 1, root-network 2, butter-pat 1.
- Damage taken 156, by source: enemy:sizzle-imp 43.6, enemy:bog-toad 31.1, boss:late-blight 26.2, enemy:field-crow 25.7, enemy:field-rat 12, enemy:fry-fly 10.9, enemy:oil-drip 4.3, enemy:crumb-ant 2.6; the killing blow: enemy:sizzle-imp.
- Damage dealt 57680, by weapon: whisk-vortex 22827.1, mash-wave 18602.6, hot-potato 5957.9, spud-lob 4835.9, steam-vent 3909.9, dog:greyhound 944, grok-bot 602.2.
- Kills 1315, by weapon: whisk-vortex 541, mash-wave 436, hot-potato 136, spud-lob 96, steam-vent 83, dog:greyhound 18, grok-bot 5.
- Bosses killed 1, elites killed 3, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 216, spent 0.
- Made: no evolution, union or evolved item.

### L1.I8.G3: seed707 baseline

- Start: a fresh game on Nightmare 1 with steam-vent, seed 707; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 05:00), health 90/120; damage taken 109 (boss:the-masher 15.9, enemy:dumpster-raccoon 13.3, enemy:fry-fly 7.8, enemy:parking-gull 7.4); 1575 kills; level 1 to 15; planner asked 97 times, action model 776, in lockstep; ended with steam-vent 1, rosti-disc 4, starch-chain 1, fry-sentry 1, tailgate-fries 1, starch-bolt 1, starch-plating 5, butter-socks 1, peel-out 1.
- Damage taken 109, by source: boss:the-masher 15.9, enemy:dumpster-raccoon 13.3, enemy:fry-fly 7.8, enemy:parking-gull 7.4, Spore vent 6.7, enemy:tomato-leech 6.3, enemy:cave-grub 4.8, enemy:compost-maggot 4.5.
- Damage dealt 50798, by weapon: rosti-disc 21703.8, starch-chain 11080, fry-sentry 6816.3, starch-bolt 3865.6, steam-vent 3710.5, tailgate-fries 3574.2, grok-bot 47.9.
- Kills 1575, by weapon: rosti-disc 511, starch-chain 476, fry-sentry 233, steam-vent 160, tailgate-fries 97, starch-bolt 96, grok-bot 2.
- Bosses killed 1, elites killed 2, boss chests 1, crates bought 0, shrines used 1, items bought 0, revives used 0; gold earned 170, spent 0.
- Made: no evolution, union or evolved item.

### L1.I8.G4: seed707 evolve pick prompt

- Start: a fresh game on Nightmare 1 with steam-vent, seed 707; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300s (game clock 05:00), health 97/120; damage taken 98 (boss:the-masher 28.8, boss:amusing 13.1, boss:beetle-queen 9.3, enemy:frost-flea 9); 333 kills; level 1 to 10; planner asked 93 times, action model 800, in lockstep; ended with steam-vent 4, starch-plating 1, butter-socks 1, masher-grip 1, mash-finisher 1, root-network 1.
- Damage taken 98, by source: boss:the-masher 28.8, boss:amusing 13.1, boss:beetle-queen 9.3, enemy:frost-flea 9, enemy:sand-crab 8.9, enemy:bog-slime 6.6, enemy:compost-maggot 5.6, enemy:ketchup-drop 5.3.
- Damage dealt 9784, by weapon: steam-vent 9733.6, grok-bot 50.2.
- Kills 333, by weapon: steam-vent 327, grok-bot 6.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 34, spent 0.
- Made: no evolution, union or evolved item.
