# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run that puts what you learned into practice. This prompt is for the experiment iterations.

## The goal

Survive 20:00 on Nightmare 10 in Open World. The ladder climbs one level per win; the next full run plays the highest unlocked level, which is Nightmare 2 (won up to Nightmare 1). Time after 20:00 does not count. Every game is played live: the game does not pause for the models, and lockstep is banned. Weigh every choice by how it moves the bot toward 20:00 on Nightmare 2 and then the levels after it.

## Learning

- Read the last full run's death first (cause, time, hp, dashes, gold unspent, the goal and the planner's reasons in the last 20 seconds) and say what it showed before planning games. The L3 full run died at 2:15 to the 2:00 Festival Mascot at 57-76 hp, with Steam Vent 1/8, no evolution and the planner choosing Explore with the boss 45 units away.
- Treat every result measured under lockstep as a lead only, including all late NM2 gym results and the 5 of 5 early survival. Live, the playbook survived 5:00 on 1 of 6 fresh NM2 seeds. Rechecking lockstep beliefs live is the first job.
- Spend at least two thirds of the games on fresh live NM2 starts or on gyms built live from a fresh start. Pair every comparison on the same seeds and use at least 5 seeds per arm before calling it. Beating the 1 of 6 baseline means at least 4 of 5 alive at 5:00. One game is a lead.
- Priority order: (1) the 2:00 Mascot and early boss handling: a boss-adjacent evade exception in the goal text, a boss-slam dash prompt, no elite fights below about 70% hp in 1:30-2:00; (2) pick commitment: level the starting weapon to 8 then take its catalyst, at most 3 weapons, no on-dash weapons, tested live on 5 or more seeds; (3) opening routing, meaning what explore finds and how early the first chest and elite come; (4) starting weapon live; (5) only when the opening survives 4 of 5 seeds, the 6:00-20:00 stretch.
- Keep a regression set of fresh seeds that starved early (no chest by 3:00) and play every candidate opening change on them as well as on new seeds: 1919, 2020, 2121 and 1313 starved under chest-first on Nightmare 1.
- A ready-made pick prompt to test live, written by a second coach that ran beside you until loop 4 and measured only under lockstep (its full run died at 4:57 with a scattered build): "Tibo is at a {{choice}}. Commit to the starting weapon's evolution: level Steam Vent every time it is offered and take its catalyst Root Network as soon as it is shown. Never take Masher Grip, Gravy Splash, Sprouting Eyes, Mash Landing or other dash weapons early. Prefer Gravy Heart, Butter Pat, Hot Sauce and Starch Plating over fillers. Never take Reroll or Skip when a useful card is shown. Once Steam Vent has evolved, pick damage and max hp passives."
- Explore the whole game, not one corner of it. Every loop, test each of build, items, economy, bosses, movement, spots and models: the loop requires a game for an area no game has tested this loop or the last before anything else. Record what works and what does not as beliefs (good, bad or fact).
- Test ideas that change what the bot does: a different rule, knob, pick, route, weapon or build. Two arms that say the same thing in other words teach nothing; the loop turns away games a few words apart.
- Generalize across maps and seeds. Record beliefs with their evidence and mark which were measured live.
- Do not repeat what the evidence has already refuted: boss ranges, long planEvery, permissive dash prompts, avoid-on-dash-weapon prompts without a commitment rule, evolve-pick prompts, distrustSeconds, evade-everything goal texts that starve chests.

## Gyms

Gyms are saved game states built live in 5-minute stages by playing a fresh game with your playbook; a death replays that stage. Build live opening gyms early, such as a state at about 1:45 that the playbook reaches alive and a state at 5:00, in iteration 1 and use them in the same loop, since a game build change breaks saved gyms. Late gyms built under lockstep are unrealistic; retire them. At most three builds per iteration. Hold gyms around the times full runs die, so the moment that ended the last run can be replayed under known conditions while the playbook changes. Each gym lists the iterations it was used in; retire gyms that no longer teach anything.

## The playbook

Your playbook is what the full run plays. Change it only on evidence that the change beats the current playbook in training, including games from 0:00 on fresh seeds: name the confirmed experiments that show it. Before the full run the loop plays the last full run's playbook against yours on the same fresh seeds and keeps the old one if yours does worse. Close every experiment you played this loop with a verdict (confirmed, refuted or inconclusive) before the full run, and carry its result into beliefs.csv.

# Full run

This is iteration 10: the bot plays one whole game live with your playbook, on the evaluation seed, in a freshly loaded tab. The rehearsal has settled the playbook; this call gives every experiment of the loop its verdict and writes the intent.

## The goal

Survive 20:00. A win moves your Nightmare ladder up one level, and the campaign ends at a win on Nightmare 10. Time after 20:00 does not matter.

## Choosing the playbook

The playbook was settled before this call: changes went in only on confirmed experiments with fresh-seed games, and the rehearsal kept them only if they did no worse than the last full run's playbook on the same seeds. Say in the intent what the run plays and what training supports it. The baseline it replaced was steam-vent, the chest-first goal text with the 10:00 gold rule, default picks and the current knobs; it won Nightmare 1 under lockstep and lives roughly 1 of 6 live on NM2.

## Generalizing

The evaluation seed is fixed so that full runs can be compared. Do not tune anything to its map or to what happened on it before: the playbook has to win on any seed. Judge the playbook on training results across seeds; one full run is one data point.

# Reflect

The full run is over. Review it, then look back over the whole loop and at your own prompts.

## The review

Write these sections: **Summary** (what happened and how far it got; say whether the run won and what ladder level is next), **What worked**, **What failed** (with game times and log rows: hp, max hp, dashes, goals active, gold unspent), **Moments** that decided the run, and **Next loop** (what the next nine iterations should learn, ordered by how much they would change the death). Read the log rows of the last 30 seconds and say what the planner rated and why it chose the goal it chose, what the dash prompt scored, and which picks built the weapon core. Treat time lived after 20:00 as a bonus: judge the run by whether it won and by damage and weaknesses before 20:00, and note what the next ladder level will make worse.

## Your prompts

Your three prompts (experiments.md, full-run.md and reflect.md) are how you work. Look at what the loop did: which iterations taught something and which were wasted, where you guessed instead of testing, and where your full run went against the evidence. Check that the experiments aimed at the ladder level the next run plays, were played live, and aimed at where the run actually died or took damage. Flag any belief measured under lockstep or on gyms that do not match the real run. Check whether the rehearsal overstated how reliable the playbook was, whether the loop covered every area, and whether games went to variants that only reworded a prompt. One full run is one data point: weigh it against the training games across seeds before changing course. Rewrite the prompts so the next loop works better. Keep every ## section, and keep them short.

## Beliefs and gyms

Update the beliefs the full run bears on. Keep the gyms that will matter next loop, and retire the rest.

