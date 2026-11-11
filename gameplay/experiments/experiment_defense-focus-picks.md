# Does a focus-and-defense planner.pick raise survival and evolutions?

| Field | Value |
| --- | --- |
| Status | done |
| Area | models |
| Result | inconclusive |
| Created | L2.I5 |
| Updated | L2.I8 |

## Hypothesis

A pick prompt that orders catalyst or recipe parts first, then level-ups of held weapons, then armor and health passives, and takes a new weapon only with fewer than 4 held, gives a sturdier, less scattered build than the default pick text. This should help seeker-sprouts survive the 2:00-3:30 window, in the way the item bundle did.

## Method

Fresh seeker-sprouts, 300 s, with the opening knobs on. Start on seed 33 (compare L2.I4.G1, died 3:05). Add seeds 32 and 34 next, paired with L2.I4.G2 and the knobs game on seed 34. Read picks, number of weapons at 1/8, armor and max HP, evolution time, damage taken and death time.

## Findings

One game (seed 33) died at 2:43 with no chest ever listed, so the pick text was barely tested. Superseded by the catalyst-first pick test in pick-catalyst-prompt.

## Games

### L2.I5.G4: focus+defense pick, knobs, seed 33

- Start: a fresh game on Nightmare 1 with seeker-sprouts, seed 33; 300s; plays the playbook with distrustSeconds 10, forecastSeconds 1, its own planner.pick.
- Outcome: died after 163.1s (game clock 02:43); damage taken 159 (enemy:oil-drip 9.258, enemy:crumb-ant 19.506, enemy:aphid 17.757, enemy:potato-beetle 5.726); 261 kills; level 1 to 7; planner asked 55 times, action model 427; the models saw the game 32 ms late (p90 51); ended with seeker-sprouts 5, fertilizer 1, peel-out 1.
- run.timeSec: 163.133
- run.level: 6
- run.kills: 261
- run.damageBySource: seeker-sprouts 4366.617
- run.damageTakenBySource: enemy:oil-drip 9.258, enemy:crumb-ant 19.506, enemy:aphid 17.757, enemy:potato-beetle 5.726, Hot oil 14, enemy:ketchup-drop 11.429, enemy:tomato-leech 2.944, enemy:lint-bunny 16.588, enemy:sock-pile 5.536, enemy:fry-fly 14.022, boss:amusing 42.133
- run.killsBySource: seeker-sprouts 261
- run.biomes: ["fry-oil-desert","ketchup-bog","coin-laundromat","mash-swamp","chip-canyons","peel-forest"]
- run.distance: 9942.423
- run.dodgePoints: 1287.245
- run.dodgeSecond: 163
- run.dodgeTaken: [59.5123779004709,59.5123779004709,59.5123779004709,59.5123779004709,59.5123779004709,59.5123779004709,59.5123779004709,59.5123779004709,62.83864456713757,62.83864456713757,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,65.05615567824867,70.92482581796044,73.85916088781632,73.85916088781632,73.85916088781632,75.35916088781632,75.35916088781632,75.35916088781632,75.35916088781632,75.35916088781632,75.35916088781632,75.35916088781632,75.35916088781632,75.35916088781632,75.35916088781632,75.35916088781632,90.79800369746756,145.59532600742946,50.631916815946134,52.696741320582724,52.696741320582724,52.696741320582724,52.696741320582724,52.696741320582724,52.696741320582724,52.696741320582724,52.696741320582724,56.902997757628725,59.5123779004709,59.5123779004709,59.5123779004709,59.5123779004709,59.5123779004709,59.5123779004709,59.5123779004709,59.5123779004709,59.5123779004709]
- run.dodgeSteps: [740.3523333332785,746.552333333281,752.7523333332836,758.9523333332861,765.1523333332887,771.3523333332903,777.5523333332924,783.7523333332949,789.9523333332975,796.1523333333,802.3523333333026,808.5523333333051,814.7523333333077,820.9523333333087,827.1523333333058,833.3523333333029,839.5523333333,845.7523333332971,851.9523333332942,858.1523333332913,864.3523333332884,870.5523333332854,876.7523333332825,882.9523333332796,889.1523333332767,895.3523333332738,901.5523333332709,907.752333333268,913.9523333332651,920.1523333332622,926.3523333332593,932.5523333332563,938.7523333332534,944.9523333332505,951.1523333332476,957.3523333332447,963.5523333332418,968.6156666665727,974.8156666665698,981.0156666665669,987.215666666564,993.415666666561,622.5523333332843,628.7523333332814,634.9523333332785,641.1523333332756,647.3523333332777,653.5523333332802,659.7523333332828,665.9523333332853,672.1523333332855,678.3523333332862,684.5523333332877,690.7523333332861,696.9523333332833,703.1523333332804,709.3523333332774,715.5523333332746,721.752333333274,727.9523333332734,734.1523333332759]
- run.curseSince: 5771
- run.killer: "boss:amusing"
- run.goldEarned: 28.035
- run.peakEnemies: 116
- run.grokBotHelps: 3
- counters.kills: 261
- counters.hits: 318
- counters.gems: 91
- counters.coins: 24
- counters.shots: 328
- counters.hostileShots: 278
- counters.nearMisses: 17
- counters.hostileHits: 5
- Gold, spots and chests: gold held at the end 28, spent 0; spots charged and used: Crop Patch 1; chests seen 0, opened 0.
