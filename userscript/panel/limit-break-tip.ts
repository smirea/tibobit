import { nameOf } from "../../game/catalog";
import type { CardOffer } from "./card-notes";
import type { View } from "./combos-list";
import { h } from "./dom";

// The game shows one tooltip for every card. On a Limit Break card it says only what the break
// costs, so this adds what the weapon or passive does, found by the tooltip's title.
export function describeLimitBreak(v: View, offered: { offer: CardOffer }[]) {
  const tip = document.getElementById("ui-tip");
  if (tip === null) return;
  const title = tip.querySelector(".ui-tip-title")?.textContent?.trim();
  const target = offered.find((o) => o.offer.limitBreak === true && nameOf(v.d.catalog, o.offer.key) === title)?.offer.key;
  const text = target === undefined ? undefined : v.d.catalog.descriptions[target];
  const old = tip.querySelector<HTMLElement>(":scope > .tbh-lb-desc");
  if (old !== null && old.textContent === text) return;
  old?.remove();
  if (text === undefined) return;
  const desc = h("div", "ui-tip-body tbh-lb-desc", text);
  const head = tip.querySelector(":scope > .ui-tip-head");
  if (head === null) tip.append(desc);
  else head.after(desc);
}
