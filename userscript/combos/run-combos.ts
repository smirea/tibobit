import { buildCatalog, type Catalog, type Combo, toCombo } from "../../game/catalog";
import type { Content } from "../../game/types";
import type { GameLink } from "../link/game-link";

export type RunCombos = { catalog: Catalog; combos: Combo[] };

let data: RunCombos | undefined;
let dataFrom: { content: Content; messages: number } | undefined;

/** Catalog for the current run, rebuilt only when the run's content or the loaded names change. */
export function runCombos(link: GameLink): RunCombos | undefined {
  const content = link.content();
  if (content === undefined) return undefined;
  const messages = Object.keys(link.messages).length;
  if (dataFrom?.content !== content || dataFrom.messages !== messages) {
    const catalog = buildCatalog(content, link.messages);
    data = { catalog, combos: catalog.recipes.map(toCombo) };
    dataFrom = { content, messages };
  }
  return data;
}
