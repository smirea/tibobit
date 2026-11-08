# Do the gold rule and hp picks help natural plain builds from 10:00 and 15:00 on Nightmare 1

| Field | Value |
| --- | --- |
| Status | done |
| Area | economy |
| Result | inconclusive |
| Created | sonnet-medium L4.I1 |
| Updated | L4.I10 |

## Hypothesis

The gold rule and the hp picks each help separately; the combined 15:00 death may come from either or from chance.

## Method

L4.I2: from nm1-min15-plain-f, plain repeat, gold rule alone twice, hp picks alone; plus the gold rule again from nm1-min10-plain-f.

## Findings

Across the plain-f, plain-g and plain-h NM1 gyms (L4.I1-I6, lockstep), plain play took 0-250 damage and the gyms were too easy to separate variants. The ungated gold rule died 3 of 6 on 15:00 gyms; the gold rule gated before 15:45 did not die but never lowered damage versus plain. hp picks did nothing measurable. The gated rule is already in the playbook. The NM1 gyms are retired, so further gold-rule tests need NM2 live gyms.

## Games

### L4.I1.G1: 10:00 plain baseline

- Start: gym nm1-min10-plain-f (Nightmare 1 at 10:00), seed 1R3XP30; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 15:00), health 192/192; damage taken 15 (Brambles 8.7, Hot oil 5.9); 27138 kills; level 31 to 49; planner asked 111 times, action model 264, in lockstep; ended with jet-fryer 1, grease-fire 1, mash-landing 8, tater-minigun 1, reset-button 2, peeler 2, chives 5, root-network 5, hot-start 5, thick-skin 5, masher-grip 5, gravy-heart 5.
- Damage taken 15, by source: Brambles 8.7, Hot oil 5.9.
- Damage dealt 5887574, by weapon: grease-fire 5750458.8, tater-minigun 121139.8, locked-gatling 15974.9.
- Kills 27138, by weapon: grease-fire 26682, tater-minigun 392, locked-gatling 64.
- Bosses killed 3, elites killed 4, boss chests 6, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2689, spent 0.
- Made: tater-minigun at 11:06.

### L4.I1.G2: 10:00 gold rule

- Start: gym nm1-min10-plain-f (Nightmare 1 at 10:00), seed 1R3XP30; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 15:00), health 271/287; damage taken 328 (boss:deep-freezer 152.4, enemy:blight-spore 61.5, enemy:field-crow 55.2, enemy:ice-imp 47.9); 24745 kills; level 31 to 49; planner asked 146 times, action model 233, in lockstep; ended with jet-fryer 1, grease-fire 1, mash-landing 8, tater-minigun 1, tot-stampede 1, mash-snowball 7, chives 5, root-network 5, hot-start 5, thick-skin 5, masher-grip 5, gravy-heart 5.
- Damage taken 328, by source: boss:deep-freezer 152.4, enemy:blight-spore 61.5, enemy:field-crow 55.2, enemy:ice-imp 47.9, Hot oil 6.6, Spore vent 4.1.
- Damage dealt 5627627, by weapon: grease-fire 4304609.8, spicy-croquette 865779, tater-minigun 385308.7, locked-gatling 41854.1, mash-snowball 14565.3, souffle-spud 9005.9, tot-stampede 3122.1, boom-spud 2347.
- Kills 24745, by weapon: grease-fire 20007, spicy-croquette 2739, tater-minigun 1715, locked-gatling 228, mash-snowball 38, souffle-spud 11, grok-bot 6, boom-spud 1.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 7, shrines used 11, items bought 5, revives used 0; gold earned 3144, spent 3744.
- Made: tater-minigun at 11:26.

### L4.I1.G3: 10:00 gold rule + hp picks

- Start: gym nm1-min10-plain-f (Nightmare 1 at 10:00), seed 1R3XP30; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: alive after 300s (game clock 15:00), health 234/234; damage taken 150 (Spore vent 47.3, enemy:field-crow 42, enemy:ice-imp 29.9, enemy:field-rat 17.7); 20926 kills; level 31 to 51; planner asked 122 times, action model 195, in lockstep; ended with jet-fryer 1, grease-fire 1, mash-landing 2, tater-minigun 1, seed-potato 5, sprout-squad 8, chives 5, root-network 5, hot-start 3, thick-skin 5, masher-grip 5, gravy-heart 5.
- Damage taken 150, by source: Spore vent 47.3, enemy:field-crow 42, enemy:ice-imp 29.9, enemy:field-rat 17.7, enemy:blight-spore 13.2.
- Damage dealt 5239909, by weapon: grease-fire 4864916.5, tater-minigun 302598.8, seed-potato 30327.5, locked-gatling 26909.6, sprout-squad 15156.6.
- Kills 20926, by weapon: grease-fire 19918, tater-minigun 898, locked-gatling 98, seed-potato 10, sprout-squad 2.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 5, shrines used 8, items bought 1, revives used 0; gold earned 4060, spent 719.
- Made: tater-minigun at 12:07.

### L4.I1.G4: 15:00 plain baseline

- Start: gym nm1-min15-plain-f (Nightmare 1 at 15:00), seed 1XUSETT; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 20:00), health 168/168; damage taken 5 (Hot oil 4.9); 32820 kills; level 52 to 67; planner asked 81 times, action model 139, in lockstep; ended with tot-gatling 1, grease-fire 1, starch-bolt 8, root-current 1, hash-harrier 1, tot-stampede 8, bacon-bits 5, root-network 5, chives 5, thick-skin 5, masher-grip 5, stuffed-skin 5.
- Damage taken 5, by source: Hot oil 4.9.
- Damage dealt 25329855, by weapon: grease-fire 24475836, tot-gatling 387413.6, hash-harrier 175667.6, root-current 142418.4, tot-stampede 101582.1, starch-bolt 45484.4, alex 1373, dog:dalmatian 61.6.
- Kills 32820, by weapon: grease-fire 31982, tot-gatling 301, root-current 189, hash-harrier 169, tot-stampede 150, starch-bolt 27, grok-bot 1, alex 1.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 6275, spent 0.
- Made: no evolution, union or evolved item.

### L4.I1.G5: 15:00 gold rule + hp picks

- Start: gym nm1-min15-plain-f (Nightmare 1 at 15:00), seed 1XUSETT; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: died after 230.8s (game clock 18:51); damage taken 710 (enemy:ice-imp 429.8, enemy:grease-fiend 147.2, enemy:blight-spore 91, enemy:field-rat 28.8); 29618 kills; level 52 to 66; planner asked 92 times, action model 219, in lockstep; ended with tot-gatling 1, grease-fire 1, starch-bolt 8, root-current 1, hash-harrier 1, tot-stampede 8, bacon-bits 5, root-network 5, chives 5, thick-skin 5, masher-grip 5, stuffed-skin 5.
- Damage taken 710, by source: enemy:ice-imp 429.8, enemy:grease-fiend 147.2, enemy:blight-spore 91, enemy:field-rat 28.8, Hot oil 11.6, Brambles 1.3; the killing blow: enemy:ice-imp.
- Damage dealt 16404901, by weapon: grease-fire 13337288.6, hash-harrier 1179729.5, root-current 792532.1, tot-gatling 740073.3, starch-bolt 289092.5, tot-stampede 58688.6, alex 6853.4, dog:dalmatian 643.4.
- Kills 29618, by weapon: grease-fire 25098, root-current 2007, hash-harrier 1303, tot-gatling 931, starch-bolt 190, tot-stampede 73, alex 15, dog:dalmatian 1.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 3, shrines used 4, items bought 0, revives used 0; gold earned 4799, spent 205.
- Made: no evolution, union or evolved item.

### L4.I2.G1: 15:00 plain baseline repeat

- Start: gym nm1-min15-plain-f (Nightmare 1 at 15:00), seed 1XUSETT; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 168/168; damage taken 0; 66197 kills; level 52 to 75; planner asked 77 times, action model 36, in lockstep; ended with tot-gatling 1, grease-fire 1, starch-bolt 8, root-current 1, hash-harrier 1, tot-stampede 8, bacon-bits 5, root-network 5, chives 5, thick-skin 5, masher-grip 5, stuffed-skin 5.
- Damage taken 0, by source: none.
- Damage dealt 38184884, by weapon: grease-fire 36710264.4, tot-gatling 828964.3, root-current 266543.9, hash-harrier 211737.1, tot-stampede 107453.4, starch-bolt 54501.9, alex 5364.8, dog:dalmatian 54.
- Kills 66197, by weapon: grease-fire 64733, tot-gatling 627, root-current 461, hash-harrier 228, tot-stampede 87, starch-bolt 59, alex 2.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 11050, spent 0.
- Made: no evolution, union or evolved item.

### L4.I2.G2: 15:00 gold rule alone A

- Start: gym nm1-min15-plain-f (Nightmare 1 at 15:00), seed 1XUSETT; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 20:00), health 164/200; damage taken 183 (enemy:ice-imp 171.7, Hot oil 10.8); 39247 kills; level 52 to 76; planner asked 103 times, action model 145, in lockstep; ended with tot-gatling 1, grease-fire 1, starch-bolt 8, root-current 1, hash-harrier 1, tot-stampede 8, bacon-bits 5, root-network 5, chives 5, thick-skin 5, masher-grip 5, stuffed-skin 5.
- Damage taken 183, by source: enemy:ice-imp 171.7, Hot oil 10.8.
- Damage dealt 42883396, by weapon: grease-fire 25642595.4, meteor-russet 12378699, hash-harrier 1594029.5, root-current 1415418.2, tot-gatling 1239967.9, starch-bolt 386335.1, tot-stampede 107904.1, grok-bot 101955.7.
- Kills 39247, by weapon: grease-fire 25252, meteor-russet 10502, root-current 1454, hash-harrier 885, tot-gatling 827, starch-bolt 127, tot-stampede 111, grok-bot 80.
- Bosses killed 3, elites killed 11, boss chests 14, crates bought 6, shrines used 9, items bought 2, revives used 0; gold earned 15302, spent 3380.
- Made: meteor-russet at 15:19.

### L4.I2.G3: 15:00 gold rule alone B

- Start: gym nm1-min15-plain-f (Nightmare 1 at 15:00), seed 1XUSETT; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.3s (game clock 20:00), health 242/242; damage taken 163 (boss:compost-titan 69.4, enemy:ice-imp 62.1, Brambles 19.3, Spore vent 12.2); 44984 kills; level 52 to 71; planner asked 104 times, action model 211, in lockstep; ended with tot-gatling 1, grease-fire 1, starch-bolt 8, root-current 1, hash-harrier 1, tot-stampede 8, bacon-bits 5, root-network 5, chives 5, thick-skin 5, masher-grip 5, stuffed-skin 5.
- Damage taken 163, by source: boss:compost-titan 69.4, enemy:ice-imp 62.1, Brambles 19.3, Spore vent 12.2.
- Damage dealt 32512510, by weapon: grease-fire 20313141.9, storm-tot 7340697.9, hash-harrier 1832952.4, tot-gatling 1237179.9, root-current 1053631.8, starch-bolt 450968.5, static-tot 153621.5, tot-stampede 89155.3.
- Kills 44984, by weapon: grease-fire 32429, storm-tot 5984, root-current 2262, hash-harrier 1927, tot-gatling 1562, static-tot 318, starch-bolt 289, tot-stampede 127.
- Bosses killed 3, elites killed 10, boss chests 13, crates bought 5, shrines used 8, items bought 4, revives used 0; gold earned 10842, spent 2569.
- Made: storm-tot at 17:12.

### L4.I2.G4: 15:00 hp picks alone

- Start: gym nm1-min15-plain-f (Nightmare 1 at 15:00), seed 1XUSETT; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.1s (game clock 20:00), health 168/168; damage taken 10 (Brambles 5.5, Spore vent 4.6); 44275 kills; level 52 to 71; planner asked 86 times, action model 76, in lockstep; ended with tot-gatling 1, grease-fire 1, starch-bolt 8, root-current 1, hash-harrier 1, tot-stampede 8, bacon-bits 5, root-network 5, chives 5, thick-skin 5, masher-grip 5, stuffed-skin 5.
- Damage taken 10, by source: Brambles 5.5, Spore vent 4.6.
- Damage dealt 31202507, by weapon: grease-fire 29426232.2, tot-gatling 830773, root-current 357927.1, hash-harrier 356955, tot-stampede 98962.4, starch-bolt 94622.3, grok-bot 32974.4, alex 3900.6.
- Kills 44275, by weapon: grease-fire 42216, tot-gatling 771, root-current 575, hash-harrier 402, tot-stampede 126, grok-bot 111, starch-bolt 73, alex 1.
- Bosses killed 3, elites killed 8, boss chests 11, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 8219, spent 0.
- Made: no evolution, union or evolved item.

### L4.I2.G5: 10:00 gold rule repeat

- Start: gym nm1-min10-plain-f (Nightmare 1 at 10:00), seed 1R3XP30; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.2s (game clock 15:00), health 234/234; damage taken 491 (enemy:ice-imp 159.2, boss:great-wireworm 112.9, enemy:bog-toad 72.8, enemy:harvest-mouse 45.8); 27101 kills; level 31 to 52; planner asked 149 times, action model 299, in lockstep; ended with jet-fryer 1, grease-fire 1, mash-meteor 1, tater-minigun 1, mash-avalanche 1, root-cellar 2, chives 5, root-network 5, hot-start 5, thick-skin 5, masher-grip 5, gravy-heart 5.
- Damage taken 491, by source: enemy:ice-imp 159.2, boss:great-wireworm 112.9, enemy:bog-toad 72.8, enemy:harvest-mouse 45.8, enemy:blight-spore 37.9, Hot oil 24.7, enemy:field-crow 19.8, enemy:field-rat 18.1.
- Damage dealt 5731609, by weapon: grease-fire 4939743.6, tater-minigun 637852, mash-avalanche 42992.9, jet-fryer 30361.8, locked-gatling 30253.9, mash-snowball 29522, grok-bot 11481.9, mash-landing 3864.2.
- Kills 27101, by weapon: grease-fire 23749, tater-minigun 2738, mash-avalanche 196, jet-fryer 152, locked-gatling 138, grok-bot 75, mash-landing 22, mash-snowball 16.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 2, shrines used 3, items bought 4, revives used 0; gold earned 3755, spent 1532.
- Made: tater-minigun at 11:10, mash-meteor at 14:28, mash-avalanche at 14:37.

### L4.I3.G1: 15:00 map c plain

- Start: gym nm1-min15-natural-c (Nightmare 1 at 15:00), seed 1FWJ9T6; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 20:00), health 132/132; damage taken 80 (boss:ketchup-kraken 58.7, Brambles 11.1, Hot oil 10.5); 192642 kills; level 74 to 105; planner asked 95 times, action model 58, in lockstep; ended with mashquake 1, spark-corral 1, eclipse-scythe 1, grease-fire 1, seed-potato 8, gratin-arc 1, butter-pat 5, big-bowl 5, root-network 5, gpu 5, thick-skin 5, hot-sauce 5.
- Damage taken 80, by source: boss:ketchup-kraken 58.7, Brambles 11.1, Hot oil 10.5.
- Damage dealt 124916196, by weapon: grease-fire 114842282.6, bonfire-spud 7949832.6, spark-corral 1320629.7, mashquake 452133.4, gratin-arc 328068, eclipse-scythe 10288.3, seed-potato 10172, grok-bot 2789.1.
- Kills 192642, by weapon: grease-fire 177425, bonfire-spud 11326, spark-corral 2188, mashquake 887, gratin-arc 787, seed-potato 18, grok-bot 6, eclipse-scythe 5.
- Bosses killed 3, elites killed 8, boss chests 11, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 32330, spent 0.
- Made: no evolution, union or evolved item.

### L4.I3.G2: 15:00 map c gold rule

- Start: gym nm1-min15-natural-c (Nightmare 1 at 15:00), seed 1FWJ9T6; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.1s (game clock 20:00), health 164/164; damage taken 14 (Hot oil 7.3, Brambles 6.2); 132354 kills; level 74 to 93; planner asked 103 times, action model 58, in lockstep; ended with mashquake 1, spark-corral 1, eclipse-scythe 1, grease-fire 1, seed-potato 8, gratin-arc 1, butter-pat 5, big-bowl 5, root-network 5, gpu 5, thick-skin 5, hot-sauce 5.
- Damage taken 14, by source: Hot oil 7.3, Brambles 6.2.
- Damage dealt 64072886, by weapon: grease-fire 42689265.8, magma-croquette 7596521.7, mashquake 5659618.6, bonfire-spud 5509794.4, gratin-arc 964835.7, heavy-russet 824496.7, spark-corral 644119.9, spicy-croquette 168186.9.
- Kills 132354, by weapon: grease-fire 96398, magma-croquette 11682, mashquake 11077, bonfire-spud 8364, gratin-arc 2479, spark-corral 1849, spicy-croquette 478, grok-bot 12.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 7, shrines used 2, items bought 1, revives used 0; gold earned 18245, spent 15505.
- Made: magma-croquette at 16:09.

### L4.I3.G3: 15:00 map c hp picks

- Start: gym nm1-min15-natural-c (Nightmare 1 at 15:00), seed 1FWJ9T6; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.3s (game clock 20:00), health 132/132; damage taken 16 (Hot oil 14.7, Brambles 1.5); 194276 kills; level 74 to 106; planner asked 88 times, action model 191, in lockstep; ended with mashquake 1, spark-corral 1, eclipse-scythe 1, grease-fire 1, seed-potato 8, gratin-arc 1, butter-pat 5, big-bowl 5, root-network 5, gpu 5, thick-skin 5, hot-sauce 5.
- Damage taken 16, by source: Hot oil 14.7, Brambles 1.5.
- Damage dealt 132569371, by weapon: grease-fire 121937611.1, bonfire-spud 8924032.4, spark-corral 1153420.8, mashquake 309499.7, gratin-arc 231676.3, eclipse-scythe 9602.2, grok-bot 1942.4, seed-potato 1585.6.
- Kills 194276, by weapon: grease-fire 180398, bonfire-spud 11460, spark-corral 1415, mashquake 648, gratin-arc 348, grok-bot 5, eclipse-scythe 2.
- Bosses killed 3, elites killed 8, boss chests 11, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 30700, spent 0.
- Made: no evolution, union or evolved item.

### L4.I3.G4: 10:00 plain-f plain repeat

- Start: gym nm1-min10-plain-f (Nightmare 1 at 10:00), seed 1R3XP30; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 15:00), health 192/192; damage taken 21 (Hot oil 14.3, Brambles 4.3, Spore vent 2.8); 33100 kills; level 31 to 51; planner asked 117 times, action model 66, in lockstep; ended with jet-fryer 1, grease-fire 1, mash-landing 8, tater-minigun 1, mandoline-fury 1, sprout-squad 7, chives 5, root-network 5, hot-start 3, thick-skin 3, masher-grip 5, gravy-heart 5.
- Damage taken 21, by source: Hot oil 14.3, Brambles 4.3, Spore vent 2.8.
- Damage dealt 7548389, by weapon: grease-fire 7202193, tater-minigun 257074.7, mandoline-fury 37277.5, sprout-squad 20793, locked-gatling 20050, grok-bot 6391.2, peeler 4609.6.
- Kills 33100, by weapon: grease-fire 31848, tater-minigun 962, mandoline-fury 170, locked-gatling 73, grok-bot 40, sprout-squad 4, peeler 3.
- Bosses killed 3, elites killed 10, boss chests 13, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 3402, spent 0.
- Made: tater-minigun at 10:55, mandoline-fury at 13:24.

### L4.I3.G5: 10:00 plain-f hp picks

- Start: gym nm1-min10-plain-f (Nightmare 1 at 10:00), seed 1R3XP30; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300s (game clock 15:00), health 192/192; damage taken 0; 25688 kills; level 31 to 51; planner asked 117 times, action model 49, in lockstep; ended with jet-fryer 1, grease-fire 1, mash-landing 8, tater-minigun 1, mash-snowball 3, mandoline-fury 1, chives 5, root-network 5, hot-start 3, thick-skin 5, masher-grip 5, gravy-heart 5.
- Damage taken 0, by source: none.
- Damage dealt 6255301, by weapon: grease-fire 6007841.8, tater-minigun 209626.6, locked-gatling 22240.8, grok-bot 9574.8, mash-snowball 2839.3, mandoline-fury 1863, peeler 1314.5.
- Kills 25688, by weapon: grease-fire 24969, tater-minigun 624, locked-gatling 61, grok-bot 31, mash-snowball 2, mandoline-fury 1.
- Bosses killed 3, elites killed 8, boss chests 11, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 3382, spent 0.
- Made: tater-minigun at 12:04, mandoline-fury at 14:40.

### L4.I4.G1: 15:00 plain-g plain

- Start: gym nm1-min15-plain-g (Nightmare 1 at 15:00), seed S7OXEY; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 20:00), health 221/221; damage taken 759 (boss:ketchup-kraken 561.9, boss:compost-titan 168.1, enemy:ice-imp 26.4, Hot oil 2.8); 32021 kills; level 46 to 64; planner asked 94 times, action model 282, in lockstep; ended with pressure-cooker 1, tater-minigun 1, hot-streak 8, taproot-eruption 1, root-legion 1, mash-avalanche 1, big-bowl 5, packed-pan 5, hearty-helping 5, gravy-heart 5, masher-grip 5, root-network 5.
- Damage taken 759, by source: boss:ketchup-kraken 561.9, boss:compost-titan 168.1, enemy:ice-imp 26.4, Hot oil 2.8.
- Damage dealt 20762776, by weapon: mash-avalanche 4863108.7, pressure-cooker 4651702.3, hot-streak 3512911.8, taproot-eruption 3478784.9, root-legion 2966363.2, tater-minigun 1115157, mash-snowball 121647.8, grok-bot 42089.9.
- Kills 32021, by weapon: pressure-cooker 7754, mash-avalanche 6963, hot-streak 5428, taproot-eruption 5114, root-legion 4550, tater-minigun 1827, grok-bot 173, mash-snowball 139.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 5283, spent 0.
- Made: root-legion at 15:37, mash-avalanche at 16:38.

### L4.I4.G2: 15:00 plain-g gold rule

- Start: gym nm1-min15-plain-g (Nightmare 1 at 15:00), seed S7OXEY; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 260.8s (game clock 19:21); damage taken 1332 (boss:ketchup-kraken 796, enemy:grease-fiend 135.6, boss:compost-titan 134.5, enemy:ice-imp 113.6); 29940 kills; level 46 to 62; planner asked 93 times, action model 412, in lockstep; ended with pressure-cooker 1, tater-minigun 1, hot-streak 8, taproot-eruption 1, root-legion 1, mash-avalanche 1, big-bowl 5, packed-pan 5, hearty-helping 5, gravy-heart 5, masher-grip 5, root-network 5.
- Damage taken 1332, by source: boss:ketchup-kraken 796, enemy:grease-fiend 135.6, boss:compost-titan 134.5, enemy:ice-imp 113.6, enemy:mud-golem 107.9, Hot oil 16.8, enemy:blight-spore 16.4, Brambles 11.6; the killing blow: enemy:mud-golem.
- Damage dealt 15748383, by weapon: pressure-cooker 3642288.8, mash-avalanche 3456317.5, taproot-eruption 2746376.7, root-legion 2447359.6, hot-streak 1995558.7, tater-minigun 1359019.1, mash-snowball 93734.2, sprout-squad 7728.3.
- Kills 29940, by weapon: pressure-cooker 7244, mash-avalanche 5962, taproot-eruption 5212, root-legion 4789, hot-streak 4160, tater-minigun 2432, mash-snowball 104, sprout-squad 37.
- Bosses killed 2, elites killed 4, boss chests 6, crates bought 2, shrines used 2, items bought 2, revives used 0; gold earned 4629, spent 1048.
- Made: root-legion at 15:23, mash-avalanche at 16:15.

### L4.I4.G3: 15:00 plain-g gold + def picks

- Start: gym nm1-min15-plain-g (Nightmare 1 at 15:00), seed S7OXEY; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: alive after 300s (game clock 20:00), health 221/221; damage taken 839 (boss:compost-titan 403.5, enemy:grease-fiend 146.4, boss:ketchup-kraken 103.8, enemy:ice-imp 82.1); 34207 kills; level 46 to 64; planner asked 98 times, action model 393, in lockstep; ended with pressure-cooker 1, tater-minigun 1, hot-streak 8, taproot-eruption 1, root-legion 1, mash-avalanche 1, big-bowl 5, packed-pan 5, hearty-helping 5, gravy-heart 5, masher-grip 5, root-network 5.
- Damage taken 839, by source: boss:compost-titan 403.5, enemy:grease-fiend 146.4, boss:ketchup-kraken 103.8, enemy:ice-imp 82.1, enemy:mud-golem 58.7, boss:grater-golem 36, Brambles 8.2.
- Damage dealt 21124512, by weapon: pressure-cooker 5337742, mash-avalanche 5139053.4, taproot-eruption 3466609.5, root-legion 2944780.9, hot-streak 2858868.8, tater-minigun 1181137.4, mash-snowball 187200.3, sprout-squad 9119.4.
- Kills 34207, by weapon: pressure-cooker 9390, mash-avalanche 7207, taproot-eruption 5297, hot-streak 5255, root-legion 4803, tater-minigun 1960, mash-snowball 259, sprout-squad 36.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 3, shrines used 1, items bought 0, revives used 0; gold earned 5920, spent 232.
- Made: root-legion at 15:27, mash-avalanche at 16:44.

### L4.I4.G4: 10:00 plain-g plain

- Start: gym nm1-min10-plain-g (Nightmare 1 at 10:00), seed 63R4P6; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 15:00), health 120/120; damage taken 35 (Brambles 35); 20664 kills; level 30 to 47; planner asked 102 times, action model 335, in lockstep; ended with pressure-cooker 1, hot-streak 8, peeler 8, cast-iron 1, hash-bulwark 1, root-legion 1, starch-plating 5, aged-russet 5, hearty-helping 5, hash-rush 5, root-network 5, chives 5.
- Damage taken 35, by source: Brambles 35.
- Damage dealt 4751281, by weapon: hot-streak 1586543.9, cast-iron 1331077.4, pressure-cooker 961546, root-legion 546230.8, peeler 162469.7, hash-bulwark 73239.2, sprout-squad 49862.5, frying-pan 30575.
- Kills 20664, by weapon: hot-streak 6933, cast-iron 6110, pressure-cooker 5009, root-legion 2093, hash-bulwark 251, frying-pan 108, peeler 83, grok-bot 35.
- Bosses killed 3, elites killed 4, boss chests 7, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2538, spent 0.
- Made: cast-iron at 10:13, root-legion at 13:13, hash-bulwark at 14:12.

### L4.I4.G5: 10:00 plain-g gold rule

- Start: gym nm1-min10-plain-g (Nightmare 1 at 10:00), seed 63R4P6; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.4s (game clock 15:00), health 146/146; damage taken 18 (Brambles 14.1, Hot oil 2.6, enemy:field-rat 0.8, enemy:ice-imp 0.2); 17939 kills; level 30 to 45; planner asked 121 times, action model 217, in lockstep; ended with pressure-cooker 1, hot-streak 8, peeler 8, griddle-guard 1, julienne-dash 6, sprout-squad 3, starch-plating 5, aged-russet 5, hearty-helping 5, hash-rush 5, root-network 5, chives 5.
- Damage taken 18, by source: Brambles 14.1, Hot oil 2.6, enemy:field-rat 0.8, enemy:ice-imp 0.2.
- Damage dealt 5155278, by weapon: griddle-guard 1782613.8, pressure-cooker 1431371.9, cast-iron 875078.6, hot-streak 748233.6, peeler 201491, julienne-dash 52572.5, frying-pan 27278, grok-bot 18168.
- Kills 17939, by weapon: pressure-cooker 5377, griddle-guard 5019, cast-iron 3991, hot-streak 3033, julienne-dash 181, peeler 121, grok-bot 93, frying-pan 83.
- Bosses killed 3, elites killed 4, boss chests 6, crates bought 2, shrines used 7, items bought 2, revives used 0; gold earned 4807, spent 1443.
- Made: cast-iron at 10:16, hash-bulwark at 13:09, griddle-guard at 13:10.

### L4.I5.G1: 15:00 plain-g plain repeat

- Start: gym nm1-min15-plain-g (Nightmare 1 at 15:00), seed S7OXEY; 300s; plays the playbook.
- Outcome: alive after 300s (game clock 20:00), health 192/192; damage taken 62 (Brambles 31.3, boss:grater-golem 26.5, Spore vent 4.5); 45302 kills; level 46 to 68; planner asked 112 times, action model 120, in lockstep; ended with root-current 1, mash-avalanche 1, grease-fire 1, hash-harrier 1, gravy-pack 1, starch-bolt 8, butter-socks 5, gravy-heart 5, root-network 5, bacon-bits 5, masher-grip 5, thick-skin 5.
- Damage taken 62, by source: Brambles 31.3, boss:grater-golem 26.5, Spore vent 4.5.
- Damage dealt 30934020, by weapon: grease-fire 27997705.6, root-current 1069474.8, mash-avalanche 548177.6, wildfire-roast 446965.3, hash-harrier 367075.8, moon-dust 214863.3, gravy-pack 139825.7, pressure-cooker 70290.1.
- Kills 45302, by weapon: grease-fire 39638, root-current 2481, wildfire-roast 1223, mash-avalanche 796, moon-dust 356, hash-harrier 308, gravy-pack 279, pressure-cooker 110.
- Bosses killed 3, elites killed 10, boss chests 13, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 7306, spent 0.
- Made: hash-harrier at 16:05, gravy-pack at 18:05, grease-fire at 15:26.

### L4.I5.G2: 15:00 plain-g gold rule repeat

- Start: gym nm1-min15-plain-g (Nightmare 1 at 15:00), seed S7OXEY; 300s; plays the playbook with its own planner.goal.
- Outcome: died after 198.7s (game clock 18:19); damage taken 690 (enemy:ice-imp 350.1, enemy:grease-fiend 280.8, enemy:field-rat 34.4, enemy:blight-spore 17.7); 15785 kills; level 46 to 56; planner asked 72 times, action model 315, in lockstep; ended with pressure-cooker 1, root-current 1, mash-avalanche 1, wildfire-roast 1, hash-harrier 1, tater-pup 1, butter-socks 2, gravy-heart 5, root-network 5, bacon-bits 5, masher-grip 5, thick-skin 4.
- Damage taken 690, by source: enemy:ice-imp 350.1, enemy:grease-fiend 280.8, enemy:field-rat 34.4, enemy:blight-spore 17.7, Hot oil 4, Brambles 2.9; the killing blow: enemy:grease-fiend.
- Damage dealt 9039146, by weapon: root-current 2516958.4, wildfire-roast 2446049, mash-avalanche 1885614.8, pressure-cooker 1664284, moon-dust 210131, boom-spud 152935.1, hash-hawk 86468.3, hash-harrier 62917.1.
- Kills 15785, by weapon: root-current 6472, wildfire-roast 4092, mash-avalanche 2721, pressure-cooker 2009, moon-dust 222, boom-spud 184, hash-hawk 37, hash-harrier 35.
- Bosses killed 3, elites killed 5, boss chests 1, crates bought 11, shrines used 2, items bought 4, revives used 0; gold earned 3432, spent 5627.
- Made: hash-harrier at 18:12.

### L4.I5.G3: 15:00 plain-g gold plus defensive picks repeat

- Start: gym nm1-min15-plain-g (Nightmare 1 at 15:00), seed S7OXEY; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: died after 56.7s (game clock 15:57); damage taken 405 (enemy:ice-imp 279.6, enemy:mole 41.8, Spore vent 33.2, enemy:field-crow 31.4); 4535 kills; level 46 to 48; planner asked 23 times, action model 115, in lockstep; ended with pressure-cooker 1, root-current 1, mash-avalanche 1, wildfire-roast 1, hash-hawk 3, tater-pup 2, butter-socks 2, gravy-heart 5, root-network 5, bacon-bits 3, masher-grip 5, thick-skin 2.
- Damage taken 405, by source: enemy:ice-imp 279.6, enemy:mole 41.8, Spore vent 33.2, enemy:field-crow 31.4, enemy:blight-spore 18.1, Brambles 0.4; the killing blow: enemy:ice-imp.
- Damage dealt 1660814, by weapon: root-current 496132, wildfire-roast 424095.1, pressure-cooker 354174.7, mash-avalanche 298152.2, moon-dust 41832.1, boom-spud 36351.4, hash-hawk 8954.3, tater-pup 1121.7.
- Kills 4535, by weapon: root-current 2115, wildfire-roast 1006, mash-avalanche 669, pressure-cooker 630, boom-spud 61, moon-dust 53, hash-hawk 1.
- Bosses killed 0, elites killed 2, boss chests 0, crates bought 1, shrines used 1, items bought 1, revives used 0; gold earned 1524, spent 497.
- Made: no evolution, union or evolved item.

### L4.I5.G4: 10:00 plain-g plain, save 15:00

- Start: gym nm1-min10-plain-g (Nightmare 1 at 10:00), seed 63R4P6; 300s; plays the playbook.
- Outcome: alive after 300.3s (game clock 15:00), health 190/192; damage taken 248 (enemy:ice-imp 104.8, boss:the-mandoline 50.7, boss:great-wireworm 47.9, enemy:blight-spore 27.5); 26648 kills; level 30 to 50; planner asked 110 times, action model 609, in lockstep; ended with pressure-cooker 1, gravy-pack 1, root-current 1, peeler 2, wildfire-roast 1, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5; saved as gym nm1-min15-plain-h.
- Damage taken 248, by source: enemy:ice-imp 104.8, boss:the-mandoline 50.7, boss:great-wireworm 47.9, enemy:blight-spore 27.5, enemy:field-rat 8.4, Hot oil 5.3, enemy:spittlebug 3.2.
- Damage dealt 5483891, by weapon: pressure-cooker 1894661, wildfire-roast 1041689.6, gravy-pack 732829.9, hot-streak 722115.7, taproot-eruption 548145.4, root-current 503408.3, potato-battery 19779, root-spikes 12518.9.
- Kills 26648, by weapon: pressure-cooker 11236, wildfire-roast 4445, root-current 3561, taproot-eruption 2874, gravy-pack 2160, hot-streak 2136, potato-battery 103, root-spikes 62.
- Bosses killed 4, elites killed 4, boss chests 8, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 3322, spent 0.
- Made: taproot-eruption at 10:44, spud-grid at 13:21, wildfire-roast at 14:07, root-current at 13:22.

### L4.I5.G5: 10:00 plain-g gold rule, save 15:00

- Start: gym nm1-min10-plain-g (Nightmare 1 at 10:00), seed 63R4P6; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300s (game clock 15:00), health 215/215; damage taken 205 (boss:great-wireworm 79, enemy:ice-imp 36.9, enemy:spittlebug 22.6, Hot oil 19.9); 16835 kills; level 30 to 47; planner asked 134 times, action model 349, in lockstep; ended with gravy-pack 1, taproot-eruption 1, peeler 6, grease-fire 1, hash-brown-shield 2, potato-battery 2, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5; saved as gym nm1-min15-gold-h.
- Damage taken 205, by source: boss:great-wireworm 79, enemy:ice-imp 36.9, enemy:spittlebug 22.6, Hot oil 19.9, enemy:field-crow 18.3, enemy:blight-spore 11.5, boss:deep-freezer 8.7, enemy:field-rat 8.3.
- Damage dealt 4765257, by weapon: storm-tot 2336572.9, gravy-pack 790228.4, pressure-cooker 568586.1, taproot-eruption 564810.4, grease-fire 347486.5, static-tot 56939.4, coal-baked-spud 41348.9, hot-streak 30706.4.
- Kills 16835, by weapon: storm-tot 7336, pressure-cooker 3323, gravy-pack 2230, taproot-eruption 2136, grease-fire 1049, static-tot 323, coal-baked-spud 203, hot-streak 118.
- Bosses killed 3, elites killed 5, boss chests 5, crates bought 10, shrines used 9, items bought 0, revives used 0; gold earned 4887, spent 2705.
- Made: taproot-eruption at 11:33, wildfire-roast at 14:01, grease-fire at 14:01, storm-tot at 11:33.

### L4.I6.G1: plain-h plain A

- Start: gym nm1-min15-plain-h (Nightmare 1 at 15:01), seed 63R4P6; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 20:00), health 192/192; damage taken 36 (boss:compost-titan 22.5, Hot oil 9, Brambles 4.9); 60508 kills; level 50 to 74; planner asked 106 times, action model 131, in lockstep; ended with gravy-pack 1, root-current 1, mandoline-fury 1, grease-fire 1, root-legion 1, tater-minigun 1, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5.
- Damage taken 36, by source: boss:compost-titan 22.5, Hot oil 9, Brambles 4.9.
- Damage dealt 34971855, by weapon: grease-fire 31931425.6, root-current 823768.8, root-legion 668647.2, tater-minigun 605552.3, gravy-pack 381302.2, wildfire-roast 293029.8, mandoline-fury 176325.9, sprout-squad 25192.3.
- Kills 60508, by weapon: grease-fire 54322, root-current 2586, wildfire-roast 1128, root-legion 1057, tater-minigun 702, gravy-pack 373, mandoline-fury 228, grok-bot 77.
- Bosses killed 3, elites killed 8, boss chests 11, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 9510, spent 0.
- Made: tater-minigun at 16:59, mandoline-fury at 17:22, root-legion at 18:11, grease-fire at 15:14.

### L4.I6.G2: plain-h plain B

- Start: gym nm1-min15-plain-h (Nightmare 1 at 15:01), seed 63R4P6; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 20:00), health 192/192; damage taken 151 (boss:compost-titan 67.6, enemy:field-rat 49.9, enemy:field-crow 18.2, Hot oil 10.3); 64587 kills; level 50 to 73; planner asked 121 times, action model 118, in lockstep; ended with gravy-pack 1, root-current 1, mandoline-fury 1, grease-fire 1, root-legion 1, mash-wave 8, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5.
- Damage taken 151, by source: boss:compost-titan 67.6, enemy:field-rat 49.9, enemy:field-crow 18.2, Hot oil 10.3, Brambles 4.7.
- Damage dealt 36522775, by weapon: grease-fire 33861131.2, root-legion 873869.6, root-current 835152, gravy-pack 391871, wildfire-roast 293029.8, mandoline-fury 189463.7, mash-wave 24353.2, peeler 19023.8.
- Kills 64587, by weapon: grease-fire 58572, root-current 2695, root-legion 1376, wildfire-roast 1128, gravy-pack 435, mandoline-fury 321, mash-wave 24, pressure-cooker 13.
- Bosses killed 3, elites killed 8, boss chests 11, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 9407, spent 0.
- Made: mandoline-fury at 17:09, root-legion at 17:12, grease-fire at 15:14.

### L4.I6.G3: gold-h plain A

- Start: gym nm1-min15-gold-h (Nightmare 1 at 15:00), seed 63R4P6; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 20:00), health 215/215; damage taken 24 (Brambles 10.9, boss:compost-titan 8.1, boss:grater-golem 4.1, Spore vent 1); 46311 kills; level 47 to 72; planner asked 111 times, action model 49, in lockstep; ended with gravy-pack 1, root-current 1, mandoline-fury 1, grease-fire 1, hash-bulwark 1, tot-toss 8, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5.
- Damage taken 24, by source: Brambles 10.9, boss:compost-titan 8.1, boss:grater-golem 4.1, Spore vent 1.
- Damage dealt 45547197, by weapon: grease-fire 24803827.3, storm-tot 18699124.7, root-current 729790.7, gravy-pack 460515.4, coal-baked-spud 421971.5, mandoline-fury 191949.9, tot-toss 95659.5, grok-bot 72445.2.
- Kills 46311, by weapon: grease-fire 27347, storm-tot 16462, root-current 999, gravy-pack 443, coal-baked-spud 436, mandoline-fury 313, taproot-eruption 113, grok-bot 103.
- Bosses killed 6, elites killed 20, boss chests 27, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 13515, spent 0.
- Made: mandoline-fury at 15:32, spud-grid at 15:38, hash-bulwark at 15:58, root-current at 15:38.

### L4.I6.G4: gold-h plain B

- Start: gym nm1-min15-gold-h (Nightmare 1 at 15:00), seed 63R4P6; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 20:00), health 215/215; damage taken 44 (Brambles 24.3, boss:ketchup-kraken 8.2, enemy:field-rat 4.8, Spore vent 4.2); 52819 kills; level 47 to 73; planner asked 108 times, action model 64, in lockstep; ended with gravy-pack 1, root-current 1, mandoline-fury 1, grease-fire 1, hash-bulwark 1, rosti-storm 1, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5.
- Damage taken 44, by source: Brambles 24.3, boss:ketchup-kraken 8.2, enemy:field-rat 4.8, Spore vent 4.2, boss:compost-titan 2.7.
- Damage dealt 47737346, by weapon: grease-fire 27838196.5, storm-tot 16709581.8, root-current 947486.7, rosti-storm 673190.7, gravy-pack 540532.2, coal-baked-spud 459978.2, mandoline-fury 305217.2, grok-bot 117581.4.
- Kills 52819, by weapon: grease-fire 33962, storm-tot 15218, root-current 1362, gravy-pack 489, mandoline-fury 448, coal-baked-spud 428, rosti-storm 389, grok-bot 207.
- Bosses killed 6, elites killed 20, boss chests 27, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 14359, spent 0.
- Made: mandoline-fury at 15:31, spud-grid at 15:37, hash-bulwark at 15:48, rosti-storm at 17:08, root-current at 15:45.

### L4.I6.G5: plain-h gold rule

- Start: gym nm1-min15-plain-h (Nightmare 1 at 15:01), seed 63R4P6; 300s; plays the playbook with its own planner.goal.
- Outcome: alive after 300.2s (game clock 20:00), health 238/238; damage taken 202 (boss:ketchup-kraken 131.7, enemy:grease-fiend 49.9, Hot oil 7.2, enemy:ice-imp 5.4); 45540 kills; level 50 to 70; planner asked 118 times, action model 210, in lockstep; ended with gravy-pack 1, root-current 1, mandoline-fury 1, grease-fire 1, tater-minigun 1, hash-bulwark 1, starch-plating 5, gravy-heart 5, root-network 5, packed-pan 5, thick-skin 5, masher-grip 5.
- Damage taken 202, by source: boss:ketchup-kraken 131.7, enemy:grease-fiend 49.9, Hot oil 7.2, enemy:ice-imp 5.4, Brambles 5, enemy:field-rat 3.1, enemy:blight-spore 0.1.
- Damage dealt 32829092, by weapon: grease-fire 17244942.1, storm-tot 9492885, root-current 2515385.6, mandoline-fury 1225530, gravy-pack 722867.6, wildfire-roast 652410.5, tater-minigun 609681.8, static-tot 133864.1.
- Kills 45540, by weapon: grease-fire 23587, storm-tot 10059, root-current 5978, wildfire-roast 2462, mandoline-fury 1387, gravy-pack 756, tater-minigun 755, static-tot 278.
- Bosses killed 4, elites killed 11, boss chests 14, crates bought 5, shrines used 7, items bought 5, revives used 0; gold earned 12358, spent 1793.
- Made: mandoline-fury at 16:17, tater-minigun at 17:24, hash-bulwark at 18:12, grease-fire at 15:26, storm-tot at 16:17.
