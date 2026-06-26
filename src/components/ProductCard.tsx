import Link from "next/link";
import type { Product } from "@/lib/data/types";
import { CATEGORY_LABELS } from "@/lib/data/types";
import { formatCents } from "@/lib/format";
import { productWaUrl } from "@/lib/whatsapp";
import { PieceImage } from "./ui/PieceImage";
import { WhatsappGlyph } from "./ui/WhatsappCta";
import { Sparkles } from "./ui/Sparkles";
import { Showcase } from "./ui/Showcase";

/** Card de uma peça. A imagem/título levam à página da peça (SEO + galeria);
 *  o botão verde abre o WhatsApp já com Nome · Referência · Preço. */
export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const href = `/pecas/${product.reference.toLowerCase()}`;

  return (
    <article className="group flex flex-col">
      <Showcase className="rounded-xl">
        <Link
          href={href}
          data-cursor="hover"
          className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-surface transition-shadow duration-500 group-hover:shadow-[0_36px_80px_-30px_rgba(176,141,87,0.6)]"
          aria-label={product.name}
        >
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
            <PieceImage
              src={product.images[0]}
              alt={product.name}
              category={product.category}
              seed={product.reference}
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {product.badge && (
            <span className="absolute left-4 top-4 z-40 rounded-full bg-bg/90 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink backdrop-blur">
              {product.badge}
            </span>
          )}
          <Sparkles
            colorClassName="text-white"
            className="z-40 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>
      </Showcase>

      <div className="flex flex-1 flex-col pt-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
          {CATEGORY_LABELS[product.category]}
        </p>
        <Link href={href} className="mt-2">
          <h3 className="font-display text-xl leading-snug tracking-tight transition-colors group-hover:text-accent">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-xs tracking-wide text-muted">Ref. {product.reference}</p>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="font-display text-lg tracking-tight">
            {formatCents(product.priceCents)}
          </span>
          <a
            href={productWaUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors hover:border-accent hover:text-accent"
            aria-label={`Falar sobre ${product.name} no WhatsApp`}
          >
            <WhatsappGlyph className="h-3.5 w-3.5" />
            Tenho interesse
          </a>
        </div>
      </div>
    </article>
  );
}
