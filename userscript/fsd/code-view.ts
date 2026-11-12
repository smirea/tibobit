import { css } from "./code-view.css";
import type { StateField } from "./driver-types";
import { addStyle, h } from "../panel/dom";

const KEYWORDS = new Set(["const", "let", "if", "else", "return", "function", "type", "export", "true", "false", "null", "undefined", "extends", "typeof", "in"]);

let styled = false;

export type CodeView = {
  el: HTMLElement;
  /** Shows the source. `why` lights the line that returns the action with that `why`, while the bot drives. */
  show(source: string, why?: string): void;
  /** The state field under an element of the view, if it is one: its path and its box. */
  fieldAt(target: EventTarget | null): { path: string; box: DOMRect } | undefined;
};

/**
 * TypeScript shown with its syntax coloured and nothing else done to it, so it paints at once.
 * Every read of the state is marked with the field it reads, for the popup to annotate with that
 * field's declared type and comment.
 */
export function codeView(fields: readonly StateField[], compact = false): CodeView {
  if (!styled) addStyle(css);
  styled = true;
  const known = new Set(fields.map((f) => f.path));
  const roots = [...new Set(fields.map((f) => f.path.split(".")[0] ?? ""))];
  // A read of the state: `state.tibo.hp`, or `tibo.hp` after the function took `tibo` out of it.
  const token = new RegExp(
    [
      "(\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\/)",
      "(\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|`(?:\\\\.|[^`\\\\])*`)",
      "\\b(\\d+(?:\\.\\d+)?)\\b",
      `(?<![.\\w])((?:state\\??\\.)?(?:${roots.join("|")})(?:\\??\\.[A-Za-z_]\\w*)*)(?![\\w:])`,
      "\\b([A-Za-z_]\\w*)\\b",
    ].join("|"),
    "g",
  );
  /** The longest part of a read that names a field: `pickups.find` reads `pickups`. */
  const fieldOf = (read: string): string | undefined => {
    const parts = read.replace(/\?/g, "").replace(/^state\./, "").split(".");
    while (parts.length > 0 && !known.has(parts.join("."))) parts.pop();
    return parts.length === 0 ? undefined : parts.join(".");
  };
  const paint = (line: string): (Node | string)[] => {
    const out: (Node | string)[] = [];
    let at = 0;
    for (const m of line.matchAll(token)) {
      if (m.index > at) out.push(line.slice(at, m.index));
      at = m.index + m[0].length;
      const [text, comment, string, number, read, word] = m;
      if (comment !== undefined) out.push(h("span", "tbh-code-comment", text));
      else if (string !== undefined) out.push(h("span", "tbh-code-string", text));
      else if (number !== undefined) out.push(h("span", "tbh-code-number", text));
      else if (read !== undefined) {
        const path = fieldOf(read);
        const el = h("span", path === undefined ? "" : "tbh-code-field", text);
        if (path !== undefined) el.dataset.path = path;
        out.push(el);
      } else if (word !== undefined && KEYWORDS.has(word)) out.push(h("span", "tbh-code-keyword", text));
      else if (word !== undefined && /^[A-Z]/.test(word)) out.push(h("span", "tbh-code-type", text));
      else out.push(text);
    }
    if (at < line.length) out.push(line.slice(at));
    return out;
  };

  /** What a line's returned `why` can be: its text, where a template's `${...}` stands for anything. */
  const whyOf = (line: string): RegExp | undefined => {
    const literal = /\bwhy:\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)/.exec(line)?.[1];
    if (literal === undefined) return undefined;
    const parts = literal.slice(1, -1).split(literal.startsWith("`") ? /\$\{[^}]*\}/ : /(?!)/);
    return new RegExp(`^${parts.map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`);
  };

  const el = h("pre", `tbh-code${compact ? " tbh-code-compact" : ""}`);
  let shown = "";
  let lines: { el: HTMLElement; returns: RegExp | undefined }[] = [];
  let lit = "";
  return {
    el,
    show(source, why) {
      if (source !== shown) {
        shown = source;
        lines = source.split("\n").map((line) => ({ el: h("span", "tbh-code-line", ...paint(line), "\n"), returns: whyOf(line) }));
        el.replaceChildren(...lines.map((l) => l.el));
        lit = "";
      }
      if ((why ?? "") === lit) return;
      lit = why ?? "";
      let first: HTMLElement | undefined;
      for (const line of lines) {
        const live = why !== undefined && line.returns?.test(why) === true;
        line.el.classList.toggle("tbh-code-live", live);
        if (live) first ??= line.el;
      }
      if (compact && first !== undefined) el.scrollTop = Math.max(0, first.offsetTop - el.clientHeight / 2);
    },
    fieldAt(target) {
      const field = target instanceof HTMLElement ? target.closest<HTMLElement>(".tbh-code-field") : null;
      const path = field?.dataset.path;
      return field === null || field === undefined || path === undefined || !el.contains(field) ? undefined : { path, box: field.getBoundingClientRect() };
    },
  };
}
