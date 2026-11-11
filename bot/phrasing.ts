import type { Chest, Spot, World } from "./world";
import { type Book, line } from "../game/book";

export const pct = (part: number, whole: number) => Math.round((100 * part) / Math.max(1, whole));

/** A record as "key value, key value", in the game's own keys. */
export const fields = (o: Record<string, unknown>) => Object.entries(o).map(([k, v]) => `${k} ${typeof v === "object" ? JSON.stringify(v) : v}`).join(", ");

/** The game's description of a weapon, passive, item or the like, as ": <text>", or "". */
export const said = (b: Book, kind: string, id: string) => {
  const d = line(b, kind, id, "desc");
  return d === undefined ? "" : `: ${d.replace(/\s+/g, " ").trim()}`;
};

/** The hazards and attack zones Tibo stands in now, by the game's kinds. */
export const groundSources = (r: World) => r.view.directions.still?.enters ?? [];

export const onChest = (c: Chest) => c.dir === "still";

/** A spot's description: the game's line for its kind, or for a variety place. */
export const spotSaid = (book: Book, type: string) => line(book, "poi", type, "desc") ?? line(book, "varietyPlace", type, "desc") ?? "";

// The name alone hides what a spot does: standing in a Beetle Nest wakes an elite.
export const poiWhat = (book: Book, p: Spot) => {
  const d = spotSaid(book, p.type);
  return d === "" ? "" : ` (${d.replace(/\.$/, "").replace(/\. /g, "; ").toLowerCase()})`;
};

/** What a shop spot costs against the gold Tibo holds, from the game's prices, or "" for a spot that costs nothing. */
export const priceWords = (p: Spot, r: World) => {
  const { prices } = r.view.world;
  const gold = r.view.tibo.gold;
  if (p.type === "paidChest") return `; it costs ${prices.crate} gold now, and Tibo has ${gold}`;
  if (p.type === "vendor") return `; its items cost ${prices.vendor.join(", ")} gold by rarity, and Tibo has ${gold}`;
  if (p.type === "taterSlots") return `; a spin costs ${prices.slots} gold, and Tibo has ${gold}`;
  if (p.type === "dogKennel") return `; its levels cost ${prices.kennel.join(", ")} gold, and Tibo has ${gold}`;
  return "";
};

/** Where Tibo stands, as "on a chest, 1 of 3 seconds into opening it", or undefined when on nothing. */
export function spotLine(r: World): string | undefined {
  const chest = r.chests.find(onChest);
  if (chest !== undefined) return `on a chest, ${chest.charged} of ${chest.chargeSeconds} seconds into opening it`;
  const inside = r.spots.find((p) => p.inside);
  if (inside === undefined) return undefined;
  return `inside the ${inside.name}${poiWhat(r.book, inside)}${inside.chargeSeconds > 0 ? `, charged ${inside.charged} of ${inside.chargeSeconds} seconds` : ""}${priceWords(inside, r)}`;
}

export const plural = (n: number, one: string) => `${n} ${n === 1 ? one : one.replace(/y$/, "ie")}${n === 1 ? "" : "s"}`;
