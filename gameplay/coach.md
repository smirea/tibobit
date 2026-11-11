# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run that puts what you learned into practice. This prompt is for the experiment iterations.

## The goal

Survive 20:00 on Nightmare 20 in Open World. The ladder climbs one level for every full run that wins, so the playbook has to keep getting stronger: what wins Nightmare 1 will not win Nightmare 20. Weigh every choice by how it moves the bot toward that: what you test, which gyms you keep, and what goes into your playbook.

## Learning

- Read the last iteration's games first and say what they showed before planning more.
- Pick a focus for the iteration: one or two questions. Compare games that differ in one thing, started from the same gym or the same fresh seed, so the difference means something.
- Be curious. Try every part of the game: weapons, passives, items, recipes, spots, bosses, enemies, hazards, movement, gold, the map, and how the planner and action model read their prompts. The coverage table shows which parts nothing has looked at yet.
- Collect what is good and what is bad as beliefs, each with its evidence. One game is a lead; it takes a repeat to be sure.
- Generalize. What you learn has to hold on any map and seed.

## Explore first

Before you settle on a build, find out what the game has. The facts list every base weapon and passive and how many games have held each. Until none is left untried, the loop asks every iteration to try several of them, as a game's starting weapon or in its loadout.

- Try each weapon and passive where you can tell what it did. The results give damage dealt and kills by weapon; a passive shows only against the same game without it, so start both from the same gym or seed.
- Write down what each one does in play as a belief: how much it deals, how it scales with levels, what it needs from movement, and where it is weak. Read the encyclopedia for its recipe and try the evolution too.
- Keep trying more: combinations, evolutions and unions, items, builds for the early minutes against builds for the late ones. A thing that looked weak alone can be the catalyst of the strongest build.
- Then refine. Put the best candidates against each other on higher Nightmare levels and later minutes, where weak builds stop working, and move the winners into the playbook.

## Gyms

Gyms are saved game states you can return to under known conditions. Keep the ones that pin down moments that decide runs, and test your ideas there again as the playbook changes. Retire gyms that no longer teach anything.

## The playbook

Your playbook is what the full run plays. Change it when the evidence says a change is better, and say why.

# Full run

This is iteration 10: the bot plays one whole game with your playbook, on the evaluation seed, in a freshly loaded tab. It is not a test. Put the best you know into practice.

## The goal

Survive 20:00. A win moves your Nightmare ladder up one level, and the campaign ends at a win on Nightmare 20.

## Choosing the playbook

Use what your beliefs and experiments support, not what you hope works. If two choices are equally supported, keep the one that has already played well.

## Generalizing

The evaluation seed is fixed so that full runs can be compared. Do not tune anything to its map or to what happened on it before: the playbook has to win on any seed.

# Reflect

The full run is over. Review it, then look back over the whole loop and at your own prompts.

## The review

Write these sections: **Summary** (what happened and how far it got), **What worked**, **What failed** (with game times and log rows), **Moments** that decided the run, and **Next loop** (what the next nine iterations should learn).

## Your prompts

Your three prompts (# Experiments, # Full run and # Reflect) are how you work. Look at what the loop did: which iterations taught something and which were wasted, where you guessed instead of testing, and where your full run went against the evidence. Rewrite the prompts so the next loop works better. Keep every ## section, and keep them short.

## Beliefs and gyms

Update the beliefs the full run bears on. Keep the gyms that will matter next loop, and retire the rest.
