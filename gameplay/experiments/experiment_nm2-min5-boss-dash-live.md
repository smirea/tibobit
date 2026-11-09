# Do the boss dash knobs save charges for the 6:00-8:00 bosses and lower damage on the live NM2 5:00 gym

| Field | Value |
| --- | --- |
| Status | done |
| Area | bosses |
| Result | refuted |
| Created | L8.I7 |
| Updated | L8.I8 |

## Hypothesis

The unchanged playbook uses 0 dashes against Late Blight, Sir Strawman and Fryer King and dies at 7:06-8:04 from hp 138. bossDashThreshold 0.25 with bossDashRange 200 spends dash charges on the boss attacks, which lowers boss damage and gets the bot to 10:00 more often.

## Method

From nm2-live-min5, 300s, two games with bossDashThreshold 0.25 and bossDashRange 200 against the two existing controls (died 8:04 and 7:06). Compare alive at 10:00, boss damage, dashes spent near bosses against dashes at no boss, and minimum hp. Two games is a lead only.

## Findings

L8.I7: bossDashThreshold 0.25 with range 200 died 6:09 and 6:53 from the live 5:00 gym, no better than controls (8:04, 7:06). Dashes went to pests at 30% hp. See B144.

## Games

### L8.I7.G1: min5 boss dash knobs A

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with bossDashThreshold 0.25, bossDashRange 200.
- Outcome: died after 68.7s (game clock 06:09); damage taken 171 (enemy:sizzle-imp 94.8, boss:late-blight 27.8, enemy:field-crow 20.3, enemy:reset-zombie 19.8); 2466 kills; level 18 to 23; planner asked 32 times, action model 48; the models saw the game 32 ms late (p90 87); ended with steam-vent 4, gem-sling 1, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, broadside 8, gravy-splash 1, sour-cream 5, root-network 1, hot-sauce 1, masher-grip 1.
- Damage taken 171, by source: enemy:sizzle-imp 94.8, boss:late-blight 27.8, enemy:field-crow 20.3, enemy:reset-zombie 19.8, enemy:bowling-ball 8; the killing blow: enemy:sizzle-imp.
- Damage dealt 118254, by weapon: spicy-hot-potato 79306.1, hashnado 21404.9, mash-avalanche 12024.3, broadside 2515.1, gem-sling 1443.6, grok-bot 1254.6, steam-vent 299.8, gravy-splash 5.2.
- Kills 2466, by weapon: spicy-hot-potato 1779, hashnado 503, mash-avalanche 95, grok-bot 39, broadside 26, gem-sling 20, steam-vent 2, gravy-splash 2.
- Bosses killed 1, elites killed 6, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 347, spent 0.
- Made: no evolution, union or evolved item.

### L8.I7.G2: min5 boss dash knobs B

- Start: gym nm2-live-min5 (Nightmare 2 at 05:00), seed NG08BZ; 300s; plays the playbook with bossDashThreshold 0.25, bossDashRange 200.
- Outcome: died after 113.6s (game clock 06:53); damage taken 223 (boss:late-blight 85.4, boss:sir-strawman 64.3, enemy:field-crow 38.7, enemy:sizzle-imp 27.3); 4461 kills; level 18 to 26; planner asked 52 times, action model 175; the models saw the game 30 ms late (p90 73); ended with pressure-cooker 1, gem-sling 1, spicy-hot-potato 1, mash-avalanche 1, hashnado 1, full-broadside 1, gravy-splash 3, sour-cream 3, root-network 1, hot-sauce 1, masher-grip 4, butter-pat 1.
- Damage taken 223, by source: boss:late-blight 85.4, boss:sir-strawman 64.3, enemy:field-crow 38.7, enemy:sizzle-imp 27.3, enemy:blight-spore 7.3; the killing blow: boss:sir-strawman.
- Damage dealt 219198, by weapon: spicy-hot-potato 142336.3, hashnado 43548.6, pressure-cooker 9858.7, full-broadside 9691.5, mash-avalanche 8508.2, gem-sling 4158.9, grok-bot 958.3, steam-vent 62.4.
- Kills 4461, by weapon: spicy-hot-potato 3327, hashnado 855, pressure-cooker 88, mash-avalanche 71, gem-sling 65, full-broadside 35, grok-bot 16, broadside 4.
- Bosses killed 5, elites killed 9, boss chests 6, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 880, spent 0.
- Made: full-broadside at 05:22, pressure-cooker at 05:38.
