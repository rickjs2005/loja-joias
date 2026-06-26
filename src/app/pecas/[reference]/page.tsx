import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { theme } from "@/config/theme.config";
import { copy } from "@/config/copy";
import {
  getAllProducts,
  getByCategory,
  getProductByReference,
} from "@/lib/data/catalog";
import { CATEGORY_LABELS } from "@/lib/data/types";
import { formatCents } from "@/lib/format";
import { productWaUrl } from "@/lib/whatsapp";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { WhatsappCta } from "@/components/ui/WhatsappCta";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductCard } from "@/components/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

type Params = { reference: string };

export function generateStaticParams(): Params[] {
  return getAllProducts().map((p) => ({ reference: p.reference.toLowerCase() }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { reference } = await params;
  const product = getProductByReference(reference);
  if (!product) return { title: "Peça não encontrada" };

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/pecas/${product.reference.toLowerCase()}` },
    openGraph: {
      title: `${product.name} · ${theme.brand}`,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { reference } = await params;
  const product = getProductByReference(reference);
  if (!product) notFound();

  const related = getByCategory(product.category)
    .filter((p) => p.reference !== product.reference)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.reference,
    material: product.material,
    description: product.description,
    brand: { "@type": "Brand", name: theme.brand },
    offers: {
      "@type": "Offer",
      price: (product.priceCents / 100).toFixed(2),
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Header />
      <main className="pt-24 md:pt-32">
        <Container>
          <nav className="mb-8 text-xs tracking-wide text-muted">
            <Link href="/" className="transition-colors hover:text-ink">
              Início
            </Link>
            <span className="px-2">/</span>
            <Link href="/#colecao" className="transition-colors hover:text-ink">
              Coleção
            </Link>
            <span className="px-2">/</span>
            <span className="text-ink">{product.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ProductGallery product={product} />

            <div className="lg:py-6">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
                {CATEGORY_LABELS[product.category]}
              </p>
              <h1 className="mt-3 font-display text-4xl leading-[1.05] tracking-tight md:text-5xl">
                {product.name}
              </h1>
              <p className="mt-3 text-sm tracking-wide text-muted">
                Referência {product.reference}
              </p>

              <p className="mt-8 font-display text-3xl tracking-tight">
                {formatCents(product.priceCents)}
              </p>

              <p className="mt-6 max-w-md leading-relaxed text-muted">
                {product.description}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                <Spec term="Material" desc={product.material} />
                <Spec term="Pedra" desc={product.stone ?? "—"} />
              </dl>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <WhatsappCta href={productWaUrl(product)} className="px-8 py-4">
                  Tenho interesse nesta peça
                </WhatsappCta>
                <Link
                  href="/#colecao"
                  className="inline-flex items-center justify-center rounded-full border border-ink/20 px-7 py-4 text-sm font-medium uppercase tracking-wide transition-colors hover:border-accent hover:text-accent"
                >
                  Ver outras peças
                </Link>
              </div>

              <p className="mt-6 text-xs leading-relaxed text-muted">
                {copy.produto.ctaHelper}
              </p>

              <Accordion type="single" collapsible className="mt-10 border-t border-line">
                <AccordionItem value="materiais">
                  <AccordionTrigger>Materiais</AccordionTrigger>
                  <AccordionContent>
                    {product.material}
                    {product.stone ? ` · ${product.stone}` : ""}. Peça autoral feita à mão no
                    atelier AURÉA, com acabamento polido manualmente.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="garantia">
                  <AccordionTrigger>Garantia e procedência</AccordionTrigger>
                  <AccordionContent>{copy.produto.garantia}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="cuidados">
                  <AccordionTrigger>Cuidados</AccordionTrigger>
                  <AccordionContent>{copy.produto.cuidados}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-24 border-t border-line pt-16 md:mt-32">
              <h2 className="font-display text-3xl tracking-tight">Você também pode gostar</h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.reference} product={p} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>
      <Footer />
      <WhatsappFloat />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}

function Spec({ term, desc }: { term: string; desc: string }) {
  return (
    <div className="bg-surface px-5 py-4">
      <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
        {term}
      </dt>
      <dd className="mt-1 text-sm text-ink">{desc}</dd>
    </div>
  );
}
