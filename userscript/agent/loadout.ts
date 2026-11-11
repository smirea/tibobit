import type { LoadoutSpec } from "../../protocol/commands";
import { maxWeaponLevel } from "../../game/catalog";
import type { Game } from "../../game/types";
import { GameLink } from "../link/game-link";

/** The game's weapon slots; passives have as many. */
export const WEAPON_SLOTS = 6;

type Offer = { type: "weapon" | "passive"; id: string; level: number; isNew: boolean };

// The game applies an offer only through its own pick. A passive's pick recomputes the stats; a weapon's does not.
export function pick(game: Game, offer: Offer) {
  const s = game.state;
  s.choiceQueue.push({ kind: "levelUp", offers: [offer], level: s.loadout.level });
  game.choose({ type: "pick", index: 0 });
}

// A shrine pick is the game's own way to add to a stat, and it always recomputes the stats.
function shrinePick(game: Game, stat: string, value: number) {
  game.state.choiceQueue.push({ kind: "shrine", offers: [{ stat, value }] });
  game.choose({ type: "pick", index: 0 });
}

/** Replaces the run's weapons, passives and items, level by level as level-ups would. */
export function applyLoadout(link: GameLink, game: Game, spec: LoadoutSpec) {
  const content = link.content();
  if (content === undefined) throw new Error("the game's content is not loaded yet");
  const weaponDefs = new Map(content.allWeapons.map((w) => [w.id, w]));
  const passiveDefs = new Map(content.passives.map((p) => [p.id, p]));
  const itemIds = new Set(content.allItems.map((i) => i.id));
  const problems: string[] = [];
  const weaponMax = (id: string) => {
    const w = weaponDefs.get(id);
    return w === undefined ? 0 : maxWeaponLevel(w);
  };
  for (const { id, level } of spec.weapons) {
    if (!weaponDefs.has(id)) problems.push(`no weapon ${id}`);
    else if (level < 1 || level > weaponMax(id)) problems.push(`weapon ${id} levels 1 to ${weaponMax(id)}, not ${level}`);
  }
  for (const { id, level } of spec.passives) {
    const p = passiveDefs.get(id);
    if (p === undefined) problems.push(`no passive ${id}`);
    else if (level < 1 || level > p.maxLevel) problems.push(`passive ${id} levels 1 to ${p.maxLevel}, not ${level}`);
  }
  for (const { id } of spec.items) if (!itemIds.has(id)) problems.push(`no item ${id}`);
  if (spec.weapons.length === 0) problems.push("a loadout needs a weapon");
  if (spec.weapons.length > WEAPON_SLOTS) problems.push(`at most ${WEAPON_SLOTS} weapons`);
  if (spec.passives.length > WEAPON_SLOTS) problems.push(`at most ${WEAPON_SLOTS} passives`);
  const s = game.state;
  const L = s.loadout;
  for (const stat of Object.keys(spec.shrineTotals ?? {})) if (!(stat in L.shrineTotals)) problems.push(`no shrine stat ${stat}; the stats are ${Object.keys(L.shrineTotals).join(", ")}`);
  if (problems.length > 0) throw new Error(problems.join("; "));
  if (s.choiceQueue.length > 0) throw new Error("a choice is open; pick it first");
  L.weapons.length = 0;
  L.passives.length = 0;
  L.items.clear();
  // Items count on the next recompute.
  for (const { id, count } of spec.items) L.items.set(id, (L.items.get(id) ?? 0) + count);
  for (const { id, level } of spec.weapons) for (let n = 1; n <= level; n++) pick(game, { type: "weapon", id, level: n, isNew: n === 1 });
  for (const { id, level } of spec.passives) for (let n = 1; n <= level; n++) pick(game, { type: "passive", id, level: n, isNew: n === 1 });
  for (const [stat, total] of Object.entries(spec.shrineTotals ?? {})) shrinePick(game, stat, total - (L.shrineTotals[stat] ?? 0));
  // With weapons alone nothing above recomputed the stats, and the items would not count.
  shrinePick(game, "might", 0);
  if (spec.gold !== undefined) L.gold = spec.gold;
  const maxHp = L.stats.maxHp;
  if (spec.hp !== undefined) s.player.hp[s.me] = spec.hp === "full" ? maxHp : Math.min(maxHp, spec.hp);
  // A hand-made loadout no longer replays from the run's inputs, so the game must not post it to boards or count it as a win.
  game.taint();
  const got = L.weapons.map((w) => `${w.def.id} ${w.level}`).join(", ");
  const want = spec.weapons.map((w) => `${w.id} ${w.level}`).join(", ");
  if (got !== want) throw new Error(`the game kept weapons ${got || "none"}, not ${want}`);
}
