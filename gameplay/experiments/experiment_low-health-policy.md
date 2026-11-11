# How should the bot act at low health (food, chests, elite fights)?

| Field | Value |
| --- | --- |
| Status | proposed |
| Area | models |
| Result | - |
| Created | L1.I10 |
| Updated | L1.I10 |

## Hypothesis

A planner.goal prompt that favours food and nearby chests when health is under 40%, together with eliteMinHp about 0.5, keeps health higher and chest count higher by 3:00 than the default, which keeps choosing evade.

## Method

Gym seeker-nm1-100s plus 3 fresh seeds from 0:00: default against the changed prompt and eliteMinHp 0.5. Read the goal rows, health gained, chests opened and death time.

## Findings

(none yet)

## Games

(none played yet)
