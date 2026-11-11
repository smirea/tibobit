# Does dashing (threshold 0.25, boss range 300) help the 15:00 build survive to 20:00?

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | inconclusive |
| Created | L3.I7 |
| Updated | L3.I10 |

## Hypothesis

The 15:00 seeker build (174 hp) died at 18:23 with 0 dashes, to Grease Fiend bursts of 64-122 and Ice Imp/Mud Golem bursts. A low dash threshold with a boss dash range lets it escape the bursts and survive to 20:00.

## Method

Gym seeker-knobs-15min-s31, 300 s, two games with dashThreshold 0.25, bossDashThreshold 0.25 and bossDashRange 300. The control is L2.I9.G5 (died 18:23, 0 dashes), one game only. Read dashes and their health, damage by source, time of death or survival to 20:00. Gym games are leads only.

## Findings

Both games failed to load because the 15:00 checkpoint was saved on an older game build, so nothing was learned about dashing from 15:00 to 20:00. A rebuild feature now exists. Re-test only with a gym built in the same iteration.

## Games

### L3.I7.G4: 15:00 gym dash 0.25 A

- Start: gym seeker-knobs-15min-s31 (Nightmare 1 at 15:01), seed ?; 300s; plays the playbook with dashThreshold 0.25, bossDashThreshold 0.25, bossDashRange 300.
- Outcome: not played: checkpoint failed: checkpoint gym-seeker-knobs-15min-s31 was saved on game build sim-ByUaSHJI.js; this page runs sim-Bxzw-NHo.js.

### L3.I7.G5: 15:00 gym dash 0.25 B

- Start: gym seeker-knobs-15min-s31 (Nightmare 1 at 15:01), seed ?; 300s; plays the playbook with dashThreshold 0.25, bossDashThreshold 0.25, bossDashRange 300.
- Outcome: not played: checkpoint failed: checkpoint gym-seeker-knobs-15min-s31 was saved on game build sim-ByUaSHJI.js; this page runs sim-Bxzw-NHo.js.
