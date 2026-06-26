import { cn } from "@/lib/cn";

/**
 * Sistema reutilizável "Luxury Reflection".
 * Cria um reflexo espelhado, com fade e leve blur, abaixo do conteúdo.
 * Usa `-webkit-box-reflect` — acelerado por GPU, 60fps, sem duplicar DOM.
 * (Em navegadores sem suporte, ex. Firefox, degrada sem reflexo — sem quebrar.)
 */
export function LuxuryReflection({
  children,
  className,
  gap = 6,
  opacity = 0.16,
  start = 60,
}: {
  children: React.ReactNode;
  className?: string;
  /** Distância (px) entre conteúdo e reflexo. */
  gap?: number;
  /** Opacidade máxima do reflexo (0.10–0.18 recomendado). */
  opacity?: number;
  /** A partir de quantos % do reflexo o fade começa a aparecer. */
  start?: number;
}) {
  const style = {
    WebkitBoxReflect: `below ${gap}px linear-gradient(to bottom, transparent ${start}%, rgba(0,0,0,${opacity}))`,
  } as React.CSSProperties;

  return (
    <div className={cn("[transform:translateZ(0)]", className)} style={style}>
      {children}
    </div>
  );
}
