import { expect, test } from "bun:test";
import { type BeliefRow, checkEdits, upsert, promptLoss, stampBeliefs, checkLoopFiles, checkTemplates, DEFAULT_TEMPLATES, type Experiment, notesName, notesTemplates, parseCsv, parseExperiment, renderExperiment, renderNotes, type RunSetup, withReview, totalsBetween, totalsLines, LOCKSTEP_CRUTCH, splitPrompts, checkPromptPart, stateFromLog, wordsChanged, overdueAreas, hasFreshGames } from "./gameplay";

const setup: RunSetup = { started: new Date(2026, 10, 7, 15, 4, 9), difficulty: "nightmare", mode: "daily", surface: "headless", seed: "S1", planner: "jev", action: "jev", coach: "grok", bot: "abc1234" };

test("a notes file names the run and gives back the templates it played with", () => {
  const templates = { ...DEFAULT_TEMPLATES, planner: { ...DEFAULT_TEMPLATES.planner, state: "Rule one.\n\n{{state}}\n" }, action: { ...DEFAULT_TEMPLATES.action, dash: "" }, knobs: { ...DEFAULT_TEMPLATES.knobs, exploreDistance: 650 } };
  const text = renderNotes({ setup, plan: { source: "the playbook", intent: "Test E2.", templates, weapon: "" }, end: { lived: 754, ending: "died at 12:34", outcome: [] }, link: "none", log: "/tmp/x.csv", prompts: "coach-plan.md abc", picks: [], review: "(not reviewed yet)", started: "frozen-fries (random)", stats: "(no log rows)", key: "first chest listed never" });
  expect(notesName(setup, 754)).toBe("2026-11-07_15-04-09_lived-12-34_nightmare_daily_headless.md");
  expect(notesTemplates(text)).toEqual({ value: templates });
  const reviewed = withReview(text, "## Summary\n\nIt went fine.");
  expect(reviewed).toContain("## Summary\n\nIt went fine.");
  expect(reviewed).not.toContain("(not reviewed yet)");
  expect(notesTemplates(reviewed)).toEqual({ value: templates });
});

test("templates may only use the values their slot has, and must use the required ones", () => {
  const checked = checkTemplates({ planner: { goal: "Is {{move}} good?" }, knobs: { evadeSeconds: 99 } }, DEFAULT_TEMPLATES);
  expect(checked).toEqual({
    errors: [
      "planner.goal uses {{move}}, which it cannot: it may use time, difficulty, mode, health, level, gold, dash, weapons, passives, items, banished, recipes, evolutions, standing_on, hurt_by, bosses, enemies, current_goal, recent_goals, weapon_damage, state, goal",
      "planner.goal must use {{goal}}",
      "knobs.evadeSeconds must be a number from 2 to 30",
    ],
  });
});

test("an experiment file reads back as written", () => {
  const e: Experiment = { name: "boss-dodge", title: "Dodge the 2:00 boss", status: "running", area: "bosses", result: "", created: "L1.I2", updated: "L1.I3", hypothesis: "Evading for 12s beats 6s.", method: "Two arms from gym boss-2min.", findings: "", games: "### L1.I3 game 1\n\n- alive 120s" };
  expect(parseExperiment(renderExperiment(e), "boss-dodge")).toEqual(e);
});

test("a coach changes only the experiment fields it sends, and a new experiment needs a title, area and hypothesis", () => {
  const e: Experiment = { name: "boss-dodge", title: "t", status: "running", area: "bosses", result: "", created: "", updated: "", hypothesis: "h", method: "", findings: "", games: "" };
  expect(checkEdits({ experiments: [{ name: "boss-dodge", status: "done", result: "confirmed" }] }, { experiments: [e], beliefs: [] })).toEqual({ value: { experiments: [{ name: "boss-dodge", status: "done", result: "confirmed" }] } });
  expect(checkEdits({ experiments: [{ name: "Boss Dodge" }, { name: "new-one", status: "proposed" }] }, { experiments: [e], beliefs: [] })).toEqual({
    errors: ["experiments[0] (Boss Dodge).name must be kebab-case, such as boss-dodge-distance (it names experiment_<name>.md)", "experiments[1] (new-one) is new, so it needs title", "experiments[1] (new-one) is new, so it needs area", "experiments[1] (new-one) is new, so it needs hypothesis"],
  });
});

test("a belief keeps the run that wrote it, and takes the run that last changed it", () => {
  const held: BeliefRow = { id: "B1", about: "game", verdict: "bad", claim: "Hot oil hurts most.", confidence: "lead", status: "held", evidence: "run 1", experiments: "E1", created: "run-1", updated: "run-1" };
  const raised = { ...held, confidence: "likely", created: "", updated: "" };
  const fresh = { ...held, id: "B2", created: "made up", updated: "made up" };
  expect(stampBeliefs([{ ...held, updated: "" }, fresh], [held], "run-2")).toEqual([held, { ...fresh, created: "run-2", updated: "run-2" }]);
  expect(stampBeliefs([raised], [held], "run-2")).toEqual([{ ...raised, created: "run-1", updated: "run-2" }]);
});

test("the coach's rows replace the rows with their ids and the new ones go at the end", () => {
  const row = (id: string, claim: string) => ({ id, claim });
  expect(upsert([row("B1", "edited"), row("B3", "new")], [row("B1", "old"), row("B2", "kept")])).toEqual([row("B1", "edited"), row("B2", "kept"), row("B3", "new")]);
});

test("a coach may rewrite its prompt's sections but not drop one or most of the text", () => {
  const now = "# Coach\n\n## The long game\n\nPlay for the ladder.\n\n## Writing templates\n\nShort sentences.\n";
  expect(promptLoss(now, "# Coach\n\n## Seed class\n\nOnly this.\n", "coach-plan.md")).toBe("coach-plan.md must keep every ## section of the current one; it drops ## The long game, ## Writing templates. Rewrite a section's text instead, or leave the file out");
  expect(promptLoss(now, `${now}\n## Exploit runs\n\nNew section.\n`, "coach-plan.md")).toBeUndefined();
});

test("csv fields keep their commas and quotes", () => {
  expect(parseCsv('a,b\n"x, ""y""",z\n')).toEqual([
    ["a", "b"],
    ['x, "y"', "z"],
  ]);
});

test("the gameplay files in the repo are readable", async () => {
  await checkLoopFiles();
});

test("a training game's stats count only what happened during it", () => {
  const base = { kills: 10, damageTaken: { "enemy:aphid": 5 }, damageDealt: { peeler: 100 }, killsBy: { peeler: 10 }, goldEarned: 20, goldSpent: 0, bossesKilled: 0, elitesKilled: 0, bossChests: 0, cratesBought: 0, shrinesUsed: 0, itemsBought: 0, made: [], revivesUsed: 0, won: false };
  const end = { ...base, kills: 40, damageTaken: { "enemy:aphid": 12.5, "boss:amusing": 30 }, damageDealt: { peeler: 400, "spud-lob": 250 }, killsBy: { peeler: 25, "spud-lob": 15 }, goldEarned: 50, elitesKilled: 1, made: [{ id: "peel-storm", at: 95.5 }], killer: "boss:amusing" };
  const t = totalsBetween(end, base);
  expect(t).toMatchObject({ kills: 30, damageTaken: { "boss:amusing": 30, "enemy:aphid": 7.5 }, damageDealt: { peeler: 300, "spud-lob": 250 }, killsBy: { peeler: 15, "spud-lob": 15 }, goldEarned: 30, elitesKilled: 1, made: [{ id: "peel-storm", at: 95.5 }], killer: "boss:amusing" });
  expect(totalsLines(t)[0]).toBe("Damage taken 38, by source: boss:amusing 30, enemy:aphid 7.5; the killing blow: boss:amusing.");
});

test("lockstep cannot be turned on: it is a crutch", () => {
  expect(checkTemplates({ knobs: { lockstep: 1 } }, DEFAULT_TEMPLATES)).toEqual({ errors: [LOCKSTEP_CRUTCH] });
  expect(LOCKSTEP_CRUTCH).toContain("crutch and is not to be enabled");
});

test("coach.md splits into its three parts, and a rewritten part may not add a # heading", () => {
  const text = "# Experiments\n\n## The goal\n\nWin.\n\n# Full run\n\nPlay.\n\n# Reflect\n\nLook back.\n";
  expect(splitPrompts(text)).toEqual({ experiments: "# Experiments\n\n## The goal\n\nWin.", fullRun: "# Full run\n\nPlay.", reflect: "# Reflect\n\nLook back." });
  expect(checkPromptPart("fullRun", "Play harder.")).toEqual({ value: "# Full run\n\nPlay harder." });
  expect(checkPromptPart("fullRun", "# Full run\n\nPlay.\n\n# Notes\n\nx")).toEqual({ errors: ['prompts.fullRun may hold only its own # heading; use ## for sections, not "# Notes"'] });
});

test("the loop goes on from the coach log's last entry", () => {
  const entry = (tag: string, title: string) => `\n## ${tag}: ${title} (2026-11-08 10:00)\n\nText.\n`;
  expect(stateFromLog("")).toEqual({ loop: 1, iteration: 1 });
  expect(stateFromLog(entry("L4.I3", "experiments") + "\n## Note from the loop manager\n\nx\n")).toEqual({ loop: 4, iteration: 4 });
  expect(stateFromLog(entry("L4.I9", "no usable plan"))).toEqual({ loop: 4, iteration: 10 });
  expect(stateFromLog(entry("L4.I10", "rehearsal") + entry("L4.I10", "full run"))).toEqual({ loop: 4, iteration: 10 });
  expect(stateFromLog(entry("L4.I10", "reflection"))).toEqual({ loop: 5, iteration: 1 });
});

test("games a few words apart test wording, and different knobs are never wording", () => {
  const goal = (g: string) => ({ ...DEFAULT_TEMPLATES, planner: { ...DEFAULT_TEMPLATES.planner, goal: g } });
  const base = goal("If Tibo's next goal is to {{goal}}: is that the best thing to do now?");
  expect(wordsChanged(base, goal("If Tibo's next goal is to {{goal}}: is that the best move to make now?"))).toBe(2);
  expect(wordsChanged(base, { ...base, knobs: { ...base.knobs, evadeSeconds: 12 } })).toBeUndefined();
});

test("an area with no games this loop or the last is overdue, and fresh-start games are told apart", () => {
  const e = (name: string, area: Experiment["area"], games: string): Experiment => ({ name, title: name, status: "done", area, result: "confirmed", created: "", updated: "", hypothesis: "h", method: "", findings: "", games });
  const rows = [e("a", "build", "### L4.I2.G1: x\n\n- Start: a fresh game on Nightmare 2, seed 1"), e("b", "items", "### L2.I5.G3: y\n\n- Start: gym opening-nm2, seed 2")];
  expect(overdueAreas(rows, 4)).toEqual(["items", "economy", "bosses", "movement", "spots", "models"]);
  expect([hasFreshGames(rows[0] as Experiment), hasFreshGames(rows[1] as Experiment)]).toEqual([true, false]);
});
