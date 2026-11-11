import { readInfra } from "./infra";
import { readExperiments } from "./experiments";
import { readPrompts } from "./coach-prompts";
import { mkdirSync } from "node:fs";
import { readBeliefs } from "./beliefs";
import { NOTES_DIR } from "../../bot/notes";
import { readPlaybook } from "../../bot/playbook";
import { readHeld } from "./held";
import { EXPERIMENTS_DIR } from "./paths";
import { readGyms } from "./gyms";

/** Fails at startup when the coach's prompts are missing or a loop file is unreadable. */
export async function checkLoopFiles() {
  mkdirSync(NOTES_DIR, { recursive: true });
  mkdirSync(EXPERIMENTS_DIR, { recursive: true });
  await readPrompts();
  await readBeliefs();
  await readInfra();
  await readPlaybook();
  await readGyms();
  await readExperiments();
  await readHeld();
}
