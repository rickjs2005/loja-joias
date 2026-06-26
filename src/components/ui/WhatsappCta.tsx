import { waUrl } from "@/lib/whatsapp";
import { Button } from "./Button";

type Variant = "solid" | "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

/**
 * Único caminho para um CTA de WhatsApp. Passe `message` (vira link wa.me)
 * ou um `href` já montado (ex.: productWaUrl). Nunca monte wa.me na mão.
 */
export function WhatsappCta({
  message,
  href,
  children,
  variant = "solid",
  size = "md",
  className,
  icon = true,
  magnetic = true,
}: {
  message?: string;
  href?: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: boolean;
  magnetic?: boolean;
}) {
  const finalHref =
    href ?? waUrl(message ?? "Olá! Vim pelo site e quero saber mais sobre as peças.");

  return (
    <Button
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
      magnetic={magnetic}
    >
      {icon && <WhatsappGlyph className="h-4 w-4 shrink-0" />}
      <span>{children}</span>
    </Button>
  );
}

export function WhatsappGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.74-.86-2-.96-.27-.1-.46-.15-.65.15-.2.3-.75.96-.92 1.16-.17.2-.34.22-.63.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.34.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.65-1.57-.9-2.15-.24-.57-.48-.5-.65-.5h-.56c-.2 0-.5.07-.77.37-.26.3-1 .98-1 2.4 0 1.4 1.03 2.76 1.17 2.96.15.2 2.03 3.1 4.92 4.35.69.3 1.22.47 1.64.6.69.22 1.32.2 1.81.12.55-.08 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.13-.27-.2-.56-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.45 9.45 0 0 1 14.68-11.7 9.4 9.4 0 0 1 2.77 6.69c0 5.21-4.24 9.44-9.45 9.44zM20.52 3.49A11.78 11.78 0 0 0 12.04.01C5.5.01.16 5.35.16 11.9c0 2.1.55 4.14 1.6 5.95L.05 24l6.3-1.65a11.86 11.86 0 0 0 5.69 1.45h.01c6.54 0 11.88-5.34 11.88-11.9 0-3.18-1.24-6.17-3.41-8.41z" />
    </svg>
  );
}
