export const css = `
.tbh-chat-tools { display: flex; align-items: center; gap: 6px; padding: 6px 6px 0; font-size: 11px; color: #c9b58a; }
.tbh-giveback { flex: 1; min-width: 0; padding: 4px 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font: inherit; font-weight: 800; cursor: pointer; color: #ffd6d0; background: rgba(227,138,127,.12); border: 1px solid #e38a7f; border-radius: 4px; }
.tbh-giveback:hover:not(:disabled) { color: #fff; background: rgba(227,138,127,.24); }
.tbh-chatbox { border-top: 1px solid rgba(255,255,255,.08); }
.tbh-fsd-open { flex: none; padding: 4px 8px; font: inherit; font-size: 10.5px; font-weight: 900; letter-spacing: .1em; cursor: pointer; color: #1d1530; background: linear-gradient(135deg, #c9a0ff, #ffd36b); border: 0; border-radius: 4px; }
.tbh-fsd-open:hover { filter: brightness(1.1); }
.tbh-plan { --role: #c9a0ff; display: flex; flex-wrap: wrap; align-items: baseline; gap: 2px 6px; margin: 6px 6px 0; padding: 5px 7px; border-left: 3px solid var(--role); border-radius: 0 5px 5px 0; background: rgba(201,160,255,.1); overflow-wrap: anywhere; }
.tbh-plan-label { color: var(--role); font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
.tbh-plan-text { flex: 1 1 60%; min-width: 0; white-space: pre-wrap; }
/* The newest reasoning sits at the bottom; older lines scroll out of the top. */
.tbh-plan-stream { flex-basis: 100%; max-height: 6em; overflow: hidden; display: flex; flex-direction: column; justify-content: flex-end; white-space: pre-wrap; font-size: 10.5px; font-style: italic; color: #b9a6d9; }
/* Eight columns of square tiles, eight rows deep; the rest are clipped. The newest spans 3x3 and the one before it 2x2, and the rest fill in around them in order. */
.tbh-actions { display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 3px; align-content: start; aspect-ratio: 1; overflow: hidden; padding: 6px; user-select: text; }
.tbh-actions:empty { display: block; aspect-ratio: auto; }
.tbh-actions:empty::before { content: "Waiting for the bot…"; color: #a8977a; line-height: 1.4; }
.tbh-tile { --role: #7fa8ff; position: relative; display: grid; place-items: center; box-sizing: border-box; aspect-ratio: 1; min-width: 0; color: #dbe6ff; background: transparent; border-radius: 4px; }
.tbh-tile-icon { display: block; width: 88%; height: 88%; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.tbh-svg-fill { fill: currentColor; stroke: none; }
.tbh-tile-badge { position: absolute; top: 3%; right: 3%; width: 28%; height: 28%; padding: 3%; box-sizing: border-box; border-radius: 50%; background: rgba(10,8,20,.85); fill: none; stroke: currentColor; stroke-width: 3.5; stroke-linecap: round; stroke-linejoin: round; }
.tbh-tile-badge.tbh-result-done { color: #7fd88f; }
.tbh-tile-badge.tbh-result-failed { color: #ff8f80; }
.tbh-tile-badge.tbh-result-dropped { color: #a8977a; }
.tbh-tile-badge.tbh-badge-dash { color: #ffd76a; }
.tbh-tile-system { --role: #a8977a; color: #c9b58a; }
.tbh-tile-hurt { --role: #e38a7f; color: #ffb4a8; }
.tbh-tile-main { grid-column: span 3; grid-row: span 3; }
.tbh-tile-prev { grid-column: span 2; grid-row: span 2; }
.tbh-tile-inspectable { cursor: help; }
.tbh-tile:hover { background: color-mix(in srgb, var(--role) 18%, transparent); }
.tbh-row-time { flex: none; font-size: 10px; color: #8d7c5c; font-variant-numeric: tabular-nums; }
.tbh-opt-arrow { font-size: 14px; min-width: 1.2em; }
.tbh-row-inspectable { cursor: help; }
.tbh-row-inspectable:hover { background: rgba(255,255,255,.05); outline: 1px solid color-mix(in srgb, var(--role) 55%, transparent); }
.tbh-cursor { font-style: normal; font-weight: 400; color: var(--role); animation: tbh-blink 1s steps(1) infinite; }
@keyframes tbh-blink { 50% { opacity: 0; } }
`;
