# Which starting weapon survives the first 5 minutes best for a walk-only bot

| Field | Value |
| --- | --- |
| Status | running |
| Area | build |
| Result | - |
| Coach | sonnet-high |
| Created | sonnet-high L1.I1 |
| Updated | sonnet-high L1.I1 |

## Hypothesis

Weapons that need no aiming (steam-vent aura, potato-rain) survive the first 5 minutes on Nightmare 1 better than facing or targeted shots, because the bot steers by goals and not by enemy position.

## Method

Four fresh Nightmare 1 games on seed 101 with the default playbook, 300s each, differing only in the starting weapon: fry-knives, potato-rain, steam-vent, tot-toss. Compare survival, health trend, level reached and which cards the planner takes.

## Findings

(none yet)

## Games

### L1.I1.G1: fry-knives baseline

- Start: a fresh game on Nightmare 1 with fry-knives, seed 101; 300s; plays the playbook.
- Outcome: died after 154.1s (game clock 02:34); damage taken 121 (enemy:frost-flea 42.2, enemy:aphid 26.5, enemy:sprout-mite 14.8, enemy:potato-beetle 13.7); 417 kills; level 1 to 8; ended with fry-knives 1, seed-potato 2, julienne-dash 3, harvest-moon 1, butter-socks 1.

### L1.I1.G2: potato-rain

- Start: a fresh game on Nightmare 1 with potato-rain, seed 101; 300s; plays the playbook.
- Outcome: not played: start failed: starting weapon potato-rain is not offered; offered: deep-fryer, frozen-fries, fry-knives, fry-lance, fry-sentry, gravy-boat, peeler, root-spikes, rosti-disc, seeker-sprouts, sprout-satellites, spud-cannon, spud-lob, starch-bolt, steam-vent, tater-pup, tot-toss.

### L1.I1.G3: steam-vent

- Start: a fresh game on Nightmare 1 with steam-vent, seed 101; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 120/120; damage taken 164 (enemy:spittlebug 46.3, boss:amusing 36.6, enemy:aphid 27.5, boss:the-masher 22.4); 2846 kills; level 1 to 19; ended with steam-vent 1, tater-twirl 1, eclipse-scythe 1, julienne-dash 6, broadside 1, locked-gatling 1, lean-lunch 1, big-bowl 4.

### L1.I1.G4: tot-toss

- Start: a fresh game on Nightmare 1 with tot-toss, seed 101; 300s; plays the playbook.
- Outcome: died after 294.1s (game clock 04:54); damage taken 354 (enemy:field-crow 61.4, enemy:fry-fly 46.7, boss:beetle-queen 39.6, boss:the-masher 33.6); 2204 kills; level 1 to 15; ended with tot-toss 1, mash-landing 8, mash-snowball 4, potato-battery 1, hash-brown-shield 1, reset-button 3, masher-grip 1, chives 1.

### L1.I1.G1: fry-knives baseline

- Start: a fresh game on Nightmare 1 with fry-knives, seed 101; 300s; plays the playbook.
- Outcome: not played: sonnet-high-slot1: eval failed: {"error":"evaluate: Target page, context or browser has been closed"}.

### L1.I1.G2: potato-rain

- Start: a fresh game on Nightmare 1 with potato-rain, seed 101; 300s; plays the playbook.
- Outcome: not played: sonnet-high-slot2: eval failed: {"error":"evaluate: Target page, context or browser has been closed"}.

### L1.I1.G3: steam-vent aura

- Start: a fresh game on Nightmare 1 with steam-vent, seed 101; 300s; plays the playbook.
- Outcome: not played: sonnet-high-slot3: eval failed: {"error":"evaluate: Target page, context or browser has been closed"}.

### L1.I1.G4: tot-toss

- Start: a fresh game on Nightmare 1 with tot-toss, seed 101; 300s; plays the playbook.
- Outcome: not played: sonnet-high-slot4: eval failed: {"error":"evaluate: Target page, context or browser has been closed"}.

### L1.I2.G1: steam-vent NM1 seed 202 repeat

- Start: a fresh game on Nightmare 1 with steam-vent, seed 202; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 163/163; damage taken 90 (enemy:potato-beetle 51.8, boss:amusing 18.8, boss:beetle-queen 9.1, Hot oil 7.7); 2805 kills; level 1 to 17; ended with steam-vent 1, root-cellar 2, eclipse-scythe 1, peeler 1, tot-toss 1, gem-sling 1, big-bowl 2, gravy-heart 3.
- Damage taken 90, by source: enemy:potato-beetle 51.8, boss:amusing 18.8, boss:beetle-queen 9.1, Hot oil 7.7, enemy:lint-bunny 1.3, Brambles 0.9.
- Damage dealt 92369, by weapon: eclipse-scythe 61329.3, gem-sling 14566.9, comet-scythe 6541.9, root-cellar 4183.3, tot-toss 3185.6, peeler 1594.3, steam-vent 842.1, grok-bot 125.3.
- Kills 2805, by weapon: eclipse-scythe 1907, comet-scythe 399, gem-sling 270, tot-toss 85, steam-vent 47, peeler 47, root-cellar 44, grok-bot 6.
- Bosses killed 3, elites killed 4, boss chests 3, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 317, spent 0.
- Made: [object Object].
