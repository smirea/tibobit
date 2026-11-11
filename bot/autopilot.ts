import { type Direction, DIRECTIONS } from "../protocol/geometry";

/** Of the moves the forecast allows, the one nearest the way to the goal, and of two as near, the cheaper. Standing counts as a quarter turn and a bit off the way. */
export function nearestToGoal(moves: string[], heading: Direction | "stay" | undefined, cost: (move: string) => number | undefined): string {
  const off = (move: string) => {
    if (heading === undefined) return 0;
    if (move === "stay") return heading === "stay" ? 0 : 2.5;
    if (heading === "stay") return 3;
    const turn = Math.abs(DIRECTIONS.indexOf(move as Direction) - DIRECTIONS.indexOf(heading));
    return Math.min(turn, DIRECTIONS.length - turn);
  };
  return [...moves].sort((x, y) => off(x) - off(y) || (cost(x) ?? 0) - (cost(y) ?? 0))[0] ?? "stay";
}
