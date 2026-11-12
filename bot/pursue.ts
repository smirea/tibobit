import { aimAt, type Course, distrusted, ending, everListed, finish, goalId, outcomes, pursuit, type Pursuit, setDistrust } from "./goals";
import { knobs } from "./run-templates";
import { cheapestMove, dashOnTheWay, dashWorthAsking, moveCost, steer } from "./action-model";
import type { Command, CommandStatus } from "../protocol/commands";
import { command, send } from "./server";
import type { World } from "./world";
import { RunLog } from "./run-log/writer";
import { clock } from "../clock";
import type { State } from "../protocol/view";

/** Why the action model is asked even though the forecast calls the way to the goal cheap, if it is. */
function distrustReason(r: World): string | undefined {
  if (distrusted !== undefined && r.time < distrusted.until) return `the forecast was not trusted: Tibo lost ${distrusted.lost} health on a step it called free at ${clock(distrusted.at)}`;
  const range = knobs().distrustBossRange;
  const boss = range > 0 ? r.bosses.find((b) => b.dist <= range) : undefined;
  return boss === undefined ? undefined : `the forecast was not trusted: the ${boss.name} boss is ${Math.round(boss.dist)} away`;
}

/**
 * One step toward the current goal: walk on while it is safe, else ask the action model. `direct`
 * sets the next goal when there is none: the planner's choice, or what the panel's function returned.
 */
export async function pursue(s: State, r: World, log: RunLog, direct: (r: World, why: string) => Promise<unknown> | void) {
  for (const c of r.chests) everListed.add(goalId({ kind: "chest", uid: c.id }));
  const gained = log.loadoutChange(r);
  if (gained !== undefined) log.write(r, { event: "loadout", action: gained, ...(pursuit === undefined ? {} : { goal: pursuit.id }) });
  for (let starts = 0; ; starts++) {
    if (pursuit === undefined) await direct(r, outcomes.length === 0 ? "the run started" : "the last goal ended");
    const p = pursuit as Pursuit | undefined;
    if (p === undefined) throw new Error("no goal was set");
    if (p.goal.kind === "dash") {
      const dashed = await command({ type: "dash", dir: p.goal.dir });
      finish(r, log, dashed.state === "done" ? `dashed ${p.goal.dir}` : `the game said: ${dashed.detail ?? dashed.state}`, dashed.state === "done" ? "done" : "failed");
      // `r` still shows the charge just spent, so the next goal is planned on the next step's state.
      return;
    }
    const status = p.commandId === undefined ? undefined : s.commands.find((c) => c.id === p.commandId);
    const aim = aimAt(p, r);
    const ended = ending(p, r, aim, status);
    if (ended !== undefined && starts < 3) {
      finish(r, log, ended.done, ended.success ? "done" : "failed");
      continue;
    }
    if ("done" in aim) return;
    const cost = aim.heading === undefined ? undefined : moveCost(r, aim.heading);
    const cheapest = cheapestMove(r);
    const clear = aim.heading !== undefined && (cost === undefined || cheapest === undefined || cost <= cheapest + knobs().extraDamage);
    const distrust = distrustReason(r);
    if (clear && distrust === undefined) {
      // The page walks on its own here, so a hit the forecast missed would otherwise leave no row.
      const lost = log.lostSince(r);
      if (lost >= 1) {
        log.write(r, { event: "walk", model: "none", goal: p.id, action: aim.heading === "stay" ? "stand on the goal" : `walk ${aim.heading}`, reason: "the way to the goal cost no more than the cheapest move" });
        if (knobs().distrustSeconds > 0) setDistrust({ until: r.time + knobs().distrustSeconds, lost: Math.round(lost), at: r.time });
      }
      if (aim.heading !== undefined && aim.heading !== "stay" && dashWorthAsking(r)) await dashOnTheWay(r, p, aim.heading, log);
      log.pageWalked();
      return walkOn(p, r, aim, status);
    }
    p.sent = undefined;
    return steer(r, p, aim, log, distrust ?? `the way to the goal (${aim.heading ?? "none"}) costs more than the safest move`);
  }
}

async function walkOn(p: Pursuit, r: World, aim: Course, status: CommandStatus | undefined) {
  const order: Command = aim.to !== undefined ? { type: "goto", to: aim.to, stay: "done" } : aim.heading === undefined || aim.heading === "stay" ? { type: "stop" } : { type: "move", dir: aim.heading };
  // One command steers until the goal changes; it is only sent again if it changes or ends.
  const key = JSON.stringify(order);
  if (p.sent === key && (status === undefined || status.state === "running")) return;
  p.commandId = (await send(order.type === "goto" ? { ...order, timeout: Math.max(1, p.deadline - r.time) } : order)).id;
  p.sent = key;
}
