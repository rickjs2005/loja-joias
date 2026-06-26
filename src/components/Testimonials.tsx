"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { copy } from "@/config/copy";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { cn } from "@/lib/cn";

export function Testimonials() {
  const { eyebrow, title, items } = copy.depoimentos;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  const current = items[index];

  return (
    <section className="bg-onyx py-24 text-cream md:py-32">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          align="center"
          className="mx-auto [&_h2]:text-cream [&_p]:text-cream/70"
        />

        <div
          className="relative mx-auto mt-14 max-w-3xl text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Quote className="mx-auto h-10 w-10 text-accent-soft" strokeWidth={1} />

          <div className="relative mt-6 min-h-[12rem] sm:min-h-[9rem]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <p className="font-display text-2xl leading-snug tracking-tight text-balance md:text-3xl">
                  “{current.text}”
                </p>
                <div className="mt-7 flex flex-col items-center gap-1">
                  <div className="flex gap-0.5 text-accent-soft">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="mt-2 text-sm font-medium tracking-wide">{current.name}</p>
                  <p className="text-xs tracking-wide text-cream/50">{current.city}</p>
                </div>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex justify-center gap-2.5">
            {items.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Depoimento ${i + 1}`}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-7 bg-accent-soft" : "w-1.5 bg-cream/30 hover:bg-cream/60",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
