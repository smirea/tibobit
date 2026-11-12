import { BOOT_CHUNK } from "../userscript/link/chunks";
import { GameLink } from "../userscript/link/game-link";
import { encyclopedia } from "../userscript/agent/encyclopedia";
import type { Encyclopedia } from "../protocol/snapshot";

export type PageEncyclopedia = { build: string; encyclopedia: Encyclopedia };

declare global {
  interface Window {
    __tiboEncyclopedia: Promise<PageEncyclopedia>;
  }
}

const link = new GameLink();

// The title screen never loads the English content text; a tab that has played has it. Importing the
// chunks the boot chunk names loads them like the game would, and GameLink reads them as it sees them.
async function loadEnglish() {
  const boot = await new Promise<string>((resolve) => {
    const seen = () => performance.getEntriesByType("resource").find((e) => BOOT_CHUNK.test(e.name))?.name;
    const now = seen();
    if (now !== undefined) return resolve(now);
    new PerformanceObserver((list, observer) => {
      const url = list.getEntries().find((e) => BOOT_CHUNK.test(e.name))?.name;
      if (url === undefined) return;
      observer.disconnect();
      resolve(url);
    }).observe({ type: "resource" });
  });
  const names = new Set((await (await fetch(boot)).text()).match(/\.\/i18n-en-[\w.-]+\.js/g));
  if (names.size === 0) throw new Error("the boot chunk names no English chunks");
  await Promise.all([...names].map((n) => import(new URL(n, boot).href)));
}

window.__tiboEncyclopedia = new Promise((resolve, reject) => {
  loadEnglish().catch(reject);
  link.onChange(() => {
    if (link.error !== undefined) return reject(new Error(link.error));
    const e = encyclopedia(link);
    if (e === undefined || link.simBuild === undefined || Object.keys(link.messages).length === 0) return;
    resolve({ build: link.simBuild, encyclopedia: e });
  });
});
