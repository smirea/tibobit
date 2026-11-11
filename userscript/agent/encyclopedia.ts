import type { GameLink } from "../link/game-link";
import type { Encyclopedia } from "../../protocol/snapshot";

function plain(value: unknown): unknown {
  return JSON.parse(JSON.stringify(value, (_k, v: unknown) => (v instanceof Map ? Object.fromEntries(v) : v instanceof Set ? [...v] : v)));
}

/** Every English line the game has for one content entry, by field: name, desc, breed, title, label, announce and so on. */
function textOf(link: GameLink, kind: string, id: string): Record<string, string> {
  const prefix = `content.${kind}.${id}.`;
  const out: Record<string, string> = {};
  for (const [key, lines] of Object.entries(link.messages)) if (key.startsWith(prefix) && lines.length > 0) out[key.slice(prefix.length)] = lines.join("\n");
  return out;
}

/**
 * Every definition in the game's global content table, each with all of its English lines from the
 * game's message table (`content.<kind>.<id>.<field>`, as `<field>`), and `messages`: the game's
 * English for content kinds that have no definition table, such as shrine stat labels and rarities,
 * under the game's own keys. The run's rules are the game's `cfg`, which is part of the game state.
 */
export function encyclopedia(link: GameLink): Encyclopedia | undefined {
  const table = link.table;
  if (table === undefined || !link.ready) return undefined;
  const withText = <T extends { id: string }>(kind: string, defs: T[]) => defs.map((d) => ({ ...textOf(link, kind, d.id), ...(plain(d) as object) }));
  const tabled = new Set(["weapon", "passive", "item", "enemy", "boss", "dog", "poi", "biome", "event", "botHelp"]);
  const messages: Record<string, string> = {};
  for (const [key, lines] of Object.entries(link.messages)) {
    const kind = key.match(/^content\.([^.]+)\./)?.[1];
    if (kind !== undefined && !tabled.has(kind) && lines.length > 0) messages[key] = lines.join("\n");
  }

  return {
    capturedAt: Date.now(),
    weapons: withText("weapon", table.allWeapons),
    passives: withText("passive", table.passives),
    items: withText("item", table.allItems),
    enemies: withText("enemy", table.enemies),
    bosses: table.bossIds.map((id) => ({ id, ...textOf(link, "boss", id) })),
    dogs: withText("dog", table.dogs),
    pois: table.pois.map((p) => ({ ...textOf(link, "poi", p.kind), ...(plain(p) as object) })),
    events: withText("event", table.events),
    botHelps: withText("botHelp", table.botHelps),
    biomes: withText("biome", table.biomes),
    messages,
  };
}
