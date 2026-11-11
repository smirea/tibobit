/** The panel's plan interval when someone watches, else --plan-every when given, else the coach's knob. */
import { pace, piloted } from "./server";
import { DEFAULT_TEMPLATES, type Knobs, type Templates } from "./templates";
import { has, PLAN_EVERY } from "./config";

export const planEvery = () => (piloted ? pace.planEvery : has("plan-every") ? PLAN_EVERY : knobs().planEvery);

/** What the coach set for this run: the in-game models' prompts and the knobs below. */
export let templates: Templates = DEFAULT_TEMPLATES;

export const knobs = (): Knobs => templates.knobs;

export function setTemplates(next: Templates) {
  templates = next;
}
