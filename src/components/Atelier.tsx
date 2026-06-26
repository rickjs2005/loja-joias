import Image from "next/image";
import { copy } from "@/config/copy";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { WhatsappCta } from "./ui/WhatsappCta";
import { LuxuryReflection } from "./ui/LuxuryReflection";
import { Parallax } from "./ui/Parallax";
import { Sparkles } from "./ui/Sparkles";
import { fadeIn } from "@/lib/motion";

export function Atelier() {
  return (
    <section id="sobre" className="relative scroll-mt-24 overflow-hidden bg-onyx py-24 text-cream md:py-32">
      {/* marca d'água do monograma com leve parallax (brilha no escuro) */}
      <Parallax
        amount={40}
        className="pointer-events-none absolute -right-10 -top-12 w-72 md:w-96"
      >
        <Image
          src="/logo-mark.png"
          alt=""
          aria-hidden
          width={383}
          height={331}
          className="w-full opacity-[0.07]"
        />
      </Parallax>
      <Container className="relative">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <Reveal>
            <p className="mb-4 text-xs font-medium tracking-[0.3em] text-accent-soft uppercase">
              {copy.atelier.eyebrow}
            </p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">
              {copy.atelier.title}
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-cream/70">
              {copy.atelier.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-9">
              <WhatsappCta
                variant="solid"
                className="bg-cream text-onyx hover:bg-accent hover:text-white"
                message={copy.wa.atelier}
              >
                {copy.atelier.cta}
              </WhatsappCta>
            </div>
          </Reveal>

          <Reveal variants={fadeIn} className="relative">
            <div className="relative mx-auto w-full max-w-sm p-3">
              <div className="absolute inset-0 rounded-[1.7rem] border border-accent-soft/30" />
              <LuxuryReflection opacity={0.12} start={55}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/pecas/aur-a03.jpg"
                    alt="Anel Esmeralda Halo — feito à mão no atelier AURÉA"
                    fill
                    sizes="(max-width: 1024px) 90vw, 30vw"
                    className="object-cover"
                  />
                  <Sparkles colorClassName="text-white" />
                </div>
              </LuxuryReflection>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
