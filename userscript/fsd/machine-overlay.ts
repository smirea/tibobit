import { css } from "./machine-overlay.css";
import type { Entity } from "./entities";
import { machineView } from "./machine-view";
import type { Pilot } from "../pilot/pilot";
import { addStyle, h } from "../panel/dom";

/** The state machine in the screen's top left corner while the bot drives, with the state it is in lit. */
export function machineOverlay(pilot: Pilot, entities: () => Entity[]) {
  addStyle(css);
  const view = machineView(true, (kind) => entities().find((e) => e.kind === kind)?.name);
  const name = h("b", "tbh-mo-name");
  const box = h("aside", "tbh-mo", h("header", "tbh-mo-head", h("span", "tbh-mo-logo", "FSD"), name), view.el);
  box.setAttribute("aria-label", "Full Self Driving's state machine");
  box.hidden = true;
  document.body.append(box);
  const render = () => {
    box.hidden = pilot.state().state === "off";
    if (box.hidden) return;
    const machine = pilot.draft().machine;
    name.textContent = machine.id;
    view.show(machine, pilot.active());
  };
  pilot.onChange(render);
  render();
}
