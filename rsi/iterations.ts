import path from "node:path";
import { checkGames, checkGyms, checkPlaybook, explores, type GymRequest, unexplored } from "./checks";
import { editableFiles, facts, GAMES_CONTRACT, GYMS_CONTRACT, type LastGames, PLAYBOOK_CONTRACT } from "./coach/prompt";
import { gameEntry, gameLoops, outcome } from "./store/games";
import { readHeld, recordHeld } from "./store/held";
import type { Templates } from "../bot/templates";
import { NOTES_DIR, notesField, notesFiles, notesTemplates, withReview } from "../bot/notes";
import { IDS, ladder, LOGS, main, playGame, refreshGames, slots } from "./session";
import { freshSeed, type GameResult, type GameSpec, onSlots } from "./training/slots";
import { ask, NO_TOOLS } from "./coach/ask";
import { afterEdits, applyEdits, checkEdits, EDITS_CONTRACT, type LoopEdits, readTables } from "./store/edits";
import { type Playbook, readPlaybook, writePlaybook } from "../bot/playbook";
import { COACH_LABEL, EVAL_SEED } from "./flags";
import { appendLog, type CoachState, REFLECTION, tagOf } from "./store/coach-log";
import { isText } from "../protocol/parse";
import { EXPLORE_GAMES, EXPLORE_PER_ITERATION, MAX_GAME_SECONDS, PROMPT_LIMIT } from "./rules";
import { type Gym, readGyms, updateGyms, upsertGym } from "./store/gyms";
import { checkPromptPart, PROMPT_TITLES, type PromptKey, promptLoss, readPrompts, writePrompts } from "./store/coach-prompts";
import { addGames, overdueAreas } from "./store/experiments";
import { ENTRY, ROOT } from "../paths";
import { buildClaimed, buildGym, claimPending } from "./gym-builds";
import { stopping } from "./stop";
import { logForPrompt } from "../bot/run-log/reader";
import { botArgv, JEV } from "../bot/args";
import type { NotedRun } from "../bot/trial-result";
import { nightmareLevel } from "../protocol/commands";
type ExperimentReply = { summary: string; edits: LoopEdits; games: GameSpec[]; gyms: GymRequest; playbook?: Playbook };

export async function experimentIteration(state: CoachState) {
  const tag = tagOf(state);
  const playbook = await readPlaybook();
  const instructions = (await readPrompts()).experiments;
  const prompt = [
    editableFiles("experiments"),
    instructions,
    await facts(state, playbook),
    "# Reply",
    NO_TOOLS,
    '"summary": what the last games showed and what this iteration tests and why, in a short paragraph; it goes into your log.',
    GAMES_CONTRACT,
    GYMS_CONTRACT,
    PLAYBOOK_CONTRACT,
    EDITS_CONTRACT,
  ].join("\n\n");
  const before = await readTables();
  const gymsBefore = await readGyms();
  const heldBefore = await readHeld();
  const reply = await ask<ExperimentReply>(tag, prompt, (raw) => {
    const errors: string[] = [];
    const edits = checkEdits(raw, before);
    if ("errors" in edits) errors.push(...edits.errors);
    if (!isText(raw.summary)) errors.push("summary must be a short paragraph");
    const gyms = checkGyms(raw.gyms, gymsBefore, tag, errors);
    const after = afterEdits(before, "value" in edits ? edits.value : undefined);
    const pb = checkPlaybook(raw.playbook, playbook, tag, after.experiments, errors);
    const experiments = new Set(after.experiments.map((e) => e.name));
    const games = checkGames(raw.games, { playbook: pb ?? playbook, gyms: [...gymsBefore, ...gyms.build], experiments, tag }, errors);
    const overdue = overdueAreas(after.experiments, state.loop);
    const areaOf = (name: string | undefined) => after.experiments.find((e) => e.name === name)?.area;
    const open = unexplored(heldBefore);
    const exploring = games.map((g) => explores(g, open));
    const tried = new Set(exploring.flat());
    const [wantTried, wantGames] = [Math.min(EXPLORE_PER_ITERATION, open.size), Math.min(EXPLORE_GAMES, open.size)];
    if (tried.size < wantTried || exploring.filter((ids) => ids.length > 0).length < wantGames)
      errors.push(
        `${open.size} base weapons and passives have never been held in a game (see "Never held"). Until none are left, each iteration tries at least ${wantTried} of them over at least ${wantGames} games, as a game's starting weapon or in its loadout; this reply tries ${tried.size} over ${exploring.filter((ids) => ids.length > 0).length} games`,
      );
    if (overdue.length > 0 && !games.some((g) => (overdue as readonly string[]).includes(areaOf(g.experiment) ?? "")))
      errors.push(`no game this loop or the last has tested ${overdue.join(", ")}; this iteration must play at least one game for an experiment in one of those areas`);
    if (errors.length > 0 || !("value" in edits)) return { errors };
    return { value: { summary: String(raw.summary), edits: edits.value, games, gyms, ...(pb === undefined ? {} : { playbook: pb }) } };
  });
  if (reply === undefined) {
    await appendLog(state, "no usable plan", "The coach gave no usable reply, so this iteration played nothing.");
    return;
  }
  const done = await applyEdits(reply.edits, tag);
  if (reply.playbook !== undefined) {
    await writePlaybook(reply.playbook);
    done.push("the playbook");
  }
  await updateGyms((gyms) => {
    for (const name of reply.gyms.retire) for (const g of gyms) if (g.name === name) g.status = "retired";
    for (const g of reply.gyms.build) upsertGym(gyms, g);
  });
  console.log(`${tag}: ${reply.summary}\n  changed ${done.join(", ") || "nothing"}; ${reply.games.length} games`);
  const templates = (await readPlaybook()).templates;
  await refreshGames();
  const gymLines = await buildClaimed(await claimPending(), templates);
  const gyms = await readGyms();
  const results = await onSlots(slots, reply.games, async (slot, spec) => {
    console.log(`${spec.id} on ${slot.name}: ${spec.label}`);
    // A gym is built again on the slot that needs it, which runs the newest game build.
    const r = await playGame(slot, spec, gyms, (g) => buildGym(slot, g, templates));
    console.log(`${spec.id}: ${outcome(r)}`);
    return r;
  });
  // Games cut off by a stop are not results; the iteration plays again after a restart.
  if (stopping) return;
  for (const r of results) {
    const save = r.spec.saveGym;
    const end = r.result?.end;
    if (r.savedGym === undefined || save === undefined || end === undefined) continue;
    const start = r.spec.from;
    const gym: Gym = {
      name: save.name,
      status: "ready",
      purpose: save.purpose,
      coach: "coach",
      created: tag,
      difficulty: nightmareLevel(r.difficulty),
      at: Math.round(end),
      weapon: "fresh" in start ? start.fresh.weapon : "",
      ...(r.spec.loadout === undefined ? {} : { loadout: r.spec.loadout }),
      seed: r.seed,
      source: `saved at the end of game ${r.spec.id}`,
      templates: r.spec.templates,
      checkpoint: r.savedGym,
    };
    await updateGyms((all) => upsertGym(all, gym));
  }
  const usedGyms = new Set(results.flatMap((r) => ("gym" in r.spec.from && r.error === undefined ? [r.spec.from.gym] : [])));
  if (usedGyms.size > 0)
    await updateGyms((all) => {
      for (const g of all) if (usedGyms.has(g.name) && !g.used?.some((u) => u.iteration === tag)) g.used = [...(g.used ?? []), { iteration: tag, at: new Date().toISOString() }];
    });
  for (const r of results) if (r.spec.experiment !== undefined) await addGames(r.spec.experiment, [gameEntry(r, gyms, false)]);
  for (const r of results) if (r.result !== undefined) await recordHeld(r.spec.id, [...r.result.weapons, ...r.result.passives]);
  await Bun.write(path.join(LOGS, "last-games.json"), JSON.stringify({ tag, results, gyms: gymLines } satisfies LastGames, null, 2));
  const lived = results.filter((r) => r.result !== undefined && !r.result.died).length;
  const played = [...new Set(results.map((r) => r.spec.experiment))].join(", ");
  // The games themselves are in their experiments' files; the log keeps what the coach made of them.
  await appendLog(state, "experiments", `${reply.summary}\n\nGames: ${results.length}, ${lived} lived, for ${played || "no experiment"}.${gymLines.length === 0 ? "" : ` ${gymLines.join(" ")}`}`);
}

type FullRunReply = { summary: string; intent: string; edits: LoopEdits };

/** The playbook the last full run played, from its notes: what a candidate playbook has to beat. */
async function lastFullRunPlaybook(): Promise<{ templates: Templates; weapon: string; from: string } | undefined> {
  for (const name of await notesFiles()) {
    const text = await Bun.file(path.join(NOTES_DIR, name)).text();
    const t = notesTemplates(text);
    if (!("value" in t)) throw new Error(`${name}: ${t.errors.join("; ")}`);
    const started = notesField(text, "Starting weapon")?.split(" ")[0] ?? "";
    return { templates: t.value, weapon: IDS.base.has(started) ? started : "", from: name };
  }
  return undefined;
}

type Rehearsal = { text: string; reverted: boolean };

/**
 * Before the full run: the playbook as it stands against the last full run's, on the same fresh
 * seeds at the full run's level from 0:00. Nine iterations of tuning one moment can break another
 * (sonnet-medium's loop 2 tuned minutes 16 to 20 and its full run died at 6:42), so a candidate
 * that lives in fewer games than the old playbook is set aside, and the full run plays the old one.
 */
async function rehearse(state: CoachState, playbook: Playbook): Promise<Rehearsal> {
  const tag = tagOf(state);
  const level = (await ladder()) + 1;
  await refreshGames();
  const baseline = await lastFullRunPlaybook();
  const same = baseline === undefined || (JSON.stringify(baseline.templates) === JSON.stringify(playbook.templates) && baseline.weapon === playbook.weapon);
  const seeds = slots.map(() => freshSeed(EVAL_SEED));
  const arm = (label: string, templates: Templates, weapon: string, mark: string): GameSpec[] =>
    seeds.map((seed, i) => ({ id: `${tag}.R${i + 1}${mark}`, label, from: { fresh: { difficulty: level, weapon, seed } }, seconds: MAX_GAME_SECONDS, templates, changes: "" }));
  const specs = [...arm("your playbook", playbook.templates, playbook.weapon, same ? "" : "a"), ...(same || baseline === undefined ? [] : arm("the last full run's playbook", baseline.templates, baseline.weapon, "b"))];
  const gyms = await readGyms();
  const results = await onSlots(slots, specs, async (slot, spec) => {
    const r = await playGame(slot, spec, gyms, (g) => buildGym(slot, g, spec.templates));
    console.log(`${spec.id}: ${outcome(r)}`);
    return r;
  });
  const livedOf = (rs: GameResult[]) => rs.filter((r) => r.result !== undefined && !r.result.died).length;
  const mine = results.filter((r) => r.spec.label === "your playbook");
  const theirs = results.filter((r) => r.spec.label !== "your playbook");
  const reverted = !same && baseline !== undefined && livedOf(mine) < livedOf(theirs);
  if (reverted && baseline !== undefined)
    await writePlaybook({ templates: baseline.templates, weapon: baseline.weapon, updated: tagOf(state), why: `set back by the loop before the full run: on the same ${seeds.length} fresh seeds the candidate lived in ${livedOf(mine)} games and the last full run's playbook (${baseline.from}) in ${livedOf(theirs)}` });
  const verdict = same
    ? `Your playbook is the one the last full run played; it lived in ${livedOf(mine)} of ${mine.length} fresh Nightmare ${level} games of ${MAX_GAME_SECONDS}s.`
    : `On the same ${seeds.length} fresh Nightmare ${level} seeds, your playbook lived in ${livedOf(mine)} games and the last full run's in ${livedOf(theirs)}. ${reverted ? "Yours did worse, so the loop set it back to the last full run's playbook, which the full run will play." : "Yours did no worse, so the full run plays it."}`;
  await appendLog(state, "rehearsal", verdict);
  return { reverted, text: ["## The rehearsal", verdict, ...results.map((r) => gameEntry(r, gyms, false))].join("\n\n") };
}

export async function fullRun(state: CoachState): Promise<NotedRun | undefined> {
  const tag = tagOf(state);
  const instructions = (await readPrompts()).fullRun;
  const rehearsal = await rehearse(state, await readPlaybook());
  if (stopping) return undefined;
  const playbook = await readPlaybook();
  const prompt = [
    editableFiles("fullRun"),
    instructions,
    rehearsal.text,
    await facts(state, playbook),
    "# Reply",
    NO_TOOLS,
    '"summary": what this loop\'s games showed and what the full run puts into practice, in a short paragraph for your log.',
    '"intent": what the full run plays and why, in a short paragraph for the notes and for a person watching. The full run plays the playbook the rehearsal settled; it cannot change here.',
    "Every experiment that had games this loop needs its verdict now: its result (confirmed, refuted or inconclusive) and status done, and a belief in beliefs.csv whose experiments column names it, carrying what it found.",
    EDITS_CONTRACT,
  ].join("\n\n");
  const before = await readTables();
  const reply = await ask<FullRunReply>(tag, prompt, (raw) => {
    const errors: string[] = [];
    const edits = checkEdits(raw, before);
    if ("errors" in edits) errors.push(...edits.errors);
    if (!isText(raw.summary)) errors.push("summary must be a short paragraph");
    if (!isText(raw.intent)) errors.push("intent must be a short paragraph");
    if (raw.playbook !== undefined) errors.push("the full run plays the playbook the rehearsal settled; leave playbook out, and change it in an experiment iteration, on evidence");
    const after = afterEdits(before, "value" in edits ? edits.value : undefined);
    for (const e of after.experiments.filter((x) => gameLoops(x).includes(state.loop))) {
      if (e.result === "" || e.status !== "done") errors.push(`experiment ${e.name} had games this loop: give it a result (confirmed, refuted or inconclusive) and status done`);
      if (!after.beliefs.some((b) => b.experiments.split(/[\s,;]+/).includes(e.name))) errors.push(`experiment ${e.name} had games this loop: add or update a belief whose experiments column names it, with what it found`);
    }
    if (errors.length > 0 || !("value" in edits)) return { errors };
    return { value: { summary: String(raw.summary), intent: String(raw.intent), edits: edits.value } };
  });
  if (reply !== undefined) await applyEdits(reply.edits, tag);
  const final = await readPlaybook();
  const intent = reply?.intent ?? "The coach gave no plan; the run plays the playbook as it stands.";
  await appendLog(state, "full run", reply?.summary ?? intent);
  const templatesFile = path.join(LOGS, `${tag}.full-run.templates.json`);
  await Bun.write(templatesFile, JSON.stringify(final.templates));
  await refreshGames();
  const resultFile = path.join(LOGS, `${tag}.full-run.result.json`);
  // A full run played again after a stop must not be taken for the one before it.
  await Bun.file(resultFile).delete().catch(() => {});
  // The bot plays the evaluation seed in a freshly loaded tab, as its first run there, and checks it.
  console.log(`${tag}: full run on Nightmare ${(await ladder()) + 1}, seed ${EVAL_SEED}`);
  const out = Bun.file(path.join(LOGS, `${tag}.full-run.log`));
  const bot = Bun.spawn(
    [
      process.execPath,
      ENTRY.bot,
      ...botArgv({ server: main.agent.origin, reload: "", ...JEV, mode: "openWorld", difficulty: "highest", runs: 1, seed: EVAL_SEED }),
      ...botArgv({ notes: true, "coach-label": COACH_LABEL, intent, templates: templatesFile, ...(final.weapon === "" ? {} : { weapon: final.weapon }), "log-dir": path.join(LOGS, "full-runs"), result: resultFile }),
    ],
    { cwd: ROOT, stdin: "ignore", stdout: out, stderr: out },
  );
  const code = await bot.exited;
  if (code !== 0) console.error(`${tag}: the full run's bot exited with code ${code}; see ${out.name}`);
  // A run cut short leaves no notes.
  return (await Bun.file(resultFile).exists()) ? ((await Bun.file(resultFile).json()) as NotedRun) : undefined;
}

type ReflectReply = { review: string; summary: string; edits: LoopEdits; prompts: Partial<Record<PromptKey, string>>; gyms: GymRequest; playbook?: Playbook };

export async function reflect(state: CoachState, notesFile: string | undefined) {
  const stamp = tagOf(state);
  const tag = `${stamp}.reflect`;
  const playbook = await readPlaybook();
  const keys = Object.keys(PROMPT_TITLES) as PromptKey[];
  const prompts = await readPrompts();
  const notes = notesFile === undefined ? "(the full run left no notes: it was cut short)" : await Bun.file(notesFile).text();
  const runLog = notesFile === undefined ? "" : await logForPrompt(notesField(notes, "Log") ?? "", 200_000);
  const prompt = [
    editableFiles("reflect"),
    prompts.reflect,
    "# The full run",
    notes,
    "## Its log",
    "One row per model call (plan: the planner chose the next goal; pick: it took a card; move: the action model chose a step) and per goal that started or ended, with the player's state. hp_lost is health lost since the row before.",
    runLog || "(no log)",
    "# Your prompts as they stand",
    "Each part of coach.md, as it stands (the key to rewrite it with is in brackets):",
    ...keys.map((k) => `(\`${k}\`)\n${prompts[k]}`),
    await facts(state, playbook),
    "# Reply",
    NO_TOOLS,
    '"review": your review of the full run in Markdown, with the sections coach.md # Reflect asks for, under ## headings; it goes into the notes file.',
    '"summary": what this loop taught you and what the next loop should do differently, in a short paragraph for your log.',
    `"prompts": {"experiments", "fullRun", "reflect"}: the whole new text of each part of coach.md you rewrite, with its # heading (under ${PROMPT_LIMIT} characters, keeping every ## section and adding no other # heading). Rewrite what this loop showed works badly for you; leave a prompt out to keep it.`,
    GYMS_CONTRACT,
    PLAYBOOK_CONTRACT,
    EDITS_CONTRACT,
  ].join("\n\n");
  const before = await readTables();
  const gymsBefore = await readGyms();
  const reply = await ask<ReflectReply>(tag, prompt, (raw) => {
    const errors: string[] = [];
    const edits = checkEdits(raw, before);
    if ("errors" in edits) errors.push(...edits.errors);
    if (!isText(raw.review) || /<!--/.test(raw.review)) errors.push("review must be Markdown without HTML comments");
    if (!isText(raw.summary)) errors.push("summary must be a short paragraph");
    const rewrites: Partial<Record<PromptKey, string>> = {};
    for (const [k, v] of Object.entries((raw.prompts ?? {}) as Record<string, unknown>)) {
      if (!(k in PROMPT_TITLES)) errors.push(`prompts.${k} is not a part of coach.md; they are ${keys.join(", ")}`);
      else if (!isText(v) || v.length > PROMPT_LIMIT) errors.push(`prompts.${k} must be the whole new text of the part, under ${PROMPT_LIMIT} characters`);
      else {
        const part = checkPromptPart(k as PromptKey, v);
        if ("errors" in part) {
          errors.push(...part.errors);
          continue;
        }
        const loss = promptLoss(prompts[k as PromptKey], part.value, `coach.md # ${PROMPT_TITLES[k as PromptKey]}`);
        if (loss !== undefined) errors.push(loss);
        else rewrites[k as PromptKey] = part.value;
      }
    }
    const gyms = checkGyms(raw.gyms, gymsBefore, stamp, errors);
    const pb = checkPlaybook(raw.playbook, playbook, stamp, afterEdits(before, "value" in edits ? edits.value : undefined).experiments, errors);
    if (errors.length > 0 || !("value" in edits)) return { errors };
    return { value: { review: String(raw.review), summary: String(raw.summary), edits: edits.value, prompts: rewrites, gyms, ...(pb === undefined ? {} : { playbook: pb }) } };
  });
  if (reply === undefined) {
    await appendLog(state, REFLECTION, "The coach gave no usable reflection.");
    return;
  }
  await applyEdits(reply.edits, stamp);
  if (reply.playbook !== undefined) await writePlaybook(reply.playbook);
  if (Object.keys(reply.prompts).length > 0) await writePrompts({ ...prompts, ...reply.prompts });
  await updateGyms((gyms) => {
    for (const name of reply.gyms.retire) for (const g of gyms) if (g.name === name) g.status = "retired";
    for (const g of reply.gyms.build) upsertGym(gyms, g);
  });
  if (notesFile !== undefined) await Bun.write(notesFile, withReview(await Bun.file(notesFile).text(), reply.review));
  const rewrote = Object.keys(reply.prompts).map((k) => `coach.md # ${PROMPT_TITLES[k as PromptKey]}`);
  await appendLog(state, REFLECTION, `${reply.summary}${rewrote.length === 0 ? "" : `\n\nRewrote ${rewrote.join(", ")}.`}`);
}
