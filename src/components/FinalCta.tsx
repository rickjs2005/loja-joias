import { copy } from "@/config/copy";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { WhatsappCta } from "./ui/WhatsappCta";

export function FinalCta() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-line bg-surface px-8 py-16 text-center md:px-16 md:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(201,180,136,0.4) 0%, rgba(255,255,255,0) 60%)",
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
              {copy.finalCta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
              {copy.finalCta.subtitle}
            </p>
            <div className="mt-9 flex justify-center">
              <WhatsappCta className="px-9 py-4">{copy.finalCta.cta}</WhatsappCta>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
