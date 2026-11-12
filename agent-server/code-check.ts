// Type-checks Full Self Driving's function before anything runs it: TypeScript compiles it against
// the types in protocol/driver.ts, so a path that returns nothing, a field the state lacks or an
// action the autopilot does not have is refused, in TypeScript's own words.
import { existsSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { ROOT } from "../paths";

const TSC = path.join(ROOT, "node_modules", ".bin", "tsc");
if (!existsSync(TSC)) throw new Error(`Full Self Driving type-checks its function with ${TSC}; run bun install`);

/** The types the function is written against, as source. */
export const DRIVER_TYPES = await Bun.file(path.join(ROOT, "protocol", "driver.ts")).text();

// No DOM and no Node types: fetch, window, process, Bun and require do not exist for the function.
const CONFIG = { compilerOptions: { noEmit: true, strict: true, noImplicitReturns: true, noFallthroughCasesInSwitch: true, allowUnreachableCode: false, target: "es2022", lib: ["es2022"], module: "esnext", types: [], pretty: false }, files: ["check.ts"] };

// The function is branching over the state. These reach outside it, hide state between calls, or can hang the bot.
const BANNED = ["import", "require", "eval", "Function", "globalThis", "async", "await", "while", "for", "do", "class", "this", "new"];

/** The function a reply holds, without a code fence around it or `export` in front. */
export function codeIn(reply: string): string {
  const fenced = /```(?:ts|typescript)?\n([\s\S]*?)```/.exec(reply)?.[1] ?? reply;
  return fenced.trim().replace(/^export\s+(?=function drive\b)/m, "");
}

/** Everything that keeps the function from being run, by its own line numbers; empty when it checks. */
export async function codeErrors(code: string): Promise<string[]> {
  if (!/^function drive\s*\(/m.test(code)) return ["the code must declare `function drive(state: State): Action`"];
  const bare = code.replace(/\/\/.*|\/\*[\s\S]*?\*\/|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`/g, " ");
  const banned = BANNED.filter((word) => new RegExp(`\\b${word}\\b`).test(bare));
  if (banned.length > 0) return [`${banned.map((w) => `\`${w}\``).join(", ")} cannot be used: write plain branching over the state, with array methods such as find, filter and some instead of loops`];
  const dir = mkdtempSync(path.join(os.tmpdir(), "tibo-drive-"));
  try {
    const prelude = `${DRIVER_TYPES}\n`;
    const before = prelude.split("\n").length - 1;
    const lines = code.split("\n").length;
    writeFileSync(path.join(dir, "check.ts"), `${prelude}${code}\nconst signature: (state: State) => Action = drive;\nvoid signature;\n`);
    writeFileSync(path.join(dir, "tsconfig.json"), JSON.stringify(CONFIG));
    const tsc = Bun.spawn([TSC, "-p", dir], { cwd: dir, stdout: "pipe", stderr: "pipe" });
    const out = `${await new Response(tsc.stdout).text()}${await new Response(tsc.stderr).text()}`;
    const errors = [...out.matchAll(/check\.ts\((\d+),(\d+)\): error (TS\d+): (.*)$/gm)].map(([, line, column, id, message]) => {
      const at = Number(line) - before;
      return at > lines ? `drive must be \`function drive(state: State): Action\`: ${message} (${id})` : `line ${at}, column ${column}: ${message} (${id})`;
    });
    if ((await tsc.exited) !== 0 && errors.length === 0) return [`TypeScript could not check the code: ${out.trim().slice(0, 400)}`];
    return errors;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}
