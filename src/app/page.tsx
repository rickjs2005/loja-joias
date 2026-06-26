import { getAllProducts } from "@/lib/data/catalog";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { Collection } from "@/components/Collection";
import { Atelier } from "@/components/Atelier";
import { Differentiators } from "@/components/Differentiators";
import { Testimonials } from "@/components/Testimonials";
import { StoreSection } from "@/components/StoreSection";
import { InstagramGrid } from "@/components/InstagramGrid";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";

export default function HomePage() {
  const products = getAllProducts();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <CategoryShowcase />
        <Collection products={products} />
        <Atelier />
        <Differentiators />
        <Testimonials />
        <StoreSection />
        <InstagramGrid />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
