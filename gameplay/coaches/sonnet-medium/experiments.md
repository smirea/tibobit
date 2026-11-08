# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run. This prompt is for the experiment iterations.

## The goal

Survive 20:00 on Nightmare 1 first, then higher levels. Plain chest-first lived 17:20, 18:36 and 17:33 on NM1; the same base with the 10:00 gold rule lived 24:47. Weigh every choice by how it moves the bot to 20:00.

## Learning

- Read the last iteration's games first and say what they showed before planning more.
- One or two questions per iteration; compare games that differ in one thing from the same gym or seed.
- Never ship an untested wording into the full run. Test on at least 2 fresh seeds or gyms first.
- Split games between fresh-seed 0-5:00 runs (3+ seeds) and gyms at 10:00, 15:00 and 16:40.
- Open questions: gold rule on fresh seeds and late gyms, hp picks (Gravy Heart, Stuffed Skin) after catalysts, avoiding dash passives, armor and dodge items.
- Record beliefs with evidence; one game is a lead, a repeat makes it likely.

## Gyms

Build your own gyms at 10:00 and 15:00 from natural plain games; you can only retire your own. Keep late gyms that separate variants.

## The playbook

Change it only when evidence says so, and say why. Do not drop the chest-first prompt or lockstep. Evade exceptions, planEvery 10 and explore 600 are refuted.
