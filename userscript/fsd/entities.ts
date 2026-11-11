import { type ActionTag, SPOT_TAGS } from "../../protocol/pilot";
import type { GameLink } from "../link/game-link";

/** Something Tibo can go after, by the name the planner's goal options give it, and its action tile's icon. */
export type Entity = { name: string; about: string; tag: ActionTag; /** A spot's kind as a state machine names it (protocol/machine.ts). */ kind?: string };

/**
 * Every kind of thing the autopilot can be sent to: a dropped chest, food, a magnet, and each spot kind the
 * game has, named in the game's own English as the live view names them. The English arrives with
 * the first run, so before then only the chest, food and magnet are known.
 */
export function worldEntities(link: GameLink): Entity[] {
  const spots: Entity[] = [];
  for (const { kind } of link.table?.pois ?? []) {
    const name = link.message(`content.poi.${kind}.name`);
    if (kind !== "varietyPlace" && name !== undefined) spots.push({ name, about: link.message(`content.poi.${kind}.desc`) ?? "", tag: SPOT_TAGS[kind] ?? "Spot", kind });
  }
  for (const key of Object.keys(link.messages)) {
    const place = /^content\.varietyPlace\.([^.]+)\.name$/.exec(key)?.[1];
    const name = place === undefined ? undefined : link.message(key);
    // The game's English spells a variety place's id with dashes; a machine uses the game's own spelling.
    if (name !== undefined && place !== undefined) spots.push({ name, about: link.message(`content.varietyPlace.${place}.desc`) ?? "", tag: "Spot", kind: place.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase()) });
  }
  return [
    { name: "chest", about: "A chest on the ground, from an elite or the map. Standing on it opens it for a free pick.", tag: "Loot" },
    { name: "food", about: "Food on the ground (the game's heal pickup), which gives Tibo back health.", tag: "Eat" },
    { name: "magnet", about: "The game's magnet pickup on the ground.", tag: "Magnet" },
    ...spots.sort((a, b) => a.name.localeCompare(b.name)),
  ];
}
