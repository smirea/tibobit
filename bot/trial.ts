import type { Totals } from "./tallies";

/** What the bot writes with --trial. */
export type TrialResult = {
  survived: number;
  died: boolean;
  start: number;
  end: number;
  hp: { start: number; end: number; max: number };
  level: { start: number; end: number };
  kills: number;
  damageTaken: Record<string, number>;
  /** Everything the game counted during the game: damage dealt and kills by weapon, gold, bosses, elites, chests and more. */
  totals: Totals;
  weapons: string[];
  passives: string[];
  steps: number;
  plannerCalls: number;
  actionCalls: number;
  avgDecisionMs: number;
  snapshotAgeMs: { p50: number; p90: number };
  log?: string;
};
