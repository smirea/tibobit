export const css = `
.tbh-panel {
  position: fixed; top: 52px; right: 8px; z-index: 2147483000;
  width: min(300px, calc(100vw - 16px)); max-height: calc(100vh - 120px); overflow: auto;
  background: rgba(17, 14, 10, 0.88); color: #f3e6c4; border: 1px solid #6b5631; border-radius: 6px;
  font: 12px/1.35 ui-monospace, Menlo, Consolas, monospace; box-shadow: 0 4px 18px rgba(0,0,0,.5);
  touch-action: auto; user-select: none;
}
.tbh-panel[hidden] { display: none; }
.tbh-panel.tbh-collapsed:not(.tbh-choice), .tbh-panel.tbh-choice:not(.tbh-peek) { width: auto; }
.tbh-collapsed .tbh-header, .tbh-choice:not(.tbh-peek) .tbh-header { gap: 12px; }
@media (max-width: 699px) {
  .tbh-panel { top: 100px; }
  .tbh-panel.tbh-choice { display: none; }
}
.tbh-header { display: flex; justify-content: space-between; padding: 6px 8px; cursor: pointer; font-weight: 700; color: #ffd36b; position: sticky; top: 0; background: rgba(17,14,10,.96); }
.tbh-count { color: #c9b58a; font-weight: 400; }
.tbh-collapsed:not(.tbh-choice) :is(.tbh-body, .tbh-stale),
.tbh-choice:not(.tbh-peek) :is(.tbh-body, .tbh-stale) { display: none; }
.tbh-body { padding: 0 6px 6px; }
.tbh-empty { color: #a8977a; padding: 4px 2px; }
.tbh-row { padding: 5px 6px; margin-top: 4px; border-radius: 4px; background: rgba(255,255,255,.04); border-left: 3px solid #5d4c2e; }
.tbh-row.tbh-ready { border-left-color: #5ee8a0; background: rgba(94,232,160,.10); }
.tbh-row-head { display: flex; justify-content: space-between; gap: 6px; align-items: baseline; }
.tbh-result { font-weight: 700; color: #ffe9b0; }
.tbh-kind { font-size: 10px; color: #a8977a; text-transform: uppercase; letter-spacing: .05em; }
.tbh-ready .tbh-kind, .tbh-ready-tag { color: #5ee8a0; font-weight: 700; }
.tbh-parts { display: flex; flex-wrap: wrap; gap: 2px 6px; margin-top: 2px; }
.tbh-plus, .tbh-arrow { color: #8d7c5c; }
.tbh-done { color: #7fe3a4; }
.tbh-leveling { color: #ffcf5a; }
.tbh-missing { color: #e38a7f; }
.tbh-via { font-size: 10.5px; color: #a8977a; margin-top: 2px; }
.tbh-stale { margin: 0 6px 6px; padding: 4px 6px; border-radius: 4px; background: rgba(227,138,127,.15); color: #f0b3aa; font-size: 11px; }
.tbh-badge { display: inline-block; margin-left: 5px; padding: 0 4px; border-radius: 3px; font-size: 9.5px; font-weight: 800; letter-spacing: .06em; vertical-align: 1px; }
.tbh-badge-new { align-self: flex-start; background: #ff7ad9; color: #3d0630; margin: 0 0 2px; }
.tbh-badge-evo { background: #ffd36b; color: #3a2600; }

.ui-card.tbh-card-new { box-shadow: 0 0 0 2px #ff7ad9, 0 0 16px rgba(255,122,217,.6) !important; }
.ui-card.tbh-card-evo { box-shadow: 0 0 0 2px #ffd36b, 0 0 14px rgba(255,211,107,.55) !important; }
.ui-card.tbh-card-new.tbh-card-evo { box-shadow: 0 0 0 2px #ff7ad9, 0 0 0 4px #ffd36b, 0 0 16px rgba(255,211,107,.5) !important; }
.tbh-card { display: flex; flex-direction: column; gap: 1px; margin-top: 4px; font: clamp(11px, .6em, 16px)/1.3 ui-monospace, Menlo, Consolas, monospace; color: #c9b58a; text-align: start; }
.tbh-line { display: flex; flex-wrap: wrap; gap: 0 5px; align-items: baseline; opacity: .7; }
.tbh-line.tbh-match { opacity: 1; color: #f3e6c4; }
`;
