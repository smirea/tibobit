// The cells of the run log that are read back, each written and parsed here, so the writer and
// the readers cannot drift apart. A cell that holds several things joins them with "; ".

export const listCell = {
  encode: (parts: string[]) => parts.join("; "),
  decode: (cell: string | undefined) => (cell ?? "").split("; ").filter(Boolean),
};

type Where = { dist: number; dir: string };
const where = (x: Where) => `${Math.round(x.dist)} ${x.dir}`;
const percent = (part: number, whole: number) => Math.round((100 * part) / Math.max(1, whole));

/** A boss in sight: `Name (type) 120 left 80% of 4000`. Every entry is its own boss with its own health, even when several share a type. */
export const bossCell = {
  encode: (b: Where & { name: string; type: string; hp: number; maxHp: number }) => `${b.name} (${b.type}) ${where(b)} ${percent(b.hp, b.maxHp)}% of ${Math.round(b.maxHp)}`,
  decode: (text: string) => {
    const m = text.match(/^(.*) \(([^()]*)\) (\d+) (\S+) (\d+)% of (\d+)$/);
    return m === null ? undefined : { name: m[1] ?? "", type: m[2] ?? "", dist: Number(m[3]), dir: m[4] ?? "", percent: Number(m[5]), maxHp: Number(m[6]) };
  },
};

/** An elite alive, known by its uid: `17 Name (type) 900/4000 85 up`. */
export const eliteCell = {
  encode: (e: Where & { id: number; name: string; type: string; hp: number; maxHp: number }) => `${e.id} ${e.name} (${e.type}) ${Math.round(e.hp)}/${Math.round(e.maxHp)} ${where(e)}`,
  decode: (text: string) => {
    const m = text.match(/^(\d+) (.*) \(([^()]*)\) (\d+)\/(\d+) (\d+) (\S+)$/);
    return m === null ? undefined : { uid: m[1] ?? "", name: m[2] ?? "", type: m[3] ?? "", hp: Number(m[4]), maxHp: Number(m[5]), dist: Number(m[6]), dir: m[7] ?? "" };
  },
};

/** Damage taken lately from one source: `enemy:aphid 12.5`. */
export const hurtCell = {
  encode: ([source, amount]: [string, number]) => `${source} ${amount}`,
  decode: (text: string): [string, number] => [text.replace(/\s+[\d.]+$/, ""), Number(text.match(/([\d.]+)$/)?.[1]) || 0],
};

/** Where a chest, food or spot is: `85 up-left`, with the spot's name before it. */
export const placeCell = { encode: where };

/** One change to what Tibo holds: `Peeler 3/8 to 7/8`, `Spud Lob 1/8 new (the game's description)` or `Peeler gone`. */
export type Change = { name: string; now?: string; before?: string; said?: string };
export const changeCell = {
  encode: (c: Change) => (c.now === undefined ? `${c.name} gone` : c.before === undefined ? `${c.name} ${c.now} new${c.said ?? ""}` : `${c.name} ${c.before} to ${c.now}`),
  /** Whether the change is a card gained or lost, or a jump of `jump` or more levels at once, which only a chest gives. */
  notable: (text: string, jump: number) => / new( \(.*\))?$| gone$/.test(text) || Number(text.match(/ to (\d+)\//)?.[1]) - Number(text.match(/ (\d+)\/\d+ to /)?.[1]) >= jump,
  /** Whether the change is an evolution arriving: an evolved weapon has one level. */
  evolution: (text: string) => / 1\/1 new/.test(text),
};
export const changesCell = { encode: (parts: string[]) => parts.join(", "), decode: (cell: string | undefined) => (cell ?? "").split(", ").filter(Boolean) };

/** What the action model made of a dash it was asked about: `dash asked: 62%, dashed`. */
export const dashCell = {
  encode: (score: number, dashed: boolean) => `dash asked: ${Math.round(score * 100)}%${dashed ? ", dashed" : ""}`,
  decode: (detail: string | undefined) => {
    const m = (detail ?? "").match(/(\d+)%(, dashed)?$/);
    return m === null ? undefined : { percent: Number(m[1]), dashed: m[2] !== undefined };
  },
};

/** A goal's id says what it is after: `C12` a chest, `P7` a spot, `F3` food, `E9` an elite, `explore left`, or the kind alone. */
export const goalCell = {
  encode: (g: { kind: string; uid?: number; dir?: string }) => (g.kind === "chest" ? `C${g.uid}` : g.kind === "poi" ? `P${g.uid}` : g.kind === "food" ? `F${g.uid}` : g.kind === "elite" ? `E${g.uid}` : g.kind === "explore" ? `explore ${g.dir}` : g.kind),
  kind: (id: string) => (/^C\d/.test(id) ? "chest" : /^P\d/.test(id) ? "spot" : /^F\d/.test(id) ? "food" : /^E\d/.test(id) ? "elite" : id.split(" ")[0] || "?"),
};

/** What a row's reason ends with when the model it names never answered and the bot went on without it. */
export const UNANSWERED = "did not answer in time";
