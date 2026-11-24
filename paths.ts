import path from "node:path";

export const ROOT = import.meta.dir;
/** Everything a run leaves behind that git does not keep: checkpoints, browser profiles, logs. */
export const RUNS = path.join(ROOT, ".runs");
export const CHECKPOINTS = path.join(RUNS, "checkpoints");
export const USERSCRIPT = path.join(ROOT, "dist", "tibo-helper.user.js");

/** The programs that other programs start. Start each with ROOT as its working folder: that is where Bun reads .env.local. */
export const ENTRY = {
  agentServer: path.join(ROOT, "agent-server", "main.ts"),
  headless: path.join(ROOT, "headless", "main.ts"),
  bot: path.join(ROOT, "bot", "main.ts"),
};
