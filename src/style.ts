export const css = `
.tbh-panel {
  position: fixed; top: 52px; right: 8px; z-index: 2147483000;
  width: min(320px, calc(100vw - 16px)); max-height: calc(100vh - 120px); overflow: auto;
  background: rgba(17, 14, 10, 0.88); color: #f3e6c4; border: 1px solid #6b5631; border-radius: 6px;
  font: 12px/1.35 ui-monospace, Menlo, Consolas, monospace; box-shadow: 0 4px 18px rgba(0,0,0,.5);
  touch-action: auto; user-select: none;
}
.tbh-panel:not(.tbh-pilot):is(.tbh-collapsed:not(.tbh-choice), .tbh-choice:not(.tbh-peek)) { width: auto; }
.tbh-panel.tbh-pilot { width: min(340px, calc(100vw - 16px)); }
.tbh-collapsed .tbh-header, .tbh-choice:not(.tbh-peek) .tbh-header { gap: 12px; }
@media (max-width: 699px) {
  .tbh-panel { top: 100px; }
  .tbh-panel.tbh-choice:not(.tbh-pilot) { display: none; }
}
.tbh-header { display: flex; justify-content: space-between; gap: 8px; padding: 6px 8px; cursor: pointer; font-weight: 700; color: #ffd36b; position: sticky; top: 0; background: rgba(17,14,10,.96); }
.tbh-count { color: #c9b58a; font-weight: 400; }
.tbh-collapsed:not(.tbh-choice, .tbh-idle) :is(.tbh-body, .tbh-stale),
.tbh-choice:not(.tbh-peek) :is(.tbh-body, .tbh-stale),
.tbh-panel:not(.tbh-pilot):is(.tbh-collapsed:not(.tbh-choice, .tbh-idle), .tbh-choice:not(.tbh-peek)) .tbh-conn { display: none; }
/* Below the title screen's "made by" badge and "What's new" button. */
.tbh-panel.tbh-idle { top: 80px; }
.tbh-panel.tbh-idle:not(.tbh-pilot) { width: auto; max-width: min(320px, calc(100vw - 16px)); }
.tbh-idle > .tbh-content { display: none; }
.tbh-idle .tbh-conn { border-top: 0; }
.tbh-body { padding: 0 6px 6px; }
.tbh-empty { color: #a8977a; padding: 4px 2px; }
.tbh-need { display: grid; grid-template-columns: 30px 24px 8px 1fr; align-items: center; gap: 4px; padding: 3px 2px; border-top: 1px solid rgba(255,255,255,.06); }
.tbh-need:first-child { border-top: 0; }
.tbh-colon { color: #8d7c5c; }
.tbh-opts { display: flex; flex-wrap: wrap; gap: 3px; }
.tbh-stale { margin: 0 6px 6px; padding: 4px 6px; border-radius: 4px; background: rgba(227,138,127,.15); color: #f0b3aa; font-size: 11px; }
.tbh-conn { padding: 6px 8px; border-top: 1px solid rgba(255,255,255,.08); user-select: auto; }
.tbh-conn-row { display: flex; align-items: center; gap: 6px; }
.tbh-conn-label { color: #c9b58a; flex: 1; white-space: nowrap; }
.tbh-port { width: 7ch; padding: 2px 4px; font: inherit; color: #f3e6c4; background: rgba(255,255,255,.06); border: 1px solid #6b5631; border-radius: 3px; -moz-appearance: textfield; }
.tbh-port::-webkit-inner-spin-button, .tbh-port::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.tbh-port:focus { outline: 1px solid #ffd36b; }
.tbh-port.tbh-invalid { border-color: #e38a7f; }
.tbh-connect { padding: 2px 8px; font: inherit; font-weight: 700; color: #3a2600; background: #ffd36b; border: 0; border-radius: 3px; cursor: pointer; }
.tbh-connect:hover { background: #ffe08f; }
.tbh-connected { color: #7fe3a4; font-weight: 700; }
.tbh-dot { flex: none; width: 8px; height: 8px; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 0 0 rgba(61,220,132,.7); animation: tbh-pulse 1.6s ease-out infinite; }
@keyframes tbh-pulse { 70% { box-shadow: 0 0 0 7px rgba(61,220,132,0); } 100% { box-shadow: 0 0 0 0 rgba(61,220,132,0); } }
:is(.tbh-dot, .tbh-wheel, .tbh-connected, .tbh-connect)[hidden] { display: none; }
.tbh-conn-status { margin-top: 4px; font-size: 11px; color: #a8977a; overflow-wrap: anywhere; }
.tbh-conn-status[data-state="ok"] { color: #7fe3a4; }
.tbh-conn-status[data-state="error"] { color: #f0b3aa; }
.tbh-wheel { display: block; width: 100%; margin-top: 6px; padding: 5px 8px; white-space: nowrap; font: inherit; font-weight: 800; letter-spacing: .02em; cursor: pointer;
  color: #f3e6c4; background: linear-gradient(180deg, #3b2f52, #2a2140); border: 1px solid #8e74c9; border-radius: 4px; }
.tbh-wheel:hover:not(:disabled) { border-color: #c9a0ff; color: #fff; }
.tbh-chat-tools { display: flex; align-items: center; gap: 6px; padding: 6px 6px 0; font-size: 11px; color: #c9b58a; }
.tbh-giveback { flex: 1; min-width: 0; padding: 4px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font: inherit; font-weight: 800; cursor: pointer; color: #ffd6d0; background: rgba(227,138,127,.12); border: 1px solid #e38a7f; border-radius: 4px; }
.tbh-giveback:hover:not(:disabled) { color: #fff; background: rgba(227,138,127,.24); }
.tbh-wheel:disabled, .tbh-giveback:disabled { opacity: .5; cursor: default; }
.tbh-incognito { flex: none; padding: 2px 6px; white-space: nowrap; font: inherit; font-size: 11px; font-weight: 800; cursor: pointer; color: #a8977a; background: transparent; border: 1px dashed #6b5631; border-radius: 4px; }
.tbh-incognito:hover { color: #f3e6c4; border-style: solid; }
.tbh-incognito[aria-pressed="true"] { color: #f3e6c4; background: #2a2a33; border: 1px solid #8d8da8; }
.tbh-wheel-note { margin-top: 4px; font-size: 11px; color: #f0b3aa; overflow-wrap: anywhere; }
.tbh-wheel-note[hidden], .tbh-panel:not(.tbh-pilot) .tbh-chatbox { display: none; }
.tbh-chatbox { border-top: 1px solid rgba(255,255,255,.08); }
.tbh-pace-field { --role: #c9a0ff; flex: none; display: inline-flex; align-items: center; gap: 3px; }
.tbh-pace-action { --role: #7fa8ff; }
.tbh-pace-input { width: 2.8em; padding: 2px 3px; font: inherit; color: #f3e6c4; background: rgba(0,0,0,.35); border: 1px solid #6b5631; border-radius: 3px; }
.tbh-pace-input:focus { outline: none; border-color: var(--role); }
.tbh-pace-input:disabled { opacity: .5; }
.tbh-plan { --role: #c9a0ff; display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 6px; margin: 6px 6px 0; padding: 5px 7px; border-left: 3px solid var(--role); border-radius: 0 5px 5px 0; background: rgba(201,160,255,.1); overflow-wrap: anywhere; }
.tbh-plan-label { color: var(--role); font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
.tbh-plan-text { flex: 1 1 60%; min-width: 0; white-space: pre-wrap; }
/* The newest reasoning sits at the bottom; older lines scroll out of the top. */
.tbh-plan-stream { flex-basis: 100%; max-height: 6em; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; white-space: pre-wrap; font-size: 10.5px; font-style: italic; color: #b9a6d9; }
.tbh-actions { display: flex; flex-direction: column; gap: 1px; max-height: 70vh; overflow-y: auto; padding: 4px 6px 6px; user-select: text; overscroll-behavior: contain; }
.tbh-actions:empty::before { content: "Waiting for the bot…"; color: #a8977a; }
.tbh-row { --role: #7fa8ff; display: flex; align-items: baseline; column-gap: 6px; padding: 1px 6px 2px; white-space: nowrap; border-left: 3px solid var(--role); border-radius: 0 4px 4px 0; overflow-wrap: anywhere; }
.tbh-row-system { --role: #6b5631; color: #c9b58a; }
.tbh-row-time { flex: none; font-size: 10px; color: #8d7c5c; font-variant-numeric: tabular-nums; }
.tbh-row-text { min-width: 0; overflow: hidden; text-overflow: ellipsis; font-weight: 700; }
.tbh-sqs { display: flex; flex-wrap: wrap; gap: 2px; }
.tbh-sq { display: inline-flex; align-items: center; justify-content: center; width: 17px; height: 17px; border-radius: 3px; font-size: 12px; font-weight: 900; color: #dbe6ff; background: rgba(127,168,255,.16); border: 1px solid rgba(127,168,255,.35); cursor: help; }
.tbh-sq:hover { background: rgba(127,168,255,.35); border-color: #7fa8ff; }
.tbh-sq-hurt { color: #ffd6d0; background: rgba(227,138,127,.22); border-color: rgba(227,138,127,.6); }
.tbh-sq-dash { box-shadow: 0 0 0 1px #ffd36b; }
.tbh-opt-arrow { font-size: 14px; min-width: 1.2em; }
.tbh-row-inspectable { cursor: help; }
.tbh-row-inspectable:hover { background: rgba(255,255,255,.05); outline: 1px solid color-mix(in srgb, var(--role) 55%, transparent); }
.tbh-cursor { font-style: normal; font-weight: 400; color: var(--role); animation: tbh-blink 1s steps(1) infinite; }
@keyframes tbh-blink { 50% { opacity: 0; } }

.tbh-pick-layer { position: fixed; inset: 0; z-index: 2147482999; pointer-events: none; font: 800 12px/1.3 ui-monospace, Menlo, Consolas, monospace; }
.tbh-pick-layer[hidden], .tbh-pick-layer [hidden] { display: none; }
.tbh-pick-banner { position: fixed; transform: translate(-50%, -100%); box-sizing: border-box; padding: 5px 12px; text-align: center; color: #f3e6c4; background: rgba(42,33,64,.95); border: 1px solid #c9a0ff; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,.5); }
.tbh-pick-bar { position: fixed; display: flex; align-items: center; gap: 6px; box-sizing: border-box; padding: 0 2px; transition: opacity .3s; }
.tbh-pick-track { flex: 1; height: 7px; border-radius: 4px; background: rgba(0,0,0,.55); box-shadow: 0 0 0 1px rgba(255,255,255,.15); overflow: hidden; }
.tbh-pick-track > i { display: block; height: 100%; background: #7fa8ff; }
.tbh-pick-pct { color: #fff; text-shadow: 0 1px 2px #000; }
.tbh-pick-dim { opacity: .35; }
.tbh-pick-frame { position: fixed; box-sizing: border-box; border: 3px solid transparent; border-radius: 10px; transition: border-color .08s, box-shadow .08s; }
.tbh-pick-on { border-color: #ffd36b; box-shadow: 0 0 14px rgba(255,211,107,.7); }
.tbh-pick-final { border-color: #ffd36b; box-shadow: 0 0 26px 4px rgba(255,211,107,.9); animation: tbh-pick-pulse .7s ease-in-out infinite alternate; }
@keyframes tbh-pick-pulse { to { box-shadow: 0 0 10px 1px rgba(255,211,107,.5); } }
@media (prefers-reduced-motion: reduce) { .tbh-pick-final { animation: none; } }
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
.tbh-badge { display: inline-block; padding: 0 4px; border-radius: 3px; font-size: 9.5px; font-weight: 800; letter-spacing: .06em; text-align: center; }
.tbh-badge-new { align-self: flex-start; background: #ff7ad9; color: #3d0630; margin: 0 0 2px; }
.tbh-badge-evo { background: #ffd36b; color: #3a2600; }

.tbh-icon { --s: 1.5; position: relative; display: inline-block; flex: none; width: calc(16px * var(--s)); height: calc(16px * var(--s)); border-radius: 4px; background: rgba(255,255,255,.06); }
.tbh-icon > i { position: absolute; left: 50%; top: 50%; width: calc(var(--w) * var(--s) * 1px); height: calc(var(--h) * var(--s) * 1px);
  margin: calc(var(--ay) * var(--s) * -1px) 0 0 calc(var(--ax) * var(--s) * -1px);
  background: var(--sheet) no-repeat; background-size: calc(var(--sw) * var(--s) * 1px) calc(var(--sh) * var(--s) * 1px);
  background-position: calc(var(--x) * var(--s) * -1px) calc(var(--y) * var(--s) * -1px); image-rendering: pixelated; }
.tbh-icon-text { display: inline-flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: #f3e6c4; }
.tbh-tip { position: fixed; z-index: 2147483001; max-width: min(240px, calc(100vw - 16px)); padding: 5px 7px; pointer-events: none;
  background: rgba(17, 14, 10, 0.96); color: #f3e6c4; border: 1px solid #6b5631; border-radius: 5px; box-shadow: 0 4px 14px rgba(0,0,0,.5);
  font: 11.5px/1.35 ui-monospace, Menlo, Consolas, monospace; text-align: start; }
.tbh-tip[hidden] { display: none; }
.tbh-tip-name { color: #ffd36b; font-weight: 700; }
.tbh-tip-note { color: #c9b58a; }
.tbh-tip-desc { margin-top: 2px; }
.tbh-icon.tbh-banished > i, .tbh-icon-text.tbh-banished { opacity: .45; }
.tbh-icon.tbh-banished::before { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none;
  background: linear-gradient(45deg, transparent 43%, #ff5a4a 43% 57%, transparent 57%), linear-gradient(-45deg, transparent 43%, #ff5a4a 43% 57%, transparent 57%); }
.tbh-icon.tbh-fresh::after { content: ""; position: absolute; right: -2px; top: -2px; width: 7px; height: 7px; border-radius: 50%; background: #ff7ad9; box-shadow: 0 0 0 1px rgba(17,14,10,.9); }

.ui-card.tbh-card-new { box-shadow: 0 0 0 2px #ff7ad9, 0 0 16px rgba(255,122,217,.6) !important; }
.ui-card.tbh-card-evo { box-shadow: 0 0 0 2px #ffd36b, 0 0 14px rgba(255,211,107,.55) !important; }
.ui-card.tbh-card-new.tbh-card-evo { box-shadow: 0 0 0 2px #ff7ad9, 0 0 0 4px #ffd36b, 0 0 16px rgba(255,211,107,.5) !important; }
.tbh-card { display: flex; flex-direction: column; gap: 2px; margin-top: 4px; font: clamp(11px, .6em, 16px)/1.3 ui-monospace, Menlo, Consolas, monospace; color: #c9b58a; text-align: start; }
.tbh-line { display: flex; align-items: center; gap: 5px; }
.tbh-line .tbh-icon { --s: 1.5; }
.tbh-line.tbh-done > .tbh-icon:first-child { box-shadow: 0 0 0 1px #7fe3a4; }
.tbh-line.tbh-leveling > .tbh-icon:first-child { box-shadow: 0 0 0 1px #ffcf5a; }
.tbh-line.tbh-missing > .tbh-icon:first-child { opacity: .55; }
.tbh-line.tbh-done, .tbh-line.tbh-leveling { color: #f3e6c4; }
.tbh-arrow { color: #8d7c5c; }
.tbh-ready-tag { color: #5ee8a0; font-weight: 700; }
`;
