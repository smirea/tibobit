// The numbers every review used to work out from the raw log by hand: health by minute and what
// took it, when bosses and the first chest came, how goals ended, what Tibo gained, and dashes.

import { csvField, parseCsv } from "../../csv";

export const goalKind = (id: string) => (id.startsWith("C") ? "chest" : id.startsWith("P") ? "spot" : id.startsWith("F") ? "food" : /^E\d/.test(id) ? "elite" : id.split(" ")[0] || "?");

/** A Markdown summary of a run from its CSV log. */
export function runStats(csv: string): string {
  const [header = [], ...cells] = parseCsv(csv);
  if (header[0] !== "time") return `(no stats: the log is damaged, its first line is not the header but ${JSON.stringify((header.join(",")).slice(0, 80))})`;
  const rows = cells.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])) as Record<string, string>);
  const live = rows.filter((r) => r.seconds !== "");
  if (live.length === 0) return "(no log rows)";
  const num = (v: string | undefined) => Number(v) || 0;
  const minutes = new Map<number, Record<string, string>[]>();
  for (const r of live) {
    const m = Math.floor(num(r.seconds) / 60);
    minutes.set(m, [...(minutes.get(m) ?? []), r]);
  }
  const sources = (rs: Record<string, string>[]) => {
    const tally = new Map<string, number>();
    for (const r of rs)
      for (const part of (r.hurt_by ?? "").split("; ").filter(Boolean)) {
        const name = part.replace(/\s+[\d.]+$/, "");
        tally.set(name, (tally.get(name) ?? 0) + num(part.match(/([\d.]+)$/)?.[1]));
      }
    return [...tally].sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k]) => k).join(", ") || "-";
  };
  // `dealt` is the run's damage dealt so far; logs before 2026-11-09 lack it.
  const hasDealt = live.some((r) => (r.dealt ?? "") !== "");
  let dealtBefore = num(live[0]?.dealt);
  const table = [
    `| Minute | Health at the end | Lost | Gained |${hasDealt ? " Damage dealt |" : ""} Level | Enemies | Hurt most by |`,
    `| --- | --- | --- | --- |${hasDealt ? " --- |" : ""} --- | --- | --- |`,
    ...[...minutes].map(([m, rs]) => {
      const last = rs.at(-1) ?? {};
      const lost = rs.reduce((a, r) => a + num(r.hp_lost), 0);
      const gained = rs.reduce((a, r) => a + num(r.hp_gained), 0);
      const dealt = num(last.dealt) - dealtBefore;
      dealtBefore = num(last.dealt);
      return `| ${m}:00 | ${last.hp}/${last.max_hp} | ${lost} | ${gained} |${hasDealt ? ` ${dealt} |` : ""} ${last.level} | ${last.enemies} | ${sources(rs.filter((r) => num(r.hp_lost) > 0))} |`;
    }),
  ];
  const seenBoss = new Map<string, string>();
  for (const r of live) for (const b of (r.bosses ?? "").split("; ").filter(Boolean)) {
    const name = b.replace(/\s+\d+\s+\S+\s+\d+%( of \d+)?$/, "");
    if (!seenBoss.has(name)) seenBoss.set(name, r.time ?? "?");
  }
  // Every entry is its own boss with its own health, even when several share an id and a spot.
  const lastRow = live.at(-1) ?? {};
  const bossesAtEnd = (lastRow.bosses ?? "").split("; ").filter(Boolean).map((b) => {
    const m = b.match(/^(.*?) \(.*\) \d+ \S+ (\d+)%(?: of (\d+))?$/);
    return m === null ? b : `${m[1]} at ${m[2]}%${m[3] === undefined ? "" : ` of ${m[3]}`}`;
  });
  // An elite is known by its uid. Elites of one kind that show within 5 s of each other came as one group.
  const seenUids = new Set<string>();
  const groups: { s: number; time: string; name: string; hp: number[]; max: string; dist: number; onScreen: string }[] = [];
  for (const r of live)
    for (const e of (r.elite_list ?? "").split("; ").filter(Boolean)) {
      const m = e.match(/^(\d+) (.*?) \((.*?)\) (\d+)\/(\d+) (\d+) (\S+)$/);
      if (m === null || seenUids.has(m[1] ?? "")) continue;
      seenUids.add(m[1] ?? "");
      const group = groups.find((g) => g.name === m[2] && num(r.seconds) - g.s <= 5);
      if (group !== undefined) group.hp.push(num(m[4]));
      else groups.push({ s: num(r.seconds), time: r.time ?? "?", name: m[2] ?? "?", hp: [num(m[4])], max: m[5] ?? "?", dist: num(m[6]), onScreen: r.enemies ?? "?" });
    }
  const elitesSeen = groups.map((g) => `${g.time} ${g.hp.length} ${g.name} (${g.hp.join(", ")} of ${g.max} hp), the nearest ${g.dist} away, with ${g.onScreen} enemies on screen then`);
  // Bursts: every stretch where Tibo lost 40+ health within 3 s, hit by hit. hurt_by sums each
  // source over a recent window, so a source's rise from the row before names who hit.
  const hits = live.flatMap((r, i) => {
    if (num(r.hp_lost) <= 0) return [];
    const before = new Map((live[i - 1]?.hurt_by ?? "").split("; ").filter(Boolean).map((p) => [p.replace(/\s+[\d.]+$/, ""), num(p.match(/([\d.]+)$/)?.[1])]));
    const by = (r.hurt_by ?? "").split("; ").filter(Boolean).map((p) => [p.replace(/\s+[\d.]+$/, ""), num(p.match(/([\d.]+)$/)?.[1])] as const).filter(([k, v]) => v > (before.get(k) ?? 0) + 0.05).map(([k]) => k);
    return [{ s: num(r.seconds), text: `${r.time} -${r.hp_lost} to ${r.hp}${by.length > 0 ? ` (${by.join(", ")})` : ""}` }];
  });
  const bursts: string[] = [];
  for (let i = 0; i < hits.length; ) {
    let j = i;
    const start = hits[i]?.s ?? 0;
    const lost = live.filter((r) => num(r.seconds) >= start && num(r.seconds) < start + 3).reduce((a, r) => a + num(r.hp_lost), 0);
    if (lost < 40) { i++; continue; }
    while (j + 1 < hits.length && (hits[j + 1]?.s ?? 0) < (hits[j]?.s ?? 0) + 3) j++;
    bursts.push(hits.slice(i, j + 1).map((h) => h.text).join("; "));
    i = j + 1;
  }
  const firstChest = live.find((r) => (r.chests ?? "") !== "")?.time;
  // Only Tibo opens chests, so a chest goal that finishes is a chest opened.
  const opened = rows.filter((r) => r.event === "goal" && r.action === "done" && goalKind(r.goal ?? "") === "chest");
  const atTwo = live.filter((r) => num(r.seconds) <= 120).at(-1) ?? lastRow;
  const byTwo = num(lastRow.seconds) >= 120 ? "By 2:00" : `By the end at ${lastRow.time ?? "?"}`;
  const openedByTwo = opened.filter((r) => num(r.seconds) <= 120).length;
  const goals = new Map<string, { done: number; failed: number; dropped: number }>();
  for (const r of rows.filter((x) => x.event === "goal" && x.action !== "start")) {
    const k = goalKind(r.goal ?? "");
    const g = goals.get(k) ?? { done: 0, failed: 0, dropped: 0 };
    if (r.action === "done" || r.action === "failed" || r.action === "dropped") g[r.action]++;
    goals.set(k, g);
  }
  // New cards and evolutions (a weapon gone the moment its evolution appears); level-ups are in the log.
  const gained = rows
    .filter((r) => r.event === "loadout")
    .map((r) => ({ time: r.time, parts: (r.action ?? "").split(", ").filter((p) => / new$| gone$/.test(p) || /\d\/\d to \d/.test(p) && Number(p.match(/to (\d+)/)?.[1]) - Number(p.match(/ (\d+)\/\d+ to/)?.[1]) >= 3) }))
    .filter((g) => g.parts.length > 0)
    .map((g) => `${g.time} ${g.parts.join(", ")}`);
  // A dash the action model chose on its own step says "dashed" in the detail; one taken while the
  // page walked to the goal is its own "dash <dir>" row.
  const dashes = rows
    .filter((r) => r.event === "move" && ((r.action ?? "").startsWith("dash") || /, dashed$/.test(r.detail ?? "")))
    .map((r) => {
      const score = (r.detail ?? "").match(/(\d+)%, dashed/)?.[1];
      const boss = Math.min(...[...(r.bosses ?? "").matchAll(/\) (\d+) /g)].map((m) => Number(m[1])));
      return `${r.time} (dash score ${score ?? "?"}%, health ${Math.round((100 * num(r.hp)) / Math.max(1, num(r.max_hp)))}%, ${num(r.enemies)} enemies on screen, ${Number.isFinite(boss) ? `a boss ${boss} away` : "no boss"})`;
    });
  const calls = (e: string) => rows.filter((r) => r.event === e);
  const meanMs = (rs: Record<string, string>[]) => Math.round(rs.reduce((a, r) => a + num(r.ms), 0) / Math.max(1, rs.length));
  const low = live.find((r) => num(r.hp) > 0 && num(r.hp) / Math.max(1, num(r.max_hp)) < 0.25)?.time;
  return [
    ...table,
    "",
    `- Bosses first seen: ${[...seenBoss].map(([k, t]) => `${k} at ${t}`).join("; ") || "none"}.`,
    `- Bosses alive at ${lastRow.time ?? "the end"}, each a separate boss with its own health: ${bossesAtEnd.join("; ") || "none"}.`,
    `- ${byTwo}: damage dealt ${hasDealt ? num(atTwo.dealt) : "not logged"}, elites killed ${(atTwo.elites ?? "") === "" ? "not logged" : num(atTwo.elites)}, chests opened ${openedByTwo}. Chests opened in the whole game: ${opened.length}, the first at ${opened[0]?.time ?? "never"}.`,
    `- Elites first seen: ${elitesSeen.join(" | ") || (live.some((r) => r.elite_list !== undefined) ? "none" : "not logged")}.`,
    `- Bursts of 40+ health lost within 3 s, hit by hit: ${bursts.join(" | ") || "none"}.`,
    `- First chest listed: ${firstChest ?? "never"}. First time under 25% health: ${low ?? "never"}.`,
    `- Goals by kind (done / gave up / dropped): ${[...goals].map(([k, g]) => `${k} ${g.done}/${g.failed}/${g.dropped}`).join("; ") || "none"}.`,
    `- Dashes: ${dashes.length}${dashes.length === 0 ? "" : `: ${dashes.slice(0, 12).join("; ")}${dashes.length > 12 ? "; …" : ""}`}.`,
    `- Model calls: ${calls("plan").length} plans, ${calls("pick").length} picks, ${calls("move").length} moves (mean ${meanMs(calls("move"))}ms); the page walked through ${calls("walk").length} hits on its own.`,
    `- New cards, evolutions and jumps of 3 or more levels (chests give those): ${gained.length === 0 ? "nothing logged" : gained.join("; ")}.`,
  ].join("\n");
}

/**
 * A run's opening in one line, for comparing runs: when the first chest was listed, how many
 * chests were open by 2:30, how many elites (which drop chests) were fought and killed by 3:00, when
 * the first evolution came, and the level at 3:00. Across the first
 * nine Open World runs, the three that passed 15:00 had opened three or four chests by 2:15.
 */
export function keyNumbers(csv: string): string {
  const [header = [], ...cells] = parseCsv(csv);
  if (header[0] !== "time") return "(no numbers: the log is damaged)";
  const rows = cells.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])) as Record<string, string>);
  const at = (r: Record<string, string>) => Number(r.seconds) || 0;
  const listed = rows.find((r) => (r.chests ?? "") !== "")?.time ?? "never";
  const opened = rows.filter((r) => r.event === "goal" && (r.goal ?? "").startsWith("C") && r.action === "done" && at(r) <= 150).length;
  const evolution = rows.find((r) => r.event === "loadout" && / 1\/1 new/.test(r.action ?? ""))?.time ?? "none";
  const level = [...rows].reverse().find((r) => r.seconds !== "" && at(r) <= 180)?.level ?? "?";
  const elite = (r: Record<string, string>) => r.event === "goal" && /^E\d/.test(r.goal ?? "") && at(r) <= 180;
  const fought = rows.filter((r) => elite(r) && r.action === "start").length;
  const killed = rows.filter((r) => elite(r) && r.action === "done").length;
  return `first chest listed ${listed}; ${opened} chests opened by 2:30; ${fought} elite fights and ${killed} elites killed by 3:00; first evolution ${evolution}; level ${level} at 3:00`;
}

/**
 * A run's CSV log cut to fit a prompt. Moves that cost nothing go first, then the odds of every
 * goal option on plan rows, and last the middle of the run: a run's end is where it was lost, so a
 * cut never drops it.
 */
export async function logForPrompt(file: string, limit: number): Promise<string> {
  const f = Bun.file(file);
  if (!(await f.exists())) return "(no log: it was not found)";
  const text = await f.text();
  if (text.length <= limit) return text;
  const [header = [], ...rows] = parseCsv(text);
  const event = header.indexOf("event");
  const lost = header.indexOf("hp_lost");
  const options = header.indexOf("options");
  const line = (r: string[]) => r.map(csvField).join(",");
  const costly = rows.filter((r) => r[event] !== "move" || Number(r[lost]) > 0);
  const notes = ["moves that cost no health are left out"];
  let lines = [header, ...costly].map(line);
  if (lines.join("\n").length > limit) {
    notes.push("plan rows leave out the odds of each goal option");
    lines = [header, ...costly.map((r) => (r[event] === "plan" ? r.map((x, i) => (i === options ? "" : x)) : r))].map(line);
  }
  const body = lines.join("\n");
  if (body.length <= limit) return `(${notes.join("; ")})\n${body}`;
  const half = limit / 2;
  const head = body.slice(0, half).replace(/\n[^\n]*$/, "");
  const tail = body.slice(-half).replace(/^[^\n]*\n/, "");
  return `(${notes.join("; ")}; the middle is cut out where marked)\n${head}\n(... rows cut here ...)\n${tail}`;
}
