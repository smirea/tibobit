import path from "node:path";
/**
 * The part of the game an experiment is about. The coverage table counts them, so a coach can see
 * which parts of the game no experiment has looked at yet.
 */
import { mkdirSync, readdirSync } from "node:fs";
import { EXPERIMENTS_DIR } from "./paths";
import { withLock } from "./lock";

export const AREAS = {
  build: "weapons, passives, level-up picks, recipes and evolutions, reroll, skip and banish",
  items: "items and what they do",
  spots: "chests, shrines and every spot that charges",
  enemies: "pests: which hurt, how, and how to handle them",
  bosses: "bosses: when they come, how they hit, how to beat or avoid them",
  hazards: "ground hazards and the biomes that make them",
  movement: "walking, dodging, dashing and evading",
  economy: "gold, shops, carts and what to spend on",
  map: "exploring and where things are",
  meta: "the ladder, curses, gear and anything across runs",
  models: "how the planner and the action model read their prompts",
} as const;

// One Markdown file per question, gameplay/experiments/experiment_<name>.md. The coach writes the
// header fields and the Hypothesis, Method and Findings sections; the loop appends one entry under
// Games for every training-ground game played for it.

export const EXPERIMENT_STATUSES = ["proposed", "running", "done", "recheck", "retired"] as const;

export const EXPERIMENT_RESULTS = ["", "confirmed", "refuted", "inconclusive"] as const;

type Area = keyof typeof AREAS;

export type Experiment = {
  name: string;
  title: string;
  status: (typeof EXPERIMENT_STATUSES)[number];
  area: Area;
  result: (typeof EXPERIMENT_RESULTS)[number];
  created: string;
  updated: string;
  hypothesis: string;
  method: string;
  findings: string;
  /** Written by the loop: one entry per game played for this experiment. */
  games: string;
};

export const EXPERIMENT_TEXT = ["hypothesis", "method", "findings"] as const;

const EXPERIMENT_FIELDS = ["status", "area", "result", "created", "updated"] as const;

export const EXPERIMENT_NAME = /^[a-z0-9]+(-[a-z0-9]+){0,7}$/;

export const experimentFile = (name: string) => path.join(EXPERIMENTS_DIR, `experiment_${name}.md`);

const title = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function renderExperiment(e: Experiment): string {
  return [
    `# ${e.title}`,
    "",
    "| Field | Value |",
    "| --- | --- |",
    ...EXPERIMENT_FIELDS.map((f) => `| ${title(f)} | ${e[f] || "-"} |`),
    "",
    ...EXPERIMENT_TEXT.flatMap((f) => [`## ${title(f)}`, "", e[f].trim() || "(none yet)", ""]),
    "## Games",
    "",
    e.games.trim() || "(none played yet)",
    "",
  ].join("\n");
}

export function parseExperiment(text: string, name: string): Experiment {
  const field = (f: string) => {
    const v = text.match(new RegExp(`^\\| ${title(f)} \\| (.*) \\|$`, "m"))?.[1]?.trim() ?? "";
    return v === "-" ? "" : v;
  };
  const section = (f: string) => {
    const v = text.match(new RegExp(`^## ${title(f)}\\n\\n([\\s\\S]*?)(?=\\n## |(?![\\s\\S]))`, "m"))?.[1]?.trim() ?? "";
    return v === "(none yet)" || v === "(none played yet)" ? "" : v;
  };
  return {
    name,
    title: text.match(/^# (.+)$/m)?.[1]?.trim() ?? name,
    status: field("status") as Experiment["status"],
    area: field("area") as Area,
    result: field("result") as Experiment["result"],
    created: field("created"),
    updated: field("updated"),
    hypothesis: section("hypothesis"),
    method: section("method"),
    findings: section("findings"),
    games: section("games"),
  };
}

export async function readExperiments(): Promise<Experiment[]> {
  let files: string[];
  try {
    files = readdirSync(EXPERIMENTS_DIR).filter((f) => /^experiment_.+\.md$/.test(f));
  } catch {
    return [];
  }
  return Promise.all(files.sort().map(async (f) => parseExperiment(await Bun.file(path.join(EXPERIMENTS_DIR, f)).text(), f.slice("experiment_".length, -3))));
}

export async function writeExperiment(e: Experiment) {
  mkdirSync(EXPERIMENTS_DIR, { recursive: true });
  await Bun.write(experimentFile(e.name), renderExperiment(e));
}

/** Adds game entries to an experiment's Games section. */
export async function addGames(name: string, entries: string[]) {
  await withLock(async () => {
    const file = Bun.file(experimentFile(name));
    if (!(await file.exists())) return;
    const e = parseExperiment(await file.text(), name);
    e.games = [e.games, ...entries].filter((x) => x.trim() !== "").join("\n\n");
    await writeExperiment(e);
  });
}

/** Per area: experiments done, open and retired. */
export function coverage(rows: Experiment[]): string {
  const lines = ["| Area | Done | Open | Retired | Last loop with games | What it covers |", "| --- | --- | --- | --- | --- | --- |"];
  for (const [area, about] of Object.entries(AREAS)) {
    const rs = rows.filter((r) => r.area === area);
    const last = lastLoopTested(rows, area as Area);
    lines.push(`| ${area} | ${rs.filter((r) => r.status === "done").length} | ${rs.filter((r) => r.status === "proposed" || r.status === "running" || r.status === "recheck").length} | ${rs.filter((r) => r.status === "retired").length} | ${last === 0 ? "never" : `loop ${last}`} | ${about} |`);
  }
  return lines.join("\n");
}

/** The loops an experiment had games in, from its game ids (L4.I3.G2). */
export const gameLoops = (e: Experiment) => [...e.games.matchAll(/^### L(\d+)\.I\d+\.G\d+/gm)].map((m) => Number(m[1]));


const lastLoopTested = (rows: Experiment[], area: Area) => Math.max(0, ...rows.filter((r) => r.area === area).flatMap(gameLoops));

/**
 * The areas every loop has to look at. One that had no games this loop or the last is overdue,
 * and while any is, each iteration plays at least one game for an overdue area.
 */
const REQUIRED_AREAS = ["build", "items", "economy", "bosses", "movement", "spots", "models"] as const satisfies readonly Area[];

export const overdueAreas = (rows: Experiment[], loop: number) => REQUIRED_AREAS.filter((a) => lastLoopTested(rows, a) < loop - 1);

/** Whether an experiment's games include one from a fresh start (0:00 on a new seed). */
export const hasFreshGames = (e: Experiment) => /^- Start: a fresh game/m.test(e.games);
