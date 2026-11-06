# tibobit

A Tampermonkey userscript for [tibo.dog](https://tibo.dog), poteto's survivors-like browser game. It shows which evolutions your current run can reach and annotates level-up and item cards with combo information.

## What it does

- **Combos panel, upper right.** Every evolution, union and item evolution that uses something you hold, with what each still needs: `✓` held, `▲` held but not at the level the recipe needs, `✗` missing. Ready combos sort first. A `NEW` tag marks a result you have never made. Click the header to collapse it.
- **Card annotations.** A teal glow and `NEW` badge mark a weapon, passive or item you have never discovered. A gold glow marks a card that completes a combo whose result you have never made. Under each card the script lists the combos that card joins with what you already hold. For undiscovered cards it also lists every partner it could combo with, dimmed when you do not hold the partner yet. `READY` means picking the card finishes the recipe.

The recipe rules come from the game's own code. A base weapon evolves at its max level (8) while you hold its catalyst passive, and the evolution then drops from a chest. A union fuses two specific evolved weapons. An item evolves once its catalyst passive is at max level (5).

## Install

1. Install [Tampermonkey](https://www.tampermonkey.net/) in Brave or Chrome. Manifest V3 browsers only run userscripts after you allow it. In `brave://extensions`, open Tampermonkey's **Details** and turn on **Allow user scripts**. On older Chromium versions that lack the toggle, turn on **Developer mode** instead.
2. Open <https://raw.githubusercontent.com/smirea/tibobit/master/dist/tibo-helper.user.js> and click **Install**. Tampermonkey checks the same URL for updates.

## How it reads the game

- Weapons and passives come from the HUD slots (`.hud-weapons` and `.hud-passives`), which carry `data-tip="weapon:<id>"` and a level label.
- Held items are not in the DOM. The script wraps `Map.prototype.set` and keeps a reference to the Map that the game writes item counts into. Items you picked up before the script loaded only show after the next item change.
- Discovery state comes from the game's own `localStorage` keys `tibo.discovery.v1` and `tibo.evolutions.v1`.
- Offer cards are `.ui-card` elements with `data-tip="weapon-offer:<id>:<level>"`, `passive-offer:<id>:<level>` or `item:<id>`.

## Updating the recipe data

The recipe table and English names are baked into the script from the live bundle. The game deploys often, but most builds leave recipes alone, so the panel only warns when the game shows a weapon, passive or item id the baked data does not know. Regenerate the data and rebuild:

```sh
bun install
bun run extract   # crawls tibo.dog's chunks, writes src/catalog.generated.json
bun run build     # writes dist/tibo-helper.user.js
```

Bump `version` in `package.json` when the code changes so Tampermonkey picks up the update. The extraction date is appended to the userscript version automatically.
