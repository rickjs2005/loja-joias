import Image from "next/image";
import { theme } from "@/config/theme.config";
import { copy } from "@/config/copy";
import { Container } from "./ui/Container";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const TILES = [
  "/pecas/aur-cj01.jpg",
  "/pecas/aur-a01.jpg",
  "/pecas/aur-c03.jpg",
  "/pecas/aur-p01.jpg",
  "/pecas/aur-b01.jpg",
  "/pecas/aur-a03.jpg",
];

export function InstagramGrid() {
  const { eyebrow, title, subtitle, cta } = copy.instagram;
  const href = theme.contact.instagramUrl;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="flex flex-col items-center gap-6 text-center">
          <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" className="mx-auto" />
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="hover"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-accent transition-colors hover:text-ink"
          >
            <InstagramGlyph className="h-4 w-4" /> {cta}
          </a>
        </div>

        <Reveal className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {TILES.map((src, i) => (
            <a
              key={src}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group relative aspect-square overflow-hidden rounded-xl bg-surface"
            >
              <Image
                src={src}
                alt={`Publicação ${i + 1} no Instagram da AURÉA`}
                fill
                sizes="(max-width: 640px) 50vw, 16vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-onyx/0 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:bg-onyx/40 group-hover:opacity-100">
                <InstagramGlyph className="h-6 w-6 text-cream" />
              </div>
            </a>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
