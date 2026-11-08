# Does avoiding on-dash weapons free level-ups and a slot for stronger picks

| Field | Value |
| --- | --- |
| Status | running |
| Area | models |
| Result | - |
| Coach | sonnet-high |
| Created | sonnet-high L2.I10 |
| Updated | sonnet-high L3.I2 |

## Hypothesis

A planner.pick prompt that avoids Mash Landing, Peel Phantom, Julienne Dash, Afterburner Fries and Butter Streak gives more levels on the evolving weapons, since the bot dashes about twice a run.

## Method

From nm2-min5-fresh and nm2-min10-natural, 300s each: default picks vs the avoid-dash prompt, two games each. Compare weapons held, evolutions, level-ups spent on dash weapons and damage.

## Findings

L3.I1.G1 (seed 3131 baseline) took Mash Landing to 7/8 by 5:00 and dashed 0 times. L3.I2 tests an avoid-on-dash prompt on seeds 3131 and 3333, one game each, with a baseline on 3333.

## Games

(none played yet)
