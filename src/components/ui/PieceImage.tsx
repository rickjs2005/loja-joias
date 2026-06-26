import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Category } from "@/lib/data/types";

/**
 * Imagem de uma peça. Se `src` existir (foto real em /public), usa next/image.
 * Caso contrário, desenha um marcador editorial determinístico: gradiente creme
 * → dourado com um ícone fino da categoria. Sempre renderiza algo bonito,
 * mesmo sem fotos — ideal para template/demonstração.
 */
export function PieceImage({
  src,
  alt,
  category,
  seed,
  priority,
  className,
  sizes,
}: {
  src?: string;
  alt: string;
  category: Category;
  seed: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  const angle = (hash(seed) % 80) + 100; // 100–180deg, variação sutil
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{
        background: `linear-gradient(${angle}deg, #fbf9f5 0%, #f1e9da 55%, #e4d2ad 100%)`,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <CategoryMotif category={category} />
      </div>
      <span className="absolute bottom-4 left-5 font-display text-xs tracking-[0.25em] text-ink/35 uppercase">
        {seed}
      </span>
    </div>
  );
}

function CategoryMotif({ category }: { category: Category }) {
  const common = "text-accent/45";
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.2 } as const;
  switch (category) {
    case "aneis":
      return (
        <svg viewBox="0 0 100 100" className={cn("h-2/5 w-2/5", common)}>
          <circle cx="50" cy="58" r="26" {...stroke} />
          <path d="M50 32 l-8 -14 h16 z" {...stroke} />
          <circle cx="50" cy="20" r="2.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "colares":
      return (
        <svg viewBox="0 0 100 100" className={cn("h-2/5 w-2/5", common)}>
          <path d="M18 26 Q50 70 82 26" {...stroke} />
          <path d="M50 56 l-6 10 6 10 6 -10 z" {...stroke} />
        </svg>
      );
    case "brincos":
      return (
        <svg viewBox="0 0 100 100" className={cn("h-2/5 w-2/5", common)}>
          <circle cx="36" cy="30" r="5" {...stroke} />
          <path d="M36 35 q-10 14 0 26 q10 -12 0 -26" {...stroke} />
          <circle cx="64" cy="30" r="5" {...stroke} />
          <path d="M64 35 q-10 14 0 26 q10 -12 0 -26" {...stroke} />
        </svg>
      );
    case "pulseiras":
      return (
        <svg viewBox="0 0 100 100" className={cn("h-2/5 w-2/5", common)}>
          <ellipse cx="50" cy="50" rx="30" ry="20" {...stroke} />
          <ellipse cx="50" cy="50" rx="22" ry="13" {...stroke} />
        </svg>
      );
    case "conjuntos":
      return (
        <svg viewBox="0 0 100 100" className={cn("h-2/5 w-2/5", common)}>
          <path d="M28 30 Q50 60 72 30" {...stroke} />
          <circle cx="34" cy="70" r="6" {...stroke} />
          <circle cx="66" cy="70" r="6" {...stroke} />
        </svg>
      );
  }
}

/** Hash determinístico simples (djb2) para variar o gradiente por peça. */
function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return Math.abs(h);
}
