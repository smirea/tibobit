import { startBridge } from "./agent/bridge";
import { Controller } from "./agent/control";
import { Discovery } from "./combos/discovery";
import { GameLink } from "./game/link";
import { guardPanelKeys, startHelper } from "./panel/panel";
import { startPickShow } from "./pilot/pick-overlay";
import { installSeedHook } from "./agent/training";

installSeedHook();

const link = new GameLink();
const discovery = new Discovery();
const controller = new Controller(link);
// For the headless harness's /eval, which debugs the bot against the live game.
Object.assign(window, { __tibobit: { link } });
guardPanelKeys();

function start() {
  const bridge = startBridge(link, controller);
  startHelper(link, discovery, bridge);
  startPickShow(bridge);
}

if (document.body === null) document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
