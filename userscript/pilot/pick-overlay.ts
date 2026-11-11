import type { Bridge } from "../agent/bridge";
import type { CardOption, ChatMessage } from "../../protocol/pilot";
import { choiceCards } from "../agent/snapshot";
import { moveIcon } from "./icons";

// The bot waits 2 seconds (PICK_SHOW_MS in tibo-bot.ts) before taking the card; the pick glows a little before that.
const SHOW_MS = 1500;
// The arrow glides in from the first card's edge to the pick, then bobs there.
const ARRIVE_MS = 700;
// A pick message older than this belongs to an earlier choice. Its age counts from when the server
// stamped it (same machine), since a reconnecting tab gets the server's whole chat replayed.
const FRESH_MS = 8000;

type Show = { id: number; seen: number; text: string; options: CardOption[]; chosen: number };

function el(className: string, text = ""): HTMLDivElement {
  const d = document.createElement("div");
  d.className = className;
  d.textContent = text;
  return d;
}

/**
 * While the bot has the wheel and picks at a level-up, chest or shrine, shows its plan above the
 * cards, its odds above each card, and an arrow that glides to its pick.
 */
export function startPickShow(bridge: Bridge) {
  const layer = el("tbh-pick-layer");
  const banner = el("tbh-pick-banner");
  // Cards side by side get the arrow above them pointing down, under the plan and over the odds
  // (the game's own buttons sit under them); cards stacked get it to their left pointing right.
  const arrows = { down: moveIcon("down", "tbh-pick-arrow-icon"), right: moveIcon("right", "tbh-pick-arrow-icon") };
  const arrow = el("tbh-pick-arrow");
  layer.append(banner, arrow);
  document.body.append(layer);
  let show: Show | undefined;
  const bars = new Map<number, { bar: HTMLDivElement; frame: HTMLDivElement }>();

  const latestPick = (): ChatMessage | undefined => {
    const chat = bridge.chat();
    for (let i = chat.length - 1; i >= 0; i--) {
      const m = chat[i];
      if (m?.role === "planner" && m.inspect?.kind === "plan" && m.inspect.choices !== undefined) return m;
    }
    return undefined;
  };

  bridge.onChange(() => {
    const m = latestPick();
    if (m === undefined || m.id === show?.id || m.inspect?.kind !== "plan" || m.inspect.choices === undefined) return;
    const options = m.inspect.choices.filter((c) => c.index !== undefined);
    const chosen = options.find((c) => c.chosen)?.index;
    if (chosen === undefined) return;
    show = { id: m.id, seen: performance.now() - Math.max(0, Date.now() - m.at), text: m.text, options, chosen };
    for (const { bar, frame } of bars.values()) {
      bar.remove();
      frame.remove();
    }
    bars.clear();
    for (const c of options) {
      const fill = document.createElement("i");
      const label = el("tbh-pick-pct", `${Math.round((c.probability ?? 0) * 100)}%`);
      const bar = el("tbh-pick-bar");
      const track = el("tbh-pick-track");
      track.append(fill);
      fill.style.width = `${Math.round((c.probability ?? 0) * 100)}%`;
      bar.append(track, label);
      const frame = el("tbh-pick-frame");
      layer.append(bar, frame);
      bars.set(c.index ?? 0, { bar, frame });
    }
    banner.textContent = m.text;
  });

  const frame = () => {
    requestAnimationFrame(frame);
    const cards = choiceCards();
    const age = show === undefined ? Number.POSITIVE_INFINITY : performance.now() - show.seen;
    // choiceCards() also lists the overlay's plain buttons, which outside a choice are any menu's.
    const choosing = document.querySelector(".ui-card") !== null;
    const visible = show !== undefined && bridge.pilot().state !== "off" && choosing && cards.length > 0 && age < FRESH_MS;
    layer.hidden = !visible;
    if (!visible || show === undefined) return;
    const done = age >= SHOW_MS;
    const arrived = age >= ARRIVE_MS;
    let top = Number.POSITIVE_INFINITY;
    let left = Number.POSITIVE_INFINITY;
    let right = 0;
    for (const [index, parts] of bars) {
      const rect = cards[index]?.getBoundingClientRect();
      const shown = rect !== undefined && rect.width > 0;
      parts.bar.hidden = parts.frame.hidden = !shown;
      if (!shown) continue;
      top = Math.min(top, rect.top);
      left = Math.min(left, rect.left);
      right = Math.max(right, rect.right);
      Object.assign(parts.bar.style, { left: `${rect.left}px`, top: `${rect.top - 22}px`, width: `${rect.width}px` });
      Object.assign(parts.frame.style, { left: `${rect.left - 3}px`, top: `${rect.top - 3}px`, width: `${rect.width + 6}px`, height: `${rect.height + 6}px` });
      parts.frame.classList.toggle("tbh-pick-on", arrived && index === show.chosen);
      parts.frame.classList.toggle("tbh-pick-final", done && index === show.chosen);
      parts.bar.classList.toggle("tbh-pick-dim", done && index !== show.chosen);
    }
    const pick = cards[show.chosen]?.getBoundingClientRect();
    arrow.hidden = pick === undefined || pick.width === 0;
    if (pick !== undefined && pick.width > 0) {
      const sideBySide = right - left > pick.width * 1.5;
      const icon = sideBySide ? arrows.down : arrows.right;
      if (arrow.firstChild !== icon) arrow.replaceChildren(icon);
      const t = Math.min(1, age / ARRIVE_MS);
      const eased = 1 - (1 - t) ** 3;
      const [fromX, fromY, toX, toY] = sideBySide ? [left, pick.top - 14, pick.left + pick.width / 2, pick.top - 14] : [left - 2, top, pick.left + 2, pick.top + pick.height / 2];
      Object.assign(arrow.style, { left: `${fromX + (toX - fromX) * eased}px`, top: `${fromY + (toY - fromY) * eased}px` });
      arrow.classList.toggle("tbh-pick-arrow-down", sideBySide);
      arrow.classList.toggle("tbh-pick-arrived", arrived);
    }
    if (Number.isFinite(top)) Object.assign(banner.style, { left: `${(left + right) / 2}px`, top: `${top - 66}px`, maxWidth: `${Math.max(240, right - left)}px` });
  };
  requestAnimationFrame(frame);
}
