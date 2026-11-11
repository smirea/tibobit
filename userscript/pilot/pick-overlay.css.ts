export const css = `
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
/* Positioned by its tip end: above a card pointing down, or left of it pointing right. */
.tbh-pick-arrow { position: fixed; width: 48px; height: 48px; transform: translate(-100%, -50%); color: #ffd36b; filter: drop-shadow(0 0 6px rgba(255,211,107,.8)) drop-shadow(0 2px 2px rgba(0,0,0,.8)); }
.tbh-pick-arrow.tbh-pick-arrow-down { transform: translate(-50%, -100%); }
.tbh-pick-arrow-icon { display: block; width: 100%; height: 100%; fill: none; stroke: currentColor; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; }
.tbh-pick-arrived .tbh-pick-arrow-icon { animation: tbh-pick-bob-x .45s ease-in-out infinite alternate; }
.tbh-pick-arrived.tbh-pick-arrow-down .tbh-pick-arrow-icon { animation-name: tbh-pick-bob-y; }
@keyframes tbh-pick-bob-x { to { transform: translateX(-8px); } }
@keyframes tbh-pick-bob-y { to { transform: translateY(-8px); } }
@media (prefers-reduced-motion: reduce) { .tbh-pick-final, .tbh-pick-arrived .tbh-pick-arrow-icon { animation: none; } }
`;
