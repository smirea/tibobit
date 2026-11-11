import { css } from "./machine-view.css";
import { type ActionTag, SPOT_TAGS } from "../../protocol/pilot";
import { ACTIONS, type Machine, type MachineAction, type Way } from "../../protocol/machine";
import { ACTION_ICONS, svgIcon } from "../pilot/icons";
import { addStyle, h } from "../panel/dom";

const SVG = "http://www.w3.org/2000/svg";

const TAGS: Record<Exclude<MachineAction["type"], "spot">, ActionTag> = { chest: "Loot", food: "Eat", magnet: "Magnet", elite: "Hunt", explore: "Wander", dash: "Dash", still: "Hold" };
const tagOf = (a: MachineAction): ActionTag => (a.type !== "spot" ? TAGS[a.type] : a.kind === undefined ? "Spot" : (SPOT_TAGS[a.kind] ?? "Spot"));

const wayWords = (way: Way) => (way === "fewestEnemies" ? "toward the fewest enemies" : way === "mostEnemies" ? "toward the most enemies" : way);

/** An action in a few words, with the game's own name for a kind of spot when it is known. */
function actionWords(a: MachineAction, spotName: (kind: string) => string | undefined): string {
  switch (a.type) {
    case "chest":
      return "open chests";
    case "food":
      return "eat food";
    case "magnet":
      return "grab magnets";
    case "elite":
      return "fight elites";
    case "spot":
      return a.kind === undefined ? "use the nearest spot" : `use ${spotName(a.kind) ?? a.kind}`;
    case "explore":
      return `explore ${wayWords(a.dir)}`;
    case "dash":
      return `dash ${wayWords(a.dir)}`;
    case "still":
      return "stand still";
  }
}

/** The states in rows by how many transitions they are from the first one. */
function ranks(machine: Machine): string[][] {
  const depth = new Map([[machine.initial, 0]]);
  for (const [name, d] of depth) for (const t of machine.states[name]?.on?.tick ?? []) if (!depth.has(t.target)) depth.set(t.target, d + 1);
  const rows: string[][] = [];
  for (const [name, d] of depth) (rows[d] ??= []).push(name);
  return rows;
}

type Box = { left: number; top: number; width: number; height: number };

/** An element's box within `root`, by its layout rather than its drawn place, so a popup mid-flip measures the same. */
function boxIn(root: HTMLElement, el: HTMLElement): Box {
  let [left, top] = [0, 0];
  for (let at: HTMLElement | null = el; at !== null && at !== root; at = at.offsetParent as HTMLElement | null) {
    left += at.offsetLeft;
    top += at.offsetTop;
  }
  return { left, top, width: el.offsetWidth, height: el.offsetHeight };
}

let styled = false;

export type MachineView = {
  el: HTMLElement;
  /** Draws the machine, with the state it is in lit when it is running. */
  show(machine: Machine, active?: { state: string; seconds: number }): void;
};

/**
 * A state machine as a graph: each state a card with its autopilot action and its transitions in
 * the order they are tried, and an arrow from each transition to the state it leads to. `compact`
 * is the small one shown over the game, which lists only the transitions of the state it is in.
 */
export function machineView(compact: boolean, spotName: (kind: string) => string | undefined = () => undefined): MachineView {
  if (!styled) addStyle(css);
  styled = true;
  const edges = document.createElementNS(SVG, "svg");
  edges.setAttribute("class", "tbh-mv-edges");
  edges.setAttribute("aria-hidden", "true");
  const rows = h("div", "tbh-mv-ranks");
  const el = h("div", `tbh-mv${compact ? " tbh-mv-compact" : ""}`);
  // The arrows go under the cards, so one that crosses a card never covers its text.
  el.append(edges, rows);
  const nodes = new Map<string, { card: HTMLElement; time: HTMLElement }>();
  let drawn = "";
  let lit: string | undefined;

  const card = (machine: Machine, name: string) => {
    const state = machine.states[name];
    if (state === undefined) throw new Error(`the machine has no state ${name}`);
    const action = state.meta.action;
    const time = h("span", "tbh-mv-time");
    const outs = (state.on?.tick ?? []).map((t, i) => {
      const li = h("li", "tbh-mv-out", h("span", "tbh-mv-order", String(i + 1)), h("code", "tbh-mv-guard", t.guard ?? "always"), h("span", "tbh-mv-arrow", "→"), h("b", "tbh-mv-target", t.target));
      li.dataset.target = t.target;
      li.title = [t.description, t.guard].filter(Boolean).join("\n");
      li.addEventListener("pointerenter", () => focus(li));
      li.addEventListener("pointerleave", () => focus(undefined));
      return li;
    });
    const head = h("header", "tbh-mv-head", svgIcon(ACTION_ICONS[tagOf(action)], "tbh-mv-icon"), h("b", "tbh-mv-name", name), ...(name === machine.initial ? [h("i", "tbh-mv-start", "start")] : []), time);
    const el = h(
      "article",
      "tbh-mv-node",
      head,
      h("div", "tbh-mv-action", actionWords(action, spotName)),
      ...(state.description === undefined ? [] : [h("p", "tbh-mv-about", state.description)]),
      ...(outs.length === 0 ? [h("p", "tbh-mv-about tbh-mv-end", "Stays here for the rest of the run.")] : [h("ol", "tbh-mv-outs", ...outs)]),
    );
    el.dataset.state = name;
    el.title = `${JSON.stringify(action)}\n${ACTIONS[action.type].about}`;
    return { card: el, time };
  };

  /** Lights one transition's arrow and the state it leads to, while it is hovered. */
  const focus = (li: HTMLElement | undefined) => {
    for (const path of edges.querySelectorAll("path[data-edge]")) path.classList.toggle("tbh-mv-edge-focus", li !== undefined && path.getAttribute("data-edge") === li.dataset.edge);
    for (const [name, node] of nodes) node.card.classList.toggle("tbh-mv-node-focus", li?.dataset.target === name);
  };

  const draw = () => {
    if (el.offsetWidth === 0) return;
    edges.setAttribute("viewBox", `0 0 ${el.offsetWidth} ${el.offsetHeight}`);
    const paths: SVGElement[] = [];
    let n = 0;
    for (const [name, { card }] of nodes) {
      const from = boxIn(el, card);
      for (const li of card.querySelectorAll<HTMLElement>("li[data-target]")) {
        const target = nodes.get(li.dataset.target ?? "")?.card;
        // The compact view lists only the active state's transitions; the rest take no space.
        if (target === undefined || li.offsetHeight === 0) continue;
        const row = boxIn(el, li);
        const to = boxIn(el, target);
        const y = row.top + row.height / 2;
        const sameColumn = Math.abs(to.left + to.width / 2 - (from.left + from.width / 2)) < 12;
        const right = sameColumn || to.left + to.width / 2 > from.left + from.width / 2;
        const x = right ? from.left + from.width : from.left;
        const out = right ? 34 : -34;
        // A few lanes, so arrows into one state do not land on one point.
        const lane = ((n++ % 5) - 2) * 9;
        let d: string;
        if (sameColumn) {
          const ey = to.top + to.height / 2 + lane;
          d = `M${x} ${y} C${x + 46} ${y} ${to.left + to.width + 46} ${ey} ${to.left + to.width} ${ey}`;
        } else if (to.top >= from.top + from.height) {
          const ex = to.left + to.width / 2 + lane;
          d = `M${x} ${y} C${x + out} ${y} ${ex} ${to.top - 34} ${ex} ${to.top}`;
        } else if (to.top + to.height <= from.top) {
          const ex = to.left + to.width / 2 + lane;
          d = `M${x} ${y} C${x + out} ${y} ${ex} ${to.top + to.height + 34} ${ex} ${to.top + to.height}`;
        } else {
          const ex = right ? to.left : to.left + to.width;
          const ey = to.top + to.height / 2 + lane;
          d = `M${x} ${y} C${x + out} ${y} ${ex - out} ${ey} ${ex} ${ey}`;
        }
        const path = document.createElementNS(SVG, "path");
        path.setAttribute("d", d);
        path.setAttribute("class", `tbh-mv-edge${name === lit ? " tbh-mv-edge-live" : ""}`);
        path.setAttribute("marker-end", "url(#tbh-mv-head)");
        li.dataset.edge = String(n);
        path.setAttribute("data-edge", String(n));
        paths.push(path);
      }
    }
    const defs = document.createElementNS(SVG, "defs");
    defs.innerHTML = '<marker id="tbh-mv-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" fill="context-stroke"/></marker>';
    edges.replaceChildren(defs, ...paths);
  };
  new ResizeObserver(draw).observe(el);

  return {
    el,
    show(machine, active) {
      // The game's names for its spots arrive with the first run, after a machine may have been drawn.
      const spots = Object.values(machine.states).map((s) => (s.meta.action.type === "spot" && s.meta.action.kind !== undefined ? (spotName(s.meta.action.kind) ?? "") : ""));
      const key = `${JSON.stringify(machine)}|${spots.join("|")}`;
      if (key !== drawn) {
        drawn = key;
        nodes.clear();
        rows.replaceChildren(
          ...ranks(machine).map((names) =>
            h(
              "div",
              "tbh-mv-rank",
              ...names.map((name) => {
                const node = card(machine, name);
                nodes.set(name, node);
                return node.card;
              }),
            ),
          ),
        );
      }
      lit = active?.state;
      for (const [name, node] of nodes) {
        node.card.classList.toggle("tbh-mv-active", name === lit);
        node.time.textContent = name === lit && active !== undefined ? `${Math.round(active.seconds)}s` : "";
      }
      draw();
    },
  };
}
