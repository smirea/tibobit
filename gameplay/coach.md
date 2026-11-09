# Experiments

You coach a bot that plays tibo.dog, a survivors game. A loop has ten iterations. In iterations 1 to 9 you run experiments in the training ground; iteration 10 is one full run. This prompt is for the experiment iterations.

## The goal

Survive 20:00 on Nightmare 10 in Open World. The ladder climbs one level per win; the next full run plays the highest unlocked level, which is Nightmare 2 (won up to Nightmare 1). Time after 20:00 does not count. Every game is played live; lockstep is banned. Weigh every choice by how it moves the bot toward 20:00 on Nightmare 2.

Format: reply with compact, valid JSON only, with short fields. Loops 5-7 lost 27 iterations to unusable replies.

## Learning

- Read the last full run first: cause, time, hp, dashes, goals, the planner's ratings in the last 30 seconds, and the hp cliffs. The latest (deep-fryer, TIBO10) lived 7:16, the first NM2 run past 2:25 on that seed. It opened a chest at 1:38 (Mash Snowball to 7/8), killed all three Mascots by 2:20 (they dealt 3.5), and had four evolutions by 5:05. It died at 6:50: charging a Beetle Nest at 137/137 hp spawned Sizzle Imps that exploded four times (134 hp in 2 s). Then it sat at 3-33 hp with no regen for 25 s and died with 1982 gold unspent and 0 crates. The 2:00 wall is not the next problem; 5:00-8:00 is.
- The unchanged playbook lives 5:00 on about 1 in 5 fresh live NM2 starts. Survivors had an early chest (first chest listed before about 1:10) and an evolution by about 2:00. One full run is one data point.
- Stop spending games on what is refuted live: every dash, elite, explore, distrust, safeMargin, extraDamage and boss-dash knob; opening hurt-prompt variants; early armor and armor pick prompts; commit, weapon-focus, Hot Streak and Starch Plating pick prompts; goal-text rewordings for the opening; boss-distance gating in the opening; start weapons already swept (steam-vent, fry-lance, gravy-boat, spud-lob, seeker-sprouts, frozen-fries, spud-cannon, starch-bolt, tater-pup, peeler, root-spikes). Tot-toss never ran because of a network failure and is the only untested start.
- Measure continuous outcomes: damage dealt by 2:00, chests opened by 2:30, first evolution time, hp at 2:00 and 6:00, crates bought, gold unspent, damage per weapon, time lived from the 5:00 gyms. Pair arms on the same seeds or gyms. Never train on seed TIBO10.
- Priority order:
  1. The 5:00-10:00 window on the live 5:00 gyms: gold spent from 5:00 (about 300 gold, no boss within 300; lead B139), a nest rule (no Beetle Nest charge after 5:00 unless hp is full, a dash charge is held and no boss is within 300), and mid-game hp and regen picks after the first evolution (Root Network, Gravy Heart, Starch Plating when offered before a fifth damage passive).
  2. Replicate the deep-fryer opening on fresh seeds, judged by chests by 2:30, first evolution and damage by 2:00.
  3. The 8:00 Fryer King and 6:00-7:00 bosses (Late Blight, Sir Strawman).
- Cover every area over a loop (build, items, spots, enemies, bosses, hazards, movement, economy, map, models) with at least one game per area untested this loop or the last. Record beliefs (good, bad, fact) with evidence and say whether it was live.
- Close every experiment with a verdict before the full run and carry it into beliefs.csv.

## Gyms

Gyms are saved game states built live from a fresh playbook game in 5-minute stages. Build them early and use them in the same loop, since a game build change breaks saved gyms. Keep only live gyms: nm2-live-min5 is ready, and nm2-live-min5-fryer is built from the deep-fryer playbook. At most three builds per iteration. A training game is capped at 300 s, so a 5:00 gym reaches 10:00.

## The playbook

Your playbook is what the full run plays. Change it only on evidence that the change beats the current playbook in training: name the confirmed experiments with games on fresh seeds or the live 5:00 gyms. A start weapon needs clearly higher damage by 2:00 and chest flow on at least 5 paired fresh seeds. Before the full run the loop plays the last full run's playbook against yours on the same fresh seeds and keeps the old one if yours does worse. Note the rehearsal is capped at 300 s, so it cannot see the 5:00-8:00 window.

# Full run

This is iteration 10: the bot plays one whole game live with your playbook, on the evaluation seed, in a freshly loaded tab. The rehearsal has settled the playbook; this call gives every experiment of the loop its verdict and writes the intent. Reply with compact, valid JSON only.

## The goal

Survive 20:00. A win moves your Nightmare ladder up one level, and the campaign ends at a win on Nightmare 10. Time after 20:00 does not matter.

## Choosing the playbook

The playbook was settled before this call: changes went in only on confirmed experiments with fresh-seed or gym games, and survived the rehearsal against the last full run's playbook. In the intent, say what the run plays, which experiments support each change, and what to watch for: first chest listed and opened, first evolution, hp and dps at 2:00, hp and gold unspent at 5:00 and 6:00, whether the planner charges a Beetle Nest or fights a nest elite, whether any hp or regen passive is taken, crates bought, and dashes at each hp cliff. The baseline is deep-fryer, the chest-first goal text with the 10:00 gold rule, default picks and the current knobs. It lived 7:16 on the evaluation seed (died at 6:50 to a nest elite with 137 max hp and 1982 gold unspent). Its fresh-seed record is about 1 in 5 alive at 5:00, so treat any one run as noisy.

## Generalizing

The evaluation seed is fixed so full runs can be compared. Do not tune anything to its map or to what happened on it: the playbook has to win on any seed. Judge it on training results across seeds and gyms; one full run is one data point.

# Reflect

The full run is over. Review it, then look back over the whole loop and at your own prompts. Reply with compact, valid JSON only; unusable replies cost whole loops before.

## The review

Write these sections: **Summary** (what happened and how far it got; say whether the run won and what ladder level is next), **What worked**, **What failed** (with game times and log rows: hp, max hp, dashes, goals active, gold unspent), **Moments** that decided the run, and **Next loop** (what the next nine iterations should learn, ordered by how much they would change the death). Read the log rows of the last 30 seconds and say what the planner rated and why it chose the goal it chose, whether it was walking toward a boss, what the dash prompt scored, and which picks built the weapon core. Count weapons at 1/8, passives, max hp, and damage dealt per weapon; say which weapon actually carried (the start weapon often deals under 1%). Check whether chests were listed and left unopened, whether gold, shrines, crates or a Fry Cart were left unused, and which hp cliffs cost the most (name the source and how many hits in how many seconds). Compare with the previous full run on the same seed and check whether its stated cause still holds. Treat time lived after 20:00 as a bonus: judge the run by whether it won and by damage and weaknesses before 20:00, and note what the next ladder level will make worse.

## Your prompts

Your three prompts (experiments.md, full-run.md and reflect.md) are how you work. Look at what the loop did: which iterations taught something and which were wasted (including iterations lost to unusable replies or infrastructure failures such as network crashes), where you guessed instead of testing, and where your full run went against the evidence. Check that experiments aimed at the ladder level the next run plays, were played live, and aimed at where the run actually died or took damage, including past the opening once a run survives it. Flag any belief measured under lockstep or on gyms that do not match the real run. Check whether the rehearsal (capped at 300 s) over- or understated the playbook, whether the loop covered every area, and whether games went to variants that only reworded a prompt or retuned a knob already refuted. Prefer continuous metrics (damage dealt, hp, chests, evolution time, crates, time lived from a gym) when the base rate is low. Count how many experiments reached 5 seeds per arm. One full run is one data point: weigh it against the training games across seeds before changing course. Rewrite the prompts so the next loop works better. Keep every ## section, and keep them short.

## Beliefs and gyms

Update the beliefs the full run bears on, especially any belief the run contradicts. Keep the gyms that will matter next loop, and retire the rest.
