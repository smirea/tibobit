export const css = `
.tbh-mo { position: fixed; top: 8px; left: 8px; z-index: 2147483000; box-sizing: border-box; width: min(330px, calc(100vw - 16px)); max-height: 52vh; overflow: hidden; padding: 6px 4px 8px;
  pointer-events: none; color: #f3e6c4; background: rgba(17,14,22,.82); border: 1px solid rgba(142,116,201,.7); border-radius: 8px; box-shadow: 0 4px 18px rgba(0,0,0,.5);
  font: 11px/1.35 ui-monospace, Menlo, Consolas, monospace; }
.tbh-mo[hidden] { display: none; }
.tbh-mo-head { display: flex; align-items: center; gap: 7px; padding: 0 6px 6px; }
.tbh-mo-logo { padding: 1px 5px; border-radius: 4px; font-size: 9.5px; font-weight: 900; letter-spacing: .12em; color: #1d1530; background: linear-gradient(135deg, #c9a0ff, #ffd36b); }
.tbh-mo-name { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; }
@media (max-width: 699px) {
  /* The panel sits under it on a phone, so only the state it is in and what that state does. */
  .tbh-mo { width: min(230px, 60vw); }
  .tbh-mo :is(.tbh-mv-node:not(.tbh-mv-active), .tbh-mv-edges, .tbh-mv-outs) { display: none; }
  .tbh-mo .tbh-mv-action { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
}
`;
