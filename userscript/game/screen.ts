import type { GameMode } from "../../protocol/commands";
import { GameLink } from "./link";

export const PANEL_ID = "tibo-helper";
/** Everything this script adds to the page: the panel, and the port box and overlays outside it. */
const OURS = `#${PANEL_ID}, [class*='tbh-']`;

// The game's own buttons; the helper's panel and port box are never pressed by an agent command.
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

export function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Some menu buttons only answer a click and others only a focused Enter, so try both.
export async function press(el: HTMLElement) {
  el.click();
  await wait(300);
  if (!el.isConnected) return;
  el.focus();
  for (const type of ["keydown", "keyup"]) el.dispatchEvent(new KeyboardEvent(type, { key: "Enter", code: "Enter", bubbles: true }));
}

export const byTestId = (id: string) => document.querySelector<HTMLButtonElement>(`[data-testid="${id}"]`) ?? undefined;
export const locked = (b: HTMLButtonElement | undefined) => b === undefined || b.disabled || b.getAttribute("aria-disabled") === "true";

export async function until(check: () => boolean, ms: number): Promise<boolean> {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    if (check()) return true;
    await wait(100);
  }
  return check();
}

/**
 * The open choice's cards and buttons in on-screen order, for the panel's pick overlay. Level-ups,
 * chests and shrines show cards; shops such as the vendor or the dog kennel show plain buttons.
 */
export function choiceCards(): HTMLElement[] {
  const cards = [...document.querySelectorAll<HTMLElement>("button.ui-card, .ui-card[data-tip]")];
  // The other buttons of the overlay: Leave in a shop, Reroll and Skip on a level-up. Banish is
  // left out because it only toggles a mode for the next click.
  const buttons = [...document.querySelectorAll<HTMLButtonElement>("button")].filter(
    (b) =>
      !b.matches(".ui-card, .ui-pause-btn, .ui-sound") &&
      !b.closest(OURS) &&
      b.getClientRects().length > 0 &&
      (b.textContent ?? "").trim() !== "" &&
      !/^banish/i.test((b.textContent ?? "").trim()),
  );
  return [...cards, ...buttons];
}

/** The game's pause menu (Escape or P) stops the run without setting the sim's own paused flag. */
export function pauseMenuOpen(): boolean {
  return [...document.querySelectorAll<HTMLButtonElement>("button")].some((b) => !b.closest(OURS) && b.textContent?.trim() === "Resume" && b.getClientRects().length > 0);
}

export function inRun(link: GameLink): boolean {
  const hud = document.querySelector(".hud-weapons");
  return link.game !== undefined && !link.game.state.over && hud !== null && hud.getClientRects().length > 0;
}
