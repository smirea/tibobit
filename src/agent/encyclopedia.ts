import { buildCatalog, nameOf, toCombo } from "../catalog";
import type { GameLink } from "../game";
import type { Encyclopedia } from "./protocol";

function plain(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value, (_k, v: unknown) => (v instanceof Map ? Object.fromEntries(v) : v instanceof Set ? [...v] : v)));
}

/** Every definition in the game, with English names and descriptions, from the game's global table. */
export function encyclopedia(link: GameLink): Encyclopedia | undefined {
  const table = link.table;
  if (table === undefined || !link.ready) return undefined;
  const catalog = buildCatalog(table, link.messages);
  const text = (kind: string, id: string) => ({
    name: link.message(`content.${kind}.${id}.name`) ?? id,
    ...(link.message(`content.${kind}.${id}.desc`) === undefined ? {} : { description: link.message(`content.${kind}.${id}.desc`) }),
  });
  const withText = <T extends { id: string }>(kind: string, defs: T[]) => defs.map((d) => ({ ...text(kind, d.id), ...(plain(d) as object) }));
  const maxLevel = (key: `${"weapon" | "passive"}:${string}`) => catalog.maxLevel[key];

  return {
    capturedAt: Date.now(),
    weapons: table.allWeapons.map((w) => ({ ...text("weapon", w.id), maxLevel: maxLevel(`weapon:${w.id}`) ?? 1, ...(plain(w) as object) })),
    passives: withText("passive", table.passives),
    items: withText("item", table.allItems),
    recipes: catalog.recipes.map(toCombo).map((c) => ({
      kind: c.recipe.kind,
      result: c.result,
      name: nameOf(catalog, c.result),
      parts: c.parts.map((p) => ({ ...p, name: nameOf(catalog, p.key) })),
    })),
    enemies: withText("enemy", table.enemies),
    bosses: table.bossIds.map((id) => ({ id, ...text("boss", id), title: link.message(`content.boss.${id}.title`) })),
    pois: Object.keys(link.messages)
      .map((k) => k.match(/^content\.poi\.([^.]+)\.name$/)?.[1])
      .filter((kind) => kind !== undefined)
      .map((kind) => ({ kind, ...text("poi", kind) })),
    biomes: withText("biome", table.biomes),
  };
}
