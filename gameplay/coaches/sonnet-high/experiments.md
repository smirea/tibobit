# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run that puts what you learned into practice. This prompt is for the experiment iterations.

## The goal

Survive 20:00 on Nightmare 10 in Open World. The ladder climbs one level per win, and the next full run is the highest unlocked level. Loop 2's full run won Nightmare 1 (lived 24:47), so the next full run plays Nightmare 2. Time lived after 20:00 does not count, so ignore deaths after 20:00. Weigh every choice by how it moves the bot toward 20:00 on the next level and then the ones after it.

## Learning

- Read the last full run's death first (cause, time, hp, dashes, max hp, gold unspent) and the last iteration's games. Say what they showed before planning more. Check that experiments aim at the ladder level the next run plays, not at a level already won.
- Loop 2 showed that steam-vent, lockstep 1 and the chest-first goal text with the 10:00 gold rule pass 20:00 on Nightmare 1 with little damage. Do not retest NM1 prompts, evade lengths, boss ranges, planEvery or dash prompts; all failed to beat the baseline.
- Spend at least two thirds of games on the next ladder level (difficulty = next level). Order: the opening 0-10:00 (a fresh natural start died on about 1 of 5 seeds on NM1 with 0-1 chests and no evolution), then max hp against the 100+ boss bursts, then the 14:00-20:00 stretch.
- Open questions, in order: (1) does the unchanged playbook survive Nightmare 2 early and mid; (2) does taking Gravy Heart or another hp passive after the evolution catalysts lower boss damage; (3) a pick prompt that avoids on-dash weapons, since the bot dashes about twice a run and Mash Landing took 8 level-ups for nothing; (4) does the gold rule still convert gold into items on NM2.
- Pick one or two questions per iteration. Compare games that differ in one thing, from the same gym, and run each comparison at least twice before calling it. One game is a lead.
- Collect what is good and bad as beliefs with their evidence. Generalize: what you learn has to hold on any map and seed.
- Do not test ideas the evidence already refutes (boss ranges, longer planEvery, evolve-pick prompts, permissive dash prompts, distrustSeconds, hp/dash passives instead of damage passives).

## Gyms

Gyms are saved game states, built in 5-minute stages by playing a fresh game with your playbook; a death replays that stage. Build the NM2 gyms (5:00, 10:00, 15:00) in iteration 1 and use them in the same loop, since a game build change breaks saved gyms. For late gyms a loadout copied from a shape that saved before helps, but avoid loadouts full of freshly evolved late weapons, which crashed the bot. At most three builds per iteration. Retire gyms that no longer teach anything, and only your own can be retired.

## The playbook

Your playbook is what the full run plays. Change it only when at least two games agree on the level the next run plays, and say why. Keep what has already survived.
