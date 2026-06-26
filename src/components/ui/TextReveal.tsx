"use client";

import { motion } from "framer-motion";
import { revealContainer, revealWord } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Revela um texto palavra por palavra, com leve blur e subida, ao entrar na
 * viewport. Reutilizável em títulos editoriais. Cada palavra usa overflow
 * escondido para o efeito de "mask reveal".
 */
export function TextReveal({
  text,
  className,
  as = "h2",
  once = true,
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  once?: boolean;
  delay?: number;
}) {
  const Tag = motion[as];
  const words = text.split(" ");

  return (
    <Tag
      variants={revealContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5 }}
      transition={{ delayChildren: delay }}
      className={cn("inline-block", className)}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={revealWord} className="inline-block" aria-hidden>
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
