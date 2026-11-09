# Does a lower normal dashThreshold (0.3) with the boss dash knobs cut live NM2 minute 0-1 hp loss

| Field | Value |
| --- | --- |
| Status | running |
| Area | movement |
| Result | - |
| Created | L8.I1 |
| Updated | L8.I3 |

## Hypothesis

At dashThreshold 0.5 the dash fires only at 13-40% hp on single pests (scores 51-58%), after the minute 0-1 chip damage has already taken 80-130 hp. A threshold of 0.3, with bossDashThreshold 0.25 and range 150 (the only arm above baseline, 2 of 5), dashes out of a closing crowd while hp is still high and so reaches 2:00 with more hp and an earlier evolution.

## Method

Five fresh live NM2 steam-vent games of 300s on 1919, 4141, 2121, 1313 and 4444, where the unchanged playbook lived 0 of 5. Change only knobs: dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150. Compare hp at 1:00 and 2:00, dash times and dash scores, chests, first evolution and survival. Confirmed at 4 of 5 alive at 5:00 with an evolution by about 2:30; refuted at 2 or fewer of 5. Check that all charges are not gone before 2:00 and that chests do not starve.

## Findings

L8.I1 and L8.I2 slots 1-3 produced no games (localStorage SecurityError). L8.I3 replays on 1919, 4141 and 2121; 1313 and 4444 follow if budget allows.

## Games

### L8.I1.G1: dash 0.3 + boss knobs s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot1: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I1.G2: dash 0.3 + boss knobs s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot2: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I1.G3: dash 0.3 + boss knobs s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot3: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I1.G4: dash 0.3 + boss knobs s1313

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1313; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot4: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I1.G5: dash 0.3 + boss knobs s4444

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4444; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot5: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I2.G1: dash 0.3 + boss knobs s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot1: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I2.G2: dash 0.3 + boss knobs s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot2: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I2.G3: dash 0.3 + boss knobs s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot3: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I3.G1: dash 0.3 + boss knobs s1919

- Start: a fresh game on Nightmare 2 with steam-vent, seed 1919; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot1: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I3.G2: dash 0.3 + boss knobs s4141

- Start: a fresh game on Nightmare 2 with steam-vent, seed 4141; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot2: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.

### L8.I3.G3: dash 0.3 + boss knobs s2121

- Start: a fresh game on Nightmare 2 with steam-vent, seed 2121; 300s; plays the playbook with dashThreshold 0.3, bossDashThreshold 0.25, bossDashRange 150.
- Outcome: not played: slot3: eval failed: {"error":"evaluate: SecurityError: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.\n    at eval (eval at evaluate (:302:30), <anonymous>:1:167)\n    at eval (<anonymous>)\n    at UtilityScript.evaluate (<anonymous>:302:30)\n    at UtilityScript.<anonymous> (<anonymous>:1:44)"}.
