"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/data/types";
import { cn } from "@/lib/cn";
import { PieceImage } from "./ui/PieceImage";

/** Galeria com miniaturas. Com fotos reais, alterna entre elas; sem fotos,
 *  mostra três "ângulos" do marcador editorial (seeds distintos). */
export function ProductGallery({ product }: { product: Product }) {
  const slots =
    product.images.length > 0
      ? product.images.map((src, i) => ({ src, seed: `${product.reference}-${i}` }))
      : [0, 1, 2].map((i) => ({ src: undefined, seed: `${product.reference}-${i}` }));

  const [active, setActive] = useState(0);
  const current = slots[active] ?? slots[0];

  return (
    <div className="flex flex-col gap-4">
      <motion.div
        key={active}
        initial={{ opacity: 0.4, scale: 0.99 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        data-cursor="hover"
        className="group relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-2xl bg-surface"
      >
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.18]">
          <PieceImage
            src={current.src}
            alt={product.name}
            category={product.category}
            seed={current.seed}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </motion.div>

      {slots.length > 1 && (
        <div className="grid grid-cols-3 gap-4">
          {slots.map((slot, i) => (
            <button
              key={slot.seed}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ver imagem ${i + 1}`}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl transition-all",
                active === i ? "ring-2 ring-accent ring-offset-2 ring-offset-bg" : "opacity-70 hover:opacity-100",
              )}
            >
              <PieceImage
                src={slot.src}
                alt={`${product.name} — ${i + 1}`}
                category={product.category}
                seed={slot.seed}
                sizes="20vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
