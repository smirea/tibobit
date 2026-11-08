# Does a tight boss-100 evade exception beat plain chest-first on fresh seeds and the late full gym

| Field | Value |
| --- | --- |
| Status | done |
| Area | models |
| Result | refuted |
| Coach | sonnet-medium |
| Created | sonnet-medium L3.I3 |
| Updated | sonnet-medium L3.I4 |

## Hypothesis

Evading only for a boss within 100 units or health under 30% costs no chests or evolutions compared with plain chest-first, and helps against the 18:00 Kraken and Titan window on the late full gym.

## Method

Seed 1616 fresh pair (plain vs tight), plus tight text on nm1-min16-full compared with earlier baselines (18:04-18:41). Compare chests, evolutions, evade goals, damage and survival.

## Findings

L3.I3: tight lost to plain on seed 1616 (1 chest, no evolution vs 7 chests). It reached 20:40 on the full gym in one game. Not adopted.

## Games

### L3.I3.G3: tight boss-100 exception seed 1616

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1616; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 05:00), health 77/120; damage taken 214 (enemy:fry-fly 75.4, boss:amusing 24.4, enemy:sand-crab 20.8, enemy:lint-bunny 11.1); 1677 kills; level 1 to 14; planner asked 96 times, action model 803, in lockstep; ended with steam-vent 6, sprout-squad 3, big-bowl 4, salt-shaker 1, hot-sauce 1, root-network 1.
- Damage taken 214, by source: enemy:fry-fly 75.4, boss:amusing 24.4, enemy:sand-crab 20.8, enemy:lint-bunny 11.1, boss:beetle-queen 10.9, enemy:potato-beetle 10.1, enemy:sock-pile 9.9, enemy:garden-slug 7.4.
- Damage dealt 52203, by weapon: steam-vent 38618.9, sprout-squad 7125.9, alex 6281.9, grok-bot 176.
- Kills 1677, by weapon: steam-vent 1316, sprout-squad 176, alex 173, grok-bot 12.
- Bosses killed 1, elites killed 3, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 257, spent 15.
- Made: no evolution, union or evolved item.

### L3.I3.G5: tight exception on full gym

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with its own planner.goal.
- Outcome: alive after 240.1s (game clock 20:40), health 94/221; damage taken 827 (boss:ketchup-kraken 428.4, boss:harvester 253.2, boss:compost-titan 104.2, enemy:ice-imp 28); 30860 kills; level 57 to 71; planner asked 62 times, action model 436, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 827, by source: boss:ketchup-kraken 428.4, boss:harvester 253.2, boss:compost-titan 104.2, enemy:ice-imp 28, Brambles 12.8.
- Damage dealt 25284017, by weapon: mash-avalanche 8861065.6, pressure-cooker 5169023.1, mandoline-fury 4698067.1, gratin-arc 3341621.8, tater-minigun 3041250.7, harvest-moon 162847, grok-bot 7290.3, dog:dalmatian 2851.1.
- Kills 30860, by weapon: mash-avalanche 9615, pressure-cooker 7087, mandoline-fury 5746, gratin-arc 4526, tater-minigun 3718, harvest-moon 160, grok-bot 5, dog:dalmatian 3.
- Bosses killed 2, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 5844, spent 0.
- Made: no evolution, union or evolved item.
