/** The panel's plan interval when someone watches, else --plan-every when given, else the coach's knob. */
import { pace, piloted } from "./server";
import { DEFAULT_TEMPLATES, type Knobs, type Templates } from "./templates";
import { args, PLAN_EVERY } from "./flags";

export const planEvery = () => (piloted ? pace.planEvery : args.includes("--plan-every") ? PLAN_EVERY : knobs().planEvery);

/** What the coach set for this run: the in-game models' prompts and the knobs below. */
export let templates: Templates = DEFAULT_TEMPLATES;

export const knobs = (): Knobs => templates.knobs;

export function setTemplates(next: Templates) {
  templates = next;
}
