"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll global (Lenis). Desliga sozinho para quem pede menos movimento.
 * Mantém o scroll nativo da window atualizado, então framer-motion useScroll e
 * âncoras (#id) continuam funcionando normalmente.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Âncoras internas com rolagem suave via Lenis. Cobre "#sec" e "/#sec"
    // (quando o alvo existe na página atual). Se não existir, deixa navegar.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest('a[href*="#"]') as
        | HTMLAnchorElement
        | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const hash = href.includes("#") ? `#${href.split("#")[1]}` : "";
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
