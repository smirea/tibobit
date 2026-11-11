// Full Self Driving as the bot plays it: the person's instructions become the planner's templates,
// and the autopilot takes every step, so no action model is asked.
import type { Drive } from "../protocol/drive";
import { BLOCKS, checkTemplates, DEFAULT_TEMPLATES, QUESTION_LIMIT, STATE_LIMIT, type Templates } from "./templates";

const GOAL = "If Tibo's next goal is to {{goal}}: is that what Tibo should do now, by the instructions above?";

/** What each field may embed beyond the state blocks: the planner's reason for running, and the picker's kind of choice. */
const EXTRA = { prompt: { why: "why the planner runs now: the run started, a goal ended, a card was taken, a boss appeared, the instructions changed or the interval passed" }, loadout: { choice: "level-up, chest or shrine" } } as const;

export const EMBEDS = { ...BLOCKS, ...EXTRA.prompt, ...EXTRA.loadout };

/** `field` is prompt, loadout, or the index of a step. */
export type DriveError = { field: "prompt" | "loadout" | number; message: string };

const embedded = (text: string) => [...text.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1] ?? "");

/** The planner's prompt while a step is in effect. */
const plannerState = (drive: Drive, step: number) => [drive.prompt, drive.steps[step]?.text ?? ""].filter((t) => t.trim() !== "").join("\n\n");

/** Everything that would keep the bot from playing these instructions, by the field to fix. */
export function driveErrors(drive: Drive): DriveError[] {
  const errors: DriveError[] = [];
  const unknown = (field: DriveError["field"], text: string, extra: Record<string, string>) => {
    for (const name of new Set(embedded(text))) if (!(name in BLOCKS) && !(name in extra)) errors.push({ field, message: `{{${name}}} is not part of the state` });
    if (text.includes("~~~")) errors.push({ field, message: "~~~ is not allowed" });
  };
  unknown("prompt", drive.prompt, EXTRA.prompt);
  unknown("loadout", drive.loadout, EXTRA.loadout);
  if (drive.loadout.trim() === "") errors.push({ field: "loadout", message: "the picker needs a question" });
  if (drive.loadout.length > QUESTION_LIMIT) errors.push({ field: "loadout", message: `${drive.loadout.length} characters; keep it under ${QUESTION_LIMIT}` });
  for (const [i, step] of drive.steps.entries()) {
    unknown(i, step.text, EXTRA.prompt);
    const state = plannerState(drive, i);
    if (state === "") errors.push({ field: i, message: "the planner gets no instructions here: write a prompt or this step" });
    if (state.length > STATE_LIMIT) errors.push({ field: i, message: `with the prompt this is ${state.length} characters; keep both under ${STATE_LIMIT}` });
  }
  return errors;
}

/** The templates the bot plays with while `step` is in effect. */
export function driveTemplates(drive: Drive, step: number): Templates {
  const checked = checkTemplates({ planner: { state: plannerState(drive, step), goal: GOAL, pick: drive.loadout }, knobs: { autopilot: 1 } }, DEFAULT_TEMPLATES);
  if ("errors" in checked) throw new Error(`the Full Self Driving instructions cannot be played: ${checked.errors.join("; ")}`);
  return checked.value;
}
