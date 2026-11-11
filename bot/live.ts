// The bot plays live, as a person does: the game runs in real time and never pauses for the models,
// and each move is held until the next decision replaces it. A level-up or chest still stops the
// game, as it does for a person.
/** Whether this run's game has been set to play live; a new run starts paused at tick 0. */
import { command, send } from "./server";
import { knobs } from "./playing";

export let modeSet = false;

// Live, a move lands a while after the snapshot it was chosen from: the page forecasts one move at a
// time, so a move's forecast is half a round of nine old on average (about 100ms, more in a big
// crowd), the snapshot is some ms old, and the action model takes its time. Tibo keeps its current move meanwhile, so the page's forecast plays that first.
// Measured over 10,640 live steps, a move forecast as free lost health 14.5% of the time when it
// turned Tibo and 1.4% when it kept the direction: the turn was planned from where Tibo no longer was.
const FORECAST_REFRESH_LAG = 0.1;

let decideSeconds = 0.18;

/** This step asked the action model, so the next one does not wait out the step time. */
export let modelSteered = false;

let lagSent = -1;

function lagNow(ageMs: number): number {
  return Math.min(1, Math.max(0, ageMs / 1000 + decideSeconds + FORECAST_REFRESH_LAG));
}

export async function tellLag(ageMs: number) {
  const lag = Math.round(lagNow(ageMs) * 100) / 100;
  if (Math.abs(lag - lagSent) < 0.03) return;
  lagSent = lag;
  await send({ type: "forecast", live: true, lag, seconds: knobs().forecastSeconds });
}

export async function setMode() {
  await command({ type: "speed", factor: 1 });
  lagSent = lagNow(30);
  await command({ type: "forecast", live: true, lag: lagSent, seconds: knobs().forecastSeconds });
  await command({ type: "resume" });
  modeSet = true;
}

/** The action model just chose a step, which took `ms`. */
export function noteModelStep(ms: number) {
  decideSeconds = 0.8 * decideSeconds + 0.2 * (ms / 1000);
  modelSteered = true;
}

export function beginStep() {
  modelSteered = false;
}

/** A new run waits paused at tick 0, so the next step sets it going live. */
export function forgetMode() {
  modeSet = false;
}
