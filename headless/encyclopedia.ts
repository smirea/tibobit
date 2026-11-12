#!/usr/bin/env bun
// Reads the game's content off tibo.dog as it is deployed now, the way the userscript does: a
// headless page imports the game's own chunks. Nothing needs the agent server or an open tab.
import path from "node:path";
import { chromium } from "playwright-core";
import { executablePath } from "./chromium";
import type { PageEncyclopedia } from "./encyclopedia-page";
import { bookFrom } from "../game/book";
import type { Key } from "../game/catalog";

const USAGE = `usage: headless/encyclopedia.ts [--json [section]] [--chrome <path>]

  Every evolution, union and item evolution in the deployed game, with the game's English names and
  what each result does. --json prints the whole encyclopedia instead (weapons, passives, items,
  enemies, bosses, dogs, pois, events, botHelps, biomes, messages), or one section of it.`;

const args = Bun.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}
const at = (name: string) => args.indexOf(`--${name}`);
const json = at("json") >= 0;
const section = json && args[at("json") + 1]?.startsWith("--") === false ? args[at("json") + 1] : undefined;
const chrome = at("chrome") >= 0 ? (args[at("chrome") + 1] ?? "") : "";

const built = await Bun.build({ entrypoints: [path.join(import.meta.dir, "encyclopedia-page.ts")], target: "browser", format: "iife" });
const script = built.outputs[0];
if (!built.success || script === undefined) throw new AggregateError(built.logs, "could not build the page script");

const browser = await chromium.launch({ executablePath: executablePath(chrome), headless: true, args: ["--mute-audio"] });
let read: PageEncyclopedia;
try {
  const page = await browser.newPage();
  await page.addInitScript({ content: await script.text() });
  await page.goto("https://tibo.dog/");
  read = await page.evaluate(() => Promise.race([window.__tiboEncyclopedia, new Promise<never>((_, reject) => setTimeout(() => reject(new Error("the game's content did not load within 60 seconds")), 60_000))]));
} finally {
  await browser.close();
}
const { build, encyclopedia } = read;

if (json) {
  const out = section === undefined ? encyclopedia : (encyclopedia as Record<string, unknown>)[section];
  if (out === undefined) throw new Error(`no section ${section}; the sections are ${Object.keys(encyclopedia).join(", ")}`);
  console.log(JSON.stringify(out, null, 2));
  process.exit(0);
}

const { catalog, text } = bookFrom(encyclopedia);
const name = (key: Key) => catalog.names[key] ?? key;
const level = (key: Key) => (catalog.maxLevel[key] === undefined ? "" : ` ${catalog.maxLevel[key]}`);
const desc = (key: Key) => {
  const line = catalog.descriptions[key];
  return line === undefined ? "" : `\n      ${line.replace(/\s+/g, " ")}`;
};
const by = (a: string, b: string) => a.localeCompare(b);

const evolutions: string[] = [];
const unions: string[] = [];
const itemEvolutions: string[] = [];
for (const r of catalog.recipes) {
  if (r.kind === "evolution") {
    const weapon: Key = `weapon:${r.weapon}`;
    const result: Key = `weapon:${r.result}`;
    evolutions.push(`  ${name(weapon)}${level(weapon)} + ${name(r.catalyst)} (${r.catalyst.split(":")[0]}) → ${name(result)}${desc(result)}`);
  } else if (r.kind === "union") {
    const result: Key = `weapon:${r.result}`;
    unions.push(`  ${name(`weapon:${r.weapons[0]}`)} + ${name(`weapon:${r.weapons[1]}`)} → ${name(result)}${desc(result)}`);
  } else {
    const catalyst: Key = `passive:${r.catalyst}`;
    const result: Key = `item:${r.result}`;
    itemEvolutions.push(`  ${name(`item:${r.item}`)} + ${name(catalyst)}${level(catalyst)} → ${name(result)}${desc(result)}`);
  }
}

type Def = { id: string; tier?: string; from?: unknown; catalyst?: unknown };
const weapons = encyclopedia.weapons as Def[];
const items = encyclopedia.items as Def[];
const made = new Set(catalog.recipes.map((r) => r.result));
const unread = [...weapons.filter((w) => w.tier === "evolved" || w.tier === "union"), ...items.filter((i) => i.tier === "evolved")]
  .filter((d) => !made.has(d.id))
  .map((d) => `  ${d.id} (${d.tier}): from ${JSON.stringify(d.from)}, catalyst ${JSON.stringify(d.catalyst)}`);
const evolving = new Set(catalog.recipes.flatMap((r) => (r.kind === "evolution" ? [r.weapon] : [])));
const dead = weapons.filter((w) => w.tier === "base" && !evolving.has(w.id)).map((w) => name(`weapon:${w.id}`));
const lines = (title: string, rows: string[]) => (rows.length === 0 ? [] : [`${title} (${rows.length})`, ...rows.sort(by), ""]);

console.log(
  [
    `tibo.dog ${build}, read ${new Date(encyclopedia.capturedAt).toISOString()}`,
    "",
    ...lines("Evolutions: a base weapon at its max level, holding the catalyst", evolutions),
    ...lines("Unions: two evolved weapons", unions),
    ...lines("Item evolutions: an item, with the catalyst passive at its max level", itemEvolutions),
    ...(dead.length === 0 ? [] : [`Base weapons with no evolution (${dead.length}): ${dead.sort(by).join(", ")}`, ""]),
    ...lines("Results the catalog cannot read a recipe for", unread),
  ].join("\n").trimEnd(),
);
if (text.size === 0) throw new Error("the game sent no English text");
