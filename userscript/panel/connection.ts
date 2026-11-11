import { validPort } from "../../protocol/address";
import type { Bridge } from "../agent/bridge";
import { h } from "./dom";

/** Port picker for the agent server, so a tab can join a server other than the default one, and the button that opens Full Self Driving. */
export function connectionRow(bridge: Bridge, openFsd: (from: HTMLElement) => void): HTMLElement {
  const input = h("input", "tbh-port");
  input.type = "number";
  input.min = "1";
  input.max = "65535";
  input.value = String(bridge.status().port);
  input.setAttribute("aria-label", "Agent server port");
  const button = h("button", "tbh-connect", "Connect");
  const connected = h("span", "tbh-connected", "connected");
  const dot = h("span", "tbh-dot");
  dot.setAttribute("aria-hidden", "true");
  const status = h("div", "tbh-conn-status");
  const wheel = h("button", "tbh-wheel", "Full Self Driving");
  wheel.type = "button";
  wheel.addEventListener("click", () => openFsd(wheel));
  const wheelNote = h("div", "tbh-wheel-note");

  const refresh = () => {
    const s = bridge.status();
    const live = s.state === "connected";
    // "connected" stands in for the button until the box names a different port.
    const here = live && Number(input.value) === s.port;
    button.hidden = here;
    connected.hidden = !here;
    dot.hidden = !live;
    const text = live ? "" : (s.error ?? `connecting to :${s.port}…`);
    if (status.textContent !== text) status.textContent = text;
    status.hidden = text === "";
    status.dataset.state = s.error === undefined ? "wait" : "error";
    const pilot = bridge.pilot.state();
    // While the bot plays, its controls sit at the top of its chat.
    wheel.hidden = pilot.state !== "off";
    wheelNote.textContent = pilot.detail ?? "";
    wheelNote.hidden = pilot.detail === undefined;
  };
  const connect = (e: SubmitEvent) => {
    e.preventDefault();
    const port = Number(input.value);
    input.classList.toggle("tbh-invalid", !validPort(port));
    if (!validPort(port)) return;
    bridge.connect(port);
  };
  // A form, because Enter submits it as a default action, which still happens after guardPanelKeys
  // stops the key event from reaching anything else.
  const row = h("form", "tbh-conn-row", h("span", "tbh-conn-label", "Agent port"), input, button, connected, dot);
  row.noValidate = true;
  row.addEventListener("submit", connect);
  bridge.onChange(refresh);
  bridge.pilot.onChange(refresh);
  input.addEventListener("input", () => {
    input.classList.remove("tbh-invalid");
    refresh();
  });
  refresh();
  return h("div", "tbh-conn", row, status, wheel, wheelNote);
}
