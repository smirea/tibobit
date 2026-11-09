import type { Game, GameLink } from "../game";
import { modeScreen } from "./menu";
import { DIRECTIONS, type CommandStatus, type Forecast, type Snapshot } from "./protocol";
import { reflect } from "./reflect";

// The game's own sim, run forward on a copy: exact for every attack, pool and bullet pattern.
const SIM_FORECAST_TICKS = 60;
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

let forecastCache: { game: Game; tick: number; forecast: Forecast } | undefined;

// While the game is paused between agent steps, once per tick: the snapshot is pushed many times per
// tick then. A running game is forecast only on request (`forecast` live), and then at most every
// LIVE_FORECAST_TICKS, because each forecast runs the sim nine times over and would slow the game;
// in between, snapshots repeat the last one, a fraction of a second old.
const LIVE_FORECAST_TICKS = 12;
function simForecast(link: GameLink, game: Game): Forecast | undefined {
  const s = game.state;
  if (link.forecast === undefined || s.over || s.choiceQueue.length > 0 || !(s.paused || link.liveForecast)) return undefined;
  const cached = forecastCache?.game === game ? forecastCache : undefined;
  if (cached !== undefined && (cached.tick === s.tick || (!s.paused && s.tick > cached.tick && s.tick - cached.tick < LIVE_FORECAST_TICKS))) return cached.forecast;
  const inputs = [...DIRECTIONS.map((_, i) => ({ x: Math.cos((i * Math.PI) / 4), y: Math.sin((i * Math.PI) / 4) })), { x: 0, y: 0 }];
  // A paused game waits for the agent, so the move lands on this very tick; a running one keeps going meanwhile.
  const lagTicks = s.paused ? 0 : link.forecastLagTicks;
  const outcomes = link.forecast(game, inputs, SIM_FORECAST_TICKS, lagTicks).map((f) => ({ damage: f.damage, dead: f.dead, bySource: f.bySource }));
  const moves = Object.fromEntries([...DIRECTIONS, "still" as const].map((m, i) => [m, outcomes[i] ?? { damage: 0, dead: false, bySource: {} }])) as Forecast["moves"];
  const forecast = { lag: lagTicks / TICKS_PER_SECOND, seconds: SIM_FORECAST_TICKS / TICKS_PER_SECOND, moves };
  forecastCache = { game, tick: s.tick, forecast };
  return forecast;
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

export function snapshot(link: GameLink, commands: CommandStatus[]): Snapshot {
  link.noteRunLink();
  const game = link.game;
  const playing = game !== undefined && inRun(link);
  const runMode = game === undefined ? undefined : game.state.daily === undefined ? "openWorld" : "daily";
  const mode = playing ? runMode : (modeScreen() ?? runMode);
  const loaded = game !== undefined && link.table !== undefined && link.ready;
  const forecast = playing && loaded ? simForecast(link, game) : undefined;
  const screen = game === undefined || (!playing && !game.state.over) ? "title" : game.state.over ? "over" : game.state.choiceQueue.length > 0 ? "choice" : game.state.paused || pauseMenuOpen() ? "paused" : "run";
  return {
    capturedAt: Date.now(),
    screen,
    ...(loaded ? { game: reflect(link, game.state), gameEvents: link.events.map(json) } : {}),
    storage: gameStorage(),
    headless: navigator.webdriver,
    ...(link.simBuild === undefined ? {} : { gameBuild: link.simBuild }),
    ...(forecast === undefined ? {} : { forecast }),
    commands,
    ...(link.error === undefined ? {} : { error: link.error }),
    ...(link.runLink === undefined ? {} : { lastRunLink: link.runLink }),
    ...(mode === undefined ? {} : { mode }),
  };
}
