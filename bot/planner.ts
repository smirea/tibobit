import { book, onChest, plural, priceWords, readBook, said, spotSaid } from "./phrasing";
import { knobs, planEvery, templates } from "./run-templates";
import { blocks, type Card, cards } from "./blocks";
import { WIN_SECONDS } from "./run-context";
import { PLAN_MODEL } from "./config";
import { RunNotes } from "./run-notes";
import { command, PICK_SHOW_MS, piloted, say } from "./server";
import { decide, type Question } from "./decider";
import { talliesOf, totalsBetween, totalsLines } from "./tallies";
import { giveUps, type Goal, goalId, goalTitle, locate, outcomes, setGoal } from "./goals";
import { render } from "./templates";
import type { CardOption, Inspect } from "../protocol/pilot";
import { PLAN_RANGE } from "./limits";
import type { EndJson, World } from "./world";
import { RunLog } from "./run-log/writer";
import { clock } from "../clock";

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
      .slice(0, 4)
      .map((c) => ({
        goal: { kind: "chest" as const, uid: c.id },
        text: `${onChest(c) ? "stay on the chest Tibo stands on" : `walk to the chest ${Math.round(c.dist)} away to the ${c.dir} and stand on it`} for ${c.chargeSeconds} seconds to open it, which gives a free pick${ready.length === 0 ? "" : ` and evolves ${ready.join(" and ")}`}${given(`C${c.id}`)}`,
      })),
    ...r.spots
      .filter((x) => x.chargeSeconds > 0 && x.dist < PLAN_RANGE)
      .slice(0, 6)
      .map((x) => ({
        goal: { kind: "poi" as const, uid: x.id },
        text: `${x.inside ? `stay inside the ${x.name}` : `walk to the ${x.name} ${Math.round(x.dist)} away to the ${x.dir} and stand inside it`} for ${x.chargeSeconds} seconds${spotSaid(x.type) === "" ? "" : ` (${spotSaid(x.type).replace(/\.$/, "")})`}${priceWords(x, r)}${given(`P${x.id}`)}`,
      })),
    ...r.food
      .filter((x) => x.dist < PLAN_RANGE)
      .slice(0, 2)
      .map((x) => ({ goal: { kind: "food" as const, uid: x.id }, text: `walk to the food ${Math.round(x.dist)} away to the ${x.dir}, which heals Tibo` })),
    // The knobs can keep elite fights off the table early or at low health, which no prompt rule
    // managed: on Nightmare 2 a 1:00 elite fight cost 37 to 103 health in live games.
    ...r.elites
      .filter((e) => e.dist < PLAN_RANGE && r.time >= knobs().eliteFrom && r.hp >= knobs().eliteMinHp * r.maxHp)
      .slice(0, 2)
      .map((e) => ({
        goal: { kind: "elite" as const, uid: e.id },
        text: `fight the ${e.name} elite ${Math.round(e.dist)} away to the ${e.dir} (${e.hp} health left): keep it within reach of Tibo's weapons for up to ${knobs().eliteSeconds} seconds until it dies, which drops a chest${given(`E${e.id}`)}`,
      })),
    ...r.sectors.map((s) => ({
      goal: { kind: "explore" as const, dir: s.dir },
      text: `explore ${s.dir}: walk ${knobs().exploreDistance} units that way, stopping at the first new chest, toward ${plural(s.enemies, "enemy")} on screen that way`,
    })),
    { goal: { kind: "evade" }, text: `keep away from enemies for ${knobs().evadeSeconds} seconds` },
  ];
}

type PlanAnswer = { pick?: Card; goal: Goal; ms: number; cards?: CardOption[]; goals: CardOption[] };

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
    else if (r.time - this.lastAsked >= planEvery()) why = `${planEvery()} seconds passed`;
    for (const b of r.bosses) this.seenBosses.add(b.type);
    return why;
  }

  /** Picks among `options` when a choice is open, and sets the next goal. */
  async plan(r: World, why: string, options?: Card[]): Promise<PlanAnswer> {
    this.lastAsked = r.time;
    if (options === undefined) this.picked = false;
    this.calls++;
    const b = await readBook();
    if (b === undefined) throw new Error("the game's encyclopedia has not arrived; the bot reads it before the first decision");
    const vars = { ...blocks(r, b), why: () => why };
    const state = render(templates.planner.state, vars);
    const goals = goalOptions(r);
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
    const answers = await decide(state, questions, PLAN_MODEL);
    const ms = Math.round(performance.now() - started);

    const score = (i: number) => answers[`goal:${i}`]?.noul ?? 0;
    const best = goals.map((_, i) => i).sort((x, y) => score(y) - score(x))[0] ?? goals.length - 1;
    const goal = goals[best]?.goal ?? { kind: "evade" };
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
      prompt: [state, ...(options === undefined ? [] : [question]), `For each goal: ${goalQuestion("…")}`].join("\n\n"),
      ...(cards === undefined ? {} : { choices: cards }),
      goals: weighed,
    };
    setGoal(goal, r, this.log, decision);

    const title = goalTitle(goal, r);
    say({
      role: "planner",
      model: PLAN_MODEL,
      time: r.time,
      text: [pick === undefined ? "" : `Take ${pick.name}.`, `Goal: ${title} (${Math.round(score(best) * 100)}%).`].filter(Boolean).join(" "),
      detail: `Asked because ${why}.`,
      inspect: decision,
    });
    // The log names where each target is, so a review can tell a near spot refused from a far one.
    const placed = weighed.map((w, i) => {
      const g = goals[i]?.goal;
      const t = g !== undefined && "uid" in g ? locate(r, g) : undefined;
      return t === undefined ? w : { ...w, card: `${w.card} (${Math.round(t.dist)} ${t.dir})` };
    });
    const odds = (xs: CardOption[]) => xs.map((x) => `${x.card} ${x.probability === undefined ? "?" : Math.round(x.probability * 100)}%`).join("; ");
    this.log.write(r, {
      event: pick === undefined ? "plan" : "pick",
      model: PLAN_MODEL,
      reason: why,
      goal: goalId(goal),
      action: pick === undefined ? title : pick.name,
      options: cards === undefined ? odds(placed) : `${odds(cards)} | goals: ${odds(placed)}`,
      ms,
    });
    if (pick !== undefined) {
      this.notes.picks.push(`- **${clock(r.time)}** ${kind}: took ${pick.name} from ${options?.map((o) => o.name).join(", ")}.`);
    }
    return { ...(pick === undefined ? {} : { pick }), goal, ms, ...(cards === undefined ? {} : { cards }), goals: weighed };
  }

  /** The run ended: its notes are written, then the coach reviews it. */
  async finish(end: EndJson, last: World | undefined, ladder: number | undefined, healed: number) {
    const lived = Math.round(end.runClock * 10) / 10;
    const kills = Number(end.run.kills ?? 0);
    await this.notes.finish({
      lived,
      ending: `${lived >= WIN_SECONDS ? "won (passed 20:00), then " : ""}died at ${clock(lived)}, level ${end.loadout.level}, ${kills} kills`,
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
  `Items: ${r.items.map((i) => `${i.name} x${i.count}${book === undefined ? "" : said(book, "item", i.id)}`).join("; ") || "none"}.`,
];

// Picks that did nothing (an item Tibo cannot afford, say) for the choice now open, so they are
// not taken again and again.
let deadPicks: { signature: string; names: Set<string> } = { signature: "", names: new Set() };

export async function choose(r: World, planner: Planner, log: RunLog) {
  const b = await readBook();
  if (b === undefined) throw new Error("the game's encyclopedia has not arrived; the bot reads it before the first decision");
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
