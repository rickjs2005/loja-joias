import Image from "next/image";
import { theme } from "@/config/theme.config";
import { cn } from "@/lib/cn";

/**
 * Logo oficial da AURÉA — a arte completa enviada pelo cliente (monograma +
 * wordmark + tagline), recortada na região do brilho dourado e com bordas
 * suavizadas (feather) para fundir no fundo claro. Em `/public/logo-plate.png`.
 * Dimensione pela altura via `className` (ex.: "h-10").
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/logo-plate.png"
      alt={theme.brand}
      width={1230}
      height={400}
      priority
      className={cn("h-10 w-auto select-none", className)}
    />
  );
}
