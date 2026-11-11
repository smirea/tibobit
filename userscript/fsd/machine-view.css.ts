export const css = `
.tbh-mv { --gold: #ffd36b; --text: #f3e6c4; --muted: #a8977a; --violet: #c9a0ff; --live: #7fe3a4; position: relative; min-width: 0; }
.tbh-mv-ranks { display: flex; flex-direction: column; gap: 34px; padding: 4px 34px; }
.tbh-mv-rank { display: flex; flex-wrap: wrap; justify-content: center; align-items: flex-start; gap: 34px 48px; }
.tbh-mv-node { position: relative; z-index: 1; flex: 0 1 264px; min-width: 0; box-sizing: border-box; padding: 7px 9px 8px; color: var(--text); background: #1c1724; border: 1px solid rgba(201,160,255,.35); border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,.35); transition: border-color .2s, box-shadow .2s, background .2s; }
.tbh-mv-head { display: flex; align-items: center; gap: 6px; }
.tbh-mv-icon { flex: none; width: 17px; height: 17px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; color: var(--gold); }
.tbh-mv-icon .tbh-svg-fill { fill: currentColor; stroke: none; }
.tbh-mv-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; font-size: 12.5px; }
.tbh-mv-start { flex: none; padding: 0 5px; font-size: 9.5px; font-style: normal; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #1d1530; background: var(--violet); border-radius: 999px; }
.tbh-mv-time { margin-left: auto; font-size: 10.5px; font-weight: 800; font-variant-numeric: tabular-nums; color: var(--live); }
.tbh-mv-action { margin-top: 2px; font-size: 11px; font-weight: 700; color: var(--gold); }
.tbh-mv-about { margin: 3px 0 0; font-size: 10.5px; color: var(--muted); }
.tbh-mv-outs { display: flex; flex-direction: column; gap: 2px; margin: 6px 0 0; padding: 5px 0 0; list-style: none; border-top: 1px solid rgba(255,255,255,.08); }
.tbh-mv-out { display: grid; grid-template-columns: auto minmax(0, 1fr) auto auto; align-items: baseline; gap: 5px; padding: 1px 3px; font-size: 10.5px; border-radius: 4px; cursor: default; }
.tbh-mv-out:hover { background: rgba(255,211,107,.12); }
.tbh-mv-order { font-size: 9px; color: var(--muted); font-variant-numeric: tabular-nums; }
.tbh-mv-guard { font: inherit; color: #dbe6ff; overflow-wrap: break-word; }
.tbh-mv-arrow { color: var(--muted); }
.tbh-mv-target { color: var(--violet); }
.tbh-mv-active { border-color: var(--live); background: #18251f; box-shadow: 0 0 0 2px rgba(127,227,164,.28), 0 2px 14px rgba(127,227,164,.18); }
.tbh-mv-active .tbh-mv-name { color: var(--live); }
.tbh-mv-node-focus { border-color: var(--gold); box-shadow: 0 0 0 2px rgba(255,211,107,.3); }
.tbh-mv-edges { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.tbh-mv-edge { fill: none; stroke: rgba(201,160,255,.3); stroke-width: 1.3; }
.tbh-mv-edge-live { stroke: rgba(127,227,164,.8); stroke-width: 1.6; }
.tbh-mv-edge-focus { stroke: var(--gold); stroke-width: 2.2; }
.tbh-mv-compact .tbh-mv-ranks { gap: 12px; padding: 2px 16px; }
.tbh-mv-compact .tbh-mv-rank { gap: 10px 20px; }
.tbh-mv-compact .tbh-mv-node { flex: 0 1 auto; padding: 3px 7px 4px; border-radius: 6px; }
.tbh-mv-compact .tbh-mv-active { flex-basis: 100%; }
.tbh-mv-compact .tbh-mv-icon { width: 13px; height: 13px; }
.tbh-mv-compact .tbh-mv-name { font-size: 10.5px; }
.tbh-mv-compact .tbh-mv-about, .tbh-mv-compact .tbh-mv-start, .tbh-mv-compact .tbh-mv-order { display: none; }
.tbh-mv-compact .tbh-mv-node:not(.tbh-mv-active) :is(.tbh-mv-action, .tbh-mv-outs) { display: none; }
.tbh-mv-compact .tbh-mv-action { font-size: 10px; }
.tbh-mv-compact .tbh-mv-outs { margin-top: 3px; padding-top: 3px; }
.tbh-mv-compact .tbh-mv-out { font-size: 9.5px; grid-template-columns: minmax(0, 1fr) auto auto; }
`;
