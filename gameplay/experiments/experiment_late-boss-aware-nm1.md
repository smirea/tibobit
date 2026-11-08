# Does a boss and crowd aware goal prompt survive 17:00-20:00 on Nightmare 1

| Field | Value |
| --- | --- |
| Status | running |
| Area | bosses |
| Result | - |
| Coach | sonnet-medium |
| Created | sonnet-medium L2.I1 |
| Updated | sonnet-high L1.I10 |

## Hypothesis

A planner.goal prompt that rates evading and leaving highest when a boss is within about 300 units or the crowd is thick, even above half health, and drops chest and nest goals then, cuts damage in the Titan and Kraken windows compared with chest-first alone.

## Method

From nm1-min16-natural-b (16:40), 300s: chest-first baseline vs boss-aware goal, two repeats each. Compare damage by source, minimum hp, goals dropped and survival to 20:00.

## Findings

L1.I10 full run died with chests and a Beetle Nest still being chased 130-290 units from the Titan and Kraken (17:00-18:28), which is the lead for this test.

## Games

### L2.I1.G1: titan baseline

- Start: gym nm1-min16-titan (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook.
- Outcome: not played: gym nm1-min16-titan is failed.

### L2.I1.G2: titan boss-aware goal

- Start: gym nm1-min16-titan (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook with its own planner.goal.
- Outcome: not played: gym nm1-min16-titan is failed.

### L2.I1.G5: min15 goal plus picks 15-20

- Start: gym nm1-min15-late (Nightmare 1 at 15:00), seed ?; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: not played: gym nm1-min15-late is failed.

### L2.I2.G1: titan baseline

- Start: gym nm1-min16-titan-b (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook.
- Outcome: not played: gym nm1-min16-titan-b is failed.

### L2.I2.G2: titan boss-aware goal

- Start: gym nm1-min16-titan-b (Nightmare 1 at 16:40), seed ?; 300s; plays the playbook with its own planner.goal.
- Outcome: not played: gym nm1-min16-titan-b is failed.

### L2.I2.G5: min15 goal plus picks 15-20

- Start: gym nm1-min15-late-b (Nightmare 1 at 15:00), seed ?; 300s; plays the playbook with its own planner.goal, its own planner.pick.
- Outcome: not played: gym nm1-min15-late-b is failed.
