import type { Content, Enums, GameEvent } from "../../game/types";

export const SIM_CHUNK = /\/assets\/sim-[\w-]+\.js$/;
export const BOOT_CHUNK = /\/assets\/boot-[\w-]+\.js$/;
export const ENGLISH_CHUNK = /\/assets\/i18n-en-[\w.-]+\.js$/;

type GamePrototype = { step(): unknown; setInput(x: number, y: number): unknown; choose: unknown; drainEvents(): GameEvent[] };

export function isGameClass(value: unknown): value is { prototype: GamePrototype } {
  if (typeof value !== "function") return false;
  const proto = value.prototype as Partial<GamePrototype> | undefined;
  return typeof proto?.step === "function" && typeof proto.setInput === "function" && typeof proto.choose === "function" && typeof proto.drainEvents === "function";
}

export function findGameClass(ns: Record<string, unknown>) {
  for (const value of Object.values(ns)) {
    if (value === null || typeof value !== "object") continue;
    const candidate = (value as Record<string, unknown>).Game;
    if (isGameClass(candidate)) return candidate;
  }
  throw new Error("the sim chunk no longer exports a Game class");
}

/** Resolves a minified local binding in a chunk to the module and export it was imported from. */
export async function importBinding(source: string, sourceUrl: string, local: string): Promise<{ value: unknown; module: Record<string, unknown> }> {
  for (const clause of source.matchAll(/import\{([^}]*)\}from"([^"]+)"/g)) {
    for (const binding of (clause[1] ?? "").split(",")) {
      const [exported = "", as] = binding.split(" as ");
      if ((as ?? exported) !== local) continue;
      const module = (await import(new URL(clause[2] ?? "", sourceUrl).href)) as Record<string, unknown>;
      return { value: module[exported], module };
    }
  }
  throw new Error(`could not find where the sim chunk imports ${local}`);
}

export function localAt(source: string, pattern: RegExp, what: string): string {
  const local = source.match(pattern)?.[1];
  if (local === undefined) throw new Error(`could not find the ${what} in the sim chunk`);
  return local;
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

export function findEnums(module: Record<string, unknown>): Enums {
  const values = Object.values(module);
  const pickupKinds = values.find(
    (v): v is string[] => Array.isArray(v) && v[0] === "xp" && v.includes("gold") && v.includes("chest"),
  );
  const zoneKinds = values.find((v): v is Record<string, number> => isRecord(v) && typeof v.telegraph === "number" && typeof v.hazardPool === "number");
  const enemyFlags = values.find((v): v is Record<string, number> => isRecord(v) && typeof v.Elite === "number" && typeof v.Hidden === "number");
  if (pickupKinds === undefined) throw new Error("could not find the pickup kinds table");
  if (zoneKinds === undefined) throw new Error("could not find the zone kinds table");
  const zoneShapes = values.find((v): v is Record<string, number> => isRecord(v) && v.circle === 0 && typeof v.line === "number" && typeof v.cone === "number");
  if (zoneShapes === undefined) throw new Error("could not find the zone shapes table");
  if (enemyFlags === undefined) throw new Error("could not find the enemy flags table");
  const botModes = values.find((v): v is Record<string, number> => isRecord(v) && v.wander === 0 && typeof v.hop === "number" && typeof v.beam === "number");
  if (botModes === undefined) throw new Error("could not find the grok bot modes table");
  return { pickupKinds, zoneKinds, zoneShapes, enemyFlags, botModes };
}

export function assertContent(value: unknown): asserts value is Content {
  const c = value as Partial<Record<keyof Content, unknown>>;
  for (const key of ["baseWeapons", "evolutions", "unions", "passives", "items", "evolvedItems", "allWeapons", "allItems", "enemies", "bossIds"] as const)
    if (!Array.isArray(c[key])) throw new Error(`content registry has no ${key} list`);
}
