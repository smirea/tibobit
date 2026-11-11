import { BLOCKS, KNOBS, QUESTION_LIMIT, SLOTS, STATE_LIMIT, type TemplateSlot } from "../bot/templates";
import { GIVE_UP_SECONDS, PLAN_RANGE } from "../bot/limits";

export function catalog(): string {
  const slots = (Object.entries(SLOTS) as [TemplateSlot, (typeof SLOTS)[TemplateSlot]][]).map(
    ([slot, s]) => `- ${slot}: ${s.about}. Extra values: ${Object.entries(s.vars).map(([k, v]) => `{{${k}}} (${v})`).join(", ")}.${s.required.length > 0 ? ` Must use ${s.required.map((x) => `{{${x}}}`).join(", ")}.` : ""}`,
  );
  return [
    `Templates (each under ${QUESTION_LIMIT} characters, except the two .state templates, under ${STATE_LIMIT}):`,
    ...slots,
    "",
    "State blocks any template may use:",
    ...Object.entries(BLOCKS).map(([k, v]) => `- {{${k}}}: ${v}`),
    "",
    "Knobs:",
    ...Object.entries(KNOBS).map(([k, v]) => `- ${k} (${v.min} to ${v.max}): ${v.about}`),
  ].join("\n");
}


/** How the game and the bot work. Only code changes this; the coach asks through infrastructure requests. */
export function botFacts(models: { planner: string; action: string }): string {
  return [
    "tibo.dog is a survivors-like game. Weapons fire on their own; the player only walks, dashes, and picks level-up upgrades, chest rewards and shrine options. Tibo has 6 weapon and 6 passive slots. A base weapon at max level plus its catalyst (a passive or an item) evolves at the next chest; evolved weapons are much stronger, and two evolved weapons can sometimes fuse into a union.",
    `Two in-game models play, and which models they are is fixed: the planner (${models.planner}) and the action model (${models.action}). They are small, fast decision models that never write text. Each call sends one state text and a set of questions, all answered against that state: a yes/no question answered as a probability from 0 to 1 (noul), a score on a named scale, or a choice among keys. The templates are that state text and those questions.`,
    "The planner is asked when the game starts, when a goal ends, at every level-up, chest and shrine choice, right after a card is taken, when a boss first appears, and every planEvery seconds while a goal is under way. Each time it rates every goal option with planner.goal, and the highest-rated becomes Tibo's goal. At a choice it also picks a card with planner.pick; a choice with one card it can take is taken without asking.",
    `The goal options the bot offers: up to 4 chests within ${PLAN_RANGE} units (stand on one for its charge time to open it: a free pick, and it evolves whatever recipe is ready); up to 6 spots that charge, such as shrines, each with the game's description; up to 2 food pickups, which heal; up to 2 elites within range to fight until they die (eliteSeconds at most; elites drop chests); exploring each of the 8 directions for exploreDistance units, stopping at the first chest never listed before; and evading enemies for evadeSeconds. Chests are not laid out on the map: bosses and elites drop them when they die (extra elites and bosses, such as a curse adds, drop none), and a dropped chest stays until it is opened. A target Tibo gave up on carries that note for ${GIVE_UP_SECONDS} seconds. A goal ends when its target is used up, after stuckSeconds without getting closer or charging, or well past the time the walk should take.`,
    "Every game plays live, as a person plays it: the game never pauses while the models think (only a level-up, chest or shrine choice stops it). Lockstep, which paused it, is banned as a crutch. Every step (about 0.2 to 0.3 seconds) the game's own simulation forecasts each of the 8 directions and standing still forecastSeconds ahead; live, it first plays the held move for the time the decision takes. While the way to the goal costs no more than the cheapest move plus extraDamage, the page walks Tibo there without asking a model. Otherwise the action model is asked action.hurt and action.useful about every move that does not cost more than that; the moves rated about as safe as the safest (within safeMargin, and below the middle of the scale) compete on usefulness, and the most useful wins. With a dash charge and an enemy or bullet close, action.dash decides whether Tibo dashes that way.",
    "Winning means surviving to 20:00; the game goes on after that until Tibo dies. In Open World on Nightmare, winning at Nightmare level N unlocks level N+1, and a full run starts the highest level unlocked, so the ladder climbs one level per win and never drops. Every Nightmare level makes pests and bosses tougher; on every level they start at 40% of their health and grow to full by 8:00, so the opening minutes are the cheapest. A run that passes 20:00 also drops gear, which the bot cannot equip yet.",
  ].join("\n\n");
}
