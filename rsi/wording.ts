import { SLOTS, slotText, type Templates, type TemplateSlot } from "../bot/templates";

export function wordDistance(a: string[], b: string[]): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    for (let j = 1; j <= b.length; j++) row[j] = Math.min((prev[j] ?? 0) + 1, (row[j - 1] ?? 0) + 1, (prev[j - 1] ?? 0) + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = row;
  }
  return prev[b.length] ?? 0;
}

/** Words added, removed or replaced between two sets of templates, over every slot; undefined when their knobs differ. */
export function wordsChanged(a: Templates, b: Templates): number | undefined {
  if (JSON.stringify(a.knobs) !== JSON.stringify(b.knobs)) return undefined;
  const words = (t: string) => t.toLowerCase().match(/[\w{}%.'-]+/g) ?? [];
  return (Object.keys(SLOTS) as TemplateSlot[]).reduce((n, slot) => n + wordDistance(words(slotText(a, slot)), words(slotText(b, slot))), 0);
}

/** At most this many words apart, with the same knobs, two games test wording, not play. */
export const WORDING_ONLY = 6;
