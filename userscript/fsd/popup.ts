import { css as popupCss } from "./popup.css";
import { codeView } from "./code-view";
import type { Draft } from "./draft";
import { actionWords } from "./drive-overlay";
import { DRIVER_TYPES } from "./driver-source";
import type { StateField } from "./driver-types";
import { type Entity, SECTIONS } from "./entities";
import { EMBEDS } from "../../bot/drive";
import type { State } from "../../protocol/driver";
import type { Pilot } from "../pilot/pilot";
import { addStyle, h } from "../panel/dom";
import { onOwnKeydown } from "../panel/keys";
import { clock } from "../../clock";
import { ACTION_ICONS, svgIcon } from "../pilot/icons";
import EXAMPLE from "../../protocol/state.example.json";

/** The game as the popup needs it: it pauses a run while the popup is open. */
export type GameControl = {
  /** Pauses a run that is playing; true when this call paused it. */
  pause(): boolean;
  resume(): void;
  /** What the autopilot can be sent to, under the game's own names. */
  entities(): Entity[];
};

const EMBED = /(\{\{[\w.]+\}\})/;

const read = (state: State, path: string) => path.split(".").reduce<unknown>((at, key) => (at as Record<string, unknown> | undefined)?.[key], state);

/** A value of the state in a list row: a list by its length, an object folded. */
function brief(value: unknown): string {
  if (value === undefined) return "";
  if (Array.isArray(value)) return `${value.length}`;
  if (typeof value === "object" && value !== null) return "{…}";
  const text = String(value);
  return text.length > 14 ? `${text.slice(0, 13)}…` : text;
}

/** A value of the state in a tooltip, as indented JSON; a long list shows its first entries and how many more. */
function pretty(value: unknown): string | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.length <= 3) return JSON.stringify(value, null, 2);
  return `${JSON.stringify(value.slice(0, 3), null, 2).replace(/\n]$/, ",")}\n  … ${value.length - 3} more\n]`;
}

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * A textarea that grows with its text and shows each {{embed}} as a chip: a copy of the text sits
 * under the transparent textarea in the same grid cell, so it sets the height and draws the chips.
 */
function growField(embeds: boolean, placeholder: string, onInput: (value: string) => void) {
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
        return name === undefined || !embeds ? part : h("mark", `tbh-fsd-chip${name in EMBEDS ? "" : " tbh-fsd-chip-bad"}`, part);
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
 * Full Self Driving's setup: a dialog that flips out of the button that opened it. On the left is
 * the state the function is called with; in the middle the request Opus 5.5 writes the function
 * from, with the function shown under it; on the right the picker's loadout question. Everything is
 * kept in this browser.
 */
export function fsdPopup(pilot: Pilot, game: GameControl, fields: readonly StateField[], types: ReadonlyMap<string, string>): { open(from: HTMLElement): void } {
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

  // One tooltip for everything hovered: a field of the state, an embed in the loadout, or a thing in the world.
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
  const valueLines = (live: string | undefined, example: string | undefined) => {
    const value = live ?? example;
    return value === undefined || value === "" ? [] : [h("div", "tbh-fsd-tip-label", live !== undefined ? `Last seen in a run, at ${clock(pilot.preview()?.time ?? 0)}` : "Example, from a real run"), h("pre", "tbh-fsd-tip-value", value)];
  };
  /** TypeScript in a tooltip, coloured as the function is, so a type there reads the same as in the code. */
  const typed = (source: string) => {
    const view = codeView(fields, types);
    view.el.classList.add("tbh-code-tip");
    view.show(source);
    return view.el;
  };
  /** A field of the state as the types declare it: its type, its comment, and what it held. */
  const fieldTip = (path: string, box: DOMRect) => {
    const field = fields.find((f) => f.path === path);
    const live = pilot.preview();
    const type = field?.type ?? "";
    showTip(
      `field:${path}:${live?.time ?? ""}`,
      box,
      h("b", "tbh-fsd-tip-name", `state.${path}`),
      ...(type.includes("\n") ? [] : [h("code", "tbh-fsd-tip-key", type)]),
      h("div", "tbh-fsd-tip-about", field?.about ?? ""),
      ...(type.includes("\n") ? [typed(type)] : []),
      ...valueLines(live === undefined ? undefined : pretty(read(live.state, path)), pretty(read(EXAMPLE.state as State, path))),
    );
  };
  /** A type the function is written against, as declared, with its comments. */
  const typeTip = (name: string, box: DOMRect) => showTip(`type:${name}`, box, h("b", "tbh-fsd-tip-name", name), typed(types.get(name) ?? ""));
  const embedTip = (name: string, box: DOMRect) =>
    showTip(
      `embed:${name}:${pilot.preview()?.time ?? ""}`,
      box,
      h("b", "tbh-fsd-tip-name", `{{${name}}}`),
      h("div", "tbh-fsd-tip-about", EMBEDS[name as keyof typeof EMBEDS] ?? "Not part of the state: the picker cannot read this."),
      ...valueLines(pilot.preview()?.blocks[name], (EXAMPLE.blocks as Record<string, string>)[name]),
    );
  /** A chip that puts its text into a field when clicked, without taking the caret out of it. */
  const inserter = <E extends HTMLElement>(el: E, onClick: () => void): E => {
    el.addEventListener("mousedown", (e) => e.preventDefault());
    el.addEventListener("click", onClick);
    el.addEventListener("pointerleave", hideTip);
    return el;
  };

  // The state the function is called with.
  const search = h("input", "tbh-fsd-search");
  Object.assign(search, { type: "search", placeholder: "Filter the state…" });
  search.setAttribute("aria-label", "Filter the state");
  const fieldList = h("div", "tbh-fsd-blocks");
  const fieldEls = new Map<string, { el: HTMLButtonElement; value: HTMLElement }>();
  for (const field of fields) {
    const value = h("span", "tbh-fsd-block-value");
    const el = inserter(h("button", "tbh-fsd-block", h("span", "tbh-fsd-block-head", h("b", "", field.path), h("code", "tbh-fsd-block-type", field.type.includes("\n") ? "{…}" : field.type.replace(/\{.*\}/, "{…}")), value), h("span", "tbh-fsd-block-about", field.about)), () => insert(builder.area, `state.${field.path}`));
    el.type = "button";
    el.dataset.name = field.path;
    el.style.paddingLeft = `${8 + 10 * (field.path.split(".").length - 1)}px`;
    el.addEventListener("pointerenter", () => fieldTip(field.path, el.getBoundingClientRect()));
    fieldEls.set(field.path, { el, value });
    fieldList.append(el);
  }
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    for (const field of fields) {
      const el = fieldEls.get(field.path)?.el;
      if (el !== undefined) el.hidden = q !== "" && !`${field.path} ${field.type} ${field.about}`.toLowerCase().includes(q);
    }
  });
  const statePane = h("aside", "tbh-fsd-state", h("h3", "tbh-fsd-label", "State"), h("p", "tbh-fsd-hint", "What the function is called with, four times a second. Click a field to name it in your request."), search, fieldList);

  // The request, and the function written from it.
  const builder = growField(false, "How should Tibo play? Say what to go after, when, and when to back off.", (value) => edit((d) => ({ ...d, prompt: value })));
  const buildButton = h("button", "tbh-fsd-build");
  buildButton.type = "button";
  buildButton.addEventListener("click", () => pilot.buildCode());
  onOwnKeydown((e) => {
    if (e.target === builder.area && e.key === "Enter" && (e.metaKey || e.ctrlKey)) pilot.buildCode();
  });
  const buildNote = h("span", "tbh-fsd-build-note");
  const buildErrors = h("div", "");
  const code = codeView(fields, types);
  const declared = codeView(fields, types);
  declared.show(DRIVER_TYPES.trim());
  const now = h("div", "tbh-fsd-now");
  const memory = h("pre", "tbh-fsd-memory");
  const builderPane = h(
    "section",
    "tbh-fsd-builder",
    h("h3", "tbh-fsd-label", "Function builder"),
    h("p", "tbh-fsd-hint", "Describe how Tibo should play. Opus 5.5 turns it into one TypeScript function that reads the state and returns what the autopilot does next. It may keep anything it needs in a memory that lasts the run. TypeScript checks that it always returns an action before the bot runs it."),
    builder.wrap,
    h("div", "tbh-fsd-build-row", buildButton, buildNote),
    buildErrors,
    h("h3", "tbh-fsd-label tbh-fsd-code-label", "Function"),
    now,
    memory,
    code.el,
    h("details", "tbh-fsd-fold", h("summary", "", "The types it is written against"), declared.el),
  );
  for (const view of [code, declared]) {
    view.el.addEventListener("pointerover", (e) => {
      const at = view.hoverAt(e.target);
      if (at === undefined) {
        if (/^(field|type):/.test(tipFor)) hideTip();
      } else if ("type" in at) typeTip(at.type, at.box);
      else fieldTip(at.field, at.box);
    });
    view.el.addEventListener("pointerleave", hideTip);
  }

  const loadout = growField(true, "How should the picker choose cards?", (value) => edit((d) => ({ ...d, loadout: value })));
  const loadoutErrors = h("div", "");
  const blockList = h(
    "div",
    "tbh-fsd-entities",
    ...Object.keys(EMBEDS).map((name) => {
      const el = inserter(h("button", "tbh-fsd-entity tbh-fsd-embed", `{{${name}}}`), () => insert(loadout.area, `{{${name}}}`));
      el.type = "button";
      el.addEventListener("pointerenter", () => embedTip(name, el.getBoundingClientRect()));
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
  const entityCount = h("span", "tbh-fsd-entity-count");
  const entityPane = h("section", "tbh-fsd-world", h("div", "tbh-fsd-label-row", h("h3", "tbh-fsd-label", "In the world"), entityCount), entityList);
  let chips: { entity: Entity; el: HTMLButtonElement }[] = [];
  const renderEntities = () => {
    entities = game.entities();
    chips = entities.map((e) => {
      const el = inserter(h("button", "tbh-fsd-entity", svgIcon(ACTION_ICONS[e.tag], "tbh-fsd-entity-icon"), e.name), () => insert(target ?? builder.area, e.name));
      el.type = "button";
      el.addEventListener("pointerenter", () =>
        showTip(
          `entity:${e.key}`,
          el.getBoundingClientRect(),
          h("b", "tbh-fsd-tip-name", e.name),
          ...(e.name === e.key ? [] : [h("code", "tbh-fsd-tip-key", e.key)]),
          h("div", "tbh-fsd-tip-about", e.about || "No description in the game."),
          ...(el.classList.contains("tbh-fsd-unused") ? [h("div", "tbh-fsd-tip-unused", "The function never names it.")] : []),
        ),
      );
      return { entity: e, el };
    });
    entityList.replaceChildren(
      ...SECTIONS.flatMap((section) => {
        const group = chips.filter((c) => c.entity.section === section);
        return group.length === 0 ? [] : [h("h4", "tbh-fsd-entity-type", section), h("div", "tbh-fsd-entities", ...group.map((c) => c.el))];
      }),
      ...(entities.some((e) => e.name !== e.key) ? [] : [h("p", "tbh-fsd-hint", "The game's places get their names once a run has started.")]),
    );
    markUsed(draft().code);
  };
  /** Marks the things the function names in a string literal, by the game's key or its English name. */
  const markUsed = (source: string) => {
    const literals = new Set([...source.matchAll(/(["'`])((?:\\.|(?!\1)[^\\])*)\1/g)].map((m) => m[2]));
    let used = 0;
    for (const { entity, el } of chips) {
      const named = literals.has(entity.key) || literals.has(entity.name);
      if (named) used++;
      el.classList.toggle("tbh-fsd-unused", !named);
    }
    entityCount.textContent = `${used} used · ${chips.length - used} unused`;
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

  dialog.addEventListener("focusin", (e) => {
    if (e.target instanceof HTMLTextAreaElement) target = e.target;
  });
  // The loadout's embeds sit under its transparent text, so the pointer is matched against their boxes.
  dialog.addEventListener("pointermove", (e) => {
    if (e.target !== loadout.area) return;
    const chip = loadout.chipAt(e.clientX, e.clientY);
    if (chip === undefined) {
      if (tipFor.startsWith("embed:")) hideTip();
    } else embedTip(chip.name, chip.box);
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
    buildButton.textContent = since === undefined ? "Write the function" : "Writing…";
    buildButton.disabled = since !== undefined || d.prompt.trim() === "" || !connected;
    buildButton.title = !connected ? "Start the agent server first: ./agent-server/main.ts" : "Sends your request to Opus 5.5 through the agent server (⌘↵)";
    buildNote.textContent =
      since !== undefined
        ? `Opus 5.5 is writing the function: ${Math.round((Date.now() - since) / 1000)} s. It takes under a minute.`
        : stale
          ? "The request changed since this function was written."
          : "Written from this request.";
    buildNote.classList.toggle("tbh-fsd-build-stale", since === undefined && stale);
    buildErrors.replaceChildren(errorList(pilot.buildError() === undefined ? [] : [pilot.buildError() ?? ""]));

    const active = pilot.active();
    now.hidden = active === undefined;
    now.classList.toggle("tbh-fsd-now-error", active?.error !== undefined);
    now.textContent = active?.error !== undefined ? `drive threw: ${active.error}` : active?.action === undefined ? "" : `Now: ${active.action.why ?? ""} (${actionWords(active.action)})`;
    code.show(d.code, active?.action?.why);
    markUsed(d.code);
    const kept = active === undefined || Object.keys(active.memory).length === 0 ? undefined : active.memory;
    memory.hidden = kept === undefined;
    memory.textContent = kept === undefined ? "" : `memory: ${JSON.stringify(kept, null, 2)}`;

    const live = pilot.preview();
    for (const [path, { value }] of fieldEls) value.textContent = brief(read(live?.state ?? (EXAMPLE.state as State), path));

    status.textContent = driving ? "Driving: a function you write takes over as soon as it is ready" : connected ? "" : "The agent server is not connected";
    status.dataset.state = driving ? "on" : connected ? "" : "error";
    const refused = pilot.state().detail;
    const problems = check.loadout.length;
    saved.textContent = refused !== undefined && !driving ? refused : problems === 0 ? "Saved in this browser" : `Saved in this browser · ${problems} to fix${driving ? " before the bot gets the change" : ""}`;
    saved.classList.toggle("tbh-fsd-saved-bad", problems > 0 || (refused !== undefined && !driving));
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
