import { startBridge } from "./agent/bridge";
import { Controller } from "./agent/control";
import { Discovery } from "./discovery";
import { GameLink } from "./game";
import { guardPanelKeys, startHelper } from "./helper";

const link = new GameLink();
const discovery = new Discovery();
const controller = new Controller(link);
guardPanelKeys();

function start() {
  startHelper(link, discovery, startBridge(link, discovery, controller));
}

if (document.body === null) document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
