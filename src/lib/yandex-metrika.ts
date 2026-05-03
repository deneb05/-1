/** Достижение JS-цели «LEAD» после успешной отправки заявки */
export function reachLeadGoal() {
  const idStr = process.env.NEXT_PUBLIC_YM_ID?.trim() || "00000000";
  const id = Number.parseInt(idStr, 10);
  if (!Number.isFinite(id) || id <= 0 || idStr === "00000000") return;
  if (typeof window === "undefined" || typeof window.ym !== "function") return;
  window.ym(id, "reachGoal", "LEAD");
}
