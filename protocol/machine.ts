// Full Self Driving's state machine: an XState v5 machine config, kept to the part of XState that is
// plain JSON. The bot feeds it the game state as one `tick` event a step (bot/machine.ts); each
// state names the autopilot action Tibo carries out while it is active, and each transition's guard
// is an expression over the tick's input (protocol/guard.ts).
import { type Direction, DIRECTIONS } from "./geometry";
import { compileGuard } from "./guard";

/** The distance of a kind of thing when there is none, so a guard can always compare distances. */
export const FAR = 99999;

export type Near = { count: number; dist: number };

/** What a guard reads: the game as numbers. FIELDS says what each is. */
export type MachineInput = {
  time: number;
  stateSeconds: number;
  health: { hp: number; max: number; pct: number; lost: number };
  level: number;
  gold: number;
  dps: number;
  dash: { charges: number; max: number };
  loadout: { weapons: number; passives: number; evolutionsReady: number };
  enemies: { count: number; most: number; fewest: number; bullets: number };
  ground: { xp: number; gold: number };
  bosses: Near;
  elites: Near;
  chests: Near;
  food: Near;
  magnets: Near;
  spots: Near;
  /** By the game's own kind of spot, every kind the game has; a variety place goes by its own id. */
  spot: Record<string, Near>;
};

const near = (what: string) => ({ count: `how many ${what}`, dist: `how far the nearest of them is, in world units (Tibo walks about 62 a second); ${FAR} when there is none` });

/** Every path a guard may read, with what it holds. `spot.<kind>` is listed apart, as SPOT_FIELD. */
export const FIELDS = {
  time: "seconds of game time since the run began; a run is won at 1200",
  stateSeconds: "seconds of game time since the machine entered the state it is in",
  "health.hp": "Tibo's health",
  "health.max": "Tibo's full health",
  "health.pct": "health as a share of full health, 0 to 100",
  "health.lost": "health lost over the last 3 seconds",
  level: "Tibo's level",
  gold: "gold held, which some spots cost",
  dps: "damage Tibo dealt a second over the last 3 seconds",
  "dash.charges": "dashes ready to use now",
  "dash.max": "the most dashes Tibo can hold",
  "loadout.weapons": "weapons held, of 6 slots",
  "loadout.passives": "passives held, of 6 slots",
  "loadout.evolutionsReady": "weapons the next chest opened would evolve, because their recipe is complete",
  "enemies.count": "enemies on screen",
  "enemies.most": "enemies on screen in the most crowded of the 8 directions",
  "enemies.fewest": "enemies on screen in the least crowded of the 8 directions",
  "enemies.bullets": "bullets about to arrive, all directions together",
  "ground.xp": "the xp lying on the ground, which a magnet pulls in",
  "ground.gold": "the gold lying on the ground",
  "bosses.count": near("bosses are alive").count,
  "bosses.dist": near("bosses are alive").dist,
  "elites.count": near("elites are alive").count,
  "elites.dist": near("elites are alive").dist,
  "chests.count": near("chests lie on the loaded map").count,
  "chests.dist": near("chests lie on the loaded map").dist,
  "food.count": near("food pickups lie on the ground").count,
  "food.dist": near("food pickups lie on the ground").dist,
  "magnets.count": near("magnet pickups lie on the ground").count,
  "magnets.dist": near("magnet pickups lie on the ground").dist,
  "spots.count": near("spots of any kind are unused on the loaded map").count,
  "spots.dist": near("spots of any kind are unused on the loaded map").dist,
} as const;

export const SPOT_FIELD = { path: "spot.<kind>.count, spot.<kind>.dist", about: "the same two numbers for one kind of spot, by the game's own kind, such as spot.chargeShrine.dist" } as const;

/** A direction an action can take: one of the 8, or the one with the fewest or the most enemies on screen when the action begins. */
export const WAYS = [...DIRECTIONS, "fewestEnemies", "mostEnemies"] as const;
export type Way = Direction | "fewestEnemies" | "mostEnemies";

/** What the autopilot does while a state is active. It dodges on its own on the way. */
export type MachineAction =
  | { type: "chest" | "food" | "magnet" | "elite" | "still" }
  | { type: "spot"; kind?: string }
  | { type: "explore" | "dash"; dir: Way };

export const ACTIONS: Record<MachineAction["type"], { form: string; about: string }> = {
  chest: { form: '{ "type": "chest" }', about: "walk to the nearest chest and stand on it until it opens, then the next nearest. A chest gives a free pick, and evolves a weapon whose recipe is complete" },
  food: { form: '{ "type": "food" }', about: "walk to the nearest food and eat it, which heals Tibo, then the next nearest" },
  magnet: { form: '{ "type": "magnet" }', about: "walk to the nearest magnet pickup, which pulls in the xp on the ground" },
  elite: { form: '{ "type": "elite" }', about: "fight the nearest elite: keep it within reach of Tibo's weapons until it dies, which drops a chest" },
  spot: { form: '{ "type": "spot", "kind": "chargeShrine" }', about: "walk to the nearest unused spot of that kind and stand inside it until it has charged, then the next nearest. Without `kind`, the nearest spot of any kind" },
  explore: { form: '{ "type": "explore", "dir": "fewestEnemies" }', about: "walk that way, 300 units at a time, collecting what Tibo walks over. The way is chosen again after each 300 units" },
  dash: { form: '{ "type": "dash", "dir": "fewestEnemies" }', about: "dash that way each time a dash charge is ready, a quick burst that covers ground; with no charge, Tibo stands still" },
  still: { form: '{ "type": "still" }', about: "stand still, stepping aside only when standing would cost more health than moving" },
};

/** A transition taken on a tick when its guard holds; one without a guard is taken on the next tick. */
export type Transition = { target: string; guard?: string; description?: string };
export type MachineState = { description?: string; meta: { action: MachineAction }; on?: { tick: Transition[] } };
export type Machine = { id: string; description?: string; initial: string; states: Record<string, MachineState> };

export const MAX_STATES = 16;

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const NAME = /^[A-Za-z_]\w*$/;

function actionErrors(action: unknown, spotKinds: ReadonlySet<string> | undefined): string[] {
  if (!isObject(action)) return ["meta.action must be an object such as { \"type\": \"chest\" }"];
  const { type, ...rest } = action;
  if (typeof type !== "string" || !(type in ACTIONS)) return [`meta.action.type must be one of ${Object.keys(ACTIONS).join(", ")}, not ${JSON.stringify(type)}`];
  const allowed = type === "spot" ? ["kind"] : type === "explore" || type === "dash" ? ["dir"] : [];
  const errors = Object.keys(rest).filter((k) => !allowed.includes(k)).map((k) => `a ${type} action takes no "${k}"`);
  if (allowed.includes("dir") && !(WAYS as readonly unknown[]).includes(rest.dir)) errors.push(`a ${type} action needs "dir", one of ${WAYS.join(", ")}`);
  if (type === "spot" && rest.kind !== undefined && (typeof rest.kind !== "string" || (spotKinds !== undefined && !spotKinds.has(rest.kind)))) errors.push(`${JSON.stringify(rest.kind)} is not a kind of spot${spotKinds === undefined ? "" : `; the kinds are ${[...spotKinds].join(", ")}`}`);
  return errors;
}

function guardErrors(source: string, spotKinds: ReadonlySet<string> | undefined): string[] {
  let paths: string[];
  try {
    paths = compileGuard(source).paths;
  } catch (e) {
    return [`${(e as Error).message} in the guard "${source}"`];
  }
  return paths.flatMap((path) => {
    if (path in FIELDS) return [];
    const kind = /^spot\.([A-Za-z_]\w*)\.(?:count|dist)$/.exec(path)?.[1];
    if (kind === undefined) return [`the guard "${source}" reads ${path}, which is not part of the input`];
    return spotKinds === undefined || spotKinds.has(kind) ? [] : [`the guard "${source}" reads ${path}, and ${kind} is not a kind of spot`];
  });
}

/**
 * Everything that keeps a machine from being played, in words its author can act on. `spotKinds`
 * are the game's kinds of spot when the game has said them; without them any kind passes.
 */
export function machineErrors(input: unknown, spotKinds?: ReadonlySet<string>): string[] {
  if (!isObject(input)) return ["the machine must be a JSON object"];
  const errors: string[] = [];
  const extra = (where: string, o: Record<string, unknown>, allowed: string[]) => {
    for (const k of Object.keys(o)) if (!allowed.includes(k)) errors.push(`${where} has "${k}", which this machine cannot use; it takes only ${allowed.join(", ")}`);
  };
  const described = (where: string, o: Record<string, unknown>) => {
    if (o.description !== undefined && typeof o.description !== "string") errors.push(`${where}.description must be a string`);
  };
  extra("the machine", input, ["id", "description", "initial", "states"]);
  described("the machine", input);
  if (typeof input.id !== "string" || input.id === "") errors.push("the machine needs an id");
  const states = input.states;
  if (!isObject(states) || Object.keys(states).length === 0) return [...errors, "the machine needs states"];
  const names = Object.keys(states);
  if (names.length > MAX_STATES) errors.push(`${names.length} states; keep it to ${MAX_STATES}`);
  if (typeof input.initial !== "string" || !names.includes(input.initial)) errors.push(`initial must name one of the states: ${names.join(", ")}`);
  const leadsTo = new Map<string, string[]>();
  for (const [name, state] of Object.entries(states)) {
    const where = `state ${name}`;
    if (!NAME.test(name)) errors.push(`${where}: a state's name is letters, digits and _ only`);
    if (!isObject(state)) {
      errors.push(`${where} must be an object`);
      continue;
    }
    extra(where, state, ["description", "meta", "on"]);
    described(where, state);
    if (!isObject(state.meta)) errors.push(`${where} needs meta.action, what the autopilot does while it is active`);
    else {
      extra(`${where}.meta`, state.meta, ["action"]);
      errors.push(...actionErrors(state.meta.action, spotKinds).map((e) => `${where}: ${e}`));
    }
    if (state.on === undefined) continue;
    if (!isObject(state.on) || !Array.isArray(state.on.tick)) {
      errors.push(`${where}.on must be { "tick": [ ...transitions ] }`);
      continue;
    }
    extra(`${where}.on`, state.on, ["tick"]);
    const targets: string[] = [];
    for (const [i, t] of state.on.tick.entries()) {
      const at = `${where}, transition ${i + 1}`;
      if (!isObject(t)) {
        errors.push(`${at} must be an object`);
        continue;
      }
      extra(at, t, ["target", "guard", "description"]);
      described(at, t);
      if (typeof t.target !== "string" || !names.includes(t.target)) errors.push(`${at}: target must name one of the states, not ${JSON.stringify(t.target)}`);
      else if (t.target === name) errors.push(`${at} targets its own state`);
      else targets.push(t.target);
      if (t.guard !== undefined) errors.push(...(typeof t.guard === "string" ? guardErrors(t.guard, spotKinds) : ["guard must be a string"]).map((e) => `${at}: ${e}`));
    }
    leadsTo.set(name, targets);
  }
  if (typeof input.initial === "string" && names.includes(input.initial)) {
    const reached = new Set([input.initial]);
    for (const name of reached) for (const next of leadsTo.get(name) ?? []) reached.add(next);
    for (const name of names) if (!reached.has(name)) errors.push(`state ${name} can never be reached from ${input.initial}`);
  }
  return errors;
}

export function parseMachine(input: unknown, spotKinds?: ReadonlySet<string>): Machine {
  const errors = machineErrors(input, spotKinds);
  if (errors.length > 0) throw new Error(`the machine cannot be played: ${errors.join("; ")}`);
  return input as Machine;
}

/** The request the starting machine was built from, and the worked example the builder is shown. */
export const EXAMPLE_REQUEST =
  "Farm xp by walking toward the fewest enemies. Open chests and grab magnets when they are close, and use Spud Shrines while it is calm. Under 40% health, eat food if there is any; otherwise dash away and keep clear until health is back over 70%.";

const hurt: Transition[] = [
  { target: "eat", guard: "health.pct < 40 && food.count > 0", description: "Hurt, and there is food" },
  { target: "escape", guard: "health.pct < 40", description: "Hurt, with nothing to eat" },
];

export const EXAMPLE_MACHINE: Machine = {
  id: "tibo",
  description: "Farm and loot while healthy; eat or get clear when hurt.",
  initial: "farm",
  states: {
    farm: {
      description: "Walk toward the thinnest crowd, collecting xp on the way.",
      meta: { action: { type: "explore", dir: "fewestEnemies" } },
      on: {
        tick: [
          ...hurt,
          { target: "loot", guard: "chests.dist < 500", description: "A chest is close" },
          { target: "vacuum", guard: "magnets.dist < 400 && ground.xp > 50", description: "A magnet is close and there is xp to pull in" },
          { target: "shrine", guard: "spot.chargeShrine.dist < 400 && enemies.count < 25", description: "A Spud Shrine is close and it is calm" },
        ],
      },
    },
    loot: {
      description: "Open the nearest chest.",
      meta: { action: { type: "chest" } },
      on: { tick: [...hurt, { target: "farm", guard: "chests.count == 0 || chests.dist > 800 || stateSeconds > 25", description: "No chest left in reach, or it took too long" }] },
    },
    vacuum: {
      description: "Pick up the nearest magnet.",
      meta: { action: { type: "magnet" } },
      on: { tick: [...hurt, { target: "farm", guard: "magnets.count == 0 || stateSeconds > 15", description: "The magnet is taken, or it took too long" }] },
    },
    shrine: {
      description: "Charge the nearest Spud Shrine.",
      meta: { action: { type: "spot", kind: "chargeShrine" } },
      on: { tick: [...hurt, { target: "farm", guard: "spot.chargeShrine.count == 0 || enemies.count > 40 || stateSeconds > 20", description: "The shrine is used, the crowd grew, or it took too long" }] },
    },
    eat: {
      description: "Walk to the nearest food.",
      meta: { action: { type: "food" } },
      on: {
        tick: [
          { target: "farm", guard: "health.pct >= 70", description: "Healthy again" },
          { target: "escape", guard: "food.count == 0", description: "The food ran out before Tibo healed" },
        ],
      },
    },
    escape: {
      description: "Dash out of the crowd.",
      meta: { action: { type: "dash", dir: "fewestEnemies" } },
      on: { tick: [{ target: "retreat", guard: "dash.charges == 0 || stateSeconds > 1", description: "The dash is spent" }] },
    },
    retreat: {
      description: "Keep walking away from the crowd until healed.",
      meta: { action: { type: "explore", dir: "fewestEnemies" } },
      on: {
        tick: [
          { target: "farm", guard: "health.pct >= 70", description: "Healthy again" },
          { target: "eat", guard: "food.count > 0", description: "Food showed up" },
          { target: "escape", guard: "health.lost > 15 && dash.charges > 0", description: "Still taking hits, and a dash is ready" },
        ],
      },
    },
  },
};
