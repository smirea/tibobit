import { css as popupCss } from "./popup.css";
import { addStep, type Draft, type DraftStep, moveStep, parseTime } from "./draft";
import { activeStep, PLAN_EVERY } from "../../protocol/drive";
import { EMBEDS } from "../../bot/drive";
import { BLOCKS } from "../../bot/templates";
import type { Pilot } from "../pilot/pilot";
import { addStyle, h } from "../panel/dom";
import { clock } from "../../clock";
import type { Entity } from "./entities";
import { ACTION_ICONS, svgIcon } from "../pilot/icons";
import EXAMPLES from "./examples.json";

/** The game as the popup needs it: it pauses a run while the instructions are open. */
export type GameControl = {
  /** Pauses a run that is playing; true when this call paused it. */
  pause(): boolean;
  resume(): void;
  /** Game seconds of the run in progress, if there is one. */
  time(): number | undefined;
  /** What the autopilot can be sent to, by the names the planner reads. */
  entities(): Entity[];
};

/** Which embeds a field may use: the planner's prompt and steps take {{why}}, the picker's question {{choice}}. */
type FieldKind = "planner" | "loadout";
const ALLOWED: Record<FieldKind, Set<string>> = {
  planner: new Set([...Object.keys(BLOCKS), "why"]),
  loadout: new Set([...Object.keys(BLOCKS), "choice"]),
};
const ONLY: Record<string, string> = { why: "planner and steps only", choice: "loadout only" };

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A textarea that grows with its text and shows each {{embed}} as a chip: a copy of the text sits
 * under the transparent textarea in the same grid cell, so it sets the height and draws the chips.
 */
function growField(kind: FieldKind, placeholder: string, onInput: (value: string) => void) {
  const area = h("textarea", "tbh-fsd-area");
  area.classList.add(`tbh-fsd-area-${kind}`);
  area.placeholder = placeholder;
  area.spellcheck = false;
  area.rows = 1;
  area.dataset.kind = kind;
  const mirror = h("div", "tbh-fsd-mirror");
  mirror.setAttribute("aria-hidden", "true");
  const wrap = h("div", "tbh-fsd-grow", mirror, area);
  const paint = () => {
    const parts = area.value.split(/(\{\{\w+\}\})/);
    mirror.replaceChildren(
      ...parts.map((part) => {
        const name = /^\{\{(\w+)\}\}$/.exec(part)?.[1];
        return name === undefined ? part : h("mark", `tbh-fsd-chip${ALLOWED[kind].has(name) ? "" : " tbh-fsd-chip-bad"}`, part);
      }),
      // A trailing newline only takes up a line with something after it.
      " ",
    );
  };
  area.addEventListener("input", () => {
    paint();
    onInput(area.value);
  });
  return {
    wrap,
    area,
    /** The embed under a point, if any, with its box. */
    chipAt(x: number, y: number): { name: string; box: DOMRect } | undefined {
      for (const mark of mirror.querySelectorAll("mark")) {
        const box = [...mark.getClientRects()].find((r) => x >= r.left && x <= r.right && y >= r.top && y <= r.bottom);
        if (box !== undefined) return { name: mark.textContent?.slice(2, -2) ?? "", box };
      }
      return undefined;
    },
    set(value: string) {
      if (area.value !== value) area.value = value;
      paint();
    },
  };
}

function errorList(messages: readonly string[]): HTMLElement {
  const el = h("ul", "tbh-fsd-errors", ...messages.map((m) => h("li", "", m)));
  el.hidden = messages.length === 0;
  return el;
}

/**
 * Full Self Driving's instructions: a dialog that flips out of the button that opened it, with the
 * game state to embed on the left, the planner's prompt with its timeline under it, and the picker's
 * loadout question beside it. Everything is kept in this browser as it is typed.
 */
export function fsdPopup(pilot: Pilot, game: GameControl): { open(from: HTMLElement): void } {
  addStyle(popupCss);
  const dialog = h("dialog", "tbh-fsd");
  dialog.setAttribute("aria-labelledby", "tbh-fsd-title");
  let origin: HTMLElement | undefined;
  let pausedHere = false;
  let closing = false;
  /** The field an embed goes into: the one last focused. */
  let target: HTMLTextAreaElement | undefined;

  const draft = () => pilot.draft();
  const fields = new Map<HTMLTextAreaElement, ReturnType<typeof growField>>();
  const registered = <F extends ReturnType<typeof growField>>(field: F): F => {
    fields.set(field.area, field);
    return field;
  };
  const edit = (change: (d: Draft) => Draft) => pilot.edit(change(draft()));

  // Header.
  const title = h("h2", "tbh-fsd-title", h("span", "tbh-fsd-logo", "FSD"), "Full Self Driving");
  title.id = "tbh-fsd-title";
  const status = h("span", "tbh-fsd-status");
  const closeX = h("button", "tbh-fsd-x", "×");
  closeX.type = "button";
  closeX.setAttribute("aria-label", "Close");
  closeX.addEventListener("click", () => close());
  const head = h("header", "tbh-fsd-head", title, status, closeX);

  // One tooltip for everything hovered: a state item, an embed in a field, or a thing in the world.
  const tip = h("div", "tbh-fsd-tip");
  tip.hidden = true;
  tip.setAttribute("role", "tooltip");
  let tipFor = "";
  const showTip = (key: string, box: DOMRect, ...content: (Node | string)[]) => {
    if (tipFor !== key) {
      tipFor = key;
      tip.replaceChildren(...content);
    }
    tip.hidden = false;
    const width = tip.offsetWidth;
    const height = tip.offsetHeight;
    const left = Math.max(8, Math.min(innerWidth - width - 8, box.left));
    const below = box.bottom + 6 + height <= innerHeight - 8;
    tip.style.left = `${left}px`;
    tip.style.top = `${below ? box.bottom + 6 : Math.max(8, box.top - 6 - height)}px`;
  };
  const hideTip = () => {
    tip.hidden = true;
    tipFor = "";
  };
  /** An embed's description, and its value: live once the bot has driven, else one from a real run. */
  const embedTip = (name: string, box: DOMRect) => {
    const about = EMBEDS[name as keyof typeof EMBEDS];
    const live = pilot.preview();
    const value = live?.blocks[name] ?? (EXAMPLES as Record<string, string>)[name];
    const label = live?.blocks[name] !== undefined ? `Last seen in a run, at ${clock(live.time)}` : value === undefined ? "" : "Example";
    showTip(
      `embed:${name}:${live?.time ?? ""}`,
      box,
      h("b", "tbh-fsd-tip-name", `{{${name}}}`),
      h("div", "tbh-fsd-tip-about", about === undefined ? "Not part of the state: the planner cannot read this." : about),
      ...(value === undefined ? [] : [h("div", "tbh-fsd-tip-label", label), h("pre", "tbh-fsd-tip-value", value)]),
    );
  };

  // The state to embed.
  const search = h("input", "tbh-fsd-search");
  Object.assign(search, { type: "search", placeholder: "Filter the state…" });
  search.setAttribute("aria-label", "Filter the state");
  const blockList = h("div", "tbh-fsd-blocks");
  const blockEls = new Map<string, { el: HTMLButtonElement; count: HTMLElement }>();
  for (const [name, about] of Object.entries(EMBEDS)) {
    const count = h("span", "tbh-fsd-block-count");
    const el = h("button", "tbh-fsd-block", h("span", "tbh-fsd-block-head", h("b", "", `{{${name}}}`), ...(ONLY[name] === undefined ? [] : [h("i", "", ONLY[name])]), count), h("span", "tbh-fsd-block-about", about));
    el.type = "button";
    el.dataset.name = name;
    // Keeps the caret in the field, so the embed lands where it is.
    el.addEventListener("mousedown", (e) => e.preventDefault());
    el.addEventListener("click", () => insert(`{{${name}}}`));
    el.addEventListener("pointerenter", () => embedTip(name, el.getBoundingClientRect()));
    el.addEventListener("pointerleave", hideTip);
    blockEls.set(name, { el, count });
    blockList.append(el);
  }
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    for (const [name, { el }] of blockEls) el.hidden = q !== "" && !`${name} ${EMBEDS[name as keyof typeof EMBEDS]}`.toLowerCase().includes(q);
  });
  const statePane = h("aside", "tbh-fsd-state", h("h3", "tbh-fsd-label", "Game state"), h("p", "tbh-fsd-hint", "Click to embed it where the caret is; hover for an example. The model reads only what you embed."), search, blockList);

  // The planner's prompt, its pace, and its timeline.
  const paceOut = h("output", "tbh-fsd-pace-out");
  const pace = h("input", "tbh-fsd-pace");
  Object.assign(pace, { type: "range", min: String(PLAN_EVERY.min), max: String(PLAN_EVERY.max), step: "1" });
  pace.setAttribute("aria-label", "Seconds between planner runs");
  pace.addEventListener("input", () => edit((d) => ({ ...d, planEvery: Number(pace.value) })));
  const prompt = registered(growField("planner", "What should Tibo do? Embed the state the planner should read.", (value) => edit((d) => ({ ...d, prompt: value }))));
  const promptErrors = h("div", "");
  const plannerHead = h("div", "tbh-fsd-field-head", h("h3", "tbh-fsd-label", "Planner"), h("label", "tbh-fsd-pace-field", "runs every", pace, paceOut));
  const plannerHint = h("p", "tbh-fsd-hint", "Sent every time the planner runs: on that interval, and whenever a goal ends, a card is taken, a boss shows up or the instructions change. It picks what the autopilot walks Tibo to next.");

  const stepList = h("ol", "tbh-fsd-steps");
  const addButton = h("button", "tbh-fsd-add", "+ Add instructions");
  addButton.type = "button";
  addButton.addEventListener("click", () => {
    edit((d) => ({ ...d, steps: addStep(d.steps) }));
    renderSteps();
    stepRows.get(draft().steps.at(-1)?.id ?? -1)?.time.focus();
  });
  const timeline = h(
    "section",
    "tbh-fsd-timeline",
    h("h3", "tbh-fsd-label", "Timeline"),
    h("p", "tbh-fsd-hint", "Added after the prompt from its game time on, until the next one takes over. Drag ⠿ to reorder."),
    stepList,
    addButton,
  );
  const planner = h("section", "tbh-fsd-planner", plannerHead, plannerHint, prompt.wrap, promptErrors, timeline);

  const loadout = registered(growField("loadout", "How should the picker choose cards?", (value) => edit((d) => ({ ...d, loadout: value }))));
  const loadoutErrors = h("div", "");
  const loadoutPane = h(
    "section",
    "tbh-fsd-loadout",
    h("div", "tbh-fsd-field-head", h("h3", "tbh-fsd-label", "Loadout")),
    h("p", "tbh-fsd-hint", "The picker's question at every level-up, chest and shrine. It also reads the planner's prompt."),
    loadout.wrap,
    loadoutErrors,
  );
  const entityList = h("div", "tbh-fsd-entities");
  const entityPane = h(
    "section",
    "tbh-fsd-world",
    h("h3", "tbh-fsd-label", "In the world"),
    h("p", "tbh-fsd-hint", "What the autopilot can walk Tibo to, by the names the planner reads. Click to add the name where the caret is."),
    entityList,
  );
  const renderEntities = () => {
    const entities = game.entities();
    entityList.replaceChildren(
      ...entities.map((e) => {
        const el = h("button", "tbh-fsd-entity", svgIcon(ACTION_ICONS[e.tag], "tbh-fsd-entity-icon"), e.name);
        el.type = "button";
        el.addEventListener("mousedown", (ev) => ev.preventDefault());
        el.addEventListener("click", () => insert(e.name));
        el.addEventListener("pointerenter", () => showTip(`entity:${e.name}`, el.getBoundingClientRect(), h("b", "tbh-fsd-tip-name", e.name), h("div", "tbh-fsd-tip-about", e.about || "No description in the game.")));
        el.addEventListener("pointerleave", hideTip);
        return el;
      }),
      ...(entities.length > 2 ? [] : [h("p", "tbh-fsd-hint", "The game's places get their names once a run has started.")]),
    );
  };

  // Footer.
  const saved = h("span", "tbh-fsd-saved");
  const stopButton = h("button", "tbh-fsd-stop", "Stop driving");
  stopButton.type = "button";
  stopButton.addEventListener("click", () => pilot.stop());
  const engage = h("button", "tbh-fsd-engage");
  engage.type = "button";
  engage.addEventListener("click", () => {
    if (pilot.state().state === "off" && !pilot.engage()) return;
    close();
  });
  const foot = h("footer", "tbh-fsd-foot", saved, stopButton, engage);

  const body = h("div", "tbh-fsd-body", statePane, h("div", "tbh-fsd-main", planner, h("div", "tbh-fsd-side", loadoutPane, entityPane)));
  const sheet = h("div", "tbh-fsd-sheet", head, body, foot);
  dialog.append(sheet, tip);
  document.body.append(dialog);

  dialog.addEventListener("focusin", (e) => {
    if (e.target instanceof HTMLTextAreaElement) target = e.target;
  });
  // The embeds sit under the transparent text, so the pointer is matched against their boxes.
  dialog.addEventListener("pointermove", (e) => {
    const field = e.target instanceof HTMLTextAreaElement ? fields.get(e.target) : undefined;
    if (field === undefined) return;
    const chip = field.chipAt(e.clientX, e.clientY);
    if (chip === undefined) {
      if (tipFor.startsWith("embed:")) hideTip();
    } else embedTip(chip.name, chip.box);
  });
  dialog.addEventListener("pointerout", (e) => {
    if (e.target instanceof HTMLTextAreaElement) hideTip();
  });
  sheet.addEventListener("scroll", hideTip, true);

  /** Puts text where the caret is in the field last used, and goes back to typing there. */
  function insert(text: string) {
    const field = target ?? prompt.area;
    const start = field.selectionStart;
    const before = field.value.slice(0, start);
    const pad = before === "" || /\s$/.test(before) ? "" : " ";
    field.setRangeText(`${pad}${text}`, start, field.selectionEnd, "end");
    field.focus();
    field.dispatchEvent(new Event("input", { bubbles: true }));
  }

  // The timeline's rows, kept by step id so typing never rebuilds the row being typed in.
  type Row = { li: HTMLLIElement; time: HTMLInputElement; field: ReturnType<typeof growField>; errors: HTMLElement };
  const stepRows = new Map<number, Row>();
  let dragging: number | undefined;

  const stepRow = (step: DraftStep): Row => {
    const handle = h("span", "tbh-fsd-handle", "⠿");
    handle.draggable = true;
    handle.title = "Drag to reorder";
    const time = h("input", "tbh-fsd-time");
    Object.assign(time, { type: "text", placeholder: "m:ss", inputMode: "numeric" });
    time.setAttribute("aria-label", "Game time these instructions start");
    time.addEventListener("input", () => edit((d) => ({ ...d, steps: d.steps.map((s) => (s.id === step.id ? { ...s, time: time.value } : s)) })));
    time.addEventListener("change", () => {
      const at = parseTime(time.value);
      if (at !== undefined && clock(at) !== time.value) {
        time.value = clock(at);
        time.dispatchEvent(new Event("input"));
      }
    });
    const field = registered(growField("planner", "Instructions from this time on…", (value) => edit((d) => ({ ...d, steps: d.steps.map((s) => (s.id === step.id ? { ...s, text: value } : s)) }))));
    const remove = h("button", "tbh-fsd-remove", "×");
    remove.type = "button";
    remove.setAttribute("aria-label", "Remove these instructions");
    remove.addEventListener("click", () => {
      edit((d) => ({ ...d, steps: d.steps.filter((s) => s.id !== step.id) }));
      renderSteps();
    });
    const errors = h("div", "tbh-fsd-step-errors");
    const li = h("li", "tbh-fsd-step", handle, time, field.wrap, remove, errors);
    li.dataset.id = String(step.id);
    handle.addEventListener("dragstart", (e) => {
      dragging = step.id;
      e.dataTransfer?.setData("text/plain", String(step.id));
      if (e.dataTransfer !== null) e.dataTransfer.effectAllowed = "move";
      e.dataTransfer?.setDragImage(li, 16, 16);
      requestAnimationFrame(() => li.classList.add("tbh-fsd-dragging"));
    });
    handle.addEventListener("dragend", () => {
      li.classList.remove("tbh-fsd-dragging");
      dragging = undefined;
      // A drop outside the list puts the rows back as the draft has them.
      renderSteps();
    });
    return { li, time, field, errors };
  };

  stepList.addEventListener("dragover", (e) => {
    if (dragging === undefined) return;
    e.preventDefault();
    if (e.dataTransfer !== null) e.dataTransfer.dropEffect = "move";
    const moving = stepRows.get(dragging)?.li;
    if (moving === undefined) return;
    const after = [...stepList.children].find((li) => li !== moving && e.clientY < li.getBoundingClientRect().top + li.getBoundingClientRect().height / 2);
    if (after === undefined) {
      if (stepList.lastElementChild !== moving) stepList.append(moving);
    } else if (moving.nextElementSibling !== after) stepList.insertBefore(moving, after);
  });
  stepList.addEventListener("drop", (e) => {
    if (dragging === undefined) return;
    e.preventDefault();
    const id = dragging;
    const from = draft().steps.findIndex((s) => s.id === id);
    const to = [...stepList.children].findIndex((li) => (li as HTMLElement).dataset.id === String(id));
    dragging = undefined;
    if (from >= 0 && to >= 0) edit((d) => ({ ...d, steps: moveStep(d.steps, from, to) }));
  });

  function renderSteps() {
    const steps = draft().steps;
    const ids = new Set(steps.map((s) => s.id));
    for (const [id, row] of [...stepRows]) {
      if (ids.has(id)) continue;
      stepRows.delete(id);
      fields.delete(row.field.area);
    }
    const lis = steps.map((s) => {
      const row = stepRows.get(s.id) ?? stepRow(s);
      stepRows.set(s.id, row);
      return row.li;
    });
    if (lis.length !== stepList.children.length || lis.some((li, i) => stepList.children[i] !== li)) stepList.replaceChildren(...lis);
    render();
  }

  function render() {
    const d = draft();
    const check = pilot.check();
    const driving = pilot.state().state !== "off";
    pace.value = String(d.planEvery);
    paceOut.textContent = `${d.planEvery} s`;
    prompt.set(d.prompt);
    loadout.set(d.loadout);
    promptErrors.replaceChildren(errorList(check.prompt));
    loadoutErrors.replaceChildren(errorList(check.loadout));

    const time = game.time();
    const parsed = d.steps.map((s, i) => (i === 0 ? 0 : (parseTime(s.time) ?? Number.POSITIVE_INFINITY)));
    const active = time === undefined ? -1 : activeStep(parsed.map((at) => ({ at, text: "" })), time);
    for (const [i, s] of d.steps.entries()) {
      const row = stepRows.get(s.id);
      if (row === undefined) continue;
      const errors = check.steps.get(s.id) ?? [];
      if (document.activeElement !== row.time && row.time.value !== s.time) row.time.value = s.time;
      row.time.readOnly = i === 0;
      row.time.title = i === 0 ? "The first instructions start the run" : "";
      row.li.classList.toggle("tbh-fsd-step-bad", errors.length > 0);
      row.time.classList.toggle("tbh-fsd-invalid", errors.some((m) => /time|after/i.test(m)));
      row.field.set(s.text);
      row.errors.replaceChildren(errorList(errors));
      row.li.classList.toggle("tbh-fsd-step-now", i === active);
      row.li.title = i === active ? "In effect now" : "";
      row.li.querySelector<HTMLButtonElement>(".tbh-fsd-remove")?.toggleAttribute("disabled", i === 0);
    }

    const used = (name: string) => [d.prompt, d.loadout, ...d.steps.map((s) => s.text)].join("\n").split(`{{${name}}}`).length - 1;
    for (const [name, { el, count }] of blockEls) {
      const n = used(name);
      count.textContent = n === 0 ? "" : `×${n}`;
      el.classList.toggle("tbh-fsd-block-used", n > 0);
    }

    const problems = check.prompt.length + check.loadout.length + [...check.steps.values()].reduce((n, m) => n + m.length, 0);
    const connected = pilot.connected();
    status.textContent = driving ? "Driving: changes reach the planner as you type" : connected ? "" : "The agent server is not connected";
    status.dataset.state = driving ? "on" : connected ? "" : "error";
    saved.textContent = problems === 0 ? "Saved in this browser" : `Saved in this browser · ${problems} to fix${driving ? " before the bot gets the change" : ""}`;
    saved.classList.toggle("tbh-fsd-saved-bad", problems > 0);
    stopButton.hidden = !driving;
    engage.textContent = driving ? "Back to the game" : "Engage";
    engage.disabled = !driving && (problems > 0 || !connected);
    engage.title = driving ? "" : !connected ? "Start the agent server first: ./agent-server/main.ts" : problems > 0 ? "Fix what is marked red first" : "";
  }

  /** The sheet's flip between the button's box and its own: a full turn on the way out. */
  function flip(opening: boolean): Promise<unknown> {
    const from = origin?.isConnected ? origin.getBoundingClientRect() : undefined;
    if (from === undefined || from.width === 0 || reducedMotion()) {
      const fade = [{ opacity: 0 }, { opacity: 1 }];
      return sheet.animate(fade, { duration: 160, direction: opening ? "normal" : "reverse" }).finished;
    }
    const to = sheet.getBoundingClientRect();
    const dx = from.left + from.width / 2 - (to.left + to.width / 2);
    const dy = from.top + from.height / 2 - (to.top + to.height / 2);
    const small = `perspective(1600px) translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height}) rotateY(0deg)`;
    const big = "perspective(1600px) translate(0px, 0px) scale(1, 1) rotateY(360deg)";
    const frames: Keyframe[] = [
      { transform: small, opacity: 0.5, offset: 0 },
      { opacity: 1, offset: 0.35 },
      { transform: big, opacity: 1, offset: 1 },
    ];
    return sheet.animate(frames, { duration: opening ? 820 : 520, direction: opening ? "normal" : "reverse", easing: opening ? "cubic-bezier(.2,.8,.25,1)" : "cubic-bezier(.75,0,.8,.2)" }).finished;
  }

  function close() {
    if (!dialog.open || closing) return;
    closing = true;
    hideTip();
    dialog.classList.add("tbh-fsd-leaving");
    void flip(false).then(() => {
      dialog.close();
      dialog.classList.remove("tbh-fsd-leaving");
      closing = false;
      if (pausedHere) game.resume();
      pausedHere = false;
    });
  }

  dialog.addEventListener("cancel", (e) => {
    e.preventDefault();
    close();
  });
  // A click on the backdrop lands on the dialog itself.
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) close();
  });
  pilot.onChange(() => {
    if (dialog.open) render();
  });

  return {
    open(from) {
      if (dialog.open) return;
      origin = from;
      pausedHere = game.pause();
      renderSteps();
      renderEntities();
      dialog.showModal();
      target = undefined;
      prompt.area.focus({ preventScroll: true });
      prompt.area.setSelectionRange(prompt.area.value.length, prompt.area.value.length);
      void flip(true);
    },
  };
}
