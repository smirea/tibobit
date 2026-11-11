import { expect, test } from "bun:test";
import { addStep, checkDraft, type Draft, moveStep, parseTime } from "./draft";

const steps = [
  { id: 1, time: "0:00", text: "farm" },
  { id: 2, time: "1:00", text: "loot" },
  { id: 3, time: "2:00", text: "boss" },
  { id: 4, time: "3:00", text: "run" },
];
const draft = (over: Partial<Draft> = {}): Draft => ({ prompt: "Play well. {{health}}", loadout: "Pick for {{choice}}", planEvery: 10, steps, ...over });

test("times read as m:ss or whole minutes", () => {
  expect([parseTime("2:30"), parseTime("5"), parseTime(" 0:05 "), parseTime("2:75"), parseTime("abc"), parseTime("")]).toEqual([150, 300, 5, undefined, undefined, undefined]);
});

test("a step dragged out of order loses its time, and the rest keep theirs", () => {
  expect(moveStep(steps, 3, 1).map((s) => `${s.id}@${s.time}`)).toEqual(["1@0:00", "4@", "2@1:00", "3@2:00"]);
});

test("a step dragged to where its time still fits keeps it", () => {
  const spaced = [steps[0], { id: 2, time: "1:00", text: "" }, { id: 3, time: "5:00", text: "" }, { id: 4, time: "2:00", text: "" }].filter((s) => s !== undefined);
  expect(moveStep(spaced, 3, 2).map((s) => `${s.id}@${s.time}`)).toEqual(["1@0:00", "2@1:00", "4@2:00", "3@5:00"]);
});

test("a step dragged to the top starts at 0:00 and the old first goes blank", () => {
  expect(moveStep(steps, 2, 0).map((s) => `${s.id}@${s.time}`)).toEqual(["3@0:00", "1@", "2@1:00", "4@3:00"]);
});

test("blank and out-of-order times keep the draft from becoming a drive", () => {
  const check = checkDraft(draft({ steps: moveStep(steps, 3, 1) }));
  expect(check.drive).toBeUndefined();
  expect(check.steps.get(4)).toEqual(["Set a time for these instructions"]);
  const late = checkDraft(draft({ steps: [steps[0], { id: 2, time: "2:00", text: "" }, { id: 3, time: "1:30", text: "" }].filter((s) => s !== undefined) }));
  expect(late.steps.get(3)).toEqual(["Must come after 2:00"]);
});

test("a clean draft becomes the drive the bot plays", () => {
  expect(checkDraft(draft()).drive).toEqual({
    prompt: "Play well. {{health}}",
    loadout: "Pick for {{choice}}",
    planEvery: 10,
    steps: [
      { at: 0, text: "farm" },
      { at: 60, text: "loot" },
      { at: 120, text: "boss" },
      { at: 180, text: "run" },
    ],
  });
});

test("embeds are checked against what each field may read", () => {
  const check = checkDraft(draft({ prompt: "{{choice}} {{nope}}", loadout: "{{why}}" }));
  expect(check.prompt).toEqual(["{{choice}} is not part of the state", "{{nope}} is not part of the state"]);
  expect(check.loadout).toEqual(["{{why}} is not part of the state"]);
});

test("a new step comes a minute after the latest time", () => {
  expect(addStep(steps).at(-1)).toEqual({ id: 5, time: "4:00", text: "" });
});
