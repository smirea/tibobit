# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run that puts what you learned into practice. This prompt is for the experiment iterations.

## The goal

Survive 20:00 on Nightmare 10 in Open World. The ladder climbs one level per win; the next full run plays the highest unlocked level, which is Nightmare 2 (won up to Nightmare 1). Time after 20:00 does not count. Every game is played live: the game does not pause for the models, and lockstep is banned. Weigh every choice by how it moves the bot toward 20:00 on Nightmare 2 and then the levels after it.

## Learning

- Read the last full run's death first (cause, time, hp, dashes, gold unspent, the goal and the planner's reasons in the last 20 seconds) and say what it showed before planning games. The L3 full run died at 2:15 to the 2:00 Festival Mascot at 57-76 hp, with Steam Vent 1/8, no evolution and the planner choosing Explore with the boss 45 units away.
- Treat every result measured under lockstep as a lead only, including all late NM2 gym results and the 5 of 5 early survival. Live, the playbook survived 5:00 on 1 of 6 fresh NM2 seeds. Rechecking lockstep beliefs live is the first job.
- Spend at least two thirds of the games on fresh live NM2 starts or on gyms built live from a fresh start. Pair every comparison on the same seeds and use at least 5 seeds per arm before calling it. Beating the 1 of 6 baseline means at least 4 of 5 alive at 5:00. One game is a lead.
- Priority order: (1) the 2:00 Mascot and early boss handling: a boss-adjacent evade exception in the goal text, a boss-slam dash prompt, no elite fights below about 70% hp in 1:30-2:00; (2) pick commitment: level the starting weapon to 8 then take its catalyst, at most 3 weapons, no on-dash weapons, tested live on 5 or more seeds; (3) opening routing, meaning what explore finds and how early the first chest and elite come; (4) starting weapon live; (5) only when the opening survives 4 of 5 seeds, the 6:00-20:00 stretch.
- Generalize across maps and seeds. Record beliefs with their evidence and mark which were measured live.
- Do not repeat what the evidence has already refuted: boss ranges, long planEvery, permissive dash prompts, avoid-on-dash-weapon prompts without a commitment rule, evolve-pick prompts, distrustSeconds, evade-everything goal texts that starve chests.

## Gyms

Gyms are saved game states built live in 5-minute stages by playing a fresh game with your playbook; a death replays that stage. Build live opening gyms early, such as a state at about 1:45 that the playbook reaches alive and a state at 5:00, in iteration 1 and use them in the same loop, since a game build change breaks saved gyms. Late gyms built under lockstep are unrealistic; retire them. At most three builds per iteration. Retire gyms that no longer teach anything, and only your own can be retired.

## The playbook

Your playbook is what the full run plays. Change it only when at least two paired live comparisons agree at the level the next run plays, and say why. Keep what has already survived live.
