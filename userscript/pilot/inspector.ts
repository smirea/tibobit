import { css as inspectorCss } from "./inspector.css";
import type { CardOption, ChatMessage, Inspect, PilotRole } from "../../protocol/pilot";
import { arrowed, ARROWS } from "./arrows";
import { addStyle, h } from "../panel/dom";
import { clock } from "../../clock";

const ROLE_LABELS: Record<PilotRole, string> = { planner: "Plan", action: "Action", system: "Bot" };

const HIDE_DELAY_MS = 200;

// Narrower than this to the panel's left, the inspector covers the screen's top instead (phones).
const MIN_SIDE_ROOM = 300;

/** Game time to a tenth of a second, as 01:23.4. */
const fine = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${(seconds % 60).toFixed(1).padStart(4, "0")}`;

const percent = (v: number) => `${Math.round(v * 100)}%`;

export const costly = (f: { damage: number; dead: boolean }) => f.dead || f.damage > 0;

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
    case "state":
      return [...words, section("Action", pre(inspect.about))];
    case "moves": {
      const rows = inspect.moves.map((m) =>
        h(
          "div",
          `tbh-opt tbh-opt-${m.outcome.replace(" ", "-")}`,
          h(
            "div",
            "tbh-opt-head",
            h("span", "tbh-opt-name tbh-opt-arrow", ARROWS[m.move]),
            h("span", "tbh-opt-outcome", m.outcome),
            h(
              "span",
              "tbh-opt-scores",
              ...(m.forecast === undefined ? [] : [h("span", `tbh-chip${costly(m.forecast) ? "" : " tbh-chip-ok"}`, m.forecast.dead ? "dead" : costly(m.forecast) ? `-${Math.round(m.forecast.damage)} hp` : "no damage")]),
              ...(m.hurt === undefined ? [] : [meter(`hurt ${percent(m.hurt)}`, m.hurt, "tbh-meter-hurt")]),
              ...(m.useful === undefined ? [] : [meter(`useful ${percent(m.useful)}`, m.useful, "tbh-meter-useful")]),
            ),
          ),
          h("div", "tbh-opt-desc", m.description),
        ),
      );
      return [
        ...words,
        section("Moves", ...rows, ...(inspect.dash === undefined ? [] : [h("div", "tbh-opt-desc", `Dash to escape? ${percent(inspect.dash.odds)} (dashes above ${percent(inspect.dash.above)})`)])),
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
export function inspector(panel: () => HTMLElement, messages: () => readonly ChatMessage[]) {
  addStyle(inspectorCss);
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
