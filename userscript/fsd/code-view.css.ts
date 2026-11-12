export const css = `
.tbh-code { margin: 0; padding: 10px 0; overflow: auto; font: 11.5px/1.55 ui-monospace, Menlo, Consolas, monospace; color: #e8dcc0; background: rgba(0,0,0,.34); border: 1px solid rgba(255,255,255,.07); border-radius: 8px; tab-size: 2; }
.tbh-code-line { display: block; min-width: max-content; padding: 0 12px; border-left: 3px solid transparent; }
.tbh-code-live { background: rgba(127,227,164,.14); border-left-color: #7fe3a4; }
.tbh-code-keyword { color: #c9a0ff; }
.tbh-code-type { color: #7fd6ff; }
.tbh-code-string { color: #ffd36b; }
.tbh-code-number { color: #ff9f7a; }
.tbh-code-comment { color: #8d7c5c; font-style: italic; }
.tbh-code-field { border-bottom: 1px dotted rgba(127,214,255,.6); cursor: help; }
.tbh-code-field:hover { background: rgba(127,214,255,.16); }
.tbh-code-compact { padding: 4px 0; font-size: 9.5px; line-height: 1.4; border: 0; background: transparent; overflow: hidden; }
.tbh-code-compact .tbh-code-line { padding: 0 6px; border-left-width: 2px; }
.tbh-code-compact .tbh-code-field { border-bottom: 0; }
`;
