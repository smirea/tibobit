// The bot at the wheel: its settings, and the lines it shows in the panel.
import type { Envelope } from "./commands";
import { fail, num } from "./parse";

/**
 * "Grok take the wheel": the agent server runs the bot (bot/main.ts) for the tab, and the bot's
 * models talk in the panel. The planner is the decision model choosing cards and goals (and, between
 * runs, the coach reviewing them); the action model is the decision model steering a step, and
 * action messages also report goals starting and ending.
 */
const PILOT_ROLES = ["planner", "action", "system"] as const;
export type PilotRole = (typeof PILOT_ROLES)[number];
/** How often, in seconds, the bot asks its planner while a goal is under way, and takes a step. */
export type PilotPace = { planEvery: number; actEvery: number };
const DEFAULT_PACE: PilotPace = { planEvery: 5, actEvery: 0.3 };
export const PACE_LIMITS = { planEvery: { min: 0.5, max: 300, step: 0.5 }, actEvery: { min: 0.1, max: 5, step: 0.1 } } as const;
/** `incognito`: the bot just plays, keeping no notes and writing no review, so the run teaches nothing. */
export type PilotSettings = { pace: PilotPace; incognito: boolean };
export const DEFAULT_SETTINGS: PilotSettings = { pace: DEFAULT_PACE, incognito: false };
export type PilotState = PilotSettings & { state: "off" | "on" | "stopping"; detail?: string };
export type PilotChange = { on?: boolean; incognito?: boolean } & Partial<PilotPace>;

/** Validates a change to the pilot from the panel or a script; throws with a message a caller can act on. */
export function parsePilotChange(input: unknown): PilotChange {
  const c = (input ?? {}) as Record<string, unknown>;
  const change: PilotChange = {};
  for (const key of ["on", "incognito"] as const) {
    if (c[key] === undefined) continue;
    if (typeof c[key] !== "boolean") fail(`${key} must be true or false`);
    change[key] = c[key] as boolean;
  }
  for (const key of ["planEvery", "actEvery"] as const) {
    if (c[key] === undefined) continue;
    const { min, max, step } = PACE_LIMITS[key];
    const v = num(c[key], key);
    if (v < min || v > max) fail(`${key} must be from ${min} to ${max} seconds`);
    change[key] = Number((Math.round(v / step) * step).toFixed(1));
  }
  if (Object.keys(change).length === 0) fail('send {"on": true|false}, {"incognito": true|false}, {"planEvery": seconds} or {"actEvery": seconds}');
  return change;
}
/** One move the action model weighed: the game's own forecast, the model's scores, and what became of it. */
export type MoveOption = {
  move: string;
  description: string;
  /** Health the sim forecast says this move costs over the next second, or "dead". */
  forecast?: string;
  /** The model's 0-4 hurt score and 0-1 usefulness; absent for a move ruled out before asking. */
  hurt?: number;
  useful?: number;
  outcome: "chosen" | "safe" | "risky" | "ruled out";
};
/** `index` is the option's position in the open choice, so the page can find its card. */
export type CardOption = { card: string; notes: string; probability?: number; chosen: boolean; index?: number };
/**
 * What hovering a chat message shows: the question a model got and what it weighed. A plan carries
 * the cards it chose among and every goal it weighed, each with the model's odds.
 */
export type Inspect =
  | { kind: "prompt"; prompt: string; reasoning?: string; reply?: string }
  | { kind: "plan"; prompt: string; choices?: CardOption[]; goals: CardOption[] }
  | { kind: "moves"; situation: string; questions?: string[]; moves: MoveOption[]; dash?: number }
  | { kind: "cards"; situation: string; question: string; cards: CardOption[] };
/**
 * What the bot says; the server stamps it into a ChatMessage. A line with a `key` replaces the
 * earlier message with that key, which is how a planner message streams: `stream` holds its
 * reasoning so far until the final text replaces it.
 */
/**
 * What a non-step action is, which picks its tile's icon in the panel (userscript/pilot/icons.ts). A new tag
 * needs an icon there before it type-checks.
 */
const ACTION_TAGS = [
  ...["Loot", "Wander", "Run", "Eat", "Hunt", "Spot"],
  ...["Pet", "Kennel", "Crate", "Shrine", "Curse", "Golden", "Farm", "Shop", "Microwave", "Nest", "Lair", "Bot", "Whetstone", "Bell", "Slots", "Vault", "Magnet", "Tunnel", "Light", "Freezer", "Fryer"],
  ...["Dash", "Start", "Take over", "Over", "Stopped", "Incognito"],
] as const;
export type ActionTag = (typeof ACTION_TAGS)[number];
/** How a goal ended; `dropped` means the planner chose another goal first. */
const GOAL_RESULTS = ["done", "failed", "dropped"] as const;
export type GoalResult = (typeof GOAL_RESULTS)[number];
export type ChatLine = { role: PilotRole; text: string; tag?: ActionTag; result?: GoalResult; detail?: string; model?: string; time?: number; key?: string; stream?: string; inspect?: Inspect };
export type ChatMessage = ChatLine & { id: number; at: number };

const KEEP_PLANS = 500;
const KEEP_OTHERS = 400;

/**
 * Drops the oldest messages beyond what the panel shows: every planner decision of a run (its
 * history is inspectable) but only the latest actions, which come several a second.
 */
export function trimChat(chat: ChatMessage[]) {
  let plans = 0;
  let others = 0;
  for (let i = chat.length - 1; i >= 0; i--) {
    const keep = chat[i]?.role === "planner" ? ++plans <= KEEP_PLANS : ++others <= KEEP_OTHERS;
    if (!keep) chat.splice(i, 1);
  }
}
/** One line of the server's held-open stream to the page. */
export type PageLine = { hello: true } | { error: string } | Envelope | { chat: ChatMessage } | { pilot: PilotState };

function optionalString(v: unknown, what: string): string | undefined {
  return v === undefined ? undefined : typeof v === "string" ? v : fail(`${what} must be a string`);
}

export function parseChatLine(input: unknown): ChatLine {
  const c = (input ?? {}) as Record<string, unknown>;
  if (!(PILOT_ROLES as readonly unknown[]).includes(c.role)) fail(`role must be one of ${PILOT_ROLES.join(", ")}`);
  if (typeof c.text !== "string" || c.text === "") fail("text must be a non-empty string");
  const detail = optionalString(c.detail, "detail");
  const model = optionalString(c.model, "model");
  const key = optionalString(c.key, "key");
  const stream = optionalString(c.stream, "stream");
  const tag = c.tag === undefined ? undefined : (ACTION_TAGS as readonly unknown[]).includes(c.tag) ? (c.tag as ActionTag) : fail(`tag must be one of ${ACTION_TAGS.join(", ")}`);
  const result = c.result === undefined ? undefined : (GOAL_RESULTS as readonly unknown[]).includes(c.result) ? (c.result as GoalResult) : fail(`result must be one of ${GOAL_RESULTS.join(", ")}`);
  const inspect = c.inspect as Inspect | undefined;
  if (inspect !== undefined && !["prompt", "plan", "moves", "cards"].includes((inspect as { kind?: unknown } | null)?.kind as string)) fail("inspect.kind must be prompt, plan, moves or cards");
  return {
    role: c.role as PilotRole,
    text: c.text,
    ...(detail === undefined ? {} : { detail }),
    ...(model === undefined ? {} : { model }),
    ...(c.time === undefined ? {} : { time: num(c.time, "time") }),
    ...(key === undefined ? {} : { key }),
    ...(stream === undefined ? {} : { stream }),
    ...(tag === undefined ? {} : { tag }),
    ...(result === undefined ? {} : { result }),
    ...(inspect === undefined ? {} : { inspect }),
  };
}
