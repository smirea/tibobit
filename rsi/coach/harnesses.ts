import os from "node:os";
import path from "node:path";
/** What one event line adds to the coach's reasoning or reply, or the error it reports. */
import { mkdtempSync, rmSync } from "node:fs";

type Delta = { thought?: string; text?: string; error?: string };

// Claude Code and Cursor end with a result event, which carries the error when the call failed.
const resultError = (e: Record<string, unknown>): Delta => (e.type === "result" && e.is_error === true ? { error: str(e.result) ?? JSON.stringify(e).slice(0, 500) } : {});

type Harness = {
  /** The model when none is named; undefined leaves it to the harness's own setting. */
  model?: string;
  /** The command line; the prompt goes on stdin unless `argv` puts it in the command. `effort` is a reasoning effort only Claude Code takes. */
  command: (model: string | undefined, prompt: string, effort?: string) => string[];
  argv?: boolean;
  read: (event: Record<string, unknown>) => Delta;
};

const str = (v: unknown) => (typeof v === "string" ? v : undefined);

const content = (e: Record<string, unknown>) => ((e.message as { content?: unknown } | undefined)?.content ?? []) as { type?: string; text?: unknown; thinking?: unknown }[];

const HARNESSES = {
  grok: {
    model: "grok-4.7-build-fast",
    argv: true,
    command: (m, prompt) => ["grok", "-p", prompt, ...(m === undefined ? [] : ["-m", m]), "--output-format", "streaming-json"],
    read: (e) => (e.type === "thought" ? { thought: str(e.data) } : e.type === "text" ? { text: str(e.data) } : {}),
  },
  // No settings sources: the person's hooks and plugins would otherwise talk to the coach.
  claude: {
    model: "opus",
    command: (m, _, effort) => ["claude", "-p", "--setting-sources", "", "--strict-mcp-config", "--tools", "", "--output-format", "stream-json", "--verbose", ...(m === undefined ? [] : ["--model", m]), ...(effort === undefined ? [] : ["--effort", effort])],
    read: (e) =>
      e.type !== "assistant"
        ? resultError(e)
        : {
            thought: content(e).map((c) => str(c.thinking) ?? "").join("") || undefined,
            text: content(e).map((c) => (c.type === "text" ? (str(c.text) ?? "") : "")).join("") || undefined,
          },
  },
  codex: {
    command: (m) => ["codex", "exec", "--json", "--skip-git-repo-check", "-s", "read-only", ...(m === undefined ? [] : ["-m", m]), "-"],
    read: (e) => {
      const item = (e.item ?? {}) as { type?: string; text?: unknown; message?: unknown };
      if (e.type === "error" || e.type === "turn.failed") return { error: str(e.message) ?? JSON.stringify(e).slice(0, 500) };
      if (e.type !== "item.completed") return {};
      return item.type === "agent_message" ? { text: str(item.text) } : item.type === "reasoning" ? { thought: str(item.text) } : {};
    },
  },
  // opencode's own default model never answered a scripted run, so this one names a model.
  opencode: {
    model: "opencode/deepseek-v4.1-flash-free",
    argv: true,
    command: (m, prompt) => ["opencode", "run", "--format", "json", ...(m === undefined ? [] : ["-m", m]), prompt],
    read: (e) => {
      const part = (e.part ?? {}) as { text?: unknown };
      return e.type === "text" ? { text: str(part.text) } : e.type === "reasoning" ? { thought: str(part.text) } : {};
    },
  },
  // A prompt this size as an argument comes back empty; on stdin it works. --trust answers the
  // workspace prompt for the empty folder the coach runs in, and ask mode is read-only.
  cursor: {
    model: "composer-2.5",
    command: (m) => ["cursor-agent", "-p", "--trust", "--mode", "ask", "--output-format", "stream-json", ...(m === undefined ? [] : ["--model", m])],
    read: (e) =>
      e.type === "assistant"
        ? { text: content(e).map((c) => str(c.text) ?? "").join("") || undefined }
        : e.type === "thinking" && e.subtype === "delta"
          ? { thought: str(e.text) }
          : resultError(e),
  },
} satisfies Record<string, Harness>;

export type HarnessName = keyof typeof HARNESSES;

const isHarness = (name: string): name is HarnessName => name in HARNESSES;

/** Throws at startup when the harness is unknown or its CLI is not installed. */
export function checkHarness(name: string): HarnessName {
  if (!isHarness(name)) throw new Error(`unknown coach harness ${name}; use one of ${Object.keys(HARNESSES).join(", ")}`);
  const bin = (HARNESSES[name] as Harness).command(undefined, "")[0] ?? name;
  if (Bun.which(bin) === null) throw new Error(`the ${name} coach needs ${bin} on PATH`);
  return name;
}

type Stream = { reasoning: string; text: string };

/** What came back besides the reply: errors the harness reported, and the tail of what it printed that was not an event. */
type Said = Stream & { timedOut: boolean; error: string; stderr: string };

// A bot stopped mid-review exits at once; the coach it was waiting on must not keep running alone.
const running = new Set<ReturnType<typeof Bun.spawn>>();
process.on("exit", () => {
  for (const proc of running) proc.kill();
});

/**
 * Runs the harness once and returns everything it said. Stops it after `timeoutMs`; `timedOut`
 * says whether it did.
 */
export async function runCoach(name: HarnessName, model: string | undefined, prompt: string, timeoutMs: number, effort?: string): Promise<Said> {
  const h: Harness = HARNESSES[name];
  const cwd = mkdtempSync(path.join(os.tmpdir(), "tibo-coach-"));
  const proc = Bun.spawn(h.command(model ?? h.model, prompt, effort), { cwd, stdin: h.argv ? "ignore" : new Blob([prompt]), stdout: "pipe", stderr: "pipe" });
  running.add(proc);
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    proc.kill();
  }, timeoutMs);
  const out: Stream = { reasoning: "", text: "" };
  let error = "";
  let other = "";
  try {
    const decoder = new TextDecoder();
    let buffer = "";
    for await (const chunk of proc.stdout) {
      buffer += decoder.decode(chunk, { stream: true });
      for (let nl = buffer.indexOf("\n"); nl >= 0; nl = buffer.indexOf("\n")) {
        const line = buffer.slice(0, nl).trim();
        buffer = buffer.slice(nl + 1);
        if (!line.startsWith("{")) {
          if (line !== "") other = `${other}\n${line}`.slice(-2000);
          continue;
        }
        try {
          const d = h.read(JSON.parse(line) as Record<string, unknown>);
          out.reasoning += d.thought ?? "";
          out.text += d.text ?? "";
          if (d.error !== undefined) error = `${error} ${d.error}`.trim();
        } catch {}
      }
    }
    const stderr = (await new Response(proc.stderr).text()).trim();
    return { ...out, timedOut, error, stderr: [other.trim(), stderr.slice(-2000), `exit ${await proc.exited}`].filter(Boolean).join("\n") };
  } finally {
    running.delete(proc);
    clearTimeout(timer);
    rmSync(cwd, { recursive: true, force: true });
  }
}
