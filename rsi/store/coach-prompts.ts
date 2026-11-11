/**
 * Why a new coach prompt would lose what the current one holds, if it would. Composer once replaced
 * the whole plan prompt with a note about one experiment; a section can be rewritten but not dropped.
 */
import type { Checked } from "../../protocol/parse";
import { COACH_MD } from "./paths";

export function promptLoss(now: string, next: string, file: string): string | undefined {
  const headings = (t: string) => [...t.matchAll(/^## .+$/gm)].map((m) => m[0].trim());
  const dropped = headings(now).filter((h) => !headings(next).includes(h));
  if (dropped.length > 0) return `${file} must keep every ## section of the current one; it drops ${dropped.join(", ")}. Rewrite a section's text instead, or leave the file out`;
  if (next.length < now.length / 2) return `${file} would shrink from ${now.length} to ${next.length} characters; it must keep at least half of what is there`;
  return undefined;
}

// coach.md holds the coach's three prompts, each a part under its own # heading; the coach rewrites
// one part at a time.

export const PROMPT_TITLES = { experiments: "Experiments", fullRun: "Full run", reflect: "Reflect" } as const;

export type PromptKey = keyof typeof PROMPT_TITLES;

const PROMPT_KEYS = Object.keys(PROMPT_TITLES) as PromptKey[];

export function splitPrompts(text: string): Record<PromptKey, string> {
  const parts = text.split(/^(?=# )/m).map((p) => p.trim()).filter(Boolean);
  const out = {} as Record<PromptKey, string>;
  for (const key of PROMPT_KEYS) {
    const part = parts.find((p) => p.split("\n")[0] === `# ${PROMPT_TITLES[key]}`);
    if (part === undefined) throw new Error(`coach.md has no "# ${PROMPT_TITLES[key]}" part`);
    out[key] = part;
  }
  return out;
}

export const readPrompts = async () => splitPrompts(await Bun.file(COACH_MD).text());

export async function writePrompts(prompts: Record<PromptKey, string>) {
  await Bun.write(COACH_MD, `${PROMPT_KEYS.map((k) => prompts[k].trim()).join("\n\n")}\n`);
}

/** A rewritten part: it keeps its # heading and adds no other, so coach.md still splits into its three parts. */
export function checkPromptPart(key: PromptKey, text: string): Checked<string> {
  const heading = `# ${PROMPT_TITLES[key]}`;
  const body = text.trim().startsWith(heading) ? text.trim() : `${heading}\n\n${text.trim()}`;
  const other = body.split("\n").slice(1).find((l) => /^# /.test(l));
  return other === undefined ? { value: body } : { errors: [`prompts.${key} may hold only its own # heading; use ## for sections, not "${other}"`] };
}
