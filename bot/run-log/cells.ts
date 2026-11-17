// The run log: one CSV row per model call and per goal that starts or ends, with the player's state
// at that moment. Its columns and the text of every cell are written here. A cell that holds
// several things joins them with "; ".

export const LOG_COLUMNS = [
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
  "stats",
  "counts",
  "target",
  "walked",
] as const;
export const listCell = {
  encode: (parts: string[]) => parts.join("; "),
};

/** A weapon or passive held, with its level of the most it can reach: `Starch Plating 3/5`. */
export const heldCell = {
  encode: (x: { name: string; level: number; max: number }) => `${x.name} ${x.level}/${x.max}`,
};

/** The game's own counts of a run so far, by their keys in its `run` object; `bossChests` is every chest Tibo opened, `paidChests` every Potato Crate bought. */
export const RUN_COUNTS = ["bossChests", "paidChests", "elitesKilled", "bossesKilled", "shrinesUsed"] as const;
export type RunCount = (typeof RUN_COUNTS)[number];

/** Numbers by the game's own names, as the stats and the counts columns hold them: `maxHp 150; armor 12; damageMult 1.12`. */
export const numbersCell = {
  encode: (stats: Record<string, number>) => listCell.encode(Object.entries(stats).map(([name, value]) => `${name} ${Math.round(value * 1000) / 1000}`)),
};

type Where = { dist: number; dir: string };
const where = (x: Where) => `${Math.round(x.dist)} ${x.dir}`;
const percent = (part: number, whole: number) => Math.round((100 * part) / Math.max(1, whole));

/** A boss in sight: `Name (type) 120 left 80% of 4000`. Every entry is its own boss with its own health, even when several share a type. */
export const bossCell = {
  encode: (b: Where & { name: string; type: string; hp: number; maxHp: number }) => `${b.name} (${b.type}) ${where(b)} ${percent(b.hp, b.maxHp)}% of ${Math.round(b.maxHp)}`,
};

/** An elite alive, known by its uid: `17 Name (type) 900/4000 85 up`. */
export const eliteCell = {
  encode: (e: Where & { id: number; name: string; type: string; hp: number; maxHp: number }) => `${e.id} ${e.name} (${e.type}) ${Math.round(e.hp)}/${Math.round(e.maxHp)} ${where(e)}`,
};

/** Damage taken lately from one source: `enemy:aphid 12.5`. */
export const hurtCell = {
  encode: ([source, amount]: [string, number]) => `${source} ${amount}`,
};

/** Where food or a spot is: `85 up-left`, with the spot's name before it. */
export const placeCell = { encode: where };

/** A chest on the map, known by its uid: `C12 85 up-left`. */
export const chestCell = {
  encode: (c: Where & { id: number }) => `C${c.id} ${where(c)}`,
};

/** What a goal is called. A spot's goal names the spot. */
export const goalTitleCell = {
  spot: (name: string) => `Charge the ${name}`,
};

/** One change to what Tibo holds: `Peeler 3/8 to 7/8`, `Spud Lob 1/8 new (the game's description)` or `Peeler gone`. */
type Change = { name: string; now?: string; before?: string; said?: string };
export const changeCell = {
  encode: (c: Change) => (c.now === undefined ? `${c.name} gone` : c.before === undefined ? `${c.name} ${c.now} new${c.said ?? ""}` : `${c.name} ${c.before} to ${c.now}`),
};
export const changesCell = { encode: (parts: string[]) => parts.join(", ") };

/** What a goal is after as it starts, by the game's own kind, and where it is: `eliteNest 180 left`. */
export const targetCell = {
  encode: (t: Where & { kind: string }) => `${t.kind} ${where(t)}`,
};

/** Why a goal that held Tibo in place was given up for the health it cost (knob holdAbortHurt): `Tibo lost 32 health in 3 seconds while this goal kept it in place`. */
export const hurtLeaveCell = {
  encode: (lost: number, seconds: number) => `Tibo lost ${Math.round(lost)} health in ${seconds} seconds while this goal kept it in place`,
};

/** What the action model made of a dash it was asked about: `dash asked: 62%, dashed`. */
export const dashCell = {
  encode: (score: number, dashed: boolean) => `dash asked: ${Math.round(score * 100)}%${dashed ? ", dashed" : ""}`,
};

/** A goal's id says what it is after: `C12` a chest, `P7` a spot, `F3` food, `E9` an elite, `explore left`, or the kind alone. */
export const goalCell = {
  encode: (g: { kind: string; uid?: number; dir?: string }) =>
    g.kind === "chest" ? `C${g.uid}` : g.kind === "poi" ? `P${g.uid}` : g.kind === "food" ? `F${g.uid}` : g.kind === "elite" ? `E${g.uid}` : g.kind === "pickup" ? `K${g.uid}` : g.kind === "explore" || g.kind === "dash" ? `${g.kind} ${g.dir}` : g.kind,
};

/** What a row's reason ends with when the model it names never answered and the bot went on without it. */
export const UNANSWERED = "did not answer in time";

type Rated = { card: string; probability?: number };
/** The options of one question with the model's odds for each: `Peeler 61%; Root Cellar 30%; Grab Bag ?%`. */
const oddsCell = {
  encode: (options: Rated[]) => options.map((o) => `${o.card} ${o.probability === undefined ? "?" : Math.round(o.probability * 100)}%`).join("; "),
};

/** What the planner weighed on one call: the goals, and before them the cards when a choice was open: `<cards> | goals: <goals>`. */
export const weighedCell = {
  encode: (goals: Rated[], cards?: Rated[]) => (cards === undefined ? oddsCell.encode(goals) : `${oddsCell.encode(cards)} | goals: ${oddsCell.encode(goals)}`),
};

/**
 * The moves the action model weighed on one step, as a person reads them:
 * `up-left -12 hp hurt 2 useful 60%; stand still no damage hurt 0 useful 10%; down dead hurt - useful - (ruled out)`.
 * `hurt` is the model's score on its scale, from 0; a move ruled out before asking has none.
 */
export const movesCell = {
  encode: (moves: { move: string; forecast?: { damage: number; dead: boolean }; hurt?: number; useful?: number; ruledOut: boolean }[]) =>
    moves
      .map((m) => {
        const cost = m.forecast === undefined ? "?" : m.forecast.dead ? "dead" : m.forecast.damage === 0 ? "no damage" : `-${Math.round(m.forecast.damage)} hp`;
        return `${m.move === "still" ? "stand still" : m.move} ${cost} hurt ${m.hurt ?? "-"} useful ${m.useful === undefined ? "-" : `${Math.round(m.useful * 100)}%`}${m.ruledOut ? " (ruled out)" : ""}`;
      })
      .join("; "),
};
