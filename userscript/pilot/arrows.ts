// One arrow per direction, in the order of DIRECTIONS; standing still is a dot.
import { type Direction, DIRECTIONS } from "../../protocol/geometry";

const ARROW_GLYPHS = ["→", "↘", "↓", "↙", "←", "↖", "↑", "↗"];

export const ARROWS: Record<Direction | "still", string> = { ...(Object.fromEntries(DIRECTIONS.map((d, i) => [d, ARROW_GLYPHS[i]])) as Record<Direction, string>), still: "•" };

// A move or goal title names a direction in words ("Explore up-right"); the panel shows the arrow. Longer names first, so "up-right" is not read as "up".
const DIRECTION_WORDS = new RegExp(`(?<![\\w-])(${[...DIRECTIONS].sort((a, z) => z.length - a.length).join("|")})(?![\\w-])`, "g");

export const arrowed = (text: string) => text.replace(DIRECTION_WORDS, (d) => ARROWS[d as Direction] ?? d);
