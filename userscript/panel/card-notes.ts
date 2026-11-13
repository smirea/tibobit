import { partNeed, type View } from "./combos-list";
import { type Combo, comboProgress, combosUsing, type Key, type Kind, type Loadout, nameOf, partner, partState } from "../../game/catalog";
import type { GameState } from "../../game/types";
import { h } from "./dom";
import { icon } from "./sprites";

/** What taking a card adds, at what level, and the weapon it takes away, as a Transmute does. */
export type CardOffer = { key: Key; level: number; replaces?: Key; limitBreak?: true };

function tippedOffer(card: HTMLElement): CardOffer | undefined {
  const tip = card.dataset.tip ?? "";
  const offer = tip.match(/^(weapon|passive)-offer:([a-z0-9-]+):(\d+)$/);
  if (offer) return { key: `${offer[1] as Kind}:${offer[2]}`, level: Number(offer[3]) };
  const item = tip.match(/^item:([a-z0-9-]+)$/);
  if (item) return { key: `item:${item[1]}`, level: 1 };
  // A limit break sends the weapon or passive back to level 1.
  const broken = tip.match(/^bigUpdate:limit-break:(weapon|passive):([a-z0-9-]+):\d+$/);
  if (broken) return { key: `${broken[1] as Kind}:${broken[2]}`, level: 1, limitBreak: true };
  return undefined;
}

// The Transmute's cards carry no tip, so each is read by the icon it shows, among the weapons the
// game's choice says the weapon in slot `from` can become; the card's tag is the level it lands at.
function transmuteOffer(card: HTMLElement, state: GameState): CardOffer | undefined {
  const choice = state.choiceQueue[0];
  const step = choice?.step;
  if (choice?.kind !== "crossroads" || step?.kind !== "target" || !card.classList.contains("ui-xr-card")) return undefined;
  const id = card.querySelector<HTMLElement>(".ui-icon[data-icon]")?.dataset.icon;
  if (id === undefined || !step.into.includes(id)) return undefined;
  const from = state.loadout.weapons.find((w) => w.slot === step.from);
  const level = Number(card.dataset.tag?.match(/\d+/)?.[0] ?? 1);
  return { key: `weapon:${id}`, level, ...(from === undefined ? {} : { replaces: `weapon:${from.def.id}` as Key }) };
}

export function cardOffer(card: HTMLElement, state: GameState): CardOffer | undefined {
  return tippedOffer(card) ?? transmuteOffer(card, state);
}

export function annotateCard(card: HTMLElement, offer: CardOffer, v: View, version: number) {
  const signature = `${offer.key}|${offer.replaces ?? ""}|${[...v.loadout].join(",")}|${[...v.banished].join(",")}|${v.discovery.version}|${version}`;
  if (card.dataset.tbh === signature) return;
  card.dataset.tbh = signature;
  card.querySelector(".tbh-card")?.remove();
  card.classList.remove("tbh-card-new", "tbh-card-evo");

  const isNew = v.discovery.isNew(offer.key);
  const kept: Loadout = new Map(v.loadout);
  if (offer.replaces !== undefined) kept.delete(offer.replaces);
  const after: Loadout = new Map(kept);
  after.set(offer.key, offer.key.startsWith("item:") ? (kept.get(offer.key) ?? 0) + 1 : offer.level);
  const held = (c: Combo) => kept.has(partner(c, offer.key).key);
  const uses = combosUsing(v.d.combos, offer.key)
    .filter((c) => !kept.has(c.result))
    .sort((a, b) => Number(held(b)) - Number(held(a)));

  if (isNew) card.classList.add("tbh-card-new");
  if (uses.some((c) => held(c) && !v.discovery.made(c.result))) card.classList.add("tbh-card-evo");
  if (!isNew && uses.length === 0) return;

  const box = h("div", "tbh-card");
  if (isNew) box.append(h("span", "tbh-badge tbh-badge-new", "UNSEEN"));
  for (const combo of uses) {
    const other = partner(combo, offer.key);
    const ready = comboProgress(combo, after, v.d.catalog).every((s) => s === "done");
    const fresh = !v.discovery.made(combo.result);
    box.append(
      h(
        "div",
        `tbh-line tbh-${partState(other, kept, v.d.catalog)}`,
        icon(v, other.key, partNeed(v, other)),
        h("span", "tbh-arrow", "→"),
        icon(v, combo.result, fresh ? "never made" : "", fresh ? "tbh-fresh" : ""),
        h("span", "tbh-result", nameOf(v.d.catalog, combo.result)),
        ...(ready ? [h("span", "tbh-ready-tag", "READY")] : []),
      ),
    );
  }
  (card.querySelector(".ui-card-text") ?? card).append(box);
}
