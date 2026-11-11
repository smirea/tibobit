import { expect, test } from "bun:test";
import { type BeliefRow, stampBeliefs } from "./beliefs";

test("a belief keeps the run that wrote it, and takes the run that last changed it", () => {
  const held: BeliefRow = { id: "B1", about: "game", verdict: "bad", claim: "Hot oil hurts most.", confidence: "lead", status: "held", evidence: "run 1", experiments: "E1", created: "run-1", updated: "run-1" };
  const raised = { ...held, confidence: "likely", created: "", updated: "" };
  const fresh = { ...held, id: "B2", created: "made up", updated: "made up" };
  expect(stampBeliefs([{ ...held, updated: "" }, fresh], [held], "run-2")).toEqual([held, { ...fresh, created: "run-2", updated: "run-2" }]);
  expect(stampBeliefs([raised], [held], "run-2")).toEqual([{ ...raised, created: "run-1", updated: "run-2" }]);
});
