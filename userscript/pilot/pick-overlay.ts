import { css as overlayCss } from "./pick-overlay.css";
import { type CardOption, type ChatMessage, PICK_SHOW_MS } from "../../protocol/pilot";
import type { ChoiceAction } from "../../protocol/commands";
import type { GameLink } from "../link/game-link";
import { OURS } from "../link/screen";
import { Pilot } from "./pilot";
import { addStyle, h } from "../panel/dom";

// The bot waits PICK_SHOW_MS before taking its pick; the pick glows until a little before that.
const SHOW_MS = PICK_SHOW_MS - 500;
// The hand glides in from above the first option to the pick, then presses it.
const ARRIVE_MS = 700;
// A pick message older than this belongs to an earlier choice. Its age counts from when the server
// stamped it (same machine), since a reconnecting tab gets the server's whole chat replayed.
const FRESH_MS = 8000;
// The hand is drawn this tall, in CSS pixels.
const HAND_HEIGHT = 130;

type Show = { id: number; seen: number; text: string; options: (CardOption & { action: ChoiceAction })[]; chosen: number };

/** The game's own buttons that are not cards, in a choice's overlay. */
function buttons(): HTMLButtonElement[] {
  return [...document.querySelectorAll<HTMLButtonElement>("button")].filter((b) => !b.matches(".ui-card, .ui-pause-btn, .ui-sound") && !b.closest(OURS) && b.getClientRects().length > 0 && (b.textContent ?? "").trim() !== "");
}

// The words each of the game's plain actions has on its button, where its name in the view does not match.
const BUTTON_WORDS: Record<string, RegExp> = { reroll: /reroll/i, skip: /skip/i, banish: /banish/i, close: /leave|close|keep|no thanks|done/i, continue: /continue|ok|take|collect/i, accept: /accept|take/i, endRun: /end/i };

/** The page element an option is taken with: its card for a pick, buy or banish, else the button for its action. */
function elementOf(option: CardOption & { action: ChoiceAction }, cards: HTMLElement[], plain: HTMLButtonElement[]): HTMLElement | undefined {
  const a = option.action;
  if ("index" in a) return cards[a.index];
  const name = option.card.trim().toLowerCase();
  return plain.find((b) => (b.textContent ?? "").trim().toLowerCase().startsWith(name)) ?? plain.find((b) => BUTTON_WORDS[a.type]?.test(b.textContent ?? "") === true);
}

/**
 * While the bot has the wheel and picks on any of the game's choices (a level-up, chest, shrine, shop
 * and the rest), shows what it decided above the options, its odds on every option (rerolls, skips
 * and banishes included), and the game's own pointing hand gliding to its pick and pressing it.
 */
export function startPickOverlay(pilot: Pilot, link: GameLink) {
  addStyle(overlayCss);
  const layer = h("div", "tbh-pick-layer");
  const banner = h("div", "tbh-pick-banner");
  const hand = h("img", "tbh-pick-hand");
  hand.alt = "";
  layer.append(banner, hand);
  document.body.append(layer);
  let show: Show | undefined;
  const bars = new Map<number, { bar: HTMLDivElement; frame: HTMLDivElement }>();

  const latestPick = (): ChatMessage | undefined => {
    const chat = pilot.chat();
    for (let i = chat.length - 1; i >= 0; i--) {
      const m = chat[i];
      if (m?.role === "planner" && m.inspect?.kind === "plan" && m.inspect.choices !== undefined) return m;
    }
    return undefined;
  };

  pilot.onChange(() => {
    const m = latestPick();
    if (m === undefined || m.id === show?.id || m.inspect?.kind !== "plan" || m.inspect.choices === undefined) return;
    const options = m.inspect.choices.filter((c): c is CardOption & { action: ChoiceAction } => c.action !== undefined);
    const chosen = options.findIndex((c) => c.chosen);
    if (chosen < 0) return;
    show = { id: m.id, seen: performance.now() - Math.max(0, Date.now() - m.at), text: m.text, options, chosen };
    for (const { bar, frame } of bars.values()) {
      bar.remove();
      frame.remove();
    }
    bars.clear();
    for (const [i, c] of options.entries()) {
      const pct = Math.round((c.probability ?? 0) * 100);
      const fill = document.createElement("i");
      fill.style.width = `${pct}%`;
      const track = h("div", "tbh-pick-track");
      track.append(fill);
      const banish = c.action.type === "banish";
      const bar = h("div", `tbh-pick-bar${banish ? " tbh-pick-banish" : ""}`, ...(banish ? [h("span", "tbh-pick-tag", "banish")] : []), track, h("div", "tbh-pick-pct", `${pct}%`));
      const frame = h("div", `tbh-pick-frame${banish ? " tbh-pick-frame-banish" : ""}`);
      layer.append(bar, frame);
      bars.set(i, { bar, frame });
    }
    banner.textContent = m.text;
  });

  const frame = () => {
    requestAnimationFrame(frame);
    const age = show === undefined ? Number.POSITIVE_INFINITY : performance.now() - show.seen;
    const choosing = (link.game?.state.choiceQueue.length ?? 0) > 0;
    const visible = show !== undefined && pilot.state().state !== "off" && choosing && age < FRESH_MS;
    layer.hidden = !visible;
    if (!visible || show === undefined) return;
    // The combos panel marks the game's cards with classes of its own, so only their ancestors say whether a card is ours.
    const cards = [...document.querySelectorAll<HTMLElement>("button.ui-card, .ui-card[data-tip]")].filter((c) => c.parentElement?.closest(OURS) === null);
    const plain = buttons();
    const done = age >= SHOW_MS;
    const arrived = age >= ARRIVE_MS;
    let top = Number.POSITIVE_INFINITY;
    let left = Number.POSITIVE_INFINITY;
    let right = 0;
    let pick: DOMRect | undefined;
    for (const [i, parts] of bars) {
      const option = show.options[i];
      const rect = option === undefined ? undefined : elementOf(option, cards, plain)?.getBoundingClientRect();
      const shown = rect !== undefined && rect.width > 0;
      parts.bar.hidden = parts.frame.hidden = !shown;
      if (!shown || option === undefined) continue;
      if (i === show.chosen) pick = rect;
      top = Math.min(top, rect.top);
      left = Math.min(left, rect.left);
      right = Math.max(right, rect.right);
      // A card carries its pick's odds above it and its banish's below; a button carries them above.
      const below = option.action.type === "banish";
      Object.assign(parts.bar.style, { left: `${rect.left}px`, top: `${below ? rect.bottom + 6 : rect.top - 22}px`, width: `${Math.max(rect.width, 90)}px` });
      Object.assign(parts.frame.style, { left: `${rect.left - 3}px`, top: `${rect.top - 3}px`, width: `${rect.width + 6}px`, height: `${rect.height + 6}px` });
      parts.frame.classList.toggle("tbh-pick-on", arrived && i === show.chosen);
      parts.frame.classList.toggle("tbh-pick-final", done && i === show.chosen);
      parts.bar.classList.toggle("tbh-pick-dim", done && i !== show.chosen);
    }
    const shape = link.hand;
    hand.hidden = pick === undefined || shape === undefined;
    if (pick !== undefined && shape !== undefined) {
      if (hand.src !== shape.url) hand.src = shape.url;
      const scale = HAND_HEIGHT / shape.height;
      hand.style.width = `${shape.width * scale}px`;
      hand.style.height = `${HAND_HEIGHT}px`;
      // The fingertip lands a little inside the pick's top edge, coming down from above the first option.
      const t = Math.min(1, age / ARRIVE_MS);
      const eased = 1 - (1 - t) ** 3;
      const [fromX, fromY, toX, toY] = [left, top - 60, pick.left + pick.width / 2, pick.top + Math.min(18, pick.height / 3)];
      const x = fromX + (toX - fromX) * eased;
      const y = fromY + (toY - fromY) * eased;
      Object.assign(hand.style, { left: `${x - shape.tipX * scale}px`, top: `${y - shape.tipY * scale}px` });
      hand.classList.toggle("tbh-pick-pressing", arrived);
    }
    if (Number.isFinite(top)) Object.assign(banner.style, { left: `${(left + right) / 2}px`, top: `${top - 66}px`, maxWidth: `${Math.max(240, right - left)}px` });
  };
  requestAnimationFrame(frame);
}
