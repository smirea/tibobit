import { css as feedCss } from "./feed.css";
import { ACTION_ICONS, moveIcon, NOTE_ICON, RESULT_ICONS, svgIcon } from "./icons";
import { type ChatMessage, PACE_LIMITS, type PilotPace } from "../../protocol/pilot";
import type { Direction } from "../../protocol/geometry";
import { Pilot } from "./pilot";
import { addStyle, h } from "../panel/dom";
import { costly, inspector } from "./inspector";
import { arrowed } from "./arrows";
import { clock } from "../../clock";


// More tiles than the box ever holds; it clips the rest.
const FLOW_TILES = 60;

/** A step the action model chose, as the move it took; undefined for anything else. */
function step(m: ChatMessage): { move: Direction | "still"; hurt: boolean; dash: boolean } | undefined {
  if (m.role !== "action" || m.inspect?.kind !== "moves") return undefined;
  const chosen = m.inspect.moves.find((x) => x.outcome === "chosen");
  return { move: chosen?.move ?? "still", hurt: chosen?.forecast !== undefined && costly(chosen.forecast), dash: m.tag === "Dash" };
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
export function botFeed(pilot: Pilot): HTMLElement {
  addStyle(feedCss);
  const giveBack = h("button", "tbh-giveback");
  giveBack.type = "button";
  giveBack.addEventListener("click", () => pilot.set({ on: false }));
  const paceInput = (key: keyof PilotPace) => {
    const { min, max, step } = PACE_LIMITS[key];
    const input = h("input", "tbh-pace-input");
    Object.assign(input, { type: "number", min: String(min), max: String(max), step: String(step), inputMode: "decimal" });
    input.addEventListener("change", () => {
      const v = Number(input.value);
      if (!Number.isFinite(v) || input.value === "") return;
      const clamped = Number(Math.min(max, Math.max(min, Math.round(v / step) * step)).toFixed(1));
      input.value = String(clamped);
      pilot.set({ [key]: clamped });
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
  const insp = inspector(() => plan.closest<HTMLElement>(".tbh-panel") ?? plan, () => pilot.chat());
  let shownPlan: ChatMessage | undefined;

  const render = () => {
    const now = pilot.state();
    const label = now.state === "stopping" ? "Handing the wheel back…" : "I'll do it myself";
    if (giveBack.textContent !== label) giveBack.textContent = label;
    giveBack.disabled = now.state !== "on";
    // Typing in a box is not interrupted by the server echoing the value back.
    for (const [input, value] of [
      [planEvery, now.pace.planEvery],
      [actEvery, now.pace.actEvery],
    ] as const) {
      input.disabled = now.state !== "on";
      if (document.activeElement !== input && input.value !== String(value)) input.value = String(value);
    }

    const messages = pilot.chat();
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

  pilot.onChange(render);
  render();
  return box;
}
