export const css = `
.tbh-xr-damage { margin-block: 4px 6px; padding: 5px 7px; border-radius: 6px; background: rgba(0,0,0,.28); font: clamp(11px, .55em, 15px)/1.3 ui-monospace, Menlo, Consolas, monospace; color: #f3e6c4; text-align: start; }
.tbh-xr-title { display: flex; justify-content: space-between; gap: 8px; color: #ffd36b; font-weight: 700; margin-bottom: 3px; }
.tbh-xr-total { color: #c9b58a; font-weight: 400; }
.tbh-xr-rows { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 190px), 1fr)); column-gap: 14px; row-gap: 2px; }
.tbh-xr-row { display: grid; grid-template-columns: auto 1fr auto 3.5ch; align-items: center; gap: 5px; min-width: 0; }
.tbh-xr-row > .tbh-icon { --s: 1.1; }
.tbh-xr-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tbh-xr-dmg { font-variant-numeric: tabular-nums; }
.tbh-xr-share { color: #a8977a; text-align: end; font-variant-numeric: tabular-nums; }
`;
