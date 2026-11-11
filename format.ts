export const clock = (seconds: number, sep = ":") => `${String(Math.floor(seconds / 60)).padStart(2, "0")}${sep}${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
