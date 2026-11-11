# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run that puts what you learned into practice. This prompt is for the experiment iterations. Always reply with one valid JSON object that follows the reply format; an unusable reply wastes the whole iteration. When you rewrite coach.md prompts, keep every ## section header the current text has.

## The goal

Survive 20:00 on the Nightmare level named in the status (the ladder starts at 1 and climbs one level per win). What wins Nightmare 1 will not win later levels, so weigh every choice by how it moves the bot toward that: what you test, which gyms you keep, and what goes into your playbook.

## What loop 1 taught

- Tests on one seed, in 180 s games, or from loadouts handed over at 0:00 were misleading. Anything not played from 0:00 on fresh seeds is a lead only.
- Survival follows chests opened and an evolution by about 2:00-3:30. Weapon damage comes mostly from weapons picked up after the start.

## What loop 2 taught

- distrustSeconds 10 with forecastSeconds 1 and the seeker-sprouts start is the playbook. It beat the old default (6 of 10 paired seeds lived 5:00 against 2 of 10).
- Nothing stacked on the knobs beat them from 0:00. Gym leads from one game per arm flipped on fresh seeds three times.

## What loop 3 taught

- Other starts (starch-bolt 3/5, spud-lob 1/3, spud-cannon 0/3), exploreDistance 700, planEvery 10, autopilot 1 (1/5), eliteFrom 120 (2/5), hold-levels picks (1/3) and distrust 20 with forecast 1.5 (2/5) all tied or lost.
- A gym saved on an older build may not run. Build and use a gym in the same iteration, or use fresh seeds from 0:00.

## What loop 4 taught

- Ten more arms tied or lost: shrine-first goal 2/5, dash 0.3 2/5, shop planner 4/5 but 133-253 damage taken, armor-first picks 2/8, evade-less 5/8, damage-first 4/8, steam-vent start 1/5, chest-when-near 4/10 against the playbook's 6/10 (4:00 survival on s31-40). Prompt-text tweaks to the opening do not move survival at 5-10 seeds.
- A strong 15:00 build wins 20:00 (4/4, built by loadout), so the late game is not the bottleneck for strong builds. Handed items are not a playbook option.
- The first chest is listed at 1:05-1:54, so a goal that only opens listed chests cannot create them. 'Chests opened' counts goal-driven openings only; check run.bossChests.

## What loop 5 taught

- More arms tied or lost against the pooled playbook (about 14/20 alive at 4:00, 6 of 20 at 5:00 in rehearsals): keep-away goal text 6/10, early elite fights 1/10, holdAbortHurt 0.15 14/20 vs 14/20, shrine-card picks 2/10, frozen-fries 10/15 vs 10/15, rosti-disc 2/5. About 20 single-lever arms have now produced no playbook change.
- Only the boss-range knobs (distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3) cleared the bar once: 9/10 against 6/10, net +3, amusing damage 0-45. Never replicated; the holdAbortHurt lead faded on replication.
- The 10:14 full run (best of five) came from chests at 1:29 and an evolution at 2:20 and 6:25. It died at 10:00 to the Great Wireworm: 163 hp in 14 s, 134 max HP, armor 12, two 'Eat the food' goals walking toward the boss, boss dash knobs off, 1,959 gold unspent.
- Loop 5 spent nine iterations on opening prompt tweaks. Do not repeat that.

## Learning

- Read the last iteration's games first and say what they showed before planning more.
- One question per iteration, with a manipulation check: name the log evidence that the intended behavior happened. If it never happened, the arm tested nothing.
- Pick the metric before the games. Survival needs 10 paired seeds and a clear margin: 8 or more of 10 against the playbook's 6 of 10, with 3 or more net paired wins. 5 seeds cannot show under about 40 points. Continuous metrics (health lost, bursts of 40 hp in 5 s, first chest opened, armor and max HP at 2:00) need at least 8 seeds; report mean and spread per arm.
- Reuse playbook games already on file; add new baselines only on new seeds. Seeds 41-50 have playbook games for 240 s.
- Read the log, not only the outcome: the goal running when each big health loss began, dash scores against the threshold, chests listed against opened, weapon levels and max HP, gold unspent.
- Record beliefs with evidence and the number of seeds. One game is a lead. Do not spend more than two iterations on a question that shows no mechanism in the logs.
- Generalize. What you learn has to hold on any map and seed. A game that overlapped machine overload (check the model lateness line) is not comparable with quiet ones.

## Explore first

1. boss-range-replication: playbook with the boss-range knobs against the playbook on fresh seeds s41-50, 240 s, both arms played now. Metric: alive at 4:00 and boss damage. Manipulation check: action-model moves and dashes while a boss is within 250. Adopt only on 8 or more of 10 alive and net +3, and then change the playbook.
2. late-boss-food: a planner.goal rule that withholds food and crate goals while a boss is within 300 and health is above 60%, on a gym built in the same iteration from a thin playbook build at about 9:30 (the 10:00 Great Wireworm). Metric: health lost 10:00-10:30, survival to 11:00. 6 or more games per arm; 600 s games from 0:00 are too costly.
3. late-passives: after the first evolution, a pick text that takes max HP, armor or recovery passives before a fifth maxed utility passive. Metric: max HP and armor at 8:00, health lost per minute 8:00-11:00.
4. gold-spend late: Potato Crates when gold is over 300 and no boss is near. Only on a gym.

## Gyms

A gym pins one moment on one map. Use it to look at a decision, never to confirm a change. Keep only gyms that will be used next iteration, built from a thin typical playbook build, and retire the rest. A gym built from a survivor or a handed loadout does not stand for a typical build. Do not plan games on a gym built in an earlier iteration unless the status marks it ready.

## The playbook

Your playbook is what the full run plays. Change it only when an experiment confirmed with games from 0:00 on at least 10 fresh paired seeds says so. Changing the starting weapon needs the same. Say why for every change. The boss-range knobs are the only candidate; they need the replication first.

# Full run

This is iteration 10: the bot plays one whole game with your playbook, on the evaluation seed, in a freshly loaded tab. It is not a test. Put the best you know into practice.

## The goal

Survive 20:00. A win moves your Nightmare ladder up one level.

## Choosing the playbook

- Use what your beliefs and experiments support, not what you hope works. If two choices are equally supported, keep the one that has already played well (seeker-sprouts with distrustSeconds 10 and forecastSeconds 1: about 14 of 20 alive at 4:00, about 6 to 8 of 20 at 5:00). Boss-range knobs (distrustBossRange 250, bossOfferRange 250, bossDashRange 250, bossDashThreshold 0.3) go in only if the replication on s41-50 confirmed them.
- Full runs so far: 3:28, 6:43, 2:07, 3:09, 10:14 on the same playbook, so the spread is wide. Do not read a single run as a verdict, and do not change the playbook because of one run or one log. A fix suggested by the last full run goes through an experiment first.
- Do not assume a build that survives the opening will scale. A 10:14 run died at 10:00 to the Great Wireworm with 134 max hp and armor 12.
- Write the plan so it can be checked afterwards. Use pooled numbers, not hopes:
  - first chest listed: median about 1:20, range 1:05-1:54;
  - a chest opened by 2:00: about half of games;
  - survival: about 65% to 3:00, 38% to 5:00, 15% to 7:00;
  - health at 5:00 if alive;
  - the likely killer with a time window: a 1:00-2:00 elite or Hot oil burst, the 2:00 amusing boss, the 3:00 queen, the 4:00 Masher, the 6:00 crowd (Late Blight) and the 10:00 Great Wireworm.
- Include the 1:00-2:30 opening burst (80-100 hp in under 11 s while a goal holds still) among the checks.

## Generalizing

The evaluation seed is fixed so that full runs can be compared. Do not tune anything to its map or to what happened on it before: the playbook has to win on any seed.

# Reflect

The full run is over. Review it, then look back over the whole loop and at your own prompts. Keep every ## section header of coach.md when you rewrite a prompt.

## The review

Write these sections: **Summary** (what happened and how far it got, and how it compared with the plan's checks), **What worked**, **What failed** (with game times and log rows), **Moments** that decided the run, and **Next loop** (what the next nine iterations should learn). Quote numbers, not impressions. Read these from the log: health lost per minute, weapon and passive levels and max HP at death, which catalysts were offered and taken, chests listed against opened (use run.bossChests and weapon level jumps too) with distances and the longest stretch with no chest opened, how long evade ran at full health and at low health, dash scores against the threshold (including the asks that stayed under it during a burst), gold earned and spent, shrines charged and what they gave, the goal that was running when each big health loss began (and whether it held Tibo in place), what the planner chose when each boss appeared, and how many weapon and passive slots did real work. Check the model lateness and unanswered-call counts before blaming a build. Remember one run is one sample: say what it adds to the pooled record, not what it proves.

## Your prompts

Your three prompts (# Experiments, # Full run and # Reflect) are how you work. Look at what the loop did: which iterations taught something and which were wasted (including unusable replies, stale gyms and survivor-built gyms), where you guessed instead of testing, which tests had too few seeds or one game per arm, which arms had no manipulation check, and where the full run went against the evidence. Check whether the sample sizes you used could have shown the effect you hoped for (5 seeds cannot show under about 40 points of survival). Rewrite the prompts so the next loop works better. Keep every ## section, and keep them short.

## Beliefs and gyms

Update the beliefs the full run bears on and add the new ones, with the number of seeds behind each. Do not add a belief for what the pool already says; update the old row. Keep the gyms that will matter next loop (a thin typical build over a survivor's, and only if they can be used) and retire the rest. When a pattern repeats across full runs and no template, knob or gym can fix it, file an infra request.
