# Does a weapon_damage-driven pick prompt turn the deep-fryer opening into an early evolution

| Field | Value |
| --- | --- |
| Status | done |
| Area | models |
| Result | inconclusive |
| Created | L10.I2 |
| Updated | L10.I4 |

## Hypothesis

Pick prompts could not see which weapon dealt the damage. With the {{weapon_damage}} block and a rule to level the top-damage weapon and its catalyst, picks stop scattering, an evolution comes earlier, and damage at 2:00 and chests by 2:30 rise against the unchanged playbook on the same fresh seed.

## Method

Fresh live deep-fryer on seed 7272, 300 s, prompt vs unchanged control. Record chests by 2:30, first evolution time, damage at 2:00, hp at 2:00, picks taken and survival. Control also serves as a second opening replication of the deep-fryer playbook.

## Findings

Both arms died at 1:15-1:20 on s7272 before any pick mattered, so the picks were never tested.

## Games

### L10.I2.G4: weapon_damage-driven picks, fresh fryer s7272

- Start: a fresh game on Nightmare 2 with deep-fryer, seed 7272; 300s; plays the playbook with its own planner.state, its own planner.pick.
- Outcome: died after 80.1s (game clock 01:20); damage taken 122 (enemy:cave-grub 79.1, Spore vent 14.7, enemy:potato-beetle 7.1, enemy:bog-slime 6); 98 kills; level 1 to 4; planner asked 27 times, action model 190; the models saw the game 30 ms late (p90 50); ended with deep-fryer 1, starch-bolt 1, lean-lunch 1, clean-plate 1.
- Damage taken 122, by source: enemy:cave-grub 79.1, Spore vent 14.7, enemy:potato-beetle 7.1, enemy:bog-slime 6, enemy:wireworm-larva 5.9, enemy:ketchup-drop 4, enemy:compost-maggot 4, enemy:sprout-mite 1.2; the killing blow: enemy:bog-slime.
- Damage dealt 3146, by weapon: starch-bolt 2057.7, deep-fryer 1087.9.
- Kills 98, by weapon: starch-bolt 69, deep-fryer 29.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2, spent 0.
- Made: no evolution, union or evolved item.

### L10.I2.G5: control unchanged, fresh fryer s7272

- Start: a fresh game on Nightmare 2 with deep-fryer, seed 7272; 300s; plays the playbook.
- Outcome: died after 75.8s (game clock 01:15); damage taken 130 (enemy:tomato-leech 91.7, Hot oil 16, enemy:sprout-mite 9.2, enemy:bog-slime 7.4); 118 kills; level 1 to 7; planner asked 31 times, action model 171; the models saw the game 29 ms late (p90 49); ended with deep-fryer 2, seed-potato 2, sprout-squad 1, starch-chain 1, comet-scythe 1.
- Damage taken 130, by source: enemy:tomato-leech 91.7, Hot oil 16, enemy:sprout-mite 9.2, enemy:bog-slime 7.4, enemy:crumb-ant 4.1, enemy:aphid 1.4; the killing blow: enemy:tomato-leech.
- Damage dealt 2738, by weapon: deep-fryer 1435.1, seed-potato 530.8, starch-chain 313, comet-scythe 220.5, sprout-squad 159.1, grok-bot 79.4.
- Kills 118, by weapon: deep-fryer 66, seed-potato 36, grok-bot 6, sprout-squad 4, starch-chain 4, comet-scythe 2.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 16, spent 0.
- Made: no evolution, union or evolved item.
