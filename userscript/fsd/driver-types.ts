/** One field of the state the function is called with: its path, its declared type and what its comment says. */
export type StateField = { path: string; type: string; about: string };

const isComment = (line: string) => /^\s*(\/\*\*|\*|\/\/)/.test(line);

/** An object type's members as a block, without their comments, indented two spaces. */
function block(members: readonly string[]): string {
  const kept = members.filter((l) => !isComment(l) && l.trim() !== "");
  const indent = Math.min(...kept.map((l) => /^ */.exec(l)?.[0].length ?? 0));
  return ["{", ...kept.map((l) => `  ${l.slice(indent)}`), "}"].join("\n");
}

/**
 * Every field of `State` in protocol/driver.ts, read from that file's own text, so the popup's
 * annotations are the declarations and comments the function is compiled against. A nested
 * object's type is its whole block.
 */
export function stateFields(types: string): StateField[] {
  const lines = types.split("\n");
  const start = lines.findIndex((l) => l.startsWith("export type State = {"));
  if (start < 0) throw new Error("protocol/driver.ts declares no State");
  const fields: StateField[] = [];
  const open: { field: StateField; from: number }[] = [];
  let about: string[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    const raw = lines[i] ?? "";
    const line = raw.trim();
    if (raw.startsWith("};")) break;
    if (isComment(raw)) {
      const text = line.replace(/^\/\*\*\s?|^\*\/$|^\*\s?|\s?\*\/$/g, "").trim();
      if (text !== "") about.push(text);
      continue;
    }
    if (line.startsWith("}")) {
      const closed = open.pop();
      if (closed !== undefined) closed.field.type = block(lines.slice(closed.from + 1, i));
      continue;
    }
    const member = /^(\w+)\??: (.*?);?$/.exec(line);
    if (member === null) continue;
    const [, name = "", type = ""] = member;
    const field = { path: [...open.map((o) => o.field.path.split(".").at(-1)), name].join("."), type, about: about.join(" ") };
    fields.push(field);
    about = [];
    if (type === "{") open.push({ field, from: i });
  }
  return fields;
}

/** Every type protocol/driver.ts declares, by name, as written there with its comments. */
export function typeDeclarations(types: string): Map<string, string> {
  const lines = types.split("\n");
  const out = new Map<string, string>();
  for (let i = 0; i < lines.length; i++) {
    const name = /^export type (\w+)\b/.exec(lines[i] ?? "")?.[1];
    if (name === undefined) continue;
    let from = i;
    while (from > 0 && isComment(lines[from - 1] ?? "")) from--;
    // A declaration ends on the first `;` outside its braces and parentheses.
    let to = i;
    for (let depth = 0; to < lines.length; to++) {
      const line = isComment(lines[to] ?? "") ? "" : (lines[to] ?? "");
      depth += (line.match(/[{(]/g) ?? []).length - (line.match(/[})]/g) ?? []).length;
      if (depth === 0 && /;\s*$/.test(line)) break;
    }
    out.set(name, lines.slice(from, to + 1).join("\n").replace(/^export /m, ""));
  }
  return out;
}
