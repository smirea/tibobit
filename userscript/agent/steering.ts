/** A target that stays put as Tibo moves. */
import type { GameState } from "../game/types";
import { STILL } from "../../protocol/geometry";
import type { Target } from "../../protocol/commands";

export type Place = Exclude<Target, { dx: number }>;

export function anchored(s: GameState, to: Target): Place {
  return "dx" in to ? { x: (s.player.x[s.me] ?? 0) + to.dx, y: (s.player.y[s.me] ?? 0) + to.dy } : to;
}

/** The input that walks Tibo to a goal and stops on it. */
export function toward(s: GameState, goal: { x: number; y: number; within: number } | undefined): { x: number; y: number } {
  if (goal === undefined) return STILL;
  const dx = goal.x - (s.player.x[s.me] ?? 0);
  const dy = goal.y - (s.player.y[s.me] ?? 0);
  const dist = Math.hypot(dx, dy);
  return dist > goal.within ? { x: dx / dist, y: dy / dist } : STILL;
}
