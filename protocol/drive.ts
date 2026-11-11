// Full Self Driving: what a person sets up in the panel for the bot that plays the tab.
import { type Machine, parseMachine } from "./machine";

/**
 * `machine` decides what the autopilot does: the bot feeds it the game state every step and carries
 * out the action of the state it is in. `loadout` is the picker's question at every level-up, chest
 * and shrine, where `{{name}}` embeds a piece of the game state (bot/templates.ts BLOCKS).
 */
export type Drive = { machine: Machine; loadout: string };

/** Checks a drive's shape and its machine; what the loadout may embed is the bot's to check (bot/drive.ts). */
export function parseDrive(input: unknown, spotKinds?: ReadonlySet<string>): Drive {
  const d = (input ?? {}) as Record<string, unknown>;
  if (typeof d.loadout !== "string") throw new Error("drive.loadout must be a string");
  return { machine: parseMachine(d.machine, spotKinds), loadout: d.loadout };
}
