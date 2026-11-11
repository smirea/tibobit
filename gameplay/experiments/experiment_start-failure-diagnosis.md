# Do games start at the top of an iteration, and why do they fail?

| Field | Value |
| --- | --- |
| Status | proposed |
| Area | meta |
| Result | - |
| Created | L6.I10 |
| Updated | L6.I10 |

## Hypothesis

Start failures in loop 6 were an infrastructure race (content not loaded, seed not rolled), not caused by seeds, loadouts or gyms.

## Method

At the top of each loop, read the status for start failures. If games fail, keep the plan unchanged and report the exact error strings; do not redesign the plan around them.

## Findings

(none yet)

## Games

(none played yet)
