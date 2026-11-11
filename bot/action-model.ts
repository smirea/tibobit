import { type Course, ELITE_REACH, type Pursuit } from "./goals";
import { knobs, templates } from "./run-templates";
import { command, say, send } from "./server";
import type { DirectionView } from "../protocol/view";
import { plural, spotLine } from "./phrasing";
import { decide, type Question } from "./decider";
import { type Direction, DIRECTIONS } from "../protocol/geometry";
import type { Sector, World } from "./world";
import { render } from "./templates";
import { MODEL } from "./config";
import { stateVars } from "./blocks";
import { RunLog } from "./run-log/writer";
import type { MoveOption } from "../protocol/pilot";
import { noteModelStep } from "./forecast-lag";
import { dashCell, UNANSWERED } from "./run-log/cells";

// Words, not percentages: on 50 replayed states Laya picked a move within 2% of the least
// damaging one 90% of the time with these words, 80% with "would lose N%", and 38% when the
// number stood alone.
function hurtWords(share: number): string {
  if (share <= 3) return "get scratched";
  if (share <= 9) return "get badly hurt";
  return "get very badly hurt";
}

const forecastFor = (r: World, heading: Direction | "stay"): DirectionView | undefined => r.view.directions[heading === "stay" ? "still" : heading];

function outlook(r: World, f: DirectionView): string {
  const sources = f.damageFrom ?? [];
  const within = `within ${r.view.directions.horizonMilliseconds / 1000} seconds`;
  if (f.dead) return `Tibo would die ${within}${sources.length === 0 ? "" : `, killed by ${sources.join(" and ")}`}`;
  const share = Math.round((100 * f.estimatedDamage) / r.maxHp);
  if (share < 1) return `Tibo takes no damage ${within}`;
  return `Tibo would ${hurtWords(share)} ${within}, by ${sources.join(" and ")}`;
}

function bearing(dir: Direction, goal: Direction | "stay" | undefined): string {
  if (goal === undefined) return "";
  if (goal === "stay") return "off the spot Tibo is holding for its goal";
  const i = DIRECTIONS.indexOf(dir);
  const j = DIRECTIONS.indexOf(goal);
  const off = Math.min((i - j + 8) % 8, (j - i + 8) % 8);
  return off === 0 ? "straight toward the goal" : off === 1 ? "roughly toward the goal" : off === 2 ? "sideways to the goal" : "away from the goal";
}

// Only what the next steps need: the forecast first (the models weigh the start of a description
// most), then what it cannot see, and where the goal lies.
function describe(r: World, s: Sector, goal: Direction | "stay" | undefined): string {
  const boss = r.bosses.find((b) => b.dir === s.dir);
  const f = forecastFor(r, s.dir);
  return [
    f === undefined ? "" : outlook(r, f),
    boss !== undefined && boss.dist < 250 ? `toward the ${boss.name} boss only ${Math.round(boss.dist)} away, which hurts Tibo on contact` : "",
    s.enemies > 0 ? `${plural(s.enemies, "enemy")} on screen that way` : "no enemies on screen that way",
    s.bullets > 0 ? `${plural(s.bullets, "enemy bullet")} coming from there` : "",
    bearing(s.dir, goal),
  ]
    .filter(Boolean)
    .join(", ");
}

// "Stand still" must carry the threats around Tibo too, or it reads as the safest move in a swarm.
function standing(r: World, goal: Direction | "stay" | undefined): string {
  const crowd = r.view.world.enemiesOnScreen > 0 ? ` with ${plural(r.view.world.enemiesOnScreen, "enemy")} on screen` : "";
  const still = r.view.directions.still;
  const forecast = still === undefined ? "" : `, where ${outlook(r, still).replace(/^Tibo /, "it ")}`;
  const spot = spotLine(r);
  const purpose = goal === "stay" ? ", which is what the goal needs" : goal === undefined ? "" : ", no closer to the goal";
  return `stand still${spot === undefined ? "" : ` ${spot}`}${crowd}${forecast}${purpose}`;
}

/** What a move costs over the forecast's horizon as a share of max health, from the game's own simulation. */
export function moveCost(r: World, heading: Direction | "stay"): number | undefined {
  const f = forecastFor(r, heading);
  return f === undefined ? undefined : f.dead ? Number.POSITIVE_INFINITY : f.estimatedDamage / r.maxHp;
}

export function cheapestMove(r: World): number | undefined {
  const costs = [...DIRECTIONS, "stay" as const].map((h) => moveCost(r, h));
  return costs.every((c) => c !== undefined) ? Math.min(...(costs as number[])) : undefined;
}

// Small decision models judge one concrete option far better than they rank nine at once, so
// every direction (and standing still) is its own question. On replayed Nightmare steps, a 0-4
// hurt score per move picked a least-damaging move 98-100% of the time with Jev, against 95%
// for a yes/no danger question (which, like Laya, rated a fatal move safest when its description
// listed few threats). Only moves rated about as safe as the safest, and safe outright, compete
// on usefulness: letting any near-safest move through doubled the health lost per step.
const HURT_SCALE = ["takes no damage", "gets scratched", "gets badly hurt", "gets very badly hurt", "dies"];

const SAFE_ENOUGH = 0.5;

function goalWords(p: Pursuit, aim: Course): string {
  if (p.goal.kind === "evade") return "keep away from enemies";
  if (p.goal.kind === "explore") return `walk ${p.goal.dir} to look for chests and shrines`;
  if (p.goal.kind === "elite") return `${p.title.toLowerCase()}: keep it within ${ELITE_REACH} units so Tibo's weapons kill it, without touching it; it has ${aim.progress}`;
  return aim.heading === "stay" ? `${p.title.toLowerCase()}: stay where Tibo stands, ${aim.progress}` : `${p.title.toLowerCase()}, ${aim.progress}`;
}

/** A dash charge, a dash template, and an enemy or bullet close enough that dashing could matter. */
export function dashWorthAsking(r: World): boolean {
  const still = r.view.directions.still;
  return templates.action.dash.trim() !== "" && r.view.tibo.dash.charges > 0 && (r.view.attacks.bullets.length > 0 || (still !== undefined && (still.dead === true || still.estimatedDamage > 0)));
}

/** How sure the action model must be to dash: lower while a boss is close, if the knobs say so. */
function dashBar(r: World): number {
  const k = knobs();
  return k.bossDashRange > 0 && r.bosses.some((b) => b.dist <= k.bossDashRange) ? k.bossDashThreshold : k.dashThreshold;
}

/**
 * The page is walking Tibo to its goal without a model, which is when crowds land most of their
 * hits, so the action model still gets the dash question; a yes dashes the way Tibo walks.
 */
export async function dashOnTheWay(r: World, p: Pursuit, heading: Direction, log: RunLog) {
  const vars = stateVars(r, { goal: goalWords(p, { heading, progress: "" }) });
  const started = performance.now();
  const answers = await decide(render(templates.action.state, vars), { dash: { type: "noul", instructions: render(templates.action.dash, vars) } });
  if (answers === undefined) return;
  const odds = answers.dash?.noul ?? 0;
  if (odds <= dashBar(r)) return;
  log.write(r, { event: "move", model: MODEL, goal: p.id, action: `dash ${heading}`, reason: "the page was walking to the goal, and the action model said to dash", detail: dashCell.encode(odds, true), ms: Math.round(performance.now() - started) });
  await command({ type: "dash", dir: heading });
}

/** The way to the goal costs more than the safest move: the action model picks this step. */
export async function steer(r: World, p: Pursuit, aim: Course, log: RunLog, why: string) {
  const goal = goalWords(p, aim);
  const moves: Record<string, string> = {};
  for (const s of r.sectors) moves[s.dir] = `walk ${s.dir}: ${describe(r, s, aim.heading)}`;
  moves.stay = standing(r, aim.heading);
  // The game's own simulation prices every move over its horizon, and Laya cannot weigh those
  // prices: on replayed states it rated a fatal move safest in 4 of 8, and it stood in hot oil
  // forecast "very badly hurt" for ten seconds while every step out was "scratched" (its danger
  // score tracks how many threats a description lists, not which). So moves that cost clearly
  // more than the cheapest are not offered, like a card Tibo cannot afford.
  const cost = (k: string) => moveCost(r, k === "stay" ? "stay" : (k as Direction));
  const offered = { ...moves };
  const cheapest = cheapestMove(r);
  const bossClose = knobs().bossOfferRange > 0 && r.bosses.some((b) => b.dist <= knobs().bossOfferRange);
  if (cheapest !== undefined && !bossClose) for (const k of Object.keys(moves)) if ((cost(k) ?? 0) > cheapest + knobs().extraDamage) delete moves[k];
  const vars = stateVars(r, { goal });
  const state = render(templates.action.state, vars);
  const ask = (template: string, move: string) => render(template, { ...vars, move: () => move });
  const questions: Record<string, Question> = {};
  for (const [key, text] of Object.entries(moves)) {
    questions[key] = { type: "score", instructions: ask(templates.action.hurt, text), criteria: HURT_SCALE };
    questions[`useful:${key}`] = { type: "noul", instructions: ask(templates.action.useful, text) };
  }
  const canDash = dashWorthAsking(r);
  if (canDash) questions.dash = { type: "noul", instructions: render(templates.action.dash, vars) };
  const started = performance.now();
  const answered = await decide(state, questions);
  const answers = answered ?? {};
  const ms = Math.round(performance.now() - started);
  // A step the model never answered says nothing about how long its answers take.
  if (answered !== undefined) noteModelStep(ms);
  const risk = (k: string) => answers[k]?.noul ?? 1;
  const safest = Math.min(...Object.keys(moves).map(risk));
  const safe = Object.keys(moves).filter((k) => risk(k) <= safest + knobs().safeMargin && (risk(k) < SAFE_ENOUGH || risk(k) === safest));
  // Without an answer, the forecast's cheapest move stands in for the model's.
  const choice =
    answered === undefined
      ? (Object.keys(moves).sort((x, y) => (cost(x) ?? 0) - (cost(y) ?? 0))[0] ?? "stay")
      : (safe.sort((x, y) => (answers[`useful:${y}`]?.noul ?? 0) - (answers[`useful:${x}`]?.noul ?? 0) || risk(x) - risk(y))[0] ?? "stay");
  const dir = (DIRECTIONS as readonly string[]).includes(choice) ? (choice as Direction) : undefined;
  const dash = dir !== undefined && (answers.dash?.noul ?? 0) > dashBar(r);
  if (aim.heading === "stay" && dir !== undefined) p.steppedOff++;
  const dashWhy =
    templates.action.dash.trim() === ""
      ? "dash not asked: the template is empty"
      : r.view.tibo.dash.charges === 0
        ? "dash not asked: no charge"
        : !canDash
          ? "dash not asked: nothing close"
          : dashCell.encode(answers.dash?.noul ?? 0, dash);
  const ruledOut = Object.keys(offered).length - Object.keys(moves).length;
  const forecast = (k: string) => {
    const f = forecastFor(r, k === "stay" ? "stay" : (k as Direction));
    return f === undefined ? undefined : { damage: f.estimatedDamage, dead: f.dead === true };
  };
  const weighed: MoveOption[] = Object.entries(offered).map(([k, description]) => {
    const f = forecast(k);
    const hurt = answers[k]?.noul;
    const useful = answers[`useful:${k}`]?.noul;
    return {
      move: k === "stay" ? "still" : (k as Direction),
      description,
      ...(f === undefined ? {} : { forecast: f }),
      ...(hurt === undefined ? {} : { hurt }),
      ...(useful === undefined ? {} : { useful }),
      outcome: k === choice ? "chosen" : !(k in moves) ? "ruled out" : safe.includes(k) ? "safe" : "risky",
    };
  });
  const move = dir === undefined ? "stand still" : `${dash ? "dash" : "walk"} ${dir}`;
  say({
    role: "action",
    model: MODEL,
    time: r.time,
    text: `${move[0]?.toUpperCase()}${move.slice(1)}`,
    ...(dash ? { tag: "Dash" } : {}),
    inspect: {
      kind: "moves",
      situation: state,
      questions: [`For each move: ${ask(templates.action.hurt, "<the move>")} (${HURT_SCALE.join(", ")})`, `For each move: ${ask(templates.action.useful, "<the move>")}`, ...(canDash ? [render(templates.action.dash, vars)] : [])],
      moves: weighed,
      ...(answers.dash?.noul === undefined ? {} : { dash: { odds: answers.dash.noul, above: dashBar(r) } }),
    },
    detail: [`for: ${p.title}`, `Tibo ${HURT_SCALE[Math.round(answers[choice]?.score ?? 0)] ?? "?"}`, ...(ruledOut > 0 ? [`${ruledOut} costlier ${ruledOut === 1 ? "move" : "moves"} ruled out`] : [])].join(" · "),
  });
  log.write(r, {
    event: "move",
    model: MODEL,
    reason: answered === undefined ? `${why}; the action model ${UNANSWERED}, so the forecast's cheapest move stands in` : why,
    goal: p.id,
    action: move,
    options: weighed.map((w) => `${w.move} ${w.forecast ?? "?"} hurt ${w.hurt ?? "-"} useful ${w.useful === undefined ? "-" : Math.round(w.useful * 100)}%${w.outcome === "ruled out" ? " (ruled out)" : ""}`).join("; "),
    detail: dashWhy,
    ms,
  });
  if (dash) await command({ type: "dash", dir });
  return dir === undefined ? command({ type: "stop" }) : send({ type: "move", dir });
}
