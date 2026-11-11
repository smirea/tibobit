/**
 * The JSON object in a coach's reply: a fenced json block if there is one, else the first span
 * from a "{" to the last "}" that parses. A coach sometimes writes prose or a fence around it.
 */
export function jsonObject(text: string): Record<string, unknown> | undefined {
  const fenced = [...text.matchAll(/```(?:json)?\s*\n([\s\S]*?)\n```/g)].map((m) => m[1] ?? "");
  const end = text.lastIndexOf("}");
  const spans = [...fenced, ...[...text.matchAll(/\{/g)].map((m) => text.slice(m.index, end + 1))];
  for (const span of spans) {
    try {
      const v = JSON.parse(span) as unknown;
      if (typeof v === "object" && v !== null && !Array.isArray(v)) return v as Record<string, unknown>;
    } catch {}
  }
  return undefined;
}
