# Does withholding food and crate goals near a boss cut health lost at the 10:00 Great Wireworm?

| Field | Value |
| --- | --- |
| Status | proposed |
| Area | bosses |
| Result | - |
| Created | L5.I10 |
| Updated | L5.I10 |

## Hypothesis

The default planner picks 'Eat the food' at 90% health with a boss within 200, walking Tibo into it. A planner.goal rule that rates food and crate goals low while a boss is within 300 and health is above 60% cuts health lost in the first 30 s of a boss arrival.

## Method

Build a gym in the same iteration from a thin playbook build at about 9:30 (stages of 5 minutes, up to 3 replays), then play 3 or more games per arm for 120 s: playbook against the rule. Metric: health lost 10:00-10:30, survival to 11:00. A lead only; confirm with more games before any playbook change.

## Findings

(none yet)

## Games

(none played yet)
