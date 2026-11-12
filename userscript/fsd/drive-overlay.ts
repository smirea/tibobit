import { css } from "./drive-overlay.css";
import { codeView } from "./code-view";
import type { StateField } from "./driver-types";
import type { Action } from "../../protocol/driver";
import type { Pilot } from "../pilot/pilot";
import { addStyle, h } from "../panel/dom";

/** An action as the function returned it, without its `why`. */
export const actionWords = (action: Action): string => {
  const { type, why: _, ...rest } = action;
  return [type, ...Object.entries(rest).map(([k, v]) => (k === "id" ? `#${v}` : String(v)))].join(" ");
};

/** The function in the screen's top left corner while the bot drives, with the line that returned the action it is on lit. */
export function driveOverlay(pilot: Pilot, fields: readonly StateField[], types: ReadonlyMap<string, string>) {
  addStyle(css);
  const view = codeView(fields, types, true);
  const why = h("b", "tbh-do-why");
  const action = h("span", "tbh-do-action");
  const box = h("aside", "tbh-do", h("header", "tbh-do-head", h("span", "tbh-do-logo", "FSD"), why, action), view.el);
  box.setAttribute("aria-label", "Full Self Driving's function");
  box.hidden = true;
  document.body.append(box);
  const render = () => {
    box.hidden = pilot.state().state === "off";
    if (box.hidden) return;
    const now = pilot.active();
    why.textContent = now?.error !== undefined ? "drive threw" : (now?.action?.why ?? "");
    action.textContent = now?.error ?? (now?.action === undefined ? "waiting for the first call" : actionWords(now.action));
    box.classList.toggle("tbh-do-error", now?.error !== undefined);
    view.show(pilot.draft().code, now?.action?.why);
  };
  pilot.onChange(render);
  render();
}
