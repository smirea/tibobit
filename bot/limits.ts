// The bot's fixed numbers that the coach is told about, in one place for the bot and for what the loop tells the coach.

/** The bot's goal options reach this far. */
export const PLAN_RANGE = 600;
/** A target given up on is noted in the planner's questions for this long. */
export const GIVE_UP_SECONDS = 45;
/** How many of each kind of target the planner is offered as goals, nearest first. */
export const GOAL_OPTIONS = { chests: 4, spots: 6, food: 2, elites: 2, magnets: 2 };
/** How long an answer asked while the game runs may take before the bot goes on without it. */
export const LIVE_ANSWER_MS = 1200;
/** The window of the game's recent damage the bot reads (`tibo.hurtBy`). */
export const HURT_SECONDS = 3;
