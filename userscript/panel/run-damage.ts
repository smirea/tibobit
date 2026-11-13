import { type Key, nameOf } from "../../game/catalog";
import type { GameState } from "../../game/types";
import type { View } from "./combos-list";
import { h } from "./dom";
import { icon } from "./sprites";

const compact = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });

/** Every weapon and item held, most damage first: a weapon by its own tally, an item by the run's tally under its id. */
export function heldDamage(state: GameState): { key: Key; damage: number }[] {
  const weapons = state.loadout.weapons.map((w) => ({ key: `weapon:${w.def.id}` as Key, damage: w.damageDealt }));
  const items = [...state.loadout.items]
    .filter(([, count]) => count > 0)
    .map(([id]) => ({ key: `item:${id}` as Key, damage: state.run.damageBySource.get(id) ?? 0 }));
  return [...weapons, ...items].sort((a, b) => b.damage - a.damage);
}

/** Lists what Tibo holds and the damage each has dealt this run above the Crossroads' cards, at every step of it. */
export function showRunDamage(v: View, state: GameState, version: number) {
  const panel = document.querySelector<HTMLElement>(".ui-crossroads");
  if (panel === null) return;
  const rows = heldDamage(state);
  let total = 0;
  for (const amount of state.run.damageBySource.values()) total += amount;
  const signature = `${rows.map((r) => `${r.key}=${Math.round(r.damage)}`).join(",")}|${Math.round(total)}|${version}`;
  const old = panel.querySelector<HTMLElement>(":scope > .tbh-xr-damage");
  if (old?.dataset.tbh === signature) return;
  const box = h(
    "div",
    "tbh-xr-damage",
    h("div", "tbh-xr-title", "Damage this run", h("span", "tbh-xr-total", compact.format(total))),
    h(
      "div",
      "tbh-xr-rows",
      ...rows.map((r) =>
        h(
          "div",
          "tbh-xr-row",
          icon(v, r.key),
          h("span", "tbh-xr-name", nameOf(v.d.catalog, r.key)),
          h("span", "tbh-xr-dmg", compact.format(r.damage)),
          h("span", "tbh-xr-share", total > 0 ? `${Math.round((r.damage / total) * 100)}%` : ""),
        ),
      ),
    ),
  );
  box.dataset.tbh = signature;
  if (old !== null) old.replaceWith(box);
  else {
    const cards = panel.querySelector(":scope > .ui-cards");
    if (cards === null) panel.append(box);
    else cards.before(box);
  }
}
