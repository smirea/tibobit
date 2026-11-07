#!/usr/bin/env bun
import path from "node:path";
import pkg from "../package.json";

const root = path.resolve(import.meta.dir, "..");
const outFile = path.join(root, "dist", "tibo-helper.user.js");
const rawUrl = "https://raw.githubusercontent.com/smirea/tibobit/master/dist/tibo-helper.user.js";
const { version } = pkg;

const header = `// ==UserScript==
// @name         tibo.dog combo helper
// @namespace    https://github.com/smirea/tibobit
// @version      ${version}
// @description  Lists the evolutions your current loadout can reach, annotates level-up cards, and lets a local agent server read and drive the game.
// @match        https://tibo.dog/*
// @run-at       document-start
// @grant        GM_xmlhttpRequest
// @connect      127.0.0.1
// @updateURL    ${rawUrl}
// @downloadURL  ${rawUrl}
// ==/UserScript==
`;

const result = await Bun.build({
  entrypoints: [path.join(root, "src", "main.ts")],
  target: "browser",
  format: "iife",
  minify: false,
});
if (!result.success) {
  for (const log of result.logs) console.error(log);
  throw new Error("build failed");
}
const output = result.outputs[0];
if (output === undefined) throw new Error("build produced no output");
await Bun.write(outFile, header + (await output.text()));
console.log(`wrote ${path.relative(root, outFile)} (${version})`);
