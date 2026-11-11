# Does a defense-first passive pick text after the first evolution raise max HP and armor and cut health lost 4:00-8:00?

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | models |
| Result | - |
| Created | L6.I5 |
| Updated | L6.I10 |

## Hypothesis

After the first evolution the default planner.pick spends passive picks on utility passives (Peel Out, Slow Cooker, Big Bowl), so max HP and armor stay near 134 and 12. A pick text that takes Max HP, Armor, Recovery, Gravy Heart or Stuffed Skin before a utility passive already at level 3 or more raises max HP and armor by 8:00 and lowers health lost per minute 4:00-8:00, without cutting damage output much.

## Method

Gym playbook-nm1-240s (fresh seeker-sprouts built by the playbook to 4:00 this iteration), 240 s games to 8:00. 5 control games with the playbook against 5 with the defense-passives planner.pick. Metrics chosen first: max HP and armor at 8:00 (mean and spread), health lost per minute 4:00-8:00, alive at 8:00. Manipulation check: picks lines show Max HP, Armor, Recovery, Gravy Heart or Stuffed Skin taken over Peel Out, Slow Cooker, Big Bowl or Lean Lunch after the evolution. Gym games stay a lead; any gain would need fresh-seed confirmation from 0:00 on 10 paired seeds.

## Findings

L6.I5-I9 played nothing (gym builds failed, then fresh games failed to start, seeded or not). The question stays open. Redo from 0:00 on fresh seeds s41-50, 300 s, both arms played now, only when games start.

## Games

### L6.I5.G1: control 1

- Start: gym playbook-nm1-240s (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook.
- Outcome: not played: gym playbook-nm1-240s is failed.

### L6.I5.G2: control 2

- Start: gym playbook-nm1-240s (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook.
- Outcome: not played: gym playbook-nm1-240s is failed.

### L6.I5.G3: control 3

- Start: gym playbook-nm1-240s (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook.
- Outcome: not played: gym playbook-nm1-240s is failed.

### L6.I5.G4: control 4

- Start: gym playbook-nm1-240s (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook.
- Outcome: not played: gym playbook-nm1-240s is failed.

### L6.I5.G5: control 5

- Start: gym playbook-nm1-240s (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook.
- Outcome: not played: gym playbook-nm1-240s is failed.

### L6.I5.G6: defense passives 1

- Start: gym playbook-nm1-240s (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: gym playbook-nm1-240s is failed.

### L6.I5.G7: defense passives 2

- Start: gym playbook-nm1-240s (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: gym playbook-nm1-240s is failed.

### L6.I5.G8: defense passives 3

- Start: gym playbook-nm1-240s (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: gym playbook-nm1-240s is failed.

### L6.I5.G9: defense passives 4

- Start: gym playbook-nm1-240s (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: gym playbook-nm1-240s is failed.

### L6.I5.G10: defense passives 5

- Start: gym playbook-nm1-240s (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: gym playbook-nm1-240s is failed.

### L6.I6.G1: control 1

- Start: gym playbook-nm1-240s-b (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook.
- Outcome: not played: gym playbook-nm1-240s-b is failed.

### L6.I6.G2: control 2

- Start: gym playbook-nm1-240s-b (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook.
- Outcome: not played: gym playbook-nm1-240s-b is failed.

### L6.I6.G3: control 3

- Start: gym playbook-nm1-240s-b (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook.
- Outcome: not played: gym playbook-nm1-240s-b is failed.

### L6.I6.G4: defense picks 1

- Start: gym playbook-nm1-240s-b (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: gym playbook-nm1-240s-b is failed.

### L6.I6.G5: defense picks 2

- Start: gym playbook-nm1-240s-b (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: gym playbook-nm1-240s-b is failed.

### L6.I6.G6: defense picks 3

- Start: gym playbook-nm1-240s-b (Nightmare 1 at 04:00), seed ?; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: gym playbook-nm1-240s-b is failed.

### L6.I6.G7: fresh defense picks s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: start failed: the openWorld screen did not open.

### L6.I6.G8: fresh defense picks s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: start failed: the openWorld screen did not open.

### L6.I6.G9: fresh defense picks s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: start failed: the openWorld screen did not open.

### L6.I7.G1: defense passives s41

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 41; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 41 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L6.I7.G2: defense passives s42

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 42; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 42 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L6.I7.G3: defense passives s43

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 43; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 43 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L6.I7.G4: defense passives s44

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 44; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 44 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L6.I7.G5: defense passives s45

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 45; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 45 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L6.I7.G6: defense passives s46

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 46; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 46 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I7.G7: defense passives s47

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 47; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 47 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I7.G8: defense passives s48

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 48; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 48 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I7.G9: defense passives s49

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 49; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: loadout failed: the game's content is not loaded yet.

### L6.I7.G10: defense passives s50

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 50; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: loadout failed: the game's content is not loaded yet.

### L6.I8.G1: defense passives s41

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 41; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 41 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I8.G2: defense passives s42

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 42; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 42 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I8.G3: defense passives s43

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 43; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 43 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I8.G4: defense passives s44

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 44; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 44 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I8.G5: defense passives s45

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 45; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 45 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I8.G6: defense passives s46

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 46; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 46 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I8.G7: defense passives s47

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 47; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 47 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L6.I8.G8: defense passives s48

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 48; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 48 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L6.I8.G9: defense passives s49

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 49; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 49 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I8.G10: defense passives s50

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 50; 240s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 50 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I9.G1: defense passives s41

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 41; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: loadout failed: the game's content is not loaded yet.

### L6.I9.G2: defense passives s42

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 42; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 42 twice: start unknown: the game has not reported this command yet, then the game rolled nothing.

### L6.I9.G3: defense passives s43

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 43; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 43 twice: start unknown: the game has not reported this command yet, then the game rolled nothing.

### L6.I9.G4: defense passives s44

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 44; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 44 twice: start unknown: the game has not reported this command yet, then the game rolled nothing.

### L6.I9.G5: defense passives unseeded A

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 65QL6M; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: loadout failed: the game's content is not loaded yet.

### L6.I9.G6: defense passives unseeded B

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 1E1Z9VX; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 1E1Z9VX twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I9.G7: defense passives unseeded C

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 156KIX8; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 156KIX8 twice: the game rolled seed nothing, then the game rolled nothing.

### L6.I9.G8: defense passives unseeded D

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 1TGDLMU; 300s; plays the playbook with its own planner.pick.
- Outcome: not played: asked for seed 1TGDLMU twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.
