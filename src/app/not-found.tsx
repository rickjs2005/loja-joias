import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhatsappCta } from "@/components/ui/WhatsappCta";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center py-24">
      <Container className="text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent">Erro 404</p>
        <h1 className="mt-5 font-display text-5xl tracking-tight md:text-6xl">
          Peça não encontrada
        </h1>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-muted">
          O endereço que você buscou não existe ou a peça já encontrou um novo dono.
          Volte à coleção para ver o que está disponível.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-ink px-7 py-3.5 text-sm font-medium uppercase tracking-wide text-bg transition-colors hover:bg-accent hover:text-white"
          >
            Voltar ao início
          </Link>
          <WhatsappCta variant="outline">Falar no WhatsApp</WhatsappCta>
        </div>
      </Container>
    </main>
  );
}
