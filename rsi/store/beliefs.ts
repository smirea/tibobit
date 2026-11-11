// What the loop holds true right now, about the game or about how the models behave, and whether
// it is good (worth doing), bad (worth avoiding) or a plain fact. Experiments are questions;
// beliefs are the answers that survived them, kept so a rewritten prompt cannot quietly drop one.
import { BELIEFS_CSV } from "./paths";
import { type CsvTable, readTable } from "./tables";

export const BELIEF_COLUMNS = ["id", "about", "verdict", "claim", "confidence", "status", "evidence", "experiments", "created", "updated"] as const;

export type BeliefRow = Record<(typeof BELIEF_COLUMNS)[number], string>;

export const BELIEFS: CsvTable<typeof BELIEF_COLUMNS> = {
  name: "beliefs",
  columns: BELIEF_COLUMNS,
  required: ["id", "claim", "evidence"],
  enums: { about: ["game", "planner", "action", "coach"], verdict: ["good", "bad", "fact"], confidence: ["lead", "likely", "confirmed"], status: ["held", "recheck", "disproved"] },
  stamps: ["created", "updated"],
};

export const readBeliefs = () => readTable(BELIEFS_CSV, BELIEF_COLUMNS);

/** A belief keeps the run it was first written in, and gets the current run whenever the coach changes it. */
export function stampBeliefs(rows: BeliefRow[], before: BeliefRow[], run: string): BeliefRow[] {
  const same = (a: BeliefRow, b: BeliefRow) => BELIEF_COLUMNS.every((c) => BELIEFS.stamps.includes(c) || a[c] === b[c]);
  return rows.map((row) => {
    const old = before.find((b) => b.id === row.id);
    return { ...row, created: old?.created ?? run, updated: old !== undefined && same(old, row) ? old.updated : run };
  });
}
