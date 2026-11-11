# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run that puts what you learned into practice. This prompt is for the experiment iterations. Always reply with one valid JSON object that follows the reply format; an unusable reply wastes the whole iteration.

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

- Ten more arms tied or lost: shrine-first goal 2/5, dash 0.3 2/5, shop planner 4/5 but 133-253 damage taken, armor-first picks 2/8, evade-less 5/8, damage-first 4/8, steam-vent start 1/5, chest-when-near 4/10 against the playbook's 6/10 (4:00 survival on s31-40). Prompt-text tweaks to planner.goal or planner.pick on the opening do not move survival at 5-10 seeds. Do not run more of them as the main lever.
- Pooled playbook: about 8 of 20 fresh seeds reach 5:00 (s31-35 3/5; rehearsals 3/5, 2/5, 0/5). Full runs: 6:43, 2:07, 3:09.
- Chests separate survivors from deaths, but chests come only from elites and bosses dying. The first chest is listed at 1:05-1:54, so a goal that only opens listed chests cannot create them.
- Opening deaths: 80-100 hp lost in 11 s or less in the 1:04-1:56 window (3 of 4 recent full runs) while a goal holds Tibo in place (charging a shrine, opening a chest, fighting an elite). All forecast moves are ruled out and dash asks score 14-43%, under the 0.5 threshold. The other killers are the 2:00 amusing boss and the 3:00 queen. Dash 0.3 did not raise survival (B78).
- A strong 15:00 build wins 20:00 (4/4, built by loadout), so the late game is not the bottleneck. Handed items lived 7/7 against 0/5, so early power matters, but handed items are not a playbook option.
- The 'chests opened' line counts goal-driven openings. Check run.bossChests and weapon level jumps for incidental ones.

## Learning

- Read the last iteration's games first and say what they showed before planning more.
- One question per iteration, with a manipulation check: name the log evidence that the intended behavior happened (for example, 'a charge goal ended within 3 s of hurt_by'). If it never happened, the arm tested nothing.
- Pick the metric before the games. Survival needs 10 paired seeds (s31-40, 240 s) and a clear margin: 8 or more of 10 against the playbook's 6 of 10, with 3 or more net paired wins. Continuous metrics (health lost 1:00-2:30, bursts of 40 hp or more in 5 s, first chest opened, armor and max HP at 2:00) need at least 8 seeds; report mean and spread per arm.
- Reuse the playbook games already on file for s31-40, and add new baseline games only on new seeds.
- Read the log, not only the outcome: the goal running when each big health loss began, dash scores against the threshold, chests listed against opened, weapon levels and max HP at 2:00, shrines charged and what they gave, gold unspent.
- Record beliefs with evidence and the number of seeds. One game is a lead. Do not spend more than two iterations on a question that shows no mechanism in the logs.
- Generalize. What you learn has to hold on any map and seed.

## Explore first

1. leave-charge-when-hurt: a planner.goal text that ends charge, open and fight goals and keeps away when hurt_by shows damage in the last 3 s. Metric: bursts of 40 hp or more in 5 s, health lost 1:00-2:30. If the infra knob for aborting a charge on damage exists, test the knob too.
2. shrine-pick-text: a planner.pick text for shrine cards (Armor, then Max HP, then Damage, then Cooldown or Move speed; never Gold gain, Luck, Pickup range or XP gain while gold is unspent). Metric: armor and max HP at 2:00, health lost by 3:00.
3. early-elite-chest: a goal text that fights an elite while health is 80% or more and no boss is near, before 1:40, to bring the first chest sooner (watch B74: elite fights also burst). Metric: first chest opened, health lost 1:00-2:00.
4. Only then the crowd window 5:00-7:00 or the late game, with a gym built in the same iteration.

## Gyms

A gym pins one moment on one map. Use it to look at a decision, never to confirm a change. Keep only gyms that will be used next iteration, built from a thin typical playbook build, and retire the rest. A gym built from a survivor or a handed loadout does not stand for a typical build. Do not plan games on a gym built in an earlier iteration unless the status marks it ready.

## The playbook

Your playbook is what the full run plays. Change it only when an experiment confirmed with games from 0:00 on at least 10 fresh paired seeds says so. Changing the starting weapon needs the same. Say why for every change.

# Full run

This is iteration 10: the bot plays one whole game with your playbook, on the evaluation seed, in a freshly loaded tab. It is not a test. Put the best you know into practice.

## The goal

Survive 20:00. A win moves your Nightmare ladder up one level.

## Choosing the playbook

- Use what your beliefs and experiments support, not what you hope works. If two choices are equally supported, keep the one that has already played well (seeker-sprouts with distrustSeconds 10 and forecastSeconds 1: about 8 of 20 fresh seeds at 5:00, 6 of 10 at 4:00).
- One full run is a single sample of a wide spread: this playbook lived 6:43, 2:07 and 3:09. Do not read a single run as a verdict, and do not change the playbook because of one run or one log. A fix suggested by the last full run goes through an experiment first.
- Do not assume a build that survives the opening will scale. Gyms built from survivors say little about the typical 5:00 state (120-140 hp, several weapons at 1/8).
- Write the plan so it can be checked afterwards. Use pooled numbers, not hopes:
  - first chest listed: median about 1:20, range 1:05-1:54;
  - a chest opened by 2:00: about half of games;
  - survival: about 65% to 3:00, 38% to 5:00, 15% to 7:00;
  - health at 5:00 if alive;
  - the likely killer with a time window: a 1:00-2:00 elite or Hot oil burst, the 2:00 amusing boss, the 3:00 queen, the 4:00 Masher and the 6:00 crowd.
- Include the 1:00-2:30 opening burst (80-100 hp in under 11 s while a goal holds still) among the checks.

## Generalizing

The evaluation seed is fixed so that full runs can be compared. Do not tune anything to its map or to what happened on it before: the playbook has to win on any seed.

# Reflect

The full run is over. Review it, then look back over the whole loop and at your own prompts.

## The review

Write these sections: **Summary** (what happened and how far it got, and how it compared with the plan's checks), **What worked**, **What failed** (with game times and log rows), **Moments** that decided the run, and **Next loop** (what the next nine iterations should learn). Quote numbers, not impressions. Read these from the log: health lost per minute, weapon and passive levels and max HP at death, which catalysts were offered and taken, chests listed against opened (use run.bossChests and weapon level jumps too, since the opened count only includes goal-driven openings) with distances and the longest stretch with no chest opened, how long evade ran at full health and at low health, dash scores against the threshold (including the asks that stayed under it during a burst), gold earned and spent, shrines charged and what they gave, and the goal that was running when each big health loss began (and whether it held Tibo in place). Remember one run is one sample: say what it adds to the pooled record, not what it proves.

## Your prompts

Your three prompts (# Experiments, # Full run and # Reflect) are how you work. Look at what the loop did: which iterations taught something and which were wasted (including unusable replies, stale gyms and survivor-built gyms), where you guessed instead of testing, which tests had too few seeds or one game per arm, which arms had no manipulation check, and where the full run went against the evidence. Check whether the sample sizes you used could have shown the effect you hoped for (5 seeds cannot show under about 40 points of survival). Rewrite the prompts so the next loop works better. Keep every ## section, and keep them short.

## Beliefs and gyms

Update the beliefs the full run bears on and add the new ones, with the number of seeds behind each. Do not add a belief for what the pool already says; update the old row. Keep the gyms that will matter next loop (a thin typical build over a survivor's, and only if they can be used) and retire the rest. When a pattern repeats across full runs and no template, knob or gym can fix it, file an infra request.
