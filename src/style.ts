export const css = `
.tbh-panel {
  position: fixed; top: 52px; right: 8px; z-index: 2147483000;
  width: min(260px, calc(100vw - 16px)); max-height: calc(100vh - 120px); overflow: auto;
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
.tbh-panel.tbh-idle:not(.tbh-pilot) { width: auto; max-width: min(260px, calc(100vw - 16px)); }
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
.tbh-conn-label { color: #c9b58a; flex: 1; }
.tbh-port { width: 7ch; padding: 2px 4px; font: inherit; color: #f3e6c4; background: rgba(255,255,255,.06); border: 1px solid #6b5631; border-radius: 3px; -moz-appearance: textfield; }
.tbh-port::-webkit-inner-spin-button, .tbh-port::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
.tbh-port:focus { outline: 1px solid #ffd36b; }
.tbh-port.tbh-invalid { border-color: #e38a7f; }
.tbh-connect { padding: 2px 8px; font: inherit; font-weight: 700; color: #3a2600; background: #ffd36b; border: 0; border-radius: 3px; cursor: pointer; }
.tbh-connect:hover { background: #ffe08f; }
.tbh-conn-status { margin-top: 4px; font-size: 11px; color: #a8977a; overflow-wrap: anywhere; }
.tbh-conn-status[data-state="ok"] { color: #7fe3a4; }
.tbh-conn-status[data-state="error"] { color: #f0b3aa; }
.tbh-wheel-row { display: flex; gap: 6px; margin-top: 6px; }
.tbh-wheel { flex: 1; padding: 5px 8px; font: inherit; font-weight: 800; letter-spacing: .02em; cursor: pointer;
  color: #f3e6c4; background: linear-gradient(180deg, #3b2f52, #2a2140); border: 1px solid #8e74c9; border-radius: 4px; }
.tbh-wheel:hover:not(:disabled) { border-color: #c9a0ff; color: #fff; }
.tbh-wheel[data-state="on"] { color: #ffd6d0; background: rgba(227,138,127,.12); border-color: #e38a7f; }
.tbh-wheel:disabled, .tbh-live:disabled { opacity: .5; cursor: default; }
.tbh-live { flex: none; padding: 5px 8px; font: inherit; font-weight: 900; letter-spacing: .04em; cursor: pointer;
  color: #ffb4a8; background: transparent; border: 1px dashed #e38a7f; border-radius: 4px; }
.tbh-live[hidden] { display: none; }
.tbh-live:hover:not(:disabled) { color: #fff; border-style: solid; }
.tbh-live[aria-pressed="true"] { color: #fff; background: #d8362a; border: 1px solid #ff6a5a; box-shadow: 0 0 10px rgba(255,80,60,.6); animation: tbh-onair 1.2s ease-in-out infinite; }
.tbh-live[aria-pressed="true"]::before { content: "● "; }
@keyframes tbh-onair { 50% { box-shadow: 0 0 2px rgba(255,80,60,.3); } }
@media (prefers-reduced-motion: reduce) { .tbh-live[aria-pressed="true"] { animation: none; } }
.tbh-wheel-note { margin-top: 4px; font-size: 11px; color: #f0b3aa; overflow-wrap: anywhere; }
.tbh-wheel-note[hidden], .tbh-panel:not(.tbh-pilot) .tbh-chat { display: none; }
.tbh-chat { display: flex; flex-direction: column; gap: 4px; max-height: min(52vh, 460px); overflow-y: auto; padding: 6px; border-top: 1px solid rgba(255,255,255,.08); user-select: text; overscroll-behavior: contain; }
.tbh-chat:empty::before { content: "Waiting for the bot…"; color: #a8977a; }
.tbh-msg { --role: #a8977a; padding: 4px 6px 5px; border-left: 3px solid var(--role); border-radius: 0 5px 5px 0; background: rgba(255,255,255,.045); overflow-wrap: anywhere; }
.tbh-msg-planner { --role: #c9a0ff; background: rgba(201,160,255,.09); }
.tbh-msg-actor { --role: #5ee8c0; background: rgba(94,232,192,.07); }
.tbh-msg-action { --role: #7fa8ff; display: flex; flex-wrap: wrap; align-items: baseline; column-gap: 6px; padding-block: 2px 3px; background: transparent; }
.tbh-msg-system { --role: #6b5631; color: #c9b58a; }
.tbh-msg-head { display: flex; align-items: baseline; gap: 6px; font-size: 10px; color: #8d7c5c; }
.tbh-msg-role { color: var(--role); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.tbh-msg-model { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tbh-msg-time { margin-left: auto; }
.tbh-msg-text { white-space: pre-wrap; }
.tbh-msg-count { margin-left: 5px; color: var(--role); font-size: 10.5px; font-weight: 700; }
.tbh-msg-detail { white-space: pre-wrap; font-size: 10.5px; color: #a8977a; }
.tbh-msg-action .tbh-msg-model { display: none; }
.tbh-msg-action .tbh-msg-detail { flex-basis: 100%; }
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
