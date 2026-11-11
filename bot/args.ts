// The bot's command line, in one place for the bot that reads it and the programs that start it.

/** The decision model the loop's games and the panel's pilot play with: TypeSafe's Jev, through OpenRouter. */
export const JEV = { decider: "openrouter", model: "typesafe/jev-1.14-20261014" } as const;

/** Every flag the bot takes: one that takes a value, or a switch that is on when present. */
const FLAGS = {
  server: "value",
  reload: "value",
  decider: "value",
  model: "value",
  "plan-model": "value",
  mode: "value",
  difficulty: "value",
  runs: "value",
  seed: "value",
  weapon: "value",
  templates: "value",
  trial: "value",
  result: "value",
  notes: "switch",
  "coach-label": "value",
  intent: "value",
  takeover: "switch",
  "log-dir": "value",
  log: "value",
  step: "value",
  "plan-every": "value",
  lockstep: "switch",
  speed: "value",
} as const;

type Flag = keyof typeof FLAGS;
export type BotArgs = { [K in Flag]?: (typeof FLAGS)[K] extends "switch" ? boolean : string | number };

/** The command line that gives the bot these arguments. `reload: ""` keeps the bot from ever reloading the tab. */
export function botArgv(args: BotArgs): string[] {
  return (Object.entries(args) as [Flag, string | number | boolean | undefined][]).flatMap(([name, value]) => (value === undefined || value === false ? [] : FLAGS[name] === "switch" ? [`--${name}`] : [`--${name}`, String(value)]));
}

/** Reads a command line; a flag the bot does not have, or a value left out, throws. */
export function parseBotArgs(argv: string[]): { [K in Flag]?: (typeof FLAGS)[K] extends "switch" ? true : string } {
  const out: Record<string, string | true> = {};
  for (let i = 0; i < argv.length; i++) {
    const name = (argv[i] ?? "").replace(/^--/, "");
    if (!(argv[i] ?? "").startsWith("--") || !(name in FLAGS)) throw new Error(`the bot has no flag ${argv[i]}; its flags are ${Object.keys(FLAGS).map((f) => `--${f}`).join(", ")}`);
    if (FLAGS[name as Flag] === "switch") out[name] = true;
    else {
      const value = argv[++i];
      if (value === undefined) throw new Error(`--${name} needs a value`);
      out[name] = value;
    }
  }
  return out;
}
