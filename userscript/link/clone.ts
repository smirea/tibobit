export const NO_RECORDER = { step() {}, choose() {}, dash() {}, taint() {}, log() {} };

// A deep copy that keeps prototypes (the game's pools are classes) and shared identity within the
// state, but leaves content definitions and rule modules shared, since the sim compares them by identity.
export function cloneState<T>(root: T, shared: WeakSet<object>): T {
  const memo = new Map<object, unknown>();
  const copy = (v: unknown): unknown => {
    if (typeof v !== "object" || v === null || shared.has(v)) return v;
    const known = memo.get(v);
    if (known !== undefined) return known;
    if (ArrayBuffer.isView(v)) {
      const c = v instanceof DataView ? new DataView(v.buffer.slice(0)) : (v as unknown as { slice(): object }).slice();
      memo.set(v, c);
      return c;
    }
    if (Array.isArray(v)) {
      const c: unknown[] = [];
      memo.set(v, c);
      for (const x of v) c.push(copy(x));
      return c;
    }
    if (v instanceof Map) {
      const c = new Map();
      memo.set(v, c);
      for (const [k, x] of v) c.set(copy(k), copy(x));
      return c;
    }
    if (v instanceof Set) {
      const c = new Set();
      memo.set(v, c);
      for (const x of v) c.add(copy(x));
      return c;
    }
    const c = Object.create(Object.getPrototypeOf(v)) as Record<string, unknown>;
    memo.set(v, c);
    for (const k of Object.keys(v)) c[k] = copy((v as Record<string, unknown>)[k]);
    return c;
  };
  return copy(root) as T;
}

export function reachable(root: unknown, into: WeakSet<object>) {
  const stack = [root];
  while (stack.length > 0) {
    const v = stack.pop();
    if (typeof v !== "object" || v === null || into.has(v) || ArrayBuffer.isView(v)) continue;
    into.add(v);
    if (v instanceof Map) for (const [k, x] of v) stack.push(k, x);
    else if (v instanceof Set) for (const x of v) stack.push(x);
    else for (const x of Object.values(v)) stack.push(x);
  }
}

export const isRuleModule = (v: unknown) =>
  typeof v === "object" && v !== null && !Array.isArray(v) && Object.values(v).length > 0 && Object.values(v).every((x) => typeof x === "function");
