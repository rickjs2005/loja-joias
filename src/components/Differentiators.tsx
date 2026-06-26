"use client";

import { motion } from "framer-motion";
import { Gem, Hand, MessageCircle, ShieldCheck, Sparkles, Truck, type LucideIcon } from "lucide-react";
import { copy } from "@/config/copy";
import { Container } from "./ui/Container";
import { SectionHeading } from "./ui/SectionHeading";
import { stagger, staggerItem } from "@/lib/motion";

const ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Gem,
  Hand,
  Sparkles,
  MessageCircle,
  Truck,
};

export function Differentiators() {
  const { eyebrow, title, items } = copy.diferenciais;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} />

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => {
            const Icon = ICONS[item.icon] ?? Sparkles;
            return (
              <motion.li key={item.title} variants={staggerItem} className="group">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-xl tracking-tight">{item.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{item.desc}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </section>
  );
}
