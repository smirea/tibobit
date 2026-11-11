export const BRIDGE_PORT = 7357;
/** Every program here listens on this machine only. */
export const localOrigin = (port: number) => `http://127.0.0.1:${port}`;
export const BRIDGE_ORIGIN = localOrigin(BRIDGE_PORT);

export function validPort(port: number): boolean {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
}

/** Where a headless game serves its own API (reload, screenshot, eval) unless told another port. */
export const HEADLESS_PORT = 7358;

/** The page global a headless game sets to point its page at an agent server other than the saved one, so several games can run side by side. */
export const BRIDGE_ORIGIN_GLOBAL = "__tiboBridgeOrigin";
