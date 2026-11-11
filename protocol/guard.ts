// A guard is the condition on a state machine's transition (protocol/machine.ts): an expression over
// the machine's input, such as `health.pct < 40 && food.count > 0`. It has numbers, true and false,
// dotted paths into the input, comparisons, arithmetic, &&, || and !, and nothing else, so a machine
// a model wrote runs without running any of its code.

type Value = number | boolean;
type Eval = (input: unknown) => Value;

export type Guard = {
  test(input: unknown): boolean;
  /** Every input path the expression reads, for checking them against what the input holds. */
  paths: string[];
};

const TOKEN = /\s*(\d+(?:\.\d+)?|[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*|&&|\|\||[<>=!]=|[-+*/<>!()])/y;

const COMPARE: Record<string, (a: number, b: number) => boolean> = {
  "<": (a, b) => a < b,
  "<=": (a, b) => a <= b,
  ">": (a, b) => a > b,
  ">=": (a, b) => a >= b,
};

function read(input: unknown, path: string): Value {
  let at = input;
  for (const key of path.split(".")) at = (at as Record<string, unknown> | undefined)?.[key];
  if (typeof at !== "number" && typeof at !== "boolean") throw new Error(`the machine's input has no ${path}`);
  return at;
}

const number = (v: Value, what: string): number => {
  if (typeof v !== "number") throw new Error(`${what} needs numbers`);
  return v;
};

/** Reads a guard; throws with what is wrong with it and where. */
export function compileGuard(source: string): Guard {
  const tokens: string[] = [];
  TOKEN.lastIndex = 0;
  while (TOKEN.lastIndex < source.length) {
    const from = TOKEN.lastIndex;
    const m = TOKEN.exec(source);
    if (m === null) {
      if (source.slice(from).trim() === "") break;
      throw new Error(`cannot read "${source.slice(from).trim().slice(0, 20)}"`);
    }
    tokens.push(m[1] ?? "");
  }
  if (tokens.length === 0) throw new Error("the guard is empty");
  let at = 0;
  const paths: string[] = [];
  const peek = () => tokens[at];
  const take = (token: string) => (tokens[at] === token ? (at++, true) : false);

  const atom = (): Eval => {
    const token = tokens[at++];
    if (token === undefined) throw new Error("the expression ends early");
    if (token === "(") {
      const inner = or();
      if (!take(")")) throw new Error("a ( is never closed");
      return inner;
    }
    if (/^\d/.test(token)) return () => Number(token);
    if (token === "true" || token === "false") return () => token === "true";
    if (!/^[A-Za-z_]/.test(token)) throw new Error(`"${token}" is not a value`);
    paths.push(token);
    return (input) => read(input, token);
  };
  const unary = (): Eval => {
    if (!take("-")) return atom();
    const inner = unary();
    return (input) => -number(inner(input), "-");
  };
  const arithmetic = (next: () => Eval, ops: Record<string, (a: number, b: number) => number>) => (): Eval => {
    let left = next();
    for (let op = peek(); op !== undefined && op in ops; op = peek()) {
      at++;
      const [a, b, apply, sign] = [left, next(), ops[op] ?? (() => 0), op];
      left = (input) => apply(number(a(input), sign), number(b(input), sign));
    }
    return left;
  };
  const product = arithmetic(unary, { "*": (a, b) => a * b, "/": (a, b) => a / b });
  const sum = arithmetic(product, { "+": (a, b) => a + b, "-": (a, b) => a - b });
  const comparison = (): Eval => {
    const left = sum();
    const op = peek();
    if (op === "==" || op === "!=") {
      at++;
      const right = sum();
      return (input) => (left(input) === right(input)) === (op === "==");
    }
    const compare = op === undefined ? undefined : COMPARE[op];
    if (compare === undefined) return left;
    at++;
    const right = sum();
    return (input) => compare(number(left(input), op ?? ""), number(right(input), op ?? ""));
  };
  const not = (): Eval => {
    if (!take("!")) return comparison();
    const inner = not();
    return (input) => !inner(input);
  };
  const and = (): Eval => {
    let left = not();
    while (take("&&")) {
      const [a, b] = [left, not()];
      left = (input) => a(input) === true && b(input) === true;
    }
    return left;
  };
  function or(): Eval {
    let left = and();
    while (take("||")) {
      const [a, b] = [left, and()];
      left = (input) => a(input) === true || b(input) === true;
    }
    return left;
  }

  const whole = or();
  if (at < tokens.length) throw new Error(`"${tokens[at]}" is out of place`);
  return { test: (input) => whole(input) === true, paths: [...new Set(paths)] };
}
