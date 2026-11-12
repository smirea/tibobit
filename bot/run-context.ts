import type { GameMode } from "../protocol/commands";
import { RAW, server } from "./server";
import { DIFFICULTY, MODE_ARG } from "./config";

export let difficulty: string = DIFFICULTY;

export const MODE: GameMode = MODE_ARG === "current" ? ((await server.state(RAW)).mode ?? "daily") : MODE_ARG;

export const MODE_NAME = MODE === "daily" ? "daily" : "world";

export function setDifficulty(picked: string) {
  difficulty = picked;
}
