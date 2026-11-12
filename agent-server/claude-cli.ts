import os from "node:os";
import path from "node:path";
import { mkdtempSync, rmSync } from "node:fs";

// No settings sources and no tools: the person's hooks, plugins and MCP servers would otherwise take part.
const command = (model: string) => ["claude", "-p", "--setting-sources", "", "--strict-mcp-config", "--tools", "", "--output-format", "stream-json", "--verbose", "--model", model];

/** Throws at startup when the claude CLI is not installed. */
export function checkClaude() {
  if (Bun.which("claude") === null) throw new Error("writing Full Self Driving's function needs the claude CLI on PATH");
}

type Said = { text: string; timedOut: boolean; error: string; stderr: string };

const running = new Set<ReturnType<typeof Bun.spawn>>();
process.on("exit", () => {
  for (const proc of running) proc.kill();
});

type Content = { type?: string; text?: unknown }[];

/** Asks the claude CLI once, in an empty folder, and stops it after `timeoutMs`. */
export async function askClaude(model: string, prompt: string, timeoutMs: number): Promise<Said> {
  const cwd = mkdtempSync(path.join(os.tmpdir(), "tibo-claude-"));
  const proc = Bun.spawn(command(model), { cwd, stdin: new Blob([prompt]), stdout: "pipe", stderr: "pipe" });
  running.add(proc);
  let timedOut = false;
  const timer = setTimeout(() => {
    timedOut = true;
    proc.kill();
  }, timeoutMs);
  let text = "";
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
        const e = JSON.parse(line) as Record<string, unknown>;
        if (e.type === "assistant") text += ((e.message as { content?: Content } | undefined)?.content ?? []).map((c) => (c.type === "text" && typeof c.text === "string" ? c.text : "")).join("");
        if (e.type === "result" && e.is_error === true) error = `${error} ${typeof e.result === "string" ? e.result : JSON.stringify(e).slice(0, 500)}`.trim();
      }
    }
    const stderr = (await new Response(proc.stderr).text()).trim();
    return { text, timedOut, error, stderr: [other.trim(), stderr.slice(-2000), `exit ${await proc.exited}`].filter(Boolean).join("\n") };
  } finally {
    running.delete(proc);
    clearTimeout(timer);
    rmSync(cwd, { recursive: true, force: true });
  }
}
