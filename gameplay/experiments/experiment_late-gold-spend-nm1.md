# Does spending gold and using shops and shrines make the late build stronger on Nightmare 1

| Field | Value |
| --- | --- |
| Status | running |
| Area | economy |
| Result | - |
| Coach | sonnet-high |
| Created | sonnet-high L1.I10 |
| Updated | sonnet-high L2.I7 |

## Hypothesis

A goal prompt that rates Fry Cart, Potato Crate, Whetstone and Spud Shrine goals like chests when gold is 500 or more and no boss is near converts the 6000-8000 gold earned per 5 late minutes into items and levels, with no more damage than chest-first alone.

## Method

From nm1-min10-natural-b, 300s: chest-first baseline vs chest-first plus a gold and shrine sentence, two repeats each. Compare gold spent, shrines used, items held, damage and survival.

## Findings

Late spot goals fail in the 800-pest crowd (B41). L2.I7.G5 tests spending from 10:00 to 15:00 on the natural gym, when pests number about 400 and no boss is near, and saves the 15:00 state to continue. Compare crates and items bought and damage with earlier chest-first games on natural 10:00 and 15:00 builds (L1.I7.G3 bought 12 crates, L1.I6.G5 bought 1). One game, so a lead.

## Games

### L2.I2.G5: lo-surv chest-first plus gold sentence

- Start: gym nm1-min16-lo-surv (Nightmare 1 at 16:40), seed 1NKFNEH; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 46.6s (game clock 17:26); damage taken 488 (boss:compost-titan 244, enemy:ice-imp 116.8, enemy:mud-golem 65.4, boss:grater-golem 53.1); 4333 kills; level 48 to 51; planner asked 17 times, action model 121, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-socks 5, stuffed-skin 5.
- Damage taken 488, by source: boss:compost-titan 244, enemy:ice-imp 116.8, enemy:mud-golem 65.4, boss:grater-golem 53.1, Hot oil 4.2, Spore vent 4; the killing blow: boss:compost-titan.
- Damage dealt 2450982, by weapon: mash-avalanche 858281.9, pressure-cooker 565302.6, mandoline-fury 503602.5, gratin-arc 230905.4, tater-minigun 210580.1, boom-spud 59272, harvest-moon 23037.4.
- Kills 4333, by weapon: mash-avalanche 1408, pressure-cooker 1087, mandoline-fury 957, gratin-arc 399, tater-minigun 330, boom-spud 108, harvest-moon 44.
- Bosses killed 1, elites killed 1, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 688, spent 0.
- Made: no evolution, union or evolved item.

### L2.I4.G5: full gym items A, 8000 gold, gold sentence

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, starch-sock x4, hot-pepper x3, salt-crystal x1, boom-spud x1, lucky-peel x1, pickle-jar x1; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240s (game clock 20:40), health 221/221; damage taken 616 (enemy:ice-imp 207.9, boss:compost-titan 138.9, Hot oil 117.8, boss:ketchup-kraken 107.1); 26979 kills; level 57 to 71; planner asked 71 times, action model 578, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 616, by source: enemy:ice-imp 207.9, boss:compost-titan 138.9, Hot oil 117.8, boss:ketchup-kraken 107.1, boss:harvester 44.7.
- Damage dealt 24979383, by weapon: mash-avalanche 9386139.2, mandoline-fury 4268267.3, pressure-cooker 3540724.9, gratin-arc 3506717.1, tater-minigun 3132548, boom-spud 1012674.4, harvest-moon 127187.2, dog:dalmatian 2575.2.
- Kills 26979, by weapon: mash-avalanche 8996, mandoline-fury 5050, pressure-cooker 4490, gratin-arc 4124, tater-minigun 3531, boom-spud 645, harvest-moon 135, grok-bot 5.
- Bosses killed 2, elites killed 4, boss chests 7, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 5905, spent 30.
- Made: no evolution, union or evolved item.

### L2.I5.G3: boss-aware plus gold rule 8000 gold A

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, potato-knish x1; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 127.1s (game clock 18:47); damage taken 668 (boss:ketchup-kraken 535.5, enemy:grease-fiend 66, boss:compost-titan 34.7, enemy:ice-imp 31.8); 13434 kills; level 57 to 60; planner asked 35 times, action model 347, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 668, by source: boss:ketchup-kraken 535.5, enemy:grease-fiend 66, boss:compost-titan 34.7, enemy:ice-imp 31.8; the killing blow: boss:ketchup-kraken.
- Damage dealt 8639809, by weapon: mash-avalanche 2693444.4, mandoline-fury 1650741.2, gratin-arc 1634430.9, tater-minigun 1345178.7, pressure-cooker 1274648.1, harvest-moon 37753.3, grok-bot 1834.4, dog:dalmatian 1778.3.
- Kills 13434, by weapon: mash-avalanche 4224, gratin-arc 2451, mandoline-fury 2443, pressure-cooker 2264, tater-minigun 2012, harvest-moon 32, grok-bot 6, dog:dalmatian 2.
- Bosses killed 0, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1113, spent 0.
- Made: no evolution, union or evolved item.

### L2.I5.G4: boss-aware plus gold rule 8000 gold B

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC, build swapped for pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5, potato-knish x1; 240s; plays the playbook with its own planner.goal.
- Outcome: died after 99s (game clock 18:19); damage taken 427 (enemy:ice-imp 219.9, boss:ketchup-kraken 107.1, boss:compost-titan 69.4, enemy:blight-spore 19.9); 13341 kills; level 57 to 62; planner asked 27 times, action model 270, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 427, by source: enemy:ice-imp 219.9, boss:ketchup-kraken 107.1, boss:compost-titan 69.4, enemy:blight-spore 19.9, Hot oil 10.4; the killing blow: boss:ketchup-kraken.
- Damage dealt 7524979, by weapon: mash-avalanche 2234371.9, mandoline-fury 1679843.7, pressure-cooker 1394808.4, gratin-arc 1143775.6, tater-minigun 1021916.3, harvest-moon 48463.4, dog:dalmatian 1799.9.
- Kills 13341, by weapon: mash-avalanche 3827, pressure-cooker 2946, mandoline-fury 2607, gratin-arc 2139, tater-minigun 1771, harvest-moon 50, dog:dalmatian 1.
- Bosses killed 1, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1964, spent 0.
- Made: no evolution, union or evolved item.
