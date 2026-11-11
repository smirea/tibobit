import path from "node:path";
/** A finished run as the ladder sees it, read from its notes file name and header. */
import { NOTES_DIR, notesField, notesFiles } from "../../bot/notes";
import { clock } from "../../format";

export type RunRecord = { name: string; coach: string; difficulty: string; level: number; mode: string; lived: number; won: boolean; text: string };

export async function runRecords(): Promise<RunRecord[]> {
  const out: RunRecord[] = [];
  for (const name of await notesFiles()) {
    const m = name.match(/_lived-(\d+)-(\d+)_(.+)_(daily|world)_(headless|browser)\.md$/);
    if (m === null) continue;
    const text = await Bun.file(path.join(NOTES_DIR, name)).text();
    const difficulty = m[3] ?? "";
    out.push({ name, coach: (notesField(text, "Coach") ?? "?").split(" ")[0] ?? "?", difficulty, level: Number(difficulty.match(/^nightmare-(\d+)$/)?.[1] ?? 0), mode: m[4] ?? "", lived: Number(m[1]) * 60 + Number(m[2]), won: (notesField(text, "Ending") ?? "").startsWith("won"), text });
  }
  return out;
}


/** Every full run, newest first, with the coach that planned it; runs before the coach was one (sonnet-medium, sonnet-high) count too. */
export async function campaign(): Promise<string> {
  const records = (await runRecords()).filter((r) => r.mode === "world" && r.level > 0);
  if (records.length === 0) return "No Open World Nightmare run yet.";
  const lines = ["| Run | Level | Lived | Won | Coach | Lockstep |", "| --- | --- | --- | --- | --- | --- |"];
  for (const r of records) lines.push(`| ${r.name.slice(0, 16).replace("_", " ")} | Nightmare ${r.level} | ${clock(r.lived)} | ${r.won ? "yes" : "no"} | ${r.coach} | ${r.name < LIVE_SINCE ? "yes (banned since)" : "no"} |`);
  return lines.join("\n");
}

/** Runs from before this one played in lockstep, which is banned now. */
export const LIVE_SINCE = "2026-11-08_07-5";

export async function latestNotes(count: number): Promise<string> {
  const out: string[] = [];
  for (const name of (await notesFiles()).slice(0, count)) {
    const text = await Bun.file(path.join(NOTES_DIR, name)).text();
    out.push(`### ${name}\n\n${text.replace(/\n## Prompts\n[\s\S]*$/, "\n").trim()}`);
  }
  return out.join("\n\n") || "(no runs yet)";
}
