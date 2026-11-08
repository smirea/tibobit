import type { Bridge } from "./agent/bridge";
import { ACTION_ICONS, moveIcon, NOTE_ICON, RESULT_ICONS, svgIcon } from "./icons";
import { type CardOption, type ChatMessage, type Inspect, PACE_LIMITS, type PilotPace, type PilotRole } from "./agent/protocol";

const ROLE_LABELS: Record<PilotRole, string> = { planner: "Plan", action: "Action", system: "Bot" };
const HIDE_DELAY_MS = 200;
// Narrower than this to the panel's left, the inspector covers the screen's top instead (phones).
const MIN_SIDE_ROOM = 300;

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
/** Game time to a tenth of a second, as 01:23.4. */
const fine = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${(seconds % 60).toFixed(1).padStart(4, "0")}`;
const percent = (v: number) => `${Math.round(v * 100)}%`;
const ARROWS: Record<string, string> = { right: "→", "down-right": "↘", down: "↓", "down-left": "↙", left: "←", "up-left": "↖", up: "↑", "up-right": "↗", "stand still": "•" };
// A move or goal title names a direction in words ("Explore up-right"); the panel shows the arrow.
const arrowed = (text: string) => text.replace(/(?<![\w-])(up-right|up-left|down-right|down-left|right|left|up|down)(?![\w-])/g, (d) => ARROWS[d] ?? d);

function h<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, ...children: (Node | string)[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  el.className = className;
  el.append(...children);
  return el;
}

function meter(label: string, share: number, className: string): HTMLElement {
  const bar = h("i", "");
  bar.style.width = `${Math.round(Math.min(1, Math.max(0, share)) * 100)}%`;
  return h("span", `tbh-meter ${className}`, h("span", "tbh-meter-track", bar), h("span", "tbh-meter-label", label));
}

function section(title: string, ...body: Node[]): HTMLElement {
  return h("section", "tbh-insp-section", h("h4", "", title), ...body);
}

const pre = (text: string, className = "") => h("pre", `tbh-insp-pre ${className}`.trim(), text);

function folded(title: string, text: string, className = ""): HTMLElement {
  return h("details", "tbh-insp-fold", h("summary", "", title), pre(text, className));
}

/** Options with the model's odds as bars, the chosen one marked. */
function oddsRows(options: CardOption[]): HTMLElement[] {
  return options.map((c) =>
    h(
      "div",
      `tbh-opt ${c.chosen ? "tbh-opt-chosen" : c.probability === undefined ? "tbh-opt-ruled-out" : "tbh-opt-safe"}`,
      h(
        "div",
        "tbh-opt-head",
        h("span", "tbh-opt-name", arrowed(c.card)),
        ...(c.chosen ? [h("span", "tbh-opt-outcome", "chosen")] : []),
        ...(c.probability === undefined ? [] : [h("span", "tbh-opt-scores", meter(percent(c.probability), c.probability, "tbh-meter-useful tbh-meter-wide"))]),
      ),
      ...(c.notes === "" ? [] : [h("div", "tbh-opt-desc", c.notes)]),
    ),
  );
}

function inspectBody(m: ChatMessage): Node[] {
  const words = [h("div", "tbh-insp-text", arrowed(m.text)), ...(m.detail === undefined ? [] : [h("div", "tbh-opt-desc", m.detail)])];
  const inspect: Inspect | undefined = m.inspect;
  if (inspect === undefined) return words;
  switch (inspect.kind) {
    case "plan":
      return [
        ...words,
        ...(inspect.choices === undefined ? [] : [section("Choices", ...oddsRows(inspect.choices))]),
        section("Goals", ...oddsRows([...inspect.goals].sort((a, b) => (b.probability ?? 0) - (a.probability ?? 0)))),
        folded("Prompt", inspect.prompt),
      ];
    case "prompt":
      return [
        ...words,
        ...(inspect.reasoning === undefined ? [] : [folded("Reasoning", inspect.reasoning, "tbh-insp-thought")]),
        ...(inspect.reply === undefined ? [] : [folded("Reply", inspect.reply)]),
        folded("Prompt", inspect.prompt),
      ];
    case "moves": {
      const rows = inspect.moves.map((m) =>
        h(
          "div",
          `tbh-opt tbh-opt-${m.outcome.replace(" ", "-")}`,
          h(
            "div",
            "tbh-opt-head",
            h("span", "tbh-opt-name tbh-opt-arrow", ARROWS[m.move] ?? m.move),
            h("span", "tbh-opt-outcome", m.outcome),
            h(
              "span",
              "tbh-opt-scores",
              ...(m.forecast === undefined ? [] : [h("span", `tbh-chip${m.forecast === "no damage" ? " tbh-chip-ok" : ""}`, m.forecast)]),
              ...(m.hurt === undefined ? [] : [meter(`hurt ${m.hurt.toFixed(1)}/4`, m.hurt / 4, "tbh-meter-hurt")]),
              ...(m.useful === undefined ? [] : [meter(`useful ${percent(m.useful)}`, m.useful, "tbh-meter-useful")]),
            ),
          ),
          h("div", "tbh-opt-desc", m.description),
        ),
      );
      return [
        ...words,
        section("Moves", ...rows, ...(inspect.dash === undefined ? [] : [h("div", "tbh-opt-desc", `Dash to escape? ${percent(inspect.dash)} (dashes above 50%)`)])),
        section("Prompt", pre([inspect.situation, ...(inspect.questions ?? [])].join("\n\n"))),
      ];
    }
    case "cards":
      return [...words, section(inspect.question, ...oddsRows(inspect.cards)), section("Prompt", pre(inspect.situation))];
  }
}

type Showing = { kind: "plan"; id?: number } | { kind: "action"; id: number };

/**
 * Shows, beside the panel, what a model was asked and what it weighed while its row is hovered.
 * For the plan row that is the latest decision, followed by every earlier one, any of which can be
 * opened by clicking it.
 */
function inspector(panel: () => HTMLElement, messages: () => readonly ChatMessage[]) {
  const box = h("div", "tbh-insp");
  box.hidden = true;
  let showing: Showing | undefined;
  let anchor: Element | undefined;
  let reading = false;
  let hideTimer: ReturnType<typeof setTimeout> | undefined;

  const place = (at: Element) => {
    const side = panel().getBoundingClientRect();
    const margin = 8;
    if (side.left < MIN_SIDE_ROOM) {
      // No room beside the panel: above or below the row, whichever has more room, never over it.
      const rect = at.getBoundingClientRect();
      const above = rect.top > window.innerHeight - rect.bottom;
      Object.assign(box.style, {
        left: `${margin}px`,
        right: `${margin}px`,
        width: "auto",
        top: above ? "auto" : `${rect.bottom + margin}px`,
        bottom: above ? `${window.innerHeight - rect.top + margin}px` : "auto",
        maxHeight: `${(above ? rect.top : window.innerHeight - rect.bottom) - 2 * margin}px`,
      });
      return;
    }
    box.style.bottom = "auto";
    const width = Math.min(560, side.left - 2 * margin);
    box.style.width = `${width}px`;
    box.style.left = `${side.left - margin - width}px`;
    box.style.right = "auto";
    box.style.maxHeight = `${window.innerHeight - 2 * margin}px`;
    const top = at.getBoundingClientRect().top;
    box.style.top = `${Math.max(margin, Math.min(top, window.innerHeight - box.offsetHeight - margin))}px`;
  };

  const plans = () => messages().filter((m) => m.role === "planner");

  const render = () => {
    if (showing === undefined || anchor === undefined) return;
    const all = plans();
    const want = showing;
    const m = want.kind === "plan" ? (all.find((x) => x.id === want.id) ?? all.at(-1)) : messages().find((x) => x.id === want.id);
    if (m === undefined) {
      box.hidden = true;
      return;
    }
    const scroll = box.scrollTop;
    const head = h(
      "div",
      "tbh-insp-head",
      ...(m.time === undefined ? [] : [h("span", "tbh-msg-time", m.role === "planner" ? clock(m.time) : fine(m.time))]),
      h("span", `tbh-msg-role tbh-role-${m.role}`, ROLE_LABELS[m.role]),
      ...(m.model === undefined ? [] : [h("span", "tbh-msg-model", m.model)]),
    );
    const history =
      want.kind === "plan" && all.length > 1
        ? [
            section(
              "All decisions",
              ...[...all].reverse().map((x) => {
                const item = h("button", `tbh-insp-past${x.id === m.id ? " tbh-insp-past-on" : ""}`, h("span", "tbh-row-time", x.time === undefined ? "" : clock(x.time)), h("span", "", x.text));
                item.type = "button";
                item.addEventListener("click", () => {
                  showing = { kind: "plan", id: x.id };
                  render();
                  box.scrollTop = 0;
                });
                return item;
              }),
            ),
          ]
        : [];
    box.replaceChildren(head, ...inspectBody(m), ...history);
    box.hidden = false;
    place(anchor);
    box.scrollTop = scroll;
  };

  const hide = () => {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (reading) return;
      box.hidden = true;
      showing = undefined;
    }, HIDE_DELAY_MS);
  };

  box.addEventListener("pointerenter", () => {
    reading = true;
    clearTimeout(hideTimer);
  });
  box.addEventListener("pointerleave", () => {
    reading = false;
    hide();
  });

  return {
    box,
    show(target: Showing, at: Element) {
      clearTimeout(hideTimer);
      reading = false;
      showing = target;
      anchor = at;
      box.scrollTop = 0;
      render();
    },
    leave: hide,
    /** A shown message that changed shows its newest version, unless the pointer is in the box being read. */
    refresh(anchorFor: (target: Showing) => Element | undefined) {
      if (showing === undefined || reading) return;
      anchor = anchorFor(showing) ?? anchor;
      render();
    },
  };
}

// More tiles than the box ever holds; it clips the rest.
const FLOW_TILES = 60;

/** A step the action model chose, as the move it took; undefined for anything else. */
function step(m: ChatMessage): { move: string; hurt: boolean; dash: boolean } | undefined {
  if (m.role !== "action" || m.inspect?.kind !== "moves") return undefined;
  const chosen = m.inspect.moves.find((x) => x.outcome === "chosen");
  return { move: chosen?.move ?? "stand still", hurt: chosen?.forecast !== undefined && chosen.forecast !== "no damage", dash: m.tag === "Dash" };
}

/**
 * One action as a square tile: a step is its arrow (red when the game forecast it hurts, with a
 * bolt when it dashes), anything else its tag's icon, badged with how a goal ended.
 */
function actionTile(m: ChatMessage): HTMLElement {
  const s = step(m);
  const icon = s !== undefined ? moveIcon(s.move, "tbh-tile-icon") : svgIcon(m.tag === undefined ? NOTE_ICON : ACTION_ICONS[m.tag], "tbh-tile-icon");
  const badge = s?.dash ? [svgIcon(ACTION_ICONS.Dash, "tbh-tile-badge tbh-badge-dash")] : m.result === undefined ? [] : [svgIcon(RESULT_ICONS[m.result], `tbh-tile-badge tbh-result-${m.result}`)];
  const el = h("span", `tbh-tile tbh-tile-${m.role}${s?.hurt ? " tbh-tile-hurt" : ""}${m.inspect === undefined ? "" : " tbh-tile-inspectable"}`, icon, ...badge);
  el.setAttribute("aria-label", arrowed(m.text));
  el.dataset.id = String(m.id);
  return el;
}

/**
 * The bot's models while it plays: its latest plan pinned at the top, and the latest actions under
 * it, newest first. Hovering either shows what the model was asked and what it weighed.
 */
export function chatBox(bridge: Bridge): HTMLElement {
  const giveBack = h("button", "tbh-giveback");
  giveBack.type = "button";
  giveBack.addEventListener("click", () => bridge.setPilot({ on: false }));
  const paceInput = (key: keyof PilotPace) => {
    const { min, max, step } = PACE_LIMITS[key];
    const input = h("input", "tbh-pace-input");
    Object.assign(input, { type: "number", min: String(min), max: String(max), step: String(step), inputMode: "decimal" });
    input.addEventListener("change", () => {
      const v = Number(input.value);
      if (!Number.isFinite(v) || input.value === "") return;
      const clamped = Number(Math.min(max, Math.max(min, Math.round(v / step) * step)).toFixed(1));
      input.value = String(clamped);
      bridge.setPilot({ [key]: clamped });
    });
    return input;
  };
  const planEvery = paceInput("planEvery");
  const actEvery = paceInput("actEvery");
  const tools = h(
    "div",
    "tbh-chat-tools",
    giveBack,
    h("label", "tbh-pace-field", h("span", "tbh-plan-label", "Plan"), planEvery, "s"),
    h("label", "tbh-pace-field tbh-pace-action", h("span", "tbh-plan-label", "Action"), actEvery, "s"),
  );

  const plan = h("div", "tbh-plan");
  const list = h("div", "tbh-actions");
  list.setAttribute("aria-live", "polite");
  const rows = new Map<number, { el: HTMLElement; message: ChatMessage }>();
  const insp = inspector(() => plan.closest<HTMLElement>(".tbh-panel") ?? plan, () => bridge.chat());
  let shownPlan: ChatMessage | undefined;

  const render = () => {
    const pilot = bridge.pilot();
    const label = pilot.state === "stopping" ? "Handing the wheel back…" : "I'll do it myself";
    if (giveBack.textContent !== label) giveBack.textContent = label;
    giveBack.disabled = pilot.state !== "on";
    // Typing in a box is not interrupted by the server echoing the value back.
    for (const [input, value] of [
      [planEvery, pilot.pace.planEvery],
      [actEvery, pilot.pace.actEvery],
    ] as const) {
      input.disabled = pilot.state !== "on";
      if (document.activeElement !== input && input.value !== String(value)) input.value = String(value);
    }

    const messages = bridge.chat();
    const latest = [...messages].reverse().find((m) => m.role === "planner");
    if (latest !== shownPlan || latest === undefined) {
      shownPlan = latest;
      plan.replaceChildren(
        h("span", "tbh-plan-label", "Plan"),
        ...(latest?.time === undefined ? [] : [h("span", "tbh-row-time", clock(latest.time))]),
        h("span", "tbh-plan-text", latest === undefined ? "Waiting for the planner…" : arrowed(latest.text)),
        ...(latest?.stream === undefined ? [] : [h("div", "tbh-plan-stream", h("span", "", latest.stream, h("b", "tbh-cursor", "▍")))]),
      );
      plan.classList.toggle("tbh-row-inspectable", latest !== undefined);
    }

    // Newest first: the newest action is a 3x3 tile in the corner, the one before it 2x2, and the
    // rest flow around them, as many as the box holds. The tiles hold still while the pointer is over them, or a new step
    // every few tenths of a second would slide the one being read out from under it.
    if (list.matches(":hover")) return insp.refresh((target) => (target.kind === "plan" ? plan : rows.get(target.id)?.el));
    const actions: ChatMessage[] = [];
    for (let i = messages.length - 1; i >= 0 && actions.length < FLOW_TILES; i--) {
      const m = messages[i];
      if (m !== undefined && m.role !== "planner") actions.push(m);
    }
    const ids = new Set(actions.map((m) => m.id));
    for (const [id] of rows) if (!ids.has(id)) rows.delete(id);
    const els = actions.map((message, i) => {
      const before = rows.get(message.id);
      const el = before?.message === message ? before.el : actionTile(message);
      rows.set(message.id, { el, message });
      el.classList.toggle("tbh-tile-main", i === 0);
      el.classList.toggle("tbh-tile-prev", i === 1);
      return el;
    });
    if (els.length !== list.children.length || els.some((el, i) => list.children[i] !== el)) list.replaceChildren(...els);
    insp.refresh((target) => (target.kind === "plan" ? plan : rows.get(target.id)?.el));
  };

  // Moving within one tile fires pointerover again for each child; only a new tile starts over.
  let hovered: Element | undefined;
  plan.addEventListener("pointerenter", () => {
    if (shownPlan === undefined || hovered === plan) return;
    hovered = plan;
    insp.show({ kind: "plan" }, plan);
  });
  list.addEventListener("pointerover", (e) => {
    const el = e.target instanceof Element ? e.target.closest<HTMLElement>("[data-id]") : null;
    if (el === hovered) return;
    hovered = el ?? undefined;
    if (el === null) return insp.leave();
    insp.show({ kind: "action", id: Number(el.dataset.id) }, el);
  });
  const box = h("div", "tbh-chatbox", tools, plan, list, insp.box);
  box.addEventListener("pointerleave", () => {
    hovered = undefined;
    insp.leave();
  });

  bridge.onChange(render);
  render();
  return box;
}
