import { theme } from "@/config/theme.config";
import { copy } from "@/config/copy";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { WhatsappCta } from "./ui/WhatsappCta";

export function StoreSection() {
  return (
    <section id="visite" className="scroll-mt-20 py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <p className="mb-4 text-xs font-medium tracking-[0.3em] text-accent uppercase">
              {copy.store.eyebrow}
            </p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-5xl">
              {copy.store.title}
            </h2>

            <dl className="mt-8 space-y-5 text-sm">
              <Row term="Endereço" desc={copy.store.address} />
              <Row term="Horário" desc={copy.store.hours} />
              <Row term="Instagram" desc={`@${theme.contact.instagram}`} />
            </dl>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {copy.store.note}
            </p>

            <div className="mt-8">
              <WhatsappCta message={copy.wa.visit}>{copy.store.cta}</WhatsappCta>
            </div>
          </Reveal>

          <Reveal>
            <div className="aspect-square overflow-hidden rounded-2xl border border-line">
              <div
                className="flex h-full w-full items-center justify-center"
                style={{
                  background: "linear-gradient(150deg, #fbf9f5 0%, #efe6d4 60%, #e4d2ad 100%)",
                }}
              >
                <span className="font-display text-3xl tracking-tight text-ink/30">
                  {theme.brand}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Row({ term, desc }: { term: string; desc: string }) {
  return (
    <div className="flex gap-6 border-b border-line pb-5">
      <dt className="w-24 shrink-0 text-xs font-medium uppercase tracking-[0.18em] text-accent">
        {term}
      </dt>
      <dd className="text-ink">{desc}</dd>
    </div>
  );
}
