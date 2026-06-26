import { cn } from "@/lib/cn";

/**
 * Cintilância decorativa: estrelinhas de 4 pontas que piscam sobre o conteúdo
 * (joias). CSS puro (anima via .animate-twinkle), então é leve e o
 * prefers-reduced-motion global já zera o movimento. Posições fixas para não
 * gerar mismatch de hidratação.
 *
 * Use dentro de um container `relative overflow-hidden`.
 */
const STARS = [
  { left: "14%", top: "22%", size: 16, delay: "0s", dur: "3.4s" },
  { left: "78%", top: "16%", size: 12, delay: "0.8s", dur: "2.8s" },
  { left: "62%", top: "40%", size: 20, delay: "1.6s", dur: "3.8s" },
  { left: "28%", top: "64%", size: 11, delay: "0.4s", dur: "3.1s" },
  { left: "86%", top: "70%", size: 15, delay: "1.1s", dur: "3.5s" },
  { left: "44%", top: "84%", size: 10, delay: "2.1s", dur: "2.6s" },
  { left: "8%", top: "48%", size: 13, delay: "1.4s", dur: "3.2s" },
];

export function Sparkles({
  className,
  colorClassName = "text-accent-soft",
}: {
  className?: string;
  colorClassName?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", colorClassName, className)}
    >
      {STARS.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="animate-twinkle absolute drop-shadow-[0_0_3px_rgba(255,255,255,0.5)]"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        >
          <path
            d="M12 0 C13 7 17 11 24 12 C17 13 13 17 12 24 C11 17 7 13 0 12 C7 11 11 7 12 0 Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </div>
  );
}
