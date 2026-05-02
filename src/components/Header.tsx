"use client";

import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-surface/75 backdrop-blur-xl"
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:h-16 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-accent"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
            <Smartphone className="h-4 w-4" aria-hidden />
          </span>
          Скупка iPhone
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <a
            href="#pricing"
            className="hidden text-accent-muted transition hover:text-accent sm:inline"
          >
            Цены
          </a>
          <a
            href="#lead-form"
            className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-medium text-accent transition hover:border-white/25 hover:bg-white/[0.1]"
          >
            Заявка
          </a>
        </nav>
      </div>
    </motion.header>
  );
}
