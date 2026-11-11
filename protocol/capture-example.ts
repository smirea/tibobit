#!/usr/bin/env bun
// Saves the game as the bot last read it under Full Self Driving (StatePreview) as the example the
// machine builder's prompt and the popup's tooltips show. Run it while Full Self Driving drives a
// run a minute or more in: ./protocol/capture-example.ts [--port 7357]
import path from "node:path";
import { BRIDGE_PORT, localOrigin } from "./address";
import { FIELDS } from "./machine";
import { parseStatePreview } from "./pilot";
import { BLOCKS } from "../bot/templates";

const i = process.argv.indexOf("--port");
const origin = localOrigin(i >= 0 ? Number(process.argv[i + 1]) : BRIDGE_PORT);
const res = await fetch(`${origin}/pilot/state`);
if (!res.ok) throw new Error(`${origin}/pilot/state: ${res.status} ${await res.text()}`);
const preview = parseStatePreview(await res.json());
const read = (p: string) => p.split(".").reduce<unknown>((at, key) => (at as Record<string, unknown> | undefined)?.[key], preview.input);
const missing = [...Object.keys(BLOCKS).filter((name) => preview.blocks[name] === undefined), ...Object.keys(FIELDS).filter((p) => typeof read(p) !== "number")];
if (missing.length > 0) throw new Error(`the bot showed no ${missing.join(", ")}`);
const file = path.join(import.meta.dir, "state.example.json");
await Bun.write(file, `${JSON.stringify(preview, null, 2)}\n`);
console.log(`wrote ${path.relative(process.cwd(), file)}: ${preview.state} at ${preview.time}s`);
