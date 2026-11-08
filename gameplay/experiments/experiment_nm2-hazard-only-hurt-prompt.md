# Does a hurt prompt that names only ground hazards cut live NM2 early damage

| Field | Value |
| --- | --- |
| Status | done |
| Area | hazards |
| Result | inconclusive |
| Created | L4.I6 |
| Updated | L4.I7 |

## Hypothesis

Spore vents, hot oil, brambles, chill and mash are rated as cheap by the one-second forecast but cost hp each second Tibo stands in them. A hurt prompt naming only ground hazards lowers hazard damage and minute-1 losses on live NM2 seed 1919 without changing anything else.

## Method

Fresh live NM2 Steam Vent seed 1919, 300 s, only action.hurt changed. Compare hazard damage (Spore vent, Hot oil, Brambles), minute-1 hp lost and survival against the full tanks-chargers-hazards prompt and the 1919 controls (died 2:30, 2:35). One game is a lead.

## Findings

L4.I6.G5: the hazards-only hurt prompt died at 2:01 on s1919 (108 hp lost in minute 1, 13 dashes, 1 chest). One game, no benefit seen; the full prompt that also names tanks and chargers is the one carried forward.

## Games

### L4.I6.G5: hazards-only hurt prompt s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with its own action.hurt.
- Outcome: died after 121.5s (game clock 02:01); damage taken 142 (enemy:potato-beetle 54.9, enemy:sand-crab 19, enemy:wireworm-larva 18.7, enemy:aphid 10.5); 282 kills; level 1 to 9; planner asked 49 times, action model 364; the models saw the game 27 ms late (p90 48); ended with steam-vent 1, julienne-dash 4, spud-decoy 1, fry-knives 1, peel-out 3, root-network 1, butter-socks 1.
- Damage taken 142, by source: enemy:potato-beetle 54.9, enemy:sand-crab 19, enemy:wireworm-larva 18.7, enemy:aphid 10.5, enemy:sprout-mite 9.2, enemy:snow-mold 8.8, enemy:compost-maggot 8.4, enemy:frost-flea 7.6; the killing blow: enemy:sand-crab.
- Damage dealt 7703, by weapon: spud-decoy 2824.7, julienne-dash 2448.5, steam-vent 1549.8, fry-knives 880.
- Kills 282, by weapon: spud-decoy 120, julienne-dash 96, steam-vent 43, fry-knives 23.
- Bosses killed 0, elites killed 3, boss chests 1, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 145, spent 0.
- Made: no evolution, union or evolved item.
