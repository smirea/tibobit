# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run. This prompt is for the experiment iterations.

## The goal

Survive 20:00 on Nightmare 10 in Open World. The ladder climbs one level per win; the next full run plays the highest unlocked level, which is Nightmare 2 (won up to Nightmare 1). Time after 20:00 does not count. Every game is played live; lockstep is banned. Weigh every choice by how it moves the bot toward 20:00 on Nightmare 2.

Format: reply with compact, valid JSON only, with short fields. Loops 5-7 lost 27 iterations to unusable replies.

## Learning

- Read the last full run first: cause, time, hp, dashes, goals and the planner's ratings in the last 30 seconds, and which rows lost the most hp. The three live full runs on seed TIBO10 died at 2:14, 2:15 and 2:25, all at the 2:00 Festival Mascot. The latest entered 2:00 at 109/120 hp with no chest opened, three weapons at 1/8, 0 dashes and about 66 dps, and the Mascot (three amusing entries on Nightmare 2) took 115 hp in 2 s while the planner chose an elite fight beside it.
- The unchanged playbook lives 5:00 on about 5 of 28 fresh live NM2 starts. Everything measured under lockstep is a lead only.
- Stop spending games on what is refuted live: every dash, elite, explore, distrust, safeMargin, extraDamage and boss-dash knob; hurt-prompt variants; early armor; commit, weapon-focus and Hot Streak pick prompts; goal-text rewordings; defensive items at 1:45; Starch Bolt, Tater Pup, Peeler and Root Spikes starts. Games that only reword a prompt teach nothing.
- Measure continuous outcomes, not only alive/dead at 5:00. At a 20% base rate, 5 seeds per arm cannot separate arms. For each game record damage dealt by 2:00, elites killed by 2:00, chests opened, hp at 2:00, first evolution time and Mascot damage. Pair arms on the same fresh seeds. Never train on seed TIBO10.
- Priority order: (1) untried start weapons (fry-lance, gravy-boat, spud-lob, deep-fryer, seeker-sprouts) judged by early damage, elites and chests; (2) Mascot anatomy: how many amusing entries spawn on NM2, their hp and how much a normal build takes off them; (3) boss-distance gating: while a boss is within about 250 units, chest, elite and spot goals are rated low and moving away from the boss is rated high, compared with plain on paired seeds, checking that chests still open when no boss is near; (4) only if the opening improves, the 5:00 gym (nm2-live-min5) and the 6:00-8:00 bosses.
- Cover every area over a loop (build, items, spots, enemies, bosses, hazards, movement, economy, map, models) with at least one game per area untested this loop or the last. Record beliefs (good, bad, fact) with evidence and say whether it was live.
- Close every experiment with a verdict before the full run and carry it into beliefs.csv.

## Gyms

Gyms are saved game states built live from a fresh playbook game in 5-minute stages. Build them early and use them in the same loop, since a game build change breaks saved gyms. Keep only live opening gyms (nm2-live-min5 is ready); the pre-Mascot gyms were too easy to separate arms. At most three builds per iteration.

## The playbook

Your playbook is what the full run plays. Change it only on evidence that the change beats the current playbook in training from 0:00 on fresh seeds: name the confirmed experiments. A start weapon needs a clearly higher damage-by-2:00 and chest flow on at least 5 paired fresh seeds. Before the full run the loop plays the last full run's playbook against yours on the same fresh seeds and keeps the old one if yours does worse.

# Full run

This is iteration 10: the bot plays one whole game live with your playbook, on the evaluation seed, in a freshly loaded tab. The rehearsal has settled the playbook; this call gives every experiment of the loop its verdict and writes the intent. Reply with compact, valid JSON only.

## The goal

Survive 20:00. A win moves your Nightmare ladder up one level, and the campaign ends at a win on Nightmare 10. Time after 20:00 does not matter.

## Choosing the playbook

The playbook was settled before this call: changes went in only on confirmed experiments with fresh-seed games and survived the rehearsal against the last full run's playbook. In the intent, say what the run plays, which experiments support each change, and what to watch for: first chest and elite kill times, hp and dps at 2:00, whether the planner walks toward the Mascot, whether any chest is opened, and dashes used on the Mascot. The baseline is steam-vent, the chest-first goal text with the 10:00 gold rule, default picks and the current knobs. It lives about 1 of 5 live on NM2 and died on this seed at 2:14, 2:15 and 2:25, each time at the 2:00 Mascot.

## Generalizing

The evaluation seed is fixed so full runs can be compared. Do not tune anything to its map or to what happened on it: the playbook has to win on any seed. Judge it on training results across seeds; one full run is one data point.

# Reflect

The full run is over. Review it, then look back over the whole loop and at your own prompts. Reply with compact, valid JSON only; unusable replies cost whole loops before.

## The review

Write these sections: **Summary** (what happened and how far it got; say whether the run won and what ladder level is next), **What worked**, **What failed** (with game times and log rows: hp, max hp, dashes, goals active, gold unspent), **Moments** that decided the run, and **Next loop** (what the next nine iterations should learn, ordered by how much they would change the death). Read the log rows of the last 30 seconds and say what the planner rated and why it chose the goal it chose, whether it was walking toward a boss, what the dash prompt scored, and which picks built the weapon core (count weapons at 1/8, passives, max hp, damage dealt per weapon). Check whether chests were listed and left unopened, and which hp cliffs cost the most. Compare with the previous full run on the same seed, and check whether its stated cause (for example chip damage at 2:00) still holds. Treat time lived after 20:00 as a bonus: judge the run by whether it won and by damage and weaknesses before 20:00, and note what the next ladder level will make worse.

## Your prompts

Your three prompts (experiments.md, full-run.md and reflect.md) are how you work. Look at what the loop did: which iterations taught something and which were wasted (including iterations lost to unusable replies or infrastructure failures), where you guessed instead of testing, and where your full run went against the evidence. Check that experiments aimed at the ladder level the next run plays, were played live, and aimed at where the run actually died or took damage. Flag any belief measured under lockstep or on gyms that do not match the real run. Check whether the rehearsal overstated how reliable the playbook was, whether the loop covered every area, and whether games went to variants that only reworded a prompt or retuned a knob already refuted. Prefer continuous metrics (damage dealt, hp, chests, elites at 2:00) when the base rate is low. Count how many experiments reached 5 seeds per arm. One full run is one data point: weigh it against the training games across seeds before changing course. Rewrite the prompts so the next loop works better. Keep every ## section, and keep them short.

## Beliefs and gyms

Update the beliefs the full run bears on. Keep the gyms that will matter next loop, and retire the rest.
