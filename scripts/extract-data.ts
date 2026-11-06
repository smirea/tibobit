#!/usr/bin/env bun
// Pulls the live tibo.dog bundle and writes src/catalog.generated.json.
// Rerun whenever the game ships a new build (the userscript warns when its data is stale).
import { parse } from "acorn";
import { simple } from "acorn-walk";
import type { Expression, Node, ObjectExpression, Property } from "acorn";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import type { Catalog, Kind, Recipe } from "../src/catalog";

const ORIGIN = "https://tibo.dog";
const root = path.resolve(import.meta.dir, "..");
const cacheDir = path.join(root, ".cache", "assets");
const outFile = path.join(root, "src", "catalog.generated.json");

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.text();
}

async function asset(name: string): Promise<string> {
  const file = path.join(cacheDir, name);
  const cached = Bun.file(file);
  if (await cached.exists()) return cached.text();
  const text = await fetchText(`${ORIGIN}/assets/${name}`);
  await Bun.write(file, text);
  return text;
}

function must<T>(value: T | undefined | null, what: string): T {
  if (value === undefined || value === null) throw new Error(`could not find ${what}`);
  return value;
}

const CHUNK_REF = /[./]([A-Za-z0-9_.-]+-[A-Za-z0-9_-]{8}\.js)/g;

async function crawl(entry: string, seeds: string[]): Promise<Map<string, string>> {
  const sources = new Map<string, string>();
  const queue = [entry, ...seeds];
  while (queue.length > 0) {
    const batch = queue.splice(0, 24).filter((n) => !sources.has(n));
    const texts = await Promise.all(batch.map((n) => asset(n).then((t) => [n, t] as const)));
    for (const [name, text] of texts) {
      if (sources.has(name)) continue;
      sources.set(name, text);
      for (const m of text.matchAll(CHUNK_REF)) {
        const ref = must(m[1], "chunk ref");
        if (!sources.has(ref)) queue.push(ref);
      }
    }
  }
  return sources;
}

type Value = string | number | boolean | Value[] | { [k: string]: Value } | undefined;

function staticValue(node: Expression | Node): Value {
  switch (node.type) {
    case "Literal": {
      const v = (node as { value: unknown }).value;
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" ? v : undefined;
    }
    case "TemplateLiteral": {
      const t = node as unknown as { expressions: unknown[]; quasis: { value: { cooked: string } }[] };
      return t.expressions.length === 0 ? t.quasis[0]?.value.cooked : undefined;
    }
    case "ArrayExpression":
      return (node as unknown as { elements: (Expression | null)[] }).elements.map((e) =>
        e === null ? undefined : staticValue(e),
      );
    default:
      return undefined;
  }
}

function props(obj: ObjectExpression): Map<string, Node> {
  const out = new Map<string, Node>();
  for (const p of obj.properties) {
    if (p.type !== "Property") continue;
    const prop = p as Property;
    const key = prop.key.type === "Identifier" ? prop.key.name : staticValue(prop.key);
    if (typeof key === "string") out.set(key, prop.value);
  }
  return out;
}

const NAME_KEY = /^content\.(weapon|passive|item)\.([a-z0-9-]+)\.name$/;

async function main() {
  const html = await fetchText(`${ORIGIN}/`);
  const entry = must(html.match(/src="\.\/assets\/(main-[A-Za-z0-9_-]+\.js)"/)?.[1], "main script");
  const warmName = must(html.match(/name="tibo-warm" content="\.\/assets\/([^"]+)"/)?.[1], "warm list");
  const warm = JSON.parse(await asset(warmName)) as { files: string[] };
  const seeds = warm.files.filter((f) => f.endsWith(".js")).map((f) => f.replace(/^assets\//, ""));
  const sources = await crawl(entry, seeds);
  console.log(`parsed ${sources.size} chunks from build ${entry}`);

  const names = new Map<string, string>();
  for (const [file, text] of sources) {
    if (!file.startsWith("i18n-en-")) continue;
    const json = text.match(/JSON\.parse\(`([\s\S]*)`\)/)?.[1];
    if (json === undefined) continue;
    for (const [key, value] of Object.entries(JSON.parse(json) as Record<string, string[]>)) {
      const m = key.match(NAME_KEY);
      if (m && value[0] !== undefined) names.set(`${m[1]}:${m[2]}`, value[0]);
    }
  }
  if (names.size === 0) throw new Error("no English content names found");

  const weaponMax = new Map<string, number>();
  const passiveMax = new Map<string, number>();
  const evolved: { id: string; from: string; catalyst: string }[] = [];
  const unions: { id: string; from: [string, string] }[] = [];

  for (const [file, text] of sources) {
    if (file.startsWith("i18n-")) continue;
    let ast: Node;
    try {
      ast = parse(text, { ecmaVersion: "latest", sourceType: "module" });
    } catch {
      continue;
    }
    simple(ast, {
      ObjectExpression(node) {
        const p = props(node);
        const id = p.get("id") && staticValue(p.get("id")!);
        if (typeof id !== "string") return;
        const tier = p.get("tier") && staticValue(p.get("tier")!);
        const from = p.get("from") && staticValue(p.get("from")!);
        const catalyst = p.get("catalyst") && staticValue(p.get("catalyst")!);
        const levels = p.get("levels") && staticValue(p.get("levels")!);
        const maxLevel = p.get("maxLevel") && staticValue(p.get("maxLevel")!);
        if (tier === "base" && Array.isArray(levels)) weaponMax.set(id, Math.min(8, levels.length + 1));
        if (typeof maxLevel === "number" && p.has("perLevel")) passiveMax.set(id, maxLevel);
        if (tier === "evolved" && typeof from === "string" && typeof catalyst === "string")
          evolved.push({ id, from, catalyst });
        if (tier === "union" && Array.isArray(from) && from.length === 2) {
          const [a, b] = from;
          if (typeof a === "string" && typeof b === "string") unions.push({ id, from: [a, b] });
        }
      },
    });
  }

  const nameOf = (kind: Kind, id: string) => must(names.get(`${kind}:${id}`), `English name for ${kind} ${id}`);
  const recipes = new Map<string, Recipe>();
  for (const e of evolved) {
    nameOf("passive", e.catalyst);
    if (weaponMax.has(e.from)) {
      nameOf("weapon", e.from);
      nameOf("weapon", e.id);
      recipes.set(`weapon:${e.id}`, { kind: "evolution", weapon: e.from, catalyst: e.catalyst, result: e.id });
    } else if (names.has(`item:${e.from}`)) {
      nameOf("item", e.id);
      recipes.set(`item:${e.id}`, { kind: "itemEvolution", item: e.from, catalyst: e.catalyst, result: e.id });
    } else {
      throw new Error(`evolution ${e.id} comes from unknown ${e.from}`);
    }
  }
  const evolvedWeapons = new Set([...recipes.values()].filter((r) => r.kind === "evolution").map((r) => r.result));
  for (const u of unions) {
    for (const part of u.from)
      if (!evolvedWeapons.has(part)) throw new Error(`union ${u.id} needs ${part}, which is not an evolved weapon`);
    nameOf("weapon", u.id);
    recipes.set(`weapon:${u.id}`, { kind: "union", weapons: u.from, result: u.id });
  }

  for (const id of passiveMax.keys()) if (!names.has(`passive:${id}`)) passiveMax.delete(id);
  for (const r of recipes.values()) {
    if (r.kind !== "union") must(passiveMax.get(r.catalyst), `max level of passive ${r.catalyst}`);
  }

  const catalog: Catalog = {
    build: entry,
    extractedAt: new Date().toISOString().slice(0, 10),
    names: Object.fromEntries([...names].sort(([a], [b]) => a.localeCompare(b))),
    maxLevel: Object.fromEntries(
      [...[...weaponMax].map(([id, n]) => [`weapon:${id}`, n] as const), ...[...passiveMax].map(([id, n]) => [`passive:${id}`, n] as const)].sort(
        ([a], [b]) => a.localeCompare(b),
      ),
    ),
    recipes: [...recipes.values()].sort((a, b) => a.result.localeCompare(b.result)),
  };
  await mkdir(path.dirname(outFile), { recursive: true });
  await Bun.write(outFile, `${JSON.stringify(catalog, null, 1)}\n`);
  const count = (k: Recipe["kind"]) => catalog.recipes.filter((r) => r.kind === k).length;
  console.log(
    `wrote ${path.relative(root, outFile)}: ${count("evolution")} evolutions, ${count("union")} unions, ${count("itemEvolution")} item evolutions`,
  );
}

await main();
