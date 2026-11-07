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

**Grok take the wheel**, under the agent port box, hands the game to the bot. The agent server starts `scripts/tibo-bot.ts` for the tab (`./scripts/agent-server.ts` must be running and `OPENROUTER_API_KEY` set). During a run the bot takes over where you are. On the title or end screen it starts today's Daily on Nightmare and keeps playing runs until you press **I'll do it myself**, at the top of the bot's chat, which stops it and resumes the game at normal speed. To use other bot flags, start the server with `--pilot "<flags>"`, for example `--pilot "--model laya@q8_0"` for LM Studio.

While the bot plays, the combos panel folds to its header, the agent port row sits under it, then **I'll do it myself** with the **Plan** and **Action** boxes beside it, and under those the bot's decisions:

- **Plan** and **Action**, in seconds, set how often the planner is asked while a goal is under way (1 to 300 seconds, 5 by default) and how often the bot takes a step (0.1 to 5 seconds, 0.3 by default; real time). The bot reads them every step.
- **Incognito**, beside **Grok take the wheel**, has the bot just play: it writes no notes file, no review runs after the run, and the run does not count toward experiments. Turning it on mid-run deletes that run's notes. Its dot shows while it is on. The CSV log in `/tmp/tibobit/` is still written.
- The browser remembers **Plan**, **Action** and **Incognito** (localStorage) and sends them to the agent server each time the tab connects, so they survive reloads and server restarts.
- **Plan**, pinned at the top, is the planner's latest decision with its game time: the card it took at a level-up, chest or shrine, and the goal it chose with the model's odds for it. Hover it to see, to the left of the panel, the cards and every goal it weighed with the model's odds as bars, the prompt (folded), and every earlier decision of the run; click one to open it. After the run, the coach's review appears here too.
- **Action** rows, newest first, are the last 20 actions, one line each with its game time to a tenth of a second (`01:23.4`): a goal starting and ending, and each step the action model chose. Hover a row for its details. For a step, that is every move with the game's forecast and the model's hurt and usefulness bars beside its name, which move won or was ruled out, and the prompt at the end.


A run the bot takes over from you writes no notes, feedback or review, so the learning loop in `gameplay/` only learns from runs the bot played from the start.

The bot plays live: the game runs at normal speed the whole time, and each move is held until the next decision replaces it. The game only stops where it stops for a person, on level-up, chest and shrine choices. The page forecasts damage a few times a second during play, which costs a few frames per second.

## Agent API

The same userscript lets a program play the game. A local server exposes the game state and accepts commands, and the userscript relays both between the server and the tibo.dog tab.

```sh
./scripts/agent-server.ts     # listens on http://127.0.0.1:7357
bun run agent-server          # the same, restarting whenever its code changes
./scripts/tibo.ts state       # one-screen summary; --json for the full snapshot
```

Keep one tibo.dog tab open with the userscript installed. It connects within a few seconds of the server starting and reconnects on its own, including to a run already in progress.

To use a server on another port, type the port into **Agent port** and press **Connect** (or Enter). The box sits at the bottom of the Combos panel during a run, and alone in the upper right on the title and other screens outside a run. The tab remembers the port. While the tab is connected, a pulsing green dot follows the box, and **Connect** reads "connected" until you type a different port. When it is not connected, the line under the box says whether it is still trying or was refused because another tab holds that server. Point the CLI at the same server with `./scripts/tibo.ts --port <port> <command>`, or `--server <url>`, or `TIBO_SERVER`.

| Endpoint | What it does |
| --- | --- |
| `GET /state` | Latest snapshot: screen, player, loadout, reachable combos, the panel's unpaired rows (`unpaired`), the open choice with every pairing of every option, bosses, nearest enemies, pickups, points of interest, hazards and enemy bullets. |
| `GET /encyclopedia` | Every weapon, passive, item, recipe, enemy, boss, point of interest and biome, with English names, descriptions and the game's own stats. |
| `POST /command` | Runs one JSON command. Add `?wait=1` to block until it finishes. |
| `WS /ws` | Pushes every snapshot as it arrives. Send a JSON command to run it. |

Commands, also available as `./scripts/tibo.ts <verb>`:

- `{"type":"move","dir":"left","seconds":2}` holds a direction. `dir` is one of the eight compass words (`up-left` and so on) or degrees, where 0 is right and 90 is down. Without `seconds` it holds until the next movement command.
- `{"type":"goto","to":{"x":120,"y":-40}}` walks to a world position. `to` can also be `{"dx","dy"}` relative to where you stand, `{"poi":uid}` for a point of interest, or `{"pickup":uid}` for a chest or other pickup. `stay` holds still after arriving, either for a number of seconds or with `"done"` until the target is used up. Shrines, chests and most points of interest only open after you stand on them for their `chargeNeeded` seconds, so `{"type":"goto","to":{"poi":16},"stay":"done"}` is the usual way to take one.
- `{"type":"choose","index":0}` picks an option of the open level-up, chest or shrine choice. Options carry `recommended` (the game's own suggestion), `unseen`, and `combos`: every recipe the option is part of, with the partner, whether you hold it (`partnerHeld`) or banished it (`partnerBanished`), whether picking completes it (`ready`), and whether you have ever made the result (`made`).
- `{"type":"forecast","live":true}` keeps the `forecast` and `standingForecast` fields coming while the game runs, at most every 12 ticks. Without it they only appear while the game is paused.
- `{"type":"dash","dir":"up"}`, `{"type":"stop"}`, `{"type":"pause"}`, `{"type":"resume"}`, `{"type":"speed","factor":4}`, and `{"type":"start","mode":"daily","difficulty":"easy"}` to start a run (Open World by default, or today's Daily) from the title screen, the end screen or mid-run. A started run waits paused at tick 0.
- Add `"pause": true` to `move` or `goto` to run the game only for that command: it resumes a paused game and pauses it again on the tick the command finishes.

The snapshot's `sectors` summarise every direction (enemies within 60 and 150 units, nearest enemy, boss and bullet, and any hazard in the way), and `lastRun` reports time, level and kills once a run ends.

Positions are world units. `x` grows to the right and `y` grows downward, and the player walks about 62 units a second at base speed. Every listed thing carries `dx`, `dy`, `dist`, a compass `dir` from the player, and `onScreen`. Things off screen are the ones the game points at with arrows at the screen edge.

A level-up or chest choice freezes game time, so a waiting command returns early with `interruptedBy: "choice"` and resumes after you choose. Steering for `goto` and `move` runs inside the page at the game's 60 ticks a second, so it does not depend on network latency. Snapshots reach the server about 100ms after the game state they describe, because Tampermonkey takes about 80ms to deliver each request from the page. Commands reach the page in a few milliseconds over a held-open stream. The full types are in `src/agent/protocol.ts`.

The server only listens on 127.0.0.1 and sends no CORS headers, so other websites cannot drive the game. The userscript reaches it through Tampermonkey's `GM_xmlhttpRequest`, which tibo.dog's content security policy does not block.

## Headless play and the decision-model bot

`./scripts/headless.ts` runs tibo.dog in a headless Chromium with the userscript, so a bot can play without a visible browser. It reuses the newest Playwright headless shell on the machine, and serves `GET http://127.0.0.1:7358/screenshot` for a look at the game.

`./scripts/tibo-bot.ts` plays through the agent server in three layers. In the game, everything is one System One decision model in two personas, the planner and the action model: TypeSafe's Jev through OpenRouter (`--decider openrouter --model typesafe/jev-1.14-20261014`, needs `OPENROUTER_API_KEY` in `.env.local`, managed by env-manager) or a local model in LM Studio (`--model laya@q8_0`, the default decider). `--plan-model` gives the planner a different model. grok only works between runs.

- **Game knowledge.** `gameplay/strategy.md` holds what earlier runs taught: which cards to pick in which order, which goals pay off in which phase of a run, and the Daily's boss schedule. After each run the coach (grok, `--coach-model`; `--coach none` turns it off) reads the run's log, names the moments that decided the run and what should have happened instead, and rewrites the file as short plain rules the planner can apply (see `gameplay/README.md`). The review also names the experiment the next experiment run plays (`gameplay/next-experiment.json`), so no model outside the decision model runs during a game.
- **Planner.** Before every decision the decision model reads the game knowledge and the whole player state: health and its trend, level, gold, weapons, passives and items with the game's description of each, recipes in reach, what Tibo stands on, bosses and enemies around, and how recent goals ended. It takes every level-up, chest and shrine pick, each card described in the option itself. It also rates, one question each, every goal Tibo could take on next: a nearby chest to open, a shrine or other spot to charge, food to eat, the xp gems nearby, exploring one of the eight directions for 300 units (stopping at the first new chest), or keeping away from enemies for 8 seconds. The best-rated goal wins. It is asked when the run starts, when a goal ends, at every choice and again right after the pick lands, when a boss appears, and every 5 seconds (`--plan-every`), so a better goal can take over. Jev answers in about a quarter of a second.
- **Action model.** While the way to the goal costs no more health than the safest move, the page walks Tibo there on its own and stands it on the chest or shrine until it opens, without asking any model. The cost comes from an exact forecast: the userscript runs a copy of the game's own simulation one second forward for each move. When the way costs more, the decision model chooses the step. It is told only the goal, Tibo's health, and for each of the eight directions and standing still, the forecast, a boss or hazard that way, how many enemies are close, and whether the move heads toward the goal. It answers how badly each move would hurt Tibo (a 0-4 score) and whether each brings Tibo closer to the goal; the bot keeps the moves rated about as safe as the safest and takes the one that best serves the goal. Moves that cost clearly more health than the cheapest are not offered at all.

A goal ends when its target is used up, when Tibo gets no closer (or standing there charges nothing, as with a Potato Crate without the gold) for 6 seconds, or when it runs well past the time the walk should take. A target given up on carries that note in the planner's next questions for 45 seconds.

`--lockstep` plays in lockstep instead: each step runs the game for `--step` seconds (default 0.35) and pauses it again (`"pause": true` on `move` and `goto`), so the model's thinking time costs no game time. `{"type":"speed","factor":4}` runs four simulation ticks per frame, so game time passes up to four times faster while the model thinks. By default the bot plays today's Daily (`--mode daily`), which has the same seed for everyone. `start` leaves a new run paused at tick 0, and lockstep commands land on exact ticks, so the same model on the same Daily replays the same game: two runs of the same 30 moves ended in identical states. That makes runs comparable across models and prompt changes. Run summaries go to `.runs/`.

Every run writes a CSV log to `/tmp/tibobit/<run id>.csv` (`--log-dir` to change the folder), named like its notes file, which links it. It has one row per model call (`plan`: the planner chose the next goal; `pick`: the planner took a card; `move`: the action model chose a step) and one per goal that starts or ends, with the player's state at that moment: game and wall time, the model and how long it took, health, health lost since the row before, level, xp, gold, position, dash charges, enemies around and within 60, then the goal, the action taken, why, bosses, what hurt Tibo, what it stands on, hazards underfoot, nearby chests, food and spots, the weapons, passives and items held, and last every option with the model's odds. Numbers come before free text, so a quick `cut -d,` reads them. The post-run review reads the whole log.

To run several games side by side, give each its own server port: `./scripts/agent-server.ts --port 7367`, `./scripts/headless.ts --bridge 7367 --port 7368`, then `./scripts/tibo-bot.ts --server http://127.0.0.1:7367 --reload http://127.0.0.1:7368/reload` (or `./scripts/tibo.ts --port 7367 state`). LM Studio must keep each model loaded (`lms load <model>`), or loading one on demand can cancel the other. A second copy of a model (`lms load laya@q8_0 --identifier laya-b`) did not speed up two bots: they share the GPU.

## How it reads the game

tibo.dog ships native ES modules, and importing a module URL that the page already loaded returns the same live instance the game uses. The script relies on that, so nothing about the game's content is baked in.

- It watches the page's resource timing for the `sim-*.js` chunk, imports it, and wraps `Game.prototype.step` to hold a reference to the running game. Weapons, passives and items come straight from the game's loadout state, and the agent's snapshot reads the game's entity pools directly.
- It wraps `Game.prototype.setInput`, which the game calls every tick with the player's movement, so agent commands steer the player without faking key presses.
- Enemy and boss names come from the game's global content table, found the same way through the sim chunk's `w.enemyAt(...)` call. Pickup kinds, zone kinds and enemy flags come from enum tables in the same module, matched by their contents.
- The recipe tables, max levels and content lists come from the game's own content registry, the function the sim chunk calls as `x(e.bigUpdate).baseWeapons`. The script finds that function's export name in the sim chunk's import clause, so a new build needs no update unless the game changes how that call looks.
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
