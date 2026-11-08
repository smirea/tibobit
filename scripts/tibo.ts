#!/usr/bin/env bun
import {
  BRIDGE_ORIGIN as DEFAULT_ORIGIN,
  type CheckpointMeta,
  type CommandStatus,
  type EventView,
  type PickupView,
  type Rel,
  type RunView,
  type Snapshot,
  bridgeOrigin,
  validPort,
} from "../src/agent/protocol";

const USAGE = `usage: tibo [--port <port> | --server <url>] <command>

  state [--format text|json]      the game now: text (default) reads well for a person or a model;
                                  json is the raw snapshot on one line (types in src/agent/protocol.ts)
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

const at = (r: Rel) => `${Math.round(r.dist)} ${r.dir}${r.onScreen ? "" : " (off screen)"}`;

function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

const num1 = (n: number) => String(Math.round(n * 10) / 10);
const top = (m: Record<string, number>, n: number) =>
  Object.entries(m)
    .slice(0, n)
    .map(([k, v]) => `${k} ${num1(v)}`)
    .join(", ");

// Multipliers sit at 1 (crits at 2) and flat stats at 0 until something changes them; only the changed ones say anything.
function changedStats(stats: Record<string, number>): string {
  const base = (k: string) => (k === "critMult" ? 2 : /Mult$/.test(k) || k === "amountBonus" ? 1 : 0);
  return Object.entries(stats)
    .filter(([k, v]) => k === "maxHp" || v !== base(k))
    .map(([k, v]) => `${k} ${num1(v)}`)
    .join(", ");
}

function eventLine(e: EventView): string {
  const said = e.announcement as { kind?: string } | undefined;
  const what =
    e.type === "announce"
      ? `${e.name ?? said?.kind ?? "banner"}${e.text ? `: ${e.text}` : ""}`
      : `${e.type}${e.name !== undefined ? ` ${e.name}` : typeof e.id === "string" ? ` ${e.id}` : ""}${typeof e.level === "number" ? ` ${e.level}` : ""}`;
  return `${clock(e.time)} ${what}`;
}

function summarizeRun(r: RunView): string[] {
  const p = r.player;
  const lines: string[] = [];
  const add = (label: string, value: string) => value !== "" && lines.push(`${label}: ${value}`);
  const status = [
    p.invulnerable ? "invulnerable" : "",
    p.stunned > 0 ? `stunned ${p.stunned}s` : "",
    p.frozen > 0 ? `frozen ${p.frozen}s` : "",
    p.slowed > 0 ? `slowed ${p.slowed}s` : "",
  ].filter(Boolean);

  lines.push(
    `run: ${clock(r.time)} of ${clock(r.winAt)}${r.totals.won ? " (won)" : ""}  ${r.difficulty}${r.daily ? " daily" : ""}  seed ${r.seed}${r.score === undefined ? "" : `  score ${r.score}`}`,
    `where: ${r.biome.name}${r.landmark === undefined ? "" : `, in landmark ${r.landmark.name}${r.landmark.event === undefined ? "" : ` (event ${r.landmark.event.name})`}`}  at (${p.x}, ${p.y})`,
  );
  if (r.weather !== undefined) add("weather", `${r.weather.name}. ${r.weather.description}`);
  add("gear", r.gear.map((g) => `${g.name}${g.description ? ` (${g.description})` : ""} [${g.lines.map((l) => `${l.affix} ${l.roll}`).join(", ")}]`).join("; "));
  lines.push(
    `player: hp ${Math.round(p.hp)}/${Math.round(p.maxHp)}  lv ${p.level} (${Math.round(p.xp)}/${Math.round(p.xpNext)} xp)  gold ${p.gold}  dash ${p.dashCharges}/${p.dashMax}${p.dashReadyIn > 0 ? ` (next in ${p.dashReadyIn}s)` : ""}${status.length > 0 ? `  ${status.join(", ")}` : ""}`,
    `spare: rerolls ${p.rerolls}, skips ${p.skips}, banishes ${p.banishes}, revives ${p.revivesLeft}, curses ${p.curses}`,
  );
  add("hurt in the last 3s", top(p.hurtBy, 8));
  add("stats", changedStats(r.stats));
  add("buffs", r.buffs.map((b) => `${b.id}${b.mult === undefined ? "" : ` x${b.mult}`} ${b.endsIn}s left`).join(", "));
  add("weapons", r.loadout.weapons.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none");
  add("passives", r.loadout.passives.map((w) => `${w.name} ${w.level}/${w.max}`).join(", "));
  add("items", r.loadout.items.map((i) => `${i.name} x${i.count}`).join(", "));
  add("banished", r.loadout.banished.join(", "));
  if (r.combos.length > 0)
    lines.push(`combos (+ held, ~ leveling, - missing): ${r.combos.map((c) => `${c.name}${c.ready ? " READY" : ""} (${c.parts.map((x) => `${x.state === "done" ? "+" : x.state === "leveling" ? "~" : "-"}${x.name}`).join(" ")})`).join("; ")}`);
  if (r.unpaired.length > 0) {
    lines.push("unpaired (* never made):");
    for (const u of r.unpaired) lines.push(`  ${u.name}: ${u.options.map((o) => `${o.name}${o.made ? "" : "*"}${o.banished ? " (banished)" : ""}`).join(", ")}`);
  }
  if (r.choice !== undefined) {
    lines.push(`choice (${r.choice.kind}):`);
    for (const o of r.choice.options) {
      // The card text repeats the name and carries the badges and recipe arrows the helper draws on it.
      const noise = new Set([o.name, "NEW", "UNSEEN", "→", ...o.combos.map((c) => c.name)]);
      const label = o.label
        .split(" | ")
        .filter((part) => !noise.has(part) && !/^LV \d+$/.test(part))
        .join(" | ");
      lines.push(`  [${o.index}] ${o.name}${o.level === undefined ? "" : ` Lv${o.level}`}${o.recommended ? " (recommended)" : ""}${o.unseen ? " UNSEEN" : ""}${o.available ? "" : " (unavailable)"}${label === "" ? "" : `: ${label}`}`);
      for (const c of o.combos)
        lines.push(`      ${c.partnerHeld ? "+" : "-"} ${c.partner.name}${c.partnerBanished ? " (banished)" : ""} -> ${c.name}${c.ready ? " READY" : ""}${c.made ? "" : " (new)"}`);
    }
  }
  add(
    "coming",
    r.schedule
      .slice(0, 5)
      .map((w) => `${clock(w.minute * 60)} ${[w.boss === undefined ? "" : `boss ${w.boss.name}`, w.elite ? "elite" : "", ...w.events.map((e) => e.name)].filter(Boolean).join(", ")}`)
      .join("; "),
  );
  if (r.events.length > 0) {
    lines.push("recent events:");
    for (const e of r.events.slice(-10)) lines.push(`  ${eventLine(e)}`);
  }

  for (const b of r.bosses) lines.push(`boss: ${b.name} hp ${Math.round(b.hp)}/${Math.round(b.maxHp)} dmg ${b.damage} speed ${b.speed} at ${at(b)}`);
  lines.push(`enemies ${r.enemies.total}: ${r.enemies.nearest.slice(0, 6).map((e) => `${e.name}${e.elite ? " (elite)" : ""} dmg ${e.damage} ${at(e)}`).join(", ")}`);
  const elites = r.enemies.elites.filter((e) => !r.enemies.nearest.slice(0, 6).some((n) => n.uid === e.uid));
  add("elites", elites.map((e) => `${e.name} hp ${Math.round(e.hp)}/${Math.round(e.maxHp)} ${at(e)}`).join(", "));
  if (r.bullets.total > 0) lines.push(`bullets ${r.bullets.total}, nearest ${at(r.bullets.nearest[0] as Rel)}; ${r.standingBulletHits} would hit Tibo standing still`);
  add("volleys", r.volleys.slice(0, 4).map((v) => `${v.count} bullets x${v.bursts}${v.firesIn > 0 ? ` in ${v.firesIn}s` : " firing"} from ${at(v)}`).join(", "));
  const near = r.hazards.filter((h) => h.dist - h.radius < 120);
  add("hazards", near.map((h) => `${h.kind} (${h.source}) ${at(h)} r${h.radius}${h.inside ? " INSIDE" : ""}${h.landsIn === undefined ? "" : ` lands in ${h.landsIn}s`}`).join(", "));

  const pickup = (q: PickupView) => `${q.kind} #${q.uid} ${at(q)}${q.chargeNeeded ? ` charge ${q.charge}/${q.chargeNeeded}s` : ""}`;
  const loot = [...r.pickups.chests, ...r.pickups.nearest.filter((q) => q.kind !== "gold")].sort((a, b) => a.dist - b.dist);
  if (loot.length > 0) {
    lines.push("pickups (by distance):");
    for (const q of loot.slice(0, 8)) lines.push(`  ${pickup(q)}`);
  }
  if (r.pois.length > 0) {
    lines.push("points of interest (by distance):");
    const described = new Set<string>();
    for (const q of [...r.pois].sort((a, b) => a.dist - b.dist)) {
      const kind = q.variant ?? q.kind;
      const what = described.has(kind) || q.description === "" ? "" : ` - ${q.description}`;
      described.add(kind);
      const price = q.price === undefined ? "" : ` costs ${q.price}`;
      const prices = q.prices === undefined ? "" : ` items ${q.prices.join("/")} gold by rarity`;
      lines.push(`  #${q.uid} ${q.name} ${at(q)} r${q.radius}${q.inside ? " INSIDE" : ""}${q.chargeNeeded ? ` charge ${q.charge}/${q.chargeNeeded}s` : ""}${price}${prices}${what}`);
    }
  }
  add("dogs", r.pets.map((d) => `${d.name} (${d.id}) lv ${d.level} ${at(d)}`).join(", "));
  add("grok bots", r.helpers.map((h) => `${h.name} ${h.mode} ${at(h)}, leaves in ${h.leavesIn}s - ${h.description}`).join("; "));
  add("visitors", r.visitors.map((v) => `${v.who} ${at(v)}`).join(", "));

  const t = r.totals;
  lines.push(`totals: kills ${t.kills}, bosses ${t.bossesKilled}, elites ${t.elitesKilled}, gold +${t.goldEarned}/-${t.goldSpent}, chests from bosses ${t.bossChests}, crates ${t.cratesBought}, shrines ${t.shrinesUsed}, items bought ${t.itemsBought}`);
  add("made", t.made.join(", "));
  add("damage dealt", top(t.damageDealt, 6));
  add("damage taken", top(t.damageTaken, 6));
  return lines;
}

function summarize(s: Snap): string {
  const head = `screen: ${s.screen}${s.mode === undefined ? "" : `  mode ${s.mode}`}${s.connected ? "" : "  (tab disconnected)"}  age ${s.ageMs}ms${s.error ? `  error: ${s.error}` : ""}`;
  const lines = [head, ...(s.run === undefined ? [] : summarizeRun(s.run))];
  if (s.lastRun !== undefined) {
    const l = s.lastRun;
    lines.push(`last run: ${clock(l.time)} lv ${l.level}, kills ${l.kills}${l.won ? ", won" : ""}${l.killer === undefined ? "" : `, killed by ${l.killer}`}`, `  damage taken: ${top(l.damageTaken, 6)}`);
  }
  if (s.lastRunLink !== undefined) lines.push(`last run link: ${s.lastRunLink}`);
  if (s.run === undefined && s.ladderCleared !== undefined) lines.push(`nightmare levels won: ${s.ladderCleared}`);
  const last = s.commands.at(-1);
  if (last !== undefined) lines.push(`last command: #${last.id} ${last.command.type} ${last.state}${last.detail ? ` (${last.detail})` : ""}`);
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
