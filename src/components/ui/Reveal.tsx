"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp } from "@/lib/motion";

/**
 * Anima a entrada quando o elemento aparece na viewport.
 * Reutilizável em qualquer seção — evita repetir whileInView por toda parte.
 * (prefers-reduced-motion é tratado globalmente no CSS, que zera a duração.)
 */
export function Reveal({
  children,
  variants = fadeUp,
  className,
  as = "div",
  amount = 0.3,
  delay,
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
  as?: "div" | "section" | "li" | "ul" | "span";
  amount?: number;
  delay?: number;
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
