import type { GameLink } from "../link/game-link";
import { inRun, modeScreen, pauseMenuOpen } from "../link/screen";
import type { CommandStatus } from "../../protocol/commands";
import type { Forecast, Snapshot } from "../../protocol/snapshot";
import { reflect } from "./reflect";
import { surroundings } from "./surroundings";

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

/** `seconds` is how far the surroundings look ahead: the forecast's horizon. */
export function snapshot(link: GameLink, commands: CommandStatus[], forecast: Forecast | undefined, seconds: number): Snapshot {
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
    ...(reflection === undefined || !playing ? {} : { surroundings: surroundings(link, game.state, seconds, { enemies: (reflection.enemies ?? []) as Record<string, unknown>[], pickups: (reflection.pickups ?? []) as Record<string, unknown>[] }) }),
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
