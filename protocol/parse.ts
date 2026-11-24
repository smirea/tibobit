// Helpers of the validators that turn untrusted JSON into the contract's types. Each throws with a message a caller can act on.

export function fail(message: string): never {
  throw new Error(message);
}

export function num(v: unknown, what: string): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fail(`${what} must be a number`);
}

export type Checked<T> = { value: T } | { errors: string[] };

export const isText = (v: unknown): v is string => typeof v === "string" && v.trim() !== "";
