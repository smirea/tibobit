// The planner's and the action model's prompts are templates the coach writes before every run.
// `{{name}}` takes a piece of the game state, which the bot renders only when a template uses it.

import type { Checked } from "../protocol/parse";
import { GIVE_UP_SECONDS, HURT_SECONDS } from "./limits";

/** State blocks every template may use. The bot renders each from the live game. */
export const BLOCKS = {
  time: "game time as m:ss",
  difficulty: "the run's difficulty, such as nightmare",
  mode: "daily or world",
  health: "health, its share of max and its trend over the last 30 seconds, e.g. 'Health 80/120 (67%, down from 90% 25 seconds ago).' It adds ', which is low' under 40%",
  level: "level and the share of the way to the next",
  gold: "gold held",
  dash: "dash charges",
  weapons: "weapons held (of 6 slots), each with its level and the game's description",
  passives: "passives held (of 6 slots), each with its level and the game's description",
  items: "items held with counts and the game's descriptions",
  banished: "what was banished this run, which the game never offers again",
  recipes: "every recipe that uses something held, with each part's state",
  evolutions: "what the next chest evolves, or that no recipe is complete",
  standing_on: "the chest or spot Tibo stands on and how far it is charged, and the ground damage sources standing still would take, by the forecast",
  hurt_by: "damage taken in the last 3 seconds by source",
  dps: "damage dealt a second over the last 3 seconds, e.g. 'Damage dealt a second over the last 3 seconds: 412.' (not part of {{state}})",
  bosses: "bosses with distance, direction and health",
  enemies: "enemies on screen, and the directions with the most and the fewest",
  current_goal: "the goal under way and since when",
  recent_goals: "the last 6 goals and how each ended",
  weapon_damage: "damage dealt so far by each weapon held, most first, with its rate a minute, e.g. 'Damage dealt so far by weapon: Steam Vent 4012 (1783 a minute), Hash Hawk 2210 (982 a minute).' (not part of {{state}})",
  stats: "every effective stat by the game's own name (damageMult, maxHp, armor, recovery, magnetRadius, luck and the rest), and what Spud Shrines have added",
  resources: "rerolls, skips, banishes and revives left, and the curses held with the extra elites and bosses they add",
  buffs: "timed boosts running (the game's gold rush, frenzy and the like), with seconds left",
  schedule: "the next boss, elite and event, by the game's names, with the time each comes",
  elites: "every elite alive: name, health, contact damage, distance and direction",
  hazards: "within the forecast's horizon: the game's hazard kinds underfoot and in each direction's path, attack zones near Tibo (kind, shape, whether Tibo is inside, when a telegraph lands, which directions walk into it), and bullets that would hit a Tibo standing still",
  pickups: "the total xp and gold on the ground, and the chests, food and other pickups with their distance and direction",
  spots: "every unused spot on the loaded map, nearest first, with the game's name and description, distance, direction, charge, radius and price",
  dogs: "each of Tibo's dogs: name, breed, the game's description, level, the game's own definition (ability, aura, levelUps and the rest) and what it has done so far by the game's counts",
  events: "what the game showed in the last 15 seconds (boss arrivals, banners, chests), with the times",
  counters: "every number in the game's counters and run that is not zero: distance, hits, crits, nearMisses, dodgePoints, peakEnemies, goldEarned, shrinesUsed and the rest",
  offer: "the choice open now, for the picker: everything Tibo has equipped with the game's descriptions, every option offered with its description (a new weapon, passive or item marked when it leads to an evolution), and every evolution recipe that can still be found",
  state: "a short default, one per line: time, health, level, gold, dash, weapons, passives, items, banished (when any), recipes, evolutions, standing_on, hurt_by, bosses, enemies, current_goal and recent_goals. Every other block is left out unless a template names it",
} as const;

export type BlockName = keyof typeof BLOCKS;

/** Where each template is used, the extra values it may use on top of BLOCKS, and the ones it must. */
export const SLOTS = {
  "planner.state": { about: "the planner's state: everything it reads before each decision, sent once per planner call", vars: { why: "why the planner is asked now: the run started, a goal ended, a choice opened, a card was just taken, a boss appeared, or N seconds passed" }, required: [] },
  "planner.goal": { about: "asked once per goal option as a yes/no question (noul); the option rated highest becomes the goal", vars: { goal: "one goal option in words, e.g. 'walk to the chest 120 away to the up-left and stand on it for 1 seconds to open it, which gives a free pick'" }, required: ["goal"] },
  "planner.pick": { about: "asked once at a level-up, chest or shrine as a choice among every option the game gives, rerolls, skips and banishes included; each card key carries its kind, slot, the evolutions a new entry leads to, and the game's description", vars: { choice: "level-up, chest or shrine" }, required: [] },
  "action.state": { about: "the action model's state, sent once per step it is asked about", vars: { goal: "the goal in words with its progress, e.g. 'open the chest, 80 away to the left'" }, required: [] },
  "action.hurt": { about: "asked once per move offered, answered on the scale: takes no damage, gets scratched, gets badly hurt, gets very badly hurt, dies", vars: { move: "one move in words: the game's own forecast over the forecastSeconds horizon first, then a boss or hazard that way, enemies close, and how it bears on the goal", goal: "as in action.state" }, required: ["move"] },
  "action.useful": { about: "asked once per move offered as a yes/no question (noul); among the moves rated about as safe as the safest, the most useful wins", vars: { move: "as in action.hurt", goal: "as in action.state" }, required: ["move"] },
  "action.dash": { about: "asked as a yes/no question when Tibo has a dash charge and an enemy or bullet is close; above dashThreshold (bossDashThreshold near a boss) Tibo dashes the chosen way. Empty: never dash", vars: { goal: "as in action.state" }, required: [] },
} as const;

export type TemplateSlot = keyof typeof SLOTS;

export type Knobs = { exploreDistance: number; evadeSeconds: number; stuckSeconds: number; extraDamage: number; safeMargin: number; distrustSeconds: number; distrustBossRange: number; planEvery: number; eliteSeconds: number; bossOfferRange: number; dashThreshold: number; bossDashThreshold: number; bossDashRange: number; eliteFrom: number; eliteMinHp: number; forecastSeconds: number; autopilot: number; holdAbortHurt: number; planOnHurt: number };

export const KNOBS: Record<keyof Knobs, { min: number; max: number; about: string }> = {
  exploreDistance: { min: 100, max: 1500, about: "units an explore goal walks before it ends; it also ends at the first chest never listed before" },
  evadeSeconds: { min: 2, max: 30, about: "seconds an evade goal lasts" },
  stuckSeconds: { min: 2, max: 20, about: "seconds without getting closer (or charging) before a goal is given up" },
  extraDamage: { min: 0, max: 0.25, about: "share of max health a move may cost over the cheapest move within the forecastSeconds horizon and still be taken: the page walks Tibo to the goal on its own while the way there costs no more than this over the cheapest, and the action model is never offered a move that costs more" },
  safeMargin: { min: 0, max: 0.5, about: "how far above the safest move's hurt rating (as a share of the scale) a move may be and still compete on usefulness" },
  distrustSeconds: { min: 0, max: 30, about: "after Tibo loses health on a step the forecast called free (a walk row), the action model is asked about every step for this many seconds instead of the page walking on its own; 0 trusts the forecast" },
  bossOfferRange: { min: 0, max: 600, about: "while a boss is within this many units, the action model is offered every move, even those the one-second forecast prices above extraDamage, since boss attacks are not in that forecast; 0 keeps the usual rule" },
  eliteSeconds: { min: 5, max: 60, about: "seconds a fight-the-elite goal lasts at most: Tibo heads for the elite and keeps it within reach of its weapons until it dies" },
  forecastSeconds: { min: 0.1, max: 2, about: "how far ahead the game's own simulation prices each move, and how far surroundings look for bullets that would hit, attacks and hazards on each path, in seconds; the action model weighs moves by what they cost over this horizon" },
  autopilot: { min: 0, max: 1, about: "1 takes every step without the action model: of the moves the forecast allows (those within extraDamage of the cheapest), Tibo takes the one nearest the way to the goal, and of two as near the cheaper; it never dashes and no action template is used. 0 asks the action model, as before. In the loop manager's own gym tests at minute 10, a mover that read only the forecast's prices lost no more health per trip than either action-model format, and it answers at once" },
  planEvery: { min: 1, max: 60, about: "seconds between planner calls while a goal is under way (it is also asked whenever a goal ends, a choice opens, a card is taken or a boss appears); short re-plans switch goals often, long ones let a goal finish. A person watching in the panel sets this instead" },
  distrustBossRange: { min: 0, max: 600, about: "while a boss is within this many units, the action model is asked about every step, since boss attacks from afar are not in the one-second forecast; 0 turns it off" },
  dashThreshold: { min: 0.05, max: 0.95, about: "how sure the action model's answer to action.dash must be (a probability) for Tibo to dash; lower dashes more often" },
  bossDashThreshold: { min: 0.05, max: 0.95, about: "the dash threshold instead of dashThreshold while a boss is within bossDashRange" },
  bossDashRange: { min: 0, max: 600, about: "while a boss is within this many units, bossDashThreshold applies; 0 never" },
  eliteFrom: { min: 0, max: 1200, about: "game seconds before which no fight-the-elite goal is offered, so the planner cannot pick one; 0 offers them from the start" },
  eliteMinHp: { min: 0, max: 1, about: "share of max health below which no fight-the-elite goal is offered; 0 offers them at any health" },
  holdAbortHurt: { min: 0, max: 0.5, about: `share of max health lost within the last ${HURT_SECONDS} seconds at which a goal that holds Tibo in place ends as given up and the planner is asked: standing on a chest, a shrine or another spot, or keeping an elite within reach. For ${GIVE_UP_SECONDS} seconds the planner then reads next to that target that Tibo gave up on it and why, like any goal given up; it can still pick it. 0 never ends a goal this way` },
  planOnHurt: { min: 0, max: 0.5, about: `share of max health lost within the last ${HURT_SECONDS} seconds at which the planner is asked at once, whatever planEvery says, and at most once in ${HURT_SECONDS} seconds; the goal under way goes on unless the planner picks another. 0 never asks for this` },
};


export type Templates = { planner: { state: string; goal: string; pick: string }; action: { state: string; hurt: string; useful: string; dash: string }; knobs: Knobs };

/** The prompts the bot played with before the coach wrote any; used when no run has templates yet. */
export const DEFAULT_TEMPLATES: Templates = {
  planner: {
    state: [
      "You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.",
      "The aim: survive 20 minutes on {{difficulty}}.",
      "Asked now because {{why}}. State now:",
      "{{state}}",
    ].join("\n\n"),
    goal: "If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger?",
    pick: "Tibo is at a {{choice}}. Which option makes Tibo strongest?",
  },
  action: {
    state: "Tibo is a potato hero in a survivors game. Weapons fire on their own; Tibo only walks.\nGoal: {{goal}}.\n{{health}}",
    hurt: "If Tibo does this: {{move}}. How badly does it hurt Tibo?",
    useful: "If Tibo does this: {{move}}. Does it bring Tibo closer to its goal ({{goal}})?",
    dash: "Is Tibo about to be hit or surrounded, so a quick dash away would save it?",
  },
  knobs: { exploreDistance: 300, evadeSeconds: 8, stuckSeconds: 6, extraDamage: 0.02, safeMargin: 0.1, distrustSeconds: 0, distrustBossRange: 0, planEvery: 5, eliteSeconds: 20, bossOfferRange: 0, dashThreshold: 0.5, bossDashThreshold: 0.5, bossDashRange: 0, eliteFrom: 0, eliteMinHp: 0, forecastSeconds: 0.5, autopilot: 0, holdAbortHurt: 0, planOnHurt: 0 },
};

export const STATE_LIMIT = 8000;

export const QUESTION_LIMIT = 800;

export function slotText(t: Templates, slot: TemplateSlot): string {
  const [model, key] = slot.split(".") as ["planner" | "action", string];
  return (t[model] as Record<string, string>)[key] ?? "";
}

/** Fills a template's `{{name}}`s; every name was checked against the slot when the template was accepted. */
export function render(template: string, values: Record<string, () => string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, name: string) => {
    const v = values[name];
    if (v === undefined) throw new Error(`no value for {{${name}}}`);
    return v();
  });
}

/** Reads templates from a coach reply or a notes file; anything left out keeps `base`. */
export function checkTemplates(raw: { planner?: unknown; action?: unknown; knobs?: unknown }, base: Templates): Checked<Templates> {
  const errors: string[] = [];
  const pick = (model: "planner" | "action"): Record<string, string> => {
    const given = raw[model];
    if (given === undefined) return { ...base[model] };
    if (typeof given !== "object" || given === null) {
      errors.push(`${model} must be an object`);
      return { ...base[model] };
    }
    const out: Record<string, string> = { ...base[model] };
    for (const [k, v] of Object.entries(given)) {
      if (!(`${model}.${k}` in SLOTS)) errors.push(`${model}.${k} is not a template; the templates are ${Object.keys(SLOTS).join(", ")}`);
      else if (typeof v !== "string") errors.push(`${model}.${k} must be a string`);
      else out[k] = v;
    }
    return out;
  };
  const templates = { planner: pick("planner"), action: pick("action"), knobs: { ...base.knobs } } as Templates;
  for (const slot of Object.keys(SLOTS) as TemplateSlot[]) {
    const text = slotText(templates, slot);
    const { vars, required } = SLOTS[slot];
    const limit = slot.endsWith(".state") ? STATE_LIMIT : QUESTION_LIMIT;
    if (text.length > limit) errors.push(`${slot} is ${text.length} characters; keep it under ${limit}`);
    if (text.includes("~~~")) errors.push(`${slot} must not contain ~~~`);
    if (text.trim() === "" && slot !== "action.dash") errors.push(`${slot} is empty`);
    const used = [...text.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1] ?? "");
    for (const name of used) if (!(name in BLOCKS) && !(name in vars)) errors.push(`${slot} uses {{${name}}}, which it cannot: it may use ${[...Object.keys(BLOCKS), ...Object.keys(vars)].join(", ")}`);
    for (const name of required as readonly string[]) if (!used.includes(name)) errors.push(`${slot} must use {{${name}}}`);
  }
  if (raw.knobs !== undefined) {
    if (typeof raw.knobs !== "object" || raw.knobs === null) errors.push("knobs must be an object");
    else
      for (const [k, v] of Object.entries(raw.knobs)) {
        const range = KNOBS[k as keyof Knobs];
        if (range === undefined) errors.push(`knobs.${k} is not a knob; the knobs are ${Object.keys(KNOBS).join(", ")}`);
        else if (typeof v !== "number" || !(v >= range.min && v <= range.max)) errors.push(`knobs.${k} must be a number from ${range.min} to ${range.max}`);
        else templates.knobs[k as keyof Knobs] = v;
      }
  }
  return errors.length > 0 ? { errors } : { value: templates };
}
