# Does a narrow boss-hit dash prompt save the bot from the 16:00 Grater Golem on Nightmare 2

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | movement |
| Result | - |
| Created | sonnet-high L3.I3 |
| Updated | reset at the restart (L4) |

## Hypothesis

A dash prompt that says yes only when a boss just hit hard or is charging in close, unlike the refuted permissive prompt, uses a dash charge against the Golem charge and lowers boss burst damage without wasting charges on pests.

## Method

From nm2-min15-natural, 300s: two games with the narrow prompt against the unchanged baseline games. Compare dashes, Grater Golem damage, minimum hp and survival to 20:00.

## Findings

Reset at the restart: still running from an earlier loop and measured with lockstep on, so its games need replaying live before they count.

## Games

### L3.I3.G3: min15 boss-hit dash A

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3; 300s; plays the playbook with its own action.dash.
- Outcome: alive after 300.1s (game clock 20:00), health 208/286; damage taken 1991 (enemy:grease-fiend 907.4, enemy:mud-golem 370.6, boss:ketchup-kraken 214.2, enemy:ice-imp 204.4); 44471 kills; level 50 to 70; planner asked 94 times, action model 742, in lockstep; ended with pressure-cooker 1, hash-harrier 1, spicy-hot-potato 1, hashnado 1, mandoline-fury 1, waffle-cut 1, root-network 5, hot-sauce 5, bacon-bits 5, gravy-heart 5, sour-cream 5, butter-socks 5.
- Damage taken 1991, by source: enemy:grease-fiend 907.4, enemy:mud-golem 370.6, boss:ketchup-kraken 214.2, enemy:ice-imp 204.4, enemy:field-rat 164.4, boss:compost-titan 69.4, enemy:blight-spore 40.5, Hot oil 12.
- Damage dealt 28323290, by weapon: bonfire-spud 7679264.7, hashnado 5173064.5, pressure-cooker 4303998, mandoline-fury 3233586.3, hash-harrier 2993678, spicy-hot-potato 2904279.5, waffle-cut 1415478.6, boom-spud 596808.2.
- Kills 44471, by weapon: bonfire-spud 10221, pressure-cooker 9101, mandoline-fury 6483, spicy-hot-potato 6059, hashnado 5271, waffle-cut 3149, hash-harrier 3055, boom-spud 1077.
- Bosses killed 9, elites killed 12, boss chests 18, crates bought 4, shrines used 0, items bought 0, revives used 0; gold earned 10398, spent 1805.
- Made: no evolution, union or evolved item.

### L3.I3.G4: min15 boss-hit dash B

- Start: gym nm2-min15-natural (Nightmare 2 at 15:00), seed LFNRB3; 300s; plays the playbook with its own action.dash.
- Outcome: died after 183.2s (game clock 18:03); damage taken 805 (enemy:grease-fiend 338.2, boss:ketchup-kraken 321.3, enemy:field-rat 57.5, boss:compost-titan 34.7); 25870 kills; level 50 to 61; planner asked 62 times, action model 425, in lockstep; ended with pressure-cooker 1, hash-harrier 1, spicy-hot-potato 1, hashnado 1, mandoline-fury 1, waffle-cut 1, root-network 5, hot-sauce 5, bacon-bits 5, gravy-heart 5, sour-cream 5, butter-socks 5.
- Damage taken 805, by source: enemy:grease-fiend 338.2, boss:ketchup-kraken 321.3, enemy:field-rat 57.5, boss:compost-titan 34.7, Hot oil 28.3, enemy:ice-imp 24.5; the killing blow: boss:ketchup-kraken.
- Damage dealt 13184301, by weapon: bonfire-spud 3964098.3, hashnado 2493881.2, pressure-cooker 1788904.5, spicy-hot-potato 1615346.4, mandoline-fury 1436702.7, hash-harrier 1416713, waffle-cut 426211.2, grok-bot 34817.2.
- Kills 25870, by weapon: bonfire-spud 7383, pressure-cooker 4558, spicy-hot-potato 3830, mandoline-fury 3699, hashnado 3251, hash-harrier 1695, waffle-cut 1336, grok-bot 86.
- Bosses killed 6, elites killed 9, boss chests 15, crates bought 3, shrines used 1, items bought 0, revives used 0; gold earned 6045, spent 980.
- Made: no evolution, union or evolved item.
