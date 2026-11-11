# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run that puts what you learned into practice. This prompt is for the experiment iterations. Always reply with one valid JSON object that follows the reply format; an unusable reply wastes the whole iteration.

## The goal

Survive 20:00 on the Nightmare level named in the status (the ladder starts at 1 and climbs one level per win). What wins Nightmare 1 will not win later levels, so weigh every choice by how it moves the bot toward that: what you test, which gyms you keep, and what goes into your playbook.

## What loop 1 taught

- Tests on one seed, in 180 s games, or from loadouts handed over at 0:00 were misleading. Treat anything not played from 0:00 on fresh seeds as a lead only.
- The danger window on Nightmare 1 is 2:00-3:30 for thin builds. Survival follows chests opened and an evolution by about 2:00-3:30.

## What loop 2 taught

- distrustSeconds 10 with forecastSeconds 1 and the seeker-sprouts start is the playbook. It lived 5:00 on 6 of 10 paired seeds against 2 of 10 for the old default.
- Nothing stacked on the knobs beat them from 0:00 (spot-first, low-health, catalyst-first picks, focus picks, chest-first goal, hazard prompt, boss knobs). Gym leads from one game per arm flipped on fresh seeds three times.
- Chest rewards raise the top weapon; level-up picks spread across new weapons. Gold goes unspent. A 15:00 build died at 18:23 to tier 5 Grease Fiend elites.

## What loop 3 taught

- Nine iterations and 40+ games produced no playbook change. Every alternative tied or lost: other starts (starch-bolt 3/5, spud-lob 1/3, spud-cannon 0/3), exploreDistance 700, planEvery 10, autopilot 1 (1/5), eliteFrom 120 (2/5), hold-levels picks (1/3), distrust 20 and forecast 1.5 (2/5).
- The playbook baseline pooled over fresh seeds is about 8 of 15 reaching 5:00. Full runs with it: 6:43 and 2:07. Arms of 5 games cannot tell 3/5 from 2/5; do not read ties or one-seed wins as evidence. A change needs at least 8 paired seeds and a clear margin, or a large visible mechanism.
- Deaths cluster in the opening: an elite burst at 1:00-1:10 (79 health in 7 s, with 12 dash asks scoring 17-43% under the 0.5 threshold) or the 2:00 amusing boss, on 120 max hp with 0-1 chests and four weapons at 1/8.
- Dashes only fire below about 35% health, after the damage is done. dashThreshold 0.3 was tested only on a strong 5:50 gym, never from 0:00.
- Shrines (armor, max HP) were rarely charged. The games that took them had 140-149 max hp and armor 14-26.
- A gym saved on an older build may not run, and a failed gym wastes games. Build and use a gym in the same iteration, or prefer fresh seeds from 0:00.

## Learning

- Read the last iteration's games first and say what they showed before planning more.
- Pick one question per iteration. Compare games that differ in one thing, on the same fresh seeds. Include the baseline on the same new seeds so the pooled baseline grows.
- For opening questions play 240 s games on 8-10 seeds (31-45) rather than 300 s games on 5; opening deaths show by 2:30.
- Read the log, not only the outcome: the goal running when each big health loss began, dash scores against the threshold, chests listed against opened with distances, weapon levels and max HP at 2:00, shrines charged, gold unspent.
- Record beliefs with their evidence and the number of seeds. One game is a lead.
- Generalize. What you learn has to hold on any map and seed.

## Explore first

1. dashThreshold 0.3 (with bossDashThreshold 0.3 and bossDashRange 250) from 0:00, paired with the playbook on seeds 31-40.
2. Early Spud Shrine charging (planner.goal that rates shrines above exploring while health is above 60% and no elite is near) for armor and max HP, paired on the same seeds.
3. Only then the 5:50-7:00 crowd window and 15:00-20:00, with a gym built in the same iteration.

## Gyms

A gym pins one moment on one map. Use it to look at a decision, never to confirm a change. Keep only gyms that will be used next iteration, built from a thin typical playbook build, and retire the rest. Do not plan games on a gym built in an earlier iteration unless the status marks it ready.

## The playbook

Your playbook is what the full run plays. Change it only when an experiment confirmed with games from 0:00 on at least 8 fresh paired seeds says so. Changing the starting weapon needs the same. Say why for every change.

# Full run

This is iteration 10: the bot plays one whole game with your playbook, on the evaluation seed, in a freshly loaded tab. It is not a test. Put the best you know into practice.

## The goal

Survive 20:00. A win moves your Nightmare ladder up one level.

## Choosing the playbook

- Use what your beliefs and experiments support, not what you hope works. If two choices are equally supported, keep the one that has already played well (seeker-sprouts with distrustSeconds 10 and forecastSeconds 1 has reached 5:00 on about 8 of 15 fresh seeds).
- One full run is a single sample of a wide spread: the same playbook lived 6:43 and 2:07. Do not read a single run as a verdict on the playbook, and do not change the playbook because of one run.
- Do not assume a build that survives the opening will scale. Gyms built from survivors say little about the typical 5:00 state (120 hp, several weapons at 1/8).
- Write the plan so it can be checked afterwards: name the first chest time, the evolution and its time, the health at 5:00, and the most likely killer with its time window. Give a survival probability to 3:00, 5:00 and 7:00 from the pooled baseline, and include the 1:00-2:30 opening burst, the 2:00 amusing boss and the 5:30-7:00 window.

## Generalizing

The evaluation seed is fixed so that full runs can be compared. Do not tune anything to its map or to what happened on it before: the playbook has to win on any seed.

# Reflect

The full run is over. Review it, then look back over the whole loop and at your own prompts.

## The review

Write these sections: **Summary** (what happened and how far it got, and how it compared with the plan's checks), **What worked**, **What failed** (with game times and log rows), **Moments** that decided the run, and **Next loop** (what the next nine iterations should learn). Quote numbers, not impressions. Read these from the log: health lost per minute, weapon and passive levels and max HP at death, which catalysts were offered and taken, chests listed against opened with distances and the longest stretch with no chest opened, how long evade ran at full health, dash scores against the threshold (including the asks that stayed under it during a burst), gold earned and spent, shrines charged, and the goal that was running when each big health loss began. Remember one run is one sample: say what it adds to the pooled record, not what it proves.

## Your prompts

Your three prompts (# Experiments, # Full run and # Reflect) are how you work. Look at what the loop did: which iterations taught something and which were wasted (including unusable replies and stale gyms), where you guessed instead of testing, which tests were on too few seeds, one game per arm, or a survivor-built gym and misled you, and where the full run went against the evidence. Check whether the sample sizes you used could have shown the effect you hoped for. Rewrite the prompts so the next loop works better. Keep every ## section, and keep them short.

## Beliefs and gyms

Update the beliefs the full run bears on and add the new ones, with the number of seeds behind each. Keep the gyms that will matter next loop (a thin typical build over a survivor's, and only if they can be used) and retire the rest.
