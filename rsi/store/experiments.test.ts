import { expect, test } from "bun:test";
import { type Experiment, parseExperiment, renderExperiment } from "./experiments";

test("an experiment file reads back as written", () => {
  const e: Experiment = { name: "boss-dodge", title: "Dodge the 2:00 boss", status: "running", area: "bosses", result: "", created: "L1.I2", updated: "L1.I3", hypothesis: "Evading for 12s beats 6s.", method: "Two arms from gym boss-2min.", findings: "", games: "### L1.I3 game 1\n\n- alive 120s" };
  expect(parseExperiment(renderExperiment(e), "boss-dodge")).toEqual(e);
});
