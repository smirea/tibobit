import type { CheckpointMeta, Command } from "../protocol/commands";
import type { Encyclopedia } from "../protocol/snapshot";
import type { Settled, State } from "../protocol/view";

/** No answer from the agent server at all; the message is the network's own, such as ECONNREFUSED. */
export class Unreachable extends Error {}

/** The agent server's HTTP API, for a program that drives a game through it. */
export class AgentServer {
  /** A request that cannot reach the server tries again every 2 seconds, `retries` times: a bot rides out a restarting server. */
  constructor(
    readonly origin: string,
    private retries = 0,
  ) {}

  /** A call that fails throws with the server's own error message. */
  async request<T>(route: string, body?: unknown): Promise<T> {
    const init = body === undefined ? undefined : { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) };
    let res: Response | undefined;
    for (let attempt = 0; res === undefined; attempt++) {
      try {
        res = await fetch(`${this.origin}${route}`, init);
      } catch (e) {
        if (attempt >= this.retries) throw new Unreachable(e instanceof Error ? e.message : String(e));
        await Bun.sleep(2000);
      }
    }
    const json = (await res.json()) as T & { error?: string };
    if (!res.ok) throw new Error(json.error ?? `${route}: ${res.status}`);
    return json;
  }

  /** The live view, with the game's own state paths `raw` names (comma-separated, such as "run,storage"). */
  state(raw = ""): Promise<State> {
    return this.request(raw === "" ? "/state" : `/state?raw=${encodeURIComponent(raw)}`);
  }

  /** Sends a command without waiting for it to finish, such as a move held until the next one. */
  send(command: Command): Promise<{ id: number }> {
    return this.request("/command", command);
  }

  /** Sends a command and waits until it is over, or `seconds` have passed and it still runs. */
  run(command: Command, seconds = 120): Promise<Settled> {
    return this.request(`/command?wait=1&timeout=${seconds}`, command);
  }

  encyclopedia(): Promise<Encyclopedia> {
    return this.request("/encyclopedia");
  }

  checkpoints(): Promise<CheckpointMeta[]> {
    return this.request("/checkpoints");
  }
}
