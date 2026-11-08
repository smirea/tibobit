# Does a longer evade goal help the boss-aware prompt survive 17:00-20:00 on Nightmare 1

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | refuted |
| Coach | sonnet-high |
| Created | sonnet-high L2.I5 |
| Updated | sonnet-high L2.I7 |

## Hypothesis

evadeSeconds 8 may end before the Titan or Kraken fight is over; with the boss-aware goal an evade of 15 seconds keeps Tibo out of the burst windows longer and lowers damage at 17:00-18:30 without costing chests.

## Method

From nm1-min16-full, 240s, boss-aware goal with evadeSeconds 15, compared with the same goal at 8 (late-boss-aware-nm1 games). Compare damage by source, minimum hp, goals dropped and survival to 20:00.

## Findings

L2.I6: evade 15 with my boss-aware text passed on the full gym in 1 of 3 (died 18:07 and 18:15, alive 20:40 once), evade 25 died 18:16, lo-full evade 15 alive 20:40. With L2.I5.G5 and sonnet-medium's L2.I7 repeats, evade 15 passes in 2 of 6 on the full gym. Not adopted.

## Games

### L2.I5.G5: boss-aware plus evadeSeconds 15

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with evadeSeconds 15, its own planner.goal.
- Outcome: alive after 240.1s (game clock 20:40), health 221/221; damage taken 711 (enemy:ice-imp 314.5, boss:compost-titan 213.9, boss:ketchup-kraken 107.1, enemy:field-rat 75.6); 29478 kills; level 57 to 68; planner asked 53 times, action model 675, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 711, by source: enemy:ice-imp 314.5, boss:compost-titan 213.9, boss:ketchup-kraken 107.1, enemy:field-rat 75.6.
- Damage dealt 21485825, by weapon: mash-avalanche 7240729.7, mandoline-fury 4575323.3, pressure-cooker 3507250.7, gratin-arc 3183756.8, tater-minigun 2827148.7, harvest-moon 145497.5, dog:dalmatian 3395.5, grok-bot 2722.7.
- Kills 29478, by weapon: mash-avalanche 9174, mandoline-fury 6233, pressure-cooker 5747, gratin-arc 4404, tater-minigun 3795, harvest-moon 117, grok-bot 6, dog:dalmatian 2.
- Bosses killed 1, elites killed 4, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 4761, spent 0.
- Made: no evolution, union or evolved item.

### L2.I7.G3: full evade 15 A

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with evadeSeconds 15.
- Outcome: died after 174.4s (game clock 19:34); damage taken 1107 (boss:ketchup-kraken 856.8, enemy:ice-imp 136.2, enemy:grease-fiend 69.9, boss:compost-titan 34.7); 17266 kills; level 57 to 65; planner asked 45 times, action model 467, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 1107, by source: boss:ketchup-kraken 856.8, enemy:ice-imp 136.2, enemy:grease-fiend 69.9, boss:compost-titan 34.7, Spore vent 9.1; the killing blow: boss:ketchup-kraken.
- Damage dealt 13087335, by weapon: mash-avalanche 3959114.4, gratin-arc 2435019.6, mandoline-fury 2393563.6, pressure-cooker 2210068.6, tater-minigun 2031240.6, harvest-moon 55427.9, dog:dalmatian 1731.9, grok-bot 1168.6.
- Kills 17266, by weapon: mash-avalanche 5188, gratin-arc 3277, mandoline-fury 3213, pressure-cooker 3121, tater-minigun 2383, harvest-moon 78, grok-bot 6.
- Bosses killed 0, elites killed 3, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2764, spent 0.
- Made: no evolution, union or evolved item.

### L2.I7.G4: full evade 15 B

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with evadeSeconds 15.
- Outcome: died after 96s (game clock 18:16); damage taken 527 (boss:ketchup-kraken 428.4, boss:compost-titan 69.4, enemy:ice-imp 28.8); 12850 kills; level 57 to 62; planner asked 24 times, action model 225, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 527, by source: boss:ketchup-kraken 428.4, boss:compost-titan 69.4, enemy:ice-imp 28.8; the killing blow: boss:compost-titan.
- Damage dealt 6918201, by weapon: mash-avalanche 1875301.9, mandoline-fury 1443682, pressure-cooker 1346958.5, gratin-arc 1193244.1, tater-minigun 1009358, harvest-moon 48598.3, dog:dalmatian 1058.6.
- Kills 12850, by weapon: mash-avalanche 3579, pressure-cooker 2879, mandoline-fury 2458, gratin-arc 2144, tater-minigun 1743, harvest-moon 46, dog:dalmatian 1.
- Bosses killed 0, elites killed 2, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1985, spent 0.
- Made: no evolution, union or evolved item.

### L2.I7.G5: lo-full evade 15

- Start: gym nm1-min16-lo-full (Nightmare 1 at 16:40), seed 12DDMN0; 240s; plays the playbook with evadeSeconds 15.
- Outcome: died after 206.9s (game clock 20:07); damage taken 1113 (boss:ketchup-kraken 712.2, boss:harvester 190.1, boss:compost-titan 164.7, enemy:ice-imp 33.3); 19522 kills; level 50 to 61; planner asked 55 times, action model 494, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-pat 5, aged-russet 5.
- Damage taken 1113, by source: boss:ketchup-kraken 712.2, boss:harvester 190.1, boss:compost-titan 164.7, enemy:ice-imp 33.3, Brambles 10.6, Spore vent 2.2; the killing blow: boss:harvester.
- Damage dealt 15853619, by weapon: mash-avalanche 4733288.2, gratin-arc 3134319.7, mandoline-fury 2879503.8, tater-minigun 2589314.3, pressure-cooker 2396026.8, harvest-moon 74067.6, grok-bot 41929.8, souffle-spud 4470.4.
- Kills 19522, by weapon: mash-avalanche 5989, gratin-arc 3791, mandoline-fury 3406, pressure-cooker 3331, tater-minigun 2854, grok-bot 73, harvest-moon 67, souffle-spud 8.
- Bosses killed 0, elites killed 6, boss chests 4, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 3178, spent 0.
- Made: no evolution, union or evolved item.

### L2.I6.G1: full gym boss-aware evade 15 A

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with evadeSeconds 15, its own planner.goal.
- Outcome: died after 87.5s (game clock 18:07); damage taken 364 (boss:ketchup-kraken 214.2, enemy:ice-imp 149.3); 10905 kills; level 57 to 62; planner asked 24 times, action model 236, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 364, by source: boss:ketchup-kraken 214.2, enemy:ice-imp 149.3; the killing blow: enemy:ice-imp.
- Damage dealt 6052955, by weapon: mash-avalanche 1628398.2, mandoline-fury 1277399, pressure-cooker 1122624, gratin-arc 1088601.2, tater-minigun 891965.5, harvest-moon 40339.1, grok-bot 2911.7, dog:dalmatian 716.7.
- Kills 10905, by weapon: mash-avalanche 2821, pressure-cooker 2282, mandoline-fury 2237, gratin-arc 1940, tater-minigun 1597, harvest-moon 22, grok-bot 6.
- Bosses killed 0, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1529, spent 0.
- Made: no evolution, union or evolved item.

### L2.I6.G2: full gym boss-aware evade 15 B

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with evadeSeconds 15, its own planner.goal.
- Outcome: alive after 240.1s (game clock 20:40), health 221/221; damage taken 1427 (boss:ketchup-kraken 1392.4, boss:compost-titan 34.7); 23228 kills; level 57 to 67; planner asked 67 times, action model 662, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 1427, by source: boss:ketchup-kraken 1392.4, boss:compost-titan 34.7.
- Damage dealt 19778812, by weapon: mash-avalanche 6380403.8, mandoline-fury 3641453.4, gratin-arc 3446027.5, pressure-cooker 3331917.2, tater-minigun 2878261.1, harvest-moon 93371.2, grok-bot 4329.7, dog:dalmatian 3048.5.
- Kills 23228, by weapon: mash-avalanche 7204, mandoline-fury 4527, gratin-arc 4136, pressure-cooker 4124, tater-minigun 3129, harvest-moon 96, grok-bot 6, dog:dalmatian 6.
- Bosses killed 0, elites killed 4, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 3675, spent 0.
- Made: no evolution, union or evolved item.

### L2.I6.G3: full gym boss-aware evade 25

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with evadeSeconds 25, its own planner.goal.
- Outcome: died after 95.8s (game clock 18:16); damage taken 414 (boss:ketchup-kraken 383.1, enemy:ice-imp 31); 9523 kills; level 57 to 60; planner asked 23 times, action model 253, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 414, by source: boss:ketchup-kraken 383.1, enemy:ice-imp 31; the killing blow: boss:ketchup-kraken.
- Damage dealt 5906192, by weapon: mash-avalanche 1545286.7, gratin-arc 1282397.3, mandoline-fury 1250212.3, tater-minigun 974149.6, pressure-cooker 783824.7, grok-bot 49012, harvest-moon 20088.3, dog:dalmatian 1220.9.
- Kills 9523, by weapon: mash-avalanche 2730, gratin-arc 1998, mandoline-fury 1884, tater-minigun 1411, pressure-cooker 1385, grok-bot 86, harvest-moon 28, dog:dalmatian 1.
- Bosses killed 0, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 944, spent 0.
- Made: no evolution, union or evolved item.

### L2.I6.G4: lo-full boss-aware evade 15

- Start: gym nm1-min16-lo-full (Nightmare 1 at 16:40), seed 12DDMN0; 240s; plays the playbook with evadeSeconds 15, its own planner.goal.
- Outcome: alive after 240.1s (game clock 20:40), health 259/259; damage taken 299 (enemy:ice-imp 184.6, boss:compost-titan 69.4, boss:harvester 44.7); 26688 kills; level 55 to 65; planner asked 53 times, action model 673, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, butter-pat 5, aged-russet 5.
- Damage taken 299, by source: enemy:ice-imp 184.6, boss:compost-titan 69.4, boss:harvester 44.7.
- Damage dealt 27733074, by weapon: mash-avalanche 9281331.2, mandoline-fury 5424099.1, pressure-cooker 4599112.7, gratin-arc 4420584.7, tater-minigun 3854890.7, harvest-moon 145661.5, grok-bot 7394.
- Kills 26688, by weapon: mash-avalanche 8413, pressure-cooker 5313, mandoline-fury 5193, gratin-arc 4148, tater-minigun 3508, harvest-moon 101, grok-bot 12.
- Bosses killed 2, elites killed 6, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 3840, spent 0.
- Made: no evolution, union or evolved item.

### L2.I6.G5: full gym boss-aware evade 15 C

- Start: gym nm1-min16-full (Nightmare 1 at 16:40), seed 1JV4MGC; 240s; plays the playbook with evadeSeconds 15, its own planner.goal.
- Outcome: died after 95.4s (game clock 18:15); damage taken 455 (boss:ketchup-kraken 321.3, enemy:grease-fiend 69.1, boss:compost-titan 34.7, enemy:ice-imp 29.5); 8845 kills; level 57 to 61; planner asked 23 times, action model 265, in lockstep; ended with pressure-cooker 1, gratin-arc 1, mash-avalanche 1, tater-minigun 1, mandoline-fury 1, harvest-moon 8, butter-pat 5, root-network 5, hot-sauce 5, masher-grip 5, gravy-heart 5, aged-russet 5.
- Damage taken 455, by source: boss:ketchup-kraken 321.3, enemy:grease-fiend 69.1, boss:compost-titan 34.7, enemy:ice-imp 29.5; the killing blow: boss:ketchup-kraken.
- Damage dealt 5965676, by weapon: mash-avalanche 1533062, gratin-arc 1327340.4, mandoline-fury 1180263.6, tater-minigun 1014673.5, pressure-cooker 886525.2, harvest-moon 23273.4, dog:dalmatian 537.5.
- Kills 8845, by weapon: mash-avalanche 2380, gratin-arc 1910, mandoline-fury 1746, tater-minigun 1395, pressure-cooker 1387, harvest-moon 27.
- Bosses killed 0, elites killed 2, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1268, spent 0.
- Made: no evolution, union or evolved item.
