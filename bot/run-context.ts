import type { GameMode } from "../protocol/commands";
import { RAW, server } from "./server";
import { DIFFICULTY, MODE_ARG } from "./config";
import { ROOT } from "../paths";

export let difficulty: string = DIFFICULTY;

export const MODE: GameMode = MODE_ARG === "current" ? ((await server.state(RAW)).mode ?? "daily") : MODE_ARG;

export const MODE_NAME = MODE === "daily" ? "daily" : "world";


// Read once at startup: the code this process runs, whatever is committed while it plays.
export const BOT_CODE = (() => {
  const git = (...a: string[]) => Bun.spawnSync(["git", ...a], { cwd: ROOT }).stdout.toString().trim();
  const head = git("log", "-1", "--format=%h %s");
  return `${head || "unknown"}${git("status", "--porcelain", "--", ".", ":!gameplay") === "" ? "" : " (with uncommitted changes)"}`;
})();

export function setDifficulty(picked: string) {
  difficulty = picked;
}
