# tibobit

A Tampermonkey userscript for [tibo.dog](https://tibo.dog), poteto's survivors-like browser game. It shows which evolutions your current run can reach, annotates level-up and item cards with combo information, and lets a local program read the game state and play through an HTTP API.

## What it does

- **Combos panel, upper right.** One row per weapon, passive or item you hold that has no partner yet: `[NEW] [its icon] : [icons of everything it could pair with]`. Weapons list the catalysts they need, and passives and items list the weapons or items they would evolve. Something you already hold a partner for drops out of the list, and the header counts open rows, held pairs and pairs ready to evolve (hover it for the pairs). `NEW` and the pink dot mark results you have never made. Hover an icon for its name, the level it needs, and what it makes. Click the header to collapse the panel.
- **Card annotations.** Every weapon, passive or item card lists all of its pairings as `[partner] → [result]`. A green outline means you hold the partner, yellow means you hold it below the level the recipe needs, and a faded icon means you don't have it. `READY` means picking the card finishes the recipe. A pink glow and `UNSEEN` badge mark a card you have never been offered, and a gold glow marks a card that pairs with something you hold into a result you have never made.

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

Keep one tibo.dog tab open with the userscript installed. It connects within a few seconds of the server starting and reconnects on its own.

| Endpoint | What it does |
| --- | --- |
| `GET /state` | Latest snapshot: screen, player, loadout, reachable combos, open choice, bosses, nearest enemies, pickups, points of interest, hazards and enemy bullets. |
| `GET /encyclopedia` | Every weapon, passive, item, recipe, enemy, boss, point of interest and biome, with English names, descriptions and the game's own stats. |
| `POST /command` | Runs one JSON command. Add `?wait=1` to block until it finishes. |
| `WS /ws` | Pushes every snapshot as it arrives. Send a JSON command to run it. |

Commands, also available as `./scripts/tibo.ts <verb>`:

- `{"type":"move","dir":"left","seconds":2}` holds a direction. `dir` is one of the eight compass words (`up-left` and so on) or degrees, where 0 is right and 90 is down. Without `seconds` it holds until the next movement command.
- `{"type":"goto","to":{"x":120,"y":-40}}` walks to a world position. `to` can also be `{"dx","dy"}` relative to where you stand, `{"poi":uid}` for a point of interest, or `{"pickup":uid}` for a chest or other pickup. `stay` holds still after arriving, either for a number of seconds or with `"done"` until the target is used up. Shrines, chests and most points of interest only open after you stand on them for their `chargeNeeded` seconds, so `{"type":"goto","to":{"poi":16},"stay":"done"}` is the usual way to take one.
- `{"type":"choose","index":0}` picks an option of the open level-up, chest or shrine choice. Options carry `recommended` (the game's own suggestion), `unseen`, and the combos they join.
- `{"type":"dash","dir":"up"}`, `{"type":"stop"}`, `{"type":"pause"}`, `{"type":"resume"}`, and `{"type":"start","difficulty":"easy"}` to start an Open World run from the title or end screen.

Positions are world units. `x` grows to the right and `y` grows downward, and the player walks about 62 units a second at base speed. Every listed thing carries `dx`, `dy`, `dist`, a compass `dir` from the player, and `onScreen`. Things off screen are the ones the game points at with arrows at the screen edge.

A level-up or chest choice freezes game time, so a waiting command returns early with `interruptedBy: "choice"` and resumes after you choose. Steering for `goto` and `move` runs inside the page at the game's 60 ticks a second, so it does not depend on network latency. Snapshots reach the server about 100ms after the game state they describe, because Tampermonkey takes about 80ms to deliver each request from the page. Commands reach the page in a few milliseconds over a held-open stream. The full types are in `src/agent/protocol.ts`.

The server only listens on 127.0.0.1 and sends no CORS headers, so other websites cannot drive the game. The userscript reaches it through Tampermonkey's `GM_xmlhttpRequest`, which tibo.dog's content security policy does not block.

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
