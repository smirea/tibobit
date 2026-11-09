#!/usr/bin/env bun
import {
  BRIDGE_ORIGIN as DEFAULT_ORIGIN,
  type CheckpointMeta,
  type CommandStatus,
  type Snapshot,
  bridgeOrigin,
  validPort,
} from "../src/agent/protocol";

const USAGE = `usage: tibo [--port <port> | --server <url>] <command>

  state [path] [--format text|json]
                                  the snapshot: \`game\` is the game's state object under its own keys
                                  (src/agent/reflect.ts says how it is made into JSON), plus the screen,
                                  the game's localStorage and the commands. A path such as game.loadout
                                  or game.enemies shows only that part. text is an indented tree, with a
                                  list of entries as a table; json is it all on one line
  watch [path]                    the text state, refreshed 4 times a second
  encyclopedia [section]          JSON of the game's content: weapons, passives, items, recipes, enemies,
                                  bosses, dogs, pois, events, botHelps, biomes, glossary, rules
  move <dir|degrees> [seconds]    dir: up, down, left, right, up-left, up-right, down-left, down-right
  goto <x> <y>                    walk to a world position
  goto rel <dx> <dy>              walk relative to where you stand
  goto poi <uid>                  walk into a point of interest's circle
  goto pickup <uid>               walk onto a pickup, such as a chest
      [--stay <seconds|done>] [--within <units>] [--timeout <seconds>]
  stop | pause | resume
  choose <action> [index]         the game's own action on the open choice: pick, banish or buy with
                                  the offer's index in game.choiceQueue[0], or reroll, skip, close,
                                  accept, continue or endRun
  dash [dir|degrees]
  start [easy|normal|hard|nightmare|highest] [daily]   daily plays today's fixed-seed Daily; highest
                                  takes the hardest unlocked, up through the Nightmare levels
  summary                         after a death, step to the run summary and record its share link

training ground:
  seed <seed>                     reload the page so its next Open World run plays this seed (a run's \`seed\`)
  checkpoint save <name>          save the run as it is now (kept in .runs/checkpoints)
  checkpoint load <name>          put a saved run in place of the run in progress; it waits paused
  checkpoint drop <name>          forget the page's copy, so the next load reads the file again
  checkpoints                     list saved checkpoints
  loadout w:<id>:<level>... [p:<id>:<level>...] [i:<id>[:<count>]...] [gold:<n>] [hp:<n>|full]
                                  replace every weapon, passive and item of the run in progress

Commands wait until they finish (except move without seconds); add --no-wait to return at once.
The agent server defaults to $TIBO_SERVER, then ${DEFAULT_ORIGIN}; --port picks another one on 127.0.0.1.`;

type Snap = Snapshot & { connected: boolean; ageMs: number };

let server = DEFAULT_ORIGIN;

function serverFrom(args: string[]): string {
  const wantsPort = args.includes("--port");
  const port = flag(args, "--port");
  const wantsUrl = args.includes("--server");
  const url = flag(args, "--server");
  if (wantsPort && wantsUrl) throw new Error("pass --port or --server, not both");
  if (wantsUrl) {
    if (url === undefined || !URL.canParse(url)) throw new Error(`--server must be a URL such as ${DEFAULT_ORIGIN}, got ${url ?? "nothing"}`);
    return url.replace(/\/$/, "");
  }
  if (!wantsPort) return process.env.TIBO_SERVER ?? DEFAULT_ORIGIN;
  if (!validPort(Number(port))) throw new Error(`--port must be a number from 1 to 65535, got ${port ?? "nothing"}`);
  return bridgeOrigin(Number(port));
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${server}${path}`, init);
  } catch {
    const port = new URL(server).port;
    throw new Error(`no agent server at ${server}; start it with ./scripts/agent-server.ts${port === String(new URL(DEFAULT_ORIGIN).port) ? "" : ` --port ${port}`}`);
  }
  const body = (await res.json()) as T & { error?: string };
  if (!res.ok) throw new Error(body.error ?? `${res.status}`);
  return body;
}

function flag(args: string[], name: string): string | undefined {
  const i = args.indexOf(name);
  if (i < 0) return undefined;
  const value = args[i + 1];
  args.splice(i, 2);
  return value;
}

function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

// A long list of numbers, such as a weapon's fixed-size buffer, shows its start in text; json has it all.
const LIST_SHOWN = 32;

const scalar = (v: unknown) => (typeof v === "string" ? JSON.stringify(v) : String(v));
const isScalar = (v: unknown) => v === null || typeof v !== "object";

/** The game's own keys as an indented tree; a list of entries with the same keys, such as a pool, as a table. */
function tree(v: unknown, indent = ""): string[] {
  if (isScalar(v)) return [`${indent}${scalar(v)}`];
  if (Array.isArray(v)) {
    if (v.every(isScalar)) return [`${indent}[${v.slice(0, LIST_SHOWN).map(scalar).join(", ")}${v.length > LIST_SHOWN ? `, ... ${v.length - LIST_SHOWN} more` : ""}]`];
    const rows = v as Record<string, unknown>[];
    const columns = [...new Set(rows.flatMap((r) => (typeof r === "object" && r !== null ? Object.keys(r) : [])))];
    const flat = rows.every((r) => typeof r === "object" && r !== null && Object.values(r).every((x) => isScalar(x) || (Array.isArray(x) && x.every(isScalar))));
    if (flat) {
      const cell = (x: unknown) => (x === undefined ? "" : Array.isArray(x) ? x.map(scalar).join("|") : typeof x === "number" ? String(Math.round(x * 1000) / 1000) : scalar(x));
      return [`${indent}${rows.length} entries`, `${indent}${columns.join("\t")}`, ...rows.map((r) => `${indent}${columns.map((c) => cell(r[c])).join("\t")}`)];
    }
    return rows.flatMap((r, i) => [`${indent}- [${i}]`, ...tree(r, `${indent}    `)]);
  }
  return Object.entries(v as Record<string, unknown>).flatMap(([k, x]) => {
    if (isScalar(x) || (Array.isArray(x) && x.every(isScalar))) return [`${indent}${k}: ${tree(x).join("")}`];
    return [`${indent}${k}:`, ...tree(x, `${indent}  `)];
  });
}

/** The part of the snapshot a dotted path names, such as "game.loadout.weapons" or "game.enemies". */
function pick(s: Snap, path: string | undefined): unknown {
  if (path === undefined) return s;
  let v: unknown = s;
  for (const key of path.split(".")) {
    if (typeof v !== "object" || v === null || !(key in v)) throw new Error(`the snapshot has no ${path}; its keys at that level are: ${typeof v === "object" && v !== null ? Object.keys(v).join(", ") : "none"}`);
    v = (v as Record<string, unknown>)[key];
  }
  return v;
}

function render(s: Snap, path: string | undefined): string {
  const lines = tree(pick(s, path));
  if (!s.connected) lines.unshift("the tibo.dog tab is not connected");
  return lines.join("\n");
}

function parseArgs(args: string[]): unknown {
  const [verb, ...rest] = args;
  const num = (v: string | undefined, what: string) => {
    const n = Number(v);
    if (v === undefined || !Number.isFinite(n)) throw new Error(`${what} must be a number\n\n${USAGE}`);
    return n;
  };
  const heading = (v: string | undefined) => (v === undefined ? undefined : Number.isFinite(Number(v)) ? Number(v) : v);
  switch (verb) {
    case "move":
      return { type: "move", dir: heading(rest[0]), ...(rest[1] === undefined ? {} : { seconds: num(rest[1], "seconds") }) };
    case "goto": {
      const stay = flag(rest, "--stay");
      const within = flag(rest, "--within");
      const timeout = flag(rest, "--timeout");
      const to =
        rest[0] === "poi"
          ? { poi: num(rest[1], "uid") }
          : rest[0] === "pickup"
            ? { pickup: num(rest[1], "uid") }
            : rest[0] === "rel"
              ? { dx: num(rest[1], "dx"), dy: num(rest[2], "dy") }
              : { x: num(rest[0], "x"), y: num(rest[1], "y") };
      return {
        type: "goto",
        to,
        ...(stay === undefined ? {} : { stay: stay === "done" ? "done" : num(stay, "stay") }),
        ...(within === undefined ? {} : { within: num(within, "within") }),
        ...(timeout === undefined ? {} : { timeout: num(timeout, "timeout") }),
      };
    }
    case "choose":
      return { type: "choose", action: rest[1] === undefined ? { type: rest[0] } : { type: rest[0], index: num(rest[1], "index") } };
    case "dash":
      return rest[0] === undefined ? { type: "dash" } : { type: "dash", dir: heading(rest[0]) };
    case "start": {
      const difficulty = rest.find((w) => w !== "daily");
      return { type: "start", ...(rest.includes("daily") ? { mode: "daily" } : {}), ...(difficulty === undefined ? {} : { difficulty }) };
    }
    case "stop":
    case "pause":
    case "resume":
    case "summary":
      return { type: verb };
    case "seed":
      return { type: "seed", seed: rest[0] };
    case "checkpoint":
      return { type: "checkpoint", op: rest[0], name: rest[1] };
    case "loadout": {
      const spec: { weapons: unknown[]; passives: unknown[]; items: unknown[]; gold?: number; hp?: number | "full" } = { weapons: [], passives: [], items: [] };
      for (const word of rest) {
        const [kind, id = "", n] = word.split(":");
        if (kind === "w") spec.weapons.push({ id, level: num(n ?? "1", `${word} level`) });
        else if (kind === "p") spec.passives.push({ id, level: num(n ?? "1", `${word} level`) });
        else if (kind === "i") spec.items.push({ id, count: num(n ?? "1", `${word} count`) });
        else if (kind === "gold") spec.gold = num(id, "gold");
        else if (kind === "hp") spec.hp = id === "full" ? "full" : num(id, "hp");
        else throw new Error(`${word}: loadout words are w:<id>:<level>, p:<id>:<level>, i:<id>:<count>, gold:<n> or hp:<n>|full\n\n${USAGE}`);
      }
      return { type: "loadout", ...spec };
    }
  }
  throw new Error(USAGE);
}

async function main(argv: string[]) {
  const args = [...argv];
  server = serverFrom(args);
  const noWait = args.includes("--no-wait");
  const words = args.filter((a) => a !== "--no-wait");
  switch (words[0]) {
    case undefined:
    case "help":
    case "--help":
      console.log(USAGE);
      return;
    case "state": {
      const inline = words.find((w) => w.startsWith("--format="));
      const format = inline?.slice("--format=".length) ?? (words.includes("--format") ? (flag(words, "--format") ?? "") : "text");
      if (format !== "text" && format !== "json") throw new Error(`--format must be text or json, got ${format}`);
      const path = words.slice(1).find((w) => !w.startsWith("--"));
      const s = await api<Snap>("/state");
      console.log(format === "json" ? JSON.stringify(pick(s, path)) : render(s, path));
      return;
    }
    case "watch": {
      const path = words[1];
      for (;;) {
        const s = await api<Snap>("/state").catch((e: Error) => e);
        process.stdout.write(`\x1b[2J\x1b[H${s instanceof Error ? s.message : render(s, path)}\n`);
        await Bun.sleep(250);
      }
    }
    case "checkpoints":
      for (const c of await api<CheckpointMeta[]>("/checkpoints"))
        console.log(`${c.name}  ${clock(c.time)} lv ${c.level} hp ${c.hp}  ${c.difficulty} seed ${c.seed}  ${c.weapons.join(", ")}  (${c.savedAt}, ${c.build})`);
      return;
    case "encyclopedia": {
      const book = await api<Record<string, unknown>>("/encyclopedia");
      console.log(JSON.stringify(words[1] === undefined ? book : book[words[1]], null, 2));
      return;
    }
  }
  const command = parseArgs(words) as { type: string };
  const waits = !noWait && !(command.type === "move" && !("seconds" in command));
  const status = await api<CommandStatus | { id: number }>(`/command${waits ? "?wait=1&timeout=120" : ""}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(command),
  });
  console.log(JSON.stringify(status));
  if ("state" in status && status.state === "failed") process.exit(1);
}

main(Bun.argv.slice(2)).catch((e: Error) => {
  console.error(e.message);
  process.exit(1);
});
