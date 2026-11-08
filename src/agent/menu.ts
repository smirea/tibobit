import type { GameMode } from "./protocol";

// The game's own buttons; the helper's panel and port box are never pressed by an agent command.
export function button(label: string | RegExp): HTMLButtonElement | undefined {
  return [...document.querySelectorAll<HTMLButtonElement>("button")].find((b) => {
    if (b.closest("#tibo-helper, [class*='tbh-']")) return false;
    const text = b.textContent?.trim() ?? "";
    return typeof label === "string" ? text === label : label.test(text);
  });
}

/** The open mode screen (difficulty buttons and Start), if any; the Daily one also has a Leaderboard button. */
export function modeScreen(): GameMode | undefined {
  if (button("Start") === undefined) return undefined;
  return button("Leaderboard") === undefined ? "openWorld" : "daily";
}
