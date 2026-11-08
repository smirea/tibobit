import { expect, test } from "bun:test";
import { type BeliefRow, checkEdits, merge, stampBeliefs, checkLoopFiles, checkTemplates, DEFAULT_TEMPLATES, type ExperimentRow, notesName, notesTemplates, notesTesting, parseCsv, readExperiments, renderNotes, type RunSetup, withReview } from "./gameplay";

const setup: RunSetup = { started: new Date(2026, 10, 7, 15, 4, 9), difficulty: "nightmare", mode: "daily", surface: "headless", seed: "S1", planner: "jev", action: "jev", coach: "grok", bot: "abc1234" };

test("a notes file names the run and gives back the templates it played with", () => {
  const templates = { ...DEFAULT_TEMPLATES, planner: { ...DEFAULT_TEMPLATES.planner, state: "Rule one.\n\n{{state}}\n" }, action: { ...DEFAULT_TEMPLATES.action, dash: "" }, knobs: { ...DEFAULT_TEMPLATES.knobs, exploreDistance: 650 } };
  const text = renderNotes({ setup, plan: { source: "coach-plan.md", intent: "Test E2.", testing: ["E2", "E5"], templates, weapon: "" }, end: { lived: 754, ending: "died at 12:34", outcome: [] }, link: "none", log: "/tmp/x.csv", prompts: "coach-plan.md abc", picks: [], review: "(not reviewed yet)", started: "frozen-fries (random)", stats: "(no log rows)", key: "first chest listed never" });
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
  const row: ExperimentRow = { id: "E1", created: "2026-11-07", status: "proposed", area: "movement", hypothesis: "h", test: "t", runs: "", outcome: "", result: "", learnings: "" };
  expect(checkEdits({ experiments: [{ ...row, id: "E2" }] }, { experiments: [row], beliefs: [] })).toEqual({ errors: ["experiments E1 is missing: rows are never deleted, set status retired instead"] });
  expect(checkEdits({ experiments: [{ ...row, status: "retired" }] }, { experiments: [row], beliefs: [] })).toEqual({ value: { experiments: [{ ...row, status: "retired" }] } });
});

test("a belief keeps the run that wrote it, and takes the run that last changed it", () => {
  const held: BeliefRow = { id: "B1", about: "game", claim: "Hot oil hurts most.", confidence: "lead", status: "held", evidence: "run 1", experiments: "E1", created: "run-1", updated: "run-1" };
  const raised = { ...held, confidence: "likely", created: "", updated: "" };
  const fresh = { ...held, id: "B2", created: "made up", updated: "made up" };
  expect(stampBeliefs([{ ...held, updated: "" }, fresh], [held], "run-2")).toEqual([held, { ...fresh, created: "run-2", updated: "run-2" }]);
  expect(stampBeliefs([raised], [held], "run-2")).toEqual([{ ...raised, created: "run-1", updated: "run-2" }]);
});

test("a coach's table keeps rows another coach added meanwhile, and its new id moves past theirs", () => {
  const row = (id: string, hypothesis: string) => ({ id, hypothesis });
  const before = [row("E1", "shared")];
  const now = [row("E1", "shared"), row("E2", "the other coach's")];
  const renamed = new Map<string, string>();
  expect(merge([row("E1", "edited"), row("E2", "mine")], now, before, renamed)).toEqual([row("E1", "edited"), row("E3", "mine"), row("E2", "the other coach's")]);
  expect(renamed).toEqual(new Map([["E2", "E3"]]));
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
