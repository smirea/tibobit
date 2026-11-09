import { buildCatalog, nameOf, toCombo } from "../catalog";
import type { GameLink } from "../game";
import type { Encyclopedia } from "./protocol";

function plain(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value, (_k, v: unknown) => (v instanceof Map ? Object.fromEntries(v) : v instanceof Set ? [...v] : v)));
}

/** Every English line the game has for one content entry, by field: name, desc, breed, title, label, announce and so on. */
function textOf(link: GameLink, kind: string, id: string): Record<string, string> {
  const prefix = `content.${kind}.${id}.`;
  const out: Record<string, string> = {};
  for (const [key, lines] of Object.entries(link.messages)) if (key.startsWith(prefix) && lines.length > 0) out[key.slice(prefix.length)] = lines.join("\n");
  return out;
}

/**
 * Every definition in the game, from its global content table, each with all of its English lines,
 * plus the rules of the run the game holds now. Nothing here is written by us: an entry is the
 * game's own data, and text is the game's own text.
 */
export function encyclopedia(link: GameLink): Encyclopedia | undefined {
  const table = link.table;
  if (table === undefined || !link.ready) return undefined;
  const catalog = buildCatalog(table, link.messages);
  const withText = <T extends { id: string }>(kind: string, defs: T[]) => defs.map((d) => ({ ...textOf(link, kind, d.id), ...(plain(d) as object) }));
  const maxLevel = (key: `${"weapon" | "passive"}:${string}`) => catalog.maxLevel[key];
  const state = link.game?.state;
  const rules = state === undefined ? undefined : (plain(state.cfg) as Record<string, unknown>);
  const activation = state?.cfg.activation.seconds ?? {};

  // Kinds the game has English for but no definition table, such as shrine stat labels and rarities.
  const tabled = new Set(["weapon", "passive", "item", "enemy", "boss", "dog", "poi", "biome", "event", "botHelp"]);
  const glossary: Record<string, Record<string, Record<string, string>>> = {};
  for (const key of Object.keys(link.messages)) {
    const m = key.match(/^content\.([^.]+)\.([^.]+)\.[^.]+$/);
    if (m === null || tabled.has(m[1] ?? "")) continue;
    const [, kind = "", id = ""] = m;
    (glossary[kind] ??= {})[id] ??= textOf(link, kind, id);
  }

  return {
    capturedAt: Date.now(),
    weapons: table.allWeapons.map((w) => ({ ...textOf(link, "weapon", w.id), maxLevel: maxLevel(`weapon:${w.id}`) ?? 1, ...(plain(w) as object) })),
    passives: withText("passive", table.passives),
    items: withText("item", table.allItems),
    recipes: catalog.recipes.map(toCombo).map((c) => ({
      kind: c.recipe.kind,
      result: c.result,
      name: nameOf(catalog, c.result),
      parts: c.parts.map((p) => ({ ...p, name: nameOf(catalog, p.key) })),
    })),
    enemies: withText("enemy", table.enemies),
    bosses: table.bossIds.map((id) => ({ id, ...textOf(link, "boss", id) })),
    dogs: withText("dog", table.dogs),
    // A spot's charge time and its own rules section, where the game has one, sit with it.
    pois: table.pois.map((p) => ({
      ...textOf(link, "poi", p.kind),
      ...(plain(p) as object),
      ...(activation[p.kind] === undefined ? {} : { chargeSeconds: activation[p.kind] }),
      ...(rules?.[p.kind] === undefined ? {} : { rules: rules[p.kind] }),
    })),
    events: withText("event", table.events),
    botHelps: withText("botHelp", table.botHelps),
    biomes: withText("biome", table.biomes),
    glossary,
    ...(state === undefined || rules === undefined ? {} : { rules, rulesFor: state.difficulty === "nightmare" ? `nightmare-${state.cfg.ladder.level}` : state.difficulty }),
  };
}
