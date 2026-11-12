import { readdirSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { chromium } from "playwright-core";

// Prefer the browser this Playwright version expects; otherwise reuse the newest headless shell
// already downloaded, rather than requiring another download.
export function executablePath(explicit = ""): string | undefined {
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
