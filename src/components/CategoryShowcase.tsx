import Image from "next/image";
import Link from "next/link";
import { copy } from "@/config/copy";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { Tilt } from "./ui/Tilt";
import { staggerItem } from "@/lib/motion";

/** Vitrine de coleções (categorias) com cards luxuosos e hover refinado. */
export function CategoryShowcase() {
  const { eyebrow, title, items } = copy.categories;

  return (
    <section id="colecoes" className="scroll-mt-24 py-20 md:py-28">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mx-auto" />

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {items.map((cat, i) => (
            <Reveal
              key={cat.key}
              variants={staggerItem}
              delay={i * 0.06}
              className={i === 0 ? "col-span-2 lg:col-span-1" : ""}
            >
              <Tilt max={7}>
                <Link
                  href={`/#colecao`}
                  data-cursor="hover"
                  className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-surface"
                  aria-label={`Ver ${cat.label}`}
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-onyx/70 via-onyx/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <span className="font-display text-xl tracking-tight text-cream">{cat.label}</span>
                    <span className="mt-1 block h-px w-0 bg-accent-soft transition-all duration-500 group-hover:w-10" />
                  </div>
                </Link>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
