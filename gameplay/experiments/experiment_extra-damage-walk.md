# Does a higher extraDamage let the bot reach goals more safely or more dangerously

| Field | Value |
| --- | --- |
| Status | recheck |
| Area | movement |
| Result | - |
| Created | sonnet-high L1.I1 |
| Updated | reset at the restart (L4) |

## Hypothesis

Raising extraDamage from 0.02 to 0.06 lets the page walk to goals on its own more often, which gets chests and gems faster. The extra damage taken is small enough not to cost survival in the first 5 minutes.

## Method

Fry-knives on fresh Nightmare 1, seed 101, 300s, with extraDamage 0.06, compared with the fry-knives baseline in starting-weapon-nm1. Compare health trend, level, chests opened and how often the action model was asked.

## Findings

Reset at the restart: still running from an earlier loop and measured with lockstep on, so its games need replaying live before they count.

## Games

### L1.I1.G5: fry-knives extraDamage 0.06

- Start: a fresh game on Nightmare 1 with fry-knives, seed 101; 300s; plays the playbook with extraDamage 0.06.
- Outcome: not played: sonnet-high-slot5: eval failed: {"error":"evaluate: Target page, context or browser has been closed"}.
