export const css = `
.tbh-do { position: fixed; top: 8px; left: 8px; z-index: 2147483000; box-sizing: border-box; width: min(430px, calc(100vw - 16px)); padding: 6px 0 4px;
  pointer-events: none; color: #f3e6c4; background: rgba(17,14,22,.84); border: 1px solid rgba(142,116,201,.7); border-radius: 8px; box-shadow: 0 4px 18px rgba(0,0,0,.5);
  font: 11px/1.35 ui-monospace, Menlo, Consolas, monospace; }
.tbh-do[hidden] { display: none; }
.tbh-do-head { display: flex; align-items: baseline; gap: 7px; padding: 0 8px 4px; }
.tbh-do-logo { padding: 1px 5px; border-radius: 4px; font-size: 9.5px; font-weight: 900; letter-spacing: .12em; color: #1d1530; background: linear-gradient(135deg, #c9a0ff, #ffd36b); }
.tbh-do-why { color: #7fe3a4; white-space: nowrap; }
.tbh-do-action { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 10.5px; color: #c9b58a; }
.tbh-do-error :is(.tbh-do-why, .tbh-do-action) { color: #ff8f80; }
.tbh-do .tbh-code { max-height: 40vh; }
@media (max-width: 699px) {
  /* The panel sits under it on a phone, so only what the function returned. */
  .tbh-do { width: min(260px, 64vw); }
  .tbh-do .tbh-code { display: none; }
  .tbh-do-head { flex-wrap: wrap; }
}
`;
