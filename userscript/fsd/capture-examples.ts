#!/usr/bin/env bun
// Saves the state the bot last rendered under Full Self Driving as the popup's example values, which
// it shows before a bot has driven. Run it while a run is going: ./userscript/fsd/capture-examples.ts [--port 7357]
import path from "node:path";
import { BRIDGE_PORT, localOrigin } from "../../protocol/address";
import { parseStatePreview } from "../../protocol/pilot";
import { BLOCKS } from "../../bot/templates";

const i = process.argv.indexOf("--port");
const origin = localOrigin(i >= 0 ? Number(process.argv[i + 1]) : BRIDGE_PORT);
const res = await fetch(`${origin}/pilot/state`);
if (!res.ok) throw new Error(`${origin}/pilot/state: ${res.status} ${await res.text()}`);
const { blocks } = parseStatePreview(await res.json());
const missing = Object.keys(BLOCKS).filter((name) => blocks[name] === undefined);
if (missing.length > 0) throw new Error(`the bot rendered no ${missing.join(", ")}`);
const file = path.join(import.meta.dir, "examples.json");
await Bun.write(file, `${JSON.stringify(Object.fromEntries(Object.keys(BLOCKS).map((name) => [name, blocks[name]])), null, 2)}\n`);
console.log(`wrote ${path.relative(process.cwd(), file)}`);
