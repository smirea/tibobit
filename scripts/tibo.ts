#!/usr/bin/env bun
import {
  BRIDGE_ORIGIN as DEFAULT_ORIGIN,
  type CheckpointMeta,
  type CommandStatus,
  type Rel,
  type RunView,
  type Snapshot,
  bridgeOrigin,
  validPort,
} from "../src/agent/protocol";

const USAGE = `usage: tibo [--port <port> | --server <url>] <command>

  state [--format text|json]      the game now: text (default) is only what a decision model acts on;
                                  json is the whole snapshot on one line (types in src/agent/protocol.ts)
  watch                           the text state, refreshed 4 times a second
  encyclopedia [section]          JSON of weapons, passives, items, recipes, enemies, bosses, pois, biomes
  move <dir|degrees> [seconds]    dir: up, down, left, right, up-left, up-right, down-left, down-right
  goto <x> <y>                    walk to a world position
  goto rel <dx> <dy>              walk relative to where you stand
  goto poi <uid>                  walk into a point of interest's circle
  goto pickup <uid>               walk onto a pickup, such as a chest
      [--stay <seconds|done>] [--within <units>] [--timeout <seconds>]
  stop | pause | resume
  choose <index>                  pick a level-up or chest option
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

const at = (r: Rel) => `${Math.round(r.dist)} ${r.dir}`;

function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

// Only what a decision model acts on: what can hurt Tibo, what he can take, and the open choice.
function summarizeRun(r: RunView, screen: string): string[] {
  const p = r.player;
  const lines: string[] = [];
  const add = (label: string, value: string) => value !== "" && lines.push(`${label}: ${value}`);
  const status = [
    p.dashReadyIn > 0 ? `dash in ${p.dashReadyIn}s` : `dash ${p.dashCharges}`,
    p.revivesLeft > 0 ? `revives ${p.revivesLeft}` : "",
    p.invulnerable ? "invulnerable" : "",
    p.stunned > 0 ? `stunned ${p.stunned}s` : "",
    p.frozen > 0 ? `frozen ${p.frozen}s` : "",
    p.slowed > 0 ? `slowed ${p.slowed}s` : "",
  ].filter(Boolean);

  lines.push(`${clock(r.time)}${screen === "" ? "" : ` ${screen}`}  hp ${Math.round(p.hp)}/${Math.round(p.maxHp)}  lv ${p.level}  gold ${p.gold}  ${status.join("  ")}`);
  add(
    "hurt by",
    Object.entries(p.hurtBy)
      .slice(0, 3)
      .map(([k, v]) => `${k} ${Math.round(v)}`)
      .join(", "),
  );
  add("buffs", r.buffs.map((b) => `${b.id} ${Math.round(b.endsIn)}s`).join(", "));
  add("weapons", r.loadout.weapons.map((w) => `${w.name} ${w.level}/${w.max}`).join(", "));
  add("passives", r.loadout.passives.map((w) => `${w.name} ${w.level}/${w.max}`).join(", "));
  add("items", r.loadout.items.map((i) => `${i.name}${i.count > 1 ? ` x${i.count}` : ""}`).join(", "));
  add("ready to evolve from a chest", r.combos.filter((c) => c.ready).map((c) => c.name).join(", "));
  if (r.choice !== undefined) {
    lines.push(`choice (${r.choice.kind}; rerolls ${p.rerolls}, skips ${p.skips}, banishes ${p.banishes}):`);
    for (const o of r.choice.options.filter((o) => o.available || o.type !== "other")) {
      // The card text repeats the name and carries the badges and recipe arrows the helper draws on it.
      const noise = new Set([o.name, "NEW", "UNSEEN", "→", ...o.combos.map((c) => c.name)]);
      const label = o.label
        .split(" | ")
        .filter((part) => !noise.has(part) && !/^LV \d+$/.test(part))
        .join(" | ");
      const pairs = o.combos.filter((c) => c.partnerHeld).map((c) => `${c.ready ? "completes" : "pairs toward"} ${c.name}`);
      lines.push(`  [${o.index}] ${o.name}${o.level === undefined ? "" : ` Lv${o.level}`}${o.available ? "" : " (unavailable)"}${label === "" ? "" : `: ${label}`}${pairs.length > 0 ? ` (${pairs.join(", ")})` : ""}`);
    }
  }
  const boss = r.schedule.find((w) => w.boss !== undefined);
  if (boss?.boss !== undefined && r.bosses.length === 0) add("next boss", `${boss.boss.name} at ${clock(boss.minute * 60)}`);
  const news = r.events.filter((e) => r.time - e.time <= 10 && (e.text !== undefined || e.type === "bossSpawn"));
  add("just now", news.map((e) => e.text ?? `${e.name} arrived`).join("; "));

  for (const b of r.bosses) lines.push(`boss: ${b.name} ${Math.round((b.hp / b.maxHp) * 100)}% hp, ${at(b)}`);
  const close = r.sectors.reduce((n, sec) => n + sec.enemiesNear, 0);
  lines.push(`enemies: ${r.enemies.total}, ${close} within 60; nearest ${r.enemies.nearest.slice(0, 3).map((e) => `${e.name} ${at(e)}`).join(", ")}`);
  add("elites", r.enemies.elites.slice(0, 3).map((e) => `${e.name} ${Math.round((e.hp / e.maxHp) * 100)}% hp ${at(e)}`).join(", "));
  if (r.standingBulletHits + r.standingEnemyTouches > 0) lines.push(`standing still, within 0.6s: ${r.standingBulletHits} bullet hits, ${r.standingEnemyTouches} enemy touches`);
  add("volleys", r.volleys.filter((v) => v.dist < 250).slice(0, 2).map((v) => `${v.count * Math.max(1, v.bursts)} bullets ${v.firesIn > 0 ? `in ${v.firesIn}s` : "now"} from ${at(v)}`).join(", "));
  add("hazards", r.hazards.filter((h) => h.inside || h.dist - h.radius < 60).map((h) => `${h.kind} ${h.inside ? "UNDER TIBO" : at(h)}${h.landsIn === undefined ? "" : ` lands in ${h.landsIn}s`}`).join(", "));

  const loot = [...r.pickups.chests, ...r.pickups.nearest.filter((q) => q.kind !== "gold")].sort((a, b) => a.dist - b.dist);
  add("pickups", loot.slice(0, 5).map((q) => `${q.kind} #${q.uid} ${at(q)}`).join(", "));
  if (r.pois.length > 0) {
    lines.push("spots:");
    for (const q of [...r.pois].sort((a, b) => a.dist - b.dist).slice(0, 8)) {
      const charge = q.charge > 0 ? ` charged ${q.charge}/${q.chargeNeeded}s` : "";
      const price = q.price === undefined ? "" : ` costs ${q.price}`;
      lines.push(`  #${q.uid} ${q.name} ${q.inside ? "INSIDE" : at(q)}${charge}${price}`);
    }
  }
  add("grok bots", r.helpers.filter((h) => h.mode === "wander" || h.mode === "hop").map((h) => `${h.name} ${at(h)}`).join(", "));
  add("visitors", r.visitors.map((v) => `${v.who} ${at(v)}`).join(", "));
  return lines;
}

function summarize(s: Snap): string {
  const lines = s.run === undefined ? [s.screen] : summarizeRun(s.run, s.screen === "run" ? "" : s.screen);
  if (!s.connected) lines.unshift("the tibo.dog tab is not connected");
  if (s.error) lines.push(`error: ${s.error}`);
  if (s.lastRun !== undefined) lines.push(`last run: ${clock(s.lastRun.time)} lv ${s.lastRun.level}${s.lastRun.won ? ", won" : ""}${s.lastRun.killer === undefined ? "" : `, killed by ${s.lastRun.killer}`}`);
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
      return { type: "choose", index: num(rest[0], "index") };
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
      const s = await api<Snap>("/state");
      console.log(format === "json" ? JSON.stringify(s) : summarize(s));
      return;
    }
    case "watch":
      for (;;) {
        const s = await api<Snap>("/state").catch((e: Error) => e);
        process.stdout.write(`\x1b[2J\x1b[H${s instanceof Error ? s.message : summarize(s)}\n`);
        await Bun.sleep(250);
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
