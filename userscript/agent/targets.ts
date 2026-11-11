import type { Enums, GameState } from "../../game/types";
import { STILL } from "../../protocol/geometry";
import type { Target } from "../../protocol/commands";

/** A target that stays put as Tibo moves. */
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

/** Where a target is in a game state, a copy included, and how close counts as there; undefined once it is gone. */
export function place(enums: Enums | undefined, s: GameState, to: Place, within?: number): { x: number; y: number; within: number } | undefined {
  if ("poi" in to) {
    const poi = s.world.activePois.find((p) => p.state.uid === to.poi);
    if (poi === undefined || poi.state.used || poi.state.goneAt >= 0) return undefined;
    return { x: poi.x, y: poi.y, within: within ?? poi.radius * 0.5 };
  }
  if ("pickup" in to) {
    if (!s.pickups.pool.has(to.pickup)) return undefined;
    // A pool id packs a generation counter above the 16-bit slot index.
    const slot = to.pickup & 0xffff;
    const kind = enums?.pickupKinds[s.pickups.kind[slot] ?? -1] ?? "";
    const radius = s.cfg.activation.pickupRadius[kind];
    return { x: s.pickups.x[slot] ?? 0, y: s.pickups.y[slot] ?? 0, within: within ?? (radius === undefined ? 6 : radius * 0.5) };
  }
  return { x: to.x, y: to.y, within: within ?? 6 };
}
