import { MAX_GAMES } from "./rules";
import { checkHarness, type HarnessName } from "./coach/harnesses";
import { coachLabel } from "./store/campaign";

const USAGE = `usage: rsi/main.ts [--coach claude:<model>@<effort>] [--loops <n>] [--slots <n>] [--eval-seed <seed>]

  --coach      the coach: a harness (see rsi/coach/harnesses.ts), its model, and for claude a reasoning
               effort of high or more (default claude:claude-sonnet-5-5@high)
  --loops      how many loops of ten iterations to play (default: until stopped)
  --slots      training games played side by side (default 5)
  --eval-seed  the seed every full run plays (default TIBO10); training games never use it

The loop goes on from the last entry of gameplay/coach-log.md. Ctrl-C stops it, the games and the servers.`;

const argv = process.argv.slice(2);
if (argv.includes("--help") || argv.includes("-h")) {
  console.log(USAGE);
  process.exit(0);
}

const flags: Record<string, string> = {};
for (let i = 0; i < argv.length; i += 2) {
  const [name, value] = [argv[i] ?? "", argv[i + 1]];
  if (!["--coach", "--loops", "--slots", "--eval-seed"].includes(name)) throw new Error(`unexpected argument ${name}\n\n${USAGE}`);
  if (value === undefined || value.startsWith("--")) throw new Error(`${name} needs a value\n\n${USAGE}`);
  flags[name.slice(2)] = value;
}

export const coachSpec = flags.coach ?? "claude:claude-sonnet-5-5@high";

const specMatch = coachSpec.match(/^(\w+)(?::([^@]+))?(?:@(\w+))?$/);
if (specMatch === null) throw new Error(`--coach must look like claude:claude-sonnet-5-5@high, got ${coachSpec}`);

export const harness: HarnessName = checkHarness(specMatch[1] ?? "");

export const model = specMatch[2];

export const effort = specMatch[3];
if (harness !== "claude" && effort !== undefined) throw new Error(`only the claude harness takes a reasoning effort, not ${harness}`);
// Coaches reason at high effort or more: a lower one was ruled out for every run.
if (harness === "claude" && !["high", "xhigh", "max"].includes(effort ?? "")) throw new Error(`the coach reasons at high effort or more (@high, @xhigh or @max), not ${effort ?? "the harness default"}`);

export const LOOPS = flags.loops === undefined ? Number.POSITIVE_INFINITY : Number(flags.loops);

export const SLOT_COUNT = Number(flags.slots ?? 5);
if (!(LOOPS >= 1) || !Number.isInteger(SLOT_COUNT) || SLOT_COUNT < 1 || SLOT_COUNT > MAX_GAMES) throw new Error(`--loops must be at least 1 and --slots 1 to ${MAX_GAMES}`);

export const EVAL_SEED = (flags["eval-seed"] ?? "TIBO10").toUpperCase();

export const COMMITTER = `${model ?? harness}${effort === undefined ? "" : `@${effort}`}`;
if (Bun.which("gai") === null) throw new Error("committing gameplay/ needs gai on PATH");

// The notes of a full run name the coach and the model that coached it, which can change over time.
export const COACH_LABEL = coachLabel(COMMITTER);
