import { type ActionTag, SPOT_TAGS } from "../../protocol/pilot";
import type { GameLink } from "../link/game-link";

/** The popup's sections of what Tibo can go after, in the order it lists them. */
export const SECTIONS = ["Chests", "Pickups", "Shrines", "Buffs", "Upgrades", "Loot", "Travel", "Other"] as const;
type Section = (typeof SECTIONS)[number];

// The game has no grouping of its points of interest: every one is a `poi` kind or a variety place.
// These sections are the popup's own, by what the game's description says each does. A kind the
// game adds later lists under Other until it is placed here.
const POI_SECTIONS: Record<string, Section> = {
  paidChest: "Chests",
  chargeShrine: "Shrines",
  curseShrine: "Shrines",
  goldenShrine: "Shrines",
  botDock: "Buffs",
  chiliBottle: "Buffs",
  dinnerBell: "Buffs",
  frenzyFryer: "Buffs",
  mashBomb: "Buffs",
  spudFreezer: "Buffs",
  taterMagnet: "Buffs",
  dog: "Upgrades",
  dogKennel: "Upgrades",
  microwave: "Upgrades",
  seedVault: "Upgrades",
  taterSlots: "Upgrades",
  vendor: "Upgrades",
  whetstone: "Upgrades",
  bossLair: "Loot",
  crops: "Loot",
  digSpot: "Loot",
  eliteNest: "Loot",
  lighthouse: "Loot",
  taterLantern: "Loot",
  treasureMap: "Loot",
  rootTunnel: "Travel",
  rowboat: "Travel",
};

/**
 * Something Tibo can go after. `key` is the game's own name for it, which the function matches on:
 * a pickup's kind, a point of interest's kind, or a variety place's id. `name` is the game's
 * English for it, and the key itself where the game has none, as for pickups.
 */
export type Entity = { section: Section; key: string; name: string; about: string; tag: ActionTag };

// The game has no English for its pickups, so these go by its kinds. It calls a chest a goldChest when a boss or Poteto left it.
const PICKUPS: Entity[] = [
  { section: "Chests", key: "chest", name: "chest", tag: "Loot", about: "A chest an elite, a loot runner or a place left on the ground. Standing on it for 1 second opens it." },
  { section: "Chests", key: "goldChest", name: "goldChest", tag: "Loot", about: "A chest a boss or Poteto left. It opens like a chest, after 1.5 seconds." },
  { section: "Pickups", key: "heal", name: "heal", tag: "Eat", about: "Food on the ground, which gives health back." },
  { section: "Chests", key: "item", name: "item", tag: "Loot", about: "An item on the ground. Standing on it opens a choice of an item, as a chest does." },
  { section: "Pickups", key: "magnet", name: "magnet", tag: "Magnet", about: "A magnet on the ground, which pulls in all the xp lying there." },
  { section: "Pickups", key: "reroll", name: "reroll", tag: "Loot", about: "One more reroll for a later choice. Elites and lanterns drop it." },
  { section: "Pickups", key: "skip", name: "skip", tag: "Loot", about: "One more skip for a later choice." },
  { section: "Pickups", key: "banish", name: "banish", tag: "Loot", about: "One more banish for a later choice. Elites and lanterns drop it." },
  { section: "Pickups", key: "beacon", name: "beacon", tag: "Bot", about: "A Bot Beacon, which calls a swarm of bots around Tibo for a while." },
];

/**
 * Every kind of thing the autopilot can be sent to, by section and then by name: the pickups, and
 * each point of interest and variety place the game has. Their English arrives with the first run,
 * so before then only the pickups are listed.
 */
export function worldEntities(link: GameLink): Entity[] {
  const found = [...PICKUPS];
  const place = (key: string, name: string, about: string | undefined) => found.push({ section: POI_SECTIONS[key] ?? "Other", key, name, about: about ?? "", tag: SPOT_TAGS[key] ?? "Spot" });
  for (const { kind } of link.table?.pois ?? []) {
    const name = link.message(`content.poi.${kind}.name`);
    if (kind !== "varietyPlace" && name !== undefined) place(kind, name, link.message(`content.poi.${kind}.desc`));
  }
  for (const key of Object.keys(link.messages)) {
    const id = /^content\.varietyPlace\.([^.]+)\.name$/.exec(key)?.[1];
    const name = id === undefined ? undefined : link.message(key);
    // The game's English spells a variety place's id with dashes; the game's own id has none.
    if (name !== undefined && id !== undefined) place(id.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase()), name, link.message(`content.varietyPlace.${id}.desc`));
  }
  return found.sort((a, z) => SECTIONS.indexOf(a.section) - SECTIONS.indexOf(z.section) || a.name.localeCompare(z.name));
}
