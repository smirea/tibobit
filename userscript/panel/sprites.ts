import { idOf, type Key, nameOf } from "../../game/catalog";
import { h } from "./dom";
import type { View } from "./combos-list";

function initials(name: string): string {
  const words = name.split(/[\s-]+/).filter(Boolean);
  return (words.length > 1 ? `${words[0]?.[0]}${words[1]?.[0]}` : name.slice(0, 2)).toUpperCase();
}

type Tip = { name: string; note: string; description: string | undefined };

const tips = new WeakMap<Element, Tip>();

/** The game's own sprite for a weapon, passive or item, or its initials when the sheet has none. */
export function icon(v: View, key: Key, note = "", className = ""): HTMLElement {
  const id = idOf(key);
  const frame = v.icons?.frames.get(id);
  const banished = v.banished.has(id);
  const box = h("span", `tbh-icon ${className}${banished ? " tbh-banished" : ""}`.trim());
  const notes = [...(banished ? ["banished this run"] : []), ...(note === "" ? [] : [note])].join(" · ");
  tips.set(box, { name: nameOf(v.d.catalog, key), note: notes, description: v.d.catalog.descriptions[key] });
  if (v.icons === undefined || frame === undefined) {
    box.classList.add("tbh-icon-text");
    box.textContent = initials(nameOf(v.d.catalog, key));
    return box;
  }
  const page = v.icons.pageOf(frame);
  const art = h("i", "");
  const s = art.style;
  s.setProperty("--sheet", `url("${page.url}")`);
  s.setProperty("--sw", String(page.width));
  s.setProperty("--sh", String(page.height));
  for (const k of ["x", "y", "w", "h", "ax", "ay"] as const) s.setProperty(`--${k}`, String(frame[k]));
  box.append(art);
  return box;
}

/** One shared tooltip for every icon, so hovering shows the game's own description without the native title delay. */
export function startTips(): () => void {
  const tip = h("div", "tbh-tip");
  tip.hidden = true;
  document.body.append(tip);
  let anchor: Element | undefined;
  const hide = () => {
    anchor = undefined;
    tip.hidden = true;
  };
  const show = (el: Element, content: Tip) => {
    anchor = el;
    tip.replaceChildren(
      h("div", "tbh-tip-name", content.name),
      ...(content.note === "" ? [] : [h("div", "tbh-tip-note", content.note)]),
      ...(content.description === undefined ? [] : [h("div", "tbh-tip-desc", content.description)]),
    );
    tip.hidden = false;
    const at = el.getBoundingClientRect();
    const size = tip.getBoundingClientRect();
    const margin = 8;
    const left = Math.min(Math.max(margin, at.left + at.width / 2 - size.width / 2), window.innerWidth - size.width - margin);
    const below = at.bottom + 6;
    const top = below + size.height + margin > window.innerHeight ? Math.max(margin, at.top - 6 - size.height) : below;
    tip.style.left = `${left}px`;
    tip.style.top = `${top}px`;
  };
  window.addEventListener(
    "pointerover",
    (e) => {
      const el = e.target instanceof Element ? e.target.closest(".tbh-icon") : null;
      if (el === anchor) return;
      const content = el === null ? undefined : tips.get(el);
      if (el === null || content === undefined) return hide();
      show(el, content);
    },
    true,
  );
  window.addEventListener("pointerout", (e) => e.relatedTarget === null && hide(), true);
  window.addEventListener("scroll", hide, true);
  return () => {
    if (anchor !== undefined && !anchor.isConnected) hide();
  };
}
