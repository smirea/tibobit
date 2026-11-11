import { fail } from "../protocol/parse";
import type { Snapshot } from "../protocol/snapshot";
import { RAW_TOP } from "../protocol/view";

/**
 * Parses a `raw` list: paths into the game state by its own keys, such as "enemies", "cfg", "run"
 * or "world.activeHazards"; "storage", "surroundings", "forecast" or "gameEvents"; or "all".
 */
export function parseRaw(list: string | null | undefined): string[] {
  if (list === null || list === undefined || list === "") return [];
  return list.split(",").map((n) => {
    const path = n.trim();
    if (!/^[\w.]+$/.test(path)) fail(`raw takes game state paths such as enemies,cfg,world.activeHazards, or ${RAW_TOP.join(", ")}, or all; got ${path}`);
    return path;
  });
}

const at = (o: unknown, path: string): unknown => path.split(".").reduce<unknown>((v, k) => (typeof v === "object" && v !== null ? (v as Record<string, unknown>)[k] : undefined), o);
function put(o: Record<string, unknown>, path: string, v: unknown) {
  const keys = path.split(".");
  let here = o;
  for (const k of keys.slice(0, -1)) here = (here[k] ??= {}) as Record<string, unknown>;
  here[keys.at(-1) ?? ""] = v;
}

/** The parts of the snapshot `raw` asks for: game state paths under `game`, and the snapshot's own parts; throws on a path the game state does not have. */
export function rawParts(s: Snapshot, raw: string[]): Pick<Snapshot, "game" | (typeof RAW_TOP)[number]> {
  if (raw.includes("all")) return { ...(s.game === undefined ? {} : { game: s.game }), ...Object.fromEntries(RAW_TOP.flatMap((k) => (s[k] === undefined ? [] : [[k, s[k]]]))) };
  const out: Record<string, unknown> = {};
  const game: Record<string, unknown> = {};
  for (const path of raw) {
    if ((RAW_TOP as readonly string[]).includes(path)) {
      if (s[path as (typeof RAW_TOP)[number]] !== undefined) out[path] = s[path as (typeof RAW_TOP)[number]];
      continue;
    }
    if (s.game === undefined) continue;
    const v = at(s.game, path);
    if (v === undefined) fail(`the game state has no ${path}; its keys are ${Object.keys(s.game).join(", ")}; the snapshot's own parts are ${RAW_TOP.join(", ")}`);
    put(game, path, v);
  }
  return { ...out, ...(Object.keys(game).length === 0 ? {} : { game }) };
}
