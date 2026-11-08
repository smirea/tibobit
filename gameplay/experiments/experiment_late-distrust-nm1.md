# Does asking the action model for 10 s after an unseen hit help at 16:40 on Nightmare 1

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | inconclusive |
| Coach | sonnet-high |
| Created | sonnet-high L2.I2 |
| Updated | sonnet-high L2.I3 |

## Hypothesis

With distrustSeconds 10, the action model checks every step after Tibo is hit on a step the forecast called free, so Tibo takes fewer hits from chargers, ice-imp fans and boss attacks that the one-second forecast does not see.

## Method

One game from nm1-min16-lo-surv with distrustSeconds 10 against the baseline games; repeat next iteration if damage by source or time of death moves.

## Findings

L2.I2.G4: distrustSeconds 10 died at 18:21, inside the baseline range. No evidence of benefit. Not adopted.

## Games

### L2.I2.G4: lo-surv distrustSeconds 10

- Start: gym nm1-min16-lo-surv (Nightmare 1 at 16:40), seed 1NKFNEH; 300s; plays the playbook with distrustSeconds 10.
- Outcome: died after 101s (game clock 18:21); damage taken 852 (enemy:ice-imp 337.6, boss:ketchup-kraken 214.2, boss:compost-titan 208.3, boss:grater-golem 79.6); 7297 kills; level 48 to 53; planner asked 34 times, action model 274, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-socks 5, stuffed-skin 5.
- Damage taken 852, by source: enemy:ice-imp 337.6, boss:ketchup-kraken 214.2, boss:compost-titan 208.3, boss:grater-golem 79.6, Hot oil 12.7; the killing blow: enemy:ice-imp.
- Damage dealt 5228234, by weapon: mash-avalanche 1845626.6, pressure-cooker 1199104.4, mandoline-fury 1013727.5, gratin-arc 533659, tater-minigun 464836.3, boom-spud 110629.5, harvest-moon 33333.3, grok-bot 27317.5.
- Kills 7297, by weapon: mash-avalanche 2223, pressure-cooker 1922, mandoline-fury 1405, gratin-arc 773, tater-minigun 667, boom-spud 175, grok-bot 79, harvest-moon 53.
- Bosses killed 1, elites killed 2, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1609, spent 0.
- Made: no evolution, union or evolved item.
