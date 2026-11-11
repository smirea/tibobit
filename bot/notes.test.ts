import { expect, test } from "bun:test";
import { DEFAULT_TEMPLATES } from "./templates";
import { notesName, notesTemplates, renderNotes, type RunSetup, withReview } from "./notes";

const setup: RunSetup = { started: new Date(2026, 10, 7, 15, 4, 9), difficulty: "nightmare", mode: "daily", surface: "headless", seed: "S1", planner: "jev", action: "jev", coach: "grok", bot: "abc1234" };

test("a notes file names the run and gives back the templates it played with", () => {
  const templates = { ...DEFAULT_TEMPLATES, planner: { ...DEFAULT_TEMPLATES.planner, state: "Rule one.\n\n{{state}}\n" }, action: { ...DEFAULT_TEMPLATES.action, dash: "" }, knobs: { ...DEFAULT_TEMPLATES.knobs, exploreDistance: 650 } };
  const text = renderNotes({ setup, plan: { source: "the playbook", intent: "Test E2.", templates, weapon: "" }, end: { lived: 754, ending: "died at 12:34", outcome: [] }, link: "none", log: "/tmp/x.csv", picks: [], review: "(not reviewed yet)", started: "frozen-fries (random)", stats: "(no log rows)", key: "first chest listed never" });
  expect(notesName(setup, 754)).toBe("2026-11-07_15-04-09_lived-12-34_nightmare_daily_headless.md");
  expect(notesTemplates(text)).toEqual({ value: templates });
  const reviewed = withReview(text, "## Summary\n\nIt went fine.");
  expect(reviewed).toContain("## Summary\n\nIt went fine.");
  expect(reviewed).not.toContain("(not reviewed yet)");
  expect(notesTemplates(reviewed)).toEqual({ value: templates });
});
