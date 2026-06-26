"use client";

import { motion } from "framer-motion";
import { copy } from "@/config/copy";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { stagger, staggerItem } from "@/lib/motion";

export function TrustStrip() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <motion.ul
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3"
          >
            {copy.trust.map((item) => (
              <motion.li
                key={item.title}
                variants={staggerItem}
                className="bg-surface px-8 py-10 text-center"
              >
                <h3 className="font-display text-xl tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </Reveal>
      </Container>
    </section>
  );
}
