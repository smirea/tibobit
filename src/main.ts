import {
  type Catalog,
  type Combo,
  type Key,
  type Kind,
  type Loadout,
  type Part,
  type PartState,
  buildCatalog,
  comboProgress,
  combosUsing,
  nameOf,
  partner,
  partState,
  readLoadout,
  relevantCombos,
  toCombo,
} from "./catalog";
import { type Content, GameLink } from "./game";
import { css } from "./style";

const link = new GameLink();

type Data = { catalog: Catalog; combos: Combo[] };
let data: Data | undefined;
let dataFrom: { content: Content; messages: number } | undefined;

function currentData(): Data | undefined {
  const content = link.content();
  if (content === undefined) return undefined;
  const messages = Object.keys(link.messages).length;
  if (dataFrom?.content !== content || dataFrom.messages !== messages) {
    const catalog = buildCatalog(content, link.messages);
    data = { catalog, combos: catalog.recipes.map(toCombo) };
    dataFrom = { content, messages };
  }
  return data;
}

const DISCOVERY_KEY = "tibo.discovery.v1";
const EVOLUTIONS_KEY = "tibo.evolutions.v1";

function parseDiscovery(raw: string | null): Set<Key> {
  const out = new Set<Key>();
  try {
    const d = JSON.parse(raw ?? "{}") as Partial<Record<Kind, string[]>>;
    for (const kind of ["weapon", "passive", "item"] as const) for (const id of d[kind] ?? []) out.add(`${kind}:${id}`);
  } catch {
    // A corrupt store reads as "nothing discovered"; every card then shows as new.
  }
  return out;
}

// The game marks every offer as discovered in the same frame the choice opens, so the store
// always says "known" by the time a card renders. Keep the pre-session snapshot and hold back
// ids the game adds until their card has been shown and closed, or until they are held.
class Discovery {
  private known = parseDiscovery(localStorage.getItem(DISCOVERY_KEY));
  private pending = new Map<Key, "unseen" | "shown">();

  constructor() {
    const nativeSetItem = Storage.prototype.setItem;
    const track = (value: string) => {
      for (const key of parseDiscovery(value)) if (!this.known.has(key) && !this.pending.has(key)) this.pending.set(key, "unseen");
    };
    Storage.prototype.setItem = function (this: Storage, name: string, value: string) {
      if (name === DISCOVERY_KEY) track(value);
      return nativeSetItem.call(this, name, value);
    };
  }

  isNew(key: Key): boolean {
    return !this.known.has(key);
  }

  made(result: Key): boolean {
    try {
      const ids = JSON.parse(localStorage.getItem(EVOLUTIONS_KEY) ?? "[]") as string[];
      return ids.includes(result.slice(result.indexOf(":") + 1));
    } catch {
      return false;
    }
  }

  settle(loadout: Loadout, onScreen: Set<Key>) {
    for (const [key, state] of this.pending) {
      if (loadout.has(key) || (state === "shown" && !onScreen.has(key))) {
        this.known.add(key);
        this.pending.delete(key);
      } else if (onScreen.has(key)) this.pending.set(key, "shown");
    }
  }

  get version(): string {
    return `${this.known.size}/${this.pending.size}`;
  }
}

const discovery = new Discovery();

function isShown(el: Element): boolean {
  return el.getClientRects().length > 0;
}

function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className: string,
  ...children: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  el.className = className;
  el.append(...children);
  return el;
}

const STATE_MARK: Record<PartState, string> = { done: "✓", leveling: "▲", missing: "✗" };

function partLabel({ catalog }: Data, part: Part, loadout: Loadout): HTMLElement {
  const state = partState(part, loadout, catalog);
  const max = catalog.maxLevel[part.key];
  let detail = "";
  if (part.need === "max" && max !== undefined) {
    const have = loadout.get(part.key);
    detail = have === undefined ? ` Lv${max}` : ` ${have}/${max}`;
  }
  return h("span", `tbh-part tbh-${state}`, `${STATE_MARK[state]} ${nameOf(catalog, part.key)}${detail}`);
}

function resultLabel({ catalog }: Data, combo: Combo): HTMLElement {
  const el = h("span", "tbh-result", nameOf(catalog, combo.result));
  if (!discovery.made(combo.result)) el.append(h("span", "tbh-badge tbh-badge-evo", "NEW"));
  return el;
}

function readiness({ catalog }: Data, combo: Combo, loadout: Loadout): number {
  return comboProgress(combo, loadout, catalog).filter((s) => s === "done").length;
}

const KIND_NOTE: Record<Combo["recipe"]["kind"], string> = {
  evolution: "chest",
  union: "union",
  itemEvolution: "item",
};

function missingPath({ catalog, combos }: Data, part: Part, loadout: Loadout): HTMLElement | undefined {
  if (loadout.has(part.key)) return undefined;
  const via = combos.find((c) => c.result === part.key);
  if (via === undefined) return undefined;
  return h("div", "tbh-via", `${nameOf(catalog, part.key)} = ${via.parts.map((p) => nameOf(catalog, p.key)).join(" + ")}`);
}

function header(panel: HTMLElement, count: string): HTMLElement {
  const el = h("div", "tbh-header", h("span", "", "Combos"), h("span", "tbh-count", count));
  el.addEventListener("click", () => panel.classList.toggle(panel.classList.contains("tbh-choice") ? "tbh-peek" : "tbh-collapsed"));
  return el;
}

function renderPanel(panel: HTMLElement, d: Data, loadout: Loadout) {
  const { catalog } = d;
  const list = relevantCombos(d.combos, loadout).sort(
    (a, b) => readiness(d, b, loadout) - readiness(d, a, loadout) || nameOf(catalog, a.result).localeCompare(nameOf(catalog, b.result)),
  );
  const ready = list.filter((c) => readiness(d, c, loadout) === 2).length;
  const body = h("div", "tbh-body");
  if (list.length === 0) body.append(h("div", "tbh-empty", "No combos use anything you hold yet."));
  for (const combo of list) {
    const isReady = readiness(d, combo, loadout) === 2;
    const row = h(
      "div",
      `tbh-row${isReady ? " tbh-ready" : ""}`,
      h("div", "tbh-row-head", resultLabel(d, combo), h("span", "tbh-kind", isReady ? "READY" : KIND_NOTE[combo.recipe.kind])),
      h("div", "tbh-parts", partLabel(d, combo.parts[0], loadout), h("span", "tbh-plus", "+"), partLabel(d, combo.parts[1], loadout)),
    );
    for (const p of combo.parts) {
      const via = missingPath(d, p, loadout);
      if (via !== undefined) row.append(via);
    }
    body.append(row);
  }
  panel.replaceChildren(header(panel, `${ready} ready / ${list.length}`), body);
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

function annotateCard(card: HTMLElement, d: Data, version: number, loadout: Loadout) {
  const offer = offerKey(card);
  if (offer === undefined) return;
  const signature = `${offer.key}|${[...loadout].join(",")}|${discovery.version}|${version}`;
  if (card.dataset.tbh === signature) return;
  card.dataset.tbh = signature;
  card.querySelector(".tbh-card")?.remove();
  card.classList.remove("tbh-card-new", "tbh-card-evo");

  const isNew = discovery.isNew(offer.key);
  const after: Loadout = new Map(loadout);
  after.set(offer.key, offer.key.startsWith("item:") ? (loadout.get(offer.key) ?? 0) + 1 : offer.level);

  const uses = combosUsing(d.combos, offer.key).filter((c) => !loadout.has(c.result));
  const matches = uses.filter((c) => loadout.has(partner(c, offer.key).key));
  const shown = isNew ? uses : matches;
  const opensUnknown = matches.some((c) => !discovery.made(c.result));

  if (isNew) card.classList.add("tbh-card-new");
  if (opensUnknown) card.classList.add("tbh-card-evo");
  if (!isNew && shown.length === 0) return;

  const box = h("div", "tbh-card");
  if (isNew) box.append(h("span", "tbh-badge tbh-badge-new", "UNSEEN"));
  for (const combo of shown.sort((a, b) => Number(matches.includes(b)) - Number(matches.includes(a)))) {
    const readyAfter = comboProgress(combo, after, d.catalog).every((s) => s === "done");
    box.append(
      h(
        "div",
        `tbh-line${matches.includes(combo) ? " tbh-match" : ""}`,
        h("span", "tbh-plus", "+"),
        partLabel(d, partner(combo, offer.key), loadout),
        h("span", "tbh-arrow", "→"),
        resultLabel(d, combo),
        ...(readyAfter ? [h("span", "tbh-kind tbh-ready-tag", "READY")] : []),
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

function start() {
  const panel = mount();
  let panelSignature = "";
  let queued = false;
  let version = 0;
  let lastData: Data | undefined;

  const update = () => {
    queued = false;
    const hud = document.querySelector(".hud-weapons");
    const game = link.game;
    panel.hidden = game === undefined || game.state.over || hud === null || !isShown(hud);
    if (panel.hidden || game === undefined) return;
    const cards = [...document.querySelectorAll<HTMLElement>(".ui-card[data-tip]")];
    const offered = cards.map(offerKey).filter((o) => o !== undefined);
    panel.classList.toggle("tbh-choice", offered.length > 0);
    if (offered.length === 0) panel.classList.remove("tbh-peek");

    const d = currentData();
    if (d === undefined) {
      const problem = link.error === undefined ? "Reading the game's content..." : `Can't read the game's content: ${link.error}. The game changed; tibobit needs an update.`;
      if (panelSignature !== problem) renderProblem(panel, problem);
      panelSignature = problem;
      return;
    }
    if (d !== lastData) {
      lastData = d;
      version++;
    }
    const loadout = readLoadout(game.state);
    discovery.settle(loadout, new Set(offered.map((o) => o.key)));
    const signature = `${[...loadout].join(",")}|${discovery.version}|${version}`;
    if (signature !== panelSignature) {
      panelSignature = signature;
      renderPanel(panel, d, loadout);
    }
    for (const card of cards) annotateCard(card, d, version, loadout);
  };
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  link.onChange(schedule);
  new MutationObserver((records) => {
    if (records.some((r) => !panel.contains(r.target) && !(r.target instanceof Element && r.target.closest(".tbh-card"))))
      schedule();
  }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["data-tip", "hidden"] });
  setInterval(schedule, 1000);
  schedule();
}

if (document.body === null) document.addEventListener("DOMContentLoaded", start, { once: true });
else start();
