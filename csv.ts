export const csvField = (v: string) => {
  const flat = v.replace(/\s+/g, " ").trim();
  return /[",]/.test(flat) ? `"${flat.replace(/"/g, '""')}"` : flat;
};
