"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp } from "@/lib/motion";
import { CITY_LOCATIVE } from "@/lib/site";

export function Hero() {
  const scrollToPricing = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center px-5 pt-24 pb-16 md:px-8 md:pt-20">
      <div
        className="pointer-events-none absolute inset-0 bg-hero-radial"
        aria-hidden
      />
      <div className="mx-auto w-full max-w-4xl text-center">
        {/* Без motion + без opacity-анимации — иначе WebKit может не показать img после hydrate */}
        <div className="mb-10 flex min-h-0 justify-center px-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/seo/hero-dagestan-ogni.svg"
            alt="Выкуп iPhone 15 Pro Max и других моделей Apple в Дагестанских Огнях — скупка техники и быстрая оценка"
            width={1200}
            height={520}
            decoding="async"
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 48rem"
            className="hero-illustration mx-auto block h-auto w-full max-w-3xl rounded-3xl border border-white/10 shadow-glass"
          />
        </div>
        <motion.p
          className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent-muted"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.06 }}
        >
          Скупка Apple в {CITY_LOCATIVE}
        </motion.p>
        <motion.h1
          className="text-[clamp(2rem,6vw,3.75rem)] font-semibold leading-[1.08] tracking-tight text-accent"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.08 }}
        >
          Выкупим ваш iPhone за 15 минут в Дагестанских Огнях
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-accent-muted md:text-xl"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.16 }}
        >
          Платим до 95% от рыночной стоимости в {CITY_LOCATIVE}. Деньги сразу на
          руки или карту
        </motion.p>
        <motion.div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ delay: 0.24 }}
        >
          <button
            type="button"
            onClick={() =>
              document.getElementById("lead-form")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="group relative w-full max-w-xs overflow-hidden rounded-full bg-accent px-8 py-4 text-base font-semibold text-surface transition hover:bg-white sm:w-auto"
          >
            <span className="relative z-10">Узнать стоимость</span>
          </button>
          <button
            type="button"
            onClick={scrollToPricing}
            className="flex items-center justify-center gap-2 text-sm font-medium text-accent-muted transition hover:text-accent"
          >
            Смотреть ориентиры по ценам
            <ChevronDown className="h-4 w-4" aria-hidden />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
