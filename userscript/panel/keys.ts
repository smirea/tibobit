import { PANEL_ID } from "../link/screen";

const ownKeydowns = new Set<(e: KeyboardEvent) => void>();

/** A key pressed inside this script's own UI. The guard below stops the event before it reaches its target, so a shortcut there listens here instead. */
export function onOwnKeydown(listener: (e: KeyboardEvent) => void) {
  ownKeydowns.add(listener);
}

/**
 * The game reads keys on the window, so typing a port would otherwise steer or pick cards. This has
 * to run at document-start, before the game's own listeners, to see the keys first.
 */
export function guardPanelKeys() {
  for (const type of ["keydown", "keyup", "keypress"]) {
    window.addEventListener(
      type,
      (e) => {
        if (!(e.target instanceof Element) || e.target.closest(`#${PANEL_ID}, .tbh-fsd`) === null) return;
        e.stopImmediatePropagation();
        if (type === "keydown") for (const listener of ownKeydowns) listener(e as KeyboardEvent);
      },
      true,
    );
  }
}
