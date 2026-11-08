# Does a permissive late-game dash prompt cut burst damage at 16:40-21:40 on Nightmare 1

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | refuted |
| Coach | sonnet-high |
| Created | sonnet-high L2.I2 |
| Updated | sonnet-high L2.I3 |

## Hypothesis

A dash prompt that spends charges when Tibo was just hurt, a boss or charger is near, or a crowd is within 60 units lowers damage from the grease-fiend, ice-imp and boss bursts and lengthens life on nm1-min16-lo-surv, which holds 3 dash charges that the baseline barely used.

## Method

Two games from nm1-min16-lo-surv with the permissive action.dash template, compared with the baseline games (L2.I1.G3 died 18:07; repeat this iteration). Compare dashes used, damage by source, minimum hp and time of death.

## Findings

L2.I2: the permissive dash prompt spent 30 and 18 charges and died at 17:55 and 17:20, sooner than the default baselines (18:07, 19:13). It is not adopted.

## Games

### L2.I2.G2: lo-surv permissive dash A

- Start: gym nm1-min16-lo-surv (Nightmare 1 at 16:40), seed 1NKFNEH; 300s; plays the playbook with its own action.dash.
- Outcome: died after 75.2s (game clock 17:55); damage taken 1215 (enemy:grease-fiend 518.5, enemy:ice-imp 357, boss:grater-golem 164.6, enemy:field-rat 128.5); 8882 kills; level 48 to 53; planner asked 25 times, action model 183, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-socks 5, stuffed-skin 5.
- Damage taken 1215, by source: enemy:grease-fiend 518.5, enemy:ice-imp 357, boss:grater-golem 164.6, enemy:field-rat 128.5, boss:compost-titan 34.7, Hot oil 12; the killing blow: enemy:grease-fiend.
- Damage dealt 4626734, by weapon: mash-avalanche 1994690.5, pressure-cooker 951568.4, mandoline-fury 826616.6, gratin-arc 363103.5, tater-minigun 328016.5, boom-spud 126867.2, harvest-moon 35871.3.
- Kills 8882, by weapon: mash-avalanche 3683, pressure-cooker 2049, mandoline-fury 1622, gratin-arc 622, tater-minigun 577, boom-spud 269, harvest-moon 60.
- Bosses killed 1, elites killed 2, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1398, spent 0.
- Made: no evolution, union or evolved item.

### L2.I2.G3: lo-surv permissive dash B

- Start: gym nm1-min16-lo-surv (Nightmare 1 at 16:40), seed 1NKFNEH; 300s; plays the playbook with its own action.dash.
- Outcome: died after 39.7s (game clock 17:20); damage taken 950 (boss:compost-titan 347.2, enemy:ice-imp 170.6, enemy:mole 92.1, enemy:blight-spore 78.4); 5084 kills; level 48 to 51; planner asked 17 times, action model 85, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-socks 5, stuffed-skin 5.
- Damage taken 950, by source: boss:compost-titan 347.2, enemy:ice-imp 170.6, enemy:mole 92.1, enemy:blight-spore 78.4, boss:grater-golem 74.3, enemy:mud-golem 63.5, enemy:grease-fiend 62.7, enemy:field-rat 61.6; the killing blow: boss:compost-titan.
- Damage dealt 2728815, by weapon: mash-avalanche 1141894.7, pressure-cooker 641715.7, mandoline-fury 481765.1, gratin-arc 190499.8, tater-minigun 171139.8, boom-spud 78946, harvest-moon 22854.1.
- Kills 5084, by weapon: mash-avalanche 1914, pressure-cooker 1321, mandoline-fury 921, gratin-arc 384, tater-minigun 306, boom-spud 184, harvest-moon 54.
- Bosses killed 0, elites killed 2, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 691, spent 0.
- Made: no evolution, union or evolved item.
