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
.tbh-badge { display: inline-block; padding: 0 4px; border-radius: 3px; font-size: 9.5px; font-weight: 800; letter-spacing: .06em; text-align: center; }
.tbh-badge-new { align-self: flex-start; background: #ff7ad9; color: #3d0630; margin: 0 0 2px; }
.tbh-badge-evo { background: #ffd36b; color: #3a2600; }
`;
