import type { GameLink } from "../game";
import { modeScreen } from "./menu";
import type { CommandStatus, Forecast, Snapshot } from "../../protocol/protocol";
import { reflect } from "./reflect";
import { surroundings } from "./surroundings";

const TICKS_PER_SECOND = 60;

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
      !b.closest("#tibo-helper") &&
      b.getClientRects().length > 0 &&
      (b.textContent ?? "").trim() !== "" &&
      !/^banish/i.test((b.textContent ?? "").trim()),
  );
  return [...cards, ...buttons];
}

/** The game's pause menu (Escape or P) stops the run without setting the sim's own paused flag. */
function pauseMenuOpen(): boolean {
  return [...document.querySelectorAll<HTMLButtonElement>("button")].some((b) => !b.closest("#tibo-helper") && b.textContent?.trim() === "Resume" && b.getClientRects().length > 0);
}

export function inRun(link: GameLink): boolean {
  const hud = document.querySelector(".hud-weapons");
  return link.game !== undefined && !link.game.state.over && hud !== null && hud.getClientRects().length > 0;
}

/** The game's own localStorage entries, parsed where they are JSON. */
function gameStorage(): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key === null || !key.startsWith("tibo.")) continue;
      const raw = localStorage.getItem(key) ?? "";
      try {
        out[key] = JSON.parse(raw);
      } catch {
        out[key] = raw;
      }
    }
  } catch {}
  return out;
}

const json = (v: unknown): Record<string, unknown> => JSON.parse(JSON.stringify(v, (_k, x: unknown) => (x instanceof Map ? Object.fromEntries(x) : x instanceof Set ? [...x] : x))) as Record<string, unknown>;

export function snapshot(link: GameLink, commands: CommandStatus[], forecast: Forecast | undefined): Snapshot {
  link.noteRunLink();
  const game = link.game;
  const playing = game !== undefined && inRun(link);
  const runMode = game === undefined ? undefined : game.state.daily === undefined ? "openWorld" : "daily";
  const mode = playing ? runMode : (modeScreen() ?? runMode);
  const loaded = game !== undefined && link.table !== undefined && link.ready;
  const reflection = loaded ? reflect(link, game.state) : undefined;
  const screen = game === undefined || (!playing && !game.state.over) ? "title" : game.state.over ? "over" : game.state.choiceQueue.length > 0 ? "choice" : game.state.paused || pauseMenuOpen() ? "paused" : "run";
  return {
    capturedAt: Date.now(),
    screen,
    ...(reflection === undefined ? {} : { game: reflection, gameEvents: link.events.map(json) }),
    ...(reflection === undefined || !playing ? {} : { surroundings: surroundings(link, game.state, link.forecastTicks / TICKS_PER_SECOND, { enemies: (reflection.enemies ?? []) as Record<string, unknown>[], pickups: (reflection.pickups ?? []) as Record<string, unknown>[] }) }),
    storage: gameStorage(),
    headless: navigator.webdriver,
    ...(link.simBuild === undefined ? {} : { gameBuild: link.simBuild }),
    ...(forecast === undefined || !playing ? {} : { forecast }),
    commands,
    ...(link.error === undefined ? {} : { error: link.error }),
    ...(link.runLink === undefined ? {} : { lastRunLink: link.runLink }),
    ...(mode === undefined ? {} : { mode }),
  };
}
