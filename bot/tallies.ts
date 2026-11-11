// What the game counted over a game, straight from its state: its `run` object, its `counters` and
// what shrines added (`loadout.shrineTotals`), under the game's own keys. A training game reports
// what changed between its start and its end; a full run reports the whole run.

/** The game's own tallies, taken from a snapshot's `game`. */
export type Tallies = { run: Record<string, unknown>; counters: Record<string, unknown>; shrineTotals: Record<string, unknown> };

export const talliesOf = (game: { run: unknown; counters: unknown; loadout: { shrineTotals: unknown } }): Tallies => ({
  run: game.run as Record<string, unknown>,
  counters: game.counters as Record<string, unknown>,
  shrineTotals: game.loadout.shrineTotals as Record<string, unknown>,
});

/** What changed between two tallies, with the game's keys: numbers by how much, lists by what is new, the rest when different. */
export type Totals = Record<string, unknown>;

export function changed(end: unknown, start: unknown): unknown {
  if (typeof end === "number") {
    const d = Math.round((end - (typeof start === "number" ? start : 0)) * 1000) / 1000;
    return d === 0 ? undefined : d;
  }
  if (Array.isArray(end)) {
    const before = new Set((Array.isArray(start) ? start : []).map((x) => JSON.stringify(x)));
    const added = end.filter((x) => !before.has(JSON.stringify(x)));
    return added.length === 0 ? undefined : added;
  }
  if (typeof end === "object" && end !== null) {
    const s = typeof start === "object" && start !== null ? (start as Record<string, unknown>) : {};
    const out = Object.fromEntries(
      Object.entries(end)
        .map(([k, v]) => [k, changed(v, s[k])] as const)
        .filter(([, v]) => v !== undefined),
    );
    return Object.keys(out).length === 0 ? undefined : out;
  }
  return end === start ? undefined : end;
}

/** What happened between two tallies; `start` undefined counts the whole game. */
export function totalsBetween(end: Tallies, start?: Tallies): Totals {
  return (changed(end, start) ?? {}) as Totals;
}

/** The stats as lines a coach reads: one line per part of the game's state, every key that changed. */
export function totalsLines(t: Totals): string[] {
  const flat = (v: unknown, at: string): string[] => {
    const shown = typeof v === "number" ? String(v) : JSON.stringify(v);
    if (typeof v !== "object" || v === null || Array.isArray(v)) return [at === "" ? shown : `${at} ${shown}`];
    return Object.entries(v).flatMap(([k, x]) => flat(x, at === "" ? k : `${at}.${k}`));
  };
  return Object.entries(t).flatMap(([part, v]) => {
    if (typeof v !== "object" || v === null || Array.isArray(v)) return [`${part}: ${flat(v, "").join("")}`];
    return Object.entries(v as Record<string, unknown>).map(([k, x]) => `${part}.${k}: ${flat(x, "").join(", ")}`);
  });
}
