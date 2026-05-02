/** Нормализует российский номер в формат +7XXXXXXXXXX или возвращает null. */
export function normalizeRussianPhone(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 0) return null;

  let n = digits;
  if (n.startsWith("8") && n.length === 11) {
    n = "7" + n.slice(1);
  }
  if (n.length === 10 && !n.startsWith("7")) {
    n = "7" + n;
  }
  if (n.startsWith("7") && n.length === 11) {
    return `+${n}`;
  }
  return null;
}

export function isValidRussianPhone(raw: string): boolean {
  return normalizeRussianPhone(raw) !== null;
}
