import { beforeEach, expect, test } from "bun:test";
import { EXAMPLE_MACHINE, type Machine } from "../../protocol/machine";
import { checkDraft, DEFAULT_DRAFT, type Draft, loadDraft, saveDraft } from "./draft";

const kept = new Map<string, string>();
globalThis.localStorage = { getItem: (k: string) => kept.get(k) ?? null, setItem: (k: string, v: string) => void kept.set(k, v) } as Storage;
beforeEach(() => kept.clear());

const machine: Machine = { id: "wait", initial: "wait", states: { wait: { meta: { action: { type: "still" } } } } };
const draft = (over: Partial<Draft> = {}): Draft => ({ prompt: "Stand still.", machine, builtFrom: "Stand still.", loadout: "Pick for {{choice}}", ...over });

test("a draft whose loadout checks becomes the drive the bot plays", () => {
  expect(checkDraft(draft())).toEqual({ loadout: [], drive: { machine, loadout: "Pick for {{choice}}" } });
});

test("a loadout that embeds something the picker cannot read keeps the draft from driving", () => {
  expect(checkDraft(draft({ loadout: "{{health}} {{health.pct}}" }))).toEqual({ loadout: ["{{health.pct}} is not part of the state"] });
});

test("what was saved comes back after a reload", () => {
  saveDraft(draft({ prompt: "Stand still, then dash." }));
  expect(loadDraft()).toEqual(draft({ prompt: "Stand still, then dash." }));
});

test("a browser with nothing kept starts with the example machine and its request", () => {
  expect([loadDraft().machine, loadDraft().prompt === loadDraft().builtFrom]).toEqual([EXAMPLE_MACHINE, true]);
});

test("a kept machine that no longer checks starts over instead of reaching the bot", () => {
  kept.set("tibobit.fsd", JSON.stringify(draft({ machine: { ...machine, initial: "gone" } })));
  expect(loadDraft()).toEqual(DEFAULT_DRAFT);
});
