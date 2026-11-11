// Full Self Driving as the popup edits it and this browser keeps it: the request the machine was
// built from, the machine, and the picker's loadout question.
import type { Drive } from "../../protocol/drive";
import { EXAMPLE_MACHINE, EXAMPLE_REQUEST, type Machine, machineErrors } from "../../protocol/machine";
import { loadoutErrors } from "../../bot/drive";
import { DEFAULT_TEMPLATES } from "../../bot/templates";

/** `builtFrom` is the prompt the machine was built from, to tell when the prompt has moved on. */
export type Draft = { prompt: string; machine: Machine; builtFrom: string; loadout: string };

export const DEFAULT_DRAFT: Draft = { prompt: EXAMPLE_REQUEST, machine: EXAMPLE_MACHINE, builtFrom: EXAMPLE_REQUEST, loadout: DEFAULT_TEMPLATES.planner.pick };

export type DraftCheck = {
  /** Present only when the loadout checks. */
  drive?: Drive;
  loadout: string[];
};

export function checkDraft(d: Draft): DraftCheck {
  const loadout = loadoutErrors(d.loadout);
  return loadout.length === 0 ? { loadout, drive: { machine: d.machine, loadout: d.loadout } } : { loadout };
}

const KEY = "tibobit.fsd";

/** The draft this browser kept, or the starting one; anything unreadable, a machine that no longer checks included, starts over. */
export function loadDraft(): Draft {
  try {
    const d = JSON.parse(localStorage.getItem(KEY) ?? "null") as Partial<Draft> | null;
    if (d === null || typeof d.prompt !== "string" || typeof d.loadout !== "string" || typeof d.builtFrom !== "string" || machineErrors(d.machine).length > 0) return DEFAULT_DRAFT;
    return { prompt: d.prompt, machine: d.machine as Machine, builtFrom: d.builtFrom, loadout: d.loadout };
  } catch {
    return DEFAULT_DRAFT;
  }
}

export function saveDraft(d: Draft) {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {}
}
