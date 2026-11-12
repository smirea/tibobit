/** One field of the state the function is called with: its path, its declared type and what its comment says. */
export type StateField = { path: string; type: string; about: string };

/**
 * Every field of `State` in protocol/driver.ts, read from that file's own text, so the popup's
 * annotations are the declarations and comments the function is compiled against.
 */
export function stateFields(types: string): StateField[] {
  const lines = types.split("\n");
  const start = lines.findIndex((l) => l.startsWith("export type State = {"));
  if (start < 0) throw new Error("protocol/driver.ts declares no State");
  const fields: StateField[] = [];
  const parents: string[] = [];
  let about: string[] = [];
  for (const raw of lines.slice(start + 1)) {
    const line = raw.trim();
    if (raw.startsWith("};")) break;
    if (line.startsWith("/**") || line.startsWith("*")) {
      const text = line.replace(/^\/\*\*\s?|^\*\/$|^\*\s?|\s?\*\/$/g, "").trim();
      if (text !== "") about.push(text);
      continue;
    }
    if (line.startsWith("}")) {
      parents.pop();
      continue;
    }
    const member = /^(\w+)\??: (.*?);?$/.exec(line);
    if (member === null) continue;
    const [, name = "", type = ""] = member;
    const nested = type === "{";
    fields.push({ path: [...parents, name].join("."), type: nested ? "object" : type, about: about.join(" ") });
    about = [];
    if (nested) parents.push(name);
  }
  return fields;
}
