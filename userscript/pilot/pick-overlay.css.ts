export const css = `
.tbh-pick-layer { position: fixed; inset: 0; z-index: 2147483001; pointer-events: none; font: 800 12px/1.3 ui-monospace, Menlo, Consolas, monospace; }
.tbh-pick-layer[hidden], .tbh-pick-layer [hidden] { display: none; }
.tbh-pick-banner { position: fixed; transform: translate(-50%, -100%); box-sizing: border-box; padding: 5px 12px; text-align: center; color: #f3e6c4; background: rgba(42,33,64,.95); border: 1px solid #c9a0ff; border-radius: 6px; box-shadow: 0 4px 14px rgba(0,0,0,.5); }
.tbh-pick-bar { position: fixed; display: flex; align-items: center; gap: 6px; box-sizing: border-box; padding: 0 2px; transition: opacity .3s; }
.tbh-pick-track { flex: 1; height: 7px; border-radius: 4px; background: rgba(0,0,0,.55); box-shadow: 0 0 0 1px rgba(255,255,255,.15); overflow: hidden; }
.tbh-pick-track > i { display: block; height: 100%; background: #7fa8ff; }
.tbh-pick-pct { color: #fff; text-shadow: 0 1px 2px #000; }
.tbh-pick-tag { padding: 0 4px; border-radius: 3px; font-size: 9.5px; letter-spacing: .06em; text-transform: uppercase; color: #fff; background: #c4473a; }
.tbh-pick-banish .tbh-pick-track > i { background: #ff7a6b; }
.tbh-pick-dim { opacity: .35; }
.tbh-pick-frame { position: fixed; box-sizing: border-box; border: 3px solid transparent; border-radius: 10px; transition: border-color .08s, box-shadow .08s; }
.tbh-pick-on { border-color: #ffd36b; box-shadow: 0 0 14px rgba(255,211,107,.7); }
.tbh-pick-final { border-color: #ffd36b; box-shadow: 0 0 26px 4px rgba(255,211,107,.9); animation: tbh-pick-pulse .7s ease-in-out infinite alternate; }
.tbh-pick-frame-banish.tbh-pick-on, .tbh-pick-frame-banish.tbh-pick-final { border-color: #ff7a6b; box-shadow: 0 0 22px 3px rgba(255,122,107,.85); }
@keyframes tbh-pick-pulse { to { box-shadow: 0 0 10px 1px rgba(255,211,107,.5); } }
/* The game's own hand photo, placed by its fingertip; once there it presses the pick the way the menu's hand presses reset. */
.tbh-pick-hand { position: fixed; filter: drop-shadow(0 6px 10px rgba(0,0,0,.55)); transform-origin: 83% 99%; }
.tbh-pick-pressing { animation: tbh-pick-press .55s ease-in-out infinite; }
@keyframes tbh-pick-press { 0%, 100% { transform: translateY(-6px); } 45% { transform: translateY(3px) scale(.97); } 60% { transform: translateY(3px) scale(.97); } }
@media (prefers-reduced-motion: reduce) { .tbh-pick-final, .tbh-pick-pressing { animation: none; } }
`;
