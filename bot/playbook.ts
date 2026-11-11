import path from "node:path";
import { checkTemplates, DEFAULT_TEMPLATES, type Templates } from "./templates";
import { GAMEPLAY } from "../paths";
const PLAYBOOK_JSON = path.join(GAMEPLAY, "playbook.json");

/** The templates and starting weapon ("" for the game's Random) the coach currently plays best with. */
export type Playbook = { templates: Templates; weapon: string; updated: string; why: string };

export async function readPlaybook(): Promise<Playbook> {
  const f = Bun.file(PLAYBOOK_JSON);
  if (!(await f.exists())) return { templates: DEFAULT_TEMPLATES, weapon: "", updated: "never", why: "the built-in defaults" };
  const raw = (await f.json()) as Playbook;
  const t = checkTemplates(raw.templates, DEFAULT_TEMPLATES);
  if ("errors" in t) throw new Error(`${PLAYBOOK_JSON}: ${t.errors.join("; ")}`);
  return { ...raw, templates: t.value };
}

export async function writePlaybook(p: Playbook) {
  await Bun.write(PLAYBOOK_JSON, `${JSON.stringify(p, null, 2)}\n`);
}
