import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsappFloat } from "@/components/WhatsappFloat";
import { Container } from "@/components/ui/Container";
import { VirtualMirror } from "@/components/mirror/VirtualMirror";

export const metadata: Metadata = {
  title: "Experimente Virtualmente",
  description:
    "Prove brincos e colares da AURÉA em tempo real pela câmera, com nossa tecnologia de espelho virtual. Capture, compartilhe e fale com o atelier.",
  alternates: { canonical: "/experimentar" },
};

export default function ExperimentarPage() {
  return (
    <>
      <Header />
      <main className="pt-28 pb-24 md:pt-36">
        <Container>
          <header className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
              Experimente virtualmente
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
              Veja a joia em você, antes de conversar
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
              Ative a câmera, escolha um brinco ou colar e a peça acompanha o seu rosto em
              tempo real. Tire uma foto e mande para o atelier no WhatsApp.
            </p>
            <p className="mx-auto mt-4 inline-block rounded-full border border-line bg-surface px-4 py-1.5 text-[11px] tracking-wide text-muted">
              Demonstração tecnológica · processamento 100% no seu aparelho, sem enviar vídeo
            </p>
          </header>

          <div className="mt-14">
            <VirtualMirror />
          </div>
        </Container>
      </main>
      <Footer />
      <WhatsappFloat />
    </>
  );
}
