# Does taking Gravy Heart after the catalysts lower boss burst damage on Nightmare 2

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | build |
| Result | - |
| Created | sonnet-high L2.I10 |
| Updated | reset at the restart (L4) |

## Hypothesis

A pick prompt that keeps the evolution catalysts first, then prefers Gravy Heart over a sixth damage passive, lowers damage from the 100+ bosses without losing evolutions.

## Method

L3.I1: from nm2-min10-natural, 300s, one game with a Gravy-Heart-after-catalysts pick prompt against the unchanged baseline (nm2-opening-playbook G4). One game is a lead; repeat both next iteration, and later from nm2-min15-natural. Compare max hp, damage by boss, evolutions and survival.

## Findings

L3.I1.G5: Gravy Heart picks gave 155 max hp vs 120 and 37 vs 22 damage from the 10:00 gym; both survived. Needs a repeat from the 15:00 gym, where boss bursts are larger.

Reset at the restart: still running from an earlier loop and measured with lockstep on, so its games need replaying live before they count.

## Games

### L3.I1.G5: NM2 10:00 gym Gravy Heart picks

- Start: gym nm2-min10-natural (Nightmare 2 at 10:00), seed 11X8043; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.2s (game clock 15:00), health 155/155; damage taken 37 (enemy:field-rat 19.2, Hot oil 17.6, Spore vent 0.6); 48770 kills; level 41 to 59; planner asked 96 times, action model 407, in lockstep; ended with grease-fire 1, potato-rain 8, baked-alaska 1, reset-button 8, spud-fence 8, mash-golem 8, hot-sauce 5, butter-pat 5, mash-finisher 5, thick-skin 5, root-network 5, masher-grip 5.
- Damage taken 37, by source: enemy:field-rat 19.2, Hot oil 17.6, Spore vent 0.6.
- Damage dealt 11180801, by weapon: grease-fire 7296963.9, baked-alaska 3672687.6, spud-fence 101367, potato-rain 56042.5, mash-golem 19881.5, alex 19094.5, grok-bot 14271.3, reset-button 492.6.
- Kills 48770, by weapon: grease-fire 31968, baked-alaska 15747, spud-fence 551, potato-rain 281, grok-bot 95, mash-golem 91, alex 34, reset-button 3.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 8, shrines used 2, items bought 0, revives used 0; gold earned 7588, spent 1561.
- Made: no evolution, union or evolved item.
