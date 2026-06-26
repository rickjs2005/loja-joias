import { Reveal } from "./Reveal";
import { TextReveal } from "./TextReveal";
import { cn } from "@/lib/cn";

/** Cabeçalho de seção padrão: eyebrow + título serifado (revelado palavra a
 *  palavra) + subtítulo opcional. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p className="mb-4 text-xs font-medium tracking-[0.3em] text-accent uppercase">
            {eyebrow}
          </p>
        </Reveal>
      )}
      <TextReveal
        as="h2"
        text={title}
        className="font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl"
      />
      {subtitle && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              "mt-5 max-w-xl text-base leading-relaxed text-muted",
              align === "center" && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
