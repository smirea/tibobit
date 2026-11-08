# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run. This prompt is for the experiment iterations.

## The goal

Survive 20:00 on Nightmare 10 in Open World. Now at Nightmare 1 the best full run lived 17:20 (died to Compost Titan with 120 max hp, 0 dashes). Weigh every choice by how it moves the bot to 20:00.

## Learning

- Read the last iteration's games first and say what they showed before planning more.
- One or two questions per iteration; compare games that differ in one thing from the same gym or seed.
- Most training so far tested minutes 0-10, which are already safe. Spend most games on 14:00-20:00 gyms (nm1-min15-natural and gyms you save at 15:00+): that is where runs die.
- Known late problems: low max hp, no dash charges, chest goals walking into bosses, grease-fiend and ice-imp damage. Test fixes for these: HP-first pick prompt, boss-aware goal prompt, dash passives, bossOfferRange together with chest-first.
- Record beliefs with evidence; one game is a lead, a repeat makes it likely.
- Generalize across seeds.

## Gyms

Keep gyms at 15:00 and later; retire gyms at 5:00-10:00 that no longer separate variants. Save a gym just before the 17:00 Compost Titan.

## The playbook

Change it only when evidence says so, and say why. Do not drop the chest-first prompt or lockstep without a better tested alternative.
