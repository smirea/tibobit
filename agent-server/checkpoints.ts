import { mkdir, readdir, rename } from "node:fs/promises";
import { CHECKPOINTS } from "../paths";
import { CHECKPOINT_NAME, type CheckpointMeta } from "../protocol/commands";
import path from "node:path";

const files = (name: string) => {
  if (!CHECKPOINT_NAME.test(name)) throw new Error("a checkpoint name is letters, digits, _ . @ or -");
  return { state: path.join(CHECKPOINTS, `${name}.json.gz`), meta: path.join(CHECKPOINTS, `${name}.meta.json`) };
};

/** Every saved checkpoint's summary, oldest first. */
export async function listCheckpoints(): Promise<CheckpointMeta[]> {
  const names = (await readdir(CHECKPOINTS).catch(() => [])).filter((f) => f.endsWith(".meta.json"));
  const metas = await Promise.all(names.map(async (f) => (await Bun.file(path.join(CHECKPOINTS, f)).json()) as CheckpointMeta));
  return metas.sort((a, b) => a.savedAt.localeCompare(b.savedAt));
}

/** Keeps a checkpoint as the page sent it: the JSON of a whole run, with its `meta`. */
export async function saveCheckpoint(json: string): Promise<CheckpointMeta> {
  const { meta } = JSON.parse(json) as { meta: CheckpointMeta };
  const file = files(meta.name);
  await mkdir(CHECKPOINTS, { recursive: true });
  // Written aside and renamed, so a load never reads half a file.
  await Bun.write(`${file.state}.tmp`, Bun.gzipSync(new TextEncoder().encode(json)));
  await rename(`${file.state}.tmp`, file.state);
  await Bun.write(file.meta, JSON.stringify(meta, null, 2));
  return meta;
}

/** A saved checkpoint's JSON, or undefined when none has that name. */
export async function readCheckpoint(name: string) {
  const file = Bun.file(files(name).state);
  return (await file.exists()) ? Bun.gunzipSync(new Uint8Array(await file.arrayBuffer())) : undefined;
}
