/** Локальное SEO: город обслуживания */
export const CITY_NOMINATIVE = "Дагестанские Огни";
export const CITY_LOCATIVE = "Дагестанских Огнях";

export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

export const SEO_KEYWORDS = [
  "выкуп айфонов дагестанские огни",
  "продать айфон дагестанские огни",
  "скупка apple дагестанские огни",
  "выкуп iPhone Дагестанские Огни",
  "скупка iPhone Pro Max",
  "продать Apple Дагестанские Огни",
];
