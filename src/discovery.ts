import type { Key, Kind, Loadout } from "./catalog";

const DISCOVERY_KEY = "tibo.discovery.v1";
const EVOLUTIONS_KEY = "tibo.evolutions.v1";

function parseDiscovery(raw: string | null): Set<Key> {
  const out = new Set<Key>();
  try {
    const d = JSON.parse(raw ?? "{}") as Partial<Record<Kind, string[]>>;
    for (const kind of ["weapon", "passive", "item"] as const) for (const id of d[kind] ?? []) out.add(`${kind}:${id}`);
  } catch {
    // A corrupt store reads as "nothing discovered"; every card then shows as new.
  }
  return out;
}

// The game marks every offer as discovered in the same frame the choice opens, so the store
// always says "known" by the time a card renders. Keep the pre-session snapshot and hold back
// ids the game adds until their card has been shown and closed, or until they are held.
export class Discovery {
  private known = parseDiscovery(localStorage.getItem(DISCOVERY_KEY));
  private pending = new Map<Key, "unseen" | "shown">();

  constructor() {
    const nativeSetItem = Storage.prototype.setItem;
    const track = (value: string) => {
      for (const key of parseDiscovery(value)) if (!this.known.has(key) && !this.pending.has(key)) this.pending.set(key, "unseen");
    };
    Storage.prototype.setItem = function (this: Storage, name: string, value: string) {
      if (name === DISCOVERY_KEY) track(value);
      return nativeSetItem.call(this, name, value);
    };
  }

  isNew(key: Key): boolean {
    return !this.known.has(key);
  }

  made(result: Key): boolean {
    try {
      const ids = JSON.parse(localStorage.getItem(EVOLUTIONS_KEY) ?? "[]") as string[];
      return ids.includes(result.slice(result.indexOf(":") + 1));
    } catch {
      return false;
    }
  }

  settle(loadout: Loadout, onScreen: Set<Key>) {
    for (const [key, state] of this.pending) {
      if (loadout.has(key) || (state === "shown" && !onScreen.has(key))) {
        this.known.add(key);
        this.pending.delete(key);
      } else if (onScreen.has(key)) this.pending.set(key, "shown");
    }
  }

  get version(): string {
    return `${this.known.size}/${this.pending.size}`;
  }
}
