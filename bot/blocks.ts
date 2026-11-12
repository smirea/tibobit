import { fields, groundSources, pct, plural, poiWhat, priceWords, spotLine } from "./phrasing";
import { type Combo, idOf, type Key, type Loadout, nameOf, type Part, partner } from "../game/catalog";
import { difficulty, MODE_NAME } from "./run-context";
import type { BlockName } from "./templates";
import type { ChoiceAction } from "../protocol/commands";
import { DIRECTIONS } from "../protocol/geometry";
import type { ChoiceOption } from "../protocol/view";
import type { World } from "./world";
import { outcomes, pursuit } from "./goals";
import type { Book } from "../game/book";
import { clock } from "../clock";

/** One thing Tibo can do on the open choice: the game's own action, and the words the planner weighs it by. */
export type Card = { action: ChoiceAction; name: string; notes: string[]; text: string };

/** What Tibo holds, by the game's keys, at the level (or count) held. */
function heldLoadout(r: World): Loadout {
  return new Map<Key, number>([...r.weapons.map((w) => [`weapon:${w.id}`, w.level] as const), ...r.passives.map((p) => [`passive:${p.id}`, p.level] as const), ...r.items.map((i) => [`item:${i.id}`, i.count] as const)]);
}

/** Recipes not made yet whose parts are none of them banished: the evolutions this run can still reach. */
function findable(r: World): Combo[] {
  const held = heldLoadout(r);
  const banished = new Set(r.view.tibo.banished);
  return r.book.combos.filter((c) => !held.has(c.result) && c.parts.every((p) => !banished.has(idOf(p.key))));
}

/** A recipe's part as the picker reads it: its name, and how far Tibo has it. */
function partWords(r: World, p: Part, held: Loadout): string {
  const have = held.get(p.key);
  const max = r.book.catalog.maxLevel[p.key] ?? 1;
  const need = p.need === "max" ? `, needed at level ${max}` : "";
  return `${nameOf(r.book.catalog, p.key)} (${have === undefined ? "not found yet" : p.key.startsWith("item:") ? "equipped" : `equipped at ${have}/${max}`}${need})`;
}

/** The evolutions an offered entry Tibo does not hold yet leads to, with the other part each needs. */
function evolutionsOf(r: World, key: Key): string[] {
  const held = heldLoadout(r);
  if (held.has(key)) return [];
  return findable(r)
    .filter((c) => c.parts.some((p) => p.key === key))
    .map((c) => `into ${nameOf(r.book.catalog, c.result)} with ${partWords(r, partner(c, key), held)}`);
}

function slotWords(r: World, type: string, id: string): string {
  const held = (type === "weapon" ? r.weapons : r.passives).find((x) => x.id === id);
  if (type === "weapon") return held === undefined ? `new weapon, fills weapon slot ${r.weapons.length + 1} of 6` : `weapon upgrade to level ${held.level + 1} of ${held.max}`;
  if (type === "passive") return held === undefined ? `new passive, fills passive slot ${r.passives.length + 1} of 6` : `passive upgrade to level ${held.level + 1} of ${held.max}`;
  if (type === "item") return r.items.some((i) => i.id === id) ? "another of an item Tibo holds" : "new item";
  return type;
}

/** What an option that is not a card does, in the game's terms. */
function actionWords(r: World, action: ChoiceAction): string | undefined {
  const t = r.view.tibo;
  switch (action.type) {
    case "reroll":
      return `replaces every offered card with new ones; ${plural(t.rerolls, "reroll")} left`;
    case "skip":
      return `takes nothing this time; ${plural(t.skips, "skip")} left`;
    case "banish":
      return `takes nothing, and this card is never offered again this run; ${plural(t.banishes, "banish")} left`;
    default:
      return undefined;
  }
}

/** The open choice's options as the planner weighs them: each the game's own action, with what the view says of it. */
export function cards(r: World): Card[] {
  return (r.view.choice?.options ?? []).map((o: ChoiceOption) => {
    const { action, name, description, type, id, isNew: _, ...rest } = o as ChoiceOption & { type?: string; id?: string; isNew?: boolean };
    const kind = type === "weapon" || type === "passive" || type === "item" ? type : undefined;
    const evolutions = kind === undefined || id === undefined || action.type === "banish" ? [] : evolutionsOf(r, `${kind}:${id}`);
    const notes = [
      ...(actionWords(r, action) === undefined ? [] : [actionWords(r, action) ?? ""]),
      ...(kind !== undefined && id !== undefined && action.type !== "banish" ? [slotWords(r, kind, id)] : []),
      ...(evolutions.length === 0 ? [] : [`LEADS TO AN EVOLUTION: ${evolutions.join("; or ")}`]),
      ...(description === undefined || description === "" ? [] : [description]),
      ...(Object.keys(rest).length === 0 ? [] : [fields(rest)]),
    ];
    return { action, name, notes, text: `${name}${notes.length === 0 ? "" : ` (${notes.join("; ")})`}` };
  });
}

/** The choice open now as the picker reads it: what is equipped, what is offered, and the evolutions still to find. */
function offerBlock(r: World): string {
  const choice = r.view.choice;
  if (choice === undefined) return "No choice is open.";
  const held = heldLoadout(r);
  const owned = (label: string, xs: { name: string; level: number; max: number; description: string }[]) =>
    `${label}:${xs.map((x) => `\n  - ${x.name} ${x.level}/${x.max}${x.description === "" ? "" : `: ${x.description.replace(/\s+/g, " ").trim()}`}`).join("") || " none"}`;
  const recipes = findable(r)
    .map((c) => ({ c, have: c.parts.filter((p) => held.has(p.key)).length }))
    .sort((a, z) => z.have - a.have)
    .map(({ c }) => `\n  - ${nameOf(r.book.catalog, c.result)}: ${c.parts.map((p) => partWords(r, p, held)).join(" + ")}`);
  return [
    `Open now: a ${choice.kind}.`,
    `Equipped:\n${owned(`Weapons (${r.weapons.length} of 6 slots)`, r.weapons)}\n${owned(`Passives (${r.passives.length} of 6 slots)`, r.passives)}\nItems:${r.items.map((i) => `\n  - ${i.name} x${i.count}${i.description === "" ? "" : `: ${i.description}`}`).join("") || " none"}`,
    `Offered, each one option to choose:${cards(r).map((c) => `\n  - ${c.text}`).join("")}`,
    `Evolutions this run can still reach (recipes not made yet with no part banished), closest first:${recipes.join("") || " none"}`,
  ].join("\n\n");
}

/** Every state block a template may use (see BLOCKS in bot/templates.ts), rendered only when used. */
export function blocks(r: World, b: Book): Record<BlockName, () => string> {
  const v_ = r.view;
  const t = v_.tibo;
  const w = v_.world;
  const owned = (xs: { name: string; level: number; max: number; description: string }[]) => xs.map((x) => `\n  - ${x.name} ${x.level}/${x.max}${x.description === "" ? "" : `: ${x.description.replace(/\s+/g, " ").trim()}`}`).join("") || " none";
  const hp = pct(r.hp, r.maxHp);
  const v: Record<Exclude<BlockName, "state">, () => string> = {
    time: () => clock(r.time),
    difficulty: () => difficulty,
    mode: () => MODE_NAME,
    health: () => `Health ${Math.round(r.hp)}/${Math.round(r.maxHp)} (${hp}%${healthTrend(r)})${hp < 40 ? ", which is low" : ""}.`,
    level: () => `Level ${t.level.level}, ${pct(t.level.xp, t.level.next)}% of the way to the next.`,
    gold: () => `Gold ${t.gold}.`,
    dash: () => `Dash charges ${t.dash.charges} of ${t.dash.max}.`,
    weapons: () => `Weapons (${r.weapons.length} of 6 slots):${owned(r.weapons)}`,
    passives: () => `Passives (${r.passives.length} of 6 slots):${owned(r.passives)}`,
    items: () => `Items:${r.items.map((i) => `\n  - ${i.name} x${i.count}${i.description === "" ? "" : `: ${i.description}`}`).join("") || " none"}`,
    banished: () => `Banished this run: ${t.banished.join(", ") || "nothing"}.`,
    recipes: () => `Recipes in reach: ${t.recipes.join("; ") || "none"}.`,
    evolutions: () => (t.evolves.length === 0 ? "No recipe is complete yet." : `The next chest opened evolves ${t.evolves.join(" and ")}.`),
    standing_on: () => `Tibo stands ${spotLine(r) ?? "on no chest or spot"}.${groundSources(r).length === 0 ? "" : ` Underfoot: ${groundSources(r).join(", ")}.`}`,
    hurt_by: () => `Hurt in the last 3 seconds by: ${fields(r.hurtBy) || "nothing"}.`,
    dps: () => `Damage dealt a second over the last 3 seconds: ${Math.round(r.dps)}.`,
    bosses: () => `Bosses: ${r.bosses.map((x) => `${x.name} (${x.type}) ${Math.round(x.dist)} away to the ${x.dir}, ${pct(x.hp, x.maxHp)}% health`).join("; ") || "none"}.`,
    enemies: () => {
      const crowd = [...r.sectors].sort((a, z) => z.enemies - a.enemies);
      return `Enemies: ${r.view.world.enemiesOnScreen} on screen. Most to the ${crowd[0]?.dir} (${crowd[0]?.enemies}), fewest to the ${crowd.at(-1)?.dir} (${crowd.at(-1)?.enemies}).`;
    },
    current_goal: () => `Current goal: ${pursuit === undefined ? "none" : `${pursuit.title}, since ${clock(pursuit.since)}`}.`,
    recent_goals: () => `Recent goals: ${outcomes.slice(-6).map((o) => `${clock(o.time)} ${o.title}: ${o.outcome}`).join("; ") || "none yet"}.`,
    stats: () => `Stats: ${fields(t.stats)}. Added by shrines: ${fields(t.shrineTotals) || "nothing"}.`,
    resources: () => `Rerolls ${t.rerolls}, skips ${t.skips}, banishes ${t.banishes}, revives ${t.revives}; curses ${w.curses}, which add ${w.extraElites} elites and ${w.extraBosses} bosses.`,
    spots: () => {
      if (r.spots.length === 0) return "Spots: none on the loaded map.";
      return `Spots on the loaded map, nearest first:${r.spots
        .map((x) => `\n  - ${x.name} (${x.type}) ${x.inside ? "under Tibo" : `${Math.round(x.dist)} away to the ${x.dir}`}${poiWhat(r.book, x)} Charged ${x.charged} of ${x.chargeSeconds} s${priceWords(x, r)}.`)
        .join("")}`;
    },
    dogs: () =>
      t.dogs.length === 0
        ? "Dogs: none."
        : `Dogs:${t.dogs
            .map((d) => {
              const def = b.dogs.get(d.id) ?? {};
              const facts = Object.entries(def).filter(([k]) => !["id", "name", "desc", "breed"].includes(k));
              return `\n  - ${d.name}${typeof def.breed === "string" ? ` (${def.breed})` : ""} level ${d.level} of ${d.max}${d.description === "" ? "" : `: ${d.description}`} The game's numbers: ${facts.map(([k, val]) => `${k} ${JSON.stringify(val)}`).join(", ")}.${Object.keys(d.helped).length === 0 ? "" : ` So far: ${fields(d.helped)}.`}`;
            })
            .join("")}`,
    pickups: () =>
      `On the ground: xp worth ${w.ground.xp} and gold worth ${w.ground.gold}. Chests: ${r.chests.map((x) => `${Math.round(x.dist)} ${x.dir}`).join("; ") || "none"}. Food: ${r.food.map((x) => `${Math.round(x.dist)} ${x.dir}`).join("; ") || "none"}. Other pickups: ${r.pickups.map((x) => `${x.type} ${Math.round(x.dist)} ${x.dir}`).join("; ") || "none"}.`,
    buffs: () => `Timed boosts: ${w.boosts.map((x) => `${x.name} ${x.endsIn} s left`).join(", ") || "none"}.`,
    schedule: () => `Coming up: ${w.upcoming.map((x) => `${clock(x.at)} ${x.text}`).join("; ") || "nothing scheduled"}.`,
    hazards: () => {
      const a = v_.attacks;
      const paths = DIRECTIONS.flatMap((d) => (v_.directions[d]?.enters === undefined ? [] : [`${d}: ${v_.directions[d]?.enters?.join(", ")}`]));
      return `Within ${v_.directions.horizonMilliseconds / 1000} s: underfoot ${groundSources(r).join(", ") || "nothing"}; walking into ${paths.join("; ") || "nothing"}. Attacks near: ${a.zones.map((x) => `${x.kind} (${x.shape}) ${x.distance} away to the ${x.direction}${x.inside ? ", Tibo is inside" : ""}${x.landsIn === undefined ? "" : `, lands in ${x.landsIn} s`}${x.enters.length === 0 ? "" : `, walking ${x.enters.join(" or ")} enters it`}`).join("; ") || "none"}. Bullets that would hit a Tibo standing still: ${a.bullets.map((x) => `from the ${x.from} in ${x.in} s for ${x.damage}`).join("; ") || "none"}.`;
    },
    events: () => `Recent game events: ${w.events.map((e) => `${clock(e.at)} ${e.text}`).join("; ") || "none"}.`,
    elites: () => `Elites alive: ${r.elites.map((e) => `${e.name} (${e.type}) ${e.hp}/${e.maxHp} hp, ${Math.round(e.dist)} away to the ${e.dir}`).join("; ") || "none"}.`,
    counters: () => {
      const nonzero = (o: Record<string, unknown>) => Object.fromEntries(Object.entries(o).filter(([, x]) => typeof x === "number" && x !== 0));
      return `What the game has counted this run: counters ${fields(nonzero(r.counters))}; run ${fields(nonzero(r.run))}.`;
    },
    offer: () => offerBlock(r),
    weapon_damage: () => {
      const dealt = r.run.damageBySource;
      const minutes = Math.max(r.time, 1) / 60;
      const held = [...r.weapons].sort((a, z) => (dealt[z.id] ?? 0) - (dealt[a.id] ?? 0));
      return `Damage dealt so far by weapon: ${held.map((x) => `${x.name} ${Math.round(dealt[x.id] ?? 0)} (${Math.round((dealt[x.id] ?? 0) / minutes)} a minute)`).join(", ") || "no weapon"}.`;
    },
  };
  const state = () =>
    [
      `Time ${v.time()}. ${v.health()} ${v.level()} ${v.gold()} ${v.dash()}`,
      v.weapons(),
      v.passives(),
      v.items(),
      ...(t.banished.length === 0 ? [] : [v.banished()]),
      v.recipes(),
      v.evolutions(),
      v.standing_on(),
      v.hurt_by(),
      v.bosses(),
      v.enemies(),
      v.current_goal(),
      v.recent_goals(),
    ].join("\n");
  return { ...v, state };
}

/** Every state block rendered now, for the panel to show what each embed holds. */
export function renderBlocks(r: World): Record<BlockName, string> {
  return Object.fromEntries(Object.entries(blocks(r, r.book)).map(([name, render]) => [name, render()])) as Record<BlockName, string>;
}

/** The values a template is rendered with: the state blocks and the slot's own, such as {{goal}}. */
export function stateVars(r: World, extra: Record<string, string>): Record<string, () => string> {
  return { ...blocks(r, r.book), ...Object.fromEntries(Object.entries(extra).map(([k, x]) => [k, () => x])) };
}

// Health samples by game time, to tell the planner whether Tibo is bleeding.
const healthHistory: { time: number; hp: number }[] = [];

function healthTrend(r: World): string {
  const now = pct(r.hp, r.maxHp);
  if (healthHistory.length > 0 && (healthHistory.at(-1)?.time ?? 0) > r.time) healthHistory.length = 0;
  healthHistory.push({ time: r.time, hp: now });
  while (healthHistory.length > 1 && (healthHistory[1]?.time ?? 0) <= r.time - 30) healthHistory.shift();
  const then = healthHistory[0];
  if (then === undefined || r.time - then.time < 20 || Math.abs(then.hp - now) < 10) return "";
  return `, ${then.hp > now ? "down" : "up"} from ${then.hp}% ${Math.round(r.time - then.time)} seconds ago`;
}
