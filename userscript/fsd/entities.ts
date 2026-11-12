import { type ActionTag, SPOT_TAGS } from "../../protocol/pilot";
import type { GameLink } from "../link/game-link";

/** The game's own sorts of thing Tibo can go after, in the order the popup lists them. */
export const ENTITY_TYPES = { pickup: "Pickups", spot: "Spots", varietyPlace: "Variety places" } as const;
export type EntityType = keyof typeof ENTITY_TYPES;

/** Something Tibo can go after, by the name the game shows for it, and its action tile's icon. */
export type Entity = { type: EntityType; name: string; about: string; tag: ActionTag; /** A spot's kind as a state machine names it (protocol/machine.ts). */ kind?: string };

/**
 * Every kind of thing the autopilot can be sent to, each type sorted by name: the pickups (a chest,
 * food, a magnet), and each kind of spot and variety place the game has, in the game's own English.
 * The English arrives with the first run, so before then only the pickups are known.
 */
export function worldEntities(link: GameLink): Entity[] {
  const found: Entity[] = [
    { type: "pickup", name: "chest", about: "A chest on the ground, from an elite or the map. Standing on it opens it for a free pick.", tag: "Loot" },
    { type: "pickup", name: "food", about: "Food on the ground (the game's heal pickup), which gives Tibo back health.", tag: "Eat" },
    { type: "pickup", name: "magnet", about: "The game's magnet pickup on the ground.", tag: "Magnet" },
  ];
  for (const { kind } of link.table?.pois ?? []) {
    const name = link.message(`content.poi.${kind}.name`);
    if (kind !== "varietyPlace" && name !== undefined) found.push({ type: "spot", name, about: link.message(`content.poi.${kind}.desc`) ?? "", tag: SPOT_TAGS[kind] ?? "Spot", kind });
  }
  for (const key of Object.keys(link.messages)) {
    const place = /^content\.varietyPlace\.([^.]+)\.name$/.exec(key)?.[1];
    const name = place === undefined ? undefined : link.message(key);
    // The game's English spells a variety place's id with dashes; a machine uses the game's own spelling.
    if (name !== undefined && place !== undefined) found.push({ type: "varietyPlace", name, about: link.message(`content.varietyPlace.${place}.desc`) ?? "", tag: "Spot", kind: place.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase()) });
  }
  const types = Object.keys(ENTITY_TYPES);
  return found.sort((a, z) => types.indexOf(a.type) - types.indexOf(z.type) || a.name.localeCompare(z.name));
}
