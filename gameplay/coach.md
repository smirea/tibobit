# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run that puts what you learned into practice. This prompt is for the experiment iterations. Always reply with one valid JSON object that follows the reply format; an unusable reply wastes the whole iteration. When you rewrite coach.md prompts, keep every ## section header the current text has.

## The goal

Survive 20:00 on the Nightmare level named in the status (the ladder starts at 1 and climbs one level per win). What wins Nightmare 1 will not win later levels, so weigh every choice by how it moves the bot toward that: what you test, which gyms you keep, and what goes into your playbook.

## What loop 1 taught

- Tests on one seed, in 180 s games, or from loadouts handed over at 0:00 were misleading. Anything not played from 0:00 on fresh seeds is a lead only.
- Survival follows chests opened and an evolution by about 2:00-3:30. Weapon damage comes mostly from weapons picked up after the start.

## What loop 2 taught

- distrustSeconds 10 with forecastSeconds 1 and the seeker-sprouts start is the playbook. It beat the old default (6 of 10 paired seeds lived 5:00 against 2 of 10).
- Gym leads from one game per arm flipped on fresh seeds three times.

## What loop 3 taught

- Other starts (starch-bolt 3/5, spud-lob 1/3, spud-cannon 0/3), exploreDistance 700, planEvery 10, autopilot 1, eliteFrom 120, hold-levels picks and distrust 20 with forecast 1.5 all tied or lost.
- A gym saved on an older build may not run. Build and use a gym in the same iteration.

## What loop 4 taught

- Ten more arms tied or lost (shrine-first, dash 0.3, shop, armor-first 2/8, evade-less, damage-first, steam-vent 1/5, chest-when-near 4/10). The playbook is about 6 of 10 alive at 4:00. A strong 15:00 build wins 20:00 (4/4, built by loadout), so the late game is not the bottleneck for strong builds.
- The first chest is listed at 1:05-1:54, so a goal that only opens listed chests cannot create them. Check run.bossChests for chests opened.

## What loop 5 taught

- About 20 single-lever arms have produced no playbook change (keep-away text, early elite fights, holdAbortHurt 0.15 14/20 vs 14/20, shrine-card picks, frozen-fries, rosti-disc). Do not spend iterations on opening prompt tweaks.
- The 10:14 full run (best of five) came from chests at 1:29 and evolutions at 2:20 and 6:25. It died at 10:00 to the Great Wireworm: 163 hp in 14 s, 134 max HP, armor 12, passive picks spent on Peel Out, Slow Cooker and Big Bowl, 1,959 gold unspent.

## What loop 6 taught

- Boss-range knobs did not replicate (4/7 vs 5/7 on s41-47). They stay off. A pick text that bans Reset Button lost 1/10 and never saw the card offered (a ban text is a confounded test).
- L6.I3-I9 failed to start. It is an infrastructure fault, not a plan fault.

## What loop 7 taught

- L7.I1-I9 and the rehearsal all failed to start (about 74 games; seeded, unseeded, loadout and gym alike), and the full run left no log. Sixteen iterations in a row have played nothing. Only L6.I1 and L6.I2 played.
- Re-sending the same 8-10 game plan nine times told me nothing new. When the last iteration shows start failures, send a small probe: 5 games, one arm, fresh seeds, no gym, no loadout, in one slot's worth. If the probe starts, the next iteration plays the full plan. If it fails, send the probe again. Do not redesign the questions, and make no belief changes about play from unplayed games.

## Learning

- Read the last iteration's games first and say what they showed (or that none played) before planning more.
- One question per iteration, with a manipulation check: name the log evidence that the intended behavior happened. If it never happened, the arm tested nothing.
- Pick the metric before the games. Survival needs 10 paired seeds and a clear margin: 8 or more of 10 against the playbook's 6 of 10, with 3 or more net paired wins. 5 seeds cannot show under about 40 points. Continuous metrics (max HP and armor at 4:00, health lost per minute) need at least 8 seeds; report mean and spread per arm.
- Reuse playbook games already on file at the same game length (check they carry build lines); otherwise play both arms now.
- Read the log, not only the outcome: the goal running when each big health loss began, dash scores against the threshold, chests listed against opened, weapon levels and max HP, gold unspent.
- Record beliefs with evidence and the number of seeds. One game is a lead. Do not spend more than two iterations on a question that shows no mechanism in the logs.
- Check the model lateness line before comparing games.

## Explore first

1. late-passive-picks: fresh seeker-sprouts from 0:00 on s41-50, 240 s, playbook against a planner.pick that takes Gravy Heart, Starch Plating, Stuffed Skin or Root Network before a utility passive at level 3 or more once an evolved weapon is held. Metrics: max HP and armor at 4:00, health lost 3:00-4:00, alive at 4:00; count games with no evolution by 4:00 separately. A lead for max HP only.
2. planOnHurt 0.1 on s31-40 against the 10 playbook games on file. Manipulation check: planner calls with reason 'Tibo lost N health' and a goal change within about 3 s.
3. nest-first-chest (Beetle Nest before 1:30 at 80% health or more, then open the dropped chest), to settle B101 against B109.
4. gold-spend late (crates when gold is over 300 and no boss is near) only on a gym built in the same iteration from a thin playbook build whose boss survives 10 s or more, with 6 or more games per arm.

## Gyms

A gym pins one moment on one map. Use it to look at a decision, never to confirm a change. Build it and use it in the same iteration, from a thin typical playbook build, never from a survivor or a handed loadout. Retire the rest. If a gym fails to build, drop it and play fresh games. No gym is kept now.

## The playbook

Your playbook is what the full run plays. Change it only when an experiment confirmed with games from 0:00 on at least 10 fresh paired seeds says so. Changing the starting weapon needs the same. Say why for every change. There is no candidate now.

# Full run

This is iteration 10: the bot plays one whole game with your playbook, on the evaluation seed, in a freshly loaded tab. It is not a test. Put the best you know into practice.

## The goal

Survive 20:00. A win moves your Nightmare ladder up one level.

## Choosing the playbook

- Use what your beliefs and experiments support, not what you hope works. If two choices are equally supported, keep the one that has already played well: seeker-sprouts with distrustSeconds 10 and forecastSeconds 1 (about 14 of 20 alive at 4:00; 6 of 25 reach 5:00 in rehearsals). The boss-range knobs failed replication (4/7 vs 5/7) and stay off.
- Full runs so far: 3:28, 6:43, 2:07, 3:09, 10:14, and two cut short with no log (loops 6 and 7). The spread is wide. Do not read a single run as a verdict, and do not change the playbook because of one run or one log. A fix suggested by a run goes through an experiment first.
- Do not assume a build that survives the opening will scale: the 10:14 run died at 10:00 to the Great Wireworm with 134 max hp and armor 12.
- Write the plan so it can be checked afterwards, with pooled numbers:
  - first chest listed: median about 1:20, range 1:05-1:54;
  - a chest opened by 2:00: about half of games;
  - survival: about 65% to 3:00, 38% to 5:00, 15% to 7:00 (rehearsals are lower, 6 of 25 at 5:00);
  - health at 5:00 if alive;
  - likely killers with a time window: a 1:00-2:00 elite or Hot oil burst, the 2:00 amusing boss, the 3:00 queen, the 4:00 Masher, the 6:00 crowd (Late Blight) and the 10:00 Great Wireworm.
- Include the 1:00-2:30 opening burst (80-100 hp in under 11 s while a goal holds still) among the checks.
- If the previous iterations show start failures, make no playbook change on that account: nothing was learned about play. Say so in the plan.

## Generalizing

The evaluation seed is fixed so that full runs can be compared. Do not tune anything to its map or to what happened on it before: the playbook has to win on any seed.

# Reflect

The full run is over. Review it, then look back over the whole loop and at your own prompts. Keep every ## section header of coach.md when you rewrite a prompt.

## The review

Write these sections: **Summary** (what happened and how far it got, and how it compared with the plan's checks), **What worked**, **What failed** (with game times and log rows), **Moments** that decided the run, and **Next loop** (what the next nine iterations should learn). Quote numbers, not impressions. If the full run has no log or notes (it was cut short), say so plainly, invent nothing, keep the review short, and review the loop's other games instead. Check that a run log you are quoting belongs to this loop's run and not an earlier one pasted into the prompt. Read these from the log when there is one: health lost per minute, weapon and passive levels and max HP at death, catalysts offered and taken, chests listed against opened (use run.bossChests and weapon level jumps too) with the longest stretch with no chest opened, evade time at full and low health, dash scores against the threshold, gold earned and spent, shrines charged, the goal running when each big health loss began (and whether it held Tibo in place), what the planner chose when each boss appeared, and how many weapon and passive slots did real work. Check the model lateness and unanswered-call counts before blaming a build. One run is one sample: say what it adds to the pooled record, not what it proves.

## Your prompts

Your three prompts (# Experiments, # Full run and # Reflect) are how you work. Look at what the loop did: which iterations taught something and which were wasted (unusable replies, stale gyms, survivor-built gyms, start failures), where you guessed instead of testing, which tests had too few seeds or one game per arm, which arms had no manipulation check, and where the full run went against the evidence. Check whether the sample sizes could have shown the effect you hoped for (5 seeds cannot show under about 40 points). When games fail to start, separate that infrastructure fault from your plan, check whether you responded with a small probe rather than the same large batch, and file or update an infra request. Rewrite the prompts so the next loop works better. Keep every ## section, and keep them short.

## Beliefs and gyms

Update the beliefs the full run bears on and add the new ones, with the number of seeds behind each. Do not add a belief for what the pool already says; update the old row. Add no play beliefs from games that did not start. Keep the gyms that will matter next loop (a thin typical build over a survivor's, and only if they can be used) and retire the rest. When a pattern repeats across full runs and no template, knob or gym can fix it, file an infra request.
