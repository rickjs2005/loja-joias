"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Category, Product } from "@/lib/data/types";
import { CATEGORIES, CATEGORY_LABELS } from "@/lib/data/types";
import { copy } from "@/config/copy";
import { cn } from "@/lib/cn";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { ProductCard } from "./ProductCard";

type Filter = "todos" | Category;

export function Collection({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>("todos");

  const tabs = useMemo<Filter[]>(() => {
    const present = CATEGORIES.filter((c) => products.some((p) => p.category === c));
    return ["todos", ...present];
  }, [products]);

  const visible = useMemo(
    () => (filter === "todos" ? products : products.filter((p) => p.category === filter)),
    [filter, products],
  );

  return (
    <section id="colecao" className="scroll-mt-20 py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow={copy.collection.eyebrow}
            title={copy.collection.title}
            subtitle={copy.collection.subtitle}
          />

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors",
                  filter === tab
                    ? "border-ink bg-ink text-bg"
                    : "border-line text-muted hover:border-ink/40 hover:text-ink",
                )}
              >
                {tab === "todos" ? "Todos" : CATEGORY_LABELS[tab]}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((product, i) => (
              <motion.div
                key={product.reference}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProductCard product={product} priority={i < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
