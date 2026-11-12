// What the builder is told: how the bot runs the function, the types it is written against, the
// game's kinds of place, a real call's state, how to write it, and one request worked through.
import type { Book } from "../game/book";
import { EXAMPLE_CODE, EXAMPLE_REQUEST } from "../protocol/drive";
import type { State } from "../protocol/driver";
import EXAMPLE from "../protocol/state.example.json";
import { DRIVER_TYPES } from "./code-check";

/** The state as JSON a person can scan: one line per field, one line per thing in a list. */
function stateJson(state: State): string {
  const lines = Object.entries(state).map(([key, value]) => {
    if (!Array.isArray(value) || value.length === 0) return `  ${JSON.stringify(key)}: ${JSON.stringify(value)}`;
    return `  ${JSON.stringify(key)}: [\n${value.map((x) => `    ${JSON.stringify(x)}`).join(",\n")}\n  ]`;
  });
  return `{\n${lines.join(",\n")}\n}`;
}

/** Every kind of point of interest the game has, as `kind: name. what the game says it does`. */
function poiLines(book: Book | undefined): string {
  if (book === undefined) return "The tab has not sent the game's kinds yet. Match a point of interest by its `name`, which the request will use.";
  const lines: string[] = [];
  for (const [key, text] of book.text) {
    const [section, id] = key.split(":");
    // The game's `varietyPlace` kind stands for every variety place; each one is listed by its own id, spelled as the game does.
    if ((section !== "poi" && section !== "varietyPlace") || id === undefined || key === "poi:varietyPlace") continue;
    lines.push(`- \`${id.replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase())}\`: ${text.name ?? id}. ${(text.desc ?? "").replace(/\s+/g, " ").trim()}`);
  }
  return lines.sort().join("\n");
}

export function builderPrompt(request: string, book: Book | undefined): string {
  return `You write the TypeScript function that plays the game tibo.dog for a person. Their request is at the end. Your reply is the function's source and nothing else.

## The game

Tibo is a potato hero in a survivors game. Its weapons fire on their own. A player decides only where Tibo walks and when it dashes. Enemies arrive in crowds that grow over the run, with elites and bosses on a schedule. Dead enemies drop xp. Xp levels Tibo up, and each level offers upgrade cards. Someone else picks the cards, so the function never deals with them. A chest on the ground gives picks, and evolves a weapon whose recipe is complete. Food heals. A magnet pulls in all the xp lying on the ground. Points of interest are places on the map that do something once Tibo has stood inside them for a few seconds. A run is won by living to \`state.winAt\` seconds, and it goes on after that until Tibo dies.

## How the bot runs your function

The bot calls \`drive(state)\` four times a second, each time with the whole state of the game at that moment. The function returns one action, and the autopilot carries it out until the next call. The autopilot also dodges on its own: at every step it takes the move nearest the way to its target that the game's own forecast says is no costlier than the safest move. So the function decides what Tibo goes after, never how it steps around danger.

- Nothing survives between calls. The one thing the function gets back is \`state.previous\`: the action it returned last time, with its \`why\`, and for how many seconds it has returned that same action. Use it when a decision has to hold for a while, such as retreating until health is back.
- Returning the same action call after call keeps Tibo on it. Returning another drops the one under way at once.
- Every list in the state is nearest first, so \`find\` gives the nearest match.
- \`gaveUp\` marks a target Tibo could not finish in the last 45 seconds: one it did not reach in time, or a point of interest it cannot pay for. Skip those, or Tibo keeps trying.
- An action that names an id the state does not hold leaves Tibo standing still.

## The types

The function is compiled against exactly these. Their comments say what each field holds.

\`\`\`ts
${DRIVER_TYPES.trim()}
\`\`\`

## The game's kinds of point of interest

By the game's own kind, which is \`Poi.kind\`, then the name the person sees in the game, which is \`Poi.name\`, and what the game says the place does. The person will use the names; match on the kind.

${poiLines(book)}

## One call's state, from a real run

\`\`\`json
${stateJson(EXAMPLE.state as State)}
\`\`\`

## How to write it

The reply is type-checked by the TypeScript compiler in strict mode before anything runs it, and a reply it refuses comes back to you with the compiler's errors.

1. Write exactly one function, \`function drive(state: State): Action\`. Nothing else at the top level: no imports, no exports, no other functions, no types.
2. Every path must return an action. End the function with a return that needs no condition, for when nothing else applies. The compiler refuses a function that can fall off its end.
3. Write simple branching: a few \`const\`s for what the conditions read, then \`if\` statements with early returns, the most urgent first. Survival comes before everything else.
4. Use array methods such as \`find\`, \`filter\`, \`some\` and \`every\`. Loops (\`for\`, \`while\`, \`do\`), \`class\`, \`new\`, \`this\`, \`async\`, \`await\`, \`eval\` and anything outside the state (\`fetch\`, \`Date\`, \`Math.random\`, globals) are refused or pointless: the function must give the same answer for the same state.
5. No \`any\`, no casts, no \`!\` assertions. Narrow with \`if\` instead.
6. Keep the code plain and minimal: two-space indent, \`const\` only, no comments, no blank-line padding beyond one line between groups of branches, no helper abstractions. A person should read it top to bottom in a minute.
7. Give every returned action a \`why\` of a few plain words. The person watching sees it, and it is how \`state.previous\` tells one decision from another.
8. Leave a gap between the condition that starts something and the one that ends it, or Tibo flips back and forth four times a second. Start a retreat under 40% health and end it over 70%, by checking \`state.previous\`.
9. Follow the request. Where it leaves something open, choose what keeps Tibo alive.

Reply with the function only: no code fence, no words before or after it.

## A worked example

The request:

${EXAMPLE_REQUEST}

The reply:

${EXAMPLE_CODE}

## The request

${request.trim()}`;
}

/** The prompt again, with the reply that was refused and why, for another try. */
export function retryPrompt(prompt: string, reply: string, problems: readonly string[]): string {
  return `${prompt}

## Your last reply was refused

You replied:

${reply.trim().slice(0, 12_000)}

The type check refused it. Line numbers count from the line \`function drive\` is on:

${problems.map((p) => `- ${p}`).join("\n")}

Reply with the whole function again, corrected, and nothing else.`;
}
