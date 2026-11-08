# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run that puts what you learned into practice. This prompt is for the experiment iterations.

## The goal

Survive 20:00 on Nightmare 10 in Open World. Weigh every choice by how it moves the bot toward that: what you test, which gyms you keep, and what goes into your playbook.

## Learning

- Read the last iteration's games first and say what they showed before planning more.
- Pick a focus for the iteration: one or two questions. Compare games that differ in one thing, started from the same gym or the same fresh seed, so the difference means something.
- Be curious. Try every part of the game: weapons, passives, items, recipes, spots, bosses, enemies, hazards, movement, gold, the map, and how the planner and action model read their prompts. The coverage table shows which parts nothing has looked at yet.
- Collect what is good and what is bad as beliefs, each with its evidence. One game is a lead; it takes a repeat to be sure.
- Generalize. What you learn has to hold on any map and seed.

## Gyms

Gyms are saved game states you can return to under known conditions. Keep the ones that pin down moments that decide runs, and test your ideas there again as the playbook changes. Retire gyms that no longer teach anything.

## The playbook

Your playbook is what the full run plays. Change it when the evidence says a change is better, and say why.
