"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";

const models = [
  {
    name: "iPhone 13 Pro Max",
    from: "от 42 000 ₽",
    note: "зависит от памяти и батареи",
  },
  {
    name: "iPhone 14 Pro Max",
    from: "от 52 000 ₽",
    note: "аккуратный корпус — выше цена",
  },
  {
    name: "iPhone 15 Pro Max",
    from: "от 72 000 ₽",
    note: "титан, состояние экрана",
  },
  {
    name: "iPhone 16 Pro Max",
    from: "от 88 000 ₽",
    note: "актуальная линейка",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-8 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-accent md:text-4xl">
            Ориентиры по выкупу
          </h2>
          <p className="mt-3 text-accent-muted md:text-lg">
            Финальную сумму озвучим после осмотра устройства
          </p>
        </motion.div>
        <motion.ul
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {models.map((item) => (
            <motion.li
              key={item.name}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-glass backdrop-blur-xl transition hover:border-white/15 hover:bg-white/[0.09]"
            >
              <div
                className="pointer-events-none absolute inset-0 bg-card-shine opacity-60"
                aria-hidden
              />
              <div className="relative">
                <p className="text-sm font-medium text-accent-muted">
                  Pro Max
                </p>
                <h3 className="mt-2 text-lg font-semibold leading-snug text-accent">
                  {item.name}
                </h3>
                <p className="mt-6 text-2xl font-semibold tracking-tight text-accent">
                  {item.from}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-accent-muted">
                  {item.note}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
