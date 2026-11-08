import type { ActionTag, GoalResult } from "./agent/protocol";

/** One stroke of a 24x24 icon: a path drawn in the tile's colour, or filled with it. */
type Stroke = string | { fill: string };
type Icon = Stroke[];

const ring = (x: number, y: number, r: number) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const dot = (x: number, y: number, r: number) => ({ fill: ring(x, y, r) });

export const ACTION_ICONS: Record<ActionTag, Icon> = {
  Loot: ["M3 11h18v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z", "M3 11V9a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2", "M10 11v3h4v-3"],
  Wander: [ring(12, 12, 9), { fill: "M15.5 8.5l-2 5-5 2 2-5z" }],
  Run: [dot(15, 4.5, 2.2), "M13 8.5 11 14", "M13 8.5 9 9.5 7 12.5", "M13 8.5l3 3h3", "M11 14l3 2.5V21", "M11 14l-2 3.5H5"],
  Gems: ["M7 4h10l4 5-9 11L3 9z", "M3 9h18", "M10 4 8 9l4 11 4-11-2-5"],
  Eat: ["M12 8c-1.5-1.2-3-1.5-4.5-1.2C5 7.3 3.5 9.6 4 13c.6 4 3.2 7.5 5.5 7.5 1 0 1.6-.5 2.5-.5s1.5.5 2.5.5c2.3 0 4.9-3.5 5.5-7.5.5-3.4-1-5.7-3.5-6.2-1.5-.3-3 0-4.5 1.2z", "M12 8c0-2 .5-3.5 2-5"],
  Hunt: [ring(12, 12, 7), "M12 2v5M12 17v5M2 12h5M17 12h5", dot(12, 12, 1.4)],
  Spot: ["M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z", ring(12, 9, 2.5)],
  Shop: ["M2 3h3l2.5 12h11L21 7H6.2", dot(9, 19.5, 1.7), dot(17, 19.5, 1.7)],
  Shrine: ["M2 5c4 1.2 16 1.2 20 0", "M4 9.5h16", "M7 6v15M17 6v15", "M12 6.5v3"],
  Magnet: ["M5 3h5v9a2 2 0 0 0 4 0V3h5v9a7 7 0 0 1-14 0z", "M5 7.5h5M14 7.5h5"],
  Pet: [
    { fill: "M7.5 17.5c0-3 2-5.5 4.5-5.5s4.5 2.5 4.5 5.5c0 2-1.5 3-3 3-.6 0-1-.3-1.5-.3s-.9.3-1.5.3c-1.5 0-3-1-3-3z" },
    dot(5, 10.5, 2),
    dot(9, 5.5, 2),
    dot(15, 5.5, 2),
    dot(19, 10.5, 2),
  ],
  Fight: ["M14.5 17.5 3 6V3h3l11.5 11.5", "M13 19l6-6M16 16l4 4M19 21l2-2", "M14.5 6.5 18 3h3v3l-3.5 3.5", "M5 14l4 4M7 17l-3 3M3 19l2 2"],
  Light: ["M9 5a3 3 0 0 1 6 0", "M7.5 7h9", "M9 7l-1.5 3v7L9 20h6l1.5-3v-7L15 7", "M9 20v1h6v-1", { fill: "M12 10.5c1.6 1.6 2.2 2.8 2.2 3.9a2.2 2.2 0 0 1-4.4 0c0-1.1.6-2.3 2.2-3.9z" }],
  Farm: ["M12 21v-9", "M12 12c0-4-3-6-7-6 0 4 3 6 7 6z", "M12 10c0-3 2.5-5.5 7-5.5 0 4-3 5.5-7 5.5z", "M7 21h10"],
  Dash: [{ fill: "M13 2 4 14h7l-1 8 9-12h-7z" }],
  Start: [{ fill: "M7 4v16l13-8z" }],
  "Take over": [ring(12, 12, 9), ring(12, 12, 2.5), "M3.5 10.5l6 1M20.5 10.5l-6 1M12 14.5V21"],
  Over: ["M12 3a8 8 0 0 0-8 8c0 2.8 1.3 4.5 3 5.5V20a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3.5c1.7-1 3-2.7 3-5.5a8 8 0 0 0-8-8z", dot(9, 11.5, 1.9), dot(15, 11.5, 1.9), "M10 21v-2.5M14 21v-2.5"],
  Stopped: [{ fill: "M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" }],
  Incognito: ["M3 11h18", "M6 11l1.5-6.5h9L18 11", ring(7.5, 16.5, 3), ring(16.5, 16.5, 3), "M10.5 16.5h3"],
};

/** A line the bot said without a tag, such as an error. */
export const NOTE_ICON: Icon = ["M4 5h16v11H9l-4 4v-4H4z", "M8 9h8M8 12h5"];
export const STILL_ICON: Icon = [ring(12, 12, 3.5)];
const ARROW_ICON: Icon = ["M4 12h15", "M13 6l6 6-6 6"];
const DIRECTION_TURNS: Record<string, number> = { right: 0, "down-right": 45, down: 90, "down-left": 135, left: 180, "up-left": 225, up: 270, "up-right": 315 };
export const RESULT_ICONS: Record<GoalResult, Icon> = { done: ["M5 12.5l4.5 4.5L19 7.5"], failed: ["M6 6l12 12M18 6 6 18"], dropped: ["M6 12h12"] };

const SVG = "http://www.w3.org/2000/svg";

export function svgIcon(icon: Icon, className: string, turn = 0): SVGSVGElement {
  const svg = document.createElementNS(SVG, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("class", className);
  svg.setAttribute("aria-hidden", "true");
  const g = document.createElementNS(SVG, "g");
  if (turn !== 0) g.setAttribute("transform", `rotate(${turn} 12 12)`);
  for (const stroke of icon) {
    const path = document.createElementNS(SVG, "path");
    if (typeof stroke === "string") path.setAttribute("d", stroke);
    else {
      path.setAttribute("d", stroke.fill);
      path.setAttribute("class", "tbh-svg-fill");
    }
    g.append(path);
  }
  svg.append(g);
  return svg;
}

/** A step's arrow, turned to its compass direction; a dot for standing still. */
export function moveIcon(move: string, className: string): SVGSVGElement {
  const turn = DIRECTION_TURNS[move];
  return turn === undefined ? svgIcon(STILL_ICON, className) : svgIcon(ARROW_ICON, className, turn);
}
