export const css = `
.tbh-fsd { --gold: #ffd36b; --text: #f3e6c4; --muted: #a8977a; --line: #6b5631; --violet: #c9a0ff; --bad: #ff8f80;
  padding: 0; margin: auto; border: 0; background: transparent; color: var(--text); overflow: visible;
  width: min(1180px, calc(100vw - 32px)); max-width: none; max-height: none;
  font: 12.5px/1.45 ui-monospace, Menlo, Consolas, monospace; }
.tbh-fsd::backdrop { background: rgba(8,6,14,.62); backdrop-filter: blur(3px); animation: tbh-fsd-fade .35s ease-out; }
.tbh-fsd.tbh-fsd-leaving::backdrop { opacity: 0; transition: opacity .45s ease-in; }
@keyframes tbh-fsd-fade { from { opacity: 0; } }
.tbh-fsd-sheet { display: flex; flex-direction: column; max-height: calc(100vh - 32px); box-sizing: border-box; border-radius: 12px; overflow: hidden;
  background: linear-gradient(180deg, #1d1726, #15110c 40%); border: 1px solid #8e74c9; box-shadow: 0 24px 80px rgba(0,0,0,.65), 0 0 0 1px rgba(201,160,255,.12) inset; }
.tbh-fsd-head { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,.08); }
.tbh-fsd-title { display: flex; align-items: center; gap: 10px; margin: 0; font-size: 15px; font-weight: 900; letter-spacing: .02em; color: var(--text); }
.tbh-fsd-logo { padding: 2px 7px; border-radius: 5px; font-size: 12px; letter-spacing: .12em; color: #1d1530; background: linear-gradient(135deg, var(--violet), var(--gold)); }
.tbh-fsd-status { flex: 1; min-width: 0; font-size: 11.5px; color: var(--muted); }
.tbh-fsd-status[data-state="on"] { color: #7fe3a4; }
.tbh-fsd-status[data-state="error"] { color: var(--bad); }
.tbh-fsd-x { flex: none; width: 28px; height: 28px; font: inherit; font-size: 18px; line-height: 1; color: var(--muted); background: transparent; border: 1px solid transparent; border-radius: 6px; cursor: pointer; }
.tbh-fsd-x:hover { color: var(--text); border-color: var(--line); }
.tbh-fsd-body { flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(220px, 280px) 1fr; }
.tbh-fsd-state { display: flex; flex-direction: column; gap: 6px; min-height: 0; padding: 12px; border-right: 1px solid rgba(255,255,255,.08); background: rgba(0,0,0,.18); overflow: hidden; }
.tbh-fsd-blocks { flex: 1; min-height: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; padding-right: 2px; overscroll-behavior: contain; }
.tbh-fsd-block { display: flex; flex-direction: column; gap: 2px; padding: 6px 8px; text-align: start; font: inherit; font-size: 11.5px; color: var(--text); background: rgba(255,255,255,.035); border: 1px solid rgba(255,255,255,.07); border-radius: 6px; cursor: copy; }
.tbh-fsd-block:hover { border-color: var(--violet); background: rgba(201,160,255,.09); }
.tbh-fsd-block[hidden] { display: none; }
.tbh-fsd-block-head { display: flex; align-items: baseline; gap: 6px; }
.tbh-fsd-block-head b { color: var(--violet); }
.tbh-fsd-block-head i { font-size: 10px; color: var(--muted); }
.tbh-fsd-block-count { margin-left: auto; font-size: 10.5px; font-weight: 800; color: var(--gold); }
.tbh-fsd-block-used { border-color: rgba(255,211,107,.45); }
.tbh-fsd-block-about { color: var(--muted); font-size: 10.5px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.tbh-fsd-search { padding: 5px 8px; font: inherit; color: var(--text); background: rgba(0,0,0,.35); border: 1px solid var(--line); border-radius: 5px; }
.tbh-fsd-search:focus { outline: none; border-color: var(--violet); }
.tbh-fsd-main { min-height: 0; overflow-y: auto; display: grid; grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr); align-items: start; gap: 16px; padding: 14px 16px 18px; overscroll-behavior: contain; }
.tbh-fsd-planner, .tbh-fsd-loadout, .tbh-fsd-world { display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.tbh-fsd-side { position: sticky; top: 0; display: flex; flex-direction: column; gap: 16px; min-width: 0; }
.tbh-fsd-entities { display: flex; flex-wrap: wrap; gap: 5px; }
.tbh-fsd-entity { display: inline-flex; align-items: center; gap: 5px; padding: 3px 8px 3px 5px; font: inherit; font-size: 11.5px; color: var(--text); background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.1); border-radius: 999px; cursor: copy; }
.tbh-fsd-entity:hover { border-color: var(--gold); background: rgba(255,211,107,.1); }
.tbh-fsd-entity-icon { width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; color: var(--gold); }
.tbh-fsd-entity-icon .tbh-svg-fill { fill: currentColor; stroke: none; }
.tbh-fsd-tip { position: fixed; z-index: 1; max-width: min(420px, calc(100vw - 16px)); max-height: 46vh; overflow: hidden; box-sizing: border-box; padding: 8px 10px; pointer-events: none;
  background: #1b1622; border: 1px solid #8e74c9; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,.6); font-size: 11.5px; }
.tbh-fsd-tip[hidden] { display: none; }
.tbh-fsd-tip-name { color: var(--violet); }
.tbh-fsd-tip-about { margin-top: 3px; color: var(--muted); }
.tbh-fsd-tip-label { margin-top: 7px; font-size: 10px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; color: var(--gold); }
.tbh-fsd-tip-value { margin: 3px 0 0; padding: 6px 8px; white-space: pre-wrap; overflow-wrap: anywhere; font: inherit; font-size: 11px; color: #dbe6ff; background: rgba(0,0,0,.35); border-radius: 5px; }
.tbh-fsd-field-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.tbh-fsd-label { margin: 0; font-size: 11px; font-weight: 900; letter-spacing: .1em; text-transform: uppercase; color: var(--gold); }
.tbh-fsd-hint { margin: 0; font-size: 11px; color: var(--muted); }
.tbh-fsd-pace-field { display: inline-flex; align-items: center; gap: 8px; font-size: 11.5px; color: var(--muted); }
.tbh-fsd-pace { width: 150px; accent-color: var(--violet); }
.tbh-fsd-pace-out { min-width: 3.5ch; font-weight: 800; color: var(--text); font-variant-numeric: tabular-nums; }
.tbh-fsd-grow { display: grid; border: 1px solid var(--line); border-radius: 6px; background: rgba(0,0,0,.35); }
.tbh-fsd-grow:focus-within { border-color: var(--violet); box-shadow: 0 0 0 2px rgba(201,160,255,.18); }
.tbh-fsd-area, .tbh-fsd-mirror { grid-area: 1 / 1; box-sizing: border-box; min-height: 3.2em; margin: 0; padding: 8px 10px; border: 0; font: inherit; line-height: 1.5; letter-spacing: normal; white-space: pre-wrap; overflow-wrap: anywhere; word-break: normal; tab-size: 2; }
.tbh-fsd-step .tbh-fsd-area, .tbh-fsd-step .tbh-fsd-mirror { min-height: 0; }
.tbh-fsd-area { resize: none; overflow: hidden; color: var(--text); caret-color: var(--gold); background: transparent; outline: none; }
.tbh-fsd-area::placeholder { color: #7d6d52; }
.tbh-fsd-mirror { color: transparent; pointer-events: none; user-select: none; }
.tbh-fsd-chip { color: transparent; background: rgba(201,160,255,.22); border-radius: 4px; box-shadow: 0 0 0 1px rgba(201,160,255,.55); }
.tbh-fsd-chip-bad { background: rgba(255,143,128,.2); box-shadow: 0 0 0 1px var(--bad); }
.tbh-fsd-errors { margin: 2px 0 0; padding: 0 0 0 16px; font-size: 11px; color: var(--bad); }
.tbh-fsd-errors[hidden] { display: none; }
.tbh-fsd-timeline { display: flex; flex-direction: column; gap: 6px; margin-top: 10px; }
.tbh-fsd-steps { display: flex; flex-direction: column; gap: 6px; margin: 0; padding: 0; list-style: none; }
.tbh-fsd-step { display: grid; grid-template-columns: auto 74px minmax(0, 1fr) auto; align-items: start; gap: 6px; padding: 6px; border: 1px solid rgba(255,255,255,.07); border-radius: 8px; background: rgba(255,255,255,.03); }
.tbh-fsd-step-bad { border-color: rgba(255,143,128,.6); background: rgba(255,143,128,.06); }
.tbh-fsd-dragging { opacity: .35; border-style: dashed; }
.tbh-fsd-handle { align-self: stretch; display: grid; place-items: center; width: 18px; color: var(--muted); cursor: grab; user-select: none; font-size: 14px; border-radius: 4px; }
.tbh-fsd-handle:hover { color: var(--text); background: rgba(255,255,255,.06); }
.tbh-fsd-time { box-sizing: border-box; width: 100%; margin: 0; padding: 8px 6px; font: inherit; line-height: 1.5; font-weight: 800; text-align: center; font-variant-numeric: tabular-nums; color: var(--gold); background: rgba(0,0,0,.35); border: 1px solid var(--line); border-radius: 6px; }
.tbh-fsd-time:focus { outline: none; border-color: var(--violet); }
.tbh-fsd-time[readonly] { color: var(--muted); border-style: dashed; }
.tbh-fsd-time.tbh-fsd-invalid { color: var(--bad); border-color: var(--bad); background: rgba(255,143,128,.12); }
.tbh-fsd-step-now { border-color: rgba(127,227,164,.55); box-shadow: inset 3px 0 0 #7fe3a4; }
.tbh-fsd-step-now .tbh-fsd-time { color: #7fe3a4; }
.tbh-fsd-remove { width: 26px; height: 26px; margin-top: 3px; font: inherit; font-size: 15px; line-height: 1; color: var(--muted); background: transparent; border: 1px solid transparent; border-radius: 5px; cursor: pointer; }
.tbh-fsd-remove:hover:not(:disabled) { color: var(--bad); border-color: rgba(255,143,128,.5); }
.tbh-fsd-remove:disabled { visibility: hidden; }
.tbh-fsd-step-errors { grid-column: 3 / 5; }
.tbh-fsd-step-errors:empty { display: none; }
.tbh-fsd-add { align-self: flex-start; padding: 6px 12px; font: inherit; font-weight: 800; color: var(--violet); background: transparent; border: 1px dashed rgba(201,160,255,.6); border-radius: 6px; cursor: pointer; }
.tbh-fsd-add:hover { color: #fff; border-style: solid; background: rgba(201,160,255,.1); }
.tbh-fsd-foot { display: flex; align-items: center; gap: 10px; padding: 10px 16px; border-top: 1px solid rgba(255,255,255,.08); background: rgba(0,0,0,.25); }
.tbh-fsd-saved { flex: 1; min-width: 0; font-size: 11px; color: var(--muted); }
.tbh-fsd-saved-bad { color: var(--bad); }
.tbh-fsd-stop { padding: 7px 14px; font: inherit; font-weight: 800; color: #ffd6d0; background: rgba(227,138,127,.12); border: 1px solid #e38a7f; border-radius: 6px; cursor: pointer; }
.tbh-fsd-stop[hidden] { display: none; }
.tbh-fsd-engage { min-width: 140px; padding: 8px 18px; font: inherit; font-size: 13px; font-weight: 900; letter-spacing: .04em; color: #1d1530; background: linear-gradient(135deg, var(--violet), var(--gold)); border: 0; border-radius: 6px; cursor: pointer; box-shadow: 0 4px 18px rgba(201,160,255,.25); }
.tbh-fsd-engage:hover:not(:disabled) { filter: brightness(1.08); }
.tbh-fsd-engage:disabled { opacity: .45; cursor: not-allowed; box-shadow: none; }
@media (max-width: 860px) {
  .tbh-fsd-body { grid-template-columns: 1fr; overflow-y: auto; }
  .tbh-fsd-state { max-height: 32vh; border-right: 0; border-bottom: 1px solid rgba(255,255,255,.08); }
  .tbh-fsd-main { grid-template-columns: 1fr; overflow: visible; }
  .tbh-fsd-side { position: static; }
  .tbh-fsd-pace { width: 110px; }
}
@media (max-width: 520px) {
  .tbh-fsd { width: calc(100vw - 16px); }
  .tbh-fsd-sheet { max-height: calc(100vh - 16px); }
  .tbh-fsd-step { grid-template-columns: auto 64px minmax(0, 1fr) auto; }
  .tbh-fsd-foot { flex-wrap: wrap; }
  .tbh-fsd-saved { flex-basis: 100%; }
  .tbh-fsd-engage { flex: 1; }
}
`;
