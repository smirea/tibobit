import { buildCatalog, type Catalog, type Combo, toCombo } from "./catalog";
import type { Content, GameLink } from "./game";

export type Data = { catalog: Catalog; combos: Combo[] };

let data: Data | undefined;
let dataFrom: { content: Content; messages: number } | undefined;

/** Catalog for the current run, rebuilt only when the run's content or the loaded names change. */
export function liveData(link: GameLink): Data | undefined {
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
