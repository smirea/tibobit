# tibobit

A Tampermonkey userscript for [tibo.dog](https://tibo.dog), poteto's survivors-like browser game. It shows which evolutions your current run can reach and annotates level-up and item cards with combo information.

## What it does

- **Combos panel, upper right.** Every evolution, union and item evolution that uses something you hold, with what each still needs: `✓` held, `▲` held but not at the level the recipe needs, `✗` missing. Ready combos sort first. A `NEW` tag marks a result you have never made. Click the header to collapse it.
- **Card annotations.** A pink glow and `UNSEEN` badge mark a weapon, passive or item you have never been offered. A gold glow marks a card that completes a combo whose result you have never made. Under each card the script lists the combos that card joins with what you already hold. For undiscovered cards it also lists every partner it could combo with, dimmed when you do not hold the partner yet. `READY` means picking the card finishes the recipe.

The recipe rules mirror the game's own code. A base weapon evolves at its max level (8) while you hold its catalyst (usually a passive, sometimes an item), and the evolution then drops from a chest. A union fuses two specific evolved weapons. An item evolves once its catalyst passive is at max level (5).

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) in Brave or Chrome. Manifest V3 browsers only run userscripts after you allow it. In `brave://extensions`, open Tampermonkey's **Details** and turn on **Allow user scripts**. On older Chromium versions that lack the toggle, turn on **Developer mode** instead.
2. Open <https://raw.githubusercontent.com/smirea/tibobit/master/dist/tibo-helper.user.js> and click **Install**. Tampermonkey checks the same URL for updates.

## How it reads the game

tibo.dog ships native ES modules, and importing a module URL that the page already loaded returns the same live instance the game uses. The script relies on that, so nothing about the game's content is baked in.

- It watches the page's resource timing for the `sim-*.js` chunk, imports it, and wraps `Game.prototype.step` to hold a reference to the running game. Weapons, passives and items come straight from the game's loadout state.
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
