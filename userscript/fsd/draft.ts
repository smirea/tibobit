// Full Self Driving as the popup edits it and this browser keeps it: the request the function was
// written from, the function, and the picker's loadout question.
import { type Drive, EXAMPLE_CODE, EXAMPLE_REQUEST } from "../../protocol/drive";
import { loadoutErrors } from "../../bot/drive";
import { DEFAULT_TEMPLATES } from "../../bot/templates";

/** `builtFrom` is the prompt the function was written from, to tell when the prompt has moved on. */
export type Draft = { prompt: string; code: string; builtFrom: string; loadout: string };

export const DEFAULT_DRAFT: Draft = { prompt: EXAMPLE_REQUEST, code: EXAMPLE_CODE, builtFrom: EXAMPLE_REQUEST, loadout: DEFAULT_TEMPLATES.planner.pick };

export type DraftCheck = {
  /** Present only when the loadout checks. */
  drive?: Drive;
  loadout: string[];
};

export function checkDraft(d: Draft): DraftCheck {
  const loadout = loadoutErrors(d.loadout);
  return loadout.length === 0 ? { loadout, drive: { code: d.code, loadout: d.loadout } } : { loadout };
}

const KEY = "tibobit.fsd";

/** The draft this browser kept, or the starting one; anything unreadable starts over. Whether kept code still type-checks is the agent server's to say. */
export function loadDraft(): Draft {
  try {
    const d = JSON.parse(localStorage.getItem(KEY) ?? "null") as Partial<Draft> | null;
    if (d === null || typeof d.prompt !== "string" || typeof d.loadout !== "string" || typeof d.builtFrom !== "string" || typeof d.code !== "string" || d.code.trim() === "") return DEFAULT_DRAFT;
    return { prompt: d.prompt, code: d.code, builtFrom: d.builtFrom, loadout: d.loadout };
  } catch {
    return DEFAULT_DRAFT;
  }
}

export function saveDraft(d: Draft) {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {}
}
