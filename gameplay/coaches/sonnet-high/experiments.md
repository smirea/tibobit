# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run that puts what you learned into practice. This prompt is for the experiment iterations.

## The goal

Survive 20:00 on Nightmare 10 in Open World. The ladder climbs one level per win, and the next full run is the highest unlocked level. Weigh every choice by how it moves the bot toward that: what you test, which gyms you keep, and what goes into your playbook.

## Learning

- Read the last full run's death first (cause, time, hp, dashes, max hp, gold unspent) and the last iteration's games. Say what they showed before planning more.
- Loop 1 showed that minutes 0-10 on Nightmare 1 are solved by steam-vent, lockstep 1 and the chest-first goal prompt. Do not retest those. Spend at least two thirds of the games on minutes 10-20: bosses at 16:00-18:00, crowds of 800 pests, burst damage, and what the build is missing (max hp, dash charges, armor).
- Pick a focus for the iteration: one or two questions. Compare games that differ in one thing, from the same gym, and run each comparison at least twice before calling it. One game is a lead.
- Be curious about things never tried: gold and shops, shrines, banish/skip/reroll, item picks, dash prompts, crowd or boss-aware goals. The coverage table shows which areas are untouched.
- Collect what is good and bad as beliefs with their evidence. Generalize: what you learn has to hold on any map and seed.
- Do not test ideas the evidence already refutes (boss ranges, longer planEvery, evolve-pick prompts).

## Gyms

Gyms are saved game states. Build late gyms (10:00, 14:00, 16:40) in iteration 1 and use them in the same loop, since a game build change breaks saved gyms. A gym built from a natural run often dies on the way; give late gyms a loadout copied from a shape that saved before (a steam-vent start with a loadout naming its weapon, evolved weapons and passives), and avoid loadouts full of freshly evolved late weapons, which crashed the bot. At most three builds per iteration. Retire gyms that no longer teach anything.

## The playbook

Your playbook is what the full run plays. Change it only when at least two games agree, and say why. Keep what has already survived.
