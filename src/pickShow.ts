import type { Bridge } from "./agent/bridge";
import type { CardOption, ChatMessage } from "./agent/protocol";
import { choiceCards } from "./agent/snapshot";

// The bot waits 4 seconds before taking the card; the highlight settles a little before that.
const SHOW_MS = 3400;
const FIRST_HOP_MS = 70;
const SLOWDOWN = 1.16;
// A pick message older than this when its cards are on screen belongs to an earlier choice.
const FRESH_MS = 8000;

type Show = { id: number; seen: number; text: string; options: CardOption[]; hops: { at: number; index: number }[] };

/**
 * Hops that start fast, slow down, and land on the chosen option after SHOW_MS, cycling through
 * the options in screen order.
 */
function hopsTo(indexes: number[], chosen: number): { at: number; index: number }[] {
  const times: number[] = [];
  for (let t = 0, gap = FIRST_HOP_MS; t < SHOW_MS; t += gap, gap *= SLOWDOWN) times.push(t);
  const last = indexes.indexOf(chosen);
  return times.map((at, k) => ({ at, index: indexes[(((last - (times.length - 1 - k)) % indexes.length) + indexes.length) % indexes.length] ?? chosen }));
}

function el(className: string, text = ""): HTMLDivElement {
  const d = document.createElement("div");
  d.className = className;
  d.textContent = text;
  return d;
}

/**
 * While the bot has the wheel and picks at a level-up, chest or shrine, shows its plan above the
 * cards, its odds above each card, and a highlight that hops across them and settles on its pick.
 */
export function startPickShow(bridge: Bridge) {
  const layer = el("tbh-pick-layer");
  const banner = el("tbh-pick-banner");
  layer.append(banner);
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
    show = { id: m.id, seen: performance.now(), text: m.text, options, hops: hopsTo(options.map((c) => c.index ?? 0), chosen) };
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
    const visible = show !== undefined && bridge.pilot().state !== "off" && cards.length > 0 && age < FRESH_MS;
    layer.hidden = !visible;
    if (!visible || show === undefined) return;
    const done = age >= SHOW_MS;
    const lit = done ? show.hops.at(-1)?.index : [...show.hops].reverse().find((hop) => hop.at <= age)?.index;
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
      parts.frame.classList.toggle("tbh-pick-on", index === lit);
      parts.frame.classList.toggle("tbh-pick-final", done && index === lit);
      parts.bar.classList.toggle("tbh-pick-dim", done && index !== lit);
    }
    if (Number.isFinite(top)) Object.assign(banner.style, { left: `${(left + right) / 2}px`, top: `${top - 30}px`, maxWidth: `${Math.max(240, right - left)}px` });
  };
  requestAnimationFrame(frame);
}
