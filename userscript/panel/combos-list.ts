import type { IconSheet } from "../../game/types";
import { type Combo, comboProgress, type Loadout, nameOf, type Part, relevantCombos, unpaired } from "../../game/catalog";
import { h } from "./dom";
import { icon } from "./sprites";
import type { RunCombos } from "../combos/run-combos";
import { Discovery } from "../combos/discovery";

export type View = { d: RunCombos; discovery: Discovery; icons: IconSheet | undefined; loadout: Loadout; banished: ReadonlySet<string> };

export function partNeed(v: View, part: Part): string {
  const max = v.d.catalog.maxLevel[part.key];
  if (part.need !== "max" || max === undefined) return "";
  const have = v.loadout.get(part.key);
  return `needs Lv${max}${have === undefined ? "" : `, have ${have}`}`;
}

function partTitle(v: View, part: Part): string {
  const need = partNeed(v, part);
  return `${nameOf(v.d.catalog, part.key)}${need === "" ? "" : ` (${need})`}`;
}

function resultNote(v: View, combo: Combo): string {
  return `makes ${nameOf(v.d.catalog, combo.result)}${v.discovery.made(combo.result) ? "" : " (never made)"}`;
}

function pairingNote(v: View, part: Part, combo: Combo): string {
  return [partNeed(v, part), resultNote(v, combo)].filter(Boolean).join(" · ");
}

function header(panel: HTMLElement, count: string): HTMLElement {
  const el = h("div", "tbh-header", h("span", "", "Combos"), h("span", "tbh-count", count));
  el.addEventListener("click", () => panel.classList.toggle(panel.classList.contains("tbh-choice") ? "tbh-peek" : "tbh-collapsed"));
  return el;
}

export function renderPanel(panel: HTMLElement, content: HTMLElement, v: View) {
  const rows = unpaired(v.d.combos, v.loadout);
  const paired = relevantCombos(v.d.combos, v.loadout).filter((c) => c.parts.every((p) => v.loadout.has(p.key)));
  const ready = paired.filter((c) => comboProgress(c, v.loadout, v.d.catalog).every((s) => s === "done"));
  const body = h("div", "tbh-body");
  if (rows.length === 0) body.append(h("div", "tbh-empty", paired.length > 0 ? "Everything you hold is paired." : "Nothing you hold has a combo."));
  for (const { held, options } of rows) {
    const fresh = options.some((o) => !v.discovery.made(o.combo.result));
    const opts = h("span", "tbh-opts");
    for (const o of options) opts.append(icon(v, o.partner.key, pairingNote(v, o.partner, o.combo), v.discovery.made(o.combo.result) ? "" : "tbh-fresh"));
    body.append(
      h(
        "div",
        "tbh-need",
        fresh ? h("span", "tbh-badge tbh-badge-evo", "NEW") : h("span", ""),
        icon(v, held),
        h("span", "tbh-colon", ":"),
        opts,
      ),
    );
  }
  const counts = [`${rows.length} open`, `${paired.length} paired`, ...(ready.length > 0 ? [`${ready.length} ready`] : [])].join(" · ");
  const head = header(panel, counts);
  head.title = paired.map((c) => `${c.parts.map((p) => partTitle(v, p)).join(" + ")} → ${nameOf(v.d.catalog, c.result)}`).join("\n");
  content.replaceChildren(head, body);
}

export function renderProblem(panel: HTMLElement, content: HTMLElement, message: string) {
  content.replaceChildren(header(panel, "offline"), h("div", "tbh-stale", message));
}
