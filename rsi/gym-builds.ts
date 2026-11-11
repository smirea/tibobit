/** The gyms the loop keeps from the start: the opening and the first boss on the next ladder level and on the goal level, and minutes 5 and 10 on the next level. */
import { stopping } from "./stop";
import { EVAL_SEED } from "./flags";
import type { Templates } from "../bot/templates";
import { type Gym, updateGyms } from "./store/gyms";
import { onSlots, Slot } from "./training/slots";
import { slots } from "./session";
import { GOAL_LEVEL } from "./rules";
import { clockPadded } from "../format";

export function standardGyms(next: number): Gym[] {
  const gym = (name: string, difficulty: number, at: number, purpose: string): Gym => ({ name, status: "pending", purpose, coach: "loop", created: "start", difficulty, at, weapon: "", seed: "", source: `built from a fresh game to ${clockPadded(at)}` });
  return [
    gym(`opening-nm${next}`, next, 0, "The first seconds of a game on the next ladder level: openings, first picks and early routes."),
    gym(`first-boss-nm${next}`, next, 105, "Just before the 2:00 boss on the next ladder level."),
    gym(`minute-5-nm${next}`, next, 300, "Minute 5 on the next ladder level, with a build of its own."),
    gym(`minute-10-nm${next}`, next, 600, "Minute 10 on the next ladder level, where the pests have reached full health."),
    gym(`opening-nm${GOAL_LEVEL}`, GOAL_LEVEL, 0, `The opening on Nightmare ${GOAL_LEVEL}, the campaign's goal.`),
    gym(`first-boss-nm${GOAL_LEVEL}`, GOAL_LEVEL, 105, `Just before the 2:00 boss on Nightmare ${GOAL_LEVEL}.`),
  ];
}

const building = new Map<string, Promise<Gym>>();

/** Builds a gym on a slot and records the outcome; one build per gym at a time in this process. */
export function buildGym(slot: Slot, gym: Gym, templates: Templates): Promise<Gym> {
  const running = building.get(gym.name);
  if (running !== undefined) return running;
  const work = (async () => {
    console.log(`building gym ${gym.name} on ${slot.name}`);
    const built = await slot.buildGym({ ...gym, status: "building" }, gym.templates ?? templates, EVAL_SEED);
    // A build cut off by a stop stays building, and goes back to pending on restart.
    if (stopping) return built;
    await updateGyms((gyms) => {
      const at = gyms.findIndex((g) => g.name === gym.name);
      if (at >= 0) gyms[at] = built;
      else gyms.push(built);
    });
    console.log(`gym ${gym.name}: ${built.status}${built.error === undefined ? "" : ` (${built.error})`}`);
    return built;
  })().finally(() => building.delete(gym.name));
  building.set(gym.name, work);
  return work;
}

/** Marks the pending gyms as building and returns them to build. */
export const claimPending = () =>
  updateGyms((gyms) => {
    const claimed = gyms.filter((g) => g.status === "pending");
    for (const g of claimed) g.status = "building";
    return claimed.map((g) => ({ ...g }));
  });

export async function buildClaimed(claimed: Gym[], templates: Templates): Promise<string[]> {
  const built = await onSlots(slots, claimed, (slot, g) => buildGym(slot, g, templates));
  return built.map((g) => `Gym ${g.name}: ${g.status}${g.error === undefined ? "" : ` (${g.error})`}${g.checkpoint === undefined ? "" : `, lv ${g.checkpoint.level}, hp ${g.checkpoint.hp}, ${g.checkpoint.weapons.join(", ")}`}.`);
}
