# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run. This prompt is for the experiment iterations.

## The goal

Survive 20:00 on Nightmare 10 in Open World. The ladder climbs one level per win; the next full run plays the highest unlocked level, which is Nightmare 2 (won up to Nightmare 1). Time after 20:00 does not count. Every game is played live; lockstep is banned. Weigh every choice by how it moves the bot toward 20:00 on Nightmare 2.

## Learning

- Read the last full run first: cause, time, hp, dashes, goals and the planner's ratings in the last 30 seconds, and which rows lost the most hp. The last two live full runs (both seed TIBO10) died at 2:15 and 2:25. The 2:25 run took -56 hp in a 16 s elite fight at 82% hp, then abandoned the 3 chests it dropped because hp was under 50% and evade was rated 76%. It reached the 2:00 Mascot with six 1/8 weapons, no passives and no evolution, and the dash prompt never passed 0.5 until every move was lethal.
- Live play of the unchanged playbook survives 5:00 on only about 5 of 20 fresh NM2 seeds. Everything measured under lockstep is a lead only.
- Evidence rules: at least two thirds of games on fresh live NM2 starts, paired on the same seeds, at least 5 seeds per arm. Beating the baseline means at least 4 of 5 alive at 5:00 with an evolution by about 2:30. One game is a lead. Do not train on seed TIBO10 (the full-run seed).
- Stop spending games on what is already refuted live: hurt-prompt variants, extraDamage 0, early armor, explore 600, free-spot goals, Hot Streak pick prompts, Steam Vent commit picks, avoid-on-dash prompts, Mascot evade package, start-weapon swaps, long planEvery. Games that only reword a prompt teach nothing.
- Priority order (mechanisms seen in the logs): (1) chest before evade: a chest within about 150 units with no boss within 200 outranks evade at any hp; check it does not raise deaths at low hp; (2) boss dash knobs (dashThreshold, bossDashThreshold, bossDashRange, now in the bot): for example bossDashThreshold 0.25 with range 150; measure dashes spent on the Mascot and its damage; (3) weapon-focus picks: level the strongest held weapon, at most 3 weapons, catalyst at max-1, no on-dash weapons; the earlier commit test used Steam Vent only; (4) elite gating: elite fights only above about 85% hp and with few enemies near, and nests before wandering elites; (5) only when the opening lives 4 of 5, the later stretch.
- Cover every area (build, items, spots, enemies, bosses, hazards, movement, economy, map, models) over a loop; the loop requires a game for an area untested this loop or the last. Record beliefs (good, bad, fact) with evidence and say whether it was live.
- Close every experiment with a verdict before the full run and carry it into beliefs.csv.

## Gyms

Gyms are saved game states built live from a fresh playbook game in 5-minute stages. Build them early and use them in the same loop, since a game build change breaks saved gyms. Late gyms built with swapped loadouts are unrealistic; keep only live opening gyms (nm2-live-pre-mascot-b, nm2-live-min5) and retire the rest. At most three builds per iteration.

## The playbook

Your playbook is what the full run plays. Change it only on evidence that the change beats the current playbook in training from 0:00 on fresh seeds: name the confirmed experiments. Before the full run the loop plays the last full run's playbook against yours on the same fresh seeds and keeps the old one if yours does worse.

# Full run

This is iteration 10: the bot plays one whole game live with your playbook, on the evaluation seed, in a freshly loaded tab. The rehearsal has settled the playbook; this call gives every experiment of the loop its verdict and writes the intent.

## The goal

Survive 20:00. A win moves your Nightmare ladder up one level, and the campaign ends at a win on Nightmare 10. Time after 20:00 does not matter.

## Choosing the playbook

The playbook was settled before this call: changes went in only on confirmed experiments with fresh-seed games and survived the rehearsal against the last full run's playbook. In the intent, say what the run plays, which experiments support each change, and what to watch for (first chest and elite times, hp at 2:00, whether chests were opened before evading, dashes used on the Mascot). The baseline is steam-vent, the chest-first goal text with the 10:00 gold rule, default picks and the current knobs; it lives roughly 1 of 5 live on NM2 and died on this seed at 2:15 and 2:25.

## Generalizing

The evaluation seed is fixed so full runs can be compared. Do not tune anything to its map or to what happened on it: the playbook has to win on any seed. Judge it on training results across seeds; one full run is one data point.

# Reflect

The full run is over. Review it, then look back over the whole loop and at your own prompts.

## The review

Write these sections: **Summary** (what happened and how far it got; say whether the run won and what ladder level is next), **What worked**, **What failed** (with game times and log rows: hp, max hp, dashes, goals active, gold unspent), **Moments** that decided the run, and **Next loop** (what the next nine iterations should learn, ordered by how much they would change the death). Read the log rows of the last 30 seconds and say what the planner rated and why it chose the goal it chose, what the dash prompt scored, and which picks built the weapon core (count weapons at 1/8, passives, max hp). Check whether chests were listed and left unopened, and which hp cliffs cost the most. Compare with the previous full run on the same seed. Treat time lived after 20:00 as a bonus: judge the run by whether it won and by damage and weaknesses before 20:00, and note what the next ladder level will make worse.

## Your prompts

Your three prompts (experiments.md, full-run.md and reflect.md) are how you work. Look at what the loop did: which iterations taught something and which were wasted, where you guessed instead of testing, and where your full run went against the evidence. Check that experiments aimed at the ladder level the next run plays, were played live, and aimed at where the run actually died or took damage. Flag any belief measured under lockstep or on gyms that do not match the real run. Check whether the rehearsal overstated how reliable the playbook was, whether the loop covered every area, and whether games went to variants that only reworded a prompt. Count how many experiments reached 5 seeds per arm. One full run is one data point: weigh it against the training games across seeds before changing course. Rewrite the prompts so the next loop works better. Keep every ## section, and keep them short.

## Beliefs and gyms

Update the beliefs the full run bears on. Keep the gyms that will matter next loop, and retire the rest.
