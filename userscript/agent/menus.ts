import { button, inRun, modeScreen } from "../link/screen";
import { CommandFailure, type GameMode } from "../../protocol/commands";
import { GameLink } from "../link/game-link";
import { clearSeed } from "./seed";

/**
 * Picks a difficulty on the mode screen and returns what was picked, such as "hard" or
 * "nightmare-3". "highest" steps up while the game allows: to Nightmare, then up its levels, which
 * unlock as the profile plays them.
 */
async function pickDifficulty(difficulty: string): Promise<string> {
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
async function pickWeapon(id: string) {
  byTestId("start-pick-row")?.click();
  await wait(400);
  const option = document.querySelector<HTMLElement>(`[data-testid="start-pick-option-${id}"]`);
  if (option === null) {
    const offered = [...document.querySelectorAll<HTMLElement>('[data-testid^="start-pick-option-"]')].flatMap((o) => o.dataset.testid?.slice("start-pick-option-".length) ?? []).filter((x) => x !== "random");
    byTestId("start-pick-close")?.click();
    throw new CommandFailure("weaponNotOffered", `starting weapon ${id} is not offered; offered: ${offered.join(", ")}`, offered);
  }
  option.click();
  await wait(300);
  const now = byTestId("start-pick-row")?.dataset.picked;
  if (now !== id) throw new Error(`picked starting weapon ${id}, but the start screen shows ${now ?? "nothing"}`);
}

/** Walks a finished run's end screens until its summary shows the share link. */
export async function showSummary(link: GameLink) {
  if (inRun(link)) throw new Error("the run is still going");
  const before = link.runLink;
  for (let i = 0; i < 12; i++) {
    link.noteRunLink();
    if (link.runLink !== undefined && link.runLink !== before) return;
    const next = button(/^(Next|Continue|Skip)$/i);
    if (next !== undefined) await press(next);
    await wait(1000);
  }
  throw new Error("the run summary did not show a share link");
}

/**
 * Starts a run from wherever the game is: out of a run in progress, through the end screens, to the
 * mode screen, then the difficulty and the weapon. The run waits paused at tick 0. Returns what the
 * game picked, such as "nightmare-3".
 */
export async function startRun(link: GameLink, mode: GameMode, difficulty: string, weapon: string | undefined): Promise<string> {
  const entry = mode === "daily" ? /^Daily/ : "Open World";
  if (inRun(link)) {
    // Leave the current run through the pause menu: Main menu, then confirm. An agent's lockstep
    // pause is not the menu, and Escape does not open the menu over it.
    link.game?.setPaused(false);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
    if (!(await until(() => button("Main menu") !== undefined, 3000))) throw new Error("the pause menu did not open");
    for (let i = 0; i < 2 && button(entry) === undefined; i++) {
      const menu = button("Main menu");
      if (menu !== undefined) await press(menu);
      await wait(1500);
    }
  }
  link.noteRunLink();
  // After a death the game walks through a few screens (a promo, a summary) before the title.
  // Advance through them, never pressing anything that leaves the game, such as "Try Grok Bot".
  for (let i = 0; i < 14 && button(entry) === undefined && modeScreen() !== mode; i++) {
    // "Not now" closes the daily board's name picker without posting a name.
    const next = button(/^(Not now|Next|Continue|Skip|Done|Close|OK|Menu|Main menu|Title|Back to title|Back|Home)$/i);
    link.noteRunLink();
    if (next !== undefined) await press(next);
    else {
      // Some end screens (the run summary) have no button and listen for keys instead.
      for (const key of ["Escape", "Enter"]) {
        for (const type of ["keydown", "keyup"]) window.dispatchEvent(new KeyboardEvent(type, { key, code: key, bubbles: true }));
        await wait(400);
      }
    }
    await wait(1200);
  }
  if (modeScreen() !== mode) {
    const open = button(entry);
    if (open === undefined) {
      const seen = [...document.querySelectorAll("button")].map((b) => b.textContent?.trim()).filter(Boolean);
      throw new Error(`no way back to the title; buttons on screen: ${seen.join(", ") || "none"}`);
    }
    await press(open);
    if (!(await until(() => button("Start") !== undefined, 5000))) throw new Error(`the ${mode} screen did not open`);
  }
  const picked = await pickDifficulty(difficulty);
  if (weapon !== undefined) await pickWeapon(weapon);
  const before = link.game;
  link.pauseAtStart = true;
  button("Start")?.click();
  // The opening cutscene is skipped by holding Space.
  await wait(2500);
  window.dispatchEvent(new KeyboardEvent("keydown", { key: " ", code: "Space", bubbles: true }));
  const started = await until(() => inRun(link) && link.game !== before, 20000);
  window.dispatchEvent(new KeyboardEvent("keyup", { key: " ", code: "Space", bubbles: true }));
  if (!started) throw new Error("the run did not start within 20 seconds");
  clearSeed();
  return picked;
}

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// Some menu buttons only answer a click and others only a focused Enter, so try both.
async function press(el: HTMLElement) {
  el.click();
  await wait(300);
  if (!el.isConnected) return;
  el.focus();
  for (const type of ["keydown", "keyup"]) el.dispatchEvent(new KeyboardEvent(type, { key: "Enter", code: "Enter", bubbles: true }));
}

const byTestId = (id: string) => document.querySelector<HTMLButtonElement>(`[data-testid="${id}"]`) ?? undefined;

const locked = (b: HTMLButtonElement | undefined) => b === undefined || b.disabled || b.getAttribute("aria-disabled") === "true";

async function until(check: () => boolean, ms: number): Promise<boolean> {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    if (check()) return true;
    await wait(100);
  }
  return check();
}
