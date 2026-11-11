import type { Chest, Spot, World } from "./world";
import { server } from "./server";
import { type Book, bookFrom, line } from "../game/book";


export const pct = (part: number, whole: number) => Math.round((100 * part) / Math.max(1, whole));

/** A record as "key value, key value", in the game's own keys. */
export const fields = (o: Record<string, unknown>) => Object.entries(o).map(([k, v]) => `${k} ${typeof v === "object" ? JSON.stringify(v) : v}`).join(", ");

export const onScreen = (r: World) => r.view.world.enemiesOnScreen;

export const dashCharges = (r: World) => r.view.tibo.dash.charges;

// The planner reads the game's own description of every card it holds or is offered.
export let book: Book | undefined;

export async function readBook(): Promise<Book | undefined> {
  if (book !== undefined) return book;
  try {
    book = bookFrom(await server.encyclopedia());
    return book;
  } catch (e) {
    // Asked again next time: the page sends the encyclopedia a moment after it connects.
    console.error("no encyclopedia yet:", e instanceof Error ? e.message : e);
    return undefined;
  }
}

/** The game's description of a weapon, passive, item or the like, as ": <text>", or "". */
export const said = (b: Book, kind: string, id: string) => {
  const d = line(b, kind, id, "desc");
  return d === undefined ? "" : `: ${d.replace(/\s+/g, " ").trim()}`;
};

/** The hazards and attack zones Tibo stands in now, by the game's kinds. */
export const groundSources = (r: World) => r.view.directions.still?.enters ?? [];

export const onChest = (c: Chest) => c.dir === "still";

/** A spot's description: the game's line for its kind, or for a variety place. */
export const spotSaid = (type: string) => (book === undefined ? "" : (line(book, "poi", type, "desc") ?? line(book, "varietyPlace", type, "desc") ?? ""));

// The name alone hides what a spot does: standing in a Beetle Nest wakes an elite.
export const poiWhat = (p: Spot) => {
  const d = spotSaid(p.type);
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
  return `inside the ${inside.name}${poiWhat(inside)}${inside.chargeSeconds > 0 ? `, charged ${inside.charged} of ${inside.chargeSeconds} seconds` : ""}${priceWords(inside, r)}`;
}

export const plural = (n: number, one: string) => `${n} ${n === 1 ? one : one.replace(/y$/, "ie")}${n === 1 ? "" : "s"}`;
