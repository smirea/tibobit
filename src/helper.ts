import {
  type Combo,
  type Key,
  type Kind,
  type Loadout,
  type Part,
  comboProgress,
  combosUsing,
  nameOf,
  partner,
  partState,
  readLoadout,
  relevantCombos,
  unpaired,
} from "./catalog";
import { type Data, liveData } from "./data";
import type { Discovery } from "./discovery";
import type { GameLink, IconSheet } from "./game";
import { css } from "./style";

type View = { d: Data; discovery: Discovery; icons: IconSheet | undefined; loadout: Loadout };

function isShown(el: Element): boolean {
  return el.getClientRects().length > 0;
}

function h<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, ...children: (Node | string)[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  el.className = className;
  el.append(...children);
  return el;
}

function initials(name: string): string {
  const words = name.split(/[\s-]+/).filter(Boolean);
  return (words.length > 1 ? `${words[0]?.[0]}${words[1]?.[0]}` : name.slice(0, 2)).toUpperCase();
}

type Tip = { name: string; note: string; description: string | undefined };
const tips = new WeakMap<Element, Tip>();

/** The game's own sprite for a weapon, passive or item, or its initials when the sheet has none. */
function icon(v: View, key: Key, note = "", className = ""): HTMLElement {
  const id = key.slice(key.indexOf(":") + 1);
  const frame = v.icons?.frames.get(id);
  const box = h("span", `tbh-icon ${className}`.trim());
  tips.set(box, { name: nameOf(v.d.catalog, key), note, description: v.d.catalog.descriptions[key] });
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

function partNeed(v: View, part: Part): string {
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

/** One shared tooltip for every icon, so hovering shows the game's own description without the native title delay. */
function startTips(): () => void {
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

function header(panel: HTMLElement, count: string): HTMLElement {
  const el = h("div", "tbh-header", h("span", "", "Combos"), h("span", "tbh-count", count));
  el.addEventListener("click", () => panel.classList.toggle(panel.classList.contains("tbh-choice") ? "tbh-peek" : "tbh-collapsed"));
  return el;
}

function renderPanel(panel: HTMLElement, v: View) {
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
  panel.replaceChildren(head, body);
}

function renderProblem(panel: HTMLElement, message: string) {
  panel.replaceChildren(header(panel, "offline"), h("div", "tbh-stale", message));
}

function offerKey(card: HTMLElement): { key: Key; level: number } | undefined {
  const tip = card.dataset.tip ?? "";
  const offer = tip.match(/^(weapon|passive)-offer:([a-z0-9-]+):(\d+)$/);
  if (offer) return { key: `${offer[1] as Kind}:${offer[2]}`, level: Number(offer[3]) };
  const item = tip.match(/^item:([a-z0-9-]+)$/);
  if (item) return { key: `item:${item[1]}`, level: 1 };
  return undefined;
}

function annotateCard(card: HTMLElement, v: View, version: number) {
  const offer = offerKey(card);
  if (offer === undefined) return;
  const signature = `${offer.key}|${[...v.loadout].join(",")}|${v.discovery.version}|${version}`;
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

function mount(): HTMLElement {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);
  const panel = h("div", "tbh-panel");
  panel.id = "tibo-helper";
  if (window.innerWidth < 700) panel.classList.add("tbh-collapsed");
  document.body.append(panel);
  return panel;
}

export function startHelper(link: GameLink, discovery: Discovery) {
  const panel = mount();
  const dropStaleTip = startTips();
  let panelSignature = "";
  let queued = false;
  let version = 0;
  let lastInputs: [Data, IconSheet | undefined] | undefined;

  const update = () => {
    queued = false;
    const hud = document.querySelector(".hud-weapons");
    const game = link.game;
    panel.hidden = game === undefined || game.state.over || hud === null || !isShown(hud);
    dropStaleTip();
    if (panel.hidden || game === undefined) return;
    const cards = [...document.querySelectorAll<HTMLElement>(".ui-card[data-tip]")];
    const offered = cards.map(offerKey).filter((o) => o !== undefined);
    panel.classList.toggle("tbh-choice", offered.length > 0);
    if (offered.length === 0) panel.classList.remove("tbh-peek");

    const d = liveData(link);
    if (d === undefined) {
      const problem = link.error === undefined ? "Reading the game's content..." : `Can't read the game's content: ${link.error}. The game changed; tibobit needs an update.`;
      if (panelSignature !== problem) renderProblem(panel, problem);
      panelSignature = problem;
      return;
    }
    if (lastInputs?.[0] !== d || lastInputs[1] !== link.icons) {
      lastInputs = [d, link.icons];
      version++;
    }
    const loadout = readLoadout(game.state);
    discovery.settle(loadout, new Set(offered.map((o) => o.key)));
    const view: View = { d, discovery, icons: link.icons, loadout };
    const signature = `${[...loadout].join(",")}|${discovery.version}|${version}`;
    if (signature !== panelSignature) {
      panelSignature = signature;
      renderPanel(panel, view);
    }
    for (const card of cards) annotateCard(card, view, version);
    dropStaleTip();
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  link.onChange(schedule);
  new MutationObserver((records) => {
    if (records.some((r) => !panel.contains(r.target) && !(r.target instanceof Element && r.target.closest(".tbh-card")))) schedule();
  }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["data-tip", "hidden"] });
  setInterval(schedule, 1000);
  schedule();
}
