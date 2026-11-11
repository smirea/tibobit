// The loop wants every weapon and passive tried before the coach settles on a build, so it counts
// the games that ended holding each one. A weapon or passive no game has held is untried.

/** By weapon or passive id: how many games ended holding it, and the last of them. */
import { HELD_JSON } from "./paths";
import { withLock } from "./lock";

export type Held = Record<string, { games: number; last: string }>;

export const readHeld = async (): Promise<Held> => ((await Bun.file(HELD_JSON).exists()) ? ((await Bun.file(HELD_JSON).json()) as Held) : {});

/** Counts one game's weapons and passives, each given as the game's id (a level after it is dropped). */
export async function recordHeld(game: string, held: string[]) {
  await withLock(async () => {
    const all = await readHeld();
    for (const id of new Set(held.map((h) => h.split(" ")[0] ?? ""))) if (id !== "") all[id] = { games: (all[id]?.games ?? 0) + 1, last: game };
    await Bun.write(HELD_JSON, `${JSON.stringify(all, null, 2)}\n`);
  });
}

export const untried = (ids: Iterable<string>, held: Held) => [...ids].filter((id) => held[id] === undefined);

/** What the games so far have held, least played first, so the untried and the barely tried stand out. */
export function heldCoverage(held: Held, ids: { base: Iterable<string>; evolved: Iterable<string>; passives: Iterable<string> }): string {
  const group = (title: string, of: Iterable<string>) => {
    const all = [...of];
    const never = untried(all, held);
    const played = all.filter((id) => held[id] !== undefined).sort((a, z) => (held[a]?.games ?? 0) - (held[z]?.games ?? 0));
    return [`**${title}**: ${all.length - never.length} of ${all.length} held in a game.`, `- Never held (${never.length}): ${never.join(", ") || "none"}`, `- Held, with games: ${played.map((id) => `${id} ${held[id]?.games}`).join(", ") || "none"}`].join("\n");
  };
  return [group("Base weapons", ids.base), group("Passives", ids.passives), group("Evolved weapons and unions", ids.evolved)].join("\n\n");
}
