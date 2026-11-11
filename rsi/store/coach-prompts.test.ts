import { expect, test } from "bun:test";
import { checkPromptPart, promptLoss, splitPrompts } from "./coach-prompts";

test("a coach may rewrite its prompt's sections but not drop one or most of the text", () => {
  const now = "# Coach\n\n## The long game\n\nPlay for the ladder.\n\n## Writing templates\n\nShort sentences.\n";
  expect(promptLoss(now, "# Coach\n\n## Seed class\n\nOnly this.\n", "coach-plan.md")).toBe("coach-plan.md must keep every ## section of the current one; it drops ## The long game, ## Writing templates. Rewrite a section's text instead, or leave the file out");
  expect(promptLoss(now, `${now}\n## Exploit runs\n\nNew section.\n`, "coach-plan.md")).toBeUndefined();
});

test("coach.md splits into its three parts, and a rewritten part may not add a # heading", () => {
  const text = "# Experiments\n\n## The goal\n\nWin.\n\n# Full run\n\nPlay.\n\n# Reflect\n\nLook back.\n";
  expect(splitPrompts(text)).toEqual({ experiments: "# Experiments\n\n## The goal\n\nWin.", fullRun: "# Full run\n\nPlay.", reflect: "# Reflect\n\nLook back." });
  expect(checkPromptPart("fullRun", "Play harder.")).toEqual({ value: "# Full run\n\nPlay harder." });
  expect(checkPromptPart("fullRun", "# Full run\n\nPlay.\n\n# Notes\n\nx")).toEqual({ errors: ['prompts.fullRun may hold only its own # heading; use ## for sections, not "# Notes"'] });
});
