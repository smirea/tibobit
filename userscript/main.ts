import { startBridge } from "./agent/bridge";
import { Controller } from "./agent/control";
import { Discovery } from "./combos/discovery";
import { GameLink } from "./game/link";
import { guardPanelKeys, startHelper } from "./panel/panel";
import { startPickShow } from "./pilot/pick-overlay";
import { installSeedHook } from "./agent/seed";
import { Forecaster } from "./agent/forecast";

installSeedHook();

const link = new GameLink();
const discovery = new Discovery();
const forecaster: Forecaster = new Forecaster(link, () => controller.course());
const controller = new Controller(link, forecaster);
// For the headless harness's /eval, which debugs the bot against the live game.
Object.assign(window, { __tibobit: { link } });
guardPanelKeys();

function start() {
  forecaster.start();
  const bridge = startBridge(link, controller, forecaster);
  startHelper(link, discovery, bridge);
  startPickShow(bridge);
}

if (document.body === null) document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
