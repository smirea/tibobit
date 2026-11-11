// What the machine builder is told: how the bot runs a state machine, everything a guard can read
// with a real tick of it, every action, the reply's exact shape, and one request worked through.
import { ACTIONS, EXAMPLE_MACHINE, EXAMPLE_REQUEST, FAR, FIELDS, type MachineInput, MAX_STATES, SPOT_FIELD, WAYS } from "../protocol/machine";
import type { SpotKind } from "../bot/machine-input";
import { GIVE_UP_SECONDS } from "../bot/limits";
import EXAMPLE from "../protocol/state.example.json";

/** The input as JSON a person can scan: one line per group, one line per kind of spot. */
function inputJson(input: MachineInput): string {
  const lines = Object.entries(input).map(([key, value]) => {
    if (key !== "spot") return `  ${JSON.stringify(key)}: ${JSON.stringify(value)}`;
    const kinds = Object.entries(value as MachineInput["spot"]).map(([kind, near]) => `    ${JSON.stringify(kind)}: ${JSON.stringify(near)}`);
    return `  "spot": {\n${kinds.join(",\n")}\n  }`;
  });
  return `{\n${lines.join(",\n")}\n}`;
}

const table = (rows: [string, string][]) => rows.map(([name, about]) => `- \`${name}\`: ${about}`).join("\n");

function spotSection(kinds: readonly SpotKind[] | undefined): string {
  if (kinds === undefined)
    return "The game has not sent its kinds of spot yet, because no run has started in the tab. Use `spots.count` and `spots.dist`, and a spot action without `kind`. Do not name a kind.";
  return `The kinds, by the game's own key, with the name the person sees in the game and what the game says the spot does. The person will use the names; your machine uses the keys.\n\n${table(kinds.map((k) => [k.kind, `${k.name}${k.about === "" ? "" : `. ${k.about.replace(/\s+/g, " ").trim()}`}`]))}`;
}

export function builderPrompt(request: string, kinds: readonly SpotKind[] | undefined): string {
  return `You write the state machine that plays the game tibo.dog for a person. Their request is at the end. Your reply is the machine as one JSON object and nothing else.

## The game

Tibo is a potato hero in a survivors game. Its weapons fire on their own. A player decides only where Tibo walks and when it dashes. Enemies arrive in crowds that grow over the run, with elites and bosses on a schedule. Dead enemies drop xp. Xp levels Tibo up, and each level offers upgrade cards. Someone else picks the cards, so the machine never deals with them. A chest on the ground gives a free pick, and evolves a weapon whose recipe is complete. Food heals. A magnet pickup pulls in all the xp lying on the ground. Spots are places on the map that do something once Tibo has stood inside them for a few seconds. A run is won by living 1200 seconds, and it goes on after that until Tibo dies.

## How the bot runs your machine

The machine is an XState v5 machine config, restricted to what is plain JSON. It is flat: a set of states, one of them active at a time.

Every state names one autopilot action in \`meta.action\`. While the state is active the autopilot keeps carrying that action out. The autopilot also dodges on its own: at every step it takes the move nearest the way to its target that the game's own forecast says is no costlier than the safest move. So the machine decides what Tibo goes after, never how it steps around danger.

About three times a second the bot sends the machine one event, \`tick\`, which carries the input described below. The active state's \`on.tick\` transitions are tried in the order written, and the first whose guard is true is taken. A transition without a guard is always taken. One tick takes at most one transition. When none holds, the machine stays where it is. Entering a state sets \`stateSeconds\` back to 0.

Two facts shape a good machine:

- An action with nothing to go after leaves Tibo standing still, stepping aside only to avoid damage. A \`chest\` state with no chest on the map is an example. Give every state that walks to something a transition out for when that thing is gone, such as \`chests.count == 0\`.
- Tibo gives up on a target it cannot finish: one it did not reach in time, or a spot it cannot pay for. It passes that target over for ${GIVE_UP_SECONDS} seconds, but the input still counts it. So also leave such a state after a while, with \`stateSeconds > 20\` or similar, or the machine can wait there forever.

## The input

Every guard reads the input of the tick. All of it is numbers.

${table(Object.entries(FIELDS))}
- \`${SPOT_FIELD.path}\`: ${SPOT_FIELD.about}

### Kinds of spot

${spotSection(kinds)}

### One tick's input, from a real run

\`\`\`json
${inputJson(EXAMPLE.input)}
\`\`\`

A distance of ${FAR} means there is none of that thing.

## Guards

A guard is a string holding one expression over the input. It may use:

- paths from the list above, written as in the list, such as \`health.pct\` or \`spot.chargeShrine.dist\`
- numbers, \`true\` and \`false\`
- comparisons: \`<\`, \`<=\`, \`>\`, \`>=\`, \`==\`, \`!=\`
- arithmetic: \`+\`, \`-\`, \`*\`, \`/\`
- \`&&\`, \`||\`, \`!\` and parentheses

Nothing else exists: no function calls, no strings, no ternaries, no paths that are not in the list. A guard that reads anything else is refused.

## Actions

\`meta.action\` is one of these objects, exactly as written, with no other keys:

${Object.values(ACTIONS).map((a) => `- \`${a.form}\`: ${a.about}`).join("\n")}

\`dir\` is one of: ${WAYS.join(", ")}. \`fewestEnemies\` and \`mostEnemies\` mean the direction with the fewest or the most enemies on screen at the moment the action begins.

There is no action for fighting ordinary enemies: Tibo's weapons do that wherever it stands. To farm, walk where the enemies are thin enough to survive. To get away, explore or dash toward \`fewestEnemies\`.

## Your reply

Reply with one JSON object. No words before or after it, no code fence, no comments. It has exactly this shape:

\`\`\`json
{
  "id": "a short name for the machine",
  "description": "one sentence on the strategy",
  "initial": "the name of the state the run starts in",
  "states": {
    "stateName": {
      "description": "one short sentence on what Tibo does here",
      "meta": { "action": { "type": "..." } },
      "on": {
        "tick": [
          { "target": "otherState", "guard": "an expression", "description": "a few words on why" }
        ]
      }
    }
  }
}
\`\`\`

The rules, each of which the bot checks before it plays the machine:

1. Use only the keys shown. \`always\`, \`after\`, \`entry\`, \`exit\`, \`invoke\`, \`context\`, \`type\`, nested \`states\` and every other XState feature are refused, because this bot does not run them.
2. A state's name is letters, digits and underscores, starting with a letter. Name it for what Tibo does there: \`farm\`, \`openChest\`, \`fleeBoss\`.
3. At most ${MAX_STATES} states. Prefer the fewest that carry out the request.
4. Every \`target\` names another state. A transition to its own state is refused.
5. Every state must be reachable from \`initial\`.
6. \`on\` may be left out only for a state the machine is meant to stay in for the rest of the run.

What makes a machine play well:

- Order transitions by urgency. Survival comes first, so put the transitions that save Tibo at the top of every state where they apply.
- Leave a gap between the guard that enters a state and the guard that leaves it, or the machine flips back and forth every tick. Enter a retreat under 40% health and leave it over 70%, not over 40%.
- Follow the request. Where it leaves something open, choose what keeps Tibo alive, and say what you chose in the descriptions.
- Write each description for the person watching the machine run: what Tibo does, or why the transition fires, in plain words.

The request may name input fields as \`{{path}}\`, such as \`{{health.pct}}\`. The person picked those from the list of the input, so use those paths for what they describe.

## A worked example

The request:

${EXAMPLE_REQUEST}

The reply:

${JSON.stringify(EXAMPLE_MACHINE, null, 2)}

## The request

${request.trim()}`;
}

/** The prompt again, with the reply that was refused and why, for another try. */
export function retryPrompt(prompt: string, reply: string, problems: readonly string[]): string {
  return `${prompt}

## Your last reply was refused

You replied:

${reply.trim().slice(0, 12_000)}

The bot refused it because:

${problems.map((p) => `- ${p}`).join("\n")}

Reply with the whole machine again, corrected, as one JSON object and nothing else.`;
}
