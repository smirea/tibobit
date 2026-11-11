import { type Combo, comboProgress, combosUsing, idOf, type Key, type Kind, type Loadout, nameOf, type Part, partner, partState, readLoadout, relevantCombos, unpaired } from "../../game/catalog";
import type { Bridge } from "../agent/bridge";
import { validPort } from "../../protocol/address";
import { botFeed } from "../pilot/feed";
import { runCombos, type RunCombos } from "../combos/run-combos";
import type { Discovery } from "../combos/discovery";
import type { GameLink } from "../link/game-link";
import type { IconSheet } from "../../game/types";
import { css } from "./style";
import { inRun, PANEL_ID } from "../link/screen";

type View = { d: RunCombos; discovery: Discovery; icons: IconSheet | undefined; loadout: Loadout; banished: ReadonlySet<string> };

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

function renderPanel(panel: HTMLElement, content: HTMLElement, v: View) {
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

function renderProblem(panel: HTMLElement, content: HTMLElement, message: string) {
  content.replaceChildren(header(panel, "offline"), h("div", "tbh-stale", message));
}

/** Port picker for the agent server, so a tab can join a server other than the default one. */
function connectionRow(bridge: Bridge): HTMLElement {
  const input = h("input", "tbh-port");
  input.type = "number";
  input.min = "1";
  input.max = "65535";
  input.value = String(bridge.status().port);
  input.setAttribute("aria-label", "Agent server port");
  const button = h("button", "tbh-connect", "Connect");
  const connected = h("span", "tbh-connected", "connected");
  const dot = h("span", "tbh-dot");
  dot.setAttribute("aria-hidden", "true");
  const status = h("div", "tbh-conn-status");
  const wheel = h("button", "tbh-wheel", "Grok take the wheel");
  wheel.type = "button";
  wheel.addEventListener("click", () => bridge.setPilot({ on: true }));
  const wheelNote = h("div", "tbh-wheel-note");
  const incognito = h("button", "tbh-incognito", "Incognito");
  incognito.type = "button";
  incognito.title = "The bot just plays: no notes, no review after the run. Turning it on mid-run deletes that run's notes.";
  incognito.addEventListener("click", () => bridge.setPilot({ incognito: !bridge.pilot().incognito }));

  const refresh = () => {
    const s = bridge.status();
    const live = s.state === "connected";
    // "connected" stands in for the button until the box names a different port.
    const here = live && Number(input.value) === s.port;
    button.hidden = here;
    connected.hidden = !here;
    dot.hidden = !live;
    const text = live ? "" : (s.error ?? `connecting to :${s.port}…`);
    if (status.textContent !== text) status.textContent = text;
    status.hidden = text === "";
    status.dataset.state = s.error === undefined ? "wait" : "error";
    const pilot = bridge.pilot();
    // While the bot plays, its controls sit at the top of its chat.
    wheel.hidden = pilot.state !== "off";
    wheel.disabled = !live;
    wheel.title = live ? "" : "Start the agent server first: ./agent-server/main.ts";
    incognito.setAttribute("aria-pressed", String(pilot.incognito));
    wheelNote.textContent = pilot.detail ?? "";
    wheelNote.hidden = pilot.detail === undefined;
  };
  const connect = (e: SubmitEvent) => {
    e.preventDefault();
    const port = Number(input.value);
    input.classList.toggle("tbh-invalid", !validPort(port));
    if (!validPort(port)) return;
    bridge.connect(port);
  };
  // A form, because Enter submits it as a default action, which still happens after guardPanelKeys
  // stops the key event from reaching anything else.
  const row = h("form", "tbh-conn-row", incognito, h("span", "tbh-conn-label", "Agent port"), input, button, connected, dot);
  row.noValidate = true;
  row.addEventListener("submit", connect);
  bridge.onChange(refresh);
  input.addEventListener("input", () => {
    input.classList.remove("tbh-invalid");
    refresh();
  });
  refresh();
  return h("div", "tbh-conn", row, status, wheel, wheelNote);
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

/**
 * The game reads keys on the window, so typing a port would otherwise steer or pick cards. This has
 * to run at document-start, before the game's own listeners, to see the keys first.
 */
export function guardPanelKeys() {
  for (const type of ["keydown", "keyup", "keypress"]) {
    window.addEventListener(type, (e) => e.target instanceof Element && e.target.closest(`#${PANEL_ID}`) !== null && e.stopImmediatePropagation(), true);
  }
}

function mount(chat: HTMLElement, footer: HTMLElement): { panel: HTMLElement; content: HTMLElement } {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);
  const content = h("div", "tbh-content");
  // The port row sits above the bot's controls while it plays, and at the panel's foot otherwise.
  const panel = h("div", "tbh-panel", content, footer, chat);
  panel.id = PANEL_ID;
  if (window.innerWidth < 700) panel.classList.add("tbh-collapsed");
  document.body.append(panel);
  return { panel, content };
}

export function startPanel(link: GameLink, discovery: Discovery, bridge: Bridge) {
  const { panel, content } = mount(botFeed(bridge), connectionRow(bridge));
  // While the bot plays, its chat takes the corner and the combos fold to their header.
  let collapsedBefore: boolean | undefined;
  const followPilot = () => {
    const piloting = bridge.pilot().state !== "off";
    if (piloting === panel.classList.contains("tbh-pilot")) return;
    panel.classList.toggle("tbh-pilot", piloting);
    if (piloting) {
      collapsedBefore = panel.classList.contains("tbh-collapsed");
      panel.classList.add("tbh-collapsed");
    } else if (collapsedBefore !== undefined) panel.classList.toggle("tbh-collapsed", collapsedBefore);
  };
  bridge.onChange(followPilot);
  followPilot();
  const dropStaleTip = startTips();
  let panelSignature = "";
  let queued = false;
  let version = 0;
  let lastInputs: [RunCombos, IconSheet | undefined] | undefined;

  const update = () => {
    queued = false;
    const game = link.game;
    const running = game !== undefined && inRun(link);
    // Outside a run (title, mode select, end screens) the panel shows only the agent port box.
    panel.classList.toggle("tbh-idle", !running);
    dropStaleTip();
    if (!running) {
      panel.classList.remove("tbh-choice", "tbh-peek");
      return;
    }
    const cards = [...document.querySelectorAll<HTMLElement>(".ui-card[data-tip]")];
    const offered = cards.map(offerKey).filter((o) => o !== undefined);
    panel.classList.toggle("tbh-choice", offered.length > 0);
    if (offered.length === 0) panel.classList.remove("tbh-peek");

    const d = runCombos(link);
    if (d === undefined) {
      const problem = link.error === undefined ? "Reading the game's content..." : `Can't read the game's content: ${link.error}. The game changed; tibobit needs an update.`;
      if (panelSignature !== problem) renderProblem(panel, content, problem);
      panelSignature = problem;
      return;
    }
    if (lastInputs?.[0] !== d || lastInputs[1] !== link.icons) {
      lastInputs = [d, link.icons];
      version++;
    }
    const loadout = readLoadout(game.state);
    discovery.settle(loadout, new Set(offered.map((o) => o.key)));
    const view: View = { d, discovery, icons: link.icons, loadout, banished: game.state.loadout.banished };
    const signature = `${[...loadout].join(",")}|${[...view.banished].join(",")}|${discovery.version}|${version}`;
    if (signature !== panelSignature) {
      panelSignature = signature;
      renderPanel(panel, content, view);
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
