// The game's content as agents use it, built from the encyclopedia: English names and descriptions
// by kind and id, recipes from the game's own weapon and item definitions, and dog definitions.
import { buildCatalog, type Catalog, type Combo, comboProgress, combosUsing, idOf, type Key, type Loadout, nameOf, partner, toCombo } from "./catalog";
import type { Content, Messages } from "./types";
import type { Encyclopedia } from "../protocol/snapshot";

/** The game's content as the bot uses it: English names and descriptions, recipes, and the definitions by id. */
export type Book = {
  catalog: Catalog;
  combos: Combo[];
  text: Map<string, Record<string, string>>;
  dogs: Map<string, Record<string, unknown>>;
};

export function readBook(e: Encyclopedia): Book {
  type Def = { id: string; tier?: string } & Record<string, unknown>;
  const weapons = e.weapons as Def[];
  const items = e.items as Def[];
  const content = {
    allWeapons: weapons,
    baseWeapons: weapons.filter((w) => w.tier === "base"),
    evolutions: weapons.filter((w) => w.tier === "evolved"),
    unions: weapons.filter((w) => w.tier === "union"),
    passives: e.passives,
    allItems: items,
    items: items.filter((i) => i.tier === "base"),
    evolvedItems: items.filter((i) => i.tier === "evolved"),
    enemies: e.enemies,
    bossIds: (e.bosses as Def[]).map((b) => b.id),
  } as unknown as Content;
  const messages: Messages = {};
  const text = new Map<string, Record<string, string>>();
  const sections: [string, unknown[], string][] = [
    ["weapon", e.weapons, "id"],
    ["passive", e.passives, "id"],
    ["item", e.items, "id"],
    ["enemy", e.enemies, "id"],
    ["boss", e.bosses, "id"],
    ["dog", e.dogs, "id"],
    ["poi", e.pois, "kind"],
    ["event", e.events, "id"],
    ["botHelp", e.botHelps, "id"],
    ["biome", e.biomes, "id"],
  ];
  for (const [kind, defs, key] of sections)
    for (const d of defs as Record<string, unknown>[]) {
      const id = d[key];
      if (typeof id !== "string") continue;
      const lines = Object.fromEntries(Object.entries(d).filter((x): x is [string, string] => typeof x[1] === "string" && x[0] !== key));
      text.set(`${kind}:${id}`, lines);
      for (const [field, line] of Object.entries(lines)) messages[`content.${kind}.${id}.${field}`] = [line];
    }
  for (const [k, line] of Object.entries(e.messages)) {
    const m = k.match(/^content\.([^.]+)\.([^.]+)\.([^.]+)$/);
    if (m === null) continue;
    const key = `${m[1]}:${m[2]}`;
    text.set(key, { ...(text.get(key) ?? {}), [m[3] ?? ""]: line });
  }
  const catalog = buildCatalog(content, messages);
  return { catalog, combos: catalog.recipes.map(toCombo), text, dogs: new Map((e.dogs as Def[]).map((d) => [d.id, d])) };
}

/** The game's English line for a content entry, such as its name or desc, or undefined when the game has none. */
export const line = (b: Book, kind: string, id: string, field = "name") => b.text.get(`${kind}:${id}`)?.[field];

/** Recipes that use `key` and are not made yet, with whether its partner is held or banished and whether holding `key` at `level` completes it. */
export function pairings(b: Book, now: Loadout, banished: string[], key: Key, level: number) {
  const after: Loadout = new Map(now);
  after.set(key, key.startsWith("item:") ? (now.get(key) ?? 0) + 1 : level);
  return combosUsing(b.combos, key)
    .filter((c) => !now.has(c.result))
    .map((c) => {
      const other = partner(c, key).key;
      return { combo: c, name: nameOf(b.catalog, c.result), partner: nameOf(b.catalog, other), partnerHeld: now.has(other), partnerBanished: banished.includes(idOf(other)), ready: comboProgress(c, after, b.catalog).every((s) => s === "done") };
    });
}
