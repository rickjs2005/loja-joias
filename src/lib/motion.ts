/**
 * Variantes de animação reutilizáveis (Framer Motion).
 * Centralizar evita "cada componente com sua curva" e mantém o ritmo coeso.
 * Todas respeitam prefers-reduced-motion via o componente <Reveal/>.
 */
import type { Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

/** Revelação com desfoque — entrada sofisticada para imagens e blocos. */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

/** Container para revelar palavras/letras em sequência. */
export const revealContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

export const revealWord: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

/** Pai que escalona a entrada dos filhos. */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Item para usar dentro de um container com `stagger`. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
