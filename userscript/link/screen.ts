import type { GameMode } from "../../protocol/commands";
import { GameLink } from "./game-link";

export const PANEL_ID = "tibo-helper";
/** Everything this script adds to the page: the panel, and the port box and overlays outside it. */
export const OURS = `#${PANEL_ID}, [class*='tbh-']`;

// The game's own buttons; nothing this script adds is ever pressed by an agent command.
export function button(label: string | RegExp): HTMLButtonElement | undefined {
  return [...document.querySelectorAll<HTMLButtonElement>("button")].find((b) => {
    if (b.closest(OURS)) return false;
    const text = b.textContent?.trim() ?? "";
    return typeof label === "string" ? text === label : label.test(text);
  });
}

/** The open mode screen (difficulty buttons and Start), if any; the Daily one also has a Leaderboard button. */
export function modeScreen(): GameMode | undefined {
  if (button("Start") === undefined) return undefined;
  return button("Leaderboard") === undefined ? "openWorld" : "daily";
}

/** The game's pause menu (Escape or P) stops the run without setting the sim's own paused flag. */
export function pauseMenuOpen(): boolean {
  return [...document.querySelectorAll<HTMLButtonElement>("button")].some((b) => !b.closest(OURS) && b.textContent?.trim() === "Resume" && b.getClientRects().length > 0);
}

export function inRun(link: GameLink): boolean {
  const hud = document.querySelector(".hud-weapons");
  return link.game !== undefined && !link.game.state.over && hud !== null && hud.getClientRects().length > 0;
}
