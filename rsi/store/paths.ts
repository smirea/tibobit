import path from "node:path";
// The learning loop's files in gameplay/: coach.md (the coach's three prompts), coach-log.md (one
// entry per iteration, which also says where the loop stands), beliefs.csv (what the loop holds
// true, good and bad), experiments/ (one Markdown file per question, with its games), gyms.jsonl
// (saved game states the training ground starts from), held.json and infrastructure_feedback.csv.
// The bot keeps two more there: playbook.json and notes/ (full runs only). Each file's module owns
// its format and turns away an edit that would break it, so the loop can never wedge itself.
import { GAMEPLAY } from "../../paths";

export const EXPERIMENTS_DIR = path.join(GAMEPLAY, "experiments");

export const COACH_MD = path.join(GAMEPLAY, "coach.md");

export const COACH_LOG = path.join(GAMEPLAY, "coach-log.md");

export const BELIEFS_CSV = path.join(GAMEPLAY, "beliefs.csv");

export const INFRA_CSV = path.join(GAMEPLAY, "infrastructure_feedback.csv");

export const GYMS_JSONL = path.join(GAMEPLAY, "gyms.jsonl");

export const HELD_JSON = path.join(GAMEPLAY, "held.json");
