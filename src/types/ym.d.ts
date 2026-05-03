/** Яндекс.Метрика: tag.js кладёт `ym` в window */
interface Window {
  ym?: (
    id: number,
    method: "init" | "reachGoal" | "hit" | string,
    ...args: unknown[]
  ) => void;
}
