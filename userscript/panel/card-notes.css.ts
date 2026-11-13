export const css = `
.ui-card.tbh-card-new { box-shadow: 0 0 0 2px #ff7ad9, 0 0 16px rgba(255,122,217,.6) !important; }
.ui-card.tbh-card-evo { box-shadow: 0 0 0 2px #ffd36b, 0 0 14px rgba(255,211,107,.55) !important; }
.ui-card.tbh-card-new.tbh-card-evo { box-shadow: 0 0 0 2px #ff7ad9, 0 0 0 4px #ffd36b, 0 0 16px rgba(255,211,107,.5) !important; }
.tbh-card { display: flex; flex-direction: column; gap: 2px; margin-top: 4px; font: clamp(11px, .6em, 16px)/1.3 ui-monospace, Menlo, Consolas, monospace; color: #c9b58a; text-align: start; }
.tbh-line { display: flex; align-items: center; gap: 5px; }
.tbh-line.tbh-done > .tbh-icon:first-child { box-shadow: 0 0 0 1px #7fe3a4; }
.tbh-line.tbh-leveling > .tbh-icon:first-child { box-shadow: 0 0 0 1px #ffcf5a; }
.tbh-line.tbh-missing > .tbh-icon:first-child { opacity: .55; }
.tbh-line.tbh-done, .tbh-line.tbh-leveling { color: #f3e6c4; }
.tbh-arrow { color: #8d7c5c; }
.tbh-ready-tag { color: #5ee8a0; font-weight: 700; }
#ui-tip > .tbh-lb-desc { padding-bottom: 4px; margin-bottom: 4px; border-bottom: 1px solid rgba(255,255,255,.14); }
`;
