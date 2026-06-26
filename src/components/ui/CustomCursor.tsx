"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Cursor "esmeralda": uma gema lapidada (corte esmeralda) verde com facetas e
 * glow, que segue o mouse, cresce sobre elementos interativos, encolhe ao
 * clicar e some ao sair da janela. Estrutura em 3 camadas (posição /
 * centralização / escala). Só ativa em ponteiro fino e respeita
 * prefers-reduced-motion.
 */
export function CustomCursor() {
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const px = useSpring(x, { stiffness: 650, damping: 42, mass: 0.3 });
  const py = useSpring(y, { stiffness: 650, damping: 42, mass: 0.3 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.body.classList.add("has-custom-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  const scale = (visible ? 1 : 0) * (down ? 0.82 : 1);

  return (
    <motion.div
      aria-hidden
      style={{ x: px, y: py }}
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden [@media(pointer:fine)]:block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div
          animate={{ scale, opacity: visible ? 1 : 0 }}
          transition={{
            scale: { type: "spring", stiffness: 340, damping: 22, mass: 0.4 },
            opacity: { duration: 0.2 },
          }}
          style={{ filter: "drop-shadow(0 0 6px rgba(26,122,82,0.55))" }}
        >
          <EmeraldGem />
        </motion.div>
      </div>
    </motion.div>
  );
}

/** Gema verde em corte esmeralda (octógono com facetas em degrau). */
function EmeraldGem() {
  return (
    <svg width="22" height="30" viewBox="0 0 22 30" fill="none">
      <defs>
        <linearGradient id="emr-out" x1="0" y1="0" x2="22" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3fbe8c" />
          <stop offset="0.55" stopColor="#1a7a52" />
          <stop offset="1" stopColor="#0a4d33" />
        </linearGradient>
        <linearGradient id="emr-tbl" x1="5" y1="5" x2="17" y2="25" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7fe0b6" />
          <stop offset="1" stopColor="#2a9c6c" />
        </linearGradient>
      </defs>
      {/* contorno (corte esmeralda) */}
      <polygon
        points="5.5,0 16.5,0 22,5.5 22,24.5 16.5,30 5.5,30 0,24.5 0,5.5"
        fill="url(#emr-out)"
        stroke="#06402a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* mesa (facet central) */}
      <polygon
        points="8.5,5 13.5,5 17,8.5 17,21.5 13.5,25 8.5,25 5,21.5 5,8.5"
        fill="url(#emr-tbl)"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="0.6"
      />
      {/* arestas das facetas em degrau */}
      <g stroke="rgba(255,255,255,0.22)" strokeWidth="0.5">
        <line x1="5.5" y1="0" x2="8.5" y2="5" />
        <line x1="16.5" y1="0" x2="13.5" y2="5" />
        <line x1="22" y1="5.5" x2="17" y2="8.5" />
        <line x1="22" y1="24.5" x2="17" y2="21.5" />
        <line x1="16.5" y1="30" x2="13.5" y2="25" />
        <line x1="5.5" y1="30" x2="8.5" y2="25" />
        <line x1="0" y1="24.5" x2="5" y2="21.5" />
        <line x1="0" y1="5.5" x2="5" y2="8.5" />
      </g>
      {/* brilho especular */}
      <polygon points="8.8,6 11.5,6 9.4,11.5 7.3,9.5" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}
