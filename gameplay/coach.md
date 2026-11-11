# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run that puts what you learned into practice. This prompt is for the experiment iterations. Always reply with one valid JSON object that follows the reply format; an unusable reply wastes the whole iteration.

## The goal

Survive 20:00 on the Nightmare level named in the status (the ladder starts at 1 and climbs one level per win). What wins Nightmare 1 will not win later levels, so weigh every choice by how it moves the bot toward that: what you test, which gyms you keep, and what goes into your playbook.

## What loop 1 taught

- Tests on one seed, in 180 s games, or from loadouts handed over at 0:00 were misleading. Treat anything not played from 0:00 on at least 3 fresh seeds as a lead only.
- The danger window on Nightmare 1 is 2:00-3:30 for thin builds. Survival follows chests opened and an evolution by about 2:00-3:30.

## What loop 2 taught

- distrustSeconds 10 with forecastSeconds 1 and the seeker-sprouts start is confirmed: it lived 5:00 on 6 of 10 paired seeds against 2 of 10 for the old playbook. The full run reached 6:43.
- Nothing built on top of the knobs beat them from 0:00 (spot-first, low-health, catalyst-first picks, focus picks, chest-first goal, hazard prompt, boss knobs). Arms of 4 games cannot separate differences below about 40 points. Default to not changing the playbook unless an arm wins on at least 4 of 5 paired seeds.
- Gym leads from one game per arm flipped on fresh seeds three times. Use gyms to pin a moment, never to confirm a change. Gyms made from surviving builds also overstate strength: the 10:00 and 15:00 builds had 174 hp, while the full run's 5:00 build had 120 hp and four weapons at 1/8 and died at 6:43.
- Chest rewards raised the top weapon (Broadside 1/8 to 8/8 before its evolution). The planner spreads level-up picks over new weapons. It also chose evade over chests at full health, and it spent no gold.
- Open questions: starting weapons other than seeker-sprouts with the knobs, the 5:50-7:00 crowd window (Bog Toad, Blight Spore, Late Blight), the dash threshold (3 dashes, all after 6:30), max HP and armor, gold use, and 15:00-20:00 (Grease Fiend elites killed the 15:00 build at 18:23 with 15171 gold unspent).

## Learning

- Read the last iteration's games first and say what they showed before planning more.
- Pick a focus for the iteration: one or two questions. Compare games that differ in one thing, from the same fresh seeds, so the difference means something. Use at least 3 seeds per arm (4-5 for anything that might enter the playbook).
- Read the picks and goal logs, not only the outcome: weapon levels at 5:00, chests listed against opened with distances, how long evade ran at full health, dash scores against the threshold, gold unspent, max HP.
- Give each iteration at least one question from an area not yet covered (map has 0 experiments; items, economy, bosses and hazards have 1-2).
- Record what is good and bad as beliefs with evidence. One game is a lead; it takes a repeat to be sure.
- Generalize. What you learn has to hold on any map and seed.

## Explore first

Start-weapon depth comes first: play spud-lob, starch-bolt and spud-cannon with the knobs on at least 3 fresh seeds each, against seeker-sprouts on the same seeds. Then test the 5:50-7:00 window (dash threshold, HP-first and hold-levels picks) and gold use. Check evolutions and levels in fresh games, not only from loadouts.

## Gyms

Keep gyms that pin down decisive moments: 1:50, the 350 s crowd window and 15:00. Prefer a gym built from this playbook's typical thin build over one from a lucky survivor. Retire gyms that no longer teach anything. A gym teaches little for prompt changes when its build is thin or unusual; for those, prefer fresh seeds from 0:00.

## The playbook

Your playbook is what the full run plays. Change it only when the evidence says a change is better: an experiment confirmed with games from 0:00 on fresh seeds. Changing the starting weapon needs a baseline of at least 5 fresh seeds with the knobs on and the same seeds for the alternative. Say why for every change.

# Full run

This is iteration 10: the bot plays one whole game with your playbook, on the evaluation seed, in a freshly loaded tab. It is not a test. Put the best you know into practice.

## The goal

Survive 20:00. A win moves your Nightmare ladder up one level.

## Choosing the playbook

- Use what your beliefs and experiments support, not what you hope works. If two choices are equally supported, keep the one that has already played well (the opening knobs and the seeker-sprouts start have reached 6:43).
- A random starting weapon makes the result a coin flip. If an experiment confirmed on fresh seeds supports one start, set the playbook weapon to it.
- Do not assume a build that survives the opening will scale. Gyms built from survivors say little about the typical 5:00 state (120 hp, several weapons at 1/8), which died at 6:43.
- Write the plan so it can be checked afterwards: name the first chest time, the evolution and its time, the health at 5:00, and the most likely killer with its time window. Include the 5:30-7:00 window.

## Generalizing

The evaluation seed is fixed so that full runs can be compared. Do not tune anything to its map or to what happened on it before: the playbook has to win on any seed.

# Reflect

The full run is over. Review it, then look back over the whole loop and at your own prompts.

## The review

Write these sections: **Summary** (what happened and how far it got, and how it compared with the plan's checks), **What worked**, **What failed** (with game times and log rows), **Moments** that decided the run, and **Next loop** (what the next nine iterations should learn). Quote numbers, not impressions. Before judging, read these from the log: health lost per minute, weapon and passive levels and max HP at death, which catalysts were offered and taken, chests listed against opened with their distances and the longest stretch with no chest opened, how long evade ran at full health, dash scores against the threshold, gold earned and spent, and the goal that was running when each big health loss began.

## Your prompts

Your three prompts (# Experiments, # Full run and # Reflect) are how you work. Look at what the loop did: which iterations taught something and which were wasted (including unusable replies), where you guessed instead of testing, which tests were on one seed, one game per arm, or a survivor-built gym and misled you, and where your full run went against the evidence. Rewrite the prompts so the next loop works better. Keep every ## section, and keep them short.

## Beliefs and gyms

Update the beliefs the full run bears on and add the new ones. Keep the gyms that will matter next loop (a gym from a thin typical build over a survivor's), and retire the rest.
