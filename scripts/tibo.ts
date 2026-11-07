#!/usr/bin/env bun
import { BRIDGE_ORIGIN as DEFAULT_ORIGIN, type CommandStatus, type PickupView, type Rel, type RunView, type Snapshot } from "../src/agent/protocol";

const USAGE = `usage: tibo <command>

  state [--json]                  one-screen summary of the game, or the full snapshot as JSON
  watch                           live summary, refreshed 4 times a second
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
  start [easy|normal|hard|nightmare]

Commands wait until they finish (except move without seconds); add --no-wait to return at once.`;

type Snap = Snapshot & { connected: boolean; ageMs: number };

const SERVER = process.env.TIBO_SERVER ?? DEFAULT_ORIGIN;

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${SERVER}${path}`, init);
  } catch {
    throw new Error(`the agent server is not running; start it with ./scripts/agent-server.ts`);
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

function summarizeRun(r: RunView): string[] {
  const p = r.player;
  const lines = [
    `${clock(r.time)}  hp ${Math.round(p.hp)}/${Math.round(p.maxHp)}  lv ${p.level} (${p.xp}/${p.xpNext} xp)  gold ${p.gold}  dash ${p.dashCharges}  at (${p.x}, ${p.y})`,
    `weapons: ${r.loadout.weapons.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}`,
    `passives: ${r.loadout.passives.map((w) => `${w.name} ${w.level}/${w.max}`).join(", ") || "none"}`,
  ];
  if (r.loadout.items.length > 0) lines.push(`items: ${r.loadout.items.map((i) => `${i.name} x${i.count}`).join(", ")}`);
  if (r.combos.length > 0)
    lines.push(`combos: ${r.combos.map((c) => `${c.name}${c.ready ? " READY" : ""} (${c.parts.map((x) => `${x.state === "done" ? "+" : x.state === "leveling" ? "~" : "-"}${x.name}`).join(" ")})`).join("; ")}`);
  for (const u of r.unpaired) lines.push(`  ${u.name}: ${u.options.map((o) => `${o.name}${o.made ? "" : "*"}`).join(", ")}`);
  if (r.choice !== undefined) {
    lines.push(`choice (${r.choice.kind}):`);
    for (const o of r.choice.options) {
      lines.push(`  [${o.index}] ${o.name}${o.level === undefined ? "" : ` Lv${o.level}`}${o.recommended ? " (recommended)" : ""}${o.unseen ? " UNSEEN" : ""}`);
      for (const c of o.combos)
        lines.push(`      ${c.partnerHeld ? "+" : "-"} ${c.partner.name} -> ${c.name}${c.ready ? " READY" : ""}${c.made ? "" : " (new)"}`);
    }
  }
  for (const b of r.bosses) lines.push(`boss ${b.name} ${Math.round(b.hp)}/${Math.round(b.maxHp)} at ${at(b)}`);
  lines.push(`enemies ${r.enemies.total}: ${r.enemies.nearest.slice(0, 5).map((e) => `${e.name}${e.elite ? "*" : ""} ${at(e)}`).join(", ")}`);
  if (r.bullets.total > 0) lines.push(`bullets ${r.bullets.total}, nearest ${at(r.bullets.nearest[0] as Rel)}`);
  const counts = Object.entries(r.pickups.counts).map(([k, n]) => `${k} ${n}`).join(", ");
  const pickup = (p: PickupView) => `${p.kind} #${p.uid} ${at(p)}${p.chargeNeeded ? ` charge ${p.charge}/${p.chargeNeeded}s` : ""}`;
  lines.push(`pickups: ${counts || "none"}`);
  for (const p of [...r.pickups.chests, ...r.pickups.nearest.slice(0, 3)]) lines.push(`  ${pickup(p)}`);
  for (const p of r.pois.slice(0, 8))
    lines.push(`poi #${p.uid} ${p.name} (${p.kind}) ${at(p)} r${p.radius}${p.inside ? " INSIDE" : ""}${p.chargeNeeded ? ` charge ${p.charge}/${p.chargeNeeded}s` : ""}`);
  const near = r.hazards.filter((h) => h.dist - h.radius < 120);
  if (near.length > 0) lines.push(`hazards: ${near.map((h) => `${h.kind} (${h.source}) ${at(h)} r${h.radius}${h.inside ? " INSIDE" : ""}`).join(", ")}`);
  return lines;
}

function summarize(s: Snap): string {
  const head = `${s.screen}${s.connected ? "" : " (tab disconnected)"}  age ${s.ageMs}ms${s.error ? `  error: ${s.error}` : ""}`;
  const last = s.commands.at(-1);
  const lines = [head, ...(s.run === undefined ? [] : summarizeRun(s.run))];
  if (last !== undefined) lines.push(`last command #${last.id} ${last.command.type} ${last.state}${last.detail ? ` (${last.detail})` : ""}`);
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
    case "start":
      return rest[0] === undefined ? { type: "start" } : { type: "start", difficulty: rest[0] };
    case "stop":
    case "pause":
    case "resume":
      return { type: verb };
  }
  throw new Error(USAGE);
}

async function main(argv: string[]) {
  const args = [...argv];
  const json = args.includes("--json");
  const noWait = args.includes("--no-wait");
  const words = args.filter((a) => a !== "--json" && a !== "--no-wait");
  switch (words[0]) {
    case undefined:
    case "help":
    case "--help":
      console.log(USAGE);
      return;
    case "state": {
      const s = await api<Snap>("/state");
      console.log(json ? JSON.stringify(s, null, 2) : summarize(s));
      return;
    }
    case "watch":
      for (;;) {
        const s = await api<Snap>("/state").catch((e: Error) => e);
        process.stdout.write(`\x1b[2J\x1b[H${s instanceof Error ? s.message : summarize(s)}\n`);
        await Bun.sleep(250);
      }
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
