# Does swapping in Hot Streak plus Thick Skin from 0:00 carry the live NM2 seeds that die (1919, 4141) past 5:00

| Field | Value |
| --- | --- |
| Status | done |
| Area | build |
| Result | confirmed |
| Created | L4.I3 |
| Updated | L4.I4 |

## Hypothesis

Hot Streak with Thick Skin evolves to Wildfire Roast by about 2:00 and was the build in every live survivor with an early evolution. Starting with Hot Streak 1 and Thick Skin 1 on the two seeds that kill the playbook should get them past 5:00.

## Method

L4.I3: fresh live NM2 steam-vent seeds 1919 and 4141, loadout steam-vent 1 + hot-streak 1 + thick-skin 1 at full hp, 300s, playbook unchanged. Compare with controls (1919 died 2:30, 4141 died 3:06) and armor games (died 4:04 and 3:58): evolution time, chests by 4:00, damage and survival at 5:00. If it lives both, test a natural pick prompt that takes Hot Streak and Thick Skin on 5 or more seeds.

## Findings

L4.I3: Hot Streak 1 + Thick Skin 1 from 0:00 lived 2 of 2 on 1919 and 4141 (Wildfire Roast 1:09 and 1:41, 18 chests each, 61 and 71 damage, 0 dashes). The controls died at 2:30 and 3:06. The question 'does early power carry the dying seeds' is answered yes. Hot Streak is not a startable weapon, so nm2-start-weapon-live looks for a startable weapon with the same early damage.

## Games

### L4.I3.G3: hot-streak loadout s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919, build swapped for steam-vent 1, hot-streak 1, thick-skin 1; 300s; plays the playbook.
- Outcome: alive after 300.1s (game clock 05:00), health 109/120; damage taken 61 (boss:the-masher 32.8, enemy:wireworm-larva 18.7, Brambles 5.8, Hot oil 3.2); 2961 kills; level 1 to 18; planner asked 130 times, action model 126; the models saw the game 29 ms late (p90 52); ended with steam-vent 1, wildfire-roast 1, tater-twister 1, spudzooka 1, potato-rain 2, hash-boomerang 4, thick-skin 1, sprouting-eyes 2, packed-pan 1, salt-shaker 1, root-network 2, hot-sauce 1.
- Damage taken 61, by source: boss:the-masher 32.8, enemy:wireworm-larva 18.7, Brambles 5.8, Hot oil 3.2.
- Damage dealt 140202, by weapon: wildfire-roast 76529.2, spudzooka 19590.7, tater-twister 18492.5, spud-cannon 11353.5, hash-boomerang 7694.9, hot-streak 2385.4, potato-rain 2306.7, tater-twirl 1769.2.
- Kills 2961, by weapon: wildfire-roast 1845, spudzooka 408, spud-cannon 267, tater-twister 219, hot-streak 96, potato-rain 50, hash-boomerang 46, tater-twirl 29.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 1064, spent 0.
- Made: wildfire-roast at 01:09, tater-twister at 03:10, spudzooka at 04:09.

### L4.I3.G4: hot-streak loadout s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141, build swapped for steam-vent 1, hot-streak 1, thick-skin 1; 300s; plays the playbook.
- Outcome: alive after 300.2s (game clock 05:00), health 164/164; damage taken 71 (enemy:spittlebug 28.3, enemy:little-grey 16.3, boss:beetle-queen 7.3, enemy:potato-beetle 6.3); 4260 kills; level 1 to 19; planner asked 136 times, action model 168; the models saw the game 29 ms late (p90 51); ended with grease-fire 1, gravy-pack 1, hash-bulwark 1, fry-sentry 3, thick-skin 2, gravy-heart 2, mash-finisher 1, starch-plating 2, root-network 2.
- Damage taken 71, by source: enemy:spittlebug 28.3, enemy:little-grey 16.3, boss:beetle-queen 7.3, enemy:potato-beetle 6.3, enemy:frost-flea 4.7, enemy:sprout-mite 3.1, Spore vent 2.9, enemy:aphid 1.6.
- Damage dealt 179174, by weapon: grease-fire 109678.5, wildfire-roast 26005.7, gravy-pack 23547.5, tater-pup 7117, hot-streak 5252.2, grok-bot 3619.4, fry-sentry 1750.7, hash-brown-shield 1579.2.
- Kills 4260, by weapon: grease-fire 2354, wildfire-roast 706, gravy-pack 487, tater-pup 252, hot-streak 246, grok-bot 131, hash-brown-shield 52, fry-sentry 20.
- Bosses killed 9, elites killed 9, boss chests 18, crates bought 1, shrines used 0, items bought 0, revives used 0; gold earned 1280, spent 30.
- Made: wildfire-roast at 01:41, gravy-pack at 03:10, pressure-cooker at 03:18, hash-bulwark at 04:27, grease-fire at 03:18.
