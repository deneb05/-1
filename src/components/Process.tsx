"use client";

import { motion } from "framer-motion";
import { Banknote, CalendarCheck, Sparkles } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
const steps = [
  {
    icon: Sparkles,
    title: "Оценка",
    text: "Онлайн или в сообщении — быстро называем вилку цены",
  },
  {
    icon: CalendarCheck,
    title: "Встреча",
    text: "Удобное место и время — проверяем iPhone за несколько минут",
  },
  {
    icon: Banknote,
    title: "Деньги",
    text: "Наличные или перевод на карту — сразу после сделки",
  },
];

export function Process() {
  return (
    <section className="border-y border-white/[0.06] bg-surface-elevated/50 px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-accent md:text-4xl">
            Как мы выкупаем iPhone
          </h2>
          <p className="mt-3 text-accent-muted md:text-lg">
            Три шага: от заявки до денег — без лишней бюрократии, встреча там, где
            удобно
          </p>
        </motion.div>
        <motion.ol
          className="grid gap-8 md:grid-cols-3 md:gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center"
            >
              <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-accent shadow-inner backdrop-blur-sm">
                <step.icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-muted">
                Шаг {index + 1}
              </span>
              <h3 className="text-xl font-semibold text-accent">{step.title}</h3>
              <p className="mt-3 max-w-sm text-pretty text-sm leading-relaxed text-accent-muted">
                {step.text}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
