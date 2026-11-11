// World units: +x is right, +y is down, and the player walks about 62 units a second at base speed.

export const TICKS_PER_SECOND = 60;

export const DIRECTIONS = ["right", "down-right", "down", "down-left", "left", "up-left", "up", "up-right"] as const;

export type Direction = (typeof DIRECTIONS)[number];

/** Compass bearing in degrees: 0 is right, 90 is down. */
export type Heading = Direction | number;

export const STILL = { x: 0, y: 0 };

/** The unit vector of a heading. */
export function unitOf(heading: Heading): { x: number; y: number } {
  const radians = ((typeof heading === "number" ? heading : DIRECTIONS.indexOf(heading) * 45) * Math.PI) / 180;
  return { x: Math.cos(radians), y: Math.sin(radians) };
}

/** The direction nearest to an offset. */
export function directionOf(dx: number, dy: number): Direction {
  const octant = Math.round(Math.atan2(dy, dx) / (Math.PI / 4));
  return DIRECTIONS[(octant + 8) % 8] ?? "right";
}
