// Full Self Driving: what a person sets up in the panel for the bot that plays the tab.

/**
 * `code` is one TypeScript function, `function drive(state: State, memory: Memory): Action`
 * (protocol/driver.ts), which the bot calls four times a second and whose action the autopilot
 * carries out. `memory` is one object for the whole run that the function may keep anything in; the
 * code may declare its shape as `type Memory = {...}` above the function. `loadout` is
 * the picker's question at every level-up, chest and shrine, where `{{name}}` embeds a piece of the
 * game state (bot/templates.ts BLOCKS).
 */
export type Drive = { code: string; loadout: string };

/** Checks a drive's shape. Whether the code type-checks is the agent server's to say (agent-server/code-check.ts), and what the loadout may embed the bot's (bot/drive.ts). */
export function parseDrive(input: unknown): Drive {
  const d = (input ?? {}) as Record<string, unknown>;
  if (typeof d.code !== "string" || d.code.trim() === "") throw new Error("drive.code must be the drive function's source");
  if (typeof d.loadout !== "string") throw new Error("drive.loadout must be a string");
  return { code: d.code, loadout: d.loadout };
}

/** The request the starting function was written from, and the worked example the builder is shown. */
export const EXAMPLE_REQUEST =
  "Farm xp by walking toward the fewest enemies. Open gold chests and chests and grab magnets when they are close, and use Spud Shrines while it is calm. Under 40% health, eat food if there is any; otherwise get away, dashing when hit hard, and keep clear until health is back over 70%.";

export const EXAMPLE_CODE = `type Memory = { retreating?: boolean };

function drive(state: State, memory: Memory): Action {
  const { tibo, enemies } = state;
  const pickups = state.pickups.filter((p) => !p.gaveUp);
  const pois = state.pois.filter((p) => !p.gaveUp);
  const health = (tibo.hp / tibo.maxHp) * 100;
  if (health < 40) memory.retreating = true;
  if (health >= 70) memory.retreating = false;

  if (memory.retreating) {
    const heal = pickups.find((p) => p.kind === "heal");
    if (heal) return { type: "pickup", id: heal.id, why: "retreat: eat" };
    if (tibo.hurt > 15) return { type: "dash", dir: enemies.fewest, why: "retreat: dash out" };
    return { type: "move", dir: enemies.fewest, why: "retreat" };
  }

  const goldChest = pickups.find((p) => p.kind === "goldChest" && p.dist < 700);
  if (goldChest) return { type: "pickup", id: goldChest.id, why: "open the gold chest" };

  const chest = pickups.find((p) => p.kind === "chest" && p.dist < 500);
  if (chest) return { type: "pickup", id: chest.id, why: "open the chest" };

  const magnet = pickups.find((p) => p.kind === "magnet" && p.dist < 400);
  if (magnet && state.ground.xp > 50) return { type: "pickup", id: magnet.id, why: "grab the magnet" };

  const shrine = pois.find((p) => p.kind === "chargeShrine" && p.dist < 400);
  if (shrine && enemies.onScreen < 25) return { type: "poi", id: shrine.id, why: "charge the Spud Shrine" };

  return { type: "xp", why: "gather xp" };
}`;
