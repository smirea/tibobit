/** Commits gameplay/ alone, under the lock so another coach's write is never half in it, and pushes. */
import type { CoachState } from "./store/coach-log";
import { withLock } from "./store/lock";
import { COMMITTER } from "./flags";
import { GAMEPLAY } from "../paths";

export async function commit(state: CoachState, notesFile: string | undefined) {
  const run = (cmd: string[], env?: Record<string, string>) => {
    const p = Bun.spawnSync(cmd, { cwd: GAMEPLAY, stdout: "pipe", stderr: "pipe", env: { ...process.env, ...env } });
    return { ok: p.exitCode === 0, out: `${p.stdout.toString()}${p.stderr.toString()}`.trim() };
  };
  const lived = notesFile?.match(/lived-(\d+)-(\d+)/);
  const title = `docs(gameplay): the coach finishes loop ${state.loop}${lived === null || lived === undefined ? "" : `, its full run lived ${Number(lived[1])}:${lived[2]}`}`;
  const result = await withLock(async () => {
    run(["git", "add", "-A", "--", "."]);
    if (run(["git", "diff", "--cached", "--quiet", "--", "."]).ok) return undefined;
    let tried = run(["gai", "-m", title, "--only", "--", "."], { AI_COMITTER_NAME: COMMITTER });
    for (let attempt = 1; !tried.ok && tried.out.includes("index.lock") && attempt < 5; attempt++) {
      await Bun.sleep(2000);
      tried = run(["gai", "-m", title, "--only", "--", "."], { AI_COMITTER_NAME: COMMITTER });
    }
    return tried;
  });
  if (result === undefined) return;
  if (!result.ok) return console.error(`could not commit gameplay/: ${result.out}`);
  const pushed = run(["git", "push"]);
  if (!pushed.ok) console.error(`could not push: ${pushed.out}`);
  console.log(`committed: ${title}`);
}
