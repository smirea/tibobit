# tibobit

A Tampermonkey userscript for [tibo.dog](https://tibo.dog), poteto's survivors-like browser game. It shows which evolutions your current run can reach, annotates level-up and item cards with combo information, and lets a local program read the game state and play through an HTTP API.

## What it does

- **Combos panel, upper right.** One row per weapon, passive or item you hold that has no partner yet: `[NEW] [its icon] : [icons of everything it could pair with]`. Weapons list the catalysts they need, and passives and items list the weapons or items they would evolve. Something you already hold a partner for drops out of the list, and the header counts open rows, held pairs and pairs ready to evolve (hover it for the pairs). `NEW` and the pink dot mark results you have never made. A red X marks something you banished this run, which the game will not offer again. Hover an icon for its name, the level it needs, what it makes, and the game's own description of it. Click the header to collapse the panel.
- **Card annotations.** Every weapon, passive or item card lists all of its pairings as `[partner] → [result]`. A green outline means you hold the partner, yellow means you hold it below the level the recipe needs, and a faded icon means you don't have it. `READY` means picking the card finishes the recipe. A pink glow and `UNSEEN` badge mark a card you have never been offered, and a gold glow marks a card that pairs with something you hold into a result you have never made. Hover any icon on a card for the same tooltip as in the panel.

Icons come from the game's own sprite sheet. When the script cannot find a sprite, it shows the name's initials.

The recipe rules mirror the game's own code. A base weapon evolves at its max level (8) while you hold its catalyst (usually a passive, sometimes an item), and the evolution then drops from a chest. A union fuses two specific evolved weapons. An item evolves once its catalyst passive is at max level (5).

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) in Brave or Chrome. Manifest V3 browsers only run userscripts after you allow it. In `brave://extensions`, open Tampermonkey's **Details** and turn on **Allow user scripts**. On older Chromium versions that lack the toggle, turn on **Developer mode** instead.
2. Open <https://raw.githubusercontent.com/smirea/tibobit/master/dist/tibo-helper.user.js> and click **Install**. Tampermonkey checks the same URL for updates.

## Grok take the wheel

**Grok take the wheel**, under the agent port box, hands the game to the bot. The agent server starts `bot/main.ts` for the tab (`./agent-server/main.ts` must be running and `OPENROUTER_API_KEY` set). During a run the bot takes over where you are. On the title or end screen it starts a new run on Nightmare in the mode the game is on: the mode screen you have open, else the mode of the run you just played (an Open World run is followed by Open World), else today's Daily. It plays that one run with the playbook a coach of the learning loop updated last, then hands the wheel back. **I'll do it myself**, at the top of the bot's chat, stops it sooner and resumes the game at normal speed. To use other bot flags, start the server with `--pilot "<flags>"`, for example `--pilot "--model laya@q8_0"` for LM Studio.

While the bot plays, the combos panel folds to its header, the agent port row sits under it, then **I'll do it myself** with the **Plan** and **Action** boxes beside it, and under those the bot's decisions:

- **Plan** and **Action**, in seconds, set how often the planner is asked while a goal is under way (0.5 to 300 seconds in half-second steps, 5 by default) and how often the bot takes a step (0.1 to 5 seconds, 0.3 by default; real time). The bot reads them every step.
- **Incognito**, at the start of the agent port row, is left from an older loop: runs from the panel keep no notes either way. The CSV log in `/tmp/tibobit/` is always written.
- The browser remembers **Plan**, **Action** and **Incognito** (localStorage) and sends them to the agent server each time the tab connects, so they survive reloads and server restarts.
- **Plan**, pinned at the top, is the planner's latest decision with its game time: the card it took at a level-up, chest or shrine, and the goal it chose with the model's odds for it. Hover it to see, to the left of the panel, the cards and every goal it weighed with the model's odds as bars, the prompt (folded), and every earlier decision of the run; click one to open it.
- **Actions**, under the plan, are the latest actions as square icon tiles, newest first: the newest is a 3x3 tile in the corner, the one before it 2x2, and the rest flow around them, eight rows deep (no scrolling). A step is its arrow, red when the game forecast it hurts, with a lightning badge when it dashes. Anything else is an icon of what the bot went for: a compass for Wander (explore), a runner for Run (keep away from enemies), a gem for Gems, a chest for Loot, an apple for Eat and a crosshair for Hunt (an elite). Each kind of spot has its own icon: a monster for a Boss Lair, a beetle for a Beetle Nest, a crate for a Potato Crate, a cart for a Fry Cart, slot reels for Tater Slots, and so on. A plain pin is a spot kind the panel does not know yet. System lines get a play button for Start and a skull for Over. A goal that ends gets a badge: ✓ done, ✗ given up, or – dropped. Hover a tile for its details; the tiles hold still while the pointer is over them. For a goal, that is the planner's decision that chose it: every goal it weighed with the model's odds, the cards if it was a level-up, and the prompt. For a step, that is every move with the game's forecast and the model's hurt and usefulness bars beside its arrow, which move won or was ruled out, and the prompt at the end.

At a level-up, chest or shrine, the page shows the plan above the cards and the planner's odds as a bar above each card. An arrow glides along the top of the cards to the pick and bobs there, the pick lights up and then glows, and the bot takes it about 2 seconds after deciding. The choice freezes the game, so the show costs no game time. A bot started by hand, without the panel, does not wait.


The bot plays live: the game runs at normal speed the whole time, and each move is held until the next decision replaces it. The game only stops where it stops for a person, on level-up, chest and shrine choices. The page forecasts damage all through play on copies of the game, one move at a time in slices of a few milliseconds, so the game keeps its frame rate and the state stays as fresh as with the forecast off. While you have the game paused (Escape or P), no model is asked anything; the bot waits for you to resume.

## Agent API

The same userscript lets a program play the game. A local server exposes the game state and accepts commands, and the userscript relays both between the server and the tibo.dog tab.

```sh
./agent-server/main.ts     # listens on http://127.0.0.1:7357
bun run agent-server          # the same, restarting whenever its code changes
./cli/main.ts state       # the snapshot as a tree (game state under the game's own keys); a path such as game.loadout shows one part; --format json for raw
```

Keep one tibo.dog tab open with the userscript installed. It connects within a few seconds of the server starting and reconnects on its own, including to a run already in progress.

To use a server on another port, type the port into **Agent port** and press **Connect** (or Enter). The box sits at the bottom of the Combos panel during a run, and alone in the upper right on the title and other screens outside a run. The tab remembers the port. While the tab is connected, a pulsing green dot follows the box, and **Connect** reads "connected" until you type a different port. When it is not connected, the line under the box says whether it is still trying or was refused because another tab holds that server. Point the CLI at the same server with `./cli/main.ts --port <port> <command>`, or `--server <url>`, or `TIBO_SERVER`.

| Endpoint | What it does |
| --- | --- |
| `GET /state` | The game as a live game needs it (`LiveView` in `protocol/view.ts`), built by the server from the page's game state and the encyclopedia: `time`, `screen`, `world` (difficulty, biome and landmark, curses and the extra elites and bosses they add, the enemy `scale`, prices for a crate, a Fry Cart item, a Tater Slots spin and the Dog Kennel, the xp and gold on the ground, enemies on screen, the next boss, elite and event, timed boosts, recent events), `tibo` (life, level, gold, dash, status, rerolls, skips, banishes, revives, weapons, passives, items and dogs with the game's descriptions, stats, shrine totals, what the next chest evolves, recipes in reach, recent damage by source, damage dealt a second), `directions` (for each way and for standing still: enemies, the damage the game's own simulation says the move costs over `horizonMilliseconds` and its main sources, bullets coming from that side, hazards and attack zones it walks into, and the bosses, elites, chests, food, spots and pickups that lie that way by `id` and `type`), `attacks` (bullets that would hit a Tibo standing still, attack zones, volleys) and, while one is open, `choice` (by its kind, each option with the game action `choose` takes). `?raw=` adds the game's own state under `game`, by its own keys: `enemies`, `pickups`, `bullets`, `zones`, `world.activeHazards`, `run`, `counters`, `cfg` and the like, or `storage` (the game's own localStorage, such as `tibo.ladder.v1`), `surroundings`, `forecast`, or `all`; it is large and mostly noise for play. Beside them: `mode`, `gameBuild`, `lastRunLink` and the commands. |
| `GET /encyclopedia` | The game's content tables: weapons, passives, items, enemies, bosses, dogs, pois, events, botHelps and biomes, each entry the game's own definition with all its English lines (`name`, `desc` and the like), plus `messages`: the game's English for content kinds without a table, such as shrine stat labels and rarities, under the game's own keys. The run's rules are `game.cfg` in the state. |
| `POST /command` | Runs one JSON command. Add `?wait=1` to block until it finishes. |
| `WS /ws` | Pushes every snapshot as it arrives, with `?raw=` as for `/state`. Send a JSON command to run it. |

Commands, also available as `./cli/main.ts <verb>`:

- `{"type":"move","dir":"left","seconds":2}` holds a direction. `dir` is one of the eight compass words (`up-left` and so on) or degrees, where 0 is right and 90 is down. Without `seconds` it holds until the next movement command.
- `{"type":"goto","to":{"x":120,"y":-40}}` walks to a world position. `to` can also be `{"dx","dy"}` relative to where you stand, `{"poi":uid}` for a point of interest, or `{"pickup":uid}` for a chest or other pickup. `stay` holds still after arriving, either for a number of seconds or with `"done"` until the target is used up. Shrines, chests and most points of interest only open after you stand on them for their kind's seconds in `game.cfg.activation.seconds`, so `{"type":"goto","to":{"poi":16},"stay":"done"}` is the usual way to take one.
- `{"type":"choose","action":{"type":"pick","index":0}}` runs the game's own action on the open choice (`game.choiceQueue[0]`), as the game's `choose` takes it: `pick`, `banish` or `buy` with an index into the choice's `offers` or `stock`, or `reroll`, `skip`, `close`, `accept`, `continue` or `endRun`. It fails when the game does not take the action.
- `{"type":"forecast","live":true,"seconds":0.5}` keeps the snapshot's `forecast` coming while the game runs, and sets how far ahead it and `surroundings` look (0.1 to 2 seconds). Without it they only appear while the game is paused. `"lag": 0.3` is how many seconds pass between a snapshot and your move landing: a running game's forecast then first plays the movement command under way for that long, and only then each direction, so it predicts what the move will meet when it lands. The forecast runs off the snapshot's path, one move at a time on a fresh copy of the game, so each outcome carries the `tick` of its copy (in a crowd of 300 a round of nine takes about a quarter of a second). Beside the health a plan costs, each outcome has `dps`, the damage Tibo deals a second while the plan plays. `forecast.ahead` is the game played `lag` ahead from the snapshot's own tick: where Tibo will be, his dash charges, and the threats around that place. `"route": {"to": {"poi": 12}, "stay": 1.5}` prices whole trips to a place instead of single moves, in `forecast.routes`: straight there, a first move of `leg` seconds up to a quarter turn either side, standing still first, or a dash first while a charge is ready, each played until Tibo has stood on the place for `stay` seconds (or it is used up) or `seconds` have passed (4 until set, at most 6), with the health it costs and when it is done.
- `{"type":"dash","dir":"up"}`, `{"type":"stop"}`, `{"type":"pause"}`, `{"type":"resume"}`, `{"type":"speed","factor":4}`, and `{"type":"start","mode":"daily","difficulty":"easy"}` to start a run (Open World by default, or today's Daily) from the title screen, the end screen or mid-run. A started run waits paused at tick 0. `"difficulty":"highest"` picks the hardest the game allows, up through the Nightmare levels the browser has unlocked, and the finished command's `detail` names what it picked, such as `nightmare-3`.
- Add `"pause": true` to `move` or `goto` to run the game only for that command: it resumes a paused game and pauses it again on the tick the command finishes.
- `{"type":"seed","seed":"1SXG9XB"}` reloads the page so its next Open World run plays that seed (a run's `seed`). The page reconnects on the title screen a few seconds later.
- `{"type":"checkpoint","op":"save","name":"boss-2min"}` saves the whole run as it is now; the agent server keeps it in `.runs/checkpoints/` and lists them at `GET /checkpoints`. `"op":"load"` puts a saved run in place of the run in progress, which then waits paused; `"op":"drop"` forgets the page's in-memory copy. A loaded run replays exactly: the same moves from the same checkpoint end in the same state, in another page too. A checkpoint loads only on the game build it was saved on (the snapshot's `gameBuild`), and a loaded run is tainted, so the game posts it nowhere and never counts it as a win.
- `{"type":"loadout","weapons":[{"id":"peeler","level":8}],"passives":[{"id":"butter-socks","level":5}],"items":[{"id":"baked-buckler","count":1}],"hp":"full"}` replaces every weapon, passive and item of the run in progress, applied level by level as level-ups would (evolved weapons too). It also takes `gold` and `shrineTotals` (what Spud Shrines have added, by the game's stat names, such as `{"maxHp":20}`; a stat left out keeps what the run has), and taints the run.

Once a run ends the view is gone; `?raw=run,runClock,over` has the game's own totals for it until the next run starts.

Positions are world units. `x` grows to the right and `y` grows downward, and the player walks about 62 units a second at base speed. Distances in the view are from Tibo; `tibo.position` is where he is.

A level-up or chest choice freezes game time, so a waiting command returns early with `interruptedBy: "choice"` and resumes after you choose. A failed command says why in `detail`; where a program may want to act on it, `failure` names it too: `weaponNotOffered` (with `offered`, the starting weapons the game offers), `noRun`, `timeout` or `targetGone`. Steering for `goto` and `move` runs inside the page at the game's 60 ticks a second, so it does not depend on network latency. Snapshots reach the server about 100ms after the game state they describe, because Tampermonkey takes about 80ms to deliver each request from the page. Commands reach the page in a few milliseconds over a held-open stream. The full types are in `protocol/`.

The server only listens on 127.0.0.1 and sends no CORS headers, so other websites cannot drive the game. The userscript reaches it through Tampermonkey's `GM_xmlhttpRequest`, which tibo.dog's content security policy does not block.

## Headless play and the decision-model bot

The repository is split by program:

| Folder | What it is |
| --- | --- |
| `userscript/` | What runs in the tibo.dog page: the Combos panel, the bot's live view, and the page side of the agent API. `userscript/build.ts` bundles it into `dist/`. |
| `protocol/` | The contract between the page, the agent server and its clients: commands, the snapshot, the live view, the pilot's chat. |
| `game/` | What the game is, as every program needs it: the shapes of its state and content, the catalog of names and recipes, and the book built from the encyclopedia. |
| `agent-server/` | The relay between the game tab and everything else: the HTTP API above, the checkpoint store, and **Grok take the wheel**. `agent-server/client.ts` is that API for a program. |
| `cli/` | A command line for that API, for a person or an agent at a terminal: one command per call (`state`, `move`, `start highest`, ...). It has no models and no memory. |
| `headless/` | tibo.dog in a headless Chromium with the userscript, so nothing needs a visible browser. |
| `bot/` | The player: the planner and the action model in the game, with the templates a coach wrote, and the formats of what it writes (run log, notes, trial result). |
| `rsi/` | The learning loop for one coach: nine experiment iterations in the training ground, then a full run, a reflection and a commit, over and over. `rsi/store/` owns the formats of the files in `gameplay/`, `rsi/coach/` talks to the coach, and `rsi/training/` runs the game slots: a server and headless game each, playing fresh games and gyms side by side. |
| `gameplay/` | What the coach has learned and written: its prompts, beliefs, experiments, gyms, playbook and notes. |

### Running the loop unattended

```sh
./rsi/main.ts                                         # the coach on Sonnet 5.5 at high effort
./rsi/main.ts --loops 1 --slots 3                      # one loop, three games at a time
```

There is one coach, iterated on over time: its prompts, playbook and log carry from loop to loop, whichever model runs it. `--coach <harness>:<model>@<effort>` picks that model (the effort is for `claude` only, and must be `high` or more). The loop opens a main game slot (an agent server and a headless game with the profile `.runs/coach-profile`, which holds the coach's Nightmare ladder) and `--slots` training slots (5 by default, each with its own profile), then plays loops until stopped or `--loops` is done. Where it stands is the last entry of `gameplay/coach-log.md`, so a restarted loop goes on from the iteration it was in. Logs, every prompt and reply, and each game's bot log go to `.runs/rsi/`. Every write to `gameplay/` holds a lock (`gameplay/.lock`), so a person answering an infrastructure request does not write over the loop.

The coach harnesses are `claude` (run without your settings, hooks, MCP servers or tools), `grok`, `codex`, `opencode` and `cursor` (see `rsi/coach/harnesses.ts`).

### Headless game and the bot

`./headless/main.ts` runs tibo.dog in a headless Chromium with the userscript, so a bot can play without a visible browser. It reuses the newest Playwright headless shell on the machine, and serves `GET http://127.0.0.1:7358/screenshot` for a look at the game. `--profile <dir>` keeps the browser's profile, and with it the game's progress, in that folder; without it every launch starts fresh.

`./bot/main.ts` plays through the agent server in three layers. In the game, everything is one System One decision model in two personas, the planner and the action model: TypeSafe's Jev through OpenRouter (`--decider openrouter --model typesafe/jev-1.14-20261014`, needs `OPENROUTER_API_KEY` in `.env.local`, managed by env-manager) or a local model in LM Studio (`--model laya@q8_0`, the default decider). `--plan-model` gives the planner a different model. grok only works between runs.

- **Templates.** The prompts both in-game models play with, and the knobs, come from `--templates <file>` (any of `planner`, `action` and `knobs` over the defaults), else from the playbook a coach of the learning loop updated last. No model outside the decision model runs during a game. `--notes` writes a notes file when the run ends (the loop's full runs), `--weapon` picks the starting weapon.
- **Planner.** Before every decision the decision model reads the state its prompt asks for. The default prompt has the whole player state: health and its trend, level, gold, weapons, passives and items with the game's description of each, recipes in reach, what Tibo stands on, bosses and enemies around, and how recent goals ended. It takes every level-up, chest and shrine pick, each card described in the option itself. It also rates, one question each, every goal Tibo could take on next: a nearby chest to open, a shrine or other spot to charge, food to eat, the xp gems nearby, exploring one of the eight directions for 300 units (stopping at the first new chest), or keeping away from enemies for 8 seconds. The best-rated goal wins. It is asked when the run starts, when a goal ends, at every choice and again right after the pick lands, when a boss appears, and every 5 seconds (`--plan-every`), so a better goal can take over. Jev answers in about a quarter of a second.
- **Action model.** While the way to the goal costs no more health than the safest move, the page walks Tibo there on its own and stands it on the chest or shrine until it opens, without asking any model. The cost comes from an exact forecast: the userscript runs a copy of the game's own simulation one second forward for each move. When the way costs more, the decision model chooses the step. By default it is told only the goal, Tibo's health, and for each of the eight directions and standing still, the forecast, a boss or hazard that way, how many enemies are close, and whether the move heads toward the goal. It answers how badly each move would hurt Tibo (a 0-4 score) and whether each brings Tibo closer to the goal; the bot keeps the moves rated about as safe as the safest and takes the one that best serves the goal. Moves that cost clearly more health than the cheapest are not offered at all. With the `autopilot` knob at 1 the action model is not asked: of the moves the forecast allows, Tibo takes the one nearest the way to the goal.

A goal ends when its target is used up, when Tibo gets no closer (or standing there charges nothing, as with a Potato Crate without the gold) for 6 seconds, or when it runs well past the time the walk should take. A target given up on carries that note in the planner's next questions for 45 seconds. The coach can change these numbers, and the explore and evade lengths above, for each run.

### The learning loop

The loop is after understanding the game more than a score, on the way to its goal: surviving 20:00 on Open World Nightmare 20. Three models are fixed: the coach (Sonnet 5.5), the planner and the action model (Jev). Everything else lives in `gameplay/`, and the coach rewrites it as it learns.

A loop has ten iterations:

1. **Iterations 1 to 9, experiments.** The coach reads where things stand and the last iteration's games, picks what to focus on, and plays up to ten training games of up to five minutes each and forty minutes in all, five at a time in the training slots (see [The training ground](#the-training-ground)). Each game serves an experiment and plays the coach's playbook with that game's changes. The loop holds it to a few rules: while a base weapon or passive has never been held in a game, the iteration must try at least eight of them over at least three games, as a starting weapon or in a loadout; while any of build, items, economy, bosses, movement, spots and models has had no games this loop or the last, the iteration must play one for such an area; two games (or a game and the playbook) a few words apart, with the same start and knobs, are turned away as wording, not play; and a playbook change must name confirmed experiments with games from 0:00 on fresh seeds. In the same reply the coach updates beliefs and experiments and builds or retires gyms. The loop writes every game into its experiment's file and a summary into the coach's log, and the next iteration reads the results, with the stats each game ended with and how late the models saw the game.
2. **Iteration 10, the full run.** First the loop rehearses: the playbook as it stands against the last full run's, on the same five fresh seeds at the full run's level from 0:00. If the candidate lives in fewer games, the loop sets the playbook back to the last full run's. The coach then gives every experiment it played this loop a verdict (confirmed, refuted or inconclusive) carried into a belief, and the bot plays the playbook on the evaluation seed (`--eval-seed`, TIBO10 by default) in a freshly reloaded tab, on the next level of the coach's Nightmare ladder. The seed is the same every time so full runs compare; training games never get it, and the prompts forbid tuning to it. Only full runs get a notes file.
3. **Reflection.** The coach reviews the full run into its notes, looks back at the loop, and rewrites its own prompts for the next one. Then the loop commits `gameplay/` alone (through `gai`, as the coach's model) and pushes it.

What is in `gameplay/`:

- `beliefs.csv`: what the loop holds true, `id,about,verdict,claim,confidence,status,evidence,experiments,created,updated`. `verdict` is good (worth doing), bad (worth avoiding) or fact; `about` is game, planner, action or coach; `confidence` is lead, likely or confirmed; `status` is held, recheck or disproved. Rows are never deleted, only disproved, and the loop stamps who wrote and last changed each one.
- `experiments/experiment_<name>.md`: one file per question, with its status, area, result, hypothesis, method and findings from the coach, and every game played for it under Games.
- `gyms.jsonl`: the gyms, one per line, saved game states to test ideas under known conditions, each with every iteration it was used in. The loop starts with its own: the opening and the 1:45 mark before the first boss on the next ladder level and on Nightmare 20, and minutes 5 and 10 on the next level. The coach adds its own, especially around the times full runs die, and retires ones that no longer teach anything.
- `held.json`: by weapon and passive id, how many games ended holding it and the last of them; the coach sees which are untried.
- `coach.md`: the coach's three prompts, as parts under `# Experiments`, `# Full run` and `# Reflect`; the coach rewrites one part at a time. `coach-log.md`: one entry per iteration, the coach's summary of it. `playbook.json`: the templates, knobs and starting weapon the coach plays best with, which the panel's **Grok take the wheel** plays too.
- `infrastructure_feedback.csv`: requests for changes to the code, which the coach cannot make, `date,run,status,request,why`.
- `notes/`: one file per full run, named `<start>_lived-<mm-ss>_<difficulty>_<mode>_<surface>.md`, with the outcome and every stat the game counted (damage taken by source, damage dealt and kills by weapon, bosses, elites, chests, shrines, gold, what was evolved), stats worked out from the log, the plan, the picks, the prompts and the coach's review.

`rsi/store/` checks every edit and turns away one that would break a file or a template (an unknown `{{name}}`, a weapon id the encyclopedia does not have, a prompt rewrite that drops a section), and the coach gets another try with the reasons.

Live, a decision lands about 0.2 to 0.3 seconds after the snapshot it was made from. Now and then an answer hangs for seconds while the game runs on, so one that has not come within 1.2 seconds is given up on: the goal under way stands, a step takes the forecast's cheapest move, and the next step asks afresh. Each game's stats count those calls. The bot measures that lag (snapshot age plus the decision model's recent answer time) and sends it with the `forecast` command, so the forecast first plays the move Tibo holds now for that long: in an A/B of four live runs a side, that halved the turns the forecast called free but that cost two or more health within 0.35 seconds (13.2% to 6.7%). After a step the action model chose, the next step starts at once instead of waiting out the step time, so a model-steered stretch decides about every 0.2 seconds.

The bot only plays live. Lockstep, which paused the game while the models thought, is gone: the bot has no flag for it and the templates no knob. The agent API keeps `"pause": true` on `move` and `goto` for people and agents driving the game by hand. By default the bot plays today's Daily (`--mode daily`), which has the same seed for everyone; `--mode openWorld` plays Open World, and `--mode current` plays the mode the game is on (the open mode screen, else the last run's), falling back to the Daily.

Every run writes a CSV log to `/tmp/tibobit/<start>_<difficulty>_<mode>_<headless|browser>.csv` (`--log-dir` to change the folder), which its notes file links. It has one row per model call (`plan`: the planner chose the next goal; `pick`: the planner took a card; `move`: the action model chose a step) and one per goal that starts or ends, with the player's state at that moment: game and wall time, the model and how long it took, health, health lost since the row before, level, xp, gold, position, dash charges, enemies around and within 60, then the goal, the action taken, why, bosses, what hurt Tibo, what it stands on, hazards underfoot, nearby chests, food and spots, the weapons, passives and items held, and last every option with the model's odds. Numbers come before free text, so a quick `cut -d,` reads them. The post-run review reads the whole log.

### The training ground

A whole run takes minutes to reach the moment a question is about, and luck decides much of what happens there. The training ground skips both. A game starts either fresh, on any Nightmare level and any seed but the evaluation seed (a slot's ladder is set just below the level, then the tab reloads into the seed), or from a gym, a checkpoint of a whole game. A gym replays the same game state every time, so two games from one gym differ only in what the models chose. Either way the build can be swapped at the start, and the bot plays for the game's seconds with `bot/main.ts --trial <seconds> --templates <file> --result <file>`, which plays the run in progress, then writes how long Tibo lived and everything the game counted meanwhile. A weapon a slot's profile has not unlocked is swapped in at 0:00.

A gym is built by playing a fresh game with the coach's playbook to its time and saving it there, or saved from the end of a game that lived. Its recipe stays in `gyms.jsonl`, so when a new game build cannot load its checkpoint, it is built again.

```sh
./cli/main.ts checkpoint save before-boss      # by hand: save, load and rebuild a run
./cli/main.ts checkpoint load before-boss
./cli/main.ts loadout w:peeler:8 w:spud-lob:8 p:butter-socks:5 i:baked-buckler hp:full
./cli/main.ts seed 1SXG9XB                     # the next Open World run plays this seed
```

Checkpoints live in `.runs/checkpoints/` and only load on the game build they were saved on. tibo.dog ships new builds often, and a headless game keeps the build it loaded until it restarts.

To run several games side by side, give each its own server port: `./agent-server/main.ts --port 7367`, `./headless/main.ts --bridge 7367 --port 7368`, then `./bot/main.ts --server http://127.0.0.1:7367 --reload http://127.0.0.1:7368/reload` (or `./cli/main.ts --port 7367 state`). LM Studio must keep each model loaded (`lms load <model>`), or loading one on demand can cancel the other. A second copy of a model (`lms load laya@q8_0 --identifier laya-b`) did not speed up two bots: they share the GPU.

## How it reads the game

tibo.dog ships native ES modules, and importing a module URL that the page already loaded returns the same live instance the game uses. The script relies on that, so nothing about the game's content is baked in.

- It watches the page's resource timing for the `sim-*.js` chunk, imports it, and wraps `Game.prototype.step` to hold a reference to the running game. Weapons, passives and items come straight from the game's loadout state, and the agent's snapshot reads the game's entity pools directly.
- It wraps `Game.prototype.setInput`, which the game calls every tick with the player's movement, so agent commands steer the player without faking key presses.
- Enemy and boss names come from the game's global content table, found the same way through the sim chunk's `w.enemyAt(...)` call. Pickup kinds, zone kinds and enemy flags come from enum tables in the same module, matched by their contents.
- The recipe tables, max levels and content lists come from the game's own content registry, the function the sim chunk calls as `x().baseWeapons`. The script finds that function's export name in the sim chunk's import clause, so a new build needs no update unless the game changes how that call looks.
- English names come from the `i18n-en-*` chunks, which export the message table.
- Discovery state comes from the game's own `localStorage` keys `tibo.discovery.v1` and `tibo.evolutions.v1`.
- Offer cards are `.ui-card` elements with `data-tip="weapon-offer:<id>:<level>"`, `passive-offer:<id>:<level>` or `item:<id>`.

If the game changes shape so the script can no longer read it, the panel says so instead of showing wrong data.

## Building

```sh
bun install
bun run check
bun run build   # writes dist/tibo-helper.user.js
```

Bump `version` in `package.json` when the code changes so Tampermonkey picks up the update.

To run a local build, install a wrapper script that `@require`s it. Tampermonkey takes grants only from the installed script's own header, never from a required file, so the wrapper needs the agent API's grants itself:

```js
// ==UserScript==
// @name         tibo.dog combo helper (local dev)
// @match        https://tibo.dog/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      127.0.0.1
// @require      file:///path/to/tibobit/dist/tibo-helper.user.js
// ==/UserScript==
```

Without them the port box reports that Tampermonkey did not grant `GM_xmlhttpRequest`.
