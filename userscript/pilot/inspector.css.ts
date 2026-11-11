export const css = `
.tbh-insp { position: fixed; z-index: 2147483002; box-sizing: border-box; overflow: auto; padding: 8px 10px 10px; background: rgba(17,14,10,.97); color: #f3e6c4; border: 1px solid #6b5631; border-radius: 6px;
  box-shadow: 0 6px 24px rgba(0,0,0,.6); font: 11.5px/1.4 ui-monospace, Menlo, Consolas, monospace; user-select: text; overscroll-behavior: contain; }
.tbh-insp[hidden] { display: none; }
.tbh-insp-head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; font-size: 10.5px; color: #8d7c5c; }
.tbh-role-planner { --role: #c9a0ff; } .tbh-role-action { --role: #7fa8ff; } .tbh-role-system { --role: #a8977a; }
.tbh-insp-section { margin-top: 8px; }
.tbh-insp-section > h4 { margin: 0 0 4px; font: inherit; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #c9b58a; }
.tbh-insp-pre { margin: 0; padding: 6px 8px; white-space: pre-wrap; overflow-wrap: anywhere; font: inherit; font-size: 10.5px; background: rgba(255,255,255,.04); border-radius: 4px; }
.tbh-insp-thought { color: #b9a6d9; font-style: italic; }
.tbh-opt { padding: 4px 6px; margin-top: 3px; border-radius: 4px; border-left: 3px solid #4a3d29; background: rgba(255,255,255,.03); }
.tbh-opt-chosen { border-left-color: #ffd36b; background: rgba(255,211,107,.1); }
.tbh-opt-safe { border-left-color: #5ee8c0; }
.tbh-opt-risky { border-left-color: #e3a07f; opacity: .8; }
.tbh-opt-ruled-out { opacity: .5; }
.tbh-opt-ruled-out .tbh-opt-name { text-decoration: line-through; }
.tbh-opt-head { display: flex; flex-wrap: wrap; align-items: center; gap: 2px 6px; }
.tbh-opt-name { font-weight: 800; }
.tbh-opt-outcome { font-size: 9.5px; text-transform: uppercase; letter-spacing: .06em; color: #a8977a; }
.tbh-opt-chosen .tbh-opt-outcome { color: #ffd36b; }
.tbh-chip { padding: 0 5px; border-radius: 3px; font-size: 10px; background: rgba(227,138,127,.18); color: #f0b3aa; }
.tbh-chip-ok { background: rgba(127,227,164,.14); color: #7fe3a4; }
.tbh-opt-scores { display: inline-flex; flex-wrap: wrap; justify-content: flex-end; align-items: center; gap: 4px 10px; margin-left: auto; }
.tbh-meter { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; color: #c9b58a; }
.tbh-meter-track { width: 56px; height: 5px; border-radius: 3px; background: rgba(255,255,255,.08); overflow: hidden; }
.tbh-meter-track > i { display: block; height: 100%; }
.tbh-meter-hurt i { background: #e38a7f; } .tbh-meter-useful i { background: #7fa8ff; }
.tbh-opt-desc { margin-top: 2px; font-size: 10.5px; color: #a8977a; white-space: pre-wrap; overflow-wrap: anywhere; }
.tbh-msg-role { color: var(--role); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.tbh-msg-model { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tbh-msg-time { font-variant-numeric: tabular-nums; }
.tbh-insp-text { white-space: pre-wrap; font-weight: 700; }
.tbh-insp-fold { margin-top: 8px; }
.tbh-insp-fold > summary { cursor: pointer; font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: #c9b58a; }
.tbh-insp-fold > .tbh-insp-pre { margin-top: 4px; }
.tbh-insp-past { display: flex; gap: 6px; width: 100%; padding: 2px 4px; text-align: left; font: inherit; font-size: 10.5px; color: #e4d4ae; background: none; border: 0; border-radius: 3px; cursor: pointer; }
.tbh-insp-past:hover { background: rgba(255,255,255,.06); }
.tbh-insp-past-on { background: rgba(201,160,255,.14); }
.tbh-meter-wide .tbh-meter-track { width: 120px; }
`;
