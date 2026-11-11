const SEED_KEY = "tibobit.seed";

declare const unsafeWindow: Window | undefined;

/**
 * Open World rolls its seed from one crypto.getRandomValues(new Uint32Array(1)) call, as
 * `n.toString(36).toUpperCase()`. A `seed` command stores the seed it wants and reloads; this hands
 * that number to every such call of the new page, before the game's scripts run. The stored seed
 * stays until a run starts (see the start command), so a reload in between keeps it.
 */
export function installSeedHook() {
  let want: string | null = null;
  try {
    want = sessionStorage.getItem(SEED_KEY);
  } catch {}
  if (want === null) return;
  const n = parseInt(want, 36);
  const page = typeof unsafeWindow === "undefined" ? window : unsafeWindow;
  const real = page.crypto.getRandomValues.bind(page.crypto);
  // The sandbox's Uint32Array is not the page's, so instanceof would miss the page's calls.
  page.crypto.getRandomValues = <T extends ArrayBufferView | null>(a: T): T => {
    if (a !== null && a.constructor.name === "Uint32Array" && (a as unknown as Uint32Array).length === 1) {
      (a as unknown as Uint32Array)[0] = n;
      return a;
    }
    return real(a as unknown as Uint32Array) as unknown as T;
  };
}

/** Has the reloaded page's next Open World run play this seed. */
export function requestSeed(seed: string) {
  sessionStorage.setItem(SEED_KEY, seed);
}

/** A run has started, so the next reload rolls its own seed again. */
export function clearSeed() {
  try {
    sessionStorage.removeItem(SEED_KEY);
  } catch {}
}
