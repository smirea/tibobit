import { DIFFICULTIES, type Difficulty, type GameMode, isDifficulty, isGameMode } from "../protocol/commands";
import { checkTemplates, DEFAULT_TEMPLATES, type Templates } from "./templates";
import { BRIDGE_ORIGIN, HEADLESS_PORT, localOrigin } from "../protocol/address";
import { parseBotArgs } from "./args";
const given = parseBotArgs(process.argv.slice(2));

/** Whether a flag was given. */
export const has = (name: keyof typeof given) => given[name] !== undefined;
export const option = (name: keyof typeof given, fallback: string) => {
  const value = given[name];
  return typeof value === "string" ? value : fallback;
};

export const MODEL = option("model", "h2o-lightning-4b@q8_0");

/** The templates the planner and action model play with: --templates (a JSON object with any of planner, action and knobs), over the built-in defaults. */
export const BASE: { templates: Templates; source: string } = await (async () => {
  const file = option("templates", "");
  if (file === "") return { templates: DEFAULT_TEMPLATES, source: "the built-in defaults" };
  const checked = checkTemplates(await Bun.file(file).json(), DEFAULT_TEMPLATES);
  if ("errors" in checked) throw new Error(`${file}: ${checked.errors.join("; ")}`);
  return { templates: checked.value, source: file };
})();

// The decision model's planner persona, which picks cards and goals; the same model unless named.
export const PLAN_MODEL = option("plan-model", MODEL);

export const SERVER = option("server", process.env.TIBO_SERVER ?? BRIDGE_ORIGIN);

// A System One decisions endpoint: LM Studio locally, or OpenRouter's (`--decider openrouter`),
// which serves TypeSafe's Jev models and needs OPENROUTER_API_KEY.
const DECIDERS: Record<string, string> = { lmstudio: "http://localhost:1234/v1/systemone", openrouter: "https://openrouter.ai/api/alpha/decisions" };

export const DECIDER = DECIDERS[option("decider", "lmstudio")] ?? option("decider", "lmstudio");

export const DECIDER_KEY = new URL(DECIDER).hostname === "openrouter.ai" ? process.env.OPENROUTER_API_KEY : undefined;
if (new URL(DECIDER).hostname === "openrouter.ai" && !DECIDER_KEY) throw new Error("--decider openrouter needs OPENROUTER_API_KEY (in .env.local, managed by env-manager)");

export const STEP = Number(option("step", "0.35"));

export const PLAN_EVERY = Number(option("plan-every", "5"));

export const RUN_COUNT = Number(option("runs", "1"));

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


// The starting weapon by the game's id; without one, the game's Random.
export const WEAPON = option("weapon", "");

// For Full Self Driving: play the run already in progress instead of starting a fresh one.
export const TAKEOVER = has("takeover");

// The headless game's own API reloads the tab; "" keeps the bot from ever reloading, as in a person's browser.
export const RELOAD = option("reload", `${localOrigin(HEADLESS_PORT)}/reload`);


// One CSV row per model call and per goal that starts or ends goes to a file in this folder, outside the repo.
export const LOG_DIR = option("log-dir", "/tmp/tibobit");
