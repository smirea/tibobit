// Full Self Driving: the instructions a person writes in the panel for the bot that plays the tab.
import { fail, num } from "./parse";

/** Instructions that join the planner's prompt from `at` seconds of game time until the next step's time. */
export type DriveStep = { at: number; text: string };

/**
 * `prompt` goes to the planner every time it runs, followed by the step in effect. `loadout` is the
 * picker's question at every level-up, chest and shrine. `{{name}}` in any of them embeds a piece of
 * the game state (bot/templates.ts BLOCKS).
 */
export type Drive = { prompt: string; loadout: string; steps: DriveStep[]; planEvery: number };

/** Seconds between planner runs while a goal is under way; it also runs whenever its instructions change. */
export const PLAN_EVERY = { min: 5, max: 30, initial: 10 } as const;

/** The step in effect at this game time: the last one whose time has come. */
export function activeStep(steps: readonly DriveStep[], time: number): number {
  let at = 0;
  for (const [i, s] of steps.entries()) if (s.at <= time) at = i;
  return at;
}

function text(v: unknown, what: string): string {
  return typeof v === "string" ? v : fail(`${what} must be a string`);
}

/** Checks a drive's shape and its steps' order; what its embeds may name is the bot's to check (bot/drive.ts). */
export function parseDrive(input: unknown): Drive {
  const d = (input ?? {}) as Record<string, unknown>;
  const planEvery = num(d.planEvery, "drive.planEvery");
  if (planEvery < PLAN_EVERY.min || planEvery > PLAN_EVERY.max) fail(`drive.planEvery must be from ${PLAN_EVERY.min} to ${PLAN_EVERY.max} seconds`);
  if (!Array.isArray(d.steps) || d.steps.length === 0) fail("drive.steps must be a list with the step at 0 seconds first");
  const steps = d.steps.map((raw: unknown, i) => {
    const s = (raw ?? {}) as Record<string, unknown>;
    return { at: num(s.at, `drive.steps[${i}].at`), text: text(s.text, `drive.steps[${i}].text`) };
  });
  if (steps[0]?.at !== 0) fail("drive.steps must start with a step at 0 seconds");
  for (let i = 1; i < steps.length; i++) if (!((steps[i]?.at ?? 0) > (steps[i - 1]?.at ?? 0))) fail(`drive.steps[${i}].at must come after the step before it`);
  return { prompt: text(d.prompt, "drive.prompt"), loadout: text(d.loadout, "drive.loadout"), steps, planEvery };
}
