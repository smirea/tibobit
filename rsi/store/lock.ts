import path from "node:path";
import { GAMEPLAY } from "../../paths";
import { mkdirSync, rmSync, statSync } from "node:fs";
export const today = () => new Date().toISOString().slice(0, 10);

// The loop and a person answering infrastructure requests can write gameplay/ at once, so every
// read-modify-write of its files holds this lock.
export const LOCK = path.join(GAMEPLAY, ".lock");

export const STALE_LOCK_MS = 30_000;

export async function withLock<T>(work: () => Promise<T>): Promise<T> {
  for (;;) {
    try {
      mkdirSync(LOCK);
      break;
    } catch {
      // A holder that died mid-write leaves the lock behind; nothing holds it this long.
      const age = Date.now() - (statSync(LOCK, { throwIfNoEntry: false })?.mtimeMs ?? Date.now());
      if (age > STALE_LOCK_MS) rmSync(LOCK, { recursive: true, force: true });
      await Bun.sleep(50);
    }
  }
  try {
    return await work();
  } finally {
    rmSync(LOCK, { recursive: true, force: true });
  }
}

/** The coach's added and changed rows over the table: a changed row is replaced where it stands, and a new one goes at the end. */
export function upsert<R extends { id: string }>(changed: R[], now: R[]): R[] {
  const out = now.map((r) => changed.find((c) => c.id === r.id) ?? r);
  return [...out, ...changed.filter((c) => !now.some((r) => r.id === c.id))];
}
