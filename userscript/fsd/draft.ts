// The Full Self Driving instructions as the popup edits them: kept in this browser as typed, blank
// and out-of-order times included, and turned into a Drive the bot can play only once they all check.
import { type Drive, PLAN_EVERY } from "../../protocol/drive";
import { driveErrors } from "../../bot/drive";
import { DEFAULT_TEMPLATES } from "../../bot/templates";
import { clock } from "../../clock";

export type DraftStep = { id: number; time: string; text: string };
export type Draft = { prompt: string; loadout: string; planEvery: number; steps: DraftStep[] };

export const DEFAULT_DRAFT: Draft = {
  prompt: DEFAULT_TEMPLATES.planner.state,
  loadout: DEFAULT_TEMPLATES.planner.pick,
  planEvery: PLAN_EVERY.initial,
  steps: [{ id: 1, time: "0:00", text: "" }],
};

/** Seconds from "m:ss", or from whole minutes ("5" is 5:00); undefined for anything else. */
export function parseTime(text: string): number | undefined {
  const t = text.trim();
  const m = /^(\d{1,3})(?::([0-5]\d))?$/.exec(t);
  if (m === null) return undefined;
  return Number(m[1]) * 60 + Number(m[2] ?? 0);
}

export type DraftCheck = {
  /** Present only when nothing below is wrong. */
  drive?: Drive;
  prompt: string[];
  loadout: string[];
  /** By step id. */
  steps: Map<number, string[]>;
};

export function checkDraft(d: Draft): DraftCheck {
  const steps = new Map<number, string[]>(d.steps.map((s) => [s.id, []]));
  const note = (id: number | undefined, message: string) => id !== undefined && steps.get(id)?.push(message);
  let last = 0;
  const ats = d.steps.map((s, i) => {
    if (i === 0) return 0;
    const at = parseTime(s.time);
    if (s.time.trim() === "") note(s.id, "Set a time for these instructions");
    else if (at === undefined) note(s.id, "Write the time as m:ss, such as 2:30");
    else if (at <= last) note(s.id, `Must come after ${clock(last)}`);
    else last = at;
    return at ?? 0;
  });
  const drive: Drive = { prompt: d.prompt, loadout: d.loadout, planEvery: d.planEvery, steps: d.steps.map((s, i) => ({ at: ats[i] ?? 0, text: s.text })) };
  const check: DraftCheck = { prompt: [], loadout: [], steps };
  for (const e of driveErrors(drive)) {
    if (e.field === "prompt" || e.field === "loadout") check[e.field].push(e.message);
    else note(d.steps[e.field]?.id, e.message);
  }
  const clean = check.prompt.length === 0 && check.loadout.length === 0 && [...steps.values()].every((m) => m.length === 0);
  return clean ? { ...check, drive } : check;
}

/**
 * The steps with one moved from `from` to `to`. The first step is always at 0:00. A step whose time no
 * longer falls between its neighbours' is left blank for the person to fill in, as is the step that
 * was first, whose 0:00 now comes after another.
 */
export function moveStep(steps: readonly DraftStep[], from: number, to: number): DraftStep[] {
  const moved = steps[from];
  if (moved === undefined || from === to) return [...steps];
  const wasFirst = steps[0]?.id;
  const next = steps.filter((_, i) => i !== from);
  next.splice(to, 0, moved);
  const times = next.map((s, i) => (i === 0 ? 0 : s.id === moved.id || s.id === wasFirst ? undefined : parseTime(s.time)));
  return next.map((s, i) => {
    if (i === 0) return { ...s, time: "0:00" };
    if (s.id !== moved.id && s.id !== wasFirst) return s;
    const before = times.slice(0, i).filter((t) => t !== undefined).at(-1) ?? 0;
    const after = times.slice(i + 1).find((t) => t !== undefined);
    const at = parseTime(s.time);
    return at !== undefined && at > before && (after === undefined || at < after) ? s : { ...s, time: "" };
  });
}

/** A new step a minute after the last time set. */
export function addStep(steps: readonly DraftStep[]): DraftStep[] {
  const last = Math.max(0, ...steps.map((s) => parseTime(s.time) ?? 0));
  return [...steps, { id: Math.max(0, ...steps.map((s) => s.id)) + 1, time: clock(last + 60), text: "" }];
}

const KEY = "tibobit.fsd";

/** The draft this browser kept, or the starting one; anything unreadable starts over. */
export function loadDraft(): Draft {
  try {
    const d = JSON.parse(localStorage.getItem(KEY) ?? "null") as Partial<Draft> | null;
    if (d === null || typeof d.prompt !== "string" || typeof d.loadout !== "string" || typeof d.planEvery !== "number" || !Array.isArray(d.steps) || d.steps.length === 0) return DEFAULT_DRAFT;
    const steps = d.steps.filter((s): s is DraftStep => typeof s?.id === "number" && typeof s.time === "string" && typeof s.text === "string");
    if (steps.length === 0) return DEFAULT_DRAFT;
    const planEvery = Math.min(PLAN_EVERY.max, Math.max(PLAN_EVERY.min, Math.round(d.planEvery)));
    return { prompt: d.prompt, loadout: d.loadout, planEvery, steps: steps.map((s, i) => (i === 0 ? { ...s, time: "0:00" } : s)) };
  } catch {
    return DEFAULT_DRAFT;
  }
}

export function saveDraft(d: Draft) {
  try {
    localStorage.setItem(KEY, JSON.stringify(d));
  } catch {}
}
