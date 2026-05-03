import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

/** Без opacity: на iOS Safari картинки внутри блока с opacity:0 иногда не дорисовываются после анимации */
export const fadeSlide: Variants = {
  hidden: { y: 20 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
