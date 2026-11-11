/** Set once the loop was told to stop: what is under way is cut short, and nothing new starts. */
export let stopping = false;

export function beginStop() {
  stopping = true;
}
