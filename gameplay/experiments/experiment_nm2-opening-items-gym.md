# Do defensive items (Baked Buckler, Ghost Skin, Spud Muffin) cut live NM2 damage through the 2:00 Mascot window

| Field | Value |
| --- | --- |
| Status | done |
| Area | items |
| Result | inconclusive |
| Created | L8.I4 |
| Updated | L8.I10 |

## Hypothesis

Armor, dodge and max hp items held at 1:45 reduce damage from pest chip and the Festival Mascot, so the bot reaches 3:45 with more hp than the unchanged playbook from the same live gym state. Items carried the late NM1 gyms, but no live NM2 opening has tested them. Early Starch Plating 2 (a passive) lengthened life but did not save the run.

## Method

From nm2-live-pre-mascot-b, 120 s, same weapons and passives: one game with 2 Baked Buckler, 2 Ghost Skin and 2 Spud Muffin at full hp, against the unchanged-playbook control game (nm2-mascot-gym-boss-dash). Compare alive at 3:45, damage by source, amusing damage, dashes and hp. One game per arm is a lead only; repeat before concluding.

## Findings

From the live pre-Mascot gym defensive items took 17 damage and the unchanged control 27, both alive at 3:45 (144/144 vs 133/134). The gym is too easy to separate the arms. See B149.

## Games

### L8.I4.G4: pre-mascot gym + defensive items

- Start: gym nm2-live-pre-mascot-b (Nightmare 2 at 01:45), seed 3HM36M, build swapped for steam-vent 1, spud-dice 7, potato-battery 1, tater-twirl 2, sprouting-eyes 1, four-eyed-spud 1, baked-buckler x2, ghost-skin x2, spud-muffin x2; 120s; plays the playbook.
- Outcome: alive after 120.2s (game clock 03:45), health 144/144; damage taken 17 (boss:beetle-queen 11.6, boss:amusing 5.6); 1388 kills; level 8 to 13; planner asked 48 times, action model 91; the models saw the game 33 ms late (p90 73); ended with steam-vent 1, loaded-dice 1, potato-battery 4, tater-twister 1, sprouting-eyes 1, four-eyed-spud 3, salt-shaker 1, root-network 1.
- Damage taken 17, by source: boss:beetle-queen 11.6, boss:amusing 5.6.
- Damage dealt 34931, by weapon: loaded-dice 21812.1, potato-battery 5554.6, spud-dice 3832.9, tater-twister 1934.6, tater-twirl 1660.9, grok-bot 105.4, steam-vent 30.
- Kills 1388, by weapon: loaded-dice 861, potato-battery 226, spud-dice 142, tater-twister 88, tater-twirl 65, grok-bot 6.
- Bosses killed 6, elites killed 3, boss chests 9, crates bought 0, shrines used 2, items bought 0, revives used 0; gold earned 544, spent 0.
- Made: loaded-dice at 02:23, tater-twister at 03:08.
