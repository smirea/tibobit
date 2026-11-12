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
  // userscript/agent/encyclopedia.ts
  function plain(value) {
    return JSON.parse(JSON.stringify(value, (_k, v) => v instanceof Map ? Object.fromEntries(v) : v instanceof Set ? [...v] : v));
  }
  function textOf(link, kind, id) {
    const prefix = `content.${kind}.${id}.`;
    const out = {};
    for (const [key, lines] of Object.entries(link.messages))
      if (key.startsWith(prefix) && lines.length > 0)
        out[key.slice(prefix.length)] = lines.join(`
`);
    return out;
  }
  function encyclopedia(link) {
    const table = link.table;
    if (table === undefined || !link.ready)
      return;
    const withText = (kind, defs) => defs.map((d) => ({ ...textOf(link, kind, d.id), ...plain(d) }));
    const tabled = new Set(["weapon", "passive", "item", "enemy", "boss", "dog", "poi", "biome", "event", "botHelp"]);
    const messages = {};
    for (const [key, lines] of Object.entries(link.messages)) {
      const kind = key.match(/^content\.([^.]+)\./)?.[1];
      if (kind !== undefined && !tabled.has(kind) && lines.length > 0)
        messages[key] = lines.join(`
`);
    }
    return {
      capturedAt: Date.now(),
      weapons: withText("weapon", table.allWeapons),
      passives: withText("passive", table.passives),
      items: withText("item", table.allItems),
      enemies: withText("enemy", table.enemies),
      bosses: table.bossIds.map((id) => ({ id, ...textOf(link, "boss", id) })),
      dogs: withText("dog", table.dogs),
      pois: table.pois.map((p) => ({ ...textOf(link, "poi", p.kind), ...plain(p) })),
      events: withText("event", table.events),
      botHelps: withText("botHelp", table.botHelps),
      biomes: withText("biome", table.biomes),
      messages
    };
  }

  // protocol/address.ts
  var BRIDGE_PORT = 7357;
  var localOrigin = (port) => `http://127.0.0.1:${port}`;
  var BRIDGE_ORIGIN = localOrigin(BRIDGE_PORT);
  function validPort(port) {
    return Number.isInteger(port) && port >= 1 && port <= 65535;
  }
  var BRIDGE_ORIGIN_GLOBAL = "__tiboBridgeOrigin";

  // protocol/geometry.ts
  var TICKS_PER_SECOND = 60;
  var DIRECTIONS = ["right", "down-right", "down", "down-left", "left", "up-left", "up", "up-right"];
  var STILL = { x: 0, y: 0 };
  function unitOf(heading) {
    const radians = (typeof heading === "number" ? heading : DIRECTIONS.indexOf(heading) * 45) * Math.PI / 180;
    return { x: Math.cos(radians), y: Math.sin(radians) };
  }
  function directionOf(dx, dy) {
    const octant = Math.round(Math.atan2(dy, dx) / (Math.PI / 4));
    return DIRECTIONS[(octant + 8) % 8] ?? "right";
  }

  // protocol/parse.ts
  function fail(message) {
    throw new Error(message);
  }
  function num(v, what) {
    return typeof v === "number" && Number.isFinite(v) ? v : fail(`${what} must be a number`);
  }

  // protocol/commands.ts
  var CHOICE_ACTIONS = ["pick", "banish", "buy", "reroll", "skip", "close", "accept", "continue", "endRun"];
  var CHECKPOINT_NAME = /^[\w.@-]{1,100}$/;
  var SEED = /^[0-9A-Z]{1,7}$/;

  class CommandFailure extends Error {
    failure;
    offered;
    constructor(failure, message, offered) {
      super(message);
      this.failure = failure;
      this.offered = offered;
    }
  }
  var GAME_MODES = ["openWorld", "daily"];
  var DIFFICULTIES = ["easy", "normal", "hard", "nightmare", "highest"];
  var isDifficulty = (v) => DIFFICULTIES.includes(v);
  var playedOn = (difficulty, nightmareLevel) => difficulty === "nightmare" && nightmareLevel !== undefined ? `nightmare-${nightmareLevel}` : difficulty;
  var isGameMode = (v) => GAME_MODES.includes(v);
  function heading(v, what) {
    if (typeof v === "number" && Number.isFinite(v))
      return v;
    if (typeof v === "string" && DIRECTIONS.includes(v))
      return v;
    return fail(`${what} must be one of ${DIRECTIONS.join(", ")} or degrees`);
  }
  var ROUTE_DEFAULTS = { stay: 0, seconds: 4, leg: 0.5 };
  function route(v) {
    const r = v ?? {};
    if (r.stay !== undefined && (num(r.stay, "route.stay") < 0 || num(r.stay, "route.stay") > 5))
      fail("route.stay must be from 0 to 5 seconds");
    if (r.seconds !== undefined && (num(r.seconds, "route.seconds") < 0.5 || num(r.seconds, "route.seconds") > 6))
      fail("route.seconds must be from 0.5 to 6");
    if (r.leg !== undefined && (num(r.leg, "route.leg") < 0.1 || num(r.leg, "route.leg") > 2))
      fail("route.leg must be from 0.1 to 2");
    return { to: target(r.to), ...r.stay === undefined ? {} : { stay: num(r.stay, "route.stay") }, ...r.seconds === undefined ? {} : { seconds: num(r.seconds, "route.seconds") }, ...r.leg === undefined ? {} : { leg: num(r.leg, "route.leg") } };
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
  function leveled(v, what, field) {
    if (v === undefined)
      return [];
    if (!Array.isArray(v))
      return fail(`${what} must be a list of {id, ${field}}`);
    return v.map((x, i) => {
      if (typeof x?.id !== "string")
        fail(`${what}[${i}].id must be an id`);
      const n = x[field] === undefined ? 1 : num(x[field], `${what}[${i}].${field}`);
      if (!Number.isInteger(n) || n < 1)
        fail(`${what}[${i}].${field} must be a whole number from 1`);
      return { id: x.id, level: n };
    });
  }
  function shrineTotals(v) {
    if (typeof v !== "object" || v === null || Array.isArray(v))
      return fail("shrineTotals must be an object of the game's stat names to numbers");
    return Object.fromEntries(Object.entries(v).map(([stat, n]) => [stat, num(n, `shrineTotals.${stat}`)]));
  }
  function parseLoadout(c) {
    const hp = c.hp === undefined || c.hp === "full" ? c.hp : num(c.hp, "hp");
    return {
      weapons: leveled(c.weapons, "weapons", "level"),
      passives: leveled(c.passives, "passives", "level"),
      items: leveled(c.items, "items", "count").map(({ id, level }) => ({ id, count: level })),
      ...c.gold === undefined ? {} : { gold: num(c.gold, "gold") },
      ...hp === undefined ? {} : { hp },
      ...c.shrineTotals === undefined ? {} : { shrineTotals: shrineTotals(c.shrineTotals) }
    };
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
      case "choose": {
        const a = c.action ?? {};
        if (!CHOICE_ACTIONS.includes(a.type))
          fail(`action.type must be one of ${CHOICE_ACTIONS.join(", ")}`);
        const type = a.type;
        return type === "pick" || type === "banish" || type === "buy" ? { type: "choose", action: { type, index: num(a.index, "action.index") } } : { type: "choose", action: { type } };
      }
      case "speed": {
        const factor = num(c.factor, "factor");
        if (!Number.isInteger(factor) || factor < 1 || factor > 8)
          fail("factor must be a whole number from 1 to 8");
        return { type: "speed", factor };
      }
      case "forecast":
        if (typeof c.live !== "boolean")
          fail("live must be true or false");
        if (c.lag !== undefined && (num(c.lag, "lag") < 0 || num(c.lag, "lag") > 1))
          fail("lag must be from 0 to 1 seconds");
        if (c.seconds !== undefined && (num(c.seconds, "seconds") < 0.1 || num(c.seconds, "seconds") > 2))
          fail("seconds must be from 0.1 to 2");
        return {
          type: "forecast",
          live: c.live,
          ...c.lag === undefined ? {} : { lag: num(c.lag, "lag") },
          ...c.seconds === undefined ? {} : { seconds: num(c.seconds, "seconds") },
          ...c.route === undefined ? {} : { route: route(c.route) }
        };
      case "dash":
        return c.dir === undefined ? { type: "dash" } : { type: "dash", dir: heading(c.dir, "dir") };
      case "start": {
        const d = c.difficulty;
        if (d !== undefined && !isDifficulty(d))
          fail(`difficulty must be one of ${DIFFICULTIES.join(", ")}`);
        const m = c.mode;
        if (m !== undefined && !isGameMode(m))
          fail(`mode must be one of ${GAME_MODES.join(", ")}`);
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
      case "seed": {
        const seed = typeof c.seed === "string" ? c.seed.toUpperCase() : "";
        if (!SEED.test(seed) || parseInt(seed, 36) > 4294967295)
          fail("seed must be a run seed such as 1SXG9XB");
        return { type: "seed", seed };
      }
      case "checkpoint": {
        if (c.op !== "save" && c.op !== "load" && c.op !== "drop")
          fail("op must be save, load or drop");
        if (typeof c.name !== "string" || !CHECKPOINT_NAME.test(c.name))
          fail("name must be letters, digits, _ . @ or -");
        return { type: "checkpoint", op: c.op, name: c.name };
      }
      case "loadout":
        return { type: "loadout", ...parseLoadout(c) };
      default:
        return fail("type must be move, goto, stop, choose, dash, pause, resume, speed, forecast, start, summary, seed, checkpoint or loadout");
    }
  }

  // userscript/link/screen.ts
  var PANEL_ID = "tibo-helper";
  var OURS = `#${PANEL_ID}, [class*='tbh-']`;
  function button(label) {
    return [...document.querySelectorAll("button")].find((b) => {
      if (b.closest(OURS))
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
  function pauseMenuOpen() {
    return [...document.querySelectorAll("button")].some((b) => !b.closest(OURS) && b.textContent?.trim() === "Resume" && b.getClientRects().length > 0);
  }
  function inRun(link) {
    const hud = document.querySelector(".hud-weapons");
    return link.game !== undefined && !link.game.state.over && hud !== null && hud.getClientRects().length > 0;
  }

  // userscript/agent/reflect.ts
  var NOT_STATE = {
    "": ["rng", "spawnRng", "lootRng", "botRng", "hits", "hash", "buf", "scratch", "attack", "damageRing", "effects", "fx", "colors", "colorIndex", "sourceColors", "recordEvents", "events", "itemFx"],
    world: ["chunks", "activeChunks", "temp", "moist", "height", "biomeByBand"]
  };
  var isPool = (v) => {
    const p = v.pool;
    return typeof p?.slotAt === "function" && typeof p.isAlive === "function";
  };
  function flagNames(flags) {
    return (n) => Object.entries(flags).filter(([, bit]) => bit !== 0 && (n & bit) === bit).map(([name]) => name);
  }
  function resolvers(link, s, table) {
    const enums = link.enums;
    const name = (m) => {
      const byNumber = new Map(Object.entries(m ?? {}).map(([k, v]) => [v, k]));
      return (n) => byNumber.get(n) ?? n;
    };
    const sources = s.sources ?? [];
    const source = (n) => sources[n] ?? n;
    return {
      enemies: { def: (n) => table.enemyAt(n)?.id ?? n, flags: enums === undefined ? (n) => n : flagNames(enums.enemyFlags) },
      bosses: { def: (n) => table.bossIdAt(n) ?? n },
      pets: { breed: (n) => table.dogAt(n)?.id ?? n },
      grokBots: { help: (n) => table.botHelpAt(n)?.id ?? n, mode: name(enums?.botModes) },
      pickups: { kind: (n) => enums?.pickupKinds[n] ?? n, source: (n) => enums?.pickupSources[n] ?? n },
      zones: { kind: name(enums?.zoneKinds), shape: name(enums?.zoneShapes) },
      "*": { src: source, burnSrc: source, lastSrc: source }
    };
  }
  function contentIds(table) {
    const ids = new WeakMap;
    const lists = [table.allWeapons, table.passives, table.allItems, table.enemies, table.dogs, table.events, table.botHelps, table.biomes];
    for (const list of lists)
      for (const d of list)
        if (typeof d === "object" && d !== null && typeof d.id === "string")
          ids.set(d, d.id);
    return ids;
  }
  function reflect(link, s) {
    const table = link.table;
    if (table === undefined)
      throw new Error("game content not loaded");
    const resolve = resolvers(link, s, table);
    const ids = contentIds(table);
    const path = new Set;
    const value = (v, at) => {
      if (typeof v === "function")
        return;
      if (typeof v === "number")
        return Number.isFinite(v) ? v : String(v);
      if (typeof v !== "object" || v === null)
        return v;
      const id = ids.get(v);
      if (id !== undefined)
        return id;
      if (ArrayBuffer.isView(v)) {
        const list = Array.from(v);
        return at.startsWith("run.dogHelp.") ? Object.fromEntries(list.map((n, i) => [table.dogAt(i)?.id ?? String(i), n])) : list;
      }
      if (path.has(v))
        return "(cycle)";
      path.add(v);
      try {
        if (isPool(v))
          return rows(v, at);
        if (v instanceof Map)
          return Object.fromEntries([...v].map(([k, x]) => [String(k), value(x, `${at}.${String(k)}`)]));
        if (v instanceof Set)
          return [...v].map((x) => value(x, at));
        if (Array.isArray(v))
          return v.map((x) => value(x, at));
        const skip = NOT_STATE[at] ?? [];
        const out = {};
        for (const k of Object.keys(v)) {
          if (skip.includes(k))
            continue;
          const raw = v[k];
          const r = resolve["*"]?.[k];
          const x = r !== undefined && typeof raw === "number" ? r(raw) : value(raw, at === "" ? k : `${at}.${k}`);
          if (x !== undefined)
            out[k] = x;
        }
        const proto = Object.getPrototypeOf(v);
        if (proto !== null && proto !== Object.prototype)
          for (const [k, d] of Object.entries(Object.getOwnPropertyDescriptors(proto))) {
            if (d.get === undefined || k in out)
              continue;
            try {
              const x = value(v[k], `${at}.${k}`);
              if (x !== undefined)
                out[k] = x;
            } catch {}
          }
        return out;
      } finally {
        path.delete(v);
      }
    };
    const rows = (p, at) => {
      const own = resolve[at.split(".").at(-1) ?? ""] ?? {};
      const columns = Object.keys(p).filter((k) => k !== "pool" && ArrayBuffer.isView(p[k]));
      const out = [];
      for (let n = 0;n < p.pool.count; n++) {
        const slot = p.pool.slotAt(n);
        if (slot < 0 || !p.pool.isAlive(slot))
          continue;
        const row = { uid: p.pool.id(slot), slot };
        for (const c of columns) {
          const raw = p[c][slot] ?? 0;
          const r = own[c] ?? resolve["*"]?.[c];
          row[c] = r === undefined ? raw : r(raw);
        }
        out.push(row);
      }
      return out;
    };
    return value(s, "");
  }

  // userscript/agent/surroundings.ts
  var REACH = 300;
  var NEAR = 60;
  var WINDOW_TICKS = 3 * TICKS_PER_SECOND;
  var takenHistory = [];
  var dealtHistory = [];
  function recent(history, s, tally) {
    if ((history.at(-1)?.tick ?? 0) > s.tick)
      history.length = 0;
    history.push({ tick: s.tick, totals: new Map(tally) });
    while (history.length > 1 && (history[1]?.tick ?? 0) <= s.tick - WINDOW_TICKS)
      history.shift();
    const first = history[0] ?? { tick: s.tick, totals: new Map };
    const grown = new Map;
    for (const [source, total] of tally)
      grown.set(source, total - (first.totals.get(source) ?? 0));
    return { seconds: (s.tick - first.tick) / TICKS_PER_SECOND, grown };
  }
  function recentHurt(s) {
    const out = {};
    for (const [source, taken] of recent(takenHistory, s, s.run.damageTakenBySource).grown)
      if (taken >= 0.5)
        out[source] = round(taken);
    return out;
  }
  function recentDps(s) {
    const { seconds, grown } = recent(dealtHistory, s, s.run.damageBySource);
    let dealt = 0;
    for (const amount of grown.values())
      dealt += amount;
    return seconds === 0 ? 0 : round(dealt / seconds);
  }
  var PATH_SAMPLES = [0.25, 0.5, 0.75, 1];
  var round = (n) => Math.round(n * 10) / 10;
  var bearing = (dx, dy) => ({ dist: round(Math.hypot(dx, dy)), dir: directionOf(dx, dy) });
  function* alive(p) {
    for (let n = 0;n < p.pool.count; n++) {
      const slot = p.pool.slotAt(n);
      if (slot >= 0 && p.pool.isAlive(slot))
        yield slot;
    }
  }
  function surroundings(link, s, seconds, rows) {
    const px = s.player.x[s.me] ?? 0;
    const py = s.player.y[s.me] ?? 0;
    const elites = rows.enemies.filter((e) => Array.isArray(e.flags) && e.flags.includes("Elite")).map((e) => ({ ...e, ...bearing(Number(e.x) - px, Number(e.y) - py) })).sort((a, b) => a.dist - b.dist);
    const counts = {};
    const value = { xp: 0, gold: 0 };
    const items = [];
    for (const p of rows.pickups) {
      const kind = String(p.kind);
      counts[kind] = (counts[kind] ?? 0) + 1;
      const dx = Number(p.x) - px;
      const dy = Number(p.y) - py;
      if (kind === "xp" || kind === "gold")
        value[kind] += Number(p.value) || 0;
      else
        items.push({ ...p, ...bearing(dx, dy) });
    }
    items.sort((a, z) => a.dist - z.dist);
    return { seconds, hurtBy: recentHurt(s), dps: recentDps(s), ...threats(link, s, seconds), elites, pickups: { counts, value: { xp: round(value.xp), gold: round(value.gold) }, items } };
  }
  function threats(link, s, seconds) {
    const enums = link.enums;
    const me = s.me;
    const px = s.player.x[me] ?? 0;
    const py = s.player.y[me] ?? 0;
    const radius = s.player.radius[me] ?? 6;
    const reach = s.cfg.player.baseSpeed * s.loadout.stats.moveSpeedMult * seconds;
    const halfW = s.view.width / 2;
    const halfH = s.view.height / 2;
    const hidden = enums?.enemyFlags.Hidden ?? 0;
    const byDirection = Object.fromEntries(DIRECTIONS.map((d) => [d, 0]));
    let onScreen = 0;
    let near = 0;
    for (const i of alive(s.enemies)) {
      if ((s.enemies.flags[i] ?? 0) & hidden)
        continue;
      const dx = (s.enemies.x[i] ?? 0) - px;
      const dy = (s.enemies.y[i] ?? 0) - py;
      if (Math.hypot(dx, dy) <= NEAR)
        near++;
      if (Math.abs(dx) > halfW || Math.abs(dy) > halfH)
        continue;
      onScreen++;
      byDirection[directionOf(dx, dy)]++;
    }
    const bullets = [];
    const b = s.bullets;
    for (const i of alive(b)) {
      const dx = (b.x[i] ?? 0) - px;
      const dy = (b.y[i] ?? 0) - py;
      const vx = b.vx[i] ?? 0;
      const vy = b.vy[i] ?? 0;
      const v2 = vx * vx + vy * vy;
      const t = v2 === 0 ? 0 : Math.max(0, -(dx * vx + dy * vy) / v2);
      if (t > seconds)
        continue;
      const gap = Math.hypot(dx + vx * t, dy + vy * t);
      if (gap > radius + (b.radius[i] ?? 0))
        continue;
      bullets.push({ from: directionOf(dx, dy), in: Math.round(t * 100) / 100, damage: round(b.damage[i] ?? 0) });
    }
    bullets.sort((x, y) => x.in - y.in);
    const volleys = [];
    for (const i of alive(s.emitters)) {
      const dx = (s.emitters.x[i] ?? 0) - px;
      const dy = (s.emitters.y[i] ?? 0) - py;
      if (Math.hypot(dx, dy) > REACH)
        continue;
      volleys.push({ ...bearing(dx, dy), firesIn: round(s.emitters.telegraph[i] ?? 0), count: s.emitters.count[i] ?? 0, bursts: s.emitters.burstsLeft[i] ?? 0, damage: round(s.emitters.damage[i] ?? 0) });
    }
    volleys.sort((x, y) => x.dist - y.dist);
    const inPool = link.inPool;
    const paths = DIRECTIONS.map((dir) => {
      const u = unitOf(dir);
      return { dir, points: PATH_SAMPLES.map((f) => ({ x: u.x * reach * f, y: u.y * reach * f })) };
    });
    const entered = (contains) => paths.filter((p) => p.points.some((q) => contains(q.x, q.y))).map((p) => p.dir);
    const zoneKind = Object.fromEntries(Object.entries(enums?.zoneKinds ?? {}).map(([k, v]) => [v, k]));
    const zoneShape = Object.fromEntries(Object.entries(enums?.zoneShapes ?? {}).map(([k, v]) => [v, k]));
    const attacks = [];
    for (const i of alive(s.zones)) {
      if (s.zones.hostile[i] !== 1)
        continue;
      const r = s.zones.radius[i] ?? 0;
      const shape = zoneShape[s.zones.shape[i] ?? 0] ?? "circle";
      const ax = (s.zones.x[i] ?? 0) - px;
      const ay = (s.zones.y[i] ?? 0) - py;
      const poolShape = s.zones.poolShape[i] ?? 0;
      const turn = s.zones.turn[i] ?? 0;
      let contains = (x, y) => poolShape !== 0 && inPool !== undefined ? inPool(poolShape, turn, x - ax, y - ay, r, 0) : Math.hypot(x - ax, y - ay) <= r;
      let nearest = { x: ax, y: ay };
      if (shape === "line") {
        const angle = s.zones.angle[i] ?? 0;
        const length = s.zones.length[i] ?? 0;
        const ux = Math.cos(angle);
        const uy = Math.sin(angle);
        const closest = (x, y) => {
          const t = Math.max(0, Math.min(length, (x - ax) * ux + (y - ay) * uy));
          return { x: ax + ux * t, y: ay + uy * t };
        };
        contains = (x, y) => {
          const c = closest(x, y);
          return Math.hypot(x - c.x, y - c.y) <= r;
        };
        nearest = closest(0, 0);
      }
      const at = bearing(nearest.x, nearest.y);
      if (at.dist - r > REACH)
        continue;
      const kind = zoneKind[s.zones.kind[i] ?? -1] ?? String(s.zones.kind[i]);
      attacks.push({ ...at, kind, shape, inside: contains(0, 0), ...kind === "telegraph" ? { landsIn: round(s.zones.delay[i] ?? 0) } : {}, enters: entered(contains) });
    }
    attacks.sort((x, y) => x.dist - y.dist);
    const underfoot = [];
    const hazardPaths = {};
    for (const h of s.world.activeHazards) {
      const cx = h.x - px;
      const cy = h.y - py;
      if (Math.hypot(cx, cy) - h.radius > REACH)
        continue;
      const contains = (x, y) => inPool === undefined ? Math.hypot(x - cx, y - cy) <= h.radius : inPool(h.poolShape, h.turn, x - cx, y - cy, h.radius, 0);
      if (contains(0, 0)) {
        if (!underfoot.includes(h.kind))
          underfoot.push(h.kind);
        continue;
      }
      for (const dir of entered(contains)) {
        const list = hazardPaths[dir] ??= [];
        if (!list.includes(h.kind))
          list.push(h.kind);
      }
    }
    return { enemies: { onScreen, near, byDirection }, bullets, volleys, attacks, hazards: { underfoot, byDirection: hazardPaths } };
  }

  // userscript/agent/snapshot.ts
  function gameStorage() {
    const out = {};
    try {
      for (let i = 0;i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === null || !key.startsWith("tibo."))
          continue;
        const raw = localStorage.getItem(key) ?? "";
        try {
          out[key] = JSON.parse(raw);
        } catch {
          out[key] = raw;
        }
      }
    } catch {}
    return out;
  }
  var json = (v) => JSON.parse(JSON.stringify(v, (_k, x) => x instanceof Map ? Object.fromEntries(x) : x instanceof Set ? [...x] : x));
  function snapshot(link, commands, forecast, seconds) {
    link.noteRunLink();
    const game = link.game;
    const playing = game !== undefined && inRun(link);
    const runMode = game === undefined ? undefined : game.state.daily === undefined ? "openWorld" : "daily";
    const mode = playing ? runMode : modeScreen() ?? runMode;
    const loaded = game !== undefined && link.table !== undefined && link.ready;
    const reflection = loaded ? reflect(link, game.state) : undefined;
    const screen = game === undefined || !playing && !game.state.over ? "title" : game.state.over ? "over" : game.state.choiceQueue.length > 0 ? "choice" : game.state.paused || pauseMenuOpen() ? "paused" : "run";
    return {
      capturedAt: Date.now(),
      screen,
      ...reflection === undefined ? {} : { game: reflection, gameEvents: link.events.map(json) },
      ...reflection === undefined || !playing ? {} : { surroundings: surroundings(link, game.state, seconds, { enemies: reflection.enemies ?? [], pickups: reflection.pickups ?? [] }) },
      storage: gameStorage(),
      headless: navigator.webdriver,
      ...link.simBuild === undefined ? {} : { gameBuild: link.simBuild },
      ...forecast === undefined || !playing ? {} : { forecast },
      commands,
      ...link.error === undefined ? {} : { error: link.error },
      ...link.runLink === undefined ? {} : { lastRunLink: link.runLink },
      ...mode === undefined ? {} : { mode }
    };
  }

  // protocol/drive.ts
  var EXAMPLE_REQUEST = "Farm xp by walking toward the fewest enemies. Open gold chests and chests and grab magnets when they are close, and use Spud Shrines while it is calm. Under 40% health, eat food if there is any; otherwise get away, dashing when hit hard, and keep clear until health is back over 70%.";
  var EXAMPLE_CODE = `type Memory = { retreating?: boolean };

function drive(state: State, memory: Memory): Action {
  const { tibo, enemies } = state;
  const pickups = state.pickups.filter((p) => !p.gaveUp);
  const pois = state.pois.filter((p) => !p.gaveUp);
  const health = (tibo.hp / tibo.maxHp) * 100;
  if (health < 40) memory.retreating = true;
  if (health >= 70) memory.retreating = false;

  if (memory.retreating) {
    const heal = pickups.find((p) => p.kind === "heal");
    if (heal) return { type: "pickup", id: heal.id, why: "retreat: eat" };
    if (tibo.hurt > 15) return { type: "dash", dir: enemies.fewest, why: "retreat: dash out" };
    return { type: "move", dir: enemies.fewest, why: "retreat" };
  }

  const goldChest = pickups.find((p) => p.kind === "goldChest" && p.dist < 700);
  if (goldChest) return { type: "pickup", id: goldChest.id, why: "open the gold chest" };

  const chest = pickups.find((p) => p.kind === "chest" && p.dist < 500);
  if (chest) return { type: "pickup", id: chest.id, why: "open the chest" };

  const magnet = pickups.find((p) => p.kind === "magnet" && p.dist < 400);
  if (magnet && state.ground.xp > 50) return { type: "pickup", id: magnet.id, why: "grab the magnet" };

  const shrine = pois.find((p) => p.kind === "chargeShrine" && p.dist < 400);
  if (shrine && enemies.onScreen < 25) return { type: "poi", id: shrine.id, why: "charge the Spud Shrine" };

  return { type: "move", dir: enemies.fewest, why: "farm" };
}`;

  // protocol/pilot.ts
  var PICK_SHOW_MS = 2000;
  var ACTION_TAGS = [
    ...["Loot", "Wander", "Run", "Eat", "Hunt", "Spot"],
    ...["Pet", "Kennel", "Crate", "Shrine", "Curse", "Golden", "Farm", "Shop", "Microwave", "Nest", "Lair", "Bot", "Whetstone", "Bell", "Slots", "Vault", "Magnet", "Tunnel", "Light", "Freezer", "Fryer"],
    ...["Dash", "Hold", "Start", "Take over", "Over", "Stopped"]
  ];
  var SPOT_TAGS = {
    dog: "Pet",
    dogKennel: "Kennel",
    paidChest: "Crate",
    chargeShrine: "Shrine",
    curseShrine: "Curse",
    goldenShrine: "Golden",
    crops: "Farm",
    vendor: "Shop",
    microwave: "Microwave",
    eliteNest: "Nest",
    bossLair: "Lair",
    botDock: "Bot",
    whetstone: "Whetstone",
    dinnerBell: "Bell",
    taterSlots: "Slots",
    seedVault: "Vault",
    taterMagnet: "Magnet",
    rootTunnel: "Tunnel",
    taterLantern: "Light",
    spudFreezer: "Freezer",
    frenzyFryer: "Fryer"
  };
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

  // bot/limits.ts
  var GIVE_UP_SECONDS = 45;
  var HURT_SECONDS = 3;

  // bot/templates.ts
  var BLOCKS = {
    time: "game time as m:ss",
    difficulty: "the run's difficulty, such as nightmare",
    mode: "daily or world",
    health: "health, its share of max and its trend over the last 30 seconds, e.g. 'Health 80/120 (67%, down from 90% 25 seconds ago).' It adds ', which is low' under 40%",
    level: "level and the share of the way to the next",
    gold: "gold held",
    dash: "dash charges",
    weapons: "weapons held (of 6 slots), each with its level and the game's description",
    passives: "passives held (of 6 slots), each with its level and the game's description",
    items: "items held with counts and the game's descriptions",
    banished: "what was banished this run, which the game never offers again",
    recipes: "every recipe that uses something held, with each part's state",
    evolutions: "what the next chest evolves, or that no recipe is complete",
    standing_on: "the chest or spot Tibo stands on and how far it is charged, and the ground damage sources standing still would take, by the forecast",
    hurt_by: "damage taken in the last 3 seconds by source",
    dps: "damage dealt a second over the last 3 seconds, e.g. 'Damage dealt a second over the last 3 seconds: 412.' (not part of {{state}})",
    bosses: "bosses with distance, direction and health",
    enemies: "enemies on screen, and the directions with the most and the fewest",
    current_goal: "the goal under way and since when",
    recent_goals: "the last 6 goals and how each ended",
    weapon_damage: "damage dealt so far by each weapon held, most first, with its rate a minute, e.g. 'Damage dealt so far by weapon: Steam Vent 4012 (1783 a minute), Hash Hawk 2210 (982 a minute).' (not part of {{state}})",
    stats: "every effective stat by the game's own name (damageMult, maxHp, armor, recovery, magnetRadius, luck and the rest), and what Spud Shrines have added",
    resources: "rerolls, skips, banishes and revives left, and the curses held with the extra elites and bosses they add",
    buffs: "timed boosts running (the game's gold rush, frenzy and the like), with seconds left",
    schedule: "the next boss, elite and event, by the game's names, with the time each comes",
    elites: "every elite alive: name, health, contact damage, distance and direction",
    hazards: "within the forecast's horizon: the game's hazard kinds underfoot and in each direction's path, attack zones near Tibo (kind, shape, whether Tibo is inside, when a telegraph lands, which directions walk into it), and bullets that would hit a Tibo standing still",
    pickups: "the total xp and gold on the ground, and the chests, food and other pickups with their distance and direction",
    spots: "every unused spot on the loaded map, nearest first, with the game's name and description, distance, direction, charge, radius and price",
    dogs: "each of Tibo's dogs: name, breed, the game's description, level, the game's own definition (ability, aura, levelUps and the rest) and what it has done so far by the game's counts",
    events: "what the game showed in the last 15 seconds (boss arrivals, banners, chests), with the times",
    counters: "every number in the game's counters and run that is not zero: distance, hits, crits, nearMisses, dodgePoints, peakEnemies, goldEarned, shrinesUsed and the rest",
    offer: "the choice open now, for the picker: everything Tibo has equipped with the game's descriptions, every option offered with its description (a new weapon, passive or item marked when it leads to an evolution), and every evolution recipe that can still be found",
    state: "a short default, one per line: time, health, level, gold, dash, weapons, passives, items, banished (when any), recipes, evolutions, standing_on, hurt_by, bosses, enemies, current_goal and recent_goals. Every other block is left out unless a template names it"
  };
  var KNOBS = {
    exploreDistance: { min: 100, max: 1500, about: "units an explore goal walks before it ends; it also ends at the first chest never listed before" },
    evadeSeconds: { min: 2, max: 30, about: "seconds an evade goal lasts" },
    stuckSeconds: { min: 2, max: 20, about: "seconds without getting closer (or charging) before a goal is given up" },
    extraDamage: { min: 0, max: 0.25, about: "share of max health a move may cost over the cheapest move within the forecastSeconds horizon and still be taken: the page walks Tibo to the goal on its own while the way there costs no more than this over the cheapest, and the action model is never offered a move that costs more" },
    safeMargin: { min: 0, max: 0.5, about: "how far above the safest move's hurt rating (as a share of the scale) a move may be and still compete on usefulness" },
    distrustSeconds: { min: 0, max: 30, about: "after Tibo loses health on a step the forecast called free (a walk row), the action model is asked about every step for this many seconds instead of the page walking on its own; 0 trusts the forecast" },
    bossOfferRange: { min: 0, max: 600, about: "while a boss is within this many units, the action model is offered every move, even those the one-second forecast prices above extraDamage, since boss attacks are not in that forecast; 0 keeps the usual rule" },
    eliteSeconds: { min: 5, max: 60, about: "seconds a fight-the-elite goal lasts at most: Tibo heads for the elite and keeps it within reach of its weapons until it dies" },
    forecastSeconds: { min: 0.1, max: 2, about: "how far ahead the game's own simulation prices each move, and how far surroundings look for bullets that would hit, attacks and hazards on each path, in seconds; the action model weighs moves by what they cost over this horizon" },
    autopilot: { min: 0, max: 1, about: "1 takes every step without the action model: of the moves the forecast allows (those within extraDamage of the cheapest), Tibo takes the one nearest the way to the goal, and of two as near the cheaper; it never dashes and no action template is used. 0 asks the action model, as before. In the loop manager's own gym tests at minute 10, a mover that read only the forecast's prices lost no more health per trip than either action-model format, and it answers at once" },
    planEvery: { min: 1, max: 60, about: "seconds between planner calls while a goal is under way (it is also asked whenever a goal ends, a choice opens, a card is taken or a boss appears); short re-plans switch goals often, long ones let a goal finish. A person watching in the panel sets this instead" },
    distrustBossRange: { min: 0, max: 600, about: "while a boss is within this many units, the action model is asked about every step, since boss attacks from afar are not in the one-second forecast; 0 turns it off" },
    dashThreshold: { min: 0.05, max: 0.95, about: "how sure the action model's answer to action.dash must be (a probability) for Tibo to dash; lower dashes more often" },
    bossDashThreshold: { min: 0.05, max: 0.95, about: "the dash threshold instead of dashThreshold while a boss is within bossDashRange" },
    bossDashRange: { min: 0, max: 600, about: "while a boss is within this many units, bossDashThreshold applies; 0 never" },
    eliteFrom: { min: 0, max: 1200, about: "game seconds before which no fight-the-elite goal is offered, so the planner cannot pick one; 0 offers them from the start" },
    eliteMinHp: { min: 0, max: 1, about: "share of max health below which no fight-the-elite goal is offered; 0 offers them at any health" },
    holdAbortHurt: { min: 0, max: 0.5, about: `share of max health lost within the last ${HURT_SECONDS} seconds at which a goal that holds Tibo in place ends as given up and the planner is asked: standing on a chest, a shrine or another spot, or keeping an elite within reach. For ${GIVE_UP_SECONDS} seconds the planner then reads next to that target that Tibo gave up on it and why, like any goal given up; it can still pick it. 0 never ends a goal this way` },
    planOnHurt: { min: 0, max: 0.5, about: `share of max health lost within the last ${HURT_SECONDS} seconds at which the planner is asked at once, whatever planEvery says, and at most once in ${HURT_SECONDS} seconds; the goal under way goes on unless the planner picks another. 0 never asks for this` }
  };
  var DEFAULT_TEMPLATES = {
    planner: {
      state: [
        "You plan for Tibo, a potato hero in tibo.dog, a survivors game. Weapons fire on their own. Tibo walks wherever its goal takes it, and you choose the upgrades and what Tibo goes after next.",
        "The aim: survive 20 minutes on {{difficulty}}.",
        "Asked now because {{why}}. State now:",
        "{{state}}"
      ].join(`

`),
      goal: "If Tibo's next goal is to {{goal}}: is that the best thing for Tibo to do now, to survive and grow stronger?",
      pick: "Tibo is at a {{choice}}. Which option makes Tibo strongest?"
    },
    action: {
      state: `Tibo is a potato hero in a survivors game. Weapons fire on their own; Tibo only walks.
Goal: {{goal}}.
{{health}}`,
      hurt: "If Tibo does this: {{move}}. How badly does it hurt Tibo?",
      useful: "If Tibo does this: {{move}}. Does it bring Tibo closer to its goal ({{goal}})?",
      dash: "Is Tibo about to be hit or surrounded, so a quick dash away would save it?"
    },
    knobs: { exploreDistance: 300, evadeSeconds: 8, stuckSeconds: 6, extraDamage: 0.02, safeMargin: 0.1, distrustSeconds: 0, distrustBossRange: 0, planEvery: 5, eliteSeconds: 20, bossOfferRange: 0, dashThreshold: 0.5, bossDashThreshold: 0.5, bossDashRange: 0, eliteFrom: 0, eliteMinHp: 0, forecastSeconds: 0.5, autopilot: 0, holdAbortHurt: 0, planOnHurt: 0 }
  };
  var QUESTION_LIMIT = 800;

  // bot/drive.ts
  var EMBEDS = { ...BLOCKS, choice: "level-up, chest or shrine" };
  function loadoutErrors(loadout) {
    const errors = [...new Set([...loadout.matchAll(/\{\{([\w.]+)\}\}/g)].map((m) => m[1] ?? ""))].filter((name) => !(name in EMBEDS)).map((name) => `{{${name}}} is not part of the state`);
    if (loadout.includes("~~~"))
      errors.push("~~~ is not allowed");
    if (loadout.trim() === "")
      errors.push("the picker needs a question");
    if (loadout.length > QUESTION_LIMIT)
      errors.push(`${loadout.length} characters; keep it under ${QUESTION_LIMIT}`);
    return errors;
  }

  // userscript/fsd/draft.ts
  var DEFAULT_DRAFT = { prompt: EXAMPLE_REQUEST, code: EXAMPLE_CODE, builtFrom: EXAMPLE_REQUEST, loadout: DEFAULT_TEMPLATES.planner.pick };
  function checkDraft(d) {
    const loadout = loadoutErrors(d.loadout);
    return loadout.length === 0 ? { loadout, drive: { code: d.code, loadout: d.loadout } } : { loadout };
  }
  var KEY = "tibobit.fsd";
  function loadDraft() {
    try {
      const d = JSON.parse(localStorage.getItem(KEY) ?? "null");
      if (d === null || typeof d.prompt !== "string" || typeof d.loadout !== "string" || typeof d.builtFrom !== "string" || typeof d.code !== "string" || d.code.trim() === "")
        return DEFAULT_DRAFT;
      return { prompt: d.prompt, code: d.code, builtFrom: d.builtFrom, loadout: d.loadout };
    } catch {
      return DEFAULT_DRAFT;
    }
  }
  function saveDraft(d) {
    try {
      localStorage.setItem(KEY, JSON.stringify(d));
    } catch {}
  }

  // userscript/pilot/pilot.ts
  var SEND_AFTER_MS = 400;

  class Pilot {
    server;
    release;
    current = { state: "off" };
    written = loadDraft();
    checked = checkDraft(this.written);
    shown;
    live = false;
    build;
    buildProblem;
    messages = [];
    listeners = new Set;
    sending;
    constructor(server, release) {
      this.server = server;
      this.release = release;
    }
    state() {
      return this.current;
    }
    draft() {
      return this.written;
    }
    check() {
      return this.checked;
    }
    connected() {
      return this.server.connected();
    }
    preview() {
      return this.shown;
    }
    active() {
      return this.current.state !== "off" && this.live && this.shown !== undefined ? { memory: this.shown.memory, ...this.shown.action === undefined ? {} : { action: this.shown.action }, ...this.shown.error === undefined ? {} : { error: this.shown.error } } : undefined;
    }
    building() {
      return this.build?.since;
    }
    buildError() {
      return this.buildProblem;
    }
    buildCode() {
      const prompt = this.written.prompt;
      if (this.build !== undefined || prompt.trim() === "" || !this.server.connected())
        return;
      this.build = { since: Date.now() };
      this.buildProblem = undefined;
      this.notify();
      this.server.build(prompt).then((code) => this.edit({ ...this.written, code, builtFrom: prompt }), (e) => {
        this.buildProblem = e instanceof Error ? e.message : String(e);
      }).finally(() => {
        this.build = undefined;
        this.notify();
      });
    }
    chat() {
      return this.messages;
    }
    onChange(listener) {
      this.listeners.add(listener);
    }
    notify() {
      for (const listener of this.listeners)
        listener();
    }
    edit(next) {
      this.written = next;
      this.checked = checkDraft(next);
      saveDraft(next);
      clearTimeout(this.sending);
      const drive = this.checked.drive;
      if (drive !== undefined)
        this.sending = setTimeout(() => this.ask({ drive }), SEND_AFTER_MS);
      this.notify();
    }
    engage() {
      const drive = this.checked.drive;
      if (drive === undefined)
        return false;
      clearTimeout(this.sending);
      this.ask({ drive, on: true });
      return true;
    }
    stop() {
      this.ask({ on: false });
    }
    hello() {
      this.messages.length = 0;
      const drive = this.checked.drive;
      if (drive !== undefined)
        this.server.ask({ drive });
      this.notify();
    }
    receive(next) {
      if (this.current.state !== "off" && next.state === "off")
        this.release();
      if (this.current.state === "off" && next.state === "on") {
        this.messages.length = 0;
        this.live = false;
      }
      this.current = next;
      this.notify();
    }
    disconnected() {
      this.receive({ state: "off" });
    }
    hear(message) {
      const at = this.messages.findIndex((m) => m.id === message.id);
      if (at >= 0)
        this.messages[at] = message;
      else
        this.messages.push(message);
      trimChat(this.messages);
      this.notify();
    }
    see(preview) {
      this.shown = preview;
      this.live = this.current.state !== "off";
      this.notify();
    }
    ask(change) {
      if (!this.server.connected())
        return;
      this.server.ask(change).then((ok) => {
        if (ok)
          return;
        this.current = { ...this.current, detail: `the agent server on ${this.server.origin()} refused the change; restart it with this version of agent-server/main.ts` };
        this.notify();
      });
    }
  }

  // userscript/agent/bridge.ts
  var PORT_KEY = "tibobit.bridgePort";
  function savedPort() {
    try {
      const port = Number(localStorage.getItem(PORT_KEY));
      return validPort(port) ? port : undefined;
    } catch {
      return;
    }
  }
  function initialOrigin() {
    return globalThis[BRIDGE_ORIGIN_GLOBAL] ?? localOrigin(savedPort() ?? BRIDGE_PORT);
  }
  var RUN_INTERVAL_MS = 33;
  var SNAPSHOT_SHARE = 0.1;
  var CHECKPOINT_TIMEOUT_MS = 120000;
  var BUILD_TIMEOUT_MS = 600000;
  var IDLE_INTERVAL_MS = 500;
  var RECONNECT_MS = 3000;
  var MAX_IN_FLIGHT = 4;
  var HELLO_TIMEOUT_MS = 5000;
  var TAB_ID = crypto.randomUUID();
  function refusal(r, origin) {
    const text = r.responseText ?? (typeof r.response === "string" ? r.response : "");
    try {
      const { error } = JSON.parse(text);
      if (typeof error === "string")
        return error;
    } catch {}
    return `the agent server on ${origin} refused the connection (${r.status})`;
  }
  function post(origin, path, body) {
    return new Promise((resolve) => GM_xmlhttpRequest({
      method: "POST",
      url: `${origin}${path}`,
      data: typeof body === "string" ? body : JSON.stringify(body),
      headers: { "content-type": "application/json" },
      timeout: 5000,
      onload: (r) => resolve(r.status < 300),
      onerror: () => resolve(false),
      ontimeout: () => resolve(false)
    }));
  }
  function buildCode(origin, prompt) {
    return new Promise((resolve, reject) => GM_xmlhttpRequest({
      method: "POST",
      url: `${origin}/pilot/code`,
      data: JSON.stringify({ prompt }),
      headers: { "content-type": "application/json" },
      timeout: BUILD_TIMEOUT_MS,
      onload: (r) => {
        if (r.status >= 300)
          return reject(new Error(refusal(r, origin)));
        resolve(JSON.parse(r.responseText ?? String(r.response ?? "")).code);
      },
      onerror: () => reject(new Error(`the agent server on ${origin} did not answer`)),
      ontimeout: () => reject(new Error("the builder took more than 10 minutes"))
    }));
  }
  function gmCall(method, url, body) {
    return new Promise((resolve, reject) => GM_xmlhttpRequest({
      method,
      url,
      ...body === undefined ? {} : { data: body, headers: { "content-type": "application/json" } },
      timeout: CHECKPOINT_TIMEOUT_MS,
      onload: (r) => {
        const text = r.responseText ?? String(r.response ?? "");
        if (r.status < 300)
          resolve(text);
        else
          reject(new Error(`${method} ${url}: ${r.status} ${text.slice(0, 300)}`));
      },
      onerror: () => reject(new Error(`${method} ${url} failed`)),
      ontimeout: () => reject(new Error(`${method} ${url} timed out`))
    }));
  }
  var NOT_GRANTED = typeof GM_xmlhttpRequest === "function" ? undefined : "Tampermonkey did not grant GM_xmlhttpRequest. Add @grant GM_xmlhttpRequest and @connect 127.0.0.1 to the installed script's header.";
  function startBridge(link, controller, forecaster) {
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
    const pilot = new Pilot({ connected: () => connected, origin: () => origin, ask: (change) => post(origin, "/pilot", change), build: (prompt) => buildCode(origin, prompt) }, () => controller.release());
    let inFlight = 0;
    let lastPush = 0;
    let screen = "title";
    let snapshotMs = 0;
    let sentWithMessages = -1;
    const store = {
      put: async (file) => {
        await gmCall("POST", `${origin}/bridge/checkpoint`, JSON.stringify(file));
      },
      get: async (name) => JSON.parse(await gmCall("GET", `${origin}/bridge/checkpoint?name=${encodeURIComponent(name)}`))
    };
    const reconnect = (from) => {
      if (from !== session)
        return;
      connected = false;
      pilot.disconnected();
      notify();
      setTimeout(listen, RECONNECT_MS);
    };
    const listen = () => {
      const mine = ++session;
      if (NOT_GRANTED !== undefined)
        return;
      let over = false;
      const retry = (why) => {
        if (over)
          return;
        over = true;
        clearTimeout(silence);
        if (why !== undefined && mine === session)
          error = why;
        reconnect(mine);
      };
      const silence = setTimeout(() => {
        if (connected || mine !== session)
          return;
        request?.abort();
        retry(`the agent server on ${origin} did not answer`);
      }, HELLO_TIMEOUT_MS);
      request = GM_xmlhttpRequest({
        method: "GET",
        url: `${origin}/bridge/commands?tab=${TAB_ID}`,
        responseType: "stream",
        onloadstart: (r) => {
          const body = r.response;
          if (body === null)
            return;
          read(body, mine).catch(() => {}).finally(() => retry());
        },
        onload: (r) => retry(r.status >= 300 ? refusal(r, origin) : undefined),
        onerror: () => retry(`no agent server on ${origin}`),
        ontimeout: () => retry(`no agent server on ${origin}`)
      });
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
              sentWithMessages = -1;
              pilot.hello();
              notify();
            } else if ("error" in envelope) {
              error = envelope.error;
              notify();
            } else if ("pilot" in envelope)
              pilot.receive(envelope.pilot);
            else if ("chat" in envelope)
              pilot.hear(envelope.chat);
            else if ("preview" in envelope)
              pilot.see(envelope.preview);
            else
              controller.handle({ id: envelope.id, command: parseCommand(envelope.command) }, store);
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
      if (now - lastPush < (inRun(link) ? Math.max(RUN_INTERVAL_MS, snapshotMs / SNAPSHOT_SHARE) : IDLE_INTERVAL_MS))
        return;
      lastPush = now;
      const messages = Object.keys(link.messages).length;
      if (sentWithMessages !== messages) {
        const book = encyclopedia(link);
        if (book !== undefined) {
          sentWithMessages = messages;
          post(origin, "/bridge/encyclopedia", book).then((ok) => {
            if (!ok)
              sentWithMessages = -1;
          });
        }
      }
      let body;
      let built = now;
      try {
        const forecast = forecaster.read();
        built = performance.now();
        const made = snapshot(link, controller.statuses, forecast, forecaster.seconds);
        screen = made.screen;
        body = JSON.stringify(made);
      } catch (e) {
        body = JSON.stringify({ capturedAt: Date.now(), screen, commands: controller.statuses, error: `snapshot failed: ${e instanceof Error ? e.message : String(e)}` });
      }
      snapshotMs = performance.now() - built;
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
        origin = localOrigin(port);
        connected = false;
        error = NOT_GRANTED;
        request?.abort();
        listen();
        notify();
      },
      pilot,
      onChange: (listener) => listeners.add(listener)
    };
  }

  // userscript/link/clone.ts
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

  // game/catalog.ts
  function titleCase(id) {
    return id.replace(/(^|-)(\w)/g, (_, dash, c) => `${dash ? " " : ""}${c.toUpperCase()}`);
  }
  var maxWeaponLevel = (w) => w.tier === "base" ? Math.min(8, (w.levels?.length ?? 0) + 1) : 1;
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
        maxLevel[`weapon:${w.id}`] = maxWeaponLevel(w);
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

  // userscript/agent/loadout.ts
  var WEAPON_SLOTS = 6;
  function pick(game, offer) {
    const s = game.state;
    s.choiceQueue.push({ kind: "levelUp", offers: [offer], level: s.loadout.level });
    game.choose({ type: "pick", index: 0 });
  }
  function shrinePick(game, stat, value) {
    game.state.choiceQueue.push({ kind: "shrine", offers: [{ stat, value }] });
    game.choose({ type: "pick", index: 0 });
  }
  function applyLoadout(link, game, spec) {
    const content = link.content();
    if (content === undefined)
      throw new Error("the game's content is not loaded yet");
    const weaponDefs = new Map(content.allWeapons.map((w) => [w.id, w]));
    const passiveDefs = new Map(content.passives.map((p) => [p.id, p]));
    const itemIds = new Set(content.allItems.map((i) => i.id));
    const problems = [];
    const weaponMax = (id) => {
      const w = weaponDefs.get(id);
      return w === undefined ? 0 : maxWeaponLevel(w);
    };
    for (const { id, level } of spec.weapons) {
      if (!weaponDefs.has(id))
        problems.push(`no weapon ${id}`);
      else if (level < 1 || level > weaponMax(id))
        problems.push(`weapon ${id} levels 1 to ${weaponMax(id)}, not ${level}`);
    }
    for (const { id, level } of spec.passives) {
      const p = passiveDefs.get(id);
      if (p === undefined)
        problems.push(`no passive ${id}`);
      else if (level < 1 || level > p.maxLevel)
        problems.push(`passive ${id} levels 1 to ${p.maxLevel}, not ${level}`);
    }
    for (const { id } of spec.items)
      if (!itemIds.has(id))
        problems.push(`no item ${id}`);
    if (spec.weapons.length === 0)
      problems.push("a loadout needs a weapon");
    if (spec.weapons.length > WEAPON_SLOTS)
      problems.push(`at most ${WEAPON_SLOTS} weapons`);
    if (spec.passives.length > WEAPON_SLOTS)
      problems.push(`at most ${WEAPON_SLOTS} passives`);
    const s = game.state;
    const L = s.loadout;
    for (const stat of Object.keys(spec.shrineTotals ?? {}))
      if (!(stat in L.shrineTotals))
        problems.push(`no shrine stat ${stat}; the stats are ${Object.keys(L.shrineTotals).join(", ")}`);
    if (problems.length > 0)
      throw new Error(problems.join("; "));
    if (s.choiceQueue.length > 0)
      throw new Error("a choice is open; pick it first");
    L.weapons.length = 0;
    L.passives.length = 0;
    L.items.clear();
    for (const { id, count } of spec.items)
      L.items.set(id, (L.items.get(id) ?? 0) + count);
    for (const { id, level } of spec.weapons)
      for (let n = 1;n <= level; n++)
        pick(game, { type: "weapon", id, level: n, isNew: n === 1 });
    for (const { id, level } of spec.passives)
      for (let n = 1;n <= level; n++)
        pick(game, { type: "passive", id, level: n, isNew: n === 1 });
    for (const [stat, total] of Object.entries(spec.shrineTotals ?? {}))
      shrinePick(game, stat, total - (L.shrineTotals[stat] ?? 0));
    shrinePick(game, "might", 0);
    if (spec.gold !== undefined)
      L.gold = spec.gold;
    const maxHp = L.stats.maxHp;
    if (spec.hp !== undefined)
      s.player.hp[s.me] = spec.hp === "full" ? maxHp : Math.min(maxHp, spec.hp);
    game.taint();
    const got = L.weapons.map((w) => `${w.def.id} ${w.level}`).join(", ");
    const want = spec.weapons.map((w) => `${w.id} ${w.level}`).join(", ");
    if (got !== want)
      throw new Error(`the game kept weapons ${got || "none"}, not ${want}`);
  }

  // userscript/agent/checkpoint.ts
  var b64 = (u8) => {
    let s = "";
    for (let i = 0;i < u8.length; i += 32768)
      s += String.fromCharCode(...u8.subarray(i, i + 32768));
    return btoa(s);
  };
  var unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
  function classKey(proto) {
    const name = proto.constructor?.name ?? "?";
    return `${name}(${Object.getOwnPropertyNames(proto).sort().join(",")})`;
  }
  var WARM_UP_TICKS = 3 * TICKS_PER_SECOND;
  var MAX_CACHED = 3;

  class Checkpoints {
    link;
    shared;
    classes = new Map;
    warmed = false;
    cache = new Map;
    constructor(link) {
      this.link = link;
    }
    sim() {
      const { copyState, simulator } = this.link;
      if (copyState === undefined || simulator === undefined)
        throw new Error("the game's sim is not hooked yet");
      return { copyState, simulator };
    }
    sharedObjects(state) {
      if (this.shared === undefined) {
        const byObject = new Map;
        const queue = [[this.link.table, "t"]];
        for (const [k, v] of Object.entries(state))
          if (isRuleModule(v))
            queue.push([v, `r.${k}`]);
        for (let i = 0;i < queue.length; i++) {
          const [v, p] = queue[i];
          if (typeof v !== "object" && typeof v !== "function" || v === null || byObject.has(v) || ArrayBuffer.isView(v))
            continue;
          byObject.set(v, p);
          if (v instanceof Map) {
            let n = 0;
            for (const [k, x] of v) {
              queue.push([k, `${p}.k${n}`], [x, `${p}.v${n}`]);
              n++;
            }
          } else if (v instanceof Set) {
            let n = 0;
            for (const x of v)
              queue.push([x, `${p}.s${n++}`]);
          } else if (typeof v === "object")
            for (const k of Object.keys(v))
              queue.push([v[k], `${p}.${k}`]);
        }
        this.shared = { byObject, byPath: new Map([...byObject].map(([o, p]) => [p, o])) };
      }
      return this.shared;
    }
    encode(state) {
      const { byObject } = this.sharedObjects(state);
      const ids = new Map;
      const nodes = [];
      const functions = new Set;
      const enc = (v) => {
        if (v === undefined)
          return { u: 1 };
        if (typeof v === "number")
          return Number.isFinite(v) ? v : { n: String(v) };
        if (typeof v === "bigint")
          return { b: String(v) };
        if (typeof v === "string" || typeof v === "boolean")
          return v;
        if (v === null)
          return null;
        if (typeof v !== "object" && typeof v !== "function")
          throw new Error(`cannot save a ${typeof v}`);
        const path = byObject.get(v);
        if (path !== undefined)
          return { s: path };
        if (typeof v === "function") {
          functions.add(v.name || "anonymous");
          return { u: 1 };
        }
        const known = ids.get(v);
        if (known !== undefined)
          return { r: known };
        const id = nodes.length;
        ids.set(v, id);
        nodes.push({ A: [] });
        let node;
        if (ArrayBuffer.isView(v))
          node = { T: v.constructor.name, d: b64(new Uint8Array(v.buffer, v.byteOffset, v.byteLength)) };
        else if (Array.isArray(v))
          node = { A: v.map(enc) };
        else if (v instanceof Map)
          node = { M: [...v].map(([k, x]) => [enc(k), enc(x)]) };
        else if (v instanceof Set)
          node = { S: [...v].map(enc) };
        else {
          const proto = Object.getPrototypeOf(v);
          const O = {};
          for (const k of Object.keys(v))
            O[k] = enc(v[k]);
          node = proto === null ? { O, z: 1 } : proto === Object.prototype ? { O } : { O, P: classKey(proto) };
        }
        nodes[id] = node;
        return { r: id };
      };
      const root = enc(state);
      if (functions.size > 0)
        throw new Error(`the state holds functions (${[...functions].join(", ")}), which cannot be saved`);
      return { root, nodes };
    }
    learnClasses(root) {
      const seen = new Set;
      const stack = [root];
      while (stack.length > 0) {
        const v = stack.pop();
        if (typeof v !== "object" || v === null || seen.has(v) || ArrayBuffer.isView(v))
          continue;
        seen.add(v);
        const proto = Object.getPrototypeOf(v);
        if (proto !== null && proto !== Object.prototype && !(v instanceof Map) && !(v instanceof Set) && !Array.isArray(v)) {
          const key = classKey(proto);
          const had = this.classes.get(key);
          if (had === undefined)
            this.classes.set(key, proto);
          else if (had !== proto)
            this.classes.set(key, "ambiguous");
        }
        if (v instanceof Map)
          for (const [k, x] of v)
            stack.push(k, x);
        else if (v instanceof Set)
          for (const x of v)
            stack.push(x);
        else
          for (const k of Object.keys(v))
            stack.push(v[k]);
      }
    }
    warmUp(game) {
      if (this.warmed)
        return;
      const content = this.link.content();
      if (content === undefined)
        throw new Error("the game's content is not loaded yet");
      const { copyState, simulator } = this.sim();
      const ids = content.allWeapons.map((w) => w.id);
      for (let at = 0;at < ids.length; at += WEAPON_SLOTS) {
        const { sim, step } = simulator(game, copyState(game.state));
        sim.state.loadout.weapons.length = 0;
        sim.state.choiceQueue.length = 0;
        for (const id of ids.slice(at, at + WEAPON_SLOTS))
          pick(sim, { type: "weapon", id, level: 1, isNew: true });
        for (let i = 0;i < WARM_UP_TICKS && !sim.state.over; i++) {
          sim.state.choiceQueue.length = 0;
          step();
        }
        this.learnClasses(sim.state);
      }
      this.warmed = true;
    }
    decode(data, game) {
      const { byPath } = this.sharedObjects(game.state);
      this.learnClasses(game.state);
      const needed = new Set(data.nodes.flatMap((n) => ("P" in n) && n.P !== undefined ? [n.P] : []));
      if ([...needed].some((k) => !this.classes.has(k)))
        this.warmUp(game);
      const missing = [...needed].filter((k) => !this.classes.has(k));
      const ambiguous = [...needed].filter((k) => this.classes.get(k) === "ambiguous");
      if (missing.length > 0 || ambiguous.length > 0)
        throw new Error(`this page cannot rebuild classes ${[...missing, ...ambiguous.map((k) => `${k} (two classes share this name)`)].join(", ")}`);
      const made = new Array(data.nodes.length);
      const dec = (x) => {
        if (x === null || typeof x !== "object")
          return x;
        if ("u" in x)
          return;
        if ("n" in x)
          return Number(x.n);
        if ("b" in x)
          return BigInt(x.b);
        if ("s" in x) {
          const o = byPath.get(x.s);
          if (o === undefined)
            throw new Error(`the page has no shared object at ${x.s}; the checkpoint is from another build`);
          return o;
        }
        return node(x.r);
      };
      const node = (id) => {
        if (made[id] !== undefined)
          return made[id];
        const n = data.nodes[id];
        if (n === undefined)
          throw new Error(`the checkpoint has no node ${id}`);
        if ("T" in n) {
          const bytes = unb64(n.d);
          const View = globalThis[n.T];
          if (View === undefined)
            throw new Error(`no typed array ${n.T}`);
          return made[id] = new View(bytes.buffer);
        }
        if ("A" in n) {
          const a = [];
          made[id] = a;
          for (const x of n.A)
            a.push(dec(x));
          return a;
        }
        if ("M" in n) {
          const m = new Map;
          made[id] = m;
          for (const [k, x] of n.M)
            m.set(dec(k), dec(x));
          return m;
        }
        if ("S" in n) {
          const s = new Set;
          made[id] = s;
          for (const x of n.S)
            s.add(dec(x));
          return s;
        }
        const proto = n.z === 1 ? null : n.P === undefined ? Object.prototype : this.classes.get(n.P);
        const o = Object.create(proto);
        made[id] = o;
        for (const [k, x] of Object.entries(n.O))
          o[k] = dec(x);
        return o;
      };
      return dec(data.root);
    }
    save(game, name) {
      const s = game.state;
      const { copyState } = this.sim();
      this.remember(name, copyState(s));
      const meta = {
        name,
        build: this.link.simBuild ?? "unknown",
        seed: s.run.seed,
        mode: s.mode,
        difficulty: s.difficulty,
        time: Math.round(s.runClock * 10) / 10,
        level: s.loadout.level,
        hp: Math.round(s.player.hp[s.me] ?? 0),
        weapons: s.loadout.weapons.map((w) => `${w.def.id} ${w.level}`),
        passives: s.loadout.passives.map((p) => `${p.def.id} ${p.level}`),
        items: [...s.loadout.items].map(([id, count]) => count > 1 ? `${id} x${count}` : id),
        savedAt: new Date().toISOString()
      };
      return { meta, state: this.encode(s) };
    }
    remember(name, state) {
      this.cache.delete(name);
      this.cache.set(name, state);
      for (const key of this.cache.keys()) {
        if (this.cache.size <= MAX_CACHED)
          break;
        this.cache.delete(key);
      }
    }
    has(name) {
      return this.cache.has(name);
    }
    drop(name) {
      this.cache.delete(name);
    }
    load(game, name, file) {
      if (file !== undefined) {
        if (file.meta.build !== this.link.simBuild)
          throw new Error(`checkpoint ${name} was saved on game build ${file.meta.build}; this page runs ${this.link.simBuild ?? "an unknown build"}`);
        this.remember(name, this.decode(file.state, game));
      }
      const saved = this.cache.get(name);
      if (saved === undefined)
        throw new Error(`checkpoint ${name} is not loaded in this page`);
      const { copyState } = this.sim();
      game.state = copyState(saved);
      this.link.events = [];
      game.taint();
      game.setPaused(true);
    }
  }

  // userscript/agent/seed.ts
  var SEED_KEY = "tibobit.seed";
  function installSeedHook() {
    let want = null;
    try {
      want = sessionStorage.getItem(SEED_KEY);
    } catch {}
    if (want === null)
      return;
    const n = parseInt(want, 36);
    const page = typeof unsafeWindow === "undefined" ? window : unsafeWindow;
    const real = page.crypto.getRandomValues.bind(page.crypto);
    page.crypto.getRandomValues = (a) => {
      if (a !== null && a.constructor.name === "Uint32Array" && a.length === 1) {
        a[0] = n;
        return a;
      }
      return real(a);
    };
  }
  function requestSeed(seed) {
    sessionStorage.setItem(SEED_KEY, seed);
  }
  function clearSeed() {
    try {
      sessionStorage.removeItem(SEED_KEY);
    } catch {}
  }

  // userscript/agent/menus.ts
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
    return playedOn(chosen, level);
  }
  async function pickWeapon(id) {
    byTestId("start-pick-row")?.click();
    await wait(400);
    const option = document.querySelector(`[data-testid="start-pick-option-${id}"]`);
    if (option === null) {
      const offered = [...document.querySelectorAll('[data-testid^="start-pick-option-"]')].flatMap((o) => o.dataset.testid?.slice("start-pick-option-".length) ?? []).filter((x) => x !== "random");
      byTestId("start-pick-close")?.click();
      throw new CommandFailure("weaponNotOffered", `starting weapon ${id} is not offered; offered: ${offered.join(", ")}`, offered);
    }
    option.click();
    await wait(300);
    const now = byTestId("start-pick-row")?.dataset.picked;
    if (now !== id)
      throw new Error(`picked starting weapon ${id}, but the start screen shows ${now ?? "nothing"}`);
  }
  async function showSummary(link) {
    if (inRun(link))
      throw new Error("the run is still going");
    const before = link.runLink;
    for (let i = 0;i < 12; i++) {
      link.noteRunLink();
      if (link.runLink !== undefined && link.runLink !== before)
        return;
      const next = button(/^(Next|Continue|Skip)$/i);
      if (next !== undefined)
        await press(next);
      await wait(1000);
    }
    throw new Error("the run summary did not show a share link");
  }
  async function startRun(link, mode, difficulty, weapon) {
    const entry = mode === "daily" ? /^Daily/ : "Open World";
    if (inRun(link)) {
      link.game?.setPaused(false);
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
    link.noteRunLink();
    for (let i = 0;i < 14 && button(entry) === undefined && modeScreen() !== mode; i++) {
      const next = button(/^(Not now|Next|Continue|Skip|Done|Close|OK|Menu|Main menu|Title|Back to title|Back|Home)$/i);
      link.noteRunLink();
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
      if (open === undefined) {
        const seen = [...document.querySelectorAll("button")].map((b) => b.textContent?.trim()).filter(Boolean);
        throw new Error(`no way back to the title; buttons on screen: ${seen.join(", ") || "none"}`);
      }
      await press(open);
      if (!await until(() => button("Start") !== undefined, 5000))
        throw new Error(`the ${mode} screen did not open`);
    }
    const picked = await pickDifficulty(difficulty);
    if (weapon !== undefined)
      await pickWeapon(weapon);
    const before = link.game;
    link.pauseAtStart = true;
    button("Start")?.click();
    await wait(2500);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: " ", code: "Space", bubbles: true }));
    const started = await until(() => inRun(link) && link.game !== before, 20000);
    window.dispatchEvent(new KeyboardEvent("keyup", { key: " ", code: "Space", bubbles: true }));
    if (!started)
      throw new Error("the run did not start within 20 seconds");
    clearSeed();
    return picked;
  }
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
  async function until(check, ms) {
    const end = performance.now() + ms;
    while (performance.now() < end) {
      if (check())
        return true;
      await wait(100);
    }
    return check();
  }

  // userscript/agent/targets.ts
  function anchored(s, to) {
    return "dx" in to ? { x: (s.player.x[s.me] ?? 0) + to.dx, y: (s.player.y[s.me] ?? 0) + to.dy } : to;
  }
  function toward(s, goal) {
    if (goal === undefined)
      return STILL;
    const dx = goal.x - (s.player.x[s.me] ?? 0);
    const dy = goal.y - (s.player.y[s.me] ?? 0);
    const dist = Math.hypot(dx, dy);
    return dist > goal.within ? { x: dx / dist, y: dy / dist } : STILL;
  }
  function place(enums, s, to, within) {
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
      const kind = enums?.pickupKinds[s.pickups.kind[slot] ?? -1] ?? "";
      const radius = s.cfg.activation.pickupRadius[kind];
      return { x: s.pickups.x[slot] ?? 0, y: s.pickups.y[slot] ?? 0, within: within ?? (radius === undefined ? 6 : radius * 0.5) };
    }
    return { x: to.x, y: to.y, within: within ?? 6 };
  }

  // userscript/agent/control.ts
  var STUCK_TICKS = 90;
  var KEEP_STATUSES = 10;

  class Controller {
    link;
    forecaster;
    statuses = [];
    active;
    checkpoints;
    constructor(link, forecaster) {
      this.link = link;
      this.forecaster = forecaster;
      link.steer = (game) => this.steer(game);
      this.checkpoints = new Checkpoints(link);
    }
    handle({ id, command }, store) {
      const status = { id, command, state: "running", at: Date.now() };
      this.statuses.push(status);
      if (this.statuses.length > KEEP_STATUSES)
        this.statuses.splice(0, this.statuses.length - KEEP_STATUSES);
      try {
        this.run(status, command, store);
      } catch (e) {
        this.fail(status, e);
      }
    }
    release() {
      if (this.active !== undefined)
        this.finish(this.active.status, "replaced");
      this.link.speed = 1;
      this.forecaster.reset();
      if (inRun(this.link))
        this.link.game?.setPaused(false);
    }
    fail(status, e) {
      if (e instanceof CommandFailure) {
        status.failure = e.failure;
        if (e.offered !== undefined)
          status.offered = e.offered;
      }
      this.finish(status, "failed", e instanceof Error ? e.message : String(e));
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
        throw new CommandFailure("noRun", "no run in progress");
      return game;
    }
    run(status, command, store) {
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
          const open = game.state.choiceQueue[0];
          if (open === undefined)
            throw new Error("no choice is open");
          const before = JSON.stringify(game.state.choiceQueue);
          game.choose(command.action);
          if (JSON.stringify(game.state.choiceQueue) === before)
            throw new Error(`the game did not take ${JSON.stringify(command.action)} on this ${open.kind} choice`);
          this.finish(status, "done");
          return;
        }
        case "dash": {
          const game = this.game();
          const me = game.state.me;
          if ((game.state.player.dashCharges[me] ?? 0) <= 0)
            throw new Error("Tibo has no dash charge");
          const v = command.dir === undefined ? { x: game.state.player.fx[me] ?? 1, y: game.state.player.fy[me] ?? 0 } : unitOf(command.dir);
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
          this.forecaster.configure(command, this.link.game?.state);
          this.finish(status, "done");
          return;
        case "start":
          startRun(this.link, command.mode ?? "openWorld", command.difficulty ?? "easy", command.weapon).then((picked) => this.finish(status, "done", picked), (e) => this.fail(status, e));
          return;
        case "summary":
          showSummary(this.link).then(() => this.finish(status, "done"), (e) => this.fail(status, e));
          return;
        case "seed":
          requestSeed(command.seed);
          this.finish(status, "done");
          setTimeout(() => location.reload(), 1500);
          return;
        case "checkpoint":
          this.checkpoint(status, command, store).catch((e) => this.fail(status, e));
          return;
        case "loadout": {
          const game = this.game();
          applyLoadout(this.link, game, command);
          const L = game.state.loadout;
          this.finish(status, "done", [...L.weapons.map((w) => `${w.def.id} ${w.level}`), ...L.passives.map((p) => `${p.def.id} ${p.level}`), ...[...L.items.keys()]].join(", "));
          return;
        }
      }
    }
    async checkpoint(status, { op, name }, store) {
      if (op === "drop") {
        this.checkpoints.drop(name);
        return this.finish(status, "done");
      }
      const game = this.game();
      if (op === "save") {
        const file = this.checkpoints.save(game, name);
        await store.put(file);
        return this.finish(status, "done", `${file.meta.time}s, ${file.state.nodes.length} objects`);
      }
      const file = this.checkpoints.has(name) ? undefined : await store.get(name);
      if (this.active !== undefined)
        this.finish(this.active.status, "replaced");
      this.checkpoints.load(game, name, file);
      this.finish(status, "done", `${Math.round(game.state.runClock * 10) / 10}s`);
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
        if (command.seconds !== undefined && elapsed >= command.seconds * TICKS_PER_SECOND) {
          this.finish(status, "done");
          return STILL;
        }
        return unitOf(command.dir);
      }
      if (elapsed >= (command.timeout ?? 60) * TICKS_PER_SECOND) {
        this.fail(status, new CommandFailure("timeout", "timeout"));
        return STILL;
      }
      active.to ??= anchored(s, command.to);
      const goal = place(this.link.enums, s, active.to, command.within);
      if (goal === undefined) {
        if (command.stay === "done" && active.arrivedTick !== undefined)
          this.finish(status, "done", "used up");
        else
          this.fail(status, new CommandFailure("targetGone", "the target is gone"));
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
      if (stay === undefined || stay === 0 || typeof stay === "number" && s.tick - active.arrivedTick >= stay * TICKS_PER_SECOND) {
        this.finish(status, "done");
      }
      return STILL;
    }
    course() {
      const active = this.active;
      const live = this.link.game?.state;
      if (active === undefined || live === undefined)
        return;
      const { command } = active;
      if (command.type === "move") {
        const held = unitOf(command.dir);
        const end = command.seconds === undefined ? Infinity : (active.startTick ?? live.tick) + command.seconds * TICKS_PER_SECOND;
        return (s) => s.tick >= end ? STILL : held;
      }
      const to = active.to ?? anchored(live, command.to);
      return (s) => toward(s, place(this.link.enums, s, to, command.within));
    }
  }

  // userscript/combos/discovery.ts
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

  // userscript/link/chunks.ts
  var SIM_CHUNK = /\/assets\/sim-[\w-]+\.js$/;
  var BOOT_CHUNK = /\/assets\/boot-[\w-]+\.js$/;
  var ENGLISH_CHUNK = /\/assets\/i18n-en-[\w.-]+\.js$/;
  function isGameClass(value) {
    if (typeof value !== "function")
      return false;
    const proto = value.prototype;
    return typeof proto?.step === "function" && typeof proto.setInput === "function" && typeof proto.choose === "function" && typeof proto.drainEvents === "function";
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
    const pickupSources = values.find((v) => Array.isArray(v) && v[0] === "none" && v.includes("boss") && v.includes("poteto"));
    if (pickupSources === undefined)
      throw new Error("could not find the pickup sources table");
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
    return { pickupKinds, pickupSources, zoneKinds, zoneShapes, enemyFlags, botModes };
  }
  function assertContent(value) {
    const c = value;
    for (const key of ["baseWeapons", "evolutions", "unions", "passives", "items", "evolvedItems", "allWeapons", "allItems", "enemies", "bossIds"])
      if (!Array.isArray(c[key]))
        throw new Error(`content registry has no ${key} list`);
  }

  // userscript/link/game-link.ts
  var KEEP_EVENTS = 40;
  var NOISY_EVENTS = new Set(["playerHit", "hitStop", "dodge", "dashed", "block", "throttle", "reelStop", "dogAbility", "bossLanding"]);

  class GameLink {
    game;
    table;
    enums;
    messages = {};
    icons;
    hand;
    error;
    steer;
    inPool;
    speed = 1;
    pauseAtStart = false;
    copyState;
    simulator;
    simBuild;
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
        const content = this.contentFn();
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
      else if (BOOT_CHUNK.test(url)) {
        this.loadIcons(url).catch((e) => console.warn("[tibobit] no game icons:", e instanceof Error ? e.message : e));
        this.loadHand(url).catch((e) => console.warn("[tibobit] no game hand:", e instanceof Error ? e.message : e));
      } else if (ENGLISH_CHUNK.test(url))
        this.loadMessages(url).catch((e) => this.fail(e));
    }
    async attachSim(url) {
      const ns = await import(url);
      const Game = findGameClass(ns);
      this.simBuild = url.split("/").at(-1);
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
      const copyState = (state) => {
        if (shared === undefined) {
          shared = new WeakSet;
          reachable(link.table, shared);
        }
        for (const v of Object.values(state))
          if (isRuleModule(v))
            shared.add(v);
        return cloneState(state, shared);
      };
      const simulator = (game, state) => {
        const sim = Object.assign(Object.create(Object.getPrototypeOf(game)), game, { recorder: NO_RECORDER });
        sim.state = state;
        sim.state.paused = false;
        return { sim, step: () => step.call(sim), setInput: (x, y) => setInput.call(sim, x, y) };
      };
      this.copyState = copyState;
      this.simulator = simulator;
      const source = await (await fetch(url)).text();
      const contentFn = await importBinding(source, url, localAt(source, /([\w$]+)\(\)\.baseWeapons/, "content registry call"));
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
    async loadHand(bootUrl) {
      const boot = await (await fetch(bootUrl)).text();
      const chunk = (pattern, what) => {
        const name = boot.match(pattern)?.[1];
        if (name === undefined)
          throw new Error(`the boot chunk names no ${what}`);
        return new URL(name, bootUrl).href;
      };
      const photoUrl = chunk(/"(\.\/hand-photo-[\w-]+\.js)"/, "hand photo chunk");
      const shapeUrl = chunk(/"(\.\/hand-photo\.generated-[\w-]+\.js)"/, "hand shape chunk");
      const [photo, shape] = await Promise.all([photoUrl, shapeUrl].map(async (u) => (await fetch(u)).text()));
      const image = photo?.match(/`(hand-[\w-]+\.webp)`/)?.[1];
      if (image === undefined)
        throw new Error("the hand photo chunk names no image");
      const n = (key) => {
        const value = Number(shape?.match(new RegExp(`\\b${key}:(\\d+)`))?.[1]);
        if (!Number.isFinite(value))
          throw new Error(`the hand shape chunk has no ${key}`);
        return value;
      };
      this.hand = { url: new URL(image, photoUrl).href, width: n("width"), height: n("height"), tipX: n("tipX"), tipY: n("tipY") };
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

  // userscript/pilot/feed.css.ts
  var css = `
.tbh-chat-tools { display: flex; align-items: center; gap: 6px; padding: 6px 6px 0; font-size: 11px; color: #c9b58a; }
.tbh-giveback { flex: 1; min-width: 0; padding: 4px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font: inherit; font-weight: 800; cursor: pointer; color: #ffd6d0; background: rgba(227,138,127,.12); border: 1px solid #e38a7f; border-radius: 4px; }
.tbh-giveback:hover:not(:disabled) { color: #fff; background: rgba(227,138,127,.24); }
.tbh-chatbox { border-top: 1px solid rgba(255,255,255,.08); }
.tbh-fsd-open { flex: none; padding: 4px 8px; font: inherit; font-size: 10.5px; font-weight: 900; letter-spacing: .1em; cursor: pointer; color: #1d1530; background: linear-gradient(135deg, #c9a0ff, #ffd36b); border: 0; border-radius: 4px; }
.tbh-fsd-open:hover { filter: brightness(1.1); }
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
`;

  // userscript/pilot/icons.ts
  var ring = (x, y, r) => `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
  var dot = (x, y, r) => ({ fill: ring(x, y, r) });
  var ACTION_ICONS = {
    Loot: ["M3 11h18v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z", "M3 11V9a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2", "M10 11v3h4v-3"],
    Wander: [ring(12, 12, 9), { fill: "M15.5 8.5l-2 5-5 2 2-5z" }],
    Run: [dot(15, 4.5, 2.2), "M13 8.5 11 14", "M13 8.5 9 9.5 7 12.5", "M13 8.5l3 3h3", "M11 14l3 2.5V21", "M11 14l-2 3.5H5"],
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
    Hold: [{ fill: "M6.5 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM14.5 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" }],
    Start: [{ fill: "M7 4v16l13-8z" }],
    "Take over": [ring(12, 12, 9), ring(12, 12, 2.5), "M3.5 10.5l6 1M20.5 10.5l-6 1M12 14.5V21"],
    Over: ["M12 3a8 8 0 0 0-8 8c0 2.8 1.3 4.5 3 5.5V20a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-3.5c1.7-1 3-2.7 3-5.5a8 8 0 0 0-8-8z", dot(9, 11.5, 1.9), dot(15, 11.5, 1.9), "M10 21v-2.5M14 21v-2.5"],
    Stopped: [{ fill: "M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" }]
  };
  var NOTE_ICON = ["M4 5h16v11H9l-4 4v-4H4z", "M8 9h8M8 12h5"];
  var STILL_ICON = [ring(12, 12, 3.5)];
  var ARROW_ICON = ["M4 12h15", "M13 6l6 6-6 6"];
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
    return move === "still" ? svgIcon(STILL_ICON, className) : svgIcon(ARROW_ICON, className, DIRECTIONS.indexOf(move) * 45);
  }

  // userscript/panel/dom.ts
  function h(tag, className, ...children) {
    const el = document.createElement(tag);
    el.className = className;
    el.append(...children);
    return el;
  }
  function addStyle(css) {
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);
  }

  // userscript/pilot/inspector.css.ts
  var css2 = `
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
`;

  // userscript/pilot/arrows.ts
  var ARROW_GLYPHS = ["→", "↘", "↓", "↙", "←", "↖", "↑", "↗"];
  var ARROWS = { ...Object.fromEntries(DIRECTIONS.map((d, i) => [d, ARROW_GLYPHS[i]])), still: "•" };
  var DIRECTION_WORDS = new RegExp(`(?<![\\w-])(${[...DIRECTIONS].sort((a, z) => z.length - a.length).join("|")})(?![\\w-])`, "g");
  var arrowed = (text) => text.replace(DIRECTION_WORDS, (d) => ARROWS[d] ?? d);

  // clock.ts
  var clock = (seconds) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

  // userscript/pilot/inspector.ts
  var ROLE_LABELS = { planner: "Plan", action: "Action", system: "Bot" };
  var HIDE_DELAY_MS = 200;
  var MIN_SIDE_ROOM = 300;
  var fine = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${(seconds % 60).toFixed(1).padStart(4, "0")}`;
  var percent = (v) => `${Math.round(v * 100)}%`;
  var costly = (f) => f.dead || f.damage > 0;
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
      case "state":
        return [...words, section("Action", pre(inspect.about))];
      case "moves": {
        const rows = inspect.moves.map((m) => h("div", `tbh-opt tbh-opt-${m.outcome.replace(" ", "-")}`, h("div", "tbh-opt-head", h("span", "tbh-opt-name tbh-opt-arrow", ARROWS[m.move]), h("span", "tbh-opt-outcome", m.outcome), h("span", "tbh-opt-scores", ...m.forecast === undefined ? [] : [h("span", `tbh-chip${costly(m.forecast) ? "" : " tbh-chip-ok"}`, m.forecast.dead ? "dead" : costly(m.forecast) ? `-${Math.round(m.forecast.damage)} hp` : "no damage")], ...m.hurt === undefined ? [] : [meter(`hurt ${percent(m.hurt)}`, m.hurt, "tbh-meter-hurt")], ...m.useful === undefined ? [] : [meter(`useful ${percent(m.useful)}`, m.useful, "tbh-meter-useful")])), h("div", "tbh-opt-desc", m.description)));
        return [
          ...words,
          section("Moves", ...rows, ...inspect.dash === undefined ? [] : [h("div", "tbh-opt-desc", `Dash to escape? ${percent(inspect.dash.odds)} (dashes above ${percent(inspect.dash.above)})`)]),
          section("Prompt", pre([inspect.situation, ...inspect.questions ?? []].join(`

`)))
        ];
      }
      case "cards":
        return [...words, section(inspect.question, ...oddsRows(inspect.cards)), section("Prompt", pre(inspect.situation))];
    }
  }
  function inspector(panel, messages) {
    addStyle(css2);
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

  // userscript/pilot/feed.ts
  var FLOW_TILES = 60;
  function step(m) {
    if (m.role !== "action" || m.inspect?.kind !== "moves")
      return;
    const chosen = m.inspect.moves.find((x) => x.outcome === "chosen");
    return { move: chosen?.move ?? "still", hurt: chosen?.forecast !== undefined && costly(chosen.forecast), dash: m.tag === "Dash" };
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
  function botFeed(pilot, openFsd) {
    addStyle(css);
    const giveBack = h("button", "tbh-giveback");
    giveBack.type = "button";
    giveBack.addEventListener("click", () => pilot.stop());
    const instructions = h("button", "tbh-fsd-open", "FSD");
    instructions.type = "button";
    instructions.title = "Open Full Self Driving's function and loadout (pauses the game)";
    instructions.addEventListener("click", () => openFsd(instructions));
    const tools = h("div", "tbh-chat-tools", giveBack, instructions);
    const plan = h("div", "tbh-plan");
    const list = h("div", "tbh-actions");
    list.setAttribute("aria-live", "polite");
    const rows = new Map;
    const insp = inspector(() => plan.closest(".tbh-panel") ?? plan, () => pilot.chat());
    let shownPlan;
    const render = () => {
      const now = pilot.state();
      const label = now.state === "stopping" ? "Handing the wheel back…" : "I'll do it myself";
      if (giveBack.textContent !== label)
        giveBack.textContent = label;
      giveBack.disabled = now.state !== "on";
      const messages = pilot.chat();
      const latest = [...messages].reverse().find((m) => m.role === "planner");
      if (latest !== shownPlan || latest === undefined) {
        shownPlan = latest;
        plan.replaceChildren(h("span", "tbh-plan-label", latest === undefined || latest.model === "code" ? "Action" : "Pick"), ...latest?.time === undefined ? [] : [h("span", "tbh-row-time", clock(latest.time))], h("span", "tbh-plan-text", latest === undefined ? "Waiting for the function…" : arrowed(latest.text)), ...latest?.stream === undefined ? [] : [h("div", "tbh-plan-stream", h("span", "", latest.stream, h("b", "tbh-cursor", "▍")))]);
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
    pilot.onChange(render);
    render();
    return box;
  }

  // userscript/combos/run-combos.ts
  var data;
  var dataFrom;
  function runCombos(link) {
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

  // userscript/panel/panel.css.ts
  var css3 = `
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
.tbh-badge { display: inline-block; padding: 0 4px; border-radius: 3px; font-size: 9.5px; font-weight: 800; letter-spacing: .06em; text-align: center; }
.tbh-badge-new { align-self: flex-start; background: #ff7ad9; color: #3d0630; margin: 0 0 2px; }
.tbh-badge-evo { background: #ffd36b; color: #3a2600; }
`;

  // userscript/panel/connection.css.ts
  var css4 = `
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
.tbh-conn-status[data-state="error"] { color: #f0b3aa; }
.tbh-wheel { display: block; width: 100%; margin-top: 6px; padding: 5px 8px; white-space: nowrap; font: inherit; font-weight: 800; letter-spacing: .02em; cursor: pointer;
  color: #f3e6c4; background: linear-gradient(180deg, #3b2f52, #2a2140); border: 1px solid #8e74c9; border-radius: 4px; }
.tbh-wheel:hover:not(:disabled) { border-color: #c9a0ff; color: #fff; }
.tbh-wheel:disabled, .tbh-giveback:disabled { opacity: .5; cursor: default; }
.tbh-wheel-note { margin-top: 4px; font-size: 11px; color: #f0b3aa; overflow-wrap: anywhere; }
.tbh-wheel-note[hidden], .tbh-panel:not(.tbh-pilot) .tbh-chatbox { display: none; }
`;

  // userscript/panel/sprites.css.ts
  var css5 = `
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
`;

  // userscript/panel/card-notes.css.ts
  var css6 = `
.ui-card.tbh-card-new { box-shadow: 0 0 0 2px #ff7ad9, 0 0 16px rgba(255,122,217,.6) !important; }
.ui-card.tbh-card-evo { box-shadow: 0 0 0 2px #ffd36b, 0 0 14px rgba(255,211,107,.55) !important; }
.ui-card.tbh-card-new.tbh-card-evo { box-shadow: 0 0 0 2px #ff7ad9, 0 0 0 4px #ffd36b, 0 0 16px rgba(255,211,107,.5) !important; }
.tbh-card { display: flex; flex-direction: column; gap: 2px; margin-top: 4px; font: clamp(11px, .6em, 16px)/1.3 ui-monospace, Menlo, Consolas, monospace; color: #c9b58a; text-align: start; }
.tbh-line { display: flex; align-items: center; gap: 5px; }
.tbh-line.tbh-done > .tbh-icon:first-child { box-shadow: 0 0 0 1px #7fe3a4; }
.tbh-line.tbh-leveling > .tbh-icon:first-child { box-shadow: 0 0 0 1px #ffcf5a; }
.tbh-line.tbh-missing > .tbh-icon:first-child { opacity: .55; }
.tbh-line.tbh-done, .tbh-line.tbh-leveling { color: #f3e6c4; }
.tbh-arrow { color: #8d7c5c; }
.tbh-ready-tag { color: #5ee8a0; font-weight: 700; }
`;

  // userscript/panel/sprites.ts
  function initials(name) {
    const words = name.split(/[\s-]+/).filter(Boolean);
    return (words.length > 1 ? `${words[0]?.[0]}${words[1]?.[0]}` : name.slice(0, 2)).toUpperCase();
  }
  var tips = new WeakMap;
  function icon(v, key, note = "", className = "") {
    const id = idOf(key);
    const frame = v.icons?.frames.get(id);
    const banished = v.banished.has(id);
    const box = h("span", `tbh-icon ${className}${banished ? " tbh-banished" : ""}`.trim());
    const notes = [...banished ? ["banished this run"] : [], ...note === "" ? [] : [note]].join(" · ");
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
    for (const k of ["x", "y", "w", "h", "ax", "ay"])
      s.setProperty(`--${k}`, String(frame[k]));
    box.append(art);
    return box;
  }
  function startTips() {
    const tip = h("div", "tbh-tip");
    tip.hidden = true;
    document.body.append(tip);
    let anchor;
    const hide = () => {
      anchor = undefined;
      tip.hidden = true;
    };
    const show = (el, content) => {
      anchor = el;
      tip.replaceChildren(h("div", "tbh-tip-name", content.name), ...content.note === "" ? [] : [h("div", "tbh-tip-note", content.note)], ...content.description === undefined ? [] : [h("div", "tbh-tip-desc", content.description)]);
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

  // userscript/panel/combos-list.ts
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
  function header(panel, count) {
    const el = h("div", "tbh-header", h("span", "", "Combos"), h("span", "tbh-count", count));
    el.addEventListener("click", () => panel.classList.toggle(panel.classList.contains("tbh-choice") ? "tbh-peek" : "tbh-collapsed"));
    return el;
  }
  function renderPanel(panel, content, v) {
    const rows = unpaired(v.d.combos, v.loadout);
    const paired = relevantCombos(v.d.combos, v.loadout).filter((c) => c.parts.every((p) => v.loadout.has(p.key)));
    const ready = paired.filter((c) => comboProgress(c, v.loadout, v.d.catalog).every((s) => s === "done"));
    const body = h("div", "tbh-body");
    if (rows.length === 0)
      body.append(h("div", "tbh-empty", paired.length > 0 ? "Everything you hold is paired." : "Nothing you hold has a combo."));
    for (const { held, options } of rows) {
      const fresh = options.some((o) => !v.discovery.made(o.combo.result));
      const opts = h("span", "tbh-opts");
      for (const o of options)
        opts.append(icon(v, o.partner.key, pairingNote(v, o.partner, o.combo), v.discovery.made(o.combo.result) ? "" : "tbh-fresh"));
      body.append(h("div", "tbh-need", fresh ? h("span", "tbh-badge tbh-badge-evo", "NEW") : h("span", ""), icon(v, held), h("span", "tbh-colon", ":"), opts));
    }
    const counts = [`${rows.length} open`, `${paired.length} paired`, ...ready.length > 0 ? [`${ready.length} ready`] : []].join(" · ");
    const head = header(panel, counts);
    head.title = paired.map((c) => `${c.parts.map((p) => partTitle(v, p)).join(" + ")} → ${nameOf(v.d.catalog, c.result)}`).join(`
`);
    content.replaceChildren(head, body);
  }
  function renderProblem(panel, content, message) {
    content.replaceChildren(header(panel, "offline"), h("div", "tbh-stale", message));
  }

  // userscript/panel/connection.ts
  function connectionRow(bridge, openFsd) {
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
    const wheel = h("button", "tbh-wheel", "Full Self Driving");
    wheel.type = "button";
    wheel.addEventListener("click", () => openFsd(wheel));
    const wheelNote = h("div", "tbh-wheel-note");
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
      const pilot = bridge.pilot.state();
      wheel.hidden = pilot.state !== "off";
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
    const row = h("form", "tbh-conn-row", h("span", "tbh-conn-label", "Agent port"), input, button, connected, dot);
    row.noValidate = true;
    row.addEventListener("submit", connect);
    bridge.onChange(refresh);
    bridge.pilot.onChange(refresh);
    input.addEventListener("input", () => {
      input.classList.remove("tbh-invalid");
      refresh();
    });
    refresh();
    return h("div", "tbh-conn", row, status, wheel, wheelNote);
  }

  // userscript/panel/card-notes.ts
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
  function annotateCard(card, v, version) {
    const offer = offerKey(card);
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
    const box = h("div", "tbh-card");
    if (isNew)
      box.append(h("span", "tbh-badge tbh-badge-new", "UNSEEN"));
    for (const combo of uses) {
      const other = partner(combo, offer.key);
      const ready = comboProgress(combo, after, v.d.catalog).every((s) => s === "done");
      const fresh = !v.discovery.made(combo.result);
      box.append(h("div", `tbh-line tbh-${partState(other, v.loadout, v.d.catalog)}`, icon(v, other.key, partNeed(v, other)), h("span", "tbh-arrow", "→"), icon(v, combo.result, fresh ? "never made" : "", fresh ? "tbh-fresh" : ""), h("span", "tbh-result", nameOf(v.d.catalog, combo.result)), ...ready ? [h("span", "tbh-ready-tag", "READY")] : []));
    }
    (card.querySelector(".ui-card-text") ?? card).append(box);
  }

  // userscript/fsd/popup.css.ts
  var css7 = `
.tbh-fsd { --gold: #ffd36b; --text: #f3e6c4; --muted: #a8977a; --line: #6b5631; --violet: #c9a0ff; --bad: #ff8f80;
  padding: 0; margin: auto; border: 0; background: transparent; color: var(--text); overflow: visible;
  width: min(1320px, calc(100vw - 32px)); max-width: none; max-height: none;
  font: 12.5px/1.45 ui-monospace, Menlo, Consolas, monospace; }
.tbh-fsd::backdrop { background: rgba(8,6,14,.62); backdrop-filter: blur(3px); animation: tbh-fsd-fade .35s ease-out; }
.tbh-fsd.tbh-fsd-leaving::backdrop { opacity: 0; transition: opacity .45s ease-in; }
@keyframes tbh-fsd-fade { from { opacity: 0; } }
.tbh-fsd-sheet { display: flex; flex-direction: column; max-height: calc(100vh - 32px); box-sizing: border-box; border-radius: 12px; overflow: hidden;
  background: linear-gradient(180deg, #1d1726, #15110c 40%); border: 1px solid #8e74c9; box-shadow: 0 24px 80px rgba(0,0,0,.65), 0 0 0 1px rgba(201,160,255,.12) inset; }
.tbh-fsd-head { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,.08); }
.tbh-fsd-title { display: flex; align-items: center; gap: 10px; margin: 0; font-size: 15px; font-weight: 900; letter-spacing: .02em; color: var(--text); }
.tbh-fsd-logo { padding: 2px 7px; border-radius: 5px; font-size: 12px; letter-spacing: .12em; color: #1d1530; background: linear-gradient(135deg, var(--violet), var(--gold)); }
.tbh-fsd-status { flex: 1; min-width: 0; font-size: 11.5px; color: var(--muted); }
.tbh-fsd-status[data-state="on"] { color: #7fe3a4; }
.tbh-fsd-status[data-state="error"] { color: var(--bad); }
.tbh-fsd-x { flex: none; width: 28px; height: 28px; font: inherit; font-size: 18px; line-height: 1; color: var(--muted); background: transparent; border: 1px solid transparent; border-radius: 6px; cursor: pointer; }
.tbh-fsd-x:hover { color: var(--text); border-color: var(--line); }
.tbh-fsd-body { flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(220px, 280px) 1fr; }
.tbh-fsd-state { display: flex; flex-direction: column; gap: 6px; min-height: 0; padding: 12px; border-right: 1px solid rgba(255,255,255,.08); background: rgba(0,0,0,.18); overflow: hidden; }
.tbh-fsd-blocks { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; padding-right: 2px; overscroll-behavior: contain; }
.tbh-fsd-block { display: flex; flex-direction: column; gap: 2px; padding: 6px 8px; text-align: start; font: inherit; font-size: 11.5px; color: var(--text); background: rgba(255,255,255,.035); border: 1px solid rgba(255,255,255,.07); border-radius: 6px; cursor: copy; }
.tbh-fsd-block:hover { border-color: var(--violet); background: rgba(201,160,255,.09); }
.tbh-fsd-block[hidden] { display: none; }
.tbh-fsd-block-head { display: flex; align-items: baseline; gap: 6px; }
.tbh-fsd-block-head b { color: var(--violet); }
.tbh-fsd-block-head b { flex: none; white-space: nowrap; }
.tbh-fsd-block-count { margin-left: auto; font-size: 10.5px; font-weight: 800; color: var(--gold); }
.tbh-fsd-block-used { border-color: rgba(255,211,107,.45); }
.tbh-fsd-block-about { color: var(--muted); font-size: 10.5px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.tbh-fsd-search { padding: 5px 8px; font: inherit; color: var(--text); background: rgba(0,0,0,.35); border: 1px solid var(--line); border-radius: 5px; }
.tbh-fsd-search:focus { outline: none; border-color: var(--violet); }
.tbh-fsd-main { min-height: 0; overflow-y: auto; display: grid; grid-template-columns: minmax(0, 2.1fr) minmax(0, 1fr); align-items: start; gap: 16px; padding: 14px 16px 18px; overscroll-behavior: contain; }
.tbh-fsd-builder, .tbh-fsd-loadout, .tbh-fsd-world { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.tbh-fsd-side { position: sticky; top: 0; display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.tbh-fsd-entities { display: flex; flex-wrap: wrap; gap: 5px; }
.tbh-fsd-entity-groups { display: flex; flex-direction: column; gap: 5px; }
.tbh-fsd-entity-type { margin: 4px 0 0; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--muted); }
.tbh-fsd-entity { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px 3px 5px; font: inherit; font-size: 11.5px; color: var(--text); background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: 999px; cursor: copy; }
.tbh-fsd-entity:hover { border-color: var(--gold); background: rgba(255,211,107,.1); }
.tbh-fsd-entity-icon { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; color: var(--gold); }
.tbh-fsd-entity-icon .tbh-svg-fill { fill: currentColor; stroke: none; }
.tbh-fsd-tip { position: fixed; z-index: 1; max-width: min(520px, calc(100vw - 16px)); max-height: calc(100vh - 16px); overflow: hidden; box-sizing: border-box; padding: 8px 10px; pointer-events: none;
  background: #1b1622; border: 1px solid #8e74c9; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,.6); font-size: 11.5px; }
.tbh-fsd-tip[hidden] { display: none; }
.tbh-fsd-tip-name { color: var(--violet); }
.tbh-fsd-tip-key { margin-left: 8px; font: inherit; font-size: 10.5px; color: var(--gold); }
.tbh-fsd-tip-about { margin-top: 3px; color: var(--muted); }
.tbh-fsd-tip-label { margin-top: 7px; font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; color: var(--gold); }
.tbh-fsd-tip-value { margin: 3px 0 0; padding: 6px 8px; white-space: pre-wrap; overflow-wrap: anywhere; font: inherit; font-size: 11px; color: #dbe6ff; background: rgba(0,0,0,.35); border-radius: 5px; }
.tbh-fsd-label { margin: 0; font-size: 11px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; color: var(--gold); }
.tbh-fsd-hint { margin: 0; font-size: 11px; color: var(--muted); }
.tbh-fsd-grow { display: grid; border: 1px solid var(--line); border-radius: 6px; background: rgba(0,0,0,.35); }
.tbh-fsd-grow:focus-within { border-color: var(--violet); box-shadow: 0 0 0 2px rgba(201,160,255,.18); }
.tbh-fsd-area, .tbh-fsd-mirror { grid-area: 1 / 1; box-sizing: border-box; min-height: 3.2em; margin: 0; padding: 8px 10px; border: 0; font: inherit; line-height: 1.5; letter-spacing: normal; white-space: pre-wrap; overflow-wrap: anywhere; word-break: normal; tab-size: 2; }
.tbh-fsd-area { resize: none; overflow: hidden; color: var(--text); caret-color: var(--gold); background: transparent; outline: none; }
.tbh-fsd-area::placeholder { color: #7d6d52; }
.tbh-fsd-mirror { color: transparent; pointer-events: none; user-select: none; }
.tbh-fsd-chip { color: transparent; background: rgba(201,160,255,.22); border-radius: 4px; box-shadow: 0 0 0 1px rgba(201,160,255,.55); }
.tbh-fsd-chip-bad { background: rgba(255,143,128,.2); box-shadow: 0 0 0 1px var(--bad); }
.tbh-fsd-errors { margin: 2px 0 0; padding: 0 0 0 16px; font-size: 11px; color: var(--bad); }
.tbh-fsd-errors[hidden] { display: none; }
.tbh-fsd-build-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.tbh-fsd-build { padding: 7px 16px; font: inherit; font-weight: 900; color: #1d1530; background: var(--violet); border: 0; border-radius: 6px; cursor: pointer; }
.tbh-fsd-build:hover:not(:disabled) { filter: brightness(1.1); }
.tbh-fsd-build:disabled { opacity: .5; cursor: not-allowed; }
.tbh-fsd-build-note { flex: 1; min-width: 0; font-size: 11px; color: var(--muted); }
.tbh-fsd-build-stale { color: var(--gold); }
.tbh-fsd-code-label { margin-top: 12px; }
.tbh-fsd-now { font-size: 11.5px; color: #7fe3a4; }
.tbh-fsd-now[hidden], .tbh-fsd-memory[hidden] { display: none; }
.tbh-fsd-memory { margin: 0; padding: 6px 10px; max-height: 18vh; overflow: auto; font: inherit; font-size: 11px; color: #dbe6ff; background: rgba(127,227,164,.07); border: 1px solid rgba(127,227,164,.25); border-radius: 6px; }
.tbh-fsd-now-error { color: var(--bad); }
.tbh-fsd-builder .tbh-code { max-height: 52vh; }
.tbh-fsd-block-type { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font: inherit; font-size: 10px; color: #7fd6ff; }
.tbh-fsd-block-value { flex: none; margin-left: auto; max-width: 14ch; overflow: hidden; text-overflow: ellipsis; font-size: 10.5px; font-variant-numeric: tabular-nums; color: #dbe6ff; }
.tbh-fsd-fold summary { font-size: 11px; color: var(--muted); cursor: pointer; }
.tbh-fsd-fold[open] summary { margin-bottom: 6px; }
.tbh-fsd-embed { padding: 2px 7px; font-size: 10.5px; color: var(--violet); }
.tbh-fsd-foot { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-top: 1px solid rgba(255,255,255,.08); background: rgba(0,0,0,.25); }
.tbh-fsd-saved { flex: 1; min-width: 0; font-size: 11px; color: var(--muted); }
.tbh-fsd-saved-bad { color: var(--bad); }
.tbh-fsd-stop { padding: 7px 14px; font: inherit; font-weight: 800; color: #ffd6d0; background: rgba(227,138,127,.12); border: 1px solid #e38a7f; border-radius: 6px; cursor: pointer; }
.tbh-fsd-stop[hidden] { display: none; }
.tbh-fsd-engage { min-width: 140px; padding: 8px 18px; font: inherit; font-size: 13px; font-weight: 900; letter-spacing: .04em; color: #1d1530; background: linear-gradient(135deg, var(--violet), var(--gold)); border: 0; border-radius: 6px; cursor: pointer; box-shadow: 0 4px 18px rgba(201,160,255,.25); }
.tbh-fsd-engage:hover:not(:disabled) { filter: brightness(1.08); }
.tbh-fsd-engage:disabled { opacity: .45; cursor: not-allowed; box-shadow: none; }
@media (max-width: 860px) {
  .tbh-fsd-body { grid-template-columns: 1fr; overflow-y: auto; }
  .tbh-fsd-state { max-height: 32vh; border-right: 0; border-bottom: 1px solid rgba(255,255,255,.08); }
  .tbh-fsd-main { grid-template-columns: 1fr; overflow: visible; }
  .tbh-fsd-side { position: static; }
}
@media (max-width: 520px) {
  .tbh-fsd { width: calc(100vw - 16px); }
  .tbh-fsd-sheet { max-height: calc(100vh - 16px); }
  .tbh-fsd-foot { flex-wrap: wrap; }
  .tbh-fsd-saved { flex-basis: 100%; }
  .tbh-fsd-engage { flex: 1; }
}
`;

  // userscript/fsd/code-view.css.ts
  var css8 = `
.tbh-code { margin: 0; padding: 10px 0; overflow: auto; font: 11.5px/1.55 ui-monospace, Menlo, Consolas, monospace; color: #e8dcc0; background: rgba(0,0,0,.34); border: 1px solid rgba(255,255,255,.07); border-radius: 8px; tab-size: 2; }
.tbh-code-line { display: block; min-width: max-content; padding: 0 12px; border-left: 3px solid transparent; }
.tbh-code-live { background: rgba(127,227,164,.14); border-left-color: #7fe3a4; }
.tbh-code-keyword { color: #c9a0ff; }
.tbh-code-type { color: #7fd6ff; }
.tbh-code-string { color: #ffd36b; }
.tbh-code-number { color: #ff9f7a; }
.tbh-code-comment { color: #8d7c5c; font-style: italic; }
.tbh-code-field { border-bottom: 1px dotted rgba(127,214,255,.6); cursor: help; }
.tbh-code-declared { border-bottom: 1px dotted rgba(127,214,255,.6); cursor: help; }
.tbh-code-field:hover, .tbh-code-declared:hover { background: rgba(127,214,255,.16); }
.tbh-code-compact { padding: 4px 0; font-size: 9.5px; line-height: 1.4; border: 0; background: transparent; overflow: hidden; }
.tbh-code-compact .tbh-code-line { padding: 0 6px; border-left-width: 2px; }
.tbh-code-compact :is(.tbh-code-field, .tbh-code-declared) { border-bottom: 0; }
.tbh-code-tip { max-height: none; margin-top: 6px; padding: 6px 0; font-size: 10.5px; }
.tbh-code-tip .tbh-code-line { padding: 0 8px; }
`;

  // userscript/fsd/code-view.ts
  var KEYWORDS = new Set(["const", "let", "if", "else", "return", "function", "type", "export", "true", "false", "null", "undefined", "extends", "typeof", "in"]);
  var styled = false;
  function codeView(fields, types, compact = false) {
    if (!styled)
      addStyle(css8);
    styled = true;
    const known = new Set(fields.map((f) => f.path));
    const roots = [...new Set(fields.map((f) => f.path.split(".")[0] ?? ""))];
    const token = new RegExp([
      "(\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/)",
      "(\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|`(?:\\\\.|[^`\\\\])*`)",
      "\\b(\\d+(?:\\.\\d+)?)\\b",
      `(?<![.\\w])((?:state\\??\\.)?(?:${roots.join("|")})(?:\\??\\.[A-Za-z_]\\w*)*)(?![\\w:])`,
      "\\b([A-Za-z_]\\w*)\\b"
    ].join("|"), "g");
    const fieldOf = (read) => {
      const parts = read.replace(/\?/g, "").replace(/^state\./, "").split(".");
      while (parts.length > 0 && !known.has(parts.join(".")))
        parts.pop();
      return parts.length === 0 ? undefined : parts.join(".");
    };
    const paint = (line) => {
      const out = [];
      let at = 0;
      for (const m of line.matchAll(token)) {
        if (m.index > at)
          out.push(line.slice(at, m.index));
        at = m.index + m[0].length;
        const [text, comment, string, number, read, word] = m;
        if (comment !== undefined)
          out.push(h("span", "tbh-code-comment", text));
        else if (string !== undefined)
          out.push(h("span", "tbh-code-string", text));
        else if (number !== undefined)
          out.push(h("span", "tbh-code-number", text));
        else if (read !== undefined) {
          const path = fieldOf(read);
          const el = h("span", path === undefined ? "" : "tbh-code-field", text);
          if (path !== undefined)
            el.dataset.path = path;
          out.push(el);
        } else if (word !== undefined && KEYWORDS.has(word))
          out.push(h("span", "tbh-code-keyword", text));
        else if (word !== undefined && /^[A-Z]/.test(word)) {
          const el = h("span", `tbh-code-type${types.has(word) ? " tbh-code-declared" : ""}`, text);
          if (types.has(word))
            el.dataset.type = word;
          out.push(el);
        } else
          out.push(text);
      }
      if (at < line.length)
        out.push(line.slice(at));
      return out;
    };
    const whyOf = (line) => {
      const literal = /\bwhy:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/.exec(line)?.[1];
      if (literal === undefined)
        return;
      const parts = literal.slice(1, -1).split(literal.startsWith("`") ? /\$\{[^}]*\}/ : /(?!)/);
      return new RegExp(`^${parts.map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`);
    };
    const el = h("pre", `tbh-code${compact ? " tbh-code-compact" : ""}`);
    let shown = "";
    let lines = [];
    let lit = "";
    return {
      el,
      show(source, why) {
        if (source !== shown) {
          shown = source;
          lines = source.split(`
`).map((line) => ({ el: h("span", "tbh-code-line", ...paint(line), `
`), returns: whyOf(line) }));
          el.replaceChildren(...lines.map((l) => l.el));
          lit = "";
        }
        if ((why ?? "") === lit)
          return;
        lit = why ?? "";
        let first;
        for (const line of lines) {
          const live = why !== undefined && line.returns?.test(why) === true;
          line.el.classList.toggle("tbh-code-live", live);
          if (live)
            first ??= line.el;
        }
        if (compact && first !== undefined)
          el.scrollTop = Math.max(0, first.offsetTop - el.clientHeight / 2);
      },
      hoverAt(target) {
        const at = target instanceof HTMLElement ? target.closest(".tbh-code-field, .tbh-code-declared") : null;
        if (at === null || !el.contains(at))
          return;
        const box = at.getBoundingClientRect();
        if (at.dataset.type !== undefined)
          return { type: at.dataset.type, box };
        return at.dataset.path === undefined ? undefined : { field: at.dataset.path, box };
      }
    };
  }

  // userscript/fsd/drive-overlay.css.ts
  var css9 = `
.tbh-do { position: fixed; top: 8px; left: 8px; z-index: 2147483000; box-sizing: border-box; width: min(430px, calc(100vw - 16px)); padding: 6px 0 4px;
  pointer-events: none; color: #f3e6c4; background: rgba(17,14,22,.84); border: 1px solid rgba(142,116,201,.7); border-radius: 8px; box-shadow: 0 4px 18px rgba(0,0,0,.5);
  font: 11px/1.35 ui-monospace, Menlo, Consolas, monospace; }
.tbh-do[hidden] { display: none; }
.tbh-do-head { display: flex; align-items: baseline; gap: 7px; padding: 0 8px 4px; }
.tbh-do-logo { padding: 1px 5px; border-radius: 4px; font-size: 9.5px; font-weight: 900; letter-spacing: .12em; color: #1d1530; background: linear-gradient(135deg, #c9a0ff, #ffd36b); }
.tbh-do-why { color: #7fe3a4; white-space: nowrap; }
.tbh-do-action { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 10.5px; color: #c9b58a; }
.tbh-do-error :is(.tbh-do-why, .tbh-do-action) { color: #ff8f80; }
.tbh-do .tbh-code { max-height: 40vh; }
@media (max-width: 699px) {
  /* The panel sits under it on a phone, so only what the function returned. */
  .tbh-do { width: min(260px, 64vw); }
  .tbh-do .tbh-code { display: none; }
  .tbh-do-head { flex-wrap: wrap; }
}
`;

  // userscript/fsd/drive-overlay.ts
  var actionWords = (action) => {
    const { type, why: _, ...rest } = action;
    return [type, ...Object.entries(rest).map(([k, v]) => k === "id" ? `#${v}` : String(v))].join(" ");
  };
  function driveOverlay(pilot, fields, types) {
    addStyle(css9);
    const view = codeView(fields, types, true);
    const why = h("b", "tbh-do-why");
    const action = h("span", "tbh-do-action");
    const box = h("aside", "tbh-do", h("header", "tbh-do-head", h("span", "tbh-do-logo", "FSD"), why, action), view.el);
    box.setAttribute("aria-label", "Full Self Driving's function");
    box.hidden = true;
    document.body.append(box);
    const render = () => {
      box.hidden = pilot.state().state === "off";
      if (box.hidden)
        return;
      const now = pilot.active();
      why.textContent = now?.error !== undefined ? "drive threw" : now?.action?.why ?? "";
      action.textContent = now?.error ?? (now?.action === undefined ? "waiting for the first call" : actionWords(now.action));
      box.classList.toggle("tbh-do-error", now?.error !== undefined);
      view.show(pilot.draft().code, now?.action?.why);
    };
    pilot.onChange(render);
    render();
  }

  // userscript/fsd/driver-source.ts
  var DRIVER_TYPES = `// What Full Self Driving's function reads and returns. The bot calls \`drive(state)\` four times a
// second and has the autopilot carry out the action it returns. This file stands alone, with no
// imports: its text is the type check's prelude, part of the builder's prompt, and what the popup
// shows beside the code. Names are the game's own.

export type Direction = "right" | "down-right" | "down" | "down-left" | "left" | "up-left" | "up" | "up-right";

/** Where something is from Tibo. Distances are world units; Tibo walks about 62 a second. */
export type Placed = {
  /** The id an action names it by. */
  id: number;
  dist: number;
  /** The way to walk to it; "still" when Tibo stands on or in it. */
  dir: Direction | "still";
  /** Tibo gave up on it in the last 45 seconds: it could not be reached, charged or paid for. */
  gaveUp: boolean;
};

/** A weapon or passive Tibo holds, by the game's id, with its level of the most it can reach. */
export type Held = { id: string; name: string; level: number; max: number };

export type Pickup = Placed & {
  /**
   * The game's pickup kind. A chest opens after Tibo has stood on it; the game calls it a goldChest
   * when a boss or Poteto left it. heal is food. magnet pulls in all the xp on the ground.
   */
  kind: "chest" | "goldChest" | "heal" | "magnet" | "reroll" | "skip" | "banish" | "item" | "beacon";
  /** For a chest: seconds stood on it so far, and the seconds it takes to open. */
  charged?: number;
  chargeSeconds?: number;
};

/** A point of interest: a place that does something once Tibo has stood inside it. Only unused ones are listed. */
export type Poi = Placed & {
  /** The game's kind, such as chargeShrine or paidChest; a variety place goes by its own id, such as lighthouse. */
  kind: string;
  /** The game's English name, such as Spud Shrine or Potato Crate. */
  name: string;
  inside: boolean;
  /** Seconds stood inside so far, and the seconds it takes to charge. */
  charged: number;
  chargeSeconds: number;
};

export type Enemy = Placed & {
  /** The game's id of the enemy or boss. */
  kind: string;
  name: string;
  hp: number;
  maxHp: number;
};

export type State = {
  /** Seconds of game time since the run began. */
  time: number;
  /** The second the run counts as won; it goes on after that until Tibo dies. */
  winAt: number;
  tibo: {
    hp: number;
    maxHp: number;
    /** Health lost over the last 3 seconds. */
    hurt: number;
    /** Damage dealt a second over the last 3 seconds. */
    dps: number;
    level: number;
    gold: number;
    x: number;
    y: number;
    dash: { charges: number; max: number };
    /** Up to 6 of each. */
    weapons: Held[];
    passives: Held[];
    items: { id: string; name: string; count: number }[];
    /** Weapons the next chest opened would evolve, because their recipe is complete. */
    evolves: string[];
    /** The effective stats, by the game's own names, such as damageMult, armor and magnetRadius. */
    stats: Record<string, number>;
  };
  enemies: {
    onScreen: number;
    /** Enemies on screen in each direction. */
    byDirection: Record<Direction, number>;
    /** The direction with the fewest enemies on screen, and the one with the most. */
    fewest: Direction;
    most: Direction;
    /** Bullets about to arrive from each direction. */
    bullets: Record<Direction, number>;
  };
  /** Every list below is nearest first. */
  elites: Enemy[];
  bosses: Enemy[];
  /** What lies on the ground, other than xp and gold. */
  pickups: Pickup[];
  pois: Poi[];
  /** The total value of the xp and of the gold lying on the ground. */
  ground: { xp: number; gold: number };
  /** Gold a Potato Crate (paidChest) costs now, and a Tater Slots spin. */
  prices: { crate: number; slots: number };
  /** Timed boosts running, by the game's key, with the seconds left. */
  boosts: { name: string; endsIn: number }[];
  /** The next boss, elite and event to come, with the run second each comes at. */
  upcoming: { at: number; text: string }[];
  /** What \`drive\` returned last time and for how many seconds it has returned the same; null on the first call. To remember anything else, keep it in \`memory\`. */
  previous: { action: Action; seconds: number } | null;
};

/**
 * What the autopilot does until the next call. It walks there and dodges on its own. \`why\` is a
 * few words shown to the person watching, and comes back as \`state.previous.action.why\`.
 */
export type Action = (
  /** Walk to a pickup and take it; a chest is stood on until it opens. */
  | { type: "pickup"; id: number }
  /** Walk to a point of interest and stand inside it until it has charged. */
  | { type: "poi"; id: number }
  /** Fight an elite: keep it within reach of Tibo's weapons until it dies. */
  | { type: "elite"; id: number }
  /** Walk that way. */
  | { type: "move"; dir: Direction }
  /** Dash that way, a quick burst that spends a dash charge; with none, walk that way. */
  | { type: "dash"; dir: Direction }
  /** Stand still, stepping aside only when standing would cost more health than moving. */
  | { type: "still" }
) & { why?: string };
`;

  // userscript/fsd/entities.ts
  var SECTIONS = ["Chests", "Pickups", "Shrines", "Buffs", "Upgrades", "Loot", "Travel", "Other"];
  var POI_SECTIONS = {
    paidChest: "Chests",
    chargeShrine: "Shrines",
    curseShrine: "Shrines",
    goldenShrine: "Shrines",
    botDock: "Buffs",
    chiliBottle: "Buffs",
    dinnerBell: "Buffs",
    frenzyFryer: "Buffs",
    mashBomb: "Buffs",
    spudFreezer: "Buffs",
    taterMagnet: "Buffs",
    dog: "Upgrades",
    dogKennel: "Upgrades",
    microwave: "Upgrades",
    seedVault: "Upgrades",
    taterSlots: "Upgrades",
    vendor: "Upgrades",
    whetstone: "Upgrades",
    bossLair: "Loot",
    crops: "Loot",
    digSpot: "Loot",
    eliteNest: "Loot",
    lighthouse: "Loot",
    taterLantern: "Loot",
    treasureMap: "Loot",
    rootTunnel: "Travel",
    rowboat: "Travel"
  };
  var PICKUPS = [
    { section: "Chests", key: "chest", name: "chest", tag: "Loot", about: "A chest an elite, a loot runner or a place left on the ground. Standing on it for 1 second opens it." },
    { section: "Chests", key: "goldChest", name: "goldChest", tag: "Loot", about: "A chest a boss or Poteto left. It opens like a chest, after 1.5 seconds." },
    { section: "Pickups", key: "heal", name: "heal", tag: "Eat", about: "Food on the ground, which gives health back." },
    { section: "Pickups", key: "magnet", name: "magnet", tag: "Magnet", about: "A magnet on the ground, which pulls in all the xp lying there." }
  ];
  function worldEntities(link) {
    const found = [...PICKUPS];
    const place = (key, name, about) => found.push({ section: POI_SECTIONS[key] ?? "Other", key, name, about: about ?? "", tag: SPOT_TAGS[key] ?? "Spot" });
    for (const { kind } of link.table?.pois ?? []) {
      const name = link.message(`content.poi.${kind}.name`);
      if (kind !== "varietyPlace" && name !== undefined)
        place(kind, name, link.message(`content.poi.${kind}.desc`));
    }
    for (const key of Object.keys(link.messages)) {
      const id = /^content\.varietyPlace\.([^.]+)\.name$/.exec(key)?.[1];
      const name = id === undefined ? undefined : link.message(key);
      if (name !== undefined && id !== undefined)
        place(id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()), name, link.message(`content.varietyPlace.${id}.desc`));
    }
    return found.sort((a, z) => SECTIONS.indexOf(a.section) - SECTIONS.indexOf(z.section) || a.name.localeCompare(z.name));
  }

  // userscript/panel/keys.ts
  var ownKeydowns = new Set;
  function onOwnKeydown(listener) {
    ownKeydowns.add(listener);
  }
  function guardPanelKeys() {
    for (const type of ["keydown", "keyup", "keypress"]) {
      window.addEventListener(type, (e) => {
        if (!(e.target instanceof Element) || e.target.closest(`#${PANEL_ID}, .tbh-fsd`) === null)
          return;
        e.stopImmediatePropagation();
        if (type === "keydown")
          for (const listener of ownKeydowns)
            listener(e);
      }, true);
    }
  }
  // protocol/state.example.json
  var state_example_default = {
    time: 84.4,
    state: {
      time: 84.4,
      winAt: 1200,
      tibo: {
        hp: 132,
        maxHp: 137,
        hurt: 0,
        dps: 38,
        level: 4,
        gold: 0,
        x: 605,
        y: 1944,
        dash: {
          charges: 2,
          max: 2
        },
        weapons: [
          {
            id: "seeker-sprouts",
            name: "Seeker Sprouts",
            level: 3,
            max: 8
          },
          {
            id: "reset-button",
            name: "Reset Button",
            level: 1,
            max: 8
          }
        ],
        passives: [],
        items: [],
        evolves: [],
        stats: {
          damageMult: 1.899,
          areaMult: 1,
          cooldownMult: 0.964,
          amountBonus: 1,
          durationMult: 1.25,
          projSpeedMult: 1,
          moveSpeedMult: 1,
          maxHp: 137.28,
          recovery: 0,
          armor: 8.438,
          magnetRadius: 50.2,
          luck: 0,
          growthMult: 1.575,
          greedMult: 1.05,
          curse: 0.1,
          critChance: 0,
          critMult: 2,
          evasion: 0,
          knockbackMult: 1,
          pierceBonus: 0,
          revivals: 0,
          eliteMult: 1,
          healOnKill: 0,
          explodeOnKillChance: 0,
          thorns: 0,
          chestPriceMult: 1,
          dashCharges: 0,
          dashCooldownMult: 1,
          dashGraceSec: 0
        }
      },
      enemies: {
        onScreen: 12,
        byDirection: {
          right: 2,
          "down-right": 3,
          down: 0,
          "down-left": 2,
          left: 1,
          "up-left": 0,
          up: 2,
          "up-right": 2
        },
        fewest: "down",
        most: "down-right",
        bullets: {
          right: 0,
          "down-right": 0,
          down: 0,
          "down-left": 0,
          left: 0,
          "up-left": 0,
          up: 0,
          "up-right": 0
        }
      },
      elites: [
        {
          id: 65566,
          dist: 150,
          dir: "up",
          gaveUp: false,
          kind: "cave-grub",
          name: "Cave Grub",
          hp: 509,
          maxHp: 509
        },
        {
          id: 65565,
          dist: 152,
          dir: "up",
          gaveUp: false,
          kind: "cave-grub",
          name: "Cave Grub",
          hp: 454,
          maxHp: 509
        },
        {
          id: 65559,
          dist: 206,
          dir: "up",
          gaveUp: false,
          kind: "cave-grub",
          name: "Cave Grub",
          hp: 381,
          maxHp: 557
        },
        {
          id: 65560,
          dist: 225,
          dir: "up",
          gaveUp: false,
          kind: "cave-grub",
          name: "Cave Grub",
          hp: 450,
          maxHp: 557
        }
      ],
      bosses: [],
      pickups: [
        {
          id: 65594,
          dist: 767,
          dir: "up",
          gaveUp: false,
          kind: "skip"
        },
        {
          id: 65559,
          dist: 1567,
          dir: "up",
          gaveUp: false,
          kind: "heal"
        }
      ],
      pois: [
        {
          id: 79,
          dist: 12,
          dir: "still",
          gaveUp: false,
          kind: "chargeShrine",
          name: "Spud Shrine",
          inside: true,
          charged: 4.8,
          chargeSeconds: 5
        },
        {
          id: 78,
          dist: 135,
          dir: "left",
          gaveUp: false,
          kind: "paidChest",
          name: "Potato Crate",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 84,
          dist: 159,
          dir: "down",
          gaveUp: false,
          kind: "chargeShrine",
          name: "Spud Shrine",
          inside: false,
          charged: 0,
          chargeSeconds: 5
        },
        {
          id: 72,
          dist: 255,
          dir: "up",
          gaveUp: false,
          kind: "vendor",
          name: "Fry Cart",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 83,
          dist: 257,
          dir: "down-left",
          gaveUp: false,
          kind: "taterLantern",
          name: "Tater Lantern",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 85,
          dist: 314,
          dir: "down",
          gaveUp: false,
          kind: "taterLantern",
          name: "Tater Lantern",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 80,
          dist: 358,
          dir: "right",
          gaveUp: false,
          kind: "crops",
          name: "Crop Patch",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 86,
          dist: 394,
          dir: "down-right",
          gaveUp: false,
          kind: "eliteNest",
          name: "Beetle Nest",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 71,
          dist: 394,
          dir: "up-left",
          gaveUp: false,
          kind: "spudFreezer",
          name: "Spud Freezer",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 77,
          dist: 457,
          dir: "left",
          gaveUp: false,
          kind: "chargeShrine",
          name: "Spud Shrine",
          inside: false,
          charged: 0,
          chargeSeconds: 5
        },
        {
          id: 73,
          dist: 462,
          dir: "up-right",
          gaveUp: false,
          kind: "dog",
          name: "Stray Dog",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 76,
          dist: 499,
          dir: "up-left",
          gaveUp: false,
          kind: "curseShrine",
          name: "Moldy Shrine",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 81,
          dist: 525,
          dir: "right",
          gaveUp: false,
          kind: "frenzyFryer",
          name: "Frenzy Fryer",
          inside: false,
          charged: 0,
          chargeSeconds: 2
        },
        {
          id: 82,
          dist: 552,
          dir: "down-left",
          gaveUp: false,
          kind: "taterMagnet",
          name: "Tater Magnet",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 90,
          dist: 559,
          dir: "down",
          gaveUp: false,
          kind: "botDock",
          name: "Bot Dock",
          inside: false,
          charged: 0,
          chargeSeconds: 2
        },
        {
          id: 59,
          dist: 561,
          dir: "up-right",
          gaveUp: false,
          kind: "taterLantern",
          name: "Tater Lantern",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 58,
          dist: 593,
          dir: "up",
          gaveUp: false,
          kind: "frenzyFryer",
          name: "Frenzy Fryer",
          inside: false,
          charged: 0,
          chargeSeconds: 2
        },
        {
          id: 89,
          dist: 600,
          dir: "down",
          gaveUp: false,
          kind: "dog",
          name: "Stray Dog",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 87,
          dist: 606,
          dir: "down-right",
          gaveUp: false,
          kind: "dog",
          name: "Stray Dog",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 56,
          dist: 614,
          dir: "up-left",
          gaveUp: false,
          kind: "paidChest",
          name: "Potato Crate",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 60,
          dist: 620,
          dir: "up",
          gaveUp: false,
          kind: "botDock",
          name: "Bot Dock",
          inside: false,
          charged: 0,
          chargeSeconds: 2
        },
        {
          id: 91,
          dist: 621,
          dir: "down-right",
          gaveUp: false,
          kind: "dog",
          name: "Stray Dog",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 74,
          dist: 663,
          dir: "up-right",
          gaveUp: false,
          kind: "taterLantern",
          name: "Tater Lantern",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 88,
          dist: 672,
          dir: "down-left",
          gaveUp: false,
          kind: "taterSlots",
          name: "Tater Slots",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 92,
          dist: 680,
          dir: "down-right",
          gaveUp: false,
          kind: "paidChest",
          name: "Potato Crate",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 48,
          dist: 729,
          dir: "up",
          gaveUp: false,
          kind: "whetstone",
          name: "Spud Whetstone",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 55,
          dist: 746,
          dir: "up-left",
          gaveUp: false,
          kind: "paidChest",
          name: "Potato Crate",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 75,
          dist: 808,
          dir: "up-right",
          gaveUp: false,
          kind: "crops",
          name: "Crop Patch",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 65,
          dist: 840,
          dir: "up-right",
          gaveUp: false,
          kind: "taterLantern",
          name: "Tater Lantern",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 46,
          dist: 844,
          dir: "up",
          gaveUp: false,
          kind: "crops",
          name: "Crop Patch",
          inside: false,
          charged: 0,
          chargeSeconds: 1
        },
        {
          id: 53,
          dist: 919,
          dir: "up",
          gaveUp: false,
          kind: "paidChest",
          name: "Potato Crate",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 64,
          dist: 925,
          dir: "up-right",
          gaveUp: false,
          kind: "seedVault",
          name: "Seed Vault",
          inside: false,
          charged: 0,
          chargeSeconds: 2
        },
        {
          id: 45,
          dist: 947,
          dir: "up-left",
          gaveUp: false,
          kind: "paidChest",
          name: "Potato Crate",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 69,
          dist: 1027,
          dir: "up-right",
          gaveUp: false,
          kind: "microwave",
          name: "Microwave",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        },
        {
          id: 70,
          dist: 1080,
          dir: "up-right",
          gaveUp: false,
          kind: "curseShrine",
          name: "Moldy Shrine",
          inside: false,
          charged: 0,
          chargeSeconds: 1.5
        }
      ],
      ground: {
        xp: 114,
        gold: 1
      },
      prices: {
        crate: 30,
        slots: 15
      },
      boosts: [],
      upcoming: [
        {
          at: 120,
          text: "boss The Festival Mascot"
        },
        {
          at: 120,
          text: "event Fry Fly Swarm"
        },
        {
          at: 180,
          text: "elite"
        }
      ],
      previous: {
        action: {
          type: "poi",
          id: 79,
          why: "charge the Spud Shrine"
        },
        seconds: 14
      }
    },
    action: {
      type: "poi",
      id: 79,
      why: "charge the Spud Shrine"
    },
    blocks: {
      time: "1:24",
      difficulty: "nightmare",
      mode: "daily",
      health: "Health 132/137 (96%).",
      level: "Level 4, 97% of the way to the next.",
      gold: "Gold 0.",
      dash: "Dash charges 2 of 2.",
      weapons: `Weapons (2 of 6 slots):
  - Seeker Sprouts 3/8: Sprouts that steer toward enemies.
  - Reset Button 1/8: We reset the limits. Clears every enemy on screen. Bosses only flinch.`,
      passives: "Passives (0 of 6 slots): none",
      items: "Items: none",
      banished: "Banished this run: nothing.",
      recipes: "Recipes in reach: Factory Reset: Reset Button leveling 1/8 + Four-Eyed Spud missing; Overgrowth: Seeker Sprouts leveling 3/8 + Fertilizer missing.",
      evolutions: "No recipe is complete yet.",
      standing_on: "Tibo stands inside the Spud Shrine (stand inside to charge it, then pick a stat), charged 4.8 of 5 seconds.",
      hurt_by: "Hurt in the last 3 seconds by: nothing.",
      dps: "Damage dealt a second over the last 3 seconds: 38.",
      bosses: "Bosses: none.",
      enemies: "Enemies: 12 on screen. Most to the down-right (3), fewest to the up-left (0).",
      current_goal: "Current goal: Charge the Spud Shrine, since 1:10.",
      recent_goals: "Recent goals: 0:52 Explore down: drive returned another action; 0:52 Explore down-right: drive returned another action; 1:07 Charge the Spud Shrine: drive returned another action; 1:08 Explore down-right: drive returned another action; 1:08 Explore right: drive returned another action; 1:10 Explore down: drive returned another action.",
      stats: "Stats: damageMult 1.899, areaMult 1, cooldownMult 0.964, amountBonus 1, durationMult 1.25, projSpeedMult 1, moveSpeedMult 1, maxHp 137.28, recovery 0, armor 8.438, magnetRadius 50.2, luck 0, growthMult 1.575, greedMult 1.05, curse 0.1, critChance 0, critMult 2, evasion 0, knockbackMult 1, pierceBonus 0, revivals 0, eliteMult 1, healOnKill 0, explodeOnKillChance 0, thorns 0, chestPriceMult 1, dashCharges 0, dashCooldownMult 1, dashGraceSec 0. Added by shrines: maxHp 14.399999999999999, magnet 0.255, curse 0.1.",
      resources: "Rerolls 0, skips 0, banishes 0, revives 0; curses 1, which add 1 elites and 0.3 bosses.",
      spots: `Spots on the loaded map, nearest first:
  - Spud Shrine (chargeShrine) under Tibo (stand inside to charge it, then pick a stat) Charged 4.8 of 5 s.
  - Potato Crate (paidChest) 135 away to the left (costs gold; holds an item; each crate costs more than the last) Charged 0 of 1.5 s; it costs 30 gold now, and Tibo has 0.
  - Spud Shrine (chargeShrine) 159 away to the down (stand inside to charge it, then pick a stat) Charged 0 of 5 s.
  - Fry Cart (vendor) 255 away to the up (sells items for gold) Charged 0 of 1.5 s; its items cost 80, 140, 240, 400, 640 gold by rarity, and Tibo has 0.
  - Tater Lantern (taterLantern) 257 away to the down-left (break it for a surprise) Charged 0 of 1 s.
  - Tater Lantern (taterLantern) 314 away to the down (break it for a surprise) Charged 0 of 1 s.
  - Crop Patch (crops) 358 away to the right (break it for gold and a snack) Charged 0 of 1 s.
  - Beetle Nest (eliteNest) 394 away to the down-right (an elite waits here; it drops a chest) Charged 0 of 1.5 s.
  - Spud Freezer (spudFreezer) 394 away to the up-left (stand by it to freeze every enemy on the map for 7.5 s; bosses only slow down) Charged 0 of 1.5 s.
  - Spud Shrine (chargeShrine) 457 away to the left (stand inside to charge it, then pick a stat) Charged 0 of 5 s.
  - Stray Dog (dog) 462 away to the up-right (a good dog looking for a friend; walk up to it) Charged 0 of 1 s.
  - Moldy Shrine (curseShrine) 499 away to the up-left (take curse for a pile of gold; curses bring extra elites and bosses) Charged 0 of 1.5 s.
  - Frenzy Fryer (frenzyFryer) 525 away to the right (stand by it for a 20 s frenzy) Charged 0 of 2 s.
  - Tater Magnet (taterMagnet) 552 away to the down-left (stand by it to pull in every gem and coin) Charged 0 of 1 s.
  - Bot Dock (botDock) 559 away to the down (stand by it to call a swarm of grok bots) Charged 0 of 2 s.
  - Tater Lantern (taterLantern) 561 away to the up-right (break it for a surprise) Charged 0 of 1 s.
  - Frenzy Fryer (frenzyFryer) 593 away to the up (stand by it for a 20 s frenzy) Charged 0 of 2 s.
  - Stray Dog (dog) 600 away to the down (a good dog looking for a friend; walk up to it) Charged 0 of 1 s.
  - Stray Dog (dog) 606 away to the down-right (a good dog looking for a friend; walk up to it) Charged 0 of 1 s.
  - Potato Crate (paidChest) 614 away to the up-left (costs gold; holds an item; each crate costs more than the last) Charged 0 of 1.5 s; it costs 30 gold now, and Tibo has 0.
  - Bot Dock (botDock) 620 away to the up (stand by it to call a swarm of grok bots) Charged 0 of 2 s.
  - Stray Dog (dog) 621 away to the down-right (a good dog looking for a friend; walk up to it) Charged 0 of 1 s.
  - Tater Lantern (taterLantern) 663 away to the up-right (break it for a surprise) Charged 0 of 1 s.
  - Tater Slots (taterSlots) 672 away to the down-left (pay gold to spin; match two for an item) Charged 0 of 1.5 s; a spin costs 15 gold, and Tibo has 0.
  - Potato Crate (paidChest) 680 away to the down-right (costs gold; holds an item; each crate costs more than the last) Charged 0 of 1.5 s; it costs 30 gold now, and Tibo has 0.
  - Spud Whetstone (whetstone) 729 away to the up (stand by it to charge it, then level up one of your weapons) Charged 0 of 1.5 s.
  - Potato Crate (paidChest) 746 away to the up-left (costs gold; holds an item; each crate costs more than the last) Charged 0 of 1.5 s; it costs 30 gold now, and Tibo has 0.
  - Crop Patch (crops) 808 away to the up-right (break it for gold and a snack) Charged 0 of 1 s.
  - Tater Lantern (taterLantern) 840 away to the up-right (break it for a surprise) Charged 0 of 1 s.
  - Crop Patch (crops) 844 away to the up (break it for gold and a snack) Charged 0 of 1 s.
  - Potato Crate (paidChest) 919 away to the up (costs gold; holds an item; each crate costs more than the last) Charged 0 of 1.5 s; it costs 30 gold now, and Tibo has 0.
  - Seed Vault (seedVault) 925 away to the up-right (stand by it to charge it for rerolls, a skip and a banish) Charged 0 of 2 s.
  - Potato Crate (paidChest) 947 away to the up-left (costs gold; holds an item; each crate costs more than the last) Charged 0 of 1.5 s; it costs 30 gold now, and Tibo has 0.
  - Microwave (microwave) 1027 away to the up-right (stand by it to charge it, then copy one of your items; the copy melts another item of the same rarity) Charged 0 of 1.5 s.
  - Moldy Shrine (curseShrine) 1080 away to the up-right (take curse for a pile of gold; curses bring extra elites and bosses) Charged 0 of 1.5 s.`,
      dogs: "Dogs: none.",
      pickups: "On the ground: xp worth 113.7 and gold worth 1.1. Chests: none. Food: 1567 up. Other pickups: skip 767 up.",
      buffs: "Timed boosts: none.",
      schedule: "Coming up: 2:00 boss The Festival Mascot; 2:00 event Fry Fly Swarm; 3:00 elite.",
      hazards: "Within 0.5 s: underfoot nothing; walking into nothing. Attacks near: none. Bullets that would hit a Tibo standing still: none.",
      events: "Recent game events: 1:09 biome Ketchup Bog; 1:15 biome Mash Swamp.",
      elites: "Elites alive: Cave Grub (cave-grub) 509/509 hp, 150 away to the up; Cave Grub (cave-grub) 454/509 hp, 152 away to the up; Cave Grub (cave-grub) 381/557 hp, 206 away to the up; Cave Grub (cave-grub) 450/557 hp, 225 away to the up.",
      counters: "What the game has counted this run: counters kills 126, hits 147, gems 25, shots 166; run timeSec 63.31666666666667, level 4, kills 126, distance 3045.233333333253, dodgePoints 826.2243523091407, dodgeSecond 84, curseSince 3034, peakEnemies 47, shrinesUsed 2, grokBotHelps 1.",
      weapon_damage: "Damage dealt so far by weapon: Seeker Sprouts 2126 (1512 a minute), Reset Button 65 (46 a minute).",
      state: `Time 1:24. Health 132/137 (96%). Level 4, 97% of the way to the next. Gold 0. Dash charges 2 of 2.
Weapons (2 of 6 slots):
  - Seeker Sprouts 3/8: Sprouts that steer toward enemies.
  - Reset Button 1/8: We reset the limits. Clears every enemy on screen. Bosses only flinch.
Passives (0 of 6 slots): none
Items: none
Recipes in reach: Factory Reset: Reset Button leveling 1/8 + Four-Eyed Spud missing; Overgrowth: Seeker Sprouts leveling 3/8 + Fertilizer missing.
No recipe is complete yet.
Tibo stands inside the Spud Shrine (stand inside to charge it, then pick a stat), charged 4.8 of 5 seconds.
Hurt in the last 3 seconds by: nothing.
Bosses: none.
Enemies: 12 on screen. Most to the down-right (3), fewest to the up-left (0).
Current goal: Charge the Spud Shrine, since 1:10.
Recent goals: 0:52 Explore down: drive returned another action; 0:52 Explore down-right: drive returned another action; 1:07 Charge the Spud Shrine: drive returned another action; 1:08 Explore down-right: drive returned another action; 1:08 Explore right: drive returned another action; 1:10 Explore down: drive returned another action.`
    }
  };

  // userscript/fsd/popup.ts
  var EMBED = /(\{\{[\w.]+\}\})/;
  var read = (state, path) => path.split(".").reduce((at, key) => at?.[key], state);
  function brief(value) {
    if (value === undefined)
      return "";
    if (Array.isArray(value))
      return `${value.length}`;
    if (typeof value === "object" && value !== null)
      return "{…}";
    const text = String(value);
    return text.length > 14 ? `${text.slice(0, 13)}…` : text;
  }
  function pretty(value) {
    if (value === undefined)
      return;
    if (!Array.isArray(value) || value.length <= 3)
      return JSON.stringify(value, null, 2);
    return `${JSON.stringify(value.slice(0, 3), null, 2).replace(/\n]$/, ",")}
  … ${value.length - 3} more
]`;
  }
  var reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  function growField(embeds, placeholder, onInput) {
    const area = h("textarea", "tbh-fsd-area");
    area.placeholder = placeholder;
    area.spellcheck = false;
    area.rows = 1;
    const mirror = h("div", "tbh-fsd-mirror");
    mirror.setAttribute("aria-hidden", "true");
    const wrap = h("div", "tbh-fsd-grow", mirror, area);
    const paint = () => {
      mirror.replaceChildren(...area.value.split(EMBED).map((part) => {
        const name = EMBED.test(part) ? part.slice(2, -2) : undefined;
        return name === undefined || !embeds ? part : h("mark", `tbh-fsd-chip${name in EMBEDS ? "" : " tbh-fsd-chip-bad"}`, part);
      }), " ");
    };
    area.addEventListener("input", () => {
      paint();
      onInput(area.value);
    });
    return {
      wrap,
      area,
      chipAt(x, y) {
        for (const mark of mirror.querySelectorAll("mark")) {
          const box = [...mark.getClientRects()].find((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
          if (box !== undefined)
            return { name: mark.textContent?.slice(2, -2) ?? "", box };
        }
        return;
      },
      set(value) {
        if (area.value !== value)
          area.value = value;
        paint();
      }
    };
  }
  function errorList(messages) {
    const el = h("ul", "tbh-fsd-errors", ...messages.map((m) => h("li", "", m)));
    el.hidden = messages.length === 0;
    return el;
  }
  function fsdPopup(pilot, game, fields, types) {
    addStyle(css7);
    const dialog = h("dialog", "tbh-fsd");
    dialog.setAttribute("aria-labelledby", "tbh-fsd-title");
    let origin;
    let pausedHere = false;
    let closing = false;
    let target;
    let entities = [];
    const draft = () => pilot.draft();
    const edit = (change) => pilot.edit(change(draft()));
    const title = h("h2", "tbh-fsd-title", h("span", "tbh-fsd-logo", "FSD"), "Full Self Driving");
    title.id = "tbh-fsd-title";
    const status = h("span", "tbh-fsd-status");
    const closeX = h("button", "tbh-fsd-x", "×");
    closeX.type = "button";
    closeX.setAttribute("aria-label", "Close");
    closeX.addEventListener("click", () => close());
    const head = h("header", "tbh-fsd-head", title, status, closeX);
    const tip = h("div", "tbh-fsd-tip");
    tip.hidden = true;
    tip.setAttribute("role", "tooltip");
    let tipFor = "";
    const showTip = (key, box, ...content) => {
      if (tipFor !== key) {
        tipFor = key;
        tip.replaceChildren(...content);
      }
      tip.hidden = false;
      const width = tip.offsetWidth;
      const height = tip.offsetHeight;
      const left = Math.max(8, Math.min(innerWidth - width - 8, box.left));
      const below = box.bottom + 6 + height <= innerHeight - 8;
      tip.style.left = `${left}px`;
      tip.style.top = `${below ? box.bottom + 6 : Math.max(8, box.top - 6 - height)}px`;
    };
    const hideTip = () => {
      tip.hidden = true;
      tipFor = "";
    };
    const valueLines = (live, example) => {
      const value = live ?? example;
      return value === undefined || value === "" ? [] : [h("div", "tbh-fsd-tip-label", live !== undefined ? `Last seen in a run, at ${clock(pilot.preview()?.time ?? 0)}` : "Example, from a real run"), h("pre", "tbh-fsd-tip-value", value)];
    };
    const typed = (source) => {
      const view = codeView(fields, types);
      view.el.classList.add("tbh-code-tip");
      view.show(source);
      return view.el;
    };
    const fieldTip = (path, box) => {
      const field = fields.find((f) => f.path === path);
      const live = pilot.preview();
      const type = field?.type ?? "";
      showTip(`field:${path}:${live?.time ?? ""}`, box, h("b", "tbh-fsd-tip-name", `state.${path}`), ...type.includes(`
`) ? [] : [h("code", "tbh-fsd-tip-key", type)], h("div", "tbh-fsd-tip-about", field?.about ?? ""), ...type.includes(`
`) ? [typed(type)] : [], ...valueLines(live === undefined ? undefined : pretty(read(live.state, path)), pretty(read(state_example_default.state, path))));
    };
    const typeTip = (name, box) => showTip(`type:${name}`, box, h("b", "tbh-fsd-tip-name", name), typed(types.get(name) ?? ""));
    const embedTip = (name, box) => showTip(`embed:${name}:${pilot.preview()?.time ?? ""}`, box, h("b", "tbh-fsd-tip-name", `{{${name}}}`), h("div", "tbh-fsd-tip-about", EMBEDS[name] ?? "Not part of the state: the picker cannot read this."), ...valueLines(pilot.preview()?.blocks[name], state_example_default.blocks[name]));
    const inserter = (el, onClick) => {
      el.addEventListener("mousedown", (e) => e.preventDefault());
      el.addEventListener("click", onClick);
      el.addEventListener("pointerleave", hideTip);
      return el;
    };
    const search = h("input", "tbh-fsd-search");
    Object.assign(search, { type: "search", placeholder: "Filter the state…" });
    search.setAttribute("aria-label", "Filter the state");
    const fieldList = h("div", "tbh-fsd-blocks");
    const fieldEls = new Map;
    for (const field of fields) {
      const value = h("span", "tbh-fsd-block-value");
      const el = inserter(h("button", "tbh-fsd-block", h("span", "tbh-fsd-block-head", h("b", "", field.path), h("code", "tbh-fsd-block-type", field.type.includes(`
`) ? "{…}" : field.type.replace(/\{.*\}/, "{…}")), value), h("span", "tbh-fsd-block-about", field.about)), () => insert(builder.area, `state.${field.path}`));
      el.type = "button";
      el.dataset.name = field.path;
      el.style.paddingLeft = `${8 + 10 * (field.path.split(".").length - 1)}px`;
      el.addEventListener("pointerenter", () => fieldTip(field.path, el.getBoundingClientRect()));
      fieldEls.set(field.path, { el, value });
      fieldList.append(el);
    }
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      for (const field of fields) {
        const el = fieldEls.get(field.path)?.el;
        if (el !== undefined)
          el.hidden = q !== "" && !`${field.path} ${field.type} ${field.about}`.toLowerCase().includes(q);
      }
    });
    const statePane = h("aside", "tbh-fsd-state", h("h3", "tbh-fsd-label", "State"), h("p", "tbh-fsd-hint", "What the function is called with, four times a second. Click a field to name it in your request."), search, fieldList);
    const builder = growField(false, "How should Tibo play? Say what to go after, when, and when to back off.", (value) => edit((d) => ({ ...d, prompt: value })));
    const buildButton = h("button", "tbh-fsd-build");
    buildButton.type = "button";
    buildButton.addEventListener("click", () => pilot.buildCode());
    onOwnKeydown((e) => {
      if (e.target === builder.area && e.key === "Enter" && (e.metaKey || e.ctrlKey))
        pilot.buildCode();
    });
    const buildNote = h("span", "tbh-fsd-build-note");
    const buildErrors = h("div", "");
    const code = codeView(fields, types);
    const declared = codeView(fields, types);
    declared.show(DRIVER_TYPES.trim());
    const now = h("div", "tbh-fsd-now");
    const memory = h("pre", "tbh-fsd-memory");
    const builderPane = h("section", "tbh-fsd-builder", h("h3", "tbh-fsd-label", "Function builder"), h("p", "tbh-fsd-hint", "Describe how Tibo should play. Opus 5.5 turns it into one TypeScript function that reads the state and returns what the autopilot does next. It may keep anything it needs in a memory that lasts the run. TypeScript checks that it always returns an action before the bot runs it."), builder.wrap, h("div", "tbh-fsd-build-row", buildButton, buildNote), buildErrors, h("h3", "tbh-fsd-label tbh-fsd-code-label", "Function"), now, memory, code.el, h("details", "tbh-fsd-fold", h("summary", "", "The types it is written against"), declared.el));
    for (const view of [code, declared]) {
      view.el.addEventListener("pointerover", (e) => {
        const at = view.hoverAt(e.target);
        if (at === undefined) {
          if (/^(field|type):/.test(tipFor))
            hideTip();
        } else if ("type" in at)
          typeTip(at.type, at.box);
        else
          fieldTip(at.field, at.box);
      });
      view.el.addEventListener("pointerleave", hideTip);
    }
    const loadout = growField(true, "How should the picker choose cards?", (value) => edit((d) => ({ ...d, loadout: value })));
    const loadoutErrors = h("div", "");
    const blockList = h("div", "tbh-fsd-entities", ...Object.keys(EMBEDS).map((name) => {
      const el = inserter(h("button", "tbh-fsd-entity tbh-fsd-embed", `{{${name}}}`), () => insert(loadout.area, `{{${name}}}`));
      el.type = "button";
      el.addEventListener("pointerenter", () => embedTip(name, el.getBoundingClientRect()));
      return el;
    }));
    const loadoutPane = h("section", "tbh-fsd-loadout", h("h3", "tbh-fsd-label", "Loadout"), h("p", "tbh-fsd-hint", "The picker's question at every level-up, chest and shrine. It reads the game's state, and whatever you embed here."), loadout.wrap, loadoutErrors, h("details", "tbh-fsd-fold", h("summary", "", "State the picker can embed"), blockList));
    const entityList = h("div", "tbh-fsd-entity-groups");
    const entityPane = h("section", "tbh-fsd-world", h("h3", "tbh-fsd-label", "In the world"), h("p", "tbh-fsd-hint", "What the autopilot can walk Tibo to, under the game's own names. Click to add the name where the caret is."), entityList);
    const renderEntities = () => {
      entities = game.entities();
      const chip = (e) => {
        const el = inserter(h("button", "tbh-fsd-entity", svgIcon(ACTION_ICONS[e.tag], "tbh-fsd-entity-icon"), e.name), () => insert(target ?? builder.area, e.name));
        el.type = "button";
        el.addEventListener("pointerenter", () => showTip(`entity:${e.key}`, el.getBoundingClientRect(), h("b", "tbh-fsd-tip-name", e.name), ...e.name === e.key ? [] : [h("code", "tbh-fsd-tip-key", e.key)], h("div", "tbh-fsd-tip-about", e.about || "No description in the game.")));
        return el;
      };
      entityList.replaceChildren(...SECTIONS.flatMap((section) => {
        const group = entities.filter((e) => e.section === section);
        return group.length === 0 ? [] : [h("h4", "tbh-fsd-entity-type", section), h("div", "tbh-fsd-entities", ...group.map(chip))];
      }), ...entities.some((e) => e.name !== e.key) ? [] : [h("p", "tbh-fsd-hint", "The game's places get their names once a run has started.")]);
    };
    const saved = h("span", "tbh-fsd-saved");
    const stopButton = h("button", "tbh-fsd-stop", "Stop driving");
    stopButton.type = "button";
    stopButton.addEventListener("click", () => pilot.stop());
    const engage = h("button", "tbh-fsd-engage");
    engage.type = "button";
    engage.addEventListener("click", () => {
      if (pilot.state().state === "off" && !pilot.engage())
        return;
      close();
    });
    const foot = h("footer", "tbh-fsd-foot", saved, stopButton, engage);
    const body = h("div", "tbh-fsd-body", statePane, h("div", "tbh-fsd-main", builderPane, h("div", "tbh-fsd-side", loadoutPane, entityPane)));
    const sheet = h("div", "tbh-fsd-sheet", head, body, foot);
    dialog.append(sheet, tip);
    document.body.append(dialog);
    dialog.addEventListener("focusin", (e) => {
      if (e.target instanceof HTMLTextAreaElement)
        target = e.target;
    });
    dialog.addEventListener("pointermove", (e) => {
      if (e.target !== loadout.area)
        return;
      const chip = loadout.chipAt(e.clientX, e.clientY);
      if (chip === undefined) {
        if (tipFor.startsWith("embed:"))
          hideTip();
      } else
        embedTip(chip.name, chip.box);
    });
    dialog.addEventListener("pointerout", (e) => {
      if (e.target instanceof HTMLTextAreaElement)
        hideTip();
    });
    sheet.addEventListener("scroll", hideTip, true);
    function insert(field, text) {
      const start = field.selectionStart;
      const before = field.value.slice(0, start);
      const pad = before === "" || /\s$/.test(before) ? "" : " ";
      field.setRangeText(`${pad}${text}`, start, field.selectionEnd, "end");
      field.focus();
      field.dispatchEvent(new Event("input", { bubbles: true }));
    }
    let ticking;
    function render() {
      const d = draft();
      const check = pilot.check();
      const driving = pilot.state().state !== "off";
      const connected = pilot.connected();
      const since = pilot.building();
      builder.set(d.prompt);
      loadout.set(d.loadout);
      loadoutErrors.replaceChildren(errorList(check.loadout));
      if (since !== undefined && ticking === undefined)
        ticking = setInterval(render, 1000);
      if (since === undefined && ticking !== undefined) {
        clearInterval(ticking);
        ticking = undefined;
      }
      const stale = d.prompt !== d.builtFrom;
      buildButton.textContent = since === undefined ? "Write the function" : "Writing…";
      buildButton.disabled = since !== undefined || d.prompt.trim() === "" || !connected;
      buildButton.title = !connected ? "Start the agent server first: ./agent-server/main.ts" : "Sends your request to Opus 5.5 through the agent server (⌘↵)";
      buildNote.textContent = since !== undefined ? `Opus 5.5 is writing the function: ${Math.round((Date.now() - since) / 1000)} s. It takes under a minute.` : stale ? "The request changed since this function was written." : "Written from this request.";
      buildNote.classList.toggle("tbh-fsd-build-stale", since === undefined && stale);
      buildErrors.replaceChildren(errorList(pilot.buildError() === undefined ? [] : [pilot.buildError() ?? ""]));
      const active = pilot.active();
      now.hidden = active === undefined;
      now.classList.toggle("tbh-fsd-now-error", active?.error !== undefined);
      now.textContent = active?.error !== undefined ? `drive threw: ${active.error}` : active?.action === undefined ? "" : `Now: ${active.action.why ?? ""} (${actionWords(active.action)})`;
      code.show(d.code, active?.action?.why);
      const kept = active === undefined || Object.keys(active.memory).length === 0 ? undefined : active.memory;
      memory.hidden = kept === undefined;
      memory.textContent = kept === undefined ? "" : `memory: ${JSON.stringify(kept, null, 2)}`;
      const live = pilot.preview();
      for (const [path, { value }] of fieldEls)
        value.textContent = brief(read(live?.state ?? state_example_default.state, path));
      status.textContent = driving ? "Driving: a function you write takes over as soon as it is ready" : connected ? "" : "The agent server is not connected";
      status.dataset.state = driving ? "on" : connected ? "" : "error";
      const refused = pilot.state().detail;
      const problems = check.loadout.length;
      saved.textContent = refused !== undefined && !driving ? refused : problems === 0 ? "Saved in this browser" : `Saved in this browser · ${problems} to fix${driving ? " before the bot gets the change" : ""}`;
      saved.classList.toggle("tbh-fsd-saved-bad", problems > 0 || refused !== undefined && !driving);
      stopButton.hidden = !driving;
      engage.textContent = driving ? "Back to the game" : "Engage";
      engage.disabled = !driving && (problems > 0 || !connected);
      engage.title = driving ? "" : !connected ? "Start the agent server first: ./agent-server/main.ts" : problems > 0 ? "Fix what is marked red first" : "";
    }
    function flip(opening) {
      const from = origin?.isConnected ? origin.getBoundingClientRect() : undefined;
      if (from === undefined || from.width === 0 || reducedMotion()) {
        const fade = [{ opacity: 0 }, { opacity: 1 }];
        return sheet.animate(fade, { duration: 160, direction: opening ? "normal" : "reverse" }).finished;
      }
      const to = sheet.getBoundingClientRect();
      const dx = from.left + from.width / 2 - (to.left + to.width / 2);
      const dy = from.top + from.height / 2 - (to.top + to.height / 2);
      const small = `perspective(1600px) translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height}) rotateY(0deg)`;
      const big = "perspective(1600px) translate(0px, 0px) scale(1, 1) rotateY(360deg)";
      const frames = [
        { transform: small, opacity: 0.5, offset: 0 },
        { opacity: 1, offset: 0.35 },
        { transform: big, opacity: 1, offset: 1 }
      ];
      return sheet.animate(frames, { duration: opening ? 820 : 520, direction: opening ? "normal" : "reverse", easing: opening ? "cubic-bezier(.2,.8,.25,1)" : "cubic-bezier(.75,0,.8,.2)" }).finished;
    }
    function close() {
      if (!dialog.open || closing)
        return;
      closing = true;
      hideTip();
      dialog.classList.add("tbh-fsd-leaving");
      Promise.resolve().then(() => flip(false)).catch((e) => console.error("[tibobit] the FSD close animation failed", e)).then(() => {
        dialog.close();
        dialog.classList.remove("tbh-fsd-leaving");
        closing = false;
        if (pausedHere)
          game.resume();
        pausedHere = false;
      });
    }
    dialog.addEventListener("cancel", (e) => {
      e.preventDefault();
      close();
    });
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog)
        close();
    });
    pilot.onChange(() => {
      if (dialog.open)
        render();
    });
    return {
      open(from) {
        if (dialog.open)
          return;
        origin = from;
        pausedHere = game.pause();
        renderEntities();
        dialog.showModal();
        render();
        target = undefined;
        builder.area.focus({ preventScroll: true });
        builder.area.setSelectionRange(builder.area.value.length, builder.area.value.length);
        Promise.resolve().then(() => flip(true)).catch((e) => console.error("[tibobit] the FSD open animation failed", e));
      }
    };
  }

  // userscript/fsd/driver-types.ts
  var isComment = (line) => /^\s*(\/\*\*|\*|\/\/)/.test(line);
  function block(members) {
    const kept = members.filter((l) => !isComment(l) && l.trim() !== "");
    const indent = Math.min(...kept.map((l) => /^ */.exec(l)?.[0].length ?? 0));
    return ["{", ...kept.map((l) => `  ${l.slice(indent)}`), "}"].join(`
`);
  }
  function stateFields(types) {
    const lines = types.split(`
`);
    const start = lines.findIndex((l) => l.startsWith("export type State = {"));
    if (start < 0)
      throw new Error("protocol/driver.ts declares no State");
    const fields = [];
    const open = [];
    let about = [];
    for (let i = start + 1;i < lines.length; i++) {
      const raw = lines[i] ?? "";
      const line = raw.trim();
      if (raw.startsWith("};"))
        break;
      if (isComment(raw)) {
        const text = line.replace(/^\/\*\*\s?|^\*\/$|^\*\s?|\s?\*\/$/g, "").trim();
        if (text !== "")
          about.push(text);
        continue;
      }
      if (line.startsWith("}")) {
        const closed = open.pop();
        if (closed !== undefined)
          closed.field.type = block(lines.slice(closed.from + 1, i));
        continue;
      }
      const member = /^(\w+)\??: (.*?);?$/.exec(line);
      if (member === null)
        continue;
      const [, name = "", type = ""] = member;
      const field = { path: [...open.map((o) => o.field.path.split(".").at(-1)), name].join("."), type, about: about.join(" ") };
      fields.push(field);
      about = [];
      if (type === "{")
        open.push({ field, from: i });
    }
    return fields;
  }
  function typeDeclarations(types) {
    const lines = types.split(`
`);
    const out = new Map;
    for (let i = 0;i < lines.length; i++) {
      const name = /^export type (\w+)\b/.exec(lines[i] ?? "")?.[1];
      if (name === undefined)
        continue;
      let from = i;
      while (from > 0 && isComment(lines[from - 1] ?? ""))
        from--;
      let to = i;
      for (let depth = 0;to < lines.length; to++) {
        const line = isComment(lines[to] ?? "") ? "" : lines[to] ?? "";
        depth += (line.match(/[{(]/g) ?? []).length - (line.match(/[})]/g) ?? []).length;
        if (depth === 0 && /;\s*$/.test(line))
          break;
      }
      out.set(name, lines.slice(from, to + 1).join(`
`).replace(/^export /m, ""));
    }
    return out;
  }

  // userscript/panel/panel.ts
  function mount(chat, footer) {
    for (const css of [css3, css4, css5, css6])
      addStyle(css);
    const content = h("div", "tbh-content");
    const panel = h("div", "tbh-panel", content, footer, chat);
    panel.id = PANEL_ID;
    if (window.innerWidth < 700)
      panel.classList.add("tbh-collapsed");
    document.body.append(panel);
    return { panel, content };
  }
  function gameControl(link) {
    return {
      pause() {
        const game = link.game;
        if (game === undefined || !inRun(link) || game.state.paused || game.state.choiceQueue.length > 0 || pauseMenuOpen())
          return false;
        game.setPaused(true);
        return true;
      },
      resume() {
        if (inRun(link))
          link.game?.setPaused(false);
      },
      entities: () => worldEntities(link)
    };
  }
  function startPanel(link, discovery, bridge) {
    const fields = stateFields(DRIVER_TYPES);
    const types = typeDeclarations(DRIVER_TYPES);
    const fsd = fsdPopup(bridge.pilot, gameControl(link), fields, types);
    driveOverlay(bridge.pilot, fields, types);
    const { panel, content } = mount(botFeed(bridge.pilot, fsd.open), connectionRow(bridge, fsd.open));
    let collapsedBefore;
    const followPilot = () => {
      const piloting = bridge.pilot.state().state !== "off";
      if (piloting === panel.classList.contains("tbh-pilot"))
        return;
      panel.classList.toggle("tbh-pilot", piloting);
      if (piloting) {
        collapsedBefore = panel.classList.contains("tbh-collapsed");
        panel.classList.add("tbh-collapsed");
      } else if (collapsedBefore !== undefined)
        panel.classList.toggle("tbh-collapsed", collapsedBefore);
    };
    bridge.pilot.onChange(followPilot);
    followPilot();
    const dropStaleTip = startTips();
    let panelSignature = "";
    let queued = false;
    let version = 0;
    let lastInputs;
    const update = () => {
      queued = false;
      const game = link.game;
      const running = game !== undefined && inRun(link);
      panel.classList.toggle("tbh-idle", !running);
      dropStaleTip();
      if (!running) {
        panel.classList.remove("tbh-choice", "tbh-peek");
        return;
      }
      const cards = [...document.querySelectorAll(".ui-card[data-tip]")];
      const offered = cards.map(offerKey).filter((o) => o !== undefined);
      panel.classList.toggle("tbh-choice", offered.length > 0);
      if (offered.length === 0)
        panel.classList.remove("tbh-peek");
      const d = runCombos(link);
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

  // userscript/pilot/pick-overlay.css.ts
  var css10 = `
.tbh-pick-layer { position: fixed; inset: 0; z-index: 2147483001; pointer-events: none; font: 800 12px/1.3 ui-monospace, Menlo, Consolas, monospace; }
.tbh-pick-layer[hidden], .tbh-pick-layer [hidden] { display: none; }
.tbh-pick-banner { position: fixed; transform: translate(-50%, -100%); box-sizing: border-box; padding: 5px 12px; text-align: center; color: #f3e6c4; background: rgba(42,33,64,.95); border: 1px solid #c9a0ff; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,.5); }
.tbh-pick-bar { position: fixed; display: flex; align-items: center; gap: 6px; box-sizing: border-box; padding: 0 2px; transition: opacity .3s; }
.tbh-pick-track { flex: 1; height: 7px; border-radius: 4px; background: rgba(0,0,0,.55); box-shadow: 0 0 0 1px rgba(255,255,255,.15); overflow: hidden; }
.tbh-pick-track > i { display: block; height: 100%; background: #7fa8ff; }
.tbh-pick-pct { color: #fff; text-shadow: 0 1px 2px #000; }
.tbh-pick-tag { padding: 0 4px; border-radius: 3px; font-size: 9.5px; letter-spacing: .06em; text-transform: uppercase; color: #fff; background: #c4473a; }
.tbh-pick-banish .tbh-pick-track > i { background: #ff7a6b; }
.tbh-pick-dim { opacity: .35; }
.tbh-pick-frame { position: fixed; box-sizing: border-box; border: 3px solid transparent; border-radius: 10px; transition: border-color .08s, box-shadow .08s; }
.tbh-pick-on { border-color: #ffd36b; box-shadow: 0 0 14px rgba(255,211,107,.7); }
.tbh-pick-final { border-color: #ffd36b; box-shadow: 0 0 26px 4px rgba(255,211,107,.9); animation: tbh-pick-pulse .7s ease-in-out infinite alternate; }
.tbh-pick-frame-banish.tbh-pick-on, .tbh-pick-frame-banish.tbh-pick-final { border-color: #ff7a6b; box-shadow: 0 0 22px 3px rgba(255,122,107,.85); }
@keyframes tbh-pick-pulse { to { box-shadow: 0 0 10px 1px rgba(255,211,107,.5); } }
/* The game's own hand photo, placed by its fingertip; once there it presses the pick the way the menu's hand presses reset. */
.tbh-pick-hand { position: fixed; filter: drop-shadow(0 6px 10px rgba(0,0,0,.55)); transform-origin: 83% 99%; }
.tbh-pick-pressing { animation: tbh-pick-press .55s ease-in-out infinite; }
@keyframes tbh-pick-press { 0%, 100% { transform: translateY(-6px); } 45% { transform: translateY(3px) scale(.97); } 60% { transform: translateY(3px) scale(.97); } }
@media (prefers-reduced-motion: reduce) { .tbh-pick-final, .tbh-pick-pressing { animation: none; } }
`;

  // userscript/pilot/pick-overlay.ts
  var SHOW_MS = PICK_SHOW_MS - 500;
  var ARRIVE_MS = 700;
  var FRESH_MS = 8000;
  var HAND_HEIGHT = 130;
  function buttons() {
    return [...document.querySelectorAll("button")].filter((b) => !b.matches(".ui-card, .ui-pause-btn, .ui-sound") && !b.closest(OURS) && b.getClientRects().length > 0 && (b.textContent ?? "").trim() !== "");
  }
  var BUTTON_WORDS = { reroll: /reroll/i, skip: /skip/i, banish: /banish/i, close: /leave|close|keep|no thanks|done/i, continue: /continue|ok|take|collect/i, accept: /accept|take/i, endRun: /end/i };
  function elementOf(option, cards, plain) {
    const a = option.action;
    if ("index" in a)
      return cards[a.index];
    const name = option.card.trim().toLowerCase();
    return plain.find((b) => (b.textContent ?? "").trim().toLowerCase().startsWith(name)) ?? plain.find((b) => BUTTON_WORDS[a.type]?.test(b.textContent ?? "") === true);
  }
  function startPickOverlay(pilot, link) {
    addStyle(css10);
    const layer = h("div", "tbh-pick-layer");
    const banner = h("div", "tbh-pick-banner");
    const hand = h("img", "tbh-pick-hand");
    hand.alt = "";
    layer.append(banner, hand);
    document.body.append(layer);
    let show;
    const bars = new Map;
    const latestPick = () => {
      const chat = pilot.chat();
      for (let i = chat.length - 1;i >= 0; i--) {
        const m = chat[i];
        if (m?.role === "planner" && m.inspect?.kind === "plan" && m.inspect.choices !== undefined)
          return m;
      }
      return;
    };
    pilot.onChange(() => {
      const m = latestPick();
      if (m === undefined || m.id === show?.id || m.inspect?.kind !== "plan" || m.inspect.choices === undefined)
        return;
      const options = m.inspect.choices.filter((c) => c.action !== undefined);
      const chosen = options.findIndex((c) => c.chosen);
      if (chosen < 0)
        return;
      show = { id: m.id, seen: performance.now() - Math.max(0, Date.now() - m.at), text: m.text, options, chosen };
      for (const { bar, frame } of bars.values()) {
        bar.remove();
        frame.remove();
      }
      bars.clear();
      for (const [i, c] of options.entries()) {
        const pct = Math.round((c.probability ?? 0) * 100);
        const fill = document.createElement("i");
        fill.style.width = `${pct}%`;
        const track = h("div", "tbh-pick-track");
        track.append(fill);
        const banish = c.action.type === "banish";
        const bar = h("div", `tbh-pick-bar${banish ? " tbh-pick-banish" : ""}`, ...banish ? [h("span", "tbh-pick-tag", "banish")] : [], track, h("div", "tbh-pick-pct", `${pct}%`));
        const frame = h("div", `tbh-pick-frame${banish ? " tbh-pick-frame-banish" : ""}`);
        layer.append(bar, frame);
        bars.set(i, { bar, frame });
      }
      banner.textContent = m.text;
    });
    const frame = () => {
      requestAnimationFrame(frame);
      const age = show === undefined ? Number.POSITIVE_INFINITY : performance.now() - show.seen;
      const choosing = (link.game?.state.choiceQueue.length ?? 0) > 0;
      const visible = show !== undefined && pilot.state().state !== "off" && choosing && age < FRESH_MS;
      layer.hidden = !visible;
      if (!visible || show === undefined)
        return;
      const cards = [...document.querySelectorAll("button.ui-card, .ui-card[data-tip]")].filter((c) => c.parentElement?.closest(OURS) === null);
      const plain = buttons();
      const done = age >= SHOW_MS;
      const arrived = age >= ARRIVE_MS;
      let top = Number.POSITIVE_INFINITY;
      let left = Number.POSITIVE_INFINITY;
      let right = 0;
      let pick;
      for (const [i, parts] of bars) {
        const option = show.options[i];
        const rect = option === undefined ? undefined : elementOf(option, cards, plain)?.getBoundingClientRect();
        const shown = rect !== undefined && rect.width > 0;
        parts.bar.hidden = parts.frame.hidden = !shown;
        if (!shown || option === undefined)
          continue;
        if (i === show.chosen)
          pick = rect;
        top = Math.min(top, rect.top);
        left = Math.min(left, rect.left);
        right = Math.max(right, rect.right);
        const below = option.action.type === "banish";
        Object.assign(parts.bar.style, { left: `${rect.left}px`, top: `${below ? rect.bottom + 6 : rect.top - 22}px`, width: `${Math.max(rect.width, 90)}px` });
        Object.assign(parts.frame.style, { left: `${rect.left - 3}px`, top: `${rect.top - 3}px`, width: `${rect.width + 6}px`, height: `${rect.height + 6}px` });
        parts.frame.classList.toggle("tbh-pick-on", arrived && i === show.chosen);
        parts.frame.classList.toggle("tbh-pick-final", done && i === show.chosen);
        parts.bar.classList.toggle("tbh-pick-dim", done && i !== show.chosen);
      }
      const shape = link.hand;
      hand.hidden = pick === undefined || shape === undefined;
      if (pick !== undefined && shape !== undefined) {
        if (hand.src !== shape.url)
          hand.src = shape.url;
        const scale = HAND_HEIGHT / shape.height;
        hand.style.width = `${shape.width * scale}px`;
        hand.style.height = `${HAND_HEIGHT}px`;
        const t = Math.min(1, age / ARRIVE_MS);
        const eased = 1 - (1 - t) ** 3;
        const [fromX, fromY, toX, toY] = [left, top - 60, pick.left + pick.width / 2, pick.top + Math.min(18, pick.height / 3)];
        const x = fromX + (toX - fromX) * eased;
        const y = fromY + (toY - fromY) * eased;
        Object.assign(hand.style, { left: `${x - shape.tipX * scale}px`, top: `${y - shape.tipY * scale}px` });
        hand.classList.toggle("tbh-pick-pressing", arrived);
      }
      if (Number.isFinite(top))
        Object.assign(banner.style, { left: `${(left + right) / 2}px`, top: `${top - 66}px`, maxWidth: `${Math.max(240, right - left)}px` });
    };
    requestAnimationFrame(frame);
  }

  // userscript/agent/forecast.ts
  var SLICE_MS = 4;
  var SHARE = 0.75;
  var KEEP_TICKS = 2 * TICKS_PER_SECOND;
  var DEFAULT_TICKS = 0.5 * TICKS_PER_SECOND;
  var playing = (s) => !s.over && s.choiceQueue.length === 0;
  var dealt = (s) => {
    let total = 0;
    for (const amount of s.run.damageBySource.values())
      total += amount;
    return total;
  };

  class Forecaster {
    link;
    course;
    outcomes = new Map;
    run;
    turn = 0;
    restUntil = 0;
    game;
    routed = false;
    paused = false;
    live = false;
    lagTicks = 0;
    ticks = DEFAULT_TICKS;
    route;
    constructor(link, course) {
      this.link = link;
      this.course = course;
    }
    start() {
      setInterval(() => this.slice(), SLICE_MS);
    }
    configure(command, s) {
      const route = command.route;
      if (route !== undefined && s === undefined)
        throw new Error("no game is running");
      this.live = command.live;
      if (command.lag !== undefined)
        this.lagTicks = Math.round(command.lag * TICKS_PER_SECOND);
      if (command.seconds !== undefined)
        this.ticks = Math.round(command.seconds * TICKS_PER_SECOND);
      const ticks = (seconds) => Math.round(seconds * TICKS_PER_SECOND);
      this.route = route === undefined || s === undefined ? undefined : { to: anchored(s, route.to), stayTicks: ticks(route.stay ?? ROUTE_DEFAULTS.stay), ticks: ticks(route.seconds ?? ROUTE_DEFAULTS.seconds), legTicks: ticks(route.leg ?? ROUTE_DEFAULTS.leg) };
    }
    reset() {
      this.live = false;
      this.lagTicks = 0;
      this.ticks = DEFAULT_TICKS;
      this.route = undefined;
    }
    get seconds() {
      return this.ticks / TICKS_PER_SECOND;
    }
    plans(s) {
      const route = this.route;
      const there = route === undefined ? undefined : place(this.link.enums, s, route.to);
      if (route === undefined || there === undefined) {
        return [...DIRECTIONS, "still"].map((name) => {
          const held = name === "still" ? STILL : unitOf(name);
          return { name, ticks: this.ticks, input: () => held };
        });
      }
      const goal = (state) => place(this.link.enums, state, route.to);
      const straight = (state) => toward(state, goal(state));
      const way = DIRECTIONS.indexOf(directionOf(there.x - (s.player.x[s.me] ?? 0), there.y - (s.player.y[s.me] ?? 0)));
      const beside = [-2, -1, 1, 2].map((turn) => DIRECTIONS[(way + turn + 8) % 8]);
      const first = (held) => (state, i) => i < route.legTicks ? held : straight(state);
      const ahead = DIRECTIONS[way];
      const trip = { goal, stayTicks: route.stayTicks };
      return [
        { name: "straight", ticks: route.ticks, input: straight, trip },
        ...beside.map((dir) => ({ name: dir, ticks: route.ticks, input: first(unitOf(dir)), trip })),
        { name: "still", ticks: route.ticks, input: first(STILL), trip },
        { name: `dash ${ahead}`, ticks: route.ticks, input: straight, dash: unitOf(ahead), trip }
      ];
    }
    *lead(game, lagTicks) {
      const { copyState, simulator } = this.link;
      if (copyState === undefined || simulator === undefined)
        throw new Error("the game's sim is not hooked yet");
      const copy = simulator(game, copyState(game.state));
      const course = this.course();
      for (let i = 0;i < lagTicks && playing(copy.sim.state); i++) {
        if (course !== undefined) {
          const held = course(copy.sim.state);
          copy.setInput(held.x, held.y);
        }
        copy.step();
        yield;
      }
      return copy;
    }
    *play(game, plan, lagTicks) {
      const tick = game.state.tick;
      const { sim, step, setInput } = yield* this.lead(game, lagTicks);
      const s = sim.state;
      const me = s.me;
      if (plan.dash !== undefined) {
        if ((s.player.dashCharges[me] ?? 0) <= 0) {
          this.outcomes.delete(plan.name);
          return;
        }
        sim.dash(plan.dash.x, plan.dash.y);
      }
      const before = new Map(s.run.damageTakenBySource);
      const dealtBefore = dealt(s);
      let arrived;
      let stood = 0;
      let done;
      let played = 0;
      for (let i = 0;i < plan.ticks && playing(s) && done === undefined; i++) {
        const held = plan.input(s, i);
        setInput(held.x, held.y);
        step();
        played++;
        if (plan.trip !== undefined) {
          const goal = plan.trip.goal(s);
          const there = goal !== undefined && Math.hypot(goal.x - (s.player.x[me] ?? 0), goal.y - (s.player.y[me] ?? 0)) <= goal.within;
          stood = there ? stood + 1 : 0;
          if (there)
            arrived ??= i + 1;
          if (goal === undefined || there && stood > plan.trip.stayTicks)
            done = i + 1;
        }
        yield;
      }
      const bySource = {};
      let damage = 0;
      for (const [source, total] of s.run.damageTakenBySource) {
        const taken = total - (before.get(source) ?? 0);
        if (taken <= 0)
          continue;
        bySource[source] = taken;
        damage += taken;
      }
      this.outcomes.set(plan.name, {
        tick,
        damage,
        dead: s.over,
        bySource,
        dps: played === 0 ? 0 : (dealt(s) - dealtBefore) * TICKS_PER_SECOND / played,
        ...arrived === undefined ? {} : { arrives: arrived / TICKS_PER_SECOND },
        ...done === undefined ? {} : { done: done / TICKS_PER_SECOND }
      });
    }
    forget() {
      this.outcomes.clear();
      this.run = undefined;
    }
    look(game, lagTicks) {
      const steps = this.lead(game, lagTicks);
      let step = steps.next();
      while (!step.done)
        step = steps.next();
      const s = step.value.sim.state;
      const me = s.me;
      return {
        tick: game.state.tick,
        seconds: lagTicks / TICKS_PER_SECOND,
        player: { x: s.player.x[me] ?? 0, y: s.player.y[me] ?? 0, hp: s.player.hp[me] ?? 0, dashCharges: s.player.dashCharges[me] ?? 0 },
        threats: threats(this.link, s, this.ticks / TICKS_PER_SECOND)
      };
    }
    current(game) {
      const plans = this.plans(game.state);
      const routed = plans[0]?.name === "straight";
      if (game !== this.game || routed !== this.routed || game.state.paused !== this.paused)
        this.forget();
      this.game = game;
      this.routed = routed;
      this.paused = game.state.paused;
      const names = new Set(plans.map((p) => p.name));
      const tick = game.state.tick;
      for (const [name, o] of this.outcomes)
        if (!names.has(name) || o.tick > tick || tick - o.tick > KEEP_TICKS)
          this.outcomes.delete(name);
      return plans;
    }
    slice() {
      const game = this.link.game;
      if (game === undefined || !this.link.ready || !this.live || game.state.paused || !playing(game.state)) {
        this.run = undefined;
        return;
      }
      const now = performance.now();
      if (now < this.restUntil)
        return;
      if (this.run !== undefined && (this.run.game !== game || this.run.tick > game.state.tick))
        this.run = undefined;
      while (performance.now() - now < SLICE_MS) {
        if (this.run === undefined) {
          const plans = this.current(game);
          const plan = plans[this.turn++ % plans.length];
          this.run = { game, tick: game.state.tick, steps: this.play(game, plan, this.lagTicks) };
        }
        if (this.run.steps.next().done)
          this.run = undefined;
      }
      const worked = performance.now() - now;
      this.restUntil = now + worked / SHARE;
    }
    read() {
      const game = this.link.game;
      if (game === undefined || !this.link.ready)
        return;
      const s = game.state;
      if (!playing(s) || !(s.paused || this.live))
        return;
      const plans = this.current(game);
      if (s.paused) {
        this.run = undefined;
        for (const plan of plans)
          if (this.outcomes.get(plan.name)?.tick !== s.tick)
            for (const _ of this.play(game, plan, 0))
              ;
      }
      const ahead = this.look(game, s.paused ? 0 : this.lagTicks);
      const route = this.route;
      const outcomes = {};
      for (const { name } of plans) {
        const outcome = this.outcomes.get(name);
        if (outcome !== undefined)
          outcomes[name] = outcome;
      }
      return {
        lag: s.paused ? 0 : this.lagTicks / TICKS_PER_SECOND,
        seconds: this.ticks / TICKS_PER_SECOND,
        ahead,
        ...this.routed && route !== undefined ? { routes: { seconds: route.ticks / TICKS_PER_SECOND, leg: route.legTicks / TICKS_PER_SECOND, stay: route.stayTicks / TICKS_PER_SECOND, options: outcomes } } : { moves: outcomes }
      };
    }
  }

  // userscript/main.ts
  installSeedHook();
  var link = new GameLink;
  var discovery = new Discovery;
  var forecaster = new Forecaster(link, () => controller.course());
  var controller = new Controller(link, forecaster);
  Object.assign(window, { __tibobit: { link } });
  guardPanelKeys();
  function start() {
    forecaster.start();
    const bridge = startBridge(link, controller, forecaster);
    startPanel(link, discovery, bridge);
    startPickOverlay(bridge.pilot, link);
  }
  if (document.body === null)
    document.addEventListener("DOMContentLoaded", start, { once: true });
  else
    start();
})();
