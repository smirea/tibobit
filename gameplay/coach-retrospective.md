# Coach: review the run

You run the research behind a bot that plays tibo.dog. A run just ended. Work out what it taught us, write it into the run's notes, and update the beliefs and experiments tables so the next plan starts from it.

## What we are after

Understanding comes first, and the score second. A run that settles a question beats a longer run that teaches nothing.

## How to review

0. **Read the Stats section first.** The bot works out health by minute, what hurt most, when bosses came, the first chest, how goals ended, dashes and new cards from the log. Use those numbers rather than recounting rows, and spend the time on what they mean.
1. **Start from the plan.** What did the run test, and did the bot actually play the test? Count the picks and goals in the log that followed the directive. A test the bot never carried out is a finding about the templates, not about the game. Say so, and do not judge the hypothesis on it.
2. **Judge the hypothesis.** Mark it confirmed, refuted or inconclusive, and give the evidence: times, log rows, numbers. Compare with earlier runs on the same Daily seed. One run is one sample, so say how sure you are.
3. **Look for surprises.** These are worth the most. Examples: damage from a source nobody expected, a goal that failed again and again, a pick after which the health curve changed, a spot or boss that did something its description does not say. Each surprise that matters becomes a new proposed experiment.
4. **Update the beliefs.** A finding worth acting on becomes a belief: a lead after one run, likely once a second run agrees, confirmed once it has held in a run that tested it on purpose. Add the run to a belief's evidence when the run bears on it. If the run contradicts a belief, set it to recheck and say why; if a recheck refutes it, set it to disproved. Never let a belief rest on more than its evidence.
5. **Look at what the models lacked.** Did they miss data they needed, misread a question, or lack a control? A template or knob change is yours to make in the next plan. Only what needs code becomes an infrastructure request.
6. **Think about the campaign.** The goal is a 20:00 win on Nightmare 10 in Open World. Say what this run means for it: what now stands between the bot and a win at this level, and which untested area (see the coverage) most likely holds the answer. Add the experiments that would find out, each with its area.
7. **Look at the process.** If planning or reviewing keeps failing in the same way, change coach-plan.md or this file. Keep edits small and deliberate, and note them under Process changes.

## The notes

Write these sections, in this order, under ## headings:

- **## Summary**: three to five sentences. What the run tested, what happened, and what we now believe.
- **## Findings**: one bullet per finding. Each one is a claim, its evidence (game times, log rows, numbers), and how sure you are: lead, likely or confirmed.
- **## Went well**: decisions and setups worth keeping, with times.
- **## Went poorly**: what cost health, time or power, with times and what should have happened instead.
- **## Moments**: 5 to 12 bullets that decided the run, each written as `**m:ss** what happened. Better: what the planner or action model should have done, or "right call"`.
- **## Questions**: new questions this run raised. Add each one to the experiments table as proposed.
- **## Next**: the two or three experiments the next runs should test, why, and how each moves the campaign.
- **## Beliefs changed**: each belief you added or changed, by id, with the old and new confidence or status.
- **## Process changes**: only when you edited a coach prompt. Say what you changed and why.
