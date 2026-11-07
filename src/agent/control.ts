import type { Game, GameLink, GameState } from "../game";
import { type Command, type CommandStatus, DIRECTIONS, type Envelope, type Heading, type Target } from "./protocol";
import { choiceCards, inRun } from "./snapshot";

const TICKS_PER_SECOND = 60;
const STUCK_TICKS = 90;
const KEEP_STATUSES = 10;

type Movement = Extract<Command, { type: "move" } | { type: "goto" }>;

type Active = {
  status: CommandStatus;
  command: Movement;
  startTick?: number;
  arrivedTick?: number;
  best?: { dist: number; tick: number };
  /** Relative targets are anchored where the player stood when the command started. */
  anchor?: { x: number; y: number };
};

function vector(dir: Heading): { x: number; y: number } {
  const degrees = typeof dir === "number" ? dir : DIRECTIONS.indexOf(dir) * 45;
  const radians = (degrees * Math.PI) / 180;
  return { x: Math.cos(radians), y: Math.sin(radians) };
}

const STILL = { x: 0, y: 0 };

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

// The game's own buttons; the helper's panel and port box are never pressed by an agent command.
function button(label: string | RegExp): HTMLButtonElement | undefined {
  return [...document.querySelectorAll<HTMLButtonElement>("button")].find((b) => {
    if (b.closest("#tibo-helper, [class*='tbh-']")) return false;
    const text = b.textContent?.trim() ?? "";
    return typeof label === "string" ? text === label : label.test(text);
  });
}

/** On a mode screen (difficulty buttons and Start), the Daily one also has a Leaderboard button. */
function onModeScreen(mode: "openWorld" | "daily"): boolean | undefined {
  if (button("Start") === undefined) return undefined;
  return (button("Leaderboard") !== undefined) === (mode === "daily");
}

// Some menu buttons only answer a click and others only a focused Enter, so try both.
async function press(el: HTMLElement) {
  el.click();
  await wait(300);
  if (!el.isConnected) return;
  el.focus();
  for (const type of ["keydown", "keyup"]) el.dispatchEvent(new KeyboardEvent(type, { key: "Enter", code: "Enter", bubbles: true }));
}

async function until(check: () => boolean, ms: number): Promise<boolean> {
  const end = performance.now() + ms;
  while (performance.now() < end) {
    if (check()) return true;
    await wait(100);
  }
  return check();
}

export class Controller {
  readonly statuses: CommandStatus[] = [];
  private active: Active | undefined;

  constructor(private link: GameLink) {
    link.steer = (game) => this.steer(game);
  }

  handle({ id, command }: Envelope) {
    const status: CommandStatus = { id, command, state: "running", at: Date.now() };
    this.statuses.push(status);
    if (this.statuses.length > KEEP_STATUSES) this.statuses.splice(0, this.statuses.length - KEEP_STATUSES);
    try {
      this.run(status, command);
    } catch (e) {
      this.finish(status, "failed", e instanceof Error ? e.message : String(e));
    }
  }

  /** After the bot lets go: no held movement, normal speed, and a run the bot left paused resumes. */
  release() {
    if (this.active !== undefined) this.finish(this.active.status, "replaced");
    this.link.speed = 1;
    this.link.liveForecast = false;
    if (inRun(this.link)) this.link.game?.setPaused(false);
  }

  private finish(status: CommandStatus, state: CommandStatus["state"], detail?: string) {
    status.state = state;
    status.at = Date.now();
    if (detail !== undefined) status.detail = detail;
    if (this.active?.status !== status) return;
    if (this.active.command.pause && state !== "replaced") this.link.game?.setPaused(true);
    this.active = undefined;
  }

  private game(): Game {
    const game = this.link.game;
    if (game === undefined || !inRun(this.link)) throw new Error("no run in progress");
    return game;
  }

  private run(status: CommandStatus, command: Command) {
    switch (command.type) {
      case "move":
      case "goto":
        const game = this.game();
        if (this.active !== undefined) this.finish(this.active.status, "replaced");
        this.active = { status, command };
        if (command.pause) game.setPaused(false);
        return;
      case "stop":
        if (this.active !== undefined) this.finish(this.active.status, "replaced");
        this.finish(status, "done");
        return;
      case "choose": {
        const game = this.game();
        if (game.state.choiceQueue.length === 0) throw new Error("no choice is open");
        if (choiceCards()[command.index] === undefined) throw new Error(`no option ${command.index}; there are ${choiceCards().length}`);
        // Cards ignore clicks while they animate in (right after a reroll, say), so click until the
        // choice changes, and fail rather than report a pick that never happened.
        const shown = () => `${game.state.choiceQueue.length}|${choiceCards().map((c) => c.textContent).join("|")}`;
        const before = shown();
        void (async () => {
          for (let attempt = 0; attempt < 10; attempt++) {
            choiceCards()[command.index]?.click();
            if (await until(() => shown() !== before, 300)) return this.finish(status, "done");
          }
          this.finish(status, "failed", "the option did not take");
        })();
        return;
      }
      case "dash": {
        const game = this.game();
        const me = game.state.me;
        const v = command.dir === undefined ? { x: game.state.player.fx[me] ?? 1, y: game.state.player.fy[me] ?? 0 } : vector(command.dir);
        game.dash(v.x, v.y);
        this.finish(status, "done");
        return;
      }
      case "pause":
      case "resume":
        this.game().setPaused(command.type === "pause");
        this.finish(status, "done");
        return;
      case "speed":
        this.link.speed = command.factor;
        this.finish(status, "done");
        return;
      case "forecast":
        this.link.liveForecast = command.live;
        this.finish(status, "done");
        return;
      case "start":
        this.start(status, command.mode ?? "openWorld", command.difficulty ?? "easy").catch((e) => this.finish(status, "failed", e instanceof Error ? e.message : String(e)));
        return;
      case "summary":
        this.summary(status).catch((e) => this.finish(status, "failed", e instanceof Error ? e.message : String(e)));
        return;
    }
  }

  // Only forward buttons: the summary sits right after the death screens, and anything else
  // ("Try Grok Bot", "Main menu") would leave it before its link is read.
  private async summary(status: CommandStatus) {
    if (inRun(this.link)) throw new Error("the run is still going");
    const before = this.link.runLink;
    for (let i = 0; i < 12; i++) {
      this.link.noteRunLink();
      if (this.link.runLink !== undefined && this.link.runLink !== before) return this.finish(status, "done");
      const next = button(/^(Next|Continue|Skip)$/i);
      if (next !== undefined) await press(next);
      await wait(1000);
    }
    throw new Error("the run summary did not show a share link");
  }

  private async start(status: CommandStatus, mode: "openWorld" | "daily", difficulty: string) {
    const entry = mode === "daily" ? /^Daily/ : "Open World";
    if (inRun(this.link)) {
      // Leave the current run through the pause menu: Main menu, then confirm. An agent's lockstep
      // pause is not the menu, and Escape does not open the menu over it.
      this.link.game?.setPaused(false);
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", code: "Escape", bubbles: true }));
      if (!(await until(() => button("Main menu") !== undefined, 3000))) throw new Error("the pause menu did not open");
      for (let i = 0; i < 2 && button(entry) === undefined; i++) {
        const menu = button("Main menu");
        if (menu !== undefined) await press(menu);
        await wait(1500);
      }
    }
    this.link.noteRunLink();
    // After a death the game walks through a few screens (a promo, a summary) before the title.
    // Advance through them, never pressing anything that leaves the game, such as "Try Grok Bot".
    for (let i = 0; i < 15 && button(entry) === undefined && onModeScreen(mode) !== true; i++) {
      if (i === 14) {
        const seen = [...document.querySelectorAll("button")].map((b) => b.textContent?.trim()).filter(Boolean);
        throw new Error(`no way back to the title; buttons on screen: ${seen.join(", ") || "none"}`);
      }
      // "Not now" closes the daily board's name picker without posting a name.
      const next = button(/^(Not now|Next|Continue|Skip|Done|Close|OK|Menu|Main menu|Title|Back to title|Back|Home)$/i);
      this.link.noteRunLink();
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
    if (onModeScreen(mode) !== true) {
      const open = button(entry);
      if (open === undefined) throw new Error(`no ${mode} button on the title screen`);
      await press(open);
      if (!(await until(() => button("Start") !== undefined, 5000))) throw new Error(`the ${mode} screen did not open`);
    }
    const pick = button(new RegExp(`^${difficulty}$`, "i"));
    if (pick === undefined) throw new Error(`no ${difficulty} difficulty button`);
    pick.click();
    await wait(200);
    const before = this.link.game;
    this.link.pauseAtStart = true;
    button("Start")?.click();
    // The opening cutscene is skipped by holding Space.
    await wait(2500);
    window.dispatchEvent(new KeyboardEvent("keydown", { key: " ", code: "Space", bubbles: true }));
    const started = await until(() => inRun(this.link) && this.link.game !== before, 20000);
    window.dispatchEvent(new KeyboardEvent("keyup", { key: " ", code: "Space", bubbles: true }));
    if (!started) throw new Error("the run did not start within 20 seconds");
    this.finish(status, "done");
  }

  private steer(game: Game): { x: number; y: number } | undefined {
    const active = this.active;
    if (active === undefined) return undefined;
    const s = game.state;
    active.startTick ??= s.tick;
    const elapsed = s.tick - active.startTick;
    const { command, status } = active;

    if (command.type === "move") {
      if (command.seconds !== undefined && elapsed >= command.seconds * TICKS_PER_SECOND) {
        this.finish(status, "done");
        return STILL;
      }
      return vector(command.dir);
    }

    if (elapsed >= (command.timeout ?? 60) * TICKS_PER_SECOND) {
      this.finish(status, "failed", "timeout");
      return STILL;
    }
    const goal = this.resolve(s, command.to, active);
    if (goal === undefined) {
      if (command.stay === "done" && active.arrivedTick !== undefined) this.finish(status, "done", "used up");
      else this.finish(status, "failed", "the target is gone");
      return STILL;
    }
    const me = s.me;
    const dx = goal.x - (s.player.x[me] ?? 0);
    const dy = goal.y - (s.player.y[me] ?? 0);
    const dist = Math.hypot(dx, dy);
    if (dist > goal.within) {
      if (active.best === undefined || dist < active.best.dist - 1) active.best = { dist, tick: s.tick };
      else if (s.tick - active.best.tick > STUCK_TICKS) {
        this.finish(status, "failed", `stuck ${Math.round(dist)} units away`);
        return STILL;
      }
      // Also covers being knocked out of the circle mid-stay: walk back, keep the stay timer.
      return { x: dx / dist, y: dy / dist };
    }
    active.arrivedTick ??= s.tick;
    active.best = undefined;
    const stay = command.stay;
    if (stay === undefined || stay === 0 || (typeof stay === "number" && s.tick - active.arrivedTick >= stay * TICKS_PER_SECOND)) {
      this.finish(status, "done");
    }
    return STILL;
  }

  private resolve(s: GameState, to: Target, active: Active): { x: number; y: number; within: number } | undefined {
    const within = active.command.type === "goto" ? active.command.within : undefined;
    if ("poi" in to) {
      const poi = s.world.activePois.find((p) => p.state.uid === to.poi);
      if (poi === undefined || poi.state.used || poi.state.goneAt >= 0) return undefined;
      return { x: poi.x, y: poi.y, within: within ?? poi.radius * 0.5 };
    }
    if ("pickup" in to) {
      if (!s.pickups.pool.has(to.pickup)) return undefined;
      // A pool id packs a generation counter above the 16-bit slot index.
      const slot = to.pickup & 0xffff;
      const kind = this.link.enums?.pickupKinds[s.pickups.kind[slot] ?? -1] ?? "";
      const radius = s.cfg.activation.pickupRadius[kind];
      return { x: s.pickups.x[slot] ?? 0, y: s.pickups.y[slot] ?? 0, within: within ?? (radius === undefined ? 6 : radius * 0.5) };
    }
    if ("dx" in to) {
      active.anchor ??= { x: (s.player.x[s.me] ?? 0) + to.dx, y: (s.player.y[s.me] ?? 0) + to.dy };
      return { ...active.anchor, within: within ?? 6 };
    }
    return { x: to.x, y: to.y, within: within ?? 6 };
  }
}
