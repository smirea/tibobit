# Agents

## The userscript updates itself

The owner's Tampermonkey loads `dist/tibo-helper.user.js` straight from this checkout, through a local wrapper that `@require`s the file (see "Building" in the README). After `bun run build`, reloading the tibo.dog tab runs the new build. Do not tell the owner to update or reinstall the script in Tampermonkey, and do not bump `version` in `package.json` only to make Tampermonkey notice a change.

## Action icons

Each action tile in the bot panel shows an icon for its tag. The tags are `ACTION_TAGS` in `protocol/pilot.ts`, and the icons are `ACTION_ICONS` in `userscript/pilot/icons.ts`. A new tag does not type-check until it has an icon. Draw it on the same 24x24 grid as the others: round-capped 2-unit strokes, plus filled shapes where they read better. If you cannot draw a recognisable one by hand, have Codex generate the SVG paths. Then render every tag in a real browser and look at the new icon next to the others before you commit.

## The game's content

For anything in the game's content, such as recipes, names, descriptions, max levels, enemies or bosses, run `./headless/encyclopedia.ts` (`--json [section]` for the definitions). It reads tibo.dog as it is deployed now, in a few seconds. Do not download or grep the game's JS chunks for content, and do not keep a copy of it in the repo. When the script cannot read something you need, fix `userscript/link/` and the encyclopedia so the userscript gets it too.
