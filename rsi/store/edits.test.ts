import { expect, test } from "bun:test";
import { checkEdits } from "./edits";
import { upsert } from "./lock";
import type { Experiment } from "./experiments";

test("a coach changes only the experiment fields it sends, and a new experiment needs a title, area and hypothesis", () => {
  const e: Experiment = { name: "boss-dodge", title: "t", status: "running", area: "bosses", result: "", created: "", updated: "", hypothesis: "h", method: "", findings: "", games: "" };
  expect(checkEdits({ experiments: [{ name: "boss-dodge", status: "done", result: "confirmed" }] }, { experiments: [e], beliefs: [] })).toEqual({ value: { experiments: [{ name: "boss-dodge", status: "done", result: "confirmed" }] } });
  expect(checkEdits({ experiments: [{ name: "Boss Dodge" }, { name: "new-one", status: "proposed" }] }, { experiments: [e], beliefs: [] })).toEqual({
    errors: ["experiments[0] (Boss Dodge).name must be kebab-case, such as boss-dodge-distance (it names experiment_<name>.md)", "experiments[1] (new-one) is new, so it needs title", "experiments[1] (new-one) is new, so it needs area", "experiments[1] (new-one) is new, so it needs hypothesis"],
  });
});

test("the coach's rows replace the rows with their ids and the new ones go at the end", () => {
  const row = (id: string, claim: string) => ({ id, claim });
  expect(upsert([row("B1", "edited"), row("B3", "new")], [row("B1", "old"), row("B2", "kept")])).toEqual([row("B1", "edited"), row("B2", "kept"), row("B3", "new")]);
});
