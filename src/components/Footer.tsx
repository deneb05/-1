import { CITY_NOMINATIVE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 text-center text-sm text-accent-muted sm:text-left">
        <p className="max-w-3xl leading-relaxed">
          Работаем по всему городу {CITY_NOMINATIVE} и ближайшим районам.
          Выкуп айфонов и скупка Apple — выезд и встреча по договорённости.
        </p>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>Выкуп iPhone · сделка за 15 минут</p>
          <p className="text-accent-muted/80">
            Не является публичной офертой. Цены ориентировочные.
          </p>
        </div>
      </div>
    </footer>
  );
}
