# Does a long explore leg (1000 units) find nests and spots that 300-unit legs miss on live NM2

| Field | Value |
| --- | --- |
| Status | done |
| Area | map |
| Result | inconclusive |
| Created | L8.I9 |
| Updated | L8.I10 |

## Hypothesis

Explore at 300 finds nothing in the first 2 minutes. exploreDistance 1000 covers more ground and may reach elite nests and chest drops sooner. The cost is walking into more pests.

## Method

One live fresh game on seed 5555 with boss knobs and exploreDistance 1000, paired against the boss-knobs-only game on seed 5555. Compare chests, nests found, minute-1 hp loss and survival. One game is a lead only.

## Findings

exploreDistance 1000 with the boss knobs on 5555 died 1:35 with 0 chests, earlier than the paired game (3:44). One game; looks harmful, not pursued. See B151.

## Games

### L8.I9.G5: boss knobs + explore 1000 s5555

- Start: a fresh game on Nightmare 2 with steam-vent, seed 5555; 300s; plays the playbook with bossDashThreshold 0.25, bossDashRange 150, exploreDistance 1000.
- Outcome: died after 95.5s (game clock 01:35); damage taken 153 (enemy:bog-toad 44.9, Hot oil 25.7, enemy:cave-grub 20.8, enemy:sizzle-imp 17.3); 58 kills; level 1 to 4; planner asked 27 times, action model 227; the models saw the game 28 ms late (p90 49); ended with steam-vent 2, spud-lob 1, gravy-heart 1.
- Damage taken 153, by source: enemy:bog-toad 44.9, Hot oil 25.7, enemy:cave-grub 20.8, enemy:sizzle-imp 17.3, enemy:sand-crab 9.4, enemy:fry-fly 7.8, enemy:garden-slug 5.4, enemy:sprout-mite 5.1; the killing blow: enemy:sizzle-imp.
- Damage dealt 2014, by weapon: steam-vent 1259.8, spud-lob 606.8, grok-bot 147.
- Kills 58, by weapon: steam-vent 36, spud-lob 17, grok-bot 5.
- Bosses killed 0, elites killed 0, boss chests 0, crates bought 0, shrines used 0, items bought 0, revives used 0; gold earned 2, spent 0.
- Made: no evolution, union or evolved item.
