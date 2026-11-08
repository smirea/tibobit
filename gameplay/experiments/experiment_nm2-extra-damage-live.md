# Does extraDamage 0 cut live NM2 minute-1 chip damage

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | refuted |
| Created | L4.I8 |
| Updated | L4.I10 |

## Hypothesis

With extraDamage at 0.02 the page walks Tibo to the goal on its own through pests that cost a little each, which adds up to 66-117 hp in minute 1 on 1919 and 4141. With extraDamage 0 the action model is asked about more moves, so Tibo takes less chip damage and reaches the 2:00 Mascot healthier. Live reaction cost is small (about 28 ms lag), so asking the models more often is not costly.

## Method

Fresh live NM2 Steam Vent on seed 1919, 300 s, only extraDamage 0, compared with the 1919 controls (died 2:30 and 2:35, minute-1 loss 66-117) and the hurt-prompt games (alive twice). One game is a lead. Repeat on 4141 and 4242 if minute-1 loss drops and it lives.

## Findings

L4.I8.G5 on 1919 lived with 74 damage. The L4.I9 repeats lived 1 of 5 (2121 alive; 1313, 4444, 4141 and 4343 died at 2:03-2:19 with no evolution). That is 2 of 6 with 1919, against about 1 of 6 for controls. The verdict rule (refuted at 2 or fewer of 5) says refuted. On the harm-check seed 4343 it died where the control lived. extraDamage stays 0.02.

## Games

### L4.I8.G5: extraDamage 0 s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with extraDamage 0.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 74 (enemy:tomato-leech 46.7, Brambles 8.7, boss:amusing 7, Spore vent 3.8); 3940 kills; level 1 to 19; planner asked 141 times, action model 177; the models saw the game 29 ms late (p90 54); ended with tater-minigun 1, grease-fire 1, hash-bulwark 1, root-spikes 6, root-network 2, lean-lunch 1, thick-skin 1, butter-pat 3, masher-grip 1, starch-plating 1.
- Damage taken 74, by source: enemy:tomato-leech 46.7, Brambles 8.7, boss:amusing 7, Spore vent 3.8, Hot oil 3.3, enemy:sprout-mite 2.8, enemy:ketchup-drop 1.7.
- Damage dealt 187490, by weapon: grease-fire 156384.6, tater-minigun 9266.8, pressure-cooker 8524.3, locked-gatling 5780.8, hot-streak 4087.5, grok-bot 2008.4, hash-brown-shield 714.7, steam-vent 410.2.
- Kills 3940, by weapon: grease-fire 3196, locked-gatling 210, pressure-cooker 178, tater-minigun 164, hot-streak 118, grok-bot 49, hash-brown-shield 12, steam-vent 6.
- Bosses killed 9, elites killed 12, boss chests 21, crates bought 1, shrines used 1, items bought 0, revives used 0; gold earned 1481, spent 30.
- Made: pressure-cooker at 01:27, wildfire-roast at 02:08, tater-minigun at 03:11, hash-bulwark at 04:03, grease-fire at 02:08.

### L4.I9.G1: extraDamage 0 s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with extraDamage 0.
- Outcome: alive after 300s (game clock 05:00), health 104/120; damage taken 109 (enemy:tomato-leech 49.8, boss:beetle-queen 35.1, Hot oil 9.3, boss:the-masher 7); 3520 kills; level 1 to 18; planner asked 133 times, action model 502; the models saw the game 29 ms late (p90 62); ended with steam-vent 6, mash-avalanche 1, stand-mixer 1, spark-corral 1, mash-golem 1, full-broadside 1, butter-socks 1, masher-grip 1, gpu 2, chives 3, big-bowl 2, sour-cream 1.
- Damage taken 109, by source: enemy:tomato-leech 49.8, boss:beetle-queen 35.1, Hot oil 9.3, boss:the-masher 7, enemy:sprout-mite 3, enemy:bog-slime 2, enemy:compost-maggot 1.3, enemy:aphid 1.2.
- Damage dealt 159672, by weapon: stand-mixer 78957.7, mash-avalanche 23877.6, spark-corral 22906.4, whisk-vortex 17636.5, broadside 4735.8, spud-fence 4075.9, grok-bot 2321.2, full-broadside 2172.9.
- Kills 3520, by weapon: stand-mixer 1564, mash-avalanche 555, spark-corral 512, whisk-vortex 490, broadside 89, spud-fence 81, grok-bot 75, full-broadside 61.
- Bosses killed 9, elites killed 12, boss chests 21, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1438, spent 0.
- Made: mash-avalanche at 01:18, spark-corral at 02:05, stand-mixer at 03:22, full-broadside at 04:14.

### L4.I9.G2: extraDamage 0 s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with extraDamage 0.
- Outcome: died after 129s (game clock 02:09); damage taken 121 (enemy:compost-maggot 31.2, enemy:cave-grub 22.9, enemy:potato-beetle 15, boss:amusing 13.9); 283 kills; level 1 to 8; planner asked 49 times, action model 394; the models saw the game 27 ms late (p90 48); ended with steam-vent 1, spud-dynamo 2, mash-golem 1, reset-button 7, masher-grip 1, slow-cooker 1, four-eyed-spud 1.
- Damage taken 121, by source: enemy:compost-maggot 31.2, enemy:cave-grub 22.9, enemy:potato-beetle 15, boss:amusing 13.9, enemy:sand-crab 11.6, Spore vent 8.8, enemy:frost-flea 8.2, enemy:sprout-mite 4.1; the killing blow: enemy:potato-beetle.
- Damage dealt 9779, by weapon: reset-button 5193.4, spud-dynamo 2367.6, steam-vent 1610.3, mash-golem 607.5.
- Kills 283, by weapon: reset-button 85, spud-dynamo 83, steam-vent 78, mash-golem 37.
- Bosses killed 0, elites killed 6, boss chests 4, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 167, spent 0.
- Made: no evolution, union or evolved item.

### L4.I9.G3: extraDamage 0 s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook with extraDamage 0.
- Outcome: died after 139.6s (game clock 02:19); damage taken 147 (enemy:sand-crab 62.2, boss:amusing 41.7, enemy:tomato-leech 5.9, enemy:potato-beetle 5.6); 371 kills; level 1 to 9; planner asked 54 times, action model 482; the models saw the game 29 ms late (p90 58); ended with steam-vent 1, root-spikes 1, fry-knives 1, broadside 2, butter-streak 1, julienne-dash 1, stuffed-skin 2, peel-out 1.
- Damage taken 147, by source: enemy:sand-crab 62.2, boss:amusing 41.7, enemy:tomato-leech 5.9, enemy:potato-beetle 5.6, enemy:aphid 5.2, enemy:crumb-ant 4.7, enemy:bog-slime 4.6, enemy:fry-fly 2.9; the killing blow: boss:amusing.
- Damage dealt 11895, by weapon: broadside 3492.6, root-spikes 3066.8, butter-streak 2782.6, steam-vent 1215.8, fry-knives 1034.5, julienne-dash 302.7.
- Kills 371, by weapon: root-spikes 155, broadside 91, butter-streak 67, steam-vent 35, fry-knives 14, julienne-dash 9.
- Bosses killed 0, elites killed 3, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 60, spent 0.
- Made: no evolution, union or evolved item.

### L4.I9.G4: extraDamage 0 s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with extraDamage 0.
- Outcome: died after 123.8s (game clock 02:03); damage taken 152 (enemy:potato-beetle 98.2, boss:amusing 20.9, enemy:aphid 15.6, enemy:frost-flea 11.3); 86 kills; level 1 to 6; planner asked 46 times, action model 257; the models saw the game 31 ms late (p90 53); ended with steam-vent 3, root-network 3.
- Damage taken 152, by source: enemy:potato-beetle 98.2, boss:amusing 20.9, enemy:aphid 15.6, enemy:frost-flea 11.3, enemy:wireworm-larva 3.3, enemy:little-grey 1.5, enemy:crumb-ant 1.4; the killing blow: boss:amusing.
- Damage dealt 1903, by weapon: steam-vent 1903.
- Kills 86, by weapon: steam-vent 86.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 4, spent 0.
- Made: no evolution, union or evolved item.

### L4.I9.G5: extraDamage 0 s4343 harm check

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4343; 300s; plays the playbook with extraDamage 0.
- Outcome: died after 129.4s (game clock 02:09); damage taken 129 (boss:amusing 63.7, enemy:potato-beetle 32.4, enemy:snow-mold 25.6, enemy:frost-flea 7.3); 395 kills; level 1 to 10; planner asked 57 times, action model 282; the models saw the game 29 ms late (p90 48); ended with steam-vent 2, tater-twirl 5, starch-chain 1, mash-wave 1, locked-gatling 1, frozen-fries 1, starch-plating 2.
- Damage taken 129, by source: boss:amusing 63.7, enemy:potato-beetle 32.4, enemy:snow-mold 25.6, enemy:frost-flea 7.3; the killing blow: boss:amusing.
- Damage dealt 15970, by weapon: tater-twirl 8754, mash-wave 3046.3, starch-chain 2719.1, steam-vent 1020.2, locked-gatling 430.
- Kills 395, by weapon: tater-twirl 143, mash-wave 132, starch-chain 82, steam-vent 35, locked-gatling 3.
- Bosses killed 0, elites killed 8, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 140, spent 0.
- Made: no evolution, union or evolved item.
