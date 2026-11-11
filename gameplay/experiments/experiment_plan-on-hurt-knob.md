# Does asking the planner at once when hurt (planOnHurt 0.1) cut opening bursts and raise 4:00 survival?

| Field | Value |
| --- | --- |
| Status | done |
| Area | movement |
| Result | inconclusive |
| Created | L7.I2 |
| Updated | L7.I10 |

## Hypothesis

Goals are re-rated only every 5 s, so a stand-still goal can run through a 40 hp burst. planOnHurt 0.1 asks the planner within about 3 s of losing 10% of max HP, so a hold goal can be swapped for evade, chest or food sooner. This should cut bursts of 40+ hp and raise survival at 4:00. Unlike the keep-away text with planEvery 2 (B98), prompts and planEvery stay at the playbook, so chest goals are not dropped constantly.

## Method

Fresh seeker-sprouts from 0:00 on s31-40, 240 s, playbook plus planOnHurt 0.1, paired with the 10 playbook games already on file (6 of 10 alive at 4:00). Metrics chosen first: alive at 4:00, bursts of 40+ hp in 5 s, health lost 1:00-2:30, chests opened (run.bossChests). Manipulation check: planner calls with the reason 'Tibo lost N health in the last 3 seconds' and a goal change within about 3 s of damage of 10% or more. If none appear, the arm tested nothing. Adopt only on 8 or more of 10 alive with a net of 3 or more paired wins, then confirm on fresh seeds.

## Findings

All 10 L7.I2 games failed at start. planOnHurt 0.1 was never played, so there is no result and no manipulation check. The knob exists (B102) and can be re-proposed when games start.

## Games

### L7.I2.G1: planOnHurt 0.1 s31

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 31; 240s; plays the playbook with planOnHurt 0.1.
- Outcome: not played: asked for seed 31 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L7.I2.G2: planOnHurt 0.1 s32

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 32; 240s; plays the playbook with planOnHurt 0.1.
- Outcome: not played: asked for seed 32 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L7.I2.G3: planOnHurt 0.1 s33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 240s; plays the playbook with planOnHurt 0.1.
- Outcome: not played: asked for seed 33 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L7.I2.G4: planOnHurt 0.1 s34

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 34; 240s; plays the playbook with planOnHurt 0.1.
- Outcome: not played: loadout failed: the game's content is not loaded yet.

### L7.I2.G5: planOnHurt 0.1 s35

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 35; 240s; plays the playbook with planOnHurt 0.1.
- Outcome: not played: asked for seed 35 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L7.I2.G6: planOnHurt 0.1 s36

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 36; 240s; plays the playbook with planOnHurt 0.1.
- Outcome: not played: asked for seed 36 twice: the game rolled seed nothing, then the game rolled nothing.

### L7.I2.G7: planOnHurt 0.1 s37

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 37; 240s; plays the playbook with planOnHurt 0.1.
- Outcome: not played: asked for seed 37 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L7.I2.G8: planOnHurt 0.1 s38

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 38; 240s; plays the playbook with planOnHurt 0.1.
- Outcome: not played: asked for seed 38 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L7.I2.G9: planOnHurt 0.1 s39

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 39; 240s; plays the playbook with planOnHurt 0.1.
- Outcome: not played: asked for seed 39 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.

### L7.I2.G10: planOnHurt 0.1 s40

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 40; 240s; plays the playbook with planOnHurt 0.1.
- Outcome: not played: asked for seed 40 twice: loadout failed: the game's content is not loaded yet, then the game rolled nothing.
