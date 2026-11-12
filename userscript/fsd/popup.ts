import { css as popupCss } from "./popup.css";
import type { Draft } from "./draft";
import { machineView } from "./machine-view";
import { EMBEDS } from "../../bot/drive";
import { FIELDS, type MachineInput } from "../../protocol/machine";
import type { Pilot } from "../pilot/pilot";
import { addStyle, h } from "../panel/dom";
import { onOwnKeydown } from "../panel/keys";
import { clock } from "../../clock";
import { type Entity, ENTITY_TYPES } from "./entities";
import { ACTION_ICONS, svgIcon } from "../pilot/icons";
import EXAMPLE from "../../protocol/state.example.json";

/** The game as the popup needs it: it pauses a run while the popup is open. */
export type GameControl = {
  /** Pauses a run that is playing; true when this call paused it. */
  pause(): boolean;
  resume(): void;
  /** What the autopilot can be sent to, by the names the game shows. */
  entities(): Entity[];
};

/** What a field's {{embeds}} name: the machine's input in the builder's request, the state blocks in the picker's question. */
type FieldKind = "builder" | "loadout";

const EMBED = /(\{\{[\w.]+\}\})/;
const SPOT_PATH = /^spot\.\w+\.(count|dist)$/;
const isField = (name: string) => name in FIELDS || SPOT_PATH.test(name);
const known: Record<FieldKind, (name: string) => boolean> = { builder: isField, loadout: (name) => name in EMBEDS };

const read = (input: MachineInput, path: string) => path.split(".").reduce<unknown>((at, key) => (at as Record<string, unknown> | undefined)?.[key], input);

const fieldAbout = (path: string): string => {
  const kind = SPOT_PATH.test(path) ? path.split(".")[1] : undefined;
  if (kind === undefined) return FIELDS[path as keyof typeof FIELDS];
  return path.endsWith(".count") ? `how many unused ${kind} spots are on the loaded map` : `how far the nearest unused ${kind} spot is; 99999 when there is none`;
};

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A textarea that grows with its text and shows each {{embed}} as a chip: a copy of the text sits
 * under the transparent textarea in the same grid cell, so it sets the height and draws the chips.
 */
function growField(kind: FieldKind, placeholder: string, onInput: (value: string) => void) {
  const area = h("textarea", "tbh-fsd-area");
  area.placeholder = placeholder;
  area.spellcheck = false;
  area.rows = 1;
  const mirror = h("div", "tbh-fsd-mirror");
  mirror.setAttribute("aria-hidden", "true");
  const wrap = h("div", "tbh-fsd-grow", mirror, area);
  const paint = () => {
    mirror.replaceChildren(
      ...area.value.split(EMBED).map((part) => {
        const name = EMBED.test(part) ? part.slice(2, -2) : undefined;
        return name === undefined ? part : h("mark", `tbh-fsd-chip${known[kind](name) ? "" : " tbh-fsd-chip-bad"}`, part);
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
    kind,
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
 * Full Self Driving's setup: a dialog that flips out of the button that opened it. On the left is
 * what the state machine reads; in the middle the request Opus 5.5 builds the machine from, with
 * the machine drawn under it; on the right the picker's loadout question. Everything is kept in
 * this browser.
 */
export function fsdPopup(pilot: Pilot, game: GameControl): { open(from: HTMLElement): void } {
  addStyle(popupCss);
  const dialog = h("dialog", "tbh-fsd");
  dialog.setAttribute("aria-labelledby", "tbh-fsd-title");
  let origin: HTMLElement | undefined;
  let pausedHere = false;
  let closing = false;
  /** The field a name from the world goes into: the one last focused. */
  let target: HTMLTextAreaElement | undefined;
  let entities: Entity[] = [];

  const draft = () => pilot.draft();
  const edit = (change: (d: Draft) => Draft) => pilot.edit(change(draft()));

  const title = h("h2", "tbh-fsd-title", h("span", "tbh-fsd-logo", "FSD"), "Full Self Driving");
  title.id = "tbh-fsd-title";
  const status = h("span", "tbh-fsd-status");
  const closeX = h("button", "tbh-fsd-x", "×");
  closeX.type = "button";
  closeX.setAttribute("aria-label", "Close");
  closeX.addEventListener("click", () => close());
  const head = h("header", "tbh-fsd-head", title, status, closeX);

  // One tooltip for everything hovered: an input field, an embed in a text, or a thing in the world.
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
  /** A value the bot showed while driving if it has, else the one from a real run that ships with the script. */
  const valueTip = (name: string, box: DOMRect, about: string | undefined, live: string | undefined, example: string | undefined) => {
    const value = live ?? example;
    showTip(
      `embed:${name}:${pilot.preview()?.time ?? ""}`,
      box,
      h("b", "tbh-fsd-tip-name", `{{${name}}}`),
      h("div", "tbh-fsd-tip-about", about ?? "Not part of the state: nothing can read this."),
      ...(value === undefined ? [] : [h("div", "tbh-fsd-tip-label", live !== undefined ? `Last seen in a run, at ${clock(pilot.preview()?.time ?? 0)}` : "Example, from a real run"), h("pre", "tbh-fsd-tip-value", value)]),
    );
  };
  const shown = (v: unknown) => (v === undefined ? undefined : String(v));
  const embedTip = (kind: FieldKind, name: string, box: DOMRect) => {
    const live = pilot.preview();
    if (kind === "loadout") return valueTip(name, box, EMBEDS[name as keyof typeof EMBEDS], live?.blocks[name], (EXAMPLE.blocks as Record<string, string>)[name]);
    valueTip(name, box, isField(name) ? fieldAbout(name) : undefined, live === undefined ? undefined : shown(read(live.input, name)), shown(read(EXAMPLE.input, name)));
  };
  /** A chip that puts its text into a field when clicked, without taking the caret out of it. */
  const inserter = <E extends HTMLElement>(el: E, onClick: () => void): E => {
    el.addEventListener("mousedown", (e) => e.preventDefault());
    el.addEventListener("click", onClick);
    el.addEventListener("pointerleave", hideTip);
    return el;
  };

  // What the machine reads.
  const search = h("input", "tbh-fsd-search");
  Object.assign(search, { type: "search", placeholder: "Filter the input…" });
  search.setAttribute("aria-label", "Filter the machine's input");
  const fieldList = h("div", "tbh-fsd-blocks");
  const fieldEls = new Map<string, { el: HTMLButtonElement; value: HTMLElement; count: HTMLElement }>();
  const paths = [...Object.keys(FIELDS), ...Object.keys(EXAMPLE.input.spot).flatMap((kind) => [`spot.${kind}.count`, `spot.${kind}.dist`])];
  for (const path of paths) {
    const value = h("span", "tbh-fsd-block-value");
    const count = h("span", "tbh-fsd-block-count");
    const el = inserter(h("button", "tbh-fsd-block", h("span", "tbh-fsd-block-head", h("b", "", path), count, value), h("span", "tbh-fsd-block-about", fieldAbout(path))), () => insert(builder.area, `{{${path}}}`));
    el.type = "button";
    el.dataset.name = path;
    el.addEventListener("pointerenter", () => embedTip("builder", path, el.getBoundingClientRect()));
    fieldEls.set(path, { el, value, count });
    fieldList.append(el);
  }
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    for (const [path, { el }] of fieldEls) el.hidden = q !== "" && !`${path} ${fieldAbout(path)}`.toLowerCase().includes(q);
  });
  const statePane = h("aside", "tbh-fsd-state", h("h3", "tbh-fsd-label", "Machine input"), h("p", "tbh-fsd-hint", "What the state machine reads every step. Click a field to name it in your request."), search, fieldList);

  // The request, and the machine built from it.
  const builder = growField("builder", "How should Tibo play? Say what to go after, when, and when to back off.", (value) => edit((d) => ({ ...d, prompt: value })));
  const buildButton = h("button", "tbh-fsd-build");
  buildButton.type = "button";
  buildButton.addEventListener("click", () => pilot.buildMachine());
  onOwnKeydown((e) => {
    if (e.target === builder.area && e.key === "Enter" && (e.metaKey || e.ctrlKey)) pilot.buildMachine();
  });
  const buildNote = h("span", "tbh-fsd-build-note");
  const buildErrors = h("div", "");
  const view = machineView(false, (kind) => entities.find((e) => e.kind === kind)?.name);
  const machineTitle = h("div", "tbh-fsd-machine-title");
  const builderPane = h(
    "section",
    "tbh-fsd-builder",
    h("h3", "tbh-fsd-label", "State machine builder"),
    h("p", "tbh-fsd-hint", "Describe how Tibo should play. Opus 5.5 turns it into an XState machine: each state is one autopilot action, and each arrow a condition on the game."),
    builder.wrap,
    h("div", "tbh-fsd-build-row", buildButton, buildNote),
    buildErrors,
    h("h3", "tbh-fsd-label tbh-fsd-machine-label", "State machine"),
    machineTitle,
    h("div", "tbh-fsd-machine", view.el),
  );

  const loadout = growField("loadout", "How should the picker choose cards?", (value) => edit((d) => ({ ...d, loadout: value })));
  const loadoutErrors = h("div", "");
  const blockList = h(
    "div",
    "tbh-fsd-entities",
    ...Object.keys(EMBEDS).map((name) => {
      const el = inserter(h("button", "tbh-fsd-entity tbh-fsd-embed", `{{${name}}}`), () => insert(loadout.area, `{{${name}}}`));
      el.type = "button";
      el.addEventListener("pointerenter", () => embedTip("loadout", name, el.getBoundingClientRect()));
      return el;
    }),
  );
  const loadoutPane = h(
    "section",
    "tbh-fsd-loadout",
    h("h3", "tbh-fsd-label", "Loadout"),
    h("p", "tbh-fsd-hint", "The picker's question at every level-up, chest and shrine. It reads the game's state, and whatever you embed here."),
    loadout.wrap,
    loadoutErrors,
    h("details", "tbh-fsd-fold", h("summary", "", "State the picker can embed"), blockList),
  );
  const entityList = h("div", "tbh-fsd-entity-groups");
  const entityPane = h("section", "tbh-fsd-world", h("h3", "tbh-fsd-label", "In the world"), h("p", "tbh-fsd-hint", "What the autopilot can walk Tibo to. Click to add the name where the caret is."), entityList);
  const renderEntities = () => {
    entities = game.entities();
    const chip = (e: Entity) => {
      const el = inserter(h("button", "tbh-fsd-entity", svgIcon(ACTION_ICONS[e.tag], "tbh-fsd-entity-icon"), e.name), () => insert(target ?? builder.area, e.name));
      el.type = "button";
      el.addEventListener("pointerenter", () => showTip(`entity:${e.name}`, el.getBoundingClientRect(), h("b", "tbh-fsd-tip-name", e.name), h("div", "tbh-fsd-tip-about", e.about || "No description in the game.")));
      return el;
    };
    entityList.replaceChildren(
      ...Object.entries(ENTITY_TYPES).flatMap(([type, label]) => {
        const group = entities.filter((e) => e.type === type);
        return group.length === 0 ? [] : [h("h4", "tbh-fsd-entity-type", label), h("div", "tbh-fsd-entities", ...group.map(chip))];
      }),
      ...(entities.some((e) => e.type !== "pickup") ? [] : [h("p", "tbh-fsd-hint", "The game's places get their names once a run has started.")]),
    );
  };

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

  const body = h("div", "tbh-fsd-body", statePane, h("div", "tbh-fsd-main", builderPane, h("div", "tbh-fsd-side", loadoutPane, entityPane)));
  const sheet = h("div", "tbh-fsd-sheet", head, body, foot);
  dialog.append(sheet, tip);
  document.body.append(dialog);

  const fields = new Map([builder, loadout].map((f) => [f.area, f]));
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
    } else embedTip(field.kind, chip.name, chip.box);
  });
  dialog.addEventListener("pointerout", (e) => {
    if (e.target instanceof HTMLTextAreaElement) hideTip();
  });
  sheet.addEventListener("scroll", hideTip, true);

  /** Puts text where the caret is in a field, and goes back to typing there. */
  function insert(field: HTMLTextAreaElement, text: string) {
    const start = field.selectionStart;
    const before = field.value.slice(0, start);
    const pad = before === "" || /\s$/.test(before) ? "" : " ";
    field.setRangeText(`${pad}${text}`, start, field.selectionEnd, "end");
    field.focus();
    field.dispatchEvent(new Event("input", { bubbles: true }));
  }

  // The seconds a build has taken tick while it runs.
  let ticking: ReturnType<typeof setInterval> | undefined;

  function render() {
    const d = draft();
    const check = pilot.check();
    const driving = pilot.state().state !== "off";
    const connected = pilot.connected();
    const since = pilot.building();
    builder.set(d.prompt);
    loadout.set(d.loadout);
    loadoutErrors.replaceChildren(errorList(check.loadout));

    if (since !== undefined && ticking === undefined) ticking = setInterval(render, 1000);
    if (since === undefined && ticking !== undefined) {
      clearInterval(ticking);
      ticking = undefined;
    }
    const stale = d.prompt !== d.builtFrom;
    buildButton.textContent = since === undefined ? "Build the machine" : "Building…";
    buildButton.disabled = since !== undefined || d.prompt.trim() === "" || !connected;
    buildButton.title = !connected ? "Start the agent server first: ./agent-server/main.ts" : "Sends your request to Opus 5.5 through the agent server (⌘↵)";
    buildNote.textContent =
      since !== undefined
        ? `Opus 5.5 is writing the machine: ${Math.round((Date.now() - since) / 1000)} s. It takes about a minute.`
        : stale
          ? "The request changed since this machine was built."
          : "Built from this request.";
    buildNote.classList.toggle("tbh-fsd-build-stale", since === undefined && stale);
    buildErrors.replaceChildren(errorList(pilot.buildError() === undefined ? [] : [pilot.buildError() ?? ""]));
    machineTitle.replaceChildren(h("b", "", d.machine.id), ...(d.machine.description === undefined ? [] : [` ${d.machine.description}`]));
    view.show(d.machine, pilot.active());

    const live = pilot.preview();
    for (const [path, { el, value, count }] of fieldEls) {
      const n = d.prompt.split(`{{${path}}}`).length - 1;
      count.textContent = n === 0 ? "" : `×${n}`;
      el.classList.toggle("tbh-fsd-block-used", n > 0);
      value.textContent = shown(read(live?.input ?? EXAMPLE.input, path)) ?? "";
    }

    status.textContent = driving ? "Driving: a machine you build takes over as soon as it is ready" : connected ? "" : "The agent server is not connected";
    status.dataset.state = driving ? "on" : connected ? "" : "error";
    const problems = check.loadout.length;
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
    // The flip is decoration: if it cannot play, the popup still closes and the run resumes.
    void Promise.resolve()
      .then(() => flip(false))
      .catch((e: unknown) => console.error("[tibobit] the FSD close animation failed", e))
      .then(() => {
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
      renderEntities();
      dialog.showModal();
      render();
      target = undefined;
      builder.area.focus({ preventScroll: true });
      builder.area.setSelectionRange(builder.area.value.length, builder.area.value.length);
      void Promise.resolve()
        .then(() => flip(true))
        .catch((e: unknown) => console.error("[tibobit] the FSD open animation failed", e));
    },
  };
}
