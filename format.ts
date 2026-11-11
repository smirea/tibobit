/** A game time as m:ss, such as 5:07. */
export const clock = (seconds: number) => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;

/** A game time as mm:ss, the same width whatever the time, for names that sort; `sep` takes the colon's place in a file name. */
export const clockPadded = (seconds: number, sep = ":") => `${String(Math.floor(seconds / 60)).padStart(2, "0")}${sep}${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
