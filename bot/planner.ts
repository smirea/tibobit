// The planner is the decision model in a second persona. Before every decision it reads the state
// its template asks for, which the coach wrote for this run with the game knowledge in it. It
// picks every level-up, chest and shrine option, and weighs every goal Tibo could take on next,
// one question each; the most promising becomes the goal. It is asked when a goal ends, at every
// choice, when a boss appears, and every planEvery() seconds, so a
// better goal can take over. Under Full Self Driving it only picks: the panel's state machine sets the goals.

import { onChest, plural, priceWords, said, spotSaid } from "./phrasing";
import { knobs, planEvery, templates } from "./run-templates";
import { blocks, type Card, cards } from "./blocks";
import { PLAN_MODEL } from "./config";
import { RunNotes } from "./run-notes";
import { command, drive, piloted, say } from "./server";
import { decide, type Question } from "./decider";
import { talliesOf, totalsBetween, totalsLines } from "./tallies";
import { giveUps, type Goal, goalId, goalTitle, locate, outcomes, pursuit, setGoal } from "./goals";
import { render } from "./templates";
import { type CardOption, type Inspect, PICK_SHOW_MS } from "../protocol/pilot";
import { GOAL_OPTIONS, HURT_SECONDS, PLAN_RANGE } from "./limits";
import { type EndJson, recentLoss, type World } from "./world";
import { RunLog } from "./run-log/writer";
import { clock } from "../clock";
import { UNANSWERED, weighedCell } from "./run-log/cells";

type GoalOption = { goal: Goal; text: string };

/** Every goal Tibo could take on next, in words the model can weigh one at a time. */
function goalOptions(r: World): GoalOption[] {
  const given = (id: string) => {
    const until = giveUps.get(id);
    const last = [...outcomes].reverse().find((o) => o.id === id && !o.success);
    return until === undefined || until <= r.time || last === undefined ? "" : `; Tibo gave up on it at ${clock(last.time)} because ${last.outcome}`;
  };
  const ready = r.view.tibo.evolves;
  return [
    ...r.chests
      .filter((c) => c.dist < PLAN_RANGE)
      .slice(0, GOAL_OPTIONS.chests)
      .map((c) => ({
        goal: { kind: "chest" as const, uid: c.id },
        text: `${onChest(c) ? "stay on the chest Tibo stands on" : `walk to the chest ${Math.round(c.dist)} away to the ${c.dir} and stand on it`} for ${c.chargeSeconds} seconds to open it, which gives a free pick${ready.length === 0 ? "" : ` and evolves ${ready.join(" and ")}`}${given(goalId({ kind: "chest", uid: c.id }))}`,
      })),
    ...r.spots
      .filter((x) => x.chargeSeconds > 0 && x.dist < PLAN_RANGE)
      .slice(0, GOAL_OPTIONS.spots)
      .map((x) => ({
        goal: { kind: "poi" as const, uid: x.id },
        text: `${x.inside ? `stay inside the ${x.name}` : `walk to the ${x.name} ${Math.round(x.dist)} away to the ${x.dir} and stand inside it`} for ${x.chargeSeconds} seconds${spotSaid(r.book, x.type) === "" ? "" : ` (${spotSaid(r.book, x.type).replace(/\.$/, "")})`}${priceWords(x, r)}${given(goalId({ kind: "poi", uid: x.id }))}`,
      })),
    ...r.food
      .filter((x) => x.dist < PLAN_RANGE)
      .slice(0, GOAL_OPTIONS.food)
      .map((x) => ({ goal: { kind: "food" as const, uid: x.id }, text: `walk to the food ${Math.round(x.dist)} away to the ${x.dir}, which heals Tibo` })),
    // The knobs can keep elite fights off the table early or at low health, which no prompt rule
    // managed: on Nightmare 2 a 1:00 elite fight cost 37 to 103 health in live games.
    ...r.elites
      .filter((e) => e.dist < PLAN_RANGE && r.time >= knobs().eliteFrom && r.hp >= knobs().eliteMinHp * r.maxHp)
      .slice(0, GOAL_OPTIONS.elites)
      .map((e) => ({
        goal: { kind: "elite" as const, uid: e.id },
        text: `fight the ${e.name} elite ${Math.round(e.dist)} away to the ${e.dir} (${e.hp} health left): keep it within reach of Tibo's weapons for up to ${knobs().eliteSeconds} seconds until it dies, which drops a chest${given(goalId({ kind: "elite", uid: e.id }))}`,
      })),
    ...r.sectors.map((s) => ({
      goal: { kind: "explore" as const, dir: s.dir },
      text: `explore ${s.dir}: walk ${knobs().exploreDistance} units that way, stopping at the first new chest, toward ${plural(s.enemies, "enemy")} on screen that way`,
    })),
    { goal: { kind: "evade" as const }, text: `keep away from enemies for ${knobs().evadeSeconds} seconds` },
  ];
}

type PlanAnswer = { pick?: Card; ms: number; cards?: CardOption[]; goals: CardOption[] };

export class Planner {
  calls = 0;
  /** A card was just taken, so the goal is planned again with it in hand. */
  picked = false;
  private lastAsked = Number.NEGATIVE_INFINITY;
  /** Bosses already planned for, by id: each new one gets a plan the moment it shows up. */
  private seenBosses = new Set<string>();

  constructor(
    readonly notes: RunNotes,
    private log: RunLog,
  ) {}

  /** Why to plan again while a goal is under way, if anything. */
  due(r: World): string | undefined {
    const fresh = r.bosses.find((b) => !this.seenBosses.has(b.type));
    let why: string | undefined;
    if (this.picked) why = "a card was just taken";
    else if (fresh !== undefined) why = `a boss appeared: ${fresh.name}, ${Math.round(fresh.dist)} away to the ${fresh.dir}`;
    else if (knobs().planOnHurt > 0 && recentLoss(r) >= knobs().planOnHurt * r.maxHp && r.time - this.lastAsked >= HURT_SECONDS) why = `Tibo lost ${Math.round(recentLoss(r))} health in the last ${HURT_SECONDS} seconds`;
    else if (r.time - this.lastAsked >= planEvery()) why = `${planEvery()} seconds passed`;
    for (const b of r.bosses) this.seenBosses.add(b.type);
    return why;
  }

  /** Picks among `options` when a choice is open, and sets the next goal. */
  async plan(r: World, why: string, options?: Card[]): Promise<PlanAnswer> {
    this.lastAsked = r.time;
    if (options === undefined) this.picked = false;
    this.calls++;
    const vars = { ...blocks(r, r.book), why: () => why };
    const state = render(templates.planner.state, vars);
    // Under Full Self Driving the panel's machine sets the goals, and the planner only picks cards.
    const goals = drive === undefined ? goalOptions(r) : [];
    const questions: Record<string, Question> = {};
    const goalQuestion = (text: string) => render(templates.planner.goal, { ...vars, goal: () => text });
    for (const [i, g] of goals.entries()) questions[`goal:${i}`] = { type: "noul", instructions: goalQuestion(g.text) };
    // The decision API reads a choice's keys, not their descriptions: replayed picks did not change
    // at all when a note was added to the description, and Laya took a new weapon in 4 of 6 offers
    // once the key said so. So everything the model should weigh goes into the key.
    const keys = new Map<string, Card>();
    for (const [i, o] of (options ?? []).entries()) keys.set(`${i}: ${o.text}`, o);
    const kind = r.view.choice?.kind ?? "choice";
    const question = render(templates.planner.pick, { ...vars, choice: () => kind });
    if (options !== undefined) questions.pick = { type: "choice", instructions: question, criteria: Object.fromEntries([...keys].map(([k, o]) => [k, o.text])) };
    const started = performance.now();
    const answers = await decide(state, questions, PLAN_MODEL, options !== undefined);
    const ms = Math.round(performance.now() - started);
    if (answers === undefined) {
      // The goal under way stands; with none, Tibo idles until the planner is asked again.
      if (pursuit === undefined && drive === undefined) setGoal({ kind: "evade" }, r, this.log, { kind: "plan", prompt: state, goals: [] });
      this.log.write(r, { event: "plan", model: PLAN_MODEL, reason: `${why}; the planner ${UNANSWERED}`, goal: pursuit?.id ?? "", action: "kept the goal", ms });
      return { ms, goals: [] };
    }

    const score = (i: number) => answers[`goal:${i}`]?.noul ?? 0;
    const best = goals.map((_, i) => i).sort((x, y) => score(y) - score(x))[0] ?? -1;
    const goal = goals[best]?.goal;
    const pickKey = answers.pick?.choice;
    const pick = options === undefined ? undefined : (keys.get(pickKey ?? "") ?? [...keys].find(([k]) => k.split(":")[0] === (pickKey ?? "").split(":")[0])?.[1] ?? options[0]);
    const cards: CardOption[] | undefined =
      options === undefined
        ? undefined
        : [...keys].map(([k, o]) => {
            const probability = answers.pick?.probabilities?.[k];
            return { card: o.name, notes: k.slice(k.indexOf(": ") + 2), ...(probability === undefined ? {} : { probability }), chosen: o === pick, ...("index" in o.action ? { index: o.action.index } : {}) };
          });
    const weighed: CardOption[] = goals.map((g, i) => ({ card: goalTitle(g.goal, r), notes: g.text, probability: score(i), chosen: i === best }));
    const decision: Inspect = {
      kind: "plan",
      prompt: [state, ...(options === undefined ? [] : [question]), ...(goal === undefined ? [] : [`For each goal: ${goalQuestion("…")}`])].join("\n\n"),
      ...(cards === undefined ? {} : { choices: cards }),
      goals: weighed,
    };
    if (goal !== undefined) setGoal(goal, r, this.log, decision);

    const title = goal === undefined ? undefined : goalTitle(goal, r);
    say({
      role: "planner",
      model: PLAN_MODEL,
      time: r.time,
      text: [pick === undefined ? "" : `Take ${pick.name}.`, title === undefined ? "" : `Goal: ${title} (${Math.round(score(best) * 100)}%).`].filter(Boolean).join(" "),
      detail: `Asked because ${why}.`,
      inspect: decision,
    });
    // The log names where each target is, so a review can tell a near spot refused from a far one.
    const placed = weighed.map((w, i) => {
      const g = goals[i]?.goal;
      const t = g !== undefined && "uid" in g ? locate(r, g) : undefined;
      return t === undefined ? w : { ...w, card: `${w.card} (${Math.round(t.dist)} ${t.dir})` };
    });
    this.log.write(r, {
      event: pick === undefined ? "plan" : "pick",
      model: PLAN_MODEL,
      reason: why,
      goal: goal === undefined ? (pursuit?.id ?? "") : goalId(goal),
      action: pick === undefined ? (title ?? "") : pick.name,
      options: weighedCell.encode(placed, cards),
      ms,
    });
    if (pick !== undefined) {
      this.notes.picks.push(`- **${clock(r.time)}** ${kind}: took ${pick.name} from ${options?.map((o) => o.name).join(", ")}.`);
    }
    return { ...(pick === undefined ? {} : { pick }), ms, ...(cards === undefined ? {} : { cards }), goals: weighed };
  }

  /** The run ended: its notes are written. */
  async finish(end: EndJson, last: World | undefined, ladder: number | undefined, healed: number) {
    const lived = Math.round(end.runClock * 10) / 10;
    const kills = Number(end.run.kills ?? 0);
    await this.notes.finish({
      lived,
      ending: `${last !== undefined && lived >= last.view.world.winAt ? `won (passed ${clock(last.view.world.winAt)}), then ` : ""}died at ${clock(lived)}, level ${end.loadout.level}, ${kills} kills`,
      outcome: [
        `Lived **${clock(lived)}** (${lived}s), level ${end.loadout.level}, ${kills} kills.`,
        ...totalsLines(totalsBetween(talliesOf(end))),
        `Health gained over the run, by food, regeneration and anything else: about ${healed} (the game does not say from what).`,
        ...(last === undefined ? [] : loadoutLines(last)),
        `Planner asked ${this.calls} times.`,
        ...(ladder === undefined ? [] : [`Nightmare ladder after the run: ${ladder === 0 ? "no level won yet" : `won up to Nightmare ${ladder}`}, so the next Open World Nightmare run plays Nightmare ${ladder + 1}.`]),
      ],
    });
  }

}

export const loadoutLines = (r: World) => [
  `Weapons: ${r.weapons.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}.`,
  `Passives: ${r.passives.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}.`,
  `Items: ${r.items.map((i) => `${i.name} x${i.count}${said(r.book, "item", i.id)}`).join("; ") || "none"}.`,
];

// Picks that did nothing (an item Tibo cannot afford, say) for the choice now open, so they are
// not taken again and again.
let deadPicks: { signature: string; names: Set<string> } = { signature: "", names: new Set() };

export async function choose(r: World, planner: Planner, log: RunLog) {
  const options = cards(r);
  const open = r.view.choice?.kind ?? "choice";
  if (options.length === 0) throw new Error(`a ${open} choice with nothing to take`);
  const signature = `${r.time}|${options.map((o) => o.text).join("|")}`;
  if (deadPicks.signature !== signature) deadPicks = { signature, names: new Set() };
  const takeable = options.filter((o) => !deadPicks.names.has(o.text));
  if (takeable.length === 0) throw new Error(`every option of this ${open} choice was tried without closing it: ${options.map((o) => o.name).join(", ")}`);
  let picked = takeable.length === 1 ? takeable[0] : undefined;
  if (picked === undefined) {
    picked = (await planner.plan(r, `a ${open} choice opened`, takeable)).pick;
    // The panel shows the odds over the cards and lands a highlight on the pick before it is taken;
    // the choice freezes the game, so the wait costs no game time.
    if (piloted) await Bun.sleep(PICK_SHOW_MS);
  } else log.write(r, { event: "pick", model: "none", reason: open, action: picked.name, detail: "the only option that can be taken" });
  if (picked === undefined) throw new Error(`no ${open} option was picked`);
  deadPicks.names.add(picked.text);
  planner.picked = true;
  return command({ type: "choose", action: picked.action });
}
