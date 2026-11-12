import { beforeEach, expect, test } from "bun:test";
import { EXAMPLE_CODE } from "../../protocol/drive";
import { checkDraft, DEFAULT_DRAFT, type Draft, loadDraft, saveDraft } from "./draft";

const kept = new Map<string, string>();
globalThis.localStorage = { getItem: (k: string) => kept.get(k) ?? null, setItem: (k: string, v: string) => void kept.set(k, v) } as Storage;
beforeEach(() => kept.clear());

const code = 'function drive(state: State): Action {\n  return { type: "still" };\n}';
const draft = (over: Partial<Draft> = {}): Draft => ({ prompt: "Stand still.", code, builtFrom: "Stand still.", loadout: "Pick for {{choice}}", ...over });

test("a draft whose loadout checks becomes the drive the bot plays", () => {
  expect(checkDraft(draft())).toEqual({ loadout: [], drive: { code, loadout: "Pick for {{choice}}" } });
});

test("a loadout that embeds something the picker cannot read keeps the draft from driving", () => {
  expect(checkDraft(draft({ loadout: "{{health}} {{health.pct}}" }))).toEqual({ loadout: ["{{health.pct}} is not part of the state"] });
});

test("what was saved comes back after a reload", () => {
  saveDraft(draft({ prompt: "Stand still, then dash." }));
  expect(loadDraft()).toEqual(draft({ prompt: "Stand still, then dash." }));
});

test("a browser with nothing kept starts with the example function and its request", () => {
  expect([loadDraft().code, loadDraft().prompt === loadDraft().builtFrom]).toEqual([EXAMPLE_CODE, true]);
});

test("a draft kept by an earlier version, with no function in it, starts over", () => {
  kept.set("tibobit.fsd", JSON.stringify({ prompt: "Farm.", machine: { id: "old" }, builtFrom: "Farm.", loadout: "Pick" }));
  expect(loadDraft()).toEqual(DEFAULT_DRAFT);
});
