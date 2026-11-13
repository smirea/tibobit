import { buildCatalog, type Catalog, type Combo, toCombo } from "../../game/catalog";
import type { Content } from "../../game/types";
import type { GameLink } from "../link/game-link";

export type RunCombos = { catalog: Catalog; combos: Combo[] };

let data: RunCombos | undefined;
let dataFrom: { content: Content; messages: number } | undefined;

// From the game's whole table, not the run's content registry: the sim evolves weapons by the table,
// and the registry leaves out weapons a run still offers, such as Skipping Cannonball.
/** Every recipe in the game, rebuilt only when the table or the loaded names change. */
export function runCombos(link: GameLink): RunCombos | undefined {
  const content = link.table;
  if (content === undefined) return undefined;
  const messages = Object.keys(link.messages).length;
  if (dataFrom?.content !== content || dataFrom.messages !== messages) {
    const catalog = buildCatalog(content, link.messages);
    data = { catalog, combos: catalog.recipes.map(toCombo) };
    dataFrom = { content, messages };
  }
  return data;
}
