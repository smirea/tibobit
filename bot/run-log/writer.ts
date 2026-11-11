import path from "node:path";
import { groundSources, pct, said, spotLine } from "../phrasing";
import { appendFileSync, mkdirSync, writeFileSync } from "node:fs";
import type { World } from "../world";
import { clock } from "../../clock";
import { bossCell, changeCell, changesCell, chestCell, eliteCell, hurtCell, listCell, placeCell } from "./cells";
import { csvField } from "../../csv";

// One CSV row per model call and per goal that starts or ends, with the player's state at that
// moment, so a run can be read back decision by decision. The post-run review reads it.

// Numbers first and free text last, so a reader splitting on commas gets the numbers right.
const LOG_COLUMNS = [
  "time",
  "seconds",
  "wall",
  "event",
  "model",
  "ms",
  "hp",
  "max_hp",
  "hp_lost",
  "hp_gained",
  "level",
  "xp_pct",
  "gold",
  "x",
  "y",
  "dash",
  "enemies",
  "goal",
  "action",
  "reason",
  "detail",
  "bosses",
  "hurt_by",
  "standing_on",
  "underfoot",
  "chests",
  "food",
  "pois",
  "weapons",
  "passives",
  "items",
  "options",
  "dealt",
  "elites",
  "elite_list",
  "spot",
] as const;

/** `walk`: the page walked Tibo toward its goal without asking a model, and Tibo lost health on the way. `loadout`: what Tibo holds changed. */
type LogEvent = "plan" | "pick" | "move" | "walk" | "goal" | "loadout" | "run_end";

type LogRow = { event: LogEvent; model?: string; reason?: string; goal?: string; action?: string; options?: string; detail?: string; ms?: number };

export class RunLog {
  /** Health at the previous row, for `hp_lost` and `hp_gained`. */
  private hp: number | undefined;
  /** Health gained between rows over the run: the game counts healing only in total, not by source. */
  healed = 0;
  private held: Map<string, string> | undefined;
  constructor(readonly file: string) {
    mkdirSync(path.dirname(file), { recursive: true });
    // Never over another run's log: two runs with one id would truncate each other's.
    writeFileSync(file, `${LOG_COLUMNS.join(",")}\n`, { flag: "wx" });
  }

  write(r: World | undefined, row: LogRow) {
    const lost = r === undefined || this.hp === undefined ? "" : String(Math.max(0, Math.round(this.hp - r.hp)));
    const gained = r === undefined || this.hp === undefined ? 0 : Math.max(0, Math.round(r.hp - this.hp));
    this.healed += gained;
    if (r !== undefined) this.hp = r.hp;
    const at = placeCell.encode;
    const t = r?.view.tibo;
    const state: Partial<Record<(typeof LOG_COLUMNS)[number], string | number>> =
      r === undefined || t === undefined
        ? {}
        : {
            time: clock(r.time),
            seconds: Math.round(r.time * 10) / 10,
            hp: Math.round(r.hp),
            max_hp: Math.round(r.maxHp),
            hp_lost: lost,
            hp_gained: gained,
            level: t.level.level,
            xp_pct: pct(t.level.xp, t.level.next),
            gold: t.gold,
            x: Math.round(r.x),
            y: Math.round(r.y),
            dash: t.dash.charges,
            enemies: r.view.world.enemiesOnScreen,
            bosses: listCell.encode(r.bosses.map(bossCell.encode)),
            dealt: Math.round(Object.values(r.run.damageBySource).reduce((a, b) => a + b, 0)),
            elites: r.run.elitesKilled,
            elite_list: listCell.encode(r.elites.slice(0, 3).map(eliteCell.encode)),
            hurt_by: listCell.encode(Object.entries(r.hurtBy).map(hurtCell.encode)),
            standing_on: spotLine(r) ?? "",
            underfoot: listCell.encode(groundSources(r)),
            chests: listCell.encode(r.chests.map(chestCell.encode)),
            spot: r.chests.some((c) => c.dir === "still") ? "chest" : (r.spots.find((p) => p.inside)?.name ?? ""),
            food: listCell.encode(r.food.slice(0, 2).map(at)),
            pois: listCell.encode(r.spots.filter((x) => x.chargeSeconds > 0).slice(0, 4).map((x) => `${x.name} ${at(x)}`)),
            weapons: listCell.encode(r.weapons.map((w) => `${w.name} ${w.level}/${w.max}`)),
            passives: listCell.encode(r.passives.map((w) => `${w.name} ${w.level}/${w.max}`)),
            items: listCell.encode(r.items.map((i) => `${i.name} x${i.count}`)),
          };
    const values = { ...state, ...row, wall: new Date().toISOString().slice(11, 19) } as Record<string, string | number | undefined>;
    appendFileSync(this.file, `${LOG_COLUMNS.map((c) => csvField(String(values[c] ?? ""))).join(",")}\n`);
  }

  /** Health lost since the last row. */
  lostSince(r: World): number {
    return this.hp === undefined ? 0 : Math.max(0, this.hp - r.hp);
  }

  /**
   * What Tibo holds now against the last call, such as "Root Spikes 3/8 to 7/8, Taproot Eruption
   * new", or undefined when nothing changed. Chests hand out their rewards without a choice, so
   * this is the only record of what a chest gave.
   */
  loadoutChange(r: World): string | undefined {
    const now = new Map([...r.weapons, ...r.passives].map((x) => [x.name, `${x.level}/${x.max}`] as [string, string]));
    // A new item carries the game's description, so a review can tell what it should have changed.
    const itemSaid = new Map(r.items.map((i) => [i.name, said(r.book, "item", i.id).replace(/^: (.*)$/, " ($1)")] as [string, string]));
    for (const i of r.items) now.set(i.name, `x${i.count}`);
    const before = this.held;
    this.held = now;
    if (before === undefined) return undefined;
    const changes = [
      ...[...now].filter(([k, v]) => before.get(k) !== v).map(([k, v]) => changeCell.encode({ name: k, now: v, ...(before.has(k) ? { before: before.get(k) } : { said: itemSaid.get(k) }) })),
      ...[...before.keys()].filter((k) => !now.has(k)).map((k) => changeCell.encode({ name: k })),
    ];
    return changes.length === 0 ? undefined : changesCell.encode(changes);
  }
}
