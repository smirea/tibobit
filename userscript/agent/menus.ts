/**
 * Picks a difficulty on the mode screen and returns what was picked, such as "hard" or
 * "nightmare-3". "highest" steps up while the game allows: to Nightmare, then up its levels, which
 * unlock as the profile plays them.
 */
import { button, byTestId, locked, press, wait } from "../game/screen";

export async function pickDifficulty(difficulty: string): Promise<string> {
  if (difficulty === "highest") {
    for (let i = 0; i < 10 && !locked(byTestId("pick-harder")); i++) await press(byTestId("pick-harder") as HTMLButtonElement);
    for (let i = 0; i < 100 && !locked(byTestId("nightmare-higher")); i++) {
      byTestId("nightmare-higher")?.click();
      await wait(100);
    }
  } else {
    const pick = button(new RegExp(`^${difficulty}$`, "i"));
    if (pick === undefined) throw new Error(`no ${difficulty} difficulty button`);
    pick.click();
  }
  await wait(200);
  const chosen = document.querySelector<HTMLElement>('.run-picker-chip[aria-pressed="true"]')?.dataset.level;
  if (chosen === undefined) throw new Error("no difficulty is picked on the mode screen");
  const level = chosen === "nightmare" ? byTestId("nightmare-level")?.textContent?.match(/\d+/)?.[0] : undefined;
  return level === undefined ? chosen : `${chosen}-${level}`;
}

/** Picks the starting weapon on the mode screen, or fails naming the ones the game offers. */
export async function pickWeapon(id: string) {
  byTestId("start-pick-row")?.click();
  await wait(400);
  const option = document.querySelector<HTMLElement>(`[data-testid="start-pick-option-${id}"]`);
  if (option === null) {
    const offered = [...document.querySelectorAll<HTMLElement>('[data-testid^="start-pick-option-"]')].map((o) => o.dataset.testid?.slice("start-pick-option-".length)).filter((x) => x !== "random");
    byTestId("start-pick-close")?.click();
    throw new Error(`starting weapon ${id} is not offered; offered: ${offered.join(", ")}`);
  }
  option.click();
  await wait(300);
  const now = byTestId("start-pick-row")?.dataset.picked;
  if (now !== id) throw new Error(`picked starting weapon ${id}, but the start screen shows ${now ?? "nothing"}`);
}
