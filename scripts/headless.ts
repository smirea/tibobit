#!/usr/bin/env bun
// Runs tibo.dog in a headless browser with the userscript, so a bot can play without a visible
// browser. Tampermonkey is not available there, so GM_xmlhttpRequest is shimmed with fetch; the
// page's CSP and CORS would block that fetch, which is why both are turned off for this profile.
import { readdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright-core";

const args = process.argv.slice(2);
const option = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};
const width = Number(option("width", "960"));
const height = Number(option("height", "600"));
const port = Number(option("port", "7358"));
const headed = args.includes("--headed");
const bridge = option("bridge", "");
// A profile folder keeps the game's own progress, such as unlocked Nightmare levels, across launches.
const profile = option("profile", "");

const root = path.resolve(import.meta.dir, "..");
const userscript = Bun.file(path.join(root, "dist", "tibo-helper.user.js"));
if (!(await userscript.exists())) throw new Error("dist/tibo-helper.user.js is missing; run bun run build");

const shim = `window.GM_xmlhttpRequest = (d) => {
  const ctrl = new AbortController();
  fetch(d.url, { method: d.method, body: d.data, headers: d.headers, signal: ctrl.signal })
    .then((r) => d.responseType === "stream"
      ? d.onloadstart?.({ status: r.status, response: r.body })
      : r.text().then((t) => d.onload?.({ status: r.status, response: t, responseText: t })))
    .catch((e) => d.onerror?.(e));
  return { abort: () => ctrl.abort() };
};`;

// Prefer the browser this Playwright version expects; otherwise reuse the newest headless shell
// already downloaded, rather than requiring another download.
function executablePath(): string | undefined {
  const explicit = option("chrome", "");
  if (explicit !== "") return explicit;
  if (Bun.file(chromium.executablePath()).size > 0) return undefined;
  const cache = path.join(os.homedir(), "Library", "Caches", "ms-playwright");
  const shells = readdirSync(cache, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith("chromium_headless_shell-"))
    .map((d) => d.name)
    .sort((a, b) => Number(b.split("-")[1]) - Number(a.split("-")[1]));
  for (const dir of shells) {
    const exe = path.join(cache, dir, "chrome-headless-shell-mac-arm64", "chrome-headless-shell");
    if (Bun.file(exe).size > 0) return exe;
  }
  throw new Error("no headless Chromium found; run bunx playwright-core install chromium-headless-shell or pass --chrome <path>");
}

const launch = {
  executablePath: headed ? undefined : executablePath(),
  headless: !headed,
  args: ["--disable-web-security", "--disable-features=LocalNetworkAccessChecks", "--mute-audio", "--use-angle=metal"],
};
const contextOptions = { bypassCSP: true, viewport: { width, height } };
const context =
  profile === ""
    ? await (await chromium.launch(launch)).newContext(contextOptions)
    : await chromium.launchPersistentContext(path.resolve(profile), { ...launch, ...contextOptions });
const target = bridge === "" ? "" : `window.__tiboBridgeOrigin = "http://127.0.0.1:${Number(bridge)}";`;
await context.addInitScript({ content: `${target}\n${shim}\n${await userscript.text()}` });
const page = context.pages()[0] ?? (await context.newPage());
// tibo.dog polls /version.json and reloads itself onto a new build, which drops the run in
// progress. Keep answering with the build this page loaded; /reload picks up a new one.
let loadedVersion: { body: string; contentType: string } | undefined;
await page.route("**/version.json*", async (route) => {
  if (loadedVersion === undefined) {
    const response = await route.fetch();
    loadedVersion = { body: await response.text(), contentType: response.headers()["content-type"] ?? "application/json" };
  }
  await route.fulfill({ status: 200, body: loadedVersion.body, contentType: loadedVersion.contentType });
});
page.on("pageerror", (e) => console.error("page error:", String(e)));
page.on("console", (m) => {
  if (m.type() === "error" && !m.text().includes("Failed to load resource")) console.error("console:", m.text().slice(0, 300));
});
await page.goto("https://tibo.dog/");

Bun.serve({
  hostname: "127.0.0.1",
  port,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/screenshot") return new Response(new Uint8Array(await page.screenshot()), { headers: { "content-type": "image/png" } });
    if (url.pathname === "/reload") {
      loadedVersion = undefined;
      await page.reload();
      return new Response("reloaded\n");
    }
    if ((url.pathname === "/click" || url.pathname === "/hover") && req.method === "POST") {
      try {
        const selector = await req.text();
        if (url.pathname === "/click") await page.click(selector, { timeout: 5000 });
        else await page.hover(selector, { timeout: 5000 });
        return new Response(`${url.pathname.slice(1)}ed\n`);
      } catch (e) {
        return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
      }
    }
    if (url.pathname === "/eval" && req.method === "POST") {
      try {
        return Response.json(await page.evaluate(await req.text()));
      } catch (e) {
        return Response.json({ error: e instanceof Error ? e.message : String(e) }, { status: 500 });
      }
    }
    return new Response("GET /screenshot, GET /reload, POST /click <selector>, POST /hover <selector> or POST /eval <expression>\n", { status: 404 });
  },
});
console.log(`tibo.dog running headless at ${width}x${height}; screenshots at http://127.0.0.1:${port}/screenshot`);

const shutdown = async () => {
  await (context.browser() ?? context).close();
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
