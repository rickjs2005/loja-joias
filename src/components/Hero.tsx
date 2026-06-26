"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { copy } from "@/config/copy";
import { waUrl } from "@/lib/whatsapp";
import { Container } from "./ui/Container";
import { Button } from "./ui/Button";
import { WhatsappCta } from "./ui/WhatsappCta";
import { LuxuryReflection } from "./ui/LuxuryReflection";
import { Sparkles } from "./ui/Sparkles";

const EASE = [0.16, 1, 0.3, 1] as const;

// Partículas douradas — posições fixas (evita mismatch de hidratação).
const PARTICLES = [
  { left: "8%", top: "30%", size: 4, delay: 0, dur: 7, op: 0.5 },
  { left: "18%", top: "70%", size: 3, delay: 1.5, dur: 9, op: 0.4 },
  { left: "30%", top: "20%", size: 5, delay: 0.8, dur: 8, op: 0.35 },
  { left: "44%", top: "80%", size: 3, delay: 2.2, dur: 10, op: 0.45 },
  { left: "62%", top: "26%", size: 4, delay: 1.1, dur: 8.5, op: 0.4 },
  { left: "74%", top: "64%", size: 5, delay: 0.4, dur: 7.5, op: 0.5 },
  { left: "86%", top: "38%", size: 3, delay: 1.9, dur: 9.5, op: 0.4 },
  { left: "92%", top: "74%", size: 4, delay: 0.6, dur: 8, op: 0.35 },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const haloY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      {/* halo dourado + partículas */}
      <motion.div
        aria-hidden
        style={{ y: haloY }}
        animate={{ opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-40 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl"
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(circle, rgba(205,180,137,0.35) 0%, rgba(250,248,246,0) 60%)",
          }}
        />
      </motion.div>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-accent"
            style={
              {
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                "--p-opacity": p.op,
                animation: `float-up ${p.dur}s ease-in-out ${p.delay}s infinite`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Texto */}
          <div className="text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mb-6 text-xs font-medium tracking-[0.3em] text-accent uppercase"
            >
              {copy.hero.eyebrow}
            </motion.p>

            <h1 className="font-display text-5xl leading-[1.02] tracking-tight text-balance md:text-7xl">
              {copy.hero.title.split("\n").map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.12 }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden">
                <motion.em
                  className="gold-gleam block font-normal italic"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 0.9,
                    ease: EASE,
                    delay: 0.15 + copy.hero.title.split("\n").length * 0.12,
                  }}
                >
                  {copy.hero.titleAccent}
                </motion.em>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
              className="mx-auto mt-7 max-w-md text-lg leading-relaxed text-muted lg:mx-0"
            >
              {copy.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.65 }}
              className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:items-start lg:justify-start"
            >
              <Button href="#colecao">{copy.hero.primaryCta}</Button>
              <WhatsappCta variant="outline" href={waUrl(copy.wa.general)}>
                {copy.hero.secondaryCta}
              </WhatsappCta>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.8 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.72rem] tracking-[0.18em] text-soft uppercase lg:justify-start"
            >
              {copy.hero.trust.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden className="h-1 w-1 rounded-full bg-accent-soft" />
                  )}
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Imagem premium com parallax + reflexo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <motion.div style={{ y: imgY }} className="relative mx-auto w-full max-w-md">
              {/* Monograma da marca — decorativo, atrás da imagem, MUITO sutil */}
              <Image
                src="/logo-mark.png"
                alt=""
                aria-hidden
                width={220}
                height={220}
                className="pointer-events-none absolute -top-12 -right-10 h-40 w-40 opacity-[0.06] select-none"
              />
              <LuxuryReflection opacity={0.14} start={50}>
                <motion.div
                  initial={{ clipPath: "inset(0 0 100% 0 round 2rem)" }}
                  animate={{ clipPath: "inset(0 0 0% 0 round 2rem)" }}
                  transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[2rem] glow-gold"
                >
                  <motion.div
                    initial={{ scale: 1.18 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.6, ease: EASE, delay: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src="/pecas/aur-cj01.jpg"
                      alt="Conjunto Jardim Imperial — AURÉA"
                      fill
                      priority
                      sizes="(max-width: 1024px) 0px, 40vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <Sparkles colorClassName="text-white" />
                </motion.div>
              </LuxuryReflection>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* indicador de scroll */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute inset-x-0 bottom-7 flex justify-center"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-ink/20 p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  );
}
