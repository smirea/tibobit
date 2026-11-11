// The game as a live game needs it (LiveView in protocol/view.ts), built by the agent server
// from the page's snapshot (the game state, its surroundings and the sim forecast) and the game's
// encyclopedia. Names and descriptions are the game's English; ids and kinds are the game's own.
import { comboProgress, type Loadout, nameOf, partState, relevantCombos } from "../game/catalog";
import type { Aim, ChoiceOption, DirectionView, LiveView, LoadoutItem } from "../protocol/view";
import { type Direction, directionOf, DIRECTIONS, TICKS_PER_SECOND } from "../protocol/geometry";
import type { Snapshot } from "../protocol/snapshot";
import { type Book, line, pairings } from "../game/book";

type Row = { uid: number; slot: number; x: number; y: number };
type Owned = { def: string; level: number };
type Poi = { kind: string; x: number; y: number; radius: number; varietyPlace?: string; state: { uid: number; used: boolean; charge: number; goneAt: number } };

/** The parts of the game's state object the view reads, under the game's own keys. */
type GameJson = {
  runClock: number;
  time: number;
  difficulty: string;
  me: number;
  cfg: {
    win: { timeSec: number };
    dash: { charges: number };
    ladder: { level: number };
    difficulty: { extraElitesPerCurse: number; extraBossesPerCurse: number };
    activation: { seconds: Record<string, number>; pickupRadius: Record<string, number> };
    economy: { chestPriceBase: number; chestPriceLinear: number; chestPriceQuad: number; chestPriceCubic: number; chestPriceKnee: number; vendorPrice: number[] };
    taterSlots: { priceFraction: number };
    dogs: { kennelPrices: number[] };
  };
  paidChestsBought: number;
  player: (Row & { hp: number; dashCharges: number; dashCd: number; stunTicks: number; freezeTicks: number; slowT: number; invuln: number })[];
  loadout: {
    level: number;
    xp: number;
    xpNext: number;
    gold: number;
    weapons: Owned[];
    passives: Owned[];
    items: Record<string, number>;
    banished: string[];
    rerolls: number;
    skips: number;
    banishes: number;
    cursesTaken: number;
    revivesUsed: number;
    stats: Record<string, number>;
    shrineTotals: Record<string, number>;
  };
  bosses: (Row & { def: string; hp: number; maxHp: number })[];
  pets: (Row & { breed: string; level: number })[];
  pickups: (Row & { kind: string; value: number; charge: number })[];
  world: { activePois: Poi[] };
  waves: { rows: { minute: number; boss?: string; elite?: boolean; events?: string[] }[] };
  choiceQueue: ({ kind: string } & Record<string, unknown>)[];
  run: { dogHelp: Record<string, Record<string, number>> };
  scale: Record<string, number>;
  currentBiome: string;
  currentLandmark: { biome: { id: string }; event?: string } | null;
  moreVariety?: Record<string, unknown>;
};

// A pickup this close is under Tibo; the game's own reach for chests is about this.
const UNDER = 14;
const round = (n: number) => Math.round(n * 10) / 10;


function loadoutOf(weapons: { id: string; level: number }[], passives: { id: string; level: number }[], items: { id: string; count: number }[]): Loadout {
  const l: Loadout = new Map();
  for (const w of weapons) l.set(`weapon:${w.id}`, w.level);
  for (const p of passives) l.set(`passive:${p.id}`, p.level);
  for (const i of items) l.set(`item:${i.id}`, i.count);
  return l;
}

/** A damage source ("enemy:<id>", "boss:<id>" or a ground name such as "Hot oil") in the game's English where it names it. */
function sourceName(b: Book, source: string): string {
  const [kind, id = ""] = source.split(":");
  return kind === "enemy" || kind === "boss" ? (line(b, kind, id) ?? source) : source;
}

/** What a game event says, in the game's words where it has them. */
function eventText(b: Book, e: Record<string, unknown>): string {
  const id = typeof e.id === "string" ? e.id : undefined;
  const kind = { bossSpawn: "boss", bossDefeated: "boss", biome: "biome", grokBotHelp: "botHelp", dogJoined: "dog" }[String(e.type)];
  const said = e.announcement as { kind?: string; event?: string } | undefined;
  if (e.type === "announce" && said?.kind === "event" && said.event !== undefined) return `${line(b, "event", said.event) ?? said.event}: ${line(b, "event", said.event, "announce") ?? ""}`.trim();
  return `${String(e.type)}${id === undefined ? "" : ` ${(kind === undefined ? undefined : line(b, kind, id)) ?? id}`}`;
}

/** The open choice, by the game's kind, with only what that kind of choice needs. */
function choiceView(b: Book, g: GameJson, held: Loadout): LiveView["choice"] {
  const c = g.choiceQueue[0];
  if (c === undefined) return undefined;
  const l = g.loadout;
  const plain = (type: "reroll" | "skip" | "close" | "accept" | "continue" | "endRun", name: string): ChoiceOption => ({ action: { type }, name });
  const named = (o: Record<string, unknown>) => {
    const ref = (o.item ?? o) as Record<string, unknown>;
    const type = typeof ref.type === "string" ? ref.type : o.item !== undefined ? "item" : undefined;
    const id = typeof ref.id === "string" ? ref.id : undefined;
    return type !== undefined && id !== undefined ? { type, id, name: line(b, type, id) ?? id, description: line(b, type, id, "desc") ?? "" } : undefined;
  };
  const scalars = (o: Record<string, unknown>, skip: string[]) => Object.fromEntries(Object.entries(o).filter(([k, v]) => !skip.includes(k) && (typeof v !== "object" || v === null)));
  const listed = (list: unknown, act: "pick" | "buy"): ChoiceOption[] =>
    (Array.isArray(list) ? (list as Record<string, unknown>[]) : []).flatMap((o, index) => {
      if (o.sold === true) return [];
      const n = named(o);
      return [{ action: { type: act, index }, ...(n === undefined ? { name: String(o.label ?? o.kind ?? `option ${index}`) } : n), ...scalars(o, ["type", "id", "item", "sold"]) }];
    });
  switch (c.kind) {
    case "levelUp": {
      const offers = (Array.isArray(c.offers) ? c.offers : []) as { type: string; id: string; level?: number; isNew?: boolean }[];
      const options: ChoiceOption[] = offers.map((o, index) => {
        const key = `${o.type}:${o.id}` as const;
        const level = o.level ?? 1;
        const pairs = o.type === "weapon" || o.type === "passive" || o.type === "item" ? pairings(b, held, l.banished, key as `weapon:${string}`, level).filter((p) => p.partnerHeld) : [];
        return {
          action: { type: "pick", index },
          type: o.type,
          id: o.id,
          name: line(b, o.type, o.id) ?? o.id,
          level,
          max: b.catalog.maxLevel[key as `weapon:${string}`] ?? 1,
          ...(o.isNew ? { isNew: true } : {}),
          description: line(b, o.type, o.id, "desc") ?? "",
          ...(pairs.length === 0 ? {} : { pairs: pairs.map((p) => `with ${p.partner} into ${p.name}${p.ready ? " right away" : ""}`) }),
        };
      });
      if (l.rerolls > 0) options.push(plain("reroll", "Reroll"));
      if (l.skips > 0) options.push(plain("skip", "Skip"));
      return { kind: c.kind, options, rerolls: l.rerolls, skips: l.skips, banishes: l.banishes };
    }
    case "shrine":
      return {
        kind: c.kind,
        options: ((Array.isArray(c.offers) ? c.offers : []) as { stat: string; label: string; value: number; rarity: number }[]).map((o, index) => ({
          action: { type: "pick", index },
          name: o.label,
          stat: o.stat,
          value: o.value,
          rarity: line(b, "rarity", String(o.rarity)) ?? o.rarity,
        })),
      };
    case "vendor":
      return { kind: c.kind, options: [...listed(c.stock, "buy"), plain("close", "Leave")], gold: l.gold };
    case "chest":
    case "item": {
      const shown = [c.item, ...(Array.isArray(c.rewards) ? c.rewards : [])].filter((x): x is Record<string, unknown> => typeof x === "object" && x !== null);
      return { kind: c.kind, options: [plain("continue", "Continue")], shows: shown.map((x) => named(x)?.name ?? JSON.stringify(x)), ...(typeof c.gold === "number" && c.gold > 0 ? { gold: c.gold } : {}) };
    }
    case "curseShrine":
      return { kind: c.kind, options: [plain("accept", "Accept"), plain("close", "Leave")], gold: c.gold, curse: c.curse };
    case "win":
      return { kind: c.kind, options: [plain("continue", "Keep going"), plain("endRun", "End the run as a winner")] };
    case "dogSwap": {
      const dog = c.dog as { id?: string } | undefined;
      return {
        kind: c.kind,
        dog: line(b, "dog", dog?.id ?? "") ?? dog?.id,
        options: [...g.pets.map((p, index) => ({ action: { type: "pick" as const, index }, name: `Swap ${line(b, "dog", p.breed) ?? p.breed} (level ${p.level})` })), plain("close", "Keep the pack")],
      };
    }
    case "bigUpdate":
      return { kind: c.kind, options: [...listed((c.variant as { offers?: unknown } | undefined)?.offers, "pick"), plain("close", "Leave")] };
    default:
      return { kind: c.kind, options: [...listed(c.offers ?? c.stock, "pick"), plain("close", "Leave")] };
  }
}

/** The view, or undefined when the snapshot holds no run in play. */
export function liveView(s: Snapshot, b: Book): LiveView | undefined {
  const g = s.game as GameJson | undefined;
  const around = s.surroundings;
  const me = g?.player.find((p) => p.slot === g.me);
  if (g === undefined || around === undefined || me === undefined) return undefined;
  const l = g.loadout;
  const stats = Object.fromEntries(Object.entries(l.stats).flatMap(([k, v]) => (k !== "values" && typeof v === "number" ? [[k, Math.round(v * 1000) / 1000]] : []))) as Record<string, number>;
  const place = (x: number, y: number) => {
    const dx = x - me.x;
    const dy = y - me.y;
    return { distance: Math.round(Math.hypot(dx, dy)), direction: directionOf(dx, dy) };
  };

  const e = g.cfg.economy;
  const n = g.paidChestsBought;
  // The game's own prices: a crate is base + linear·n + quad·n² + cubic·max(0, n − knee)³ for n crates bought, times chestPriceMult; a slots spin is a share of it.
  const crate = Math.round(Math.round(e.chestPriceBase + e.chestPriceLinear * n + e.chestPriceQuad * n * n + e.chestPriceCubic * Math.max(0, n - e.chestPriceKnee) ** 3) * (stats.chestPriceMult ?? 1));
  const curses = l.cursesTaken;

  // Upcoming: the next boss, elite and event of the game's schedule, by minute.
  const later = g.waves.rows.filter((w) => w.minute * 60 > g.runClock);
  const nextBoss = later.find((w) => w.boss !== undefined);
  const nextElite = later.find((w) => w.elite === true);
  const nextEvent = later.find((w) => (w.events?.length ?? 0) > 0);
  const upcoming = [
    ...(nextBoss?.boss === undefined ? [] : [{ at: nextBoss.minute * 60, text: `boss ${line(b, "boss", nextBoss.boss, "title") ?? line(b, "boss", nextBoss.boss) ?? nextBoss.boss}` }]),
    ...(nextElite === undefined ? [] : [{ at: nextElite.minute * 60, text: "elite" }]),
    ...(nextEvent === undefined ? [] : [{ at: nextEvent.minute * 60, text: `event ${(nextEvent.events ?? []).map((id) => line(b, "event", id) ?? id).join(", ")}` }]),
  ].sort((x, y) => x.at - y.at);

  const timers = { ...(g as unknown as Record<string, unknown>), ...(g.moreVariety ?? {}) };
  const boosts = Object.entries(timers)
    .filter((x): x is [string, number] => x[0].endsWith("Until") && typeof x[1] === "number" && x[1] > g.time)
    .map(([k, until]) => ({ name: k.replace(/Until$/, ""), endsIn: round(until - g.time) }));

  const item = (kind: "weapon" | "passive", o: Owned): LoadoutItem => ({ id: o.def, name: nameOf(b.catalog, `${kind}:${o.def}`), level: o.level, max: b.catalog.maxLevel[`${kind}:${o.def}`] ?? 1, description: line(b, kind, o.def, "desc") ?? "" });
  const weapons = l.weapons.map((w) => item("weapon", w));
  const passives = l.passives.map((p) => item("passive", p));
  const items = Object.entries(l.items)
    .filter(([, c]) => c > 0)
    .map(([id, count]) => ({ id, name: nameOf(b.catalog, `item:${id}`), count, description: line(b, "item", id, "desc") ?? "" }));
  const held = loadoutOf(weapons, passives, items);
  const combos = relevantCombos(b.combos, held);

  // Targets go to the direction they lie in, or to standing still when Tibo is on or in them.
  const directions: Partial<Record<Direction | "still", DirectionView>> = {};
  const moves = s.forecast?.moves;
  for (const dir of [...DIRECTIONS, "still" as const]) {
    const f = moves?.[dir];
    const enters =
      dir === "still"
        ? [...around.hazards.underfoot, ...around.attacks.filter((a) => a.inside).map((a) => a.kind)]
        : [...(around.hazards.byDirection[dir] ?? []), ...around.attacks.filter((a) => !a.inside && a.enters.includes(dir)).map((a) => a.kind)];
    const bullets = dir === "still" ? around.bullets.length : around.bullets.filter((x) => x.from === dir).length;
    directions[dir] = {
      enemies: dir === "still" ? around.enemies.near : around.enemies.byDirection[dir],
      estimatedDamage: f === undefined ? 0 : round(f.damage),
      ...(f?.dead ? { dead: true as const } : {}),
      ...(f === undefined || Object.keys(f.bySource).length === 0
        ? {}
        : {
            damageFrom: Object.entries(f.bySource)
              .sort((x, y) => y[1] - x[1])
              .slice(0, 2)
              .map(([source]) => sourceName(b, source)),
          }),
      ...(bullets === 0 ? {} : { bullets }),
      ...(enters.length === 0 ? {} : { enters: [...new Set(enters)] }),
    };
  }
  const add = <K extends "spots" | "chests" | "food" | "pickups" | "bosses" | "elites">(key: K, dir: Direction | "still", aim: NonNullable<DirectionView[K]>[number]) => {
    const d = directions[dir] as DirectionView;
    ((d[key] ??= [] as never) as unknown[]).push(aim);
  };
  const activation = g.cfg.activation.seconds;
  for (const p of g.world.activePois) {
    if (p.state.used || p.state.goneAt >= 0) continue;
    const at = place(p.x, p.y);
    // A big update spot is a variety place, with its own English, or a variant such as the Spud Forge.
    const variety = p.kind === "bigUpdate" && p.varietyPlace !== undefined ? p.varietyPlace.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`) : undefined;
    const type = variety ?? p.kind;
    add("spots", at.distance <= p.radius ? "still" : at.direction, {
      id: p.state.uid,
      type,
      name: (variety === undefined ? line(b, "poi", p.kind) : line(b, "varietyPlace", variety)) ?? type,
      distance: at.distance,
      charged: round(p.state.charge / TICKS_PER_SECOND),
      chargeSeconds: p.kind === "bigUpdate" ? (p.varietyPlace === undefined ? 1.5 : 0) : (activation[p.kind] ?? 0),
    });
  }
  for (const p of around.pickups.items as unknown as (Row & { kind: string; charge: number })[]) {
    const at = place(p.x, p.y);
    const aim: Aim = { id: p.uid, type: p.kind, name: p.kind, distance: at.distance };
    const where = at.distance <= UNDER ? "still" : at.direction;
    if (p.kind === "chest") add("chests", where, { ...aim, charged: round(p.charge / TICKS_PER_SECOND), chargeSeconds: activation.chest ?? 1 });
    else add(p.kind === "heal" ? "food" : "pickups", where, aim);
  }
  for (const x of g.bosses) {
    const at = place(x.x, x.y);
    add("bosses", at.direction, { id: x.uid, type: x.def, name: line(b, "boss", x.def, "title") ?? line(b, "boss", x.def) ?? x.def, distance: at.distance, hp: Math.round(x.hp), maxHp: Math.round(x.maxHp) });
  }
  for (const x of around.elites) {
    const at = place(Number(x.x), Number(x.y));
    add("elites", at.direction, { id: Number(x.uid), type: String(x.def), name: line(b, "enemy", String(x.def)) ?? String(x.def), distance: at.distance, hp: Math.round(Number(x.hp)), maxHp: Math.round(Number(x.maxHp)) });
  }
  for (const d of Object.values(directions)) for (const key of ["spots", "chests", "food", "pickups", "bosses", "elites"] as const) d?.[key]?.sort((x, y) => x.distance - y.distance);

  const dashMax = g.cfg.dash.charges + (stats.dashCharges ?? 0);
  return {
    time: round(g.runClock),
    world: {
      difficulty: g.difficulty === "nightmare" ? `nightmare-${g.cfg.ladder.level}` : g.difficulty,
      winAt: g.cfg.win.timeSec,
      biome: { id: g.currentBiome, name: line(b, "biome", g.currentBiome) ?? g.currentBiome },
      ...(g.currentLandmark === null
        ? {}
        : { landmark: { id: g.currentLandmark.biome.id, name: line(b, "biome", g.currentLandmark.biome.id) ?? g.currentLandmark.biome.id, ...(g.currentLandmark.event === undefined ? {} : { event: line(b, "event", g.currentLandmark.event) ?? g.currentLandmark.event }) } }),
      curses,
      extraElites: round(curses * g.cfg.difficulty.extraElitesPerCurse),
      extraBosses: round(curses * g.cfg.difficulty.extraBossesPerCurse),
      scale: Object.fromEntries(Object.entries(g.scale).map(([k, v]) => [k, Math.round(v * 100) / 100])),
      prices: { crate, vendor: e.vendorPrice, slots: Math.ceil(crate * g.cfg.taterSlots.priceFraction), kennel: g.cfg.dogs.kennelPrices },
      ground: around.pickups.value,
      enemiesOnScreen: around.enemies.onScreen,
      upcoming,
      boosts,
      events: (s.gameEvents ?? [])
        .filter((x) => typeof x.time === "number" && g.runClock - (x.time as number) <= 15)
        .slice(-5)
        .map((x) => ({ at: x.time as number, text: eventText(b, x) })),
    },
    tibo: {
      life: { hp: Math.round(me.hp), max: Math.round(stats.maxHp ?? 0) },
      level: { level: l.level, xp: Math.round(l.xp), next: Math.round(l.xpNext) },
      gold: Math.floor(l.gold),
      dash: { charges: me.dashCharges, max: dashMax, readyIn: me.dashCharges >= dashMax ? 0 : round(me.dashCd / TICKS_PER_SECOND) },
      position: { x: Math.round(me.x), y: Math.round(me.y) },
      status: {
        ...(me.stunTicks > 0 ? { stunned: round(me.stunTicks / TICKS_PER_SECOND) } : {}),
        ...(me.freezeTicks > 0 ? { frozen: round(me.freezeTicks / TICKS_PER_SECOND) } : {}),
        ...(me.slowT > 0 ? { slowed: round(me.slowT) } : {}),
        ...(me.invuln > 0 ? { invulnerable: true as const } : {}),
      },
      rerolls: l.rerolls,
      skips: l.skips,
      banishes: l.banishes,
      banished: l.banished,
      revives: Math.max(0, Math.floor(stats.revivals ?? 0) - l.revivesUsed),
      weapons,
      passives,
      items,
      dogs: g.pets.map((p) => {
        const def = b.dogs.get(p.breed) ?? {};
        const helped = Object.fromEntries(Object.entries(g.run.dogHelp).flatMap(([what, by]) => ((by[p.breed] ?? 0) > 0 ? [[what, round(by[p.breed] ?? 0)]] : [])));
        return { id: p.breed, name: line(b, "dog", p.breed) ?? p.breed, level: p.level, max: (Array.isArray(def.levelUps) ? def.levelUps.length : 0) + 1, description: line(b, "dog", p.breed, "desc") ?? "", helped };
      }),
      stats,
      shrineTotals: Object.fromEntries(Object.entries(l.shrineTotals).filter(([, v]) => v !== 0)),
      evolves: combos.filter((c) => c.recipe.kind !== "union" && comboProgress(c, held, b.catalog).every((x) => x === "done")).map((c) => nameOf(b.catalog, c.result)),
      recipes: combos.map(
        (c) =>
          `${nameOf(b.catalog, c.result)}: ${c.parts
            .map((p) => {
              const have = held.get(p.key);
              return `${nameOf(b.catalog, p.key)} ${partState(p, held, b.catalog)}${have === undefined ? "" : ` ${have}/${b.catalog.maxLevel[p.key] ?? 1}`}`;
            })
            .join(" + ")}`,
      ),
      hurtBy: Object.fromEntries(Object.entries(around.hurtBy).map(([k, v]) => [sourceName(b, k), v])),
      dps: around.dps,
    },
    directions: { horizonMilliseconds: Math.round(around.seconds * 1000), ...directions },
    attacks: {
      bullets: around.bullets,
      zones: around.attacks.map((a) => ({ kind: a.kind, shape: a.shape, distance: Math.round(a.dist), direction: a.dir, inside: a.inside, ...(a.landsIn === undefined ? {} : { landsIn: a.landsIn }), enters: a.enters })),
      volleys: around.volleys.map((v) => ({ distance: Math.round(v.dist), direction: v.dir, firesIn: v.firesIn, count: v.count, bursts: v.bursts, damage: v.damage })),
    },
    ...(g.choiceQueue.length === 0 ? {} : { choice: choiceView(b, g, held) }),
  };
}
