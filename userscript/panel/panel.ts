import { readLoadout } from "../../game/catalog";
import type { Bridge } from "../agent/bridge";
import { botFeed } from "../pilot/feed";
import { type RunCombos, runCombos } from "../combos/run-combos";
import type { Discovery } from "../combos/discovery";
import type { GameLink } from "../link/game-link";
import type { IconSheet } from "../../game/types";
import { css as panelCss } from "./panel.css";
import { css as connectionCss } from "./connection.css";
import { css as spritesCss } from "./sprites.css";
import { css as cardNotesCss } from "./card-notes.css";
import { inRun, PANEL_ID, pauseMenuOpen } from "../link/screen";
import { addStyle, h } from "./dom";
import { startTips } from "./sprites";
import { renderPanel, renderProblem, type View } from "./combos-list";
import { connectionRow } from "./connection";
import { annotateCard, offerKey } from "./card-notes";
import { fsdPopup, type GameControl } from "../fsd/popup";
import { worldEntities } from "../fsd/entities";
import { driveOverlay } from "../fsd/drive-overlay";
import { DRIVER_TYPES } from "../fsd/driver-source";
import { stateFields } from "../fsd/driver-types";

function mount(chat: HTMLElement, footer: HTMLElement): { panel: HTMLElement; content: HTMLElement } {
  for (const css of [panelCss, connectionCss, spritesCss, cardNotesCss]) addStyle(css);
  const content = h("div", "tbh-content");
  // The port row sits above the bot's controls while it plays, and at the panel's foot otherwise.
  const panel = h("div", "tbh-panel", content, footer, chat);
  panel.id = PANEL_ID;
  if (window.innerWidth < 700) panel.classList.add("tbh-collapsed");
  document.body.append(panel);
  return { panel, content };
}

/** The run as the Full Self Driving popup needs it: paused while the popup is open. */
function gameControl(link: GameLink): GameControl {
  return {
    pause() {
      const game = link.game;
      // A choice or the game's own pause menu already holds the run still.
      if (game === undefined || !inRun(link) || game.state.paused || game.state.choiceQueue.length > 0 || pauseMenuOpen()) return false;
      game.setPaused(true);
      return true;
    },
    resume() {
      if (inRun(link)) link.game?.setPaused(false);
    },
    entities: () => worldEntities(link),
  };
}

export function startPanel(link: GameLink, discovery: Discovery, bridge: Bridge) {
  const fields = stateFields(DRIVER_TYPES);
  const fsd = fsdPopup(bridge.pilot, gameControl(link), fields);
  driveOverlay(bridge.pilot, fields);
  const { panel, content } = mount(botFeed(bridge.pilot, fsd.open), connectionRow(bridge, fsd.open));
  // While the bot plays, its chat takes the corner and the combos fold to their header.
  let collapsedBefore: boolean | undefined;
  const followPilot = () => {
    const piloting = bridge.pilot.state().state !== "off";
    if (piloting === panel.classList.contains("tbh-pilot")) return;
    panel.classList.toggle("tbh-pilot", piloting);
    if (piloting) {
      collapsedBefore = panel.classList.contains("tbh-collapsed");
      panel.classList.add("tbh-collapsed");
    } else if (collapsedBefore !== undefined) panel.classList.toggle("tbh-collapsed", collapsedBefore);
  };
  bridge.pilot.onChange(followPilot);
  followPilot();
  const dropStaleTip = startTips();
  let panelSignature = "";
  let queued = false;
  let version = 0;
  let lastInputs: [RunCombos, IconSheet | undefined] | undefined;

  const update = () => {
    queued = false;
    const game = link.game;
    const running = game !== undefined && inRun(link);
    // Outside a run (title, mode select, end screens) the panel shows only the agent port box.
    panel.classList.toggle("tbh-idle", !running);
    dropStaleTip();
    if (!running) {
      panel.classList.remove("tbh-choice", "tbh-peek");
      return;
    }
    const cards = [...document.querySelectorAll<HTMLElement>(".ui-card[data-tip]")];
    const offered = cards.map(offerKey).filter((o) => o !== undefined);
    panel.classList.toggle("tbh-choice", offered.length > 0);
    if (offered.length === 0) panel.classList.remove("tbh-peek");

    const d = runCombos(link);
    if (d === undefined) {
      const problem = link.error === undefined ? "Reading the game's content..." : `Can't read the game's content: ${link.error}. The game changed; tibobit needs an update.`;
      if (panelSignature !== problem) renderProblem(panel, content, problem);
      panelSignature = problem;
      return;
    }
    if (lastInputs?.[0] !== d || lastInputs[1] !== link.icons) {
      lastInputs = [d, link.icons];
      version++;
    }
    const loadout = readLoadout(game.state);
    discovery.settle(loadout, new Set(offered.map((o) => o.key)));
    const view: View = { d, discovery, icons: link.icons, loadout, banished: game.state.loadout.banished };
    const signature = `${[...loadout].join(",")}|${[...view.banished].join(",")}|${discovery.version}|${version}`;
    if (signature !== panelSignature) {
      panelSignature = signature;
      renderPanel(panel, content, view);
    }
    for (const card of cards) annotateCard(card, view, version);
    dropStaleTip();
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  link.onChange(schedule);
  new MutationObserver((records) => {
    if (records.some((r) => !panel.contains(r.target) && !(r.target instanceof Element && r.target.closest(".tbh-card")))) schedule();
  }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["data-tip", "hidden"] });
  setInterval(schedule, 1000);
  schedule();
}
