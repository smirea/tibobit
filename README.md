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

## Agent API

The same userscript lets a program play the game. A local server exposes the game state and accepts commands, and the userscript relays both between the server and the tibo.dog tab.

```sh
./scripts/agent-server.ts     # listens on http://127.0.0.1:7357
./scripts/tibo.ts state       # one-screen summary; --json for the full snapshot
```

Keep one tibo.dog tab open with the userscript installed. It connects within a few seconds of the server starting and reconnects on its own, including to a run already in progress.

To use a server on another port, type the port into **Agent port** and press **Connect** (or Enter). The box sits at the bottom of the Combos panel during a run, and alone in the upper right on the title and other screens outside a run. The tab remembers the port, and the line under it says whether it is connected, still trying, or refused because another tab holds that server. Point the CLI at the same server with `./scripts/tibo.ts --port <port> <command>`, or `--server <url>`, or `TIBO_SERVER`.

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
- `{"type":"dash","dir":"up"}`, `{"type":"stop"}`, `{"type":"pause"}`, `{"type":"resume"}`, `{"type":"speed","factor":4}`, and `{"type":"start","mode":"daily","difficulty":"easy"}` to start a run (Open World by default, or today's Daily) from the title screen, the end screen or mid-run. A started run waits paused at tick 0.
- Add `"pause": true` to `move` or `goto` to run the game only for that command: it resumes a paused game and pauses it again on the tick the command finishes.

The snapshot's `sectors` summarise every direction (enemies within 60 and 150 units, nearest enemy, boss and bullet, and any hazard in the way), and `lastRun` reports time, level and kills once a run ends.

Positions are world units. `x` grows to the right and `y` grows downward, and the player walks about 62 units a second at base speed. Every listed thing carries `dx`, `dy`, `dist`, a compass `dir` from the player, and `onScreen`. Things off screen are the ones the game points at with arrows at the screen edge.

A level-up or chest choice freezes game time, so a waiting command returns early with `interruptedBy: "choice"` and resumes after you choose. Steering for `goto` and `move` runs inside the page at the game's 60 ticks a second, so it does not depend on network latency. Snapshots reach the server about 100ms after the game state they describe, because Tampermonkey takes about 80ms to deliver each request from the page. Commands reach the page in a few milliseconds over a held-open stream. The full types are in `src/agent/protocol.ts`.

The server only listens on 127.0.0.1 and sends no CORS headers, so other websites cannot drive the game. The userscript reaches it through Tampermonkey's `GM_xmlhttpRequest`, which tibo.dog's content security policy does not block.

## Headless play and the decision-model bot

`./scripts/headless.ts` runs tibo.dog in a headless Chromium with the userscript, so a bot can play without a visible browser. It reuses the newest Playwright headless shell on the machine, and serves `GET http://127.0.0.1:7358/screenshot` for a look at the game.

`./scripts/tibo-bot.ts` plays through the agent server with a System One decision model: TypeSafe's Jev through OpenRouter (`--decider openrouter --model typesafe/jev-1.14-20261014`, needs `OPENROUTER_API_KEY` in `.env.local`, managed by env-manager) or a local model in LM Studio (`--model laya@q8_0`, the default decider). Each step it asks, in one request, how badly each of the eight directions and standing still would hurt Tibo in the next second (a 0-4 score) and whether each leads somewhere useful, then keeps the moves rated about as safe as the safest and takes the most useful. Every description starts with an exact forecast: the userscript runs a copy of the game's own simulation one second forward for each move, and moves that cost clearly more health than the cheapest are not offered at all. On a level-up it asks which card to take. A coach (`grok`) advises during the run, reviews it afterwards and keeps the learning loop in `gameplay/` (see `gameplay/README.md`); `--coach none` turns it off. Jev reached 22:10 on the Nightmare Daily at about 200 ms per step.

The bot plays in lockstep: each step runs the game for `--step` seconds (default 0.35) and pauses it again (`"pause": true` on `move` and `goto`), so the model's thinking time costs no game time. `{"type":"speed","factor":4}` runs four simulation ticks per frame, so game time passes up to four times faster while the model thinks. By default the bot plays today's Daily (`--mode daily`), which has the same seed for everyone. `start` leaves a new run paused at tick 0, and lockstep commands land on exact ticks, so the same model on the same Daily replays the same game: two runs of the same 30 moves ended in identical states. That makes runs comparable across models and prompt changes. Run summaries go to `.runs/`, and `--trace` adds every question and answer.

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
