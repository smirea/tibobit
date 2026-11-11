// An outage on 2026-11-09 burned three loops: every coach call failed fast and the headless tabs
// stayed on Chrome's error page. The loop waits it out instead and then reloads the games.
import { stopping } from "./stop";
import { lookup } from "node:dns/promises";

const NEEDED_HOSTS = ["api.anthropic.com", "openrouter.ai", "tibo.dog"];

export async function offlineHost(): Promise<string | undefined> {
  for (const host of NEEDED_HOSTS) if (!(await lookup(host).then(() => true, () => false))) return host;
  return undefined;
}

/** Waits until every host resolves; true when it had to wait. */
export async function waitForHosts(): Promise<boolean> {
  const down = await offlineHost();
  if (down === undefined) return false;
  const since = Date.now();
  console.error(`${down} does not resolve; waiting for the network`);
  while (!stopping && (await offlineHost()) !== undefined) await Bun.sleep(30_000);
  console.log(`the network is back after ${Math.round((Date.now() - since) / 60_000)} min`);
  return true;
}

export const UNREACHABLE = /ENOTFOUND|EAI_AGAIN|ECONNREFUSED|ECONNRESET|Can't reach the API/;
