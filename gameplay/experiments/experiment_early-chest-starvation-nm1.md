# Do planEvery 10 or exploreDistance 600 fix the seeds where plain chest-first gets 0 chests

| Field | Value |
| --- | --- |
| Status | done |
| Area | models |
| Result | refuted |
| Coach | sonnet-medium |
| Created | sonnet-medium L3.I6 |
| Updated | sonnet-medium L3.I9 |

## Hypothesis

On seeds 1919, 2020 and 2121 plain chest-first finds its first chest late and drops elite and chest goals under 5s re-plans. planEvery 10 lets goals finish, and exploreDistance 600 finds a chest sooner. Either gets chests and an evolution by 5:00 on those seeds.

## Method

Fresh NM1 steam-vent on the three bad seeds, 300s, one knob changed per game against the known plain baselines (died 4:52, died 4:45, 33/120). Compare first chest time, chests, evolutions, dashes and survival, then repeat any winner on good seeds.

## Findings

L3.I8: explore 600 alone died on 1313 and 2020, fine on 1818, 1616, 2222. Neither knob is safe; the playbook stays plain chest-first.

## Games

### L3.I6.G1: s2020 planEvery 10

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2020; 300s; plays the playbook with planEvery 10.
- Outcome: died after 252.6s (game clock 04:12); damage taken 194 (boss:amusing 29.9, enemy:potato-beetle 20.7, enemy:frost-flea 16.9, enemy:sprout-mite 14.8); 346 kills; level 1 to 10; planner asked 60 times, action model 654, in lockstep; ended with steam-vent 2, tot-toss 1, masher-grip 3, hot-sauce 1, gravy-splash 1, gravy-heart 1, bacon-bits 1.
- Damage taken 194, by source: boss:amusing 29.9, enemy:potato-beetle 20.7, enemy:frost-flea 16.9, enemy:sprout-mite 14.8, enemy:tomato-leech 13.2, boss:the-masher 11.2, enemy:sand-crab 11, enemy:aphid 10.2; the killing blow: boss:the-masher.
- Damage dealt 8753, by weapon: steam-vent 8533.1, tot-toss 147.6, grok-bot 72.5.
- Kills 346, by weapon: steam-vent 337, grok-bot 6, tot-toss 3.
- Bosses killed 0, elites killed 1, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 41, spent 0.
- Made: no evolution, union or evolved item.

### L3.I6.G2: s1919 planEvery 10

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1919; 300s; plays the playbook with planEvery 10.
- Outcome: alive after 300.1s (game clock 05:00), health 192/192; damage taken 87 (enemy:sand-crab 28.4, boss:beetle-queen 15.5, enemy:snow-mold 9.7, enemy:frost-flea 6.3); 3000 kills; level 1 to 19; planner asked 90 times, action model 346, in lockstep; ended with pressure-cooker 1, hash-bulwark 1, gravy-heart 5, root-network 5, starch-plating 5.
- Damage taken 87, by source: enemy:sand-crab 28.4, boss:beetle-queen 15.5, enemy:snow-mold 9.7, enemy:frost-flea 6.3, enemy:sprout-mite 5.7, enemy:oil-drip 4, enemy:aphid 3.9, enemy:potato-beetle 3.2.
- Damage dealt 95389, by weapon: pressure-cooker 77229.2, hash-brown-shield 7131.1, steam-vent 5490.1, hash-bulwark 2777.7, grok-bot 2760.6.
- Kills 3000, by weapon: pressure-cooker 2404, hash-brown-shield 274, steam-vent 210, grok-bot 83, hash-bulwark 29.
- Bosses killed 4, elites killed 6, boss chests 10, crates bought 0, shrines used 1, items bought 0, revives used 0; gold earned 667, spent 0.
- Made: pressure-cooker at 02:22, hash-bulwark at 03:28.

### L3.I6.G3: s2121 planEvery 10

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2121; 300s; plays the playbook with planEvery 10.
- Outcome: alive after 300.1s (game clock 05:00), health 192/192; damage taken 172 (enemy:tomato-leech 30.8, boss:the-masher 20.9, enemy:compost-maggot 17.9, boss:amusing 17.7); 3335 kills; level 1 to 20; planner asked 90 times, action model 590, in lockstep; ended with pressure-cooker 1, locked-gatling 6, gravy-heart 5, bacon-bits 5, root-network 5, chives 5, masher-grip 1, peel-out 2.
- Damage taken 172, by source: enemy:tomato-leech 30.8, boss:the-masher 20.9, enemy:compost-maggot 17.9, boss:amusing 17.7, enemy:fry-fly 17.1, enemy:blight-spore 15.9, enemy:frost-flea 10.5, enemy:snow-mold 10.3.
- Damage dealt 115406, by weapon: pressure-cooker 81762.7, steam-vent 18017.7, locked-gatling 12643, grok-bot 2982.5.
- Kills 3335, by weapon: pressure-cooker 2305, steam-vent 626, locked-gatling 308, grok-bot 96.
- Bosses killed 4, elites killed 12, boss chests 16, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 988, spent 0.
- Made: pressure-cooker at 03:16.

### L3.I6.G4: s2020 explore 600

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2020; 300s; plays the playbook with exploreDistance 600.
- Outcome: alive after 300.3s (game clock 05:00), health 10/176; damage taken 243 (boss:amusing 35.5, boss:sir-strawman 33.7, enemy:snow-mold 28.8, enemy:dumpster-raccoon 20.9); 645 kills; level 1 to 11; planner asked 89 times, action model 770, in lockstep; ended with steam-vent 4, masher-grip 4, gravy-heart 3, stuffed-skin 1.
- Damage taken 243, by source: boss:amusing 35.5, boss:sir-strawman 33.7, enemy:snow-mold 28.8, enemy:dumpster-raccoon 20.9, enemy:potato-beetle 20.6, enemy:crumb-ant 17.5, enemy:sprout-mite 14.4, enemy:frost-flea 14.3.
- Damage dealt 18702, by weapon: steam-vent 18169, grok-bot 533.2.
- Kills 645, by weapon: steam-vent 628, grok-bot 17.
- Bosses killed 0, elites killed 1, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 76, spent 0.
- Made: no evolution, union or evolved item.

### L3.I6.G5: s1919 explore 600

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1919; 300s; plays the playbook with exploreDistance 600.
- Outcome: alive after 300.2s (game clock 05:00), health 207/207; damage taken 83 (boss:amusing 27.7, enemy:fry-fly 14.9, enemy:sand-crab 12.9, enemy:oil-drip 9.5); 2339 kills; level 1 to 17; planner asked 99 times, action model 381, in lockstep; ended with pressure-cooker 1, eclipse-scythe 1, gravy-heart 5, root-network 4, stuffed-skin 1, big-bowl 2, butter-pat 2.
- Damage taken 83, by source: boss:amusing 27.7, enemy:fry-fly 14.9, enemy:sand-crab 12.9, enemy:oil-drip 9.5, enemy:bowling-ball 6.8, enemy:crumb-ant 2.8, boss:beetle-queen 2.7, enemy:ketchup-drop 1.8.
- Damage dealt 78750, by weapon: pressure-cooker 67793, steam-vent 6726.1, eclipse-scythe 2344, grok-bot 1553.3, comet-scythe 333.6.
- Kills 2339, by weapon: pressure-cooker 1941, steam-vent 251, grok-bot 80, eclipse-scythe 62, comet-scythe 5.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 596, spent 0.
- Made: pressure-cooker at 02:26, eclipse-scythe at 04:12.

### L3.I7.G1: s1313 planEvery 10

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1313; 300s; plays the playbook with planEvery 10.
- Outcome: died after 299.4s (game clock 04:59); damage taken 151 (enemy:cave-grub 42.4, boss:amusing 20, enemy:sprout-mite 18.1, boss:the-masher 17.9); 330 kills; level 1 to 10; planner asked 61 times, action model 791, in lockstep; ended with steam-vent 3, butter-socks 4, slow-cooker 2, hot-start 1.
- Damage taken 151, by source: enemy:cave-grub 42.4, boss:amusing 20, enemy:sprout-mite 18.1, boss:the-masher 17.9, enemy:aphid 13.8, enemy:potato-beetle 11.7, boss:beetle-queen 5.4, enemy:compost-maggot 5.3; the killing blow: enemy:cave-grub.
- Damage dealt 10733, by weapon: steam-vent 10389.8, grok-bot 342.9.
- Kills 330, by weapon: steam-vent 319, grok-bot 11.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 25, spent 0.
- Made: no evolution, union or evolved item.

### L3.I7.G2: s1818 planEvery 10

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1818; 300s; plays the playbook with planEvery 10.
- Outcome: died after 241.4s (game clock 04:01); damage taken 122 (enemy:beetle-brood 25.7, boss:amusing 14.4, enemy:cave-grub 12.2, enemy:aphid 12.1); 287 kills; level 1 to 9; planner asked 59 times, action model 607, in lockstep; ended with steam-vent 3, mash-landing 3, hot-sauce 2.
- Damage taken 122, by source: enemy:beetle-brood 25.7, boss:amusing 14.4, enemy:cave-grub 12.2, enemy:aphid 12.1, enemy:compost-maggot 9.5, enemy:garden-slug 9.1, enemy:lint-bunny 8.3, enemy:bog-slime 5; the killing blow: enemy:bog-slime.
- Damage dealt 8293, by weapon: steam-vent 7693.5, grok-bot 599.5.
- Kills 287, by weapon: steam-vent 282, grok-bot 5.
- Bosses killed 0, elites killed 1, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 28, spent 0.
- Made: no evolution, union or evolved item.

### L3.I7.G3: s2222 planEvery 10

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2222; 300s; plays the playbook with planEvery 10.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 29 (Hot oil 19.8, enemy:sprout-mite 2.4, enemy:potato-beetle 2.3, enemy:ketchup-drop 2); 2986 kills; level 1 to 18; planner asked 80 times, action model 206, in lockstep; ended with pressure-cooker 1, big-fry 1, hot-streak 1, root-network 3, lean-lunch 1, gravy-splash 5, starch-plating 3, fertilizer 1, sour-cream 1.
- Damage taken 29, by source: Hot oil 19.8, enemy:sprout-mite 2.4, enemy:potato-beetle 2.3, enemy:ketchup-drop 2, enemy:oil-drip 1.6, enemy:aphid 1.1.
- Damage dealt 109379, by weapon: big-fry 68078.4, pressure-cooker 27520.4, small-fry 11175, steam-vent 1949.4, hot-streak 492.2, grok-bot 130, gravy-splash 33.9.
- Kills 2986, by weapon: big-fry 1613, pressure-cooker 918, small-fry 359, steam-vent 68, hot-streak 17, grok-bot 9, gravy-splash 2.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 654, spent 0.
- Made: pressure-cooker at 01:27, big-fry at 03:15.

### L3.I7.G4: s2020 planEvery 10 + explore 600

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2020; 300s; plays the playbook with planEvery 10, exploreDistance 600.
- Outcome: alive after 300.3s (game clock 05:00), health 120/120; damage taken 125 (enemy:beetle-brood 32.3, enemy:snow-mold 28.4, boss:beetle-queen 28.1, enemy:frost-flea 12.1); 3947 kills; level 1 to 20; planner asked 80 times, action model 479, in lockstep; ended with pressure-cooker 1, locked-gatling 7, masher-grip 5, sour-cream 3, starch-plating 1, root-network 2, peel-out 1, butter-pat 2.
- Damage taken 125, by source: enemy:beetle-brood 32.3, enemy:snow-mold 28.4, boss:beetle-queen 28.1, enemy:frost-flea 12.1, boss:the-masher 9.6, boss:amusing 2.8, enemy:fry-fly 2.5, enemy:potato-beetle 2.4.
- Damage dealt 119447, by weapon: pressure-cooker 63060.1, steam-vent 26256.7, locked-gatling 25365.3, alex 3691.9, grok-bot 1073.3.
- Kills 3947, by weapon: pressure-cooker 1923, steam-vent 1082, locked-gatling 765, alex 109, grok-bot 68.
- Bosses killed 4, elites killed 4, boss chests 8, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 555, spent 0.
- Made: pressure-cooker at 03:30.

### L3.I7.G5: s2121 explore 600

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2121; 300s; plays the playbook with exploreDistance 600.
- Outcome: alive after 300s (game clock 05:00), health 149/149; damage taken 84 (Hot oil 29.7, enemy:sprout-mite 11.4, enemy:ketchup-drop 11.3, boss:the-masher 11.2); 1963 kills; level 1 to 18; planner asked 105 times, action model 555, in lockstep; ended with pressure-cooker 1, ghee-glide 1, root-network 5, hash-rush 2, chives 5, spud-sneakers 4, stuffed-skin 3.
- Damage taken 84, by source: Hot oil 29.7, enemy:sprout-mite 11.4, enemy:ketchup-drop 11.3, boss:the-masher 11.2, enemy:bog-slime 9.1, enemy:compost-maggot 5.4, enemy:aphid 5, Spore vent 1.3.
- Damage dealt 80558, by weapon: pressure-cooker 58196.1, butter-streak 8787, ghee-glide 6265.5, steam-vent 5777.8, grok-bot 1531.6.
- Kills 1963, by weapon: pressure-cooker 1365, butter-streak 219, steam-vent 180, ghee-glide 119, grok-bot 80.
- Bosses killed 3, elites killed 10, boss chests 13, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 813, spent 0.
- Made: pressure-cooker at 03:01, ghee-glide at 03:30.

### L3.I8.G1: s1313 explore 600

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1313; 300s; plays the playbook with exploreDistance 600.
- Outcome: died after 247.2s (game clock 04:07); damage taken 239 (enemy:cave-grub 57.3, enemy:snow-mold 35.2, enemy:potato-beetle 32.9, boss:amusing 31); 610 kills; level 1 to 12; planner asked 75 times, action model 631, in lockstep; ended with steam-vent 6, butter-socks 1, peel-out 3, root-network 3, aged-russet 1.
- Damage taken 239, by source: enemy:cave-grub 57.3, enemy:snow-mold 35.2, enemy:potato-beetle 32.9, boss:amusing 31, enemy:frost-flea 22.1, boss:beetle-queen 16.3, boss:the-masher 11.2, enemy:compost-maggot 11.1; the killing blow: enemy:snow-mold.
- Damage dealt 21101, by weapon: steam-vent 20906.8, grok-bot 194.5.
- Kills 610, by weapon: steam-vent 606, grok-bot 4.
- Bosses killed 0, elites killed 3, boss chests 2, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 113, spent 0.
- Made: no evolution, union or evolved item.

### L3.I8.G2: s1818 explore 600

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1818; 300s; plays the playbook with exploreDistance 600.
- Outcome: alive after 300s (game clock 05:00), health 120/120; damage taken 157 (enemy:potato-beetle 42.4, enemy:cave-grub 37.1, enemy:compost-maggot 25.9, Spore vent 12.4); 2145 kills; level 1 to 18; planner asked 101 times, action model 556, in lockstep; ended with pressure-cooker 1, spud-grid 1, hot-streak 2, root-network 4, butter-pat 2, hearty-helping 1, potato-magnet 1.
- Damage taken 157, by source: enemy:potato-beetle 42.4, enemy:cave-grub 37.1, enemy:compost-maggot 25.9, Spore vent 12.4, enemy:sprout-mite 8.8, boss:beetle-queen 7.7, boss:amusing 6.7, enemy:aphid 4.2.
- Damage dealt 86019, by weapon: pressure-cooker 46732.7, steam-vent 22017.2, potato-battery 5868.6, hot-streak 4633.6, spud-grid 3903.6, grok-bot 2862.9.
- Kills 2145, by weapon: pressure-cooker 1060, steam-vent 697, potato-battery 161, grok-bot 83, spud-grid 73, hot-streak 71.
- Bosses killed 4, elites killed 6, boss chests 10, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 590, spent 0.
- Made: pressure-cooker at 03:21, spud-grid at 04:10.

### L3.I8.G3: s1616 explore 600

- Start: a fresh game on Nightmare 1 with steam-vent, seed 1616; 300s; plays the playbook with exploreDistance 600.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 172 (enemy:oil-drip 29.8, enemy:tomato-leech 26.6, enemy:fry-fly 21.6, enemy:crumb-ant 18.9); 2209 kills; level 1 to 17; planner asked 102 times, action model 480, in lockstep; ended with pressure-cooker 1, mash-landing 8, hash-brown-shield 2, hot-streak 1, big-bowl 5, spud-sneakers 2, peel-out 3, root-network 3, butter-socks 1.
- Damage taken 172, by source: enemy:oil-drip 29.8, enemy:tomato-leech 26.6, enemy:fry-fly 21.6, enemy:crumb-ant 18.9, Hot oil 18.5, enemy:bog-slime 13.6, enemy:garden-slug 10.4, boss:amusing 8.9.
- Damage dealt 79008, by weapon: pressure-cooker 58622.8, steam-vent 16494.9, grok-bot 2669.4, alex 1190.1, hash-brown-shield 31.1.
- Kills 2209, by weapon: pressure-cooker 1449, steam-vent 658, grok-bot 82, alex 19, hash-brown-shield 1.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 742, spent 0.
- Made: pressure-cooker at 03:13.

### L3.I8.G4: s2222 explore 600

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2222; 300s; plays the playbook with exploreDistance 600.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 12 (enemy:cave-grub 3.9, enemy:aphid 3.2, Spore vent 2.1, enemy:crumb-ant 2); 3428 kills; level 1 to 20; planner asked 104 times, action model 115, in lockstep; ended with pressure-cooker 1, small-fry 1, wildfire-roast 1, root-network 5, thick-skin 4, chives 2, masher-grip 3.
- Damage taken 12, by source: enemy:cave-grub 3.9, enemy:aphid 3.2, Spore vent 2.1, enemy:crumb-ant 2, enemy:sprout-mite 1.1.
- Damage dealt 109432, by weapon: wildfire-roast 88023.5, hot-streak 8543, small-fry 7388, steam-vent 3105, pressure-cooker 1926.3, grok-bot 445.8.
- Kills 3428, by weapon: wildfire-roast 2701, hot-streak 415, small-fry 157, pressure-cooker 66, steam-vent 55, grok-bot 34.
- Bosses killed 3, elites killed 6, boss chests 9, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 615, spent 0.
- Made: wildfire-roast at 02:09, pressure-cooker at 04:12.

### L3.I8.G5: s2020 explore 600 repeat

- Start: a fresh game on Nightmare 1 with steam-vent, seed 2020; 300s; plays the playbook with exploreDistance 600.
- Outcome: died after 248.2s (game clock 04:08); damage taken 154 (enemy:potato-beetle 43.2, enemy:field-rat 38.2, enemy:sprout-mite 11.9, enemy:snow-mold 11.7); 230 kills; level 1 to 9; planner asked 70 times, action model 668, in lockstep; ended with steam-vent 3, masher-grip 4, hot-sauce 2.
- Damage taken 154, by source: enemy:potato-beetle 43.2, enemy:field-rat 38.2, enemy:sprout-mite 11.9, enemy:snow-mold 11.7, boss:the-masher 11.2, enemy:aphid 10.7, enemy:oil-drip 9.1, boss:amusing 5.5; the killing blow: boss:the-masher.
- Damage dealt 8629, by weapon: steam-vent 8323.9, grok-bot 305.5.
- Kills 230, by weapon: steam-vent 226, grok-bot 4.
- Bosses killed 0, elites killed 1, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 29, spent 0.
- Made: no evolution, union or evolved item.
