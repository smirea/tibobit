export type Kind = "weapon" | "passive" | "item";
export type Key = `${Kind}:${string}`;

export type Recipe =
  | { kind: "evolution"; weapon: string; catalyst: string; result: string }
  | { kind: "union"; weapons: [string, string]; result: string }
  | { kind: "itemEvolution"; item: string; catalyst: string; result: string };

export type Catalog = {
  build: string;
  extractedAt: string;
  names: Record<string, string>;
  maxLevel: Record<string, number>;
  recipes: Recipe[];
};

// "max" mirrors the game: a base weapon must be maxed to evolve, and an item evolves
// only once its catalyst passive is maxed. Everything else just has to be held.
export type Need = "own" | "max";
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
          { key: `passive:${r.catalyst}`, need: "own" },
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

export type PartState = "done" | "leveling" | "missing";

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

export function nameOf(catalog: Catalog, key: Key): string {
  return catalog.names[key] ?? key.slice(key.indexOf(":") + 1);
}
