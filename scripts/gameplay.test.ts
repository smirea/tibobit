import { expect, test } from "bun:test";
import { checkEdits, checkLoopFiles, checkTemplates, DEFAULT_TEMPLATES, type ExperimentRow, notesName, notesTemplates, notesTesting, parseCsv, readExperiments, renderNotes, type RunSetup, withReview } from "./gameplay";

const setup: RunSetup = { started: new Date(2026, 10, 7, 15, 4, 9), difficulty: "nightmare", mode: "daily", surface: "headless", seed: "S1", planner: "jev", action: "jev", coach: "grok" };

test("a notes file names the run and gives back the templates it played with", () => {
  const templates = { ...DEFAULT_TEMPLATES, planner: { ...DEFAULT_TEMPLATES.planner, state: "Rule one.\n\n{{state}}\n" }, action: { ...DEFAULT_TEMPLATES.action, dash: "" }, knobs: { ...DEFAULT_TEMPLATES.knobs, exploreDistance: 650 } };
  const text = renderNotes({ setup, plan: { source: "coach-plan.md", intent: "Test E2.", testing: ["E2", "E5"], templates }, end: { lived: 754, ending: "died at 12:34", outcome: [] }, link: "none", log: "/tmp/x.csv", prompts: "coach-plan.md abc", picks: [], review: "(not reviewed yet)" });
  expect(notesName(setup, 754)).toBe("2026-11-07_15-04-09_lived-12-34_nightmare_daily_headless.md");
  expect(notesTemplates(text)).toEqual({ value: templates });
  expect(notesTesting(text)).toEqual(["E2", "E5"]);
  const reviewed = withReview(text, "## Summary\n\nIt went fine.");
  expect(reviewed).toContain("## Summary\n\nIt went fine.");
  expect(reviewed).not.toContain("(not reviewed yet)");
  expect(notesTemplates(reviewed)).toEqual({ value: templates });
});

test("templates may only use the values their slot has, and must use the required ones", () => {
  const checked = checkTemplates({ planner: { goal: "Is {{move}} good?" }, knobs: { evadeSeconds: 99 } }, DEFAULT_TEMPLATES);
  expect(checked).toEqual({
    errors: [
      "planner.goal uses {{move}}, which it cannot: it may use time, difficulty, mode, health, level, gold, dash, weapons, passives, items, banished, recipes, evolutions, standing_on, hurt_by, bosses, enemies, current_goal, recent_goals, state, goal",
      "planner.goal must use {{goal}}",
      "knobs.evadeSeconds must be a number from 2 to 30",
    ],
  });
});

test("the coach may retire an experiment but not delete it", () => {
  const row: ExperimentRow = { id: "E1", created: "2026-11-07", status: "proposed", hypothesis: "h", test: "t", runs: "", outcome: "", result: "", learnings: "" };
  expect(checkEdits({ experiments: [{ ...row, id: "E2" }] }, [row])).toEqual({ errors: ["experiment E1 is missing: rows are never deleted, set status retired instead"] });
  expect(checkEdits({ experiments: [{ ...row, status: "retired" }] }, [row])).toEqual({ value: { experiments: [{ ...row, status: "retired" }] } });
});

test("csv fields keep their commas and quotes", () => {
  expect(parseCsv('a,b\n"x, ""y""",z\n')).toEqual([
    ["a", "b"],
    ['x, "y"', "z"],
  ]);
});

test("the gameplay files in the repo are readable", async () => {
  await checkLoopFiles();
  expect((await readExperiments()).length).toBeGreaterThan(0);
});
