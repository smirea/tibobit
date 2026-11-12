// Full Self Driving as the bot plays it: the panel's function sets the goals, the autopilot
// takes every step, and the decision model is asked only to pick cards, by the loadout question.
import type { Drive } from "../protocol/drive";
import { BLOCKS, checkTemplates, DEFAULT_TEMPLATES, QUESTION_LIMIT, type Templates } from "./templates";

/** What the picker reads before the loadout question. */
const PICKER = "You pick the upgrades of Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own.\n\nState now:\n\n{{state}}\n\n{{offer}}";

/** What the loadout question may embed: the state blocks, and the kind of choice that is open. */
export const EMBEDS = { ...BLOCKS, choice: "level-up, chest or shrine" };

/** Everything that would keep the picker from being asked this question. */
export function loadoutErrors(loadout: string): string[] {
  const errors = [...new Set([...loadout.matchAll(/\{\{([\w.]+)\}\}/g)].map((m) => m[1] ?? ""))].filter((name) => !(name in EMBEDS)).map((name) => `{{${name}}} is not part of the state`);
  if (loadout.includes("~~~")) errors.push("~~~ is not allowed");
  if (loadout.trim() === "") errors.push("the picker needs a question");
  if (loadout.length > QUESTION_LIMIT) errors.push(`${loadout.length} characters; keep it under ${QUESTION_LIMIT}`);
  return errors;
}

/** The templates the bot plays with under Full Self Driving. */
export function driveTemplates(drive: Drive): Templates {
  const checked = checkTemplates({ planner: { state: PICKER, pick: drive.loadout }, knobs: { autopilot: 1 } }, DEFAULT_TEMPLATES);
  if ("errors" in checked) throw new Error(`the Full Self Driving loadout cannot be played: ${checked.errors.join("; ")}`);
  return checked.value;
}
