/** An element of this script's own: its tag, its class and what goes in it. */
export function h<K extends keyof HTMLElementTagNameMap>(tag: K, className: string, ...children: (Node | string)[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  el.className = className;
  el.append(...children);
  return el;
}

/** Adds a component's styles to the page. */
export function addStyle(css: string) {
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);
}
