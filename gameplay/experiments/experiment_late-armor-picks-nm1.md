# Does an armor and dodge first pick prompt help the 15:00-20:00 stretch on Nightmare 1

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | items |
| Result | - |
| Created | sonnet-high L2.I8 |
| Updated | reset at the restart (L4) |

## Hypothesis

Armor and dodge items (Baked Buckler, Ghost Skin, Starch Plating, Thick Skin) were the late lever in item gyms. A planner.pick prompt that ranks them first, while keeping damage passives, makes a natural build take them at chests and crates and lowers damage at 17:00-19:00 compared with the default pick prompt.

## Method

From nm1-min15-natural-b-gold, 300s: baseline playbook twice vs armor/dodge pick prompt, plus one game combining it with the gold rule goal. Compare armor and dodge cards taken, damage by source at 17:00-19:00, minimum hp and survival to 20:00.

## Findings

Reset at the restart: still running from an earlier loop and measured with lockstep on, so its games need replaying live before they count.

## Games

### L2.I8.G4: gold gym plus armor and dodge picks

- Start: gym nm1-min15-natural-b-gold (Nightmare 1 at 15:00), seed 1V0HDWX; 300s; plays the playbook with its own planner.pick.
- Outcome: alive after 300.3s (game clock 20:00), health 244/244; damage taken 314 (boss:ketchup-kraken 280.7, Hot oil 20.8, Brambles 12.3); 41621 kills; level 51 to 69; planner asked 90 times, action model 89, in lockstep; ended with steam-vent 8, clockwork-spud 1, eclipse-scythe 1, hunters-moon 1, mandoline-fury 1, mashquake 1, starch-plating 5, big-bowl 5, four-eyed-spud 5, gravy-heart 5, butter-pat 5, potato-magnet 5.
- Damage taken 314, by source: boss:ketchup-kraken 280.7, Hot oil 20.8, Brambles 12.3.
- Damage dealt 26082466, by weapon: mashquake 19474727, mandoline-fury 2358260, lightning-spud 1658419.2, heavy-russet 962944.1, eclipse-scythe 729104, clockwork-spud 587200.2, hunters-moon 209314.1, steam-vent 73243.2.
- Kills 41621, by weapon: mashquake 31955, mandoline-fury 4062, lightning-spud 2207, eclipse-scythe 1429, clockwork-spud 1251, hunters-moon 449, steam-vent 189, grok-bot 79.
- Bosses killed 2, elites killed 10, boss chests 12, crates bought 2, shrines used 0, items bought 0, revives used 0; gold earned 8345, spent 3456.
- Made: no evolution, union or evolved item.
