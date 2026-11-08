// ==UserScript==
// @name         tibo.dog combo helper
// @namespace    https://github.com/smirea/tibobit
// @version      1.15.0
// @description  Lists the evolutions your current loadout can reach, annotates level-up cards, and lets a local agent server read and drive the game.
// @match        https://tibo.dog/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      127.0.0.1
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
    const descriptions = {};
    const maxLevel = {};
    const name = (kind, id) => {
      names[`${kind}:${id}`] = messages[`content.${kind}.${id}.name`]?.[0] ?? titleCase(id);
      const description = messages[`content.${kind}.${id}.desc`]?.[0];
      if (description !== undefined)
        descriptions[`${kind}:${id}`] = description;
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
    return { names, descriptions, maxLevel, recipes };
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
  function unpaired(combos, loadout) {
    const out = [];
    for (const held of loadout.keys()) {
      const options = combosUsing(combos, held).filter((c) => !loadout.has(c.result)).map((combo) => ({ partner: partner(combo, held), combo }));
      if (options.length === 0 || options.some((o) => loadout.has(o.partner.key)))
        continue;
      out.push({ held, options });
    }
    return out;
  }
  function idOf(key) {
    return key.slice(key.indexOf(":") + 1);
  }
  function nameOf(catalog, key) {
    return catalog.names[key] ?? titleCase(idOf(key));
  }

  // src/agent/encyclopedia.ts
  function plain(value) {
    return JSON.parse(JSON.stringify(value, (_k, v) => v instanceof Map ? Object.fromEntries(v) : v instanceof Set ? [...v] : v));
  }
  function encyclopedia(link) {
    const table = link.table;
    if (table === undefined || !link.ready)
      return;
    const catalog = buildCatalog(table, link.messages);
    const text = (kind, id) => ({
      name: link.message(`content.${kind}.${id}.name`) ?? id,
      ...link.message(`content.${kind}.${id}.desc`) === undefined ? {} : { description: link.message(`content.${kind}.${id}.desc`) }
    });
    const withText = (kind, defs) => defs.map((d) => ({ ...text(kind, d.id), ...plain(d) }));
    const maxLevel = (key) => catalog.maxLevel[key];
    return {
      capturedAt: Date.now(),
      weapons: table.allWeapons.map((w) => ({ ...text("weapon", w.id), maxLevel: maxLevel(`weapon:${w.id}`) ?? 1, ...plain(w) })),
      passives: withText("passive", table.passives),
      items: withText("item", table.allItems),
      recipes: catalog.recipes.map(toCombo).map((c) => ({
        kind: c.recipe.kind,
        result: c.result,
        name: nameOf(catalog, c.result),
        parts: c.parts.map((p) => ({ ...p, name: nameOf(catalog, p.key) }))
      })),
      enemies: withText("enemy", table.enemies),
      bosses: table.bossIds.map((id) => ({ id, ...text("boss", id), title: link.message(`content.boss.${id}.title`) })),
      pois: Object.keys(link.messages).map((k) => k.match(/^content\.poi\.([^.]+)\.name$/)?.[1]).filter((kind) => kind !== undefined).map((kind) => ({ kind, ...text("poi", kind) })),
      biomes: withText("biome", table.biomes)
    };
  }

  // src/agent/protocol.ts
  var BRIDGE_PORT = 7357;
  var bridgeOrigin = (port) => `http://127.0.0.1:${port}`;
  var BRIDGE_ORIGIN = bridgeOrigin(BRIDGE_PORT);
  function validPort(port) {
    return Number.isInteger(port) && port >= 1 && port <= 65535;
  }
  var DIRECTIONS = ["right", "down-right", "down", "down-left", "left", "up-left", "up", "up-right"];
  function fail(message) {
    throw new Error(message);
  }
  function num(v, what) {
    return typeof v === "number" && Number.isFinite(v) ? v : fail(`${what} must be a number`);
  }
  function heading(v, what) {
    if (typeof v === "number" && Number.isFinite(v))
      return v;
    if (typeof v === "string" && DIRECTIONS.includes(v))
      return v;
    return fail(`${what} must be one of ${DIRECTIONS.join(", ")} or degrees`);
  }
  function target(v) {
    const t = v ?? {};
    if ("poi" in t)
      return { poi: num(t.poi, "to.poi") };
    if ("pickup" in t)
      return { pickup: num(t.pickup, "to.pickup") };
    if ("dx" in t || "dy" in t)
      return { dx: num(t.dx, "to.dx"), dy: num(t.dy, "to.dy") };
    if ("x" in t || "y" in t)
      return { x: num(t.x, "to.x"), y: num(t.y, "to.y") };
    return fail("to must be {x,y}, {dx,dy}, {poi} or {pickup}");
  }
  function parseCommand(input) {
    const c = input ?? {};
    switch (c.type) {
      case "move":
        return {
          type: "move",
          dir: heading(c.dir, "dir"),
          ...c.seconds === undefined ? {} : { seconds: num(c.seconds, "seconds") },
          ...c.pause === true ? { pause: true } : {}
        };
      case "goto": {
        const stay = c.stay === undefined || c.stay === "done" ? c.stay : num(c.stay, "stay");
        const to = target(c.to);
        if (stay === "done" && !("poi" in to) && !("pickup" in to))
          fail('stay "done" needs a {poi} or {pickup} target');
        return {
          type: "goto",
          to,
          ...c.within === undefined ? {} : { within: num(c.within, "within") },
          ...stay === undefined ? {} : { stay },
          ...c.timeout === undefined ? {} : { timeout: num(c.timeout, "timeout") },
          ...c.pause === true ? { pause: true } : {}
        };
      }
      case "choose":
        return { type: "choose", index: num(c.index, "index") };
      case "speed": {
        const factor = num(c.factor, "factor");
        if (!Number.isInteger(factor) || factor < 1 || factor > 8)
          fail("factor must be a whole number from 1 to 8");
        return { type: "speed", factor };
      }
      case "forecast":
        if (typeof c.live !== "boolean")
          fail("live must be true or false");
        return { type: "forecast", live: c.live };
      case "dash":
        return c.dir === undefined ? { type: "dash" } : { type: "dash", dir: heading(c.dir, "dir") };
      case "start": {
        const d = c.difficulty;
        if (d !== undefined && d !== "easy" && d !== "normal" && d !== "hard" && d !== "nightmare" && d !== "highest")
          fail("difficulty must be easy, normal, hard, nightmare or highest");
        const m = c.mode;
        if (m !== undefined && m !== "openWorld" && m !== "daily")
          fail("mode must be openWorld or daily");
        const w = c.weapon;
        if (w !== undefined && (typeof w !== "string" || !/^[a-z0-9-]+$/.test(w)))
          fail("weapon must be a weapon id such as deep-fryer");
        return { type: "start", ...m === undefined ? {} : { mode: m }, ...d === undefined ? {} : { difficulty: d }, ...w === undefined ? {} : { weapon: w } };
      }
      case "stop":
      case "pause":
      case "resume":
      case "summary":
        return { type: c.type };
      default:
        return fail("type must be move, goto, stop, choose, dash, pause, resume, speed, forecast, start or summary");
    }
  }
  var DEFAULT_PACE = { planEvery: 5, actEvery: 0.3 };
  var PACE_LIMITS = { planEvery: { min: 0.5, max: 300, step: 0.5 }, actEvery: { min: 0.1, max: 5, step: 0.1 } };
  var DEFAULT_SETTINGS = { pace: DEFAULT_PACE, incognito: false };
  function parsePilotChange(input) {
    const c = input ?? {};
    const change = {};
    for (const key of ["on", "incognito"]) {
      if (c[key] === undefined)
        continue;
      if (typeof c[key] !== "boolean")
        fail(`${key} must be true or false`);
      change[key] = c[key];
    }
    for (const key of ["planEvery", "actEvery"]) {
      if (c[key] === undefined)
        continue;
      const { min, max, step } = PACE_LIMITS[key];
      const v = num(c[key], key);
      if (v < min || v > max)
        fail(`${key} must be from ${min} to ${max} seconds`);
      change[key] = Number((Math.round(v / step) * step).toFixed(1));
    }
    if (Object.keys(change).length === 0)
      fail('send {"on": true|false}, {"incognito": true|false}, {"planEvery": seconds} or {"actEvery": seconds}');
    return change;
  }
  var ACTION_TAGS = [
    ...["Loot", "Wander", "Run", "Gems", "Eat", "Hunt", "Spot"],
    ...["Pet", "Kennel", "Crate", "Shrine", "Curse", "Golden", "Farm", "Shop", "Microwave", "Nest", "Lair", "Bot", "Whetstone", "Bell", "Slots", "Vault", "Magnet", "Tunnel", "Light", "Freezer", "Fryer"],
    ...["Dash", "Start", "Take over", "Over", "Stopped", "Incognito"]
  ];
  var KEEP_PLANS = 500;
  var KEEP_OTHERS = 400;
  function trimChat(chat) {
    let plans = 0;
    let others = 0;
    for (let i = chat.length - 1;i >= 0; i--) {
      const keep = chat[i]?.role === "planner" ? ++plans <= KEEP_PLANS : ++others <= KEEP_OTHERS;
      if (!keep)
        chat.splice(i, 1);
    }
  }

  // src/data.ts
  var data;
  var dataFrom;
  function liveData(link) {
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

  // src/agent/menu.ts
  function button(label) {
    return [...document.querySelectorAll("button")].find((b) => {
      if (b.closest("#tibo-helper, [class*='tbh-']"))
        return false;
      const text = b.textContent?.trim() ?? "";
      return typeof label === "string" ? text === label : label.test(text);
    });
  }
  function modeScreen() {
    if (button("Start") === undefined)
      return;
    return button("Leaderboard") === undefined ? "openWorld" : "daily";
  }

  // src/agent/snapshot.ts
  var NEAREST = 10;
  var TICKS_PER_SECOND = 60;
  var HAZARD_RANGE = 600;
  var MAX_POIS = 15;
  var SECTOR_RANGE = 300;
  var PATH_AHEAD = 60;
  var HURT_WINDOW_TICKS = 180;
  var FORECAST_SECONDS = 0.6;
  var SIM_FORECAST_TICKS = 60;
  var XP_RANGE = 120;
  var hurtHistory = [];
  function recentHurt(s) {
    const totals = new Map(s.run.damageTakenBySource);
    if (hurtHistory.length > 0 && (hurtHistory.at(-1)?.tick ?? 0) > s.tick)
      hurtHistory = [];
    hurtHistory.push({ tick: s.tick, totals });
    while (hurtHistory.length > 1 && (hurtHistory[1]?.tick ?? 0) <= s.tick - HURT_WINDOW_TICKS)
      hurtHistory.shift();
    const before = hurtHistory[0]?.totals ?? new Map;
    const out = {};
    for (const [source, total] of totals) {
      const delta = total - (before.get(source) ?? 0);
      if (delta >= 0.5)
        out[source] = round(delta);
    }
    return out;
  }
  function byDamage(m) {
    return Object.fromEntries([...m].sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, Math.round(v * 10) / 10]));
  }
  function directionOf(dx, dy) {
    const octant = Math.round(Math.atan2(dy, dx) / (Math.PI / 4));
    return DIRECTIONS[(octant + 8) % 8] ?? "right";
  }
  var round = (n) => Math.round(n * 10) / 10;
  function totals(run) {
    return {
      kills: run.kills,
      damageTaken: byDamage(run.damageTakenBySource),
      damageDealt: byDamage(run.damageBySource),
      killsBy: byDamage(run.killsBySource),
      goldEarned: Math.floor(run.goldEarned),
      goldSpent: Math.floor(run.goldSpent),
      bossesKilled: run.bossesKilled,
      elitesKilled: run.elitesKilled,
      bossChests: run.bossChests,
      cratesBought: run.paidChests,
      shrinesUsed: run.shrinesUsed,
      itemsBought: run.itemsBought,
      made: [...run.evolutions, ...run.unions, ...run.itemEvolutions],
      revivesUsed: run.revivesUsed,
      won: run.won,
      ...run.killer === "" ? {} : { killer: run.killer }
    };
  }
  function statValues(stats) {
    const out = {};
    for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(stats))) {
      const value = stats[key];
      if (typeof value === "number")
        out[key] = Math.round(value * 1000) / 1000;
    }
    return out;
  }
  function buffs(s) {
    const left = (until) => round(until - s.time);
    const out = [];
    if (s.goldRushUntil > s.time)
      out.push({ id: "goldRush", endsIn: left(s.goldRushUntil), mult: s.goldRushMult });
    if (s.frenzyUntil > s.time)
      out.push({ id: "frenzy", endsIn: left(s.frenzyUntil) });
    const more = s.moreVariety;
    if (more !== undefined && more.fryRushUntil > s.time)
      out.push({ id: "fryRush", endsIn: left(more.fryRushUntil), mult: more.fireRate });
    if (more !== undefined && more.picnicUntil > s.time)
      out.push({ id: "picnic", endsIn: left(more.picnicUntil) });
    return out;
  }
  function hudScore() {
    const text = document.querySelector(".hud-score-value")?.textContent?.replace(/[^\d]/g, "");
    return text === undefined || text === "" ? undefined : Number(text);
  }
  function difficultyOf(s) {
    return s.difficulty === "nightmare" ? `nightmare-${s.cfg.ladder.level}` : s.difficulty;
  }
  function relTo(state, x, y) {
    const me = state.me;
    const dx = x - (state.player.x[me] ?? 0);
    const dy = y - (state.player.y[me] ?? 0);
    return {
      x: round(x),
      y: round(y),
      dx: round(dx),
      dy: round(dy),
      dist: round(Math.hypot(dx, dy)),
      dir: directionOf(dx, dy),
      onScreen: Math.abs(dx) <= state.view.width / 2 && Math.abs(dy) <= state.view.height / 2
    };
  }
  function* alive(p) {
    for (let n = 0;n < p.pool.count; n++) {
      const slot = p.pool.slotAt(n);
      if (slot >= 0 && p.pool.isAlive(slot))
        yield slot;
    }
  }
  function nearest(rows, n = NEAREST) {
    return rows.sort((a, b) => a.dist - b.dist).slice(0, n);
  }
  function comboView(d, discovery, combo, loadout) {
    const states = comboProgress(combo, loadout, d.catalog);
    return {
      result: combo.result,
      name: nameOf(d.catalog, combo.result),
      kind: combo.recipe.kind,
      ready: states.every((s) => s === "done"),
      made: discovery.made(combo.result),
      parts: combo.parts.map((p) => {
        const have = loadout.get(p.key);
        const max = d.catalog.maxLevel[p.key];
        return {
          key: p.key,
          name: nameOf(d.catalog, p.key),
          need: p.need,
          state: partState(p, loadout, d.catalog),
          ...have === undefined ? {} : { have },
          ...max === undefined ? {} : { max }
        };
      })
    };
  }
  function offerKey(tip) {
    const offer = tip.match(/^(weapon|passive)-offer:([a-z0-9-]+):(\d+)$/);
    if (offer)
      return { key: `${offer[1]}:${offer[2]}`, level: Number(offer[3]) };
    const item = tip.match(/^item:([a-z0-9-]+)$/);
    if (item)
      return { key: `item:${item[1]}`, level: 1 };
    return;
  }
  function pauseMenuOpen() {
    return [...document.querySelectorAll("button")].some((b) => !b.closest("#tibo-helper") && b.textContent?.trim() === "Resume" && b.getClientRects().length > 0);
  }
  function choiceCards() {
    const cards = [...document.querySelectorAll("button.ui-card, .ui-card[data-tip]")];
    const buttons = [...document.querySelectorAll("button")].filter((b) => !b.matches(".ui-card, .ui-pause-btn, .ui-sound") && !b.closest("#tibo-helper") && b.getClientRects().length > 0 && (b.textContent ?? "").trim() !== "" && !/^banish/i.test((b.textContent ?? "").trim()));
    return [...cards, ...buttons];
  }
  var RECOMMENDED_LINE = /(^|\n)★?\s*RECOMMENDED(?=\n|$)/;
  function options(d, discovery, loadout, banished) {
    return choiceCards().map((card, index) => {
      const tip = card.dataset.tip ?? "";
      const text = card.innerText.replace(/[\u2068\u2069]/g, "");
      const recommended = card.querySelector(".ui-pick-badge") !== null || RECOMMENDED_LINE.test(text);
      const label = text.replace(RECOMMENDED_LINE, "").replace(/\n+/g, " | ").trim();
      const offer = offerKey(tip);
      const available = !(card instanceof HTMLButtonElement && card.disabled);
      if (offer === undefined)
        return { index, type: "other", id: tip, name: label, label, available, recommended, unseen: false, combos: [] };
      const after = new Map(loadout);
      after.set(offer.key, offer.key.startsWith("item:") ? (loadout.get(offer.key) ?? 0) + 1 : offer.level);
      const held = (c) => loadout.has(partner(c, offer.key).key);
      const uses = combosUsing(d.combos, offer.key).filter((c) => !loadout.has(c.result)).sort((a, b) => Number(held(b)) - Number(held(a)));
      const [type = "", id = ""] = offer.key.split(":");
      return {
        index,
        type,
        id,
        name: nameOf(d.catalog, offer.key),
        label,
        available,
        ...type === "item" ? {} : { level: offer.level },
        recommended,
        unseen: discovery.isNew(offer.key),
        combos: uses.map((c) => {
          const other = partner(c, offer.key).key;
          return {
            ...comboView(d, discovery, c, after),
            partner: { key: other, name: nameOf(d.catalog, other) },
            partnerHeld: held(c),
            partnerBanished: banished.has(idOf(other))
          };
        })
      };
    });
  }
  function toJson(value) {
    try {
      return JSON.parse(JSON.stringify(value, (_k, v) => v instanceof Map ? Object.fromEntries(v) : v instanceof Set ? [...v] : v));
    } catch {
      return;
    }
  }
  var forecastCache;
  var LIVE_FORECAST_TICKS = 12;
  function simForecast(link, game) {
    const s = game.state;
    if (link.forecast === undefined || s.over || s.choiceQueue.length > 0 || !(s.paused || link.liveForecast))
      return;
    const cached = forecastCache?.game === game ? forecastCache : undefined;
    if (cached !== undefined && (cached.tick === s.tick || !s.paused && s.tick > cached.tick && s.tick - cached.tick < LIVE_FORECAST_TICKS))
      return cached.outlook;
    const inputs = [...DIRECTIONS.map((_, i) => ({ x: Math.cos(i * Math.PI / 4), y: Math.sin(i * Math.PI / 4) })), { x: 0, y: 0 }];
    const outlook = link.forecast(game, inputs, SIM_FORECAST_TICKS).map((f) => ({
      seconds: SIM_FORECAST_TICKS / 60,
      damage: round(f.damage),
      dead: f.dead,
      sources: Object.entries(f.bySource).sort((a, b) => b[1] - a[1]).map(([source, damage]) => ({ source, damage: round(damage) }))
    }));
    forecastCache = { game, tick: s.tick, outlook };
    return outlook;
  }
  function runView(link, game, discovery, d) {
    const s = game.state;
    const { table, enums } = link;
    if (table === undefined || enums === undefined)
      throw new Error("game content not loaded");
    const loadout = readLoadout(s);
    const me = s.me;
    const msg = (kind, id) => link.message(`content.${kind}.${id}.name`) ?? id;
    const owned = (key, level) => ({ id: idOf(key), name: nameOf(d.catalog, key), level, max: d.catalog.maxLevel[key] ?? 1 });
    const enemies = [];
    for (const i of alive(s.enemies)) {
      const flags = s.enemies.flags[i] ?? 0;
      if (flags & (enums.enemyFlags.Hidden ?? 0))
        continue;
      const def = table.enemyAt(s.enemies.def[i] ?? 0);
      const id = def?.id ?? "unknown";
      enemies.push({
        ...relTo(s, s.enemies.x[i] ?? 0, s.enemies.y[i] ?? 0),
        uid: s.enemies.pool.id(i),
        id,
        name: msg("enemy", id),
        hp: round(s.enemies.hp[i] ?? 0),
        maxHp: round(s.enemies.maxHp[i] ?? 0),
        damage: round(s.enemies.damage[i] ?? 0),
        radius: s.enemies.radius[i] ?? 0,
        speed: def?.speed ?? 0,
        elite: (flags & (enums.enemyFlags.Elite ?? 0)) !== 0
      });
    }
    const bosses = [];
    for (const i of alive(s.bosses)) {
      const id = table.bossIdAt(s.bosses.def[i] ?? 0) ?? "unknown";
      bosses.push({
        ...relTo(s, s.bosses.x[i] ?? 0, s.bosses.y[i] ?? 0),
        id,
        name: msg("boss", id),
        hp: round(s.bosses.hp[i] ?? 0),
        maxHp: round(s.bosses.maxHp[i] ?? 0),
        damage: round(s.bosses.damage[i] ?? 0),
        speed: round(s.bosses.speed[i] ?? 0),
        radius: s.bosses.radius[i] ?? 0
      });
    }
    const activation = s.cfg.activation.seconds;
    const counts = {};
    const chests = [];
    const gems = [];
    const loose = [];
    for (const i of alive(s.pickups)) {
      const kind = enums.pickupKinds[s.pickups.kind[i] ?? -1] ?? "unknown";
      counts[kind] = (counts[kind] ?? 0) + 1;
      if (kind === "xp") {
        const rel = relTo(s, s.pickups.x[i] ?? 0, s.pickups.y[i] ?? 0);
        if (rel.dist <= XP_RANGE)
          gems.push(rel);
        continue;
      }
      const needed = activation[kind];
      const view = {
        ...relTo(s, s.pickups.x[i] ?? 0, s.pickups.y[i] ?? 0),
        uid: s.pickups.pool.id(i),
        kind,
        value: round(s.pickups.value[i] ?? 0),
        ...needed === undefined ? {} : { charge: round((s.pickups.charge[i] ?? 0) / TICKS_PER_SECOND), chargeNeeded: needed }
      };
      (kind === "chest" ? chests : loose).push(view);
    }
    const economy = s.cfg.economy;
    const bought = s.paidChestsBought ?? 0;
    const cratePrice = economy === undefined ? undefined : Math.round(Math.round(economy.chestPriceBase + economy.chestPriceLinear * bought + economy.chestPriceQuad * bought * bought + economy.chestPriceCubic * Math.max(0, bought - economy.chestPriceKnee) ** 3) * (s.loadout.stats.chestPriceMult ?? 1));
    const spot = (p) => {
      const variant = p.varietyPlace ?? p.variant?.kind;
      if (p.kind !== "bigUpdate" || variant === undefined)
        return { name: msg("poi", p.kind), description: link.message(`content.poi.${p.kind}.desc`) ?? "" };
      const key = variant.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`);
      return { variant, name: msg("varietyPlace", key), description: link.message(`content.varietyPlace.${key}.desc`) ?? "" };
    };
    const pois = s.world.activePois.filter((p) => !p.state.used && p.state.goneAt < 0).map((p) => {
      const rel = relTo(s, p.x, p.y);
      return {
        ...rel,
        uid: p.state.uid,
        kind: p.kind,
        ...spot(p),
        radius: p.radius,
        inside: rel.dist <= p.radius,
        charge: round(p.state.charge / TICKS_PER_SECOND),
        chargeNeeded: p.kind === "bigUpdate" ? p.varietyPlace === undefined ? 1.5 : 0 : activation[p.kind] ?? 0,
        used: p.state.used,
        ...p.kind === "paidChest" && cratePrice !== undefined ? { price: cratePrice } : {},
        ...p.kind === "vendor" && economy?.vendorPrice !== undefined ? { prices: economy.vendorPrice } : {}
      };
    }).sort((a, b) => a.dist - b.dist).slice(0, MAX_POIS);
    const zoneKind = Object.fromEntries(Object.entries(enums.zoneKinds).map(([k, v]) => [v, k]));
    const zoneShape = Object.fromEntries(Object.entries(enums.zoneShapes).map(([k, v]) => [v, k]));
    const px = s.player.x[me] ?? 0;
    const py = s.player.y[me] ?? 0;
    const inPool = link.inPool;
    const areas = [];
    for (const h of s.world.activeHazards) {
      const rel = relTo(s, h.x, h.y);
      if (rel.dist - h.radius > HAZARD_RANGE)
        continue;
      const cx = h.x - px;
      const cy = h.y - py;
      const contains = (x, y) => inPool === undefined ? Math.hypot(x - cx, y - cy) <= h.radius : inPool(h.poolShape, h.turn, x - cx, y - cy, h.radius, 0);
      areas.push({
        view: { ...rel, kind: h.kind, source: "terrain", shape: "pool", radius: round(h.radius), inside: contains(0, 0) },
        contains
      });
    }
    for (const i of alive(s.zones)) {
      if (s.zones.hostile[i] !== 1)
        continue;
      const radius = s.zones.radius[i] ?? 0;
      const shape = zoneShape[s.zones.shape[i] ?? 0] ?? "circle";
      const ax = (s.zones.x[i] ?? 0) - px;
      const ay = (s.zones.y[i] ?? 0) - py;
      const kind = zoneKind[s.zones.kind[i] ?? -1] ?? "unknown";
      const poolShape = s.zones.poolShape[i] ?? 0;
      const turn = s.zones.turn[i] ?? 0;
      let contains = (x, y) => poolShape !== 0 && inPool !== undefined ? inPool(poolShape, turn, x - ax, y - ay, radius, 0) : Math.hypot(x - ax, y - ay) <= radius;
      let nearest = { x: ax, y: ay };
      if (shape === "line") {
        const angle = s.zones.angle[i] ?? 0;
        const length = s.zones.length[i] ?? 0;
        const ux = Math.cos(angle);
        const uy = Math.sin(angle);
        const closestOnLine = (x, y) => {
          const t = Math.max(0, Math.min(length, (x - ax) * ux + (y - ay) * uy));
          return { x: ax + ux * t, y: ay + uy * t };
        };
        contains = (x, y) => {
          const c = closestOnLine(x, y);
          return Math.hypot(x - c.x, y - c.y) <= radius;
        };
        nearest = closestOnLine(0, 0);
      }
      const rel = relTo(s, px + nearest.x, py + nearest.y);
      if (rel.dist - radius > HAZARD_RANGE)
        continue;
      const delay = s.zones.delay[i] ?? 0;
      areas.push({
        view: { ...rel, kind, source: "attack", shape, radius: round(radius), inside: contains(0, 0), ...kind === "telegraph" ? { landsIn: round(delay) } : {} },
        contains
      });
    }
    const hazards = areas.map((a) => a.view);
    const bullets = [];
    for (const i of alive(s.bullets))
      bullets.push({ ...relTo(s, s.bullets.x[i] ?? 0, s.bullets.y[i] ?? 0), radius: s.bullets.radius[i] ?? 0, vx: round(s.bullets.vx[i] ?? 0), vy: round(s.bullets.vy[i] ?? 0) });
    const speed = s.cfg.player.baseSpeed * s.loadout.stats.moveSpeedMult;
    const playerRadius = s.player.radius[me] ?? 6;
    const hitsWalking = (ux, uy) => {
      let hits = 0;
      for (const b of bullets) {
        if (b.dist > 200)
          continue;
        for (let t = 0;t <= FORECAST_SECONDS; t += 0.05) {
          const gap = Math.hypot(b.dx + b.vx * t - ux * speed * t, b.dy + b.vy * t - uy * speed * t);
          if (gap <= playerRadius + b.radius) {
            hits++;
            break;
          }
        }
      }
      return hits;
    };
    const touchesWalking = (ux, uy) => {
      let touches = 0;
      for (const e of enemies) {
        if (e.dist > (speed + e.speed) * FORECAST_SECONDS + playerRadius + e.radius)
          continue;
        let ex = e.dx;
        let ey = e.dy;
        for (let t = 0;t <= FORECAST_SECONDS; t += 0.05) {
          const gx = ux * speed * t - ex;
          const gy = uy * speed * t - ey;
          const gap = Math.hypot(gx, gy);
          if (gap <= playerRadius + e.radius) {
            touches++;
            break;
          }
          ex += gx / gap * e.speed * 0.05;
          ey += gy / gap * e.speed * 0.05;
        }
      }
      return touches;
    };
    const volleys = [];
    for (const i of alive(s.emitters)) {
      const rel = relTo(s, s.emitters.x[i] ?? 0, s.emitters.y[i] ?? 0);
      if (rel.dist > HAZARD_RANGE)
        continue;
      volleys.push({
        ...rel,
        firesIn: round(s.emitters.telegraph[i] ?? 0),
        count: s.emitters.count[i] ?? 0,
        bursts: s.emitters.burstsLeft[i] ?? 0,
        speed: round(s.emitters.speed[i] ?? 0),
        damage: round(s.emitters.damage[i] ?? 0)
      });
    }
    const pets = [];
    for (const i of alive(s.pets)) {
      const id = table.dogAt(s.pets.breed[i] ?? 0).id;
      pets.push({ ...relTo(s, s.pets.x[i] ?? 0, s.pets.y[i] ?? 0), id, name: msg("dog", id), level: s.pets.level[i] ?? 1 });
    }
    const botMode = Object.fromEntries(Object.entries(enums.botModes).map(([k, v]) => [v, k]));
    const helpers = [];
    for (const i of alive(s.grokBots)) {
      const help = table.botHelpAt(s.grokBots.help[i] ?? 0).id;
      helpers.push({
        ...relTo(s, s.grokBots.x[i] ?? 0, s.grokBots.y[i] ?? 0),
        help,
        name: msg("botHelp", help),
        description: link.message(`content.botHelp.${help}.desc`) ?? "",
        mode: botMode[s.grokBots.mode[i] ?? 0] ?? "unknown",
        leavesIn: round(s.grokBots.timer[i] ?? 0)
      });
    }
    const visitors = [];
    for (const [who, pool] of [["poteto", s.visitor], ["andrew", s.andrew], ["samir", s.samir]])
      for (const i of alive(pool))
        visitors.push({ ...relTo(s, pool.x[i] ?? 0, pool.y[i] ?? 0), who });
    const events = link.events.map((e) => {
      const view = toJson(e);
      if ((e.type === "bossSpawn" || e.type === "bossDefeated") && typeof e.id === "string")
        return { ...view, name: msg("boss", e.id) };
      const said = e.announcement;
      if (e.type === "announce" && said?.kind === "event" && said.event !== undefined)
        return { ...view, name: msg("event", said.event), ...link.message(`content.event.${said.event}.announce`) === undefined ? {} : { text: link.message(`content.event.${said.event}.announce`) } };
      return view;
    });
    const minute = Math.floor(s.runClock / 60);
    const schedule = s.waves.rows.filter((w) => w.minute >= minute && (w.boss !== undefined || w.elite === true || (w.events?.length ?? 0) > 0)).map((w) => ({
      minute: w.minute,
      ...w.boss === undefined ? {} : { boss: { id: w.boss, name: msg("boss", w.boss) } },
      elite: w.elite === true,
      events: (w.events ?? []).map((id) => ({ id, name: msg("event", id) }))
    }));
    const stats = s.loadout.stats;
    const dashMax = s.cfg.dash.charges + stats.dashCharges;
    const dashCharges = s.player.dashCharges[me] ?? 0;
    const landmark = s.currentLandmark;
    const score = hudScore();
    const outlook = simForecast(link, game);
    const choice = s.choiceQueue[0];
    const sectors = DIRECTIONS.map((dir, i) => {
      const angle = i * Math.PI / 4;
      const ux = Math.cos(angle);
      const uy = Math.sin(angle);
      const within = (rows) => rows.filter((r) => r.dir === dir);
      const closest = (rows) => {
        const d = Math.min(...within(rows).map((r) => r.dist), Number.POSITIVE_INFINITY);
        return d <= SECTOR_RANGE ? round(d) : null;
      };
      const path = [0.25, 0.5, 0.75, 1].map((f) => ({ x: ux * PATH_AHEAD * f, y: uy * PATH_AHEAD * f }));
      const crosses = (a) => path.some((p) => a.contains(p.x, p.y));
      const end = { x: ux * PATH_AHEAD, y: uy * PATH_AHEAD };
      const holding = areas.filter((a) => a.view.inside);
      return {
        dir,
        enemiesNear: within(enemies).filter((e) => e.dist <= 60).length,
        enemiesFar: within(enemies).filter((e) => e.dist <= 150).length,
        nearestEnemy: closest(enemies),
        nearestBoss: closest(bosses),
        nearestBullet: closest(bullets),
        bulletsNear: within(bullets).filter((b) => b.dist <= 60).length,
        hazard: areas.find((a) => !a.view.inside && crosses(a))?.view.kind ?? null,
        leavesHazard: holding.length > 0 && holding.every((a) => !a.contains(end.x, end.y)),
        clearOfAttacks: areas.every((a) => a.view.source !== "attack" || !a.contains(end.x, end.y)),
        bulletHits: hitsWalking(ux, uy),
        enemyTouches: touchesWalking(ux, uy),
        ...outlook === undefined ? {} : { forecast: outlook[i] },
        xpNear: within(gems).length
      };
    });
    return {
      seed: String(s.run.seed),
      daily: s.daily !== undefined,
      difficulty: difficultyOf(s),
      tick: s.tick,
      time: round(s.runClock),
      winAt: s.cfg.win.timeSec,
      ...score === undefined ? {} : { score },
      ...s.daily === undefined ? {} : { weather: { id: s.daily.weather, name: msg("dailyWeather", s.daily.weather), description: link.message(`content.dailyWeather.${s.daily.weather}.desc`) ?? "" } },
      gear: Object.entries(s.daily?.kit ?? {}).map(([slot, g]) => ({
        slot,
        id: g.gear,
        name: msg("gear", g.gear),
        description: link.message(`content.gear.${g.gear}.desc`) ?? "",
        lines: g.lines.map((l) => ({ affix: l.affix, roll: l.roll }))
      })),
      biome: { id: s.currentBiome, name: msg("biome", s.currentBiome) },
      ...landmark === null ? {} : {
        landmark: {
          id: landmark.biome.id,
          name: msg("biome", landmark.biome.id),
          ...landmark.event === undefined ? {} : { event: { id: landmark.event, name: msg("event", landmark.event) } }
        }
      },
      player: {
        x: round(s.player.x[me] ?? 0),
        y: round(s.player.y[me] ?? 0),
        hp: round(s.player.hp[me] ?? 0),
        maxHp: round(s.loadout.stats.maxHp),
        level: s.loadout.level,
        xp: round(s.loadout.xp),
        xpNext: round(s.loadout.xpNext),
        gold: Math.floor(s.loadout.gold),
        dashCharges,
        dashMax,
        dashReadyIn: dashCharges >= dashMax ? 0 : round((s.player.dashCd[me] ?? 0) / TICKS_PER_SECOND),
        invulnerable: (s.player.invuln[me] ?? 0) > 0,
        stunned: round((s.player.stunTicks[me] ?? 0) / TICKS_PER_SECOND),
        frozen: round((s.player.freezeTicks[me] ?? 0) / TICKS_PER_SECOND),
        slowed: round(s.player.slowT[me] ?? 0),
        revivesLeft: Math.max(0, Math.floor(stats.revivals) - s.loadout.revivesUsed),
        rerolls: s.loadout.rerolls,
        skips: s.loadout.skips,
        banishes: s.loadout.banishes,
        curses: s.loadout.cursesTaken,
        hurtBy: recentHurt(s)
      },
      loadout: {
        weapons: s.loadout.weapons.map((w) => owned(`weapon:${w.def.id}`, w.level)),
        passives: s.loadout.passives.map((p) => owned(`passive:${p.def.id}`, p.level)),
        items: [...s.loadout.items].filter(([, n]) => n > 0).map(([id, count]) => ({ id, name: nameOf(d.catalog, `item:${id}`), count })),
        banished: [...s.loadout.banished]
      },
      stats: statValues(stats),
      buffs: buffs(s),
      totals: totals(s.run),
      schedule,
      events,
      combos: relevantCombos(d.combos, loadout).map((c) => comboView(d, discovery, c, loadout)),
      unpaired: unpaired(d.combos, loadout).map((u) => ({
        key: u.held,
        name: nameOf(d.catalog, u.held),
        options: u.options.map((o) => ({
          key: o.partner.key,
          name: nameOf(d.catalog, o.partner.key),
          result: o.combo.result,
          resultName: nameOf(d.catalog, o.combo.result),
          made: discovery.made(o.combo.result),
          banished: s.loadout.banished.has(idOf(o.partner.key))
        }))
      })),
      ...choice === undefined ? {} : { choice: { kind: choice.kind, options: options(d, discovery, loadout, s.loadout.banished), raw: toJson(choice) } },
      bosses: bosses.sort((a, b) => a.dist - b.dist),
      enemies: { total: enemies.length, nearest: nearest(enemies), elites: enemies.filter((e) => e.elite).sort((a, b) => a.dist - b.dist) },
      pickups: { counts, chests: chests.sort((a, b) => a.dist - b.dist), nearest: nearest(loose) },
      pois,
      hazards: nearest(hazards, 20),
      bullets: { total: bullets.length, nearest: nearest(bullets) },
      volleys: nearest(volleys),
      pets,
      helpers,
      visitors,
      standingBulletHits: hitsWalking(0, 0),
      standingEnemyTouches: touchesWalking(0, 0),
      ...outlook === undefined ? {} : { standingForecast: outlook[DIRECTIONS.length] },
      sectors
    };
  }
  function inRun(link) {
    const hud = document.querySelector(".hud-weapons");
    return link.game !== undefined && !link.game.state.over && hud !== null && hud.getClientRects().length > 0;
  }
  function ladderCleared() {
    try {
      const cleared = JSON.parse(localStorage.getItem("tibo.ladder.v1") ?? "{}").cleared;
      return typeof cleared === "number" ? cleared : 0;
    } catch {
      return 0;
    }
  }
  function snapshot(link, discovery, commands) {
    link.noteRunLink();
    const game = link.game;
    const playing = game !== undefined && inRun(link);
    const runMode = game === undefined ? undefined : game.state.daily === undefined ? "openWorld" : "daily";
    const mode = playing ? runMode : modeScreen() ?? runMode;
    const base = {
      capturedAt: Date.now(),
      headless: navigator.webdriver,
      ladderCleared: ladderCleared(),
      commands,
      ...link.error === undefined ? {} : { error: link.error },
      ...link.runLink === undefined ? {} : { lastRunLink: link.runLink },
      ...mode === undefined ? {} : { mode }
    };
    const ended = game?.state.over ? { lastRun: { time: round(game.state.runClock), level: game.state.run.level, ...totals(game.state.run) } } : {};
    if (!playing)
      return { ...base, ...ended, screen: game?.state.over ? "over" : "title" };
    const d = liveData(link);
    if (d === undefined || !link.ready)
      return { ...base, screen: "run", error: link.error ?? "game content not loaded yet" };
    const s = game.state;
    const screen = s.choiceQueue.length > 0 ? "choice" : s.paused || pauseMenuOpen() ? "paused" : "run";
    return { ...base, screen, run: runView(link, game, discovery, d) };
  }

  // src/agent/bridge.ts
  var PORT_KEY = "tibobit.bridgePort";
  var SETTINGS_KEY = "tibobit.pilotSettings";
  function savedSettings() {
    try {
      const c = parsePilotChange(JSON.parse(localStorage.getItem(SETTINGS_KEY) ?? "null"));
      return {
        pace: { planEvery: c.planEvery ?? DEFAULT_SETTINGS.pace.planEvery, actEvery: c.actEvery ?? DEFAULT_SETTINGS.pace.actEvery },
        incognito: c.incognito ?? DEFAULT_SETTINGS.incognito
      };
    } catch {
      return DEFAULT_SETTINGS;
    }
  }
  var asChange = (s) => ({ ...s.pace, incognito: s.incognito });
  function savedPort() {
    try {
      const port = Number(localStorage.getItem(PORT_KEY));
      return validPort(port) ? port : undefined;
    } catch {
      return;
    }
  }
  function initialOrigin() {
    return globalThis.__tiboBridgeOrigin ?? bridgeOrigin(savedPort() ?? BRIDGE_PORT);
  }
  var RUN_INTERVAL_MS = 33;
  var IDLE_INTERVAL_MS = 500;
  var RECONNECT_MS = 3000;
  var MAX_IN_FLIGHT = 4;
  function post(origin, path, body) {
    return new Promise((resolve) => GM_xmlhttpRequest({
      method: "POST",
      url: `${origin}${path}`,
      data: JSON.stringify(body),
      headers: { "content-type": "application/json" },
      timeout: 5000,
      onload: (r) => resolve(r.status < 300),
      onerror: () => resolve(false),
      ontimeout: () => resolve(false)
    }));
  }
  var NOT_GRANTED = typeof GM_xmlhttpRequest === "function" ? undefined : "Tampermonkey did not grant GM_xmlhttpRequest. Add @grant GM_xmlhttpRequest and @connect 127.0.0.1 to the installed script's header.";
  function startBridge(link, discovery, controller) {
    let origin = initialOrigin();
    let session = 0;
    let request;
    let error = NOT_GRANTED;
    let connected = false;
    const listeners = new Set;
    const notify = () => {
      for (const listener of listeners)
        listener();
    };
    let settings = savedSettings();
    let pilot = { state: "off", ...settings };
    const chat = [];
    let inFlight = 0;
    let lastPush = 0;
    let sentEncyclopedia = false;
    const reconnect = (from) => {
      if (from !== session)
        return;
      connected = false;
      receivePilot({ state: "off", ...settings });
      notify();
      setTimeout(listen, RECONNECT_MS);
    };
    const listen = () => {
      const mine = ++session;
      if (NOT_GRANTED !== undefined)
        return;
      request = GM_xmlhttpRequest({
        method: "GET",
        url: `${origin}/bridge/commands`,
        responseType: "stream",
        onloadstart: (r) => {
          const body = r.response;
          if (body === null)
            return reconnect(mine);
          read(body, mine).catch(() => {}).finally(() => reconnect(mine));
        },
        onerror: () => {
          if (mine === session)
            error = `no agent server on ${origin}`;
          notify();
          reconnect(mine);
        }
      });
    };
    const receivePilot = (next) => {
      if (pilot.state !== "off" && next.state === "off")
        controller.release();
      if (pilot.state === "off" && next.state === "on")
        chat.length = 0;
      pilot = next;
    };
    const receiveChat = (message) => {
      const at = chat.findIndex((m) => m.id === message.id);
      if (at >= 0)
        chat[at] = message;
      else
        chat.push(message);
      trimChat(chat);
    };
    const read = async (body, mine) => {
      const reader = body.getReader();
      const decoder = new TextDecoder;
      let buffer = "";
      for (;; ) {
        const { value, done } = await reader.read();
        if (done)
          buffer += `
`;
        else
          buffer += decoder.decode(value, { stream: true });
        for (let nl = buffer.indexOf(`
`);nl >= 0; nl = buffer.indexOf(`
`)) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (line === "")
            continue;
          try {
            const envelope = JSON.parse(line);
            if (mine !== session)
              return;
            if ("hello" in envelope) {
              connected = true;
              error = undefined;
              sentEncyclopedia = false;
              chat.length = 0;
              post(origin, "/pilot", asChange(settings));
              notify();
            } else if ("error" in envelope) {
              error = envelope.error;
              notify();
            } else if ("pilot" in envelope) {
              receivePilot(envelope.pilot);
              notify();
            } else if ("chat" in envelope) {
              receiveChat(envelope.chat);
              notify();
            } else
              controller.handle({ id: envelope.id, command: parseCommand(envelope.command) });
          } catch (e) {
            console.error("[tibobit] bad command from the agent server", line, e);
          }
        }
        if (done)
          return;
      }
    };
    setInterval(() => {
      if (!connected || inFlight >= MAX_IN_FLIGHT)
        return;
      const now = performance.now();
      if (now - lastPush < (inRun(link) ? RUN_INTERVAL_MS : IDLE_INTERVAL_MS))
        return;
      lastPush = now;
      if (!sentEncyclopedia) {
        const book = encyclopedia(link);
        if (book !== undefined) {
          sentEncyclopedia = true;
          post(origin, "/bridge/encyclopedia", book).then((ok) => {
            if (!ok)
              sentEncyclopedia = false;
          });
        }
      }
      let body;
      try {
        body = snapshot(link, discovery, controller.statuses);
      } catch (e) {
        body = { capturedAt: Date.now(), screen: "title", commands: controller.statuses, error: `snapshot failed: ${e instanceof Error ? e.message : String(e)}` };
      }
      inFlight++;
      post(origin, "/bridge/state", body).finally(() => inFlight--);
    }, RUN_INTERVAL_MS / 2);
    listen();
    return {
      status: () => ({ port: Number(new URL(origin).port), state: connected ? "connected" : "connecting", error: connected ? undefined : error }),
      connect: (port) => {
        if (!validPort(port))
          throw new Error(`not a port: ${port}`);
        try {
          localStorage.setItem(PORT_KEY, String(port));
        } catch {}
        origin = bridgeOrigin(port);
        connected = false;
        error = NOT_GRANTED;
        request?.abort();
        listen();
        notify();
      },
      pilot: () => pilot,
      setPilot: (change) => {
        const { on, ...rest } = change;
        if (Object.keys(rest).length > 0) {
          settings = { pace: { planEvery: rest.planEvery ?? settings.pace.planEvery, actEvery: rest.actEvery ?? settings.pace.actEvery }, incognito: rest.incognito ?? settings.incognito };
          pilot = { ...pilot, ...settings };
          try {
            localStorage.setItem(SETTINGS_KEY, JSON.stringify(asChange(settings)));
          } catch {}
          notify();
        }
        if (!connected)
          return;
        post(origin, "/pilot", change).then((ok) => {
          if (ok)
            return;
          pilot = { ...pilot, detail: `the agent server on ${origin} refused ${JSON.stringify(change)}; restart it with this version of scripts/agent-server.ts` };
          notify();
        });
      },
      chat: () => chat,
      onChange: (listener) => listeners.add(listener)
    };
  }

  // src/agent/control.ts
  var TICKS_PER_SECOND2 = 60;
  var STUCK_TICKS = 90;
  var KEEP_STATUSES = 10;
  function vector(dir) {
    const degrees = typeof dir === "number" ? dir : DIRECTIONS.indexOf(dir) * 45;
    const radians = degrees * Math.PI / 180;
    return { x: Math.cos(radians), y: Math.sin(radians) };
  }
  var STILL = { x: 0, y: 0 };
  function wait(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
  async function press(el) {
    el.click();
    await wait(300);
    if (!el.isConnected)
      return;
    el.focus();
    for (const type of ["keydown", "keyup"])
      el.dispatchEvent(new KeyboardEvent(type, { key: "Enter", code: "Enter", bubbles: true }));
  }
  var byTestId = (id) => document.querySelector(`[data-testid="${id}"]`) ?? undefined;
  var locked = (b) => b === undefined || b.disabled || b.getAttribute("aria-disabled") === "true";
  async function pickDifficulty(difficulty) {
    if (difficulty === "highest") {
      for (let i = 0;i < 10 && !locked(byTestId("pick-harder")); i++)
        await press(byTestId("pick-harder"));
      for (let i = 0;i < 100 && !locked(byTestId("nightmare-higher")); i++) {
        byTestId("nightmare-higher")?.click();
        await wait(100);
      }
    } else {
      const pick = button(new RegExp(`^${difficulty}$`, "i"));
      if (pick === undefined)
        throw new Error(`no ${difficulty} difficulty button`);
      pick.click();
    }
    await wait(200);
    const chosen = document.querySelector('.run-picker-chip[aria-pressed="true"]')?.dataset.level;
    if (chosen === undefined)
      throw new Error("no difficulty is picked on the mode screen");
    const level = chosen === "nightmare" ? byTestId("nightmare-level")?.textContent?.match(/\d+/)?.[0] : undefined;
    return level === undefined ? chosen : `${chosen}-${level}`;
  }
  async function pickWeapon(id) {
    byTestId("start-pick-row")?.click();
    await wait(400);
    const option = document.querySelector(`[data-testid="start-pick-option-${id}"]`);
    if (option === null) {
      const offered = [...document.querySelectorAll('[data-testid^="start-pick-option-"]')].map((o) => o.dataset.testid?.slice("start-pick-option-".length)).filter((x) => x !== "random");
      byTestId("start-pick-close")?.click();
      throw new Error(`starting weapon ${id} is not offered; offered: ${offered.join(", ")}`);
    }
    option.click();
    await wait(300);
    const now = byTestId("start-pick-row")?.dataset.picked;
    if (now !== id)
      throw new Error(`picked starting weapon ${id}, but the start screen shows ${now ?? "nothing"}`);
  }
  async function until(check, ms) {
    const end = performance.now() + ms;
    while (performance.now() < end) {
      if (check())
        return true;
      await wait(100);
    }
    return check();
  }

  class Controller {
    link;
    statuses = [];
    active;
    constructor(link) {
      this.link = link;
      link.steer = (game) => this.steer(game);
    }
    handle({ id, command }) {
      const status = { id, command, state: "running", at: Date.now() };
      this.statuses.push(status);
      if (this.statuses.length > KEEP_STATUSES)
        this.statuses.splice(0, this.statuses.length - KEEP_STATUSES);
      try {
        this.run(status, command);
      } catch (e) {
        this.finish(status, "failed", e instanceof Error ? e.message : String(e));
      }
    }
    release() {
      if (this.active !== undefined)
        this.finish(this.active.status, "replaced");
      this.link.speed = 1;
      this.link.liveForecast = false;
      if (inRun(this.link))
        this.link.game?.setPaused(false);
    }
    finish(status, state, detail) {
      status.state = state;
      status.at = Date.now();
      if (detail !== undefined)
        status.detail = detail;
      if (this.active?.status !== status)
        return;
      if (this.active.command.pause && state !== "replaced")
        this.link.game?.setPaused(true);
      this.active = undefined;
    }
    game() {
      const game = this.link.game;
      if (game === undefined || !inRun(this.link))
        throw new Error("no run in progress");
      return game;
    }
    run(status, command) {
      switch (command.type) {
        case "move":
        case "goto":
          const game = this.game();
          if (this.active !== undefined)
            this.finish(this.active.status, "replaced");
          this.active = { status, command };
          if (command.pause)
            game.setPaused(false);
          return;
        case "stop":
          if (this.active !== undefined)
            this.finish(this.active.status, "replaced");
          this.finish(status, "done");
          return;
        case "choose": {
          const game = this.game();
          if (game.state.choiceQueue.length === 0)
            throw new Error("no choice is open");
          if (choiceCards()[command.index] === undefined)
            throw new Error(`no option ${command.index}; there are ${choiceCards().length}`);
          const shown = () => `${game.state.choiceQueue.length}|${choiceCards().map((c) => c.textContent).join("|")}`;
          const before = shown();
          (async () => {
            for (let attempt = 0;attempt < 10; attempt++) {
              choiceCards()[command.index]?.click();
              if (await until(() => shown() !== before, 300))
                return this.finish(status, "done");
            }
            this.finish(status, "failed", "the option did not take");
          })();
          return;
        }
        case "dash": {
          const game = this.game();
          const me = game.state.me;
          const v = command.dir === undefined ? { x: game.state.player.fx[me] ?? 1, y: game.state.player.fy[me] ?? 0 } : vector(command.dir);
          game.dash(v.x, v.y);
          this.finish(status, "done");
          return;
        }
        case "pause":
        case "resume":
          this.game().setPaused(command.type === "pause");
          this.finish(status, "done");
          return;
        case "speed":
          this.link.speed = command.factor;
          this.finish(status, "done");
          return;
        case "forecast":
          this.link.liveForecast = command.live;
          this.finish(status, "done");
          return;
        case "start":
          this.start(status, command.mode ?? "openWorld", command.difficulty ?? "easy", command.weapon).catch((e) => this.finish(status, "failed", e instanceof Error ? e.message : String(e)));
          return;
        case "summary":
          this.summary(status).catch((e) => this.finish(status, "failed", e instanceof Error ? e.message : String(e)));
          return;
      }
    }
    async summary(status) {
      if (inRun(this.link))
        throw new Error("the run is still going");
      const before = this.link.runLink;
      for (let i = 0;i < 12; i++) {
        this.link.noteRunLink();
        if (this.link.runLink !== undefined && this.link.runLink !== before)
          return this.finish(status, "done");
        const next = button(/^(Next|Continue|Skip)$/i);
        if (next !== undefined)
          await press(next);
        await wait(1000);
      }
      throw new Error("the run summary did not show a share link");
    }
    async start(status, mode, difficulty, weapon) {
      const entry = mode === "daily" ? /^Daily/ : "Open World";
      if (inRun(this.link)) {
        this.link.game?.setPaused(false);
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
        if (!await until(() => button("Main menu") !== undefined, 3000))
          throw new Error("the pause menu did not open");
        for (let i = 0;i < 2 && button(entry) === undefined; i++) {
          const menu = button("Main menu");
          if (menu !== undefined)
            await press(menu);
          await wait(1500);
        }
      }
      this.link.noteRunLink();
      for (let i = 0;i < 15 && button(entry) === undefined && modeScreen() !== mode; i++) {
        if (i === 14) {
          const seen = [...document.querySelectorAll("button")].map((b) => b.textContent?.trim()).filter(Boolean);
          throw new Error(`no way back to the title; buttons on screen: ${seen.join(", ") || "none"}`);
        }
        const next = button(/^(Not now|Next|Continue|Skip|Done|Close|OK|Menu|Main menu|Title|Back to title|Back|Home)$/i);
        this.link.noteRunLink();
        if (next !== undefined)
          await press(next);
        else {
          for (const key of ["Escape", "Enter"]) {
            for (const type of ["keydown", "keyup"])
              window.dispatchEvent(new KeyboardEvent(type, { key, code: key, bubbles: true }));
            await wait(400);
          }
        }
        await wait(1200);
      }
      if (modeScreen() !== mode) {
        const open = button(entry);
        if (open === undefined)
          throw new Error(`no ${mode} button on the title screen`);
        await press(open);
        if (!await until(() => button("Start") !== undefined, 5000))
          throw new Error(`the ${mode} screen did not open`);
      }
      const picked = await pickDifficulty(difficulty);
      if (weapon !== undefined)
        await pickWeapon(weapon);
      const before = this.link.game;
      this.link.pauseAtStart = true;
      button("Start")?.click();
      await wait(2500);
      window.dispatchEvent(new KeyboardEvent("keydown", { key: " ", code: "Space", bubbles: true }));
      const started = await until(() => inRun(this.link) && this.link.game !== before, 20000);
      window.dispatchEvent(new KeyboardEvent("keyup", { key: " ", code: "Space", bubbles: true }));
      if (!started)
        throw new Error("the run did not start within 20 seconds");
      this.finish(status, "done", picked);
    }
    steer(game) {
      const active = this.active;
      if (active === undefined)
        return;
      const s = game.state;
      active.startTick ??= s.tick;
      const elapsed = s.tick - active.startTick;
      const { command, status } = active;
      if (command.type === "move") {
        if (command.seconds !== undefined && elapsed >= command.seconds * TICKS_PER_SECOND2) {
          this.finish(status, "done");
          return STILL;
        }
        return vector(command.dir);
      }
      if (elapsed >= (command.timeout ?? 60) * TICKS_PER_SECOND2) {
        this.finish(status, "failed", "timeout");
        return STILL;
      }
      const goal = this.resolve(s, command.to, active);
      if (goal === undefined) {
        if (command.stay === "done" && active.arrivedTick !== undefined)
          this.finish(status, "done", "used up");
        else
          this.finish(status, "failed", "the target is gone");
        return STILL;
      }
      const me = s.me;
      const dx = goal.x - (s.player.x[me] ?? 0);
      const dy = goal.y - (s.player.y[me] ?? 0);
      const dist = Math.hypot(dx, dy);
      if (dist > goal.within) {
        if (active.best === undefined || dist < active.best.dist - 1)
          active.best = { dist, tick: s.tick };
        else if (s.tick - active.best.tick > STUCK_TICKS) {
          this.finish(status, "failed", `stuck ${Math.round(dist)} units away`);
          return STILL;
        }
        return { x: dx / dist, y: dy / dist };
      }
      active.arrivedTick ??= s.tick;
      active.best = undefined;
      const stay = command.stay;
      if (stay === undefined || stay === 0 || typeof stay === "number" && s.tick - active.arrivedTick >= stay * TICKS_PER_SECOND2) {
        this.finish(status, "done");
      }
      return STILL;
    }
    resolve(s, to, active) {
      const within = active.command.type === "goto" ? active.command.within : undefined;
      if ("poi" in to) {
        const poi = s.world.activePois.find((p) => p.state.uid === to.poi);
        if (poi === undefined || poi.state.used || poi.state.goneAt >= 0)
          return;
        return { x: poi.x, y: poi.y, within: within ?? poi.radius * 0.5 };
      }
      if ("pickup" in to) {
        if (!s.pickups.pool.has(to.pickup))
          return;
        const slot = to.pickup & 65535;
        const kind = this.link.enums?.pickupKinds[s.pickups.kind[slot] ?? -1] ?? "";
        const radius = s.cfg.activation.pickupRadius[kind];
        return { x: s.pickups.x[slot] ?? 0, y: s.pickups.y[slot] ?? 0, within: within ?? (radius === undefined ? 6 : radius * 0.5) };
      }
      if ("dx" in to) {
        active.anchor ??= { x: (s.player.x[s.me] ?? 0) + to.dx, y: (s.player.y[s.me] ?? 0) + to.dy };
        return { ...active.anchor, within: within ?? 6 };
      }
      return { x: to.x, y: to.y, within: within ?? 6 };
    }
  }

  // src/discovery.ts
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

  // src/game.ts
  var NO_RECORDER = { step() {}, choose() {}, dash() {}, taint() {}, log() {} };
  function cloneState(root, shared) {
    const memo = new Map;
    const copy = (v) => {
      if (typeof v !== "object" || v === null || shared.has(v))
        return v;
      const known = memo.get(v);
      if (known !== undefined)
        return known;
      if (ArrayBuffer.isView(v)) {
        const c = v instanceof DataView ? new DataView(v.buffer.slice(0)) : v.slice();
        memo.set(v, c);
        return c;
      }
      if (Array.isArray(v)) {
        const c = [];
        memo.set(v, c);
        for (const x of v)
          c.push(copy(x));
        return c;
      }
      if (v instanceof Map) {
        const c = new Map;
        memo.set(v, c);
        for (const [k, x] of v)
          c.set(copy(k), copy(x));
        return c;
      }
      if (v instanceof Set) {
        const c = new Set;
        memo.set(v, c);
        for (const x of v)
          c.add(copy(x));
        return c;
      }
      const c = Object.create(Object.getPrototypeOf(v));
      memo.set(v, c);
      for (const k of Object.keys(v))
        c[k] = copy(v[k]);
      return c;
    };
    return copy(root);
  }
  function reachable(root, into) {
    const stack = [root];
    while (stack.length > 0) {
      const v = stack.pop();
      if (typeof v !== "object" || v === null || into.has(v) || ArrayBuffer.isView(v))
        continue;
      into.add(v);
      if (v instanceof Map)
        for (const [k, x] of v)
          stack.push(k, x);
      else if (v instanceof Set)
        for (const x of v)
          stack.push(x);
      else
        for (const x of Object.values(v))
          stack.push(x);
    }
  }
  var isRuleModule = (v) => typeof v === "object" && v !== null && !Array.isArray(v) && Object.values(v).length > 0 && Object.values(v).every((x) => typeof x === "function");
  var SIM_CHUNK = /\/assets\/sim-[\w-]+\.js$/;
  var BOOT_CHUNK = /\/assets\/boot-[\w-]+\.js$/;
  var ENGLISH_CHUNK = /\/assets\/i18n-en-[\w.-]+\.js$/;
  function isGameClass(value) {
    if (typeof value !== "function")
      return false;
    const proto = value.prototype;
    return typeof proto?.step === "function" && typeof proto.setInput === "function" && typeof proto.choose === "function" && typeof proto.drainEvents === "function";
  }
  var KEEP_EVENTS = 40;
  var NOISY_EVENTS = new Set(["playerHit", "hitStop", "dodge", "dashed", "block", "throttle", "reelStop", "dogAbility", "bossLanding"]);
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
  async function importBinding(source, sourceUrl, local) {
    for (const clause of source.matchAll(/import\{([^}]*)\}from"([^"]+)"/g)) {
      for (const binding of (clause[1] ?? "").split(",")) {
        const [exported = "", as] = binding.split(" as ");
        if ((as ?? exported) !== local)
          continue;
        const module = await import(new URL(clause[2] ?? "", sourceUrl).href);
        return { value: module[exported], module };
      }
    }
    throw new Error(`could not find where the sim chunk imports ${local}`);
  }
  function localAt(source, pattern, what) {
    const local = source.match(pattern)?.[1];
    if (local === undefined)
      throw new Error(`could not find the ${what} in the sim chunk`);
    return local;
  }
  function isRecord(value) {
    return value !== null && typeof value === "object";
  }
  function findEnums(module) {
    const values = Object.values(module);
    const pickupKinds = values.find((v) => Array.isArray(v) && v[0] === "xp" && v.includes("gold") && v.includes("chest"));
    const zoneKinds = values.find((v) => isRecord(v) && typeof v.telegraph === "number" && typeof v.hazardPool === "number");
    const enemyFlags = values.find((v) => isRecord(v) && typeof v.Elite === "number" && typeof v.Hidden === "number");
    if (pickupKinds === undefined)
      throw new Error("could not find the pickup kinds table");
    if (zoneKinds === undefined)
      throw new Error("could not find the zone kinds table");
    const zoneShapes = values.find((v) => isRecord(v) && v.circle === 0 && typeof v.line === "number" && typeof v.cone === "number");
    if (zoneShapes === undefined)
      throw new Error("could not find the zone shapes table");
    if (enemyFlags === undefined)
      throw new Error("could not find the enemy flags table");
    const botModes = values.find((v) => isRecord(v) && v.wander === 0 && typeof v.hop === "number" && typeof v.beam === "number");
    if (botModes === undefined)
      throw new Error("could not find the grok bot modes table");
    return { pickupKinds, zoneKinds, zoneShapes, enemyFlags, botModes };
  }
  function assertContent(value) {
    const c = value;
    for (const key of ["baseWeapons", "evolutions", "unions", "passives", "items", "evolvedItems", "allWeapons", "allItems", "enemies", "bossIds"])
      if (!Array.isArray(c[key]))
        throw new Error(`content registry has no ${key} list`);
  }

  class GameLink {
    game;
    table;
    enums;
    messages = {};
    icons;
    error;
    steer;
    inPool;
    speed = 1;
    liveForecast = false;
    pauseAtStart = false;
    forecast;
    runLink;
    events = [];
    noteRunLink() {
      if (!new URLSearchParams(location.search).has("run"))
        return;
      const share = new URL("/r/", location.origin);
      share.search = location.search;
      this.runLink = share.toString();
    }
    contentFn;
    seen = new Set;
    listeners = new Set;
    constructor() {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries())
          this.saw(entry.name);
      }).observe({ type: "resource", buffered: true });
    }
    get ready() {
      return this.contentFn !== undefined && this.table !== undefined && this.enums !== undefined;
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
    message(key) {
      return this.messages[key]?.[0];
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
      else if (BOOT_CHUNK.test(url))
        this.loadIcons(url).catch((e) => console.warn("[tibobit] no game icons:", e instanceof Error ? e.message : e));
      else if (ENGLISH_CHUNK.test(url))
        this.loadMessages(url).catch((e) => this.fail(e));
    }
    async attachSim(url) {
      const ns = await import(url);
      const Game = findGameClass(ns);
      const link = this;
      const { step, setInput, drainEvents } = Game.prototype;
      Game.prototype.drainEvents = function() {
        const events = drainEvents.call(this);
        if (this === link.game) {
          for (const e of events)
            if (!NOISY_EVENTS.has(e.type))
              link.events.push({ ...e, time: Math.round(this.state.runClock * 10) / 10 });
          link.events.splice(0, link.events.length - KEEP_EVENTS);
        }
        return events;
      };
      Game.prototype.step = function() {
        if (link.game !== this) {
          link.game = this;
          link.events = [];
          link.changed();
          if (link.pauseAtStart) {
            link.pauseAtStart = false;
            this.setPaused(true);
            return;
          }
        }
        const result = step.call(this);
        for (let i = 1;i < link.speed; i++) {
          const override = link.steer?.(this);
          if (override !== undefined)
            setInput.call(this, override.x, override.y);
          step.call(this);
        }
        return result;
      };
      Game.prototype.setInput = function(x, y) {
        const override = link.steer?.(this);
        return setInput.call(this, override?.x ?? x, override?.y ?? y);
      };
      let shared;
      this.forecast = (game, inputs, ticks) => {
        if (shared === undefined) {
          shared = new WeakSet;
          reachable(link.table, shared);
        }
        for (const v of Object.values(game.state))
          if (isRuleModule(v))
            shared.add(v);
        return inputs.map(({ x, y }) => {
          const sim = Object.assign(Object.create(Object.getPrototypeOf(game)), game, { recorder: NO_RECORDER });
          sim.state = cloneState(game.state, shared ?? new WeakSet);
          sim.state.paused = false;
          setInput.call(sim, x, y);
          const before = new Map(sim.state.run.damageTakenBySource);
          for (let i = 0;i < ticks && !sim.state.over && sim.state.choiceQueue.length === 0; i++)
            step.call(sim);
          const bySource = {};
          let damage = 0;
          for (const [source, total] of sim.state.run.damageTakenBySource) {
            const taken = total - (before.get(source) ?? 0);
            if (taken <= 0)
              continue;
            bySource[source] = taken;
            damage += taken;
          }
          const { player, me } = sim.state;
          return { damage, bySource, dead: sim.state.over, x: player.x[me] ?? 0, y: player.y[me] ?? 0, hp: player.hp[me] ?? 0 };
        });
      };
      const source = await (await fetch(url)).text();
      const contentFn = await importBinding(source, url, localAt(source, /([\w$]+)\(e\.bigUpdate\)\.baseWeapons/, "content registry call"));
      if (typeof contentFn.value !== "function")
        throw new Error("the content registry is not a function");
      const table = await importBinding(source, url, localAt(source, /([\w$]+)\.enemyAt\(/, "content table"));
      if (!isRecord(table.value) || typeof table.value.enemyAt !== "function")
        throw new Error("the content table has no enemyAt");
      assertContent(table.value);
      this.enums = findEnums(table.module);
      this.table = table.value;
      const poolLocal = localAt(source, /([\w$]+)\([a-z]\.poolShape,[a-z]\.turn,/, "pool hit test");
      const poolExport = (source.match(/export\{([^}]*)\}/)?.[1] ?? "").split(",").map((b) => b.split(" as ")).find(([local]) => local === poolLocal)?.[1];
      const inPool = poolExport === undefined ? undefined : ns[poolExport];
      if (typeof inPool !== "function")
        throw new Error("the sim chunk does not export its pool hit test");
      this.inPool = inPool;
      this.contentFn = contentFn.value;
      this.changed();
    }
    async loadIcons(url) {
      const source = await (await fetch(url)).text();
      const exported = new Map((source.match(/export\{([^}]*)\}/)?.[1] ?? "").split(",").map((b) => {
        const [local = "", as] = b.split(" as ");
        return [local, as ?? local];
      }));
      const name = (pattern, what) => {
        const local = source.match(pattern)?.[1];
        const exportedName = local === undefined ? undefined : exported.get(local);
        if (exportedName === undefined)
          throw new Error(`could not find the ${what} in the boot chunk`);
        return exportedName;
      };
      const loaderName = name(/async function ([\w$]+)\(\)\{return [\w$]+\(await [\w$]+\(\)\)\}/, "icon sheet loader");
      const pageName = name(/function ([\w$]+)\(e,t\)\{let n=[\w$]+\.get\(t\);n!==void 0&&[\w$]+\(e,n\)\}/, "icon page lookup");
      const mod = await import(url);
      const loader = mod[loaderName];
      const page = mod[pageName];
      if (typeof loader !== "function" || typeof page !== "function")
        throw new Error("icon exports are not functions");
      const sheet = await loader();
      if (!(sheet.frames instanceof Map) || typeof sheet.url !== "string")
        throw new Error("the icon sheet has an unexpected shape");
      const frames = sheet.frames;
      const pageOf = (frame) => {
        const props = {};
        page({ setProperty: (k, v) => props[k] = v }, frame);
        const pageUrl = props["--icon-sheet"]?.match(/^url\("(.*)"\)$/)?.[1];
        if (pageUrl === undefined)
          return sheet;
        return { url: pageUrl, width: Number(props["--icon-sheet-w"]), height: Number(props["--icon-sheet-h"]) };
      };
      this.icons = { url: sheet.url, width: sheet.width, height: sheet.height, frames, pageOf };
      this.changed();
    }
    async loadMessages(url) {
      const ns = await import(url);
      for (const value of Object.values(ns)) {
        if (!isRecord(value) || !Object.keys(value).some((k) => k.startsWith("content.")))
          continue;
        Object.assign(this.messages, value);
      }
      this.changed();
    }
  }

  // src/icons.ts
  var ring = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
  var dot = (x, y, r) => ({ fill: ring(x, y, r) });
  var ACTION_ICONS = {
    Loot: ["M3 11h18v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z", "M3 11V9a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2", "M10 11v3h4v-3"],
    Wander: [ring(12, 12, 9), { fill: "M15.5 8.5l-2 5-5 2 2-5z" }],
    Run: [dot(15, 4.5, 2.2), "M13 8.5 11 14", "M13 8.5 9 9.5 7 12.5", "M13 8.5l3 3h3", "M11 14l3 2.5V21", "M11 14l-2 3.5H5"],
    Gems: ["M7 4h10l4 5-9 11L3 9z", "M3 9h18", "M10 4 8 9l4 11 4-11-2-5"],
    Eat: ["M12 8c-1.5-1.2-3-1.5-4.5-1.2C5 7.3 3.5 9.6 4 13c.6 4 3.2 7.5 5.5 7.5 1 0 1.6-.5 2.5-.5s1.5.5 2.5.5c2.3 0 4.9-3.5 5.5-7.5.5-3.4-1-5.7-3.5-6.2-1.5-.3-3 0-4.5 1.2z", "M12 8c0-2 .5-3.5 2-5"],
    Hunt: [ring(12, 12, 7), "M12 2v5M12 17v5M2 12h5M17 12h5", dot(12, 12, 1.4)],
    Spot: ["M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12z", ring(12, 9, 2.5)],
    Pet: [
      { fill: "M7.5 17.5c0-3 2-5.5 4.5-5.5s4.5 2.5 4.5 5.5c0 2-1.5 3-3 3-.6 0-1-.3-1.5-.3s-.9.3-1.5.3c-1.5 0-3-1-3-3z" },
      dot(5, 10.5, 2),
      dot(9, 5.5, 2),
      dot(15, 5.5, 2),
      dot(19, 10.5, 2)
    ],
    Kennel: ["M3 11.5 12 3l9 8.5", "M5 9.5V20h14V9.5", "M9.5 20v-4a2.5 2.5 0 0 1 5 0v4"],
    Crate: ["M12 2.5 3 7v10l9 4.5 9-4.5V7z", "M3 7l9 4.5L21 7", "M12 11.5v10", "M7.5 4.8l9 4.5"],
    Shrine: ["M2 5c4 1.2 16 1.2 20 0", "M4 9.5h16", "M7 6v15M17 6v15", "M12 6.5v3"],
    Curse: ["M3 12a9 8 0 0 1 18 0z", "M9 12v6a3 3 0 0 0 6 0v-6", dot(8.5, 8.5, 1.3), dot(14, 6.5, 1.3), dot(16.5, 10, 1.1)],
    Golden: [{ fill: "M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z" }],
    Farm: ["M12 21v-9", "M12 12c0-4-3-6-7-6 0 4 3 6 7 6z", "M12 10c0-3 2.5-5.5 7-5.5 0 4-3 5.5-7 5.5z", "M7 21h10"],
    Shop: ["M2 3h3l2.5 12h11L21 7H6.2", dot(9, 19.5, 1.7), dot(17, 19.5, 1.7)],
    Microwave: ["M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z", "M5 8h10v8H5z", ring(18.5, 10, 1.3), "M17.5 14h2M17.5 16.5h2"],
    Nest: [
      "M12 8c3 0 5 2.8 5 6.2S15 20.5 12 20.5 7 17.6 7 14.2 9 8 12 8z",
      "M9.6 8.6a2.4 2.4 0 0 1 4.8 0",
      "M12 11v9.5",
      "M7.2 12 4 10.5M7 15H3.5M7.6 18l-3 2M16.8 12l3.2-1.5M17 15h3.5M16.4 18l3 2",
      "M10.6 6.6 9 4M13.4 6.6 15 4"
    ],
    Lair: [
      "M12 6c4 0 7 2.8 7 6.5S16 21 12 21s-7-4.8-7-8.5S8 6 12 6z",
      "M7.5 8 5 2.5l4.7 3.6M16.5 8 19 2.5l-4.7 3.6",
      { fill: "M7.8 11.2l3.4 1.3-.5 1.5-2.6-.8zM16.2 11.2l-3.4 1.3.5 1.5 2.6-.8z" },
      "M9 17l1.5 1.5L12 17l1.5 1.5L15 17"
    ],
    Bot: ["M5 8h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z", "M12 8V5", dot(12, 3.7, 1.5), dot(9, 12.5, 1.6), dot(15, 12.5, 1.6), "M9.5 16h5", "M2 12v3M22 12v3"],
    Whetstone: ["M9.5 17.5 21 6V3h-3L6.5 14.5", "M11 19l-6-6M8 16l-4 4M5 21l-2-2", "M3 3l2 2M3 8.5h2.5M8.5 3v2.5"],
    Bell: ["M6 16v-5a6 6 0 0 1 12 0v5l2 2H4z", "M10 20.5a2 2 0 0 0 4 0", "M12 3v2"],
    Slots: ["M2 7h15v14H2z", "M5 7V4h9v3", "M4.5 11h3v5h-3zM8 11h3v5H8zM11.5 11h3v5h-3z", "M17 13h3V5", dot(20, 4, 1.6)],
    Vault: ["M3 4h18v15H3z", ring(12, 11.5, 4.2), dot(12, 11.5, 1.2), "M12 7.3v1.6M12 14.1v1.6M7.8 11.5h1.6M14.6 11.5h1.6", "M6 19v2M18 19v2"],
    Magnet: ["M5 3h5v9a2 2 0 0 0 4 0V3h5v9a7 7 0 0 1-14 0z", "M5 7.5h5M14 7.5h5"],
    Tunnel: ["M2 21h20", "M4.5 21v-8a7.5 7.5 0 0 1 15 0v8", { fill: "M8.5 21v-6a3.5 3.5 0 0 1 7 0v6z" }],
    Light: ["M9 5a3 3 0 0 1 6 0", "M7.5 7h9", "M9 7l-1.5 3v7L9 20h6l1.5-3v-7L15 7", "M9 20v1h6v-1", { fill: "M12 10.5c1.6 1.6 2.2 2.8 2.2 3.9a2.2 2.2 0 0 1-4.4 0c0-1.1.6-2.3 2.2-3.9z" }],
    Freezer: ["M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7", "M9.5 3.5 12 6l2.5-2.5M9.5 20.5 12 18l2.5 2.5", "M3.6 10.5l3.5-.8-1-3.4M20.4 13.5l-3.5.8 1 3.4M3.6 13.5l3.5.8-1 3.4M20.4 10.5l-3.5-.8 1-3.4"],
    Fryer: ["M5.5 10h13l-1.8 11H7.3z", "M8 10V4.5M10.7 10V3M13.3 10V3.5M16 10V5"],
    Dash: [{ fill: "M13 2 4 14h7l-1 8 9-12h-7z" }],
    Start: [{ fill: "M7 4v16l13-8z" }],
    "Take over": [ring(12, 12, 9), ring(12, 12, 2.5), "M3.5 10.5l6 1M20.5 10.5l-6 1M12 14.5V21"],
    Over: ["M12 3a8 8 0 0 0-8 8c0 2.8 1.3 4.5 3 5.5V20a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3.5c1.7-1 3-2.7 3-5.5a8 8 0 0 0-8-8z", dot(9, 11.5, 1.9), dot(15, 11.5, 1.9), "M10 21v-2.5M14 21v-2.5"],
    Stopped: [{ fill: "M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" }],
    Incognito: ["M3 11h18", "M6 11l1.5-6.5h9L18 11", ring(7.5, 16.5, 3), ring(16.5, 16.5, 3), "M10.5 16.5h3"]
  };
  var NOTE_ICON = ["M4 5h16v11H9l-4 4v-4H4z", "M8 9h8M8 12h5"];
  var STILL_ICON = [ring(12, 12, 3.5)];
  var ARROW_ICON = ["M4 12h15", "M13 6l6 6-6 6"];
  var DIRECTION_TURNS = { right: 0, "down-right": 45, down: 90, "down-left": 135, left: 180, "up-left": 225, up: 270, "up-right": 315 };
  var RESULT_ICONS = { done: ["M5 12.5l4.5 4.5L19 7.5"], failed: ["M6 6l12 12M18 6 6 18"], dropped: ["M6 12h12"] };
  var SVG = "http://www.w3.org/2000/svg";
  function svgIcon(icon, className, turn = 0) {
    const svg = document.createElementNS(SVG, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("class", className);
    svg.setAttribute("aria-hidden", "true");
    const g = document.createElementNS(SVG, "g");
    if (turn !== 0)
      g.setAttribute("transform", `rotate(${turn} 12 12)`);
    for (const stroke of icon) {
      const path = document.createElementNS(SVG, "path");
      if (typeof stroke === "string")
        path.setAttribute("d", stroke);
      else {
        path.setAttribute("d", stroke.fill);
        path.setAttribute("class", "tbh-svg-fill");
      }
      g.append(path);
    }
    svg.append(g);
    return svg;
  }
  function moveIcon(move, className) {
    const turn = DIRECTION_TURNS[move];
    return turn === undefined ? svgIcon(STILL_ICON, className) : svgIcon(ARROW_ICON, className, turn);
  }

  // src/chat.ts
  var ROLE_LABELS = { planner: "Plan", action: "Action", system: "Bot" };
  var HIDE_DELAY_MS = 200;
  var MIN_SIDE_ROOM = 300;
  var clock = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
  var fine = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${(seconds % 60).toFixed(1).padStart(4, "0")}`;
  var percent = (v) => `${Math.round(v * 100)}%`;
  var ARROWS = { right: "→", "down-right": "↘", down: "↓", "down-left": "↙", left: "←", "up-left": "↖", up: "↑", "up-right": "↗", "stand still": "•" };
  var arrowed = (text) => text.replace(/(?<![\w-])(up-right|up-left|down-right|down-left|right|left|up|down)(?![\w-])/g, (d) => ARROWS[d] ?? d);
  function h(tag, className, ...children) {
    const el = document.createElement(tag);
    el.className = className;
    el.append(...children);
    return el;
  }
  function meter(label, share, className) {
    const bar = h("i", "");
    bar.style.width = `${Math.round(Math.min(1, Math.max(0, share)) * 100)}%`;
    return h("span", `tbh-meter ${className}`, h("span", "tbh-meter-track", bar), h("span", "tbh-meter-label", label));
  }
  function section(title, ...body) {
    return h("section", "tbh-insp-section", h("h4", "", title), ...body);
  }
  var pre = (text, className = "") => h("pre", `tbh-insp-pre ${className}`.trim(), text);
  function folded(title, text, className = "") {
    return h("details", "tbh-insp-fold", h("summary", "", title), pre(text, className));
  }
  function oddsRows(options) {
    return options.map((c) => h("div", `tbh-opt ${c.chosen ? "tbh-opt-chosen" : c.probability === undefined ? "tbh-opt-ruled-out" : "tbh-opt-safe"}`, h("div", "tbh-opt-head", h("span", "tbh-opt-name", arrowed(c.card)), ...c.chosen ? [h("span", "tbh-opt-outcome", "chosen")] : [], ...c.probability === undefined ? [] : [h("span", "tbh-opt-scores", meter(percent(c.probability), c.probability, "tbh-meter-useful tbh-meter-wide"))]), ...c.notes === "" ? [] : [h("div", "tbh-opt-desc", c.notes)]));
  }
  function inspectBody(m) {
    const words = [h("div", "tbh-insp-text", arrowed(m.text)), ...m.detail === undefined ? [] : [h("div", "tbh-opt-desc", m.detail)]];
    const inspect = m.inspect;
    if (inspect === undefined)
      return words;
    switch (inspect.kind) {
      case "plan":
        return [
          ...words,
          ...inspect.choices === undefined ? [] : [section("Choices", ...oddsRows(inspect.choices))],
          section("Goals", ...oddsRows([...inspect.goals].sort((a, b) => (b.probability ?? 0) - (a.probability ?? 0)))),
          folded("Prompt", inspect.prompt)
        ];
      case "prompt":
        return [
          ...words,
          ...inspect.reasoning === undefined ? [] : [folded("Reasoning", inspect.reasoning, "tbh-insp-thought")],
          ...inspect.reply === undefined ? [] : [folded("Reply", inspect.reply)],
          folded("Prompt", inspect.prompt)
        ];
      case "moves": {
        const rows = inspect.moves.map((m) => h("div", `tbh-opt tbh-opt-${m.outcome.replace(" ", "-")}`, h("div", "tbh-opt-head", h("span", "tbh-opt-name tbh-opt-arrow", ARROWS[m.move] ?? m.move), h("span", "tbh-opt-outcome", m.outcome), h("span", "tbh-opt-scores", ...m.forecast === undefined ? [] : [h("span", `tbh-chip${m.forecast === "no damage" ? " tbh-chip-ok" : ""}`, m.forecast)], ...m.hurt === undefined ? [] : [meter(`hurt ${m.hurt.toFixed(1)}/4`, m.hurt / 4, "tbh-meter-hurt")], ...m.useful === undefined ? [] : [meter(`useful ${percent(m.useful)}`, m.useful, "tbh-meter-useful")])), h("div", "tbh-opt-desc", m.description)));
        return [
          ...words,
          section("Moves", ...rows, ...inspect.dash === undefined ? [] : [h("div", "tbh-opt-desc", `Dash to escape? ${percent(inspect.dash)} (dashes above 50%)`)]),
          section("Prompt", pre([inspect.situation, ...inspect.questions ?? []].join(`

`)))
        ];
      }
      case "cards":
        return [...words, section(inspect.question, ...oddsRows(inspect.cards)), section("Prompt", pre(inspect.situation))];
    }
  }
  function inspector(panel, messages) {
    const box = h("div", "tbh-insp");
    box.hidden = true;
    let showing;
    let anchor;
    let reading = false;
    let hideTimer;
    const place = (at) => {
      const side = panel().getBoundingClientRect();
      const margin = 8;
      if (side.left < MIN_SIDE_ROOM) {
        const rect = at.getBoundingClientRect();
        const above = rect.top > window.innerHeight - rect.bottom;
        Object.assign(box.style, {
          left: `${margin}px`,
          right: `${margin}px`,
          width: "auto",
          top: above ? "auto" : `${rect.bottom + margin}px`,
          bottom: above ? `${window.innerHeight - rect.top + margin}px` : "auto",
          maxHeight: `${(above ? rect.top : window.innerHeight - rect.bottom) - 2 * margin}px`
        });
        return;
      }
      box.style.bottom = "auto";
      const width = Math.min(560, side.left - 2 * margin);
      box.style.width = `${width}px`;
      box.style.left = `${side.left - margin - width}px`;
      box.style.right = "auto";
      box.style.maxHeight = `${window.innerHeight - 2 * margin}px`;
      const top = at.getBoundingClientRect().top;
      box.style.top = `${Math.max(margin, Math.min(top, window.innerHeight - box.offsetHeight - margin))}px`;
    };
    const plans = () => messages().filter((m) => m.role === "planner");
    const render = () => {
      if (showing === undefined || anchor === undefined)
        return;
      const all = plans();
      const want = showing;
      const m = want.kind === "plan" ? all.find((x) => x.id === want.id) ?? all.at(-1) : messages().find((x) => x.id === want.id);
      if (m === undefined) {
        box.hidden = true;
        return;
      }
      const scroll = box.scrollTop;
      const head = h("div", "tbh-insp-head", ...m.time === undefined ? [] : [h("span", "tbh-msg-time", m.role === "planner" ? clock(m.time) : fine(m.time))], h("span", `tbh-msg-role tbh-role-${m.role}`, ROLE_LABELS[m.role]), ...m.model === undefined ? [] : [h("span", "tbh-msg-model", m.model)]);
      const history = want.kind === "plan" && all.length > 1 ? [
        section("All decisions", ...[...all].reverse().map((x) => {
          const item = h("button", `tbh-insp-past${x.id === m.id ? " tbh-insp-past-on" : ""}`, h("span", "tbh-row-time", x.time === undefined ? "" : clock(x.time)), h("span", "", x.text));
          item.type = "button";
          item.addEventListener("click", () => {
            showing = { kind: "plan", id: x.id };
            render();
            box.scrollTop = 0;
          });
          return item;
        }))
      ] : [];
      box.replaceChildren(head, ...inspectBody(m), ...history);
      box.hidden = false;
      place(anchor);
      box.scrollTop = scroll;
    };
    const hide = () => {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        if (reading)
          return;
        box.hidden = true;
        showing = undefined;
      }, HIDE_DELAY_MS);
    };
    box.addEventListener("pointerenter", () => {
      reading = true;
      clearTimeout(hideTimer);
    });
    box.addEventListener("pointerleave", () => {
      reading = false;
      hide();
    });
    return {
      box,
      show(target, at) {
        clearTimeout(hideTimer);
        reading = false;
        showing = target;
        anchor = at;
        box.scrollTop = 0;
        render();
      },
      leave: hide,
      refresh(anchorFor) {
        if (showing === undefined || reading)
          return;
        anchor = anchorFor(showing) ?? anchor;
        render();
      }
    };
  }
  var FLOW_TILES = 60;
  function step(m) {
    if (m.role !== "action" || m.inspect?.kind !== "moves")
      return;
    const chosen = m.inspect.moves.find((x) => x.outcome === "chosen");
    return { move: chosen?.move ?? "stand still", hurt: chosen?.forecast !== undefined && chosen.forecast !== "no damage", dash: m.tag === "Dash" };
  }
  function actionTile(m) {
    const s = step(m);
    const icon = s !== undefined ? moveIcon(s.move, "tbh-tile-icon") : svgIcon(m.tag === undefined ? NOTE_ICON : ACTION_ICONS[m.tag], "tbh-tile-icon");
    const badge = s?.dash ? [svgIcon(ACTION_ICONS.Dash, "tbh-tile-badge tbh-badge-dash")] : m.result === undefined ? [] : [svgIcon(RESULT_ICONS[m.result], `tbh-tile-badge tbh-result-${m.result}`)];
    const el = h("span", `tbh-tile tbh-tile-${m.role}${s?.hurt ? " tbh-tile-hurt" : ""}${m.inspect === undefined ? "" : " tbh-tile-inspectable"}`, icon, ...badge);
    el.setAttribute("aria-label", arrowed(m.text));
    el.dataset.id = String(m.id);
    return el;
  }
  function chatBox(bridge) {
    const giveBack = h("button", "tbh-giveback");
    giveBack.type = "button";
    giveBack.addEventListener("click", () => bridge.setPilot({ on: false }));
    const paceInput = (key) => {
      const { min, max, step } = PACE_LIMITS[key];
      const input = h("input", "tbh-pace-input");
      Object.assign(input, { type: "number", min: String(min), max: String(max), step: String(step), inputMode: "decimal" });
      input.addEventListener("change", () => {
        const v = Number(input.value);
        if (!Number.isFinite(v) || input.value === "")
          return;
        const clamped = Number(Math.min(max, Math.max(min, Math.round(v / step) * step)).toFixed(1));
        input.value = String(clamped);
        bridge.setPilot({ [key]: clamped });
      });
      return input;
    };
    const planEvery = paceInput("planEvery");
    const actEvery = paceInput("actEvery");
    const tools = h("div", "tbh-chat-tools", giveBack, h("label", "tbh-pace-field", h("span", "tbh-plan-label", "Plan"), planEvery, "s"), h("label", "tbh-pace-field tbh-pace-action", h("span", "tbh-plan-label", "Action"), actEvery, "s"));
    const plan = h("div", "tbh-plan");
    const list = h("div", "tbh-actions");
    list.setAttribute("aria-live", "polite");
    const rows = new Map;
    const insp = inspector(() => plan.closest(".tbh-panel") ?? plan, () => bridge.chat());
    let shownPlan;
    const render = () => {
      const pilot = bridge.pilot();
      const label = pilot.state === "stopping" ? "Handing the wheel back…" : "I'll do it myself";
      if (giveBack.textContent !== label)
        giveBack.textContent = label;
      giveBack.disabled = pilot.state !== "on";
      for (const [input, value] of [
        [planEvery, pilot.pace.planEvery],
        [actEvery, pilot.pace.actEvery]
      ]) {
        input.disabled = pilot.state !== "on";
        if (document.activeElement !== input && input.value !== String(value))
          input.value = String(value);
      }
      const messages = bridge.chat();
      const latest = [...messages].reverse().find((m) => m.role === "planner");
      if (latest !== shownPlan || latest === undefined) {
        shownPlan = latest;
        plan.replaceChildren(h("span", "tbh-plan-label", "Plan"), ...latest?.time === undefined ? [] : [h("span", "tbh-row-time", clock(latest.time))], h("span", "tbh-plan-text", latest === undefined ? "Waiting for the planner…" : arrowed(latest.text)), ...latest?.stream === undefined ? [] : [h("div", "tbh-plan-stream", h("span", "", latest.stream, h("b", "tbh-cursor", "▍")))]);
        plan.classList.toggle("tbh-row-inspectable", latest !== undefined);
      }
      if (list.matches(":hover"))
        return insp.refresh((target) => target.kind === "plan" ? plan : rows.get(target.id)?.el);
      const actions = [];
      for (let i = messages.length - 1;i >= 0 && actions.length < FLOW_TILES; i--) {
        const m = messages[i];
        if (m !== undefined && m.role !== "planner")
          actions.push(m);
      }
      const ids = new Set(actions.map((m) => m.id));
      for (const [id] of rows)
        if (!ids.has(id))
          rows.delete(id);
      const els = actions.map((message, i) => {
        const before = rows.get(message.id);
        const el = before?.message === message ? before.el : actionTile(message);
        rows.set(message.id, { el, message });
        el.classList.toggle("tbh-tile-main", i === 0);
        el.classList.toggle("tbh-tile-prev", i === 1);
        return el;
      });
      if (els.length !== list.children.length || els.some((el, i) => list.children[i] !== el))
        list.replaceChildren(...els);
      insp.refresh((target) => target.kind === "plan" ? plan : rows.get(target.id)?.el);
    };
    let hovered;
    plan.addEventListener("pointerenter", () => {
      if (shownPlan === undefined || hovered === plan)
        return;
      hovered = plan;
      insp.show({ kind: "plan" }, plan);
    });
    list.addEventListener("pointerover", (e) => {
      const el = e.target instanceof Element ? e.target.closest("[data-id]") : null;
      if (el === hovered)
        return;
      hovered = el ?? undefined;
      if (el === null)
        return insp.leave();
      insp.show({ kind: "action", id: Number(el.dataset.id) }, el);
    });
    const box = h("div", "tbh-chatbox", tools, plan, list, insp.box);
    box.addEventListener("pointerleave", () => {
      hovered = undefined;
      insp.leave();
    });
    bridge.onChange(render);
    render();
    return box;
  }

  // src/style.ts
  var css = `
.tbh-panel {
  position: fixed; top: 52px; right: 8px; z-index: 2147483000;
  width: min(320px, calc(100vw - 16px)); max-height: calc(100vh - 120px); overflow: auto;
  background: rgba(17, 14, 10, 0.88); color: #f3e6c4; border: 1px solid #6b5631; border-radius: 6px;
  font: 12px/1.35 ui-monospace, Menlo, Consolas, monospace; box-shadow: 0 4px 18px rgba(0,0,0,.5);
  touch-action: auto; user-select: none;
}
.tbh-panel:not(.tbh-pilot):is(.tbh-collapsed:not(.tbh-choice), .tbh-choice:not(.tbh-peek)) { width: auto; }
.tbh-panel.tbh-pilot { width: min(340px, calc(100vw - 16px)); }
.tbh-collapsed .tbh-header, .tbh-choice:not(.tbh-peek) .tbh-header { gap: 12px; }
@media (max-width: 699px) {
  .tbh-panel { top: 100px; }
  .tbh-panel.tbh-choice:not(.tbh-pilot) { display: none; }
}
.tbh-header { display: flex; justify-content: space-between; gap: 8px; padding: 6px 8px; cursor: pointer; font-weight: 700; color: #ffd36b; position: sticky; top: 0; background: rgba(17,14,10,.96); }
.tbh-count { color: #c9b58a; font-weight: 400; }
.tbh-collapsed:not(.tbh-choice, .tbh-idle) :is(.tbh-body, .tbh-stale),
.tbh-choice:not(.tbh-peek) :is(.tbh-body, .tbh-stale),
.tbh-panel:not(.tbh-pilot):is(.tbh-collapsed:not(.tbh-choice, .tbh-idle), .tbh-choice:not(.tbh-peek)) .tbh-conn { display: none; }
/* Below the title screen's "made by" badge and "What's new" button. */
.tbh-panel.tbh-idle { top: 80px; }
.tbh-panel.tbh-idle:not(.tbh-pilot) { width: auto; max-width: min(320px, calc(100vw - 16px)); }
.tbh-idle > .tbh-content { display: none; }
.tbh-idle .tbh-conn { border-top: 0; }
.tbh-body { padding: 0 6px 6px; }
.tbh-empty { color: #a8977a; padding: 4px 2px; }
.tbh-need { display: grid; grid-template-columns: 30px 24px 8px 1fr; align-items: center; gap: 4px; padding: 3px 2px; border-top: 1px solid rgba(255,255,255,.06); }
.tbh-need:first-child { border-top: 0; }
.tbh-colon { color: #8d7c5c; }
.tbh-opts { display: flex; flex-wrap: wrap; gap: 3px; }
.tbh-stale { margin: 0 6px 6px; padding: 4px 6px; border-radius: 4px; background: rgba(227,138,127,.15); color: #f0b3aa; font-size: 11px; }
.tbh-conn { padding: 6px 8px; border-top: 1px solid rgba(255,255,255,.08); user-select: auto; }
.tbh-conn-row { display: flex; align-items: center; gap: 6px; }
.tbh-conn-label { color: #c9b58a; flex: 1; white-space: nowrap; }
.tbh-port { width: 7ch; padding: 2px 4px; font: inherit; color: #f3e6c4; background: rgba(255,255,255,.06); border: 1px solid #6b5631; border-radius: 3px; -moz-appearance: textfield; }
.tbh-port::-webkit-inner-spin-button, .tbh-port::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.tbh-port:focus { outline: 1px solid #ffd36b; }
.tbh-port.tbh-invalid { border-color: #e38a7f; }
.tbh-connect { padding: 2px 8px; font: inherit; font-weight: 700; color: #3a2600; background: #ffd36b; border: 0; border-radius: 3px; cursor: pointer; }
.tbh-connect:hover { background: #ffe08f; }
.tbh-connected { color: #7fe3a4; font-weight: 700; }
.tbh-dot { flex: none; width: 8px; height: 8px; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 0 0 rgba(61,220,132,.7); animation: tbh-pulse 1.6s ease-out infinite; }
@keyframes tbh-pulse { 70% { box-shadow: 0 0 0 7px rgba(61,220,132,0); } 100% { box-shadow: 0 0 0 0 rgba(61,220,132,0); } }
:is(.tbh-dot, .tbh-wheel, .tbh-connected, .tbh-connect)[hidden] { display: none; }
.tbh-conn-status { margin-top: 4px; font-size: 11px; color: #a8977a; overflow-wrap: anywhere; }
.tbh-conn-status[data-state="ok"] { color: #7fe3a4; }
.tbh-conn-status[data-state="error"] { color: #f0b3aa; }
.tbh-wheel { display: block; width: 100%; margin-top: 6px; padding: 5px 8px; white-space: nowrap; font: inherit; font-weight: 800; letter-spacing: .02em; cursor: pointer;
  color: #f3e6c4; background: linear-gradient(180deg, #3b2f52, #2a2140); border: 1px solid #8e74c9; border-radius: 4px; }
.tbh-wheel:hover:not(:disabled) { border-color: #c9a0ff; color: #fff; }
.tbh-chat-tools { display: flex; align-items: center; gap: 6px; padding: 6px 6px 0; font-size: 11px; color: #c9b58a; }
.tbh-giveback { flex: 1; min-width: 0; padding: 4px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font: inherit; font-weight: 800; cursor: pointer; color: #ffd6d0; background: rgba(227,138,127,.12); border: 1px solid #e38a7f; border-radius: 4px; }
.tbh-giveback:hover:not(:disabled) { color: #fff; background: rgba(227,138,127,.24); }
.tbh-wheel:disabled, .tbh-giveback:disabled { opacity: .5; cursor: default; }
.tbh-incognito { flex: none; padding: 2px 6px; white-space: nowrap; font: inherit; font-size: 11px; font-weight: 800; cursor: pointer; color: #a8977a; background: transparent; border: 1px dashed #6b5631; border-radius: 4px; }
.tbh-incognito:hover { color: #f3e6c4; border-style: solid; }
.tbh-incognito[aria-pressed="true"] { color: #f3e6c4; background: #2a2a33; border: 1px solid #8d8da8; }
.tbh-wheel-note { margin-top: 4px; font-size: 11px; color: #f0b3aa; overflow-wrap: anywhere; }
.tbh-wheel-note[hidden], .tbh-panel:not(.tbh-pilot) .tbh-chatbox { display: none; }
.tbh-chatbox { border-top: 1px solid rgba(255,255,255,.08); }
.tbh-pace-field { --role: #c9a0ff; flex: none; display: inline-flex; align-items: center; gap: 3px; }
.tbh-pace-action { --role: #7fa8ff; }
.tbh-pace-input { width: 2.8em; padding: 2px 3px; font: inherit; color: #f3e6c4; background: rgba(0,0,0,.35); border: 1px solid #6b5631; border-radius: 3px; }
.tbh-pace-input:focus { outline: none; border-color: var(--role); }
.tbh-pace-input:disabled { opacity: .5; }
.tbh-plan { --role: #c9a0ff; display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 6px; margin: 6px 6px 0; padding: 5px 7px; border-left: 3px solid var(--role); border-radius: 0 5px 5px 0; background: rgba(201,160,255,.1); overflow-wrap: anywhere; }
.tbh-plan-label { color: var(--role); font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
.tbh-plan-text { flex: 1 1 60%; min-width: 0; white-space: pre-wrap; }
/* The newest reasoning sits at the bottom; older lines scroll out of the top. */
.tbh-plan-stream { flex-basis: 100%; max-height: 6em; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; white-space: pre-wrap; font-size: 10.5px; font-style: italic; color: #b9a6d9; }
/* Eight columns of square tiles, eight rows deep; the rest are clipped. The newest spans 3x3 and the one before it 2x2, and the rest fill in around them in order. */
.tbh-actions { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 3px; align-content: start; aspect-ratio: 1; overflow: hidden; padding: 6px; user-select: text; }
.tbh-actions:empty { display: block; aspect-ratio: auto; }
.tbh-actions:empty::before { content: "Waiting for the bot…"; color: #a8977a; line-height: 1.4; }
.tbh-tile { --role: #7fa8ff; position: relative; display: grid; place-items: center; box-sizing: border-box; aspect-ratio: 1; min-width: 0; color: #dbe6ff; background: transparent; border-radius: 4px; }
.tbh-tile-icon { display: block; width: 88%; height: 88%; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.tbh-svg-fill { fill: currentColor; stroke: none; }
.tbh-tile-badge { position: absolute; top: 3%; right: 3%; width: 28%; height: 28%; padding: 3%; box-sizing: border-box; border-radius: 50%; background: rgba(10,8,20,.85); fill: none; stroke: currentColor; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; }
.tbh-tile-badge.tbh-result-done { color: #7fd88f; }
.tbh-tile-badge.tbh-result-failed { color: #ff8f80; }
.tbh-tile-badge.tbh-result-dropped { color: #a8977a; }
.tbh-tile-badge.tbh-badge-dash { color: #ffd76a; }
.tbh-tile-system { --role: #a8977a; color: #c9b58a; }
.tbh-tile-hurt { --role: #e38a7f; color: #ffb4a8; }
.tbh-tile-main { grid-column: span 3; grid-row: span 3; }
.tbh-tile-prev { grid-column: span 2; grid-row: span 2; }
.tbh-tile-inspectable { cursor: help; }
.tbh-tile:hover { background: color-mix(in srgb, var(--role) 18%, transparent); }
.tbh-row-time { flex: none; font-size: 10px; color: #8d7c5c; font-variant-numeric: tabular-nums; }
.tbh-opt-arrow { font-size: 14px; min-width: 1.2em; }
.tbh-row-inspectable { cursor: help; }
.tbh-row-inspectable:hover { background: rgba(255,255,255,.05); outline: 1px solid color-mix(in srgb, var(--role) 55%, transparent); }
.tbh-cursor { font-style: normal; font-weight: 400; color: var(--role); animation: tbh-blink 1s steps(1) infinite; }
@keyframes tbh-blink { 50% { opacity: 0; } }

.tbh-pick-layer { position: fixed; inset: 0; z-index: 2147482999; pointer-events: none; font: 800 12px/1.3 ui-monospace, Menlo, Consolas, monospace; }
.tbh-pick-layer[hidden], .tbh-pick-layer [hidden] { display: none; }
.tbh-pick-banner { position: fixed; transform: translate(-50%, -100%); box-sizing: border-box; padding: 5px 12px; text-align: center; color: #f3e6c4; background: rgba(42,33,64,.95); border: 1px solid #c9a0ff; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,.5); }
.tbh-pick-bar { position: fixed; display: flex; align-items: center; gap: 6px; box-sizing: border-box; padding: 0 2px; transition: opacity .3s; }
.tbh-pick-track { flex: 1; height: 7px; border-radius: 4px; background: rgba(0,0,0,.55); box-shadow: 0 0 0 1px rgba(255,255,255,.15); overflow: hidden; }
.tbh-pick-track > i { display: block; height: 100%; background: #7fa8ff; }
.tbh-pick-pct { color: #fff; text-shadow: 0 1px 2px #000; }
.tbh-pick-dim { opacity: .35; }
.tbh-pick-frame { position: fixed; box-sizing: border-box; border: 3px solid transparent; border-radius: 10px; transition: border-color .08s, box-shadow .08s; }
.tbh-pick-on { border-color: #ffd36b; box-shadow: 0 0 14px rgba(255,211,107,.7); }
.tbh-pick-final { border-color: #ffd36b; box-shadow: 0 0 26px 4px rgba(255,211,107,.9); animation: tbh-pick-pulse .7s ease-in-out infinite alternate; }
@keyframes tbh-pick-pulse { to { box-shadow: 0 0 10px 1px rgba(255,211,107,.5); } }
/* Positioned by its tip end: above a card pointing down, or left of it pointing right. */
.tbh-pick-arrow { position: fixed; width: 48px; height: 48px; transform: translate(-100%, -50%); color: #ffd36b; filter: drop-shadow(0 0 6px rgba(255,211,107,.8)) drop-shadow(0 2px 2px rgba(0,0,0,.8)); }
.tbh-pick-arrow.tbh-pick-arrow-down { transform: translate(-50%, -100%); }
.tbh-pick-arrow-icon { display: block; width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.tbh-pick-arrived .tbh-pick-arrow-icon { animation: tbh-pick-bob-x .45s ease-in-out infinite alternate; }
.tbh-pick-arrived.tbh-pick-arrow-down .tbh-pick-arrow-icon { animation-name: tbh-pick-bob-y; }
@keyframes tbh-pick-bob-x { to { transform: translateX(-8px); } }
@keyframes tbh-pick-bob-y { to { transform: translateY(-8px); } }
@media (prefers-reduced-motion: reduce) { .tbh-pick-final, .tbh-pick-arrived .tbh-pick-arrow-icon { animation: none; } }
.tbh-insp { position: fixed; z-index: 2147483002; box-sizing: border-box; overflow: auto; padding: 8px 10px 10px; background: rgba(17,14,10,.97); color: #f3e6c4; border: 1px solid #6b5631; border-radius: 6px;
  box-shadow: 0 6px 24px rgba(0,0,0,.6); font: 11.5px/1.4 ui-monospace, Menlo, Consolas, monospace; user-select: text; overscroll-behavior: contain; }
.tbh-insp[hidden] { display: none; }
.tbh-insp-head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; font-size: 10.5px; color: #8d7c5c; }
.tbh-role-planner { --role: #c9a0ff; } .tbh-role-action { --role: #7fa8ff; } .tbh-role-system { --role: #a8977a; }
.tbh-insp-section { margin-top: 8px; }
.tbh-insp-section > h4 { margin: 0 0 4px; font: inherit; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #c9b58a; }
.tbh-insp-pre { margin: 0; padding: 6px 8px; white-space: pre-wrap; overflow-wrap: anywhere; font: inherit; font-size: 10.5px; background: rgba(255,255,255,.04); border-radius: 4px; }
.tbh-insp-thought { color: #b9a6d9; font-style: italic; }
.tbh-opt { padding: 4px 6px; margin-top: 3px; border-radius: 4px; border-left: 3px solid #4a3d29; background: rgba(255,255,255,.03); }
.tbh-opt-chosen { border-left-color: #ffd36b; background: rgba(255,211,107,.1); }
.tbh-opt-safe { border-left-color: #5ee8c0; }
.tbh-opt-risky { border-left-color: #e3a07f; opacity: .8; }
.tbh-opt-ruled-out { opacity: .5; }
.tbh-opt-ruled-out .tbh-opt-name { text-decoration: line-through; }
.tbh-opt-head { display: flex; flex-wrap: wrap; align-items: center; gap: 2px 6px; }
.tbh-opt-name { font-weight: 800; }
.tbh-opt-outcome { font-size: 9.5px; text-transform: uppercase; letter-spacing: .06em; color: #a8977a; }
.tbh-opt-chosen .tbh-opt-outcome { color: #ffd36b; }
.tbh-chip { padding: 0 5px; border-radius: 3px; font-size: 10px; background: rgba(227,138,127,.18); color: #f0b3aa; }
.tbh-chip-ok { background: rgba(127,227,164,.14); color: #7fe3a4; }
.tbh-opt-scores { display: inline-flex; flex-wrap: wrap; justify-content: flex-end; align-items: center; gap: 4px 10px; margin-left: auto; }
.tbh-meter { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; color: #c9b58a; }
.tbh-meter-track { width: 56px; height: 5px; border-radius: 3px; background: rgba(255,255,255,.08); overflow: hidden; }
.tbh-meter-track > i { display: block; height: 100%; }
.tbh-meter-hurt i { background: #e38a7f; } .tbh-meter-useful i { background: #7fa8ff; }
.tbh-opt-desc { margin-top: 2px; font-size: 10.5px; color: #a8977a; white-space: pre-wrap; overflow-wrap: anywhere; }
.tbh-msg-role { color: var(--role); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.tbh-msg-model { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tbh-msg-time { font-variant-numeric: tabular-nums; }
.tbh-insp-text { white-space: pre-wrap; font-weight: 700; }
.tbh-insp-fold { margin-top: 8px; }
.tbh-insp-fold > summary { cursor: pointer; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #c9b58a; }
.tbh-insp-fold > .tbh-insp-pre { margin-top: 4px; }
.tbh-insp-past { display: flex; gap: 6px; width: 100%; padding: 2px 4px; text-align: left; font: inherit; font-size: 10.5px; color: #e4d4ae; background: none; border: 0; border-radius: 3px; cursor: pointer; }
.tbh-insp-past:hover { background: rgba(255,255,255,.06); }
.tbh-insp-past-on { background: rgba(201,160,255,.14); }
.tbh-meter-wide .tbh-meter-track { width: 120px; }
.tbh-badge { display: inline-block; padding: 0 4px; border-radius: 3px; font-size: 9.5px; font-weight: 800; letter-spacing: .06em; text-align: center; }
.tbh-badge-new { align-self: flex-start; background: #ff7ad9; color: #3d0630; margin: 0 0 2px; }
.tbh-badge-evo { background: #ffd36b; color: #3a2600; }

.tbh-icon { --s: 1.5; position: relative; display: inline-block; flex: none; width: calc(16px * var(--s)); height: calc(16px * var(--s)); border-radius: 4px; background: rgba(255,255,255,.06); }
.tbh-icon > i { position: absolute; left: 50%; top: 50%; width: calc(var(--w) * var(--s) * 1px); height: calc(var(--h) * var(--s) * 1px);
  margin: calc(var(--ay) * var(--s) * -1px) 0 0 calc(var(--ax) * var(--s) * -1px);
  background: var(--sheet) no-repeat; background-size: calc(var(--sw) * var(--s) * 1px) calc(var(--sh) * var(--s) * 1px);
  background-position: calc(var(--x) * var(--s) * -1px) calc(var(--y) * var(--s) * -1px); image-rendering: pixelated; }
.tbh-icon-text { display: inline-flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: #f3e6c4; }
.tbh-tip { position: fixed; z-index: 2147483001; max-width: min(240px, calc(100vw - 16px)); padding: 5px 7px; pointer-events: none;
  background: rgba(17, 14, 10, 0.96); color: #f3e6c4; border: 1px solid #6b5631; border-radius: 5px; box-shadow: 0 4px 14px rgba(0,0,0,.5);
  font: 11.5px/1.35 ui-monospace, Menlo, Consolas, monospace; text-align: start; }
.tbh-tip[hidden] { display: none; }
.tbh-tip-name { color: #ffd36b; font-weight: 700; }
.tbh-tip-note { color: #c9b58a; }
.tbh-tip-desc { margin-top: 2px; }
.tbh-icon.tbh-banished > i, .tbh-icon-text.tbh-banished { opacity: .45; }
.tbh-icon.tbh-banished::before { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: linear-gradient(45deg, transparent 43%, #ff5a4a 43% 57%, transparent 57%), linear-gradient(-45deg, transparent 43%, #ff5a4a 43% 57%, transparent 57%); }
.tbh-icon.tbh-fresh::after { content: ""; position: absolute; right: -2px; top: -2px; width: 7px; height: 7px; border-radius: 50%; background: #ff7ad9; box-shadow: 0 0 0 1px rgba(17,14,10,.9); }

.ui-card.tbh-card-new { box-shadow: 0 0 0 2px #ff7ad9, 0 0 16px rgba(255,122,217,.6) !important; }
.ui-card.tbh-card-evo { box-shadow: 0 0 0 2px #ffd36b, 0 0 14px rgba(255,211,107,.55) !important; }
.ui-card.tbh-card-new.tbh-card-evo { box-shadow: 0 0 0 2px #ff7ad9, 0 0 0 4px #ffd36b, 0 0 16px rgba(255,211,107,.5) !important; }
.tbh-card { display: flex; flex-direction: column; gap: 2px; margin-top: 4px; font: clamp(11px, .6em, 16px)/1.3 ui-monospace, Menlo, Consolas, monospace; color: #c9b58a; text-align: start; }
.tbh-line { display: flex; align-items: center; gap: 5px; }
.tbh-line .tbh-icon { --s: 1.5; }
.tbh-line.tbh-done > .tbh-icon:first-child { box-shadow: 0 0 0 1px #7fe3a4; }
.tbh-line.tbh-leveling > .tbh-icon:first-child { box-shadow: 0 0 0 1px #ffcf5a; }
.tbh-line.tbh-missing > .tbh-icon:first-child { opacity: .55; }
.tbh-line.tbh-done, .tbh-line.tbh-leveling { color: #f3e6c4; }
.tbh-arrow { color: #8d7c5c; }
.tbh-ready-tag { color: #5ee8a0; font-weight: 700; }
`;

  // src/helper.ts
  function isShown(el) {
    return el.getClientRects().length > 0;
  }
  function h2(tag, className, ...children) {
    const el = document.createElement(tag);
    el.className = className;
    el.append(...children);
    return el;
  }
  function initials(name) {
    const words = name.split(/[\s-]+/).filter(Boolean);
    return (words.length > 1 ? `${words[0]?.[0]}${words[1]?.[0]}` : name.slice(0, 2)).toUpperCase();
  }
  var tips = new WeakMap;
  function icon(v, key, note = "", className = "") {
    const id = idOf(key);
    const frame = v.icons?.frames.get(id);
    const banished = v.banished.has(id);
    const box = h2("span", `tbh-icon ${className}${banished ? " tbh-banished" : ""}`.trim());
    const notes = [...banished ? ["banished this run"] : [], ...note === "" ? [] : [note]].join(" · ");
    tips.set(box, { name: nameOf(v.d.catalog, key), note: notes, description: v.d.catalog.descriptions[key] });
    if (v.icons === undefined || frame === undefined) {
      box.classList.add("tbh-icon-text");
      box.textContent = initials(nameOf(v.d.catalog, key));
      return box;
    }
    const page = v.icons.pageOf(frame);
    const art = h2("i", "");
    const s = art.style;
    s.setProperty("--sheet", `url("${page.url}")`);
    s.setProperty("--sw", String(page.width));
    s.setProperty("--sh", String(page.height));
    for (const k of ["x", "y", "w", "h", "ax", "ay"])
      s.setProperty(`--${k}`, String(frame[k]));
    box.append(art);
    return box;
  }
  function partNeed(v, part) {
    const max = v.d.catalog.maxLevel[part.key];
    if (part.need !== "max" || max === undefined)
      return "";
    const have = v.loadout.get(part.key);
    return `needs Lv${max}${have === undefined ? "" : `, have ${have}`}`;
  }
  function partTitle(v, part) {
    const need = partNeed(v, part);
    return `${nameOf(v.d.catalog, part.key)}${need === "" ? "" : ` (${need})`}`;
  }
  function resultNote(v, combo) {
    return `makes ${nameOf(v.d.catalog, combo.result)}${v.discovery.made(combo.result) ? "" : " (never made)"}`;
  }
  function pairingNote(v, part, combo) {
    return [partNeed(v, part), resultNote(v, combo)].filter(Boolean).join(" · ");
  }
  function startTips() {
    const tip = h2("div", "tbh-tip");
    tip.hidden = true;
    document.body.append(tip);
    let anchor;
    const hide = () => {
      anchor = undefined;
      tip.hidden = true;
    };
    const show = (el, content) => {
      anchor = el;
      tip.replaceChildren(h2("div", "tbh-tip-name", content.name), ...content.note === "" ? [] : [h2("div", "tbh-tip-note", content.note)], ...content.description === undefined ? [] : [h2("div", "tbh-tip-desc", content.description)]);
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
    window.addEventListener("pointerover", (e) => {
      const el = e.target instanceof Element ? e.target.closest(".tbh-icon") : null;
      if (el === anchor)
        return;
      const content = el === null ? undefined : tips.get(el);
      if (el === null || content === undefined)
        return hide();
      show(el, content);
    }, true);
    window.addEventListener("pointerout", (e) => e.relatedTarget === null && hide(), true);
    window.addEventListener("scroll", hide, true);
    return () => {
      if (anchor !== undefined && !anchor.isConnected)
        hide();
    };
  }
  function header(panel, count) {
    const el = h2("div", "tbh-header", h2("span", "", "Combos"), h2("span", "tbh-count", count));
    el.addEventListener("click", () => panel.classList.toggle(panel.classList.contains("tbh-choice") ? "tbh-peek" : "tbh-collapsed"));
    return el;
  }
  function renderPanel(panel, content, v) {
    const rows = unpaired(v.d.combos, v.loadout);
    const paired = relevantCombos(v.d.combos, v.loadout).filter((c) => c.parts.every((p) => v.loadout.has(p.key)));
    const ready = paired.filter((c) => comboProgress(c, v.loadout, v.d.catalog).every((s) => s === "done"));
    const body = h2("div", "tbh-body");
    if (rows.length === 0)
      body.append(h2("div", "tbh-empty", paired.length > 0 ? "Everything you hold is paired." : "Nothing you hold has a combo."));
    for (const { held, options } of rows) {
      const fresh = options.some((o) => !v.discovery.made(o.combo.result));
      const opts = h2("span", "tbh-opts");
      for (const o of options)
        opts.append(icon(v, o.partner.key, pairingNote(v, o.partner, o.combo), v.discovery.made(o.combo.result) ? "" : "tbh-fresh"));
      body.append(h2("div", "tbh-need", fresh ? h2("span", "tbh-badge tbh-badge-evo", "NEW") : h2("span", ""), icon(v, held), h2("span", "tbh-colon", ":"), opts));
    }
    const counts = [`${rows.length} open`, `${paired.length} paired`, ...ready.length > 0 ? [`${ready.length} ready`] : []].join(" · ");
    const head = header(panel, counts);
    head.title = paired.map((c) => `${c.parts.map((p) => partTitle(v, p)).join(" + ")} → ${nameOf(v.d.catalog, c.result)}`).join(`
`);
    content.replaceChildren(head, body);
  }
  function renderProblem(panel, content, message) {
    content.replaceChildren(header(panel, "offline"), h2("div", "tbh-stale", message));
  }
  function connectionRow(bridge) {
    const input = h2("input", "tbh-port");
    input.type = "number";
    input.min = "1";
    input.max = "65535";
    input.value = String(bridge.status().port);
    input.setAttribute("aria-label", "Agent server port");
    const button = h2("button", "tbh-connect", "Connect");
    const connected = h2("span", "tbh-connected", "connected");
    const dot = h2("span", "tbh-dot");
    dot.setAttribute("aria-hidden", "true");
    const status = h2("div", "tbh-conn-status");
    const wheel = h2("button", "tbh-wheel", "Grok take the wheel");
    wheel.type = "button";
    wheel.addEventListener("click", () => bridge.setPilot({ on: true }));
    const wheelNote = h2("div", "tbh-wheel-note");
    const incognito = h2("button", "tbh-incognito", "Incognito");
    incognito.type = "button";
    incognito.title = "The bot just plays: no notes, no review after the run. Turning it on mid-run deletes that run's notes.";
    incognito.addEventListener("click", () => bridge.setPilot({ incognito: !bridge.pilot().incognito }));
    const refresh = () => {
      const s = bridge.status();
      const live = s.state === "connected";
      const here = live && Number(input.value) === s.port;
      button.hidden = here;
      connected.hidden = !here;
      dot.hidden = !live;
      const text = live ? "" : s.error ?? `connecting to :${s.port}…`;
      if (status.textContent !== text)
        status.textContent = text;
      status.hidden = text === "";
      status.dataset.state = s.error === undefined ? "wait" : "error";
      const pilot = bridge.pilot();
      wheel.hidden = pilot.state !== "off";
      wheel.disabled = !live;
      wheel.title = live ? "" : "Start the agent server first: ./scripts/agent-server.ts";
      incognito.setAttribute("aria-pressed", String(pilot.incognito));
      wheelNote.textContent = pilot.detail ?? "";
      wheelNote.hidden = pilot.detail === undefined;
    };
    const connect = (e) => {
      e.preventDefault();
      const port = Number(input.value);
      input.classList.toggle("tbh-invalid", !validPort(port));
      if (!validPort(port))
        return;
      bridge.connect(port);
    };
    const row = h2("form", "tbh-conn-row", incognito, h2("span", "tbh-conn-label", "Agent port"), input, button, connected, dot);
    row.noValidate = true;
    row.addEventListener("submit", connect);
    bridge.onChange(refresh);
    input.addEventListener("input", () => {
      input.classList.remove("tbh-invalid");
      refresh();
    });
    refresh();
    return h2("div", "tbh-conn", row, status, wheel, wheelNote);
  }
  function offerKey2(card) {
    const tip = card.dataset.tip ?? "";
    const offer = tip.match(/^(weapon|passive)-offer:([a-z0-9-]+):(\d+)$/);
    if (offer)
      return { key: `${offer[1]}:${offer[2]}`, level: Number(offer[3]) };
    const item = tip.match(/^item:([a-z0-9-]+)$/);
    if (item)
      return { key: `item:${item[1]}`, level: 1 };
    return;
  }
  function annotateCard(card, v, version) {
    const offer = offerKey2(card);
    if (offer === undefined)
      return;
    const signature = `${offer.key}|${[...v.loadout].join(",")}|${[...v.banished].join(",")}|${v.discovery.version}|${version}`;
    if (card.dataset.tbh === signature)
      return;
    card.dataset.tbh = signature;
    card.querySelector(".tbh-card")?.remove();
    card.classList.remove("tbh-card-new", "tbh-card-evo");
    const isNew = v.discovery.isNew(offer.key);
    const after = new Map(v.loadout);
    after.set(offer.key, offer.key.startsWith("item:") ? (v.loadout.get(offer.key) ?? 0) + 1 : offer.level);
    const held = (c) => v.loadout.has(partner(c, offer.key).key);
    const uses = combosUsing(v.d.combos, offer.key).filter((c) => !v.loadout.has(c.result)).sort((a, b) => Number(held(b)) - Number(held(a)));
    if (isNew)
      card.classList.add("tbh-card-new");
    if (uses.some((c) => held(c) && !v.discovery.made(c.result)))
      card.classList.add("tbh-card-evo");
    if (!isNew && uses.length === 0)
      return;
    const box = h2("div", "tbh-card");
    if (isNew)
      box.append(h2("span", "tbh-badge tbh-badge-new", "UNSEEN"));
    for (const combo of uses) {
      const other = partner(combo, offer.key);
      const ready = comboProgress(combo, after, v.d.catalog).every((s) => s === "done");
      const fresh = !v.discovery.made(combo.result);
      box.append(h2("div", `tbh-line tbh-${partState(other, v.loadout, v.d.catalog)}`, icon(v, other.key, partNeed(v, other)), h2("span", "tbh-arrow", "→"), icon(v, combo.result, fresh ? "never made" : "", fresh ? "tbh-fresh" : ""), h2("span", "tbh-result", nameOf(v.d.catalog, combo.result)), ...ready ? [h2("span", "tbh-ready-tag", "READY")] : []));
    }
    (card.querySelector(".ui-card-text") ?? card).append(box);
  }
  function guardPanelKeys() {
    for (const type of ["keydown", "keyup", "keypress"]) {
      window.addEventListener(type, (e) => e.target instanceof Element && e.target.closest("#tibo-helper") !== null && e.stopImmediatePropagation(), true);
    }
  }
  function mount(chat, footer) {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);
    const content = h2("div", "tbh-content");
    const panel = h2("div", "tbh-panel", content, footer, chat);
    panel.id = "tibo-helper";
    if (window.innerWidth < 700)
      panel.classList.add("tbh-collapsed");
    document.body.append(panel);
    return { panel, content };
  }
  function startHelper(link, discovery, bridge) {
    const { panel, content } = mount(chatBox(bridge), connectionRow(bridge));
    let collapsedBefore;
    const followPilot = () => {
      const piloting = bridge.pilot().state !== "off";
      if (piloting === panel.classList.contains("tbh-pilot"))
        return;
      panel.classList.toggle("tbh-pilot", piloting);
      if (piloting) {
        collapsedBefore = panel.classList.contains("tbh-collapsed");
        panel.classList.add("tbh-collapsed");
      } else if (collapsedBefore !== undefined)
        panel.classList.toggle("tbh-collapsed", collapsedBefore);
    };
    bridge.onChange(followPilot);
    followPilot();
    const dropStaleTip = startTips();
    let panelSignature = "";
    let queued = false;
    let version = 0;
    let lastInputs;
    const update = () => {
      queued = false;
      const hud = document.querySelector(".hud-weapons");
      const game = link.game;
      const running = game !== undefined && !game.state.over && hud !== null && isShown(hud);
      panel.classList.toggle("tbh-idle", !running);
      dropStaleTip();
      if (!running) {
        panel.classList.remove("tbh-choice", "tbh-peek");
        return;
      }
      const cards = [...document.querySelectorAll(".ui-card[data-tip]")];
      const offered = cards.map(offerKey2).filter((o) => o !== undefined);
      panel.classList.toggle("tbh-choice", offered.length > 0);
      if (offered.length === 0)
        panel.classList.remove("tbh-peek");
      const d = liveData(link);
      if (d === undefined) {
        const problem = link.error === undefined ? "Reading the game's content..." : `Can't read the game's content: ${link.error}. The game changed; tibobit needs an update.`;
        if (panelSignature !== problem)
          renderProblem(panel, content, problem);
        panelSignature = problem;
        return;
      }
      if (lastInputs?.[0] !== d || lastInputs[1] !== link.icons) {
        lastInputs = [d, link.icons];
        version++;
      }
      const loadout = readLoadout(game.state);
      discovery.settle(loadout, new Set(offered.map((o) => o.key)));
      const view = { d, discovery, icons: link.icons, loadout, banished: game.state.loadout.banished };
      const signature = `${[...loadout].join(",")}|${[...view.banished].join(",")}|${discovery.version}|${version}`;
      if (signature !== panelSignature) {
        panelSignature = signature;
        renderPanel(panel, content, view);
      }
      for (const card of cards)
        annotateCard(card, view, version);
      dropStaleTip();
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

  // src/pickShow.ts
  var SHOW_MS = 1500;
  var ARRIVE_MS = 700;
  var FRESH_MS = 8000;
  function el(className, text = "") {
    const d = document.createElement("div");
    d.className = className;
    d.textContent = text;
    return d;
  }
  function startPickShow(bridge) {
    const layer = el("tbh-pick-layer");
    const banner = el("tbh-pick-banner");
    const arrows = { down: moveIcon("down", "tbh-pick-arrow-icon"), right: moveIcon("right", "tbh-pick-arrow-icon") };
    const arrow = el("tbh-pick-arrow");
    layer.append(banner, arrow);
    document.body.append(layer);
    let show;
    const bars = new Map;
    const latestPick = () => {
      const chat = bridge.chat();
      for (let i = chat.length - 1;i >= 0; i--) {
        const m = chat[i];
        if (m?.role === "planner" && m.inspect?.kind === "plan" && m.inspect.choices !== undefined)
          return m;
      }
      return;
    };
    bridge.onChange(() => {
      const m = latestPick();
      if (m === undefined || m.id === show?.id || m.inspect?.kind !== "plan" || m.inspect.choices === undefined)
        return;
      const options = m.inspect.choices.filter((c) => c.index !== undefined);
      const chosen = options.find((c) => c.chosen)?.index;
      if (chosen === undefined)
        return;
      show = { id: m.id, seen: performance.now() - Math.max(0, Date.now() - m.at), text: m.text, options, chosen };
      for (const { bar, frame } of bars.values()) {
        bar.remove();
        frame.remove();
      }
      bars.clear();
      for (const c of options) {
        const fill = document.createElement("i");
        const label = el("tbh-pick-pct", `${Math.round((c.probability ?? 0) * 100)}%`);
        const bar = el("tbh-pick-bar");
        const track = el("tbh-pick-track");
        track.append(fill);
        fill.style.width = `${Math.round((c.probability ?? 0) * 100)}%`;
        bar.append(track, label);
        const frame = el("tbh-pick-frame");
        layer.append(bar, frame);
        bars.set(c.index ?? 0, { bar, frame });
      }
      banner.textContent = m.text;
    });
    const frame = () => {
      requestAnimationFrame(frame);
      const cards = choiceCards();
      const age = show === undefined ? Number.POSITIVE_INFINITY : performance.now() - show.seen;
      const choosing = document.querySelector(".ui-card") !== null;
      const visible = show !== undefined && bridge.pilot().state !== "off" && choosing && cards.length > 0 && age < FRESH_MS;
      layer.hidden = !visible;
      if (!visible || show === undefined)
        return;
      const done = age >= SHOW_MS;
      const arrived = age >= ARRIVE_MS;
      let top = Number.POSITIVE_INFINITY;
      let left = Number.POSITIVE_INFINITY;
      let right = 0;
      for (const [index, parts] of bars) {
        const rect = cards[index]?.getBoundingClientRect();
        const shown = rect !== undefined && rect.width > 0;
        parts.bar.hidden = parts.frame.hidden = !shown;
        if (!shown)
          continue;
        top = Math.min(top, rect.top);
        left = Math.min(left, rect.left);
        right = Math.max(right, rect.right);
        Object.assign(parts.bar.style, { left: `${rect.left}px`, top: `${rect.top - 22}px`, width: `${rect.width}px` });
        Object.assign(parts.frame.style, { left: `${rect.left - 3}px`, top: `${rect.top - 3}px`, width: `${rect.width + 6}px`, height: `${rect.height + 6}px` });
        parts.frame.classList.toggle("tbh-pick-on", arrived && index === show.chosen);
        parts.frame.classList.toggle("tbh-pick-final", done && index === show.chosen);
        parts.bar.classList.toggle("tbh-pick-dim", done && index !== show.chosen);
      }
      const pick = cards[show.chosen]?.getBoundingClientRect();
      arrow.hidden = pick === undefined || pick.width === 0;
      if (pick !== undefined && pick.width > 0) {
        const sideBySide = right - left > pick.width * 1.5;
        const icon = sideBySide ? arrows.down : arrows.right;
        if (arrow.firstChild !== icon)
          arrow.replaceChildren(icon);
        const t = Math.min(1, age / ARRIVE_MS);
        const eased = 1 - (1 - t) ** 3;
        const [fromX, fromY, toX, toY] = sideBySide ? [left, pick.top - 14, pick.left + pick.width / 2, pick.top - 14] : [left - 2, top, pick.left + 2, pick.top + pick.height / 2];
        Object.assign(arrow.style, { left: `${fromX + (toX - fromX) * eased}px`, top: `${fromY + (toY - fromY) * eased}px` });
        arrow.classList.toggle("tbh-pick-arrow-down", sideBySide);
        arrow.classList.toggle("tbh-pick-arrived", arrived);
      }
      if (Number.isFinite(top))
        Object.assign(banner.style, { left: `${(left + right) / 2}px`, top: `${top - 66}px`, maxWidth: `${Math.max(240, right - left)}px` });
    };
    requestAnimationFrame(frame);
  }

  // src/main.ts
  var link = new GameLink;
  var discovery = new Discovery;
  var controller = new Controller(link);
  Object.assign(window, { __tibobit: { link } });
  guardPanelKeys();
  function start() {
    const bridge = startBridge(link, discovery, controller);
    startHelper(link, discovery, bridge);
    startPickShow(bridge);
  }
  if (document.body === null)
    document.addEventListener("DOMContentLoaded", start, { once: true });
  else
    start();
})();
