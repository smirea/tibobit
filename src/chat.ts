import type { Bridge } from "./agent/bridge";
import type { ChatMessage, Inspect, PilotRole } from "./agent/protocol";

const ROLE_LABELS: Record<PilotRole, string> = { planner: "Planner", actor: "Actor", action: "Action", system: "Bot" };
const HIDE_DELAY_MS = 200;
// Narrower than this to the panel's left, the inspector covers the screen's top instead (phones).
const MIN_SIDE_ROOM = 300;

const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
const percent = (v: number) => `${Math.round(v * 100)}%`;

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

function inspectBody(inspect: Inspect): Node[] {
  switch (inspect.kind) {
    case "prompt":
      return [
        section("Prompt", pre(inspect.prompt)),
        ...(inspect.reasoning === undefined ? [] : [section("Reasoning", pre(inspect.reasoning, "tbh-insp-thought"))]),
        ...(inspect.reply === undefined ? [] : [section("Reply", pre(inspect.reply))]),
      ];
    case "moves": {
      const rows = inspect.moves.map((m) =>
        h(
          "div",
          `tbh-opt tbh-opt-${m.outcome.replace(" ", "-")}`,
          h(
            "div",
            "tbh-opt-head",
            h("span", "tbh-opt-name", m.move),
            h("span", "tbh-opt-outcome", m.outcome),
            ...(m.forecast === undefined ? [] : [h("span", `tbh-chip${m.forecast === "no damage" ? " tbh-chip-ok" : ""}`, m.forecast)]),
          ),
          ...(m.hurt === undefined && m.useful === undefined
            ? []
            : [
                h(
                  "div",
                  "tbh-opt-scores",
                  ...(m.hurt === undefined ? [] : [meter(`hurt ${m.hurt.toFixed(1)}/4`, m.hurt / 4, "tbh-meter-hurt")]),
                  ...(m.useful === undefined ? [] : [meter(`useful ${percent(m.useful)}`, m.useful, "tbh-meter-useful")]),
                ),
              ]),
          h("div", "tbh-opt-desc", m.description),
        ),
      );
      return [
        section(
          "Moves",
          ...rows,
          ...(inspect.dash === undefined ? [] : [h("div", "tbh-opt-desc", `Dash to escape? ${percent(inspect.dash)} (dashes above 50%)`)]),
        ),
        section("Situation", pre(inspect.situation)),
      ];
    }
    case "cards": {
      const rows = inspect.cards.map((c) =>
        h(
          "div",
          `tbh-opt ${c.chosen ? "tbh-opt-chosen" : c.probability === undefined ? "tbh-opt-ruled-out" : "tbh-opt-safe"}`,
          h("div", "tbh-opt-head", h("span", "tbh-opt-name", c.card), ...(c.chosen ? [h("span", "tbh-opt-outcome", "chosen")] : [])),
          ...(c.probability === undefined ? [] : [h("div", "tbh-opt-scores", meter(percent(c.probability), c.probability, "tbh-meter-useful"))]),
          h("div", "tbh-opt-desc", c.notes),
        ),
      );
      return [section(inspect.question, ...rows), section("Situation", pre(inspect.situation))];
    }
  }
}

/** Shows what a model was asked and what it weighed, beside the panel, while a chat message is hovered. */
function inspector(panel: () => HTMLElement, latest: (id: number) => ChatMessage | undefined) {
  const box = h("div", "tbh-insp");
  box.hidden = true;
  let showing: { id: number; inspect: Inspect } | undefined;
  let reading = false;
  let hideTimer: ReturnType<typeof setTimeout> | undefined;

  const place = (anchor: Element) => {
    const side = panel().getBoundingClientRect();
    const margin = 8;
    if (side.left < MIN_SIDE_ROOM) {
      // No room beside the panel: above or below the message, whichever has more room, never over it.
      const at = anchor.getBoundingClientRect();
      const above = at.top > window.innerHeight - at.bottom;
      Object.assign(box.style, {
        left: `${margin}px`,
        right: `${margin}px`,
        width: "auto",
        top: above ? "auto" : `${at.bottom + margin}px`,
        bottom: above ? `${window.innerHeight - at.top + margin}px` : "auto",
        maxHeight: `${(above ? at.top : window.innerHeight - at.bottom) - 2 * margin}px`,
      });
      return;
    }
    box.style.bottom = "auto";
    const width = Math.min(560, side.left - 2 * margin);
    box.style.width = `${width}px`;
    box.style.left = `${side.left - margin - width}px`;
    box.style.right = "auto";
    box.style.maxHeight = `${window.innerHeight - 2 * margin}px`;
    const top = anchor.getBoundingClientRect().top;
    box.style.top = `${Math.max(margin, Math.min(top, window.innerHeight - box.offsetHeight - margin))}px`;
  };

  const render = (m: ChatMessage, anchor: Element) => {
    if (m.inspect === undefined) return;
    const scroll = box.scrollTop;
    const head = h("div", "tbh-insp-head", h("span", `tbh-msg-role tbh-role-${m.role}`, ROLE_LABELS[m.role]), ...(m.model === undefined ? [] : [h("span", "tbh-msg-model", m.model)]), ...(m.time === undefined ? [] : [h("span", "tbh-msg-time", clock(m.time))]));
    box.replaceChildren(head, ...inspectBody(m.inspect));
    box.hidden = false;
    showing = { id: m.id, inspect: m.inspect };
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
    hover(el: HTMLElement, m: ChatMessage) {
      clearTimeout(hideTimer);
      reading = false;
      box.scrollTop = 0;
      render(m, el);
    },
    leave: hide,
    /** A hovered message that changed (an action folding in its next move, a planner answering) shows its newest version, unless the pointer is in the box being read. */
    refresh(el: HTMLElement, m: ChatMessage) {
      if (showing?.id !== m.id || reading || showing.inspect === m.inspect) return;
      render(m, el);
    },
    forget(id: number) {
      if (showing?.id === id && !reading) box.hidden = true;
    },
    latest,
  };
}

function chatMessage(m: ChatMessage): HTMLElement {
  const head = h(
    "div",
    "tbh-msg-head",
    h("span", "tbh-msg-role", ROLE_LABELS[m.role]),
    ...(m.model === undefined ? [] : [h("span", "tbh-msg-model", m.model)]),
    ...(m.time === undefined ? [] : [h("span", "tbh-msg-time", clock(m.time))]),
  );
  const text = h("div", "tbh-msg-text", m.text, ...(m.count > 1 ? [h("span", "tbh-msg-count", `${m.count} moves`)] : []));
  const el = h(
    "div",
    `tbh-msg tbh-msg-${m.role}${m.inspect === undefined ? "" : " tbh-msg-inspectable"}`,
    head,
    text,
    ...(m.stream === undefined ? [] : [h("div", "tbh-msg-stream", h("span", "", m.stream, h("b", "tbh-cursor", "▍")))]),
    ...(m.detail === undefined ? [] : [h("div", "tbh-msg-detail", m.detail)]),
  );
  return el;
}

/**
 * The bot's planner, actor and action model as a chat that follows the newest message unless
 * scrolled up, under the buttons that steer the bot while it plays.
 */
export function chatBox(bridge: Bridge): HTMLElement {
  const giveBack = h("button", "tbh-giveback");
  giveBack.type = "button";
  giveBack.addEventListener("click", () => bridge.setPilot({ on: false }));
  const live = h("button", "tbh-live", "DO IT LIVE");
  live.type = "button";
  live.title = "Play without pausing: the models think while the game keeps running";
  live.addEventListener("click", () => bridge.setPilot({ live: !bridge.pilot().live }));
  const tools = h("div", "tbh-chat-tools", giveBack, live);

  const list = h("div", "tbh-chat");
  list.setAttribute("aria-live", "polite");
  const shown = new Map<number, { el: HTMLElement; message: ChatMessage }>();
  const insp = inspector(() => list.closest<HTMLElement>(".tbh-panel") ?? list, (id) => shown.get(id)?.message);

  const render = () => {
    const pilot = bridge.pilot();
    const label = pilot.state === "stopping" ? "Handing the wheel back…" : "Give me back the wheel";
    if (giveBack.textContent !== label) giveBack.textContent = label;
    giveBack.disabled = pilot.state !== "on";
    live.setAttribute("aria-pressed", String(pilot.live));
    live.disabled = pilot.state !== "on";

    const messages = bridge.chat();
    const ids = new Set(messages.map((m) => m.id));
    for (const [id, { el }] of shown) {
      if (ids.has(id)) continue;
      el.remove();
      shown.delete(id);
      insp.forget(id);
    }
    const following = list.scrollHeight - list.scrollTop - list.clientHeight < 24;
    for (const message of messages) {
      const before = shown.get(message.id);
      if (before?.message === message) continue;
      const el = chatMessage(message);
      el.dataset.id = String(message.id);
      if (before === undefined) list.append(el);
      else before.el.replaceWith(el);
      shown.set(message.id, { el, message });
      insp.refresh(el, message);
    }
    if (following) list.scrollTop = list.scrollHeight;
  };

  const messageAt = (target: EventTarget | null) => {
    const el = target instanceof Element ? target.closest<HTMLElement>(".tbh-msg-inspectable") : null;
    const message = el === null ? undefined : insp.latest(Number(el.dataset.id));
    return el === null || message === undefined ? undefined : { el, message };
  };
  list.addEventListener("pointerover", (e) => {
    const hit = messageAt(e.target);
    if (hit === undefined) return insp.leave();
    if (messageAt(e.relatedTarget)?.el !== hit.el) insp.hover(hit.el, hit.message);
  });
  list.addEventListener("pointerleave", () => insp.leave());

  bridge.onChange(render);
  render();
  return h("div", "tbh-chatbox", tools, list, insp.box);
}
