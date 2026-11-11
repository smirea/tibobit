import { partNeed, type View } from "./combos-list";
import { type Combo, comboProgress, combosUsing, type Key, type Kind, type Loadout, nameOf, partner, partState } from "../../game/catalog";
import { h } from "./dom";
import { icon } from "./sprites";

export function offerKey(card: HTMLElement): { key: Key; level: number } | undefined {
  const tip = card.dataset.tip ?? "";
  const offer = tip.match(/^(weapon|passive)-offer:([a-z0-9-]+):(\d+)$/);
  if (offer) return { key: `${offer[1] as Kind}:${offer[2]}`, level: Number(offer[3]) };
  const item = tip.match(/^item:([a-z0-9-]+)$/);
  if (item) return { key: `item:${item[1]}`, level: 1 };
  return undefined;
}

export function annotateCard(card: HTMLElement, v: View, version: number) {
  const offer = offerKey(card);
  if (offer === undefined) return;
  const signature = `${offer.key}|${[...v.loadout].join(",")}|${[...v.banished].join(",")}|${v.discovery.version}|${version}`;
  if (card.dataset.tbh === signature) return;
  card.dataset.tbh = signature;
  card.querySelector(".tbh-card")?.remove();
  card.classList.remove("tbh-card-new", "tbh-card-evo");

  const isNew = v.discovery.isNew(offer.key);
  const after: Loadout = new Map(v.loadout);
  after.set(offer.key, offer.key.startsWith("item:") ? (v.loadout.get(offer.key) ?? 0) + 1 : offer.level);
  const held = (c: Combo) => v.loadout.has(partner(c, offer.key).key);
  const uses = combosUsing(v.d.combos, offer.key)
    .filter((c) => !v.loadout.has(c.result))
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
        `tbh-line tbh-${partState(other, v.loadout, v.d.catalog)}`,
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
