import { expect, test } from "bun:test";
import { type Experiment, overdueAreas } from "./experiments";
import { DEFAULT_TEMPLATES } from "../../bot/templates";
import { gameEntry, gameId, hasFreshGames } from "./games";
import type { Start } from "../training/slots";

const game = (tag: string, n: number, from: Start): string =>
  gameEntry({ spec: { id: gameId(tag, n), label: "x", from, seconds: 60, templates: DEFAULT_TEMPLATES, changes: "" }, seed: "1", difficulty: "nightmare-2" }, [], false);
const experiment = (name: string, area: Experiment["area"], games: string): Experiment => ({ name, title: name, status: "done", area, result: "confirmed", created: "", updated: "", hypothesis: "h", method: "", findings: "", games });

test("an area with no games this loop or the last is overdue", () => {
  const rows = [experiment("a", "build", game("L4.I2", 1, { fresh: { difficulty: 2, weapon: "" } })), experiment("b", "items", game("L2.I5", 3, { gym: "opening-nm2" }))];
  expect(overdueAreas(rows, 4)).toEqual(["items", "economy", "bosses", "movement", "spots", "models"]);
});

test("a game from a fresh start is told apart from one that began in a gym", () => {
  expect(hasFreshGames(experiment("a", "build", game("L4.I2", 1, { fresh: { difficulty: 2, weapon: "peeler" } })))).toBe(true);
  expect(hasFreshGames(experiment("b", "items", game("L2.I5", 3, { gym: "opening-nm2" })))).toBe(false);
});
