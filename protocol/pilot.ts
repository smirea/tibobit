// The bot at the wheel: its settings, and the lines it shows in the panel.
import type { Envelope } from "./commands";
import { fail, num } from "./parse";
import type { Direction } from "./geometry";
import { type Drive, parseDrive } from "./drive";
import type { MachineInput } from "./machine";

/**
 * Full Self Driving: the agent server runs the bot (bot/main.ts) for the tab with the state machine
 * built in the panel, and the bot talks in the panel. A planner message is the machine changing
 * state, or the picker taking a card; action messages report goals starting and ending, and steps
 * when a bot started by hand asks its action model.
 */
const PILOT_ROLES = ["planner", "action", "system"] as const;
export type PilotRole = (typeof PILOT_ROLES)[number];
export type PilotState = { state: "off" | "on" | "stopping"; detail?: string };
/** `drive` replaces the machine and loadout the bot plays by; `on` starts or stops it, and starting needs a drive. */
export type PilotChange = { on?: boolean; drive?: Drive };

/**
 * The game as the bot last read it, for the panel: the machine's input and the state the machine is
 * in, and every state block the picker can embed (bot/templates.ts BLOCKS).
 */
export type StatePreview = { time: number; state: string; input: MachineInput; blocks: Record<string, string> };

/** Validates a change to the pilot from the panel or a script; throws with a message a caller can act on. */
export function parsePilotChange(input: unknown, spotKinds?: ReadonlySet<string>): PilotChange {
  const c = (input ?? {}) as Record<string, unknown>;
  const change: PilotChange = {};
  if (c.on !== undefined) change.on = typeof c.on === "boolean" ? c.on : fail("on must be true or false");
  if (c.drive !== undefined) change.drive = parseDrive(c.drive, spotKinds);
  if (Object.keys(change).length === 0) fail('send {"on": true|false} and/or {"drive": {...}} (protocol/drive.ts)');
  return change;
}

export function parseStatePreview(input: unknown): StatePreview {
  const p = (input ?? {}) as Record<string, unknown>;
  const blocks = p.blocks as Record<string, unknown> | undefined;
  if (typeof blocks !== "object" || blocks === null || Object.values(blocks).some((v) => typeof v !== "string")) fail("blocks must map each block name to its text");
  if (typeof p.state !== "string") fail("state must name the machine's state");
  if (typeof p.input !== "object" || p.input === null) fail("input must be the machine's input");
  return { time: num(p.time, "time"), state: p.state, input: p.input as MachineInput, blocks: blocks as Record<string, string> };
}
/** How long the bot shows its pick on a choice before taking the card, for someone watching. */
export const PICK_SHOW_MS = 2000;

/** One move the action model weighed: the game's own forecast, the model's scores, and what became of it. */
export type MoveOption = {
  move: Direction | "still";
  description: string;
  /** What the sim forecast says this move costs over its horizon: the health lost, and whether Tibo dies. */
  forecast?: { damage: number; dead: boolean };
  /** How badly the model says the move would hurt and how useful it is for the goal, each from 0 to 1; absent for a move ruled out before asking. */
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
  /** A goal the state machine set: the state it is in, what that state does, and the transition that led there. */
  | { kind: "state"; state: string; about: string; because?: string }
  | { kind: "plan"; prompt: string; choices?: CardOption[]; goals: CardOption[] }
  | { kind: "moves"; situation: string; questions?: string[]; moves: MoveOption[]; dash?: { odds: number; above: number } }
  | { kind: "cards"; situation: string; question: string; cards: CardOption[] };
/**
 * What a non-step action is, which picks its tile's icon in the panel (userscript/pilot/icons.ts). A new tag
 * needs an icon there before it type-checks.
 */
const ACTION_TAGS = [
  ...["Loot", "Wander", "Run", "Eat", "Hunt", "Spot"],
  ...["Pet", "Kennel", "Crate", "Shrine", "Curse", "Golden", "Farm", "Shop", "Microwave", "Nest", "Lair", "Bot", "Whetstone", "Bell", "Slots", "Vault", "Magnet", "Tunnel", "Light", "Freezer", "Fryer"],
  ...["Dash", "Hold", "Start", "Take over", "Over", "Stopped"],
] as const;
export type ActionTag = (typeof ACTION_TAGS)[number];
// By the game's own point-of-interest kind; one the game adds later shows as a plain Spot.
export const SPOT_TAGS: Record<string, ActionTag> = {
  dog: "Pet",
  dogKennel: "Kennel",
  paidChest: "Crate",
  chargeShrine: "Shrine",
  curseShrine: "Curse",
  goldenShrine: "Golden",
  crops: "Farm",
  vendor: "Shop",
  microwave: "Microwave",
  eliteNest: "Nest",
  bossLair: "Lair",
  botDock: "Bot",
  whetstone: "Whetstone",
  dinnerBell: "Bell",
  taterSlots: "Slots",
  seedVault: "Vault",
  taterMagnet: "Magnet",
  rootTunnel: "Tunnel",
  taterLantern: "Light",
  spudFreezer: "Freezer",
  frenzyFryer: "Fryer",
};

/** How a goal ended; `dropped` means another goal took over first. */
const GOAL_RESULTS = ["done", "failed", "dropped"] as const;
export type GoalResult = (typeof GOAL_RESULTS)[number];
/**
 * What the bot says; the server stamps it into a ChatMessage. A line with a `key` replaces the
 * earlier message with that key, which is how a planner message streams: `stream` holds its
 * reasoning so far until the final text replaces it.
 */
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
export type PageLine = { hello: true } | { error: string } | Envelope | { chat: ChatMessage } | { pilot: PilotState } | { preview: StatePreview };

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
  if (inspect !== undefined && !["prompt", "state", "plan", "moves", "cards"].includes((inspect as { kind?: unknown } | null)?.kind as string)) fail("inspect.kind must be prompt, state, plan, moves or cards");
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
