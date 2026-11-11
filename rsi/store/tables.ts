import { isText } from "../../protocol/parse";
import { csvField, parseCsv } from "../../csv";

export async function readTable<C extends readonly string[]>(file: string, columns: C): Promise<Record<C[number], string>[]> {
  const [header, ...rows] = parseCsv(await Bun.file(file).text());
  if (header?.join(",") !== columns.join(",")) throw new Error(`${file} must start with the header ${columns.join(",")}`);
  return rows.map((r, i) => {
    if (r.length !== columns.length) throw new Error(`${file} row ${i + 2} has ${r.length} fields, not ${columns.length}`);
    return Object.fromEntries(columns.map((c, j) => [c, r[j] ?? ""])) as Record<C[number], string>;
  });
}

export async function writeTable<C extends readonly string[]>(file: string, columns: C, rows: Record<C[number], string>[]) {
  await Bun.write(file, [columns.join(","), ...rows.map((r) => columns.map((c) => csvField(r[c as C[number]])).join(","))].join("\n") + "\n");
}

/**
 * A table the coach rewrites whole. Its rows are never deleted, so nothing the loop learned is
 * lost; `stamps` are columns the loop fills, never the coach.
 */
export type CsvTable<C extends readonly string[]> = {
  name: string;
  columns: C;
  required: C[number][];
  enums: Partial<Record<C[number], readonly string[]>>;
  stamps: C[number][];
};

export function checkTable<C extends readonly string[]>(raw: unknown, table: CsvTable<C>, before: Record<C[number], string>[], errors: string[]): Record<C[number], string>[] | undefined {
  if (raw === undefined) return undefined;
  if (!Array.isArray(raw)) {
    errors.push(`${table.name} must be an array of the rows to add or change`);
    return undefined;
  }
  const columns = table.columns as readonly C[number][];
  const rows: Record<C[number], string>[] = [];
  for (const [i, r] of raw.entries()) {
    if (typeof r !== "object" || r === null) {
      errors.push(`${table.name}[${i}] must be an object`);
      continue;
    }
    const o = r as Record<string, unknown>;
    for (const k of Object.keys(o)) if (!(columns as readonly string[]).includes(k)) errors.push(`${table.name}[${i}].${k} is not a column; the columns are ${columns.join(", ")}`);
    // A row with an id the table has updates it, and the keys it leaves out keep their values.
    const old = before.find((b) => b[columns[0] as C[number]] === String(o[columns[0] as string] ?? ""));
    const row = Object.fromEntries(columns.map((c) => [c, o[c] === undefined || o[c] === null ? (old?.[c] ?? "") : String(o[c])])) as Record<C[number], string>;
    const id = row[columns[0] as C[number]] || `[${i}]`;
    for (const c of table.required) if (!isText(row[c])) errors.push(`${table.name} ${id} has no ${c}`);
    for (const [c, allowed] of Object.entries(table.enums) as [C[number], readonly string[]][])
      if (!allowed.includes(row[c])) errors.push(`${table.name} ${id} ${c} must be ${allowed.includes("") ? "empty or " : ""}one of ${allowed.filter(Boolean).join(", ")}`);
    rows.push(row);
  }
  const ids = rows.map((r) => r[columns[0] as C[number]]);
  for (const id of new Set(ids.filter((id, i) => ids.indexOf(id) !== i))) errors.push(`${table.name} id ${id} is used twice`);
  return rows;
}
