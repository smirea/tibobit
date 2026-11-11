export const BRIDGE_PORT = 7357;
export const bridgeOrigin = (port: number) => `http://127.0.0.1:${port}`;
export const BRIDGE_ORIGIN = bridgeOrigin(BRIDGE_PORT);

export function validPort(port: number): boolean {
  return Number.isInteger(port) && port >= 1 && port <= 65535;
}

/** Where a headless game serves its own API (reload, screenshot, eval) unless told another port. */
export const HEADLESS_PORT = 7358;
export const headlessOrigin = (port: number) => `http://127.0.0.1:${port}`;
