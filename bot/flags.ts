import { RUNS as RUNS_DIR } from "../paths";
import { DIFFICULTIES, type Difficulty, type GameMode, isDifficulty, isGameMode } from "../protocol/commands";
import { checkTemplates, DEFAULT_TEMPLATES, type Templates } from "./templates";
import { readPlaybook } from "./playbook";
import { BRIDGE_ORIGIN } from "../protocol/address";
import path from "node:path";
export const args = process.argv.slice(2);

export const option = (name: string, fallback: string) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? (args[i + 1] ?? fallback) : fallback;
};

export const MODEL = option("model", "h2o-lightning-4b@q8_0");

// A trial (a training game, scripts/slots.ts) plays the run in progress, usually a loaded checkpoint, for this many
// seconds of game time with the templates in --templates, then writes what happened to --result and
// exits: no plan, notes, review or commit.
export const TRIAL = args.includes("--trial") ? Number(option("trial", "")) : undefined;
if (TRIAL !== undefined && !(TRIAL > 0)) throw new Error(`--trial takes the seconds of game time to play; got ${option("trial", "nothing")}`);

export const TRIAL_RESULT = option("result", "");
if (TRIAL !== undefined && TRIAL_RESULT === "") throw new Error("--trial needs --result <file> for what happened");

export const BASE: { templates: Templates; weapon?: string; source: string } = await (async () => {
  const file = option("templates", "");
  if (file === "" && TRIAL !== undefined) throw new Error("--trial needs --templates <file>, a JSON object with planner, action and knobs");
  if (file !== "") {
    const checked = checkTemplates(await Bun.file(file).json(), DEFAULT_TEMPLATES);
    if ("errors" in checked) throw new Error(`${file}: ${checked.errors.join("; ")}`);
    return { templates: checked.value, source: file };
  }
  const playbook = await readPlaybook();
  return { templates: playbook.templates, weapon: playbook.weapon, source: playbook.updated === "never" ? "the built-in defaults" : "the coach's playbook" };
})();

// The decision model's planner persona, which picks cards and goals; the same model unless named.
export const PLAN_MODEL = option("plan-model", MODEL);

export const SERVER = option("server", process.env.TIBO_SERVER ?? BRIDGE_ORIGIN);

// A System One decisions endpoint: LM Studio locally, or OpenRouter's (`--decider openrouter`),
// which serves TypeSafe's Jev models and needs OPENROUTER_API_KEY.
export const DECIDERS: Record<string, string> = { lmstudio: "http://localhost:1234/v1/systemone", openrouter: "https://openrouter.ai/api/alpha/decisions" };

export const DECIDER = DECIDERS[option("decider", "lmstudio")] ?? option("decider", "lmstudio");

export const DECIDER_KEY = new URL(DECIDER).hostname === "openrouter.ai" ? process.env.OPENROUTER_API_KEY : undefined;
if (new URL(DECIDER).hostname === "openrouter.ai" && !DECIDER_KEY) throw new Error("--decider openrouter needs OPENROUTER_API_KEY (in .env.local, managed by env-manager)");

export const STEP = Number(option("step", "0.35"));

export const PLAN_EVERY = Number(option("plan-every", "5"));

export const RUNS = Number(option("runs", "1"));

// "highest" takes the hardest the game allows; `difficulty` then holds what the game picked, such as nightmare-3.
export const DIFFICULTY: Difficulty = (() => {
  const d = option("difficulty", "easy");
  if (!isDifficulty(d)) throw new Error(`--difficulty must be one of ${DIFFICULTIES.join(", ")}, got ${d}`);
  return d;
})();

// "current" plays the mode the game is on (its open mode screen, or the run in play or just ended), else the Daily.
export const MODE_ARG: GameMode | "current" = (() => {
  const mode = option("mode", "daily");
  if (mode !== "current" && !isGameMode(mode)) throw new Error(`--mode must be daily, openWorld or current; got ${mode}`);
  return mode;
})();

export const CRUTCH = "lockstep is a crutch: it pauses the game while the models think, which no player can do. Every game plays live, as a person plays it. Do not enable it.";
if (args.includes("--lockstep") || args.includes("--speed")) throw new Error(CRUTCH);

// Notes are for full runs only: --notes writes one to gameplay/notes when the run ends, under
// --coach-label, with --intent as its plan. Templates come from --templates (a JSON file with any of
// planner, action and knobs over the defaults), else the coach's playbook.
export const NOTES = args.includes("--notes");

export const COACH_LABEL = option("coach-label", "none");

export const INTENT = option("intent", "");

// Without --templates, the bot plays as the coach would: its playbook's templates and starting weapon.
export const WEAPON = args.includes("--weapon") ? option("weapon", "") : (BASE.weapon ?? "");

// For "Grok take the wheel" and trials: play the run already in progress instead of starting a fresh one.
export const TAKEOVER = TRIAL !== undefined || args.includes("--takeover");

export const RELOAD = option("reload", "http://127.0.0.1:7358/reload");

export const LOG = option("log", path.join(RUNS_DIR, `${MODEL.replace(/[^\w.@-]/g, "_")}-${Date.now()}.jsonl`));
