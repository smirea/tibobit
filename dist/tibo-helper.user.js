// ==UserScript==
// @name         tibo.dog combo helper
// @namespace    https://github.com/smirea/tibobit
// @version      1.1.0
// @description  Lists the evolutions your current loadout can reach and annotates level-up cards with combos and undiscovered picks.
// @match        https://tibo.dog/*
// @run-at       document-start
// @grant        none
// @updateURL    https://raw.githubusercontent.com/smirea/tibobit/master/dist/tibo-helper.user.js
// @downloadURL  https://raw.githubusercontent.com/smirea/tibobit/master/dist/tibo-helper.user.js
// ==/UserScript==
(() => {
  // src/catalog.ts
  function titleCase(id) {
    return id.replace(/(^|-)(\w)/g, (_, dash, c) => `${dash ? " " : ""}${c.toUpperCase()}`);
  }
  function buildCatalog(content, messages) {
    const names = {};
    const maxLevel = {};
    const name = (kind, id) => {
      names[`${kind}:${id}`] = messages[`content.${kind}.${id}.name`]?.[0] ?? titleCase(id);
    };
    for (const w of content.allWeapons) {
      name("weapon", w.id);
      if (w.tier === "base")
        maxLevel[`weapon:${w.id}`] = Math.min(8, (w.levels?.length ?? 0) + 1);
    }
    for (const p of content.passives) {
      name("passive", p.id);
      maxLevel[`passive:${p.id}`] = p.maxLevel;
    }
    for (const i of content.allItems)
      name("item", i.id);
    const passiveIds = new Set(content.passives.map((p) => p.id));
    const recipes = [];
    for (const e of content.evolutions) {
      if (typeof e.from !== "string" || e.catalyst === undefined)
        continue;
      const catalyst = passiveIds.has(e.catalyst) ? `passive:${e.catalyst}` : `item:${e.catalyst}`;
      recipes.push({ kind: "evolution", weapon: e.from, catalyst, result: e.id });
    }
    for (const u of content.unions) {
      if (!Array.isArray(u.from) || u.from.length !== 2)
        continue;
      recipes.push({ kind: "union", weapons: [u.from[0] ?? "", u.from[1] ?? ""], result: u.id });
    }
    for (const i of content.evolvedItems) {
      if (i.from === undefined || i.catalyst === undefined)
        continue;
      recipes.push({ kind: "itemEvolution", item: i.from, catalyst: i.catalyst, result: i.id });
    }
    return { names, maxLevel, recipes };
  }
  function toCombo(r) {
    switch (r.kind) {
      case "evolution":
        return {
          recipe: r,
          result: `weapon:${r.result}`,
          parts: [
            { key: `weapon:${r.weapon}`, need: "max" },
            { key: r.catalyst, need: "own" }
          ]
        };
      case "union":
        return {
          recipe: r,
          result: `weapon:${r.result}`,
          parts: [
            { key: `weapon:${r.weapons[0]}`, need: "own" },
            { key: `weapon:${r.weapons[1]}`, need: "own" }
          ]
        };
      case "itemEvolution":
        return {
          recipe: r,
          result: `item:${r.result}`,
          parts: [
            { key: `item:${r.item}`, need: "own" },
            { key: `passive:${r.catalyst}`, need: "max" }
          ]
        };
    }
  }
  function readLoadout(state) {
    const loadout = new Map;
    for (const w of state.loadout.weapons)
      loadout.set(`weapon:${w.def.id}`, w.level);
    for (const p of state.loadout.passives)
      loadout.set(`passive:${p.def.id}`, p.level);
    for (const [id, count] of state.loadout.items)
      if (count > 0)
        loadout.set(`item:${id}`, count);
    return loadout;
  }
  function partState(part, loadout, catalog) {
    const have = loadout.get(part.key);
    if (have === undefined)
      return "missing";
    if (part.need === "own")
      return "done";
    return have >= (catalog.maxLevel[part.key] ?? 1) ? "done" : "leveling";
  }
  function comboProgress(combo, loadout, catalog) {
    return combo.parts.map((p) => partState(p, loadout, catalog));
  }
  function combosUsing(combos, key) {
    return combos.filter((c) => c.parts.some((p) => p.key === key));
  }
  function partner(combo, key) {
    const [a, b] = combo.parts;
    return a.key === key ? b : a;
  }
  function relevantCombos(combos, loadout) {
    return combos.filter((c) => !loadout.has(c.result) && c.parts.some((p) => loadout.has(p.key)));
  }
  function nameOf(catalog, key) {
    return catalog.names[key] ?? titleCase(key.slice(key.indexOf(":") + 1));
  }

  // src/game.ts
  var SIM_CHUNK = /\/assets\/sim-[\w-]+\.js$/;
  var ENGLISH_CHUNK = /\/assets\/i18n-en-[\w.-]+\.js$/;
  function isGameClass(value) {
    return typeof value === "function" && typeof value.prototype?.step === "function" && typeof value.prototype?.choose === "function";
  }
  function findGameClass(ns) {
    for (const value of Object.values(ns)) {
      if (value === null || typeof value !== "object")
        continue;
      const candidate = value.Game;
      if (isGameClass(candidate))
        return candidate;
    }
    throw new Error("the sim chunk no longer exports a Game class");
  }
  async function findContentFn(simUrl) {
    const source = await (await fetch(simUrl)).text();
    const local = source.match(/([\w$]+)\(e\.bigUpdate\)\.baseWeapons/)?.[1];
    if (local === undefined)
      throw new Error("could not find the content registry call in the sim chunk");
    for (const clause of source.matchAll(/import\{([^}]*)\}from"([^"]+)"/g)) {
      for (const binding of (clause[1] ?? "").split(",")) {
        const [exported = "", as] = binding.split(" as ");
        if ((as ?? exported) !== local)
          continue;
        const mod = await import(new URL(clause[2] ?? "", simUrl).href);
        const fn = mod[exported];
        if (typeof fn !== "function")
          throw new Error(`content registry export ${exported} is not a function`);
        return fn;
      }
    }
    throw new Error(`could not find where the sim chunk imports ${local}`);
  }
  function assertContent(value) {
    const c = value;
    for (const key of ["baseWeapons", "evolutions", "unions", "passives", "items", "evolvedItems", "allWeapons", "allItems"])
      if (!Array.isArray(c[key]))
        throw new Error(`content registry has no ${key} list`);
  }

  class GameLink {
    game;
    messages = {};
    error;
    contentFn;
    seen = new Set;
    listeners = new Set;
    constructor() {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          this.saw(entry.name);
      }).observe({ type: "resource", buffered: true });
    }
    onChange(fn) {
      this.listeners.add(fn);
    }
    content() {
      if (this.game === undefined || this.contentFn === undefined)
        return;
      try {
        const content = this.contentFn(this.game.state.bigUpdate);
        assertContent(content);
        return content;
      } catch (e) {
        this.fail(e);
        return;
      }
    }
    changed() {
      for (const fn of this.listeners)
        fn();
    }
    fail(e) {
      const message = e instanceof Error ? e.message : String(e);
      if (this.error === message)
        return;
      this.error = message;
      console.error("[tibobit]", message);
      this.changed();
    }
    saw(url) {
      if (this.seen.has(url))
        return;
      this.seen.add(url);
      if (SIM_CHUNK.test(url))
        this.attachSim(url).catch((e) => this.fail(e));
      else if (ENGLISH_CHUNK.test(url))
        this.loadMessages(url).catch((e) => this.fail(e));
    }
    async attachSim(url) {
      const ns = await import(url);
      const Game = findGameClass(ns);
      const link = this;
      const step = Game.prototype.step;
      Game.prototype.step = function() {
        if (link.game !== this) {
          link.game = this;
          link.changed();
        }
        return step.call(this);
      };
      this.contentFn = await findContentFn(url);
      this.changed();
    }
    async loadMessages(url) {
      const ns = await import(url);
      for (const value of Object.values(ns)) {
        if (value === null || typeof value !== "object" || !Object.keys(value).some((k) => k.startsWith("content.")))
          continue;
        Object.assign(this.messages, value);
      }
      this.changed();
    }
  }

  // src/style.ts
  var css = `
.tbh-panel {
  position: fixed; top: 52px; right: 8px; z-index: 2147483000;
  width: min(300px, calc(100vw - 16px)); max-height: calc(100vh - 120px); overflow: auto;
  background: rgba(17, 14, 10, 0.88); color: #f3e6c4; border: 1px solid #6b5631; border-radius: 6px;
  font: 12px/1.35 ui-monospace, Menlo, Consolas, monospace; box-shadow: 0 4px 18px rgba(0,0,0,.5);
  touch-action: auto; user-select: none;
}
.tbh-panel[hidden] { display: none; }
.tbh-panel.tbh-collapsed:not(.tbh-choice), .tbh-panel.tbh-choice:not(.tbh-peek) { width: auto; }
.tbh-collapsed .tbh-header, .tbh-choice:not(.tbh-peek) .tbh-header { gap: 12px; }
@media (max-width: 699px) {
  .tbh-panel { top: 100px; }
  .tbh-panel.tbh-choice { display: none; }
}
.tbh-header { display: flex; justify-content: space-between; padding: 6px 8px; cursor: pointer; font-weight: 700; color: #ffd36b; position: sticky; top: 0; background: rgba(17,14,10,.96); }
.tbh-count { color: #c9b58a; font-weight: 400; }
.tbh-collapsed:not(.tbh-choice) :is(.tbh-body, .tbh-stale),
.tbh-choice:not(.tbh-peek) :is(.tbh-body, .tbh-stale) { display: none; }
.tbh-body { padding: 0 6px 6px; }
.tbh-empty { color: #a8977a; padding: 4px 2px; }
.tbh-row { padding: 5px 6px; margin-top: 4px; border-radius: 4px; background: rgba(255,255,255,.04); border-left: 3px solid #5d4c2e; }
.tbh-row.tbh-ready { border-left-color: #5ee8a0; background: rgba(94,232,160,.10); }
.tbh-row-head { display: flex; justify-content: space-between; gap: 6px; align-items: baseline; }
.tbh-result { font-weight: 700; color: #ffe9b0; }
.tbh-kind { font-size: 10px; color: #a8977a; text-transform: uppercase; letter-spacing: .05em; }
.tbh-ready .tbh-kind, .tbh-ready-tag { color: #5ee8a0; font-weight: 700; }
.tbh-parts { display: flex; flex-wrap: wrap; gap: 2px 6px; margin-top: 2px; }
.tbh-plus, .tbh-arrow { color: #8d7c5c; }
.tbh-done { color: #7fe3a4; }
.tbh-leveling { color: #ffcf5a; }
.tbh-missing { color: #e38a7f; }
.tbh-via { font-size: 10.5px; color: #a8977a; margin-top: 2px; }
.tbh-stale { margin: 0 6px 6px; padding: 4px 6px; border-radius: 4px; background: rgba(227,138,127,.15); color: #f0b3aa; font-size: 11px; }
.tbh-badge { display: inline-block; margin-left: 5px; padding: 0 4px; border-radius: 3px; font-size: 9.5px; font-weight: 800; letter-spacing: .06em; vertical-align: 1px; }
.tbh-badge-new { align-self: flex-start; background: #ff7ad9; color: #3d0630; margin: 0 0 2px; }
.tbh-badge-evo { background: #ffd36b; color: #3a2600; }

.ui-card.tbh-card-new { box-shadow: 0 0 0 2px #ff7ad9, 0 0 16px rgba(255,122,217,.6) !important; }
.ui-card.tbh-card-evo { box-shadow: 0 0 0 2px #ffd36b, 0 0 14px rgba(255,211,107,.55) !important; }
.ui-card.tbh-card-new.tbh-card-evo { box-shadow: 0 0 0 2px #ff7ad9, 0 0 0 4px #ffd36b, 0 0 16px rgba(255,211,107,.5) !important; }
.tbh-card { display: flex; flex-direction: column; gap: 1px; margin-top: 4px; font: clamp(11px, .6em, 16px)/1.3 ui-monospace, Menlo, Consolas, monospace; color: #c9b58a; text-align: start; }
.tbh-line { display: flex; flex-wrap: wrap; gap: 0 5px; align-items: baseline; opacity: .7; }
.tbh-line.tbh-match { opacity: 1; color: #f3e6c4; }
`;

  // src/main.ts
  var link = new GameLink;
  var data;
  var dataFrom;
  function currentData() {
    const content = link.content();
    if (content === undefined)
      return;
    const messages = Object.keys(link.messages).length;
    if (dataFrom?.content !== content || dataFrom.messages !== messages) {
      const catalog = buildCatalog(content, link.messages);
      data = { catalog, combos: catalog.recipes.map(toCombo) };
      dataFrom = { content, messages };
    }
    return data;
  }
  var DISCOVERY_KEY = "tibo.discovery.v1";
  var EVOLUTIONS_KEY = "tibo.evolutions.v1";
  function parseDiscovery(raw) {
    const out = new Set;
    try {
      const d = JSON.parse(raw ?? "{}");
      for (const kind of ["weapon", "passive", "item"])
        for (const id of d[kind] ?? [])
          out.add(`${kind}:${id}`);
    } catch {}
    return out;
  }

  class Discovery {
    known = parseDiscovery(localStorage.getItem(DISCOVERY_KEY));
    pending = new Map;
    constructor() {
      const nativeSetItem = Storage.prototype.setItem;
      const track = (value) => {
        for (const key of parseDiscovery(value))
          if (!this.known.has(key) && !this.pending.has(key))
            this.pending.set(key, "unseen");
      };
      Storage.prototype.setItem = function(name, value) {
        if (name === DISCOVERY_KEY)
          track(value);
        return nativeSetItem.call(this, name, value);
      };
    }
    isNew(key) {
      return !this.known.has(key);
    }
    made(result) {
      try {
        const ids = JSON.parse(localStorage.getItem(EVOLUTIONS_KEY) ?? "[]");
        return ids.includes(result.slice(result.indexOf(":") + 1));
      } catch {
        return false;
      }
    }
    settle(loadout, onScreen) {
      for (const [key, state] of this.pending) {
        if (loadout.has(key) || state === "shown" && !onScreen.has(key)) {
          this.known.add(key);
          this.pending.delete(key);
        } else if (onScreen.has(key))
          this.pending.set(key, "shown");
      }
    }
    get version() {
      return `${this.known.size}/${this.pending.size}`;
    }
  }
  var discovery = new Discovery;
  function isShown(el) {
    return el.getClientRects().length > 0;
  }
  function h(tag, className, ...children) {
    const el = document.createElement(tag);
    el.className = className;
    el.append(...children);
    return el;
  }
  var STATE_MARK = { done: "✓", leveling: "▲", missing: "✗" };
  function partLabel({ catalog }, part, loadout) {
    const state = partState(part, loadout, catalog);
    const max = catalog.maxLevel[part.key];
    let detail = "";
    if (part.need === "max" && max !== undefined) {
      const have = loadout.get(part.key);
      detail = have === undefined ? ` Lv${max}` : ` ${have}/${max}`;
    }
    return h("span", `tbh-part tbh-${state}`, `${STATE_MARK[state]} ${nameOf(catalog, part.key)}${detail}`);
  }
  function resultLabel({ catalog }, combo) {
    const el = h("span", "tbh-result", nameOf(catalog, combo.result));
    if (!discovery.made(combo.result))
      el.append(h("span", "tbh-badge tbh-badge-evo", "NEW"));
    return el;
  }
  function readiness({ catalog }, combo, loadout) {
    return comboProgress(combo, loadout, catalog).filter((s) => s === "done").length;
  }
  var KIND_NOTE = {
    evolution: "chest",
    union: "union",
    itemEvolution: "item"
  };
  function missingPath({ catalog, combos }, part, loadout) {
    if (loadout.has(part.key))
      return;
    const via = combos.find((c) => c.result === part.key);
    if (via === undefined)
      return;
    return h("div", "tbh-via", `${nameOf(catalog, part.key)} = ${via.parts.map((p) => nameOf(catalog, p.key)).join(" + ")}`);
  }
  function header(panel, count) {
    const el = h("div", "tbh-header", h("span", "", "Combos"), h("span", "tbh-count", count));
    el.addEventListener("click", () => panel.classList.toggle(panel.classList.contains("tbh-choice") ? "tbh-peek" : "tbh-collapsed"));
    return el;
  }
  function renderPanel(panel, d, loadout) {
    const { catalog } = d;
    const list = relevantCombos(d.combos, loadout).sort((a, b) => readiness(d, b, loadout) - readiness(d, a, loadout) || nameOf(catalog, a.result).localeCompare(nameOf(catalog, b.result)));
    const ready = list.filter((c) => readiness(d, c, loadout) === 2).length;
    const body = h("div", "tbh-body");
    if (list.length === 0)
      body.append(h("div", "tbh-empty", "No combos use anything you hold yet."));
    for (const combo of list) {
      const isReady = readiness(d, combo, loadout) === 2;
      const row = h("div", `tbh-row${isReady ? " tbh-ready" : ""}`, h("div", "tbh-row-head", resultLabel(d, combo), h("span", "tbh-kind", isReady ? "READY" : KIND_NOTE[combo.recipe.kind])), h("div", "tbh-parts", partLabel(d, combo.parts[0], loadout), h("span", "tbh-plus", "+"), partLabel(d, combo.parts[1], loadout)));
      for (const p of combo.parts) {
        const via = missingPath(d, p, loadout);
        if (via !== undefined)
          row.append(via);
      }
      body.append(row);
    }
    panel.replaceChildren(header(panel, `${ready} ready / ${list.length}`), body);
  }
  function renderProblem(panel, message) {
    panel.replaceChildren(header(panel, "offline"), h("div", "tbh-stale", message));
  }
  function offerKey(card) {
    const tip = card.dataset.tip ?? "";
    const offer = tip.match(/^(weapon|passive)-offer:([a-z0-9-]+):(\d+)$/);
    if (offer)
      return { key: `${offer[1]}:${offer[2]}`, level: Number(offer[3]) };
    const item = tip.match(/^item:([a-z0-9-]+)$/);
    if (item)
      return { key: `item:${item[1]}`, level: 1 };
    return;
  }
  function annotateCard(card, d, version, loadout) {
    const offer = offerKey(card);
    if (offer === undefined)
      return;
    const signature = `${offer.key}|${[...loadout].join(",")}|${discovery.version}|${version}`;
    if (card.dataset.tbh === signature)
      return;
    card.dataset.tbh = signature;
    card.querySelector(".tbh-card")?.remove();
    card.classList.remove("tbh-card-new", "tbh-card-evo");
    const isNew = discovery.isNew(offer.key);
    const after = new Map(loadout);
    after.set(offer.key, offer.key.startsWith("item:") ? (loadout.get(offer.key) ?? 0) + 1 : offer.level);
    const uses = combosUsing(d.combos, offer.key).filter((c) => !loadout.has(c.result));
    const matches = uses.filter((c) => loadout.has(partner(c, offer.key).key));
    const shown = isNew ? uses : matches;
    const opensUnknown = matches.some((c) => !discovery.made(c.result));
    if (isNew)
      card.classList.add("tbh-card-new");
    if (opensUnknown)
      card.classList.add("tbh-card-evo");
    if (!isNew && shown.length === 0)
      return;
    const box = h("div", "tbh-card");
    if (isNew)
      box.append(h("span", "tbh-badge tbh-badge-new", "UNSEEN"));
    for (const combo of shown.sort((a, b) => Number(matches.includes(b)) - Number(matches.includes(a)))) {
      const readyAfter = comboProgress(combo, after, d.catalog).every((s) => s === "done");
      box.append(h("div", `tbh-line${matches.includes(combo) ? " tbh-match" : ""}`, h("span", "tbh-plus", "+"), partLabel(d, partner(combo, offer.key), loadout), h("span", "tbh-arrow", "→"), resultLabel(d, combo), ...readyAfter ? [h("span", "tbh-kind tbh-ready-tag", "READY")] : []));
    }
    (card.querySelector(".ui-card-text") ?? card).append(box);
  }
  function mount() {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);
    const panel = h("div", "tbh-panel");
    panel.id = "tibo-helper";
    if (window.innerWidth < 700)
      panel.classList.add("tbh-collapsed");
    document.body.append(panel);
    return panel;
  }
  function start() {
    const panel = mount();
    let panelSignature = "";
    let queued = false;
    let version = 0;
    let lastData;
    const update = () => {
      queued = false;
      const hud = document.querySelector(".hud-weapons");
      const game = link.game;
      panel.hidden = game === undefined || game.state.over || hud === null || !isShown(hud);
      if (panel.hidden || game === undefined)
        return;
      const cards = [...document.querySelectorAll(".ui-card[data-tip]")];
      const offered = cards.map(offerKey).filter((o) => o !== undefined);
      panel.classList.toggle("tbh-choice", offered.length > 0);
      if (offered.length === 0)
        panel.classList.remove("tbh-peek");
      const d = currentData();
      if (d === undefined) {
        const problem = link.error === undefined ? "Reading the game's content..." : `Can't read the game's content: ${link.error}. The game changed; tibobit needs an update.`;
        if (panelSignature !== problem)
          renderProblem(panel, problem);
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
      for (const card of cards)
        annotateCard(card, d, version, loadout);
    };
    const schedule = () => {
      if (queued)
        return;
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
  if (document.body === null)
    document.addEventListener("DOMContentLoaded", start, { once: true });
  else
    start();
})();
