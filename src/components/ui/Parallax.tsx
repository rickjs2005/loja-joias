"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Deslocamento parallax vertical conforme o elemento cruza a viewport.
 * Reutilizável para elementos decorativos (não use em imagens recortadas sem
 * folga, para não abrir vão). prefers-reduced-motion é tratado no CSS global.
 */
export function Parallax({
  children,
  amount = 50,
  className,
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <motion.div ref={ref} style={{ y }} className={cn(className)}>
      {children}
    </motion.div>
  );
}
