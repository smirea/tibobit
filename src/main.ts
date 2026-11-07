import { startBridge } from "./agent/bridge";
import { Controller } from "./agent/control";
import { Discovery } from "./discovery";
import { GameLink } from "./game";
import { startHelper } from "./helper";

const link = new GameLink();
const discovery = new Discovery();
const controller = new Controller(link);

function start() {
  startHelper(link, discovery);
  startBridge(link, discovery, controller);
}

if (document.body === null) document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
