"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";

/**
 * Vitrine de exposição 3D — a joia "flutua" à frente de um pedestal de vidro,
 * como numa exposição de museu. Componentes do efeito:
 *
 *  • Inclinação em perspectiva seguindo o cursor (eixos X/Y, com mola).
 *  • Profundidade real: a peça vem à frente (translateZ) e o pedestal recua,
 *    criando parallax verdadeiro ao inclinar.
 *  • Holofote de museu descendo do topo, que acende ao passar o mouse.
 *  • Brilho de vidro (glare) que acompanha o cursor sobre a "tampa" da vitrine.
 *  • Base/pedestal com reflexo, dando a sensação de objeto pousado e iluminado.
 *
 * Desativa a inclinação sozinho com prefers-reduced-motion (mantém a moldura).
 */
export function Showcase({
  children,
  className,
  max = 10,
}: {
  /** A peça em si (imagem). Recebe profundidade — fica à frente do pedestal. */
  children: React.ReactNode;
  className?: string;
  /** Ângulo máximo (graus) de inclinação em cada eixo. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Posição normalizada do cursor dentro do card: -0.5 … 0.5
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 220, damping: 20, mass: 0.5 };
  const rx = useSpring(useTransform(py, (v) => -v * max * 2), spring);
  const ry = useSpring(useTransform(px, (v) => v * max * 2), spring);

  // Posição do brilho de vidro (segue o cursor, em %).
  const gx = useSpring(useTransform(px, (v) => `${50 + v * 70}%`), spring);
  const gy = useSpring(useTransform(py, (v) => `${42 + v * 60}%`), spring);
  const glare = useMotionTemplate`radial-gradient(60% 55% at ${gx} ${gy}, rgba(255,255,255,0.42), rgba(255,255,255,0.06) 42%, transparent 70%)`;

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={cn(
        "group/showcase relative [transform-style:preserve-3d]",
        className,
      )}
    >
      {/* Peça — vem à frente no eixo Z para flutuar sobre o pedestal. */}
      <div className="relative z-10 [transform:translateZ(45px)] [transform-style:preserve-3d]">
        {children}
      </div>

      {/* Holofote de museu: cone de luz descendo do topo, acende no hover. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-60 transition-opacity duration-500 group-hover/showcase:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -18%, rgba(255,248,235,0.55) 0%, rgba(255,245,225,0.12) 26%, transparent 55%)",
          mixBlendMode: "soft-light",
          transform: "translateZ(58px)",
        }}
      />

      {/* Brilho de vidro acompanhando o cursor (a "tampa" da vitrine). */}
      <motion.div
        aria-hidden
        style={{ backgroundImage: glare, transform: "translateZ(60px)" }}
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-0 mix-blend-screen transition-opacity duration-300 group-hover/showcase:opacity-100"
      />

      {/* Reflexo do vidro: faixa diagonal sutil que varre no hover. */}
      <div
        aria-hidden
        style={{ transform: "translateZ(60px)" }}
        className="vitrine-sheen pointer-events-none absolute inset-0 z-30 rounded-[inherit] opacity-0 group-hover/showcase:opacity-100"
      />

      {/* Pedestal de vidro: base recuada com brilho e reflexo do objeto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-3 bottom-0 z-0 h-[34%] [transform:translateZ(-30px)]"
      >
        <div className="absolute inset-x-0 bottom-0 h-full rounded-b-[inherit] bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
        {/* Linha de luz do tampo do pedestal. */}
        <div className="absolute inset-x-6 bottom-[30%] h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
        {/* Pool de luz no piso, sob a joia. */}
        <div
          className="absolute bottom-2 left-1/2 h-6 w-3/4 -translate-x-1/2 rounded-[100%] blur-md transition-all duration-500 group-hover/showcase:w-[88%]"
          style={{
            background:
              "radial-gradient(closest-side, rgba(176,141,87,0.5), transparent)",
          }}
        />
      </div>

      {/* Moldura/aresta de vidro da vitrine. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] ring-1 ring-inset ring-white/15 transition-shadow duration-500 group-hover/showcase:ring-white/25"
        style={{
          transform: "translateZ(62px)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -22px 40px -28px rgba(0,0,0,0.55)",
        }}
      />
    </motion.div>
  );
}
