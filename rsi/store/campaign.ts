import path from "node:path";
import { NOTES_DIR, notesField, notesFiles, readNotesName } from "../../bot/notes";
import { clock } from "../../clock";

/** A finished run as the ladder sees it, read from its notes file name and header. */
type RunRecord = { name: string; coach: string; difficulty: string; level: number; mode: string; lived: number; won: boolean; text: string };

async function runRecords(): Promise<RunRecord[]> {
  const out: RunRecord[] = [];
  for (const name of await notesFiles()) {
    const run = readNotesName(name);
    if (run === undefined) continue;
    const text = await Bun.file(path.join(NOTES_DIR, name)).text();
    const { difficulty } = run;
    out.push({ name, coach: (notesField(text, "Coach") ?? "?").split(" ")[0] ?? "?", difficulty, level: Number(difficulty.match(/^nightmare-(\d+)$/)?.[1] ?? 0), mode: run.mode, lived: run.lived, won: (notesField(text, "Ending") ?? "").startsWith("won"), text });
  }
  return out;
}

/** Every full run, newest first, with the coach that planned it. */
export async function campaign(): Promise<string> {
  const records = (await runRecords()).filter((r) => r.mode === "world" && r.level > 0);
  if (records.length === 0) return "No Open World Nightmare run yet.";
  const lines = ["| Run | Level | Lived | Won | Coach |", "| --- | --- | --- | --- | --- |"];
  for (const r of records) lines.push(`| ${r.name.slice(0, 16).replace("_", " ")} | Nightmare ${r.level} | ${clock(r.lived)} | ${r.won ? "yes" : "no"} | ${r.coach} |`);
  return lines.join("\n");
}

export async function latestNotes(count: number): Promise<string> {
  const out: string[] = [];
  for (const name of (await notesFiles()).slice(0, count)) {
    const text = await Bun.file(path.join(NOTES_DIR, name)).text();
    out.push(`### ${name}\n\n${text.replace(/\n## Prompts\n[\s\S]*$/, "\n").trim()}`);
  }
  return out.join("\n\n") || "(no runs yet)";
}
