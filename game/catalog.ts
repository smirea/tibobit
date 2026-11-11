import type { Content, GameState, Messages } from "./types";

export type Kind = "weapon" | "passive" | "item";
export type Key = `${Kind}:${string}`;

export type Recipe =
  | { kind: "evolution"; weapon: string; catalyst: Key; result: string }
  | { kind: "union"; weapons: [string, string]; result: string }
  | { kind: "itemEvolution"; item: string; catalyst: string; result: string };

export type Catalog = {
  names: Record<Key, string>;
  descriptions: Record<Key, string>;
  maxLevel: Record<Key, number>;
  recipes: Recipe[];
};

function titleCase(id: string): string {
  return id.replace(/(^|-)(\w)/g, (_, dash: string, c: string) => `${dash ? " " : ""}${c.toUpperCase()}`);
}

/** The game's own cap: a base weapon tops out at min(8, levels + 1), anything else at 1. */
export const maxWeaponLevel = (w: { tier: string; levels?: unknown[] }) => (w.tier === "base" ? Math.min(8, (w.levels?.length ?? 0) + 1) : 1);

export function buildCatalog(content: Content, messages: Messages): Catalog {
  const names: Record<Key, string> = {};
  const descriptions: Record<Key, string> = {};
  const maxLevel: Record<Key, number> = {};
  const name = (kind: Kind, id: string) => {
    names[`${kind}:${id}`] = messages[`content.${kind}.${id}.name`]?.[0] ?? titleCase(id);
    const description = messages[`content.${kind}.${id}.desc`]?.[0];
    if (description !== undefined) descriptions[`${kind}:${id}`] = description;
  };
  for (const w of content.allWeapons) {
    name("weapon", w.id);
    if (w.tier === "base") maxLevel[`weapon:${w.id}`] = maxWeaponLevel(w);
  }
  for (const p of content.passives) {
    name("passive", p.id);
    maxLevel[`passive:${p.id}`] = p.maxLevel;
  }
  for (const i of content.allItems) name("item", i.id);

  const passiveIds = new Set(content.passives.map((p) => p.id));
  const recipes: Recipe[] = [];
  for (const e of content.evolutions) {
    if (typeof e.from !== "string" || e.catalyst === undefined) continue;
    const catalyst: Key = passiveIds.has(e.catalyst) ? `passive:${e.catalyst}` : `item:${e.catalyst}`;
    recipes.push({ kind: "evolution", weapon: e.from, catalyst, result: e.id });
  }
  for (const u of content.unions) {
    if (!Array.isArray(u.from) || u.from.length !== 2) continue;
    recipes.push({ kind: "union", weapons: [u.from[0] ?? "", u.from[1] ?? ""], result: u.id });
  }
  for (const i of content.evolvedItems) {
    if (i.from === undefined || i.catalyst === undefined) continue;
    recipes.push({ kind: "itemEvolution", item: i.from, catalyst: i.catalyst, result: i.id });
  }
  return { names, descriptions, maxLevel, recipes };
}

// "max" mirrors the game: a base weapon must be maxed to evolve, and an item evolves
// only once its catalyst passive is maxed. Everything else just has to be held.
type Need = "own" | "max";
export type Part = { key: Key; need: Need };
export type Combo = { recipe: Recipe; result: Key; parts: [Part, Part] };

export function toCombo(r: Recipe): Combo {
  switch (r.kind) {
    case "evolution":
      return {
        recipe: r,
        result: `weapon:${r.result}`,
        parts: [
          { key: `weapon:${r.weapon}`, need: "max" },
          { key: r.catalyst, need: "own" },
        ],
      };
    case "union":
      return {
        recipe: r,
        result: `weapon:${r.result}`,
        parts: [
          { key: `weapon:${r.weapons[0]}`, need: "own" },
          { key: `weapon:${r.weapons[1]}`, need: "own" },
        ],
      };
    case "itemEvolution":
      return {
        recipe: r,
        result: `item:${r.result}`,
        parts: [
          { key: `item:${r.item}`, need: "own" },
          { key: `passive:${r.catalyst}`, need: "max" },
        ],
      };
  }
}

/** Level for weapons/passives, stack count for items. Absent means not held. */
export type Loadout = Map<Key, number>;

export function readLoadout(state: GameState): Loadout {
  const loadout: Loadout = new Map();
  for (const w of state.loadout.weapons) loadout.set(`weapon:${w.def.id}`, w.level);
  for (const p of state.loadout.passives) loadout.set(`passive:${p.def.id}`, p.level);
  for (const [id, count] of state.loadout.items) if (count > 0) loadout.set(`item:${id}`, count);
  return loadout;
}

type PartState = "done" | "leveling" | "missing";

export function partState(part: Part, loadout: Loadout, catalog: Catalog): PartState {
  const have = loadout.get(part.key);
  if (have === undefined) return "missing";
  if (part.need === "own") return "done";
  return have >= (catalog.maxLevel[part.key] ?? 1) ? "done" : "leveling";
}

export function comboProgress(combo: Combo, loadout: Loadout, catalog: Catalog): PartState[] {
  return combo.parts.map((p) => partState(p, loadout, catalog));
}

export function combosUsing(combos: Combo[], key: Key): Combo[] {
  return combos.filter((c) => c.parts.some((p) => p.key === key));
}

export function partner(combo: Combo, key: Key): Part {
  const [a, b] = combo.parts;
  return a.key === key ? b : a;
}

/** A combo whose result is already held is finished, so it drops out of every list. */
export function relevantCombos(combos: Combo[], loadout: Loadout): Combo[] {
  return combos.filter((c) => !loadout.has(c.result) && c.parts.some((p) => loadout.has(p.key)));
}

type Pairing = { partner: Part; combo: Combo };
type Unpaired = { held: Key; options: Pairing[] };

/**
 * Every held weapon, passive or item that has recipes left but none of whose partners is held,
 * with the partners it could take. Something already paired with a held partner is left out.
 */
export function unpaired(combos: Combo[], loadout: Loadout): Unpaired[] {
  const out: Unpaired[] = [];
  for (const held of loadout.keys()) {
    const options = combosUsing(combos, held)
      .filter((c) => !loadout.has(c.result))
      .map((combo) => ({ partner: partner(combo, held), combo }));
    if (options.length === 0 || options.some((o) => loadout.has(o.partner.key))) continue;
    out.push({ held, options });
  }
  return out;
}

export function idOf(key: Key): string {
  return key.slice(key.indexOf(":") + 1);
}

export function nameOf(catalog: Catalog, key: Key): string {
  return catalog.names[key] ?? titleCase(idOf(key));
}
