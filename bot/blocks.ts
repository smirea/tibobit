import { book, fields, groundSources, pct, poiWhat, priceWords, spotLine } from "./phrasing";
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

function slotWords(r: World, type: string, id: string): string {
  const held = (type === "weapon" ? r.weapons : r.passives).find((x) => x.id === id);
  if (type === "weapon") return held === undefined ? `new weapon, fills weapon slot ${r.weapons.length + 1} of 6` : `weapon upgrade to level ${held.level + 1} of ${held.max}`;
  if (type === "passive") return held === undefined ? `new passive, fills passive slot ${r.passives.length + 1} of 6` : `passive upgrade to level ${held.level + 1} of ${held.max}`;
  return type;
}

/** The open choice's options as the planner weighs them: each the game's own action, with what the view says of it. */
export function cards(r: World): Card[] {
  return (r.view.choice?.options ?? []).map((o: ChoiceOption) => {
    const { action, name, description, type, id, pairs, ...rest } = o as ChoiceOption & { type?: string; id?: string; pairs?: string[] };
    const notes = [
      ...(type !== undefined && id !== undefined && (type === "weapon" || type === "passive") ? [slotWords(r, type, id)] : []),
      ...(pairs ?? []).map((p) => `pairs ${p}`),
      ...(description === undefined || description === "" ? [] : [description]),
      ...(Object.keys(rest).length === 0 ? [] : [fields(rest)]),
    ];
    return { action, name, notes, text: `${name}${notes.length === 0 ? "" : ` (${notes.join("; ")})`}` };
  });
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
        .map((x) => `\n  - ${x.name} (${x.type}) ${x.inside ? "under Tibo" : `${Math.round(x.dist)} away to the ${x.dir}`}${poiWhat(x)} Charged ${x.charged} of ${x.chargeSeconds} s${priceWords(x, r)}.`)
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

/** The values a template is rendered with: the state blocks and the slot's own, such as {{goal}}. */
export function stateVars(r: World, extra: Record<string, string>): Record<string, () => string> {
  if (book === undefined) throw new Error("the game's encyclopedia has not arrived; the bot reads it before the first decision");
  return { ...blocks(r, book), ...Object.fromEntries(Object.entries(extra).map(([k, x]) => [k, () => x])) };
}

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
