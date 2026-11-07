# Agents

## The userscript updates itself

The owner's Tampermonkey loads `dist/tibo-helper.user.js` straight from this checkout, through a local wrapper that `@require`s the file (see "Building" in the README). After `bun run build`, reloading the tibo.dog tab runs the new build. Do not tell the owner to update or reinstall the script in Tampermonkey, and do not bump `version` in `package.json` only to make Tampermonkey notice a change.
